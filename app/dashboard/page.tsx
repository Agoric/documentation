"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { HolographicBackground } from "@/components/ui/holographic-background"
import { ImperialCoinDisplay } from "@/components/ui/imperial-coin-display"
import { ImperialAmbientController } from "@/components/ui/imperial-ambient-controller"
import { TrendingUp, DollarSign, Activity, Crown, Shield, Zap, Globe, Star, Award } from "lucide-react"

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const stats = [
    {
      title: "Total Portfolio Value",
      value: "$2,847,392",
      change: "+12.5%",
      icon: <DollarSign className="h-4 w-4" />,
      trend: "up",
    },
    {
      title: "Active Investments",
      value: "47",
      change: "+3",
      icon: <TrendingUp className="h-4 w-4" />,
      trend: "up",
    },
    {
      title: "Global Reach",
      value: "23 Countries",
      change: "+2",
      icon: <Globe className="h-4 w-4" />,
      trend: "up",
    },
    {
      title: "Authority Score",
      value: "98.7%",
      change: "+0.3%",
      icon: <Crown className="h-4 w-4" />,
      trend: "up",
    },
  ]

  const recentActivities = [
    {
      title: "New Investment Opportunity",
      description: "Quantum Computing Venture - Series A",
      time: "2 minutes ago",
      type: "investment",
      amount: "+$150,000",
    },
    {
      title: "Portfolio Rebalancing",
      description: "AI-driven optimization completed",
      time: "15 minutes ago",
      type: "optimization",
      amount: "+2.3%",
    },
    {
      title: "Global Market Analysis",
      description: "Weekly economic forecast generated",
      time: "1 hour ago",
      type: "analysis",
      amount: "98.5% accuracy",
    },
    {
      title: "Authority Verification",
      description: "Supreme Authority status confirmed",
      time: "2 hours ago",
      type: "verification",
      amount: "Verified",
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      <HolographicBackground variant="financial" />

      {/* Imperial Ambient Music Controller */}
      <ImperialAmbientController autoStart={true} defaultTrack="throne-room" compact={true} />

      <div className="relative z-10 p-6 space-y-8">
        {/* Imperial Header */}
        <div className="text-center py-8">
          <ImperialCoinDisplay size="hero" showDetails={true} animated={true} />

          <div className="mt-6 space-y-2">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
              Supreme Authority Dashboard
            </h1>
            <p className="text-yellow-300/80 text-lg">Digital Economics Command Center</p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">
                <Crown className="w-3 h-3 mr-1" />
                Imperial Status
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                <Shield className="w-3 h-3 mr-1" />
                Verified Authority
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                <Star className="w-3 h-3 mr-1" />
                Global Creator
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-black/20 backdrop-blur-md border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300"
              style={{
                boxShadow: "0 8px 32px rgba(255, 215, 0, 0.1)",
              }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-100">{stat.title}</CardTitle>
                <div className="text-yellow-400">{stat.icon}</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-300 mb-1">{stat.value}</div>
                <p className="text-xs text-green-400 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Performance */}
          <Card className="lg:col-span-2 bg-black/20 backdrop-blur-md border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-yellow-300 flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Imperial Portfolio Performance
              </CardTitle>
              <CardDescription className="text-yellow-200/60">Real-time global economics tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-yellow-200">Total Growth</span>
                  <span className="text-green-400 font-bold">+847.3%</span>
                </div>
                <Progress value={84.7} className="h-3" />

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-400/20">
                    <div className="text-2xl font-bold text-yellow-300">$2.8M</div>
                    <div className="text-sm text-yellow-200/70">Current Value</div>
                  </div>
                  <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-400/20">
                    <div className="text-2xl font-bold text-green-300">+12.5%</div>
                    <div className="text-sm text-green-200/70">Monthly Growth</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-yellow-300 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Imperial Activities
              </CardTitle>
              <CardDescription className="text-yellow-200/60">Latest authority actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-yellow-500/5 rounded-lg border border-yellow-400/10 hover:border-yellow-400/20 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-yellow-200">{activity.title}</p>
                      <p className="text-xs text-yellow-300/60">{activity.description}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-yellow-400/50">{activity.time}</p>
                        <span className="text-xs font-medium text-green-400">{activity.amount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-yellow-300 flex items-center gap-2">
              <Award className="h-5 w-5" />
              Imperial Command Center
            </CardTitle>
            <CardDescription className="text-yellow-200/60">Execute supreme authority actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/30">
                <Crown className="h-4 w-4 mr-2" />
                New Investment
              </Button>
              <Button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-400/30">
                <Shield className="h-4 w-4 mr-2" />
                Security Review
              </Button>
              <Button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-400/30">
                <Globe className="h-4 w-4 mr-2" />
                Global Analysis
              </Button>
              <Button className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-400/30">
                <Star className="h-4 w-4 mr-2" />
                Authority Actions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Imperial Footer */}
        <div className="text-center py-6">
          <p className="text-yellow-300/60 text-sm">{currentTime.toLocaleString()} - Supreme Authority Active</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400">Global Economics Network Online</span>
          </div>
        </div>
      </div>
    </div>
  )
}
