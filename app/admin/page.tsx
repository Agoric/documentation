import { DashboardLayout } from "@/components/dashboard-layout"
import SupremeAuthorityAdminDashboard from "@/components/admin/supreme-authority-admin-dashboard"

export default function AdminPage() {
  return (
    <DashboardLayout breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Admin Panel" }]}>
      <SupremeAuthorityAdminDashboard />
    </DashboardLayout>
  )
}
