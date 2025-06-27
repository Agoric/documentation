"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  CreditCard,
  Home,
  ArrowRight,
  RefreshCw,
  Bell,
  Eye,
} from "lucide-react"

interface LoanStatus {
  id: string
  type: string
  amount: number
  status: "submitted" | "under-review" | "approved" | "funded" | "rejected"
  progress: number
  currentStep: string
  nextStep: string
  canProceed: boolean
  estimatedCompletion: string
  lastUpdated: string
}

interface LoanStatusTrackerProps {
  loanId?: string
  compact?: boolean
  onStepComplete?: (loanId: string) => void
}

export function LoanStatusTracker({ loanId, compact = false, onStepComplete }: LoanStatusTrackerProps) {
  const [loanStatus, setLoanStatus] = useState<LoanStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch loan status
    const fetchLoanStatus = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data - in real app, this would come from API
      const mockStatus: LoanStatus = {
        id: loanId || "LA001",
        type: "Home Mortgage",
        amount: 450000,
        status: "under-review",
        progress: 65,
        currentStep: "Credit Verification",
        nextStep: "Property Appraisal",
        canProceed: true,
        estimatedCompletion: "2024-02-01",
        lastUpdated: "2024-01-22 10:30 AM",
      }

      setLoanStatus(mockStatus)
      setIsLoading(false)
    }

    fetchLoanStatus()
  }, [loanId])

  const handleNextStep = async () => {
    if (!loanStatus) return

    setIsProcessing(true)

    // Simulate API call to advance to next step
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setLoanStatus((prev) => {
      if (!prev) return null

      const newProgress = Math.min(prev.progress + 15, 100)
      let newStatus = prev.status
      let newCurrentStep = prev.nextStep
      let newNextStep = prev.nextStep

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
        ...prev,
        progress: newProgress,
        status: newStatus,
        currentStep: newCurrentStep,
        nextStep: newNextStep,
        canProceed: newProgress < 100,
        lastUpdated: new Date().toLocaleString(),
      }
    })

    if (onStepComplete && loanStatus) {
      onStepComplete(loanStatus.id)
    }

    setIsProcessing(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "under-review":
        return <RefreshCw className="h-5 w-5 text-yellow-500" />
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "funded":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />
      case "rejected":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
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

  const getLoanTypeIcon = (type: string) => {
    switch (type) {
      case "Home Mortgage":
        return <Home className="h-5 w-5" />
      case "Auto Loan":
        return <CreditCard className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
        <CardContent className="p-6 flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 mx-auto mb-2 text-blue-400 animate-spin" />
            <p className="text-blue-200">Loading loan status...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!loanStatus) {
    return (
      <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
        <CardContent className="p-6 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 mx-auto mb-2 text-red-400" />
            <p className="text-red-200">Loan status not found</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (compact) {
    return (
      <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {getLoanTypeIcon(loanStatus.type)}
              <span className="font-medium text-white">{loanStatus.type}</span>
            </div>
            <Badge className={`${getStatusColor(loanStatus.status)} text-white`}>
              {loanStatus.status.replace("-", " ").toUpperCase()}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-300">Progress</span>
              <span className="text-blue-300">{loanStatus.progress}%</span>
            </div>
            <Progress value={loanStatus.progress} className="h-2" />
            <p className="text-xs text-blue-200">Current: {loanStatus.currentStep}</p>
          </div>
          {loanStatus.canProceed && (
            <Button
              onClick={handleNextStep}
              disabled={isProcessing}
              size="sm"
              className="w-full mt-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              {isProcessing ? (
                <RefreshCw className="h-3 w-3 mr-2 animate-spin" />
              ) : (
                <ArrowRight className="h-3 w-3 mr-2" />
              )}
              Next Step
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getLoanTypeIcon(loanStatus.type)}
            <div>
              <CardTitle className="text-blue-200">{loanStatus.type}</CardTitle>
              <CardDescription className="text-blue-300">
                ${loanStatus.amount.toLocaleString()} • ID: {loanStatus.id}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(loanStatus.status)}
            <Badge className={`${getStatusColor(loanStatus.status)} text-white`}>
              {loanStatus.status.replace("-", " ").toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-200">Application Progress</span>
            <span className="text-sm font-bold text-white">{loanStatus.progress}%</span>
          </div>
          <Progress value={loanStatus.progress} className="h-3" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-300">Current: {loanStatus.currentStep}</span>
            <span className="text-blue-300">Next: {loanStatus.nextStep}</span>
          </div>
        </div>

        {/* Status Information */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-blue-800/20 rounded-lg">
          <div>
            <p className="text-xs text-blue-300">Estimated Completion</p>
            <p className="font-medium text-white">{loanStatus.estimatedCompletion}</p>
          </div>
          <div>
            <p className="text-xs text-blue-300">Last Updated</p>
            <p className="font-medium text-white">{loanStatus.lastUpdated}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {loanStatus.canProceed && (
            <Button
              onClick={handleNextStep}
              disabled={isProcessing}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              {isProcessing ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4 mr-2" />
              )}
              Proceed to {loanStatus.nextStep}
            </Button>
          )}
          <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
          >
            <Bell className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-blue-500/20">
          <span className="text-sm text-blue-300">Quick Actions:</span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
            >
              Upload Documents
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
            >
              Contact Officer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
