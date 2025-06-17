import { type NextRequest, NextResponse } from "next/server"

interface Property {
  id: string
  title: string
  description: string
  price: number
  monthlyPayment: number
  image: string
  type: string
  bedrooms: number
  bathrooms: number
  sqft: number
  yearBuilt: number
  rating: number
  location: string
  status: string
  features: string[]
  isHolographic?: boolean
  holographicFeatures?: string[]
  has360View?: boolean
  images360?: string[]
  daysOnMarket: number
  pricePerSqft: number
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location") || "New York, NY"
    const minPrice = Number.parseInt(searchParams.get("minPrice") || "0")
    const maxPrice = Number.parseInt(searchParams.get("maxPrice") || "10000000")
    const propertyType = searchParams.get("propertyType") || "all"
    const status = searchParams.get("status") || "for_sale"

    console.log("Fetching properties for:", { location, minPrice, maxPrice, propertyType, status })

    // For now, return realistic mock data based on search parameters
    // This can be replaced with actual Zillow API once access is properly configured
    const properties = generateRealisticProperties(location, minPrice, maxPrice, propertyType, status)

    return NextResponse.json({
      properties,
      total: properties.length,
      message: "Using enhanced property database (Zillow integration pending API access)",
    })
  } catch (error) {
    console.error("Property API Error:", error)

    return NextResponse.json({
      properties: getDefaultProperties(),
      total: 6,
      error: "Using fallback property data",
    })
  }
}

function generateRealisticProperties(
  location: string,
  minPrice: number,
  maxPrice: number,
  propertyType: string,
  status: string,
): Property[] {
  const locationData = getLocationData(location)
  const properties: Property[] = []

  // Generate 12-20 realistic properties based on search criteria
  const propertyCount = Math.floor(Math.random() * 9) + 12

  for (let i = 0; i < propertyCount; i++) {
    const property = generateRealisticProperty(locationData, minPrice, maxPrice, propertyType, status, i)
    if (property.price >= minPrice && property.price <= maxPrice) {
      properties.push(property)
    }
  }

  return properties.slice(0, 20) // Limit to 20 results
}

function getLocationData(location: string) {
  const locationMap: Record<string, any> = {
    "New York, NY": {
      city: "New York",
      state: "NY",
      avgPrice: 1200000,
      priceRange: [400000, 8000000],
      neighborhoods: ["Manhattan", "Brooklyn", "Queens", "Bronx"],
      types: ["Condo", "Co-op", "Townhouse", "Penthouse"],
    },
    "Los Angeles, CA": {
      city: "Los Angeles",
      state: "CA",
      avgPrice: 900000,
      priceRange: [500000, 5000000],
      neighborhoods: ["Beverly Hills", "Hollywood", "Santa Monica", "Venice"],
      types: ["Single Family", "Condo", "Townhouse", "Villa"],
    },
    "Miami, FL": {
      city: "Miami",
      state: "FL",
      avgPrice: 650000,
      priceRange: [300000, 3000000],
      neighborhoods: ["South Beach", "Brickell", "Coral Gables", "Wynwood"],
      types: ["Condo", "Single Family", "Townhouse", "Penthouse"],
    },
    "Austin, TX": {
      city: "Austin",
      state: "TX",
      avgPrice: 550000,
      priceRange: [250000, 2000000],
      neighborhoods: ["Downtown", "South Austin", "East Austin", "Westlake"],
      types: ["Single Family", "Condo", "Townhouse", "Ranch"],
    },
    "Chicago, IL": {
      city: "Chicago",
      state: "IL",
      avgPrice: 450000,
      priceRange: [200000, 2500000],
      neighborhoods: ["Loop", "Lincoln Park", "Wicker Park", "Gold Coast"],
      types: ["Condo", "Single Family", "Townhouse", "Loft"],
    },
  }

  return (
    locationMap[location] || {
      city: location.split(",")[0] || "Unknown",
      state: location.split(",")[1]?.trim() || "Unknown",
      avgPrice: 500000,
      priceRange: [200000, 2000000],
      neighborhoods: ["Downtown", "Suburbs", "Historic District", "Waterfront"],
      types: ["Single Family", "Condo", "Townhouse", "Ranch"],
    }
  )
}

function generateRealisticProperty(
  locationData: any,
  minPrice: number,
  maxPrice: number,
  propertyType: string,
  status: string,
  index: number,
): Property {
  const priceVariation = 0.3 + Math.random() * 1.4 // 0.3x to 1.7x of avg price
  const basePrice = locationData.avgPrice * priceVariation
  const price = Math.max(minPrice, Math.min(maxPrice, Math.round(basePrice / 10000) * 10000))

  const bedrooms = Math.floor(Math.random() * 5) + 1
  const bathrooms = Math.floor(Math.random() * 3) + 1 + Math.random() * 0.5
  const sqft = Math.floor(Math.random() * 2000) + 800 + bedrooms * 200
  const yearBuilt = Math.floor(Math.random() * 50) + 1975
  const daysOnMarket = Math.floor(Math.random() * 120) + 1

  const neighborhood = locationData.neighborhoods[Math.floor(Math.random() * locationData.neighborhoods.length)]
  const propertyTypeActual =
    propertyType === "all" ? locationData.types[Math.floor(Math.random() * locationData.types.length)] : propertyType

  const isHolographic = price > locationData.avgPrice * 1.5 || yearBuilt > 2020 || propertyTypeActual === "Penthouse"
  const monthlyPayment = Math.round((price * 0.045) / 12) // Rough 4.5% mortgage estimate

  return {
    id: `prop-${locationData.city.toLowerCase()}-${index + 1}`,
    title: `${propertyTypeActual} in ${neighborhood}`,
    description: generatePropertyDescription(propertyTypeActual, bedrooms, bathrooms, neighborhood, isHolographic),
    price,
    monthlyPayment,
    image: `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(propertyTypeActual)}`,
    type: propertyTypeActual,
    bedrooms,
    bathrooms: Math.round(bathrooms * 2) / 2, // Round to nearest 0.5
    sqft,
    yearBuilt,
    rating: 3.5 + Math.random() * 1.5,
    location: `${neighborhood}, ${locationData.state}`,
    status: status === "for_sale" ? "For Sale" : status === "for_rent" ? "For Rent" : "Recently Sold",
    features: generatePropertyFeatures(propertyTypeActual, yearBuilt, price, locationData.avgPrice),
    isHolographic,
    holographicFeatures: isHolographic ? generateHolographicFeatures() : undefined,
    has360View: Math.random() > 0.6, // 40% chance
    images360: isHolographic ? generateMock360Images() : undefined,
    daysOnMarket,
    pricePerSqft: Math.round(price / sqft),
  }
}

