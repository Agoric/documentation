"use client"

import { useState, useEffect } from "react"

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

interface UseZillowPropertiesProps {
  location?: string
  minPrice?: number
  maxPrice?: number
  propertyType?: string
  status?: string
}

interface UseZillowPropertiesReturn {
  properties: Property[]
  loading: boolean
  error: string | null
  total: number
  refetch: () => void
  message?: string
}

export function useZillowProperties({
  location = "New York, NY",
  minPrice = 0,
  maxPrice = 10000000,
  propertyType = "all",
  status = "for_sale",
}: UseZillowPropertiesProps = {}): UseZillowPropertiesReturn {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [message, setMessage] = useState<string>()

  const fetchProperties = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams({
        location,
        minPrice: minPrice.toString(),
        maxPrice: maxPrice.toString(),
        propertyType,
        status,
      })

      console.log("Fetching properties with params:", Object.fromEntries(params))

      const response = await fetch(`/api/zillow/properties?${params}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      console.log("Received property data:", {
        count: data.properties?.length || 0,
        total: data.total,
        message: data.message,
      })

      setProperties(data.properties || [])
      setTotal(data.total || 0)
      setMessage(data.message)

      if (data.error) {
        console.warn("API Warning:", data.error)
      }
    } catch (err) {
      console.error("Error fetching properties:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch properties")

      // Set minimal fallback data on error
      setProperties([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [location, minPrice, maxPrice, propertyType, status])

  return {
    properties,
    loading,
    error,
    total,
    message,
    refetch: fetchProperties,
  }
}
