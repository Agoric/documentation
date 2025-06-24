"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"
import {
  Shield,
  Award,
  TrendingUp,
  FileText,
  CheckCircle,
  Building,
  Target,
  ArrowRight,
  Zap,
  Crown,
  Star,
  Gem,
  Sparkles,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react"
import { useGlobalCitizenship } from "@/lib/citizenship/use-global-citizenship"
import { useCreditAcceleration } from "@/contexts/credit-acceleration-context"
import { HolographicBadgeSystem } from "@/components/branding/holographic-badge-system"
import { LoanProcessingTerminal } from "@/components/credit/loan-processing-terminal"

// QGI Badge Tiers and Achievements
const qgiBadgeTiers = [
  {
    id: "initiate",
    name: "QGI Initiate",
    description: "Entry level QGI participant",
    requirements: {
      minInvestment: 10000,
      completedTransactions: 5,
      timeInSystem: 30, // days
    },
    benefits: ["Basic QGI Access", "Standard Loan Rates", "Community Forum Access", "Monthly Reports"],
    color: "from-gray-600 to-slate-600",
    icon: Shield,
  },
  {
    id: "adept",
    name: "QGI Adept",
    description: "Experienced QGI investor",
    requirements: {
      minInvestment: 50000,
      completedTransactions: 25,
      timeInSystem: 90,
    },
    benefits: [
      "Enhanced QGI Features",
      "Reduced Loan Rates",
      "Priority Support",
      "Weekly Analytics",
      "Beta Feature Access",
    ],
    color: "from-blue-600 to-cyan-600",
    icon: Award,
  },
  {
    id: "master",
    name: "QGI Master",
    description: "Advanced QGI strategist",
    requirements: {
      minInvestment: 250000,
      completedTransactions: 100,
      timeInSystem: 180,
    },
    benefits: [
      "Premium QGI Tools",
      "Preferential Loan Terms",
      "Dedicated Account Manager",
      "Real-time Analytics",
      "Exclusive Investment Opportunities",
    ],
    color: "from-purple-600 to-indigo-600",
    icon: Star,
  },
  {
    id: "grandmaster",
    name: "QGI Grand Master",
    description: "Elite QGI authority",
    requirements: {
      minInvestment: 1000000,
      completedTransactions: 500,
      timeInSystem: 365,
    },
    benefits: [
      "Full QGI Suite Access",
      "Premium Loan Rates",
      "White-glove Service",
      "Custom Analytics Dashboard",
      "Private Investment Rounds",
      "Advisory Board Consideration",
    ],
    color: "from-amber-600 to-yellow-600",
    icon: Crown,
  },
  {
    id: "supreme",
    name: "QGI Supreme Authority",
    description: "Ultimate QGI mastery",
    requirements: {
      minInvestment: 5000000,
      completedTransactions: 2000,
      timeInSystem: 730,
    },
    benefits: [
      "Unlimited QGI Access",
      "Institutional Loan Rates",
      "Personal Investment Team",
      "AI-Powered Analytics",
      "Exclusive Deal Flow",
      "Board Voting Rights",
      "Revenue Sharing Program",
    ],
    color: "from-gradient-to-r from-amber-400 via-purple-500 to-amber-400",
    icon: Gem,
  },
]

// DAX Trading Metrics
const daxTradingMetrics = {
  totalVolume: 125000000,
  dailyVolume: 2500000,
  activePositions: 47,
  totalPnL: 1250000,
  winRate: 73.2,
  sharpeRatio: 2.4,
  maxDrawdown: 8.7,
  averageReturn: 24.6,
}

// Loan Processing Stats
const loanProcessingStats = {
  totalLoansProcessed: 1247,
  activeLoans: 89,
  totalLoanValue: 45000000,
  averageProcessingTime: 72, // hours
  approvalRate: 87.3,
  defaultRate: 2.1,
}

export function QGIBadgesAndLoanProcessingDashboard() {
  const { currentCitizen, updateCitizenProfile } = useGlobalCitizenship()
  const { loans, createLoan, updateLoanStatus } = useCreditAcceleration()

  const [selectedTab, setSelectedTab] = useState("overview")
  const [selectedBadgeTier, setSelectedBadgeTier] = useState("adept")
  const [loanApplicationData, setLoanApplicationData] = useState({
    amount: 100000,
    purpose: "investment",
    term: 60,
  })

  // Calculate current user's QGI badge tier
  const calculateUserTier = () => {
    const userStats = {
      totalInvestment: currentCitizen.qgiFunds
        ? Object.values(currentCitizen.qgiFunds).reduce((sum, fund) => sum + (fund.bondHoldings?.totalValue || 0), 0)
        : 0,
      completedTransactions: currentCitizen.transactionHistory?.length || 0,
      timeInSystem: currentCitizen.membershipDate
        ? Math.floor((Date.now() - currentCitizen.membershipDate.getTime()) / (1000 * 60 * 60 * 24))
        : 0,
    }

    for (let i = qgiBadgeTiers.length - 1; i >= 0; i--) {
      const tier = qgiBadgeTiers[i]
      if (
        userStats.totalInvestment >= tier.requirements.minInvestment &&
        userStats.completedTransactions >= tier.requirements.completedTransactions &&
        userStats.timeInSystem >= tier.requirements.timeInSystem
      ) {
        return tier
      }
    }
    return qgiBadgeTiers[0] // Default to initiate
  }

  const currentTier = calculateUserTier()
  const nextTier = qgiBadgeTiers[qgiBadgeTiers.findIndex((t) => t.id === currentTier.id) + 1]

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
                QGI Badges & Loan Processing
              </h1>
              <p className="text-xl text-amber-300/80 italic">DAX Trading Integration Platform</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-300">
                  {formatCurrency(daxTradingMetrics.totalVolume)}
                </div>
                <div className="text-sm text-gray-400">DAX Volume</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-300">{loanProcessingStats.approvalRate}%</div>
                <div className="text-sm text-gray-400">Approval Rate</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-300">{formatNumber(loanProcessingStats.activeLoans)}</div>
                <div className="text-sm text-gray-400">Active Loans</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-amber-900/50 to-yellow-900/50 border-amber-400/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-amber-300">{daxTradingMetrics.winRate}%</div>
                <div className="text-sm text-gray-400">Win Rate</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="badges">QGI Badges</TabsTrigger>
            <TabsTrigger value="loans">Loan Processing</TabsTrigger>
            <TabsTrigger value="dax-trading">DAX Trading</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Badge Status */}
              <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
                <CardHeader>
                  <CardTitle className="text-purple-300 flex items-center">
                    <currentTier.icon className="w-5 h-5 mr-2" />
                    Current QGI Badge Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div
                      className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-r ${currentTier.color} flex items-center justify-center mb-4`}
                    >
                      <currentTier.icon className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{currentTier.name}</h3>
                    <p className="text-gray-400">{currentTier.description}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-purple-300">Current Benefits</h4>
                    <div className="space-y-1">
                      {currentTier.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>

                  {nextTier && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-amber-300">Next Tier: {nextTier.name}</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Investment Required:</span>
                          <span className="text-amber-300">{formatCurrency(nextTier.requirements.minInvestment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Transactions Required:</span>
                          <span className="text-amber-300">{nextTier.requirements.completedTransactions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Time Required:</span>
                          <span className="text-amber-300">{nextTier.requirements.timeInSystem} days</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Loan Portfolio Summary */}
              <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
                <CardHeader>
                  <CardTitle className="text-green-300 flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    Loan Portfolio Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Active Loans</div>
                      <div className="text-2xl font-bold text-green-300">{Object.keys(loans).length}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Total Value</div>
                      <div className="text-2xl font-bold text-green-300">
                        {formatCurrency(
                          Object.values(loans).reduce(
                            (sum, loan) => sum + (loan.approvedAmount || loan.requestedAmount),
                            0,
                          ),
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400">Avg Interest Rate</div>
                      <div className="text-xl font-semibold text-green-300">
                        {Object.values(loans).length > 0
                          ? (
                              (Object.values(loans).reduce((sum, loan) => sum + loan.interestRate, 0) /
                                Object.values(loans).length) *
                              100
                            ).toFixed(2)
                          : 0}
                        %
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400">Monthly Payment</div>
                      <div className="text-xl font-semibold text-green-300">
                        {formatCurrency(
                          Object.values(loans).reduce((sum, loan) => sum + (loan.monthlyPayment || 0), 0),
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-300">Recent Loan Activity</h4>
                    <ScrollArea className="h-32">
                      <div className="space-y-2">
                        {Object.values(loans)
                          .slice(0, 5)
                          .map((loan) => (
                            <div key={loan.loanId} className="flex justify-between text-sm">
                              <span className="text-gray-300">{loan.loanId}</span>
                              <Badge
                                className={
                                  loan.status === "approved"
                                    ? "bg-green-600/20 text-green-300"
                                    : loan.status === "pending"
                                      ? "bg-yellow-600/20 text-yellow-300"
                                      : "bg-blue-600/20 text-blue-300"
                                }
                              >
                                {loan.status}
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </ScrollArea>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                    <FileText className="w-4 h-4 mr-2" />
                    Apply for New Loan
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* DAX Trading Performance */}
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  DAX Trading Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-300">{formatCurrency(daxTradingMetrics.totalPnL)}</div>
                    <div className="text-sm text-gray-400">Total P&L</div>
                    <div className="flex items-center justify-center mt-1">
                      <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                      <span className="text-green-400 text-xs">+{daxTradingMetrics.averageReturn}%</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-300">{daxTradingMetrics.activePositions}</div>
                    <div className="text-sm text-gray-400">Active Positions</div>
                    <div className="text-blue-300 text-xs mt-1">Live Trading</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-300">{daxTradingMetrics.sharpeRatio}</div>
                    <div className="text-sm text-gray-400">Sharpe Ratio</div>
                    <div className="text-green-400 text-xs mt-1">Excellent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-300">{daxTradingMetrics.maxDrawdown}%</div>
                    <div className="text-sm text-gray-400">Max Drawdown</div>
                    <div className="text-green-400 text-xs mt-1">Low Risk</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* QGI Badges Tab */}
          <TabsContent value="badges" className="space-y-6">
            <HolographicBadgeSystem userIdeology="sovereign" userTier={currentTier.id as any} showCollection={true} />

            {/* Badge Progression */}
            <Card className="bg-gradient-to-br from-amber-900/50 to-yellow-900/50 border-amber-400/30">
              <CardHeader>
                <CardTitle className="text-amber-300 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Badge Progression Path
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {qgiBadgeTiers.map((tier, index) => {
                    const Icon = tier.icon
                    const isCurrentTier = tier.id === currentTier.id
                    const isCompleted = qgiBadgeTiers.findIndex((t) => t.id === currentTier.id) > index

                    return (
                      <motion.div
                        key={tier.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border ${
                          isCurrentTier
                            ? `bg-gradient-to-r ${tier.color} border-amber-400/50`
                            : isCompleted
                              ? "bg-green-800/20 border-green-400/30"
                              : "bg-slate-800/20 border-slate-600/30"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              isCurrentTier || isCompleted ? "bg-white/20" : "bg-gray-700/50"
                            }`}
                          >
                            <Icon
                              className={`w-6 h-6 ${
                                isCurrentTier ? "text-white" : isCompleted ? "text-green-400" : "text-gray-400"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <h3
                              className={`text-lg font-semibold ${
                                isCurrentTier ? "text-white" : isCompleted ? "text-green-300" : "text-gray-300"
                              }`}
                            >
                              {tier.name}
                            </h3>
                            <p className="text-sm text-gray-400">{tier.description}</p>
                          </div>
                          <div className="text-right">
                            {isCurrentTier && (
                              <Badge className="bg-amber-600/20 text-amber-300 border-amber-400/30">CURRENT</Badge>
                            )}
                            {isCompleted && (
                              <Badge className="bg-green-600/20 text-green-300 border-green-400/30">COMPLETED</Badge>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-gray-400">Min Investment</div>
                            <div className={isCurrentTier ? "text-white" : "text-gray-300"}>
                              {formatCurrency(tier.requirements.minInvestment)}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-400">Transactions</div>
                            <div className={isCurrentTier ? "text-white" : "text-gray-300"}>
                              {tier.requirements.completedTransactions}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-400">Time Required</div>
                            <div className={isCurrentTier ? "text-white" : "text-gray-300"}>
                              {tier.requirements.timeInSystem} days
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <h4 className={`font-medium mb-2 ${isCurrentTier ? "text-white" : "text-gray-300"}`}>
                            Benefits
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                            {tier.benefits.map((benefit) => (
                              <div key={benefit} className="flex items-center text-xs text-gray-400">
                                <CheckCircle className="w-3 h-3 mr-1 text-green-400" />
                                {benefit}
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Loan Processing Tab */}
          <TabsContent value="loans" className="space-y-6">
            <LoanProcessingTerminal />
          </TabsContent>

          {/* DAX Trading Tab */}
          <TabsContent value="dax-trading" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">DAX Trading Integration</h2>
              <p className="text-slate-400">Advanced DAX trading with QGI badge benefits</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trading Performance */}
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
                <CardHeader>
                  <CardTitle className="text-blue-300 flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Trading Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-400 text-sm">Total Volume</div>
                      <div className="text-xl font-bold text-blue-300">
                        {formatCurrency(daxTradingMetrics.totalVolume)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Daily Volume</div>
                      <div className="text-xl font-bold text-blue-300">
                        {formatCurrency(daxTradingMetrics.dailyVolume)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Win Rate</div>
                      <div className="text-xl font-bold text-green-300">{daxTradingMetrics.winRate}%</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Sharpe Ratio</div>
                      <div className="text-xl font-bold text-purple-300">{daxTradingMetrics.sharpeRatio}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Risk Level</span>
                      <span className="text-green-300">Conservative</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Performance vs Benchmark</span>
                      <span className="text-green-300">+{daxTradingMetrics.averageReturn}%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* QGI Badge Benefits for Trading */}
              <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
                <CardHeader>
                  <CardTitle className="text-purple-300 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    QGI Badge Trading Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${currentTier.color} flex items-center justify-center mb-2`}
                    >
                      <currentTier.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{currentTier.name}</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Trading Fee Discount</span>
                      <span className="text-green-300">
                        {currentTier.id === "initiate"
                          ? "5%"
                          : currentTier.id === "adept"
                            ? "15%"
                            : currentTier.id === "master"
                              ? "25%"
                              : currentTier.id === "grandmaster"
                                ? "40%"
                                : "50%"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Leverage Multiplier</span>
                      <span className="text-blue-300">
                        {currentTier.id === "initiate"
                          ? "2x"
                          : currentTier.id === "adept"
                            ? "3x"
                            : currentTier.id === "master"
                              ? "5x"
                              : currentTier.id === "grandmaster"
                                ? "10x"
                                : "20x"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Priority Execution</span>
                      <span className="text-purple-300">
                        {["master", "grandmaster", "supreme"].includes(currentTier.id) ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Advanced Analytics</span>
                      <span className="text-amber-300">
                        {["grandmaster", "supreme"].includes(currentTier.id) ? "Full Access" : "Limited"}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Start DAX Trading
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Active Positions */}
            <Card className="bg-slate-800/50 border-slate-600/50">
              <CardHeader>
                <CardTitle className="text-slate-300 flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
                  Active DAX Positions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { symbol: "DAX40", position: "Long", size: 50000, pnl: 2500, pnlPercent: 5.0 },
                    { symbol: "DAX-TECH", position: "Long", size: 75000, pnl: 4200, pnlPercent: 5.6 },
                    { symbol: "DAX-BANK", position: "Short", size: 30000, pnl: -800, pnlPercent: -2.7 },
                    { symbol: "DAX-AUTO", position: "Long", size: 60000, pnl: 3100, pnlPercent: 5.2 },
                  ].map((position, index) => (
                    <motion.div
                      key={position.symbol}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-white font-medium">{position.symbol}</div>
                        <Badge
                          className={
                            position.position === "Long"
                              ? "bg-green-600/20 text-green-300 border-green-400/30"
                              : "bg-red-600/20 text-red-300 border-red-400/30"
                          }
                        >
                          {position.position}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-white">{formatCurrency(position.size)}</div>
                        <div className={`text-sm ${position.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {position.pnl >= 0 ? "+" : ""}
                          {formatCurrency(position.pnl)} ({position.pnlPercent >= 0 ? "+" : ""}
                          {position.pnlPercent}%)
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Advanced Analytics</h2>
              <p className="text-slate-400">Comprehensive performance analytics and insights</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Metrics */}
              <Card className="bg-slate-800/50 border-slate-600/50">
                <CardHeader>
                  <CardTitle className="text-slate-300 flex items-center">
                    <LineChart className="w-5 h-5 mr-2" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: "Total Return", value: "24.6%", trend: "up", color: "text-green-400" },
                      { metric: "Sharpe Ratio", value: "2.4", trend: "up", color: "text-blue-400" },
                      { metric: "Max Drawdown", value: "8.7%", trend: "down", color: "text-red-400" },
                      { metric: "Win Rate", value: "73.2%", trend: "up", color: "text-green-400" },
                      { metric: "Volatility", value: "12.3%", trend: "stable", color: "text-yellow-400" },
                    ].map((item) => (
                      <div key={item.metric} className="flex items-center justify-between">
                        <span className="text-gray-400">{item.metric}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`font-semibold ${item.color}`}>{item.value}</span>
                          {item.trend === "up" && <TrendingUp className="w-4 h-4 text-green-400" />}
                          {item.trend === "down" && <ArrowRight className="w-4 h-4 text-red-400 rotate-45" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Risk Analysis */}
              <Card className="bg-slate-800/50 border-slate-600/50">
                <CardHeader>
                  <CardTitle className="text-slate-300 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Risk Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { risk: "Market Risk", level: 35, color: "bg-yellow-500" },
                      { risk: "Credit Risk", level: 15, color: "bg-green-500" },
                      { risk: "Liquidity Risk", level: 20, color: "bg-blue-500" },
                      { risk: "Operational Risk", level: 10, color: "bg-purple-500" },
                      { risk: "Concentration Risk", level: 25, color: "bg-orange-500" },
                    ].map((item) => (
                      <div key={item.risk} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white">{item.risk}</span>
                          <span className="text-gray-400">{item.level}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className={`${item.color} h-2 rounded-full transition-all duration-1000`}
                            style={{ width: `${item.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
