"use client"

import type * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FuturisticCommandCenter } from "@/components/navigation/futuristic-command-center"

interface UniversalLayoutProps {
  children: React.ReactNode
  showOrb?: boolean
  className?: string
}

export function UniversalLayout({ children, showOrb = true, className }: UniversalLayoutProps) {
  return (
    <div className="min-h-screen relative">
      {/* Floating Command Orb - Available on all pages */}
      <AnimatePresence>
        {showOrb && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="fixed z-[100]"
          >
            <FuturisticCommandCenter />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={className}>{children}</div>

      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle particle effects */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Ambient glow effects */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  )
}
