"use client"
import { usePathname } from "next/navigation"
import { Download, RefreshCw, BarChart3, Users, Shield, FileText, Zap, PenToolIcon as Tool } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const environmentTools = {
  "/dashboard/ecommerex": [
    {
      name: "Product Analytics",
      icon: BarChart3,
      description: "View sales metrics",
      action: () => console.log("Opening analytics"),
      badge: "New",
    },
    {
      name: "Inventory Sync",
      icon: RefreshCw,
      description: "Sync product inventory",
      action: () => console.log("Syncing inventory"),
    },
    {
      name: "Export Products",
      icon: Download,
      description: "Download product data",
      action: () => console.log("Exporting products"),
    },
  ],
  "/legal": [
    {
      name: "Document Generator",
      icon: FileText,
      description: "Create legal documents",
      action: () => console.log("Opening document generator"),
    },
    {
      name: "Compliance Check",
      icon: Shield,
      description: "Run compliance audit",
      action: () => console.log("Running compliance check"),
      badge: "Recommended",
    },
    {
      name: "Legal Updates",
      icon: RefreshCw,
      description: "Check for legal changes",
      action: () => console.log("Checking updates"),
    },
  ],
  "/admin": [
    {
      name: "User Management",
      icon: Users,
      description: "Manage platform users",
      action: () => console.log("Opening user management"),
    },
    {
      name: "System Health",
      icon: Shield,
      description: "Check system status",
      action: () => console.log("Checking system health"),
    },
    {
      name: "Backup Data",
      icon: Download,
      description: "Create system backup",
      action: () => console.log("Creating backup"),
    },
  ],
  "/dashboard/gamification": [
    {
      name: "Reward Analytics",
      icon: BarChart3,
      description: "View engagement metrics",
      action: () => console.log("Opening reward analytics"),
    },
    {
      name: "Campaign Manager",
      icon: Zap,
      description: "Manage reward campaigns",
      action: () => console.log("Opening campaign manager"),
      badge: "Active",
    },
    {
      name: "User Achievements",
      icon: Users,
      description: "Manage user achievements",
      action: () => console.log("Opening achievements"),
    },
  ],
}

export function EnvironmentTools() {
  const pathname = usePathname()

  // Get tools based on current path
  const getEnvironmentTools = () => {
    // Try exact match first
    if (environmentTools[pathname as keyof typeof environmentTools]) {
      return environmentTools[pathname as keyof typeof environmentTools]
    }

    // Try partial matches
    for (const [path, tools] of Object.entries(environmentTools)) {
      if (pathname.startsWith(path)) {
        return tools
      }
    }

    return []
  }

  const tools = getEnvironmentTools()

  if (tools.length === 0) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Tool className="h-3 w-3" />
        <span>No specific tools available for this environment</span>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Tool className="h-4 w-4" />
        <span className="text-sm font-medium">Environment Tools</span>
        <Badge variant="outline" className="text-xs">
          {tools.length}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {tools.map((tool) => (
          <Button
            key={tool.name}
            variant="ghost"
            size="sm"
            onClick={tool.action}
            className="h-auto p-3 justify-start hover:bg-white/10"
          >
            <div className="flex items-center gap-3 w-full">
              <tool.icon className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{tool.name}</span>
                  {tool.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {tool.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{tool.description}</p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}
