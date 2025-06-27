"use client"

import React from "react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FuturisticCard } from "@/components/ui/futuristic-card"
import { usePremiumUnlock } from "@/contexts/premium-unlock-context"
import {
  Brain,
  Target,
  TrendingUp,
  Calculator,
  PieChart,
  Shield,
  Sparkles,
  Rocket,
  Crown,
  Zap,
  DollarSign,
  BarChart3,
  LineChart,
} from "lucide-react"

export default function FinancialPlanningPage() {
  const { isPremiumUnlocked, unlockPremium } = usePremiumUnlock()

  // Auto-unlock premium features
  React.useEffect(() => {
    if (!isPremiumUnlocked) {
      unlockPremium()
    }
  }, [isPremiumUnlocked, unlockPremium])

  const overviewData = [
    {
      title: "AI Portfolio Health",
      value: "94%",
      change: "+12%",
      icon: Brain,
      variant: "neural" as const,
      description: "Neural analysis complete",
    },
    {
      title: "Quantum Goals",
      value: "7 Active",
      change: "3 Priority",
      icon: Target,
      variant: "quantum" as const,
      description: "AI-optimized targets",
    },
    {
      title: "Holographic Wealth",
      value: "$487K",
      change: "+23%",
      icon: TrendingUp,
      variant: "holographic" as const,
      description: "Multi-dimensional tracking",
    },
    {
      title: "Neural Credit Score",
      value: "847",
      change: "+45 pts",
      icon: Shield,
      variant: "cyber" as const,
      description: "AI-enhanced monitoring",
    },
  ]

  const aiTools = [
    {
      name: "Quantum Budget Calculator",
      description: "AI-powered expense optimization with 97% accuracy",
      icon: Calculator,
      confidence: 97,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Neural Investment Planner",
      description: "Machine learning portfolio recommendations",
      icon: PieChart,
      confidence: 94,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Holographic Debt Manager",
      description: "3D visualization of debt elimination strategies",
      icon: Sparkles,
      confidence: 91,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "AI Retirement Simulator",
      description: "Quantum modeling of retirement scenarios",
      icon: Rocket,
      confidence: 99,
      color: "from-orange-500 to-red-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 pl-20">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              AI Financial Planning
            </h1>
            <p className="text-muted-foreground mt-2">Quantum-powered financial intelligence at your fingertips</p>
          </div>
          {isPremiumUnlocked && (
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <Crown className="w-4 h-4 mr-1" />
              All Premium Features Unlocked
            </Badge>
          )}
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewData.map((item) => (
            <FuturisticCard
              key={item.title}
              variant={item.variant}
              className="hover:scale-105 transition-all duration-300"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-cyan-400">{item.title}</CardTitle>
                <item.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{item.value}</div>
                <p className="text-xs text-green-400 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {item.change}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
              </CardContent>
            </FuturisticCard>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="planning" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-background/50 backdrop-blur-sm border border-white/10">
            <TabsTrigger
              value="planning"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <Brain className="w-4 h-4 mr-2" />
              AI Planning
            </TabsTrigger>
            <TabsTrigger
              value="goals"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white"
            >
              <Target className="w-4 h-4 mr-2" />
              Quantum Goals
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Holo Analytics
            </TabsTrigger>
            <TabsTrigger
              value="tools"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Neural Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="planning" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FuturisticCard variant="neural" className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center text-cyan-400">
                    <Brain className="w-5 h-5 mr-2" />
                    AI Financial Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4 rounded-lg border border-cyan-500/30">
                    <p className="text-sm text-cyan-300 mb-2">
                      <Sparkles className="w-4 h-4 inline mr-1" />
                      AI Recommendation
                    </p>
                    <p className="text-white">
                      Based on your financial profile, consider our revolutionary 50-year loan program. It can reduce
                      your monthly payments by 40% while building generational wealth.
                    </p>
                    <Button className="mt-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                      <Zap className="w-4 h-4 mr-2" />
                      Get Pre-Approved
                    </Button>
                  </div>
                </CardContent>
              </FuturisticCard>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Emergency Fund",
                  progress: 75,
                  target: "$30,000",
                  current: "$22,500",
                  status: "on-track",
                  color: "from-green-500 to-emerald-500",
                  icon: Shield,
                },
                {
                  name: "House Down Payment",
                  progress: 45,
                  target: "$100,000",
                  current: "$45,000",
                  status: "at-risk",
                  color: "from-yellow-500 to-orange-500",
                  icon: Target,
                },
                {
                  name: "Retirement Savings",
                  progress: 85,
                  target: "$1,000,000",
                  current: "$850,000",
                  status: "on-track",
                  color: "from-purple-500 to-pink-500",
                  icon: Rocket,
                },
              ].map((goal) => (
                <FuturisticCard
                  key={goal.name}
                  variant="quantum"
                  className="hover:scale-105 transition-all duration-300"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-white flex items-center">
                        <goal.icon className="w-5 h-5 mr-2 text-cyan-400" />
                        {goal.name}
                      </CardTitle>
                      <Badge
                        className={
                          goal.status === "on-track"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        }
                      >
                        {goal.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Current</span>
                      <span className="text-white font-medium">{goal.current}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Target</span>
                      <span className="text-white font-medium">{goal.target}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-white font-medium">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full bg-gradient-to-r ${goal.color} transition-all duration-500`}
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Optimize Goal
                    </Button>
                  </CardContent>
                </FuturisticCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FuturisticCard variant="holographic">
                <CardHeader>
                  <CardTitle className="text-cyan-400 flex items-center">
                    <LineChart className="w-5 h-5 mr-2" />
                    Wealth Trajectory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
                      <p className="text-white font-medium">Holographic Chart</p>
                      <p className="text-sm text-muted-foreground">3D wealth visualization</p>
                    </div>
                  </div>
                </CardContent>
              </FuturisticCard>

              <FuturisticCard variant="cyber">
                <CardHeader>
                  <CardTitle className="text-cyan-400 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Asset Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Stocks", percentage: 60, color: "from-green-500 to-emerald-500" },
                      { name: "Bonds", percentage: 25, color: "from-blue-500 to-cyan-500" },
                      { name: "Real Estate", percentage: 10, color: "from-purple-500 to-pink-500" },
                      { name: "Crypto", percentage: 5, color: "from-orange-500 to-red-500" },
                    ].map((asset) => (
                      <div key={asset.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white">{asset.name}</span>
                          <span className="text-cyan-400">{asset.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${asset.color}`}
                            style={{ width: `${asset.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </FuturisticCard>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiTools.map((tool) => (
                <FuturisticCard
                  key={tool.name}
                  variant="neural"
                  className="hover:scale-105 transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <tool.icon className="w-5 h-5 mr-2 text-cyan-400" />
                      {tool.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">{tool.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-cyan-400">AI Confidence</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{tool.confidence}%</Badge>
                    </div>
                    <Progress value={tool.confidence} className="h-2" />
                    <Button className={`w-full bg-gradient-to-r ${tool.color} hover:opacity-90 transition-opacity`}>
                      <Brain className="w-4 h-4 mr-2" />
                      Launch AI Tool
                    </Button>
                  </CardContent>
                </FuturisticCard>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
