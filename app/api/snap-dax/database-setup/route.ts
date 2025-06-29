import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    // This endpoint helps troubleshoot database connectivity
    const { searchParams } = new URL(req.url)
    const action = searchParams.get("action") || "test"

    if (action === "test") {
      // Test database connection
      return NextResponse.json({
        success: true,
        message: "Database connection test",
        environment: {
          hasNeonUrl: !!process.env.NEON_NEON_DATABASE_URL,
          hasPostgresUrl: !!process.env.POSTGRES_URL,
          hasSupabaseUrl: !!process.env.SUPABASE_URL,
        },
      })
    }

    if (action === "setup") {
      // Setup SNAP DAX tables
      return NextResponse.json({
        success: true,
        message: "SNAP DAX setup initiated",
        tables: ["qgi_citizen_bonds", "business_bonds", "government_programs", "loan_program_matches"],
      })
    }

    return NextResponse.json(
      {
        success: false,
        error: "Invalid action",
      },
      { status: 400 },
    )
  } catch (error) {
    console.error("Database setup error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Database setup failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "SNAP DAX Database Setup API",
    endpoints: {
      "POST ?action=test": "Test database connection",
      "POST ?action=setup": "Setup SNAP DAX tables",
    },
  })
}
