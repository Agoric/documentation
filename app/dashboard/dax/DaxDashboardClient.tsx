"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HolographicBackground } from "@/components/ui/holographic-background"
import { ImperialCoinDisplay } from "@/components/ui/imperial-coin-display"
import { ImperialAmbientController } from "@/components/ui/imperial-ambient-controller"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Crown,
  Shield,
  Star,
  Award,
  Activity,
  Globe,
  Plus,
  Eye,
} from "lucide-react"

export default function DaxDashboardClient() {
  const [activeTab, setActiveTab] = useState("overview")

  const assets = [
    {
      id: "1",
      symbol: "BTC",
      name: "Bitcoin",
      price: 67420.5,
      change: 5.2,
      holdings: 2.5,
      value: 168551.25,
      icon: "₿",
    },
    {
      id: "2",
      symbol: "ETH",
      name: "Ethereum",
      price: 3245.8,
      change: -2.1,
      holdings: 15.8,
      value: 51283.64,
      icon: "Ξ",
    },
    {
      id: "3",
      symbol: "SOL",
      name: "Solana",
      price: 98.45,
      change: 8.7,
      holdings: 250,
      value: 24612.5,
      icon: "◎",
    },
    {
      id: "4",
      symbol: "ADA",
      name: "Cardano",
      price: 0.52,
      change: 3.4,
      holdings: 10000,
      value: 5200.0,
      icon: "₳",
    },
  ]

  const totalPortfolioValue = assets.reduce((sum, asset) => sum + asset.value, 0)

  const trades = [
    {
      id: "1",
      type: "BUY",
      asset: "BTC",
      amount: 0.5,
      price: 66800.0,
      total: 33400.0,
      timestamp: "2024-01-15 14:30:25",
      status: "completed",
    },
    {
      id: "2",
      type: "SELL",
      asset: "ETH",
      amount: 2.0,
      price: 3280.5,
      total: 6561.0,
      timestamp: "2024-01-15 12:15:10",
      status: "completed",
    },
    {
      id: "3",
      type: "BUY",
      asset: "SOL",
      amount: 50,
      price: 95.2,
      total: 4760.0,
      timestamp: "2024-01-15 09:45:33",
      status: "pending",
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      <HolographicBackground variant="financial" />
      <ImperialAmbientController autoStart={true} defaultTrack="royal-court" compact={true} />

      <div className="relative z-10 p-6 space-y-8">
        {/* Imperial Header */}
        <div className="text-center py-6">
          <ImperialCoinDisplay size="large" showDetails={false} animated={true} />

          <div className="mt-4 space-y-2">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
              Imperial Digital Asset Exchange
            </h1>
            <p className="text-yellow-300/80">Supreme Cryptocurrency Command Center</p>
            <div className="flex items-center justify-center gap-3 mt-3">
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">
                <Crown className="w-3 h-3 mr-1" />
                Royal Trading
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                <Shield className="w-3 h-3 mr-1" />
                Secure Vault
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                <Star className="w-3 h-3 mr-1" />
                Elite Access
              </Badge>
            </div>
          </div>
        </div>

        {/* Portfolio Overview */}
        <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <p className="text-yellow-300/80 text-sm">Total Imperial Portfolio</p>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                ${totalPortfolioValue.toLocaleString()}
              </div>
              <div className="flex items-center justify-center gap-2 text-green-400">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">+18.7% this month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 border-yellow-500/20">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="portfolio"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300"
            >
              Portfolio
            </TabsTrigger>
            <TabsTrigger
              value="trading"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300"
            >
              Trading
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300 text-sm flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    24h Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">$847,392</div>
                  <div className="text-sm text-green-300">+12.5% from yesterday</div>
                  <Progress value={75} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300 text-sm flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Active Positions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">47</div>
                  <div className="text-sm text-yellow-300">Across 12 assets</div>
                  <Progress value={85} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300 text-sm flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    P&L Today
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">+$12,847</div>
                  <div className="text-sm text-green-300">+5.2% unrealized</div>
                  <Progress value={92} className="mt-2 h-2" />
                </CardContent>
              </Card>
            </div>

            <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-300">Market Overview</CardTitle>
                <CardDescription className="text-yellow-200/60">Imperial cryptocurrency market status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: "Bitcoin", symbol: "BTC", price: "$67,420", change: "+5.2%", positive: true },
                    { name: "Ethereum", symbol: "ETH", price: "$3,245", change: "-2.1%", positive: false },
                    { name: "Solana", symbol: "SOL", price: "$98.45", change: "+8.7%", positive: true },
                    { name: "Cardano", symbol: "ADA", price: "$0.52", change: "+3.4%", positive: true },
                  ].map((coin, index) => (
                    <div key={index} className="p-3 bg-yellow-500/5 rounded-lg border border-yellow-400/10">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-yellow-200">{coin.symbol}</p>
                          <p className="text-xs text-yellow-300/60">{coin.name}</p>
                        </div>
                        <div
                          className={`text-xs px-2 py-1 rounded ${
                            coin.positive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {coin.change}
                        </div>
                      </div>
                      <p className="text-lg font-bold text-yellow-300 mt-1">{coin.price}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-yellow-300">Imperial Asset Holdings</h2>
              <Button className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/30">
                <Plus className="h-4 w-4 mr-2" />
                Add Asset
              </Button>
            </div>

            <div className="space-y-4">
              {assets.map((asset) => (
                <Card
                  key={asset.id}
                  className="bg-black/20 backdrop-blur-md border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400 text-xl font-bold">
                          {asset.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-yellow-300">{asset.name}</h3>
                          <p className="text-sm text-yellow-200/60">{asset.symbol}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-yellow-300">${asset.price.toLocaleString()}</p>
                        <div
                          className={`text-sm flex items-center gap-1 ${
                            asset.change >= 0 ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {asset.change >= 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {asset.change >= 0 ? "+" : ""}
                          {asset.change}%
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-yellow-300">{asset.holdings}</p>
                        <p className="text-sm text-yellow-200/60">Holdings</p>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-yellow-300">${asset.value.toLocaleString()}</p>
                        <p className="text-sm text-yellow-200/60">Total Value</p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-yellow-400/30 text-yellow-300 hover:bg-yellow-500/20"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-yellow-400/30 text-yellow-300 hover:bg-yellow-500/20"
                        >
                          Trade
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trading" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-yellow-300">Imperial Trading Center</h2>
              <Button className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/30">
                <Plus className="h-4 w-4 mr-2" />
                New Order
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300">Quick Trade</CardTitle>
                  <CardDescription className="text-yellow-200/60">Execute imperial trading orders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-400/30">
                      BUY
                    </Button>
                    <Button variant="outline" className="border-red-400/30 text-red-300 hover:bg-red-500/20">
                      SELL
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-yellow-300">Asset</label>
                    <select className="w-full p-2 bg-black/30 border border-yellow-500/20 rounded-md text-yellow-200">
                      <option>Bitcoin (BTC)</option>
                      <option>Ethereum (ETH)</option>
                      <option>Solana (SOL)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-yellow-300">Amount</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full p-2 bg-black/30 border border-yellow-500/20 rounded-md text-yellow-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-yellow-300">Price (USD)</label>
                    <input
                      type="number"
                      placeholder="Market Price"
                      className="w-full p-2 bg-black/30 border border-yellow-500/20 rounded-md text-yellow-200"
                    />
                  </div>

                  <Button className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/30">
                    Execute Order
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300">Recent Trades</CardTitle>
                  <CardDescription className="text-yellow-200/60">Your imperial trading history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trades.map((trade) => (
                      <div
                        key={trade.id}
                        className="flex items-center justify-between p-3 bg-yellow-500/5 rounded-lg border border-yellow-400/10"
                      >
                        <div className="flex items-center gap-3">
                          <Badge
                            className={`${
                              trade.type === "BUY" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {trade.type}
                          </Badge>
                          <div>
                            <p className="font-medium text-yellow-200">{trade.asset}</p>
                            <p className="text-xs text-yellow-300/60">{trade.timestamp}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-yellow-300">
                            {trade.amount} @ ${trade.price.toLocaleString()}
                          </p>
                          <p className="text-sm text-yellow-200/60">${trade.total.toLocaleString()}</p>
                        </div>
                        <Badge
                          className={`${
                            trade.status === "completed"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {trade.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-xl font-semibold text-yellow-300">Imperial Trading Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300 text-sm">Total Profit/Loss</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">+$47,392</div>
                  <div className="text-sm text-green-300">+23.8% all time</div>
                  <Progress value={78} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300 text-sm">Win Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">73.2%</div>
                  <div className="text-sm text-yellow-300">156 of 213 trades</div>
                  <Progress value={73} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300 text-sm">Best Performer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">SOL</div>
                  <div className="text-sm text-green-300">+187.5% returns</div>
                  <Progress value={95} className="mt-2 h-2" />
                </CardContent>
              </Card>
            </div>

            <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-300">Portfolio Allocation</CardTitle>
                <CardDescription className="text-yellow-200/60">Imperial asset distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { asset: "Bitcoin (BTC)", percentage: 67, value: 168551 },
                    { asset: "Ethereum (ETH)", percentage: 21, value: 51284 },
                    { asset: "Solana (SOL)", percentage: 10, value: 24613 },
                    { asset: "Cardano (ADA)", percentage: 2, value: 5200 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-yellow-200">{item.asset}</span>
                        <span className="text-yellow-300">
                          ${item.value.toLocaleString()} ({item.percentage}%)
                        </span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Imperial Command Actions */}
        <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-yellow-300 flex items-center gap-2">
              <Award className="h-5 w-5" />
              Imperial Trading Commands
            </CardTitle>
            <CardDescription className="text-yellow-200/60">Execute supreme market authority</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/30">
                <Crown className="h-4 w-4 mr-2" />
                Royal Orders
              </Button>
              <Button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-400/30">
                <Shield className="h-4 w-4 mr-2" />
                Vault Security
              </Button>
              <Button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-400/30">
                <Globe className="h-4 w-4 mr-2" />
                Market Analysis
              </Button>
              <Button className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-400/30">
                <Star className="h-4 w-4 mr-2" />
                Portfolio Review
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
