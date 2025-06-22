"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
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
      <Alert variant="destructive" className="max-w-lg">
        <AlertTitle>Failed to load feature toggles</AlertTitle>
        <AlertDescription className="whitespace-pre-wrap">{error}</AlertDescription>
      </Alert>
    )
  }

  if (!data) {
    return <Skeleton className="h-20 w-full max-w-lg" />
  }

  return (
    <div className="space-y-2">
      {data.map((t) => (
        <label key={t.id} className="flex cursor-pointer select-none items-center gap-2">
          <input type="checkbox" defaultChecked={t.enabled} className="h-4 w-4" readOnly />
          <span>{t.name}</span>
        </label>
      ))}
    </div>
  )
}
