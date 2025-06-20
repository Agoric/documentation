import { PageWrapper } from "@/components/layout/page-wrapper"
import { SupremeAuthorityAdminDashboard } from "@/components/admin/supreme-authority-admin-dashboard"

export default function AdminPage() {
  return (
    <PageWrapper
      title="Supreme Authority Admin"
      subtitle="Suprema Auctoritas Administratio - Administrative Control Center"
    >
      <SupremeAuthorityAdminDashboard />
    </PageWrapper>
  )
}
