"use client"
import { useState, useMemo } from "react"
import { Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PaginatedProductGrid } from "@/components/ecommerex/paginated-product-grid"
import { ComparisonBar } from "@/components/ecommerex/comparison-bar"
import { HolographicSidebar } from "@/components/ecommerex/holographic-sidebar"
import { RealmNavigationToolbar } from "@/components/navigation/realm-navigation-toolbar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

// Sample product data with enhanced holographic features
const sampleProducts = [
  {
    id: 1,
    name: "Neural Interface Headphones",
    price: 299.99,
    originalPrice: 399.99,
    image: "/placeholder.svg?height=300&width=300&text=Neural+Headphones",
    rating: 4.8,
    reviews: 1247,
    category: "Audio",
    isHolographic: true,
    has360View: true,
    inStock: true,
    description: "Advanced neural interface technology with holographic sound projection",
    features: ["Neural Interface", "Holographic Audio", "360° Sound Field", "AI Noise Cancellation"],
    images: [
      "/placeholder.svg?height=300&width=300&text=Neural+Headphones+1",
      "/placeholder.svg?height=300&width=300&text=Neural+Headphones+2",
      "/placeholder.svg?height=300&width=300&text=Neural+Headphones+3",
      "/placeholder.svg?height=300&width=300&text=Neural+Headphones+4",
    ],
  },
  {
    id: 2,
    name: "Quantum Smartwatch",
    price: 599.99,
    originalPrice: 799.99,
    image: "/placeholder.svg?height=300&width=300&text=Quantum+Watch",
    rating: 4.9,
    reviews: 892,
    category: "Wearables",
    isHolographic: true,
    has360View: true,
    inStock: true,
    description: "Quantum-powered smartwatch with holographic display technology",
    features: ["Quantum Processing", "Holographic Display", "Health Monitoring", "Wireless Charging"],
    images: [
      "/placeholder.svg?height=300&width=300&text=Quantum+Watch+1",
      "/placeholder.svg?height=300&width=300&text=Quantum+Watch+2",
      "/placeholder.svg?height=300&width=300&text=Quantum+Watch+3",
      "/placeholder.svg?height=300&width=300&text=Quantum+Watch+4",
    ],
  },
  {
    id: 3,
    name: "Holographic Camera Pro",
    price: 1299.99,
    image: "/placeholder.svg?height=300&width=300&text=Holo+Camera",
    rating: 4.7,
    reviews: 634,
    category: "Cameras",
    isHolographic: true,
    has360View: true,
    inStock: false,
    description: "Professional holographic camera with 8K recording capabilities",
    features: ["8K Holographic Recording", "AI Scene Recognition", "Professional Lenses", "Cloud Storage"],
    images: [
      "/placeholder.svg?height=300&width=300&text=Holo+Camera+1",
      "/placeholder.svg?height=300&width=300&text=Holo+Camera+2",
      "/placeholder.svg?height=300&width=300&text=Holo+Camera+3",
      "/placeholder.svg?height=300&width=300&text=Holo+Camera+4",
    ],
  },
  {
    id: 4,
    name: "Wireless Gaming Mouse",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300&text=Gaming+Mouse",
    rating: 4.6,
    reviews: 1523,
    category: "Peripherals",
    isHolographic: false,
    has360View: false,
    inStock: true,
    description: "High-precision wireless gaming mouse with RGB lighting",
    features: ["High DPI Sensor", "RGB Lighting", "Wireless Connectivity", "Ergonomic Design"],
    images: [
      "/placeholder.svg?height=300&width=300&text=Gaming+Mouse+1",
      "/placeholder.svg?height=300&width=300&text=Gaming+Mouse+2",
    ],
  },
  {
    id: 5,
    name: "VR Haptic Gloves",
    price: 449.99,
    image: "/placeholder.svg?height=300&width=300&text=VR+Gloves",
    rating: 4.5,
    reviews: 387,
    category: "Wearables",
    isHolographic: true,
    has360View: true,
    inStock: true,
    description: "Advanced haptic feedback gloves for virtual reality experiences",
    features: ["Haptic Feedback", "Finger Tracking", "Wireless Connection", "Long Battery Life"],
    images: [
      "/placeholder.svg?height=300&width=300&text=VR+Gloves+1",
      "/placeholder.svg?height=300&width=300&text=VR+Gloves+2",
      "/placeholder.svg?height=300&width=300&text=VR+Gloves+3",
    ],
  },
  {
    id: 6,
    name: "Holographic Keyboard",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300&text=Holo+Keyboard",
    rating: 4.4,
    reviews: 756,
    category: "Peripherals",
    isHolographic: true,
    has360View: false,
    inStock: true,
    description: "Projected holographic keyboard with tactile feedback simulation",
    features: ["Holographic Projection", "Tactile Feedback", "Customizable Layout", "Gesture Recognition"],
    images: [
      "/placeholder.svg?height=300&width=300&text=Holo+Keyboard+1",
      "/placeholder.svg?height=300&width=300&text=Holo+Keyboard+2",
    ],
  },
]

