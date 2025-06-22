"use client"

import { useState } from "react"
import { X, MapPin, Calendar, Ruler, Bath, Bed, Star, Zap, Heart, BarChart3, Phone, MessageCircle } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyImageGallery } from "./property-image-gallery"
import { Property360Modal } from "./property-360-modal"

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
  virtualTourUrl?: string
  floorPlanUrl?: string
}

interface PropertyDetailModalProps {
  property: Property
  isOpen: boolean
  onClose: () => void
}

export function PropertyDetailModal({ property, isOpen, onClose }: PropertyDetailModalProps) {
  const [show360Modal, setShow360Modal] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`
    }
    return `$${(price / 1000).toFixed(0)}K`
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-indigo-950/95 to-purple-950/95 border-indigo-500/20">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text">
                  {property.title}
                </h2>
                <div className="flex items-center text-indigo-200/70 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="font-serif text-sm">LOCUS:</span>
                  <span className="ml-1">{property.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsLiked(!isLiked)}
                  className="text-indigo-300 hover:text-red-400"
                >
                  <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose} className="text-indigo-300">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Images */}
              <div>
                <PropertyImageGallery
                  images={property.images || [property.image]}
                  title={property.title}
                  isHolographic={property.isHolographic}
                  has360View={property.has360View}
                  onView360={() => setShow360Modal(true)}
                />
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                {/* Price and Status */}
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text">
                    {formatPrice(property.price)}
                  </div>
                  <div className="text-indigo-200/70">
                    <span className="font-serif text-sm">MENSILIS:</span> ${property.monthlyPayment.toLocaleString()}
                    /month • ${property.pricePerSqft}/sq ft
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`${
                        property.status === "For Sale"
                          ? "bg-gradient-to-r from-emerald-600 to-teal-600"
                          : property.status === "For Rent"
                            ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                            : "bg-gradient-to-r from-gray-600 to-slate-600"
                      } text-white`}
                    >
                      {property.status}
                    </Badge>
                    {property.daysOnMarket < 30 && (
                      <Badge className="bg-emerald-600 text-white">
                        <Zap className="w-3 h-3 mr-1" />
                        New Listing
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Property Specs */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-indigo-200/70">
                    <Bed className="w-5 h-5 mr-2" />
                    <div>
                      <div className="font-semibold text-white">{property.bedrooms}</div>
                      <div className="text-xs font-serif">CUBICULA</div>
                    </div>
                  </div>
                  <div className="flex items-center text-indigo-200/70">
                    <Bath className="w-5 h-5 mr-2" />
                    <div>
                      <div className="font-semibold text-white">{property.bathrooms}</div>
                      <div className="text-xs font-serif">BALNEA</div>
                    </div>
                  </div>
                  <div className="flex items-center text-indigo-200/70">
                    <Ruler className="w-5 h-5 mr-2" />
                    <div>
                      <div className="font-semibold text-white">{property.sqft.toLocaleString()}</div>
                      <div className="text-xs font-serif">SQ FT</div>
                    </div>
                  </div>
                  <div className="flex items-center text-indigo-200/70">
                    <Calendar className="w-5 h-5 mr-2" />
                    <div>
                      <div className="font-semibold text-white">{property.yearBuilt}</div>
                      <div className="text-xs font-serif">ANNUS</div>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(property.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-indigo-200/70">
                    {property.rating.toFixed(1)} ({Math.floor(Math.random() * 100) + 10} reviews)
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Agent
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Tour
                  </Button>
                  <Button className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Get Pre-Approved
                  </Button>
                </div>
              </div>
            </div>

            {/* Detailed Information Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-indigo-950/30">
                <TabsTrigger value="overview" className="data-[state=active]:bg-indigo-600">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="features" className="data-[state=active]:bg-indigo-600">
                  Features
                </TabsTrigger>
                <TabsTrigger value="neighborhood" className="data-[state=active]:bg-indigo-600">
                  Neighborhood
                </TabsTrigger>
                <TabsTrigger value="financial" className="data-[state=active]:bg-indigo-600">
                  Financial
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Property Description</h3>
                  <p className="text-indigo-200/70">{property.description}</p>
                </div>

                {property.isHolographic && property.holographicFeatures && (
                  <div>
                    <h3 className="text-lg font-semibold text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text mb-2">
                      Holographic Features
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {property.holographicFeatures.map((feature) => (
                        <Badge key={feature} className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Property Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {property.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="border-indigo-400/30 text-indigo-300">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="neighborhood" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Neighborhood Information</h3>
                  <p className="text-indigo-200/70">
                    Located in the prestigious {property.location.split(",")[0]} area, this property offers convenient
                    access to shopping, dining, entertainment, and transportation. The neighborhood is known for its
                    excellent schools, parks, and community amenities.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="financial" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Purchase Price</h4>
                    <div className="text-2xl font-bold text-cyan-300">{formatPrice(property.price)}</div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Monthly Payment</h4>
                    <div className="text-2xl font-bold text-purple-300">
                      ${property.monthlyPayment.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Price per Sq Ft</h4>
                    <div className="text-xl font-bold text-emerald-300">${property.pricePerSqft}</div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Days on Market</h4>
                    <div className="text-xl font-bold text-amber-300">{property.daysOnMarket} days</div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      {/* 360° View Modal */}
      {show360Modal && property.has360View && (
        <Property360Modal property={property} isOpen={show360Modal} onClose={() => setShow360Modal(false)} />
      )}
    </>
  )
}
