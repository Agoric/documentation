"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  BarChart3,
  Coins,
  Calculator,
  RefreshCw,
  Bell,
  Shield,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Info,
} from "lucide-react"

const marketData = [
  { symbol: "BTC", name: "Bitcoin", price: 67420.5, change: 3.6, volume: "28.5B", marketCap: "1.32T" },
  { symbol: "ETH", name: "Ethereum", price: 3842.75, change: -1.2, volume: "15.2B", marketCap: "462B" },
  { symbol: "ADA", name: "Cardano", price: 0.4521, change: 5.5, volume: "1.8B", marketCap: "15.9B" },
  { symbol: "SOL", name: "Solana", price: 198.45, change: 6.6, volume: "3.2B", marketCap: "93.4B" },
  { symbol: "DOT", name: "Polkadot", price: 7.23, change: -2.1, volume: "892M", marketCap: "10.1B" },
  { symbol: "LINK", name: "Chainlink", price: 14.67, change: 4.2, volume: "1.1B", marketCap: "8.6B" },
]

const portfolioData = [
  { asset: "Bitcoin", symbol: "BTC", amount: 0.75, value: 50565.38, allocation: 62.5 },
  { asset: "Ethereum", symbol: "ETH", amount: 4.2, value: 16139.55, allocation: 19.9 },
  { asset: "Cardano", symbol: "ADA", amount: 15000, value: 6781.5, allocation: 8.4 },
  { asset: "Solana", symbol: "SOL", amount: 38, value: 7541.1, allocation: 9.3 },
]

const newsData = [
  {
    title: "Bitcoin ETF Approval Drives Market Rally",
    summary: "Major institutional adoption continues as new ETF products launch",
    time: "2 hours ago",
    impact: "bullish",
  },
  {
    title: "Ethereum 2.0 Staking Rewards Increase",
    summary: "Network upgrade improves staking yields to 5.2% annually",
    time: "4 hours ago",
    impact: "bullish",
  },
  {
    title: "Regulatory Clarity Boosts Altcoin Markets",
    summary: "New guidelines provide framework for digital asset compliance",
    time: "6 hours ago",
    impact: "neutral",
  },
]

