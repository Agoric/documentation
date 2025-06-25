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
  Trash2,
  Calendar,
  DollarSign,
  Zap,
} from "lucide-react"

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
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
                  <p className="text-2xl font-bold">4/5</p>
                  <p className="text-sm text-orange-500">80% success rate</p>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {goals.map((goal) => (
                <Card
                  key={goal.id}
                  className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${goal.color}/20 to-transparent`}>
                          <goal.icon className={`h-5 w-5 ${goal.color.replace("bg-", "text-")}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{goal.title}</CardTitle>
                          <CardDescription>{goal.description}</CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant={
                          goal.priority === "high"
                            ? "destructive"
                            : goal.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {goal.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{goal.progress}% complete</span>
                        <span>Target: {new Date(goal.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Contribution</p>
                        <p className="font-medium">${goal.monthlyContribution.toLocaleString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Expense
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Budget
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
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
                    const monthsRemaining = Math.ceil((goal.target - goal.current) / goal.monthlyContribution)
                    const projectedDate = new Date()
                    projectedDate.setMonth(projectedDate.getMonth() + monthsRemaining)

                    return (
                      <div
                        key={goal.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <goal.icon className={`h-5 w-5 ${goal.color.replace("bg-", "text-")}`} />
                          <div>
                            <h4 className="font-medium">{goal.title}</h4>
                            <p className="text-sm text-muted-foreground">{monthsRemaining} months remaining</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{projectedDate.toLocaleDateString()}</p>
                          <Badge variant="outline" className="text-xs">
                            {monthsRemaining < 12 ? "On Track" : "Long Term"}
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
