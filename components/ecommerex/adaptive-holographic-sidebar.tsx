"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import { Search, X, Star, Sparkles, Eye, Package, Filter, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const categories = [
  { id: "all", name: "All Investments", count: 156, romanName: "Omnia Investimenta", icon: "💰" },
  { id: "QGI", name: "QUICA Global Index", count: 24, romanName: "Index Globalis", icon: "🌍" },
  { id: "QBF", name: "QUICA Bond Fund", count: 18, romanName: "Fundus Obligationum", icon: "📊" },
  { id: "QEF", name: "QUICA Equity Fund", count: 12, romanName: "Fundus Aequitatis", icon: "📈" },
  { id: "QCF", name: "QUICA Crypto Fund", count: 32, romanName: "Fundus Cryptographicus", icon: "₿" },
  { id: "QRF", name: "QUICA Real Estate Fund", count: 8, romanName: "Fundus Immobiliaris", icon: "🏢" },
  { id: "QCM", name: "QUICA Commodity Market", count: 15, romanName: "Mercatus Commoditatum", icon: "🥇" },
  { id: "QIF", name: "QUICA Innovation Fund", count: 22, romanName: "Fundus Innovationis", icon: "🚀" },
  { id: "QSF", name: "QUICA Sustainable Fund", count: 19, romanName: "Fundus Sustentabilis", icon: "🌱" },
  { id: "QPF", name: "QUICA Private Equity", count: 14, romanName: "Aequitas Privata", icon: "🏛️" },
  { id: "QHF", name: "QUICA Hedge Fund", count: 11, romanName: "Fundus Defensivus", icon: "⚡" },
]

