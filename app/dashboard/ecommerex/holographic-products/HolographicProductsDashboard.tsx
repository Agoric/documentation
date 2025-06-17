"use client"
import { useState, useMemo } from "react"
import { Grid, List, TestTube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PaginatedProductGrid } from "@/components/ecommerex/paginated-product-grid"
import { ComparisonBar } from "@/components/ecommerex/comparison-bar"
import { AdaptiveHolographicSidebar } from "@/components/ecommerex/adaptive-holographic-sidebar"
import { AdaptiveRegalToolbar } from "@/components/navigation/adaptive-regal-toolbar"
import { FilterTestPanel } from "@/components/ecommerex/filter-test-panel"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useSpatialLayout } from "@/hooks/use-spatial-layout"

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
    stock: 0, // Out of stock for testing
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
  const { dimensions, layout, containerRef } = useSpatialLayout({
    autoCollapse: true,
    contentAware: true,
  })

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [showTestPanel, setShowTestPanel] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "all",
    priceRange: "all",
    minRating: 0,
    holographicOnly: false,
    has360ViewOnly: false,
    inStockOnly: false,
  })

  // Enhanced filter function with comprehensive error handling
  const filterProducts = useMemo(() => {
    try {
      return sampleProducts.filter((product) => {
        // Null safety checks
        if (!product || typeof product !== "object") {
          console.warn("Invalid product object:", product)
          return false
        }

        // Search filter with null safety
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase()
          const name = product.name?.toLowerCase() || ""
          const description = product.description?.toLowerCase() || ""

          if (!name.includes(searchTerm) && !description.includes(searchTerm)) {
            return false
          }
        }

        // Category filter with null safety
        if (filters.category !== "all") {
          if (!product.category || product.category !== filters.category) {
            return false
          }
        }

        // Price range filter with null safety
        if (filters.priceRange !== "all") {
          const price = typeof product.price === "number" ? product.price : 0

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
            default:
              console.warn("Unknown price range:", filters.priceRange)
          }
        }

        // Rating filter with null safety
        if (filters.minRating > 0) {
          const rating = typeof product.rating === "number" ? product.rating : 0
          if (rating < filters.minRating) {
            return false
          }
        }

        // Special filters with null safety
        if (filters.holographicOnly && !product.isHolographic) return false
        if (filters.has360ViewOnly && !product.has360View) return false
        if (filters.inStockOnly) {
          const stock = typeof product.stock === "number" ? product.stock : 0
          if (stock === 0) return false
        }

        return true
      })
    } catch (error) {
      console.error("Error filtering products:", error)
      return sampleProducts // Return all products if filtering fails
    }
  }, [filters])

  // Sort products with error handling
  const sortedProducts = useMemo(() => {
    try {
      const sorted = [...filterProducts]

      switch (sortBy) {
        case "price-low":
          return sorted.sort((a, b) => (a.price || 0) - (b.price || 0))
        case "price-high":
          return sorted.sort((a, b) => (b.price || 0) - (a.price || 0))
        case "rating":
          return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        case "name":
          return sorted.sort((a, b) => (a.name || "").localeCompare(b.name || ""))
        default:
          return sorted
      }
    } catch (error) {
      console.error("Error sorting products:", error)
      return filterProducts // Return unsorted if sorting fails
    }
  }, [filterProducts, sortBy])

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
      <motion.div
        ref={containerRef}
        className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-900 relative"
        animate={{
          paddingLeft: layout.sidebarCollapsed ? 0 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Adaptive Roman Column Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="h-full w-full bg-repeat"
            animate={{
              backgroundSize: layout.adaptiveSpacing * 4,
            }}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23fbbf24' fillOpacity='0.1'%3E%3Cpath d='M30 0v60M0 30h60'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Adaptive Regal Toolbar */}
        <AdaptiveRegalToolbar />

        {/* Test Panel Modal */}
        {showTestPanel && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-xl rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto border border-amber-500/30"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 border-b border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <SupremeAuthorityCoin variant="badge" size="sm" />
                  <h2 className="text-xl font-semibold text-amber-300 font-serif">IMPERIAL FILTER TESTING PANEL</h2>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowTestPanel(false)}
                  className="border-amber-500/30 text-amber-300 hover:bg-amber-500/20"
                >
                  Close
                </Button>
              </div>
              <div className="p-4">
                <FilterTestPanel products={sampleProducts} onTestComplete={() => {}} />
              </div>
            </motion.div>
          </div>
        )}

        <div className="flex">
          {/* Adaptive Sidebar */}
          <AdaptiveHolographicSidebar
            filters={filters}
            onFilterChange={updateFilter}
            onClearFilters={clearAllFilters}
            productCount={sortedProducts.length}
          />

          {/* Main Content */}
          <SidebarInset className="flex-1">
            <motion.div
              className="h-full"
              animate={{
                padding: layout.contentPadding,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Adaptive Header */}
              <motion.div
                className="mb-8"
                animate={{
                  marginBottom: layout.adaptiveSpacing * 2,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <SupremeAuthorityCoin variant="logo" size={layout.cardSize === "sm" ? "md" : "lg"} />
                    <div>
                      <motion.h1
                        className="font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-clip-text text-transparent font-serif"
                        animate={{
                          fontSize: layout.cardSize === "sm" ? "1.875rem" : "2.25rem",
                        }}
                      >
                        MERCATUS HOLOGRAPHICUS
                      </motion.h1>
                      <p className="text-amber-300/80 mt-1 font-medium">
                        Imperial Marketplace of Holographic Technologies
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Adaptive Controls */}
                    <Button
                      variant="outline"
                      size={layout.toolbarCompact ? "sm" : "default"}
                      onClick={() => setShowTestPanel(true)}
                      className="border-amber-500/30 text-amber-300 hover:bg-amber-500/20 bg-purple-900/30 backdrop-blur-sm"
                    >
                      <TestTube className="h-4 w-4 mr-2" />
                      {layout.showLabels ? "Imperial Tests" : "Tests"}
                    </Button>

                    {/* View Mode Toggle */}
                    <div className="flex items-center bg-purple-900/30 backdrop-blur-sm rounded-lg p-1 border border-amber-500/20">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className={cn(
                          "h-8 w-8 p-0",
                          viewMode === "grid"
                            ? "bg-gradient-to-r from-amber-600 to-purple-600"
                            : "text-amber-300 hover:bg-amber-500/20",
                        )}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className={cn(
                          "h-8 w-8 p-0",
                          viewMode === "list"
                            ? "bg-gradient-to-r from-amber-600 to-purple-600"
                            : "text-amber-300 hover:bg-amber-500/20",
                        )}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Adaptive Sort Dropdown */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger
                        className={cn(
                          "bg-purple-900/30 backdrop-blur-sm border-amber-500/20 text-amber-300",
                          layout.showLabels ? "w-48" : "w-32",
                        )}
                      >
                        <SelectValue placeholder="Sort" />
                      </SelectTrigger>
                      <SelectContent className="bg-purple-900/95 backdrop-blur-xl border-amber-500/30">
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-low">Price: Low</SelectItem>
                        <SelectItem value="price-high">Price: High</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Active Filters */}
                {activeFilterCount > 0 && (
                  <motion.div
                    className="flex items-center space-x-2 mb-4 p-3 bg-purple-900/20 backdrop-blur-sm rounded-lg border border-amber-500/20"
                    animate={{
                      padding: layout.adaptiveSpacing,
                    }}
                  >
                    <span className="text-sm text-amber-300 font-medium">Active Filters:</span>
                    <Badge className="bg-gradient-to-r from-amber-600 to-purple-600 text-white border-0">
                      {activeFilterCount} applied
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-xs text-amber-300/80 hover:text-amber-300 hover:bg-amber-500/20"
                    >
                      Clear All
                    </Button>
                  </motion.div>
                )}

                {/* Results Count */}
                <div className="text-sm text-amber-300/80 font-medium">
                  Displaying {sortedProducts.length} of {sampleProducts.length} Imperial Products
                </div>
              </motion.div>

              {/* Adaptive Product Grid */}
              <motion.div
                animate={{
                  gap: layout.adaptiveSpacing,
                }}
              >
                <PaginatedProductGrid
                  products={sortedProducts}
                  itemsPerPage={layout.gridColumns * 2}
                  cardSize={layout.cardSize}
                />
              </motion.div>
            </motion.div>
          </SidebarInset>
        </div>

        {/* Comparison Bar */}
        <ComparisonBar />
      </motion.div>
    </SidebarProvider>
  )
}
