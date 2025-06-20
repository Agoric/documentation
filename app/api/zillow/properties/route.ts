import { type NextRequest, NextResponse } from "next/server"
import { ZillowApiClient, ZillowSubscriptionError } from "@/lib/zillow-api-client"
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
    // -------- existing console.log stays ----------
    console.error("Zillow API Error:", error)

    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location") || "New York, NY"
    const minPrice = searchParams.get("minPrice") ? Number.parseInt(searchParams.get("minPrice")!) : undefined
    const maxPrice = searchParams.get("maxPrice") ? Number.parseInt(searchParams.get("maxPrice")!) : undefined
    const propertyType = searchParams.get("propertyType") || "all"
    const status = searchParams.get("status") || "for_sale"

    const isSubError = error instanceof ZillowSubscriptionError

    return NextResponse.json(
      {
        properties: getFallbackProperties(location, minPrice, maxPrice, propertyType, status),
        total: 20,
        error: (error as Error).message,
        subscriptionRequired: isSubError,
        message: isSubError
          ? "Zillow API subscription required – using demo data"
          : "Using fallback data due to Zillow API error",
        source: "fallback",
      },
      { status: 200 },
    )
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
  // Comprehensive fallback property collection
  const allFallbackProperties: Property[] = [
    // Manhattan Properties
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
    {
      id: "fallback-3",
      title: "Historic Upper East Side Townhouse",
      description: "Elegant pre-war townhouse with original details and modern amenities.",
      price: 8500000,
      monthlyPayment: 31875,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop",
      ],
      type: "Townhouse",
      bedrooms: 5,
      bathrooms: 4.5,
      sqft: 4800,
      yearBuilt: 1925,
      rating: 4.8,
      location: "Upper East Side, NY",
      status: "For Sale",
      features: ["Historic Details", "Private Garden", "Wine Cellar", "Elevator", "Fireplace"],
      isHolographic: true,
      holographicFeatures: ["Historical AR Tours", "Smart Climate Control", "Security System"],
      has360View: true,
      daysOnMarket: 45,
      pricePerSqft: 1771,
      zestimate: 8200000,
      walkScore: 92,
    },
    // Los Angeles Properties
    {
      id: "fallback-4",
      title: "Beverly Hills Modern Villa",
      description: "Stunning contemporary villa with infinity pool and city views.",
      price: 6800000,
      monthlyPayment: 25500,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      ],
      type: "Villa",
      bedrooms: 6,
      bathrooms: 7,
      sqft: 5200,
      yearBuilt: 2021,
      rating: 4.9,
      location: "Beverly Hills, CA",
      status: "For Sale",
      features: ["Infinity Pool", "Home Theater", "Wine Cellar", "Smart Home", "Guest House"],
      isHolographic: true,
      holographicFeatures: ["Holographic Entertainment", "AI Pool Control", "Smart Glass Windows"],
      has360View: true,
      daysOnMarket: 18,
      pricePerSqft: 1308,
      zestimate: 6900000,
      walkScore: 65,
    },
    {
      id: "fallback-5",
      title: "Santa Monica Beach Condo",
      description: "Oceanfront condo with direct beach access and panoramic ocean views.",
      price: 2800000,
      monthlyPayment: 10500,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=800&h=600&fit=crop",
      ],
      type: "Condo",
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 1800,
      yearBuilt: 2018,
      rating: 4.7,
      location: "Santa Monica, CA",
      status: "For Sale",
      features: ["Ocean Views", "Beach Access", "Balcony", "Concierge", "Gym Access"],
      isHolographic: false,
      has360View: true,
      daysOnMarket: 32,
      pricePerSqft: 1556,
      zestimate: 2750000,
      walkScore: 91,
    },
    // Miami Properties
    {
      id: "fallback-6",
      title: "South Beach Art Deco Penthouse",
      description: "Iconic Art Deco building penthouse with Miami Beach lifestyle.",
      price: 3200000,
      monthlyPayment: 12000,
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      ],
      type: "Penthouse",
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2400,
      yearBuilt: 1938,
      rating: 4.6,
      location: "South Beach, FL",
      status: "For Sale",
      features: ["Art Deco Design", "Ocean Views", "Rooftop Access", "Historic Building"],
      isHolographic: false,
      has360View: false,
      daysOnMarket: 28,
      pricePerSqft: 1333,
      zestimate: 3100000,
      walkScore: 89,
    },
    {
      id: "fallback-7",
      title: "Brickell Avenue High-Rise Condo",
      description: "Modern high-rise living in Miami's financial district with bay views.",
      price: 1800000,
      monthlyPayment: 6750,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      ],
      type: "Condo",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1400,
      yearBuilt: 2020,
      rating: 4.5,
      location: "Brickell, FL",
      status: "For Sale",
      features: ["Bay Views", "Infinity Pool", "Spa", "Concierge", "Smart Home"],
      isHolographic: true,
      holographicFeatures: ["Smart Home Integration", "Holographic Concierge"],
      has360View: true,
      daysOnMarket: 15,
      pricePerSqft: 1286,
      zestimate: 1750000,
      walkScore: 85,
    },
    // Chicago Properties
    {
      id: "fallback-8",
      title: "Gold Coast Historic Mansion",
      description: "Magnificent Gilded Age mansion with original architectural details.",
      price: 5500000,
      monthlyPayment: 20625,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop",
      ],
      type: "Single Family",
      bedrooms: 7,
      bathrooms: 6,
      sqft: 6500,
      yearBuilt: 1895,
      rating: 4.8,
      location: "Gold Coast, IL",
      status: "For Sale",
      features: ["Historic Details", "Grand Staircase", "Library", "Wine Cellar", "Garden"],
      isHolographic: false,
      has360View: true,
      daysOnMarket: 65,
      pricePerSqft: 846,
      zestimate: 5200000,
      walkScore: 94,
    },
    {
      id: "fallback-9",
      title: "Lincoln Park Modern Townhouse",
      description: "Contemporary townhouse near Lincoln Park Zoo with rooftop deck.",
      price: 2200000,
      monthlyPayment: 8250,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      ],
      type: "Townhouse",
      bedrooms: 4,
      bathrooms: 3.5,
      sqft: 2800,
      yearBuilt: 2017,
      rating: 4.6,
      location: "Lincoln Park, IL",
      status: "For Sale",
      features: ["Rooftop Deck", "Modern Kitchen", "Garage", "Smart Home", "Fireplace"],
      isHolographic: true,
      holographicFeatures: ["Smart Climate Control", "Automated Lighting"],
      has360View: false,
      daysOnMarket: 22,
      pricePerSqft: 786,
      zestimate: 2150000,
      walkScore: 87,
    },
    // Austin Properties
    {
      id: "fallback-10",
      title: "Downtown Austin Luxury Loft",
      description: "Industrial loft conversion in the heart of downtown Austin.",
      price: 950000,
      monthlyPayment: 3563,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      ],
      type: "Loft",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1600,
      yearBuilt: 2015,
      rating: 4.4,
      location: "Downtown, TX",
      status: "For Sale",
      features: ["Exposed Brick", "High Ceilings", "Industrial Design", "City Views"],
      isHolographic: false,
      has360View: false,
      daysOnMarket: 18,
      pricePerSqft: 594,
      zestimate: 920000,
      walkScore: 92,
    },
    {
      id: "fallback-11",
      title: "Westlake Hills Contemporary Home",
      description: "Modern home with Hill Country views and resort-style amenities.",
      price: 1850000,
      monthlyPayment: 6938,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      ],
      type: "Single Family",
      bedrooms: 4,
      bathrooms: 3.5,
      sqft: 3200,
      yearBuilt: 2019,
      rating: 4.7,
      location: "Westlake, TX",
      status: "For Sale",
      features: ["Hill Country Views", "Swimming Pool", "Outdoor Kitchen", "Smart Home"],
      isHolographic: true,
      holographicFeatures: ["Smart Pool Control", "Automated Outdoor Systems"],
      has360View: true,
      daysOnMarket: 35,
      pricePerSqft: 578,
      zestimate: 1800000,
      walkScore: 45,
    },
    // Seattle Properties
    {
      id: "fallback-12",
      title: "Capitol Hill Victorian Restoration",
      description: "Beautifully restored Victorian home in trendy Capitol Hill.",
      price: 1650000,
      monthlyPayment: 6188,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop",
      ],
      type: "Single Family",
      bedrooms: 4,
      bathrooms: 2.5,
      sqft: 2400,
      yearBuilt: 1905,
      rating: 4.5,
      location: "Capitol Hill, WA",
      status: "For Sale",
      features: ["Victorian Details", "Restored Hardwood", "Modern Kitchen", "Garden"],
      isHolographic: false,
      has360View: false,
      daysOnMarket: 28,
      pricePerSqft: 688,
      zestimate: 1600000,
      walkScore: 89,
    },
    {
      id: "fallback-13",
      title: "Belltown High-Rise Condo",
      description: "Modern condo with Puget Sound views in downtown Seattle.",
      price: 1200000,
      monthlyPayment: 4500,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      ],
      type: "Condo",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1100,
      yearBuilt: 2018,
      rating: 4.4,
      location: "Belltown, WA",
      status: "For Sale",
      features: ["Water Views", "Concierge", "Gym Access", "Rooftop Deck"],
      isHolographic: false,
      has360View: true,
      daysOnMarket: 42,
      pricePerSqft: 1091,
      zestimate: 1150000,
      walkScore: 95,
    },
    // Boston Properties
    {
      id: "fallback-14",
      title: "Back Bay Brownstone",
      description: "Classic Boston brownstone with modern renovations and original charm.",
      price: 3800000,
      monthlyPayment: 14250,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop",
      ],
      type: "Townhouse",
      bedrooms: 5,
      bathrooms: 4,
      sqft: 3500,
      yearBuilt: 1885,
      rating: 4.7,
      location: "Back Bay, MA",
      status: "For Sale",
      features: ["Historic Details", "Renovated Kitchen", "Roof Deck", "Fireplace"],
      isHolographic: false,
      has360View: true,
      daysOnMarket: 55,
      pricePerSqft: 1086,
      zestimate: 3700000,
      walkScore: 96,
    },
    {
      id: "fallback-15",
      title: "Seaport District Modern Condo",
      description: "Ultra-modern condo in Boston's newest luxury development.",
      price: 2400000,
      monthlyPayment: 9000,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      ],
      type: "Condo",
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 1800,
      yearBuilt: 2022,
      rating: 4.8,
      location: "Seaport, MA",
      status: "For Sale",
      features: ["Harbor Views", "Smart Home", "Concierge", "Gym", "Pool"],
      isHolographic: true,
      holographicFeatures: ["Smart Home Integration", "Holographic Concierge", "AI Climate Control"],
      has360View: true,
      daysOnMarket: 8,
      pricePerSqft: 1333,
      zestimate: 2350000,
      walkScore: 88,
    },
    // Denver Properties
    {
      id: "fallback-16",
      title: "LoDo Warehouse Loft",
      description: "Converted warehouse loft in Denver's historic Lower Downtown.",
      price: 875000,
      monthlyPayment: 3281,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      ],
      type: "Loft",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1500,
      yearBuilt: 2016,
      rating: 4.3,
      location: "LoDo, CO",
      status: "For Sale",
      features: ["Exposed Brick", "High Ceilings", "Mountain Views", "Industrial Design"],
      isHolographic: false,
      has360View: false,
      daysOnMarket: 25,
      pricePerSqft: 583,
      zestimate: 850000,
      walkScore: 91,
    },
    {
      id: "fallback-17",
      title: "Cherry Creek Contemporary Home",
      description: "Modern home near Cherry Creek with mountain and city views.",
      price: 1950000,
      monthlyPayment: 7313,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      ],
      type: "Single Family",
      bedrooms: 4,
      bathrooms: 3.5,
      sqft: 3000,
      yearBuilt: 2020,
      rating: 4.6,
      location: "Cherry Creek, CO",
      status: "For Sale",
      features: ["Mountain Views", "Modern Design", "Smart Home", "Three-Car Garage"],
      isHolographic: true,
      holographicFeatures: ["Smart Climate Control", "Automated Security"],
      has360View: true,
      daysOnMarket: 31,
      pricePerSqft: 650,
      zestimate: 1900000,
      walkScore: 72,
    },
    // Nashville Properties
    {
      id: "fallback-18",
      title: "Music Row Historic Home",
      description: "Charming historic home in the heart of Nashville's Music Row.",
      price: 1250000,
      monthlyPayment: 4688,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop",
      ],
      type: "Single Family",
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 2200,
      yearBuilt: 1925,
      rating: 4.4,
      location: "Music Row, TN",
      status: "For Sale",
      features: ["Historic Character", "Hardwood Floors", "Front Porch", "Updated Kitchen"],
      isHolographic: false,
      has360View: false,
      daysOnMarket: 38,
      pricePerSqft: 568,
      zestimate: 1200000,
      walkScore: 78,
    },
    {
      id: "fallback-19",
      title: "Gulch High-Rise Penthouse",
      description: "Luxury penthouse in Nashville's premier downtown district.",
      price: 2800000,
      monthlyPayment: 10500,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      ],
      type: "Penthouse",
      bedrooms: 3,
      bathrooms: 3.5,
      sqft: 2600,
      yearBuilt: 2021,
      rating: 4.8,
      location: "The Gulch, TN",
      status: "For Sale",
      features: ["City Views", "Rooftop Terrace", "Smart Home", "Concierge", "Wine Storage"],
      isHolographic: true,
      holographicFeatures: ["Smart Home Integration", "Holographic Entertainment", "AI Concierge"],
      has360View: true,
      daysOnMarket: 14,
      pricePerSqft: 1077,
      zestimate: 2750000,
      walkScore: 85,
    },
    // Portland Properties
    {
      id: "fallback-20",
      title: "Pearl District Converted Loft",
      description: "Industrial loft conversion in Portland's trendy Pearl District.",
      price: 950000,
      monthlyPayment: 3563,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      ],
      type: "Loft",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1400,
      yearBuilt: 2014,
      rating: 4.5,
      location: "Pearl District, OR",
      status: "For Sale",
      features: ["Exposed Brick", "High Ceilings", "Industrial Windows", "Concrete Floors"],
      isHolographic: false,
      has360View: false,
      daysOnMarket: 22,
      pricePerSqft: 679,
      zestimate: 925000,
      walkScore: 93,
    },
  ]

  // Filter properties based on search criteria
  return allFallbackProperties.filter((property) => {
    if (minPrice && property.price < minPrice) return false
    if (maxPrice && property.price > maxPrice) return false
    if (propertyType && propertyType !== "all") {
      const normalizedPropertyType = property.type.toLowerCase().replace(/\s+/g, "_")
      if (normalizedPropertyType !== propertyType) return false
    }
    if (status && status !== "for_sale" && property.status !== transformStatusDisplay(status)) return false
    return true
  })
}

function transformStatusDisplay(status: string): string {
  const statusMap: Record<string, string> = {
    for_sale: "For Sale",
    for_rent: "For Rent",
    recently_sold: "Recently Sold",
  }
  return statusMap[status] || "For Sale"
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
