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
  Shield,
  Briefcase,
  Target,
} from "lucide-react"

export default function SBALoanPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    ssn: "",
    dateOfBirth: "",

    // Business Information
    businessName: "",
    businessType: "",
    businessStructure: "",
    yearsInBusiness: "",
    numberOfEmployees: "",
    annualRevenue: "",
    businessAddress: "",

    // Loan Information
    loanAmount: "",
    loanPurpose: "working-capital",
    useOfFunds: "",

    // Financial Information
    personalIncome: "",
    businessCashFlow: "",
    collateral: "",
  })

  const loanSteps = [
    { id: 1, title: "Personal Info", icon: User, completed: false },
    { id: 2, title: "Business Info", icon: Building2, completed: false },
    { id: 3, title: "Loan Details", icon: DollarSign, completed: false },
    { id: 4, title: "Financials", icon: FileText, completed: false },
    { id: 5, title: "Review", icon: CheckCircle, completed: false },
  ]

  const sbaLoanPrograms = [
    {
      name: "SBA 7(a) Loan",
      rate: "8.25%",
      amount: "Up to $5M",
      description: "Most common SBA loan for general business purposes",
      features: ["85% SBA guarantee", "Flexible terms", "Various uses allowed"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "SBA 504 Loan",
      rate: "7.75%",
      amount: "Up to $5.5M",
      description: "Real estate and equipment financing",
      features: ["Fixed rates", "Long-term financing", "Owner-occupied real estate"],
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "SBA Microloans",
      rate: "9.50%",
      amount: "Up to $50K",
      description: "Small loans for startups and small businesses",
      features: ["Quick approval", "Lower requirements", "Business counseling"],
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "SBA Express Loan",
      rate: "8.75%",
      amount: "Up to $500K",
      description: "Fast approval SBA loan program",
      features: ["36-hour approval", "50% SBA guarantee", "Streamlined process"],
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
    const applicationId = `SBA-${Date.now()}`
    router.push(`/citizen/loan-center/status/${applicationId}`)
  }

  const calculateMonthlyPayment = () => {
    const principal = Number(formData.loanAmount) || 250000
    const rate = 8.25 / 100 / 12
    const payments = 10 * 12 // 10 year term

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
                SBA Business Loan Application
              </h1>
              <p className="text-xl text-orange-200 mt-2">Small Business Administration guaranteed loan</p>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-2">
                <Shield className="h-4 w-4 mr-1" />
                SBA Government Guaranteed
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/citizen/loan-center/calculator")}
              className="border-orange-500/30 text-orange-300 hover:bg-orange-500/20 bg-transparent"
            >
              <Calculator className="h-4 w-4 mr-2" />
              SBA Calculator
            </Button>
          </div>
        </div>

        {/* SBA Benefits Banner */}
        <Card className="bg-gradient-to-r from-green-500/10 to-orange-500/10 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Briefcase className="h-12 w-12 text-green-400" />
              <div>
                <h3 className="text-xl font-semibold text-green-400">SBA Loan Benefits</h3>
                <p className="text-orange-200">
                  • Government guarantee reduces lender risk • Lower down payments required • Competitive interest rates
                  • Longer repayment terms available
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

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
            <TabsTrigger value="programs">SBA Programs</TabsTrigger>
            <TabsTrigger value="requirements">SBA Requirements</TabsTrigger>
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
                      SBA loans help small businesses grow and succeed
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {currentStep === 1 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-white">First Name</Label>
                          <Input
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className="bg-orange-800/30 border-orange-500/30 text-white"
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Last Name</Label>
                          <Input
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className="bg-orange-800/30 border-orange-500/30 text-white"
                            placeholder="Enter your last name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Email</Label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="bg-orange-800/30 border-orange-500/30 text-white"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Phone</Label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="bg-orange-800/30 border-orange-500/30 text-white"
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Social Security Number</Label>
                          <Input
                            value={formData.ssn}
                            onChange={(e) => handleInputChange("ssn", e.target.value)}
                            className="bg-orange-800/30 border-orange-500/30 text-white"
                            placeholder="XXX-XX-XXXX"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Date of Birth</Label>
                          <Input
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                            className="bg-orange-800/30 border-orange-500/30 text-white"
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
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
                              <option value="">Select business type</option>
                              <option value="retail">Retail</option>
                              <option value="restaurant">Restaurant</option>
                              <option value="manufacturing">Manufacturing</option>
                              <option value="service">Service</option>
                              <option value="construction">Construction</option>
                              <option value="technology">Technology</option>
                              <option value="healthcare">Healthcare</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white">Business Structure</Label>
                            <select
                              value={formData.businessStructure}
                              onChange={(e) => handleInputChange("businessStructure", e.target.value)}
                              className="w-full p-2 bg-orange-800/30 border border-orange-500/30 rounded-md text-white"
                            >
                              <option value="">Select structure</option>
                              <option value="sole-proprietorship">Sole Proprietorship</option>
                              <option value="partnership">Partnership</option>
                              <option value="llc">LLC</option>
                              <option value="corporation">Corporation</option>
                              <option value="s-corp">S-Corporation</option>
                            </select>
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
                            <Label className="text-white">Number of Employees</Label>
                            <Input
                              type="number"
                              value={formData.numberOfEmployees}
                              onChange={(e) => handleInputChange("numberOfEmployees", e.target.value)}
                              className="bg-orange-800/30 border-orange-500/30 text-white"
                              placeholder="Total employees"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Annual Revenue</Label>
                            <Input
                              type="number"
                              value={formData.annualRevenue}
                              onChange={(e) => handleInputChange("annualRevenue", e.target.value)}
                              className="bg-orange-800/30 border-orange-500/30 text-white"
                              placeholder="Annual gross revenue"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Business Address</Label>
                          <Input
                            value={formData.businessAddress}
                            onChange={(e) => handleInputChange("businessAddress", e.target.value)}
                            className="bg-orange-800/30 border-orange-500/30 text-white"
                            placeholder="Enter business address"
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white">Loan Amount</Label>
                            <Input
                              type="number"
                              value={formData.loanAmount}
                              onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                              className="bg-orange-800/30 border-orange-500/30 text-white"
                              placeholder="Enter loan amount"
                            />
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
                              <option value="real-estate">Real Estate</option>
                              <option value="expansion">Business Expansion</option>
                              <option value="refinancing">Debt Refinancing</option>
                              <option value="inventory">Inventory</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Use of Funds (detailed description)</Label>
                          <textarea
                            value={formData.useOfFunds}
                            onChange={(e) => handleInputChange("useOfFunds", e.target.value)}
                            className="w-full p-2 bg-orange-800/30 border border-orange-500/30 rounded-md text-white h-24"
                            placeholder="Describe how you will use the loan funds..."
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white">Personal Annual Income</Label>
                            <Input
                              type="number"
                              value={formData.personalIncome}
                              onChange={(e) => handleInputChange("personalIncome", e.target.value)}
                              className="bg-orange-800/30 border-orange-500/30 text-white"
                              placeholder="Your personal income"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Business Cash Flow</Label>
                            <Input
                              type="number"
                              value={formData.businessCashFlow}
                              onChange={(e) => handleInputChange("businessCashFlow", e.target.value)}
                              className="bg-orange-800/30 border-orange-500/30 text-white"
                              placeholder="Monthly business cash flow"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Available Collateral</Label>
                          <textarea
                            value={formData.collateral}
                            onChange={(e) => handleInputChange("collateral", e.target.value)}
                            className="w-full p-2 bg-orange-800/30 border border-orange-500/30 rounded-md text-white h-24"
                            placeholder="Describe available collateral (real estate, equipment, etc.)..."
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 5 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white">Review Your SBA Application</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-orange-300">Personal Information</h4>
                              <p className="text-white">
                                {formData.firstName} {formData.lastName}
                              </p>
                              <p className="text-orange-200">{formData.email}</p>
                              <p className="text-orange-200">{formData.phone}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-orange-300">Business Information</h4>
                              <p className="text-white">{formData.businessName}</p>
                              <p className="text-orange-200">
                                {formData.businessType} - {formData.businessStructure}
                              </p>
                              <p className="text-orange-200">{formData.yearsInBusiness} years in business</p>
                              <p className="text-orange-200">{formData.numberOfEmployees} employees</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-orange-300">Loan Details</h4>
                              <p className="text-white">Amount: ${Number(formData.loanAmount).toLocaleString()}</p>
                              <p className="text-orange-200">Purpose: {formData.loanPurpose}</p>
                              <p className="text-orange-200 text-sm">{formData.useOfFunds}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-orange-300">Financial Information</h4>
                              <p className="text-white">
                                Annual Revenue: ${Number(formData.annualRevenue).toLocaleString()}
                              </p>
                              <p className="text-orange-200">
                                Personal Income: ${Number(formData.personalIncome).toLocaleString()}
                              </p>
                              <p className="text-orange-200">
                                Monthly Cash Flow: ${Number(formData.businessCashFlow).toLocaleString()}
                              </p>
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
                          className="bg-gradient-to-r from-green-500 to-emerald-600"
                        >
                          Submit SBA Application
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
                      SBA Loan Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </div>
                      <div className="text-orange-200">Monthly Payment (10-year term)</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-orange-300">Loan Amount:</span>
                        <span className="text-white">${Number(formData.loanAmount || 250000).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-300">SBA Rate:</span>
                        <span className="text-white">8.25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-300">SBA Guarantee:</span>
                        <span className="text-white">Up to 85%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-300">Term:</span>
                        <span className="text-white">Up to 25 years</span>
                      </div>
                    </div>

                    <div className="bg-green-800/30 p-3 rounded-lg border border-green-500/20">
                      <p className="text-sm text-green-200">
                        <Shield className="h-4 w-4 inline mr-1" />
                        SBA Government Guarantee
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/30 backdrop-blur-sm border-orange-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="h-5 w-5 text-orange-400" />
                      SBA Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-orange-200">Government guarantee</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-orange-200">Lower down payments</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-orange-200">Competitive rates</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-orange-200">Longer repayment terms</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="programs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sbaLoanPrograms.map((program) => (
                <Card
                  key={program.name}
                  className="bg-gradient-to-br from-orange-900/50 to-red-900/30 backdrop-blur-sm border-orange-500/20 hover:border-orange-400/40 transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      {program.name}
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{program.rate}</Badge>
                    </CardTitle>
                    <CardDescription className="text-orange-200">{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-orange-300">Max Amount:</span>
                      <span className="text-white font-medium">{program.amount}</span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-white">SBA Benefits:</h4>
                      <ul className="space-y-1">
                        {program.features.map((feature, index) => (
                          <li key={index} className="text-sm text-orange-200 flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className={`w-full bg-gradient-to-r ${program.color}`}>Select SBA Program</Button>
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
                    <Building2 className="h-5 w-5 text-orange-400" />
                    Business Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Size Standards</h4>
                    <ul className="space-y-1 text-sm text-orange-200">
                      <li>• Must qualify as small business</li>
                      <li>• Based on industry size standards</li>
                      <li>• Employee count or revenue limits</li>
                      <li>• SBA size tool available</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Business Operations</h4>
                    <ul className="space-y-1 text-sm text-orange-200">
                      <li>• For-profit business</li>
                      <li>• Operating in the US</li>
                      <li>• Owner invested equity</li>
                      <li>• Exhausted other financing</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Eligible Uses</h4>
                    <ul className="space-y-1 text-sm text-orange-200">
                      <li>• Working capital</li>
                      <li>• Equipment purchase</li>
                      <li>• Real estate acquisition</li>
                      <li>• Debt refinancing</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/30 backdrop-blur-sm border-orange-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="h-5 w-5 text-orange-400" />
                    Owner Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Personal Requirements</h4>
                    <ul className="space-y-1 text-sm text-orange-200">
                      <li>• Good character and credit</li>
                      <li>• Management experience</li>
                      <li>• Personal guarantee required</li>
                      <li>• No criminal background</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Financial Requirements</h4>
                    <ul className="space-y-1 text-sm text-orange-200">
                      <li>• Adequate cash flow</li>
                      <li>• Reasonable debt-to-income</li>
                      <li>• Collateral may be required</li>
                      <li>• Personal financial statements</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Documentation</h4>
                    <ul className="space-y-1 text-sm text-orange-200">
                      <li>• Business plan required</li>
                      <li>• Financial statements</li>
                      <li>• Tax returns (3 years)</li>
                      <li>• Cash flow projections</li>
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
