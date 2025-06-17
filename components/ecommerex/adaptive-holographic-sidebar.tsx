"use client"
import { Search, Filter, X, Star, Eye, Zap, Package, ChevronLeft, ChevronRight } from "lucide-react"
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
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useSpatialLayout } from "@/hooks/use-spatial-layout"

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

const categories = [
  { id: "all", name: "All Categories", count: 156, romanName: "OMNIA" },
  { id: "Audio", name: "Audio", count: 24, romanName: "SONUS" },
  { id: "Wearables", name: "Wearables", count: 18, romanName: "VESTIS" },
  { id: "Cameras", name: "Cameras", count: 12, romanName: "IMAGO" },
  { id: "Peripherals", name: "Peripherals", count: 32, romanName: "AUXILIUM" },
]

const priceRanges = [
  { id: "all", name: "All Prices", romanName: "OMNIS PRETIUM" },
  { id: "under-100", name: "Under $100", romanName: "< C DENARII" },
  { id: "100-200", name: "$100 - $200", romanName: "C-CC DENARII" },
  { id: "200-500", name: "$200 - $500", romanName: "CC-D DENARII" },
  { id: "500-1000", name: "$500 - $1,000", romanName: "D-M DENARII" },
  { id: "over-1000", name: "Over $1,000", romanName: "> M DENARII" },
]

const ratingOptions = [
  { value: 0, label: "All Ratings", romanLabel: "OMNIS GRADUS" },
  { value: 4, label: "4+ Stars", romanLabel: "IV+ STELLAE" },
  { value: 4.5, label: "4.5+ Stars", romanLabel: "IV.V+ STELLAE" },
  { value: 4.8, label: "4.8+ Stars", romanLabel: "IV.VIII+ STELLAE" },
]

