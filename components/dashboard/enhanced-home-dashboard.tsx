"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"
import { FeatureToggleWidget } from "@/components/admin/feature-toggle-widget"
import { ZillowApiStatus } from "@/components/ecommerex/zillow-api-status"
import { UnifiedAIOrb } from "@/components/ai/unified-ai-orb"
import { ImperialAIChat } from "@/components/ai/imperial-ai-chat"
import { EnvironmentSelector } from "@/components/voai/environment-selector"
import { motion, AnimatePresence } from "framer-motion"
import {
  Shield,
  FileText,
  TrendingUp,
  Crown,
  Globe,
  Zap,
  DollarSign,
  Mountain,
  Waves,
  TreePine,
  Cpu,
  Sparkles,
  BarChart3,
  PieChart,
  Activity,
  Bell,
  Calendar,
  Clock,
  Target,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  MessageSquare,
  Settings,
  X,
  Home,
  Building,
} from "lucide-react"
import { VOAI_ENVIRONMENTS, type VOAIEnvironment } from "@/lib/voai-environments"

// Enhanced mock data with more comprehensive information
const citizenData = {
  id: "GC-2024-789456",
  name: "Alexander Magnus",
  romanName: "Supreme Authority Citizen",
  title: "Global Citizen - Level VII",
  memberSince: "2024-01-15",
  status: "active",
  level: 7,
  nextLevelProgress: 75,
  qgiBalance: 250000,
  bondValue: 8333,
  taxBenefits: 37500,
  avatar: "/placeholder-user.jpg",
  address: {
    street: "Digital Domicile Territory",
    city: "QUICA Realm",
    jurisdiction: "Global Citizenship Zone",
  },
  contact: {
    email: "alexander.magnus@quica.global",
    phone: "+1 (555) 123-4567",
  },
  achievements: [
    { id: 1, name: "First Investment", icon: DollarSign, date: "2024-01-15" },
    { id: 2, name: "Credit Master", icon: CreditCard, date: "2024-02-01" },
    { id: 3, name: "Property Owner", icon: Home, date: "2024-02-15" },
    { id: 4, name: "Elite Status", icon: Crown, date: "2024-03-01" },
  ],
  recentActivity: [
    { id: 1, action: "QGI Investment", amount: 5000, date: "2024-03-15", type: "investment" },
    { id: 2, action: "Credit Score Update", amount: 847, date: "2024-03-14", type: "credit" },
    { id: 3, action: "Property Valuation", amount: 450000, date: "2024-03-13", type: "property" },
    { id: 4, action: "Bond Interest", amount: 125, date: "2024-03-12", type: "income" },
  ],
}

const marketData = {
  qgiPrice: 1.23,
  qgiChange: 0.05,
  bondYield: 4.2,
  bondChange: 0.1,
  marketCap: "2.4B",
  volume24h: "45.2M",
  totalInvestors: 12847,
  activeLoans: 3421,
}

const notifications = [
  {
    id: 1,
    title: "Credit Score Increased",
    message: "Your Snap Score increased by 23 points to 847",
    type: "success",
    time: "2 hours ago",
    icon: TrendingUp,
  },
  {
    id: 2,
    title: "New Investment Opportunity",
    message: "High-yield bond available for QGI holders",
    type: "info",
    time: "4 hours ago",
    icon: Target,
  },
  {
    id: 3,
    title: "Payment Due Reminder",
    message: "Credit acceleration payment due in 3 days",
    type: "warning",
    time: "1 day ago",
    icon: Clock,
  },
  {
    id: 4,
    title: "Document Verified",
    message: "Your identity protection policy has been verified",
    type: "success",
    time: "2 days ago",
    icon: Shield,
  },
]

