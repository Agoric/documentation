"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Sparkles, Star, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface CursorOrbProps {
  className?: string
  isEnabled?: boolean
}

export function CursorOrb({ className, isEnabled = true }: CursorOrbProps) {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = React.useState(false)
  const [trailElements, setTrailElements] = React.useState<Array<{ x: number; y: number; id: number }>>([])

  React.useEffect(() => {
    if (!isEnabled) return

    let trailId = 0
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setMousePosition(newPosition)
      setIsVisible(true)

      // Add trail element
      const newTrailElement = {
        x: e.clientX,
        y: e.clientY,
        id: trailId++,
      }

      setTrailElements((prev) => [...prev.slice(-8), newTrailElement])
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      setTrailElements([])
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isEnabled])

  // Clean up old trail elements
  React.useEffect(() => {
    const cleanup = setTimeout(() => {
      setTrailElements((prev) => prev.slice(1))
    }, 100)

    return () => clearTimeout(cleanup)
  }, [trailElements])

  if (!isEnabled || !isVisible) return null

  return (
    <div className={cn("fixed pointer-events-none z-[10000]", className)}>
      {/* Trail Elements */}
      {trailElements.map((element, index) => (
        <motion.div
          key={element.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute"
          style={{
            left: element.x - 8,
            top: element.y - 8,
          }}
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400/60 to-blue-500/60 blur-sm" />
        </motion.div>
      ))}

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
          className="absolute inset-0 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 blur-lg"
        />

        {/* Middle Ring */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute inset-1 w-6 h-6 rounded-full border border-cyan-400/50"
        />

        {/* Inner Core */}
        <motion.div
          animate={{
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute inset-2 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 shadow-lg"
        />

        {/* Sparkle Effects */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -top-1 -left-1 w-2 h-2"
        >
          <Sparkles className="w-2 h-2 text-cyan-300" />
        </motion.div>

        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: 1,
          }}
          className="absolute -bottom-1 -right-1 w-2 h-2"
        >
          <Star className="w-2 h-2 text-blue-300" />
        </motion.div>

        <motion.div
          animate={{
            rotate: [180, 540],
            scale: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: 0.5,
          }}
          className="absolute top-0 right-0 w-2 h-2"
        >
          <Zap className="w-2 h-2 text-purple-300" />
        </motion.div>
      </motion.div>
    </div>
  )
}