export function AdaptiveHolographicSidebar({
  filters,
  onFilterChange,
  onClearFilters,
  productCount,
}: AdaptiveHolographicSidebarProps) {
  const { dimensions, layout, actions } = useSpatialLayout()

  const activeFilterCount = Object.values(filters).filter(
    (value) => value !== "" && value !== "all" && value !== 0 && value !== false,
  ).length

  return (
    <motion.div
      className="relative"
      animate={{
        width: layout.sidebarCollapsed ? 64 : layout.sidebarWidth,
        opacity: layout.sidebarCollapsed ? 0.9 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Sidebar
        className="border-r border-amber-400/20 bg-gradient-to-b from-purple-950/95 to-indigo-950/95 backdrop-blur-xl"
        style={{ width: layout.sidebarCollapsed ? 64 : layout.sidebarWidth }}
      >
        <SidebarHeader className="border-b border-amber-400/20 p-4">
          <div className="flex items-center justify-between">
            <AnimatePresence>
              {!layout.sidebarCollapsed && (
                <motion.div
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Filter className="h-5 w-5 text-amber-400" />
                  <h2 className="font-semibold text-amber-300 font-serif">FILTRUM NFT</h2>
                  {activeFilterCount > 0 && (
                    <Badge className="bg-gradient-to-r from-amber-600 to-purple-600 text-white text-xs border-0">
                      {activeFilterCount}
                    </Badge>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapse Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={actions.toggleSidebar}
              className="h-6 w-6 p-0 text-amber-400/80 hover:text-amber-300 hover:bg-amber-500/20"
            >
              {layout.sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>

            {activeFilterCount > 0 && !layout.sidebarCollapsed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="h-6 w-6 p-0 text-amber-400/60 hover:text-amber-300"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <AnimatePresence>
            {!layout.sidebarCollapsed && (
              <motion.div
                className="text-sm text-amber-300/80 mt-2 font-medium"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                {productCount} Collections Found
              </motion.div>
            )}
          </AnimatePresence>
        </SidebarHeader>

        <SidebarContent className={cn("space-y-4", layout.sidebarCollapsed ? "p-2" : "p-4")}>
          {/* Collapsed State - Icon Only */}
          {layout.sidebarCollapsed && (
            <div className="flex flex-col items-center space-y-4">
              <SupremeAuthorityCoin variant="badge" size="sm" />
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
              <Search className="w-5 h-5 text-amber-400/60" />
              <Filter className="w-5 h-5 text-amber-400/60" />
              <Star className="w-5 h-5 text-amber-400/60" />
              <Eye className="w-5 h-5 text-amber-400/60" />
              <Zap className="w-5 h-5 text-amber-400/60" />
              <Package className="w-5 h-5 text-amber-400/60" />
            </div>
          )}

          {/* Expanded State - Full Interface */}
          <AnimatePresence>
            {!layout.sidebarCollapsed && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, staggerChildren: 0.1 }}
              >
                {/* Search */}
                <SidebarGroup>
                  <SidebarGroupLabel className="text-amber-300 mb-3 font-serif">QUAERERE</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-400/60" />
                      <Input
                        placeholder="Search NFT collections..."
                        value={filters.search}
                        onChange={(e) => onFilterChange("search", e.target.value)}
                        className="pl-10 bg-purple-900/20 border-amber-400/20 text-amber-100 placeholder:text-amber-400/50 focus:border-amber-400/60"
                      />
                    </div>
                  </SidebarGroupContent>
                </SidebarGroup>

                <Separator className="bg-amber-400/20" />

                {/* Categories */}
                <SidebarGroup>
                  <SidebarGroupLabel className="text-amber-300 mb-3 font-serif">CATEGORIAE</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {categories.map((category) => (
                        <SidebarMenuItem key={category.id}>
                          <SidebarMenuButton
                            onClick={() => onFilterChange("category", category.id)}
                            className={cn(
                              "w-full justify-between text-left transition-all duration-300",
                              filters.category === category.id
                                ? "bg-gradient-to-r from-amber-400/20 to-purple-500/20 text-amber-300 border border-amber-400/30"
                                : "text-amber-200/70 hover:text-amber-300 hover:bg-amber-500/10",
                            )}
                          >
                            <span className="font-medium">
                              {layout.cardSize === "sm" ? category.romanName : category.name}
                            </span>
                            <Badge className="bg-amber-400/20 text-amber-300 text-xs border-0">{category.count}</Badge>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <Separator className="bg-amber-400/20" />

                {/* Price Range */}
                <SidebarGroup>
                  <SidebarGroupLabel className="text-amber-300 mb-3 font-serif">PRETIUM</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {priceRanges.map((range) => (
                        <SidebarMenuItem key={range.id}>
                          <SidebarMenuButton
                            onClick={() => onFilterChange("priceRange", range.id)}
                            className={cn(
                              "w-full text-left transition-all duration-300",
                              filters.priceRange === range.id
                                ? "bg-gradient-to-r from-amber-400/20 to-purple-500/20 text-amber-300 border border-amber-400/30"
                                : "text-amber-200/70 hover:text-amber-300 hover:bg-amber-500/10",
                            )}
                          >
                            {layout.cardSize === "sm" ? range.romanName : range.name}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <Separator className="bg-amber-400/20" />

                {/* Rating */}
                <SidebarGroup>
                  <SidebarGroupLabel className="text-amber-300 mb-3 font-serif">GRADUS</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {ratingOptions.map((option) => (
                        <SidebarMenuItem key={option.value}>
                          <SidebarMenuButton
                            onClick={() => onFilterChange("minRating", option.value)}
                            className={cn(
                              "w-full text-left transition-all duration-300",
                              filters.minRating === option.value
                                ? "bg-gradient-to-r from-amber-400/20 to-purple-500/20 text-amber-300 border border-amber-400/30"
                                : "text-amber-200/70 hover:text-amber-300 hover:bg-amber-500/10",
                            )}
                          >
                            <div className="flex items-center space-x-2">
                              <Star className="h-4 w-4" />
                              <span>{layout.cardSize === "sm" ? option.romanLabel : option.label}</span>
                            </div>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <Separator className="bg-amber-400/20" />

                {/* Special Features */}
                <SidebarGroup>
                  <SidebarGroupLabel className="text-amber-300 mb-3 font-serif">PROPRIETATES NFT</SidebarGroupLabel>
                  <SidebarGroupContent className="space-y-3">
                    <Label className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.holographicOnly}
                        onChange={(e) => onFilterChange("holographicOnly", e.target.checked)}
                        className="rounded border-amber-400/40 bg-purple-900/20 text-amber-600 focus:ring-amber-500/50"
                      />
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-amber-400" />
                        <span className="text-amber-200/80 group-hover:text-amber-300 transition-colors">
                          Interactive NFTs
                        </span>
                      </div>
                    </Label>

                    <Label className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.has360ViewOnly}
                        onChange={(e) => onFilterChange("has360ViewOnly", e.target.checked)}
                        className="rounded border-amber-400/40 bg-purple-900/20 text-amber-600 focus:ring-amber-500/50"
                      />
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-cyan-400" />
                        <span className="text-amber-200/80 group-hover:text-amber-300 transition-colors">
                          3D Preview Available
                        </span>
                      </div>
                    </Label>

                    <Label className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.inStockOnly}
                        onChange={(e) => onFilterChange("inStockOnly", e.target.checked)}
                        className="rounded border-amber-400/40 bg-purple-900/20 text-amber-600 focus:ring-amber-500/50"
                      />
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-green-400" />
                        <span className="text-amber-200/80 group-hover:text-amber-300 transition-colors">
                          Available to Mint
                        </span>
                      </div>
                    </Label>
                  </SidebarGroupContent>
                </SidebarGroup>

                {/* Imperial Seal */}
                <div className="flex justify-center pt-4">
                  <SupremeAuthorityCoin variant="seal" size="md" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </SidebarContent>

        {/* Resize Handle */}
        {!layout.sidebarCollapsed && (
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-1 bg-amber-400/20 hover:bg-amber-400/40 cursor-col-resize group"
            whileHover={{ width: 4 }}
            onMouseDown={(e) => {
              const startX = e.clientX
              const startWidth = layout.sidebarWidth

              const handleMouseMove = (e: MouseEvent) => {
                const newWidth = startWidth + (e.clientX - startX)
                actions.setSidebarWidth(newWidth)
              }

              const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove)
                document.removeEventListener("mouseup", handleMouseUp)
              }

              document.addEventListener("mousemove", handleMouseMove)
              document.addEventListener("mouseup", handleMouseUp)
            }}
          >
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-amber-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        )}
      </Sidebar>
    </motion.div>
  )
}
