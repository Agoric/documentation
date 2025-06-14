"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
  Building2,
  DollarSign,
  Shield,
  TrendingUp,
  Clock,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  Banknote,
  Landmark,
  Target,
  ArrowRight,
  Zap,
  Lock,
} from "lucide-react"

interface LoanGuaranteeRequest {
  id: string
  borrowerName: string
  loanAmount: number
  purpose: string
  term: number
  bankRate: number
  guaranteeFee: number
  status:
    | "draft"
    | "treasury-payment"
    | "guarantee-secured"
    | "market-funding"
    | "funded"
    | "disbursed"
    | "bonds-created"
    | "payout-complete"
  createdAt: string
  fundingProgress: number
  investors: number
  qgiVehicle: string
}

interface BondInstrument {
  id: string
  loanId: string
  type: "private-liquidity" | "qgi-vehicle"
  amount: number
  rate: number
  term: number
  maturityDate: string
  status: "created" | "active" | "matured"
}

const qgiVehicles = [
  "Quantum Growth Infrastructure",
  "Digital Asset Expansion Fund",
  "Global Commerce Enhancement",
  "Technology Innovation Portfolio",
  "Sustainable Development Initiative",
  "International Trade Facilitation",
]

export function GovernmentLoanGuaranteeSystem() {
  const [activeTab, setActiveTab] = useState("request")
  const [requests, setRequests] = useState<LoanGuaranteeRequest[]>([])
  const [bonds, setBonds] = useState<BondInstrument[]>([])
  const [newRequest, setNewRequest] = useState<Partial<LoanGuaranteeRequest>>({
    borrowerName: "",
    loanAmount: 0,
    purpose: "",
    term: 5,
    bankRate: 3.25,
    qgiVehicle: "",
  })

  // Sample data initialization
  useEffect(() => {
    const sampleRequests: LoanGuaranteeRequest[] = [
      {
        id: "LG-2024-001",
        borrowerName: "Metropolitan Development Corp",
        loanAmount: 5000000,
        purpose: "Commercial Real Estate Development",
        term: 7,
        bankRate: 3.25,
        guaranteeFee: 162500, // 3.25% of loan amount
        status: "payout-complete",
        createdAt: "2024-01-15",
        fundingProgress: 100,
        investors: 45,
        qgiVehicle: "Quantum Growth Infrastructure",
      },
      {
        id: "LG-2024-002",
        borrowerName: "Green Energy Solutions LLC",
        loanAmount: 2500000,
        purpose: "Solar Farm Infrastructure",
        term: 10,
        bankRate: 3.25,
        guaranteeFee: 81250,
        status: "market-funding",
        createdAt: "2024-02-01",
        fundingProgress: 68,
        investors: 23,
        qgiVehicle: "Sustainable Development Initiative",
      },
      {
        id: "LG-2024-003",
        borrowerName: "Tech Innovation Hub",
        loanAmount: 1000000,
        purpose: "R&D Facility Expansion",
        term: 5,
        bankRate: 3.25,
        guaranteeFee: 32500,
        status: "treasury-payment",
        createdAt: "2024-02-10",
        fundingProgress: 0,
        investors: 0,
        qgiVehicle: "Technology Innovation Portfolio",
      },
    ]
    setRequests(sampleRequests)

    const sampleBonds: BondInstrument[] = [
      {
        id: "BOND-PL-001",
        loanId: "LG-2024-001",
        type: "private-liquidity",
        amount: 5000000,
        rate: 3.25,
        term: 7,
        maturityDate: "2031-01-15",
        status: "active",
      },
      {
        id: "BOND-QGI-001",
        loanId: "LG-2024-001",
        type: "qgi-vehicle",
        amount: 5000000,
        rate: 3.25,
        term: 7,
        maturityDate: "2031-01-15",
        status: "active",
      },
    ]
    setBonds(sampleBonds)
  }, [])

  const calculateGuaranteeFee = (amount: number, rate: number) => {
    return (amount * rate) / 100
  }

  const handleCreateRequest = () => {
    if (!newRequest.borrowerName || !newRequest.loanAmount || !newRequest.purpose || !newRequest.qgiVehicle) {
      return
    }

    const guaranteeFee = calculateGuaranteeFee(newRequest.loanAmount!, newRequest.bankRate || 3.25)

    const request: LoanGuaranteeRequest = {
      id: `LG-2024-${String(requests.length + 1).padStart(3, "0")}`,
      borrowerName: newRequest.borrowerName!,
      loanAmount: newRequest.loanAmount!,
      purpose: newRequest.purpose!,
      term: newRequest.term || 5,
      bankRate: newRequest.bankRate || 3.25,
      guaranteeFee,
      status: "draft",
      createdAt: new Date().toISOString().split("T")[0],
      fundingProgress: 0,
      investors: 0,
      qgiVehicle: newRequest.qgiVehicle!,
    }

    setRequests([...requests, request])
    setNewRequest({
      borrowerName: "",
      loanAmount: 0,
      purpose: "",
      term: 5,
      bankRate: 3.25,
      qgiVehicle: "",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "treasury-payment":
        return "bg-blue-100 text-blue-800"
      case "guarantee-secured":
        return "bg-green-100 text-green-800"
      case "market-funding":
        return "bg-amber-100 text-amber-800"
      case "funded":
        return "bg-purple-100 text-purple-800"
      case "disbursed":
        return "bg-indigo-100 text-indigo-800"
      case "bonds-created":
        return "bg-emerald-100 text-emerald-800"
      case "payout-complete":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "draft":
        return "Draft"
      case "treasury-payment":
        return "Treasury Payment"
      case "guarantee-secured":
        return "Guarantee Secured"
      case "market-funding":
        return "Market Funding"
      case "funded":
        return "Funded"
      case "disbursed":
        return "Disbursed"
      case "bonds-created":
        return "Bonds Created"
      case "payout-complete":
        return "Payout Complete"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Landmark className="h-6 w-6 text-blue-600" />
            Government Loan Guarantee System
          </CardTitle>
          <CardDescription className="text-lg">
            Treasury-backed loan guarantees with automated QGI bond creation and investor payouts
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="request">New Request</TabsTrigger>
          <TabsTrigger value="active">Active Loans</TabsTrigger>
          <TabsTrigger value="bonds">Bond Instruments</TabsTrigger>
          <TabsTrigger value="treasury">Treasury Interface</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* New Request Tab */}
        <TabsContent value="request" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Create Loan Guarantee Request
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="borrower-name">Borrower Name</Label>
                  <Input
                    id="borrower-name"
                    value={newRequest.borrowerName || ""}
                    onChange={(e) => setNewRequest({ ...newRequest, borrowerName: e.target.value })}
                    placeholder="Enter borrower name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loan-amount">Loan Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="loan-amount"
                      type="number"
                      value={newRequest.loanAmount || ""}
                      onChange={(e) => setNewRequest({ ...newRequest, loanAmount: Number(e.target.value) })}
                      className="pl-10"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="term">Term (Years)</Label>
                  <Select
                    value={String(newRequest.term || 5)}
                    onValueChange={(value) => setNewRequest({ ...newRequest, term: Number(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Years</SelectItem>
                      <SelectItem value="7">7 Years</SelectItem>
                      <SelectItem value="10">10 Years</SelectItem>
                      <SelectItem value="15">15 Years</SelectItem>
                      <SelectItem value="20">20 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bank-rate">Bank Rate (%)</Label>
                  <Input
                    id="bank-rate"
                    type="number"
                    step="0.01"
                    value={newRequest.bankRate || 3.25}
                    onChange={(e) => setNewRequest({ ...newRequest, bankRate: Number(e.target.value) })}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="qgi-vehicle">QGI Vehicle (Non-Social Impact)</Label>
                  <Select
                    value={newRequest.qgiVehicle || ""}
                    onValueChange={(value) => setNewRequest({ ...newRequest, qgiVehicle: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select QGI Vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {qgiVehicles.map((vehicle) => (
                        <SelectItem key={vehicle} value={vehicle}>
                          {vehicle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Loan Purpose</Label>
                <Textarea
                  id="purpose"
                  value={newRequest.purpose || ""}
                  onChange={(e) => setNewRequest({ ...newRequest, purpose: e.target.value })}
                  placeholder="Describe the purpose of the loan"
                  rows={3}
                />
              </div>

              {newRequest.loanAmount && newRequest.bankRate && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Treasury Guarantee Fee:</span>
                        <div className="font-semibold text-lg">
                          ${calculateGuaranteeFee(newRequest.loanAmount, newRequest.bankRate).toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Fee Rate:</span>
                        <div className="font-semibold text-lg">{newRequest.bankRate}%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button onClick={handleCreateRequest} className="w-full" size="lg">
                <Shield className="h-4 w-4 mr-2" />
                Submit Guarantee Request
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Loans Tab */}
        <TabsContent value="active" className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      {request.borrowerName}
                    </CardTitle>
                    <CardDescription>
                      ID: {request.id} • Created: {request.createdAt}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(request.status)}>{getStatusText(request.status)}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Loan Amount</div>
                    <div className="font-semibold">${request.loanAmount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Term</div>
                    <div className="font-semibold">{request.term} years</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Bank Rate</div>
                    <div className="font-semibold">{request.bankRate}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Guarantee Fee</div>
                    <div className="font-semibold">${request.guaranteeFee.toLocaleString()}</div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Funding Progress</span>
                    <span>{request.fundingProgress}%</span>
                  </div>
                  <Progress value={request.fundingProgress} className="h-2" />
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{request.investors} investors</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      <span>QGI: {request.qgiVehicle}</span>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground mb-4">
                  <strong>Purpose:</strong> {request.purpose}
                </div>

                {/* Process Flow */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-xs">
                    <div
                      className={`flex items-center gap-1 ${request.status === "treasury-payment" || request.status === "guarantee-secured" || request.status === "market-funding" || request.status === "funded" || request.status === "disbursed" || request.status === "bonds-created" || request.status === "payout-complete" ? "text-green-600" : "text-muted-foreground"}`}
                    >
                      <CheckCircle className="h-3 w-3" />
                      <span>Treasury Payment</span>
                    </div>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <div
                      className={`flex items-center gap-1 ${request.status === "guarantee-secured" || request.status === "market-funding" || request.status === "funded" || request.status === "disbursed" || request.status === "bonds-created" || request.status === "payout-complete" ? "text-green-600" : "text-muted-foreground"}`}
                    >
                      <Shield className="h-3 w-3" />
                      <span>Guarantee</span>
                    </div>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <div
                      className={`flex items-center gap-1 ${request.status === "market-funding" || request.status === "funded" || request.status === "disbursed" || request.status === "bonds-created" || request.status === "payout-complete" ? "text-green-600" : "text-muted-foreground"}`}
                    >
                      <TrendingUp className="h-3 w-3" />
                      <span>Market Funding</span>
                    </div>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <div
                      className={`flex items-center gap-1 ${request.status === "funded" || request.status === "disbursed" || request.status === "bonds-created" || request.status === "payout-complete" ? "text-green-600" : "text-muted-foreground"}`}
                    >
                      <DollarSign className="h-3 w-3" />
                      <span>Disbursement</span>
                    </div>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <div
                      className={`flex items-center gap-1 ${request.status === "bonds-created" || request.status === "payout-complete" ? "text-green-600" : "text-muted-foreground"}`}
                    >
                      <Banknote className="h-3 w-3" />
                      <span>Bond Creation</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Bond Instruments Tab */}
        <TabsContent value="bonds" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bonds.map((bond) => (
              <Card key={bond.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Banknote
                      className={`h-5 w-5 ${bond.type === "private-liquidity" ? "text-purple-600" : "text-green-600"}`}
                    />
                    {bond.type === "private-liquidity" ? "Private Liquidity Bond" : "QGI Vehicle Bond"}
                  </CardTitle>
                  <CardDescription>
                    Bond ID: {bond.id} • Loan: {bond.loanId}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Amount</div>
                      <div className="font-semibold">${bond.amount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Rate</div>
                      <div className="font-semibold">{bond.rate}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Term</div>
                      <div className="font-semibold">{bond.term} years</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Maturity</div>
                      <div className="font-semibold">{bond.maturityDate}</div>
                    </div>
                  </div>

                  <Badge
                    className={bond.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                  >
                    {bond.status.charAt(0).toUpperCase() + bond.status.slice(1)}
                  </Badge>

                  {bond.type === "private-liquidity" && (
                    <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-2 text-purple-800">
                        <Lock className="h-4 w-4" />
                        <span className="font-medium">Private Asset Holdings</span>
                      </div>
                      <p className="text-sm text-purple-700 mt-1">Reserved for private liquidity portfolio</p>
                    </div>
                  )}

                  {bond.type === "qgi-vehicle" && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-800">
                        <Zap className="h-4 w-4" />
                        <span className="font-medium">QGI Distribution</span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">Allocated to qualified investment vehicle</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Treasury Interface Tab */}
        <TabsContent value="treasury" className="space-y-6">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Landmark className="h-5 w-5 text-blue-600" />
                US Treasury Interface
              </CardTitle>
              <CardDescription>Automated guarantee fee payments and demand letter processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Total Fees Paid</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">$276,250</div>
                  <p className="text-sm text-muted-foreground">3 guarantee requests</p>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Active Guarantees</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">2</div>
                  <p className="text-sm text-muted-foreground">$7.5M guaranteed</p>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-purple-600" />
                    <span className="font-medium">Demand Letters</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">1</div>
                  <p className="text-sm text-muted-foreground">Processed & collected</p>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <span className="font-medium text-amber-800">Treasury Process Flow</span>
                </div>
                <div className="text-sm text-amber-700 space-y-1">
                  <div>1. Pay bank rate (3.25%) to US Treasury for loan guarantee</div>
                  <div>2. Receive government guarantee certificate</div>
                  <div>3. List guaranteed loan on market for member funding</div>
                  <div>4. Upon full funding, disburse loan to borrower</div>
                  <div>5. Trigger guarantee and send demand letter to government</div>
                  <div>6. Collect guarantee payout from Treasury</div>
                  <div>7. Create two identical 3.25% bonds from collected funds</div>
                  <div>8. Distribute bonds: one to private holdings, one to QGI vehicle</div>
                  <div>9. Pay out investors over investment term (5-10 years)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium">Total Volume</span>
              </div>
              <div className="text-2xl font-bold">$8.5M</div>
              <p className="text-sm text-muted-foreground">Across 3 loans</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Total Investors</span>
              </div>
              <div className="text-2xl font-bold">68</div>
              <p className="text-sm text-muted-foreground">Active participants</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <span className="font-medium">Avg. Term</span>
              </div>
              <div className="text-2xl font-bold">7.3</div>
              <p className="text-sm text-muted-foreground">Years</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Banknote className="h-4 w-4 text-amber-600" />
                <span className="font-medium">Bond Value</span>
              </div>
              <div className="text-2xl font-bold">$10M</div>
              <p className="text-sm text-muted-foreground">Active bonds</p>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>QGI Vehicle Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {qgiVehicles.map((vehicle, index) => {
                  const allocation = [30, 25, 20, 15, 10, 0][index] || 0
                  return (
                    <div key={vehicle} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{vehicle}</span>
                        <span>{allocation}%</span>
                      </div>
                      <Progress value={allocation} className="h-2" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
