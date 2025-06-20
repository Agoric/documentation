"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Building2,
  ShoppingBag,
  TrendingUp,
  Trophy,
  Scale,
  Globe,
  Shield,
  ChevronDown,
  User,
  CreditCard,
  FileText,
  Settings,
  Crown,
  Zap,
  Star,
  Briefcase,
  Search,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface EnvironmentOption {
  id: string
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  gradient: string
  romanTitle: string
  subOptions: SubOption[]
}

interface SubOption {
  id: string
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  badge?: string
}

const environments: EnvironmentOption[] = [
  {
    id: "quica-market",
    name: "QUICA Market",
    href: "/dashboard/ecommerex/holographic-products",
    icon: ShoppingBag,
    description: "Quantum Utility Investment Capitol Accelerator",
    gradient: "from-purple-600 via-indigo-600 to-cyan-600",
    romanTitle: "MERCATUS",
    subOptions: [
      {
        id: "holographic-products",
        name: "Holographic Products",
        href: "/dashboard/ecommerex/holographic-products",
        icon: Zap,
        description: "3D immersive product marketplace",
      },
      {
        id: "product-comparison",
        name: "Product Comparison",
        href: "/dashboard/ecommerex/holographic-products?view=compare",
        icon: Star,
        description: "Compare products side by side",
      },
      {
        id: "marketplace-analytics",
        name: "Market Analytics",
        href: "/dashboard/ecommerex/analytics",
        icon: TrendingUp,
        description: "Market trends and insights",
      },
    ],
  },
  {
    id: "real-estate",
    name: "Real Estate Empire",
    href: "/dashboard/ecommerex/real-estate",
    icon: Building2,
    description: "Domus et Praedia Imperium",
    gradient: "from-amber-500 via-yellow-500 to-amber-600",
    romanTitle: "DOMUS",
    subOptions: [
      {
        id: "property-search",
        name: "Property Search",
        href: "/dashboard/ecommerex/real-estate",
        icon: Search,
        description: "Find your perfect property",
      },
      {
        id: "investment-properties",
        name: "Investment Properties",
        href: "/dashboard/ecommerex/real-estate?type=investment",
        icon: TrendingUp,
        description: "Income-generating properties",
      },
      {
        id: "property-management",
        name: "Property Management",
        href: "/dashboard/real-estate/management",
        icon: Settings,
        description: "Manage your properties",
      },
      {
        id: "market-analysis",
        name: "Market Analysis",
        href: "/dashboard/real-estate/analysis",
        icon: TrendingUp,
        description: "Real estate market insights",
      },
    ],
  },
  {
    id: "snap-dax",
    name: "SnapDax Trading",
    href: "/dashboard/snap-dax",
    icon: TrendingUp,
    description: "Negotium et Commercium Supremum",
    gradient: "from-purple-600 via-pink-600 to-purple-700",
    romanTitle: "NEGOTIUM",
    subOptions: [
      {
        id: "trading-dashboard",
        name: "Trading Dashboard",
        href: "/dashboard/snap-dax",
        icon: TrendingUp,
        description: "Live trading interface",
      },
      {
        id: "portfolio",
        name: "Portfolio Management",
        href: "/dashboard/snap-dax/portfolio",
        icon: Briefcase,
        description: "Manage your investments",
      },
      {
        id: "market-data",
        name: "Market Data",
        href: "/dashboard/snap-dax/market",
        icon: TrendingUp,
        description: "Real-time market information",
      },
      {
        id: "ai-trading",
        name: "AI Trading Assistant",
        href: "/dashboard/snap-dax/ai",
        icon: Zap,
        description: "AI-powered trading insights",
        badge: "NEW",
      },
    ],
  },
  {
    id: "banking",
    name: "Snapifi Banking",
    href: "/dashboard/banking",
    icon: CreditCard,
    description: "Imperium Creditum et Pecunia",
    gradient: "from-green-600 via-emerald-600 to-green-700",
    romanTitle: "BANCUM",
    subOptions: [
      {
        id: "accounts",
        name: "Account Overview",
        href: "/dashboard/banking",
        icon: CreditCard,
        description: "View all your accounts",
      },
      {
        id: "transfers",
        name: "Transfers & Payments",
        href: "/dashboard/banking/transfers",
        icon: TrendingUp,
        description: "Send and receive money",
      },
      {
        id: "business-banking",
        name: "Business Banking",
        href: "/dashboard/banking/business",
        icon: Briefcase,
        description: "Business financial services",
      },
      {
        id: "credit-services",
        name: "Credit Services",
        href: "/dashboard/banking/credit",
        icon: Star,
        description: "Credit lines and loans",
      },
    ],
  },
  {
    id: "gamification",
    name: "Achievement Hub",
    href: "/dashboard/gamification",
    icon: Trophy,
    description: "Ludus Victoriae et Honores",
    gradient: "from-amber-500 via-orange-500 to-amber-600",
    romanTitle: "LUDUS",
    subOptions: [
      {
        id: "achievements",
        name: "Achievements",
        href: "/dashboard/gamification",
        icon: Trophy,
        description: "View your achievements",
      },
      {
        id: "leaderboards",
        name: "Leaderboards",
        href: "/dashboard/gamification/leaderboards",
        icon: Crown,
        description: "Global rankings",
      },
      {
        id: "rewards",
        name: "Rewards Store",
        href: "/dashboard/gamification/rewards",
        icon: Star,
        description: "Redeem your points",
      },
      {
        id: "challenges",
        name: "Daily Challenges",
        href: "/dashboard/gamification/challenges",
        icon: Zap,
        description: "Complete daily tasks",
        badge: "DAILY",
      },
    ],
  },
  {
    id: "legal",
    name: "Legal Framework",
    href: "/legal",
    icon: Scale,
    description: "Lex Digitalis et Iurisdictio",
    gradient: "from-slate-600 via-gray-600 to-slate-700",
    romanTitle: "LEX",
    subOptions: [
      {
        id: "documents",
        name: "Legal Documents",
        href: "/legal",
        icon: FileText,
        description: "Access legal documents",
      },
      {
        id: "compliance",
        name: "Compliance Center",
        href: "/legal/compliance",
        icon: Shield,
        description: "Regulatory compliance",
      },
      {
        id: "digital-domicile",
        name: "Digital Domicile",
        href: "/legal/digital-domicile",
        icon: Globe,
        description: "Digital jurisdiction services",
      },
      {
        id: "intellectual-property",
        name: "IP Protection",
        href: "/legal/intellectual-property",
        icon: Shield,
        description: "Intellectual property services",
      },
    ],
  },
  {
    id: "citizenship",
    name: "Global Citizenship",
    href: "/citizenship",
    icon: Globe,
    description: "Orbis Terrarum Connexus",
    gradient: "from-cyan-600 via-blue-600 to-purple-600",
    romanTitle: "CIVITAS",
    subOptions: [
      {
        id: "profile",
        name: "Citizen Profile",
        href: "/citizenship/profile",
        icon: User,
        description: "Your citizenship profile",
      },
      {
        id: "benefits",
        name: "Citizenship Benefits",
        href: "/citizenship/benefits",
        icon: Star,
        description: "Access your benefits",
      },
      {
        id: "registration",
        name: "Registration",
        href: "/citizenship/register",
        icon: FileText,
        description: "Complete registration",
      },
      {
        id: "tax-services",
        name: "Tax Services",
        href: "/citizenship/tax",
        icon: FileText,
        description: "Digital domicile tax benefits",
      },
    ],
  },
  {
    id: "admin",
    name: "Supreme Authority",
    href: "/admin",
    icon: Crown,
    description: "Imperium Supremum Administratio",
    gradient: "from-purple-600 via-indigo-600 to-purple-700",
    romanTitle: "IMPERIUM",
    subOptions: [
      {
        id: "dashboard",
        name: "Admin Dashboard",
        href: "/admin",
        icon: Crown,
        description: "Supreme authority controls",
      },
      {
        id: "user-management",
        name: "User Management",
        href: "/admin/users",
        icon: User,
        description: "Manage platform users",
      },
      {
        id: "feature-toggles",
        name: "Feature Management",
        href: "/admin/features",
        icon: Settings,
        description: "Control platform features",
      },
      {
        id: "system-config",
        name: "System Configuration",
        href: "/admin/config",
        icon: Settings,
        description: "Platform configuration",
      },
    ],
  },
]

