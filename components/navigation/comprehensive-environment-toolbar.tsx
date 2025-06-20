"use client"

import { useState } from "react"
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
  ChevronDown,
  User,
  Settings,
  DollarSign,
  Calendar,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"

const environments = [
  {
    id: "home",
    title: "Home",
    latin: "HOME",
    icon: Home,
    path: "/dashboard/home",
    color: "from-amber-500 to-yellow-600",
    subOptions: [
      { title: "Dashboard", path: "/dashboard/home", icon: Home },
      { title: "Profile", path: "/dashboard/profile", icon: User },
      { title: "Settings", path: "/dashboard/settings", icon: Settings },
    ],
  },
  {
    id: "market",
    title: "QUICA Market",
    latin: "MARKET",
    icon: ShoppingBag,
    path: "/dashboard/ecommerex/holographic-products",
    color: "from-purple-500 to-indigo-600",
    subOptions: [
      { title: "Holographic Products", path: "/dashboard/ecommerex/holographic-products", icon: ShoppingBag },
      { title: "Product Comparison", path: "/dashboard/comparison", icon: TrendingUp },
      { title: "Market Analytics", path: "/dashboard/analytics", icon: TrendingUp },
    ],
  },
  {
    id: "realestate",
    title: "Real Estate Empire",
    latin: "REAL ESTATE",
    icon: Building2,
    path: "/dashboard/ecommerex/real-estate",
    color: "from-green-500 to-emerald-600",
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
    latin: "TRADING",
    icon: TrendingUp,
    path: "/dashboard/snap-dax",
    color: "from-blue-500 to-cyan-600",
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
    latin: "BANKING",
    icon: CreditCard,
    path: "/dashboard/banking",
    color: "from-cyan-500 to-blue-600",
    subOptions: [
      { title: "Account Overview", path: "/dashboard/banking", icon: CreditCard },
      { title: "Transfers & Payments", path: "/dashboard/banking/transfers", icon: DollarSign },
      { title: "Business Banking", path: "/dashboard/banking/business", icon: Building2 },
      { title: "Credit Services", path: "/dashboard/banking/credit", icon: TrendingUp },
    ],
  },
  {
    id: "gamification",
    title: "Achievement Hub",
    latin: "ACHIEVEMENTS",
    icon: Trophy,
    path: "/dashboard/gamification",
    color: "from-amber-500 to-orange-600",
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
    latin: "LEGAL",
    icon: Scale,
    path: "/legal",
    color: "from-gray-500 to-slate-600",
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
    latin: "CITIZENSHIP",
    icon: Globe,
    path: "/citizenship/profile",
    color: "from-blue-500 to-purple-600",
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
    latin: "ADMIN",
    icon: Crown,
    path: "/admin",
    color: "from-purple-500 to-amber-600",
    subOptions: [
      { title: "Admin Dashboard", path: "/admin", icon: Crown },
      { title: "User Management", path: "/admin/users", icon: User },
      { title: "Feature Management", path: "/admin/features", icon: Settings },
      { title: "System Configuration", path: "/admin/configure", icon: Settings },
    ],
  },
]

// Mock citizen data - replace with actual user data
const citizenData = {
  name: "Alexander Magnus",
  romanName: "Alexander Magnus Supremus",
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

export function ComprehensiveEnvironmentToolbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [citizenCardExpanded, setCitizenCardExpanded] = useState(false)
  const [selectedRealm, setSelectedRealm] = useState<string | null>(null)
  const pathname = usePathname()

  const currentEnvironment = environments.find(
    (env) => pathname.startsWith(env.path) || env.subOptions?.some((sub) => pathname.startsWith(sub.path)),
  )

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/95 via-indigo-900/95 to-purple-900/95 backdrop-blur-sm border-b border-amber-400/30">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left - Logo and Navigation */}
        <div className="flex items-center space-x-6">
          <Link href="/dashboard/home" className="flex items-center space-x-3">
            <SupremeAuthorityCoin size="sm" variant="logo" />
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-amber-300 font-serif">Snapifi</h1>
              <p className="text-xs text-amber-300/70 italic">Supreme Authority</p>
            </div>
          </Link>

          {/* Environment Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("realms")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Button
                variant="ghost"
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-all duration-200",
                  currentEnvironment
                    ? "text-amber-300 bg-amber-500/20"
                    : "text-purple-200 hover:text-amber-300 hover:bg-purple-700/50",
                )}
              >
                <Globe className="w-4 h-4 mr-2" />
                <span>Realms</span>
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>

              {/* Active indicator */}
              {currentEnvironment && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500"
                  layoutId="activeIndicator"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              {/* Realm Dropdown Menu */}
              <AnimatePresence>
                {activeDropdown === "realms" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-80 bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-sm border border-amber-400/30 rounded-lg shadow-xl"
                  >
                    <div className="p-3">
                      <div className="text-amber-400 font-serif text-sm mb-3 border-b border-amber-400/20 pb-2">
                        Select Your Realm
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {environments.map((env) => {
                          const Icon = env.icon
                          const isActive = currentEnvironment?.id === env.id

                          return (
                            <div key={env.id} className="relative">
                              <Button
                                variant="ghost"
                                className={cn(
                                  "w-full h-auto p-3 text-left flex-col items-start space-y-1",
                                  "text-purple-200 hover:text-amber-300 hover:bg-purple-700/50",
                                  isActive && "bg-amber-500/20 text-amber-300",
                                )}
                                onMouseEnter={() => setSelectedRealm(env.id)}
                                onMouseLeave={() => setSelectedRealm(null)}
                              >
                                <div className="flex items-center w-full">
                                  <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
                                  <span className="text-xs font-medium truncate">{env.title}</span>
                                </div>
                                <div className="text-xs text-gray-400 leading-tight">
                                  {env.subOptions?.length || 0} options
                                </div>
                              </Button>

                              {/* Sub-options for hovered realm */}
                              <AnimatePresence>
                                {selectedRealm === env.id && (
                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute left-full top-0 ml-2 w-64 bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-sm border border-amber-400/30 rounded-lg shadow-xl z-10"
                                  >
                                    <div className="p-2">
                                      <div className="text-amber-400 text-xs font-medium mb-2 px-2">{env.title}</div>
                                      {env.subOptions?.map((option) => {
                                        const OptionIcon = option.icon
                                        return (
                                          <Link key={option.path} href={option.path}>
                                            <Button
                                              variant="ghost"
                                              className="w-full justify-start text-left p-2 text-purple-200 hover:text-amber-300 hover:bg-purple-700/50"
                                            >
                                              <OptionIcon className="w-3 h-3 mr-2" />
                                              <span className="text-xs flex-1">{option.title}</span>
                                              {option.badge && (
                                                <Badge className="ml-1 text-xs bg-amber-500/20 text-amber-300 border-amber-400/30">
                                                  {option.badge}
                                                </Badge>
                                              )}
                                            </Button>
                                          </Link>
                                        )
                                      })}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
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
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Crown className="w-4 h-4 text-white" />
              </div>

              {/* Basic Info (Always Visible) */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-amber-300 truncate">{citizenData.name}</div>
                <div className="text-xs text-amber-300/70">Level {citizenData.level}</div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {citizenCardExpanded && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 space-y-2"
                  >
                    <div className="text-xs text-amber-300/70 italic">{citizenData.romanName}</div>
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
  )
}
