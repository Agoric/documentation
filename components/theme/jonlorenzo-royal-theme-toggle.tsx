"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { useJonlorenzoTheme } from "@/contexts/jonlorenzo-theme-context"
import { Crown, Sparkles, Moon, Palette, Zap, Settings, Eye, Lightbulb } from "lucide-react"

export function JonlorenzoRoyalThemeToggle() {
  const {
    isDark,
    isRoyalMode,
    illuminationLevel,
    geniusActive,
    toggleTheme,
    toggleRoyalMode,
    setIlluminationLevel,
    activateGenius,
    deactivateGenius,
  } = useJonlorenzoTheme()

  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="fixed top-6 right-6 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {!isExpanded ? (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative cursor-pointer"
            onClick={() => setIsExpanded(true)}
          >
            <motion.div
              className={`w-14 h-14 rounded-full flex items-center justify-center ${
                isRoyalMode
                  ? "bg-gradient-to-br from-royal-600 to-royal-800"
                  : "bg-gradient-to-br from-slate-700 to-slate-900"
              }`}
              style={{
                boxShadow: isRoyalMode
                  ? "0 0 30px rgba(121, 92, 132, 0.4), 0 0 60px rgba(234, 179, 8, 0.2)"
                  : "0 0 20px rgba(100, 116, 139, 0.3)",
              }}
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: isRoyalMode
                  ? [
                      "0 0 30px rgba(121, 92, 132, 0.4), 0 0 60px rgba(234, 179, 8, 0.2)",
                      "0 0 40px rgba(121, 92, 132, 0.6), 0 0 80px rgba(234, 179, 8, 0.3)",
                      "0 0 30px rgba(121, 92, 132, 0.4), 0 0 60px rgba(234, 179, 8, 0.2)",
                    ]
                  : [
                      "0 0 20px rgba(100, 116, 139, 0.3)",
                      "0 0 30px rgba(100, 116, 139, 0.4)",
                      "0 0 20px rgba(100, 116, 139, 0.3)",
                    ],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isRoyalMode ? (
                <Crown className="w-6 h-6 text-illumination-400" />
              ) : (
                <Palette className="w-6 h-6 text-slate-300" />
              )}
            </motion.div>

            {/* Status Indicators */}
            <div className="absolute -top-1 -right-1 flex flex-col space-y-1">
              {isRoyalMode && (
                <motion.div
                  className="w-3 h-3 bg-illumination-500 rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                />
              )}
              {geniusActive && (
                <motion.div
                  className="w-3 h-3 bg-genius-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      "0 0 10px rgba(99, 102, 241, 0.5)",
                      "0 0 20px rgba(99, 102, 241, 0.8)",
                      "0 0 10px rgba(99, 102, 241, 0.5)",
                    ],
                  }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                />
              )}
            </div>

            {/* Tooltip */}
            <motion.div
              className="absolute bottom-full right-0 mb-3 bg-gradient-to-r from-royal-900/95 to-royal-800/95 backdrop-blur-sm text-illumination-200 text-xs px-3 py-2 rounded-lg opacity-0 hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-illumination-400/30"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-2">
                <Crown className="w-3 h-3" />
                <span>Jonlorenzo Royal Theme</span>
              </div>
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-royal-900/95"></div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="w-80"
          >
            <Card className="bg-gradient-to-br from-royal-50/95 to-royal-100/95 backdrop-blur-xl border-illumination-400/30">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "linear" }}
                    >
                      <Crown className="w-6 h-6 text-illumination-500" />
                    </motion.div>
                    <div>
                      <h3 className="text-illumination-300 font-bold text-lg">Jonlorenzo Royal</h3>
                      <p className="text-illumination-400/70 text-sm">Illumination Theme System</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsExpanded(false)}
                    className="w-8 h-8 p-0 text-illumination-400 hover:text-illumination-300"
                  >
                    ×
                  </Button>
                </div>

                {/* Theme Controls */}
                <div className="space-y-6">
                  {/* Royal Mode Toggle */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Crown className="w-4 h-4 text-illumination-400" />
                        <span className="text-illumination-300 font-medium">Royal Mode</span>
                      </div>
                      <Badge
                        className={`${
                          isRoyalMode
                            ? "bg-illumination-500/20 text-illumination-300 border-illumination-400/30"
                            : "bg-slate-500/20 text-slate-300 border-slate-400/30"
                        }`}
                      >
                        {isRoyalMode ? "ACTIVE" : "INACTIVE"}
                      </Badge>
                    </div>
                    <Button
                      onClick={toggleRoyalMode}
                      className={`w-full ${
                        isRoyalMode
                          ? "bg-gradient-to-r from-illumination-600 to-illumination-700 hover:from-illumination-700 hover:to-illumination-800"
                          : "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {isRoyalMode ? <Sparkles className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        <span>{isRoyalMode ? "Royal Illumination Active" : "Activate Royal Mode"}</span>
                      </div>
                    </Button>
                  </div>

                  {/* Illumination Level */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Lightbulb className="w-4 h-4 text-illumination-400" />
                        <span className="text-illumination-300 font-medium">Illumination Level</span>
                      </div>
                      <span className="text-illumination-400 text-sm">{illuminationLevel}%</span>
                    </div>
                    <Slider
                      value={[illuminationLevel]}
                      onValueChange={([value]) => setIlluminationLevel(value)}
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="grid grid-cols-4 gap-1 text-xs">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIlluminationLevel(25)}
                        className="text-illumination-400 hover:text-illumination-300"
                      >
                        Dim
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIlluminationLevel(50)}
                        className="text-illumination-400 hover:text-illumination-300"
                      >
                        Medium
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIlluminationLevel(75)}
                        className="text-illumination-400 hover:text-illumination-300"
                      >
                        Bright
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIlluminationLevel(100)}
                        className="text-illumination-400 hover:text-illumination-300"
                      >
                        Max
                      </Button>
                    </div>
                  </div>

                  {/* Genius Guide Control */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={
                            geniusActive
                              ? {
                                  scale: [1, 1.2, 1],
                                  boxShadow: [
                                    "0 0 10px rgba(99, 102, 241, 0.5)",
                                    "0 0 20px rgba(99, 102, 241, 0.8)",
                                    "0 0 10px rgba(99, 102, 241, 0.5)",
                                  ],
                                }
                              : {}
                          }
                          transition={{ repeat: geniusActive ? Number.POSITIVE_INFINITY : 0, duration: 1.5 }}
                        >
                          <div className="w-4 h-4 bg-genius-500 rounded-full" />
                        </motion.div>
                        <span className="text-illumination-300 font-medium">Genius Guide</span>
                      </div>
                      <Badge
                        className={`${
                          geniusActive
                            ? "bg-genius-500/20 text-genius-300 border-genius-400/30"
                            : "bg-slate-500/20 text-slate-300 border-slate-400/30"
                        }`}
                      >
                        {geniusActive ? "GUIDING" : "DORMANT"}
                      </Badge>
                    </div>
                    <Button
                      onClick={geniusActive ? deactivateGenius : activateGenius}
                      className={`w-full ${
                        geniusActive
                          ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                          : "bg-gradient-to-r from-genius-600 to-genius-700 hover:from-genius-700 hover:to-genius-800"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {geniusActive ? <Zap className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                        <span>{geniusActive ? "Deactivate Genius Guide" : "Activate Genius Guide"}</span>
                      </div>
                    </Button>
                  </div>

                  {/* Theme Presets */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Settings className="w-4 h-4 text-illumination-400" />
                      <span className="text-illumination-300 font-medium">Quick Presets</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          toggleRoyalMode()
                          setIlluminationLevel(100)
                          activateGenius()
                        }}
                        className="border-illumination-400/30 text-illumination-300 hover:bg-illumination-500/10"
                      >
                        <Crown className="w-3 h-3 mr-1" />
                        Full Royal
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setIlluminationLevel(25)
                          deactivateGenius()
                        }}
                        className="border-slate-400/30 text-slate-300 hover:bg-slate-500/10"
                      >
                        <Moon className="w-3 h-3 mr-1" />
                        Minimal
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Status Display */}
                <div className="mt-6 pt-4 border-t border-illumination-400/20">
                  <div className="grid grid-cols-3 gap-4 text-center text-xs">
                    <div>
                      <div className={`text-lg font-bold ${isRoyalMode ? "text-illumination-400" : "text-slate-400"}`}>
                        {isRoyalMode ? "👑" : "🎨"}
                      </div>
                      <div className="text-illumination-300">Mode</div>
                    </div>
                    <div>
                      <div className="text-illumination-400 font-bold">{illuminationLevel}%</div>
                      <div className="text-illumination-300">Light</div>
                    </div>
                    <div>
                      <div className={`text-lg font-bold ${geniusActive ? "text-genius-400" : "text-slate-400"}`}>
                        {geniusActive ? "🔮" : "💤"}
                      </div>
                      <div className="text-illumination-300">Guide</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
