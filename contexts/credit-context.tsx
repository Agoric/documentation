"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define types for credit suite
export interface CreditProfile {
  userId: string
  ficoScore: number
  vantageScore: number
  scoreChange: number
  scoreRating: "Poor" | "Fair" | "Good" | "Very Good" | "Excellent"
  creditUtilization: number
  averageAccountAge: number
  oldestAccountAge: number
  totalAccounts: number
  openAccounts: number
  closedAccounts: number
  totalCreditLimit: number
  totalBalance: number
  paymentHistory: number
  creditInquiries: number
  negativeMarks: number
  lastUpdated: Date
}

export interface CreditHistoryEntry {
  date: string
  score: number
  change: number
  bureau: "Experian" | "Equifax" | "TransUnion"
  reason?: string
}

export interface CreditReport {
  bureau: "Experian" | "Equifax" | "TransUnion"
  score: number
  scoreRange: string
  status: "current" | "outdated" | "error"
  lastUpdated: string
  accounts: number
  inquiries: number
  negativeItems: number
  reportUrl?: string
}

export interface CreditAlert {
  id: string
  title: string
  description: string
  severity: "low" | "medium" | "high"
  category: "score_change" | "new_account" | "inquiry" | "fraud" | "payment"
  date: string
  read: boolean
  actionRequired: boolean
}

export interface CreditRecommendation {
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

export interface CreditGoal {
  id: string
  targetScore: number
  currentScore: number
  targetDate: Date
  strategies: string[]
  progress: number
  milestones: {
    score: number
    date: Date
    achieved: boolean
  }[]
}

interface CreditSuiteContextType {
  creditProfile: CreditProfile
  creditHistory: CreditHistoryEntry[]
  creditReports: CreditReport[]
  alerts: CreditAlert[]
  recommendations: CreditRecommendation[]
  goals: CreditGoal[]
  isLoading: boolean
  error: string | null

  // Actions
  refreshCreditData: () => Promise<void>
  updateCreditProfile: (updates: Partial<CreditProfile>) => void
  markAlertAsRead: (alertId: string) => void
  createCreditGoal: (goal: Omit<CreditGoal, "id" | "progress">) => void
  updateCreditGoal: (goalId: string, updates: Partial<CreditGoal>) => void
  simulateScoreChange: (action: string, amount: number) => void
  disputeCreditItem: (itemId: string, reason: string) => Promise<void>
  requestCreditReport: (bureau: CreditReport["bureau"]) => Promise<void>

