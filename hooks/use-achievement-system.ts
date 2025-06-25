"use client"

import * as React from "react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  level: number
  unlocked: boolean
  unlockedAt?: Date
  category: "financial" | "platform" | "social" | "special"
  requirements: {
    type: "action" | "milestone" | "time" | "combination"
    criteria: Record<string, any>
  }
  rewards: {
    cardVariant?: string
    laserPattern?: string
    particleEffect?: string
    title?: string
  }
}

interface AchievementSystem {
  achievements: Achievement[]
  unlockedCount: number
  totalCount: number
  currentLevel: number
  nextLevelProgress: number
}

const defaultAchievements: Achievement[] = [
  {
    id: "first-login",
    title: "Welcome Aboard",
    description: "Complete your first login to the Snapifi platform",
    icon: "🚀",
    level: 1,
    unlocked: true,
    category: "platform",
    requirements: { type: "action", criteria: { action: "login" } },
    rewards: { cardVariant: "diamond", laserPattern: "classic" },
  },
  {
    id: "credit-score-boost",
    title: "Credit Champion",
    description: "Increase your credit score by 50+ points",
    icon: "📈",
    level: 2,
    unlocked: false,
    category: "financial",
    requirements: { type: "milestone", criteria: { creditIncrease: 50 } },
    rewards: { cardVariant: "emerald", laserPattern: "geometric", title: "Credit Master" },
  },
  {
    id: "loan-approved",
    title: "Property Pioneer",
    description: "Get approved for a 50-year revolutionary loan",
    icon: "🏠",
    level: 3,
    unlocked: false,
    category: "financial",
    requirements: { type: "milestone", criteria: { loanApproval: "50-year" } },
    rewards: { cardVariant: "sapphire", laserPattern: "royal", title: "Property Pioneer" },
  },
  {
    id: "investment-master",
    title: "Portfolio Virtuoso",
    description: "Achieve 15%+ annual returns on your investment portfolio",
    icon: "💎",
    level: 4,
    unlocked: false,
    category: "financial",
    requirements: { type: "milestone", criteria: { portfolioReturn: 15 } },
    rewards: { cardVariant: "ruby", laserPattern: "futuristic", title: "Investment Virtuoso" },
  },
  {
    id: "diplomatic-agent",
    title: "Diplomatic Agent",
    description: "Complete diplomatic agent certification",
    icon: "🛡️",
    level: 5,
    unlocked: false,
    category: "special",
    requirements: { type: "action", criteria: { certification: "diplomatic-agent" } },
    rewards: { cardVariant: "obsidian", laserPattern: "circuit", title: "Diplomatic Agent" },
  },
  {
    id: "platform-citizen",
    title: "Platform Citizen",
    description: "Achieve elite status with all premium benefits unlocked",
    icon: "👑",
    level: 6,
    unlocked: false,
    category: "special",
    requirements: { type: "combination", criteria: { achievements: 5, timeActive: 90 } },
    rewards: { cardVariant: "platinum", laserPattern: "organic", title: "Platform Citizen" },
  },
]

