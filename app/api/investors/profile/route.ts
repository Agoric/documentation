import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_NEON_DATABASE_URL!)

interface InvestorProfile {
  id: string
  name: string
  type: "individual" | "institutional" | "fund" | "bank" | "credit_union"
  email: string
  phone: string
  address: string

  // Investment Preferences
  minLoanAmount: number
  maxLoanAmount: number
  preferredLoanTypes: string[]
  riskTolerance: number // 0-100 scale
  targetReturn: number
  investmentHorizon: number // years

  // Financial Information
  totalCapital: number
  availableCapital: number
  deployedCapital: number
  portfolioValue: number

  // Performance Metrics
  totalLoansInvested: number
  averageReturn: number
  defaultRate: number

  // Preferences
  geographicPreferences: string[]
  propertyTypes: string[]
  maxLoanToValue: number
  minCreditScore: number

  // Status
  status: "active" | "inactive" | "suspended" | "pending_approval"
  verificationStatus: "verified" | "pending" | "rejected"
  accreditedInvestor: boolean

  createdAt: Date
  updatedAt: Date
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const investorId = searchParams.get("id")

    if (investorId) {
      // Get specific investor profile
      const investor = await sql`
        SELECT * FROM investors WHERE id = ${investorId}
      `

      if (investor.length === 0) {
        return NextResponse.json({ success: false, error: "Investor not found" }, { status: 404 })
      }

      // Get investor performance metrics
      const performance = await getInvestorPerformance(investorId)

      return NextResponse.json({
        success: true,
        investor: { ...investor[0], performance },
      })
    } else {
      // Get all investors with filters
      const status = searchParams.get("status") || "active"
      const type = searchParams.get("type")
      const minCapital = searchParams.get("minCapital")

      let query = sql`SELECT * FROM investors WHERE status = ${status}`

      if (type) {
        query = sql`SELECT * FROM investors WHERE status = ${status} AND type = ${type}`
      }

      if (minCapital) {
        query = sql`
          SELECT * FROM investors 
          WHERE status = ${status} 
          AND available_capital >= ${Number.parseInt(minCapital)}
        `
      }

      const investors = await query

      return NextResponse.json({
        success: true,
        investors,
      })
    }
  } catch (error) {
    console.error("Investor profile error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch investor profile" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const profileData: Partial<InvestorProfile> = await req.json()

    const investorId = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    await sql`
      INSERT INTO investors (
        id, name, type, email, phone, address,
        min_loan_amount, max_loan_amount, preferred_loan_types,
        risk_tolerance, target_return, investment_horizon,
        total_capital, available_capital, deployed_capital,
        geographic_preferences, property_types, max_loan_to_value,
        min_credit_score, status, verification_status,
        accredited_investor, created_at, updated_at
      ) VALUES (
        ${investorId}, ${profileData.name}, ${profileData.type},
        ${profileData.email}, ${profileData.phone}, ${profileData.address},
        ${profileData.minLoanAmount}, ${profileData.maxLoanAmount},
        ${JSON.stringify(profileData.preferredLoanTypes)},
        ${profileData.riskTolerance}, ${profileData.targetReturn},
        ${profileData.investmentHorizon}, ${profileData.totalCapital},
        ${profileData.availableCapital}, ${profileData.deployedCapital || 0},
        ${JSON.stringify(profileData.geographicPreferences)},
        ${JSON.stringify(profileData.propertyTypes)}, ${profileData.maxLoanToValue},
        ${profileData.minCreditScore}, 'pending_approval', 'pending',
        ${profileData.accreditedInvestor}, NOW(), NOW()
      )
    `

    return NextResponse.json({
      success: true,
      investorId,
      message: "Investor profile created successfully",
    })
  } catch (error) {
    console.error("Create investor profile error:", error)
    return NextResponse.json({ success: false, error: "Failed to create investor profile" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const { investorId, ...updateData } = await req.json()

    await sql`
      UPDATE investors SET
        name = COALESCE(${updateData.name}, name),
        email = COALESCE(${updateData.email}, email),
        phone = COALESCE(${updateData.phone}, phone),
        min_loan_amount = COALESCE(${updateData.minLoanAmount}, min_loan_amount),
        max_loan_amount = COALESCE(${updateData.maxLoanAmount}, max_loan_amount),
        risk_tolerance = COALESCE(${updateData.riskTolerance}, risk_tolerance),
        target_return = COALESCE(${updateData.targetReturn}, target_return),
        available_capital = COALESCE(${updateData.availableCapital}, available_capital),
        status = COALESCE(${updateData.status}, status),
        updated_at = NOW()
      WHERE id = ${investorId}
    `

    return NextResponse.json({
      success: true,
      message: "Investor profile updated successfully",
    })
  } catch (error) {
    console.error("Update investor profile error:", error)
    return NextResponse.json({ success: false, error: "Failed to update investor profile" }, { status: 500 })
  }
}

async function getInvestorPerformance(investorId: string) {
  const performance = await sql`
    SELECT 
      COUNT(*) as total_investments,
      SUM(investment_amount) as total_invested,
      AVG(actual_return) as average_return,
      COUNT(CASE WHEN loan_status = 'defaulted' THEN 1 END) as defaults,
      COUNT(CASE WHEN loan_status = 'paid_off' THEN 1 END) as completed_loans
    FROM investor_loans 
    WHERE investor_id = ${investorId}
  `

  return (
    performance[0] || {
      total_investments: 0,
      total_invested: 0,
      average_return: 0,
      defaults: 0,
      completed_loans: 0,
    }
  )
}
