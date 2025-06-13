import { LayoutDashboard, Settings, Users, File, Shield } from "lucide-react"

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
          icon: File,
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
