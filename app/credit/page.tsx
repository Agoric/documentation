"use client"

import { CreditProvider } from "@/contexts/credit-context"
import { CreditDashboard } from "./CreditDashboard"

export default function CreditPage() {
  return (
    <CreditProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
        <CreditDashboard />
      </div>
    </CreditProvider>
  )
}
