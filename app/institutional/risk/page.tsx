"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertTriangle,
  Shield,
  TrendingDown,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  RefreshCw,
  Download,
  Eye,
  Calculator,
  Building2,
  DollarSign,
} from "lucide-react"

interface RiskMetric {
  name: string
  value: number
  threshold: number
  status: "low" | "medium" | "high" | "critical"
  trend: "up" | "down" | "stable"
  description: string
}

interface PortfolioRisk {
  totalValue: number
  governmentGuaranteed: number
  defaultProbability: number
  concentrationRisk: number
  liquidityRisk: number
  interestRateRisk: number
  creditRisk: number
  marketRisk: number
}

export default function InstitutionalRiskPage() {
  const [activeTab, setActiveTab] = React.useState("overview")
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)

  const portfolioRisk: PortfolioRisk = {
    totalValue: 2847392000, // $2.8B
    governmentGuaranteed: 1847392000, // $1.8B (64.9%)
    defaultProbability: 1.8, // <2%
    concentrationRisk: 15.2, // Low concentration
    liquidityRisk: 8.5, // Low liquidity risk
    interestRateRisk: 12.3, // Moderate interest rate risk
    creditRisk: 5.7, // Low credit risk due to government guarantees
    marketRisk: 9.8, // Low market risk
  }

  const riskMetrics: RiskMetric[] = [
    {
      name: "Default Probability",
      value: portfolioRisk.defaultProbability,
      threshold: 2.0,
      status: "low",
      trend: "stable",
      description: "Probability of loan defaults in government-guaranteed mortgage portfolio",
    },
    {
      name: "Credit Risk Score",
      value: portfolioRisk.creditRisk,
      threshold: 15.0,
      status: "low",
      trend: "down",
      description: "Overall credit risk assessment based on borrower profiles and guarantees",
    },
    {
      name: "Concentration Risk",
      value: portfolioRisk.concentrationRisk,
      threshold: 25.0,
      status: "low",
      trend: "stable",
      description: "Risk from over-concentration in specific loan types or geographic areas",
    },
    {
      name: "Liquidity Risk",
      value: portfolioRisk.liquidityRisk,
      threshold: 20.0,
      status: "low",
      trend: "down",
      description: "Risk of inability to meet short-term obligations or liquidate positions",
    },
    {
      name: "Interest Rate Risk",
      value: portfolioRisk.interestRateRisk,
      threshold: 30.0,
      status: "low",
      trend: "up",
      description: "Sensitivity to changes in interest rates affecting portfolio value",
    },
    {
      name: "Market Risk",
      value: portfolioRisk.marketRisk,
      threshold: 25.0,
      status: "low",
      trend: "stable",
      description: "Risk from overall market conditions and economic factors",
    },
  ]

  const riskScenarios = [
    {
      name: "Base Case",
      probability: 70,
      expectedROI: 22.4,
      portfolioValue: 2847392000,
      description: "Current market conditions continue",
    },
    {
      name: "Economic Downturn",
      probability: 20,
      expectedROI: 18.2,
      portfolioValue: 2563452800,
      description: "Moderate economic recession scenario",
    },
    {
      name: "Interest Rate Shock",
      probability: 8,
      expectedROI: 15.7,
      portfolioValue: 2278513600,
      description: "Rapid interest rate increases",
    },
    {
      name: "Severe Crisis",
      probability: 2,
      expectedROI: 12.1,
      portfolioValue: 1993574400,
      description: "Major financial crisis scenario",
    },
  ]

  const handleRiskAnalysis = async () => {
    setIsAnalyzing(true)
    // Simulate risk analysis
    setTimeout(() => {
      setIsAnalyzing(false)
    }, 3000)
  }

  const getRiskColor = (status: string) => {
    switch (status) {
      case "low":
        return "text-green-500"
      case "medium":
        return "text-yellow-500"
      case "high":
        return "text-orange-500"
      case "critical":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getRiskBadgeColor = (status: string) => {
    switch (status) {
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-400" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-400" />
      case "stable":
        return <Activity className="h-4 w-4 text-blue-400" />
      default:
        return <Activity className="h-4 w-4 text-gray-400" />
    }
  }

  const overallRiskScore = Math.round(riskMetrics.reduce((sum, metric) => sum + metric.value, 0) / riskMetrics.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Risk Management Center
            </h1>
            <p className="text-slate-300 text-xl mt-2">
              Advanced risk assessment for institutional mortgage portfolios
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={handleRiskAnalysis} disabled={isAnalyzing} className="bg-red-600 hover:bg-red-700">
              <Calculator className="h-4 w-4 mr-2" />
              {isAnalyzing ? "Analyzing..." : "Run Analysis"}
            </Button>
            <Button variant="outline" className="border-slate-600 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Risk Report
            </Button>
          </div>
        </div>

        {/* Risk Alert */}
        <Alert className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
          <Shield className="h-4 w-4" />
          <AlertDescription className="text-green-200">
            <strong>Low Risk Portfolio:</strong> Government-guaranteed mortgages provide exceptional risk mitigation
            with &lt;2% default probability and 64.9% government backing. Current risk score: {overallRiskScore}/100
            (Excellent).
          </AlertDescription>
        </Alert>

        {/* Key Risk Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">Overall Risk Score</p>
                  <p className="text-3xl font-bold text-white">{overallRiskScore}/100</p>
                  <p className="text-green-400 text-sm">Excellent</p>
                </div>
                <Shield className="h-10 w-10 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">Default Probability</p>
                  <p className="text-3xl font-bold text-white">{portfolioRisk.defaultProbability}%</p>
                  <p className="text-blue-400 text-sm">Well Below 2% Threshold</p>
                </div>
                <AlertTriangle className="h-10 w-10 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium">Gov. Guarantee</p>
                  <p className="text-3xl font-bold text-white">
                    {((portfolioRisk.governmentGuaranteed / portfolioRisk.totalValue) * 100).toFixed(1)}%
                  </p>
                  <p className="text-purple-400 text-sm">Portfolio Protected</p>
                </div>
                <Building2 className="h-10 w-10 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/40 to-red-900/40 border-orange-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm font-medium">Value at Risk</p>
                  <p className="text-3xl font-bold text-white">$142M</p>
                  <p className="text-orange-400 text-sm">95% Confidence</p>
                </div>
                <DollarSign className="h-10 w-10 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Analysis Progress */}
        {isAnalyzing && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-medium">Risk Analysis in Progress</span>
                <span className="text-slate-300">Analyzing portfolio risk factors...</span>
              </div>
              <Progress value={66} className="h-2" />
            </CardContent>
          </Card>
        )}

        {/* Main Risk Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800/50 border-slate-700 grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="data-[state=active]:bg-red-600">
              <Shield className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="metrics" className="data-[state=active]:bg-orange-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="data-[state=active]:bg-yellow-600">
              <Target className="w-4 h-4 mr-2" />
              Scenarios
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-green-600">
              <Activity className="w-4 h-4 mr-2" />
              Monitoring
            </TabsTrigger>
            <TabsTrigger value="mitigation" className="data-[state=active]:bg-blue-600">
              <Zap className="w-4 h-4 mr-2" />
              Mitigation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Risk Distribution</CardTitle>
                  <CardDescription>Portfolio risk breakdown by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-lg">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 mx-auto mb-4 text-red-400" />
                      <p className="text-muted-foreground">Risk Distribution Chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Risk Trend Analysis</CardTitle>
                  <CardDescription>Historical risk metrics over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                      <p className="text-muted-foreground">Risk Trend Chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Government Guarantee Protection</CardTitle>
                <CardDescription>Risk mitigation through federal backing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                    <h4 className="text-green-300 font-medium mb-2">FHA Loans</h4>
                    <div className="text-2xl font-bold text-white mb-1">34%</div>
                    <div className="text-green-400 text-sm">$967M Protected</div>
                  </div>
                  <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                    <h4 className="text-blue-300 font-medium mb-2">VA Loans</h4>
                    <div className="text-2xl font-bold text-white mb-1">28%</div>
                    <div className="text-blue-400 text-sm">$797M Protected</div>
                  </div>
                  <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                    <h4 className="text-purple-300 font-medium mb-2">USDA Loans</h4>
                    <div className="text-2xl font-bold text-white mb-1">18%</div>
                    <div className="text-purple-400 text-sm">$513M Protected</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Detailed Risk Metrics</CardTitle>
                <CardDescription>Comprehensive risk assessment across all categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {riskMetrics.map((metric, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-slate-900/30 border border-slate-700 hover:border-slate-600 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            {getTrendIcon(metric.trend)}
                            <h4 className="text-white font-medium">{metric.name}</h4>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-white font-bold">{metric.value}%</span>
                          <Badge className={getRiskBadgeColor(metric.status)}>{metric.status}</Badge>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-400">Current: {metric.value}%</span>
                          <span className="text-slate-400">Threshold: {metric.threshold}%</span>
                        </div>
                        <Progress value={(metric.value / metric.threshold) * 100} className="h-2" />
                      </div>
                      <p className="text-slate-400 text-sm">{metric.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Stress Test Scenarios</CardTitle>
                <CardDescription>Portfolio performance under various market conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskScenarios.map((scenario, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-slate-900/30 border border-slate-700 hover:border-slate-600 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="text-white font-medium">{scenario.name}</h4>
                          <p className="text-slate-400 text-sm">{scenario.description}</p>
                        </div>
                        <Badge
                          className={
                            scenario.probability >= 50
                              ? "bg-green-500/20 text-green-400"
                              : scenario.probability >= 20
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                          }
                        >
                          {scenario.probability}% Probability
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                          <div className="text-lg font-bold text-white">{scenario.expectedROI}%</div>
                          <div className="text-slate-400 text-sm">Expected ROI</div>
                        </div>
                        <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                          <div className="text-lg font-bold text-white">
                            ${(scenario.portfolioValue / 1000000000).toFixed(2)}B
                          </div>
                          <div className="text-slate-400 text-sm">Portfolio Value</div>
                        </div>
                        <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                          <div
                            className={`text-lg font-bold ${
                              scenario.portfolioValue >= portfolioRisk.totalValue ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {scenario.portfolioValue >= portfolioRisk.totalValue ? "+" : ""}
                            {(
                              ((scenario.portfolioValue - portfolioRisk.totalValue) / portfolioRisk.totalValue) *
                              100
                            ).toFixed(1)}
                            %
                          </div>
                          <div className="text-slate-400 text-sm">Change</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Real-time Risk Monitoring</CardTitle>
                  <CardDescription>Continuous risk assessment and alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse" />
                      <span className="text-white">Credit Risk Monitor</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-900/20 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-400 rounded-full mr-3 animate-pulse" />
                      <span className="text-white">Market Risk Tracker</span>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-400">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-400 rounded-full mr-3 animate-pulse" />
                      <span className="text-white">Liquidity Monitor</span>
                    </div>
                    <Badge className="bg-purple-500/20 text-purple-400">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-orange-900/20 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-400 rounded-full mr-3 animate-pulse" />
                      <span className="text-white">Interest Rate Monitor</span>
                    </div>
                    <Badge className="bg-orange-500/20 text-orange-400">Active</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Risk Alerts</CardTitle>
                  <CardDescription>Current risk notifications and warnings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-300 font-medium">Portfolio Health</span>
                      <Badge className="bg-green-500/20 text-green-400">Excellent</Badge>
                    </div>
                    <p className="text-green-400 text-sm">All risk metrics within acceptable ranges</p>
                  </div>

                  <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-300 font-medium">Government Backing</span>
                      <Badge className="bg-blue-500/20 text-blue-400">64.9%</Badge>
                    </div>
                    <p className="text-blue-400 text-sm">Strong government guarantee coverage</p>
                  </div>

                  <div className="p-3 bg-slate-900/30 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300 font-medium">No Active Alerts</span>
                      <Badge className="bg-slate-500/20 text-slate-400">0</Badge>
                    </div>
                    <p className="text-slate-400 text-sm">No risk alerts requiring immediate attention</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mitigation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Risk Mitigation Strategies</CardTitle>
                  <CardDescription>Active risk reduction measures</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                    <h4 className="text-green-300 font-medium mb-2">Government Guarantees</h4>
                    <p className="text-green-400 text-sm mb-2">64.9% of portfolio backed by federal guarantees</p>
                    <div className="text-2xl font-bold text-white">$1.8B Protected</div>
                  </div>

                  <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                    <h4 className="text-blue-300 font-medium mb-2">Diversification</h4>
                    <p className="text-blue-400 text-sm mb-2">Spread across multiple loan types and regions</p>
                    <div className="text-2xl font-bold text-white">15.2% Risk</div>
                  </div>

                  <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                    <h4 className="text-purple-300 font-medium mb-2">Credit Screening</h4>
                    <p className="text-purple-400 text-sm mb-2">Rigorous borrower qualification standards</p>
                    <div className="text-2xl font-bold text-white">&lt;2% Default</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Recommended Actions</CardTitle>
                  <CardDescription>AI-powered risk optimization suggestions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Rebalance Portfolio Allocation
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Increase Government Guarantee Ratio
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Target className="h-4 w-4 mr-2" />
                    Optimize Geographic Distribution
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Enhance Credit Screening
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
