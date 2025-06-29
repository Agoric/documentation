"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface PremiumUnlockContextType {
  isPremiumUnlocked: boolean
  unlockedFeatures: string[]
  unlockAllFeatures: () => void
  unlockFeature: (featureId: string) => void
  isFeatureUnlocked: (featureId: string) => boolean
}

const PremiumUnlockContext = createContext<PremiumUnlockContextType | undefined>(undefined)

export function PremiumUnlockProvider({ children }: { children: React.ReactNode }) {
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(true) // All features unlocked by default
  const [unlockedFeatures, setUnlockedFeatures] = useState<string[]>([
    // Credit Suite Features
    "credit-monitoring-advanced",
    "credit-optimization-ai",
    "credit-score-predictions",
    "credit-repair-automation",
    "credit-alerts-premium",

    // Business Suite Features
    "business-intelligence-ai",
    "market-analysis-advanced",
    "competitor-intelligence",
    "financial-forecasting",
    "team-collaboration-premium",
    "project-management-advanced",

    // Real Estate Features
    "property-analysis-ai",
    "investment-recommendations",
    "market-predictions",
    "property-comparison-unlimited",
    "exclusive-listings",

    // Trading Features
    "ai-trading-signals",
    "advanced-analytics",
    "market-predictions-ai",
    "portfolio-optimization",
    "risk-management-advanced",

    // Gamification Features
    "premium-achievements",
    "exclusive-rewards",
    "bonus-multipliers",
    "vip-challenges",
    "leaderboard-premium",

    // EcommereX Features
    "premium-products",
    "ai-shopping-assistant",
    "exclusive-deals",
    "advanced-comparisons",
    "priority-support",

    // AI Orb Features
    "unlimited-conversations",
    "advanced-ai-models",
    "specialized-knowledge",
    "priority-responses",
    "custom-personalities",

    // Goal Management Features
    "unlimited-goals",
    "ai-prioritization",
    "advanced-analytics",
    "productivity-insights",
    "premium-coaching",
  ])

  const unlockAllFeatures = () => {
    setIsPremiumUnlocked(true)
    // All features are already unlocked in the initial state
  }

  const unlockFeature = (featureId: string) => {
    setUnlockedFeatures((prev) => (prev.includes(featureId) ? prev : [...prev, featureId]))
  }

  const isFeatureUnlocked = (featureId: string) => {
    return isPremiumUnlocked || unlockedFeatures.includes(featureId)
  }

  // Auto-unlock all features on mount
  useEffect(() => {
    unlockAllFeatures()
  }, [])

  return (
    <PremiumUnlockContext.Provider
      value={{
        isPremiumUnlocked,
        unlockedFeatures,
        unlockAllFeatures,
        unlockFeature,
        isFeatureUnlocked,
      }}
    >
      {children}
    </PremiumUnlockContext.Provider>
  )
}

export function usePremiumUnlock() {
  const context = useContext(PremiumUnlockContext)
  if (context === undefined) {
    throw new Error("usePremiumUnlock must be used within a PremiumUnlockProvider")
  }
  return context
}
