import { type NextRequest, NextResponse } from "next/server"

interface ZillowProperty {
  zpid: string
  address: {
    streetAddress: string
    city: string
    state: string
    zipcode: string
  }
  price: number
  bedrooms: number
  bathrooms: number
  livingArea: number
  yearBuilt: number
  propertyType: string
  homeStatus: string
  photos: string[]
  description: string
  zestimate: number
  rentZestimate: number
  priceHistory: Array<{
    date: string
    price: number
    event: string
  }>
  taxHistory: Array<{
    year: number
    taxPaid: number
    taxIncreaseRate: number
  }>
}

interface ZillowSearchResponse {
  results: ZillowProperty[]
  totalResultCount: number
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location") || "New York, NY"
    const minPrice = searchParams.get("minPrice") || "0"
    const maxPrice = searchParams.get("maxPrice") || "10000000"
    const propertyType = searchParams.get("propertyType") || "all"
    const status = searchParams.get("status") || "for_sale"

    const apiKey = process.env.NEXT_PUBLIC_ZILLOW_API_KEY
    if (!apiKey) {
      throw new Error("Zillow API key not configured")
    }

    // Using RapidAPI Zillow endpoint
    const response = await fetch(
      `https://zillow-com1.p.rapidapi.com/propertyExtendedSearch?location=${encodeURIComponent(location)}&status_type=${status}&price_min=${minPrice}&price_max=${maxPrice}&home_type=${propertyType}&sort=Price_High_Low`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "zillow-com1.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Zillow API error: ${response.status}`)
    }

    const data: ZillowSearchResponse = await response.json()

    // Transform Zillow data to our property format
    const transformedProperties =
      data.results?.map((property) => {
        const monthlyPayment = Math.round((property.price * 0.05) / 12) // Rough estimate
        const pricePerSqft = property.livingArea ? Math.round(property.price / property.livingArea) : 0
        const daysOnMarket = Math.floor(Math.random() * 90) + 1 // Placeholder since not in basic API

        // Determine if property should be "holographic" based on price and features
        const isHolographic = property.price > 1000000 || property.propertyType === "CONDO" || property.yearBuilt > 2020

        return {
          id: property.zpid,
          title: `${property.propertyType} in ${property.address.city}`,
          description:
            property.description ||
            `Beautiful ${property.propertyType.toLowerCase()} with ${property.bedrooms} bedrooms and ${property.bathrooms} bathrooms`,
          price: property.price || property.zestimate || 0,
          monthlyPayment,
          image: property.photos?.[0] || "/placeholder.svg",
          type: property.propertyType || "Single Family",
          bedrooms: property.bedrooms || 0,
          bathrooms: property.bathrooms || 0,
          sqft: property.livingArea || 0,
          yearBuilt: property.yearBuilt || 2000,
          rating: 4.0 + Math.random() * 1, // Generate rating between 4.0-5.0
          location: `${property.address.city}, ${property.address.state}`,
          status: property.homeStatus === "FOR_SALE" ? "For Sale" : property.homeStatus,
          features: generateFeatures(property),
          isHolographic,
          holographicFeatures: isHolographic ? generateHolographicFeatures() : undefined,
          has360View: Math.random() > 0.7, // 30% chance of 360 view
          images360: isHolographic ? generateMock360Images() : undefined,
          daysOnMarket,
          pricePerSqft,
        }
      }) || []

    return NextResponse.json({
      properties: transformedProperties,
      total: data.totalResultCount || transformedProperties.length,
    })
  } catch (error) {
    console.error("Zillow API Error:", error)

    // Return fallback data if API fails
    return NextResponse.json({
      properties: getFallbackProperties(),
      total: 6,
      error: "Using fallback data due to API limitations",
    })
  }
}

function generateFeatures(property: ZillowProperty): string[] {
  const features = []

  if (property.yearBuilt > 2015) features.push("Modern Design")
  if (property.bathrooms >= 3) features.push("Multiple Bathrooms")
  if (property.livingArea > 2500) features.push("Spacious Layout")
  if (property.propertyType === "CONDO") features.push("Luxury Amenities")
  if (property.propertyType === "SINGLE_FAMILY") features.push("Private Yard")
  if (property.price > 2000000) features.push("Premium Location")

  // Add some standard features
  features.push("Updated Kitchen", "Parking", "Air Conditioning")

  return features.slice(0, 6)
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
  ]

  return holographicFeatures.slice(0, 4)
}

function generateMock360Images(): string[] {
  return [
    "/properties/360/room-001.jpg",
    "/properties/360/room-002.jpg",
    "/properties/360/room-003.jpg",
    "/properties/360/room-004.jpg",
    "/properties/360/room-005.jpg",
    "/properties/360/room-006.jpg",
    "/properties/360/room-007.jpg",
    "/properties/360/room-008.jpg",
  ]
}

function getFallbackProperties() {
  return [
    {
      id: "fallback-1",
      title: "Luxury Manhattan Penthouse",
      description: "Stunning penthouse with city views and premium finishes",
      price: 4500000,
      monthlyPayment: 18750,
      image: "/placeholder.svg?height=300&width=400",
      type: "Penthouse",
      bedrooms: 4,
      bathrooms: 3.5,
      sqft: 3200,
      yearBuilt: 2024,
      rating: 4.9,
      location: "Manhattan, NY",
      status: "For Sale",
      features: ["City Views", "Premium Finishes", "Rooftop Access", "Concierge"],
      isHolographic: true,
      holographicFeatures: ["Smart Home", "Holographic Displays", "AI Systems", "Neural Controls"],
      has360View: true,
      images360: generateMock360Images(),
      daysOnMarket: 12,
      pricePerSqft: 1406,
    },
    {
      id: "fallback-2",
      title: "Modern Family Home",
      description: "Beautiful family home with open concept design",
      price: 850000,
      monthlyPayment: 3542,
      image: "/placeholder.svg?height=300&width=400",
      type: "Single Family",
      bedrooms: 5,
      bathrooms: 3,
      sqft: 2800,
      yearBuilt: 2021,
      rating: 4.6,
      location: "Austin, TX",
      status: "For Sale",
      features: ["Open Concept", "Large Backyard", "Garage", "Updated Kitchen"],
      isHolographic: false,
      has360View: true,
      images360: generateMock360Images(),
      daysOnMarket: 28,
      pricePerSqft: 304,
    },
  ]
}
