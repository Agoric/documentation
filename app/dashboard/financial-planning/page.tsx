"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calculator,
  TrendingUp,
  CreditCard,
  PiggyBank,
  Target,
  DollarSign,
  Shield,
  Zap,
  Brain,
  Coins,
  Building2,
  ArrowRight,
  Star,
  Activity,
} from "lucide-react"
import Link from "next/link"

export default function FinancialPlanningPage() {
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null)

  const planningTools = [
    {
      id: "budget-calculator",
      title: "Budget Calculator",
      description: "AI-powered budget optimization with real-time expense tracking and smart recommendations",
      icon: Calculator,
      href: "/dashboard/financial-planning/budget-calculator",
      color: "from-blue-600 to-cyan-600",
      features: ["Smart categorization", "Expense predictions", "Savings optimization"],
      status: "Enhanced with AI",
      difficulty: "Beginner",
    },
    {
      id: "investment-planner",
      title: "Investment Planner",
      description: "Advanced portfolio optimization with SNAP-DAX integration and risk assessment tools",
      icon: TrendingUp,
      href: "/dashboard/financial-planning/investment-planner",
      color: "from-green-600 to-emerald-600",
      features: ["SNAP-DAX integration", "Risk analysis", "Portfolio rebalancing"],
      status: "SNAP-DAX Connected",
      difficulty: "Intermediate",
    },
    {
      id: "debt-manager",
      title: "Debt Manager",
      description: "Intelligent debt consolidation strategies with loan marketplace integration",
      icon: CreditCard,
      href: "/dashboard/financial-planning/debt-manager",
      color: "from-red-600 to-pink-600",
      features: ["Debt avalanche method", "Loan marketplace", "Credit score impact"],
      status: "Loan Center Integrated",
      difficulty: "Beginner",
    },
    {
      id: "retirement-simulator",
      title: "Retirement Simulator",
      description: "Monte Carlo simulations with institutional investment opportunities",
      icon: PiggyBank,
      href: "/dashboard/financial-planning/retirement-simulator",
      color: "from-purple-600 to-indigo-600",
      features: ["Monte Carlo analysis", "Institutional access", "Tax optimization"],
      status: "Premium Features",
      difficulty: "Advanced",
    },
  ]

  const quickStats = [
    { label: "Active Goals", value: "12", icon: Target, color: "text-blue-400" },
    { label: "Monthly Savings", value: "$2,450", icon: DollarSign, color: "text-green-400" },
    { label: "Investment Return", value: "+18.7%", icon: TrendingUp, color: "text-purple-400" },
    { label: "Risk Score", value: "Medium", icon: Shield, color: "text-orange-400" },
  ]

  const snapDaxIntegration = {
    portfolioValue: 847392.5,
    dailyChange: 12450.75,
    activePositions: 12,
    recommendedAction: "Rebalance crypto allocation",
  }

  const aiSuggestions = [
    {
      title: "Optimize SNAP-DAX Portfolio",
      description: "Your crypto allocation is 35% - consider rebalancing to 25% for better risk management",
      action: "View SNAP-DAX",
      priority: "high",
      icon: Coins,
    },
    {
      title: "Increase Emergency Fund",
      description: "You're $2,500 short of your 6-month emergency fund goal",
      action: "Adjust Budget",
      priority: "medium",
      icon: Shield,
    },
    {
      title: "Tax-Loss Harvesting",
      description: "Potential $3,200 tax savings available in your investment portfolio",
      action: "Review Investments",
      priority: "high",
      icon: TrendingUp,
    },
    {
      title: "Debt Consolidation Opportunity",
      description: "Save $180/month by consolidating credit cards with our loan marketplace",
      action: "Explore Loans",
      priority: "medium",
      icon: CreditCard,
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500/30 bg-red-500/10"
      case "medium":
        return "border-yellow-500/30 bg-yellow-500/10"
      default:
        return "border-green-500/30 bg-green-500/10"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Financial Planning Suite
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            AI-powered financial planning tools integrated with SNAP-DAX trading, loan marketplace, and institutional
            investments
          </p>
          <div className="flex justify-center gap-4">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Brain className="w-4 h-4 mr-2" />
              AI Enhanced
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              <Coins className="w-4 h-4 mr-2" />
              SNAP-DAX Integrated
            </Badge>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Building2 className="w-4 h-4 mr-2" />
              Institutional Access
            </Badge>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {quickStats.map((stat, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* SNAP-DAX Integration */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Coins className="h-6 w-6 text-blue-400" />
                    SNAP-DAX Portfolio Integration
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Real-time crypto portfolio data integrated into your financial planning
                  </CardDescription>
                </div>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  <Activity className="w-4 h-4 mr-2" />
                  Live Data
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {formatCurrency(snapDaxIntegration.portfolioValue)}
                  </div>
                  <div className="text-sm text-blue-200">Total Crypto Value</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    +{formatCurrency(snapDaxIntegration.dailyChange)}
                  </div>
                  <div className="text-sm text-blue-200">24h Change</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{snapDaxIntegration.activePositions}</div>
                  <div className="text-sm text-blue-200">Active Positions</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div>
                  <div className="font-medium text-white">AI Recommendation</div>
                  <div className="text-sm text-blue-200">{snapDaxIntegration.recommendedAction}</div>
                </div>
                <Link href="/dashboard/snap-dax">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Open SNAP-DAX
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Suggestions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Brain className="h-6 w-6 text-purple-400" />
                AI Financial Recommendations
              </CardTitle>
              <CardDescription className="text-slate-300">
                Personalized suggestions based on your complete financial profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiSuggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`p-4 rounded-lg border ${getPriorityColor(suggestion.priority)} hover:scale-[1.02] transition-all duration-300`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <suggestion.icon className="h-6 w-6 text-white mt-1" />
                      <div>
                        <h4 className="font-medium text-white">{suggestion.title}</h4>
                        <p className="text-sm text-slate-300 mt-1">{suggestion.description}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                    >
                      {suggestion.action}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Planning Tools Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {planningTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              onMouseEnter={() => setHoveredCard(tool.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group"
            >
              <Card
                className={`h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 relative overflow-hidden ${
                  hoveredCard === tool.id ? "scale-[1.02] shadow-2xl" : ""
                }`}
              >
                {/* Holographic border effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${tool.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                />
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${tool.color}`} />

                {/* Floating particles effect */}
                {hoveredCard === tool.id && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${tool.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <tool.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <Badge className={`bg-gradient-to-r ${tool.color} text-white mb-2`}>{tool.status}</Badge>
                      <div className="text-xs text-slate-400">{tool.difficulty}</div>
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-slate-300 transition-all duration-300">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-slate-300 text-base leading-relaxed">
                    {tool.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="text-sm font-medium text-slate-400 mb-3 flex items-center">
                      <Star className="w-4 h-4 mr-2" />
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="text-slate-300 flex items-center text-sm">
                          <div className={`w-2 h-2 bg-gradient-to-r ${tool.color} rounded-full mr-3 flex-shrink-0`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <Link href={tool.href}>
                    <Button
                      className={`w-full bg-gradient-to-r ${tool.color} hover:opacity-90 text-white font-semibold py-3 transition-all duration-300 group-hover:scale-105`}
                    >
                      Launch {tool.title}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Integration Status */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Zap className="h-6 w-6 text-yellow-400" />
                Platform Integration Status
              </CardTitle>
              <CardDescription className="text-slate-300">Connected services and data sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div>
                    <div className="font-medium text-white">SNAP-DAX Trading</div>
                    <div className="text-sm text-green-400">Connected & Live</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div>
                    <div className="font-medium text-white">Loan Marketplace</div>
                    <div className="text-sm text-green-400">Connected & Live</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div>
                    <div className="font-medium text-white">Investment Portal</div>
                    <div className="text-sm text-green-400">Connected & Live</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
