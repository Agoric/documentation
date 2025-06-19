"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define types for badge progression system
export interface ProgressionRequirement {
  id: string
  name: string
  description: string
  type: "missions" | "experience" | "achievements" | "time" | "special"
  target: number
  current: number
  completed: boolean
  category: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary" | "mythic"
  points: number
  unlockedAt?: Date
  category: "combat" | "diplomacy" | "leadership" | "wisdom" | "service" | "special"
}

export interface Mission {
  id: string
  title: string
  description: string
  difficulty: "novice" | "intermediate" | "advanced" | "expert" | "master"
  experienceReward: number
  achievementRewards: string[]
  requirements: string[]
  timeLimit?: number // in hours
  status: "available" | "active" | "completed" | "failed" | "locked"
  startedAt?: Date
  completedAt?: Date
  ideology?: string
  tier?: string
}

export interface UserProgression {
  userId: string
  currentIdeology: string
  currentTier: "initiate" | "adept" | "master" | "grandmaster" | "supreme"
  totalExperience: number
  currentTierExperience: number
  nextTierExperience: number
  completedMissions: string[]
  unlockedAchievements: string[]
  activeMissions: string[]
  progressionHistory: {
    date: Date
    event: string
    description: string
    experienceGained: number
  }[]
  specialCommendations: string[]
  authorityRating: number
  globalRanking: number
}

export interface TierRequirements {
  tier: "initiate" | "adept" | "master" | "grandmaster" | "supreme"
  experienceRequired: number
  missionsRequired: number
  achievementsRequired: number
  specialRequirements: ProgressionRequirement[]
  timeInPreviousTier: number // in days
  authorityRatingRequired: number
}

interface BadgeProgressionContextType {
  userProgression: UserProgression
  tierRequirements: Record<string, TierRequirements>
  availableMissions: Mission[]
  achievements: Achievement[]

  // Progression Management
  gainExperience: (amount: number, source: string) => void
  completeMission: (missionId: string) => void
  unlockAchievement: (achievementId: string) => void
  checkTierAdvancement: () => boolean
  advanceToNextTier: () => void

  // Mission Management
  startMission: (missionId: string) => void
  abandonMission: (missionId: string) => void
  generateDailyMissions: () => void

  // Achievement System
  checkAchievementProgress: () => void
  getAchievementsByCategory: (category: string) => Achievement[]

  // Progress Tracking
  getProgressToNextTier: () => number
  getTierProgress: (tier: string) => ProgressionRequirement[]
  getGlobalLeaderboard: () => { userId: string; experience: number; tier: string }[]

  // Utility Functions
  calculateAuthorityRating: () => number
  getRecommendedMissions: () => Mission[]
  getProgressionInsights: () => {
    strengthAreas: string[]
    improvementAreas: string[]
    nextMilestones: string[]
  }
}

const BadgeProgressionContext = createContext<BadgeProgressionContextType | undefined>(undefined)

export const useBadgeProgression = () => {
  const context = useContext(BadgeProgressionContext)
  if (!context) {
    throw new Error("useBadgeProgression must be used within a BadgeProgressionProvider")
  }
  return context
}

