"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample product demand data
const productDemandData = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    category: "Electronics",
    currentStock: 45,
    reorderPoint: 50,
    predictedDemand: 120,
    confidence: 92,
    trend: "increasing",
    leadTime: 14,
    recommendedOrder: 125,
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    category: "Electronics",
    currentStock: 32,
    reorderPoint: 40,
    predictedDemand: 85,
    confidence: 87,
    trend: "stable",
    leadTime: 10,
    recommendedOrder: 93,
  },
  {
    id: 3,
    name: "Ultra HD Webcam",
    category: "Electronics",
    currentStock: 28,
    reorderPoint: 35,
    predictedDemand: 65,
    confidence: 83,
    trend: "increasing",
    leadTime: 12,
    recommendedOrder: 72,
  },
  {
    id: 4,
    name: "Ergonomic Keyboard",
    category: "Computer Accessories",
    currentStock: 54,
    reorderPoint: 45,
    predictedDemand: 70,
    confidence: 78,
    trend: "decreasing",
    leadTime: 8,
    recommendedOrder: 61,
  },
  {
    id: 5,
    name: "Portable SSD 1TB",
    category: "Storage",
    currentStock: 38,
    reorderPoint: 40,
    predictedDemand: 60,
    confidence: 75,
    trend: "stable",
    leadTime: 7,
    recommendedOrder: 62,
  },
  {
    id: 6,
    name: "Gaming Mouse RGB",
    category: "Computer Accessories",
    currentStock: 120,
    reorderPoint: 50,
    predictedDemand: 75,
    confidence: 81,
    trend: "decreasing",
    leadTime: 9,
    recommendedOrder: 5,
  },
  {
    id: 7,
    name: "Bluetooth Speaker Mini",
    category: "Audio",
    currentStock: 95,
    reorderPoint: 40,
    predictedDemand: 57,
    confidence: 79,
    trend: "stable",
    leadTime: 11,
    recommendedOrder: 2,
  },
  {
    id: 8,
    name: "USB-C Hub Multiport",
    category: "Computer Accessories",
    currentStock: 82,
    reorderPoint: 35,
    predictedDemand: 50,
    confidence: 76,
    trend: "stable",
    leadTime: 6,
    recommendedOrder: 3,
  },
]

// Sample category demand data for chart
const categoryDemandData = [
  { name: "Electronics", current: 210, predicted: 270 },
  { name: "Computer Accessories", current: 256, predicted: 195 },
  { name: "Audio", current: 95, predicted: 57 },
  { name: "Storage", current: 38, predicted: 60 },
  { name: "Cameras", current: 65, predicted: 72 },
  { name: "Smart Home", current: 120, predicted: 145 },
]

export function ProductDemandAnalysis() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("demand")

  const filteredProducts = productDemandData
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === "all" || product.category === categoryFilter),
    )
    .sort((a, b) => {
      if (sortBy === "demand") return b.predictedDemand - a.predictedDemand
      if (sortBy === "confidence") return b.confidence - a.confidence
      if (sortBy === "stock") return a.currentStock - b.currentStock
      return 0
    })

  const categories = Array.from(new Set(productDemandData.map((p) => p.category)))

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Product Demand Analysis</CardTitle>
              <CardDescription>AI-powered demand forecasting by product</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="demand">Highest Demand</SelectItem>
                  <SelectItem value="confidence">Highest Confidence</SelectItem>
                  <SelectItem value="stock">Lowest Stock</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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

          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-2 p-4 font-medium text-sm">
              <div className="col-span-4">Product</div>
              <div className="col-span-2 text-center">Current Stock</div>
              <div className="col-span-2 text-center">Predicted Demand</div>
              <div className="col-span-2 text-center">Confidence</div>
              <div className="col-span-2 text-center">Action</div>
            </div>
            <div className="divide-y">
              {filteredProducts.map((product) => (
                <div key={product.id} className="grid grid-cols-12 gap-2 p-4 items-center">
                  <div className="col-span-4">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">{product.category}</div>
                  </div>
                  <div className="col-span-2 text-center">
                    <div className={`font-medium ${product.currentStock < product.reorderPoint ? "text-red-500" : ""}`}>
                      {product.currentStock}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {product.currentStock < product.reorderPoint ? "Below reorder point" : "In stock"}
                    </div>
                  </div>
                  <div className="col-span-2 text-center">
                    <div className="font-medium">{product.predictedDemand}</div>
                    <div className="text-xs text-muted-foreground">
                      {product.trend === "increasing" && "↑ Increasing"}
                      {product.trend === "decreasing" && "↓ Decreasing"}
                      {product.trend === "stable" && "→ Stable"}
                    </div>
                  </div>
                  <div className="col-span-2 text-center">
                    <Badge
                      variant="outline"
                      className={
                        product.confidence > 85
                          ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                          : product.confidence > 75
                            ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
                            : "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-400"
                      }
                    >
                      {product.confidence}%
                    </Badge>
                  </div>
                  <div className="col-span-2 text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className={
                        product.recommendedOrder > 0
                          ? "bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-950 dark:text-blue-400 dark:hover:bg-blue-900"
                          : ""
                      }
                    >
                      {product.recommendedOrder > 0 ? `Order ${product.recommendedOrder}` : "Details"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Category Demand Forecast</CardTitle>
          <CardDescription>Current vs. predicted demand by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryDemandData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="current" name="Current Inventory" fill="#3b82f6" />
                <Bar dataKey="predicted" name="Predicted Demand" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
