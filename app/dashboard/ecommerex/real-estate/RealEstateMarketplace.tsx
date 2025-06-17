"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { RefreshCw, AlertCircle, MapPin, DollarSign, Filter, Search, Home, TrendingUp, Star, Info } from "lucide-react"
import { PaginatedPropertyGrid } from "@/components/ecommerex/paginated-property-grid"
import { HolographicHeader } from "@/components/ecommerex/holographic-header"
import { PropertyComparisonProvider } from "@/contexts/property-comparison-context"
import { useZillowProperties } from "@/hooks/use-zillow-properties"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function RealEstateMarketplace() {
  const [location, setLocation] = useState("New York, NY")
  const [tempLocation, setTempLocation] = useState("New York, NY")
  const [priceRange, setPriceRange] = useState("all")
  const [propertyType, setPropertyType] = useState("all")
  const [status, setStatus] = useState("for_sale")

  // Convert price range to min/max values
  const getPriceRange = () => {
    switch (priceRange) {
      case "under-500k":
        return { minPrice: 0, maxPrice: 500000 }
      case "500k-1m":
        return { minPrice: 500000, maxPrice: 1000000 }
      case "1m-2m":
        return { minPrice: 1000000, maxPrice: 2000000 }
      case "over-2m":
        return { minPrice: 2000000, maxPrice: 10000000 }
      default:
        return { minPrice: 0, maxPrice: 10000000 }
    }
  }

  const { minPrice, maxPrice } = getPriceRange()

  const { properties, loading, error, total, message, refetch } = useZillowProperties({
    location,
    minPrice,
    maxPrice,
    propertyType: propertyType === "all" ? "all" : propertyType,
    status,
  })

  const handleLocationSearch = () => {
    setLocation(tempLocation)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLocationSearch()
    }
  }

  // Calculate market statistics
  const avgPrice =
    properties.length > 0 ? Math.round(properties.reduce((sum, p) => sum + p.price, 0) / properties.length) : 0
  const holographicCount = properties.filter((p) => p.isHolographic).length
  const with360Count = properties.filter((p) => p.has360View).length

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`
    }
    return `$${(price / 1000).toFixed(0)}K`
  }

  return (
    <PropertyComparisonProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-cyan-950">
        <div className="container mx-auto p-4 space-y-8">
          {/* Main Header */}
          <HolographicHeader
            title="MERCATUS PRAEDIORUM IMPERIUM"
            subtitle="Imperial Real Estate Marketplace • Premium Properties with Holographic Technology & Virtual Tours"
            isLatin={true}
          />

          {/* Market Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-amber-950/30 to-yellow-950/30 border-amber-500/20 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-serif text-amber-300">
                  NUMERUS TOTALIS
                  <span className="block text-xs text-amber-300/60 font-sans">Total Properties</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-400">{total}</div>
                <div className="text-xs text-amber-300/60">Available Now</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-950/30 to-indigo-950/30 border-purple-500/20 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-serif text-purple-300">
                  PRETIUM MEDIUS
                  <span className="block text-xs text-purple-300/60 font-sans">Average Price</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-400">{formatPrice(avgPrice)}</div>
                <div className="text-xs text-purple-300/60">Market Average</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-950/30 to-blue-950/30 border-cyan-500/20 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-serif text-cyan-300">
                  HOLOGRAPHICA
                  <span className="block text-xs text-cyan-300/60 font-sans">Holographic Enhanced</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cyan-400">{holographicCount}</div>
                <div className="text-xs text-cyan-300/60">Premium Properties</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-950/30 to-teal-950/30 border-emerald-500/20 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-serif text-emerald-300">
                  VISIO 360°
                  <span className="block text-xs text-emerald-300/60 font-sans">Virtual Tours</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-400">{with360Count}</div>
                <div className="text-xs text-emerald-300/60">Interactive Views</div>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Search Controls */}
          <Card className="bg-gradient-to-r from-indigo-950/60 via-purple-950/60 to-cyan-950/60 backdrop-blur-sm border-indigo-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl font-serif text-transparent bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text">
                <Filter className="w-6 h-6 text-amber-400" />
                INSTRUMENTA QUAERENDI
                <span className="text-sm text-amber-300/60 font-sans">Advanced Search Tools</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Location Search */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-transparent bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span className="font-serif">LOCUS QUAERERE</span>
                  </label>
                  <div className="text-xs text-amber-300/60 mb-2">Location Search • Enter city, state or ZIP code</div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter city, state..."
                      value={tempLocation}
                      onChange={(e) => setTempLocation(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200 placeholder:text-indigo-300/50"
                    />
                    <Button
                      onClick={handleLocationSearch}
                      size="icon"
                      className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
                      title="Search Location"
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-transparent bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text">
                    <DollarSign className="w-4 h-4 text-amber-400" />
                    <span className="font-serif">PRETIUM SPATIUM</span>
                  </label>
                  <div className="text-xs text-amber-300/60 mb-2">Price Range • Filter by budget</div>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200">
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent className="border-indigo-500/20 bg-indigo-950/90 text-indigo-200">
                      <SelectItem value="all">
                        <div>
                          <div className="font-serif text-xs text-amber-400">OMNIS PRETIUM</div>
                          <div className="text-sm">All Prices</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="under-500k">
                        <div>
                          <div className="font-serif text-xs text-amber-400">SUB D</div>
                          <div className="text-sm">Under $500K</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="500k-1m">
                        <div>
                          <div className="font-serif text-xs text-amber-400">D - M</div>
                          <div className="text-sm">$500K - $1M</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="1m-2m">
                        <div>
                          <div className="font-serif text-xs text-amber-400">M - MM</div>
                          <div className="text-sm">$1M - $2M</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="over-2m">
                        <div>
                          <div className="font-serif text-xs text-amber-400">SUPER MM</div>
                          <div className="text-sm">Over $2M</div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Property Type */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-transparent bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text">
                    <Home className="w-4 h-4 text-amber-400" />
                    <span className="font-serif">GENUS PRAEDII</span>
                  </label>
                  <div className="text-xs text-amber-300/60 mb-2">Property Type • Select home style</div>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent className="border-indigo-500/20 bg-indigo-950/90 text-indigo-200">
                      <SelectItem value="all">
                        <div>
                          <div className="font-serif text-xs text-amber-400">OMNIA GENERA</div>
                          <div className="text-sm">All Types</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="SINGLE_FAMILY">
                        <div>
                          <div className="font-serif text-xs text-amber-400">DOMUS SINGULARIS</div>
                          <div className="text-sm">Single Family Home</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="CONDO">
                        <div>
                          <div className="font-serif text-xs text-amber-400">CONDOMINIUM</div>
                          <div className="text-sm">Condominium</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="TOWNHOUSE">
                        <div>
                          <div className="font-serif text-xs text-amber-400">DOMUS URBANA</div>
                          <div className="text-sm">Townhouse</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="MULTI_FAMILY">
                        <div>
                          <div className="font-serif text-xs text-amber-400">DOMUS MULTIPLEX</div>
                          <div className="text-sm">Multi-Family</div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-transparent bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    <span className="font-serif">STATUS PRAEDII</span>
                  </label>
                  <div className="text-xs text-amber-300/60 mb-2">Property Status • Availability type</div>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="border-indigo-500/20 bg-indigo-950/90 text-indigo-200">
                      <SelectItem value="for_sale">
                        <div>
                          <div className="font-serif text-xs text-amber-400">AD VENDENDUM</div>
                          <div className="text-sm">For Sale</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="for_rent">
                        <div>
                          <div className="font-serif text-xs text-amber-400">AD LOCENDUM</div>
                          <div className="text-sm">For Rent</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="sold">
                        <div>
                          <div className="font-serif text-xs text-amber-400">VENDITUM</div>
                          <div className="text-sm">Recently Sold</div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="my-6 bg-amber-500/20" />

              {/* Search Results Summary */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-3 py-1">
                    <Home className="w-3 h-3 mr-1" />
                    {total} Properties Found
                  </Badge>
                  <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {location}
                  </Badge>
                  {holographicCount > 0 && (
                    <Badge className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-3 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      {holographicCount} Holographic Enhanced
                    </Badge>
                  )}
                  {message && (
                    <Badge variant="outline" className="border-amber-500/30 text-amber-300 px-3 py-1">
                      <Info className="w-3 h-3 mr-1" />
                      Enhanced Database
                    </Badge>
                  )}
                </div>
                <Button
                  onClick={refetch}
                  variant="outline"
                  size="sm"
                  disabled={loading}
                  className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  Refresh Results
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-950/30 border border-red-500/20 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 text-red-300">
                <AlertCircle className="w-5 h-5" />
                <span>Error loading properties: {error}</span>
              </div>
            </motion.div>
          )}

          {/* Loading State */}
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <div className="inline-flex items-center gap-2 text-indigo-300">
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Loading premium properties...</span>
              </div>
            </motion.div>
          )}

          {/* Properties Grid */}
          {!loading && properties.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif text-transparent bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text">
                  COLLECTIO PRAEDIORUM
                  <span className="block text-sm text-amber-300/60 font-sans">Property Collection</span>
                </h2>
                <div className="text-sm text-indigo-300/70">
                  Showing {properties.length} of {total} properties
                </div>
              </div>
              <PaginatedPropertyGrid properties={properties} itemsPerPage={6} />
            </div>
          )}

          {/* No Results */}
          {!loading && !error && properties.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
              <div className="text-indigo-300/70 text-lg mb-2">
                <span className="font-serif">NULLA PRAEDIA INVENTA</span>
              </div>
              <div className="text-indigo-400/50 text-sm mb-4">No Properties Found</div>
              <div className="text-indigo-400/50 text-sm">Try adjusting your search criteria or location</div>
            </motion.div>
          )}
        </div>
      </div>
    </PropertyComparisonProvider>
  )
}
