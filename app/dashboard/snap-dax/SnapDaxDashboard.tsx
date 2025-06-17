"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, BarChart3, Activity, Zap, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"
import { motion } from "framer-motion"

const marketData = [
  {
    symbol: "SNAP",
    name: "Snapifi Token",
    price: 24.67,
    change: 12.5,
    volume: "2.4M",
    marketCap: "156M",
    trend: "up",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 2340.5,
    change: -3.2,
    volume: "8.9B",
    marketCap: "281B",
    trend: "down",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 43250.0,
    change: 5.8,
    volume: "12.1B",
    marketCap: "847B",
    trend: "up",
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: 98.45,
    change: 8.3,
    volume: "1.2B",
    marketCap: "42B",
    trend: "up",
  },
]

const portfolioAssets = [
  { name: "SNAP", allocation: 35, value: 12450, change: 15.2 },
  { name: "ETH", allocation: 25, value: 8900, change: -2.1 },
  { name: "BTC", allocation: 20, value: 7100, change: 8.7 },
  { name: "SOL", allocation: 15, value: 5340, change: 12.3 },
  { name: "Others", allocation: 5, value: 1780, change: 3.4 },
]

const recentTrades = [
  { type: "BUY", asset: "SNAP", amount: 150, price: 24.5, time: "2 min ago", status: "Completed" },
  { type: "SELL", asset: "ETH", amount: 2.5, price: 2345.0, time: "15 min ago", status: "Completed" },
  { type: "BUY", asset: "BTC", amount: 0.1, price: 43100.0, time: "1 hour ago", status: "Completed" },
  { type: "SELL", asset: "SOL", amount: 25, price: 97.8, time: "2 hours ago", status: "Completed" },
]

