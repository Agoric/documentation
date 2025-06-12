import { Suspense } from "react"
import FlagshipHubDashboard from "./FlagshipHubDashboard"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Flagship Hub | ECommereX",
  description: "Centralized catalog management with multi-platform integration",
}

export default function FlagshipHubPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Flagship Hub</h1>
        <p className="text-muted-foreground">
          Manage your product catalog across multiple platforms with integrated inventory balancing and financial
          analytics
        </p>
      </div>
      <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
        <FlagshipHubDashboard />
      </Suspense>
    </div>
  )
}
