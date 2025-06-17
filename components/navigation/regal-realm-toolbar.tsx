"use client"

import type * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, ShoppingBag, TrendingUp, Trophy, Scale, Globe, Shield, Coins } from "lucide-react"
import { cn } from "@/lib/utils"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"
import { motion } from "framer-motion"

interface RealmTab {
  id: string
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  gradient: string
  romanTitle: string
}

const realms: RealmTab[] = [
  {
    id: "holographic-products",
    name: "Holographic Products",
    href: "/dashboard/ecommerex/holographic-products",
    icon: ShoppingBag,
    description: "Mercatus Holographicus - Advanced product marketplace",
    gradient: "from-purple-600 via-indigo-600 to-cyan-600",
    romanTitle: "MERCATUS",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    href: "/dashboard/ecommerex/real-estate",
    icon: Building2,
    description: "Domus Imperium - Premium property marketplace",
    gradient: "from-amber-500 via-yellow-500 to-amber-600",
    romanTitle: "DOMUS",
  },
  {
    id: "snap-dax",
    name: "SnapDax Trading",
    href: "/dashboard/snap-dax",
    icon: TrendingUp,
    description: "Negotium Supremum - Advanced trading platform",
    gradient: "from-purple-600 via-pink-600 to-purple-700",
    romanTitle: "NEGOTIUM",
  },
  {
    id: "gamification",
    name: "Gamification Hub",
    href: "/dashboard/gamification",
    icon: Trophy,
    description: "Ludus Honoris - Achievement and rewards system",
    gradient: "from-amber-500 via-orange-500 to-amber-600",
    romanTitle: "LUDUS",
  },
  {
    id: "legal-framework",
    name: "Legal Framework",
    href: "/legal",
    icon: Scale,
    description: "Lex Digitalis - Digital jurisdiction framework",
    gradient: "from-slate-600 via-gray-600 to-slate-700",
    romanTitle: "LEX",
  },
  {
    id: "diplomatic-agents",
    name: "Diplomatic Agents",
    href: "/dashboard/diplomatic-agents",
    icon: Shield,
    description: "Legatus Digitalis - Agent certification system",
    gradient: "from-purple-600 via-indigo-600 to-purple-700",
    romanTitle: "LEGATUS",
  },
  {
    id: "credit-empire",
    name: "Credit Empire",
    href: "/dashboard/credit-empire",
    icon: Coins,
    description: "Imperium Creditum - Financial services empire",
    gradient: "from-amber-500 via-yellow-500 to-amber-600",
    romanTitle: "IMPERIUM",
  },
  {
    id: "global-network",
    name: "Global Network",
    href: "/dashboard/global-network",
    icon: Globe,
    description: "Orbis Connexus - Worldwide connections network",
    gradient: "from-cyan-600 via-blue-600 to-purple-600",
    romanTitle: "ORBIS",
  },
]

export function RegalRealmToolbar() {
  const pathname = usePathname()

  const getActiveRealm = () => {
    return realms.find((realm) => pathname.startsWith(realm.href)) || realms[0]
  }

  const activeRealm = getActiveRealm()

  return (
    <div className="w-full border-b border-amber-400/20 bg-gradient-to-r from-purple-950/90 via-indigo-950/90 to-purple-950/90 backdrop-blur-xl">
      {/* Roman Column Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />
        <div className="absolute inset-0">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-400/20 to-transparent"
              style={{ left: `${(i + 1) * 8.33}%` }}
            />
          ))}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-6">
          {/* Supreme Authority Branding */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <SupremeAuthorityCoin size="lg" variant="logo" />
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent font-serif">
                SNAPIFI
              </span>
              <span className="text-xs text-amber-400/70 font-serif tracking-wider">SUPREMA AUCTORITAS</span>
            </div>
          </motion.div>

          {/* Roman Divider */}
          <div className="h-12 w-px bg-gradient-to-b from-transparent via-amber-400/40 to-transparent" />

          {/* Realm Tabs */}
          <div className="flex items-center space-x-2">
            {realms.map((realm) => {
              const isActive = pathname.startsWith(realm.href)
              const Icon = realm.icon

              return (
                <Link key={realm.id} href={realm.href}>
                  <motion.div
                    className={cn(
                      "relative flex flex-col items-center space-y-1 px-4 py-3 rounded-lg transition-all duration-300 group",
                      isActive
                        ? "bg-gradient-to-br from-amber-400/20 via-purple-500/20 to-amber-400/20 backdrop-blur-sm border border-amber-400/30"
                        : "hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-amber-400/10 hover:backdrop-blur-sm",
                    )}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Icon with Roman-style frame */}
                    <div
                      className={cn(
                        "relative p-2 rounded-md transition-all duration-300",
                        isActive
                          ? `bg-gradient-to-br ${realm.gradient} shadow-lg`
                          : "bg-gradient-to-br from-purple-800/30 to-indigo-800/30 group-hover:from-purple-700/40 group-hover:to-amber-400/40",
                      )}
                      style={{
                        clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                      }}
                    >
                      <Icon
                        className={cn(
                          "w-5 h-5 transition-colors duration-300",
                          isActive ? "text-white" : "text-amber-400/80 group-hover:text-amber-300",
                        )}
                      />

                      {/* Roman corner decorations */}
                      <div className="absolute -top-1 -left-1 w-2 h-2 border-l border-t border-amber-400/40" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 border-r border-t border-amber-400/40" />
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 border-l border-b border-amber-400/40" />
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r border-b border-amber-400/40" />
                    </div>

                    {/* Roman Title */}
                    <span
                      className={cn(
                        "text-xs font-serif font-bold tracking-wider transition-colors duration-300 hidden lg:block",
                        isActive ? "text-amber-300" : "text-amber-400/70 group-hover:text-amber-300",
                      )}
                    >
                      {realm.romanTitle}
                    </span>

                    {/* Modern Name */}
                    <span
                      className={cn(
                        "text-xs font-medium transition-colors duration-300 hidden xl:block",
                        isActive ? "text-white" : "text-purple-200/70 group-hover:text-white",
                      )}
                    >
                      {realm.name}
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-2"
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
                        className="absolute inset-0 rounded-lg opacity-30 blur-sm"
                        style={{
                          background: `linear-gradient(45deg, ${realm.gradient.replace("from-", "").replace("via-", "").replace("to-", "")})`,
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
          </div>
        </div>

        {/* Active Realm Info with Roman Styling */}
        <div className="hidden xl:flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm font-serif font-bold text-amber-300 tracking-wider">{activeRealm.romanTitle}</div>
            <div className="text-xs text-purple-200/80">{activeRealm.description}</div>
          </div>
          <div
            className={cn(
              "relative w-12 h-12 rounded-lg flex items-center justify-center",
              `bg-gradient-to-br ${activeRealm.gradient} shadow-lg`,
            )}
            style={{
              clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            }}
          >
            <activeRealm.icon className="w-6 h-6 text-white" />

            {/* Roman corner ornaments */}
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
          </div>
        </div>
      </div>

      {/* Roman-style border with gold accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
    </div>
  )
}
