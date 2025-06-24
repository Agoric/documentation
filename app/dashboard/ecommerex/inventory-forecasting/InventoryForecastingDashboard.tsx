"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Download, RefreshCw, Settings } from "lucide-react"
import { ForecastChart } from "@/components/ecommerex/forecast-chart"
import { ProductDemandAnalysis } from "@/components/ecommerex/product-demand-analysis"
import { SeasonalTrendAnalysis } from "@/components/ecommerex/seasonal-trend-analysis"
import { InventoryOptimizationRecommendations } from "@/components/ecommerex/inventory-optimization-recommendations"
import { ForecastSettings } from "@/components/ecommerex/forecast-settings"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function InventoryForecastingDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [forecastPeriod, setForecastPeriod] = useState("30")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Select value={forecastPeriod} onValueChange={setForecastPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Forecast Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Next 7 Days</SelectItem>
              <SelectItem value="14">Next 14 Days</SelectItem>
              <SelectItem value="30">Next 30 Days</SelectItem>
              <SelectItem value="90">Next 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh Forecasts"}
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Predicted Revenue</CardTitle>
            <CardDescription>Next {forecastPeriod} days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$128,430</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 font-medium">↑ 12.3%</span> vs. previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Predicted Units Sold</CardTitle>
            <CardDescription>Next {forecastPeriod} days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,842</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 font-medium">↑ 8.7%</span> vs. previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Stockout Risk</CardTitle>
            <CardDescription>Products at risk</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-rose-500 font-medium">↑ 3</span> vs. previous period
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Product Analysis</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal Trends</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Inventory Forecast</CardTitle>
                  <CardDescription>Predicted inventory levels for the next {forecastPeriod} days</CardDescription>
                </div>
                <Badge variant="outline" className="ml-auto">
                  AI-Powered
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ForecastChart days={Number.parseInt(forecastPeriod)} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Products at Risk</CardTitle>
                <CardDescription>Items predicted to stock out within {forecastPeriod} days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Wireless Earbuds Pro", days: 5, confidence: 92 },
                    { name: "Smart Watch Series X", days: 8, confidence: 87 },
                    { name: "Ultra HD Webcam", days: 12, confidence: 83 },
                    { name: "Ergonomic Keyboard", days: 15, confidence: 78 },
                    { name: "Portable SSD 1TB", days: 18, confidence: 75 },
                  ].map((product, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">Stockout in ~{product.days} days</div>
                      </div>
                      <Badge variant={product.days <= 7 ? "destructive" : "outline"}>
                        {product.confidence}% confidence
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Overstock Risks</CardTitle>
                <CardDescription>Items with potential excess inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Gaming Mouse RGB", excess: 45, value: 2250 },
                    { name: "Bluetooth Speaker Mini", excess: 38, value: 1900 },
                    { name: "USB-C Hub Multiport", excess: 32, value: 1600 },
                    { name: "Wireless Charging Pad", excess: 28, value: 1400 },
                    { name: "Laptop Stand Adjustable", excess: 25, value: 1250 },
                  ].map((product, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          ~{product.excess} excess units (${product.value})
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Optimize
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products">
          <ProductDemandAnalysis />
        </TabsContent>

        <TabsContent value="seasonal">
          <SeasonalTrendAnalysis />
        </TabsContent>

        <TabsContent value="recommendations">
          <InventoryOptimizationRecommendations />
        </TabsContent>

        <TabsContent value="settings">
          <ForecastSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
