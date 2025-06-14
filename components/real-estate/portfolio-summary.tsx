"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, PieChart } from "lucide-react"

export function PortfolioSummary() {
  const portfolio = {
    totalValue: 12500000,
    dayChange: 234500,
    dayChangePercent: 1.91,
    totalReturn: 1850000,
    totalReturnPercent: 17.4,
    positions: 8,
    cash: 2500000,
  }

  const holdings = [
    { symbol: "REIT-NYC-001", quantity: 2, value: 5000000, change: 2.34 },
    { symbol: "REIT-LA-002", quantity: 1, value: 3200000, change: -1.23 },
    { symbol: "REIT-CHI-003", quantity: 1, value: 1800000, change: 4.56 },
    { symbol: "CASH", quantity: 1, value: 2500000, change: 0 },
  ]

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-amber-400 text-sm flex items-center">
          <PieChart className="h-4 w-4 mr-2" />
          PORTFOLIO
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Portfolio Summary */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">TOTAL VALUE</span>
            <span className="text-lg font-bold text-white">${portfolio.totalValue.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">DAY P&L</span>
            <div className={`flex items-center ${portfolio.dayChange >= 0 ? "text-green-400" : "text-red-400"}`}>
              {portfolio.dayChange >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              <span className="text-sm font-medium">
                ${Math.abs(portfolio.dayChange).toLocaleString()} ({portfolio.dayChangePercent >= 0 ? "+" : ""}
                {portfolio.dayChangePercent}%)
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">TOTAL RETURN</span>
            <div className="text-green-400">
              <span className="text-sm font-medium">
                +${portfolio.totalReturn.toLocaleString()} (+{portfolio.totalReturnPercent}%)
              </span>
            </div>
          </div>
        </div>

        {/* Holdings */}
        <div className="space-y-2">
          <div className="text-xs text-gray-400 font-medium border-b border-gray-700 pb-1">
            HOLDINGS ({portfolio.positions})
          </div>

          {holdings.map((holding) => (
            <div key={holding.symbol} className="flex justify-between items-center py-1">
              <div>
                <span className="text-xs text-blue-400">{holding.symbol}</span>
                <span className="text-xs text-gray-400 ml-2">x{holding.quantity}</span>
              </div>
              <div className="text-right">
                <div className="text-xs text-white">${holding.value.toLocaleString()}</div>
                {holding.change !== 0 && (
                  <div className={`text-xs ${holding.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {holding.change >= 0 ? "+" : ""}
                    {holding.change}%
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-700">
          <div className="text-center">
            <div className="text-xs text-gray-400">BUYING POWER</div>
            <div className="text-sm text-green-400 font-mono">${portfolio.cash.toLocaleString()}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400">POSITIONS</div>
            <div className="text-sm text-white font-mono">{portfolio.positions}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
