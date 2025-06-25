"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, DollarSign, Home, TrendingUp, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { HolographicHeader } from "@/components/ecommerex/holographic-header"
import { HolographicPropertyCard } from "@/components/real-estate/holographic-property-card"
import { PaginatedPropertyGrid } from "@/components/real-estate/paginated-property-grid"
import { ComparisonBar } from "@/components/real-estate/property-comparison-bar"
import { PropertyComparisonProvider } from "@/contexts/property-comparison-context"

// Sample property data with realistic real estate information
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
    images: ["/placeholder.svg?height=400&width=600"],
    description: "Stunning modern home with panoramic city views and premium finishes throughout.",
    features: ["Pool", "Garage", "Fireplace", "Hardwood Floors"],
    neighborhood: "Beverly Hills",
    walkScore: 85,
    schoolRating: 9,
    marketTrend: "up",
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
    images: ["/placeholder.svg?height=400&width=600"],
    description: "Oceanfront estate with private beach access and infinity pool.",
    features: ["Ocean View", "Private Beach", "Infinity Pool", "Wine Cellar"],
    neighborhood: "Malibu",
    walkScore: 65,
    schoolRating: 8,
    marketTrend: "up",
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
    images: ["/placeholder.svg?height=400&width=600"],
    description: "Modern downtown loft with floor-to-ceiling windows and city views.",
    features: ["City View", "Rooftop Deck", "Gym", "Concierge"],
    neighborhood: "Downtown LA",
    walkScore: 95,
    schoolRating: 7,
    marketTrend: "stable",
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
    images: ["/placeholder.svg?height=400&width=600"],
    description: "Charming family home in quiet neighborhood with excellent schools.",
    features: ["Garden", "2-Car Garage", "Updated Kitchen", "Solar Panels"],
    neighborhood: "Pasadena",
    walkScore: 75,
    schoolRating: 9,
    marketTrend: "up",
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
    images: ["/placeholder.svg?height=400&width=600"],
    description: "Contemporary architectural masterpiece with stunning valley views.",
    features: ["Valley View", "Infinity Pool", "Home Theater", "Wine Room"],
    neighborhood: "Hollywood Hills",
    walkScore: 70,
    schoolRating: 8,
    marketTrend: "up",
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
    images: ["/placeholder.svg?height=400&width=600"],
    description: "Brand new luxury beachfront home with unobstructed ocean views.",
    features: ["Ocean Front", "Private Elevator", "Rooftop Deck", "Smart Home"],
    neighborhood: "Santa Monica",
    walkScore: 88,
    schoolRating: 9,
    marketTrend: "up",
    daysOnMarket: 3,
    pricePerSqft: 945,
    isHolographic: true,
    holographicFeatures: ["Virtual Reality", "Drone Tour", "AI Assistant"],
    has360View: true,
    zestimate: 5400000,
    priceHistory: [{ date: "2024-06", price: 5200000 }],
  },
]

export function RealEstateMarketplace() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

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
          subtitle="Discover your dream home with revolutionary 50-year financing options and holographic property tours"
          className="mb-8"
        />

        {/* Search and Filters */}
        <div className="container mx-auto px-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by location, neighborhood..."
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
                  <SelectItem value="single">Single Family</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="multi">Multi-Family</SelectItem>
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
                </SelectContent>
              </Select>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline" className="border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10 cursor-pointer">
                <Home className="w-3 h-3 mr-1" />
                New Listings
              </Badge>
              <Badge
                variant="outline"
                className="border-purple-400/30 text-purple-300 hover:bg-purple-400/10 cursor-pointer"
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
              <h2 className="text-2xl font-bold text-white mb-2">{sortedProperties.length} Properties Found</h2>
              <p className="text-indigo-200/70">
                Showing results for {searchQuery || "all locations"} •{" "}
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
          <PaginatedPropertyGrid
            properties={sortedProperties}
            itemsPerPage={12}
            viewMode={viewMode}
            renderProperty={(property) => <HolographicPropertyCard key={property.id} property={property} />}
          />
        </div>

        {/* Comparison Bar */}
        <ComparisonBar />
      </div>
    </PropertyComparisonProvider>
  )
}
