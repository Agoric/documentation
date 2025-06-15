"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  stock: number
  platforms: string[]
  specifications?: Record<string, string>
  features?: string[]
  pros?: string[]
  cons?: string[]
}

interface ProductComparisonContextType {
  comparisonProducts: Product[]
  addToComparison: (product: Product) => void
  removeFromComparison: (productId: string) => void
  clearComparison: () => void
  isInComparison: (productId: string) => boolean
  maxComparisonItems: number
}

const ProductComparisonContext = createContext<ProductComparisonContextType | undefined>(undefined)

export function ProductComparisonProvider({ children }: { children: React.ReactNode }) {
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([])
  const maxComparisonItems = 4

  const addToComparison = useCallback(
    (product: Product) => {
      setComparisonProducts((prev) => {
        if (prev.length >= maxComparisonItems) {
          return prev
        }
        if (prev.some((p) => p.id === product.id)) {
          return prev
        }
        return [...prev, product]
      })
    },
    [maxComparisonItems],
  )

  const removeFromComparison = useCallback((productId: string) => {
    setComparisonProducts((prev) => prev.filter((p) => p.id !== productId))
  }, [])

  const clearComparison = useCallback(() => {
    setComparisonProducts([])
  }, [])

  const isInComparison = useCallback(
    (productId: string) => {
      return comparisonProducts.some((p) => p.id === productId)
    },
    [comparisonProducts],
  )

  return (
    <ProductComparisonContext.Provider
      value={{
        comparisonProducts,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
        maxComparisonItems,
      }}
    >
      {children}
    </ProductComparisonContext.Provider>
  )
}

export function useProductComparison() {
  const context = useContext(ProductComparisonContext)
  if (context === undefined) {
    throw new Error("useProductComparison must be used within a ProductComparisonProvider")
  }
  return context
}
