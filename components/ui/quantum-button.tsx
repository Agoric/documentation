"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface QuantumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "neon" | "hologram" | "plasma" | "gold-highlight"
  size?: "sm" | "md" | "lg" | "xl"
  loading?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
  premium?: boolean
}

const buttonVariants = {
  primary: {
    background: "linear-gradient(135deg, #0047AB, #0066CC, #0080FF)",
    color: "#ffffff",
    border: "1px solid rgba(0, 71, 171, 0.5)",
    boxShadow: "0 0 20px rgba(0, 71, 171, 0.4)",
  },
  secondary: {
    background: "rgba(0, 71, 171, 0.05)",
    color: "#0047AB",
    border: "1px solid rgba(0, 71, 171, 0.2)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
  },
  ghost: {
    background: "transparent",
    color: "#0047AB",
    border: "1px solid transparent",
    boxShadow: "none",
  },
  neon: {
    background: "linear-gradient(135deg, rgba(0, 71, 171, 0.1), rgba(0, 102, 204, 0.1))",
    color: "#0047AB",
    border: "1px solid #0047AB",
    boxShadow: "0 0 20px rgba(0, 71, 171, 0.5)",
  },
  hologram: {
    background: "linear-gradient(135deg, rgba(0, 71, 171, 0.1), rgba(0, 102, 204, 0.1))",
    color: "#0047AB",
    border: "1px solid #0047AB",
    boxShadow: "0 0 20px rgba(0, 71, 171, 0.4)",
  },
  plasma: {
    background: "linear-gradient(135deg, #0047AB, #0066CC, #0080FF)",
    color: "#ffffff",
    border: "1px solid rgba(0, 71, 171, 0.5)",
    boxShadow: "0 0 25px rgba(0, 71, 171, 0.6)",
  },
  "gold-highlight": {
    background: "linear-gradient(135deg, #ffd700, #ffed4e, #fbbf24)",
    color: "#000000",
    border: "1px solid rgba(255, 215, 0, 0.5)",
    boxShadow: "0 0 20px rgba(255, 215, 0, 0.4), 0 0 10px rgba(0, 71, 171, 0.2)",
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
  premium = false,
  ...props
}: QuantumButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [isPressed, setIsPressed] = React.useState(false)

  const effectiveVariant = premium ? "gold-highlight" : variant
  const variantStyles =
    (buttonVariants as Record<string, (typeof buttonVariants)["primary"]>)[effectiveVariant] ??
    buttonVariants["primary"]

  return (
    <motion.button
      className={cn(
        "relative overflow-hidden font-medium transition-all duration-300 backdrop-blur-sm",
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed",
        premium && "font-bold",
        className,
      )}
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
      {/* Premium Gold Corner Accent */}
      {premium && (
        <div className="absolute top-0 right-0 w-3 h-3 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-bl-lg" />
      )}

      {/* Animated Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isHovered
            ? [
                variantStyles.background,
                effectiveVariant === "gold-highlight"
                  ? "linear-gradient(135deg, #ffed4e, #ffd700, #fbbf24)"
                  : "linear-gradient(135deg, #0066CC, #0047AB, #0080FF)",
                variantStyles.background,
              ]
            : variantStyles.background,
        }}
        transition={{ duration: 2, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
      />

      {/* Ripple Effect */}
      {isPressed && (
        <motion.div
          className={cn("absolute inset-0 rounded-inherit", premium ? "bg-yellow-400/30" : "bg-blue-400/30")}
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
                premium ? `0 0 40px rgba(255, 215, 0, 0.8)` : `0 0 40px rgba(0, 71, 171, 0.8)`,
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
        className={cn(
          "absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent to-transparent",
          premium ? "via-yellow-400" : "via-blue-400",
        )}
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
