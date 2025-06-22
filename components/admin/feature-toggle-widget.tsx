"use client"

import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

type FeatureToggle = {
  id: string
  name: string
  description: string
  enabled: boolean
  type: "beta" | "experiment" | "release"
}

export function FeatureToggleWidget() {
  const [features, setFeatures] = useState<FeatureToggle[] | null>(null)

  useEffect(() => {
    const loadFeatures = async () => {
      try {
        const response = await fetch("/api/admin/feature-toggles")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const fetched: FeatureToggle[] = await response.json()
        const list = fetched ?? [] // ensure never null
        setFeatures(list)
      } catch (error) {
        console.error("Failed to load feature toggles:", error)
        toast.error("Failed to load feature toggles.")
        setFeatures([]) // Ensure features is not null in case of error
      }
    }

    loadFeatures()
  }, [])

  const updateFeatureToggle = async (id: string, enabled: boolean) => {
    try {
      const response = await fetch(`/api/admin/feature-toggles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enabled }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      toast.success(`Feature toggle ${id} updated successfully.`)
    } catch (error) {
      console.error("Failed to update feature toggle:", error)
      toast.error(`Failed to update feature toggle ${id}.`)
    }
  }

  // BEFORE any JSX return
  if (!features || features.length === 0) {
    // while loading (features === null) OR no active features
    return (
      <div className="flex items-center justify-center p-4 text-xs text-muted-foreground">
        <span>Loading feature toggles&hellip;</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {features.map((feature) => (
        <div key={feature.id} className="flex items-center justify-between">
          <div>
            <div className="font-medium">{feature.name}</div>
            <div className="text-sm text-muted-foreground">{feature.description}</div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant="secondary"
              className={`capitalize ${feature?.type === "beta" ? "bg-purple-500" : "bg-slate-500"}`}
            >
              {feature?.type}
            </Badge>
            <Switch
              id={feature.id}
              checked={feature.enabled}
              onCheckedChange={(checked) => {
                updateFeatureToggle(feature.id, checked)
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
