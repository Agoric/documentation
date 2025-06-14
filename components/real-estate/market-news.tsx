"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingUp, AlertCircle, Globe } from "lucide-react"

export function MarketNews() {
  const news = [
    {
      id: 1,
      headline: "Federal Reserve Signals Rate Cut, Real Estate Markets Rally",
      source: "Reuters",
      time: "2 min ago",
      impact: "BULLISH",
      category: "MONETARY_POLICY",
    },
    {
      id: 2,
      headline: "Manhattan Commercial Real Estate Sees 15% Price Increase",
      source: "Bloomberg",
      time: "15 min ago",
      impact: "BULLISH",
      category: "MARKET_DATA",
    },
    {
      id: 3,
      headline: "New Housing Regulations May Impact Investment Properties",
      source: "WSJ",
      time: "1 hour ago",
      impact: "BEARISH",
      category: "REGULATION",
    },
    {
      id: 4,
      headline: "REIT Sector Outperforms S&P 500 for Third Consecutive Quarter",
      source: "MarketWatch",
      time: "2 hours ago",
      impact: "BULLISH",
      category: "SECTOR_NEWS",
    },
    {
      id: 5,
      headline: "Institutional Investors Increase Real Estate Allocations",
      source: "Financial Times",
      time: "3 hours ago",
      impact: "BULLISH",
      category: "INSTITUTIONAL",
    },
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "BULLISH":
        return "border-green-500 text-green-400"
      case "BEARISH":
        return "border-red-500 text-red-400"
      default:
        return "border-gray-500 text-gray-400"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "MONETARY_POLICY":
        return <TrendingUp className="h-3 w-3" />
      case "REGULATION":
        return <AlertCircle className="h-3 w-3" />
      case "MARKET_DATA":
        return <Globe className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-amber-400 text-sm flex items-center justify-between">
          <div className="flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            MARKET NEWS
          </div>
          <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
            LIVE
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {news.map((item) => (
            <div key={item.id} className="border-b border-gray-800 pb-3 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(item.category)}
                  <Badge variant="outline" className={`text-xs ${getImpactColor(item.impact)}`}>
                    {item.impact}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>{item.time}</span>
                </div>
              </div>

              <h4 className="text-sm text-white font-medium mb-1 leading-tight">{item.headline}</h4>

              <div className="flex justify-between items-center">
                <span className="text-xs text-blue-400">{item.source}</span>
                <span className="text-xs text-gray-500">{item.category.replace("_", " ")}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-700">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Market Sentiment:</span>
            <span className="text-green-400 font-medium">BULLISH (73%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
