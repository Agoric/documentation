"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface QuantumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "neon" | "hologram" | "plasma"
  size?: "sm" | "md" | "lg" | "xl"
  loading?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
}

const buttonVariants = {
  primary: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef)",
    color: "white",
    border: "1px solid rgba(99, 102, 241, 0.3)",
    boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
  },
  secondary: {
    background: "rgba(255, 255, 255, 0.02)",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.6)",
  },
  ghost: {
    background: "transparent",
    color: "rgba(255, 255, 255, 0.9)",
    border: "1px solid transparent",
    boxShadow: "none",
  },
  neon: {
    background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(168, 85, 247, 0.1))",
    color: "#06b6d4",
    border: "1px solid #06b6d4",
    boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
  },
  hologram: {
    background: "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))",
    color: "#22c55e",
    border: "1px solid #22c55e",
    boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
  },
  plasma: {
    background: "linear-gradient(135deg, #f59e0b, #ef4444, #ec4899)",
    color: "white",
    border: "1px solid rgba(245, 158, 11, 0.3)",
    boxShadow: "0 0 25px rgba(245, 158, 11, 0.4)",
  },
}

const sizeClasses = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-2xl",
  xl: "px-10 py-5 text-xl rounded-3xl",
}

export function QuantumButton({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  children,
  className,
  disabled,
  ...props
}: QuantumButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [isPressed, setIsPressed] = React.useState(false)

  /* ------------------------------------------------------------------ *
   * Gracefully handle unknown variants by falling back to "primary".   *
   * ------------------------------------------------------------------ */
  const variantStyles =
    // cast so TS stops complaining about dynamic key access
    (buttonVariants as Record<string, (typeof buttonVariants)["primary"]>)[variant] ?? buttonVariants["primary"]

  return (
    <motion.button
      className={cn(
        "relative overflow-hidden font-medium transition-all duration-300 backdrop-blur-sm",
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      /* Apply the safe variant styles directly */
      style={variantStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      disabled={disabled || loading}
      {...props}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isHovered
            ? [
                variantStyles.background,
                variant === "primary" ? "linear-gradient(135deg, #8b5cf6, #d946ef, #6366f1)" : variantStyles.background,
                variantStyles.background,
              ]
            : variantStyles.background,
        }}
        transition={{ duration: 2, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
      />

      {/* Ripple Effect */}
      {isPressed && (
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-inherit"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-inherit"
        animate={{
          boxShadow: isHovered
            ? [
                variantStyles.boxShadow,
                `0 0 40px ${variant === "neon" ? "rgba(6, 182, 212, 0.8)" : "rgba(99, 102, 241, 0.6)"}`,
                variantStyles.boxShadow,
              ]
            : variantStyles.boxShadow,
        }}
        transition={{ duration: 2, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <motion.div
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        ) : (
          icon && <span className="text-lg">{icon}</span>
        )}
        <span>{children}</span>
      </div>

      {/* Scan Line */}
      <motion.div
        className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        animate={{
          x: isHovered ? ["-100%", "100%"] : "-100%",
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
          ease: "linear",
        }}
      />
    </motion.button>
  )
}
