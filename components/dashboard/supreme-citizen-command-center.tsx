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
