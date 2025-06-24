"use client"

import { GlobalCitizenshipProvider } from "@/contexts/global-citizenship-context"
import { CreditAccelerationProvider } from "@/contexts/credit-acceleration-context"
import { QGIBadgesAndLoanProcessingDashboard } from "@/components/dax-trading/qgi-badges-and-loan-processing-dashboard"

export default function QGIBadgesAndLoanProcessingPage() {
  return (
    <GlobalCitizenshipProvider>
      <CreditAccelerationProvider>
        <QGIBadgesAndLoanProcessingDashboard />
      </CreditAccelerationProvider>
    </GlobalCitizenshipProvider>
  )
}
