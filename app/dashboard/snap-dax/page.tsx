"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Coins,
  BarChart3,
  Activity,
  Zap,
  Bot,
  Target,
  ArrowUpDown,
  Wallet,
  PieChart,
  Star,
  Settings,
  Plus,
  Eye,
} from "lucide-react"

export default function SnapDaxPage() {
  const [selectedTimeframe, setSelectedTimeframe] = React.useState("24h")
  const [autoTradingEnabled, setAutoTradingEnabled] = React.useState(true)

  const portfolioStats = {
    totalValue: 847392.5,
    dailyChange: 12450.75,
    dailyChangePercent: 1.47,
    totalReturn: 24.7,
    activePositions: 12,
    availableCash: 45280.3,
  }

  const cryptoHoldings = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      amount: 2.45,
      value: 105420.5,
      change: 2.4,
      allocation: 35.2,
      color: "bg-orange-500",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      amount: 45.8,
      value: 89650.25,
      change: -1.2,
      allocation: 29.8,
      color: "bg-blue-500",
    },
    {
      symbol: "SOL",
      name: "Solana",
      amount: 850.2,
      value: 67890.75,
      change: 5.7,
      allocation: 22.6,
      color: "bg-purple-500",
    },
    {
      symbol: "ADA",
      name: "Cardano",
      amount: 12500,
      value: 25680.4,
      change: 3.1,
      allocation: 8.5,
      color: "bg-green-500",
    },
    {
      symbol: "DOT",
      name: "Polkadot",
      amount: 1250.5,
      value: 11750.6,
      change: -0.8,
      allocation: 3.9,
      color: "bg-pink-500",
    },
  ]

  const tradingBots = [
    {
      name: "DCA Bot",
      strategy: "Dollar Cost Averaging",
      status: "active",
      profit: 2450.75,
      trades: 24,
      winRate: 87.5,
    },
    {
      name: "Grid Bot",
      strategy: "Grid Trading",
      status: "active",
      profit: 1890.25,
      trades: 156,
      winRate: 72.3,
    },
    {
      name: "Arbitrage Bot",
      strategy: "Cross-Exchange Arbitrage",
      status: "paused",
      profit: 3240.8,
      trades: 89,
      winRate: 94.4,
    },
  ]

  const recentTrades = [
    {
      type: "buy",
      symbol: "BTC",
      amount: 0.15,
      price: 43250.0,
      total: 6487.5,
      time: "2 minutes ago",
      status: "completed",
    },
    {
      type: "sell",
      symbol: "ETH",
      amount: 2.5,
      price: 2580.0,
      total: 6450.0,
      time: "15 minutes ago",
      status: "completed",
    },
    {
      type: "buy",
      symbol: "SOL",
      amount: 50,
      price: 78.9,
      total: 3945.0,
      time: "1 hour ago",
      status: "completed",
    },
  ]

  const marketData = [
    { symbol: "BTC", price: 43250.0, change: 2.4, volume: "28.5B" },
    { symbol: "ETH", price: 2580.0, change: -1.2, volume: "15.2B" },
    { symbol: "SOL", price: 78.9, change: 5.7, volume: "2.8B" },
    { symbol: "ADA", price: 0.52, change: 3.1, volume: "890M" },
    { symbol: "DOT", price: 9.4, change: -0.8, volume: "450M" },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatCrypto = (amount: number, decimals = 4) => {
    return amount.toFixed(decimals)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              SNAP-DAX Trading Platform
            </h1>
            <p className="text-xl text-blue-200 mt-2">Advanced Digital Asset Exchange with AI-Powered Trading</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Activity className="h-4 w-4 mr-2" />
              Live Trading
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Bot className="h-4 w-4 mr-2" />
              AI Enabled
            </Badge>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Trade
            </Button>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-200">Total Portfolio Value</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(portfolioStats.totalValue)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-green-400">
                      +{formatCurrency(portfolioStats.dailyChange)} ({portfolioStats.dailyChangePercent}%)
                    </span>
                  </div>
                </div>
                <Wallet className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 backdrop-blur-sm border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-200">Total Return</p>
                  <p className="text-2xl font-bold text-white">+{portfolioStats.totalReturn}%</p>
                  <p className="text-sm text-green-400">All time</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-200">Active Positions</p>
                  <p className="text-2xl font-bold text-white">{portfolioStats.activePositions}</p>
                  <p className="text-sm text-purple-400">Cryptocurrencies</p>
                </div>
                <Coins className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/30 backdrop-blur-sm border-orange-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-200">Available Cash</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(portfolioStats.availableCash)}</p>
                  <p className="text-sm text-orange-400">Ready to trade</p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 backdrop-blur-sm">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="trading">Trading</TabsTrigger>
            <TabsTrigger value="bots">AI Bots</TabsTrigger>
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="staking">Staking</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Holdings */}
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <PieChart className="h-5 w-5" />
                    Current Holdings
                  </CardTitle>
                  <CardDescription className="text-slate-300">Your cryptocurrency portfolio breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cryptoHoldings.map((holding, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${holding.color}`} />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">{holding.symbol}</span>
                            <span className="text-sm text-slate-400">{holding.name}</span>
                          </div>
                          <div className="text-sm text-slate-400">
                            {formatCrypto(holding.amount)} {holding.symbol}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-white">{formatCurrency(holding.value)}</div>
                        <div
                          className={`text-sm flex items-center ${holding.change >= 0 ? "text-green-400" : "text-red-400"}`}
                        >
                          {holding.change >= 0 ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {Math.abs(holding.change)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Trades */}
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Activity className="h-5 w-5" />
                    Recent Trades
                  </CardTitle>
                  <CardDescription className="text-slate-300">Your latest trading activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentTrades.map((trade, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${trade.type === "buy" ? "bg-green-500/20" : "bg-red-500/20"}`}>
                          <ArrowUpDown
                            className={`h-4 w-4 ${trade.type === "buy" ? "text-green-400" : "text-red-400"}`}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {trade.type.toUpperCase()} {formatCrypto(trade.amount)} {trade.symbol}
                          </div>
                          <div className="text-sm text-slate-400">@ {formatCurrency(trade.price)}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-white">{formatCurrency(trade.total)}</div>
                        <div className="text-sm text-slate-400">{trade.time}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trading" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Trade */}
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Zap className="h-5 w-5" />
                    Quick Trade
                  </CardTitle>
                  <CardDescription className="text-blue-200">Execute trades instantly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Buy
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700">
                      <TrendingDown className="h-4 w-4 mr-2" />
                      Sell
                    </Button>
                  </div>
                  <div className="text-center text-blue-200 py-4">
                    <Coins className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Advanced trading interface</p>
                  </div>
                </CardContent>
              </Card>

              {/* Order Book */}
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <BarChart3 className="h-5 w-5" />
                    Order Book
                  </CardTitle>
                  <CardDescription className="text-slate-300">Live market depth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-slate-400 py-8">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Real-time order book data</p>
                  </div>
                </CardContent>
              </Card>

              {/* Trading Chart */}
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Activity className="h-5 w-5" />
                    Price Chart
                  </CardTitle>
                  <CardDescription className="text-slate-300">Technical analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-slate-400 py-8">
                    <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Advanced charting tools</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bots" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">AI Trading Bots</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Bot
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {tradingBots.map((bot, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{bot.name}</CardTitle>
                      <Badge
                        className={
                          bot.status === "active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }
                      >
                        {bot.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-slate-300">{bot.strategy}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-slate-400">Profit</div>
                        <div className="font-medium text-green-400">{formatCurrency(bot.profit)}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Trades</div>
                        <div className="font-medium text-white">{bot.trades}</div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Win Rate</span>
                        <span className="text-white">{bot.winRate}%</span>
                      </div>
                      <Progress value={bot.winRate} className="h-2" />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Settings className="h-4 w-4 mr-2" />
                        Config
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <BarChart3 className="h-5 w-5" />
                  Market Overview
                </CardTitle>
                <CardDescription className="text-slate-300">Live cryptocurrency market data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketData.map((crypto, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="font-medium text-white">{crypto.symbol}</div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="font-medium text-white">{formatCurrency(crypto.price)}</div>
                          <div className="text-sm text-slate-400">Vol: {crypto.volume}</div>
                        </div>
                        <div className={`flex items-center ${crypto.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {crypto.change >= 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          {Math.abs(crypto.change)}%
                        </div>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Trade
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staking" className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Star className="h-5 w-5" />
                  Staking Rewards
                </CardTitle>
                <CardDescription className="text-purple-200">Earn passive income on your holdings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-purple-200 py-8">
                  <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Staking Platform</p>
                  <p className="text-sm">Earn up to 12% APY on supported cryptocurrencies</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <BarChart3 className="h-5 w-5" />
                    Performance Analytics
                  </CardTitle>
                  <CardDescription className="text-slate-300">Portfolio performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-slate-400 py-8">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">Advanced Analytics</p>
                    <p className="text-sm">Detailed performance tracking and insights</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Target className="h-5 w-5" />
                    Risk Analysis
                  </CardTitle>
                  <CardDescription className="text-slate-300">Portfolio risk assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Risk Score</span>
                      <Badge className="bg-yellow-500/20 text-yellow-400">Medium</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Volatility</span>
                      <span className="text-white">18.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Sharpe Ratio</span>
                      <span className="text-white">1.42</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
