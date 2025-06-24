"use client"

import { SnapifiBankingProvider } from "@/contexts/snapifi-banking-context"
import { BankingAdminDashboard } from "@/components/admin/banking-admin-dashboard"

export default function BankingAdminPage() {
  return (
    <SnapifiBankingProvider>
      <BankingAdminDashboard />
    </SnapifiBankingProvider>
  )
}
