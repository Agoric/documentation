"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Clock,
  Activity,
  Target,
  Shield,
  AlertTriangle,
  DollarSign,
  Percent,
  LineChart,
  PieChart,
  Settings,
  Bell,
  Eye,
  Zap,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// Types for trading data
interface Asset {
  id: string
  name: string
  symbol: string
  price: number
  change: number
  volume: number
  marketCap: number
  high24h: number
  low24h: number
}

interface OrderBookEntry {
  price: number
  amount: number
  total: number
}

interface Trade {
  id: string
  symbol: string
  type: "buy" | "sell"
  amount: number
  price: number
  timestamp: Date
  status: "completed" | "pending" | "cancelled"
  pnl?: number
}

interface PortfolioMetrics {
  totalValue: number
  totalPnL: number
  totalPnLPercent: number
  dayChange: number
  dayChangePercent: number
  winRate: number
  sharpeRatio: number
  maxDrawdown: number
}

// Enhanced Trading Interface Component
const TradingInterface = () => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [orderType, setOrderType] = useState<"market" | "limit" | "stop">("market")
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")
  const [stopPrice, setStopPrice] = useState("")

  const assets: Asset[] = [
    {
      id: "1",
      name: "Bitcoin",
      symbol: "BTC",
      price: 43567.89,
      change: 2.34,
      volume: 28500000000,
      marketCap: 850000000000,
      high24h: 44200.0,
      low24h: 42800.0,
    },
    {
      id: "2",
      name: "Ethereum",
      symbol: "ETH",
      price: 2345.67,
      change: -1.23,
      volume: 15200000000,
      marketCap: 280000000000,
      high24h: 2400.0,
      low24h: 2300.0,
    },
  ]

  const handleTrade = () => {
    if (!selectedAsset || !amount) return

    const trade: Trade = {
      id: Date.now().toString(),
      symbol: selectedAsset.symbol,
      type: tradeType,
      amount: Number.parseFloat(amount),
      price: orderType === "market" ? selectedAsset.price : Number.parseFloat(price),
      timestamp: new Date(),
      status: "pending",
    }

    console.log("Executing trade:", trade)
    // Here you would integrate with your trading API
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Advanced Trading
        </CardTitle>
        <CardDescription>Execute trades with advanced order types</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Asset Selection */}
        <div className="space-y-2">
          <Label>Select Asset</Label>
          <Select onValueChange={(value) => setSelectedAsset(assets.find((a) => a.id === value) || null)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose an asset to trade" />
            </SelectTrigger>
            <SelectContent>
              {assets.map((asset) => (
                <SelectItem key={asset.id} value={asset.id}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{asset.symbol}</span>
                    <span className="text-muted-foreground">${asset.price.toLocaleString()}</span>
                    <Badge variant={asset.change >= 0 ? "default" : "destructive"} className="text-xs">
                      {asset.change >= 0 ? "+" : ""}
                      {asset.change}%
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedAsset && (
          <>
            {/* Asset Info */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Price</div>
                  <div className="font-medium">${selectedAsset.price.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">24h High</div>
                  <div className="font-medium">${selectedAsset.high24h.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">24h Low</div>
                  <div className="font-medium">${selectedAsset.low24h.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Volume</div>
                  <div className="font-medium">${(selectedAsset.volume / 1000000000).toFixed(2)}B</div>
                </div>
              </div>
            </div>

            {/* Trade Type Selection */}
            <div className="flex gap-2">
              <Button
                variant={tradeType === "buy" ? "default" : "outline"}
                onClick={() => setTradeType("buy")}
                className="flex-1"
              >
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Buy
              </Button>
              <Button
                variant={tradeType === "sell" ? "destructive" : "outline"}
                onClick={() => setTradeType("sell")}
                className="flex-1"
              >
                <ArrowDownRight className="h-4 w-4 mr-2" />
                Sell
              </Button>
            </div>

            {/* Order Type */}
            <div className="space-y-2">
              <Label>Order Type</Label>
              <Select value={orderType} onValueChange={(value: "market" | "limit" | "stop") => setOrderType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market">Market Order</SelectItem>
                  <SelectItem value="limit">Limit Order</SelectItem>
                  <SelectItem value="stop">Stop Order</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <Label>Amount ({selectedAsset.symbol})</Label>
              <Input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>

            {/* Price Input (for limit/stop orders) */}
            {orderType !== "market" && (
              <div className="space-y-2">
                <Label>Price (USD)</Label>
                <Input
                  type="number"
                  placeholder={selectedAsset.price.toString()}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            )}

            {/* Stop Price (for stop orders) */}
            {orderType === "stop" && (
              <div className="space-y-2">
                <Label>Stop Price (USD)</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={stopPrice}
                  onChange={(e) => setStopPrice(e.target.value)}
                />
              </div>
            )}

            {/* Order Summary */}
            {amount && (
              <div className="p-4 bg-muted/30 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Estimated Total:</span>
                  <span className="font-medium">
                    $
                    {(
                      Number.parseFloat(amount) *
                      (orderType === "market" ? selectedAsset.price : Number.parseFloat(price) || selectedAsset.price)
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Trading Fee (0.1%):</span>
                  <span>
                    $
                    {(
                      Number.parseFloat(amount) *
                      (orderType === "market" ? selectedAsset.price : Number.parseFloat(price) || selectedAsset.price) *
                      0.001
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {/* Execute Trade Button */}
            <Button
              onClick={handleTrade}
              className={`w-full ${tradeType === "buy" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
              disabled={!amount}
            >
              {tradeType === "buy" ? "Execute Buy Order" : "Execute Sell Order"}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

// Order Book Component
const OrderBook = () => {
  const [bids, setBids] = useState<OrderBookEntry[]>([])
  const [asks, setAsks] = useState<OrderBookEntry[]>([])

  useEffect(() => {
    // Simulate order book data
    const generateOrderBook = () => {
      const basePrice = 43567.89
      const newBids: OrderBookEntry[] = []
      const newAsks: OrderBookEntry[] = []

      for (let i = 0; i < 10; i++) {
        const bidPrice = basePrice - (i + 1) * 10
        const askPrice = basePrice + (i + 1) * 10
        const bidAmount = Math.random() * 5
        const askAmount = Math.random() * 5

        newBids.push({
          price: bidPrice,
          amount: bidAmount,
          total: bidPrice * bidAmount,
        })

        newAsks.push({
          price: askPrice,
          amount: askAmount,
          total: askPrice * askAmount,
        })
      }

      setBids(newBids)
      setAsks(newAsks.reverse())
    }

    generateOrderBook()
    const interval = setInterval(generateOrderBook, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Order Book
        </CardTitle>
        <CardDescription>Real-time buy and sell orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Asks (Sell Orders) */}
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Price (USD)</span>
              <span>Amount</span>
              <span>Total</span>
            </div>
            <div className="space-y-1">
              {asks.map((ask, index) => (
                <div key={index} className="flex justify-between text-sm text-red-500">
                  <span>${ask.price.toLocaleString()}</span>
                  <span>{ask.amount.toFixed(4)}</span>
                  <span>${ask.total.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Current Price */}
          <div className="text-center py-2">
            <div className="text-2xl font-bold">$43,567.89</div>
            <div className="text-sm text-green-500">+2.34% (+$987.23)</div>
          </div>

          <Separator />

          {/* Bids (Buy Orders) */}
          <div>
            <div className="space-y-1">
              {bids.map((bid, index) => (
                <div key={index} className="flex justify-between text-sm text-green-500">
                  <span>${bid.price.toLocaleString()}</span>
                  <span>{bid.amount.toFixed(4)}</span>
                  <span>${bid.total.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Portfolio Analytics Component
const PortfolioAnalytics = () => {
  const [metrics, setMetrics] = useState<PortfolioMetrics>({
    totalValue: 128435.23,
    totalPnL: 15234.67,
    totalPnLPercent: 13.45,
    dayChange: 2945.32,
    dayChangePercent: 2.34,
    winRate: 68.5,
    sharpeRatio: 1.85,
    maxDrawdown: -8.2,
  })

  const [holdings, setHoldings] = useState([
    { symbol: "BTC", amount: 2.5, value: 108919.73, allocation: 85.0, pnl: 12500.0 },
    { symbol: "ETH", amount: 8.3, value: 19469.56, allocation: 15.0, pnl: 2734.67 },
  ])

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Total P&L</span>
            </div>
            <div className="text-2xl font-bold text-green-500">+${metrics.totalPnL.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">+{metrics.totalPnLPercent}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Win Rate</span>
            </div>
            <div className="text-2xl font-bold">{metrics.winRate}%</div>
            <Progress value={metrics.winRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <LineChart className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Sharpe Ratio</span>
            </div>
            <div className="text-2xl font-bold">{metrics.sharpeRatio}</div>
            <div className="text-sm text-muted-foreground">Risk-adjusted return</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">Max Drawdown</span>
            </div>
            <div className="text-2xl font-bold text-red-500">{metrics.maxDrawdown}%</div>
            <div className="text-sm text-muted-foreground">Largest loss</div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Allocation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Portfolio Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {holdings.map((holding, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-sm font-medium">
                      {holding.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{holding.symbol}</div>
                      <div className="text-sm text-muted-foreground">{holding.amount} tokens</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${holding.value.toLocaleString()}</div>
                    <div className={`text-sm ${holding.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {holding.pnl >= 0 ? "+" : ""}${holding.pnl.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={holding.allocation} className="flex-1" />
                  <span className="text-sm font-medium w-12">{holding.allocation}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Risk Management Component
const RiskManagement = () => {
  const [riskMetrics, setRiskMetrics] = useState({
    portfolioRisk: "Medium",
    valueAtRisk: 5234.67,
    positionSizing: 85,
    diversificationScore: 72,
    leverageRatio: 1.2,
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Portfolio Risk</span>
            </div>
            <div className="text-2xl font-bold">{riskMetrics.portfolioRisk}</div>
            <Badge variant="secondary" className="mt-2">
              Acceptable
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Value at Risk (1d)</span>
            </div>
            <div className="text-2xl font-bold text-orange-500">${riskMetrics.valueAtRisk.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">95% confidence</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Percent className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Diversification</span>
            </div>
            <div className="text-2xl font-bold">{riskMetrics.diversificationScore}%</div>
            <Progress value={riskMetrics.diversificationScore} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Risk Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Risk Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <div className="font-medium text-yellow-800">High Concentration Risk</div>
                <div className="text-sm text-yellow-700">
                  85% of your portfolio is allocated to BTC. Consider diversifying.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Eye className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-blue-800">Market Volatility Alert</div>
                <div className="text-sm text-blue-700">
                  Increased volatility detected. Consider reducing position sizes.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Trading History Component
const TradingHistory = () => {
  const [trades, setTrades] = useState<Trade[]>([
    {
      id: "1",
      symbol: "BTC",
      type: "buy",
      amount: 0.5,
      price: 42000,
      timestamp: new Date(Date.now() - 86400000),
      status: "completed",
      pnl: 783.95,
    },
    {
      id: "2",
      symbol: "ETH",
      type: "sell",
      amount: 2.0,
      price: 2400,
      timestamp: new Date(Date.now() - 172800000),
      status: "completed",
      pnl: -156.23,
    },
    {
      id: "3",
      symbol: "BTC",
      type: "buy",
      amount: 1.0,
      price: 43500,
      timestamp: new Date(Date.now() - 3600000),
      status: "pending",
    },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Trading History
        </CardTitle>
        <CardDescription>Your recent trading activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trades.map((trade) => (
            <div key={trade.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    trade.type === "buy" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  }`}
                >
                  {trade.type === "buy" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                </div>
                <div>
                  <div className="font-medium">
                    {trade.type.toUpperCase()} {trade.amount} {trade.symbol}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ${trade.price.toLocaleString()} • {trade.timestamp.toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge
                  variant={
                    trade.status === "completed" ? "default" : trade.status === "pending" ? "secondary" : "destructive"
                  }
                >
                  {trade.status}
                </Badge>
                {trade.pnl !== undefined && (
                  <div className={`text-sm mt-1 ${trade.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Main Enhanced DAX Dashboard
export default function DaxDashboardClient() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-80 col-span-2" />
          <Skeleton className="h-80" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Enhanced DAX Dashboard</h1>
          <p className="text-muted-foreground">Advanced trading tools and portfolio analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <Activity className="mr-2 h-4 w-4" />
            Live Trading
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trading">Trading</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PortfolioAnalytics />
            </div>
            <div>
              <OrderBook />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trading" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TradingInterface />
            <OrderBook />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <PortfolioAnalytics />
        </TabsContent>

        <TabsContent value="risk" className="mt-6">
          <RiskManagement />
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <TradingHistory />
        </TabsContent>

        <TabsContent value="market" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-muted/30 rounded-md">
                  <span className="text-muted-foreground">Market data visualization</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Market Sentiment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Fear & Greed Index</span>
                    <Badge variant="default">Greed (75)</Badge>
                  </div>
                  <Progress value={75} />
                  <div className="text-sm text-muted-foreground">
                    Market sentiment is currently showing greed, indicating potential overvaluation.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
