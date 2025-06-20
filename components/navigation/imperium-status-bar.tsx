"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Crown, Shield, Activity, Zap, Globe, Star, Bell, Settings, ChevronDown } from "lucide-react"

export function ImperiumStatusBar() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [systemStatus] = useState("OPTIMAL")
  const [neuralActivity] = useState(98.7)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-purple-950/95 via-indigo-950/95 to-purple-950/95 backdrop-blur-xl border-b border-amber-400/30"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      style={{
        clipPath: "polygon(0 0, 100% 0, calc(100% - 20px) 100%, 20px 100%)",
      }}
    >
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left - Imperial Branding */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-amber-300 font-serif">IMPERIUM SNAPIFI</h1>
              <p className="text-xs text-amber-300/70 italic">Suprema Auctoritas Digitalis</p>
            </div>
          </div>

          {/* System Status Indicators */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400 font-mono">{systemStatus}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-cyan-400 font-mono">{neuralActivity}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-purple-400 font-mono">GLOBAL</span>
            </div>
          </div>
        </div>

        {/* Center - Imperial Time */}
        <div className="hidden lg:block">
          <div className="text-center">
            <div className="text-sm font-mono text-amber-300">
              {currentTime.toLocaleTimeString("en-US", {
                hour12: false,
                timeZone: "UTC",
              })}{" "}
              UTC
            </div>
            <div className="text-xs text-amber-300/70 font-serif italic">Tempus Imperium</div>
          </div>
        </div>

        {/* Right - Citizen Status */}
        <div className="flex items-center space-x-4">
          {/* Quick Stats */}
          <div className="hidden md:flex items-center space-x-3">
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30">
              <Star className="w-3 h-3 mr-1" />
              Level VII
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">
              <Shield className="w-3 h-3 mr-1" />
              Imperator
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              className="w-8 h-8 p-0 text-amber-400 hover:text-amber-300 hover:bg-amber-500/20"
            >
              <Bell className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="w-8 h-8 p-0 text-purple-400 hover:text-purple-300 hover:bg-purple-500/20"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="hidden md:flex items-center space-x-1 text-amber-300 hover:text-amber-200 hover:bg-amber-500/20"
            >
              <span className="text-xs font-serif">Alexander Magnus</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Imperial Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
    </motion.div>
  )
}
