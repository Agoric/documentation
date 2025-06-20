"use client"

import { SnapifiBankingProvider } from "@/contexts/snapifi-banking-context"
import { SnapifiBankingDashboard } from "@/components/banking/snapifi-banking-dashboard"

export default function BankingPage() {
  // In a real app, this would come from user authentication
  const accountId = "acc_individual_001"

  return (
    <SnapifiBankingProvider>
      <SnapifiBankingDashboard accountId={accountId} />
    </SnapifiBankingProvider>
  )
}
