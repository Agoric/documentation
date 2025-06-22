"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"
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
  ChevronRight,
  User,
  Settings,
  DollarSign,
  Calendar,
  Star,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

const realms = [
  {
    id: "home",
    title: "Home",
    icon: Home,
    path: "/dashboard/home",
    color: "from-amber-500 to-yellow-600",
    liquidColor: "rgba(245, 158, 11, 0.3)",
    subOptions: [
      { title: "Dashboard", path: "/dashboard/home", icon: Home },
      { title: "Profile", path: "/dashboard/profile", icon: User },
      { title: "Settings", path: "/dashboard/settings", icon: Settings },
    ],
  },
  {
    id: "market",
    title: "QUICA Market",
    icon: ShoppingBag,
    path: "/dashboard/ecommerex/holographic-products",
    color: "from-purple-500 to-indigo-600",
    liquidColor: "rgba(139, 92, 246, 0.3)",
    subOptions: [
      { title: "Holographic Products", path: "/dashboard/ecommerex/holographic-products", icon: ShoppingBag },
      { title: "Product Comparison", path: "/dashboard/comparison", icon: TrendingUp },
      { title: "Market Analytics", path: "/dashboard/analytics", icon: TrendingUp },
    ],
  },
  {
    id: "realestate",
    title: "Real Estate",
    icon: Building2,
    path: "/dashboard/ecommerex/real-estate",
    color: "from-green-500 to-emerald-600",
    liquidColor: "rgba(34, 197, 94, 0.3)",
    subOptions: [
      { title: "Property Search", path: "/dashboard/ecommerex/real-estate", icon: Building2 },
      { title: "Investment Properties", path: "/dashboard/investments", icon: TrendingUp },
      { title: "Property Management", path: "/dashboard/property-mgmt", icon: Settings },
      { title: "Market Analysis", path: "/dashboard/market-analysis", icon: TrendingUp },
    ],
  },
  {
    id: "trading",
    title: "SnapDax Trading",
    icon: TrendingUp,
    path: "/dashboard/snap-dax",
    color: "from-blue-500 to-cyan-600",
    liquidColor: "rgba(59, 130, 246, 0.3)",
    subOptions: [
      { title: "Trading Dashboard", path: "/dashboard/snap-dax", icon: TrendingUp },
      { title: "Portfolio Management", path: "/dashboard/portfolio", icon: DollarSign },
      { title: "Market Data", path: "/dashboard/market-data", icon: TrendingUp },
      { title: "AI Trading Assistant", path: "/dashboard/ai-trading", icon: Star, badge: "NEW" },
    ],
  },
  {
    id: "banking",
    title: "Snapifi Banking",
    icon: CreditCard,
    path: "/dashboard/banking",
    color: "from-cyan-500 to-blue-600",
    liquidColor: "rgba(6, 182, 212, 0.3)",
    subOptions: [
      { title: "Account Overview", path: "/dashboard/banking", icon: CreditCard },
      { title: "Transfers & Payments", path: "/dashboard/banking/transfers", icon: DollarSign },
      { title: "Business Banking", path: "/dashboard/banking/business", icon: Building2 },
      { title: "Credit Services", path: "/dashboard/banking/credit", icon: TrendingUp },
    ],
  },
  {
    id: "gamification",
    title: "Achievements",
    icon: Trophy,
    path: "/dashboard/gamification",
    color: "from-amber-500 to-orange-600",
    liquidColor: "rgba(245, 158, 11, 0.3)",
    subOptions: [
      { title: "Achievements", path: "/dashboard/gamification", icon: Trophy },
      { title: "Leaderboards", path: "/dashboard/leaderboards", icon: Star },
      { title: "Rewards Store", path: "/dashboard/rewards", icon: ShoppingBag },
      { title: "Daily Challenges", path: "/dashboard/challenges", icon: Calendar, badge: "DAILY" },
    ],
  },
  {
    id: "legal",
    title: "Legal Framework",
    icon: Scale,
    path: "/legal",
    color: "from-gray-500 to-slate-600",
    liquidColor: "rgba(107, 114, 128, 0.3)",
    subOptions: [
      { title: "Legal Documents", path: "/legal", icon: Scale },
      { title: "Compliance Center", path: "/legal/compliance", icon: Settings },
      { title: "Digital Domicile", path: "/legal/digital-domicile", icon: Globe },
      { title: "IP Protection", path: "/legal/intellectual-property", icon: Scale },
    ],
  },
  {
    id: "citizenship",
    title: "Global Citizenship",
    icon: Globe,
    path: "/citizenship/profile",
    color: "from-blue-500 to-purple-600",
    liquidColor: "rgba(59, 130, 246, 0.3)",
    subOptions: [
      { title: "Citizen Profile", path: "/citizenship/profile", icon: User },
      { title: "Citizenship Benefits", path: "/citizenship/benefits", icon: Star },
      { title: "Registration", path: "/citizenship/register", icon: Globe },
      { title: "Tax Services", path: "/citizenship/tax", icon: DollarSign },
    ],
  },
  {
    id: "admin",
    title: "Supreme Authority",
    icon: Crown,
    path: "/admin",
    color: "from-purple-500 to-amber-600",
    liquidColor: "rgba(139, 92, 246, 0.3)",
    subOptions: [
      { title: "Admin Dashboard", path: "/admin", icon: Crown },
      { title: "User Management", path: "/admin/users", icon: User },
      { title: "Feature Management", path: "/admin/features", icon: Settings },
      { title: "System Configuration", path: "/admin/configure", icon: Settings },
    ],
  },
]

