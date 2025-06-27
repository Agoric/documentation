"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Home,
  Car,
  User,
  Building,
  Calculator,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  TrendingUp,
  Search,
  Plus,
  Eye,
  Download,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"

interface LoanApplication {
  id: string
  type: "home" | "auto" | "personal" | "business"
  amount: number
  status: "pending" | "processing" | "approved" | "rejected" | "funded"
  progress: number
  appliedDate: string
  estimatedCompletion: string
  nextStep: string
  lender: string
  interestRate?: number
}

export default function CitizenLoanCenterPage() {
  const [applications, setApplications] = useState<LoanApplication[]>([
    {
      id: "LA-2024-001",
      type: "home",
      amount: 450000,
      status: "processing",
      progress: 65,
      appliedDate: "2024-01-15",
      estimatedCompletion: "2024-02-28",
      nextStep: "Property Appraisal",
      lender: "First National Bank",
      interestRate: 6.75,
    },
    {
      id: "LA-2024-002",
      type: "auto",
      amount: 35000,
      status: "approved",
      progress: 100,
      appliedDate: "2024-01-20",
      estimatedCompletion: "2024-01-25",
      nextStep: "Funding Complete",
      lender: "Auto Finance Plus",
      interestRate: 4.25,
    },
    {
      id: "LA-2024-003",
      type: "personal",
      amount: 15000,
      status: "pending",
      progress: 25,
      appliedDate: "2024-01-22",
      estimatedCompletion: "2024-02-15",
      nextStep: "Income Verification",
      lender: "Credit Union One",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [loanAmount, setLoanAmount] = useState(100000)
  const [loanTerm, setLoanTerm] = useState(30)
  const [interestRate, setInterestRate] = useState(6.5)

  const getLoanTypeIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="h-5 w-5" />
      case "auto":
        return <Car className="h-5 w-5" />
      case "personal":
        return <User className="h-5 w-5" />
      case "business":
        return <Building className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "processing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "funded":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
      case "funded":
        return <CheckCircle className="h-4 w-4" />
      case "processing":
        return <RefreshCw className="h-4 w-4 animate-spin" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "rejected":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const calculateMonthlyPayment = () => {
    const monthlyRate = interestRate / 100 / 12
    const numPayments = loanTerm * 12
    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    return monthlyPayment
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.lender.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || app.type === selectedType
    return matchesSearch && matchesType
  })

  const totalLoanAmount = applications.reduce((sum, app) => sum + app.amount, 0)
  const activeLoans = applications.filter((app) => app.status !== "rejected").length
  const approvedLoans = applications.filter((app) => app.status === "approved" || app.status === "funded").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
              <Building className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Citizen Loan Center
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your loan applications, track progress, and access financial tools
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-black/20 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Loan Amount</p>
                  <p className="text-2xl font-bold text-green-400">${totalLoanAmount.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Applications</p>
                  <p className="text-2xl font-bold text-blue-400">{activeLoans}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved Loans</p>
                  <p className="text-2xl font-bold text-green-400">{approvedLoans}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold text-purple-400">
                    {Math.round((approvedLoans / applications.length) * 100)}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="apply">Apply for Loan</TabsTrigger>
            <TabsTrigger value="calculator">Loan Calculator</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Loan Applications
                </CardTitle>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search applications..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20"
                    />
                  </div>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
                  >
                    <option value="all">All Types</option>
                    <option value="home">Home Loans</option>
                    <option value="auto">Auto Loans</option>
                    <option value="personal">Personal Loans</option>
                    <option value="business">Business Loans</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredApplications.map((application) => (
                  <Card
                    key={application.id}
                    className="bg-white/5 border-white/10 hover:border-purple-500/30 transition-colors"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-purple-500/20">{getLoanTypeIcon(application.type)}</div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {application.type.charAt(0).toUpperCase() + application.type.slice(1)} Loan
                            </h3>
                            <p className="text-sm text-muted-foreground">Application ID: {application.id}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(application.status)}>
                          {getStatusIcon(application.status)}
                          <span className="ml-1 capitalize">{application.status}</span>
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Loan Amount</p>
                          <p className="font-semibold text-green-400">${application.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Lender</p>
                          <p className="font-semibold">{application.lender}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Interest Rate</p>
                          <p className="font-semibold text-blue-400">
                            {application.interestRate ? `${application.interestRate}%` : "TBD"}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{application.progress}%</span>
                        </div>
                        <Progress value={application.progress} className="h-2" />
                        <p className="text-sm text-muted-foreground">Next Step: {application.nextStep}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <p>Applied: {new Date(application.appliedDate).toLocaleDateString()}</p>
                          <p>Est. Completion: {new Date(application.estimatedCompletion).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/citizen/loan-center/status/${application.id}`}>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </Link>
                          <Button size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Documents
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Apply Tab */}
          <TabsContent value="apply" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  type: "home",
                  title: "Home Loan",
                  description: "Purchase or refinance your home",
                  icon: <Home className="h-8 w-8" />,
                  rates: "Starting at 6.25%",
                  color: "from-green-500 to-emerald-600",
                },
                {
                  type: "auto",
                  title: "Auto Loan",
                  description: "Finance your next vehicle",
                  icon: <Car className="h-8 w-8" />,
                  rates: "Starting at 3.99%",
                  color: "from-blue-500 to-cyan-600",
                },
                {
                  type: "personal",
                  title: "Personal Loan",
                  description: "Consolidate debt or fund projects",
                  icon: <User className="h-8 w-8" />,
                  rates: "Starting at 8.99%",
                  color: "from-purple-500 to-pink-600",
                },
                {
                  type: "business",
                  title: "Business Loan",
                  description: "Grow your business",
                  icon: <Building className="h-8 w-8" />,
                  rates: "Starting at 7.25%",
                  color: "from-orange-500 to-red-600",
                },
              ].map((loan) => (
                <Card
                  key={loan.type}
                  className="bg-black/20 border-white/10 hover:border-purple-500/30 transition-colors cursor-pointer group"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`p-4 rounded-full bg-gradient-to-r ${loan.color} mx-auto mb-4 w-fit group-hover:scale-110 transition-transform`}
                    >
                      {loan.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{loan.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{loan.description}</p>
                    <p className="text-sm font-medium text-green-400 mb-4">{loan.rates}</p>
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-1" />
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="space-y-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Loan Payment Calculator
                </CardTitle>
                <CardDescription>Calculate your monthly loan payments and total interest</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Loan Amount</label>
                    <Input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="bg-white/10 border-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Loan Term (Years)</label>
                    <Input
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="bg-white/10 border-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Interest Rate (%)</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="bg-white/10 border-white/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Monthly Payment</p>
                      <p className="text-2xl font-bold text-green-400">${calculateMonthlyPayment().toFixed(2)}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Total Interest</p>
                      <p className="text-2xl font-bold text-orange-400">
                        ${(calculateMonthlyPayment() * loanTerm * 12 - loanAmount).toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="text-2xl font-bold text-blue-400">
                        ${(calculateMonthlyPayment() * loanTerm * 12).toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle>Loan Guides</CardTitle>
                  <CardDescription>Educational resources to help you make informed decisions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "First-Time Home Buyer's Guide",
                    "Understanding Credit Scores",
                    "Debt Consolidation Strategies",
                    "Business Loan Requirements",
                    "Refinancing Your Mortgage",
                  ].map((guide, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <FileText className="h-4 w-4 text-blue-400" />
                      <span className="text-sm">{guide}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle>Support & Contact</CardTitle>
                  <CardDescription>Get help with your loan applications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-green-500/20">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium">24/7 Support</p>
                        <p className="text-sm text-muted-foreground">1-800-LOAN-HELP</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-blue-500/20">
                        <FileText className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">Live Chat</p>
                        <p className="text-sm text-muted-foreground">Available 9 AM - 6 PM EST</p>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Contact Support</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
