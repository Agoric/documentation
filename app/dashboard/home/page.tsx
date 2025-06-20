import { PageWrapper } from "@/components/layout/page-wrapper"
import { HomeDashboard } from "@/components/dashboard/home-dashboard"

export default function HomePage() {
  return (
    <PageWrapper
      title="Citizen Home Dashboard"
      subtitle="Comprehensive overview of your digital sovereignty status"
      showSidebar={true}
      showToolbar={true}
    >
      <HomeDashboard />
    </PageWrapper>
  )
}
