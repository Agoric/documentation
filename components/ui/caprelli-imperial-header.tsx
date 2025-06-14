"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Crown, Shield, Globe, Heart, Users, Zap } from "lucide-react"

export function CaprelliImperialHeader() {
  const [glowIntensity, setGlowIntensity] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(Math.random() * 0.3 + 0.7)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Imperial Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(107, 70, 193, 0.3) 0%, transparent 50%),
            linear-gradient(45deg, rgba(212, 175, 55, 0.1) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(205, 127, 50, 0.1) 25%, transparent 25%)
          `,
          backgroundSize: "400px 400px, 400px 400px, 60px 60px, 60px 60px",
        }}
      />

      {/* Floating Imperial Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Imperial Coin Display */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div
              className="relative w-64 h-64 rounded-full overflow-hidden"
              style={{
                boxShadow: `
                  0 0 ${60 * glowIntensity}px rgba(212, 175, 55, ${glowIntensity}),
                  0 0 ${120 * glowIntensity}px rgba(212, 175, 55, ${glowIntensity * 0.6}),
                  0 0 ${180 * glowIntensity}px rgba(212, 175, 55, ${glowIntensity * 0.3}),
                  inset 0 0 40px rgba(212, 175, 55, 0.2)
                `,
              }}
            >
              <Image
                src="/caprelli-imperial-coin.png"
                alt="Jon'Lorenzo Caprelli - Imperial Digital Creator of Global Economics"
                fill
                className="object-cover"
                priority
              />

              {/* Imperial Holographic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-60" />

              {/* Rotating Imperial Ring */}
              <motion.div
                className="absolute inset-0 border-4 border-yellow-400/40 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </div>

            {/* Imperial Crown */}
            <motion.div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2"
              animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <Crown
                className="w-12 h-12 text-yellow-400"
                style={{ filter: "drop-shadow(0 0 10px rgba(212, 175, 55, 0.8))" }}
              />
            </motion.div>

            {/* Authority Shields */}
            <motion.div
              className="absolute -bottom-4 -left-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <Shield
                className="w-8 h-8 text-blue-400"
                style={{ filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))" }}
              />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
            >
              <Globe
                className="w-8 h-8 text-green-400"
                style={{ filter: "drop-shadow(0 0 8px rgba(34, 197, 94, 0.8))" }}
              />
            </motion.div>
          </motion.div>

          {/* Imperial Declaration */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500">
                  JON'LORENZO
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600">
                  CAPRELLI
                </span>
              </h1>

              <div className="text-xl md:text-2xl text-yellow-200 mb-8 font-medium tracking-wide">
                <span className="block">SUPREME DIGITAL AUTHORITY</span>
                <span className="block text-lg text-yellow-300/80">Creator of Global Economic Evolution</span>
              </div>

              {/* Imperial Virtues */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  className="flex items-center gap-3 justify-center lg:justify-start"
                  whileHover={{ scale: 1.05 }}
                >
                  <Heart className="w-6 h-6 text-red-400" />
                  <span className="text-white font-medium">Humanitarian Leadership</span>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 justify-center lg:justify-start"
                  whileHover={{ scale: 1.05 }}
                >
                  <Users className="w-6 h-6 text-blue-400" />
                  <span className="text-white font-medium">Global Unity</span>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 justify-center lg:justify-start"
                  whileHover={{ scale: 1.05 }}
                >
                  <Zap className="w-6 h-6 text-purple-400" />
                  <span className="text-white font-medium">Digital Innovation</span>
                </motion.div>
              </div>

              {/* Imperial Decree */}
              <motion.div
                className="bg-gradient-to-r from-yellow-900/20 to-amber-900/20 border border-yellow-500/30 rounded-lg p-6 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <p className="text-yellow-100 text-lg leading-relaxed italic">
                  "Through digital sovereignty and imperial wisdom, we forge a future where technology serves humanity,
                  prosperity flows to all nations, and the Caprelli legacy stands as a beacon of hope for generations to
                  come."
                </p>
                <div className="text-right mt-4">
                  <span className="text-yellow-400 font-bold">— The Imperial Mandate</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Imperial Divider */}
        <motion.div
          className="mt-12 flex items-center justify-center"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-full max-w-2xl" />
          <Crown className="mx-4 w-6 h-6 text-yellow-400 flex-shrink-0" />
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-full max-w-2xl" />
        </motion.div>
      </div>
    </div>
  )
}
