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
  daysOnZillow: number
  photos: Array<{
    url: string
    caption?: string
  }>
  description: string
  zestimate: number
  rentZestimate?: number
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
  schools: Array<{
    name: string
    rating: number
    level: string
    distance: number
  }>
  neighborhood: string
  walkScore?: number
  transitScore?: number
  bikeScore?: number
}

interface ZillowSearchResponse {
  results: ZillowProperty[]
  totalResultCount: number
  searchUrl: string
}

interface ZillowApiError {
  error: string
  message: string
  code: number
}

class ZillowApiClient {
  private apiKey: string
  private baseUrl = "https://zillow-com1.p.rapidapi.com"
  private rateLimitDelay = 1500 // RapidAPI free tier is 45-60 req/min; give extra cushion
  private lastRequestTime = 0

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, string> = {}, attempt = 1): Promise<T> {
    // basic token-bucket style delay to keep us <40 req/min
    const now = Date.now()
    const delta = now - this.lastRequestTime
    if (delta < this.rateLimitDelay) {
      await new Promise((r) => setTimeout(r, this.rateLimitDelay - delta))
    }
    this.lastRequestTime = Date.now()

    const url = new URL(`${this.baseUrl}${endpoint}`)
    Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v))

    const resp = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": this.apiKey,
        "X-RapidAPI-Host": "zillow-com1.p.rapidapi.com",
        Accept: "application/json",
      },
    })

    // If we’re rate-limited (HTTP 429) retry with exponential back-off (max 3 tries)
    if (resp.status === 429) {
      if (attempt >= 3) {
        throw new Error("Zillow API Rate-Limit reached after 3 attempts")
      }
      const retryAfter = Number(resp.headers.get("Retry-After")) || (1 << attempt) * 1000 + Math.random() * 500
      console.warn(`Zillow 429 – backing off for ${retryAfter} ms (attempt ${attempt}/3)`)
      await new Promise((r) => setTimeout(r, retryAfter))
      return this.makeRequest<T>(endpoint, params, attempt + 1)
    }

    if (!resp.ok) {
      const errData = await resp.json().catch(() => ({}))
      throw new Error(`Zillow API Error: ${resp.status} - ${errData.message || resp.statusText}`)
    }

    return resp.json()
  }

  async searchProperties(params: {
    location: string
    status_type?: "ForSale" | "ForRent" | "RecentlySold"
    home_type?: string
    minPrice?: number
    maxPrice?: number
    beds_min?: number
    beds_max?: number
    baths_min?: number
    baths_max?: number
    sqft_min?: number
    sqft_max?: number
    built_year_min?: number
    built_year_max?: number
    sort?: "Price_High_Low" | "Price_Low_High" | "Newest" | "Bedrooms" | "Bathrooms" | "Square_Feet" | "Lot_Size"
    page?: number
  }): Promise<ZillowSearchResponse> {
    const searchParams: Record<string, string> = {
      location: params.location,
      status_type: params.status_type || "ForSale",
      page: (params.page || 1).toString(),
    }

    if (params.home_type) searchParams.home_type = params.home_type
    if (params.minPrice) searchParams.minPrice = params.minPrice.toString()
    if (params.maxPrice) searchParams.maxPrice = params.maxPrice.toString()
    if (params.beds_min) searchParams.beds_min = params.beds_min.toString()
    if (params.beds_max) searchParams.beds_max = params.beds_max.toString()
    if (params.baths_min) searchParams.baths_min = params.baths_min.toString()
    if (params.baths_max) searchParams.baths_max = params.baths_max.toString()
    if (params.sqft_min) searchParams.sqft_min = params.sqft_min.toString()
    if (params.sqft_max) searchParams.sqft_max = params.sqft_max.toString()
    if (params.built_year_min) searchParams.built_year_min = params.built_year_min.toString()
    if (params.built_year_max) searchParams.built_year_max = params.built_year_max.toString()
    if (params.sort) searchParams.sort = params.sort

    return this.makeRequest<ZillowSearchResponse>("/propertyExtendedSearch", searchParams)
  }

  async getPropertyDetails(zpid: string): Promise<ZillowProperty> {
    return this.makeRequest<ZillowProperty>("/property", { zpid })
  }

  async getSimilarProperties(zpid: string): Promise<ZillowProperty[]> {
    const response = await this.makeRequest<{ results: ZillowProperty[] }>("/similarProperties", { zpid })
    return response.results
  }

  async getPriceHistory(zpid: string): Promise<Array<{ date: string; price: number; event: string }>> {
    const response = await this.makeRequest<{ priceHistory: Array<{ date: string; price: number; event: string }> }>(
      "/priceHistory",
      { zpid },
    )
    return response.priceHistory
  }

  async getPropertyImages(zpid: string): Promise<Array<{ url: string; caption?: string }>> {
    const response = await this.makeRequest<{ images: Array<{ url: string; caption?: string }> }>("/images", { zpid })
    return response.images
  }
}

export { ZillowApiClient, type ZillowProperty, type ZillowSearchResponse, type ZillowApiError }
