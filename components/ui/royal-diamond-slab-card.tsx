"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { LaserEngravedText } from "./laser-engraved-text"
import { DiamondParticleSystem } from "./diamond-particle-system"
import { useDiamondCardSounds } from "@/hooks/use-diamond-card-sounds"
import { useAchievementSystem } from "@/hooks/use-achievement-system"

export interface RoyalDiamondSlabCardProps {
  children?: React.ReactNode
  className?: string
  variant?: "emerald" | "sapphire" | "ruby" | "diamond" | "obsidian" | "platinum"
  size?: "sm" | "md" | "lg" | "xl"
  intensity?: "subtle" | "moderate" | "intense" | "maximum"
  laserPattern?: "classic" | "geometric" | "organic" | "circuit" | "royal" | "futuristic"
  achievementLevel?: number
  isUnlocked?: boolean
  premiumAnimation?: "none" | "celebration" | "achievement" | "royal-entrance" | "laser-show"
  soundEnabled?: boolean
  particleCount?: number
  interactive?: boolean
  title?: string
  subtitle?: string
  content?: string
  highlightWords?: string[]
  onHover?: () => void
  onClick?: () => void
}

const cardVariants = {
  emerald: {
    primary: "from-emerald-900 via-green-800 to-emerald-900",
    secondary: "from-emerald-500/30 via-green-400/20 to-emerald-500/30",
    accent: "emerald-400",
    glow: "emerald-500",
    particles: "emerald",
  },
  sapphire: {
    primary: "from-blue-900 via-indigo-800 to-blue-900",
    secondary: "from-blue-500/30 via-indigo-400/20 to-blue-500/30",
    accent: "blue-400",
    glow: "blue-500",
    particles: "sapphire",
  },
  ruby: {
    primary: "from-red-900 via-rose-800 to-red-900",
    secondary: "from-red-500/30 via-rose-400/20 to-red-500/30",
    accent: "red-400",
    glow: "red-500",
    particles: "ruby",
  },
  diamond: {
    primary: "from-slate-900 via-gray-800 to-slate-900",
    secondary: "from-white/30 via-gray-200/20 to-white/30",
    accent: "white",
    glow: "white",
    particles: "diamond",
  },
  obsidian: {
    primary: "from-black via-gray-900 to-black",
    secondary: "from-purple-500/30 via-indigo-400/20 to-purple-500/30",
    accent: "purple-400",
    glow: "purple-500",
    particles: "obsidian",
  },
  platinum: {
    primary: "from-gray-800 via-slate-700 to-gray-800",
    secondary: "from-silver/30 via-gray-300/20 to-silver/30",
    accent: "gray-300",
    glow: "gray-400",
    particles: "platinum",
  },
}

const sizeClasses = {
  sm: "w-64 h-40 p-4",
  md: "w-80 h-48 p-6",
  lg: "w-96 h-56 p-8",
  xl: "w-[28rem] h-64 p-10",
}

const laserPatterns = {
  classic: ["M0,0 L100,0 L100,100 L0,100 Z", "M20,20 L80,20 L80,80 L20,80 Z"],
  geometric: ["M50,0 L100,25 L100,75 L50,100 L0,75 L0,25 Z", "M25,25 L75,25 L75,75 L25,75 Z"],
  organic: [
    "M0,50 Q25,0 50,50 Q75,100 100,50 Q75,0 50,50 Q25,100 0,50",
    "M30,30 Q50,10 70,30 Q90,50 70,70 Q50,90 30,70 Q10,50 30,30",
  ],
  circuit: [
    "M0,25 L25,25 L25,0 L75,0 L75,25 L100,25 L100,75 L75,75 L75,100 L25,100 L25,75 L0,75 Z",
    "M20,40 L40,40 L40,20 L60,20 L60,40 L80,40 L80,60 L60,60 L60,80 L40,80 L40,60 L20,60 Z",
  ],
  royal: [
    "M50,0 L60,30 L90,30 L70,50 L80,80 L50,65 L20,80 L30,50 L10,30 L40,30 Z",
    "M50,15 L55,35 L75,35 L60,50 L65,70 L50,60 L35,70 L40,50 L25,35 L45,35 Z",
  ],
  futuristic: [
    "M0,0 L30,0 L40,10 L60,10 L70,0 L100,0 L100,30 L90,40 L90,60 L100,70 L100,100 L70,100 L60,90 L40,90 L30,100 L0,100 L0,70 L10,60 L10,40 L0,30 Z",
    "M15,15 L35,15 L40,20 L60,20 L65,15 L85,15 L85,35 L80,40 L80,60 L85,65 L85,85 L65,85 L60,80 L40,80 L35,85 L15,85 L15,65 L20,60 L20,40 L15,35 Z",
  ],
}

