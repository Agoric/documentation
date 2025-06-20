"use client"

import { PageWrapper } from "@/components/layout/page-wrapper"
import { SnapifiBankingProvider } from "@/contexts/snapifi-banking-context"
import { SnapifiBankingDashboard } from "@/components/banking/snapifi-banking-dashboard"

export default function BankingPage() {
  // TODO: replace with authenticated user’s primary account
  const accountId = "acc_individual_001"

  return (
    <SnapifiBankingProvider>
      <PageWrapper title="Snapifi Banking" subtitle="Bancarius Digitalis – Digital Banking Services">
        <SnapifiBankingDashboard accountId={accountId} />
      </PageWrapper>
    </SnapifiBankingProvider>
  )
}
