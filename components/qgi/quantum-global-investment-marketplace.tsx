"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { motion, AnimatePresence } from "framer-motion"
import {
  Zap,
  TrendingUp,
  DollarSign,
  Target,
  PieChart,
  BarChart3,
  LineChart,
  Activity,
  Sparkles,
  Rocket,
  Coins,
  Calculator,
  Eye,
  Heart,
  Share2,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle,
  Building,
  Atom,
  Dna,
  Sun,
} from "lucide-react"
import { cn } from "@/lib/utils"

// QGI Investment Categories
const investmentCategories = [
  {
    id: "quantum-tech",
    name: "Quantum Technology",
    icon: Atom,
    description: "Next-generation quantum computing and applications",
    totalValue: 850000000,
    assets: 45,
    performance: 28.7,
    risk: "High",
    color: "from-purple-600 to-indigo-600",
    trend: "up",
  },
  {
    id: "global-infrastructure",
    name: "Global Infrastructure",
    icon: Building,
    description: "Worldwide infrastructure development projects",
    totalValue: 1200000000,
    assets: 78,
    performance: 15.2,
    risk: "Medium",
    color: "from-blue-600 to-cyan-600",
    trend: "up",
  },
  {
    id: "renewable-energy",
    name: "Renewable Energy",
    icon: Sun,
    description: "Clean energy and sustainability investments",
    totalValue: 650000000,
    assets: 34,
    performance: 22.4,
    risk: "Medium",
    color: "from-green-600 to-emerald-600",
    trend: "up",
  },
  {
    id: "biotech-pharma",
    name: "Biotech & Pharma",
    icon: Dna,
    description: "Biotechnology and pharmaceutical innovations",
    totalValue: 750000000,
    assets: 56,
    performance: 31.8,
    risk: "High",
    color: "from-pink-600 to-rose-600",
    trend: "up",
  },
  {
    id: "space-aerospace",
    name: "Space & Aerospace",
    icon: Rocket,
    description: "Space exploration and aerospace technology",
    totalValue: 450000000,
    assets: 23,
    performance: 45.2,
    risk: "Very High",
    color: "from-indigo-600 to-purple-600",
    trend: "up",
  },
  {
    id: "digital-assets",
    name: "Digital Assets",
    icon: Coins,
    description: "Cryptocurrency and blockchain investments",
    totalValue: 380000000,
    assets: 67,
    performance: 67.3,
    risk: "Very High",
    color: "from-amber-600 to-yellow-600",
    trend: "up",
  },
]

