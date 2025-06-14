"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Star, StarOff, MapPin, Activity } from "lucide-react"
import { ImperialCard } from "@/components/ui/imperial-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface PropertySecurity {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
  sector: string
  location: string
  type: "REIT" | "PROPERTY" | "FUND" | "INDEX"
  bid: number
  ask: number
  lastTrade: string
}

interface PropertyWatchlistProps {
  properties: PropertySecurity[]
  onPropertySelect: (property: PropertySecurity) => void
  selectedProperty: PropertySecurity
}

export function PropertyWatchlist({ properties, onPropertySelect, selectedProperty }: PropertyWatchlistProps) {
  const [watchedProperties, setWatchedProperties] = useState<Set<string>>(
    new Set([properties[0]?.symbol, properties[2]?.symbol]),
  )
  const [sortBy, setSortBy] = useState<"symbol" | "price" | "change" | "volume">("change")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const toggleWatch = (symbol: string) => {
    const newWatched = new Set(watchedProperties)
    if (newWatched.has(symbol)) {
      newWatched.delete(symbol)
    } else {
      newWatched.add(symbol)
    }
    setWatchedProperties(newWatched)
  }

  const sortedProperties = [...properties].sort((a, b) => {
    let aValue: number
    let bValue: number

    switch (sortBy) {
      case "price":
        aValue = a.price
        bValue = b.price
        break
      case "change":
        aValue = a.changePercent
        bValue = b.changePercent
        break
      case "volume":
        aValue = a.volume
        bValue = b.volume
        break
      default:
        return a.symbol.localeCompare(b.symbol)
    }

    return sortOrder === "asc" ? aValue - bValue : bValue - aValue
  })

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(2)}M`
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`
    }
    return `$${price.toFixed(2)}`
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(0)}K`
    }
    return volume.toString()
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "REIT":
        return "bg-blue-500/20 text-blue-400"
      case "PROPERTY":
        return "bg-green-500/20 text-green-400"
      case "FUND":
        return "bg-purple-500/20 text-purple-400"
      case "INDEX":
        return "bg-yellow-500/20 text-yellow-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <ImperialCard variant="gold" className="h-full">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Watchlist</h3>
          </div>
          <Badge variant="outline" className="text-xs">
            {watchedProperties.size} watched
          </Badge>
        </div>

        {/* Sort Controls */}
        <div className="flex gap-1 bg-slate-800 rounded-lg p-1">
          {[
            { key: "change", label: "Change" },
            { key: "price", label: "Price" },
            { key: "volume", label: "Volume" },
          ].map((sort) => (
            <button
              key={sort.key}
              onClick={() => {
                if (sortBy === sort.key) {
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                } else {
                  setSortBy(sort.key as any)
                  setSortOrder("desc")
                }
              }}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                sortBy === sort.key ? "bg-yellow-600 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {sort.label}
              {sortBy === sort.key && <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>}
            </button>
          ))}
        </div>

        {/* Property List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {sortedProperties.map((property, index) => (
            <motion.div
              key={property.symbol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`relative p-3 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] ${
                selectedProperty.symbol === property.symbol
                  ? "border-yellow-400 bg-yellow-400/10"
                  : "border-gray-700 bg-slate-800/50 hover:border-gray-600"
              }`}
              onClick={() => onPropertySelect(property)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-white truncate">{property.symbol}</span>
                    <Badge className={`text-xs ${getTypeColor(property.type)}`}>{property.type}</Badge>
                  </div>

                  <p className="text-xs text-gray-400 truncate mb-1">{property.name}</p>

                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{property.location}</span>
                  </div>
                </div>

                <div className="text-right ml-2">
                  <div className="text-sm font-semibold text-white">{formatPrice(property.price)}</div>
                  <div
                    className={`flex items-center gap-1 text-xs ${
                      property.change >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {property.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>
                      {property.changePercent >= 0 ? "+" : ""}
                      {property.changePercent}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">Vol: {formatVolume(property.volume)}</div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleWatch(property.symbol)
                  }}
                  className="ml-2 p-1 hover:bg-gray-700 rounded transition-colors"
                >
                  {watchedProperties.has(property.symbol) ? (
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  ) : (
                    <StarOff className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-gray-700">
                <div className="text-center">
                  <p className="text-xs text-gray-400">Bid</p>
                  <p className="text-xs font-semibold text-red-400">{formatPrice(property.bid)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">Ask</p>
                  <p className="text-xs font-semibold text-green-400">{formatPrice(property.ask)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-gray-700 space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs"
            onClick={() => {
              // Add all properties to watchlist
              setWatchedProperties(new Set(properties.map((p) => p.symbol)))
            }}
          >
            Watch All
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs"
            onClick={() => {
              // Clear watchlist
              setWatchedProperties(new Set())
            }}
          >
            Clear Watchlist
          </Button>
        </div>
      </div>
    </ImperialCard>
  )
}
