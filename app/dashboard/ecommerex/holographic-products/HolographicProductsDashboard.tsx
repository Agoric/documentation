"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, Plus, RefreshCw, Search, Settings } from "lucide-react"
import { HolographicHeader } from "@/components/ecommerex/holographic-header"
import { HolographicProductCard } from "@/components/ecommerex/holographic-product-card"
import Link from "next/link"

export default function HolographicProductsDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Quantum-Enhanced Wireless Earbuds",
      sku: "QE-WE-001",
      price: 129.99,
      inventory: 298,
      category: "Audio",
      status: "active",
      description:
        "Experience audio like never before with our Quantum-Enhanced Wireless Earbuds. Featuring advanced noise cancellation, 8-hour battery life, and seamless device switching.",
      image: "/wireless-earbuds.png",
      platforms: {
        amazon: true,
        ebay: true,
        shopify: true,
        etsy: false,
        walmart: true,
        website: true,
      },
      quantumEnhanced: true,
      salesVelocity: 8.2,
      trending: true,
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      sku: "SF-W-002",
      price: 199.99,
      inventory: 156,
      category: "Wearables",
      status: "active",
      description:
        "Track your fitness goals with precision using our Smart Fitness Watch. Features heart rate monitoring, sleep tracking, and 7-day battery life.",
      image: "/smartwatch-lifestyle.png",
      platforms: {
        amazon: true,
        ebay: true,
        shopify: true,
        etsy: false,
        walmart: false,
        website: true,
      },
      quantumEnhanced: false,
      salesVelocity: 6.5,
    },
    {
      id: 3,
      name: "Portable Bluetooth Speaker",
      sku: "PBS-003",
      price: 89.99,
      inventory: 210,
      category: "Audio",
      status: "active",
      description:
        "Take your music anywhere with our Portable Bluetooth Speaker. Featuring 24-hour battery life, waterproof design, and powerful bass.",
      image: "/bluetooth-speaker.png",
      platforms: {
        amazon: true,
        ebay: true,
        shopify: true,
        etsy: true,
        walmart: true,
        website: true,
      },
      quantumEnhanced: true,
      salesVelocity: 7.8,
      trending: true,
    },
    {
      id: 4,
      name: "Ergonomic Gaming Mouse",
      sku: "EGM-004",
      price: 59.99,
      inventory: 175,
      category: "Gaming",
      status: "active",
      description:
        "Gain the competitive edge with our Ergonomic Gaming Mouse. Features adjustable DPI, programmable buttons, and RGB lighting.",
      image: "/gaming-mouse.png",
      platforms: {
        amazon: true,
        ebay: true,
        shopify: true,
        etsy: false,
        walmart: false,
        website: true,
      },
      quantumEnhanced: false,
      salesVelocity: 5.2,
    },
    {
      id: 5,
      name: "Mechanical Keyboard",
      sku: "MK-005",
      price: 129.99,
      inventory: 120,
      category: "Computing",
      status: "active",
      description:
        "Enhance your typing experience with our Mechanical Keyboard. Features tactile switches, customizable backlighting, and durable construction.",
      image: "/mechanical-keyboard.png",
      platforms: {
        amazon: true,
        ebay: true,
        shopify: true,
        etsy: false,
        walmart: true,
        website: true,
      },
      quantumEnhanced: true,
      salesVelocity: 4.8,
    },
    {
      id: 6,
      name: "HD Webcam",
      sku: "HDW-006",
      price: 79.99,
      inventory: 95,
      category: "Computing",
      status: "active",
      description:
        "Look your best in video calls with our HD Webcam. Features 1080p resolution, auto-focus, and built-in microphone.",
      image: "/classic-webcam.png",
      platforms: {
        amazon: true,
        ebay: true,
        shopify: true,
        etsy: false,
        walmart: true,
        website: true,
      },
      quantumEnhanced: false,
      salesVelocity: 3.9,
    },
    {
      id: 7,
      name: "USB-C Hub",
      sku: "UCH-007",
      price: 49.99,
      inventory: 230,
      category: "Computing",
      status: "active",
      description:
        "Expand your connectivity options with our USB-C Hub. Features multiple USB ports, HDMI output, and SD card reader.",
      image: "/usb-hub.png",
      platforms: {
        amazon: true,
        ebay: true,
        shopify: true,
        etsy: false,
        walmart: true,
        website: true,
      },
      quantumEnhanced: false,
      salesVelocity: 6.1,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <HolographicHeader
        title="Holographic Products"
        subtitle="Manage your products with advanced holographic interface"
      />

      {/* Action bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-[250px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-indigo-300/70" />
            <Input
              placeholder="Search products..."
              className="border-indigo-500/20 bg-indigo-950/30 pl-8 text-indigo-200 placeholder:text-indigo-300/50 focus:border-indigo-500/50 focus:ring-indigo-500/20"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200 disabled:bg-indigo-950/10 disabled:text-indigo-300/50"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh Products"}
          </Button>
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Product stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-indigo-200">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">248</div>
            <p className="text-xs text-indigo-400">
              <span className="text-emerald-500">↑ 12</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-indigo-200">Active Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">215</div>
            <p className="text-xs text-indigo-400">86.7% of total products</p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-indigo-200">Quantum Enhanced</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">87</div>
            <p className="text-xs text-indigo-400">
              <span className="text-emerald-500">↑ 15</span> from last quarter
            </p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-indigo-200">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">23</div>
            <p className="text-xs text-indigo-400">
              <span className="text-amber-500">↑ 5</span> requiring attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Products grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link href="/dashboard/ecommerex/product-detail" key={product.id}>
            <HolographicProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  )
}
