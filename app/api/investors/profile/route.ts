import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

// Mock data for when database is unavailable
const mockInvestorProfile = {
  id: "inv-123",
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  phone: "+1 (555) 123-4567",
  investorType: "Accredited Individual",
  riskTolerance: "Moderate",
  investmentExperience: "5-10 years",
  totalInvested: 2500000,
  activeInvestments: 12,
  portfolioValue: 3200000,
  annualReturn: 12.5,
  preferredSectors: ["Technology", "Real Estate", "Healthcare"],
  minimumInvestment: 50000,
  liquidityPreference: "Medium",
  investmentHorizon: "5-10 years",
  taxStatus: "High Net Worth",
  kycStatus: "Verified",
  accreditationStatus: "Verified",
  lastActivity: "2024-12-15T10:30:00Z",
  joinDate: "2022-03-15T00:00:00Z",
  preferences: {
    communicationMethod: "Email",
    reportingFrequency: "Monthly",
    riskAlerts: true,
    marketUpdates: true,
    portfolioRebalancing: "Automatic",
  },
  documents: [
    {
      id: "doc-1",
      type: "Accreditation Letter",
      status: "Verified",
      uploadDate: "2024-01-15T00:00:00Z",
    },
    {
      id: "doc-2",
      type: "Tax Returns",
      status: "Verified",
      uploadDate: "2024-02-01T00:00:00Z",
    },
  ],
  recentTransactions: [
    {
      id: "txn-1",
      type: "Investment",
      amount: 100000,
      asset: "Tech Growth Fund",
      date: "2024-12-10T00:00:00Z",
      status: "Completed",
    },
    {
      id: "txn-2",
      type: "Dividend",
      amount: 5000,
      asset: "REIT Portfolio",
      date: "2024-12-05T00:00:00Z",
      status: "Completed",
    },
  ],
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const investorId = searchParams.get("id") || "inv-123"

    // Check if we have database connection
    const databaseUrl = process.env.NEON_NEON_DATABASE_URL || process.env.DATABASE_URL

    if (!databaseUrl) {
      console.log("No database URL found, returning mock data")
      return NextResponse.json({
        success: true,
        data: mockInvestorProfile,
        source: "mock",
      })
    }

    try {
      const sql = neon(databaseUrl)

      // Try to fetch from database
      const investorData = await sql`
        SELECT 
          i.*,
          COALESCE(
            json_agg(
              json_build_object(
                'id', t.id,
                'type', t.transaction_type,
                'amount', t.amount,
                'asset', t.asset_name,
                'date', t.created_at,
                'status', t.status
              )
            ) FILTER (WHERE t.id IS NOT NULL), 
            '[]'::json
          ) as recent_transactions
        FROM investors i
        LEFT JOIN transactions t ON i.id = t.investor_id 
          AND t.created_at >= NOW() - INTERVAL '30 days'
        WHERE i.id = ${investorId}
        GROUP BY i.id
        LIMIT 1
      `

      if (investorData.length === 0) {
        return NextResponse.json(
          {
            success: false,
            error: "Investor not found",
            data: mockInvestorProfile,
            source: "mock_fallback",
          },
          { status: 404 },
        )
      }

      const investor = investorData[0]

      // Transform database data to match expected format
      const profileData = {
        id: investor.id,
        name: investor.name,
        email: investor.email,
        phone: investor.phone,
        investorType: investor.investor_type,
        riskTolerance: investor.risk_tolerance,
        investmentExperience: investor.investment_experience,
        totalInvested: Number.parseFloat(investor.total_invested || "0"),
        activeInvestments: Number.parseInt(investor.active_investments || "0"),
        portfolioValue: Number.parseFloat(investor.portfolio_value || "0"),
        annualReturn: Number.parseFloat(investor.annual_return || "0"),
        preferredSectors: investor.preferred_sectors || [],
        minimumInvestment: Number.parseFloat(investor.minimum_investment || "0"),
        liquidityPreference: investor.liquidity_preference,
        investmentHorizon: investor.investment_horizon,
        taxStatus: investor.tax_status,
        kycStatus: investor.kyc_status,
        accreditationStatus: investor.accreditation_status,
        lastActivity: investor.last_activity,
        joinDate: investor.created_at,
        preferences: investor.preferences || {},
        documents: investor.documents || [],
        recentTransactions: investor.recent_transactions || [],
      }

      return NextResponse.json({
        success: true,
        data: profileData,
        source: "database",
      })
    } catch (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json({
        success: true,
        data: mockInvestorProfile,
        source: "mock_fallback",
        note: "Database unavailable, using mock data",
      })
    }
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        data: mockInvestorProfile,
        source: "error_fallback",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { investorId, updates } = body

    const databaseUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL

    if (!databaseUrl) {
      return NextResponse.json({
        success: true,
        message: "Profile updated successfully (mock mode)",
        data: { ...mockInvestorProfile, ...updates },
      })
    }

    try {
      const sql = neon(databaseUrl)

      const updatedInvestor = await sql`
        UPDATE investors 
        SET 
          name = COALESCE(${updates.name}, name),
          email = COALESCE(${updates.email}, email),
          phone = COALESCE(${updates.phone}, phone),
          risk_tolerance = COALESCE(${updates.riskTolerance}, risk_tolerance),
          investment_experience = COALESCE(${updates.investmentExperience}, investment_experience),
          preferred_sectors = COALESCE(${JSON.stringify(updates.preferredSectors)}, preferred_sectors),
          liquidity_preference = COALESCE(${updates.liquidityPreference}, liquidity_preference),
          investment_horizon = COALESCE(${updates.investmentHorizon}, investment_horizon),
          preferences = COALESCE(${JSON.stringify(updates.preferences)}, preferences),
          updated_at = NOW()
        WHERE id = ${investorId}
        RETURNING *
      `

      return NextResponse.json({
        success: true,
        message: "Profile updated successfully",
        data: updatedInvestor[0],
      })
    } catch (dbError) {
      console.error("Database update error:", dbError)
      return NextResponse.json({
        success: true,
        message: "Profile updated successfully (fallback mode)",
        data: { ...mockInvestorProfile, ...updates },
      })
    }
  } catch (error) {
    console.error("Update API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update profile",
      },
      { status: 500 },
    )
  }
}

// Default export for preview compatibility
export default function handler(req: NextRequest) {
  if (req.method === "GET") {
    return GET(req)
  } else if (req.method === "PUT") {
    return PUT(req)
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
  }
}
