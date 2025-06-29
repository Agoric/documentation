"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface DemoContextValue {
  /**
   * When true, the UI shows demo data instead of live data.
   */
  demoMode: boolean
  /**
   * Toggle demo mode on / off.
   */
  toggleDemoMode: () => void
}

const DemoContext = createContext<DemoContextValue | null>(null)

export function DemoContextProvider({ children }: { children: ReactNode }) {
  const [demoMode, setDemoMode] = useState<boolean>(true)

  const toggleDemoMode = () => setDemoMode((prev) => !prev)

  const value: DemoContextValue = {
    demoMode,
    toggleDemoMode,
  }

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

/**
 * Convenience hook so components can do:
 * const { demoMode, toggleDemoMode } = useDemoContext()
 */
export function useDemoContext() {
  const ctx = useContext(DemoContext)
  if (!ctx) {
    throw new Error("useDemoContext must be used inside <DemoContextProvider>")
  }
  return ctx
}
