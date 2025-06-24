export interface Goal {
  id: string
  userId: string
  title: string
  description: string
  current: number
  target: number
  progress: number // 0-100
  timeframe: string
  nextStep: string
  category: "savings" | "credit" | "investment" | "debt" | "income" | "custom"
  priority: "low" | "medium" | "high"
  createdAt: number
  updatedAt: number
  completedAt?: number
  isCompleted: boolean
}

export interface Achievement {
  id: string
  userId: string
  title: string
  description: string
  icon: string
  category: "goal" | "milestone" | "streak" | "special"
  unlockedAt: number
  progress: number // 0-100 for progressive achievements
  isUnlocked: boolean
  requirements: {
    type: "goal_completion" | "balance_reached" | "streak_maintained" | "feature_used"
    value: number
    goalId?: string
  }
}

class GoalsDatabase {
  private goals: Map<string, Goal> = new Map()
  private achievements: Map<string, Achievement> = new Map()
  private userProgress: Map<string, { totalProgress: number; completedGoals: number }> = new Map()

  constructor() {
    this.initializeData()
  }

  private initializeData(): void {
    // Initialize with sample data
    const sampleGoals: Goal[] = [
      {
        id: "goal_1",
        userId: "supreme_citizen_001",
        title: "Credit Score Improvement",
        description: "Improve credit score to excellent range",
        current: 800,
        target: 800,
        progress: 100,
        timeframe: "Achieved",
        nextStep: "Maintain excellent credit",
        category: "credit",
        priority: "high",
        createdAt: Date.now() - 86400000 * 30,
        updatedAt: Date.now(),
        completedAt: Date.now() - 86400000 * 5,
        isCompleted: true,
      },
      {
        id: "goal_2",
        userId: "supreme_citizen_001",
        title: "Emergency Fund",
        description: "Build emergency fund for 6 months expenses",
        current: 25000,
        target: 25000,
        progress: 100,
        timeframe: "Achieved",
        nextStep: "Consider investment opportunities",
        category: "savings",
        priority: "high",
        createdAt: Date.now() - 86400000 * 60,
        updatedAt: Date.now(),
        completedAt: Date.now() - 86400000 * 10,
        isCompleted: true,
      },
      {
        id: "goal_3",
        userId: "supreme_citizen_001",
        title: "Investment Portfolio",
        description: "Build diversified investment portfolio",
        current: 150000,
        target: 150000,
        progress: 100,
        timeframe: "Achieved",
        nextStep: "Explore premium investments",
        category: "investment",
        priority: "medium",
        createdAt: Date.now() - 86400000 * 90,
        updatedAt: Date.now(),
        completedAt: Date.now() - 86400000 * 2,
        isCompleted: true,
      },
      {
        id: "goal_4",
        userId: "supreme_citizen_001",
        title: "Retirement Savings",
        description: "Maximize retirement contributions",
        current: 45000,
        target: 100000,
        progress: 45,
        timeframe: "24 months",
        nextStep: "Increase monthly contributions by $1000",
        category: "investment",
        priority: "medium",
        createdAt: Date.now() - 86400000 * 15,
        updatedAt: Date.now() - 86400000 * 2,
        isCompleted: false,
      },
    ]

    const sampleAchievements: Achievement[] = [
      {
        id: "achievement_1",
        userId: "supreme_citizen_001",
        title: "Credit Master",
        description: "Achieved excellent credit score (800+)",
        icon: "🏆",
        category: "milestone",
        unlockedAt: Date.now() - 86400000 * 5,
        progress: 100,
        isUnlocked: true,
        requirements: {
          type: "goal_completion",
          value: 1,
          goalId: "goal_1",
        },
      },
      {
        id: "achievement_2",
        userId: "supreme_citizen_001",
        title: "Emergency Ready",
        description: "Built complete emergency fund",
        icon: "🛡️",
        category: "goal",
        unlockedAt: Date.now() - 86400000 * 10,
        progress: 100,
        isUnlocked: true,
        requirements: {
          type: "goal_completion",
          value: 1,
          goalId: "goal_2",
        },
      },
      {
        id: "achievement_3",
        userId: "supreme_citizen_001",
        title: "Investment Pro",
        description: "Reached investment portfolio target",
        icon: "📈",
        category: "milestone",
        unlockedAt: Date.now() - 86400000 * 2,
        progress: 100,
        isUnlocked: true,
        requirements: {
          type: "goal_completion",
          value: 1,
          goalId: "goal_3",
        },
      },
      {
        id: "achievement_4",
        userId: "supreme_citizen_001",
        title: "Goal Crusher",
        description: "Completed 3 financial goals",
        icon: "💪",
        category: "special",
        unlockedAt: Date.now() - 86400000 * 2,
        progress: 100,
        isUnlocked: true,
        requirements: {
          type: "goal_completion",
          value: 3,
        },
      },
      {
        id: "achievement_5",
        userId: "supreme_citizen_001",
        title: "Millionaire Status",
        description: "Reached $1M+ net worth",
        icon: "💎",
        category: "milestone",
        unlockedAt: Date.now() - 86400000 * 1,
        progress: 100,
        isUnlocked: true,
        requirements: {
          type: "balance_reached",
          value: 1000000,
        },
      },
      {
        id: "achievement_6",
        userId: "supreme_citizen_001",
        title: "Platform Master",
        description: "Used all platform features",
        icon: "🚀",
        category: "special",
        unlockedAt: Date.now(),
        progress: 100,
        isUnlocked: true,
        requirements: {
          type: "feature_used",
          value: 25,
        },
      },
    ]

    sampleGoals.forEach((goal) => this.goals.set(goal.id, goal))
    sampleAchievements.forEach((achievement) => this.achievements.set(achievement.id, achievement))

    // Calculate user progress
    this.updateUserProgress("supreme_citizen_001")
  }

