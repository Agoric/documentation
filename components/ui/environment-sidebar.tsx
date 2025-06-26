import { LayoutDashboard, Settings, HelpCircle, Compass, Brain, Download } from "lucide-react"

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
      title: "Environments",
      items: [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
          description: "Your personal overview.",
        },
        {
          title: "Navigation",
          href: "/dashboard/navigation",
          icon: Compass,
          description: "Navigate the platform",
          badge: "new",
        },
        {
          title: "Settings",
          href: "/dashboard/settings",
          icon: Settings,
          description: "Manage your account settings.",
        },
        {
          title: "Help",
          href: "/dashboard/help",
          icon: HelpCircle,
          description: "Find answers to your questions.",
        },
      ],
    },
    {
      title: "Environments",
      items: [
        {
          id: "playground",
          name: "Playground",
          path: "/playground",
          icon: Brain,
          category: "Main Platform",
          description: "Experiment with AI models",
          shortcut: "Alt+P",
          status: "active",
        },
        {
          id: "suggestions-hub",
          name: "Suggestions Hub",
          path: "/suggestions-hub",
          icon: Brain,
          category: "Main Platform",
          description: "All AI suggestions unlocked",
          shortcut: "Alt+S",
          status: "unlocked",
          isNew: true,
        },
        {
          id: "download",
          name: "App Downloads",
          path: "/download",
          icon: Download,
          description: "Download SnappAiFi apps for all devices",
          category: "Main Platform",
          shortcut: "Alt+D",
          isPopular: true,
        },
      ],
    },
  ],
}
