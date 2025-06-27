"use client"

import * as React from "react"
import {
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  BarChart3,
  Settings,
  Bell,
  Filter,
  Download,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Plus,
  LineChart,
  Activity,
  Wallet,
  Building2,
  Star,
  Calendar,
  MapPin,
  Minus,
  Search,
  ChevronDown,
  ChevronUp,
  Zap,
  Shield,
  Crown,
  Gem,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RoyalDiamondSlabCard } from "@/components/ui/royal-diamond-slab-card"
import { QuantumButton } from "@/components/ui/quantum-button"
import { FuturisticCard } from "@/components/ui/futuristic-card"
import { HolographicHeader } from "@/components/ui/holographic-header"
import { NeuralGrid } from "@/components/ui/neural-grid"

interface InvestmentOpportunity {
  id: string
  loanAmount: number
  investmentAmount: number
  interestRate: number
  term: number
  riskScore: number
  riskCategory: string
  propertyType: string
  location: string
  creditScore: number
  loanToValue: number
  expectedReturn: number
  expectedReturnRate: number
  matchScore: number
  expiresAt: Date
  status: "pending" | "accepted" | "declined" | "expired"
  borrowerProfile: {
    name: string
    experience: string
    previousLoans: number
    rating: number
  }
}

interface PortfolioLoan {
  id: string
  loanAmount: number
  investmentAmount: number
  interestRate: number
  monthlyPayment: number
  remainingBalance: number
  status: "current" | "late" | "default" | "paid_off"
  nextPaymentDate: Date
  totalReturn: number
  annualReturnRate: number
  daysLate?: number
  borrower: string
  propertyAddress: string
  startDate: Date
  maturityDate: Date
  paymentHistory: Array<{
    date: Date
    amount: number
    status: "paid" | "late" | "missed"
  }>
}

interface InvestorStats {
  totalInvested: number
  availableCapital: number
  totalReturn: number
  averageReturn: number
  activeLoans: number
  completedLoans: number
  defaultRate: number
  portfolioValue: number
  monthlyIncome: number
  yearToDateReturn: number
  yearToDateReturnRate: number
}

