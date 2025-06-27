"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { usePremiumUnlock } from "@/contexts/premium-unlock-context"

interface Goal {
  id: string
  name: string
  status: "on-track" | "at-risk" | "behind"
  priority: "high" | "medium" | "low"
  deadline: string
  description: string
  progress: number
}

interface Recommendation {
  id: string
  type: "goal" | "investment" | "savings" | "debt"
  title: string
  description: string
  impact: "high" | "medium" | "low"
  effort: "low" | "medium" | "high"
  timeframe: string
}

interface ActionableStep {
  id: string
  title: string
  description: string
  estimatedTime: string
  priority: number
  goalId: string
  navigation: {
    path: string
    section?: string
    element?: string
    params?: Record<string, string>
    scrollTo?: string
    highlight?: string[]
  }
  requirements?: string[]
  impact: "high" | "medium" | "low"
  taskType: "form" | "calculation" | "application" | "review" | "setup" | "payment"
  completionCriteria: string
}

interface Opportunity {
  id: string
  title: string
  description: string
  priority: "critical" | "high" | "medium"
  location: string
  impact: "high" | "medium" | "low"
  timeframe: string
  navigation: {
    path: string
    section?: string
    element?: string
    params?: Record<string, string>
    scrollTo?: string
    highlight?: string[]
  }
}

interface GoalProgress {
  overall: number
  completed: number
  inProgress: number
  upcoming: number
}

interface TaskLocation {
  page: string
  section: string
  element: string
  instructions: string[]
  expectedOutcome: string
}

// A lightweight shape for UI-ready recommendations
interface GoalRecommendation {
  id: string
  goalId: string
  type: "optimize" | "accelerate" | "adjust" | "pivot"
  title: string
  description: string
  impact: "low" | "medium" | "high"
  effort: "low" | "medium" | "high"
  priority: number
  aiInsight: string
}

