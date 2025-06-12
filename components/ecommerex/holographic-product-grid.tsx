"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Plus, Search } from "lucide-react"
import { HolographicProductCard } from "./holographic-product-card"

// Sample product data
const productData = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    sku: "WEP-001",
    price: 129.99,
    inventory: 145,
    category: "Electronics",
    status: "active",
    description:
      "Next-generation wireless earbuds with active noise cancellation and spatial audio. Features 24-hour battery life and water resistance.",
    platforms: {
      amazon: true,
      ebay: true,
      shopify: true,
      etsy: false,
      walmart: true,
      website: true,
    },
    image: "/wireless-earbuds.png",
    quantumEnhanced: true,
    salesVelocity: 8.2,
    trending: true,
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    sku: "SWX-002",
    price: 249.99,
    inventory: 78,
    category: "Electronics",
    status: "active",
    description:
      "Advanced smartwatch with health monitoring, GPS, and cellular connectivity. Includes ECG, blood oxygen, and sleep tracking features.",
    platforms: {
      amazon: true,
      ebay: true,
      shopify: true,
      etsy: false,
      walmart: true,
      website: true,
    },
    image: "/smartwatch-lifestyle.png",
    quantumEnhanced: true,
    salesVelocity: 5.7,
  },
  {
    id: 3,
    name: "Ultra HD Webcam",
    sku: "UHW-003",
    price: 89.99,
    inventory: 92,
    category: "Electronics",
    status: "active",
    description:
      "4K Ultra HD webcam with auto-focus, light correction, and dual noise-canceling microphones. Perfect for streaming and video conferencing.",
    platforms: {
      amazon: true,
      ebay: true,
      shopify: true,
      etsy: false,
      walmart: false,
      website: true,
    },
    image: "/classic-webcam.png",
    quantumEnhanced: false,
    salesVelocity: 3.4,
  },
  {
    id: 4,
    name: "Ergonomic Keyboard",
    sku: "EKB-004",
    price: 119.99,
    inventory: 64,
    category: "Computer Accessories",
    status: "active",
    description:
      "Mechanical keyboard with ergonomic design, customizable RGB lighting, and programmable keys. Features quiet switches and wrist rest.",
    platforms: {
      amazon: true,
      ebay: true,
      shopify: true,
      etsy: false,
      walmart: false,
      website: true,
    },
    image: "/mechanical-keyboard.png",
    quantumEnhanced: false,
    salesVelocity: 2.8,
  },
  {
    id: 5,
    name: "Portable SSD 1TB",
    sku: "SSD-005",
    price: 159.99,
    inventory: 38,
    category: "Storage",
    status: "active",
    description:
      "Ultra-fast portable SSD with 1TB capacity. Features USB-C connectivity, shock resistance, and hardware encryption for data security.",
    platforms: {
      amazon: true,
      ebay: true,
      shopify: true,
      etsy: false,
      walmart: true,
      website: true,
    },
    image: "/placeholder-m4lol.png",
    quantumEnhanced: true,
    salesVelocity: 4.1,
  },
  {
    id: 6,
    name: "Gaming Mouse RGB",
    sku: "GMR-006",
    price: 69.99,
    inventory: 120,
    category: "Computer Accessories",
    status: "active",
    description:
      "High-performance gaming mouse with 16,000 DPI optical sensor, customizable RGB lighting, and 8 programmable buttons. Ergonomic design for extended gaming sessions.",
    platforms: {
      amazon: true,
      ebay: true,
      shopify: true,
      etsy: false,
      walmart: false,
      website: true,
    },
    image: "/gaming-mouse.png",
    quantumEnhanced: false,
    salesVelocity: 6.3,
    trending: true,
  },
  {
    id: 7,
    name: "Bluetooth Speaker Mini",
    sku: "BSM-007",
    price: 49.99,
    inventory: 95,
    category: "Audio",
    status: "draft",
    description:
      "Compact Bluetooth speaker with surprisingly powerful sound. Features 12-hour battery life, water resistance, and built-in microphone for calls.",
    platforms: {
      amazon: false,
      ebay: false,
      shopify: false,
      etsy: false,
      walmart: false,
      website: false,
    },
    image: "/bluetooth-speaker.png",
    quantumEnhanced: false,
    salesVelocity: 0,
  },
  {
    id: 8,
    name: "USB-C Hub Multiport",
    sku: "UCH-008",
    price: 39.99,
    inventory: 82,
    category: "Computer Accessories",
    status: "active",
    description:
      "7-in-1 USB-C hub with HDMI, USB 3.0, SD/microSD card readers, and power delivery. Compatible with laptops, tablets, and smartphones.",
    platforms: {
      amazon: true,
      ebay: true,
      shopify: true,
      etsy: false,
      walmart: true,
      website: true,
    },
    image: "/usb-hub.png",
    quantumEnhanced: true,
    salesVelocity: 7.5,
  },
]

export function HolographicProductGrid() {
  const [products, setProducts] = useState(productData)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Toggle platform availability for a product
  const handleTogglePlatform = (productId: number, platform: string) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            platforms: {
              ...product.platforms,
              [platform]: !product.platforms[platform as keyof typeof product.platforms],
            },
          }
        }
        return product
      }),
    )
  }

  // Filter products based on search query and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesStatus = statusFilter === "all" || product.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Get unique categories for filter
  const categories = ["all", ...new Set(products.map((product) => product.category))]

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-lg border border-indigo-500/20 bg-indigo-950/30 p-4 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
          {/* Search */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-indigo-300/70" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-indigo-500/20 bg-indigo-950/30 pl-8 text-indigo-200 placeholder:text-indigo-300/50 focus:border-indigo-500/50 focus:ring-indigo-500/20"
            />
          </div>

          {/* Category filter */}
          <div className="w-full md:w-40">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="border-indigo-500/20 bg-indigo-950/90 text-indigo-200 backdrop-blur-md">
                <SelectItem value="all">All Categories</SelectItem>
                {categories
                  .filter((cat) => cat !== "all")
                  .map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status filter */}
          <div className="w-full md:w-40">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="border-indigo-500/20 bg-indigo-950/90 text-indigo-200 backdrop-blur-md">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200 md:ml-2"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Product grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <HolographicProductCard key={product.id} product={product} onTogglePlatform={handleTogglePlatform} />
        ))}
      </div>

      {/* Empty state */}
      {filteredProducts.length === 0 && (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-950/30 p-6 text-center backdrop-blur-sm">
          <p className="text-indigo-300">No products match your filters</p>
          <Button
            variant="link"
            className="mt-2 text-indigo-400"
            onClick={() => {
              setSearchQuery("")
              setCategoryFilter("all")
              setStatusFilter("all")
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-indigo-300">
            Showing <span className="font-medium text-indigo-200">{filteredProducts.length}</span> of{" "}
            <span className="font-medium text-indigo-200">{products.length}</span> products
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled
              className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200 disabled:bg-indigo-950/10 disabled:text-indigo-300/50"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
