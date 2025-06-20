"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  Command,
  ArrowRight,
  Star,
  User,
  Settings,
  Bell,
  Activity,
  Shield,
  Coins,
  Compass,
} from "lucide-react"
import { cn } from "@/lib/utils"

const realms = [
  {
    id: "home",
    title: "Imperium Base",
    latinTitle: "DOMUS IMPERIUM",
    description: "Your supreme command center",
    icon: Home,
    path: "/dashboard/home",
    color: "from-amber-400 to-orange-500",
    glowColor: "rgba(251, 191, 36, 0.5)",
    keywords: ["dashboard", "overview", "home", "main", "base"],
    subOptions: [
      { title: "Command Dashboard", path: "/dashboard/home", icon: Home, description: "Imperial control panel" },
      { title: "Citizen Profile", path: "/dashboard/profile", icon: User, description: "Your digital sovereignty" },
      { title: "Authority Settings", path: "/dashboard/settings", icon: Settings, description: "Configure dominion" },
    ],
  },
  {
    id: "market",
    title: "Quantum Mercatus",
    latinTitle: "MERCATUS QUANTUS",
    description: "Holographic commerce imperium",
    icon: ShoppingBag,
    path: "/dashboard/ecommerex/holographic-products",
    color: "from-purple-400 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.5)",
    keywords: ["shop", "buy", "products", "market", "commerce", "quantum"],
    subOptions: [
      {
        title: "Holographic Catalog",
        path: "/dashboard/ecommerex/holographic-products",
        icon: ShoppingBag,
        description: "3D imperial marketplace",
      },
      {
        title: "Product Imperium",
        path: "/dashboard/comparison",
        icon: TrendingUp,
        description: "Supreme product analysis",
      },
      {
        title: "Market Intelligence",
        path: "/dashboard/analytics",
        icon: Brain,
        description: "Neural market insights",
      },
    ],
  },
  {
    id: "realestate",
    title: "Domus Empire",
    latinTitle: "IMPERIUM DOMUS",
    description: "Real estate sovereignty",
    icon: Building2,
    path: "/dashboard/ecommerex/real-estate",
    color: "from-emerald-400 to-teal-500",
    glowColor: "rgba(52, 211, 153, 0.5)",
    keywords: ["property", "real estate", "homes", "investment", "domus"],
    subOptions: [
      {
        title: "Property Conquest",
        path: "/dashboard/ecommerex/real-estate",
        icon: Building2,
        description: "Acquire imperial properties",
      },
      {
        title: "Investment Dominion",
        path: "/dashboard/investments",
        icon: TrendingUp,
        description: "Income-generating assets",
      },
      {
        title: "Estate Management",
        path: "/dashboard/property-mgmt",
        icon: Crown,
        description: "Manage your realm",
      },
    ],
  },
  {
    id: "trading",
    title: "Neural Trading",
    latinTitle: "NEGOTIUM SUPREMUM",
    description: "AI-powered financial sovereignty",
    icon: TrendingUp,
    path: "/dashboard/snap-dax",
    color: "from-blue-400 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.5)",
    keywords: ["trading", "stocks", "finance", "investment", "ai", "neural"],
    subOptions: [
      {
        title: "Trading Imperium",
        path: "/dashboard/snap-dax",
        icon: TrendingUp,
        description: "Live neural interface",
      },
      {
        title: "AI Strategist",
        path: "/dashboard/ai-trading",
        icon: Brain,
        description: "Supreme trading intelligence",
        badge: "NEURAL",
      },
      { title: "Portfolio Dominion", path: "/dashboard/portfolio", icon: Crown, description: "Track empire assets" },
    ],
  },
  {
    id: "banking",
    title: "Imperial Vault",
    latinTitle: "THESAURUS IMPERIUM",
    description: "Supreme financial authority",
    icon: CreditCard,
    path: "/dashboard/banking",
    color: "from-cyan-400 to-blue-500",
    glowColor: "rgba(6, 182, 212, 0.5)",
    keywords: ["banking", "money", "accounts", "payments", "finance", "vault"],
    subOptions: [
      { title: "Treasury Hub", path: "/dashboard/banking", icon: Coins, description: "Imperial financial center" },
      {
        title: "Quantum Transfers",
        path: "/dashboard/banking/transfers",
        icon: Zap,
        description: "Instant value transmission",
      },
      {
        title: "Corporate Authority",
        path: "/dashboard/banking/business",
        icon: Building2,
        description: "Business sovereignty",
      },
    ],
  },
  {
    id: "gamification",
    title: "Achievement Empire",
    latinTitle: "IMPERIUM HONORUM",
    description: "Gamified dominion system",
    icon: Trophy,
    path: "/dashboard/gamification",
    color: "from-yellow-400 to-orange-500",
    glowColor: "rgba(251, 191, 36, 0.5)",
    keywords: ["achievements", "rewards", "games", "points", "levels", "honor"],
    subOptions: [
      {
        title: "Honor Gallery",
        path: "/dashboard/gamification",
        icon: Trophy,
        description: "Imperial achievements",
      },
      { title: "Global Hierarchy", path: "/dashboard/leaderboards", icon: Crown, description: "Supreme rankings" },
      { title: "Imperial Treasury", path: "/dashboard/rewards", icon: Coins, description: "Redeem your dominion" },
      {
        title: "Daily Conquests",
        path: "/dashboard/challenges",
        icon: Shield,
        description: "Complete imperial quests",
        badge: "DAILY",
      },
    ],
  },
  {
    id: "legal",
    title: "Legal Imperium",
    latinTitle: "LEX DIGITALIS",
    description: "Digital sovereignty framework",
    icon: Scale,
    path: "/legal",
    color: "from-slate-400 to-gray-500",
    glowColor: "rgba(148, 163, 184, 0.5)",
    keywords: ["legal", "law", "compliance", "documents", "rights", "lex"],
    subOptions: [
      { title: "Legal Codex", path: "/legal", icon: Scale, description: "Imperial legal documents" },
      { title: "Compliance Authority", path: "/legal/compliance", icon: Shield, description: "Regulatory dominion" },
      {
        title: "Digital Sovereignty",
        path: "/legal/digital-domicile",
        icon: Globe,
        description: "Virtual jurisdiction",
      },
    ],
  },
  {
    id: "citizenship",
    title: "Global Authority",
    latinTitle: "AUCTORITAS GLOBALIS",
    description: "Digital citizenship imperium",
    icon: Globe,
    path: "/citizenship/profile",
    color: "from-indigo-400 to-purple-500",
    glowColor: "rgba(99, 102, 241, 0.5)",
    keywords: ["citizenship", "identity", "global", "passport", "benefits", "authority"],
    subOptions: [
      { title: "Sovereign Profile", path: "/citizenship/profile", icon: Crown, description: "Your digital imperium" },
      { title: "Imperial Benefits", path: "/citizenship/benefits", icon: Star, description: "Sovereignty privileges" },
      { title: "Authority Registration", path: "/citizenship/register", icon: Globe, description: "Join the empire" },
    ],
  },
  {
    id: "admin",
    title: "Supreme Authority",
    latinTitle: "SUPREMA AUCTORITAS",
    description: "Ultimate administrative dominion",
    icon: Crown,
    path: "/admin",
    color: "from-purple-400 to-amber-500",
    glowColor: "rgba(168, 85, 247, 0.5)",
    keywords: ["admin", "control", "management", "authority", "system", "supreme"],
    subOptions: [
      { title: "Command Authority", path: "/admin", icon: Crown, description: "Supreme controls" },
      { title: "Subject Management", path: "/admin/users", icon: User, description: "Manage citizens" },
      { title: "Imperial Configuration", path: "/admin/configure", icon: Settings, description: "System dominion" },
    ],
  },
]

