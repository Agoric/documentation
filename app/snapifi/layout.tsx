import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SnapifiSidebar } from "@/components/snapifi/snapifi-sidebar"

export default function SnapifiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full royal-pattern">
        <SnapifiSidebar />
        <main className="flex-1 royal-entrance">
          <div className="royal-header p-4 border-b border-royal-200/50">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="royal-heading">Snapifi Royal Platform</h1>
                <p className="luxury-text">Premium Financial Services & Quantum Analytics</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="royal-badge">👑 Royal Member</div>
                <div className="h-10 w-10 rounded-full bg-royal-gradient flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
