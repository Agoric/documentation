"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Activity, Zap, RefreshCw, Clock, Signal } from "lucide-react"

interface MarketData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
  sector: string
  trend: "up" | "down" | "neutral"
}

interface MarketIndex {
  name: string
  value: number
  change: number
  changePercent: number
}

export function RealTimeMarketMatrix({ marketData, isLoading }: { marketData: MarketData[]; isLoading: boolean }) {
  const [indices, setIndices] = useState<MarketIndex[]>([
    { name: "S&P 500", value: 4567.89, change: 23.45, changePercent: 0.52 },
    { name: "NASDAQ", value: 14234.56, change: -45.67, changePercent: -0.32 },
    { name: "DOW", value: 35678.9, change: 156.78, changePercent: 0.44 },
    { name: "VIX", value: 18.45, change: -1.23, changePercent: -6.25 },
  ])
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setIndices((prev) =>
        prev.map((index) => ({
          ...index,
          value: index.value + (Math.random() - 0.5) * 10,
          change: index.change + (Math.random() - 0.5) * 2,
          changePercent: index.changePercent + (Math.random() - 0.5) * 0.1,
        })),
      )
      setLastUpdate(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
    setLastUpdate(new Date())
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`
    if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`
    if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`
    return value.toFixed(2)
  }

  return (
    <Card className="bg-slate-900/50 border-cyan-500/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-cyan-300 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Real-Time Market Matrix
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
              <Signal className="h-3 w-3 mr-1" />
              Live
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="border-cyan-500/30 hover:bg-cyan-500/20"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Clock className="h-3 w-3" />
          <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Market Indices */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {indices.map((index, i) => (
            <motion.div
              key={index.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-3 rounded-lg bg-slate-800/30 border border-slate-600/30"
            >
              <div className="text-xs text-slate-400 mb-1">{index.name}</div>
              <div className="text-lg font-bold text-white">{formatNumber(index.value)}</div>
              <div
                className={`text-xs flex items-center gap-1 ${index.change >= 0 ? "text-green-400" : "text-red-400"}`}
              >
                {index.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {index.changePercent.toFixed(2)}%
              </div>
            </motion.div>
          ))}
        </div>

        {/* Top Movers */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-400" />
            Top Market Movers
          </h4>

          {isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-12 bg-slate-700/30 rounded-lg" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {marketData.slice(0, 8).map((stock, index) => (
                <motion.div
                  key={stock.symbol}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-800/20 border border-slate-600/20 hover:bg-slate-700/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">{stock.symbol.slice(0, 2)}</span>
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm">{stock.symbol}</div>
                      <div className="text-xs text-slate-400">{stock.sector}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-medium text-white">{formatCurrency(stock.price)}</div>
                    <div
                      className={`text-xs flex items-center gap-1 ${
                        stock.change >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {stock.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {stock.changePercent.toFixed(2)}%
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-slate-400">Vol</div>
                    <div className="text-xs text-slate-300">{formatNumber(stock.volume)}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Market Summary */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-600/30">
          <div className="text-center">
            <div className="text-xs text-slate-400 mb-1">Advancing</div>
            <div className="text-lg font-bold text-green-400">1,847</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-400 mb-1">Declining</div>
            <div className="text-lg font-bold text-red-400">1,234</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-400 mb-1">Unchanged</div>
            <div className="text-lg font-bold text-slate-400">567</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
