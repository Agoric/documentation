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

// Enhanced sample product data with correct structure for HolographicProductCard
const sampleProducts = [
  {
    id: "1",
    name: "Neural Interface Headphones",
    description: "Advanced neural interface technology with holographic sound projection and 3D spatial audio",
    price: 299.99,
    image: "/placeholder.svg?height=300&width=300&text=Neural+Headphones",
    category: "Audio",
    rating: 4.8,
    stock: 45,
    platforms: ["amazon", "ebay", "walmart"],
    isHolographic: true,
    has360View: true,
    images360: [
      "/placeholder.svg?height=300&width=300&text=Neural+Headphones+1",
      "/placeholder.svg?height=300&width=300&text=Neural+Headphones+2",
      "/placeholder.svg?height=300&width=300&text=Neural+Headphones+3",
      "/placeholder.svg?height=300&width=300&text=Neural+Headphones+4",
      "/placeholder.svg?height=300&width=300&text=Neural+Headphones+5",
      "/placeholder.svg?height=300&width=300&text=Neural+Headphones+6",
      "/placeholder.svg?height=300&width=300&text=Neural+Headphones+7",
      "/placeholder.svg?height=300&width=300&text=Neural+Headphones+8",
    ],
    holographicFeatures: [
      "3D Audio Projection",
      "Quantum Noise Cancellation",
      "Holographic Controls",
      "Neural Interface",
    ],
  },
  {
    id: "2",
    name: "Quantum Smartwatch Pro",
    description: "Quantum-powered smartwatch with holographic display technology and advanced health monitoring",
    price: 599.99,
    image: "/placeholder.svg?height=300&width=300&text=Quantum+Watch",
    category: "Wearables",
    rating: 4.9,
    stock: 28,
    platforms: ["amazon", "walmart", "bestbuy"],
    isHolographic: true,
    has360View: true,
    images360: [
      "/placeholder.svg?height=300&width=300&text=Quantum+Watch+1",
      "/placeholder.svg?height=300&width=300&text=Quantum+Watch+2",
      "/placeholder.svg?height=300&width=300&text=Quantum+Watch+3",
      "/placeholder.svg?height=300&width=300&text=Quantum+Watch+4",
      "/placeholder.svg?height=300&width=300&text=Quantum+Watch+5",
      "/placeholder.svg?height=300&width=300&text=Quantum+Watch+6",
      "/placeholder.svg?height=300&width=300&text=Quantum+Watch+7",
      "/placeholder.svg?height=300&width=300&text=Quantum+Watch+8",
    ],
    holographicFeatures: ["Quantum Processing", "Holographic Display", "Health Monitoring", "Wireless Charging"],
  },
  {
    id: "3",
    name: "HoloVision 4K Camera",
    description: "Professional holographic camera with 8K recording capabilities and AI-powered scene recognition",
    price: 1299.99,
    image: "/placeholder.svg?height=300&width=300&text=Holo+Camera",
    category: "Cameras",
    rating: 4.7,
    stock: 0, // Out of stock
    platforms: ["amazon", "ebay", "bhphoto"],
    isHolographic: true,
    has360View: true,
    images360: [
      "/placeholder.svg?height=300&width=300&text=Holo+Camera+1",
      "/placeholder.svg?height=300&width=300&text=Holo+Camera+2",
      "/placeholder.svg?height=300&width=300&text=Holo+Camera+3",
      "/placeholder.svg?height=300&width=300&text=Holo+Camera+4",
      "/placeholder.svg?height=300&width=300&text=Holo+Camera+5",
      "/placeholder.svg?height=300&width=300&text=Holo+Camera+6",
      "/placeholder.svg?height=300&width=300&text=Holo+Camera+7",
      "/placeholder.svg?height=300&width=300&text=Holo+Camera+8",
    ],
    holographicFeatures: ["8K Holographic Recording", "AI Scene Recognition", "Professional Lenses", "Cloud Storage"],
  },
  {
    id: "4",
    name: "Wireless Gaming Mouse RGB",
    description: "High-precision wireless gaming mouse with RGB lighting and programmable macros",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300&text=Gaming+Mouse",
    category: "Peripherals",
    rating: 4.6,
    stock: 156,
    platforms: ["amazon", "ebay", "walmart", "newegg"],
    isHolographic: false,
    has360View: false,
    holographicFeatures: [], // Non-holographic product
  },
  {
    id: "5",
    name: "VR Haptic Gloves Pro",
    description: "Advanced haptic feedback gloves for virtual reality experiences with finger tracking",
    price: 449.99,
    image: "/placeholder.svg?height=300&width=300&text=VR+Gloves",
    category: "Wearables",
    rating: 4.5,
    stock: 37,
    platforms: ["amazon", "walmart", "oculus"],
    isHolographic: true,
    has360View: true,
    images360: [
      "/placeholder.svg?height=300&width=300&text=VR+Gloves+1",
      "/placeholder.svg?height=300&width=300&text=VR+Gloves+2",
      "/placeholder.svg?height=300&width=300&text=VR+Gloves+3",
      "/placeholder.svg?height=300&width=300&text=VR+Gloves+4",
      "/placeholder.svg?height=300&width=300&text=VR+Gloves+5",
      "/placeholder.svg?height=300&width=300&text=VR+Gloves+6",
      "/placeholder.svg?height=300&width=300&text=VR+Gloves+7",
      "/placeholder.svg?height=300&width=300&text=VR+Gloves+8",
    ],
    holographicFeatures: ["Haptic Feedback", "Finger Tracking", "Wireless Connection", "Long Battery Life"],
  },
  {
    id: "6",
    name: "Holographic Keyboard Elite",
    description: "Projected holographic keyboard with tactile feedback simulation and gesture recognition",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300&text=Holo+Keyboard",
    category: "Peripherals",
    rating: 4.4,
    stock: 73,
    platforms: ["amazon", "ebay"],
    isHolographic: true,
    has360View: false,
    holographicFeatures: ["Holographic Projection", "Tactile Feedback", "Customizable Layout", "Gesture Recognition"],
  },
  {
    id: "7",
    name: "Bluetooth Speaker Portable",
    description: "High-quality portable bluetooth speaker with 24-hour battery life and waterproof design",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300&text=Bluetooth+Speaker",
    category: "Audio",
    rating: 4.3,
    stock: 234,
    platforms: ["amazon", "ebay", "walmart", "target"],
    isHolographic: false,
    has360View: false,
    holographicFeatures: [], // Non-holographic product
  },
  {
    id: "8",
    name: 'HoloDesk Monitor 32"',
    description: "32-inch holographic display monitor with 4K resolution and eye-tracking technology",
    price: 899.99,
    image: "/placeholder.svg?height=300&width=300&text=Holo+Monitor",
    category: "Displays",
    rating: 4.8,
    stock: 12,
    platforms: ["amazon", "bestbuy", "newegg"],
    isHolographic: true,
    has360View: true,
    images360: [
      "/placeholder.svg?height=300&width=300&text=Holo+Monitor+1",
      "/placeholder.svg?height=300&width=300&text=Holo+Monitor+2",
      "/placeholder.svg?height=300&width=300&text=Holo+Monitor+3",
      "/placeholder.svg?height=300&width=300&text=Holo+Monitor+4",
      "/placeholder.svg?height=300&width=300&text=Holo+Monitor+5",
      "/placeholder.svg?height=300&width=300&text=Holo+Monitor+6",
      "/placeholder.svg?height=300&width=300&text=Holo+Monitor+7",
      "/placeholder.svg?height=300&width=300&text=Holo+Monitor+8",
    ],
    holographicFeatures: ["4K Holographic Display", "Eye Tracking", "Gesture Control", "Ambient Lighting"],
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

export function HolographicProductsDashboard() {
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
      if (filters.inStockOnly && product.stock === 0) return false

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
              <PaginatedProductGrid products={sortedProducts} itemsPerPage={6} />
            </div>
          </SidebarInset>
        </div>

        {/* Comparison Bar */}
        <ComparisonBar />
      </div>
    </SidebarProvider>
  )
}
