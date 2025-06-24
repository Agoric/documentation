"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge as UIBadge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Crown,
  Shield,
  TrendingUp,
  CheckCircle,
  Zap,
  Target,
  DollarSign,
  CreditCard,
  Building,
  Users,
  Sparkles,
  ArrowRight,
  Star,
  Diamond,
  Banknote,
  PieChart,
  Rocket,
  Lock,
} from "lucide-react"
import Link from "next/link"

// Comprehensive Citizen Data Structure
interface CitizenFinancialProfile {
  // Identity & Status
  citizenId: string
  name: string
  tier: "initiate" | "adept" | "master" | "grand_master" | "supreme_authority"
  joinDate: Date
  lastActivity: Date

  // Credit Scores & Health
  creditScores: {
    snap_personal: number
    snap_business: number
    equifax: number
    transunion: number
    experian: number
    trend: "up" | "down" | "stable"
    lastUpdated: Date
  }

  // Financial Overview
  financials: {
    totalNetWorth: number
    liquidAssets: number
    investments: number
    debt: number
    monthlyIncome: number
    monthlyExpenses: number
    cashFlow: number
    creditUtilization: number
  }

  // Black Diamond Card
  blackDiamondCard: {
    limit: number
    available: number
    consolidatedCards: number
    totalSavings: number
    fraudProtection: boolean
    autoPayEnabled: boolean
    status: "active" | "pending" | "inactive"
  }

  // Goals & Opportunities
  goals: FinancialGoal[]
  opportunities: MarketOpportunity[]
  threats: FinancialThreat[]

  // QGI & Investments
  qgiPortfolio: {
    totalValue: number
    allocation: number
    performance: number
    tier: string
    nextTierRequirement: number
  }

  // Gamification
  badges: any[]
  achievements: Achievement[]
  progressToNextTier: number
}

interface FinancialGoal {
  id: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  deadline: Date
  priority: "low" | "medium" | "high" | "critical"
  status: "on_track" | "at_risk" | "behind" | "completed"
  recommendations: string[]
}

interface MarketOpportunity {
  id: string
  title: string
  description: string
  potentialGain: number
  riskLevel: "low" | "medium" | "high"
  timeframe: string
  category: "credit" | "investment" | "real_estate" | "business" | "qgi"
  urgency: "low" | "medium" | "high" | "critical"
  requirements: string[]
}

interface FinancialThreat {
  id: string
  title: string
  description: string
  potentialLoss: number
  severity: "low" | "medium" | "high" | "critical"
  timeframe: string
  mitigation: string[]
}

interface Achievement {
  id: string
  title: string
  description: string
  points: number
  unlockedDate: Date
}

