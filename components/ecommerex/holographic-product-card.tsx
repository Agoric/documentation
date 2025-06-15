"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, ShoppingCart, Eye, Heart, Zap, BarChart3, ImageIcon, RotateCcw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HolographicLabel } from "./holographic-label"
import { Product360Modal } from "./product-360-modal"
import Image from "next/image"
import { useProductComparison } from "@/contexts/product-comparison-context"

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
}

interface HolographicProductCardProps {
  product: Product
}

export function HolographicProductCard({ product }: HolographicProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [show360Modal, setShow360Modal] = useState(false)

  const { addToComparison, removeFromComparison, isInComparison, maxComparisonItems, comparisonProducts } =
    useProductComparison()
  const inComparison = isInComparison(product.id)
  const canAddToComparison = comparisonProducts.length < maxComparisonItems

  return (
    <>
      <motion.div
        className="group relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="relative overflow-hidden border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-cyan-950/40 backdrop-blur-sm">
          {/* Enhanced Holographic Background Effect for Holographic Products */}
          <div
            className={`absolute inset-0 ${
              product.isHolographic
                ? "bg-gradient-to-br from-cyan-400/10 via-indigo-400/10 to-purple-400/10"
                : "bg-gradient-to-br from-cyan-400/5 via-indigo-400/5 to-purple-400/5"
            }`}
          />

          {/* Enhanced Animated Border for Holographic Products */}
          <motion.div
            className={`absolute inset-0 border rounded-lg ${
              product.isHolographic ? "border-cyan-400/50" : "border-cyan-400/30"
            }`}
            animate={{
              opacity: isHovered ? [0.3, 0.7, 0.3] : product.isHolographic ? 0.5 : 0.3,
              scale: isHovered ? [1, 1.01, 1] : 1,
            }}
            transition={{
              duration: product.isHolographic ? 1.5 : 2,
              repeat: isHovered ? Number.POSITIVE_INFINITY : product.isHolographic ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
          />

          {/* Enhanced Floating Particles for Holographic Products */}
          {(isHovered || product.isHolographic) && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(product.isHolographic ? 12 : 8)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1 h-1 rounded-full ${
                    product.isHolographic ? "bg-gradient-to-r from-cyan-400/60 to-purple-400/60" : "bg-cyan-400/40"
                  }`}
                  animate={{
                    x: [0, Math.random() * 50 - 25],
                    y: [0, Math.random() * 50 - 25],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>
          )}

          <CardContent className="relative z-10 p-6">
            {/* Enhanced Product Image */}
            <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
              {/* Image Container with Holographic Effects */}
              <div className="relative w-full h-full">
                {!imageError ? (
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                    style={{
                      filter: product.isHolographic
                        ? "brightness(1.1) contrast(1.1) saturate(1.2)"
                        : "brightness(1) contrast(1) saturate(1)",
                    }}
                    onError={() => setImageError(true)}
                    priority={false}
                  />
                ) : (
                  // Fallback when image fails to load
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-800/30 to-purple-800/30">
                    <div className="text-center">
                      <ImageIcon className="w-12 h-12 text-indigo-400/50 mx-auto mb-2" />
                      <p className="text-xs text-indigo-300/70">Product Image</p>
                    </div>
                  </div>
                )}

                {/* Holographic Overlay for Holographic Products */}
                {product.isHolographic && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-400/10"
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
              </div>

              {/* 360° View Button */}
              {product.has360View && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute bottom-2 right-2 h-8 w-8 bg-cyan-600/20 backdrop-blur-sm border border-cyan-400/30 text-cyan-300 hover:bg-cyan-600/30 hover:text-cyan-200 transition-all duration-200"
                  onClick={(e) => {
                    e.preventDefault()
                    setShow360Modal(true)
                  }}
                  title="360° View"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              )}

              {/* Holographic Label - Top Priority */}
              {product.isHolographic && (
                <div className="absolute top-2 left-2 z-30">
                  <HolographicLabel variant="premium" features={product.holographicFeatures} />
                </div>
              )}

              {/* Category Badge */}
              <Badge
                className={`absolute ${product.isHolographic ? "top-14 left-2" : "top-2 left-2"} bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg`}
              >
                {product.category}
              </Badge>

              {/* Like Button */}
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 h-8 w-8 bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all duration-200"
                onClick={(e) => {
                  e.preventDefault()
                  setIsLiked(!isLiked)
                }}
              >
                <Heart
                  className={`h-4 w-4 transition-all duration-200 ${isLiked ? "fill-red-500 text-red-500 scale-110" : "text-white"}`}
                />
              </Button>

              {/* Stock Indicator */}
              {product.stock < 20 && (
                <Badge className="absolute bottom-2 left-2 bg-amber-600 text-white shadow-lg">
                  <Zap className="w-3 h-3 mr-1" />
                  Low Stock
                </Badge>
              )}

              {/* New Product Badge (for demonstration) */}
              {product.id === "13" ||
                (product.id === "14" && (
                  <Badge className="absolute bottom-2 right-14 bg-emerald-600 text-white shadow-lg">NEW</Badge>
                ))}
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
                {product.name}
              </h3>

              <p className="text-sm text-indigo-200/70 line-clamp-2">{product.description}</p>

              {/* 360° View Indicator */}
              {product.has360View && (
                <div className="flex items-center gap-2">
                  <Badge className="text-xs bg-gradient-to-r from-cyan-600/20 to-indigo-600/20 border-cyan-400/30 text-cyan-300">
                    <RotateCcw className="w-3 h-3 mr-1" />
                    360° View Available
                  </Badge>
                </div>
              )}

              {/* Holographic Features */}
              {product.isHolographic && product.holographicFeatures && (
                <div className="flex flex-wrap gap-1">
                  {product.holographicFeatures.slice(0, 2).map((feature, index) => (
                    <Badge
                      key={index}
                      className="text-xs bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border-cyan-400/30 text-cyan-300"
                    >
                      {feature}
                    </Badge>
                  ))}
                  {product.holographicFeatures.length > 2 && (
                    <Badge className="text-xs bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border-cyan-400/30 text-cyan-300">
                      +{product.holographicFeatures.length - 2}
                    </Badge>
                  )}
                </div>
              )}

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 transition-colors ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-indigo-200/70">
                  {product.rating} ({Math.floor(Math.random() * 100) + 10} reviews)
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
                  ${product.price.toFixed(2)}
                </div>
                <div className="text-sm text-indigo-200/70">{product.stock} in stock</div>
              </div>

              {/* Platforms */}
              <div className="flex flex-wrap gap-1">
                {product.platforms.slice(0, 3).map((platform) => (
                  <Badge
                    key={platform}
                    variant="outline"
                    className="text-xs border-indigo-400/30 text-indigo-300 capitalize"
                  >
                    {platform}
                  </Badge>
                ))}
                {product.platforms.length > 3 && (
                  <Badge variant="outline" className="text-xs border-indigo-400/30 text-indigo-300">
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
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault()
                    if (inComparison) {
                      removeFromComparison(product.id)
                    } else if (canAddToComparison) {
                      addToComparison(product)
                    }
                  }}
                  disabled={!inComparison && !canAddToComparison}
                  className={`border-indigo-500/20 text-indigo-300 hover:text-indigo-200 transition-all duration-200 ${
                    inComparison
                      ? "bg-emerald-950/30 border-emerald-500/20 text-emerald-300 hover:bg-emerald-900/30"
                      : "bg-indigo-950/30 hover:bg-indigo-900/30"
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200 transition-all duration-200"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 360° View Modal */}
      {show360Modal && product.has360View && (
        <Product360Modal product={product} isOpen={show360Modal} onClose={() => setShow360Modal(false)} />
      )}
    </>
  )
}
