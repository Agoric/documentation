"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function RealEstateMarketLoading() {
  return (
    <div className="min-h-screen bg-black p-4 space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-20 bg-gray-800" />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 h-96">
        <Skeleton className="bg-gray-800" />
        <Skeleton className="bg-gray-800" />
        <Skeleton className="bg-gray-800" />
      </div>
    </div>
  )
}
