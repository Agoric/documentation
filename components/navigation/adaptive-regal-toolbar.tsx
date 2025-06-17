"use client"

import type * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, ShoppingBag, TrendingUp, Trophy, Scale, Globe, Shield, Coins, Menu, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useSpatialLayout } from "@/hooks/use-spatial-layout"

interface RealmTab {
  id: string
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  gradient: string
  romanTitle: string
  shortTitle: string
}

const realms: RealmTab[] = [
  {
    id: "holographic-products",
    name: "NFT Marketplace",
    href: "/dashboard/ecommerex/holographic-products",
    icon: ShoppingBag,
    description: "Mercatus NFT Imperium - Premium digital asset marketplace",
    gradient: "from-purple-600 via-indigo-600 to-cyan-600",
    romanTitle: "NFT IMPERIUM",
    shortTitle: "NFT",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    href: "/dashboard/ecommerex/real-estate",
    icon: Building2,
    description: "Domus Imperium - Premium property marketplace",
    gradient: "from-amber-500 via-yellow-500 to-amber-600",
    romanTitle: "DOMUS",
    shortTitle: "DOM",
  },
  {
    id: "snap-dax",
    name: "SnapDax Trading",
    href: "/dashboard/snap-dax",
    icon: TrendingUp,
    description: "Negotium Supremum - Advanced trading platform",
    gradient: "from-purple-600 via-pink-600 to-purple-700",
    romanTitle: "NEGOTIUM",
    shortTitle: "NEG",
  },
  {
    id: "gamification",
    name: "Gamification Hub",
    href: "/dashboard/gamification",
    icon: Trophy,
    description: "Ludus Honoris - Achievement and rewards system",
    gradient: "from-amber-500 via-orange-500 to-amber-600",
    romanTitle: "LUDUS",
    shortTitle: "LUD",
  },
  {
    id: "legal-framework",
    name: "Legal Framework",
    href: "/legal",
    icon: Scale,
    description: "Lex Digitalis - Digital jurisdiction framework",
    gradient: "from-slate-600 via-gray-600 to-slate-700",
    romanTitle: "LEX",
    shortTitle: "LEX",
  },
  {
    id: "diplomatic-agents",
    name: "Diplomatic Agents",
    href: "/dashboard/diplomatic-agents",
    icon: Shield,
    description: "Legatus Digitalis - Agent certification system",
    gradient: "from-purple-600 via-indigo-600 to-purple-700",
    romanTitle: "LEGATUS",
    shortTitle: "LEG",
  },
  {
    id: "credit-empire",
    name: "Credit Empire",
    href: "/dashboard/credit-empire",
    icon: Coins,
    description: "Imperium Creditum - Financial services empire",
    gradient: "from-amber-500 via-yellow-500 to-amber-600",
    romanTitle: "IMPERIUM",
    shortTitle: "IMP",
  },
  {
    id: "global-network",
    name: "Global Network",
    href: "/dashboard/global-network",
    icon: Globe,
    description: "Orbis Connexus - Worldwide connections network",
    gradient: "from-cyan-600 via-blue-600 to-purple-600",
    romanTitle: "ORBIS",
    shortTitle: "ORB",
  },
]

