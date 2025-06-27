import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { GlobalUnlockProvider } from "@/contexts/global-unlock-context"
import { EnvironmentSidebar } from "@/components/ui/environment-sidebar"
import { GoalPrioritizingOrb } from "@/components/genius-guide-orb/goal-prioritizing-orb"
import { CursorOrb } from "@/components/ui/cursor-orb"
import { PremiumUnlockProvider } from "@/contexts/premium-unlock-context"

export const metadata: Metadata = {
  title: "SnappAiFi Financial Platform",
  description: "Revolutionary financial platform with 50-year loans and holographic experiences",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <PremiumUnlockProvider>
          <GlobalUnlockProvider>
            <div className="flex h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
              <EnvironmentSidebar />
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
            <GoalPrioritizingOrb />
            <CursorOrb variant="holographic" size="md" showTrail={true} showParticles={true} />
          </GlobalUnlockProvider>
        </PremiumUnlockProvider>
      </body>
    </html>
  )
}
