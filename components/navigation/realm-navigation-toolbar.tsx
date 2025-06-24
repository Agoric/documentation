"use client"

import type * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, ShoppingBag, TrendingUp, Trophy, Scale, Zap, Globe, Shield, Coins } from "lucide-react"
import { cn } from "@/lib/utils"

interface RealmTab {
  id: string
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  gradient: string
  isActive?: boolean
}

const realms: RealmTab[] = [
  {
    id: "holographic-products",
    name: "Holographic Products",
    href: "/dashboard/ecommerex/holographic-products",
    icon: ShoppingBag,
    description: "Advanced product marketplace with holographic displays",
    gradient: "from-purple-500 via-blue-500 to-cyan-500",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    href: "/dashboard/ecommerex/real-estate",
    icon: Building2,
    description: "Premium property marketplace with bidding system",
    gradient: "from-emerald-500 via-teal-500 to-blue-500",
  },
  {
    id: "snap-dax",
    name: "SnapDax Trading",
    href: "/dashboard/snap-dax",
    icon: TrendingUp,
    description: "Advanced trading platform with AI insights",
    gradient: "from-orange-500 via-red-500 to-pink-500",
  },
  {
    id: "gamification",
    name: "Gamification Hub",
    href: "/dashboard/gamification",
    icon: Trophy,
    description: "Achievement system and rewards platform",
    gradient: "from-yellow-500 via-orange-500 to-red-500",
  },
  {
    id: "legal-framework",
    name: "Legal Framework",
    href: "/legal",
    icon: Scale,
    description: "Digital jurisdiction and legal documentation",
    gradient: "from-slate-500 via-gray-500 to-zinc-500",
  },
  {
    id: "diplomatic-agents",
    name: "Diplomatic Agents",
    href: "/dashboard/diplomatic-agents",
    icon: Shield,
    description: "Agent certification and tracking system",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    id: "credit-empire",
    name: "Credit Empire",
    href: "/dashboard/credit-empire",
    icon: Coins,
    description: "Credit management and financial services",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
  },
  {
    id: "global-network",
    name: "Global Network",
    href: "/dashboard/global-network",
    icon: Globe,
    description: "Worldwide connections and partnerships",
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
  },
]

export function RealmNavigationToolbar() {
  const pathname = usePathname()

  const getActiveRealm = () => {
    return realms.find((realm) => pathname.startsWith(realm.href)) || realms[0]
  }

  const activeRealm = getActiveRealm()

  return (
    <div className="w-full border-b border-white/10 bg-black/20 backdrop-blur-xl">
      {/* Main Navigation Bar */}
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-1">
          <div className="flex items-center space-x-2 mr-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              SNAPIFI
            </span>
          </div>

          {/* Realm Tabs */}
          <div className="flex items-center space-x-1">
            {realms.map((realm) => {
              const isActive = pathname.startsWith(realm.href)
              const Icon = realm.icon

              return (
                <Link
                  key={realm.id}
                  href={realm.href}
                  className={cn(
                    "relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 group",
                    isActive
                      ? "bg-white/10 backdrop-blur-sm border border-white/20"
                      : "hover:bg-white/5 hover:backdrop-blur-sm",
                  )}
                >
                  <div
                    className={cn(
                      "p-1.5 rounded-md transition-all duration-300",
                      isActive ? `bg-gradient-to-r ${realm.gradient} shadow-lg` : "bg-white/10 group-hover:bg-white/20",
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-4 h-4 transition-colors duration-300",
                        isActive ? "text-white" : "text-gray-400 group-hover:text-white",
                      )}
                    />
                  </div>

                  <span
                    className={cn(
                      "text-sm font-medium transition-colors duration-300 hidden lg:block",
                      isActive ? "text-white" : "text-gray-400 group-hover:text-white",
                    )}
                  >
                    {realm.name}
                  </span>

                  {/* Active indicator */}
                  {isActive && (
                    <div
                      className={cn(
                        "absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full",
                        `bg-gradient-to-r ${realm.gradient}`,
                      )}
                    />
                  )}

                  {/* Holographic effect */}
                  {isActive && (
                    <div
                      className={cn(
                        "absolute inset-0 rounded-lg opacity-20 animate-pulse",
                        `bg-gradient-to-r ${realm.gradient}`,
                      )}
                    />
                  )}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Active Realm Info */}
        <div className="hidden xl:flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm font-medium text-white">{activeRealm.name}</div>
            <div className="text-xs text-gray-400">{activeRealm.description}</div>
          </div>
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              `bg-gradient-to-r ${activeRealm.gradient} shadow-lg`,
            )}
          >
            <activeRealm.icon className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Holographic Border Effect */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
    </div>
  )
}
