"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FuturisticCardProps {
  children: React.ReactNode
  className?: string
  variant?: "glass" | "neon" | "hologram" | "neural" | "quantum" | "plasma" | "gold-highlight"
  size?: "sm" | "md" | "lg" | "xl"
  glow?: boolean
  animated?: boolean
  interactive?: boolean
  borderAnimation?: boolean
  particleEffect?: boolean
  premium?: boolean
}

const cardVariants = {
  glass: {
    background: "rgba(0, 71, 171, 0.03)",
    border: "1px solid rgba(0, 71, 171, 0.1)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 71, 171, 0.1)",
  },
  neon: {
    background: "linear-gradient(135deg, rgba(0, 71, 171, 0.1), rgba(0, 102, 204, 0.05))",
    border: "1px solid rgba(0, 71, 171, 0.3)",
    boxShadow: "0 0 20px rgba(0, 71, 171, 0.4), inset 0 0 20px rgba(0, 71, 171, 0.1)",
  },
  hologram: {
    background: "linear-gradient(135deg, rgba(0, 71, 171, 0.1), rgba(0, 102, 204, 0.1), rgba(0, 128, 255, 0.1))",
    border: "1px solid rgba(0, 71, 171, 0.4)",
    boxShadow: "0 0 30px rgba(0, 71, 171, 0.3)",
  },
  neural: {
    background: "linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(0, 10, 26, 0.9))",
    border: "1px solid rgba(0, 71, 171, 0.2)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.9), 0 0 15px rgba(0, 71, 171, 0.1)",
  },
  quantum: {
    background: "linear-gradient(135deg, rgba(0, 71, 171, 0.1), rgba(0, 102, 204, 0.1))",
    border: "1px solid rgba(0, 71, 171, 0.3)",
    boxShadow: "0 0 25px rgba(0, 71, 171, 0.3)",
  },
  plasma: {
    background: "linear-gradient(135deg, rgba(0, 71, 171, 0.15), rgba(0, 102, 204, 0.1), rgba(74, 144, 226, 0.1))",
    border: "1px solid rgba(0, 71, 171, 0.4)",
    boxShadow: "0 0 25px rgba(0, 71, 171, 0.4)",
  },
  "gold-highlight": {
    background: "linear-gradient(135deg, rgba(0, 71, 171, 0.1), rgba(255, 215, 0, 0.05), rgba(0, 102, 204, 0.1))",
    border: "1px solid rgba(255, 215, 0, 0.3)",
    boxShadow: "0 0 25px rgba(255, 215, 0, 0.2), 0 0 15px rgba(0, 71, 171, 0.2)",
  },
}

export function FuturisticCard({
  children,
  className,
  variant = "glass",
  size = "md",
  glow = true,
  animated = true,
  interactive = true,
  borderAnimation = true,
  particleEffect = false,
  premium = false,
}: FuturisticCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })

  const sizeClasses = {
    sm: "p-4 rounded-lg",
    md: "p-6 rounded-xl",
    lg: "p-8 rounded-2xl",
    xl: "p-10 rounded-3xl",
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive) return
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const borderColor = premium || variant === "gold-highlight" ? "#ffd700" : "#0047AB"

  return (
    <motion.div
      className={cn("relative overflow-hidden", sizeClasses[size], className)}
      style={cardVariants[variant]}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={interactive ? { scale: 1.02, y: -5 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Premium Gold Corner Badge */}
      {premium && (
        <div className="absolute top-2 right-2 z-20">
          <motion.div
            className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="w-2 h-2 bg-black rounded-full" />
          </motion.div>
        </div>
      )}

      {/* Animated Border */}
      {borderAnimation && (
        <motion.div
          className="absolute inset-0 rounded-inherit"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, transparent, ${borderColor}, transparent)`,
            padding: "1px",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="w-full h-full rounded-inherit" style={cardVariants[variant]} />
        </motion.div>
      )}

      {/* Particle Effect */}
      {particleEffect && isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "absolute w-1 h-1 rounded-full",
                premium || variant === "gold-highlight" ? "bg-yellow-400" : "bg-blue-400",
              )}
              initial={{
                x: mousePosition.x,
                y: mousePosition.y,
                opacity: 1,
                scale: 0,
              }}
              animate={{
                x: mousePosition.x + (Math.random() - 0.5) * 200,
                y: mousePosition.y + (Math.random() - 0.5) * 200,
                opacity: 0,
                scale: 1,
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          ))}
        </div>
      )}

      {/* Glow Effect */}
      {glow && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-inherit pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${
              premium || variant === "gold-highlight" ? "rgba(255, 215, 0, 0.2)" : "rgba(0, 71, 171, 0.2)"
            }, transparent 50%)`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Scan Line Effect */}
      {animated && (
        <motion.div
          className={cn(
            "absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent to-transparent opacity-50",
            premium || variant === "gold-highlight" ? "via-yellow-400" : "via-blue-400",
          )}
          animate={{
            y: isHovered ? [0, 300, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            ease: "linear",
          }}
        />
      )}
    </motion.div>
  )
}
