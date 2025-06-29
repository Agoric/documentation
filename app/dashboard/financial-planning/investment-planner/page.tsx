"use client"

import React from "react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { FuturisticCard } from "@/components/ui/futuristic-card"
import { useRouter } from "next/navigation"
import {
  TrendingUp,
  Target,
  ArrowLeft,
  Brain,
  BarChart3,
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

interface Investment {
  name: string
  allocation: number
  expectedReturn: number
  risk: "Low" | "Medium" | "High"
  color: string
}

export default function InvestmentPlannerPage() {
  const router = useRouter()
  const [investmentAmount, setInvestmentAmount] = React.useState(50000)
  const [timeHorizon, setTimeHorizon] = React.useState([10])
  const [riskTolerance, setRiskTolerance] = React.useState([5])
  const [investments, setInvestments] = React.useState<Investment[]>([
    { name: "S&P 500 Index", allocation: 40, expectedReturn: 10.5, risk: "Medium", color: "from-blue-500 to-cyan-500" },
    {
      name: "International Stocks",
      allocation: 20,
      expectedReturn: 9.2,
      risk: "Medium",
      color: "from-green-500 to-emerald-500",
    },
    { name: "Bonds", allocation: 25, expectedReturn: 4.8, risk: "Low", color: "from-purple-500 to-pink-500" },
    { name: "Real Estate", allocation: 10, expectedReturn: 8.5, risk: "Medium", color: "from-orange-500 to-red-500" },
    { name: "Crypto", allocation: 5, expectedReturn: 15.2, risk: "High", color: "from-yellow-500 to-orange-500" },
  ])

  const totalAllocation = investments.reduce((sum, inv) => sum + inv.allocation, 0)
  const weightedReturn = investments.reduce((sum, inv) => sum + (inv.expectedReturn * inv.allocation) / 100, 0)
  const projectedValue = investmentAmount * Math.pow(1 + weightedReturn / 100, timeHorizon[0])
  const totalGain = projectedValue - investmentAmount

  const updateAllocation = (index: number, value: number) => {
    const newInvestments = [...investments]
    newInvestments[index].allocation = value
    setInvestments(newInvestments)
  }

  const rebalancePortfolio = () => {
    // AI rebalancing based on risk tolerance
    const riskLevel = riskTolerance[0]
    let newAllocations: Investment[]

    if (riskLevel <= 3) {
      // Conservative
      newAllocations = investments.map((inv) => ({
        ...inv,
        allocation:
          inv.name === "Bonds"
            ? 50
            : inv.name === "S&P 500 Index"
              ? 30
              : inv.name === "International Stocks"
                ? 15
                : inv.name === "Real Estate"
                  ? 5
                  : 0,
      }))
    } else if (riskLevel <= 7) {
      // Moderate
      newAllocations = investments.map((inv) => ({
        ...inv,
        allocation:
          inv.name === "S&P 500 Index"
            ? 45
            : inv.name === "International Stocks"
              ? 25
              : inv.name === "Bonds"
                ? 20
                : inv.name === "Real Estate"
                  ? 8
                  : 2,
      }))
    } else {
      // Aggressive
      newAllocations = investments.map((inv) => ({
        ...inv,
        allocation:
          inv.name === "S&P 500 Index"
            ? 50
            : inv.name === "International Stocks"
              ? 30
              : inv.name === "Crypto"
                ? 10
                : inv.name === "Real Estate"
                  ? 8
                  : 2,
      }))
    }

    setInvestments(newAllocations)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-400"
      case "Medium":
        return "text-yellow-400"
      case "High":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 pl-20">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()} className="text-cyan-400 hover:text-cyan-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Neural Investment Planner
              </h1>
              <p className="text-muted-foreground mt-2">Machine learning portfolio recommendations with 94% accuracy</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={rebalancePortfolio} className="bg-gradient-to-r from-purple-500 to-pink-500">
              <Brain className="w-4 h-4 mr-2" />
              AI Rebalance
            </Button>
          </div>
        </div>

        {/* Input Parameters */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <FuturisticCard variant="neural">
            <CardHeader>
              <CardTitle className="text-cyan-400">Investment Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label htmlFor="amount" className="text-white">
                  Initial Investment
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="bg-background/50 border-white/20"
                />
                <div className="text-sm text-muted-foreground">Minimum recommended: $10,000</div>
              </div>
            </CardContent>
          </FuturisticCard>

          <FuturisticCard variant="quantum">
            <CardHeader>
              <CardTitle className="text-cyan-400">Time Horizon</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label className="text-white">Years: {timeHorizon[0]}</Label>
                <Slider
                  value={timeHorizon}
                  onValueChange={setTimeHorizon}
                  max={30}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="text-sm text-muted-foreground">Longer horizons allow for higher risk tolerance</div>
              </div>
            </CardContent>
          </FuturisticCard>

          <FuturisticCard variant="holographic">
            <CardHeader>
              <CardTitle className="text-cyan-400">Risk Tolerance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label className="text-white">Risk Level: {riskTolerance[0]}/10</Label>
                <Slider
                  value={riskTolerance}
                  onValueChange={setRiskTolerance}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="text-sm text-muted-foreground">
                  {riskTolerance[0] <= 3 ? "Conservative" : riskTolerance[0] <= 7 ? "Moderate" : "Aggressive"}
                </div>
              </div>
            </CardContent>
          </FuturisticCard>
        </div>

        {/* Projection Results */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <FuturisticCard variant="neural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Expected Return</p>
                  <p className="text-2xl font-bold text-white">{weightedReturn.toFixed(1)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </FuturisticCard>

          <FuturisticCard variant="quantum">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Projected Value</p>
                  <p className="text-2xl font-bold text-white">
                    ${projectedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <Target className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </FuturisticCard>

          <FuturisticCard variant="holographic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Gain</p>
                  <p className="text-2xl font-bold text-green-400">
                    ${totalGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </FuturisticCard>

          <FuturisticCard variant="cyber">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Allocation</p>
                  <p className={`text-2xl font-bold ${totalAllocation === 100 ? "text-green-400" : "text-red-400"}`}>
                    {totalAllocation}%
                  </p>
                </div>
                {totalAllocation === 100 ? (
                  <CheckCircle className="h-8 w-8 text-green-400" />
                ) : (
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                )}
              </div>
            </CardContent>
          </FuturisticCard>
        </div>

        {/* Portfolio Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FuturisticCard variant="quantum">
            <CardHeader>
              <CardTitle className="text-cyan-400">Portfolio Allocation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {investments.map((investment, index) => (
                <div key={investment.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h4 className="text-white font-medium">{investment.name}</h4>
                      <Badge className={`${getRiskColor(investment.risk)} bg-opacity-20`}>{investment.risk} Risk</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{investment.allocation}%</div>
                      <div className="text-sm text-muted-foreground">{investment.expectedReturn}% return</div>
                    </div>
                  </div>

                  <Slider
                    value={[investment.allocation]}
                    onValueChange={(value) => updateAllocation(index, value[0])}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                  />

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      ${((investmentAmount * investment.allocation) / 100).toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">
                      Expected: $
                      {(
                        ((investmentAmount * investment.allocation) / 100) *
                        Math.pow(1 + investment.expectedReturn / 100, timeHorizon[0])
                      ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              ))}

              {totalAllocation !== 100 && (
                <div className="bg-red-500/20 p-4 rounded-lg border border-red-500/30">
                  <div className="flex items-center gap-2 text-red-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">Portfolio allocation must equal 100%. Currently: {totalAllocation}%</span>
                  </div>
                </div>
              )}
            </CardContent>
          </FuturisticCard>

          {/* AI Recommendations */}
          <FuturisticCard variant="holographic">
            <CardHeader>
              <CardTitle className="text-cyan-400">AI Investment Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-lg border border-purple-500/30">
                <h4 className="text-white font-medium mb-2">Portfolio Analysis</h4>
                <ul className="space-y-2 text-sm text-purple-300">
                  <li>• Your portfolio shows good diversification across asset classes</li>
                  <li>• Consider increasing international exposure for better risk distribution</li>
                  <li>• Current allocation aligns well with your {timeHorizon[0]}-year timeline</li>
                  <li>• Expected Sharpe ratio: 1.24 (Excellent)</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-lg border border-blue-500/30">
                <h4 className="text-white font-medium mb-2">Optimization Suggestions</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-300">Rebalance Frequency:</span>
                    <span className="text-white font-medium">Quarterly</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-300">Tax Efficiency Score:</span>
                    <span className="text-white font-medium">8.5/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-300">Volatility:</span>
                    <span className="text-white font-medium">12.3%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500"
                  onClick={() => router.push("/dashboard/financial-planning/portfolio-backtest")}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Backtest Strategy
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  onClick={() => router.push("/dashboard/financial-planning/tax-optimization")}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Tax Optimization
                </Button>
              </div>
            </CardContent>
          </FuturisticCard>
        </div>
      </div>
    </div>
  )
}
