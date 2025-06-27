"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Bed, Bath, Square, Filter, Heart, Share, Eye, Sparkles } from "lucide-react"
import { useGlobalUnlock } from "@/contexts/global-unlock-context"

// Sample properties for demonstration
const SAMPLE_PROPERTIES = [
  {
    id: "1",
    title: "Modern Luxury Estate",
    address: "123 Beverly Hills Dr, CA 90210",
    price: 2500000,
    beds: 5,
    baths: 4,
    sqft: 4500,
    type: "house",
    image: "/properties/luxury-modern-home.jpg",
    features: ["Pool", "Garage", "Garden", "Security"],
    yearBuilt: 2020,
    status: "for-sale",
    isHolographic: true,
  },
  {
    id: "2",
    title: "Oceanfront Villa",
    address: "456 Malibu Coast, CA 90265",
    price: 4200000,
    beds: 6,
    baths: 5,
    sqft: 6000,
    type: "house",
    image: "/properties/oceanfront-estate.jpg",
    features: ["Ocean View", "Private Beach", "Wine Cellar", "Gym"],
    yearBuilt: 2018,
    status: "for-sale",
    isHolographic: true,
  },
  {
    id: "3",
    title: "Downtown Luxury Loft",
    address: "789 Downtown Ave, CA 90013",
    price: 950000,
    beds: 2,
    baths: 2,
    sqft: 1800,
    type: "condo",
    image: "/properties/downtown-loft.jpg",
    features: ["City View", "Rooftop Access", "Concierge", "Parking"],
    yearBuilt: 2021,
    status: "for-sale",
    isHolographic: false,
  },
  {
    id: "4",
    title: "Family Suburban Home",
    address: "321 Suburbia St, CA 90210",
    price: 1200000,
    beds: 4,
    baths: 3,
    sqft: 2800,
    type: "house",
    image: "/properties/suburban-family-home.jpg",
    features: ["Yard", "Garage", "Fireplace", "Updated Kitchen"],
    yearBuilt: 2015,
    status: "for-sale",
    isHolographic: false,
  },
]

