"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

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

interface PropertyComparisonContextType {
  comparisonProperties: Property[]
  addToComparison: (property: Property) => void
  removeFromComparison: (propertyId: string) => void
  clearComparison: () => void
  isInComparison: (propertyId: string) => boolean
  maxComparisonItems: number
}

const PropertyComparisonContext = createContext<PropertyComparisonContextType | undefined>(undefined)

export function PropertyComparisonProvider({ children }: { children: React.ReactNode }) {
  const [comparisonProperties, setComparisonProperties] = useState<Property[]>([])
  const maxComparisonItems = 4

  const addToComparison = useCallback(
    (property: Property) => {
      setComparisonProperties((prev) => {
        if (prev.length >= maxComparisonItems) return prev
        if (prev.some((p) => p.id === property.id)) return prev
        return [...prev, property]
      })
    },
    [maxComparisonItems],
  )

  const removeFromComparison = useCallback((propertyId: string) => {
    setComparisonProperties((prev) => prev.filter((p) => p.id !== propertyId))
  }, [])

  const clearComparison = useCallback(() => {
    setComparisonProperties([])
  }, [])

  const isInComparison = useCallback(
    (propertyId: string) => {
      return comparisonProperties.some((p) => p.id === propertyId)
    },
    [comparisonProperties],
  )

  return (
    <PropertyComparisonContext.Provider
      value={{
        comparisonProperties,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
        maxComparisonItems,
      }}
    >
      {children}
    </PropertyComparisonContext.Provider>
  )
}

export function usePropertyComparison() {
  const context = useContext(PropertyComparisonContext)
  if (context === undefined) {
    throw new Error("usePropertyComparison must be used within a PropertyComparisonProvider")
  }
  return context
}
