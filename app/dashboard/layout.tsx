import type React from "react"
import { HolographicUnifiedSidebar } from "@/components/layout/holographic-unified-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <HolographicUnifiedSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
