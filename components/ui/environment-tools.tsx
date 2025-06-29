"use client"

import type * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  Settings,
  BarChart3,
  Users,
  ShoppingCart,
  FileText,
  Shield,
  Gamepad2,
  Server,
  Download,
  Upload,
  RefreshCw,
  Plus,
  Eye,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Tool {
  id: string
  label: string
  icon: React.ElementType
  description: string
  action: () => void
  badge?: string
  variant?: "default" | "secondary" | "outline"
}

export function EnvironmentTools() {
  const pathname = usePathname()
  const router = useRouter()

  const getToolsForEnvironment = (path: string): Tool[] => {
    // Dashboard tools
    if (
      path.startsWith("/dashboard") &&
      !path.includes("ecommerex") &&
      !path.includes("gamification") &&
      !path.includes("snap-dax")
    ) {
      return [
        {
          id: "analytics",
          label: "Analytics",
          icon: BarChart3,
          description: "View detailed analytics",
          action: () => console.log("Opening analytics"),
          badge: "New",
        },
        {
          id: "export",
          label: "Export Data",
          icon: Download,
          description: "Export dashboard data",
          action: () => console.log("Exporting data"),
        },
        {
          id: "refresh",
          label: "Refresh",
          icon: RefreshCw,
          description: "Refresh dashboard",
          action: () => window.location.reload(),
        },
      ]
    }

    // SNAP-DAX tools
    if (path.includes("snap-dax")) {
      return [
        {
          id: "trade",
          label: "New Trade",
          icon: Plus,
          description: "Create new trade",
          action: () => console.log("Creating new trade"),
          variant: "default" as const,
        },
        {
          id: "portfolio",
          label: "Portfolio",
          icon: BarChart3,
          description: "View portfolio",
          action: () => console.log("Opening portfolio"),
        },
        {
          id: "settings",
          label: "Settings",
          icon: Settings,
          description: "Trading settings",
          action: () => console.log("Opening settings"),
        },
      ]
    }

    // EcommereX tools
    if (path.includes("ecommerex")) {
      return [
        {
          id: "add-product",
          label: "Add Product",
          icon: Plus,
          description: "Add new product",
          action: () => console.log("Adding product"),
          variant: "default" as const,
        },
        {
          id: "inventory",
          label: "Inventory",
          icon: ShoppingCart,
          description: "Manage inventory",
          action: () => console.log("Opening inventory"),
        },
        {
          id: "orders",
          label: "Orders",
          icon: FileText,
          description: "View orders",
          action: () => console.log("Opening orders"),
          badge: "12",
        },
      ]
    }

    // Gamification tools
    if (path.includes("gamification")) {
      return [
        {
          id: "leaderboard",
          label: "Leaderboard",
          icon: BarChart3,
          description: "View leaderboard",
          action: () => console.log("Opening leaderboard"),
        },
        {
          id: "rewards",
          label: "Rewards",
          icon: Gamepad2,
          description: "Manage rewards",
          action: () => console.log("Opening rewards"),
        },
        {
          id: "achievements",
          label: "Achievements",
          icon: Zap,
          description: "View achievements",
          action: () => console.log("Opening achievements"),
        },
      ]
    }

    // Legal tools
    if (path.startsWith("/legal")) {
      return [
        {
          id: "documents",
          label: "Documents",
          icon: FileText,
          description: "Legal documents",
          action: () => console.log("Opening documents"),
        },
        {
          id: "compliance",
          label: "Compliance",
          icon: Shield,
          description: "Compliance check",
          action: () => router.push("/legal/compliance"),
        },
        {
          id: "review",
          label: "Review",
          icon: Eye,
          description: "Review legal status",
          action: () => console.log("Opening review"),
        },
      ]
    }

    // Admin tools
    if (path.startsWith("/admin")) {
      return [
        {
          id: "users",
          label: "Users",
          icon: Users,
          description: "Manage users",
          action: () => router.push("/admin/users"),
        },
        {
          id: "system",
          label: "System",
          icon: Server,
          description: "System monitoring",
          action: () => router.push("/admin/system"),
        },
        {
          id: "backup",
          label: "Backup",
          icon: Upload,
          description: "System backup",
          action: () => console.log("Starting backup"),
          badge: "Critical",
        },
      ]
    }

    // Default tools
    return [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: BarChart3,
        description: "Go to dashboard",
        action: () => router.push("/dashboard"),
      },
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
        description: "Platform settings",
        action: () => console.log("Opening settings"),
      },
    ]
  }

  const tools = getToolsForEnvironment(pathname)

  if (tools.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Settings className="h-4 w-4" />
        <span>Environment Tools</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {tools.slice(0, 6).map((tool) => (
          <Button
            key={tool.id}
            variant={tool.variant || "outline"}
            size="sm"
            className="h-auto p-2 flex flex-col items-center gap-1 hover:bg-white/10 relative"
            onClick={tool.action}
          >
            <tool.icon className="h-4 w-4" />
            <span className="text-xs">{tool.label}</span>
            {tool.badge && (
              <Badge
                variant="secondary"
                className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center"
              >
                {tool.badge}
              </Badge>
            )}
          </Button>
        ))}
      </div>
    </div>
  )
}
