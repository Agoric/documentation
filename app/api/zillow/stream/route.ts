import type { NextRequest } from "next/server"

const ZILLOW_API_KEY = process.env.NEXT_PUBLIC_ZILLOW_API_KEY!
const ZILLOW_BASE_URL = "https://api.bridgedataoutput.com/api/v2/OData"

interface StreamParams {
  location?: string
  minPrice?: number
  maxPrice?: number
  propertyType?: string
  batchSize?: number
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams

  const params: StreamParams = {
    location: searchParams.get("location") || "Los Angeles, CA",
    minPrice: searchParams.get("minPrice") ? Number.parseInt(searchParams.get("minPrice")!) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number.parseInt(searchParams.get("maxPrice")!) : undefined,
    propertyType: searchParams.get("propertyType") || undefined,
    batchSize: Number.parseInt(searchParams.get("batchSize") || "5"),
  }

  // Create a readable stream
  const stream = new ReadableStream({
    async start(controller) {
      try {
        await streamProperties(controller, params)
      } catch (error) {
        console.error("Streaming error:", error)
        // Send error and demo data
        const errorData = {
          type: "error",
          message: "API unavailable, showing demo data",
          timestamp: new Date().toISOString(),
        }
        controller.enqueue(`data: ${JSON.stringify(errorData)}\n\n`)

        // Stream demo data
        await streamDemoData(controller)
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Cache-Control",
    },
  })
}

async function streamProperties(controller: ReadableStreamDefaultController, params: StreamParams) {
  let offset = 0
  const limit = params.batchSize || 5
  let hasMore = true
  let totalStreamed = 0

  // Send initial status
  controller.enqueue(
    `data: ${JSON.stringify({
      type: "status",
      message: "Connecting to Zillow API...",
      timestamp: new Date().toISOString(),
    })}\n\n`,
  )

  while (hasMore && totalStreamed < 50) {
    // Limit to 50 properties max
    try {
      // Build query
      let oDataQuery = `${ZILLOW_BASE_URL}/Property?access_token=${ZILLOW_API_KEY}`

      const filters = []

      if (params.location) {
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

      if (params.minPrice) filters.push(`ListPrice ge ${params.minPrice}`)
      if (params.maxPrice) filters.push(`ListPrice le ${params.maxPrice}`)
      if (params.propertyType && params.propertyType !== "all") {
        filters.push(`PropertyType eq '${params.propertyType}'`)
      }

      filters.push(`StandardStatus eq 'Active'`)

      if (filters.length > 0) {
        oDataQuery += `&$filter=${filters.join(" and ")}`
      }

      oDataQuery += `&$top=${limit}&$skip=${offset}&$expand=Media&$orderby=ListPrice desc`

      // Send batch status
      controller.enqueue(
        `data: ${JSON.stringify({
          type: "batch_start",
          batch: Math.floor(offset / limit) + 1,
          message: `Loading properties ${offset + 1}-${offset + limit}...`,
          timestamp: new Date().toISOString(),
        })}\n\n`,
      )

      const response = await fetch(oDataQuery, {
        headers: { "Content-Type": "application/json" },
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()
      const properties = data.value || []

      if (properties.length === 0) {
        hasMore = false
        controller.enqueue(
          `data: ${JSON.stringify({
            type: "complete",
            message: `Streaming complete. ${totalStreamed} properties loaded.`,
            timestamp: new Date().toISOString(),
          })}\n\n`,
        )
        break
      }

      // Transform and stream each property individually
      for (const zillowProp of properties) {
        const transformedProperty = transformZillowProperty(zillowProp)

        controller.enqueue(
          `data: ${JSON.stringify({
            type: "property",
            data: transformedProperty,
            index: totalStreamed,
            timestamp: new Date().toISOString(),
          })}\n\n`,
        )

        totalStreamed++

        // Add small delay for smooth streaming effect
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      offset += limit

      if (properties.length < limit) {
        hasMore = false
      }
    } catch (error) {
      console.error("Batch error:", error)
      controller.enqueue(
        `data: ${JSON.stringify({
          type: "error",
          message: `Error loading batch: ${error}`,
          timestamp: new Date().toISOString(),
        })}\n\n`,
      )
      break
    }
  }

  // Send completion status
  controller.enqueue(
    `data: ${JSON.stringify({
      type: "complete",
      total: totalStreamed,
      message: `Streaming complete. ${totalStreamed} properties loaded.`,
      timestamp: new Date().toISOString(),
    })}\n\n`,
  )
}

async function streamDemoData(controller: ReadableStreamDefaultController) {
  const demoProperties = getSampleProperties()

  controller.enqueue(
    `data: ${JSON.stringify({
      type: "status",
      message: "Loading demo properties...",
      timestamp: new Date().toISOString(),
    })}\n\n`,
  )

  for (let i = 0; i < demoProperties.length; i++) {
    controller.enqueue(
      `data: ${JSON.stringify({
        type: "property",
        data: demoProperties[i],
        index: i,
        isDemo: true,
        timestamp: new Date().toISOString(),
      })}\n\n`,
    )

    // Simulate streaming delay
    await new Promise((resolve) => setTimeout(resolve, 300))
  }

  controller.enqueue(
    `data: ${JSON.stringify({
      type: "complete",
      total: demoProperties.length,
      message: `Demo streaming complete. ${demoProperties.length} properties loaded.`,
      isDemo: true,
      timestamp: new Date().toISOString(),
    })}\n\n`,
  )
}

function transformZillowProperty(zillowProp: any) {
  const primaryImage =
    zillowProp.Media?.find((m: any) => m.MediaCategory === "Photo" && m.MediaType === "image/jpeg")?.MediaURL ||
    "/placeholder.svg?height=400&width=600"

  const images = zillowProp.Media?.filter((m: any) => m.MediaCategory === "Photo" && m.MediaType === "image/jpeg").map(
    (m: any) => m.MediaURL,
  ) || [primaryImage]

  let marketTrend: "up" | "down" | "stable" = "stable"
  if (zillowProp.DaysOnMarket < 14) marketTrend = "up"
  else if (zillowProp.DaysOnMarket > 60) marketTrend = "down"

  const features = []
  if (zillowProp.PoolPrivateYN) features.push("Pool")
  if (zillowProp.FireplaceYN) features.push("Fireplace")
  if (zillowProp.WaterfrontYN) features.push("Waterfront")
  if (zillowProp.ViewYN) features.push("View")
  if (zillowProp.Parking) features.push("Parking")

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
    schoolRating: Math.floor(Math.random() * 3) + 7,
    marketTrend: marketTrend,
    daysOnMarket: zillowProp.DaysOnMarket || 0,
    pricePerSqft: zillowProp.LivingArea ? Math.round(zillowProp.ListPrice / zillowProp.LivingArea) : 0,
    isHolographic: isHolographic,
    holographicFeatures: holographicFeatures,
    has360View: isHolographic,
    zestimate: Math.round(zillowProp.ListPrice * (0.95 + Math.random() * 0.1)),
    priceHistory: [
      { date: "2024-01", price: Math.round(zillowProp.ListPrice * 0.95) },
      { date: "2024-06", price: zillowProp.ListPrice },
    ],
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
      images: ["https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop"],
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
