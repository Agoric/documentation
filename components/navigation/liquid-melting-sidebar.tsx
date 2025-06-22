import type React from "react"
import { LayoutDashboard, Settings, Users, HelpCircle, Building2, Zap, Briefcase } from "lucide-react"

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: React.ReactNode
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: SidebarNavItem[]
    }
)

export type SidebarNav = {
  title?: string
  items: SidebarNavItem[]
}

export const navigationSections: SidebarNav[] = [
  {
    title: "General",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Administration",
    items: [
      {
        title: "Users",
        href: "/dashboard/users",
        icon: Users,
      },
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
  {
    title: "Marketplaces",
    items: [
      {
        id: "real-estate-marketplace",
        label: "Real Estate",
        icon: Building2,
        href: "/dashboard/real-estate-marketplace",
        description: "Global property investment platform",
        badge: "Premium",
        color: "text-green-400",
      },
      {
        id: "qgi-marketplace",
        label: "QGI Platform",
        icon: Zap,
        href: "/dashboard/qgi-marketplace",
        description: "Quantum Global Investment marketplace",
        badge: "Quantum",
        color: "text-purple-400",
      },
    ],
  },
  {
    title: "Business Management",
    items: [
      {
        id: "business-suite",
        label: "Business Suite",
        icon: Briefcase,
        href: "/dashboard/business-suite",
        description: "Complete business management platform",
        badge: "Enterprise",
        color: "text-blue-400",
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        title: "Help",
        href: "/dashboard/help",
        icon: HelpCircle,
      },
    ],
  },
]
