"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingUp, AlertTriangle, Building } from "lucide-react"

export function MarketNewsTerminal() {
  const newsItems = [
    {
      time: "14:32",
      headline: "Fed Signals Potential Rate Cut in Q2",
      impact: "high",
      category: "monetary",
      sentiment: "positive",
    },
    {
      time: "14:15",
      headline: "Commercial Real Estate Sees 3.2% Growth",
      impact: "medium",
      category: "commercial",
      sentiment: "positive",
    },
    {
      time: "13:58",
      headline: "Housing Inventory Drops to 2.1 Month Supply",
      impact: "high",
      category: "residential",
      sentiment: "neutral",
    },
    {
      time: "13:45",
      headline: "REIT Sector Outperforms Broader Market",
      impact: "medium",
      category: "reit",
      sentiment: "positive",
    },
    {
      time: "13:30",
      headline: "Construction Costs Rise 2.8% YoY",
      impact: "medium",
      category: "construction",
      sentiment: "negative",
    },
    {
      time: "13:12",
      headline: "Mortgage Applications Down 5.2%",
      impact: "high",
      category: "mortgage",
      sentiment: "negative",
    },
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "border-red-600 text-red-400"
      case "medium":
        return "border-yellow-600 text-yellow-400"
      case "low":
        return "border-green-600 text-green-400"
      default:
        return "border-gray-600 text-gray-400"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="w-3 h-3 text-green-400" />
      case "negative":
        return <AlertTriangle className="w-3 h-3 text-red-400" />
      default:
        return <Building className="w-3 h-3 text-gray-400" />
    }
  }

  return (
    <Card className="bg-gray-900 border-green-800 h-48">
      <CardHeader className="pb-2">
        <CardTitle className="text-green-300 text-sm">MARKET NEWS</CardTitle>
      </CardHeader>

      <CardContent className="p-2">
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {newsItems.map((news, index) => (
            <div key={index} className="border-b border-gray-800 pb-2 last:border-b-0">
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400 font-mono">{news.time}</span>
                  <Badge variant="outline" className={`text-xs ${getImpactColor(news.impact)}`}>
                    {news.impact.toUpperCase()}
                  </Badge>
                </div>
                {getSentimentIcon(news.sentiment)}
              </div>

              <div className="text-xs text-white leading-relaxed hover:text-green-300 cursor-pointer">
                {news.headline}
              </div>

              <div className="mt-1">
                <Badge variant="outline" className="text-xs border-blue-600 text-blue-400">
                  {news.category.toUpperCase()}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
