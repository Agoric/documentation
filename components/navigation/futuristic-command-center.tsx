"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  ShoppingBag,
  Building2,
  TrendingUp,
  CreditCard,
  Trophy,
  Scale,
  Globe,
  Crown,
  Search,
  Mic,
  Zap,
  Brain,
  Sparkles,
  Command,
  ArrowRight,
  Star,
  Calendar,
  User,
  Settings,
  DollarSign,
  MessageCircle,
  Bell,
  Navigation,
} from "lucide-react"
import { cn } from "@/lib/utils"

const realms = [
  {
    id: "home",
    title: "Home Base",
    description: "Your personal command center",
    icon: Home,
    path: "/",
    color: "from-amber-400 to-orange-500",
    glowColor: "rgba(251, 191, 36, 0.5)",
    keywords: ["dashboard", "overview", "home", "main"],
    subOptions: [
      { title: "Dashboard Overview", path: "/dashboard/home", icon: Home, description: "Main control panel" },
      { title: "Personal Profile", path: "/dashboard/profile", icon: User, description: "Manage your identity" },
      { title: "System Settings", path: "/dashboard/settings", icon: Settings, description: "Configure preferences" },
    ],
  },
  {
    id: "market",
    title: "Quantum Market",
    description: "Holographic commerce hub",
    icon: ShoppingBag,
    path: "/dashboard/ecommerex/holographic-products",
    color: "from-purple-400 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.5)",
    keywords: ["shop", "buy", "products", "market", "commerce"],
    subOptions: [
      {
        title: "Holographic Products",
        path: "/dashboard/ecommerex/holographic-products",
        icon: ShoppingBag,
        description: "3D product catalog",
      },
      {
        title: "Product Comparison",
        path: "/dashboard/comparison",
        icon: TrendingUp,
        description: "Compare items side-by-side",
      },
      { title: "Market Analytics", path: "/dashboard/analytics", icon: TrendingUp, description: "Market insights" },
    ],
  },
  {
    id: "realestate",
    title: "Property Matrix",
    description: "Real estate intelligence",
    icon: Building2,
    path: "/dashboard/ecommerex/real-estate",
    color: "from-emerald-400 to-teal-500",
    glowColor: "rgba(52, 211, 153, 0.5)",
    keywords: ["property", "real estate", "homes", "investment"],
    subOptions: [
      {
        title: "Property Search",
        path: "/dashboard/ecommerex/real-estate",
        icon: Building2,
        description: "Find your perfect property",
      },
      {
        title: "Investment Properties",
        path: "/dashboard/investments",
        icon: TrendingUp,
        description: "Income-generating assets",
      },
      {
        title: "Property Management",
        path: "/dashboard/property-mgmt",
        icon: Settings,
        description: "Manage your portfolio",
      },
    ],
  },
  {
    id: "trading",
    title: "Neural Trading",
    description: "AI-powered financial markets",
    icon: TrendingUp,
    path: "/dashboard/snap-dax",
    color: "from-blue-400 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.5)",
    keywords: ["trading", "stocks", "finance", "investment", "ai"],
    subOptions: [
      {
        title: "Trading Dashboard",
        path: "/dashboard/snap-dax",
        icon: TrendingUp,
        description: "Live market interface",
      },
      {
        title: "AI Assistant",
        path: "/dashboard/ai-trading",
        icon: Brain,
        description: "Smart trading insights",
        badge: "AI",
      },
      { title: "Portfolio Manager", path: "/dashboard/portfolio", icon: DollarSign, description: "Track investments" },
    ],
  },
  {
    id: "banking",
    title: "Digital Vault",
    description: "Next-gen financial services",
    icon: CreditCard,
    path: "/dashboard/banking",
    color: "from-cyan-400 to-blue-500",
    glowColor: "rgba(6, 182, 212, 0.5)",
    keywords: ["banking", "money", "accounts", "payments", "finance"],
    subOptions: [
      { title: "Account Hub", path: "/dashboard/banking", icon: CreditCard, description: "All your accounts" },
      {
        title: "Instant Transfers",
        path: "/dashboard/banking/transfers",
        icon: Zap,
        description: "Send money instantly",
      },
      {
        title: "Business Banking",
        path: "/dashboard/banking/business",
        icon: Building2,
        description: "Corporate services",
      },
    ],
  },
  {
    id: "gamification",
    title: "Achievement Engine",
    description: "Gamified progression system",
    icon: Trophy,
    path: "/dashboard/gamification",
    color: "from-yellow-400 to-orange-500",
    glowColor: "rgba(251, 191, 36, 0.5)",
    keywords: ["achievements", "rewards", "games", "points", "levels"],
    subOptions: [
      {
        title: "Achievement Gallery",
        path: "/dashboard/gamification",
        icon: Trophy,
        description: "Your accomplishments",
      },
      { title: "Global Leaderboards", path: "/dashboard/leaderboards", icon: Star, description: "Compete globally" },
      { title: "Rewards Store", path: "/dashboard/rewards", icon: ShoppingBag, description: "Redeem your points" },
      {
        title: "Daily Quests",
        path: "/dashboard/challenges",
        icon: Calendar,
        description: "Complete challenges",
        badge: "DAILY",
      },
    ],
  },
  {
    id: "legal",
    title: "Legal Matrix",
    description: "Digital law framework",
    icon: Scale,
    path: "/legal",
    color: "from-slate-400 to-gray-500",
    glowColor: "rgba(148, 163, 184, 0.5)",
    keywords: ["legal", "law", "compliance", "documents", "rights"],
    subOptions: [
      { title: "Legal Documents", path: "/legal", icon: Scale, description: "Access legal files" },
      { title: "Compliance Center", path: "/legal/compliance", icon: Settings, description: "Regulatory compliance" },
      { title: "Digital Domicile", path: "/legal/digital-domicile", icon: Globe, description: "Virtual jurisdiction" },
    ],
  },
  {
    id: "citizenship",
    title: "Global Identity",
    description: "Digital citizenship platform",
    icon: Globe,
    path: "/citizenship/profile",
    color: "from-indigo-400 to-purple-500",
    glowColor: "rgba(99, 102, 241, 0.5)",
    keywords: ["citizenship", "identity", "global", "passport", "benefits"],
    subOptions: [
      { title: "Citizen Profile", path: "/citizenship/profile", icon: User, description: "Your digital identity" },
      { title: "Global Benefits", path: "/citizenship/benefits", icon: Star, description: "Citizenship perks" },
      { title: "Registration Portal", path: "/citizenship/register", icon: Globe, description: "Join the network" },
    ],
  },
  {
    id: "admin",
    title: "Command Authority",
    description: "Supreme administrative control",
    icon: Crown,
    path: "/admin",
    color: "from-purple-400 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.5)",
    keywords: ["admin", "control", "management", "authority", "system"],
    subOptions: [
      { title: "Control Center", path: "/admin", icon: Crown, description: "Master controls" },
      { title: "User Management", path: "/admin/users", icon: User, description: "Manage users" },
      { title: "System Config", path: "/admin/configure", icon: Settings, description: "System settings" },
    ],
  },
]