function generatePropertyDescription(
  type: string,
  bedrooms: number,
  bathrooms: number,
  neighborhood: string,
  isHolographic: boolean,
): string {
  const descriptions = [
    `Stunning ${type.toLowerCase()} featuring ${bedrooms} bedrooms and ${bathrooms} bathrooms in the heart of ${neighborhood}.`,
    `Beautiful ${type.toLowerCase()} with modern amenities and ${bedrooms} spacious bedrooms in prestigious ${neighborhood}.`,
    `Elegant ${type.toLowerCase()} offering ${bedrooms} bedrooms, ${bathrooms} baths, and premium finishes in ${neighborhood}.`,
    `Luxurious ${type.toLowerCase()} with ${bedrooms} bedrooms and exceptional design in sought-after ${neighborhood}.`,
  ]

  let description = descriptions[Math.floor(Math.random() * descriptions.length)]

  if (isHolographic) {
    description +=
      " This premium property features cutting-edge smart home technology and holographic entertainment systems."
  }

  return description
}

function generatePropertyFeatures(type: string, yearBuilt: number, price: number, avgPrice: number): string[] {
  const allFeatures = [
    "Updated Kitchen",
    "Hardwood Floors",
    "Granite Countertops",
    "Stainless Steel Appliances",
    "Walk-in Closet",
    "Master Suite",
    "Fireplace",
    "Balcony",
    "Garage",
    "Swimming Pool",
    "Garden",
    "Air Conditioning",
    "Heating",
    "Laundry Room",
    "Storage Space",
    "High Ceilings",
    "Natural Light",
    "City Views",
    "Mountain Views",
    "Water Views",
    "Gym Access",
    "Concierge",
    "Security System",
    "Elevator",
    "Rooftop Access",
  ]

  const features = []
  const featureCount = Math.floor(Math.random() * 6) + 4 // 4-9 features

  // Add type-specific features
  if (type === "Penthouse") features.push("City Views", "Rooftop Access", "Concierge")
  if (type === "Condo") features.push("Gym Access", "Concierge", "Elevator")
  if (type === "Single Family") features.push("Garage", "Garden", "Storage Space")
  if (yearBuilt > 2015) features.push("Updated Kitchen", "Modern Design")
  if (price > avgPrice * 1.3) features.push("Premium Finishes", "Luxury Amenities")

  // Add random features
  while (features.length < featureCount) {
    const feature = allFeatures[Math.floor(Math.random() * allFeatures.length)]
    if (!features.includes(feature)) {
      features.push(feature)
    }
  }

  return features.slice(0, featureCount)
}

function generateHolographicFeatures(): string[] {
  const holographicFeatures = [
    "Smart Home Integration",
    "Holographic Displays",
    "AI Climate Control",
    "Neural Interface",
    "Quantum Security",
    "Biometric Access",
    "Holographic Entertainment",
    "Smart Glass Windows",
    "Voice Control",
    "Automated Systems",
    "Holographic Concierge",
    "Neural Network Integration",
  ]

  return holographicFeatures.slice(0, 4)
}

function generateMock360Images(): string[] {
  return [
    "/properties/360/living-room.jpg",
    "/properties/360/kitchen.jpg",
    "/properties/360/master-bedroom.jpg",
    "/properties/360/bathroom.jpg",
    "/properties/360/balcony.jpg",
    "/properties/360/dining-room.jpg",
  ]
}

function getDefaultProperties(): Property[] {
  return [
    {
      id: "default-1",
      title: "Luxury Manhattan Penthouse",
      description: "Stunning penthouse with panoramic city views and premium finishes throughout.",
      price: 4500000,
      monthlyPayment: 16875,
      image: "/placeholder.svg?height=300&width=400&text=Penthouse",
      type: "Penthouse",
      bedrooms: 4,
      bathrooms: 3.5,
      sqft: 3200,
      yearBuilt: 2024,
      rating: 4.9,
      location: "Manhattan, NY",
      status: "For Sale",
      features: ["City Views", "Premium Finishes", "Rooftop Access", "Concierge", "Smart Home"],
      isHolographic: true,
      holographicFeatures: ["Smart Home Integration", "Holographic Displays", "AI Climate Control", "Neural Interface"],
      has360View: true,
      images360: generateMock360Images(),
      daysOnMarket: 12,
      pricePerSqft: 1406,
    },
  ]
}
