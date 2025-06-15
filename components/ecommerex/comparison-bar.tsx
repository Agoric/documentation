"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, BarChart3, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useProductComparison } from "@/contexts/product-comparison-context"
import { ProductComparisonModal } from "./product-comparison-modal"
import Image from "next/image"

export function ComparisonBar() {
  const { comparisonProducts, removeFromComparison, clearComparison, maxComparisonItems } = useProductComparison()
  const [isExpanded, setIsExpanded] = useState(true)
  const [showModal, setShowModal] = useState(false)

  if (comparisonProducts.length === 0) {
    return null
  }

  return (
    <>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-950/95 via-purple-950/95 to-cyan-950/95 backdrop-blur-xl border-t border-indigo-500/20"
      >
        {/* Toggle Button */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-indigo-300 hover:text-white hover:bg-indigo-900/30 rounded-t-lg rounded-b-none border-t border-l border-r border-indigo-500/20"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            Compare ({comparisonProducts.length})
          </Button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-indigo-300" />
                    <h3 className="text-lg font-semibold text-white">Product Comparison</h3>
                    <Badge variant="outline" className="border-indigo-400/30 text-indigo-300">
                      {comparisonProducts.length}/{maxComparisonItems}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setShowModal(true)}
                      disabled={comparisonProducts.length < 2}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50"
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Compare Now
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
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2">
                  {comparisonProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex-shrink-0 relative bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-lg p-3 border border-indigo-500/20 min-w-[200px]"
                    >
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFromComparison(product.id)}
                        className="absolute top-1 right-1 h-6 w-6 text-indigo-300 hover:text-red-300 hover:bg-red-900/20"
                      >
                        <X className="w-3 h-3" />
                      </Button>

                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white text-sm line-clamp-1">{product.name}</h4>
                          <p className="text-indigo-300 text-xs">${product.price.toFixed(2)}</p>
                          <Badge className="mt-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs">
                            {product.category}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Add more placeholder */}
                  {comparisonProducts.length < maxComparisonItems && (
                    <div className="flex-shrink-0 min-w-[200px] h-[80px] border-2 border-dashed border-indigo-500/30 rounded-lg flex items-center justify-center">
                      <div className="text-center text-indigo-300/70">
                        <div className="text-sm">Add more products</div>
                        <div className="text-xs">({maxComparisonItems - comparisonProducts.length} remaining)</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <ProductComparisonModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
