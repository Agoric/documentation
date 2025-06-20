import { AdminAccessProvider } from "@/contexts/admin-access-context"

export default function HomePage() {
  return (
    <AdminAccessProvider>
      <SupremeAuthorityAdminDashboard />
      {/* …any other homepage content… */}
    </AdminAccessProvider>
  )
}
