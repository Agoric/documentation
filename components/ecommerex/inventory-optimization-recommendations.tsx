"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Clock, Download, Lightbulb, RefreshCw, Sparkles, ThumbsUp, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample recommendations data
const recommendationsData = [
  {
    id: 1,
    title: "Increase Wireless Earbuds Pro stock by 25%",
    description:
      "Based on historical data and current trends, demand is expected to increase by 25% in the next 30 days.",
    impact: "high",
    category: "Restock",
    savings: "$4,250",
    confidence: 92,
    status: "pending",
  },
  {
    id: 2,
    title: "Reduce Gaming Mouse RGB inventory by 45 units",
    description: "Current stock exceeds projected demand by 45 units, leading to excess carrying costs.",
    impact: "medium",
    category: "Reduce",
    savings: "$2,250",
    confidence: 87,
    status: "implemented",
  },
  {
    id: 3,
    title: "Adjust reorder point for Ultra HD Webcam",
    description: "Increase reorder point from 35 to 45 units to account for increased lead time from supplier.",
    impact: "medium",
    category: "Adjust",
    savings: "$1,800",
    confidence: 85,
    status: "pending",
  },
  {
    id: 4,
    title: "Consolidate Bluetooth Speaker Mini orders",
    description:
      "Combine with other orders from same supplier to reduce shipping costs and take advantage of bulk discounts.",
    impact: "low",
    category: "Consolidate",
    savings: "$950",
    confidence: 79,
    status: "pending",
  },
  {
    id: 5,
    title: "Expedite Smart Watch Series X restock",
    description: "Current stock will be depleted before standard lead time. Expedite to avoid stockout.",
    impact: "high",
    category: "Expedite",
    savings: "$3,750",
    confidence: 90,
    status: "pending",
  },
  {
    id: 6,
    title: "Redistribute inventory across warehouses",
    description: "Optimize inventory distribution based on regional demand patterns.",
    impact: "medium",
    category: "Redistribute",
    savings: "$2,100",
    confidence: 82,
    status: "rejected",
  },
]

export function InventoryOptimizationRecommendations() {
  const [filter, setFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  const filteredRecommendations = recommendationsData.filter((rec) => {
    const matchesImpact = filter === "all" || rec.impact === filter
    const matchesStatus = statusFilter === "all" || rec.status === statusFilter
    return matchesImpact && matchesStatus
  })

  const totalSavings = filteredRecommendations.reduce((sum, rec) => {
    return sum + Number.parseInt(rec.savings.replace("$", "").replace(",", ""))
  }, 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "implemented":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
            <Check className="mr-1 h-3 w-3" /> Implemented
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400">
            <X className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
            High Impact
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400">
            Medium Impact
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-400">
            Low Impact
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recommendationsData.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 font-medium">↑ 2</span> vs. previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Potential Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSavings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From {filteredRecommendations.length} recommendations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Implementation Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (recommendationsData.filter((r) => r.status === "implemented").length / recommendationsData.length) *
                  100,
              )}
              %
            </div>
            <Progress
              value={
                (recommendationsData.filter((r) => r.status === "implemented").length / recommendationsData.length) *
                100
              }
              className="mt-2"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <div>
                <CardTitle>AI-Generated Recommendations</CardTitle>
                <CardDescription>Optimize your inventory with AI-powered insights</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                All
              </Button>
              <Button variant={filter === "high" ? "default" : "outline"} size="sm" onClick={() => setFilter("high")}>
                High Impact
              </Button>
              <Button
                variant={filter === "medium" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("medium")}
              >
                Medium Impact
              </Button>
              <Button variant={filter === "low" ? "default" : "outline"} size="sm" onClick={() => setFilter("low")}>
                Low Impact
              </Button>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="implemented">Implemented</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredRecommendations.map((recommendation) => (
              <Card key={recommendation.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                      <h3 className="font-semibold">{recommendation.title}</h3>
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground">{recommendation.description}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {getImpactBadge(recommendation.impact)}
                      <Badge variant="outline">{recommendation.category}</Badge>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                      >
                        {recommendation.savings} potential savings
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                        {recommendation.confidence}% confidence
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t bg-muted/50 p-4 md:w-[200px] md:flex-col md:items-stretch md:justify-center md:border-l md:border-t-0">
                    <div className="mb-2">{getStatusBadge(recommendation.status)}</div>
                    <div className="flex gap-2">
                      {recommendation.status === "pending" && (
                        <>
                          <Button size="sm" className="flex-1">
                            <ThumbsUp className="mr-1 h-3 w-3" />
                            Apply
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Details
                          </Button>
                        </>
                      )}
                      {recommendation.status !== "pending" && (
                        <Button size="sm" variant="outline" className="flex-1">
                          Details
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
