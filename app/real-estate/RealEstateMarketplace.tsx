"use client"

import * as React from "react"
import { motion } from "framer-motion"
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
  Heart,
  Eye,
  Sparkles,
  Target,
  Calculator,
  FileText,
} from "lucide-react"

interface Property {
  id: string
  title: string
  price: number
  address: string
  city: string
  state: string
  bedrooms: number
  bathrooms: number
  sqft: number
  lotSize: string
  yearBuilt: number
  propertyType: string
  listingType: string
  images: string[]
  description: string
  features: string[]
  roi: number
  capRate: number
  cashFlow: number
  appreciation: number
  neighborhood: {
    walkScore: number
    schools: string
    crime: string
    amenities: string[]
  }
  financing: {
    downPayment: number
    monthlyPayment: number
    interestRate: number
    loanTerm: number
  }
}

const SAMPLE_PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Luxury Modern Estate",
    price: 2850000,
    address: "1234 Beverly Hills Dr",
    city: "Beverly Hills",
    state: "CA",
    bedrooms: 6,
    bathrooms: 7,
    sqft: 8500,
    lotSize: "1.2 acres",
    yearBuilt: 2019,
    propertyType: "single-family",
    listingType: "sale",
    images: ["/properties/luxury-modern-home.jpg"],
    description:
      "Stunning contemporary estate with panoramic city views, infinity pool, and smart home technology throughout.",
    features: ["Infinity Pool", "Smart Home", "Wine Cellar", "Home Theater", "Gym", "Guest House"],
    roi: 18.5,
    capRate: 4.2,
    cashFlow: 8500,
    appreciation: 12.3,
    neighborhood: {
      walkScore: 85,
      schools: "A+ Rated",
      crime: "Very Low",
      amenities: ["Shopping", "Restaurants", "Parks", "Golf"],
    },
    financing: {
      downPayment: 570000,
      monthlyPayment: 12450,
      interestRate: 3.25,
      loanTerm: 30,
    },
  },
  {
    id: "2",
    title: "Oceanfront Investment Property",
    price: 1950000,
    address: "567 Pacific Coast Hwy",
    city: "Malibu",
    state: "CA",
    bedrooms: 4,
    bathrooms: 5,
    sqft: 4200,
    lotSize: "0.8 acres",
    yearBuilt: 2015,
    propertyType: "single-family",
    listingType: "sale",
    images: ["/properties/oceanfront-estate.jpg"],
    description: "Direct oceanfront property with private beach access, perfect for vacation rental investment.",
    features: ["Ocean View", "Private Beach", "Deck", "Fireplace", "Gourmet Kitchen"],
    roi: 22.1,
    capRate: 5.8,
    cashFlow: 12200,
    appreciation: 15.7,
    neighborhood: {
      walkScore: 72,
      schools: "A Rated",
      crime: "Low",
      amenities: ["Beach", "Restaurants", "Shopping"],
    },
    financing: {
      downPayment: 390000,
      monthlyPayment: 8950,
      interestRate: 3.5,
      loanTerm: 30,
    },
  },
  {
    id: "3",
    title: "Downtown Investment Loft",
    price: 850000,
    address: "890 Main St",
    city: "Los Angeles",
    state: "CA",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1800,
    lotSize: "N/A",
    yearBuilt: 2020,
    propertyType: "condo",
    listingType: "sale",
    images: ["/properties/downtown-loft.jpg"],
    description: "Modern loft in the heart of downtown with high rental demand and excellent appreciation potential.",
    features: ["City Views", "Rooftop Access", "Concierge", "Gym", "Pool"],
    roi: 25.3,
    capRate: 6.2,
    cashFlow: 3200,
    appreciation: 18.9,
    neighborhood: {
      walkScore: 95,
      schools: "B+ Rated",
      crime: "Medium",
      amenities: ["Transit", "Restaurants", "Entertainment", "Shopping"],
    },
    financing: {
      downPayment: 170000,
      monthlyPayment: 4250,
      interestRate: 3.75,
      loanTerm: 30,
    },
  },
]

