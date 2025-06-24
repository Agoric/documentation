"use client"

import type React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: "LayoutDashboard",
  },
  {
    name: "User Management",
    href: "/admin/users",
    icon: "Users",
  },
  {
    name: "System Monitoring",
    href: "/admin/system",
    icon: "Server",
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: "BarChart3",
  },
  {
    name: "Security",
    href: "/admin/security",
    icon: "Shield",
  },
  {
    name: "Logs",
    href: "/admin/logs",
    icon: "FileText",
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: "Settings",
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar navigation={navigation} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
