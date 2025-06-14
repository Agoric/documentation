"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, X } from "lucide-react"

export function TradingPositions() {
  const positions = [
    {
      symbol: "PROP-NYC-001",
      name: "Manhattan Penthouse",
      quantity: 2,
      avgPrice: 2450000,
      currentPrice: 2500000,
      pnl: 100000,
      pnlPercent: 2.04,
      side: "long",
    },
    {
      symbol: "PROP-LA-045",
      name: "Beverly Hills Estate",
      quantity: 1,
      avgPrice: 8600000,
      currentPrice: 8750000,
      pnl: 150000,
      pnlPercent: 1.74,
      side: "long",
    },
    {
      symbol: "PROP-MIA-023",
      name: "South Beach Condo",
      quantity: 3,
      avgPrice: 1220000,
      currentPrice: 1200000,
      pnl: -60000,
      pnlPercent: -1.64,
      side: "long",
    },
  ]

  const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0)
  const totalValue = positions.reduce((sum, pos) => sum + pos.currentPrice * pos.quantity, 0)

  return (
    <Card className="bg-gray-900 border-green-800 h-64">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-green-300 text-sm">POSITIONS</CardTitle>
          <div className="text-xs">
            <div className="text-gray-400">Total P&L</div>
            <div className={`font-bold ${totalPnL >= 0 ? "text-green-400" : "text-red-400"}`}>
              {totalPnL >= 0 ? "+" : ""}${totalPnL.toLocaleString()}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="space-y-0">
          {/* Header */}
          <div className="grid grid-cols-12 gap-1 p-2 text-xs text-gray-400 border-b border-green-800 bg-gray-950">
            <div className="col-span-4">SYMBOL</div>
            <div className="col-span-2 text-center">QTY</div>
            <div className="col-span-3 text-right">P&L</div>
            <div className="col-span-2 text-right">%</div>
            <div className="col-span-1"></div>
          </div>

          {/* Position Rows */}
          {positions.map((position, index) => (
            <div key={index} className="grid grid-cols-12 gap-1 p-2 text-xs border-b border-gray-800 hover:bg-gray-800">
              <div className="col-span-4">
                <div className="text-green-300 font-bold">{position.symbol}</div>
                <div className="text-gray-400 text-xs truncate">{position.name}</div>
              </div>

              <div className="col-span-2 text-center">
                <div className="text-white">{position.quantity}</div>
                <Badge variant="outline" className="text-xs border-blue-600 text-blue-400">
                  {position.side.toUpperCase()}
                </Badge>
              </div>

              <div className="col-span-3 text-right">
                <div className={`font-bold ${position.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {position.pnl >= 0 ? "+" : ""}${position.pnl.toLocaleString()}
                </div>
                <div className="text-gray-400 text-xs">Avg: ${(position.avgPrice / 1000000).toFixed(2)}M</div>
              </div>

              <div className="col-span-2 text-right">
                <div className={`font-bold ${position.pnlPercent >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {position.pnlPercent >= 0 ? "+" : ""}
                  {position.pnlPercent.toFixed(2)}%
                </div>
                {position.pnlPercent >= 0 ? (
                  <TrendingUp className="w-3 h-3 text-green-400 ml-auto" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-400 ml-auto" />
                )}
              </div>

              <div className="col-span-1">
                <Button size="sm" variant="ghost" className="h-4 w-4 p-0 text-red-400 hover:text-red-300">
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="p-2 border-t border-green-800 bg-gray-950">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-gray-400">Portfolio Value</div>
              <div className="text-white font-bold">${(totalValue / 1000000).toFixed(1)}M</div>
            </div>
            <div>
              <div className="text-gray-400">Day P&L</div>
              <div className={`font-bold ${totalPnL >= 0 ? "text-green-400" : "text-red-400"}`}>
                {totalPnL >= 0 ? "+" : ""}${totalPnL.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
