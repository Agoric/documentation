"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Star,
  Clock,
  Settings,
  Home,
  Globe,
  Building2,
  Shield,
  Gavel,
  Users,
  BarChart3,
  Gamepad2,
  ShoppingBag,
  Server,
  FileText,
  Scale,
  UserCheck,
  Monitor,
  Filter,
  Grid3X3,
  List,
  ShieldCheck,
  Briefcase,
  Beaker,
  Download,
  GitBranch,
  Brain,
  Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useEnvironmentHistory } from "@/hooks/use-environment-history"
import { useEnvironmentNotifications } from "@/hooks/use-environment-notifications"
import { useEnvironmentBookmarks } from "@/hooks/use-environment-bookmarks"

interface Environment {
  id: string
  name: string
  path: string
  icon: React.ElementType
  description: string
  category: string
  shortcut?: string
  isNew?: boolean
  isPopular?: boolean
}

const environments: Environment[] = [
  // Main Platform
  {
    id: "dashboard-home",
    name: "Dashboard Home",
    path: "/dashboard/home",
    icon: Home,
    description: "Main dashboard hub",
    category: "Main Platform",
    shortcut: "Alt+H",
    isPopular: true,
  },
  {
    id: "dashboard",
    name: "Main Dashboard",
    path: "/dashboard",
    icon: BarChart3,
    description: "Overview and analytics",
    category: "Main Platform",
    shortcut: "Alt+1",
    isPopular: true,
  },
  {
    id: "snap-dax",
    name: "SNAP-DAX Trading",
    path: "/dashboard/snap-dax",
    icon: Building2,
    description: "Financial trading platform",
    category: "Main Platform",
    shortcut: "Alt+2",
    isPopular: true,
  },
  {
    id: "live-version",
    name: "Live Platform",
    path: "/live",
    icon: Activity,
    description: "Full live production platform",
    category: "Main Platform",
    shortcut: "Alt+L",
    isNew: true,
    isPopular: true,
  },

  // Commerce
  {
    id: "ecommerex",
    name: "EcommereX Shop",
    path: "/dashboard/ecommerex/holographic-products",
    icon: ShoppingBag,
    description: "Holographic product marketplace",
    category: "Commerce",
    shortcut: "Alt+3",
    isNew: true,
  },
  {
    id: "credit-suite",
    name: "Credit Suite",
    path: "/credit-suite",
    icon: ShieldCheck,
    description: "Credit monitoring and optimization",
    category: "Commerce",
    shortcut: "Alt+C",
    isPopular: true,
  },
  {
    id: "business-suite",
    name: "Business Suite",
    path: "/business-suite",
    icon: Briefcase,
    description: "Business management and analytics",
    category: "Commerce",
    shortcut: "Alt+B",
    isNew: true,
  },

  // Gaming & Rewards
  {
    id: "gamification",
    name: "Gamification Hub",
    path: "/dashboard/gamification",
    icon: Gamepad2,
    description: "Rewards and achievements",
    category: "Honors and Rewards",
    shortcut: "Alt+4",
  },

  // Research & Development
  {
    id: "beta-lab",
    name: "Beta Features Lab",
    path: "/beta-lab",
    icon: Beaker,
    description: "Cutting-edge experimental features",
    category: "Research & Development",
    shortcut: "Alt+E",
    isNew: true,
  },
  {
    id: "suggestions-hub",
    name: "Suggestions Hub",
    path: "/suggestions-hub",
    icon: Brain,
    description: "All AI suggestions unlocked",
    category: "Research & Development",
    shortcut: "Alt+S",
    isNew: true,
  },
  {
    id: "clone-download",
    name: "Platform Clone",
    path: "/clone-download",
    icon: GitBranch,
    description: "Download complete platform clone",
    category: "Research & Development",
    shortcut: "Alt+G",
    isNew: true,
  },

  // Downloads
  {
    id: "download",
    name: "App Downloads",
    path: "/download",
    icon: Download,
    description: "Download SnappAiFi apps for all devices",
    category: "Downloads",
    shortcut: "Alt+D",
    isPopular: true,
  },

  // Legal Framework
  {
    id: "legal",
    name: "Legal Center",
    path: "/legal",
    icon: Gavel,
    description: "Legal documents and compliance",
    category: "Legal Framework",
    shortcut: "Alt+5",
  },
  {
    id: "compliance",
    name: "Compliance Portal",
    path: "/legal/compliance",
    icon: Shield,
    description: "Regulatory compliance",
    category: "Legal Framework",
    shortcut: "Alt+6",
  },
  {
    id: "digital-domicile",
    name: "Digital Domicile",
    path: "/legal/digital-domicile",
    icon: Globe,
    description: "Digital jurisdiction declaration",
    category: "Legal Framework",
    shortcut: "Alt+7",
  },
  {
    id: "diplomatic-immunity",
    name: "Diplomatic Immunity",
    path: "/legal/diplomatic-immunity",
    icon: UserCheck,
    description: "Agent diplomatic status",
    category: "Legal Framework",
    shortcut: "Alt+8",
  },
  {
    id: "privacy-policy",
    name: "Privacy Policy",
    path: "/legal/privacy-policy",
    icon: FileText,
    description: "Privacy policy and data protection",
    category: "Legal Framework",
  },
  {
    id: "terms-of-service",
    name: "Terms of Service",
    path: "/legal/terms-of-service",
    icon: FileText,
    description: "Platform terms and conditions",
    category: "Legal Framework",
  },
  {
    id: "user-agreement",
    name: "User Agreement",
    path: "/legal/user-agreement",
    icon: FileText,
    description: "User agreement and responsibilities",
    category: "Legal Framework",
  },
  {
    id: "risk-disclosure",
    name: "Risk Disclosure",
    path: "/legal/risk-disclosure",
    icon: FileText,
    description: "Financial risk disclosures",
    category: "Legal Framework",
  },
  {
    id: "realm-immunity",
    name: "Realm Immunity",
    path: "/legal/realm-immunity",
    icon: Shield,
    description: "SNAPPCREDITCOM realm immunity clause",
    category: "Legal Framework",
  },
  {
    id: "admiralty-jurisdiction",
    name: "Admiralty Jurisdiction",
    path: "/legal/admiralty-jurisdiction",
    icon: Scale,
    description: "Digital admiralty realm jurisdiction",
    category: "Legal Framework",
  },
  {
    id: "intellectual-property",
    name: "Intellectual Property",
    path: "/legal/intellectual-property",
    icon: FileText,
    description: "Copyright and intellectual property",
    category: "Legal Framework",
  },

  // Administration
  {
    id: "admin-dashboard",
    name: "Admin Dashboard",
    path: "/admin/dashboard",
    icon: Server,
    description: "System administration",
    category: "Administration",
    shortcut: "Alt+9",
  },
  {
    id: "user-management",
    name: "User Management",
    path: "/admin/users",
    icon: Users,
    description: "Manage platform users",
    category: "Administration",
    shortcut: "Alt+0",
  },
  {
    id: "system-monitoring",
    name: "System Monitoring",
    path: "/admin/system",
    icon: Monitor,
    description: "Infrastructure monitoring",
    category: "Administration",
    shortcut: "Alt+M",
  },
]

