import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_NEON_DATABASE_URL!)

export async function POST(req: NextRequest) {
  try {
    console.log("Starting SNAP DAX database setup...")

    // Create tables one by one with error handling
    const tables = [
      {
        name: "qgi_citizen_bonds",
        sql: `
          CREATE TABLE IF NOT EXISTS qgi_citizen_bonds (
            id SERIAL PRIMARY KEY,
            citizen_id VARCHAR(50) UNIQUE NOT NULL,
            bond_amount DECIMAL(15,2) DEFAULT 250000.00,
            bank_rate DECIMAL(5,4) NOT NULL DEFAULT 0.0525,
            purchase_date TIMESTAMP DEFAULT NOW(),
            status VARCHAR(20) DEFAULT 'active',
            leverage_ratio DECIMAL(5,2) DEFAULT 60.00,
            available_lending_capacity DECIMAL(15,2) DEFAULT 15000000.00,
            current_utilization DECIMAL(15,2) DEFAULT 0,
            created_at TIMESTAMP DEFAULT NOW()
          )
        `,
      },
      {
        name: "business_bonds",
        sql: `
          CREATE TABLE IF NOT EXISTS business_bonds (
            id SERIAL PRIMARY KEY,
            business_id VARCHAR(50) UNIQUE NOT NULL,
            business_name VARCHAR(255) NOT NULL,
            bond_amount DECIMAL(15,2) DEFAULT 500000.00,
            bank_rate DECIMAL(5,4) NOT NULL DEFAULT 0.0525,
            purchase_date TIMESTAMP DEFAULT NOW(),
            status VARCHAR(20) DEFAULT 'active',
            credit_guarantee_amount DECIMAL(15,2) DEFAULT 500000.00,
            current_credit_utilization DECIMAL(15,2) DEFAULT 0,
            created_at TIMESTAMP DEFAULT NOW()
          )
        `,
      },
      {
        name: "government_programs",
        sql: `
          CREATE TABLE IF NOT EXISTS government_programs (
            id SERIAL PRIMARY KEY,
            program_code VARCHAR(50) UNIQUE NOT NULL,
            program_name VARCHAR(255) NOT NULL,
            agency VARCHAR(100) NOT NULL,
            program_type VARCHAR(50) NOT NULL,
            max_loan_amount DECIMAL(15,2),
            guarantee_percentage DECIMAL(5,2),
            active BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT NOW()
          )
        `,
      },
      {
        name: "loan_program_matches",
        sql: `
          CREATE TABLE IF NOT EXISTS loan_program_matches (
            id SERIAL PRIMARY KEY,
            loan_application_id VARCHAR(100) NOT NULL,
            program_id INTEGER,
            match_score DECIMAL(5,2),
            status VARCHAR(20) DEFAULT 'pending',
            program_loan_number VARCHAR(100),
            guarantee_amount DECIMAL(15,2),
            created_at TIMESTAMP DEFAULT NOW()
          )
        `,
      },
    ]

    const results = []

    // Create tables
    for (const table of tables) {
      try {
        await sql(table.sql)
        results.push({ table: table.name, status: "created", error: null })
        console.log(`✅ Created table: ${table.name}`)
      } catch (error) {
        results.push({
          table: table.name,
          status: "error",
          error: error instanceof Error ? error.message : "Unknown error",
        })
        console.error(`❌ Error creating table ${table.name}:`, error)
      }
    }

    // Insert sample data
    try {
      // Government programs
      await sql`
        INSERT INTO government_programs (program_code, program_name, agency, program_type, max_loan_amount, guarantee_percentage) 
        VALUES 
          ('SBA_7A', 'SBA 7(a) Loan Program', 'SBA', 'guarantee', 5000000, 85.00),
          ('HUD_FHA', 'FHA Mortgage Insurance', 'HUD', 'guarantee', 970800, 96.50),
          ('VA_HOME', 'VA Home Loan Guarantee', 'VA', 'guarantee', 1000000, 100.00),
          ('USDA_RD', 'USDA Rural Development', 'USDA', 'guarantee', 500000, 90.00),
          ('TREASURY_CAP', 'Treasury Capital Access Program', 'Treasury', 'guarantee', 2000000, 80.00),
          ('FED_DISCOUNT', 'Federal Reserve Discount Window', 'Federal Reserve', 'lending', 10000000, 100.00)
        ON CONFLICT (program_code) DO NOTHING
      `

      // Sample QGI bonds
      await sql`
        INSERT INTO qgi_citizen_bonds (citizen_id, bond_amount, bank_rate, available_lending_capacity)
        VALUES 
          ('CITIZEN_DEMO_001', 250000.00, 0.0525, 15000000.00),
          ('CITIZEN_DEMO_002', 250000.00, 0.0525, 15000000.00),
          ('CITIZEN_DEMO_003', 250000.00, 0.0525, 15000000.00)
        ON CONFLICT (citizen_id) DO NOTHING
      `

      // Sample business bonds
      await sql`
        INSERT INTO business_bonds (business_id, business_name, bond_amount, bank_rate, credit_guarantee_amount)
        VALUES 
          ('BUS_DEMO_001', 'Snapifi Tech Solutions', 500000.00, 0.0525, 500000.00),
          ('BUS_DEMO_002', 'Digital Asset Ventures', 500000.00, 0.0525, 500000.00),
          ('BUS_DEMO_003', 'Real Estate Tokenization LLC', 500000.00, 0.0525, 500000.00)
        ON CONFLICT (business_id) DO NOTHING
      `

      results.push({ table: "sample_data", status: "inserted", error: null })
      console.log("✅ Sample data inserted")
    } catch (error) {
      results.push({
        table: "sample_data",
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error",
      })
      console.error("❌ Error inserting sample data:", error)
    }

    return NextResponse.json({
      success: true,
      message: "SNAP DAX database setup completed",
      results,
      summary: {
        total_tables: tables.length,
        successful: results.filter((r) => r.status === "created").length,
        errors: results.filter((r) => r.status === "error").length,
      },
    })
  } catch (error) {
    console.error("SNAP DAX setup error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Database setup failed",
        details: error instanceof Error ? error.message : "Unknown error",
        suggestion: "Check your NEON_DATABASE_URL environment variable and database permissions",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    // Test database connection and show status
    const result = await sql`SELECT NOW() as current_time`

    return NextResponse.json({
      status: "connected",
      database: "Neon PostgreSQL",
      current_time: result[0]?.current_time,
      message: "Database connection successful",
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        error: error instanceof Error ? error.message : "Connection failed",
        suggestion: "Check your database configuration",
      },
      { status: 500 },
    )
  }
}