export default function InvestorPortal() {
  const [activeTab, setActiveTab] = React.useState("dashboard")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterRisk, setFilterRisk] = React.useState("all")
  const [filterStatus, setFilterStatus] = React.useState("all")
  const [isAddFundsOpen, setIsAddFundsOpen] = React.useState(false)
  const [addFundsAmount, setAddFundsAmount] = React.useState("")
  const [addFundsMethod, setAddFundsMethod] = React.useState("bank")
  const [isLoading, setIsLoading] = React.useState(false)
  const [expandedLoan, setExpandedLoan] = React.useState<string | null>(null)

  // Enhanced mock data with 10%-25% returns
  const investorStats: InvestorStats = {
    totalInvested: 2450000,
    availableCapital: 550000,
    totalReturn: 486750,
    averageReturn: 18.2,
    activeLoans: 23,
    completedLoans: 12,
    defaultRate: 1.8,
    portfolioValue: 2936750,
    monthlyIncome: 35420,
    yearToDateReturn: 289340,
    yearToDateReturnRate: 22.5,
  }

  const opportunities: InvestmentOpportunity[] = [
    {
      id: "OPP-001",
      loanAmount: 450000,
      investmentAmount: 225000,
      interestRate: 6.25,
      term: 50,
      riskScore: 85,
      riskCategory: "low",
      propertyType: "primary",
      location: "Austin, TX",
      creditScore: 780,
      loanToValue: 82,
      expectedReturn: 47250,
      expectedReturnRate: 21.0,
      matchScore: 94,
      expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      status: "pending",
      borrowerProfile: {
        name: "Sarah Johnson",
        experience: "First-time buyer",
        previousLoans: 0,
        rating: 4.8,
      },
    },
    {
      id: "OPP-002",
      loanAmount: 320000,
      investmentAmount: 160000,
      interestRate: 7.5,
      term: 50,
      riskScore: 72,
      riskCategory: "medium",
      propertyType: "investment",
      location: "Denver, CO",
      creditScore: 720,
      loanToValue: 85,
      expectedReturn: 28800,
      expectedReturnRate: 18.0,
      matchScore: 87,
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      status: "pending",
      borrowerProfile: {
        name: "Michael Chen",
        experience: "Experienced investor",
        previousLoans: 3,
        rating: 4.9,
      },
    },
    {
      id: "OPP-003",
      loanAmount: 680000,
      investmentAmount: 340000,
      interestRate: 8.75,
      term: 50,
      riskScore: 78,
      riskCategory: "medium",
      propertyType: "luxury",
      location: "Miami, FL",
      creditScore: 750,
      loanToValue: 80,
      expectedReturn: 85000,
      expectedReturnRate: 25.0,
      matchScore: 91,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "pending",
      borrowerProfile: {
        name: "David Rodriguez",
        experience: "Real estate professional",
        previousLoans: 8,
        rating: 4.7,
      },
    },
    {
      id: "OPP-004",
      loanAmount: 520000,
      investmentAmount: 260000,
      interestRate: 5.75,
      term: 50,
      riskScore: 88,
      riskCategory: "low",
      propertyType: "commercial",
      location: "Seattle, WA",
      creditScore: 800,
      loanToValue: 75,
      expectedReturn: 31200,
      expectedReturnRate: 12.0,
      matchScore: 96,
      expiresAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      status: "pending",
      borrowerProfile: {
        name: "Lisa Wang",
        experience: "Commercial developer",
        previousLoans: 15,
        rating: 4.9,
      },
    },
    {
      id: "OPP-005",
      loanAmount: 750000,
      investmentAmount: 375000,
      interestRate: 9.25,
      term: 50,
      riskScore: 65,
      riskCategory: "high",
      propertyType: "development",
      location: "Las Vegas, NV",
      creditScore: 680,
      loanToValue: 90,
      expectedReturn: 93750,
      expectedReturnRate: 25.0,
      matchScore: 82,
      expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      status: "pending",
      borrowerProfile: {
        name: "Robert Martinez",
        experience: "Property developer",
        previousLoans: 5,
        rating: 4.3,
      },
    },
  ]

  const portfolioLoans: PortfolioLoan[] = [
    {
      id: "LOAN-001",
      loanAmount: 400000,
      investmentAmount: 200000,
      interestRate: 6.1,
      monthlyPayment: 2480,
      remainingBalance: 195000,
      status: "current",
      nextPaymentDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      totalReturn: 42600,
      annualReturnRate: 21.3,
      borrower: "Jennifer Smith",
      propertyAddress: "123 Oak Street, San Francisco, CA",
      startDate: new Date("2023-06-15"),
      maturityDate: new Date("2073-06-15"),
      paymentHistory: [
        { date: new Date("2024-01-01"), amount: 2480, status: "paid" },
        { date: new Date("2023-12-01"), amount: 2480, status: "paid" },
        { date: new Date("2023-11-01"), amount: 2480, status: "paid" },
      ],
    },
    {
      id: "LOAN-002",
      loanAmount: 350000,
      investmentAmount: 175000,
      interestRate: 7.4,
      monthlyPayment: 2120,
      remainingBalance: 168000,
      status: "current",
      nextPaymentDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      totalReturn: 31500,
      annualReturnRate: 18.0,
      borrower: "Robert Johnson",
      propertyAddress: "456 Pine Avenue, Seattle, WA",
      startDate: new Date("2023-08-20"),
      maturityDate: new Date("2073-08-20"),
      paymentHistory: [
        { date: new Date("2024-01-01"), amount: 2120, status: "paid" },
        { date: new Date("2023-12-01"), amount: 2120, status: "late" },
        { date: new Date("2023-11-01"), amount: 2120, status: "paid" },
      ],
    },
    {
      id: "LOAN-003",
      loanAmount: 275000,
      investmentAmount: 137500,
      interestRate: 8.8,
      monthlyPayment: 1980,
      remainingBalance: 132000,
      status: "late",
      nextPaymentDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      totalReturn: 20625,
      annualReturnRate: 15.0,
      daysLate: 5,
      borrower: "Maria Garcia",
      propertyAddress: "789 Elm Drive, Phoenix, AZ",
      startDate: new Date("2023-09-10"),
      maturityDate: new Date("2073-09-10"),
      paymentHistory: [
        { date: new Date("2024-01-01"), amount: 0, status: "missed" },
        { date: new Date("2023-12-01"), amount: 1980, status: "late" },
        { date: new Date("2023-11-01"), amount: 1980, status: "paid" },
      ],
    },
    {
      id: "LOAN-004",
      loanAmount: 600000,
      investmentAmount: 300000,
      interestRate: 9.2,
      monthlyPayment: 3750,
      remainingBalance: 285000,
      status: "current",
      nextPaymentDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      totalReturn: 75000,
      annualReturnRate: 25.0,
      borrower: "Thomas Anderson",
      propertyAddress: "321 Luxury Lane, Beverly Hills, CA",
      startDate: new Date("2023-05-01"),
      maturityDate: new Date("2073-05-01"),
      paymentHistory: [
        { date: new Date("2024-01-01"), amount: 3750, status: "paid" },
        { date: new Date("2023-12-01"), amount: 3750, status: "paid" },
        { date: new Date("2023-11-01"), amount: 3750, status: "paid" },
      ],
    },
    {
      id: "LOAN-005",
      loanAmount: 180000,
      investmentAmount: 90000,
      interestRate: 5.5,
      monthlyPayment: 1080,
      remainingBalance: 85000,
      status: "current",
      nextPaymentDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      totalReturn: 9000,
      annualReturnRate: 10.0,
      borrower: "Emily Chen",
      propertyAddress: "654 Suburban Street, Austin, TX",
      startDate: new Date("2023-10-15"),
      maturityDate: new Date("2073-10-15"),
      paymentHistory: [
        { date: new Date("2024-01-01"), amount: 1080, status: "paid" },
        { date: new Date("2023-12-01"), amount: 1080, status: "paid" },
        { date: new Date("2023-11-01"), amount: 1080, status: "paid" },
      ],
    },
  ]

  const handleAcceptOpportunity = async (opportunityId: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Accepting opportunity:", opportunityId)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeclineOpportunity = async (opportunityId: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Declining opportunity:", opportunityId)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddFunds = async () => {
    if (!addFundsAmount || Number.parseFloat(addFundsAmount) <= 0) return

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Adding funds:", addFundsAmount, "via", addFundsMethod)
      setIsAddFundsOpen(false)
      setAddFundsAmount("")
    } finally {
      setIsLoading(false)
    }
  }

  const handleWithdrawFunds = async (amount: number) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Withdrawing funds:", amount)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.propertyType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.borrowerProfile.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRisk = filterRisk === "all" || opp.riskCategory === filterRisk
    const matchesStatus = filterStatus === "all" || opp.status === filterStatus
    return matchesSearch && matchesRisk && matchesStatus
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const getRiskColor = (category: string) => {
    switch (category) {
      case "low":
        return "text-emerald-400 bg-emerald-500/20 border-emerald-500/30"
      case "medium":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
      case "high":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "text-emerald-400 bg-emerald-500/20 border-emerald-500/30"
      case "late":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      case "default":
        return "text-red-500 bg-red-600/20 border-red-600/30"
      case "paid_off":
        return "text-blue-400 bg-blue-500/20 border-blue-500/30"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30"
    }
  }

  const getReturnColor = (returnRate: number) => {
    if (returnRate >= 20) return "text-emerald-400 font-bold"
    if (returnRate >= 15) return "text-green-400 font-semibold"
    if (returnRate >= 10) return "text-blue-400 font-medium"
    return "text-gray-400"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Neural Grid Background */}
      <NeuralGrid className="absolute inset-0 opacity-20" />

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Holographic Header */}
          <HolographicHeader
            title="Elite Investor Portal"
            subtitle="High-yield loan investments with 10%-25% annual returns"
            variant="quantum"
            className="mb-8"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Crown className="h-8 w-8 text-yellow-400" />
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                  Premium Investment Suite
                </h2>
                <p className="text-cyan-300/80">Exclusive access to institutional-grade opportunities</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Dialog open={isAddFundsOpen} onOpenChange={setIsAddFundsOpen}>
                <DialogTrigger asChild>
                  <QuantumButton variant="hologram" size="md" icon={<Plus className="h-4 w-4" />}>
                    Deploy Capital
                  </QuantumButton>
                </DialogTrigger>
                <DialogContent className="bg-slate-900/95 backdrop-blur-xl border-cyan-500/30">
                  <DialogHeader>
                    <DialogTitle className="text-cyan-300">Deploy Investment Capital</DialogTitle>
                    <DialogDescription className="text-cyan-300/70">
                      Add funds to your quantum investment vault for high-yield opportunities
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amount" className="text-cyan-300">
                        Amount
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={addFundsAmount}
                        onChange={(e) => setAddFundsAmount(e.target.value)}
                        className="bg-slate-800/50 border-cyan-500/30 text-cyan-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="method" className="text-cyan-300">
                        Funding Method
                      </Label>
                      <Select value={addFundsMethod} onValueChange={setAddFundsMethod}>
                        <SelectTrigger className="bg-slate-800/50 border-cyan-500/30 text-cyan-100">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-cyan-500/30">
                          <SelectItem value="bank">Quantum Bank Transfer</SelectItem>
                          <SelectItem value="wire">Neural Wire Transfer</SelectItem>
                          <SelectItem value="check">Digital Check Deposit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <QuantumButton
                      onClick={handleAddFunds}
                      disabled={isLoading || !addFundsAmount}
                      className="w-full"
                      variant="hologram"
                      loading={isLoading}
                    >
                      {isLoading
                        ? "Processing..."
                        : `Deploy ${addFundsAmount ? formatCurrency(Number.parseFloat(addFundsAmount)) : "Funds"}`}
                    </QuantumButton>
                  </div>
                </DialogContent>
              </Dialog>
              <QuantumButton variant="neon" size="sm" icon={<Bell className="h-4 w-4" />}>
                Neural Alerts
              </QuantumButton>
              <QuantumButton variant="ghost" size="sm" icon={<Settings className="h-4 w-4" />}>
                Quantum Settings
              </QuantumButton>
            </div>
          </div>

          {/* Elite Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RoyalDiamondSlabCard
              variant="emerald"
              size="lg"
              title="Portfolio Nexus"
              content={formatCurrency(investorStats.portfolioValue)}
              highlightWords={["Nexus"]}
              className="h-40"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-emerald-400" />
                <span className="text-lg text-emerald-400 font-bold">+{investorStats.yearToDateReturnRate}% YTD</span>
              </div>
              <div className="mt-2">
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                  <Gem className="h-3 w-3 mr-1" />
                  Elite Tier
                </Badge>
              </div>
            </RoyalDiamondSlabCard>

            <RoyalDiamondSlabCard
              variant="sapphire"
              size="lg"
              title="Quantum Capital"
              content={formatCurrency(investorStats.availableCapital)}
              highlightWords={["Quantum"]}
              className="h-40"
            >
              <div className="flex items-center gap-2">
                <Wallet className="h-6 w-6 text-blue-400" />
                <span className="text-lg text-blue-400 font-bold">Ready to Deploy</span>
              </div>
              <div className="mt-2">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  <Zap className="h-3 w-3 mr-1" />
                  Instant Access
                </Badge>
              </div>
            </RoyalDiamondSlabCard>

            <RoyalDiamondSlabCard
              variant="ruby"
              size="lg"
              title="Neural Income"
              content={formatCurrency(investorStats.monthlyIncome)}
              highlightWords={["Neural"]}
              className="h-40"
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-red-400" />
                <span className="text-lg text-red-400 font-bold">{investorStats.activeLoans} Active Streams</span>
              </div>
              <div className="mt-2">
                <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                  <Activity className="h-3 w-3 mr-1" />
                  Auto-Compound
                </Badge>
              </div>
            </RoyalDiamondSlabCard>

            <RoyalDiamondSlabCard
              variant="diamond"
              size="lg"
              title="Quantum Yield"
              content={`${investorStats.averageReturn}%`}
              highlightWords={["Quantum"]}
              className="h-40"
            >
              <div className="flex items-center gap-2">
                <Target className="h-6 w-6 text-white" />
                <span className="text-lg text-white font-bold">Ultra High Yield</span>
              </div>
              <div className="mt-2">
                <Badge className="bg-white/20 text-white border-white/30">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium Returns
                </Badge>
              </div>
            </RoyalDiamondSlabCard>
          </div>

          {/* Quantum Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-slate-900/50 backdrop-blur-xl border border-cyan-500/30">
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-cyan-300"
              >
                Neural Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="opportunities"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500/20 data-[state=active]:to-green-500/20 data-[state=active]:text-emerald-300"
              >
                Quantum Opportunities
              </TabsTrigger>
              <TabsTrigger
                value="portfolio"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-500/20 data-[state=active]:text-purple-300"
              >
                Elite Portfolio
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500/20 data-[state=active]:to-orange-500/20 data-[state=active]:text-yellow-300"
              >
                Neural Analytics
              </TabsTrigger>
              <TabsTrigger
                value="account"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500/20 data-[state=active]:to-pink-500/20 data-[state=active]:text-red-300"
              >
                Quantum Account
              </TabsTrigger>
            </TabsList>

            {/* Neural Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quantum Activity Feed */}
                <FuturisticCard variant="hologram" className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Activity className="h-6 w-6 text-emerald-400" />
                    <h3 className="text-xl font-bold text-emerald-300">Neural Activity Stream</h3>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                      <Zap className="h-3 w-3 mr-1" />
                      Live
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    <FuturisticCard variant="glass" size="sm" className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-400" />
                          <div>
                            <p className="font-medium text-emerald-300">Quantum Yield Payment</p>
                            <p className="text-sm text-emerald-300/70">LOAN-004 • {formatCurrency(3750)} (25% APR)</p>
                          </div>
                        </div>
                        <span className="text-sm text-cyan-300/60">2h ago</span>
                      </div>
                    </FuturisticCard>

                    <FuturisticCard variant="neon" size="sm" className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Eye className="h-5 w-5 text-cyan-400" />
                          <div>
                            <p className="font-medium text-cyan-300">Premium Opportunity</p>
                            <p className="text-sm text-cyan-300/70">
                              {formatCurrency(450000)} • 21% yield • 94% neural match
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-cyan-300/60">1d ago</span>
                      </div>
                    </FuturisticCard>

                    <FuturisticCard variant="plasma" size="sm" className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <AlertCircle className="h-5 w-5 text-yellow-400" />
                          <div>
                            <p className="font-medium text-yellow-300">Neural Alert</p>
                            <p className="text-sm text-yellow-300/70">LOAN-003 • 5 days overdue • 15% APR</p>
                          </div>
                        </div>
                        <span className="text-sm text-yellow-300/60">3d ago</span>
                      </div>
                    </FuturisticCard>

                    <FuturisticCard variant="quantum" size="sm" className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Plus className="h-5 w-5 text-purple-400" />
                          <div>
                            <p className="font-medium text-purple-300">Capital Deployment</p>
                            <p className="text-sm text-purple-300/70">{formatCurrency(300000)} • 25% expected yield</p>
                          </div>
                        </div>
                        <span className="text-sm text-purple-300/60">1w ago</span>
                      </div>
                    </FuturisticCard>
                  </div>
                </FuturisticCard>

                {/* Quantum Performance Matrix */}
                <FuturisticCard variant="neural" className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <LineChart className="h-6 w-6 text-blue-400" />
                    <h3 className="text-xl font-bold text-blue-300">Quantum Performance Matrix</h3>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      <Shield className="h-3 w-3 mr-1" />
                      Secured
                    </Badge>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-cyan-300">YTD Neural Return</span>
                        <span className="font-bold text-emerald-400 text-lg">
                          +{formatCurrency(investorStats.yearToDateReturn)} ({investorStats.yearToDateReturnRate}%)
                        </span>
                      </div>
                      <Progress value={90} className="h-3 bg-slate-800/50" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-cyan-300">Quantum Capital Deployed</span>
                        <span className="font-bold text-blue-400">81.7%</span>
                      </div>
                      <Progress value={82} className="h-3 bg-slate-800/50" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-cyan-300">Neural Risk Score</span>
                        <span className="font-bold text-purple-400">Optimized</span>
                      </div>
                      <Progress value={45} className="h-3 bg-slate-800/50" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-cyan-300">Portfolio Diversification</span>
                        <span className="font-bold text-emerald-400">Quantum Level</span>
                      </div>
                      <Progress value={92} className="h-3 bg-slate-800/50" />
                    </div>
                  </div>
                </FuturisticCard>
              </div>

              {/* Quantum Action Matrix */}
              <FuturisticCard variant="glass" className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="h-6 w-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-yellow-300">Quantum Action Matrix</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <QuantumButton
                    variant="hologram"
                    size="lg"
                    className="h-24 flex-col gap-3"
                    onClick={() => setIsAddFundsOpen(true)}
                    icon={<Plus className="h-6 w-6" />}
                  >
                    Deploy Capital
                  </QuantumButton>
                  <QuantumButton
                    variant="neon"
                    size="lg"
                    className="h-24 flex-col gap-3"
                    onClick={() => setActiveTab("opportunities")}
                    icon={<Search className="h-6 w-6" />}
                  >
                    Scan Opportunities
                  </QuantumButton>
                  <QuantumButton
                    variant="plasma"
                    size="lg"
                    className="h-24 flex-col gap-3"
                    onClick={() => handleWithdrawFunds(10000)}
                    icon={<Minus className="h-6 w-6" />}
                  >
                    Extract Funds
                  </QuantumButton>
                  <QuantumButton
                    variant="quantum"
                    size="lg"
                    className="h-24 flex-col gap-3"
                    onClick={() => setActiveTab("analytics")}
                    icon={<BarChart3 className="h-6 w-6" />}
                  >
                    Neural Analytics
                  </QuantumButton>
                </div>
              </FuturisticCard>
            </TabsContent>

            {/* Quantum Opportunities Tab */}
            <TabsContent value="opportunities" className="space-y-6">
              {/* Neural Filters */}
              <FuturisticCard variant="glass" className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Neural scan for quantum opportunities..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-slate-800/50 border-cyan-500/30 text-cyan-100 placeholder:text-cyan-300/50"
                    />
                  </div>
                  <Select value={filterRisk} onValueChange={setFilterRisk}>
                    <SelectTrigger className="w-48 bg-slate-800/50 border-cyan-500/30 text-cyan-100">
                      <SelectValue placeholder="Neural Risk Level" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-cyan-500/30">
                      <SelectItem value="all">All Risk Levels</SelectItem>
                      <SelectItem value="low">Low Risk (10-15%)</SelectItem>
                      <SelectItem value="medium">Medium Risk (15-20%)</SelectItem>
                      <SelectItem value="high">High Risk (20-25%)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40 bg-slate-800/50 border-cyan-500/30 text-cyan-100">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-cyan-500/30">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="declined">Declined</SelectItem>
                    </SelectContent>
                  </Select>
                  <QuantumButton variant="neon" size="sm" icon={<Filter className="h-4 w-4" />}>
                    Neural Filters
                  </QuantumButton>
                </div>
              </FuturisticCard>

              {/* Quantum Opportunities Matrix */}
              <div className="space-y-4">
                {filteredOpportunities.map((opportunity) => (
                  <FuturisticCard
                    key={opportunity.id}
                    variant="hologram"
                    className="p-6 hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-xl font-bold text-cyan-300">
                            {formatCurrency(opportunity.loanAmount)} Quantum Loan
                          </h3>
                          <Badge className={`${getRiskColor(opportunity.riskCategory)} border`}>
                            <Shield className="h-3 w-3 mr-1" />
                            {opportunity.riskCategory} risk
                          </Badge>
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                            <Target className="h-3 w-3 mr-1" />
                            {opportunity.matchScore}% neural match
                          </Badge>
                          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-bold">
                            <Gem className="h-3 w-3 mr-1" />
                            {opportunity.expectedReturnRate}% APR
                          </Badge>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(opportunity.borrowerProfile.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-500"
                                }`}
                              />
                            ))}
                            <span className="text-sm text-cyan-300/70 ml-2">{opportunity.borrowerProfile.rating}</span>
                          </div>
                        </div>
                        <p className="text-cyan-300/80 flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          {opportunity.propertyType} • {opportunity.location}
                        </p>
                        <p className="text-sm text-cyan-300/60">
                          Neural Agent: {opportunity.borrowerProfile.name} • {opportunity.borrowerProfile.experience}
                        </p>
                      </div>
                      <div className="text-right space-y-2">
                        <p className={`text-3xl font-bold ${getReturnColor(opportunity.expectedReturnRate)}`}>
                          {formatCurrency(opportunity.expectedReturn)}
                        </p>
                        <p className="text-sm text-cyan-300/70">Expected Quantum Return</p>
                        <p className={`text-xl font-bold ${getReturnColor(opportunity.expectedReturnRate)}`}>
                          {opportunity.expectedReturnRate}% APR
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-cyan-300/70">Investment Quantum</p>
                        <p className="font-bold text-cyan-300">{formatCurrency(opportunity.investmentAmount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-cyan-300/70">Neural Rate</p>
                        <p className="font-bold text-cyan-300">{opportunity.interestRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-cyan-300/70">Quantum Term</p>
                        <p className="font-bold text-cyan-300">{opportunity.term} years</p>
                      </div>
                      <div>
                        <p className="text-sm text-cyan-300/70">Credit Matrix</p>
                        <p className="font-bold text-cyan-300">{opportunity.creditScore}</p>
                      </div>
                      <div>
                        <p className="text-sm text-cyan-300/70">LTV Ratio</p>
                        <p className="font-bold text-cyan-300">{opportunity.loanToValue}%</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-cyan-300/60">
                        <Clock className="h-4 w-4" />
                        Neural expiry in{" "}
                        {Math.ceil((opportunity.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                      </div>
                      <div className="flex items-center gap-3">
                        <QuantumButton
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeclineOpportunity(opportunity.id)}
                          disabled={isLoading}
                          icon={<ThumbsDown className="h-4 w-4" />}
                        >
                          Decline
                        </QuantumButton>
                        <QuantumButton
                          variant="hologram"
                          size="md"
                          onClick={() => handleAcceptOpportunity(opportunity.id)}
                          disabled={isLoading}
                          loading={isLoading}
                          icon={<ThumbsUp className="h-4 w-4" />}
                        >
                          Accept Quantum Investment
                        </QuantumButton>
                      </div>
                    </div>
                  </FuturisticCard>
                ))}
              </div>
            </TabsContent>

            {/* Elite Portfolio Tab */}
            <TabsContent value="portfolio" className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Crown className="h-6 w-6 text-yellow-400" />
                  <h2 className="text-2xl font-bold text-yellow-300">Elite Quantum Portfolio</h2>
                </div>
                <QuantumButton variant="neon" size="sm" icon={<Download className="h-4 w-4" />}>
                  Export Neural Data
                </QuantumButton>
              </div>

              <div className="space-y-4">
                {portfolioLoans.map((loan) => (
                  <FuturisticCard
                    key={loan.id}
                    variant="neural"
                    className="p-6 hover:scale-[1.01] transition-transform duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-xl font-bold text-purple-300">{loan.id}</h3>
                          <Badge className={`${getStatusColor(loan.status)} border`}>
                            <Activity className="h-3 w-3 mr-1" />
                            {loan.status}
                          </Badge>
                          <Badge
                            className={`${getReturnColor(loan.annualReturnRate)} bg-emerald-500/20 border-emerald-500/30`}
                          >
                            <Gem className="h-3 w-3 mr-1" />
                            {loan.annualReturnRate}% APR
                          </Badge>
                          {loan.daysLate && (
                            <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {loan.daysLate} days overdue
                            </Badge>
                          )}
                        </div>
                        <p className="text-purple-300/80">Neural Agent: {loan.borrower}</p>
                        <p className="text-sm text-purple-300/60 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {loan.propertyAddress}
                        </p>
                      </div>
                      <div className="text-right space-y-2">
                        <p className={`text-3xl font-bold ${getReturnColor(loan.annualReturnRate)}`}>
                          +{formatCurrency(loan.totalReturn)}
                        </p>
                        <p className="text-sm text-purple-300/70">Total Quantum Return</p>
                        <p className={`text-xl font-bold ${getReturnColor(loan.annualReturnRate)}`}>
                          {loan.annualReturnRate}% APR
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-purple-300/70">Quantum Investment</p>
                        <p className="font-bold text-purple-300">{formatCurrency(loan.investmentAmount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-purple-300/70">Neural Payment</p>
                        <p className="font-bold text-purple-300">{formatCurrency(loan.monthlyPayment)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-purple-300/70">Remaining Balance</p>
                        <p className="font-bold text-purple-300">{formatCurrency(loan.remainingBalance)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-purple-300/70">Next Neural Sync</p>
                        <p className="font-bold text-purple-300">{formatDate(loan.nextPaymentDate)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-purple-300/70">Quantum Progress</span>
                          <Progress
                            value={((loan.investmentAmount - loan.remainingBalance) / loan.investmentAmount) * 100}
                            className="w-32 h-3 bg-slate-800/50"
                          />
                          <span className="text-sm text-purple-300">
                            {Math.round(
                              ((loan.investmentAmount - loan.remainingBalance) / loan.investmentAmount) * 100,
                            )}
                            %
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <QuantumButton
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedLoan(expandedLoan === loan.id ? null : loan.id)}
                          icon={
                            expandedLoan === loan.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )
                          }
                        >
                          Neural Details
                        </QuantumButton>
                        <QuantumButton variant="neon" size="sm" icon={<Eye className="h-4 w-4" />}>
                          Quantum View
                        </QuantumButton>
                      </div>
                    </div>

                    {expandedLoan === loan.id && (
                      <div className="mt-6 pt-6 border-t border-purple-500/30">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FuturisticCard variant="glass" size="sm" className="p-4">
                            <h4 className="font-bold text-purple-300 mb-3 flex items-center gap-2">
                              <Shield className="h-4 w-4" />
                              Quantum Loan Matrix
                            </h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between">
                                <span className="text-purple-300/70">Neural Start:</span>
                                <span className="text-purple-300">{formatDate(loan.startDate)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-purple-300/70">Quantum Maturity:</span>
                                <span className="text-purple-300">{formatDate(loan.maturityDate)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-purple-300/70">Neural Rate:</span>
                                <span className="font-bold text-emerald-400">{loan.interestRate}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-purple-300/70">Quantum Return:</span>
                                <span className={`font-bold ${getReturnColor(loan.annualReturnRate)}`}>
                                  {loan.annualReturnRate}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-purple-300/70">Original Quantum:</span>
                                <span className="text-purple-300">{formatCurrency(loan.loanAmount)}</span>
                              </div>
                            </div>
                          </FuturisticCard>
                          <FuturisticCard variant="glass" size="sm" className="p-4">
                            <h4 className="font-bold text-purple-300 mb-3 flex items-center gap-2">
                              <Activity className="h-4 w-4" />
                              Neural Payment History
                            </h4>
                            <div className="space-y-3">
                              {loan.paymentHistory.slice(0, 3).map((payment, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                  <span className="text-purple-300/70">{formatDate(payment.date)}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-purple-300">
                                      {payment.amount > 0 ? formatCurrency(payment.amount) : "Neural Miss"}
                                    </span>
                                    <Badge
                                      className={`text-xs ${
                                        payment.status === "paid"
                                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                          : "bg-red-500/20 text-red-300 border-red-500/30"
                                      }`}
                                    >
                                      {payment.status}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </FuturisticCard>
                        </div>
                      </div>
                    )}
                  </FuturisticCard>
                ))}
              </div>
            </TabsContent>

            {/* Neural Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FuturisticCard variant="quantum" className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <BarChart3 className="h-6 w-6 text-purple-400" />
                    <h3 className="text-xl font-bold text-purple-300">Quantum Yield Analysis</h3>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      <Zap className="h-3 w-3 mr-1" />
                      Neural Powered
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Premium Loans (20-25%)</span>
                      <div className="flex items-center gap-2">
                        <Progress value={95} className="w-24 h-3 bg-slate-800/50" />
                        <span className="text-sm font-bold text-emerald-400">23.2%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">High-Yield Loans (15-20%)</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-24 h-3 bg-slate-800/50" />
                        <span className="text-sm font-bold text-green-400">18.5%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Standard Loans (10-15%)</span>
                      <div className="flex items-center gap-2">
                        <Progress value={72} className="w-24 h-3 bg-slate-800/50" />
                        <span className="text-sm font-bold text-blue-400">12.1%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300">Bridge Loans (20-25%)</span>
                      <div className="flex items-center gap-2">
                        <Progress value={92} className="w-24 h-3 bg-slate-800/50" />
                        <span className="text-sm font-bold text-emerald-400">24.5%</span>
                      </div>
                    </div>
                  </div>
                </FuturisticCard>

                <FuturisticCard variant="hologram" className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="h-6 w-6 text-emerald-400" />
                    <h3 className="text-xl font-bold text-emerald-300">Neural Risk Distribution</h3>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                      <Shield className="h-3 w-3 mr-1" />
                      Optimized
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-300">Low Risk (10-15%)</span>
                      <div className="flex items-center gap-2">
                        <Progress value={40} className="w-24 h-3 bg-slate-800/50" />
                        <span className="text-sm font-bold text-emerald-400">40%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-300">Medium Risk (15-20%)</span>
                      <div className="flex items-center gap-2">
                        <Progress value={35} className="w-24 h-3 bg-slate-800/50" />
                        <span className="text-sm font-bold text-yellow-400">35%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-300">High Risk (20-25%)</span>
                      <div className="flex items-center gap-2">
                        <Progress value={25} className="w-24 h-3 bg-slate-800/50" />
                        <span className="text-sm font-bold text-red-400">25%</span>
                      </div>
                    </div>
                  </div>
                </FuturisticCard>

                <FuturisticCard variant="neon" className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="h-6 w-6 text-cyan-400" />
                    <h3 className="text-xl font-bold text-cyan-300">Quantum Geographic Matrix</h3>
                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                      <Activity className="h-3 w-3 mr-1" />
                      Live Data
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-300">California Neural Zone</span>
                      <div className="flex items-center gap-2">
                        <Progress value={45} className="w-24 h-3 bg-slate-800/50" />
                        <span className="text-sm font-bold text-cyan-400">45%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-300">Texas Quantum Sector</span>
                      <div className="flex items-center gap-2">
                        <Progress value={25} className="w-24 h-3 bg-slate-800/50" />
                        <span className="text-sm font-bold text-cyan-400">25%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-300">Florida Neural Grid</span>
                      <div className="flex items-center gap-2">
                        <Progress value={20} className="w-24 h-3 bg-slate-800/50" />
                        <span className="text-sm font-bold text-cyan-400">20%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-300">Other Neural States</span>
                      <div className="flex items-center gap-2">
                        <Progress value={10} className="w-24 h-3 bg-slate-800/50" />
                        <span className="text-sm font-bold text-cyan-400">10%</span>
                      </div>
                    </div>
                  </div>
                </FuturisticCard>

                <FuturisticCard variant="plasma" className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Calendar className="h-6 w-6 text-orange-400" />
                    <h3 className="text-xl font-bold text-orange-300">Neural Performance Timeline</h3>
                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending Up
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    {[
                      { month: "Jan 2024", return: 22.2, amount: 35420 },
                      { month: "Dec 2023", return: 18.8, amount: 28890 },
                      { month: "Nov 2023", return: 25.5, amount: 42200 },
                      { month: "Oct 2023", return: 19.9, amount: 31100 },
                      { month: "Sep 2023", return: 21.3, amount: 36500 },
                      { month: "Aug 2023", return: 24.1, amount: 39800 },
                    ].map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-orange-300">{data.month}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-orange-300">{formatCurrency(data.amount)}</span>
                          <Badge
                            className={`text-xs ${getReturnColor(data.return)} bg-emerald-500/20 border-emerald-500/30`}
                          >
                            <Zap className="h-3 w-3 mr-1" />
                            {data.return}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </FuturisticCard>
              </div>
            </TabsContent>

            {/* Quantum Account Tab */}
            <TabsContent value="account" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FuturisticCard variant="neural" className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="h-6 w-6 text-blue-400" />
                    <h3 className="text-xl font-bold text-blue-300">Neural Account Matrix</h3>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      <Crown className="h-3 w-3 mr-1" />
                      Elite Status
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-blue-300">Neural Identity</Label>
                      <Input
                        defaultValue="Sarah Johnson"
                        className="bg-slate-800/50 border-blue-500/30 text-blue-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-blue-300">Quantum Communication</Label>
                      <Input
                        defaultValue="sarah.johnson@example.com"
                        className="bg-slate-800/50 border-blue-500/30 text-blue-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-blue-300">Neural Link</Label>
                      <Input
                        defaultValue="+1 (555) 123-4567"
                        className="bg-slate-800/50 border-blue-500/30 text-blue-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-blue-300">Investor Classification</Label>
                      <Select defaultValue="accredited">
                        <SelectTrigger className="bg-slate-800/50 border-blue-500/30 text-blue-100">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-blue-500/30">
                          <SelectItem value="accredited">Accredited Neural Agent</SelectItem>
                          <SelectItem value="institutional">Institutional Quantum Entity</SelectItem>
                          <SelectItem value="qualified">Qualified Neural Purchaser</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <QuantumButton variant="hologram" className="w-full">
                      Update Neural Profile
                    </QuantumButton>
                  </div>
                </FuturisticCard>

                <FuturisticCard variant="quantum" className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="h-6 w-6 text-purple-400" />
                    <h3 className="text-xl font-bold text-purple-300">Quantum Investment Preferences</h3>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      <Gem className="h-3 w-3 mr-1" />
                      Premium Config
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-purple-300">Target Quantum Yield Range</Label>
                      <Select defaultValue="balanced">
                        <SelectTrigger className="bg-slate-800/50 border-purple-500/30 text-purple-100">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-purple-500/30">
                          <SelectItem value="conservative">Conservative Neural (10-15%)</SelectItem>
                          <SelectItem value="balanced">Balanced Quantum (15-20%)</SelectItem>
                          <SelectItem value="aggressive">Aggressive Neural (20-25%)</SelectItem>
                          <SelectItem value="mixed">Mixed Quantum Portfolio (10-25%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-purple-300">Minimum Quantum Investment</Label>
                      <Input
                        defaultValue="50000"
                        type="number"
                        className="bg-slate-800/50 border-purple-500/30 text-purple-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-purple-300">Maximum Quantum Investment</Label>
                      <Input
                        defaultValue="500000"
                        type="number"
                        className="bg-slate-800/50 border-purple-500/30 text-purple-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-purple-300">Preferred Neural Loan Types</Label>
                      <div className="flex gap-2 flex-wrap">
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                          <Zap className="h-3 w-3 mr-1" />
                          Bridge loans (20-25%)
                        </Badge>
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          <Building2 className="h-3 w-3 mr-1" />
                          Commercial (15-20%)
                        </Badge>
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          <Crown className="h-3 w-3 mr-1" />
                          Development (20-25%)
                        </Badge>
                        <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                          <Shield className="h-3 w-3 mr-1" />
                          Premium residential (10-15%)
                        </Badge>
                      </div>
                    </div>
                    <QuantumButton variant="quantum" className="w-full">
                      Save Neural Preferences
                    </QuantumButton>
                  </div>
                </FuturisticCard>

                <FuturisticCard variant="hologram" className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Building2 className="h-6 w-6 text-emerald-400" />
                    <h3 className="text-xl font-bold text-emerald-300">Quantum Banking Matrix</h3>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                      <Shield className="h-3 w-3 mr-1" />
                      Secured
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <FuturisticCard variant="glass" size="sm" className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Building2 className="h-5 w-5 text-blue-400" />
                            <div>
                              <p className="font-medium text-blue-300">Neural Chase Bank ****1234</p>
                              <p className="text-sm text-blue-300/70">Primary quantum funding vault</p>
                            </div>
                          </div>
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                            <Crown className="h-3 w-3 mr-1" />
                            Primary
                          </Badge>
                        </div>
                      </FuturisticCard>
                      <FuturisticCard variant="glass" size="sm" className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Building2 className="h-5 w-5 text-emerald-400" />
                            <div>
                              <p className="font-medium text-emerald-300">Quantum Wells Fargo ****5678</p>
                              <p className="text-sm text-emerald-300/70">Secondary neural account</p>
                            </div>
                          </div>
                          <QuantumButton variant="ghost" size="sm">
                            Neural Edit
                          </QuantumButton>
                        </div>
                      </FuturisticCard>
                    </div>
                    <QuantumButton variant="neon" className="w-full" icon={<Plus className="h-4 w-4" />}>
                      Add Quantum Bank Account
                    </QuantumButton>
                  </div>
                </FuturisticCard>

                <FuturisticCard variant="neon" className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Bell className="h-6 w-6 text-cyan-400" />
                    <h3 className="text-xl font-bold text-cyan-300">Neural Notification Matrix</h3>
                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                      <Activity className="h-3 w-3 mr-1" />
                      Real-time
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-cyan-300">Quantum Opportunities (20%+ yields)</p>
                        <p className="text-sm text-cyan-300/70">Neural alerts for premium loan opportunities</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded bg-slate-800 border-cyan-500/30" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-cyan-300">Neural Payment Confirmations</p>
                        <p className="text-sm text-cyan-300/70">Receive quantum yield payment alerts</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded bg-slate-800 border-cyan-500/30" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-cyan-300">Quantum Risk Alerts</p>
                        <p className="text-sm text-cyan-300/70">Neural warnings for overdue payments</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded bg-slate-800 border-cyan-500/30" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-cyan-300">Neural Performance Reports</p>
                        <p className="text-sm text-cyan-300/70">Monthly quantum portfolio summaries</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded bg-slate-800 border-cyan-500/30" />
                    </div>
                    <QuantumButton variant="hologram" className="w-full">
                      Save Neural Settings
                    </QuantumButton>
                  </div>
                </FuturisticCard>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
