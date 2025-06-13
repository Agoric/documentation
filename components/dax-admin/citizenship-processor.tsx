"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Globe,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  CreditCard,
  Shield,
  DollarSign,
  FileText,
  Mic,
} from "lucide-react"

interface CitizenshipApplication {
  id: string
  applicantName: string
  email: string
  status: "pending" | "processing" | "approved" | "rejected"
  progress: number
  submittedAt: Date
  documents: {
    declaration: boolean
    identification: boolean
    bankAccount: boolean
    socialSecurity: boolean
    payment: boolean
  }
  benefits: {
    socialImpactCredit: number
    imperialBankingCoverage: number
    retailDefaultProtection: number
    monthlyPremium: number
  }
}

const mockApplications: CitizenshipApplication[] = [
  {
    id: "DAX-2024-001",
    applicantName: "Sarah Chen",
    email: "sarah.chen@email.com",
    status: "processing",
    progress: 75,
    submittedAt: new Date("2024-01-15"),
    documents: {
      declaration: true,
      identification: true,
      bankAccount: true,
      socialSecurity: false,
      payment: true,
    },
    benefits: {
      socialImpactCredit: 80000,
      imperialBankingCoverage: 250000,
      retailDefaultProtection: 30000,
      monthlyPremium: 50,
    },
  },
  {
    id: "DAX-2024-002",
    applicantName: "Marcus Rodriguez",
    email: "marcus.r@email.com",
    status: "approved",
    progress: 100,
    submittedAt: new Date("2024-01-10"),
    documents: {
      declaration: true,
      identification: true,
      bankAccount: true,
      socialSecurity: true,
      payment: true,
    },
    benefits: {
      socialImpactCredit: 80000,
      imperialBankingCoverage: 250000,
      retailDefaultProtection: 30000,
      monthlyPremium: 50,
    },
  },
]

const documentRequirements = [
  {
    id: "declaration",
    name: "Recorded Declaration",
    description: "Audio/Video declaration of intent",
    icon: <Mic className="h-4 w-4" />,
    required: true,
  },
  {
    id: "identification",
    name: "Government ID",
    description: "Valid state or federal identification",
    icon: <FileText className="h-4 w-4" />,
    required: true,
  },
  {
    id: "bankAccount",
    name: "Bank Account",
    description: "Active bank account verification",
    icon: <CreditCard className="h-4 w-4" />,
    required: true,
  },
  {
    id: "socialSecurity",
    name: "SSN/Equivalent",
    description: "Social Security Number or equivalent",
    icon: <Shield className="h-4 w-4" />,
    required: true,
  },
  {
    id: "payment",
    name: "Domicile Fee",
    description: "$50 Quantum Domicile Ledger Fee",
    icon: <DollarSign className="h-4 w-4" />,
    required: true,
  },
]

