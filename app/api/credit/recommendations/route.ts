import { NextResponse } from "next/server"

interface CreditRecommendation {
  id: string
  title: string
  description: string
  category: "utilization" | "payment" | "accounts" | "inquiries" | "mix"
  priority: "low" | "medium" | "high"
  potentialIncrease: number
  timeframe: string
  difficulty: "easy" | "medium" | "hard"
  actionSteps: string[]
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")
    const creditScore = Number.parseInt(searchParams.get("creditScore") || "700")
    const utilization = Number.parseInt(searchParams.get("utilization") || "30")

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID required" }, { status: 400 })
    }

    // AI-powered recommendations based on credit profile
    const recommendations: CreditRecommendation[] = []

    // High utilization recommendation
    if (utilization > 30) {
      recommendations.push({
        id: "rec-utilization",
        title: "Reduce Credit Utilization",
        description: `Your credit utilization is ${utilization}%. Reducing it below 10% could significantly boost your score.`,
        category: "utilization",
        priority: "high",
        potentialIncrease: Math.min(50, Math.floor((utilization - 10) * 1.5)),
        timeframe: "1-2 months",
        difficulty: "easy",
        actionSteps: [
          "Pay down highest balance cards first",
          "Make multiple payments per month",
          "Request credit limit increases",
          "Consider balance transfer to 0% APR card",
        ],
      })
    }

    // Credit mix recommendation
    if (creditScore < 750) {
      recommendations.push({
        id: "rec-mix",
        title: "Improve Credit Mix",
        description: "Adding different types of credit accounts can improve your credit mix and boost your score.",
        category: "mix",
        priority: "medium",
        potentialIncrease: 15,
        timeframe: "3-6 months",
        difficulty: "medium",
        actionSteps: [
          "Consider a credit builder loan",
          "Add a secured credit card if needed",
          "Keep old accounts open for history",
        ],
      })
    }

    // Payment optimization
    recommendations.push({
      id: "rec-payment",
      title: "Optimize Payment Timing",
      description: "Strategic payment timing can help reduce reported balances and improve your score.",
      category: "payment",
      priority: "medium",
      potentialIncrease: 10,
      timeframe: "1 month",
      difficulty: "easy",
      actionSteps: ["Pay before statement closing date", "Set up automatic payments", "Pay more than minimum amounts"],
    })

    return NextResponse.json({
      success: true,
      recommendations: recommendations.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      }),
    })
  } catch (error) {
    console.error("Credit recommendations error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate recommendations" }, { status: 500 })
  }
}
