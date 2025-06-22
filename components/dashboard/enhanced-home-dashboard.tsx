"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"
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
  Activity,
  Bell,
  Clock,
  Target,
  CreditCard,
  Wallet,
  ArrowUpRight,
  MessageSquare,
  Settings,
  X,
  Home,
  Building,
  Star,
  ChevronDown,
  MoreVertical,
  Archive,
  Users,
  User,
  Lock,
  ShieldCheck,
  CheckCircle,
  Database,
  AlarmClockIcon as Alarm,
  AlarmClockIcon as Alarm,
  AlarmClockIcon as Alarm,
  Trophy,
  Brain,
  Hash,
  DoorOpenIcon as Open,
  CloudLightningIcon as Lightning,
  IceCreamConeIcon as Ice,
  Gem,
  Diamond,
  ZoomInIcon as Zoom,
  ZoomInIcon as Zoom,
  IceCreamConeIcon as Ice,
  GlassWaterIcon as Glass,
  GlassWaterIcon as Glass,
  CigaretteIcon as Smoking,
  LigatureIcon as Bandage,
  HeartPulseIcon as Heartbeat,
  PowerIcon as Pulse,
  CircleStopIcon as Stop,
  DoorOpenIcon as Open,
  AlarmClockIcon as Alarm,
  AirplayIcon as Broadcast,
  QrCodeIcon as Qr,
  FingerprintIcon as Fossil,
  SnowflakeIcon as Crystal,
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

// Enhanced visual elements data
const visualEffects = {
  particles: Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    opacity: Math.random() * 0.5 + 0.1,
    duration: Math.random() * 10 + 5,
  })),
  orbitalElements: [
    { icon: Crown, color: "text-amber-400", size: "w-6 h-6", orbit: 1 },
    { icon: Star, color: "text-yellow-400", size: "w-4 h-4", orbit: 2 },
    { icon: Diamond, color: "text-cyan-400", size: "w-5 h-5", orbit: 3 },
    { icon: Gem, color: "text-purple-400", size: "w-4 h-4", orbit: 4 },
    { icon: Sparkles, color: "text-pink-400", size: "w-3 h-3", orbit: 5 },
  ],
  backgroundPatterns: [
    "radial-gradient(circle at 10% 20%, rgba(234,179,8,0.1), transparent)",
    "radial-gradient(circle at 80% 80%, rgba(147,51,234,0.1), transparent)",
    "radial-gradient(circle at 40% 40%, rgba(59,130,246,0.1), transparent)",
    "radial-gradient(circle at 90% 10%, rgba(16,185,129,0.1), transparent)",
    "radial-gradient(circle at 20% 90%, rgba(239,68,68,0.1), transparent)",
  ],
}

