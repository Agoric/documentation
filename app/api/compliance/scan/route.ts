import { type NextRequest, NextResponse } from "next/server"

interface ComplianceRule {
  id: string
  name: string
  description: string
  severity: "critical" | "high" | "medium" | "low"
  loanTypes: string[]
  enabled: boolean
}

interface LoanData {
  id: string
  type: "FHA" | "VA" | "USDA" | "SBA"
  amount: number
  borrowerInfo: any
  documents: string[]
  bondStructure: {
    guaranteePeriod: number
    daxMirrorCompliant: boolean
    governmentBacking: boolean
  }
}

interface ComplianceResult {
  loanId: string
  overallScore: number
  violations: Array<{
    ruleId: string
    severity: string
    message: string
    recommendation: string
  }>
  bondCompliance: {
    structureValid: boolean
    guaranteePeriodCorrect: boolean
    daxMirrorActive: boolean
  }
}

// Compliance rules for different loan types
const complianceRules: ComplianceRule[] = [
  {
    id: "FHA_BOND_STRUCTURE",
    name: "FHA 30-Year Bond Structure",
    description: "Verify FHA loans have proper 30-year government guarantee structure",
    severity: "critical",
    loanTypes: ["FHA"],
    enabled: true,
  },
  {
    id: "VA_BOND_STRUCTURE",
    name: "VA 50-Year Bond Structure",
    description: "Verify VA loans have proper 50-year government guarantee structure",
    severity: "critical",
    loanTypes: ["VA"],
    enabled: true,
  },
  {
    id: "USDA_BOND_STRUCTURE",
    name: "USDA 35-Year Bond Structure",
    description: "Verify USDA loans have proper 35-year government guarantee structure",
    severity: "critical",
    loanTypes: ["USDA"],
    enabled: true,
  },
  {
    id: "SBA_BOND_STRUCTURE",
    name: "SBA 25-Year Bond Structure",
    description: "Verify SBA loans have proper 25-year government guarantee structure",
    severity: "critical",
    loanTypes: ["SBA"],
    enabled: true,
  },
  {
    id: "DAX_MIRROR_COMPLIANCE",
    name: "DAX Corporate Bond Mirroring",
    description: "Ensure loan structure mirrors corporate bond requirements for DAX trading",
    severity: "high",
    loanTypes: ["FHA", "VA", "USDA", "SBA"],
    enabled: true,
  },
  {
    id: "DOCUMENTATION_COMPLETE",
    name: "Required Documentation",
    description: "Verify all required documents are present and valid",
    severity: "medium",
    loanTypes: ["FHA", "VA", "USDA", "SBA"],
    enabled: true,
  },
  {
    id: "BORROWER_ELIGIBILITY",
    name: "Borrower Eligibility",
    description: "Verify borrower meets program-specific eligibility requirements",
    severity: "high",
    loanTypes: ["FHA", "VA", "USDA", "SBA"],
    enabled: true,
  },
]

function validateBondStructure(loan: LoanData): ComplianceResult["bondCompliance"] {
  const expectedGuaranteePeriods = {
    FHA: 30,
    VA: 50,
    USDA: 35,
    SBA: 25,
  }

  const expectedPeriod = expectedGuaranteePeriods[loan.type]
  const actualPeriod = loan.bondStructure.guaranteePeriod

  return {
    structureValid: loan.bondStructure.governmentBacking,
    guaranteePeriodCorrect: actualPeriod === expectedPeriod,
    daxMirrorActive: loan.bondStructure.daxMirrorCompliant,
  }
}