// Helper function to generate safe IDs
const generateId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function useGoalPrioritizingOrb() {
  const { isPremiumUnlocked, unlockPremium } = usePremiumUnlock()
  const [goals, setGoals] = React.useState<Goal[]>([])
  const [recommendations, setRecommendations] = React.useState<Recommendation[]>([])
  const [isActive, setIsActive] = React.useState(true)
  const [nextActionableSteps, setNextActionableSteps] = React.useState<ActionableStep[]>([])
  const [currentInterest, setCurrentInterest] = React.useState<Opportunity | null>(null)
  const [goalProgress, setGoalProgress] = React.useState<GoalProgress>({
    overall: 73,
    completed: 4,
    inProgress: 3,
    upcoming: 2,
  })
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)
  const [currentTaskLocation, setCurrentTaskLocation] = React.useState<TaskLocation | null>(null)

  const pathname = usePathname()
  const router = useRouter()

  // Auto-unlock premium features on mount
  React.useEffect(() => {
    if (!isPremiumUnlocked) {
      unlockPremium()
    }
  }, [isPremiumUnlocked, unlockPremium])

  // Initialize goals and recommendations
  React.useEffect(() => {
    const mockGoals: Goal[] = [
      {
        id: "1",
        name: "Emergency Fund",
        status: "on-track",
        priority: "high",
        deadline: "2024-12-31",
        description: "Build 6 months of expenses",
        progress: 75,
      },
      {
        id: "2",
        name: "House Down Payment",
        status: "at-risk",
        priority: "high",
        deadline: "2025-06-30",
        description: "Save $50,000 for down payment",
        progress: 45,
      },
      {
        id: "3",
        name: "Retirement Savings",
        status: "behind",
        priority: "medium",
        deadline: "2055-01-01",
        description: "Build retirement nest egg",
        progress: 30,
      },
    ]

    const mockRecommendations: Recommendation[] = [
      {
        id: "1",
        type: "savings",
        title: "Increase Emergency Fund Contributions",
        description: "Boost monthly contributions by $200 to reach your goal 3 months earlier",
        impact: "high",
        effort: "low",
        timeframe: "3 months",
      },
      {
        id: "2",
        type: "investment",
        title: "Optimize Investment Allocation",
        description: "Rebalance portfolio to 70/30 stocks/bonds for better returns",
        impact: "medium",
        effort: "low",
        timeframe: "1 month",
      },
      {
        id: "3",
        type: "debt",
        title: "Consolidate High-Interest Debt",
        description: "Use our 50-year loan program to reduce monthly payments by 40%",
        impact: "high",
        effort: "medium",
        timeframe: "2 weeks",
      },
    ]

    setGoals(mockGoals)
    setRecommendations(mockRecommendations)
  }, [])

  const prioritizeGoals = React.useCallback((goals: Goal[]) => {
    return goals.sort((a, b) => {
      // Priority weight
      const priorityWeight = { high: 3, medium: 2, low: 1 }

      // Status urgency
      const statusWeight = { behind: 3, "at-risk": 2, "on-track": 1 }

      const scoreA = priorityWeight[a.priority] + statusWeight[a.status]
      const scoreB = priorityWeight[b.priority] + statusWeight[b.status]

      return scoreB - scoreA
    })
  }, [])

  const getGoalRecommendations = React.useCallback(
    (goalId: string) => {
      return recommendations.filter(
        (rec) =>
          rec.type === "goal" ||
          (goalId === "1" && rec.type === "savings") ||
          (goalId === "2" && rec.type === "investment") ||
          (goalId === "3" && rec.type === "debt"),
      )
    },
    [recommendations],
  )

  const updateGoalProgress = React.useCallback((goalId: string, progress: number) => {
    setGoals((prev) => prev.map((goal) => (goal.id === goalId ? { ...goal, progress } : goal)))
  }, [])

  const addGoal = React.useCallback((goal: Omit<Goal, "id">) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
    }
    setGoals((prev) => [...prev, newGoal])
  }, [])

  const removeGoal = React.useCallback((goalId: string) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== goalId))
  }, [])

  const getTimeToGoal = React.useCallback((goal: Goal, monthlyContribution: number) => {
    if (monthlyContribution <= 0) return null

    // Simple calculation - in real app this would be more sophisticated
    const remaining = 100 - goal.progress
    const monthsRemaining = Math.ceil(remaining / (monthlyContribution / 100))

    return monthsRemaining
  }, [])

  const generateInsights = React.useCallback(() => {
    const prioritizedGoals = prioritizeGoals(goals)
    const urgentGoals = prioritizedGoals.filter((g) => g.status === "behind" || g.status === "at-risk")

    return {
      totalGoals: goals.length,
      urgentGoals: urgentGoals.length,
      averageProgress: goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length,
      nextDeadline: prioritizedGoals[0]?.deadline,
      topPriority: prioritizedGoals[0]?.name,
    }
  }, [goals, prioritizeGoals])

  // Initialize goals and priorities with precise navigation
  React.useEffect(() => {
    const prioritizedGoals = goals.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })

    setGoals(prioritizedGoals)

    generatePreciseActionableSteps(prioritizedGoals)
  }, [goals])

  // Generate context-aware actionable steps with precise navigation
  const generatePreciseActionableSteps = (goals: Goal[]) => {
    const steps: ActionableStep[] = []

    goals.forEach((goal, index) => {
      if (goal.name === "Emergency Fund" && goal.progress < 100) {
        steps.push({
          id: generateId(),
          title: "Set Up Automatic Savings",
          description: "Configure $450/month auto-transfer to reach emergency fund goal faster",
          estimatedTime: "4 min",
          priority: 1,
          goalId: goal.id,
          navigation: {
            path: "/dashboard",
            section: "goal-tracker",
            element: "emergency-fund-card",
            scrollTo: "savings-goals-section",
            highlight: ["auto-transfer-setup", "amount-input", "frequency-selector"],
            params: { goalType: "emergency-fund", action: "setup-auto-transfer" },
          },
          taskType: "setup",
          completionCriteria: "Activate automatic monthly transfer of $450",
          impact: "medium",
        })
      }

      if (goal.name === "House Down Payment" && goal.progress < 100) {
        steps.push({
          id: generateId(),
          title: "Complete Loan Pre-Application",
          description: "Fill out the 50-year loan pre-approval form with your financial details",
          estimatedTime: "8 min",
          priority: 2,
          goalId: goal.id,
          navigation: {
            path: "/real-estate",
            section: "loan-application",
            element: "pre-approval-form",
            scrollTo: "loan-calculator-section",
            highlight: ["income-input", "credit-score-field", "down-payment-slider"],
            params: { loanType: "50-year", step: "pre-approval" },
          },
          taskType: "form",
          completionCriteria: "Submit completed pre-approval application",
          impact: "high",
        })
      }

      if (goal.name === "Retirement Savings" && goal.progress < 100) {
        steps.push({
          id: generateId(),
          title: "Maximize 401k Contributions",
          description: "Contribute the maximum allowed to your 401k for tax benefits",
          estimatedTime: "6 min",
          priority: 3,
          goalId: goal.id,
          navigation: {
            path: "/retirement",
            section: "401k-management",
            element: "contribution-form",
            scrollTo: "contribution-section",
            highlight: ["contribution-slider", "tax-benefit-info", "submit-button"],
            params: { action: "contribute", type: "401k" },
          },
          taskType: "form",
          completionCriteria: "Complete 401k contribution setup",
          impact: "high",
        })
      }
    })

    setNextActionableSteps(steps.sort((a, b) => a.priority - b.priority))
  }

  // Identify opportunities with precise navigation
  const identifyOpportunities = React.useCallback((currentPath: string): Opportunity[] => {
    const opportunities: Opportunity[] = []

    // Real Estate context opportunities
    if (currentPath.includes("/real-estate") || currentPath === "/") {
      opportunities.push({
        id: generateId(),
        title: "50-Year Loan Calculator",
        description: "Calculate your savings with our revolutionary 50-year mortgage. See how you can save $720/month!",
        priority: "critical",
        location: "Loan Calculator Section",
        impact: "high",
        timeframe: "2 minutes",
        navigation: {
          path: "/real-estate",
          section: "loan-calculator",
          element: "mortgage-calculator",
          scrollTo: "calculator-form",
          highlight: ["loan-amount-input", "interest-rate-display", "monthly-payment-result"],
          params: { calculator: "50-year-loan", highlight: "savings" },
        },
      })
    }

    // Legal/Compliance context opportunities
    if (currentPath.includes("/legal") || currentPath.includes("/admin")) {
      opportunities.push({
        id: generateId(),
        title: "Diplomatic Agent Certification",
        description: "Complete certification to unlock exclusive platform benefits and immunity protections",
        priority: "high",
        location: "Diplomatic Immunity Portal",
        impact: "high",
        timeframe: "5 minutes",
        navigation: {
          path: "/legal/diplomatic-immunity",
          section: "agent-certification",
          element: "certification-form",
          scrollTo: "agent-application-section",
          highlight: ["certification-requirements", "application-form", "submit-button"],
          params: { action: "apply", type: "agent-certification" },
        },
      })
    }

    // Dashboard context opportunities
    if (currentPath.includes("/dashboard") || currentPath === "/") {
      opportunities.push({
        id: generateId(),
        title: "Credit Score Optimization",
        description: "Your credit score can be boosted by 20+ points with strategic payments",
        priority: "high",
        location: "Financial Overview Dashboard",
        impact: "high",
        timeframe: "3 minutes",
        navigation: {
          path: "/dashboard",
          section: "financial-overview",
          element: "credit-optimization-card",
          scrollTo: "credit-score-section",
          highlight: ["current-score", "optimization-tips", "payment-calculator"],
          params: { focus: "credit-optimization", action: "boost-score" },
        },
      })
    }

    // Admin context opportunities
    if (currentPath.includes("/admin")) {
      opportunities.push({
        id: generateId(),
        title: "User Engagement Analytics",
        description: "Review platform metrics and identify optimization opportunities",
        priority: "medium",
        location: "Admin Dashboard Analytics",
        impact: "medium",
        timeframe: "8 minutes",
        navigation: {
          path: "/admin/dashboard",
          section: "analytics-overview",
          element: "engagement-metrics",
          scrollTo: "user-analytics-section",
          highlight: ["active-users-chart", "engagement-trends", "optimization-recommendations"],
          params: { view: "engagement", period: "30-days" },
        },
      })
    }

    return opportunities.sort((a, b) => {
      const priorityOrder = { critical: 3, high: 2, medium: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
  }, [])

  // Update current interest based on opportunities
  React.useEffect(() => {
    const opportunities = identifyOpportunities(pathname)
    if (opportunities.length > 0) {
      setCurrentInterest(opportunities[0])
    } else {
      setCurrentInterest(null)
    }
  }, [pathname, identifyOpportunities])

  // Enhanced navigation with precise targeting
  const navigateToTask = async (step: ActionableStep) => {
    setIsAnalyzing(true)

    // Set current task location for UI highlighting
    setCurrentTaskLocation({
      page: step.navigation.path,
      section: step.navigation.section || "",
      element: step.navigation.element || "",
      instructions: [
        `Navigate to ${step.navigation.path}`,
        `Locate the ${step.navigation.section} section`,
        `Find the ${step.navigation.element} element`,
        step.completionCriteria,
      ],
      expectedOutcome: step.completionCriteria,
    })

    // Build navigation URL with parameters
    let navigationUrl = step.navigation.path
    if (step.navigation.params) {
      const params = new URLSearchParams(step.navigation.params)
      navigationUrl += `?${params.toString()}`
    }

    // Add hash for scrolling to specific section
    if (step.navigation.scrollTo) {
      navigationUrl += `#${step.navigation.scrollTo}`
    }

    // Navigate to the specific page
    router.push(navigationUrl)

    // Simulate highlighting and scrolling (in a real app, this would be handled by the target page)
    setTimeout(() => {
      if (step.navigation.highlight) {
        // In a real implementation, this would highlight specific elements
        console.log("Highlighting elements:", step.navigation.highlight)
      }

      if (step.navigation.scrollTo) {
        // Scroll to specific section
        const element = document.getElementById(step.navigation.scrollTo)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }

      setIsAnalyzing(false)
    }, 1000)

    return step
  }

  // Confirm interest with precise navigation
  const confirmInterest = async (opportunityId: string): Promise<boolean> => {
    if (!currentInterest) return false

    setIsAnalyzing(true)

    // Build navigation URL for opportunity
    let navigationUrl = currentInterest.navigation.path
    if (currentInterest.navigation.params) {
      const params = new URLSearchParams(currentInterest.navigation.params)
      navigationUrl += `?${params.toString()}`
    }

    if (currentInterest.navigation.scrollTo) {
      navigationUrl += `#${currentInterest.navigation.scrollTo}`
    }

    // Navigate to opportunity location
    router.push(navigationUrl)

    // Set task location for UI guidance
    setCurrentTaskLocation({
      page: currentInterest.navigation.path,
      section: currentInterest.navigation.section || "",
      element: currentInterest.navigation.element || "",
      instructions: [
        `Navigate to ${currentInterest.location}`,
        `Complete the ${currentInterest.title.toLowerCase()}`,
        `Expected impact: ${currentInterest.impact}`,
        `Estimated time: ${currentInterest.timeframe}`,
      ],
      expectedOutcome: currentInterest.description,
    })

    setTimeout(() => {
      if (currentInterest.navigation.highlight) {
        console.log("Highlighting opportunity elements:", currentInterest.navigation.highlight)
      }
      setIsAnalyzing(false)
    }, 1000)

    return true
  }

  // Proceed to next actionable step with precise navigation
  const proceedToNextStep = async (): Promise<ActionableStep | null> => {
    if (nextActionableSteps.length > 0) {
      const nextStep = nextActionableSteps[0]

      // Navigate to the specific task location
      await navigateToTask(nextStep)

      // Update progress for the associated goal
      setGoals((prev) =>
        prev.map((goal) =>
          goal.id === nextStep.goalId ? { ...goal, progress: Math.min(goal.progress + 10, 100) } : goal,
        ),
      )

      // Remove completed step and regenerate
      setNextActionableSteps((prev) => prev.slice(1))

      return nextStep
    }
    return null
  }

  // Get detailed location information
  const getLocationInfo = (location: string) => {
    const locationMap = {
      "Loan Calculator Section": {
        description: "Interactive 50-year loan calculator with real-time savings display",
        benefits: ["Lower monthly payments", "More cash flow", "Generational wealth building"],
        path: "/real-estate",
        section: "loan-calculator",
        tasks: ["Enter loan amount", "Review interest rate", "Compare payment options", "Apply for pre-approval"],
      },
      "Financial Overview Dashboard": {
        description: "Comprehensive financial health monitoring and optimization center",
        benefits: ["Credit score tracking", "Payment optimization", "Financial goal progress"],
        path: "/dashboard",
        section: "financial-overview",
        tasks: ["Review credit score", "Analyze payment recommendations", "Execute strategic payments"],
      },
      "Diplomatic Immunity Portal": {
        description: "Exclusive agent certification and platform benefits access",
        benefits: ["Legal protections", "Exclusive features", "Premium support"],
        path: "/legal/diplomatic-immunity",
        section: "agent-certification",
        tasks: ["Complete application", "Review requirements", "Submit certification"],
      },
    }

    return locationMap[location as keyof typeof locationMap] || null
  }

  // Navigate to opportunity with precise targeting
  const navigateToOpportunity = (opportunity: Opportunity) => {
    return opportunity.navigation
  }

  // Get current task guidance
  const getCurrentTaskGuidance = () => {
    return currentTaskLocation
  }

  // Mark task as completed
  const markTaskCompleted = (stepId: string) => {
    setNextActionableSteps((prev) => prev.filter((step) => step.id !== stepId))

    // Update goal progress
    const completedStep = nextActionableSteps.find((step) => step.id === stepId)
    if (completedStep) {
      setGoals((prev) =>
        prev.map((goal) =>
          goal.id === completedStep.goalId ? { ...goal, progress: Math.min(goal.progress + 15, 100) } : goal,
        ),
      )
    }
  }

  return {
    goals: prioritizeGoals(goals),
    recommendations,
    isActive,
    isPremiumUnlocked,
    prioritizeGoals,
    getGoalRecommendations,
    updateGoalProgress,
    addGoal,
    removeGoal,
    getTimeToGoal,
    generateInsights,
    setIsActive,
    nextActionableSteps,
    currentInterest,
    goalProgress,
    isAnalyzing,
    currentTaskLocation,
    confirmInterest,
    proceedToNextStep,
    navigateToTask,
    getLocationInfo,
    navigateToOpportunity,
    getCurrentTaskGuidance,
    markTaskCompleted,
  }
}
