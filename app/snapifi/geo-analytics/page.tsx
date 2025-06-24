import { GeoAnalytics } from "@/components/snapifi/geo-analytics"

export default function GeoAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Geo-Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Cost-of-living analysis powered by Zillow API and Census data for optimal location decisions
        </p>
      </div>

      <GeoAnalytics />
    </div>
  )
}
