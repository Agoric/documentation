"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Activity,
  DollarSign,
  PieChart,
  Settings,
  Zap,
  Wifi,
  WifiOff,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useCryptoAssets, useOrderBook, useMarketData } from "@/hooks/use-crypto-data"
import { LivePriceTicker } from "@/components/crypto/live-price-ticker"

// Enhanced Trading Interface with Real Data
const TradingInterface = () => {
  const [selectedAssetId, setSelectedAssetId] = useState<string>("")
  const [orderType, setOrderType] = useState<"market" | "limit" | "stop">("market")
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")
  const [stopPrice, setStopPrice] = useState("")

  const { assets, loading: assetsLoading } = useCryptoAssets(["bitcoin", "ethereum", "solana", "cardano", "polkadot"])
  const selectedAsset = assets.find((asset) => asset.id === selectedAssetId)

  const handleTrade = () => {
    if (!selectedAsset || !amount) return

    const trade = {
      id: Date.now().toString(),
      symbol: selectedAsset.symbol.toUpperCase(),
      type: tradeType,
      amount: Number.parseFloat(amount),
      price: orderType === "market" ? selectedAsset.current_price : Number.parseFloat(price),
      timestamp: new Date(),
      status: "pending" as const,
    }

    console.log("Executing trade:", trade)
    // Here you would integrate with your trading API
  }

  if (assetsLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-60" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Live Trading Interface
        </CardTitle>
        <CardDescription>Execute trades with real-time market data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Asset Selection */}
        <div className="space-y-2">
          <Label>Select Asset</Label>
          <Select onValueChange={setSelectedAssetId}>
            <SelectTrigger>
              <SelectValue placeholder="Choose an asset to trade" />
            </SelectTrigger>
            <SelectContent>
              {assets.map((asset) => (
                <SelectItem key={asset.id} value={asset.id}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{asset.symbol.toUpperCase()}</span>
                    <span className="text-muted-foreground">${asset.current_price.toLocaleString()}</span>
                    <Badge
                      variant={asset.price_change_percentage_24h >= 0 ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {asset.price_change_percentage_24h >= 0 ? "+" : ""}
                      {asset.price_change_percentage_24h.toFixed(2)}%
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedAsset && (
          <>
            {/* Real-time Asset Info */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Current Price</div>
                  <div className="font-medium">${selectedAsset.current_price.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">24h High</div>
                  <div className="font-medium">${selectedAsset.high_24h.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">24h Low</div>
                  <div className="font-medium">${selectedAsset.low_24h.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Volume</div>
                  <div className="font-medium">${(selectedAsset.total_volume / 1000000000).toFixed(2)}B</div>
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
              <Label>Amount ({selectedAsset.symbol.toUpperCase()})</Label>
              <Input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>

            {/* Price Input (for limit/stop orders) */}
            {orderType !== "market" && (
              <div className="space-y-2">
                <Label>Price (USD)</Label>
                <Input
                  type="number"
                  placeholder={selectedAsset.current_price.toString()}
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
                      (orderType === "market"
                        ? selectedAsset.current_price
                        : Number.parseFloat(price) || selectedAsset.current_price)
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Trading Fee (0.1%):</span>
                  <span>
                    $
                    {(
                      Number.parseFloat(amount) *
                      (orderType === "market"
                        ? selectedAsset.current_price
                        : Number.parseFloat(price) || selectedAsset.current_price) *
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

// Real-time Order Book Component
const LiveOrderBook = ({ symbol = "BTCUSDT" }: { symbol?: string }) => {
  const { orderBook, loading, error } = useOrderBook(symbol)

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WifiOff className="h-5 w-5 text-red-500" />
            Order Book - Offline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-red-500">Failed to load order book: {error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wifi className="h-5 w-5 text-green-500" />
          Live Order Book
        </CardTitle>
        <CardDescription>Real-time market depth for {symbol}</CardDescription>
      </CardHeader>
      <CardContent>
        {orderBook && (
          <div className="space-y-4">
            {/* Asks (Sell Orders) */}
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Price (USD)</span>
                <span>Amount</span>
                <span>Total</span>
              </div>
              <div className="space-y-1">
                {orderBook.asks.slice(0, 10).map(([price, amount], index) => (
                  <div key={index} className="flex justify-between text-sm text-red-500">
                    <span>${price.toLocaleString()}</span>
                    <span>{amount.toFixed(4)}</span>
                    <span>${(price * amount).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Current Price */}
            <div className="text-center py-2">
              <div className="text-2xl font-bold">
                ${orderBook.bids[0] ? ((orderBook.bids[0][0] + orderBook.asks[0][0]) / 2).toLocaleString() : "N/A"}
              </div>
              <div className="text-sm text-muted-foreground">
                Spread: $
                {orderBook.asks[0] && orderBook.bids[0]
                  ? (orderBook.asks[0][0] - orderBook.bids[0][0]).toFixed(2)
                  : "N/A"}
              </div>
            </div>

            <Separator />

            {/* Bids (Buy Orders) */}
            <div>
              <div className="space-y-1">
                {orderBook.bids.slice(0, 10).map(([price, amount], index) => (
                  <div key={index} className="flex justify-between text-sm text-green-500">
                    <span>${price.toLocaleString()}</span>
                    <span>{amount.toFixed(4)}</span>
                    <span>${(price * amount).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Market Overview with Real Data
const MarketOverview = () => {
  const { marketData, loading, error } = useMarketData()

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="h-10 w-10 rounded-full mx-auto mb-2" />
              <Skeleton className="h-4 w-20 mx-auto mb-1" />
              <Skeleton className="h-6 w-16 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-sm text-red-500">Error loading market data: {error}</div>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
            <DollarSign className="h-5 w-5" />
          </div>
          <div className="text-sm font-medium">Market Cap</div>
          <div className="text-xl font-bold">${(marketData.totalMarketCap / 1e12).toFixed(2)}T</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div className="text-sm font-medium">24h Volume</div>
          <div className="text-xl font-bold">${(marketData.totalVolume / 1e9).toFixed(1)}B</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-2">
            <PieChart className="h-5 w-5" />
          </div>
          <div className="text-sm font-medium">BTC Dominance</div>
          <div className="text-xl font-bold">{marketData.btcDominance.toFixed(1)}%</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2">
            <Activity className="h-5 w-5" />
          </div>
          <div className="text-sm font-medium">Active Coins</div>
          <div className="text-xl font-bold">{marketData.activeCoins.toLocaleString()}</div>
        </CardContent>
      </Card>
    </div>
  )
}

// Main Enhanced DAX Dashboard with Real Data
export default function DaxDashboardClient() {
  const [activeTab, setActiveTab] = useState("overview")
  const { assets, loading: assetsLoading } = useCryptoAssets(["bitcoin", "ethereum", "solana", "cardano", "polkadot"])

  const tradingSymbols = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "ADA/USDT", "DOT/USDT"]

  return (
    <div className="space-y-8">
      {/* Header with Live Price Ticker */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Live DAX Dashboard</h1>
            <p className="text-muted-foreground">Real-time cryptocurrency trading and analytics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              <Activity className="mr-2 h-4 w-4" />
              Live Trading
            </Button>
          </div>
        </div>

        {/* Live Price Ticker */}
        <div className="border rounded-lg p-4 bg-muted/30">
          <div className="flex items-center gap-2 mb-3">
            <Wifi className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Live Market Prices</span>
          </div>
          <LivePriceTicker symbols={tradingSymbols} />
        </div>
      </div>

      {/* Market Overview */}
      <MarketOverview />

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
              <Card>
                <CardHeader>
                  <CardTitle>Top Cryptocurrencies</CardTitle>
                  <CardDescription>Real-time market data from CoinGecko</CardDescription>
                </CardHeader>
                <CardContent>
                  {assetsLoading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Skeleton className="w-10 h-10 rounded-full" />
                            <div>
                              <Skeleton className="h-5 w-24 mb-1" />
                              <Skeleton className="h-4 w-16" />
                            </div>
                          </div>
                          <div className="text-right">
                            <Skeleton className="h-5 w-20 mb-1" />
                            <Skeleton className="h-4 w-12" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {assets.map((asset) => (
                        <div
                          key={asset.id}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                              {asset.symbol.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-medium">{asset.name}</div>
                              <div className="text-sm text-muted-foreground">{asset.symbol.toUpperCase()}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${asset.current_price.toLocaleString()}</div>
                            <div
                              className={`text-sm ${asset.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}
                            >
                              {asset.price_change_percentage_24h >= 0 ? "+" : ""}
                              {asset.price_change_percentage_24h.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            <div>
              <LiveOrderBook symbol="BTCUSDT" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trading" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TradingInterface />
            <LiveOrderBook symbol="BTCUSDT" />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
                  <span className="text-muted-foreground">Portfolio analytics with real data</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Market Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
                  <span className="text-muted-foreground">Market trend analysis</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Management</CardTitle>
              <CardDescription>Monitor and manage your trading risks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-muted/30 rounded-md">
                <span className="text-muted-foreground">Risk management tools</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Trading History</CardTitle>
              <CardDescription>Your trading activity and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-muted/30 rounded-md">
                <span className="text-muted-foreground">Trading history with real data</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-muted/30 rounded-md">
                  <span className="text-muted-foreground">Advanced market analysis</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>News & Sentiment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-muted/30 rounded-md">
                  <span className="text-muted-foreground">Market news and sentiment</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
