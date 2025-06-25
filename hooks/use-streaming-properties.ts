"use client"

import { useState, useEffect, useCallback, useRef } from "react"

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

interface StreamEvent {
  type: "status" | "batch_start" | "property" | "error" | "complete"
  data?: Property
  message?: string
  batch?: number
  index?: number
  total?: number
  isDemo?: boolean
  timestamp: string
}

interface UseStreamingPropertiesOptions {
  location?: string
  minPrice?: number
  maxPrice?: number
  propertyType?: string
  batchSize?: number
  autoStart?: boolean
}

export function useStreamingProperties(options: UseStreamingPropertiesOptions = {}) {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<string>("")
  const [isDemo, setIsDemo] = useState(false)
  const [progress, setProgress] = useState<{ current: number; total?: number }>({
    current: 0,
    total: undefined,
  })
  const [isComplete, setIsComplete] = useState(false)

  const abortRef = useRef<AbortController | null>(null)

  const startStreaming = useCallback(async () => {
    setLoading(true)
    setError(null)
    setProperties([])
    setStatus("Initializing...")
    setIsComplete(false)
    setProgress({ current: 0, total: undefined })

    try {
      const params = new URLSearchParams()
      if (options.location) params.append("location", options.location)
      if (options.minPrice) params.append("minPrice", options.minPrice.toString())
      if (options.maxPrice) params.append("maxPrice", options.maxPrice.toString())
      if (options.propertyType) params.append("propertyType", options.propertyType)
      if (options.batchSize) params.append("batchSize", options.batchSize.toString())

      abortRef.current = new AbortController()
      const response = await fetch(`/api/zillow/stream?${params}`, {
        signal: abortRef.current.signal,
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        setError("Streaming is not supported by this environment.")
        setLoading(false)
        return
      }

      const decoder = new TextDecoder()
      let buffer = ""

      while (true) {
        const { done, value } = await reader.read()

        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n")
        buffer = lines.pop() || ""

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const json = line.slice(6)
            try {
              const eventData: StreamEvent = JSON.parse(json)

              switch (eventData.type) {
                case "status":
                case "batch_start":
                  setStatus(eventData.message || "Loading...")
                  break

                case "property":
                  if (eventData.data) {
                    setProperties((prev) => [...prev, eventData.data!])
                    setProgress((prev) => ({ ...prev, current: (eventData.index || 0) + 1 }))
                    setIsDemo(eventData.isDemo || false)
                  }
                  break

                case "error":
                  setError(eventData.message || "Unknown error occurred")
                  setStatus(eventData.message || "Error occurred")
                  break

                case "complete":
                  setStatus(eventData.message || "Streaming complete")
                  setProgress((prev) => ({ ...prev, total: eventData.total || prev.current }))
                  setIsComplete(true)
                  setLoading(false)
                  break
              }
            } catch (parseErr) {
              console.error("Malformed SSE line:", json)
              // keep streaming – just ignore this line
            }
          }
        }
      }
    } catch (streamError) {
      console.error("Streaming error:", streamError)
      setError(`Streaming failed: ${streamError}`)
      setStatus("Streaming failed")
      setLoading(false)
    }
  }, [options.location, options.minPrice, options.maxPrice, options.propertyType, options.batchSize])

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort()
    setLoading(false)
    setStatus("Streaming stopped")
  }, [])

  const clearProperties = useCallback(() => {
    setProperties([])
    setProgress({ current: 0, total: undefined })
    setIsComplete(false)
    setError(null)
    setStatus("")
  }, [])

  // Auto-start if enabled
  useEffect(() => {
    if (options.autoStart) {
      startStreaming()
    }
  }, [options.autoStart, startStreaming])

  return {
    properties,
    loading,
    error,
    status,
    isDemo,
    progress,
    isComplete,
    startStreaming,
    stopStreaming,
    clearProperties,
  }
}
