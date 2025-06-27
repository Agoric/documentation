"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calculator,
  TrendingUp,
  CreditCard,
  PiggyBank,
  Target,
  DollarSign,
  ChevronRight,
  Sparkles,
  Brain,
  Zap,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { useGlobalUnlock } from "@/contexts/global-unlock-context"

const planningTools = [
  {
    id: "budget-calculator",
    title: "Budget Calculator",
    description: "AI-powered budget optimization and expense tracking",
    icon: Calculator,
    href: "/dashboard/financial-planning/budget-calculator",
    color: "bg-blue-500",
    status: "active",
  },
  {
    id: "investment-planner",
    title: "Investment Planner",
    description: "Portfolio optimization and investment strategy",
    icon: TrendingUp,
    href: "/dashboard/financial-planning/investment-planner",
    color: "bg-green-500",
    status: "active",
  },
  {
    id: "debt-manager",
    title: "Debt Manager",
    description: "Strategic debt payoff and consolidation planning",
    icon: CreditCard,
    href: "/dashboard/financial-planning/debt-manager",
    color: "bg-red-500",
    status: "active",
  },
  {
    id: "retirement-simulator",
    title: "Retirement Simulator",
    description: "Retirement planning and savings optimization",
    icon: PiggyBank,
    href: "/dashboard/financial-planning/retirement-simulator",
    color: "bg-purple-500",
    status: "active",
  },
]

export default function FinancialPlanningPage() {
  const { getAllSuggestions } = useGlobalUnlock()
  const allSuggestions = getAllSuggestions()
  const financialSuggestions = allSuggestions.filter((s) => s.category === "financial")

  const prioritySuggestions = financialSuggestions.filter((s) => s.impact === "high").slice(0, 3)
  const immediateSuggestions = financialSuggestions.filter((s) => s.timeframe === "immediate").slice(0, 2)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Financial Planning Suite
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered financial planning tools to optimize your money management and wealth building
          </p>
        </div>

        {/* Priority Suggestions */}
        <Card className="bg-black/20 border-yellow-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              Priority Financial Actions
            </CardTitle>
            <CardDescription>High-impact suggestions for immediate financial improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {prioritySuggestions.map((suggestion) => (
                <Card
                  key={suggestion.id}
                  className="bg-gradient-to-br from-yellow-500/10 to-orange-600/10 border-yellow-500/20"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-medium">{suggestion.title}</CardTitle>
                      <Badge className="bg-red-500/20 text-red-400">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        High Impact
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">{suggestion.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {suggestion.timeframe}
                      </div>
                      <Button size="sm" className="h-6 text-xs bg-yellow-600 hover:bg-yellow-700">
                        <Target className="h-3 w-3 mr-1" />
                        Act Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Immediate Actions */}
        <Card className="bg-black/20 border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-400" />
              Immediate Actions Available
            </CardTitle>
            <CardDescription>Quick wins you can implement right now</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {immediateSuggestions.map((suggestion) => (
                <Card
                  key={suggestion.id}
                  className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/20"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-medium">{suggestion.title}</CardTitle>
                      <Badge className="bg-green-500/20 text-green-400">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Ready
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">{suggestion.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                      <Zap className="h-3 w-3 mr-1" />
                      Take Action
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Financial Planning Tools */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-400" />
              AI-Powered Planning Tools
            </CardTitle>
            <CardDescription>Comprehensive financial planning and optimization suite</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {planningTools.map((tool) => (
                <Card
                  key={tool.id}
                  className="bg-white/5 border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
                >
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto rounded-full ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <tool.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                    <CardDescription className="text-sm">{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={tool.href}>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                        Launch Tool
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Financial Suggestions */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-400" />
              All Financial Suggestions ({financialSuggestions.length})
            </CardTitle>
            <CardDescription>Complete list of AI-powered financial recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {financialSuggestions.map((suggestion) => (
                <Card key={suggestion.id} className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-medium">{suggestion.title}</CardTitle>
                      <Badge
                        variant={
                          suggestion.impact === "high"
                            ? "destructive"
                            : suggestion.impact === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {suggestion.impact}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">{suggestion.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {suggestion.timeframe}
                      </div>
                      <Button size="sm" variant="outline" className="h-6 text-xs bg-transparent">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Apply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Financial Health Score */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              Financial Health Score
            </CardTitle>
            <CardDescription>AI assessment of your overall financial wellness</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-green-400 mb-2">85</div>
              <div className="text-lg text-muted-foreground">Excellent Financial Health</div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Emergency Fund</span>
                  <span>90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Debt Management</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Investment Portfolio</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Retirement Planning</span>
                  <span>80%</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
