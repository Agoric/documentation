"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Share2,
  Eye,
  Filter,
  SortAsc,
  Grid3X3,
  List,
  TrendingUp,
  Home,
  Building,
  TreePine,
  Warehouse,
} from "lucide-react"
import { PropertyComparisonBar } from "@/components/real-estate/property-comparison-bar"
import { usePropertyComparison } from "@/contexts/property-comparison-context"

// Sample property data
const SAMPLE_PROPERTIES = [
  {
    id: "1",
    title: "Modern Luxury Estate",
    address: "123 Beverly Hills Dr, Beverly Hills, CA",
    price: 2500000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4500,
    lotSize: "0.75 acres",
    yearBuilt: 2020,
    propertyType: "Single Family",
    status: "For Sale",
    images: ["/properties/luxury-modern-home.jpg"],
    description: "Stunning modern estate with panoramic city views",
    features: ["Pool", "Gym", "Wine Cellar", "Smart Home"],
    listingAgent: "Sarah Johnson",
    daysOnMarket: 15,
    pricePerSqft: 556,
    hoa: 0,
    taxes: 25000,
    coordinates: { lat: 34.0901, lng: -118.4065 },
  },
  {
    id: "2",
    title: "Oceanfront Paradise",
    address: "456 Pacific Coast Hwy, Malibu, CA",
    price: 8500000,
    bedrooms: 6,
    bathrooms: 7,
    sqft: 6200,
    lotSize: "1.2 acres",
    yearBuilt: 2018,
    propertyType: "Single Family",
    status: "For Sale",
    images: ["/properties/oceanfront-estate.jpg"],
    description: "Breathtaking oceanfront estate with private beach access",
    features: ["Private Beach", "Guest House", "Infinity Pool", "Tennis Court"],
    listingAgent: "Michael Chen",
    daysOnMarket: 8,
    pricePerSqft: 1371,
    hoa: 0,
    taxes: 85000,
    coordinates: { lat: 34.0259, lng: -118.7798 },
  },
  {
    id: "3",
    title: "Downtown Luxury Loft",
    address: "789 Spring St, Los Angeles, CA",
    price: 1200000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1800,
    lotSize: "N/A",
    yearBuilt: 2019,
    propertyType: "Condo",
    status: "For Sale",
    images: ["/properties/downtown-loft.jpg"],
    description: "Ultra-modern loft in the heart of downtown",
    features: ["City Views", "Rooftop Deck", "Concierge", "Gym"],
    listingAgent: "Emily Rodriguez",
    daysOnMarket: 22,
    pricePerSqft: 667,
    hoa: 800,
    taxes: 12000,
    coordinates: { lat: 34.0522, lng: -118.2437 },
  },
  {
    id: "4",
    title: "Family Suburban Home",
    address: "321 Oak Tree Lane, Pasadena, CA",
    price: 950000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    lotSize: "0.25 acres",
    yearBuilt: 2015,
    propertyType: "Single Family",
    status: "For Sale",
    images: ["/properties/suburban-family-home.jpg"],
    description: "Perfect family home in quiet neighborhood",
    features: ["Large Yard", "Updated Kitchen", "Fireplace", "2-Car Garage"],
    listingAgent: "David Kim",
    daysOnMarket: 35,
    pricePerSqft: 339,
    hoa: 0,
    taxes: 9500,
    coordinates: { lat: 34.1478, lng: -118.1445 },
  },
  {
    id: "5",
    title: "Hollywood Hills Contemporary",
    address: "654 Sunset Plaza Dr, West Hollywood, CA",
    price: 3200000,
    bedrooms: 4,
    bathrooms: 5,
    sqft: 3600,
    lotSize: "0.5 acres",
    yearBuilt: 2021,
    propertyType: "Single Family",
    status: "For Sale",
    images: ["/properties/hollywood-hills-contemporary.jpg"],
    description: "Architectural masterpiece with stunning views",
    features: ["Infinity Pool", "Home Theater", "Wine Room", "Smart Home"],
    listingAgent: "Lisa Thompson",
    daysOnMarket: 12,
    pricePerSqft: 889,
    hoa: 0,
    taxes: 32000,
    coordinates: { lat: 34.0928, lng: -118.3287 },
  },
  {
    id: "6",
    title: "Santa Monica Beachfront",
    address: "987 Ocean Ave, Santa Monica, CA",
    price: 4800000,
    bedrooms: 3,
    bathrooms: 4,
    sqft: 2400,
    lotSize: "N/A",
    yearBuilt: 2017,
    propertyType: "Condo",
    status: "For Sale",
    images: ["/properties/santa-monica-beachfront.jpg"],
    description: "Luxury beachfront condo with panoramic ocean views",
    features: ["Ocean Views", "Balcony", "Concierge", "Beach Access"],
    listingAgent: "Robert Wilson",
    daysOnMarket: 18,
    pricePerSqft: 2000,
    hoa: 1200,
    taxes: 48000,
    coordinates: { lat: 34.0195, lng: -118.4912 },
  },
]

