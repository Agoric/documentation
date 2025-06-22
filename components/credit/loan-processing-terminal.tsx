"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCreditAcceleration, type CreditAccelerationLoan } from "@/contexts/credit-acceleration-context"
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Shield,
  Building,
  Calculator,
  Target,
  Search,
  Download,
  Upload,
  ArrowRight,
  RefreshCw,
} from "lucide-react"
import { motion } from "framer-motion"

interface ProcessingStep {
  id: string
  name: string
  status: "pending" | "processing" | "completed" | "failed"
  description: string
  estimatedTime: number
  actualTime?: number
  dependencies: string[]
  automated: boolean
}

const loanProcessingSteps: ProcessingStep[] = [
  {
    id: "application_review",
    name: "Application Review",
    status: "completed",
    description: "Initial application data validation and completeness check",
    estimatedTime: 5,
    actualTime: 3,
    dependencies: [],
    automated: true,
  },
  {
    id: "ai_assessment",
    name: "AI Risk Assessment",
    status: "completed",
    description: "Machine learning analysis of borrower creditworthiness",
    estimatedTime: 10,
    actualTime: 8,
    dependencies: ["application_review"],
    automated: true,
  },
  {
    id: "income_verification",
    name: "Income Verification",
    status: "processing",
    description: "Employment and income documentation verification",
    estimatedTime: 60,
    dependencies: ["ai_assessment"],
    automated: false,
  },
  {
    id: "appraisal_order",
    name: "Property Appraisal",
    status: "pending",
    description: "Professional property valuation and inspection",
    estimatedTime: 180,
    dependencies: ["income_verification"],
    automated: false,
  },
  {
    id: "underwriting",
    name: "Final Underwriting",
    status: "pending",
    description: "Comprehensive loan package review and approval decision",
    estimatedTime: 120,
    dependencies: ["appraisal_order"],
    automated: false,
  },
  {
    id: "closing_prep",
    name: "Closing Preparation",
    status: "pending",
    description: "Document preparation and closing coordination",
    estimatedTime: 60,
    dependencies: ["underwriting"],
    automated: false,
  },
  {
    id: "funding",
    name: "Loan Funding",
    status: "pending",
    description: "Final funding and escrow disbursement",
    estimatedTime: 30,
    dependencies: ["closing_prep"],
    automated: true,
  },
]

