export interface ZillowApiResponse {
  value: ZillowProperty[]
  "@odata.count"?: number
  "@odata.nextLink"?: string
}

export interface ZillowProperty {
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

export function buildZillowQuery(params: {
  location?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  propertyType?: string
  limit?: number
  offset?: number
}): string {
  const baseUrl = "https://api.bridgedataoutput.com/api/v2/OData/Property"
  const filters = []

  // Location filtering
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

  // Price filtering
  if (params.minPrice) {
    filters.push(`ListPrice ge ${params.minPrice}`)
  }
  if (params.maxPrice) {
    filters.push(`ListPrice le ${params.maxPrice}`)
  }

  // Property details filtering
  if (params.bedrooms) {
    filters.push(`BedroomsTotal ge ${params.bedrooms}`)
  }
  if (params.bathrooms) {
    filters.push(`BathroomsTotalInteger ge ${params.bathrooms}`)
  }
  if (params.propertyType && params.propertyType !== "all") {
    filters.push(`PropertyType eq '${params.propertyType}'`)
  }

  // Only active listings
  filters.push(`StandardStatus eq 'Active'`)

  let query = baseUrl
  if (filters.length > 0) {
    query += `?$filter=${filters.join(" and ")}`
  }

  // Add other parameters
  const additionalParams = []
  additionalParams.push(`$top=${params.limit || 20}`)
  additionalParams.push(`$skip=${params.offset || 0}`)
  additionalParams.push(`$expand=Media`)
  additionalParams.push(`$orderby=ListPrice desc`)

  if (filters.length > 0) {
    query += "&" + additionalParams.join("&")
  } else {
    query += "?" + additionalParams.join("&")
  }

  return query
}

export function extractPropertyFeatures(property: ZillowProperty): string[] {
  const features = []

  if (property.PoolPrivateYN) features.push("Pool")
  if (property.FireplaceYN) features.push("Fireplace")
  if (property.WaterfrontYN) features.push("Waterfront")
  if (property.ViewYN) features.push("View")
  if (property.Parking) features.push("Parking")
  if (property.Heating) features.push("Heating")
  if (property.Cooling) features.push("AC")

  return features
}

export function getPropertyImages(media: ZillowProperty["Media"]): string[] {
  if (!media || media.length === 0) {
    return ["/placeholder.svg?height=400&width=600"]
  }

  const images = media.filter((m) => m.MediaCategory === "Photo" && m.MediaType === "image/jpeg").map((m) => m.MediaURL)

  return images.length > 0 ? images : ["/placeholder.svg?height=400&width=600"]
}

export function calculateMarketTrend(daysOnMarket: number): "up" | "down" | "stable" {
  if (daysOnMarket < 14) return "up"
  if (daysOnMarket > 60) return "down"
  return "stable"
}

export function isHolographicProperty(property: ZillowProperty): boolean {
  // Premium properties get holographic treatment
  return (
    property.ListPrice > 1000000 ||
    property.PoolPrivateYN ||
    property.WaterfrontYN ||
    property.ViewYN ||
    (property.Media && property.Media.length > 5)
  )
}

export function getHolographicFeatures(property: ZillowProperty): string[] {
  const features = []

  if (property.ListPrice > 2000000) {
    features.push("Virtual Reality Tour", "Drone Photography", "3D Walkthrough")
  } else if (property.ListPrice > 1000000) {
    features.push("Virtual Tour", "3D Walkthrough")
  } else if (property.Media && property.Media.length > 3) {
    features.push("Virtual Tour")
  }

  return features
}
