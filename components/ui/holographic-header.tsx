"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HolographicHeaderProps {
  title: string
  subtitle?: string
  description?: string
  className?: string
  variant?: "primary" | "secondary" | "accent" | "rainbow"
  size?: "sm" | "md" | "lg" | "xl"
  animated?: boolean
  glitchEffect?: boolean
}

const variantStyles = {
  primary: {
    title: "bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500",
    subtitle: "text-blue-300",
    description: "text-blue-100",
  },
  secondary: {
    title: "bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400",
    subtitle: "text-blue-300",
    description: "text-blue-100",
  },
  accent: {
    title: "bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500",
    subtitle: "text-blue-300",
    description: "text-blue-100",
  },
  rainbow: {
    title: "bg-gradient-to-r from-blue-200 via-blue-400 via-blue-300 via-blue-500 via-blue-400 to-blue-200",
    subtitle: "text-blue-300",
    description: "text-blue-100",
  },
}

const sizeStyles = {
  sm: {
    title: "text-2xl md:text-3xl",
    subtitle: "text-lg",
    description: "text-sm",
  },
  md: {
    title: "text-3xl md:text-4xl lg:text-5xl",
    subtitle: "text-xl",
    description: "text-base",
  },
  lg: {
    title: "text-4xl md:text-5xl lg:text-6xl",
    subtitle: "text-2xl",
    description: "text-lg",
  },
  xl: {
    title: "text-5xl md:text-6xl lg:text-7xl",
    subtitle: "text-3xl",
    description: "text-xl",
  },
}

export function HolographicHeader({
  title,
  subtitle,
  description,
  className,
  variant = "primary",
  size = "md",
  animated = true,
  glitchEffect = false,
}: HolographicHeaderProps) {
  const [glitchActive, setGlitchActive] = React.useState(false)

  React.useEffect(() => {
    if (!glitchEffect) return

    const interval = setInterval(
      () => {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
      },
      3000 + Math.random() * 2000,
    )

    return () => clearInterval(interval)
  }, [glitchEffect])

  return (
    <div className={cn("text-center space-y-4", className)}>
      {/* Main Title */}
      <motion.h1
        className={cn(
          "font-bold bg-clip-text text-transparent leading-tight",
          variantStyles[variant].title,
          sizeStyles[size].title,
          glitchActive && "animate-pulse",
        )}
        initial={animated ? { opacity: 0, y: 20 } : {}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        style={{
          filter: glitchActive ? "hue-rotate(30deg) saturate(2)" : "none",
          textShadow: glitchActive ? "2px 0 #0047AB, -2px 0 #0066CC, 0 2px #0080FF" : "0 0 20px rgba(0, 71, 171, 0.5)",
        }}
      >
        {title}
      </motion.h1>

      {/* Animated Underline */}
      <motion.div
        className="mx-auto h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
        initial={animated ? { width: 0 } : { width: "200px" }}
        animate={{ width: "200px" }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Subtitle */}
      {subtitle && (
        <motion.h2
          className={cn("font-semibold", variantStyles[variant].subtitle, sizeStyles[size].subtitle)}
          initial={animated ? { opacity: 0, y: 10 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {subtitle}
        </motion.h2>
      )}

      {/* Description */}
      {description && (
        <motion.p
          className={cn(
            "max-w-3xl mx-auto leading-relaxed",
            variantStyles[variant].description,
            sizeStyles[size].description,
          )}
          initial={animated ? { opacity: 0, y: 10 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {description}
        </motion.p>
      )}

      {/* Floating Particles */}
      {animated && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 50 - 25, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
