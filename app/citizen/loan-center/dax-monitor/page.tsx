"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, TrendingUp, TrendingDown, Globe, BarChart3, Activity, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DAXMonitorPage() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Mock DAX data - in real implementation, this would come from live API
  const daxData = {
    currentIndex: 17234.56,
    change: 145.23,
    changePercent: 0.85,
    volume: "2.4B EUR",
    lastUpdate: currentTime.toLocaleTimeString(),
    marketStatus: "Open", // Open, Closed, Pre-Market, After-Hours
  }

  const bondImpactData = [
    {
      bondType: "FHA 50-Year Bond",
      currentSpread: 0.25,
      daxCorrelation: 0.78,
      impactLevel: "Medium",
      rateAdjustment: "+0.02%",
      color: "from-blue-500 to-cyan-500",
    },
    {
      bondType: "VA 50-Year Bond",
      currentSpread: 0.2,
      daxCorrelation: 0.82,
      impactLevel: "High",
      rateAdjustment: "+0.03%",
      color: "from-green-500 to-emerald-500",
    },
    {
      bondType: "USDA 50-Year Rural Bond",
      currentSpread: 0.15,
      daxCorrelation: 0.65,
      impactLevel: "Low",
      rateAdjustment: "+0.01%",
      color: "from-purple-500 to-pink-500",
    },
    {
      bondType: "SBA 50-Year Business Bond",
      currentSpread: 0.35,
      daxCorrelation: 0.89,
      impactLevel: "Very High",
      rateAdjustment: "+0.04%",
      color: "from-orange-500 to-red-500",
    },
  ]

  const marketNews = [
    {
      time: "09:15",
      headline: "DAX opens higher on strong manufacturing data",
      impact: "Positive",
      bondEffect: "Slight rate increase expected",
    },
    {
      time: "08:45",
      headline: "European Central Bank maintains steady policy",
      impact: "Neutral",
      bondEffect: "Minimal impact on spreads",
    },
    {
      time: "08:30",
      headline: "German corporate bonds show resilience",
      impact: "Positive",
      bondEffect: "Favorable for bond pricing",
    },
    {
      time: "08:00",
      headline: "Global markets react to economic indicators",
      impact: "Mixed",
      bondEffect: "Monitoring for volatility",
    },
  ]

  const historicalData = [
    { date: "2024-01-26", index: 17089.33, spread: 0.23 },
    { date: "2024-01-25", index: 17156.78, spread: 0.24 },
    { date: "2024-01-24", index: 17201.45, spread: 0.25 },
    { date: "2024-01-23", index: 17134.67, spread: 0.22 },
    { date: "2024-01-22", index: 17089.12, spread: 0.21 },
    { date: "2024-01-19", index: 17234.56, spread: 0.25 },
    { date: "2024-01-18", index: 17298.34, spread: 0.26 },
  ]

  const getImpactColor = (level: string) => {
    switch (level) {
      case "Very High":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "High":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getNewsImpactColor = (impact: string) => {
    switch (impact) {
      case "Positive":
        return "text-green-400"
      case "Negative":
        return "text-red-400"
      case "Neutral":
        return "text-blue-400"
      case "Mixed":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-blue-500/30 text-blue-300 bg-transparent hover:bg-blue-500/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Loan Center
          </Button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              DAX Market Monitor
            </h1>
            <p className="text-blue-200 mt-2">
              Real-time German corporate bond market conditions affecting your 50-year bond rates
            </p>
          </div>
        </div>

        {/* Live DAX Data */}
        <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-blue-400" />
                <CardTitle className="text-white">DAX 40 Index</CardTitle>
                <Badge
                  className={`${daxData.marketStatus === "Open" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}`}
                >
                  {daxData.marketStatus}
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-300">Last Update: {daxData.lastUpdate}</div>
                <div className="text-xs text-blue-400">Frankfurt Stock Exchange</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{daxData.currentIndex.toLocaleString()}</div>
                <div className="text-sm text-blue-300">Current Index</div>
              </div>
              <div className="text-center">
                <div
                  className={`text-3xl font-bold flex items-center justify-center gap-2 ${
                    daxData.change >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {daxData.change >= 0 ? <TrendingUp className="h-6 w-6" /> : <TrendingDown className="h-6 w-6" />}
                  {daxData.change >= 0 ? "+" : ""}
                  {daxData.change.toFixed(2)}
                </div>
                <div className="text-sm text-blue-300">Points Change</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${daxData.changePercent >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {daxData.changePercent >= 0 ? "+" : ""}
                  {daxData.changePercent.toFixed(2)}%
                </div>
                <div className="text-sm text-blue-300">Percentage Change</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{daxData.volume}</div>
                <div className="text-sm text-blue-300">Trading Volume</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="bond-impact" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-blue-900/30 backdrop-blur-sm">
            <TabsTrigger value="bond-impact">Bond Impact</TabsTrigger>
            <TabsTrigger value="market-news">Market News</TabsTrigger>
            <TabsTrigger value="historical">Historical Data</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="bond-impact" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">DAX Impact on Bond Rates</CardTitle>
                <CardDescription className="text-blue-200">
                  How current DAX conditions are affecting your 50-year government bond rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {bondImpactData.map((bond, index) => (
                    <Card key={index} className="bg-blue-800/30 border-blue-500/30">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-white">{bond.bondType}</h4>
                          <Badge className={getImpactColor(bond.impactLevel)}>{bond.impactLevel} Impact</Badge>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-blue-300">Current Spread:</span>
                            <span className="text-white font-semibold">{bond.currentSpread}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-300">DAX Correlation:</span>
                            <span className="text-white">{(bond.daxCorrelation * 100).toFixed(0)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-300">Rate Adjustment:</span>
                            <span
                              className={`font-semibold ${
                                bond.rateAdjustment.startsWith("+") ? "text-red-400" : "text-green-400"
                              }`}
                            >
                              {bond.rateAdjustment}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="text-sm text-blue-300 mb-2">DAX Sensitivity</div>
                          <div className="w-full bg-blue-700 rounded-full h-2">
                            <div
                              className={`bg-gradient-to-r ${bond.color} h-2 rounded-full`}
                              style={{ width: `${bond.daxCorrelation * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rate Impact Summary */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Today's Rate Impact Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">+0.02%</div>
                    <div className="text-sm text-green-300">Average Rate Increase</div>
                    <div className="text-xs text-blue-300 mt-1">Due to DAX gains</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">0.78</div>
                    <div className="text-sm text-blue-300">Average Correlation</div>
                    <div className="text-xs text-blue-300 mt-1">DAX to bond rates</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">Medium</div>
                    <div className="text-sm text-yellow-300">Overall Impact</div>
                    <div className="text-xs text-blue-300 mt-1">Market volatility level</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market-news" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-400" />
                  Market News & Updates
                </CardTitle>
                <CardDescription className="text-blue-200">
                  Latest news affecting DAX and bond market conditions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketNews.map((news, index) => (
                    <div key={index} className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{news.time}</Badge>
                          <Badge
                            className={`${
                              news.impact === "Positive"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : news.impact === "Negative"
                                  ? "bg-red-500/20 text-red-400 border-red-500/30"
                                  : news.impact === "Neutral"
                                    ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                    : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            }`}
                          >
                            {news.impact}
                          </Badge>
                        </div>
                      </div>
                      <h4 className="font-medium text-white mb-2">{news.headline}</h4>
                      <div className="text-sm text-blue-200">
                        <span className="text-blue-300">Bond Impact: </span>
                        <span className={getNewsImpactColor(news.impact)}>{news.bondEffect}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Alerts */}
            <Card className="bg-gradient-to-br from-yellow-900/50 to-blue-900/30 backdrop-blur-sm border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                  Market Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-yellow-800/30 p-3 rounded-lg border border-yellow-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-yellow-400 font-medium">Moderate Volatility Alert</span>
                    </div>
                    <p className="text-yellow-200 text-sm">
                      DAX showing increased volatility. Bond spreads may fluctuate by ±0.05% today.
                    </p>
                  </div>

                  <div className="bg-blue-800/30 p-3 rounded-lg border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-blue-400 font-medium">Rate Lock Recommendation</span>
                    </div>
                    <p className="text-blue-200 text-sm">
                      Consider locking rates if applying today. Market conditions favor current pricing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historical" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">7-Day Historical Data</CardTitle>
                <CardDescription className="text-blue-200">
                  DAX index performance and corresponding bond spread changes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-blue-500/20">
                        <th className="text-left text-blue-300 p-3">Date</th>
                        <th className="text-center text-blue-300 p-3">DAX Index</th>
                        <th className="text-center text-blue-300 p-3">Daily Change</th>
                        <th className="text-center text-blue-300 p-3">Bond Spread</th>
                        <th className="text-center text-blue-300 p-3">Spread Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historicalData.map((day, index) => {
                        const prevDay = historicalData[index + 1]
                        const indexChange = prevDay ? day.index - prevDay.index : 0
                        const spreadChange = prevDay ? day.spread - prevDay.spread : 0

                        return (
                          <tr key={day.date} className="border-b border-blue-500/10">
                            <td className="p-3 text-white">{day.date}</td>
                            <td className="text-center p-3 text-white">{day.index.toLocaleString()}</td>
                            <td className={`text-center p-3 ${indexChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                              {indexChange >= 0 ? "+" : ""}
                              {indexChange.toFixed(2)}
                            </td>
                            <td className="text-center p-3 text-white">{day.spread.toFixed(2)}%</td>
                            <td className={`text-center p-3 ${spreadChange >= 0 ? "text-red-400" : "text-green-400"}`}>
                              {spreadChange >= 0 ? "+" : ""}
                              {spreadChange.toFixed(3)}%
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Historical Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-green-900/50 to-blue-900/30 backdrop-blur-sm border-green-500/20">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white">+2.1%</div>
                  <div className="text-sm text-green-300">7-Day DAX Gain</div>
                  <div className="text-xs text-blue-300 mt-1">Strong performance</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white">0.23%</div>
                  <div className="text-sm text-blue-300">Average Spread</div>
                  <div className="text-xs text-blue-300 mt-1">7-day average</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/30 backdrop-blur-sm border-purple-500/20">
                <CardContent className="p-6 text-center">
                  <Activity className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white">Low</div>
                  <div className="text-sm text-purple-300">Volatility Level</div>
                  <div className="text-xs text-blue-300 mt-1">Stable conditions</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">Market Analysis & Insights</CardTitle>
                <CardDescription className="text-blue-200">
                  Professional analysis of DAX conditions and bond market implications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-white mb-3">Current Market Conditions</h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-green-800/30 p-3 rounded-lg border border-green-500/20">
                        <div className="text-green-400 font-medium mb-1">Positive Factors</div>
                        <ul className="text-green-200 space-y-1">
                          <li>• Strong German manufacturing data</li>
                          <li>• Stable European Central Bank policy</li>
                          <li>• Low market volatility</li>
                          <li>• Positive investor sentiment</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-800/30 p-3 rounded-lg border border-yellow-500/20">
                        <div className="text-yellow-400 font-medium mb-1">Watch Factors</div>
                        <ul className="text-yellow-200 space-y-1">
                          <li>• Global economic indicators</li>
                          <li>• Interest rate policy changes</li>
                          <li>• Geopolitical developments</li>
                          <li>• Corporate earnings reports</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-3">Bond Rate Outlook</h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-blue-800/30 p-3 rounded-lg border border-blue-500/20">
                        <div className="text-blue-400 font-medium mb-1">Short-term (1-3 months)</div>
                        <p className="text-blue-200">
                          Expect stable to slightly higher rates as DAX continues positive momentum. Rate increases of
                          0.05-0.10% possible.
                        </p>
                      </div>

                      <div className="bg-purple-800/30 p-3 rounded-lg border border-purple-500/20">
                        <div className="text-purple-400 font-medium mb-1">Medium-term (3-12 months)</div>
                        <p className="text-purple-200">
                          Market conditions suggest continued stability with moderate volatility. Government guarantees
                          provide rate floor protection.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                  <h4 className="font-medium text-white mb-3">Recommendation for Bond Applicants</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-green-400 font-medium mb-2">Favorable Timing</div>
                      <ul className="text-blue-200 space-y-1">
                        <li>• Current spreads are competitive</li>
                        <li>• Market volatility is low</li>
                        <li>• Government guarantees are stable</li>
                        <li>• DAX correlation benefits are active</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-blue-400 font-medium mb-2">Action Items</div>
                      <ul className="text-blue-200 space-y-1">
                        <li>• Consider rate lock if applying</li>
                        <li>• Monitor for volatility increases</li>
                        <li>• Review bond type correlations</li>
                        <li>• Consult with bond specialists</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            className="bg-gradient-to-r from-blue-500 to-cyan-600"
            onClick={() => router.push("/citizen/loan-center/calculator")}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Calculate Current Rates
          </Button>
          <Button
            variant="outline"
            className="border-blue-500/30 text-blue-300 bg-transparent hover:bg-blue-500/20"
            onClick={() => router.push("/citizen/loan-center/bond-analyzer")}
          >
            <Activity className="h-4 w-4 mr-2" />
            Analyze Bond Structures
          </Button>
        </div>
      </div>
    </div>
  )
}
