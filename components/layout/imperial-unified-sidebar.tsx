"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Crown,
  Coins,
  TrendingUp,
  Wallet,
  ShoppingCart,
  Brain,
  Home,
  Settings,
  LogOut,
  ChevronRight,
  Sparkles,
  Shield,
  Gem,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ImperialDesignSystem, getImperialGradient } from "@/lib/imperial-design-system"
import { Button } from "@/components/ui/button"

const imperialNavigation = [
  {
    id: "overview",
    name: "Imperial Overview",
    href: "/dashboard",
    icon: <Crown className="h-5 w-5" />,
    rank: "emperor",
    description: "Command Center",
  },
  {
    id: "snapifi",
    name: "Snapifi Treasury",
    href: "/dashboard/snapifi",
    icon: <Coins className="h-5 w-5" />,
    rank: "consul",
    description: "Personal Wealth Management",
    children: [
      {
        name: "Real Estate Empire",
        href: "/dashboard/snapifi/real-estate-strategy",
        icon: <Home className="h-4 w-4" />,
      },
      {
        name: "Financial Objectives",
        href: "/dashboard/snapifi/financial-goals",
        icon: <TrendingUp className="h-4 w-4" />,
      },
      {
        name: "Wellness Sanctuary",
        href: "/dashboard/snapifi/wellness",
        icon: <Sparkles className="h-4 w-4" />,
      },
    ],
  },
  {
    id: "banking",
    name: "Imperial Banking",
    href: "/dashboard/banking",
    icon: <Shield className="h-5 w-5" />,
    rank: "consul",
    description: "Sovereign Financial Services",
  },
  {
    id: "dax",
    name: "Digital Asset Exchange",
    href: "/dashboard/dax",
    icon: <Gem className="h-5 w-5" />,
    rank: "senator",
    description: "Cryptocurrency Dominion",
  },
  {
    id: "snap-dax",
    name: "SNAP-DAX Elite",
    href: "/dashboard/snap-dax",
    icon: <Wallet className="h-5 w-5" />,
    rank: "emperor",
    description: "Advanced Digital Assets",
    children: [
      {
        name: "Onboarding Ceremony",
        href: "/dashboard/snap-dax/onboarding",
        icon: <Crown className="h-4 w-4" />,
      },
    ],
  },
  {
    id: "ecommerex",
    name: "ECommereX Empire",
    href: "/dashboard/ecommerex/flagship-hub",
    icon: <ShoppingCart className="h-5 w-5" />,
    rank: "consul",
    description: "Commerce Dominion",
    children: [
      {
        name: "Flagship Command",
        href: "/dashboard/ecommerex/flagship-hub",
        icon: <Crown className="h-4 w-4" />,
      },
      {
        name: "Inventory Oracle",
        href: "/dashboard/ecommerex/inventory-forecasting",
        icon: <TrendingUp className="h-4 w-4" />,
      },
      {
        name: "Platform Directory",
        href: "/dashboard/ecommerex/platform-directory",
        icon: <Settings className="h-4 w-4" />,
      },
      {
        name: "Holographic Showcase",
        href: "/dashboard/ecommerex/holographic-products",
        icon: <Sparkles className="h-4 w-4" />,
      },
    ],
  },
  {
    id: "ai-concierge",
    name: "AI Oracle",
    href: "/dashboard/ai-concierge",
    icon: <Brain className="h-5 w-5" />,
    rank: "emperor",
    description: "Divine Intelligence",
  },
]