  // Analytics
  getCreditTrends: () => {
    scoreImprovement: number
    utilizationTrend: number
    accountGrowth: number
    paymentConsistency: number
  }
  getPredictedScore: (months: number) => number
  getCreditHealthScore: () => number
}

const CreditSuiteContext = createContext<CreditSuiteContextType | undefined>(undefined)

export const useCreditSuite = () => {
  const context = useContext(CreditSuiteContext)
  if (!context) {
    throw new Error("useCreditSuite must be used within a CreditProvider")
  }
  return context
}

// Sample data for demonstration
const sampleCreditProfile: CreditProfile = {
  userId: "user-123",
  ficoScore: 742,
  vantageScore: 738,
  scoreChange: 12,
  scoreRating: "Good",
  creditUtilization: 28,
  averageAccountAge: 4.2,
  oldestAccountAge: 8.5,
  totalAccounts: 12,
  openAccounts: 8,
  closedAccounts: 4,
  totalCreditLimit: 45000,
  totalBalance: 12600,
  paymentHistory: 98,
  creditInquiries: 2,
  negativeMarks: 1,
  lastUpdated: new Date(),
}

const sampleCreditHistory: CreditHistoryEntry[] = [
  { date: "Dec 2024", score: 742, change: 12, bureau: "Experian", reason: "Reduced credit utilization" },
  { date: "Nov 2024", score: 730, change: -5, bureau: "Experian", reason: "New credit inquiry" },
  { date: "Oct 2024", score: 735, change: 8, bureau: "Experian", reason: "On-time payments" },
  { date: "Sep 2024", score: 727, change: 3, bureau: "Experian" },
  { date: "Aug 2024", score: 724, change: 15, bureau: "Experian", reason: "Paid off credit card" },
  { date: "Jul 2024", score: 709, change: -2, bureau: "Experian" },
]

const sampleCreditReports: CreditReport[] = [
  {
    bureau: "Experian",
    score: 742,
    scoreRange: "300-850",
    status: "current",
    lastUpdated: "Dec 15, 2024",
    accounts: 12,
    inquiries: 2,
    negativeItems: 1,
  },
  {
    bureau: "Equifax",
    score: 738,
    scoreRange: "300-850",
    status: "current",
    lastUpdated: "Dec 14, 2024",
    accounts: 11,
    inquiries: 2,
    negativeItems: 1,
  },
  {
    bureau: "TransUnion",
    score: 745,
    scoreRange: "300-850",
    status: "current",
    lastUpdated: "Dec 13, 2024",
    accounts: 12,
    inquiries: 1,
    negativeItems: 0,
  },
]

const sampleAlerts: CreditAlert[] = [
  {
    id: "alert-1",
    title: "Credit Score Increased",
    description: "Your FICO score increased by 12 points to 742",
    severity: "low",
    category: "score_change",
    date: "2 hours ago",
    read: false,
    actionRequired: false,
  },
  {
    id: "alert-2",
    title: "New Credit Inquiry",
    description: "A new hard inquiry was added to your credit report from Chase Bank",
    severity: "medium",
    category: "inquiry",
    date: "1 day ago",
    read: false,
    actionRequired: true,
  },
  {
    id: "alert-3",
    title: "Payment Reminder",
    description: "Your Discover card payment is due in 3 days",
    severity: "medium",
    category: "payment",
    date: "3 days ago",
    read: true,
    actionRequired: true,
  },
]

const sampleRecommendations: CreditRecommendation[] = [
  {
    id: "rec-1",
    title: "Reduce Credit Utilization",
    description: "Pay down your credit card balances to below 10% utilization for maximum score impact",
    category: "utilization",
    priority: "high",
    potentialIncrease: 25,
    timeframe: "1-2 months",
    difficulty: "easy",
    actionSteps: [
      "Pay down Discover card balance by $2,000",
      "Pay down Chase card balance by $1,500",
      "Consider making multiple payments per month",
    ],
  },
  {
    id: "rec-2",
    title: "Request Credit Limit Increases",
    description: "Contact your credit card companies to request higher limits without new inquiries",
    category: "utilization",
    priority: "medium",
    potentialIncrease: 15,
    timeframe: "Immediate",
    difficulty: "easy",
    actionSteps: [
      "Call Discover customer service",
      "Request online limit increase from Chase",
      "Wait 6 months before next request",
    ],
  },
  {
    id: "rec-3",
    title: "Dispute Negative Mark",
    description: "Challenge the late payment from 2022 that may be inaccurate",
    category: "payment",
    priority: "high",
    potentialIncrease: 30,
    timeframe: "2-3 months",
    difficulty: "medium",
    actionSteps: [
      "Gather supporting documentation",
      "File dispute with all three bureaus",
      "Follow up on dispute status",
    ],
  },
]

export const CreditProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [creditProfile, setCreditProfile] = useState<CreditProfile>(sampleCreditProfile)
  const [creditHistory, setCreditHistory] = useState<CreditHistoryEntry[]>(sampleCreditHistory)
  const [creditReports, setCreditReports] = useState<CreditReport[]>(sampleCreditReports)
  const [alerts, setAlerts] = useState<CreditAlert[]>(sampleAlerts)
  const [recommendations, setRecommendations] = useState<CreditRecommendation[]>(sampleRecommendations)
  const [goals, setGoals] = useState<CreditGoal[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate minor score fluctuations
      if (Math.random() > 0.95) {
        const change = Math.floor(Math.random() * 5) - 2 // -2 to +2
        setCreditProfile((prev) => ({
          ...prev,
          ficoScore: Math.max(300, Math.min(850, prev.ficoScore + change)),
          scoreChange: change,
          lastUpdated: new Date(),
        }))
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const refreshCreditData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real implementation, this would fetch from credit APIs
      // For now, we'll simulate updated data
      setCreditProfile((prev) => ({
        ...prev,
        lastUpdated: new Date(),
      }))

      // Add a new history entry
      const newEntry: CreditHistoryEntry = {
        date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        score: creditProfile.ficoScore,
        change: 0,
        bureau: "Experian",
      }

      setCreditHistory((prev) => [newEntry, ...prev.slice(0, 11)])
    } catch (err) {
      setError("Failed to refresh credit data")
    } finally {
      setIsLoading(false)
    }
  }

  const updateCreditProfile = (updates: Partial<CreditProfile>) => {
    setCreditProfile((prev) => ({
      ...prev,
      ...updates,
      lastUpdated: new Date(),
    }))
  }

