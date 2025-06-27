"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  Home,
  Building2,
  Users,
  BarChart3,
  Gamepad2,
  Server,
  Scale,
  Monitor,
  ShieldCheck,
  Briefcase,
  Beaker,
  Download,
  ShoppingCart,
  Sparkles,
  Zap,
  Crown,
  Lightbulb,
  TrendingUp,
  Rocket,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Environment {
  id: string
  name: string
  icon: any
  path: string
  category: "core" | "commerce" | "premium" | "admin" | "legal"
  description: string
  color: string
}

const environments: Environment[] = [
  // Core Environments
  {
    id: "home",
    name: "Dashboard",
    icon: Home,
    path: "/dashboard/home",
    category: "core",
    description: "Main dashboard overview",
    color: "text-blue-400",
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: BarChart3,
    path: "/dashboard/analytics",
    category: "core",
    description: "Data analytics and insights",
    color: "text-green-400",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    icon: Briefcase,
    path: "/dashboard/portfolio",
    category: "core",
    description: "Investment portfolio management",
    color: "text-purple-400",
  },
  {
    id: "financial-planning",
    name: "Financial Planning",
    icon: TrendingUp,
    path: "/dashboard/financial-planning",
    category: "core",
    description: "AI-powered financial planning",
    color: "text-cyan-400",
  },

  // Commerce Environments
  {
    id: "marketplace",
    name: "Marketplace",
    icon: ShoppingCart,
    path: "/commerce/marketplace",
    category: "commerce",
    description: "E-commerce marketplace",
    color: "text-orange-400",
  },
  {
    id: "holographic-products",
    name: "Holographic Products",
    icon: Sparkles,
    path: "/dashboard/ecommerex/holographic-products",
    category: "commerce",
    description: "Holographic product showcase",
    color: "text-pink-400",
  },
  {
    id: "snap-dax",
    name: "SNAP-DAX Trading",
    icon: Zap,
    path: "/snap-dax/digital-asset-exchange",
    category: "commerce",
    description: "Digital asset exchange",
    color: "text-yellow-400",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    icon: Building2,
    path: "/real-estate",
    category: "commerce",
    description: "Property marketplace",
    color: "text-emerald-400",
  },

  // Premium Environments
  {
    id: "credit-suite",
    name: "Credit Suite",
    icon: ShieldCheck,
    path: "/credit-suite",
    category: "premium",
    description: "Credit management tools",
    color: "text-red-400",
  },
  {
    id: "business-suite",
    name: "Business Suite",
    icon: Briefcase,
    path: "/business-suite",
    category: "premium",
    description: "Business management tools",
    color: "text-indigo-400",
  },
  {
    id: "gamification",
    name: "Gamification",
    icon: Gamepad2,
    path: "/dashboard/gamification",
    category: "premium",
    description: "Gamified experiences",
    color: "text-violet-400",
  },
  {
    id: "investors",
    name: "Investor Portal",
    icon: Crown,
    path: "/investors/portal",
    category: "premium",
    description: "Exclusive investor access",
    color: "text-amber-400",
  },

  // Admin Environments
  {
    id: "admin-dashboard",
    name: "Admin Dashboard",
    icon: Server,
    path: "/admin/dashboard",
    category: "admin",
    description: "Administrative controls",
    color: "text-slate-400",
  },
  {
    id: "admin-users",
    name: "User Management",
    icon: Users,
    path: "/admin/users",
    category: "admin",
    description: "User administration",
    color: "text-slate-400",
  },
  {
    id: "admin-system",
    name: "System Monitor",
    icon: Monitor,
    path: "/admin/system",
    category: "admin",
    description: "System monitoring",
    color: "text-slate-400",
  },

  // Legal Environments
  {
    id: "legal",
    name: "Legal Center",
    icon: Scale,
    path: "/legal",
    category: "legal",
    description: "Legal documentation",
    color: "text-stone-400",
  },

  // Special Environments
  {
    id: "beta-lab",
    name: "Beta Lab",
    icon: Beaker,
    path: "/beta-lab",
    category: "premium",
    description: "Experimental features",
    color: "text-lime-400",
  },
  {
    id: "suggestions",
    name: "Suggestions Hub",
    icon: Lightbulb,
    path: "/suggestions-hub",
    category: "core",
    description: "Feature suggestions",
    color: "text-teal-400",
  },
  {
    id: "download",
    name: "Download Center",
    icon: Download,
    path: "/download",
    category: "core",
    description: "Download platform",
    color: "text-sky-400",
  },
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
    path: "/settings",
    category: "core",
    description: "Platform settings",
    color: "text-gray-400",
  },
]

const categoryLabels = {
  core: "Core",
  commerce: "Commerce",
  premium: "Premium",
  admin: "Admin",
  legal: "Legal",
}

export function EnvironmentSidebar() {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [mouseNearSidebar, setMouseNearSidebar] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Auto-expand when mouse is near the sidebar
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const isNear = e.clientX < 50 // 50px buffer zone
      setMouseNearSidebar(isNear)
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Expand/collapse logic with delay
  React.useEffect(() => {
    let timeout: NodeJS.Timeout

    if (mouseNearSidebar) {
      timeout = setTimeout(() => setIsExpanded(true), 100)
    } else {
      timeout = setTimeout(() => setIsExpanded(false), 300)
    }

    return () => clearTimeout(timeout)
  }, [mouseNearSidebar])

  const groupedEnvironments = environments.reduce(
    (acc, env) => {
      if (!acc[env.category]) acc[env.category] = []
      acc[env.category].push(env)
      return acc
    },
    {} as Record<string, Environment[]>,
  )

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full bg-black/20 backdrop-blur-xl border-r border-white/10 transition-all duration-300 z-50",
        isExpanded ? "w-64" : "w-16",
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div
              className={cn(
                "flex items-center space-x-3 transition-opacity duration-200",
                isExpanded ? "opacity-100" : "opacity-0",
              )}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">Snapifi</h2>
                <p className="text-xs text-gray-400">Environments</p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-md hover:bg-white/10 transition-colors"
            >
              {isExpanded ? (
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          {Object.entries(groupedEnvironments).map(([category, envs]) => (
            <div key={category} className="mb-6">
              {isExpanded && (
                <div className="px-4 mb-2">
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </h3>
                </div>
              )}
              <div className="space-y-1 px-2">
                {envs.map((env) => {
                  const Icon = env.icon
                  const isActive = pathname === env.path || pathname.startsWith(env.path + "/")

                  return (
                    <button
                      key={env.id}
                      onClick={() => handleNavigation(env.path)}
                      className={cn(
                        "w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group",
                        isActive
                          ? "bg-white/10 text-white shadow-lg"
                          : "text-gray-400 hover:text-white hover:bg-white/5",
                      )}
                      title={!isExpanded ? env.name : undefined}
                    >
                      <Icon className={cn("w-5 h-5 flex-shrink-0", env.color)} />
                      <div
                        className={cn(
                          "flex-1 text-left transition-opacity duration-200",
                          isExpanded ? "opacity-100" : "opacity-0",
                        )}
                      >
                        <div className="text-sm font-medium">{env.name}</div>
                        {isExpanded && <div className="text-xs text-gray-500 truncate">{env.description}</div>}
                      </div>
                      {isActive && isExpanded && <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div
            className={cn(
              "flex items-center space-x-3 transition-opacity duration-200",
              isExpanded ? "opacity-100" : "opacity-0",
            )}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
              <Crown className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium text-white">Imperial</div>
              <div className="text-xs text-gray-400">Command Center</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
