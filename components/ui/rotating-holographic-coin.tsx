"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface RotatingHolographicCoinProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  speed?: "slow" | "medium" | "fast"
  glow?: boolean
  imageUrl?: string
}

export function RotatingHolographicCoin({
  className,
  size = "md",
  speed = "medium",
  glow = true,
  imageUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AC590A4D-5556-4D4B-91CF-55CAF78C3619_1_102_o-FlvoIkL4os2PdAupXGTepXlnuCjruW.jpeg",
}: RotatingHolographicCoinProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [rotation, setRotation] = useState(0)

  // Size mapping
  const sizeMap = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-24 w-24",
    xl: "h-32 w-32",
  }

  // Speed mapping (degrees per second)
  const speedMap = {
    slow: 15,
    medium: 30,
    fast: 60,
  }

  // Continuous rotation effect
  useEffect(() => {
    const rotationSpeed = speedMap[speed]
    const interval = setInterval(() => {
      setRotation((prev) => (prev + rotationSpeed / 60) % 360)
    }, 1000 / 60) // 60fps

    return () => clearInterval(interval)
  }, [speed])

  return (
    <div
      className={cn("relative flex items-center justify-center", sizeMap[size], className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      {glow && (
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-indigo-500/20 blur-md transition-all duration-500",
            isHovered ? "scale-110 opacity-80" : "scale-100 opacity-60",
          )}
        />
      )}

      {/* Rotating coin */}
      <motion.div
        className="relative h-full w-full"
        style={{
          rotateY: rotation,
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 shadow-lg"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backfaceVisibility: "hidden",
          }}
        />

        {/* Back side of coin (optional) */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-600 to-yellow-600 shadow-lg"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <div className="flex h-full items-center justify-center">
            <div className="text-xs font-bold text-amber-100">SNAP-DAX</div>
          </div>
        </div>
      </motion.div>

      {/* Holographic shine effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50"
        style={{
          mixBlendMode: "overlay",
        }}
      />
    </div>
  )
}
