"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building2,
  BarChart3,
  Activity,
  Zap,
  Plus,
  Calculator,
  Shield,
  Target,
  Clock,
} from "lucide-react"

interface TradingPosition {
  id: string
  loanType: string
  principalAmount: number
  interestRate: number
  termMonths: number
  guaranteeType: string
  currentValue: number
  unrealizedPnL: number
  roi: number
  riskScore: number
  status: "active" | "pending" | "closed"
}

interface MarketData {
  loanType: string
  averageRate: number
  volume: number
  spread: number
  trend: "up" | "down" | "stable"
  liquidity: "high" | "medium" | "low"
}

export default function InstitutionalTradingPage() {
  const [activeTab, setActiveTab] = React.useState("dashboard")
  const [selectedLoanType, setSelectedLoanType] = React.useState("")
  const [tradeAmount, setTradeAmount] = React.useState("")
  const [isExecuting, setIsExecuting] = React.useState(false)

  const portfolioSummary = {
    totalValue: 2847392000, // $2.8B
    availableCash: 425000000, // $425M
    dailyPnL: 12450000, // $12.45M
    totalROI: 22.4,
    activePositions: 47,
    pendingTrades: 3,
  }

  const tradingPositions: TradingPosition[] = [
    {
      id: "FHA-001",
      loanType: "FHA 30-Year Fixed",
      principalAmount: 450000,
      interestRate: 6.75,
      termMonths: 360,
      guaranteeType: "FHA",
      currentValue: 467250,
      unrealizedPnL: 17250,
      roi: 3.83,
      riskScore: 2.1,
      status: "active",
    },
    {
      id: "VA-002",
      loanType: "VA 30-Year Fixed",
      principalAmount: 520000,
      interestRate: 6.25,
      termMonths: 360,
      guaranteeType: "VA",
      currentValue: 541600,
      unrealizedPnL: 21600,
      roi: 4.15,
      riskScore: 1.8,
      status: "active",
    },
    {
      id: "USDA-003",
      loanType: "USDA Rural Development",
      principalAmount: 380000,
      interestRate: 6.50,
      termMonths: 360,
      guaranteeType: "USDA",
      currentValue: 395400,
      unrealizedPnL: 15400,
      roi: 4.05,
      riskScore: 2.3,
      status: "active",
    },
    {
      id: "CONV-004",
      loanType: "Conventional (Gov Backed)",
      principalAmount: 675000,
      interestRate: 7.00,
      termMonths: 360,
      guaranteeType: "Fannie Mae",
      currentValue: 702000,
      unrealizedPnL: 27000,
      roi: 4.00,
      riskScore: 2.5,
      status: "pending",
    },
  ]

  const marketData: MarketData[] = [
    {
      loanType: "FHA 30-Year",
      averageRate: 6.75,
      volume: 2400000000,
      spread: 0.25,
      trend: "up",
      liquidity: "high",
    },
    {
      loanType: "VA 30-Year",
      averageRate: 6.25,
      volume: 1800000000,
      spread: 0.20,
      trend: "stable",
      liquidity: "high",
    },
    {
      loanType: "USDA Rural",
      averageRate: 6.50,
      volume: 950000000,
      spread: 0.30,
      trend: "down",
      liquidity: "medium",
    },
    {
      loanType: "Conventional",
      averageRate: 7.00,
      volume: 3200000000,
      spread: 0.35,
      trend: "up",
      liquidity: "high",
    },
  ]

  const handleExecuteTrade = async () => {
    setIsExecuting(true)
    // Simulate trade execution
    setTimeout(() => {
      setIsExecuting(false)
    }, 2000)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-400" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-400" />
      case "stable":
        return <Activity className="h-4 w-4 text-blue-400" />
      default:
        return <Activity className="h-4 w-4 text-gray-400" />
    }
  }

  const getLiquidityColor = (liquidity: string) => {
    switch (liquidity) {
      case "high":
        return "text-green-400"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "closed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Institutional Trading Platform
            </h1>
            <p className="text-slate-300 text-xl mt-2">
              Advanced mortgage-backed securities trading with government guarantees
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-600/20 text-green-400 border-green-500/30 px-4 py-2">
              <Activity className="w-4 h-4 mr-2" />
              Live Trading
            </Badge>
            <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Gov. Guaranteed
            </Badge>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">Portfolio Value</p>
                  <p className="text-2xl font-bold text-white">
                    ${(portfolioSummary.totalValue / 1000000000).toFixed(1)}B
                  </p>
                </div>
                <Building2 className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">Available Cash</p>
                  <p className="text-2xl font-bold text-white">
                    ${(portfolioSummary.availableCash / 1000000).toFixed(0)}M
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium">Daily P&L</p>
                  <p className="text-2xl font-bold text-white">
                    +${(portfolioSummary.dailyPnL / 1000000).toFixed(1)}M
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/40 to-red-900/40 border-orange-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm font-medium">Total ROI</p>
                  <p className="text-2xl font-bold text-white">{portfolioSummary.totalROI}%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-900/40 to-green-900/40 border-teal-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-300 text-sm font-medium">Active Positions</p>
                  <p className="text-2xl font-bold text-white">{portfolioSummary.activePositions}</p>
                </div>
                <Target className="h-8 w-8 text-teal-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 border-yellow-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm font-medium">Pending Trades</p>
                  <p className="text-2xl font-bold text-white">{portfolioSummary.pendingTrades}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Trading Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800/50 border-slate-700 grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-green-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="trading" className="data-[state=active]:bg-blue-600">
              <Zap className="w-4 h-4 mr-2" />
              Trading
            </TabsTrigger>
            <TabsTrigger value="positions" className="data-[state=active]:bg-purple-600">
              <Target className="w-4 h-4 mr-2" />
              Positions
            </TabsTrigger>
            <TabsTrigger value="market" className="data-[state=active]:bg-orange-600">
              <Activity className="w-4 h-4 mr-2" />
              Market Data
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-teal-600">
              <Calculator className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Portfolio Performance</CardTitle>
                  <CardDescription>Real-time portfolio metrics and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 text-green-400" />
                      <p className="text-muted-foreground">Performance Chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Government Guarantee Allocation</CardTitle>
                  <CardDescription>Distribution of government-backed securities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">FHA Loans</span>
                      <span className="text-white font-medium">34%</span>
                    </div>
                    <Progress value={34} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">VA Loans</span>
                      <span className="text-white font-medium">28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">USDA Loans</span>
                      <span className="text-white font-medium">18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Conventional (Gov Backed)</span>
                      <span className="text-white font-medium">20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trading" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Execute Trade</CardTitle>
                  <CardDescription>Place orders for government-guaranteed mortgages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Loan Type</label>
                    <Select value={selectedLoanType} onValueChange={setSelectedLoanType}>
                      <SelectTrigger className="bg-slate-900/50 border-slate-600">
                        <SelectValue placeholder="Select loan type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fha">FHA 30-Year Fixed</SelectItem>
                        <SelectItem value="va">VA 30-Year Fixed</SelectItem>
                        <SelectItem value="usda">USDA Rural Development</SelectItem>
                        <SelectItem value="conventional">Conventional (Gov Backed)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Trade Amount</label>
                    <Input
                      type="number"
                      placeholder="Enter amount in USD"
                      value={tradeAmount}
                      onChange={(e) => setTradeAmount(e.target.value)}
                      className="bg-slate-900/50 border-slate-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={handleExecuteTrade}
                      disabled={isExecuting || !selectedLoanType || !tradeAmount}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {isExecuting ? "Executing..." : "Buy"}
                    </Button>
                    <Button
                      onClick={handleExecuteT