const portfolioAssets = [
  { name: "QGI Holdings", value: 250000, change: 12.5, allocation: 65, icon: Zap },
  { name: "Real Estate", value: 450000, change: 8.2, allocation: 25, icon: Home },
  { name: "Bonds", value: 8333, change: 4.1, allocation: 7, icon: FileText },
  { name: "Cash", value: 15000, change: 0.1, allocation: 3, icon: Wallet },
]

// Update the quickActions array to include EcommX, Real Estate, and Home Dashboard as center of attention
const quickActions = [
  // CENTER OF ATTENTION - Main Features
  {
    name: "Home Dashboard",
    icon: Home,
    color: "from-amber-500 via-yellow-400 to-amber-600",
    action: "home",
    priority: "high",
    size: "large",
  },
  {
    name: "EcommX Marketplace",
    icon: Zap,
    color: "from-purple-500 via-indigo-500 to-purple-600",
    action: "ecommx",
    priority: "high",
    size: "large",
  },
  {
    name: "Real Estate Empire",
    icon: Building,
    color: "from-emerald-500 via-green-500 to-emerald-600",
    action: "realestate",
    priority: "high",
    size: "large",
  },

  // Secondary Actions
  {
    name: "Check Credit",
    icon: CreditCard,
    color: "from-blue-500 to-cyan-600",
    action: "credit",
    priority: "medium",
    size: "medium",
  },
  {
    name: "View Documents",
    icon: FileText,
    color: "from-rose-500 to-pink-600",
    action: "documents",
    priority: "medium",
    size: "medium",
  },
  {
    name: "Contact Support",
    icon: MessageSquare,
    color: "from-violet-500 to-purple-600",
    action: "support",
    priority: "medium",
    size: "medium",
  },
  {
    name: "Banking Portal",
    icon: Wallet,
    color: "from-teal-500 to-cyan-600",
    action: "banking",
    priority: "medium",
    size: "medium",
  },
  {
    name: "Settings",
    icon: Settings,
    color: "from-gray-500 to-slate-600",
    action: "settings",
    priority: "low",
    size: "small",
  },
]

const upcomingEvents = [
  { id: 1, title: "QGI Quarterly Review", date: "2024-03-20", time: "2:00 PM", type: "meeting" },
  { id: 2, title: "Credit Score Update", date: "2024-03-22", time: "12:00 AM", type: "automatic" },
  { id: 3, title: "Bond Interest Payment", date: "2024-03-25", time: "9:00 AM", type: "payment" },
  { id: 4, title: "Property Tax Due", date: "2024-03-30", time: "11:59 PM", type: "deadline" },
]

