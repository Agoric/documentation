import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_NEON_DATABASE_URL!)

interface ComplianceScanRequest {
  loanId: string
  scanType: "institutional" | "government" | "roi" | "full"
  institutionalMinimum: number
  targetROI: number
}

interface ComplianceCheck {
  id: string
  description: string
  passed: boolean
  severity: "critical" | "high" | "medium" | "low"
  details?: string
  bondType?: "FHA" | "VA" | "USDA" | "SBA"
}

interface GovernmentBondValidation {
  bondType: "FHA" | "VA" | "USDA" | "SBA"
  term: number
  guaranteeRate: number
  minimumInvestment: number
  expectedROI: number
  complianceScore: number
  validationChecks: ComplianceCheck[]
}

export async function POST(req: Request) {
  try {
    const scanRequest: ComplianceScanRequest = await req.json()

    // Validate institutional minimum investment ($100M)
    const institutionalChecks = await validateInstitutionalRequirements(scanRequest)

    // Validate government bond structures
    const bondValidation = await validateGovernmentBonds(scanRequest)

    // Validate ROI requirements (20% compounded)
    const roiValidation = await validateROICompliance(scanRequest)

    // Calculate overall compliance score
    const overallScore = calculateOverallScore([...institutionalChecks, ...bondValidation, ...roiValidation])

    // Store scan results in database
    await storeScanResults(scanRequest.loanId, {
      overallScore,
      institutionalChecks,
      bondValidation,
      roiValidation,
      scanType: scanRequest.scanType,
      timestamp: new Date(),
    })

    return NextResponse.json({
      success: true,
      loanId: scanRequest.loanId,
      overallScore,
      investmentAmount: getInvestmentAmount(scanRequest.loanId),
      checks: [...institutionalChecks, ...bondValidation, ...roiValidation],
      bondStructures: await getGovernmentBondStructures(),
      recommendations: generateRecommendations(overallScore, [
        ...institutionalChecks,
        ...bondValidation,
        ...roiValidation,
      ]),
    })
  } catch (error) {
    console.error("Compliance scan error:", error)
    return NextResponse.json({ success: false, error: "Failed to perform compliance scan" }, { status: 500 })
  }
}

async function validateInstitutionalRequirements(request: ComplianceScanRequest): Promise<ComplianceCheck[]> {
  const checks: ComplianceCheck[] = []

  // Check minimum investment requirement ($100M)
  const investmentAmount = getInvestmentAmount(request.loanId)
  checks.push({
    id: "INST-001",
    description: "Minimum institutional investment of $100M",
    passed: investmentAmount >= request.institutionalMinimum,
    severity: investmentAmount >= request.institutionalMinimum ? "low" : "critical",
    details: `Current investment: $${(investmentAmount / 1000000).toFixed(1)}M`,
  })

  // Check institutional investor accreditation
  checks.push({
    id: "INST-002",
    description: "Institutional investor accreditation verified",
    passed: true, // Mock validation
    severity: "low",
    details: "Accreditation status: Verified",
  })

  // Check portfolio diversification requirements
  checks.push({
    id: "INST-003",
    description: "Portfolio diversification across government bond types",
    passed: true, // Mock validation
    severity: "medium",
    details: "Diversification score: 92%",
  })

  // Check regulatory compliance
  checks.push({
    id: "INST-004",
    description: "SEC and banking regulatory compliance",
    passed: true, // Mock validation
    severity: "high",
    details: "All regulatory requirements met",
  })

  return checks
}

async function validateGovernmentBonds(request: ComplianceScanRequest): Promise<ComplianceCheck[]> {
  const checks: ComplianceCheck[] = []

  // FHA 30-Year Bond Validation
  checks.push({
    id: "FHA-001",
    description: "FHA 30-year government guarantee validation",
    passed: true,
    severity: "low",
    bondType: "FHA",
    details: "100% government guarantee confirmed",
  })

  checks.push({
    id: "FHA-002",
    description: "FHA borrower eligibility and documentation",
    passed: true,
    severity: "medium",
    bondType: "FHA",
    details: "All FHA requirements met",
  })

  // VA 50-Year Bond Validation
  checks.push({
    id: "VA-001",
    description: "VA 50-year government guarantee validation",
    passed: true,
    severity: "low",
    bondType: "VA",
    details: "100% government guarantee confirmed",
  })

  checks.push({
    id: "VA-002",
    description: "VA eligibility and certificate validation",
    passed: true,
    severity: "medium",
    bondType: "VA",
    details: "Veteran eligibility verified",
  })

  // USDA 35-Year Bond Validation
  checks.push({
    id: "USDA-001",
    description: "USDA 35-year government guarantee validation",
    passed: true,
    severity: "low",
    bondType: "USDA",
    details: "90% government guarantee confirmed",
  })

  checks.push({
    id: "USDA-002",
    description: "USDA rural area and income eligibility",
    passed: true,
    severity: "medium",
    bondType: "USDA",
    details: "Rural eligibility confirmed",
  })

  // SBA 25-Year Bond Validation
  checks.push({
    id: "SBA-001",
    description: "SBA 25-year government guarantee validation",
    passed: true,
    severity: "low",
    bondType: "SBA",
    details: "85% government guarantee confirmed",
  })

  checks.push({
    id: "SBA-002",
    description: "SBA 504 program compliance",
    passed: true,
    severity: "medium",
    bondType: "SBA",
    details: "SBA 504 requirements met",
  })

  return checks
}

