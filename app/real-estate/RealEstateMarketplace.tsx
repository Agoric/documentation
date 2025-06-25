"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, DollarSign, Home, TrendingUp, Star, RefreshCw, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { HolographicHeader } from "@/components/ecommerex/holographic-header"
import { HolographicPropertyCard } from "@/components/real-estate/holographic-property-card"
import { PaginatedPropertyGrid } from "@/components/real-estate/paginated-property-grid"
import { ComparisonBar } from "@/components/real-estate/property-comparison-bar"
import { PropertyComparisonProvider } from "@/contexts/property-comparison-context"

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
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDemo, setIsDemo] = useState(false)
  const [searchQuery, setSearchQuery] = useState("Los Angeles, CA")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [totalProperties, setTotalProperties] = useState(0)

  // Fetch properties from Zillow API
  const fetchProperties = async () => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (searchQuery) params.append("location", searchQuery)
      if (selectedCategory !== "all") params.append("propertyType", selectedCategory)
      if (priceRange !== "all") {
        const [min, max] = getPriceRange(priceRange)
        if (min) params.append("minPrice", min.toString())
        if (max) params.append("maxPrice", max.toString())
      }
      params.append("limit", "20")

      const response = await fetch(`/api/zillow/properties?${params}`)
      const data = await response.json()

      if (data.success) {
        setProperties(data.properties)
        setTotalProperties(data.total)
        setIsDemo(data.isDemo || false)
        if (data.message) {
          console.log("API Message:", data.message)
        }
      } else {
        throw new Error(data.error || "Failed to fetch properties")
      }
    } catch (err) {
      console.error("Error fetching properties:", err)
      setError("Failed to load properties. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchProperties()
  }, [])

  // Refetch when search parameters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProperties()
    }, 500) // Debounce search

    return () => clearTimeout(timeoutId)
  }, [searchQuery, selectedCategory, priceRange])

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

  // Filter and sort properties
  const filteredProperties = properties.filter((property) => {
    return true // Server-side filtering is handled by API
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
      case "days-market":
        return a.daysOnMarket - b.daysOnMarket
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
                    Showing sample properties. Live Zillow integration will display real listings.
                  </p>
                </div>
                <Button
                  onClick={fetchProperties}
                  disabled={loading}
                  className="ml-auto bg-amber-600 hover:bg-amber-700 text-white"
                  size="sm"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  Retry
                </Button>
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

        {/* Loading State */}
        {loading && (
          <div className="container mx-auto px-6 mb-6">
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin" />
                <span className="text-white text-lg">Loading properties...</span>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="container mx-auto px-6 mb-6">
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 text-center">
              <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
              <h3 className="text-red-300 font-semibold mb-2">Error Loading Properties</h3>
              <p className="text-red-200/70 mb-4">{error}</p>
              <Button onClick={fetchProperties} className="bg-red-600 hover:bg-red-700 text-white">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Results Header */}
        {!loading && !error && (
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
                  {totalProperties > sortedProperties.length && (
                    <span className="ml-2 text-cyan-300">
                      ({sortedProperties.length} of {totalProperties} total)
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={fetchProperties}
                  disabled={loading}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
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
        )}

        {/* Property Grid */}
        {!loading && !error && (
          <div className="container mx-auto px-6">
            <PaginatedPropertyGrid
              properties={sortedProperties}
              itemsPerPage={12}
              viewMode={viewMode}
              renderProperty={(property) => <HolographicPropertyCard key={property.id} property={property} />}
            />
          </div>
        )}

        {/* Comparison Bar */}
        <ComparisonBar />
      </div>
    </PropertyComparisonProvider>
  )
}
