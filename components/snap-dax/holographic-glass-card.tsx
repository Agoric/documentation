"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface HolographicGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glassEffect?: "light" | "medium" | "heavy"
  hologramIntensity?: "subtle" | "moderate" | "intense"
  children: React.ReactNode
}

export function HolographicGlassCard({
  className,
  glassEffect = "medium",
  hologramIntensity = "moderate",
  children,
  ...props
}: HolographicGlassCardProps) {
  const glassEffects = {
    light: "backdrop-blur-sm bg-white/5 border-white/10",
    medium: "backdrop-blur-md bg-white/10 border-white/20",
    heavy: "backdrop-blur-lg bg-white/15 border-white/30",
  }

  const hologramEffects = {
    subtle: "before:opacity-20 hover:before:opacity-30",
    moderate: "before:opacity-30 hover:before:opacity-40",
    intense: "before:opacity-40 hover:before:opacity-50",
  }

  return (
    <div
      className={cn(
        // Base glass morphism styles
        "relative rounded-2xl border shadow-2xl",
        glassEffects[glassEffect],

        // Holographic overlay
        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br",
        "before:from-cyan-400/20 before:via-purple-400/20 before:to-pink-400/20",
        "before:blur-[0.5px] before:transition-opacity before:duration-500",
        hologramEffects[hologramIntensity],

        // Animated border glow
        "after:absolute after:inset-0 after:rounded-2xl after:border after:border-transparent",
        "after:bg-gradient-to-r after:from-cyan-500/20 after:via-purple-500/20 after:to-pink-500/20",
        "after:bg-clip-border after:animate-pulse after:blur-sm",

        // Interactive hover effects
        "hover:shadow-cyan-500/25 hover:shadow-2xl",
        "transition-all duration-300 ease-in-out",
        "hover:scale-[1.02] hover:backdrop-blur-lg",

        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
