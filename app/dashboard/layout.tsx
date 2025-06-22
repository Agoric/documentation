import type { ReactNode } from "react"
import { PlatformLayout } from "@/components/layout/platform-layout"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <PlatformLayout variant="dashboard" className="p-0">
      <div className="flex h-screen">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-auto bg-white/50 backdrop-blur-sm">
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
    </PlatformLayout>
  )
}
