"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Calculator, DollarSign, TrendingUp, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RoyalDiamondSlabCard } from "@/components/ui/royal-diamond-slab-card"
import { HolographicPropertyCard } from "@/components/real-estate/holographic-property-card"
import { PaginatedPropertyGrid } from "@/components/real-estate/paginated-property-grid"

interface Property {
  id: string
  address: string
  city: string
  state: string
  zipCode: string
  price: number
  bedrooms: number
  bathrooms: number
  squareFootage: number
  propertyType: "single-family" | "condo" | "townhouse" | "multi-family"
  yearBuilt: number
  lotSize: number
  images: string[]
  description: string
  features: string[]
  monthlyPayment50Year: number
  monthlyPayment30Year: number
  savings: number
}

export default function RealEstatePage() {
  const searchParams = useSearchParams()
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState("all")
  const [propertyType, setPropertyType] = useState("all")
  const [bedrooms, setBedrooms] = useState("all")
  const [showCalculator, setShowCalculator] = useState(false)

  // Check URL parameters for specific actions
  useEffect(() => {
    const loanType = searchParams.get("loanType")
    const step = searchParams.get("step")
    const highlight = searchParams.get("highlight")

    if (loanType === "50-year" && step === "pre-approval") {
      setShowCalculator(true)
      // Scroll to calculator section
      setTimeout(() => {
        const calculatorSection = document.getElementById("loan-calculator-section")
        if (calculatorSection) {
          calculatorSection.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }, [searchParams])

  // Mock property data
  useEffect(() => {
    const mockProperties: Property[] = [
      {
        id: "PROP-001",
        address: "123 Oak Street",
        city: "Austin",
        state: "TX",
        zipCode: "78701",
        price: 450000,
        bedrooms: 3,
        bathrooms: 2,
        squareFootage: 1850,
        propertyType: "single-family",
        yearBuilt: 2018,
        lotSize: 0.25,
        images: ["/placeholder.jpg?height=300&width=400"],
        description: "Beautiful modern home in prime Austin location with updated kitchen and spacious backyard.",
        features: ["Updated Kitchen", "Hardwood Floors", "Two-Car Garage", "Fenced Yard"],
        monthlyPayment50Year: 1680,
        monthlyPayment30Year: 2400,
        savings: 720,
      },
      {
        id: "PROP-002",
        address: "456 Pine Avenue",
        city: "Denver",
        state: "CO",
        zipCode: "80202",
        price: 520000,
        bedrooms: 4,
        bathrooms: 3,
        squareFootage: 2200,
        propertyType: "single-family",
        yearBuilt: 2020,
        lotSize: 0.3,
        images: ["/placeholder.jpg?height=300&width=400"],
        description: "Stunning contemporary home with mountain views and premium finishes throughout.",
        features: ["Mountain Views", "Gourmet Kitchen", "Master Suite", "Three-Car Garage"],
        monthlyPayment50Year: 1940,
        monthlyPayment30Year: 2770,
        savings: 830,
      },
      {
        id: "PROP-003",
        address: "789 Maple Drive",
        city: "Phoenix",
        state: "AZ",
        zipCode: "85001",
        price: 380000,
        bedrooms: 3,
        bathrooms: 2,
        squareFootage: 1650,
        propertyType: "single-family",
        yearBuilt: 2019,
        lotSize: 0.2,
        images: ["/placeholder.jpg?height=300&width=400"],
        description: "Desert oasis with modern amenities and energy-efficient features.",
        features: ["Solar Panels", "Desert Landscaping", "Open Floor Plan", "Pool Ready"],
        monthlyPayment50Year: 1420,
        monthlyPayment30Year: 2030,
        savings: 610,
      },
    ]

    setProperties(mockProperties)
    setFilteredProperties(mockProperties)
  }, [])

  // Filter properties based on search criteria
  useEffect(() => {
    let filtered = properties

    if (searchQuery) {
      filtered = filtered.filter(
        (property) =>
          property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.state.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number)
      filtered = filtered.filter((property) => property.price >= min && (max ? property.price <= max : true))
    }

    if (propertyType !== "all") {
      filtered = filtered.filter((property) => property.propertyType === propertyType)
    }

    if (bedrooms !== "all") {
      filtered = filtered.filter((property) => property.bedrooms >= Number(bedrooms))
    }

    setFilteredProperties(filtered)
  }, [properties, searchQuery, priceRange, propertyType, bedrooms])

  const calculateLoanPayment = (loanAmount: number, term: number, rate = 3.1) => {
    const monthlyRate = rate / 100 / 12
    const numPayments = term * 12
    return (
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Revolutionary Real Estate Marketplace
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover your dream home with our exclusive 50-year financing options
          </p>
        </div>

        {/* 50-Year Loan Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RoyalDiamondSlabCard
            variant="emerald"
            size="md"
            title="Lower Payments"
            content="Up to 40% Less"
            highlightWords={["Lower"]}
            className="h-32"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              <span className="text-sm text-emerald-400">vs 30-year loans</span>
            </div>
          </RoyalDiamondSlabCard>

          <RoyalDiamondSlabCard
            variant="sapphire"
            size="md"
            title="Interest Rate"
            content="3.1% APR"
            highlightWords={["Rate"]}
            className="h-32"
          >
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-400" />
              <span className="text-sm text-blue-400">Competitive rates</span>
            </div>
          </RoyalDiamondSlabCard>

          <RoyalDiamondSlabCard
            variant="ruby"
            size="md"
            title="Qualification"
            content="Easy Approval"
            highlightWords={["Easy"]}
            className="h-32"
          >
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-red-400" />
              <span className="text-sm text-red-400">Streamlined process</span>
            </div>
          </RoyalDiamondSlabCard>
        </div>

        {/* Loan Calculator Section */}
        <Card
          id="loan-calculator-section"
          className={`bg-background/50 backdrop-blur-sm border-white/20 ${
            showCalculator ? "ring-2 ring-primary/50 shadow-lg shadow-primary/20" : ""
          }`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-6 w-6" />
              50-Year Loan Calculator
            </CardTitle>
            <CardDescription>Calculate your savings with our revolutionary 50-year financing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Home Price</label>
                <Input id="home-price-input" type="number" placeholder="450000" className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Down Payment</label>
                <Input id="down-payment-input" type="number" placeholder="90000" className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Credit Score</label>
                <Input id="credit-score-field" type="number" placeholder="750" className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Annual Income</label>
                <Input id="income-input" type="number" placeholder="85000" className="bg-background/50" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emerald-400">50-Year Loan Benefits</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monthly Payment:</span>
                    <span className="font-semibold text-emerald-400">$1,680</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest Rate:</span>
                    <span>3.1% APR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loan Term:</span>
                    <span>50 Years</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-red-400">30-Year Comparison</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monthly Payment:</span>
                    <span className="font-semibold text-red-400">$2,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest Rate:</span>
                    <span>6.8% APR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loan Term:</span>
                    <span>30 Years</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Monthly Savings:</span>
                <span className="text-2xl font-bold text-emerald-400">$720</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Save $720 every month with our revolutionary 50-year financing option
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <Button className="flex-1">Apply for Pre-Approval</Button>
              <Button variant="outline" className="flex-1">
                Schedule Consultation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card className="bg-background/50 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background/50"
                  />
                </div>
              </div>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-300000">Under $300K</SelectItem>
                  <SelectItem value="300000-500000">$300K - $500K</SelectItem>
                  <SelectItem value="500000-750000">$500K - $750K</SelectItem>
                  <SelectItem value="750000-1000000">$750K - $1M</SelectItem>
                  <SelectItem value="1000000-99999999">Over $1M</SelectItem>
                </SelectContent>
              </Select>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="w-full md:w-48">
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
              <Select value={bedrooms} onValueChange={setBedrooms}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Beds" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Properties Grid */}
        <PaginatedPropertyGrid
          properties={filteredProperties}
          itemsPerPage={6}
          renderProperty={(property) => (
            <HolographicPropertyCard
              key={property.id}
              property={{
                id: property.id,
                title: `${property.address}`,
                price: property.price,
                location: `${property.city}, ${property.state}`,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                sqft: property.squareFootage,
                image: property.images[0],
                monthlyPayment: property.monthlyPayment50Year,
                savings: property.savings,
                features: property.features,
                yearBuilt: property.yearBuilt,
                propertyType: property.propertyType,
              }}
            />
          )}
        />

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of homeowners who have already discovered the benefits of 50-year financing. Lower
              payments, competitive rates, and easier qualification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Start Your Application
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Speak with an Advisor
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
