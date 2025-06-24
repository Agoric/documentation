"use client"

import { CreditAccelerationProvider } from "@/contexts/credit-acceleration-context"
import { LoanStatusWidget } from "@/components/credit/loan-status-widget"
import { useParams } from "next/navigation"

export default function LoanDetailsPage() {
  const params = useParams()
  const loanId = params.id as string

  return (
    <CreditAccelerationProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Loan Details
            </h1>
            <p className="text-xl text-purple-200">Comprehensive loan information and status tracking</p>
            <div className="p-3 bg-slate-800/30 rounded-lg border border-slate-600/30">
              <div className="text-sm text-gray-400">Loan ID</div>
              <div className="font-mono text-cyan-300 break-all">{loanId}</div>
            </div>
          </div>

          {/* Loan Status Widget */}
          <LoanStatusWidget />
        </div>
      </div>
    </CreditAccelerationProvider>
  )
}
