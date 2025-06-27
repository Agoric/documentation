"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  FileText,
  AlertCircle,
  Download,
  Upload,
  Eye,
  Phone,
  Mail,
  User,
  RefreshCw,
  ArrowRight,
  MessageSquare,
} from "lucide-react"

interface ApplicationDetail {
  id: string
  type: string
  amount: number
  status: "draft" | "submitted" | "under-review" | "approved" | "funded" | "rejected"
  progress: number
  submittedDate: string
  expectedDecision: string
  currentStep: string
  nextStep: string
  lender: string
  interestRate?: number
  term?: number
  monthlyPayment?: number
  applicant: {
    name: string
    email: string
    phone: string
    income: number
    employment: string
    creditScore: number
  }
  timeline: TimelineEvent[]
  documents: Document[]
  communications: Communication[]
}

interface TimelineEvent {
  id: string
  title: string
  description: string
  date: string
  status: "completed" | "current" | "pending"
  type: "milestone" | "document" | "communication" | "decision"
}

interface Document {
  id: string
  name: string
  type: string
  status: "pending" | "uploaded" | "verified" | "rejected"
  uploadDate?: string
  size?: string
  url?: string
}

interface Communication {
  id: string
  from: string
  to: string
  subject: string
  message: string
  date: string
  type: "email" | "call" | "note"
  status: "unread" | "read"
}

