"use client"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoanStatusTracker } from "@/components/loan-processing/loan-status-tracker"
import { DocumentUploadManager } from "@/components/loan-processing/document-upload-manager"
import { ArrowLeft, FileText, Calendar, Building2, Phone, Mail, Download, Share, Bell } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoanStatusPage() {
  const params = useParams()
  const router = useRouter()
  const applicationId = params.applicationId as string

  // Mock loan application data
  const loanApplication = {
    id: applicationId,
    type: "Home Loan",
    amount: "$450,000",
    status: "processing",
    progress: 65,
    lender: "Snapifi Bank",
    appliedDate: "2024-01-20",
    expectedClose: "2024-02-25",
    interestRate: "6.25%",
    term: "30 years",
    loanOfficer: {
      name: "Sarah Johnson",
      title: "Senior Loan Officer",
      phone: "(555) 123-4567",
      email: "sarah.johnson@snapifibank.com",
      photo: "/placeholder-user.jpg",
    },
    property: {
      address: "123 Main Street, Beverly Hills, CA 90210",
      purchasePrice: "$450,000",
      downPayment: "$90,000",
      loanToValue: "80%",
    },
    timeline: {
      applicationDate: "2024-01-20",
      approvalDate: "2024-02-10",
      closingDate: "2024-02-25",
      rateLockExpires: "2024-03-15",
    },
  }

  const handleGoBack = () => {
    router.push("/citizen/loan-center")
  }

  const handleDownloadSummary = () => {
    // Mock download functionality
    const summaryData = {
      applicationId: loanApplication.id,
      loanType: loanApplication.type,
      amount: loanApplication.amount,
      status: loanApplication.status,
      lender: loanApplication.lender,
      interestRate: loanApplication.interestRate,
      term: loanApplication.term,
      exportDate: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(summaryData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `loan-application-${applicationId}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const handleShareApplication = () => {
    if (navigator.share) {
      navigator.share({
        title: `Loan Application ${applicationId}`,
        text: `Check out my loan application status`,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handleGoBack}
              className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Loan Center
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {loanApplication.type} Status
              </h1>
              <p className="text-xl text-blue-200 mt-2">Application ID: {applicationId}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handleDownloadSummary}
              className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Summary
            </Button>
            <Button
              variant="outline"
              onClick={handleShareApplication}
              className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>

        {/* Application Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-400" />
                Application Overview
              </CardTitle>
              <CardDescription className="text-blue-200">Key details about your loan application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-blue-300 text-sm">Loan Amount</span>
                  <div className="font-semibold text-white text-lg">{loanApplication.amount}</div>
                </div>
                <div>
                  <span className="text-blue-300 text-sm">Interest Rate</span>
                  <div className="font-semibold text-white text-lg">{loanApplication.interestRate}</div>
                </div>
                <div>
                  <span className="text-blue-300 text-sm">Loan Term</span>
                  <div className="font-semibold text-white text-lg">{loanApplication.term}</div>
                </div>
                <div>
                  <span className="text-blue-300 text-sm">Lender</span>
                  <div className="font-semibold text-white text-lg">{loanApplication.lender}</div>
                </div>
              </div>

              <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                <h4 className="font-medium text-white mb-3">Property Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-300">Address:</span>
                    <div className="text-white">{loanApplication.property.address}</div>
                  </div>
                  <div>
                    <span className="text-blue-300">Purchase Price:</span>
                    <div className="text-white">{loanApplication.property.purchasePrice}</div>
                  </div>
                  <div>
                    <span className="text-blue-300">Down Payment:</span>
                    <div className="text-white">{loanApplication.property.downPayment}</div>
                  </div>
                  <div>
                    <span className="text-blue-300">Loan-to-Value:</span>
                    <div className="text-white">{loanApplication.property.loanToValue}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-400" />
                Your Loan Officer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{loanApplication.loanOfficer.name}</h4>
                  <p className="text-sm text-blue-200">{loanApplication.loanOfficer.title}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start border-blue-500/30 text-blue-300 bg-transparent"
                  onClick={() => window.open(`tel:${loanApplication.loanOfficer.phone}`)}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {loanApplication.loanOfficer.phone}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-blue-500/30 text-blue-300 bg-transparent"
                  onClick={() => window.open(`mailto:${loanApplication.loanOfficer.email}`)}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  {loanApplication.loanOfficer.email}
                </Button>
              </div>

              <div className="bg-blue-800/30 p-3 rounded-lg border border-blue-500/20">
                <h4 className="font-medium text-white mb-2">Important Dates</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-300">Applied:</span>
                    <span className="text-white">{loanApplication.timeline.applicationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Expected Approval:</span>
                    <span className="text-white">{loanApplication.timeline.approvalDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Closing Date:</span>
                    <span className="text-white">{loanApplication.timeline.closingDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Rate Lock Expires:</span>
                    <span className="text-white">{loanApplication.timeline.rateLockExpires}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="status" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-blue-900/30 backdrop-blur-sm">
            <TabsTrigger value="status">Application Status</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="timeline">Timeline & Updates</TabsTrigger>
          </TabsList>

          <TabsContent value="status">
            <LoanStatusTracker applicationId={applicationId} currentStep={3} />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentUploadManager applicationId={applicationId} />
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  Application Timeline
                </CardTitle>
                <CardDescription className="text-blue-200">Complete history of your loan application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    date: "2024-01-22",
                    time: "2:30 PM",
                    title: "Document Verification Started",
                    description: "Income documents are being reviewed by our verification team",
                    type: "update",
                  },
                  {
                    date: "2024-01-21",
                    time: "11:15 AM",
                    title: "Initial Review Completed",
                    description: "Application passed initial eligibility check",
                    type: "milestone",
                  },
                  {
                    date: "2024-01-20",
                    time: "4:45 PM",
                    title: "Application Submitted",
                    description: "Your loan application was successfully submitted",
                    type: "milestone",
                  },
                  {
                    date: "2024-01-20",
                    time: "3:20 PM",
                    title: "Pre-qualification Completed",
                    description: "You were pre-qualified for a loan amount up to $500,000",
                    type: "update",
                  },
                ].map((event, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-blue-800/30 rounded-lg border border-blue-500/20">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          event.type === "milestone" ? "bg-green-400" : "bg-blue-400"
                        }`}
                      />
                      {index < 3 && <div className="w-0.5 h-8 bg-blue-500/30 mt-2" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-white">{event.title}</h4>
                        <div className="text-sm text-blue-300">
                          {event.date} at {event.time}
                        </div>
                      </div>
                      <p className="text-sm text-blue-200">{event.description}</p>
                      <Badge
                        className={`mt-2 text-xs ${
                          event.type === "milestone"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                        }`}
                      >
                        {event.type === "milestone" ? "Milestone" : "Update"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
