"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Landmark,
  TrendingUp,
  TrendingDown,
  Users,
  PieChart,
  BarChart3,
  Shield,
  ArrowUpDown,
  Coins,
  BookOpen,
  Target,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"

export default function InstitutionalDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = React.useState("1M")

  const portfolioMetrics = {
    totalAUM: 2847500000, // $2.85B
    monthlyReturn: 18.7,
    ytdReturn: 142.3,
    sharpeRatio: 2.34,
    activePositions: 847,
    clientAccounts: 156,
  }

  const topHoldings = [
    { symbol: "AAPL", name: "Apple Inc.", allocation: 12.5, value: 356000000, change: 2.4 },
    { symbol: "MSFT", name: "Microsoft Corp.", allocation: 11.8, value: 336000000, change: 1.8 },
    { symbol: "GOOGL", name: "Alphabet Inc.", allocation: 9.2, value: 262000000, change: -0.7 },
    { symbol: "AMZN", name: "Amazon.com Inc.", allocation: 8.7, value: 248000000, change: 3.1 },
    { symbol: "TSLA", name: "Tesla Inc.", allocation: 7.3, value: 208000000, change: 5.2 },
  ]

  const riskMetrics = [
    { metric: "Value at Risk (95%)", value: "$45.2M", status: "normal" },
    { metric: "Beta", value: "1.12", status: "normal" },
    { metric: "Volatility", value: "14.8%", status: "elevated" },
    { metric: "Max Drawdown", value: "8.3%", status: "normal" },
  ]

  const clientUpdates = [
    { client: "Pension Fund Alpha", update: "Quarterly rebalancing completed", time: "2 hours ago", priority: "high" },
    {
      client: "Sovereign Wealth Beta",
      update: "ESG compliance review passed",
      time: "4 hours ago",
      priority: "medium",
    },
    { client: "Insurance Corp Gamma", update: "New mandate approved - $50M", time: "6 hours ago", priority: "high" },
    { client: "Endowment Delta", update: "Performance review scheduled", time: "1 day ago", priority: "low" },
  ]

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(2)}B`
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    }
    return `$${amount.toLocaleString()}`
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      default:
        return "bg-green-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "elevated":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 bg-clip-text text-transparent">
              Institutional Dashboard
            </h1>
            <p className="text-xl text-muted-foreground mt-2">High-Volume Investment & Portfolio Management</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-purple-600 text-white">
              <Landmark className="h-4 w-4 mr-2" />
              Premium Tier
            </Badge>
            <Badge variant="outline" className="border-green-500 text-green-600">
              <Activity className="h-4 w-4 mr-2" />
              Live Trading
            </Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Total AUM</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{formatCurrency(portfolioMetrics.totalAUM)}</div>
              <div className="flex items-center text-sm text-green-600 mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />+{portfolioMetrics.monthlyReturn}% this month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700">YTD Return</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">+{portfolioMetrics.ytdReturn}%</div>
              <div className="flex items-center text-sm text-green-600 mt-1">
                <Target className="h-4 w-4 mr-1" />
                Sharpe: {portfolioMetrics.sharpeRatio}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Active Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{portfolioMetrics.activePositions}</div>
              <div className="flex items-center text-sm text-blue-600 mt-1">
                <ArrowUpDown className="h-4 w-4 mr-1" />
                Across 12 sectors
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Client Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">{portfolioMetrics.clientAccounts}</div>
              <div className="flex items-center text-sm text-orange-600 mt-1">
                <Users className="h-4 w-4 mr-1" />
                Institutional clients
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="risk">Risk Management</TabsTrigger>
            <TabsTrigger value="clients">Client Relations</TabsTrigger>
            <TabsTrigger value="trading">Trading Desk</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Holdings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Top Holdings
                  </CardTitle>
                  <CardDescription>Largest positions by allocation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topHoldings.map((holding, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="font-medium">{holding.symbol}</div>
                            <div className="text-sm text-muted-foreground">{holding.name}</div>
                          </div>
                          <div className="flex items-center gap-4 mt-1">
                            <Progress value={holding.allocation} className="flex-1 h-2" />
                            <div className="text-sm font-medium">{holding.allocation}%</div>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="font-medium">{formatCurrency(holding.value)}</div>
                          <div
                            className={`text-sm ${
                              holding.change >= 0 ? "text-green-600" : "text-red-600"
                            } flex items-center`}
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
                  </div>
                </CardContent>
              </Card>

              {/* Sector Allocation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Sector Allocation
                  </CardTitle>
                  <CardDescription>Portfolio distribution by sector</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { sector: "Technology", allocation: 28.5, color: "bg-blue-500" },
                      { sector: "Healthcare", allocation: 18.2, color: "bg-green-500" },
                      { sector: "Financial Services", allocation: 15.7, color: "bg-purple-500" },
                      { sector: "Consumer Discretionary", allocation: 12.3, color: "bg-orange-500" },
                      { sector: "Energy", allocation: 8.9, color: "bg-red-500" },
                      { sector: "Other", allocation: 16.4, color: "bg-gray-500" },
                    ].map((sector, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className={`w-4 h-4 rounded ${sector.color}`} />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{sector.sector}</span>
                            <span className="text-sm font-medium">{sector.allocation}%</span>
                          </div>
                          <Progress value={sector.allocation} className="h-2 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Risk Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Risk Metrics
                  </CardTitle>
                  <CardDescription>Current risk assessment and limits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {riskMetrics.map((risk, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(risk.status)}
                          <span className="font-medium">{risk.metric}</span>
                        </div>
                        <div className="font-bold">{risk.value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Risk Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Risk Alerts
                  </CardTitle>
                  <CardDescription>Active risk monitoring and alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <div className="flex-1">
                        <div className="font-medium text-yellow-800">Elevated Volatility</div>
                        <div className="text-sm text-yellow-600">Tech sector showing increased volatility</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div className="flex-1">
                        <div className="font-medium text-green-800">Risk Limits Normal</div>
                        <div className="text-sm text-green-600">All positions within acceptable limits</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <Activity className="h-4 w-4 text-blue-600" />
                      <div className="flex-1">
                        <div className="font-medium text-blue-800">Correlation Analysis</div>
                        <div className="text-sm text-blue-600">Portfolio correlation within target range</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Client Updates
                </CardTitle>
                <CardDescription>Recent client communications and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientUpdates.map((update, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg border">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(update.priority)}`} />
                      <div className="flex-1">
                        <div className="font-medium">{update.client}</div>
                        <div className="text-sm text-muted-foreground">{update.update}</div>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {update.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trading" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowUpDown className="h-5 w-5" />
                    Trading Activity
                  </CardTitle>
                  <CardDescription>Recent trades and execution quality</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center text-muted-foreground py-8">
                      <ArrowUpDown className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Trading interface will be available soon</p>
                      <p className="text-sm">Advanced institutional trading tools</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="h-5 w-5" />
                    Liquidity Management
                  </CardTitle>
                  <CardDescription>Cash positions and liquidity analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Available Cash</span>
                      <span className="font-bold">$142.5M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Committed Capital</span>
                      <span className="font-bold">$2.7B</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Liquidity Ratio</span>
                      <span className="font-bold text-green-600">5.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="research" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Research & Analysis
                </CardTitle>
                <CardDescription>Market research and investment analysis tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Research platform coming soon</p>
                  <p className="text-sm">Advanced market analysis and research tools</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
