"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Home, FileText, CheckCircle, AlertCircle, ArrowRight, User, CreditCard, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RoyalDiamondSlabCard } from "@/components/ui/royal-diamond-slab-card"

interface LoanApplication {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  ssn: string
  dateOfBirth: string

  // Financial Information
  annualIncome: number
  monthlyDebt: number
  creditScore: number
  employmentStatus: string
  employmentYears: number
  assets: number
  liabilities: number

  // Loan Details
  loanAmount: number
  loanTerm: number
  loanType: string
  propertyType: string
  propertyValue: number
  downPayment: number
  propertyAddress: string
  purpose: string
}

export default function LoanApplicationPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [applicationResult, setApplicationResult] = useState<any>(null)

  const [application, setApplication] = useState<LoanApplication>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    ssn: "",
    dateOfBirth: "",
    annualIncome: 0,
    monthlyDebt: 0,
    creditScore: 0,
    employmentStatus: "",
    employmentYears: 0,
    assets: 0,
    liabilities: 0,
    loanAmount: 0,
    loanTerm: 50,
    loanType: "50-year",
    propertyType: "primary",
    propertyValue: 0,
    downPayment: 0,
    propertyAddress: "",
    purpose: "purchase",
  })

  const updateApplication = (field: keyof LoanApplication, value: any) => {
    setApplication((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmitApplication = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/loans/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...application,
          applicantId: `USER-${Date.now()}`,
        }),
      })

      const result = await response.json()
      setApplicationResult(result)

      if (result.success) {
        setCurrentStep(5) // Results step
      }
    } catch (error) {
      console.error("Application submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculateMonthlyPayment = () => {
    if (!application.loanAmount || !application.loanTerm) return 0
    const monthlyRate = 3.1 / 100 / 12 // 3.1% APR for 50-year loans
    const numPayments = application.loanTerm * 12
    return (
      (application.loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
    )
  }

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Financial Info", icon: CreditCard },
    { number: 3, title: "Loan Details", icon: Home },
    { number: 4, title: "Review", icon: FileText },
    { number: 5, title: "Results", icon: CheckCircle },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            50-Year Loan Application
          </h1>
          <p className="text-muted-foreground text-lg">
            Revolutionary financing with payments up to 40% lower than traditional loans
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-muted-foreground text-muted-foreground"
                }`}
              >
                {currentStep > step.number ? <CheckCircle className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
              </div>
              <span
                className={`ml-2 text-sm ${currentStep >= step.number ? "text-foreground" : "text-muted-foreground"}`}
              >
                {step.title}
              </span>
              {index < steps.length - 1 && <ArrowRight className="h-4 w-4 mx-4 text-muted-foreground" />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card className="bg-background/50 backdrop-blur-sm border-white/20">
          <CardContent className="p-8">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold mb-2">Personal Information</h2>
                  <p className="text-muted-foreground">Let's start with your basic information</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={application.firstName}
                      onChange={(e) => updateApplication("firstName", e.target.value)}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={application.lastName}
                      onChange={(e) => updateApplication("lastName", e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={application.email}
                      onChange={(e) => updateApplication("email", e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={application.phone}
                      onChange={(e) => updateApplication("phone", e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ssn">Social Security Number</Label>
                    <Input
                      id="ssn"
                      value={application.ssn}
                      onChange={(e) => updateApplication("ssn", e.target.value)}
                      placeholder="XXX-XX-XXXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={application.dateOfBirth}
                      onChange={(e) => updateApplication("dateOfBirth", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setCurrentStep(2)} className="px-8">
                    Next Step
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Financial Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold mb-2">Financial Information</h2>
                  <p className="text-muted-foreground">Help us understand your financial situation</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="annualIncome">Annual Income</Label>
                    <Input
                      id="annualIncome"
                      type="number"
                      value={application.annualIncome || ""}
                      onChange={(e) => updateApplication("annualIncome", Number(e.target.value))}
                      placeholder="85000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyDebt">Monthly Debt Payments</Label>
                    <Input
                      id="monthlyDebt"
                      type="number"
                      value={application.monthlyDebt || ""}
                      onChange={(e) => updateApplication("monthlyDebt", Number(e.target.value))}
                      placeholder="1200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="creditScore">Credit Score</Label>
                    <Input
                      id="creditScore"
                      type="number"
                      value={application.creditScore || ""}
                      onChange={(e) => updateApplication("creditScore", Number(e.target.value))}
                      placeholder="750"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employmentStatus">Employment Status</Label>
                    <Select
                      value={application.employmentStatus}
                      onValueChange={(value) => updateApplication("employmentStatus", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employed">Employed</SelectItem>
                        <SelectItem value="self-employed">Self-Employed</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                        <SelectItem value="unemployed">Unemployed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employmentYears">Years at Current Job</Label>
                    <Input
                      id="employmentYears"
                      type="number"
                      value={application.employmentYears || ""}
                      onChange={(e) => updateApplication("employmentYears", Number(e.target.value))}
                      placeholder="5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assets">Total Assets</Label>
                    <Input
                      id="assets"
                      type="number"
                      value={application.assets || ""}
                      onChange={(e) => updateApplication("assets", Number(e.target.value))}
                      placeholder="150000"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Previous
                  </Button>
                  <Button onClick={() => setCurrentStep(3)} className="px-8">
                    Next Step
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Loan Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold mb-2">Loan Details</h2>
                  <p className="text-muted-foreground">Tell us about the property and loan you need</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Loan Amount</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={application.loanAmount || ""}
                      onChange={(e) => updateApplication("loanAmount", Number(e.target.value))}
                      placeholder="450000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyValue">Property Value</Label>
                    <Input
                      id="propertyValue"
                      type="number"
                      value={application.propertyValue || ""}
                      onChange={(e) => updateApplication("propertyValue", Number(e.target.value))}
                      placeholder="550000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="downPayment">Down Payment</Label>
                    <Input
                      id="downPayment"
                      type="number"
                      value={application.downPayment || ""}
                      onChange={(e) => updateApplication("downPayment", Number(e.target.value))}
                      placeholder="100000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loanTerm">Loan Term</Label>
                    <Select
                      value={application.loanTerm.toString()}
                      onValueChange={(value) => updateApplication("loanTerm", Number(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50 Years (Revolutionary)</SelectItem>
                        <SelectItem value="30">30 Years (Traditional)</SelectItem>
                        <SelectItem value="15">15 Years (Accelerated)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select
                      value={application.propertyType}
                      onValueChange={(value) => updateApplication("propertyType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primary">Primary Residence</SelectItem>
                        <SelectItem value="secondary">Secondary Home</SelectItem>
                        <SelectItem value="investment">Investment Property</SelectItem>
                        <SelectItem value="commercial">Commercial Property</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Loan Purpose</Label>
                    <Select value={application.purpose} onValueChange={(value) => updateApplication("purpose", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="purchase">Purchase</SelectItem>
                        <SelectItem value="refinance">Refinance</SelectItem>
                        <SelectItem value="cash-out">Cash-Out Refinance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyAddress">Property Address</Label>
                  <Textarea
                    id="propertyAddress"
                    value={application.propertyAddress}
                    onChange={(e) => updateApplication("propertyAddress", e.target.value)}
                    placeholder="Enter the full property address"
                    rows={3}
                  />
                </div>

                {/* Payment Calculator */}
                {application.loanAmount > 0 && (
                  <RoyalDiamondSlabCard
                    variant="emerald"
                    size="lg"
                    title="Estimated Monthly Payment"
                    content={`$${Math.round(calculateMonthlyPayment()).toLocaleString()}`}
                    highlightWords={["Monthly"]}
                    className="mt-6"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>50-Year Loan:</span>
                        <span className="text-emerald-400">
                          ${Math.round(calculateMonthlyPayment()).toLocaleString()}/month
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>30-Year Comparison:</span>
                        <span className="text-red-400">
                          ${Math.round(calculateMonthlyPayment() * 1.43).toLocaleString()}/month
                        </span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold text-emerald-400">
                        <span>Monthly Savings:</span>
                        <span>${Math.round(calculateMonthlyPayment() * 0.43).toLocaleString()}</span>
                      </div>
                    </div>
                  </RoyalDiamondSlabCard>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Previous
                  </Button>
                  <Button onClick={() => setCurrentStep(4)} className="px-8">
                    Review Application
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold mb-2">Review Your Application</h2>
                  <p className="text-muted-foreground">Please review all information before submitting</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-background/30 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-lg">Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span>Name:</span>
                        <span>
                          {application.firstName} {application.lastName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span>{application.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone:</span>
                        <span>{application.phone}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-background/30 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-lg">Financial Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span>Annual Income:</span>
                        <span>${application.annualIncome.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Credit Score:</span>
                        <span>{application.creditScore}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Debt:</span>
                        <span>${application.monthlyDebt.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-background/30 border-white/10 md:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Loan Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                      <div className="flex justify-between">
                        <span>Loan Amount:</span>
                        <span>${application.loanAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Property Value:</span>
                        <span>${application.propertyValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Down Payment:</span>
                        <span>${application.downPayment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Loan Term:</span>
                        <span>{application.loanTerm} Years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Property Type:</span>
                        <span className="capitalize">{application.propertyType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Payment:</span>
                        <span className="text-emerald-400 font-semibold">
                          ${Math.round(calculateMonthlyPayment()).toLocaleString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(3)}>
                    Previous
                  </Button>
                  <Button onClick={handleSubmitApplication} disabled={isSubmitting} className="px-8">
                    {isSubmitting ? "Processing..." : "Submit Application"}
                    {!isSubmitting && <ArrowRight className="h-4 w-4 ml-2" />}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Results */}
            {currentStep === 5 && applicationResult && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  {applicationResult.underwritingResult?.approved ? (
                    <div className="space-y-4">
                      <CheckCircle className="h-16 w-16 text-green-400 mx-auto" />
                      <h2 className="text-2xl font-semibold text-green-400">Congratulations!</h2>
                      <p className="text-muted-foreground">Your loan application has been pre-approved</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <AlertCircle className="h-16 w-16 text-yellow-400 mx-auto" />
                      <h2 className="text-2xl font-semibold text-yellow-400">Additional Review Required</h2>
                      <p className="text-muted-foreground">Your application needs further review</p>
                    </div>
                  )}
                </div>

                {applicationResult.underwritingResult && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <RoyalDiamondSlabCard
                      variant={applicationResult.underwritingResult.approved ? "emerald" : "ruby"}
                      size="lg"
                      title="Loan Decision"
                      content={applicationResult.underwritingResult.approved ? "PRE-APPROVED" : "UNDER REVIEW"}
                      highlightWords={["APPROVED", "REVIEW"]}
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Risk Score:</span>
                          <span>{applicationResult.underwritingResult.riskScore}/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Interest Rate:</span>
                          <span>{applicationResult.underwritingResult.interestRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly Payment:</span>
                          <span>
                            ${Math.round(applicationResult.underwritingResult.monthlyPayment).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </RoyalDiamondSlabCard>

                    <Card className="bg-background/30 border-white/10">
                      <CardHeader>
                        <CardTitle>Next Steps</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {applicationResult.underwritingResult.approved ? (
                          <>
                            <div className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-green-400" />
                              <span>Document collection</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Clock className="h-5 w-5 text-yellow-400" />
                              <span>Property appraisal</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Clock className="h-5 w-5 text-yellow-400" />
                              <span>Final underwriting</span>
                            </div>
                            <Button className="w-full mt-4" onClick={() => router.push("/loans/dashboard")}>
                              View Loan Dashboard
                            </Button>
                          </>
                        ) : (
                          <>
                            {applicationResult.underwritingResult.conditions?.map(
                              (condition: string, index: number) => (
                                <div key={index} className="flex items-center gap-3">
                                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                                  <span className="text-sm">{condition}</span>
                                </div>
                              ),
                            )}
                            <Button className="w-full mt-4" onClick={() => router.push("/loans/dashboard")}>
                              View Application Status
                            </Button>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Application ID: {applicationResult.applicationId}
                  </p>
                  <Button variant="outline" onClick={() => router.push("/")}>
                    Return to Dashboard
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
