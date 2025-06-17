"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface HolographicGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  glassEffect?: "light" | "medium" | "heavy"
  holographicIntensity?: "subtle" | "moderate" | "intense"
  borderGlow?: boolean
}

export function HolographicGlassCard({
  children,
  className,
  glassEffect = "medium",
  holographicIntensity = "moderate",
  borderGlow = true,
  ...props
}: HolographicGlassCardProps) {
  const glassEffects = {
    light: "bg-white/5 backdrop-blur-sm",
    medium: "bg-white/10 backdrop-blur-md",
    heavy: "bg-white/20 backdrop-blur-lg",
  }

  const holographicEffects = {
    subtle: "before:opacity-20",
    moderate: "before:opacity-30",
    intense: "before:opacity-40",
  }

  return (
    <div
      className={cn(
        // Base glass effect
        glassEffects[glassEffect],

        // Border and shadow
        "border border-white/20 rounded-xl shadow-2xl",
        borderGlow && "shadow-indigo-500/20",

        // Holographic overlay effect
        "relative overflow-hidden",
        "before:absolute before:inset-0 before:rounded-xl",
        "before:bg-gradient-to-br before:from-indigo-400/30 before:via-purple-400/20 before:to-cyan-400/30",
        "before:animate-pulse before:duration-3000",
        holographicEffects[holographicIntensity],

        // Hover effects
        "transition-all duration-300 ease-in-out",
        "hover:shadow-xl hover:shadow-indigo-500/30",
        "hover:border-white/30",
        "hover:bg-white/15",

        // Interactive glow
        "group cursor-default",

        className,
      )}
      {...props}
    >
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

      {/* Holographic shimmer effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />

      {/* Content container */}
      <div className="relative z-10">{children}</div>

      {/* Corner accents */}
      <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-indigo-400/50 rounded-tl-lg" />
      <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-indigo-400/50 rounded-tr-lg" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-indigo-400/50 rounded-bl-lg" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-indigo-400/50 rounded-br-lg" />
    </div>
  )
}
