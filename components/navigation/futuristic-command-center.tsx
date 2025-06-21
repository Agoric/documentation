"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Crown, Command, Bell, Settings, Globe, TrendingUp, Coins, Activity } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function FuturisticCommandCenter() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const [isOnline, setIsOnline] = useState(true)

  // Mock citizen data
  const citizenData = {
    name: "Marcus Aurelius",
    id: "SNAPP-2024-001",
    level: "Supreme Authority",
    qgiBalance: 250000,
    bondValue: 8500,
    status: "Active",
    joinDate: "2024-01-15",
  }

  return (
    <>
      {/* Main Navigation Orb */}
      <motion.div
        className="fixed top-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      >
        <motion.div
          className="relative"
          onHoverStart={() => setIsExpanded(true)}
          onHoverEnd={() => setIsExpanded(false)}
        >
          {/* Core Orb */}
          <motion.div
            className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400/20 via-purple-500/30 to-cyan-400/20 backdrop-blur-xl border border-amber-400/30 cursor-pointer shadow-2xl"
            animate={{
              scale: isExpanded ? 1.1 : 1,
              boxShadow: isExpanded
                ? "0 0 40px rgba(251, 191, 36, 0.4), 0 0 80px rgba(168, 85, 247, 0.2)"
                : "0 0 20px rgba(251, 191, 36, 0.2)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Central Crown Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Crown className="w-8 h-8 text-amber-400" />
            </div>

            {/* Notification Badge */}
            {notifications > 0 && (
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              >
                {notifications}
              </motion.div>
            )}

            {/* Online Status Indicator */}
            <div className="absolute bottom-1 right-1">
              <div className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-400" : "bg-red-400"}`}>
                <div
                  className={`w-full h-full rounded-full animate-pulse ${isOnline ? "bg-green-300" : "bg-red-300"}`}
                />
              </div>
            </div>

            {/* Rotating Border Effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-amber-400 via-purple-500 to-cyan-400 opacity-30"
              style={{
                background: "conic-gradient(from 0deg, #fbbf24, #a855f7, #06b6d4, #fbbf24)",
                mask: "radial-gradient(circle at center, transparent 70%, black 71%)",
                WebkitMask: "radial-gradient(circle at center, transparent 70%, black 71%)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </motion.div>

          {/* Expanded Citizen ID Card */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="absolute top-0 right-0 w-80 bg-gradient-to-br from-purple-900/95 via-indigo-900/95 to-purple-900/95 backdrop-blur-xl border border-amber-400/30 rounded-2xl shadow-2xl"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
                }}
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {/* Header */}
                <div className="p-4 border-b border-amber-400/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                        <Crown className="w-6 h-6 text-purple-900" />
                      </div>
                      <div>
                        <h3 className="text-amber-300 font-bold text-lg font-serif">{citizenData.name}</h3>
                        <p className="text-purple-200 text-sm">CIVIS SUPREMUS</p>
                      </div>
                    </div>
                    <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30">{citizenData.level}</Badge>
                  </div>
                </div>

                {/* Citizen Details */}
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-purple-300">Citizen ID</p>
                      <p className="text-amber-300 font-mono">{citizenData.id}</p>
                    </div>
                    <div>
                      <p className="text-purple-300">Status</p>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                        <p className="text-green-400">{citizenData.status}</p>
                      </div>
                    </div>
                  </div>

                  {/* Financial Stats */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-purple-800/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Coins className="w-4 h-4 text-amber-400" />
                        <span className="text-purple-200 text-sm">QGI Balance</span>
                      </div>
                      <span className="text-amber-300 font-bold">${citizenData.qgiBalance.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-purple-800/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-cyan-400" />
                        <span className="text-purple-200 text-sm">Bond Value</span>
                      </div>
                      <span className="text-cyan-300 font-bold">${citizenData.bondValue.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Network Status */}
                  <div className="flex items-center justify-between p-2 bg-purple-800/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-green-400" />
                      <span className="text-purple-200 text-sm">Neural Network</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 text-sm">Connected</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="p-4 border-t border-amber-400/20">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      className="bg-purple-600/50 hover:bg-purple-600/70 border border-purple-400/30 text-purple-100"
                    >
                      <Command className="w-4 h-4 mr-1" />
                      Commands
                    </Button>
                    <Button
                      size="sm"
                      className="bg-amber-600/50 hover:bg-amber-600/70 border border-amber-400/30 text-amber-100"
                    >
                      <Bell className="w-4 h-4 mr-1" />
                      Alerts ({notifications})
                    </Button>
                  </div>
                </div>

                {/* SnappAiFi Branding */}
                <div className="px-4 pb-4">
                  <div className="text-center">
                    <p className="text-amber-400/60 text-xs font-serif tracking-wider">
                      SNAPP<span className="text-cyan-400">AI</span>FI
                    </p>
                    <p className="text-purple-300/40 text-xs">SUPREMA AUCTORITAS DIGITALIS</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Floating Action Buttons */}
      <motion.div
        className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/80 to-indigo-600/80 backdrop-blur-xl border border-purple-400/30 flex items-center justify-center text-purple-100 hover:scale-110 transition-transform shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings className="w-5 h-5" />
        </motion.button>

        <motion.button
          className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600/80 to-orange-600/80 backdrop-blur-xl border border-amber-400/30 flex items-center justify-center text-amber-100 hover:scale-110 transition-transform shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Globe className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </>
  )
}
