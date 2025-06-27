"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  Calculator,
  Clock,
  DollarSign,
  FileText,
  Home,
  User,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Upload,
  Eye,
  Briefcase,
} from "lucide-react"

interface LoanApplication {
  id: string
  type: string
  amount: number
  status: "pending" | "processing" | "approved" | "rejected" | "funded"
  progress: number
  currentStep: string
  nextStep: string
  submittedDate: string
  estimatedCompletion: string
  documents: DocumentStatus[]
  lenderInfo?: {
    name: string
    rate: number
    terms: string
  }
}

interface DocumentStatus {
  name: string
  status: "pending" | "uploaded" | "verified" | "rejected"
  required: boolean
}

export default function CitizenLoanCenterPage() {
  const [activeApplications, setActiveApplications] = useState<LoanApplication[]>([])
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Mock data for loan applications
  useEffect(() => {
    const mockApplications: LoanApplication[] = [
      {
        id: "LA-2024-001",
        type: "Home Purchase",
        amount: 450000,
        status: "processing",
        progress: 65,
        currentStep: "Credit Verification",
        nextStep: "Income Verification",
        submittedDate: "2024-01-15",
        estimatedCompletion: "2024-02-15",
        documents: [
          { name: "Credit Report", status: "verified", required: true },
          { name: "Income Statement", status: "uploaded", required: true },
          { name: "Bank Statements", status: "pending", required: true },
          { name: "Tax Returns", status: "verified", required: true },
        ],
        lenderInfo: {
          name: "Premier Bank",
          rate: 6.75,
          terms: "30-year fixed",
        },
      },
      {
        id: "LA-2024-002",
        type: "Auto Loan",
        amount: 35000,
        status: "approved",
        progress: 90,
        currentStep: "Final Documentation",
        nextStep: "Funding",
        submittedDate: "2024-01-20",
        estimatedCompletion: "2024-01-30",
        documents: [
          { name: "Vehicle Information", status: "verified", required: true },
          { name: "Insurance Proof", status: "verified", required: true },
          { name: "Income Verification", status: "verified", required: true },
        ],
        lenderInfo: {
          name: "Auto Finance Corp",
          rate: 4.25,
          terms: "60 months",
        },
      },
      {
        id: "LA-2024-003",
        type: "Personal Loan",
        amount: 15000,
        status: "pending",
        progress: 25,
        currentStep: "Initial Review",
        nextStep: "Document Collection",
        submittedDate: "2024-01-25",
        estimatedCompletion: "2024-02-10",
        documents: [
          { name: "Application Form", status: "uploaded", required: true },
          { name: "ID Verification", status: "pending", required: true },
          { name: "Proof of Income", status: "pending", required: true },
        ],
      },
    ]
    setActiveApplications(mockApplications)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-400 bg-green-500/20"
      case "processing":
        return "text-blue-400 bg-blue-500/20"
      case "pending":
        return "text-yellow-400 bg-yellow-500/20"
      case "rejected":
        return "text-red-400 bg-red-500/20"
      case "funded":
        return "text-purple-400 bg-purple-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "uploaded":
        return <Clock className="h-4 w-4 text-blue-400" />
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-400" />
      default:
        return <Upload className="h-4 w-4 text-gray-400" />
    }
  }

  const handleNextStep = async (applicationId: string) => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setActiveApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId
          ? {
              ...app,
              progress: Math.min(app.progress + 25, 100),
              currentStep: app.nextStep,
              nextStep: app.progress >= 75 ? "Complete" : "Final Review",
            }
          : app,
      ),
    )
    setLoading(false)
  }

  const loanTypes = [
    { name: "Home Purchase", icon: Home, description: "Primary residence loans" },
    { name: "Auto Loan", icon: Building2, description: "Vehicle financing" },
    { name: "Personal Loan", icon: User, description: "General purpose loans" },
    { name: "Business Loan", icon: Briefcase, description: "Commercial financing" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
              <Building2 className="h-10 w-10 text-blue-400" />
              Loan Center
            </h1>
            <p className="text-xl text-blue-200 mt-2">Manage your loan applications and track progress</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
            <DollarSign className="h-4 w-4 mr-2" />
            New Loan Application
          </Button>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-blue-900/30 backdrop-blur-sm">
            <TabsTrigger value="active">Active Applications</TabsTrigger>
            <TabsTrigger value="new">New Application</TabsTrigger>
            <TabsTrigger value="calculator">Loan Calculator</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Active Applications */}
          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {activeApplications.map((application) => (
                <Card
                  key={application.id}
                  className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20 cursor-pointer hover:border-blue-400/40 transition-colors"
                  onClick={() => setSelectedApplication(application.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-blue-200 text-lg">{application.type}</CardTitle>
                      <Badge className={getStatusColor(application.status)}>{application.status.toUpperCase()}</Badge>
                    </div>
                    <CardDescription className="text-blue-300">Application ID: {application.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Loan Amount:</span>
                      <span className="text-white font-bold">${application.amount.toLocaleString()}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-blue-200">Progress</span>
                        <span className="text-blue-300">{application.progress}%</span>
                      </div>
                      <Progress value={application.progress} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-blue-400" />
                        <span className="text-blue-200">Current Step:</span>
                        <span className="text-white">{application.currentStep}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <ArrowRight className="h-4 w-4 text-green-400" />
                        <span className="text-blue-200">Next Step:</span>
                        <span className="text-green-300">{application.nextStep}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-200">Est. Completion:</span>
                      <span className="text-blue-300">{application.estimatedCompletion}</span>
                    </div>

                    {application.status === "processing" && application.progress < 100 && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleNextStep(application.id)
                        }}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      >
                        {loading ? "Processing..." : `Proceed to ${application.nextStep}`}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detailed View */}
            {selectedApplication && (
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-blue-200 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Application Details: {selectedApplication}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const app = activeApplications.find((a) => a.id === selectedApplication)
                    if (!app) return null

                    return (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Application Info */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-blue-200">Application Information</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-blue-200">Type:</span>
                              <span className="text-white">{app.type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-blue-200">Amount:</span>
                              <span className="text-white">${app.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-blue-200">Status:</span>
                              <Badge className={getStatusColor(app.status)}>{app.status.toUpperCase()}</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-blue-200">Submitted:</span>
                              <span className="text-white">{app.submittedDate}</span>
                            </div>
                            {app.lenderInfo && (
                              <>
                                <div className="flex justify-between">
                                  <span className="text-blue-200">Lender:</span>
                                  <span className="text-white">{app.lenderInfo.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-blue-200">Rate:</span>
                                  <span className="text-white">{app.lenderInfo.rate}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-blue-200">Terms:</span>
                                  <span className="text-white">{app.lenderInfo.terms}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Document Status */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-blue-200">Document Status</h3>
                          <div className="space-y-3">
                            {app.documents.map((doc, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-blue-800/30 to-cyan-800/20 border border-blue-500/20"
                              >
                                <div className="flex items-center gap-3">
                                  {getDocumentStatusIcon(doc.status)}
                                  <span className="text-white">{doc.name}</span>
                                  {doc.required && (
                                    <Badge variant="outline" className="text-xs text-red-300 border-red-500/30">
                                      Required
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={getStatusColor(doc.status)}>{doc.status.toUpperCase()}</Badge>
                                  {doc.status === "uploaded" && (
                                    <Button size="sm" variant="outline" className="border-blue-500/30 bg-transparent">
                                      <Eye className="h-3 w-3" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* New Application */}
          <TabsContent value="new" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loanTypes.map((type, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20 cursor-pointer hover:border-blue-400/40 transition-colors"
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <type.icon className="h-12 w-12 mx-auto text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">{type.name}</h3>
                    <p className="text-sm text-blue-200">{type.description}</p>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-200">Quick Application Form</CardTitle>
                <CardDescription className="text-blue-300">Get pre-qualified in minutes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="loanType" className="text-blue-200">
                      Loan Type
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-blue-900/30 border-blue-500/30">
                        <SelectValue placeholder="Select loan type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Home Purchase</SelectItem>
                        <SelectItem value="auto">Auto Loan</SelectItem>
                        <SelectItem value="personal">Personal Loan</SelectItem>
                        <SelectItem value="business">Business Loan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-blue-200">
                      Loan Amount
                    </Label>
                    <Input id="amount" placeholder="$0" className="bg-blue-900/30 border-blue-500/30 text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="income" className="text-blue-200">
                      Annual Income
                    </Label>
                    <Input id="income" placeholder="$0" className="bg-blue-900/30 border-blue-500/30 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="creditScore" className="text-blue-200">
                      Credit Score
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-blue-900/30 border-blue-500/30">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">750+ (Excellent)</SelectItem>
                        <SelectItem value="good">700-749 (Good)</SelectItem>
                        <SelectItem value="fair">650-699 (Fair)</SelectItem>
                        <SelectItem value="poor">Below 650 (Poor)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  Get Pre-Qualified
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Loan Calculator */}
          <TabsContent value="calculator" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-200 flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Loan Payment Calculator
                </CardTitle>
                <CardDescription className="text-blue-300">
                  Calculate your monthly payments and total interest
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="loanAmount" className="text-blue-200">
                        Loan Amount
                      </Label>
                      <Input
                        id="loanAmount"
                        placeholder="$450,000"
                        className="bg-blue-900/30 border-blue-500/30 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interestRate" className="text-blue-200">
                        Interest Rate (%)
                      </Label>
                      <Input
                        id="interestRate"
                        placeholder="6.75"
                        className="bg-blue-900/30 border-blue-500/30 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loanTerm" className="text-blue-200">
                        Loan Term (years)
                      </Label>
                      <Input id="loanTerm" placeholder="30" className="bg-blue-900/30 border-blue-500/30 text-white" />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                      Calculate Payment
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 rounded-lg bg-gradient-to-br from-blue-800/30 to-cyan-800/20 border border-blue-500/20">
                      <h3 className="text-lg font-semibold text-blue-200 mb-4">Payment Breakdown</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-blue-200">Monthly Payment:</span>
                          <span className="text-2xl font-bold text-green-400">$2,922</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-200">Total Interest:</span>
                          <span className="text-white">$601,920</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-200">Total Amount:</span>
                          <span className="text-white">$1,051,920</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-lg bg-gradient-to-br from-green-800/30 to-emerald-800/20 border border-green-500/20">
                      <h3 className="text-lg font-semibold text-green-200 mb-4">Monthly Budget Impact</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-green-200">Principal & Interest:</span>
                          <span className="text-white">$2,922</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-200">Est. Property Tax:</span>
                          <span className="text-white">$562</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-200">Est. Insurance:</span>
                          <span className="text-white">$225</span>
                        </div>
                        <hr className="border-green-500/30" />
                        <div className="flex justify-between font-bold">
                          <span className="text-green-200">Total Monthly:</span>
                          <span className="text-green-400">$3,709</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History */}
          <TabsContent value="history" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-200">Loan History</CardTitle>
                <CardDescription className="text-blue-300">Your completed and closed loan applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-green-800/30 to-emerald-800/20 border border-green-500/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">Home Purchase Loan</h4>
                        <p className="text-sm text-green-200">Funded: December 2023</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">$380,000</p>
                        <Badge className="text-green-400 bg-green-500/20">FUNDED</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-br from-blue-800/30 to-cyan-800/20 border border-blue-500/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">Auto Loan Refinance</h4>
                        <p className="text-sm text-blue-200">Completed: October 2023</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">$28,500</p>
                        <Badge className="text-blue-400 bg-blue-500/20">COMPLETED</Badge>
                      </div>
                    </div>
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
