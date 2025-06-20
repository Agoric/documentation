"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Home,
  MapPin,
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  Share,
  Search,
  Map,
  Building,
  type School,
  Crown,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Property {
  id: string
  title: string
  description: string
  price: number
  monthlyPayment: number
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  propertyType: "house" | "condo" | "townhouse" | "apartment" | "commercial" | "land"
  bedrooms: number
  bathrooms: number
  sqft: number
  lotSize?: number
  yearBuilt: number
  status: "for_sale" | "for_rent" | "sold" | "pending" | "off_market"
  images: string[]
  virtualTour?: string
  video?: string
  features: string[]
  amenities: string[]
  neighborhood: {
    walkScore: number
    transitScore: number
    bikeScore: number
    schools: School[]
    nearby: NearbyPlace[]
  }
  financials: {
    listPrice: number
    pricePerSqft: number
    hoa?: number
    taxes: number
    insurance: number
    priceHistory: PriceHistory[]
  }
  agent: {
    name: string
    phone: string
    email: string
    photo: string
    rating: number
  }
  isLuxury: boolean
  isNew: boolean
  daysOnMarket: number
  views: number
  saves: number
}

interface School {
  name: string
  type: "elementary" | "middle" | "high" | "university"
  rating: number
  distance: number
}

interface NearbyPlace {
  name: string
  type: "restaurant" | "shopping" | "park" | "hospital" | "gym" | "transit"
  distance: number
  rating?: number
}

interface PriceHistory {
  date: Date
  price: number
  event: "listed" | "price_change" | "sold" | "pending"
}

interface PropertyFilters {
  priceRange: [number, number]
  propertyType: string[]
  bedrooms: number[]
  bathrooms: number[]
  sqftRange: [number, number]
  features: string[]
  location: string
  status: string[]
}

// Mock property data
const generateMockProperties = (): Property[] => {
  const propertyTypes = ["house", "condo", "townhouse", "apartment", "commercial"] as const
  const statuses = ["for_sale", "for_rent", "sold", "pending"] as const
  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
  ]
  const states = ["NY", "CA", "IL", "TX", "AZ", "PA", "TX", "CA"]

  return Array.from({ length: 50 }, (_, i) => {
    const cityIndex = Math.floor(Math.random() * cities.length)
    const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)]
    const bedrooms = Math.floor(Math.random() * 5) + 1
    const bathrooms = Math.floor(Math.random() * 4) + 1
    const sqft = Math.floor(Math.random() * 3000) + 800
    const price = Math.floor(Math.random() * 2000000) + 200000

    return {
      id: `prop_${i + 1}`,
      title: `Beautiful ${propertyType} in ${cities[cityIndex]}`,
      description: `Stunning ${propertyType} with modern amenities and great location. Perfect for families or professionals.`,
      price,
      monthlyPayment: Math.floor(price * 0.004),
      address: {
        street: `${Math.floor(Math.random() * 9999) + 1} ${["Main", "Oak", "Pine", "Elm", "Maple"][Math.floor(Math.random() * 5)]} St`,
        city: cities[cityIndex],
        state: states[cityIndex],
        zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
        country: "USA",
      },
      propertyType,
      bedrooms,
      bathrooms,
      sqft,
      lotSize: propertyType === "house" ? Math.floor(Math.random() * 10000) + 2000 : undefined,
      yearBuilt: Math.floor(Math.random() * 50) + 1970,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      images: Array.from(
        { length: Math.floor(Math.random() * 8) + 3 },
        (_, j) => `/placeholder.svg?height=400&width=600&text=Property+${i + 1}+Image+${j + 1}`,
      ),
      virtualTour: Math.random() > 0.7 ? `https://tour.example.com/property_${i + 1}` : undefined,
      video: Math.random() > 0.8 ? `https://video.example.com/property_${i + 1}` : undefined,
      features: [
        "Updated Kitchen",
        "Hardwood Floors",
        "Central Air",
        "Fireplace",
        "Walk-in Closet",
        "Granite Countertops",
        "Stainless Steel Appliances",
        "Balcony/Patio",
      ].filter(() => Math.random() > 0.5),
      amenities: [
        "Swimming Pool",
        "Fitness Center",
        "Parking Garage",
        "Concierge",
        "Rooftop Deck",
        "Business Center",
        "Pet Friendly",
        "In-unit Laundry",
      ].filter(() => Math.random() > 0.6),
      neighborhood: {
        walkScore: Math.floor(Math.random() * 100),
        transitScore: Math.floor(Math.random() * 100),
        bikeScore: Math.floor(Math.random() * 100),
        schools: [
          {
            name: `${cities[cityIndex]} Elementary`,
            type: "elementary",
            rating: Math.floor(Math.random() * 5) + 6,
            distance: Math.random() * 2,
          },
          {
            name: `${cities[cityIndex]} High School`,
            type: "high",
            rating: Math.floor(Math.random() * 4) + 7,
            distance: Math.random() * 3,
          },
        ],
        nearby: [
          {
            name: "Whole Foods",
            type: "shopping",
            distance: Math.random() * 2,
            rating: 4.2,
          },
          {
            name: "Central Park",
            type: "park",
            distance: Math.random() * 1.5,
          },
        ],
      },
      financials: {
        listPrice: price,
        pricePerSqft: Math.floor(price / sqft),
        hoa: propertyType === "condo" ? Math.floor(Math.random() * 500) + 100 : undefined,
        taxes: Math.floor(price * 0.012),
        insurance: Math.floor(price * 0.003),
        priceHistory: [
          {
            date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
            price: price + Math.floor(Math.random() * 100000) - 50000,
            event: "listed",
          },
        ],
      },
      agent: {
        name: ["Sarah Johnson", "Mike Chen", "Emily Rodriguez", "David Kim", "Lisa Thompson"][
          Math.floor(Math.random() * 5)
        ],
        phone: "+1 (555) 123-4567",
        email: "agent@realestate.com",
        photo: "/placeholder.svg?height=100&width=100&text=Agent",
        rating: Math.random() * 2 + 3,
      },
      isLuxury: price > 1000000,
      isNew: Math.random() > 0.8,
      daysOnMarket: Math.floor(Math.random() * 180),
      views: Math.floor(Math.random() * 1000) + 50,
      saves: Math.floor(Math.random() * 100) + 5,
    }
  })
}

