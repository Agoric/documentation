"use client"

import type React from "react"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface RoyalDiamondSlabCardProps {
  children: ReactNode
  className?: string
  title?: string
  subtitle?: string
  variant?: "default" | "premium" | "elite" | "sovereign"
  glowIntensity?: "low" | "medium" | "high" | "maximum"
  laserEffect?: boolean
  diamondPattern?: boolean
}

export function RoyalDiamondSlabCard({
  children,
  className,
  title,
  subtitle,
  variant = "default",
  glowIntensity = "medium",
  laserEffect = true,
  diamondPattern = true,
  ...props
}: RoyalDiamondSlabCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "premium":
        return "from-amber-900/40 via-yellow-800/30 to-amber-900/40 border-amber-400/50"
      case "elite":
        return "from-amber-800/50 via-yellow-700/40 to-amber-800/50 border-amber-300/60"
      case "sovereign":
        return "from-amber-700/60 via-yellow-600/50 to-amber-700/60 border-amber-200/70"
      default:
        return "from-amber-950/30 via-yellow-900/20 to-amber-950/30 border-amber-500/40"
    }
  }

  const getGlowIntensity = () => {
    switch (glowIntensity) {
      case "low":
        return "shadow-amber-500/10"
      case "high":
        return "shadow-amber-400/30 shadow-2xl"
      case "maximum":
        return "shadow-amber-300/40 shadow-2xl drop-shadow-2xl"
      default:
        return "shadow-amber-500/20 shadow-xl"
    }
  }

  return (
    <motion.div
      className={cn(
        "relative group overflow-hidden rounded-2xl backdrop-blur-xl",
        "bg-gradient-to-br",
        getVariantStyles(),
        getGlowIntensity(),
        "border-2 transition-all duration-500",
        className,
      )}
      whileHover={{ scale: 1.02, rotateY: 2 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    >
      {/* Diamond Crystal Background Pattern */}
      {diamondPattern && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-400/10 to-transparent transform rotate-45" />
          <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-amber-400/10 to-transparent transform -rotate-45" />

          {/* Diamond Facet Lines */}
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-amber-400/30 via-transparent to-amber-400/30 transform -translate-x-1/2" />
          <div className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-amber-400/30 via-transparent to-amber-400/30 transform -translate-y-1/2" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-400/20 via-transparent to-transparent transform rotate-45 origin-center" />
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-amber-400/20 via-transparent to-transparent transform -rotate-45 origin-center" />
        </div>
      )}

      {/* Laser Engraving Effect */}
      {laserEffect && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />
          <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-indigo-400/60 to-transparent" />
          <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-indigo-400/60 to-transparent" />
        </motion.div>
      )}

      {/* Holographic Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/20 to-transparent transform -skew-x-12"
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/60 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Enhanced Border Glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-amber-400/40"
        animate={{
          borderColor: ["rgba(251, 191, 36, 0.4)", "rgba(251, 191, 36, 0.8)", "rgba(251, 191, 36, 0.4)"],
          boxShadow: [
            "0 0 20px rgba(251, 191, 36, 0.2)",
            "0 0 40px rgba(251, 191, 36, 0.4)",
            "0 0 20px rgba(251, 191, 36, 0.2)",
          ],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Content Container */}
      <div className="relative z-10 p-8">
        {/* Header Section */}
        {(title || subtitle) && (
          <div className="mb-6 space-y-2">
            {title && (
              <motion.h2
                className="text-3xl font-bold tracking-wider"
                style={{
                  background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 0 30px rgba(251, 191, 36, 0.5)",
                  filter: "drop-shadow(0 0 10px rgba(99, 102, 241, 0.3))",
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                className="text-lg font-medium tracking-wide"
                style={{
                  background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 70%, #6366f1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 0 20px rgba(99, 102, 241, 0.4)",
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}

        {/* Main Content */}
        <motion.div
          className="space-y-4"
          style={{
            color: "#fbbf24",
            textShadow: "0 0 15px rgba(251, 191, 36, 0.3)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {children}
        </motion.div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-amber-400/60" />
      <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-amber-400/60" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-amber-400/60" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-amber-400/60" />

      {/* Laser Engraved Corner Details */}
      <motion.div
        className="absolute top-2 left-2 w-2 h-2 bg-indigo-400/80 rounded-full"
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-2 right-2 w-2 h-2 bg-indigo-400/80 rounded-full"
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-2 left-2 w-2 h-2 bg-indigo-400/80 rounded-full"
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-2 right-2 w-2 h-2 bg-indigo-400/80 rounded-full"
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
      />
    </motion.div>
  )
}

// Text Components with Laser Engraved Styling
export function LaserEngravedText({
  children,
  className,
  highlight = false,
  size = "base",
}: {
  children: ReactNode
  className?: string
  highlight?: boolean
  size?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl"
}) {
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "text-sm"
      case "lg":
        return "text-lg"
      case "xl":
        return "text-xl"
      case "2xl":
        return "text-2xl"
      case "3xl":
        return "text-3xl"
      default:
        return "text-base"
    }
  }

  return (
    <span
      className={cn(
        getSizeClass(),
        "font-semibold tracking-wide transition-all duration-300",
        highlight ? "bg-gradient-to-r from-indigo-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent" : "",
        className,
      )}
      style={{
        background: highlight
          ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)"
          : "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textShadow: highlight
          ? "0 0 20px rgba(99, 102, 241, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)"
          : "0 0 15px rgba(251, 191, 36, 0.4)",
        filter: highlight
          ? "drop-shadow(0 0 8px rgba(99, 102, 241, 0.4))"
          : "drop-shadow(0 0 6px rgba(251, 191, 36, 0.3))",
      }}
    >
      {children}
    </span>
  )
}

// Specialized Royal Diamond Button
export function RoyalDiamondButton({
  children,
  className,
  variant = "primary",
  ...props
}: {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "accent"
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return "from-amber-800/60 to-amber-600/60 border-amber-400/60 hover:from-amber-700/70 hover:to-amber-500/70"
      case "accent":
        return "from-indigo-600/60 to-purple-600/60 border-indigo-400/60 hover:from-indigo-500/70 hover:to-purple-500/70"
      default:
        return "from-amber-600/60 to-amber-400/60 border-amber-300/60 hover:from-amber-500/70 hover:to-amber-300/70"
    }
  }

  return (
    <motion.button
      className={cn(
        "relative px-6 py-3 rounded-xl font-semibold tracking-wide",
        "bg-gradient-to-r border-2 backdrop-blur-sm",
        "transition-all duration-300 overflow-hidden group",
        getVariantStyles(),
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {/* Button Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <span
        className="relative z-10"
        style={{
          background:
            variant === "accent"
              ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #6366f1 100%)"
              : "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "0 0 15px rgba(251, 191, 36, 0.4)",
        }}
      >
        {children}
      </span>
    </motion.button>
  )
}
