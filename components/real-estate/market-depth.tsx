"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

interface MarketDepthProps {
  symbol: string
}

export function MarketDepth({ symbol }: MarketDepthProps) {
  const depthData = [
    { price: 2505000, bidSize: 0, askSize: 8, bidPercent: 0, askPercent: 80 },
    { price: 2504000, bidSize: 0, askSize: 12, bidPercent: 0, askPercent: 100 },
    { price: 2503000, bidSize: 0, askSize: 6, bidPercent: 0, askPercent: 60 },
    { price: 2502000, bidSize: 0, askSize: 10, bidPercent: 0, askPercent: 85 },
    { price: 2501000, bidSize: 0, askSize: 4, bidPercent: 0, askPercent: 40 },
    { price: 2500000, bidSize: 0, askSize: 0, bidPercent: 0, askPercent: 0 }, // Current price
    { price: 2499000, bidSize: 8, askSize: 0, bidPercent: 80, askPercent: 0 },
    { price: 2498000, bidSize: 5, askSize: 0, bidPercent: 50, askPercent: 0 },
    { price: 2497000, bidSize: 12, askSize: 0, bidPercent: 100, askPercent: 0 },
    { price: 2496000, bidSize: 3, askSize: 0, bidPercent: 30, askPercent: 0 },
    { price: 2495000, bidSize: 7, askSize: 0, bidPercent: 70, askPercent: 0 },
  ]

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-amber-400 text-sm flex items-center">
          <BarChart3 className="h-4 w-4 mr-2" />
          MARKET DEPTH
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="grid grid-cols-4 gap-2 text-xs text-gray-400 font-medium pb-2 border-b border-gray-700">
            <span>PRICE</span>
            <span className="text-center">BID</span>
            <span className="text-center">ASK</span>
            <span className="text-center">DEPTH</span>
          </div>

          {depthData.map((level, index) => (
            <div
              key={index}
              className={`grid grid-cols-4 gap-2 items-center py-1 text-xs ${
                level.price === 2500000 ? "bg-gray-800 border border-gray-600" : ""
              }`}
            >
              <span className={`font-mono ${level.price === 2500000 ? "text-amber-400 font-bold" : "text-white"}`}>
                ${level.price.toLocaleString()}
              </span>

              <div className="text-center">
                {level.bidSize > 0 && <span className="text-green-400 font-mono">{level.bidSize}</span>}
              </div>

              <div className="text-center">
                {level.askSize > 0 && <span className="text-red-400 font-mono">{level.askSize}</span>}
              </div>

              <div className="relative">
                {level.bidPercent > 0 && (
                  <div
                    className="absolute left-0 top-0 h-full bg-green-600/30 rounded"
                    style={{ width: `${level.bidPercent}%` }}
                  />
                )}
                {level.askPercent > 0 && (
                  <div
                    className="absolute right-0 top-0 h-full bg-red-600/30 rounded"
                    style={{ width: `${level.askPercent}%` }}
                  />
                )}
                <div className="relative z-10 h-4"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-400">Total Bid Volume:</span>
            <span className="text-green-400 font-mono">35 units</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Ask Volume:</span>
            <span className="text-red-400 font-mono">40 units</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Bid/Ask Ratio:</span>
            <span className="text-amber-400 font-mono">0.875</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
