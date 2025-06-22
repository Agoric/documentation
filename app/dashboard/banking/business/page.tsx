"use client"

import { SnapifiBankingProvider } from "@/contexts/snapifi-banking-context"
import { BusinessBankingDashboard } from "@/components/banking/business-banking-dashboard"

export default function BusinessBankingPage() {
  // In a real app, this would come from business authentication
  const accountId = "acc_business_001"

  return (
    <SnapifiBankingProvider>
      <BusinessBankingDashboard accountId={accountId} />
    </SnapifiBankingProvider>
  )
}
