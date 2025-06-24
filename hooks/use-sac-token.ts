"use client"

import { useState, useEffect } from "react"
import { sacTokenSystem, type SACTokenMetrics, type QGIUtility } from "@/lib/supreme-authority-coin/sac-token-system"

export function useSACToken() {
  const [tokenMetrics, setTokenMetrics] = useState<SACTokenMetrics>()
  const [utilities, setUtilities] = useState<QGIUtility[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const updateData = () => {
        const metrics = sacTokenSystem.updateTokenMetrics()
        const utilityData = sacTokenSystem.getUtilityPerformance()

        setTokenMetrics(metrics)
        setUtilities(utilityData)
        setIsLoading(false)
        setError(null)
      }

      updateData()
      const interval = setInterval(updateData, 30000) // Update every 30 seconds

      return () => clearInterval(interval)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setIsLoading(false)
    }
  }, [])

  const distributeTokens = (userPerformanceScore: number) => {
    return sacTokenSystem.distributeTokens(userPerformanceScore)
  }

  const updateUtilityMetrics = (utilityId: string, metrics: Partial<QGIUtility["performanceMetrics"]>) => {
    sacTokenSystem.updateUtilityMetrics(utilityId, metrics)
    // Trigger re-render
    const updatedMetrics = sacTokenSystem.updateTokenMetrics()
    const updatedUtilities = sacTokenSystem.getUtilityPerformance()
    setTokenMetrics(updatedMetrics)
    setUtilities(updatedUtilities)
  }

  return {
    tokenMetrics,
    utilities,
    isLoading,
    error,
    distributeTokens,
    updateUtilityMetrics,
  }
}
