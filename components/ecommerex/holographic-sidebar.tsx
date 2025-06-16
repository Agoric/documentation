"use client"

import * as React from "react"
import { Search, Filter, Star, Package, Zap, Camera, Headphones, Mouse } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface HolographicSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onFilterChange?: (filters: ProductFilters) => void
  activeFilters?: ProductFilters
}

export interface ProductFilters {
  search: string
  category: string
  priceRange: string
  rating: number
  isHolographic: boolean | null
  has360View: boolean | null
  inStock: boolean
}

const categories = [
  { name: "All Categories", value: "", icon: Package, count: 6 },
  { name: "Audio", value: "Audio", icon: Headphones, count: 2 },
  { name: "Wearables", value: "Wearables", icon: Star, count: 1 },
  { name: "Cameras", value: "Cameras", icon: Camera, count: 1 },
  { name: "Peripherals", value: "Peripherals", icon: Mouse, count: 2 },
]

const priceRanges = [
  { name: "All Prices", value: "" },
  { name: "Under $100", value: "0-100" },
  { name: "$100 - $200", value: "100-200" },
  { name: "$200 - $300", value: "200-300" },
  { name: "Over $300", value: "300+" },
]

const ratingOptions = [
  { name: "All Ratings", value: 0 },
  { name: "4+ Stars", value: 4 },
  { name: "4.5+ Stars", value: 4.5 },
  { name: "4.8+ Stars", value: 4.8 },
]

export function HolographicSidebar({ onFilterChange, activeFilters, ...props }: HolographicSidebarProps) {
  const [filters, setFilters] = React.useState<ProductFilters>({
    search: "",
    category: "",
    priceRange: "",
    rating: 0,
    isHolographic: null,
    has360View: null,
    inStock: true,
    ...activeFilters,
  })

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFilterChange?.(updatedFilters)
  }

  const clearFilters = () => {
    const clearedFilters: ProductFilters = {
      search: "",
      category: "",
      priceRange: "",
      rating: 0,
      isHolographic: null,
      has360View: null,
      inStock: true,
    }
    setFilters(clearedFilters)
    onFilterChange?.(clearedFilters)
  }

  return (
    <Sidebar
      {...props}
      className="border-r border-purple-500/20 bg-gradient-to-b from-purple-900/10 to-blue-900/10 backdrop-blur-xl"
    >
      <SidebarHeader className="border-b border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
        <div className="flex items-center gap-2 p-4">
          <div className="relative">
            <Filter className="h-5 w-5 text-purple-400" />
            <div className="absolute inset-0 h-5 w-5 animate-pulse bg-purple-400/20 rounded-full blur-sm" />
          </div>
          <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Product Filters
          </h2>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4 space-y-6">
        {/* Search */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-300 mb-3">Search Products</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
              <SidebarInput
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => updateFilters({ search: e.target.value })}
                className="pl-10 bg-purple-900/20 border-purple-500/30 text-white placeholder:text-purple-300/60 focus:border-purple-400 focus:ring-purple-400/20"
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Categories */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-300 mb-3">Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.value}>
                  <SidebarMenuButton
                    onClick={() => updateFilters({ category: category.value })}
                    isActive={filters.category === category.value}
                    className="w-full justify-between hover:bg-purple-500/20 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-500/30 data-[active=true]:to-blue-500/30 data-[active=true]:text-white"
                  >
                    <div className="flex items-center gap-2">
                      <category.icon className="h-4 w-4" />
                      <span>{category.name}</span>
                    </div>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                      {category.count}
                    </Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Price Range */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-300 mb-3">Price Range</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {priceRanges.map((range) => (
                <SidebarMenuItem key={range.value}>
                  <SidebarMenuButton
                    onClick={() => updateFilters({ priceRange: range.value })}
                    isActive={filters.priceRange === range.value}
                    className="hover:bg-purple-500/20 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-500/30 data-[active=true]:to-blue-500/30 data-[active=true]:text-white"
                  >
                    {range.name}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Rating */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-300 mb-3">Minimum Rating</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ratingOptions.map((rating) => (
                <SidebarMenuItem key={rating.value}>
                  <SidebarMenuButton
                    onClick={() => updateFilters({ rating: rating.value })}
                    isActive={filters.rating === rating.value}
                    className="hover:bg-purple-500/20 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-500/30 data-[active=true]:to-blue-500/30 data-[active=true]:text-white"
                  >
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>{rating.name}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Special Features */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-300 mb-3">Special Features</SidebarGroupLabel>
          <SidebarGroupContent className="space-y-3">
            <Button
              variant={filters.isHolographic === true ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilters({ isHolographic: filters.isHolographic === true ? null : true })}
              className={`w-full justify-start ${
                filters.isHolographic === true
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  : "border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
              }`}
            >
              <Zap className="h-4 w-4 mr-2" />
              Holographic Only
            </Button>

            <Button
              variant={filters.has360View === true ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilters({ has360View: filters.has360View === true ? null : true })}
              className={`w-full justify-start ${
                filters.has360View === true
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  : "border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
              }`}
            >
              <Camera className="h-4 w-4 mr-2" />
              360° View Available
            </Button>

            <Button
              variant={filters.inStock ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilters({ inStock: !filters.inStock })}
              className={`w-full justify-start ${
                filters.inStock
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  : "border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
              }`}
            >
              <Package className="h-4 w-4 mr-2" />
              In Stock Only
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Clear Filters */}
        <SidebarGroup>
          <SidebarGroupContent>
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="w-full border-red-500/30 text-red-300 hover:bg-red-500/20 hover:border-red-400"
            >
              Clear All Filters
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
