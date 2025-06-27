"use client"

import React from "react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FuturisticCard } from "@/components/ui/futuristic-card"
import { usePremiumUnlock } from "@/contexts/premium-unlock-context"
import { useRouter } from "next/navigation"
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
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react"

export default function FinancialPlanningPage() {
  const { isPremiumUnlocked, unlockPremium } = usePremiumUnlock()
  const router = useRouter()
  const [selectedGoal, setSelectedGoal] = React.useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)

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
      action: () => router.push("/dashboard/financial-planning/portfolio-health"),
    },
    {
      title: "Quantum Goals",
      value: "7 Active",
      change: "3 Priority",
      icon: Target,
      variant: "quantum" as const,
      description: "AI-optimized targets",
      action: () => router.push("/dashboard/financial-planning/goals"),
    },
    {
      title: "Holographic Wealth",
      value: "$487K",
      change: "+23%",
      icon: TrendingUp,
      variant: "holographic" as const,
      description: "Multi-dimensional tracking",
      action: () => router.push("/dashboard/financial-planning/wealth-tracker"),
    },
    {
      title: "Neural Credit Score",
      value: "847",
      change: "+45 pts",
      icon: Shield,
      variant: "cyber" as const,
      description: "AI-enhanced monitoring",
      action: () => router.push("/credit"),
    },
  ]

  const aiTools = [
    {
      name: "Quantum Budget Calculator",
      description: "AI-powered expense optimization with 97% accuracy",
      icon: Calculator,
      confidence: 97,
      color: "from-blue-500 to-cyan-500",
      path: "/dashboard/financial-planning/budget-calculator",
    },
    {
      name: "Neural Investment Planner",
      description: "Machine learning portfolio recommendations",
      icon: PieChart,
      confidence: 94,
      color: "from-purple-500 to-pink-500",
      path: "/dashboard/financial-planning/investment-planner",
    },
    {
      name: "Holographic Debt Manager",
      description: "3D visualization of debt elimination strategies",
      icon: Sparkles,
      confidence: 91,
      color: "from-green-500 to-emerald-500",
      path: "/dashboard/financial-planning/debt-manager",
    },
    {
      name: "AI Retirement Simulator",
      description: "Quantum modeling of retirement scenarios",
      icon: Rocket,
      confidence: 99,
      color: "from-orange-500 to-red-500",
      path: "/dashboard/financial-planning/retirement-simulator",
    },
  ]

  const goals = [
    {
      id: "emergency",
      name: "Emergency Fund",
      progress: 75,
      target: "$30,000",
      current: "$22,500",
      status: "on-track",
      color: "from-green-500 to-emerald-500",
      icon: Shield,
      deadline: "Dec 2024",
      monthsToGoal: 3,
    },
    {
      id: "house",
      name: "House Down Payment",
      progress: 45,
      target: "$100,000",
      current: "$45,000",
      status: "at-risk",
      color: "from-yellow-500 to-orange-500",
      icon: Target,
      deadline: "Jun 2025",
      monthsToGoal: 8,
    },
    {
      id: "retirement",
      name: "Retirement Savings",
      progress: 85,
      target: "$1,000,000",
      current: "$850,000",
      status: "on-track",
      color: "from-purple-500 to-pink-500",
      icon: Rocket,
      deadline: "2055",
      monthsToGoal: 360,
    },
  ]

  const handleToolLaunch = (toolPath: string) => {
    setIsAnalyzing(true)
    setTimeout(() => {
      router.push(toolPath)
      setIsAnalyzing(false)
    }, 1500)
  }

  const handleGoalOptimize = (goalId: string) => {
    setSelectedGoal(goalId)
    router.push(`/dashboard/financial-planning/goal-optimizer?goal=${goalId}`)
  }

  const handleGetPreApproved = () => {
    router.push("/real-estate?action=pre-approval")
  }

  const handleExportPortfolio = () => {
    // Simulate export functionality
    const portfolioData = {
      totalValue: "$487,000",
      goals: goals.length,
      onTrackGoals: goals.filter((g) => g.status === "on-track").length,
      exportDate: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(portfolioData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `portfolio-export-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

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
              className="hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={item.action}
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
                <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-cyan-400 hover:text-cyan-300">
                  View Details <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
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
                    <p className="text-white mb-4">
                      Based on your financial profile, consider our revolutionary 50-year loan program. It can reduce
                      your monthly payments by 40% while building generational wealth.
                    </p>
                    <div className="flex gap-3">
                      <Button
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                        onClick={handleGetPreApproved}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Get Pre-Approved
                      </Button>
                      <Button
                        variant="outline"
                        className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
                        onClick={() => router.push("/real-estate?section=calculator")}
                      >
                        <Calculator className="w-4 h-4 mr-2" />
                        Calculate Savings
                      </Button>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="justify-start border-white/20 hover:bg-white/5 bg-transparent"
                      onClick={() => router.push("/dashboard/financial-planning/cash-flow")}
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      Analyze Cash Flow
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start border-white/20 hover:bg-white/5 bg-transparent"
                      onClick={() => router.push("/dashboard/financial-planning/risk-assessment")}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Risk Assessment
                    </Button>
                  </div>
                </CardContent>
              </FuturisticCard>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Financial Goals</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/dashboard/financial-planning/goal-creator")}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Create Goal
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportPortfolio}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Export Goals
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal) => (
                <FuturisticCard key={goal.id} variant="quantum" className="hover:scale-105 transition-all duration-300">
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
                        {goal.status === "on-track" ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 mr-1" />
                        )}
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
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {goal.monthsToGoal < 12
                          ? `${goal.monthsToGoal} months`
                          : `${Math.floor(goal.monthsToGoal / 12)} years`}
                      </div>
                      <span className="text-muted-foreground">{goal.deadline}</span>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                      onClick={() => handleGoalOptimize(goal.id)}
                    >
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
                      <Button
                        className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-600"
                        onClick={() => router.push("/dashboard/financial-planning/wealth-visualization")}
                      >
                        Launch 3D View
                      </Button>
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
                      { name: "Stocks", percentage: 60, color: "from-green-500 to-emerald-500", value: "$292K" },
                      { name: "Bonds", percentage: 25, color: "from-blue-500 to-cyan-500", value: "$122K" },
                      { name: "Real Estate", percentage: 10, color: "from-purple-500 to-pink-500", value: "$49K" },
                      { name: "Crypto", percentage: 5, color: "from-orange-500 to-red-500", value: "$24K" },
                    ].map((asset) => (
                      <div key={asset.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white">{asset.name}</span>
                          <div className="text-right">
                            <span className="text-cyan-400">{asset.percentage}%</span>
                            <span className="text-muted-foreground ml-2">{asset.value}</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${asset.color}`}
                            style={{ width: `${asset.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                    <Button
                      className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-600"
                      onClick={() => router.push("/dashboard/financial-planning/rebalance")}
                    >
                      <PieChart className="w-4 h-4 mr-2" />
                      Rebalance Portfolio
                    </Button>
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
                    <Button
                      className={`w-full bg-gradient-to-r ${tool.color} hover:opacity-90 transition-opacity`}
                      onClick={() => handleToolLaunch(tool.path)}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Brain className="w-4 h-4 mr-2" />
                          Launch AI Tool
                        </>
                      )}
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
