import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_NEON_DATABASE_URL!)

interface LoanMatchingRequest {
  applicationId: string
  loanAmount: number
  riskScore: number
  loanType: string
  propertyType: string
  creditScore: number
  loanToValue: number
  geographicLocation: string
}

interface InvestorMatch {
  investorId: string
  investorName: string
  matchScore: number
  availableCapital: number
  targetReturn: number
  riskTolerance: number
  investmentAmount: number
  expectedReturn: number
  matchReasons: string[]
}

export async function POST(req: Request) {
  try {
    const matchingRequest: LoanMatchingRequest = await req.json()

    // Find potential investors
    const potentialInvestors = await findPotentialInvestors(matchingRequest)

    // Calculate match scores and rank investors
    const rankedMatches = await calculateMatchScores(matchingRequest, potentialInvestors)

    // Create investment opportunities
    const opportunities = await createInvestmentOpportunities(matchingRequest, rankedMatches)

    return NextResponse.json({
      success: true,
      matches: rankedMatches,
      opportunities,
      totalMatches: rankedMatches.length,
    })
  } catch (error) {
    console.error("Loan matching error:", error)
    return NextResponse.json({ success: false, error: "Failed to match loan with investors" }, { status: 500 })
  }
}

async function findPotentialInvestors(request: LoanMatchingRequest) {
  const investors = await sql`
    SELECT 
      id, name, type, available_capital, target_return, risk_tolerance,
      min_loan_amount, max_loan_amount, preferred_loan_types,
      geographic_preferences, property_types, max_loan_to_value,
      min_credit_score
    FROM investors 
    WHERE status = 'active'
    AND verification_status = 'verified'
    AND available_capital >= ${request.loanAmount * 0.1} -- At least 10% participation
    AND min_loan_amount <= ${request.loanAmount}
    AND max_loan_amount >= ${request.loanAmount}
    AND risk_tolerance >= ${request.riskScore - 20} -- Allow some flexibility
    AND min_credit_score <= ${request.creditScore}
    AND max_loan_to_value >= ${request.loanToValue}
  `

  return investors.filter((investor) => {
    // Check loan type preference
    const preferredTypes = investor.preferred_loan_types || []
    if (preferredTypes.length > 0 && !preferredTypes.includes(request.loanType)) {
      return false
    }

    // Check property type preference
    const preferredProperties = investor.property_types || []
    if (preferredProperties.length > 0 && !preferredProperties.includes(request.propertyType)) {
      return false
    }

    // Check geographic preference
    const geoPreferences = investor.geographic_preferences || []
    if (geoPreferences.length > 0) {
      const matchesGeo = geoPreferences.some((geo) =>
        request.geographicLocation.toLowerCase().includes(geo.toLowerCase()),
      )
      if (!matchesGeo) return false
    }

    return true
  })
}

async function calculateMatchScores(request: LoanMatchingRequest, investors: any[]): Promise<InvestorMatch[]> {
  const matches: InvestorMatch[] = []

  for (const investor of investors) {
    let matchScore = 0
    const matchReasons: string[] = []

    // Risk tolerance alignment (30% of score)
    const riskAlignment = Math.max(0, 100 - Math.abs(investor.risk_tolerance - request.riskScore))
    matchScore += (riskAlignment / 100) * 30
    if (riskAlignment > 80) {
      matchReasons.push("Excellent risk tolerance match")
    }

    // Loan amount capacity (25% of score)
    const capacityRatio = Math.min(1, investor.available_capital / request.loanAmount)
    matchScore += capacityRatio * 25
    if (capacityRatio >= 1) {
      matchReasons.push("Full funding capacity available")
    } else if (capacityRatio >= 0.5) {
      matchReasons.push("Substantial funding capacity")
    }

    // Credit score preference (20% of score)
    const creditBonus = Math.max(0, request.creditScore - investor.min_credit_score)
    matchScore += Math.min(20, creditBonus / 10)
    if (creditBonus > 50) {
      matchReasons.push("Exceeds minimum credit requirements")
    }

    // Loan-to-value preference (15% of score)
    const ltvScore = Math.max(0, investor.max_loan_to_value - request.loanToValue)
    matchScore += Math.min(15, ltvScore / 5)
    if (ltvScore > 10) {
      matchReasons.push("Conservative LTV ratio")
    }

    // Investment history and performance (10% of score)
    const performanceBonus = await getInvestorPerformanceScore(investor.id)
    matchScore += performanceBonus
    if (performanceBonus > 7) {
      matchReasons.push("Strong investment track record")
    }

    // Calculate investment amount and expected return
    const maxInvestment = Math.min(investor.available_capital, request.loanAmount)
    const investmentAmount = Math.min(maxInvestment, request.loanAmount * 0.5) // Max 50% participation
    const expectedReturn = (investmentAmount * investor.target_return) / 100

    matches.push({
      investorId: investor.id,
      investorName: investor.name,
      matchScore: Math.round(matchScore),
      availableCapital: investor.available_capital,
      targetReturn: investor.target_return,
      riskTolerance: investor.risk_tolerance,
      investmentAmount,
      expectedReturn,
      matchReasons,
    })
  }

  // Sort by match score (highest first)
  return matches.sort((a, b) => b.matchScore - a.matchScore)
}

async function getInvestorPerformanceScore(investorId: string): Promise<number> {
  const performance = await sql`
    SELECT 
      COUNT(*) as total_loans,
      AVG(actual_return) as avg_return,
      COUNT(CASE WHEN loan_status = 'defaulted' THEN 1 END) as defaults
    FROM investor_loans 
    WHERE investor_id = ${investorId}
  `

  const data = performance[0]
  if (!data || data.total_loans === 0) return 5 // Neutral score for new investors

  let score = 5

  // Bonus for experience
  if (data.total_loans > 10) score += 2
  else if (data.total_loans > 5) score += 1

  // Bonus for good returns
  if (data.avg_return > 8) score += 2
  else if (data.avg_return > 6) score += 1

  // Penalty for defaults
  const defaultRate = data.defaults / data.total_loans
  if (defaultRate > 0.1) score -= 3
  else if (defaultRate > 0.05) score -= 1

  return Math.max(0, Math.min(10, score))
}

async function createInvestmentOpportunities(request: LoanMatchingRequest, matches: InvestorMatch[]) {
  const opportunities = []

  for (const match of matches.slice(0, 5)) {
    // Top 5 matches
    const opportunityId = `OPP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    await sql`
      INSERT INTO investment_opportunities (
        id, application_id, investor_id, loan_amount, investment_amount,
        expected_return, match_score, status, created_at, expires_at
      ) VALUES (
        ${opportunityId}, ${request.applicationId}, ${match.investorId},
        ${request.loanAmount}, ${match.investmentAmount}, ${match.expectedReturn},
        ${match.matchScore}, 'pending', NOW(), NOW() + INTERVAL '7 days'
      )
    `

    opportunities.push({
      id: opportunityId,
      investorId: match.investorId,
      investorName: match.investorName,
      investmentAmount: match.investmentAmount,
      expectedReturn: match.expectedReturn,
      matchScore: match.matchScore,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
  }

  return opportunities
}
