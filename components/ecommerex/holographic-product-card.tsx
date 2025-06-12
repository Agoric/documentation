"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HolographicDiamondCard } from "@/components/ui/holographic-diamond-card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Brain,
  Check,
  ChevronUp,
  Copy,
  Edit,
  Eye,
  Globe,
  MoreHorizontal,
  ShoppingCart,
  Sparkles,
  Trash2,
} from "lucide-react"

interface Platform {
  name: string
  active: boolean
  icon: React.ReactNode
  color: string
}

interface HolographicProductCardProps {
  product: {
    id: number
    name: string
    sku: string
    price: number
    inventory: number
    category: string
    status: string
    description?: string
    image: string
    platforms: Record<string, boolean>
    quantumEnhanced?: boolean
    salesVelocity?: number
    trending?: boolean
  }
  className?: string
  onTogglePlatform?: (productId: number, platform: string) => void
}

export function HolographicProductCard({ product, className = "", onTogglePlatform }: HolographicProductCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  // Define platforms with their visual properties
  const platformsConfig: Record<string, Platform> = {
    amazon: {
      name: "Amazon",
      active: product.platforms.amazon,
      icon: <Globe className="h-3 w-3" />,
      color: "bg-blue-400",
    },
    ebay: {
      name: "eBay",
      active: product.platforms.ebay,
      icon: <Globe className="h-3 w-3" />,
      color: "bg-indigo-400",
    },
    shopify: {
      name: "Shopify",
      active: product.platforms.shopify,
      icon: <Globe className="h-3 w-3" />,
      color: "bg-green-400",
    },
    etsy: {
      name: "Etsy",
      active: product.platforms.etsy,
      icon: <Globe className="h-3 w-3" />,
      color: "bg-orange-400",
    },
    walmart: {
      name: "Walmart",
      active: product.platforms.walmart,
      icon: <Globe className="h-3 w-3" />,
      color: "bg-blue-400",
    },
    website: {
      name: "Website",
      active: product.platforms.website,
      icon: <Globe className="h-3 w-3" />,
      color: "bg-purple-400",
    },
  }

  // Get status badge based on product status
  const getStatusBadge = () => {
    switch (product.status) {
      case "active":
        return (
          <Badge className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
            <Check className="mr-1 h-3 w-3" /> Active
          </Badge>
        )
      case "draft":
        return (
          <Badge variant="outline" className="text-slate-400 border-slate-400/30">
            Draft
          </Badge>
        )
      case "archived":
        return (
          <Badge variant="outline" className="text-amber-400 border-amber-400/30">
            Archived
          </Badge>
        )
      default:
        return null
    }
  }

  // Handle platform toggle
  const handlePlatformToggle = (platform: string) => {
    if (onTogglePlatform) {
      onTogglePlatform(product.id, platform)
    }
  }

  const productIcon = (
    <div className="relative">
      <ShoppingCart className="h-5 w-5 text-white" />
      {product.quantumEnhanced && <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-indigo-400" />}
    </div>
  )

  return (
    <HolographicDiamondCard
      title={product.name}
      subtitle={`$${product.price.toFixed(2)} • SKU: ${product.sku}`}
      icon={productIcon}
      className={className}
      defaultExpanded={false}
      variant="primary"
      size="md"
    >
      <div className="space-y-4">
        {/* Product image with holographic effect */}
        <div className="relative h-40 w-full overflow-hidden rounded-md">
          <div className="absolute inset-0 z-10 bg-gradient-to-br from-indigo-500/20 via-transparent to-purple-500/20" />
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            style={{
              filter: "drop-shadow(0 0 10px rgba(129, 140, 248, 0.3))",
            }}
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-2">
            {product.trending && (
              <Badge className="bg-pink-500/30 text-pink-200 border border-pink-400/30">
                <ChevronUp className="mr-1 h-3 w-3" />
                Trending
              </Badge>
            )}
          </div>
        </div>

        {/* Status and category */}
        <div className="flex items-center gap-2">
          {getStatusBadge()}
          <Badge
            variant="outline"
            className="border-indigo-500/30 text-indigo-300 bg-indigo-950/30"
            style={{
              textShadow: "0 0 5px rgba(129, 140, 248, 0.5)",
            }}
          >
            {product.category}
          </Badge>
        </div>

        {/* Platform availability indicators */}
        <div>
          <div className="mb-2 text-xs text-indigo-300" style={{ textShadow: "0 0 5px rgba(129, 140, 248, 0.5)" }}>
            Platform Availability
          </div>
          <div className="flex flex-wrap gap-1">
            {Object.entries(platformsConfig).map(([key, platform]) => (
              <Badge
                key={key}
                variant={platform.active ? "default" : "outline"}
                className={`cursor-pointer transition-all ${
                  platform.active
                    ? "bg-indigo-500/30 text-white border border-indigo-400/50"
                    : "border-indigo-500/20 text-indigo-400"
                }`}
                onClick={() => handlePlatformToggle(key)}
                style={{
                  textShadow: platform.active ? "0 0 5px rgba(129, 140, 248, 0.8)" : "none",
                }}
              >
                {platform.icon}
                <span className="ml-1">{platform.name}</span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Inventory */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-indigo-300" style={{ textShadow: "0 0 5px rgba(129, 140, 248, 0.5)" }}>
              Inventory
            </span>
            <span className="text-xs font-medium text-indigo-200">{product.inventory} units</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-indigo-950/50 border border-indigo-500/20">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
              style={{
                width: `${Math.min(100, (product.inventory / 150) * 100)}%`,
                boxShadow: "0 0 10px rgba(129, 140, 248, 0.5)",
              }}
            />
          </div>
        </div>

        {/* Sales velocity indicator (if available) */}
        {product.salesVelocity !== undefined && (
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs text-indigo-300" style={{ textShadow: "0 0 5px rgba(129, 140, 248, 0.5)" }}>
                Sales Velocity
              </span>
              <span className="text-xs font-medium text-indigo-200">{product.salesVelocity} units/day</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-indigo-950/50 border border-indigo-500/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                style={{
                  width: `${Math.min(100, (product.salesVelocity / 10) * 100)}%`,
                  boxShadow: "0 0 10px rgba(52, 211, 153, 0.5)",
                }}
              />
            </div>
          </div>
        )}

        {/* Description (expandable) */}
        {product.description && (
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-between border border-indigo-500/20 bg-indigo-950/30 px-3 py-1 text-xs text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
              onClick={() => setShowDetails(!showDetails)}
              style={{
                textShadow: "0 0 5px rgba(129, 140, 248, 0.5)",
              }}
            >
              <span>{showDetails ? "Hide Details" : "Show Details"}</span>
              <ChevronUp className={`h-3 w-3 transition-transform ${showDetails ? "" : "rotate-180"}`} />
            </Button>

            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 rounded-md bg-indigo-950/50 p-2 text-xs text-indigo-200 border border-indigo-500/20"
                style={{
                  textShadow: "0 0 3px rgba(129, 140, 248, 0.3)",
                }}
              >
                {product.description}
              </motion.div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
            style={{
              textShadow: "0 0 5px rgba(129, 140, 248, 0.5)",
            }}
          >
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
              style={{
                textShadow: "0 0 5px rgba(129, 140, 248, 0.5)",
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="border-indigo-500/20 bg-indigo-950/90 backdrop-blur-md"
                style={{
                  boxShadow: "0 0 20px rgba(129, 140, 248, 0.3)",
                }}
              >
                <DropdownMenuLabel className="text-indigo-200">Actions</DropdownMenuLabel>
                <DropdownMenuItem className="text-indigo-300 focus:bg-indigo-900/50 focus:text-indigo-200">
                  <Copy className="mr-2 h-4 w-4" /> Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem className="text-indigo-300 focus:bg-indigo-900/50 focus:text-indigo-200">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Manage Inventory
                </DropdownMenuItem>
                <DropdownMenuItem className="text-indigo-300 focus:bg-indigo-900/50 focus:text-indigo-200">
                  <Brain className="mr-2 h-4 w-4" /> AI Optimization
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-indigo-500/20" />
                <DropdownMenuItem className="text-red-400 focus:bg-red-900/30 focus:text-red-300">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </HolographicDiamondCard>
  )
}
