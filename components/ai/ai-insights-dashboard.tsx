"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  TrendingUp,
  Target,
  Sparkles,
  BarChart3,
  DollarSign,
  PieChart,
  Clock,
  ArrowRight,
  RefreshCw,
} from "lucide-react"
import { aiService } from "@/lib/ai-service"

interface Insight {
  id: string
  type: string
  title: string
  content: string
  confidence: number
  actionable: boolean
  category: string
  priority: "high" | "medium" | "low"
  timestamp: string
}

interface AIInsightsDashboardProps {
  userId?: string
  financialData?: any
  onInsightAction?: (insight: Insight, action: string) => void
  className?: string
}

export function AIInsightsDashboard({
  userId = "default-user",
  financialData,
  onInsightAction,
  className = "",
}: AIInsightsDashboardProps) {
  const [insights, setInsights] = useState<Insight[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    loadInsights()
  }, [userId, financialData])

  const loadInsights = async () => {
    setIsLoading(true)
    try {
      // Simulate financial data if not provided
      const mockFinancialData = financialData || {
        transactions: [
          { id: 1, amount: -42.5, merchant: "Whole Foods", date: new Date(), category: "groceries" },
          { id: 2, amount: 1250, merchant: "Payroll", date: new Date(), category: "income" },
          { id: 3, amount: -9.99, merchant: "Netflix", date: new Date(), category: "entertainment" },
        ],
        goals: [
          {
            id: 1,
            name: "Emergency Fund",
            targetAmount: 15000,
            currentAmount: 9750,
            startDate: new Date(2023, 0, 1),
            targetDate: new Date(2023, 11, 31),
            contributionAmount: 1250,
          },
          {
            id: 2,
            name: "House Down Payment",
            targetAmount: 60000,
            currentAmount: 42000,
            startDate: new Date(2022, 0, 1),
            targetDate: new Date(2024, 11, 31),
            contributionAmount: 1500,
          },
        ],
        portfolio: {
          totalValue: 245678,
          allocation: { stocks: 65, bonds: 25, cash: 10 },
          performance: { ytd: 12.4, monthly: 2.1 },
        },
      }

      const generatedInsights = await aiService.generateFinancialInsights(userId, mockFinancialData)
      setInsights(generatedInsights)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Error loading insights:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = () => {
    loadInsights()
  }

  const handleInsightAction = (insight: Insight, action: string) => {
    onInsightAction?.(insight, action)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-50 border-red-200"
      case "medium":
        return "text-amber-500 bg-amber-50 border-amber-200"
      case "low":
        return "text-green-500 bg-green-50 border-green-200"
      default:
        return "text-gray-500 bg-gray-50 border-gray-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "spending":
        return <DollarSign className="h-4 w-4" />
      case "investment":
        return <TrendingUp className="h-4 w-4" />
      case "goals":
        return <Target className="h-4 w-4" />
      case "market":
        return <BarChart3 className="h-4 w-4" />
      default:
        return <Sparkles className="h-4 w-4" />
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "spending-analysis":
        return <PieChart className="h-5 w-5 text-blue-500" />
      case "investment-recommendation":
        return <TrendingUp className="h-5 w-5 text-green-500" />
      case "goal-progress":
        return <Target className="h-5 w-5 text-purple-500" />
      case "market-insight":
        return <BarChart3 className="h-5 w-5 text-orange-500" />
      default:
        return <Brain className="h-5 w-5 text-cyan-500" />
    }
  }

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Financial Insights
          </CardTitle>
          <CardDescription>Loading personalized insights...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Financial Insights
            </CardTitle>
            <CardDescription>Personalized recommendations based on your financial data</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.length === 0 ? (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No insights available at the moment.</p>
              <Button variant="outline" onClick={handleRefresh} className="mt-2">
                Generate Insights
              </Button>
            </div>
          ) : (
            insights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">{getInsightIcon(insight.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-sm">{insight.title}</h4>
                          <Badge variant="outline" className={`text-xs ${getPriorityColor(insight.priority)}`}>
                            {insight.priority}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {getCategoryIcon(insight.category)}
                            <span className="ml-1">{insight.category}</span>
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">{insight.content}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="text-xs text-muted-foreground">
                              Confidence: {Math.round(insight.confidence * 100)}%
                            </div>
                            <Progress value={insight.confidence * 100} className="w-16 h-1" />
                          </div>

                          {insight.actionable && (
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleInsightAction(insight, "view-details")}
                              >
                                View Details
                              </Button>
                              <Button size="sm" onClick={() => handleInsightAction(insight, "take-action")}>
                                Take Action
                                <ArrowRight className="h-3 w-3 ml-1" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  {/* Priority indicator */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${
                      insight.priority === "high"
                        ? "bg-red-500"
                        : insight.priority === "medium"
                          ? "bg-amber-500"
                          : "bg-green-500"
                    }`}
                  />
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