export function CitizenshipProcessor() {
  const [applications, setApplications] = useState<CitizenshipApplication[]>(mockApplications)
  const [selectedApplication, setSelectedApplication] = useState<CitizenshipApplication | null>(null)
  const [activeTab, setActiveTab] = useState("applications")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "processing":
        return <Clock className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "rejected":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleApproveApplication = (applicationId: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === applicationId ? { ...app, status: "approved" as const, progress: 100 } : app)),
    )
  }

  const handleRejectApplication = (applicationId: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === applicationId ? { ...app, status: "rejected" as const } : app)),
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-indigo-500" />
            DAX Citizenship Processing Center
          </CardTitle>
          <CardDescription>
            Process multidimensional entity establishment and Global Digital Citizen ID issuance
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="benefits">Benefits Package</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Applications List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pending Applications</CardTitle>
                <CardDescription>Review and process citizenship applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {applications.map((application) => (
                  <div
                    key={application.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedApplication?.id === application.id
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedApplication(application)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {application.applicantName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{application.applicantName}</p>
                          <p className="text-sm text-muted-foreground">{application.id}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={getStatusColor(application.status)}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1 capitalize">{application.status}</span>
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{application.progress}%</span>
                      </div>
                      <Progress value={application.progress} className="h-2" />
                    </div>

                    <p className="text-xs text-muted-foreground mt-2">
                      Submitted: {application.submittedAt.toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Application Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedApplication ? "Application Details" : "Select Application"}
                </CardTitle>
                <CardDescription>
                  {selectedApplication
                    ? `Review ${selectedApplication.applicantName}'s application`
                    : "Choose an application to view details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedApplication ? (
                  <div className="space-y-6">
                    {/* Applicant Info */}
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="text-lg">
                          {selectedApplication.applicantName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{selectedApplication.applicantName}</h3>
                        <p className="text-sm text-muted-foreground">{selectedApplication.email}</p>
                        <p className="text-sm text-muted-foreground">ID: {selectedApplication.id}</p>
                      </div>
                    </div>

                    {/* Document Status */}
                    <div className="space-y-3">
                      <h4 className="font-medium">Document Verification</h4>
                      {documentRequirements.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {doc.icon}
                            <div>
                              <p className="font-medium text-sm">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">{doc.description}</p>
                            </div>
                          </div>
                          {selectedApplication.documents[doc.id as keyof typeof selectedApplication.documents] ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-amber-500" />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Benefits Summary */}
                    <div className="space-y-3">
                      <h4 className="font-medium">Benefits Package</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm font-medium text-green-800">Social Impact Credit</p>
                          <p className="text-lg font-bold text-green-900">
                            ${selectedApplication.benefits.socialImpactCredit.toLocaleString()}
                          </p>
                        </div>
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm font-medium text-blue-800">Banking Coverage</p>
                          <p className="text-lg font-bold text-blue-900">
                            ${selectedApplication.benefits.imperialBankingCoverage.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    {selectedApplication.status === "processing" && (
                      <div className="flex gap-2 pt-4 border-t">
                        <Button onClick={() => handleApproveApplication(selectedApplication.id)} className="flex-1">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve Application
                        </Button>
                        <Button variant="outline" onClick={() => handleRejectApplication(selectedApplication.id)}>
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Select an application to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Citizenship Requirements</CardTitle>
              <CardDescription>Complete documentation needed for DAX citizenship</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documentRequirements.map((requirement) => (
                  <Card key={requirement.id} className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      {requirement.icon}
                      <div>
                        <h3 className="font-medium">{requirement.name}</h3>
                        {requirement.required && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                            Required
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{requirement.description}</p>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Citizens Benefits Package</CardTitle>
              <CardDescription>Comprehensive coverage and benefits for DAX citizens</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">Social Impact Credit</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">$80,000</p>
                    <p className="text-sm text-green-700">1% interest rate • Imperial Trust backing</p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Imperial Banking Coverage</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">$250,000</p>
                    <p className="text-sm text-blue-700">Full banking protection • Fraud coverage</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="h-5 w-5 text-purple-600" />
                      <span className="font-medium text-purple-800">Retail Default Protection</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-900">$30,000</p>
                    <p className="text-sm text-purple-700">Secure retail transactions • Theft protection</p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-amber-600" />
                      <span className="font-medium text-amber-800">Monthly Premium</span>
                    </div>
                    <p className="text-2xl font-bold text-amber-900">$50</p>
                    <p className="text-sm text-amber-700">Lifetime policy • Comprehensive coverage</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                <h4 className="font-medium text-indigo-800 mb-2">Additional Benefits</h4>
                <ul className="space-y-1 text-sm text-indigo-700">
                  <li>• Global Digital Citizen Identification Card and Number</li>
                  <li>• Social Impact Number (SIN) affecting 25% of Snapp credit rating</li>
                  <li>• Access to Quantum Gains Instrument investment opportunities</li>
                  <li>• Multi-dimensional blockchain identity verification</li>
                  <li>• Imperial Trust Social Impact Fund participation</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
