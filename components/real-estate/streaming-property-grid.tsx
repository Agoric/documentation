export function StreamingPropertyGrid({
  properties,
  location,
  minPrice,
  maxPrice,
  propertyType,
  batchSize = 5,
  viewMode = "grid",
}: {
  properties: any[]
  location?: string
  minPrice?: number
  maxPrice?: number
  propertyType?: string
  batchSize?: number
  viewMode?: "grid" | "list"
}) {
  return (
    <div>
      {/* TODO: real streaming implementation */}
      <p>
        Streaming {properties.length} properties for {location ?? "all locations"}
      </p>
    </div>
  )
}
