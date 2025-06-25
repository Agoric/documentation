"use client"
import { useState, useEffect } from "react"
import {
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Home,
  TrendingUp,
  Calendar,
  Download,
  Upload,
  Phone,
  Mail,
  User,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoyalDiamondSlabCard } from "@/components/ui/royal-diamond-slab-card"

interface LoanApplication {
  id: string
  status: "pending" | "approved" | "in_review" | "funded" | "closed"
  loanAmount: number
  interestRate: number
  monthlyPayment: number
  propertyAddress: string
  applicationDate: Date
  expectedClosingDate: Date
  currentStep: string
  progress: number
}

interface WorkflowStep {
  name: string
  status: "completed" | "in_progress" | "pending" | "blocked"
  completedDate?: Date
  estimatedDays: number
  description: string
}

export default function LoanDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [applications, setApplications] = useState<LoanApplication[]>([])
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([])

  // Mock data - in real app, this would come from API
  useEffect(() => {
    setApplications([
      {
        id: "APP-2024-001",
        status: "in_review",
        loanAmount: 450000,
        interestRate: 3.25,
        monthlyPayment: 1680,
        propertyAddress: "123 Main St, Austin, TX 78701",
        applicationDate: new Date("2024-01-15"),
        expectedClosingDate: new Date("2024-03-15"),
        currentStep: "Property Appraisal",
        progress: 65,
      },
    ])

    setWorkflowSteps([
      {
        name: "Application Submitted",
        status: "completed",
        completedDate: new Date("2024-01-15"),
        estimatedDays: 0,
        description: "Initial application received and processed",
      },
      {
        name: "Document Collection",
        status: "completed",
        completedDate: new Date("2024-01-18"),
        estimatedDays: 3,
        description: "Required documents uploaded and verified",
      },
      {
        name: "Income Verification",
        status: "completed",
        completedDate: new Date("2024-01-22"),
        estimatedDays: 5,
        description: "Employment and income verification completed",
      },
      {
        name: "Property Appraisal",
        status: "in_progress",
        estimatedDays: 7,
        description: "Professional property appraisal in progress",
      },
      {
        name: "Title Search",
        status: "pending",
        estimatedDays: 3,
        description: "Title company conducting property title search",
      },
      {
        name: "Final Underwriting",
        status: "pending",
        estimatedDays: 5,
        description: "Final loan approval and terms confirmation",
      },
      {
        name: "Investor Funding",
        status: "pending",
        estimatedDays: 2,
        description: "Investor capital allocation and funding",
      },
      {
        name: "Closing Preparation",
        status: "pending",
        estimatedDays: 3,
        description: "Closing documents preparation and scheduling",
      },
    ])
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400"
      case "in_progress":
        return "bg-blue-500/20 text-blue-400"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400"
      case "blocked":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5" />
      case "in_progress":
        return <Clock className="h-5 w-5" />
      case "pending":
        return <Clock className="h-5 w-5" />
      case "blocked":
        return <AlertCircle className="h-5 w-5" />
      default:
        return <Clock className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Loan Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">Track your loan applications and manage your financing</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload Documents
            </Button>
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Contact Advisor
            </Button>
          </div>
        </div>

        {/* Application Overview */}
        {applications.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RoyalDiamondSlabCard
              variant="emerald"
              size="md"
              title="Loan Amount"
              content={`$${applications[0].loanAmount.toLocaleString()}`}
              highlightWords={["Loan"]}
              className="h-32"
            >
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-400" />
                <span className="text-sm text-emerald-400">50-Year Term</span>
              </div>
            </RoyalDiamondSlabCard>

            <RoyalDiamondSlabCard
              variant="sapphire"
              size="md"
              title="Monthly Payment"
              content={`$${applications[0].monthlyPayment.toLocaleString()}`}
              highlightWords={["Monthly"]}
              className="h-32"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                <span className="text-sm text-blue-400">{applications[0].interestRate}% APR</span>
              </div>
            </RoyalDiamondSlabCard>

            <RoyalDiamondSlabCard
              variant="ruby"
              size="md"
              title="Application Status"
              content={applications[0].currentStep}
              highlightWords={["Status"]}
              className="h-32"
            >
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-red-400" />
                <span className="text-sm text-red-400">{applications[0].progress}% Complete</span>
              </div>
            </RoyalDiamondSlabCard>

            <RoyalDiamondSlabCard
              variant="diamond"
              size="md"
              title="Expected Closing"
              content={applications[0].expectedClosingDate.toLocaleDateString()}
              highlightWords={["Closing"]}
              className="h-32"
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-white" />
                <span className="text-sm text-white">
                  {Math.ceil((applications[0].expectedClosingDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                </span>
              </div>
            </RoyalDiamondSlabCard>
          </div>
        )}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-background/50 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Application Details */}
              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Application Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Application ID</span>
                        <span className="font-medium">{app.id}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Property Address</span>
                        <span className="font-medium text-right">{app.propertyAddress}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Application Date</span>
                        <span className="font-medium">{app.applicationDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Current Status</span>
                        <Badge className={getStatusColor(app.status)}>{app.status.replace("_", " ")}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Progress</span>
                          <span className="font-medium">{app.progress}%</span>
                        </div>
                        <Progress value={app.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and next steps</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Additional Documents
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Application Summary
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Schedule Advisor Call
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message to Team
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Property Inspection
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Workflow Tab */}
          <TabsContent value="workflow" className="space-y-6">
            <Card className="bg-background/50 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Loan Processing Workflow</CardTitle>
                <CardDescription>Track the progress of your loan through each stage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {workflowSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                          step.status === "completed"
                            ? "bg-green-500/20 border-green-500 text-green-400"
                            : step.status === "in_progress"
                              ? "bg-blue-500/20 border-blue-500 text-blue-400"
                              : "bg-gray-500/20 border-gray-500 text-gray-400"
                        }`}
                      >
                        {getStatusIcon(step.status)}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{step.name}</h3>
                          <Badge className={getStatusColor(step.status)}>{step.status.replace("_", " ")}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          {step.completedDate ? (
                            <span>Completed: {step.completedDate.toLocaleDateString()}</span>
                          ) : (
                            <span>Estimated: {step.estimatedDays} days</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card className="bg-background/50 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
                <CardDescription>Upload and manage your loan documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Government-issued ID", status: "completed", required: true },
                    { name: "Social Security Card", status: "completed", required: true },
                    { name: "Pay Stubs (Last 2 months)", status: "completed", required: true },
                    { name: "Tax Returns (Last 2 years)", status: "completed", required: true },
                    { name: "Bank Statements (Last 3 months)", status: "pending", required: true },
                    { name: "Property Appraisal", status: "in_progress", required: true },
                    { name: "Purchase Agreement", status: "completed", required: true },
                    { name: "Insurance Quote", status: "pending", required: false },
                  ].map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-background/30"
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(doc.status)}
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.required ? "Required" : "Optional"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(doc.status)}>{doc.status.replace("_", " ")}</Badge>
                        {doc.status === "pending" && (
                          <Button size="sm" variant="outline">
                            Upload
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Communication Tab */}
          <TabsContent value="communication" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Loan Team */}
              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Your Loan Team</CardTitle>
                  <CardDescription>Contact your dedicated loan professionals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      name: "Sarah Johnson",
                      role: "Loan Advisor",
                      phone: "(555) 123-4567",
                      email: "sarah.johnson@snapifi.com",
                    },
                    {
                      name: "Michael Chen",
                      role: "Underwriter",
                      phone: "(555) 234-5678",
                      email: "michael.chen@snapifi.com",
                    },
                    {
                      name: "Emily Rodriguez",
                      role: "Closing Coordinator",
                      phone: "(555) 345-6789",
                      email: "emily.rodriguez@snapifi.com",
                    },
                  ].map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Messages */}
              <Card className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Recent Messages</CardTitle>
                  <CardDescription>Communication history with your loan team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      from: "Sarah Johnson",
                      message: "Your property appraisal has been scheduled for next Tuesday at 2 PM.",
                      time: "2 hours ago",
                      type: "update",
                    },
                    {
                      from: "Michael Chen",
                      message: "We've received your bank statements. Everything looks good!",
                      time: "1 day ago",
                      type: "confirmation",
                    },
                    {
                      from: "System",
                      message: "Document upload completed: Tax Returns (2022-2023)",
                      time: "2 days ago",
                      type: "system",
                    },
                  ].map((message, index) => (
                    <div key={index} className="p-3 rounded-lg bg-background/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{message.from}</span>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <p className="text-sm">{message.message}</p>
                    </div>
                  ))}
                  <Button className="w-full" variant="outline">
                    View All Messages
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
