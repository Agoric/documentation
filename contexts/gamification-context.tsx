"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

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

const initialState: GamificationState = {
  points: 0,
  streak: 0,
  lastActive: null,
  level: defaultLevel,
  achievements: [],
  challenges: [],
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
  {
    level: 6,
    title: "Wealth Builder",
    points: 1500,
    nextLevelPoints: 2200,
    benefits: ["Wealth building tools", "Premium transaction limits"],
  },
  {
    level: 7,
    title: "Portfolio Master",
    points: 2200,
    nextLevelPoints: 3000,
    benefits: ["Portfolio optimization", "Exclusive investment options"],
  },
  {
    level: 8,
    title: "Financial Virtuoso",
    points: 3000,
    nextLevelPoints: 4000,
    benefits: ["Advanced tax strategies", "VIP customer support"],
  },
  {
    level: 9,
    title: "Wealth Architect",
    points: 4000,
    nextLevelPoints: 5500,
    benefits: ["Wealth preservation tools", "Estate planning features"],
  },
  {
    level: 10,
    title: "Financial Luminary",
    points: 5500,
    nextLevelPoints: 7500,
    benefits: ["Holistic financial mastery", "Exclusive platform features"],
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
    id: "profile-complete",
    title: "Identity Established",
    description: "Complete your user profile",
    icon: "user",
    points: 20,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: "engagement",
    rarity: "common",
  },
  {
    id: "first-transaction",
    title: "Transaction Initiate",
    description: "Complete your first transaction",
    icon: "credit-card",
    points: 15,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: "financial",
    rarity: "common",
  },
  {
    id: "budget-creator",
    title: "Budget Architect",
    description: "Create your first budget plan",
    icon: "pie-chart",
    points: 25,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: "financial",
    rarity: "uncommon",
  },
  {
    id: "savings-milestone",
    title: "Savings Milestone",
    description: "Reach your first savings goal",
    icon: "piggy-bank",
    points: 50,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: "financial",
    rarity: "uncommon",
  },
  {
    id: "investment-starter",
    title: "Investment Pioneer",
    description: "Make your first investment",
    icon: "trending-up",
    points: 30,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: "investment",
    rarity: "uncommon",
  },
  {
    id: "learning-enthusiast",
    title: "Financial Scholar",
    description: "Complete 5 financial education modules",
    icon: "book-open",
    points: 40,
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    category: "learning",
    rarity: "rare",
  },
  {
    id: "streak-master",
    title: "Consistency Champion",
    description: "Maintain a 7-day login streak",
    icon: "calendar",
    points: 35,
    unlocked: false,
    progress: 0,
    maxProgress: 7,
    category: "engagement",
    rarity: "rare",
  },
  {
    id: "diversified-portfolio",
    title: "Diversification Strategist",
    description: "Invest in 5 different asset classes",
    icon: "grid",
    points: 60,
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    category: "investment",
    rarity: "epic",
  },
  {
    id: "financial-freedom",
    title: "Financial Liberator",
    description: "Achieve your major financial goal",
    icon: "award",
    points: 100,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: "special",
    rarity: "legendary",
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
  {
    id: "review-transactions",
    title: "Transaction Review",
    description: "Review your recent transactions",
    reward: 10,
    deadline: new Date(new Date().setHours(23, 59, 59, 999)),
    completed: false,
    progress: 0,
    maxProgress: 1,
    category: "daily",
  },
  {
    id: "budget-check",
    title: "Budget Check",
    description: "Review your budget progress",
    reward: 15,
    deadline: new Date(new Date().setHours(23, 59, 59, 999)),
    completed: false,
    progress: 0,
    maxProgress: 1,
    category: "daily",
  },
  {
    id: "weekly-savings",
    title: "Weekly Saver",
    description: "Add to your savings account this week",
    reward: 25,
    deadline: getWeekEndDate(),
    completed: false,
    progress: 0,
    maxProgress: 1,
    category: "weekly",
  },
  {
    id: "market-research",
    title: "Market Analyst",
    description: "Check market trends 3 times this week",
    reward: 30,
    deadline: getWeekEndDate(),
    completed: false,
    progress: 0,
    maxProgress: 3,
    category: "weekly",
  },
  {
    id: "monthly-goal",
    title: "Goal Tracker",
    description: "Update progress on your monthly financial goal",
    reward: 50,
    deadline: getMonthEndDate(),
    completed: false,
    progress: 0,
    maxProgress: 1,
    category: "monthly",
  },
]

// Helper functions for date calculations
function getWeekEndDate() {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const daysUntilSunday = 7 - dayOfWeek
  const sunday = new Date(now)
  sunday.setDate(now.getDate() + daysUntilSunday)
  sunday.setHours(23, 59, 59, 999)
  return sunday
}

function getMonthEndDate() {
  const now = new Date()
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  lastDay.setHours(23, 59, 59, 999)
  return lastDay
}

export const GamificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GamificationState>(() => {
    // Initialize with sample data
    return {
      ...initialState,
      achievements: sampleAchievements,
      challenges: sampleChallenges,
    }
  })

  // Check for streak updates on component mount
  useEffect(() => {
    const updateStreak = () => {
      const now = new Date()
      const lastActive = state.lastActive

      if (!lastActive) {
        // First login
        setState((prev) => ({
          ...prev,
          streak: 1,
          lastActive: now,
        }))
        return
      }

      const lastActiveDate = new Date(lastActive)
      const yesterday = new Date(now)
      yesterday.setDate(now.getDate() - 1)

      // Check if last active was yesterday
      if (
        lastActiveDate.getDate() === yesterday.getDate() &&
        lastActiveDate.getMonth() === yesterday.getMonth() &&
        lastActiveDate.getFullYear() === yesterday.getFullYear()
      ) {
        // Increment streak
        setState((prev) => ({
          ...prev,
          streak: prev.streak + 1,
          lastActive: now,
        }))
      } else if (
        lastActiveDate.getDate() !== now.getDate() ||
        lastActiveDate.getMonth() !== now.getMonth() ||
        lastActiveDate.getFullYear() !== now.getFullYear()
      ) {
        // Reset streak if not yesterday and not today
        setState((prev) => ({
          ...prev,
          streak: 1,
          lastActive: now,
        }))
      }
    }

    updateStreak()
    // Reset daily challenges at midnight
    const checkDailyChallenges = () => {
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setDate(now.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)

      const timeUntilMidnight = tomorrow.getTime() - now.getTime()

      setTimeout(() => {
        resetDailyChallenges()
        // Set up the next check
        checkDailyChallenges()
      }, timeUntilMidnight)
    }

    checkDailyChallenges()
  }, [])

  // Update level based on points
  useEffect(() => {
    const currentLevel = levels.findLast((level) => state.points >= level.points) || levels[0]
    const nextLevel = levels.find((level) => level.points > currentLevel.points) || levels[levels.length - 1]

    if (currentLevel.level !== state.level.level) {
      setState((prev) => ({
        ...prev,
        level: {
          ...currentLevel,
          nextLevelPoints: nextLevel.points,
        },
      }))
    }
  }, [state.points])

  const addPoints = (points: number, reason: string) => {
    setState((prev) => ({
      ...prev,
      points: prev.points + points,
      recentRewards: [
        {
          id: Date.now().toString(),
          title: reason,
          points,
          timestamp: new Date(),
        },
        ...prev.recentRewards.slice(0, 9), // Keep only the 10 most recent rewards
      ],
    }))
  }

  const completeChallenge = (challengeId: string) => {
    setState((prev) => {
      const updatedChallenges = prev.challenges.map((challenge) => {
        if (challenge.id === challengeId && !challenge.completed) {
          // Add points for completing the challenge
          addPoints(challenge.reward, `Completed challenge: ${challenge.title}`)
          return { ...challenge, completed: true, progress: challenge.maxProgress }
        }
        return challenge
      })

      return {
        ...prev,
        challenges: updatedChallenges,
      }
    })
  }

  const updateAchievementProgress = (achievementId: string, progress: number) => {
    setState((prev) => {
      const updatedAchievements = prev.achievements.map((achievement) => {
        if (achievement.id === achievementId) {
          const newProgress = Math.min(achievement.maxProgress, progress)
          const wasUnlocked = achievement.unlocked
          const isNowUnlocked = newProgress >= achievement.maxProgress

          // If newly unlocked, add points
          if (!wasUnlocked && isNowUnlocked) {
            addPoints(achievement.points, `Unlocked achievement: ${achievement.title}`)
          }

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
  }

  const resetDailyChallenges = () => {
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
  }

  const claimReward = (rewardId: string) => {
    // Implementation for claiming rewards
    console.log(`Claimed reward: ${rewardId}`)
  }

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
