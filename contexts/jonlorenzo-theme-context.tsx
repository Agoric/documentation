"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { jonlorenzoRoyalTheme } from "@/lib/jonlorenzo-royal-theme"

interface ThemeContextType {
  isDark: boolean
  isRoyalMode: boolean
  illuminationLevel: number
  geniusActive: boolean
  toggleTheme: () => void
  toggleRoyalMode: () => void
  setIlluminationLevel: (level: number) => void
  activateGenius: () => void
  deactivateGenius: () => void
  theme: typeof jonlorenzoRoyalTheme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function JonlorenzoThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true) // Default to dark
  const [isRoyalMode, setIsRoyalMode] = useState(true) // Default to royal
  const [illuminationLevel, setIlluminationLevel] = useState(75) // 0-100
  const [geniusActive, setGeniusActive] = useState(false)

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement

    if (isDark && isRoyalMode) {
      root.style.setProperty("--background", jonlorenzoRoyalTheme.colors.royal[50])
      root.style.setProperty("--foreground", jonlorenzoRoyalTheme.colors.illumination[200])
      root.style.setProperty("--card", jonlorenzoRoyalTheme.colors.royal[100])
      root.style.setProperty("--card-foreground", jonlorenzoRoyalTheme.colors.illumination[100])
      root.style.setProperty("--primary", jonlorenzoRoyalTheme.colors.illumination[500])
      root.style.setProperty("--primary-foreground", jonlorenzoRoyalTheme.colors.royal[50])
      root.style.setProperty("--secondary", jonlorenzoRoyalTheme.colors.royal[200])
      root.style.setProperty("--secondary-foreground", jonlorenzoRoyalTheme.colors.illumination[200])
      root.style.setProperty("--accent", jonlorenzoRoyalTheme.colors.genius[500])
      root.style.setProperty("--accent-foreground", jonlorenzoRoyalTheme.colors.royal[50])
      root.style.setProperty("--border", jonlorenzoRoyalTheme.colors.royal[300])
      root.style.setProperty("--input", jonlorenzoRoyalTheme.colors.royal[200])
      root.style.setProperty("--ring", jonlorenzoRoyalTheme.colors.illumination[500])

      // Add royal illumination class to body
      document.body.className = "jonlorenzo-royal-dark"
    }

    // Set illumination level
    root.style.setProperty("--illumination-opacity", (illuminationLevel / 100).toString())
  }, [isDark, isRoyalMode, illuminationLevel])

  const toggleTheme = () => setIsDark(!isDark)
  const toggleRoyalMode = () => setIsRoyalMode(!isRoyalMode)
  const activateGenius = () => setGeniusActive(true)
  const deactivateGenius = () => setGeniusActive(false)

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        isRoyalMode,
        illuminationLevel,
        geniusActive,
        toggleTheme,
        toggleRoyalMode,
        setIlluminationLevel,
        activateGenius,
        deactivateGenius,
        theme: jonlorenzoRoyalTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useJonlorenzoTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useJonlorenzoTheme must be used within a JonlorenzoThemeProvider")
  }
  return context
}
