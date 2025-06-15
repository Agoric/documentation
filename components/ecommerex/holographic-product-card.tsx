"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, ShoppingCart, Eye, Heart, Zap, BarChart3 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
}

interface HolographicProductCardProps {
  product: Product
}

export function HolographicProductCard({ product }: HolographicProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const { addToComparison, removeFromComparison, isInComparison, maxComparisonItems, comparisonProducts } =
    useProductComparison()
  const inComparison = isInComparison(product.id)
  const canAddToComparison = comparisonProducts.length < maxComparisonItems

  return (
    <motion.div
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="relative overflow-hidden border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-cyan-950/40 backdrop-blur-sm">
        {/* Holographic Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-indigo-400/5 to-purple-400/5" />

        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 border border-cyan-400/30 rounded-lg"
          animate={{
            opacity: isHovered ? [0.3, 0.7, 0.3] : 0.3,
            scale: isHovered ? [1, 1.01, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
          }}
        />

        {/* Floating Particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
                animate={{
                  x: [0, Math.random() * 50 - 25],
                  y: [0, Math.random() * 50 - 25],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
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
          {/* Product Image */}
          <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-indigo-900/20">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Category Badge */}
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              {product.category}
            </Badge>

            {/* Like Button */}
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 h-8 w-8 bg-black/20 backdrop-blur-sm hover:bg-black/40"
              onClick={(e) => {
                e.preventDefault()
                setIsLiked(!isLiked)
              }}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`} />
            </Button>

            {/* Stock Indicator */}
            {product.stock < 20 && (
              <Badge className="absolute bottom-2 left-2 bg-amber-600 text-white">
                <Zap className="w-3 h-3 mr-1" />
                Low Stock
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-white line-clamp-2 group-hover:text-cyan-300 transition-colors">
              {product.name}
            </h3>

            <p className="text-sm text-indigo-200/70 line-clamp-2">{product.description}</p>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
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
              <div className="text-2xl font-bold text-white">${product.price.toFixed(2)}</div>
              <div className="text-sm text-indigo-200/70">{product.stock} in stock</div>
            </div>

            {/* Platforms */}
            <div className="flex flex-wrap gap-1">
              {product.platforms.slice(0, 3).map((platform) => (
                <Badge key={platform} variant="outline" className="text-xs border-indigo-400/30 text-indigo-300">
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
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
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
                className={`border-indigo-500/20 text-indigo-300 hover:text-indigo-200 ${
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
                className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
