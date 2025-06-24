"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

// Define types for our gamification system
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  points: number
  unlocked: boolean
  progress: number
  maxProgress: number
  category: "financial" | "engagement" | "learning" | "investment" | "special"
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
}

export interface Challenge {
  id: string
  title: string
  description: string
  reward: number
  deadline: Date | null
  completed: boolean
  progress: number
  maxProgress: number
  category: "daily" | "weekly" | "monthly" | "special"
}

export interface UserLevel {
  level: number
  title: string
  points: number
  nextLevelPoints: number
  benefits: string[]
}

export interface GamificationState {
  points: number
  streak: number
  lastActive: Date | null
  level: UserLevel
  achievements: Achievement[]
  challenges: Challenge[]
  recentRewards: {
    id: string
    title: string
    points: number
    timestamp: Date
  }[]
}

interface GamificationContextType {
  state: GamificationState
  addPoints: (points: number, reason: string) => void
  completeChallenge: (challengeId: string) => void
  updateAchievementProgress: (achievementId: string, progress: number) => void
  resetDailyChallenges: () => void
  claimReward: (rewardId: string) => void
}

const defaultLevel: UserLevel = {
  level: 1,
  title: "Financial Novice",
  points: 0,
  nextLevelPoints: 100,
  benefits: ["Basic financial insights", "Standard transaction limits"],
}

// Define level thresholds and titles
const levels: UserLevel[] = [
  {
    level: 1,
    title: "Financial Novice",
    points: 0,
    nextLevelPoints: 100,
    benefits: ["Basic financial insights", "Standard transaction limits"],
  },
  {
    level: 2,
    title: "Budget Apprentice",
    points: 100,
    nextLevelPoints: 300,
    benefits: ["Enhanced budget tools", "Daily streak bonuses"],
  },
  {
    level: 3,
    title: "Savings Adept",
    points: 300,
    nextLevelPoints: 600,
    benefits: ["Savings optimization", "Weekly challenges"],
  },
  {
    level: 4,
    title: "Investment Initiate",
    points: 600,
    nextLevelPoints: 1000,
    benefits: ["Basic investment tools", "Market insights"],
  },
  {
    level: 5,
    title: "Financial Strategist",
    points: 1000,
    nextLevelPoints: 1500,
    benefits: ["Advanced analytics", "Personalized strategies"],
  },
]

// Sample achievements
const sampleAchievements: Achievement[] = [
  {
    id: "first-login",
    title: "Digital Pioneer",
    description: "Log in to the platform for the first time",
    icon: "rocket",
    points: 10,
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    category: "engagement",
    rarity: "common",
  },
  {
    id: "product-explorer",
    title: "Product Explorer",
    description: "Browse products in the marketplace",
    icon: "search",
    points: 5,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: "engagement",
    rarity: "common",
  },
  {
    id: "comparison-master",
    title: "Comparison Master",
    description: "Compare multiple products",
    icon: "bar-chart",
    points: 15,
    unlocked: false,
    progress: 0,
    maxProgress: 3,
    category: "engagement",
    rarity: "uncommon",
  },
]

// Sample challenges
const sampleChallenges: Challenge[] = [
  {
    id: "daily-login",
    title: "Daily Check-in",
    description: "Log in to the platform today",
    reward: 5,
    deadline: new Date(new Date().setHours(23, 59, 59, 999)),
    completed: false,
    progress: 0,
    maxProgress: 1,
    category: "daily",
  },
]

const initialState: GamificationState = {
  points: 50,
  streak: 1,
  lastActive: new Date(),
  level: defaultLevel,
  achievements: sampleAchievements,
  challenges: sampleChallenges,
  recentRewards: [],
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined)

export const useGamification = () => {
  const context = useContext(GamificationContext)
  if (!context) {
    throw new Error("useGamification must be used within a GamificationProvider")
  }
  return context
}

export const GamificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GamificationState>(initialState)

  const addPoints = useCallback((points: number, reason: string) => {
    setState((prev) => {
      const newPoints = prev.points + points
      const currentLevel = levels.findLast((level) => newPoints >= level.points) || levels[0]
      const nextLevel = levels.find((level) => level.points > currentLevel.points) || levels[levels.length - 1]

      return {
        ...prev,
        points: newPoints,
        level: {
          ...currentLevel,
          nextLevelPoints: nextLevel.points,
        },
        recentRewards: [
          {
            id: Date.now().toString(),
            title: reason,
            points,
            timestamp: new Date(),
          },
          ...prev.recentRewards.slice(0, 9),
        ],
      }
    })
  }, [])

  const completeChallenge = useCallback((challengeId: string) => {
    setState((prev) => {
      const updatedChallenges = prev.challenges.map((challenge) => {
        if (challenge.id === challengeId && !challenge.completed) {
          return { ...challenge, completed: true, progress: challenge.maxProgress }
        }
        return challenge
      })

      return {
        ...prev,
        challenges: updatedChallenges,
      }
    })
  }, [])

  const updateAchievementProgress = useCallback((achievementId: string, progress: number) => {
    setState((prev) => {
      const updatedAchievements = prev.achievements.map((achievement) => {
        if (achievement.id === achievementId) {
          const newProgress = Math.min(achievement.maxProgress, Math.max(achievement.progress, progress))
          const isNowUnlocked = newProgress >= achievement.maxProgress

          return {
            ...achievement,
            progress: newProgress,
            unlocked: isNowUnlocked,
          }
        }
        return achievement
      })

      return {
        ...prev,
        achievements: updatedAchievements,
      }
    })
  }, [])

  const resetDailyChallenges = useCallback(() => {
    setState((prev) => {
      const updatedChallenges = prev.challenges.map((challenge) => {
        if (challenge.category === "daily") {
          const newDeadline = new Date(new Date().setHours(23, 59, 59, 999))
          return {
            ...challenge,
            completed: false,
            progress: 0,
            deadline: newDeadline,
          }
        }
        return challenge
      })

      return {
        ...prev,
        challenges: updatedChallenges,
      }
    })
  }, [])

  const claimReward = useCallback((rewardId: string) => {
    console.log(`Claimed reward: ${rewardId}`)
  }, [])

  return (
    <GamificationContext.Provider
      value={{
        state,
        addPoints,
        completeChallenge,
        updateAchievementProgress,
        resetDailyChallenges,
        claimReward,
      }}
    >
      {children}
    </GamificationContext.Provider>
  )
}
