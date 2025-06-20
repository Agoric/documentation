"use client"
import { motion } from "framer-motion"

export function NeuralBackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}

      {/* Neural Connections */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.line
            key={i}
            x1={Math.random() * 100 + "%"}
            y1={Math.random() * 100 + "%"}
            x2={Math.random() * 100 + "%"}
            y2={Math.random() * 100 + "%"}
            stroke="url(#neuralGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}

        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