export default function LoanApplicationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [application, setApplication] = useState<ApplicationDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch application details
    const fetchApplication = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data - in real app, this would come from API
      const mockApplication: ApplicationDetail = {
        id: params.id as string,
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
        monthlyPayment: 2925,
        applicant: {
          name: "Alex Johnson",
          email: "alex.johnson@email.com",
          phone: "(555) 123-4567",
          income: 125000,
          employment: "Software Engineer",
          creditScore: 785,
        },
        timeline: [
          {
            id: "t1",
            title: "Application Submitted",
            description: "Initial loan application received and processed",
            date: "2024-01-15",
            status: "completed",
            type: "milestone",
          },
          {
            id: "t2",
            title: "Document Review",
            description: "All required documents reviewed and verified",
            date: "2024-01-18",
            status: "completed",
            type: "document",
          },
          {
            id: "t3",
            title: "Credit Verification",
            description: "Credit score and history verification in progress",
            date: "2024-01-22",
            status: "current",
            type: "milestone",
          },
          {
            id: "t4",
            title: "Property Appraisal",
            description: "Professional property appraisal scheduled",
            date: "2024-01-28",
            status: "pending",
            type: "milestone",
          },
          {
            id: "t5",
            title: "Final Approval",
            description: "Final underwriting and approval decision",
            date: "2024-02-01",
            status: "pending",
            type: "decision",
          },
        ],
        documents: [
          {
            id: "d1",
            name: "Income Verification (W2)",
            type: "PDF",
            status: "verified",
            uploadDate: "2024-01-15",
            size: "2.4 MB",
            url: "/documents/w2-2023.pdf",
          },
          {
            id: "d2",
            name: "Bank Statements (3 months)",
            type: "PDF",
            status: "verified",
            uploadDate: "2024-01-16",
            size: "1.8 MB",
            url: "/documents/bank-statements.pdf",
          },
          {
            id: "d3",
            name: "Property Purchase Agreement",
            type: "PDF",
            status: "uploaded",
            uploadDate: "2024-01-20",
            size: "3.2 MB",
            url: "/documents/purchase-agreement.pdf",
          },
          {
            id: "d4",
            name: "Property Insurance Quote",
            type: "PDF",
            status: "pending",
            size: "0 MB",
          },
          {
            id: "d5",
            name: "Property Appraisal Report",
            type: "PDF",
            status: "pending",
            size: "0 MB",
          },
        ],
        communications: [
          {
            id: "c1",
            from: "Sarah Mitchell (Loan Officer)",
            to: "Alex Johnson",
            subject: "Additional Documentation Required",
            message:
              "Hi Alex, we need the property insurance quote to proceed with your application. Please upload it at your earliest convenience.",
            date: "2024-01-20",
            type: "email",
            status: "read",
          },
          {
            id: "c2",
            from: "Snapifi Lending",
            to: "Alex Johnson",
            subject: "Credit Verification Complete",
            message:
              "Great news! Your credit verification has been completed successfully. We're now moving to the property appraisal stage.",
            date: "2024-01-22",
            type: "email",
            status: "unread",
          },
        ],
      }

      setApplication(mockApplication)
      setIsLoading(false)
    }

    fetchApplication()
  }, [params.id])

  const handleNextStep = async () => {
    if (!application) return

    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update application progress
    setApplication((prev) => {
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
      }

      return {
        ...prev,
        progress: newProgress,
        status: newStatus,
        currentStep: newCurrentStep,
        nextStep: newNextStep,
      }
    })

    setIsProcessing(false)
  }

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

  const getTimelineStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "current":
        return "bg-blue-500"
      case "pending":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 mx-auto mb-4 text-blue-400 animate-spin" />
          <p className="text-blue-200">Loading application details...</p>
        </div>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-400" />
          <p className="text-red-200">Application not found</p>
          <Button onClick={() => router.back()} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Loan Center
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {application.type} Application
              </h1>
              <p className="text-blue-200">Application ID: {application.id}</p>
            </div>
          </div>
          <Badge className={`${getStatusColor(application.status)} text-white text-lg px-4 py-2`}>
            {application.status.replace("-", " ").toUpperCase()}
          </Badge>
        </div>

        {/* Progress Overview */}
        <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-blue-200">Application Progress</span>
                <span className="text-lg font-bold text-white">{application.progress}%</span>
              </div>
              <Progress value={application.progress} className="h-3" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-300">Current: {application.currentStep}</span>
                <span className="text-blue-300">Next: {application.nextStep}</span>
              </div>
              {application.status !== "funded" && (
                <Button
                  onClick={handleNextStep}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  {isProcessing ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <ArrowRight className="h-4 w-4 mr-2" />
                  )}
                  Proceed to Next Step
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-blue-900/30 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="communications">Messages</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Loan Summary */}
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-blue-200">Loan Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-blue-300">Loan Amount</p>
                      <p className="text-xl font-bold text-white">${application.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-300">Interest Rate</p>
                      <p className="text-xl font-bold text-white">{application.interestRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-300">Term</p>
                      <p className="text-xl font-bold text-white">{application.term} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-300">Monthly Payment</p>
                      <p className="text-xl font-bold text-white">${application.monthlyPayment?.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-blue-500/20">
                    <p className="text-sm text-blue-300">Lender</p>
                    <p className="font-medium text-white">{application.lender}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Applicant Info */}
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-blue-200">Applicant Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-blue-400" />
                      <span className="text-white">{application.applicant.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-blue-400" />
                      <span className="text-white">{application.applicant.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-blue-400" />
                      <span className="text-white">{application.applicant.phone}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-500/20">
                    <div>
                      <p className="text-sm text-blue-300">Annual Income</p>
                      <p className="font-medium text-white">${application.applicant.income.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-300">Credit Score</p>
                      <p className="font-medium text-white">{application.applicant.creditScore}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-200">Application Timeline</CardTitle>
                <CardDescription className="text-blue-300">Track your loan application progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {application.timeline.map((event, index) => (
                    <div key={event.id} className="flex items-start gap-4">
                      <div
                        className={`w-4 h-4 rounded-full ${getTimelineStatusColor(event.status)} mt-1 flex-shrink-0`}
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-white">{event.title}</h4>
                          <span className="text-sm text-blue-300">{event.date}</span>
                        </div>
                        <p className="text-sm text-blue-200">{event.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-200">Required Documents</CardTitle>
                <CardDescription className="text-blue-300">Upload and manage your loan documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {application.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 bg-blue-800/20 rounded-lg">
                      <div className="flex items-center gap-4">
                        <FileText className={`h-6 w-6 ${getDocumentStatusColor(doc.status)}`} />
                        <div>
                          <h4 className="font-medium text-white">{doc.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-blue-300">
                            <span>{doc.type}</span>
                            {doc.size && <span>{doc.size}</span>}
                            {doc.uploadDate && <span>Uploaded: {doc.uploadDate}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`${getDocumentStatusColor(doc.status)} border-current`}>
                          {doc.status}
                        </Badge>
                        {doc.status === "pending" ? (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload
                          </Button>
                        ) : (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-blue-500/30 bg-transparent">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-blue-500/30 bg-transparent">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communications" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-200">Communications</CardTitle>
                <CardDescription className="text-blue-300">Messages and updates from your loan officer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {application.communications.map((comm) => (
                    <div key={comm.id} className="p-4 bg-blue-800/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-blue-400" />
                          <span className="font-medium text-white">{comm.from}</span>
                          {comm.status === "unread" && <Badge className="bg-red-500 text-white text-xs">New</Badge>}
                        </div>
                        <span className="text-sm text-blue-300">{comm.date}</span>
                      </div>
                      <h4 className="font-medium text-blue-200 mb-2">{comm.subject}</h4>
                      <p className="text-sm text-blue-100">{comm.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-200">Application Details</CardTitle>
                <CardDescription className="text-blue-300">Complete loan application information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-blue-200">Loan Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-blue-300">Application ID:</span>
                        <span className="text-white">{application.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Loan Type:</span>
                        <span className="text-white">{application.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Submitted Date:</span>
                        <span className="text-white">{application.submittedDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Expected Decision:</span>
                        <span className="text-white">{application.expectedDecision}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-blue-200">Employment Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-blue-300">Occupation:</span>
                        <span className="text-white">{application.applicant.employment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Annual Income:</span>
                        <span className="text-white">${application.applicant.income.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Credit Score:</span>
                        <span className="text-white">{application.applicant.creditScore}</span>
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
