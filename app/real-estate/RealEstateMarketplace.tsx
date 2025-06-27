"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Square,
  DollarSign,
  TrendingUp,
  Filter,
  Heart,
  Share,
  Eye,
  Sparkles,
  Target,
  Clock,
  CheckCircle,
} from "lucide-react"
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
  },
]

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

  const PropertyCard = ({ property }: { property: (typeof SAMPLE_PROPERTIES)[0] }) => (
    <Card className="bg-white/5 border-white/10 hover:border-blue-500/30 transition-all duration-300 group overflow-hidden">
      <div className="relative">
        <img
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70">
            <Heart className="h-4 w-4 text-white" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70">
            <Share className="h-4 w-4 text-white" />
          </Button>
        </div>
        <Badge className="absolute top-2 left-2 bg-green-600 text-white">
          {property.status.replace("-", " ").toUpperCase()}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">{property.title}</CardTitle>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3" />
              {property.address}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">${property.price.toLocaleString()}</div>
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
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Schedule Tour
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Real Estate Marketplace
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered property discovery with exclusive financing options
          </p>
        </div>

        {/* Priority Suggestions */}
        <Card className="bg-black/20 border-yellow-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              Priority Real Estate Opportunities
            </CardTitle>
            <CardDescription>High-impact investment opportunities identified by AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {prioritySuggestions.map((suggestion) => (
                <Card
                  key={suggestion.id}
                  className="bg-gradient-to-br from-yellow-500/10 to-orange-600/10 border-yellow-500/20"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-medium">{suggestion.title}</CardTitle>
                      <Badge className="bg-red-500/20 text-red-400">
                        <Target className="h-3 w-3 mr-1" />
                        High ROI
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">{suggestion.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {suggestion.timeframe}
                      </div>
                      <Button size="sm" className="h-6 text-xs bg-yellow-600 hover:bg-yellow-700">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Explore
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Immediate Actions */}
        <Card className="bg-black/20 border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              Ready to Act Now
            </CardTitle>
            <CardDescription>Properties and opportunities available for immediate action</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {immediateSuggestions.map((suggestion) => (
                <Card
                  key={suggestion.id}
                  className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/20"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-medium">{suggestion.title}</CardTitle>
                      <Badge className="bg-green-500/20 text-green-400">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Available
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">{suggestion.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                      <DollarSign className="h-3 w-3 mr-1" />
                      View Properties
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter Bar */}
        <Card className="bg-black/20 border-white/10">
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

              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Properties Grid */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Available Properties ({filteredProperties.length})</span>
              <Badge variant="secondary">All AI-Verified</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Properties Found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* All Real Estate Suggestions */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              All Real Estate Suggestions ({realEstateSuggestions.length})
            </CardTitle>
            <CardDescription>Complete AI-powered real estate recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {realEstateSuggestions.map((suggestion) => (
                <Card key={suggestion.id} className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-medium">{suggestion.title}</CardTitle>
                      <Badge
                        variant={
                          suggestion.impact === "high"
                            ? "destructive"
                            : suggestion.impact === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {suggestion.impact}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">{suggestion.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {suggestion.timeframe}
                      </div>
                      <Button size="sm" variant="outline" className="h-6 text-xs bg-transparent">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Apply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
