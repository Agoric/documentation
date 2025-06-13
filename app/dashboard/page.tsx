"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  TrendingUp,
  DollarSign,
  Target,
  BarChart3,
  MessageSquare,
  Sparkles,
  Settings,
  Bell,
  Search,
} from "lucide-react"
import { AIChatInterface } from "@/components/ai/ai-chat-interface"
import { AIInsightsDashboard } from "@/components/ai/ai-insights-dashboard"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [notifications, setNotifications] = useState(3)
  const [financialData, setFinancialData] = useState<any>(null)

  useEffect(() => {
    // Load user's financial data
    loadFinancialData()
  }, [])

  const loadFinancialData = async () => {
    // Simulate loading financial data
    const mockData = {
      totalBalance: 342156.78,
      monthlyIncome: 7500,
      monthlyExpenses: 4200,
      savingsRate: 0.44,
      portfolioValue: 245678.9,
      portfolioGrowth: 12.4,
      goals: [
        {
          id: 1,
          name: "Emergency Fund",
          targetAmount: 15000,
          currentAmount: 9750,
          progress: 65,
          dueDate: "Dec 2024",
        },
        {
          id: 2,
          name: "House Down Payment",
          targetAmount: 60000,
          currentAmount: 42000,
          progress: 70,
          dueDate: "Jun 2025",
        },
      ],
      recentTransactions: [
        { id: 1, description: "Salary Deposit", amount: 7500, date: "2024-01-15", category: "Income" },
        { id: 2, description: "Rent Payment", amount: -2200, date: "2024-01-01", category: "Housing" },
        { id: 3, description: "Grocery Shopping", amount: -156.78, date: "2024-01-14", category: "Food" },
      ],
    }
    setFinancialData(mockData)
  }

  const handleAIAction = (action: string, data?: any) => {
    console.log("AI Action triggered:", action, data)

    switch (action) {
      case "portfolio-analysis":
        setActiveTab("investments")
        break
      case "budget-analysis":
        setActiveTab("budget")
        break
      case "goal-adjustment":
        setActiveTab("goals")
        break
      case "market-analysis":
        setActiveTab("market")
        break
      default:
        console.log("Unknown action:", action)
    }
  }

  const handleInsightAction = (insight: any, action: string) => {
    console.log("Insight action:", insight, action)

    if (!insight || !action) return

    if (action === "take-action" && insight?.category) {
      // Navigate to relevant section based on insight category
      switch (insight.category) {
        case "spending":
          setActiveTab("budget")
          break
        case "investment":
          setActiveTab("investments")
          break
        case "goals":
          setActiveTab("goals")
          break
        case "market":
          setActiveTab("market")
          break
        default:
          // Default action if category doesn't match
          console.log("Unknown category:", insight.category)
          break
      }
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Financial Dashboard</h1>
          <p className="text-muted-foreground">AI-powered insights and comprehensive financial management</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {notifications}
              </span>
            )}
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Financial Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${financialData?.totalBalance?.toLocaleString() || "0"}</div>
                  <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${financialData?.portfolioValue?.toLocaleString() || "0"}</div>
                  <p className="text-xs text-muted-foreground">+{financialData?.portfolioGrowth || 0}% YTD</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Math.round((financialData?.savingsRate || 0) * 100)}%</div>
                  <p className="text-xs text-muted-foreground">Above recommended 20%</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{financialData?.goals?.length || 0}</div>
                  <p className="text-xs text-muted-foreground">2 on track, 0 behind</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* AI Insights and Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AIInsightsDashboard financialData={financialData} onInsightAction={handleInsightAction} />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Quick AI Assistant
                </CardTitle>
                <CardDescription>Get instant financial advice and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <AIChatInterface context={financialData} onActionTrigger={handleAIAction} compact={true} />
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest financial activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {financialData?.recentTransactions?.map((transaction: any, index: number) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.category} • {transaction.date}
                      </div>
                    </div>
                    <div className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                      {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-assistant" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Financial Assistant
              </CardTitle>
              <CardDescription>Your personal AI advisor for comprehensive financial guidance</CardDescription>
            </CardHeader>
            <CardContent>
              <AIChatInterface context={financialData} onActionTrigger={handleAIAction} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Investment Portfolio</CardTitle>
              <CardDescription>AI-optimized portfolio management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Investment portfolio management with AI optimization</p>
                <Button onClick={() => setActiveTab("ai-assistant")}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Get AI Investment Advice
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Budget Management</CardTitle>
              <CardDescription>AI-powered spending analysis and optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Smart budget tracking with AI insights</p>
                <Button onClick={() => setActiveTab("ai-assistant")}>
                  <Brain className="h-4 w-4 mr-2" />
                  Analyze My Spending
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Goals</CardTitle>
              <CardDescription>AI-assisted goal planning and tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {financialData?.goals?.map((goal: any, index: number) => (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 border rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{goal.name}</h3>
                      <span className="text-sm text-muted-foreground">{goal.dueDate}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>${goal.currentAmount.toLocaleString()}</span>
                        <span>${goal.targetAmount.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">{goal.progress}% complete</div>
                    </div>
                  </motion.div>
                ))}
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("ai-assistant")}>
                  <Target className="h-4 w-4 mr-2" />
                  Get AI Goal Planning Help
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Intelligence</CardTitle>
              <CardDescription>AI-powered market analysis and predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Real-time market insights with AI predictions</p>
                <Button onClick={() => setActiveTab("ai-assistant")}>
                  <Brain className="h-4 w-4 mr-2" />
                  Get Market Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
