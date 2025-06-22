"use client"

import { motion } from "framer-motion"
import { Sparkles, Zap } from "lucide-react"

interface HolographicHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export function HolographicHeader({ title, subtitle, className = "" }: HolographicHeaderProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-cyan-900/20 backdrop-blur-sm" />

      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            animate={{
              x: [0, Math.random() * 100, 0],
              y: [0, Math.random() * 50, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Title */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-cyan-400" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {title}
            </h1>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Zap className="w-8 h-8 text-purple-400" />
            </motion.div>
          </div>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg md:text-xl text-indigo-200/80 max-w-3xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Holographic Line Effect */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          />
        </motion.div>
      </div>

      {/* Holographic Border Effect */}
      <div className="absolute inset-0 border border-cyan-400/20 rounded-lg">
        <motion.div
          className="absolute inset-0 border border-cyan-400/40 rounded-lg"
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  )
}
