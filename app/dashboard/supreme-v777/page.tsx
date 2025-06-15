"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SupremeAuthorityV777Dashboard } from "@/components/supreme-v777/supreme-authority-v777-dashboard"
import { QuantumAnalyticsProvider } from "@/components/supreme-v777/quantum-analytics-provider"
import { ImperialAmbientController } from "@/components/ui/imperial-ambient-controller"
import { CelebrityVoiceAIController } from "@/components/ui/celebrity-voice-ai-controller"
import { PlatformTaglineBanner } from "@/components/ui/platform-tagline-banner"
import { imperialAmbient } from "@/lib/imperial-ambient-audio"
import { Crown, Sparkles, Zap } from "lucide-react"

export default function SupremeV777Page() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [platformReady, setPlatformReady] = useState(false)
  const initRef = useRef(false)

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true

      // Initialize platform systems
      const initializePlatform = async () => {
        try {
          // Start imperial ambient music
          await imperialAmbient.startAmbientMusic("throne-room")
          imperialAmbient.setVolume(0.3)
          imperialAmbient.fadeIn(3000)

          // Simulate system initialization
          await new Promise((resolve) => setTimeout(resolve, 2000))

          setIsInitialized(true)

          // Platform ready after initialization
          setTimeout(() => {
            setPlatformReady(true)
          }, 1000)
        } catch (error) {
          console.error("Platform initialization error:", error)
          setIsInitialized(true)
          setPlatformReady(true)
        }
      }

      initializePlatform()
    }
  }, [])

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-400 to-amber-600 flex items-center justify-center"
            >
              <Crown className="h-12 w-12 text-white" />
            </motion.div>
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-4">
            SUPREME AUTHORITY
          </h1>
          <p className="text-xl text-cyan-300 mb-2">Version 777</p>
          <p className="text-cyan-400/80 mb-8">Initializing Quantum Financial Systems...</p>

          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              className="w-2 h-2 bg-cyan-400 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
              className="w-2 h-2 bg-purple-400 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
              className="w-2 h-2 bg-yellow-400 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <QuantumAnalyticsProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
        {/* Platform Tagline Banner */}
        <PlatformTaglineBanner
          version="777"
          tagline="Decentralized Banking • Democratized Wealth • Quantum Excellence"
          showVersion={true}
          imperial={true}
        />

        {/* Main Dashboard */}
        <AnimatePresence>
          {platformReady && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <SupremeAuthorityV777Dashboard />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Imperial Ambient Controller */}
        <ImperialAmbientController autoStart={true} defaultTrack="throne-room" compact={true} />

        {/* Celebrity Voice AI Controller */}
        <CelebrityVoiceAIController />

        {/* Version 777 Celebration Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="fixed top-4 left-4 z-50"
        >
          <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 backdrop-blur-md border border-yellow-400/30 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <span className="text-yellow-300 font-bold">Version 777</span>
              <Zap className="h-4 w-4 text-amber-400" />
            </div>
            <p className="text-xs text-yellow-400/80 mt-1">Supreme Excellence Achieved</p>
          </div>
        </motion.div>
      </div>
    </QuantumAnalyticsProvider>
  )
}
