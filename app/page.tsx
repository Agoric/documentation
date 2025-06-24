"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Crown,
  TrendingUp,
  Shield,
  Mic,
  MicOff,
  Target,
  CreditCard,
  Building,
  Briefcase,
  ChevronRight,
  Bell,
  Settings,
  Home,
  BarChart3,
  Wallet,
  Bot,
  Lightbulb,
  Clock,
} from "lucide-react"
import { VoiceControlInterface } from "@/components/voice/voice-control-interface"
import { useVoiceControl } from "@/hooks/use-voice-control"
import { useUserProgress } from "@/hooks/use-user-progress"

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)
  const { isListening, startListening, stopListening } = useVoiceControl()
  const { progress, goals, achievements } = useUserProgress()

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const citizenshipStatus = "Revolved" // This would come from user context
  const userName = "Supreme Citizen" // This would come from user context

  const environments = [
    {
      id: "banking",
      title: "Supreme Banking",
      description: "Comprehensive banking and financial services",
      icon: Building,
      status: "Active",
      progress: 87,
      href: "/dashboard/banking",
    },
    {
      id: "trading",
      title: "DAX Trading",
      description: "Advanced cryptocurrency trading platform",
      icon: TrendingUp,
      status: "Active",
      progress: 92,
      href: "/dashboard/dax",
    },
    {
      id: "ai-concierge",
      title: "AI Concierge",
      description: "Intelligent financial assistant",
      icon: Bot,
      status: "Active",
      progress: 78,
      href: "/dashboard/ai-concierge",
    },
    {
      id: "legal",
      title: "Legal Compliance",
      description: "Global legal and compliance management",
      icon: Shield,
      status: "Active",
      progress: 95,
      href: "/legal/compliance-dashboard",
    },
    {
      id: "investments",
      title: "Investment Platform",
      description: "Portfolio management and investments",
      icon: Briefcase,
      status: "Coming Soon",
      progress: 45,
      href: "/dashboard/investments",
    },
    {
      id: "real-estate",
      title: "Real Estate",
      description: "Property investment and management",
      icon: Home,
      status: "Beta",
      progress: 63,
      href: "/dashboard/real-estate",
    },
  ]

  const financialGoals = [
    {
      id: "credit",
      title: "Credit Score Improvement",
      current: 720,
      target: 800,
      progress: 75,
      timeframe: "6 months",
      nextStep: "Pay down credit card balances",
    },
    {
      id: "savings",
      title: "Emergency Fund",
      current: 15000,
      target: 25000,
      progress: 60,
      timeframe: "12 months",
      nextStep: "Increase monthly savings by $500",
    },
    {
      id: "investment",
      title: "Investment Portfolio",
      current: 85000,
      target: 150000,
      progress: 57,
      timeframe: "24 months",
      nextStep: "Diversify into international markets",
    },
  ]

  const geniusRecommendations = [
    {
      id: 1,
      title: "Optimize Credit Utilization",
      description: "Reduce credit utilization to boost your score by 50+ points",
      impact: "High",
      timeToComplete: "2 weeks",
      action: "Start Now",
      href: "/dashboard/credit",
    },
    {
      id: 2,
      title: "Diversify Crypto Portfolio",
      description: "Add DeFi tokens to increase potential returns by 15%",
      impact: "Medium",
      timeToComplete: "1 day",
      action: "Explore Options",
      href: "/dashboard/dax",
    },
    {
      id: 3,
      title: "Set Up Automated Savings",
      description: "Automate savings to reach emergency fund goal 3 months faster",
      impact: "High",
      timeToComplete: "30 minutes",
      action: "Configure",
      href: "/dashboard/banking",
    },
  ]

  const recentActivity = [
    { id: 1, type: "payment", description: "Credit card payment processed", amount: "$2,500", time: "2 hours ago" },
    { id: 2, type: "trade", description: "Bitcoin purchase completed", amount: "$5,000", time: "4 hours ago" },
    { id: 3, type: "goal", description: "Savings goal milestone reached", amount: "60%", time: "1 day ago" },
    { id: 4, type: "legal", description: "Compliance document updated", amount: "", time: "2 days ago" },
  ]

  const toggleVoice = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
    setIsVoiceEnabled(!isVoiceEnabled)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Crown className="h-8 w-8 text-yellow-500 animate-pulse" />
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white">Welcome back, {userName}</h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge
                variant={
                  citizenshipStatus === "Revolved"
                    ? "default"
                    : citizenshipStatus === "Pending"
                      ? "secondary"
                      : "outline"
                }
                className="px-3 py-1"
              >
                <Shield className="h-4 w-4 mr-1" />
                {citizenshipStatus}
              </Badge>

              <Button
                variant={isListening ? "default" : "outline"}
                size="sm"
                onClick={toggleVoice}
                className="flex items-center space-x-2"
              >
                {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                <span>{isListening ? "Listening" : "Voice"}</span>
              </Button>

              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Voice Control Interface */}
      {isVoiceEnabled && <VoiceControlInterface />}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="environments">Environments</TabsTrigger>
            <TabsTrigger value="genius">Genius Guide</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Total Balance</p>
                      <p className="text-2xl font-bold">$127,450</p>
                    </div>
                    <Wallet className="h-8 w-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Credit Score</p>
                      <p className="text-2xl font-bold">720</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Portfolio Value</p>
                      <p className="text-2xl font-bold">$85,000</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Goals Progress</p>
                      <p className="text-2xl font-bold">64%</p>
                    </div>
                    <Target className="h-8 w-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Environment Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {environments.map((env) => {
                const IconComponent = env.icon
                return (
                  <Card key={env.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{env.title}</CardTitle>
                            <Badge
                              variant={
                                env.status === "Active" ? "default" : env.status === "Beta" ? "secondary" : "outline"
                              }
                            >
                              {env.status}
                            </Badge>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{env.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{env.progress}%</span>
                        </div>
                        <Progress value={env.progress} className="h-2" />
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        Access Platform
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {financialGoals.map((goal) => (
                <Card key={goal.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {goal.title}
                      <Badge variant="outline">{goal.timeframe}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Current: ${goal.current.toLocaleString()}</span>
                      <span>Target: ${goal.target.toLocaleString()}</span>
                    </div>
                    <Progress value={goal.progress} className="h-3" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">{goal.progress}% Complete</span>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Next Step: {goal.nextStep}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Environments Tab */}
          <TabsContent value="environments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {environments.map((env) => {
                const IconComponent = env.icon
                return (
                  <Card key={env.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <CardTitle>{env.title}</CardTitle>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{env.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={
                            env.status === "Active" ? "default" : env.status === "Beta" ? "secondary" : "outline"
                          }
                        >
                          {env.status}
                        </Badge>
                        <span className="text-sm text-slate-600 dark:text-slate-400">{env.progress}% Setup</span>
                      </div>
                      <Progress value={env.progress} className="h-2" />
                      <Button className="w-full">
                        Launch Platform
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Genius Guide Tab */}
          <TabsContent value="genius" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-6 w-6 text-yellow-500" />
                  <span>Genius Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {geniusRecommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="border rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{rec.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">{rec.description}</p>
                        <div className="flex items-center space-x-4 mt-3">
                          <Badge variant={rec.impact === "High" ? "default" : "secondary"}>{rec.impact} Impact</Badge>
                          <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {rec.timeToComplete}
                          </span>
                        </div>
                      </div>
                      <Button className="ml-4">
                        {rec.action}
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                          {activity.type === "payment" && <CreditCard className="h-4 w-4 text-blue-600" />}
                          {activity.type === "trade" && <TrendingUp className="h-4 w-4 text-green-600" />}
                          {activity.type === "goal" && <Target className="h-4 w-4 text-purple-600" />}
                          {activity.type === "legal" && <Shield className="h-4 w-4 text-orange-600" />}
                        </div>
                        <div>
                          <p className="font-medium">{activity.description}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{activity.time}</p>
                        </div>
                      </div>
                      {activity.amount && <span className="font-semibold text-green-600">{activity.amount}</span>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Voice Control Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Voice Navigation</span>
                    <Button variant="outline" size="sm">
                      {isVoiceEnabled ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Language</span>
                    <Button variant="outline" size="sm">
                      English
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Voice Training</span>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Goal Updates</span>
                    <Button variant="outline" size="sm">
                      On
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Market Alerts</span>
                    <Button variant="outline" size="sm">
                      On
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Security Notifications</span>
                    <Button variant="outline" size="sm">
                      On
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
