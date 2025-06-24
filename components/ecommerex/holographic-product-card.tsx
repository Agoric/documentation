"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Star, ShoppingCart, Eye, Heart, Zap, BarChart3, ImageIcon, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DiamondSlabCard } from "@/components/ui/diamond-slab-card"
import { HolographicLabel } from "./holographic-label"
import Image from "next/image"
import { useProductComparison } from "@/contexts/product-comparison-context"
import { HolographicInvestmentImage } from "./holographic-investment-image"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  stock: number
  platforms: string[]
  isHolographic?: boolean
  holographicFeatures?: string[]
  has360View?: boolean
  images360?: string[]
  investmentClass?: string
}

interface HolographicProductCardProps {
  product: Product
}

export function HolographicProductCard({ product }: HolographicProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [show360Modal, setShow360Modal] = useState(false)

  const comparisonContext = useProductComparison()

  const { addToComparison, removeFromComparison, isInComparison, maxComparisonItems, comparisonProducts } =
    comparisonContext

  const inComparison = isInComparison?.(product?.id) || false
  const canAddToComparison = (comparisonProducts?.length || 0) < maxComparisonItems

  const getCardVariant = useCallback(() => {
    if (!product) return "default"

    if (product.isHolographic) {
      if (product.price > 1000) return "quantum"
      if (product.price > 500) return "elite"
      return "premium"
    }
    return "default"
  }, [product])

  const getLaserColor = useCallback(() => {
    if (!product?.category) return "cyan"

    switch (product.category) {
      case "Audio":
        return "purple"
      case "Wearables":
        return "gold"
      case "Cameras":
        return "emerald"
      case "Displays":
        return "crimson"
      default:
        return "cyan"
    }
  }, [product?.category])

  const handleMouseEnter = useCallback(() => {
    try {
      setIsHovered(true)
    } catch (error) {
      console.error("Error in mouse enter:", error)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    try {
      setIsHovered(false)
    } catch (error) {
      console.error("Error in mouse leave:", error)
    }
  }, [])

  const handleLikeClick = useCallback((e: React.MouseEvent) => {
    try {
      e?.preventDefault?.()
      e?.stopPropagation?.()
      setIsLiked((prev) => !prev)
    } catch (error) {
      console.error("Error in like click:", error)
    }
  }, [])

  const handle360Click = useCallback((e: React.MouseEvent) => {
    try {
      e?.preventDefault?.()
      e?.stopPropagation?.()
      setShow360Modal(true)
    } catch (error) {
      console.error("Error in 360 click:", error)
    }
  }, [])

  const handleComparisonClick = useCallback(
    (e: React.MouseEvent) => {
      try {
        e?.preventDefault?.()
        e?.stopPropagation?.()

        if (inComparison) {
          removeFromComparison?.(product?.id)
        } else if (canAddToComparison && product) {
          addToComparison?.(product)
        }
      } catch (error) {
        console.error("Error in comparison click:", error)
      }
    },
    [inComparison, canAddToComparison, product, addToComparison, removeFromComparison],
  )

  const handleImageError = useCallback(() => {
    try {
      setImageError(true)
    } catch (error) {
      console.error("Error handling image error:", error)
    }
  }, [])

  // Safety check for product
  if (!product) {
    return (
      <DiamondSlabCard variant="default" className="h-full">
        <div className="p-6 flex items-center justify-center">
          <p className="text-gray-400">Product not available</p>
        </div>
      </DiamondSlabCard>
    )
  }

  return (
    <DiamondSlabCard
      variant={getCardVariant()}
      intensity={product.isHolographic ? "high" : "medium"}
      laserColor={getLaserColor()}
      isHovered={isHovered}
      className="h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="p-6">
        {/* Enhanced Product Image */}
        <div className="relative mb-4 aspect-square overflow-hidden rounded-lg">
          {/* Use holographic investment image if available, otherwise fallback to regular image */}
          {product.investmentClass ? (
            <div className="w-full h-full flex items-center justify-center">
              <HolographicInvestmentImage
                investmentClass={product.investmentClass}
                size="md"
                animated={true}
                className="w-full h-full"
              />
            </div>
          ) : (
            /* Diamond-cut image container */
            <div
              className="relative w-full h-full"
              style={{
                clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
              }}
            >
              {!imageError ? (
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name || "Product"}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                  style={{
                    filter: product.isHolographic
                      ? "brightness(1.2) contrast(1.2) saturate(1.3) hue-rotate(5deg)"
                      : "brightness(1.1) contrast(1.1) saturate(1.1)",
                  }}
                  onError={handleImageError}
                  priority={false}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-800/30 to-purple-800/30">
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 text-indigo-400/50 mx-auto mb-2" />
                    <p className="text-xs text-indigo-300/70">Product Image</p>
                  </div>
                </div>
              )}

              {/* Holographic image overlay */}
              {product.isHolographic && (
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(45deg, ${getLaserColor() === "cyan" ? "rgba(34, 211, 238, 0.1)" : "rgba(147, 51, 234, 0.1)"}, transparent, rgba(103, 232, 249, 0.1))`,
                  }}
                  animate={{
                    opacity: isHovered ? [0.1, 0.3, 0.1] : 0.1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              )}

              {/* Laser etched frame */}
              <div className="absolute inset-0 border border-cyan-400/30 rounded-lg" />
            </div>
          )}
        </div>

        {/* 360° View Button */}
        {product.has360View && (
          <Button
            size="icon"
            variant="ghost"
            className="absolute bottom-2 right-2 h-8 w-8 bg-cyan-600/20 backdrop-blur-sm border border-cyan-400/30 text-cyan-300 hover:bg-cyan-600/30 hover:text-cyan-200 transition-all duration-200"
            onClick={handle360Click}
            title="360° View"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        )}

        {/* Holographic Label */}
        {product.isHolographic && (
          <div className="absolute top-2 left-2 z-30">
            <HolographicLabel variant="premium" features={product.holographicFeatures} />
          </div>
        )}

        {/* Category Badge */}
        <Badge
          className={`absolute ${product.isHolographic ? "top-14 left-2" : "top-2 left-2"} bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg`}
          style={{
            clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          }}
        >
          {product.category || "Unknown"}
        </Badge>

        {/* Like Button */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 h-8 w-8 bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all duration-200"
          onClick={handleLikeClick}
        >
          <Heart
            className={`h-4 w-4 transition-all duration-200 ${isLiked ? "fill-red-500 text-red-500 scale-110" : "text-white"}`}
          />
        </Button>

        {/* Stock Indicator */}
        {(product.stock || 0) < 20 && (
          <Badge
            className="absolute bottom-2 left-2 bg-amber-600 text-white shadow-lg"
            style={{
              clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
            }}
          >
            <Zap className="w-3 h-3 mr-1" />
            Low Stock
          </Badge>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <h3
          className={`font-semibold text-lg line-clamp-2 transition-colors ${
            product.isHolographic
              ? "text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text group-hover:from-cyan-200 group-hover:to-purple-200"
              : "text-white group-hover:text-cyan-300"
          }`}
        >
          {product.name || "Unknown Product"}
        </h3>

        <p className="text-sm text-indigo-200/70 line-clamp-2">{product.description || ""}</p>

        {/* 360° View Indicator */}
        {product.has360View && (
          <div className="flex items-center gap-2">
            <Badge
              className="text-xs bg-gradient-to-r from-cyan-600/20 to-indigo-600/20 border-cyan-400/30 text-cyan-300"
              style={{
                clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
              }}
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              360° View Available
            </Badge>
          </div>
        )}

        {/* Holographic Features */}
        {product.isHolographic && product.holographicFeatures && product.holographicFeatures.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.holographicFeatures.slice(0, 2).map((feature, index) => (
              <Badge
                key={index}
                className="text-xs bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border-cyan-400/30 text-cyan-300"
                style={{
                  clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
                }}
              >
                {feature}
              </Badge>
            ))}
            {product.holographicFeatures.length > 2 && (
              <Badge
                className="text-xs bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border-cyan-400/30 text-cyan-300"
                style={{
                  clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
                }}
              >
                +{product.holographicFeatures.length - 2}
              </Badge>
            )}
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 transition-colors ${
                  i < Math.floor(product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-indigo-200/70">
            {product.rating || 0} ({Math.floor(Math.random() * 100) + 10} reviews)
          </span>
        </div>

        {/* Price and Stock */}
        <div className="flex items-center justify-between">
          <div
            className={`text-2xl font-bold ${
              product.isHolographic
                ? "text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text"
                : "text-white"
            }`}
          >
            ${(product.price || 0).toFixed(2)}
          </div>
          <div className="text-sm text-indigo-200/70">{product.stock || 0} in stock</div>
        </div>

        {/* Platforms */}
        <div className="flex flex-wrap gap-1">
          {product.platforms?.slice(0, 3).map((platform) => (
            <Badge
              key={platform}
              variant="outline"
              className="text-xs border-indigo-400/30 text-indigo-300 capitalize"
              style={{
                clipPath: "polygon(3px 0%, 100% 0%, calc(100% - 3px) 100%, 0% 100%)",
              }}
            >
              {platform}
            </Badge>
          ))}
          {product.platforms && product.platforms.length > 3 && (
            <Badge
              variant="outline"
              className="text-xs border-indigo-400/30 text-indigo-300"
              style={{
                clipPath: "polygon(3px 0%, 100% 0%, calc(100% - 3px) 100%, 0% 100%)",
              }}
            >
              +{product.platforms.length - 3}
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            className={`flex-1 text-white transition-all duration-200 ${
              product.isHolographic
                ? "bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-cyan-500/25"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-indigo-500/25"
            }`}
            size="sm"
            style={{
              clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            }}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleComparisonClick}
            disabled={!inComparison && !canAddToComparison}
            className={`border-indigo-500/20 text-indigo-300 hover:text-indigo-200 transition-all duration-200 ${
              inComparison
                ? "bg-emerald-950/30 border-emerald-500/20 text-emerald-300 hover:bg-emerald-900/30"
                : "bg-indigo-950/30 hover:bg-indigo-900/30"
            }`}
            style={{
              clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
            }}
          >
            <BarChart3 className="w-4 h-4" />
            Compare
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200 transition-all duration-200"
            style={{
              clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
            }}
          >
            <Eye className="w-4 h-4" />
            View
          </Button>
        </div>
      </div>
    </DiamondSlabCard>
  )
}
