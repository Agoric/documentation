"use client"

import { PaginatedProductGrid } from "@/components/ecommerex/paginated-product-grid"
import { HolographicHeader } from "@/components/ecommerex/holographic-header"

// Sample product data
const products = [
  {
    id: "1",
    name: "Wireless Earbuds Pro",
    description: "High-quality wireless earbuds with noise cancellation",
    price: 129.99,
    image: "/wireless-earbuds.png",
    category: "Audio",
    rating: 4.8,
    stock: 45,
    platforms: ["amazon", "ebay", "walmart"],
  },
  {
    id: "2",
    name: "SmartWatch X",
    description: "Advanced smartwatch with health monitoring features",
    price: 249.99,
    image: "/smartwatch-lifestyle.png",
    category: "Wearables",
    rating: 4.6,
    stock: 28,
    platforms: ["amazon", "walmart"],
  },
  {
    id: "3",
    name: "4K Webcam",
    description: "Ultra HD webcam for professional video conferencing",
    price: 89.99,
    image: "/classic-webcam.png",
    category: "Cameras",
    rating: 4.5,
    stock: 32,
    platforms: ["amazon", "ebay"],
  },
  {
    id: "4",
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with customizable switches",
    price: 149.99,
    image: "/mechanical-keyboard.png",
    category: "Peripherals",
    rating: 4.7,
    stock: 18,
    platforms: ["amazon", "ebay", "walmart"],
  },
  {
    id: "5",
    name: "Wireless Gaming Mouse",
    description: "High-precision wireless gaming mouse with programmable buttons",
    price: 79.99,
    image: "/gaming-mouse.png",
    category: "Peripherals",
    rating: 4.4,
    stock: 37,
    platforms: ["amazon", "walmart"],
  },
  {
    id: "6",
    name: "Bluetooth Speaker",
    description: "Portable bluetooth speaker with 24-hour battery life",
    price: 59.99,
    image: "/bluetooth-speaker.png",
    category: "Audio",
    rating: 4.3,
    stock: 52,
    platforms: ["amazon", "ebay", "walmart"],
  },
]

export function HolographicProductsDashboard() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <HolographicHeader
        title="Holographic Products"
        subtitle="Browse our cutting-edge product catalog with advanced filtering and pagination"
      />

      <PaginatedProductGrid products={products} itemsPerPage={6} />
    </div>
  )
}
