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
