"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { TrendingUp, TrendingDown, BarChart3, Activity } from "lucide-react"

interface PropertyTradingChartProps {
  symbol: string
}

export function PropertyTradingChart({ symbol }: PropertyTradingChartProps) {
  const [timeframe, setTimeframe] = useState("1D")
  const [chartType, setChartType] = useState("candlestick")

  // Mock real-time price data
  const [currentPrice, setCurrentPrice] = useState(2500000)
  const [priceChange, setPriceChange] = useState(56250)
  const [percentChange, setPercentChange] = useState(2.3)

  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 10000
      setCurrentPrice((prev) => Math.max(prev + change, 1000000))
      setPriceChange(change)
      setPercentChange((change / currentPrice) * 100)
    }, 2000)

    return () => clearInterval(interval)
  }, [currentPrice])

  const chartData = [
    { time: "09:30", open: 2450000, high: 2480000, low: 2440000, close: 2470000, volume: 1250 },
    { time: "10:00", open: 2470000, high: 2490000, low: 2460000, close: 2485000, volume: 1180 },
    { time: "10:30", open: 2485000, high: 2510000, low: 2480000, close: 2505000, volume: 1420 },
    { time: "11:00", open: 2505000, high: 2520000, low: 2495000, close: 2515000, volume: 1350 },
    { time: "11:30", open: 2515000, high: 2530000, low: 2510000, close: 2525000, volume: 1280 },
    { time: "12:00", open: 2525000, high: 2540000, low: 2520000, close: 2535000, volume: 1190 },
    { time: "12:30", open: 2535000, high: 2550000, low: 2530000, close: 2545000, volume: 1320 },
    { time: "13:00", open: 2545000, high: 2560000, low: 2540000, close: 2555000, volume: 1450 },
  ]

  const timeframes = ["1M", "5M", "15M", "1H", "1D", "1W", "1M"]

  return (
    <Card className="bg-gray-900 border-green-800 h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <CardTitle className="text-green-300 text-lg font-bold">{symbol}</CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-white text-xl font-bold">${currentPrice.toLocaleString()}</span>
              <span className={`text-sm font-bold ${priceChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                {priceChange >= 0 ? "+" : ""}
                {priceChange.toLocaleString()} ({percentChange.toFixed(2)}%)
              </span>
              {priceChange >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {timeframes.map((tf) => (
                <Button
                  key={tf}
                  size="sm"
                  variant={timeframe === tf ? "default" : "ghost"}
                  className={`h-6 px-2 text-xs ${timeframe === tf ? "bg-green-700 text-white" : "text-green-400"}`}
                  onClick={() => setTimeframe(tf)}
                >
                  {tf}
                </Button>
              ))}
            </div>

            <div className="flex items-center space-x-1">
              <Button
                size="sm"
                variant={chartType === "candlestick" ? "default" : "ghost"}
                className={`h-6 px-2 text-xs ${
                  chartType === "candlestick" ? "bg-green-700 text-white" : "text-green-400"
                }`}
                onClick={() => setChartType("candlestick")}
              >
                <BarChart3 className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant={chartType === "line" ? "default" : "ghost"}
                className={`h-6 px-2 text-xs ${chartType === "line" ? "bg-green-700 text-white" : "text-green-400"}`}
                onClick={() => setChartType("line")}
              >
                <Activity className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-6 gap-4 text-xs">
          <div>
            <div className="text-gray-400">BID</div>
            <div className="text-green-400 font-bold">$2,498,500</div>
          </div>
          <div>
            <div className="text-gray-400">ASK</div>
            <div className="text-red-400 font-bold">$2,501,500</div>
          </div>
          <div>
            <div className="text-gray-400">SPREAD</div>
            <div className="text-yellow-400 font-bold">$3,000</div>
          </div>
          <div>
            <div className="text-gray-400">VOLUME</div>
            <div className="text-white font-bold">12.5K</div>
          </div>
          <div>
            <div className="text-gray-400">AVG VOL</div>
            <div className="text-white font-bold">8.7K</div>
          </div>
          <div>
            <div className="text-gray-400">MKT CAP</div>
            <div className="text-white font-bold">$125M</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-2">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="time" stroke="#10b981" fontSize={10} tickLine={false} />
              <YAxis
                stroke="#10b981"
                fontSize={10}
                tickLine={false}
                domain={["dataMin - 10000", "dataMax + 10000"]}
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #10b981",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "#10b981" }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, "Price"]}
              />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: "#10b981", strokeWidth: 2 }}
              />
              <ReferenceLine y={currentPrice} stroke="#fbbf24" strokeDasharray="2 2" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Volume Chart */}
        <div className="h-16 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="time" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #10b981",
                  borderRadius: "4px",
                  fontSize: "10px",
                }}
                formatter={(value: any) => [`${value}`, "Volume"]}
              />
              <Line type="monotone" dataKey="volume" stroke="#6b7280" strokeWidth={1} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
