import { Suspense } from "react"
import SnapifiDashboard from "./SnapifiDashboard"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Snapifi Financial Platform",
  description: "Comprehensive financial platform with AI concierge, quantum computing, and inclusive lending",
}

export default function SnapifiPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Snapifi Financial Platform</h1>
          <p className="text-muted-foreground">AI-powered financial services with quantum computing integration</p>
        </div>
      </div>
      <Suspense fallback={<SnapifiDashboardSkeleton />}>
        <SnapifiDashboard />
      </Suspense>
    </div>
  )
}

function SnapifiDashboardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array(9)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} className="h-[300px] rounded-xl" />
        ))}
    </div>
  )
}
