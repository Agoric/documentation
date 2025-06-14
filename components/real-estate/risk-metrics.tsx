"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Shield } from "lucide-react"

export function RiskMetrics() {
  const riskData = {
    portfolioRisk: "MODERATE",
    riskScore: 6.2,
    beta: 1.15,
    sharpeRatio: 1.34,
    maxDrawdown: -8.7,
    volatility: 12.4,
    var95: -145000,
    diversificationScore: 7.8,
  }

  const getRiskColor = (score: number) => {
    if (score <= 3) return "text-green-400"
    if (score <= 7) return "text-amber-400"
    return "text-red-400"
  }

  const getRiskLevel = (score: number) => {
    if (score <= 3) return "LOW"
    if (score <= 7) return "MODERATE"
    return "HIGH"
  }

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-amber-400 text-sm flex items-center">
          <Shield className="h-4 w-4 mr-2" />
          RISK METRICS
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Risk Score */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">RISK LEVEL</span>
            <span className={`text-sm font-bold ${getRiskColor(riskData.riskScore)}`}>
              {getRiskLevel(riskData.riskScore)}
            </span>
          </div>
          <Progress value={(riskData.riskScore / 10) * 100} className="h-2" />
          <div className="text-xs text-gray-400 text-center">Score: {riskData.riskScore}/10</div>
        </div>

        {/* Key Metrics */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-xs text-gray-400">BETA</span>
            <span className="text-xs text-white font-mono">{riskData.beta}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-xs text-gray-400">SHARPE RATIO</span>
            <span className="text-xs text-green-400 font-mono">{riskData.sharpeRatio}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-xs text-gray-400">MAX DRAWDOWN</span>
            <span className="text-xs text-red-400 font-mono">{riskData.maxDrawdown}%</span>
          </div>

          <div className="flex justify-between">
            <span className="text-xs text-gray-400">VOLATILITY</span>
            <span className="text-xs text-amber-400 font-mono">{riskData.volatility}%</span>
          </div>

          <div className="flex justify-between">
            <span className="text-xs text-gray-400">VaR (95%)</span>
            <span className="text-xs text-red-400 font-mono">${riskData.var95.toLocaleString()}</span>
          </div>
        </div>

        {/* Diversification */}
        <div className="pt-2 border-t border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400">DIVERSIFICATION</span>
            <span className="text-xs text-green-400 font-mono">{riskData.diversificationScore}/10</span>
          </div>
          <Progress value={(riskData.diversificationScore / 10) * 100} className="h-2" />
        </div>

        {/* Risk Alerts */}
        <div className="pt-2 border-t border-gray-700">
          <div className="flex items-center space-x-2 text-xs">
            <AlertTriangle className="h-3 w-3 text-amber-400" />
            <span className="text-amber-400">Concentration Risk: NYC Properties</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
