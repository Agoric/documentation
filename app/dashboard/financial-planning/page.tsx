"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  PieChart,
  TrendingUp,
  Target,
  Calculator,
  DollarSign,
  Home,
  Briefcase,
  Shield,
  Zap,
  Bot,
  BarChart3,
  Coins,
  Building2,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

export default function FinancialPlanningPage() {
  const [selectedGoal, setSelectedGoal] = React.useState("retirement")
  const [monthlyIncome, setMonthlyIncome] = React.useState(8500)
  const [monthlyExpenses, setMonthlyExpenses] = React.useState(6200)
  const [currentSavings, setCurrentSavings] = React.useState(45000)
  const [riskTolerance, setRiskTolerance] = React.useState([6])

  const financialGoals = [
    {
      id: "retirement",
      name: "Retirement Planning",
      icon: Target,
      progress: 34,
      target: 1200000,
      current: 408000,
      timeline: "25 years",
      color: "bg-blue-500",
    },
    {
      id: "house",
      name: "Home Purchase",
      icon: Home,
      progress: 67,
      target: 150000,
      current: 100500,
      timeline: "2 years",
      color: "bg-green-500",
    },
    {
      id: "emergency",
      name: "Emergency Fund",
      icon: Shield,
      progress: 89,
      target: 50000,
      current: 44500,
      timeline: "6 months",
      color: "bg-orange-500",
    },
    {
      id: "education",
      name: "Education Fund",
      icon: Briefcase,
      progress: 23,
      target: 80000,
      current: 18400,
      timeline: "8 years",
      color: "bg-purple-500",
    },
  ]

  const investmentAllocation = [
    { name: "Traditional Stocks", allocation: 45, value: 183600, color: "bg-blue-500" },
    { name: "SNAP-DAX Crypto", allocation: 20, value: 81600, color: "bg-orange-500" },
    { name: "Real Estate", allocation: 25, value: 102000, color: "bg-green-500" },
    { name: "Bonds", allocation: 10, value: 40800, color: "bg-purple-500" },
  ]

  const monthlyBudget = [
    { category: "Housing", amount: 2200, budget: 2500, color: "bg-blue-500", status: "good" },
    { category: "Food & Dining", amount: 680, budget: 800, color: "bg-green-500", status: "good" },
    { category: "Transportation", amount: 450, budget: 500, color: "bg-yellow-500", status: "good" },
    { category: "Utilities", amount: 320, budget: 350, color: "bg-purple-500", status: "good" },
    { category: "Entertainment", amount: 380, budget: 300, color: "bg-red-500", status: "over" },
    { category: "Shopping", amount: 520, budget: 400, color: "bg-pink-500", status: "over" },
    { category: "Subscriptions", amount: 240, budget: 200, color: "bg-indigo-500", status: "over" },
    { category: "Healthcare", amount: 180, budget: 250, color: "bg-teal-500", status: "good" },
    { category: "Savings", amount: 1230, budget: 1500, color: "bg-emerald-500", status: "under" },
  ]

  const snapDaxIntegration = {
    totalCryptoValue: 81600,
    monthlyReturn: 1847.5,
    returnPercentage: 2.3,
    activeBots: 3,
    recommendedAllocation: 25,
    currentAllocation: 20,
  }

  const aiRecommendations = [
    {
      type: "optimization",
      title: "Increase SNAP-DAX Allocation",
      description: "Your crypto portfolio is outperforming. Consider increasing allocation from 20% to 25%.",
      impact: "+$2,400 annual return",
      priority: "high",
    },
    {
      type: "savings",
      title: "Reduce Subscription Spending",
      description: "You're spending $240/month on subscriptions. Cancel unused services to save $80/month.",
      impact: "+$960 annual savings",
      priority: "medium",
    },
    {
      type: "investment",
      title: "Automate Real Estate Investment",
      description: "Set up automated monthly investments in tokenized real estate through our platform.",
      impact: "+8-12% diversified returns",
      priority: "medium",
    },
    {
      type: "debt",
      title: "Optimize Debt Strategy",
      description: "Use SNAP-DAX profits to accelerate high-interest debt payoff.",
      impact: "Save $3,200 in interest",
      priority: "high",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const calculateNetWorth = () => {
    return currentSavings + investmentAllocation.reduce((sum, item) => sum + item.value, 0)
  }

  const calculateMonthlySurplus = () => {
    return monthlyIncome - monthlyExpenses
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              AI Financial Planning Suite
            </h1>
            <p className="text-xl text-blue-200 mt-2">Powered by SNAP-DAX Integration & Advanced Analytics</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Bot className="h-4 w-4 mr-2" />
              AI Optimized
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Coins className="h-4 w-4 mr-2" />
              SNAP-DAX Connected
            </Badge>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Zap className="h-4 w-4 mr-2" />
              Optimize Portfolio
            </Button>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-200">Net Worth</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(calculateNetWorth())}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-green-400">+12.4% this year</span>
                  </div>
                </div>
                <PieChart className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 backdrop-blur-sm border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-200">Monthly Surplus</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(calculateMonthlySurplus())}</p>
                  <p className="text-sm text-green-400">Available to invest</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/30 backdrop-blur-sm border-orange-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-200">SNAP-DAX Returns</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(snapDaxIntegration.monthlyReturn)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-4 w-4 text-green-400" />
                    <span className="text-green-400">+{snapDaxIntegration.returnPercentage}% this month</span>
                  </div>
                </div>
                <Coins className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-200">Goal Progress</p>
                  <p className="text-2xl font-bold text-white">67%</p>
                  <p className="text-sm text-purple-400">Primary goal</p>
                </div>
                <Target className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="snap-dax">SNAP-DAX</TabsTrigger>
            <TabsTrigger value="recommendations">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Financial Goals Overview */}
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Target className="h-5 w-5" />
                    Financial Goals Progress
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Track your progress toward financial milestones
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {financialGoals.map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <goal.icon className="h-4 w-4 text-slate-400" />
                          <span className="font-medium text-white">{goal.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-white">{goal.progress}%</div>
                          <div className="text-xs text-slate-400">{goal.timeline}</div>
                        </div>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      <div className="flex justify-between text-sm text-slate-400">
                        <span>{formatCurrency(goal.current)}</span>
                        <span>{formatCurrency(goal.target)}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Investment Allocation */}
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <PieChart className="h-5 w-5" />
                    Investment Allocation
                  </CardTitle>
                  <CardDescription className="text-slate-300">Your diversified investment portfolio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {investmentAllocation.map((investment, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${investment.color}`} />
                          <span className="font-medium text-white">{investment.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-white">{investment.allocation}%</div>
                          <div className="text-xs text-slate-400">{formatCurrency(investment.value)}</div>
                        </div>
                      </div>
                      <Progress value={investment.allocation} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {financialGoals.map((goal) => (
                <Card
                  key={goal.id}
                  className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50 cursor-pointer transition-all hover:scale-105 ${
                    selectedGoal === goal.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedGoal(goal.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <goal.icon className="h-8 w-8 text-blue-400" />
                      <Badge className={`${goal.color}/20 text-white`}>{goal.progress}%</Badge>
                    </div>
                    <CardTitle className="text-white">{goal.name}</CardTitle>
                    <CardDescription className="text-slate-300">Target: {formatCurrency(goal.target)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Progress value={goal.progress} className="h-3" />
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Current</span>
                        <span className="text-white font-medium">{formatCurrency(goal.current)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Timeline</span>
                        <span className="text-white font-medium">{goal.timeline}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Goal Details */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Goal Optimization</CardTitle>
                <CardDescription className="text-slate-300">
                  AI-powered recommendations for {financialGoals.find((g) => g.id === selectedGoal)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">Monthly Contribution</Label>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        className="bg-slate-800/50 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Risk Tolerance (1-10)</Label>
                      <Slider
                        value={riskTolerance}
                        onValueChange={setRiskTolerance}
                        max={10}
                        min={1}
                        step={1}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-sm text-slate-400 mt-1">
                        <span>Conservative</span>
                        <span>Aggressive</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-800/30 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-3">AI Recommendations</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-slate-300">Increase SNAP-DAX allocation to 25%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-slate-300">Set up automated monthly investments</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-slate-300">Consider real estate tokenization</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Calculator className="h-5 w-5" />
                  Monthly Budget Analysis
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Track spending and identify optimization opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {monthlyBudget.map((item, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        item.status === "over"
                          ? "bg-red-900/20 border-red-500/30"
                          : item.status === "under"
                            ? "bg-yellow-900/20 border-yellow-500/30"
                            : "bg-green-900/20 border-green-500/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">{item.category}</span>
                        {item.status === "over" ? (
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                        ) : item.status === "under" ? (
                          <ArrowDownRight className="h-4 w-4 text-yellow-400" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Spent</span>
                          <span className="text-white font-medium">{formatCurrency(item.amount)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Budget</span>
                          <span className="text-slate-300">{formatCurrency(item.budget)}</span>
                        </div>
                        <Progress value={(item.amount / item.budget) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <BarChart3 className="h-5 w-5" />
                    Portfolio Performance
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Investment returns and allocation analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {investmentAllocation.map((investment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${investment.color}`} />
                          <div>
                            <div className="font-medium text-white">{investment.name}</div>
                            <div className="text-sm text-slate-400">{investment.allocation}% allocation</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-white">{formatCurrency(investment.value)}</div>
                          <div className="text-sm text-green-400">+8.4% YTD</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Building2 className="h-5 w-5" />
                    Real Estate Integration
                  </CardTitle>
                  <CardDescription className="text-slate-300">Tokenized real estate investments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center py-6">
                      <Building2 className="h-12 w-12 mx-auto mb-4 text-green-400 opacity-50" />
                      <p className="text-lg font-medium text-white mb-2">Real Estate Portfolio</p>
                      <p className="text-sm text-slate-400 mb-4">25% allocation • {formatCurrency(102000)} invested</p>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Building2 className="h-4 w-4 mr-2" />
                        View Properties
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="snap-dax" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/30 backdrop-blur-sm border-orange-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Coins className="h-5 w-5" />
                    Crypto Portfolio
                  </CardTitle>
                  <CardDescription className="text-orange-200">SNAP-DAX integration status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">
                        {formatCurrency(snapDaxIntegration.totalCryptoValue)}
                      </div>
                      <div className="text-orange-200">Total crypto value</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-orange-200">Monthly Return</div>
                        <div className="font-medium text-white">{formatCurrency(snapDaxIntegration.monthlyReturn)}</div>
                      </div>
                      <div>
                        <div className="text-orange-200">Return %</div>
                        <div className="font-medium text-green-400">+{snapDaxIntegration.returnPercentage}%</div>
                      </div>
                    </div>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      <Coins className="h-4 w-4 mr-2" />
                      Open SNAP-DAX
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Bot className="h-5 w-5" />
                    AI Trading Bots
                  </CardTitle>
                  <CardDescription className="text-blue-200">Automated trading performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">{snapDaxIntegration.activeBots}</div>
                      <div className="text-blue-200">Active bots</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-200">DCA Bot</span>
                        <span className="text-green-400">+$1,247</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-200">Grid Bot</span>
                        <span className="text-green-400">+$892</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-200">Arbitrage Bot</span>
                        <span className="text-yellow-400">Paused</span>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Bot className="h-4 w-4 mr-2" />
                      Manage Bots
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Target className="h-5 w-5" />
                    Allocation Target
                  </CardTitle>
                  <CardDescription className="text-purple-200">Recommended vs current</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-200">Current</span>
                        <span className="text-white">{snapDaxIntegration.currentAllocation}%</span>
                      </div>
                      <Progress value={snapDaxIntegration.currentAllocation} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-200">Recommended</span>
                        <span className="text-white">{snapDaxIntegration.recommendedAllocation}%</span>
                      </div>
                      <Progress value={snapDaxIntegration.recommendedAllocation} className="h-2" />
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <Zap className="h-4 w-4 mr-2" />
                      Auto-Rebalance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {aiRecommendations.map((rec, index) => (
                <Card
                  key={index}
                  className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50 ${
                    rec.priority === "high" ? "ring-1 ring-orange-500/30" : ""
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{rec.title}</CardTitle>
                      <Badge
                        className={
                          rec.priority === "high" ? "bg-orange-500/20 text-orange-400" : "bg-blue-500/20 text-blue-400"
                        }
                      >
                        {rec.priority}
                      </Badge>
                    </div>
                    <CardDescription className="text-slate-300">{rec.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-slate-400">Potential Impact:</span>
                        <span className="text-green-400 font-medium ml-2">{rec.impact}</span>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Apply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
