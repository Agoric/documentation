"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import {
  Building2,
  ArrowLeft,
  Calculator,
  FileText,
  DollarSign,
  User,
  CheckCircle,
  TrendingUp,
  Shield,
  Target,
  BarChart3,
} from "lucide-react"

export default function BusinessLoanPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Business Information
    businessName: "",
    businessType: "llc",
    industry: "",
    yearsInBusiness: "",
    ein: "",
    businessAddress: "",

    // Owner Information
    ownerName: "",
    ownerSSN: "",
    ownershipPercentage: "",
    ownerEmail: "",
    ownerPhone: "",

    // Financial Information
    annualRevenue: "",
    monthlyRevenue: "",
    businessExpenses: "",
    existingDebt: "",

    // Loan Information
    loanAmount: "",
    loanPurpose: "working-capital",
    loanTerm: "60",
  })

  const loanSteps = [
    { id: 1, title: "Business Info", icon: Building2, completed: false },
    { id: 2, title: "Owner Info", icon: User, completed: false },
    { id: 3, title: "Financials", icon: BarChart3, completed: false },
    { id: 4, title: "Loan Details", icon: DollarSign, completed: false },
    { id: 5, title: "Review", icon: CheckCircle, completed: false },
  ]

  const businessLoanPrograms = [
    {
      name: "Working Capital Loan",
      rate: "7.50%",
      amount: "Up to $500,000",
      description: "Fund day-to-day business operations",
      features: ["Flexible repayment", "Quick approval", "No collateral required"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Equipment Financing",
      rate: "6.75%",
      amount: "Up to $1,000,000",
      description: "Finance business equipment and machinery",
      features: ["Equipment as collateral", "Lower rates", "Tax benefits"],
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "SBA Loan",
      rate: "8.25%",
      amount: "Up to $5,000,000",
      description: "Government-backed small business loan",
      features: ["Lower down payments", "Longer terms", "Competitive rates"],
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Commercial Real Estate",
      rate: "7.00%",
      amount: "Up to $10,000,000",
      description: "Purchase or refinance commercial property",
      features: ["Long-term financing", "Fixed rates", "Property as collateral"],
      color: "from-orange-500 to-red-500",
    },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (currentStep < loanSteps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmitApplication = () => {
    const applicationId = `BUSINESS-${Date.now()}`
    router.push(`/citizen/loan-center/status/${applicationId}`)
  }

  const calculateMonthlyPayment = () => {
    const principal = Number(formData.loanAmount) || 100000
    const rate = 7.5 / 100 / 12
    const payments = Number(formData.loanTerm) || 60

    if (rate === 0) return principal / payments

    return (principal * rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1)
  }

  const monthlyPayment = calculateMonthlyPayment()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-950 via-red-950 to-orange-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="border-orange-500/30 text-orange-300 hover:bg-orange-500/20 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
                Business Loan Application
              </h1>
              <p className="text-xl text-orange-200 mt-2">Fuel your business growth with flexible financing</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/citizen/loan-center/calculator")}
              className="border-orange-500/30 text-orange-300 hover:bg-orange-500/20 bg-transparent"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Payment Calculator
            </Button>
          </div>
        </div>

        {/* Progress Steps */}
        <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/30 backdrop-blur-sm border-orange-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {loanSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                        currentStep >= step.id
                          ? "bg-orange-500 border-orange-500 text-white"
                          : "border-orange-500/30 text-orange-300"
                      }`}
                    >
                      <step.icon className="h-6 w-6" />
                    </div>
                    <span className="text-sm text-orange-200 mt-2">{step.title}</span>
                  </div>
                  {index < loanSteps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-4 ${currentStep > step.id ? "bg-orange-500" : "bg-orange-500/30"}`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Progress value={(currentStep / loanSteps.length) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="application" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-orange-900/30 backdrop-blur-sm">
            <TabsTrigger value="application">Application</TabsTrigger>
            <TabsTrigger value="programs">Loan Programs</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
          </TabsList>

          <TabsContent value="application" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Application Form */}
              <div className="lg:col-span-2">
                <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/30 backdrop-blur-sm border-orange-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Step {currentStep}: {loanSteps[currentStep - 1]?.title}
                    </CardTitle>
                    <CardDescription className="text-orange-200">
                      Please provide the required information to continue
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {currentStep === 1 && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white">Business Name</Label>
                            <Input
                              value={formData.businessName}
                              onChange={(e) => handleInputChange("businessName", e.target.value)}
                              className="bg-orange-800/30 border-orange-500/30 text-white"
                              placeholder="Enter business name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Business Type</Label>
                            <select
                              value={formData.businessType}
                              onChange={(e) => handleInputChange("businessType", e.target.value)}
                              className="w-full p-2 bg-orange-800/30 border border-orange-500/30 rounded-md text-white"
                            >
                              <option value="llc">LLC</option>
                              <option value="corporation">Corporation</option>
                              <option value="partnership">Partnership</option>
                              <option value="sole-proprietorship">Sole Proprietorship</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white">Industry</Label>
                            <Input
                              value={formData.industry}
                              onChange={(e) => handleInputChange("industry", e.target.value)}
                              className="bg-orange-800/30 border-orange-500/30 text-white"
                              placeholder="e.g., Technology, Retail"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Years in Business</Label>
                            <Input
                              type="number"
                              value={formData.yearsInBusiness}
                              onChange={(e) => handleInputChange("yearsInBusiness", e.target.value)}
                              className="bg-orange-800/30 border-orange-500/30 text-white"
                              placeholder="Years operating"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white">EIN (Tax ID)</Label>
                            <Input
                              value={formData.ein}
                              onChange={(e) => handleInputChange("ein", e.target.value)}
                              className="bg-orange-800/30 border-orange-500/30 text-white"
                              placeholder="XX-XXXXXXX"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Business Address</Label>
                          <Input
                            value={formData.businessAddress}
                            onChange={(e) => handleInputChange("businessAddress", e.target.value)}
                            className="bg-orange-800/30 border-orange-500/30 text-white"
                            placeholder="Complete business address"
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-white">Owner Name</Label>
                          <Input
                            value={formData.ownerName}
                            onChange={(e) => handleInputChange("ownerName", e.target.value)}
                            className="bg-orange-800/30 border-orange-500/30 text-white"
                            placeholder="Full name of primary owner"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Owner SSN</Label>
                          <Input
                            value={formData.ownerSSN}
                            onChange={(e) => handleInputChange("ownerSSN", e.target.value)}
                            className="bg-orange-800/30 border-orange-500/30 text-white"
                            placeholder="XXX-XX-XXXX"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Ownership Percentage</Label>
                          <Input
                            type="number"
                            value={formData.ownershipPercentage}
                            onChange={(e) => handleInputChange("ownershipPercentage", e.target.value)}
                            className="bg-orange-800/30 border-orange-500/30 text-white"
                            placeholder="Percentage owned"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Email</Label>
                          <Input
                            type="email"
                            value={formData.ownerEmail}
                            onChange={(e) => handleInputChange("ownerEmail", e.target.value)}
                            className="bg-orange-800/30 border-orange-500/30 text-white"
                            placeholder="Owner email address"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Phone</Label>
                          <Input
                            type="tel"
                            value={formData.ownerPhone}
                            onChange={(e) => handleInputChange("ownerPhone", e.target.value)}
                            className="bg-orange-800/30 border-orange-500/30 text-white"
                            placeholder="Owner phone number"
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-white">Annual Revenue</Label>
                          <Input
                            type="number"
                            value={formData.annualRevenue}
                            onChange={(e) => handleInputChange("annualRevenue", e.target.value)}
                            className="bg-orange-800/30 border-orange-500/30 text-white"
                            placeholder="Total annual revenue"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Monthly Revenue</Label>
                          <Input
                            type="number"
                            value={formData.monthlyRevenue}
                            onChange={(e) => handleInputChange("monthlyRevenue", e.target.value)}
                            className="bg-orange-800/30 border-orange-500/30 text-white"
                            placeholder="Average monthly revenue"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Monthly Business Expenses</Label>
                          <Input
                            type="number"
                            value={formData.businessExpenses}
                            onChange={(e) => handleInputChange("businessExpenses", e.target.value)}
                            className="bg-orange-800/30 border-orange-500/30 text-white"
                            placeholder="Total monthly expenses"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Existing Business Debt</Label>
                          <Input
                            type="number"
                            value={formData.existingDebt}
                            onChange={(e) => handleInputChange("existingDebt", e.target.value)}
                            className="bg-orange-800/30 border-orange-500/30 text-white"
                            placeholder="Current business debt"
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white">Loan Amount</Label>
                            <Input
                              type="number"
                              value={formData.loanAmount}
                              onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                              className="bg-orange-800/30 border-orange-500/30 text-white"
                              placeholder="Amount needed"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Loan Term</Label>
                            <select
                              value={formData.loanTerm}
                              onChange={(e) => handleInputChange("loanTerm", e.target.value)}
                              className="w-full p-2 bg-orange-800/30 border border-orange-500/30 rounded-md text-white"
                            >
                              <option value="36">36 months</option>
                              <option value="48">48 months</option>
                              <option value="60">60 months</option>
                              <option value="84">84 months</option>
                              <option value="120">120 months</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Loan Purpose</Label>
                          <select
                            value={formData.loanPurpose}
                            onChange={(e) => handleInputChange("loanPurpose", e.target.value)}
                            className="w-full p-2 bg-orange-800/30 border border-orange-500/30 rounded-md text-white"
                          >
                            <option value="working-capital">Working Capital</option>
                            <option value="equipment">Equipment Purchase</option>
                            <option value="expansion">Business Expansion</option>
                            <option value="inventory">Inventory</option>
                            <option value="real-estate">Real Estate</option>
                            <option value="refinancing">Debt Refinancing</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {currentStep === 5 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white">Review Your Application</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-orange-300">Business Information</h4>
                              <p className="text-white">{formData.businessName}</p>
                              <p className="text-orange-200">
                                {formData.businessType} • {formData.industry}
                              </p>
                              <p className="text-orange-200">{formData.yearsInBusiness} years in business</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-orange-300">Owner Information</h4>
                              <p className="text-white">{formData.ownerName}</p>
                              <p className="text-orange-200">{formData.ownershipPercentage}% ownership</p>
                              <p className="text-orange-200">{formData.ownerEmail}</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-orange-300">Financial Information</h4>
                              <p className="text-white">
                                Annual Revenue: ${Number(formData.annualRevenue).toLocaleString()}
                              </p>
                              <p className="text-orange-200">
                                Monthly Revenue: ${Number(formData.monthlyRevenue).toLocaleString()}
                              </p>
                              <p className="text-orange-200">
                                Monthly Expenses: ${Number(formData.businessExpenses).toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium text-orange-300">Loan Details</h4>
                              <p className="text-white">Amount: ${Number(formData.loanAmount).toLocaleString()}</p>
                              <p className="text-orange-200">Purpose: {formData.loanPurpose.replace("-", " ")}</p>
                              <p className="text-orange-200">Term: {formData.loanTerm} months</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between pt-6">
                      <Button
                        variant="outline"
                        onClick={handlePrevStep}
                        disabled={currentStep === 1}
                        className="border-orange-500/30 text-orange-300 bg-transparent"
                      >
                        Previous
                      </Button>
                      {currentStep < loanSteps.length ? (
                        <Button onClick={handleNextStep} className="bg-gradient-to-r from-orange-500 to-red-600">
                          Next Step
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSubmitApplication}
                          className="bg-gradient-to-r from-orange-500 to-red-600"
                        >
                          Submit Application
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Loan Summary */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/30 backdrop-blur-sm border-orange-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-orange-400" />
                      Loan Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </div>
                      <div className="text-orange-200">Estimated Monthly Payment</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-orange-300">Loan Amount:</span>
                        <span className="text-white">${Number(formData.loanAmount || 100000).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-300">Interest Rate:</span>
                        <span className="text-white">7.50%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-300">Loan Term:</span>
                        <span className="text-white">{formData.loanTerm || 60} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-300">Purpose:</span>
                        <span className="text-white">{formData.loanPurpose.replace("-", " ")}</span>
                      </div>
                    </div>

                    <div className="bg-orange-800/30 p-3 rounded-lg border border-orange-500/20">
                      <p className="text-sm text-orange-200">
                        <Shield className="h-4 w-4 inline mr-1" />
                        SBA programs available
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/30 backdrop-blur-sm border-orange-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="h-5 w-5 text-orange-400" />
                      Business Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-orange-200">Build business credit</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-orange-200">Tax-deductible interest</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-orange-200">Flexible repayment terms</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-orange-200">Dedicated business support</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="programs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {businessLoanPrograms.map((program) => (
                <Card
                  key={program.name}
                  className="bg-gradient-to-br from-orange-900/50 to-red-900/30 backdrop-blur-sm border-orange-500/20 hover:border-orange-400/40 transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      {program.name}
                      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">{program.rate}</Badge>
                    </CardTitle>
                    <CardDescription className="text-orange-200">{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-orange-300">Loan Amount:</span>
                      <span className="text-white font-medium">{program.amount}</span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-white">Key Features:</h4>
                      <ul className="space-y-1">
                        {program.features.map((feature, index) => (
                          <li key={index} className="text-sm text-orange-200 flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className={`w-full bg-gradient-to-r ${program.color}`}>Select This Program</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/30 backdrop-blur-sm border-orange-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="h-5 w-5 text-orange-400" />
                    Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Business Documents</h4>
                    <ul className="space-y-1 text-sm text-orange-200">
                      <li>• Business license</li>
                      <li>• Articles of incorporation</li>
                      <li>• Operating agreement</li>
                      <li>• Business tax returns (2 years)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Financial Statements</h4>
                    <ul className="space-y-1 text-sm text-orange-200">
                      <li>• Profit & loss statements</li>
                      <li>• Balance sheets</li>
                      <li>• Cash flow statements</li>
                      <li>• Bank statements (6 months)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Owner Information</h4>
                    <ul className="space-y-1 text-sm text-orange-200">
                      <li>• Personal tax returns</li>
                      <li>• Personal financial statement</li>
                      <li>• Driver's license</li>
                      <li>• Resume/business experience</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/30 backdrop-blur-sm border-orange-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-orange-400" />
                    Qualification Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Business Requirements</h4>
                    <ul className="space-y-1 text-sm text-orange-200">
                      <li>• 2+ years in business</li>
                      <li>• Minimum annual revenue: $100,000</li>
                      <li>• Positive cash flow</li>
                      <li>• Good business credit score</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Owner Requirements</h4>
                    <ul className="space-y-1 text-sm text-orange-200">
                      <li>• Personal credit score: 650+</li>
                      <li>• 20%+ ownership stake</li>
                      <li>• Personal guarantee required</li>
                      <li>• Industry experience preferred</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Financial Criteria</h4>
                    <ul className="space-y-1 text-sm text-orange-200">
                      <li>• Debt service coverage ratio: 1.25x</li>
                      <li>• Strong financial statements</li>
                      <li>• Collateral may be required</li>
                      <li>• Down payment: 10-25%</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
