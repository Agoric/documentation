"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

/* ---------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------ */
export type RealmRole = "admin" | "user" | "moderator" | "guest"
export type RealmAccess = "supreme" | "standard" | "limited" | "restricted"

interface RealmUser {
  id: string
  name: string
  email: string
  avatar?: string
  roles: RealmRole[]
  accessLevel: RealmAccess
  lastAccessed: Date
}

type RealmContextValue = {
  /** Current authenticated user */
  user: RealmUser | null
  /** Whether the realm is loading */
  loading: boolean
  /** Available realms for the user */
  availableRealms: string[]
  /** Current active realm */
  activeRealm: string | null
  /** Switch to a different realm */
  switchRealm: (realmId: string) => Promise<void>
  /** Check if user has specific role */
  hasRole: (role: RealmRole) => boolean
  /** Check if user has minimum access level */
  hasAccess: (level: RealmAccess) => boolean
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
  }>({
    user: null,
    loading: true,
    availableRealms: [],
    activeRealm: null,
  })

  useEffect(() => {
    async function initializeRealm() {
      console.log("🌟 Initializing Supreme Realm with indigo magic...")

      // Simulate realm authentication
      await new Promise((r) => setTimeout(r, 1200))

      const mockUser: RealmUser = {
        id: "realm-user-1",
        name: "Supreme Authority",
        email: "supreme@realm.authority",
        avatar: "/placeholder.svg?height=40&width=40",
        roles: ["admin", "moderator"],
        accessLevel: "supreme",
        lastAccessed: new Date(),
      }

      const availableRealms = ["supreme-authority", "admin-panel", "user-dashboard", "analytics-realm"]

      setState({
        user: mockUser,
        loading: false,
        availableRealms,
        activeRealm: "supreme-authority",
      })

      console.log("✨ Realm access granted with supreme privileges")
    }

    initializeRealm()
  }, [])

  const switchRealm = async (realmId: string) => {
    console.log(`🔄 Switching to realm: ${realmId}`)
    setState((prev) => ({ ...prev, loading: true }))

    // Simulate realm switching
    await new Promise((r) => setTimeout(r, 800))

    setState((prev) => ({
      ...prev,
      activeRealm: realmId,
      loading: false,
      user: prev.user ? { ...prev.user, lastAccessed: new Date() } : null,
    }))
  }

  const hasRole = (role: RealmRole): boolean => {
    return state.user?.roles.includes(role) ?? false
  }

  const hasAccess = (level: RealmAccess): boolean => {
    if (!state.user) return false

    const accessLevels: RealmAccess[] = ["restricted", "limited", "standard", "supreme"]
    const userLevelIndex = accessLevels.indexOf(state.user.accessLevel)
    const requiredLevelIndex = accessLevels.indexOf(level)

    return userLevelIndex >= requiredLevelIndex
  }

  const contextValue: RealmContextValue = {
    ...state,
    switchRealm,
    hasRole,
    hasAccess,
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
