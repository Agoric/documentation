"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

/* ---------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------ */
type AdminAccessContextValue = {
  /** Whether the current user is an admin. */
  isAdmin: boolean
  /** While the provider is fetching / computing permissions. */
  loading: boolean
}

/* ---------------------------------------------------------------------------
 * Context + Provider
 * ------------------------------------------------------------------------ */
const AdminAccessContext = createContext<AdminAccessContextValue | undefined>(undefined)

export function AdminAccessProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AdminAccessContextValue>({
    isAdmin: false,
    loading: true,
  })

  /**
   * Replace this effect with your real-world auth check
   * (Supabase, Clerk, NextAuth, etc.)
   */
  useEffect(() => {
    async function checkPermissions() {
      // TODO: integrate authentication / RBAC logic here.
      // For now we just simulate an async permission check.
      await new Promise((r) => setTimeout(r, 300))
      setState({ isAdmin: true, loading: false })
    }

    checkPermissions()
  }, [])

  return <AdminAccessContext.Provider value={state}>{children}</AdminAccessContext.Provider>
}

/* ---------------------------------------------------------------------------
 * Hook
 * ------------------------------------------------------------------------ */
export function useAdminAccess() {
  const ctx = useContext(AdminAccessContext)
  if (!ctx) {
    throw new Error("useAdminAccess must be used within an AdminAccessProvider")
  }
  return ctx
}
