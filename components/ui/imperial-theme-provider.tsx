"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface ImperialTheme {
  primaryGold: string
  secondaryBronze: string
  accentCopper: string
  imperialBlue: string
  royalPurple: string
  classicWhite: string
  shadowBlack: string
  humanitarianGreen: string
}

const imperialTheme: ImperialTheme = {
  primaryGold: "#D4AF37",
  secondaryBronze: "#CD7F32",
  accentCopper: "#B87333",
  imperialBlue: "#1E3A8A",
  royalPurple: "#6B46C1",
  classicWhite: "#FAFAFA",
  shadowBlack: "#0F0F0F",
  humanitarianGreen: "#059669",
}

const ImperialThemeContext = createContext<ImperialTheme>(imperialTheme)

export function ImperialThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Apply imperial CSS variables
    const root = document.documentElement
    root.style.setProperty("--imperial-gold", imperialTheme.primaryGold)
    root.style.setProperty("--imperial-bronze", imperialTheme.secondaryBronze)
    root.style.setProperty("--imperial-copper", imperialTheme.accentCopper)
    root.style.setProperty("--imperial-blue", imperialTheme.imperialBlue)
    root.style.setProperty("--royal-purple", imperialTheme.royalPurple)
    root.style.setProperty("--classic-white", imperialTheme.classicWhite)
    root.style.setProperty("--shadow-black", imperialTheme.shadowBlack)
    root.style.setProperty("--humanitarian-green", imperialTheme.humanitarianGreen)
  }, [])

  if (!mounted) return null

  return <ImperialThemeContext.Provider value={imperialTheme}>{children}</ImperialThemeContext.Provider>
}

export const useImperialTheme = () => useContext(ImperialThemeContext)
