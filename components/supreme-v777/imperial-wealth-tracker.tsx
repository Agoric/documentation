"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Crown,
  TrendingUp,
  DollarSign,
  Target,
  Star,
  Trophy,
  Diamond,
  Gem,
  Zap,
  Shield,
  Globe,
  Building,
  Wallet,
  BarChart3,
  LineChart,
  Plus,
  Clock,
  ArrowUp,
  ArrowDown,
  Percent,
} from "lucide-react"

interface WealthMetrics {
  totalNetWorth: number
  liquidAssets: number
  investments: number
  realEstate: number
  business: number
  crypto: number
  monthlyIncome: number
  monthlyExpenses: number
  savingsRate: number
  wealthGrowthRate: number
}

interface WealthGoal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: Date
  category: "retirement" | "real-estate" | "business" | "luxury" | "education"
  priority: "high" | "medium" | "low"
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  unlockedAt: Date
  rarity: "common" | "rare" | "epic" | "legendary"
}

export function ImperialWealthTracker() {
  const [metrics, setMetrics] = useState<WealthMetrics>({
    totalNetWorth: 3847293.5,
    liquidAssets: 847293.5,
    investments: 1847293.5,
    realEstate: 950000.0,
    business: 150000.0,
    crypto: 52706.5,
    monthlyIncome: 45000.0,
    monthlyExpenses: 18500.0,
    savingsRate: 58.9,
    wealthGrowthRate: 23.4,
  })

  const [goals, setGoals] = useState<WealthGoal[]>([
    {
      id: "1",
      title: "Retirement Fund",
      targetAmount: 5000000,
      currentAmount: 1847293.5,
      deadline: new Date("2045-12-31"),
      category: "retirement",
      priority: "high",
    },
    {
      id: "2",
      title: "Luxury Estate",
      targetAmount: 2500000,
      currentAmount: 950000,
      deadline: new Date("2027-06-30"),
      category: "real-estate",
      priority: "medium",
    },
    {
      id: "3",
      title: "Business Expansion",
      targetAmount: 1000000,
      currentAmount: 150000,
      deadline: new Date("2026-12-31"),
      category: "business",
      priority: "high",
    },
  ])

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "Millionaire Status",
      description: "Achieved net worth of $1,000,000",
      icon: <Crown className="h-6 w-6 text-yellow-400" />,
      unlockedAt: new Date("2023-03-15"),
      rarity: "epic",
    },
    {
      id: "2",
      title: "Investment Master",
      description: "Portfolio value exceeded $1,000,000",
      icon: <Trophy className="h-6 w-6 text-amber-400" />,
      unlockedAt: new Date("2023-08-22"),
      rarity: "rare",
    },
    {
      id: "3",
      title: "Savings Champion",
      description: "Maintained 50%+ savings rate for 12 months",
      icon: <Shield className="h-6 w-6 text-blue-400" />,
      unlockedAt: new Date("2023-11-10"),
      rarity: "legendary",
    },
  ])

  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Simulate real-time wealth updates
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        totalNetWorth: prev.totalNetWorth + (Math.random() - 0.4) * 1000,
        investments: prev.investments + (Math.random() - 0.4) * 500,
        crypto: prev.crypto + (Math.random() - 0.5) * 100,
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatLargeCurrency = (value: number) => {
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`
    if (value >= 1e3) return `$${(value / 1e3).toFixed(0)}K`
    return formatCurrency(value)
  }

  const getGoalProgress = (goal: WealthGoal) => {
    return (goal.currentAmount / goal.targetAmount) * 100
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "from-yellow-400 to-orange-500"
      case "epic":
        return "from-purple-400 to-pink-500"
      case "rare":
        return "from-blue-400 to-cyan-500"
      default:
        return "from-gray-400 to-gray-500"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "retirement":
        return <Clock className="h-4 w-4" />
      case "real-estate":
        return <Building className="h-4 w-4" />
      case "business":
        return <Zap className="h-4 w-4" />
      case "luxury":
        return <Diamond className="h-4 w-4" />
      case "education":
        return <Star className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Imperial Wealth Header */}
      <Card className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 border-yellow-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-yellow-300 flex items-center gap-2">
                  Imperial Wealth Tracker
                </CardTitle>
                <p className="text-yellow-400/80">Supreme Financial Command Center</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">{formatLargeCurrency(metrics.totalNetWorth)}</div>
              <div className="flex items-center gap-1 text-green-400">
                <TrendingUp className="h-4 w-4" />
                <span>+{metrics.wealthGrowthRate.toFixed(1)}% YTD</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Wealth Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-slate-900/50 to-blue-900/50 border-blue-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-300 flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Liquid Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-white">{formatLargeCurrency(metrics.liquidAssets)}</div>
            <div className="text-sm text-blue-400">
              {((metrics.liquidAssets / metrics.totalNetWorth) * 100).toFixed(1)}% of net worth
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900/50 to-purple-900/50 border-purple-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-300 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Investments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-white">{formatLargeCurrency(metrics.investments)}</div>
            <div className="text-sm text-purple-400">
              {((metrics.investments / metrics.totalNetWorth) * 100).toFixed(1)}% of net worth
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900/50 to-green-900/50 border-green-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-300 flex items-center gap-2">
              <Building className="h-4 w-4" />
              Real Estate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-white">{formatLargeCurrency(metrics.realEstate)}</div>
            <div className="text-sm text-green-400">
              {((metrics.realEstate / metrics.totalNetWorth) * 100).toFixed(1)}% of net worth
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900/50 to-amber-900/50 border-amber-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-amber-300 flex items-center gap-2">
              <Percent className="h-4 w-4" />
              Savings Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-white">{metrics.savingsRate.toFixed(1)}%</div>
            <div className="text-sm text-amber-400">
              {formatCurrency(metrics.monthlyIncome - metrics.monthlyExpenses)}/month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Wealth Dashboard */}
      <Card className="bg-slate-900/50 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-300 flex items-center gap-2">
            <Diamond className="h-5 w-5" />
            Wealth Management Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Asset Allocation */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-800/30 border-slate-600/30">
                  <CardHeader>
                    <CardTitle className="text-slate-300">Asset Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-400">Investments</span>
                        <span className="text-white font-medium">{formatLargeCurrency(metrics.investments)}</span>
                      </div>
                      <Progress value={(metrics.investments / metrics.totalNetWorth) * 100} className="h-3" />

                      <div className="flex items-center justify-between">
                        <span className="text-green-400">Real Estate</span>
                        <span className="text-white font-medium">{formatLargeCurrency(metrics.realEstate)}</span>
                      </div>
                      <Progress value={(metrics.realEstate / metrics.totalNetWorth) * 100} className="h-3" />

                      <div className="flex items-center justify-between">
                        <span className="text-blue-400">Liquid Assets</span>
                        <span className="text-white font-medium">{formatLargeCurrency(metrics.liquidAssets)}</span>
                      </div>
                      <Progress value={(metrics.liquidAssets / metrics.totalNetWorth) * 100} className="h-3" />

                      <div className="flex items-center justify-between">
                        <span className="text-amber-400">Business</span>
                        <span className="text-white font-medium">{formatLargeCurrency(metrics.business)}</span>
                      </div>
                      <Progress value={(metrics.business / metrics.totalNetWorth) * 100} className="h-3" />

                      <div className="flex items-center justify-between">
                        <span className="text-orange-400">Crypto</span>
                        <span className="text-white font-medium">{formatLargeCurrency(metrics.crypto)}</span>
                      </div>
                      <Progress value={(metrics.crypto / metrics.totalNetWorth) * 100} className="h-3" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-600/30">
                  <CardHeader>
                    <CardTitle className="text-slate-300">Monthly Cash Flow</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-green-900/20 border border-green-500/30">
                        <div className="flex items-center gap-2">
                          <ArrowUp className="h-4 w-4 text-green-400" />
                          <span className="text-green-300">Monthly Income</span>
                        </div>
                        <span className="text-white font-bold">{formatCurrency(metrics.monthlyIncome)}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-red-900/20 border border-red-500/30">
                        <div className="flex items-center gap-2">
                          <ArrowDown className="h-4 w-4 text-red-400" />
                          <span className="text-red-300">Monthly Expenses</span>
                        </div>
                        <span className="text-white font-bold">{formatCurrency(metrics.monthlyExpenses)}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-blue-900/20 border border-blue-500/30">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-blue-400" />
                          <span className="text-blue-300">Net Savings</span>
                        </div>
                        <span className="text-white font-bold">
                          {formatCurrency(metrics.monthlyIncome - metrics.monthlyExpenses)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-purple-900/20 border border-purple-500/30">
                        <div className="flex items-center gap-2">
                          <Percent className="h-4 w-4 text-purple-400" />
                          <span className="text-purple-300">Savings Rate</span>
                        </div>
                        <span className="text-white font-bold">{metrics.savingsRate.toFixed(1)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Wealth Growth Chart */}
              <Card className="bg-slate-800/30 border-slate-600/30">
                <CardHeader>
                  <CardTitle className="text-slate-300">Wealth Growth Trajectory</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-slate-400">
                    <div className="text-center">
                      <LineChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Wealth Growth Chart</p>
                      <p className="text-sm opacity-70">Historical and projected wealth growth</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goals" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Wealth Goals</h3>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Goal
                </Button>
              </div>

              <div className="space-y-4">
                {goals.map((goal) => (
                  <Card key={goal.id} className="bg-slate-800/30 border-slate-600/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                              goal.priority === "high"
                                ? "from-red-500 to-orange-500"
                                : goal.priority === "medium"
                                  ? "from-yellow-500 to-amber-500"
                                  : "from-green-500 to-emerald-500"
                            } flex items-center justify-center`}
                          >
                            {getCategoryIcon(goal.category)}
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{goal.title}</h4>
                            <p className="text-sm text-slate-400">
                              Target: {formatLargeCurrency(goal.targetAmount)} by {goal.deadline.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge
                          className={`${
                            goal.priority === "high"
                              ? "bg-red-500/20 text-red-300 border-red-400/30"
                              : goal.priority === "medium"
                                ? "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
                                : "bg-green-500/20 text-green-300 border-green-400/30"
                          }`}
                        >
                          {goal.priority} priority
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Progress</span>
                          <span className="text-white">
                            {formatLargeCurrency(goal.currentAmount)} / {formatLargeCurrency(goal.targetAmount)}
                          </span>
                        </div>
                        <Progress value={getGoalProgress(goal)} className="h-3" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">{getGoalProgress(goal).toFixed(1)}% complete</span>
                          <span className="text-slate-400">
                            {Math.ceil((goal.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days remaining
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-xl bg-gradient-to-br ${getRarityColor(achievement.rarity)}/20 border border-current/30`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${getRarityColor(achievement.rarity)} flex items-center justify-center`}
                      >
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{achievement.title}</h4>
                        <Badge
                          className={`bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white border-none`}
                        >
                          {achievement.rarity.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 mb-2">{achievement.description}</p>
                    <div className="text-xs text-slate-400">
                      Unlocked: {achievement.unlockedAt.toLocaleDateString()}
                    </div>
                  </motion.div>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-300">Next Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                      <div className="flex items-center gap-3">
                        <Gem className="h-6 w-6 text-cyan-400" />
                        <div>
                          <div className="font-medium text-white">Multi-Millionaire</div>
                          <div className="text-sm text-slate-400">Reach $5M net worth</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-cyan-400">77% complete</div>
                        <Progress value={77} className="w-20 h-2 mt-1" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                      <div className="flex items-center gap-3">
                        <Globe className="h-6 w-6 text-green-400" />
                        <div>
                          <div className="font-medium text-white">Global Investor</div>
                          <div className="text-sm text-slate-400">Invest in 10 countries</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-green-400">30% complete</div>
                        <Progress value={30} className="w-20 h-2 mt-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-slate-800/30 border-slate-600/30">
                  <CardHeader>
                    <CardTitle className="text-slate-300 text-sm">Wealth Velocity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white mb-2">
                      {formatCurrency((metrics.monthlyIncome - metrics.monthlyExpenses) * 12)}
                    </div>
                    <div className="text-sm text-green-400">Annual wealth increase</div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-600/30">
                  <CardHeader>
                    <CardTitle className="text-slate-300 text-sm">Financial Independence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white mb-2">8.3 years</div>
                    <div className="text-sm text-blue-400">At current savings rate</div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-600/30">
                  <CardHeader>
                    <CardTitle className="text-slate-300 text-sm">Wealth Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white mb-2">94/100</div>
                    <div className="text-sm text-purple-400">Elite tier</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-800/30 border-slate-600/30">
                <CardHeader>
                  <CardTitle className="text-slate-300">Wealth Analytics Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-slate-400">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Advanced Wealth Analytics</p>
                      <p className="text-sm opacity-70">Comprehensive wealth tracking and projections</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
