"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  ArrowRight,
  Zap,
  TrendingUp,
  Globe,
  Building2,
  Shield,
  Gavel,
  Users,
  BarChart3,
  Gamepad2,
  ShoppingBag,
  Server,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface Suggestion {
  label: string
  path: string
  icon: React.ElementType
  description: string
  reason: string
  category: string
}

const environmentMap = {
  "/dashboard": {
    icon: BarChart3,
    category: "Main Platform",
    related: ["/dashboard/snap-dax", "/dashboard/gamification", "/dashboard/ecommerex/holographic-products"],
  },
  "/dashboard/snap-dax": {
    icon: Building2,
    category: "Main Platform",
    related: ["/dashboard", "/admin/system", "/legal/compliance"],
  },
  "/dashboard/ecommerex/holographic-products": {
    icon: ShoppingBag,
    category: "Commerce",
    related: ["/dashboard/gamification", "/admin/users", "/dashboard"],
  },
  "/dashboard/gamification": {
    icon: Gamepad2,
    category: "Gaming & Rewards",
    related: ["/dashboard/ecommerex/holographic-products", "/dashboard", "/admin/users"],
  },
  "/legal": {
    icon: Gavel,
    category: "Legal Framework",
    related: ["/legal/compliance", "/legal/digital-domicile", "/legal/diplomatic-immunity"],
  },
  "/legal/compliance": {
    icon: Shield,
    category: "Legal Framework",
    related: ["/legal", "/legal/digital-domicile", "/admin/dashboard"],
  },
  "/legal/digital-domicile": {
    icon: Globe,
    category: "Legal Framework",
    related: ["/legal/compliance", "/legal/diplomatic-immunity", "/legal"],
  },
  "/legal/diplomatic-immunity": {
    icon: Users,
    category: "Legal Framework",
    related: ["/legal/digital-domicile", "/legal/compliance", "/admin/users"],
  },
  "/admin/dashboard": {
    icon: Server,
    category: "Administration",
    related: ["/admin/users", "/admin/system", "/dashboard"],
  },
  "/admin/users": {
    icon: Users,
    category: "Administration",
    related: ["/admin/dashboard", "/admin/system", "/legal/diplomatic-immunity"],
  },
  "/admin/system": {
    icon: Server,
    category: "Administration",
    related: ["/admin/dashboard", "/admin/users", "/dashboard/snap-dax"],
  },
}

const pathToLabel = {
  "/dashboard": "Main Dashboard",
  "/dashboard/snap-dax": "SNAP-DAX Trading",
  "/dashboard/ecommerex/holographic-products": "EcommereX Shop",
  "/dashboard/gamification": "Gamification Hub",
  "/legal": "Legal Center",
  "/legal/compliance": "Compliance Portal",
  "/legal/digital-domicile": "Digital Domicile",
  "/legal/diplomatic-immunity": "Diplomatic Immunity",
  "/admin/dashboard": "Admin Dashboard",
  "/admin/users": "User Management",
  "/admin/system": "System Monitoring",
}

export function EnvironmentSearchSuggestions() {
  const pathname = usePathname()
  const router = useRouter()

  const getSuggestions = React.useMemo((): Suggestion[] => {
    const currentEnv = Object.entries(environmentMap).find(([path]) => pathname.startsWith(path))

    if (!currentEnv) {
      // Default suggestions for unknown paths
      return [
        {
          label: "Main Dashboard",
          path: "/dashboard",
          icon: BarChart3,
          description: "Overview and analytics",
          reason: "Popular destination",
          category: "Main Platform",
        },
        {
          label: "EcommereX Shop",
          path: "/dashboard/ecommerex/holographic-products",
          icon: ShoppingBag,
          description: "Holographic product marketplace",
          reason: "Trending now",
          category: "Commerce",
        },
      ]
    }

    const [currentPath, currentInfo] = currentEnv
    const suggestions: Suggestion[] = []

    // Add related environments
    currentInfo.related.forEach((relatedPath) => {
      const relatedInfo = environmentMap[relatedPath as keyof typeof environmentMap]
      if (relatedInfo) {
        suggestions.push({
          label: pathToLabel[relatedPath as keyof typeof pathToLabel],
          path: relatedPath,
          icon: relatedInfo.icon,
          description: getEnvironmentDescription(relatedPath),
          reason: "Related environment",
          category: relatedInfo.category,
        })
      }
    })

    // Add popular destinations based on current category
    if (currentInfo.category === "Legal Framework") {
      suggestions.push({
        label: "Admin Dashboard",
        path: "/admin/dashboard",
        icon: Server,
        description: "System administration",
        reason: "Frequently accessed from Legal",
        category: "Administration",
      })
    } else if (currentInfo.category === "Commerce") {
      suggestions.push({
        label: "Gamification Hub",
        path: "/dashboard/gamification",
        icon: Gamepad2,
        description: "Rewards and achievements",
        reason: "Popular with Commerce users",
        category: "Gaming & Rewards",
      })
    }

    return suggestions.slice(0, 4) // Limit to 4 suggestions
  }, [pathname])

  const handleSuggestionClick = (path: string) => {
    router.push(path)
  }

  return (
    <div className="p-4 space-y-4">
      <div className="text-center">
        <div className="text-sm text-muted-foreground mb-3">No environments found. Try these suggestions:</div>

        <div className="space-y-2">
          {getSuggestions.map((suggestion, index) => (
            <Button
              key={suggestion.path}
              variant="ghost"
              className="w-full justify-start h-auto p-3 hover:bg-white/10 group"
              onClick={() => handleSuggestionClick(suggestion.path)}
            >
              <div className="flex items-start gap-3 w-full">
                <suggestion.icon className="h-4 w-4 mt-0.5 text-muted-foreground group-hover:text-foreground" />
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">{suggestion.label}</div>
                  <div className="text-xs text-muted-foreground">{suggestion.description}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Zap className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs text-yellow-600">{suggestion.reason}</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
              </div>
            </Button>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="text-xs text-muted-foreground mb-2">Quick Actions:</div>
          <div className="flex gap-2 justify-center">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() => handleSuggestionClick("/dashboard")}
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              Popular
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() => handleSuggestionClick("/admin/dashboard")}
            >
              <Server className="h-3 w-3 mr-1" />
              Admin
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function getEnvironmentDescription(path: string): string {
  const descriptions: Record<string, string> = {
    "/dashboard": "Overview and analytics",
    "/dashboard/snap-dax": "Financial trading platform",
    "/dashboard/ecommerex/holographic-products": "Holographic product marketplace",
    "/dashboard/gamification": "Rewards and achievements",
    "/legal": "Legal documents and compliance",
    "/legal/compliance": "Regulatory compliance",
    "/legal/digital-domicile": "Digital jurisdiction declaration",
    "/legal/diplomatic-immunity": "Agent diplomatic status",
    "/admin/dashboard": "System administration",
    "/admin/users": "Manage platform users",
    "/admin/system": "Infrastructure monitoring",
  }

  return descriptions[path] || "Platform environment"
}
