import type React from "react"
import { HolographicUnifiedSidebar } from "@/components/layout/holographic-unified-sidebar"
import { AIWellnessCompanion } from "@/components/wellness/ai-wellness-companion"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <HolographicUnifiedSidebar />
      <div className="flex-1 overflow-auto">{children}</div>
      <AIWellnessCompanion />
    </div>
  )
}
