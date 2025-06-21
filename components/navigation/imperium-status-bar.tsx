"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Crown, Shield, Globe, Activity, Zap, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ImperiumStatusBar() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [systemStatus, setSystemStatus] = useState("OPTIMAL")

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-purple-950/95 via-indigo-950/95 to-purple-950/95 backdrop-blur-xl border-b border-amber-400/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left: SnappAiFi Branding */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Crown className="w-6 h-6 text-amber-400" />
              <span className="text-xl font-bold text-amber-300 font-serif">
                SNAPP<span className="text-cyan-400">AI</span>FI
              </span>
            </div>
            <Badge variant="outline" className="border-amber-400/50 text-amber-300 text-xs">
              IMPERIUM v2.0
            </Badge>
          </div>

          {/* Center: System Status */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">{systemStatus}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm">Global Network</span>
            </div>

            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm">Neural Core</span>
            </div>
          </div>

          {/* Right: Time and Notifications */}
          <div className="flex items-center space-x-4">
            <div className="text-purple-200 text-sm font-mono">{currentTime.toLocaleTimeString()}</div>

            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4 text-amber-400" />
              <Badge variant="secondary" className="bg-red-500/20 text-red-300 text-xs">
                3
              </Badge>
            </div>

            <Badge variant="outline" className="border-green-400/50 text-green-300 text-xs">
              <Shield className="w-3 h-3 mr-1" />
              SECURE
            </Badge>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
