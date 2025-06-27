"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Sparkles, Zap, Star, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface CursorOrbProps {
  className?: string
  variant?: "default" | "holographic" | "quantum" | "neural"
  size?: "sm" | "md" | "lg"
  showTrail?: boolean
  showParticles?: boolean
}

export function CursorOrb({
  className,
  variant = "holographic",
  size = "md",
  showTrail = true,
  showParticles = true,
}: CursorOrbProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [isHovering, setIsHovering] = React.useState(false)
  const [trailPositions, setTrailPositions] = React.useState<{ x: number; y: number; id: number }[]>([])

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Size configurations
  const sizeConfig = {
    sm: { orb: 16, trail: 8, particles: 4 },
    md: { orb: 24, trail: 12, particles: 6 },
    lg: { orb: 32, trail: 16, particles: 8 },
  }

  const currentSize = sizeConfig[size]

  // Variant configurations
  const variantConfig = {
    default: {
      gradient: "from-blue-500 to-purple-500",
      glow: "shadow-blue-500/50",
      particles: Circle,
    },
    holographic: {
      gradient: "from-cyan-400 via-blue-500 to-purple-600",
      glow: "shadow-cyan-500/50",
      particles: Sparkles,
    },
    quantum: {
      gradient: "from-green-400 via-cyan-500 to-blue-600",
      glow: "shadow-green-500/50",
      particles: Zap,
    },
    neural: {
      gradient: "from-yellow-400 via-orange-500 to-red-600",
      glow: "shadow-yellow-500/50",
      particles: Star,
    },
  }

  const currentVariant = variantConfig[variant]

  React.useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - currentSize.orb / 2)
      cursorY.set(e.clientY - currentSize.orb / 2)
      setIsVisible(true)

      // Update trail positions
      if (showTrail) {
        setTrailPositions((prev) => {
          const newTrail = [
            { x: e.clientX, y: e.clientY, id: Date.now() },
            ...prev.slice(0, 8), // Keep last 8 positions
          ]
          return newTrail
        })
      }

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.closest(".cursor-pointer")

      setIsHovering(!!isInteractive)
    }

    const hideCursor = () => setIsVisible(false)

    window.addEventListener("mousemove", updateCursor)
    window.addEventListener("mouseleave", hideCursor)

    return () => {
      window.removeEventListener("mousemove", updateCursor)
      window.removeEventListener("mouseleave", hideCursor)
    }
  }, [cursorX, cursorY, currentSize.orb, showTrail])

  if (!isVisible) return null

  return (
    <div className={cn("fixed top-0 left-0 pointer-events-none z-[10000]", className)}>
      {/* Trail Effect */}
      {showTrail &&
        trailPositions.map((pos, index) => (
          <motion.div
            key={pos.id}
            className={cn("absolute rounded-full bg-gradient-to-r opacity-30 blur-sm", currentVariant.gradient)}
            style={{
              left: pos.x - currentSize.trail / 2,
              top: pos.y - currentSize.trail / 2,
              width: currentSize.trail * (1 - index * 0.1),
              height: currentSize.trail * (1 - index * 0.1),
            }}
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          />
        ))}

      {/* Main Orb */}
      <motion.div
        className={cn(
          "absolute rounded-full bg-gradient-to-r backdrop-blur-sm border border-white/20 shadow-2xl",
          currentVariant.gradient,
          currentVariant.glow,
        )}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: currentSize.orb,
          height: currentSize.orb,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          rotate: 360,
        }}
        transition={{
          scale: { duration: 0.2 },
          rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
        }}
      >
        {/* Inner Glow */}
        <motion.div
          className={cn("absolute inset-1 rounded-full bg-gradient-to-r opacity-60", currentVariant.gradient)}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Center Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-white rounded-full" />
        </div>
      </motion.div>

      {/* Particle Effects */}
      {showParticles &&
        [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
            }}
            animate={{
              x: [0, Math.cos(i * 60) * 30, 0],
              y: [0, Math.sin(i * 60) * 30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          >
            <currentVariant.particles
              className={cn("text-white/60", `w-${currentSize.particles} h-${currentSize.particles}`)}
            />
          </motion.div>
        ))}

      {/* Hover Ring */}
      {isHovering && (
        <motion.div
          className={cn("absolute rounded-full border-2 border-white/40", currentVariant.glow)}
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            width: currentSize.orb * 2,
            height: currentSize.orb * 2,
            left: -currentSize.orb / 2,
            top: -currentSize.orb / 2,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </div>
  )
}
