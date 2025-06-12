"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Brain, Globe, Sparkles } from "lucide-react"

interface HolographicHeaderProps {
  title?: string
  subtitle?: string
}

export function HolographicHeader({
  title = "ECommereX Flagship Hub",
  subtitle = "Quantum-powered multi-platform commerce management",
}: HolographicHeaderProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const calculateGradientPosition = () => {
    if (windowSize.width === 0) return { x: 50, y: 50 }
    const x = (mousePosition.x / windowSize.width) * 100
    const y = (mousePosition.y / windowSize.height) * 100
    return { x, y }
  }

  const gradientPos = calculateGradientPosition()

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Holographic background with mouse-following gradient */}
      <div
        className="absolute inset-0 z-0 bg-black"
        style={{
          background: `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, rgba(120, 119, 198, 0.3), rgba(0, 0, 0, 0.8) 70%)`,
          boxShadow: "inset 0 0 50px rgba(123, 97, 255, 0.5)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(123, 97, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 97, 255, 0.3) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-indigo-400 opacity-70"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
              opacity: [Math.random() * 0.5 + 0.3, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-4">
            {/* Holographic orb */}
            <motion.div
              className="relative flex h-14 w-14 items-center justify-center rounded-full"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 blur-sm" />
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20"
                style={{
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
                }}
              />
              <Brain className="relative h-7 w-7 text-white" />
            </motion.div>

            <div>
              <h2 className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-2xl font-bold text-transparent">
                {title}
              </h2>
              <p className="text-sm text-indigo-200">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge className="border border-indigo-500/30 bg-indigo-950/50 text-indigo-200">
              <Sparkles className="mr-1 h-3 w-3 text-indigo-400" />
              Quantum Enhanced
            </Badge>
            <Badge className="border border-purple-500/30 bg-purple-950/50 text-purple-200">
              <Brain className="mr-1 h-3 w-3 text-purple-400" />
              Mood Adaptive
            </Badge>
            <Badge className="border border-cyan-500/30 bg-cyan-950/50 text-cyan-200">
              <Globe className="mr-1 h-3 w-3 text-cyan-400" />
              Multi-Platform
            </Badge>
          </div>
        </div>

        {/* Horizontal line with glow */}
        <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      </div>
    </div>
  )
}
