"use client"

import type * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FuturisticCommandCenter } from "@/components/navigation/futuristic-command-center"
import { ImperiumStatusBar } from "@/components/navigation/imperium-status-bar"
import { NeuralBackgroundEffects } from "@/components/effects/neural-background-effects"

interface ImperiumLayoutProps {
  children: React.ReactNode
  showOrb?: boolean
  className?: string
}

export function ImperiumLayout({ children, showOrb = true, className }: ImperiumLayoutProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Neural Background Effects */}
      <NeuralBackgroundEffects />

      {/* Imperial Status Bar */}
      <ImperiumStatusBar />

      {/* Floating Command Orb - Universal Navigation */}
      <AnimatePresence>
        {showOrb && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="fixed z-[100]"
          >
            <FuturisticCommandCenter />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with Imperial Styling */}
      <motion.div
        className={`relative z-10 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {children}
      </motion.div>

      {/* Imperial Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-5 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
                 linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)
               `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
    </div>
  )
}
