"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  DollarSign,
  TrendingUp,
  CreditCard,
  PieChart,
  Target,
  Shield,
  Star,
  Gift,
  Bell,
  Settings,
  Plus,
  ArrowRight,
  Wallet,
  Home,
  Car,
  GraduationCap,
} from "lucide-react"

export default function CitizenDashboardPage() {
  const financialStats = [
    { title: "Total Balance", value: "$24,580", change: "+12.5%", icon: DollarSign, color: "text-green-500" },
    { title: "Credit Score", value: "785", change: "+15", icon: Shield, color: "text-blue-500" },
    { title: "Monthly Income", value: "$8,200", change: "+3.2%", icon: TrendingUp, color: "text-purple-500" },
    { title: "Savings Goal", value: "68%", change: "+5%", icon: Target, color: "text-orange-500" },
  ]

  const recentTransactions = [
    { id: 1, description: "Salary Deposit", amount: "+$4,200", date: "Today", type: "income" },
    { id: 2, description: "Grocery Store", amount: "-$127.50", date: "Yesterday", type: "expense" },
    { id: 3, description: "Investment Return", amount: "+$85.20", date: "2 days ago", type: "income" },
    { id: 4, description: "Utility Bill", amount: "-$245.00", date: "3 days ago", type: "expense" },
    { id: 5, description: "Freelance Payment", amount: "+$650.00", date: "1 week ago", type: "income" },
  ]

  const savingsGoals = [
    { name: "Emergency Fund", current: 8500, target: 15000, color: "bg-blue-500" },
    { name: "Vacation", current: 2800, target: 5000, color: "bg-green-500" },
    { name: "New Car", current: 12000, target: 25000, color: "bg-purple-500" },
    { name: "Home Down Payment", current: 45000, target: 80000, color: "bg-orange-500" },
  ]

  const quickActions = [
    { name: "Transfer Money", icon: ArrowRight, color: "bg-blue-500" },
    { name: "Pay Bills", icon: CreditCard, color: "bg-green-500" },
    { name: "Investment", icon: TrendingUp, color: "bg-purple-500" },
    { name: "Add Goal", icon: Plus, color: "bg-orange-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
              <User className="h-10 w-10 text-blue-400" />
              Welcome Back, Alex
            </h1>
            <p className="text-xl text-blue-200 mt-2">Your Personal Financial Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Financial Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {financialStats.map((stat, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-200">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-blue-200">Quick Actions</CardTitle>
            <CardDescription className="text-blue-300">Frequently used financial tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex flex-col items-center gap-2 border-blue-500/30 hover:bg-blue-500/20 bg-transparent"
                >
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm text-blue-200">{action.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-blue-900/30 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="goals">Savings Goals</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Account Balance Chart */}
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-200">
                    <PieChart className="h-5 w-5" />
                    Account Overview
                  </CardTitle>
                  <CardDescription className="text-blue-300">Your financial portfolio breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-800/20 to-cyan-800/10 rounded-lg">
                    <div className="text-center">
                      <Wallet className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                      <p className="text-blue-200">Portfolio Chart</p>
                      <p className="text-sm text-blue-300 mt-2">Visual breakdown of your assets</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-200">
                    <TrendingUp className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription className="text-blue-300">Latest financial transactions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentTransactions.slice(0, 5).map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-blue-800/30 to-cyan-800/20 border border-blue-500/20"
                    >
                      <div>
                        <p className="font-medium text-white">{transaction.description}</p>
                        <p className="text-sm text-blue-200">{transaction.date}</p>
                      </div>
                      <span
                        className={`font-medium ${transaction.type === "income" ? "text-green-400" : "text-red-400"}`}
                      >
                        {transaction.amount}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-200">
                  <CreditCard className="h-5 w-5" />
                  Transaction History
                </CardTitle>
                <CardDescription className="text-blue-300">Complete transaction history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-blue-800/30 to-cyan-800/20 border border-blue-500/20"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === "income" ? "bg-green-500/20" : "bg-red-500/20"
                        }`}
                      >
                        {transaction.type === "income" ? (
                          <TrendingUp className="h-5 w-5 text-green-400" />
                        ) : (
                          <CreditCard className="h-5 w-5 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{transaction.description}</p>
                        <p className="text-sm text-blue-200">{transaction.date}</p>
                      </div>
                    </div>
                    <span
                      className={`font-medium text-lg ${
                        transaction.type === "income" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {transaction.amount}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-200">
                  <Target className="h-5 w-5" />
                  Savings Goals
                </CardTitle>
                <CardDescription className="text-blue-300">Track your financial goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {savingsGoals.map((goal, index) => {
                  const progress = (goal.current / goal.target) * 100
                  const goalIcons = [Home, Car, GraduationCap, Home]
                  const GoalIcon = goalIcons[index]

                  return (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-gradient-to-br from-blue-800/30 to-cyan-800/20 border border-blue-500/20"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${goal.color}`}>
                            <GoalIcon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{goal.name}</h4>
                            <p className="text-sm text-blue-200">
                              ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-blue-300 border-blue-500/30">
                          {Math.round(progress)}%
                        </Badge>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-200">
                  <Gift className="h-5 w-5" />
                  Rewards & Achievements
                </CardTitle>
                <CardDescription className="text-blue-300">Your financial milestones and rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-800/30 to-orange-800/20 border border-yellow-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Star className="h-6 w-6 text-yellow-400" />
                      <span className="font-medium text-white">Gold Status</span>
                    </div>
                    <p className="text-sm text-yellow-200">Achieved for maintaining excellent credit score</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-green-800/30 to-emerald-800/20 border border-green-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="h-6 w-6 text-green-400" />
                      <span className="font-medium text-white">Goal Achiever</span>
                    </div>
                    <p className="text-sm text-green-200">Completed 3 savings goals this year</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-purple-800/30 to-violet-800/20 border border-purple-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="h-6 w-6 text-purple-400" />
                      <span className="font-medium text-white">Security Champion</span>
                    </div>
                    <p className="text-sm text-purple-200">Enabled all security features</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-blue-800/30 to-cyan-800/20 border border-blue-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="h-6 w-6 text-blue-400" />
                      <span className="font-medium text-white">Investment Pro</span>
                    </div>
                    <p className="text-sm text-blue-200">Achieved 15% portfolio growth</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