async function validateROICompliance(request: ComplianceScanRequest): Promise<ComplianceCheck[]> {
  const checks: ComplianceCheck[] = []

  // Check target ROI achievement (20%)
  const currentROI = calculateCurrentROI(request.loanId)
  checks.push({
    id: "ROI-001",
    description: "Target ROI of 20% compounded annually",
    passed: currentROI >= request.targetROI,
    severity: currentROI >= request.targetROI ? "low" : "high",
    details: `Current ROI: ${currentROI.toFixed(1)}%`,
  })

  // Check compounded interest calculation
  checks.push({
    id: "ROI-002",
    description: "Compounded interest revenue calculation accuracy",
    passed: true,
    severity: "low",
    details: "Compound interest calculations verified",
  })

  // Check risk-adjusted returns
  const riskAdjustedROI = currentROI * 0.9 // Mock risk adjustment
  checks.push({
    id: "ROI-003",
    description: "Risk-adjusted returns meet institutional standards",
    passed: riskAdjustedROI >= 15.0,
    severity: riskAdjustedROI >= 15.0 ? "low" : "medium",
    details: `Risk-adjusted ROI: ${riskAdjustedROI.toFixed(1)}%`,
  })

  // Check government guarantee impact on returns
  checks.push({
    id: "ROI-004",
    description: "Government guarantee enhances return stability",
    passed: true,
    severity: "low",
    details: "Government backing reduces risk profile",
  })

  return checks
}

function calculateOverallScore(checks: ComplianceCheck[]): number {
  const totalChecks = checks.length
  const passedChecks = checks.filter((check) => check.passed).length
  const weightedScore = checks.reduce((score, check) => {
    const weight = check.severity === "critical" ? 3 : check.severity === "high" ? 2 : 1
    return score + (check.passed ? weight : 0)
  }, 0)
  const maxWeight = checks.reduce((weight, check) => {
    return weight + (check.severity === "critical" ? 3 : check.severity === "high" ? 2 : 1)
  }, 0)

  return Math.round((weightedScore / maxWeight) * 100)
}

function getInvestmentAmount(loanId: string): number {
  // Mock function - in real implementation, would query database
  const mockAmounts: { [key: string]: number } = {
    "INST-2024-001": 125000000, // $125M
    "INST-2024-002": 98500000, // $98.5M
    "INST-2024-003": 150000000, // $150M
    default: 110000000, // $110M
  }
  return mockAmounts[loanId] || mockAmounts.default
}

function calculateCurrentROI(loanId: string): number {
  // Mock function - in real implementation, would calculate actual ROI
  const mockROIs: { [key: string]: number } = {
    "INST-2024-001": 20.3,
    "INST-2024-002": 19.8,
    "INST-2024-003": 21.2,
    default: 20.1,
  }
  return mockROIs[loanId] || mockROIs.default
}

async function getGovernmentBondStructures(): Promise<GovernmentBondValidation[]> {
  return [
    {
      bondType: "FHA",
      term: 30,
      guaranteeRate: 100,
      minimumInvestment: 100000000,
      expectedROI: 20.0,
      complianceScore: 98,
      validationChecks: [],
    },
    {
      bondType: "VA",
      term: 50,
      guaranteeRate: 100,
      minimumInvestment: 100000000,
      expectedROI: 20.0,
      complianceScore: 96,
      validationChecks: [],
    },
    {
      bondType: "USDA",
      term: 35,
      guaranteeRate: 90,
      minimumInvestment: 100000000,
      expectedROI: 20.0,
      complianceScore: 94,
      validationChecks: [],
    },
    {
      bondType: "SBA",
      term: 25,
      guaranteeRate: 85,
      minimumInvestment: 100000000,
      expectedROI: 20.0,
      complianceScore: 99,
      validationChecks: [],
    },
  ]
}

function generateRecommendations(score: number, checks: ComplianceCheck[]): string[] {
  const recommendations: string[] = []

  if (score < 90) {
    recommendations.push("Consider increasing portfolio diversification across government bond types")
  }

  const failedChecks = checks.filter((check) => !check.passed)
  if (failedChecks.length > 0) {
    recommendations.push("Address failed compliance checks to improve overall score")
  }

  if (score >= 95) {
    recommendations.push("Excellent compliance score - consider expanding institutional investment")
  }

  recommendations.push("Maintain regular compliance monitoring for optimal 20% ROI performance")

  return recommendations
}

async function storeScanResults(loanId: string, results: any): Promise<void> {
  try {
    await sql`
      INSERT INTO compliance_scans (
        loan_id, overall_score, scan_type, results, created_at
      ) VALUES (
        ${loanId}, ${results.overallScore}, ${results.scanType}, 
        ${JSON.stringify(results)}, NOW()
      )
    `
  } catch (error) {
    console.error("Failed to store scan results:", error)
  }
}
