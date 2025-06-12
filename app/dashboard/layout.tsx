import type React from "react"
import { ImperialUnifiedSidebar } from "@/components/layout/imperial-unified-sidebar"
import { AIWellnessCompanion } from "@/components/wellness/ai-wellness-companion"
import { ImperialDesignSystem } from "@/lib/imperial-design-system"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{
        background: `
          ${ImperialDesignSystem.patterns.imperial},
          linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(15, 23, 42, 0.95) 50%, rgba(0, 0, 0, 0.95) 100%)
        `,
        fontFamily: ImperialDesignSystem.typography.imperial.body,
      }}
    >
      <ImperialUnifiedSidebar />
      <div
        className="flex-1 overflow-auto"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(251, 191, 36, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)
          `,
        }}
      >
        {children}
      </div>
      <AIWellnessCompanion />
    </div>
  )
}
