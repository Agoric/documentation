"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertCircle, FileText, ArrowRight, Upload, Phone } from "lucide-react"

interface ProcessingStep {
  id: string
  title: string
  description: string
  status: "completed" | "current" | "pending" | "blocked"
  estimatedTime: string
  requirements?: string[]
  canProceed: boolean
}

interface LoanStatusTrackerProps {
  applicationId: string
  onStepComplete?: (stepId: string) => void
}

export function LoanStatusTracker({ applicationId, onStepComplete }: LoanStatusTrackerProps) {
  const [steps, setSteps] = useState<ProcessingStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [overallProgress, setOverallProgress] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Initialize processing steps
    const processingSteps: ProcessingStep[] = [
      {
        id: "application",
        title: "Application Received",
        description: "Your loan application has been received and is being reviewed",
        status: "completed",
        estimatedTime: "Immediate",
        canProceed: true,
      },
      {
        id: "initial-review",
        title: "Initial Review",
        description: "Basic eligibility and application completeness check",
        status: "completed",
        estimatedTime: "1-2 business days",
        canProceed: true,
      },
      {
        id: "document-collection",
        title: "Document Collection",
        description: "Gathering required documentation for underwriting",
        status: "current",
        estimatedTime: "3-5 business days",
        requirements: [
          "Income verification documents",
          "Bank statements (last 3 months)",
          "Tax returns (last 2 years)",
          "Asset documentation",
        ],
        canProceed: false,
      },
      {
        id: "credit-verification",
        title: "Credit Verification",
        description: "Comprehensive credit check and analysis",
        status: "pending",
        estimatedTime: "1-2 business days",
        canProceed: false,
      },
      {
        id: "income-verification",
        title: "Income Verification",
        description: "Employment and income verification process",
        status: "pending",
        estimatedTime: "2-3 business days",
        canProceed: false,
      },
      {
        id: "appraisal",
        title: "Property Appraisal",
        description: "Professional property valuation (for secured loans)",
        status: "pending",
        estimatedTime: "5-7 business days",
        canProceed: false,
      },
      {
        id: "underwriting",
        title: "Underwriting Review",
        description: "Final loan decision and terms determination",
        status: "pending",
        estimatedTime: "3-5 business days",
        canProceed: false,
      },
      {
        id: "approval",
        title: "Loan Approval",
        description: "Final approval and preparation of loan documents",
        status: "pending",
        estimatedTime: "1-2 business days",
        canProceed: false,
      },
      {
        id: "closing",
        title: "Closing & Funding",
        description: "Document signing and fund disbursement",
        status: "pending",
        estimatedTime: "1 business day",
        canProceed: false,
      },
    ]

    setSteps(processingSteps)

    // Find current step index
    const currentIndex = processingSteps.findIndex((step) => step.status === "current")
    setCurrentStepIndex(currentIndex)

    // Calculate overall progress
    const completedSteps = processingSteps.filter((step) => step.status === "completed").length
    const progress = (completedSteps / processingSteps.length) * 100
    setOverallProgress(progress)
  }, [])

  const handleNextStep = async () => {
    if (currentStepIndex >= steps.length - 1) return

    setLoading(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSteps((prev) => {
      const newSteps = [...prev]

      // Mark current step as completed
      newSteps[currentStepIndex] = {
        ...newSteps[currentStepIndex],
        status: "completed",
        canProceed: true,
      }

      // Move to next step if not at the end
      if (currentStepIndex < newSteps.length - 1) {
        newSteps[currentStepIndex + 1] = {
          ...newSteps[currentStepIndex + 1],
          status: "current",
          canProceed: currentStepIndex + 1 === 2 ? false : true, // Document collection requires manual action
        }
      }

      return newSteps
    })

    setCurrentStepIndex((prev) => prev + 1)
    setOverallProgress((prev) => prev + 100 / steps.length)

    if (onStepComplete) {
      onStepComplete(steps[currentStepIndex].id)
    }

    setLoading(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "current":
        return <Clock className="h-5 w-5 text-blue-400" />
      case "blocked":
        return <AlertCircle className="h-5 w-5 text-red-400" />
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-500/20"
      case "current":
        return "text-blue-400 bg-blue-500/20"
      case "blocked":
        return "text-red-400 bg-red-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  const currentStep = steps[currentStepIndex]

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-blue-200 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Loan Processing Status
          </CardTitle>
          <CardDescription className="text-blue-300">Application ID: {applicationId}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-blue-200">Overall Progress</span>
            <span className="text-blue-300">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-200">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <span className="text-blue-300">Est. completion: {steps[steps.length - 1]?.estimatedTime}</span>
          </div>
        </CardContent>
      </Card>

      {/* Processing Steps */}
      <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-blue-200">Processing Timeline</CardTitle>
          <CardDescription className="text-blue-300">Track each step of your loan application process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`relative p-4 rounded-lg border transition-colors ${
                  step.status === "current"
                    ? "bg-gradient-to-br from-blue-800/50 to-cyan-800/30 border-blue-400/40"
                    : step.status === "completed"
                      ? "bg-gradient-to-br from-green-800/30 to-emerald-800/20 border-green-500/20"
                      : "bg-gradient-to-br from-gray-800/30 to-gray-800/20 border-gray-500/20"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">{getStatusIcon(step.status)}</div>

                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{step.title}</h4>
                      <Badge className={getStatusColor(step.status)}>{step.status.toUpperCase()}</Badge>
                    </div>

                    <p className="text-sm text-blue-200 mb-2">{step.description}</p>

                    {step.estimatedTime && (
                      <p className="text-xs text-blue-300">Estimated time: {step.estimatedTime}</p>
                    )}

                    {step.requirements && step.status === "current" && (
                      <div className="mt-3 p-3 rounded-lg bg-blue-900/30 border border-blue-500/20">
                        <h5 className="text-sm font-medium text-blue-200 mb-2">Required Documents:</h5>
                        <ul className="text-xs text-blue-300 space-y-1">
                          {step.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-center gap-2">
                              <Upload className="h-3 w-3" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Connect steps with line */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute left-6 top-12 w-0.5 h-8 ${
                      step.status === "completed" ? "bg-green-400" : "bg-gray-500"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Step Actions */}
      {currentStep && currentStep.status === "current" && (
        <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-blue-200">Next Steps Required</CardTitle>
            <CardDescription className="text-blue-300">Actions needed to proceed with your application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-800/30 to-amber-800/20 border border-yellow-500/20">
              <h4 className="font-medium text-yellow-200 mb-2">Current Step: {currentStep.title}</h4>
              <p className="text-sm text-yellow-300 mb-3">{currentStep.description}</p>

              {currentStep.canProceed ? (
                <Button
                  onClick={handleNextStep}
                  disabled={loading}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  {loading ? "Processing..." : "Continue to Next Step"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-yellow-200">
                    This step requires manual action. Please complete the requirements above.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Documents
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Support
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
