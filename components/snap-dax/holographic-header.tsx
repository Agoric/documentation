"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Lock, CircleDollarSign } from "lucide-react"

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

      {/* Floating particles */}
      <div className="absolute inset-0">
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

      {/* Glow effects */}
      <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute -bottom-20 right-20 h-60 w-60 rounded-full bg-purple-500/10 blur-3xl" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex items-center gap-2">
            <Badge className="bg-indigo-500/30 text-indigo-200">
              <Lock className="mr-1 h-3 w-3" />
              Members Only
            </Badge>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
              <CircleDollarSign className="h-3 w-3 text-white z-10" />
              <div className="absolute inset-0 rounded-full border border-indigo-300/30"></div>
              <span className="absolute text-[6px] font-bold text-white/80 -bottom-0.5">SA</span>
            </div>
          </div>
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
