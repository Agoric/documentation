"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Coins, Shield, Award, Users, DollarSign, Activity } from "lucide-react"
import { sacTokenSystem, type SACTokenMetrics, type QGIUtility } from "@/lib/supreme-authority-coin/sac-token-system"

export default function SACDashboard() {
  const [tokenMetrics, setTokenMetrics] = useState<SACTokenMetrics>()
  const [utilities, setUtilities] = useState<QGIUtility[]>([])
  const [priceHistory, setPriceHistory] = useState<Array<{ timestamp: Date; index: number; price: number }>>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const updateData = () => {
      const metrics = sacTokenSystem.updateTokenMetrics()
      const utilityData = sacTokenSystem.getUtilityPerformance()
      const history = sacTokenSystem.getPerformanceHistory()

      setTokenMetrics(metrics)
      setUtilities(utilityData)
      setPriceHistory(history)
      setIsLoading(false)
    }

    updateData()
    const interval = setInterval(updateData, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 4,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value)
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      banking: "#3B82F6",
      trading: "#10B981",
      "real-estate": "#F59E0B",
      credit: "#8B5CF6",
      insurance: "#EF4444",
      ai: "#06B6D4",
      citizenship: "#84CC16",
    }
    return colors[category as keyof typeof colors] || "#6B7280"
  }

  if (isLoading || !tokenMetrics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const chartData = priceHistory.slice(-24).map((item, index) => ({
    time: index,
    price: item.price,
    index: item.index,
  }))

  const utilityChartData = utilities.map((utility) => ({
    name: utility.name.split(" ").slice(0, 2).join(" "),
    revenue: utility.performanceMetrics.revenue / 1000000,
    growth: utility.performanceMetrics.userGrowth,
    satisfaction: utility.performanceMetrics.customerSatisfaction,
  }))

  const pieData = utilities.map((utility) => ({
    name: utility.name.split(" ")[0],
    value: utility.weight * 100,
    color: getCategoryColor(utility.category),
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Shield className="h-12 w-12 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white">Supreme Authority Coin</h1>
            <Coins className="h-12 w-12 text-yellow-400" />
          </div>
          <p className="text-xl text-gray-300">Backed by QGI Utilities Collective Performance</p>
        </div>

        {/* Token Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Token Price</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{formatCurrency(tokenMetrics.currentPrice)}</div>
              <div
                className={`flex items-center space-x-1 ${tokenMetrics.priceChange24h >= 0 ? "text-green-300" : "text-red-300"}`}
              >
                {tokenMetrics.priceChange24h >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{tokenMetrics.priceChange24h.toFixed(2)}%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-green-800 border-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Performance Index</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{tokenMetrics.performanceIndex.toFixed(1)}</div>
              <Progress value={tokenMetrics.performanceIndex} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-purple-800 border-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Market Cap</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">${formatNumber(Math.round(tokenMetrics.marketCap))}</div>
              <div className="text-purple-200 text-sm">
                Circulating: {formatNumber(tokenMetrics.circulatingSupply)} SAC
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-600 to-yellow-800 border-yellow-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Backing Value</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{formatCurrency(tokenMetrics.backingValue)}</div>
              <div className="text-yellow-200 text-sm">Per Token</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800">
            <TabsTrigger value="overview" className="text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="utilities" className="text-white">
              QGI Utilities
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="distribution" className="text-white">
              Distribution
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Price & Performance History</CardTitle>
                  <CardDescription className="text-gray-400">Last 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151" }}
                        labelStyle={{ color: "#F3F4F6" }}
                      />
                      <Line type="monotone" dataKey="price" stroke="#3B82F6" strokeWidth={2} name="Price ($)" />
                      <Line type="monotone" dataKey="index" stroke="#10B981" strokeWidth={2} name="Performance Index" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Utility Weight Distribution</CardTitle>
                  <CardDescription className="text-gray-400">Token backing allocation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="utilities" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {utilities.map((utility) => (
                <Card key={utility.id} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center space-x-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: getCategoryColor(utility.category) }}
                        />
                        <span>{utility.name}</span>
                      </CardTitle>
                      <Badge variant="outline" className="text-white border-gray-600">
                        Weight: {(utility.weight * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">
                          ${formatNumber(utility.performanceMetrics.revenue / 1000)}K
                        </div>
                        <div className="text-sm text-gray-400">Revenue</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">
                          {utility.performanceMetrics.userGrowth.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-400">User Growth</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">
                          ${formatNumber(utility.performanceMetrics.transactionVolume / 1000000)}M
                        </div>
                        <div className="text-sm text-gray-400">Volume</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">
                          {utility.performanceMetrics.profitMargin.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-400">Profit Margin</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-pink-400">
                          {utility.performanceMetrics.customerSatisfaction.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-400">Satisfaction</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-400">
                          {utility.performanceMetrics.systemUptime.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-400">Uptime</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Utility Performance Comparison</CardTitle>
                <CardDescription className="text-gray-400">Revenue vs Growth vs Satisfaction</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={utilityChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151" }}
                      labelStyle={{ color: "#F3F4F6" }}
                    />
                    <Bar dataKey="revenue" fill="#3B82F6" name="Revenue ($M)" />
                    <Bar dataKey="growth" fill="#10B981" name="Growth (%)" />
                    <Bar dataKey="satisfaction" fill="#F59E0B" name="Satisfaction (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Token Distribution</CardTitle>
                  <CardDescription className="text-gray-400">Daily rewards based on performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Base Distribution Rate:</span>
                    <span className="text-white font-bold">{(tokenMetrics.distributionRate * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Performance Multiplier:</span>
                    <span className="text-green-400 font-bold">
                      {(tokenMetrics.performanceIndex / 100).toFixed(2)}x
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Daily Base Tokens:</span>
                    <span className="text-blue-400 font-bold">100 SAC</span>
                  </div>
                  <div className="border-t border-gray-600 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Your Estimated Daily Reward:</span>
                      <span className="text-yellow-400 font-bold text-xl">
                        {sacTokenSystem.distributeTokens(85)} SAC
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Token Economics</CardTitle>
                  <CardDescription className="text-gray-400">Supply and circulation metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Supply:</span>
                    <span className="text-white font-bold">{formatNumber(tokenMetrics.totalSupply)} SAC</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Circulating Supply:</span>
                    <span className="text-blue-400 font-bold">{formatNumber(tokenMetrics.circulatingSupply)} SAC</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Circulation Ratio:</span>
                    <span className="text-green-400 font-bold">
                      {((tokenMetrics.circulatingSupply / tokenMetrics.totalSupply) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Daily Volume:</span>
                    <span className="text-purple-400 font-bold">${formatNumber(tokenMetrics.dailyVolume)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Users className="h-4 w-4 mr-2" />
            Stake SAC Tokens
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Award className="h-4 w-4 mr-2" />
            Claim Rewards
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Activity className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>
    </div>
  )
}
