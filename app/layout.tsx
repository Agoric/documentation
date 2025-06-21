import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { UnifiedAIOrb } from "@/components/ai/unified-ai-orb"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Horizon Dashboard - Supreme Authority Platform",
  description: "Advanced financial and business management platform with AI assistance",
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
          {children}
          <UnifiedAIOrb />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