// Mock citizen data
const citizenData = {
  name: "Alexander Magnus",
  title: "Global Citizen - Level VII",
  id: "GC-2024-789456",
  level: 7,
  qgiBalance: 250000,
  bondValue: 8333,
  status: "active",
  memberSince: "2024-01-15",
  nextLevelProgress: 75,
  avatar: "/placeholder-user.jpg",
}

export function LiquidMeltingSidebar() {
  const [isHovering, setIsHovering] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [expandedRealm, setExpandedRealm] = useState<string | null>(null)
  const [citizenCardExpanded, setCitizenCardExpanded] = useState(false)
  const coinRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const currentRealm = realms.find(
    (realm) => pathname.startsWith(realm.path) || realm.subOptions?.some((sub) => pathname.startsWith(sub.path)),
  )

  // Handle coin hover
  const handleCoinHover = (hovering: boolean) => {
    setIsHovering(hovering)
    if (hovering) {
      setSidebarVisible(true)
    } else {
      // Delay hiding sidebar to allow mouse movement
      setTimeout(() => {
        if (!sidebarRef.current?.matches(":hover")) {
          setSidebarVisible(false)
          setExpandedRealm(null)
        }
      }, 100)
    }
  }

  // Handle sidebar mouse leave
  const handleSidebarLeave = () => {
    setSidebarVisible(false)
    setExpandedRealm(null)
  }

  return (
    <>
      {/* Fixed Toolbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/95 via-indigo-900/95 to-purple-900/95 backdrop-blur-sm border-b border-amber-400/30">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left - Logo and Spinning Coin */}
          <div className="flex items-center space-x-6">
            <Link href="/dashboard/home" className="flex items-center space-x-3">
              <div
                ref={coinRef}
                className="relative"
                onMouseEnter={() => handleCoinHover(true)}
                onMouseLeave={() => handleCoinHover(false)}
              >
                <SupremeAuthorityCoin
                  size="sm"
                  variant="logo"
                  animated={true}
                  className="cursor-pointer transition-all duration-300 hover:scale-110"
                />

                {/* Liquid ripple effect on hover */}
                <AnimatePresence>
                  {isHovering && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{
                        scale: [1, 1.5, 2],
                        opacity: [0.6, 0.3, 0],
                      }}
                      exit={{ scale: 2, opacity: 0 }}
                      transition={{
                        duration: 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeOut",
                      }}
                      style={{
                        background:
                          "radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(251, 191, 36, 0.1) 50%, transparent 100%)",
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>

              <div className="hidden md:block">
                <h1 className="text-lg font-bold text-amber-300 font-serif">Snapifi</h1>
                <p className="text-xs text-amber-300/70 italic">Supreme Authority</p>
              </div>
            </Link>
          </div>

          {/* Right - Citizen ID Card */}
          <motion.div
            className="relative"
            onMouseEnter={() => setCitizenCardExpanded(true)}
            onMouseLeave={() => setCitizenCardExpanded(false)}
            animate={{ width: citizenCardExpanded ? 400 : 120 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="bg-gradient-to-r from-amber-900/50 to-purple-900/50 border border-amber-400/30 rounded-lg p-3 cursor-pointer overflow-hidden">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Crown className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-amber-300 truncate">{citizenData.name}</div>
                  <div className="text-xs text-amber-300/70">Level {citizenData.level}</div>
                </div>
                <AnimatePresence>
                  {citizenCardExpanded && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 space-y-2"
                    >
                      <div className="text-xs text-gray-400">ID: {citizenData.id}</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <div className="text-gray-400">QGI Balance</div>
                          <div className="text-amber-300 font-semibold">${citizenData.qgiBalance.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Bond Value</div>
                          <div className="text-amber-300 font-semibold">${citizenData.bondValue.toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 h-6 text-xs border-amber-400/30 text-amber-300"
                        >
                          Profile
                        </Button>
                        <Button size="sm" variant="outline" className="h-6 w-6 p-0 border-amber-400/30 text-amber-300">
                          <Settings className="w-3 h-3" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Liquid Melting Sidebar */}
      <AnimatePresence>
        {sidebarVisible && (
          <motion.div
            ref={sidebarRef}
            className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)]"
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              opacity: { duration: 0.2 },
            }}
            onMouseLeave={handleSidebarLeave}
          >
            {/* Liquid Background */}
            <div className="relative w-80 h-full">
              {/* Main liquid shape */}
              <motion.div
                className="absolute inset-0 overflow-hidden"
                initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
                animate={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="w-full h-full bg-gradient-to-br from-purple-900/95 via-indigo-900/95 to-purple-950/95 backdrop-blur-xl border-r border-amber-400/30">
                  {/* Liquid shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent"
                    animate={{ x: [-100, 400] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                </div>
              </motion.div>

              {/* Content */}
              <div className="relative z-10 p-6 h-full overflow-y-auto">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h2 className="text-lg font-bold text-amber-300 font-serif">Realm Navigator</h2>
                  </div>
                  <p className="text-xs text-amber-300/70 italic">Choose your digital domain</p>
                </motion.div>

                {/* Realm Options */}
                <div className="space-y-2">
                  {realms.map((realm, index) => {
                    const Icon = realm.icon
                    const isActive = currentRealm?.id === realm.id
                    const isExpanded = expandedRealm === realm.id

                    return (
                      <motion.div
                        key={realm.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="relative"
                      >
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-between p-4 h-auto text-left transition-all duration-200",
                            "hover:bg-white/10 hover:text-amber-300",
                            isActive &&
                              "bg-gradient-to-r from-amber-500/20 to-purple-500/20 text-amber-300 border border-amber-400/30",
                            !isActive && "text-purple-200",
                          )}
                          onClick={() => setExpandedRealm(isExpanded ? null : realm.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center"
                              style={{
                                background: `linear-gradient(135deg, ${realm.liquidColor}, ${realm.liquidColor}80)`,
                              }}
                            >
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">{realm.title}</div>
                              <div className="text-xs text-gray-400">{realm.subOptions?.length || 0} options</div>
                            </div>
                          </div>
                          <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
                            <ChevronRight className="w-4 h-4" />
                          </motion.div>
                        </Button>

                        {/* Sub-options */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden ml-4 mt-2 space-y-1"
                            >
                              {realm.subOptions?.map((option) => {
                                const OptionIcon = option.icon
                                return (
                                  <Link key={option.path} href={option.path}>
                                    <Button
                                      variant="ghost"
                                      className="w-full justify-start p-3 text-left text-purple-200 hover:text-amber-300 hover:bg-purple-700/50"
                                    >
                                      <OptionIcon className="w-3 h-3 mr-3" />
                                      <span className="text-sm flex-1">{option.title}</span>
                                      {option.badge && (
                                        <Badge className="ml-2 text-xs bg-amber-500/20 text-amber-300 border-amber-400/30">
                                          {option.badge}
                                        </Badge>
                                      )}
                                    </Button>
                                  </Link>
                                )
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Liquid drip effects */}
              <div className="absolute top-0 right-0 w-4 h-full overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-8 bg-gradient-to-b from-amber-400/30 to-transparent rounded-full"
                    style={{
                      right: Math.random() * 16,
                      top: `${i * 20}%`,
                    }}
                    animate={{
                      y: [0, 100],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {sidebarVisible && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSidebarVisible(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
