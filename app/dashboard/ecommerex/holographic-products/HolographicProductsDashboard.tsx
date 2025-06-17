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
    name: "Cosmic Emperors Collection",
    description:
      "Exclusive collection of 10,000 unique Roman Emperor NFTs with holographic traits and governance rights",
    price: 2.5, // ETH price
    image: "/placeholder.svg?height=300&width=300&text=Cosmic+Emperors",
    category: "PFP",
    rating: 4.8,
    stock: 2847, // Available NFTs
    platforms: ["opensea", "blur", "x2y2"],
    isHolographic: true,
    has360View: true,
    images360: [
      "/placeholder.svg?height=300&width=300&text=Emperor+1",
      "/placeholder.svg?height=300&width=300&text=Emperor+2",
      "/placeholder.svg?height=300&width=300&text=Emperor+3",
      "/placeholder.svg?height=300&width=300&text=Emperor+4",
      "/placeholder.svg?height=300&width=300&text=Emperor+5",
      "/placeholder.svg?height=300&width=300&text=Emperor+6",
      "/placeholder.svg?height=300&width=300&text=Emperor+7",
      "/placeholder.svg?height=300&width=300&text=Emperor+8",
    ],
    holographicFeatures: ["Holographic Traits", "Governance Rights", "Staking Rewards", "Metaverse Ready"],
    floorPrice: 2.1,
    totalVolume: 15420,
    owners: 3241,
  },
  {
    id: "2",
    name: "Digital Gladiators Arena",
    description: "Battle-ready gladiator NFTs with interactive combat mechanics and tournament rewards",
    price: 1.8,
    image: "/placeholder.svg?height=300&width=300&text=Digital+Gladiators",
    category: "Gaming",
    rating: 4.9,
    stock: 1523,
    platforms: ["opensea", "magic-eden", "blur"],
    isHolographic: true,
    has360View: true,
    images360: [
      "/placeholder.svg?height=300&width=300&text=Gladiator+1",
      "/placeholder.svg?height=300&width=300&text=Gladiator+2",
      "/placeholder.svg?height=300&width=300&text=Gladiator+3",
      "/placeholder.svg?height=300&width=300&text=Gladiator+4",
      "/placeholder.svg?height=300&width=300&text=Gladiator+5",
      "/placeholder.svg?height=300&width=300&text=Gladiator+6",
      "/placeholder.svg?height=300&width=300&text=Gladiator+7",
      "/placeholder.svg?height=300&width=300&text=Gladiator+8",
    ],
    holographicFeatures: ["Combat Mechanics", "Tournament Ready", "Weapon Upgrades", "Arena Access"],
    floorPrice: 1.5,
    totalVolume: 8934,
    owners: 1876,
  },
  {
    id: "3",
    name: "Quantum Art Masterpieces",
    description: "AI-generated quantum art pieces with evolving visual properties and collector rewards",
    price: 5.2,
    image: "/placeholder.svg?height=300&width=300&text=Quantum+Art",
    category: "Art",
    rating: 4.7,
    stock: 0, // Sold out
    platforms: ["foundation", "superrare", "async"],
    isHolographic: true,
    has360View: true,
    images360: [
      "/placeholder.svg?height=300&width=300&text=Quantum+Art+1",
      "/placeholder.svg?height=300&width=300&text=Quantum+Art+2",
      "/placeholder.svg?height=300&width=300&text=Quantum+Art+3",
      "/placeholder.svg?height=300&width=300&text=Quantum+Art+4",
      "/placeholder.svg?height=300&width=300&text=Quantum+Art+5",
      "/placeholder.svg?height=300&width=300&text=Quantum+Art+6",
      "/placeholder.svg?height=300&width=300&text=Quantum+Art+7",
      "/placeholder.svg?height=300&width=300&text=Quantum+Art+8",
    ],
    holographicFeatures: ["Evolving Visuals", "AI Generated", "Collector Rewards", "Museum Quality"],
    floorPrice: 4.8,
    totalVolume: 23567,
    owners: 456,
  },
  {
    id: "4",
    name: "Pixel Legions",
    description: "Retro-style pixel art warriors with classic gaming aesthetics and nostalgic appeal",
    price: 0.3,
    image: "/placeholder.svg?height=300&width=300&text=Pixel+Legions",
    category: "Pixel Art",
    rating: 4.6,
    stock: 7834,
    platforms: ["opensea", "blur", "looksrare"],
    isHolographic: false,
    has360View: false,
    holographicFeatures: [],
    floorPrice: 0.25,
    totalVolume: 2341,
    owners: 4521,
  },
  {
    id: "5",
    name: "Metaverse Real Estate",
    description: "Premium virtual land parcels in the Snapifi Metaverse with building rights and revenue sharing",
    price: 12.5,
    image: "/placeholder.svg?height=300&width=300&text=Metaverse+Land",
    category: "Virtual Land",
    rating: 4.5,
    stock: 234,
    platforms: ["opensea", "decentraland", "sandbox"],
    isHolographic: true,
    has360View: true,
    images360: [
      "/placeholder.svg?height=300&width=300&text=Land+1",
      "/placeholder.svg?height=300&width=300&text=Land+2",
      "/placeholder.svg?height=300&width=300&text=Land+3",
      "/placeholder.svg?height=300&width=300&text=Land+4",
      "/placeholder.svg?height=300&width=300&text=Land+5",
      "/placeholder.svg?height=300&width=300&text=Land+6",
      "/placeholder.svg?height=300&width=300&text=Land+7",
      "/placeholder.svg?height=300&width=300&text=Land+8",
    ],
    holographicFeatures: ["Building Rights", "Revenue Sharing", "Metaverse Access", "Development Tools"],
    floorPrice: 11.2,
    totalVolume: 45678,
    owners: 189,
  },
  {
    id: "6",
    name: "Holographic Music NFTs",
    description: "Interactive music NFTs with 3D visualizations and exclusive artist content",
    price: 0.8,
    image: "/placeholder.svg?height=300&width=300&text=Music+NFTs",
    category: "Music",
    rating: 4.4,
    stock: 1567,
    platforms: ["opensea", "catalog", "sound"],
    isHolographic: true,
    has360View: false,
    holographicFeatures: ["3D Visualizations", "Exclusive Content", "Artist Access", "Concert Tickets"],
    floorPrice: 0.6,
    totalVolume: 3456,
    owners: 2341,
  },
  {
    id: "7",
    name: "Sports Legends Cards",
    description: "Digital trading cards featuring legendary athletes with animated highlights and stats",
    price: 0.15,
    image: "/placeholder.svg?height=300&width=300&text=Sports+Cards",
    category: "Sports",
    rating: 4.3,
    stock: 12456,
    platforms: ["opensea", "topshot", "sorare"],
    isHolographic: false,
    has360View: false,
    holographicFeatures: [],
    floorPrice: 0.12,
    totalVolume: 1234,
    owners: 8765,
  },
  {
    id: "8",
    name: "Cyberpunk Avatars",
    description: "Futuristic avatar collection with customizable traits and virtual world compatibility",
    price: 3.2,
    image: "/placeholder.svg?height=300&width=300&text=Cyberpunk+Avatars",
    category: "Avatars",
    rating: 4.8,
    stock: 892,
    platforms: ["opensea", "blur", "x2y2"],
    isHolographic: true,
    has360View: true,
    images360: [
      "/placeholder.svg?height=300&width=300&text=Avatar+1",
      "/placeholder.svg?height=300&width=300&text=Avatar+2",
      "/placeholder.svg?height=300&width=300&text=Avatar+3",
      "/placeholder.svg?height=300&width=300&text=Avatar+4",
      "/placeholder.svg?height=300&width=300&text=Avatar+5",
      "/placeholder.svg?height=300&width=300&text=Avatar+6",
      "/placeholder.svg?height=300&width=300&text=Avatar+7",
      "/placeholder.svg?height=300&width=300&text=Avatar+8",
    ],
    holographicFeatures: ["Customizable Traits", "Virtual World Ready", "Avatar System", "Social Features"],
    floorPrice: 2.8,
    totalVolume: 18765,
    owners: 1234,
  },
]

