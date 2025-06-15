"use client"

import { PaginatedProductGrid } from "@/components/ecommerex/paginated-product-grid"
import { HolographicHeader } from "@/components/ecommerex/holographic-header"

// Enhanced sample product data with holographic products
const products = [
  {
    id: "1",
    name: "Quantum Wireless Earbuds Pro",
    description: "Revolutionary holographic audio experience with quantum sound processing",
    price: 299.99,
    image: "/wireless-earbuds.png",
    category: "Audio",
    rating: 4.9,
    stock: 45,
    platforms: ["amazon", "ebay", "walmart"],
    isHolographic: true,
    holographicFeatures: [
      "3D Audio Projection",
      "Quantum Noise Cancellation",
      "Holographic Controls",
      "Neural Interface",
    ],
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
    isHolographic: false,
  },
  {
    id: "3",
    name: "HoloVision 4K Webcam",
    description: "Ultra HD webcam with holographic projection capabilities",
    price: 189.99,
    image: "/classic-webcam.png",
    category: "Cameras",
    rating: 4.8,
    stock: 32,
    platforms: ["amazon", "ebay"],
    isHolographic: true,
    holographicFeatures: ["Holographic Projection", "4K Ultra HD", "AI Background", "Gesture Control"],
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
    isHolographic: false,
  },
  {
    id: "5",
    name: "HoloGaming Mouse Pro",
    description: "Revolutionary holographic gaming mouse with neural interface",
    price: 159.99,
    image: "/gaming-mouse.png",
    category: "Peripherals",
    rating: 4.9,
    stock: 37,
    platforms: ["amazon", "walmart"],
    isHolographic: true,
    holographicFeatures: ["Neural Control", "Holographic Display", "Quantum Precision", "Adaptive Grip"],
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
    isHolographic: false,
  },
]

export function HolographicProductsDashboard() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <HolographicHeader
        title="Holographic Products"
        subtitle="Browse our cutting-edge product catalog featuring revolutionary holographic technology"
      />

      <PaginatedProductGrid products={products} itemsPerPage={6} />
    </div>
  )
}
