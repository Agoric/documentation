"use client"

import { CreditAccelerationProvider } from "@/contexts/credit-acceleration-context"
import { CreditAccelerationDashboard } from "@/components/credit/credit-acceleration-dashboard"

export default function CreditAccelerationPage() {
  return (
    <CreditAccelerationProvider>
      <CreditAccelerationDashboard />
    </CreditAccelerationProvider>
  )
}
