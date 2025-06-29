"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface DiamondParticleSystemProps {
  variant: "emerald" | "sapphire" | "ruby" | "diamond" | "obsidian" | "platinum"
  count?: number
  intensity?: "subtle" | "moderate" | "intense" | "maximum"
  active?: boolean
  className?: string
}

const particleColors = {
  emerald: ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0"],
  sapphire: ["#3b82f6", "#60a5fa", "#93c5fd", "#dbeafe"],
  ruby: ["#ef4444", "#f87171", "#fca5a5", "#fecaca"],
  diamond: ["#ffffff", "#f8fafc", "#e2e8f0", "#cbd5e1"],
  obsidian: ["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe"],
  platinum: ["#6b7280", "#9ca3af", "#d1d5db", "#f3f4f6"],
}

const intensitySettings = {
  subtle: { count: 15, speed: 0.5, size: 2 },
  moderate: { count: 30, speed: 1, size: 3 },
  intense: { count: 50, speed: 1.5, size: 4 },
  maximum: { count: 80, speed: 2, size: 5 },
}

export function DiamondParticleSystem({
  variant,
  count: propCount,
  intensity = "moderate",
  active = true,
  className,
}: DiamondParticleSystemProps) {
  const settings = intensitySettings[intensity]
  const count = propCount || settings.count
  const colors = particleColors[variant]

  const particles = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      size: Math.random() * settings.size + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }))
  }, [count, colors, settings.size])

  return (
    <AnimatePresence>
      {active && (
        <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                backgroundColor: particle.color,
                width: particle.size,
                height: particle.size,
                left: `${particle.initialX}%`,
                top: `${particle.initialY}%`,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              }}
              initial={{
                opacity: 0,
                scale: 0,
                rotate: 0,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1.2, 0],
                rotate: 360,
                x: [0, Math.random() * 100 - 50, Math.random() * 200 - 100],
                y: [0, Math.random() * 100 - 50, Math.random() * 200 - 100],
              }}
              exit={{
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration: particle.duration * settings.speed,
                delay: particle.delay,
                ease: "easeOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: Math.random() * 3 + 1,
              }}
            />
          ))}

          {/* Floating Diamond Shapes */}
          {Array.from({ length: Math.floor(count / 5) }).map((_, i) => (
            <motion.div
              key={`diamond-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
                x: [0, Math.random() * 150 - 75],
                y: [0, Math.random() * 150 - 75],
              }}
              transition={{
                duration: 4 * settings.speed,
                delay: Math.random() * 3,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: Math.random() * 5 + 2,
              }}
            >
              <svg
                width={settings.size * 3}
                height={settings.size * 3}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 3h12l4 6-10 12L2 9l4-6z"
                  fill={colors[Math.floor(Math.random() * colors.length)]}
                  fillOpacity="0.6"
                  stroke={colors[0]}
                  strokeWidth="1"
                />
              </svg>
            </motion.div>
          ))}

          {/* Sparkle Effects */}
          {Array.from({ length: Math.floor(count / 3) }).map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: [0, 90, 180],
              }}
              transition={{
                duration: 1.5 * settings.speed,
                delay: Math.random() * 4,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: Math.random() * 3 + 1,
              }}
            >
              <svg
                width={settings.size * 2}
                height={settings.size * 2}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 0l3 9h9l-7.5 5.5L19 24l-7-5-7 5 2.5-9.5L0 9h9l3-9z"
                  fill={colors[Math.floor(Math.random() * colors.length)]}
                  fillOpacity="0.8"
                />
              </svg>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}
