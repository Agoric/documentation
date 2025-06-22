"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, BarChart3, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useProductComparison } from "@/contexts/product-comparison-context"
import Image from "next/image"

export function ComparisonBar() {
  const { comparisonProducts, removeFromComparison, clearComparison } = useProductComparison()
  const [isExpanded, setIsExpanded] = useState(false)

  if (comparisonProducts.length === 0) return null

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl"
    >
      <div className="rounded-lg border border-indigo-500/20 bg-gradient-to-r from-indigo-950/90 to-purple-950/90 backdrop-blur-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-indigo-300" />
            <span className="font-medium text-white">
              Compare Products ({comparisonProducts.length}/{4})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30"
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
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

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border-t border-indigo-500/20 p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {comparisonProducts.map((product) => (
                    <div
                      key={product.id}
                      className="relative rounded-lg border border-indigo-500/20 bg-indigo-950/30 p-3"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromComparison(product.id)}
                        className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-red-600 text-white hover:bg-red-700"
                      >
                        <X className="h-3 w-3" />
                      </Button>

                      <div className="space-y-2">
                        <div className="aspect-square overflow-hidden rounded-md bg-indigo-900/20">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={80}
                            height={80}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <h4 className="text-sm font-medium text-white line-clamp-2">{product.name}</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-indigo-300">${product.price.toFixed(2)}</span>
                          <Badge variant="outline" className="text-xs border-indigo-400/30 text-indigo-300">
                            {product.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-center">
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Compare Now
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
