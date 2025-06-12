"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Lock } from "lucide-react"

interface HolographicHeaderProps {
  title: string
  subtitle: string
  stats: {
    label: string
    value: string
  }[]
}

export function HolographicHeader({ title, subtitle, stats }: HolographicHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={headerRef} className="relative overflow-hidden bg-gradient-to-r from-indigo-950 to-slate-950 py-12">
      {/* Holographic grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(123, 97, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 97, 255, 0.2) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Radial gradient that follows mouse */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(129, 140, 248, 0.3), transparent 40%)`,
        }}
      />

      {/* Supreme Authority Coin - Spinning */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 shadow-2xl border-4 border-amber-300/50">
            {/* Coin face design */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs font-bold text-amber-900 leading-tight">SUPREME</div>
                <div className="text-[10px] font-semibold text-amber-800">AUTHORITY</div>
              </div>
            </div>

            {/* Coin edge ridges */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, 
                transparent 0deg, rgba(251, 191, 36, 0.3) 5deg, transparent 10deg,
                transparent 15deg, rgba(251, 191, 36, 0.3) 20deg, transparent 25deg,
                transparent 30deg, rgba(251, 191, 36, 0.3) 35deg, transparent 40deg,
                transparent 45deg, rgba(251, 191, 36, 0.3) 50deg, transparent 55deg,
                transparent 60deg, rgba(251, 191, 36, 0.3) 65deg, transparent 70deg,
                transparent 75deg, rgba(251, 191, 36, 0.3) 80deg, transparent 85deg,
                transparent 90deg, rgba(251, 191, 36, 0.3) 95deg, transparent 100deg)`,
              }}
            />

            {/* Glow effect */}
            <div className="absolute -inset-2 rounded-full bg-amber-400/20 blur-md animate-pulse" />
          </div>
        </motion.div>
      </div>

      {/* Reduced floating particles around the coin */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-amber-400 opacity-70"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.3 + 0.2,
            }}
            animate={{
              x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
              opacity: [Math.random() * 0.3 + 0.2, Math.random() * 0.3 + 0.4, Math.random() * 0.3 + 0.2],
            }}
            transition={{
              duration: Math.random() * 15 + 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Glow effects */}
      <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute -bottom-20 right-20 h-60 w-60 rounded-full bg-purple-500/10 blur-3xl" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <Badge className="mb-4 bg-indigo-500/30 text-indigo-200">
            <Lock className="mr-1 h-3 w-3" />
            Members Only
          </Badge>
          <h1 className="bg-gradient-to-r from-white via-indigo-100 to-indigo-200 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            {title}
          </h1>
          <p className="mt-2 text-indigo-300">{subtitle}</p>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="rounded-lg border border-indigo-500/20 bg-indigo-950/30 p-4 backdrop-blur-sm">
                <div className="text-sm text-indigo-400">{stat.label}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
