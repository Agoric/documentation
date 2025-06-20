import { type NextRequest, NextResponse } from "next/server"

interface Property {
  id: string
  title: string
  description: string
  price: number
  monthlyPayment: number
  image: string
  images: string[]
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
  virtualTourUrl?: string
  floorPlanUrl?: string
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

    // Generate realistic properties with actual property images
    const properties = generateRealisticProperties(location, minPrice, maxPrice, propertyType, status)

    return NextResponse.json({
      properties,
      total: properties.length,
      message: "Enhanced property database with high-quality images",
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
      imagePrefix: "nyc",
    },
    "Los Angeles, CA": {
      city: "Los Angeles",
      state: "CA",
      avgPrice: 900000,
      priceRange: [500000, 5000000],
      neighborhoods: ["Beverly Hills", "Hollywood", "Santa Monica", "Venice"],
      types: ["Single Family", "Condo", "Townhouse", "Villa"],
      imagePrefix: "la",
    },
    "Miami, FL": {
      city: "Miami",
      state: "FL",
      avgPrice: 650000,
      priceRange: [300000, 3000000],
      neighborhoods: ["South Beach", "Brickell", "Coral Gables", "Wynwood"],
      types: ["Condo", "Single Family", "Townhouse", "Penthouse"],
      imagePrefix: "miami",
    },
    "Austin, TX": {
      city: "Austin",
      state: "TX",
      avgPrice: 550000,
      priceRange: [250000, 2000000],
      neighborhoods: ["Downtown", "South Austin", "East Austin", "Westlake"],
      types: ["Single Family", "Condo", "Townhouse", "Ranch"],
      imagePrefix: "austin",
    },
    "Chicago, IL": {
      city: "Chicago",
      state: "IL",
      avgPrice: 450000,
      priceRange: [200000, 2500000],
      neighborhoods: ["Loop", "Lincoln Park", "Wicker Park", "Gold Coast"],
      types: ["Condo", "Single Family", "Townhouse", "Loft"],
      imagePrefix: "chicago",
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
      imagePrefix: "generic",
    }
  )
}

function generatePropertyImages(
  locationData: any,
  propertyType: string,
  index: number,
): { image: string; images: string[] } {
  const imagePrefix = locationData.imagePrefix
  const typeSlug = propertyType.toLowerCase().replace(/\s+/g, "-")

  // Generate realistic property image URLs
  const baseImageUrl = "https://images.unsplash.com"

  // Property type specific image collections
  const imageCollections = {
    condo: [
      `${baseImageUrl}/1600x900/?modern-condo-interior`,
      `${baseImageUrl}/1600x900/?luxury-apartment-living-room`,
      `${baseImageUrl}/1600x900/?modern-kitchen-granite`,
      `${baseImageUrl}/1600x900/?city-view-balcony`,
      `${baseImageUrl}/1600x900/?master-bedroom-modern`,
      `${baseImageUrl}/1600x900/?bathroom-marble-luxury`,
    ],
    "single-family": [
      `${baseImageUrl}/1600x900/?suburban-house-exterior`,
      `${baseImageUrl}/1600x900/?family-home-living-room`,
      `${baseImageUrl}/1600x900/?modern-kitchen-island`,
      `${baseImageUrl}/1600x900/?backyard-garden-patio`,
      `${baseImageUrl}/1600x900/?master-suite-bedroom`,
      `${baseImageUrl}/1600x900/?home-office-study`,
    ],
    townhouse: [
      `${baseImageUrl}/1600x900/?townhouse-row-exterior`,
      `${baseImageUrl}/1600x900/?townhouse-living-space`,
      `${baseImageUrl}/1600x900/?narrow-kitchen-design`,
      `${baseImageUrl}/1600x900/?townhouse-stairs-hallway`,
      `${baseImageUrl}/1600x900/?rooftop-terrace-deck`,
      `${baseImageUrl}/1600x900/?basement-recreation-room`,
    ],
    penthouse: [
      `${baseImageUrl}/1600x900/?penthouse-skyline-view`,
      `${baseImageUrl}/1600x900/?luxury-penthouse-living`,
      `${baseImageUrl}/1600x900/?gourmet-kitchen-penthouse`,
      `${baseImageUrl}/1600x900/?penthouse-terrace-city`,
      `${baseImageUrl}/1600x900/?master-suite-luxury`,
      `${baseImageUrl}/1600x900/?wine-cellar-luxury`,
    ],
    villa: [
      `${baseImageUrl}/1600x900/?mediterranean-villa-exterior`,
      `${baseImageUrl}/1600x900/?villa-grand-entrance`,
      `${baseImageUrl}/1600x900/?villa-gourmet-kitchen`,
      `${baseImageUrl}/1600x900/?infinity-pool-villa`,
      `${baseImageUrl}/1600x900/?villa-master-bedroom`,
      `${baseImageUrl}/1600x900/?villa-wine-cellar`,
    ],
    loft: [
      `${baseImageUrl}/1600x900/?industrial-loft-space`,
      `${baseImageUrl}/1600x900/?loft-exposed-brick`,
      `${baseImageUrl}/1600x900/?loft-open-kitchen`,
      `${baseImageUrl}/1600x900/?loft-high-ceilings`,
      `${baseImageUrl}/1600x900/?loft-bedroom-mezzanine`,
      `${baseImageUrl}/1600x900/?loft-artist-studio`,
    ],
    ranch: [
      `${baseImageUrl}/1600x900/?ranch-style-home`,
      `${baseImageUrl}/1600x900/?ranch-open-floor-plan`,
      `${baseImageUrl}/1600x900/?ranch-country-kitchen`,
      `${baseImageUrl}/1600x900/?ranch-covered-porch`,
      `${baseImageUrl}/1600x900/?ranch-master-bedroom`,
      `${baseImageUrl}/1600x900/?ranch-backyard-landscape`,
    ],
  }

  // Get images for the property type
  const typeImages = imageCollections[typeSlug as keyof typeof imageCollections] || imageCollections["single-family"]

  // Select a primary image and additional gallery images
  const primaryImageIndex = index % typeImages.length
  const primaryImage = typeImages[primaryImageIndex]

  // Generate 4-8 additional images for the gallery
  const galleryCount = Math.floor(Math.random() * 5) + 4
  const galleryImages = []

  for (let i = 0; i < galleryCount; i++) {
    const imageIndex = (primaryImageIndex + i + 1) % typeImages.length
    galleryImages.push(typeImages[imageIndex])
  }

  return {
    image: primaryImage,
    images: [primaryImage, ...galleryImages],
  }
}

