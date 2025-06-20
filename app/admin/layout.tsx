import type { ReactNode } from "react"
import { AdminAccessProvider } from "@/contexts/admin-access-context"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminAccessProvider>{children}</AdminAccessProvider>
}
