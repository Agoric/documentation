import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { GamificationProvider } from "@/contexts/gamification-context"
import { ProductComparisonProvider } from "@/contexts/product-comparison-context"
import { FuturisticCommandCenter } from "@/components/navigation/futuristic-command-center"

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
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <GamificationProvider>
            <ProductComparisonProvider>
              {/* Global Floating Navigation Orb - appears on all pages */}
              <FuturisticCommandCenter />

              {/* Page Content */}
              {children}
            </ProductComparisonProvider>
          </GamificationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
