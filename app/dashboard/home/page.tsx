"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  DollarSign,
  Target,
  Zap,
  ArrowRight,
  PieChart,
  Activity,
  Building2,
  ShoppingBag,
  Award,
  Bell,
  Calendar,
  CreditCard,
  TrendingDown,
  AlertTriangle,
} from "lucide-react"

export default function DashboardHomePage() {
  const [selectedTimeframe, setSelectedTimeframe] = React.useState("30d")

  const stats = [
    {
      title: "Total Portfolio Value",
      value: "$2,847,392",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Monthly Income",
      value: "$18,450",
      change: "+8.2%",
      trend: "up",
      icon: TrendingUp,
      color: "text-blue-500",
    },
    {
      title: "Active Investments",
      value: "47",
      change: "+3",
      trend: "up",
      icon: Building2,
      color: "text-purple-500",
    },
    {
      title: "Credit Score",
      value: "847",
      change: "+12",
      trend: "up",
      icon: CreditCard,
      color: "text-orange-500",
    },
  ]

  const goals = [
    {
      title: "Emergency Fund",
      current: 85000,
      target: 100000,
      progress: 85,
      color: "bg-green-500",
    },
    {
      title: "Retirement Savings",
      current: 450000,
      target: 1000000,
      progress: 45,
      color: "bg-blue-500",
    },
    {
      title: "Real Estate Investment",
      current: 75000,
      target: 200000,
      progress: 37.5,
      color: "bg-purple-500",
    },
    {
      title: "Education Fund",
      current: 25000,
      target: 50000,
      progress: 50,
      color: "bg-orange-500",
    },
  ]

  const recentActivity = [
    {
      type: "investment",
      title: "SNAP-DAX Trade Executed",
      description: "Purchased 100 shares of TECH-ETF",
      amount: "+$12,450",
      time: "2 hours ago",
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      type: "reward",
      title: "Achievement Unlocked",
      description: "Portfolio Diversification Master",
      amount: "+500 XP",
      time: "4 hours ago",
      icon: Award,
      color: "text-yellow-500",
    },
    {
      type: "property",
      title: "Property Viewed",
      description: "Luxury Modern Home in Beverly Hills",
      amount: "$2.8M",
      time: "6 hours ago",
      icon: Building2,
      color: "text-blue-500",
    },
    {
      type: "purchase",
      title: "EcommereX Purchase",
      description: "Quantum Earbuds Pro",
      amount: "-$299",
      time: "1 day ago",
      icon: ShoppingBag,
      color: "text-purple-500",
    },
  ]

  const aiInsights = [
    {
      type: "opportunity",
      title: "Investment Opportunity",
      description: "AI detected a potential 15% gain opportunity in renewable energy sector",
      confidence: 87,
      icon: Zap,
      color: "text-green-500",
    },
    {
      type: "warning",
      title: "Risk Alert",
      description: "Your tech stock allocation is above recommended 25% threshold",
      confidence: 92,
      icon: AlertTriangle,
      color: "text-yellow-500",
    },
    {
      type: "suggestion",
      title: "Optimization Suggestion",
      description: "Consider rebalancing portfolio to reduce volatility by 8%",
      confidence: 78,
      icon: Target,
      color: "text-blue-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Welcome Back, Agent
            </h1>
            <p className="text-xl text-muted-foreground mt-2">Your financial command center with AI-powered insights</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              {selectedTimeframe}
            </Button>
            <Button>
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={stat.color}>{stat.change}</span>
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${stat.color.replace("text-", "from-")}/20 to-transparent`}
                  >
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Financial Goals */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Financial Goals Progress
              </CardTitle>
              <CardDescription>Track your progress towards financial milestones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {goals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{goal.title}</span>
                    <span className="text-sm text-muted-foreground">
                      ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{goal.progress}% complete</span>
                    <Badge variant="outline">${(goal.target - goal.current).toLocaleString()} remaining</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                AI Insights
              </CardTitle>
              <CardDescription>Personalized recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/10"
                >
                  <div className="flex items-start gap-3">
                    <insight.icon className={`h-5 w-5 mt-0.5 ${insight.color}`} />
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <p className="text-xs text-muted-foreground">{insight.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {insight.confidence}% confidence
                        </Badge>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest platform interactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-br ${activity.color.replace("text-", "from-")}/20 to-transparent`}
                  >
                    <activity.icon className={`h-4 w-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <div className="text-right">
                    <span className={`font-medium ${activity.color}`}>{activity.amount}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Access your most used features</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button className="h-20 flex flex-col gap-2" variant="outline">
                <Building2 className="h-6 w-6" />
                <span className="text-sm">SNAP-DAX Trading</span>
              </Button>
              <Button className="h-20 flex flex-col gap-2" variant="outline">
                <ShoppingBag className="h-6 w-6" />
                <span className="text-sm">EcommereX Shop</span>
              </Button>
              <Button className="h-20 flex flex-col gap-2" variant="outline">
                <PieChart className="h-6 w-6" />
                <span className="text-sm">Portfolio</span>
              </Button>
              <Button className="h-20 flex flex-col gap-2" variant="outline">
                <Award className="h-6 w-6" />
                <span className="text-sm">Rewards</span>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Platform Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
            <CardContent className="p-6 text-center">
              <Building2 className="h-8 w-8 mx-auto mb-4 text-blue-400" />
              <h3 className="font-semibold mb-2">Trading Platform</h3>
              <p className="text-sm text-muted-foreground mb-4">Advanced financial trading with AI insights</p>
              <Button variant="outline" size="sm">
                Open SNAP-DAX
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <ShoppingBag className="h-8 w-8 mx-auto mb-4 text-purple-400" />
              <h3 className="font-semibold mb-2">Holographic Commerce</h3>
              <p className="text-sm text-muted-foreground mb-4">Revolutionary shopping with 3D product views</p>
              <Button variant="outline" size="sm">
                Browse Products
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 mx-auto mb-4 text-green-400" />
              <h3 className="font-semibold mb-2">Rewards System</h3>
              <p className="text-sm text-muted-foreground mb-4">Earn rewards for every platform interaction</p>
              <Button variant="outline" size="sm">
                View Rewards
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
