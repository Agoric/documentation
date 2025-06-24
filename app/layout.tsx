import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { JonlorenzoThemeProvider } from "@/contexts/jonlorenzo-theme-context"
import { JonlorenzoRoyalThemeToggle } from "@/components/theme/jonlorenzo-royal-theme-toggle"
import { GeniusGuideOrb } from "@/components/genius/genius-guide-orb"
import { Toaster } from "@/components/ui/sonner"
import { GlobalCitizenshipProvider } from "@/contexts/global-citizenship-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Horizon Dashboard - Supreme Authority Platform",
  description: "Advanced global citizenship and financial management platform with AI guidance",
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
          <JonlorenzoThemeProvider>
            <GlobalCitizenshipProvider>
              <div className="min-h-screen bg-gradient-to-br from-royal-50 via-royal-100 to-royal-200">
                {children}
                <JonlorenzoRoyalThemeToggle />
                <GeniusGuideOrb />
                <Toaster />
              </div>
            </GlobalCitizenshipProvider>
          </JonlorenzoThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
