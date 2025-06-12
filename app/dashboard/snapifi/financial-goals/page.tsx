import type { Metadata } from "next"
import { FinancialGoalsDashboard } from "@/components/wellness/financial-goals-dashboard"

export const metadata: Metadata = {
  title: "Financial Goals | Snapifi Financial Platform",
  description: "Track and manage your financial goals with intelligent insights",
}

export default function FinancialGoalsPage() {
  return (
    <div className="container mx-auto py-8">
      <FinancialGoalsDashboard />
    </div>
  )
}
