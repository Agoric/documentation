"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface RoyalHolographicTitleProps {
  children: React.ReactNode
  size?: "small" | "medium" | "large" | "xl"
  className?: string
  animated?: boolean
}

export function RoyalHolographicTitle({
  children,
  size = "large",
  className = "",
  animated = true,
}: RoyalHolographicTitleProps) {
  const titleRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isHovered])

  const sizeClasses = {
    small: "text-xl md:text-2xl",
    medium: "text-2xl md:text-3xl",
    large: "text-3xl md:text-4xl lg:text-5xl",
    xl: "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
  }

  return (
    <div
      ref={titleRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow layers */}
      <div className="absolute inset-0 -m-4">
        {/* Outer glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-yellow-300/30 to-yellow-400/20 blur-3xl animate-pulse" />

        {/* Middle glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 via-yellow-400/40 to-amber-400/30 blur-2xl" />

        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/40 via-yellow-200/50 to-yellow-300/40 blur-xl" />
      </div>

      {/* Reactive mouse glow */}
      {isHovered && (
        <div
          className="absolute inset-0 opacity-60 blur-2xl transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 215, 0, 0.8), transparent 60%)`,
          }}
        />
      )}

      {/* Floating particles */}
      {animated && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full opacity-70"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: Math.random() * 8 + 12,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* Shimmer overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
          animate={{
            x: ["-200%", "200%"],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            repeatDelay: 2,
          }}
        />
      </div>

      {/* Holographic grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 215, 0, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 215, 0, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "8px 8px",
        }}
      />

      {/* Main title with multiple text effects */}
      <div className="relative">
        {/* Shadow layer */}
        <div
          className={`absolute inset-0 font-bold text-black/50 blur-sm ${sizeClasses[size]}`}
          style={{ transform: "translate(2px, 2px)" }}
        >
          {children}
        </div>

        {/* Base gradient text */}
        <div
          className={`relative font-bold bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-clip-text text-transparent ${sizeClasses[size]}`}
        >
          {children}
        </div>

        {/* Metallic overlay */}
        <div
          className={`absolute inset-0 font-bold bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent opacity-80 ${sizeClasses[size]}`}
        >
          {children}
        </div>

        {/* Highlight overlay */}
        <div
          className={`absolute inset-0 font-bold bg-gradient-to-r from-yellow-100 via-white to-yellow-100 bg-clip-text text-transparent opacity-40 ${sizeClasses[size]}`}
        >
          {children}
        </div>
      </div>

      {/* Crown decoration for large titles */}
      {(size === "large" || size === "xl") && (
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, -5, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="text-yellow-400 text-2xl">👑</div>
          <div className="absolute inset-0 text-yellow-400 text-2xl blur-sm opacity-50">👑</div>
        </motion.div>
      )}

      {/* Royal scepter decorations */}
      {(size === "large" || size === "xl") && (
        <>
          <motion.div
            className="absolute top-1/2 -left-12 transform -translate-y-1/2"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="text-yellow-400 text-xl">⚜️</div>
          </motion.div>

          <motion.div
            className="absolute top-1/2 -right-12 transform -translate-y-1/2"
            animate={{
              rotate: [0, -10, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 3,
            }}
          >
            <div className="text-yellow-400 text-xl">⚜️</div>
          </motion.div>
        </>
      )}
    </div>
  )
}
