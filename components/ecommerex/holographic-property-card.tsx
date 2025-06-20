"use client"

import { useState } from "react"
import { Star, MapPin, Calendar, Ruler, Bath, Bed, Eye, BarChart3, Gavel, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DiamondSlabCard } from "@/components/ui/diamond-slab-card"
import { Property360Modal } from "./property-360-modal"
import { usePropertyComparison } from "@/contexts/property-comparison-context"
import { PropertyImageGallery } from "./property-image-gallery"
import { PropertyDetailModal } from "./property-detail-modal"

interface Property {
  id: string
  title: string
  description: string
  price: number
  monthlyPayment: number
  image: string
  images: string[]
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
  const [showDetailModal, setShowDetailModal] = useState(false)

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
          {/* Property Image Gallery */}
          <div className="mb-4">
            <PropertyImageGallery
              images={property.images || [property.image]}
              title={property.title}
              isHolographic={property.isHolographic}
              has360View={property.has360View}
              onView360={() => setShow360Modal(true)}
            />
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
                onClick={(e) => {
                  e.preventDefault()
                  setShowDetailModal(true)
                }}
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

      {/* Property Detail Modal */}
      {showDetailModal && (
        <PropertyDetailModal property={property} isOpen={showDetailModal} onClose={() => setShowDetailModal(false)} />
      )}
    </>
  )
}
