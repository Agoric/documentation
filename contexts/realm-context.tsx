"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"

/* ---------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------ */
export type RealmRole = "admin" | "user" | "moderator" | "guest" | "superuser" | "analyst"
export type RealmAccess = "supreme" | "premium" | "standard" | "limited" | "restricted"
export type RealmStatus = "active" | "maintenance" | "locked" | "beta" | "deprecated"

interface RealmUser {
  id: string
  name: string
  email: string
  avatar?: string
  roles: RealmRole[]
  accessLevel: RealmAccess
  permissions: string[]
  preferences: Record<string, any>
  lastAccessed: Date
  sessionId: string
  twoFactorEnabled: boolean
}

interface RealmMetrics {
  totalUsers: number
  activeRealms: number
  systemLoad: number
  uptime: number
  lastUpdate: Date
}

interface RealmNotification {
  id: string
  type: "info" | "warning" | "error" | "success"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actions?: Array<{ label: string; action: () => void }>
}

type RealmContextValue = {
  // User & Auth
  user: RealmUser | null
  loading: boolean

  // Realms
  availableRealms: string[]
  activeRealm: string | null
  realmHistory: string[]

  // System
  metrics: RealmMetrics
  notifications: RealmNotification[]
  systemStatus: "operational" | "degraded" | "maintenance" | "offline"

  // Actions
  switchRealm: (realmId: string) => Promise<void>
  hasRole: (role: RealmRole) => boolean
  hasAccess: (level: RealmAccess) => boolean
  hasPermission: (permission: string) => boolean
  updatePreferences: (preferences: Record<string, any>) => Promise<void>
  markNotificationRead: (id: string) => void
  clearNotifications: () => void

  // Advanced Features
  exportUserData: () => Promise<Blob>
  enableTwoFactor: () => Promise<void>
  generateApiKey: () => Promise<string>
  auditLog: Array<{ action: string; timestamp: Date; details: any }>
}

/* ---------------------------------------------------------------------------
 * Context + Provider
 * ------------------------------------------------------------------------ */
const RealmContext = createContext<RealmContextValue | undefined>(undefined)

