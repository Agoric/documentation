"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ImperiumNavigationOrb } from "@/components/navigation/imperium-navigation-orb"
import { ImperiumStatusBar } from "@/components/navigation/imperium-status-bar"
import { NeuralBackgroundEffects } from "@/components/effects/neural-background-effects"

interface ImperiumLayoutProps {
  children: React.ReactNode
}

export function ImperiumLayout({ children }: ImperiumLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 relative overflow-hidden">
      {/* Neural Background Effects */}
      <NeuralBackgroundEffects />

      {/* Imperial Status Bar */}
      <ImperiumStatusBar />

      {/* Main Content */}
      <motion.main
        className="relative z-10 pt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.main>

      {/* Floating Navigation Orb */}
      <ImperiumNavigationOrb />

      {/* Imperial Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>
    </div>
  )
}