export function ImperialUnifiedSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "emperor":
        return "gold"
      case "consul":
        return "purple"
      case "senator":
        return "bronze"
      default:
        return "marble"
    }
  }

  const getRankGlow = (rank: string) => {
    const colors = ImperialDesignSystem.colors.imperial
    switch (rank) {
      case "emperor":
        return colors.gold[500]
      case "consul":
        return colors.purple[500]
      case "senator":
        return colors.bronze[500]
      default:
        return colors.marble[400]
    }
  }

  return (
    <motion.div
      className={cn("relative h-full transition-all duration-500 ease-in-out", isCollapsed ? "w-20" : "w-80")}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Imperial Background */}
      <div
        className="absolute inset-0 backdrop-blur-xl"
        style={{
          background: `
            ${getImperialGradient("gold")},
            ${ImperialDesignSystem.patterns.imperial},
            linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)
          `,
          borderRight: `2px solid ${ImperialDesignSystem.colors.imperial.gold[400]}40`,
          boxShadow: ImperialDesignSystem.effects.shadow.imperial,
        }}
      />

      {/* Ornate border pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: ImperialDesignSystem.patterns.ornate,
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        {/* Imperial Header */}
        <div className="p-6 border-b border-amber-400/30">
          <div className="flex items-center gap-3">
            <motion.div className="relative" whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }}>
              <div className="relative w-12 h-12">
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/40 via-yellow-400/40 to-amber-600/40 rounded-full blur-md animate-pulse" />
                <img
                  src="/lorenzo-caprelli-coin.jpeg"
                  alt="Imperial Seal"
                  className="w-12 h-12 rounded-full object-cover relative z-10 shadow-2xl border-2 border-amber-400/70"
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(251, 191, 36, 0.6)) brightness(1.2)",
                  }}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-80 z-20" />
              </div>
            </motion.div>

            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1
                    className="text-xl font-bold"
                    style={{
                      fontFamily: ImperialDesignSystem.typography.imperial.display,
                      color: ImperialDesignSystem.colors.imperial.gold[200],
                      textShadow: ImperialDesignSystem.effects.glow.gold,
                    }}
                  >
                    SNAP-DAX
                  </h1>
                  <p
                    className="text-sm opacity-80"
                    style={{
                      color: ImperialDesignSystem.colors.imperial.gold[300],
                      fontFamily: ImperialDesignSystem.typography.imperial.body,
                    }}
                  >
                    Imperial Financial Empire
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {imperialNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            const isExpanded = expandedItems.includes(item.id)
            const rankColor = getRankColor(item.rank)
            const rankGlow = getRankGlow(item.rank)

            return (
              <div key={item.id}>
                <motion.div
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg transition-all duration-300 relative overflow-hidden",
                      isActive && "shadow-lg",
                    )}
                    style={{
                      background: isActive
                        ? getImperialGradient(rankColor)
                        : hoveredItem === item.id
                          ? `${getImperialGradient(rankColor)}80`
                          : "transparent",
                      border: `1px solid ${rankGlow}${isActive ? "60" : "20"}`,
                      boxShadow: isActive ? `0 0 20px ${rankGlow}40` : "none",
                    }}
                    onClick={(e) => {
                      if (item.children) {
                        e.preventDefault()
                        toggleExpanded(item.id)
                      }
                    }}
                  >
                    {/* Rank indicator */}
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, ${rankGlow}40, transparent)`,
                        border: `1px solid ${rankGlow}60`,
                        boxShadow: `0 0 10px ${rankGlow}30`,
                      }}
                    >
                      <div style={{ color: ImperialDesignSystem.colors.imperial[rankColor][200] }}>{item.icon}</div>
                    </div>

                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="flex-1 min-w-0"
                        >
                          <div
                            className="font-semibold"
                            style={{
                              color: ImperialDesignSystem.colors.imperial[rankColor][100],
                              fontFamily: ImperialDesignSystem.typography.imperial.heading,
                              textShadow: `0 0 8px ${rankGlow}60`,
                            }}
                          >
                            {item.name}
                          </div>
                          <div
                            className="text-xs opacity-80"
                            style={{
                              color: ImperialDesignSystem.colors.imperial[rankColor][300],
                            }}
                          >
                            {item.description}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {item.children && !isCollapsed && (
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ color: ImperialDesignSystem.colors.imperial[rankColor][300] }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </motion.div>
                    )}
                  </Link>

                  {/* Imperial glow effect */}
                  {(isActive || hoveredItem === item.id) && (
                    <motion.div
                      className="absolute inset-0 rounded-lg pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        background: `linear-gradient(135deg, transparent 30%, ${rankGlow}20 50%, transparent 70%)`,
                        boxShadow: `inset 0 0 20px ${rankGlow}30`,
                      }}
                    />
                  )}
                </motion.div>

                {/* Sub-navigation */}
                <AnimatePresence>
                  {item.children && isExpanded && !isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-6 mt-2 space-y-1 overflow-hidden"
                    >
                      {item.children.map((child) => {
                        const isChildActive = pathname === child.href
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "flex items-center gap-3 p-2 rounded-md transition-all duration-200",
                              isChildActive && "shadow-md",
                            )}
                            style={{
                              background: isChildActive ? `${getImperialGradient(rankColor)}60` : "transparent",
                              border: `1px solid ${rankGlow}${isChildActive ? "40" : "10"}`,
                            }}
                          >
                            <div
                              className="flex items-center justify-center w-6 h-6 rounded"
                              style={{
                                color: ImperialDesignSystem.colors.imperial[rankColor][300],
                              }}
                            >
                              {child.icon}
                            </div>
                            <span
                              className="text-sm"
                              style={{
                                color: ImperialDesignSystem.colors.imperial[rankColor][200],
                                fontFamily: ImperialDesignSystem.typography.imperial.body,
                              }}
                            >
                              {child.name}
                            </span>
                          </Link>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Imperial Footer */}
        <div className="p-4 border-t border-amber-400/30">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-amber-200 hover:bg-amber-500/20"
              style={{
                fontFamily: ImperialDesignSystem.typography.imperial.body,
              }}
            >
              <Settings className="h-4 w-4" />
              {!isCollapsed && "Imperial Settings"}
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-amber-200 hover:bg-red-500/20"
              style={{
                fontFamily: ImperialDesignSystem.typography.imperial.body,
              }}
            >
              <LogOut className="h-4 w-4" />
              {!isCollapsed && "Abdicate Throne"}
            </Button>
          </div>
        </div>

        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/40 hover:bg-amber-500/30"
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            boxShadow: `0 0 10px ${ImperialDesignSystem.colors.imperial.gold[500]}40`,
          }}
        >
          <motion.div animate={{ rotate: isCollapsed ? 0 : 180 }} transition={{ duration: 0.3 }}>
            <ChevronRight className="h-3 w-3 text-amber-200" />
          </motion.div>
        </Button>
      </div>
    </motion.div>
  )
}