export function ComprehensiveRealEstateSystem() {
  const [properties] = useState<Property[]>(generateMockProperties())
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid")
  const [sortBy, setSortBy] = useState<"price" | "date" | "size" | "popularity">("price")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)
  const [savedProperties, setSavedProperties] = useState<Set<string>>(new Set())
  
  const [filters, setFilters] = useState<PropertyFilters>({
    priceRange: [0, 5000000],
    propertyType: [],
    bedrooms: [],
    bathrooms: [],
    sqftRange: [0, 10000],
    features: [],
    location: "",
    status: ["for_sale"]
  })

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...properties]

    // Apply filters
    if (filters.location) {
      filtered = filtered.filter(p => 
        p.address.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        p.address.state.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    if (filters.propertyType.length > 0) {
      filtered = filtered.filter(p => filters.propertyType.includes(p.propertyType))
    }

    if (filters.status.length > 0) {
      filtered = filtered.filter(p => filters.status.includes(p.status))
    }

    if (filters.bedrooms.length > 0) {
      filtered = filtered.filter(p => filters.bedrooms.includes(p.bedrooms))
    }

    if (filters.bathrooms.length > 0) {
      filtered = filtered.filter(p => filters.bathrooms.includes(p.bathrooms))
    }

    filtered = filtered.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )

    filtered = filtered.filter(p => 
      p.sqft >= filters.sqftRange[0] && p.sqft <= filters.sqftRange[1]
    )

    if (filters.features.length > 0) {
      filtered = filtered.filter(p => 
        filters.features.some(feature => p.features.includes(feature))
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: number, bValue: number

      switch (sortBy) {
        case "price":
          aValue = a.price
          bValue = b.price
          break
        case "date":
          aValue = a.daysOnMarket
          bValue = b.daysOnMarket
          break
        case "size":
          aValue = a.sqft
          bValue = b.sqft
          break
        case "popularity":
          aValue = a.views + a.saves
          bValue = b.views + b.saves
          break
        default:
          return 0
      }

      return sortOrder === "asc" ? aValue - bValue : bValue - aValue
    })

    setFilteredProperties(filtered)
    setCurrentPage(1)
  }, [properties, filters, sortBy, sortOrder])

  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)

  const toggleSaveProperty = (propertyId: string) => {
    setSavedProperties(prev => {
      const newSet = new Set(prev)
      if (newSet.has(propertyId)) {
        newSet.delete(propertyId)
      } else {
        newSet.add(propertyId)
      }
      return newSet
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "for_sale": return "bg-green-600"
      case "for_rent": return "bg-blue-600"
      case "sold": return "bg-gray-600"
      case "pending": return "bg-yellow-600"
      default: return "bg-gray-600"
    }
  }

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case "house": return <Home className="w-4 h-4" />
      case "condo": return <Building className="w-4 h-4" />
      case "townhouse": return <Home className="w-4 h-4" />
      case "apartment": return <Building className="w-4 h-4" />
      case "commercial": return <Building className="w-4 h-4" />
      default: return <Home className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold text-amber-300 font-serif">Imperial Real Estate Marketplace</h1>
          <p className="text-purple-200 font-serif tracking-wider">
            LUXURY PROPERTIES & INVESTMENT OPPORTUNITIES
          </p>
        </motion.div>

        {/* Search and Filters */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-amber-300 flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Property Search & Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="search" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-purple-800/30">
                <TabsTrigger value="search">Search</TabsTrigger>
                <TabsTrigger value="filters">Filters</TabsTrigger>
                <TabsTrigger value="price">Price</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>

              <TabsContent value="search" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-purple-200">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
                      <Input
                        placeholder="City, State, or ZIP"
                        value={filters.location}
                        onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                        className="pl-10 bg-purple-800/30 border-purple-600 text-purple-100"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-purple-200">Property Type</Label>
                    <Select 
                      value={filters.propertyType[0] || ""} 
                      onValueChange={(value) => setFilters(prev => ({ 
                        ...prev, 
                        propertyType: value ? [value] : [] 
                      }))}
                    >
                      <SelectTrigger className="bg-purple-800/30 border-purple-600 text-purple-100">
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All types</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-purple-200">Status</Label>
                    <Select 
                      value={filters.status[0] || ""} 
                      onValueChange={(value) => setFilters(prev => ({ 
                        ...prev, 
                        status: value ? [value] : ["for_sale"] 
                      }))}
                    >
                      <SelectTrigger className="bg-purple-800/30 border-purple-600 text-purple-100">
                        <SelectValue placeholder="For Sale" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="for_sale">For Sale</SelectItem>
                        <SelectItem value="for_rent">For Rent</SelectItem>
                        <SelectItem value="sold">Recently Sold</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="filters" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-purple-200">Bedrooms</Label>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5].map(num => (
                        <Button
                          key={num}
                          variant={filters.bedrooms.includes(num) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setFilters(prev => ({
                              ...prev,
                              bedrooms: prev.bedrooms.includes(num)
                                ? prev.bedrooms.filter(b => b !== num)
                                : [...prev.bedrooms, num]
                            }))
                          }}
                          className={filters.bedrooms.includes(num) 
                            ? "bg-amber-600 text-white" 
                            : "bg-purple-800/30 border-purple-600 text-purple-100"
                          }
                        >
                          {num}+ bed{num > 1 ? 's' : ''}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-purple-200">Bathrooms</Label>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4].map(num => (
                        <Button
                          key={num}
                          variant={filters.bathrooms.includes(num) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setFilters(prev => ({
                              ...prev,
                              bathrooms: prev.bathrooms.includes(num)
                                ? prev.bathrooms.filter(b => b !== num)
                                : [...prev.bathrooms, num]
                            }))
                          }}
                          className={filters.bathrooms.includes(num) 
                            ? "bg-amber-600 text-white" 
                            : "bg-purple-800/30 border-purple-600 text-purple-100"
                          }
                        >
                          {num}+ bath{num > 1 ? 's' : ''}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="price" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-purple-200">Price Range</Label>
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                      max={5000000}
                      min={0}
                      step={50000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-purple-300 text-sm">
                      <span>${filters.priceRange[0].toLocaleString()}</span>
                      <span>${filters.priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-purple-200">Square Footage</Label>
                    <Slider
                      value={filters.sqftRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, sqftRange: value as [number, number] }))}
                      max={10000}
                      min={0}
                      step={100}
                      className="w-full"
                    />
                    <div className="flex justify-between text-purple-300 text-sm">
                      <span>{filters.sqftRange[0].toLocaleString()} sqft</span>
                      <span>{filters.sqftRange[1].toLocaleString()} sqft</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    "Updated Kitchen", "Hardwood Floors", "Central Air", "Fireplace",
                    "Walk-in Closet", "Granite Countertops", "Swimming Pool", "Garage",
                    "Balcony/Patio", "In-unit Laundry", "Pet Friendly", "Fitness Center"
                  ].map(feature => (
                    <div key={feature} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={feature}
                        checked={filters.features.includes(feature)}
                        onChange={(e) => {
                          setFilters(prev => ({
                            ...prev,
                            features: e.target.checked
                              ? [...prev.features, feature]
                              : prev.features.filter(f => f !== feature)
                          }))
                        }}
                        className="rounded border-purple-600 bg-purple-800/30"
                      />
                      <Label htmlFor={feature} className="text-purple-200 text-sm">{feature}</Label>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Results Header */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-purple-200">
                  {filteredProperties.length} properties found
                </span>
                
                <div className="flex items-center space-x-2">
                  <Label className="text-purple-200">Sort by:</Label>
                  <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                    <SelectTrigger className="w-32 bg-purple-800/30 border-purple-600 text-purple-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="date">Date Listed</SelectItem>
                      <SelectItem value="size">Size</SelectItem>
                      <SelectItem value="popularity">Popularity</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
                    className="bg-purple-800/30 border-purple-600 text-purple-100"
                  >
                    {sortOrder === "asc" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" 
                    ? "bg-amber-600 text-white" 
                    : "bg-purple-800/30 border-purple-600 text-purple-100"
                  }
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" 
                    ? "bg-amber-600 text-white" 
                    : "bg-purple-800/30 border-purple-600 text-purple-100"
                  }
                >
                  List
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                  className={viewMode === "map" 
                    ? "bg-amber-600 text-white" 
                    : "bg-purple-800/30 border-purple-600 text-purple-100"
                  }
                >
                  <Map className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Grid */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {paginatedProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 border-amber-400/20 backdrop-blur-sm hover:border-amber-400/40 transition-all duration-200 overflow-hidden group">
                    <div className="relative">
                      <img
                        src={property.images[0] || "/placeholder.svg"}
                        alt={property.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Status Badge */}
                      <Badge className={`absolute top-2 left-2 ${getStatusColor(property.status)} text-white`}>
                        {property.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      
                      {/* Luxury Badge */}
                      {property.isLuxury && (
                        <Badge className="absolute top-2 right-2 bg-gradient-to-r from-amber-600 to-yellow-600 text-white">
                          <Crown className="w-3 h-3 mr-1" />
                          LUXURY
                        </Badge>
                      )}
                      
                      {/* Action Buttons */}
                      <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleSaveProperty(property.id)}
                          className={`${
                            savedProperties.has(property.id) 
                              ? "bg-red-600 text-white border-red-600" 
                              : "bg-white/90 text-gray-800 border-white/90"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${savedProperties.has(property.id) ? "fill-current" : ""}`} />
                        </Button>
                        
                        <Button size="sm" variant="outline" className="bg-white/90 text-gray-800 border-white/90">
                          <Share className="w-4 h-4" />
                        </Button>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => setSelectedProperty(property)}
                              className="bg-white/90 text-gray-800 border-white/90"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-900 to-indigo-900 border-amber-400/30 text-purple-100">
                            <DialogHeader>
                              <DialogTitle className="text-amber-300">{selectedProperty?.title}</DialogTitle>
                              <DialogDescription className="text-purple-200">
                                {selectedProperty?.address.street}, {selectedProperty?.address.city}, {selectedProperty?.address.state}
                              </DialogDescription>
                            </DialogHeader>
                            
                            {selectedProperty && (
                              <div className="space-y-6">
                                {/* Image Gallery */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                  {selectedProperty.images.slice(0, 6).map((image, i) => (
                                    <img
                                      key={i}
                                      src={image || "/placeholder.svg"}
                                      alt={`Property image ${i + 1}`}
                                      className="w-full h-32 object-cover rounded-lg"
                                    />
                                  ))}
                                </div>
                                
                                {/* Property Details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <div>
                                      <h3 className="text-amber-300 font-semibold mb-2">Property Details</h3>
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <span className="text-purple-300">Type:</span>
                                          <span className="text-purple-100 capitalize">{selectedProperty.propertyType}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-purple-300">Bedrooms:</span>
                                          <span className="text-purple-100">{selectedProperty.bedrooms}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-purple-300">Bathrooms:</span>
                                          <span className\
