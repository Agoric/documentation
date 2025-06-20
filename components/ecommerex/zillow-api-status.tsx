"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Clock, Wifi, WifiOff } from "lucide-react"

interface ApiStatus {
  source: "zillow" | "cache" | "fallback"
  message: string
  timestamp: number
  error?: string
}

export function ZillowApiStatus() {
  const [status, setStatus] = useState<ApiStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const checkApiStatus = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/zillow/properties?location=New York, NY&limit=1")
      const data = await response.json()

      setStatus({
        source: data.source || "unknown",
        message: data.message || "API response received",
        timestamp: Date.now(),
        error: data.error,
      })
    } catch (error) {
      setStatus({
        source: "fallback",
        message: "API connection failed",
        timestamp: Date.now(),
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkApiStatus()
    // Check status every 5 minutes
    const interval = setInterval(checkApiStatus, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (!status) return null

  const getStatusIcon = () => {
    if (isLoading) return <Clock className="h-4 w-4 animate-spin" />

    switch (status.source) {
      case "zillow":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "cache":
        return <Wifi className="h-4 w-4 text-blue-500" />
      case "fallback":
        return <WifiOff className="h-4 w-4 text-orange-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = () => {
    switch (status.source) {
      case "zillow":
        return (
          <Badge variant="default" className="bg-green-500">
            Live Data
          </Badge>
        )
      case "cache":
        return <Badge variant="secondary">Cached</Badge>
      case "fallback":
        return (
          <Badge variant="outline" className="border-orange-500 text-orange-600">
            Demo Mode
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="text-sm font-medium">Zillow API Status</span>
            {getStatusBadge()}
          </div>
          <button
            onClick={checkApiStatus}
            disabled={isLoading}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Refresh
          </button>
        </div>

        <div className="mt-2 text-xs text-muted-foreground">
          {status.message}
          {status.timestamp && (
            <span className="ml-2">• Last updated: {new Date(status.timestamp).toLocaleTimeString()}</span>
          )}
        </div>

        {status.error && <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">Error: {status.error}</div>}
      </CardContent>
    </Card>
  )
}
