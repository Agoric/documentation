"use client"

import { useState, useEffect } from "react"
import { HolographicProductCard } from "./holographic-product-card"
import { Pagination } from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"
import { useGamification } from "@/contexts/gamification-context"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  stock: number
  platforms: string[]
}

interface PaginatedProductGridProps {
  products: Product[]
  itemsPerPage?: number
}

export function PaginatedProductGrid({ products, itemsPerPage = 6 }: PaginatedProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [priceSort, setPriceSort] = useState<string>("none")
  const [showFilters, setShowFilters] = useState(false)

  const { addPoints, updateAchievementProgress } = useGamification()

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filteredProducts])

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products]

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((product) => product.category.toLowerCase() === categoryFilter.toLowerCase())
    }

    // Apply sorting
    if (priceSort === "asc") {
      result.sort((a, b) => a.price - b.price)
    } else if (priceSort === "desc") {
      result.sort((a, b) => b.price - a.price)
    }

    setFilteredProducts(result)

    // Update achievement progress for using filters
    if (searchQuery || categoryFilter !== "all" || priceSort !== "none") {
      updateAchievementProgress("power-shopper", 1)
    }
  }, [searchQuery, categoryFilter, priceSort, products, updateAchievementProgress])

  // Get unique categories
  const categories = ["all", ...new Set(products.map((product) => product.category))]

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Handle product click - award points for engagement
  const handleProductClick = (productId: string) => {
    addPoints(2, "Product viewed")
    updateAchievementProgress("product-explorer", 1)
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-black/30 border-white/10 text-white placeholder:text-white/50"
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="border-white/10 text-white" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? <X className="mr-2 h-4 w-4" /> : <Filter className="mr-2 h-4 w-4" />}
            {showFilters ? "Hide Filters" : "Filters"}
          </Button>
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-lg bg-black/30 border border-white/10 backdrop-blur-sm">
          <div className="space-y-2">
            <label className="text-sm text-white/70">Category</label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-black/30 border-white/10 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/10 text-white">
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="capitalize">
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/70">Price</label>
            <Select value={priceSort} onValueChange={setPriceSort}>
              <SelectTrigger className="bg-black/30 border-white/10 text-white">
                <SelectValue placeholder="Sort by price" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/10 text-white">
                <SelectItem value="none">No Sorting</SelectItem>
                <SelectItem value="asc">Price: Low to High</SelectItem>
                <SelectItem value="desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              variant="outline"
              className="border-white/10 text-white w-full"
              onClick={() => {
                setSearchQuery("")
                setCategoryFilter("all")
                setPriceSort("none")
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {currentProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <HolographicProductCard key={product.id} product={product} onClick={() => handleProductClick(product.id)} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-white/70">
          <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Search className="h-10 w-10 text-white/30" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">No products found</h3>
          <p className="text-center max-w-md">
            We couldn't find any products matching your current filters. Try adjusting your search or filters to see
            more products.
          </p>
          <Button
            variant="outline"
            className="mt-4 border-white/10 text-white"
            onClick={() => {
              setSearchQuery("")
              setCategoryFilter("all")
              setPriceSort("none")
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
          <p className="text-white/70 text-sm">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
          </p>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            variant="holographic"
          />
        </div>
      )}
    </div>
  )
}
