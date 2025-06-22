import { PageWrapper } from "@/components/layout/page-wrapper"
import GamificationDashboard from "./GamificationDashboard"

export default function GamificationPage() {
  return (
    <PageWrapper
      title="Gamification Hub"
      subtitle="Ludus Victoriae Et Honores - Achievement & Progression System"
      showSidebar={false}
    >
      <GamificationDashboard />
    </PageWrapper>
  )
}