export default function SnapDaxDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")

  const portfolioStats = {
    totalValue: 35570,
    dayChange: 1247.5,
    dayChangePercent: 3.6,
    totalPnL: 8934.2,
    totalPnLPercent: 33.5,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-900 p-6">
      {/* Roman Column Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23fbbf24' fillOpacity='0.1'%3E%3Cpath d='M30 0v60M0 30h60'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-4">
            <SupremeAuthorityCoin size="lg" variant="logo" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-clip-text text-transparent font-serif">
                NEGOTIUM SUPREMUM
              </h1>
              <p className="text-amber-300/80 text-lg font-medium">Advanced Trading Platform</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              className="border-amber-500/30 text-amber-300 hover:bg-amber-500/20 bg-purple-900/30 backdrop-blur-sm"
            >
              <Target className="w-4 h-4 mr-2" />
              Quick Trade
            </Button>

            <Button
              className="bg-gradient-to-r from-amber-600 to-purple-600 hover:from-amber-700 hover:to-purple-700 text-white"
              style={{
                clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}
            >
              <Zap className="w-4 h-4 mr-2" />
              Advanced Trading
            </Button>
          </div>
        </motion.div>

        {/* Portfolio Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl border-amber-400/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-300 font-serif text-sm">VALOR TOTALIS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${portfolioStats.totalValue.toLocaleString()}</div>
              <p className="text-indigo-200/70 text-sm">Total Portfolio Value</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl border-amber-400/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-300 font-serif text-sm">MUTATIO DIEI</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold flex items-center ${
                  portfolioStats.dayChangePercent >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {portfolioStats.dayChangePercent >= 0 ? (
                  <TrendingUp className="w-5 h-5 mr-1" />
                ) : (
                  <TrendingDown className="w-5 h-5 mr-1" />
                )}
                {portfolioStats.dayChangePercent >= 0 ? "+" : ""}
                {portfolioStats.dayChangePercent}%
              </div>
              <p className="text-indigo-200/70 text-sm">${portfolioStats.dayChange.toLocaleString()} today</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl border-amber-400/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-300 font-serif text-sm">LUCRUM TOTALE</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-400">+${portfolioStats.totalPnL.toLocaleString()}</div>
              <p className="text-indigo-200/70 text-sm">+{portfolioStats.totalPnLPercent}% all time</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl border-amber-400/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-300 font-serif text-sm">NEGOTIA ACTIVA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <p className="text-indigo-200/70 text-sm">Active Positions</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Market Overview */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl border-amber-400/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-amber-300 font-serif text-xl">MERCATUS CONSPECTUS</CardTitle>
                    <CardDescription className="text-purple-200/80">Market Overview & Top Assets</CardDescription>
                  </div>

                  <div className="flex space-x-1 bg-purple-900/30 rounded-lg p-1">
                    {["1H", "24H", "7D", "30D"].map((timeframe) => (
                      <Button
                        key={timeframe}
                        variant={selectedTimeframe === timeframe.toLowerCase() ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setSelectedTimeframe(timeframe.toLowerCase())}
                        className={`text-xs ${
                          selectedTimeframe === timeframe.toLowerCase()
                            ? "bg-gradient-to-r from-amber-600 to-purple-600 text-white"
                            : "text-amber-300 hover:bg-amber-500/20"
                        }`}
                      >
                        {timeframe}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {marketData.map((asset, index) => (
                    <motion.div
                      key={asset.symbol}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-800/30 to-indigo-800/30 rounded-lg border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300 cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{asset.symbol.slice(0, 2)}</span>
                        </div>

                        <div>
                          <div className="font-semibold text-white">{asset.symbol}</div>
                          <div className="text-sm text-indigo-200/70">{asset.name}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-white">${asset.price.toLocaleString()}</div>
                        <div
                          className={`text-sm flex items-center ${
                            asset.change >= 0 ? "text-emerald-400" : "text-red-400"
                          }`}
                        >
                          {asset.change >= 0 ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {asset.change >= 0 ? "+" : ""}
                          {asset.change}%
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-indigo-200/70">Vol: {asset.volume}</div>
                        <div className="text-sm text-indigo-200/70">MCap: {asset.marketCap}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Trades */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl border-amber-400/20">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif text-xl">NEGOTIA RECENTIA</CardTitle>
                <CardDescription className="text-purple-200/80">Recent Trading Activity</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  {recentTrades.map((trade, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-800/20 to-indigo-800/20 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                    >
                      <div className="flex items-center space-x-3">
                        <Badge
                          className={`${
                            trade.type === "BUY"
                              ? "bg-emerald-600/20 text-emerald-300 border-emerald-500/30"
                              : "bg-red-600/20 text-red-300 border-red-500/30"
                          }`}
                        >
                          {trade.type}
                        </Badge>

                        <div>
                          <div className="font-semibold text-white">
                            {trade.amount} {trade.asset}
                          </div>
                          <div className="text-sm text-indigo-200/70">@ ${trade.price.toLocaleString()}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-indigo-200/70">{trade.time}</div>
                        <Badge className="bg-emerald-600/20 text-emerald-300 border-emerald-500/30 text-xs">
                          {trade.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Portfolio Allocation */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl border-amber-400/20">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif text-xl">DISTRIBUTIO PORTFOLIO</CardTitle>
                <CardDescription className="text-purple-200/80">Portfolio Allocation</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {portfolioAssets.map((asset, index) => (
                    <motion.div
                      key={asset.name}
                      className="space-y-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.6 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-white">{asset.name}</span>
                          <span className="text-sm text-indigo-200/70">{asset.allocation}%</span>
                        </div>

                        <div className="text-right">
                          <div className="font-semibold text-white">${asset.value.toLocaleString()}</div>
                          <div className={`text-sm ${asset.change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                            {asset.change >= 0 ? "+" : ""}
                            {asset.change}%
                          </div>
                        </div>
                      </div>

                      <div className="w-full bg-purple-800/30 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-amber-500 to-purple-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${asset.allocation}%` }}
                          transition={{ delay: 0.2 * index, duration: 0.8 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl border-amber-400/20">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif text-xl">ACTIONES VELOCES</CardTitle>
                <CardDescription className="text-purple-200/80">Quick Trading Actions</CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                  style={{
                    clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                  }}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Buy SNAP
                </Button>

                <Button
                  className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white"
                  style={{
                    clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                  }}
                >
                  <TrendingDown className="w-4 h-4 mr-2" />
                  Sell Position
                </Button>

                <Button variant="outline" className="w-full border-amber-500/30 text-amber-300 hover:bg-amber-500/20">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>

                <Button variant="outline" className="w-full border-amber-500/30 text-amber-300 hover:bg-amber-500/20">
                  <Activity className="w-4 h-4 mr-2" />
                  Trading History
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
