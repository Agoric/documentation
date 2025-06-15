"use client"

import { motion } from "framer-motion"
import { Sparkles, Star, Crown } from "lucide-react"
import { useState } from "react"

interface HolographicLabelProps {
  variant?: "standard" | "premium" | "exclusive"
  features?: string[]
  className?: string
}

export function HolographicLabel({ variant = "standard", features = [], className = "" }: HolographicLabelProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getVariantConfig = () => {
    switch (variant) {
      case "premium":
        return {
          icon: <Crown className="w-3 h-3" />,
          text: "HOLOGRAPHIC",
          gradient: "from-cyan-400 via-indigo-400 to-purple-400",
          bgGradient: "from-cyan-600/30 via-indigo-600/30 to-purple-600/30",
          borderGradient: "from-cyan-400/60 to-purple-400/60",
          glowColor: "shadow-cyan-400/50",
          particles: 8,
        }
      case "exclusive":
        return {
          icon: <Star className="w-3 h-3 fill-current" />,
          text: "EXCLUSIVE HOLO",
          gradient: "from-yellow-400 via-orange-400 to-red-400",
          bgGradient: "from-yellow-600/30 via-orange-600/30 to-red-600/30",
          borderGradient: "from-yellow-400/60 to-red-400/60",
          glowColor: "shadow-yellow-400/50",
          particles: 12,
        }
      default:
        return {
          icon: <Sparkles className="w-3 h-3" />,
          text: "HOLO",
          gradient: "from-cyan-300 to-indigo-300",
          bgGradient: "from-cyan-600/20 to-indigo-600/20",
          borderGradient: "from-cyan-400/40 to-indigo-400/40",
          glowColor: "shadow-cyan-400/30",
          particles: 4,
        }
    }
  }

  const config = getVariantConfig()

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Label */}
      <motion.div
        className={`relative overflow-hidden rounded-md border bg-gradient-to-r ${config.bgGradient} border-gradient-to-r ${config.borderGradient} backdrop-blur-sm`}
        animate={{
          boxShadow: isHovered
            ? [`0 0 10px rgba(6, 182, 212, 0.3)`, `0 0 20px rgba(6, 182, 212, 0.5)`, `0 0 10px rgba(6, 182, 212, 0.3)`]
            : `0 0 5px rgba(6, 182, 212, 0.2)`,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
          ease: "easeInOut",
        }}
      >
        {/* Animated Background Gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-20`}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />

        {/* Floating Particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(config.particles)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-0.5 h-0.5 bg-gradient-to-r ${config.gradient} rounded-full`}
                animate={{
                  x: [0, Math.random() * 30 - 15],
                  y: [0, Math.random() * 30 - 15],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.1,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        )}

        {/* Label Content */}
        <div className="relative z-10 flex items-center gap-1 px-2 py-1">
          <motion.div
            animate={{
              rotate: isHovered ? [0, 360] : 0,
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
              ease: "linear",
            }}
          >
            <div className={`text-transparent bg-gradient-to-r ${config.gradient} bg-clip-text`}>{config.icon}</div>
          </motion.div>
          <span
            className={`text-xs font-bold text-transparent bg-gradient-to-r ${config.gradient} bg-clip-text tracking-wider`}
          >
            {config.text}
          </span>
        </div>

        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          animate={{
            x: isHovered ? ["-100%", "100%"] : "-100%",
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Feature Tooltip */}
      {features.length > 0 && isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          className="absolute top-full left-0 mt-2 z-50 min-w-max"
        >
          <div className="bg-black/90 backdrop-blur-md border border-cyan-400/30 rounded-lg p-3 shadow-lg">
            <div className="text-xs font-semibold text-cyan-300 mb-2">Holographic Features:</div>
            <div className="space-y-1">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                  <span className="text-xs text-white">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
