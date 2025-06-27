"use client"

import { useEffect, useState } from "react"
import { Sparkles, Star, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CursorOrbProps {
  enabled?: boolean
}

interface TrailElement {
  id: number
  x: number
  y: number
  opacity: number
}

export function CursorOrb({ enabled = true }: CursorOrbProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState<TrailElement[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return

    let trailId = 0
    let animationFrame: number

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX
      const newY = e.clientY

      setMousePosition({ x: newX, y: newY })
      setIsVisible(true)

      // Add new trail element
      setTrail((prevTrail) => {
        const newTrail = [
          ...prevTrail,
          {
            id: trailId++,
            x: newX,
            y: newY,
            opacity: 1,
          },
        ].slice(-15) // Keep only last 15 elements

        return newTrail
      })
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const animateTrail = () => {
      setTrail((prevTrail) =>
        prevTrail
          .map((element) => ({
            ...element,
            opacity: element.opacity * 0.9,
          }))
          .filter((element) => element.opacity > 0.1),
      )
      animationFrame = requestAnimationFrame(animateTrail)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    animationFrame = requestAnimationFrame(animateTrail)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrame)
    }
  }, [enabled])

  if (!enabled || !isVisible) return null

  return (
    <div className={cn("fixed inset-0 pointer-events-none z-[10000]", "")}>
      {/* Trail Elements */}
      {trail.map((element, index) => (
        <motion.div
          key={element.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute"
          style={{
            left: element.x - 8,
            top: element.y - 8,
            opacity: element.opacity * 0.6,
            transform: `scale(${element.opacity})`,
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
          className="absolute inset-2 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse shadow-lg shadow-cyan-500/50"
        />

        {/* Sparkle Icons */}
        <motion.div className="absolute inset-0 w-10 h-10">
          <motion.div
            className="absolute w-3 h-3 text-cyan-300 animate-spin"
            style={{
              top: "2px",
              right: "2px",
              animationDuration: "2s",
              animationDirection: "reverse",
            }}
          >
            <Sparkles />
          </motion.div>
          <motion.div
            className="absolute w-2 h-2 text-blue-300 animate-pulse"
            style={{
              bottom: "2px",
              left: "2px",
              animationDelay: "0.5s",
            }}
          >
            <Star />
          </motion.div>
          <motion.div
            className="absolute w-2 h-2 text-cyan-400 animate-bounce"
            style={{
              top: "50%",
              left: "-2px",
              transform: "translateY(-50%)",
              animationDelay: "1s",
            }}
          >
            <Zap />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
