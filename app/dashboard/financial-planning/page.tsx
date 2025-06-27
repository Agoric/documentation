"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Brain,
  Target,
  TrendingUp,
  DollarSign,
  PieChart,
  Calculator,
  Sparkles,
  Crown,
  Rocket,
  Shield,
  Zap,
  Home,
  CreditCard,
  Banknote,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FuturisticCard } from "@/components/ui/futuristic-card"
import { usePremiumUnlock } from "@/contexts/premium-unlock-context"
import { useGoalPrioritizingOrb } from "@/hooks/use-goal-prioritizing-orb"
import { cn } from "@/lib/utils"

export default function FinancialPlanningPage() {
  const { isPremiumUnlocked, unlockAllFeatures } = usePremiumUnlock()
  const {
    goals,
    recommendations,
    userProfile,
    financialHealthScore,
    contextualInsights,
    getGoalRecommendations,
    updateGoalProgress,
    prioritizeGoals,
  } = useGoalPrioritizingOrb()

  // Auto-unlock premium features
  React.useEffect(() => {
    unlockAllFeatures()
  }, [unlockAllFeatures])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "text-green-400"
      case "at-risk":
        return "text-yellow-400"
      case "behind":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-track":
        return CheckCircle
      case "at-risk":
        return AlertTriangle
      case "behind":
        return TrendingDown
      default:
        return Clock
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "savings":
        return Banknote
      case "investment":
        return TrendingUp
      case "debt":
        return CreditCard
      case "property":
        return Home
      case "retirement":
        return Shield
      default:
        return Target
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "savings":
        return "from-green-500/20 to-emerald-500/20 border-green-500/30"
      case "investment":
        return "from-blue-500/20 to-cyan-500/20 border-blue-500/30"
      case "debt":
        return "from-red-500/20 to-pink-500/20 border-red-500/30"
      case "property":
        return "from-purple-500/20 to-violet-500/20 border-purple-500/30"
      case "retirement":
        return "from-yellow-500/20 to-orange-500/20 border-yellow-500/30"
      default:
        return "from-gray-500/20 to-slate-500/20 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pl-20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                <Brain className="h-8 w-8 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AI Financial Planning
                </h1>
                <p className="text-gray-400">Quantum-powered financial optimization and goal management</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30">
              <Crown className="h-4 w-4 mr-1" />
              Premium Unlocked
            </Badge>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">{financialHealthScore}%</div>
              <div className="text-sm text-gray-400">Financial Health</div>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FuturisticCard variant="neon" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Goals</p>
                <p className="text-2xl font-bold text-cyan-400">{goals.length}</p>
              </div>
              <Target className="h-8 w-8 text-cyan-400" />
            </div>
          </FuturisticCard>

          <FuturisticCard variant="holographic" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">AI Recommendations</p>
                <p className="text-2xl font-bold text-purple-400">{recommendations.length}</p>
              </div>
              <Sparkles className="h-8 w-8 text-purple-400" />
            </div>
          </FuturisticCard>

          <FuturisticCard variant="quantum" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Credit Score</p>
                <p className="text-2xl font-bold text-green-400">{userProfile.creditScore}</p>
              </div>
              <Shield className="h-8 w-8 text-green-400" />
            </div>
          </FuturisticCard>

          <FuturisticCard variant="neural" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Monthly Surplus</p>
                <p className="text-2xl font-bold text-blue-400">
                  ${(userProfile.monthlyIncome - userProfile.monthlyExpenses).toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-400" />
            </div>
          </FuturisticCard>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="goals" className="space-y-6">
          <TabsList className="bg-gray-800/50 border border-gray-700">
            <TabsTrigger
              value="goals"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-cyan-400"
            >
              <Target className="h-4 w-4 mr-2" />
              Goals
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-500/20 data-[state=active]:text-purple-400"
            >
              <Brain className="h-4 w-4 mr-2" />
              AI Recommendations
            </TabsTrigger>
            <TabsTrigger
              value="tools"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500/20 data-[state=active]:to-emerald-500/20 data-[state=active]:text-green-400"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Quantum Tools
            </TabsTrigger>
            <TabsTrigger
              value="insights"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500/20 data-[state=active]:to-orange-500/20 data-[state=active]:text-yellow-400"
            >
              <Zap className="h-4 w-4 mr-2" />
              Neural Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="goals" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Financial Goals</h2>
              <Button
                onClick={prioritizeGoals}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                <Rocket className="h-4 w-4 mr-2" />
                AI Prioritize
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal) => {
                const StatusIcon = getStatusIcon(goal.status)
                const CategoryIcon = getCategoryIcon(goal.category)

                return (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      className={cn(
                        "bg-gradient-to-br backdrop-blur-sm border hover:shadow-2xl transition-all duration-300",
                        getCategoryColor(goal.category),
                      )}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white/10">
                              <CategoryIcon className="h-5 w-5" />
                            </div>
                            <div>
                              <CardTitle className="text-lg text-white">{goal.title}</CardTitle>
                              <p className="text-sm text-gray-300 capitalize">{goal.category}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={cn("text-xs", getStatusColor(goal.status))}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {goal.status.replace("-", " ")}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs",
                                goal.priority === "high"
                                  ? "text-red-400 border-red-400/30"
                                  : goal.priority === "medium"
                                    ? "text-yellow-400 border-yellow-400/30"
                                    : "text-green-400 border-green-400/30",
                              )}
                            >
                              {goal.priority}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-gray-300">{goal.description}</p>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white font-medium">{goal.progress}%</span>
                          </div>
                          <Progress
                            value={goal.progress}
                            className="h-2 bg-gray-700"
                            style={{
                              background: `linear-gradient(to right, 
                                ${goal.progress >= 80 ? "#10b981" : goal.progress >= 50 ? "#f59e0b" : "#ef4444"} 0%, 
                                ${goal.progress >= 80 ? "#059669" : goal.progress >= 50 ? "#d97706" : "#dc2626"} 100%)`,
                            }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-gray-400">
                            <Clock className="h-3 w-3" />
                            {goal.timeframe}
                          </div>
                          <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">AI-Powered Recommendations</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recommendations.map((rec) => (
                <FuturisticCard key={rec.id} variant="holographic" className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{rec.title}</h3>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs mt-1",
                            rec.impact === "high"
                              ? "text-red-400 border-red-400/30"
                              : rec.impact === "medium"
                                ? "text-yellow-400 border-yellow-400/30"
                                : "text-green-400 border-green-400/30",
                          )}
                        >
                          {rec.impact} impact
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-cyan-400 font-medium">{rec.confidence}%</div>
                        <div className="text-xs text-gray-400">AI Confidence</div>
                      </div>
                    </div>
                    <p className="text-gray-300">{rec.description}</p>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      <Sparkles className="h-4 w-4 mr-2" />
                      {rec.action}
                    </Button>
                  </div>
                </FuturisticCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Quantum Financial Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "AI Loan Calculator",
                  description: "Calculate optimal loan terms with quantum precision",
                  icon: Calculator,
                  color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
                },
                {
                  title: "Neural Budget Optimizer",
                  description: "AI-powered budget optimization and expense tracking",
                  icon: PieChart,
                  color: "from-green-500/20 to-emerald-500/20 border-green-500/30",
                },
                {
                  title: "Quantum Investment Planner",
                  description: "Advanced portfolio optimization with machine learning",
                  icon: TrendingUp,
                  color: "from-purple-500/20 to-violet-500/20 border-purple-500/30",
                },
                {
                  title: "Holographic Debt Analyzer",
                  description: "3D visualization of debt payoff strategies",
                  icon: CreditCard,
                  color: "from-red-500/20 to-pink-500/20 border-red-500/30",
                },
                {
                  title: "AI Retirement Simulator",
                  description: "Simulate retirement scenarios with quantum modeling",
                  icon: Shield,
                  color: "from-yellow-500/20 to-orange-500/20 border-yellow-500/30",
                },
                {
                  title: "Neural Tax Optimizer",
                  description: "AI-driven tax optimization and planning strategies",
                  icon: DollarSign,
                  color: "from-indigo-500/20 to-blue-500/20 border-indigo-500/30",
                },
              ].map((tool, index) => (
                <FuturisticCard key={index} variant="quantum" className={cn("p-6", tool.color)}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-white/10">
                        <tool.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{tool.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{tool.description}</p>
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                      <Brain className="h-4 w-4 mr-2" />
                      Launch Tool
                    </Button>
                  </div>
                </FuturisticCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Neural Financial Insights</h2>
            <div className="space-y-4">
              {contextualInsights.map((insight, index) => (
                <FuturisticCard key={index} variant="neural" className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20">
                        <Zap className="h-6 w-6 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white capitalize">{insight.type} Insight</h3>
                        <p className="text-gray-300">{insight.message}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
                    >
                      {insight.action}
                    </Button>
                  </div>
                </FuturisticCard>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
