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
  Home,
  ArrowLeft,
  Calculator,
  FileText,
  DollarSign,
  User,
  CheckCircle,
  Shield,
  MapPin,
  Target,
} from "lucide-react"

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
    downPayment: "0",

    // Loan Information
    loanAmount: "",
    loanPurpose: "purchase",
    occupancy: "primary",
  })

  const loanSteps = [
    { id: 1, title: "Personal Info", icon: User, completed: false },
    { id: 2, title: "Employment", icon: FileText, completed: false },
    { id: 3, title: "Property", icon: Home, completed: false },
    { id: 4, title: "Income Verification", icon: DollarSign, completed: false },
    { id: 5, title: "Review", icon: CheckCircle, completed: false },
  ]

  const usdaLoanPrograms = [
    {
      name: "USDA Direct Loan",
      rate: "Variable",
      downPayment: "0%",
      description: "Direct funding from USDA for low-income applicants",
      features: ["Payment assistance available", "Income-based payments", "Direct USDA funding"],
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "USDA Guaranteed Loan",
      rate: "6.75%",
      downPayment: "0%",
      description: "USDA-backed loan through approved lenders",
      features: ["No down payment", "Competitive rates", "Private lender funding"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "USDA Home Improvement",
      rate: "1.00%",
      downPayment: "N/A",
      description: "Grants and loans for home repairs",
      features: ["Very low interest", "Grant options available", "Health/safety improvements"],
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "USDA Refinance",
      rate: "6.50%",
      downPayment: "N/A",
      description: "Refinance existing USDA loans",
      features: ["Streamlined process", "Lower payments", "Cash-out options"],
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

    const monthlyPayment = (principal * rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1)

    // Add USDA guarantee fee (1% upfront, 0.35% annual)
    const guaranteeFee = (principal * 0.0035) / 12

    return monthlyPayment + guaranteeFee
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
              <p className="text-xl text-purple-200 mt-2">Rural development loan program for eligible areas</p>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-2">
                <Shield className="h-4 w-4 mr-1" />
                USDA Government Guaranteed
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/citizen/loan-center/calculator")}
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20 bg-transparent"
            >
              <Calculator className="h-4 w-4 mr-2" />
              USDA Calculator
            </Button>
          </div>
        </div>

        {/* USDA Benefits Banner */}
        <Card className="bg-gradient-to-r from-green-500/10 to-purple-500/10 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Target className="h-12 w-12 text-green-400" />
              <div>
                <h3 className="text-xl font-semibold text-green-400">USDA Rural Development Benefits</h3>
                <p className="text-purple-200">
                  • No down payment required • Rural and suburban eligible areas • Income limits apply • Government
                  backing provides security
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

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
            <TabsTrigger value="eligibility">USDA Eligibility</TabsTrigger>
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
                      USDA loans help rural communities achieve homeownership
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

                    {currentStep === 4 && (
                      <div className="space-y-4">
                        <div className="bg-purple-800/30 p-4 rounded-lg border border-purple-500/20">
                          <h4 className="font-medium text-white mb-2">USDA Income Limits</h4>
                          <p className="text-sm text-purple-200 mb-3">
                            Your household income must not exceed 115% of the median income for your area.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white">Annual Household Income</Label>
                            <Input
                              type="number"
                              value={formData.annualIncome}
                              onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                              className="bg-purple-800/30 border-purple-500/30 text-white"
                              placeholder="Enter total household income"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Household Size</Label>
                            <select
                              value={formData.householdSize}
                              onChange={(e) => handleInputChange("householdSize", e.target.value)}
                              className="w-full p-2 bg-purple-800/30 border border-purple-500/30 rounded-md text-white"
                            >
                              <option value="">Select household size</option>
                              <option value="1">1 person</option>
                              <option value="2">2 people</option>
                              <option value="3">3 people</option>
                              <option value="4">4 people</option>
                              <option value="5">5 people</option>
                              <option value="6">6 people</option>
                              <option value="7">7 people</option>
                              <option value="8">8+ people</option>
                            </select>
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
                          className="bg-gradient-to-r from-green-500 to-emerald-600"
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
                      <div className="text-purple-200">Monthly Payment (includes guarantee fee)</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-purple-300">Loan Amount:</span>
                        <span className="text-white">${Number(formData.loanAmount || 300000).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300">USDA Rate:</span>
                        <span className="text-white">6.75%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300">Down Payment:</span>
                        <span className="text-white">$0 (0%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300">Guarantee Fee:</span>
                        <span className="text-white">0.35% annually</span>
                      </div>
                    </div>

                    <div className="bg-green-800/30 p-3 rounded-lg border border-green-500/20">
                      <p className="text-sm text-green-200">
                        <Shield className="h-4 w-4 inline mr-1" />
                        USDA Government Guarantee
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-purple-400" />
                      Rural Eligibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-purple-200">Rural and suburban areas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-purple-200">Population under 35,000</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-purple-200">Income limits apply</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-purple-200">Primary residence only</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="programs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {usdaLoanPrograms.map((program) => (
                <Card
                  key={program.name}
                  className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      {program.name}
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{program.rate}</Badge>
                    </CardTitle>
                    <CardDescription className="text-purple-200">{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-300">Down Payment:</span>
                      <span className="text-white font-medium">{program.downPayment}</span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-white">USDA Benefits:</h4>
                      <ul className="space-y-1">
                        {program.features.map((feature, index) => (
                          <li key={index} className="text-sm text-purple-200 flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className={`w-full bg-gradient-to-r ${program.color}`}>Select USDA Program</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="eligibility" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-purple-400" />
                    Geographic Eligibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Eligible Areas</h4>
                    <ul className="space-y-1 text-sm text-purple-200">
                      <li>• Rural areas with population under 35,000</li>
                      <li>• Some suburban areas qualify</li>
                      <li>• Check USDA eligibility map</li>
                      <li>• Most areas outside major cities</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Property Requirements</h4>
                    <ul className="space-y-1 text-sm text-purple-200">
                      <li>• Primary residence only</li>
                      <li>• Modest home size and cost</li>
                      <li>• Safe, sanitary, and structurally sound</li>
                      <li>• Cannot have in-ground swimming pool</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Occupancy</h4>
                    <ul className="space-y-1 text-sm text-purple-200">
                      <li>• Must be primary residence</li>
                      <li>• Cannot be investment property</li>
                      <li>• Cannot be vacation home</li>
                      <li>• Must occupy within 60 days</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-purple-400" />
                    Income & Credit Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Income Limits</h4>
                    <ul className="space-y-1 text-sm text-purple-200">
                      <li>• Cannot exceed 115% of median income</li>
                      <li>• Based on household size and location</li>
                      <li>• All household income counted</li>
                      <li>• Adjusted for family size</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Credit Requirements</h4>
                    <ul className="space-y-1 text-sm text-purple-200">
                      <li>• Minimum 640 credit score preferred</li>
                      <li>• Lower scores may qualify with compensating factors</li>
                      <li>• 12-month payment history required</li>
                      <li>• Debt-to-income ratio limits apply</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Employment</h4>
                    <ul className="space-y-1 text-sm text-purple-200">
                      <li>• Stable employment history</li>
                      <li>• 2-year employment verification</li>
                      <li>• Self-employed income acceptable</li>
                      <li>• Retirement income counts</li>
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
