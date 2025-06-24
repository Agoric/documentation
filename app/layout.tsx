import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { EnvironmentDropdown } from "@/components/ui/environment-dropdown"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
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
        <div className="flex items-center gap-4">
          <EnvironmentDropdown />
          {/* Your other header content */}
        </div>
        {children}
      </body>
    </html>
  )
}