export function useAchievementSystem() {
  const [achievements, setAchievements] = React.useState<Achievement[]>(defaultAchievements)
  const [system, setSystem] = React.useState<AchievementSystem>({
    achievements: defaultAchievements,
    unlockedCount: 1,
    totalCount: defaultAchievements.length,
    currentLevel: 1,
    nextLevelProgress: 0,
  })

  // Load achievements from localStorage
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("snapifi-achievements")
      if (saved) {
        const savedAchievements = JSON.parse(saved)
        setAchievements(savedAchievements)
        updateSystem(savedAchievements)
      }
    } catch (error) {
      console.warn("Error loading achievements:", error)
    }
  }, [])

  // Save achievements to localStorage
  const saveAchievements = React.useCallback((newAchievements: Achievement[]) => {
    try {
      localStorage.setItem("snapifi-achievements", JSON.stringify(newAchievements))
    } catch (error) {
      console.warn("Error saving achievements:", error)
    }
  }, [])

  // Update system stats
  const updateSystem = React.useCallback((achievementList: Achievement[]) => {
    const unlockedCount = achievementList.filter((a) => a.unlocked).length
    const currentLevel = Math.floor(unlockedCount / 2) + 1
    const nextLevelProgress = ((unlockedCount % 2) / 2) * 100

    setSystem({
      achievements: achievementList,
      unlockedCount,
      totalCount: achievementList.length,
      currentLevel,
      nextLevelProgress,
    })
  }, [])

  // Unlock achievement
  const unlockAchievement = React.useCallback(
    (achievementId: string) => {
      setAchievements((prev) => {
        const updated = prev.map((achievement) =>
          achievement.id === achievementId && !achievement.unlocked
            ? { ...achievement, unlocked: true, unlockedAt: new Date() }
            : achievement,
        )

        saveAchievements(updated)
        updateSystem(updated)
        return updated
      })

      return true
    },
    [saveAchievements, updateSystem],
  )

  // Check if achievement is unlocked
  const isAchievementUnlocked = React.useCallback(
    (achievementId: string) => {
      return achievements.find((a) => a.id === achievementId)?.unlocked || false
    },
    [achievements],
  )

  // Get achievement level
  const getAchievementLevel = React.useCallback(
    (achievementId: string) => {
      return achievements.find((a) => a.id === achievementId)?.level || 1
    },
    [achievements],
  )

  // Get unlocked achievements
  const getUnlockedAchievements = React.useCallback(() => {
    return achievements.filter((a) => a.unlocked)
  }, [achievements])

  // Get locked achievements
  const getLockedAchievements = React.useCallback(() => {
    return achievements.filter((a) => !a.unlocked)
  }, [achievements])

  // Get achievement by ID
  const getAchievement = React.useCallback(
    (achievementId: string) => {
      return achievements.find((a) => a.id === achievementId)
    },
    [achievements],
  )

  // Get achievements by category
  const getAchievementsByCategory = React.useCallback(
    (category: Achievement["category"]) => {
      return achievements.filter((a) => a.category === category)
    },
    [achievements],
  )

  // Check and unlock achievements based on criteria
  const checkAchievements = React.useCallback(
    (criteria: Record<string, any>) => {
      const newlyUnlocked: Achievement[] = []

      achievements.forEach((achievement) => {
        if (achievement.unlocked) return

        let shouldUnlock = false

        switch (achievement.requirements.type) {
          case "action":
            shouldUnlock = Object.entries(achievement.requirements.criteria).every(
              ([key, value]) => criteria[key] === value,
            )
            break

          case "milestone":
            shouldUnlock = Object.entries(achievement.requirements.criteria).every(
              ([key, value]) => criteria[key] >= value,
            )
            break

          case "time":
            shouldUnlock = Object.entries(achievement.requirements.criteria).every(
              ([key, value]) => criteria[key] >= value,
            )
            break

          case "combination":
            shouldUnlock = Object.entries(achievement.requirements.criteria).every(([key, value]) => {
              if (key === "achievements") {
                return system.unlockedCount >= value
              }
              return criteria[key] >= value
            })
            break
        }

        if (shouldUnlock) {
          unlockAchievement(achievement.id)
          newlyUnlocked.push(achievement)
        }
      })

      return newlyUnlocked
    },
    [achievements, system.unlockedCount, unlockAchievement],
  )

  // Get current card variant based on highest unlocked achievement
  const getCurrentCardVariant = React.useCallback(() => {
    const unlockedAchievements = getUnlockedAchievements()
    const highest = unlockedAchievements.reduce(
      (max, achievement) => (achievement.level > max.level ? achievement : max),
      unlockedAchievements[0] || defaultAchievements[0],
    )

    return highest?.rewards.cardVariant || "diamond"
  }, [getUnlockedAchievements])

  // Get current laser pattern
  const getCurrentLaserPattern = React.useCallback(() => {
    const unlockedAchievements = getUnlockedAchievements()
    const highest = unlockedAchievements.reduce(
      (max, achievement) => (achievement.level > max.level ? achievement : max),
      unlockedAchievements[0] || defaultAchievements[0],
    )

    return highest?.rewards.laserPattern || "classic"
  }, [getUnlockedAchievements])

  // Get current title
  const getCurrentTitle = React.useCallback(() => {
    const unlockedAchievements = getUnlockedAchievements()
    const highest = unlockedAchievements.reduce(
      (max, achievement) => (achievement.level > max.level ? achievement : max),
      unlockedAchievements[0] || defaultAchievements[0],
    )

    return highest?.rewards.title || "Platform Member"
  }, [getUnlockedAchievements])

  return {
    system,
    achievements,
    unlockAchievement,
    isAchievementUnlocked,
    getAchievementLevel,
    getUnlockedAchievements,
    getLockedAchievements,
    getAchievement,
    getAchievementsByCategory,
    checkAchievements,
    getCurrentCardVariant,
    getCurrentLaserPattern,
    getCurrentTitle,
  }
}
