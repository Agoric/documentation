"use client"

import { PaginatedProductGrid } from "@/components/ecommerex/paginated-product-grid"
import { HolographicHeader } from "@/components/ecommerex/holographic-header"
import { ProductComparisonProvider } from "@/contexts/product-comparison-context"

// Enhanced sample product data with real images
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
  {
    id: "7",
    name: "USB-C Hub Multi-Port",
    description: "Versatile USB-C hub with multiple ports, HDMI output, and fast charging capabilities",
    price: 49.99,
    image: "/products/usb-c-hub.png",
    category: "Accessories",
    rating: 4.2,
    stock: 65,
    platforms: ["amazon", "ebay"],
    isHolographic: false,
    has360View: false,
  },
  {
    id: "8",
    name: "HoloSound Noise-Cancelling Headphones",
    description: "Premium over-ear headphones with holographic sound processing and adaptive noise cancellation",
    price: 299.99,
    image: "/products/noise-cancelling-headphones.png",
    category: "Audio",
    rating: 4.9,
    stock: 22,
    platforms: ["amazon", "walmart"],
    isHolographic: true,
    has360View: true,
    holographicFeatures: ["Holographic Sound", "Adaptive ANC", "3D Audio", "Neural Comfort"],
  },
  {
    id: "9",
    name: "Quantum Portable SSD Drive",
    description: "Ultra-fast 1TB portable SSD with quantum encryption and USB-C connectivity",
    price: 199.99,
    image: "/products/portable-ssd.png",
    category: "Storage",
    rating: 4.7,
    stock: 31,
    platforms: ["amazon", "ebay", "walmart"],
    isHolographic: true,
    has360View: true,
    holographicFeatures: ["Quantum Encryption", "Holographic Interface", "Ultra-Fast Transfer", "Secure Access"],
  },
  {
    id: "10",
    name: "Wireless Charging Pad Pro",
    description: "Fast wireless charging pad compatible with all Qi devices, featuring smart temperature control",
    price: 39.99,
    image: "/products/wireless-charging-pad.png",
    category: "Accessories",
    rating: 4.5,
    stock: 48,
    platforms: ["amazon", "walmart"],
    isHolographic: false,
    has360View: false,
  },
  {
    id: "11",
    name: "HoloHome Smart Hub",
    description: "Revolutionary smart home hub with holographic interface for controlling all your connected devices",
    price: 199.99,
    image: "/products/smart-home-hub.png",
    category: "Smart Home",
    rating: 4.8,
    stock: 19,
    platforms: ["amazon", "ebay"],
    isHolographic: true,
    has360View: true,
    holographicFeatures: ["Holographic Interface", "Voice Control", "AI Assistant", "Device Sync"],
  },
  {
    id: "12",
    name: "Pro Gaming Controller",
    description: "Professional gaming controller with customizable buttons, haptic feedback, and wireless connectivity",
    price: 89.99,
    image: "/products/gaming-controller.png",
    category: "Gaming",
    rating: 4.4,
    stock: 42,
    platforms: ["amazon", "walmart"],
    isHolographic: false,
    has360View: true,
  },
]

export function HolographicProductsDashboard() {
  return (
    <ProductComparisonProvider>
      <div className="container mx-auto p-4 space-y-8">
        <HolographicHeader
          title="EcommereX Shop"
          subtitle="Browse our cutting-edge product catalog featuring revolutionary holographic technology and interactive 360° views"
        />

        <PaginatedProductGrid products={products} itemsPerPage={6} />
      </div>
    </ProductComparisonProvider>
  )
}

// keep the existing named export
export default HolographicProductsDashboard
