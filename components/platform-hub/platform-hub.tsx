"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Home,
  BarChart3,
  Building2,
  ShoppingBag,
  Gamepad2,
  Gavel,
  Shield,
  Globe,
  Users,
  Server,
  FileText,
  UserCheck,
  Monitor,
  TrendingUp,
  Target,
  Award,
  Zap,
  Star,
  ArrowRight,
  Activity,
  DollarSign,
  PieChart,
  Briefcase,
  MapPin,
  Gift,
  Search,
  Grid3X3,
  List,
  Clock,
  Bookmark,
  Package,
  Calculator,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEnvironmentHistory } from "@/hooks/use-environment-history"
import { useEnvironmentBookmarks } from "@/hooks/use-environment-bookmarks"

interface Environment {
  id: string
  name: string
  description: string
  path: string
  icon: React.ElementType
  category: string
  isNew?: boolean
  isPopular?: boolean
  isPremium?: boolean
  badge?: string
  color: string
  subEnvironments?: SubEnvironment[]
}

interface SubEnvironment {
  id: string
  name: string
  description: string
  path: string
  icon: React.ElementType
  isNew?: boolean
  badge?: string
}

const environments: Environment[] = [
  // Main Platform
  {
    id: "dashboard-home",
    name: "Dashboard Home",
    description: "Your personal financial command center with AI insights and comprehensive overview",
    path: "/dashboard/home",
    icon: Home,
    category: "Main Platform",
    isPopular: true,
    color: "from-blue-500/20 to-cyan-500/20",
    subEnvironments: [
      {
        id: "financial-overview",
        name: "Financial Overview",
        description: "Complete financial health dashboard",
        path: "/dashboard/home#overview",
        icon: PieChart,
      },
      {
        id: "goal-tracker",
        name: "Goal Tracker",
        description: "Track and manage financial goals",
        path: "/dashboard/home#goals",
        icon: Target,
      },
      {
        id: "ai-insights",
        name: "AI Insights",
        description: "Personalized financial recommendations",
        path: "/dashboard/home#insights",
        icon: Zap,
        isNew: true,
      },
    ],
  },
  {
    id: "snap-dax",
    name: "SNAP-DAX Trading",
    description: "Advanced financial trading platform with real-time analytics and portfolio management",
    path: "/dashboard/snap-dax",
    icon: Building2,
    category: "Main Platform",
    isPopular: true,
    color: "from-green-500/20 to-emerald-500/20",
    subEnvironments: [
      {
        id: "portfolio",
        name: "Portfolio Management",
        description: "Manage and optimize your investment portfolio",
        path: "/dashboard/portfolio",
        icon: Briefcase,
      },
      {
        id: "trading-desk",
        name: "Trading Desk",
        description: "Execute trades with advanced tools",
        path: "/dashboard/snap-dax#trading",
        icon: TrendingUp,
      },
      {
        id: "market-analysis",
        name: "Market Analysis",
        description: "Real-time market data and insights",
        path: "/dashboard/snap-dax#analysis",
        icon: Activity,
      },
    ],
  },
  {
    id: "analytics-reports",
    name: "Analytics & Reports",
    description: "Comprehensive insights into your financial performance and platform analytics",
    path: "/dashboard/analytics",
    icon: BarChart3,
    category: "Main Platform",
    color: "from-indigo-500/20 to-blue-500/20",
    subEnvironments: [
      {
        id: "performance-metrics",
        name: "Performance Metrics",
        description: "Track key performance indicators",
        path: "/dashboard/analytics#performance",
        icon: TrendingUp,
      },
      {
        id: "financial-reports",
        name: "Financial Reports",
        description: "Detailed financial reporting",
        path: "/dashboard/analytics#reports",
        icon: FileText,
      },
    ],
  },
  {
    id: "portfolio-management",
    name: "Portfolio Management",
    description: "Advanced portfolio tracking and optimization with AI-powered insights",
    path: "/dashboard/portfolio",
    icon: Briefcase,
    category: "Main Platform",
    color: "from-teal-500/20 to-green-500/20",
    subEnvironments: [
      {
        id: "holdings",
        name: "Current Holdings",
        description: "View and manage your investments",
        path: "/dashboard/portfolio#holdings",
        icon: Package,
      },
      {
        id: "performance",
        name: "Performance Analysis",
        description: "Analyze portfolio performance",
        path: "/dashboard/portfolio#performance",
        icon: TrendingUp,
      },
    ],
  },
  {
    id: "financial-planning",
    name: "Financial Planning",
    description: "Comprehensive financial planning tools with goal tracking and budget management",
    path: "/dashboard/financial-planning",
    icon: Target,
    category: "Main Platform",
    isNew: true,
    color: "from-violet-500/20 to-purple-500/20",
    subEnvironments: [
      {
        id: "goals",
        name: "Financial Goals",
        description: "Set and track financial objectives",
        path: "/dashboard/financial-planning#goals",
        icon: Target,
      },
      {
        id: "budget",
        name: "Budget Tracker",
        description: "Monitor spending and budgets",
        path: "/dashboard/financial-planning#budget",
        icon: DollarSign,
      },
      {
        id: "planning-tools",
        name: "Planning Tools",
        description: "Financial calculators and tools",
        path: "/dashboard/financial-planning#tools",
        icon: Calculator,
      },
    ],
  },

  // Commerce
  {
    id: "ecommerex",
    name: "EcommereX Marketplace",
    description: "Revolutionary holographic product marketplace with 360° product views and AR preview",
    path: "/dashboard/ecommerex/holographic-products",
    icon: ShoppingBag,
    category: "Commerce",
    isNew: true,
    isPremium: true,
    color: "from-purple-500/20 to-pink-500/20",
    subEnvironments: [
      {
        id: "holographic-products",
        name: "Holographic Products",
        description: "Browse products with holographic displays",
        path: "/dashboard/ecommerex/holographic-products",
        icon: Star,
        isNew: true,
      },
      {
        id: "rewards-center",
        name: "Rewards Center",
        description: "Manage and redeem your rewards points",
        path: "/dashboard/ecommerex/rewards",
        icon: Gift,
      },
      {
        id: "exclusive-deals",
        name: "Exclusive Deals",
        description: "Platform citizen exclusive offers",
        path: "/dashboard/ecommerex/deals",
        icon: Award,
        badge: "VIP",
      },
    ],
  },
  {
    id: "marketplace-analytics",
    name: "Marketplace Analytics",
    description: "Comprehensive marketplace insights, vendor management, and sales analytics",
    path: "/commerce/marketplace",
    icon: BarChart3,
    category: "Commerce",
    color: "from-emerald-500/20 to-teal-500/20",
    subEnvironments: [
      {
        id: "vendor-management",
        name: "Vendor Management",
        description: "Manage marketplace vendors",
        path: "/commerce/marketplace#vendors",
        icon: Users,
      },
      {
        id: "order-management",
        name: "Order Management",
        description: "Track and manage orders",
        path: "/commerce/marketplace#orders",
        icon: Package,
      },
      {
        id: "sales-analytics",
        name: "Sales Analytics",
        description: "Analyze sales performance",
        path: "/commerce/marketplace#analytics",
        icon: TrendingUp,
      },
    ],
  },
  {
    id: "real-estate",
    name: "Real Estate Hub",
    description: "Revolutionary 50-year loan marketplace with holographic property tours and AI matching",
    path: "/real-estate",
    icon: MapPin,
    category: "Commerce",
    isPopular: true,
    isPremium: true,
    badge: "50-Year Loans",
    color: "from-orange-500/20 to-red-500/20",
    subEnvironments: [
      {
        id: "property-search",
        name: "Property Search",
        description: "Find your dream home with AI matching",
        path: "/real-estate#search",
        icon: Search,
      },
      {
        id: "loan-calculator",
        name: "50-Year Loan Calculator",
        description: "Calculate revolutionary loan terms",
        path: "/real-estate#calculator",
        icon: DollarSign,
        isNew: true,
      },
      {
        id: "virtual-tours",
        name: "Virtual Tours",
        description: "Holographic property experiences",
        path: "/real-estate#tours",
        icon: Globe,
      },
    ],
  },

  // Gaming & Rewards (now Honors and Rewards)
  {
    id: "gamification",
    name: "Gamification Hub",
    description: "Earn rewards, unlock achievements, and compete on leaderboards while managing finances",
    path: "/dashboard/gamification",
    icon: Gamepad2,
    category: "Honors and Rewards",
    color: "from-yellow-500/20 to-orange-500/20",
    subEnvironments: [
      {
        id: "achievements",
        name: "Achievements",
        description: "Unlock financial milestones and badges",
        path: "/dashboard/gamification#achievements",
        icon: Award,
      },
      {
        id: "leaderboards",
        name: "Leaderboards",
        description: "Compete with other platform citizens",
        path: "/dashboard/gamification#leaderboards",
        icon: TrendingUp,
      },
      {
        id: "challenges",
        name: "Financial Challenges",
        description: "Complete challenges to earn rewards",
        path: "/dashboard/gamification#challenges",
        icon: Target,
      },
    ],
  },

  // Legal Framework
  {
    id: "legal-center",
    name: "Legal Center",
    description: "Comprehensive legal framework with digital domicile, diplomatic immunity, and compliance",
    path: "/legal",
    icon: Gavel,
    category: "Legal Framework",
    color: "from-indigo-500/20 to-purple-500/20",
    subEnvironments: [
      {
        id: "digital-domicile",
        name: "Digital Domicile",
        description: "Establish your digital jurisdiction",
        path: "/legal/digital-domicile",
        icon: Globe,
      },
      {
        id: "diplomatic-immunity",
        name: "Diplomatic Immunity",
        description: "Agent diplomatic status and protections",
        path: "/legal/diplomatic-immunity",
        icon: UserCheck,
      },
      {
        id: "compliance-portal",
        name: "Compliance Portal",
        description: "Regulatory compliance and monitoring",
        path: "/legal/compliance",
        icon: Shield,
      },
    ],
  },
  {
    id: "legal-documents",
    name: "Legal Documents",
    description: "Access all platform legal documents, policies, and agreements in one place",
    path: "/legal/privacy-policy",
    icon: FileText,
    category: "Legal Framework",
    color: "from-gray-500/20 to-slate-500/20",
    subEnvironments: [
      {
        id: "privacy-policy",
        name: "Privacy Policy",
        description: "Data protection and privacy rights",
        path: "/legal/privacy-policy",
        icon: Shield,
      },
      {
        id: "terms-service",
        name: "Terms of Service",
        description: "Platform terms and conditions",
        path: "/legal/terms-of-service",
        icon: FileText,
      },
      {
        id: "user-agreement",
        name: "User Agreement",
        description: "User responsibilities and rights",
        path: "/legal/user-agreement",
        icon: Users,
      },
    ],
  },

  // Administration
  {
    id: "admin-dashboard",
    name: "Admin Dashboard",
    description: "System administration, user management, and platform monitoring tools",
    path: "/admin/dashboard",
    icon: Server,
    category: "Administration",
    color: "from-red-500/20 to-pink-500/20",
    subEnvironments: [
      {
        id: "user-management",
        name: "User Management",
        description: "Manage platform users and permissions",
        path: "/admin/users",
        icon: Users,
      },
      {
        id: "system-monitoring",
        name: "System Monitoring",
        description: "Infrastructure health and performance",
        path: "/admin/system",
        icon: Monitor,
      },
      {
        id: "analytics",
        name: "Platform Analytics",
        description: "Usage statistics and insights",
        path: "/admin/analytics",
        icon: BarChart3,
      },
    ],
  },
]

