"use client"

import type * as React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import {
  TrendingUp,
  Target,
  CreditCard,
  Home,
  PiggyBank,
  BarChart3,
  Bell,
  Settings,
  Plus,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoyalDiamondSlabCard } from "@/components/ui/royal-diamond-slab-card"

interface FinancialGoal {
  id: string
  title: string
  target: number
  current: number
  deadline: Date
  priority: "high" | "medium" | "low"
  category: "savings" | "credit" | "investment" | "debt"
}

interface QuickAction {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  category: string
}

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("overview")
  const [goals, setGoals] = useState<FinancialGoal[]>([])
  const [quickActions, setQuickActions] = useState<QuickAction[]>([])

  // Check URL parameters for specific actions
  useEffect(() => {
    const action = searchParams.get("action")
    const goalType = searchParams.get("goalType")
    const focus = searchParams.get("focus")

    if (action === "credit-payment") {
      // Scroll to credit optimization section
      setTimeout(() => {
        const creditSection = document.getElementById("credit-score-section")
        if (creditSection) {
          creditSection.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }

    if (goalType === "emergency-fund" && action === "setup-auto-transfer") {
      // Scroll to savings goals section
      setTimeout(() => {
        const savingsSection = document.getElementById("savings-goals-section")
        if (savingsSection) {
          savingsSection.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }

    if (focus === "credit-optimization") {
      setActiveTab("credit")
    }
  }, [searchParams])

  // Mock data
  useEffect(() => {
    setGoals([
      {
        id: "GOAL-001",
        title: "Emergency Fund",
        target: 15000,
        current: 11000,
        deadline: new Date("2024-12-31"),
        priority: "high",
        category: "savings",
      },
      {
        id: "GOAL-002",
        title: "Credit Score Improvement",
        target: 800,
        current: 750,
        deadline: new Date("2024-06-30"),
        priority: "high",
        category: "credit",
      },
      {
        id: "GOAL-003",
        title: "House Down Payment",
        target: 90000,
        current: 45000,
        deadline: new Date("2025-03-31"),
        priority: "medium",
        category: "savings",
      },
      {
        id: "GOAL-004",
        title: "Investment Portfolio",
        target: 100000,
        current: 73000,
        deadline: new Date("2024-12-31"),
        priority: "medium",
        category: "investment",
      },
    ])

    setQuickActions([
      {
        id: "ACTION-001",
        title: "Apply for 50-Year Loan",
        description: "Get pre-approved with payments 40% lower",
        icon: Home,
        href: "/loans/application",
        category: "loans",
      },
      {
        id: "ACTION-002",
        title: "Check Credit Score",
        description: "View your latest credit report and score",
        icon: CreditCard,
        href: "/credit/report",
        category: "credit",
      },
      {
        id: "ACTION-003",
        title: "Start Trading",
        description: "Access SNAP-DAX trading platform",
        icon: TrendingUp,
        href: "/dashboard/snap-dax",
        category: "trading",
      },
      {
        id: "ACTION-004",
        title: "Browse Properties",
        description: "Explore real estate with 50-year financing",
        icon: Home,
        href: "/real-estate",
        category: "real-estate",
      },
    ])
  }, [])

  const getGoalProgress = (goal: FinancialGoal) => {
    return Math.min((goal.current / goal.target) * 100, 100)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "low":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Financial Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">Your comprehensive financial command center</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <RoyalDiamondSlabCard
            variant="emerald"
            size="md"
            title="Net Worth"
            content="$247,500"
            highlightWords={["Net"]}
            className="h-32"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              <span className="text-sm text-emerald-400">+8.2% this month</span>
            </div>
          </RoyalDiamondSlabCard>

          <RoyalDiamondSlabCard
            variant="sapphire"
            size="md"
            title="Credit Score"
            content="750"
            highlightWords={["Credit"]}
            className="h-32"
            id="credit-optimization-card"
          >
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-400" />
              <span className="text-sm text-blue-400">Excellent</span>
            </div>
          </RoyalDiamondSlabCard>

          <RoyalDiamondSlabCard
            variant="ruby"
            size="md"
            title="Monthly Savings"
            content="$2,450"
            highlightWords={["Savings"]}
            className="h-32"
          >
            <div className="flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-red-400" />
              <span className="text-sm text-red-400">On track</span>
            </div>
          </RoyalDiamondSlabCard>

          <RoyalDiamondSlabCard
            variant="diamond"
            size="md"
            title="Investment Return"
            content="12.4%"
            highlightWords={["Return"]}
            className="h-32"
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-white" />
              <span className="text-sm text-white">YTD performance</span>
            </div>
          </RoyalDiamondSlabCard>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-background/50 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="credit">Credit</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Common tasks and next steps</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {quickActions.map((action) => (
                    <div
                      key={action.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-background/30 hover:bg-background/50 transition-colors cursor-pointer"
                      onClick={() => (window.location.href = action.href)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <action.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{action.title}</p>
                          <p className="text-sm text-muted-foreground">{action.description}</p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="font-medium">Savings Goal Updated</p>
                        <p className="text-sm text-muted-foreground">Emergency fund: $11,000</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-blue-400" />
                      <div>
                        <p className="font-medium">Investment Return</p>
                        <p className="text-sm text-muted-foreground">Portfolio gained $1,250</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">1 day ago</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                      <div>
                        <p className="font-medium">Credit Utilization</p>
                        <p className="text-sm text-muted-foreground">Increased to 28%</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">3 days ago</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6" id="savings-goals-section">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Financial Goals</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map((goal) => (
                <Card key={goal.id} className="bg-background/50 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <Badge className={getPriorityColor(goal.priority)}>{goal.priority} priority</Badge>
                    </div>
                    <CardDescription>
                      Target: ${goal.target.toLocaleString()} by {goal.deadline.toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="font-medium">
                          ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={getGoalProgress(goal)} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{Math.round(getGoalProgress(goal))}% complete</span>
                        <span className="text-muted-foreground">
                          ${(goal.target - goal.current).toLocaleString()} remaining
                        </span>
                      </div>
                    </div>

                    {goal.id === "GOAL-001" && (
                      <div
                        className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                        id="auto-transfer-setup"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Auto-Transfer Setup</span>
                          <Button size="sm">Configure</Button>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Recommended Amount:</span>
                            <span className="font-medium">$450/month</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Frequency:</span>
                            <span>Monthly</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button className="w-full" variant="outline">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Credit Tab */}
          <TabsContent value="credit" className="space-y-6" id="credit-score-section">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Credit Score Overview */}
              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Credit Score Overview</CardTitle>
                  <CardDescription>Current score and improvement recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">750</div>
                    <div className="text-sm text-muted-foreground">Excellent Credit</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Payment History</span>
                      <span className="font-medium text-green-400">100%</span>
                    </div>
                    <div className="flex items-center justify-between" id="credit-utilization-chart">
                      <span className="text-sm">Credit Utilization</span>
                      <span className="font-medium text-yellow-400">28%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Credit Age</span>
                      <span className="font-medium">8.5 years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Credit Mix</span>
                      <span className="font-medium text-green-400">Good</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Credit Improvement */}
              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Improvement Recommendations</CardTitle>
                  <CardDescription>Actions to boost your credit score</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20" id="payment-recommendation">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Strategic Payment</span>
                      <Badge className="bg-blue-500/20 text-blue-400">High Impact</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Pay down $500 on your highest utilization card to reduce overall utilization to 20%
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Potential Score Increase:</span>
                      <span className="font-medium text-green-400">+20 points</span>
                    </div>
                    <Button className="w-full mt-3" id="pay-now-button">
                      Make Payment Now
                    </Button>
                  </div>

                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Credit Limit Increase</span>
                      <Badge className="bg-green-500/20 text-green-400">Medium Impact</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Request a credit limit increase to improve your utilization ratio
                    </p>
                    <Button className="w-full" variant="outline">
                      Request Increase
                    </Button>
                  </div>

                  <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Monitor Credit Report</span>
                      <Badge className="bg-yellow-500/20 text-yellow-400">Maintenance</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Check for errors and monitor changes to your credit report
                    </p>
                    <Button className="w-full" variant="outline">
                      View Full Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Investments Tab */}
          <TabsContent value="investments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Portfolio Overview */}
              <Card className="bg-background/50 backdrop-blur-sm border-white/20" id="portfolio-allocation-chart">
                <CardHeader>
                  <CardTitle>Portfolio Allocation</CardTitle>
                  <CardDescription>Current investment distribution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Technology Stocks</span>
                      <div className="flex items-center gap-2">
                        <Progress value={35} className="w-20 h-2" id="tech-allocation-slider" />
                        <span className="font-medium">35%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">International Funds</span>
                      <div className="flex items-center gap-2">
                        <Progress value={20} className="w-20 h-2" id="international-funds" />
                        <span className="font-medium">20%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Bonds</span>
                      <div className="flex items-center gap-2">
                        <Progress value={25} className="w-20 h-2" />
                        <span className="font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Real Estate</span>
                      <div className="flex items-center gap-2">
                        <Progress value={20} className="w-20 h-2" />
                        <span className="font-medium">20%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Rebalancing Needed</span>
                      <Badge className="bg-yellow-500/20 text-yellow-400">Action Required</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Your tech allocation is 5% above target. Consider rebalancing for optimal diversification.
                    </p>
                    <Button className="w-full" id="rebalance-button">
                      Rebalance Portfolio
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Investment performance and returns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">+12.4%</div>
                      <div className="text-sm text-muted-foreground">YTD Return</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">$73,000</div>
                      <div className="text-sm text-muted-foreground">Total Value</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">1 Month</span>
                      <span className="font-medium text-green-400">+2.1%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">3 Months</span>
                      <span className="font-medium text-green-400">+5.8%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">1 Year</span>
                      <span className="font-medium text-green-400">+12.4%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">All Time</span>
                      <span className="font-medium text-green-400">+18.7%</span>
                    </div>
                  </div>

                  <Button className="w-full">View Detailed Analytics</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
