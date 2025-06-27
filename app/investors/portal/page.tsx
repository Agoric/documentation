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
    totalReturn: 486750, // Increased returns
    averageReturn: 18.2, // 18.2% average return
    activeLoans: 23,
    completedLoans: 12,
    defaultRate: 1.8, // Lower default rate for higher returns
    portfolioValue: 2936750, // Higher portfolio value
    monthlyIncome: 35420, // Higher monthly income
    yearToDateReturn: 289340, // Higher YTD return
    yearToDateReturnRate: 22.5, // 22.5% YTD return rate
  }

  const opportunities: InvestmentOpportunity[] = [
    {
      id: "OPP-001",
      loanAmount: 450000,
      investmentAmount: 225000,
      interestRate: 6.25, // Higher interest rate
      term: 50,
      riskScore: 85,
      riskCategory: "low",
      propertyType: "primary",
      location: "Austin, TX",
      creditScore: 780,
      loanToValue: 82,
      expectedReturn: 47250, // 21% return
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
      interestRate: 7.5, // Higher interest rate
      term: 50,
      riskScore: 72,
      riskCategory: "medium",
      propertyType: "investment",
      location: "Denver, CO",
      creditScore: 720,
      loanToValue: 85,
      expectedReturn: 28800, // 18% return
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
      interestRate: 8.75, // Higher interest rate
      term: 50,
      riskScore: 78,
      riskCategory: "medium",
      propertyType: "luxury",
      location: "Miami, FL",
      creditScore: 750,
      loanToValue: 80,
      expectedReturn: 85000, // 25% return
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
      expectedReturn: 31200, // 12% return
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
      interestRate: 9.25, // High interest rate
      term: 50,
      riskScore: 65,
      riskCategory: "high",
      propertyType: "development",
      location: "Las Vegas, NV",
      creditScore: 680,
      loanToValue: 90,
      expectedReturn: 93750, // 25% return
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
      interestRate: 6.1, // Higher interest rate
      monthlyPayment: 2480, // Higher payment
      remainingBalance: 195000,
      status: "current",
      nextPaymentDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      totalReturn: 42600, // Higher return
      annualReturnRate: 21.3, // 21.3% annual return
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
      interestRate: 7.4, // Higher interest rate
      monthlyPayment: 2120, // Higher payment
      remainingBalance: 168000,
      status: "current",
      nextPaymentDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      totalReturn: 31500, // Higher return
      annualReturnRate: 18.0, // 18% annual return
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
      interestRate: 8.8, // Higher interest rate
      monthlyPayment: 1980, // Higher payment
      remainingBalance: 132000,
      status: "late",
      nextPaymentDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      totalReturn: 20625, // Higher return
      annualReturnRate: 15.0, // 15% annual return
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
      interestRate: 9.2, // High interest rate
      monthlyPayment: 3750, // High payment
      remainingBalance: 285000,
      status: "current",
      nextPaymentDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      totalReturn: 75000, // High return
      annualReturnRate: 25.0, // 25% annual return
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
      interestRate: 5.5, // Lower risk, moderate return
      monthlyPayment: 1080, // Moderate payment
      remainingBalance: 85000,
      status: "current",
      nextPaymentDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      totalReturn: 9000, // 10% return
      annualReturnRate: 10.0, // 10% annual return
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Accepting opportunity:", opportunityId)
      // In real app, would update the opportunities list
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
      // In real app, would update available capital
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

  const getReturnColor = (returnRate: number) => {
    if (returnRate >= 20) return "text-emerald-500 font-bold"
    if (returnRate >= 15) return "text-green-500 font-semibold"
    if (returnRate >= 10) return "text-blue-500 font-medium"
    return "text-gray-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Investor Portal
            </h1>
            <p className="text-muted-foreground mt-2">High-yield loan investments with 10%-25% annual returns</p>
          </div>
          <div className="flex items-center gap-4">
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
                    Add funds to your investment account to participate in high-yield loan opportunities
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

        {/* Stats Overview */}
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
              <span className="text-sm text-emerald-400">+{investorStats.yearToDateReturnRate}% YTD</span>
            </div>
          </RoyalDiamondSlabCard>

          <RoyalDiamondSlabCard
            variant="sapphire"
            size="md"
            title="Available Capital"
            content={formatCurrency(investorStats.availableCapital)}
            highlightWords={["Available"]}
            className="h-32"
          >
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-blue-400" />
              <span className="text-sm text-blue-400">Ready to invest</span>
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
            title="Average Return"
            content={`${investorStats.averageReturn}%`}
            highlightWords={["Return"]}
            className="h-32"
          >
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-white" />
              <span className="text-sm text-white">High yield</span>
            </div>
          </RoyalDiamondSlabCard>
        </div>

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
                        <p className="font-medium">High-Yield Payment Received</p>
                        <p className="text-sm text-muted-foreground">LOAN-004 • {formatCurrency(3750)} (25% APR)</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-3">
                      <Eye className="h-5 w-5 text-blue-400" />
                      <div>
                        <p className="font-medium">Premium Opportunity</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(450000)} • 21% return • 94% match
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
                        <p className="text-sm text-muted-foreground">LOAN-003 • 5 days overdue • 15% APR</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">3 days ago</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div className="flex items-center gap-3">
                      <Plus className="h-5 w-5 text-purple-400" />
                      <div>
                        <p className="font-medium">Capital Deployed</p>
                        <p className="text-sm text-muted-foreground">{formatCurrency(300000)} • 25% expected return</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">1 week ago</span>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Chart */}
              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5" />
                    High-Yield Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">YTD Return</span>
                      <span className="font-medium text-green-400">
                        +{formatCurrency(investorStats.yearToDateReturn)} ({investorStats.yearToDateReturnRate}%)
                      </span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Capital Deployed</span>
                      <span className="font-medium">81.7%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Risk Score</span>
                      <span className="font-medium text-blue-400">Balanced</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Diversification</span>
                      <span className="font-medium text-purple-400">Excellent</span>
                    </div>
                    <Progress value={92} className="h-2" />
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
                    Find High-Yield Loans
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-transparent"
                    onClick={() => handleWithdrawFunds(10000)}
                  >
                    <Minus className="h-6 w-6" />
                    Withdraw
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-transparent"
                    onClick={() => setActiveTab("analytics")}
                  >
                    <BarChart3 className="h-6 w-6" />
                    Analytics
                  </Button>
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
                  placeholder="Search high-yield opportunities..."
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
                  <SelectItem value="low">Low Risk (10-15%)</SelectItem>
                  <SelectItem value="medium">Medium Risk (15-20%)</SelectItem>
                  <SelectItem value="high">High Risk (20-25%)</SelectItem>
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

            {/* Opportunities List */}
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
                          <Badge className="bg-emerald-500/20 text-emerald-400 font-semibold">
                            {opportunity.expectedReturnRate}% APR
                          </Badge>
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
                        <p className={`text-2xl font-bold ${getReturnColor(opportunity.expectedReturnRate)}`}>
                          {formatCurrency(opportunity.expectedReturn)}
                        </p>
                        <p className="text-sm text-muted-foreground">Expected Annual Return</p>
                        <p className={`text-lg font-semibold ${getReturnColor(opportunity.expectedReturnRate)}`}>
                          {opportunity.expectedReturnRate}% APR
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Investment Amount</p>
                        <p className="font-medium">{formatCurrency(opportunity.investmentAmount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Interest Rate</p>
                        <p className="font-medium">{opportunity.interestRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Term</p>
                        <p className="font-medium">{opportunity.term} years</p>
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

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">High-Yield Investment Portfolio</h2>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Portfolio
              </Button>
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
                          <Badge className={`${getReturnColor(loan.annualReturnRate)} bg-emerald-500/20`}>
                            {loan.annualReturnRate}% APR
                          </Badge>
                          {loan.daysLate && <Badge variant="destructive">{loan.daysLate} days late</Badge>}
                        </div>
                        <p className="text-muted-foreground">Borrower: {loan.borrower}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {loan.propertyAddress}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${getReturnColor(loan.annualReturnRate)}`}>
                          +{formatCurrency(loan.totalReturn)}
                        </p>
                        <p className="text-sm text-muted-foreground">Total Return</p>
                        <p className={`text-lg font-semibold ${getReturnColor(loan.annualReturnRate)}`}>
                          {loan.annualReturnRate}% APR
                        </p>
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
                                <span className="text-muted-foreground">Interest Rate:</span>
                                <span className="font-semibold text-green-600">{loan.interestRate}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Annual Return:</span>
                                <span className={`font-bold ${getReturnColor(loan.annualReturnRate)}`}>
                                  {loan.annualReturnRate}%
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

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>High-Yield Return Analysis</CardTitle>
                  <CardDescription>Performance breakdown by investment type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Premium Loans (20-25%)</span>
                      <div className="flex items-center gap-2">
                        <Progress value={95} className="w-20 h-2" />
                        <span className="text-sm font-medium text-emerald-600">23.2%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>High-Yield Loans (15-20%)</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-20 h-2" />
                        <span className="text-sm font-medium text-green-600">18.5%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Standard Loans (10-15%)</span>
                      <div className="flex items-center gap-2">
                        <Progress value={72} className="w-20 h-2" />
                        <span className="text-sm font-medium text-blue-600">12.1%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Bridge Loans (20-25%)</span>
                      <div className="flex items-center gap-2">
                        <Progress value={92} className="w-20 h-2" />
                        <span className="text-sm font-medium text-emerald-600">24.5%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Risk vs Return Distribution</CardTitle>
                  <CardDescription>Portfolio allocation by risk level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Low Risk (10-15%)</span>
                      <div className="flex items-center gap-2">
                        <Progress value={40} className="w-20 h-2" />
                        <span className="text-sm font-medium">40%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Medium Risk (15-20%)</span>
                      <div className="flex items-center gap-2">
                        <Progress value={35} className="w-20 h-2" />
                        <span className="text-sm font-medium">35%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>High Risk (20-25%)</span>
                      <div className="flex items-center gap-2">
                        <Progress value={25} className="w-20 h-2" />
                        <span className="text-sm font-medium">25%</span>
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
                  <CardTitle>Monthly High-Yield Performance</CardTitle>
                  <CardDescription>Last 12 months returns</CardDescription>
                </CardHeader>
                <CardContent>
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
                        <span className="text-sm">{data.month}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{formatCurrency(data.amount)}</span>
                          <Badge className={`text-xs ${getReturnColor(data.return)} bg-emerald-500/20`}>
                            {data.return}%
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
                  <CardDescription>Your high-yield investor profile details</CardDescription>
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
                  <CardTitle>High-Yield Investment Preferences</CardTitle>
                  <CardDescription>Configure your investment criteria for 10%-25% returns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Target Return Range</Label>
                    <Select defaultValue="balanced">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conservative">Conservative (10-15%)</SelectItem>
                        <SelectItem value="balanced">Balanced (15-20%)</SelectItem>
                        <SelectItem value="aggressive">Aggressive (20-25%)</SelectItem>
                        <SelectItem value="mixed">Mixed Portfolio (10-25%)</SelectItem>
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
                    <Label>Preferred High-Yield Loan Types</Label>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline">Bridge loans (20-25%)</Badge>
                      <Badge variant="outline">Commercial (15-20%)</Badge>
                      <Badge variant="outline">Development (20-25%)</Badge>
                      <Badge variant="outline">Premium residential (10-15%)</Badge>
                    </div>
                  </div>
                  <Button className="w-full">Save Preferences</Button>
                </CardContent>
              </Card>

              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Banking Information</CardTitle>
                  <CardDescription>Manage your funding sources for high-yield investments</CardDescription>
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
                  <CardDescription>Configure how you receive high-yield investment updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">High-Yield Opportunities (20%+ returns)</p>
                      <p className="text-sm text-muted-foreground">Get notified of premium loan opportunities</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Payment Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive high-yield payment confirmations</p>
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
                      <p className="font-medium">Monthly High-Yield Reports</p>
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