// Sample data and configurations
const tierRequirementsConfig: Record<string, TierRequirements> = {
  initiate: {
    tier: "initiate",
    experienceRequired: 0,
    missionsRequired: 0,
    achievementsRequired: 0,
    specialRequirements: [],
    timeInPreviousTier: 0,
    authorityRatingRequired: 0,
  },
  adept: {
    tier: "adept",
    experienceRequired: 1000,
    missionsRequired: 5,
    achievementsRequired: 3,
    specialRequirements: [
      {
        id: "basic_training",
        name: "Basic Authority Training",
        description: "Complete fundamental authority training modules",
        type: "special",
        target: 1,
        current: 0,
        completed: false,
        category: "training",
      },
    ],
    timeInPreviousTier: 7,
    authorityRatingRequired: 6.0,
  },
  master: {
    tier: "master",
    experienceRequired: 5000,
    missionsRequired: 20,
    achievementsRequired: 10,
    specialRequirements: [
      {
        id: "leadership_demonstration",
        name: "Leadership Demonstration",
        description: "Successfully lead a team mission or diplomatic initiative",
        type: "special",
        target: 1,
        current: 0,
        completed: false,
        category: "leadership",
      },
      {
        id: "specialized_expertise",
        name: "Specialized Expertise",
        description: "Achieve expert level in chosen ideological specialization",
        type: "special",
        target: 1,
        current: 0,
        completed: false,
        category: "expertise",
      },
    ],
    timeInPreviousTier: 30,
    authorityRatingRequired: 7.5,
  },
  grandmaster: {
    tier: "grandmaster",
    experienceRequired: 15000,
    missionsRequired: 50,
    achievementsRequired: 25,
    specialRequirements: [
      {
        id: "strategic_command",
        name: "Strategic Command Authority",
        description: "Successfully command a major strategic operation",
        type: "special",
        target: 1,
        current: 0,
        completed: false,
        category: "command",
      },
      {
        id: "global_influence",
        name: "Global Influence Recognition",
        description: "Achieve recognition in international diplomatic circles",
        type: "special",
        target: 1,
        current: 0,
        completed: false,
        category: "diplomacy",
      },
      {
        id: "mentor_others",
        name: "Mentor Development",
        description: "Successfully mentor 3 junior authority members to advancement",
        type: "special",
        target: 3,
        current: 0,
        completed: false,
        category: "mentorship",
      },
    ],
    timeInPreviousTier: 90,
    authorityRatingRequired: 9.0,
  },
  supreme: {
    tier: "supreme",
    experienceRequired: 50000,
    missionsRequired: 100,
    achievementsRequired: 50,
    specialRequirements: [
      {
        id: "supreme_trial",
        name: "Supreme Authority Trial",
        description: "Pass the ultimate test of supreme authority worthiness",
        type: "special",
        target: 1,
        current: 0,
        completed: false,
        category: "trial",
      },
      {
        id: "universal_recognition",
        name: "Universal Recognition",
        description: "Achieve unanimous recognition from all ideological councils",
        type: "special",
        target: 10,
        current: 0,
        completed: false,
        category: "recognition",
      },
      {
        id: "legacy_creation",
        name: "Legacy Creation",
        description: "Establish a lasting contribution to Supreme Authority doctrine",
        type: "special",
        target: 1,
        current: 0,
        completed: false,
        category: "legacy",
      },
    ],
    timeInPreviousTier: 365,
    authorityRatingRequired: 9.8,
  },
}

const sampleAchievements: Achievement[] = [
  {
    id: "first_mission",
    name: "First Steps",
    description: "Complete your first authority mission",
    icon: "🎯",
    rarity: "common",
    points: 100,
    category: "service",
  },
  {
    id: "diplomatic_success",
    name: "Diplomatic Excellence",
    description: "Successfully resolve a complex diplomatic situation",
    icon: "🤝",
    rarity: "rare",
    points: 500,
    category: "diplomacy",
  },
  {
    id: "perfect_mission",
    name: "Flawless Execution",
    description: "Complete a mission with perfect performance rating",
    icon: "⭐",
    rarity: "epic",
    points: 1000,
    category: "service",
  },
  {
    id: "wisdom_seeker",
    name: "Seeker of Wisdom",
    description: "Unlock 10 knowledge-based achievements",
    icon: "📚",
    rarity: "rare",
    points: 750,
    category: "wisdom",
  },
  {
    id: "supreme_dedication",
    name: "Supreme Dedication",
    description: "Maintain perfect attendance for 100 consecutive days",
    icon: "🏆",
    rarity: "legendary",
    points: 2500,
    category: "service",
  },
]

const sampleMissions: Mission[] = [
  {
    id: "basic_patrol",
    title: "Realm Patrol Duty",
    description: "Conduct routine patrol of assigned digital territory",
    difficulty: "novice",
    experienceReward: 100,
    achievementRewards: ["first_mission"],
    requirements: ["Basic training completed"],
    status: "available",
  },
  {
    id: "diplomatic_negotiation",
    title: "Trade Agreement Negotiation",
    description: "Negotiate favorable trade terms with emerging digital nation",
    difficulty: "intermediate",
    experienceReward: 300,
    achievementRewards: ["diplomatic_success"],
    requirements: ["Adept tier or higher", "Diplomacy specialization"],
    status: "available",
    timeLimit: 72,
  },
  {
    id: "strategic_planning",
    title: "Global Strategy Development",
    description: "Develop comprehensive strategy for new market expansion",
    difficulty: "advanced",
    experienceReward: 750,
    achievementRewards: ["strategic_mind"],
    requirements: ["Master tier or higher", "Leadership experience"],
    status: "locked",
    timeLimit: 168,
  },
  {
    id: "crisis_management",
    title: "Emergency Crisis Response",
    description: "Lead response to critical diplomatic crisis situation",
    difficulty: "expert",
    experienceReward: 1500,
    achievementRewards: ["crisis_leader", "perfect_mission"],
    requirements: ["Grand Master tier", "Crisis training"],
    status: "locked",
    timeLimit: 24,
  },
]

