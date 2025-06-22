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
  User,
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

const quickActions = [
  { name: "Invest in QGI", icon: Zap, color: "from-purple-500 to-indigo-600", action: "invest" },
  { name: "Check Credit", icon: CreditCard, color: "from-blue-500 to-cyan-600", action: "credit" },
  { name: "Browse Properties", icon: Home, color: "from-green-500 to-emerald-600", action: "property" },
  { name: "View Documents", icon: FileText, color: "from-amber-500 to-orange-600", action: "documents" },
  { name: "Contact Support", icon: MessageSquare, color: "from-pink-500 to-rose-600", action: "support" },
  { name: "Settings", icon: Settings, color: "from-gray-500 to-slate-600", action: "settings" },
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

  const handleQuickAction = useCallback((action: string) => {
    setSelectedQuickAction(action)
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
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Citizen Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-amber-300">{citizenData.name}</h3>
                    <p className="text-sm text-amber-300/70 italic">{citizenData.romanName}</p>
                    <Badge className="mt-1 bg-purple-600/20 text-purple-300 border-purple-400/30">
                      {citizenData.title}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Next Level Progress</span>
                    <span className="text-amber-300">{citizenData.nextLevelProgress}%</span>
                  </div>
                  <Progress value={citizenData.nextLevelProgress} className="h-2" />
                </div>

                {/* Recent Achievements */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-purple-300">Recent Achievements</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {citizenData.achievements.slice(0, 4).map((achievement) => {
                      const Icon = achievement.icon
                      return (
                        <div
                          key={achievement.id}
                          className="flex items-center space-x-2 p-2 bg-amber-900/20 rounded border border-amber-400/20"
                        >
                          <Icon className="w-3 h-3 text-amber-400" />
                          <span className="text-xs text-amber-300">{achievement.name}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Grid */}
            <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
              <CardHeader>
                <CardTitle className="text-slate-300 font-serif text-sm flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action) => {
                    const Icon = action.icon
                    return (
                      <motion.div key={action.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="ghost"
                          className={`w-full h-16 flex flex-col items-center justify-center space-y-1 bg-gradient-to-br ${action.color} hover:opacity-80 text-white border-0`}
                          onClick={() => handleQuickAction(action.action)}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-xs">{action.name}</span>
                          {selectedQuickAction === action.action && (
                            <motion.div
                              className="absolute inset-0 bg-white/20 rounded"
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
            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-300 font-serif flex items-center justify-between">
                  <div className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2" />
                    Portfolio Overview
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-300">
                      ${(citizenData.qgiBalance + citizenData.bondValue + citizenData.taxBenefits).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">Total Value</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {portfolioAssets.map((asset) => {
                    const Icon = asset.icon
                    return (
                      <div
                        key={asset.name}
                        className="p-4 bg-green-800/20 rounded-lg border border-green-400/20 hover:border-green-400/40 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Icon className="w-4 h-4 text-green-400" />
                            <span className="text-sm font-medium text-green-300">{asset.name}</span>
                          </div>
                          <span className="text-xs text-green-400">{asset.allocation}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-green-300">${asset.value.toLocaleString()}</span>
                          <div className="flex items-center space-x-1">
                            {asset.change >= 0 ? (
                              <ArrowUpRight className="w-3 h-3 text-green-400" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3 text-red-400" />
                            )}
                            <span className={`text-xs ${asset.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                              {asset.change >= 0 ? "+" : ""}
                              {asset.change}%
                            </span>
                          </div>
                        </div>
                        <Progress value={asset.allocation} className="h-1 mt-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* VOAI Environment Selector */}
            <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-400/30">
              <CardHeader>
                <CardTitle className="text-indigo-300 font-serif flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  VOAI Environment Platform
                </CardTitle>
                <CardDescription className="text-indigo-200/70">
                  Select and interact with immersive AI environments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EnvironmentSelector
                  onEnvironmentChange={handleEnvironmentChange}
                  onActionExecute={handleActionExecute}
                />
              </CardContent>
            </Card>

            {/* Analytics Dashboard */}
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
              <CardHeader>
                <CardTitle className="text-blue-300 font-serif flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="financial" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-blue-800/30">
                    <TabsTrigger value="financial">Financial</TabsTrigger>
                    <TabsTrigger value="credit">Credit</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>

                  <TabsContent value="financial" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-800/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-300">12.5%</div>
                        <div className="text-sm text-gray-400">Portfolio Growth</div>
                      </div>
                      <div className="text-center p-4 bg-green-800/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-300">$45.2K</div>
                        <div className="text-sm text-gray-400">Monthly Income</div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="credit" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-purple-800/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-300">847</div>
                        <div className="text-sm text-gray-400">Snap Score</div>
                      </div>
                      <div className="text-center p-4 bg-amber-800/20 rounded-lg">
                        <div className="text-2xl font-bold text-amber-300">+23</div>
                        <div className="text-sm text-gray-400">Monthly Increase</div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="activity" className="space-y-4">
                    <div className="space-y-2">
                      {citizenData.recentActivity.slice(0, 3).map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center justify-between p-3 bg-blue-800/20 rounded-lg"
                        >
                          <div>
                            <div className="text-sm font-medium text-blue-300">{activity.action}</div>
                            <div className="text-xs text-gray-400">{activity.date}</div>
                          </div>
                          <div className="text-sm font-bold text-blue-300">
                            {activity.type === "investment" || activity.type === "income"
                              ? `$${activity.amount.toLocaleString()}`
                              : activity.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - AI Chat & Additional Widgets */}
          <div className="xl:col-span-3 space-y-6">
            {/* Upcoming Events */}
            <Card className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border-amber-400/30">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif text-sm flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.slice(0, 3).map((event) => (
                    <div key={event.id} className="p-3 bg-amber-800/20 rounded-lg border border-amber-400/20">
                      <div className="text-sm font-medium text-amber-300">{event.title}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {event.date} at {event.time}
                      </div>
                      <Badge
                        className={`mt-2 text-xs ${
                          event.type === "deadline"
                            ? "bg-red-600/20 text-red-300 border-red-400/30"
                            : event.type === "payment"
                              ? "bg-green-600/20 text-green-300 border-green-400/30"
                              : "bg-blue-600/20 text-blue-300 border-blue-400/30"
                        }`}
                      >
                        {event.type}
                      </Badge>
                    </div>
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
