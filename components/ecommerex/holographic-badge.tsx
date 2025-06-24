"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface HolographicBadgeProps {
  children: ReactNode
  variant?: "primary" | "secondary" | "accent"
  animated?: boolean
  className?: string
}

export function HolographicBadge({
  children,
  variant = "primary",
  animated = true,
  className = "",
}: HolographicBadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return {
          bg: "bg-gradient-to-r from-purple-600/20 to-pink-600/20",
          border: "border-purple-400/30",
          text: "text-purple-300",
          glow: "shadow-purple-400/20",
        }
      case "accent":
        return {
          bg: "bg-gradient-to-r from-emerald-600/20 to-teal-600/20",
          border: "border-emerald-400/30",
          text: "text-emerald-300",
          glow: "shadow-emerald-400/20",
        }
      default:
        return {
          bg: "bg-gradient-to-r from-cyan-600/20 to-indigo-600/20",
          border: "border-cyan-400/30",
          text: "text-cyan-300",
          glow: "shadow-cyan-400/20",
        }
    }
  }

  const styles = getVariantStyles()

  return (
    <motion.div
      className={`
        inline-flex items-center px-2 py-1 rounded-md text-xs font-medium
        ${styles.bg} ${styles.border} ${styles.text} ${styles.glow}
        border backdrop-blur-sm
        ${className}
      `}
      animate={
        animated
          ? {
              boxShadow: [
                `0 0 5px ${styles.glow.replace("shadow-", "").replace("/20", ", 0.2)")}`,
                `0 0 10px ${styles.glow.replace("shadow-", "").replace("/20", ", 0.4)")}`,
                `0 0 5px ${styles.glow.replace("shadow-", "").replace("/20", ", 0.2)")}`,
              ],
            }
          : {}
      }
      transition={{
        duration: 2,
        repeat: animated ? Number.POSITIVE_INFINITY : 0,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}