export function SnapDaxDashboard() {
  const [selectedTab, setSelectedTab] = useState("markets")

  const totalPortfolioValue = 80904.53
  const availableBalance = 25420.5
  const dailyPnL = 2847.32
  const dailyPnLPercent = 3.8

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              SNAP-DAX
            </h1>
            <p className="text-slate-300 text-lg">Digital Asset Exchange Platform</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              Live Market
            </Badge>
            <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30">
              <Shield className="w-4 h-4 mr-1" />
              Secure Trading
            </Badge>
          </div>
        </div>

        {/* What is SNAP-DAX */}
        <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-400" />
              What is SNAP-DAX?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-4">
              SNAP-DAX is an advanced cryptocurrency trading platform that provides institutional-grade tools for
              digital asset management. Our platform combines real-time market data, sophisticated trading algorithms,
              and comprehensive portfolio analytics to maximize your crypto investments.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">How It Works</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• Connect your wallet or create new account</li>
                  <li>• Fund with fiat or crypto deposits</li>
                  <li>• Access 50+ cryptocurrencies</li>
                  <li>• Execute trades with advanced tools</li>
                  <li>• Earn through staking and DeFi</li>
                </ul>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Key Features</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• Real-time market data</li>
                  <li>• Advanced charting tools</li>
                  <li>• Automated trading bots</li>
                  <li>• Staking rewards up to 12%</li>
                  <li>• DeFi protocol integration</li>
                </ul>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Security</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• Multi-signature wallets</li>
                  <li>• Cold storage protection</li>
                  <li>• 2FA authentication</li>
                  <li>• Insurance coverage</li>
                  <li>• Regulatory compliance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-300 text-sm font-medium">Total Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">${totalPortfolioValue.toLocaleString()}</div>
              <div className="flex items-center text-green-400 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />+{dailyPnLPercent}% today
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-emerald-300 text-sm font-medium">Available Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">${availableBalance.toLocaleString()}</div>
              <div className="text-emerald-400 text-sm">Ready to trade</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-300 text-sm font-medium">Daily P&L</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">+${dailyPnL.toLocaleString()}</div>
              <div className="flex items-center text-green-400 text-sm">
                <ArrowUpRight className="w-4 h-4 mr-1" />+{dailyPnLPercent}%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-300 text-sm font-medium">Active Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">4</div>
              <div className="text-purple-400 text-sm">Digital assets</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
            <TrendingUp className="w-4 h-4 mr-2" />
            Buy Crypto
          </Button>
          <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white">
            <TrendingDown className="w-4 h-4 mr-2" />
            Sell Crypto
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
            <Wallet className="w-4 h-4 mr-2" />
            Portfolio
          </Button>
          <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="bg-slate-800/50 border-slate-700">
          <TabsTrigger value="markets" className="data-[state=active]:bg-blue-600">
            <Globe className="w-4 h-4 mr-2" />
            Markets
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="data-[state=active]:bg-purple-600">
            <Wallet className="w-4 h-4 mr-2" />
            Portfolio
          </TabsTrigger>
          <TabsTrigger value="tools" className="data-[state=active]:bg-emerald-600">
            <Calculator className="w-4 h-4 mr-2" />
            Tools
          </TabsTrigger>
          <TabsTrigger value="news" className="data-[state=active]:bg-orange-600">
            <Bell className="w-4 h-4 mr-2" />
            News
          </TabsTrigger>
        </TabsList>

        <TabsContent value="markets" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Live Market Data</span>
                <Button size="sm" variant="outline" className="border-slate-600 bg-transparent">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </CardTitle>
              <CardDescription>Real-time cryptocurrency prices and market data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketData.map((crypto) => (
                  <div
                    key={crypto.symbol}
                    className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900/70 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Coins className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{crypto.name}</div>
                        <div className="text-slate-400 text-sm">{crypto.symbol}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-white">${crypto.price.toLocaleString()}</div>
                      <div
                        className={`text-sm flex items-center ${crypto.change >= 0 ? "text-green-400" : "text-red-400"}`}
                      >
                        {crypto.change >= 0 ? (
                          <ArrowUpRight className="w-3 h-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 mr-1" />
                        )}
                        {Math.abs(crypto.change)}%
                      </div>
                    </div>
                    <div className="text-right text-slate-400 text-sm">
                      <div>Vol: {crypto.volume}</div>
                      <div>Cap: {crypto.marketCap}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Portfolio Allocation</CardTitle>
              <CardDescription>Your current digital asset holdings and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {portfolioData.map((asset) => (
                  <div key={asset.symbol} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <Coins className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{asset.asset}</div>
                          <div className="text-slate-400 text-sm">
                            {asset.amount} {asset.symbol}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-white">${asset.value.toLocaleString()}</div>
                        <div className="text-slate-400 text-sm">{asset.allocation}%</div>
                      </div>
                    </div>
                    <Progress value={asset.allocation} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calculator className="w-5 h-5 mr-2 text-blue-400" />
                  Profit Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">Calculate potential profits and losses for your trades</p>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">Open Calculator</Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <RefreshCw className="w-5 h-5 mr-2 text-green-400" />
                  Currency Converter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">Convert between different cryptocurrencies and fiat</p>
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">Open Converter</Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                  Market Research
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">Access detailed market analysis and research reports</p>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">View Research</Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-orange-400" />
                  Price Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">Set custom price alerts for your favorite cryptocurrencies</p>
                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600">Manage Alerts</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="news" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Market News & Updates</CardTitle>
              <CardDescription>Latest cryptocurrency and blockchain news</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {newsData.map((news, index) => (
                  <div key={index} className="p-4 bg-slate-900/50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-white">{news.title}</h3>
                      <Badge
                        className={`${
                          news.impact === "bullish"
                            ? "bg-green-600/20 text-green-400"
                            : news.impact === "bearish"
                              ? "bg-red-600/20 text-red-400"
                              : "bg-blue-600/20 text-blue-400"
                        }`}
                      >
                        {news.impact}
                      </Badge>
                    </div>
                    <p className="text-slate-300 text-sm mb-2">{news.summary}</p>
                    <div className="text-slate-500 text-xs">{news.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SnapDaxDashboard
