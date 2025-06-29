"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  MapPin,
  Building2,
  TrendingUp,
  Bed,
  Bath,
  Square,
  Heart,
  Share,
  Eye,
  Calculator,
  Coins,
  Search,
  Zap,
  BarChart3,
} from "lucide-react"

interface Property {
  id: string
  title: string
  location: string
  price: number
  type: "house" | "condo" | "townhouse" | "land"
  bedrooms: number
  bathrooms: number
  sqft: number
  yearBuilt: number
  images: string[]
  features: string[]
  roi: number
  appreciation: number
  rentEstimate: number
  snapDaxIntegration: boolean
  tokenized: boolean
  virtualTour: boolean
  status: "available" | "pending" | "sold"
}

export default function RealEstateMarketplace() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [priceRange, setPriceRange] = React.useState([100000, 2000000])
  const [propertyType, setPropertyType] = React.useState("all")
  const [sortBy, setSortBy] = React.useState("price-low")
  const [viewMode, setViewMode] = React.useState("grid")
  const [selectedProperty, setSelectedProperty] = React.useState<Property | null>(null)

  const properties: Property[] = [
    {
      id: "1",
      title: "Luxury Modern Estate",
      location: "Beverly Hills, CA",
      price: 2850000,
      type: "house",
      bedrooms: 5,
      bathrooms: 4,
      sqft: 4200,
      yearBuilt: 2019,
      images: ["/properties/luxury-modern-home.jpg"],
      features: ["Pool", "Smart Home", "Gourmet Kitchen", "Wine Cellar", "Home Theater"],
      roi: 12.4,
      appreciation: 8.7,
      rentEstimate: 15000,
      snapDaxIntegration: true,
      tokenized: true,
      virtualTour: true,
      status: "available",
    },
    {
      id: "2",
      title: "Oceanfront Villa",
      location: "Malibu, CA",
      price: 4200000,
      type: "house",
      bedrooms: 6,
      bathrooms: 5,
      sqft: 5800,
      yearBuilt: 2021,
      images: ["/properties/oceanfront-estate.jpg"],
      features: ["Ocean View", "Private Beach", "Infinity Pool", "Guest House", "Elevator"],
      roi: 15.2,
      appreciation: 11.3,
      rentEstimate: 25000,
      snapDaxIntegration: true,
      tokenized: true,
      virtualTour: true,
      status: "available",
    },
    {
      id: "3",
      title: "Downtown Luxury Loft",
      location: "Los Angeles, CA",
      price: 1250000,
      type: "condo",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1800,
      yearBuilt: 2020,
      images: ["/properties/downtown-loft.jpg"],
      features: ["City View", "Rooftop Deck", "Concierge", "Gym", "Parking"],
      roi: 9.8,
      appreciation: 6.5,
      rentEstimate: 6500,
      snapDaxIntegration: true,
      tokenized: false,
      virtualTour: true,
      status: "available",
    },
    {
      id: "4",
      title: "Family Suburban Home",
      location: "Pasadena, CA",
      price: 875000,
      type: "house",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      yearBuilt: 2015,
      images: ["/properties/suburban-family-home.jpg"],
      features: ["Large Yard", "Updated Kitchen", "Hardwood Floors", "Garage", "School District"],
      roi: 7.2,
      appreciation: 5.8,
      rentEstimate: 4200,
      snapDaxIntegration: false,
      tokenized: false,
      virtualTour: false,
      status: "available",
    },
    {
      id: "5",
      title: "Hollywood Hills Contemporary",
      location: "Hollywood Hills, CA",
      price: 1850000,
      type: "house",
      bedrooms: 3,
      bathrooms: 3,
      sqft: 3200,
      yearBuilt: 2018,
      images: ["/properties/hollywood-hills-contemporary.jpg"],
      features: ["City Views", "Modern Design", "Pool", "Home Office", "Security System"],
      roi: 10.5,
      appreciation: 9.2,
      rentEstimate: 8500,
      snapDaxIntegration: true,
      tokenized: true,
      virtualTour: true,
      status: "pending",
    },
    {
      id: "6",
      title: "Santa Monica Beachfront",
      location: "Santa Monica, CA",
      price: 3200000,
      type: "condo",
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2400,
      yearBuilt: 2022,
      images: ["/properties/santa-monica-beachfront.jpg"],
      features: ["Beach Access", "Balcony", "Luxury Finishes", "Spa", "Valet Parking"],
      roi: 13.8,
      appreciation: 10.1,
      rentEstimate: 18000,
      snapDaxIntegration: true,
      tokenized: true,
      virtualTour: true,
      status: "available",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1]
    const matchesType = propertyType === "all" || property.type === propertyType

    return matchesSearch && matchesPrice && matchesType
  })

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "roi":
        return b.roi - a.roi
      case "sqft":
        return b.sqft - a.sqft
      default:
        return 0
    }
  })

  const PropertyCard = ({ property }: { property: Property }) => (
    <Card className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={property.images[0] || "/placeholder.svg"}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {property.snapDaxIntegration && (
            <Badge className="bg-orange-500/90 text-white">
              <Coins className="h-3 w-3 mr-1" />
              SNAP-DAX
            </Badge>
          )}
          {property.tokenized && (
            <Badge className="bg-blue-500/90 text-white">
              <Zap className="h-3 w-3 mr-1" />
              Tokenized
            </Badge>
          )}
          {property.virtualTour && (
            <Badge className="bg-purple-500/90 text-white">
              <Eye className="h-3 w-3 mr-1" />
              Virtual Tour
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <Button size="sm" variant="ghost" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
            <Share className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute bottom-3 right-3">
          <Badge
            className={`${property.status === "available" ? "bg-green-500/90" : property.status === "pending" ? "bg-yellow-500/90" : "bg-red-500/90"} text-white`}
          >
            {property.status}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-white text-lg group-hover:text-blue-400 transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 text-slate-400">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{property.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white">{formatCurrency(property.price)}</div>
            <div className="flex items-center gap-1 text-green-400">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">+{property.roi}% ROI</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              <span>{property.sqft.toLocaleString()} sqft</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div>
              <span className="text-slate-400">Rent Est:</span>
              <span className="text-white font-medium ml-1">{formatCurrency(property.rentEstimate)}/mo</span>
            </div>
            <div>
              <span className="text-slate-400">Appreciation:</span>
              <span className="text-green-400 font-medium ml-1">+{property.appreciation}%</span>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
            {property.snapDaxIntegration && (
              <Button
                variant="outline"
                className="bg-orange-600/20 border-orange-500/30 text-orange-400 hover:bg-orange-600/30"
              >
                <Coins className="h-4 w-4 mr-2" />
                Invest
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Real Estate Marketplace
            </h1>
            <p className="text-xl text-blue-200 mt-2">Powered by SNAP-DAX Integration & Tokenized Investments</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Building2 className="h-4 w-4 mr-2" />
              {properties.length} Properties
            </Badge>
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
              <Coins className="h-4 w-4 mr-2" />
              SNAP-DAX Enabled
            </Badge>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Calculator className="h-4 w-4 mr-2" />
              Investment Calculator
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Search Properties</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Location, property type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-800/50 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Property Type</Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="roi">Highest ROI</SelectItem>
                    <SelectItem value="sqft">Largest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Price Range</Label>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={5000000}
                    min={100000}
                    step={50000}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-sm text-slate-400 mt-1">
                    <span>{formatCurrency(priceRange[0])}</span>
                    <span>{formatCurrency(priceRange[1])}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 backdrop-blur-sm">
            <TabsTrigger value="properties">All Properties</TabsTrigger>
            <TabsTrigger value="snap-dax">SNAP-DAX Enabled</TabsTrigger>
            <TabsTrigger value="tokenized">Tokenized</TabsTrigger>
            <TabsTrigger value="analytics">Market Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <span className="text-lg font-medium">{sortedProperties.length} properties found</span>
                <span className="text-slate-400 ml-2">• Sorted by {sortBy.replace("-", " ")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="bg-slate-700 border-slate-600"
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="bg-slate-700 border-slate-600"
                >
                  List
                </Button>
              </div>
            </div>

            <div
              className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
            >
              {sortedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="snap-dax" className="space-y-6">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {sortedProperties
                .filter((p) => p.snapDaxIntegration)
                .map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="tokenized" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/30 backdrop-blur-sm border-blue-500/20 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Zap className="h-5 w-5" />
                  Tokenized Real Estate Investment
                </CardTitle>
                <CardDescription className="text-blue-200">
                  Invest in fractional ownership of premium properties with SNAP-DAX integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">$50</div>
                    <div className="text-blue-200 text-sm">Minimum Investment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">12.4%</div>
                    <div className="text-blue-200 text-sm">Average ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-blue-200 text-sm">Liquidity Trading</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {sortedProperties
                .filter((p) => p.tokenized)
                .map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 backdrop-blur-sm border-green-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-200">Average ROI</p>
                      <p className="text-2xl font-bold text-white">11.2%</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        <span className="text-green-400">+2.3% vs last year</span>
                      </div>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-200">Market Growth</p>
                      <p className="text-2xl font-bold text-white">8.7%</p>
                      <p className="text-sm text-blue-400">Year over year</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/30 backdrop-blur-sm border-orange-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-200">SNAP-DAX Volume</p>
                      <p className="text-2xl font-bold text-white">$2.4M</p>
                      <p className="text-sm text-orange-400">Monthly trading</p>
                    </div>
                    <Coins className="h-8 w-8 text-orange-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-200">Tokenized Assets</p>
                      <p className="text-2xl font-bold text-white">$18.5M</p>
                      <p className="text-sm text-purple-400">Total value</p>
                    </div>
                    <Zap className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <BarChart3 className="h-5 w-5" />
                    Market Trends
                  </CardTitle>
                  <CardDescription className="text-slate-300">Real estate market performance by region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                      <div>
                        <div className="font-medium text-white">Beverly Hills</div>
                        <div className="text-sm text-slate-400">Luxury Market</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-400">+15.2%</div>
                        <div className="text-sm text-slate-400">YoY Growth</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                      <div>
                        <div className="font-medium text-white">Santa Monica</div>
                        <div className="text-sm text-slate-400">Beachfront</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-400">+12.8%</div>
                        <div className="text-sm text-slate-400">YoY Growth</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                      <div>
                        <div className="font-medium text-white">Hollywood Hills</div>
                        <div className="text-sm text-slate-400">Celebrity Homes</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-400">+9.4%</div>
                        <div className="text-sm text-slate-400">YoY Growth</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Calculator className="h-5 w-5" />
                    Investment Calculator
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Calculate potential returns with SNAP-DAX integration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">Investment Amount</Label>
                      <Input
                        type="number"
                        placeholder="$10,000"
                        className="bg-slate-800/50 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Investment Period (years)</Label>
                      <Slider defaultValue={[5]} max={30} min={1} step={1} className="mt-2" />
                    </div>
                    <div className="bg-slate-800/30 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">$18,450</div>
                        <div className="text-sm text-slate-400">Projected Value (5 years)</div>
                        <div className="text-xs text-slate-500 mt-1">Based on 11.2% average ROI</div>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Calculator className="h-4 w-4 mr-2" />
                      Get Detailed Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