interface FilterState {
  search: string
  category: string
  priceRange: string
  minRating: number
  holographicOnly: boolean
  has360ViewOnly: boolean
  inStockOnly: boolean
}

export default function HolographicProductsDashboard() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "all",
    priceRange: "all",
    minRating: 0,
    holographicOnly: false,
    has360ViewOnly: false,
    inStockOnly: false,
  })

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return sampleProducts.filter((product) => {
      // Search filter
      if (
        filters.search &&
        !product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !product.description.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false
      }

      // Category filter
      if (filters.category !== "all" && product.category !== filters.category) {
        return false
      }

      // Price range filter
      if (filters.priceRange !== "all") {
        const price = product.price
        switch (filters.priceRange) {
          case "under-100":
            if (price >= 100) return false
            break
          case "100-200":
            if (price < 100 || price >= 200) return false
            break
          case "200-500":
            if (price < 200 || price >= 500) return false
            break
          case "500-1000":
            if (price < 500 || price >= 1000) return false
            break
          case "over-1000":
            if (price < 1000) return false
            break
        }
      }

      // Rating filter
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false
      }

      // Special filters
      if (filters.holographicOnly && !product.isHolographic) return false
      if (filters.has360ViewOnly && !product.has360View) return false
      if (filters.inStockOnly && !product.inStock) return false

      return true
    })
  }, [filters])

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price)
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating)
      case "reviews":
        return sorted.sort((a, b) => b.reviews - a.reviews)
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return sorted
    }
  }, [filteredProducts, sortBy])

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearAllFilters = () => {
    setFilters({
      search: "",
      category: "all",
      priceRange: "all",
      minRating: 0,
      holographicOnly: false,
      has360ViewOnly: false,
      inStockOnly: false,
    })
  }

  const activeFilterCount = Object.values(filters).filter(
    (value) => value !== "" && value !== "all" && value !== 0 && value !== false,
  ).length

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Realm Navigation Toolbar */}
        <RealmNavigationToolbar />

        <div className="flex">
          {/* Sidebar */}
          <HolographicSidebar
            filters={filters}
            onFilterChange={updateFilter}
            onClearFilters={clearAllFilters}
            productCount={sortedProducts.length}
          />

          {/* Main Content */}
          <SidebarInset className="flex-1">
            <div className="p-6">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      Holographic Products
                    </h1>
                    <p className="text-gray-400 mt-1">
                      Discover the future of technology with our holographic product collection
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* View Mode Toggle */}
                    <div className="flex items-center bg-white/5 rounded-lg p-1">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className={cn("h-8 w-8 p-0", viewMode === "grid" && "bg-purple-600 hover:bg-purple-700")}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className={cn("h-8 w-8 p-0", viewMode === "list" && "bg-purple-600 hover:bg-purple-700")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Sort Dropdown */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48 bg-white/5 border-white/10">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="reviews">Most Reviews</SelectItem>
                        <SelectItem value="name">Name A-Z</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Active Filters */}
                {activeFilterCount > 0 && (
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-sm text-gray-400">Active filters:</span>
                    <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                      {activeFilterCount} filter{activeFilterCount !== 1 ? "s" : ""} applied
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-xs text-gray-400 hover:text-white"
                    >
                      Clear all
                    </Button>
                  </div>
                )}

                {/* Results Count */}
                <div className="text-sm text-gray-400">
                  Showing {sortedProducts.length} of {sampleProducts.length} products
                </div>
              </div>

              {/* Product Grid */}
              <PaginatedProductGrid products={sortedProducts} viewMode={viewMode} itemsPerPage={12} />
            </div>
          </SidebarInset>
        </div>

        {/* Comparison Bar */}
        <ComparisonBar />
      </div>
    </SidebarProvider>
  )
}
