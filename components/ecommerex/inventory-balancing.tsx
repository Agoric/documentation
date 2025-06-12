"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, ArrowRight, CheckCircle2, Lightbulb, RefreshCw, Sparkles, TrendingUp } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample inventory data
const inventoryData = {
  platforms: [
    { name: "Amazon", stock: 532, allocated: 450, utilization: 85 },
    { name: "eBay", stock: 324, allocated: 290, utilization: 90 },
    { name: "Shopify", stock: 278, allocated: 210, utilization: 76 },
    { name: "Walmart", stock: 156, allocated: 120, utilization: 77 },
    { name: "Website", stock: 412, allocated: 380, utilization: 92 },
  ],
  warehouses: [
    { name: "Main Warehouse", stock: 1250, capacity: 1500, utilization: 83 },
    { name: "East Coast Fulfillment", stock: 420, capacity: 600, utilization: 70 },
    { name: "West Coast Fulfillment", stock: 380, capacity: 500, utilization: 76 },
  ],
  recommendations: [
    {
      id: 1,
      title: "Rebalance Amazon inventory",
      description:
        "Move 50 units of 'Wireless Earbuds Pro' from East Coast to West Coast warehouse to optimize shipping times.",
      impact: "medium",
      status: "pending",
    },
    {
      id: 2,
      title: "Increase eBay allocation",
      description: "Increase eBay allocation for 'Smart Watch Series X' by 25 units based on rising demand trends.",
      impact: "high",
      status: "pending",
    },
    {
      id: 3,
      title: "Reduce Shopify allocation",
      description: "Decrease Shopify allocation for 'Gaming Mouse RGB' by 30 units due to slowing sales.",
      impact: "medium",
      status: "implemented",
    },
  ],
  alerts: [
    {
      id: 1,
      title: "Low stock alert",
      description: "Portable SSD 1TB is running low on Amazon (8 units remaining).",
      severity: "high",
    },
    {
      id: 2,
      title: "Inventory mismatch",
      description: "Inventory count mismatch detected for USB-C Hub Multiport between system (82) and actual (78).",
      severity: "medium",
    },
    {
      id: 3,
      title: "Allocation imbalance",
      description: "Ergonomic Keyboard has suboptimal allocation across platforms.",
      severity: "low",
    },
  ],
}

