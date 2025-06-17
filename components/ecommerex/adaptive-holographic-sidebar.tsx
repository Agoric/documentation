"use client"

import { useMemo } from "react"

import { useState } from "react"
import { Search, X, Star, Sparkles, Eye, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

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

interface AdaptiveHolographicSidebarProps {
  filters: FilterState
  onFilterChange: (key: keyof FilterState, value: any) => void
  onClearFilters: () => void
  productCount: number
}

export function AdaptiveHolographicSidebar({
  filters,
  onFilterChange,
  onClearFilters,
  productCount,
}: AdaptiveHolographicSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

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

  return (
    <Sidebar className="border-r border-amber-500/20 bg-gradient-to-b from-purple-950/50 to-indigo-950/50 backdrop-blur-xl">
      <SidebarHeader className="p-4 border-b border-amber-500/20">
        <div className="flex items-center space-x-3">
          <SupremeAuthorityCoin variant="badge" size="sm" />
          <div>
            <h2 className="text-lg font-bold text-amber-300 font-serif">FILTRUM IMPERIALIS</h2>
            <p className="text-xs text-amber-300/60">Imperial Filters</p>
          </div>
        </div>

        {activeFilterCount > 0 && (
          <div className="flex items-center justify-between mt-3 p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
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
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="p-4 space-y-6">
        {/* Search */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-amber-300 font-serif text-sm">
            QUAERERE
            <span className="text-xs text-amber-300/60 font-sans ml-2">Search</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-300/60" />
              <Input
                placeholder="Search collections..."
                value={safeFilters.search || ""}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="pl-10 bg-purple-900/30 border-amber-500/20 text-amber-300 placeholder:text-amber-300/40"
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Categories */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-amber-300 font-serif text-sm">
            GENERA
            <span className="text-xs text-amber-300/60 font-sans ml-2">Categories</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
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
                  <div>
                    <div className="font-serif text-xs text-amber-400">{category.romanName}</div>
                    <div className="text-sm">{category.name}</div>
                  </div>
                  <Badge variant="outline" className="text-xs border-amber-500/30 text-amber-300/60">
                    {category.count}
                  </Badge>
                </motion.button>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Price Range */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-amber-300 font-serif text-sm">
            PRETIUM SPATIUM
            <span className="text-xs text-amber-300/60 font-sans ml-2">Price Range</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
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
                    <div>
                      <div className="font-serif text-xs text-amber-400">{range.romanName}</div>
                      <div className="text-sm">{range.name}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Rating Filter */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-amber-300 font-serif text-sm">
            AESTIMATIO MINIMA
            <span className="text-xs text-amber-300/60 font-sans ml-2">Min Rating</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
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
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="bg-amber-500/20" />

        {/* Special Features */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-amber-300 font-serif text-sm">
            PROPRIETATES SPECIALES
            <span className="text-xs text-amber-300/60 font-sans ml-2">Special Features</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
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
                  <span className="text-sm text-amber-300 group-hover:text-amber-200">Holographic Only</span>
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
                  <span className="text-sm text-amber-300 group-hover:text-amber-200">360° View Only</span>
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
                  <span className="text-sm text-amber-300 group-hover:text-amber-200">In Stock Only</span>
                </div>
              </label>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Results Count */}
        <div className="mt-6 p-3 bg-gradient-to-r from-amber-500/10 to-purple-500/10 rounded-lg border border-amber-500/20">
          <div className="text-center">
            <div className="text-lg font-bold text-amber-300 font-serif">COLLECTIONES</div>
            <div className="text-2xl font-bold text-amber-400">{productCount || 0}</div>
            <div className="text-xs text-amber-300/60">Collections Found</div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
