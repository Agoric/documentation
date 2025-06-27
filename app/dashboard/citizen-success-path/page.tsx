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
  Sparkles,
  Rocket,
  Crown,
  Zap,
  DollarSign,
  BarChart3,
  LineChart,
  ArrowRight,
  CheckCircle,
  Clock,
  Star,
  Trophy,
  Award,
  Users,
  Globe,
} from "lucide-react"

export default function CitizenSuccessPathPage() {
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

  const successMetrics = [
    {
      title: "Citizen Score",
      value: "947",
      change: "+127",
      icon: Star,
      variant: "neural" as const,
      description: "Elite citizen status",
      action: () => router.push("/citizen/dashboard"),
    },
    {
      title: "Success Milestones",
      value: "12 of 15",
      change: "3 Remaining",
      icon: Trophy,
      variant: "quantum" as const,
      description: "Path to mastery",
      action: () => router.push("/dashboard/citizen-success-path/milestones"),
    },
    {
      title: "Wealth Trajectory",
      value: "$847K",
      change: "+34%",
      icon: TrendingUp,
      variant: "holographic" as const,
      description: "Exponential growth",
      action: () => router.push("/dashboard/citizen-success-path/wealth-tracker"),
    },
    {
      title: "Network Power",
      value: "2,847",
      change: "+156",
      icon: Users,
      variant: "cyber" as const,
      description: "Connected citizens",
      action: () => router.push("/citizen/network"),
    },
  ]

  const successTools = [
    {
      name: "Quantum Wealth Builder",
      description: "AI-powered wealth acceleration with 99.7% success rate",
      icon: Calculator,
      confidence: 99,
      color: "from-blue-500 to-cyan-500",
      path: "/dashboard/citizen-success-path/wealth-builder",
    },
    {
      name: "Neural Success Planner",
      description: "Machine learning life optimization system",
      icon: Brain,
      confidence: 97,
      color: "from-purple-500 to-pink-500",
      path: "/dashboard/citizen-success-path/success-planner",
    },
    {
      name: "Holographic Goal Tracker",
      description: "3D visualization of your success journey",
      icon: Target,
      confidence: 95,
      color: "from-green-500 to-emerald-500",
      path: "/dashboard/citizen-success-path/goal-tracker",
    },
    {
      name: "Elite Network Connector",
      description: "Connect with high-value citizens and opportunities",
      icon: Globe,
      confidence: 98,
      color: "from-orange-500 to-red-500",
      path: "/dashboard/citizen-success-path/network-connector",
    },
  ]

  const successMilestones = [
    {
      id: "financial-freedom",
      name: "Financial Freedom",
      progress: 85,
      target: "$1,000,000",
      current: "$847,000",
      status: "on-track",
      color: "from-green-500 to-emerald-500",
      icon: DollarSign,
      deadline: "Q2 2025",
      monthsToGoal: 8,
      reward: "Elite Status Unlock",
    },
    {
      id: "network-mastery",
      name: "Network Mastery",
      progress: 75,
      target: "5,000 Connections",
      current: "2,847 Connections",
      status: "accelerating",
      color: "from-blue-500 to-cyan-500",
      icon: Users,
      deadline: "Q4 2024",
      monthsToGoal: 6,
      reward: "Ambassador Badge",
    },
    {
      id: "knowledge-expert",
      name: "Knowledge Expert",
      progress: 60,
      target: "Master Certification",
      current: "Advanced Level",
      status: "in-progress",
      color: "from-purple-500 to-pink-500",
      icon: Brain,
      deadline: "Q1 2025",
      monthsToGoal: 4,
      reward: "Mentor Access",
    },
    {
      id: "impact-leader",
      name: "Impact Leader",
      progress: 40,
      target: "Community Leader",
      current: "Rising Contributor",
      status: "building",
      color: "from-orange-500 to-red-500",
      icon: Award,
      deadline: "Q3 2025",
      monthsToGoal: 12,
      reward: "Leadership Council",
    },
  ]

  const handleToolLaunch = (toolPath: string) => {
    setIsAnalyzing(true)
    setTimeout(() => {
      router.push(toolPath)
      setIsAnalyzing(false)
    }, 1500)
  }

  const handleMilestoneOptimize = (milestoneId: string) => {
    setSelectedGoal(milestoneId)
    router.push(`/dashboard/citizen-success-path/milestone-optimizer?milestone=${milestoneId}`)
  }

  const handleJoinEliteProgram = () => {
    router.push("/citizen/elite-program")
  }

  const handleExportSuccessPath = () => {
    const successData = {
      citizenScore: "947",
      milestones: successMilestones.length,
      completedMilestones: successMilestones.filter((m) => m.progress >= 100).length,
      wealthTrajectory: "$847,000",
      networkSize: "2,847",
      exportDate: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(successData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `citizen-success-path-${new Date().toISOString().split("T")[0]}.json`

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
              Citizen Success Path
            </h1>
            <p className="text-muted-foreground mt-2">
              Your quantum-powered journey to elite citizenship and wealth mastery
            </p>
          </div>
          {isPremiumUnlocked && (
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <Crown className="w-4 h-4 mr-1" />
              Elite Citizen Access
            </Badge>
          )}
        </div>

        {/* Success Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {successMetrics.map((item) => (
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
        <Tabs defaultValue="success-path" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-background/50 backdrop-blur-sm border border-white/10">
            <TabsTrigger
              value="success-path"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <Star className="w-4 h-4 mr-2" />
              Success Path
            </TabsTrigger>
            <TabsTrigger
              value="milestones"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Milestones
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="tools"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white"
            >
              <Brain className="w-4 h-4 mr-2" />
              AI Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="success-path" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FuturisticCard variant="neural" className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center text-cyan-400">
                    <Star className="w-5 h-5 mr-2" />
                    Elite Citizen Success Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4 rounded-lg border border-cyan-500/30">
                    <p className="text-sm text-cyan-300 mb-2">
                      <Sparkles className="w-4 h-4 inline mr-1" />
                      AI Success Recommendation
                    </p>
                    <p className="text-white mb-4">
                      Congratulations! You're in the top 5% of citizens. Our AI recommends accelerating your wealth
                      building with our exclusive 50-year generational wealth program. This could multiply your net
                      worth by 10x.
                    </p>
                    <div className="flex gap-3">
                      <Button
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                        onClick={handleJoinEliteProgram}
                      >
                        <Crown className="w-4 h-4 mr-2" />
                        Join Elite Program
                      </Button>
                      <Button
                        variant="outline"
                        className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
                        onClick={() => router.push("/dashboard/citizen-success-path/wealth-calculator")}
                      >
                        <Calculator className="w-4 h-4 mr-2" />
                        Calculate Potential
                      </Button>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="justify-start border-white/20 hover:bg-white/5 bg-transparent"
                      onClick={() => router.push("/dashboard/citizen-success-path/success-analysis")}
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Success Analysis
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start border-white/20 hover:bg-white/5 bg-transparent"
                      onClick={() => router.push("/dashboard/citizen-success-path/network-growth")}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Network Growth
                    </Button>
                  </div>
                </CardContent>
              </FuturisticCard>
            </div>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Success Milestones</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/dashboard/citizen-success-path/milestone-creator")}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Create Milestone
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportSuccessPath}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Export Path
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {successMilestones.map((milestone) => (
                <FuturisticCard
                  key={milestone.id}
                  variant="quantum"
                  className="hover:scale-105 transition-all duration-300"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-white flex items-center">
                        <milestone.icon className="w-5 h-5 mr-2 text-cyan-400" />
                        {milestone.name}
                      </CardTitle>
                      <Badge
                        className={
                          milestone.status === "on-track"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : milestone.status === "accelerating"
                              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        }
                      >
                        {milestone.status === "on-track" ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : milestone.status === "accelerating" ? (
                          <Rocket className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {milestone.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Current</span>
                      <span className="text-white font-medium">{milestone.current}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Target</span>
                      <span className="text-white font-medium">{milestone.target}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-white font-medium">{milestone.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full bg-gradient-to-r ${milestone.color} transition-all duration-500`}
                          style={{ width: `${milestone.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {milestone.monthsToGoal < 12
                          ? `${milestone.monthsToGoal} months`
                          : `${Math.floor(milestone.monthsToGoal / 12)} years`}
                      </div>
                      <span className="text-muted-foreground">{milestone.deadline}</span>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-2 rounded border border-purple-500/30">
                      <p className="text-xs text-purple-300">
                        <Award className="w-3 h-3 inline mr-1" />
                        Reward: {milestone.reward}
                      </p>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                      onClick={() => handleMilestoneOptimize(milestone.id)}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Accelerate Progress
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
                    Success Trajectory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
                      <p className="text-white font-medium">Holographic Success Chart</p>
                      <p className="text-sm text-muted-foreground">3D success visualization</p>
                      <Button
                        className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-600"
                        onClick={() => router.push("/dashboard/citizen-success-path/success-visualization")}
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
                    <PieChart className="w-5 h-5 mr-2" />
                    Success Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Wealth Building",
                        percentage: 40,
                        color: "from-green-500 to-emerald-500",
                        value: "Elite",
                      },
                      { name: "Network Growth", percentage: 30, color: "from-blue-500 to-cyan-500", value: "Advanced" },
                      { name: "Knowledge", percentage: 20, color: "from-purple-500 to-pink-500", value: "Expert" },
                      { name: "Impact", percentage: 10, color: "from-orange-500 to-red-500", value: "Rising" },
                    ].map((area) => (
                      <div key={area.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white">{area.name}</span>
                          <div className="text-right">
                            <span className="text-cyan-400">{area.percentage}%</span>
                            <span className="text-muted-foreground ml-2">{area.value}</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${area.color}`}
                            style={{ width: `${area.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                    <Button
                      className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-600"
                      onClick={() => router.push("/dashboard/citizen-success-path/rebalance-focus")}
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Optimize Focus Areas
                    </Button>
                  </div>
                </CardContent>
              </FuturisticCard>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {successTools.map((tool) => (
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