// Mock citizen data - replace with actual user data
const mockCitizen = {
  id: "GC-2024-001337",
  name: "Marcus Aurelius",
  romanName: "Marcus Aurelius Antoninus",
  title: "Civis Globalis Supremus",
  level: "Platinum Elite",
  avatar: "/placeholder-user.jpg",
  qgiBalance: 2847392,
  bondValue: 1250000,
  creditScore: 850,
  memberSince: "2024",
  status: "Active",
  benefits: ["Tax Optimization", "Global Mobility", "Investment Access", "Legal Protection"],
  nextReward: "Diamond Status",
  progressToNext: 78,
}

export function ComprehensiveEnvironmentToolbar() {
  const pathname = usePathname()
  const [isCardExpanded, setIsCardExpanded] = React.useState(false)

  const getActiveEnvironment = () => {
    return environments.find((env) => pathname.startsWith(env.href)) || environments[0]
  }

  const activeEnvironment = getActiveEnvironment()

  return (
    <div className="w-full border-b border-amber-400/20 bg-gradient-to-r from-purple-950/95 via-indigo-950/95 to-purple-950/95 backdrop-blur-xl relative z-50">
      {/* Roman Column Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />
        <div className="absolute inset-0">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-400/20 to-transparent"
              style={{ left: `${(i + 1) * 5}%` }}
            />
          ))}
        </div>
      </div>

      {/* Main Toolbar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3">
        {/* Left Side - Environment Navigation */}
        <div className="flex items-center space-x-1">
          {environments.map((env) => {
            const isActive = pathname.startsWith(env.href)
            return (
              <DropdownMenu key={env.id}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "relative h-10 px-3 text-sm font-medium transition-all duration-200",
                      "hover:bg-white/10 hover:text-amber-300",
                      isActive
                        ? "bg-gradient-to-r from-amber-500/20 to-purple-500/20 text-amber-300 border border-amber-400/30"
                        : "text-gray-300",
                    )}
                  >
                    <env.icon className="w-4 h-4 mr-2" />
                    <span className="hidden lg:inline">{env.name}</span>
                    <span className="lg:hidden">{env.romanTitle}</span>
                    <ChevronDown className="w-3 h-3 ml-1" />

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-purple-400"
                        layoutId="activeTab"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-black/90 border-amber-400/20 backdrop-blur-xl" align="start">
                  <DropdownMenuLabel className="text-amber-400 font-serif">{env.romanTitle}</DropdownMenuLabel>
                  <DropdownMenuLabel className="text-xs text-gray-400 font-normal -mt-1">
                    {env.description}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-amber-400/20" />

                  {env.subOptions.map((subOption) => (
                    <DropdownMenuItem key={subOption.id} asChild>
                      <Link
                        href={subOption.href}
                        className="flex items-center px-3 py-2 text-sm text-gray-300 hover:text-amber-300 hover:bg-white/5 cursor-pointer"
                      >
                        <subOption.icon className="w-4 h-4 mr-3" />
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span>{subOption.name}</span>
                            {subOption.badge && (
                              <Badge className="ml-2 text-xs bg-amber-500/20 text-amber-300 border-amber-400/30">
                                {subOption.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">{subOption.description}</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          })}
        </div>

        {/* Right Side - Citizen ID Card */}
        <div className="relative">
          <motion.div
            className="relative"
            onHoverStart={() => setIsCardExpanded(true)}
            onHoverEnd={() => setIsCardExpanded(false)}
          >
            {/* Collapsed State - Just Avatar and Name */}
            <motion.div
              className={cn(
                "flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer",
                "bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-amber-400/30",
                "hover:from-purple-800/60 hover:to-indigo-800/60 transition-all duration-300",
              )}
              animate={{
                width: isCardExpanded ? 400 : 120,
              }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            >
              <Avatar className="w-8 h-8 border-2 border-amber-400/50">
                <AvatarImage src={mockCitizen.avatar || "/placeholder.svg"} alt={mockCitizen.name} />
                <AvatarFallback className="bg-gradient-to-br from-amber-500 to-purple-600 text-white text-sm font-bold">
                  {mockCitizen.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-amber-300 truncate">{mockCitizen.name}</div>
                {!isCardExpanded && <div className="text-xs text-gray-400 truncate">{mockCitizen.level}</div>}
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isCardExpanded && (
                  <motion.div
                    className="absolute top-0 left-0 right-0 bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-xl border border-amber-400/30 rounded-lg p-4 shadow-2xl"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Header */}
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar className="w-12 h-12 border-2 border-amber-400/50">
                        <AvatarImage src={mockCitizen.avatar || "/placeholder.svg"} alt={mockCitizen.name} />
                        <AvatarFallback className="bg-gradient-to-br from-amber-500 to-purple-600 text-white font-bold">
                          {mockCitizen.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-amber-300 font-bold">{mockCitizen.name}</div>
                        <div className="text-xs text-purple-300 italic font-serif">{mockCitizen.romanName}</div>
                        <div className="text-xs text-gray-400">{mockCitizen.title}</div>
                      </div>
                      <Badge className="bg-gradient-to-r from-amber-500/20 to-purple-500/20 text-amber-300 border-amber-400/30">
                        {mockCitizen.level}
                      </Badge>
                    </div>

                    {/* Citizen ID */}
                    <div className="bg-black/30 rounded-lg p-3 mb-4 border border-amber-400/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">CITIZEN ID</span>
                        <Badge className="text-xs bg-green-500/20 text-green-300 border-green-400/30">
                          {mockCitizen.status}
                        </Badge>
                      </div>
                      <div className="text-amber-300 font-mono text-sm font-bold">{mockCitizen.id}</div>
                      <div className="text-xs text-gray-400 mt-1">Member since {mockCitizen.memberSince}</div>
                    </div>

                    {/* Financial Summary */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-black/30 rounded-lg p-2 border border-blue-400/20">
                        <div className="text-xs text-blue-400">QGI Balance</div>
                        <div className="text-sm font-bold text-blue-300">
                          ${mockCitizen.qgiBalance.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-2 border border-green-400/20">
                        <div className="text-xs text-green-400">Bond Value</div>
                        <div className="text-sm font-bold text-green-300">
                          ${mockCitizen.bondValue.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Progress to Next Level */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400">Progress to {mockCitizen.nextReward}</span>
                        <span className="text-xs text-amber-400">{mockCitizen.progressToNext}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-amber-500 to-purple-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${mockCitizen.progressToNext}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-amber-400/30 text-amber-400 hover:bg-amber-400/10"
                      >
                        <User className="w-3 h-3 mr-1" />
                        Profile
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-purple-400/30 text-purple-400 hover:bg-purple-400/10"
                      >
                        <Settings className="w-3 h-3 mr-1" />
                        Settings
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Roman-style border */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
    </div>
  )
}