// Featured QGI Investment Opportunities
const featuredInvestments = [
  {
    id: "qgi-quantum-1",
    name: "Quantum Computing Consortium",
    category: "Quantum Technology",
    description: "Revolutionary quantum computing platform for financial modeling",
    minInvestment: 100000,
    currentValue: 2500000,
    expectedReturn: 35.7,
    timeHorizon: "3-5 years",
    risk: "High",
    performance: 28.4,
    totalRaised: 125000000,
    targetRaise: 200000000,
    investors: 847,
    status: "active",
    features: ["Quantum Advantage", "Financial Modeling", "Risk Analysis", "Portfolio Optimization"],
    keyMetrics: {
      sharpeRatio: 2.4,
      volatility: 18.5,
      maxDrawdown: 12.3,
      beta: 0.85,
    },
    tags: ["Revolutionary", "High Growth", "Quantum"],
  },
  {
    id: "qgi-infra-1",
    name: "Global Smart Cities Initiative",
    category: "Global Infrastructure",
    description: "Smart city infrastructure development across emerging markets",
    minInvestment: 50000,
    currentValue: 1850000,
    expectedReturn: 18.2,
    timeHorizon: "5-10 years",
    risk: "Medium",
    performance: 15.8,
    totalRaised: 450000000,
    targetRaise: 750000000,
    investors: 1234,
    status: "active",
    features: ["Smart Infrastructure", "IoT Integration", "Sustainable Development", "Government Partnerships"],
    keyMetrics: {
      sharpeRatio: 1.8,
      volatility: 12.4,
      maxDrawdown: 8.7,
      beta: 0.92,
    },
    tags: ["Infrastructure", "Smart Cities", "Sustainable"],
  },
  {
    id: "qgi-energy-1",
    name: "Solar Fusion Energy Network",
    category: "Renewable Energy",
    description: "Next-generation solar and fusion energy projects",
    minInvestment: 25000,
    currentValue: 950000,
    expectedReturn: 24.6,
    timeHorizon: "4-7 years",
    risk: "Medium",
    performance: 22.1,
    totalRaised: 280000000,
    targetRaise: 500000000,
    investors: 2156,
    status: "active",
    features: ["Solar Technology", "Fusion Research", "Energy Storage", "Grid Integration"],
    keyMetrics: {
      sharpeRatio: 2.1,
      volatility: 15.2,
      maxDrawdown: 9.8,
      beta: 0.78,
    },
    tags: ["Clean Energy", "Innovation", "Sustainable"],
  },
  {
    id: "qgi-biotech-1",
    name: "Longevity Biotech Fund",
    category: "Biotech & Pharma",
    description: "Breakthrough longevity and anti-aging research",
    minInvestment: 75000,
    currentValue: 1650000,
    expectedReturn: 42.3,
    timeHorizon: "3-6 years",
    risk: "High",
    performance: 38.7,
    totalRaised: 180000000,
    targetRaise: 300000000,
    investors: 567,
    status: "active",
    features: ["Longevity Research", "Gene Therapy", "Regenerative Medicine", "Clinical Trials"],
    keyMetrics: {
      sharpeRatio: 2.8,
      volatility: 22.1,
      maxDrawdown: 15.4,
      beta: 1.12,
    },
    tags: ["Biotech", "Longevity", "Revolutionary"],
  },
  {
    id: "qgi-space-1",
    name: "Mars Colonization Project",
    category: "Space & Aerospace",
    description: "Commercial space exploration and Mars settlement infrastructure",
    minInvestment: 150000,
    currentValue: 3250000,
    expectedReturn: 55.8,
    timeHorizon: "7-15 years",
    risk: "Very High",
    performance: 48.2,
    totalRaised: 95000000,
    targetRaise: 200000000,
    investors: 234,
    status: "active",
    features: ["Mars Infrastructure", "Space Transportation", "Life Support Systems", "Resource Mining"],
    keyMetrics: {
      sharpeRatio: 3.2,
      volatility: 35.7,
      maxDrawdown: 28.4,
      beta: 1.45,
    },
    tags: ["Space", "Mars", "Revolutionary"],
  },
  {
    id: "qgi-crypto-1",
    name: "Quantum Blockchain Protocol",
    category: "Digital Assets",
    description: "Quantum-resistant blockchain and DeFi protocols",
    minInvestment: 10000,
    currentValue: 485000,
    expectedReturn: 78.4,
    timeHorizon: "2-4 years",
    risk: "Very High",
    performance: 72.6,
    totalRaised: 65000000,
    targetRaise: 150000000,
    investors: 3456,
    status: "active",
    features: ["Quantum Security", "DeFi Protocols", "Cross-Chain", "Governance Token"],
    keyMetrics: {
      sharpeRatio: 2.9,
      volatility: 45.2,
      maxDrawdown: 38.7,
      beta: 1.78,
    },
    tags: ["Crypto", "Quantum", "DeFi"],
  },
]

// QGI Portfolio Performance Data
const portfolioData = {
  totalValue: 12750000,
  totalInvested: 8500000,
  totalReturn: 4250000,
  returnPercentage: 50.0,
  monthlyIncome: 125000,
  yearlyProjection: 1650000,
  riskScore: 7.2,
  diversificationScore: 9.1,
  activeInvestments: 23,
  completedInvestments: 8,
}

// Market Intelligence Data
const marketIntelligence = {
  globalMarketCap: 125000000000,
  dailyVolume: 2500000000,
  activeInvestors: 45678,
  totalProjects: 1234,
  successRate: 87.3,
  averageReturn: 24.6,
  topPerformingCategory: "Space & Aerospace",
  emergingTrend: "Quantum Computing",
}

