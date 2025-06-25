import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { GoalPrioritizingOrb } from "@/components/genius-guide-orb/goal-prioritizing-orb"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SnappAiFi Financial Platform",
  description: "Revolutionary financial platform with 50-year loans and holographic experiences",
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
          <GoalPrioritizingOrb />
        </ThemeProvider>
      </body>
    </html>
  )
}
