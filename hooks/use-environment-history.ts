"use client"

import { useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"

export interface EnvironmentHistoryItem {
  path: string
  name: string
  icon: string
  timestamp: number
  category: string
  visitCount: number
}

const HISTORY_STORAGE_KEY = "snapifi-environment-history"
const MAX_HISTORY_ITEMS = 20

export const useEnvironmentHistory = () => {
  const [history, setHistory] = useState<EnvironmentHistoryItem[]>([])
  const pathname = usePathname()

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setHistory(parsed)
      }
    } catch (error) {
      console.error("Failed to load environment history:", error)
    }
  }, [])

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history))
    } catch (error) {
      console.error("Failed to save environment history:", error)
    }
  }, [history])

  // Track current page visit
  const trackVisit = useCallback(
    (environmentInfo: { name: string; icon: string; category: string }) => {
      setHistory((prev) => {
        const existingIndex = prev.findIndex((item) => item.path === pathname)
        const now = Date.now()

        if (existingIndex >= 0) {
          // Update existing entry
          const updated = [...prev]
          updated[existingIndex] = {
            ...updated[existingIndex],
            timestamp: now,
            visitCount: updated[existingIndex].visitCount + 1,
          }
          // Move to front
          const [item] = updated.splice(existingIndex, 1)
          return [item, ...updated]
        } else {
          // Add new entry
          const newItem: EnvironmentHistoryItem = {
            path: pathname,
            name: environmentInfo.name,
            icon: environmentInfo.icon,
            category: environmentInfo.category,
            timestamp: now,
            visitCount: 1,
          }
          const newHistory = [newItem, ...prev].slice(0, MAX_HISTORY_ITEMS)
          return newHistory
        }
      })
    },
    [pathname],
  )

  const getRecentEnvironments = useCallback(
    (limit = 5) => {
      return history.slice(0, limit)
    },
    [history],
  )

  const getFrequentEnvironments = useCallback(
    (limit = 5) => {
      return [...history].sort((a, b) => b.visitCount - a.visitCount).slice(0, limit)
    },
    [history],
  )

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  return {
    history,
    trackVisit,
    getRecentEnvironments,
    getFrequentEnvironments,
    clearHistory,
  }
}
