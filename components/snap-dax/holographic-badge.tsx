"use client"

import type { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface HolographicBadgeProps {
  children: ReactNode
  variant?: "default" | "platinum" | "gold" | "silver" | "tokenized" | "category"
  className?: string
  glow?: boolean
}

export function HolographicBadge({ children, variant = "default", className, glow = true }: HolographicBadgeProps) {
  // Define variant-specific styles
  const variantStyles = {
    default: "bg-indigo-950/60 text-indigo-100 border-indigo-400/30",
    platinum: "bg-purple-950/60 text-purple-100 border-purple-400/30",
    gold: "bg-amber-950/60 text-amber-100 border-amber-400/30",
    silver: "bg-slate-950/60 text-slate-100 border-slate-400/30",
    tokenized: "bg-indigo-950/60 text-indigo-100 border-indigo-400/30",
    category: "bg-slate-950/60 text-slate-100 border-slate-400/30",
  }

  // Define variant-specific glow colors
  const glowColors = {
    default: "rgba(99, 102, 241, 0.5)",
    platinum: "rgba(168, 85, 247, 0.5)",
    gold: "rgba(245, 158, 11, 0.5)",
    silver: "rgba(148, 163, 184, 0.5)",
    tokenized: "rgba(99, 102, 241, 0.5)",
    category: "rgba(148, 163, 184, 0.5)",
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
      {/* Glow effect */}
      {glow && (
        <div
          className="absolute inset-0 rounded-full blur-sm"
          style={{
            background: glowColors[variant],
            opacity: 0.4,
          }}
        />
      )}

      {/* Badge */}
      <Badge className={cn("relative z-10 border backdrop-blur-md", variantStyles[variant], className)}>
        {/* Holographic shine effect */}
        <div
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </Badge>
    </motion.div>
  )
}
