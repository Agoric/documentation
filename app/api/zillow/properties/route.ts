import { type NextRequest, NextResponse } from "next/server"
import { ZillowApiClient } from "@/lib/zillow-api-client"
import { transformZillowProperty, type Property } from "@/lib/zillow-property-transformer"

// Cache for API responses (in production, use Redis or similar)
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location") || "New York, NY"
    const minPrice = searchParams.get("minPrice") ? Number.parseInt(searchParams.get("minPrice")!) : undefined
    const maxPrice = searchParams.get("maxPrice") ? Number.parseInt(searchParams.get("maxPrice")!) : undefined
    const propertyType = searchParams.get("propertyType") || "all"
    const status = searchParams.get("status") || "for_sale"
    const page = searchParams.get("page") ? Number.parseInt(searchParams.get("page")!) : 1

    console.log("Fetching properties for:", { location, minPrice, maxPrice, propertyType, status, page })

    // Check if we have Zillow API key
    const zillowApiKey = process.env.NEXT_PUBLIC_ZILLOW_API_KEY
    if (!zillowApiKey) {
      console.warn("Zillow API key not found, using fallback data")
      return NextResponse.json({
        properties: getFallbackProperties(location, minPrice, maxPrice, propertyType, status),
        total: 6,
        message: "Using fallback data - Zillow API key not configured",
        source: "fallback",
      })
    }

    // Create cache key
    const cacheKey = `${location}-${minPrice}-${maxPrice}-${propertyType}-${status}-${page}`

    // Check cache first
    const cached = cache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log("Returning cached data for:", cacheKey)
      return NextResponse.json({
        ...cached.data,
        message: "Data from cache",
        source: "cache",
      })
    }

    // Initialize Zillow API client
    const zillowClient = new ZillowApiClient(zillowApiKey)

    // Transform status for Zillow API
    const zillowStatus = transformStatusForZillow(status)

    // Transform property type for Zillow API
    const zillowPropertyType = transformPropertyTypeForZillow(propertyType)

    // Search properties using Zillow API
    const searchParams_zillow = {
      location,
      status_type: zillowStatus,
      page,
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      ...(zillowPropertyType !== "all" && { home_type: zillowPropertyType }),
    }

    const zillowResponse = await zillowClient.searchProperties(searchParams_zillow)

    // Transform Zillow properties to our format
    const properties: Property[] = zillowResponse.results.map(transformZillowProperty)

    // Filter properties by price range if needed (additional client-side filtering)
    const filteredProperties = properties.filter((property) => {
      if (minPrice && property.price < minPrice) return false
      if (maxPrice && property.price > maxPrice) return false
      return true
    })

    const responseData = {
      properties: filteredProperties,
      total: zillowResponse.totalResultCount,
      page,
      message: "Data from Zillow API",
      source: "zillow",
    }

    // Cache the response
    cache.set(cacheKey, { data: responseData, timestamp: Date.now() })

    return NextResponse.json(responseData)
  } catch (error) {
    console.error("Zillow API Error:", error)

    // Return fallback data on error
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location") || "New York, NY"
    const minPrice = searchParams.get("minPrice") ? Number.parseInt(searchParams.get("minPrice")!) : undefined
    const maxPrice = searchParams.get("maxPrice") ? Number.parseInt(searchParams.get("maxPrice")!) : undefined
    const propertyType = searchParams.get("propertyType") || "all"
    const status = searchParams.get("status") || "for_sale"

    return NextResponse.json({
      properties: getFallbackProperties(location, minPrice, maxPrice, propertyType, status),
      total: 6,
      error: (error as Error)?.message, // pass message but still degrade gracefully
      rateLimited: (error as Error)?.message?.includes("Rate-Limit") || false,
      message: "Using cached / fallback data because Zillow rate-limit or error was hit",
      source: "fallback",
    })
  }
}

function transformStatusForZillow(status: string): "ForSale" | "ForRent" | "RecentlySold" {
  const statusMap: Record<string, "ForSale" | "ForRent" | "RecentlySold"> = {
    for_sale: "ForSale",
    for_rent: "ForRent",
    recently_sold: "RecentlySold",
  }

  return statusMap[status] || "ForSale"
}

function transformPropertyTypeForZillow(type: string): string {
  const typeMap: Record<string, string> = {
    single_family: "SINGLE_FAMILY",
    condo: "CONDO",
    townhouse: "TOWNHOUSE",
    multi_family: "MULTI_FAMILY",
    apartment: "APARTMENT",
    all: "all",
  }

  return typeMap[type] || "all"
}

function getFallbackProperties(
  location: string,
  minPrice?: number,
  maxPrice?: number,
  propertyType?: string,
  status?: string,
): Property[] {
  // Return enhanced fallback data when Zillow API is unavailable
  const fallbackProperties: Property[] = [
    {
      id: "fallback-1",
      title: "Luxury Manhattan Penthouse",
      description: "Stunning penthouse with panoramic city views and premium finishes throughout.",
      price: 4500000,
      monthlyPayment: 16875,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      ],
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
      holographicFeatures: ["Smart Home Integration", "Holographic Displays", "AI Climate Control"],
      has360View: true,
      daysOnMarket: 12,
      pricePerSqft: 1406,
      zestimate: 4600000,
      walkScore: 95,
    },
    {
      id: "fallback-2",
      title: "Modern Brooklyn Condo",
      description: "Contemporary condo with industrial touches and Brooklyn Bridge views.",
      price: 1200000,
      monthlyPayment: 4500,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      ],
      type: "Condo",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1100,
      yearBuilt: 2019,
      rating: 4.5,
      location: "Brooklyn, NY",
      status: "For Sale",
      features: ["Modern Design", "City Views", "Gym Access", "Rooftop Deck"],
      isHolographic: false,
      has360View: false,
      daysOnMarket: 25,
      pricePerSqft: 1091,
      zestimate: 1180000,
      walkScore: 88,
    },
  ]

  // Filter fallback properties based on search criteria
  return fallbackProperties.filter((property) => {
    if (minPrice && property.price < minPrice) return false
    if (maxPrice && property.price > maxPrice) return false
    if (propertyType && propertyType !== "all" && property.type.toLowerCase().replace(/\s+/g, "_") !== propertyType)
      return false
    return true
  })
}

// Clean up old cache entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > CACHE_DURATION * 2) {
      cache.delete(key)
    }
  }
}, CACHE_DURATION)
