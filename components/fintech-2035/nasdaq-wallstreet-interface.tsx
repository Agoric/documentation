"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  Zap,
  Brain,
  Globe,
  Cpu,
  BarChart3,
  Activity,
  Bitcoin,
  Smartphone,
  Shield,
} from "lucide-react"

interface MarketData {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: string
  marketCap: string
  sector: string
  aiScore: number
}

interface NewsItem {
  id: string
  headline: string
  impact: "high" | "medium" | "low"
  sentiment: "positive" | "negative" | "neutral"
  timestamp: string
}

export function NasdaqWallStreetInterface() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedMarket, setSelectedMarket] = useState("NASDAQ")
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [aiInsights, setAiInsights] = useState<string[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      // Simulate real-time market updates
      updateMarketData()
    }, 2000)

    // Initialize data
    initializeMarketData()
    initializeNews()
    initializeAiInsights()

    return () => clearInterval(timer)
  }, [])

  const initializeMarketData = () => {
    const symbols = [
      { symbol: "AAPL", sector: "Technology", base: 245.67 },
      { symbol: "TSLA", sector: "Automotive", base: 189.34 },
      { symbol: "NVDA", sector: "Semiconductors", base: 567.89 },
      { symbol: "META", sector: "Social Media", base: 334.12 },
      { symbol: "GOOGL", sector: "Technology", base: 156.78 },
      { symbol: "AMZN", sector: "E-commerce", base: 178.45 },
      { symbol: "MSFT", sector: "Technology", base: 423.56 },
      { symbol: "NFLX", sector: "Streaming", base: 456.23 },
    ]

    const data = symbols.map((stock) => ({
      ...stock,
      price: stock.base + (Math.random() - 0.5) * 20,
      change: (Math.random() - 0.5) * 10,
      changePercent: (Math.random() - 0.5) * 5,
      volume: `${(Math.random() * 100 + 10).toFixed(1)}M`,
      marketCap: `${(Math.random() * 2000 + 500).toFixed(0)}B`,
      aiScore: Math.floor(Math.random() * 100),
    }))

    setMarketData(data)
  }

  const updateMarketData = () => {
    setMarketData((prev) =>
      prev.map((stock) => ({
        ...stock,
        price: stock.price + (Math.random() - 0.5) * 2,
        change: stock.change + (Math.random() - 0.5) * 0.5,
        changePercent: stock.changePercent + (Math.random() - 0.5) * 0.2,
        aiScore: Math.max(0, Math.min(100, stock.aiScore + (Math.random() - 0.5) * 10)),
      })),
    )
  }

  const initializeNews = () => {
    const headlines = [
      {
        id: "1",
        headline: "Quantum Computing Breakthrough Revolutionizes Financial Modeling",
        impact: "high" as const,
        sentiment: "positive" as const,
        timestamp: "2035-01-15 09:30:00",
      },
      {
        id: "2",
        headline: "AI-Powered Trading Algorithms Achieve 99.7% Accuracy Rate",
        impact: "high" as const,
        sentiment: "positive" as const,
        timestamp: "2035-01-15 08:45:00",
      },
      {
        id: "3",
        headline: "Global Carbon Credit Market Reaches $2 Trillion Milestone",
        impact: "medium" as const,
        sentiment: "positive" as const,
        timestamp: "2035-01-15 07:20:00",
      },
      {
        id: "4",
        headline: "Neural Interface Trading Platforms Show 300% Efficiency Gain",
        impact: "high" as const,
        sentiment: "positive" as const,
        timestamp: "2035-01-15 06:15:00",
      },
    ]
    setNewsItems(headlines)
  }

  const initializeAiInsights = () => {
    const insights = [
      "Quantum algorithms predict 87% probability of tech sector rally",
      "Neural network identifies emerging biotech opportunities",
      "Sentiment analysis suggests bullish momentum in renewable energy",
      "Cross-market correlation patterns indicate optimal portfolio rebalancing",
      "Predictive models forecast 15% growth in space economy stocks",
    ]
    setAiInsights(insights)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/New_York",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">NASDAQ Wall Street 2035</h1>
              <p className="text-cyan-300">Advanced Fintech Trading Interface</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono text-cyan-300">{formatTime(currentTime)}</div>
            <div className="text-sm text-gray-300">New York Stock Exchange</div>
          </div>
        </div>

        {/* Market Status Bar */}
        <div className="flex items-center space-x-6 p-4 bg-black/30 rounded-lg backdrop-blur-sm border border-cyan-500/30">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-semibold">MARKET OPEN</span>
          </div>
          <div className="text-white">DOW: +1,247.89 (+2.34%)</div>
          <div className="text-white">S&P 500: +89.45 (+1.87%)</div>
          <div className="text-white">NASDAQ: +234.56 (+3.12%)</div>
          <div className="text-cyan-300">VIX: 12.45</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Trading Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Market Data Table */}
          <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Real-Time Market Data</span>
                <Badge variant="outline" className="border-green-400 text-green-400">
                  LIVE
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {marketData.map((stock, index) => (
                  <motion.div
                    key={stock.symbol}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-white font-bold text-lg">{stock.symbol}</div>
                      <div className="text-gray-400 text-sm">{stock.sector}</div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-white font-mono text-lg">${stock.price.toFixed(2)}</div>
                      <div
                        className={`flex items-center space-x-1 ${
                          stock.change >= 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {stock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span className="font-mono">
                          {stock.change >= 0 ? "+" : ""}
                          {stock.change.toFixed(2)}
                        </span>
                        <span className="text-sm">
                          ({stock.changePercent >= 0 ? "+" : ""}
                          {stock.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                      <div className="text-gray-400 text-sm">Vol: {stock.volume}</div>
                      <div className="flex items-center space-x-2">
                        <Brain className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-400 text-sm">{stock.aiScore}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Holographic Chart Visualization */}
          <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Holographic Market Visualization</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg border border-cyan-500/30 overflow-hidden">
                {/* Animated Grid */}
                <div className="absolute inset-0 opacity-30">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-px bg-cyan-400"
                      style={{ top: `${i * 10}%`, width: "100%" }}
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                    />
                  ))}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-px bg-cyan-400"
                      style={{ left: `${i * 8.33}%`, height: "100%" }}
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 }}
                    />
                  ))}
                </div>

                {/* Floating Data Points */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      className="text-4xl font-bold text-cyan-300 mb-2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      NASDAQ 2035
                    </motion.div>
                    <div className="text-green-400 text-xl">+3.47% ↗</div>
                    <div className="text-gray-300 text-sm mt-2">Quantum-Enhanced Trading</div>
                  </div>
                </div>

                {/* Floating Particles */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Insights */}
          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-300 flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>AI Market Intelligence</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/30"
                  >
                    <div className="text-purple-200 text-sm">{insight}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Breaking News */}
          <Card className="bg-black/40 border-orange-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-orange-300 flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Market News 2035</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {newsItems.map((news, index) => (
                  <motion.div
                    key={news.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          news.impact === "high"
                            ? "border-red-400 text-red-400"
                            : news.impact === "medium"
                              ? "border-yellow-400 text-yellow-400"
                              : "border-green-400 text-green-400"
                        }`}
                      >
                        {news.impact.toUpperCase()}
                      </Badge>
                      <div className="text-xs text-gray-400">{new Date(news.timestamp).toLocaleTimeString()}</div>
                    </div>
                    <div className="text-white text-sm">{news.headline}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Future Tech Indicators */}
          <Card className="bg-black/40 border-green-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center space-x-2">
                <Cpu className="w-5 h-5" />
                <span>Future Tech Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bitcoin className="w-4 h-4 text-orange-400" />
                    <span className="text-white text-sm">Quantum Crypto</span>
                  </div>
                  <span className="text-orange-400 font-mono">$127,456</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="w-4 h-4 text-blue-400" />
                    <span className="text-white text-sm">Neural Trading</span>
                  </div>
                  <span className="text-green-400">+847%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-purple-400" />
                    <span className="text-white text-sm">Quantum Security</span>
                  </div>
                  <span className="text-purple-400">99.99%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span className="text-white text-sm">Global Carbon</span>
                  </div>
                  <span className="text-cyan-400">$2.1T</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
