import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PremiumUnlockProvider } from "@/contexts/premium-unlock-context"
import { GlobalUnlockProvider } from "@/contexts/global-unlock-context"
import { DiplomaticAgentProvider } from "@/contexts/diplomatic-agent-context"
import { GamificationProvider } from "@/contexts/gamification-context"
import { ProductComparisonProvider } from "@/contexts/product-comparison-context"
import { PropertyComparisonProvider } from "@/contexts/property-comparison-context"
import { CreditProvider } from "@/contexts/credit-context"
import { DemoProvider } from "@/contexts/demo-context"
import { EnvironmentSidebar } from "@/components/ui/environment-sidebar"
import { CursorOrb } from "@/components/ui/cursor-orb"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Snapifi Financial Platform",
  description: "Next-generation financial platform with AI-powered tools and holographic interfaces",
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
          <PremiumUnlockProvider>
            <GlobalUnlockProvider>
              <DiplomaticAgentProvider>
                <GamificationProvider>
                  <ProductComparisonProvider>
                    <PropertyComparisonProvider>
                      <CreditProvider>
                        <DemoProvider>
                          <div className="relative min-h-screen">
                            <EnvironmentSidebar />
                            <CursorOrb enabled={true} />
                            <main className="transition-all duration-300">{children}</main>
                          </div>
                        </DemoProvider>
                      </CreditProvider>
                    </PropertyComparisonProvider>
                  </ProductComparisonProvider>
                </GamificationProvider>
              </DiplomaticAgentProvider>
            </GlobalUnlockProvider>
          </PremiumUnlockProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
