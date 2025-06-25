"use client"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  Building2,
  ShoppingBag,
  Gamepad2,
  Shield,
  Globe,
  Users,
  Server,
  ArrowRight,
  Zap,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const environmentSuggestions = {
  "/legal": [
    {
      name: "Compliance Portal",
      path: "/legal/compliance",
      icon: Shield,
      reason: "Related legal environment",
      category: "Legal Framework",
    },
    {
      name: "Digital Domicile",
      path: "/legal/digital-domicile",
      icon: Globe,
      reason: "Legal jurisdiction",
      category: "Legal Framework",
    },
    {
      name: "Diplomatic Immunity",
      path: "/legal/diplomatic-immunity",
      icon: Users,
      reason: "Agent legal status",
      category: "Legal Framework",
    },
  ],
  "/dashboard": [
    {
      name: "SNAP-DAX Trading",
      path: "/dashboard/snap-dax",
      icon: Building2,
      reason: "Financial platform",
      category: "Main Platform",
    },
    {
      name: "EcommereX Shop",
      path: "/dashboard/ecommerex/holographic-products",
      icon: ShoppingBag,
      reason: "Commerce platform",
      category: "Commerce",
    },
    {
      name: "Gamification Hub",
      path: "/dashboard/gamification",
      icon: Gamepad2,
      reason: "Rewards system",
      category: "Gaming & Rewards",
    },
  ],
  "/admin": [
    {
      name: "User Management",
      path: "/admin/users",
      icon: Users,
      reason: "User administration",
      category: "Administration",
    },
    {
      name: "System Monitoring",
      path: "/admin/system",
      icon: Server,
      reason: "System health",
      category: "Administration",
    },
    {
      name: "Admin Dashboard",
      path: "/admin/dashboard",
      icon: BarChart3,
      reason: "Administration overview",
      category: "Administration",
    },
  ],
}

const popularEnvironments = [
  {
    name: "EcommereX Shop",
    path: "/dashboard/ecommerex/holographic-products",
    icon: ShoppingBag,
    reason: "Most visited",
    category: "Commerce",
  },
  {
    name: "SNAP-DAX Trading",
    path: "/dashboard/snap-dax",
    icon: Building2,
    reason: "Trending",
    category: "Main Platform",
  },
  {
    name: "Main Dashboard",
    path: "/dashboard",
    icon: BarChart3,
    reason: "Home base",
    category: "Main Platform",
  },
]

const quickActions = [
  {
    name: "View Analytics",
    action: () => console.log("Analytics"),
    icon: TrendingUp,
    description: "Check platform metrics",
  },
  {
    name: "Quick Setup",
    action: () => console.log("Setup"),
    icon: Zap,
    description: "Configure new features",
  },
]

export function EnvironmentSearchSuggestions() {
  const pathname = usePathname()
  const router = useRouter()

  // Get suggestions based on current path
  const getRelatedEnvironments = () => {
    const basePath = pathname.split("/").slice(0, 2).join("/")
    return environmentSuggestions[basePath as keyof typeof environmentSuggestions] || []
  }

  const relatedEnvironments = getRelatedEnvironments()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <div className="p-4 text-center">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">No environments found</h3>
        <p className="text-xs text-muted-foreground">Try these suggestions instead:</p>
      </div>

      {/* Related Environments */}
      {relatedEnvironments.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
            <ArrowRight className="h-3 w-3" />
            Related to current area
          </h4>
          <div className="space-y-1">
            {relatedEnvironments.map((env) => (
              <Button
                key={env.path}
                variant="ghost"
                size="sm"
                onClick={() => handleNavigate(env.path)}
                className="w-full justify-start text-xs h-8 hover:bg-white/10"
              >
                <env.icon className="h-3 w-3 mr-2" />
                <span className="flex-1 text-left">{env.name}</span>
                <span className="text-xs text-muted-foreground">{env.reason}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Environments */}
      <div className="mb-4">
        <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          Popular destinations
        </h4>
        <div className="space-y-1">
          {popularEnvironments.map((env) => (
            <Button
              key={env.path}
              variant="ghost"
              size="sm"
              onClick={() => handleNavigate(env.path)}
              className="w-full justify-start text-xs h-8 hover:bg-white/10"
            >
              <env.icon className="h-3 w-3 mr-2" />
              <span className="flex-1 text-left">{env.name}</span>
              <span className="text-xs text-muted-foreground">{env.reason}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
          <Zap className="h-3 w-3" />
          Quick actions
        </h4>
        <div className="space-y-1">
          {quickActions.map((action) => (
            <Button
              key={action.name}
              variant="ghost"
              size="sm"
              onClick={action.action}
              className="w-full justify-start text-xs h-8 hover:bg-white/10"
            >
              <action.icon className="h-3 w-3 mr-2" />
              <span className="flex-1 text-left">{action.name}</span>
              <span className="text-xs text-muted-foreground">{action.description}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
