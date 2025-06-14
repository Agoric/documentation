"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react"

interface PropertyAnalyticsProps {
  symbol: string
}

export function PropertyAnalytics({ symbol }: PropertyAnalyticsProps) {
  const analyticsData = [
    { metric: "P/E Ratio", value: "18.5", change: "+0.3", trend: "up" },
    { metric: "Cap Rate", value: "4.2%", change: "-0.1%", trend: "down" },
    { metric: "NOI Yield", value: "6.8%", change: "+0.2%", trend: "up" },
    { metric: "Occupancy", value: "94.5%", change: "+1.2%", trend: "up" },
    { metric: "Price/SqFt", value: "$1,250", change: "+$25", trend: "up" },
    { metric: "Days on Market", value: "28", change: "-3", trend: "down" },
  ]

  const performanceData = [
    { period: "1D", return: "+2.3%", benchmark: "+1.8%" },
    { period: "1W", return: "+5.7%", benchmark: "+4.2%" },
    { period: "1M", return: "+12.4%", benchmark: "+8.9%" },
    { period: "3M", return: "+18.9%", benchmark: "+15.2%" },
    { period: "YTD", return: "+24.6%", benchmark: "+19.8%" },
    { period: "1Y", return: "+31.2%", benchmark: "+25.4%" },
  ]

  const volumeData = [
    { time: "09:30", volume: 125 },
    { time: "10:00", volume: 180 },
    { time: "10:30", volume: 142 },
    { time: "11:00", volume: 235 },
    { time: "11:30", volume: 198 },
    { time: "12:00", volume: 167 },
    { time: "12:30", volume: 203 },
    { time: "13:00", volume: 189 },
  ]

  return (
    <div className="grid grid-cols-4 gap-2 h-full">
      {/* Key Metrics */}
      <Card className="bg-gray-900 border-green-800">
        <CardContent className="p-2">
          <div className="text-xs text-green-300 font-bold mb-2">KEY METRICS</div>
          <div className="space-y-1">
            {analyticsData.map((metric, index) => (
              <div key={index} className="grid grid-cols-3 gap-1 text-xs">
                <div className="text-gray-400">{metric.metric}</div>
                <div className="text-white text-right">{metric.value}</div>
                <div
                  className={`text-right flex items-center justify-end ${
                    metric.trend === "up" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {metric.change}
                  {metric.trend === "up" ? (
                    <TrendingUp className="w-2 h-2 ml-1" />
                  ) : (
                    <TrendingDown className="w-2 h-2 ml-1" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance vs Benchmark */}
      <Card className="bg-gray-900 border-green-800">
        <CardContent className="p-2">
          <div className="text-xs text-green-300 font-bold mb-2">PERFORMANCE</div>
          <div className="space-y-1">
            <div className="grid grid-cols-3 gap-1 text-xs text-gray-400 border-b border-gray-700 pb-1">
              <div>PERIOD</div>
              <div className="text-center">RETURN</div>
              <div className="text-center">BENCH</div>
            </div>
            {performanceData.map((perf, index) => (
              <div key={index} className="grid grid-cols-3 gap-1 text-xs">
                <div className="text-gray-400">{perf.period}</div>
                <div className="text-green-400 text-center">{perf.return}</div>
                <div className="text-yellow-400 text-center">{perf.benchmark}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Volume Analysis */}
      <Card className="bg-gray-900 border-green-800">
        <CardContent className="p-2">
          <div className="text-xs text-green-300 font-bold mb-2">VOLUME PROFILE</div>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData}>
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #10b981",
                    borderRadius: "4px",
                    fontSize: "10px",
                  }}
                />
                <Bar dataKey="volume" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs mt-2">
            <div>
              <div className="text-gray-400">Avg Volume</div>
              <div className="text-white">8.7K</div>
            </div>
            <div>
              <div className="text-gray-400">Today Volume</div>
              <div className="text-green-400">12.5K</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Metrics */}
      <Card className="bg-gray-900 border-green-800">
        <CardContent className="p-2">
          <div className="text-xs text-green-300 font-bold mb-2">RISK ANALYSIS</div>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="text-gray-400">Beta</div>
                <div className="text-white">1.15</div>
              </div>
              <div>
                <div className="text-gray-400">Volatility</div>
                <div className="text-yellow-400">18.2%</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="text-gray-400">Sharpe Ratio</div>
                <div className="text-green-400">1.42</div>
              </div>
              <div>
                <div className="text-gray-400">Max Drawdown</div>
                <div className="text-red-400">-8.5%</div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-2">
              <div className="text-xs">
                <div className="text-gray-400">Risk Rating</div>
                <div className="flex items-center space-x-1">
                  <Badge variant="outline" className="border-yellow-600 text-yellow-400 text-xs">
                    MODERATE
                  </Badge>
                  <BarChart3 className="w-3 h-3 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
