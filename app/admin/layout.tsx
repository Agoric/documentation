import type { ReactNode } from "react"

import { AdminAccessProvider } from "@/contexts/admin-access-context"

/**
 * Layout for /admin routes.
 * Every component under /admin is now wrapped in AdminAccessProvider,
 * so hooks such as `useAdminAccess()` work without crashing.
 */
export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return <AdminAccessProvider>{children}</AdminAccessProvider>
}
