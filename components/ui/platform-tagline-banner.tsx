"use client"

import { motion } from "framer-motion"
import { Coins, TrendingUp, Users, Globe } from "lucide-react"

export function PlatformTaglineBanner() {
  return (
    <motion.div
      className="w-full bg-gradient-to-r from-cyan-900/20 via-blue-900/30 to-purple-900/20 border-y border-cyan-500/20 backdrop-blur-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-center gap-8">
          {/* Left Icons */}
          <div className="hidden md:flex items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Coins className="h-6 w-6 text-yellow-400" />
            </motion.div>
            <TrendingUp className="h-6 w-6 text-green-400" />
          </div>

          {/* Main Tagline */}
          <div className="text-center">
            <motion.h2
              className="text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              "Decentralized Banking Democratized Wealth"
            </motion.h2>
            <motion.p
              className="text-sm text-cyan-300/80 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              The Imperial Foundation of Global Financial Freedom
            </motion.p>
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center gap-4">
            <Users className="h-6 w-6 text-blue-400" />
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <Globe className="h-6 w-6 text-purple-400" />
            </motion.div>
          </div>
        </div>

        {/* Supporting Elements */}
        <div className="flex items-center justify-center gap-6 mt-3 text-xs text-cyan-400/60">
          <span>🏛️ Imperial Banking</span>
          <span>⚡ Quantum Finance</span>
          <span>🌍 Global Access</span>
          <span>💎 Democratized Wealth</span>
        </div>
      </div>
    </motion.div>
  )
}
