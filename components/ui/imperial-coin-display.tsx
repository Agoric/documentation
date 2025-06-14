"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Crown, Globe, Shield, Zap, Infinity, Triangle, Star } from "lucide-react"

interface ImperialCoinProps {
  size?: "small" | "medium" | "large" | "monument"
  interactive?: boolean
  showSecrets?: boolean
}

export function ImperialCoinDisplay({ size = "medium", interactive = true, showSecrets = false }: ImperialCoinProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showSymbolism, setShowSymbolism] = useState(false)

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "w-32 h-32"
      case "medium":
        return "w-48 h-48"
      case "large":
        return "w-64 h-64"
      case "monument":
        return "w-96 h-96"
      default:
        return "w-48 h-48"
    }
  }

  const secretSymbols = [
    {
      symbol: <Eye className="w-6 h-6" />,
      meaning: "All-Seeing Providence - Divine oversight of global economics",
      position: "top-4 left-4",
    },
    {
      symbol: <Triangle className="w-5 h-5" />,
      meaning: "Sacred Geometry - Perfect balance of power, wisdom, and compassion",
      position: "top-4 right-4",
    },
    {
      symbol: <Infinity className="w-6 h-6" />,
      meaning: "Eternal Prosperity - Infinite abundance for all humanity",
      position: "bottom-4 left-4",
    },
    {
      symbol: <Star className="w-5 h-5" />,
      meaning: "Guiding Light - Illuminating the path to digital sovereignty",
      position: "bottom-4 right-4",
    },
  ]

  return (
    <div className="relative flex flex-col items-center space-y-6">
      {/* Main Coin Display */}
      <div className="relative">
        <motion.div
          className={`relative ${getSizeClasses()} cursor-pointer`}
          onClick={() => interactive && setIsFlipped(!isFlipped)}
          whileHover={interactive ? { scale: 1.05 } : {}}
          style={{ perspective: "1000px" }}
        >
          <AnimatePresence mode="wait">
            {!isFlipped ? (
              // Front Side - Portrait
              <motion.div
                key="front"
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 0 }}
                exit={{ rotateY: 90 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 shadow-2xl border-4 border-yellow-300">
                  {/* Outer Ring - Official Text */}
                  <div className="absolute inset-2 rounded-full border-2 border-yellow-200/50">
                    {/* Top Arc Text */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                      <defs>
                        <path id="top-arc" d="M 40 100 A 60 60 0 0 1 160 100" />
                        <path id="bottom-arc" d="M 160 100 A 60 60 0 0 1 40 100" />
                      </defs>
                      <text className="fill-amber-900 text-xs font-bold tracking-wider">
                        <textPath href="#top-arc" startOffset="50%" textAnchor="middle">
                          JON'LORENZO CAPRELLI
                        </textPath>
                      </text>
                      <text className="fill-amber-900 text-xs font-bold tracking-wider">
                        <textPath href="#bottom-arc" startOffset="50%" textAnchor="middle">
                          IMPERATOR ECONOMICUS DIGITALIS
                        </textPath>
                      </text>
                    </svg>
                  </div>

                  {/* Central Portrait */}
                  <div className="absolute inset-8 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-yellow-400/30 overflow-hidden">
                    <img
                      src="/caprelli-imperial-coin.png"
                      alt="Imperial Portrait"
                      className="w-full h-full object-cover"
                    />

                    {/* Circuit Pattern Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-400/10 to-blue-500/20">
                      <svg className="w-full h-full opacity-30" viewBox="0 0 100 100">
                        <defs>
                          <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1" fill="currentColor" />
                            <path d="M2,2 L18,2 M2,2 L2,18" stroke="currentColor" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#circuit)" className="text-cyan-400" />
                      </svg>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                    <Crown className="w-6 h-6 text-amber-900" />
                  </div>

                  {/* Year Markers */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-amber-900 text-xs font-bold">
                    MMXXIV
                  </div>

                  {/* Holographic Shine */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-pulse" />
                </div>
              </motion.div>
            ) : (
              // Back Side - Secret Symbolism
              <motion.div
                key="back"
                initial={{ rotateY: -90 }}
                animate={{ rotateY: 0 }}
                exit={{ rotateY: -90 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-indigo-600 via-purple-700 to-violet-800 shadow-2xl border-4 border-purple-300">
                  {/* Outer Ring - Latin Motto */}
                  <div className="absolute inset-2 rounded-full border-2 border-purple-200/50">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                      <defs>
                        <path id="top-arc-back" d="M 30 100 A 70 70 0 0 1 170 100" />
                        <path id="bottom-arc-back" d="M 170 100 A 70 70 0 0 1 30 100" />
                      </defs>
                      <text className="fill-purple-100 text-xs font-bold tracking-wider">
                        <textPath href="#top-arc-back" startOffset="50%" textAnchor="middle">
                          ORDO AB CHAO
                        </textPath>
                      </text>
                      <text className="fill-purple-100 text-xs font-bold tracking-wider">
                        <textPath href="#bottom-arc-back" startOffset="50%" textAnchor="middle">
                          LUX E TENEBRIS
                        </textPath>
                      </text>
                    </svg>
                  </div>

                  {/* Central Sacred Geometry */}
                  <div className="absolute inset-8 rounded-full bg-gradient-to-br from-purple-100/20 to-indigo-200/20 border-2 border-purple-400/30 flex items-center justify-center">
                    {/* All-Seeing Eye in Triangle */}
                    <div className="relative">
                      <svg className="w-24 h-24 text-yellow-300" viewBox="0 0 100 100">
                        {/* Triangle */}
                        <path
                          d="M50 15 L85 75 L15 75 Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="drop-shadow-lg"
                        />
                        {/* Eye */}
                        <ellipse cx="50" cy="50" rx="12" ry="8" fill="currentColor" />
                        <circle cx="50" cy="50" r="6" fill="white" />
                        <circle cx="50" cy="50" r="3" fill="black" />

                        {/* Rays of Light */}
                        <g stroke="currentColor" strokeWidth="1" opacity="0.7">
                          <line x1="50" y1="15" x2="50" y2="5" />
                          <line x1="35" y1="25" x2="30" y2="20" />
                          <line x1="65" y1="25" x2="70" y2="20" />
                          <line x1="25" y1="45" x2="15" y2="45" />
                          <line x1="75" y1="45" x2="85" y2="45" />
                        </g>
                      </svg>

                      {/* Surrounding Sacred Symbols */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <Star className="w-4 h-4 text-yellow-300" />
                      </div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                        <Infinity className="w-6 h-6 text-yellow-300" />
                      </div>
                      <div className="absolute top-1/2 -left-8 transform -translate-y-1/2">
                        <Globe className="w-5 h-5 text-yellow-300" />
                      </div>
                      <div className="absolute top-1/2 -right-8 transform -translate-y-1/2">
                        <Shield className="w-5 h-5 text-yellow-300" />
                      </div>
                    </div>
                  </div>

                  {/* Corner Symbols */}
                  <div className="absolute top-4 left-4">
                    <Zap className="w-4 h-4 text-purple-200" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <Crown className="w-4 h-4 text-purple-200" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Eye className="w-4 h-4 text-purple-200" />
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Triangle className="w-4 h-4 text-purple-200" />
                  </div>

                  {/* Sacred Numbers */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-purple-100 text-xs font-bold">
                    ∞ • 33 • 777 • ∞
                  </div>

                  {/* Holographic Shine */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-pulse" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Flip Indicator */}
        {interactive && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
            Click to flip • {isFlipped ? "Reverse" : "Obverse"}
          </div>
        )}
      </div>

      {/* Secret Symbolism Decoder */}
      {showSecrets && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl space-y-4"
        >
          <div className="text-center">
            <button
              onClick={() => setShowSymbolism(!showSymbolism)}
              className="text-sm text-yellow-600 hover:text-yellow-500 font-medium"
            >
              {showSymbolism ? "Hide" : "Reveal"} Sacred Symbolism
            </button>
          </div>

          <AnimatePresence>
            {showSymbolism && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-lg p-6 border border-purple-500/30"
              >
                <h3 className="text-lg font-bold text-yellow-400 mb-4 text-center">Imperial Symbolism Decoded</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Front Side Meanings */}
                  <div>
                    <h4 className="font-semibold text-purple-300 mb-2">Obverse (Front)</h4>
                    <ul className="space-y-2 text-sm text-purple-100">
                      <li>
                        <strong>Portrait:</strong> Divine authority in human form
                      </li>
                      <li>
                        <strong>Circuit Pattern:</strong> Fusion of ancient wisdom & digital power
                      </li>
                      <li>
                        <strong>Crown:</strong> Sovereign authority over global economics
                      </li>
                      <li>
                        <strong>MMXXIV:</strong> The year of digital awakening
                      </li>
                      <li>
                        <strong>Latin Title:</strong> "Digital Economic Emperor"
                      </li>
                    </ul>
                  </div>

                  {/* Back Side Meanings */}
                  <div>
                    <h4 className="font-semibold text-purple-300 mb-2">Reverse (Back)</h4>
                    <ul className="space-y-2 text-sm text-purple-100">
                      <li>
                        <strong>All-Seeing Eye:</strong> Divine providence over humanity
                      </li>
                      <li>
                        <strong>Triangle:</strong> Perfect balance of power, wisdom, love
                      </li>
                      <li>
                        <strong>ORDO AB CHAO:</strong> "Order from Chaos" - bringing stability
                      </li>
                      <li>
                        <strong>LUX E TENEBRIS:</strong> "Light from Darkness" - illumination
                      </li>
                      <li>
                        <strong>Sacred Numbers:</strong> ∞ (infinity), 33 (mastery), 777 (perfection)
                      </li>
                      <li>
                        <strong>Corner Symbols:</strong> Elements of imperial authority
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-yellow-900/20 to-amber-900/20 rounded border border-yellow-500/30">
                  <p className="text-sm text-yellow-200 text-center italic">
                    "True imperial power lies not in dominion over others, but in the elevation of all humanity through
                    divine wisdom, technological mastery, and compassionate leadership."
                  </p>
                  <p className="text-xs text-yellow-300 text-center mt-2">— The Caprelli Imperial Doctrine</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Official Specifications */}
      <div className="text-center space-y-1 text-xs text-muted-foreground">
        <div>Official Imperial Medallion • Quantum-Secured Authentication</div>
        <div>Minted by Supreme Digital Authority • Limited Genesis Edition</div>
        <div>Composition: 24K Digital Gold • Holographic Security Features</div>
      </div>
    </div>
  )
}