// Holographic Property Card Component
const HolographicPropertyCard = ({ property }: { property: (typeof SAMPLE_PROPERTIES)[0] }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card
        className={`relative overflow-hidden ${
          property.isHolographic
            ? "bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-cyan-500/30"
            : "bg-white/5 border-white/10"
        } hover:border-blue-500/50 transition-all duration-300`}
      >
        {/* Holographic Border Animation */}
        {property.isHolographic && (
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{
              background: `conic-gradient(from 0deg at 50% 50%, transparent, #06b6d4, transparent)`,
              padding: "1px",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="w-full h-full rounded-lg bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
          </motion.div>
        )}

        {/* Floating Particles */}
        {(isHovered || property.isHolographic) && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(property.isHolographic ? 12 : 6)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${
                  property.isHolographic ? "bg-gradient-to-r from-cyan-400/60 to-purple-400/60" : "bg-blue-400/40"
                }`}
                animate={{
                  x: [0, Math.random() * 50 - 25],
                  y: [0, Math.random() * 50 - 25],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        )}

        {/* Glow Effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.2), transparent 50%)`,
            }}
          />
        )}

        {/* Scan Line Effect */}
        {property.isHolographic && (
          <motion.div
            className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
            animate={{
              y: isHovered ? [0, 300, 0] : 0,
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
              ease: "linear",
            }}
          />
        )}

        <div className="relative z-10">
          {/* Property Image */}
          <div className="relative">
            <motion.img
              src={property.image || "/placeholder.svg"}
              alt={property.title}
              className="w-full h-48 object-cover transition-all duration-500"
              whileHover={{ scale: 1.05 }}
            />

            {/* Holographic Overlay */}
            {property.isHolographic && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-400/10"
                animate={{
                  opacity: isHovered ? [0.1, 0.3, 0.1] : 0.1,
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            )}

            <div className="absolute top-2 right-2 flex gap-2">
              <motion.button
                className="h-8 w-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                onClick={() => setIsLiked(!isLiked)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart
                  className={`h-4 w-4 transition-all duration-200 ${
                    isLiked ? "fill-red-500 text-red-500 scale-110" : "text-white"
                  }`}
                />
              </motion.button>
              <motion.button
                className="h-8 w-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Share className="h-4 w-4 text-white" />
              </motion.button>
            </div>

            <div className="absolute top-2 left-2 flex flex-col gap-2">
              {property.isHolographic && (
                <Badge className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Holographic
                </Badge>
              )}
              <Badge className="bg-green-600 text-white shadow-lg">
                {property.status.replace("-", " ").toUpperCase()}
              </Badge>
            </div>
          </div>

          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle
                  className={`text-lg font-semibold ${
                    property.isHolographic
                      ? "bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent"
                      : "text-white"
                  }`}
                >
                  {property.title}
                </CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3" />
                  {property.address}
                </div>
              </div>
              <div className="text-right">
                <motion.div
                  className={`text-2xl font-bold ${
                    property.isHolographic
                      ? "bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
                      : "text-green-400"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  ${property.price.toLocaleString()}
                </motion.div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{property.beds} beds</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.baths} baths</span>
              </div>
              <div className="flex items-center gap-1">
                <Square className="h-4 w-4" />
                <span>{property.sqft.toLocaleString()} sqft</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {property.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {property.features.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{property.features.length - 3} more
                </Badge>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                className={`flex-1 transition-all duration-300 ${
                  property.isHolographic
                    ? "bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700 shadow-lg hover:shadow-cyan-500/25"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent border-white/20 hover:bg-white/10">
                Schedule Tour
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}

interface RealEstateMarketplaceProps {
  initialProperties?: typeof SAMPLE_PROPERTIES
}

export default function RealEstateMarketplace({ initialProperties = SAMPLE_PROPERTIES }: RealEstateMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [propertyType, setPropertyType] = useState("all")
  const [bedrooms, setBedrooms] = useState("all")
  const [priceRange, setPriceRange] = useState("all")

  const { getAllSuggestions } = useGlobalUnlock()
  const allSuggestions = getAllSuggestions()
  const realEstateSuggestions = allSuggestions.filter((s) => s.category === "realestate")
  const prioritySuggestions = realEstateSuggestions.filter((s) => s.impact === "high").slice(0, 3)
  const immediateSuggestions = realEstateSuggestions.filter((s) => s.timeframe === "immediate").slice(0, 2)

  // Filter properties based on search criteria
  const filteredProperties = useMemo(() => {
    return initialProperties.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.address.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = propertyType === "all" || property.type === propertyType
      const matchesBeds = bedrooms === "all" || property.beds.toString() === bedrooms

      let matchesPrice = true
      if (priceRange !== "all") {
        const price = property.price
        switch (priceRange) {
          case "under-1m":
            matchesPrice = price < 1000000
            break
          case "1m-2m":
            matchesPrice = price >= 1000000 && price < 2000000
            break
          case "2m-5m":
            matchesPrice = price >= 2000000 && price < 5000000
            break
          case "over-5m":
            matchesPrice = price >= 5000000
            break
        }
      }

      return matchesSearch && matchesType && matchesBeds && matchesPrice
    })
  }, [initialProperties, searchQuery, propertyType, bedrooms, priceRange])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 relative overflow-hidden">
      {/* Background Holographic Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${5 + i * 12}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Real Estate Marketplace
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered property discovery with exclusive financing options and holographic previews
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Property Search & Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search properties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20"
                  />
                </div>

                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="bg-white/10 border-white/20">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger className="bg-white/10 border-white/20">
                    <SelectValue placeholder="Bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Bedrooms</SelectItem>
                    <SelectItem value="1">1 Bedroom</SelectItem>
                    <SelectItem value="2">2 Bedrooms</SelectItem>
                    <SelectItem value="3">3 Bedrooms</SelectItem>
                    <SelectItem value="4">4 Bedrooms</SelectItem>
                    <SelectItem value="5">5+ Bedrooms</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="bg-white/10 border-white/20">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Price</SelectItem>
                    <SelectItem value="under-1m">Under $1M</SelectItem>
                    <SelectItem value="1m-2m">$1M - $2M</SelectItem>
                    <SelectItem value="2m-5m">$2M - $5M</SelectItem>
                    <SelectItem value="over-5m">Over $5M</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Properties Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Available Properties ({filteredProperties.length})</span>
                <Badge variant="secondary" className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Verified
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <HolographicPropertyCard property={property} />
                  </motion.div>
                ))}
              </div>

              {filteredProperties.length === 0 && (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Properties Found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
