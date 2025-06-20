"use client"

import type { ReactNode } from "react"
import { AdminAccessProvider } from "@/contexts/admin-access-context"

/**
 * Global client-side providers.
 * Add more providers here as your app grows.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <AdminAccessProvider>{children}</AdminAccessProvider>
}
