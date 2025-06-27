"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoanStatusTracker } from "@/components/loan-processing/loan-status-tracker"
import { DocumentUploadManager } from "@/components/loan-processing/document-upload-manager"
import {
  ArrowLeft,
  MessageSquare,
  Calendar,
  Phone,
  Mail,
  User,
  Building,
  DollarSign,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Download,
  Share,
  Bell,
} from "lucide-react"
import Link from "next/link"

interface LoanDetails {
  id: string
  type: string
  amount: number
  interestRate: number
  term: number
  status: string
  currentStep: number
  lender: {
    name: string
    contact: {
      phone: string
      email: string
      address: string
    }
    logo?: string
  }
  borrower: {
    name: string
    email: string
    phone: string
  }
  property?: {
    address: string
    value: number
    type: string
  }
  timeline: {
    applied: string
    lastUpdate: string
    estimatedCompletion: string
  }
  monthlyPayment: number
  totalInterest: number
  loanToValue?: number
  debtToIncome?: number
}

export default function LoanStatusPage() {
  const params = useParams()
  const applicationId = params.applicationId as string

  const [currentStep, setCurrentStep] = useState(2)
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    id: applicationId,
    type: "home",
    amount: 450000,
    interestRate: 6.75,
    term: 30,
    status: "processing",
    currentStep: 2,
    lender: {
      name: "First National Bank",
      contact: {
        phone: "(555) 123-4567",
        email: "loans@firstnational.com",
        address: "123 Banking St, Financial District, NY 10001",
      },
    },
    borrower: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "(555) 987-6543",
    },
    property: {
      address: "456 Dream Home Lane, Suburbia, NY 12345",
      value: 500000,
      type: "Single Family Home",
    },
    timeline: {
      applied: "2024-01-15",
      lastUpdate: "2024-01-18",
      estimatedCompletion: "2024-02-28",
    },
    monthlyPayment: 2847.15,
    totalInterest: 574572,
    loanToValue: 90,
    debtToIncome: 28,
  })

  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "update",
      title: "Credit Check Completed",
      message: "Your credit assessment has been completed successfully. Score: 785",
      timestamp: "2024-01-18T10:30:00Z",
      read: false,
    },
    {
      id: "2",
      type: "action",
      title: "Documents Required",
      message: "Please upload your recent pay stubs to continue processing",
      timestamp: "2024-01-17T14:15:00Z",
      read: false,
    },
    {
      id: "3",
      type: "info",
      title: "Application Received",
      message: "Your loan application has been received and assigned to an underwriter",
      timestamp: "2024-01-15T09:00:00Z",
      read: true,
    },
  ])

  const handleNextStep = () => {
    if (currentStep < 9) {
      setCurrentStep((prev) => prev + 1)
      setLoanDetails((prev) => ({
        ...prev,
        currentStep: currentStep + 1,
        timeline: {
          ...prev.timeline,
          lastUpdate: new Date().toISOString().split("T")[0],
        },
      }))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "processing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "update":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "action":
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      default:
        return <Bell className="h-4 w-4 text-blue-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/citizen/loan-center">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Loan Center
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Loan Application Status
            </h1>
            <p className="text-muted-foreground">Application ID: {applicationId}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>

        {/* Loan Overview */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  {loanDetails.type.charAt(0).toUpperCase() + loanDetails.type.slice(1)} Loan Application
                </CardTitle>
                <CardDescription>
                  {loanDetails.lender.name} • Applied {new Date(loanDetails.timeline.applied).toLocaleDateString()}
                </CardDescription>
              </div>
              <Badge className={getStatusColor(loanDetails.status)}>
                {loanDetails.status.charAt(0).toUpperCase() + loanDetails.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Loan Amount</p>
                <p className="text-2xl font-bold text-green-400">${loanDetails.amount.toLocaleString()}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Interest Rate</p>
                <p className="text-2xl font-bold text-blue-400">{loanDetails.interestRate}%</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Monthly Payment</p>
                <p className="text-2xl font-bold text-purple-400">${loanDetails.monthlyPayment.toLocaleString()}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Loan Term</p>
                <p className="text-2xl font-bold text-orange-400">{loanDetails.term} years</p>
              </div>
            </div>

            {loanDetails.property && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Property Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Address</p>
                    <p className="font-medium">{loanDetails.property.address}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Property Value</p>
                    <p className="font-medium">${loanDetails.property.value.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Property Type</p>
                    <p className="font-medium">{loanDetails.property.type}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="status" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="status">Status Tracker</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="details">Loan Details</TabsTrigger>
            <TabsTrigger value="communication">Messages</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Status Tracker Tab */}
          <TabsContent value="status">
            <LoanStatusTracker
              applicationId={applicationId}
              loanType={loanDetails.type}
              amount={loanDetails.amount}
              currentStep={currentStep}
              onNextStep={handleNextStep}
            />
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <DocumentUploadManager
              applicationId={applicationId}
              onDocumentUpdate={(docs) => console.log("Documents updated:", docs)}
            />
          </TabsContent>

          {/* Loan Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Borrower Information */}
              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Borrower Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{loanDetails.borrower.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{loanDetails.borrower.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{loanDetails.borrower.phone}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Lender Information */}
              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Lender Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Institution</p>
                    <p className="font-medium">{loanDetails.lender.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contact Phone</p>
                    <p className="font-medium">{loanDetails.lender.contact.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{loanDetails.lender.contact.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium text-sm">{loanDetails.lender.contact.address}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Summary */}
              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Financial Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Principal</p>
                      <p className="font-medium">${loanDetails.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Interest Rate</p>
                      <p className="font-medium">{loanDetails.interestRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Payment</p>
                      <p className="font-medium">${loanDetails.monthlyPayment.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Interest</p>
                      <p className="font-medium">${loanDetails.totalInterest.toLocaleString()}</p>
                    </div>
                  </div>
                  {loanDetails.loanToValue && (
                    <div className="pt-4 border-t border-white/10">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Loan-to-Value</p>
                          <p className="font-medium">{loanDetails.loanToValue}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Debt-to-Income</p>
                          <p className="font-medium">{loanDetails.debtToIncome}%</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Application Date</p>
                    <p className="font-medium">{new Date(loanDetails.timeline.applied).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Update</p>
                    <p className="font-medium">{new Date(loanDetails.timeline.lastUpdate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Completion</p>
                    <p className="font-medium">
                      {new Date(loanDetails.timeline.estimatedCompletion).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Communication Tab */}
          <TabsContent value="communication" className="space-y-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Communication Center
                </CardTitle>
                <CardDescription>Contact your loan officer or send messages about your application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="h-12 justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Loan Officer
                  </Button>
                  <Button variant="outline" className="h-12 justify-start bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="font-medium mb-3">Recent Messages</h4>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Loan Officer - Sarah Johnson</span>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your credit check has been completed successfully. We'll proceed to the next step shortly.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">You</span>
                        <span className="text-xs text-muted-foreground">1 day ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        I've uploaded the requested pay stubs. Please let me know if you need anything else.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
                <CardDescription>Stay updated on your loan application progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${
                        notification.read ? "bg-white/5 border-white/10" : "bg-blue-500/10 border-blue-500/20"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">
                              {new Date(notification.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                        </div>
                        {!notification.read && <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0 mt-2" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
