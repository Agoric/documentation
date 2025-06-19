"use client"

import { motion } from "framer-motion"
import type { ReactNode, MouseEvent } from "react"
import { cn } from "@/lib/utils"
import { useCallback } from "react"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"

interface RegalDiamondSlabProps {
  children: ReactNode
  className?: string
  variant?: "default" | "premium" | "imperial" | "supreme"
  intensity?: "low" | "medium" | "high" | "divine"
  isHovered?: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  showAuthoritySeal?: boolean
}

export function RegalDiamondSlab({
  children,
  className,
  variant = "default",
  intensity = "medium",
  isHovered = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  showAuthoritySeal = false,
}: RegalDiamondSlabProps) {
  const getVariantStyles = useCallback(() => {
    switch (variant) {
      case "premium":
        return "from-purple-950/60 via-indigo-950/50 to-purple-950/60"
      case "imperial":
        return "from-purple-950/70 via-amber-950/60 to-purple-950/70"
      case "supreme":
        return "from-purple-950/80 via-amber-950/70 to-indigo-950/80"
      default:
        return "from-purple-950/40 via-indigo-950/30 to-purple-950/40"
    }
  }, [variant])

  const getRegalColors = useCallback(() => {
    switch (variant) {
      case "premium":
        return {
          primary: "rgb(168, 85, 247)", // Purple-500
          secondary: "rgb(251, 191, 36)", // Amber-400
          glow: "rgba(168, 85, 247, 0.4)",
          accent: "rgba(251, 191, 36, 0.3)",
        }
      case "imperial":
        return {
          primary: "rgb(251, 191, 36)", // Amber-400
          secondary: "rgb(168, 85, 247)", // Purple-500
          glow: "rgba(251, 191, 36, 0.4)",
          accent: "rgba(168, 85, 247, 0.3)",
        }
      case "supreme":
        return {
          primary: "rgb(251, 191, 36)", // Amber-400
          secondary: "rgb(147, 51, 234)", // Purple-600
          glow: "rgba(251, 191, 36, 0.5)",
          accent: "rgba(147, 51, 234, 0.4)",
        }
      default:
        return {
          primary: "rgb(168, 85, 247)", // Purple-500
          secondary: "rgb(251, 191, 36)", // Amber-400
          glow: "rgba(168, 85, 247, 0.3)",
          accent: "rgba(251, 191, 36, 0.2)",
        }
    }
  }, [variant])

  const handleClick = useCallback(
    (e: MouseEvent) => {
      try {
        e?.preventDefault?.()
        onClick?.()
      } catch (error) {
        console.error("Error in regal diamond slab click:", error)
      }
    },
    [onClick],
  )

  const handleMouseEnter = useCallback(
    (e: MouseEvent) => {
      try {
        onMouseEnter?.()
      } catch (error) {
        console.error("Error in regal diamond slab mouse enter:", error)
      }
    },
    [onMouseEnter],
  )

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      try {
        onMouseLeave?.()
      } catch (error) {
        console.error("Error in regal diamond slab mouse leave:", error)
      }
    },
    [onMouseLeave],
  )

  const colors = getRegalColors()
  const intensityMultiplier =
    {
      low: 0.5,
      medium: 1,
      high: 1.5,
      divine: 2.5,
    }[intensity] || 1

  const patternId = `regal-${variant}-${Math.random().toString(36).substr(2, 9)}`

  return (
    <motion.div
      className={cn("relative group cursor-pointer", className)}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02, rotateX: 2 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Roman-style Diamond Slab Base */}
      <div
        className={cn("relative overflow-hidden backdrop-blur-sm", "bg-gradient-to-br", getVariantStyles())}
        style={{
          clipPath: "polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%)",
          border: `2px solid ${colors.primary}40`,
          boxShadow: `0 8px 32px ${colors.glow}`,
        }}
      >
        {/* Roman Column Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id={patternId} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                {/* Roman Column */}
                <rect x="25" y="0" width="10" height="60" fill={colors.primary} opacity="0.2" />
                <rect x="20" y="5" width="20" height="5" fill={colors.secondary} opacity="0.3" />
                <rect x="20" y="50" width="20" height="5" fill={colors.secondary} opacity="0.3" />
                {/* Laurel Leaves */}
                <path
                  d="M10,20 Q15,25 10,30 Q5,25 10,20 M50,20 Q55,25 50,30 Q45,25 50,20"
                  fill={colors.accent}
                  opacity="0.4"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
        </div>

        {/* Holographic Regal Layers */}
        <div className="absolute inset-0">
          {/* Base imperial layer */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: `linear-gradient(45deg, ${colors.primary}30, transparent, ${colors.secondary}30, transparent, ${colors.accent})`,
            }}
            animate={{
              backgroundPosition: isHovered ? ["0% 0%", "100% 100%", "0% 0%"] : ["0% 0%", "25% 25%"],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Roman-style etched lines */}
          <div className="absolute inset-0">
            {/* Horizontal imperial lines */}
            {Array.from({ length: 6 }, (_, i) => (
              <motion.div
                key={`h-${i}`}
                className="absolute h-0.5 opacity-40"
                style={{
                  background: `linear-gradient(90deg, transparent, ${colors.primary}, ${colors.secondary}, ${colors.primary}, transparent)`,
                  top: `${16.67 * (i + 1)}%`,
                  left: "10%",
                  right: "10%",
                }}
                animate={{
                  opacity: isHovered ? [0.4, 0.8, 0.4] : 0.4,
                  scaleX: isHovered ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.15,
                }}
              />
            ))}

            {/* Vertical imperial columns */}
            {Array.from({ length: 4 }, (_, i) => (
              <motion.div
                key={`v-${i}`}
                className="absolute w-0.5 opacity-30"
                style={{
                  background: `linear-gradient(180deg, transparent, ${colors.secondary}, ${colors.primary}, ${colors.secondary}, transparent)`,
                  left: `${25 * (i + 1)}%`,
                  top: "15%",
                  bottom: "15%",
                }}
                animate={{
                  opacity: isHovered ? [0.3, 0.7, 0.3] : 0.3,
                  scaleY: isHovered ? [1, 1.3, 1] : 1,
                }}
                transition={{
                  duration: 3 + i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>

          {/* Imperial illumination particles */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: Math.floor(15 * intensityMultiplier) }, (_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${colors.primary}, ${colors.secondary})`,
                    boxShadow: `0 0 8px ${colors.glow}`,
                  }}
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                    y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                    opacity: [0, 1, 0],
                    scale: [0, 1.2, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          )}

          {/* Roman-style edge illumination */}
          <motion.div
            className="absolute inset-0"
            style={{
              boxShadow: `inset 0 0 30px ${colors.glow}, inset 0 0 60px ${colors.accent}`,
              clipPath: "polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%)",
            }}
            animate={{
              opacity: isHovered ? [0.4, 0.8, 0.4] : 0.4,
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Imperial scan line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-0.5 opacity-70"
            style={{
              background: `linear-gradient(90deg, transparent, ${colors.primary}, ${colors.secondary}, ${colors.primary}, transparent)`,
              boxShadow: `0 0 15px ${colors.glow}`,
            }}
            animate={{
              y: isHovered ? ["0%", "100%", "0%"] : "0%",
              opacity: isHovered ? [0.7, 1, 0.7] : 0.7,
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        {/* Roman corner ornaments */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-amber-400/60" />
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-amber-400/60" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-amber-400/60" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-amber-400/60" />

        {/* Supreme Authority Seal */}
        {showAuthoritySeal && (
          <div className="absolute top-3 right-3">
            <SupremeAuthorityCoin size="sm" variant="seal" animated={isHovered} />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 p-1">{children}</div>
      </div>

      {/* Imperial aura */}
      <motion.div
        className="absolute inset-0 -z-10 blur-2xl opacity-20"
        style={{
          background: `radial-gradient(ellipse, ${colors.glow}, ${colors.accent}, transparent)`,
          clipPath: "polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%)",
        }}
        animate={{
          scale: isHovered ? [1, 1.15, 1] : 1,
          opacity: isHovered ? [0.2, 0.5, 0.2] : 0.2,
        }}
        transition={{
          duration: 2.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  )
}
