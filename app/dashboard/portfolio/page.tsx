"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PieChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Briefcase,
  Plus,
  Settings,
  Download,
} from "lucide-react"

export default function PortfolioPage() {
  const portfolioValue = 2847392
  const dailyChange = 12450
  const dailyChangePercent = 0.44

  const holdings = [
    {
      symbol: "TECH-ETF",
      name: "Technology Sector ETF",
      shares: 500,
      value: 847392,
      change: 5.2,
      allocation: 29.8,
      color: "bg-blue-500",
    },
    {
      symbol: "REAL-REIT",
      name: "Real Estate Investment Trust",
      shares: 200,
      value: 624850,
      change: -2.1,
      allocation: 21.9,
      color: "bg-green-500",
    },
    {
      symbol: "CRYPTO-BTC",
      name: "Bitcoin Exposure Fund",
      shares: 150,
      value: 456789,
      change: 8.7,
      allocation: 16.0,
      color: "bg-orange-500",
    },
    {
      symbol: "BOND-SAFE",
      name: "Government Bond Fund",
      shares: 800,
      value: 398234,
      change: 1.2,
      allocation: 14.0,
      color: "bg-purple-500",
    },
    {
      symbol: "INTL-DIV",
      name: "International Dividend Fund",
      shares: 300,
      value: 287456,
      change: 3.4,
      allocation: 10.1,
      color: "bg-pink-500",
    },
    {
      symbol: "EMRG-MKT",
      name: "Emerging Markets Fund",
      shares: 250,
      value: 232671,
      change: -1.8,
      allocation: 8.2,
      color: "bg-cyan-500",
    },
  ]

  const recentTransactions = [
    {
      type: "buy",
      symbol: "TECH-ETF",
      shares: 50,
      price: 284.5,
      total: 14225,
      date: "2024-01-15",
      time: "09:30 AM",
    },
    {
      type: "sell",
      symbol: "BOND-SAFE",
      shares: 100,
      price: 98.75,
      total: 9875,
      date: "2024-01-14",
      time: "02:15 PM",
    },
    {
      type: "dividend",
      symbol: "INTL-DIV",
      shares: 300,
      price: 2.45,
      total: 735,
      date: "2024-01-12",
      time: "Market Close",
    },
  ]

  const performanceMetrics = [
    { label: "Total Return", value: "24.7%", period: "YTD", color: "text-green-500" },
    { label: "Annualized Return", value: "18.3%", period: "3Y", color: "text-blue-500" },
    { label: "Sharpe Ratio", value: "1.42", period: "Current", color: "text-purple-500" },
    { label: "Max Drawdown", value: "-8.2%", period: "1Y", color: "text-red-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Portfolio Management
            </h1>
            <p className="text-xl text-muted-foreground mt-2">Track and optimize your investment portfolio</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Position
            </Button>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
                  <p className="text-3xl font-bold">${portfolioValue.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {dailyChange > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={dailyChange > 0 ? "text-green-500" : "text-red-500"}>
                      ${Math.abs(dailyChange).toLocaleString()} ({dailyChangePercent > 0 ? "+" : ""}
                      {dailyChangePercent}%)
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/20 to-transparent">
                  <Briefcase className="h-8 w-8 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's P&L</p>
                  <p className="text-3xl font-bold text-green-500">+$12,450</p>
                  <p className="text-sm text-muted-foreground">+0.44% today</p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-transparent">
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cash Available</p>
                  <p className="text-3xl font-bold">$124,850</p>
                  <p className="text-sm text-muted-foreground">4.4% of portfolio</p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-transparent">
                  <DollarSign className="h-8 w-8 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {performanceMetrics.map((metric, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20"
            >
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.period}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="holdings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="holdings" className="space-y-6">
            <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Current Holdings</CardTitle>
                <CardDescription>Your investment positions and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {holdings.map((holding, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${holding.color}`} />
                        <div>
                          <h4 className="font-medium">{holding.symbol}</h4>
                          <p className="text-sm text-muted-foreground">{holding.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${holding.value.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{holding.shares} shares</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${holding.change > 0 ? "text-green-500" : "text-red-500"}`}>
                          {holding.change > 0 ? "+" : ""}
                          {holding.change}%
                        </p>
                        <p className="text-sm text-muted-foreground">{holding.allocation}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allocation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Asset Allocation</CardTitle>
                  <CardDescription>Portfolio distribution by asset class</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                      <p className="text-muted-foreground">Allocation Chart Placeholder</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Target vs Actual</CardTitle>
                  <CardDescription>Compare your allocation to targets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { category: "Stocks", target: 60, actual: 65.8, color: "bg-blue-500" },
                    { category: "Bonds", target: 25, actual: 22.2, color: "bg-green-500" },
                    { category: "Real Estate", target: 10, actual: 8.2, color: "bg-purple-500" },
                    { category: "Cash", target: 5, actual: 3.8, color: "bg-orange-500" },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.category}</span>
                        <span>
                          {item.actual}% / {item.target}%
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Progress value={item.actual} className="flex-1" />
                        <Progress value={item.target} className="flex-1 opacity-50" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Performance Chart</CardTitle>
                <CardDescription>Portfolio value over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 text-green-400" />
                    <p className="text-muted-foreground">Performance Chart Placeholder</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest portfolio activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={
                            transaction.type === "buy"
                              ? "default"
                              : transaction.type === "sell"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {transaction.type.toUpperCase()}
                        </Badge>
                        <div>
                          <h4 className="font-medium">{transaction.symbol}</h4>
                          <p className="text-sm text-muted-foreground">
                            {transaction.shares} shares @ ${transaction.price}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${transaction.total.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.date} {transaction.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
