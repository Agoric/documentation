"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  ArrowUpRight,
  BarChart3,
  Brain,
  Check,
  ChevronRight,
  Clock,
  Copy,
  CreditCard,
  Edit,
  Eye,
  FileText,
  Globe,
  HelpCircle,
  History,
  Info,
  Layers,
  LineChart,
  Link,
  Package,
  Percent,
  PieChart,
  Plus,
  RefreshCw,
  Save,
  Settings,
  Share2,
  ShoppingCart,
  Sparkles,
  Tag,
  Truck,
  Undo2,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample product data
const productData = {
  id: 1,
  name: "Quantum-Enhanced Wireless Earbuds",
  sku: "QE-WE-001",
  price: 129.99,
  compareAtPrice: 159.99,
  cost: 45.5,
  profit: 84.49,
  margin: 65,
  inventory: {
    total: 342,
    available: 298,
    reserved: 44,
    onHand: 120,
    inTransit: 222,
    reorderPoint: 100,
    reorderQuantity: 200,
    daysOfSupply: 28,
  },
  category: "Audio",
  subcategory: "Wireless Earbuds",
  status: "active",
  description:
    "Experience audio like never before with our Quantum-Enhanced Wireless Earbuds. Featuring advanced noise cancellation, 8-hour battery life, and seamless device switching. The built-in quantum algorithm optimizes audio quality based on your environment and listening preferences.",
  features: [
    "Active Noise Cancellation",
    "8-hour battery life",
    "Quantum-optimized sound",
    "Water resistant (IPX5)",
    "Touch controls",
    "Voice assistant compatible",
  ],
  specifications: {
    "Bluetooth Version": "5.2",
    "Battery Life": "8 hours (earbuds) + 24 hours (case)",
    Charging: "USB-C, Wireless Qi",
    "Water Resistance": "IPX5",
    Dimensions: "22 x 18 x 22 mm (each earbud)",
    Weight: "5.4g (each earbud), 48g (charging case)",
  },
  images: ["/wireless-earbuds.png", "/placeholder-omevl.png", "/placeholder-z3n25.png"],
  platforms: {
    amazon: {
      active: true,
      price: 129.99,
      inventory: 120,
      sales: 48,
      rating: 4.7,
      reviews: 124,
      link: "#",
    },
    ebay: {
      active: true,
      price: 134.99,
      inventory: 85,
      sales: 22,
      rating: 4.5,
      reviews: 68,
      link: "#",
    },
    shopify: {
      active: true,
      price: 129.99,
      inventory: 298,
      sales: 76,
      rating: 4.8,
      reviews: 152,
      link: "#",
    },
    walmart: {
      active: true,
      price: 129.99,
      inventory: 65,
      sales: 18,
      rating: 4.6,
      reviews: 42,
      link: "#",
    },
    etsy: {
      active: false,
      price: 0,
      inventory: 0,
      sales: 0,
      rating: 0,
      reviews: 0,
      link: "#",
    },
    website: {
      active: true,
      price: 129.99,
      inventory: 298,
      sales: 32,
      rating: 4.9,
      reviews: 86,
      link: "#",
    },
  },
  salesData: {
    daily: [12, 15, 8, 14, 22, 18, 16],
    weekly: [86, 92, 78, 105, 118, 96, 108],
    monthly: [320, 380, 420, 390, 450, 480, 510],
    platforms: {
      amazon: 38,
      ebay: 12,
      shopify: 28,
      walmart: 8,
      website: 14,
    },
  },
  quantumInsights: {
    optimizedPrice: 134.99,
    priceSensitivity: "Medium",
    demandForecast: "Increasing",
    competitivePosition: "Strong",
    recommendedInventory: 380,
    marketTrends: "Positive",
    confidenceScore: 92,
  },
  tags: ["wireless", "audio", "earbuds", "bluetooth", "quantum-enhanced"],
  createdAt: "2023-08-15T10:30:00Z",
  updatedAt: "2023-11-22T14:45:00Z",
  variants: [
    { id: 101, name: "Black", sku: "QE-WE-001-BLK", inventory: 180, price: 129.99 },
    { id: 102, name: "White", sku: "QE-WE-001-WHT", inventory: 118, price: 129.99 },
    { id: 103, name: "Blue", sku: "QE-WE-001-BLU", inventory: 44, price: 134.99 },
  ],
  relatedProducts: [2, 5, 8, 12],
  salesVelocity: 8.2,
  trending: true,
  quantumEnhanced: true,
}

