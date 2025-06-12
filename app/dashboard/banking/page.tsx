import { Suspense } from "react"
import BankingDashboard from "./BankingDashboard"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Banking Dashboard",
  description: "Manage your banking accounts, transactions, and financial goals.",
}

export default function BankingPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Banking Dashboard</h1>
          <p className="text-muted-foreground">Manage your accounts, transactions, and financial goals</p>
        </div>
      </div>
      <Suspense fallback={<BankingDashboardSkeleton />}>
        <BankingDashboard />
      </Suspense>
    </div>
  )
}

function BankingDashboardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} className="h-[200px] rounded-xl" />
        ))}
    </div>
  )
}
