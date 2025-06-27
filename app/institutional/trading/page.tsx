"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowUpDown, TrendingUp, TrendingDown, Activity, Shield, RefreshCw, Building2 } from "lucide-react"

interface TradingPosition {
  id: string
  bondType: "FHA" | "VA" | "USDA" | "SBA"
  action: "BUY" | "SELL"
  quantity: number
  price: number
  totalValue: number
  status: "PENDING" | "EXECUTED" | "CANCELLED" | "PARTIAL"
  timestamp: Date
  expectedROI: number
  governmentGuarantee: number
}

interface MarketData {
  bondType: "FHA" | "VA" | "USDA" | "SBA"
  currentPrice: number
  change24h: number
  volume24h: number
  bid: number
  ask: number
  spread: number
  yield: number
  governmentGuarantee: number
}

export default function InstitutionalTradingPage() {
  const [selectedBond, setSelectedBond] = React.useState<"FHA" | "VA" | "USDA" | "SBA">("FHA")
  const [orderType, setOrderType] = React.useState<"MARKET" | "LIMIT">("MARKET")
  const [orderAction, setOrderAction] = React.useState<"BUY" | "SELL">("BUY")
  const [orderQuantity, setOrderQuantity] = React.useState("")
  const [orderPrice, setOrderPrice] = React.useState("")
  const [isTrading, setIsTrading] = React.useState(false)
  const [isOrderDialogOpen, setIsOrderDialogOpen] = React.useState(false)

  const marketData: MarketData[] = [
    {
      bondType: "FHA",
      currentPrice: 102.45,
      change24h: 0.23,
      volume24h: 125000000,
      bid: 102.42,
      ask: 102.48,
      spread: 0.06,
      yield: 20.3,
      governmentGuarantee: 100,
    },
    {
      bondType: "VA",
      currentPrice: 103.12,
      change24h: 0.18,
      volume24h: 98000000,
      bid: 103.09,
      ask: 103.15,
      spread: 0.06,
      yield: 20.1,
      governmentGuarantee: 100,
    },
    {
      bondType: "USDA",
      currentPrice: 101.87,
      change24h: -0.12,
      volume24h: 67000000,
      bid: 101.84,
      ask: 101.90,
      spread: 0.06,
      yield: 19.8,
      governmentGuarantee: 90,
    },
    {
      bondType: "SBA",
      currentPrice: 104.23,
      change24h: 0.45,
      volume24h: 45000000,
      bid: 104.19,
      ask: 104.27,
      spread: 0.08,
      yield: 20.5,
      governmentGuarantee: 85,
    },
  ]

  const recentTrades: TradingPosition[] = [
    {
      id: "TXN-001",
      bondType: "FHA",
      action: "BUY",
      quantity: 1000000,
      price: 102.45,
      totalValue: 102450000,
      status: "EXECUTED",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      expectedROI: 20.3,
      governmentGuarantee: 100,
    },
    {
      id: "TXN-002",
      bondType: "VA",
      action: "BUY",
      quantity: 750000,
      price: 103.12,
      totalValue: 77340000,
      status: "EXECUTED",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      expectedROI: 20.1,
      governmentGuarantee: 100,
    },
    {
      id: "TXN-003",
      bondType: "SBA",
      action: "SELL",
      quantity: 500000,
      price: 104.23,
      totalValue: 52115000,
      status: "PENDING",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      expectedROI: 20.5,
      governmentGuarantee: 85,
    },
  ]

  const portfolioPositions = [
    {
      bondType: "FHA",
      holdings: 3500000,
      marketValue: 358575000,
      unrealizedPnL: 8575000,
      allocation: 35,
      avgPrice: 102.31,
      currentYield: 20.3,
    },
    {
      bondType: "VA",
      holdings: 3000000,
      marketValue: 309360000,
      unrealizedPnL: 9360000,
      allocation: 30,
      avgPrice: 103.00,
      currentYield: 20.1,
    },
    {
      bondType: "USDA",
      holdings: 2000000,
      marketValue: 203740000,
      unrealizedPnL: 3740000,
      allocation: 20,
      avgPrice: 101.75,
      currentYield: 19.8,
    },
    {
      bondType: "SBA",
      holdings: 1500000,
      marketValue: 156345000,
      unrealizedPnL: 6345000,
      allocation: 15,
      avgPrice: 104.00,
      currentYield: 20.5,
    },
  ]

  const handlePlaceOrder = async () => {
    if (!orderQuantity || !selectedBond) return

    setIsTrading(true)
    try {
      // Simulate order placement
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Order placed:", {
        bondType: selectedBond,
        action: orderAction,
        type: orderType,
        quantity: orderQuantity,
        price: orderPrice,
      })
      setIsOrderDialogOpen(false)
      setOrderQuantity("")
      setOrderPrice("")
    } finally {
      setIsTrading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(2)}B`
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    }
    return `$${amount.toLocaleString()}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "EXECUTED":
        return "bg-green-500 text-white"
      case "PENDING":
        return "bg-yellow-500 text-black"
      case "CANCELLED":
        return "bg-red-500 text-white"
      case "PARTIAL":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-blue-800 bg-clip-text text-transparent">
              Institutional Trading Desk
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              High-Volume Government Bond Trading • $100M+ Institutional Orders • 20% Target ROI
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-500 text-white">
              <Activity className="h-4 w-4 mr-2" />
              Live Trading
            </Badge>
            <Badge className="bg-blue-500 text-white">
              <Shield className="h-4 w-4 mr-2" />
              Government Guaranteed
            </Badge>
            <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-600 to-blue-600">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Place Order
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Place Institutional Order</DialogTitle>
                  <DialogDescription>Execute high-volume government bond trades</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Bond Type</Label>
                      <Select value={selectedBond} onValueChange={(value: any) => setSelectedBond(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="FHA">FHA (100% Guarantee)</SelectItem>
                          <SelectItem value="VA">VA (100% Guarantee)</SelectItem>
                          <SelectItem value="USDA">USDA (90% Guarantee)</SelectItem>
                          <SelectItem value="SBA">SBA (85% Guarantee)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Action</Label>
                      <Select value={orderAction} onValueChange={(value: any) => setOrderAction(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BUY">BUY</SelectItem>
                          <SelectItem value="SELL">SELL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Order Type</Label>
                    <Select value={orderType} onValueChange={(value: any) => setOrderType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MARKET">Market Order</SelectItem>
                        <SelectItem value="LIMIT">Limit Order</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Quantity (Minimum $100M)</Label>
                    <Input
                      type="number"
                      placeholder="1000000"
                      value={orderQuantity}
                      onChange={(e) => setOrderQuantity(e.target.value)}
                    />
                  </div>
                  {orderType === "LIMIT" && (
                    <div>
                      <Label>Limit Price</Label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="102.45"
                        value={orderPrice}
                        onChange={(e) => setOrderPrice(e.target.value)}
                      />
                    </div>
                  )}
                  <div className="p-3 bg-blue-50 rounded border border-blue-200">
                    <p className="text-sm text-blue-700">
                      <strong>Estimated Value:</strong>{" "}
                      {orderQuantity
                        ? formatCurrency(
                            Number.parseFloat(orderQuantity) *
                              (marketData.find((m) => m.bondType === selectedBond)?.currentPrice || 0),
                          )
                        : "$0"}
                    </p>
                    <p className="text-sm text-blue-700">
                      <strong>Expected ROI:</strong>{" "}
                      {marketData.find((m) => m.bondType === selectedBond)?.yield || 0}%
                    </p>
                  </div>
                  <Button onClick={handlePlaceOrder} disabled={isTrading || !orderQuantity} className="w-full">
                    {isTrading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Executing Order...
                      </>
                    ) : (
                      <>
                        <ArrowUpDown className="h-4 w-4 mr-2" />
                        Place {orderAction} Order
                      </>
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Market Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketData.map((bond) => (
            <Card key={bond.bondType} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>{bond.bondType} Bonds</span>
                  <Badge variant="outline">{bond.governmentGuarantee}% Guarantee</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">${bond.currentPrice}</span>
                    <div className={`flex items-center gap-1 ${getChangeColor(bond.change24h)}`}>
                      {bond.change24h >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span className="text-sm font-medium">
                        {bond.change24h >= 0 ? "+" : ""}
                        {bond.change24h}%
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Bid:</span>
                      <span className="ml-1 font-medium">${bond.bid}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Ask:</span>
                      <span className="ml-1 font-medium">${bond.ask}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Volume:</span>
                      <span className="ml-1 font-medium">{formatCurrency(bond.volume24h)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Yield:</span>
                      <span className="ml-1 font-medium text-green-600">{bond.yield}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trading Interface */}
        <Tabs defaultValue="positions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="positions">Portfolio Positions</TabsTrigger>
            <TabsTrigger value="orders">Order Management</TabsTrigger>
            <TabsTrigger value="execution">Execution Quality</TabsTrigger>
            <TabsTrigger value="analytics">Trading Analytics</TabsTrigger>
          </TabsList>

          {/* Portfolio Positions Tab */}
          <TabsContent value="positions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Current Portfolio Positions
                </CardTitle>
                <CardDescription>
                  Institutional holdings across government guaranteed bond types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioPositions.map((position, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{position.bondType} Government Bonds</h3>
                          <Badge variant="outline">{position.allocation}% Allocation</Badge>
                          <Badge className="bg-green-500 text-white">{position.currentYield}% Yield</Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">{formatCurrency(position.marketValue)}</p>
                          <p
                            className={`text-sm ${
                              position.unrealizedPnL >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {position.unrealizedPnL >= 0 ? "+" : ""}
                            {formatCurrency(position.unrealizedPnL)} P&L
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Holdings:</span>
                          <p className="font-medium">{position.holdings.toLocaleString()} units</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Avg Price:</span>
                          <p className="font-medium">${position.avgPrice}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Current Yield:</span>
                          <p className="font-medium text-green-600">{position.currentYield}%</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Allocation:</span>
                          <p className="font-medium">{position.allocation}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Order Management Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5" />
                  Recent Trading Activity
                </CardTitle>
                <CardDescription>Institutional order history and execution status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTrades.map((trade) => (
                    <div key={trade.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(trade.status)}>{trade.status}</Badge>
                          <span className="font-medium">
                            {trade.action} {trade.bondType}
                          </span>
                          <Badge variant="outline">{trade.governmentGuarantee}% Guarantee</Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{formatCurrency(trade.totalValue)}</p>
                          <p className="text-sm text-muted-foreground">
                            {trade.quantity.toLocaleString()} @ ${trade.price}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Expected ROI:</span>
                          <span className="ml-2 font-medium text-green-600">{trade.expectedROI}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Timestamp:</span>
                          <span className="ml-2 font-medium">
                            {trade.timestamp.toLocaleTime