// Platform icons and colors
const platformConfig = {
  amazon: {
    icon: <Globe className="h-4 w-4" />,
    color: "from-blue-600 to-teal-500",
    bgColor: "bg-gradient-to-br from-blue-600/10 to-teal-500/10",
    borderColor: "border-blue-500/30",
  },
  ebay: {
    icon: <Globe className="h-4 w-4" />,
    color: "from-indigo-600 to-purple-500",
    bgColor: "bg-gradient-to-br from-indigo-600/10 to-purple-500/10",
    borderColor: "border-indigo-500/30",
  },
  shopify: {
    icon: <ShoppingCart className="h-4 w-4" />,
    color: "from-emerald-600 to-green-500",
    bgColor: "bg-gradient-to-br from-emerald-600/10 to-green-500/10",
    borderColor: "border-emerald-500/30",
  },
  walmart: {
    icon: <ShoppingCart className="h-4 w-4" />,
    color: "from-blue-600 to-sky-500",
    bgColor: "bg-gradient-to-br from-blue-600/10 to-sky-500/10",
    borderColor: "border-blue-500/30",
  },
  etsy: {
    icon: <Globe className="h-4 w-4" />,
    color: "from-amber-600 to-orange-500",
    bgColor: "bg-gradient-to-br from-amber-600/10 to-orange-500/10",
    borderColor: "border-amber-500/30",
  },
  website: {
    icon: <Globe className="h-4 w-4" />,
    color: "from-violet-600 to-fuchsia-500",
    bgColor: "bg-gradient-to-br from-violet-600/10 to-fuchsia-500/10",
    borderColor: "border-violet-500/30",
  },
}

