"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
}

interface PaginatedPropertyGridProps {
  properties: Property[]
  itemsPerPage: number
  viewMode: "grid" | "list"
  renderProperty: (property: Property) => React.ReactNode
}

export function PaginatedPropertyGrid({
  properties,
  itemsPerPage,
  viewMode,
  renderProperty,
}: PaginatedPropertyGridProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(properties.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProperties = properties.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🏠</div>
        <h3 className="text-xl font-semibold text-white mb-2">No properties found</h3>
        <p className="text-indigo-200/70">Try adjusting your search criteria</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Property Grid */}
      <div
        className={cn(
          viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-6",
        )}
      >
        {currentProperties.map(renderProperty)}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center space-x-1">
            {getVisiblePages().map((page, index) => (
              <div key={index}>
                {page === "..." ? (
                  <span className="px-3 py-2 text-white/50">...</span>
                ) : (
                  <Button
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(page as number)}
                    className={cn(
                      "w-10 h-10",
                      currentPage === page
                        ? "bg-gradient-to-r from-cyan-600 to-purple-600 text-white"
                        : "border-white/20 text-white hover:bg-white/10",
                    )}
                  >
                    {page}
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border-white/20 text-white hover:bg-white/10"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Results Info */}
      <div className="text-center text-sm text-indigo-200/70">
        Showing {startIndex + 1}-{Math.min(endIndex, properties.length)} of {properties.length} properties
      </div>
    </div>
  )
}
