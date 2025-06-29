"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoanCenterLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-10 w-64 bg-blue-800/30" />
            <Skeleton className="h-6 w-96 bg-blue-800/20" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-10 w-32 bg-blue-800/30" />
            <Skeleton className="h-10 w-40 bg-blue-800/30" />
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card
              key={i}
              className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 bg-blue-800/30" />
                    <Skeleton className="h-8 w-16 bg-blue-800/30" />
                    <Skeleton className="h-4 w-12 bg-blue-800/30" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded bg-blue-800/30" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-12 w-full bg-blue-900/30" />

          {/* Applications Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card
                key={i}
                className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-32 bg-blue-800/30" />
                    <Skeleton className="h-6 w-20 bg-blue-800/30" />
                  </div>
                  <Skeleton className="h-4 w-40 bg-blue-800/20" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="space-y-1">
                        <Skeleton className="h-3 w-16 bg-blue-800/20" />
                        <Skeleton className="h-4 w-20 bg-blue-800/30" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-3 w-16 bg-blue-800/20" />
                      <Skeleton className="h-3 w-8 bg-blue-800/20" />
                    </div>
                    <Skeleton className="h-2 w-full bg-blue-800/30" />
                  </div>
                  <Skeleton className="h-16 w-full bg-blue-800/20" />
                  <Skeleton className="h-10 w-full bg-blue-800/30" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
