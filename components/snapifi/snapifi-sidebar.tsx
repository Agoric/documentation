"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import {
  Building,
  Bot,
  Brain,
  MapPin,
  Coins,
  Cpu,
  BookOpen,
  Car,
  Home,
  BarChart3,
  Users,
  Settings,
  CreditCard,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react"

const navigationItems = [
  {
    title: "Platform",
    items: [
      {
        title: "Dashboard",
        url: "/snapifi/dashboard",
        icon: Home,
        description: "Main platform overview",
      },
      {
        title: "AI Concierge",
        url: "/snapifi/ai-concierge",
        icon: Bot,
        description: "Genius AI assistant",
        badge: "AI",
      },
      {
        title: "Master Banker",
        url: "/snapifi/master-banker",
        icon: Brain,
        description: "Advanced financial advisor",
        badge: "Elite",
      },
    ],
  },
  {
    title: "Financial Services",
    items: [
      {
        title: "Inclusive Lending",
        url: "/snapifi/lending",
        icon: Building,
        description: "Asset-backed loans & 50-year terms",
      },
      {
        title: "Credit Acceleration",
        url: "/snapifi/credit-acceleration",
        icon: CreditCard,
        description: "Credit score improvement",
      },
      {
        title: "Banking Services",
        url: "/snapifi/banking",
        icon: Shield,
        description: "Neobank integration",
      },
    ],
  },
  {
    title: "Investment & Analytics",
    items: [
      {
        title: "RWA Tokenization",
        url: "/snapifi/rwa-tokens",
        icon: Coins,
        description: "Real-world asset tokens",
        badge: "NFT",
      },
      {
        title: "Geo-Analytics",
        url: "/snapifi/geo-analytics",
        icon: MapPin,
        description: "Location-based insights",
      },
      {
        title: "Portfolio Management",
        url: "/snapifi/portfolio",
        icon: BarChart3,
        description: "Investment tracking",
      },
      {
        title: "Market Analysis",
        url: "/snapifi/market-analysis",
        icon: TrendingUp,
        description: "Real-time market data",
      },
    ],
  },
  {
    title: "Technology",
    items: [
      {
        title: "Quantum Computing",
        url: "/snapifi/quantum",
        icon: Cpu,
        description: "Quantum-powered insights",
        badge: "Quantum",
      },
      {
        title: "Blockchain Registry",
        url: "/snapifi/blockchain",
        icon: Zap,
        description: "Legal & compliance",
      },
    ],
  },
  {
    title: "Education & Tools",
    items: [
      {
        title: "Financial Education",
        url: "/snapifi/education",
        icon: BookOpen,
        description: "Learning center",
      },
      {
        title: "Vehicle Tracking",
        url: "/snapifi/vehicle",
        icon: Car,
        description: "Transportation optimization",
      },
      {
        title: "Community",
        url: "/snapifi/community",
        icon: Users,
        description: "User community",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Settings",
        url: "/snapifi/settings",
        icon: Settings,
        description: "Platform preferences",
      },
    ],
  },
]

export function SnapifiSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Snapifi</h2>
            <p className="text-xs text-muted-foreground">Financial Platform</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navigationItems.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const IconComponent = item.icon
                  const isActive = pathname === item.url

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.url} className="flex items-center space-x-3">
                          <IconComponent className="h-4 w-4" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{item.title}</span>
                              {item.badge && (
                                <Badge variant="secondary" className="text-xs">
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
