"use client"

import { motion, useAnimation } from "framer-motion"
import { Sparkles, Star, Crown, Zap, Gem, Hexagon } from "lucide-react"
import { useState, useEffect } from "react"

interface HolographicLabelProps {
  variant?: "standard" | "premium" | "exclusive"
  features?: string[]
  className?: string
}

export function HolographicLabel({ variant = "standard", features = [], className = "" }: HolographicLabelProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [animationPhase, setAnimationPhase] = useState(0)
  const controls = useAnimation()

  // Complex animation sequence for premium labels
  useEffect(() => {
    if (variant === "premium" || variant === "exclusive") {
      const sequence = async () => {
        while (true) {
          // Phase 1: Pulse and expand
          await controls.start({
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0],
            transition: { duration: 2, ease: "easeInOut" },
          })

          // Phase 2: Shimmer wave
          setAnimationPhase(1)
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Phase 3: Particle burst
          setAnimationPhase(2)
          await new Promise((resolve) => setTimeout(resolve, 1500))

          // Phase 4: Reset
          setAnimationPhase(0)
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }
      }

      if (isHovered) {
        sequence()
      }
    }
  }, [isHovered, variant, controls])

  const getVariantConfig = () => {
    switch (variant) {
      case "premium":
        return {
          icon: <Crown className="w-3 h-3" />,
          secondaryIcon: <Gem className="w-2 h-2" />,
          text: "HOLOGRAPHIC",
          gradient: "from-cyan-400 via-indigo-400 to-purple-400",
          bgGradient: "from-cyan-600/30 via-indigo-600/30 to-purple-600/30",
          borderGradient: "from-cyan-400/60 to-purple-400/60",
          glowColor: "shadow-cyan-400/50",
          particles: 12,
          complexAnimations: true,
        }
      case "exclusive":
        return {
          icon: <Star className="w-3 h-3 fill-current" />,
          secondaryIcon: <Zap className="w-2 h-2" />,
          text: "EXCLUSIVE HOLO",
          gradient: "from-yellow-400 via-orange-400 to-red-400",
          bgGradient: "from-yellow-600/30 via-orange-600/30 to-red-600/30",
          borderGradient: "from-yellow-400/60 to-red-400/60",
          glowColor: "shadow-yellow-400/50",
          particles: 16,
          complexAnimations: true,
        }
      default:
        return {
          icon: <Sparkles className="w-3 h-3" />,
          secondaryIcon: <Hexagon className="w-2 h-2" />,
          text: "HOLO",
          gradient: "from-cyan-300 to-indigo-300",
          bgGradient: "from-cyan-600/20 to-indigo-600/20",
          borderGradient: "from-cyan-400/40 to-indigo-400/40",
          glowColor: "shadow-cyan-400/30",
          particles: 6,
          complexAnimations: false,
        }
    }
  }

  const config = getVariantConfig()

  // Complex particle animation variants
  const particleVariants = {
    burst: {
      scale: [0, 1.5, 0],
      opacity: [0, 1, 0],
      rotate: [0, 180, 360],
      transition: { duration: 1.5, ease: "easeOut" },
    },
    orbit: {
      rotate: 360,
      transition: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
    },
    float: {
      y: [-5, 5, -5],
      x: [-2, 2, -2],
      transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
    },
  }

  // Advanced shimmer patterns
  const shimmerVariants = {
    wave: {
      x: ["-200%", "200%"],
      transition: { duration: 2, ease: "easeInOut" },
    },
    spiral: {
      x: ["-100%", "100%"],
      rotate: [0, 360],
      transition: { duration: 2.5, ease: "easeInOut" },
    },
  }

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Label Container */}
      <motion.div
        animate={controls}
        className={`relative overflow-hidden rounded-md border bg-gradient-to-r ${config.bgGradient} border-gradient-to-r ${config.borderGradient} backdrop-blur-sm`}
        style={{
          boxShadow:
            isHovered && config.complexAnimations
              ? `0 0 20px rgba(6, 182, 212, 0.6), 0 0 40px rgba(6, 182, 212, 0.4), 0 0 60px rgba(6, 182, 212, 0.2)`
              : `0 0 10px rgba(6, 182, 212, 0.3)`,
        }}
      >
        {/* Animated Background Layers */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-20`}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            opacity: isHovered ? [0.2, 0.4, 0.2] : 0.2,
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

        {/* Secondary Gradient Layer for Premium */}
        {config.complexAnimations && (
          <motion.div
            className={`absolute inset-0 bg-gradient-to-l ${config.gradient} opacity-10`}
            animate={{
              backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
              opacity: isHovered ? [0.1, 0.3, 0.1] : 0.1,
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: 1,
            }}
            style={{
              backgroundSize: "300% 300%",
            }}
          />
        )}

        {/* Complex Particle System */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Primary Particles */}
            {[...Array(config.particles)].map((_, i) => (
              <motion.div
                key={`primary-${i}`}
                className={`absolute w-1 h-1 bg-gradient-to-r ${config.gradient} rounded-full`}
                variants={particleVariants}
                animate={animationPhase === 2 ? "burst" : "float"}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                transition={{
                  delay: i * 0.1,
                  duration: Math.random() * 2 + 1,
                  repeat: animationPhase !== 2 ? Number.POSITIVE_INFINITY : 0,
                }}
              />
            ))}

            {/* Orbiting Particles for Premium */}
            {config.complexAnimations &&
              [...Array(4)].map((_, i) => (
                <motion.div
                  key={`orbit-${i}`}
                  className="absolute w-0.5 h-0.5 bg-white rounded-full"
                  animate={{
                    rotate: 360,
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                    transformOrigin: `${15 + i * 5}px center`,
                  }}
                />
              ))}

            {/* Energy Rings for Exclusive */}
            {variant === "exclusive" && (
              <motion.div
                className="absolute inset-0 border border-yellow-400/30 rounded-md"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            )}
          </div>
        )}

        {/* Label Content with Complex Animations */}
        <div className="relative z-10 flex items-center gap-1 px-2 py-1">
          {/* Primary Icon with Complex Animation */}
          <motion.div
            animate={
              config.complexAnimations && isHovered
                ? {
                    rotate: [0, 360, 720],
                    scale: [1, 1.2, 1],
                    filter: [
                      "hue-rotate(0deg) brightness(1)",
                      "hue-rotate(180deg) brightness(1.5)",
                      "hue-rotate(360deg) brightness(1)",
                    ],
                  }
                : { rotate: isHovered ? 360 : 0 }
            }
            transition={{
              duration: config.complexAnimations ? 3 : 2,
              repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
              ease: config.complexAnimations ? "easeInOut" : "linear",
            }}
          >
            <div className={`text-transparent bg-gradient-to-r ${config.gradient} bg-clip-text`}>{config.icon}</div>
          </motion.div>

          {/* Secondary Icon for Premium/Exclusive */}
          {config.complexAnimations && (
            <motion.div
              animate={
                isHovered
                  ? {
                      rotate: [0, -360],
                      scale: [0.8, 1.1, 0.8],
                      opacity: [0.6, 1, 0.6],
                    }
                  : { opacity: 0.6 }
              }
              transition={{
                duration: 2.5,
                repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <div className={`text-transparent bg-gradient-to-r ${config.gradient} bg-clip-text`}>
                {config.secondaryIcon}
              </div>
            </motion.div>
          )}

          {/* Animated Text */}
          <motion.span
            className={`text-xs font-bold text-transparent bg-gradient-to-r ${config.gradient} bg-clip-text tracking-wider`}
            animate={
              config.complexAnimations && isHovered
                ? {
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    textShadow: [
                      "0 0 5px rgba(6, 182, 212, 0.5)",
                      "0 0 10px rgba(6, 182, 212, 0.8)",
                      "0 0 5px rgba(6, 182, 212, 0.5)",
                    ],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
              ease: "linear",
            }}
            style={{
              backgroundSize: config.complexAnimations ? "200% 200%" : "100% 100%",
            }}
          >
            {config.text}
          </motion.span>
        </div>

        {/* Advanced Shimmer Effects */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
          variants={shimmerVariants}
          animate={isHovered ? (animationPhase === 1 ? "spiral" : "wave") : "wave"}
          transition={{
            duration: config.complexAnimations ? 2.5 : 1.5,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            repeatDelay: config.complexAnimations ? 3 : 2,
            ease: "easeInOut",
          }}
        />

        {/* Holographic Scan Lines for Premium */}
        {config.complexAnimations && isHovered && (
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(6, 182, 212, 0.3) 2px,
                rgba(6, 182, 212, 0.3) 4px
              )`,
            }}
            animate={{
              x: ["-100%", "100%"],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        )}
      </motion.div>

      {/* Enhanced Feature Tooltip */}
      {features.length > 0 && isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, y: 10, scale: 0.9, rotateX: -10 }}
          className="absolute top-full left-0 mt-2 z-50 min-w-max"
        >
          <motion.div
            className="bg-black/95 backdrop-blur-md border border-cyan-400/40 rounded-lg p-3 shadow-2xl"
            animate={{
              boxShadow: [
                "0 0 20px rgba(6, 182, 212, 0.3)",
                "0 0 30px rgba(6, 182, 212, 0.5)",
                "0 0 20px rgba(6, 182, 212, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="text-xs font-semibold text-cyan-300 mb-2 flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="w-3 h-3" />
              </motion.div>
              Holographic Features:
            </div>
            <div className="space-y-1">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="w-1 h-1 bg-cyan-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.2,
                    }}
                  />
                  <span className="text-xs text-white">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
