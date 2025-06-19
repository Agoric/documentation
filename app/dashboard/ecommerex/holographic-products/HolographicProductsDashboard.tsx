"use client"
import { useState, useMemo, createContext, useContext } from "react"
import { Grid, List, TestTube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PaginatedProductGrid } from "@/components/ecommerex/paginated-product-grid"
import { ComparisonBar } from "@/components/ecommerex/comparison-bar"
import { AdaptiveHolographicSidebar } from "@/components/ecommerex/adaptive-holographic-sidebar"
import { AdaptiveRegalToolbar } from "@/components/navigation/adaptive-regal-toolbar"
import { FilterTestPanel } from "@/components/ecommerex/filter-test-panel"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

// Create context for sidebar state
const SidebarContext = createContext<{
  isExpanded: boolean
  setIsExpanded: (expanded: boolean) => void
}>({
  isExpanded: false,
  setIsExpanded: () => {},
})

// Enhanced sample investment products for QUICA Global Citizen Money Market
const sampleProducts = [
  {
    id: "1",
    name: "QUICA Global Index (QGI)",
    description:
      "Diversified global investment index tracking the world's top performing markets with quantum-enhanced analytics",
    price: 2500, // USD minimum investment
    image: "/placeholder.svg?height=300&width=300&text=QGI+Global+Index",
    category: "QGI",
    rating: 4.8,
    stock: 2847, // Available investment slots
    platforms: ["QUICA", "Global Markets", "Quantum Analytics"],
    isHolographic: true,
    has360View: true,
    images360: [
      "/placeholder.svg?height=300&width=300&text=QGI+Performance+1",
      "/placeholder.svg?height=300&width=300&text=QGI+Performance+2",
      "/placeholder.svg?height=300&width=300&text=QGI+Analytics+1",
      "/placeholder.svg?height=300&width=300&text=QGI+Analytics+2",
      "/placeholder.svg?height=300&width=300&text=QGI+Global+1",
      "/placeholder.svg?height=300&width=300&text=QGI+Global+2",
      "/placeholder.svg?height=300&width=300&text=QGI+Quantum+1",
      "/placeholder.svg?height=300&width=300&text=QGI+Quantum+2",
    ],
    holographicFeatures: ["Quantum Analytics", "Global Diversification", "Real-time Tracking", "AI Optimization"],
    floorPrice: 2100,
    totalVolume: 154200000, // Total AUM in USD
    owners: 3241, // Number of investors
  },
  {
    id: "2",
    name: "QUICA Bond Fund (QBF)",
    description: "Premium government and corporate bond portfolio with stable returns and capital preservation focus",
    price: 1800,
    image: "/placeholder.svg?height=300&width=300&text=QBF+Bond+Fund",
    category: "QBF",
    rating: 4.9,
    stock: 1523,
    platforms: ["QUICA", "Bond Markets", "Fixed Income"],
    isHolographic: true,
    has360View: true,
    images360: [
      "/placeholder.svg?height=300&width=300&text=QBF+Bonds+1",
      "/placeholder.svg?height=300&width=300&text=QBF+Bonds+2",
      "/placeholder.svg?height=300&width=300&text=QBF+Yield+1",
      "/placeholder.svg?height=300&width=300&text=QBF+Yield+2",
      "/placeholder.svg?height=300&width=300&text=QBF+Portfolio+1",
      "/placeholder.svg?height=300&width=300&text=QBF+Portfolio+2",
      "/placeholder.svg?height=300&width=300&text=QBF+Analysis+1",
      "/placeholder.svg?height=300&width=300&text=QBF+Analysis+2",
    ],
    holographicFeatures: ["Stable Returns", "Capital Preservation", "Government Bonds", "Corporate Bonds"],
    floorPrice: 1500,
    totalVolume: 89340000,
    owners: 1876,
  },
  {
    id: "3",
    name: "QUICA Equity Fund (QEF)",
    description: "High-growth equity portfolio featuring blue-chip stocks and emerging market opportunities",
    price: 5200,
    image: "/placeholder.svg?height=300&width=300&text=QEF+Equity+Fund",
    category: "QEF",
    rating: 4.7,
    stock: 892,
    platforms: ["QUICA", "Stock Markets", "Equity Trading"],
    isHolographic: true,
    has360View: true,
    images360: [
      "/placeholder.svg?height=300&width=300&text=QEF+Stocks+1",
      "/placeholder.svg?height=300&width=300&text=QEF+Stocks+2",
      "/placeholder.svg?height=300&width=300&text=QEF+Growth+1",
      "/placeholder.svg?height=300&width=300&text=QEF+Growth+2",
      "/placeholder.svg?height=300&width=300&text=QEF+Markets+1",
      "/placeholder.svg?height=300&width=300&text=QEF+Markets+2",
      "/placeholder.svg?height=300&width=300&text=QEF+Performance+1",
      "/placeholder.svg?height=300&width=300&text=QEF+Performance+2",
    ],
    holographicFeatures: ["High Growth", "Blue Chip Stocks", "Emerging Markets", "Dividend Income"],
    floorPrice: 4800,
    totalVolume: 235670000,
    owners: 456,
  },
  {
    id: "4",
    name: "QUICA Crypto Fund (QCF)",
    description: "Diversified cryptocurrency portfolio with Bitcoin, Ethereum, and emerging digital assets",
    price: 3000,
    image: "/placeholder.svg?height=300&width=300&text=QCF+Crypto+Fund",
    category: "QCF",
    rating: 4.6,
    stock: 7834,
    platforms: ["QUICA", "Crypto Exchanges", "DeFi Protocols"],
    isHolographic: false,
    has360View: false,
    holographicFeatures: [],
    floorPrice: 2500,
    totalVolume: 23410000,
    owners: 4521,
  },
  {
    id: "5",
    name: "QUICA Real Estate Fund (QRF)",
    description: "Global real estate investment trust with commercial and residential properties worldwide",
    price: 12500,
    image: "/placeholder.svg?height=300&width=300&text=QRF+Real+Estate",
    category: "QRF",
    rating: 4.5,
    stock: 234,
    platforms: ["QUICA", "REIT Markets", "Property Investment"],
    isHolographic: true,
    has360View: true,
    images360: [
      "/placeholder.svg?height=300&width=300&text=QRF+Properties+1",
      "/placeholder.svg?height=300&width=300&text=QRF+Properties+2",
      "/placeholder.svg?height=300&width=300&text=QRF+Commercial+1",
      "/placeholder.svg?height=300&width=300&text=QRF+Commercial+2",
      "/placeholder.svg?height=300&width=300&text=QRF+Residential+1",
      "/placeholder.svg?height=300&width=300&text=QRF+Residential+2",
      "/placeholder.svg?height=300&width=300&text=QRF+Global+1",
      "/placeholder.svg?height=300&width=300&text=QRF+Global+2",
    ],
    holographicFeatures: ["Global Properties", "REIT Investment", "Rental Income", "Property Appreciation"],
    floorPrice: 11200,
    totalVolume: 456780000,
    owners: 189,
  },
  {
    id: "6",
    name: "QUICA Commodity Market (QCM)",
    description: "Precious metals, energy, and agricultural commodities investment with inflation protection",
    price: 800,
    image: "/placeholder.svg?height=300&width=300&text=QCM+Commodities",
    category: "QCM",
    rating: 4.4,
    stock: 1567,
    platforms: ["QUICA", "Commodity Exchanges", "Futures Markets"],
    isHolographic: true,
    has360View: false,
    holographicFeatures: ["Precious Metals", "Energy Commodities", "Agricultural Products", "Inflation Hedge"],
    floorPrice: 600,
    totalVolume: 34560000,
    owners: 2341,
  },
  {
    id: "7",
    name: "QUICA Innovation Fund (QIF)",
    description: "Technology and innovation-focused investment in AI, quantum computing, and breakthrough technologies",
    price: 1500,
    image: "/placeholder.svg?height=300&width=300&text=QIF+Innovation",
    category: "QIF",
    rating: 4.3,
    stock: 12456,
    platforms: ["QUICA", "Tech Markets", "Innovation Hubs"],
    isHolographic: false,
    has360View: false,
    holographicFeatures: [],
    floorPrice: 1200,
    totalVolume: 12340000,
    owners: 8765,
  },
  {
    id: "8",
    name: "QUICA Sustainable Fund (QSF)",
    description: "ESG-focused investment portfolio supporting sustainable and environmentally responsible companies",
    price: 3200,
    image: "/placeholder.svg?height=300&width=300&text=QSF+Sustainable",
    category: "QSF",
    rating: 4.8,
    stock: 892,
    platforms: ["QUICA", "ESG Markets", "Green Finance"],
    isHolographic: true,
    has360View: true,
    images360: [
      "/placeholder.svg?height=300&width=300&text=QSF+ESG+1",
      "/placeholder.svg?height=300&width=300&text=QSF+ESG+2",
      "/placeholder.svg?height=300&width=300&text=QSF+Green+1",
      "/placeholder.svg?height=300&width=300&text=QSF+Green+2",
      "/placeholder.svg?height=300&width=300&text=QSF+Sustainable+1",
      "/placeholder.svg?height=300&width=300&text=QSF+Sustainable+2",
      "/placeholder.svg?height=300&width=300&text=QSF+Impact+1",
      "/placeholder.svg?height=300&width=300&text=QSF+Impact+2",
    ],
    holographicFeatures: ["ESG Compliance", "Green Technology", "Social Impact", "Environmental Focus"],
    floorPrice: 2800,
    totalVolume: 187650000,
    owners: 1234,
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
  const [showTestPanel, setShowTestPanel] = useState(false)
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "all",
    priceRange: "all",
    minRating: 0,
    holographicOnly: false,
    has360ViewOnly: false,
    inStockOnly: false,
  })

  // Dynamic layout values based on sidebar state
  const layout = {
    sidebarWidth: sidebarExpanded ? 320 : 80,
    sidebarCollapsed: !sidebarExpanded,
    adaptiveSpacing: 16,
    contentPadding: 24,
    cardSize: "default" as const,
    toolbarCompact: false,
    showLabels: true,
    gridColumns: 3,
  }

  // Enhanced filter function with comprehensive error handling
  const filterProducts = useMemo(() => {
    try {
      if (!Array.isArray(sampleProducts)) {
        console.warn("sampleProducts is not an array")
        return []
      }

      return sampleProducts.filter((product) => {
        // Null safety checks
        if (!product || typeof product !== "object") {
          console.warn("Invalid product object:", product)
          return false
        }

        // Search filter with null safety
        if (filters?.search) {
          const searchTerm = filters.search.toLowerCase()
          const name = product.name?.toLowerCase() || ""
          const description = product.description?.toLowerCase() || ""

          if (!name.includes(searchTerm) && !description.includes(searchTerm)) {
            return false
          }
        }

        // Category filter with null safety
        if (filters?.category && filters.category !== "all") {
          if (!product.category || product.category !== filters.category) {
            return false
          }
        }

        // Price range filter with null safety (adjusted for investment amounts)
        if (filters?.priceRange && filters.priceRange !== "all") {
          const price = typeof product.price === "number" ? product.price : 0

          switch (filters.priceRange) {
            case "under-1k":
              if (price >= 1000) return false
              break
            case "1k-10k":
              if (price < 1000 || price >= 10000) return false
              break
            case "10k-100k":
              if (price < 10000 || price >= 100000) return false
              break
            case "100k-1m":
              if (price < 100000 || price >= 1000000) return false
              break
            case "over-1m":
              if (price < 1000000) return false
              break
            default:
              console.warn("Unknown price range:", filters.priceRange)
          }
        }

        // Rating filter with null safety
        if (filters?.minRating && filters.minRating > 0) {
          const rating = typeof product.rating === "number" ? product.rating : 0
          if (rating < filters.minRating) {
            return false
          }
        }

        // Special filters with null safety
        if (filters?.holographicOnly && !product.isHolographic) return false
        if (filters?.has360ViewOnly && !product.has360View) return false
        if (filters?.inStockOnly) {
          const stock = typeof product.stock === "number" ? product.stock : 0
          if (stock === 0) return false
        }

        return true
      })
    } catch (error) {
      console.error("Error filtering products:", error)
      return sampleProducts || [] // Return all products if filtering fails
    }
  }, [filters])

  // Sort products with error handling
  const sortedProducts = useMemo(() => {
    try {
      if (!Array.isArray(filterProducts)) {
        return []
      }

      const sorted = [...filterProducts]

      switch (sortBy) {
        case "price-low":
          return sorted.sort((a, b) => (a?.price || 0) - (b?.price || 0))
        case "price-high":
          return sorted.sort((a, b) => (b?.price || 0) - (a?.price || 0))
        case "rating":
          return sorted.sort((a, b) => (b?.rating || 0) - (a?.rating || 0))
        case "name":
          return sorted.sort((a, b) => (a?.name || "").localeCompare(b?.name || ""))
        default:
          return sorted
      }
    } catch (error) {
      console.error("Error sorting products:", error)
      return filterProducts || [] // Return unsorted if sorting fails
    }
  }, [filterProducts, sortBy])

  const updateFilter = (key: keyof FilterState, value: any) => {
    try {
      setFilters((prev) => ({ ...prev, [key]: value }))
    } catch (error) {
      console.error("Error updating filter:", error)
    }
  }

  const clearAllFilters = () => {
    try {
      setFilters({
        search: "",
        category: "all",
        priceRange: "all",
        minRating: 0,
        holographicOnly: false,
        has360ViewOnly: false,
        inStockOnly: false,
      })
    } catch (error) {
      console.error("Error clearing filters:", error)
    }
  }

  const activeFilterCount = useMemo(() => {
    try {
      if (!filters) return 0
      return Object.values(filters).filter((value) => value !== "" && value !== "all" && value !== 0 && value !== false)
        .length
    } catch (error) {
      console.error("Error counting active filters:", error)
      return 0
    }
  }, [filters])

  return (
    <SidebarContext.Provider value={{ isExpanded: sidebarExpanded, setIsExpanded: setSidebarExpanded }}>
      <motion.div
        className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-900 relative"
        animate={{
          paddingLeft: 0, // Remove padding since we're using absolute positioning
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
        <motion.div
          animate={{
            marginLeft: layout.sidebarWidth,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <AdaptiveRegalToolbar />
        </motion.div>

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
                  <h2 className="text-xl font-semibold text-amber-300">Imperial Testing Console</h2>
                  <span className="text-sm text-amber-300/60 font-serif italic">Consilium Probationis Imperialis</span>
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

        {/* Layout Container */}
        <div className="flex relative">
          {/* Adaptive Sidebar - Fixed Position */}
          <div className="fixed left-0 top-0 h-full z-40">
            <AdaptiveHolographicSidebar
              filters={filters}
              onFilterChange={updateFilter}
              onClearFilters={clearAllFilters}
              productCount={sortedProducts?.length || 0}
              onExpandChange={setSidebarExpanded}
            />
          </div>

          {/* Main Content - Responsive to Sidebar */}
          <motion.div
            className="flex-1 min-h-screen"
            animate={{
              marginLeft: layout.sidebarWidth,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
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
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
                        QUICA Global Citizen Money Market
                      </h1>
                      <p className="text-amber-300/80 mt-1 font-serif italic">
                        Quantum Utility Investment Capitol Accelerator
                      </p>
                      <p className="text-purple-200/60 text-sm font-serif italic mt-0.5">
                        Mercatus Monetarius Civium Globalis
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
                        <SelectItem value="price-low">Investment: Low</SelectItem>
                        <SelectItem value="price-high">Investment: High</SelectItem>
                        <SelectItem value="rating">Performance</SelectItem>
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
                    <span className="text-xs text-amber-300/60 font-serif italic">Filtrum Activum</span>
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
                  Investment Options: {sortedProducts?.length || 0} of {sampleProducts?.length || 0} Available
                  <span className="text-xs text-amber-300/60 font-serif italic ml-2">
                    • Optiones Investimenti Disponibiles
                  </span>
                </div>
              </motion.div>

              {/* Adaptive Product Grid */}
              <motion.div
                animate={{
                  gap: layout.adaptiveSpacing,
                }}
              >
                <PaginatedProductGrid
                  products={sortedProducts || []}
                  itemsPerPage={layout.gridColumns * 2}
                  cardSize={layout.cardSize}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Comparison Bar - Responsive to Sidebar */}
        <motion.div
          animate={{
            marginLeft: layout.sidebarWidth,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ComparisonBar />
        </motion.div>
      </motion.div>
    </SidebarContext.Provider>
  )
}

// Export the context for use in child components
export const useSidebarContext = () => useContext(SidebarContext)
