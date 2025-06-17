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
  Info,
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
  const [showDetails, setShowDetails] = useState(false)

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

            {/* Action Buttons Overlay */}
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              {/* Like Button */}
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all duration-200"
                onClick={(e) => {
                  e.preventDefault()
                  setIsLiked(!isLiked)
                }}
                title={isLiked ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart
                  className={`h-4 w-4 transition-all duration-200 ${isLiked ? "fill-red-500 text-red-500 scale-110" : "text-white"}`}
                />
              </Button>

              {/* 360° View Button */}
              {property.has360View && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 bg-cyan-600/20 backdrop-blur-sm border border-cyan-400/30 text-cyan-300 hover:bg-cyan-600/30 hover:text-cyan-200 transition-all duration-200"
                  onClick={(e) => {
                    e.preventDefault()
                    setShow360Modal(true)
                  }}
                  title="360° Virtual Tour"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              )}

              {/* Details Button */}
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 bg-indigo-600/20 backdrop-blur-sm border border-indigo-400/30 text-indigo-300 hover:bg-indigo-600/30 hover:text-indigo-200 transition-all duration-200"
                onClick={(e) => {
                  e.preventDefault()
                  setShowDetails(!showDetails)
                }}
                title="Property Details"
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>

            {/* Property Labels */}
            <div className="absolute top-2 left-2 flex flex-col gap-2">
              {/* Holographic Label */}
              {property.isHolographic && <HolographicLabel variant="premium" features={property.holographicFeatures} />}

              {/* Property Type Badge */}
              <Badge
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                style={{
                  clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                }}
              >
                <span className="font-serif text-xs">GENUS:</span> {property.type}
              </Badge>

              {/* Status Badge */}
              <Badge
                className={`shadow-lg ${
                  property.status === "For Sale"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600"
                    : property.status === "For Rent"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                      : "bg-gradient-to-r from-gray-600 to-slate-600"
                } text-white`}
                style={{
                  clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                }}
              >
                <span className="font-serif text-xs">STATUS:</span> {property.status}
              </Badge>
            </div>

            {/* Market Indicators */}
            <div className="absolute bottom-2 left-2 flex gap-2">
              {/* Days on Market */}
              {property.daysOnMarket < 30 && (
                <Badge
                  className="bg-emerald-600 text-white shadow-lg"
                  style={{
                    clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                  }}
                  title="Days on Market"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  <span className="font-serif text-xs">DIES:</span> {property.daysOnMarket}
                </Badge>
              )}
            </div>
          </div>

          {/* Property Information */}
          <div className="space-y-3">
            {/* Title and Location */}
            <div>
              <h3
                className={`font-semibold text-lg line-clamp-2 transition-colors ${
                  property.isHolographic
                    ? "text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text group-hover:from-cyan-200 group-hover:to-purple-200"
                    : "text-white group-hover:text-cyan-300"
                }`}
              >
                {property.title}
              </h3>
              <div className="flex items-center text-sm text-indigo-200/70 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="font-serif text-xs">LOCUS:</span>
                <span className="ml-1">{property.location}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-indigo-200/70 line-clamp-2">{property.description}</p>

            {/* Property Specifications */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center text-indigo-200/70">
                <Bed className="w-4 h-4 mr-1" />
                <span className="font-serif text-xs">CUBICULA:</span>
                <span className="ml-1">{property.bedrooms}</span>
              </div>
              <div className="flex items-center text-indigo-200/70">
                <Bath className="w-4 h-4 mr-1" />
                <span className="font-serif text-xs">BALNEA:</span>
                <span className="ml-1">{property.bathrooms}</span>
              </div>
              <div className="flex items-center text-indigo-200/70">
                <Ruler className="w-4 h-4 mr-1" />
                <span className="font-serif text-xs">AREA:</span>
                <span className="ml-1">{property.sqft.toLocaleString()} sq ft</span>
              </div>
              <div className="flex items-center text-indigo-200/70">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="font-serif text-xs">ANNUS:</span>
                <span className="ml-1">{property.yearBuilt}</span>
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
                <span className="font-serif text-xs">AESTIMATIO:</span> {property.rating.toFixed(1)} (
                {Math.floor(Math.random() * 100) + 10} reviews)
              </span>
            </div>

            {/* Pricing Information */}
            <div className="space-y-1">
              <div
                className={`text-2xl font-bold ${
                  property.isHolographic
                    ? "text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text"
                    : "text-white"
                }`}
              >
                <span className="font-serif text-sm text-amber-300">PRETIUM:</span> {formatPrice(property.price)}
              </div>
              <div className="text-sm text-indigo-200/70">
                <span className="font-serif text-xs">MENSILIS:</span> ${property.monthlyPayment.toLocaleString()}/month
                • ${property.pricePerSqft}/sq ft
              </div>
            </div>

            {/* Property Features */}
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
                  +{property.features.length - 3} more
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
                title="Place Bid • Submit an offer"
              >
                <Gavel className="w-4 h-4 mr-2" />
                <span className="font-serif text-xs">OFFERRE</span>
                <span className="ml-1 text-xs">Place Bid</span>
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
                title="Add to Goals • Save for later"
              >
                <Target className="w-4 h-4 mr-2" />
                <span className="font-serif text-xs">META</span>
                <span className="ml-1 text-xs">Add Goal</span>
              </Button>
            </div>

            {/* Secondary Actions */}
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
                title={inComparison ? "Remove from comparison" : "Add to comparison"}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                <span className="font-serif text-xs">COMPARARE</span>
                <span className="ml-1 text-xs">{inComparison ? "Added" : "Compare"}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200 transition-all duration-200"
                style={{
                  clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
                }}
                title="View Details • See full information"
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
