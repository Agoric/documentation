import { Suspense } from "react"
import InventoryForecastingDashboard from "./InventoryForecastingDashboard"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Inventory Forecasting | ECommereX",
  description: "AI-powered inventory forecasting and optimization",
}

export default function InventoryForecastingPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Inventory Forecasting</h1>
        <p className="text-muted-foreground">AI-powered inventory predictions and optimization recommendations</p>
      </div>
      <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
        <InventoryForecastingDashboard />
      </Suspense>
    </div>
  )
}
