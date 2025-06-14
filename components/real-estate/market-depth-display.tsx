"use client"

import { motion } from "framer-motion"
import { ImperialCard } from "@/components/ui/imperial-card"
import { Badge } from "@/components/ui/badge"
import { Layers, TrendingUp, TrendingDown } from "lucide-react"

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

interface MarketDepthDisplayProps {
  property: PropertySecurity
}

interface DepthLevel {
  price: number
  size: number
  cumulative: number
  percentage: number
}

export function MarketDepthDisplay({ property }: MarketDepthDisplayProps) {
  // Mock market depth data
  const bidDepth: DepthLevel[] = [
    { price: 2845000, size: 2, cumulative: 2, percentage: 15 },
    { price: 2840000, size: 1, cumulative: 3, percentage: 23 },
    { price: 2835000, size: 3, cumulative: 6, percentage: 46 },
    { price: 2830000, size: 1, cumulative: 7, percentage: 54 },
    { price: 2825000, size: 2, cumulative: 9, percentage: 69 },
    { price: 2820000, size: 1, cumulative: 10, percentage: 77 },
    { price: 2815000, size: 2, cumulative: 12, percentage: 92 },
    { price: 2810000, size: 1, cumulative: 13, percentage: 100 },
  ]

  const askDepth: DepthLevel[] = [
    { price: 2855000, size: 1, cumulative: 1, percentage: 8 },
    { price: 2860000, size: 2, cumulative: 3, percentage: 23 },
    { price: 2865000, size: 1, cumulative: 4, percentage: 31 },
    { price: 2870000, size: 3, cumulative: 7, percentage: 54 },
    { price: 2875000, size: 1, cumulative: 8, percentage: 62 },
    { price: 2880000, size: 2, cumulative: 10, percentage: 77 },
    { price: 2885000, size: 1, cumulative: 11, percentage: 85 },
    { price: 2890000, size: 2, cumulative: 13, percentage: 100 },
  ]

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(2)}M`
    }
    return `$${price.toLocaleString()}`
  }

  return (
    <ImperialCard variant="gold" className="h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Market Depth</h3>
            <Badge variant="outline" className="text-xs">
              Level II
            </Badge>
          </div>
          <div className="text-xs text-gray-400">Real-time order flow</div>
        </div>

        {/* Market Depth Visualization */}
        <div className="space-y-4">
          {/* Ask Side (Sell Orders) */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-red-400">
              <TrendingUp className="w-4 h-4" />
              <span>Ask Side (Sellers)</span>
            </div>

            <div className="space-y-1">
              {askDepth.reverse().map((level, index) => (
                <motion.div
                  key={`ask-${index}`}
                  className="relative"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between text-xs py-2 px-3 rounded hover:bg-red-500/10 transition-colors">
                    <span className="text-red-400 font-mono font-semibold">{formatPrice(level.price)}</span>
                    <span className="text-gray-300">{level.size}</span>
                    <span className="text-gray-400">{level.cumulative}</span>
                  </div>

                  {/* Depth Bar */}
                  <div className="absolute inset-0 bg-red-500/10 rounded" style={{ width: `${level.percentage}%` }} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Current Price */}
          <div className="py-3 border-y border-gray-700">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-white">{formatPrice(property.price)}</div>
              <div
                className={`text-sm flex items-center justify-center gap-1 ${
                  property.change >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {property.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span>
                  {property.change >= 0 ? "+" : ""}
                  {formatPrice(property.change)}({property.changePercent >= 0 ? "+" : ""}
                  {property.changePercent}%)
                </span>
              </div>
            </div>
          </div>

          {/* Bid Side (Buy Orders) */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-green-400">
              <TrendingDown className="w-4 h-4" />
              <span>Bid Side (Buyers)</span>
            </div>

            <div className="space-y-1">
              {bidDepth.map((level, index) => (
                <motion.div
                  key={`bid-${index}`}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between text-xs py-2 px-3 rounded hover:bg-green-500/10 transition-colors">
                    <span className="text-green-400 font-mono font-semibold">{formatPrice(level.price)}</span>
                    <span className="text-gray-300">{level.size}</span>
                    <span className="text-gray-400">{level.cumulative}</span>
                  </div>

                  {/* Depth Bar */}
                  <div className="absolute inset-0 bg-green-500/10 rounded" style={{ width: `${level.percentage}%` }} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Statistics */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
          <div className="space-y-2">
            <div className="text-xs text-gray-400 uppercase tracking-wide">Bid Liquidity</div>
            <div className="text-lg font-bold text-green-400">
              {bidDepth[bidDepth.length - 1]?.cumulative || 0} units
            </div>
            <div className="text-xs text-gray-400">
              Total: {formatPrice(bidDepth.reduce((sum, level) => sum + level.price * level.size, 0))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-gray-400 uppercase tracking-wide">Ask Liquidity</div>
            <div className="text-lg font-bold text-red-400">{askDepth[askDepth.length - 1]?.cumulative || 0} units</div>
            <div className="text-xs text-gray-400">
              Total: {formatPrice(askDepth.reduce((sum, level) => sum + level.price * level.size, 0))}
            </div>
          </div>
        </div>

        {/* Spread Analysis */}
        <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 uppercase tracking-wide">Bid-Ask Spread</span>
            <span className="text-sm font-semibold text-yellow-400">{formatPrice(property.ask - property.bid)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Spread %</span>
            <span className="text-sm text-gray-300">
              {(((property.ask - property.bid) / property.price) * 100).toFixed(3)}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Mid Price</span>
            <span className="text-sm text-gray-300">{formatPrice((property.bid + property.ask) / 2)}</span>
          </div>
        </div>
      </div>
    </ImperialCard>
  )
}
