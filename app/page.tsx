import { AdminAccessProvider } from "@/contexts/admin-access-context"
import SupremeAuthorityAdminDashboard from "@/components/admin/supreme-authority-admin-dashboard"

export default function HomePage() {
  return (
    <AdminAccessProvider>
      <SupremeAuthorityAdminDashboard />
      {/* …any other homepage content… */}
    </AdminAccessProvider>
  )
}
