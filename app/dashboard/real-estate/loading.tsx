"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { ImperialCard } from "@/components/ui/imperial-card"

export default function RealEstateLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-screen">
        <div className="lg:col-span-3 space-y-4">
          <ImperialCard>
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-64 w-full" />
          </ImperialCard>
          <ImperialCard>
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          </ImperialCard>
        </div>
        <div className="space-y-4">
          <ImperialCard>
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          </ImperialCard>
        </div>
      </div>
    </div>
  )
}
