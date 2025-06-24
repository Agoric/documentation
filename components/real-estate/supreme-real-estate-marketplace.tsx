"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { motion, AnimatePresence } from "framer-motion"
import {
  Building2,
  Home,
  TrendingUp,
  MapPin,
  DollarSign,
  Search,
  Eye,
  Heart,
  Share2,
  Calculator,
  PieChart,
  BarChart3,
  Shield,
  Crown,
  Target,
  Briefcase,
  Factory,
  Store,
  TreePine,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock real estate data
const propertyTypes = [
  { id: "residential", name: "Residential", icon: Home, count: 1247, avgPrice: 485000 },
  { id: "commercial", name: "Commercial", icon: Building2, count: 892, avgPrice: 1250000 },
  { id: "industrial", name: "Industrial", icon: Factory, count: 234, avgPrice: 2100000 },
  { id: "retail", name: "Retail", icon: Store, count: 567, avgPrice: 750000 },
  { id: "land", name: "Land", icon: TreePine, count: 445, avgPrice: 125000 },
  { id: "luxury", name: "Luxury", icon: Crown, count: 156, avgPrice: 3500000 },
]

const featuredProperties = [
  {
    id: "1",
    title: "Supreme Authority Tower",
    type: "Commercial",
    location: "Manhattan, NY",
    price: 45000000,
    sqft: 125000,
    roi: 12.5,
    cap_rate: 8.2,
    image: "/placeholder.svg?height=300&width=400",
    status: "available",
    features: ["Prime Location", "Class A Building", "Full Occupancy", "Recent Renovation"],
    description: "Iconic commercial tower in the heart of Manhattan's financial district.",
    bedrooms: null,
    bathrooms: null,
    yearBuilt: 2018,
    propertyManager: "Supreme Authority Real Estate",
    tenants: 45,
    vacancy: 0,
    monthlyIncome: 375000,
    expenses: 125000,
    netIncome: 250000,
    appreciation: 15.2,
    tags: ["Premium", "High ROI", "Fully Leased"],
  },
  {
    id: "2",
    title: "QGI Luxury Residence",
    type: "Residential",
    location: "Beverly Hills, CA",
    price: 8500000,
    sqft: 12500,
    roi: 8.7,
    cap_rate: 6.1,
    image: "/placeholder.svg?height=300&width=400",
    status: "available",
    features: ["Ocean View", "Smart Home", "Private Pool", "Guest House"],
    description: "Stunning luxury residence with panoramic ocean views and premium amenities.",
    bedrooms: 7,
    bathrooms: 9,
    yearBuilt: 2021,
    propertyManager: "QGI Property Management",
    tenants: null,
    vacancy: null,
    monthlyIncome: 45000,
    expenses: 15000,
    netIncome: 30000,
    appreciation: 18.5,
    tags: ["Luxury", "Ocean View", "New Construction"],
  },
  {
    id: "3",
    title: "Industrial Distribution Center",
    type: "Industrial",
    location: "Dallas, TX",
    price: 12750000,
    sqft: 250000,
    roi: 14.2,
    cap_rate: 9.8,
    image: "/placeholder.svg?height=300&width=400",
    status: "under_contract",
    features: ["Logistics Hub", "Rail Access", "Modern Facility", "Long-term Lease"],
    description: "State-of-the-art distribution facility with excellent transportation access.",
    bedrooms: null,
    bathrooms: null,
    yearBuilt: 2020,
    propertyManager: "Supreme Logistics Real Estate",
    tenants: 3,
    vacancy: 0,
    monthlyIncome: 125000,
    expenses: 35000,
    netIncome: 90000,
    appreciation: 22.1,
    tags: ["Industrial", "High Growth", "Logistics"],
  },
  {
    id: "4",
    title: "Retail Shopping Plaza",
    type: "Retail",
    location: "Austin, TX",
    price: 6200000,
    sqft: 45000,
    roi: 11.3,
    cap_rate: 7.9,
    image: "/placeholder.svg?height=300&width=400",
    status: "available",
    features: ["High Traffic", "Anchor Tenants", "Parking", "Expansion Potential"],
    description: "Thriving retail plaza in a high-growth suburban market.",
    bedrooms: null,
    bathrooms: null,
    yearBuilt: 2015,
    propertyManager: "QGI Retail Management",
    tenants: 12,
    vacancy: 8,
    monthlyIncome: 52000,
    expenses: 18000,
    netIncome: 34000,
    appreciation: 12.8,
    tags: ["Retail", "Stable Income", "Growth Market"],
  },
  {
    id: "5",
    title: "Prime Development Land",
    type: "Land",
    location: "Phoenix, AZ",
    price: 2850000,
    sqft: 125000,
    roi: 25.4,
    cap_rate: null,
    image: "/placeholder.svg?height=300&width=400",
    status: "available",
    features: ["Zoned Mixed-Use", "Utilities Available", "Highway Access", "Growth Area"],
    description: "Prime development opportunity in rapidly expanding Phoenix market.",
    bedrooms: null,
    bathrooms: null,
    yearBuilt: null,
    propertyManager: "Supreme Development Group",
    tenants: null,
    vacancy: null,
    monthlyIncome: null,
    expenses: 5000,
    netIncome: null,
    appreciation: 35.7,
    tags: ["Development", "High Appreciation", "Mixed-Use"],
  },
  {
    id: "6",
    title: "Luxury Penthouse Collection",
    type: "Luxury",
    location: "Miami, FL",
    price: 15500000,
    sqft: 8500,
    roi: 9.2,
    cap_rate: 5.8,
    image: "/placeholder.svg?height=300&width=400",
    status: "available",
    features: ["Waterfront", "Private Elevator", "Rooftop Terrace", "Concierge"],
    description: "Exclusive penthouse collection with unparalleled luxury and amenities.",
    bedrooms: 5,
    bathrooms: 6,
    yearBuilt: 2022,
    propertyManager: "Supreme Luxury Properties",
    tenants: null,
    vacancy: null,
    monthlyIncome: 75000,
    expenses: 25000,
    netIncome: 50000,
    appreciation: 16.3,
    tags: ["Ultra-Luxury", "Waterfront", "Exclusive"],
  },
]

const marketStats = {
  totalValue: 2850000000,
  totalProperties: 3541,
  avgROI: 13.2,
  avgCapRate: 7.8,
  monthlyIncome: 12500000,
  occupancyRate: 94.2,
  appreciation: 18.7,
  newListings: 127,
}

const investmentOpportunities = [
  {
    id: "reit-1",
    name: "Supreme Authority REIT",
    type: "Commercial REIT",
    minInvestment: 10000,
    expectedReturn: 12.5,
    term: "5 years",
    risk: "Medium",
    description: "Diversified commercial real estate investment trust",
    totalRaised: 125000000,
    targetRaise: 200000000,
    investors: 2847,
    properties: 45,
  },
  {
    id: "fund-1",
    name: "QGI Development Fund",
    type: "Development Fund",
    minInvestment: 50000,
    expectedReturn: 18.2,
    term: "3-7 years",
    risk: "High",
    description: "Ground-up development projects in high-growth markets",
    totalRaised: 85000000,
    targetRaise: 150000000,
    investors: 892,
    properties: 12,
  },
  {
    id: "syndication-1",
    name: "Luxury Residential Syndication",
    type: "Syndication",
    minInvestment: 25000,
    expectedReturn: 14.8,
    term: "5-10 years",
    risk: "Medium-High",
    description: "Luxury residential properties in prime markets",
    totalRaised: 45000000,
    targetRaise: 75000000,
    investors: 567,
    properties: 8,
  },
]

export function SupremeRealEstateMarketplace() {
  const [selectedTab, setSelectedTab] = useState("browse")
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [filters, setFilters] = useState({
    type: "all",
    priceRange: [0, 50000000],
    location: "",
    minROI: 0,
    sortBy: "price_desc",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredProperties = featuredProperties.filter((property) => {
    const matchesType = filters.type === "all" || property.type.toLowerCase() === filters.type
    const matchesPrice = property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]
    const matchesROI = property.roi >= filters.minROI
    const matchesSearch =
      searchQuery === "" ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesType && matchesPrice && matchesROI && matchesSearch
  })

  const toggleFavorite = (propertyId: string) => {
    setFavorites((prev) => (prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Building2 className="w-12 h-12 text-amber-400" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-clip-text text-transparent font-serif">
                Supreme Real Estate Marketplace
              </h1>
              <p className="text-xl text-amber-300/80 italic">Global Property Investment Platform</p>
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-300">{formatCurrency(marketStats.totalValue)}</div>
                <div className="text-sm text-gray-400">Total Portfolio Value</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-300">{formatNumber(marketStats.totalProperties)}</div>
                <div className="text-sm text-gray-400">Properties Available</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-300">{marketStats.avgROI}%</div>
                <div className="text-sm text-gray-400">Average ROI</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-amber-900/50 to-yellow-900/50 border-amber-400/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-amber-300">{marketStats.occupancyRate}%</div>
                <div className="text-sm text-gray-400">Occupancy Rate</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50">
            <TabsTrigger value="browse">Browse Properties</TabsTrigger>
            <TabsTrigger value="investments">Investment Funds</TabsTrigger>
            <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
            <TabsTrigger value="analytics">Market Analytics</TabsTrigger>
            <TabsTrigger value="tools">Investment Tools</TabsTrigger>
          </TabsList>

          {/* Browse Properties Tab */}
          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filters */}
            <Card className="bg-slate-800/50 border-slate-600/50">
              <CardHeader>
                <CardTitle className="text-slate-300 flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  Search & Filter Properties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Search</label>
                    <Input
                      placeholder="Location, property name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-slate-700/50 border-slate-600/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Property Type</label>
                    <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Min ROI (%)</label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={filters.minROI}
                      onChange={(e) => setFilters({ ...filters, minROI: Number(e.target.value) })}
                      className="bg-slate-700/50 border-slate-600/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Sort By</label>
                    <Select value={filters.sortBy} onValueChange={(value) => setFilters({ ...filters, sortBy: value })}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="price_desc">Price: High to Low</SelectItem>
                        <SelectItem value="price_asc">Price: Low to High</SelectItem>
                        <SelectItem value="roi_desc">ROI: High to Low</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-slate-400">
                    Price Range: {formatCurrency(filters.priceRange[0])} - {formatCurrency(filters.priceRange[1])}
                  </label>
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                    max={50000000}
                    step={100000}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Property Types Overview */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {propertyTypes.map((type) => {
                const Icon = type.icon
                return (
                  <motion.div key={type.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Card
                      className={cn(
                        "cursor-pointer transition-all duration-300 hover:border-amber-400/50",
                        filters.type === type.id
                          ? "bg-gradient-to-br from-amber-900/50 to-yellow-900/50 border-amber-400/50"
                          : "bg-slate-800/50 border-slate-600/50",
                      )}
                      onClick={() => setFilters({ ...filters, type: type.id })}
                    >
                      <CardContent className="p-4 text-center">
                        <Icon className="w-8 h-8 mx-auto mb-2 text-amber-400" />
                        <div className="text-sm font-medium text-white">{type.name}</div>
                        <div className="text-xs text-gray-400">{type.count} properties</div>
                        <div className="text-xs text-amber-300">{formatCurrency(type.avgPrice)} avg</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Properties Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">{filteredProperties.length} Properties Found</h3>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant={viewMode === "grid" ? "default" : "outline"}
                    onClick={() => setViewMode("grid")}
                  >
                    Grid
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "list" ? "default" : "outline"}
                    onClick={() => setViewMode("list")}
                  >
                    List
                  </Button>
                </div>
              </div>

              <div
                className={cn(
                  "grid gap-6",
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1",
                )}
              >
                <AnimatePresence>
                  {filteredProperties.map((property, index) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-slate-800/50 border-slate-600/50 hover:border-amber-400/50 transition-all duration-300 overflow-hidden">
                        <div className="relative">
                          <img
                            src={property.image || "/placeholder.svg"}
                            alt={property.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge
                              className={cn(
                                "text-xs",
                                property.status === "available"
                                  ? "bg-green-600/80 text-green-100"
                                  : "bg-orange-600/80 text-orange-100",
                              )}
                            >
                              {property.status.replace("_", " ").toUpperCase()}
                            </Badge>
                          </div>
                          <div className="absolute top-4 right-4 flex space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70"
                              onClick={() => toggleFavorite(property.id)}
                            >
                              <Heart
                                className={cn(
                                  "w-4 h-4",
                                  favorites.includes(property.id) ? "text-red-400 fill-red-400" : "text-white",
                                )}
                              />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70">
                              <Share2 className="w-4 h-4 text-white" />
                            </Button>
                          </div>
                          <div className="absolute bottom-4 left-4">
                            <div className="flex space-x-1">
                              {property.tags.map((tag) => (
                                <Badge key={tag} className="text-xs bg-purple-600/80 text-purple-100">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <CardContent className="p-6 space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-1">{property.title}</h3>
                            <div className="flex items-center text-sm text-gray-400">
                              <MapPin className="w-4 h-4 mr-1" />
                              {property.location}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-gray-400">Price</div>
                              <div className="text-lg font-bold text-green-300">{formatCurrency(property.price)}</div>
                            </div>
                            <div>
                              <div className="text-gray-400">ROI</div>
                              <div className="text-lg font-bold text-purple-300">{property.roi}%</div>
                            </div>
                            <div>
                              <div className="text-gray-400">Square Feet</div>
                              <div className="text-white">{formatNumber(property.sqft)} sq ft</div>
                            </div>
                            <div>
                              <div className="text-gray-400">Cap Rate</div>
                              <div className="text-white">{property.cap_rate}%</div>
                            </div>
                          </div>

                          {property.monthlyIncome && (
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div>
                                <div className="text-gray-400">Monthly Income</div>
                                <div className="text-green-300">{formatCurrency(property.monthlyIncome)}</div>
                              </div>
                              <div>
                                <div className="text-gray-400">Expenses</div>
                                <div className="text-red-300">{formatCurrency(property.expenses)}</div>
                              </div>
                              <div>
                                <div className="text-gray-400">Net Income</div>
                                <div className="text-blue-300">{formatCurrency(property.netIncome)}</div>
                              </div>
                            </div>
                          )}

                          <div className="flex space-x-2">
                            <Button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                            <Button variant="outline" className="border-amber-400/30 text-amber-300">
                              <Calculator className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </TabsContent>

          {/* Investment Funds Tab */}
          <TabsContent value="investments" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Real Estate Investment Opportunities</h2>
              <p className="text-slate-400">Diversified investment funds and syndications</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investmentOpportunities.map((opportunity, index) => (
                <motion.div
                  key={opportunity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/50 border-purple-400/30 h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-purple-300">{opportunity.name}</CardTitle>
                        <Badge
                          className={cn(
                            "text-xs",
                            opportunity.risk === "Low"
                              ? "bg-green-600/20 text-green-300"
                              : opportunity.risk === "Medium"
                                ? "bg-yellow-600/20 text-yellow-300"
                                : "bg-red-600/20 text-red-300",
                          )}
                        >
                          {opportunity.risk} Risk
                        </Badge>
                      </div>
                      <CardDescription className="text-purple-200/70">{opportunity.type}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-300">{opportunity.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">Min Investment</div>
                          <div className="text-purple-300 font-semibold">
                            {formatCurrency(opportunity.minInvestment)}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400">Expected Return</div>
                          <div className="text-green-300 font-semibold">{opportunity.expectedReturn}%</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Investment Term</div>
                          <div className="text-white">{opportunity.term}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Investors</div>
                          <div className="text-white">{formatNumber(opportunity.investors)}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Funding Progress</span>
                          <span className="text-purple-300">
                            {formatCurrency(opportunity.totalRaised)} / {formatCurrency(opportunity.targetRaise)}
                          </span>
                        </div>
                        <Progress value={(opportunity.totalRaised / opportunity.targetRaise) * 100} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <div className="text-gray-400">Properties</div>
                          <div className="text-white">{opportunity.properties}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Status</div>
                          <div className="text-green-300">Open</div>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Invest Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">My Real Estate Portfolio</h2>
              <p className="text-slate-400">Track your property investments and performance</p>
            </div>

            {/* Portfolio Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-300 mb-2">{formatCurrency(12750000)}</div>
                  <div className="text-sm text-gray-400">Total Portfolio Value</div>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+18.7%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-300 mb-2">7</div>
                  <div className="text-sm text-gray-400">Properties Owned</div>
                  <div className="text-blue-300 text-sm mt-2">Across 4 markets</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-300 mb-2">{formatCurrency(125000)}</div>
                  <div className="text-sm text-gray-400">Monthly Income</div>
                  <div className="text-purple-300 text-sm mt-2">Net cash flow</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-900/50 to-yellow-900/50 border-amber-400/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-amber-300 mb-2">13.2%</div>
                  <div className="text-sm text-gray-400">Average ROI</div>
                  <div className="text-amber-300 text-sm mt-2">Above market avg</div>
                </CardContent>
              </Card>
            </div>

            {/* Portfolio Breakdown */}
            <Card className="bg-slate-800/50 border-slate-600/50">
              <CardHeader>
                <CardTitle className="text-slate-300 flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
                  Portfolio Allocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {[
                      { type: "Commercial", value: 45, color: "bg-blue-500" },
                      { type: "Residential", value: 30, color: "bg-green-500" },
                      { type: "Industrial", value: 15, color: "bg-purple-500" },
                      { type: "Retail", value: 10, color: "bg-amber-500" },
                    ].map((item) => (
                      <div key={item.type} className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded ${item.color}`} />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="text-white">{item.type}</span>
                            <span className="text-gray-400">{item.value}%</span>
                          </div>
                          <Progress value={item.value} className="h-2 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">Performance Metrics</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Return</span>
                        <span className="text-green-300">+24.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Annual Yield</span>
                        <span className="text-blue-300">8.7%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Occupancy Rate</span>
                        <span className="text-purple-300">96.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Debt-to-Equity</span>
                        <span className="text-amber-300">65%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Market Analytics</h2>
              <p className="text-slate-400">Real estate market insights and trends</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-600/50">
                <CardHeader>
                  <CardTitle className="text-slate-300 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Market Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { market: "Commercial", trend: "+15.2%", color: "text-green-400" },
                      { market: "Residential", trend: "+8.7%", color: "text-green-400" },
                      { market: "Industrial", trend: "+22.1%", color: "text-green-400" },
                      { market: "Retail", trend: "+3.4%", color: "text-yellow-400" },
                      { market: "Land", trend: "+35.7%", color: "text-green-400" },
                      { market: "Luxury", trend: "+12.8%", color: "text-green-400" },
                    ].map((item) => (
                      <div key={item.market} className="flex items-center justify-between">
                        <span className="text-white">{item.market}</span>
                        <span className={`font-semibold ${item.color}`}>{item.trend}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-600/50">
                <CardHeader>
                  <CardTitle className="text-slate-300 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Investment Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { opportunity: "Phoenix Development", score: 95, risk: "Medium" },
                      { opportunity: "Austin Retail Plaza", score: 88, risk: "Low" },
                      { opportunity: "Miami Luxury Condos", score: 92, risk: "High" },
                      { opportunity: "Dallas Industrial", score: 87, risk: "Low" },
                    ].map((item) => (
                      <div key={item.opportunity} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white">{item.opportunity}</span>
                          <Badge
                            className={cn(
                              "text-xs",
                              item.risk === "Low"
                                ? "bg-green-600/20 text-green-300"
                                : item.risk === "Medium"
                                  ? "bg-yellow-600/20 text-yellow-300"
                                  : "bg-red-600/20 text-red-300",
                            )}
                          >
                            {item.risk}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={item.score} className="flex-1 h-2" />
                          <span className="text-amber-300 text-sm">{item.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Investment Tools</h2>
              <p className="text-slate-400">Calculate returns, analyze deals, and plan investments</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "ROI Calculator",
                  description: "Calculate return on investment for properties",
                  icon: Calculator,
                  color: "from-green-600 to-emerald-600",
                },
                {
                  title: "Cash Flow Analyzer",
                  description: "Analyze monthly cash flow and expenses",
                  icon: DollarSign,
                  color: "from-blue-600 to-cyan-600",
                },
                {
                  title: "Market Comparator",
                  description: "Compare properties and market values",
                  icon: BarChart3,
                  color: "from-purple-600 to-indigo-600",
                },
                {
                  title: "Financing Calculator",
                  description: "Calculate loan payments and scenarios",
                  icon: Briefcase,
                  color: "from-amber-600 to-yellow-600",
                },
                {
                  title: "Risk Assessment",
                  description: "Evaluate investment risks and mitigation",
                  icon: Shield,
                  color: "from-red-600 to-pink-600",
                },
                {
                  title: "Portfolio Optimizer",
                  description: "Optimize your real estate portfolio",
                  icon: Target,
                  color: "from-indigo-600 to-purple-600",
                },
              ].map((tool, index) => {
                const Icon = tool.icon
                return (
                  <motion.div
                    key={tool.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card className="bg-slate-800/50 border-slate-600/50 hover:border-amber-400/50 transition-all duration-300 cursor-pointer h-full">
                      <CardContent className="p-6 text-center space-y-4">
                        <div
                          className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${tool.color} flex items-center justify-center`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">{tool.title}</h3>
                          <p className="text-sm text-gray-400">{tool.description}</p>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                          Launch Tool
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
