"use client"

import type * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Target,
  TrendingUp,
  PiggyBank,
  Home,
  GraduationCap,
  Plane,
  Edit,
  Trash2,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
} from "lucide-react"
import { useGoalPrioritizingOrb } from "@/hooks/use-goal-prioritizing-orb"

interface Goal {
  id: string
  title: string
  description: string
  target: number
  current: number
  progress: number
  deadline: string
  priority: "high" | "medium" | "low"
  icon: React.ElementType
  color: string
  monthlyContribution: number
}

const goals: Goal[] = [
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

export default function GoalPrioritizingOrb() {
  const { prioritizedGoals, updateGoalPriority, getGoalRecommendations } = useGoalPrioritizingOrb(goals)

  // Calculate months to reach goal
  const calculateMonthsToGoal = (goal: Goal) => {
    const remaining = goal.target - goal.current
    if (remaining <= 0) return 0
    if (goal.monthlyContribution <= 0) return Number.POSITIVE_INFINITY
    return Math.ceil(remaining / goal.monthlyContribution)
  }

  // Calculate goal status based on deadline vs projected completion
  const getGoalStatus = (goal: Goal) => {
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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Goal Prioritizing Orb
        </h2>
        <p className="text-muted-foreground mt-2">AI-powered financial goal optimization and prioritization</p>
      </div>

      <Tabs defaultValue="goals" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="goals">My Goals</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="analytics">Goal Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prioritizedGoals.map((goal) => {
              const monthsToGoal = calculateMonthsToGoal(goal)
              const monthsDisplay = formatMonthsDisplay(monthsToGoal)
              const goalStatus = getGoalStatus(goal)
              const statusColor = getStatusColor(goalStatus)
              const progressBarColor = getProgressBarColor(goalStatus)
              const StatusIcon = getStatusIcon(goalStatus)

              return (
                <Card
                  key={goal.id}
                  className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${goal.color}/20 to-transparent`}>
                          <goal.icon className={`h-5 w-5 ${goal.color.replace("bg-", "text-")}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{goal.title}</CardTitle>
                          <CardDescription className="text-sm">{goal.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge
                          variant={
                            goal.priority === "high"
                              ? "destructive"
                              : goal.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {goal.priority}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <StatusIcon className={`h-3 w-3 ${statusColor}`} />
                          <span className={`text-xs ${statusColor}`}>{goalStatus.replace("-", " ").toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Progress Section */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">
                          ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                        </span>
                      </div>
                      <div className="relative">
                        <Progress value={goal.progress} className="h-2 bg-white/10" />
                        <div
                          className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-500 ${progressBarColor}`}
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{goal.progress}% complete</span>
                        <span>Target: {new Date(goal.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Time to Goal Section */}
                    <div className="p-3 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Time to Goal</p>
                          <p className={`text-sm font-medium ${statusColor}`}>{monthsDisplay}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Remaining</p>
                          <p className="text-sm font-medium">${(goal.target - goal.current).toLocaleString()}</p>
                        </div>
                      </div>
                      {monthsToGoal > 0 && monthsToGoal !== Number.POSITIVE_INFINITY && (
                        <div className="text-xs text-muted-foreground">
                          At ${goal.monthlyContribution.toLocaleString()}/month
                        </div>
                      )}
                    </div>

                    {/* Monthly Contribution */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div>
                        <p className="text-xs text-muted-foreground">Monthly Contribution</p>
                        <p className="text-sm font-medium">${goal.monthlyContribution.toLocaleString()}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  AI Recommendations
                </CardTitle>
                <CardDescription>Optimize your goal strategy with AI insights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {getGoalRecommendations().map((recommendation, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/10"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-1 rounded bg-yellow-500/20">
                        <Zap className="h-3 w-3 text-yellow-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{recommendation.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{recommendation.description}</p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {recommendation.impact}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Goal Priority Matrix</CardTitle>
                <CardDescription>Visual representation of goal priorities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {prioritizedGoals.slice(0, 3).map((goal, index) => (
                    <div key={goal.id} className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <goal.icon className={`h-4 w-4 ${goal.color.replace("bg-", "text-")}`} />
                          <span className="font-medium text-sm">{goal.title}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={goal.progress} className="flex-1 h-1" />
                          <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Goals</p>
                    <p className="text-2xl font-bold">{goals.length}</p>
                    <p className="text-sm text-blue-500">Active goals</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">On Track</p>
                    <p className="text-2xl font-bold">
                      {goals.filter((goal) => getGoalStatus(goal) === "on-track").length}
                    </p>
                    <p className="text-sm text-green-500">Goals progressing well</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Need Attention</p>
                    <p className="text-2xl font-bold">
                      {goals.filter((goal) => ["at-risk", "behind"].includes(getGoalStatus(goal))).length}
                    </p>
                    <p className="text-sm text-orange-500">Require optimization</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Named export for compatibility
export { GoalPrioritizingOrb }
