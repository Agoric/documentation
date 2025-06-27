"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpDown, TrendingUp, Activity, Clock, Target, BarChart3, Zap } from "lucide-react"

export default function InstitutionalTradingPage() {
  const tradingMetrics = {
    dailyVolume: 125000000,
    activeOrders: 47,
    executionRate: 98.7,
    avgFillTime: 0.23,
    pnlToday: 2450000,
    totalPositions: 342,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Institutional Trading</h1>
            <p className="text-xl text-muted-foreground mt-2">High-volume trading and execution management</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-600 text-white">
              <Activity className="h-4 w-4 mr-2" />
              Markets Open
            </Badge>
            <Button>
              <Zap className="h-4 w-4 mr-2" />
              Execute Trade
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Daily Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(tradingMetrics.dailyVolume / 1000000).toFixed(1)}M</div>
              <div className="flex items-center text-sm text-green-600 mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12.5% vs yesterday
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tradingMetrics.activeOrders}</div>
              <div className="flex items-center text-sm text-blue-600 mt-1">
                <ArrowUpDown className="h-4 w-4 mr-1" />
                {tradingMetrics.executionRate}% fill rate
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">P&L Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                +${(tradingMetrics.pnlToday / 1000000).toFixed(2)}M
              </div>
              <div className="flex items-center text-sm text-green-600 mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                Avg fill: {tradingMetrics.avgFillTime}s
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Order Book</TabsTrigger>
            <TabsTrigger value="positions">Positions</TabsTrigger>
            <TabsTrigger value="execution">Execution</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5" />
                  Active Orders
                </CardTitle>
                <CardDescription>Current order book and pending executions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <ArrowUpDown className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium text-muted-foreground">Trading Interface</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Advanced institutional trading tools will be available here
                  </p>
                  <Button className="mt-4">
                    <Zap className="h-4 w-4 mr-2" />
                    Access Trading Platform
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="positions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Portfolio Positions
                </CardTitle>
                <CardDescription>Current holdings and position management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <span className="font-medium">Total Positions</span>
                      <p className="text-sm text-muted-foreground">Across all asset classes</p>
                    </div>
                    <span className="text-2xl font-bold">{tradingMetrics.totalPositions}</span>
                  </div>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Detailed position management coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="execution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Execution Quality
                </CardTitle>
                <CardDescription>Trade execution metrics and performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{tradingMetrics.executionRate}%</div>
                    <p className="text-sm text-green-700">Fill Rate</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{tradingMetrics.avgFillTime}s</div>
                    <p className="text-sm text-blue-700">Avg Fill Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Trading Analytics
                </CardTitle>
                <CardDescription>Performance analysis and trading insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium text-muted-foreground">Trading Analytics</p>
                    <p className="text-sm text-muted-foreground mt-2">Advanced analytics and performance metrics</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
