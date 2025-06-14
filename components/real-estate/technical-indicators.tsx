"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { ImperialCard } from "@/components/ui/imperial-card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, BarChart3, Target } from "lucide-react"

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

interface TechnicalIndicatorsProps {
  property: PropertySecurity
}

interface TechnicalData {
  date: string
  price: number
  sma20: number
  sma50: number
  ema12: number
  ema26: number
  rsi: number
  macd: number
  signal: number
  bollinger_upper: number
  bollinger_lower: number
  volume: number
}

// Mock technical analysis data
const generateTechnicalData = () => {
  const data: TechnicalData[] = []
  let basePrice = 2800000
  let rsi = 50

  for (let i = 0; i < 50; i++) {
    const change = (Math.random() - 0.5) * 100000
    basePrice += change
    rsi += (Math.random() - 0.5) * 10
    rsi = Math.max(0, Math.min(100, rsi))

    const price = Math.max(basePrice, 2500000)

    data.push({
      date: new Date(Date.now() - (50 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      price,
      sma20: price + (Math.random() - 0.5) * 50000,
      sma50: price + (Math.random() - 0.5) * 100000,
      ema12: price + (Math.random() - 0.5) * 30000,
      ema26: price + (Math.random() - 0.5) * 60000,
      rsi,
      macd: (Math.random() - 0.5) * 20000,
      signal: (Math.random() - 0.5) * 15000,
      bollinger_upper: price + 75000,
      bollinger_lower: price - 75000,
      volume: Math.floor(Math.random() * 50) + 10,
    })
  }

  return data
}

export function TechnicalIndicators({ property }: TechnicalIndicatorsProps) {
  const [selectedIndicator, setSelectedIndicator] = useState<"sma" | "ema" | "bollinger" | "rsi" | "macd">("sma")
  const technicalData = generateTechnicalData()
  const currentData = technicalData[technicalData.length - 1]

  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`
    }
    return `$${value.toLocaleString()}`
  }

  const getSignalColor = (signal: "BUY" | "SELL" | "HOLD") => {
    switch (signal) {
      case "BUY":
        return "text-green-400 bg-green-500/20"
      case "SELL":
        return "text-red-400 bg-red-500/20"
      case "HOLD":
        return "text-yellow-400 bg-yellow-500/20"
    }
  }

  const getSignal = (indicator: string): "BUY" | "SELL" | "HOLD" => {
    switch (indicator) {
      case "RSI":
        return currentData.rsi < 30 ? "BUY" : currentData.rsi > 70 ? "SELL" : "HOLD"
      case "MACD":
        return currentData.macd > currentData.signal ? "BUY" : "SELL"
      case "SMA":
        return property.price > currentData.sma20 ? "BUY" : "SELL"
      default:
        return "HOLD"
    }
  }

  const indicators = [
    { key: "sma", label: "Moving Averages", icon: TrendingUp },
    { key: "ema", label: "EMA", icon: BarChart3 },
    { key: "bollinger", label: "Bollinger Bands", icon: Target },
    { key: "rsi", label: "RSI", icon: TrendingDown },
    { key: "macd", label: "MACD", icon: BarChart3 },
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-gray-300 text-sm mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name === "RSI" ? entry.value.toFixed(1) : formatPrice(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <ImperialCard variant="gold" className="h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Technical Analysis</h3>
            <Badge variant="outline" className="text-xs">
              {property.symbol}
            </Badge>
          </div>
        </div>

        {/* Indicator Selector */}
        <div className="flex gap-1 bg-slate-800 rounded-lg p-1">
          {indicators.map((indicator) => (
            <button
              key={indicator.key}
              onClick={() => setSelectedIndicator(indicator.key as any)}
              className={`px-3 py-2 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                selectedIndicator === indicator.key ? "bg-yellow-600 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              <indicator.icon className="w-3 h-3" />
              {indicator.label}
            </button>
          ))}
        </div>

        {/* Technical Signals Summary */}
        <div className="grid grid-cols-3 gap-4">
          {["RSI", "MACD", "SMA"].map((indicator) => {
            const signal = getSignal(indicator)
            return (
              <div key={indicator} className="text-center p-3 bg-slate-800/50 rounded-lg">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{indicator}</p>
                <Badge className={`text-xs ${getSignalColor(signal)}`}>{signal}</Badge>
              </div>
            )
          })}
        </div>

        {/* Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {selectedIndicator === "rsi" ? (
              <LineChart data={technicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="date"
                  stroke="#9ca3af"
                  fontSize={10}
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis stroke="#9ca3af" fontSize={10} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="2 2" />
                <ReferenceLine y={30} stroke="#22c55e" strokeDasharray="2 2" />
                <ReferenceLine y={50} stroke="#6b7280" strokeDasharray="1 1" />
                <Line type="monotone" dataKey="rsi" stroke="#fbbf24" strokeWidth={2} dot={false} name="RSI" />
              </LineChart>
            ) : selectedIndicator === "macd" ? (
              <LineChart data={technicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="date"
                  stroke="#9ca3af"
                  fontSize={10}
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis stroke="#9ca3af" fontSize={10} tickFormatter={(value) => (value / 1000).toFixed(0) + "K"} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="1 1" />
                <Line type="monotone" dataKey="macd" stroke="#3b82f6" strokeWidth={2} dot={false} name="MACD" />
                <Line type="monotone" dataKey="signal" stroke="#ef4444" strokeWidth={2} dot={false} name="Signal" />
              </LineChart>
            ) : (
              <LineChart data={technicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="date"
                  stroke="#9ca3af"
                  fontSize={10}
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis stroke="#9ca3af" fontSize={10} tickFormatter={formatPrice} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="price" stroke="#ffffff" strokeWidth={2} dot={false} name="Price" />
                {selectedIndicator === "sma" && (
                  <>
                    <Line type="monotone" dataKey="sma20" stroke="#22c55e" strokeWidth={1} dot={false} name="SMA 20" />
                    <Line type="monotone" dataKey="sma50" stroke="#ef4444" strokeWidth={1} dot={false} name="SMA 50" />
                  </>
                )}
                {selectedIndicator === "ema" && (
                  <>
                    <Line type="monotone" dataKey="ema12" stroke="#3b82f6" strokeWidth={1} dot={false} name="EMA 12" />
                    <Line type="monotone" dataKey="ema26" stroke="#8b5cf6" strokeWidth={1} dot={false} name="EMA 26" />
                  </>
                )}
                {selectedIndicator === "bollinger" && (
                  <>
                    <Line
                      type="monotone"
                      dataKey="bollinger_upper"
                      stroke="#fbbf24"
                      strokeWidth={1}
                      strokeDasharray="3 3"
                      dot={false}
                      name="Upper Band"
                    />
                    <Line
                      type="monotone"
                      dataKey="bollinger_lower"
                      stroke="#fbbf24"
                      strokeWidth={1}
                      strokeDasharray="3 3"
                      dot={false}
                      name="Lower Band"
                    />
                  </>
                )}
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Technical Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Current Values</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">RSI (14):</span>
                <span
                  className={`font-semibold ${
                    currentData.rsi < 30 ? "text-green-400" : currentData.rsi > 70 ? "text-red-400" : "text-yellow-400"
                  }`}
                >
                  {currentData.rsi.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">SMA 20:</span>
                <span className="text-green-400 font-semibold">{formatPrice(currentData.sma20)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">SMA 50:</span>
                <span className="text-red-400 font-semibold">{formatPrice(currentData.sma50)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Momentum</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">MACD:</span>
                <span className={`font-semibold ${currentData.macd > 0 ? "text-green-400" : "text-red-400"}`}>
                  {(currentData.macd / 1000).toFixed(1)}K
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Signal:</span>
                <span className="text-blue-400 font-semibold">{(currentData.signal / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Histogram:</span>
                <span
                  className={`font-semibold ${
                    (currentData.macd - currentData.signal) > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {((currentData.macd - currentData.signal) / 1000).toFixed(1)}K
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Signal */}
        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white">Overall Signal:</span>
            <Badge className={`${getSignalColor("BUY")} px-3 py-1`}>BULLISH</Badge>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Technical indicators suggest a bullish trend with RSI in neutral territory and MACD showing positive
            momentum.
          </p>
        </div>
      </div>
    </ImperialCard>
  )
}
