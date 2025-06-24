"use client"

import { useEffect, useState } from "react"

export interface Goal {
  id: string
  title: string
  current: number
  target: number
  progress: number // 0‒100
  timeframe: string
  nextStep: string
}

export interface UserProgressState {
  progress: number
  goals: Goal[]
  achievements: string[]
}

/**
 * Very small client-side hook that returns static demo data.
 * Replace the mock fetch with a real request once you have an API.
 */
export function useUserProgress(): UserProgressState {
  const [state, setState] = useState<UserProgressState>({
    progress: 0,
    goals: [],
    achievements: [],
  })

  useEffect(() => {
    // Simulated async fetch
    const timer = setTimeout(() => {
      const mockGoals: Goal[] = [
        {
          id: "credit",
          title: "Credit Score Improvement",
          current: 800,
          target: 800,
          progress: 100,
          timeframe: "Achieved",
          nextStep: "Maintain excellent credit",
        },
        {
          id: "savings",
          title: "Emergency Fund",
          current: 25000,
          target: 25000,
          progress: 100,
          timeframe: "Achieved",
          nextStep: "Consider investment opportunities",
        },
        {
          id: "investment",
          title: "Investment Portfolio",
          current: 150000,
          target: 150000,
          progress: 100,
          timeframe: "Achieved",
          nextStep: "Explore premium investments",
        },
      ]

      setState({
        progress: 100,
        goals: mockGoals,
        achievements: ["All goals achieved", "Premium level reached", "All features unlocked"],
      })
    }, 400) // 0.4 s artificial delay

    return () => clearTimeout(timer)
  }, [])

  return state
}
