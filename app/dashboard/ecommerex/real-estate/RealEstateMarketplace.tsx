"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { RefreshCw, AlertCircle, MapPin, DollarSign } from "lucide-react"
import { PaginatedPropertyGrid } from "@/components/ecommerex/paginated-property-grid"
import { HolographicHeader } from "@/components/ecommerex/holographic-header"
import { PropertyComparisonProvider } from "@/contexts/property-comparison-context"
import { useZillowProperties } from "@/hooks/use-zillow-properties"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

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

  const { properties, loading, error, total, refetch } = useZillowProperties({
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

  return (
    <PropertyComparisonProvider>
      <div className="container mx-auto p-4 space-y-8">
        <HolographicHeader
          title="MERCATUS PRAEDIORUM IMPERIUM"
          subtitle="Imperium Praediorum Nobilium cum Technologia Holographica et Visitationes Virtuales"
          isLatin={true}
        />

        {/* Real Estate Search Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-950/60 via-purple-950/60 to-cyan-950/60 backdrop-blur-sm rounded-lg border border-indigo-500/20 p-6"
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Location Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-transparent bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text">
                LOCUS QUAERERE
              </label>
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
                >
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-transparent bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text">
                PRETIUM SPATIUM
              </label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent className="border-indigo-500/20 bg-indigo-950/90 text-indigo-200">
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-500k">Under $500K</SelectItem>
                  <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                  <SelectItem value="1m-2m">$1M - $2M</SelectItem>
                  <SelectItem value="over-2m">Over $2M</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-transparent bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text">
                GENUS PRAEDII
              </label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent className="border-indigo-500/20 bg-indigo-950/90 text-indigo-200">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="SINGLE_FAMILY">Single Family</SelectItem>
                  <SelectItem value="CONDO">Condo</SelectItem>
                  <SelectItem value="TOWNHOUSE">Townhouse</SelectItem>
                  <SelectItem value="MULTI_FAMILY">Multi Family</SelectItem>
                  <SelectItem value="LAND">Land</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-transparent bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text">
                STATUS PRAEDII
              </label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="border-indigo-500/20 bg-indigo-950/90 text-indigo-200">
                  <SelectItem value="for_sale">For Sale</SelectItem>
                  <SelectItem value="for_rent">For Rent</SelectItem>
                  <SelectItem value="sold">Recently Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search Stats */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-indigo-500/20">
            <div className="flex items-center gap-4">
              <Badge className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white">
                {total} Properties Found
              </Badge>
              <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">Location: {location}</Badge>
              {properties.some((p) => p.isHolographic) && (
                <Badge className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white">
                  Holographic Enhanced Available
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
              Refresh
            </Button>
          </div>
        </motion.div>

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
              <span>Loading properties from Zillow...</span>
            </div>
          </motion.div>
        )}

        {/* Properties Grid */}
        {!loading && properties.length > 0 && <PaginatedPropertyGrid properties={properties} itemsPerPage={6} />}

        {/* No Results */}
        {!loading && !error && properties.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
            <div className="text-indigo-300/70 text-lg mb-2">No properties found</div>
            <div className="text-indigo-400/50 text-sm">Try adjusting your search criteria</div>
          </motion.div>
        )}
      </div>
    </PropertyComparisonProvider>
  )
}