// Mock Data (In production, this would come from APIs)
const mockCitizenData: CitizenFinancialProfile = {
  citizenId: "CITIZEN_001",
  name: "Supreme Citizen Alpha",
  tier: "grand_master",
  joinDate: new Date("2024-01-15"),
  lastActivity: new Date(),

  creditScores: {
    snap_personal: 847,
    snap_business: 792,
    equifax: 798,
    transunion: 785,
    experian: 802,
    trend: "up",
    lastUpdated: new Date(),
  },

  financials: {
    totalNetWorth: 2750000,
    liquidAssets: 450000,
    investments: 1850000,
    debt: 125000,
    monthlyIncome: 85000,
    monthlyExpenses: 32000,
    cashFlow: 53000,
    creditUtilization: 8.5,
  },

  blackDiamondCard: {
    limit: 500000,
    available: 485000,
    consolidatedCards: 7,
    totalSavings: 15000,
    fraudProtection: true,
    autoPayEnabled: true,
    status: "active",
  },

  goals: [
    {
      id: "goal_1",
      title: "Reach $3M Net Worth",
      description: "Achieve $3 million total net worth by end of year",
      targetAmount: 3000000,
      currentAmount: 2750000,
      deadline: new Date("2024-12-31"),
      priority: "high",
      status: "on_track",
      recommendations: ["Increase QGI allocation", "Optimize tax strategy", "Consider real estate investment"],
    },
    {
      id: "goal_2",
      title: "Supreme Authority Tier",
      description: "Advance to Supreme Authority citizenship tier",
      targetAmount: 5000000,
      currentAmount: 2750000,
      deadline: new Date("2025-06-30"),
      priority: "critical",
      status: "behind",
      recommendations: [
        "Accelerate investment strategy",
        "Increase monthly contributions",
        "Leverage credit optimization",
      ],
    },
  ],

  opportunities: [
    {
      id: "opp_1",
      title: "QGI Quantum Computing Fund",
      description: "Limited-time access to exclusive quantum computing investment",
      potentialGain: 250000,
      riskLevel: "medium",
      timeframe: "48 hours",
      category: "qgi",
      urgency: "critical",
      requirements: ["Grand Master tier", "$100K minimum investment"],
    },
    {
      id: "opp_2",
      title: "Real Estate Arbitrage",
      description: "High-yield real estate opportunity in emerging market",
      potentialGain: 150000,
      riskLevel: "low",
      timeframe: "7 days",
      category: "real_estate",
      urgency: "high",
      requirements: ["Credit score 750+", "Liquid assets $200K+"],
    },
  ],

  threats: [
    {
      id: "threat_1",
      title: "Market Volatility Risk",
      description: "Current portfolio exposed to tech sector volatility",
      potentialLoss: 85000,
      severity: "medium",
      timeframe: "30 days",
      mitigation: ["Diversify portfolio", "Hedge positions", "Reduce tech exposure"],
    },
  ],

  qgiPortfolio: {
    totalValue: 1250000,
    allocation: 45,
    performance: 18.7,
    tier: "Grand Master",
    nextTierRequirement: 2250000,
  },

  badges: [
    {
      id: "badge_1",
      name: "Credit Master",
      description: "Achieved 800+ credit score across all bureaus",
      tier: "Master",
      earnedDate: new Date("2024-02-15"),
      benefits: ["5% loan rate discount", "Priority processing"],
    },
  ],

  achievements: [
    {
      id: "ach_1",
      title: "First Million",
      description: "Reached $1M net worth milestone",
      points: 1000,
      unlockedDate: new Date("2024-01-30"),
    },
  ],

  progressToNextTier: 75,
}

