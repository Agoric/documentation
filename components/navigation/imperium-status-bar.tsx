"use client"
import { motion } from "framer-motion"
import { Crown, Shield, Zap, Globe, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ImperiumStatusBar() {
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-40 h-16 bg-black/80 backdrop-blur-xl border-b border-amber-500/20"
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Imperial Branding */}
        <div className="flex items-center space-x-4">
          <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
            <Crown className="w-6 h-6 text-amber-400" />
            <div>
              <h1 className="font-imperial text-amber-400 text-lg font-bold">IMPERIUM SNAPIFI</h1>
              <p className="text-purple-300 text-xs font-modern -mt-1">Suprema Auctoritas Digitalis</p>
            </div>
          </motion.div>
        </div>

        {/* Center Section - System Status */}
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-400/30">
            <Zap className="w-3 h-3 mr-1" />
            QUANTUM ACTIVE
          </Badge>

          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-400/30">
            <Globe className="w-3 h-3 mr-1" />
            GLOBAL NEXUS
          </Badge>

          <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-400/30">
            <Shield className="w-3 h-3 mr-1" />
            SECURED
          </Badge>
        </div>

        {/* Right Section - Time & Metrics */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="flex items-center space-x-2 text-amber-400">
              <Clock className="w-4 h-4" />
              <span className="font-mono text-sm font-bold">{currentTime}</span>
            </div>
            <div className="text-purple-300 text-xs font-imperial">Tempus Imperialis</div>
          </div>

          <div className="h-8 w-px bg-amber-500/30" />

          <div className="text-right">
            <div className="text-cyan-400 font-bold text-sm">LVII</div>
            <div className="text-purple-300 text-xs font-imperial">Citizens Active</div>
          </div>
        </div>
      </div>

      {/* Animated Border */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-500 via-purple-500 to-cyan-500"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.div>
  )
}
