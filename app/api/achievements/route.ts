import { type NextRequest, NextResponse } from "next/server"
import { goalsDatabase } from "@/lib/database/goals-database"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId") || "supreme_citizen_001"

  try {
    const achievements = await goalsDatabase.getUserAchievements(userId)
    return NextResponse.json({ achievements })
  } catch (error) {
    console.error("Error fetching achievements:", error)
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 })
  }
}
