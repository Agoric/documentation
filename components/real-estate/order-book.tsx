"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface OrderBookProps {
  symbol: string
}

export function OrderBook({ symbol }: OrderBookProps) {
  const bids = [
    { price: 2499000, size: 2, total: 2 },
    { price: 2498000, size: 1, total: 3 },
    { price: 2497000, size: 3, total: 6 },
    { price: 2496000, size: 1, total: 7 },
    { price: 2495000, size: 2, total: 9 },
  ]

  const asks = [
    { price: 2501000, size: 1, total: 1 },
    { price: 2502000, size: 2, total: 3 },
    { price: 2503000, size: 1, total: 4 },
    { price: 2504000, size: 3, total: 7 },
    { price: 2505000, size: 2, total: 9 },
  ]

  const spread = asks[0].price - bids[0].price
  const spreadPercent = ((spread / bids[0].price) * 100).toFixed(3)

  return (
    <Card className="bg-gray-900 border-gray-700 h-96">
      <CardHeader className="pb-2">
        <CardTitle className="text-amber-400 text-sm flex items-center justify-between">
          ORDER BOOK
          <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
            Depth: 18
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Spread Info */}
        <div className="px-4 py-2 border-b border-gray-700">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Spread:</span>
            <span className="text-amber-400">
              ${spread.toLocaleString()} ({spreadPercent}%)
            </span>
          </div>
        </div>

        {/* Headers */}
        <div className="grid grid-cols-3 gap-2 px-4 py-2 text-xs text-gray-400 font-medium border-b border-gray-700">
          <span>SIZE</span>
          <span className="text-center">PRICE</span>
          <span className="text-right">TOTAL</span>
        </div>

        {/* Asks (Sell Orders) */}
        <div className="px-4">
          {asks.reverse().map((ask, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 py-1 text-xs hover:bg-red-900/20">
              <span className="text-red-400 font-mono">{ask.size}</span>
              <span className="text-center text-red-400 font-mono">${ask.price.toLocaleString()}</span>
              <span className="text-right text-red-400 font-mono">{ask.total}</span>
            </div>
          ))}
        </div>

        {/* Current Price */}
        <div className="px-4 py-2 border-y border-gray-700 bg-gray-800">
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">$2,500,000</div>
            <div className="text-xs text-green-400">Last Trade</div>
          </div>
        </div>

        {/* Bids (Buy Orders) */}
        <div className="px-4">
          {bids.map((bid, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 py-1 text-xs hover:bg-green-900/20">
              <span className="text-green-400 font-mono">{bid.size}</span>
              <span className="text-center text-green-400 font-mono">${bid.price.toLocaleString()}</span>
              <span className="text-right text-green-400 font-mono">{bid.total}</span>
            </div>
          ))}
        </div>

        {/* Market Stats */}
        <div className="px-4 py-2 border-t border-gray-700 space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">24h Volume:</span>
            <span className="text-white">15 units</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">24h High:</span>
            <span className="text-green-400">$2,567,000</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">24h Low:</span>
            <span className="text-red-400">$2,445,000</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
