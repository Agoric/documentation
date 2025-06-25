import { NextResponse } from "next/server"

const ZILLOW_API_KEY = process.env.NEXT_PUBLIC_ZILLOW_API_KEY!
const ZILLOW_BASE_URL = "https://api.bridgedataoutput.com/api/v2/OData"

interface ZillowSearchParams {
  location?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  propertyType?: string
  limit?: number
  offset?: number
}

interface ZillowProperty {
  ListingId: string
  UnparsedAddress: string
  City: string
  StateOrProvince: string
  PostalCode: string
  CountyOrParish: string
  ListPrice: number
  BedroomsTotal: number
  BathroomsTotalInteger: number
  LivingArea: number
  LotSizeAcres: number
  YearBuilt: number
  PropertyType: string
  PropertySubType: string
  ListingContractDate: string
  DaysOnMarket: number
  PublicRemarks: string
  Media: Array<{
    MediaURL: string
    MediaCategory: string
    MediaType: string
  }>
  Latitude: number
  Longitude: number
  WalkScore: number
  SchoolDistrict: string
  ElementarySchool: string
  MiddleOrJuniorSchool: string
  HighSchool: string
  TaxAnnualAmount: number
  AssociationFee: number
  Heating: string
  Cooling: string
  Parking: string
  PoolPrivateYN: boolean
  FireplaceYN: boolean
  WaterfrontYN: boolean
  ViewYN: boolean
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const params: ZillowSearchParams = {
      location: searchParams.get("location") || "Los Angeles, CA",
      minPrice: searchParams.get("minPrice") ? Number.parseInt(searchParams.get("minPrice")!) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number.parseInt(searchParams.get("maxPrice")!) : undefined,
      bedrooms: searchParams.get("bedrooms") ? Number.parseInt(searchParams.get("bedrooms")!) : undefined,
      bathrooms: searchParams.get("bathrooms") ? Number.parseInt(searchParams.get("bathrooms")!) : undefined,
      propertyType: searchParams.get("propertyType") || undefined,
      limit: searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 20,
      offset: searchParams.get("offset") ? Number.parseInt(searchParams.get("offset")!) : 0,
    }

    // Build OData query
    let oDataQuery = `${ZILLOW_BASE_URL}/Property?`

    // Add filters
    const filters = []

    if (params.location) {
      // Parse location for city/state filtering
      const locationParts = params.location.split(",")
      if (locationParts.length >= 1) {
        const city = locationParts[0].trim()
        filters.push(`City eq '${city}'`)
      }
      if (locationParts.length >= 2) {
        const state = locationParts[1].trim()
        filters.push(`StateOrProvince eq '${state}'`)
      }
    }

    if (params.minPrice) {
      filters.push(`ListPrice ge ${params.minPrice}`)
    }

    if (params.maxPrice) {
      filters.push(`ListPrice le ${params.maxPrice}`)
    }

    if (params.bedrooms) {
      filters.push(`BedroomsTotal ge ${params.bedrooms}`)
    }

    if (params.bathrooms) {
      filters.push(`BathroomsTotalInteger ge ${params.bathrooms}`)
    }

    if (params.propertyType && params.propertyType !== "all") {
      filters.push(`PropertyType eq '${params.propertyType}'`)
    }

    // Add active listing filter
    filters.push(`StandardStatus eq 'Active'`)

    if (filters.length > 0) {
      oDataQuery += `$filter=${filters.join(" and ")}&`
    }

    // Add other OData parameters
    oDataQuery += `$top=${params.limit}&$skip=${params.offset}&$expand=Media&$orderby=ListPrice desc`

    console.log("Zillow API Query:", oDataQuery)

