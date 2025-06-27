"use client"

import { useMemo, useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PaginatedPropertyGrid } from "@/components/real-estate/paginated-property-grid"
import { cn } from "@/lib/utils"

type Property = {
  id: string
  address: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  propertyType: "house" | "condo" | "townhome"
  image: string
}

/* -------------------------------------------------------------------------- */
/*                               SAMPLE DATA                                  */
/* -------------------------------------------------------------------------- */
// In production you’ll fetch this from your API.
const SAMPLE_PROPERTIES: Property[] = [
  {
    id: "1",
    address: "123 Oceanview Dr, Malibu, CA",
    price: 6200000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3800,
    propertyType: "house",
    image: "/properties/oceanfront-estate.jpg",
  },
  {
    id: "2",
    address: "900 Market St, San Francisco, CA",
    price: 1450000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    propertyType: "condo",
    image: "/properties/downtown-loft.jpg",
  },
  {
    id: "3",
    address: "45 Sunset Blvd, Los Angeles, CA",
    price: 2800000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2600,
    propertyType: "house",
    image: "/properties/hollywood-hills-contemporary.jpg",
  },
  {
    id: "4",
    address: "789 Oak Ln, Austin, TX",
    price: 875000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3000,
    propertyType: "townhome",
    image: "/properties/suburban-family-home.jpg",
  },
]

/* -------------------------------------------------------------------------- */
/*                             HELPER FUNCTIONS                               */
/* -------------------------------------------------------------------------- */

function renderPropertyCard(property: Property) {
  // Placeholder renderer – replace with HolographicPropertyCard when ready
  return (
    <div
      key={property.id}
      className={cn(
        "rounded-xl overflow-hidden bg-white/5 backdrop-blur-lg p-4 border border-white/10",
        "hover:border-cyan-400 transition",
      )}
    >
      <img
        src={property.image || "/placeholder.svg"}
        alt={property.address}
        className="h-40 w-full object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-white">{property.address}</h3>
      <p className="text-sm text-white/70">
        {property.bedrooms} bd &bull; {property.bathrooms} ba &bull; {property.sqft.toLocaleString()} sq ft
      </p>
      <p className="mt-2 text-cyan-400 text-xl font-bold">${property.price.toLocaleString()}</p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                            MAIN COMPONENT                                  */
/* -------------------------------------------------------------------------- */

export default function RealEstateMarketplace() {
  const [propertyType, setPropertyType] = useState<string>("all")
  const [bedrooms, setBedrooms] = useState<string>("all")
  const [minPrice, setMinPrice] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<string>("")

  const filtered = useMemo(() => {
    return SAMPLE_PROPERTIES.filter((p) => {
      const matchesType = propertyType === "all" || p.propertyType === propertyType
      const matchesBedrooms = bedrooms === "all" || p.bedrooms === Number(bedrooms)
      const matchesMin = !minPrice || p.price >= Number(minPrice)
      const matchesMax = !maxPrice || p.price <= Number(maxPrice)

      return matchesType && matchesBedrooms && matchesMin && matchesMax
    })
  }, [propertyType, bedrooms, minPrice, maxPrice])

  return (
    <main className="container py-10 space-y-8">
      {/* Filter Bar */}
      <section className="grid gap-4 md:grid-cols-4">
        {/* Property Type */}
        <div>
          <label className="block mb-1 text-sm text-white/80">Type</label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger>
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              {/* 👇 EVERY ITEM NOW HAS A NON-EMPTY VALUE 👇 */}
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhome">Townhome</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block mb-1 text-sm text-white/80">Bedrooms</label>
          <Select value={bedrooms} onValueChange={setBedrooms}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Min Price */}
        <div>
          <label className="block mb-1 text-sm text-white/80">Min Price</label>
          <Input type="number" placeholder="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        </div>

        {/* Max Price */}
        <div>
          <label className="block mb-1 text-sm text-white/80">Max Price</label>
          <Input type="number" placeholder="∞" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </div>
      </section>

      {/* Results */}
      <PaginatedPropertyGrid
        properties={filtered}
        itemsPerPage={4}
        viewMode="grid"
        renderProperty={renderPropertyCard}
      />

      {/* Clear filters button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={() => {
            setPropertyType("all")
            setBedrooms("all")
            setMinPrice("")
            setMaxPrice("")
          }}
          className="border-white/20 text-white hover:bg-white/10"
        >
          Clear Filters
        </Button>
      </div>
    </main>
  )
}
