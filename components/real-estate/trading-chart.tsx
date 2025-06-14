"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface TradingChartProps {
  symbol: string
}

export function TradingChart({ symbol }: TradingChartProps) {
  const [timeframe, setTimeframe] = useState("1D")
  const [chartData, setChartData] = useState<any[]>([])

  const timeframes = ["1M", "5M", "15M", "1H", "4H", "1D", "1W", "1M"]

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate price movement
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-1">
            {timeframes.map((tf) => (
              <Button
                key={tf}
                size="sm"
                variant={timeframe === tf ? "default" : "outline"}
                className={`h-6 px-2 text-xs ${
                  timeframe === tf ? "bg-amber-600 text-black" : "border-gray-600 text-gray-400 hover:bg-gray-800"
                }`}
                onClick={() => setTimeframe(tf)}
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
            VOLUME: 847K
          </Badge>
          <Badge variant="outline" className="border-blue-500 text-blue-400 text-xs">
            AVG: $2,485,000
          </Badge>
        </div>
      </div>

      {/* Simulated Trading Chart */}
      <div className="relative h-64 bg-black border border-gray-700 rounded">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl font-mono text-green-400 mb-2">$2,500,000</div>
            <div className="text-lg text-green-400">+2.34% (+$57,500)</div>
            <div className="text-sm text-gray-400 mt-2">Last: $2,500,000 | High: $2,567,000 | Low: $2,445,000</div>
          </div>
        </div>

        {/* Simulated Chart Lines */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 0 150 Q 50 140 100 130 T 200 120 T 300 110 T 400 100"
            stroke="#10b981"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 0 150 Q 50 140 100 130 T 200 120 T 300 110 T 400 100 L 400 250 L 0 250 Z"
            fill="url(#priceGradient)"
          />
        </svg>
      </div>

      {/* Technical Indicators */}
      <div className="grid grid-cols-4 gap-4 mt-4 text-xs">
        <div className="text-center">
          <p className="text-gray-400">RSI (14)</p>
          <p className="text-green-400 font-mono">67.8</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">MACD</p>
          <p className="text-green-400 font-mono">+0.23</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">SMA (20)</p>
          <p className="text-blue-400 font-mono">$2,467K</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">VOL</p>
          <p className="text-amber-400 font-mono">847K</p>
        </div>
      </div>
    </div>
  )
}
