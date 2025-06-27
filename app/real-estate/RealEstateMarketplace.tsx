"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Property } from "@/types"

const MOCK_PROPERTIES: Property[] = [
  {
    id: "1",
    name: "Luxury Apartment in Downtown",
    address: "123 Main St, Anytown",
    price: 1500000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    description: "Stunning apartment with city views.",
    imageUrl: "/images/apartment1.jpg",
    isAuction: false,
  },
  {
    id: "2",
    name: "Charming House with Garden",
    address: "456 Oak Ave, Anytown",
    price: 800000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1800,
    description: "Cozy house with a beautiful garden.",
    imageUrl: "/images/house1.jpg",
    isAuction: true,
  },
  {
    id: "3",
    name: "Modern Loft in Arts District",
    address: "789 Pine Ln, Anytown",
    price: 950000,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 900,
    description: "Stylish loft in a vibrant neighborhood.",
    imageUrl: "/images/loft1.jpg",
    isAuction: false,
  },
]

const RealEstateMarketplace = () => {
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBedrooms, setFilterBedrooms] = useState("")
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const router = useRouter()

  useEffect(() => {
    // In a real application, you would fetch properties from an API here
    // For now, we're using mock data
  }, [])

  const filteredProperties = properties.filter((property) => {
    const searchMatch =
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase())

    const bedroomMatch = filterBedrooms === "" || property.bedrooms === Number.parseInt(filterBedrooms)

    return searchMatch && bedroomMatch
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Real Estate Marketplace</h1>

      <div className="flex gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search by name or address"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Select onValueChange={setFilterBedrooms}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Bedrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Bedrooms</SelectItem>
            <SelectItem value="1">1 Bedroom</SelectItem>
            <SelectItem value="2">2 Bedrooms</SelectItem>
            <SelectItem value="3">3 Bedrooms</SelectItem>
            <SelectItem value="4">4+ Bedrooms</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProperties.map((property) => (
          <Card key={property.id}>
            <CardHeader>
              <CardTitle>{property.name}</CardTitle>
              <CardDescription>{property.address}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={property.imageUrl || "/placeholder.svg"}
                alt={property.name}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <p>Price: ${property.price.toLocaleString()}</p>
              <p>Bedrooms: {property.bedrooms}</p>
              <p>Bathrooms: {property.bathrooms}</p>
              <p>Square Feet: {property.squareFeet}</p>
              <p>{property.description}</p>

              <div className="flex gap-2 mt-4">
                <Button className="flex-1" onClick={() => router.push(`/real-estate/property/${property.id}`)}>
                  View Details
                </Button>
                <Button variant="outline" onClick={() => router.push(`/real-estate/property/${property.id}/tour`)}>
                  Virtual Tour
                </Button>
                <Button variant="outline" onClick={() => setSelectedProperty(property)}>
                  Compare
                </Button>
              </div>

              {property.isAuction && (
                <Button
                  className="w-full mt-2"
                  variant="destructive"
                  onClick={() => router.push(`/real-estate/property/${property.id}/bid`)}
                >
                  Place Bid
                </Button>
              )}

              <Button
                className="w-full mt-2 bg-transparent"
                variant="outline"
                onClick={() => router.push(`/citizen/loan-center/home-loan?propertyId=${property.id}`)}
              >
                Get Financing
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal for property comparison (example) */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-bold mb-2">Compare Properties</h2>
            <p>Comparing: {selectedProperty.name}</p>
            <Button onClick={() => setSelectedProperty(null)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RealEstateMarketplace