function generate360Images(propertyType: string): string[] {
  const baseUrl = "https://images.unsplash.com"

  const room360Images = [
    `${baseUrl}/1920x1080/?360-living-room-panoramic`,
    `${baseUrl}/1920x1080/?360-kitchen-panoramic`,
    `${baseUrl}/1920x1080/?360-master-bedroom-panoramic`,
    `${baseUrl}/1920x1080/?360-bathroom-panoramic`,
    `${baseUrl}/1920x1080/?360-dining-room-panoramic`,
    `${baseUrl}/1920x1080/?360-balcony-view-panoramic`,
  ]

  return room360Images
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

  // Generate realistic property images
  const { image, images } = generatePropertyImages(locationData, propertyTypeActual, index)
  const has360View = Math.random() > 0.4 // 60% chance for 360 view
  const images360 = has360View ? generate360Images(propertyTypeActual) : undefined

  return {
    id: `prop-${locationData.city.toLowerCase()}-${index + 1}`,
    title: `${propertyTypeActual} in ${neighborhood}`,
    description: generatePropertyDescription(propertyTypeActual, bedrooms, bathrooms, neighborhood, isHolographic),
    price,
    monthlyPayment,
    image,
    images,
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
    has360View,
    images360,
    daysOnMarket,
    pricePerSqft: Math.round(price / sqft),
    virtualTourUrl: has360View ? `https://virtualtour.example.com/property-${index + 1}` : undefined,
    floorPlanUrl: `https://floorplan.example.com/property-${index + 1}.pdf`,
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

function getDefaultProperties(): Property[] {
  return [
    {
      id: "default-1",
      title: "Luxury Manhattan Penthouse",
      description: "Stunning penthouse with panoramic city views and premium finishes throughout.",
      price: 4500000,
      monthlyPayment: 16875,
      image: "https://images.unsplash.com/1600x900/?penthouse-skyline-view",
      images: [
        "https://images.unsplash.com/1600x900/?penthouse-skyline-view",
        "https://images.unsplash.com/1600x900/?luxury-penthouse-living",
        "https://images.unsplash.com/1600x900/?gourmet-kitchen-penthouse",
        "https://images.unsplash.com/1600x900/?penthouse-terrace-city",
        "https://images.unsplash.com/1600x900/?master-suite-luxury",
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
      holographicFeatures: ["Smart Home Integration", "Holographic Displays", "AI Climate Control", "Neural Interface"],
      has360View: true,
      images360: generate360Images("Penthouse"),
      daysOnMarket: 12,
      pricePerSqft: 1406,
      virtualTourUrl: "https://virtualtour.example.com/property-default-1",
      floorPlanUrl: "https://floorplan.example.com/property-default-1.pdf",
    },
  ]
}
