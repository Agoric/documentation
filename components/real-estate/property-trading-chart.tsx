"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"
import { ImperialCard } from "@/components/ui/imperial-card"
import { Badge } from "@/components/ui/badge"

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

interface PropertyTradingChartProps {
  property: PropertySecurity
}

// Mock chart data
const generateChartData = (days: number) => {
  const data = []
  let basePrice = 2800000

  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.5) * 100000
    basePrice += change

    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      price: Math.max(basePrice, 2500000),
      volume: Math.floor(Math.random() * 50) + 10,
      high: basePrice + Math.random() * 50000,
      low: basePrice - Math.random() * 50000,
      open: basePrice - (Math.random() - 0.5) * 30000,
      close: basePrice,
    })
  }

  return data
}

const timeframes = [
  { label: "1D", value: "1D", days: 1 },
  { label: "5D", value: "5D", days: 5 },
  { label: "1M", value: "1M", days: 30 },
  { label: "3M", value: "3M", days: 90 },
  { label: "6M", value: "6M", days: 180 },
  { label: "1Y", value: "1Y", days: 365 },
]

export function PropertyTradingChart({ property }: PropertyTradingChartProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M")
  const [chartType, setChartType] = useState<"line" | "area" | "candle">("area")

  const currentTimeframe = timeframes.find((t) => t.value === selectedTimeframe) || timeframes[2]
  const chartData = generateChartData(currentTimeframe.days)

  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    }
    return `$${value.toLocaleString()}`
  }

  const formatVolume = (value: number) => {
    return value.toString()
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-gray-300 text-sm">{label}</p>
          <p className="text-white font-semibold">Price: {formatPrice(payload[0].value)}</p>
          {payload[1] && <p className="text-blue-400 text-sm">Volume: {payload[1].value}</p>}
        </div>
      )
    }
    return null
  }

  return (
    <ImperialCard variant="gold" className="h-full">
      <div className="p-6 space-y-4">
        {/* Chart Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-white">Price Chart</h3>
            <Badge variant="outline" className="text-xs">
              {property.symbol}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {/* Chart Type Selector */}
            <div className="flex bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setChartType("line")}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  chartType === "line" ? "bg-yellow-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Line
              </button>
              <button
                onClick={() => setChartType("area")}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  chartType === "area" ? "bg-yellow-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Area
              </button>
              <button
                onClick={() => setChartType("candle")}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  chartType === "candle" ? "bg-yellow-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Candle
              </button>
            </div>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="flex gap-1 bg-slate-800 rounded-lg p-1">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe.value}
              onClick={() => setSelectedTimeframe(timeframe.value)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                selectedTimeframe === timeframe.value ? "bg-yellow-600 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {timeframe.label}
            </button>
          ))}
        </div>

        {/* Price Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" ? (
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="date"
                  stroke="#9ca3af"
                  fontSize={10}
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis stroke="#9ca3af" fontSize={10} tickFormatter={formatPrice} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="price" stroke="#fbbf24" strokeWidth={2} fill="url(#priceGradient)" />
              </AreaChart>
            ) : (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="date"
                  stroke="#9ca3af"
                  fontSize={10}
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis stroke="#9ca3af" fontSize={10} tickFormatter={formatPrice} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="price" stroke="#fbbf24" strokeWidth={2} dot={false} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Volume Chart */}
        <div className="h-20">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-800 border border-gray-600 rounded-lg p-2 shadow-lg">
                        <p className="text-blue-400 text-xs">Volume: {payload[0].value}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="volume" fill="#3b82f6" opacity={0.6} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart Statistics */}
        <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-700">
          <div className="text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wide">24h High</p>
            <p className="text-sm font-semibold text-green-400">{formatPrice(property.price + 75000)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wide">24h Low</p>
            <p className="text-sm font-semibold text-red-400">{formatPrice(property.price - 45000)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Volume</p>
            <p className="text-sm font-semibold text-blue-400">{property.volume}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Market Cap</p>
            <p className="text-sm font-semibold text-yellow-400">{formatPrice(property.marketCap)}</p>
          </div>
        </div>
      </div>
    </ImperialCard>
  )
}
