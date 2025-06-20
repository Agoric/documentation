"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, BarChart3, Zap, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePropertyComparison } from "@/contexts/property-comparison-context"
import Image from "next/image"

export function PropertyComparisonBar() {
  const { comparisonProperties, removeFromComparison, clearComparison, maxComparisonItems } = usePropertyComparison()

  if (comparisonProperties.length === 0) return null

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`
    }
    return `$${(price / 1000).toFixed(0)}K`
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-4 right-4 z-50"
      >
        <div className="mx-auto max-w-6xl">
          <div className="rounded-lg border border-indigo-500/20 bg-gradient-to-r from-indigo-950/90 via-purple-950/90 to-cyan-950/90 backdrop-blur-sm p-4 shadow-xl">
            {/* Holographic Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-indigo-400/5 to-purple-400/5 rounded-lg" />

            {/* Animated Border */}
            <motion.div
              className="absolute inset-0 border border-cyan-400/30 rounded-lg"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.005, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <BarChart3 className="w-5 h-5 text-cyan-400" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text">
                      Property Comparison
                    </h3>
                  </div>
                  <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    {comparisonProperties.length}/{maxComparisonItems}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  {comparisonProperties.length >= 2 && (
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 text-white"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Compare Properties
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearComparison}
                    className="border-red-500/20 bg-red-950/30 text-red-300 hover:bg-red-900/30 hover:text-red-200"
                  >
                    Clear All
                  </Button>
                </div>
              </div>

              {/* Property Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {comparisonProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className="relative overflow-hidden rounded-lg border border-indigo-500/20 bg-gradient-to-br from-indigo-950/60 to-purple-950/60 p-3">
                      {/* Enhanced effects for holographic properties */}
                      {property.isHolographic && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-400/10" />
                          <motion.div
                            className="absolute inset-0 border border-cyan-400/40 rounded-lg"
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{
                              duration: 1.5,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                          />
                        </>
                      )}

                      {/* Remove Button */}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFromComparison(property.id)}
                        className="absolute top-1 right-1 h-6 w-6 bg-black/50 hover:bg-red-950/50 text-white hover:text-red-300 z-20"
                      >
                        <X className="h-3 w-3" />
                      </Button>

                      <div className="relative z-10">
                        {/* Property Image */}
                        <div className="relative aspect-video mb-2 overflow-hidden rounded">
                          <Image
                            src={property.image || "/placeholder.svg"}
                            alt={property.title}
                            fill
                            className="object-cover"
                          />
                          {property.isHolographic && (
                            <div className="absolute top-1 left-1">
                              <Badge className="text-xs bg-gradient-to-r from-cyan-600 to-purple-600 text-white">
                                <Zap className="w-3 h-3 mr-1" />
                                Holographic
                              </Badge>
                            </div>
                          )}
                        </div>

                        {/* Property Info */}
                        <div className="space-y-1">
                          <h4
                            className={`font-medium text-sm line-clamp-1 ${
                              property.isHolographic
                                ? "text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text"
                                : "text-white"
                            }`}
                          >
                            {property.title}
                          </h4>
                          <p className="text-xs text-indigo-200/70 line-clamp-1">{property.location}</p>
                          <div
                            className={`text-lg font-bold ${
                              property.isHolographic
                                ? "text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text"
                                : "text-white"
                            }`}
                          >
                            {formatPrice(property.price)}
                          </div>
                          <div className="flex justify-between text-xs text-indigo-200/70">
                            <span>
                              {property.bedrooms} bed, {property.bathrooms} bath
                            </span>
                            <span>{property.sqft.toLocaleString()} sq ft</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Empty Slots */}
                {Array.from({ length: maxComparisonItems - comparisonProperties.length }).map((_, index) => (
                  <motion.div
                    key={`empty-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative"
                  >
                    <div className="rounded-lg border-2 border-dashed border-indigo-500/20 bg-indigo-950/20 p-8 text-center">
                      <BarChart3 className="w-8 h-8 text-indigo-400/30 mx-auto mb-2" />
                      <p className="text-sm text-indigo-300/50">Add property to compare</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
