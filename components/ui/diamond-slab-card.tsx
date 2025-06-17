"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface DiamondSlabCardProps {
  children: ReactNode
  className?: string
  variant?: "default" | "premium" | "elite" | "quantum"
  intensity?: "low" | "medium" | "high" | "extreme"
  laserColor?: "cyan" | "purple" | "gold" | "emerald" | "crimson"
  isHovered?: boolean
  onClick?: () => void
}

export function DiamondSlabCard({
  children,
  className,
  variant = "default",
  intensity = "medium",
  laserColor = "cyan",
  isHovered = false,
  onClick,
}: DiamondSlabCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "premium":
        return "from-indigo-950/60 via-purple-950/50 to-cyan-950/60"
      case "elite":
        return "from-purple-950/70 via-pink-950/60 to-indigo-950/70"
      case "quantum":
        return "from-cyan-950/80 via-blue-950/70 to-purple-950/80"
      default:
        return "from-indigo-950/40 via-purple-950/30 to-cyan-950/40"
    }
  }

  const getLaserColor = () => {
    switch (laserColor) {
      case "purple":
        return {
          primary: "rgb(147, 51, 234)",
          secondary: "rgb(168, 85, 247)",
          glow: "rgba(147, 51, 234, 0.4)",
        }
      case "gold":
        return {
          primary: "rgb(251, 191, 36)",
          secondary: "rgb(245, 158, 11)",
          glow: "rgba(251, 191, 36, 0.4)",
        }
      case "emerald":
        return {
          primary: "rgb(16, 185, 129)",
          secondary: "rgb(52, 211, 153)",
          glow: "rgba(16, 185, 129, 0.4)",
        }
      case "crimson":
        return {
          primary: "rgb(239, 68, 68)",
          secondary: "rgb(248, 113, 113)",
          glow: "rgba(239, 68, 68, 0.4)",
        }
      default:
        return {
          primary: "rgb(34, 211, 238)",
          secondary: "rgb(103, 232, 249)",
          glow: "rgba(34, 211, 238, 0.4)",
        }
    }
  }

  const colors = getLaserColor()
  const intensityMultiplier = {
    low: 0.5,
    medium: 1,
    high: 1.5,
    extreme: 2,
  }[intensity]

  return (
    <motion.div
      className={cn("relative group cursor-pointer", className)}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Diamond Slab Base */}
      <div
        className={cn("relative overflow-hidden backdrop-blur-sm", "bg-gradient-to-br", getVariantStyles())}
        style={{
          clipPath: "polygon(15px 0%, 100% 0%, calc(100% - 15px) 100%, 0% 100%)",
          border: `1px solid ${colors.primary}40`,
        }}
      >
        {/* Holographic Background Layers */}
        <div className="absolute inset-0">
          {/* Base holographic layer */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: `linear-gradient(45deg, ${colors.primary}20, transparent, ${colors.secondary}20)`,
            }}
            animate={{
              backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : ["0% 0%", "50% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Laser etched lines */}
          <div className="absolute inset-0">
            {/* Horizontal laser lines */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`h-${i}`}
                className="absolute h-px opacity-30"
                style={{
                  background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
                  top: `${12.5 * (i + 1)}%`,
                  left: "5%",
                  right: "5%",
                }}
                animate={{
                  opacity: isHovered ? [0.3, 0.8, 0.3] : 0.3,
                  scaleX: isHovered ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 2 + i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.1,
                }}
              />
            ))}

            {/* Vertical laser lines */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`v-${i}`}
                className="absolute w-px opacity-20"
                style={{
                  background: `linear-gradient(180deg, transparent, ${colors.secondary}, transparent)`,
                  left: `${16.67 * (i + 1)}%`,
                  top: "10%",
                  bottom: "10%",
                }}
                animate={{
                  opacity: isHovered ? [0.2, 0.6, 0.2] : 0.2,
                  scaleY: isHovered ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 2.5 + i * 0.15,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.08,
                }}
              />
            ))}
          </div>

          {/* Diamond pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id={`diamond-${variant}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M20,0 L40,20 L20,40 L0,20 Z"
                    fill="none"
                    stroke={colors.primary}
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#diamond-${variant})`} />
            </svg>
          </div>

          {/* Laser illumination particles */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(Math.floor(12 * intensityMultiplier))].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${colors.primary}, ${colors.secondary})`,
                    boxShadow: `0 0 6px ${colors.glow}`,
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
                    scale: [0, 1, 0],
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

          {/* Edge glow effect */}
          <motion.div
            className="absolute inset-0 rounded-sm"
            style={{
              boxShadow: `inset 0 0 20px ${colors.glow}`,
              clipPath: "polygon(15px 0%, 100% 0%, calc(100% - 15px) 100%, 0% 100%)",
            }}
            animate={{
              opacity: isHovered ? [0.3, 0.7, 0.3] : 0.3,
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Laser scan line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px opacity-60"
            style={{
              background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
              boxShadow: `0 0 10px ${colors.glow}`,
            }}
            animate={{
              y: isHovered ? ["0%", "100%", "0%"] : "0%",
              opacity: isHovered ? [0.6, 1, 0.6] : 0.6,
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>

      {/* Holographic aura */}
      <motion.div
        className="absolute inset-0 -z-10 blur-xl opacity-20"
        style={{
          background: `radial-gradient(ellipse, ${colors.glow}, transparent)`,
          clipPath: "polygon(15px 0%, 100% 0%, calc(100% - 15px) 100%, 0% 100%)",
        }}
        animate={{
          scale: isHovered ? [1, 1.1, 1] : 1,
          opacity: isHovered ? [0.2, 0.4, 0.2] : 0.2,
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  )
}
