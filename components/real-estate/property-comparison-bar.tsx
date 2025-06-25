"use client"

import { X, BarChart3, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePropertyComparison } from "@/contexts/property-comparison-context"
import { motion, AnimatePresence } from "framer-motion"

export function ComparisonBar() {
  const { comparisonProperties, removeFromComparison, clearComparison } = usePropertyComparison()

  if (comparisonProperties.length === 0) {
    return null
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-950/95 via-purple-950/95 to-cyan-950/95 backdrop-blur-sm border-t border-white/20 p-4"
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-cyan-400" />
                <span className="font-semibold text-white">Compare Properties</span>
                <Badge variant="secondary" className="bg-cyan-600/20 text-cyan-300">
                  {comparisonProperties.length}/4
                </Badge>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto">
                {comparisonProperties.map((property) => (
                  <div key={property.id} className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 min-w-0">
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-white truncate max-w-32">
                        {property.address.split(",")[0]}
                      </div>
                      <div className="text-xs text-indigo-200/70">{formatPrice(property.price)}</div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromComparison(property.id)}
                      className="h-6 w-6 p-0 hover:bg-red-500/20"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearComparison}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Clear All
              </Button>
              <Button
                size="sm"
                disabled={comparisonProperties.length < 2}
                className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white"
              >
                <Eye className="h-4 w-4 mr-2" />
                Compare ({comparisonProperties.length})
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
