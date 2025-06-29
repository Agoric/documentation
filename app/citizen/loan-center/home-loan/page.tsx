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
import { Home, ArrowLeft, Calculator, FileText, DollarSign, User, CheckCircle, Shield } from "lucide-react"

export default function FHALoanPage() {
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

    // Property Information
    propertyAddress: "",
    propertyType: "single-family",
    purchasePrice: "",
    downPayment: "",

    // Loan Information
    loanAmount: "",
    loanPurpose: "purchase",
    occupancy: "primary",
  })

  const loanSteps = [
    { id: 1, title: "Personal Info", icon: User, completed: false },
    { id: 2, title: "Employment", icon: FileText, completed: false },
    { id: 3, title: "Property", icon: Home, completed: false },
    { id: 4, title: "Loan Details", icon: DollarSign, completed: false },
    { id: 5, title: "Review", icon: CheckCircle, completed: false },
  ]

  const fhaLoanPrograms = [
    {
      name: "FHA Purchase Loan",
      rate: "6.50%",
      downPayment: "3.5%",
      description: "Government-backed loan for home purchases",
      features: ["Low down payment", "Flexible credit requirements", "Government guaranteed"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "FHA Streamline Refinance",
      rate: "6.25%",
      downPayment: "N/A",
      description: "Simplified refinancing for existing FHA loans",
      features: ["No appraisal required", "Reduced documentation", "Lower payments"],
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "FHA 203(k) Renovation",
      rate: "6.75%",
      downPayment: "3.5%",
      description: "Purchase and renovate with one loan",
      features: ["Finance renovations", "Single closing", "Government backed"],
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "FHA Energy Efficient Mortgage",
      rate: "6.40%",
      downPayment: "3.5%",
      description: "Finance energy improvements",
      features: ["Energy upgrades included", "Lower utility costs", "Government guaranteed"],
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
    const applicationId = `FHA-${Date.now()}`
    router.push(`/citizen/loan-center/status/${applicationId}`)
  }

  const calculateMonthlyPayment = () => {
    const principal = Number(formData.loanAmount) || 450000
    const rate = 6.5 / 100 / 12
    const payments = 30 * 12

    if (rate === 0) return principal / payments

    const monthlyPayment = (principal * rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1)

    // Add FHA MIP (Mortgage Insurance Premium)
    const mipRate = 0.0085 / 12 // 0.85% annual MIP
    const mipPayment = principal * mipRate

    return monthlyPayment + mipPayment
  }

  const monthlyPayment = calculateMonthlyPayment()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                FHA Home Loan Application
              </h1>
              <p className="text-xl text-blue-200 mt-2">Government-guaranteed home loan with low down payment</p>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-2">
                <Shield className="h-4 w-4 mr-1" />
                FHA Government Guaranteed
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/citizen/loan-center/calculator")}
              className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
            >
              <Calculator className="h-4 w-4 mr-2" />
              FHA Calculator
            </Button>
          </div>
        </div>

        {/* FHA Benefits Banner */}
        <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Shield className="h-12 w-12 text-green-400" />
              <div>
                <h3 className="text-xl font-semibold text-green-400">FHA Loan Benefits</h3>
                <p className="text-blue-200">
                  • Only 3.5% down payment required • Credit scores as low as 580 accepted • Government backing provides
                  security • Assumable loans available
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Steps */}
        <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {loanSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                        currentStep >= step.id
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "border-blue-500/30 text-blue-300"
                      }`}
                    >
                      <step.icon className="h-6 w-6" />
                    </div>
                    <span className="text-sm text-blue-200 mt-2">{step.title}</span>
                  </div>
                  {index < loanSteps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${currentStep > step.id ? "bg-blue-500" : "bg-blue-500/30"}`} />
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
          <TabsList className="grid w-full grid-cols-3 bg-blue-900/30 backdrop-blur-sm">
            <TabsTrigger value="application">Application</TabsTrigger>
            <TabsTrigger value="programs">FHA Programs</TabsTrigger>
            <TabsTrigger value="requirements">FHA Requirements</TabsTrigger>
          </TabsList>

          <TabsContent value="application" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Application Form */}
              <div className="lg:col-span-2">
                <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Step {currentStep}: {loanSteps[currentStep - 1]?.title}
                    </CardTitle>
                    <CardDescription className="text-blue-200">
                      FHA loans are designed to help more Americans achieve homeownership
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Form steps remain the same as before but with FHA-specific messaging */}
                    {currentStep === 1 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-white">First Name</Label>
                          <Input
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className="bg-blue-800/30 border-blue-500/30 text-white"
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Last Name</Label>
                          <Input
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className="bg-blue-800/30 border-blue-500/30 text-white"
                            placeholder="Enter your last name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Email</Label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="bg-blue-800/30 border-blue-500/30 text-white"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Phone</Label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="bg-blue-800/30 border-blue-500/30 text-white"
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Social Security Number</Label>
                          <Input
                            value={formData.ssn}
                            onChange={(e) => handleInputChange("ssn", e.target.value)}
                            className="bg-blue-800/30 border-blue-500/30 text-white"
                            placeholder="XXX-XX-XXXX"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Date of Birth</Label>
                          <Input
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                            className="bg-blue-800/30 border-blue-500/30 text-white"
                          />
                        </div>
                      </div>
                    )}

                    {/* Additional form steps would continue here with similar structure */}

                    <div className="flex justify-between pt-6">
                      <Button
                        variant="outline"
                        onClick={handlePrevStep}
                        disabled={currentStep === 1}
                        className="border-blue-500/30 text-blue-300 bg-transparent"
                      >
                        Previous
                      </Button>
                      {currentStep < loanSteps.length ? (
                        <Button onClick={handleNextStep} className="bg-gradient-to-r from-blue-500 to-cyan-600">
                          Next Step
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSubmitApplication}
                          className="bg-gradient-to-r from-green-500 to-emerald-600"
                        >
                          Submit FHA Application
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Loan Summary */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-blue-400" />
                      FHA Loan Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </div>
                      <div className="text-blue-200">Monthly Payment (includes MIP)</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-blue-300">Loan Amount:</span>
                        <span className="text-white">${Number(formData.loanAmount || 450000).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">FHA Rate:</span>
                        <span className="text-white">6.50%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Down Payment:</span>
                        <span className="text-white">3.5% minimum</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">MIP (Insurance):</span>
                        <span className="text-white">0.85% annually</span>
                      </div>
                    </div>

                    <div className="bg-green-800/30 p-3 rounded-lg border border-green-500/20">
                      <p className="text-sm text-green-200">
                        <Shield className="h-4 w-4 inline mr-1" />
                        FHA Government Guarantee
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="programs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fhaLoanPrograms.map((program) => (
                <Card
                  key={program.name}
                  className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      {program.name}
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{program.rate}</Badge>
                    </CardTitle>
                    <CardDescription className="text-blue-200">{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Down Payment:</span>
                      <span className="text-white font-medium">{program.downPayment}</span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-white">FHA Benefits:</h4>
                      <ul className="space-y-1">
                        {program.features.map((feature, index) => (
                          <li key={index} className="text-sm text-blue-200 flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className={`w-full bg-gradient-to-r ${program.color}`}>Select FHA Program</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-400" />
                    FHA Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Credit Requirements</h4>
                    <ul className="space-y-1 text-sm text-blue-200">
                      <li>• Minimum credit score: 580 (3.5% down)</li>
                      <li>• Credit score 500-579 (10% down)</li>
                      <li>• 2-year bankruptcy waiting period</li>
                      <li>• 3-year foreclosure waiting period</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Income & Employment</h4>
                    <ul className="space-y-1 text-sm text-blue-200">
                      <li>• 2-year employment history</li>
                      <li>• Debt-to-income ratio max 57%</li>
                      <li>• Steady income verification</li>
                      <li>• All income sources documented</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Property Requirements</h4>
                    <ul className="space-y-1 text-sm text-blue-200">
                      <li>• Primary residence only</li>
                      <li>• FHA appraisal required</li>
                      <li>• Property must meet FHA standards</li>
                      <li>• Loan limits by county</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    FHA Advantages
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Government Backing</h4>
                    <ul className="space-y-1 text-sm text-blue-200">
                      <li>• Federal Housing Administration insured</li>
                      <li>• Lender protection against default</li>
                      <li>• Standardized underwriting guidelines</li>
                      <li>• Consumer protections included</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Flexible Terms</h4>
                    <ul className="space-y-1 text-sm text-blue-200">
                      <li>• Gift funds allowed for down payment</li>
                      <li>• Assumable loan feature</li>
                      <li>• Streamline refinance options</li>
                      <li>• No prepayment penalties</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Special Programs</h4>
                    <ul className="space-y-1 text-sm text-blue-200">
                      <li>• 203(k) renovation loans</li>
                      <li>• Energy efficient mortgages</li>
                      <li>• Manufactured home loans</li>
                      <li>• Condominium approvals</li>
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
