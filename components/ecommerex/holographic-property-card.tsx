"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Star,
  MapPin,
  Calendar,
  Ruler,
  Bath,
  Bed,
  Eye,
  Heart,
  Zap,
  BarChart3,
  ImageIcon,
  RotateCcw,
  Gavel,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DiamondSlabCard } from "@/components/ui/diamond-slab-card"
import { HolographicLabel } from "./holographic-label"
import { Property360Modal } from "./property-360-modal"
import Image from "next/image"
import { usePropertyComparison } from "@/contexts/property-comparison-context"

interface Property {
  id: string
  title: string
  description: string
  price: number
  monthlyPayment: number
  image: string
  type: string
  bedrooms: number
  bathrooms: number
  sqft: number
  yearBuilt: number
  rating: number
  location: string
  status: string
  features: string[]
  isHolographic?: boolean
  holographicFeatures?: string[]
  has360View?: boolean
  images360?: string[]
  daysOnMarket: number
  pricePerSqft: number
}

interface HolographicPropertyCardProps {
  property: Property
}

export function HolographicPropertyCard({ property }: HolographicPropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [show360Modal, setShow360Modal] = useState(false)

  const { addToComparison, removeFromComparison, isInComparison, maxComparisonItems, comparisonProperties } =
    usePropertyComparison()
  const inComparison = isInComparison(property.id)
  const canAddToComparison = comparisonProperties.length < maxComparisonItems

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`
    }
    return `$${(price / 1000).toFixed(0)}K`
  }

  const getCardVariant = () => {
    if (property.isHolographic) {
      if (property.price > 2000000) return "quantum"
      if (property.price > 1000000) return "elite"
      return "premium"
    }
    return "default"
  }

  const getLaserColor = () => {
    if (property.type === "Penthouse") return "gold"
    if (property.type === "Villa") return "emerald"
    if (property.type === "Loft") return "purple"
    if (property.type === "Mansion") return "crimson"
    return "cyan"
  }

  return (
    <>
      <DiamondSlabCard
        variant={getCardVariant()}
        intensity={property.isHolographic ? "high" : "medium"}
        laserColor={getLaserColor()}
        isHovered={isHovered}
        className="h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-6">
          {/* Property Image */}
          <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
            <div
              className="relative w-full h-full"
              style={{
                clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
              }}
            >
              {!imageError ? (
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                  style={{
                    filter: property.isHolographic
                      ? "brightness(1.2) contrast(1.2) saturate(1.3) hue-rotate(5deg)"
                      : "brightness(1.1) contrast(1.1) saturate(1.1)",
                  }}
                  onError={() => setImageError(true)}
                  priority={false}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-800/30 to-purple-800/30">
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 text-indigo-400/50 mx-auto mb-2" />
                    <p className="text-xs text-indigo-300/70">Property Image</p>
                  </div>
                </div>
              )}

              {/* Holographic overlay */}
              {property.isHolographic && (
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(45deg, ${getLaserColor() === "gold" ? "rgba(251, 191, 36, 0.1)" : "rgba(34, 211, 238, 0.1)"}, transparent, rgba(103, 232, 249, 0.1))`,
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
            </div>

            {/* 360° View Button */}
            {property.has360View && (
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

            {/* Holographic Label */}
            {property.isHolographic && (
              <div className="absolute top-2 left-2 z-30">
                <HolographicLabel variant="premium" features={property.holographicFeatures} />
              </div>
            )}

            {/* Property Type Badge */}
            <Badge
              className={`absolute ${property.isHolographic ? "top-14 left-2" : "top-2 left-2"} bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg`}
              style={{
                clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}
            >
              {property.type}
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
              <Badge
                className="absolute bottom-2 left-2 bg-emerald-600 text-white shadow-lg"
                style={{
                  clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                }}
              >
                <Zap className="w-3 h-3 mr-1" />
                {property.daysOnMarket} days
              </Badge>
            )}
          </div>

          {/* Property Info */}
          <div className="space-y-3">
            <h3
              className={`font-semibold text-lg line-clamp-2 transition-colors ${
                property.isHolographic
                  ? "text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text group-hover:from-cyan-200 group-hover:to-purple-200"
                  : "text-white group-hover:text-cyan-300"
              }`}
            >
              {property.title}
            </h3>

            <div className="flex items-center text-sm text-indigo-200/70">
              <MapPin className="w-4 h-4 mr-1" />
              {property.location}
            </div>

            <p className="text-sm text-indigo-200/70 line-clamp-2">{property.description}</p>

            {/* Property Details */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center text-indigo-200/70">
                <Bed className="w-4 h-4 mr-1" />
                {property.bedrooms} beds
              </div>
              <div className="flex items-center text-indigo-200/70">
                <Bath className="w-4 h-4 mr-1" />
                {property.bathrooms} baths
              </div>
              <div className="flex items-center text-indigo-200/70">
                <Ruler className="w-4 h-4 mr-1" />
                {property.sqft.toLocaleString()} sq ft
              </div>
              <div className="flex items-center text-indigo-200/70">
                <Calendar className="w-4 h-4 mr-1" />
                Built {property.yearBuilt}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 transition-colors ${
                      i < Math.floor(property.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-indigo-200/70">
                {property.rating} ({Math.floor(Math.random() * 100) + 10} reviews)
              </span>
            </div>

            {/* Price and Monthly Payment */}
            <div className="space-y-1">
              <div
                className={`text-2xl font-bold ${
                  property.isHolographic
                    ? "text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text"
                    : "text-white"
                }`}
              >
                {formatPrice(property.price)}
              </div>
              <div className="text-sm text-indigo-200/70">
                ${property.monthlyPayment.toLocaleString()}/month • ${property.pricePerSqft}/sq ft
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1">
              {property.features.slice(0, 3).map((feature) => (
                <Badge
                  key={feature}
                  variant="outline"
                  className="text-xs border-indigo-400/30 text-indigo-300"
                  style={{
                    clipPath: "polygon(3px 0%, 100% 0%, calc(100% - 3px) 100%, 0% 100%)",
                  }}
                >
                  {feature}
                </Badge>
              ))}
              {property.features.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs border-indigo-400/30 text-indigo-300"
                  style={{
                    clipPath: "polygon(3px 0%, 100% 0%, calc(100% - 3px) 100%, 0% 100%)",
                  }}
                >
                  +{property.features.length - 3}
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button
                className={`text-white transition-all duration-200 ${
                  property.isHolographic
                    ? "bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-cyan-500/25"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-indigo-500/25"
                }`}
                size="sm"
                style={{
                  clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                }}
              >
                <Gavel className="w-4 h-4 mr-2" />
                Place Bid
              </Button>
              <Button
                className={`text-white transition-all duration-200 ${
                  property.isHolographic
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-emerald-500/25"
                    : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-emerald-500/25"
                }`}
                size="sm"
                style={{
                  clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                }}
              >
                <Target className="w-4 h-4 mr-2" />
                Add to Goals
              </Button>
            </div>

            {/* Secondary Action Buttons */}
            <div className="flex gap-2">
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
                className={`flex-1 border-indigo-500/20 text-indigo-300 hover:text-indigo-200 transition-all duration-200 ${
                  inComparison
                    ? "bg-emerald-950/30 border-emerald-500/20 text-emerald-300 hover:bg-emerald-900/30"
                    : "bg-indigo-950/30 hover:bg-indigo-900/30"
                }`}
                style={{
                  clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                }}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                {inComparison ? "In Comparison" : "Compare"}
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
              </Button>
            </div>
          </div>
        </div>
      </DiamondSlabCard>

      {/* 360° View Modal */}
      {show360Modal && property.has360View && (
        <Property360Modal property={property} isOpen={show360Modal} onClose={() => setShow360Modal(false)} />
      )}
    </>
  )
}
