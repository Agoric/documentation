"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, DollarSign, Home, FileText, CheckCircle, ArrowRight, Brain, Zap, Shield } from "lucide-react"
import { usePreApproval } from "@/hooks/use-preapproval"
import { useCreditSuite } from "@/contexts/credit-context"

interface PreApprovalFormProps {
  onSuccess: (approvalData: any) => void
}

export function PreApprovalForm({ onSuccess }: PreApprovalFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    ssn: "",

    // Financial Information
    annualIncome: "",
    monthlyDebt: "",
    employmentStatus: "",
    employmentYears: "",
    assets: "",

    // Loan Information
    loanAmount: "",
    loanType: "50-year",
    propertyType: "primary",
    propertyValue: "",
    downPayment: "",
    propertyAddress: "",
    loanPurpose: "purchase",
  })

  const { submitPreApproval, isLoading, getInstantQuote } = usePreApproval()
  const { creditProfile } = useCreditSuite()
  const [instantQuote, setInstantQuote] = useState<any>(null)

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Generate instant quote when key fields are filled
    if (
      ["loanAmount", "annualIncome", "downPayment"].includes(field) &&
      formData.loanAmount &&
      formData.annualIncome &&
      formData.downPayment
    ) {
      generateInstantQuote()
    }
  }

  const generateInstantQuote = async () => {
    const quote = await getInstantQuote({
      loanAmount: Number.parseInt(formData.loanAmount),
      annualIncome: Number.parseInt(formData.annualIncome),
      downPayment: Number.parseInt(formData.downPayment),
      creditScore: creditProfile.ficoScore,
    })
    setInstantQuote(quote)
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      const result = await submitPreApproval(formData)
      onSuccess(result)
    } catch (error) {
      console.error("Pre-approval submission failed:", error)
    }
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone
      case 2:
        return formData.annualIncome && formData.employmentStatus && formData.employmentYears
      case 3:
        return formData.loanAmount && formData.loanType && formData.propertyType
      case 4:
        return true // Review step
      default:
        return false
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Step {currentStep} of {totalSteps}
          </h3>
          <Badge variant="outline" className="bg-blue-500/20 text-blue-400">
            {Math.round(progress)}% Complete
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* AI-Powered Credit Integration */}
      {creditProfile && (
        <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Brain className="h-5 w-5 text-green-400" />
              <div className="flex-1">
                <p className="font-medium text-green-400">AI Credit Analysis Active</p>
                <p className="text-sm text-muted-foreground">
                  Using your credit score of {creditProfile.ficoScore} for enhanced pre-approval
                </p>
              </div>
              <Badge className="bg-green-500/20 text-green-400">{creditProfile.scoreRating}</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Form Steps */}
      <Tabs value={currentStep.toString()} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-background/50">
          <TabsTrigger value="1" disabled={currentStep < 1}>
            <User className="h-4 w-4 mr-2" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="2" disabled={currentStep < 2}>
            <DollarSign className="h-4 w-4 mr-2" />
            Financial
          </TabsTrigger>
          <TabsTrigger value="3" disabled={currentStep < 3}>
            <Home className="h-4 w-4 mr-2" />
            Loan Details
          </TabsTrigger>
          <TabsTrigger value="4" disabled={currentStep < 4}>
            <FileText className="h-4 w-4 mr-2" />
            Review
          </TabsTrigger>
        </TabsList>

        {/* Step 1: Personal Information */}
        <TabsContent value="1" className="space-y-6">
          <Card className="bg-background/50 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Tell us about yourself to get started with your pre-approval</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ssn">Social Security Number</Label>
                  <Input
                    id="ssn"
                    type="password"
                    value={formData.ssn}
                    onChange={(e) => handleInputChange("ssn", e.target.value)}
                    placeholder="XXX-XX-XXXX"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 2: Financial Information */}
        <TabsContent value="2" className="space-y-6">
          <Card className="bg-background/50 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Financial Information
              </CardTitle>
              <CardDescription>Help us understand your financial situation for accurate pre-approval</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="annualIncome">Annual Income</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    value={formData.annualIncome}
                    onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                    placeholder="75000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyDebt">Monthly Debt Payments</Label>
                  <Input
                    id="monthlyDebt"
                    type="number"
                    value={formData.monthlyDebt}
                    onChange={(e) => handleInputChange("monthlyDebt", e.target.value)}
                    placeholder="1200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employmentStatus">Employment Status</Label>
                  <Select
                    value={formData.employmentStatus}
                    onValueChange={(value) => handleInputChange("employmentStatus", value)}
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
                    value={formData.employmentYears}
                    onChange={(e) => handleInputChange("employmentYears", e.target.value)}
                    placeholder="3"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assets">Total Assets</Label>
                <Input
                  id="assets"
                  type="number"
                  value={formData.assets}
                  onChange={(e) => handleInputChange("assets", e.target.value)}
                  placeholder="50000"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 3: Loan Details */}
        <TabsContent value="3" className="space-y-6">
          <Card className="bg-background/50 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Loan Details
              </CardTitle>
              <CardDescription>Specify your loan requirements and property information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan Amount</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={formData.loanAmount}
                    onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                    placeholder="400000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="downPayment">Down Payment</Label>
                  <Input
                    id="downPayment"
                    type="number"
                    value={formData.downPayment}
                    onChange={(e) => handleInputChange("downPayment", e.target.value)}
                    placeholder="80000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loanType">Loan Type</Label>
                  <Select value={formData.loanType} onValueChange={(value) => handleInputChange("loanType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50-year">50-Year Fixed</SelectItem>
                      <SelectItem value="30-year">30-Year Fixed</SelectItem>
                      <SelectItem value="15-year">15-Year Fixed</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) => handleInputChange("propertyType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary Residence</SelectItem>
                      <SelectItem value="secondary">Secondary Home</SelectItem>
                      <SelectItem value="investment">Investment Property</SelectItem>
                      <SelectItem value="commercial">Commercial Property</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyAddress">Property Address (Optional)</Label>
                <Input
                  id="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                  placeholder="123 Main St, City, State 12345"
                />
              </div>

              {/* Instant Quote Display */}
              {instantQuote && (
                <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Zap className="h-5 w-5 text-yellow-400" />
                      <h4 className="font-semibold text-green-400">Instant Quote</h4>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Est. Rate</p>
                        <p className="font-semibold">{instantQuote.estimatedRate}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Monthly Payment</p>
                        <p className="font-semibold">${instantQuote.monthlyPayment?.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Approval Odds</p>
                        <p className="font-semibold text-green-400">{instantQuote.approvalOdds}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Max Amount</p>
                        <p className="font-semibold">${instantQuote.maxLoanAmount?.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 4: Review */}
        <TabsContent value="4" className="space-y-6">
          <Card className="bg-background/50 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Review Your Application
              </CardTitle>
              <CardDescription>Please review your information before submitting for pre-approval</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Name:</span> {formData.firstName} {formData.lastName}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Email:</span> {formData.email}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Phone:</span> {formData.phone}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Financial Information</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Annual Income:</span> $
                      {Number.parseInt(formData.annualIncome || "0").toLocaleString()}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Monthly Debt:</span> $
                      {Number.parseInt(formData.monthlyDebt || "0").toLocaleString()}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Employment:</span> {formData.employmentStatus}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Loan Details</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Loan Amount:</span> $
                      {Number.parseInt(formData.loanAmount || "0").toLocaleString()}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Down Payment:</span> $
                      {Number.parseInt(formData.downPayment || "0").toLocaleString()}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Loan Type:</span> {formData.loanType}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Credit Profile</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">FICO Score:</span> {creditProfile.ficoScore}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Credit Rating:</span> {creditProfile.scoreRating}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Utilization:</span> {creditProfile.creditUtilization}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Pre-Approval Benefits */}
              <Card className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border-purple-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="h-5 w-5 text-purple-400" />
                    <h4 className="font-semibold text-purple-400">Pre-Approval Benefits</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Exclusive interest rates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Priority processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Premium property access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Dedicated loan specialist</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-white/20">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              disabled={!isStepValid(currentStep)}
              className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 hover:from-purple-500/30 hover:to-cyan-500/30"
            >
              Next Step
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30"
            >
              {isLoading ? "Processing..." : "Submit Pre-Approval"}
              <CheckCircle className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
