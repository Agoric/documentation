"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface HolographicGlassCardProps {
  children: React.ReactNode
  className?: string
  glassEffect?: "subtle" | "medium" | "intense"
  interactive?: boolean
  hoverEffect?: "glow" | "raise" | "tilt" | "none"
  borderGlow?: boolean
}

export function HolographicGlassCard({
  children,
  className,
  glassEffect = "medium",
  interactive = true,
  hoverEffect = "glow",
  borderGlow = true,
}: HolographicGlassCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Track mouse position for lighting effects
  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [interactive])

  // Determine glass effect intensity
  const glassOpacity = glassEffect === "subtle" ? "0.1" : glassEffect === "medium" ? "0.15" : "0.2"
  const glassBorderOpacity = glassEffect === "subtle" ? "0.2" : glassEffect === "medium" ? "0.3" : "0.4"
  const glassBlur = glassEffect === "subtle" ? "8px" : glassEffect === "medium" ? "12px" : "16px"

  // Determine hover transform effect
  let hoverTransform = {}
  if (interactive && isHovered) {
    if (hoverEffect === "raise") {
      hoverTransform = { y: -8 }
    } else if (hoverEffect === "tilt") {
      const rotateX = (mousePosition.y - 50) * 0.1
      const rotateY = (mousePosition.x - 50) * -0.1
      hoverTransform = { rotateX, rotateY }
    }
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-lg border border-indigo-500/20 backdrop-blur-md transition-all duration-300",
        "bg-gradient-to-br from-indigo-950/40 to-slate-950/40",
        interactive && "hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20",
        isHovered && hoverEffect === "glow" && "shadow-lg shadow-indigo-500/30",
        isHovered && hoverEffect === "raise" && "-translate-y-2",
        className,
      )}
      style={{
        boxShadow:
          isHovered && hoverEffect === "glow" && borderGlow
            ? "0 0 20px rgba(99, 102, 241, 0.3)"
            : "0 4px 20px rgba(30, 20, 70, 0.2)",
        transform:
          isHovered && hoverEffect === "tilt"
            ? `rotateX(${(mousePosition.y - 50) * 0.1}deg) rotateY(${(mousePosition.x - 50) * -0.1}deg)`
            : undefined,
      }}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
    >
      {/* Dynamic lighting effect */}
      {interactive && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(129, 140, 248, ${
              isHovered ? "0.5" : "0.3"
            }), transparent ${isHovered ? "100%" : "70%"})`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Holographic grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(123, 97, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 97, 255, 0.3) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          pointerEvents: "none",
        }}
      />

      {/* Card content */}
      <div className="relative z-10">{children}</div>

      {/* Glass reflection effect */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(135deg, rgba(255, 255, 255, ${glassOpacity}) 0%, transparent 80%)`,
          pointerEvents: "none",
        }}
      />

      {/* Edge glow effect */}
      {borderGlow && (
        <div
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-300",
            isHovered && interactive && "opacity-30",
          )}
          style={{
            boxShadow: `inset 0 0 20px rgba(129, 140, 248, 0.8)`,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  )
}