export default function RealEstateMarketplace() {
  const { comparedProperties, addToComparison, removeFromComparison, clearComparison } = usePropertyComparison()
  const [searchQuery, setSearchQuery] = useState("")
  const [propertyType, setPropertyType] = useState("all")
  const [bedrooms, setBedrooms] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("price-low")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    const filtered = SAMPLE_PROPERTIES.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.address.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType =
        propertyType === "all" || property.propertyType.toLowerCase().includes(propertyType.toLowerCase())
      const matchesBedrooms = bedrooms === "all" || property.bedrooms.toString() === bedrooms

      let matchesPrice = true
      if (priceRange !== "all") {
        const [min, max] = priceRange.split("-").map(Number)
        matchesPrice = property.price >= min && (max ? property.price <= max : true)
      }

      return matchesSearch && matchesType && matchesBedrooms && matchesPrice
    })

    // Sort properties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "sqft-high":
          return b.sqft - a.sqft
        case "newest":
          return b.yearBuilt - a.yearBuilt
        case "days-market":
          return a.daysOnMarket - b.daysOnMarket
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, propertyType, bedrooms, priceRange, sortBy])

  const getPropertyTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "single family":
        return <Home className="h-4 w-4" />
      case "condo":
        return <Building className="h-4 w-4" />
      case "townhouse":
        return <TreePine className="h-4 w-4" />
      case "commercial":
        return <Warehouse className="h-4 w-4" />
      default:
        return <Home className="h-4 w-4" />
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600">
              <Home className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Real Estate Marketplace
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover your dream property with AI-powered search and comprehensive market insights
          </p>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary" className="text-sm">
              {filteredProperties.length} Properties Available
            </Badge>
            <Badge variant="outline" className="text-sm">
              {comparedProperties.length} Selected for Comparison
            </Badge>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Properties
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-white/10 border-white/20"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="h-8 w-8 p-0"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Main Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by location, property type, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-lg h-12"
              />
            </div>

            {/* Quick Filters */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="single">Single Family</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>

              <Select value={bedrooms} onValueChange={setBedrooms}>
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Bedrooms</SelectItem>
                  <SelectItem value="1">1+ Bedroom</SelectItem>
                  <SelectItem value="2">2+ Bedrooms</SelectItem>
                  <SelectItem value="3">3+ Bedrooms</SelectItem>
                  <SelectItem value="4">4+ Bedrooms</SelectItem>
                  <SelectItem value="5">5+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Price</SelectItem>
                  <SelectItem value="0-500000">Under $500K</SelectItem>
                  <SelectItem value="500000-1000000">$500K - $1M</SelectItem>
                  <SelectItem value="1000000-2000000">$1M - $2M</SelectItem>
                  <SelectItem value="2000000-5000000">$2M - $5M</SelectItem>
                  <SelectItem value="5000000-999999999">$5M+</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="sqft-high">Largest First</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="days-market">Recently Listed</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                <SortAsc className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>

            {/* Advanced Filters (Collapsible) */}
            {showFilters && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                <div>
                  <label className="text-sm font-medium mb-2 block">Min Square Feet</label>
                  <Input placeholder="e.g. 1500" className="bg-white/10 border-white/20" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Max HOA</label>
                  <Input placeholder="e.g. 500" className="bg-white/10 border-white/20" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Year Built (Min)</label>
                  <Input placeholder="e.g. 2000" className="bg-white/10 border-white/20" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Days on Market</label>
                  <Select>
                    <SelectTrigger className="bg-white/10 border-white/20">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Time</SelectItem>
                      <SelectItem value="7">Last 7 days</SelectItem>
                      <SelectItem value="30">Last 30 days</SelectItem>
                      <SelectItem value="90">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Property Comparison Bar */}
        {comparedProperties.length > 0 && <PropertyComparisonBar />}

        {/* Properties Grid/List */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Available Properties ({filteredProperties.length})
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-white/10 border-white/20">
                  <Heart className="h-4 w-4 mr-2" />
                  Save Search
                </Button>
                <Button variant="outline" size="sm" className="bg-white/10 border-white/20">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <Card
                    key={property.id}
                    className="bg-white/5 border-white/10 hover:border-blue-500/30 transition-all duration-300 group overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={property.images[0] || "/placeholder.svg"}
                        alt={property.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-blue-500/80 text-white">{property.status}</Badge>
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70"
                          onClick={() => {
                            if (comparedProperties.find((p) => p.id === property.id)) {
                              removeFromComparison(property.id)
                            } else {
                              addToComparison(property)
                            }
                          }}
                        >
                          <Heart
                            className={`h-4 w-4 ${comparedProperties.find((p) => p.id === property.id) ? "fill-red-500 text-red-500" : "text-white"}`}
                          />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70">
                          <Share2 className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <Badge variant="secondary" className="bg-black/70 text-white">
                          {property.daysOnMarket} days on market
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg font-bold text-blue-400">
                            {formatPrice(property.price)}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            ${formatNumber(property.pricePerSqft)}/sqft
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-1">
                          {getPropertyTypeIcon(property.propertyType)}
                          <span className="text-xs text-muted-foreground">{property.propertyType}</span>
                        </div>
                      </div>
                      <CardTitle className="text-base">{property.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {property.address}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          <span>{property.bedrooms} bed</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="h-4 w-4" />
                          <span>{property.bathrooms} bath</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Square className="h-4 w-4" />
                          <span>{formatNumber(property.sqft)} sqft</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {property.features.slice(0, 3).map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
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
                        <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          className="bg-white/10 border-white/20"
                          onClick={() => {
                            if (comparedProperties.find((p) => p.id === property.id)) {
                              removeFromComparison(property.id)
                            } else {
                              addToComparison(property)
                            }
                          }}
                        >
                          {comparedProperties.find((p) => p.id === property.id) ? "Remove" : "Compare"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProperties.map((property) => (
                  <Card
                    key={property.id}
                    className="bg-white/5 border-white/10 hover:border-blue-500/30 transition-colors"
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={property.images[0] || "/placeholder.svg"}
                          alt={property.title}
                          className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">{property.title}</h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {property.address}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-blue-400">{formatPrice(property.price)}</div>
                              <div className="text-sm text-muted-foreground">
                                ${formatNumber(property.pricePerSqft)}/sqft
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Bed className="h-4 w-4" />
                              <span>{property.bedrooms} bed</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Bath className="h-4 w-4" />
                              <span>{property.bathrooms} bath</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Square className="h-4 w-4" />
                              <span>{formatNumber(property.sqft)} sqft</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {property.propertyType}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {property.daysOnMarket} days on market
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {property.features.slice(0, 4).map((feature) => (
                                <Badge key={feature} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-white/10 border-white/20"
                                onClick={() => {
                                  if (comparedProperties.find((p) => p.id === property.id)) {
                                    removeFromComparison(property.id)
                                  } else {
                                    addToComparison(property)
                                  }
                                }}
                              >
                                {comparedProperties.find((p) => p.id === property.id) ? "Remove" : "Compare"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <Home className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Properties Found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Market Insights */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Market Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">+5.2%</div>
                <div className="text-sm text-muted-foreground">Price Growth (YoY)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">28</div>
                <div className="text-sm text-muted-foreground">Avg Days on Market</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">$1.2M</div>
                <div className="text-sm text-muted-foreground">Median Price</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">92%</div>
                <div className="text-sm text-muted-foreground">Sale-to-List Ratio</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
