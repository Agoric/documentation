"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Sample seasonal data
const seasonalData = {
  weekly: [
    { name: "Monday", sales: 420, orders: 32 },
    { name: "Tuesday", sales: 480, orders: 36 },
    { name: "Wednesday", sales: 510, orders: 38 },
    { name: "Thursday", sales: 530, orders: 40 },
    { name: "Friday", sales: 620, orders: 48 },
    { name: "Saturday", sales: 750, orders: 58 },
    { name: "Sunday", sales: 680, orders: 52 },
  ],
  monthly: [
    { name: "Jan", sales: 12500, orders: 950 },
    { name: "Feb", sales: 11800, orders: 920 },
    { name: "Mar", sales: 13200, orders: 1020 },
    { name: "Apr", sales: 14500, orders: 1120 },
    { name: "May", sales: 15800, orders: 1220 },
    { name: "Jun", sales: 16200, orders: 1250 },
    { name: "Jul", sales: 15500, orders: 1180 },
    { name: "Aug", sales: 14800, orders: 1140 },
    { name: "Sep", sales: 16500, orders: 1280 },
    { name: "Oct", sales: 18200, orders: 1420 },
    { name: "Nov", sales: 21500, orders: 1680 },
    { name: "Dec", sales: 24800, orders: 1950 },
  ],
  quarterly: [
    { name: "Q1", sales: 37500, orders: 2890 },
    { name: "Q2", sales: 46500, orders: 3590 },
    { name: "Q3", sales: 46800, orders: 3600 },
    { name: "Q4", sales: 64500, orders: 5050 },
  ],
}

// Sample product seasonal data
const productSeasonalData = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    category: "Electronics",
    seasonalPattern: "Holiday spike",
    peakMonths: ["November", "December"],
    lowMonths: ["February", "March"],
    yearOverYear: "+15%",
    recommendation: "Increase stock by 25% for Q4",
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    category: "Electronics",
    seasonalPattern: "Steady with holiday increase",
    peakMonths: ["December"],
    lowMonths: ["January", "February"],
    yearOverYear: "+8%",
    recommendation: "Maintain regular stock, increase by 15% for December",
  },
  {
    id: 3,
    name: "Ultra HD Webcam",
    category: "Electronics",
    seasonalPattern: "Back to school & holiday",
    peakMonths: ["August", "December"],
    lowMonths: ["May", "June"],
    yearOverYear: "+22%",
    recommendation: "Double stock for August and December",
  },
  {
    id: 4,
    name: "Ergonomic Keyboard",
    category: "Computer Accessories",
    seasonalPattern: "Back to school & work from home",
    peakMonths: ["January", "August"],
    lowMonths: ["July"],
    yearOverYear: "-5%",
    recommendation: "Reduce overall stock by 10%, maintain seasonal patterns",
  },
  {
    id: 5,
    name: "Portable SSD 1TB",
    category: "Storage",
    seasonalPattern: "Consistent demand",
    peakMonths: ["December"],
    lowMonths: [],
    yearOverYear: "+12%",
    recommendation: "Increase base stock by 10%, add 20% for December",
  },
]

export function SeasonalTrendAnalysis() {
  const [timeframe, setTimeframe] = useState("monthly")
  const [dataType, setDataType] = useState("sales")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = Array.from(new Set(productSeasonalData.map((p) => p.category)))

  const filteredProducts = productSeasonalData.filter(
    (product) => selectedCategory === "all" || product.category === selectedCategory,
  )

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Seasonal Trend Analysis</CardTitle>
              <CardDescription>Identify patterns and optimize inventory for seasonal demand</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dataType} onValueChange={setDataType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Data Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales ($)</SelectItem>
                  <SelectItem value="orders">Orders</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={seasonalData[timeframe as keyof typeof seasonalData]}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey={dataType}
                  stroke={dataType === "sales" ? "#8884d8" : "#82ca9d"}
                  fillOpacity={1}
                  fill={`url(#color${dataType === "sales" ? "Sales" : "Orders"})`}
                  name={dataType === "sales" ? "Sales ($)" : "Orders"}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Product Seasonal Patterns</CardTitle>
              <CardDescription>Detailed seasonal analysis by product</CardDescription>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-2 p-4 font-medium text-sm">
              <div className="col-span-3">Product</div>
              <div className="col-span-3">Seasonal Pattern</div>
              <div className="col-span-2">Peak Months</div>
              <div className="col-span-2">YoY Change</div>
              <div className="col-span-2">Recommendation</div>
            </div>
            <div className="divide-y">
              {filteredProducts.map((product) => (
                <div key={product.id} className="grid grid-cols-12 gap-2 p-4 items-center">
                  <div className="col-span-3">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">{product.category}</div>
                  </div>
                  <div className="col-span-3">
                    <div className="text-sm">{product.seasonalPattern}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="flex flex-wrap gap-1">
                      {product.peakMonths.map((month, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                        >
                          {month.substring(0, 3)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Badge
                      variant="outline"
                      className={
                        product.yearOverYear.startsWith("+")
                          ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                          : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
                      }
                    >
                      {product.yearOverYear}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <Button variant="outline" size="sm">
                      View Plan
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
