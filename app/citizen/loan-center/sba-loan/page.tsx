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
                            placeholder="Describe available collateral (real estate, equipment, etc.)..."\
