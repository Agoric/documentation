"use client"
import { Search, Filter, X, Star, Eye, Zap, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

interface FilterState {
  search: string
  category: string
  priceRange: string
  minRating: number
  holographicOnly: boolean
  has360ViewOnly: boolean
  inStockOnly: boolean
}

interface HolographicSidebarProps {
  filters: FilterState
  onFilterChange: (key: keyof FilterState, value: any) => void
  onClearFilters: () => void
  productCount: number
}

const categories = [
  { id: "all", name: "All Categories", count: 156 },
  { id: "Audio", name: "Audio", count: 24 },
  { id: "Wearables", name: "Wearables", count: 18 },
  { id: "Cameras", name: "Cameras", count: 12 },
  { id: "Peripherals", name: "Peripherals", count: 32 },
]

const priceRanges = [
  { id: "all", name: "All Prices" },
  { id: "under-100", name: "Under $100" },
  { id: "100-200", name: "$100 - $200" },
  { id: "200-500", name: "$200 - $500" },
  { id: "500-1000", name: "$500 - $1,000" },
  { id: "over-1000", name: "Over $1,000" },
]

const ratingOptions = [
  { value: 0, label: "All Ratings" },
  { value: 4, label: "4+ Stars" },
  { value: 4.5, label: "4.5+ Stars" },
  { value: 4.8, label: "4.8+ Stars" },
]

export function HolographicSidebar({ filters, onFilterChange, onClearFilters, productCount }: HolographicSidebarProps) {
  const activeFilterCount = Object.values(filters).filter(
    (value) => value !== "" && value !== "all" && value !== 0 && value !== false,
  ).length

  return (
    <Sidebar className="border-r border-purple-500/20 bg-gradient-to-b from-slate-900/95 to-purple-900/95 backdrop-blur-xl">
      <SidebarHeader className="border-b border-purple-500/20 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-purple-400" />
            <h2 className="font-semibold text-white">Filters</h2>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </div>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-6 w-6 p-0 text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="text-sm text-gray-400 mt-2">{productCount} products found</div>
      </SidebarHeader>

      <SidebarContent className="p-4 space-y-6">
        {/* Search */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-300 mb-3">Search</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => onFilterChange("search", e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="bg-purple-500/20" />

        {/* Categories */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-300 mb-3">Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.id}>
                  <SidebarMenuButton
                    onClick={() => onFilterChange("category", category.id)}
                    className={cn(
                      "w-full justify-between text-left",
                      filters.category === category.id
                        ? "bg-purple-600/20 text-purple-300"
                        : "text-gray-300 hover:text-white hover:bg-white/5",
                    )}
                  >
                    <span>{category.name}</span>
                    <Badge variant="secondary" className="bg-white/10 text-gray-300 text-xs">
                      {category.count}
                    </Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="bg-purple-500/20" />

        {/* Price Range */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-300 mb-3">Price Range</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {priceRanges.map((range) => (
                <SidebarMenuItem key={range.id}>
                  <SidebarMenuButton
                    onClick={() => onFilterChange("priceRange", range.id)}
                    className={cn(
                      "w-full text-left",
                      filters.priceRange === range.id
                        ? "bg-purple-600/20 text-purple-300"
                        : "text-gray-300 hover:text-white hover:bg-white/5",
                    )}
                  >
                    {range.name}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="bg-purple-500/20" />

        {/* Rating */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-300 mb-3">Minimum Rating</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ratingOptions.map((option) => (
                <SidebarMenuItem key={option.value}>
                  <SidebarMenuButton
                    onClick={() => onFilterChange("minRating", option.value)}
                    className={cn(
                      "w-full text-left",
                      filters.minRating === option.value
                        ? "bg-purple-600/20 text-purple-300"
                        : "text-gray-300 hover:text-white hover:bg-white/5",
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4" />
                      <span>{option.label}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="bg-purple-500/20" />

        {/* Special Features */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-300 mb-3">Special Features</SidebarGroupLabel>
          <SidebarGroupContent className="space-y-3">
            <Label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.holographicOnly}
                onChange={(e) => onFilterChange("holographicOnly", e.target.checked)}
                className="rounded border-gray-600 bg-white/5 text-purple-600 focus:ring-purple-500"
              />
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-purple-400" />
                <span className="text-gray-300">Holographic Only</span>
              </div>
            </Label>

            <Label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.has360ViewOnly}
                onChange={(e) => onFilterChange("has360ViewOnly", e.target.checked)}
                className="rounded border-gray-600 bg-white/5 text-purple-600 focus:ring-purple-500"
              />
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">360° View Available</span>
              </div>
            </Label>

            <Label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) => onFilterChange("inStockOnly", e.target.checked)}
                className="rounded border-gray-600 bg-white/5 text-purple-600 focus:ring-purple-500"
              />
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-green-400" />
                <span className="text-gray-300">In Stock Only</span>
              </div>
            </Label>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