const quickActions = [
  { title: "Send Payment", icon: Zap, path: "/dashboard/banking/transfers", color: "from-green-400 to-emerald-500" },
  { title: "View Portfolio", icon: TrendingUp, path: "/dashboard/portfolio", color: "from-blue-400 to-cyan-500" },
  { title: "Check Rewards", icon: Star, path: "/dashboard/rewards", color: "from-yellow-400 to-orange-500" },
  { title: "AI Assistant", icon: Brain, path: "/dashboard/ai", color: "from-purple-400 to-pink-500" },
]

const citizenData = {
  name: "Alexander Magnus",
  title: "Global Citizen - Level VII",
  id: "GC-2024-789456",
  level: 7,
  qgiBalance: 250000,
  bondValue: 8333,
  status: "active",
  avatar: "/placeholder-user.jpg",
}

export function FuturisticCommandCenter() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [filteredRealms, setFilteredRealms] = useState(realms)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [notifications] = useState(3)
  const [orbPosition, setOrbPosition] = useState({ x: 24, y: 24 })
  const pathname = usePathname()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  // Mouse tracking for floating elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // Search functionality
  useEffect(() => {
    if (!searchQuery) {
      setFilteredRealms(realms)
      return
    }

    const filtered = realms.filter(
      (realm) =>
        realm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        realm.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        realm.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    setFilteredRealms(filtered)
  }, [searchQuery])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setShowCommandPalette(true)
      }
      if (e.key === "Escape") {
        setShowCommandPalette(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Adaptive orb positioning based on page
  useEffect(() => {
    const isHomePage = pathname === "/"
    const isDashboard = pathname.startsWith("/dashboard")

    if (isHomePage) {
      setOrbPosition({ x: 24, y: 24 }) // Top left for home
    } else if (isDashboard) {
      setOrbPosition({ x: 24, y: 80 }) // Below any potential header
    } else {
      setOrbPosition({ x: 24, y: 24 }) // Default position
    }
  }, [pathname])

  const currentRealm = realms.find(
    (realm) => pathname.startsWith(realm.path) || realm.subOptions?.some((sub) => pathname.startsWith(sub.path)),
  )

  return (
    <>
      {/* Floating Navigation Orb - Global across all pages */}
      <motion.div
        className="fixed z-50 pointer-events-auto"
        style={{
          left: orbPosition.x,
          top: orbPosition.y,
        }}
        animate={{
          x: mousePosition.x * 0.01,
          y: mousePosition.y * 0.01,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <motion.div
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 shadow-2xl cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCommandPalette(true)}
        >
          {/* Pulsing glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 opacity-50"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Orbital rings */}
          <motion.div
            className="absolute inset-0 rounded-full border border-purple-400/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border border-cyan-400/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Navigation className="w-8 h-8 text-white" />
          </div>

          {/* Notification badge */}
          {notifications > 0 && (
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {notifications}
            </motion.div>
          )}

          {/* Hover tooltip */}
          <motion.div
            className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 pointer-events-none"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            Neural Command Center
            <div className="text-xs text-gray-400 mt-1">⌘K to open</div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Quick Actions - Adaptive positioning */}
      <motion.div
        className="fixed z-40"
        style={{
          right: 24,
          bottom: 24,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex flex-col space-y-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Link href={action.path}>
                  <motion.div
                    className={cn(
                      "w-12 h-12 rounded-full bg-gradient-to-br shadow-lg cursor-pointer flex items-center justify-center backdrop-blur-sm",
                      action.color,
                    )}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    title={action.title}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Command Palette - Global Modal */}
      <AnimatePresence>
        {showCommandPalette && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCommandPalette(false)}
          >
            <motion.div
              className="w-full max-w-2xl bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-purple-500/20">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Neural Command Center</h2>
                    <p className="text-purple-300 text-sm">Navigate with AI-powered intelligence</p>
                  </div>
                  <div className="ml-auto text-xs text-purple-400">Current: {currentRealm?.title || "Unknown"}</div>
                </div>

                {/* Search Bar */}
                <div className="mt-4 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <Input
                    placeholder="Search realms, actions, or ask AI..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-12 bg-purple-900/30 border-purple-500/30 text-white placeholder-purple-400 focus:border-cyan-400"
                    autoFocus
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className={cn(
                      "absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0",
                      isVoiceActive ? "text-red-400" : "text-purple-400",
                    )}
                    onClick={() => setIsVoiceActive(!isVoiceActive)}
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>

                {/* Keyboard shortcut hint */}
                <div className="mt-2 flex items-center justify-between text-xs text-purple-400">
                  <span>Use voice commands or type to search</span>
                  <div className="flex items-center space-x-1">
                    <kbd className="px-2 py-1 bg-purple-800/50 rounded text-xs">⌘K</kbd>
                    <span>to open</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="max-h-96 overflow-y-auto p-6">
                {searchQuery && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-purple-300 mb-2">
                      Search Results ({filteredRealms.length})
                    </h3>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredRealms.map((realm) => {
                    const Icon = realm.icon
                    const isActive = currentRealm?.id === realm.id

                    return (
                      <motion.div
                        key={realm.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link href={realm.path} onClick={() => setShowCommandPalette(false)}>
                          <Card
                            className={cn(
                              "cursor-pointer transition-all duration-200 border-purple-500/20 hover:border-cyan-400/50",
                              isActive && "border-cyan-400/50 bg-cyan-900/20",
                            )}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-3">
                                <div
                                  className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br",
                                    realm.color,
                                  )}
                                >
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-white truncate">{realm.title}</h4>
                                  <p className="text-sm text-purple-300 mt-1">{realm.description}</p>
                                  <div className="flex items-center mt-2 text-xs text-purple-400">
                                    <span>{realm.subOptions?.length || 0} options</span>
                                    <ArrowRight className="w-3 h-3 ml-auto" />
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                {filteredRealms.length === 0 && (
                  <div className="text-center py-8">
                    <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">No results found</h3>
                    <p className="text-purple-300">Try a different search term or use voice commands</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-purple-500/20 bg-purple-900/20">
                <div className="flex items-center justify-between text-xs text-purple-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Command className="w-3 h-3" />
                      <span>Command Mode</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>AI Assistant Ready</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>Neural Network Active</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Citizen Status - Adaptive positioning */}
      <motion.div
        className="fixed z-40"
        style={{
          right: 24,
          top: pathname === "/" ? 24 : 80,
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">{citizenData.name}</h4>
                <p className="text-xs text-purple-300">{citizenData.title}</p>
              </div>
              <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-purple-400">
                <Bell className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Background Particles - Global effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </>
  )
}
