"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Calculator,
  Globe,
  RefreshCw,
  Search,
  TrendingDown,
  TrendingUp,
  Wallet,
  Bitcoin,
  Activity,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Shield,
  Zap,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data for digital assets
const digitalAssets = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 67420.5,
    change: 2.34,
    changePercent: 3.6,
    volume: "28.5B",
    marketCap: "1.32T",
    trend: "up",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 3842.75,
    change: -45.2,
    changePercent: -1.2,
    volume: "15.2B",
    marketCap: "462B",
    trend: "down",
  },
  {
    symbol: "ADA",
    name: "Cardano",
    price: 0.4521,
    change: 0.0234,
    changePercent: 5.5,
    volume: "892M",
    marketCap: "15.8B",
    trend: "up",
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: 198.45,
    change: 12.34,
    changePercent: 6.6,
    volume: "3.2B",
    marketCap: "94.2B",
    trend: "up",
  },
]

const portfolioAssets = [
  {
    symbol: "BTC",
    amount: 0.5432,
    value: 36642.18,
    allocation: 45.2,
  },
  {
    symbol: "ETH",
    amount: 8.234,
    value: 31642.95,
    allocation: 39.1,
  },
  {
    symbol: "ADA",
    amount: 15420.5,
    value: 6970.23,
    allocation: 8.6,
  },
  {
    symbol: "SOL",
    amount: 28.45,
    value: 5648.71,
    allocation: 7.1,
  },
]

export function SnapDaxDashboard() {
  const router = useRouter()
  const totalPortfolioValue = portfolioAssets.reduce((sum, asset) => sum + asset.value, 0)

  return (
    <div className="container py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SNAP-DAX
          </h1>
          <p className="text-xl text-muted-foreground">Digital Asset Exchange</p>
          <p className="text-sm text-muted-foreground mt-1">
            Advanced trading platform for digital assets and cryptocurrencies
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Activity className="w-3 h-3 mr-1" />
            Live Market
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Shield className="w-3 h-3 mr-1" />
            Secure Trading
          </Badge>
        </div>
      </div>

      {/* Portfolio Overview */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Portfolio Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-3xl font-bold">${totalPortfolioValue.toLocaleString()}</p>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                +12.5% (24h)
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-2xl font-semibold">$25,420.50</p>
              <p className="text-sm text-muted-foreground">Ready to trade</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">P&L Today</p>
              <p className="text-2xl font-semibold text-green-600">+$2,847.32</p>
              <p className="text-sm text-green-600">+3.8%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Positions</p>
              <p className="text-2xl font-semibold">4</p>
              <p className="text-sm text-muted-foreground">Assets held</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Trading Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          className="h-20 flex-col gap-2 bg-green-600 hover:bg-green-700"
          onClick={() => router.push("/snap-dax/trade/buy")}
        >
          <TrendingUp className="w-6 h-6" />
          <span className="font-semibold">Buy Assets</span>
        </Button>
        <Button
          className="h-20 flex-col gap-2 bg-red-600 hover:bg-red-700"
          onClick={() => router.push("/snap-dax/trade/sell")}
        >
          <TrendingDown className="w-6 h-6" />
          <span className="font-semibold">Sell Assets</span>
        </Button>
        <Button
          className="h-20 flex-col gap-2 bg-blue-600 hover:bg-blue-700"
          onClick={() => router.push("/snap-dax/portfolio")}
        >
          <PieChart className="w-6 h-6" />
          <span className="font-semibold">Portfolio</span>
        </Button>
        <Button
          className="h-20 flex-col gap-2 bg-purple-600 hover:bg-purple-700"
          onClick={() => router.push("/snap-dax/analytics")}
        >
          <BarChart className="w-6 h-6" />
          <span className="font-semibold">Analytics</span>
        </Button>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="markets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="markets">Live Markets</TabsTrigger>
          <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
          <TabsTrigger value="tools">Trading Tools</TabsTrigger>
          <TabsTrigger value="news">Market News</TabsTrigger>
        </TabsList>

        <TabsContent value="markets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Live Market Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {digitalAssets.map((asset) => (
                  <div
                    key={asset.symbol}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
                        <Bitcoin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">{asset.name}</p>
                        <p className="text-sm text-muted-foreground">{asset.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${asset.price.toLocaleString()}</p>
                      <p
                        className={`text-sm flex items-center gap-1 ${
                          asset.trend === "up" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {asset.trend === "up" ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        {asset.changePercent > 0 ? "+" : ""}
                        {asset.changePercent}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Volume</p>
                      <p className="font-medium">{asset.volume}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Market Cap</p>
                      <p className="font-medium">{asset.marketCap}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Trade
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Asset Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {portfolioAssets.map((asset) => (
                  <div key={asset.symbol} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{asset.symbol}</span>
                        </div>
                        <div>
                          <p className="font-medium">{asset.symbol}</p>
                          <p className="text-sm text-muted-foreground">
                            {asset.amount} {asset.symbol}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${asset.value.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{asset.allocation}%</p>
                      </div>
                    </div>
                    <Progress value={asset.allocation} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push("/snap-dax/tools/calculator")}
            >
              <CardContent className="p-6 text-center">
                <Calculator className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold mb-2">Profit Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate potential profits and losses</p>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push("/snap-dax/tools/converter")}
            >
              <CardContent className="p-6 text-center">
                <RefreshCw className="w-8 h-8 mx-auto mb-3 text-green-600" />
                <h3 className="font-semibold mb-2">Currency Converter</h3>
                <p className="text-sm text-muted-foreground">Convert between different assets</p>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push("/snap-dax/research")}
            >
              <CardContent className="p-6 text-center">
                <Search className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                <h3 className="font-semibold mb-2">Market Research</h3>
                <p className="text-sm text-muted-foreground">In-depth asset analysis</p>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push("/snap-dax/alerts")}
            >
              <CardContent className="p-6 text-center">
                <Zap className="w-8 h-8 mx-auto mb-3 text-yellow-600" />
                <h3 className="font-semibold mb-2">Price Alerts</h3>
                <p className="text-sm text-muted-foreground">Set custom price notifications</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="news" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Latest Market News
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Bitcoin Reaches New All-Time High Amid Institutional Adoption",
                    summary: "Major corporations continue to add Bitcoin to their treasury reserves...",
                    time: "2 hours ago",
                    category: "Bitcoin",
                  },
                  {
                    title: "Ethereum 2.0 Staking Rewards Hit Record Levels",
                    summary: "Validators are seeing unprecedented returns as network activity surges...",
                    time: "4 hours ago",
                    category: "Ethereum",
                  },
                  {
                    title: "Regulatory Clarity Boosts Altcoin Market Sentiment",
                    summary: "New guidelines provide clearer framework for digital asset trading...",
                    time: "6 hours ago",
                    category: "Regulation",
                  },
                ].map((news, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{news.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{news.summary}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {news.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{news.time}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
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
