"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  Eye,
  RefreshCw,
  Download,
  Settings,
  CheckCircle,
  DollarSign,
} from "lucide-react"

export default function InstitutionalRiskPage() {
  const [selectedTimeframe, setSelectedTimeframe] = React.useState("1M")
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const riskMetrics = {
    portfolioVaR: 45200000, // $45.2M Value at Risk (95%)
    beta: 1.12,
    volatility: 14.8,
    maxDrawdown: 8.3,
    sharpeRatio: 2.34,
    sortinRatio: 3.12,
    informationRatio: 1.87,
    trackingError: 4.2,
  }

  const governmentBondRisk = [
    {
      bondType: "FHA",
      allocation: 35,
      riskScore: 2.1, // Low risk due to 100% government guarantee
      var95: 8500000,
      expectedReturn: 20.3,
      volatility: 3.2,
      guarantee: 100,
    },
    {
      bondType: "VA",
      allocation: 30,
      riskScore: 2.0, // Lowest risk due to 100% guarantee + veteran backing
      var95: 7200000,
      expectedReturn: 20.1,
      volatility: 2.8,
      guarantee: 100,
    },
    {
      bondType: "USDA",
      allocation: 20,
      riskScore: 2.8, // Slightly higher due to 90% guarantee
      var95: 5800000,
      expectedReturn: 19.8,
      volatility: 4.1,
      guarantee: 90,
    },
    {
      bondType: "SBA",
      allocation: 15,
      riskScore: 3.2, // Higher due to 85% guarantee + business risk
      var95: 4900000,
      expectedReturn: 20.5,
      volatility: 5.5,
      guarantee: 85,
    },
  ]

  const stressTestScenarios = [
    {
      scenario: "Interest Rate Shock (+300 bps)",
      impact: -12.5,
      portfolioValue: 2492187500,
      timeToRecover: "18 months",
      probability: 5,
    },
    {
      scenario: "Economic Recession",
      impact: -8.7,
      portfolioValue: 2600000000,
      timeToRecover: "12 months",
      probability: 15,
    },
    {
      scenario: "Government Policy Change",
      impact: -5.2,
      portfolioValue: 2700000000,
      timeToRecover: "8 months",
      probability: 10,
    },
    {
      scenario: "Credit Market Disruption",
      impact: -15.8,
      portfolioValue: 2400000000,
      timeToRecover: "24 months",
      probability: 3,
    },
  ]

  const riskAlerts = [
    {
      id: "RISK-001",
      severity: "medium",
      type: "Concentration Risk",
      message: "FHA bond allocation exceeds 35% threshold",
      recommendation: "Consider rebalancing to USDA or SBA bonds",
      impact: "Medium",
    },
    {
      id: "RISK-002",
      severity: "low",
      type: "Volatility Increase",
      message: "SBA portfolio volatility increased to 5.5%",
      recommendation: "Monitor business loan performance closely",
      impact: "Low",
    },
    {
      id: "RISK-003",
      severity: "high",
      type: "Correlation Risk",
      message: "High correlation detected between FHA and VA portfolios",
      recommendation: "Diversify geographic exposure",
      impact: "High",
    },
  ]

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(2)}B`
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    }
    return `$${amount.toLocaleString()}`
  }

  const getRiskColor = (score: number) => {
    if (score <= 2.5) return "text-green-600"
    if (score <= 4.0) return "text-yellow-600"
    return "text-red-600"
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500 text-white"
      case "medium":
        return "bg-yellow-500 text-black"
      case "low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-red-800 bg-clip-text text-transparent">
              Institutional Risk Management
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              Government Guaranteed Bond Portfolio Risk Analysis • $100M+ Institutional Grade
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-500 text-white">
              <Shield className="h-4 w-4 mr-2" />
              Low Risk Profile
            </Badge>
            <Badge className="bg-blue-500 text-white">
              <Target className="h-4 w-4 mr-2" />
              20.3% Target ROI
            </Badge>
            <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline">
              {isRefreshing ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh Data
            </Button>
          </div>
        </div>

        {/* Risk Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-700 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Value at Risk (95%)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-900">{formatCurrency(riskMetrics.portfolioVaR)}</div>
              <div className="flex items-center text-sm text-red-600 mt-1">
                <Shield className="h-4 w-4 mr-1" />
                Government Backed
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Portfolio Beta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{riskMetrics.beta}</div>
              <div className="flex items-center text-sm text-blue-600 mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                Market Correlation
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Sharpe Ratio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{riskMetrics.sharpeRatio}</div>
              <div className="flex items-center text-sm text-green-600 mt-1">
                <CheckCircle className="h-4 w-4 mr-1" />
                Risk-Adjusted Return
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-700 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Max Drawdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{riskMetrics.maxDrawdown}%</div>
              <div className="flex items-center text-sm text-purple-600 mt-1">
                <TrendingDown className="h-4 w-4 mr-1" />
                Historical Peak Loss
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Risk Analysis Tabs */}
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="portfolio">Portfolio Risk</TabsTrigger>
            <TabsTrigger value="bonds">Bond Analysis</TabsTrigger>
            <TabsTrigger value="stress">Stress Testing</TabsTrigger>
            <TabsTrigger value="alerts">Risk Alerts</TabsTrigger>
            <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
          </TabsList>

          {/* Portfolio Risk Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Risk Decomposition */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Risk Decomposition
                  </CardTitle>
                  <CardDescription>Portfolio risk breakdown by government bond type</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {governmentBondRisk.map((bond, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{bond.bondType} Bonds</span>
                          <Badge variant="outline" className="text-xs">
                            {bond.guarantee}% Guarantee
                          </Badge>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">{bond.allocation}%</span>
                          <span className={`text-xs ml-2 ${getRiskColor(bond.riskScore)}`}>Risk: {bond.riskScore}</span>
                        </div>
                      </div>
                      <Progress value={bond.allocation} className="h-2" />
                      <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                        <span>VaR: {formatCurrency(bond.var95)}</span>
                        <span>Return: {bond.expectedReturn}%</span>
                        <span>Vol: {bond.volatility}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Risk Metrics Detail */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Advanced Risk Metrics
                  </CardTitle>
                  <CardDescription>Comprehensive risk measurement for institutional portfolios</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Volatility</span>
                        <span className="font-medium">{riskMetrics.volatility}%</span>
                      </div>
                      <Progress value={riskMetrics.volatility} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Tracking Error</span>
                        <span className="font-medium">{riskMetrics.trackingError}%</span>
                      </div>
                      <Progress value={riskMetrics.trackingError * 10} className="h-2" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sortino Ratio</span>
                      <span className="font-medium text-green-600">{riskMetrics.sortinRatio}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Information Ratio</span>
                      <span className="font-medium text-blue-600">{riskMetrics.informationRatio}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Government Guarantee Coverage</span>
                      <span className="font-medium text-green-600">93.75%</span>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Risk Assessment</span>
                    </div>
                    <p className="text-xs text-green-700">
                      Portfolio maintains low risk profile due to government guarantees. All metrics within
                      institutional acceptable ranges.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bond Analysis Tab */}
          <TabsContent value="bonds" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {governmentBondRisk.map((bond, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      {bond.bondType} Government Bonds
                    </CardTitle>
                    <CardDescription>
                      {bond.guarantee}% Government Guarantee • {bond.allocation}% Portfolio Allocation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Expected Return</p>
                        <p className="text-2xl font-bold text-green-600">{bond.expectedReturn}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Risk Score</p>
                        <p className={`text-2xl font-bold ${getRiskColor(bond.riskScore)}`}>{bond.riskScore}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Value at Risk</span>
                        <span className="font-medium">{formatCurrency(bond.var95)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Volatility</span>
                        <span className="font-medium">{bond.volatility}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Government Backing</span>
                        <span className="font-medium text-green-600">{bond.guarantee}%</span>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs text-blue-700">
                        {bond.bondType === "FHA" &&
                          "30-year fixed-rate mortgages with 100% government guarantee. Lowest default risk."}
                        {bond.bondType === "VA" &&
                          "50-year veteran-backed mortgages with full government guarantee. Premium stability."}
                        {bond.bondType === "USDA" &&
                          "35-year rural development loans with 90% guarantee. Geographic diversification."}
                        {bond.bondType === "SBA" &&
                          "25-year business loans with 85% guarantee. Higher yield potential with business growth."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Stress Testing Tab */}
          <TabsContent value="stress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Stress Test Scenarios
                </CardTitle>
                <CardDescription>
                  Portfolio resilience under adverse market conditions with government guarantee protection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stressTestScenarios.map((scenario, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{scenario.scenario}</h3>
                          <p className="text-sm text-muted-foreground">
                            Probability: {scenario.probability}% • Recovery: {scenario.timeToRecover}
                          </p>
                        </div>
                        <Badge
                          className={
                            Math.abs(scenario.impact) > 10
                              ? "bg-red-500 text-white"
                              : Math.abs(scenario.impact) > 5
                                ? "bg-yellow-500 text-black"
                                : "bg-green-500 text-white"
                          }
                        >
                          {scenario.impact > 0 ? "+" : ""}
                          {scenario.impact}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Portfolio Value Impact:</span>
                          <p className="font-medium">{formatCurrency(scenario.portfolioValue)}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Government Protection:</span>
                          <p className="font-medium text-green-600">93.75% Guaranteed</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Government Guarantee Protection</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Government guarantees provide significant downside protection across all stress scenarios. Maximum
                    unprotected exposure limited to 6.25% of portfolio value.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Risk Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Active Risk Alerts</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure Alerts
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {riskAlerts.map((alert) => (
                <Card key={alert.id} className="border-l-4 border-l-orange-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                          <span className="font-medium">{alert.type}</span>
                          <Badge variant="outline">Impact: {alert.impact}</Badge>
                        </div>
                        <p className="text-muted-foreground">{alert.message}</p>
                        <div className="p-3 bg-blue-50 rounded border border-blue-200">
                          <p className="text-sm text-blue-700">
                            <strong>Recommendation:</strong> {alert.recommendation}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                        <Button size="sm">Acknowledge</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Live Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Real-time Risk Monitoring
                  </CardTitle>
                  <CardDescription>Live portfolio risk metrics and government guarantee status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Portfolio VaR (Real-time)</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{formatCurrency(riskMetrics.portfolioVaR)}</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Government Guarantee Status</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium text-green-600">Active</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Risk Limit Utilization</span>
                      <div className="flex items-center gap-2">
                        <Progress value={67} className="w-20 h-2" />
                        <span className="font-medium">67%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Correlation Monitor</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">0.72</span>
                        <Badge variant="outline" className="text-xs">
                          Normal
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    ROI vs Risk Analysis
                  </CardTitle>
                  <CardDescription>Risk-adjusted return performance with 20% target ROI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">20.3%</p>
                    <p className="text-sm text-muted-foreground">Current ROI (Target: 20%)</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Risk-Adjusted Return</span>
                      <span className="font-medium">18.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Government Guarantee Benefit</span>
                      <span className="font-medium text-green-600">+2.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Institutional Premium</span>
                      <span className="font-medium text-blue-600">+1.1%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