  async getUserGoals(userId: string): Promise<Goal[]> {
    return Array.from(this.goals.values()).filter((goal) => goal.userId === userId)
  }

  async createGoal(goal: Omit<Goal, "id" | "createdAt" | "updatedAt" | "progress" | "isCompleted">): Promise<Goal> {
    const id = `goal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const progress = goal.target > 0 ? Math.min((goal.current / goal.target) * 100, 100) : 0

    const newGoal: Goal = {
      ...goal,
      id,
      progress,
      isCompleted: progress >= 100,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      completedAt: progress >= 100 ? Date.now() : undefined,
    }

    this.goals.set(id, newGoal)
    await this.updateUserProgress(goal.userId)
    await this.checkAchievements(goal.userId)

    return newGoal
  }

  async updateGoal(id: string, updates: Partial<Goal>): Promise<Goal | null> {
    const goal = this.goals.get(id)
    if (!goal) return null

    const progress =
      updates.target && updates.target > 0
        ? Math.min(((updates.current ?? goal.current) / updates.target) * 100, 100)
        : goal.progress

    const wasCompleted = goal.isCompleted
    const isNowCompleted = progress >= 100

    const updatedGoal: Goal = {
      ...goal,
      ...updates,
      progress,
      isCompleted: isNowCompleted,
      updatedAt: Date.now(),
      completedAt: !wasCompleted && isNowCompleted ? Date.now() : goal.completedAt,
    }

    this.goals.set(id, updatedGoal)
    await this.updateUserProgress(goal.userId)

    if (!wasCompleted && isNowCompleted) {
      await this.checkAchievements(goal.userId)
    }

    return updatedGoal
  }

  async deleteGoal(id: string): Promise<boolean> {
    const goal = this.goals.get(id)
    if (!goal) return false

    this.goals.delete(id)
    await this.updateUserProgress(goal.userId)
    return true
  }

  async getUserAchievements(userId: string): Promise<Achievement[]> {
    return Array.from(this.achievements.values()).filter((achievement) => achievement.userId === userId)
  }

  async getUserProgress(userId: string): Promise<{ totalProgress: number; completedGoals: number }> {
    return this.userProgress.get(userId) || { totalProgress: 0, completedGoals: 0 }
  }

  private async updateUserProgress(userId: string): Promise<void> {
    const userGoals = await this.getUserGoals(userId)
    const completedGoals = userGoals.filter((goal) => goal.isCompleted).length
    const totalProgress =
      userGoals.length > 0 ? userGoals.reduce((sum, goal) => sum + goal.progress, 0) / userGoals.length : 0

    this.userProgress.set(userId, { totalProgress, completedGoals })
  }

  private async checkAchievements(userId: string): Promise<void> {
    const userGoals = await this.getUserGoals(userId)
    const completedGoals = userGoals.filter((goal) => goal.isCompleted)
    const userAchievements = await this.getUserAchievements(userId)

    // Check for new achievements
    const potentialAchievements = [
      {
        id: `achievement_goal_${completedGoals.length}`,
        title: `Goal Achiever ${completedGoals.length}`,
        description: `Completed ${completedGoals.length} financial goals`,
        icon: completedGoals.length >= 5 ? "🏆" : "🎯",
        category: "goal" as const,
        requirements: {
          type: "goal_completion" as const,
          value: completedGoals.length,
        },
      },
    ]

    for (const potential of potentialAchievements) {
      const exists = userAchievements.find((a) => a.id === potential.id)
      if (!exists && completedGoals.length >= potential.requirements.value) {
        const newAchievement: Achievement = {
          ...potential,
          userId,
          unlockedAt: Date.now(),
          progress: 100,
          isUnlocked: true,
        }
        this.achievements.set(potential.id, newAchievement)
      }
    }
  }
}

export const goalsDatabase = new GoalsDatabase()
