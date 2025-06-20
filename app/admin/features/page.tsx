import { PageWrapper } from "@/components/layout/page-wrapper"
import { FeatureToggleDashboard } from "@/components/admin/feature-toggle-dashboard"

export default function FeaturesPage() {
  return (
    <PageWrapper title="Feature Management" subtitle="Gestio Proprietatum - System Feature Configuration">
      <FeatureToggleDashboard />
    </PageWrapper>
  )
}
