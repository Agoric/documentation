import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ImperiumLayout } from "@/components/layout/imperium-layout"
import { ThemeProvider } from "@/components/theme-provider"
import { GamificationProvider } from "@/contexts/gamification-context"
import { ProductComparisonProvider } from "@/contexts/product-comparison-context"

export const metadata: Metadata = {
  title: "IMPERIUM SNAPIFI - Supreme Digital Authority",
  description:
    "SUPREMA AUCTORITAS DIGITALIS - Navigate the future with imperial sovereignty. Global citizenship, quantum commerce, and neural intelligence.",
  generator: "Imperium Snapifi v2.0",
  keywords: ["imperium", "digital sovereignty", "quantum commerce", "neural intelligence", "global citizenship"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <GamificationProvider>
            <ProductComparisonProvider>
              <ImperiumLayout>{children}</ImperiumLayout>
            </ProductComparisonProvider>
          </GamificationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