const categories = [
  { id: "all", name: "All Collections", count: 156, romanName: "OMNIA" },
  { id: "PFP", name: "Profile Pictures", count: 24, romanName: "PERSONA" },
  { id: "Art", name: "Digital Art", count: 18, romanName: "ARS" },
  { id: "Gaming", name: "Gaming", count: 12, romanName: "LUDUS" },
  { id: "Music", name: "Music", count: 32, romanName: "MUSICA" },
  { id: "Virtual Land", name: "Virtual Land", count: 8, romanName: "TERRA" },
  { id: "Sports", name: "Sports", count: 15, romanName: "CERTAMEN" },
  { id: "Avatars", name: "Avatars", count: 22, romanName: "IMAGO" },
  { id: "Pixel Art", name: "Pixel Art", count: 19, romanName: "PIXELUM" },
]

const priceRanges = [
  { id: "all", name: "All Prices", romanName: "OMNIS PRETIUM" },
  { id: "under-1", name: "Under 1 ETH", romanName: "< I ETH" },
  { id: "1-5", name: "1 - 5 ETH", romanName: "I-V ETH" },
  { id: "5-10", name: "5 - 10 ETH", romanName: "V-X ETH" },
  { id: "10-50", name: "10 - 50 ETH", romanName: "X-L ETH" },
  { id: "over-50", name: "Over 50 ETH", romanName: "> L ETH" },
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
            case "under-1":
              if (price >= 1) return false
              break
            case "1-5":
              if (price < 1 || price >= 5) return false
              break
            case "5-10":
              if (price < 5 || price >= 10) return false
              break
            case "10-50":
              if (price < 10 || price >= 50) return false
              break
            case "over-50":
              if (price < 50) return false
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
                      <h1 className="font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-clip-text text-transparent font-serif">
                        MERCATUS NFT IMPERIUM
                      </h1>
                      <p className="text-amber-300/80 mt-1 font-medium">Imperial NFT Marketplace of Digital Assets</p>
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
                  Displaying {sortedProducts.length} of {sampleProducts.length} NFT Collections
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
