import { type NextRequest, NextResponse } from "next/server"

interface ComplianceRule {
  id: string
  category: string
  description: string
  severity: "low" | "medium" | "high" | "critical"
  checkFunction: () => Promise<{
    status: "passed" | "failed" | "warning" | "pending"
    details: string
    recommendations?: string[]
  }>
}

interface InstitutionalRequirements {
  minimumInvestment: number
  targetROI: number
  governmentGuaranteedRequired: boolean
}

const INSTITUTIONAL_REQUIREMENTS: InstitutionalRequirements = {
  minimumInvestment: 100000000, // $100M
  targetROI: 20, // 20%
  governmentGuaranteedRequired: true,
}

const complianceRules: ComplianceRule[] = [
  {
    id: "kyc-001",
    category: "KYC/AML",
    description: "Customer identity verification and anti-money laundering compliance",
    severity: "critical",
    checkFunction: async () => {
      // Simulate KYC/AML check
      const kycCompliance = Math.random() > 0.1 // 90% pass rate
      return {
        status: kycCompliance ? "passed" : "failed",
        details: kycCompliance
          ? "All customer identities verified with government-issued documents"
          : "Some customers require additional identity verification",
        recommendations: kycCompliance ? [] : ["Request additional documentation", "Perform enhanced due diligence"],
      }
    },
  },
  {
    id: "reg-002",
    category: "Regulatory",
    description: "Federal lending regulations compliance (TILA, RESPA, CFPB)",
    severity: "critical",
    checkFunction: async () => {
      // Simulate regulatory compliance check
      const regCompliance = Math.random() > 0.05 // 95% pass rate
      return {
        status: regCompliance ? "passed" : "warning",
        details: regCompliance
          ? "Full compliance with Truth in Lending Act and Real Estate Settlement Procedures Act"
          : "Minor documentation updates required for full compliance",
        recommendations: regCompliance ? [] : ["Update disclosure forms", "Review settlement procedures"],
      }
    },
  },
  {
    id: "cap-003",
    category: "Capital Requirements",
    description: "Minimum institutional investment threshold verification",
    severity: "critical",
    checkFunction: async () => {
      // Simulate capital requirements check
      const currentInvestment = 2847392000 // $2.8B (from mock data)
      const meetsRequirement = currentInvestment >= INSTITUTIONAL_REQUIREMENTS.minimumInvestment

      return {
        status: meetsRequirement ? "passed" : "failed",
        details: `Current investments: $${(currentInvestment / 1000000).toFixed(0)}M (Min: $${(INSTITUTIONAL_REQUIREMENTS.minimumInvestment / 1000000).toFixed(0)}M)`,
        recommendations: meetsRequirement
          ? []
          : [
              "Increase institutional investment to meet minimum threshold",
              "Seek additional qualified institutional investors",
            ],
      }
    },
  },
  {
    id: "roi-004",
    category: "ROI Compliance",
    description: "Government guaranteed mortgage ROI verification",
    severity: "high",
    checkFunction: async () => {
      // Simulate ROI compliance check
      const actualROI = 22.4 // From mock data
      const meetsTarget = actualROI >= INSTITUTIONAL_REQUIREMENTS.targetROI

      return {
        status: meetsTarget ? "passed" : "warning",
        details: `Actual ROI: ${actualROI}% (Target: ${INSTITUTIONAL_REQUIREMENTS.targetROI}%)`,
        recommendations: meetsTarget
          ? ["Continue current investment strategy"]
          : ["Review portfolio allocation", "Optimize government-guaranteed mortgage selection"],
      }
    },
  },
  {
    id: "doc-005",
    category: "Documentation",
    description: "Loan documentation and record keeping standards",
    severity: "medium",
    checkFunction: async () => {
      // Simulate documentation check
      const pendingDocs = Math.floor(Math.random() * 5) // 0-4 pending docs
      const status = pendingDocs === 0 ? "passed" : pendingDocs <= 2 ? "warning" : "failed"

      return {
        status,
        details:
          pendingDocs === 0
            ? "All loan documentation complete and properly filed"
            : `${pendingDocs} documents pending completion`,
        recommendations:
          pendingDocs === 0 ? [] : ["Complete pending documentation", "Implement automated document tracking"],
      }
    },
  },
  {
    id: "risk-006",
    category: "Risk Assessment",
    description: "Credit risk and default probability analysis",
    severity: "high",
    checkFunction: async () => {
      // Simulate risk assessment
      const defaultRisk = 1.8 // <2% as specified
      const acceptable = defaultRisk < 2.0

      return {
        status: acceptable ? "passed" : "warning",
        details: `Current default risk: ${defaultRisk}% (Threshold: <2.0%)`,
        recommendations: acceptable
          ? ["Maintain current risk management practices"]
          : ["Review credit scoring models", "Tighten lending criteria"],
      }
    },
  },
  {
    id: "gov-007",
    category: "Government Guarantees",
    description: "Government-backed mortgage verification and compliance",
    severity: "critical",
    checkFunction: async () => {
      // Simulate government guarantee verification
      const governmentBacked = 1847392000 // $1.8B from mock data
      const totalPortfolio = 2847392000 // $2.8B
      const percentage = (governmentBacked / totalPortfolio) * 100

      return {
        status: percentage >= 60 ? "passed" : "warning",
        details: `Government-guaranteed mortgages: $${(governmentBacked / 1000000000).toFixed(1)}B (${percentage.toFixed(1)}% of portfolio)`,
        recommendations:
          percentage >= 60
            ? ["Maintain government guarantee ratio"]
            : ["Increase government-guaranteed mortgage allocation"],
      }
    },
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { scanType = "full", categories = [] } = body

    // Filter rules based on scan type and categories
    let rulesToCheck = complianceRules
    if (scanType === "quick") {
      rulesToCheck = complianceRules.filter((rule) => rule.severity === "critical")
    }
    if (categories.length > 0) {
      rulesToCheck = rulesToCheck.filter((rule) => categories.includes(rule.category))
    }

    // Execute compliance checks
    const results = await Promise.all(
      rulesToCheck.map(async (rule) => {
        const result = await rule.checkFunction()
        return {
          id: rule.id,
          category: rule.category,
          description: rule.description,
          severity: rule.severity,
          ...result,
          lastChecked: new Date().toISOString(),
        }
      }),
    )

    // Calculate overall compliance score
    const passedChecks = results.filter((r) => r.status === "passed").length
    const totalChecks = results.length
    const complianceScore = Math.round((passedChecks / totalChecks) * 100)

    // Generate summary
    const summary = {
      totalChecks,
      passedChecks,
      failedChecks: results.filter((r) => r.status === "failed").length,
      warningChecks: results.filter((r) => r.status === "warning").length,
      pendingChecks: results.filter((r) => r.status === "pending").length,
      complianceScore,
      scanType,
      timestamp: new Date().toISOString(),
    }

    // Check institutional requirements
    const institutionalCompliance = {
      minimumInvestmentMet: true, // Based on mock data
      roiTargetMet: true, // 22.4% > 20%
      governmentGuaranteeRatio: 64.9, // $1.8B / $2.8B
      qualifiesForInstitutional: true,
    }

    return NextResponse.json({
      success: true,
      summary,
      results,
      institutionalCompliance,
      recommendations: results
        .filter((r) => r.recommendations && r.recommendations.length > 0)
        .map((r) => ({
          category: r.category,
          recommendations: r.recommendations,
        })),
    })
  } catch (error) {
    console.error("Compliance scan error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to perform compliance scan",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const severity = searchParams.get("severity")

    // Return available compliance categories and rules
    const categories = [...new Set(complianceRules.map((rule) => rule.category))]
    const severityLevels = ["low", "medium", "high", "critical"]

    let filteredRules = complianceRules
    if (category) {
      filteredRules = filteredRules.filter((rule) => rule.category === category)
    }
    if (severity) {
      filteredRules = filteredRules.filter((rule) => rule.severity === severity)
    }

    return NextResponse.json({
      success: true,
      categories,
      severityLevels,
      rules: filteredRules.map((rule) => ({
        id: rule.id,
        category: rule.category,
        description: rule.description,
        severity: rule.severity,
      })),
      institutionalRequirements: INSTITUTIONAL_REQUIREMENTS,
    })
  } catch (error) {
    console.error("Compliance rules fetch error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch compliance rules",
      },
      { status: 500 },
    )
  }
}
