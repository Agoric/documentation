"use client"

import * as React from "react"
import {
  DollarSign,
  TrendingUp,
  FileText,
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
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  matchScore: number
  expiresAt: Date
  status: "pending" | "accepted" | "declined" | "expired"
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
}

export default function InvestorPortal() {
  const [activeTab, setActiveTab] = React.useState("dashboard")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterRisk, setFilterRisk] = React.useState("all")
  const [filterStatus, setFilterStatus] = React.useState("all")

  // Mock data - in real app, this would come from API
  const investorStats: InvestorStats = {
    totalInvested: 2450000,
    availableCapital: 550000,
    totalReturn: 186750,
    averageReturn: 7.8,
    activeLoans: 23,
    completedLoans: 12,
    defaultRate: 2.1,
    portfolioValue: 2636750,
  }

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
    },
  ]

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
    },
  ]

  const handleAcceptOpportunity = (opportunityId: string) => {
    console.log("Accepting opportunity:", opportunityId)
    // API call to accept investment opportunity
  }

  const handleDeclineOpportunity = (opportunityId: string) => {
    console.log("Declining opportunity:", opportunityId)
    // API call to decline investment opportunity
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
            <p className="text-muted-foreground mt-2">Manage your loan investments and discover new opportunities</p>
          </div>
          <div className="flex items-center gap-4">
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
            content={`$${investorStats.portfolioValue.toLocaleString()}`}
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
            title="Available Capital"
            content={`$${investorStats.availableCapital.toLocaleString()}`}
            highlightWords={["Available"]}
            className="h-32"
          >
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-400" />
              <span className="text-sm text-blue-400">Ready to invest</span>
            </div>
          </RoyalDiamondSlabCard>

          <RoyalDiamondSlabCard
            variant="ruby"
            size="md"
            title="Average Return"
            content={`${investorStats.averageReturn}%`}
            highlightWords={["Return"]}
            className="h-32"
          >
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-red-400" />
              <span className="text-sm text-red-400">Above target</span>
            </div>
          </RoyalDiamondSlabCard>

          <RoyalDiamondSlabCard
            variant="diamond"
            size="md"
            title="Active Loans"
            content={`${investorStats.activeLoans}`}
            highlightWords={["Active"]}
            className="h-32"
          >
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-white" />
              <span className="text-sm text-white">Performing well</span>
            </div>
          </RoyalDiamondSlabCard>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-background/50 backdrop-blur-sm">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="font-medium">Payment Received</p>
                        <p className="text-sm text-muted-foreground">LOAN-001 • $1,680</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-3">
                      <Eye className="h-5 w-5 text-blue-400" />
                      <div>
                        <p className="font-medium">New Opportunity</p>
                        <p className="text-sm text-muted-foreground">$450K • 94% match</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">1 day ago</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                      <div>
                        <p className="font-medium">Payment Due Soon</p>
                        <p className="text-sm text-muted-foreground">LOAN-003 • 3 days</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">3 days ago</span>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Chart */}
              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Return</span>
                      <span className="font-medium text-green-400">+$186,750</span>
                    </div>
                    <Progress value={78} className="h-2" />
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
                      <span className="font-medium text-blue-400">Low Risk</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
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
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>

            {/* Opportunities List */}
            <div className="space-y-4">
              {opportunities.map((opportunity) => (
                <Card
                  key={opportunity.id}
                  className="bg-background/50 backdrop-blur-sm border-white/20 hover:border-white/40 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">${opportunity.loanAmount.toLocaleString()} Loan</h3>
                          <Badge
                            variant={opportunity.riskCategory === "low" ? "default" : "secondary"}
                            className={
                              opportunity.riskCategory === "low"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }
                          >
                            {opportunity.riskCategory} risk
                          </Badge>
                          <Badge variant="outline" className="bg-blue-500/20 text-blue-400">
                            {opportunity.matchScore}% match
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">
                          {opportunity.propertyType} • {opportunity.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">
                          ${opportunity.expectedReturn.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">Expected Annual Return</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Investment Amount</p>
                        <p className="font-medium">${opportunity.investmentAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Interest Rate</p>
                        <p className="font-medium">{opportunity.interestRate}%</p>
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
                        <Button variant="outline" size="sm" onClick={() => handleDeclineOpportunity(opportunity.id)}>
                          <ThumbsDown className="h-4 w-4 mr-2" />
                          Decline
                        </Button>
                        <Button onClick={() => handleAcceptOpportunity(opportunity.id)}>
                          <ThumbsUp className="h-4 w-4 mr-2" />
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
              <h2 className="text-2xl font-semibold">Active Investments</h2>
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
                          <Badge
                            variant={loan.status === "current" ? "default" : "destructive"}
                            className={
                              loan.status === "current"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }
                          >
                            {loan.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">
                          ${loan.investmentAmount.toLocaleString()} invested • {loan.interestRate}% APR
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">+${loan.totalReturn.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Total Return</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Payment</p>
                        <p className="font-medium">${loan.monthlyPayment.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Remaining Balance</p>
                        <p className="font-medium">${loan.remainingBalance.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Next Payment</p>
                        <p className="font-medium">{loan.nextPaymentDate.toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Progress</p>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={((loan.investmentAmount - loan.remainingBalance) / loan.investmentAmount) * 100}
                            className="h-2 flex-1"
                          />
                          <span className="text-xs">
                            {Math.round(
                              ((loan.investmentAmount - loan.remainingBalance) / loan.investmentAmount) * 100,
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    </div>
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
                  <CardTitle>Return Analysis</CardTitle>
                  <CardDescription>Performance breakdown by investment type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>50-Year Loans</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-20 h-2" />
                        <span className="text-sm font-medium">8.2%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>30-Year Loans</span>
                      <div className="flex items-center gap-2">
                        <Progress value={72} className="w-20 h-2" />
                        <span className="text-sm font-medium">7.1%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Commercial Loans</span>
                      <div className="flex items-center gap-2">
                        <Progress value={68} className="w-20 h-2" />
                        <span className="text-sm font-medium">6.8%</span>
                      </div>
                    </div>
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
