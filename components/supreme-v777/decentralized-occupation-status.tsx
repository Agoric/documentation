"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Crown,
  Globe,
  TrendingUp,
  Shield,
  Diamond,
  Coins,
  Building,
  Target,
  Award,
  Lock,
  Unlock,
  ChevronRight,
  Star,
  Briefcase,
  BanknoteIcon as Bank,
  PieChart,
  BarChart3,
  CheckCircle2,
} from "lucide-react"

interface DecentralizedOccupationMetrics {
  occupationScore: number
  wealthPrivatizationLevel: number
  geographicFreedom: number
  financialSovereignty: number
  digitalAssetControl: number
  passiveIncomeRatio: number
  globalMobility: number
  economicIndependence: number
}

interface WealthCategory {
  id: string
  title: string
  description: string
  currentValue: number
  targetValue: number
  status: "locked" | "unlocked" | "mastered"
  icon: React.ReactNode
  color: string
  benefits: string[]
}

interface OccupationTier {
  id: string
  title: string
  description: string
  requirements: string[]
  benefits: string[]
  unlocked: boolean
  current: boolean
  icon: React.ReactNode
  color: string
}

export function DecentralizedOccupationStatus() {
  const [currentTier, setCurrentTier] = useState("sovereign")
  const [metrics, setMetrics] = useState<DecentralizedOccupationMetrics>({
    occupationScore: 87,
    wealthPrivatizationLevel: 92,
    geographicFreedom: 78,
    financialSovereignty: 95,
    digitalAssetControl: 89,
    passiveIncomeRatio: 73,
    globalMobility: 85,
    economicIndependence: 91,
  })

  const occupationTiers: OccupationTier[] = [
    {
      id: "traditional",
      title: "Traditional Employment",
      description: "Conventional job-based income structure",
      requirements: ["Single income source", "Geographic constraints", "Time-for-money exchange"],
      benefits: ["Steady paycheck", "Basic benefits", "Predictable schedule"],
      unlocked: true,
      current: false,
      icon: <Briefcase className="h-6 w-6" />,
      color: "from-gray-500 to-gray-600",
    },
    {
      id: "freelance",
      title: "Freelance Liberation",
      description: "Location-independent service provision",
      requirements: ["Multiple client streams", "Digital skill monetization", "Remote work capability"],
      benefits: ["Location freedom", "Flexible schedule", "Skill-based pricing"],
      unlocked: true,
      current: false,
      icon: <Globe className="h-6 w-6" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "entrepreneur",
      title: "Entrepreneurial Ascension",
      description: "Business ownership and asset creation",
      requirements: ["Business ownership", "Team management", "Scalable systems"],
      benefits: ["Unlimited income potential", "Asset building", "Legacy creation"],
      unlocked: true,
      current: false,
      icon: <Building className="h-6 w-6" />,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "investor",
      title: "Investment Mastery",
      description: "Capital deployment and passive income generation",
      requirements: ["Investment portfolio", "Passive income streams", "Financial literacy"],
      benefits: ["Money works for you", "Compound growth", "Time freedom"],
      unlocked: true,
      current: false,
      icon: <TrendingUp className="h-6 w-6" />,
      color: "from-green-500 to-green-600",
    },
    {
      id: "sovereign",
      title: "Decentralized Sovereign",
      description: "Complete occupational and financial independence",
      requirements: ["Multiple passive income streams", "Global mobility", "Decentralized wealth"],
      benefits: ["Total freedom", "Wealth sovereignty", "Global citizenship"],
      unlocked: true,
      current: true,
      icon: <Crown className="h-6 w-6" />,
      color: "from-amber-500 to-yellow-600",
    },
    {
      id: "imperial",
      title: "Imperial Authority",
      description: "Wealth creation and global influence",
      requirements: ["Generational wealth", "Global impact", "System influence"],
      benefits: ["Legacy building", "Global influence", "Systemic change"],
      unlocked: false,
      current: false,
      icon: <Diamond className="h-6 w-6" />,
      color: "from-pink-500 to-rose-600",
    },
  ]

  const wealthCategories: WealthCategory[] = [
    {
      id: "liquid",
      title: "Liquid Assets",
      description: "Cash, savings, and immediately accessible funds",
      currentValue: 2847392,
      targetValue: 5000000,
      status: "unlocked",
      icon: <Bank className="h-6 w-6" />,
      color: "text-blue-400",
      benefits: ["Immediate liquidity", "Emergency fund", "Opportunity capital"],
    },
    {
      id: "investments",
      title: "Investment Portfolio",
      description: "Stocks, bonds, ETFs, and traditional securities",
      currentValue: 8934721,
      targetValue: 15000000,
      status: "unlocked",
      icon: <PieChart className="h-6 w-6" />,
      color: "text-green-400",
      benefits: ["Market growth", "Dividend income", "Diversification"],
    },
    {
      id: "crypto",
      title: "Digital Assets",
      description: "Cryptocurrency and blockchain-based investments",
      currentValue: 3472891,
      targetValue: 10000000,
      status: "unlocked",
      icon: <Coins className="h-6 w-6" />,
      color: "text-purple-400",
      benefits: ["Decentralization", "High growth potential", "Global access"],
    },
    {
      id: "real-estate",
      title: "Real Estate Holdings",
      description: "Property investments and real estate assets",
      currentValue: 12847392,
      targetValue: 25000000,
      status: "unlocked",
      icon: <Building className="h-6 w-6" />,
      color: "text-amber-400",
      benefits: ["Passive income", "Appreciation", "Inflation hedge"],
    },
    {
      id: "business",
      title: "Business Equity",
      description: "Ownership stakes in businesses and ventures",
      currentValue: 6738291,
      targetValue: 20000000,
      status: "mastered",
      icon: <BarChart3 className="h-6 w-6" />,
      color: "text-cyan-400",
      benefits: ["Active income", "Growth potential", "Control"],
    },
    {
      id: "alternative",
      title: "Alternative Investments",
      description: "Art, collectibles, commodities, and exotic assets",
      currentValue: 1847392,
      targetValue: 5000000,
      status: "locked",
      icon: <Star className="h-6 w-6" />,
      color: "text-pink-400",
      benefits: ["Diversification", "Unique returns", "Passion investing"],
    },
  ]

  const totalWealth = wealthCategories.reduce((sum, category) => sum + category.currentValue, 0)
  const overallProgress = Math.round((metrics.occupationScore + metrics.wealthPrivatizationLevel) / 2)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-purple-500/10 rounded-2xl" />
        <div className="relative z-10 p-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Crown className="h-12 w-12 text-amber-400" />
            <div>
              <h1 className="text-4xl font-bold text-white">State of Decentralized Occupation</h1>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-purple-500">
                & Privatized Wealth
              </h2>
            </div>
            <Diamond className="h-12 w-12 text-purple-400" />
          </div>

          <p className="text-xl text-slate-300 max-w-4xl mx-auto mb-6">
            Achieve complete financial sovereignty through decentralized occupation structures and privatized wealth
            management systems. Transcend traditional employment limitations and establish true economic independence.
          </p>

          <div className="flex items-center justify-center gap-6">
            <Badge className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-6 py-3 text-lg font-bold">
              <Shield className="mr-2 h-5 w-5" />
              Sovereign Status: Active
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 text-lg font-bold">
              <Target className="mr-2 h-5 w-5" />
              Progress: {overallProgress}%
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Object.entries(metrics).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-gradient-to-br from-slate-900/50 to-indigo-900/50 border-cyan-500/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white mb-2">{value}%</div>
                <div className="text-sm text-cyan-300 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</div>
                <Progress value={value} className="h-2 mt-2" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Occupation Tier Progression */}
      <Card className="bg-slate-900/50 border-amber-500/30">
        <CardHeader>
          <CardTitle className="text-amber-300 flex items-center gap-2">
            <Award className="h-6 w-6" />
            Occupational Evolution Pathway
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {occupationTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative p-6 rounded-xl border-2 transition-all duration-300
                  ${
                    tier.current
                      ? "border-amber-500 bg-gradient-to-r from-amber-950/50 to-yellow-950/50"
                      : tier.unlocked
                        ? "border-slate-600 bg-slate-800/50 hover:border-slate-500"
                        : "border-slate-700 bg-slate-900/30 opacity-60"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      bg-gradient-to-r ${tier.color}
                    `}
                    >
                      {tier.unlocked ? tier.icon : <Lock className="h-6 w-6" />}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        {tier.title}
                        {tier.current && <Badge className="bg-amber-500 text-white">CURRENT</Badge>}
                      </h3>
                      <p className="text-slate-300">{tier.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {tier.unlocked && <CheckCircle2 className="h-6 w-6 text-green-400" />}
                    <ChevronRight className="h-6 w-6 text-slate-400" />
                  </div>
                </div>

                {tier.current && (
                  <div className="mt-4 grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-amber-300 mb-2">Requirements Met:</h4>
                      <ul className="space-y-1">
                        {tier.requirements.map((req, i) => (
                          <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-300 mb-2">Active Benefits:</h4>
                      <ul className="space-y-1">
                        {tier.benefits.map((benefit, i) => (
                          <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                            <Star className="h-4 w-4 text-amber-400" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Privatized Wealth Categories */}
      <Card className="bg-slate-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <PieChart className="h-6 w-6" />
            Privatized Wealth Portfolio
          </CardTitle>
          <div className="text-3xl font-bold text-white">{formatCurrency(totalWealth)}</div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wealthCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative p-6 rounded-xl border-2 transition-all duration-300
                  ${
                    category.status === "mastered"
                      ? "border-green-500 bg-gradient-to-br from-green-950/50 to-emerald-950/50"
                      : category.status === "unlocked"
                        ? "border-slate-600 bg-slate-800/50"
                        : "border-slate-700 bg-slate-900/30 opacity-60"
                  }
                `}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${category.color}`}>{category.icon}</div>
                  <div className="flex items-center gap-2">
                    {category.status === "mastered" && <CheckCircle2 className="h-5 w-5 text-green-400" />}
                    {category.status === "unlocked" && <Unlock className="h-5 w-5 text-blue-400" />}
                    {category.status === "locked" && <Lock className="h-5 w-5 text-slate-500" />}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{category.title}</h3>
                <p className="text-slate-300 text-sm mb-4">{category.description}</p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Current Value</span>
                    <span className="text-white font-bold">{formatCurrency(category.currentValue)}</span>
                  </div>

                  <Progress
                    value={(category.currentValue / category.targetValue) * 100}
                    className="h-2"
                    indicatorClassName={`bg-gradient-to-r ${category.color.replace("text-", "from-")} to-transparent`}
                  />

                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Target</span>
                    <span className="text-slate-300">{formatCurrency(category.targetValue)}</span>
                  </div>
                </div>

                {category.status !== "locked" && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {category.benefits.map((benefit, i) => (
                        <li key={i} className="text-xs text-slate-400 flex items-center gap-1">
                          <div className="w-1 h-1 bg-slate-500 rounded-full" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Center */}
      <Card className="bg-gradient-to-r from-amber-950/50 to-purple-950/50 border-amber-500/30">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Advance Your Sovereign Status</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Take the next steps toward complete decentralized occupation and privatized wealth mastery
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700 px-8 py-3">
              <TrendingUp className="mr-2 h-5 w-5" />
              Optimize Portfolio
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 px-8 py-3">
              <Globe className="mr-2 h-5 w-5" />
              Expand Global Presence
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:from-blue-600 hover:to-cyan-700 px-8 py-3">
              <Shield className="mr-2 h-5 w-5" />
              Enhance Security
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
