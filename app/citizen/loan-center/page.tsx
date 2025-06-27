"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import {
  Home,
  Car,
  CreditCard,
  Building2,
  Search,
  Calculator,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Shield,
  Eye,
  Plus,
} from "lucide-react"

export default function LoanCenterPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLoanType, setSelectedLoanType] = useState("all")

  const loanApplications = [
    {
      id: "APP-2024-001",
      type: "Home Loan",
      amount: "$450,000",
      status: "approved",
      progress: 100,
      lender: "Snapifi Bank",
      appliedDate: "2024-01-15",
      expectedClose: "2024-02-15",
      interestRate: "6.25%",
      term: "30 years",
      nextStep: "Closing scheduled",
    },
    {
      id: "APP-2024-002",
      type: "Auto Loan",
      amount: "$35,000",
      status: "processing",
      progress: 65,
      lender: "Credit Union Plus",
      appliedDate: "2024-01-20",
      expectedClose: "2024-02-05",
      interestRate: "4.75%",
      term: "5 years",
      nextStep: "Income verification",
    },
    {
      id: "APP-2024-003",
      type: "Personal Loan",
      amount: "$15,000",
      status: "pending",
      progress: 25,
      lender: "Online Lender",
      appliedDate: "2024-01-25",
      expectedClose: "2024-02-10",
      interestRate: "8.99%",
      term: "3 years",
      nextStep: "Document upload",
    },
    {
      id: "APP-2024-004",
      type: "Business Loan",
      amount: "$100,000",
      status: "under_review",
      progress: 45,
      lender: "Business Capital",
      appliedDate: "2024-01-18",
      expectedClose: "2024-02-20",
      interestRate: "7.50%",
      term: "7 years",
      nextStep: "Underwriter review",
    },
  ]

  const loanTypes = [
    {
      name: "Home Loan",
      icon: Home,
      description: "Purchase or refinance your dream home",
      rates: "Starting at 6.25%",
      maxAmount: "$2,000,000",
      color: "from-blue-500 to-cyan-500",
      path: "/citizen/loan-center/home-loan",
    },
    {
      name: "Auto Loan",
      icon: Car,
      description: "Finance your next vehicle purchase",
      rates: "Starting at 4.75%",
      maxAmount: "$150,000",
      color: "from-green-500 to-emerald-500",
      path: "/citizen/loan-center/auto-loan",
    },
    {
      name: "Personal Loan",
      icon: CreditCard,
      description: "Flexible financing for any purpose",
      rates: "Starting at 8.99%",
      maxAmount: "$50,000",
      color: "from-purple-500 to-pink-500",
      path: "/citizen/loan-center/personal-loan",
    },
    {
      name: "Business Loan",
      icon: Building2,
      description: "Grow your business with capital",
      rates: "Starting at 7.50%",
      maxAmount: "$5,000,000",
      color: "from-orange-500 to-red-500",
      path: "/citizen/loan-center/business-loan",
    },
  ]

  const loanStats = [
    { title: "Active Applications", value: "4", change: "+2", icon: FileText, color: "text-blue-500" },
    { title: "Total Approved", value: "$585K", change: "+$450K", icon: CheckCircle, color: "text-green-500" },
    { title: "Average Rate", value: "6.87%", change: "-0.25%", icon: TrendingUp, color: "text-purple-500" },
    { title: "Credit Score", value: "785", change: "+15", icon: Shield, color: "text-orange-500" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "processing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "under_review":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "pending":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "processing":
        return <Clock className="h-4 w-4" />
      case "under_review":
        return <Eye className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const filteredApplications = loanApplications.filter((app) => {
    const matchesSearch =
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.lender.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedLoanType === "all" || app.type.toLowerCase().includes(selectedLoanType.toLowerCase())
    return matchesSearch && matchesType
  })

  const handleViewDetails = (applicationId: string) => {
    router.push(`/citizen/loan-center/status/${applicationId}`)
  }

  const handleApplyLoan = (loanPath: string) => {
    router.push(loanPath)
  }

  const handleCalculatePayment = () => {
    router.push("/citizen/loan-center/calculator")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Loan Center
            </h1>
            <p className="text-xl text-blue-200 mt-2">Manage your loan applications and explore financing options</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
              onClick={handleCalculatePayment}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Loan Calculator
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700">
              <Plus className="h-4 w-4 mr-2" />
              New Application
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loanStats.map((stat, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-200">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-blue-900/30 backdrop-blur-sm">
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="apply">Apply for Loan</TabsTrigger>
            <TabsTrigger value="tools">Loan Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-blue-900/30 border-blue-500/30 text-white placeholder:text-blue-300"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={selectedLoanType === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLoanType("all")}
                  className={selectedLoanType === "all" ? "" : "border-blue-500/30 text-blue-300 bg-transparent"}
                >
                  All Types
                </Button>
                <Button
                  variant={selectedLoanType === "home" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLoanType("home")}
                  className={selectedLoanType === "home" ? "" : "border-blue-500/30 text-blue-300 bg-transparent"}
                >
                  Home
                </Button>
                <Button
                  variant={selectedLoanType === "auto" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLoanType("auto")}
                  className={selectedLoanType === "auto" ? "" : "border-blue-500/30 text-blue-300 bg-transparent"}
                >
                  Auto
                </Button>
                <Button
                  variant={selectedLoanType === "personal" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLoanType("personal")}
                  className={selectedLoanType === "personal" ? "" : "border-blue-500/30 text-blue-300 bg-transparent"}
                >
                  Personal
                </Button>
              </div>
            </div>

            {/* Applications Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredApplications.map((application) => (
                <Card
                  key={application.id}
                  className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-400" />
                        {application.type}
                      </CardTitle>
                      <Badge className={getStatusColor(application.status)}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1 capitalize">{application.status.replace("_", " ")}</span>
                      </Badge>
                    </div>
                    <CardDescription className="text-blue-200">Application ID: {application.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-blue-300">Amount:</span>
                        <div className="font-semibold text-white">{application.amount}</div>
                      </div>
                      <div>
                        <span className="text-blue-300">Lender:</span>
                        <div className="font-semibold text-white">{application.lender}</div>
                      </div>
                      <div>
                        <span className="text-blue-300">Interest Rate:</span>
                        <div className="font-semibold text-white">{application.interestRate}</div>
                      </div>
                      <div>
                        <span className="text-blue-300">Term:</span>
                        <div className="font-semibold text-white">{application.term}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300">Progress</span>
                        <span className="text-white font-medium">{application.progress}%</span>
                      </div>
                      <Progress value={application.progress} className="h-2" />
                    </div>

                    <div className="bg-blue-800/30 p-3 rounded-lg border border-blue-500/20">
                      <p className="text-sm text-blue-200">
                        <Clock className="h-4 w-4 inline mr-1" />
                        Next Step: {application.nextStep}
                      </p>
                      <p className="text-xs text-blue-300 mt-1">Expected Close: {application.expectedClose}</p>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                      onClick={() => handleViewDetails(application.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="apply" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loanTypes.map((loanType) => (
                <Card
                  key={loanType.name}
                  className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105"
                >
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${loanType.color}`}>
                        <loanType.icon className="h-6 w-6 text-white" />
                      </div>
                      {loanType.name}
                    </CardTitle>
                    <CardDescription className="text-blue-200">{loanType.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-blue-300">Starting Rate:</span>
                        <div className="font-semibold text-white">{loanType.rates}</div>
                      </div>
                      <div>
                        <span className="text-blue-300">Max Amount:</span>
                        <div className="font-semibold text-white">{loanType.maxAmount}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        className={`flex-1 bg-gradient-to-r ${loanType.color} hover:opacity-90`}
                        onClick={() => handleApplyLoan(loanType.path)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Apply Now
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-500/30 text-blue-300 bg-transparent"
                        onClick={() => router.push(`${loanType.path}/calculator`)}
                      >
                        <Calculator className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-blue-400" />
                    Payment Calculator
                  </CardTitle>
                  <CardDescription className="text-blue-200">Calculate monthly payments for any loan</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-600"
                    onClick={() => router.push("/citizen/loan-center/calculator")}
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Open Calculator
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    Rate Comparison
                  </CardTitle>
                  <CardDescription className="text-blue-200">Compare rates from multiple lenders</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600"
                    onClick={() => router.push("/citizen/loan-center/rate-comparison")}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Compare Rates
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-400" />
                    Credit Check
                  </CardTitle>
                  <CardDescription className="text-blue-200">Check your credit score and report</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600"
                    onClick={() => router.push("/credit")}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Check Credit
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
