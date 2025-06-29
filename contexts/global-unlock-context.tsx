"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface GlobalUnlockContextType {
  isEverythingUnlocked: boolean
  unlockedSuggestions: string[]
  unlockAllSuggestions: () => void
  getSuggestionStatus: (suggestionId: string) => "unlocked" | "premium" | "locked"
  getAllSuggestions: () => any[]
}

const GlobalUnlockContext = createContext<GlobalUnlockContextType | undefined>(undefined)

// Comprehensive list of ALL suggestions across the platform
const allSuggestions = [
  // Credit Suite Suggestions
  {
    id: "credit-score-boost",
    category: "credit",
    title: "Boost Credit Score by 50+ Points",
    description: "AI-optimized payment strategy",
    impact: "high",
    timeframe: "3 months",
  },
  {
    id: "credit-utilization-fix",
    category: "credit",
    title: "Optimize Credit Utilization",
    description: "Reduce utilization to under 10%",
    impact: "high",
    timeframe: "1 month",
  },
  {
    id: "credit-mix-improve",
    category: "credit",
    title: "Improve Credit Mix",
    description: "Add installment loan for diversity",
    impact: "medium",
    timeframe: "6 months",
  },
  {
    id: "credit-age-strategy",
    category: "credit",
    title: "Maximize Account Age",
    description: "Keep oldest accounts active",
    impact: "medium",
    timeframe: "ongoing",
  },
  {
    id: "credit-inquiry-timing",
    category: "credit",
    title: "Strategic Credit Inquiries",
    description: "Time applications for minimal impact",
    impact: "low",
    timeframe: "2 weeks",
  },
  {
    id: "credit-limit-increase",
    category: "credit",
    title: "Request Credit Limit Increases",
    description: "Boost available credit strategically",
    impact: "high",
    timeframe: "1 month",
  },
  {
    id: "credit-dispute-errors",
    category: "credit",
    title: "Dispute Credit Report Errors",
    description: "Remove inaccurate negative items",
    impact: "high",
    timeframe: "3 months",
  },
  {
    id: "credit-authorized-user",
    category: "credit",
    title: "Become Authorized User",
    description: "Piggyback on excellent credit history",
    impact: "medium",
    timeframe: "1 month",
  },

  // Business Suite Suggestions
  {
    id: "revenue-optimization",
    category: "business",
    title: "Optimize Revenue Streams",
    description: "AI-identified growth opportunities",
    impact: "high",
    timeframe: "6 months",
  },
  {
    id: "market-expansion",
    category: "business",
    title: "Expand to Asian Markets",
    description: "High-growth market opportunity",
    impact: "high",
    timeframe: "12 months",
  },
  {
    id: "cost-reduction",
    category: "business",
    title: "Reduce Operating Costs",
    description: "AI-powered efficiency improvements",
    impact: "medium",
    timeframe: "3 months",
  },
  {
    id: "team-productivity",
    category: "business",
    title: "Boost Team Productivity",
    description: "Implement AI workflow optimization",
    impact: "high",
    timeframe: "2 months",
  },
  {
    id: "customer-retention",
    category: "business",
    title: "Improve Customer Retention",
    description: "Predictive churn prevention",
    impact: "high",
    timeframe: "4 months",
  },
  {
    id: "supply-chain-optimize",
    category: "business",
    title: "Optimize Supply Chain",
    description: "Reduce costs and improve efficiency",
    impact: "medium",
    timeframe: "6 months",
  },
  {
    id: "digital-transformation",
    category: "business",
    title: "Digital Transformation",
    description: "Modernize business processes",
    impact: "high",
    timeframe: "12 months",
  },
  {
    id: "competitive-advantage",
    category: "business",
    title: "Build Competitive Moat",
    description: "Strengthen market position",
    impact: "high",
    timeframe: "18 months",
  },

  // Real Estate Suggestions
  {
    id: "property-investment",
    category: "realestate",
    title: "Prime Investment Property",
    description: "High-yield rental opportunity",
    impact: "high",
    timeframe: "immediate",
  },
  {
    id: "market-timing",
    category: "realestate",
    title: "Optimal Buying Time",
    description: "Market conditions favor buyers",
    impact: "medium",
    timeframe: "3 months",
  },
  {
    id: "financing-strategy",
    category: "realestate",
    title: "50-Year Financing Option",
    description: "Lower monthly payments",
    impact: "high",
    timeframe: "immediate",
  },
  {
    id: "property-flip",
    category: "realestate",
    title: "Fix & Flip Opportunity",
    description: "Undervalued property with potential",
    impact: "high",
    timeframe: "6 months",
  },
  {
    id: "rental-income",
    category: "realestate",
    title: "Maximize Rental Income",
    description: "Optimize property for higher yields",
    impact: "medium",
    timeframe: "2 months",
  },
  {
    id: "tax-benefits",
    category: "realestate",
    title: "Real Estate Tax Benefits",
    description: "Maximize deductions and credits",
    impact: "medium",
    timeframe: "ongoing",
  },
  {
    id: "portfolio-diversify",
    category: "realestate",
    title: "Diversify Property Portfolio",
    description: "Spread risk across property types",
    impact: "medium",
    timeframe: "12 months",
  },
  {
    id: "market-analysis",
    category: "realestate",
    title: "Neighborhood Analysis",
    description: "Identify emerging growth areas",
    impact: "high",
    timeframe: "ongoing",
  },

  // Trading/Investment Suggestions
  {
    id: "ai-trading-signals",
    category: "trading",
    title: "AI Trading Signals",
    description: "High-probability trade opportunities",
    impact: "high",
    timeframe: "daily",
  },
  {
    id: "portfolio-rebalance",
    category: "trading",
    title: "Portfolio Rebalancing",
    description: "Optimize risk-adjusted returns",
    impact: "medium",
    timeframe: "quarterly",
  },
  {
    id: "sector-rotation",
    category: "trading",
    title: "Sector Rotation Strategy",
    description: "Capitalize on economic cycles",
    impact: "high",
    timeframe: "monthly",
  },
  {
    id: "options-strategy",
    category: "trading",
    title: "Options Income Strategy",
    description: "Generate additional income",
    impact: "medium",
    timeframe: "weekly",
  },
  {
    id: "crypto-allocation",
    category: "trading",
    title: "Crypto Portfolio Allocation",
    description: "Diversify with digital assets",
    impact: "high",
    timeframe: "immediate",
  },
  {
    id: "dividend-growth",
    category: "trading",
    title: "Dividend Growth Stocks",
    description: "Build passive income stream",
    impact: "medium",
    timeframe: "long-term",
  },
  {
    id: "risk-management",
    category: "trading",
    title: "Risk Management Rules",
    description: "Protect capital with stop-losses",
    impact: "high",
    timeframe: "immediate",
  },
  {
    id: "tax-optimization",
    category: "trading",
    title: "Tax-Loss Harvesting",
    description: "Minimize tax liability",
    impact: "medium",
    timeframe: "year-end",
  },

  // E-commerce Suggestions
  {
    id: "product-recommendations",
    category: "ecommerce",
    title: "Personalized Product Picks",
    description: "AI-curated product suggestions",
    impact: "medium",
    timeframe: "immediate",
  },
  {
    id: "price-optimization",
    category: "ecommerce",
    title: "Price Drop Alerts",
    description: "Get notified of best deals",
    impact: "low",
    timeframe: "ongoing",
  },
  {
    id: "bundle-deals",
    category: "ecommerce",
    title: "Smart Bundle Deals",
    description: "Save with complementary products",
    impact: "medium",
    timeframe: "immediate",
  },
  {
    id: "seasonal-buying",
    category: "ecommerce",
    title: "Seasonal Buying Guide",
    description: "Time purchases for maximum savings",
    impact: "medium",
    timeframe: "seasonal",
  },
  {
    id: "quality-analysis",
    category: "ecommerce",
    title: "Product Quality Analysis",
    description: "AI-powered quality assessment",
    impact: "high",
    timeframe: "immediate",
  },
  {
    id: "competitor-pricing",
    category: "ecommerce",
    title: "Competitor Price Tracking",
    description: "Ensure you get the best price",
    impact: "medium",
    timeframe: "ongoing",
  },
  {
    id: "review-analysis",
    category: "ecommerce",
    title: "Review Sentiment Analysis",
    description: "AI analysis of product reviews",
    impact: "high",
    timeframe: "immediate",
  },
  {
    id: "warranty-optimization",
    category: "ecommerce",
    title: "Warranty Optimization",
    description: "Choose optimal warranty coverage",
    impact: "low",
    timeframe: "immediate",
  },

  // Gamification Suggestions
  {
    id: "achievement-unlock",
    category: "gamification",
    title: "Unlock Premium Achievements",
    description: "Access exclusive rewards",
    impact: "medium",
    timeframe: "immediate",
  },
  {
    id: "challenge-complete",
    category: "gamification",
    title: "Complete Daily Challenges",
    description: "Maximize point earnings",
    impact: "low",
    timeframe: "daily",
  },
  {
    id: "leaderboard-climb",
    category: "gamification",
    title: "Climb Leaderboards",
    description: "Compete for top positions",
    impact: "medium",
    timeframe: "weekly",
  },
  {
    id: "streak-maintain",
    category: "gamification",
    title: "Maintain Activity Streaks",
    description: "Build consistent habits",
    impact: "low",
    timeframe: "ongoing",
  },
  {
    id: "bonus-multiplier",
    category: "gamification",
    title: "Activate Bonus Multipliers",
    description: "Increase reward earnings",
    impact: "medium",
    timeframe: "immediate",
  },
  {
    id: "social-connect",
    category: "gamification",
    title: "Connect with Friends",
    description: "Unlock social features",
    impact: "low",
    timeframe: "immediate",
  },
  {
    id: "premium-rewards",
    category: "gamification",
    title: "Claim Premium Rewards",
    description: "Access exclusive benefits",
    impact: "high",
    timeframe: "immediate",
  },
  {
    id: "skill-development",
    category: "gamification",
    title: "Develop New Skills",
    description: "Unlock learning achievements",
    impact: "medium",
    timeframe: "ongoing",
  },

  // AI/Productivity Suggestions
  {
    id: "ai-automation",
    category: "productivity",
    title: "Automate Routine Tasks",
    description: "AI-powered workflow automation",
    impact: "high",
    timeframe: "1 week",
  },
  {
    id: "goal-prioritization",
    category: "productivity",
    title: "AI Goal Prioritization",
    description: "Optimize task ordering",
    impact: "medium",
    timeframe: "immediate",
  },
  {
    id: "time-optimization",
    category: "productivity",
    title: "Time Block Optimization",
    description: "Maximize productive hours",
    impact: "medium",
    timeframe: "1 week",
  },
  {
    id: "focus-enhancement",
    category: "productivity",
    title: "Focus Enhancement",
    description: "Eliminate distractions",
    impact: "high",
    timeframe: "immediate",
  },
  {
    id: "energy-management",
    category: "productivity",
    title: "Energy Management",
    description: "Align tasks with energy levels",
    impact: "medium",
    timeframe: "ongoing",
  },
  {
    id: "habit-formation",
    category: "productivity",
    title: "Habit Formation",
    description: "Build positive routines",
    impact: "high",
    timeframe: "30 days",
  },
  {
    id: "decision-making",
    category: "productivity",
    title: "Decision Making Framework",
    description: "Improve decision quality",
    impact: "medium",
    timeframe: "ongoing",
  },
  {
    id: "learning-acceleration",
    category: "productivity",
    title: "Accelerated Learning",
    description: "Optimize knowledge acquisition",
    impact: "high",
    timeframe: "ongoing",
  },

  // Financial Planning Suggestions
  {
    id: "emergency-fund",
    category: "financial",
    title: "Build Emergency Fund",
    description: "6-month expense cushion",
    impact: "high",
    timeframe: "12 months",
  },
  {
    id: "debt-payoff",
    category: "financial",
    title: "Debt Payoff Strategy",
    description: "Optimize debt elimination",
    impact: "high",
    timeframe: "24 months",
  },
  {
    id: "retirement-planning",
    category: "financial",
    title: "Retirement Planning",
    description: "Maximize retirement savings",
    impact: "high",
    timeframe: "ongoing",
  },
  {
    id: "tax-strategy",
    category: "financial",
    title: "Tax Optimization",
    description: "Minimize tax liability",
    impact: "medium",
    timeframe: "annual",
  },
  {
    id: "insurance-review",
    category: "financial",
    title: "Insurance Review",
    description: "Optimize coverage and costs",
    impact: "medium",
    timeframe: "annual",
  },
  {
    id: "estate-planning",
    category: "financial",
    title: "Estate Planning",
    description: "Protect and transfer wealth",
    impact: "high",
    timeframe: "6 months",
  },
  {
    id: "investment-allocation",
    category: "financial",
    title: "Asset Allocation",
    description: "Optimize investment mix",
    impact: "high",
    timeframe: "quarterly",
  },
  {
    id: "cash-flow-optimize",
    category: "financial",
    title: "Cash Flow Optimization",
    description: "Improve money management",
    impact: "medium",
    timeframe: "3 months",
  },
]

