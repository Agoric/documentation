"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { usePortal } from "@/contexts/portal-context"
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
  ShieldCheck,
  ShoppingCart,
  Crown,
  Lightbulb,
  TrendingUp,
  Rocket,
  Database,
  Shield,
  Activity,
  FileText,
  Package,
  Store,
  Handshake,
  Globe,
  CreditCard,
  PieChart,
  Target,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PortalSwitcher } from "./portal-switcher"

interface Environment {
  id: string
  name: string
  icon: any
  path: string
  category: string
  description: string
  color: string
  portals: ("imperial" | "citizen" | "vendor")[]
}

const environments: Environment[] = [
  // Imperial Portal - Backend & Administration
  {
    id: "imperial-command",
    name: "Command Center",
    icon: Crown,
    path: "/imperial/command",
    category: "Imperial Core",
    description: "Central command and control",
    color: "text-red-400",
    portals: ["imperial"],
  },
  {
    id: "system-admin",
    name: "System Administration",
    icon: Server,
    path: "/imperial/system",
    category: "Imperial Core",
    description: "System configuration and monitoring",
    color: "text-orange-400",
    portals: ["imperial"],
  },
  {
    id: "database-management",
    name: "Database Management",
    icon: Database,
    path: "/imperial/database",
    category: "Imperial Core",
    description: "Database administration and backup",
    color: "text-yellow-400",
    portals: ["imperial"],
  },
  {
    id: "security-center",
    name: "Security Center",
    icon: Shield,
    path: "/imperial/security",
    category: "Imperial Core",
    description: "Security monitoring and threat detection",
    color: "text-red-500",
    portals: ["imperial"],
  },
  {
    id: "user-management",
    name: "User Management",
    icon: Users,
    path: "/imperial/users",
    category: "Imperial Core",
    description: "User accounts and permissions",
    color: "text-purple-400",
    portals: ["imperial"],
  },
  {
    id: "system-logs",
    name: "System Logs",
    icon: FileText,
    path: "/imperial/logs",
    category: "Imperial Core",
    description: "System logs and audit trails",
    color: "text-gray-400",
    portals: ["imperial"],
  },

  // Citizen Portal - User Services
  {
    id: "citizen-dashboard",
    name: "Personal Dashboard",
    icon: Home,
    path: "/citizen/dashboard",
    category: "Citizen Services",
    description: "Personal financial overview",
    color: "text-blue-400",
    portals: ["citizen"],
  },
  {
    id: "financial-planning",
    name: "Financial Planning",
    icon: TrendingUp,
    path: "/citizen/financial-planning",
    category: "Citizen Services",
    description: "AI-powered financial planning",
    color: "text-cyan-400",
    portals: ["citizen"],
  },
  {
    id: "credit-suite",
    name: "Credit Suite",
    icon: ShieldCheck,
    path: "/citizen/credit-suite",
    category: "Citizen Services",
    description: "Credit monitoring and optimization",
    color: "text-green-400",
    portals: ["citizen"],
  },
  {
    id: "investment-portfolio",
    name: "Investment Portfolio",
    icon: PieChart,
    path: "/citizen/portfolio",
    category: "Citizen Services",
    description: "Investment tracking and analysis",
    color: "text-indigo-400",
    portals: ["citizen"],
  },
  {
    id: "loan-center",
    name: "Loan Center",
    icon: CreditCard,
    path: "/citizen/loans",
    category: "Citizen Services",
    description: "Loan applications and management",
    color: "text-emerald-400",
    portals: ["citizen"],
  },
  {
    id: "marketplace",
    name: "Marketplace",
    icon: ShoppingCart,
    path: "/citizen/marketplace",
    category: "Citizen Services",
    description: "Product and service marketplace",
    color: "text-pink-400",
    portals: ["citizen"],
  },
  {
    id: "gamification",
    name: "Rewards Hub",
    icon: Gamepad2,
    path: "/citizen/rewards",
    category: "Citizen Services",
    description: "Gamified rewards and achievements",
    color: "text-violet-400",
    portals: ["citizen"],
  },
  {
    id: "support-center",
    name: "Support Center",
    icon: Lightbulb,
    path: "/citizen/support",
    category: "Citizen Services",
    description: "Help and customer support",
    color: "text-teal-400",
    portals: ["citizen"],
  },

  // Vendor Portal - Business Partners
  {
    id: "vendor-dashboard",
    name: "Business Dashboard",
    icon: Building2,
    path: "/vendor/dashboard",
    category: "Vendor Hub",
    description: "Business performance overview",
    color: "text-green-400",
    portals: ["vendor"],
  },
  {
    id: "product-management",
    name: "Product Management",
    icon: Package,
    path: "/vendor/products",
    category: "Vendor Hub",
    description: "Manage products and services",
    color: "text-emerald-400",
    portals: ["vendor"],
  },
  {
    id: "vendor-store",
    name: "Vendor Store",
    icon: Store,
    path: "/vendor/store",
    category: "Vendor Hub",
    description: "Online storefront management",
    color: "text-lime-400",
    portals: ["vendor"],
  },
  {
    id: "partner-network",
    name: "Partner Network",
    icon: Handshake,
    path: "/vendor/partners",
    category: "Vendor Hub",
    description: "Business partnerships and collaborations",
    color: "text-teal-400",
    portals: ["vendor"],
  },
  {
    id: "analytics-center",
    name: "Analytics Center",
    icon: BarChart3,
    path: "/vendor/analytics",
    category: "Vendor Hub",
    description: "Business analytics and insights",
    color: "text-blue-400",
    portals: ["vendor"],
  },
  {
    id: "integration-hub",
    name: "Integration Hub",
    icon: Globe,
    path: "/vendor/integrations",
    category: "Vendor Hub",
    description: "Third-party service integrations",
    color: "text-purple-400",
    portals: ["vendor"],
  },
  {
    id: "vendor-support",
    name: "Vendor Support",
    icon: Target,
    path: "/vendor/support",
    category: "Vendor Hub",
    description: "Business support and resources",
    color: "text-orange-400",
    portals: ["vendor"],
  },

  // Shared Environments
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
    path: "/settings",
    category: "System",
    description: "Account and system settings",
    color: "text-gray-400",
    portals: ["imperial", "citizen", "vendor"],
  },
  {
    id: "legal-center",
    name: "Legal Center",
    icon: Scale,
    path: "/legal",
    category: "System",
    description: "Legal documents and compliance",
    color: "text-stone-400",
    portals: ["imperial", "citizen", "vendor"],
  },
]

const categoryLabels = {
  "Imperial Core": "Imperial Core",
  "Citizen Services": "Citizen Services",
  "Vendor Hub": "Vendor Hub",
  System: "System",
}

export function EnvironmentSidebar() {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [mouseNearSidebar, setMouseNearSidebar] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { currentPortal } = usePortal()

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

  // Filter environments based on current portal
  const filteredEnvironments = environments.filter((env) => env.portals.includes(currentPortal))

  const groupedEnvironments = filteredEnvironments.reduce(
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

        {/* Portal Switcher */}
        {isExpanded && (
          <div className="p-4 border-b border-white/10">
            <PortalSwitcher />
          </div>
        )}

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
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium text-white">System Status</div>
              <div className="text-xs text-gray-400">All Systems Operational</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