const categories = [
  { id: "all", name: "All Environments", icon: Grid3X3 },
  { id: "Main Platform", name: "Main Platform", icon: BarChart3 },
  { id: "Commerce", name: "Commerce", icon: ShoppingBag },
  { id: "Honors and Rewards", name: "Honors and Rewards", icon: Gamepad2 },
  { id: "Legal Framework", name: "Legal Framework", icon: Gavel },
  { id: "Administration", name: "Administration", icon: Server },
]

export function PlatformHub() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [showSubEnvironments, setShowSubEnvironments] = React.useState<string | null>(null)

  const router = useRouter()
  const { getRecentEnvironments } = useEnvironmentHistory()
  const { bookmarks } = useEnvironmentBookmarks()

  // Filter environments
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

  const recentEnvironments = getRecentEnvironments(6)
  const bookmarkedEnvironments = bookmarks.slice(0, 6)

  const handleEnvironmentClick = (path: string) => {
    router.push(path)
  }

  const handleSubEnvironmentClick = (path: string) => {
    router.push(path)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative container mx-auto px-6 py-16">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-6">
              Welcome to Snapifi
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Your comprehensive financial platform with revolutionary 50-year loans, holographic commerce, AI-powered
              insights, and complete digital sovereignty.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => handleEnvironmentClick("/dashboard/home")} className="group">
                <Home className="h-5 w-5 mr-2" />
                Go to Dashboard
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleEnvironmentClick("/real-estate")}
                className="group"
              >
                <MapPin className="h-5 w-5 mr-2" />
                Explore 50-Year Loans
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search environments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background/50 border-white/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 bg-background/50 backdrop-blur-sm">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                  <category.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Quick Access Sections */}
        {(recentEnvironments.length > 0 || bookmarkedEnvironments.length > 0) && (
          <div className="mb-12 space-y-8">
            {/* Recent Environments */}
            {recentEnvironments.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recently Visited
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentEnvironments.map((env) => {
                    const environment = environments.find((e) => e.path === env.path)
                    if (!environment) return null

                    return (
                      <Card
                        key={env.path}
                        className="group cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20 hover:border-white/40"
                        onClick={() => handleEnvironmentClick(env.path)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={cn("p-2 rounded-lg bg-gradient-to-br", environment.color)}>
                              <environment.icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium truncate">{environment.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {new Date(env.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Bookmarked Environments */}
            {bookmarkedEnvironments.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Bookmark className="h-5 w-5" />
                  Bookmarked
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bookmarkedEnvironments.map((bookmark) => {
                    const environment = environments.find((e) => e.path === bookmark.path)
                    if (!environment) return null

                    return (
                      <Card
                        key={bookmark.path}
                        className="group cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20 hover:border-white/40"
                        onClick={() => handleEnvironmentClick(bookmark.path)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={cn("p-2 rounded-lg bg-gradient-to-br", environment.color)}>
                              <environment.icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium truncate">{bookmark.name}</h3>
                              {bookmark.customShortcut && (
                                <kbd className="text-xs bg-muted px-1 rounded">{bookmark.customShortcut}</kbd>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Main Environments Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">
              {selectedCategory === "all"
                ? "All Platform Environments"
                : categories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <Badge variant="secondary" className="text-sm">
              {filteredEnvironments.length} environments
            </Badge>
          </div>

          <div
            className={cn(viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4")}
          >
            {filteredEnvironments.map((environment) => (
              <Card
                key={environment.id}
                className={cn(
                  "group cursor-pointer hover:shadow-xl transition-all duration-500 bg-gradient-to-br backdrop-blur-sm border-white/20 hover:border-white/40 overflow-hidden",
                  environment.color,
                  viewMode === "list" ? "flex" : "",
                )}
                onClick={() => handleEnvironmentClick(environment.path)}
              >
                <CardHeader className={cn("relative", viewMode === "list" ? "flex-shrink-0 w-48" : "")}>
                  <div className="flex items-start justify-between">
                    <div className={cn("p-3 rounded-xl bg-gradient-to-br", environment.color, "ring-1 ring-white/20")}>
                      <environment.icon className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col gap-1">
                      {environment.isNew && (
                        <Badge variant="secondary" className="text-xs">
                          New
                        </Badge>
                      )}
                      {environment.isPopular && (
                        <Badge variant="outline" className="text-xs">
                          Popular
                        </Badge>
                      )}
                      {environment.isPremium && (
                        <Badge className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500">Premium</Badge>
                      )}
                      {environment.badge && (
                        <Badge variant="destructive" className="text-xs">
                          {environment.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{environment.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{environment.description}</CardDescription>
                </CardHeader>

                <CardContent className={cn("space-y-4", viewMode === "list" ? "flex-1" : "")}>
                  {/* Sub-environments */}
                  {environment.subEnvironments && environment.subEnvironments.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-muted-foreground">Quick Access</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowSubEnvironments(showSubEnvironments === environment.id ? null : environment.id)
                          }}
                          className="h-6 w-6 p-0"
                        >
                          <ArrowRight
                            className={cn(
                              "h-3 w-3 transition-transform",
                              showSubEnvironments === environment.id ? "rotate-90" : "",
                            )}
                          />
                        </Button>
                      </div>

                      <div
                        className={cn(
                          "space-y-1 overflow-hidden transition-all duration-300",
                          showSubEnvironments === environment.id ? "max-h-96 opacity-100" : "max-h-16 opacity-70",
                        )}
                      >
                        {environment.subEnvironments
                          .slice(0, showSubEnvironments === environment.id ? undefined : 2)
                          .map((subEnv) => (
                            <Button
                              key={subEnv.id}
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start h-8 text-xs hover:bg-white/10"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleSubEnvironmentClick(subEnv.path)
                              }}
                            >
                              <subEnv.icon className="h-3 w-3 mr-2" />
                              <span className="truncate">{subEnv.name}</span>
                              {subEnv.isNew && (
                                <Badge variant="secondary" className="ml-auto text-xs h-4">
                                  New
                                </Badge>
                              )}
                              {subEnv.badge && (
                                <Badge variant="outline" className="ml-auto text-xs h-4">
                                  {subEnv.badge}
                                </Badge>
                              )}
                            </Button>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Button
                    className="w-full group-hover:bg-primary/90 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEnvironmentClick(environment.path)
                    }}
                  >
                    Enter Environment
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Platform Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-white/20">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-400">{environments.length}</div>
              <div className="text-sm text-muted-foreground">Total Environments</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-white/20">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-400">
                {environments.reduce((acc, env) => acc + (env.subEnvironments?.length || 0), 0)}
              </div>
              <div className="text-sm text-muted-foreground">Sub-Environments</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-white/20">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-400">{environments.filter((env) => env.isNew).length}</div>
              <div className="text-sm text-muted-foreground">New Features</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-orange-500/10 to-red-500/10 border-white/20">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-orange-400">
                {environments.filter((env) => env.isPremium).length}
              </div>
              <div className="text-sm text-muted-foreground">Premium Features</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
