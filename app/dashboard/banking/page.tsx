import { PageWrapper } from "@/components/layout/page-wrapper"
import { SnapifiBankingDashboard } from "@/components/banking/snapifi-banking-dashboard"

export default function BankingPage() {
  return (
    <PageWrapper title="Snapifi Banking" subtitle="Bancarius Digitalis - Digital Banking Services">
      <SnapifiBankingDashboard />
    </PageWrapper>
  )
}
