"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Target,
  Calculator,
  TrendingUp,
  PiggyBank,
  Home,
  GraduationCap,
  Plane,
  Heart,
  Plus,
  Edit,
  Calendar,
  DollarSign,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { QuantumProfileCard } from "@/components/ui/quantum-profile-card"
import { GoalPrioritizingOrb } from "@/components/genius-guide-orb/goal-prioritizing-orb"

export default function FinancialPlanningPage() {
  const [selectedGoal, setSelectedGoal] = React.useState<string | null>(null)

  const goals = [
    {
      id: "emergency",
      title: "Emergency Fund",
      description: "6 months of expenses",
      target: 100000,
      current: 85000,
      progress: 85,
      deadline: "2024-12-31",
      priority: "high",
      icon: PiggyBank,
      color: "bg-green-500",
      monthlyContribution: 2500,
    },
    {
      id: "retirement",
      title: "Retirement Savings",
      description: "Comfortable retirement by 65",
      target: 1000000,
      current: 450000,
      progress: 45,
      deadline: "2045-01-01",
      priority: "high",
      icon: TrendingUp,
      color: "bg-blue-500",
      monthlyContribution: 3000,
    },
    {
      id: "house",
      title: "Dream Home",
      description: "Down payment for house",
      target: 200000,
      current: 75000,
      progress: 37.5,
      deadline: "2026-06-01",
      priority: "medium",
      icon: Home,
      color: "bg-purple-500",
      monthlyContribution: 4000,
    },
    {
      id: "education",
      title: "Education Fund",
      description: "Children's college fund",
      target: 150000,
      current: 25000,
      progress: 16.7,
      deadline: "2035-09-01",
      priority: "medium",
      icon: GraduationCap,
      color: "bg-orange-500",
      monthlyContribution: 1200,
    },
    {
      id: "vacation",
      title: "Dream Vacation",
      description: "European tour",
      target: 15000,
      current: 8500,
      progress: 56.7,
      deadline: "2024-07-01",
      priority: "low",
      icon: Plane,
      color: "bg-pink-500",
      monthlyContribution: 500,
    },
  ]

  const budgetCategories = [
    { name: "Housing", budgeted: 3500, spent: 3200, remaining: 300, color: "bg-blue-500" },
    { name: "Transportation", budgeted: 800, spent: 750, remaining: 50, color: "bg-green-500" },
    { name: "Food", budgeted: 600, spent: 680, remaining: -80, color: "bg-red-500" },
    { name: "Utilities", budgeted: 300, spent: 285, remaining: 15, color: "bg-purple-500" },
    { name: "Entertainment", budgeted: 400, spent: 320, remaining: 80, color: "bg-orange-500" },
    { name: "Healthcare", budgeted: 250, spent: 180, remaining: 70, color: "bg-pink-500" },
    { name: "Savings", budgeted: 2000, spent: 2000, remaining: 0, color: "bg-cyan-500" },
  ]

  const totalBudgeted = budgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0)
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0)
  const totalRemaining = totalBudgeted - totalSpent

  // Calculate months to reach goal
  const calculateMonthsToGoal = (goal: (typeof goals)[0]) => {
    const remaining = goal.target - goal.current
    if (remaining <= 0) return 0
    if (goal.monthlyContribution <= 0) return Number.POSITIVE_INFINITY
    return Math.ceil(remaining / goal.monthlyContribution)
  }

  // Calculate goal status based on deadline vs projected completion
  const getGoalStatus = (goal: (typeof goals)[0]) => {
    const monthsToGoal = calculateMonthsToGoal(goal)
    const deadlineDate = new Date(goal.deadline)
    const currentDate = new Date()
    const monthsToDeadline = Math.ceil((deadlineDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24 * 30))

    if (monthsToGoal === 0) return "completed"
    if (monthsToGoal === Number.POSITIVE_INFINITY) return "stalled"
    if (monthsToGoal <= monthsToDeadline * 0.8) return "on-track" // 20% buffer
    if (monthsToGoal <= monthsToDeadline * 1.2) return "at-risk" // Within 20% of  // 20% buffer
    if (monthsToGoal <= monthsToDeadline * 1.2) return "at-risk" // Within 20% of deadline
    return "behind"
  }

  // Get progress bar color based on status
  const getProgressBarColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 shadow-emerald-500/50 shadow-lg"
      case "on-track":
        return "bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 shadow-emerald-500/50 shadow-lg"
      case "at-risk":
        return "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-yellow-500/50 shadow-lg"
      case "behind":
        return "bg-gradient-to-r from-red-400 via-red-500 to-red-600 shadow-red-500/50 shadow-lg"
      case "stalled":
        return "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 shadow-gray-500/50 shadow-lg"
      default:
        return "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-blue-500/50 shadow-lg"
    }
  }

  // Calculate overall progress
  const calculateOverallProgress = () => {
    const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0)
    const totalCurrent = goals.reduce((sum, goal) => sum + goal.current, 0)
    const overallProgress = (totalCurrent / totalTarget) * 100

    const onTrackGoals = goals.filter(
      (goal) => getGoalStatus(goal) === "on-track" || getGoalStatus(goal) === "completed",
    ).length
    const atRiskGoals = goals.filter((goal) => getGoalStatus(goal) === "at-risk").length
    const behindGoals = goals.filter((goal) => getGoalStatus(goal) === "behind").length

    let overallStatus = "on-track"
    if (behindGoals > 0) overallStatus = "behind"
    else if (atRiskGoals > 0) overallStatus = "at-risk"

    return {
      progress: overallProgress,
      status: overallStatus,
      onTrack: onTrackGoals,
      atRisk: atRiskGoals,
      behind: behindGoals,
      total: goals.length,
    }
  }

  // Format months display
  const formatMonthsDisplay = (months: number) => {
    if (months === 0) return "Goal Reached!"
    if (months === Number.POSITIVE_INFINITY) return "No contributions"
    if (months <= 12) return `${months} months`

    const years = Math.floor(months / 12)
    const remainingMonths = months % 12

    if (remainingMonths === 0) {
      return years === 1 ? "1 year" : `${years} years`
    } else {
      return `${years}y ${remainingMonths}m`
    }
  }

  // Get status color based on months
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-emerald-500"
      case "on-track":
        return "text-emerald-500"
      case "at-risk":
        return "text-yellow-500"
      case "behind":
        return "text-red-500"
      case "stalled":
        return "text-gray-500"
      default:
        return "text-blue-500"
    }
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle
      case "on-track":
        return CheckCircle
      case "at-risk":
        return AlertTriangle
      case "behind":
        return XCircle
      case "stalled":
        return XCircle
      default:
        return Target
    }
  }

  const overallProgress = calculateOverallProgress()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6 pl-20">
      {/* Quantum Profile Card */}
      <QuantumProfileCard
        overallProgress={overallProgress}
        userInfo={{
          name: "Alexandra Chen",
          email: "alexandra.chen@snappaifi.com",
          role: "admin",
          joinDate: "2023-01-15",
          lastActive: "2 minutes ago",
        }}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Financial Planning
            </h1>
            <p className="text-xl text-muted-foreground mt-2">Plan and track your financial goals and budget</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Calculator className="h-4 w-4 mr-2" />
              Calculator
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Goal
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Goals Value</p>
                  <p className="text-2xl font-bold">$1.47M</p>
                  <p className="text-sm text-green-500">5 active goals</p>
                </div>
                <Target className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Savings</p>
                  <p className="text-2xl font-bold">$11,200</p>
                  <p className="text-sm text-blue-500">Across all goals</p>
                </div>
                <PiggyBank className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Budget Remaining</p>
                  <p className="text-2xl font-bold">${totalRemaining.toLocaleString()}</p>
                  <p className="text-sm text-purple-500">This month</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">On Track Goals</p>
                  <p className="text-2xl font-bold">
                    {overallProgress.onTrack}/{overallProgress.total}
                  </p>
                  <p className="text-sm text-orange-500">
                    {Math.round((overallProgress.onTrack / overallProgress.total) * 100)}% success rate
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="goals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="goals">Financial Goals</TabsTrigger>
            <TabsTrigger value="budget">Budget Tracker</TabsTrigger>
            <TabsTrigger value="projections">Projections</TabsTrigger>
            <TabsTrigger value="tools">Planning Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="goals" className="space-y-6">
            {/* Goal Prioritizing Orb */}
            <GoalPrioritizingOrb />
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Monthly Budget Breakdown</CardTitle>
                  <CardDescription>Track your spending across categories</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {budgetCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${category.color}`} />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-medium">${category.spent.toLocaleString()}</span>
                          <span className="text-muted-foreground"> / ${category.budgeted.toLocaleString()}</span>
                        </div>
                      </div>
                      <Progress value={(category.spent / category.budgeted) * 100} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span className={category.remaining < 0 ? "text-red-500" : "text-green-500"}>
                          {category.remaining < 0 ? "Over by" : "Remaining"}: ${Math.abs(category.remaining)}
                        </span>
                        <span className="text-muted-foreground">
                          {Math.round((category.spent / category.budgeted) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Budget Summary</CardTitle>
                  <CardDescription>This month's overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Budgeted</span>
                      <span className="font-medium">${totalBudgeted.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Spent</span>
                      <span className="font-medium">${totalSpent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-2">
                      <span>Remaining</span>
                      <span className={`font-medium ${totalRemaining < 0 ? "text-red-500" : "text-green-500"}`}>
                        ${totalRemaining.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <h4 className="font-medium mb-2">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Expense
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Budget
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Calendar className="h-4 w-4 mr-2" />
                        View History
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projections" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Goal Projections</CardTitle>
                  <CardDescription>Estimated completion dates based on current contributions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {goals.slice(0, 3).map((goal) => {
                    const monthsRemaining = calculateMonthsToGoal(goal)
                    const projectedDate = new Date()
                    projectedDate.setMonth(projectedDate.getMonth() + monthsRemaining)
                    const monthsDisplay = formatMonthsDisplay(monthsRemaining)
                    const goalStatus = getGoalStatus(goal)
                    const statusColor = getStatusColor(goalStatus)

                    return (
                      <div
                        key={goal.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <goal.icon className={`h-5 w-5 ${goal.color.replace("bg-", "text-")}`} />
                          <div>
                            <h4 className="font-medium">{goal.title}</h4>
                            <p className={`text-sm ${statusColor}`}>{monthsDisplay}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {monthsRemaining === 0 || monthsRemaining === Number.POSITIVE_INFINITY
                              ? "N/A"
                              : projectedDate.toLocaleDateString()}
                          </p>
                          <Badge variant="outline" className={`text-xs ${statusColor}`}>
                            {goalStatus.replace("-", " ").toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Retirement Calculator</CardTitle>
                  <CardDescription>Plan for your retirement needs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="current-age">Current Age</Label>
                      <Input id="current-age" type="number" placeholder="35" />
                    </div>
                    <div>
                      <Label htmlFor="retirement-age">Retirement Age</Label>
                      <Input id="retirement-age" type="number" placeholder="65" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="monthly-income">Desired Monthly Income</Label>
                    <Input id="monthly-income" type="number" placeholder="8000" />
                  </div>
                  <Button className="w-full">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Retirement Needs
                  </Button>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                    <h4 className="font-medium mb-2">Estimated Needs</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Total Required:</span>
                        <span className="font-medium">$2.4M</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Savings:</span>
                        <span className="font-medium">$3,200</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Loan Calculator
                  </CardTitle>
                  <CardDescription>Calculate loan payments and interest</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Open Calculator</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Investment Planner
                  </CardTitle>
                  <CardDescription>Plan your investment strategy</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Planning</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Insurance Calculator
                  </CardTitle>
                  <CardDescription>Determine insurance needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Calculate Coverage</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Mortgage Calculator
                  </CardTitle>
                  <CardDescription>Calculate mortgage payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Calculate Payment</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Tax Optimizer
                  </CardTitle>
                  <CardDescription>Optimize your tax strategy</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Optimize Taxes</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Goal Tracker
                  </CardTitle>
                  <CardDescription>Advanced goal tracking tools</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Track Goals</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
