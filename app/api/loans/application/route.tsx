import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const databaseUrl = process.env.NEON_NEON_NEON_DATABASE_URL
    if (!databaseUrl) {
      console.error("NEON_NEON_DATABASE_URL is not set")
      // We deliberately throw here so it is caught below
      throw new Error("Database connection string is not configured on the server")
    }
    const sql = neon(databaseUrl)

    const body = await request.json()
    console.log("body:", body)

    // Basic validation
    if (!body.amount || !body.term) {
      return NextResponse.json({ success: false, error: "Amount and term are required" }, { status: 400 })
    }

    // Simulate database insertion
    const result = await sql`
      INSERT INTO loan_applications (amount, term, applicant_data)
      VALUES (${body.amount}, ${body.term}, ${JSON.stringify(body)})
      RETURNING id;
    `

    console.log("Loan application submitted:", result)

    return NextResponse.json({ success: true, applicationId: result[0].id }, { status: 200 })
  } catch (error) {
    console.error("Loan application error:", error)
    const message = error instanceof Error ? error.message : "Failed to process loan application"
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      message: "Loan-application endpoint. Send a POST with JSON body to apply.",
    },
    { status: 200 },
  )
}
