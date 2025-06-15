"use client"

import { useEffect } from "react"
import { PaginatedProductGrid } from "@/components/ecommerex/paginated-product-grid"
import { HolographicHeader } from "@/components/ecommerex/holographic-header"
import { useGamification } from "@/contexts/gamification-context"

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
  {
    id: "7",
    name: "USB-C Hub",
    description: "Multi-port USB-C hub with power delivery",
    price: 49.99,
    image: "/usb-hub.png",
    category: "Accessories",
    rating: 4.2,
    stock: 65,
    platforms: ["amazon", "ebay"],
  },
  {
    id: "8",
    name: "Noise-Cancelling Headphones",
    description: "Premium over-ear headphones with adaptive noise cancellation",
    price: 199.99,
    image: "/placeholder-m4lol.png",
    category: "Audio",
    rating: 4.9,
    stock: 22,
    platforms: ["amazon", "walmart"],
  },
  {
    id: "9",
    name: "Portable SSD Drive",
    description: "Ultra-fast 1TB portable SSD with USB-C connection",
    price: 159.99,
    image: "/placeholder-m4lol.png",
    category: "Storage",
    rating: 4.7,
    stock: 31,
    platforms: ["amazon", "ebay", "walmart"],
  },
  {
    id: "10",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi devices",
    price: 39.99,
    image: "/placeholder-m4lol.png",
    category: "Accessories",
    rating: 4.5,
    stock: 48,
    platforms: ["amazon", "walmart"],
  },
  {
    id: "11",
    name: "Smart Home Hub",
    description: "Central hub for controlling all your smart home devices",
    price: 129.99,
    image: "/placeholder-m4lol.png",
    category: "Smart Home",
    rating: 4.6,
    stock: 19,
    platforms: ["amazon", "ebay"],
  },
  {
    id: "12",
    name: "Gaming Controller",
    description: "Professional gaming controller with customizable buttons",
    price: 69.99,
    image: "/placeholder-m4lol.png",
    category: "Gaming",
    rating: 4.4,
    stock: 42,
    platforms: ["amazon", "walmart"],
  },
]

export function HolographicProductsDashboard() {
  const { updateAchievementProgress } = useGamification()

  useEffect(() => {
    // Update achievement progress for visiting the products page
    updateAchievementProgress("product-explorer", 1)
  }, [updateAchievementProgress])

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