export function EnhancedHomeDashboard() {
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null)
  const [selectedEnvironment, setSelectedEnvironment] = useState<VOAIEnvironment>(VOAI_ENVIRONMENTS[0])
  const [environmentProgress, setEnvironmentProgress] = useState<Record<string, number>>({
    wolf: 45,
    forest: 32,
    mountain: 67,
    ocean: 23,
    cyber: 89,
  })
  const [executionResults, setExecutionResults] = useState<string[]>([])
  const [isExecuting, setIsExecuting] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [aiChatExpanded, setAiChatExpanded] = useState(false)
  const [selectedQuickAction, setSelectedQuickAction] = useState<string | null>(null)

  // Memoize callbacks to prevent infinite re-renders
  const updateTime = useCallback(() => {
    setCurrentTime(new Date())
  }, [])

  const handleEnvironmentChange = useCallback((environment: VOAIEnvironment) => {
    setSelectedEnvironment(environment)
  }, [])

  const handleActionExecute = useCallback((env: string, action: string, result: string) => {
    setExecutionResults((prev) => [result, ...prev.slice(0, 2)])
    setEnvironmentProgress((prev) => ({
      ...prev,
      [env]: Math.min((prev[env] || 0) + 15, 100),
    }))
  }, [])

  // Update the handleQuickAction function to handle the new actions
  const handleQuickAction = useCallback((action: string) => {
    setSelectedQuickAction(action)

    // Handle navigation for the new actions
    switch (action) {
      case "home":
        window.location.href = "/dashboard/home"
        break
      case "ecommx":
        window.location.href = "/dashboard/ecommerex"
        break
      case "realestate":
        window.location.href = "/dashboard/real-estate"
        break
      case "credit":
        window.location.href = "/dashboard/credit-acceleration"
        break
      case "documents":
        // Scroll to documents tab or open documents modal
        break
      case "banking":
        window.location.href = "/dashboard/banking"
        break
      case "support":
        // Open support chat or modal
        break
      case "settings":
        // Open settings modal
        break
      default:
        console.log(`Action ${action} triggered`)
    }

    setTimeout(() => setSelectedQuickAction(null), 2000)
  }, [])

  const toggleNotifications = useCallback(() => {
    setShowNotifications((prev) => !prev)
  }, [])

  useEffect(() => {
    const timer = setInterval(updateTime, 60000) // Update every minute instead of every second
    return () => clearInterval(timer)
  }, [updateTime])

  const getEnvironmentIcon = useCallback((envId: string) => {
    const icons = {
      wolf: Crown,
      forest: TreePine,
      mountain: Mountain,
      ocean: Waves,
      cyber: Cpu,
    }
    return icons[envId as keyof typeof icons] || Globe
  }, [])

  const getEnvironmentGradient = useCallback((envId: string) => {
    const gradients = {
      wolf: "from-gray-800 to-slate-700",
      forest: "from-green-800 to-emerald-700",
      mountain: "from-slate-800 to-blue-700",
      ocean: "from-blue-800 to-cyan-700",
      cyber: "from-purple-800 to-indigo-700",
    }
    return gradients[envId as keyof typeof gradients] || "from-slate-800 to-gray-700"
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Enhanced Header with Live Stats */}
        <div className="text-center relative">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <SupremeAuthorityCoin size="lg" variant="logo" animated />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-clip-text text-transparent font-serif">
                Supreme Command Center
              </h1>
              <p className="text-xl text-amber-300/80 italic font-serif">
                {currentTime.toLocaleString()} • Level {citizenData.level} Citizen
              </p>
            </div>
          </div>

          {/* Live Market Ticker */}
          <motion.div
            className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-amber-400/30 rounded-lg p-3 mb-6"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300">QGI: ${marketData.qgiPrice}</span>
                <span className="text-green-400">+{marketData.qgiChange}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300">Bonds: {marketData.bondYield}%</span>
                <span className="text-green-400">+{marketData.bondChange}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span className="text-amber-300">Volume: ${marketData.volume24h}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-green-300">{marketData.totalInvestors.toLocaleString()} Investors</span>
              </div>
            </div>
          </motion.div>

          {/* Notification Bell */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-0 right-0 text-amber-400 hover:text-amber-300"
            onClick={toggleNotifications}
          >
            <Bell className="w-5 h-5" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                {notifications.length}
              </span>
            )}
          </Button>
        </div>

        {/* Notifications Dropdown */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 right-8 z-50 w-80"
            >
              <Card className="bg-gradient-to-br from-slate-900/95 to-purple-900/95 border-amber-400/30 backdrop-blur-xl">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-amber-300 text-lg">Notifications</CardTitle>
                    <Button variant="ghost" size="sm" onClick={toggleNotifications} className="text-amber-400">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {notifications.map((notification) => {
                        const Icon = notification.icon
                        return (
                          <div
                            key={notification.id}
                            className={`p-3 rounded-lg border ${
                              notification.type === "success"
                                ? "bg-green-900/20 border-green-400/30"
                                : notification.type === "warning"
                                  ? "bg-amber-900/20 border-amber-400/30"
                                  : "bg-blue-900/20 border-blue-400/30"
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <Icon className="w-4 h-4 mt-1 text-amber-400" />
                              <div className="flex-1">
                                <div className="text-sm font-medium text-white">{notification.title}</div>
                                <div className="text-xs text-gray-300 mt-1">{notification.message}</div>
                                <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Main Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Column - Citizen Profile & Quick Actions */}
          <div className="xl:col-span-3 space-y-6">
            {/* Enhanced Digital ID Card */}
            <Card className="bg-gradient-to-br from-purple-900/60 via-indigo-900/60 to-purple-900/60 border-2 border-amber-400/40 shadow-2xl shadow-purple-500/20 backdrop-blur-xl relative overflow-hidden">
              {/* Royal background pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(234,179,8,0.1),transparent),radial-gradient(circle_at_80%_80%,rgba(147,51,234,0.1),transparent)]" />

              {/* Animated border glow */}
              <div className="absolute inset-0 border-2 border-amber-400/20 rounded-lg animate-pulse" />

              <CardHeader className="relative z-10">
                <CardTitle className="text-amber-300 font-serif flex items-center justify-center text-lg">
                  <Crown className="w-6 h-6 mr-2 animate-pulse" />
                  Imperial Citizenship Registry
                </CardTitle>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mt-2" />
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 flex items-center justify-center shadow-2xl shadow-amber-500/30">
                      <Crown className="w-10 h-10 text-white drop-shadow-lg" />
                    </div>
                    {/* Orbital rings around avatar */}
                    <div
                      className="absolute inset-0 border border-amber-400/30 rounded-full animate-spin"
                      style={{ animationDuration: "8s" }}
                    />
                    <div
                      className="absolute inset-[-4px] border border-purple-400/20 rounded-full animate-spin"
                      style={{ animationDuration: "12s", animationDirection: "reverse" }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300 bg-clip-text">
                      {citizenData.name}
                    </h3>
                    <p className="text-sm text-amber-300/80 italic font-serif">{citizenData.romanName}</p>
                    <Badge className="mt-2 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 text-purple-200 border-purple-400/40 shadow-lg">
                      <Crown className="w-3 h-3 mr-1" />
                      {citizenData.title}
                    </Badge>
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-2 bg-gradient-to-r from-amber-900/20 to-purple-900/20 rounded border border-amber-400/20">
                    <span className="text-amber-200/80 font-serif">Citizen Registry ID</span>
                    <span className="text-amber-300 font-mono text-xs bg-slate-900/50 px-2 py-1 rounded">
                      {citizenData.id}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded border border-green-400/20">
                    <span className="text-green-200/80 font-serif">Imperial Status</span>
                    <Badge className="bg-gradient-to-r from-green-600/30 to-emerald-600/30 text-green-200 border-green-400/40">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-1" />
                      Active Sovereign
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 rounded border border-purple-400/20">
                    <span className="text-purple-200/80 font-serif">Authority Level</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-amber-300 font-bold">Level {citizenData.level}</span>
                      <div className="flex space-x-1">
                        {[...Array(citizenData.level)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-amber-200/80 font-serif">Ascension Progress</span>
                    <span className="text-amber-300 font-bold">{citizenData.nextLevelProgress}%</span>
                  </div>
                  <div className="relative">
                    <Progress value={citizenData.nextLevelProgress} className="h-3 bg-slate-800/50" />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-400/30 to-amber-400/20 rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Recent Achievements with royal styling */}
                <div className="space-y-3">
                  <h4 className="text-amber-300 font-serif text-sm text-center tracking-wider">✦ IMPERIAL HONORS ✦</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {citizenData.achievements.slice(0, 4).map((achievement) => {
                      const Icon = achievement.icon
                      return (
                        <motion.div
                          key={achievement.id}
                          className="flex items-center space-x-2 p-2 bg-gradient-to-r from-amber-900/30 to-yellow-900/30 rounded border border-amber-400/30 hover:border-amber-400/50 transition-all duration-300 group cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                        >
                          <Icon className="w-4 h-4 text-amber-400 group-hover:text-amber-300 transition-colors" />
                          <span className="text-xs text-amber-300 font-medium">{achievement.name}</span>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Grid */}
            <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-amber-400/30 shadow-2xl shadow-amber-500/10">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif text-lg flex items-center justify-center">
                  <Crown className="w-5 h-5 mr-2" />
                  Royal Command Center
                </CardTitle>
                <CardDescription className="text-amber-200/70 text-center font-serif italic">
                  Imperial Quick Actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* High Priority Actions - Center of Attention */}
                <div className="space-y-3">
                  <h4 className="text-amber-300 font-serif text-sm text-center mb-4 tracking-wider">
                    ✦ IMPERIAL DOMAINS ✦
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {quickActions
                      .filter((action) => action.priority === "high")
                      .map((action) => {
                        const Icon = action.icon
                        return (
                          <motion.div key={action.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="ghost"
                              className={`w-full h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br ${action.color} hover:opacity-90 text-white border-2 border-amber-400/30 hover:border-amber-400/60 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
                              onClick={() => handleQuickAction(action.action)}
                            >
                              {/* Royal background pattern */}
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                              {/* Animated border glow */}
                              <div className="absolute inset-0 border-2 border-amber-400/0 group-hover:border-amber-400/40 rounded transition-all duration-300" />

                              <Icon className="w-8 h-8 drop-shadow-lg" />
                              <span className="text-sm font-bold tracking-wide">{action.name}</span>

                              {selectedQuickAction === action.action && (
                                <motion.div
                                  className="absolute inset-0 bg-white/20 rounded"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: [0, 1, 0] }}
                                  transition={{ duration: 0.8 }}
                                />
                              )}
                            </Button>
                          </motion.div>
                        )
                      })}
                  </div>
                </div>

                {/* Medium Priority Actions */}
                <div className="space-y-3">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
                  <h4 className="text-amber-300/80 font-serif text-xs text-center tracking-wider">ROYAL SERVICES</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {quickActions
                      .filter((action) => action.priority === "medium")
                      .map((action) => {
                        const Icon = action.icon
                        return (
                          <motion.div key={action.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="ghost"
                              className={`w-full h-16 flex flex-col items-center justify-center space-y-1 bg-gradient-to-br ${action.color} hover:opacity-80 text-white border border-amber-400/20 hover:border-amber-400/40 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group`}
                              onClick={() => handleQuickAction(action.action)}
                            >
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                              <Icon className="w-5 h-5" />
                              <span className="text-xs font-medium">{action.name}</span>

                              {selectedQuickAction === action.action && (
                                <motion.div
                                  className="absolute inset-0 bg-white/15 rounded"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: [0, 1, 0] }}
                                  transition={{ duration: 0.5 }}
                                />
                              )}
                            </Button>
                          </motion.div>
                        )
                      })}
                  </div>
                </div>

                {/* Low Priority Actions */}
                <div className="space-y-2">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions
                      .filter((action) => action.priority === "low")
                      .map((action) => {
                        const Icon = action.icon
                        return (
                          <motion.div key={action.name} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                            <Button
                              variant="ghost"
                              className={`w-full h-12 flex items-center justify-center space-x-2 bg-gradient-to-r ${action.color} hover:opacity-80 text-white border border-amber-400/10 hover:border-amber-400/30 text-xs transition-all duration-300`}
                              onClick={() => handleQuickAction(action.action)}
                            >
                              <Icon className="w-4 h-4" />
                              <span>{action.name}</span>

                              {selectedQuickAction === action.action && (
                                <motion.div
                                  className="absolute inset-0 bg-white/10 rounded"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: [0, 1, 0] }}
                                  transition={{ duration: 0.3 }}
                                />
                              )}
                            </Button>
                          </motion.div>
                        )
                      })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature Toggle Widget */}
            <FeatureToggleWidget maxFeatures={5} compact={true} />

            {/* Zillow API Status */}
            <ZillowApiStatus />
          </div>

          {/* Center Column - Main Dashboard Content */}
          <div className="xl:col-span-6 space-y-6">
            {/* Enhanced Portfolio Overview */}
            <Card className="bg-gradient-to-br from-green-900/60 via-emerald-900/60 to-green-900/60 border-2 border-emerald-400/40 shadow-2xl shadow-emerald-500/20 backdrop-blur-xl relative overflow-hidden">
              {/* Royal background pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.1),transparent),radial-gradient(circle_at_70%_70%,rgba(34,197,94,0.1),transparent)]" />

              <CardHeader className="relative z-10">
                <CardTitle className="text-emerald-300 font-serif flex items-center justify-between text-lg">
                  <div className="flex items-center">
                    <div className="relative">
                      <PieChart className="w-6 h-6 mr-3 animate-spin" style={{ animationDuration: "8s" }} />
                      <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-lg animate-pulse" />
                    </div>
                    Imperial Treasury
                  </div>
                  <div className="text-right">
                    <motion.div
                      className="text-3xl font-bold text-transparent bg-gradient-to-r from-emerald-300 via-green-300 to-emerald-300 bg-clip-text"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    >
                      ${(citizenData.qgiBalance + citizenData.bondValue + citizenData.taxBenefits).toLocaleString()}
                    </motion.div>
                    <div className="text-sm text-emerald-200/80 font-serif italic">Total Sovereign Wealth</div>
                  </div>
                </CardTitle>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent mt-2" />
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {portfolioAssets.map((asset, index) => {
                    const Icon = asset.icon
                    return (
                      <motion.div
                        key={asset.name}
                        className="p-4 bg-gradient-to-br from-emerald-800/30 to-green-800/30 rounded-lg border-2 border-emerald-400/30 hover:border-emerald-400/50 transition-all duration-300 relative overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.02, y: -2 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {/* Royal background glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="flex items-center justify-between mb-3 relative z-10">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <Icon className="w-6 h-6 text-emerald-400 drop-shadow-lg" />
                              <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-md animate-pulse" />
                            </div>
                            <span className="text-sm font-bold text-emerald-300 font-serif">{asset.name}</span>
                          </div>
                          <Badge className="bg-gradient-to-r from-emerald-600/30 to-green-600/30 text-emerald-200 border-emerald-400/40 text-xs">
                            {asset.allocation}%
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mb-3 relative z-10">
                          <span className="text-xl font-bold text-transparent bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text">
                            ${asset.value.toLocaleString()}
                          </span>
                          <div className="flex items-center space-x-2">
                            {asset.change >= 0 ? (
                              <ArrowUpRight className="w-4 h-4 text-emerald-400 animate-bounce" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4 text-red-400" />
                            )}
                            <span
                              className={`text-sm font-bold ${asset.change >= 0 ? "text-emerald-400" : "text-red-400"}`}
                            >
                              {asset.change >= 0 ? "+" : ""}
                              {asset.change}%
                            </span>
                          </div>
                        </div>
                        <div className="relative">
                          <Progress value={asset.allocation} className="h-2 bg-slate-800/50" />
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 via-green-400/40 to-emerald-400/30 rounded-full animate-pulse" />
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* VOAI Environment Selector */}
            <Card className="bg-gradient-to-br from-indigo-900/60 via-purple-900/60 to-indigo-900/60 border-2 border-indigo-400/40 shadow-2xl shadow-indigo-500/20 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(99,102,241,0.1),transparent),radial-gradient(circle_at_60%_60%,rgba(147,51,234,0.1),transparent)]" />

              <CardHeader className="relative z-10">
                <CardTitle className="text-indigo-300 font-serif flex items-center text-lg">
                  <div className="relative">
                    <Globe className="w-6 h-6 mr-3 animate-pulse" />
                    <div className="absolute inset-0 bg-indigo-400/20 rounded-full blur-lg animate-pulse" />
                  </div>
                  VOAI Imperial Environments
                </CardTitle>
                <CardDescription className="text-indigo-200/70 font-serif italic">
                  Quantum-Enhanced Reality Domains
                </CardDescription>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent mt-2" />
              </CardHeader>
              <CardContent className="relative z-10">
                <EnvironmentSelector
                  onEnvironmentChange={handleEnvironmentChange}
                  onActionExecute={handleActionExecute}
                />
              </CardContent>
            </Card>

            {/* Analytics Dashboard */}
            <Card className="bg-gradient-to-br from-blue-900/60 via-cyan-900/60 to-blue-900/60 border-2 border-cyan-400/40 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(6,182,212,0.1),transparent),radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.1),transparent)]" />

              <CardHeader className="relative z-10">
                <CardTitle className="text-cyan-300 font-serif flex items-center text-lg">
                  <div className="relative">
                    <BarChart3 className="w-6 h-6 mr-3 animate-bounce" style={{ animationDuration: "2s" }} />
                    <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg animate-pulse" />
                  </div>
                  Imperial Analytics Command
                </CardTitle>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mt-2" />
              </CardHeader>
              <CardContent className="relative z-10">
                <Tabs defaultValue="financial" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-cyan-800/40 via-blue-800/40 to-cyan-800/40 border border-cyan-400/30">
                    <TabsTrigger
                      value="financial"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600/50 data-[state=active]:to-blue-600/50 data-[state=active]:text-cyan-200"
                    >
                      Financial
                    </TabsTrigger>
                    <TabsTrigger
                      value="credit"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600/50 data-[state=active]:to-blue-600/50 data-[state=active]:text-cyan-200"
                    >
                      Credit
                    </TabsTrigger>
                    <TabsTrigger
                      value="activity"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600/50 data-[state=active]:to-blue-600/50 data-[state=active]:text-cyan-200"
                    >
                      Activity
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="financial" className="space-y-4 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div
                        className="text-center p-6 bg-gradient-to-br from-cyan-800/30 to-blue-800/30 rounded-lg border-2 border-cyan-400/30 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text mb-2">
                          12.5%
                        </div>
                        <div className="text-sm text-cyan-200/80 font-serif">Portfolio Growth</div>
                      </motion.div>
                      <motion.div
                        className="text-center p-6 bg-gradient-to-br from-emerald-800/30 to-green-800/30 rounded-lg border-2 border-emerald-400/30 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text mb-2">
                          $45.2K
                        </div>
                        <div className="text-sm text-emerald-200/80 font-serif">Monthly Income</div>
                      </motion.div>
                    </div>
                  </TabsContent>

                  <TabsContent value="credit" className="space-y-4 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div
                        className="text-center p-6 bg-gradient-to-br from-purple-800/30 to-indigo-800/30 rounded-lg border-2 border-purple-400/30 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text mb-2">
                          847
                        </div>
                        <div className="text-sm text-purple-200/80 font-serif">Snap Score</div>
                      </motion.div>
                      <motion.div
                        className="text-center p-6 bg-gradient-to-br from-amber-800/30 to-yellow-800/30 rounded-lg border-2 border-amber-400/30 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text mb-2">
                          +23
                        </div>
                        <div className="text-sm text-amber-200/80 font-serif">Monthly Increase</div>
                      </motion.div>
                    </div>
                  </TabsContent>

                  <TabsContent value="activity" className="space-y-4 mt-6">
                    <div className="space-y-3">
                      {citizenData.recentActivity.slice(0, 3).map((activity, index) => (
                        <motion.div
                          key={activity.id}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-800/30 to-blue-800/30 rounded-lg border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div>
                            <div className="text-sm font-medium text-cyan-300 font-serif">{activity.action}</div>
                            <div className="text-xs text-cyan-200/60">{activity.date}</div>
                          </div>
                          <div className="text-sm font-bold text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text">
                            {activity.type === "investment" || activity.type === "income"
                              ? `$${activity.amount.toLocaleString()}`
                              : activity.amount}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - AI Chat & Additional Widgets */}
          <div className="xl:col-span-3 space-y-6">
            {/* Update Upcoming Events */}
            <Card className="bg-gradient-to-br from-amber-900/60 via-orange-900/60 to-amber-900/60 border-2 border-amber-400/40 shadow-2xl shadow-amber-500/20 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.1),transparent),radial-gradient(circle_at_70%_70%,rgba(251,146,60,0.1),transparent)]" />

              <CardHeader className="relative z-10">
                <CardTitle className="text-amber-300 font-serif text-lg flex items-center">
                  <div className="relative">
                    <Calendar className="w-5 h-5 mr-3 animate-pulse" />
                    <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-lg animate-pulse" />
                  </div>
                  Imperial Calendar
                </CardTitle>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mt-2" />
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-3">
                  {upcomingEvents.slice(0, 3).map((event, index) => (
                    <motion.div
                      key={event.id}
                      className="p-4 bg-gradient-to-r from-amber-800/30 to-orange-800/30 rounded-lg border-2 border-amber-400/30 hover:border-amber-400/50 transition-all duration-300 cursor-pointer group"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

                      <div className="relative z-10">
                        <div className="text-sm font-bold text-amber-300 font-serif mb-1">{event.title}</div>
                        <div className="text-xs text-amber-200/70 mb-2">
                          {event.date} at {event.time}
                        </div>
                        <Badge
                          className={`text-xs ${
                            event.type === "deadline"
                              ? "bg-gradient-to-r from-red-600/30 to-rose-600/30 text-red-200 border-red-400/40"
                              : event.type === "payment"
                                ? "bg-gradient-to-r from-emerald-600/30 to-green-600/30 text-emerald-200 border-emerald-400/40"
                                : "bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-200 border-blue-400/40"
                          }`}
                        >
                          {event.type.toUpperCase()}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Insights */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-400/30">
              <CardHeader>
                <CardTitle className="text-purple-300 font-serif text-sm flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Market Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-purple-800/20 rounded-lg border border-purple-400/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium text-purple-300">QGI Trending Up</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    QGI has shown strong performance with 12.5% growth this quarter
                  </p>
                </div>

                <div className="p-3 bg-green-800/20 rounded-lg border border-green-400/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Home className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-green-300">Real Estate Opportunity</span>
                  </div>
                  <p className="text-xs text-gray-400">New properties available in your investment range</p>
                </div>

                <div className="p-3 bg-blue-800/20 rounded-lg border border-blue-400/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-300">Bond Yields Rising</span>
                  </div>
                  <p className="text-xs text-gray-400">Consider increasing bond allocation for stable returns</p>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
              <CardHeader>
                <CardTitle className="text-slate-300 font-serif text-sm flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">AI Systems</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-green-400">Online</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Market Data</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-green-400">Live</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Credit Monitoring</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-green-400">Active</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">VOAI Environments</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-green-400">Ready</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Environment Activity */}
            <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-400/30">
              <CardHeader>
                <CardTitle className="text-indigo-300 font-serif text-sm flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Environment Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {executionResults.length === 0 ? (
                  <div className="text-center py-4 text-slate-400">
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="text-xs">No recent activity</div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {executionResults.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-2 bg-indigo-900/20 rounded border border-indigo-400/20"
                      >
                        <div className="text-xs text-indigo-300">{result}</div>
                        <div className="text-xs text-gray-500 mt-1">{new Date().toLocaleTimeString()}</div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Chat Components - Floating */}
        <UnifiedAIOrb />
        <ImperialAIChat />
      </div>
    </div>
  )
}

// Fix for missing Users import
function Users({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

// Fix for missing Star import
function Star({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  )
}

export default EnhancedHomeDashboard
