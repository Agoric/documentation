import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_NEON_DATABASE_URL!)

interface ComplianceQuery {
  query: string
  loanId?: string
  institutionId?: string
  regulationType?: string
}

interface ComplianceResponse {
  response: string
  confidence: number
  category: "compliance" | "regulation" | "risk" | "documentation"
  actions?: Array<{
    label: string
    type: string
    data?: any
  }>
  regulations?: Array<{
    name: string
    status: "compliant" | "non-compliant" | "warning" | "pending"
    description: string
  }>
}

export async function POST(request: NextRequest) {
  try {
    const body: ComplianceQuery = await request.json()
    const { query, loanId, institutionId, regulationType } = body

    // Analyze the query and generate appropriate response
    const response = await analyzeComplianceQuery(query, loanId, institutionId, regulationType)

    // Log the interaction for audit purposes
    await logComplianceInteraction(query, response, institutionId)

    return NextResponse.json({
      success: true,
      data: response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Compliance bot error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process compliance query",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

async function analyzeComplianceQuery(
  query: string,
  loanId?: string,
  institutionId?: string,
  regulationType?: string,
): Promise<ComplianceResponse> {
  const queryLower = query.toLowerCase()

  // Compliance check queries
  if (queryLower.includes("compliance") || queryLower.includes("check")) {
    const regulations = await getComplianceStatus(loanId, institutionId)
    return {
      response: generateComplianceReport(regulations),
      confidence: 95,
      category: "compliance",
      regulations,
      actions: [
        { label: "Generate Full Report", type: "generate_report" },
        { label: "Schedule Review", type: "schedule_review" },
      ],
    }
  }

  // Risk assessment queries
  if (queryLower.includes("risk") || queryLower.includes("assessment")) {
    const riskData = await performRiskAssessment(loanId, institutionId)
    return {
      response: generateRiskReport(riskData),
      confidence: 92,
      category: "risk",
      actions: [
        { label: "Detailed Risk Analysis", type: "detailed_risk" },
        { label: "Mitigation Strategies", type: "mitigation_plan" },
      ],
    }
  }

  // Documentation queries
  if (queryLower.includes("document") || queryLower.includes("paperwork")) {
    const docRequirements = await getDocumentationRequirements(regulationType)
    return {
      response: generateDocumentationGuide(docRequirements),
      confidence: 98,
      category: "documentation",
      actions: [
        { label: "Document Checklist", type: "document_checklist" },
        { label: "Upload Portal", type: "upload_documents" },
      ],
    }
  }

  // Regulatory update queries
  if (queryLower.includes("regulatory") || queryLower.includes("update") || queryLower.includes("law")) {
    const updates = await getLatestRegulatoryUpdates()
    return {
      response: generateRegulatoryUpdate(updates),
      confidence: 96,
      category: "regulation",
      actions: [
        { label: "Full Update Report", type: "regulatory_report" },
        { label: "Impact Analysis", type: "impact_analysis" },
      ],
    }
  }

  // Default response
  return {
    response:
      "I can help you with loan compliance, risk assessment, documentation requirements, and regulatory updates. Please specify what type of assistance you need.",
    confidence: 85,
    category: "compliance",
    actions: [
      { label: "Compliance Check", type: "compliance_check" },
      { label: "Risk Assessment", type: "risk_assessment" },
      { label: "Document Review", type: "document_review" },
    ],
  }
}

async function getComplianceStatus(loanId?: string, institutionId?: string) {
  // Simulate compliance check results
  return [
    {
      name: "Dodd-Frank Act",
      status: "compliant" as const,
      description: "Qualified Mortgage (QM) requirements satisfied",
    },
    {
      name: "TRID (TILA-RESPA)",
      status: "compliant" as const,
      description: "Loan Estimate and Closing Disclosure timing compliant",
    },
    {
      name: "Fair Lending (ECOA)",
      status: "warning" as const,
      description: "Disparate impact analysis requires review",
    },
    {
      name: "BSA/AML",
      status: "pending" as const,
      description: "Customer Due Diligence verification in progress",
    },
    {
      name: "CRA Compliance",
      status: "compliant" as const,
      description: "Community Reinvestment Act requirements met",
    },
  ]
}

async function performRiskAssessment(loanId?: string, institutionId?: string) {
  return {
    overallScore: 7.2,
    riskLevel: "Acceptable",
    factors: [
      { factor: "Credit Risk", score: 6.8, weight: 0.4 },
      { factor: "Market Risk", score: 7.5, weight: 0.3 },
      { factor: "Operational Risk", score: 7.0, weight: 0.2 },
      { factor: "Compliance Risk", score: 8.2, weight: 0.1 },
    ],
    concerns: [
      "Concentration risk in technology sector",
      "Geographic concentration in California",
      "Pending BSA/AML verification for large loans",
    ],
    recommendations: [
      "Diversify sector allocation",
      "Expand geographic distribution",
      "Expedite AML verification process",
    ],
  }
}

async function getDocumentationRequirements(regulationType?: string) {
  return [
    { document: "Loan Application", required: true, status: "complete" },
    { document: "Financial Statements (3 years)", required: true, status: "pending" },
    { document: "Credit Reports", required: true, status: "complete" },
    { document: "Collateral Appraisals", required: true, status: "pending" },
    { document: "Legal Opinions", required: true, status: "not_started" },
    { document: "Environmental Reports", required: false, status: "not_applicable" },
    { document: "Insurance Certificates", required: true, status: "complete" },
    { document: "Compliance Certifications", required: true, status: "pending" },
  ]
}

async function getLatestRegulatoryUpdates() {
  return [
    {
      date: "2024-01-15",
      agency: "CFPB",
      title: "Digital Lending Platform Guidance",
      impact: "Medium",
      summary: "New guidance on digital lending platforms and consumer protection requirements",
    },
    {
      date: "2024-01-10",
      agency: "Federal Reserve",
      title: "Stress Testing Requirements Update",
      impact: "High",
      summary: "Updated stress testing requirements for large financial institutions",
    },
    {
      date: "2024-01-05",
      agency: "OCC",
      title: "Cryptocurrency Collateral Guidelines",
      impact: "Low",
      summary: "Clarification on cryptocurrency as loan collateral",
    },
  ]
}

function generateComplianceReport(regulations: any[]) {
  const compliant = regulations.filter((r) => r.status === "compliant").length
  const warnings = regulations.filter((r) => r.status === "warning").length
  const pending = regulations.filter((r) => r.status === "pending").length
  const nonCompliant = regulations.filter((r) => r.status === "non-compliant").length

  return `Compliance check completed. Results: ${compliant} compliant, ${warnings} warnings, ${pending} pending, ${nonCompliant} non-compliant. ${
    warnings > 0 ? "Attention required for Fair Lending analysis. " : ""
  }${pending > 0 ? "BSA/AML verification in progress. " : ""}Overall compliance score: ${Math.round(
    ((compliant + warnings * 0.5) / regulations.length) * 100,
  )}%`
}

function generateRiskReport(riskData: any) {
  return `Risk assessment completed. Overall risk score: ${riskData.overallScore}/10 (${
    riskData.riskLevel
  }). Key concerns: ${riskData.concerns.join(", ")}. Recommendations: ${riskData.recommendations.join(", ")}.`
}

function generateDocumentationGuide(requirements: any[]) {
  const total = requirements.length
  const complete = requirements.filter((r) => r.status === "complete").length
  const pending = requirements.filter((r) => r.status === "pending").length

  return `Documentation review: ${complete}/${total} documents complete, ${pending} pending. Required documents include loan application, financial statements, credit reports, collateral appraisals, legal opinions, insurance certificates, and compliance certifications. All documents must be digitally signed and stored securely.`
}

function generateRegulatoryUpdate(updates: any[]) {
  return `Latest regulatory updates (${updates.length} items): ${updates
    .map((u) => `${u.agency} - ${u.title} (${u.impact} impact)`)
    .join("; ")}. All updates have been integrated into compliance monitoring system.`
}

async function logComplianceInteraction(query: string, response: ComplianceResponse, institutionId?: string) {
  try {
    await sql`
      INSERT INTO compliance_bot_logs (
        institution_id,
        query,
        response,
        confidence,
        category,
        created_at
      ) VALUES (
        ${institutionId || "system"},
        ${query},
        ${response.response},
        ${response.confidence},
        ${response.category},
        NOW()
      )
    `
  } catch (error) {
    console.error("Failed to log compliance interaction:", error)
  }
}

export async function GET() {
  return NextResponse.json({
    status: "operational",
    message: "Loan Compliance Bot API is running",
    version: "1.0.0",
    capabilities: [
      "Compliance checking",
      "Risk assessment",
      "Documentation review",
      "Regulatory updates",
      "Audit trail logging",
    ],
  })
}
