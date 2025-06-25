"use client"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { LaserIlluminatedTitle } from "./laser-illuminated-title"

interface HolographicHeaderProps {
  title: string
  subtitle?: string
  description?: string
  className?: string
  variant?: "primary" | "secondary" | "accent" | "rainbow" | "gold-highlight"
  size?: "sm" | "md" | "lg" | "xl"
  animated?: boolean
  glitchEffect?: boolean
  premium?: boolean
  laserTitle?: boolean
}

const variantStyles = {
  primary: {
    subtitle: "text-blue-300",
    description: "text-blue-100",
  },
  secondary: {
    subtitle: "text-blue-300",
    description: "text-blue-100",
  },
  accent: {
    subtitle: "text-blue-300",
    description: "text-blue-100",
  },
  rainbow: {
    subtitle: "text-blue-300",
    description: "text-blue-100",
  },
  "gold-highlight": {
    subtitle: "text-yellow-300",
    description: "text-yellow-100",
  },
}

const sizeStyles = {
  sm: {
    subtitle: "text-lg",
    description: "text-sm",
  },
  md: {
    subtitle: "text-xl",
    description: "text-base",
  },
  lg: {
    subtitle: "text-2xl",
    description: "text-lg",
  },
  xl: {
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
  premium = false,
  laserTitle = true,
}: HolographicHeaderProps) {
  const effectiveVariant = premium ? "gold-highlight" : variant

  return (
    <div className={cn("text-center space-y-4", className)}>
      {/* Premium Gold Crown */}
      {premium && (
        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-full" />
          </div>
        </motion.div>
      )}

      {/* Laser Illuminated Title */}
      {laserTitle ? (
        <LaserIlluminatedTitle
          text={title}
          size={size === "sm" ? "md" : size === "md" ? "lg" : size === "lg" ? "xl" : "2xl"}
          variant={premium ? "premium" : "standard"}
          animated={animated}
          laserActive={true}
          scanEffect={glitchEffect}
        />
      ) : (
        <motion.h1
          className="font-bold bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent leading-tight"
          initial={animated ? { opacity: 0, y: 20 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          {title}
        </motion.h1>
      )}

      {/* Animated Underline */}
      <motion.div
        className="mx-auto h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
        initial={animated ? { width: 0 } : { width: "200px" }}
        animate={{ width: "200px" }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)",
        }}
      />

      {/* Subtitle */}
      {subtitle && (
        <motion.h2
          className={cn("font-semibold", variantStyles[effectiveVariant].subtitle, sizeStyles[size].subtitle)}
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
            variantStyles[effectiveVariant].description,
            sizeStyles[size].description,
          )}
          initial={animated ? { opacity: 0, y: 10 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {description}
        </motion.p>
      )}

      {/* Floating Particles - Mixed Colors */}
      {animated && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "absolute w-1 h-1 rounded-full",
                i % 4 === 0
                  ? "bg-emerald-400/30"
                  : i % 4 === 1
                    ? "bg-blue-400/30"
                    : i % 4 === 2 && premium
                      ? "bg-yellow-400/30"
                      : "bg-emerald-300/20",
              )}
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
