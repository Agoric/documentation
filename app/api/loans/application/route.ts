import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_NEON_DATABASE_URL!)

interface LoanApplication {
  applicantId: string
  loanAmount: number
  loanTerm: number
  loanType: "50-year" | "30-year" | "15-year" | "commercial" | "investment"
  propertyType: "primary" | "secondary" | "investment" | "commercial"
  propertyValue: number
  downPayment: number
  annualIncome: number
  monthlyDebt: number
  creditScore: number
  employmentStatus: "employed" | "self-employed" | "retired" | "unemployed"
  employmentYears: number
  assets: number
  liabilities: number
  propertyAddress: string
  purpose: "purchase" | "refinance" | "cash-out"
}

interface UnderwritingResult {
  approved: boolean
  riskScore: number
  riskCategory: "low" | "medium" | "high" | "very-high"
  interestRate: number
  monthlyPayment: number
  loanToValue: number
  debtToIncome: number
  conditions: string[]
  requiredDocuments: string[]
  investorMatches: string[]
}

export async function POST(req: Request) {
  try {
    const application: LoanApplication = await req.json()

    // Automated underwriting engine
    const underwritingResult = await processUnderwriting(application)

    // Save application to database
    const applicationId = await saveApplication(application, underwritingResult)

    // Find matching investors
    const investorMatches = await findMatchingInvestors(application, underwritingResult)

    // Create loan processing workflow
    await createProcessingWorkflow(applicationId, underwritingResult)

    return NextResponse.json({
      success: true,
      applicationId,
      underwritingResult: {
        ...underwritingResult,
        investorMatches: investorMatches.map((inv) => inv.id),
      },
    })
  } catch (error) {
    console.error("Loan application error:", error)
    return NextResponse.json({ success: false, error: "Failed to process loan application" }, { status: 500 })
  }
}

async function processUnderwriting(application: LoanApplication): Promise<UnderwritingResult> {
  // Calculate key ratios
  const loanToValue = (application.loanAmount / application.propertyValue) * 100
  const debtToIncome =
    ((application.monthlyDebt + calculateMonthlyPayment(application)) / (application.annualIncome / 12)) * 100

  // Risk scoring algorithm
  let riskScore = 0
  const conditions: string[] = []
  const requiredDocuments: string[] = []

  // Credit score impact (40% of risk score)
  if (application.creditScore >= 800) riskScore += 40
  else if (application.creditScore >= 750) riskScore += 35
  else if (application.creditScore >= 700) riskScore += 30
  else if (application.creditScore >= 650) riskScore += 20
  else if (application.creditScore >= 600) riskScore += 10
  else {
    riskScore += 0
    conditions.push("Credit enhancement required")
  }

  // Debt-to-income ratio (25% of risk score)
  if (debtToIncome <= 28) riskScore += 25
  else if (debtToIncome <= 36) riskScore += 20
  else if (debtToIncome <= 43) riskScore += 15
  else if (debtToIncome <= 50) riskScore += 10
  else {
    riskScore += 0
    conditions.push("Debt consolidation recommended")
  }

  // Loan-to-value ratio (20% of risk score)
  if (loanToValue <= 80) riskScore += 20
  else if (loanToValue <= 90) riskScore += 15
  else if (loanToValue <= 95) riskScore += 10
  else {
    riskScore += 5
    conditions.push("PMI required")
  }

  // Employment stability (15% of risk score)
  if (application.employmentYears >= 5) riskScore += 15
  else if (application.employmentYears >= 2) riskScore += 12
  else if (application.employmentYears >= 1) riskScore += 8
  else {
    riskScore += 0
    conditions.push("Employment verification required")
  }

  // Determine risk category and interest rate
  let riskCategory: UnderwritingResult["riskCategory"]
  let baseRate = 3.1 // Base 50-year loan rate

  if (riskScore >= 85) {
    riskCategory = "low"
    baseRate += 0.0
  } else if (riskScore >= 70) {
    riskCategory = "medium"
    baseRate += 0.25
  } else if (riskScore >= 50) {
    riskCategory = "high"
    baseRate += 0.5
  } else {
    riskCategory = "very-high"
    baseRate += 1.0
  }

  // Required documents based on application
  requiredDocuments.push(
    "Government-issued ID",
    "Social Security card",
    "Pay stubs (last 2 months)",
    "Tax returns (last 2 years)",
    "Bank statements (last 3 months)",
    "Property appraisal",
    "Purchase agreement",
  )

  if (application.employmentStatus === "self-employed") {
    requiredDocuments.push("Business tax returns", "Profit & loss statements")
  }

  if (application.assets > 100000) {
    requiredDocuments.push("Investment account statements")
  }

  const approved = riskScore >= 50 && debtToIncome <= 50 && loanToValue <= 97

  return {
    approved,
    riskScore,
    riskCategory,
    interestRate: baseRate,
    monthlyPayment: calculateMonthlyPayment({
      ...application,
      loanAmount: application.loanAmount,
      loanTerm: application.loanTerm,
      interestRate: baseRate,
    }),
    loanToValue,
    debtToIncome,
    conditions,
    requiredDocuments,
    investorMatches: [],
  }
}

