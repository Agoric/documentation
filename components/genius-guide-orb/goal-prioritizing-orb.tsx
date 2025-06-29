"use client"

import type React from "react"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  CheckCircle,
  Edit,
  Home,
  PiggyBank,
  Plane,
  RefreshCw,
  Target,
  Trash2,
  TrendingUp,
  Zap,
  GraduationCap,
} from "lucide-react"
import { useGoalPrioritizingOrb } from "@/hooks/use-goal-prioritizing-orb"

type Priority = "high" | "medium" | "low"

interface Goal {
  id: string
  title: string
  description: string
  target: number
  current: number
  progress: number
  deadline: string
  priority: Priority
  icon: React.ElementType
  color: string // Tailwind bg- class e.g. bg-green-500
  monthlyContribution: number
}

/* ------------------------------------------------------------------ */
/* The presentation-ready goal data lives locally. Keep the hook just
   for AI recommendations & future logic.                              */
/* ------------------------------------------------------------------ */
const goals: Goal[] = [
  {
    id: "emergency",
    title: "Emergency Fund",
    description: "Six months of expenses",
    target: 100_000,
    current: 85_000,
    progress: 85,
    deadline: "2024-12-31",
    priority: "high",
    icon: PiggyBank,
    color: "bg-green-500",
    monthlyContribution: 2_500,
  },
  {
    id: "retirement",
    title: "Retirement Savings",
    description: "Comfortable retirement by 65",
    target: 1_000_000,
    current: 450_000,
    progress: 45,
    deadline: "2045-01-01",
    priority: "high",
    icon: TrendingUp,
    color: "bg-blue-500",
    monthlyContribution: 3_000,
  },
  {
    id: "house",
    title: "Dream Home",
    description: "Down payment for dream home",
    target: 200_000,
    current: 75_000,
    progress: 37.5,
    deadline: "2026-06-01",
    priority: "medium",
    icon: Home,
    color: "bg-purple-500",
    monthlyContribution: 4_000,
  },
  {
    id: "education",
    title: "Education Fund",
    description: "Children’s college fund",
    target: 150_000,
    current: 25_000,
    progress: 16.7,
    deadline: "2035-09-01",
    priority: "medium",
    icon: GraduationCap,
    color: "bg-orange-500",
    monthlyContribution: 1_200,
  },
  {
    id: "vacation",
    title: "Dream Vacation",
    description: "European tour",
    target: 15_000,
    current: 8_500,
    progress: 56.7,
    deadline: "2024-07-01",
    priority: "low",
    icon: Plane,
    color: "bg-pink-500",
    monthlyContribution: 500,
  },
]

