"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Home, Settings, Bell, Search, X, TrendingUp, DollarSign, Shield, Globe, Zap, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface ContactZone {
  id: string
  position: "left" | "right" | "top" | "bottom"
  size: number
  dashboard: "navigation" | "tools" | "notifications" | "search"
}

const contactZones: ContactZone[] = [
  { id: "nav-left", position: "left", size: 20, dashboard: "navigation" },
  { id: "tools-right", position: "right", size: 20, dashboard: "tools" },
  { id: "notifications-top", position: "top", size: 20, dashboard: "notifications" },
  { id: "search-bottom", position: "bottom", size: 20, dashboard: "search" },
]

interface RetractingDashboardProps {
  children: React.ReactNode
  className?: string
}

export function RetractingDashboard({ children, className }: RetractingDashboardProps) {
  const [activeDashboard, setActiveDashboard] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setMousePosition({ x, y })

      // Check contact zones
      const windowWidth = rect.width
      const windowHeight = rect.height
      let newActiveDashboard: string | null = null

      // Left edge contact
      if (x <= 20 && y > 100 && y < windowHeight - 100) {
        newActiveDashboard = "navigation"
      }
      // Right edge contact
      else if (x >= windowWidth - 20 && y > 100 && y < windowHeight - 100) {
        newActiveDashboard = "tools"
      }
      // Top edge contact
      else if (y <= 20 && x > 100 && x < windowWidth - 100) {
        newActiveDashboard = "notifications"
      }
      // Bottom edge contact
      else if (y >= windowHeight - 20 && x > 100 && x < windowWidth - 100) {
        newActiveDashboard = "search"
      }

      if (newActiveDashboard !== activeDashboard) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        if (newActiveDashboard) {
          setActiveDashboard(newActiveDashboard)
          setIsHovering(true)
        } else {
          // Delay hiding to prevent flickering
          timeoutRef.current = setTimeout(() => {
            setActiveDashboard(null)
            setIsHovering(false)
          }, 300)
        }
      }
    }

    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        setActiveDashboard(null)
        setIsHovering(false)
      }, 500)
    }

    if (containerRef.current) {
      containerRef.current.addEventListener("mousemove", handleMouseMove)
      containerRef.current.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove)
        containerRef.current.removeEventListener("mouseleave", handleMouseLeave)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [activeDashboard])

  const NavigationDashboard = () => (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-xl border-r border-purple-500/20 z-50"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="h-6 w-6 text-amber-400" />
            <h2 className="text-xl font-bold text-white">Imperial Navigation</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveDashboard(null)}
            className="text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation Items */}
        <div className="space-y-2">
          {[
            { icon: Home, label: "Dashboard", href: "/dashboard", badge: null },
            { icon: TrendingUp, label: "Snapifi", href: "/dashboard/snapifi", badge: "New" },
            { icon: DollarSign, label: "Banking", href: "/dashboard/banking", badge: null },
            { icon: Shield, label: "DAX", href: "/dashboard/dax", badge: "3" },
            { icon: Globe, label: "Treasury", href: "/dashboard/treasury", badge: null },
            { icon: Zap, label: "AI Concierge", href: "/dashboard/ai-concierge", badge: "Live" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-white/10 hover:text-amber-400 transition-colors"
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
                {item.badge && <Badge className="ml-auto bg-amber-500 text-black text-xs">{item.badge}</Badge>}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-white mb-3">Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Portfolio Value</span>
                <span className="text-green-400">$2.4M</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Today's Gain</span>
                <span className="text-green-400">+$12,450</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Active Positions</span>
                <span className="text-blue-400">23</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )

  const ToolsDashboard = () => (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed right-0 top-0 h-full w-80 bg-gradient-to-b from-slate-900/95 via-indigo-900/95 to-slate-900/95 backdrop-blur-xl border-l border-indigo-500/20 z-50"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Imperial Tools</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveDashboard(null)}
            className="text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Tool Categories */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Trading Tools</h3>
            <div className="space-y-1">
              {["Market Scanner", "Portfolio Analyzer", "Risk Calculator", "Yield Optimizer"].map((tool, index) => (
                <motion.div
                  key={tool}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-gray-300 hover:bg-white/10 hover:text-blue-400"
                  >
                    {tool}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Analytics</h3>
            <div className="space-y-1">
              {["Performance Metrics", "Correlation Analysis", "Volatility Monitor", "Trend Predictor"].map(
                (tool, index) => (
                  <motion.div
                    key={tool}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: (index + 4) * 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-gray-300 hover:bg-white/10 hover:text-blue-400"
                    >
                      {tool}
                    </Button>
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-white mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                Buy
              </Button>
              <Button size="sm" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
                Sell
              </Button>
              <Button size="sm" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
                Analyze
              </Button>
              <Button size="sm" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                Alert
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )

  const NotificationsDashboard = () => (
    <motion.div
      initial={{ y: -300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 left-1/2 transform -translate-x-1/2 w-96 bg-gradient-to-r from-slate-900/95 via-emerald-900/95 to-slate-900/95 backdrop-blur-xl border border-emerald-500/20 rounded-b-xl z-50"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Imperial Alerts</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveDashboard(null)}
            className="text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Notifications */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {[
            {
              type: "success",
              title: "Portfolio Milestone",
              message: "Your portfolio has reached $2.4M",
              time: "2m ago",
            },
            { type: "info", title: "Market Update", message: "Treasury yields showing upward trend", time: "15m ago" },
            {
              type: "warning",
              title: "Risk Alert",
              message: "High volatility detected in crypto positions",
              time: "1h ago",
            },
            {
              type: "success",
              title: "Trade Executed",
              message: "Successfully purchased 1000 shares of TSLA",
              time: "2h ago",
            },
          ].map((notification, index) => (
            <motion.div
              key={index}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full mt-2",
                    notification.type === "success" && "bg-green-400",
                    notification.type === "info" && "bg-blue-400",
                    notification.type === "warning" && "bg-yellow-400",
                  )}
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-white">{notification.title}</h4>
                  <p className="text-xs text-gray-300 mt-1">{notification.message}</p>
                  <span className="text-xs text-gray-400 mt-2 block">{notification.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )

  const SearchDashboard = () => (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-96 bg-gradient-to-r from-slate-900/95 via-violet-900/95 to-slate-900/95 backdrop-blur-xl border border-violet-500/20 rounded-t-xl z-50"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 text-violet-400" />
            <h2 className="text-lg font-bold text-white">Imperial Search</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveDashboard(null)}
            className="text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search securities, markets, or commands..."
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-violet-400"
          />
        </div>

        {/* Quick Search Options */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-300">Quick Search</h3>
          <div className="flex flex-wrap gap-2">
            {["AAPL", "TSLA", "Treasury Bills", "Gold", "Bitcoin", "S&P 500"].map((term) => (
              <Badge
                key={term}
                variant="outline"
                className="border-violet-500/30 text-violet-300 hover:bg-violet-500/20 cursor-pointer"
              >
                {term}
              </Badge>
            ))}
          </div>
        </div>

        {/* Recent Searches */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-300">Recent</h3>
          <div className="space-y-1">
            {["10-Year Treasury Note", "NVIDIA Corporation", "Bitcoin Price"].map((search, index) => (
              <motion.div
                key={search}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-sm text-gray-400 hover:text-white cursor-pointer p-1 hover:bg-white/5 rounded"
              >
                {search}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div ref={containerRef} className={cn("relative w-full h-screen overflow-hidden", className)}>
      {/* Contact Zone Indicators */}
      <AnimatePresence>
        {!activeDashboard && (
          <>
            {/* Left Contact Zone */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-purple-500 to-transparent"
            />
            {/* Right Contact Zone */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="absolute right-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-indigo-500 to-transparent"
            />
            {/* Top Contact Zone */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
            />
            {/* Bottom Contact Zone */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent"
            />
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full">{children}</div>

      {/* Retracting Dashboards */}
      <AnimatePresence>
        {activeDashboard === "navigation" && <NavigationDashboard />}
        {activeDashboard === "tools" && <ToolsDashboard />}
        {activeDashboard === "notifications" && <NotificationsDashboard />}
        {activeDashboard === "search" && <SearchDashboard />}
      </AnimatePresence>

      {/* Cursor Position Indicator (Debug) */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed top-4 right-4 bg-black/50 text-white p-2 rounded text-xs z-50">
          Mouse: {mousePosition.x}, {mousePosition.y}
          <br />
          Active: {activeDashboard || "none"}
          <br />
          Hovering: {isHovering ? "yes" : "no"}
        </div>
      )}
    </div>
  )
}
