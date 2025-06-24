import { VehicleTracking } from "@/components/snapifi/vehicle-tracking"

export default function VehiclePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Vehicle & Fuel Tracking</h1>
        <p className="text-muted-foreground">
          Optimize transportation costs with smart tracking, route optimization, and fuel analytics
        </p>
      </div>

      <VehicleTracking />
    </div>
  )
}