export function SupremeCitizenCommandCenter() {
  const [citizenData, setCitizenData] = useState<CitizenFinancialProfile>(mockCitizenData)
  const [selectedTab, setSelectedTab] = useState("overview")
  const [notifications, setNotifications] = useState<any[]>([])

  // Color coding system
  const getStatusColor = (status: string, value?: number, threshold?: number) => {
    switch (status) {
      case "excellent":
      case "on_track":
      case "completed":
      case "active":
        return "from-emerald-500 to-green-500"
      case "good":
      case "attention":
      case "pending":
        return "from-amber-500 to-yellow-500"
      case "poor":
      case "critical":
      case "at_risk":
      case "behind":
        return "from-red-500 to-rose-500"
      case "urgent":
      case "time_sensitive":
        return "from-indigo-500 to-purple-500"
      default:
        return "from-slate-500 to-gray-500"
    }
  }

  const getTextColor = (status: string) => {
    switch (status) {
      case "excellent":
      case "on_track":
      case "completed":
        return "text-emerald-400"
      case "attention":
      case "pending":
        return "text-amber-400"
      case "critical":
      case "at_risk":
        return "text-red-400"
      case "urgent":
        return "text-indigo-400"
      default:
        return "text-slate-400"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Crown className="w-16 h-16 text-amber-400" />
          </motion.div>
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-400 bg-clip-text text-transparent font-serif">
              SUPREME CITIZEN COMMAND CENTER
            </h1>
            <p className="text-2xl text-amber-300/80 italic font-serif">Welcome back, {citizenData.name}</p>
          </div>
        </div>

        {/* Tier Status */}
        <div className="flex items-center justify-center space-x-4">
          <UIBadge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 text-lg">
            {citizenData.tier.replace("_", " ").toUpperCase()} TIER
          </UIBadge>
          <div className="text-emerald-400">{citizenData.progressToNextTier}% to Supreme Authority</div>
        </div>
      </motion.div>

      {/* Critical Alerts */}
      <AnimatePresence>
        {citizenData.opportunities
          .filter((opp) => opp.urgency === "critical")
          .map((opportunity) => (
            <motion.div
              key={opportunity.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative"
            >
              <Alert className="border-indigo-400/50 bg-gradient-to-r from-indigo-900/50 to-purple-900/50">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Zap className="h-6 w-6 text-indigo-400" />
                </motion.div>
                <AlertDescription className="text-indigo-300 text-lg">
                  <strong>TIME-SENSITIVE OPPORTUNITY:</strong> {opportunity.title} - Potential gain:{" "}
                  {formatCurrency(opportunity.potentialGain)} - Expires in: {opportunity.timeframe}
                  <Button className="ml-4 bg-gradient-to-r from-indigo-600 to-purple-600">Act Now</Button>
                </AlertDescription>
              </Alert>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Main Dashboard */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-slate-800/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="credit">Credit Hub</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="navigation">Navigate</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Financial Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Net Worth */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="bg-gradient-to-br from-emerald-900/50 to-green-900/50 border-emerald-400/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-transparent" />
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="w-8 h-8 text-emerald-400" />
                    <UIBadge className="bg-emerald-600/20 text-emerald-300 border-emerald-400/30">EXCELLENT</UIBadge>
                  </div>
                  <div className="text-3xl font-bold text-emerald-300 mb-2">
                    {formatCurrency(citizenData.financials.totalNetWorth)}
                  </div>
                  <div className="text-emerald-400/70 text-sm">Total Net Worth</div>
                  <div className="flex items-center mt-2">
                    <ArrowRight className="w-4 h-4 text-emerald-400 mr-1" />
                    <span className="text-emerald-400 text-sm">+12.5% YTD</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Cash Flow */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="bg-gradient-to-br from-emerald-900/50 to-green-900/50 border-emerald-400/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="w-8 h-8 text-emerald-400" />
                    <UIBadge className="bg-emerald-600/20 text-emerald-300 border-emerald-400/30">POSITIVE</UIBadge>
                  </div>
                  <div className="text-3xl font-bold text-emerald-300 mb-2">
                    {formatCurrency(citizenData.financials.cashFlow)}
                  </div>
                  <div className="text-emerald-400/70 text-sm">Monthly Cash Flow</div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Credit Utilization */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="bg-gradient-to-br from-emerald-900/50 to-green-900/50 border-emerald-400/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <CreditCard className="w-8 h-8 text-emerald-400" />
                    <UIBadge className="bg-emerald-600/20 text-emerald-300 border-emerald-400/30">OPTIMAL</UIBadge>
                  </div>
                  <div className="text-3xl font-bold text-emerald-300 mb-2">
                    {citizenData.financials.creditUtilization}%
                  </div>
                  <div className="text-emerald-400/70 text-sm">Credit Utilization</div>
                </CardContent>
              </Card>
            </motion.div>

            {/* QGI Performance */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="bg-gradient-to-br from-emerald-900/50 to-green-900/50 border-emerald-400/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Sparkles className="w-8 h-8 text-emerald-400" />
                    <UIBadge className="bg-emerald-600/20 text-emerald-300 border-emerald-400/30">
                      OUTPERFORMING
                    </UIBadge>
                  </div>
                  <div className="text-3xl font-bold text-emerald-300 mb-2">
                    +{citizenData.qgiPortfolio.performance}%
                  </div>
                  <div className="text-emerald-400/70 text-sm">QGI Performance</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Credit Scores Section */}
          <Card className="bg-slate-800/50 border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-slate-300 flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                Credit Score Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* SNAP Personal */}
                <div className="text-center p-4 bg-gradient-to-br from-emerald-900/30 to-green-900/30 rounded-lg border border-emerald-400/20">
                  <div className="text-2xl font-bold text-emerald-300 mb-1">
                    {citizenData.creditScores.snap_personal}
                  </div>
                  <div className="text-sm text-emerald-400">SNAP Personal</div>
                  <div className="text-xs text-emerald-400/70">Proprietary</div>
                </div>

                {/* SNAP Business */}
                <div className="text-center p-4 bg-gradient-to-br from-emerald-900/30 to-green-900/30 rounded-lg border border-emerald-400/20">
                  <div className="text-2xl font-bold text-emerald-300 mb-1">
                    {citizenData.creditScores.snap_business}
                  </div>
                  <div className="text-sm text-emerald-400">SNAP Business</div>
                  <div className="text-xs text-emerald-400/70">Inclusive Metrics</div>
                </div>

                {/* Equifax */}
                <div className="text-center p-4 bg-gradient-to-br from-emerald-900/30 to-green-900/30 rounded-lg border border-emerald-400/20">
                  <div className="text-2xl font-bold text-emerald-300 mb-1">{citizenData.creditScores.equifax}</div>
                  <div className="text-sm text-emerald-400">Equifax</div>
                  <div className="text-xs text-emerald-400/70">Traditional</div>
                </div>

                {/* TransUnion */}
                <div className="text-center p-4 bg-gradient-to-br from-emerald-900/30 to-green-900/30 rounded-lg border border-emerald-400/20">
                  <div className="text-2xl font-bold text-emerald-300 mb-1">{citizenData.creditScores.transunion}</div>
                  <div className="text-sm text-emerald-400">TransUnion</div>
                  <div className="text-xs text-emerald-400/70">Traditional</div>
                </div>

                {/* Experian */}
                <div className="text-center p-4 bg-gradient-to-br from-emerald-900/30 to-green-900/30 rounded-lg border border-emerald-400/20">
                  <div className="text-2xl font-bold text-emerald-300 mb-1">{citizenData.creditScores.experian}</div>
                  <div className="text-sm text-emerald-400">Experian</div>
                  <div className="text-xs text-emerald-400/70">Traditional</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Black Diamond Card */}
          <Card className="bg-gradient-to-br from-slate-900/80 to-black/80 border-amber-400/30">
            <CardHeader>
              <CardTitle className="text-amber-300 flex items-center">
                <Diamond className="w-6 h-6 mr-2" />
                Black Diamond Card - Elite Consolidation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-300 mb-2">
                    {formatCurrency(citizenData.blackDiamondCard.available)}
                  </div>
                  <div className="text-emerald-400/70 text-sm">Available Credit</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-300 mb-2">
                    {citizenData.blackDiamondCard.consolidatedCards}
                  </div>
                  <div className="text-amber-400/70 text-sm">Cards Consolidated</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-300 mb-2">
                    {formatCurrency(citizenData.blackDiamondCard.totalSavings)}
                  </div>
                  <div className="text-emerald-400/70 text-sm">Total Savings</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Lock className="w-6 h-6 text-emerald-400" />
                    <span className="text-emerald-300 font-bold">PROTECTED</span>
                  </div>
                  <div className="text-emerald-400/70 text-sm">Fraud Protection</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Goals Progress */}
          <Card className="bg-slate-800/50 border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-slate-300 flex items-center">
                <Target className="w-6 h-6 mr-2" />
                Goal Progress & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {citizenData.goals.map((goal) => (
                <div key={goal.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-semibold ${getTextColor(goal.status)}`}>{goal.title}</h4>
                      <p className="text-sm text-slate-400">{goal.description}</p>
                    </div>
                    <UIBadge className={`bg-gradient-to-r ${getStatusColor(goal.status)}`}>
                      {goal.status.replace("_", " ").toUpperCase()}
                    </UIBadge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Progress</span>
                      <span className={getTextColor(goal.status)}>
                        {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                      </span>
                    </div>
                    <Progress value={(goal.currentAmount / goal.targetAmount) * 100} className="h-3" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-slate-300">Recommendations:</div>
                    {goal.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-center text-sm text-slate-400">
                        <CheckCircle className="w-3 h-3 mr-2 text-emerald-400" />
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Credit Hub Tab */}
        <TabsContent value="credit" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Supreme Credit Intelligence Hub
            </h2>
            <p className="text-slate-400">Advanced credit optimization with AI-powered recommendations</p>
          </div>

          {/* Credit Score Matrix */}
          <Card className="bg-gradient-to-br from-slate-900/80 to-purple-900/20 border-emerald-400/30">
            <CardHeader>
              <CardTitle className="text-emerald-300 flex items-center text-2xl">
                <Shield className="w-8 h-8 mr-3" />
                Credit Score Matrix - Real-Time Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* SNAP Scores - Proprietary */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-emerald-300 mb-4">SNAP Proprietary Scoring</h3>

                  {/* SNAP Personal */}
                  <motion.div
                    className="p-6 bg-gradient-to-br from-emerald-900/40 to-green-900/40 rounded-xl border-2 border-emerald-400/30"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-emerald-300 font-semibold">SNAP Personal</span>
                      </div>
                      <UIBadge className="bg-emerald-600/20 text-emerald-300 border-emerald-400/30">
                        SUPREME TIER
                      </UIBadge>
                    </div>
                    <div className="text-6xl font-bold text-emerald-300 mb-2">
                      {citizenData.creditScores.snap_personal}
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                      <span className="text-emerald-400">+23 points this month</span>
                    </div>
                    <Progress value={(citizenData.creditScores.snap_personal / 850) * 100} className="h-3 mb-4" />
                    <div className="text-sm text-emerald-400/70">
                      Inclusive metrics including QGI performance, citizenship tier, and traditional factors
                    </div>
                  </motion.div>

                  {/* SNAP Business */}
                  <motion.div
                    className="p-6 bg-gradient-to-br from-emerald-900/40 to-green-900/40 rounded-xl border-2 border-emerald-400/30"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-emerald-300 font-semibold">SNAP Business</span>
                      </div>
                      <UIBadge className="bg-emerald-600/20 text-emerald-300 border-emerald-400/30">
                        MASTER TIER
                      </UIBadge>
                    </div>
                    <div className="text-6xl font-bold text-emerald-300 mb-2">
                      {citizenData.creditScores.snap_business}
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                      <span className="text-emerald-400">+18 points this month</span>
                    </div>
                    <Progress value={(citizenData.creditScores.snap_business / 850) * 100} className="h-3 mb-4" />
                    <div className="text-sm text-emerald-400/70">
                      Business credit with Supreme Authority backing and institutional verification
                    </div>
                  </motion.div>
                </div>

                {/* Traditional Scores */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-blue-300 mb-4">Traditional Bureau Scores</h3>

                  {[
                    { name: "Equifax", score: citizenData.creditScores.equifax, change: +12 },
                    { name: "TransUnion", score: citizenData.creditScores.transunion, change: +8 },
                    { name: "Experian", score: citizenData.creditScores.experian, change: +15 },
                  ].map((bureau) => (
                    <motion.div
                      key={bureau.name}
                      className="p-4 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg border border-blue-400/20"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-blue-300 font-semibold">{bureau.name}</div>
                          <div className="text-3xl font-bold text-blue-300">{bureau.score}</div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-2">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 text-sm">+{bureau.change}</span>
                          </div>
                          <Progress value={(bureau.score / 850) * 100} className="h-2 w-24" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credit Optimization Opportunities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Immediate Opportunities */}
            <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-400/30">
              <CardHeader>
                <CardTitle className="text-indigo-300 flex items-center">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Zap className="w-6 h-6 mr-2" />
                  </motion.div>
                  Immediate Optimization Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "Credit Line Increase Request",
                    description: "Pre-approved for $150K increase on Black Diamond Card",
                    impact: "+25 points",
                    timeframe: "24 hours",
                    urgency: "high",
                  },
                  {
                    title: "Debt Consolidation Optimization",
                    description: "Consolidate remaining external debt for better utilization",
                    impact: "+18 points",
                    timeframe: "3 days",
                    urgency: "medium",
                  },
                  {
                    title: "Business Credit Line Activation",
                    description: "Activate pre-approved $500K business line",
                    impact: "+32 points",
                    timeframe: "48 hours",
                    urgency: "critical",
                  },
                ].map((opportunity, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-indigo-800/20 rounded-lg border border-indigo-400/20"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-indigo-300 font-semibold">{opportunity.title}</h4>
                      <UIBadge
                        className={`${
                          opportunity.urgency === "critical"
                            ? "bg-red-600/20 text-red-300 border-red-400/30"
                            : opportunity.urgency === "high"
                              ? "bg-amber-600/20 text-amber-300 border-amber-400/30"
                              : "bg-blue-600/20 text-blue-300 border-blue-400/30"
                        }`}
                      >
                        {opportunity.urgency.toUpperCase()}
                      </UIBadge>
                    </div>
                    <p className="text-indigo-200/70 text-sm mb-3">{opportunity.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-emerald-400 font-semibold">{opportunity.impact}</span>
                        <span className="text-indigo-400 text-sm">{opportunity.timeframe}</span>
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600">
                        Execute
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Credit Factors Analysis */}
            <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
              <CardHeader>
                <CardTitle className="text-slate-300 flex items-center">
                  <PieChart className="w-6 h-6 mr-2" />
                  Credit Factor Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { factor: "QGI Investment Performance", weight: 35, status: "excellent", score: 95 },
                  { factor: "Payment History", weight: 30, status: "excellent", score: 98 },
                  { factor: "Credit Utilization", weight: 20, status: "good", score: 85 },
                  { factor: "Account Age", weight: 10, status: "good", score: 82 },
                  { factor: "Credit Mix", weight: 5, status: "attention", score: 65 },
                ].map((factor, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">{factor.factor}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-semibold ${getTextColor(factor.status)}`}>{factor.score}%</span>
                        <span className="text-slate-400 text-xs">({factor.weight}%)</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={factor.score} className="flex-1 h-2" />
                      <div
                        className={`w-3 h-3 rounded-full ${
                          factor.status === "excellent"
                            ? "bg-emerald-400"
                            : factor.status === "good"
                              ? "bg-blue-400"
                              : "bg-amber-400"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Black Diamond Card Management */}
          <Card className="bg-gradient-to-br from-black/80 to-slate-900/80 border-amber-400/50">
            <CardHeader>
              <CardTitle className="text-amber-300 flex items-center text-2xl">
                <Diamond className="w-8 h-8 mr-3" />
                Black Diamond Card - Elite Credit Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Card Status */}
                <div className="space-y-4">
                  <h4 className="text-amber-300 font-semibold">Card Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-emerald-900/20 rounded-lg border border-emerald-400/20">
                      <span className="text-emerald-300">Available Credit</span>
                      <span className="text-emerald-300 font-bold">
                        {formatCurrency(citizenData.blackDiamondCard.available)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-amber-900/20 rounded-lg border border-amber-400/20">
                      <span className="text-amber-300">Cards Consolidated</span>
                      <span className="text-amber-300 font-bold">{citizenData.blackDiamondCard.consolidatedCards}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-emerald-900/20 rounded-lg border border-emerald-400/20">
                      <span className="text-emerald-300">Monthly Savings</span>
                      <span className="text-emerald-300 font-bold">
                        {formatCurrency(citizenData.blackDiamondCard.totalSavings)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Protection Features */}
                <div className="space-y-4">
                  <h4 className="text-amber-300 font-semibold">Citizen Protection</h4>
                  <div className="space-y-3">
                    {[
                      { feature: "Fraud Protection", status: "active", icon: Shield },
                      { feature: "Auto-Pay Protection", status: "active", icon: CheckCircle },
                      { feature: "Rate Lock Guarantee", status: "active", icon: Lock },
                      { feature: "Emergency Credit Access", status: "active", icon: Zap },
                    ].map((item, index) => {
                      const Icon = item.icon
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-emerald-900/20 rounded-lg border border-emerald-400/20"
                        >
                          <div className="flex items-center space-x-2">
                            <Icon className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-300">{item.feature}</span>
                          </div>
                          <UIBadge className="bg-emerald-600/20 text-emerald-300 border-emerald-400/30">ACTIVE</UIBadge>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                  <h4 className="text-amber-300 font-semibold">Quick Actions</h4>
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700">
                      Request Credit Increase
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                      Add New Card to Consolidate
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                      View Detailed Statement
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700">
                      Optimize Payment Schedule
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credit Acceleration Programs */}
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
            <CardHeader>
              <CardTitle className="text-purple-300 flex items-center text-2xl">
                <Rocket className="w-8 h-8 mr-3" />
                Credit Acceleration Programs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[
                  {
                    tier: "Tier I - Foundation",
                    description: "Basic credit optimization and monitoring",
                    features: ["Credit monitoring", "Basic optimization", "Monthly reports"],
                    cost: 5000,
                    guarantee: "50 point increase",
                    duration: "12 months",
                    status: "completed",
                  },
                  {
                    tier: "Tier II - Advanced",
                    description: "Advanced credit strategies and business credit",
                    features: ["Business credit building", "Advanced optimization", "Bi-weekly coaching"],
                    cost: 10000,
                    guarantee: "150 point increase",
                    duration: "18 months",
                    status: "completed",
                  },
                  {
                    tier: "Tier III - Supreme",
                    description: "Maximum credit optimization with guarantees",
                    features: ["Supreme Authority backing", "Guaranteed approvals", "Wealth management"],
                    cost: 15000,
                    guarantee: "300 point increase",
                    duration: "24 months",
                    status: "active",
                  },
                ].map((program, index) => (
                  <motion.div
                    key={index}
                    className="p-6 bg-purple-800/20 rounded-xl border border-purple-400/20"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-center mb-4">
                      <h4 className="text-purple-300 font-bold text-lg mb-2">{program.tier}</h4>
                      <p className="text-purple-200/70 text-sm">{program.description}</p>
                    </div>

                    <div className="space-y-3 mb-4">
                      {program.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-purple-200 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-center space-y-2 mb-4">
                      <div className="text-2xl font-bold text-purple-300">{formatCurrency(program.cost)}</div>
                      <div className="text-purple-400 text-sm">{program.duration}</div>
                      <UIBadge className="bg-emerald-600/20 text-emerald-300 border-emerald-400/30">
                        {program.guarantee}
                      </UIBadge>
                    </div>

                    <Button
                      className={`w-full ${
                        program.status === "active"
                          ? "bg-emerald-600 hover:bg-emerald-700"
                          : program.status === "completed"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gradient-to-r from-purple-600 to-indigo-600"
                      }`}
                      disabled={program.status === "completed"}
                    >
                      {program.status === "active"
                        ? "Currently Active"
                        : program.status === "completed"
                          ? "Completed"
                          : "Activate Program"}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Credit Monitoring & Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-300 flex items-center">
                  <Shield className="w-6 h-6 mr-2" />
                  Active Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { service: "24/7 Credit Monitoring", status: "active", lastCheck: "2 minutes ago" },
                  { service: "Identity Theft Protection", status: "active", lastCheck: "5 minutes ago" },
                  { service: "Dark Web Surveillance", status: "active", lastCheck: "1 hour ago" },
                  { service: "Account Change Alerts", status: "active", lastCheck: "Real-time" },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-green-800/20 rounded-lg border border-green-400/20"
                  >
                    <div>
                      <div className="text-green-300 font-medium">{service.service}</div>
                      <div className="text-green-400/70 text-sm">Last check: {service.lastCheck}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      <UIBadge className="bg-green-600/20 text-green-300 border-green-400/30">ACTIVE</UIBadge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    activity: "SNAP Score increased to 847",
                    time: "2 hours ago",
                    impact: "positive",
                    details: "+5 points from QGI performance",
                  },
                  {
                    activity: "Credit utilization optimized",
                    time: "1 day ago",
                    impact: "positive",
                    details: "Reduced to 8.5% across all accounts",
                  },
                  {
                    activity: "New account added to monitoring",
                    time: "3 days ago",
                    impact: "neutral",
                    details: "Business checking account",
                  },
                  {
                    activity: "Payment processed successfully",
                    time: "1 week ago",
                    impact: "positive",
                    details: "Black Diamond Card auto-pay",
                  },
                ].map((item, index) => (
                  <div key={index} className="p-3 bg-blue-800/20 rounded-lg border border-blue-400/20">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-blue-300 text-sm font-medium">{item.activity}</span>
                      <span className="text-blue-400 text-xs">{item.time}</span>
                    </div>
                    <p className="text-blue-200/70 text-xs">{item.details}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Navigation Tab */}
        <TabsContent value="navigation" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Platform Navigation</h2>
            <p className="text-slate-400">Access all areas of your Supreme Citizen platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Credit Acceleration",
                description: "Advanced credit optimization and loan processing",
                href: "/dashboard/credit-acceleration",
                icon: TrendingUp,
                color: "from-blue-600 to-cyan-600",
              },
              {
                title: "QGI Marketplace",
                description: "Quantum Global Investment opportunities",
                href: "/dashboard/qgi-marketplace",
                icon: Sparkles,
                color: "from-purple-600 to-indigo-600",
              },
              {
                title: "Real Estate Empire",
                description: "Property marketplace and investment tools",
                href: "/dashboard/real-estate-marketplace",
                icon: Building,
                color: "from-green-600 to-emerald-600",
              },
              {
                title: "Banking Suite",
                description: "Supreme banking and financial services",
                href: "/dashboard/banking",
                icon: Banknote,
                color: "from-amber-600 to-yellow-600",
              },
              {
                title: "Investment Platform",
                description: "Comprehensive investment management",
                href: "/dashboard/investments",
                icon: PieChart,
                color: "from-pink-600 to-rose-600",
              },
              {
                title: "Business Suite",
                description: "Business management and growth tools",
                href: "/dashboard/business-suite",
                icon: Users,
                color: "from-indigo-600 to-purple-600",
              },
              {
                title: "Gamification Hub",
                description: "Achievements, badges, and progression",
                href: "/dashboard/gamification",
                icon: Star,
                color: "from-orange-600 to-red-600",
              },
              {
                title: "Crypto Vault",
                description: "Secure cryptocurrency management",
                href: "/dashboard/crypto",
                icon: Lock,
                color: "from-teal-600 to-cyan-600",
              },
              {
                title: "AI Assistant",
                description: "Intelligent financial guidance",
                href: "/dashboard/ai-assistant",
                icon: Rocket,
                color: "from-violet-600 to-purple-600",
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href={item.href}>
                    <Card className="bg-slate-800/50 border-slate-600/50 hover:border-amber-400/50 transition-all duration-300 cursor-pointer h-full">
                      <CardContent className="p-6 text-center space-y-4">
                        <div
                          className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                          <p className="text-sm text-slate-400">{item.description}</p>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                          Access Platform
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </TabsContent>

        {/* Other tabs would continue here... */}
      </Tabs>
    </div>
  )
}
