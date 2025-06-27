"use client"

import { LoanComplianceBot } from "@/components/compliance/loan-compliance-bot"

export default function InstitutionalCompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-7xl mx-auto">
        <LoanComplianceBot />
      </div>
    </div>
  )
}