export default function RealEstateMarketplace() {
  const [properties, setProperties] = React.useState<Property[]>(SAMPLE_PROPERTIES)
  const [filteredProperties, setFilteredProperties] = React.useState<Property[]>(SAMPLE_PROPERTIES)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [propertyTypeFilter, setPropertyTypeFilter] = React.useState("all")
  const [bedroomFilter, setBedroomFilter] = React.useState("all")
  const [priceRange, setPriceRange] = React.useState({ min: "", max: "" })
  const [sortBy, setSortBy] = React.useState("price-low")
  const [hoveredProperty, setHoveredProperty] = React.useState<string | null>(null)

  // Filter and sort properties
  React.useEffect(() => {
    let filtered = [...properties]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.address.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Property type filter
    if (propertyTypeFilter !== "all") {
      filtered = filtered.filter((property) => property.propertyType === propertyTypeFilter)
    }

    // Bedroom filter
    if (bedroomFilter !== "all") {
      const bedrooms = Number.parseInt(bedroomFilter)
      filtered = filtered.filter((property) => property.bedrooms >= bedrooms)
    }

    // Price range filter
    if (priceRange.min) {
      filtered = filtered.filter((property) => property.price >= Number.parseInt(priceRange.min))
    }
    if (priceRange.max) {
      filtered = filtered.filter((property) => property.price <= Number.parseInt(priceRange.max))
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "roi-high":
        filtered.sort((a, b) => b.roi - a.roi)
        break
      case "sqft-high":
        filtered.sort((a, b) => b.sqft - a.sqft)
        break
    }

    setFilteredProperties(filtered)
  }, [properties, searchTerm, propertyTypeFilter, bedroomFilter, priceRange, sortBy])

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Real Estate Marketplace
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Discover high-yield investment properties with AI-powered analysis and instant financing options
          </p>
          <div className="flex justify-center gap-4">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              <TrendingUp className="w-4 h-4 mr-2" />
              High ROI Properties
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Calculator className="w-4 h-4 mr-2" />
              Investment Analysis
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              <FileText className="w-4 h-4 mr-2" />
              Instant Financing
            </Badge>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {/* Search */}
                <div className="lg:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search by location, property type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>

                {/* Property Type */}
                <Select value={propertyTypeFilter} onValueChange={setPropertyTypeFilter}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="single-family">Single Family</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="multi-family">Multi-Family</SelectItem>
                  </SelectContent>
                </Select>

                {/* Bedrooms */}
                <Select value={bedroomFilter} onValueChange={setBedroomFilter}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                    <SelectValue placeholder="Bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Bedrooms</SelectItem>
                    <SelectItem value="1">1+ Bedrooms</SelectItem>
                    <SelectItem value="2">2+ Bedrooms</SelectItem>
                    <SelectItem value="3">3+ Bedrooms</SelectItem>
                    <SelectItem value="4">4+ Bedrooms</SelectItem>
                    <SelectItem value="5">5+ Bedrooms</SelectItem>
                  </SelectContent>
                </Select>

                {/* Price Range */}
                <Input
                  placeholder="Min Price"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                />

                {/* Sort By */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="roi-high">ROI: High to Low</SelectItem>
                    <SelectItem value="sqft-high">Size: Largest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Properties Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onMouseEnter={() => setHoveredProperty(property.id)}
              onMouseLeave={() => setHoveredProperty(null)}
              className="group"
            >
              <Card
                className={`h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50 hover:border-emerald-500/50 transition-all duration-500 relative overflow-hidden ${
                  hoveredProperty === property.id ? "scale-[1.02] shadow-2xl" : ""
                }`}
              >
                {/* Holographic border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />

                {/* Floating particles effect */}
                {hoveredProperty === property.id && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -30, 0],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Property Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={property.images[0] || "/placeholder.svg?height=200&width=400"}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* ROI Badge */}
                  <Badge className="absolute top-3 left-3 bg-emerald-500/90 text-white">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {property.roi}% ROI
                  </Badge>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm border-white/30">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm border-white/30">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-3 left-3">
                    <div className="text-2xl font-bold text-white">{formatCurrency(property.price)}</div>
                    <div className="text-sm text-emerald-400">+{formatCurrency(property.cashFlow)}/mo cash flow</div>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  {/* Property Info */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-slate-400 text-sm mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.address}, {property.city}, {property.state}
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-slate-300">
                        <Bed className="w-4 h-4 mr-1" />
                        {property.bedrooms}
                      </div>
                      <div className="flex items-center text-slate-300">
                        <Bath className="w-4 h-4 mr-1" />
                        {property.bathrooms}
                      </div>
                      <div className="flex items-center text-slate-300">
                        <Square className="w-4 h-4 mr-1" />
                        {formatNumber(property.sqft)} sqft
                      </div>
                    </div>
                  </div>

                  {/* Investment Metrics */}
                  <div className="grid grid-cols-2 gap-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="text-center">
                      <div className="text-lg font-bold text-emerald-400">{property.capRate}%</div>
                      <div className="text-xs text-slate-400">Cap Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-emerald-400">+{property.appreciation}%</div>
                      <div className="text-xs text-slate-400">Appreciation</div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <div className="flex flex-wrap gap-1">
                      {property.features.slice(0, 3).map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-slate-600 text-slate-300">
                          {feature}
                        </Badge>
                      ))}
                      {property.features.length > 3 && (
                        <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                          +{property.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Financing Info */}
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-300">Monthly Payment:</span>
                      <span className="font-medium text-white">
                        {formatCurrency(property.financing.monthlyPayment)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-1">
                      <span className="text-slate-300">Down Payment:</span>
                      <span className="font-medium text-white">{formatCurrency(property.financing.downPayment)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 group-hover:scale-105 transition-all duration-300">
                      <Calculator className="w-4 h-4 mr-2" />
                      Analyze
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 group-hover:scale-105 transition-all duration-300 bg-transparent"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Finance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Market Insights */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Target className="h-6 w-6 text-emerald-400" />
                Market Insights & Investment Opportunities
              </CardTitle>
              <CardDescription className="text-slate-300">
                AI-powered market analysis and investment recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="h-6 w-6 text-emerald-400" />
                    <div>
                      <div className="font-medium text-white">High Growth Markets</div>
                      <div className="text-sm text-emerald-400">+15.7% avg appreciation</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300">
                    Beverly Hills and Malibu showing strong appreciation trends with institutional investor interest.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="h-6 w-6 text-blue-400" />
                    <div>
                      <div className="font-medium text-white">Cash Flow Leaders</div>
                      <div className="text-sm text-blue-400">$8,500+ monthly</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300">
                    Multi-family properties in downtown areas generating exceptional rental yields.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="h-6 w-6 text-purple-400" />
                    <div>
                      <div className="font-medium text-white">Emerging Opportunities</div>
                      <div className="text-sm text-purple-400">25%+ ROI potential</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300">
                    Pre-construction and off-market deals with exceptional return potential.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