export function RealmProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{
    user: RealmUser | null
    loading: boolean
    availableRealms: string[]
    activeRealm: string | null
    realmHistory: string[]
    metrics: RealmMetrics
    notifications: RealmNotification[]
    systemStatus: "operational" | "degraded" | "maintenance" | "offline"
    auditLog: Array<{ action: string; timestamp: Date; details: any }>
  }>({
    user: null,
    loading: true,
    availableRealms: [],
    activeRealm: null,
    realmHistory: [],
    metrics: {
      totalUsers: 0,
      activeRealms: 0,
      systemLoad: 0,
      uptime: 0,
      lastUpdate: new Date(),
    },
    notifications: [],
    systemStatus: "operational",
    auditLog: [],
  })

  const addAuditLog = useCallback((action: string, details: any = {}) => {
    setState((prev) => ({
      ...prev,
      auditLog: [
        { action, timestamp: new Date(), details },
        ...prev.auditLog.slice(0, 99), // Keep last 100 entries
      ],
    }))
  }, [])

  useEffect(() => {
    async function initializeExcellentRealm() {
      console.log("🚀 Initializing Excellence-Configured Realm...")

      // Simulate advanced initialization
      await new Promise((r) => setTimeout(r, 1500))

      const excellentUser: RealmUser = {
        id: "excellence-user-1",
        name: "Supreme Excellence Authority",
        email: "excellence@supreme.realm",
        avatar: "/placeholder.svg?height=40&width=40",
        roles: ["admin", "superuser", "analyst"],
        accessLevel: "supreme",
        permissions: [
          "realm:manage",
          "users:admin",
          "system:configure",
          "analytics:view",
          "security:manage",
          "api:generate",
          "data:export",
          "notifications:manage",
        ],
        preferences: {
          theme: "excellence",
          notifications: true,
          analytics: true,
          autoSave: true,
          advancedMode: true,
        },
        lastAccessed: new Date(),
        sessionId: `session-${Date.now()}`,
        twoFactorEnabled: true,
      }

      const excellentMetrics: RealmMetrics = {
        totalUsers: 1247,
        activeRealms: 8,
        systemLoad: 23.5,
        uptime: 99.97,
        lastUpdate: new Date(),
      }

      const welcomeNotifications: RealmNotification[] = [
        {
          id: "welcome-1",
          type: "success",
          title: "Excellence Configuration Active",
          message: "All premium features have been enabled with optimal performance settings.",
          timestamp: new Date(),
          read: false,
        },
        {
          id: "security-1",
          type: "info",
          title: "Security Enhanced",
          message: "Two-factor authentication is active. Advanced security protocols enabled.",
          timestamp: new Date(Date.now() - 300000),
          read: false,
        },
        {
          id: "performance-1",
          type: "success",
          title: "Performance Optimized",
          message: "System running at peak efficiency with 99.97% uptime.",
          timestamp: new Date(Date.now() - 600000),
          read: false,
        },
      ]

      setState({
        user: excellentUser,
        loading: false,
        availableRealms: [
          "supreme-authority",
          "excellence-dashboard",
          "premium-analytics",
          "advanced-admin",
          "security-center",
          "performance-monitor",
          "api-management",
          "data-intelligence",
        ],
        activeRealm: "excellence-dashboard",
        realmHistory: ["excellence-dashboard"],
        metrics: excellentMetrics,
        notifications: welcomeNotifications,
        systemStatus: "operational",
        auditLog: [{ action: "realm:initialized", timestamp: new Date(), details: { version: "excellence-v1.0" } }],
      })

      addAuditLog("user:login", { userId: excellentUser.id, accessLevel: excellentUser.accessLevel })
      console.log("✨ Excellence Realm initialized with premium features")
    }

    initializeExcellentRealm()
  }, [addAuditLog])

  const switchRealm = useCallback(
    async (realmId: string) => {
      console.log(`🔄 Switching to excellence realm: ${realmId}`)
      setState((prev) => ({ ...prev, loading: true }))

      await new Promise((r) => setTimeout(r, 800))

      setState((prev) => ({
        ...prev,
        activeRealm: realmId,
        loading: false,
        realmHistory: [realmId, ...prev.realmHistory.filter((r) => r !== realmId).slice(0, 9)],
        user: prev.user ? { ...prev.user, lastAccessed: new Date() } : null,
      }))

      addAuditLog("realm:switch", { from: state.activeRealm, to: realmId })
    },
    [addAuditLog, state.activeRealm],
  )

  const hasRole = useCallback(
    (role: RealmRole): boolean => {
      return state.user?.roles.includes(role) ?? false
    },
    [state.user],
  )

  const hasAccess = useCallback(
    (level: RealmAccess): boolean => {
      if (!state.user) return false
      const accessLevels: RealmAccess[] = ["restricted", "limited", "standard", "premium", "supreme"]
      const userLevelIndex = accessLevels.indexOf(state.user.accessLevel)
      const requiredLevelIndex = accessLevels.indexOf(level)
      return userLevelIndex >= requiredLevelIndex
    },
    [state.user],
  )

  const hasPermission = useCallback(
    (permission: string): boolean => {
      return state.user?.permissions.includes(permission) ?? false
    },
    [state.user],
  )

  const updatePreferences = useCallback(
    async (preferences: Record<string, any>) => {
      if (!state.user) return

      setState((prev) => ({
        ...prev,
        user: prev.user ? { ...prev.user, preferences: { ...prev.user.preferences, ...preferences } } : null,
      }))

      addAuditLog("preferences:update", { preferences })
    },
    [state.user, addAuditLog],
  )

  const markNotificationRead = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }))
  }, [])

  const clearNotifications = useCallback(() => {
    setState((prev) => ({ ...prev, notifications: [] }))
    addAuditLog("notifications:clear")
  }, [addAuditLog])

  const exportUserData = useCallback(async (): Promise<Blob> => {
    const data = {
      user: state.user,
      preferences: state.user?.preferences,
      realmHistory: state.realmHistory,
      auditLog: state.auditLog,
      exportedAt: new Date().toISOString(),
    }

    addAuditLog("data:export", { size: JSON.stringify(data).length })
    return new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
  }, [state, addAuditLog])

  const enableTwoFactor = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 1000))
    setState((prev) => ({
      ...prev,
      user: prev.user ? { ...prev.user, twoFactorEnabled: true } : null,
    }))
    addAuditLog("security:2fa_enabled")
  }, [addAuditLog])

  const generateApiKey = useCallback(async (): Promise<string> => {
    await new Promise((r) => setTimeout(r, 500))
    const apiKey = `exc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    addAuditLog("api:key_generated", { keyPrefix: apiKey.substr(0, 10) })
    return apiKey
  }, [addAuditLog])

  const contextValue: RealmContextValue = {
    ...state,
    switchRealm,
    hasRole,
    hasAccess,
    hasPermission,
    updatePreferences,
    markNotificationRead,
    clearNotifications,
    exportUserData,
    enableTwoFactor,
    generateApiKey,
  }

  return <RealmContext.Provider value={contextValue}>{children}</RealmContext.Provider>
}

/* ---------------------------------------------------------------------------
 * Hook
 * ------------------------------------------------------------------------ */
export function useRealm() {
  const ctx = useContext(RealmContext)
  if (!ctx) {
    throw new Error("useRealm must be used within a RealmProvider")
  }
  return ctx
}
