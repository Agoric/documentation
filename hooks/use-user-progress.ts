"use client"

import { useEffect, useState, useCallback } from "react"

export interface Goal {
  id: string
  userId: string
  title: string
  description: string
  current: number
  target: number
  progress: number // 0‒100
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
  progress: number
  isUnlocked: boolean
}

export interface UserProgressState {
  progress: number
  goals: Goal[]
  achievements: Achievement[]
  loading: boolean
  error: string | null
}

/**
 * Enhanced hook that fetches real data from backend APIs
 * and provides CRUD operations for goals
 */
export function useUserProgress(): UserProgressState & {
  createGoal: (goal: Partial<Goal>) => Promise<void>
  updateGoal: (id: string, updates: Partial<Goal>) => Promise<void>
  deleteGoal: (id: string) => Promise<void>
  refreshData: () => Promise<void>
} {
  const [state, setState] = useState<UserProgressState>({
    progress: 0,
    goals: [],
    achievements: [],
    loading: true,
    error: null,
  })

  const userId = "supreme_citizen_001" // This would come from auth context

  const fetchData = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      // Fetch goals and progress
      const goalsResponse = await fetch(`/api/goals?userId=${userId}`)
      if (!goalsResponse.ok) throw new Error("Failed to fetch goals")
      const { goals, progress: progressData } = await goalsResponse.json()

      // Fetch achievements
      const achievementsResponse = await fetch(`/api/achievements?userId=${userId}`)
      if (!achievementsResponse.ok) throw new Error("Failed to fetch achievements")
      const { achievements } = await achievementsResponse.json()

      setState({
        progress: progressData.totalProgress,
        goals,
        achievements,
        loading: false,
        error: null,
      })
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }))
    }
  }, [userId])

  const createGoal = useCallback(
    async (goalData: Partial<Goal>) => {
      try {
        const response = await fetch("/api/goals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...goalData, userId }),
        })

        if (!response.ok) throw new Error("Failed to create goal")

        await fetchData() // Refresh data
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : "Failed to create goal",
        }))
      }
    },
    [userId, fetchData],
  )

  const updateGoal = useCallback(
    async (id: string, updates: Partial<Goal>) => {
      try {
        const response = await fetch("/api/goals", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, ...updates }),
        })

        if (!response.ok) throw new Error("Failed to update goal")

        await fetchData() // Refresh data
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : "Failed to update goal",
        }))
      }
    },
    [fetchData],
  )

  const deleteGoal = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`/api/goals?id=${id}`, {
          method: "DELETE",
        })

        if (!response.ok) throw new Error("Failed to delete goal")

        await fetchData() // Refresh data
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : "Failed to delete goal",
        }))
      }
    },
    [fetchData],
  )

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    ...state,
    createGoal,
    updateGoal,
    deleteGoal,
    refreshData: fetchData,
  }
}
