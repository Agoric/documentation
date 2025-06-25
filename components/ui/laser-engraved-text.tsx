"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface LaserEngravedTextProps {
  text: string
  variant?: "gold" | "silver" | "platinum" | "copper"
  highlightColor?: "indigo" | "emerald" | "ruby" | "sapphire" | "amethyst"
  highlightWords?: string[]
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  laserActive?: boolean
  animateOnMount?: boolean
  className?: string
}

const textVariants = {
  gold: {
    base: "bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600",
    shadow: "text-shadow-lg shadow-yellow-900/50",
    glow: "drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]",
  },
  silver: {
    base: "bg-gradient-to-b from-gray-200 via-gray-300 to-gray-500",
    shadow: "text-shadow-lg shadow-gray-800/50",
    glow: "drop-shadow-[0_0_8px_rgba(156,163,175,0.6)]",
  },
  platinum: {
    base: "bg-gradient-to-b from-slate-200 via-slate-300 to-slate-500",
    shadow: "text-shadow-lg shadow-slate-800/50",
    glow: "drop-shadow-[0_0_8px_rgba(148,163,184,0.6)]",
  },
  copper: {
    base: "bg-gradient-to-b from-orange-300 via-orange-500 to-orange-700",
    shadow: "text-shadow-lg shadow-orange-900/50",
    glow: "drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]",
  },
}

const highlightVariants = {
  indigo: {
    base: "bg-gradient-to-b from-indigo-300 via-indigo-500 to-indigo-700",
    glow: "drop-shadow-[0_0_12px_rgba(99,102,241,0.8)]",
  },
  emerald: {
    base: "bg-gradient-to-b from-emerald-300 via-emerald-500 to-emerald-700",
    glow: "drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]",
  },
  ruby: {
    base: "bg-gradient-to-b from-red-300 via-red-500 to-red-700",
    glow: "drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]",
  },
  sapphire: {
    base: "bg-gradient-to-b from-blue-300 via-blue-500 to-blue-700",
    glow: "drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]",
  },
  amethyst: {
    base: "bg-gradient-to-b from-purple-300 via-purple-500 to-purple-700",
    glow: "drop-shadow-[0_0_12px_rgba(139,92,246,0.8)]",
  },
}

const sizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
}

export function LaserEngravedText({
  text,
  variant = "gold",
  highlightColor = "indigo",
  highlightWords = [],
  size = "md",
  laserActive = false,
  animateOnMount = true,
  className,
}: LaserEngravedTextProps) {
  const [isVisible, setIsVisible] = React.useState(!animateOnMount)
  const textVariant = textVariants[variant]
  const highlightVariant = highlightVariants[highlightColor]

  React.useEffect(() => {
    if (animateOnMount) {
      const timer = setTimeout(() => setIsVisible(true), 100)
      return () => clearTimeout(timer)
    }
  }, [animateOnMount])

  const renderWord = (word: string, index: number, isHighlighted: boolean) => {
    const baseClasses = cn(
      "inline-block font-bold tracking-wide",
      sizeClasses[size],
      isHighlighted ? highlightVariant.base : textVariant.base,
      isHighlighted ? highlightVariant.glow : textVariant.glow,
      textVariant.shadow,
    )

    return (
      <motion.span
        key={`${word}-${index}`}
        className={cn(baseClasses, "bg-clip-text text-transparent relative", className)}
        initial={animateOnMount ? { opacity: 0, scale: 0.8, y: 10 } : {}}
        animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: "easeOut",
        }}
        style={{
          textShadow: isHighlighted
            ? `0 0 10px ${highlightColor === "indigo" ? "#6366f1" : highlightColor === "emerald" ? "#10b981" : highlightColor === "ruby" ? "#ef4444" : highlightColor === "sapphire" ? "#3b82f6" : "#8b5cf6"}`
            : "0 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        {/* Laser Engraving Effect */}
        <AnimatePresence>
          {laserActive && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Laser Cutting Line */}
              <motion.div
                className={cn("absolute top-0 left-0 h-full w-0.5", isHighlighted ? "bg-indigo-400" : "bg-yellow-400")}
                initial={{ scaleY: 0, x: 0 }}
                animate={{ scaleY: 1, x: "100%" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                style={{
                  boxShadow: `0 0 10px ${isHighlighted ? "#6366f1" : "#fbbf24"}`,
                }}
              />

              {/* Burn Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 0] }}
                transition={{
                  duration: 1,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
              />

              {/* Sparks */}
              {[...Array(3)].map((_, sparkIndex) => (
                <motion.div
                  key={sparkIndex}
                  className={cn("absolute w-1 h-1 rounded-full", isHighlighted ? "bg-indigo-400" : "bg-yellow-400")}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: [0, Math.random() * 20 - 10],
                    y: [0, Math.random() * 20 - 10],
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1 + sparkIndex * 0.1,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Character Depth Effect */}
        <span
          className="absolute inset-0 bg-clip-text text-transparent opacity-50"
          style={{
            background: `linear-gradient(145deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))`,
            transform: "translate(1px, 1px)",
          }}
        >
          {word}
        </span>

        {word}
      </motion.span>
    )
  }

  const words = text.split(" ")

  return (
    <div className={cn("inline-flex flex-wrap gap-1", className)}>
      {words.map((word, index) => {
        const isHighlighted = highlightWords.some((highlight) => word.toLowerCase().includes(highlight.toLowerCase()))
        return (
          <React.Fragment key={index}>
            {renderWord(word, index, isHighlighted)}
            {index < words.length - 1 && <span className="inline-block w-1" />}
          </React.Fragment>
        )
      })}
    </div>
  )
}
