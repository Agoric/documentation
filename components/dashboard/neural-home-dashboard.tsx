"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Zap,
  TrendingUp,
  Shield,
  Globe,
  Crown,
  Star,
  ArrowRight,
  Activity,
  Sparkles,
  Eye,
  BarChart3,
} from "lucide-react"
import { cn } from "@/lib/utils"

const citizenData = {
  name: "Alexander Magnus",
  title: "Neural Citizen - Level VII",
  id: "NC-2024-789456",
  level: 7,
  xp: 8750,
  nextLevelXp: 10000,
  qgiBalance: 250000,
  bondValue: 8333,
  neuralScore: 847,
  status: "active",
}

const aiInsights = [
  {
    title: "Portfolio Optimization",
    description: "AI detected 23% improvement opportunity in your QGI allocation",
    action: "Optimize Now",
    urgency: "high",
    icon: TrendingUp,
  },
  {
    title: "Credit Enhancement",
    description: "Your Snap Score can increase by 45 points with strategic moves",
    action: "View Strategy",
    urgency: "medium",
    icon: Zap,
  },
  {
    title: "Market Opportunity",
    description: "Real estate market shows 15% growth potential in your area",
    action: "Explore",
    urgency: "low",
    icon: Globe,
  },
]

const neuralMetrics = [
  { label: "Neural Efficiency", value: 94, color: "from-blue-400 to-cyan-500" },
  { label: "Decision Accuracy", value: 87, color: "from-purple-400 to-pink-500" },
  { label: "Prediction Score", value: 91, color: "from-green-400 to-emerald-500" },
  { label: "Risk Assessment", value: 89, color: "from-amber-400 to-orange-500" },
]

const recentActivities = [
  { action: "QGI Investment", amount: "+$5,000", time: "2 minutes ago", type: "investment" },
  { action: "Credit Score Update", amount: "+12 points", time: "1 hour ago", type: "credit" },
  { action: "Property Alert", amount: "3 new matches", time: "3 hours ago", type: "property" },
  { action: "Achievement Unlocked", amount: "Neural Master", time: "1 day ago", type: "achievement" },
]

export function NeuralHomeDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [aiThinking, setAiThinking] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const thinkingInterval = setInterval(() => {
      setAiThinking(true)
      setTimeout(() => setAiThinking(false), 2000)
    }, 10000)
    return () => clearInterval(thinkingInterval)
  }, [])

  const progressToNext = (citizenData.xp / citizenData.nextLevelXp) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Neural Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center relative">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <motion.div
              className="relative"
              animate={aiThinking ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: aiThinking ? Number.POSITIVE_INFINITY : 0 }}
            >
              <Brain className="w-12 h-12 text-cyan-400" />
              {aiThinking && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-cyan-400"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              )}
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Neural Command Center
              </h1>
              <p className="text-xl text-cyan-300/80">
                {currentTime.toLocaleTimeString()} • AI Status: {aiThinking ? "Processing" : "Ready"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Citizen Profile */}
          <div className="lg:col-span-1 space-y-6">
            {/* Neural Citizen Card */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-gradient-to-br from-cyan-900/50 to-purple-900/50 border-cyan-400/30 overflow-hidden">
                <CardHeader className="relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full -mr-10 -mt-10" />
                  <CardTitle className="text-cyan-300 font-serif flex items-center">
                    <Crown className="w-5 h-5 mr-2" />
                    Neural Citizen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center mb-4">
                      <Crown className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-cyan-300">{citizenData.name}</h3>
                    <p className="text-sm text-cyan-300/70">{citizenData.title}</p>
                    <Badge className="mt-2 bg-cyan-600/20 text-cyan-300 border-cyan-400/30">
                      Level {citizenData.level}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Neural Score</span>
                      <span className="text-cyan-300 font-bold">{citizenData.neuralScore}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Citizen ID</span>
                      <span className="text-cyan-300 font-mono text-xs">{citizenData.id}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">XP Progress</span>
                      <span className="text-cyan-300">
                        {citizenData.xp}/{citizenData.nextLevelXp}
                      </span>
                    </div>
                    <Progress value={progressToNext} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Neural Metrics */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-400/30">
                <CardHeader>
                  <CardTitle className="text-purple-300 font-serif text-sm flex items-center">
                    <Activity className="w-4 h-4 mr-2" />
                    Neural Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {neuralMetrics.map((metric, index) => (
                    <div key={metric.label} className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">{metric.label}</span>
                        <span className="text-purple-300">{metric.value}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className={cn("h-2 rounded-full bg-gradient-to-r", metric.color)}
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.value}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Center Column - AI Insights & Activities */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Insights */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="bg-gradient-to-br from-slate-900/50 to-indigo-900/50 border-indigo-400/30">
                <CardHeader>
                  <CardTitle className="text-indigo-300 font-serif flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    AI Neural Insights
                  </CardTitle>
                  <CardDescription className="text-indigo-200/70">
                    Personalized recommendations from your AI assistant
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiInsights.map((insight, index) => {
                    const Icon = insight.icon
                    return (
                      <motion.div
                        key={insight.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className={cn(
                          "p-4 rounded-lg border-l-4 bg-gradient-to-r",
                          insight.urgency === "high" && "border-red-400 from-red-900/20 to-red-800/20",
                          insight.urgency === "medium" && "border-yellow-400 from-yellow-900/20 to-yellow-800/20",
                          insight.urgency === "low" && "border-green-400 from-green-900/20 to-green-800/20",
                        )}
                      >
                        <div className="flex items-start space-x-3">
                          <Icon className="w-5 h-5 text-indigo-300 mt-1" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">{insight.title}</h4>
                            <p className="text-sm text-gray-300 mt-1">{insight.description}</p>
                            <Button
                              size="sm"
                              variant="outline"
                              className="mt-3 border-indigo-400/30 text-indigo-300 hover:bg-indigo-400/10"
                            >
                              {insight.action}
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activities */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 border-emerald-400/30">
                <CardHeader>
                  <CardTitle className="text-emerald-300 font-serif flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Neural Activity Stream
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-emerald-900/30 rounded-lg"
                    >
                      <div>
                        <div className="text-sm font-medium text-emerald-300">{activity.action}</div>
                        <div className="text-xs text-gray-400">{activity.time}</div>
                      </div>
                      <div className="text-sm font-bold text-emerald-300">{activity.amount}</div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Financial & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Financial Overview */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <Card className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border-amber-400/30">
                <CardHeader>
                  <CardTitle className="text-amber-300 font-serif text-sm flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Financial Neural Network
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-300 mb-1">
                      ${(citizenData.qgiBalance + citizenData.bondValue).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">Total Neural Assets</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">QGI Balance</span>
                      <span className="text-amber-300 font-semibold">${citizenData.qgiBalance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Bond Value</span>
                      <span className="text-amber-300 font-semibold">${citizenData.bondValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Neural Score</span>
                      <span className="text-amber-300 font-semibold">{citizenData.neuralScore}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                    <Eye className="w-4 h-4 mr-2" />
                    View Full Portfolio
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
              <Card className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 border-pink-400/30">
                <CardHeader>
                  <CardTitle className="text-pink-300 font-serif text-sm flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Neural Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-pink-400/30 text-pink-300 hover:bg-pink-400/10"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Instant Transfer
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-pink-400/30 text-pink-300 hover:bg-pink-400/10"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Market Analysis
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-pink-400/30 text-pink-300 hover:bg-pink-400/10"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Security Scan
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-pink-400/30 text-pink-300 hover:bg-pink-400/10"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    AI Consultation
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
