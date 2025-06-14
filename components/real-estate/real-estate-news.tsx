"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Newspaper, Clock, TrendingUp, TrendingDown, AlertCircle, ExternalLink, Filter } from "lucide-react"
import { ImperialCard } from "@/components/ui/imperial-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface NewsItem {
  id: string
  title: string
  summary: string
  source: string
  timestamp: string
  sentiment: "positive" | "negative" | "neutral"
  impact: "high" | "medium" | "low"
  category: "market" | "policy" | "earnings" | "analysis"
  url: string
}

export function RealEstateNews() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "market" | "policy" | "earnings" | "analysis">("all")
  const [selectedSentiment, setSelectedSentiment] = useState<"all" | "positive" | "negative" | "neutral">("all")

  const mockNews: NewsItem[] = [
    {
      id: "1",
      title: "Federal Reserve Signals Potential Rate Cuts, Boosting Real Estate Outlook",
      summary:
        "Fed officials hint at possible interest rate reductions in Q2, potentially stimulating real estate investment demand and property valuations across major metropolitan areas.",
      source: "Reuters",
      timestamp: "2024-01-19T14:30:00Z",
      sentiment: "positive",
      impact: "high",
      category: "policy",
      url: "#",
    },
    {
      id: "2",
      title: "Commercial Real Estate Faces Headwinds as Remote Work Persists",
      summary:
        "Office occupancy rates remain below pre-pandemic levels, creating challenges for commercial REIT performance and urban property valuations.",
      source: "Wall Street Journal",
      timestamp: "2024-01-19T13:15:00Z",
      sentiment: "negative",
      impact: "medium",
      category: "market",
      url: "#",
    },
    {
      id: "3",
      title: "Residential Property Prices Show Resilience Despite Economic Uncertainty",
      summary:
        "Housing market demonstrates stability with median home prices maintaining growth trajectory, supported by limited inventory and demographic trends.",
      source: "Bloomberg",
      timestamp: "2024-01-19T12:45:00Z",
      sentiment: "positive",
      impact: "medium",
      category: "market",
      url: "#",
    },
    {
      id: "4",
      title: "REIT Earnings Season: Mixed Results Reflect Sector Divergence",
      summary:
        "Q4 earnings reports show strong performance in residential and industrial REITs, while retail and office sectors continue to face challenges.",
      source: "MarketWatch",
      timestamp: "2024-01-19T11:20:00Z",
      sentiment: "neutral",
      impact: "high",
      category: "earnings",
      url: "#",
    },
    {
      id: "5",
      title: "Institutional Investors Increase Allocation to Real Estate Assets",
      summary:
        "Pension funds and sovereign wealth funds boost real estate exposure, seeking inflation hedges and portfolio diversification benefits.",
      source: "Financial Times",
      timestamp: "2024-01-19T10:30:00Z",
      sentiment: "positive",
      impact: "high",
      category: "analysis",
      url: "#",
    },
    {
      id: "6",
      title: "New Zoning Regulations Could Impact Development Projects",
      summary:
        "Municipal authorities introduce stricter environmental and density requirements, potentially affecting future real estate development timelines and costs.",
      source: "Real Estate Weekly",
      timestamp: "2024-01-19T09:15:00Z",
      sentiment: "negative",
      impact: "medium",
      category: "policy",
      url: "#",
    },
  ]

  const filteredNews = mockNews.filter((item) => {
    const categoryMatch = selectedCategory === "all" || item.category === selectedCategory
    const sentimentMatch = selectedSentiment === "all" || item.sentiment === selectedSentiment
    return categoryMatch && sentimentMatch
  })

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-400 bg-green-500/20"
      case "negative":
        return "text-red-400 bg-red-500/20"
      case "neutral":
        return "text-yellow-400 bg-yellow-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-400 bg-red-500/20"
      case "medium":
        return "text-yellow-400 bg-yellow-500/20"
      case "low":
        return "text-green-400 bg-green-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="w-3 h-3" />
      case "negative":
        return <TrendingDown className="w-3 h-3" />
      case "neutral":
        return <AlertCircle className="w-3 h-3" />
      default:
        return <AlertCircle className="w-3 h-3" />
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  const categories = [
    { key: "all", label: "All News" },
    { key: "market", label: "Market" },
    { key: "policy", label: "Policy" },
    { key: "earnings", label: "Earnings" },
    { key: "analysis", label: "Analysis" },
  ]

  const sentiments = [
    { key: "all", label: "All" },
    { key: "positive", label: "Positive" },
    { key: "negative", label: "Negative" },
    { key: "neutral", label: "Neutral" },
  ]

  return (
    <ImperialCard variant="gold" className="h-full">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Market News</h3>
          </div>
          <Badge variant="outline" className="text-xs">
            Live Feed
          </Badge>
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-400 uppercase tracking-wide">Category</span>
          </div>
          <div className="flex gap-1 bg-slate-800 rounded-lg p-1">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key as any)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  selectedCategory === category.key ? "bg-yellow-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="flex gap-1 bg-slate-800 rounded-lg p-1">
            {sentiments.map((sentiment) => (
              <button
                key={sentiment.key}
                onClick={() => setSelectedSentiment(sentiment.key as any)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  selectedSentiment === sentiment.key ? "bg-yellow-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {sentiment.label}
              </button>
            ))}
          </div>
        </div>

        {/* News Feed */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredNews.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors cursor-pointer group"
            >
              <div className="space-y-2">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${getSentimentColor(item.sentiment)}`}>
                      <div className="flex items-center gap-1">
                        {getSentimentIcon(item.sentiment)}
                        <span className="capitalize">{item.sentiment}</span>
                      </div>
                    </Badge>
                    <Badge className={`text-xs ${getImpactColor(item.impact)}`}>{item.impact.toUpperCase()}</Badge>
                  </div>
                  <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Title */}
                <h4 className="text-sm font-semibold text-white leading-tight group-hover:text-yellow-400 transition-colors">
                  {item.title}
                </h4>

                {/* Summary */}
                <p className="text-xs text-gray-400 leading-relaxed">{item.summary}</p>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.source}</span>
                    <Badge variant="outline" className="text-xs capitalize">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatTimeAgo(item.timestamp)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* News Summary */}
        <div className="border-t border-gray-700 pt-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-green-500/10 rounded">
              <div className="text-sm font-bold text-green-400">
                {mockNews.filter((n) => n.sentiment === "positive").length}
              </div>
              <div className="text-xs text-gray-400">Positive</div>
            </div>
            <div className="p-2 bg-yellow-500/10 rounded">
              <div className="text-sm font-bold text-yellow-400">
                {mockNews.filter((n) => n.sentiment === "neutral").length}
              </div>
              <div className="text-xs text-gray-400">Neutral</div>
            </div>
            <div className="p-2 bg-red-500/10 rounded">
              <div className="text-sm font-bold text-red-400">
                {mockNews.filter((n) => n.sentiment === "negative").length}
              </div>
              <div className="text-xs text-gray-400">Negative</div>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <Button variant="outline" size="sm" className="w-full text-xs">
          Refresh Feed
        </Button>
      </div>
    </ImperialCard>
  )
}
