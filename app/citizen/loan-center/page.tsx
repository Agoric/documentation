"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  CreditCard,
  DollarSign,
  FileText,
  CheckCircle,
  Clock,
  Home,
  Car,
  GraduationCap,
  Building,
  Calculator,
  Download,
  Upload,
  User,
  ArrowRight,
  RefreshCw,
  Eye,
  Plus,
} from "lucide-react"

interface LoanApplication {
  id: string
  type: string
  amount: number
  status: "draft" | "submitted" | "under-review" | "approved" | "funded" | "rejected"
  progress: number
  submittedDate: string
  expectedDecision: string
  currentStep: string
  nextStep: string
  documents: Document[]
  lender: string
  interestRate?: number
  term?: number
}

interface Document {
  id: string
  name: string
  type: string
  status: "pending" | "uploaded" | "verified" | "rejected"
  uploadDate?: string
}

export default function CitizenLoanCenterPage() {
  const [activeApplications, setActiveApplications] = useState<LoanApplication[]>([
    {
      id: "LA001",
      type: "Home Mortgage",
      amount: 450000,
      status: "under-review",
      progress: 65,
      submittedDate: "2024-01-15",
      expectedDecision: "2024-02-01",
      currentStep: "Credit Verification",
      nextStep: "Property Appraisal",
      lender: "Snapifi Lending",
      interestRate: 6.75,
      term: 30,
      documents: [
        { id: "d1", name: "Income Verification", type: "W2", status: "verified", uploadDate: "2024-01-15" },
        { id: "d2", name: "Bank Statements", type: "PDF", status: "verified", uploadDate: "2024-01-16" },
        { id: "d3", name: "Property Documents", type: "PDF", status: "pending" },
        { id: "d4", name: "Insurance Quote", type: "PDF", status: "pending" },
      ],
    },
    {
      id: "LA002",
      type: "Auto Loan",
      amount: 35000,
      status: "approved",
      progress: 90,
      submittedDate: "2024-01-10",
      expectedDecision: "2024-01-25",
      currentStep: "Final Documentation",
      nextStep: "Fund Disbursement",
      lender: "Snapifi Auto Finance",
      interestRate: 4.25,
      term: 5,
      documents: [
        { id: "d5", name: "Vehicle Information", type: "PDF", status: "verified", uploadDate: "2024-01-10" },
        { id: "d6", name: "Insurance Proof", type: "PDF", status: "verified", uploadDate: "2024-01-11" },
        { id: "d7", name: "Final Contract", type: "PDF", status: "uploaded", uploadDate: "2024-01-20" },
      ],
    },
  ])

  const [newApplication, setNewApplication] = useState({
    type: "",
    amount: "",
    purpose: "",
    income: "",
    employment: "",
    creditScore: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-500"
      case "submitted":
        return "bg-blue-500"
      case "under-review":
        return "bg-yellow-500"
      case "approved":
        return "bg-green-500"
      case "funded":
        return "bg-emerald-500"
      case "rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-500"
      case "uploaded":
        return "text-blue-500"
      case "verified":
        return "text-green-500"
      case "rejected":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const handleNextStep = async (applicationId: string) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setActiveApplications((prev) =>
      prev.map((app) => {
        if (app.id === applicationId) {
          const newProgress = Math.min(app.progress + 15, 100)
          let newStatus = app.status
          let newCurrentStep = app.nextStep
          let newNextStep = app.nextStep

          if (newProgress >= 100) {
            newStatus = "funded"
            newCurrentStep = "Completed"
            newNextStep = "Loan Active"
          } else if (newProgress >= 90) {
            newStatus = "approved"
            newNextStep = "Fund Disbursement"
          } else if (newProgress >= 70) {
            newNextStep = "Final Review"
          } else if (newProgress >= 50) {
            newNextStep = "Document Verification"
          }

          return {
            ...app,
            progress: newProgress,
            status: newStatus,
            currentStep: newCurrentStep,
            nextStep: newNextStep,
          }
        }
        return app
      }),
    )

    setIsSubmitting(false)
  }

  const handleNewApplication = async () => {
    if (!newApplication.type || !newApplication.amount) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newApp: LoanApplication = {
      id: `LA${String(activeApplications.length + 1).padStart(3, "0")}`,
      type: newApplication.type,
      amount: Number.parseInt(newApplication.amount),
      status: "submitted",
      progress: 10,
      submittedDate: new Date().toISOString().split("T")[0],
      expectedDecision: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      currentStep: "Initial Review",
      nextStep: "Credit Check",
      lender: "Snapifi Lending",
      documents: [
        {
          id: `d${Date.now()}`,
          name: "Application Form",
          type: "PDF",
          status: "uploaded",
          uploadDate: new Date().toISOString().split("T")[0],
        },
      ],
    }

    setActiveApplications((prev) => [...prev, newApp])
    setNewApplication({ type: "", amount: "", purpose: "", income: "", employment: "", creditScore: "" })
    setIsSubmitting(false)
  }

  const loanTypes = [
    { value: "Home Mortgage", icon: Home, description: "Purchase or refinance your home" },
    { value: "Auto Loan", icon: Car, description: "Finance your vehicle purchase" },
    { value: "Personal Loan", icon: User, description: "Flexible personal financing" },
    { value: "Business Loan", icon: Building, description: "Grow your business" },
    { value: "Student Loan", icon: GraduationCap, description: "Education financing" },
  ]

  const totalLoanAmount = activeApplications.reduce((sum, app) => sum + app.amount, 0)
  const approvedLoans = activeApplications.filter((app) => app.status === "approved" || app.status === "funded").length
  const pendingLoans = activeApplications.filter(
    (app) => app.status === "submitted" || app.status === "under-review",
  ).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
              <CreditCard className="h-10 w-10 text-blue-400" />
              Loan Center
            </h1>
            <p className="text-xl text-blue-200 mt-2">Manage your loan applications and track progress</p>
          </div>
          <Button
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            onClick={() => document.getElementById("new-application")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Application
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-200">Total Loan Amount</p>
                  <p className="text-2xl font-bold text-white">${totalLoanAmount.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-200">Active Applications</p>
                  <p className="text-2xl font-bold text-white">{activeApplications.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-200">Approved Loans</p>
                  <p className="text-2xl font-bold text-white">{approvedLoans}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-200">Pending Review</p>
                  <p className="text-2xl font-bold text-white">{pendingLoans}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-blue-900/30 backdrop-blur-sm">
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="new-application">New Application</TabsTrigger>
            <TabsTrigger value="loan-calculator">Loan Calculator</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-6">
            {activeApplications.map((application) => (
              <Card
                key={application.id}
                className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-blue-200 flex items-center gap-2">
                        {application.type === "Home Mortgage" && <Home className="h-5 w-5" />}
                        {application.type === "Auto Loan" && <Car className="h-5 w-5" />}
                        {application.type === "Personal Loan" && <User className="h-5 w-5" />}
                        {application.type === "Business Loan" && <Building className="h-5 w-5" />}
                        {application.type === "Student Loan" && <GraduationCap className="h-5 w-5" />}
                        {application.type} - ${application.amount.toLocaleString()}
                      </CardTitle>
                      <CardDescription className="text-blue-300">
                        Application ID: {application.id} • Submitted: {application.submittedDate}
                      </CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(application.status)} text-white`}>
                      {application.status.replace("-", " ").toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Progress Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-200">Application Progress</span>
                      <span className="text-sm text-blue-200">{application.progress}%</span>
                    </div>
                    <Progress value={application.progress} className="h-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-300">Current: {application.currentStep}</span>
                      <span className="text-blue-300">Next: {application.nextStep}</span>
                    </div>
                  </div>

                  {/* Loan Details */}
                  {application.interestRate && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-blue-800/20 rounded-lg">
                      <div>
                        <p className="text-xs text-blue-300">Interest Rate</p>
                        <p className="font-medium text-white">{application.interestRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-300">Term</p>
                        <p className="font-medium text-white">{application.term} years</p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-300">Lender</p>
                        <p className="font-medium text-white">{application.lender}</p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-300">Expected Decision</p>
                        <p className="font-medium text-white">{application.expectedDecision}</p>
                      </div>
                    </div>
                  )}

                  {/* Documents Section */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-blue-200">Required Documents</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {application.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 bg-blue-800/20 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className={`h-4 w-4 ${getDocumentStatusColor(doc.status)}`} />
                            <div>
                              <p className="text-sm font-medium text-white">{doc.name}</p>
                              <p className="text-xs text-blue-300">{doc.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`text-xs ${getDocumentStatusColor(doc.status)} border-current`}
                            >
                              {doc.status}
                            </Badge>
                            {doc.status === "pending" && (
                              <Button size="sm" variant="outline" className="h-6 px-2 text-xs bg-transparent">
                                <Upload className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-4 border-t border-blue-500/20">
                    <Button
                      onClick={() => handleNextStep(application.id)}
                      disabled={isSubmitting || application.status === "funded"}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      {isSubmitting ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <ArrowRight className="h-4 w-4 mr-2" />
                      )}
                      {application.status === "funded" ? "Completed" : "Proceed to Next Step"}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="new-application" id="new-application" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-200">New Loan Application</CardTitle>
                <CardDescription className="text-blue-300">
                  Start your loan application process with Snapifi Lending
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Loan Type Selection */}
                <div className="space-y-4">
                  <Label className="text-blue-200">Loan Type</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {loanTypes.map((type) => (
                      <Card
                        key={type.value}
                        className={`cursor-pointer transition-all ${
                          newApplication.type === type.value
                            ? "bg-blue-600/30 border-blue-400"
                            : "bg-blue-800/20 border-blue-500/20 hover:bg-blue-700/30"
                        }`}
                        onClick={() => setNewApplication((prev) => ({ ...prev, type: type.value }))}
                      >
                        <CardContent className="p-4 text-center">
                          <type.icon className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                          <h4 className="font-medium text-white mb-1">{type.value}</h4>
                          <p className="text-xs text-blue-300">{type.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Application Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-blue-200">
                      Loan Amount
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter loan amount"
                      value={newApplication.amount}
                      onChange={(e) => setNewApplication((prev) => ({ ...prev, amount: e.target.value }))}
                      className="bg-blue-800/20 border-blue-500/30 text-white placeholder:text-blue-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="income" className="text-blue-200">
                      Annual Income
                    </Label>
                    <Input
                      id="income"
                      type="number"
                      placeholder="Enter annual income"
                      value={newApplication.income}
                      onChange={(e) => setNewApplication((prev) => ({ ...prev, income: e.target.value }))}
                      className="bg-blue-800/20 border-blue-500/30 text-white placeholder:text-blue-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employment" className="text-blue-200">
                      Employment Status
                    </Label>
                    <Select
                      value={newApplication.employment}
                      onValueChange={(value) => setNewApplication((prev) => ({ ...prev, employment: value }))}
                    >
                      <SelectTrigger className="bg-blue-800/20 border-blue-500/30 text-white">
                        <SelectValue placeholder="Select employment status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time Employee</SelectItem>
                        <SelectItem value="part-time">Part-time Employee</SelectItem>
                        <SelectItem value="self-employed">Self-employed</SelectItem>
                        <SelectItem value="contractor">Independent Contractor</SelectItem>
                        <SelectItem value="unemployed">Unemployed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="credit-score" className="text-blue-200">
                      Estimated Credit Score
                    </Label>
                    <Select
                      value={newApplication.creditScore}
                      onValueChange={(value) => setNewApplication((prev) => ({ ...prev, creditScore: value }))}
                    >
                      <SelectTrigger className="bg-blue-800/20 border-blue-500/30 text-white">
                        <SelectValue placeholder="Select credit score range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent (750+)</SelectItem>
                        <SelectItem value="good">Good (700-749)</SelectItem>
                        <SelectItem value="fair">Fair (650-699)</SelectItem>
                        <SelectItem value="poor">Poor (600-649)</SelectItem>
                        <SelectItem value="bad">Bad (Below 600)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose" className="text-blue-200">
                    Loan Purpose
                  </Label>
                  <Textarea
                    id="purpose"
                    placeholder="Describe the purpose of this loan"
                    value={newApplication.purpose}
                    onChange={(e) => setNewApplication((prev) => ({ ...prev, purpose: e.target.value }))}
                    className="bg-blue-800/20 border-blue-500/30 text-white placeholder:text-blue-400"
                  />
                </div>

                <Button
                  onClick={handleNewApplication}
                  disabled={!newApplication.type || !newApplication.amount || isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  {isSubmitting ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <FileText className="h-4 w-4 mr-2" />
                  )}
                  Submit Application
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loan-calculator" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-200 flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Loan Calculator
                </CardTitle>
                <CardDescription className="text-blue-300">
                  Calculate your monthly payments and total interest
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-800/20 to-cyan-800/10 rounded-lg">
                  <div className="text-center">
                    <Calculator className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                    <p className="text-blue-200">Interactive Loan Calculator</p>
                    <p className="text-sm text-blue-300 mt-2">
                      Calculate payments, interest, and amortization schedules
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
