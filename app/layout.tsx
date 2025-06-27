import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { EnvironmentSidebar } from "@/components/ui/environment-sidebar"
import { PremiumUnlockProvider } from "@/contexts/premium-unlock-context"
import { GlobalUnlockProvider } from "@/contexts/global-unlock-context"
import { DemoContextProvider } from "@/contexts/demo-context"
import { GamificationProvider } from "@/contexts/gamification-context"
import { ProductComparisonProvider } from "@/contexts/product-comparison-context"
import { PropertyComparisonProvider } from "@/contexts/property-comparison-context"
import { CreditProvider } from "@/contexts/credit-context"
import { DiplomaticAgentProvider } from "@/contexts/diplomatic-agent-context"
import { CursorOrb } from "@/components/ui/cursor-orb"
import { PortalProvider } from "@/contexts/portal-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Snapifi Financial Platform",
  description: "Advanced financial platform with AI-powered tools",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <PortalProvider>
            <PremiumUnlockProvider>
              <GlobalUnlockProvider>
                <DemoContextProvider>
                  <GamificationProvider>
                    <ProductComparisonProvider>
                      <PropertyComparisonProvider>
                        <CreditProvider>
                          <DiplomaticAgentProvider>
                            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                              <EnvironmentSidebar />
                              <main className="pl-20">{children}</main>
                              <CursorOrb />
                            </div>
                          </DiplomaticAgentProvider>
                        </CreditProvider>
                      </PropertyComparisonProvider>
                    </ProductComparisonProvider>
                  </GamificationProvider>
                </DemoContextProvider>
              </GlobalUnlockProvider>
            </PremiumUnlockProvider>
          </PortalProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
