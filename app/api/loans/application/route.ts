import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

// Handle GET requests (for browser testing)
export async function GET() {
  return NextResponse.json({
    message: "Loan Application API is operational",
    endpoints: {
      POST: "Submit loan application",
      GET: "API status check",
    },
    timestamp: new Date().toISOString(),
  })
}

// Handle POST requests (actual loan applications)
export async function POST(request: NextRequest) {
  try {
    // Check if database URL is configured
    if (!process.env.NEON_NEON_DATABASE_URL) {
      return NextResponse.json(
        {
          error: "Database configuration missing",
          message: "NEON_DATABASE_URL environment variable not set",
        },
        { status: 500 },
      )
    }

    const sql = neon(process.env.NEON_DATABASE_URL)

    // Parse and validate request body
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      return NextResponse.json(
        {
          error: "Invalid JSON",
          message: "Request body must be valid JSON",
        },
        { status: 400 },
      )
    }

    // Validate required fields
    const requiredFields = ["applicantName", "loanType", "loanAmount", "email"]
    const missingFields = requiredFields.filter((field) => !body[field])

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          missingFields,
          message: `Please provide: ${missingFields.join(", ")}`,
        },
        { status: 400 },
      )
    }

    // Insert loan application
    const applicationId = `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const result = await sql`
      INSERT INTO loan_applications (
        application_id,
        applicant_name,
        email,
        phone,
        loan_type,
        loan_amount,
        loan_purpose,
        employment_status,
        annual_income,
        credit_score,
        status,
        created_at
      ) VALUES (
        ${applicationId},
        ${body.applicantName},
        ${body.email},
        ${body.phone || null},
        ${body.loanType},
        ${body.loanAmount},
        ${body.loanPurpose || null},
        ${body.employmentStatus || null},
        ${body.annualIncome || null},
        ${body.creditScore || null},
        'submitted',
        NOW()
      )
      RETURNING application_id, status, created_at
    `

    return NextResponse.json({
      success: true,
      message: "Loan application submitted successfully",
      applicationId,
      status: "submitted",
      nextSteps: ["Document verification", "Credit check", "Income verification", "Underwriting review"],
      estimatedProcessingTime: "3-5 business days",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Loan application error:", error)

    return NextResponse.json(
      {
        error: "Failed to process loan application",
        message: error instanceof Error ? error.message : "Unknown database error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
