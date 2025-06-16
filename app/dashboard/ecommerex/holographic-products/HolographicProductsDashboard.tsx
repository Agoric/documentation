"use client"

import { useState } from "react"
import { PaginatedProductGrid } from "@/components/ecommerex/paginated-product-grid"
import { HolographicHeader } from "@/components/ecommerex/holographic-header"
import { HolographicSidebar, type ProductFilters } from "@/components/ecommerex/holographic-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

// Enhanced sample product data with 360° view capabilities
const products = [
  {
    id: "1",
    name: "Quantum Wireless Earbuds Pro",
    description: "Revolutionary holographic audio experience with quantum sound processing and 3D spatial audio",
    price: 299.99,
    image: "/products/quantum-earbuds.png",
    category: "Audio",
    rating: 4.9,
    stock: 45,
    platforms: ["amazon", "ebay", "walmart"],
    isHolographic: true,
    has360View: true,
    images360: [
      "/products/360/earbuds-001.png",
      "/products/360/earbuds-002.png",
      "/products/360/earbuds-003.png",
      "/products/360/earbuds-004.png",
      "/products/360/earbuds-005.png",
      "/products/360/earbuds-006.png",
      "/products/360/earbuds-007.png",
      "/products/360/earbuds-008.png",
    ],
    holographicFeatures: [
      "3D Audio Projection",
      "Quantum Noise Cancellation",
      "Holographic Controls",
      "Neural Interface",
    ],
  },
  {
    id: "2",
    name: "SmartWatch X Pro",
    description: "Advanced smartwatch with health monitoring, fitness tracking, and smart notifications",
    price: 249.99,
    image: "/products/smartwatch-x.png",
    category: "Wearables",
    rating: 4.6,
    stock: 28,
    platforms: ["amazon", "walmart"],
    isHolographic: false,
    has360View: true,
    images360: [
      "/products/360/watch-001.png",
      "/products/360/watch-002.png",
      "/products/360/watch-003.png",
      "/products/360/watch-004.png",
      "/products/360/watch-005.png",
      "/products/360/watch-006.png",
      "/products/360/watch-007.png",
      "/products/360/watch-008.png",
    ],
  },
  {
    id: "3",
    name: "HoloVision 4K Webcam",
    description: "Ultra HD webcam with holographic projection capabilities and AI-powered background effects",
    price: 189.99,
    image: "/products/holovision-webcam.png",
    category: "Cameras",
    rating: 4.8,
    stock: 32,
    platforms: ["amazon", "ebay"],
    isHolographic: true,
    has360View: true,
    images360: [
      "/products/360/webcam-001.png",
      "/products/360/webcam-002.png",
      "/products/360/webcam-003.png",
      "/products/360/webcam-004.png",
      "/products/360/webcam-005.png",
      "/products/360/webcam-006.png",
      "/products/360/webcam-007.png",
      "/products/360/webcam-008.png",
    ],
    holographicFeatures: ["Holographic Projection", "4K Ultra HD", "AI Background", "Gesture Control"],
  },
  {
    id: "4",
    name: "Mechanical Gaming Keyboard RGB",
    description: "Premium RGB mechanical keyboard with customizable switches and programmable macros",
    price: 149.99,
    image: "/products/mechanical-keyboard.png",
    category: "Peripherals",
    rating: 4.7,
    stock: 18,
    platforms: ["amazon", "ebay", "walmart"],
    isHolographic: false,
    has360View: false,
  },
  {
    id: "5",
    name: "HoloGaming Mouse Pro",
    description: "Revolutionary holographic gaming mouse with neural interface and quantum precision tracking",
    price: 159.99,
    image: "/products/holo-gaming-mouse.png",
    category: "Peripherals",
    rating: 4.9,
    stock: 37,
    platforms: ["amazon", "walmart"],
    isHolographic: true,
    has360View: true,
    images360: [
      "/products/360/mouse-001.png",
      "/products/360/mouse-002.png",
      "/products/360/mouse-003.png",
      "/products/360/mouse-004.png",
      "/products/360/mouse-005.png",
      "/products/360/mouse-006.png",
      "/products/360/mouse-007.png",
      "/products/360/mouse-008.png",
    ],
    holographicFeatures: ["Neural Control", "Holographic Display", "Quantum Precision", "Adaptive Grip"],
  },
  {
    id: "6",
    name: "Portable Bluetooth Speaker",
    description: "High-quality portable bluetooth speaker with 24-hour battery life and waterproof design",
    price: 59.99,
    image: "/products/bluetooth-speaker.png",
    category: "Audio",
    rating: 4.3,
    stock: 52,
    platforms: ["amazon", "ebay", "walmart"],
    isHolographic: false,
    has360View: false,
  },
]

export function HolographicProductsDashboard() {
  const [filters, setFilters] = useState<ProductFilters>({
    search: "",
    category: "",
    priceRange: "",
    rating: 0,
    isHolographic: null,
    has360View: null,
    inStock: true,
  })

  const filterProducts = (products: typeof products, filters: ProductFilters) => {
    return products.filter((product) => {
      // Search filter
      if (
        filters.search &&
        !product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !product.description.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false
      }

      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false
      }

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange
          .split("-")
          .map((p) => (p === "+" ? Number.POSITIVE_INFINITY : Number.parseInt(p)))
        if (max && (product.price < min || product.price > max)) {
          return false
        }
        if (!max && product.price < min) {
          return false
        }
      }

      // Rating filter
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false
      }

      // Holographic filter
      if (filters.isHolographic !== null && product.isHolographic !== filters.isHolographic) {
        return false
      }

      // 360 view filter
      if (filters.has360View !== null && product.has360View !== filters.has360View) {
        return false
      }

      // Stock filter
      if (filters.inStock && product.stock === 0) {
        return false
      }

      return true
    })
  }

  const filteredProducts = filterProducts(products, filters)

  return (
    <SidebarProvider>
      <HolographicSidebar onFilterChange={setFilters} activeFilters={filters} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-purple-500/20 px-4 bg-gradient-to-r from-purple-900/10 to-blue-900/10 backdrop-blur-xl">
          <SidebarTrigger className="-ml-1 text-purple-400 hover:text-purple-300" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-purple-500/30" />
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse" />
            <span className="text-sm text-purple-300">{filteredProducts.length} products found</span>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <HolographicHeader
            title="Holographic Products"
            subtitle="Browse our cutting-edge product catalog featuring revolutionary holographic technology and interactive 360° views"
          />

          <PaginatedProductGrid products={filteredProducts} itemsPerPage={6} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