export function LoanProcessingTerminal() {
  const { loans, updateLoanStatus, processLoanPayment, createEscrowAccount, processEscrowTransaction, searchLoans } =
    useCreditAcceleration()

  const [selectedLoan, setSelectedLoan] = useState<CreditAccelerationLoan | null>(null)
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>(loanProcessingSteps)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isProcessing, setIsProcessing] = useState(false)
  const [escrowData, setEscrowData] = useState({
    propertyTaxes: 0,
    homeownersInsurance: 0,
    pmi: 0,
  })

  const filteredLoans = Object.values(loans).filter((loan) => {
    const matchesSearch =
      loan.loanId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loan.userId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || loan.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "processing":
        return <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-600/20 text-green-300 border-green-400/30"
      case "denied":
        return "bg-red-600/20 text-red-300 border-red-400/30"
      case "pending":
        return "bg-yellow-600/20 text-yellow-300 border-yellow-400/30"
      case "processing":
        return "bg-blue-600/20 text-blue-300 border-blue-400/30"
      case "funded":
        return "bg-purple-600/20 text-purple-300 border-purple-400/30"
      case "active":
        return "bg-emerald-600/20 text-emerald-300 border-emerald-400/30"
      default:
        return "bg-gray-600/20 text-gray-300 border-gray-400/30"
    }
  }

  const processNextStep = async () => {
    if (!selectedLoan) return

    setIsProcessing(true)

    const currentStepIndex = processingSteps.findIndex((step) => step.status === "processing")
    const nextStepIndex = processingSteps.findIndex((step) => step.status === "pending")

    if (nextStepIndex !== -1) {
      const updatedSteps = [...processingSteps]

      // Complete current step if exists
      if (currentStepIndex !== -1) {
        updatedSteps[currentStepIndex] = {
          ...updatedSteps[currentStepIndex],
          status: "completed",
          actualTime: Math.floor(Math.random() * 20) + 5,
        }
      }

      // Start next step
      updatedSteps[nextStepIndex] = {
        ...updatedSteps[nextStepIndex],
        status: "processing",
      }

      setProcessingSteps(updatedSteps)

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Update loan status based on step
      const nextStep = updatedSteps[nextStepIndex]
      if (nextStep.id === "funding") {
        await updateLoanStatus(selectedLoan.loanId, "funded")
      } else if (nextStep.id === "underwriting") {
        await updateLoanStatus(selectedLoan.loanId, "approved")
      }
    }

    setIsProcessing(false)
  }

  const createEscrow = async () => {
    if (!selectedLoan) return

    try {
      await createEscrowAccount(selectedLoan.loanId, escrowData)
      // Refresh loan data
    } catch (error) {
      console.error("Failed to create escrow:", error)
    }
  }

  const calculateMonthlyEscrow = () => {
    const monthlyTaxes = escrowData.propertyTaxes / 12
    const monthlyInsurance = escrowData.homeownersInsurance / 12
    const monthlyPMI = escrowData.pmi / 12
    return monthlyTaxes + monthlyInsurance + monthlyPMI
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Loan Processing Terminal
          </h1>
          <p className="text-xl text-purple-200">
            Advanced loan processing with automated workflows and escrow management
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Loan Search & List */}
          <div className="xl:col-span-4 space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  Loan Search
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-blue-200">Search Loans</Label>
                  <Input
                    placeholder="Search by Loan ID or User ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-blue-800/30 border-blue-600 text-blue-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-blue-200">Filter by Status</Label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-blue-800/30 border border-blue-600 rounded-md text-blue-100"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="approved">Approved</option>
                    <option value="funded">Funded</option>
                    <option value="active">Active</option>
                    <option value="denied">Denied</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
              <CardHeader>
                <CardTitle className="text-slate-300 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Loan Queue ({filteredLoans.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-3">
                    {filteredLoans.map((loan) => (
                      <motion.div
                        key={loan.loanId}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedLoan?.loanId === loan.loanId
                            ? "bg-purple-800/30 border-purple-400/50"
                            : "bg-slate-800/30 border-slate-600/30 hover:border-slate-400/50"
                        }`}
                        onClick={() => setSelectedLoan(loan)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-slate-200">{loan.loanId}</span>
                          <Badge className={getStatusColor(loan.status)}>{loan.status.toUpperCase()}</Badge>
                        </div>
                        <div className="text-sm text-gray-400">
                          Amount: ${(loan.approvedAmount || loan.requestedAmount).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-400">
                          Applied: {loan.applicationDate.toLocaleDateString()}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Processing Details */}
          <div className="xl:col-span-8 space-y-6">
            {selectedLoan ? (
              <>
                {/* Loan Details */}
                <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
                  <CardHeader>
                    <CardTitle className="text-purple-300 flex items-center justify-between">
                      <div className="flex items-center">
                        <Building className="w-5 h-5 mr-2" />
                        Loan Details - {selectedLoan.loanId}
                      </div>
                      <Badge className={getStatusColor(selectedLoan.status)}>{selectedLoan.status.toUpperCase()}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-purple-300">Loan Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Requested:</span>
                            <span className="text-purple-200">${selectedLoan.requestedAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Approved:</span>
                            <span className="text-purple-200">
                              ${(selectedLoan.approvedAmount || 0).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Interest Rate:</span>
                            <span className="text-purple-200">{(selectedLoan.interestRate * 100).toFixed(2)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Term:</span>
                            <span className="text-purple-200">{selectedLoan.termMonths} months</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-purple-300">Borrower Profile</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Credit Score:</span>
                            <span className="text-purple-200">{selectedLoan.creditScore}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Annual Income:</span>
                            <span className="text-purple-200">${selectedLoan.annualIncome.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">DTI Ratio:</span>
                            <span className="text-purple-200">
                              {(selectedLoan.debtToIncomeRatio * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Employment:</span>
                            <span className="text-purple-200">{selectedLoan.employmentStatus}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-purple-300">AI Assessment</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Risk Score:</span>
                            <span className="text-purple-200">{(selectedLoan.aiRiskScore * 100).toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Recommendation:</span>
                            <Badge
                              className={
                                selectedLoan.aiRecommendation === "approve"
                                  ? "bg-green-600/20 text-green-300"
                                  : selectedLoan.aiRecommendation === "deny"
                                    ? "bg-red-600/20 text-red-300"
                                    : "bg-yellow-600/20 text-yellow-300"
                              }
                            >
                              {selectedLoan.aiRecommendation.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Confidence:</span>
                            <span className="text-purple-200">{(selectedLoan.aiConfidence * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Processing Pipeline */}
                <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
                  <CardHeader>
                    <CardTitle className="text-green-300 flex items-center justify-between">
                      <div className="flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        Processing Pipeline
                      </div>
                      <Button
                        onClick={processNextStep}
                        disabled={isProcessing}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isProcessing ? (
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <ArrowRight className="w-4 h-4 mr-2" />
                        )}
                        Process Next Step
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {processingSteps.map((step, index) => (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-4 rounded-lg border ${
                            step.status === "completed"
                              ? "bg-green-800/20 border-green-400/30"
                              : step.status === "processing"
                                ? "bg-blue-800/20 border-blue-400/30"
                                : step.status === "failed"
                                  ? "bg-red-800/20 border-red-400/30"
                                  : "bg-gray-800/20 border-gray-600/30"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              {getStatusIcon(step.status)}
                              <span className="font-medium text-white">{step.name}</span>
                              {step.automated && (
                                <Badge className="bg-purple-600/20 text-purple-300 text-xs">AUTO</Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-400">
                              {step.actualTime ? `${step.actualTime}min` : `~${step.estimatedTime}min`}
                            </div>
                          </div>
                          <p className="text-sm text-gray-300 mb-2">{step.description}</p>
                          {step.status === "processing" && <Progress value={65} className="h-2" />}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Escrow Management */}
                <Tabs defaultValue="escrow" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-slate-800/30">
                    <TabsTrigger value="escrow">Escrow Setup</TabsTrigger>
                    <TabsTrigger value="payments">Payment Schedule</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                  </TabsList>

                  <TabsContent value="escrow">
                    <Card className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border-amber-400/30">
                      <CardHeader>
                        <CardTitle className="text-amber-300 flex items-center">
                          <Shield className="w-5 h-5 mr-2" />
                          Escrow Account Setup
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label className="text-amber-200">Annual Property Taxes</Label>
                            <Input
                              type="number"
                              value={escrowData.propertyTaxes}
                              onChange={(e) =>
                                setEscrowData((prev) => ({
                                  ...prev,
                                  propertyTaxes: Number(e.target.value),
                                }))
                              }
                              className="bg-amber-800/30 border-amber-600 text-amber-100"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-amber-200">Annual Insurance</Label>
                            <Input
                              type="number"
                              value={escrowData.homeownersInsurance}
                              onChange={(e) =>
                                setEscrowData((prev) => ({
                                  ...prev,
                                  homeownersInsurance: Number(e.target.value),
                                }))
                              }
                              className="bg-amber-800/30 border-amber-600 text-amber-100"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-amber-200">Annual PMI</Label>
                            <Input
                              type="number"
                              value={escrowData.pmi}
                              onChange={(e) =>
                                setEscrowData((prev) => ({
                                  ...prev,
                                  pmi: Number(e.target.value),
                                }))
                              }
                              className="bg-amber-800/30 border-amber-600 text-amber-100"
                            />
                          </div>
                        </div>

                        <div className="p-4 bg-amber-800/20 rounded-lg border border-amber-400/20">
                          <h4 className="font-semibold text-amber-300 mb-2">Monthly Escrow Calculation</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Property Taxes:</span>
                              <span className="text-amber-300">${(escrowData.propertyTaxes / 12).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Insurance:</span>
                              <span className="text-amber-300">
                                ${(escrowData.homeownersInsurance / 12).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">PMI:</span>
                              <span className="text-amber-300">${(escrowData.pmi / 12).toFixed(2)}</span>
                            </div>
                            <div className="border-t border-amber-400/20 pt-1 mt-2">
                              <div className="flex justify-between font-semibold">
                                <span className="text-amber-300">Total Monthly Escrow:</span>
                                <span className="text-amber-300">${calculateMonthlyEscrow().toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={createEscrow}
                          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Create Escrow Account
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="payments">
                    <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-400/30">
                      <CardHeader>
                        <CardTitle className="text-indigo-300 flex items-center">
                          <Calculator className="w-5 h-5 mr-2" />
                          Payment Schedule
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <h4 className="font-semibold text-indigo-300">Monthly Payment Breakdown</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Principal & Interest:</span>
                                  <span className="text-indigo-200">
                                    ${(selectedLoan.monthlyPayment || 0).toFixed(2)}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Escrow:</span>
                                  <span className="text-indigo-200">${calculateMonthlyEscrow().toFixed(2)}</span>
                                </div>
                                <div className="border-t border-indigo-400/20 pt-2">
                                  <div className="flex justify-between font-semibold">
                                    <span className="text-indigo-300">Total Payment:</span>
                                    <span className="text-indigo-300">
                                      ${((selectedLoan.monthlyPayment || 0) + calculateMonthlyEscrow()).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h4 className="font-semibold text-indigo-300">Next Payment</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Due Date:</span>
                                  <span className="text-indigo-200">
                                    {selectedLoan.nextPaymentDate.toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Amount:</span>
                                  <span className="text-indigo-200">${selectedLoan.nextPaymentAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Current Balance:</span>
                                  <span className="text-indigo-200">
                                    ${selectedLoan.currentBalance.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-indigo-800/20 rounded-lg border border-indigo-400/20">
                            <h4 className="font-semibold text-indigo-300 mb-3">Recent Payments</h4>
                            {selectedLoan.paymentsHistory.length > 0 ? (
                              <div className="space-y-2">
                                {selectedLoan.paymentsHistory.slice(0, 5).map((payment) => (
                                  <div key={payment.paymentId} className="flex justify-between text-sm">
                                    <span className="text-gray-400">
                                      {payment.paidDate?.toLocaleDateString() || "Scheduled"}
                                    </span>
                                    <span className="text-indigo-200">
                                      ${(payment.paidAmount || payment.scheduledAmount).toFixed(2)}
                                    </span>
                                    <Badge
                                      className={
                                        payment.status === "paid"
                                          ? "bg-green-600/20 text-green-300"
                                          : payment.status === "late"
                                            ? "bg-red-600/20 text-red-300"
                                            : "bg-yellow-600/20 text-yellow-300"
                                      }
                                    >
                                      {payment.status}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-400 text-sm">No payment history available</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="documents">
                    <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
                      <CardHeader>
                        <CardTitle className="text-slate-300 flex items-center">
                          <FileText className="w-5 h-5 mr-2" />
                          Loan Documents
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <h4 className="font-semibold text-slate-300">Required Documents</h4>
                              <div className="space-y-2">
                                {[
                                  "Application Form",
                                  "Income Verification",
                                  "Credit Report",
                                  "Property Appraisal",
                                  "Title Report",
                                  "Insurance Policy",
                                ].map((doc, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between p-2 bg-slate-800/30 rounded"
                                  >
                                    <span className="text-slate-200 text-sm">{doc}</span>
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h4 className="font-semibold text-slate-300">Closing Documents</h4>
                              <div className="space-y-2">
                                {[
                                  "Loan Agreement",
                                  "Promissory Note",
                                  "Deed of Trust",
                                  "Closing Disclosure",
                                  "Escrow Instructions",
                                  "Insurance Binder",
                                ].map((doc, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between p-2 bg-slate-800/30 rounded"
                                  >
                                    <span className="text-slate-200 text-sm">{doc}</span>
                                    <Clock className="w-4 h-4 text-gray-400" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-4">
                            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Document
                            </Button>
                            <Button className="flex-1 bg-green-600 hover:bg-green-700">
                              <Download className="w-4 h-4 mr-2" />
                              Generate Package
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
                <CardContent className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No Loan Selected</h3>
                  <p className="text-gray-400">
                    Select a loan from the queue to view processing details and manage the workflow.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
