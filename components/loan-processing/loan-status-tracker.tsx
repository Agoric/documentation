"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertCircle, FileText, RefreshCw, ArrowRight, Calendar } from "lucide-react"

interface LoanStep {
  id: string
  title: string
  description: string
  status: "completed" | "current" | "pending" | "blocked"
  estimatedDays: number
  requirements?: string[]
  documents?: string[]
  nextAction?: string
}

interface LoanStatusTrackerProps {
  applicationId: string
  loanType: string
  amount: number
  currentStep: number
  onNextStep?: () => void
}

export function LoanStatusTracker({
  applicationId,
  loanType,
  amount,
  currentStep,
  onNextStep,
}: LoanStatusTrackerProps) {
  const [steps, setSteps] = useState<LoanStep[]>([
    {
      id: "application",
      title: "Application Submitted",
      description: "Your loan application has been received and is being reviewed",
      status: "completed",
      estimatedDays: 1,
      requirements: ["Complete application form", "Basic personal information"],
    },
    {
      id: "initial-review",
      title: "Initial Review",
      description: "Our team is conducting an initial review of your application",
      status: currentStep >= 1 ? "completed" : "pending",
      estimatedDays: 2,
      requirements: ["Application completeness check", "Basic eligibility verification"],
    },
    {
      id: "credit-check",
      title: "Credit Assessment",
      description: "We're reviewing your credit history and score",
      status: currentStep >= 2 ? (currentStep === 2 ? "current" : "completed") : "pending",
      estimatedDays: 1,
      requirements: ["Credit report pull", "Credit score analysis", "Debt-to-income calculation"],
      nextAction: currentStep === 2 ? "Authorize credit check" : undefined,
    },
    {
      id: "income-verification",
      title: "Income Verification",
      description: "Verifying your employment and income details",
      status: currentStep >= 3 ? (currentStep === 3 ? "current" : "completed") : "pending",
      estimatedDays: 3,
      requirements: ["Pay stubs (last 2 months)", "Tax returns (last 2 years)", "Employment verification"],
      documents: ["W-2 forms", "Bank statements", "Employment letter"],
      nextAction: currentStep === 3 ? "Upload income documents" : undefined,
    },
    {
      id: "asset-verification",
      title: "Asset Verification",
      description: "Reviewing your assets and financial reserves",
      status: currentStep >= 4 ? (currentStep === 4 ? "current" : "completed") : "pending",
      estimatedDays: 2,
      requirements: ["Bank statements", "Investment accounts", "Asset documentation"],
      nextAction: currentStep === 4 ? "Provide asset statements" : undefined,
    },
    {
      id: "property-appraisal",
      title: "Property Appraisal",
      description: loanType === "home" ? "Professional appraisal of the property" : "Collateral evaluation",
      status: currentStep >= 5 ? (currentStep === 5 ? "current" : "completed") : "pending",
      estimatedDays: 5,
      requirements:
        loanType === "home"
          ? ["Property inspection", "Market analysis", "Appraisal report"]
          : ["Asset evaluation", "Market value assessment"],
      nextAction: currentStep === 5 ? "Schedule appraisal" : undefined,
    },
    {
      id: "underwriting",
      title: "Underwriting Review",
      description: "Comprehensive review by our underwriting team",
      status: currentStep >= 6 ? (currentStep === 6 ? "current" : "completed") : "pending",
      estimatedDays: 7,
      requirements: ["Complete file review", "Risk assessment", "Final approval decision"],
      nextAction: currentStep === 6 ? "Await underwriter decision" : undefined,
    },
    {
      id: "final-approval",
      title: "Final Approval",
      description: "Your loan has been approved and terms finalized",
      status: currentStep >= 7 ? (currentStep === 7 ? "current" : "completed") : "pending",
      estimatedDays: 1,
      requirements: ["Loan terms confirmation", "Interest rate lock", "Approval letter"],
      nextAction: currentStep === 7 ? "Review loan terms" : undefined,
    },
    {
      id: "closing-preparation",
      title: "Closing Preparation",
      description: "Preparing documents for loan closing",
      status: currentStep >= 8 ? (currentStep === 8 ? "current" : "completed") : "pending",
      estimatedDays: 3,
      requirements: ["Closing documents", "Title work", "Insurance verification"],
      nextAction: currentStep === 8 ? "Schedule closing" : undefined,
    },
    {
      id: "funding",
      title: "Loan Funding",
      description: "Funds are being disbursed",
      status: currentStep >= 9 ? "completed" : "pending",
      estimatedDays: 1,
      requirements: ["Final signatures", "Fund transfer", "Loan activation"],
      nextAction: currentStep === 9 ? "Complete closing" : undefined,
    },
  ])

  const [isProcessing, setIsProcessing] = useState(false)

  const getStepIcon = (step: LoanStep) => {
    switch (step.status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "current":
        return <RefreshCw className="h-5 w-5 text-blue-400 animate-spin" />
      case "blocked":
        return <AlertCircle className="h-5 w-5 text-red-400" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStepColor = (step: LoanStep) => {
    switch (step.status) {
      case "completed":
        return "border-green-500/30 bg-green-500/10"
      case "current":
        return "border-blue-500/30 bg-blue-500/10"
      case "blocked":
        return "border-red-500/30 bg-red-500/10"
      default:
        return "border-gray-500/30 bg-gray-500/10"
    }
  }

  const handleNextStep = async () => {
    if (!onNextStep) return

    setIsProcessing(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    onNextStep()
    setIsProcessing(false)
  }

  const completedSteps = steps.filter((step) => step.status === "completed").length
  const totalSteps = steps.length
  const progressPercentage = (completedSteps / totalSteps) * 100

  const currentStepData = steps.find((step) => step.status === "current")
  const nextStepData = steps.find((step, index) => step.status === "pending" && index === currentStep + 1)

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-black/20 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Loan Processing Status
              </CardTitle>
              <CardDescription>Application ID: {applicationId}</CardDescription>
            </div>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              Step {currentStep + 1} of {totalSteps}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Loan Amount</p>
              <p className="text-lg font-semibold text-green-400">${amount.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Loan Type</p>
              <p className="text-lg font-semibold capitalize">{loanType}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Est. Completion</p>
              <p className="text-lg font-semibold text-blue-400">
                {new Date(Date.now() + (7 - currentStep) * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Step Details */}
      {currentStepData && (
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-blue-400 animate-spin" />
              Current Step: {currentStepData.title}
            </CardTitle>
            <CardDescription>{currentStepData.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentStepData.requirements && (
              <div>
                <h4 className="font-medium mb-2">Requirements:</h4>
                <ul className="space-y-1">
                  {currentStepData.requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {currentStepData.documents && (
              <div>
                <h4 className="font-medium mb-2">Required Documents:</h4>
                <ul className="space-y-1">
                  {currentStepData.documents.map((doc, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <FileText className="h-3 w-3 text-blue-400" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {currentStepData.nextAction && (
              <div className="pt-4 border-t border-white/10">
                <Button
                  onClick={handleNextStep}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ArrowRight className="h-4 w-4 mr-2" />
                      {currentStepData.nextAction}
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* All Steps Timeline */}
      <Card className="bg-black/20 border-white/10">
        <CardHeader>
          <CardTitle>Processing Timeline</CardTitle>
          <CardDescription>Complete overview of your loan processing steps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className={`p-4 rounded-lg border ${getStepColor(step)}`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">{getStepIcon(step)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{step.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          {step.estimatedDays} day{step.estimatedDays !== 1 ? "s" : ""}
                        </Badge>
                        {step.status === "current" && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">In Progress</Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{step.description}</p>

                    {step.requirements && step.status !== "completed" && (
                      <div className="space-y-1">
                        {step.requirements.map((req, reqIndex) => (
                          <div key={reqIndex} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="w-1 h-1 bg-gray-400 rounded-full" />
                            {req}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
