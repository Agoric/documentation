"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface HolographicDiamondCardProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  icon?: React.ReactNode
  className?: string
  defaultExpanded?: boolean
  interactive?: boolean
  variant?: "primary" | "secondary" | "accent"
  size?: "sm" | "md" | "lg"
}

export function HolographicDiamondCard({
  children,
  title,
  subtitle,
  icon,
  className,
  defaultExpanded = false,
  interactive = true,
  variant = "primary",
  size = "md",
}: HolographicDiamondCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  // Track mouse position for holographic effects
  useEffect(() => {
    if (!cardRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardRef.current!.getBoundingClientRect()
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }

    cardRef.current.addEventListener("mousemove", handleMouseMove)
    return () => cardRef.current?.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          background:
            "linear-gradient(135deg, rgba(79, 70, 229, 0.15), rgba(139, 92, 246, 0.15), rgba(79, 70, 229, 0.15))",
          border: "rgba(129, 140, 248, 0.3)",
          glow: "rgba(129, 140, 248, 0.4)",
        }
      case "secondary":
        return {
          background:
            "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.15), rgba(16, 185, 129, 0.15))",
          border: "rgba(52, 211, 153, 0.3)",
          glow: "rgba(52, 211, 153, 0.4)",
        }
      case "accent":
        return {
          background:
            "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.15), rgba(245, 158, 11, 0.15))",
          border: "rgba(251, 191, 36, 0.3)",
          glow: "rgba(251, 191, 36, 0.4)",
        }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "p-3"
      case "md":
        return "p-4"
      case "lg":
        return "p-6"
    }
  }

  const variantStyles = getVariantStyles()

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden backdrop-blur-md transition-all duration-500",
        getSizeStyles(),
        className,
      )}
      style={{
        background: isHovered
          ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${variantStyles.glow}, transparent 70%), ${variantStyles.background}`
          : variantStyles.background,
        borderImage: `linear-gradient(135deg, ${variantStyles.border}, transparent, ${variantStyles.border}) 1`,
        borderWidth: "1px",
        borderStyle: "solid",
        clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
        boxShadow: isHovered
          ? `0 0 30px ${variantStyles.glow}, inset 0 0 30px ${variantStyles.glow}`
          : `0 0 15px ${variantStyles.glow}, inset 0 0 15px ${variantStyles.glow}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Diamond pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(45deg, ${variantStyles.border} 1px, transparent 1px),
            linear-gradient(-45deg, ${variantStyles.border} 1px, transparent 1px),
            linear-gradient(45deg, transparent 10px, ${variantStyles.border} 10px, ${variantStyles.border} 11px, transparent 11px),
            linear-gradient(-45deg, transparent 10px, ${variantStyles.border} 10px, ${variantStyles.border} 11px, transparent 11px)
          `,
          backgroundSize: "20px 20px, 20px 20px, 40px 40px, 40px 40px",
          backgroundPosition: "0 0, 0 0, 0 0, 0 0",
        }}
      />

      {/* Laser etching effect */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, ${variantStyles.glow} 1px, transparent 1px),
            radial-gradient(circle at 80% 20%, ${variantStyles.glow} 1px, transparent 1px),
            radial-gradient(circle at 20% 80%, ${variantStyles.glow} 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, ${variantStyles.glow} 1px, transparent 1px),
            linear-gradient(0deg, transparent 49%, ${variantStyles.glow} 50%, transparent 51%),
            linear-gradient(90deg, transparent 49%, ${variantStyles.glow} 50%, transparent 51%)
          `,
          backgroundSize: "100px 100px, 100px 100px, 100px 100px, 100px 100px, 100% 2px, 2px 100%",
        }}
      />

      {/* Holographic shimmer */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background: `linear-gradient(${mousePosition.x}deg, transparent 30%, ${variantStyles.glow} 50%, transparent 70%)`,
        }}
        animate={{
          background: [
            `linear-gradient(0deg, transparent 30%, ${variantStyles.glow} 50%, transparent 70%)`,
            `linear-gradient(180deg, transparent 30%, ${variantStyles.glow} 50%, transparent 70%)`,
            `linear-gradient(360deg, transparent 30%, ${variantStyles.glow} 50%, transparent 70%)`,
          ],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        {(title || subtitle || icon) && (
          <motion.div
            className={cn("flex items-center justify-between mb-4 cursor-pointer", interactive && "hover:opacity-80")}
            onClick={() => interactive && setIsExpanded(!isExpanded)}
            whileHover={{ scale: interactive ? 1.02 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3">
              {icon && (
                <div
                  className="p-2 rounded-md"
                  style={{
                    background: `linear-gradient(135deg, ${variantStyles.glow}, transparent)`,
                    boxShadow: `0 0 10px ${variantStyles.glow}`,
                  }}
                >
                  {icon}
                </div>
              )}
              <div>
                {title && (
                  <h3
                    className="font-bold text-white"
                    style={{
                      textShadow: `0 0 10px ${variantStyles.glow}, 0 0 20px ${variantStyles.glow}`,
                      filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))",
                    }}
                  >
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p
                    className="text-sm opacity-80"
                    style={{
                      color: variantStyles.glow,
                      textShadow: `0 0 5px ${variantStyles.glow}`,
                    }}
                  >
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            {interactive && (
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ color: variantStyles.glow }}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Content */}
        <AnimatePresence>
          {(!interactive || isExpanded) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
              style={{
                textShadow: `0 0 5px ${variantStyles.glow}`,
                filter: "drop-shadow(0 0 1px rgba(255, 255, 255, 0.3))",
              }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Corner accents */}
      <div
        className="absolute top-0 left-0 w-6 h-6"
        style={{
          background: `linear-gradient(135deg, ${variantStyles.glow}, transparent)`,
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
        }}
      />
      <div
        className="absolute top-0 right-0 w-6 h-6"
        style={{
          background: `linear-gradient(225deg, ${variantStyles.glow}, transparent)`,
          clipPath: "polygon(100% 0, 100% 100%, 0 0)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-6 h-6"
        style={{
          background: `linear-gradient(45deg, ${variantStyles.glow}, transparent)`,
          clipPath: "polygon(0 100%, 100% 100%, 0 0)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-6 h-6"
        style={{
          background: `linear-gradient(315deg, ${variantStyles.glow}, transparent)`,
          clipPath: "polygon(100% 100%, 0 100%, 100% 0)",
        }}
      />
    </motion.div>
  )
}