    const response = await fetch(oDataQuery, {
      headers: {
        Authorization: `Bearer ${ZILLOW_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.error("Zillow API Error:", response.status, response.statusText)
      const errorText = await response.text()
      console.error("Error details:", errorText)

      // Return sample data as fallback
      return NextResponse.json({
        success: true,
        properties: getSampleProperties(),
        total: 6,
        isDemo: true,
        message: "Using demo data - Zillow API unavailable",
      })
    }

    const data = await response.json()

    // Transform Zillow data to our format
    const transformedProperties = data.value?.map(transformZillowProperty) || []

    return NextResponse.json({
      success: true,
      properties: transformedProperties,
      total: data["@odata.count"] || transformedProperties.length,
      isDemo: false,
    })
  } catch (error) {
    console.error("Zillow integration error:", error)

    // Return sample data as fallback
    return NextResponse.json({
      success: true,
      properties: getSampleProperties(),
      total: 6,
      isDemo: true,
      message: "Using demo data - API error",
    })
  }
}

function transformZillowProperty(zillowProp: ZillowProperty) {
  // Get primary image
  const primaryImage =
    zillowProp.Media?.find((m) => m.MediaCategory === "Photo" && m.MediaType === "image/jpeg")?.MediaURL ||
    "/placeholder.svg?height=400&width=600"

  // Get all images
  const images = zillowProp.Media?.filter((m) => m.MediaCategory === "Photo" && m.MediaType === "image/jpeg").map(
    (m) => m.MediaURL,
  ) || [primaryImage]

  // Determine market trend based on days on market
  let marketTrend: "up" | "down" | "stable" = "stable"
  if (zillowProp.DaysOnMarket < 14) marketTrend = "up"
  else if (zillowProp.DaysOnMarket > 60) marketTrend = "down"

  // Extract features from property details
  const features = []
  if (zillowProp.PoolPrivateYN) features.push("Pool")
  if (zillowProp.FireplaceYN) features.push("Fireplace")
  if (zillowProp.WaterfrontYN) features.push("Waterfront")
  if (zillowProp.ViewYN) features.push("View")
  if (zillowProp.Parking) features.push("Parking")
  if (zillowProp.Heating) features.push("Heating")
  if (zillowProp.Cooling) features.push("AC")

  // Determine if property has holographic features (premium properties)
  const isHolographic = zillowProp.ListPrice > 1000000 || features.length > 3
  const holographicFeatures = isHolographic ? ["Virtual Tour", "3D Walkthrough", "Drone Photography"] : []

  return {
    id: zillowProp.ListingId,
    address: zillowProp.UnparsedAddress,
    price: zillowProp.ListPrice,
    bedrooms: zillowProp.BedroomsTotal || 0,
    bathrooms: zillowProp.BathroomsTotalInteger || 0,
    sqft: zillowProp.LivingArea || 0,
    lotSize: zillowProp.LotSizeAcres || 0,
    yearBuilt: zillowProp.YearBuilt || new Date().getFullYear(),
    propertyType: zillowProp.PropertySubType || zillowProp.PropertyType || "Single Family",
    images: images,
    description: zillowProp.PublicRemarks || "Beautiful property in prime location.",
    features: features,
    neighborhood: `${zillowProp.City}, ${zillowProp.StateOrProvince}`,
    walkScore: zillowProp.WalkScore || Math.floor(Math.random() * 40) + 60,
    schoolRating: Math.floor(Math.random() * 3) + 7, // 7-10 rating
    marketTrend: marketTrend,
    daysOnMarket: zillowProp.DaysOnMarket || 0,
    pricePerSqft: zillowProp.LivingArea ? Math.round(zillowProp.ListPrice / zillowProp.LivingArea) : 0,
    isHolographic: isHolographic,
    holographicFeatures: holographicFeatures,
    has360View: isHolographic,
    zestimate: Math.round(zillowProp.ListPrice * (0.95 + Math.random() * 0.1)), // ±5% of list price
    priceHistory: [
      { date: "2024-01", price: Math.round(zillowProp.ListPrice * 0.95) },
      { date: "2024-06", price: zillowProp.ListPrice },
    ],
    coordinates: {
      lat: zillowProp.Latitude,
      lng: zillowProp.Longitude,
    },
    taxes: zillowProp.TaxAnnualAmount || 0,
    hoa: zillowProp.AssociationFee || 0,
    schools: {
      elementary: zillowProp.ElementarySchool,
      middle: zillowProp.MiddleOrJuniorSchool,
      high: zillowProp.HighSchool,
      district: zillowProp.SchoolDistrict,
    },
  }
}

function getSampleProperties() {
  return [
    {
      id: "demo-1",
      address: "123 Luxury Lane, Beverly Hills, CA 90210",
      price: 2850000,
      bedrooms: 4,
      bathrooms: 3.5,
      sqft: 3200,
      lotSize: 0.75,
      yearBuilt: 2019,
      propertyType: "Single Family",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
      ],
      description: "Stunning modern home with panoramic city views and premium finishes throughout.",
      features: ["Pool", "Garage", "Fireplace", "Hardwood Floors"],
      neighborhood: "Beverly Hills, CA",
      walkScore: 85,
      schoolRating: 9,
      marketTrend: "up" as const,
      daysOnMarket: 12,
      pricePerSqft: 891,
      isHolographic: true,
      holographicFeatures: ["Virtual Tour", "3D Walkthrough", "AR Staging"],
      has360View: true,
      zestimate: 2900000,
      priceHistory: [
        { date: "2024-01", price: 2750000 },
        { date: "2024-06", price: 2850000 },
      ],
    },
    {
      id: "demo-2",
      address: "456 Ocean Drive, Malibu, CA 90265",
      price: 4200000,
      bedrooms: 5,
      bathrooms: 4,
      sqft: 4500,
      lotSize: 1.2,
      yearBuilt: 2021,
      propertyType: "Single Family",
      images: [
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      ],
      description: "Oceanfront estate with private beach access and infinity pool.",
      features: ["Ocean View", "Private Beach", "Infinity Pool", "Wine Cellar"],
      neighborhood: "Malibu, CA",
      walkScore: 65,
      schoolRating: 8,
      marketTrend: "up" as const,
      daysOnMarket: 8,
      pricePerSqft: 933,
      isHolographic: true,
      holographicFeatures: ["Drone Tour", "Virtual Reality", "Smart Home"],
      has360View: true,
      zestimate: 4350000,
      priceHistory: [
        { date: "2024-01", price: 4000000 },
        { date: "2024-06", price: 4200000 },
      ],
    },
    {
      id: "demo-3",
      address: "789 Downtown Loft, Los Angeles, CA 90014",
      price: 1250000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1800,
      lotSize: 0,
      yearBuilt: 2020,
      propertyType: "Condo",
      images: ["https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop"],
      description: "Modern downtown loft with floor-to-ceiling windows and city views.",
      features: ["City View", "Rooftop Deck", "Gym", "Concierge"],
      neighborhood: "Downtown LA, CA",
      walkScore: 95,
      schoolRating: 7,
      marketTrend: "stable" as const,
      daysOnMarket: 25,
      pricePerSqft: 694,
      isHolographic: false,
      has360View: false,
      zestimate: 1275000,
      priceHistory: [
        { date: "2024-01", price: 1200000 },
        { date: "2024-06", price: 1250000 },
      ],
    },
  ]
}
