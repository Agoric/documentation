"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Globe,
  Shield,
  CreditCard,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  User,
  Upload,
  Play,
  Mic,
} from "lucide-react"

interface CitizenApplication {
  id: string
  name: string
  email: string
  status: "pending" | "processing" | "approved" | "rejected"
  submittedAt: Date
  documents: {
    declaration: boolean
    identification: boolean
    bankAccount: boolean
    ssn: boolean
    fee: boolean
  }
  progress: number
  citizenId?: string
  socialImpactNumber?: string
}

export function CitizenshipProcessor() {
  const [applications, setApplications] = useState<CitizenApplication[]>([
    {
      id: "APP-001",
      name: "John Smith",
      email: "john.smith@email.com",
      status: "processing",
      submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      documents: {
        declaration: true,
        identification: true,
        bankAccount: true,
        ssn: true,
        fee: true,
      },
      progress: 85,
    },
    {
      id: "APP-002",
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      status: "pending",
      submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      documents: {
        declaration: true,
        identification: true,
        bankAccount: false,
        ssn: true,
        fee: false,
      },
      progress: 60,
    },
    {
      id: "APP-003",
      name: "David Chen",
      email: "david.chen@email.com",
      status: "approved",
      submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      documents: {
        declaration: true,
        identification: true,
        bankAccount: true,
        ssn: true,
        fee: true,
      },
      progress: 100,
      citizenId: "GDC-2024-001247",
      socialImpactNumber: "SIN-847392847",
    },
  ])

  const [newApplication, setNewApplication] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const handleProcessApplication = (appId: string) => {
    setApplications(
      applications.map((app) =>
        app.id === appId
          ? {
              ...app,
              status: "approved" as const,
              progress: 100,
              citizenId: `GDC-2024-${String(Math.floor(Math.random() * 999999)).padStart(6, "0")}`,
              socialImpactNumber: `SIN-${String(Math.floor(Math.random() * 999999999)).padStart(9, "0")}`,
            }
          : app,
      ),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-50 border-green-200 text-green-800"
      case "processing":
        return "bg-blue-50 border-blue-200 text-blue-800"
      case "pending":
        return "bg-amber-50 border-amber-200 text-amber-800"
      case "rejected":
        return "bg-red-50 border-red-200 text-red-800"
      default:
        return "bg-gray-50 border-gray-200 text-gray-800"
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
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="applications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="new-citizen">New Citizen</TabsTrigger>
          <TabsTrigger value="benefits">Benefits Management</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-6">
          {/* Application Queue */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Citizenship Application Queue
              </CardTitle>
              <CardDescription>Process pending multidimensional entity applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 border rounded-lg bg-gradient-to-r from-white to-gray-50 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{app.name}</h3>
                          <p className="text-sm text-muted-foreground">{app.email}</p>
                          <p className="text-xs text-muted-foreground">Submitted {app.submittedAt.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(app.status)}>
                          {getStatusIcon(app.status)}
                          {app.status.toUpperCase()}
                        </Badge>
                        <span className="text-sm font-medium">{app.id}</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Application Progress</span>
                        <span className="text-sm text-muted-foreground">{app.progress}%</span>
                      </div>
                      <Progress value={app.progress} className="h-2" />
                    </div>

                    {/* Document Checklist */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        {app.documents.declaration ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                        <span className="text-xs">Declaration</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {app.documents.identification ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                        <span className="text-xs">ID</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {app.documents.bankAccount ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                        <span className="text-xs">Bank Account</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {app.documents.ssn ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                        <span className="text-xs">SSN</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {app.documents.fee ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                        <span className="text-xs">$50 Fee</span>
                      </div>
                    </div>

                    {/* Citizen Information (if approved) */}
                    {app.status === "approved" && app.citizenId && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <p className="text-sm font-medium text-green-800">Global Digital Citizen ID</p>
                            <p className="text-lg font-bold text-green-900">{app.citizenId}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-green-800">Social Impact Number</p>
                            <p className="text-lg font-bold text-green-900">{app.socialImpactNumber}</p>
                          </div>
                        </div>
                        <div className="mt-3 p-3 bg-white rounded border">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">Benefits Package Active</span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            <div>
                              <span className="text-green-700">Social Impact Credit:</span>
                              <span className="font-medium"> $80,000</span>
                            </div>
                            <div>
                              <span className="text-green-700">Imperial Banking:</span>
                              <span className="font-medium"> $250,000</span>
                            </div>
                            <div>
                              <span className="text-green-700">Retail Protection:</span>
                              <span className="font-medium"> $30,000</span>
                            </div>
                            <div>
                              <span className="text-green-700">Monthly Premium:</span>
                              <span className="font-medium"> $50</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      {app.status === "pending" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleProcessApplication(app.id)}
                          disabled={!Object.values(app.documents).every(Boolean)}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Process Application
                        </Button>
                      )}
                      {app.status === "processing" && (
                        <Button variant="outline" size="sm" onClick={() => handleProcessApplication(app.id)}>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approve Citizenship
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <FileText className="h-3 w-3 mr-1" />
                        View Documents
                      </Button>
                      {app.status === "approved" && (
                        <Button variant="outline" size="sm">
                          <CreditCard className="h-3 w-3 mr-1" />
                          Issue ID Card
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new-citizen" className="space-y-6">
          {/* New Citizen Registration */}
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" />
                New Multidimensional Entity Registration
              </CardTitle>
              <CardDescription>Begin the citizenship application process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="applicant-name">Full Name</Label>
                  <Input
                    id="applicant-name"
                    placeholder="Enter full legal name"
                    value={newApplication.name}
                    onChange={(e) => setNewApplication({ ...newApplication, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applicant-email">Email Address</Label>
                  <Input
                    id="applicant-email"
                    type="email"
                    placeholder="Enter email address"
                    value={newApplication.email}
                    onChange={(e) => setNewApplication({ ...newApplication, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applicant-phone">Phone Number</Label>
                  <Input
                    id="applicant-phone"
                    placeholder="Enter phone number"
                    value={newApplication.phone}
                    onChange={(e) => setNewApplication({ ...newApplication, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applicant-address">Address</Label>
                  <Input
                    id="applicant-address"
                    placeholder="Enter current address"
                    value={newApplication.address}
                    onChange={(e) => setNewApplication({ ...newApplication, address: e.target.value })}
                  />
                </div>
              </div>

              {/* Document Upload Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Required Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Mic className="h-5 w-5 text-purple-500" />
                      <div>
                        <h4 className="font-medium">Recorded Declaration</h4>
                        <p className="text-sm text-muted-foreground">Audio/Video statement of intent</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Play className="h-3 w-3 mr-1" />
                        Record Declaration
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <Upload className="h-3 w-3 mr-1" />
                        Upload File
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium">Government ID</h4>
                        <p className="text-sm text-muted-foreground">State or Federal identification</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Upload className="h-3 w-3 mr-1" />
                      Upload ID Document
                    </Button>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <CreditCard className="h-5 w-5 text-green-500" />
                      <div>
                        <h4 className="font-medium">Bank Account</h4>
                        <p className="text-sm text-muted-foreground">Active account verification</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Upload className="h-3 w-3 mr-1" />
                      Upload Bank Statement
                    </Button>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="h-5 w-5 text-amber-500" />
                      <div>
                        <h4 className="font-medium">SSN Verification</h4>
                        <p className="text-sm text-muted-foreground">Social Security or equivalent</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Upload className="h-3 w-3 mr-1" />
                      Upload SSN Document
                    </Button>
                  </Card>
                </div>
              </div>

              {/* Fee Payment */}
              <Card className="p-4 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-amber-600" />
                    <div>
                      <h4 className="font-medium text-amber-800">Quantum Domicile Ledger Fee</h4>
                      <p className="text-sm text-amber-700">One-time registration fee</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-amber-900">$50.00</p>
                    <Button size="sm" className="mt-2">
                      Pay Now
                    </Button>
                  </div>
                </div>
              </Card>

              <Button className="w-full" size="lg">
                <Globe className="h-4 w-4 mr-2" />
                Submit Citizenship Application
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-6">
          {/* Benefits Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Citizens Benefits Management
              </CardTitle>
              <CardDescription>Manage Imperial Trust Social Impact Fund benefits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="h-6 w-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-800">Social Impact Credit</h3>
                      <p className="text-sm text-green-700">Extended at citizenship</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Credit Amount:</span>
                      <span className="font-medium">$80,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Interest Rate:</span>
                      <span className="font-medium">1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Active Citizens:</span>
                      <span className="font-medium">12,847</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-blue-800">Imperial Banking</h3>
                      <p className="text-sm text-blue-700">Coverage protection</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Coverage Limit:</span>
                      <span className="font-medium">$250,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Retail Default:</span>
                      <span className="font-medium">$30,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Monthly Premium:</span>
                      <span className="font-medium">$50</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <CreditCard className="h-6 w-6 text-purple-600" />
                    <div>
                      <h3 className="font-semibold text-purple-800">Snapp Credit Impact</h3>
                      <p className="text-sm text-purple-700">Credit rating influence</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">SIN Influence:</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Avg Rating:</span>
                      <span className="font-medium">742</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">QGI Investment:</span>
                      <span className="font-medium">Available</span>
                    </div>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