export default function GoalPrioritizingOrb() {
  const { getGoalRecommendations } = useGoalPrioritizingOrb()

  /* ---------- helpers ------------------------------------------------ */

  const monthsToGoal = (g: Goal) => {
    const remaining = g.target - g.current
    if (remaining <= 0) return 0
    if (!g.monthlyContribution) return Number.POSITIVE_INFINITY
    return Math.ceil(remaining / g.monthlyContribution)
  }

  const monthsDisplay = (m: number) =>
    m === 0
      ? "Goal Reached!"
      : m === Number.POSITIVE_INFINITY
        ? "No contributions"
        : m < 12
          ? `${m} months`
          : `${Math.floor(m / 12)}y ${m % 12}m`

  const goalStatus = (g: Goal) => {
    const mGoal = monthsToGoal(g)
    if (mGoal === 0) return "completed"
    const mDeadline = (new Date(g.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30)
    if (mGoal === Number.POSITIVE_INFINITY) return "stalled"
    if (mGoal <= mDeadline * 0.8) return "on-track"
    if (mGoal <= mDeadline * 1.2) return "at-risk"
    return "behind"
  }

  const progressBarColor = (status: string) =>
    ({
      completed: "from-emerald-400 via-emerald-500 to-emerald-600",
      "on-track": "from-emerald-400 via-emerald-500 to-emerald-600",
      "at-risk": "from-yellow-400 via-yellow-500 to-yellow-600",
      behind: "from-red-400 via-red-500 to-red-600",
      stalled: "from-gray-400 via-gray-500 to-gray-600",
    })[status] ?? "from-blue-400 via-blue-500 to-blue-600"

  const statusMeta = (status: string) =>
    ({
      completed: { color: "text-emerald-500", Icon: CheckCircle },
      "on-track": { color: "text-emerald-500", Icon: CheckCircle },
      "at-risk": { color: "text-yellow-500", Icon: AlertTriangle },
      behind: { color: "text-red-500", Icon: AlertTriangle },
      stalled: { color: "text-gray-500", Icon: AlertTriangle },
    })[status] ?? { color: "text-blue-500", Icon: Target }

  /* ---------- memoised counts for Analytics tab --------------------- */
  const analytics = useMemo(() => {
    const onTrack = goals.filter((g) => ["completed", "on-track"].includes(goalStatus(g))).length
    const needAttention = goals.filter((g) => ["at-risk", "behind"].includes(goalStatus(g))).length
    return { total: goals.length, onTrack, needAttention }
  }, [])

  /* ---------- render ------------------------------------------------- */
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Goal Prioritizing Orb
        </h2>
        <p className="text-muted-foreground mt-2">AI-powered financial goal optimisation</p>
      </div>

      <Tabs defaultValue="goals" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="goals">My Goals</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="analytics">Goal Analytics</TabsTrigger>
        </TabsList>

        {/* ------------------- GOAL CARDS ------------------------------ */}
        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((g) => {
              const status = goalStatus(g)
              const { color: statusColor, Icon: StatusIcon } = statusMeta(status)
              return (
                <Card
                  key={g.id}
                  className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${g.color}/20`}>
                          <g.icon className={`h-5 w-5 ${g.color.replace("bg-", "text-")}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{g.title}</CardTitle>
                          <CardDescription className="text-sm">{g.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge
                          variant={
                            g.priority === "high" ? "destructive" : g.priority === "medium" ? "default" : "secondary"
                          }
                          className="text-xs capitalize"
                        >
                          {g.priority}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <StatusIcon className={`h-3 w-3 ${statusColor}`} />
                          <span className={`text-xs ${statusColor}`}>{status.replace("-", " ").toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">
                          ${g.current.toLocaleString()} / ${g.target.toLocaleString()}
                        </span>
                      </div>
                      <div className="relative">
                        <Progress value={g.progress} className="h-2 bg-white/10" />
                        <div
                          className={`absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r ${progressBarColor(
                            status,
                          )} transition-all`}
                          style={{ width: `${g.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{g.progress}% complete</span>
                        <span>Target: {new Date(g.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Time to goal */}
                    <div className="p-3 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Time to Goal</p>
                          <p className={`text-sm font-medium ${statusColor}`}>{monthsDisplay(monthsToGoal(g))}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Remaining</p>
                          <p className="text-sm font-medium">${(g.target - g.current).toLocaleString()}</p>
                        </div>
                      </div>
                      {monthsToGoal(g) > 0 && monthsToGoal(g) !== Number.POSITIVE_INFINITY && (
                        <div className="text-xs text-muted-foreground">
                          @ ${g.monthlyContribution.toLocaleString()}/month
                        </div>
                      )}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div>
                        <p className="text-xs text-muted-foreground">Monthly Contribution</p>
                        <p className="text-sm font-medium">${g.monthlyContribution.toLocaleString()}</p>
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

        {/* ---------------- RECOMMENDATIONS ---------------------------- */}
        <TabsContent value="recommendations" className="space-y-6">
          <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                AI Recommendations
              </CardTitle>
              <CardDescription>Optimise your strategy with AI insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {getGoalRecommendations().map((r) => (
                <div
                  key={r.id}
                  className="p-3 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/10"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-1 rounded bg-yellow-500/20">
                      <Zap className="h-3 w-3 text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{r.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{r.description}</p>
                      <Badge variant="outline" className="mt-2 text-xs capitalize">
                        {r.impact}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------------- ANALYTICS ------------------------------- */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Goals</p>
                    <p className="text-2xl font-bold">{analytics.total}</p>
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
                    <p className="text-2xl font-bold">{analytics.onTrack}</p>
                    <p className="text-sm text-green-500">Progressing well</p>
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
                    <p className="text-2xl font-bold">{analytics.needAttention}</p>
                    <p className="text-sm text-orange-500">Requires action</p>
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

export { GoalPrioritizingOrb }
