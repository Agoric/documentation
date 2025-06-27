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
import { Building2, ArrowLeft, Calculator, FileText, DollarSign, User, CheckCircle, MapPin } from "lucide-react"

export default function USDALoanPage() {
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

    // Employment Information
    employer: "",
    jobTitle: "",
    employmentLength: "",
    annualIncome: "",
    householdSize: "",

    // Property Information
    propertyAddress: "",
    propertyType: "single-family",
    purchasePrice: "",

    // Loan Information
    loanAmount: "",
    loanPurpose: "purchase",
    occupancy: "primary",
  })

  const loanSteps = [
    { id: 1, title: "Personal Info", icon: User, completed: false },
    { id: 2, title: "Employment", icon: FileText, completed: false },
    { id: 3, title: "Property", icon: Building2, completed: false },
    { id: 4, title: "Loan Details", icon: DollarSign, completed: false },
    { id: 5, title: "Review", icon: CheckCircle, completed: false },
  ]

  const usdaLoanPrograms = [
    {
      name: "USDA Guaranteed Loan",
      rate: "6.75%",
      downPayment: "0%",
      description: "No down payment loan for eligible rural areas",
      features: ["0% down payment", "Low interest rates", "Rural areas only"],
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "USDA Direct Loan",
      rate: "Variable",
      downPayment: "0%",
      description: "Direct funding for very low income borrowers",
      features: ["Payment assistance available", "Very low income only", "Direct USDA funding"],
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "USDA Home Improvement",
      rate: "1%",
      downPayment: "No cash required",
      description: "Grants and loans for home improvements",
      features: ["Low interest rates", "Grant options available", "Safety improvements"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "USDA Repair Grants",
      rate: "0%",
      downPayment: "No repayment",
      description: "Grants for elderly homeowners (62+)",
      features: ["No repayment required", "Elderly homeowners", "Safety repairs only"],
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
    const applicationId = `USDA-${Date.now()}`
    router.push(`/citizen/loan-center/status/${applicationId}`)
  }

  const calculateMonthlyPayment = () => {
    const principal = Number(formData.loanAmount) || 300000
    const rate = 6.75 / 100 / 12
    const payments = 30 * 12

    if (rate === 0) return principal / payments

    return (principal * rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1)
  }

  const monthlyPayment = calculateMonthlyPayment()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-pink-950 to-purple-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                USDA Rural Loan Application
              </h1>
              <p className="text-xl text-purple-200 mt-2">Government-backed rural development loan - 0% down payment</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              <MapPin className="h-4 w-4 mr-1" />
              Rural Areas Only
            </Badge>
          </div>
        </div>

        {/* Progress Steps */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {loanSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                        currentStep >= step.id
                          ? "bg-purple-500 border-purple-500 text-white"
                          : "border-purple-500/30 text-purple-300"
                      }`}
                    >
                      <step.icon className="h-6 w-6" />
                    </div>
                    <span className="text-sm text-purple-200 mt-2">{step.title}</span>
                  </div>
                  {index < loanSteps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-4 ${currentStep > step.id ? "bg-purple-500" : "bg-purple-500/30"}`}
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
          <TabsList className="grid w-full grid-cols-3 bg-purple-900/30 backdrop-blur-sm">
            <TabsTrigger value="application">Application</TabsTrigger>
            <TabsTrigger value="programs">USDA Programs</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
          </TabsList>

          <TabsContent value="application" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Application Form */}
              <div className="lg:col-span-2">
                <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Step {currentStep}: {loanSteps[currentStep - 1]?.title}
                    </CardTitle>
                    <CardDescription className="text-purple-200">
                      Please provide the required information to continue
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
                            className="bg-purple-800/30 border-purple-500/30 text-white"
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Last Name</Label>
                          <Input
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className="bg-purple-800/30 border-purple-500/30 text-white"
                            placeholder="Enter your last name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Email</Label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="bg-purple-800/30 border-purple-500/30 text-white"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Phone</Label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="bg-purple-800/30 border-purple-500/30 text-white"
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Social Security Number</Label>
                          <Input
                            value={formData.ssn}
                            onChange={(e) => handleInputChange("ssn", e.target.value)}
                            className="bg-purple-800/30 border-purple-500/30 text-white"
                            placeholder="XXX-XX-XXXX"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Date of Birth</Label>
                          <Input
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                            className="bg-purple-800/30 border-purple-500/30 text-white"
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-white">Employer</Label>
                          <Input
                            value={formData.employer}
                            onChange={(e) => handleInputChange("employer", e.target.value)}
                            className="bg-purple-800/30 border-purple-500/30 text-white"
                            placeholder="Enter your employer"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Job Title</Label>
                          <Input
                            value={formData.jobTitle}
                            onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                            className="bg-purple-800/30 border-purple-500/30 text-white"
                            placeholder="Enter your job title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Employment Length</Label>
                          <Input
                            value={formData.employmentLength}
                            onChange={(e) => handleInputChange("employmentLength", e.target.value)}
                            className="bg-purple-800/30 border-purple-500/30 text-white"
                            placeholder="e.g., 2 years"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Annual Income</Label>
                          <Input
                            type="number"
                            value={formData.annualIncome}
                            onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                            className="bg-purple-800/30 border-purple-500/30 text-white"
                            placeholder="Enter your annual income"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Household Size</Label>
                          <Input
                            type="number"
                            value={formData.householdSize}
                            onChange={(e) => handleInputChange("householdSize", e.target.value)}
                            className="bg-purple-800/30 border-purple-500/30 text-white"
                            placeholder="Number of people in household"
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-white">Property Address (Must be in USDA eligible area)</Label>
                          <Input
                            value={formData.propertyAddress}
                            onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                            className="bg-purple-800/30 border-purple-500/30 text-white"
                            placeholder="Enter the property address"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white">Property Type</Label>
                            <select
                              value={formData.propertyType}
                              onChange={(e) => handleInputChange("propertyType", e.target.value)}
                              className="w-full p-2 bg-purple-800/30 border border-purple-500/30 rounded-md text-white"
                            >
                              <option value="single-family">Single Family Home</option>
                              <option value="townhouse">Townhouse</option>
                              <option value="manufactured">Manufactured Home</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Purchase Price</Label>
                            <Input
                              type="number"
                              value={formData.purchasePrice}
                              onChange={(e) => handleInputChange("purchasePrice", e.target.value)}
                              className="bg-purple-800/30 border-purple-500/30 text-white"
                              placeholder="Enter purchase price"
                            />
                          </div>
                        </div>
                        <div className="bg-purple-800/30 p-4 rounded-lg border border-purple-500/20">
                          <h4 className="font-medium text-white mb-2">USDA Eligibility Check</h4>
                          <p className="text-sm text-purple-200">
                            Property must be located in a USDA-eligible rural area. Use the USDA eligibility map to verify your property location before proceeding.
                          </p>
                          <Button
                            variant="outline"
                            className="mt-2 border-purple-500/30 text-purple-300 bg-transparent"
                            onClick={() => window.open("https://eligibility.sc.egov.usda.gov/eligibility/welcomeAction.do", "_blank")}
                          >
                            Check USDA Eligibility Map
                          </Button>
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
                              className="bg-purple-800/30 border-purple-500/30 text-white"
                              placeholder="Enter loan amount"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Loan Purpose</Label>
                            <select
                              value={formData.loanPurpose}
                              onChange={(e) => handleInputChange("loanPurpose", e.target.value)}
                              className="w-full p-2 bg-purple-800/30 border border-purple-500/30 rounded-md text-white"
                            >
                              <option value="purchase">Purchase</option>
                              <option value="refinance">Refinance</option>
                              <option value="improvement">Home Improvement</option>
                              <option value="repair">Home Repair</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Occupancy</Label>
                          <select
                            value={formData.occupancy}
                            onChange={(e) => handleInputChange("occupancy", e.target.value)}
                            className="w-full p-2 bg-purple-800/30 border border-purple-500/30 rounded-md text-white"
                          >
                            <option value="primary">Primary Residence</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {currentStep === 5 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white">Review Your USDA Loan Application</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-purple-300">Personal Information</h4>
                              <p className="text-white">
                                {formData.firstName} {formData.lastName}
                              </p>
                              <p className="text-purple-200">{formData.email}</p>
                              <p className="text-purple-200">{formData.phone}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-purple-300">Employment</h4>
                              <p className="text-white">
                                {formData.jobTitle} at {formData.employer}
                              </p>
                              <p className="text-purple-200">
                                Annual Income: ${Number(formData.annualIncome).toLocaleString()}
                              </p>
                              <p className="text-purple-200">Household Size: {formData.householdSize}</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-purple-300">Property</h4>
                              <p className="text-white">{formData.propertyAddress}</p>
                              <p className="text-purple-200">
                                Purchase Price: ${Number(formData.purchasePrice).toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium text-purple-300">USDA Loan Details</h4>
                              <p className="text-white">Loan Amount: ${Number(formData.loanAmount).toLocaleString()}</p>
                              <p className="text-purple-200">Purpose: {formData.loanPurpose}</p>
                              <p className="text-purple-200">Down Payment: $0 (USDA Benefit)</p>
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
                        className="border-purple-500/30 text-purple-300 bg-transparent"
                      >
                        Previous
                      </Button>
                      {currentStep < loanSteps.length ? (
                        <Button onClick={handleNextStep} className="bg-gradient-to-r from-purple-500 to-pink-600">
                          Next Step
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSubmitApplication}
                          className="bg-gradient-to-r from-purple-500 to-pink-600"
                        >
                          Submit USDA Application
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Loan Summary */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-purple-400" />
                      USDA Loan Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </div>
                      <div className="text-purple-200">Monthly Payment</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-purple-300">Loan Amount:</span>
                        <span className="text-white">${Number(formData.loanAmount || 300000).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300">Interest Rate:</span>
                        <span className="text-white">6.75%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300">Loan Term:</span>
                        <span className="text-white">30 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-\