const priceRanges = [
  { id: "all", name: "All Investment Levels", romanName: "Omnis Gradus", icon: "💰" },
  { id: "under-1k", name: "Under $1,000", romanName: "< M USD", icon: "💸" },
  { id: "1k-10k", name: "$1K - $10K", romanName: "M-X USD", icon: "💵" },
  { id: "10k-100k", name: "$10K - $100K", romanName: "X-C USD", icon: "💴" },
  { id: "100k-1m", name: "$100K - $1M", romanName: "C-M USD", icon: "💶" },
  { id: "over-1m", name: "Over $1M", romanName: "> M USD", icon: "💎" },
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

interface AdaptiveHolographicSidebarProps {
  filters: FilterState
  onFilterChange: (key: keyof FilterState, value: any) => void
  onClearFilters: () => void
  productCount: number
  onExpandChange?: (expanded: boolean) => void
}

export function AdaptiveHolographicSidebar({
  filters,
  onFilterChange,
  onClearFilters,
  productCount,
  onExpandChange,
}: AdaptiveHolographicSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Notify parent component of expansion state changes
  useEffect(() => {
    if (onExpandChange) {
      onExpandChange(isExpanded)
    }
  }, [isExpanded, onExpandChange])

  // Safe filter access with null checks
  const safeFilters = filters || {
    search: "",
    category: "all",
    priceRange: "all",
    minRating: 0,
    holographicOnly: false,
    has360ViewOnly: false,
    inStockOnly: false,
  }

  const activeFilterCount = useMemo(() => {
    try {
      return Object.values(safeFilters).filter(
        (value) => value !== "" && value !== "all" && value !== 0 && value !== false,
      ).length
    } catch (error) {
      console.error("Error counting active filters:", error)
      return 0
    }
  }, [safeFilters])

  // Handle mouse enter with immediate expansion
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsHovering(true)
    setIsExpanded(true)
  }

  // Handle mouse leave with delayed retraction
  const handleMouseLeave = () => {
    setIsHovering(false)

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set a timeout to retract the sidebar after a brief delay
    timeoutRef.current = setTimeout(() => {
      setIsExpanded(false)
    }, 300) // 300ms delay before retracting
  }

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Additional mouse tracking for more precise control
  useEffect(() => {
    const handleGlobalMouseMove = (event: MouseEvent) => {
      if (!sidebarRef.current) return

      const sidebarRect = sidebarRef.current.getBoundingClientRect()
      const buffer = 20 // 20px buffer zone

      const isWithinSidebar =
        event.clientX >= sidebarRect.left - buffer &&
        event.clientX <= sidebarRect.right + buffer &&
        event.clientY >= sidebarRect.top - buffer &&
        event.clientY <= sidebarRect.bottom + buffer

      if (isWithinSidebar && !isHovering) {
        handleMouseEnter()
      } else if (!isWithinSidebar && isHovering) {
        handleMouseLeave()
      }
    }

    document.addEventListener("mousemove", handleGlobalMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove)
    }
  }, [isHovering])

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    try {
      if (onFilterChange && typeof onFilterChange === "function") {
        onFilterChange(key, value)
      }
    } catch (error) {
      console.error("Error changing filter:", error)
    }
  }

  const handleClearFilters = () => {
    try {
      if (onClearFilters && typeof onClearFilters === "function") {
        onClearFilters()
      }
    } catch (error) {
      console.error("Error clearing filters:", error)
    }
  }

  const selectedCategory = categories.find((cat) => cat.id === safeFilters.category) || categories[0]
  const selectedPriceRange = priceRanges.find((range) => range.id === safeFilters.priceRange) || priceRanges[0]

  return (
    <motion.div
      ref={sidebarRef}
      className="h-screen bg-gradient-to-b from-purple-950/95 to-indigo-950/95 backdrop-blur-xl shadow-2xl border-r border-amber-500/20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        width: isExpanded ? 320 : 80,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      {/* Header */}
      <div className="p-4 border-b border-amber-500/20">
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded-header"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-3"
            >
              <SupremeAuthorityCoin variant="badge" size="sm" />
              <div>
                <h2 className="text-lg font-bold text-amber-300">Investment Filters</h2>
                <p className="text-xs text-amber-300/60 font-serif italic">Filtrum Investimentorum</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed-header"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center space-y-2"
            >
              <SupremeAuthorityCoin variant="badge" size="sm" />
              <Filter className="h-5 w-5 text-amber-400" />
              {activeFilterCount > 0 && (
                <Badge className="bg-gradient-to-r from-amber-600 to-purple-600 text-white border-0 text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isExpanded && activeFilterCount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between mt-3 p-2 bg-amber-500/10 rounded-lg border border-amber-500/20"
            >
              <Badge className="bg-gradient-to-r from-amber-600 to-purple-600 text-white border-0">
                {activeFilterCount} active
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-xs text-amber-300/80 hover:text-amber-300 hover:bg-amber-500/20 h-6"
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto flex-1">
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded-content"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Search */}
              <div>
                <div className="text-amber-300 text-sm mb-2">
                  Search Investments
                  <span className="text-xs text-amber-300/60 font-serif italic ml-2">Quaerere Investimenta</span>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-300/60" />
                  <Input
                    placeholder="Search investment funds..."
                    value={safeFilters.search || ""}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                    className="pl-10 bg-purple-900/30 border-amber-500/20 text-amber-300 placeholder:text-amber-300/40"
                  />
                </div>
              </div>

              {/* Investment Categories */}
              <div>
                <div className="text-amber-300 text-sm mb-2">
                  Investment Categories
                  <span className="text-xs text-amber-300/60 font-serif italic ml-2">Genera Investimentorum</span>
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      onClick={() => handleFilterChange("category", category.id)}
                      className={cn(
                        "w-full text-left p-2 rounded-lg transition-all duration-200 flex items-center justify-between group",
                        safeFilters.category === category.id
                          ? "bg-gradient-to-r from-amber-600/20 to-purple-600/20 border border-amber-500/30 text-amber-300"
                          : "text-amber-300/70 hover:text-amber-300 hover:bg-amber-500/10",
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{category.icon}</span>
                        <div>
                          <div className="text-sm font-medium">{category.name}</div>
                          <div className="text-xs text-amber-400 font-serif italic">{category.romanName}</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs border-amber-500/30 text-amber-300/60">
                        {category.count}
                      </Badge>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Investment Range */}
              <div>
                <div className="text-amber-300 text-sm mb-2">
                  Investment Range
                  <span className="text-xs text-amber-300/60 font-serif italic ml-2">Spatium Investimenti</span>
                </div>
                <Select
                  value={safeFilters.priceRange || "all"}
                  onValueChange={(value) => handleFilterChange("priceRange", value)}
                >
                  <SelectTrigger className="bg-purple-900/30 border-amber-500/20 text-amber-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-purple-900/95 backdrop-blur-xl border-amber-500/30">
                    {priceRanges.map((range) => (
                      <SelectItem key={range.id} value={range.id} className="text-amber-300">
                        <div className="flex items-center space-x-2">
                          <span>{range.icon}</span>
                          <div>
                            <div className="text-sm">{range.name}</div>
                            <div className="text-xs text-amber-400 font-serif italic">{range.romanName}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Performance Rating */}
              <div>
                <div className="text-amber-300 text-sm mb-2">
                  Minimum Performance Rating
                  <span className="text-xs text-amber-300/60 font-serif italic ml-2">Aestimatio Performance</span>
                </div>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleFilterChange("minRating", rating === safeFilters.minRating ? 0 : rating)}
                      className={cn(
                        "p-1 rounded transition-colors",
                        rating <= (safeFilters.minRating || 0)
                          ? "text-amber-400"
                          : "text-amber-300/30 hover:text-amber-300/60",
                      )}
                    >
                      <Star className="h-4 w-4 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <Separator className="bg-amber-500/20" />

              {/* Investment Features */}
              <div>
                <div className="text-amber-300 text-sm mb-2">
                  Investment Features
                  <span className="text-xs text-amber-300/60 font-serif italic ml-2">Proprietates Investimenti</span>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={safeFilters.holographicOnly || false}
                      onChange={(e) => handleFilterChange("holographicOnly", e.target.checked)}
                      className="rounded border-amber-500/30 bg-purple-900/30 text-amber-500 focus:ring-amber-500/20"
                    />
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-amber-400" />
                      <span className="text-sm text-amber-300 group-hover:text-amber-200">Quantum Enhanced</span>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={safeFilters.has360ViewOnly || false}
                      onChange={(e) => handleFilterChange("has360ViewOnly", e.target.checked)}
                      className="rounded border-amber-500/30 bg-purple-900/30 text-amber-500 focus:ring-amber-500/20"
                    />
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-amber-400" />
                      <span className="text-sm text-amber-300 group-hover:text-amber-200">Full Analytics</span>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={safeFilters.inStockOnly || false}
                      onChange={(e) => handleFilterChange("inStockOnly", e.target.checked)}
                      className="rounded border-amber-500/30 bg-purple-900/30 text-amber-500 focus:ring-amber-500/20"
                    />
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-amber-400" />
                      <span className="text-sm text-amber-300 group-hover:text-amber-200">Available Now</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Investment Count */}
              <div className="mt-6 p-3 bg-gradient-to-r from-amber-500/10 to-purple-500/10 rounded-lg border border-amber-500/20">
                <div className="text-center">
                  <div className="text-lg font-bold text-amber-300">Investment Options</div>
                  <div className="text-xs text-amber-300/60 font-serif italic">Optiones Investimenti</div>
                  <div className="text-2xl font-bold text-amber-400">{productCount || 0}</div>
                  <div className="text-xs text-amber-300/60">Available</div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed-content"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Collapsed Search */}
              <div className="flex justify-center">
                <div className="p-2 rounded-lg bg-purple-900/30 border border-amber-500/20">
                  <Search className="h-5 w-5 text-amber-400" />
                </div>
              </div>

              {/* Collapsed Category Indicator */}
              <div className="flex flex-col items-center space-y-1">
                <div className="text-2xl">{selectedCategory.icon}</div>
                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
              </div>

              {/* Collapsed Price Indicator */}
              <div className="flex flex-col items-center space-y-1">
                <div className="text-2xl">{selectedPriceRange.icon}</div>
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              </div>

              {/* Collapsed Rating */}
              <div className="flex flex-col items-center space-y-1">
                <Star className="h-5 w-5 text-amber-400 fill-current" />
                <div className="text-xs text-amber-300">{safeFilters.minRating || 0}</div>
              </div>

              {/* Collapsed Special Features */}
              <div className="space-y-2">
                {safeFilters.holographicOnly && (
                  <div className="flex justify-center">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                  </div>
                )}
                {safeFilters.has360ViewOnly && (
                  <div className="flex justify-center">
                    <Eye className="h-4 w-4 text-blue-400" />
                  </div>
                )}
                {safeFilters.inStockOnly && (
                  <div className="flex justify-center">
                    <Package className="h-4 w-4 text-green-400" />
                  </div>
                )}
              </div>

              {/* Collapsed Results Count */}
              <div className="text-center p-2 bg-gradient-to-r from-amber-500/10 to-purple-500/10 rounded-lg border border-amber-500/20">
                <div className="text-lg font-bold text-amber-400">{productCount || 0}</div>
                <div className="text-xs text-amber-300/60">Funds</div>
              </div>

              {/* Expand Indicator */}
              <div className="flex justify-center mt-4">
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                >
                  <ChevronRight className="h-4 w-4 text-amber-400/60" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
