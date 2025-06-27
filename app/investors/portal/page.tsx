"use client"

import * as React from "react"
import {
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Settings,
  Bell,
  Filter,
  Download,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Plus,
  RefreshCw,
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
  Info,
  Crown,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { TierBadge } from "@/components/investors/tier-badge"
import { TierBenefitsModal } from "@/components/investors/tier-benefits-modal"
import {
  getInvestorTier,
  calculateTierReturn,
  getProgressToNextTier,
  formatCurrency,
  formatPercentage,
} from "@/utils/investor-tiers"

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
  matchScore: number
  expiresAt: Date
  status: "pending" | "accepted" | "declined" | "expired"
  borrowerProfile: {
    name: string
    experience: string
    previousLoans: number
    rating: number
  }
  tierBonus?: number
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
  daysLate?: number
  borrower: string
  propertyAddress: string
  startDate: Date
  maturityDate: Date
  actualReturn: number
  tierReturn: number
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
  tierReturn: number
  bonusReturn: number
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

  // Enhanced investor stats with tier-based returns
  const investorStats: InvestorStats = {
    totalInvested: 2450000, // This determines the tier
    availableCapital: 550000,
    totalReturn: 186750,
    averageReturn: 7.8,
    activeLoans: 23,
    completedLoans: 12,
    defaultRate: 2.1,
    portfolioValue: 2636750,
    monthlyIncome: 15420,
    yearToDateReturn: 89340,
    tierReturn: calculateTierReturn(2450000, 7.8), // Tier-based return
    bonusReturn: calculateTierReturn(2450000, 7.8) - 7.8, // Bonus from tier
  }

  const currentTier = getInvestorTier(investorStats.totalInvested)
  const tierProgress = getProgressToNextTier(investorStats.totalInvested)

  // Enhanced opportunities with tier bonuses
  const opportunities: InvestmentOpportunity[] = [
    {
      id: "OPP-001",
      loanAmount: 450000,
      investmentAmount: 225000,
      interestRate: 3.25,
      term: 50,
      riskScore: 85,
      riskCategory: "low",
      propertyType: "primary",
      location: "Austin, TX",
      creditScore: 780,
      loanToValue: 82,
      expectedReturn: 17550,
      matchScore: 94,
      expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      status: "pending",
      tierBonus: currentTier.minReturn - 10, // Bonus percentage from tier
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
      interestRate: 3.5,
      term: 50,
      riskScore: 72,
      riskCategory: "medium",
      propertyType: "investment",
      location: "Denver, CO",
      creditScore: 720,
      loanToValue: 85,
      expectedReturn: 11200,
      matchScore: 87,
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      status: "pending",
      tierBonus: currentTier.minReturn - 10,
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
      interestRate: 3.75,
      term: 50,
      riskScore: 78,
      riskCategory: "medium",
      propertyType: "luxury",
      location: "Miami, FL",
      creditScore: 750,
      loanToValue: 80,
      expectedReturn: 25500,
      matchScore: 91,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "pending",
      tierBonus: currentTier.minReturn - 10,
      borrowerProfile: {
        name: "David Rodriguez",
        experience: "Real estate professional",
        previousLoans: 8,
        rating: 4.7,
      },
    },
  ]

  // Enhanced portfolio loans with tier returns
  const portfolioLoans: PortfolioLoan[] = [
    {
      id: "LOAN-001",
      loanAmount: 400000,
      investmentAmount: 200000,
      interestRate: 3.1,
      monthlyPayment: 1680,
      remainingBalance: 195000,
      status: "current",
      nextPaymentDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      totalReturn: 15600,
      actualReturn: 15600,
      tierReturn: Math.round(15600 * (currentTier.minReturn / 10)), // Enhanced by tier
      borrower: "Jennifer Smith",
      propertyAddress: "123 Oak Street, San Francisco, CA",
      startDate: new Date("2023-06-15"),
      maturityDate: new Date("2073-06-15"),
      paymentHistory: [
        { date: new Date("2024-01-01"), amount: 1680, status: "paid" },
        { date: new Date("2023-12-01"), amount: 1680, status: "paid" },
        { date: new Date("2023-11-01"), amount: 1680, status: "paid" },
      ],
    },
    {
      id: "LOAN-002",
      loanAmount: 350000,
      investmentAmount: 175000,
      interestRate: 3.4,
      monthlyPayment: 1520,
      remainingBalance: 168000,
      status: "current",
      nextPaymentDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      totalReturn: 11900,
      actualReturn: 11900,
      tierReturn: Math.round(11900 * (currentTier.minReturn / 10)),
      borrower: "Robert Johnson",
      propertyAddress: "456 Pine Avenue, Seattle, WA",
      startDate: new Date("2023-08-20"),
      maturityDate: new Date("2073-08-20"),
      paymentHistory: [
        { date: new Date("2024-01-01"), amount: 1520, status: "paid" },
        { date: new Date("2023-12-01"), amount: 1520, status: "late" },
        { date: new Date("2023-11-01"), amount: 1520, status: "paid" },
      ],
    },
    {
      id: "LOAN-003",
      loanAmount: 275000,
      investmentAmount: 137500,
      interestRate: 3.8,
      monthlyPayment: 1280,
      remainingBalance: 132000,
      status: "late",
      nextPaymentDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      totalReturn: 8900,
      actualReturn: 8900,
      tierReturn: Math.round(8900 * (currentTier.minReturn / 10)),
      daysLate: 5,
      borrower: "Maria Garcia",
      propertyAddress: "789 Elm Drive, Phoenix, AZ",
      startDate: new Date("2023-09-10"),
      maturityDate: new Date("2073-09-10"),
      paymentHistory: [
        { date: new Date("2024-01-01"), amount: 0, status: "missed" },
        { date: new Date("2023-12-01"), amount: 1280, status: "late" },
        { date: new Date("2023-11-01"), amount: 1280, status: "paid" },
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
        return "text-green-600 bg-green-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "high":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "text-green-600 bg-green-100"
      case "late":
        return "text-red-600 bg-red-100"
      case "default":
        return "text-red-800 bg-red-200"
      case "paid_off":
        return "text-blue-600 bg-blue-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Tier Information */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Investor Portal
            </h1>
            <p className="text-muted-foreground mt-2">Manage your loan investments and discover new opportunities</p>
            <div className="mt-3">
              <TierBadge totalInvested={investorStats.totalInvested} showProgress={true} variant="detailed" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <TierBenefitsModal totalInvested={investorStats.totalInvested}>
              <Button variant="outline" className="bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0">
                <Crown className="h-4 w-4 mr-2" />
                Tier Benefits
              </Button>
            </TierBenefitsModal>
            <Dialog open={isAddFundsOpen} onOpenChange={setIsAddFundsOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Funds
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Investment Funds</DialogTitle>
                  <DialogDescription>
                    Add funds to your investment account to participate in loan opportunities
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={addFundsAmount}
                      onChange={(e) => setAddFundsAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="method">Funding Method</Label>
                    <Select value={addFundsMethod} onValueChange={setAddFundsMethod}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="wire">Wire Transfer</SelectItem>
                        <SelectItem value="check">Check Deposit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddFunds} disabled={isLoading || !addFundsAmount} className="w-full">
                    {isLoading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Add {addFundsAmount ? formatCurrency(Number.parseFloat(addFundsAmount)) : "Funds"}
                      </>
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Overview with Tier Returns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <RoyalDiamondSlabCard
            variant="emerald"
            size="md"
            title="Portfolio Value"
            content={formatCurrency(investorStats.portfolioValue)}
            highlightWords={["Portfolio"]}
            className="h-32"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              <span className="text-sm text-emerald-400">+12.3% YTD</span>
            </div>
          </RoyalDiamondSlabCard>

          <RoyalDiamondSlabCard
            variant="sapphire"
            size="md"
            title="Tier Return Rate"
            content={`${formatPercentage(investorStats.tierReturn)}`}
            highlightWords={["Tier"]}
            className="h-32"
          >
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-blue-400" />
              <span className="text-sm text-blue-400">+{formatPercentage(investorStats.bonusReturn)} tier bonus</span>
            </div>
          </RoyalDiamondSlabCard>

          <RoyalDiamondSlabCard
            variant="ruby"
            size="md"
            title="Monthly Income"
            content={formatCurrency(investorStats.monthlyIncome)}
            highlightWords={["Monthly"]}
            className="h-32"
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-red-400" />
              <span className="text-sm text-red-400">From {investorStats.activeLoans} loans</span>
            </div>
          </RoyalDiamondSlabCard>

          <RoyalDiamondSlabCard
            variant="diamond"
            size="md"
            title="Available Capital"
            content={formatCurrency(investorStats.availableCapital)}
            highlightWords={["Available"]}
            className="h-32"
          >
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-white" />
              <span className="text-sm text-white">Ready to invest</span>
            </div>
          </RoyalDiamondSlabCard>
        </div>

        {/* Tier Upgrade Notification */}
        {tierProgress.nextTier && (
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Info className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">
                      Upgrade to {tierProgress.nextTier.name} for {formatPercentage(tierProgress.nextTier.minReturn)}-
                      {formatPercentage(tierProgress.nextTier.maxReturn)} returns!
                    </p>
                    <p className="text-sm text-blue-600">
                      Only {formatCurrency(tierProgress.amountNeeded)} more needed
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={tierProgress.progress} className="w-24 h-2" />
                  <TierBenefitsModal totalInvested={investorStats.totalInvested}>
                    <Button size="sm" variant="outline" className="border-blue-500 text-blue-600 bg-transparent">
                      View Benefits
                    </Button>
                  </TierBenefitsModal>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-background/50 backdrop-blur-sm">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="font-medium">Tier Bonus Applied</p>
                        <p className="text-sm text-muted-foreground">
                          LOAN-001 • +{formatPercentage(investorStats.bonusReturn)} tier bonus
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">1 hour ago</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="font-medium">Payment Received</p>
                        <p className="text-sm text-muted-foreground">LOAN-001 • {formatCurrency(1680)}</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-3">
                      <Eye className="h-5 w-5 text-blue-400" />
                      <div>
                        <p className="font-medium">New Opportunity</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(450000)} • 94% match • +{formatPercentage(currentTier.minReturn - 10)}% tier
                          bonus
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">1 day ago</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                      <div>
                        <p className="font-medium">Payment Due Soon</p>
                        <p className="text-sm text-muted-foreground">LOAN-003 • 3 days overdue</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">3 days ago</span>
                  </div>
                </CardContent>
              </Card>

              {/* Tier Performance Chart */}
              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5" />
                    Tier Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Base Return Rate</span>
                      <span className="font-medium">10.0%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Your Tier Return</span>
                      <span className="font-medium text-green-400">{formatPercentage(investorStats.tierReturn)}</span>
                    </div>
                    <Progress value={investorStats.tierReturn * 4} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tier Bonus</span>
                      <span className="font-medium text-blue-400">+{formatPercentage(investorStats.bonusReturn)}</span>
                    </div>
                    <Progress value={investorStats.bonusReturn * 8} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Capital Deployed</span>
                      <span className="font-medium">81.7%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-background/50 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-transparent"
                    onClick={() => setIsAddFundsOpen(true)}
                  >
                    <Plus className="h-6 w-6" />
                    Add Funds
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-transparent"
                    onClick={() => setActiveTab("opportunities")}
                  >
                    <Search className="h-6 w-6" />
                    Find Loans
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-transparent"
                    onClick={() => handleWithdrawFunds(10000)}
                  >
                    <Minus className="h-6 w-6" />
                    Withdraw
                  </Button>
                  <TierBenefitsModal totalInvested={investorStats.totalInvested}>
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <Crown className="h-6 w-6" />
                      Tier Benefits
                    </Button>
                  </TierBenefitsModal>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-6">
            {/* Filters */}
            <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-white/20">
              <div className="flex-1">
                <Input
                  placeholder="Search opportunities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <Select value={filterRisk} onValueChange={setFilterRisk}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>

            {/* Opportunities List with Tier Bonuses */}
            <div className="space-y-4">
              {filteredOpportunities.map((opportunity) => (
                <Card
                  key={opportunity.id}
                  className="bg-background/50 backdrop-blur-sm border-white/20 hover:border-white/40 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{formatCurrency(opportunity.loanAmount)} Loan</h3>
                          <Badge className={getRiskColor(opportunity.riskCategory)}>
                            {opportunity.riskCategory} risk
                          </Badge>
                          <Badge variant="outline" className="bg-blue-500/20 text-blue-400">
                            {opportunity.matchScore}% match
                          </Badge>
                          {opportunity.tierBonus && opportunity.tierBonus > 0 && (
                            <Badge className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
                              +{formatPercentage(opportunity.tierBonus)} tier bonus
                            </Badge>
                          )}
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(opportunity.borrowerProfile.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">
                              {opportunity.borrowerProfile.rating}
                            </span>
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          {opportunity.propertyType} • {opportunity.location}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Borrower: {opportunity.borrowerProfile.name} • {opportunity.borrowerProfile.experience}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">
                          {formatCurrency(opportunity.expectedReturn)}
                        </p>
                        <p className="text-sm text-muted-foreground">Expected Annual Return</p>
                        {opportunity.tierBonus && opportunity.tierBonus > 0 && (
                          <p className="text-xs text-purple-400">
                            +{formatCurrency(Math.round(opportunity.expectedReturn * (opportunity.tierBonus / 100)))}{" "}
                            tier bonus
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Investment Amount</p>
                        <p className="font-medium">{formatCurrency(opportunity.investmentAmount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Base Rate</p>
                        <p className="font-medium">{opportunity.interestRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Your Rate</p>
                        <p className="font-medium text-green-600">
                          {(opportunity.interestRate + (opportunity.tierBonus || 0)).toFixed(2)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Credit Score</p>
                        <p className="font-medium">{opportunity.creditScore}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">LTV Ratio</p>
                        <p className="font-medium">{opportunity.loanToValue}%</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Expires in {Math.ceil((opportunity.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))}{" "}
                        days
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeclineOpportunity(opportunity.id)}
                          disabled={isLoading}
                        >
                          <ThumbsDown className="h-4 w-4 mr-2" />
                          Decline
                        </Button>
                        <Button onClick={() => handleAcceptOpportunity(opportunity.id)} disabled={isLoading}>
                          {isLoading ? (
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <ThumbsUp className="h-4 w-4 mr-2" />
                          )}
                          Accept Investment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Portfolio Tab with Tier Returns */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Active Investments</h2>
              <div className="flex items-center gap-2">
                <TierBadge totalInvested={investorStats.totalInvested} />
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Portfolio
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {portfolioLoans.map((loan) => (
                <Card
                  key={loan.id}
                  className="bg-background/50 backdrop-blur-sm border-white/20 hover:border-white/40 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{loan.id}</h3>
                          <Badge className={getStatusColor(loan.status)}>{loan.status}</Badge>
                          {loan.daysLate && <Badge variant="destructive">{loan.daysLate} days late</Badge>}
                          <Badge className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
                            {formatPercentage(currentTier.minReturn)} tier rate
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">Borrower: {loan.borrower}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {loan.propertyAddress}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">+{formatCurrency(loan.tierReturn)}</p>
                        <p className="text-sm text-muted-foreground">Tier-Enhanced Return</p>
                        <p className="text-xs text-gray-500">Base: {formatCurrency(loan.actualReturn)}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Investment</p>
                        <p className="font-medium">{formatCurrency(loan.investmentAmount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Payment</p>
                        <p className="font-medium">{formatCurrency(loan.monthlyPayment)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Remaining Balance</p>
                        <p className="font-medium">{formatCurrency(loan.remainingBalance)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Next Payment</p>
                        <p className="font-medium">{formatDate(loan.nextPaymentDate)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Progress</span>
                          <Progress
                            value={((loan.investmentAmount - loan.remainingBalance) / loan.investmentAmount) * 100}
                            className="w-24 h-2"
                          />
                          <span className="text-xs">
                            {Math.round(
                              ((loan.investmentAmount - loan.remainingBalance) / loan.investmentAmount) * 100,
                            )}
                            %
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedLoan(expandedLoan === loan.id ? null : loan.id)}
                        >
                          {expandedLoan === loan.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                          Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>

                    {expandedLoan === loan.id && (
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-2">Loan Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Start Date:</span>
                                <span>{formatDate(loan.startDate)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Maturity Date:</span>
                                <span>{formatDate(loan.maturityDate)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Base Rate:</span>
                                <span>{loan.interestRate}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Tier Rate:</span>
                                <span className="text-green-600 font-medium">
                                  {formatPercentage(currentTier.minReturn)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Original Amount:</span>
                                <span>{formatCurrency(loan.loanAmount)}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Recent Payments</h4>
                            <div className="space-y-2">
                              {loan.paymentHistory.slice(0, 3).map((payment, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">{formatDate(payment.date)}</span>
                                  <div className="flex items-center gap-2">
                                    <span>{payment.amount > 0 ? formatCurrency(payment.amount) : "Missed"}</span>
                                    <Badge
                                      variant={payment.status === "paid" ? "default" : "destructive"}
                                      className="text-xs"
                                    >
                                      {payment.status}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab with Tier Analysis */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Tier Return Analysis</CardTitle>
                  <CardDescription>Performance breakdown by tier benefits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Base Market Rate</span>
                      <div className="flex items-center gap-2">
                        <Progress value={40} className="w-20 h-2" />
                        <span className="text-sm font-medium">10.0%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Your Tier Rate ({currentTier.name})</span>
                      <div className="flex items-center gap-2">
                        <Progress value={investorStats.tierReturn * 4} className="w-20 h-2" />
                        <span className="text-sm font-medium text-green-600">
                          {formatPercentage(investorStats.tierReturn)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Tier Bonus</span>
                      <div className="flex items-center gap-2">
                        <Progress value={investorStats.bonusReturn * 8} className="w-20 h-2" />
                        <span className="text-sm font-medium text-blue-600">
                          +{formatPercentage(investorStats.bonusReturn)}
                        </span>
                      </div>
                    </div>
                    {tierProgress.nextTier && (
                      <div className="flex items-center justify-between">
                        <span>Next Tier Potential ({tierProgress.nextTier.name})</span>
                        <div className="flex items-center gap-2">
                          <Progress value={tierProgress.nextTier.minReturn * 4} className="w-20 h-2" />
                          <span className="text-sm font-medium text-purple-600">
                            {formatPercentage(tierProgress.nextTier.minReturn)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Risk Distribution</CardTitle>
                  <CardDescription>Portfolio risk allocation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Low Risk</span>
                      <div className="flex items-center gap-2">
                        <Progress value={60} className="w-20 h-2" />
                        <span className="text-sm font-medium">60%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Medium Risk</span>
                      <div className="flex items-center gap-2">
                        <Progress value={30} className="w-20 h-2" />
                        <span className="text-sm font-medium">30%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>High Risk</span>
                      <div className="flex items-center gap-2">
                        <Progress value={10} className="w-20 h-2" />
                        <span className="text-sm font-medium">10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>Investment locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>California</span>
                      <div className="flex items-center gap-2">
                        <Progress value={45} className="w-20 h-2" />
                        <span className="text-sm font-medium">45%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Texas</span>
                      <div className="flex items-center gap-2">
                        <Progress value={25} className="w-20 h-2" />
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Florida</span>
                      <div className="flex items-center gap-2">
                        <Progress value={20} className="w-20 h-2" />
                        <span className="text-sm font-medium">20%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Other States</span>
                      <div className="flex items-center gap-2">
                        <Progress value={10} className="w-20 h-2" />
                        <span className="text-sm font-medium">10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Monthly Tier Performance</CardTitle>
                  <CardDescription>Last 12 months tier-enhanced returns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        month: "Jan 2024",
                        baseReturn: 8.2,
                        tierReturn: investorStats.tierReturn,
                        amount: Math.round(15420 * (investorStats.tierReturn / 8.2)),
                      },
                      {
                        month: "Dec 2023",
                        baseReturn: 7.8,
                        tierReturn: investorStats.tierReturn,
                        amount: Math.round(14890 * (investorStats.tierReturn / 7.8)),
                      },
                      {
                        month: "Nov 2023",
                        baseReturn: 8.5,
                        tierReturn: investorStats.tierReturn,
                        amount: Math.round(16200 * (investorStats.tierReturn / 8.5)),
                      },
                      {
                        month: "Oct 2023",
                        baseReturn: 7.9,
                        tierReturn: investorStats.tierReturn,
                        amount: Math.round(15100 * (investorStats.tierReturn / 7.9)),
                      },
                    ].map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{data.month}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{formatCurrency(data.amount)}</span>
                          <Badge variant="outline" className="text-xs bg-green-500/20 text-green-600">
                            {formatPercentage(data.tierReturn)}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            +{formatPercentage(data.tierReturn - data.baseReturn)} tier
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Your investor profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input defaultValue="Sarah Johnson" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input defaultValue="sarah.johnson@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label>Investor Type</Label>
                    <Select defaultValue="accredited">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="accredited">Accredited Individual</SelectItem>
                        <SelectItem value="institutional">Institutional</SelectItem>
                        <SelectItem value="qualified">Qualified Purchaser</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Update Profile</Button>
                </CardContent>
              </Card>

              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Investment Preferences</CardTitle>
                  <CardDescription>Configure your investment criteria</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Risk Tolerance</Label>
                    <Select defaultValue="moderate">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conservative">Conservative</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="aggressive">Aggressive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Minimum Investment Amount</Label>
                    <Input defaultValue="50000" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label>Maximum Investment Amount</Label>
                    <Input defaultValue="500000" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label>Preferred Loan Terms</Label>
                    <div className="flex gap-2">
                      <Badge variant="outline">30 years</Badge>
                      <Badge variant="outline">50 years</Badge>
                      <Badge variant="outline">Bridge loans</Badge>
                    </div>
                  </div>
                  <Button className="w-full">Save Preferences</Button>
                </CardContent>
              </Card>

              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Banking Information</CardTitle>
                  <CardDescription>Manage your funding sources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">Chase Bank ****1234</p>
                          <p className="text-sm text-muted-foreground">Primary funding account</p>
                        </div>
                      </div>
                      <Badge variant="default">Primary</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">Wells Fargo ****5678</p>
                          <p className="text-sm text-muted-foreground">Secondary account</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Bank Account
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure how you receive updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Investment Opportunities</p>
                      <p className="text-sm text-muted-foreground">Get notified of matching loans</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Tier Bonus Notifications</p>
                      <p className="text-sm text-muted-foreground">Alert when tier bonuses are applied</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Payment Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive payment confirmations</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Late Payment Alerts</p>
                      <p className="text-sm text-muted-foreground">Alert when payments are overdue</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Tier Upgrade Notifications</p>
                      <p className="text-sm text-muted-foreground">Get notified when you can upgrade tiers</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Monthly Reports</p>
                      <p className="text-sm text-muted-foreground">Portfolio performance summaries</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <Button className="w-full">Save Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
