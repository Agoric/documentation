import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { RoyalVaultProvider } from "@/contexts/royal-vault-context"

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
        <RoyalVaultProvider>{children}</RoyalVaultProvider>
      </body>
    </html>
  )
}
