import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { DiplomaticAgentProvider } from "@/contexts/diplomatic-agent-context"

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
        <DiplomaticAgentProvider>{children}</DiplomaticAgentProvider>
      </body>
    </html>
  )
}