export function InventoryBalancing() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isOptimizing, setIsOptimizing] = useState(false)

  const handleOptimize = () => {
    setIsOptimizing(true)
    // Simulate optimization delay
    setTimeout(() => {
      setIsOptimizing(false)
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="flex justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Inventory Health Score</h3>
              <p className="text-sm text-muted-foreground">Overall inventory balance across platforms</p>
            </div>
            <Button onClick={handleOptimize} disabled={isOptimizing}>
              <Sparkles className="mr-2 h-4 w-4" />
              {isOptimizing ? "Optimizing..." : "Auto-Optimize Inventory"}
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Platform Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <Progress value={85} className="mt-2" />
                <p className="mt-2 text-xs text-muted-foreground">
                  <span className="text-emerald-500 font-medium">↑ 3%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Warehouse Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <Progress value={78} className="mt-2" />
                <p className="mt-2 text-xs text-muted-foreground">
                  <span className="text-emerald-500 font-medium">↑ 5%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Stockout Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Low</div>
                <Progress value={15} className="mt-2" />
                <p className="mt-2 text-xs text-muted-foreground">
                  <span className="text-emerald-500 font-medium">↓ 8%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <div>
                    <CardTitle>Active Alerts</CardTitle>
                    <CardDescription>Inventory issues requiring attention</CardDescription>
                  </div>
                  <Badge className="ml-auto">{inventoryData.alerts.length}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryData.alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 rounded-lg border p-3">
                      <div
                        className={`mt-0.5 rounded-full p-1 ${
                          alert.severity === "high"
                            ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                            : alert.severity === "medium"
                              ? "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300"
                              : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                        }`}
                      >
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{alert.title}</h4>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Resolve
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <div>
                    <CardTitle>Optimization Recommendations</CardTitle>
                    <CardDescription>AI-suggested inventory adjustments</CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="ml-auto bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                  >
                    <Lightbulb className="mr-1 h-3 w-3" />
                    {inventoryData.recommendations.length} Suggestions
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryData.recommendations.map((rec) => (
                    <div key={rec.id} className="flex items-start gap-3 rounded-lg border p-3">
                      <div
                        className={`mt-0.5 rounded-full p-1 ${
                          rec.impact === "high"
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                            : rec.impact === "medium"
                              ? "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
                              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {rec.status === "implemented" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <TrendingUp className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{rec.title}</h4>
                          {rec.status === "implemented" && (
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                            >
                              Implemented
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                      </div>
                      {rec.status !== "implemented" && <Button size="sm">Apply</Button>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Platform Inventory Distribution</h3>
              <p className="text-sm text-muted-foreground">Current inventory allocation across sales channels</p>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Product Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="accessories">Computer Accessories</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="storage">Storage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-2 p-4 font-medium text-sm">
              <div className="col-span-3">Platform</div>
              <div className="col-span-2 text-center">Current Stock</div>
              <div className="col-span-2 text-center">Allocated</div>
              <div className="col-span-3 text-center">Utilization</div>
              <div className="col-span-2 text-center">Actions</div>
            </div>
            <div className="divide-y">
              {inventoryData.platforms.map((platform, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 p-4 items-center">
                  <div className="col-span-3 font-medium">{platform.name}</div>
                  <div className="col-span-2 text-center">{platform.stock} units</div>
                  <div className="col-span-2 text-center">{platform.allocated} units</div>
                  <div className="col-span-3">
                    <div className="flex items-center justify-center gap-2">
                      <Progress value={platform.utilization} className="w-full" />
                      <span className="text-sm font-medium">{platform.utilization}%</span>
                    </div>
                  </div>
                  <div className="col-span-2 flex justify-center gap-2">
                    <Button variant="outline" size="sm">
                      Adjust
                    </Button>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cross-Platform Inventory Transfer</CardTitle>
              <CardDescription>Move inventory between platforms to optimize sales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium">Source Platform</label>
                  <Select defaultValue="amazon">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amazon">Amazon</SelectItem>
                      <SelectItem value="ebay">eBay</SelectItem>
                      <SelectItem value="shopify">Shopify</SelectItem>
                      <SelectItem value="walmart">Walmart</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end justify-center">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <label className="text-sm font-medium">Destination Platform</label>
                  <Select defaultValue="ebay">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amazon">Amazon</SelectItem>
                      <SelectItem value="ebay">eBay</SelectItem>
                      <SelectItem value="shopify">Shopify</SelectItem>
                      <SelectItem value="walmart">Walmart</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Product</label>
                  <Select defaultValue="earbuds">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="earbuds">Wireless Earbuds Pro</SelectItem>
                      <SelectItem value="watch">Smart Watch Series X</SelectItem>
                      <SelectItem value="webcam">Ultra HD Webcam</SelectItem>
                      <SelectItem value="keyboard">Ergonomic Keyboard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Quantity</label>
                  <Select defaultValue="25">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select quantity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 units</SelectItem>
                      <SelectItem value="25">25 units</SelectItem>
                      <SelectItem value="50">50 units</SelectItem>
                      <SelectItem value="100">100 units</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button>Transfer Inventory</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="warehouses" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Warehouse Utilization</h3>
              <p className="text-sm text-muted-foreground">Physical inventory storage across locations</p>
            </div>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync Inventory
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {inventoryData.warehouses.map((warehouse, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{warehouse.name}</CardTitle>
                  <CardDescription>
                    {warehouse.stock} / {warehouse.capacity} units ({warehouse.utilization}% utilized)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={warehouse.utilization} className="mb-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Top Product</div>
                      <div className="font-medium">Wireless Earbuds Pro</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Low Stock</div>
                      <div className="font-medium">3 products</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Warehouse Transfer</CardTitle>
              <CardDescription>Move inventory between physical locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium">Source Warehouse</label>
                  <Select defaultValue="main">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Main Warehouse</SelectItem>
                      <SelectItem value="east">East Coast Fulfillment</SelectItem>
                      <SelectItem value="west">West Coast Fulfillment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end justify-center">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <label className="text-sm font-medium">Destination Warehouse</label>
                  <Select defaultValue="west">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Main Warehouse</SelectItem>
                      <SelectItem value="east">East Coast Fulfillment</SelectItem>
                      <SelectItem value="west">West Coast Fulfillment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Product</label>
                  <Select defaultValue="earbuds">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="earbuds">Wireless Earbuds Pro</SelectItem>
                      <SelectItem value="watch">Smart Watch Series X</SelectItem>
                      <SelectItem value="webcam">Ultra HD Webcam</SelectItem>
                      <SelectItem value="keyboard">Ergonomic Keyboard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Quantity</label>
                  <Select defaultValue="50">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select quantity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 units</SelectItem>
                      <SelectItem value="25">25 units</SelectItem>
                      <SelectItem value="50">50 units</SelectItem>
                      <SelectItem value="100">100 units</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button>Create Transfer</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <div>
                  <CardTitle>AI-Powered Inventory Recommendations</CardTitle>
                  <CardDescription>Smart suggestions to optimize your inventory across platforms</CardDescription>
                </div>
                <Badge variant="outline" className="ml-auto">
                  <Sparkles className="mr-1 h-3 w-3" />
                  AI-Generated
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg border bg-muted/50 p-4">
                  <h3 className="mb-2 text-lg font-medium">Inventory Health Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    Your inventory is generally well-balanced across platforms, but there are a few opportunities for
                    optimization. We've identified 3 high-impact and 5 medium-impact recommendations that could improve
                    your inventory efficiency by approximately 12%.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">High Impact Recommendations</h3>
                  <div className="space-y-3">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-full bg-blue-100 p-1 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                          <Lightbulb className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Rebalance Smart Watch Series X inventory</h4>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Current allocation: Amazon (35), eBay (15), Shopify (10), Walmart (10), Website (8)
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Recommended allocation: Amazon (25), eBay (25), Shopify (10), Walmart (10), Website (8)
                          </p>
                          <p className="mt-2 text-sm">
                            <strong>Reasoning:</strong> eBay sales for this product have increased by 35% in the last 30
                            days, while Amazon sales have decreased by 15%.
                          </p>
                        </div>
                        <Button>Apply</Button>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-full bg-blue-100 p-1 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                          <Lightbulb className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Consolidate warehouse storage for USB-C Hub Multiport</h4>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Current distribution: Main (40), East Coast (22), West Coast (20)
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Recommended distribution: Main (20), East Coast (42), West Coast (20)
                          </p>
                          <p className="mt-2 text-sm">
                            <strong>Reasoning:</strong> 65% of orders for this product ship to East Coast locations.
                            Consolidating inventory will reduce shipping costs by an estimated $850 per month.
                          </p>
                        </div>
                        <Button>Apply</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Medium Impact Recommendations</h3>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-full bg-purple-100 p-1 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
                          <Lightbulb className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Reduce Portable SSD 1TB allocation on Shopify</h4>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Decrease allocation from 15 to 8 units based on 90-day sales history.
                          </p>
                        </div>
                        <Button variant="outline">Apply</Button>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-full bg-purple-100 p-1 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
                          <Lightbulb className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Enable Etsy channel for Bluetooth Speaker Mini</h4>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Based on similar product performance, we estimate 12-18 additional units sold per month.
                          </p>
                        </div>
                        <Button variant="outline">Apply</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