export function RoyalDiamondSlabCard({
  children,
  className,
  variant = "diamond",
  size = "md",
  intensity = "moderate",
  laserPattern = "classic",
  achievementLevel = 1,
  isUnlocked = true,
  premiumAnimation = "none",
  soundEnabled = true,
  particleCount = 50,
  interactive = true,
  title,
  subtitle,
  content,
  highlightWords = [],
  onHover,
  onClick,
}: RoyalDiamondSlabCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [isClicked, setIsClicked] = React.useState(false)
  const [showPremiumAnimation, setShowPremiumAnimation] = React.useState(false)
  const [laserActive, setLaserActive] = React.useState(false)
  const [particlesActive, setParticlesActive] = React.useState(false)

  const cardVariant = cardVariants[variant]
  const { playLaserCut, playDiamondChime, playAchievementSound, playHoverSound } = useDiamondCardSounds(soundEnabled)
  const { unlockAchievement, getAchievementLevel, isAchievementUnlocked } = useAchievementSystem()

  // Premium animation trigger
  React.useEffect(() => {
    if (premiumAnimation !== "none") {
      setShowPremiumAnimation(true)
      if (premiumAnimation === "achievement") {
        playAchievementSound()
      }
      const timer = setTimeout(() => setShowPremiumAnimation(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [premiumAnimation, playAchievementSound])

  // Laser activation on hover
  React.useEffect(() => {
    if (isHovered && interactive) {
      setLaserActive(true)
      setParticlesActive(true)
      playLaserCut()
      const timer = setTimeout(() => {
        setLaserActive(false)
        setParticlesActive(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isHovered, interactive, playLaserCut])

  const handleMouseEnter = () => {
    if (!interactive) return
    setIsHovered(true)
    playHoverSound()
    onHover?.()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleClick = () => {
    if (!interactive) return
    setIsClicked(true)
    playDiamondChime()
    onClick?.()
    setTimeout(() => setIsClicked(false), 300)
  }

  // Premium animation variants
  const premiumAnimationVariants = {
    celebration: {
      scale: [1, 1.1, 1.05, 1.1, 1],
      rotate: [0, 5, -5, 5, 0],
      transition: { duration: 2, repeat: 2 },
    },
    achievement: {
      scale: [1, 1.2, 1],
      y: [0, -20, 0],
      rotateY: [0, 360],
      transition: { duration: 3, ease: "easeInOut" },
    },
    "royal-entrance": {
      scale: [0, 1.3, 1],
      opacity: [0, 1],
      rotateX: [90, 0],
      transition: { duration: 2, ease: "easeOut" },
    },
    "laser-show": {
      scale: [1, 1.1, 1],
      boxShadow: ["0 0 20px rgba(255,255,255,0.3)", "0 0 60px rgba(255,255,255,0.8)", "0 0 20px rgba(255,255,255,0.3)"],
      transition: { duration: 4, repeat: 1 },
    },
  }

  if (!isUnlocked) {
    return (
      <motion.div
        className={cn(
          "relative rounded-xl border-2 border-dashed border-gray-500 bg-gray-900/50 backdrop-blur-sm",
          sizeClasses[size],
          className,
        )}
        whileHover={{ scale: 1.02 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="text-4xl">🔒</div>
            <LaserEngravedText
              text="Locked"
              className="text-gray-400"
              variant="gold"
              highlightColor="indigo"
              size="sm"
            />
            <p className="text-xs text-gray-500">Achievement Level {achievementLevel} Required</p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={cn("relative group cursor-pointer", sizeClasses[size], className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={interactive ? { scale: 1.02 } : {}}
      whileTap={interactive ? { scale: 0.98 } : {}}
      animate={
        showPremiumAnimation ? premiumAnimationVariants[premiumAnimation as keyof typeof premiumAnimationVariants] : {}
      }
    >
      {/* Diamond Particle System */}
      <AnimatePresence>
        {(particlesActive || showPremiumAnimation) && (
          <DiamondParticleSystem
            variant={cardVariant.particles as any}
            count={particleCount}
            intensity={intensity}
            active={particlesActive || showPremiumAnimation}
          />
        )}
      </AnimatePresence>

      {/* Main Card Container */}
      <motion.div
        className="relative w-full h-full rounded-xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${cardVariant.primary})`,
        }}
      >
        {/* Diamond Surface Pattern */}
        <div className="absolute inset-0">
          {/* Primary Diamond Layer */}
          <motion.div
            className={cn("absolute inset-0 opacity-30", `bg-gradient-to-br ${cardVariant.secondary}`)}
            animate={{
              backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
            }}
            transition={{ duration: 3, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 0%, transparent 50%),
                radial-gradient(circle at 75% 25%, rgba(255,255,255,0.2) 0%, transparent 50%),
                radial-gradient(circle at 25% 75%, rgba(255,255,255,0.2) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(255,255,255,0.3) 0%, transparent 50%),
                linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)
              `,
              backgroundSize: "50px 50px, 50px 50px, 50px 50px, 50px 50px, 100px 100px",
            }}
          />

          {/* Secondary Prismatic Layer */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: isHovered
                ? [
                    "linear-gradient(45deg, rgba(255,0,0,0.1), rgba(255,255,0,0.1), rgba(0,255,0,0.1), rgba(0,255,255,0.1), rgba(0,0,255,0.1), rgba(255,0,255,0.1))",
                    "linear-gradient(90deg, rgba(255,0,255,0.1), rgba(255,0,0,0.1), rgba(255,255,0,0.1), rgba(0,255,0,0.1), rgba(0,255,255,0.1), rgba(0,0,255,0.1))",
                    "linear-gradient(135deg, rgba(0,0,255,0.1), rgba(255,0,255,0.1), rgba(255,0,0,0.1), rgba(255,255,0,0.1), rgba(0,255,0,0.1), rgba(0,255,255,0.1))",
                  ]
                : "linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
            }}
            transition={{ duration: 2, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
          />

          {/* Laser Pattern Overlay */}
          <AnimatePresence>
            {laserActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {laserPatterns[laserPattern].map((path, index) => (
                    <motion.path
                      key={index}
                      d={path}
                      fill="none"
                      stroke={`rgb(var(--${cardVariant.glow}))`}
                      strokeWidth="0.5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: index * 0.3 }}
                      style={{
                        filter: `drop-shadow(0 0 5px rgb(var(--${cardVariant.glow})))`,
                      }}
                    />
                  ))}
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between">
          {/* Header */}
          {title && (
            <div className="space-y-2">
              <LaserEngravedText
                text={title}
                variant="gold"
                highlightColor="indigo"
                highlightWords={highlightWords}
                size={size === "xl" ? "lg" : size === "lg" ? "md" : "sm"}
                laserActive={laserActive}
                className="font-bold"
              />
              {subtitle && (
                <LaserEngravedText
                  text={subtitle}
                  variant="gold"
                  highlightColor="indigo"
                  size="xs"
                  laserActive={laserActive}
                  className="opacity-80"
                />
              )}
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center">
            {content ? (
              <LaserEngravedText
                text={content}
                variant="gold"
                highlightColor="indigo"
                highlightWords={highlightWords}
                size="sm"
                laserActive={laserActive}
                className="text-center"
              />
            ) : (
              children
            )}
          </div>

          {/* Achievement Level Indicator */}
          {achievementLevel > 1 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {[...Array(Math.min(achievementLevel, 5))].map((_, i) => (
                  <motion.div
                    key={i}
                    className={cn("w-2 h-2 rounded-full", `bg-${cardVariant.accent}`)}
                    animate={{
                      scale: isHovered ? [1, 1.2, 1] : 1,
                      opacity: isHovered ? [0.7, 1, 0.7] : 0.7,
                    }}
                    transition={{ delay: i * 0.1, duration: 0.5, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
                  />
                ))}
              </div>
              <LaserEngravedText
                text={`Level ${achievementLevel}`}
                variant="gold"
                highlightColor="indigo"
                size="xs"
                laserActive={laserActive}
                className="opacity-60"
              />
            </div>
          )}
        </div>

        {/* Glow Effects */}
        <motion.div
          className={cn("absolute inset-0 rounded-xl pointer-events-none")}
          animate={{
            boxShadow: isHovered
              ? [
                  `0 0 20px rgba(var(--${cardVariant.glow}), 0.3)`,
                  `0 0 40px rgba(var(--${cardVariant.glow}), 0.6)`,
                  `0 0 20px rgba(var(--${cardVariant.glow}), 0.3)`,
                ]
              : `0 0 10px rgba(var(--${cardVariant.glow}), 0.2)`,
          }}
          transition={{ duration: 2, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
        />

        {/* Click Ripple Effect */}
        <AnimatePresence>
          {isClicked && (
            <motion.div
              className={cn("absolute inset-0 rounded-xl pointer-events-none", `bg-${cardVariant.accent}/20`)}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          )}
        </AnimatePresence>

        {/* Premium Animation Overlay */}
        <AnimatePresence>
          {showPremiumAnimation && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Celebration Confetti */}
              {premiumAnimation === "celebration" && (
                <div className="absolute inset-0">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                      initial={{
                        x: "50%",
                        y: "50%",
                        scale: 0,
                      }}
                      animate={{
                        x: `${Math.random() * 100}%`,
                        y: `${Math.random() * 100}%`,
                        scale: [0, 1, 0],
                        rotate: 360,
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.1,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Achievement Burst */}
              {premiumAnimation === "achievement" && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 1 }}
                >
                  <div className="text-6xl">🏆</div>
                </motion.div>
              )}

              {/* Laser Show */}
              {premiumAnimation === "laser-show" && (
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={cn("absolute w-full h-0.5", `bg-${cardVariant.accent}`)}
                      style={{
                        top: `${(i + 1) * 12.5}%`,
                        transformOrigin: "left center",
                      }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: [0, 1, 0] }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.1,
                        repeat: 3,
                        repeatDelay: 0.5,
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
