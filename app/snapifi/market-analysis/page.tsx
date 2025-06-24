"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Globe,
  Zap,
  Brain,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
} from "lucide-react"

export default function MarketAnalysisPage() {
  const [marketData, setMarketData] = useState({
    sp500: { value: 4756.5, change: 1.2, trend: "up" },
    nasdaq: { value: 14845.3, change: -0.8, trend: "down" },
    dow: { value: 37689.54, change: 0.5, trend: "up" },
    vix: { value: 13.45, change: -2.1, trend: "down" },
  })

  const [cryptoData, setCryptoData] = useState({
    bitcoin: { value: 43250.75, change: 3.4, trend: "up" },
    ethereum: { value: 2567.89, change: 2.1, trend: "up" },
    solana: { value: 98.45, change: -1.2, trend: "down" },
  })

  const sectorPerformance = [
    { name: "Technology", performance: 12.4, trend: "up", color: "text-green-600" },
    { name: "Healthcare", performance: 8.7, trend: "up", color: "text-green-600" },
    { name: "Financial", performance: 6.2, trend: "up", color: "text-green-600" },
    { name: "Energy", performance: -2.1, trend: "down", color: "text-red-600" },
    { name: "Real Estate", performance: 15.3, trend: "up", color: "text-green-600" },
    { name: "Consumer", performance: 4.8, trend: "up", color: "text-green-600" },
  ]

  const aiInsights = [
    {
      type: "opportunity",
      title: "Tech Sector Momentum",
      description: "AI analysis shows 78% probability of continued tech sector growth over next 30 days",
      confidence: 78,
      timeframe: "30 days",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      type: "risk",
      title: "Interest Rate Sensitivity",
      description: "Rising rate environment may impact growth stocks. Consider defensive positioning",
      confidence: 65,
      timeframe: "60 days",
      icon: AlertTriangle,
      color: "text-yellow-600",
    },
    {
      type: "trend",
      title: "RWA Token Adoption",
      description: "Real-world asset tokenization showing accelerating institutional adoption",
      confidence: 82,
      timeframe: "90 days",
      icon: Target,
      color: "text-blue-600",
    },
    {
      type: "alert",
      title: "Volatility Spike Expected",
      description: "Quantum models predict increased volatility around earnings season",
      confidence: 71,
      timeframe: "14 days",
      icon: Activity,
      color: "text-orange-600",
    },
  ]

  const globalMarkets = [
    { name: "S&P 500", value: "4,756.50", change: "+1.2%", region: "US" },
    { name: "FTSE 100", value: "7,634.20", change: "+0.8%", region: "UK" },
    { name: "Nikkei 225", value: "33,288.29", change: "-0.3%", region: "Japan" },
    { name: "DAX", value: "16,794.41", change: "+1.5%", region: "Germany" },
    { name: "Shanghai", value: "2,974.93", change: "+0.6%", region: "China" },
    { name: "BSE Sensex", value: "72,240.26", change: "+2.1%", region: "India" },
  ]

  const quantumPredictions = [
    {
      asset: "SPY",
      prediction: "Bullish",
      probability: 73,
      target: "$485",
      timeframe: "3 months",
      factors: ["Earnings growth", "Fed policy", "Technical momentum"],
    },
    {
      asset: "QQQ",
      prediction: "Neutral",
      probability: 58,
      target: "$395",
      timeframe: "3 months",
      factors: ["Valuation concerns", "Rate sensitivity", "Innovation cycle"],
    },
    {
      asset: "RWA Tokens",
      prediction: "Bullish",
      probability: 84,
      target: "+25%",
      timeframe: "6 months",
      factors: ["Institutional adoption", "Regulatory clarity", "Tokenization trend"],
    },
  ]

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setMarketData((prev) => ({
        ...prev,
        sp500: {
          ...prev.sp500,
          value: prev.sp500.value + (Math.random() - 0.5) * 10,
          change: prev.sp500.change + (Math.random() - 0.5) * 0.2,
        },
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? TrendingUp : TrendingDown
  }

  const getTrendColor = (change: number) => {
    return change >= 0 ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Market Analysis</h1>
          <p className="text-muted-foreground">
            Real-time market data with quantum-powered predictions and AI insights
          </p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">
          <Activity className="h-3 w-3 mr-1" />
          Live Data
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sectors">Sectors</TabsTrigger>
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Major Indices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Major Indices</span>
              </CardTitle>
              <CardDescription>Real-time market data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-lg font-bold">{marketData.sp500.value.toFixed(2)}</div>
                  <p className="text-sm text-muted-foreground">S&P 500</p>
                  <div className={`text-sm font-bold ${getTrendColor(marketData.sp500.change)}`}>
                    {marketData.sp500.change >= 0 ? "+" : ""}
                    {marketData.sp500.change.toFixed(2)}%
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-lg font-bold">{marketData.nasdaq.value.toFixed(2)}</div>
                  <p className="text-sm text-muted-foreground">NASDAQ</p>
                  <div className={`text-sm font-bold ${getTrendColor(marketData.nasdaq.change)}`}>
                    {marketData.nasdaq.change >= 0 ? "+" : ""}
                    {marketData.nasdaq.change.toFixed(2)}%
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-lg font-bold">{marketData.dow.value.toFixed(2)}</div>
                  <p className="text-sm text-muted-foreground">Dow Jones</p>
                  <div className={`text-sm font-bold ${getTrendColor(marketData.dow.change)}`}>
                    {marketData.dow.change >= 0 ? "+" : ""}
                    {marketData.dow.change.toFixed(2)}%
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-lg font-bold">{marketData.vix.value.toFixed(2)}</div>
                  <p className="text-sm text-muted-foreground">VIX</p>
                  <div className={`text-sm font-bold ${getTrendColor(marketData.vix.change)}`}>
                    {marketData.vix.change >= 0 ? "+" : ""}
                    {marketData.vix.change.toFixed(2)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cryptocurrency */}
          <Card>
            <CardHeader>
              <CardTitle>Cryptocurrency Markets</CardTitle>
              <CardDescription>Digital asset performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-lg font-bold">${cryptoData.bitcoin.value.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">Bitcoin</p>
                  <div className={`text-sm font-bold ${getTrendColor(cryptoData.bitcoin.change)}`}>
                    {cryptoData.bitcoin.change >= 0 ? "+" : ""}
                    {cryptoData.bitcoin.change.toFixed(2)}%
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-lg font-bold">${cryptoData.ethereum.value.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">Ethereum</p>
                  <div className={`text-sm font-bold ${getTrendColor(cryptoData.ethereum.change)}`}>
                    {cryptoData.ethereum.change >= 0 ? "+" : ""}
                    {cryptoData.ethereum.change.toFixed(2)}%
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-lg font-bold">${cryptoData.solana.value.toFixed(2)}</div>
                  <p className="text-sm text-muted-foreground">Solana</p>
                  <div className={`text-sm font-bold ${getTrendColor(cryptoData.solana.change)}`}>
                    {cryptoData.solana.change >= 0 ? "+" : ""}
                    {cryptoData.solana.change.toFixed(2)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Sentiment */}
          <Card>
            <CardHeader>
              <CardTitle>Market Sentiment</CardTitle>
              <CardDescription>AI-powered sentiment analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-green-600">Bullish</div>
                  <p className="text-sm text-green-800">Overall Sentiment</p>
                </div>
                <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-blue-600">74%</div>
                  <p className="text-sm text-blue-800">AI Confidence</p>
                </div>
                <div className="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-purple-600">Low</div>
                  <p className="text-sm text-purple-800">Volatility Risk</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sectors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sector Performance</CardTitle>
              <CardDescription>YTD performance by sector</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sectorPerformance.map((sector, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${sector.performance >= 0 ? "bg-green-100" : "bg-red-100"}`}>
                        {sector.performance >= 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <span className="font-medium">{sector.name}</span>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${sector.color}`}>
                        {sector.performance >= 0 ? "+" : ""}
                        {sector.performance}%
                      </div>
                      <p className="text-xs text-muted-foreground">YTD</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="global" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Global Markets</span>
              </CardTitle>
              <CardDescription>International market performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {globalMarkets.map((market, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{market.name}</h4>
                        <p className="text-sm text-muted-foreground">{market.region}</p>
                      </div>
                      <Badge variant="outline">{market.region}</Badge>
                    </div>
                    <div className="text-lg font-bold">{market.value}</div>
                    <div
                      className={`text-sm font-bold ${market.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                    >
                      {market.change}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Quantum Predictions</span>
              </CardTitle>
              <CardDescription>AI-powered market forecasts with probability analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {quantumPredictions.map((pred, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-lg">{pred.asset}</h4>
                        <p className="text-sm text-muted-foreground">{pred.timeframe} outlook</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={
                            pred.prediction === "Bullish"
                              ? "bg-green-100 text-green-800"
                              : pred.prediction === "Bearish"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {pred.prediction}
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-1">Target: {pred.target}</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Confidence Level</span>
                        <span>{pred.probability}%</span>
                      </div>
                      <Progress value={pred.probability} className="h-2" />
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium">Key Factors:</p>
                      <div className="flex flex-wrap gap-1">
                        {pred.factors.map((factor, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiInsights.map((insight, index) => {
              const IconComponent = insight.icon
              return (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <IconComponent className={`h-5 w-5 ${insight.color}`} />
                        <span>{insight.title}</span>
                      </CardTitle>
                      <Badge variant="outline">{insight.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{insight.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Confidence</span>
                        <span>{insight.confidence}%</span>
                      </div>
                      <Progress value={insight.confidence} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{insight.timeframe}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