export function AdaptiveRegalToolbar() {
  const pathname = usePathname()
  const { dimensions, layout, actions } = useSpatialLayout({
    autoCollapse: true,
    contentAware: true,
  })

  const getActiveRealm = () => {
    return realms.find((realm) => pathname.startsWith(realm.href)) || realms[0]
  }

  const activeRealm = getActiveRealm()

  // Determine visible realms based on available space
  const getVisibleRealms = () => {
    const availableWidth = dimensions.width - 400 // Account for branding and controls
    const realmWidth = layout.toolbarCompact ? 80 : layout.showLabels ? 120 : 100
    const maxVisible = Math.floor(availableWidth / realmWidth)

    // Always show active realm
    const activeIndex = realms.findIndex((r) => r.id === activeRealm.id)
    const visibleRealms = [activeRealm]

    // Add other realms based on priority and space
    let added = 1
    for (let i = 0; i < realms.length && added < maxVisible; i++) {
      if (i !== activeIndex) {
        visibleRealms.push(realms[i])
        added++
      }
    }

    return { visible: visibleRealms, hidden: realms.filter((r) => !visibleRealms.includes(r)) }
  }

  const { visible: visibleRealms, hidden: hiddenRealms } = getVisibleRealms()

  return (
    <motion.div
      className="w-full border-b border-amber-400/20 bg-gradient-to-r from-purple-950/90 via-indigo-950/90 to-purple-950/90 backdrop-blur-xl relative z-50"
      animate={{ height: layout.toolbarHeight }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Roman Column Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />
        <motion.div className="absolute inset-0" animate={{ opacity: layout.toolbarCompact ? 0.3 : 0.5 }}>
          {Array.from({ length: Math.floor(dimensions.width / 100) }, (_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-400/20 to-transparent"
              style={{ left: `${(i + 1) * 100}px` }}
            />
          ))}
        </motion.div>
      </div>

      {/* Main Navigation Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 h-full">
        <div className="flex items-center space-x-4">
          {/* Sidebar Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={actions.toggleSidebar}
            className="text-amber-400/80 hover:text-amber-300 hover:bg-amber-500/20 p-2"
          >
            <Menu className="w-5 h-5" />
          </Button>

          {/* Supreme Authority Branding */}
          <motion.div
            className="flex items-center space-x-3"
            animate={{
              scale: layout.toolbarCompact ? 0.9 : 1,
              opacity: layout.toolbarCompact ? 0.9 : 1,
            }}
            whileHover={{ scale: layout.toolbarCompact ? 0.95 : 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <SupremeAuthorityCoin size={layout.toolbarCompact ? "md" : "lg"} variant="logo" />
            <AnimatePresence>
              {layout.showLabels && (
                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span
                    className={cn(
                      "font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent font-serif",
                      layout.toolbarCompact ? "text-lg" : "text-xl",
                    )}
                  >
                    SNAPIFI
                  </span>
                  {!layout.toolbarCompact && (
                    <span className="text-xs text-amber-400/70 font-serif tracking-wider">SUPREMA AUCTORITAS</span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Roman Divider */}
          <motion.div
            className="bg-gradient-to-b from-transparent via-amber-400/40 to-transparent"
            animate={{
              height: layout.toolbarCompact ? 32 : 48,
              width: 1,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Adaptive Realm Tabs */}
          <div className="flex items-center space-x-1">
            {visibleRealms.map((realm) => {
              const isActive = pathname.startsWith(realm.href)
              const Icon = realm.icon

              return (
                <Link key={realm.id} href={realm.href}>
                  <motion.div
                    className={cn(
                      "relative flex flex-col items-center justify-center rounded-lg transition-all duration-300 group",
                      isActive
                        ? "bg-gradient-to-br from-amber-400/20 via-purple-500/20 to-amber-400/20 backdrop-blur-sm border border-amber-400/30"
                        : "hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-amber-400/10 hover:backdrop-blur-sm",
                    )}
                    animate={{
                      padding: layout.toolbarCompact ? "8px 12px" : "12px 16px",
                      minWidth: layout.toolbarCompact ? 60 : layout.showLabels ? 100 : 80,
                    }}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Icon with Roman-style frame */}
                    <motion.div
                      className={cn(
                        "relative rounded-md transition-all duration-300 flex items-center justify-center",
                        isActive
                          ? `bg-gradient-to-br ${realm.gradient} shadow-lg`
                          : "bg-gradient-to-br from-purple-800/30 to-indigo-800/30 group-hover:from-purple-700/40 group-hover:to-amber-400/40",
                      )}
                      animate={{
                        padding: layout.toolbarCompact ? "6px" : "8px",
                        clipPath: layout.toolbarCompact
                          ? "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)"
                          : "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                      }}
                    >
                      <Icon
                        className={cn(
                          "transition-colors duration-300",
                          layout.toolbarCompact ? "w-4 h-4" : "w-5 h-5",
                          isActive ? "text-white" : "text-amber-400/80 group-hover:text-amber-300",
                        )}
                      />

                      {/* Roman corner decorations */}
                      {!layout.toolbarCompact && (
                        <>
                          <div className="absolute -top-1 -left-1 w-2 h-2 border-l border-t border-amber-400/40" />
                          <div className="absolute -top-1 -right-1 w-2 h-2 border-r border-t border-amber-400/40" />
                          <div className="absolute -bottom-1 -left-1 w-2 h-2 border-l border-b border-amber-400/40" />
                          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r border-b border-amber-400/40" />
                        </>
                      )}
                    </motion.div>

                    {/* Adaptive Text Labels */}
                    <AnimatePresence>
                      {layout.showLabels && (
                        <motion.div
                          className="flex flex-col items-center mt-1"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span
                            className={cn(
                              "text-xs font-serif font-bold tracking-wider transition-colors duration-300",
                              isActive ? "text-amber-300" : "text-amber-400/70 group-hover:text-amber-300",
                            )}
                          >
                            {dimensions.width > 1200 ? realm.romanTitle : realm.shortTitle}
                          </span>
                          {dimensions.width > 1400 && !layout.toolbarCompact && (
                            <span
                              className={cn(
                                "text-xs font-medium transition-colors duration-300 mt-0.5",
                                isActive ? "text-white/80" : "text-purple-200/60 group-hover:text-white/70",
                              )}
                            >
                              {realm.name.split(" ")[0]}
                            </span>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <SupremeAuthorityCoin size="xs" variant="badge" animated={false} />
                      </motion.div>
                    )}

                    {/* Holographic glow effect */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-lg opacity-30 blur-sm pointer-events-none"
                        style={{
                          background: `linear-gradient(45deg, ${realm.gradient.replace(/from-|via-|to-/g, "")})`,
                        }}
                        animate={{
                          opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </motion.div>
                </Link>
              )
            })}

            {/* Overflow Menu for Hidden Realms */}
            {hiddenRealms.length > 0 && (
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-amber-400/80 hover:text-amber-300 hover:bg-amber-500/20"
                >
                  <Settings className="w-4 h-4" />
                  {hiddenRealms.length > 0 && <span className="ml-1 text-xs">+{hiddenRealms.length}</span>}
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Active Realm Info with Adaptive Display */}
        <AnimatePresence>
          {dimensions.width > 1024 && (
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-right">
                <div
                  className={cn(
                    "font-serif font-bold text-amber-300 tracking-wider",
                    layout.toolbarCompact ? "text-sm" : "text-base",
                  )}
                >
                  {activeRealm.romanTitle}
                </div>
                {!layout.toolbarCompact && <div className="text-xs text-purple-200/80">{activeRealm.description}</div>}
              </div>
              <motion.div
                className={cn(
                  "relative rounded-lg flex items-center justify-center shadow-lg",
                  `bg-gradient-to-br ${activeRealm.gradient}`,
                )}
                animate={{
                  width: layout.toolbarCompact ? 40 : 48,
                  height: layout.toolbarCompact ? 40 : 48,
                  clipPath: layout.toolbarCompact
                    ? "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)"
                    : "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                }}
              >
                <activeRealm.icon className={cn("text-white", layout.toolbarCompact ? "w-5 h-5" : "w-6 h-6")} />

                {/* Roman corner ornaments */}
                {!layout.toolbarCompact && (
                  <>
                    <div className="absolute -top-1 -left-1 w-3 h-3">
                      <div className="w-full h-px bg-amber-400/60" />
                      <div className="w-px h-full bg-amber-400/60" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3">
                      <div className="w-full h-px bg-amber-400/60" />
                      <div className="absolute right-0 w-px h-full bg-amber-400/60" />
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3">
                      <div className="absolute bottom-0 w-full h-px bg-amber-400/60" />
                      <div className="w-px h-full bg-amber-400/60" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3">
                      <div className="absolute bottom-0 w-full h-px bg-amber-400/60" />
                      <div className="absolute right-0 w-px h-full bg-amber-400/60" />
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Roman-style border with adaptive opacity */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"
        animate={{ opacity: layout.toolbarCompact ? 0.4 : 0.6 }}
      />
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
        animate={{ opacity: layout.toolbarCompact ? 0.2 : 0.3 }}
      />
    </motion.div>
  )
}
