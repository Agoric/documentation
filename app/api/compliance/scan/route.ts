import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function POST(request: NextRequest) {
  try {
    if (!process.env.NEON_NEON_DATABASE_URL) {
      return NextResponse.json({ error: "Database configuration missing" }, { status: 500 })
    }

    const sql = neon(process.env.NEON_DATABASE_URL)
    const { applicationId, loanType, fullScan } = await request.json()

    // Run compliance checks based on loan type and 50-year bond structure
    const complianceResults = await runComplianceChecks(sql, applicationId, loanType, fullScan)

    return NextResponse.json({
      success: true,
      applicationId,
      complianceScore: complianceResults.score,
      alerts: complianceResults.alerts,
      bondCompliance: complianceResults.bondCompliance,
      daxMirrorCompliance: complianceResults.daxMirrorCompliance,
      scanTimestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Compliance scan error:", error)
    return NextResponse.json({ error: "Failed to run compliance scan" }, { status: 500 })
  }
}

async function runComplianceChecks(sql: any, applicationId: string, loanType: string, fullScan: boolean) {
  const alerts = []
  let score = 100

  // Get application data
  const application = await sql`
    SELECT * FROM loan_applications WHERE id = ${applicationId}
  `

  if (!application.length) {
    throw new Error("Application not found")
  }

  const app = application[0]

  // Check loan type specific requirements
  switch (loanType) {
    case "fha":
      // FHA specific compliance checks
      if (app.credit_score < 580) {
        alerts.push({
          id: `FHA-${Date.now()}`,
          severity: "critical",
          rule: "FHA Credit Score Minimum",
          message: `Credit score ${app.credit_score} below FHA minimum of 580`,
          regulation: "FHA Handbook 4000.1",
        })
        score -= 25
      }

      // Check 50-year bond structure compliance for FHA
      if (!app.bond_structure || app.bond_structure.guaranteeTerm !== 30) {
        alerts.push({
          id: `FHA-BOND-${Date.now()}`,
          severity: "high",
          rule: "FHA 50-Year Bond Structure",
          message: "FHA bond must have 30-year government guarantee period",
          regulation: "Internal Snapifi Bond Policy 2024-001",
        })
        score -= 15
      }
      break

    case "va":
      // VA specific compliance checks
      if (!app.military_service) {
        alerts.push({
          id: `VA-${Date.now()}`,
          severity: "critical",
          rule: "VA Military Service Requirement",
          message: "VA loan requires valid military service verification",
          regulation: "38 CFR 36.4302",
        })
        score -= 30
      }

      // Check VA 50-year bond with full guarantee
      if (!app.bond_structure || app.bond_structure.guaranteeTerm !== 50) {
        alerts.push({
          id: `VA-BOND-${Date.now()}`,
          severity: "high",
          rule: "VA 50-Year Full Guarantee",
          message: "VA bond must have full 50-year government guarantee",
          regulation: "VA Circular 26-20-16 (Modified)",
        })
        score -= 15
      }
      break

    case "usda":
      // USDA specific compliance checks
      if (!app.rural_eligible) {
        alerts.push({
          id: `USDA-${Date.now()}`,
          severity: "critical",
          rule: "USDA Rural Area Requirement",
          message: "Property must be in USDA eligible rural area",
          regulation: "7 CFR 3550.53",
        })
        score -= 30
      }

      // Check USDA 35-year guarantee structure
      if (!app.bond_structure || app.bond_structure.guaranteeTerm !== 35) {
        alerts.push({
          id: `USDA-BOND-${Date.now()}`,
          severity: "medium",
          rule: "USDA 35-Year Rural Bond Guarantee",
          message: "USDA rural bond should have 35-year government guarantee",
          regulation: "7 CFR 3550 (Modified for Bond Structure)",
        })
        score -= 10
      }
      break

    case "sba":
      // SBA specific compliance checks
      if (!app.business_use) {
        alerts.push({
          id: `SBA-${Date.now()}`,
          severity: "critical",
          rule: "SBA Business Use Requirement",
          message: "SBA loan must be for eligible business purposes",
          regulation: "13 CFR 120.111",
        })
        score -= 30
      }

      // Check SBA 25-year business guarantee
      if (!app.bond_structure || app.bond_structure.guaranteeTerm !== 25) {
        alerts.push({
          id: `SBA-BOND-${Date.now()}`,
          severity: "high",
          rule: "SBA 25-Year Business Bond Guarantee",
          message: "SBA business bond should have 25-year government guarantee",
          regulation: "13 CFR 120 (Modified for Corporate Bond)",
        })
        score -= 15
      }
      break
  }

  // Check DAX mirroring compliance for all loan types
  if (!app.dax_mirror_compliance || app.dax_mirror_compliance < 95) {
    alerts.push({
      id: `DAX-${Date.now()}`,
      severity: "high",
      rule: "DAX Secondary Market Compliance",
      message: "Bond structure must properly mirror DAX corporate bond pricing",
      regulation: "Internal Snapifi Bond Policy 2024-001",
    })
    score -= 10
  }

  // Universal compliance checks
  if (!app.aml_verification) {
    alerts.push({
      id: `AML-${Date.now()}`,
      severity: "critical",
      rule: "Anti-Money Laundering Verification",
      message: "AML verification required for all loan applications",
      regulation: "31 CFR 1020.220",
    })
    score -= 20
  }

  // Calculate specific compliance metrics
  const bondCompliance = calculateBondCompliance(app, loanType)
  const daxMirrorCompliance = calculateDaxMirrorCompliance(app, loanType)

  return {
    score: Math.max(0, score),
    alerts,
    bondCompliance,
    daxMirrorCompliance,
  }
}

function calculateBondCompliance(app: any, loanType: string) {
  let compliance = 100

  // Check 50-year bond structure requirements
  if (!app.bond_structure) {
    compliance -= 30
  } else {
    // Check term length
    if (app.bond_structure.term !== 50) {
      compliance -= 20
    }

    // Check guarantee periods by loan type
    const expectedGuarantee = {
      fha: 30,
      va: 50,
      usda: 35,
      sba: 25,
    }[loanType]

    if (app.bond_structure.guaranteeTerm !== expectedGuarantee) {
      compliance -= 15
    }

    // Check DAX mirror assignment
    const expectedDaxMirror = {
      fha: "DAX Secondary",
      va: "DAX Premium",
      usda: "DAX Agricultural",
      sba: "DAX Corporate",
    }[loanType]

    if (app.bond_structure.daxMirror !== expectedDaxMirror) {
      compliance -= 10
    }
  }

  return Math.max(0, compliance)
}

function calculateDaxMirrorCompliance(app: any, loanType: string) {
  let compliance = 100

  // Check DAX mirroring implementation
  if (!app.dax_mirror_compliance) {
    compliance -= 40
  } else {
    compliance = app.dax_mirror_compliance
  }

  // Additional checks for specific loan types
  if (loanType === "va" && compliance < 98) {
    compliance -= 5 // VA loans require premium DAX compliance
  }

  return Math.max(0, compliance)
}

export async function GET() {
  return NextResponse.json({
    message: "Compliance scan API operational",
    endpoints: {
      POST: "Run compliance scan for specific application",
      GET: "API status check",
    },
    supportedLoanTypes: ["fha", "va", "usda", "sba"],
    bondStructures: {
      fha: "50-year with 30-year guarantee (DAX Secondary)",
      va: "50-year with 50-year guarantee (DAX Premium)",
      usda: "50-year with 35-year guarantee (DAX Agricultural)",
      sba: "50-year with 25-year guarantee (DAX Corporate)",
    },
    timestamp: new Date().toISOString(),
  })
}
