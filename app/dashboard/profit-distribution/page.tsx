import { ProfitDistributionProvider } from "@/contexts/profit-distribution-context"
import { ProfitDistributionDashboard } from "@/components/profit-distribution/profit-distribution-dashboard"

export default function ProfitDistributionPage() {
  return (
    <ProfitDistributionProvider>
      <ProfitDistributionDashboard />
    </ProfitDistributionProvider>
  )
}
