"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface MarketDepthPanelProps {
  symbol: string
}

export function MarketDepthPanel({ symbol }: MarketDepthPanelProps) {
  const marketDepth = [
    { level: "L1", bidSize: 150, askSize: 120, bidPrice: 2498500, askPrice: 2501500 },
    { level: "L2", bidSize: 280, askSize: 200, bidPrice: 2497000, askPrice: 2503000 },
    { level: "L3", bidSize: 420, askSize: 350, bidPrice: 2495500, askPrice: 2504500 },
    { level: "L4", bidSize: 580, askSize: 480, bidPrice: 2494000, askPrice: 2506000 },
    { level: "L5", bidSize: 750, askSize: 620, bidPrice: 2492500, askPrice: 2507500 },
  ]

  const maxSize = Math.max(...marketDepth.flatMap((d) => [d.bidSize, d.askSize]))

  return (
    <Card className="bg-gray-900 border-green-800 h-48">
      <CardHeader className="pb-2">
        <CardTitle className="text-green-300 text-sm">MARKET DEPTH</CardTitle>
      </CardHeader>

      <CardContent className="p-2">
        <div className="space-y-1">
          <div className="grid grid-cols-5 gap-1 text-xs text-gray-400 border-b border-gray-700 pb-1">
            <div>LEVEL</div>
            <div className="text-center">BID SIZE</div>
            <div className="text-center">BID</div>
            <div className="text-center">ASK</div>
            <div className="text-center">ASK SIZE</div>
          </div>

          {marketDepth.map((depth, index) => (
            <div key={index} className="grid grid-cols-5 gap-1 text-xs items-center">
              <div className="text-gray-400">{depth.level}</div>

              <div className="relative">
                <Progress value={(depth.bidSize / maxSize) * 100} className="h-3 bg-gray-800" />
                <div className="absolute inset-0 flex items-center justify-center text-green-400 text-xs font-bold">
                  {depth.bidSize}
                </div>
              </div>

              <div className="text-green-400 font-mono text-center">${(depth.bidPrice / 1000000).toFixed(2)}M</div>

              <div className="text-red-400 font-mono text-center">${(depth.askPrice / 1000000).toFixed(2)}M</div>

              <div className="relative">
                <Progress value={(depth.askSize / maxSize) * 100} className="h-3 bg-gray-800" />
                <div className="absolute inset-0 flex items-center justify-center text-red-400 text-xs font-bold">
                  {depth.askSize}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 pt-2 border-t border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-gray-400">Total Bid Volume</div>
              <div className="text-green-400 font-bold">2,180 units</div>
            </div>
            <div>
              <div className="text-gray-400">Total Ask Volume</div>
              <div className="text-red-400 font-bold">1,770 units</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
