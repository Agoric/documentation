"use client"

import { useState, useEffect, useCallback } from "react"

export interface EnvironmentNotification {
  id: string
  environmentPath: string
  title: string
  message: string
  type: "info" | "warning" | "error" | "success" | "update"
  priority: "low" | "medium" | "high" | "critical"
  timestamp: number
  read: boolean
  actionUrl?: string
  actionLabel?: string
  expiresAt?: number
}

const NOTIFICATIONS_STORAGE_KEY = "snapifi-environment-notifications"

export const useEnvironmentNotifications = () => {
  const [notifications, setNotifications] = useState<EnvironmentNotification[]>([])

  // Load notifications from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Filter out expired notifications
        const now = Date.now()
        const validNotifications = parsed.filter((n: EnvironmentNotification) => !n.expiresAt || n.expiresAt > now)
        setNotifications(validNotifications)
      }
    } catch (error) {
      console.error("Failed to load notifications:", error)
    }

    // Initialize with some sample notifications
    const sampleNotifications: EnvironmentNotification[] = [
      {
        id: "1",
        environmentPath: "/dashboard/ecommerex/holographic-products",
        title: "New Products Available",
        message: "5 new holographic products have been added to the marketplace",
        type: "info",
        priority: "medium",
        timestamp: Date.now() - 3600000, // 1 hour ago
        read: false,
      },
      {
        id: "2",
        environmentPath: "/legal/compliance",
        title: "Compliance Update Required",
        message: "New regulatory requirements need your attention",
        type: "warning",
        priority: "high",
        timestamp: Date.now() - 7200000, // 2 hours ago
        read: false,
        actionUrl: "/legal/compliance",
        actionLabel: "Review Now",
      },
      {
        id: "3",
        environmentPath: "/admin/system",
        title: "System Maintenance Scheduled",
        message: "Scheduled maintenance window: Tonight 2:00 AM - 4:00 AM EST",
        type: "info",
        priority: "medium",
        timestamp: Date.now() - 1800000, // 30 minutes ago
        read: false,
      },
    ]

    setNotifications((prev) => {
      if (prev.length === 0) {
        return sampleNotifications
      }
      return prev
    })
  }, [])

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications))
    } catch (error) {
      console.error("Failed to save notifications:", error)
    }
  }, [notifications])

  const getNotificationsForEnvironment = useCallback(
    (environmentPath: string) => {
      return notifications.filter((n) => n.environmentPath === environmentPath && !n.read)
    },
    [notifications],
  )

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
  }, [])

  const markAllAsRead = useCallback((environmentPath?: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        environmentPath ? (n.environmentPath === environmentPath ? { ...n, read: true } : n) : { ...n, read: true },
      ),
    )
  }, [])

  const addNotification = useCallback((notification: Omit<EnvironmentNotification, "id" | "timestamp">) => {
    const newNotification: EnvironmentNotification = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    }
    setNotifications((prev) => [newNotification, ...prev])
  }, [])

  const removeNotification = useCallback((notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
  }, [])

  const getUnreadCount = useCallback(
    (environmentPath?: string) => {
      return notifications.filter((n) => !n.read && (!environmentPath || n.environmentPath === environmentPath)).length
    },
    [notifications],
  )

  return {
    notifications,
    getNotificationsForEnvironment,
    markAsRead,
    markAllAsRead,
    addNotification,
    removeNotification,
    getUnreadCount,
  }
}
