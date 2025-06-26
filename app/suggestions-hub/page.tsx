"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Clock,
  Target,
  Sparkles,
  CheckCircle,
  Star,
  Zap,
  Brain,
  ShieldCheck,
  Briefcase,
  Home,
  BarChart3,
  ShoppingCart,
  Gamepad2,
  Settings,
  DollarSign,
} from "lucide-react"
import { useGlobalUnlock } from "@/contexts/global-unlock-context"

export default function SuggestionsHubPage() {
  const { getAllSuggestions, isEverythingUnlocked } = useGlobalUnlock()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImpact, setSelectedImpact] = useState("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState("all")

  const allSuggestions = getAllSuggestions()

  // Filter suggestions based on search and filters
  const filteredSuggestions = useMemo(() => {
    return allSuggestions.filter((suggestion) => {
      const matchesSearch =
        suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        suggestion.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || suggestion.category === selectedCategory
      const matchesImpact = selectedImpact === "all" || suggestion.impact === selectedImpact
      const matchesTimeframe = selectedTimeframe === "all" || suggestion.timeframe === selectedTimeframe

      return matchesSearch && matchesCategory && matchesImpact && matchesTimeframe
    })
  }, [allSuggestions, searchQuery, selectedCategory, selectedImpact, selectedTimeframe])

  // Group suggestions by category
  const suggestionsByCategory = useMemo(() => {
    const grouped = filteredSuggestions.reduce(
      (acc, suggestion) => {
        if (!acc[suggestion.category]) {
          acc[suggestion.category] = []
        }
        acc[suggestion.category].push(suggestion)
        return acc
      },
      {} as Record<string, typeof filteredSuggestions>,
    )
    return grouped
  }, [filteredSuggestions])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "credit":
        return <ShieldCheck className="h-4 w-4" />
      case "business":
        return <Briefcase className="h-4 w-4" />
      case "realestate":
        return <Home className="h-4 w-4" />
      case "trading":
        return <BarChart3 className="h-4 w-4" />
      case "ecommerce":
        return <ShoppingCart className="h-4 w-4" />
      case "gamification":
        return <Gamepad2 className="h-4 w-4" />
      case "productivity":
        return <Settings className="h-4 w-4" />
      case "financial":
        return <DollarSign className="h-4 w-4" />
      default:
        return <Sparkles className="h-4 w-4" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500/20 text-red-400"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "low":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const categoryStats = useMemo(() => {
    const stats = Object.entries(suggestionsByCategory).map(([category, suggestions]) => ({
      category,
      count: suggestions.length,
      highImpact: suggestions.filter((s) => s.impact === "high").length,
      unlocked: suggestions.filter((s) => s.isUnlocked).length,
    }))
    return stats
  }, [suggestionsByCategory])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Suggestions Hub
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            All AI-powered suggestions and recommendations across the SnappAiFi platform
          </p>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary" className="text-sm">
              <CheckCircle className="h-3 w-3 mr-1" />
              All Unlocked
            </Badge>
            <Badge variant="outline" className="text-sm">
              {allSuggestions.length} Total Suggestions
            </Badge>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Filter Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  <SelectItem value="credit">Credit Suite</SelectItem>
                  <SelectItem value="business">Business Suite</SelectItem>
                  <SelectItem value="realestate">Real Estate</SelectItem>
                  <SelectItem value="trading">Trading</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="gamification">Gamification</SelectItem>
                  <SelectItem value="productivity">Productivity</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedImpact} onValueChange={setSelectedImpact}>
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue placeholder="Impact" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Impact Levels</SelectItem>
                  <SelectItem value="high">High Impact</SelectItem>
                  <SelectItem value="medium">Medium Impact</SelectItem>
                  <SelectItem value="low">Low Impact</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Timeframes</SelectItem>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="1 week">1 Week</SelectItem>
                  <SelectItem value="1 month">1 Month</SelectItem>
                  <SelectItem value="3 months">3 Months</SelectItem>
                  <SelectItem value="6 months">6 Months</SelectItem>
                  <SelectItem value="12 months">12 Months</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Category Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categoryStats.map(({ category, count, highImpact, unlocked }) => (
            <Card
              key={category}
              className="bg-black/20 border-white/10 hover:border-purple-500/30 transition-colors cursor-pointer"
            >
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">{getCategoryIcon(category)}</div>
                <div className="text-lg font-bold">{count}</div>
                <div className="text-xs text-muted-foreground capitalize">{category}</div>
                <div className="text-xs text-green-400">{unlocked} unlocked</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Suggestions Display */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({filteredSuggestions.length})</TabsTrigger>
            <TabsTrigger value="high-impact">High Impact</TabsTrigger>
            <TabsTrigger value="immediate">Immediate</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {Object.entries(suggestionsByCategory).map(([category, suggestions]) => (
              <Card key={category} className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 capitalize">
                    {getCategoryIcon(category)}
                    {category} Suggestions ({suggestions.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {suggestions.map((suggestion) => (
                      <Card
                        key={suggestion.id}
                        className="bg-white/5 border-white/10 hover:border-purple-500/30 transition-colors"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-sm font-medium">{suggestion.title}</CardTitle>
                            <div className="flex items-center gap-1">
                              <Badge className={getImpactColor(suggestion.impact)}>{suggestion.impact}</Badge>
                              {suggestion.isUnlocked && <CheckCircle className="h-4 w-4 text-green-400" />}
                            </div>
                          </div>
                          <CardDescription className="text-xs">{suggestion.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {suggestion.timeframe}
                            </div>
                            <Button size="sm" className="h-6 text-xs">
                              <Zap className="h-3 w-3 mr-1" />
                              Apply
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="high-impact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSuggestions
                .filter((s) => s.impact === "high")
                .map((suggestion) => (
                  <Card
                    key={suggestion.id}
                    className="bg-gradient-to-br from-red-500/10 to-orange-600/10 border-red-500/20"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm font-medium">{suggestion.title}</CardTitle>
                        <Badge className="bg-red-500/20 text-red-400">
                          <Star className="h-3 w-3 mr-1" />
                          High Impact
                        </Badge>
                      </div>
                      <CardDescription>{suggestion.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {suggestion.timeframe}
                        </div>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          <Target className="h-3 w-3 mr-1" />
                          Priority Action
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="immediate" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSuggestions
                .filter((s) => s.timeframe === "immediate")
                .map((suggestion) => (
                  <Card
                    key={suggestion.id}
                    className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/20"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm font-medium">{suggestion.title}</CardTitle>
                        <Badge className="bg-green-500/20 text-green-400">
                          <Zap className="h-3 w-3 mr-1" />
                          Immediate
                        </Badge>
                      </div>
                      <CardDescription>{suggestion.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Take Action Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <div className="text-center py-12">
              <Star className="h-12 w-12 mx-auto text-yellow-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Favorite Suggestions</h3>
              <p className="text-muted-foreground">Star suggestions to add them to your favorites</p>
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <div className="text-center py-12">
              <Clock className="h-12 w-12 mx-auto text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Recent Suggestions</h3>
              <p className="text-muted-foreground">Your recently viewed and applied suggestions will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
