import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { GamificationProvider } from "@/contexts/gamification-context"
import { ProductComparisonProvider } from "@/contexts/product-comparison-context"
import { EnvironmentDropdown } from "@/components/ui/environment-dropdown"

export const metadata: Metadata = {
  title: "Inclusive Lending and Credit Empirical Authority",
  description:
    "New World Wealth Navigation Assistant. Introducing the Benefits of Economic Global Citizenship, Welcome Home",
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
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <GamificationProvider>
            <ProductComparisonProvider>
              <div className="fixed top-4 right-4 z-50">
                <EnvironmentDropdown />
              </div>
              {children}
            </ProductComparisonProvider>
          </GamificationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
