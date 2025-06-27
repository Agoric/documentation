"use client"

import { use } from "react"
import { LoanStatusTracker } from "@/components/loan-processing/loan-status-tracker"
import { DocumentUploadManager } from "@/components/loan-processing/document-upload-manager"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Building2, DollarSign, Calendar, Percent, User, Phone, Mail, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"

interface LoanStatusPageProps {
  params: Promise<{
    applicationId: string
  }>
}

export default function LoanStatusPage({ params }: LoanStatusPageProps) {
  const { applicationId } = use(params)
  const router = useRouter()

  // Mock loan application data
  const loanApplication = {
    id: applicationId,
    type: "Home Purchase",
    amount: 450000,
    status: "processing",
    submittedDate: "2024-01-15",
    estimatedCompletion: "2024-02-15",
    lenderInfo: {
      name: "Premier Bank",
      rate: 6.75,
      terms: "30-year fixed",
      loanOfficer: "Sarah Johnson",
      phone: "(555) 123-4567",
      email: "sarah.johnson@premierbank.com",
    },
    property: {
      address: "1234 Oak Street, Los Angeles, CA 90210",
      purchasePrice: 500000,
      downPayment: 50000,
      loanToValue: 90,
    },
  }

  const handleStepComplete = (stepId: string) => {
    console.log(`Step completed: ${stepId}`)
    // Handle step completion logic here
  }

  const handleDocumentStatusChange = (documentId: string, status: string) => {
    console.log(`Document ${documentId} status changed to: ${status}`)
    // Handle document status change logic here
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
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
                <Building2 className="h-10 w-10 text-blue-400" />
                Loan Application Status
              </h1>
              <p className="text-xl text-blue-200 mt-2">
                Track your {loanApplication.type.toLowerCase()} application progress
              </p>
            </div>
          </div>
        </div>

        {/* Application Summary */}
        <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-blue-200">Application Summary</CardTitle>
            <CardDescription className="text-blue-300">Application ID: {applicationId}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-400" />
                  <span className="text-blue-200">Loan Amount</span>
                </div>
                <p className="text-2xl font-bold text-white">${loanApplication.amount.toLocaleString()}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-200">Interest Rate</span>
                </div>
                <p className="text-2xl font-bold text-white">{loanApplication.lenderInfo.rate}%</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-purple-400" />
                  <span className="text-blue-200">Loan Terms</span>
                </div>
                <p className="text-2xl font-bold text-white">{loanApplication.lenderInfo.terms}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-orange-400" />
                  <span className="text-blue-200">Lender</span>
                </div>
                <p className="text-lg font-bold text-white">{loanApplication.lenderInfo.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="status" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-blue-900/30 backdrop-blur-sm">
            <TabsTrigger value="status">Status Tracking</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="property">Property Details</TabsTrigger>
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
          </TabsList>

          {/* Status Tracking */}
          <TabsContent value="status">
            <LoanStatusTracker applicationId={applicationId} onStepComplete={handleStepComplete} />
          </TabsContent>

          {/* Documents */}
          <TabsContent value="documents">
            <DocumentUploadManager applicationId={applicationId} onDocumentStatusChange={handleDocumentStatusChange} />
          </TabsContent>

          {/* Property Details */}
          <TabsContent value="property" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-200">Property Information</CardTitle>
                <CardDescription className="text-blue-300">Details about the property being financed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-blue-200">Property Address</label>
                      <p className="text-white font-medium">{loanApplication.property.address}</p>
                    </div>

                    <div>
                      <label className="text-blue-200">Purchase Price</label>
                      <p className="text-white font-medium">
                        ${loanApplication.property.purchasePrice.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <label className="text-blue-200">Down Payment</label>
                      <p className="text-white font-medium">${loanApplication.property.downPayment.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-blue-200">Loan-to-Value Ratio</label>
                      <p className="text-white font-medium">{loanApplication.property.loanToValue}%</p>
                    </div>

                    <div>
                      <label className="text-blue-200">Property Type</label>
                      <p className="text-white font-medium">Single Family Residence</p>
                    </div>

                    <div>
                      <label className="text-blue-200">Occupancy</label>
                      <p className="text-white font-medium">Primary Residence</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-blue-800/30 to-cyan-800/20 border border-blue-500/20">
                  <h4 className="font-medium text-blue-200 mb-2">Appraisal Status</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Property Appraisal</span>
                    <Badge className="text-yellow-400 bg-yellow-500/20">SCHEDULED</Badge>
                  </div>
                  <p className="text-sm text-blue-300 mt-1">Scheduled for January 30, 2024 at 2:00 PM</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Information */}
          <TabsContent value="contact" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-200">Your Loan Team</CardTitle>
                <CardDescription className="text-blue-300">
                  Contact information for your loan processing team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-gradient-to-br from-blue-800/30 to-cyan-800/20 border border-blue-500/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-white">{loanApplication.lenderInfo.loanOfficer}</h4>
                      <p className="text-sm text-blue-200">Senior Loan Officer</p>
                      <p className="text-sm text-blue-300">{loanApplication.lenderInfo.name}</p>

                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-white">{loanApplication.lenderInfo.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-blue-400" />
                          <span className="text-sm text-white">{loanApplication.lenderInfo.email}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          Call Now
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          Send Email
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
                        >
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-purple-800/30 to-violet-800/20 border border-purple-500/20">
                    <h4 className="font-medium text-purple-200 mb-2">Processing Team</h4>
                    <p className="text-sm text-purple-300">
                      Your application is being handled by our specialized processing team.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 bg-transparent"
                    >
                      Contact Processing
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-br from-orange-800/30 to-amber-800/20 border border-orange-500/20">
                    <h4 className="font-medium text-orange-200 mb-2">Customer Support</h4>
                    <p className="text-sm text-orange-300">24/7 support available for any questions or concerns.</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 border-orange-500/30 text-orange-300 hover:bg-orange-500/20 bg-transparent"
                    >
                      Get Support
                    </Button>
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
