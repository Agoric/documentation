"use client"

import { useEffect, useState, useRef } from "react"
import { Sparkles, Star, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CursorOrbProps {
  enabled?: boolean
}

interface TrailPoint {
  x: number
  y: number
  id: number
  timestamp: number
}

export function CursorOrb({ enabled = true }: CursorOrbProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const trailIdRef = useRef(0)

  useEffect(() => {
    if (!enabled) return

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setMousePosition(newPosition)
      setIsVisible(true)

      // Add new trail point
      const newTrailPoint: TrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: trailIdRef.current++,
        timestamp: Date.now(),
      }

      setTrail((prevTrail) => {
        const updatedTrail = [...prevTrail, newTrailPoint]
        // Keep only the last 15 trail points
        return updatedTrail.slice(-15)
      })
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    // Clean up old trail points
    const trailCleanup = setInterval(() => {
      const now = Date.now()
      setTrail((prevTrail) => prevTrail.filter((point) => now - point.timestamp < 1000))
    }, 100)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      clearInterval(trailCleanup)
    }
  }, [enabled])

  if (!enabled || !isVisible) return null

  return (
    <div className={cn("fixed inset-0 pointer-events-none z-[10000]", "")}>
      {/* Trail Points */}
      {trail.map((point, index) => {
        const age = Date.now() - point.timestamp
        const opacity = Math.max(0, 1 - age / 1000)
        const scale = Math.max(0.1, 1 - age / 1000)

        return (
          <motion.div
            key={point.id}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute"
            style={{
              left: point.x - 4,
              top: point.y - 4,
              opacity,
              transform: `scale(${scale})`,
            }}
          >
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
          </motion.div>
        )
      })}

      {/* Main Orb */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 0.5,
        }}
      >
        {/* Outer Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute inset-0 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400/30 to-blue-500/30 blur-md animate-pulse"
        />

        {/* Rotating Ring */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute inset-1 w-6 h-6 rounded-full border border-cyan-400/50 animate-spin"
          style={{ animationDuration: "3s" }}
        />

        {/* Core Orb */}
        <motion.div
          animate={{
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute inset-2 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse shadow-lg shadow-cyan-500/50"
        >
          <motion.div className="absolute inset-0.5 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
        </motion.div>

        {/* Orbiting Icons */}
        <motion.div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
          <motion.div className="absolute w-3 h-3 text-cyan-300 -top-1 left-1/2 transform -translate-x-1/2">
            <Sparkles />
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: "4s", animationDirection: "reverse" }}
        >
          <motion.div className="absolute w-3 h-3 text-blue-300 top-1/2 -right-1 transform -translate-y-1/2">
            <Star />
          </motion.div>
        </motion.div>
        <motion.div className="absolute inset-0 animate-spin" style={{ animationDuration: "5s" }}>
          <motion.div className="absolute w-3 h-3 text-purple-300 -bottom-1 left-1/2 transform -translate-x-1/2">
            <Zap />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
