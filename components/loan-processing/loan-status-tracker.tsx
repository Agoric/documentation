"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  CreditCard,
  DollarSign,
  Home,
  Users,
  Shield,
  Eye,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  Building2,
  Star,
  TrendingUp,
  Award,
} from "lucide-react"

interface LoanStatusTrackerProps {
  applicationId: string
  currentStep?: number
  loanType?: "fha" | "va" | "usda" | "sba"
}

export function LoanStatusTracker({ applicationId, currentStep = 3, loanType = "fha" }: LoanStatusTrackerProps) {
  const [activeStep, setActiveStep] = useState(currentStep)

  const loanSteps = [
    {
      id: 1,
      title: "Application Submitted",
      description: "Your loan application has been received",
      status: "completed",
      date: "2024-01-20",
      icon: FileText,
      details: "Application submitted successfully with all required information.",
      estimatedDays: 0,
    },
    {
      id: 2,
      title: "Initial Review",
      description: "Basic eligibility and completeness check",
      status: "completed",
      date: "2024-01-21",
      icon: Eye,
      details: "Initial review completed. Application meets basic requirements.",
      estimatedDays: 1,
    },
    {
      id: 3,
      title: "Document Verification",
      description: "Verifying submitted documents",
      status: "current",
      date: "2024-01-22",
      icon: Shield,
      details: "Currently verifying income documents and identification.",
      estimatedDays: 3,
      requirements: [
        "Pay stubs (last 2 months)",
        "Tax returns (2 years)",
        "Bank statements (3 months)",
        "ID verification",
      ],
    },
    {
      id: 4,
      title: "Credit Check & Analysis",
      description: "Reviewing credit history and score",
      status: "pending",
      date: null,
      icon: CreditCard,
      details: "Credit check will be performed once documents are verified.",
      estimatedDays: 2,
    },
    {
      id: 5,
      title: "Income & Employment Verification",
      description: "Confirming employment and income",
      status: "pending",
      date: null,
      icon: DollarSign,
      details: "Employment verification with current employer.",
      estimatedDays: 3,
    },
    {
      id: 6,
      title: "Property Appraisal",
      description: "Professional property valuation",
      status: "pending",
      date: null,
      icon: Home,
      details: "Third-party appraisal to determine property value.",
      estimatedDays: 5,
    },
    {
      id: 7,
      title: "Underwriting Review",
      description: "Comprehensive loan analysis",
      status: "pending",
      date: null,
      icon: Users,
      details: "Detailed review by underwriting team.",
      estimatedDays: 7,
    },
    {
      id: 8,
      title: "Government Review",
      description: `${loanType.toUpperCase()} program compliance check`,
      status: "pending",
      date: null,
      icon: Building2,
      details: `Government review for ${loanType.toUpperCase()} loan compliance.`,
      estimatedDays: 5,
    },
    {
      id: 9,
      title: "Final Approval",
      description: "Loan approval decision",
      status: "pending",
      date: null,
      icon: CheckCircle,
      details: "Final approval and loan terms confirmation.",
      estimatedDays: 2,
    },
    {
      id: 10,
      title: "Closing Preparation",
      description: "Preparing closing documents",
      status: "pending",
      date: null,
      icon: FileText,
      details: "Preparation of all closing documentation.",
      estimatedDays: 3,
    },
    {
      id: 11,
      title: "Funding & Disbursement",
      description: "Loan funds disbursed",
      status: "pending",
      date: null,
      icon: DollarSign,
      details: "Final step - loan funds transferred to escrow.",
      estimatedDays: 1,
    },
  ]

  const getStepStatus = (step: any) => {
    if (step.id < activeStep) return "completed"
    if (step.id === activeStep) return "current"
    return "pending"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "current":
        return <Clock className="h-5 w-5 text-blue-400" />
      case "pending":
        return <AlertCircle className="h-5 w-5 text-gray-400" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "current":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "pending":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const handleNextStep = () => {
    if (activeStep < loanSteps.length) {
      setActiveStep(activeStep + 1)
    }
  }

  const progressPercentage = ((activeStep - 1) / (loanSteps.length - 1)) * 100
  const totalEstimatedDays = loanSteps.reduce((sum, step) => sum + step.estimatedDays, 0)
  const completedDays = loanSteps.slice(0, activeStep - 1).reduce((sum, step) => sum + step.estimatedDays, 0)

  const loanTypeInfo = {
    fha: {
      name: "FHA Loan",
      color: "from-blue-500 to-cyan-500",
      benefits: ["Low down payment", "Flexible credit", "Government backing"],
    },
    va: {
      name: "VA Loan",
      color: "from-green-500 to-emerald-500",
      benefits: ["No down payment", "No PMI", "Military exclusive"],
    },
    usda: {
      name: "USDA Loan",
      color: "from-orange-500 to-red-500",
      benefits: ["No down payment", "Rural areas", "Below-market rates"],
    },
    sba: {
      name: "SBA Loan",
      color: "from-purple-500 to-pink-500",
      benefits: ["Government guarantee", "Long terms", "Business focused"],
    },
  }

  const currentLoanType = loanTypeInfo[loanType]

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className={`bg-gradient-to-br ${currentLoanType.color} backdrop-blur-sm border-blue-500/20`}>
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Building2 className="h-5 w-5 text-white" />
            {currentLoanType.name} Application Progress
          </CardTitle>
          <CardDescription className="text-blue-100">Application ID: {applicationId}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-blue-100">Overall Progress</span>
            <span className="text-white font-medium">{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex justify-between text-xs text-blue-100">
            <span>
              Step {activeStep} of {loanSteps.length}
            </span>
            <span>Estimated completion: {totalEstimatedDays - completedDays} days remaining</span>
          </div>
          <div className="flex gap-2">
            {currentLoanType.benefits.map((benefit, index) => (
              <Badge key={index} variant="outline" className="text-xs border-white/30 text-white bg-white/10">
                {benefit}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="timeline" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-blue-900/30 backdrop-blur-sm">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="current">Current Step</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          {loanSteps.map((step, index) => {
            const status = getStepStatus(step)
            const StepIcon = step.icon

            return (
              <Card
                key={step.id}
                className={`bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20 transition-all duration-300 ${
                  status === "current" ? "border-blue-400/60 shadow-lg" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`p-3 rounded-full ${
                          status === "completed"
                            ? "bg-green-500/20 border-2 border-green-500/50"
                            : status === "current"
                              ? "bg-blue-500/20 border-2 border-blue-500/50"
                              : "bg-gray-500/20 border-2 border-gray-500/50"
                        }`}
                      >
                        <StepIcon
                          className={`h-6 w-6 ${
                            status === "completed"
                              ? "text-green-400"
                              : status === "current"
                                ? "text-blue-400"
                                : "text-gray-400"
                          }`}
                        />
                      </div>
                      {index < loanSteps.length - 1 && (
                        <div
                          className={`w-0.5 h-12 mt-2 ${status === "completed" ? "bg-green-500/50" : "bg-gray-500/30"}`}
                        />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                        <div className="flex items-center gap-2">
                          {step.date && <span className="text-sm text-blue-300">{step.date}</span>}
                          <Badge className={getStatusColor(status)}>
                            {getStatusIcon(status)}
                            <span className="ml-1 capitalize">{status}</span>
                          </Badge>
                        </div>
                      </div>
                      <p className="text-blue-200 mb-3">{step.description}</p>
                      <p className="text-sm text-blue-300 mb-2">{step.details}</p>

                      <div className="flex items-center gap-4 text-sm text-blue-400">
                        <span>
                          Estimated time: {step.estimatedDays} day{step.estimatedDays !== 1 ? "s" : ""}
                        </span>
                        {status === "completed" && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            <span className="text-green-400">Completed</span>
                          </div>
                        )}
                      </div>

                      {step.requirements && status === "current" && (
                        <div className="mt-4 p-3 bg-blue-800/30 rounded-lg border border-blue-500/20">
                          <h4 className="text-sm font-medium text-white mb-2">Required Documents:</h4>
                          <ul className="space-y-1">
                            {step.requirements.map((req, reqIndex) => (
                              <li key={reqIndex} className="text-sm text-blue-200 flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-400" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {status === "current" && (
                        <Button
                          className="mt-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                          onClick={handleNextStep}
                        >
                          <ArrowRight className="h-4 w-4 mr-2" />
                          Proceed to Next Step
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="current" className="space-y-6">
          {(() => {
            const currentStepData = loanSteps.find((step) => step.id === activeStep)
            if (!currentStepData) return null

            return (
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <currentStepData.icon className="h-5 w-5 text-blue-400" />
                    {currentStepData.title}
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Current step in your {currentLoanType.name} application process
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-white">{currentStepData.description}</p>
                  <p className="text-blue-200">{currentStepData.details}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20 text-center">
                      <Clock className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                      <div className="text-sm text-blue-300">Estimated Time</div>
                      <div className="text-lg font-semibold text-white">{currentStepData.estimatedDays} days</div>
                    </div>
                    <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20 text-center">
                      <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
                      <div className="text-sm text-blue-300">Progress</div>
                      <div className="text-lg font-semibold text-white">{Math.round(progressPercentage)}%</div>
                    </div>
                    <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20 text-center">
                      <Star className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                      <div className="text-sm text-blue-300">Priority</div>
                      <div className="text-lg font-semibold text-white">High</div>
                    </div>
                  </div>

                  {currentStepData.requirements && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-white">What we need from you:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentStepData.requirements.map((req, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 bg-blue-800/30 rounded border border-blue-500/20"
                          >
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-sm text-blue-200">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                      onClick={handleNextStep}
                    >
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Complete This Step
                    </Button>
                    <Button variant="outline" className="border-blue-500/30 text-blue-300 bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      Upload Documents
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })()}
        </TabsContent>

        <TabsContent value="communication" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  Your Loan Officer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Sarah Johnson</h4>
                    <p className="text-sm text-blue-200">Senior {currentLoanType.name} Specialist</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3 w-3 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-xs text-blue-300 ml-1">5.0 rating</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-blue-500/30 text-blue-300 bg-transparent"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    (555) 123-4567
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-blue-500/30 text-blue-300 bg-transparent"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    sarah.johnson@snapifibank.com
                  </Button>
                </div>
                <div className="bg-green-800/30 p-3 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">Government Loan Expert</span>
                  </div>
                  <p className="text-xs text-green-300">
                    Specialized in {currentLoanType.name} applications with 98% approval rate
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  Important Dates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Application Date:</span>
                  <span className="text-white font-medium">Jan 20, 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Expected Approval:</span>
                  <span className="text-white font-medium">Feb 15, 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Estimated Closing:</span>
                  <span className="text-white font-medium">Mar 1, 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Rate Lock Expires:</span>
                  <span className="text-white font-medium">Mar 20, 2024</span>
                </div>
                <div className="bg-blue-800/30 p-3 rounded-lg border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">Government Processing</span>
                  </div>
                  <p className="text-xs text-blue-300">
                    {currentLoanType.name} applications include additional government review time
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-400" />
                Recent Messages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  date: "Jan 22, 2024",
                  from: "Sarah Johnson",
                  subject: "Document Verification Update",
                  preview:
                    "We've received your income documents and are currently reviewing them for your FHA loan application...",
                  priority: "high",
                },
                {
                  date: "Jan 21, 2024",
                  from: "Government Processing Team",
                  subject: `${currentLoanType.name} Application Status Update`,
                  preview: "Your application has passed initial review and moved to document verification stage...",
                  priority: "normal",
                },
                {
                  date: "Jan 20, 2024",
                  from: "System",
                  subject: "Application Received",
                  preview:
                    "Thank you for submitting your government-backed loan application. Your application ID is...",
                  priority: "normal",
                },
              ].map((message, index) => (
                <div key={index} className="p-3 bg-blue-800/30 rounded-lg border border-blue-500/20">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-white flex items-center gap-2">
                      {message.subject}
                      {message.priority === "high" && (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">High Priority</Badge>
                      )}
                    </h4>
                    <span className="text-xs text-blue-300">{message.date}</span>
                  </div>
                  <p className="text-sm text-blue-200 mb-1">From: {message.from}</p>
                  <p className="text-sm text-blue-300">{message.preview}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-400" />
                Application Milestones
              </CardTitle>
              <CardDescription className="text-blue-200">
                Key achievements in your {currentLoanType.name} application journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Application Submitted",
                    description: "Successfully submitted complete application",
                    achieved: true,
                    date: "Jan 20, 2024",
                    icon: FileText,
                  },
                  {
                    title: "Documents Uploaded",
                    description: "All required documents provided",
                    achieved: true,
                    date: "Jan 21, 2024",
                    icon: Shield,
                  },
                  {
                    title: "Credit Check Passed",
                    description: "Credit requirements met",
                    achieved: false,
                    date: "Pending",
                    icon: CreditCard,
                  },
                  {
                    title: "Government Approval",
                    description: `${currentLoanType.name} program approval received`,
                    achieved: false,
                    date: "Pending",
                    icon: Building2,
                  },
                  {
                    title: "Underwriting Complete",
                    description: "Loan underwriting process finished",
                    achieved: false,
                    date: "Pending",
                    icon: Users,
                  },
                  {
                    title: "Ready to Close",
                    description: "All conditions met, ready for closing",
                    achieved: false,
                    date: "Pending",
                    icon: CheckCircle,
                  },
                ].map((milestone, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      milestone.achieved ? "bg-green-500/10 border-green-500/30" : "bg-blue-800/30 border-blue-500/20"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-full ${milestone.achieved ? "bg-green-500/20" : "bg-gray-500/20"}`}>
                        <milestone.icon
                          className={`h-4 w-4 ${milestone.achieved ? "text-green-400" : "text-gray-400"}`}
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{milestone.title}</h4>
                        <p className="text-sm text-blue-300">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-blue-400">{milestone.date}</span>
                      {milestone.achieved && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Completed</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
