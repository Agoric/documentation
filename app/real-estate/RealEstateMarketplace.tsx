"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, DollarSign, Home, TrendingUp, Star, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { HolographicHeader } from "@/components/ecommerex/holographic-header"
import { ComparisonBar } from "@/components/real-estate/property-comparison-bar"
import { PropertyComparisonProvider } from "@/contexts/property-comparison-context"
import { StreamingPropertyGrid } from "@/components/real-estate/streaming-property-grid"

// Sample property data with real images
const sampleProperties = [
  {
    id: "1",
    address: "123 Luxury Lane, Beverly Hills, CA",
    price: 2850000,
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3200,
    lotSize: 0.75,
    yearBuilt: 2019,
    propertyType: "Single Family",
    images: [
      "/properties/luxury-modern-home.jpg",
      "/properties/luxury-interior-1.jpg",
      "/properties/luxury-interior-2.jpg",
    ],
    description: "Stunning modern home with panoramic city views and premium finishes throughout.",
    features: ["Pool", "Garage", "Fireplace", "Hardwood Floors"],
    neighborhood: "Beverly Hills",
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
    id: "2",
    address: "456 Ocean Drive, Malibu, CA",
    price: 4200000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4500,
    lotSize: 1.2,
    yearBuilt: 2021,
    propertyType: "Single Family",
    images: [
      "/properties/oceanfront-estate.jpg",
      "/properties/luxury-interior-2.jpg",
      "/properties/luxury-interior-3.jpg",
    ],
    description: "Oceanfront estate with private beach access and infinity pool.",
    features: ["Ocean View", "Private Beach", "Infinity Pool", "Wine Cellar"],
    neighborhood: "Malibu",
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
    id: "3",
    address: "789 Downtown Loft, Los Angeles, CA",
    price: 1250000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1800,
    lotSize: 0,
    yearBuilt: 2020,
    propertyType: "Condo",
    images: ["/properties/downtown-loft.jpg", "/properties/luxury-interior-1.jpg"],
    description: "Modern downtown loft with floor-to-ceiling windows and city views.",
    features: ["City View", "Rooftop Deck", "Gym", "Concierge"],
    neighborhood: "Downtown LA",
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
  {
    id: "4",
    address: "321 Suburban Street, Pasadena, CA",
    price: 950000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2100,
    lotSize: 0.5,
    yearBuilt: 2018,
    propertyType: "Single Family",
    images: ["/properties/suburban-family-home.jpg", "/properties/luxury-interior-3.jpg"],
    description: "Charming family home in quiet neighborhood with excellent schools.",
    features: ["Garden", "2-Car Garage", "Updated Kitchen", "Solar Panels"],
    neighborhood: "Pasadena",
    walkScore: 75,
    schoolRating: 9,
    marketTrend: "up" as const,
    daysOnMarket: 18,
    pricePerSqft: 452,
    isHolographic: true,
    holographicFeatures: ["Energy Efficiency", "Smart Thermostat"],
    has360View: true,
    zestimate: 975000,
    priceHistory: [
      { date: "2024-01", price: 900000 },
      { date: "2024-06", price: 950000 },
    ],
  },
  {
    id: "5",
    address: "654 Hillside Drive, Hollywood Hills, CA",
    price: 3500000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3800,
    lotSize: 1.0,
    yearBuilt: 2022,
    propertyType: "Single Family",
    images: [
      "/properties/hollywood-hills-contemporary.jpg",
      "/properties/luxury-interior-1.jpg",
      "/properties/luxury-interior-2.jpg",
    ],
    description: "Contemporary architectural masterpiece with stunning valley views.",
    features: ["Valley View", "Infinity Pool", "Home Theater", "Wine Room"],
    neighborhood: "Hollywood Hills",
    walkScore: 70,
    schoolRating: 8,
    marketTrend: "up" as const,
    daysOnMarket: 5,
    pricePerSqft: 921,
    isHolographic: true,
    holographicFeatures: ["Smart Home", "Virtual Staging", "3D Tour"],
    has360View: true,
    zestimate: 3650000,
    priceHistory: [
      { date: "2024-01", price: 3300000 },
      { date: "2024-06", price: 3500000 },
    ],
  },
  {
    id: "6",
    address: "987 Beachfront Blvd, Santa Monica, CA",
    price: 5200000,
    bedrooms: 6,
    bathrooms: 5,
    sqft: 5500,
    lotSize: 0.8,
    yearBuilt: 2023,
    propertyType: "Single Family",
    images: [
      "/properties/santa-monica-beachfront.jpg",
      "/properties/luxury-interior-2.jpg",
      "/properties/luxury-interior-3.jpg",
    ],
    description: "Brand new luxury beachfront home with unobstructed ocean views.",
    features: ["Ocean Front", "Private Elevator", "Rooftop Deck", "Smart Home"],
    neighborhood: "Santa Monica",
    walkScore: 88,
    schoolRating: 9,
    marketTrend: "up" as const,
    daysOnMarket: 3,
    pricePerSqft: 945,
    isHolographic: true,
    holographicFeatures: ["Virtual Reality", "Drone Tour", "AI Assistant"],
    has360View: true,
    zestimate: 5400000,
    priceHistory: [{ date: "2024-06", price: 5200000 }],
  },
]

interface Property {
  id: string
  address: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  lotSize: number
  yearBuilt: number
  propertyType: string
  images: string[]
  description: string
  features: string[]
  neighborhood: string
  walkScore: number
  schoolRating: number
  marketTrend: "up" | "down" | "stable"
  daysOnMarket: number
  pricePerSqft: number
  isHolographic?: boolean
  holographicFeatures?: string[]
  has360View?: boolean
  zestimate: number
  priceHistory: Array<{ date: string; price: number }>
  coordinates?: { lat: number; lng: number }
  taxes?: number
  hoa?: number
  schools?: {
    elementary?: string
    middle?: string
    high?: string
    district?: string
  }
}

export function RealEstateMarketplace() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDemo, setIsDemo] = useState(true)
  const [searchQuery, setSearchQuery] = useState("Los Angeles, CA")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [totalProperties, setTotalProperties] = useState(sampleProperties.length)

  const getPriceRange = (range: string): [number | null, number | null] => {
    switch (range) {
      case "under-1m":
        return [null, 1000000]
      case "1m-3m":
        return [1000000, 3000000]
      case "3m-5m":
        return [3000000, 5000000]
      case "over-5m":
        return [5000000, null]
      default:
        return [null, null]
    }
  }

  // Filter properties based on search criteria
  const filteredProperties = sampleProperties.filter((property) => {
    const matchesSearch =
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.neighborhood.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === "all" || property.propertyType.toLowerCase().includes(selectedCategory.toLowerCase())

    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "under-1m" && property.price < 1000000) ||
      (priceRange === "1m-3m" && property.price >= 1000000 && property.price < 3000000) ||
      (priceRange === "3m-5m" && property.price >= 3000000 && property.price < 5000000) ||
      (priceRange === "over-5m" && property.price >= 5000000)

    return matchesSearch && matchesCategory && matchesPrice
  })

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return b.yearBuilt - a.yearBuilt
      case "sqft":
        return b.sqft - a.sqft
      default:
        return 0
    }
  })

  return (
    <PropertyComparisonProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
        {/* Header */}
        <HolographicHeader
          title="Real Estate Marketplace"
          subtitle={`Discover your dream home with revolutionary 50-year financing options and holographic property tours ${isDemo ? "(Demo Mode)" : "(Live Zillow Data)"}`}
          className="mb-8"
        />

        {/* Demo Mode Banner */}
        {isDemo && (
          <div className="container mx-auto px-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-amber-900/40 via-orange-900/40 to-red-900/40 backdrop-blur-sm border border-amber-400/30 rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="text-amber-200 font-medium">Demo Mode Active</p>
                  <p className="text-amber-200/70 text-sm">
                    Showing sample properties with real images. Live Zillow integration will display actual listings.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="container mx-auto px-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by location (e.g., Los Angeles, CA)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>

              {/* Property Type */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Residential">Single Family</SelectItem>
                  <SelectItem value="Condominium">Condo</SelectItem>
                  <SelectItem value="Townhouse">Townhouse</SelectItem>
                  <SelectItem value="Multi-Family">Multi-Family</SelectItem>
                </SelectContent>
              </Select>

              {/* Price Range */}
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-1m">Under $1M</SelectItem>
                  <SelectItem value="1m-3m">$1M - $3M</SelectItem>
                  <SelectItem value="3m-5m">$3M - $5M</SelectItem>
                  <SelectItem value="over-5m">Over $5M</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="sqft">Largest First</SelectItem>
                  <SelectItem value="days-market">Newest Listings</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge
                variant="outline"
                className="border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10 cursor-pointer"
                onClick={() => setSortBy("days-market")}
              >
                <Home className="w-3 h-3 mr-1" />
                New Listings
              </Badge>
              <Badge
                variant="outline"
                className="border-purple-400/30 text-purple-300 hover:bg-purple-400/10 cursor-pointer"
                onClick={() => setSortBy("price-low")}
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                Price Reduced
              </Badge>
              <Badge
                variant="outline"
                className="border-green-400/30 text-green-300 hover:bg-green-400/10 cursor-pointer"
              >
                <Star className="w-3 h-3 mr-1" />
                Virtual Tours
              </Badge>
              <Badge
                variant="outline"
                className="border-yellow-400/30 text-yellow-300 hover:bg-yellow-400/10 cursor-pointer"
              >
                <DollarSign className="w-3 h-3 mr-1" />
                50-Year Loans
              </Badge>
            </div>
          </div>
        </div>

        {/* 50-Year Loan Promotion Banner */}
        <div className="container mx-auto px-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-cyan-900/40 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text mb-2">
                  Revolutionary 50-Year Financing Available
                </h3>
                <p className="text-indigo-200/80 mb-4">
                  Lower your monthly payments by up to 40% and build generational wealth with our exclusive 50-year loan
                  program.
                </p>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-300">Rates from 3.25% APR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-cyan-300">Digital Citizen Exclusive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-purple-300">Instant Pre-Approval</span>
                  </div>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white px-8">
                Get Pre-Approved
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Results Header */}
        <div className="container mx-auto px-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {sortedProperties.length} Properties Found
                {isDemo && <span className="text-amber-400 ml-2">(Demo)</span>}
              </h2>
              <p className="text-indigo-200/70">
                Showing results for {searchQuery} •{" "}
                {selectedCategory !== "all" ? selectedCategory : "all property types"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="border-white/20"
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="border-white/20"
              >
                List
              </Button>
            </div>
          </div>
        </div>

        {/* Property Grid */}
        <div className="container mx-auto px-6">
          <StreamingPropertyGrid
            properties={sortedProperties}
            location={searchQuery}
            minPrice={priceRange !== "all" ? getPriceRange(priceRange)[0] || undefined : undefined}
            maxPrice={priceRange !== "all" ? getPriceRange(priceRange)[1] || undefined : undefined}
            propertyType={selectedCategory !== "all" ? selectedCategory : undefined}
            batchSize={5}
            viewMode={viewMode}
          />
        </div>

        {/* Comparison Bar */}
        <ComparisonBar />
      </div>
    </PropertyComparisonProvider>
  )
}