function calculateMonthlyPayment(params: {
  loanAmount: number
  loanTerm: number
  interestRate?: number
}): number {
  const { loanAmount, loanTerm, interestRate = 3.1 } = params
  const monthlyRate = interestRate / 100 / 12
  const numPayments = loanTerm * 12

  if (monthlyRate === 0) return loanAmount / numPayments

  return (
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) / (Math.pow(1 + monthlyRate, numPayments) - 1)
  )
}

async function saveApplication(application: LoanApplication, underwriting: UnderwritingResult): Promise<string> {
  const applicationId = `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  await sql`
    INSERT INTO loan_applications (
      id, applicant_id, loan_amount, loan_term, loan_type, property_type,
      property_value, down_payment, annual_income, monthly_debt, credit_score,
      employment_status, employment_years, assets, liabilities, property_address,
      purpose, risk_score, risk_category, interest_rate, monthly_payment,
      loan_to_value, debt_to_income, approved, conditions, required_documents,
      status, created_at
    ) VALUES (
      ${applicationId}, ${application.applicantId}, ${application.loanAmount},
      ${application.loanTerm}, ${application.loanType}, ${application.propertyType},
      ${application.propertyValue}, ${application.downPayment}, ${application.annualIncome},
      ${application.monthlyDebt}, ${application.creditScore}, ${application.employmentStatus},
      ${application.employmentYears}, ${application.assets}, ${application.liabilities},
      ${application.propertyAddress}, ${application.purpose}, ${underwriting.riskScore},
      ${underwriting.riskCategory}, ${underwriting.interestRate}, ${underwriting.monthlyPayment},
      ${underwriting.loanToValue}, ${underwriting.debtToIncome}, ${underwriting.approved},
      ${JSON.stringify(underwriting.conditions)}, ${JSON.stringify(underwriting.requiredDocuments)},
      'pending', NOW()
    )
  `

  return applicationId
}

async function findMatchingInvestors(application: LoanApplication, underwriting: UnderwritingResult) {
  const investors = await sql`
    SELECT * FROM investors 
    WHERE status = 'active'
    AND min_loan_amount <= ${application.loanAmount}
    AND max_loan_amount >= ${application.loanAmount}
    AND risk_tolerance >= ${underwriting.riskScore}
    AND preferred_loan_types @> ${JSON.stringify([application.loanType])}
    ORDER BY available_capital DESC
    LIMIT 10
  `

  return investors
}

async function createProcessingWorkflow(applicationId: string, underwriting: UnderwritingResult) {
  const workflowSteps = [
    { step: "document_collection", status: "pending", order: 1 },
    { step: "income_verification", status: "pending", order: 2 },
    { step: "property_appraisal", status: "pending", order: 3 },
    { step: "title_search", status: "pending", order: 4 },
    { step: "final_underwriting", status: "pending", order: 5 },
    { step: "investor_funding", status: "pending", order: 6 },
    { step: "closing_preparation", status: "pending", order: 7 },
  ]

  for (const step of workflowSteps) {
    await sql`
      INSERT INTO loan_workflow (
        application_id, step_name, status, step_order, created_at
      ) VALUES (
        ${applicationId}, ${step.step}, ${step.status}, ${step.order}, NOW()
      )
    `
  }
}