export function HolographicProductDetail() {
  const [activeTab, setActiveTab] = useState("overview")
  const [activeImage, setActiveImage] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Track mouse position for holographic effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  // Get status badge based on product status
  const getStatusBadge = () => {
    switch (productData.status) {
      case "active":
        return (
          <Badge className="bg-emerald-400/20 text-emerald-300">
            <Check className="mr-1 h-3 w-3" /> Active
          </Badge>
        )
      case "draft":
        return (
          <Badge variant="outline" className="text-slate-400">
            Draft
          </Badge>
        )
      case "archived":
        return (
          <Badge variant="outline" className="text-amber-400">
            Archived
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-950 to-indigo-950/70"
    >
      {/* Holographic background effects */}
      <div className="absolute inset-0 z-0">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(123, 97, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 97, 255, 0.2) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Radial gradient that follows mouse */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(129, 140, 248, 0.3), transparent 40%)`,
          }}
        />

        {/* Glow effects */}
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-20 right-20 h-60 w-60 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute left-1/3 top-1/4 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-indigo-400 opacity-70"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
              opacity: [Math.random() * 0.5 + 0.3, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl p-6">
        {/* Header with actions */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="border border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
              >
                <ChevronRight className="mr-1 h-4 w-4 rotate-180" />
                Back to Products
              </Button>
              <Separator orientation="vertical" className="h-4 bg-indigo-500/20" />
              <span className="text-xs text-indigo-400">SKU: {productData.sku}</span>
            </div>
            <h1 className="bg-gradient-to-r from-white via-indigo-100 to-indigo-200 bg-clip-text text-3xl font-bold text-transparent">
              {productData.name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {getStatusBadge()}
              <Badge variant="outline" className="border-indigo-500/30 text-indigo-300">
                {productData.category}
              </Badge>
              {productData.quantumEnhanced && (
                <Badge className="bg-indigo-500/30 text-indigo-200">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Quantum Enhanced
                </Badge>
              )}
              {productData.trending && (
                <Badge className="bg-pink-500/30 text-pink-200">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  Trending
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200 disabled:bg-indigo-950/10 disabled:text-indigo-300/50"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing..." : "Refresh Data"}
            </Button>
            <Button
              variant="outline"
              className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-indigo-500/20 bg-indigo-950/90 backdrop-blur-md">
                <DropdownMenuLabel className="text-indigo-200">Actions</DropdownMenuLabel>
                <DropdownMenuItem className="text-indigo-300 focus:bg-indigo-900/50 focus:text-indigo-200">
                  <Copy className="mr-2 h-4 w-4" /> Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem className="text-indigo-300 focus:bg-indigo-900/50 focus:text-indigo-200">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </DropdownMenuItem>
                <DropdownMenuItem className="text-indigo-300 focus:bg-indigo-900/50 focus:text-indigo-200">
                  <History className="mr-2 h-4 w-4" /> View History
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-indigo-500/20" />
                <DropdownMenuItem className="text-red-400 focus:bg-red-900/30 focus:text-red-300">
                  <Undo2 className="mr-2 h-4 w-4" /> Archive Product
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main content */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left column - Images */}
          <div className="md:col-span-1">
            <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
              <CardContent className="p-0">
                {/* Main image */}
                <div className="relative aspect-square overflow-hidden">
                  <div className="absolute inset-0 z-10 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
                  <img
                    src={productData.images[activeImage] || "/placeholder.svg"}
                    alt={productData.name}
                    className="h-full w-full object-cover"
                  />

                  {/* Holographic overlay */}
                  <div
                    className="absolute inset-0 z-20 opacity-40"
                    style={{
                      background: `linear-gradient(135deg, rgba(129, 140, 248, 0.2) 0%, transparent 50%, rgba(129, 140, 248, 0.2) 100%)`,
                      boxShadow: "inset 0 0 30px rgba(129, 140, 248, 0.3)",
                    }}
                  />

                  {/* Quantum badge */}
                  {productData.quantumEnhanced && (
                    <div className="absolute right-3 top-3 z-30">
                      <Badge className="bg-indigo-500/30 text-indigo-200 backdrop-blur-sm">
                        <Sparkles className="mr-1 h-3 w-3" />
                        Quantum Enhanced
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Thumbnail images */}
                <div className="flex p-2">
                  {productData.images.map((image, index) => (
                    <button
                      key={index}
                      className={`relative mr-2 h-16 w-16 overflow-hidden rounded-md border-2 transition-all ${
                        activeImage === index
                          ? "border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                          : "border-indigo-500/20 hover:border-indigo-500/50"
                      }`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${productData.name} thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                      />

                      {/* Holographic overlay for thumbnails */}
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-60" />
                    </button>
                  ))}

                  {/* Add image button */}
                  <button className="flex h-16 w-16 items-center justify-center rounded-md border-2 border-dashed border-indigo-500/20 text-indigo-400 transition-all hover:border-indigo-500/50 hover:text-indigo-300">
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Variants */}
            <Card className="mt-6 overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-indigo-200">Variants</CardTitle>
                <CardDescription className="text-indigo-400">Manage product variations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {productData.variants.map((variant) => (
                    <div
                      key={variant.id}
                      className="flex items-center justify-between rounded-md border border-indigo-500/20 bg-indigo-950/50 p-3"
                    >
                      <div>
                        <div className="font-medium text-indigo-200">{variant.name}</div>
                        <div className="text-xs text-indigo-400">SKU: {variant.sku}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-indigo-200">${variant.price.toFixed(2)}</div>
                        <div className="text-xs text-indigo-400">Stock: {variant.inventory}</div>
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full border-indigo-500/20 bg-indigo-950/50 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Variant
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="mt-6 overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-indigo-200">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {productData.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="border-indigo-500/30 text-indigo-300">
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}

                  <Badge
                    variant="outline"
                    className="cursor-pointer border-dashed border-indigo-500/20 text-indigo-400 hover:border-indigo-500/40 hover:text-indigo-300"
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    Add Tag
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle and right columns */}
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 border border-indigo-500/20 bg-indigo-950/30 p-1">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
                >
                  <Info className="mr-2 h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="inventory"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
                >
                  <Package className="mr-2 h-4 w-4" />
                  Inventory
                </TabsTrigger>
                <TabsTrigger
                  value="platforms"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Platforms
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="quantum"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Quantum
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-indigo-200">Product Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Basic info */}
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-1">
                        <div className="text-xs text-indigo-400">Price</div>
                        <div className="text-2xl font-bold text-white">${productData.price.toFixed(2)}</div>
                        {productData.compareAtPrice > 0 && (
                          <div className="text-sm text-indigo-400">
                            <span className="line-through">${productData.compareAtPrice.toFixed(2)}</span>
                            <span className="ml-2 text-emerald-400">
                              Save ${(productData.compareAtPrice - productData.price).toFixed(2)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs text-indigo-400">Profit</div>
                        <div className="text-2xl font-bold text-white">${productData.profit.toFixed(2)}</div>
                        <div className="text-sm text-indigo-400">
                          Cost: ${productData.cost.toFixed(2)} | Margin: {productData.margin}%
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs text-indigo-400">Inventory</div>
                        <div className="text-2xl font-bold text-white">{productData.inventory.available}</div>
                        <div className="text-sm text-indigo-400">{productData.inventory.reserved} reserved</div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <div className="mb-2 text-sm font-medium text-indigo-300">Description</div>
                      <div className="rounded-md bg-indigo-950/50 p-4 text-indigo-200">{productData.description}</div>
                    </div>

                    {/* Features */}
                    <div>
                      <div className="mb-2 text-sm font-medium text-indigo-300">Features</div>
                      <div className="grid gap-2 md:grid-cols-2">
                        {productData.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 rounded-md bg-indigo-950/50 p-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
                              <Check className="h-3 w-3" />
                            </div>
                            <span className="text-sm text-indigo-200">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specifications */}
                    <div>
                      <div className="mb-2 text-sm font-medium text-indigo-300">Specifications</div>
                      <div className="rounded-md bg-indigo-950/50 p-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          {Object.entries(productData.specifications).map(([key, value], index) => (
                            <div key={index} className="flex justify-between border-b border-indigo-500/20 pb-2">
                              <span className="text-sm text-indigo-400">{key}</span>
                              <span className="text-sm font-medium text-indigo-200">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-indigo-950/50 p-4 text-xs text-indigo-400">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Created: {new Date(productData.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <RefreshCw className="h-3 w-3" />
                        <span>Updated: {new Date(productData.updatedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        <span>ID: {productData.id}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Inventory Tab */}
              <TabsContent value="inventory" className="space-y-6">
                <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-indigo-200">Inventory Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Inventory overview */}
                    <div className="grid gap-4 md:grid-cols-4">
                      {[
                        { label: "Total", value: productData.inventory.total, icon: <Package className="h-4 w-4" /> },
                        {
                          label: "Available",
                          value: productData.inventory.available,
                          icon: <ShoppingCart className="h-4 w-4" />,
                        },
                        { label: "On Hand", value: productData.inventory.onHand, icon: <Layers className="h-4 w-4" /> },
                        {
                          label: "In Transit",
                          value: productData.inventory.inTransit,
                          icon: <Truck className="h-4 w-4" />,
                        },
                      ].map((item, index) => (
                        <div key={index} className="rounded-md bg-indigo-950/50 p-4">
                          <div className="mb-2 flex items-center gap-2 text-indigo-400">
                            {item.icon}
                            <span className="text-xs">{item.label}</span>
                          </div>
                          <div className="text-2xl font-bold text-white">{item.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Inventory status */}
                    <div className="rounded-md bg-indigo-950/50 p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="text-sm font-medium text-indigo-300">Inventory Status</div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-full text-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-300"
                              >
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="border-indigo-500/20 bg-indigo-950/90 text-indigo-200">
                              <p>Inventory status based on current stock levels and sales velocity</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-indigo-300">Current Stock</span>
                        <span className="text-sm font-medium text-indigo-200">
                          {productData.inventory.available} units
                        </span>
                      </div>

                      <div className="mb-4">
                        <Progress
                          value={(productData.inventory.available / productData.inventory.reorderPoint) * 100}
                          className="h-2 bg-indigo-950"
                          indicatorClassName="bg-gradient-to-r from-indigo-500 to-purple-500"
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-1">
                          <div className="text-xs text-indigo-400">Reorder Point</div>
                          <div className="text-lg font-medium text-indigo-200">
                            {productData.inventory.reorderPoint} units
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs text-indigo-400">Reorder Quantity</div>
                          <div className="text-lg font-medium text-indigo-200">
                            {productData.inventory.reorderQuantity} units
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs text-indigo-400">Days of Supply</div>
                          <div className="text-lg font-medium text-indigo-200">
                            {productData.inventory.daysOfSupply} days
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Inventory by platform */}
                    <div>
                      <div className="mb-2 text-sm font-medium text-indigo-300">Inventory by Platform</div>
                      <div className="space-y-3">
                        {Object.entries(productData.platforms)
                          .filter(([_, data]) => data.active)
                          .map(([platform, data]) => (
                            <div
                              key={platform}
                              className={`rounded-md border ${platformConfig[platform as keyof typeof platformConfig].borderColor} ${platformConfig[platform as keyof typeof platformConfig].bgColor} p-3`}
                            >
                              <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {platformConfig[platform as keyof typeof platformConfig].icon}
                                  <span className="font-medium text-indigo-200">
                                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                  </span>
                                </div>
                                <Badge variant="outline" className="border-indigo-500/30 text-indigo-300">
                                  ${data.price.toFixed(2)}
                                </Badge>
                              </div>

                              <div className="mb-1 flex items-center justify-between text-xs">
                                <span className="text-indigo-400">Inventory</span>
                                <span className="text-indigo-300">{data.inventory} units</span>
                              </div>

                              <Progress
                                value={(data.inventory / 150) * 100}
                                className="h-1 bg-indigo-950"
                                indicatorClassName={`bg-gradient-to-r ${platformConfig[platform as keyof typeof platformConfig].color}`}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Platforms Tab */}
              <TabsContent value="platforms" className="space-y-6">
                <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-indigo-200">Platform Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      {Object.entries(productData.platforms).map(([platform, data]) => (
                        <Card
                          key={platform}
                          className={`overflow-hidden border-0 ${platformConfig[platform as keyof typeof platformConfig].borderColor} ${platformConfig[platform as keyof typeof platformConfig].bgColor}`}
                        >
                          {/* Platform header */}
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                                  {platformConfig[platform as keyof typeof platformConfig].icon}
                                </div>
                                <CardTitle className="text-lg text-indigo-200">
                                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                </CardTitle>
                              </div>
                              <Badge
                                className={
                                  data.active ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-500/20 text-slate-300"
                                }
                              >
                                {data.active ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                          </CardHeader>

                          <CardContent className="space-y-4">
                            {/* Platform stats */}
                            <div className="grid grid-cols-3 gap-2">
                              <div className="rounded-md bg-indigo-950/30 p-2 text-center">
                                <div className="text-xs text-indigo-400">Price</div>
                                <div className="text-lg font-medium text-indigo-200">${data.price.toFixed(2)}</div>
                              </div>

                              <div className="rounded-md bg-indigo-950/30 p-2 text-center">
                                <div className="text-xs text-indigo-400">Inventory</div>
                                <div className="text-lg font-medium text-indigo-200">{data.inventory}</div>
                              </div>

                              <div className="rounded-md bg-indigo-950/30 p-2 text-center">
                                <div className="text-xs text-indigo-400">Sales</div>
                                <div className="text-lg font-medium text-indigo-200">{data.sales}</div>
                              </div>
                            </div>

                            {/* Rating and reviews */}
                            {data.active && (
                              <div className="rounded-md bg-indigo-950/30 p-3">
                                <div className="mb-1 flex items-center justify-between">
                                  <span className="text-xs text-indigo-400">Rating</span>
                                  <span className="text-xs text-indigo-400">{data.reviews} reviews</span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <div className="text-lg font-medium text-indigo-200">{data.rating.toFixed(1)}</div>
                                  <div className="flex-1">
                                    <Progress
                                      value={(data.rating / 5) * 100}
                                      className="h-2 bg-indigo-950"
                                      indicatorClassName={`bg-gradient-to-r ${platformConfig[platform as keyof typeof platformConfig].color}`}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Platform actions */}
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
                                disabled={!data.active}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Button>

                              <Button
                                variant={data.active ? "outline" : "default"}
                                size="sm"
                                className={
                                  data.active
                                    ? "flex-1 border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
                                    : "flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
                                }
                              >
                                {data.active ? (
                                  <>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Manage
                                  </>
                                ) : (
                                  <>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Activate
                                  </>
                                )}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-indigo-200">Sales Analytics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Sales overview */}
                    <div className="grid gap-4 md:grid-cols-3">
                      {[
                        {
                          label: "Daily Sales",
                          value: productData.salesData.daily[productData.salesData.daily.length - 1],
                          change: "+12%",
                          icon: <LineChart className="h-4 w-4" />,
                        },
                        {
                          label: "Weekly Sales",
                          value: productData.salesData.weekly[productData.salesData.weekly.length - 1],
                          change: "+8%",
                          icon: <BarChart3 className="h-4 w-4" />,
                        },
                        {
                          label: "Monthly Sales",
                          value: productData.salesData.monthly[productData.salesData.monthly.length - 1],
                          change: "+15%",
                          icon: <PieChart className="h-4 w-4" />,
                        },
                      ].map((item, index) => (
                        <div key={index} className="rounded-md bg-indigo-950/50 p-4">
                          <div className="mb-2 flex items-center gap-2 text-indigo-400">
                            {item.icon}
                            <span className="text-xs">{item.label}</span>
                          </div>
                          <div className="text-2xl font-bold text-white">{item.value} units</div>
                          <div className="text-xs text-emerald-400">{item.change} from previous period</div>
                        </div>
                      ))}
                    </div>

                    {/* Sales chart placeholder */}
                    <div className="rounded-md bg-indigo-950/50 p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="text-sm font-medium text-indigo-300">Sales Trend</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-indigo-500/30 text-indigo-300">
                            Last 7 Days
                          </Badge>
                        </div>
                      </div>

                      {/* Chart placeholder */}
                      <div className="h-64 rounded-md bg-indigo-950/30 p-4">
                        <div className="flex h-full items-center justify-center text-indigo-400">
                          Sales chart visualization would appear here
                        </div>
                      </div>
                    </div>

                    {/* Sales by platform */}
                    <div>
                      <div className="mb-2 text-sm font-medium text-indigo-300">Sales by Platform</div>
                      <div className="space-y-3">
                        {Object.entries(productData.salesData.platforms).map(([platform, sales]) => (
                          <div
                            key={platform}
                            className={`rounded-md border ${platformConfig[platform as keyof typeof platformConfig].borderColor} ${platformConfig[platform as keyof typeof platformConfig].bgColor} p-3`}
                          >
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {platformConfig[platform as keyof typeof platformConfig].icon}
                                <span className="font-medium text-indigo-200">
                                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                </span>
                              </div>
                              <Badge variant="outline" className="border-indigo-500/30 text-indigo-300">
                                {sales} units
                              </Badge>
                            </div>

                            <Progress
                              value={
                                (sales / Object.values(productData.salesData.platforms).reduce((a, b) => a + b, 0)) *
                                100
                              }
                              className="h-2 bg-indigo-950"
                              indicatorClassName={`bg-gradient-to-r ${platformConfig[platform as keyof typeof platformConfig].color}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Quantum Tab */}
              <TabsContent value="quantum" className="space-y-6">
                <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl text-indigo-200">Quantum Insights</CardTitle>
                        <CardDescription className="text-indigo-400">
                          AI-powered quantum analysis and recommendations
                        </CardDescription>
                      </div>
                      <Badge className="bg-indigo-500/30 text-indigo-200">
                        <Sparkles className="mr-1 h-3 w-3" />
                        157x Faster
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Quantum processing visualization */}
                    <div className="relative overflow-hidden rounded-md bg-indigo-950/50 p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="text-sm font-medium text-indigo-300">Quantum Processing</div>
                        <Badge variant="outline" className="border-indigo-500/30 text-indigo-300">
                          <Brain className="mr-1 h-3 w-3" />
                          Active
                        </Badge>
                      </div>

                      {/* Quantum visualization */}
                      <div className="relative h-32 rounded-md bg-indigo-950/70">
                        {/* Animated quantum particles */}
                        <div className="absolute inset-0">
                          {[...Array(30)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute h-1 w-1 rounded-full bg-indigo-400"
                              initial={{
                                x: Math.random() * 100 + "%",
                                y: Math.random() * 100 + "%",
                                opacity: Math.random() * 0.5 + 0.3,
                              }}
                              animate={{
                                x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                                y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                                opacity: [Math.random() * 0.5 + 0.3, Math.random() * 0.5 + 0.5],
                              }}
                              transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                                ease: "linear",
                              }}
                            />
                          ))}
                        </div>

                        {/* Confidence indicator */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="text-indigo-400">Confidence Score</span>
                            <span className="text-indigo-300">{productData.quantumInsights.confidenceScore}%</span>
                          </div>
                          <Progress
                            value={productData.quantumInsights.confidenceScore}
                            className="h-2 bg-indigo-950"
                            indicatorClassName="bg-gradient-to-r from-indigo-500 to-purple-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Quantum insights grid */}
                    <div className="grid gap-4 md:grid-cols-2">
                      {[
                        {
                          label: "Optimized Price",
                          value: `$${productData.quantumInsights.optimizedPrice.toFixed(2)}`,
                          description: "AI-recommended optimal price point",
                          icon: <CreditCard className="h-4 w-4" />,
                          change: productData.quantumInsights.optimizedPrice > productData.price ? "↑" : "↓",
                          changeValue: `${Math.abs(((productData.quantumInsights.optimizedPrice - productData.price) / productData.price) * 100).toFixed(1)}%`,
                          changeColor:
                            productData.quantumInsights.optimizedPrice > productData.price
                              ? "text-emerald-400"
                              : "text-amber-400",
                        },
                        {
                          label: "Recommended Inventory",
                          value: productData.quantumInsights.recommendedInventory,
                          description: "Optimal inventory level based on demand",
                          icon: <Package className="h-4 w-4" />,
                          change:
                            productData.quantumInsights.recommendedInventory > productData.inventory.total ? "↑" : "↓",
                          changeValue: `${Math.abs(((productData.quantumInsights.recommendedInventory - productData.inventory.total) / productData.inventory.total) * 100).toFixed(1)}%`,
                          changeColor:
                            productData.quantumInsights.recommendedInventory > productData.inventory.total
                              ? "text-emerald-400"
                              : "text-amber-400",
                        },
                        {
                          label: "Price Sensitivity",
                          value: productData.quantumInsights.priceSensitivity,
                          description: "Customer sensitivity to price changes",
                          icon: <Percent className="h-4 w-4" />,
                        },
                        {
                          label: "Competitive Position",
                          value: productData.quantumInsights.competitivePosition,
                          description: "Market position relative to competitors",
                          icon: <ArrowUpRight className="h-4 w-4" />,
                        },
                        {
                          label: "Demand Forecast",
                          value: productData.quantumInsights.demandForecast,
                          description: "Projected demand trend",
                          icon: <LineChart className="h-4 w-4" />,
                        },
                        {
                          label: "Market Trends",
                          value: productData.quantumInsights.marketTrends,
                          description: "Overall market direction",
                          icon: <BarChart3 className="h-4 w-4" />,
                        },
                      ].map((item, index) => (
                        <div key={index} className="rounded-md bg-indigo-950/50 p-4">
                          <div className="mb-2 flex items-center gap-2 text-indigo-400">
                            {item.icon}
                            <span className="text-xs">{item.label}</span>
                          </div>
                          <div className="flex items-end gap-2">
                            <div className="text-xl font-bold text-white">{item.value}</div>
                            {"change" in item && (
                              <div className={`text-sm ${item.changeColor}`}>
                                {item.change} {item.changeValue}
                              </div>
                            )}
                          </div>
                          {"description" in item && (
                            <div className="mt-1 text-xs text-indigo-400">{item.description}</div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Quantum recommendations */}
                    <div className="rounded-md bg-indigo-950/50 p-4">
                      <div className="mb-4 flex items-center gap-2">
                        <Brain className="h-5 w-5 text-indigo-400" />
                        <div className="text-sm font-medium text-indigo-300">Quantum AI Recommendations</div>
                      </div>

                      <div className="space-y-3">
                        {[
                          "Increase price by 3.8% to optimize profit margin based on current market conditions",
                          "Expand inventory by 11% to meet projected demand increase over next 30 days",
                          "Focus marketing efforts on Amazon and Shopify platforms for highest ROI",
                          "Consider bundling with complementary products to increase average order value",
                          "Optimize product description with keywords: 'noise cancellation', 'battery life', 'comfort'",
                        ].map((recommendation, index) => (
                          <div key={index} className="flex gap-3 rounded-md bg-indigo-950/30 p-3">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
                              <Sparkles className="h-3 w-3" />
                            </div>
                            <div className="text-sm text-indigo-200">{recommendation}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related products */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-indigo-200">Related Products</h2>
            <Button
              variant="outline"
              className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
            >
              <Link className="mr-2 h-4 w-4" />
              Manage Relations
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={
                      index === 0
                        ? "/smartwatch-lifestyle.png"
                        : index === 1
                          ? "/bluetooth-speaker.png"
                          : index === 2
                            ? "/gaming-mouse.png"
                            : "/mechanical-keyboard.png"
                    }
                    alt="Related product"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
                </div>
                <CardContent className="p-3">
                  <h3 className="mb-1 font-medium text-indigo-200">
                    {index === 0
                      ? "Quantum Smartwatch"
                      : index === 1
                        ? "Bluetooth Speaker"
                        : index === 2
                          ? "Gaming Mouse"
                          : "Mechanical Keyboard"}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-indigo-300">
                      ${index === 0 ? "199.99" : index === 1 ? "89.99" : index === 2 ? "59.99" : "129.99"}
                    </div>
                    <Badge variant="outline" className="border-indigo-500/30 text-indigo-300">
                      View
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Product history */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-indigo-200">Product History</h2>
            <Button
              variant="outline"
              className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
            >
              <History className="mr-2 h-4 w-4" />
              View Full History
            </Button>
          </div>

          <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="space-y-4">
                {[
                  {
                    action: "Price updated",
                    details: "Price changed from $124.99 to $129.99",
                    date: "2023-11-22T14:45:00Z",
                    user: "AI Optimizer",
                    icon: <CreditCard className="h-4 w-4" />,
                  },
                  {
                    action: "Inventory adjusted",
                    details: "Added 120 units to inventory",
                    date: "2023-11-15T09:30:00Z",
                    user: "John Smith",
                    icon: <Package className="h-4 w-4" />,
                  },
                  {
                    action: "Product description updated",
                    details: "Updated product features and specifications",
                    date: "2023-10-05T11:20:00Z",
                    user: "Sarah Johnson",
                    icon: <FileText className="h-4 w-4" />,
                  },
                  {
                    action: "Product created",
                    details: "Initial product setup completed",
                    date: "2023-08-15T10:30:00Z",
                    user: "Admin",
                    icon: <Plus className="h-4 w-4" />,
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 rounded-md bg-indigo-950/50 p-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-indigo-200">{item.action}</div>
                        <div className="text-xs text-indigo-400">
                          {new Date(item.date).toLocaleDateString()} {new Date(item.date).toLocaleTimeString()}
                        </div>
                      </div>
                      <div className="text-sm text-indigo-300">{item.details}</div>
                      <div className="mt-1 text-xs text-indigo-400">By: {item.user}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
