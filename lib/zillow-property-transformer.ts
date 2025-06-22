import type { ZillowProperty } from "./zillow-api-client"

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
  zestimate?: number
  walkScore?: number
  schools?: Array<{
    name: string
    rating: number
    level: string
    distance: number
  }>
  priceHistory?: Array<{
    date: string
    price: number
    event: string
  }>
}

export function transformZillowProperty(zillowProperty: ZillowProperty): Property {
  const {
    zpid,
    address,
    price,
    bedrooms,
    bathrooms,
    livingArea,
    yearBuilt,
    propertyType,
    homeStatus,
    daysOnZillow,
    photos,
    description,
    zestimate,
    rentZestimate,
    priceHistory,
    schools,
    neighborhood,
    walkScore,
    transitScore,
    bikeScore,
  } = zillowProperty

  // Transform property type
  const transformedType = transformPropertyType(propertyType)

  // Calculate monthly payment (rough estimate at 6.5% interest, 30-year mortgage)
  const monthlyPayment = calculateMonthlyPayment(price, 0.065, 30)

  // Extract images
  const images = photos?.map((photo) => photo.url) || []
  const primaryImage = images[0] || `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(transformedType)}`

  // Generate features from Zillow data
  const features = generateFeaturesFromZillowData(zillowProperty)

  // Determine if property is holographic (premium properties)
  const isHolographic = price > 1000000 || yearBuilt > 2020 || transformedType === "Penthouse"

  // Calculate rating based on various factors
  const rating = calculatePropertyRating(zillowProperty)

  // Format location
  const location = `${address.city}, ${address.state}`

  // Transform status
  const status = transformHomeStatus(homeStatus)

  return {
    id: zpid,
    title: `${transformedType} in ${neighborhood || address.city}`,
    description:
      description || `Beautiful ${transformedType.toLowerCase()} with ${bedrooms} bedrooms and ${bathrooms} bathrooms.`,
    price: price || zestimate || 0,
    monthlyPayment,
    image: primaryImage,
    images,
    type: transformedType,
    bedrooms: bedrooms || 0,
    bathrooms: bathrooms || 0,
    sqft: livingArea || 0,
    yearBuilt: yearBuilt || 0,
    rating,
    location,
    status,
    features,
    isHolographic,
    holographicFeatures: isHolographic ? generateHolographicFeatures() : undefined,
    has360View: Math.random() > 0.7, // 30% chance - would need to check actual Zillow data
    images360: undefined, // Would need to implement 360 image detection
    daysOnMarket: daysOnZillow || 0,
    pricePerSqft: livingArea ? Math.round(price / livingArea) : 0,
    virtualTourUrl: undefined, // Would need to extract from Zillow data
    floorPlanUrl: undefined, // Would need to extract from Zillow data
    zestimate,
    walkScore,
    schools,
    priceHistory,
  }
}

function transformPropertyType(zillowType: string): string {
  const typeMap: Record<string, string> = {
    SINGLE_FAMILY: "Single Family",
    CONDO: "Condo",
    TOWNHOUSE: "Townhouse",
    MULTI_FAMILY: "Multi Family",
    APARTMENT: "Apartment",
    MANUFACTURED: "Manufactured",
    LOT: "Lot",
    MISC: "Other",
  }

  return typeMap[zillowType] || zillowType || "Single Family"
}

function transformHomeStatus(status: string): string {
  const statusMap: Record<string, string> = {
    FOR_SALE: "For Sale",
    FOR_RENT: "For Rent",
    RECENTLY_SOLD: "Recently Sold",
    OFF_MARKET: "Off Market",
    PRE_FORECLOSURE: "Pre-Foreclosure",
    FORECLOSURE: "Foreclosure",
  }

  return statusMap[status] || status || "For Sale"
}

function calculateMonthlyPayment(price: number, interestRate: number, years: number): number {
  if (!price || price <= 0) return 0

  const monthlyRate = interestRate / 12
  const numPayments = years * 12
  const downPayment = price * 0.2 // Assume 20% down payment
  const loanAmount = price - downPayment

  if (monthlyRate === 0) return loanAmount / numPayments

  const monthlyPayment =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) / (Math.pow(1 + monthlyRate, numPayments) - 1)

  return Math.round(monthlyPayment)
}

function generateFeaturesFromZillowData(property: ZillowProperty): string[] {
  const features: string[] = []

  // Add features based on property data
  if (property.yearBuilt && property.yearBuilt > 2015) {
    features.push("Recently Built", "Modern Design")
  }

  if (property.walkScore && property.walkScore > 70) {
    features.push("Walkable Neighborhood")
  }

  if (property.schools && property.schools.some((school) => school.rating > 8)) {
    features.push("Excellent Schools")
  }

  // Add common features based on property type
  const typeFeatures: Record<string, string[]> = {
    Condo: ["Gym Access", "Concierge", "Elevator"],
    "Single Family": ["Garage", "Yard", "Storage Space"],
    Townhouse: ["Multi-Level", "Private Entrance"],
    Penthouse: ["City Views", "Rooftop Access", "Premium Finishes"],
  }

  const propertyType = transformPropertyType(property.propertyType)
  if (typeFeatures[propertyType]) {
    features.push(...typeFeatures[propertyType])
  }

  // Add standard features
  features.push("Updated Kitchen", "Air Conditioning", "Heating", "Natural Light")

  return features.slice(0, 8) // Limit to 8 features
}

function calculatePropertyRating(property: ZillowProperty): number {
  let rating = 3.0 // Base rating

  // Adjust based on various factors
  if (property.yearBuilt && property.yearBuilt > 2010) rating += 0.5
  if (property.walkScore && property.walkScore > 70) rating += 0.3
  if (property.schools && property.schools.length > 0) {
    const avgSchoolRating = property.schools.reduce((sum, school) => sum + school.rating, 0) / property.schools.length
    rating += (avgSchoolRating / 10) * 0.5
  }

  // Cap at 5.0
  return Math.min(5.0, Math.round(rating * 10) / 10)
}

function generateHolographicFeatures(): string[] {
  return ["Smart Home Integration", "Holographic Displays", "AI Climate Control", "Neural Interface"]
}

export type { Property }
