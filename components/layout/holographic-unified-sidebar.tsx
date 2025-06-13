import {
  Home,
  CreditCard,
  ShoppingCart,
  Brain,
  LineChart,
  Wallet,
  Sparkles,
  Settings,
  HelpCircle,
  User,
  Shield,
  LayoutDashboard,
  Users,
} from "lucide-react"

import type { MainNavItem, SidebarNavItem } from "@/types"

interface DashboardConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
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
      title: "Admin",
      items: [
        {
          title: "Users",
          href: "/dashboard/admin/users",
          icon: Users,
        },
        {
          title: "Settings",
          href: "/dashboard/admin/settings",
          icon: Settings,
        },
      ],
    },
    {
      title: "DAX Admin",
      items: [
        {
          title: "Files",
          href: "/dashboard/dax-admin/files",
          icon: Shield,
        },
        {
          title: "Quantum Verification",
          href: "/dashboard/dax-admin/quantum-verification",
          icon: Shield,
          badge: "Quantum",
        },
      ],
    },
  ],
}

export const navigationStructure = [
  {
    id: "home",
    label: "Home",
    icon: <Home className="h-5 w-5" />,
    href: "/dashboard",
  },
  {
    id: "billing",
    label: "Billing",
    icon: <CreditCard className="h-5 w-5" />,
    href: "/dashboard/billing",
  },
  {
    id: "store",
    label: "Store",
    icon: <ShoppingCart className="h-5 w-5" />,
    href: "/dashboard/store",
  },
  {
    id: "ai-concierge",
    label: "AI Concierge",
    icon: <Brain className="h-5 w-5" />,
    href: "/dashboard/ai-concierge",
  },
  {
    id: "dax-admin",
    label: "DAX Admin",
    icon: <Shield className="h-5 w-5" />,
    subcategories: [
      {
        id: "dax-admin-identity",
        label: "Identity Management",
        href: "/dashboard/dax-admin/identity-management",
      },
      {
        id: "dax-admin-tax-benefits",
        label: "Tax Benefits",
        href: "/dashboard/dax-admin/tax-benefits",
      },
      {
        id: "dax-admin-international",
        label: "International Business",
        href: "/dashboard/dax-admin/international-business",
      },
      {
        id: "dax-admin-quantum-verification",
        label: "Quantum Verification",
        href: "/dashboard/dax-admin/quantum-verification",
      },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <LineChart className="h-5 w-5" />,
    href: "/dashboard/analytics",
  },
  {
    id: "wallet",
    label: "Wallet",
    icon: <Wallet className="h-5 w-5" />,
    href: "/dashboard/wallet",
  },
  {
    id: "rewards",
    label: "Rewards",
    icon: <Sparkles className="h-5 w-5" />,
    href: "/dashboard/rewards",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
    href: "/dashboard/settings",
  },
  {
    id: "help",
    label: "Help & Support",
    icon: <HelpCircle className="h-5 w-5" />,
    href: "/dashboard/help",
  },
  {
    id: "profile",
    label: "Profile",
    icon: <User className="h-5 w-5" />,
    href: "/dashboard/profile",
  },
]