export function QuantumGlobalInvestmentMarketplace() {
  const [selectedTab, setSelectedTab] = useState("marketplace")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedInvestment, setSelectedInvestment] = useState(null)
  const [filters, setFilters] = useState({
    minInvestment: [0, 1000000],
    expectedReturn: [0, 100],
    risk: "all",
    timeHorizon: "all",
    sortBy: "performance_desc",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredInvestments = featuredInvestments.filter((investment) => {
    const matchesCategory = selectedCategory === "all" || investment.category.toLowerCase().includes(selectedCategory)
    const matchesMinInvestment =
      investment.minInvestment >= filters.minInvestment[0] && investment.minInvestment <= filters.minInvestment[1]
    const matchesReturn =
      investment.expectedReturn >= filters.expectedReturn[0] && investment.expectedReturn <= filters.expectedReturn[1]
    const matchesRisk = filters.risk === "all" || investment.risk.toLowerCase() === filters.risk
    const matchesSearch =
      searchQuery === "" ||
      investment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investment.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesMinInvestment && matchesReturn && matchesRisk && matchesSearch
  })

  const toggleFavorite = (investmentId: string) => {
    setFavorites((prev) =>
      prev.includes(investmentId) ? prev.filter((id) => id !== investmentId) : [...prev, investmentId],
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "bg-green-600/20 text-green-300 border-green-400/30"
      case "medium":
        return "bg-yellow-600/20 text-yellow-300 border-yellow-400/30"
      case "high":
        return "bg-orange-600/20 text-orange-300 border-orange-400/30"
      case "very high":
        return "bg-red-600/20 text-red-300 border-red-400/30"
      default:
        return "bg-gray-600/20 text-gray-300 border-gray-400/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Zap className="w-12 h-12 text-amber-400" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-clip-text text-transparent font-serif">
                QGI Marketplace
              </h1>
              <p className="text-xl text-amber-300/80 italic">Quantum Global Investment Platform</p>
            </div>
          </div>

          {/* Market Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-300">
                  {formatCurrency(marketIntelligence.globalMarketCap)}
                </div>
                <div className="text-sm text-gray-400">Global Market Cap</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-300">{marketIntelligence.averageReturn}%</div>
                <div className="text-sm text-gray-400">Average Return</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-300">
                  {formatNumber(marketIntelligence.activeInvestors)}
                </div>
                <div className="text-sm text-gray-400">Active Investors</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-amber-900/50 to-yellow-900/50 border-amber-400/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-amber-300">{marketIntelligence.successRate}%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50">
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
            <TabsTrigger value="analytics">Market Analytics</TabsTrigger>
            <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
            <TabsTrigger value="tools">QGI Tools</TabsTrigger>
          </TabsList>

          {/* Marketplace Tab */}
          <TabsContent value="marketplace" className="space-y-6">
            {/* Search and Filters */}
            <Card className="bg-slate-800/50 border-slate-600/50">
              <CardHeader>
                <CardTitle className="text-slate-300 flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  Investment Discovery
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Search</label>
                    <Input
                      placeholder="Investment name, category..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-slate-700/50 border-slate-600/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="quantum">Quantum Technology</SelectItem>
                        <SelectItem value="infrastructure">Global Infrastructure</SelectItem>
                        <SelectItem value="energy">Renewable Energy</SelectItem>
                        <SelectItem value="biotech">Biotech & Pharma</SelectItem>
                        <SelectItem value="space">Space & Aerospace</SelectItem>
                        <SelectItem value="digital">Digital Assets</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Risk Level</label>
                    <Select value={filters.risk} onValueChange={(value) => setFilters({ ...filters, risk: value })}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Risk Levels</SelectItem>
                        <SelectItem value="low">Low Risk</SelectItem>
                        <SelectItem value="medium">Medium Risk</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                        <SelectItem value="very high">Very High Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Sort By</label>
                    <Select value={filters.sortBy} onValueChange={(value) => setFilters({ ...filters, sortBy: value })}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="performance_desc">Performance: High to Low</SelectItem>
                        <SelectItem value="return_desc">Expected Return: High to Low</SelectItem>
                        <SelectItem value="min_investment_asc">Min Investment: Low to High</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">
                      Min Investment: {formatCurrency(filters.minInvestment[0])} -{" "}
                      {formatCurrency(filters.minInvestment[1])}
                    </label>
                    <Slider
                      value={filters.minInvestment}
                      onValueChange={(value) => setFilters({ ...filters, minInvestment: value })}
                      max={1000000}
                      step={10000}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">
                      Expected Return: {filters.expectedReturn[0]}% - {filters.expectedReturn[1]}%
                    </label>
                    <Slider
                      value={filters.expectedReturn}
                      onValueChange={(value) => setFilters({ ...filters, expectedReturn: value })}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investmentCategories.map((category) => {
                const Icon = category.icon
                return (
                  <motion.div key={category.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card
                      className={cn(
                        "cursor-pointer transition-all duration-300 hover:border-amber-400/50",
                        selectedCategory === category.id.split("-")[0]
                          ? `bg-gradient-to-br ${category.color} border-amber-400/50`
                          : "bg-slate-800/50 border-slate-600/50",
                      )}
                      onClick={() => setSelectedCategory(category.id.split("-")[0])}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                            <p className="text-sm text-gray-300">{category.description}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-gray-400">Total Value</div>
                            <div className="text-white font-semibold">{formatCurrency(category.totalValue)}</div>
                          </div>
                          <div>
                            <div className="text-gray-400">Performance</div>
                            <div className="text-green-300 font-semibold flex items-center">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              {category.performance}%
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-400">Assets</div>
                            <div className="text-white">{category.assets}</div>
                          </div>
                          <div>
                            <div className="text-gray-400">Risk Level</div>
                            <Badge className={getRiskColor(category.risk)}>{category.risk}</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Featured Investments */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">
                  {filteredInvestments.length} Investment Opportunities
                </h3>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant={viewMode === "grid" ? "default" : "outline"}
                    onClick={() => setViewMode("grid")}
                  >
                    Grid
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "list" ? "default" : "outline"}
                    onClick={() => setViewMode("list")}
                  >
                    List
                  </Button>
                </div>
              </div>

              <div
                className={cn(
                  "grid gap-6",
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1",
                )}
              >
                <AnimatePresence>
                  {filteredInvestments.map((investment, index) => (
                    <motion.div
                      key={investment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-slate-800/50 border-slate-600/50 hover:border-amber-400/50 transition-all duration-300 overflow-hidden h-full">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Sparkles className="w-5 h-5 text-amber-400" />
                              <CardTitle className="text-amber-300">{investment.name}</CardTitle>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                                onClick={() => toggleFavorite(investment.id)}
                              >
                                <Heart
                                  className={cn(
                                    "w-4 h-4",
                                    favorites.includes(investment.id) ? "text-red-400 fill-red-400" : "text-gray-400",
                                  )}
                                />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Share2 className="w-4 h-4 text-gray-400" />
                              </Button>
                            </div>
                          </div>
                          <CardDescription className="text-purple-200/70">{investment.category}</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <p className="text-sm text-gray-300">{investment.description}</p>

                          <div className="flex space-x-1">
                            {investment.tags.map((tag) => (
                              <Badge
                                key={tag}
                                className="text-xs bg-purple-600/20 text-purple-300 border-purple-400/30"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-gray-400">Min Investment</div>
                              <div className="text-amber-300 font-semibold">
                                {formatCurrency(investment.minInvestment)}
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-400">Expected Return</div>
                              <div className="text-green-300 font-semibold">{investment.expectedReturn}%</div>
                            </div>
                            <div>
                              <div className="text-gray-400">Time Horizon</div>
                              <div className="text-white">{investment.timeHorizon}</div>
                            </div>
                            <div>
                              <div className="text-gray-400">Risk Level</div>
                              <Badge className={getRiskColor(investment.risk)}>{investment.risk}</Badge>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Funding Progress</span>
                              <span className="text-purple-300">
                                {formatCurrency(investment.totalRaised)} / {formatCurrency(investment.targetRaise)}
                              </span>
                            </div>
                            <Progress value={(investment.totalRaised / investment.targetRaise) * 100} className="h-2" />
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div>
                              <div className="text-gray-400">Performance</div>
                              <div className="text-green-300 flex items-center">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                {investment.performance}%
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-400">Investors</div>
                              <div className="text-white">{formatNumber(investment.investors)}</div>
                            </div>
                            <div>
                              <div className="text-gray-400">Status</div>
                              <div className="text-green-300 capitalize">{investment.status}</div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h5 className="text-sm font-medium text-white">Key Features</h5>
                            <div className="grid grid-cols-2 gap-1">
                              {investment.features.slice(0, 4).map((feature) => (
                                <div key={feature} className="flex items-center text-xs text-gray-400">
                                  <CheckCircle className="w-3 h-3 mr-1 text-green-400" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                              <DollarSign className="w-4 h-4 mr-2" />
                              Invest Now
                            </Button>
                            <Button variant="outline" className="border-amber-400/30 text-amber-300">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">My QGI Portfolio</h2>
              <p className="text-slate-400">Track your quantum global investments and performance</p>
            </div>

            {/* Portfolio Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-300 mb-2">
                    {formatCurrency(portfolioData.totalValue)}
                  </div>
                  <div className="text-sm text-gray-400">Total Portfolio Value</div>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+{portfolioData.returnPercentage}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-300 mb-2">
                    {formatCurrency(portfolioData.totalReturn)}
                  </div>
                  <div className="text-sm text-gray-400">Total Returns</div>
                  <div className="text-blue-300 text-sm mt-2">Realized + Unrealized</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-300 mb-2">{portfolioData.activeInvestments}</div>
                  <div className="text-sm text-gray-400">Active Investments</div>
                  <div className="text-purple-300 text-sm mt-2">{portfolioData.completedInvestments} completed</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-900/50 to-yellow-900/50 border-amber-400/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-amber-300 mb-2">
                    {formatCurrency(portfolioData.monthlyIncome)}
                  </div>
                  <div className="text-sm text-gray-400">Monthly Income</div>
                  <div className="text-amber-300 text-sm mt-2">Projected yield</div>
                </CardContent>
              </Card>
            </div>

            {/* Portfolio Allocation */}
            <Card className="bg-slate-800/50 border-slate-600/50">
              <CardHeader>
                <CardTitle className="text-slate-300 flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
                  Portfolio Allocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {[
                      { category: "Quantum Technology", value: 35, color: "bg-purple-500", amount: 4462500 },
                      { category: "Space & Aerospace", value: 25, color: "bg-indigo-500", amount: 3187500 },
                      { category: "Biotech & Pharma", value: 20, color: "bg-pink-500", amount: 2550000 },
                      { category: "Renewable Energy", value: 12, color: "bg-green-500", amount: 1530000 },
                      { category: "Digital Assets", value: 8, color: "bg-amber-500", amount: 1020000 },
                    ].map((item) => (
                      <div key={item.category} className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded ${item.color}`} />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="text-white">{item.category}</span>
                            <span className="text-gray-400">{item.value}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">{formatCurrency(item.amount)}</span>
                          </div>
                          <Progress value={item.value} className="h-2 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">Risk & Performance Metrics</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Risk Score</span>
                        <span className="text-amber-300">{portfolioData.riskScore}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Diversification Score</span>
                        <span className="text-green-300">{portfolioData.diversificationScore}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Sharpe Ratio</span>
                        <span className="text-blue-300">2.4</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Max Drawdown</span>
                        <span className="text-red-300">-15.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Beta</span>
                        <span className="text-purple-300">1.12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Market Analytics</h2>
              <p className="text-slate-400">Advanced market intelligence and trend analysis</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-600/50">
                <CardHeader>
                  <CardTitle className="text-slate-300 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Category Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {investmentCategories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <category.icon className="w-4 h-4 text-gray-400" />
                          <span className="text-white">{category.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`font-semibold ${category.performance > 20 ? "text-green-400" : category.performance > 10 ? "text-yellow-400" : "text-red-400"}`}
                          >
                            {category.performance > 0 ? "+" : ""}
                            {category.performance}%
                          </span>
                          {category.trend === "up" ? (
                            <ArrowUpRight className="w-4 h-4 text-green-400" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-red-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-600/50">
                <CardHeader>
                  <CardTitle className="text-slate-300 flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Market Sentiment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: "Investor Confidence", value: 87, color: "text-green-400" },
                      { metric: "Market Volatility", value: 23, color: "text-yellow-400" },
                      { metric: "Growth Potential", value: 94, color: "text-green-400" },
                      { metric: "Risk Assessment", value: 45, color: "text-orange-400" },
                      { metric: "Innovation Index", value: 91, color: "text-purple-400" },
                    ].map((item) => (
                      <div key={item.metric} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white">{item.metric}</span>
                          <span className={`font-semibold ${item.color}`}>{item.value}</span>
                        </div>
                        <Progress value={item.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Intelligence Tab */}
          <TabsContent value="intelligence" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Market Intelligence</h2>
              <p className="text-slate-400">AI-powered insights and predictive analytics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Emerging Opportunities",
                  description: "AI-identified high-potential investments",
                  icon: Target,
                  color: "from-green-600 to-emerald-600",
                  insights: ["Quantum AI Startups", "Mars Infrastructure", "Longevity Biotech", "Clean Fusion Energy"],
                },
                {
                  title: "Risk Alerts",
                  description: "Potential risks and mitigation strategies",
                  icon: AlertTriangle,
                  color: "from-red-600 to-pink-600",
                  insights: ["Regulatory Changes", "Market Volatility", "Technology Risks", "Geopolitical Factors"],
                },
                {
                  title: "Trend Analysis",
                  description: "Market trends and future predictions",
                  icon: LineChart,
                  color: "from-blue-600 to-cyan-600",
                  insights: [
                    "Quantum Computing Boom",
                    "Space Economy Growth",
                    "Biotech Revolution",
                    "Energy Transition",
                  ],
                },
              ].map((intelligence, index) => {
                const Icon = intelligence.icon
                return (
                  <motion.div
                    key={intelligence.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-slate-800/50 border-slate-600/50 h-full">
                      <CardContent className="p-6 space-y-4">
                        <div
                          className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${intelligence.color} flex items-center justify-center`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-center">
                          <h3 className="text-lg font-semibold text-white mb-2">{intelligence.title}</h3>
                          <p className="text-sm text-gray-400">{intelligence.description}</p>
                        </div>
                        <div className="space-y-2">
                          {intelligence.insights.map((insight) => (
                            <div key={insight} className="flex items-center text-sm text-gray-300">
                              <Sparkles className="w-3 h-3 mr-2 text-amber-400" />
                              {insight}
                            </div>
                          ))}
                        </div>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">QGI Investment Tools</h2>
              <p className="text-slate-400">Advanced tools for quantum global investment analysis</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Quantum Risk Calculator",
                  description: "Calculate quantum-adjusted risk metrics",
                  icon: Calculator,
                  color: "from-purple-600 to-indigo-600",
                },
                {
                  title: "Portfolio Optimizer",
                  description: "AI-powered portfolio optimization",
                  icon: Target,
                  color: "from-blue-600 to-cyan-600",
                },
                {
                  title: "Return Projector",
                  description: "Project future returns with AI models",
                  icon: TrendingUp,
                  color: "from-green-600 to-emerald-600",
                },
                {
                  title: "Market Simulator",
                  description: "Simulate market scenarios and outcomes",
                  icon: Activity,
                  color: "from-amber-600 to-yellow-600",
                },
                {
                  title: "Diversification Analyzer",
                  description: "Analyze portfolio diversification",
                  icon: PieChart,
                  color: "from-pink-600 to-rose-600",
                },
                {
                  title: "Quantum Predictor",
                  description: "Quantum-powered market predictions",
                  icon: Atom,
                  color: "from-indigo-600 to-purple-600",
                },
              ].map((tool, index) => {
                const Icon = tool.icon
                return (
                  <motion.div
                    key={tool.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card className="bg-slate-800/50 border-slate-600/50 hover:border-amber-400/50 transition-all duration-300 cursor-pointer h-full">
                      <CardContent className="p-6 text-center space-y-4">
                        <div
                          className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${tool.color} flex items-center justify-center`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">{tool.title}</h3>
                          <p className="text-sm text-gray-400">{tool.description}</p>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                          Launch Tool
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
