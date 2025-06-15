"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PieChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Zap,
  Brain,
  Shield,
  Activity,
  LineChart,
  RefreshCw,
  Download,
  Share,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"

interface PortfolioHolding {
  symbol: string
  name: string
  quantity: number
  currentPrice: number
  totalValue: number
  dayChange: number
  dayChangePercent: number
  allocation: number
  sector: string
  riskLevel: "Low" | "Medium" | "High"
}

interface PortfolioAnalysis {
  totalValue: number
  totalGainLoss: number
  totalGainLossPercent: number
  diversificationScore: number
  riskScore: number
  sharpeRatio: number
  beta: number
  volatility: number
  recommendations: string[]
}

export function QuantumPortfolioAnalyzer() {
  const [holdings, setHoldings] = useState<PortfolioHolding[]>([])
  const [analysis, setAnalysis] = useState<PortfolioAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeView, setActiveView] = useState("holdings")

  useEffect(() => {
    // Initialize portfolio data
    const initializePortfolio = () => {
      const mockHoldings: PortfolioHolding[] = [
        {
          symbol: "AAPL",
          name: "Apple Inc.",
          quantity: 150,
          currentPrice: 175.43,
          totalValue: 26314.5,
          dayChange: 2.34,
          dayChangePercent: 1.35,
          allocation: 18.5,
          sector: "Technology",
          riskLevel: "Medium",
        },
        {
          symbol: "GOOGL",
          name: "Alphabet Inc.",
          quantity: 75,
          currentPrice: 142.56,
          totalValue: 10692.0,
          dayChange: -1.23,
          dayChangePercent: -0.85,
          allocation: 15.2,
          sector: "Technology",
          riskLevel: "Medium",
        },
        {
          symbol: "TSLA",
          name: "Tesla Inc.",
          quantity: 100,
          currentPrice: 248.5,
          totalValue: 24850.0,
          dayChange: 12.45,
          dayChangePercent: 5.27,
          allocation: 12.8,
          sector: "Automotive",
          riskLevel: "High",
        },
        {
          symbol: "MSFT",
          name: "Microsoft Corp.",
          quantity: 120,
          currentPrice: 378.85,
          totalValue: 45462.0,
          dayChange: 4.67,
          dayChangePercent: 1.25,
          allocation: 22.1,
          sector: "Technology",
          riskLevel: "Low",
        },
        {
          symbol: "NVDA",
          name: "NVIDIA Corp.",
          quantity: 80,
          currentPrice: 875.28,
          totalValue: 70022.4,
          dayChange: 23.45,
          dayChangePercent: 2.75,
          allocation: 31.4,
          sector: "Technology",
          riskLevel: "High",
        },
      ]

      setHoldings(mockHoldings)

      // Calculate analysis
      const totalValue = mockHoldings.reduce((sum, holding) => sum + holding.totalValue, 0)
      const totalCost = totalValue * 0.85 // Assume 15% gain
      const totalGainLoss = totalValue - totalCost
      const totalGainLossPercent = (totalGainLoss / totalCost) * 100

      setAnalysis({
        totalValue,
        totalGainLoss,
        totalGainLossPercent,
        diversificationScore: 72,
        riskScore: 68,
        sharpeRatio: 1.34,
        beta: 1.12,
        volatility: 18.5,
        recommendations: [
          "Consider reducing technology sector exposure (69% of portfolio)",
          "Add defensive stocks to balance high-growth positions",
          "Increase international diversification",
          "Consider adding bonds for stability",
          "Rebalance NVDA position (31% allocation is high)",
        ],
      })
    }

    initializePortfolio()
  }, [])

  const runQuantumAnalysis = async () => {
    setIsAnalyzing(true)

    // Simulate quantum analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Update analysis with quantum insights
    if (analysis) {
      setAnalysis({
        ...analysis,
        diversificationScore: Math.min(100, analysis.diversificationScore + 5),
        riskScore: Math.max(0, analysis.riskScore - 3),
        recommendations: [
          ...analysis.recommendations,
          "Quantum analysis suggests optimal rebalancing in 2-3 weeks",
          "AI predicts 12% growth potential with current allocation",
        ],
      })
    }

    setIsAnalyzing(false)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "text-red-400 bg-red-500/20 border-red-400/30"
      case "Medium":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-400/30"
      case "Low":
        return "text-green-400 bg-green-500/20 border-green-400/30"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-400/30"
    }
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-slate-900/50 to-blue-900/50 border-blue-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-300 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {analysis ? formatCurrency(analysis.totalValue) : "Loading..."}
            </div>
            {analysis && (
              <div
                className={`text-sm flex items-center gap-1 ${
                  analysis.totalGainLoss >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {analysis.totalGainLoss >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {formatCurrency(Math.abs(analysis.totalGainLoss))} ({analysis.totalGainLossPercent.toFixed(2)}%)
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900/50 to-purple-900/50 border-purple-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-300 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Diversification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-2">
              {analysis ? `${analysis.diversificationScore}/100` : "..."}
            </div>
            {analysis && <Progress value={analysis.diversificationScore} className="h-2" />}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900/50 to-amber-900/50 border-amber-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-amber-300 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-2">{analysis ? `${analysis.riskScore}/100` : "..."}</div>
            {analysis && <Progress value={analysis.riskScore} className="h-2" />}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900/50 to-cyan-900/50 border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-cyan-300 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Sharpe Ratio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{analysis ? analysis.sharpeRatio.toFixed(2) : "..."}</div>
            <div className="text-sm text-cyan-400">Beta: {analysis ? analysis.beta.toFixed(2) : "..."}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Interface */}
      <Card className="bg-slate-900/50 border-cyan-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-cyan-300 flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Quantum Portfolio Analysis
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button onClick={runQuantumAnalysis} disabled={isAnalyzing} className="bg-purple-600 hover:bg-purple-700">
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Run Quantum Analysis
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeView} onValueChange={setActiveView}>
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
              <TabsTrigger value="holdings">Holdings</TabsTrigger>
              <TabsTrigger value="allocation">Allocation</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="recommendations">AI Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="holdings" className="space-y-4">
              <div className="space-y-3">
                {holdings.map((holding) => (
                  <motion.div
                    key={holding.symbol}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-600/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{holding.symbol}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{holding.name}</h3>
                        <p className="text-sm text-slate-400">
                          {holding.quantity} shares • {holding.sector}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold text-white">{formatCurrency(holding.totalValue)}</div>
                      <div
                        className={`text-sm flex items-center gap-1 ${
                          holding.dayChange >= 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {holding.dayChange >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {holding.dayChangePercent.toFixed(2)}%
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className={getRiskColor(holding.riskLevel)}>{holding.riskLevel} Risk</Badge>
                      <Badge className="bg-slate-600/30 text-slate-300">{holding.allocation.toFixed(1)}%</Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="allocation" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-800/30 border-slate-600/30">
                  <CardHeader>
                    <CardTitle className="text-slate-300">Sector Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-slate-400">
                      <div className="text-center">
                        <PieChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p>Sector Distribution Chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-600/30">
                  <CardHeader>
                    <CardTitle className="text-slate-300">Risk Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-green-400">Low Risk</span>
                        <span className="text-slate-300">22.1%</span>
                      </div>
                      <Progress value={22.1} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span className="text-yellow-400">Medium Risk</span>
                        <span className="text-slate-300">33.7%</span>
                      </div>
                      <Progress value={33.7} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span className="text-red-400">High Risk</span>
                        <span className="text-slate-300">44.2%</span>
                      </div>
                      <Progress value={44.2} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <Card className="bg-slate-800/30 border-slate-600/30">
                <CardHeader>
                  <CardTitle className="text-slate-300">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">15.7%</div>
                      <div className="text-sm text-slate-400">YTD Return</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">1.34</div>
                      <div className="text-sm text-slate-400">Sharpe Ratio</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">18.5%</div>
                      <div className="text-sm text-slate-400">Volatility</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">1.12</div>
                      <div className="text-sm text-slate-400">Beta</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/30 border-slate-600/30">
                <CardHeader>
                  <CardTitle className="text-slate-300">Historical Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-slate-400">
                    <div className="text-center">
                      <LineChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Performance Chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              {analysis && (
                <div className="space-y-4">
                  <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/30">
                    <CardHeader>
                      <CardTitle className="text-purple-300 flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        AI-Powered Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analysis.recommendations.map((recommendation, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30"
                          >
                            <div className="w-6 h-6 rounded-full bg-purple-600/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-purple-300 text-xs font-bold">{index + 1}</span>
                            </div>
                            <p className="text-slate-300 text-sm">{recommendation}</p>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-green-900/20 border-green-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span className="text-green-300 font-medium">Strengths</span>
                        </div>
                        <ul className="text-sm text-green-200 space-y-1">
                          <li>• Strong tech sector exposure</li>
                          <li>• Good growth potential</li>
                          <li>• Quality companies</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-yellow-900/20 border-yellow-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-5 w-5 text-yellow-400" />
                          <span className="text-yellow-300 font-medium">Risks</span>
                        </div>
                        <ul className="text-sm text-yellow-200 space-y-1">
                          <li>• High sector concentration</li>
                          <li>• Elevated volatility</li>
                          <li>• Limited diversification</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-blue-900/20 border-blue-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-5 w-5 text-blue-400" />
                          <span className="text-blue-300 font-medium">Next Actions</span>
                        </div>
                        <ul className="text-sm text-blue-200 space-y-1">
                          <li>• Rebalance in 2-3 weeks</li>
                          <li>• Add defensive positions</li>
                          <li>• Monitor tech exposure</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
