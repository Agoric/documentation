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
import { RoyalHolographicTitle } from "@/components/ui/royal-holographic-title"
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
        {/* Imperial Header with Royal Holographic Title */}
        <div className="text-center py-12">
          <ImperialCoinDisplay size="large" showDetails={false} animated={true} />

          <div className="mt-8 space-y-6">
            <RoyalHolographicTitle size="xl" className="mb-4">
              Imperial Digital Asset Exchange
            </RoyalHolographicTitle>

            <div className="relative">
              <p className="text-xl text-yellow-300/90 font-medium tracking-wide">
                Supreme Cryptocurrency Command Center
              </p>
              <div className="absolute inset-0 text-xl text-yellow-200/50 blur-sm">
                Supreme Cryptocurrency Command Center
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30 px-4 py-2">
                <Crown className="w-4 h-4 mr-2" />
                Royal Trading
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Secure Vault
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                Elite Access
              </Badge>
            </div>
          </div>
        </div>

        {/* Portfolio Overview */}
        <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <RoyalHolographicTitle size="medium" className="mb-2">
                Total Imperial Portfolio
              </RoyalHolographicTitle>
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                ${totalPortfolioValue.toLocaleString()}
              </div>
              <div className="flex items-center justify-center gap-2 text-green-400">
                <TrendingUp className="h-5 w-5" />
                <span className="text-lg">+18.7% this month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 border-yellow-500/20 h-14">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300 text-lg"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="portfolio"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300 text-lg"
            >
              Portfolio
            </TabsTrigger>
            <TabsTrigger
              value="trading"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300 text-lg"
            >
              Trading
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300 text-lg"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300 text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    24h Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-400">$847,392</div>
                  <div className="text-green-300">+12.5% from yesterday</div>
                  <Progress value={75} className="mt-3 h-3" />
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300 text-lg flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Active Positions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-400">47</div>
                  <div className="text-yellow-300">Across 12 assets</div>
                  <Progress value={85} className="mt-3 h-3" />
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300 text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    P&L Today
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-400">+$12,847</div>
                  <div className="text-green-300">+5.2% unrealized</div>
                  <Progress value={92} className="mt-3 h-3" />
                </CardContent>
              </Card>
            </div>

            <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-300 text-xl">Market Overview</CardTitle>
                <CardDescription className="text-yellow-200/60 text-base">
                  Imperial cryptocurrency market status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { name: "Bitcoin", symbol: "BTC", price: "$67,420", change: "+5.2%", positive: true },
                    { name: "Ethereum", symbol: "ETH", price: "$3,245", change: "-2.1%", positive: false },
                    { name: "Solana", symbol: "SOL", price: "$98.45", change: "+8.7%", positive: true },
                    { name: "Cardano", symbol: "ADA", price: "$0.52", change: "+3.4%", positive: true },
                  ].map((coin, index) => (
                    <div key={index} className="p-4 bg-yellow-500/5 rounded-lg border border-yellow-400/10">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-yellow-200 text-lg">{coin.symbol}</p>
                          <p className="text-yellow-300/60">{coin.name}</p>
                        </div>
                        <div
                          className={`text-sm px-3 py-1 rounded ${
                            coin.positive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {coin.change}
                        </div>
                      </div>
                      <p className="text-xl font-bold text-yellow-300 mt-2">{coin.price}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-8">
            <div className="flex justify-between items-center">
              <RoyalHolographicTitle size="large">Imperial Asset Holdings</RoyalHolographicTitle>
              <Button className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/30 px-6 py-3 text-lg">
                <Plus className="h-5 w-5 mr-2" />
                Add Asset
              </Button>
            </div>

            <div className="space-y-6">
              {assets.map((asset) => (
                <Card
                  key={asset.id}
                  className="bg-black/20 backdrop-blur-md border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400 text-2xl font-bold">
                          {asset.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-yellow-300 text-xl">{asset.name}</h3>
                          <p className="text-yellow-200/60 text-lg">{asset.symbol}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-bold text-yellow-300">${asset.price.toLocaleString()}</p>
                        <div
                          className={`text-lg flex items-center gap-1 ${
                            asset.change >= 0 ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {asset.change >= 0 ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          {asset.change >= 0 ? "+" : ""}
                          {asset.change}%
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-bold text-yellow-300">{asset.holdings}</p>
                        <p className="text-yellow-200/60">Holdings</p>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-bold text-yellow-300">${asset.value.toLocaleString()}</p>
                        <p className="text-yellow-200/60">Total Value</p>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-yellow-400/30 text-yellow-300 hover:bg-yellow-500/20 px-4 py-2"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-yellow-400/30 text-yellow-300 hover:bg-yellow-500/20 px-4 py-2"
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

          <TabsContent value="trading" className="space-y-8">
            <div className="flex justify-between items-center">
              <RoyalHolographicTitle size="large">Imperial Trading Center</RoyalHolographicTitle>
              <Button className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/30 px-6 py-3 text-lg">
                <Plus className="h-5 w-5 mr-2" />
                New Order
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300 text-xl">Quick Trade</CardTitle>
                  <CardDescription className="text-yellow-200/60 text-base">
                    Execute imperial trading orders
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-400/30 py-3 text-lg">
                      BUY
                    </Button>
                    <Button
                      variant="outline"
                      className="border-red-400/30 text-red-300 hover:bg-red-500/20 py-3 text-lg"
                    >
                      SELL
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <label className="text-yellow-300 text-lg">Asset</label>
                    <select className="w-full p-3 bg-black/30 border border-yellow-500/20 rounded-md text-yellow-200 text-lg">
                      <option>Bitcoin (BTC)</option>
                      <option>Ethereum (ETH)</option>
                      <option>Solana (SOL)</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-yellow-300 text-lg">Amount</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full p-3 bg-black/30 border border-yellow-500/20 rounded-md text-yellow-200 text-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-yellow-300 text-lg">Price (USD)</label>
                    <input
                      type="number"
                      placeholder="Market Price"
                      className="w-full p-3 bg-black/30 border border-yellow-500/20 rounded-md text-yellow-200 text-lg"
                    />
                  </div>

                  <Button className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/30 py-3 text-lg">
                    Execute Order
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300 text-xl">Recent Trades</CardTitle>
                  <CardDescription className="text-yellow-200/60 text-base">
                    Your imperial trading history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trades.map((trade) => (
                      <div
                        key={trade.id}
                        className="flex items-center justify-between p-4 bg-yellow-500/5 rounded-lg border border-yellow-400/10"
                      >
                        <div className="flex items-center gap-4">
                          <Badge
                            className={`px-3 py-1 ${
                              trade.type === "BUY" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {trade.type}
                          </Badge>
                          <div>
                            <p className="font-medium text-yellow-200 text-lg">{trade.asset}</p>
                            <p className="text-yellow-300/60">{trade.timestamp}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-yellow-300 text-lg">
                            {trade.amount} @ ${trade.price.toLocaleString()}
                          </p>
                          <p className="text-yellow-200/60">${trade.total.toLocaleString()}</p>
                        </div>
                        <Badge
                          className={`px-3 py-1 ${
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

          <TabsContent value="analytics" className="space-y-8">
            <RoyalHolographicTitle size="large">Imperial Trading Analytics</RoyalHolographicTitle>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300 text-lg">Total Profit/Loss</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-400">+$47,392</div>
                  <div className="text-green-300">+23.8% all time</div>
                  <Progress value={78} className="mt-3 h-3" />
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300 text-lg">Win Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-400">73.2%</div>
                  <div className="text-yellow-300">156 of 213 trades</div>
                  <Progress value={73} className="mt-3 h-3" />
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300 text-lg">Best Performer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-400">SOL</div>
                  <div className="text-green-300">+187.5% returns</div>
                  <Progress value={95} className="mt-3 h-3" />
                </CardContent>
              </Card>
            </div>

            <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-300 text-xl">Portfolio Allocation</CardTitle>
                <CardDescription className="text-yellow-200/60 text-base">Imperial asset distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { asset: "Bitcoin (BTC)", percentage: 67, value: 168551 },
                    { asset: "Ethereum (ETH)", percentage: 21, value: 51284 },
                    { asset: "Solana (SOL)", percentage: 10, value: 24613 },
                    { asset: "Cardano (ADA)", percentage: 2, value: 5200 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-yellow-200 text-lg">{item.asset}</span>
                        <span className="text-yellow-300 text-lg">
                          ${item.value.toLocaleString()} ({item.percentage}%)
                        </span>
                      </div>
                      <Progress value={item.percentage} className="h-3" />
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
            <CardTitle className="text-yellow-300 flex items-center gap-3 text-xl">
              <Award className="h-6 w-6" />
              Imperial Trading Commands
            </CardTitle>
            <CardDescription className="text-yellow-200/60 text-base">Execute supreme market authority</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Button className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/30 py-4 text-lg">
                <Crown className="h-5 w-5 mr-2" />
                Royal Orders
              </Button>
              <Button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-400/30 py-4 text-lg">
                <Shield className="h-5 w-5 mr-2" />
                Vault Security
              </Button>
              <Button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-400/30 py-4 text-lg">
                <Globe className="h-5 w-5 mr-2" />
                Market Analysis
              </Button>
              <Button className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-400/30 py-4 text-lg">
                <Star className="h-5 w-5 mr-2" />
                Portfolio Review
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
