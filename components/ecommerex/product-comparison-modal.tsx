"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Star, Check, Minus, ShoppingCart, Eye, Download, Share2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useProductComparison } from "@/contexts/product-comparison-context"
import Image from "next/image"

interface ProductComparisonModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProductComparisonModal({ isOpen, onClose }: ProductComparisonModalProps) {
  const { comparisonProducts, removeFromComparison, clearComparison } = useProductComparison()
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "features">("overview")

  if (comparisonProducts.length === 0) {
    return null
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
      />
    ))
  }

  const getWinner = (field: keyof (typeof comparisonProducts)[0], isHigherBetter = true) => {
    if (comparisonProducts.length === 0) return null

    const values = comparisonProducts.map((p, index) => ({ value: p[field], index }))
    const sortedValues = values.sort((a, b) => {
      if (typeof a.value === "number" && typeof b.value === "number") {
        return isHigherBetter ? b.value - a.value : a.value - b.value
      }
      return 0
    })

    return sortedValues[0]?.index
  }

  const priceWinner = getWinner("price", false) // Lower price is better
  const ratingWinner = getWinner("rating", true) // Higher rating is better
  const stockWinner = getWinner("stock", true) // Higher stock is better

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] bg-gradient-to-br from-indigo-950/95 via-purple-950/95 to-cyan-950/95 border-indigo-500/20 backdrop-blur-xl">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-2xl font-bold text-white">Product Comparison</DialogTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearComparison}
              className="border-red-500/20 bg-red-950/30 text-red-300 hover:bg-red-900/30"
            >
              Clear All
            </Button>
          </div>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex space-x-1 bg-indigo-950/30 p-1 rounded-lg mb-6">
          {[
            { id: "overview", label: "Overview" },
            { id: "specs", label: "Specifications" },
            { id: "features", label: "Features" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                  : "text-indigo-300 hover:text-white hover:bg-indigo-900/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-6">
            {/* Product Headers */}
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: `200px repeat(${comparisonProducts.length}, 1fr)` }}
            >
              <div></div>
              {comparisonProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="relative bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-lg p-4 border border-indigo-500/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeFromComparison(product.id)}
                    className="absolute top-2 right-2 h-6 w-6 text-indigo-300 hover:text-red-300 hover:bg-red-900/20"
                  >
                    <X className="w-4 h-4" />
                  </Button>

                  <div className="text-center space-y-3">
                    <div className="relative w-20 h-20 mx-auto">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="font-semibold text-white text-sm line-clamp-2">{product.name}</h3>
                    <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                      {product.category}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Comparison Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "overview" && (
                  <div className="space-y-4">
                    {/* Price Comparison */}
                    <div
                      className="grid gap-4"
                      style={{ gridTemplateColumns: `200px repeat(${comparisonProducts.length}, 1fr)` }}
                    >
                      <div className="flex items-center text-indigo-200 font-medium">Price</div>
                      {comparisonProducts.map((product, index) => (
                        <div
                          key={product.id}
                          className={`p-3 rounded-lg text-center ${
                            index === priceWinner
                              ? "bg-emerald-900/30 border border-emerald-500/30"
                              : "bg-indigo-950/30 border border-indigo-500/20"
                          }`}
                        >
                          <div className="text-xl font-bold text-white">${product.price.toFixed(2)}</div>
                          {index === priceWinner && (
                            <Badge className="mt-1 bg-emerald-600 text-white text-xs">Best Price</Badge>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Rating Comparison */}
                    <div
                      className="grid gap-4"
                      style={{ gridTemplateColumns: `200px repeat(${comparisonProducts.length}, 1fr)` }}
                    >
                      <div className="flex items-center text-indigo-200 font-medium">Rating</div>
                      {comparisonProducts.map((product, index) => (
                        <div
                          key={product.id}
                          className={`p-3 rounded-lg text-center ${
                            index === ratingWinner
                              ? "bg-emerald-900/30 border border-emerald-500/30"
                              : "bg-indigo-950/30 border border-indigo-500/20"
                          }`}
                        >
                          <div className="flex justify-center mb-1">{renderStars(product.rating)}</div>
                          <div className="text-white font-medium">{product.rating}/5</div>
                          {index === ratingWinner && (
                            <Badge className="mt-1 bg-emerald-600 text-white text-xs">Highest Rated</Badge>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Stock Comparison */}
                    <div
                      className="grid gap-4"
                      style={{ gridTemplateColumns: `200px repeat(${comparisonProducts.length}, 1fr)` }}
                    >
                      <div className="flex items-center text-indigo-200 font-medium">Stock</div>
                      {comparisonProducts.map((product, index) => (
                        <div
                          key={product.id}
                          className={`p-3 rounded-lg text-center ${
                            index === stockWinner
                              ? "bg-emerald-900/30 border border-emerald-500/30"
                              : "bg-indigo-950/30 border border-indigo-500/20"
                          }`}
                        >
                          <div className="text-white font-medium">{product.stock} units</div>
                          {index === stockWinner && (
                            <Badge className="mt-1 bg-emerald-600 text-white text-xs">Most Stock</Badge>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Platforms */}
                    <div
                      className="grid gap-4"
                      style={{ gridTemplateColumns: `200px repeat(${comparisonProducts.length}, 1fr)` }}
                    >
                      <div className="flex items-center text-indigo-200 font-medium">Platforms</div>
                      {comparisonProducts.map((product) => (
                        <div key={product.id} className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/20">
                          <div className="flex flex-wrap gap-1">
                            {product.platforms.map((platform) => (
                              <Badge
                                key={platform}
                                variant="outline"
                                className="text-xs border-indigo-400/30 text-indigo-300"
                              >
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "specs" && (
                  <div className="space-y-4">
                    {/* Mock specifications - in real app, these would come from product data */}
                    {[
                      {
                        label: "Dimensions",
                        values: [
                          "5.4 x 2.7 x 0.3 in",
                          "6.1 x 3.0 x 0.3 in",
                          "5.8 x 2.8 x 0.3 in",
                          "5.2 x 2.6 x 0.3 in",
                        ],
                      },
                      { label: "Weight", values: ["0.5 lbs", "0.7 lbs", "0.6 lbs", "0.4 lbs"] },
                      { label: "Battery Life", values: ["24 hours", "18 hours", "20 hours", "30 hours"] },
                      {
                        label: "Connectivity",
                        values: ["Bluetooth 5.0", "Bluetooth 5.2", "Bluetooth 5.1", "Bluetooth 5.0"],
                      },
                      { label: "Warranty", values: ["1 year", "2 years", "1 year", "1 year"] },
                    ].map((spec, specIndex) => (
                      <div
                        key={spec.label}
                        className="grid gap-4"
                        style={{ gridTemplateColumns: `200px repeat(${comparisonProducts.length}, 1fr)` }}
                      >
                        <div className="flex items-center text-indigo-200 font-medium">{spec.label}</div>
                        {comparisonProducts.map((product, index) => (
                          <div
                            key={product.id}
                            className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-center"
                          >
                            <div className="text-white">{spec.values[index] || "N/A"}</div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "features" && (
                  <div className="space-y-4">
                    {/* Mock features comparison */}
                    {[
                      { label: "Noise Cancellation", values: [true, true, false, true] },
                      { label: "Water Resistant", values: [true, false, true, true] },
                      { label: "Fast Charging", values: [true, true, true, false] },
                      { label: "Voice Assistant", values: [true, true, false, true] },
                      { label: "Touch Controls", values: [false, true, true, true] },
                      { label: "Wireless Charging", values: [true, false, false, true] },
                    ].map((feature) => (
                      <div
                        key={feature.label}
                        className="grid gap-4"
                        style={{ gridTemplateColumns: `200px repeat(${comparisonProducts.length}, 1fr)` }}
                      >
                        <div className="flex items-center text-indigo-200 font-medium">{feature.label}</div>
                        {comparisonProducts.map((product, index) => (
                          <div
                            key={product.id}
                            className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-center"
                          >
                            {feature.values[index] ? (
                              <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                            ) : (
                              <Minus className="w-5 h-5 text-gray-400 mx-auto" />
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Action Buttons */}
            <Separator className="bg-indigo-500/20" />
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: `200px repeat(${comparisonProducts.length}, 1fr)` }}
            >
              <div className="flex items-center text-indigo-200 font-medium">Actions</div>
              {comparisonProducts.map((product) => (
                <div key={product.id} className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Buy
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
