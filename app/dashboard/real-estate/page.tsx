import { Suspense } from "react"
import { RealEstateMarketTerminal } from "@/components/real-estate/real-estate-market-terminal"
import { Skeleton } from "@/components/ui/skeleton"

export default function RealEstatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Suspense
        fallback={
          <div className="p-6 space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Skeleton className="h-96 lg:col-span-3" />
              <Skeleton className="h-96" />
            </div>
          </div>
        }
      >
        <RealEstateMarketTerminal />
      </Suspense>
    </div>
  )
}
