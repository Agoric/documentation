"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

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

interface PropertyComparisonContextType {
  comparisonProperties: Property[]
  addToComparison: (property: Property) => void
  removeFromComparison: (propertyId: string) => void
  clearComparison: () => void
  isInComparison: (propertyId: string) => boolean
  maxComparisonItems: number
}

const PropertyComparisonContext = createContext<PropertyComparisonContextType | undefined>(undefined)

export function PropertyComparisonProvider({ children }: { children: ReactNode }) {
  const [comparisonProperties, setComparisonProperties] = useState<Property[]>([])
  const maxComparisonItems = 3

  const addToComparison = (property: Property) => {
    setComparisonProperties((prev) => {
      if (prev.length >= maxComparisonItems) return prev
      if (prev.some((p) => p.id === property.id)) return prev
      return [...prev, property]
    })
  }

  const removeFromComparison = (propertyId: string) => {
    setComparisonProperties((prev) => prev.filter((p) => p.id !== propertyId))
  }

  const clearComparison = () => {
    setComparisonProperties([])
  }

  const isInComparison = (propertyId: string) => {
    return comparisonProperties.some((p) => p.id === propertyId)
  }

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
