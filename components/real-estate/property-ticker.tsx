"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

interface Property {
  symbol: string
  name: string
  price: number
  change: number
  volume: number
  yield: number
  sector: string
}

interface PropertyTickerProps {
  properties: Property[]
}

export function PropertyTicker({ properties }: PropertyTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % properties.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [properties.length])

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6 overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Badge variant="outline" className="border-amber-500 text-amber-400">
            LIVE TICKER
          </Badge>
          <div className="flex space-x-8 animate-pulse">
            {properties.map((property, index) => (
              <div
                key={property.symbol}
                className={`flex items-center space-x-3 transition-opacity duration-500 ${
                  index === currentIndex ? "opacity-100" : "opacity-50"
                }`}
              >
                <div className="text-sm">
                  <span className="text-blue-400 font-medium">{property.symbol}</span>
                  <span className="text-gray-400 ml-2">{property.name}</span>
                </div>
                <div className="text-sm font-mono">
                  <span className="text-white">${property.price.toLocaleString()}</span>
                </div>
                <div
                  className={`flex items-center text-sm ${property.change >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {property.change >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  <span>
                    {property.change >= 0 ? "+" : ""}
                    {property.change}%
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  Vol: {property.volume} | Yield: {property.yield}%
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4 text-xs text-gray-400">
          <span>Market Cap: $847.39B</span>
          <span>•</span>
          <span>Total Volume: $2.85B</span>
          <span>•</span>
          <span>Active: 15,847</span>
        </div>
      </div>
    </div>
  )
}
