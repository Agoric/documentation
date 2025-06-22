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
    name: "QUICA Money Market",
    href: "/dashboard/ecommerex/holographic-products",
    icon: ShoppingBag,
    description: "QUANTUM UTILITY INVESTMENT CAPITOL ACCELERATOR",
    gradient: "from-purple-600 via-indigo-600 to-cyan-600",
    romanTitle: "QUICA MERCATUS",
    shortTitle: "QUICA",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    href: "/dashboard/ecommerex/real-estate",
    icon: Building2,
    description: "DOMUS ET PRAEDIA IMPERIUM",
    gradient: "from-amber-500 via-yellow-500 to-amber-600",
    romanTitle: "DOMUS",
    shortTitle: "DOM",
  },
  {
    id: "snap-dax",
    name: "SnapDax Trading",
    href: "/dashboard/snap-dax",
    icon: TrendingUp,
    description: "NEGOTIUM ET COMMERCIUM SUPREMUM",
    gradient: "from-purple-600 via-pink-600 to-purple-700",
    romanTitle: "NEGOTIUM",
    shortTitle: "NEG",
  },
  {
    id: "gamification",
    name: "Gamification Hub",
    href: "/dashboard/gamification",
    icon: Trophy,
    description: "LUDUS VICTORIAE ET HONORES",
    gradient: "from-amber-500 via-orange-500 to-amber-600",
    romanTitle: "LUDUS",
    shortTitle: "LUD",
  },
  {
    id: "legal-framework",
    name: "Legal Framework",
    href: "/legal",
    icon: Scale,
    description: "LEX DIGITALIS ET IURISDICTIO",
    gradient: "from-slate-600 via-gray-600 to-slate-700",
    romanTitle: "LEX",
    shortTitle: "LEX",
  },
  {
    id: "diplomatic-agents",
    name: "Diplomatic Agents",
    href: "/dashboard/diplomatic-agents",
    icon: Shield,
    description: "LEGATUS DIPLOMATICUS DIGITALIS",
    gradient: "from-purple-600 via-indigo-600 to-purple-700",
    romanTitle: "LEGATUS",
    shortTitle: "LEG",
  },
  {
    id: "credit-empire",
    name: "Credit Empire",
    href: "/dashboard/credit-empire",
    icon: Coins,
    description: "IMPERIUM CREDITUM ET PECUNIA",
    gradient: "from-amber-500 via-yellow-500 to-amber-600",
    romanTitle: "IMPERIUM",
    shortTitle: "IMP",
  },
  {
    id: "global-network",
    name: "Global Network",
    href: "/dashboard/global-network",
    icon: Globe,
    description: "ORBIS TERRARUM CONNEXUS",
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
