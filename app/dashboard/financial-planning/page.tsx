"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calculator,
  TrendingUp,
  CreditCard,
  PiggyBank,
  Target,
  DollarSign,
  BarChart3,
  Shield,
  Clock,
  CheckCircle,
  Star,
  Zap,
  Brain,
  Search,
  ArrowRight,
  Home,
  Briefcase,
  ShoppingCart,
  Gamepad2,
} from "lucide-react"
import Link from "next/link"
import { useGlobalUnlock } from "@/contexts/global-unlock-context"

const financialTools = [
  {
    title: "Budget Calculator",
    description: "Create and manage your personal budget with AI-powered insights",
    icon: Calculator,
    href: "/dashboard/financial-planning/budget-calculator",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Investment Planner",
    description: "Plan your investment strategy with portfolio optimization",
    icon: TrendingUp,
    href: "/dashboard/financial-planning/investment-planner",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Debt Manager",
    description: "Optimize your debt payoff strategy and save on interest",
    icon: CreditCard,
    href: "/dashboard/financial-planning/debt-manager",
    color: "from-red-500 to-pink-500",
  },
  {
    title: "Retirement Simulator",
    description: "Simulate retirement scenarios and plan for your future",
    icon: PiggyBank,
    href: "/dashboard/financial-planning/retirement-simulator",
    color: "from-purple-500 to-indigo-500",
  },
]

export default function FinancialPlanningPage() {
  const { getAllSuggestions } = useGlobalUnlock()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImpact, setSelectedImpact] = useState("all")

  const allSuggestions = getAllSuggestions()

  // Filter suggestions for financial planning
  const financialSuggestions = allSuggestions.filter(
    (suggestion) =>
      suggestion.category === "financial" || suggestion.category === "credit" || suggestion.category === "trading",
  )

  const filteredSuggestions = financialSuggestions.filter((suggestion) => {
    const matchesSearch =
      suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suggestion.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || suggestion.category === selectedCategory
    const matchesImpact = selectedImpact === "all" || suggestion.impact === selectedImpact

    return matchesSearch && matchesCategory && matchesImpact
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "financial":
        return <DollarSign className="h-4 w-4" />
      case "credit":
        return <Shield className="h-4 w-4" />
      case "trading":
        return <BarChart3 className="h-4 w-4" />
      case "business":
        return <Briefcase className="h-4 w-4" />
      case "realestate":
        return <Home className="h-4 w-4" />
      case "ecommerce":
        return <ShoppingCart className="h-4 w-4" />
      case "gamification":
        return <Gamepad2 className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const highImpactSuggestions = filteredSuggestions.filter((s) => s.impact === "high")
  const immediateSuggestions = filteredSuggestions.filter((s) => s.timeframe === "immediate")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Financial Planning Hub
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive financial planning tools and AI-powered suggestions to optimize your financial future
          </p>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary" className="text-sm">
              <CheckCircle className="h-3 w-3 mr-1" />
              All Tools Unlocked
            </Badge>
            <Badge variant="outline" className="text-sm">
              {filteredSuggestions.length} Active Suggestions
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-black/20 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{highImpactSuggestions.length}</div>
              <div className="text-sm text-muted-foreground">High Impact</div>
            </CardContent>
          </Card>
          <Card className="bg-black/20 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{immediateSuggestions.length}</div>
              <div className="text-sm text-muted-foreground">Immediate Actions</div>
            </CardContent>
          </Card>
          <Card className="bg-black/20 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{financialTools.length}</div>
              <div className="text-sm text-muted-foreground">Planning Tools</div>
            </CardContent>
          </Card>
          <Card className="bg-black/20 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">100%</div>
              <div className="text-sm text-muted-foreground">Unlocked</div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Planning Tools */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Financial Planning Tools
            </CardTitle>
            <CardDescription>Access comprehensive financial planning and analysis tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {financialTools.map((tool) => (
                <Card
                  key={tool.title}
                  className="bg-white/5 border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
                >
                  <CardHeader className="pb-3">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <tool.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                    <CardDescription className="text-sm">{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Link href={tool.href}>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        Launch Tool
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI-Powered Financial Suggestions
            </CardTitle>
            <CardDescription>Personalized recommendations to optimize your financial strategy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search and Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search suggestions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="financial">Financial Planning</SelectItem>
                  <SelectItem value="credit">Credit Optimization</SelectItem>
                  <SelectItem value="trading">Investment & Trading</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedImpact} onValueChange={setSelectedImpact}>
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue placeholder="Impact Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Impact Levels</SelectItem>
                  <SelectItem value="high">High Impact</SelectItem>
                  <SelectItem value="medium">Medium Impact</SelectItem>
                  <SelectItem value="low">Low Impact</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Suggestions Tabs */}
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All ({filteredSuggestions.length})</TabsTrigger>
                <TabsTrigger value="high-impact">High Impact ({highImpactSuggestions.length})</TabsTrigger>
                <TabsTrigger value="immediate">Immediate ({immediateSuggestions.length})</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSuggestions.map((suggestion) => (
                    <Card
                      key={suggestion.id}
                      className="bg-white/5 border-white/10 hover:border-purple-500/30 transition-colors"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(suggestion.category)}
                            <CardTitle className="text-sm font-medium">{suggestion.title}</CardTitle>
                          </div>
                          <Badge className={getImpactColor(suggestion.impact)}>{suggestion.impact}</Badge>
                        </div>
                        <CardDescription className="text-xs">{suggestion.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {suggestion.timeframe}
                          </div>
                          <Button
                            size="sm"
                            className="h-6 text-xs bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                          >
                            <Zap className="h-3 w-3 mr-1" />
                            Apply
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="high-impact" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {highImpactSuggestions.map((suggestion) => (
                    <Card
                      key={suggestion.id}
                      className="bg-gradient-to-br from-red-500/10 to-orange-600/10 border-red-500/20"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(suggestion.category)}
                            <CardTitle className="text-sm font-medium">{suggestion.title}</CardTitle>
                          </div>
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                            <Star className="h-3 w-3 mr-1" />
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
                          <Button size="sm" className="h-6 text-xs bg-red-600 hover:bg-red-700">
                            <Target className="h-3 w-3 mr-1" />
                            Priority Action
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="immediate" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {immediateSuggestions.map((suggestion) => (
                    <Card
                      key={suggestion.id}
                      className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/20"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(suggestion.category)}
                            <CardTitle className="text-sm font-medium">{suggestion.title}</CardTitle>
                          </div>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <Zap className="h-3 w-3 mr-1" />
                            Immediate
                          </Badge>
                        </div>
                        <CardDescription className="text-xs">{suggestion.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Take Action Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="favorites" className="space-y-4">
                <div className="text-center py-12">
                  <Star className="h-12 w-12 mx-auto text-yellow-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Favorite Suggestions</h3>
                  <p className="text-muted-foreground">Star suggestions to add them to your favorites</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-16 flex-col gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                <Calculator className="h-5 w-5" />
                <span className="text-xs">Budget Now</span>
              </Button>
              <Button className="h-16 flex-col gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                <TrendingUp className="h-5 w-5" />
                <span className="text-xs">Invest</span>
              </Button>
              <Button className="h-16 flex-col gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
                <CreditCard className="h-5 w-5" />
                <span className="text-xs">Pay Debt</span>
              </Button>
              <Button className="h-16 flex-col gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600">
                <PiggyBank className="h-5 w-5" />
                <span className="text-xs">Retire</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
