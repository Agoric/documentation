"use client"
import { CreditSuiteDashboard } from "./CreditSuiteDashboard"
import { CreditProvider } from "@/contexts/credit-context"

export default function CreditSuitePage() {
  return (
    <CreditProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
        <CreditSuiteDashboard />
      </div>
    </CreditProvider>
  )
}
