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
      <div className="flex min-h-screen w-full">
        <SnapifiSidebar />
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </SidebarProvider>
  )
}