  const markAlertAsRead = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, read: true } : alert)))
  }

  const createCreditGoal = (goal: Omit<CreditGoal, "id" | "progress">) => {
    const newGoal: CreditGoal = {
      ...goal,
      id: `goal-${Date.now()}`,
      progress: 0,
    }
    setGoals((prev) => [...prev, newGoal])
  }

  const updateCreditGoal = (goalId: string, updates: Partial<CreditGoal>) => {
    setGoals((prev) => prev.map((goal) => (goal.id === goalId ? { ...goal, ...updates } : goal)))
  }

  const simulateScoreChange = (action: string, amount: number) => {
    let scoreChange = 0

    switch (action) {
      case "pay_balance":
        scoreChange = Math.floor((amount / 1000) * 5) // ~5 points per $1000 paid
        break
      case "increase_limit":
        scoreChange = Math.floor((amount / 1000) * 2) // ~2 points per $1000 limit increase
        break
      case "new_account":
        scoreChange = -10 // New account typically decreases score initially
        break
      case "close_account":
        scoreChange = -15 // Closing accounts can hurt score
        break
      default:
        scoreChange = 0
    }

    // Create a simulated alert for the action
    const newAlert: CreditAlert = {
      id: `sim-${Date.now()}`,
      title: "Score Simulation",
      description: `Simulated action would change your score by ${scoreChange > 0 ? "+" : ""}${scoreChange} points`,
      severity: scoreChange < 0 ? "medium" : "low",
      category: "score_change",
      date: "Just now",
      read: false,
      actionRequired: false,
    }

    setAlerts((prev) => [newAlert, ...prev])
  }

  const disputeCreditItem = async (itemId: string, reason: string) => {
    setIsLoading(true)
    try {
      // Simulate API call to credit bureaus
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newAlert: CreditAlert = {
        id: `dispute-${Date.now()}`,
        title: "Dispute Filed",
        description: `Your dispute for item ${itemId} has been filed with all three credit bureaus`,
        severity: "low",
        category: "score_change",
        date: "Just now",
        read: false,
        actionRequired: false,
      }

      setAlerts((prev) => [newAlert, ...prev])
    } finally {
      setIsLoading(false)
    }
  }

  const requestCreditReport = async (bureau: CreditReport["bureau"]) => {
    setIsLoading(true)
    try {
      // Simulate API call to credit bureau
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setCreditReports((prev) =>
        prev.map((report) =>
          report.bureau === bureau
            ? {
                ...report,
                status: "current" as const,
                lastUpdated: new Date().toLocaleDateString(),
              }
            : report,
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }

  const getCreditTrends = () => {
    const recentScores = creditHistory.slice(0, 6).map((entry) => entry.score)
    const scoreImprovement = recentScores.length > 1 ? recentScores[0] - recentScores[recentScores.length - 1] : 0

    return {
      scoreImprovement,
      utilizationTrend: -5, // Simulated improvement
      accountGrowth: 2, // Simulated new accounts
      paymentConsistency: 98, // Simulated payment history
    }
  }

  const getPredictedScore = (months: number) => {
    // Simple prediction based on current trends
    const currentTrend = getCreditTrends().scoreImprovement / 6 // Points per month
    return Math.min(850, Math.max(300, creditProfile.ficoScore + currentTrend * months))
  }

  const getCreditHealthScore = () => {
    let healthScore = 0

    // Payment history (35%)
    healthScore += (creditProfile.paymentHistory / 100) * 35

    // Credit utilization (30%)
    const utilizationScore = Math.max(0, (100 - creditProfile.creditUtilization) / 100)
    healthScore += utilizationScore * 30

    // Credit history length (15%)
    const historyScore = Math.min(1, creditProfile.averageAccountAge / 10)
    healthScore += historyScore * 15

    // Credit mix (10%)
    const mixScore = Math.min(1, creditProfile.totalAccounts / 10)
    healthScore += mixScore * 10

    // New credit (10%)
    const inquiryScore = Math.max(0, (10 - creditProfile.creditInquiries) / 10)
    healthScore += inquiryScore * 10

    return Math.round(healthScore)
  }

  return (
    <CreditSuiteContext.Provider
      value={{
        creditProfile,
        creditHistory,
        creditReports,
        alerts,
        recommendations,
        goals,
        isLoading,
        error,
        refreshCreditData,
        updateCreditProfile,
        markAlertAsRead,
        createCreditGoal,
        updateCreditGoal,
        simulateScoreChange,
        disputeCreditItem,
        requestCreditReport,
        getCreditTrends,
        getPredictedScore,
        getCreditHealthScore,
      }}
    >
      {children}
    </CreditSuiteContext.Provider>
  )
}
