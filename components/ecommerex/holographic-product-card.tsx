"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cardSize, setCardSize] = useState({ width: 0, height: 0 })
  const [cardRef, setCardRef] = useState<HTMLDivElement | null>(null)
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

  // Track mouse position for holographic effect
  useEffect(() => {
    if (!cardRef) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardRef.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const updateCardSize = () => {
      if (cardRef) {
        setCardSize({
          width: cardRef.offsetWidth,
          height: cardRef.offsetHeight,
        })
      }
    }

    window.addEventListener("resize", updateCardSize)
    cardRef.addEventListener("mousemove", handleMouseMove)
    updateCardSize()

    return () => {
      window.removeEventListener("resize", updateCardSize)
      cardRef?.removeEventListener("mousemove", handleMouseMove)
    }
  }, [cardRef])

  // Calculate gradient position based on mouse position
  const calculateGradientPosition = () => {
    if (cardSize.width === 0 || !isHovered) return { x: 50, y: 50 }
    const x = (mousePosition.x / cardSize.width) * 100
    const y = (mousePosition.y / cardSize.height) * 100
    return { x, y }
  }

  const gradientPos = calculateGradientPosition()

  // Get status badge based on product status
  const getStatusBadge = () => {
    switch (product.status) {
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

  // Handle platform toggle
  const handlePlatformToggle = (platform: string) => {
    if (onTogglePlatform) {
      onTogglePlatform(product.id, platform)
    }
  }

  return (
    <Card
      ref={setCardRef}
      className={`group relative overflow-hidden border-0 transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered
          ? `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, rgba(129, 140, 248, 0.15), rgba(0, 0, 0, 0.8) 70%)`
          : "linear-gradient(to bottom right, rgba(79, 70, 229, 0.1), rgba(0, 0, 0, 0.8))",
        boxShadow: isHovered
          ? "0 0 20px rgba(129, 140, 248, 0.3), inset 0 0 20px rgba(129, 140, 248, 0.2)"
          : "0 0 10px rgba(79, 70, 229, 0.2), inset 0 0 10px rgba(79, 70, 229, 0.1)",
      }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(123, 97, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 97, 255, 0.2) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Holographic glow effect */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        style={{
          background: `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, rgba(129, 140, 248, 0.2), transparent 50%)`,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {isHovered &&
          [...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-indigo-400 opacity-70"
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

      {/* Content */}
      <div className="relative z-10 p-5">
        <div className="flex justify-between">
          <div className="flex-1">
            {/* Product image with holographic effect */}
            <div className="relative mb-4 h-40 w-full overflow-hidden rounded-md">
              <div
                className={`absolute inset-0 z-10 transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(129, 140, 248, 0.2) 0%, transparent 50%, rgba(129, 140, 248, 0.2) 100%)",
                  boxShadow: "inset 0 0 20px rgba(129, 140, 248, 0.3)",
                }}
              />
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Quantum enhanced badge */}
              {product.quantumEnhanced && (
                <div className="absolute right-2 top-2 z-20">
                  <Badge className="bg-indigo-500/30 text-indigo-200">
                    <Sparkles className="mr-1 h-3 w-3" />
                    Quantum
                  </Badge>
                </div>
              )}

              {/* Trending badge */}
              {product.trending && (
                <div className="absolute left-2 top-2 z-20">
                  <Badge className="bg-pink-500/30 text-pink-200">
                    <ChevronUp className="mr-1 h-3 w-3" />
                    Trending
                  </Badge>
                </div>
              )}
            </div>

            {/* Product info */}
            <div>
              <h3 className="mb-1 text-lg font-bold text-white">{product.name}</h3>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm text-indigo-200">${product.price.toFixed(2)}</span>
                <span className="text-xs text-indigo-400">SKU: {product.sku}</span>
              </div>

              {/* Status and category */}
              <div className="mb-3 flex items-center gap-2">
                {getStatusBadge()}
                <Badge variant="outline" className="border-indigo-500/30 text-indigo-300">
                  {product.category}
                </Badge>
              </div>

              {/* Platform availability indicators */}
              <div className="mb-3">
                <div className="mb-1 text-xs text-indigo-300">Platform Availability</div>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(platformsConfig).map(([key, platform]) => (
                    <Badge
                      key={key}
                      variant={platform.active ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        platform.active
                          ? `${platform.color.replace("bg-", "bg-")} bg-opacity-20 text-white`
                          : "border-indigo-500/20 text-indigo-400"
                      }`}
                      onClick={() => handlePlatformToggle(key)}
                    >
                      {platform.icon}
                      <span className="ml-1">{platform.name}</span>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Inventory */}
              <div className="mb-3">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-indigo-300">Inventory</span>
                  <span className="text-xs font-medium text-indigo-200">{product.inventory} units</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-indigo-950">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    style={{
                      width: `${Math.min(100, (product.inventory / 150) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Sales velocity indicator (if available) */}
              {product.salesVelocity !== undefined && (
                <div className="mb-3">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-indigo-300">Sales Velocity</span>
                    <span className="text-xs font-medium text-indigo-200">{product.salesVelocity} units/day</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-indigo-950">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      style={{
                        width: `${Math.min(100, (product.salesVelocity / 10) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Description (expandable) */}
              {product.description && (
                <div className="mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between border border-indigo-500/20 bg-indigo-950/30 px-3 py-1 text-xs text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
                    onClick={() => setShowDetails(!showDetails)}
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
                      className="mt-2 rounded-md bg-indigo-950/50 p-2 text-xs text-indigo-200"
                    >
                      {product.description}
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
          >
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
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
              <DropdownMenuContent align="end" className="border-indigo-500/20 bg-indigo-950/90 backdrop-blur-md">
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

        {/* Holographic accent */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      </div>
    </Card>
  )
}
