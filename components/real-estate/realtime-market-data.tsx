"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

export function RealTimeMarketData() {
  const [marketData, setMarketData] = useState([
    { symbol: "REIT-INDEX", value: 2847.32, change: 12.45, changePercent: 0.44 },
    { symbol: "COMM-INDEX", value: 1923.67, change: -8.21, changePercent: -0.42 },
    { symbol: "RESI-INDEX", value: 3456.89, change: 23.12, changePercent: 0.67 },
    { symbol: "LAND-INDEX", value: 987.45, change: 5.67, changePercent: 0.58 },
  ])

  const [economicData, setEconomicData] = useState([
    { indicator: "FED RATE", value: "5.25%", change: "0.00%", status: "neutral" },
    { indicator: "MORTGAGE 30Y", value: "7.12%", change: "+0.05%", status: "up" },
    { indicator: "HOUSING STARTS", value: "1.35M", change: "+2.1%", status: "up" },
    { indicator: "PERMITS", value: "1.42M", change: "-1.2%", status: "down" },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) =>
        prev.map((item) => ({
          ...item,
          value: item.value + (Math.random() - 0.5) * 10,
          change: item.change + (Math.random() - 0.5) * 2,
          changePercent: item.changePercent + (Math.random() - 0.5) * 0.1,
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-gray-900 border-green-800 h-64">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-green-300 text-sm">MARKET DATA</CardTitle>
          <Badge variant="outline" className="border-green-600 text-green-400">
            <Activity className="w-3 h-3 mr-1" />
            LIVE
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-2 space-y-3">
        {/* Market Indices */}
        <div>
          <div className="text-xs text-gray-400 mb-1">INDICES</div>
          <div className="space-y-1">
            {marketData.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-green-300 font-bold">{item.symbol}</div>
                <div className="text-white text-right">{item.value.toFixed(2)}</div>
                <div className={`text-right font-bold ${item.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {item.change >= 0 ? "+" : ""}
                  {item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Economic Indicators */}
        <div>
          <div className="text-xs text-gray-400 mb-1">ECONOMIC DATA</div>
          <div className="space-y-1">
            {economicData.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-yellow-300 font-bold">{item.indicator}</div>
                <div className="text-white text-right">{item.value}</div>
                <div
                  className={`text-right font-bold flex items-center justify-end ${
                    item.status === "up" ? "text-green-400" : item.status === "down" ? "text-red-400" : "text-gray-400"
                  }`}
                >
                  {item.change}
                  {item.status === "up" && <TrendingUp className="w-3 h-3 ml-1" />}
                  {item.status === "down" && <TrendingDown className="w-3 h-3 ml-1" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Status */}
        <div className="border-t border-gray-700 pt-2">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-gray-400">Market Status</div>
              <div className="text-green-400 font-bold">OPEN</div>
            </div>
            <div>
              <div className="text-gray-400">Next Close</div>
              <div className="text-white">16:00 EST</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
