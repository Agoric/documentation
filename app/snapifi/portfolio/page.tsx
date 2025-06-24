"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Target,
  PieChart,
  Coins,
  Globe,
  Zap,
  Star,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

export default function PortfolioPage() {
  const [portfolioValue, setPortfolioValue] = useState(125750.5)
  const [totalReturn, setTotalReturn] = useState(18250.5)
  const [monthlyContribution, setMonthlyContribution] = useState(2500)

  const portfolioAllocation = [
    { name: "RWA Tokens", value: 45000, percentage: 35.8, color: "bg-blue-500", return: 12.4 },
    { name: "Traditional Stocks", value: 38250, percentage: 30.4, color: "bg-green-500", return: 8.7 },
    { name: "Real Estate", value: 25500, percentage: 20.3, color: "bg-purple-500", return: 15.2 },
    { name: "Bonds", value: 12750, percentage: 10.1, color: "bg-yellow-500", return: 4.2 },
    { name: "Cash", value: 4250, percentage: 3.4, color: "bg-gray-500", return: 2.5 },
  ]

  const topHoldings = [
    {
      name: "Austin Luxury Condo RWA",
      symbol: "ALC-001",
      value: 15000,
      return: 18.5,
      type: "RWA Token",
      risk: "Medium",
    },
    {
      name: "Tech Growth ETF",
      symbol: "VGT",
      value: 12500,
      return: 22.3,
      type: "ETF",
      risk: "High",
    },
    {
      name: "Denver Office Building",
      symbol: "DOB-002",
      value: 10000,
      return: 14.7,
      type: "RWA Token",
      risk: "Low",
    },
    {
      name: "S&P 500 Index",
      symbol: "SPY",
      value: 8750,
      return: 11.2,
      type: "ETF",
      risk: "Medium",
    },
    {
      name: "Loan Portfolio Token",
      symbol: "LPT-001",
      value: 7500,
      return: 16.8,
      type: "RWA Token",
      risk: "Medium",
    },
  ]

  const performanceMetrics = [
    {
      name: "Total Return",
      value: `+${((totalReturn / (portfolioValue - totalReturn)) * 100).toFixed(1)}%`,
      status: "positive",
    },
    { name: "YTD Return", value: "+24.7%", status: "positive" },
    { name: "30-Day Return", value: "+3.2%", status: "positive" },
    { name: "Volatility", value: "12.4%", status: "neutral" },
    { name: "Sharpe Ratio", value: "1.85", status: "positive" },
    { name: "Max Drawdown", value: "-8.3%", status: "neutral" },
  ]

  const rebalancingRecommendations = [
    {
      action: "Reduce Tech Exposure",
      description: "Consider reducing tech allocation by 5% due to high valuations",
      impact: "Risk Reduction",
      urgency: "Medium",
      icon: AlertTriangle,
      color: "text-yellow-600",
    },
    {
      action: "Increase RWA Tokens",
      description: "Add 3% to RWA tokens for better diversification",
      impact: "Diversification",
      urgency: "Low",
      icon: Coins,
      color: "text-blue-600",
    },
    {
      action: "Rebalance International",
      description: "Add international exposure for global diversification",
      impact: "Geographic Spread",
      urgency: "Medium",
      icon: Globe,
      color: "text-purple-600",
    },
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-600"
      case "Medium":
        return "text-yellow-600"
      case "High":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "positive":
        return "text-green-600"
      case "negative":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Portfolio Management</h1>
          <p className="text-muted-foreground">Comprehensive investment tracking with quantum-powered analytics</p>
        </div>
        <Badge className="bg-green-100 text-green-800">
          <TrendingUp className="h-3 w-3 mr-1" />+{((totalReturn / (portfolioValue - totalReturn)) * 100).toFixed(1)}%
          Total Return
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="rebalancing">Rebalancing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${portfolioValue.toLocaleString()}</div>
                <p className="text-xs text-green-600">+5.2% this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Return</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+${totalReturn.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +{((totalReturn / (portfolioValue - totalReturn)) * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Contribution</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${monthlyContribution.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Auto-investing enabled</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">7.2</div>
                <p className="text-xs text-muted-foreground">Moderate risk</p>
              </CardContent>
            </Card>
          </div>

          {/* Asset Allocation Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5" />
                <span>Asset Allocation</span>
              </CardTitle>
              <CardDescription>Current portfolio distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioAllocation.map((asset, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded ${asset.color}`} />
                        <span className="font-medium">{asset.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${asset.value.toLocaleString()}</div>
                        <div className="text-sm text-green-600">+{asset.return}%</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={asset.percentage} className="flex-1 h-2" />
                      <span className="text-sm text-muted-foreground w-12">{asset.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key portfolio performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="text-center p-3 border rounded-lg">
                    <div className={`text-lg font-bold ${getStatusColor(metric.status)}`}>{metric.value}</div>
                    <p className="text-sm text-muted-foreground">{metric.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="holdings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Holdings</CardTitle>
              <CardDescription>Your largest portfolio positions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topHoldings.map((holding, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {holding.type === "RWA Token" ? (
                          <Coins className="h-5 w-5 text-blue-600" />
                        ) : (
                          <BarChart3 className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{holding.name}</h4>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-muted-foreground">{holding.symbol}</p>
                          <Badge variant="outline" className="text-xs">
                            {holding.type}
                          </Badge>
                          <Badge className={`text-xs ${getRiskColor(holding.risk)} border`} variant="outline">
                            {holding.risk} Risk
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${holding.value.toLocaleString()}</div>
                      <div className="text-sm text-green-600">+{holding.return}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
                <CardDescription>Portfolio performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      +{((totalReturn / (portfolioValue - totalReturn)) * 100).toFixed(1)}%
                    </div>
                    <p className="text-muted-foreground">Total Return</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">+24.7%</div>
                      <p className="text-sm text-green-800">YTD Return</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">1.85</div>
                      <p className="text-sm text-blue-800">Sharpe Ratio</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Analysis</CardTitle>
                <CardDescription>Portfolio risk metrics and analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Portfolio Beta</span>
                    <span className="font-bold">0.92</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Volatility</span>
                    <span className="font-bold">12.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Drawdown</span>
                    <span className="font-bold text-red-600">-8.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VaR (95%)</span>
                    <span className="font-bold">-$3,250</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Target vs Current Allocation</CardTitle>
              <CardDescription>Compare your current allocation with target allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {portfolioAllocation.map((asset, index) => {
                  const target = [40, 30, 20, 8, 2][index] // Target allocations
                  const difference = asset.percentage - target

                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded ${asset.color}`} />
                          <span className="font-medium">{asset.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">
                            Current: {asset.percentage}% | Target: {target}%
                          </div>
                          <div
                            className={`text-sm font-bold ${difference > 0 ? "text-red-600" : difference < 0 ? "text-blue-600" : "text-green-600"}`}
                          >
                            {difference > 0 ? "+" : ""}
                            {difference.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Current</div>
                          <Progress value={asset.percentage} className="h-2" />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Target</div>
                          <Progress value={target} className="h-2" />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rebalancing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>AI Rebalancing Recommendations</span>
              </CardTitle>
              <CardDescription>Quantum-powered portfolio optimization suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rebalancingRecommendations.map((rec, index) => {
                  const IconComponent = rec.icon
                  return (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start space-x-3">
                        <IconComponent className={`h-5 w-5 ${rec.color} mt-0.5`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{rec.action}</h4>
                            <Badge
                              className={
                                rec.urgency === "High"
                                  ? "bg-red-100 text-red-800"
                                  : rec.urgency === "Medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }
                            >
                              {rec.urgency} Priority
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">{rec.impact}</Badge>
                            <Button size="sm">Apply Recommendation</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Auto-Rebalancing Settings</CardTitle>
              <CardDescription>Configure automatic portfolio rebalancing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Automatic Rebalancing</h4>
                    <p className="text-sm text-muted-foreground">Rebalance when allocation drifts &gt;5%</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Enabled
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Quantum Optimization</h4>
                    <p className="text-sm text-muted-foreground">AI-powered allocation optimization</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    <Zap className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Tax-Loss Harvesting</h4>
                    <p className="text-sm text-muted-foreground">Automatic tax optimization</p>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">
                    <Star className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