export function GlobalUnlockProvider({ children }: { children: React.ReactNode }) {
  const [isEverythingUnlocked, setIsEverythingUnlocked] = useState(true)
  const [unlockedSuggestions, setUnlockedSuggestions] = useState<string[]>(allSuggestions.map((s) => s.id))

  const unlockAllSuggestions = () => {
    setIsEverythingUnlocked(true)
    setUnlockedSuggestions(allSuggestions.map((s) => s.id))
  }

  const getSuggestionStatus = (suggestionId: string) => {
    return "unlocked" // Always return unlocked since everything is enabled
  }

  const getAllSuggestions = () => {
    return allSuggestions.map((suggestion) => ({
      ...suggestion,
      status: getSuggestionStatus(suggestion.id),
      isUnlocked: getSuggestionStatus(suggestion.id) === "unlocked",
    }))
  }

  // Auto-unlock everything on mount
  useEffect(() => {
    unlockAllSuggestions()
  }, [])

  return (
    <GlobalUnlockContext.Provider
      value={{
        isEverythingUnlocked,
        unlockedSuggestions,
        unlockAllSuggestions,
        getSuggestionStatus,
        getAllSuggestions,
      }}
    >
      {children}
    </GlobalUnlockContext.Provider>
  )
}

export function useGlobalUnlock() {
  const context = useContext(GlobalUnlockContext)
  if (context === undefined) {
    throw new Error("useGlobalUnlock must be used within a GlobalUnlockProvider")
  }
  return context
}
