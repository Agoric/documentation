"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface HolographicBackgroundProps {
  children: React.ReactNode
  variant?: "default" | "dashboard" | "financial" | "premium"
  className?: string
}

export function HolographicBackground({ children, variant = "default", className = "" }: HolographicBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const getVariantStyles = () => {
    switch (variant) {
      case "financial":
        return {
          primary: "from-amber-950/20 via-yellow-950/10 to-orange-950/20",
          secondary: "from-amber-500/10 to-orange-500/10",
          accent: "rgba(251, 191, 36, 0.4)",
        }
      case "dashboard":
        return {
          primary: "from-indigo-950/20 via-purple-950/10 to-blue-950/20",
          secondary: "from-indigo-500/10 to-purple-500/10",
          accent: "rgba(129, 140, 248, 0.4)",
        }
      case "premium":
        return {
          primary: "from-violet-950/20 via-purple-950/10 to-fuchsia-950/20",
          secondary: "from-violet-500/10 to-fuchsia-500/10",
          accent: "rgba(168, 85, 247, 0.4)",
        }
      default:
        return {
          primary: "from-slate-950/20 via-gray-950/10 to-slate-950/20",
          secondary: "from-slate-500/10 to-gray-500/10",
          accent: "rgba(148, 163, 184, 0.4)",
        }
    }
  }

  const styles = getVariantStyles()

  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Base gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${styles.primary}`} />

      {/* Dynamic mouse-following gradient */}
      <div
        className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${styles.accent}, transparent 70%)`,
        }}
      />

      {/* Holographic grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(${styles.accent.replace("0.4", "0.3")} 1px, transparent 1px),
            linear-gradient(90deg, ${styles.accent.replace("0.4", "0.3")} 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          animation: "grid-move 20s linear infinite",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-current rounded-full opacity-60"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              color: styles.accent.replace("0.4", "0.8"),
              animation: `float ${8 + particle.delay}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Scanning lines effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-full h-px opacity-20 animate-pulse"
          style={{
            background: `linear-gradient(90deg, transparent, ${styles.accent}, transparent)`,
            top: "20%",
            animation: "scan-horizontal 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute h-full w-px opacity-20 animate-pulse"
          style={{
            background: `linear-gradient(0deg, transparent, ${styles.accent}, transparent)`,
            left: "30%",
            animation: "scan-vertical 6s ease-in-out infinite",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes scan-horizontal {
          0%, 100% { top: 20%; opacity: 0; }
          50% { top: 80%; opacity: 0.2; }
        }
        
        @keyframes scan-vertical {
          0%, 100% { left: 30%; opacity: 0; }
          50% { left: 70%; opacity: 0.2; }
        }
      `}</style>
    </div>
  )
}
