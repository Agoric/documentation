"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export interface EnvironmentTheme {
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  muted: string
  border: string
  holographicGradient: string
  glassEffect: string
}

const environmentThemes: Record<string, EnvironmentTheme> = {
  "/dashboard": {
    primary: "hsl(210, 100%, 50%)", // Blue
    secondary: "hsl(210, 100%, 40%)",
    accent: "hsl(210, 100%, 60%)",
    background: "hsl(210, 20%, 5%)",
    foreground: "hsl(210, 20%, 98%)",
    muted: "hsl(210, 20%, 50%)",
    border: "hsl(210, 30%, 20%)",
    holographicGradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))",
    glassEffect: "rgba(59, 130, 246, 0.1)",
  },
  "/dashboard/snap-dax": {
    primary: "hsl(142, 76%, 36%)", // Green
    secondary: "hsl(142, 76%, 26%)",
    accent: "hsl(142, 76%, 46%)",
    background: "hsl(142, 20%, 5%)",
    foreground: "hsl(142, 20%, 98%)",
    muted: "hsl(142, 20%, 50%)",
    border: "hsl(142, 30%, 20%)",
    holographicGradient: "linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(59, 130, 246, 0.3))",
    glassEffect: "rgba(34, 197, 94, 0.1)",
  },
  "/dashboard/ecommerex": {
    primary: "hsl(280, 100%, 50%)", // Purple
    secondary: "hsl(280, 100%, 40%)",
    accent: "hsl(280, 100%, 60%)",
    background: "hsl(280, 20%, 5%)",
    foreground: "hsl(280, 20%, 98%)",
    muted: "hsl(280, 20%, 50%)",
    border: "hsl(280, 30%, 20%)",
    holographicGradient: "linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3))",
    glassEffect: "rgba(147, 51, 234, 0.1)",
  },
  "/dashboard/gamification": {
    primary: "hsl(45, 100%, 50%)", // Gold
    secondary: "hsl(45, 100%, 40%)",
    accent: "hsl(45, 100%, 60%)",
    background: "hsl(45, 20%, 5%)",
    foreground: "hsl(45, 20%, 98%)",
    muted: "hsl(45, 20%, 50%)",
    border: "hsl(45, 30%, 20%)",
    holographicGradient: "linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(245, 101, 101, 0.3))",
    glassEffect: "rgba(251, 191, 36, 0.1)",
  },
  "/legal": {
    primary: "hsl(0, 0%, 50%)", // Gray
    secondary: "hsl(0, 0%, 40%)",
    accent: "hsl(0, 0%, 60%)",
    background: "hsl(0, 0%, 5%)",
    foreground: "hsl(0, 0%, 98%)",
    muted: "hsl(0, 0%, 50%)",
    border: "hsl(0, 0%, 20%)",
    holographicGradient: "linear-gradient(135deg, rgba(156, 163, 175, 0.3), rgba(75, 85, 99, 0.3))",
    glassEffect: "rgba(156, 163, 175, 0.1)",
  },
  "/admin": {
    primary: "hsl(0, 100%, 50%)", // Red
    secondary: "hsl(0, 100%, 40%)",
    accent: "hsl(0, 100%, 60%)",
    background: "hsl(0, 20%, 5%)",
    foreground: "hsl(0, 20%, 98%)",
    muted: "hsl(0, 20%, 50%)",
    border: "hsl(0, 30%, 20%)",
    holographicGradient: "linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(245, 101, 101, 0.3))",
    glassEffect: "rgba(239, 68, 68, 0.1)",
  },
}

export const useEnvironmentThemes = () => {
  const pathname = usePathname()

  useEffect(() => {
    // Find matching theme based on pathname
    let currentTheme: EnvironmentTheme | null = null
    let path: string | null = null

    for (const [p, theme] of Object.entries(environmentThemes)) {
      if (pathname.startsWith(p)) {
        currentTheme = theme
        path = p
        break
      }
    }

    if (currentTheme && path) {
      // Apply CSS custom properties
      const root = document.documentElement
      root.style.setProperty("--environment-primary", currentTheme.primary)
      root.style.setProperty("--environment-secondary", currentTheme.secondary)
      root.style.setProperty("--environment-accent", currentTheme.accent)
      root.style.setProperty("--environment-holographic", currentTheme.holographicGradient)
      root.style.setProperty("--environment-glass", currentTheme.glassEffect)

      // Add environment class to body
      document.body.className = document.body.className.replace(/environment-\w+/g, "")
      const environmentClass = path.replace(/\//g, "-").replace(/^-/, "environment")
      document.body.classList.add(environmentClass)
    }

    return () => {
      // Cleanup on unmount
      document.body.className = document.body.className.replace(/environment-\w+/g, "")
    }
  }, [pathname])

  const getCurrentTheme = () => {
    for (const [path, theme] of Object.entries(environmentThemes)) {
      if (pathname.startsWith(path)) {
        return theme
      }
    }
    return null
  }

  return {
    getCurrentTheme,
    environmentThemes,
  }
}
