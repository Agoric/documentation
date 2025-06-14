"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Volume2 } from "lucide-react"
import { ImperialCard } from "@/components/ui/imperial-card"

interface OrderBookEntry {
  price: number
  size: number
  total: number
}

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

interface RealEstateOrderBookProps {
  property: PropertySecurity
  onPropertySelect: (property: PropertySecurity) => void
}

export function RealEstateOrderBook({ property, onPropertySelect }: RealEstateOrderBookProps) {
  const [orderType, setOrderType] = useState<"market" | "limit">("limit")
  const [orderSide, setOrderSide] = useState<"buy" | "sell">("buy")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")

  // Mock order book data
  const bids: OrderBookEntry[] = [
    { price: 2845000, size: 2, total: 2 },
    { price: 2840000, size: 1, total: 3 },
    { price: 2835000, size: 3, total: 6 },
    { price: 2830000, size: 1, total: 7 },
    { price: 2825000, size: 2, total: 9 },
    { price: 2820000, size: 1, total: 10 },
    { price: 2815000, size: 2, total: 12 },
    { price: 2810000, size: 1, total: 13 },
  ]

  const asks: OrderBookEntry[] = [
    { price: 2855000, size: 1, total: 1 },
    { price: 2860000, size: 2, total: 3 },
    { price: 2865000, size: 1, total: 4 },
    { price: 2870000, size: 3, total: 7 },
    { price: 2875000, size: 1, total: 8 },
    { price: 2880000, size: 2, total: 10 },
    { price: 2885000, size: 1, total: 11 },
    { price: 2890000, size: 2, total: 13 },
  ]

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(2)}M`
    }
    return `$${price.toLocaleString()}`
  }

  const maxTotal = Math.max(...bids.map((b) => b.total), ...asks.map((a) => a.total))

  return (
    <ImperialCard variant="gold" className="h-full">
      <div className="p-4 space-y-4">
        {/* Order Book Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Order Book</h3>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Volume2 className="w-3 h-3" />
            <span>Level II</span>
          </div>
        </div>

        {/* Order Book Table */}
        <div className="space-y-2">
          {/* Header */}
          <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 uppercase tracking-wide border-b border-gray-700 pb-2">
            <span>Price</span>
            <span className="text-center">Size</span>
            <span className="text-right">Total</span>
          </div>

          {/* Asks (Sell Orders) */}
          <div className="space-y-1">
            {asks.reverse().map((ask, index) => (
              <motion.div
                key={`ask-${index}`}
                className="relative grid grid-cols-3 gap-2 text-xs py-1 hover:bg-red-500/10 cursor-pointer rounded"
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className="absolute inset-0 bg-red-500/5 rounded"
                  style={{ width: `${(ask.total / maxTotal) * 100}%` }}
                />
                <span className="text-red-400 font-mono relative z-10">{formatPrice(ask.price)}</span>
                <span className="text-center text-gray-300 relative z-10">{ask.size}</span>
                <span className="text-right text-gray-300 relative z-10">{ask.total}</span>
              </motion.div>
            ))}
          </div>

          {/* Spread */}
          <div className="py-2 border-y border-gray-700">
            <div className="text-center">
              <div className="text-xs text-gray-400">Spread</div>
              <div className="text-sm font-semibold text-yellow-400">{formatPrice(property.ask - property.bid)}</div>
            </div>
          </div>

          {/* Bids (Buy Orders) */}
          <div className="space-y-1">
            {bids.map((bid, index) => (
              <motion.div
                key={`bid-${index}`}
                className="relative grid grid-cols-3 gap-2 text-xs py-1 hover:bg-green-500/10 cursor-pointer rounded"
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className="absolute inset-0 bg-green-500/5 rounded"
                  style={{ width: `${(bid.total / maxTotal) * 100}%` }}
                />
                <span className="text-green-400 font-mono relative z-10">{formatPrice(bid.price)}</span>
                <span className="text-center text-gray-300 relative z-10">{bid.size}</span>
                <span className="text-right text-gray-300 relative z-10">{bid.total}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Order Entry */}
        <div className="border-t border-gray-700 pt-4 space-y-3">
          <div className="flex gap-2">
            <button
              onClick={() => setOrderSide("buy")}
              className={`flex-1 py-2 px-3 rounded text-xs font-semibold transition-colors ${
                orderSide === "buy" ? "bg-green-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              BUY
            </button>
            <button
              onClick={() => setOrderSide("sell")}
              className={`flex-1 py-2 px-3 rounded text-xs font-semibold transition-colors ${
                orderSide === "sell" ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              SELL
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setOrderType("market")}
              className={`flex-1 py-1 px-2 rounded text-xs transition-colors ${
                orderType === "market" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Market
            </button>
            <button
              onClick={() => setOrderType("limit")}
              className={`flex-1 py-1 px-2 rounded text-xs transition-colors ${
                orderType === "limit" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Limit
            </button>
          </div>

          <div className="space-y-2">
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-xs placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
            />
            {orderType === "limit" && (
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-xs placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              />
            )}
          </div>

          <button
            className={`w-full py-2 px-3 rounded text-xs font-semibold transition-colors ${
              orderSide === "buy"
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            Place {orderSide.toUpperCase()} Order
          </button>
        </div>
      </div>
    </ImperialCard>
  )
}
