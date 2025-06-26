import { NextResponse, type NextRequest } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = DATABASE_URL ? neon(DATABASE_URL) : null

/* ---------- Types ---------- */
interface InvestorProfile {
  id: string
  name: string
  type: "individual" | "institutional" | "fund" | "bank" | "credit_union"
  email: string
  phone: string
  address: string
  minLoanAmount: number
  maxLoanAmount: number
  preferredLoanTypes: string[]
  riskTolerance: number
  targetReturn: number
  investmentHorizon: number
  totalCapital: number
  availableCapital: number
  deployedCapital: number
  geographicPreferences: string[]
  propertyTypes: string[]
  maxLoanToValue: number
  minCreditScore: number
  status: "active" | "inactive" | "suspended" | "pending_approval"
  verificationStatus: "verified" | "pending" | "rejected"
  accreditedInvestor: boolean
  createdAt: Date
  updatedAt: Date
}

/* ---------- Helpers ---------- */
function mockInvestors(): InvestorProfile[] {
  return [
    {
      id: "INV-DEMO-001",
      name: "Alice Quantum",
      type: "individual",
      email: "alice@example.com",
      phone: "+1 (555) 000-0001",
      address: "123 Main St, Demo City",
      minLoanAmount: 100000,
      maxLoanAmount: 1000000,
      preferredLoanTypes: ["bridge", "fix_and_flip"],
      riskTolerance: 40,
      targetReturn: 8,
      investmentHorizon: 5,
      totalCapital: 2000000,
      availableCapital: 1500000,
      deployedCapital: 500000,
      portfolioValue: 2300000,
      totalLoansInvested: 4,
      averageReturn: 7.5,
      defaultRate: 0,
      geographicPreferences: ["CA", "TX"],
      propertyTypes: ["single_family", "multifamily"],
      maxLoanToValue: 75,
      minCreditScore: 680,
      status: "active",
      verificationStatus: "verified",
      accreditedInvestor: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
}

async function getInvestorPerformance(investorId: string) {
  if (!sql) {
    return {
      total_investments: 1,
      total_invested: 500000,
      average_return: 7.5,
      defaults: 0,
      completed_loans: 1,
    }
  }

  const performance = await sql`
    SELECT 
      COUNT(*)                AS total_investments,
      SUM(investment_amount)  AS total_invested,
      AVG(actual_return)      AS average_return,
      COUNT(CASE WHEN loan_status = 'defaulted'  THEN 1 END) AS defaults,
      COUNT(CASE WHEN loan_status = 'paid_off'   THEN 1 END) AS completed_loans
    FROM investor_loans 
    WHERE investor_id = ${investorId}
  `
  return performance[0]
}

/* ---------- Route Handlers ---------- */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const investorId = searchParams.get("id")

    // ------------------------ Mock branch ------------------------
    if (!sql) {
      const investors = mockInvestors()
      if (investorId) {
        const investor = investors.find((i) => i.id === investorId)
        if (!investor) {
          return NextResponse.json({ success: false, error: "Investor not found (mock data)" }, { status: 404 })
        }
        return NextResponse.json({ success: true, investor })
      }

      return NextResponse.json({ success: true, investors })
    }
    // ---------------------- Live DB branch -----------------------
    if (investorId) {
      const investor = await sql`SELECT * FROM investors WHERE id = ${investorId}`
      if (investor.length === 0) {
        return NextResponse.json({ success: false, error: "Investor not found" }, { status: 404 })
      }
      const performance = await getInvestorPerformance(investorId)
      return NextResponse.json({
        success: true,
        investor: { ...investor[0], performance },
      })
    }

    const status = searchParams.get("status") ?? "active"
    const type = searchParams.get("type")
    const minCapital = searchParams.get("minCapital")

    let query = sql`SELECT * FROM investors WHERE status = ${status}`
    if (type) {
      query = sql`
        SELECT * FROM investors 
        WHERE status = ${status} 
        AND type = ${type}
      `
    }
    if (minCapital) {
      query = sql`
        SELECT * FROM investors 
        WHERE status = ${status} 
        AND available_capital >= ${Number(minCapital)}
      `
    }

    const investors = await query
    return NextResponse.json({ success: true, investors })
  } catch (err) {
    console.error("Investor GET error:", err)
    return NextResponse.json({ success: false, error: "Failed to fetch investor profile" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const profileData: Partial<InvestorProfile> = await req.json()
    const investorId = `INV-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

    if (!sql) {
      // Mock insertion
      return NextResponse.json({
        success: true,
        investorId,
        message: "Mock investor profile created",
      })
    }

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
        ${JSON.stringify(profileData.preferredLoanTypes ?? [])},
        ${profileData.riskTolerance}, ${profileData.targetReturn},
        ${profileData.investmentHorizon}, ${profileData.totalCapital},
        ${profileData.availableCapital}, ${profileData.deployedCapital ?? 0},
        ${JSON.stringify(profileData.geographicPreferences ?? [])},
        ${JSON.stringify(profileData.propertyTypes ?? [])},
        ${profileData.maxLoanToValue}, ${profileData.minCreditScore},
        'pending_approval', 'pending',
        ${profileData.accreditedInvestor ?? false}, NOW(), NOW()
      )
    `

    return NextResponse.json({
      success: true,
      investorId,
      message: "Investor profile created successfully",
    })
  } catch (err) {
    console.error("Investor POST error:", err)
    return NextResponse.json({ success: false, error: "Failed to create investor profile" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { investorId, ...updateData } = await req.json()

    if (!sql) {
      return NextResponse.json({
        success: true,
        message: "Mock investor profile updated",
      })
    }

    await sql`
      UPDATE investors SET
        name              = COALESCE(${updateData.name}, name),
        email             = COALESCE(${updateData.email}, email),
        phone             = COALESCE(${updateData.phone}, phone),
        min_loan_amount   = COALESCE(${updateData.minLoanAmount}, min_loan_amount),
        max_loan_amount   = COALESCE(${updateData.maxLoanAmount}, max_loan_amount),
        risk_tolerance    = COALESCE(${updateData.riskTolerance}, risk_tolerance),
        target_return     = COALESCE(${updateData.targetReturn}, target_return),
        available_capital = COALESCE(${updateData.availableCapital}, available_capital),
        status            = COALESCE(${updateData.status}, status),
        updated_at        = NOW()
      WHERE id = ${investorId}
    `
    return NextResponse.json({
      success: true,
      message: "Investor profile updated successfully",
    })
  } catch (err) {
    console.error("Investor PUT error:", err)
    return NextResponse.json({ success: false, error: "Failed to update investor profile" }, { status: 500 })
  }
}

/* ------------------------------------------------------------------
   Default export so the Next.js previewer can invoke the handler.
------------------------------------------------------------------- */
const handler = async (req: NextRequest) => {
  switch (req.method) {
    case "GET":
      return GET(req)
    case "POST":
      return POST(req)
    case "PUT":
      return PUT(req)
    default:
      return NextResponse.json({ success: false, error: "Method not allowed" }, { status: 405 })
  }
}

export default handler
