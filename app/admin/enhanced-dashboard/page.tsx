"use client"

import { CreditAccelerationProvider } from "@/contexts/credit-acceleration-context"
import { EnhancedAdminDashboard } from "@/components/credit/enhanced-admin-dashboard"

export default function EnhancedAdminDashboardPage() {
  return (
    <CreditAccelerationProvider>
      <EnhancedAdminDashboard />
    </CreditAccelerationProvider>
  )
}
