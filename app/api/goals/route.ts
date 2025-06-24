import { type NextRequest, NextResponse } from "next/server"
import { goalsDatabase } from "@/lib/database/goals-database"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId") || "supreme_citizen_001"

  try {
    const goals = await goalsDatabase.getUserGoals(userId)
    const progress = await goalsDatabase.getUserProgress(userId)

    return NextResponse.json({ goals, progress })
  } catch (error) {
    console.error("Error fetching goals:", error)
    return NextResponse.json({ error: "Failed to fetch goals" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId = "supreme_citizen_001", ...goalData } = body

    const goal = await goalsDatabase.createGoal({
      ...goalData,
      userId,
    })

    return NextResponse.json({ goal })
  } catch (error) {
    console.error("Error creating goal:", error)
    return NextResponse.json({ error: "Failed to create goal" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    const goal = await goalsDatabase.updateGoal(id, updates)

    if (!goal) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 })
    }

    return NextResponse.json({ goal })
  } catch (error) {
    console.error("Error updating goal:", error)
    return NextResponse.json({ error: "Failed to update goal" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Goal ID required" }, { status: 400 })
  }

  try {
    const success = await goalsDatabase.deleteGoal(id)

    if (!success) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting goal:", error)
    return NextResponse.json({ error: "Failed to delete goal" }, { status: 500 })
  }
}