export const BadgeProgressionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProgression, setUserProgression] = useState<UserProgression>({
    userId: "user_001",
    currentIdeology: "sovereign",
    currentTier: "adept",
    totalExperience: 1250,
    currentTierExperience: 250,
    nextTierExperience: 5000,
    completedMissions: ["basic_patrol"],
    unlockedAchievements: ["first_mission"],
    activeMissions: ["diplomatic_negotiation"],
    progressionHistory: [
      {
        date: new Date("2024-01-01"),
        event: "Mission Completed",
        description: "Successfully completed Realm Patrol Duty",
        experienceGained: 100,
      },
      {
        date: new Date("2024-01-15"),
        event: "Tier Advancement",
        description: "Advanced from Initiate to Adept tier",
        experienceGained: 0,
      },
    ],
    specialCommendations: [],
    authorityRating: 7.2,
    globalRanking: 1247,
  })

  const [availableMissions, setAvailableMissions] = useState<Mission[]>(sampleMissions)
  const [achievements] = useState<Achievement[]>(sampleAchievements)

  // Experience and progression functions
  const gainExperience = (amount: number, source: string) => {
    setUserProgression((prev) => {
      const newTotalExp = prev.totalExperience + amount
      const newCurrentTierExp = prev.currentTierExperience + amount

      return {
        ...prev,
        totalExperience: newTotalExp,
        currentTierExperience: newCurrentTierExp,
        progressionHistory: [
          ...prev.progressionHistory,
          {
            date: new Date(),
            event: "Experience Gained",
            description: `Gained ${amount} XP from ${source}`,
            experienceGained: amount,
          },
        ],
      }
    })
  }

  const completeMission = (missionId: string) => {
    const mission = availableMissions.find((m) => m.id === missionId)
    if (!mission) return

    // Update mission status
    setAvailableMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, status: "completed" as const, completedAt: new Date() } : m)),
    )

    // Update user progression
    setUserProgression((prev) => ({
      ...prev,
      completedMissions: [...prev.completedMissions, missionId],
      activeMissions: prev.activeMissions.filter((id) => id !== missionId),
    }))

    // Award experience
    gainExperience(mission.experienceReward, `Mission: ${mission.title}`)

    // Unlock achievements
    mission.achievementRewards.forEach((achievementId) => {
      unlockAchievement(achievementId)
    })
  }

  const unlockAchievement = (achievementId: string) => {
    const achievement = achievements.find((a) => a.id === achievementId)
    if (!achievement || userProgression.unlockedAchievements.includes(achievementId)) return

    setUserProgression((prev) => ({
      ...prev,
      unlockedAchievements: [...prev.unlockedAchievements, achievementId],
      progressionHistory: [
        ...prev.progressionHistory,
        {
          date: new Date(),
          event: "Achievement Unlocked",
          description: `Unlocked: ${achievement.name}`,
          experienceGained: achievement.points,
        },
      ],
    }))

    gainExperience(achievement.points, `Achievement: ${achievement.name}`)
  }

  const checkTierAdvancement = (): boolean => {
    const nextTierKey = getNextTierKey(userProgression.currentTier)
    if (!nextTierKey) return false

    const requirements = tierRequirementsConfig[nextTierKey]

    return (
      userProgression.totalExperience >= requirements.experienceRequired &&
      userProgression.completedMissions.length >= requirements.missionsRequired &&
      userProgression.unlockedAchievements.length >= requirements.achievementsRequired &&
      userProgression.authorityRating >= requirements.authorityRatingRequired
    )
  }

  const advanceToNextTier = () => {
    const nextTierKey = getNextTierKey(userProgression.currentTier)
    if (!nextTierKey || !checkTierAdvancement()) return

    setUserProgression((prev) => ({
      ...prev,
      currentTier: nextTierKey as any,
      currentTierExperience: 0,
      nextTierExperience: getNextTierExperience(nextTierKey),
      progressionHistory: [
        ...prev.progressionHistory,
        {
          date: new Date(),
          event: "Tier Advancement",
          description: `Advanced to ${nextTierKey} tier`,
          experienceGained: 0,
        },
      ],
    }))
  }

  const startMission = (missionId: string) => {
    setAvailableMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, status: "active" as const, startedAt: new Date() } : m)),
    )

    setUserProgression((prev) => ({
      ...prev,
      activeMissions: [...prev.activeMissions, missionId],
    }))
  }

  const abandonMission = (missionId: string) => {
    setAvailableMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, status: "available" as const, startedAt: undefined } : m)),
    )

    setUserProgression((prev) => ({
      ...prev,
      activeMissions: prev.activeMissions.filter((id) => id !== missionId),
    }))
  }

  const generateDailyMissions = () => {
    // Implementation for generating daily missions
    console.log("Generating daily missions...")
  }

  const checkAchievementProgress = () => {
    // Check for automatic achievement unlocks based on current progress
    achievements.forEach((achievement) => {
      if (!userProgression.unlockedAchievements.includes(achievement.id)) {
        // Check achievement conditions
        let shouldUnlock = false

        switch (achievement.id) {
          case "first_mission":
            shouldUnlock = userProgression.completedMissions.length >= 1
            break
          case "diplomatic_success":
            shouldUnlock = userProgression.completedMissions.some((id) =>
              availableMissions.find((m) => m.id === id)?.title.includes("Diplomatic"),
            )
            break
          // Add more achievement checks as needed
        }

        if (shouldUnlock) {
          unlockAchievement(achievement.id)
        }
      }
    })
  }

  const getAchievementsByCategory = (category: string) => {
    return achievements.filter((a) => a.category === category)
  }

  const getProgressToNextTier = (): number => {
    const nextTierKey = getNextTierKey(userProgression.currentTier)
    if (!nextTierKey) return 100

    const requirements = tierRequirementsConfig[nextTierKey]
    return (userProgression.totalExperience / requirements.experienceRequired) * 100
  }

  const getTierProgress = (tier: string): ProgressionRequirement[] => {
    const requirements = tierRequirementsConfig[tier]
    if (!requirements) return []

    return [
      {
        id: "experience",
        name: "Experience Points",
        description: `Gain ${requirements.experienceRequired} total experience`,
        type: "experience",
        target: requirements.experienceRequired,
        current: userProgression.totalExperience,
        completed: userProgression.totalExperience >= requirements.experienceRequired,
        category: "progression",
      },
      {
        id: "missions",
        name: "Completed Missions",
        description: `Complete ${requirements.missionsRequired} missions`,
        type: "missions",
        target: requirements.missionsRequired,
        current: userProgression.completedMissions.length,
        completed: userProgression.completedMissions.length >= requirements.missionsRequired,
        category: "progression",
      },
      {
        id: "achievements",
        name: "Unlocked Achievements",
        description: `Unlock ${requirements.achievementsRequired} achievements`,
        type: "achievements",
        target: requirements.achievementsRequired,
        current: userProgression.unlockedAchievements.length,
        completed: userProgression.unlockedAchievements.length >= requirements.achievementsRequired,
        category: "progression",
      },
      ...requirements.specialRequirements,
    ]
  }

  const getGlobalLeaderboard = () => {
    // Mock leaderboard data
    return [
      { userId: "user_001", experience: userProgression.totalExperience, tier: userProgression.currentTier },
      { userId: "user_002", experience: 15000, tier: "grandmaster" },
      { userId: "user_003", experience: 12000, tier: "master" },
    ]
  }

  const calculateAuthorityRating = (): number => {
    // Complex calculation based on various factors
    const baseRating = 5.0
    const experienceBonus = Math.min(userProgression.totalExperience / 10000, 2.0)
    const achievementBonus = userProgression.unlockedAchievements.length * 0.1
    const missionBonus = userProgression.completedMissions.length * 0.05

    return Math.min(baseRating + experienceBonus + achievementBonus + missionBonus, 10.0)
  }

  const getRecommendedMissions = (): Mission[] => {
    return availableMissions.filter((m) => m.status === "available" && m.difficulty === "intermediate").slice(0, 3)
  }

  const getProgressionInsights = () => {
    return {
      strengthAreas: ["Diplomatic Relations", "Strategic Planning"],
      improvementAreas: ["Combat Operations", "Technical Expertise"],
      nextMilestones: ["Complete 5 more missions", "Unlock 2 more achievements", "Increase authority rating"],
    }
  }

  // Helper functions
  const getNextTierKey = (currentTier: string): string | null => {
    const tiers = ["initiate", "adept", "master", "grandmaster", "supreme"]
    const currentIndex = tiers.indexOf(currentTier)
    return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null
  }

  const getNextTierExperience = (tier: string): number => {
    return tierRequirementsConfig[tier]?.experienceRequired || 0
  }

  // Auto-check achievements on progression changes
  useEffect(() => {
    checkAchievementProgress()
  }, [userProgression.completedMissions, userProgression.totalExperience])

  return (
    <BadgeProgressionContext.Provider
      value={{
        userProgression,
        tierRequirements: tierRequirementsConfig,
        availableMissions,
        achievements,
        gainExperience,
        completeMission,
        unlockAchievement,
        checkTierAdvancement,
        advanceToNextTier,
        startMission,
        abandonMission,
        generateDailyMissions,
        checkAchievementProgress,
        getAchievementsByCategory,
        getProgressToNextTier,
        getTierProgress,
        getGlobalLeaderboard,
        calculateAuthorityRating,
        getRecommendedMissions,
        getProgressionInsights,
      }}
    >
      {children}
    </BadgeProgressionContext.Provider>
  )
}
