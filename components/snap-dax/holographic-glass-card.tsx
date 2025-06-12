"use client"

import type React from "react"
import { HolographicDiamondCard } from "@/components/ui/holographic-diamond-card"

interface HolographicGlassCardProps {
  children: React.ReactNode
  className?: string
  glassEffect?: "subtle" | "medium" | "intense"
  interactive?: boolean
  hoverEffect?: "glow" | "raise" | "tilt" | "none"
  borderGlow?: boolean
  title?: string
  subtitle?: string
  icon?: React.ReactNode
}

export function HolographicGlassCard({
  children,
  className,
  glassEffect = "medium",
  interactive = true,
  hoverEffect = "glow",
  borderGlow = true,
  title,
  subtitle,
  icon,
}: HolographicGlassCardProps) {
  // Map glass effect to variant
  const getVariant = () => {
    switch (glassEffect) {
      case "subtle":
        return "secondary"
      case "medium":
        return "primary"
      case "intense":
        return "accent"
      default:
        return "primary"
    }
  }

  return (
    <HolographicDiamondCard
      title={title}
      subtitle={subtitle}
      icon={icon}
      className={className}
      defaultExpanded={true}
      interactive={interactive}
      variant={getVariant()}
      size="md"
    >
      {children}
    </HolographicDiamondCard>
  )
}