const systemStats = [
  { label: "AI Systems", status: "Online", icon: Brain, color: "text-green-400" },
  { label: "Market Data", status: "Live", icon: TrendingUp, color: "text-blue-400" },
  { label: "Credit Monitoring", status: "Active", icon: Shield, color: "text-purple-400" },
  { label: "VOAI Environments", status: "Ready", icon: Globe, color: "text-cyan-400" },
  { label: "Security", status: "Protected", icon: Lock, color: "text-amber-400" },
  { label: "Backup", status: "Synced", icon: Database, color: "text-emerald-400" },
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
  const [showAdvancedStats, setShowAdvancedStats] = useState(false)
  const [particleAnimation, setParticleAnimation] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [sliderValue, setSliderValue] = useState([50])
  const [switchStates, setSwitchStates] = useState({
    notifications: true,
    darkMode: true,
    animations: true,
    sounds: false,
  })

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
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8 relative overflow-hidden">
        {/* Animated Background Particles */}
        {particleAnimation && (
          <div className="absolute inset-0 pointer-events-none">
            {visualEffects.particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-1 h-1 bg-amber-400/20 rounded-full"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  opacity: particle.opacity,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        {/* Multiple Background Patterns */}
        <div className="absolute inset-0 pointer-events-none">
          {visualEffects.backgroundPatterns.map((pattern, index) => (
            <div
              key={index}
              className="absolute inset-0"
              style={{ background: pattern }}
            />
          ))}
        </div>

        <div className="max-w-[1800px] mx-auto space-y-6 relative z-10">
          {/* Enhanced Header with Live Stats */}
          <div className="text-center relative">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <SupremeAuthorityCoin size="lg" variant="logo" animated />
              </motion.div>
              <div>
                <motion.h1
                  className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-clip-text text-transparent font-serif"
                  animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                >
                  Supreme Command Center
                </motion.h1>
                <p className="text-xl text-amber-300/80 italic font-serif flex items-center justify-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{currentTime.toLocaleString()}</span>
                  <Separator orientation="vertical" className="h-4" />
                  <Crown className="w-5 h-5" />
                  <span>Level {citizenData.level} Citizen</span>
                </p>
              </div>
            </div>

            {/* Enhanced Live Market Ticker with Carousel */}
            <motion.div
              className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-amber-400/30 rounded-lg p-3 mb-6 relative overflow-hidden"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent animate-pulse" />
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselItem>
                    <div className="flex items-center justify-center space-x-8 text-sm">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-purple-400 animate-pulse" />
                        <span className="text-purple-300">QGI: ${marketData.qgiPrice}</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +{marketData.qgiChange}%
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-blue-400 animate-pulse" />
                        <span className="text-blue-300">Bonds: {marketData.bondYield}%</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                          <ArrowUpRight className="w-3 h-3 mr-1" />
                          +{marketData.bondChange}%
                        </Badge>
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="flex items-center justify-center space-x-8 text-sm">
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-amber-400 animate-bounce" />
                        <span className="text-amber-300">Volume: ${marketData.volume24h}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-green-400 animate-pulse" />
                        <span className="text-green-300">{marketData.totalInvestors.toLocaleString()} Investors</span>
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </motion.div>

            {/* Enhanced Notification Bell with Dropdown */}
            <div className="absolute top-0 right-0 flex items-center space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-amber-400 hover:text-amber-300 relative"
                    onClick={toggleNotifications}
                  >
                    <motion.div
                      animate={{ rotate: showNotifications ? 15 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Bell className="w-5 h-5" />
                    </motion.div>
                    {notifications.length > 0 && (
                      <motion.span
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        {notifications.length}
                      </motion.span>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Notifications</p>
                </TooltipContent>
              </Tooltip>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-amber-400 hover:text-amber-300">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-slate-900/95 border-amber-400/30">
                  <DropdownMenuLabel className="text-amber-300">Quick Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-slate-300 hover:text-amber-300">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Preferences</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-300 hover:text-amber-300">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-300 hover:text-amber-300">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Security</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Enhanced Notifications Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="fixed top-20 right-8 z-50 w-96"
              >
                <Card className="bg-gradient-to-br from-slate-900/95 to-purple-900/95 border-amber-400/30 backdrop-blur-xl shadow-2xl">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-amber-300 text-lg flex items-center">
                        <Bell className="w-5 h-5 mr-2" />
                        Notifications
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-amber-400 hover:text-amber-300">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={toggleNotifications} className="text-amber-400">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-80">
                      <div className="space-y-3">
                        {notifications.map((notification, index) => {
                          const Icon = notification.icon
                          return (
                            <motion.div
                              key={notification.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className={`p-4 rounded-lg border cursor-pointer hover:scale-[1.02] transition-all duration-300 ${
                                notification.type === "success"
                                  ? "bg-green-900/20 border-green-400/30 hover:border-green-400/50"
                                  : notification.type === "warning"
                                    ? "bg-amber-900/20 border-amber-400/30 hover:border-amber-400/50"
                                    : "bg-blue-900/20 border-blue-400/30 hover:border-blue-400/50"
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <div className="relative">
                                  <Icon className="w-5 h-5 mt-1 text-amber-400" />
                                  <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-sm animate-pulse" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-white flex items-center justify-between">
                                    {notification.title}
                                    <Badge variant="outline" className="text-xs">
                                      {notification.type}
                                    </Badge>
                                  </div>
                                  <div className="text-xs text-gray-300 mt-1">{notification.message}</div>
                                  <div className="text-xs text-gray-500 mt-2 flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {notification.time}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    </ScrollArea>
                    <div className="mt-4 flex justify-between">
                      <Button variant="outline" size="sm" className="text-amber-300 border-amber-400/30">
                        <Archive className="w-4 h-4 mr-2" />
                        Archive All
                      </Button>
                      <Button variant="outline" size="sm" className="text-amber-300 border-amber-400/30">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark All Read
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Main Grid Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left Column - Enhanced Citizen Profile & Controls */}
            <div className="xl:col-span-3 space-y-6">
              {/* Ultra Enhanced Digital ID Card */}
              <motion.div
                initial={{ height: "auto" }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="group"
              >
                <Card className="bg-gradient-to-br from-purple-900/60 via-indigo-900/60 to-purple-900/60 border-2 border-amber-400/40 shadow-2xl shadow-purple-500/20 backdrop-blur-xl relative overflow-hidden">
                  {/* Multiple Royal background patterns */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(234,179,8,0.1),transparent),radial-gradient(circle_at_80%_80%,rgba(147,51,234,0.1),transparent)]" />
                  <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(234,179,8,0.1),transparent,rgba(147,51,234,0.1),transparent,rgba(234,179,8,0.1))]" />

                  {/* Animated border glow with multiple layers */}
                  <div className="absolute inset-0 border-2 border-amber-400/20 rounded-lg animate-pulse" />
                  <div className="absolute inset-[-2px] border border-purple-400/10 rounded-lg animate-pulse" style={{ animationDelay: "0.5s" }} />

                  {/* Orbital elements around the card */}
                  <div className="absolute inset-0 pointer-events-none">
                    {visualEffects.orbitalElements.map((element, index) => {
                      const Icon = element.icon
                      return (
                        <motion.div
                          key={index}
                          className={`absolute ${element.color} ${element.size}`}
                          style={{
                            left: "50%",
                            top: "50%",
                            transformOrigin: `${50 + element.orbit * 20}px center`,
                          }}
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 10 + element.orbit * 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                        >
                          <Icon />
                        </motion.div>
                      )
                    })}
                  </div>

                  <CardHeader className="relative z-10">
                    <CardTitle className="text-amber-300 font-serif flex items-center justify-center text-lg">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Crown className="w-6 h-6 mr-2" />
                      </motion.div>
                      Imperial Citizenship Registry
                    </CardTitle>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mt-2" />
                  </CardHeader>

                  <CardContent className="space-y-6 relative z-10">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="w-20 h-20 border-4 border-amber-400/50">
                          <AvatarImage src={citizenData.avatar || "/placeholder.svg"} alt={citizenData.name} />
                          <AvatarFallback className="bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 text-white text-2xl font-bold">
                            <Crown className="w-10 h-10" />
                          </AvatarFallback>
                        </Avatar>
                        
                        {/* Multiple orbital rings around avatar */}
                        {[1, 2, 3].map((ring) => (
                          <motion.div
                            key={ring}
                            className={`absolute inset-[-${ring * 4}px] border border-amber-400/${30 - ring * 5} rounded-full`}
                            animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
                            transition={{
                              duration: 8 + ring * 2,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                          />
                        ))}

                        {/* Status indicator */}
                        <motion.div
                          className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <CheckCircle className="w-3 h-3 text-white" />
                        </motion.div>
                      </div>

                      <div className="flex-1">
                        <motion.h3
                          className="text-xl font-bold text-transparent bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300 bg-clip-text"
                          animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        >
                          {citizenData.name}
                        </motion.h3>
                        <p className="text-sm text-amber-300/80 italic font-serif">{citizenData.romanName}</p>
                        <Badge className="mt-2 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 text-purple-200 border-purple-400/40 shadow-lg">
                          <Crown className="w-3 h-3 mr-1 animate-pulse" />
                          {citizenData.title}
                        </Badge>
                      </div>
                    </div>

                    <Separator className="bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

                    {/* Enhanced Collapsible Details */}
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between text-amber-300 hover:text-amber-200">
                          <span className="font-serif">Imperial Details</span>
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-3 text-sm">
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-900/20 to-purple-900/20 rounded border border-amber-400/20"
                        >
                          <span className="text-amber-200/80 font-serif flex items-center">
                            <Hash className="w-4 h-4 mr-2" />
                            Citizen Registry ID
                          </span>
                          <Badge variant="outline" className="text-amber-300 font-mono text-xs">
                            {citizenData.id}
                          </Badge>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="flex justify-between items-center p-3 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded border border-green-400/20"
                        >
                          <span className="text-green-200/80 font-serif flex items-center">
                            <ShieldCheck className="w-4 h-4 mr-2" />
                            Imperial Status
                          </span>
                          <Badge className="bg-gradient-to-r from-green-600/30 to-emerald-600/30 text-green-200 border-green-400/40">
                            <motion.div
                              className="w-2 h-2 bg-green-400 rounded-full mr-1"
                              animate={{ opacity: [1, 0.3, 1] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            />
                            Active Sovereign
                          </Badge>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 rounded border border-purple-400/20"
                        >
                          <span className="text-purple-200/80 font-serif flex items-center">
                            <Crown className="w-4 h-4 mr-2" />
                            Authority Level
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-amber-300 font-bold">Level {citizenData.level}</span>
                            <div className="flex space-x-1">
                              {[...Array(citizenData.level)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: i * 0.1 }}
                                >
                                  <Star className="w-3 h-3 text-amber-400 fill-current" />
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Enhanced Progress Section */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-amber-200/80 font-serif flex items-center">
                          <Target className="w-4 h-4 mr-2" />
                          Ascension Progress
                        </span>
                        <span className="text-amber-300 font-bold">{citizenData.nextLevelProgress}%</span>
                      </div>
                      <div className="relative">
                        <Progress value={citizenData.nextLevelProgress} className="h-4 bg-slate-800/50" />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-400/30 to-amber-400/20 rounded-full"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-white drop-shadow-lg">
                            {citizenData.nextLevelProgress}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Achievements Accordion */}
                    <Accordion type="single" collapsible>
                      <AccordionItem value="achievements" className="border-amber-400/20">
                        <AccordionTrigger className="text-amber-300 font-serif text-sm hover:text-amber-200">
                          <div className="flex items-center">
                            <Trophy className="w-4 h-4 mr-2" />
                            ✦ IMPERIAL HONORS ✦
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-2 gap-2 mt-3">
                            {citizenData.achievements.map((achievement, index) => {
                              const Icon = achievement.icon
                              return (
                                <motion.div
                                  key={achievement.id}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.1 }}
                                  whileHover={{ scale: 1.05 }}
                                  className="flex items-center space-x-2 p-3 bg-gradient-to-r from-amber-900/30 to-yellow-900/30 rounded border border-amber-400/30 \
