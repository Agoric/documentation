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

      {/* Supreme Authority Coin - Enhanced Spinning Effect */}
      <div className="absolute left-1/2 top-8 -translate-x-1/2 z-20">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1, 0.95, 1],
          }}
          transition={{
            rotate: {
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            scale: {
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
          className="relative"
        >
          {/* Enhanced outer glow ring with pulsing */}
          <motion.div
            className="absolute -inset-6 rounded-full bg-gradient-to-r from-amber-400/40 via-yellow-300/50 to-amber-400/40 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Secondary glow ring */}
          <motion.div
            className="absolute -inset-4 rounded-full bg-gradient-to-r from-yellow-300/30 via-amber-400/40 to-yellow-300/30 blur-lg"
            animate={{
              rotate: -360,
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              rotate: {
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
              scale: {
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
          />

          {/* Main coin with 3D-like spinning effect */}
          <motion.div
            animate={{
              rotateY: [0, 180, 360],
              rotateX: [0, 15, 0, -15, 0],
            }}
            transition={{
              rotateY: {
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
              rotateX: {
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
            className="relative h-16 w-16 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 shadow-2xl border-2 border-amber-200/50"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Coin inner circle with counter-rotation */}
            <motion.div
              className="absolute inset-2 rounded-full bg-gradient-to-br from-yellow-200 via-amber-300 to-yellow-400 flex items-center justify-center shadow-inner"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              {/* Crown symbol with pulsing */}
              <motion.div
                className="text-amber-800 font-bold text-xs"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                SA
              </motion.div>
            </motion.div>

            {/* Enhanced shine effect with movement */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent"
              animate={{
                rotate: 360,
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                rotate: {
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
                opacity: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            />

            {/* Additional rim highlight */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-yellow-200/30"
              animate={{
                rotate: -360,
                borderColor: ["rgba(254, 240, 138, 0.3)", "rgba(251, 191, 36, 0.6)", "rgba(254, 240, 138, 0.3)"],
              }}
              transition={{
                rotate: {
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
                borderColor: {
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            />
          </motion.div>

          {/* Enhanced particle trail with multiple orbits */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 shadow-lg"
                initial={{
                  x: 32,
                  y: 32,
                  opacity: 0.9,
                  scale: 1,
                }}
                animate={{
                  x: 32 + Math.cos((i * 45 * Math.PI) / 180) * (40 + Math.sin(Date.now() / 1000) * 10),
                  y: 32 + Math.sin((i * 45 * Math.PI) / 180) * (40 + Math.cos(Date.now() / 1000) * 10),
                  opacity: [0.9, 0.4, 0.9],
                  scale: [1, 0.3, 1],
                  rotate: 360,
                }}
                transition={{
                  duration: 3 + i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Sparkle effects */}
          <div className="absolute inset-0">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute h-0.5 w-0.5 rounded-full bg-white"
                initial={{
                  x: 32 + Math.random() * 20 - 10,
                  y: 32 + Math.random() * 20 - 10,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.4 + Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Glow effects */}
      <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute -bottom-20 right-20 h-60 w-60 rounded-full bg-purple-500/10 blur-3xl" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col items-center text-center pt-12">
          <Badge className="mb-4 bg-indigo-500/30 text-indigo-200">
            <Lock className="mr-1 h-3 w-3" />
            Members Only
          </Badge>
          <h1 className="bg-gradient-to-r from-white via-indigo-100 to-indigo-200 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            {title}
          </h1>
          <p className="mt-2 text-indigo-300">{subtitle}</p>
          <div className="mt-2 text-xs text-amber-300/80 font-medium">⭐ Powered by Supreme Authority Coin ⭐</div>
        </div>

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
  )
}