function runComplianceCheck(loan: LoanData): ComplianceResult {
  const violations = []
  let totalScore = 100

  // Check bond structure compliance
  const bondCompliance = validateBondStructure(loan)

  // Apply compliance rules
  for (const rule of complianceRules) {
    if (!rule.enabled || !rule.loanTypes.includes(loan.type)) continue

    let ruleViolated = false
    let message = ""
    let recommendation = ""

    switch (rule.id) {
      case "FHA_BOND_STRUCTURE":
      case "VA_BOND_STRUCTURE":
      case "USDA_BOND_STRUCTURE":
      case "SBA_BOND_STRUCTURE":
        if (!bondCompliance.structureValid || !bondCompliance.guaranteePeriodCorrect) {
          ruleViolated = true
          message = `${loan.type} bond structure does not meet government guarantee requirements`
          recommendation = "Review bond structure and guarantee period configuration"
        }
        break

      case "DAX_MIRROR_COMPLIANCE":
        if (!bondCompliance.daxMirrorActive) {
          ruleViolated = true
          message = "Loan structure not properly mirrored for DAX corporate bond trading"
          recommendation = "Configure DAX mirroring to enable secondary market trading"
        }
        break

      case "DOCUMENTATION_COMPLETE":
        const requiredDocs = {
          FHA: ["income_verification", "credit_report", "property_appraisal", "fha_certificate"],
          VA: ["income_verification", "credit_report", "property_appraisal", "va_certificate", "military_service"],
          USDA: ["income_verification", "credit_report", "property_appraisal", "rural_certification"],
          SBA: ["business_plan", "financial_statements", "tax_returns", "sba_eligibility"],
        }

        const required = requiredDocs[loan.type] || []
        const missing = required.filter((doc) => !loan.documents.includes(doc))

        if (missing.length > 0) {
          ruleViolated = true
          message = `Missing required documents: ${missing.join(", ")}`
          recommendation = "Upload all required documentation before proceeding"
        }
        break

      case "BORROWER_ELIGIBILITY":
        // Simplified eligibility check
        if (loan.amount > 1000000 && loan.type === "FHA") {
          ruleViolated = true
          message = "Loan amount exceeds FHA limits"
          recommendation = "Reduce loan amount or consider conventional financing"
        }
        break
    }

    if (ruleViolated) {
      violations.push({
        ruleId: rule.id,
        severity: rule.severity,
        message,
        recommendation,
      })

      // Deduct points based on severity
      const severityPoints = {
        critical: 25,
        high: 15,
        medium: 10,
        low: 5,
      }
      totalScore -= severityPoints[rule.severity]
    }
  }

  return {
    loanId: loan.id,
    overallScore: Math.max(0, totalScore),
    violations,
    bondCompliance,
  }
}

export async function POST(request: NextRequest) {
  try {
    const { loanIds, scanType = "full" } = await request.json()

    // Simulate fetching loan data (in real implementation, this would query the database)
    const mockLoans: LoanData[] = [
      {
        id: "FHA-2024-0892",
        type: "FHA",
        amount: 350000,
        borrowerInfo: { creditScore: 720, income: 75000 },
        documents: ["income_verification", "credit_report", "property_appraisal"],
        bondStructure: {
          guaranteePeriod: 25, // Should be 30 for FHA
          daxMirrorCompliant: true,
          governmentBacking: true,
        },
      },
      {
        id: "VA-2024-0445",
        type: "VA",
        amount: 425000,
        borrowerInfo: { creditScore: 680, income: 85000 },
        documents: ["income_verification", "credit_report", "property_appraisal", "va_certificate"],
        bondStructure: {
          guaranteePeriod: 50,
          daxMirrorCompliant: false, // Violation
          governmentBacking: true,
        },
      },
      {
        id: "USDA-2024-0234",
        type: "USDA",
        amount: 275000,
        borrowerInfo: { creditScore: 650, income: 55000 },
        documents: ["income_verification", "credit_report", "property_appraisal"],
        bondStructure: {
          guaranteePeriod: 35,
          daxMirrorCompliant: true,
          governmentBacking: true,
        },
      },
    ]

    // Filter loans if specific IDs provided
    const loansToScan = loanIds ? mockLoans.filter((loan) => loanIds.includes(loan.id)) : mockLoans

    // Run compliance checks
    const results: ComplianceResult[] = loansToScan.map(runComplianceCheck)

    // Calculate summary statistics
    const summary = {
      totalScanned: results.length,
      averageScore: results.reduce((sum, result) => sum + result.overallScore, 0) / results.length,
      totalViolations: results.reduce((sum, result) => sum + result.violations.length, 0),
      criticalViolations: results.reduce(
        (sum, result) => sum + result.violations.filter((v) => v.severity === "critical").length,
        0,
      ),
      bondComplianceRate:
        (results.filter((r) => r.bondCompliance.structureValid && r.bondCompliance.daxMirrorActive).length /
          results.length) *
        100,
    }

    return NextResponse.json({
      success: true,
      scanId: `SCAN-${Date.now()}`,
      timestamp: new Date().toISOString(),
      summary,
      results,
    })
  } catch (error) {
    console.error("Compliance scan error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const scanId = searchParams.get("scanId")

    if (scanId) {
      // Return specific scan results
      return NextResponse.json({
        success: true,
        scanId,
        status: "completed",
        results: [], // Would fetch from database
      })
    }

    // Return recent scans
    return NextResponse.json({
      success: true,
      recentScans: [
        {
          id: "SCAN-1705741935000",
          timestamp: "2024-01-20T14:32:15Z",
          loansScanned: 1247,
          averageScore: 96.2,
          status: "completed",
        },
      ],
    })
  } catch (error) {
    console.error("Error fetching compliance data:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
