"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  TrendingUp,
  TrendingDown,
  Heart,
  Eye,
  BarChart3,
  Home,
  DollarSign,
  RotateCcw,
  Zap,
  School,
  Car,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HolographicLabel } from "@/components/ecommerex/holographic-label"
import { BidModal } from "./bid-modal"
import Image from "next/image"
import { usePropertyComparison } from "@/contexts/property-comparison-context"

interface Property {
  id: string
  address: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  lotSize: number
  yearBuilt: number
  propertyType: string
  images: string[]
  description: string
  features: string[]
  neighborhood: string
  walkScore: number
  schoolRating: number
  marketTrend: "up" | "down" | "stable"
  daysOnMarket: number
  pricePerSqft: number
  isHolographic?: boolean
  holographicFeatures?: string[]
  has360View?: boolean
  zestimate: number
  priceHistory: Array<{ date: string; price: number }>
  coordinates?: { lat: number; lng: number }
  taxes?: number
  hoa?: number
  schools?: {
    elementary?: string
    middle?: string
    high?: string
    district?: string
  }
}

interface HolographicPropertyCardProps {
  property: Property
}

export function HolographicPropertyCard({ property }: HolographicPropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showBidModal, setShowBidModal] = useState(false)

  const { addToComparison, removeFromComparison, isInComparison, maxComparisonItems, comparisonProperties } =
    usePropertyComparison()
  const inComparison = isInComparison(property.id)
  const canAddToComparison = comparisonProperties.length < maxComparisonItems

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getTrendIcon = () => {
    switch (property.marketTrend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-400" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-400" />
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const nextImage = () => {
    if (property.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
    }
  }

  const prevImage = () => {
    if (property.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
    }
  }

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
          {/* Enhanced Holographic Background Effect */}
          <div
            className={`absolute inset-0 ${
              property.isHolographic
                ? "bg-gradient-to-br from-cyan-400/10 via-indigo-400/10 to-purple-400/10"
                : "bg-gradient-to-br from-cyan-400/5 via-indigo-400/5 to-purple-400/5"
            }`}
          />

          {/* Animated Border */}
          <motion.div
            className={`absolute inset-0 border rounded-lg ${
              property.isHolographic ? "border-cyan-400/50" : "border-cyan-400/30"
            }`}
            animate={{
              opacity: isHovered ? [0.3, 0.7, 0.3] : property.isHolographic ? 0.5 : 0.3,
              scale: isHovered ? [1, 1.01, 1] : 1,
            }}
            transition={{
              duration: property.isHolographic ? 1.5 : 2,
              repeat: isHovered ? Number.POSITIVE_INFINITY : property.isHolographic ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
          />

          {/* Floating Particles */}
          {(isHovered || property.isHolographic) && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(property.isHolographic ? 12 : 8)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1 h-1 rounded-full ${
                    property.isHolographic ? "bg-gradient-to-r from-cyan-400/60 to-purple-400/60" : "bg-cyan-400/40"
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
            {/* Property Image Gallery */}
            <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
              <div className="relative w-full h-full">
                {!imageError && property.images.length > 0 ? (
                  <>
                    <Image
                      src={property.images[currentImageIndex] || "/placeholder.svg"}
                      alt={property.address}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                      style={{
                        filter: property.isHolographic
                          ? "brightness(1.1) contrast(1.1) saturate(1.2)"
                          : "brightness(1) contrast(1) saturate(1)",
                      }}
                      onError={handleImageError}
                      priority={false}
                    />

                    {/* Image Navigation */}
                    {property.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            prevImage()
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ←
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            nextImage()
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          →
                        </button>

                        {/* Image Indicators */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                          {property.images.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full transition-all ${
                                index === currentImageIndex ? "bg-white" : "bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-800/30 to-purple-800/30">
                    <div className="text-center">
                      <Home className="w-12 h-12 text-indigo-400/50 mx-auto mb-2" />
                      <p className="text-xs text-indigo-300/70">Property Image</p>
                    </div>
                  </div>
                )}

                {/* Holographic Overlay */}
                {property.isHolographic && (
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

                {/* 360° View Button */}
                {property.has360View && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute bottom-2 right-2 h-8 w-8 bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all duration-200"
                    onClick={(e) => {
                      e.preventDefault()
                      // Handle 360 view
                    }}
                  >
                    <RotateCcw className="h-4 w-4 text-white" />
                  </Button>
                )}
              </div>

              {/* Holographic Label */}
              {property.isHolographic && (
                <div className="absolute top-2 left-2 z-30">
                  <HolographicLabel variant="premium" features={property.holographicFeatures} />
                </div>
              )}

              {/* Property Type Badge */}
              <Badge
                className={`absolute ${property.isHolographic ? "top-14 left-2" : "top-2 left-2"} bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg`}
              >
                {property.propertyType}
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

              {/* Days on Market */}
              {property.daysOnMarket < 30 && (
                <Badge className="absolute bottom-2 left-2 bg-amber-600 text-white shadow-lg">
                  <Zap className="w-3 h-3 mr-1" />
                  {property.daysOnMarket} days
                </Badge>
              )}
            </div>

            {/* Property Info */}
            <div className="space-y-3">
              {/* Address */}
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 mt-1 flex-shrink-0" />
                <h3
                  className={`font-semibold text-lg line-clamp-2 transition-colors ${
                    property.isHolographic
                      ? "text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text group-hover:from-cyan-200 group-hover:to-purple-200"
                      : "text-white group-hover:text-cyan-300"
                  }`}
                >
                  {property.address}
                </h3>
              </div>

              {/* Price and Market Trend */}
              <div className="flex items-center justify-between">
                <div
                  className={`text-2xl font-bold ${
                    property.isHolographic
                      ? "text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text"
                      : "text-white"
                  }`}
                >
                  {formatPrice(property.price)}
                </div>
                <div className="flex items-center gap-2">
                  {getTrendIcon()}
                  <span className="text-sm text-indigo-200/70">
                    {property.pricePerSqft > 0 ? `$${property.pricePerSqft}/sqft` : "Price/sqft N/A"}
                  </span>
                </div>
              </div>

              {/* Property Details */}
              <div className="flex items-center gap-4 text-sm text-indigo-200/70">
                <div className="flex items-center gap-1">
                  <Bed className="w-4 h-4" />
                  <span>{property.bedrooms || 0} bed</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="w-4 h-4" />
                  <span>{property.bathrooms || 0} bath</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square className="w-4 h-4" />
                  <span>{property.sqft ? property.sqft.toLocaleString() : "N/A"} sqft</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{property.yearBuilt}</span>
                </div>
              </div>

              {/* Neighborhood Info */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-indigo-200/70">{property.neighborhood}</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <School className="w-3 h-3 text-yellow-400" />
                    <span className="text-indigo-200/70">{property.schoolRating}/10</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Car className="w-3 h-3 text-blue-400" />
                    <span className="text-indigo-200/70">Walk: {property.walkScore}</span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              {(property.taxes || property.hoa) && (
                <div className="flex items-center justify-between text-xs text-indigo-200/60">
                  {property.taxes && <span>Taxes: ${property.taxes.toLocaleString()}/yr</span>}
                  {property.hoa && <span>HOA: ${property.hoa.toLocaleString()}/mo</span>}
                </div>
              )}

              {/* Holographic Features */}
              {property.isHolographic && property.holographicFeatures && (
                <div className="flex flex-wrap gap-1">
                  {property.holographicFeatures.slice(0, 2).map((feature, index) => (
                    <Badge
                      key={index}
                      className="text-xs bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border-cyan-400/30 text-cyan-300"
                    >
                      {feature}
                    </Badge>
                  ))}
                  {property.holographicFeatures.length > 2 && (
                    <Badge className="text-xs bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border-cyan-400/30 text-cyan-300">
                      +{property.holographicFeatures.length - 2}
                    </Badge>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  className={`flex-1 text-white transition-all duration-200 ${
                    property.isHolographic
                      ? "bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-cyan-500/25"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-indigo-500/25"
                  }`}
                  size="sm"
                  onClick={() => setShowBidModal(true)}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Place Bid
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault()
                    if (inComparison) {
                      removeFromComparison(property.id)
                    } else if (canAddToComparison) {
                      addToComparison(property)
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

      {/* Bid Modal */}
      <BidModal isOpen={showBidModal} onClose={() => setShowBidModal(false)} property={property} />
    </>
  )
}
