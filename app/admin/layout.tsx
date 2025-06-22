"use client"

import type { ReactNode } from "react"
import { AdminAccessProvider } from "@/contexts/admin-access-context"

/**
 * Client layout for everything under /admin.
 * Ensures that any component using `useAdminAccess`
 * is safely wrapped in an <AdminAccessProvider>.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminAccessProvider>{children}</AdminAccessProvider>
}