const quickActions = [
  {
    title: "Imperial Transfer",
    latinTitle: "TRANSFERRE",
    icon: Zap,
    path: "/dashboard/banking/transfers",
    color: "from-green-400 to-emerald-500",
  },
  {
    title: "Portfolio Imperium",
    latinTitle: "PORTFOLIO",
    icon: TrendingUp,
    path: "/dashboard/portfolio",
    color: "from-blue-400 to-cyan-500",
  },
  {
    title: "Honor Treasury",
    latinTitle: "HONORUM",
    icon: Star,
    path: "/dashboard/rewards",
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "Neural Assistant",
    latinTitle: "INTELLIGENTIA",
    icon: Brain,
    path: "/dashboard/ai",
    color: "from-purple-400 to-pink-500",
  },
]

const citizenData = {
  name: "Alexander Magnus",
  romanName: "Alexander Magnus Supremus",
  title: "Global Citizen - Level VII",
  latinTitle: "CIVIS GLOBALIS - GRADUS VII",
  id: "GC-2024-789456",
  level: 7,
  qgiBalance: 250000,
  bondValue: 8333,
  status: "IMPERATOR",
  avatar: "/placeholder-user.jpg",
}

export function FuturisticCommandCenter() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [filteredRealms, setFilteredRealms] = useState(realms)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [notifications] = useState(3)
  const [orbExpanded, setOrbExpanded] = useState(false)
  const pathname = usePathname()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 })

  // Mouse tracking for floating elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      mouseX.set(e.clientX * 0.05)
      mouseY.set(e.clientY * 0.05)
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
        realm.latinTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        setOrbExpanded(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const currentRealm = realms.find(
    (realm) => pathname.startsWith(realm.path) || realm.subOptions?.some((sub) => pathname.startsWith(sub.path)),
  )

  return (
    <>
      {/* Enhanced Floating Navigation Orb */}
      <motion.div
        className="fixed top-6 left-6 z-50"
        style={{
          x: springX,
          y: springY,
        }}
        onHoverStart={() => setOrbExpanded(true)}
        onHoverEnd={() => setOrbExpanded(false)}
      >
        <motion.div
          className="relative cursor-pointer"
          animate={{
            scale: orbExpanded ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Main Orb */}
          <motion.div
            className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCommandPalette(true)}
            style={{
              clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)",
            }}
          >
            {/* Pulsing glow with imperial colors */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 via-purple-400 to-cyan-400"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)",
              }}
            />

            {/* Imperial center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Compass className="w-8 h-8 text-white" />
            </div>

            {/* Roman corner decorations */}
            <div className="absolute -top-1 -left-1 w-3 h-3">
              <div className="w-full h-px bg-amber-400/80" />
              <div className="w-px h-full bg-amber-400/80" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3">
              <div className="w-full h-px bg-amber-400/80" />
              <div className="absolute right-0 w-px h-full bg-amber-400/80" />
            </div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3">
              <div className="absolute bottom-0 w-full h-px bg-amber-400/80" />
              <div className="w-px h-full bg-amber-400/80" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3">
              <div className="absolute bottom-0 w-full h-px bg-amber-400/80" />
              <div className="absolute right-0 w-px h-full bg-amber-400/80" />
            </div>

            {/* Notification badge */}
            {notifications > 0 && (
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-amber-400/60"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {notifications}
              </motion.div>
            )}
          </motion.div>

          {/* Expanded Orb Info */}
          <AnimatePresence>
            {orbExpanded && (
              <motion.div
                className="absolute left-20 top-0 bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-xl border border-amber-400/30 rounded-lg p-3 min-w-64"
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                }}
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Crown className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-bold text-amber-300 font-serif">IMPERIUM NAVIGATOR</span>
                  </div>
                  <div className="text-xs text-purple-200">
                    Current Realm: <span className="text-amber-300">{currentRealm?.latinTitle || "NAVIGANDO"}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-purple-300">Neural Status:</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400">ACTIVE</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full h-6 text-xs bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white border-0"
                    onClick={() => setShowCommandPalette(true)}
                  >
                    Open Command Imperium
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Enhanced Expanded Orb with Citizen Profile */}
      <AnimatePresence>
        {orbExpanded && (
          <motion.div
            className="absolute left-20 top-0 bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-xl border border-amber-400/30 rounded-lg overflow-hidden min-w-80"
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
            }}
          >
            {/* Imperial Header */}
            <div className="p-4 bg-gradient-to-r from-amber-900/40 to-purple-900/40 border-b border-amber-400/20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center relative">
                  <Crown className="w-6 h-6 text-white" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-amber-300 font-serif text-sm">{citizenData.name}</h3>
                  <p className="text-xs text-amber-400 italic">{citizenData.romanName}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className="text-xs bg-amber-500/20 text-amber-300 border-amber-400/30 px-2 py-0">
                      {citizenData.status}
                    </Badge>
                    <Badge className="text-xs bg-purple-500/20 text-purple-300 border-purple-400/30 px-2 py-0">
                      LVL {citizenData.level}
                    </Badge>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-amber-400 hover:text-amber-300">
                  <Bell className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Citizen Stats */}
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-blue-900/20 rounded-lg p-2 border border-blue-400/20">
                  <div className="text-blue-400 font-semibold">QGI Balance</div>
                  <div className="text-white font-bold">${citizenData.qgiBalance.toLocaleString()}</div>
                </div>
                <div className="bg-green-900/20 rounded-lg p-2 border border-green-400/20">
                  <div className="text-green-400 font-semibold">Bond Value</div>
                  <div className="text-white font-bold">${citizenData.bondValue.toLocaleString()}</div>
                </div>
              </div>

              <div className="bg-purple-900/20 rounded-lg p-2 border border-purple-400/20">
                <div className="text-purple-400 font-semibold text-xs">Citizen ID</div>
                <div className="text-white font-mono text-xs">{citizenData.id}</div>
              </div>

              {/* Navigation Status */}
              <div className="border-t border-amber-400/20 pt-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-bold text-amber-300 font-serif">IMPERIUM NAVIGATOR</span>
                </div>
                <div className="text-xs text-purple-200">
                  Current Realm: <span className="text-amber-300">{currentRealm?.latinTitle || "NAVIGANDO"}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-purple-300">Neural Status:</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400">ACTIVE</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <Button
                  size="sm"
                  className="w-full h-8 text-xs bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white border-0"
                  onClick={() => setShowCommandPalette(true)}
                >
                  <Command className="w-3 h-3 mr-2" />
                  Open Command Imperium
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs border-amber-400/30 text-amber-400 hover:bg-amber-400/10"
                  >
                    <User className="w-3 h-3 mr-1" />
                    Profile
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs border-green-400/30 text-green-400 hover:bg-green-400/10"
                  >
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Portfolio
                  </Button>
                </div>
              </div>
            </div>

            {/* Imperial Footer */}
            <div className="px-4 py-2 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-t border-amber-400/20">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1">
                  <Shield className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">SECURED</span>
                </div>
                <div className="flex items-center space-x-1 text-amber-400">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                  <span className="font-serif">SUPREMA AUCTORITAS</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Quick Actions with Imperial Theme */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col space-y-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <Link href={action.path}>
                  <motion.div
                    className={cn(
                      "relative w-14 h-14 rounded-lg bg-gradient-to-br shadow-lg cursor-pointer flex items-center justify-center group",
                      action.color,
                    )}
                    style={{
                      clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-6 h-6 text-white" />

                    {/* Imperial corners */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 border-l border-t border-amber-400/60" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 border-r border-t border-amber-400/60" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 border-l border-b border-amber-400/60" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r border-b border-amber-400/60" />

                    {/* Tooltip */}
                    <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      <div className="font-semibold">{action.title}</div>
                      <div className="text-amber-300 text-xs italic">{action.latinTitle}</div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Enhanced Command Palette with Imperial Theme */}
      <AnimatePresence>
        {showCommandPalette && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCommandPalette(false)}
          >
            <motion.div
              className="w-full max-w-3xl bg-gradient-to-br from-slate-900/98 to-purple-900/98 backdrop-blur-xl rounded-2xl border border-amber-400/30 shadow-2xl overflow-hidden"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                clipPath: "polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%)",
              }}
            >
              {/* Imperial Header */}
              <div className="p-6 border-b border-amber-400/20 bg-gradient-to-r from-purple-900/50 to-indigo-900/50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-amber-300 font-serif">IMPERIUM COMMAND CENTER</h2>
                    <p className="text-purple-300 text-sm italic">Navigate with supreme authority</p>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="mt-4 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                  <Input
                    placeholder="Search realms, execute commands, or invoke AI intelligence..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-12 bg-purple-900/40 border-amber-400/40 text-white placeholder-purple-300 focus:border-cyan-400 h-12"
                    autoFocus
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className={cn(
                      "absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0",
                      isVoiceActive ? "text-red-400" : "text-amber-400",
                    )}
                    onClick={() => setIsVoiceActive(!isVoiceActive)}
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>

                {/* Status Bar */}
                <div className="mt-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-4 text-purple-300">
                    <div className="flex items-center space-x-1">
                      <Activity className="w-3 h-3" />
                      <span>Neural Network: ACTIVE</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Shield className="w-3 h-3" />
                      <span>Security: MAXIMUM</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-amber-400">
                    <kbd className="px-2 py-1 bg-purple-800/50 rounded text-xs">⌘K</kbd>
                    <span>Command Mode</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="max-h-96 overflow-y-auto p-6">
                {searchQuery && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-amber-300 font-serif mb-2">
                      SEARCH RESULTS ({filteredRealms.length})
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
                              "cursor-pointer transition-all duration-200 border-purple-500/20 hover:border-amber-400/50 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-sm",
                              isActive && "border-amber-400/60 bg-amber-900/20",
                            )}
                            style={{
                              clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                            }}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-3">
                                <div
                                  className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br relative",
                                    realm.color,
                                  )}
                                  style={{
                                    clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                                  }}
                                >
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-white truncate">{realm.title}</h4>
                                  <p className="text-xs text-amber-300 font-serif italic">{realm.latinTitle}</p>
                                  <p className="text-sm text-purple-300 mt-1">{realm.description}</p>
                                  <div className="flex items-center justify-between mt-2 text-xs text-purple-400">
                                    <span>{realm.subOptions?.length || 0} imperial options</span>
                                    <ArrowRight className="w-3 h-3" />
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
                    <Crown className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2 font-serif">NO REALM MATCHES</h3>
                    <p className="text-purple-300">Try different search terms or invoke neural assistance</p>
                  </div>
                )}
              </div>

              {/* Imperial Footer */}
              <div className="p-4 border-t border-amber-400/20 bg-gradient-to-r from-purple-900/30 to-indigo-900/30">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-4 text-purple-300">
                    <div className="flex items-center space-x-1">
                      <Command className="w-3 h-3" />
                      <span>Imperial Command Mode</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Brain className="w-3 h-3" />
                      <span>Neural Assistant Ready</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-amber-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="font-serif">SUPREMA AUCTORITAS</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Floating Citizen Status */}
      <motion.div
        className="fixed top-6 right-6 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card
          className="bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border-amber-400/30"
          style={{
            clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
          }}
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">{citizenData.name}</h4>
                <p className="text-xs text-amber-300 font-serif italic">{citizenData.latinTitle}</p>
                <p className="text-xs text-purple-300">Status: {citizenData.status}</p>
              </div>
              <div className="flex flex-col space-y-1">
                <Button size="sm" variant="ghost" className="w-8 h-6 p-0 text-amber-400 hover:text-amber-300">
                  <Bell className="w-3 h-3" />
                </Button>
                <Badge className="text-xs bg-amber-500/20 text-amber-300 border-amber-400/30">
                  LVL {citizenData.level}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  )
}
