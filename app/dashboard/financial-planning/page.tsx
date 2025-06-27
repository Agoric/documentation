"use client"

import * as React from "react"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FuturisticCard } from "@/components/ui/futuristic-card"
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
  Sparkles,
  Brain,
  Rocket,
  Shield,
  Crown,
} from "lucide-react"
import { QuantumProfileCard } from "@/components/ui/quantum-profile-card"
import { GoalPrioritizingOrb } from "@/components/genius-guide-orb/goal-prioritizing-orb"
import { usePremiumUnlock } from "@/contexts/premium-unlock-context"

export default function FinancialPlanningPage() {
  const { isPremiumUnlocked, unlockAllFeatures } = usePremiumUnlock()
  const [selectedGoal, setSelectedGoal] = React.useState<string | null>(null)

  // Unlock all features on mount
  React.useEffect(() => {
    unlockAllFeatures()
  }, [unlockAllFeatures])

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
    if (monthsToGoal <= monthsToDeadline * 0.8) return "on-track"
    if (monthsToGoal <= monthsToDeadline * 1.2) return "at-risk"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/20 to-purple-950/20 p-6 pl-20">
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
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Financial Planning
            </h1>
            <p className="text-xl text-slate-400 mt-2 flex items-center gap-2">
              <Brain className="h-5 w-5 text-cyan-400" />
              AI-powered financial goal optimization and wealth management
            </p>
            {isPremiumUnlocked && (
              <Badge className="mt-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black">
                <Crown className="h-3 w-3 mr-1" />
                All Premium Features Unlocked
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
            >
              <Calculator className="h-4 w-4 mr-2" />
              AI Calculator
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Goal
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <FuturisticCard variant="hologram" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Goals Value</p>
                <p className="text-2xl font-bold text-white">$1.47M</p>
                <p className="text-sm text-emerald-400 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />5 active goals
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <Target className="h-8 w-8 text-blue-400" />
              </div>
            </div>
          </FuturisticCard>

          <FuturisticCard variant="neon" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Monthly Savings</p>
                <p className="text-2xl font-bold text-white">$11,200</p>
                <p className="text-sm text-cyan-400 flex items-center gap-1">
                  <Rocket className="h-3 w-3" />
                  Across all goals
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                <PiggyBank className="h-8 w-8 text-green-400" />
              </div>
            </div>
          </FuturisticCard>

          <FuturisticCard variant="quantum" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Budget Remaining</p>
                <p className="text-2xl font-bold text-white">${totalRemaining.toLocaleString()}</p>
                <p className="text-sm text-purple-400 flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  This month
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                <DollarSign className="h-8 w-8 text-purple-400" />
              </div>
            </div>
          </FuturisticCard>

          <FuturisticCard variant="plasma" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">On Track Goals</p>
                <p className="text-2xl font-bold text-white">
                  {overallProgress.onTrack}/{overallProgress.total}
                </p>
                <p className="text-sm text-orange-400 flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  {Math.round((overallProgress.onTrack / overallProgress.total) * 100)}% success rate
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20">
                <TrendingUp className="h-8 w-8 text-orange-400" />
              </div>
            </div>
          </FuturisticCard>
        </div>

        <Tabs defaultValue="goals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-900/50 border border-slate-700/50">
            <TabsTrigger
              value="goals"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-cyan-400"
            >
              Financial Goals
            </TabsTrigger>
            <TabsTrigger
              value="budget"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500/20 data-[state=active]:to-emerald-500/20 data-[state=active]:text-green-400"
            >
              Budget Tracker
            </TabsTrigger>
            <TabsTrigger
              value="projections"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-500/20 data-[state=active]:text-purple-400"
            >
              AI Projections
            </TabsTrigger>
            <TabsTrigger
              value="tools"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/20 data-[state=active]:to-red-500/20 data-[state=active]:text-orange-400"
            >
              Planning Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="goals" className="space-y-6">
            {/* Goal Prioritizing Orb */}
            <GoalPrioritizingOrb />
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <FuturisticCard variant="glass" className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="h-5 w-5 text-cyan-400" />
                    Monthly Budget Breakdown
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    AI-powered spending analysis across categories
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {budgetCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${category.color} shadow-lg`} />
                          <span className="font-medium text-white">{category.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-medium text-white">${category.spent.toLocaleString()}</span>
                          <span className="text-slate-400"> / ${category.budgeted.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="relative">
                        <Progress value={(category.spent / category.budgeted) * 100} className="h-2 bg-slate-800" />
                        <div
                          className={`absolute top-0 left-0 h-2 rounded-full ${category.color} shadow-lg`}
                          style={{ width: `${(category.spent / category.budgeted) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={category.remaining < 0 ? "text-red-400" : "text-emerald-400"}>
                          {category.remaining < 0 ? "Over by" : "Remaining"}: ${Math.abs(category.remaining)}
                        </span>
                        <span className="text-slate-400">
                          {Math.round((category.spent / category.budgeted) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </FuturisticCard>

              <FuturisticCard variant="neural">
                <CardHeader>
                  <CardTitle className="text-white">Budget Summary</CardTitle>
                  <CardDescription className="text-slate-400">This month's overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Budgeted</span>
                      <span className="font-medium text-white">${totalBudgeted.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Spent</span>
                      <span className="font-medium text-white">${totalSpent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-700 pt-2">
                      <span className="text-slate-400">Remaining</span>
                      <span className={`font-medium ${totalRemaining < 0 ? "text-red-400" : "text-emerald-400"}`}>
                        ${totalRemaining.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-700">
                    <h4 className="font-medium mb-2 text-white">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Expense
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Budget
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        View History
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </FuturisticCard>
            </div>
          </TabsContent>

          <TabsContent value="projections" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FuturisticCard variant="hologram">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="h-5 w-5 text-cyan-400" />
                    AI Goal Projections
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Machine learning-powered completion predictions
                  </CardDescription>
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
                        className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${goal.color}/20`}>
                            <goal.icon className={`h-5 w-5 ${goal.color.replace("bg-", "text-")}`} />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{goal.title}</h4>
                            <p className={`text-sm ${statusColor}`}>{monthsDisplay}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-white">
                            {monthsRemaining === 0 || monthsRemaining === Number.POSITIVE_INFINITY
                              ? "N/A"
                              : projectedDate.toLocaleDateString()}
                          </p>
                          <Badge variant="outline" className={`text-xs ${statusColor} border-current`}>
                            {goalStatus.replace("-", " ").toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </FuturisticCard>

              <FuturisticCard variant="quantum">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-purple-400" />
                    Quantum Retirement Calculator
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Advanced retirement planning with AI optimization
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="current-age" className="text-slate-300">
                        Current Age
                      </Label>
                      <Input
                        id="current-age"
                        type="number"
                        placeholder="35"
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="retirement-age" className="text-slate-300">
                        Retirement Age
                      </Label>
                      <Input
                        id="retirement-age"
                        type="number"
                        placeholder="65"
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="monthly-income" className="text-slate-300">
                      Desired Monthly Income
                    </Label>
                    <Input
                      id="monthly-income"
                      type="number"
                      placeholder="8000"
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                    <Brain className="h-4 w-4 mr-2" />
                    Calculate with AI
                  </Button>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                    <h4 className="font-medium mb-2 text-white flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-purple-400" />
                      AI-Optimized Projections
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Total Required:</span>
                        <span className="font-medium text-white">$2.4M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Monthly Savings:</span>
                        <span className="font-medium text-white">$3,200</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">AI Confidence:</span>
                        <span className="font-medium text-emerald-400">94%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </FuturisticCard>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FuturisticCard variant="neon">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Calculator className="h-5 w-5 text-cyan-400" />
                    AI Loan Calculator
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Smart loan optimization with machine learning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600">
                    <Brain className="h-4 w-4 mr-2" />
                    Open AI Calculator
                  </Button>
                </CardContent>
              </FuturisticCard>

              <FuturisticCard variant="hologram">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    Quantum Investment Planner
                  </CardTitle>
                  <CardDescription className="text-slate-400">AI-powered portfolio optimization</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600">
                    <Rocket className="h-4 w-4 mr-2" />
                    Start AI Planning
                  </Button>
                </CardContent>
              </FuturisticCard>

              <FuturisticCard variant="quantum">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Heart className="h-5 w-5 text-purple-400" />
                    Neural Insurance Calculator
                  </CardTitle>
                  <CardDescription className="text-slate-400">AI-driven coverage optimization</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600">
                    <Shield className="h-4 w-4 mr-2" />
                    Calculate Coverage
                  </Button>
                </CardContent>
              </FuturisticCard>

              <FuturisticCard variant="plasma">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Home className="h-5 w-5 text-orange-400" />
                    Holographic Mortgage Calculator
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    3D mortgage visualization and optimization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Calculate Payment
                  </Button>
                </CardContent>
              </FuturisticCard>

              <FuturisticCard variant="neural">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    Quantum Tax Optimizer
                  </CardTitle>
                  <CardDescription className="text-slate-400">AI-powered tax strategy optimization</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-600">
                    <Brain className="h-4 w-4 mr-2" />
                    Optimize Taxes
                  </Button>
                </CardContent>
              </FuturisticCard>

              <FuturisticCard variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Target className="h-5 w-5 text-blue-400" />
                    Neural Goal Tracker
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Advanced AI goal tracking and optimization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Track Goals
                  </Button>
                </CardContent>
              </FuturisticCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
