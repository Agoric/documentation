"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Search,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Upload,
  Download,
  Phone,
  Mail,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function ApplicationStatusPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const applications = [
    {
      id: "BOND-2024-001",
      type: "FHA 50-Year Bond",
      amount: "$450,000",
      status: "Under Review",
      progress: 65,
      submittedDate: "2024-01-15",
      expectedDecision: "2024-02-01",
      bondRate: "3.25%",
      guaranteeTerm: "30 years",
      currentStep: "Income Verification",
      nextAction: "Provide additional pay stubs",
      documents: [
        { name: "Application Form", status: "completed", date: "2024-01-15" },
        { name: "Credit Report", status: "completed", date: "2024-01-16" },
        { name: "Income Verification", status: "pending", date: null },
        { name: "Property Appraisal", status: "not-started", date: null },
      ],
      timeline: [
        { step: "Application Submitted", date: "2024-01-15", completed: true },
        { step: "Initial Review", date: "2024-01-16", completed: true },
        { step: "Credit Check", date: "2024-01-17", completed: true },
        { step: "Income Verification", date: "In Progress", completed: false },
        { step: "Property Appraisal", date: "Pending", completed: false },
        { step: "Final Approval", date: "Pending", completed: false },
      ],
    },
    {
      id: "BOND-2024-002",
      type: "VA 50-Year Bond",
      amount: "$525,000",
      status: "Approved",
      progress: 100,
      submittedDate: "2024-01-10",
      expectedDecision: "2024-01-25",
      bondRate: "3.10%",
      guaranteeTerm: "50 years",
      currentStep: "Closing Preparation",
      nextAction: "Schedule closing appointment",
      documents: [
        { name: "Application Form", status: "completed", date: "2024-01-10" },
        { name: "Military Service Records", status: "completed", date: "2024-01-11" },
        { name: "Income Verification", status: "completed", date: "2024-01-12" },
        { name: "Property Appraisal", status: "completed", date: "2024-01-20" },
      ],
      timeline: [
        { step: "Application Submitted", date: "2024-01-10", completed: true },
        { step: "Initial Review", date: "2024-01-11", completed: true },
        { step: "Military Verification", date: "2024-01-12", completed: true },
        { step: "Income Verification", date: "2024-01-13", completed: true },
        { step: "Property Appraisal", date: "2024-01-20", completed: true },
        { step: "Final Approval", date: "2024-01-25", completed: true },
      ],
    },
    {
      id: "BOND-2024-003",
      type: "USDA 50-Year Rural Bond",
      amount: "$320,000",
      status: "Additional Info Required",
      progress: 35,
      submittedDate: "2024-01-20",
      expectedDecision: "2024-02-10",
      bondRate: "3.00%",
      guaranteeTerm: "35 years",
      currentStep: "Rural Eligibility Verification",
      nextAction: "Provide property location documentation",
      documents: [
        { name: "Application Form", status: "completed", date: "2024-01-20" },
        { name: "Income Documentation", status: "completed", date: "2024-01-21" },
        { name: "Rural Eligibility", status: "pending", date: null },
        { name: "Property Appraisal", status: "not-started", date: null },
      ],
      timeline: [
        { step: "Application Submitted", date: "2024-01-20", completed: true },
        { step: "Initial Review", date: "2024-01-21", completed: true },
        { step: "Income Verification", date: "2024-01-22", completed: true },
        { step: "Rural Eligibility Check", date: "In Progress", completed: false },
        { step: "Property Appraisal", date: "Pending", completed: false },
        { step: "Final Approval", date: "Pending", completed: false },
      ],
    },
  ]

  const filteredApplications = applications.filter(
    (app) =>
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Under Review":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Additional Info Required":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Denied":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-400" />
      case "not-started":
        return <AlertCircle className="h-4 w-4 text-gray-400" />
      default:
        return <FileText className="h-4 w-4 text-blue-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-blue-500/30 text-blue-300 bg-transparent hover:bg-blue-500/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Loan Center
          </Button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Bond Application Status
            </h1>
            <p className="text-blue-200 mt-2">Track your 50-year government bond applications</p>
          </div>
        </div>

        {/* Search */}
        <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
              <Input
                placeholder="Search by application ID, bond type, or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-blue-800/30 border-blue-500/30 text-white placeholder-blue-300"
              />
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-6">
          {filteredApplications.map((application) => (
            <Card
              key={application.id}
              className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">{application.type}</CardTitle>
                    <CardDescription className="text-blue-200">Application ID: {application.id}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{application.amount}</div>
                    <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4 bg-blue-800/30">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium text-white">Bond Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-blue-300">Bond Rate:</span>
                            <span className="text-white">{application.bondRate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-300">Guarantee Term:</span>
                            <span className="text-white">{application.guaranteeTerm}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-300">Submitted:</span>
                            <span className="text-white">{application.submittedDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-300">Expected Decision:</span>
                            <span className="text-white">{application.expectedDecision}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium text-white">Current Status</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-blue-300">Progress</span>
                              <span className="text-white font-medium">{application.progress}%</span>
                            </div>
                            <Progress value={application.progress} className="w-full" />
                          </div>
                          <div className="bg-blue-800/30 p-3 rounded-lg">
                            <div className="text-sm text-blue-300 mb-1">Current Step:</div>
                            <div className="text-white font-medium">{application.currentStep}</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium text-white">Next Action</h4>
                        <div className="bg-yellow-800/30 p-3 rounded-lg border border-yellow-500/20">
                          <div className="text-sm text-yellow-300 mb-2">Action Required:</div>
                          <div className="text-white text-sm">{application.nextAction}</div>
                          <Button size="sm" className="mt-3 bg-gradient-to-r from-yellow-500 to-orange-500">
                            Take Action
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="timeline" className="space-y-4">
                    <h4 className="font-medium text-white">Application Timeline</h4>
                    <div className="space-y-4">
                      {application.timeline.map((step, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              step.completed ? "bg-green-500" : "bg-gray-500"
                            }`}
                          >
                            {step.completed ? (
                              <CheckCircle className="h-4 w-4 text-white" />
                            ) : (
                              <Clock className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-medium">{step.step}</div>
                            <div className="text-blue-300 text-sm">{step.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="documents" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-white">Required Documents</h4>
                      <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-600">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Document
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {application.documents.map((doc, index) => (
                        <div key={index} className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getDocumentStatusIcon(doc.status)}
                              <span className="text-white font-medium">{doc.name}</span>
                            </div>
                            {doc.status === "completed" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-blue-500/30 text-blue-300 bg-transparent"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div className="text-sm text-blue-300">
                            {doc.status === "completed" && doc.date && `Submitted: ${doc.date}`}
                            {doc.status === "pending" && "Awaiting submission"}
                            {doc.status === "not-started" && "Not yet required"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="contact" className="space-y-4">
                    <h4 className="font-medium text-white">Contact Your Bond Specialist</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-blue-800/30 border-blue-500/30">
                        <CardContent className="p-6 space-y-4">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Phone className="h-8 w-8 text-white" />
                            </div>
                            <h5 className="font-medium text-white">Call Direct</h5>
                            <p className="text-blue-300 text-sm">Speak with your dedicated bond specialist</p>
                          </div>
                          <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600">
                            Call (800) BOND-HELP
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="bg-blue-800/30 border-blue-500/30">
                        <CardContent className="p-6 space-y-4">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Mail className="h-8 w-8 text-white" />
                            </div>
                            <h5 className="font-medium text-white">Email Support</h5>
                            <p className="text-blue-300 text-sm">Get detailed responses to your questions</p>
                          </div>
                          <Button
                            variant="outline"
                            className="w-full border-green-500/30 text-green-300 bg-transparent hover:bg-green-500/20"
                          >
                            Send Email
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="bg-purple-800/30 p-4 rounded-lg border border-purple-500/20">
                      <h5 className="font-medium text-white mb-2">Application Reference</h5>
                      <p className="text-purple-200 text-sm mb-3">
                        When contacting support, please reference your application ID: <strong>{application.id}</strong>
                      </p>
                      <div className="text-xs text-purple-300">
                        Bond specialists are available Monday-Friday 8AM-8PM EST
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Applications Found</h3>
              <p className="text-blue-200 mb-6">
                {searchTerm
                  ? "No applications match your search criteria"
                  : "You haven't submitted any bond applications yet"}
              </p>
              <Button
                className="bg-gradient-to-r from-blue-500 to-cyan-600"
                onClick={() => router.push("/citizen/loan-center")}
              >
                Apply for 50-Year Bond
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
