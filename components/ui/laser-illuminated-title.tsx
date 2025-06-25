"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface LaserIlluminatedTitleProps {
  text: string
  size?: "sm" | "md" | "lg" | "xl" | "2xl"
  variant?: "standard" | "premium" | "ultra"
  animated?: boolean
  laserActive?: boolean
  scanEffect?: boolean
  className?: string
}

const sizeClasses = {
  sm: "text-lg md:text-xl",
  md: "text-2xl md:text-3xl lg:text-4xl",
  lg: "text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
  xl: "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
  "2xl": "text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
}

export function LaserIlluminatedTitle({
  text,
  size = "lg",
  variant = "standard",
  animated = true,
  laserActive = true,
  scanEffect = true,
  className,
}: LaserIlluminatedTitleProps) {
  const [isScanning, setIsScanning] = React.useState(false)
  const [glowIntensity, setGlowIntensity] = React.useState(1)

  React.useEffect(() => {
    if (!scanEffect) return

    const scanInterval = setInterval(
      () => {
        setIsScanning(true)
        setTimeout(() => setIsScanning(false), 2000)
      },
      5000 + Math.random() * 3000,
    )

    return () => clearInterval(scanInterval)
  }, [scanEffect])

  React.useEffect(() => {
    if (!laserActive) return

    const glowInterval = setInterval(
      () => {
        setGlowIntensity(0.5 + Math.random() * 0.5)
      },
      100 + Math.random() * 200,
    )

    return () => clearInterval(glowInterval)
  }, [laserActive])

  const emeraldGradient =
    variant === "premium"
      ? "bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500"
      : variant === "ultra"
        ? "bg-gradient-to-r from-emerald-200 via-emerald-300 via-emerald-400 to-emerald-500"
        : "bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500"

  return (
    <div className={cn("relative inline-block", className)}>
      {/* Main Title */}
      <motion.h1
        className={cn(
          "font-bold bg-clip-text text-transparent leading-tight relative z-10",
          emeraldGradient,
          sizeClasses[size],
        )}
        initial={animated ? { opacity: 0, y: 20, scale: 0.9 } : {}}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        style={{
          textShadow: `0 0 ${10 * glowIntensity}px rgba(16, 185, 129, ${0.8 * glowIntensity}), 
                       0 0 ${20 * glowIntensity}px rgba(16, 185, 129, ${0.6 * glowIntensity}), 
                       0 0 ${30 * glowIntensity}px rgba(16, 185, 129, ${0.4 * glowIntensity})`,
          filter: `drop-shadow(0 0 ${5 * glowIntensity}px rgba(16, 185, 129, 0.8))`,
        }}
      >
        {text}
      </motion.h1>

      {/* Laser Scanning Effect */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Horizontal Laser Scan */}
            <motion.div
              className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
              style={{
                boxShadow: "0 0 10px rgba(16, 185, 129, 0.8), 0 0 20px rgba(16, 185, 129, 0.6)",
              }}
              initial={{ top: "0%", opacity: 0 }}
              animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Vertical Laser Scan */}
            <motion.div
              className="absolute top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-emerald-400 to-transparent"
              style={{
                boxShadow: "0 0 10px rgba(16, 185, 129, 0.8), 0 0 20px rgba(16, 185, 129, 0.6)",
              }}
              initial={{ left: "0%", opacity: 0 }}
              animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Laser Grid Pattern */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`h-${i}`}
                  className="absolute w-full h-px bg-emerald-400/20"
                  style={{ top: `${20 * (i + 1)}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              ))}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`v-${i}`}
                  className="absolute h-full w-px bg-emerald-400/20"
                  style={{ left: `${25 * (i + 1)}%` }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: [0, 1, 0] }}
                  transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Laser Engraving Sparks */}
      {laserActive && (
        <div className="absolute inset-0 pointer-events-none z-15">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                x: [0, (Math.random() - 0.5) * 20],
                y: [0, (Math.random() - 0.5) * 20],
              }}
              transition={{
                duration: 0.5 + Math.random() * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1 + Math.random() * 2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Laser Cutting Edge Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-5"
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%, 
            rgba(16, 185, 129, 0.1) 25%, 
            rgba(16, 185, 129, 0.2) 50%, 
            rgba(16, 185, 129, 0.1) 75%, 
            transparent 100%)`,
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Holographic Depth Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border border-emerald-400/10 rounded-lg"
            style={{
              transform: `translateZ(${-5 * (i + 1)}px) scale(${1 + 0.02 * i})`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1 + 0.02 * i, 1 + 0.02 * i + 0.01, 1 + 0.02 * i],
            }}
            transition={{
              duration: 3 + i,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Laser Beam Particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-emerald-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
            }}
            transition={{
              duration: 1 + Math.random(),
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: Math.random() * 2,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  )
}
