"use client"

import { GuaranteeArbitrageProvider } from "@/contexts/guarantee-arbitrage-context"
import { GuaranteeArbitrageDashboard } from "@/components/quica/guarantee-arbitrage-dashboard"

export default function GuaranteeArbitragePage() {
  return (
    <GuaranteeArbitrageProvider>
      <GuaranteeArbitrageDashboard />
    </GuaranteeArbitrageProvider>
  )
}
