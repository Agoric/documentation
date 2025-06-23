"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { loadFeatures } from "./load-features"
import type { FeatureToggle } from "./types"

export default function FeatureToggleWidget() {
  const [data, setData] = useState<FeatureToggle[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const toggles = await loadFeatures()
        setData(toggles)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error while loading")
      }
    })()
  }, [])

  if (error) {
    return (
      <Alert variant="destructive" className="bg-red-50/50 border-red-200">
        <AlertTitle>Failed to load feature toggles</AlertTitle>
        <AlertDescription className="whitespace-pre-wrap">{error}</AlertDescription>
      </Alert>
    )
  }

  if (!data) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full bg-brand-100/50" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {data.map((toggle) => (
        <div
          key={toggle.id}
          className="flex items-center justify-between p-4 bg-brand-50/30 rounded-lg border border-brand-200/30"
        >
          <div>
            <h3 className="font-medium text-gray-900">{toggle.name}</h3>
            <p className="text-sm text-gray-500">Feature toggle for {toggle.name.toLowerCase()}</p>
          </div>
          <Switch defaultChecked={toggle.enabled} />
        </div>
      ))}
    </div>
  )
}