const categories = [
  { id: "all", name: "All Environments", icon: Grid3X3 },
  { id: "Main Platform", name: "Main Platform", icon: BarChart3 },
  { id: "Commerce", name: "Commerce", icon: ShoppingBag },
  { id: "Honors and Rewards", name: "Honors and Rewards", icon: Gamepad2 },
  { id: "Research & Development", name: "Research & Development", icon: Beaker },
  { id: "Downloads", name: "Downloads", icon: Download },
  { id: "Legal Framework", name: "Legal Framework", icon: Gavel },
  { id: "Administration", name: "Administration", icon: Server },
]

interface EnvironmentSidebarProps {
  className?: string
}

export function EnvironmentSidebar({ className }: EnvironmentSidebarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("list")

  const pathname = usePathname()
  const router = useRouter()

  const { getRecentEnvironments } = useEnvironmentHistory()
  const { getUnreadCount } = useEnvironmentNotifications()
  const { bookmarks } = useEnvironmentBookmarks()

  // Filter environments based on search and category
  const filteredEnvironments = React.useMemo(() => {
    let filtered = environments

    if (selectedCategory !== "all") {
      filtered = filtered.filter((env) => env.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (env) =>
          env.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          env.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          env.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return filtered
  }, [searchQuery, selectedCategory])

  const recentEnvironments = getRecentEnvironments(5)
  const bookmarkedEnvironments = bookmarks.slice(0, 5)

  const handleEnvironmentClick = (path: string) => {
    router.push(path)
  }

  const isCurrentEnvironment = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/")
  }

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-background/95 backdrop-blur-sm border-r border-white/20 transition-all duration-300",
        isCollapsed ? "w-16" : "w-80",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <span className="font-semibold">Environments</span>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8 p-0">
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {!isCollapsed && (
        <>
          {/* Search */}
          <div className="p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search environments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background/50 border-white/20"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-7 w-7 p-0"
                >
                  <List className="h-3 w-3" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-7 w-7 p-0"
                >
                  <Grid3X3 className="h-3 w-3" />
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                <Filter className="h-3 w-3 mr-1" />
                Filter
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {/* Quick Access */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">Quick Access</h3>
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-9"
                    onClick={() => handleEnvironmentClick("/")}
                  >
                    <Home className="h-4 w-4 mr-3" />
                    Home
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-9"
                    onClick={() => handleEnvironmentClick("/live")}
                  >
                    <Activity className="h-4 w-4 mr-3" />
                    <span className="flex items-center gap-2">
                      Live Platform
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    </span>
                  </Button>
                </div>
              </div>

              {/* Recent Environments */}
              {recentEnvironments.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Recent
                  </h3>
                  <div className="space-y-1">
                    {recentEnvironments.map((env) => {
                      const environment = environments.find((e) => e.path === env.path)
                      if (!environment) return null

                      return (
                        <Button
                          key={env.path}
                          variant={isCurrentEnvironment(env.path) ? "secondary" : "ghost"}
                          className="w-full justify-start h-9"
                          onClick={() => handleEnvironmentClick(env.path)}
                        >
                          <environment.icon className="h-4 w-4 mr-3" />
                          <span className="truncate">{environment.name}</span>
                        </Button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Bookmarked Environments */}
              {bookmarkedEnvironments.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Bookmarks
                  </h3>
                  <div className="space-y-1">
                    {bookmarkedEnvironments.map((bookmark) => {
                      const environment = environments.find((e) => e.path === bookmark.path)
                      if (!environment) return null

                      return (
                        <Button
                          key={bookmark.path}
                          variant={isCurrentEnvironment(bookmark.path) ? "secondary" : "ghost"}
                          className="w-full justify-start h-9"
                          onClick={() => handleEnvironmentClick(bookmark.path)}
                        >
                          <environment.icon className="h-4 w-4 mr-3" />
                          <span className="truncate">{bookmark.name}</span>
                          {bookmark.customShortcut && (
                            <kbd className="ml-auto text-xs bg-muted px-1 rounded">{bookmark.customShortcut}</kbd>
                          )}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              )}

              <Separator />

              {/* Category Filter */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">Categories</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "secondary" : "ghost"}
                      className="w-full justify-start h-8 text-sm"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <category.icon className="h-3 w-3 mr-2" />
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* All Environments */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {selectedCategory === "all"
                    ? "All Environments"
                    : categories.find((c) => c.id === selectedCategory)?.name}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {filteredEnvironments.length}
                  </Badge>
                </h3>

                <div className={cn(viewMode === "grid" ? "grid grid-cols-2 gap-2" : "space-y-1")}>
                  {filteredEnvironments.map((environment) => {
                    const unreadCount = getUnreadCount(environment.path)
                    const isActive = isCurrentEnvironment(environment.path)

                    if (viewMode === "grid") {
                      return (
                        <Button
                          key={environment.id}
                          variant={isActive ? "secondary" : "ghost"}
                          className="h-16 p-2 flex flex-col items-center gap-1 relative"
                          onClick={() => handleEnvironmentClick(environment.path)}
                        >
                          <environment.icon className="h-4 w-4" />
                          <span className="text-xs text-center leading-tight">{environment.name}</span>
                          {environment.isNew && (
                            <Badge variant="secondary" className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">
                              N
                            </Badge>
                          )}
                          {unreadCount > 0 && (
                            <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">
                              {unreadCount}
                            </Badge>
                          )}
                        </Button>
                      )
                    }

                    return (
                      <Button
                        key={environment.id}
                        variant={isActive ? "secondary" : "ghost"}
                        className="w-full justify-start h-10 relative"
                        onClick={() => handleEnvironmentClick(environment.path)}
                      >
                        <environment.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                        <div className="flex-1 text-left min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="truncate">{environment.name}</span>
                            {environment.id === "live-version" && (
                              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            )}
                            {environment.isNew && (
                              <Badge variant="secondary" className="text-xs h-4">
                                New
                              </Badge>
                            )}
                            {environment.isPopular && (
                              <Badge variant="outline" className="text-xs h-4">
                                Popular
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          {environment.shortcut && (
                            <kbd className="text-xs bg-muted px-1 rounded">{environment.shortcut}</kbd>
                          )}
                          {unreadCount > 0 && (
                            <Badge variant="destructive" className="h-4 w-4 p-0 text-xs">
                              {unreadCount}
                            </Badge>
                          )}
                        </div>
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>
          </ScrollArea>
        </>
      )}

      {/* Collapsed View */}
      {isCollapsed && (
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {/* Quick Access Icons */}
            <Button variant="ghost" size="sm" className="w-full h-10 p-0" onClick={() => handleEnvironmentClick("/")}>
              <Home className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="w-full h-10 p-0 relative"
              onClick={() => handleEnvironmentClick("/live")}
            >
              <Activity className="h-4 w-4" />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </Button>

            <Separator />

            {/* Environment Icons */}
            {environments.slice(0, 8).map((environment) => {
              const isActive = isCurrentEnvironment(environment.path)
              const unreadCount = getUnreadCount(environment.path)

              return (
                <Button
                  key={environment.id}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full h-10 p-0 relative"
                  onClick={() => handleEnvironmentClick(environment.path)}
                  title={environment.name}
                >
                  <environment.icon className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              )
            })}
          </div>
        </ScrollArea>
      )}

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <Button variant="ghost" size="sm" className={cn("w-full", isCollapsed ? "h-10 p-0" : "justify-start h-9")}>
          <Settings className="h-4 w-4" />
          {!isCollapsed && <span className="ml-3">Settings</span>}
        </Button>
      </div>
    </div>
  )
}
