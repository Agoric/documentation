"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

interface Goal {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  status: "on-track" | "at-risk" | "behind"
  progress: number
  timeframe: string
  category: "savings" | "investment" | "debt" | "property" | "retirement"
}

interface GoalRecommendation {
  id: string
  goalId: string
  type: "optimization" | "acceleration" | "risk-mitigation" | "opportunity"
  title: string
  description: string
  impact: "high" | "medium" | "low"
  confidence: number
  action: string
}

interface UserFinancialProfile {
  creditScore: number
  monthlyIncome: number
  monthlyExpenses: number
  totalSavings: number
  totalDebt: number
  investmentPortfolio: number
  riskTolerance: "conservative" | "moderate" | "aggressive"
}

export function useGoalPrioritizingOrb() {
  const [goals, setGoals] = React.useState<Goal[]>([])
  const [recommendations, setRecommendations] = React.useState<GoalRecommendation[]>([])
  const [isActive, setIsActive] = React.useState(true)
  const [userProfile, setUserProfile] = React.useState<UserFinancialProfile>({
    creditScore: 750,
    monthlyIncome: 8500,
    monthlyExpenses: 5200,
    totalSavings: 45000,
    totalDebt: 12000,
    investmentPortfolio: 85000,
    riskTolerance: "moderate",
  })

  const pathname = usePathname()

  // Initialize goals based on user profile
  React.useEffect(() => {
    const initialGoals: Goal[] = [
      {
        id: "emergency-fund",
        title: "Emergency Fund",
        description: "Build 6 months of expenses in emergency savings",
        priority: "high",
        status: "on-track",
        progress: 73,
        timeframe: "8 months",
        category: "savings",
      },
      {
        id: "home-purchase",
        title: "Home Purchase",
        description: "Save for down payment on first home",
        priority: "high",
        status: "at-risk",
        progress: 45,
        timeframe: "18 months",
        category: "property",
      },
      {
        id: "retirement-401k",
        title: "Retirement Savings",
        description: "Maximize 401(k) contributions and employer match",
        priority: "medium",
        status: "on-track",
        progress: 85,
        timeframe: "Ongoing",
        category: "retirement",
      },
      {
        id: "debt-payoff",
        title: "Debt Elimination",
        description: "Pay off high-interest credit card debt",
        priority: "high",
        status: "behind",
        progress: 30,
        timeframe: "12 months",
        category: "debt",
      },
      {
        id: "investment-portfolio",
        title: "Investment Growth",
        description: "Diversify portfolio and increase returns",
        priority: "medium",
        status: "on-track",
        progress: 68,
        timeframe: "5 years",
        category: "investment",
      },
    ]

    setGoals(initialGoals)
    generateRecommendations(initialGoals)
  }, [])

  const generateRecommendations = (currentGoals: Goal[]) => {
    const newRecommendations: GoalRecommendation[] = []

    currentGoals.forEach((goal) => {
      if (goal.status === "behind" || goal.status === "at-risk") {
        if (goal.category === "debt") {
          newRecommendations.push({
            id: `rec-${goal.id}-1`,
            goalId: goal.id,
            type: "acceleration",
            title: "Debt Avalanche Strategy",
            description: "Focus on highest interest rate debt first to minimize total interest paid",
            impact: "high",
            confidence: 92,
            action: "Restructure Payment Plan",
          })
        }

        if (goal.category === "property") {
          newRecommendations.push({
            id: `rec-${goal.id}-2`,
            goalId: goal.id,
            type: "opportunity",
            title: "50-Year Loan Qualification",
            description: "Your improved credit score qualifies you for our revolutionary 50-year loan at 3.1% APR",
            impact: "high",
            confidence: 88,
            action: "Get Pre-Approved",
          })
        }
      }

      if (goal.category === "savings" && goal.progress > 70) {
        newRecommendations.push({
          id: `rec-${goal.id}-3`,
          goalId: goal.id,
          type: "optimization",
          title: "High-Yield Savings Optimization",
          description: "Move emergency fund to high-yield account earning 4.5% APY",
          impact: "medium",
          confidence: 95,
          action: "Switch Account",
        })
      }

      if (goal.category === "investment") {
        newRecommendations.push({
          id: `rec-${goal.id}-4`,
          goalId: goal.id,
          type: "optimization",
          title: "Portfolio Rebalancing",
          description: "Rebalance portfolio to maintain target allocation and reduce risk",
          impact: "medium",
          confidence: 85,
          action: "Rebalance Now",
        })
      }
    })

    setRecommendations(newRecommendations)
  }

  const getGoalRecommendations = (goalId?: string): GoalRecommendation[] => {
    if (goalId) {
      return recommendations.filter((rec) => rec.goalId === goalId)
    }
    return recommendations
  }

  const updateGoalProgress = (goalId: string, progress: number) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              progress,
              status: progress >= 80 ? "on-track" : progress >= 50 ? "at-risk" : "behind",
            }
          : goal,
      ),
    )
  }

  const addGoal = (newGoal: Omit<Goal, "id">) => {
    const goal: Goal = {
      ...newGoal,
      id: `goal-${Date.now()}`,
    }
    setGoals((prev) => [...prev, goal])
  }

  const removeGoal = (goalId: string) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== goalId))
    setRecommendations((prev) => prev.filter((rec) => rec.goalId !== goalId))
  }

  const prioritizeGoals = () => {
    const prioritized = [...goals].sort((a, b) => {
      const priorityWeight = { high: 3, medium: 2, low: 1 }
      const statusWeight = { behind: 3, "at-risk": 2, "on-track": 1 }

      const aScore = priorityWeight[a.priority] + statusWeight[a.status]
      const bScore = priorityWeight[b.priority] + statusWeight[b.status]

      return bScore - aScore
    })

    setGoals(prioritized)
  }

  const getFinancialHealthScore = (): number => {
    const avgProgress = goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length
    const creditFactor = Math.min(userProfile.creditScore / 850, 1) * 100
    const debtToIncomeRatio = (userProfile.totalDebt / (userProfile.monthlyIncome * 12)) * 100
    const debtFactor = Math.max(100 - debtToIncomeRatio, 0)

    return Math.round(avgProgress * 0.4 + creditFactor * 0.3 + debtFactor * 0.3)
  }

  const getContextualInsights = () => {
    const insights = []

    if (pathname.includes("/real-estate")) {
      insights.push({
        type: "property",
        message: "Based on your goals, you're 18 months away from your home purchase target.",
        action: "Explore 50-year loan options",
      })
    }

    if (pathname.includes("/credit")) {
      insights.push({
        type: "credit",
        message: "Your credit score improvement could unlock better loan rates.",
        action: "Check new offers",
      })
    }

    const behindGoals = goals.filter((g) => g.status === "behind")
    if (behindGoals.length > 0) {
      insights.push({
        type: "urgent",
        message: `${behindGoals.length} goals need immediate attention.`,
        action: "Prioritize goals",
      })
    }

    return insights
  }

  return {
    goals,
    recommendations,
    userProfile,
    isActive,
    financialHealthScore: getFinancialHealthScore(),
    contextualInsights: getContextualInsights(),
    getGoalRecommendations,
    updateGoalProgress,
    addGoal,
    removeGoal,
    prioritizeGoals,
    setIsActive,
  }
}
