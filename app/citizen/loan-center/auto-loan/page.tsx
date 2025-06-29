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
  Car,
  ArrowLeft,
  Calculator,
  FileText,
  DollarSign,
  User,
  CheckCircle,
  Clock,
  TrendingUp,
  Shield,
} from "lucide-react"

export default function AutoLoanPage() {
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
    annualIncome: "",
    employmentLength: "",

    // Vehicle Information
    vehicleType: "new",
    make: "",
    model: "",
    year: "",
    vin: "",
    mileage: "",
    purchasePrice: "",
    downPayment: "",
    tradeInValue: "",

    // Loan Information
    loanAmount: "",
    loanTerm: "60",
  })

  const loanSteps = [
    { id: 1, title: "Personal Info", icon: User, completed: false },
    { id: 2, title: "Employment", icon: FileText, completed: false },
    { id: 3, title: "Vehicle Info", icon: Car, completed: false },
    { id: 4, title: "Loan Details", icon: DollarSign, completed: false },
    { id: 5, title: "Review", icon: CheckCircle, completed: false },
  ]

  const autoLoanPrograms = [
    {
      name: "New Vehicle Loan",
      rate: "4.75%",
      term: "12-84 months",
      description: "Financing for brand new vehicles",
      features: ["Competitive rates", "Extended terms", "No prepayment penalty"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Used Vehicle Loan",
      rate: "5.25%",
      term: "12-72 months",
      description: "Financing for pre-owned vehicles",
      features: ["Flexible terms", "Quick approval", "Vehicles up to 10 years old"],
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Certified Pre-Owned",
      rate: "4.99%",
      term: "12-75 months",
      description: "Special rates for certified vehicles",
      features: ["Lower rates", "Extended warranty", "Manufacturer certified"],
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Refinance Loan",
      rate: "4.50%",
      term: "12-72 months",
      description: "Refinance your existing auto loan",
      features: ["Lower payments", "Better rates", "Cash out option"],
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
    const applicationId = `AUTO-${Date.now()}`
    router.push(`/citizen/loan-center/status/${applicationId}`)
  }

  const calculateMonthlyPayment = () => {
    const principal = Number(formData.loanAmount) || 35000
    const rate = 4.75 / 100 / 12
    const payments = Number(formData.loanTerm) || 60

    if (rate === 0) return principal / payments

    return (principal * rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1)
  }

  const monthlyPayment = calculateMonthlyPayment()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-emerald-950 to-green-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="border-green-500/30 text-green-300 hover:bg-green-500/20 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                Auto Loan Application
              </h1>
              <p className="text-xl text-green-200 mt-2">Finance your next vehicle with competitive rates</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/citizen/loan-center/calculator")}
              className="border-green-500/30 text-green-300 hover:bg-green-500/20 bg-transparent"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Payment Calculator
            </Button>
          </div>
        </div>

        {/* Progress Steps */}
        <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 backdrop-blur-sm border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {loanSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                        currentStep >= step.id
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-green-500/30 text-green-300"
                      }`}
                    >
                      <step.icon className="h-6 w-6" />
                    </div>
                    <span className="text-sm text-green-200 mt-2">{step.title}</span>
                  </div>
                  {index < loanSteps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${currentStep > step.id ? "bg-green-500" : "bg-green-500/30"}`} />
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
          <TabsList className="grid w-full grid-cols-3 bg-green-900/30 backdrop-blur-sm">
            <TabsTrigger value="application">Application</TabsTrigger>
            <TabsTrigger value="programs">Loan Programs</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
          </TabsList>

          <TabsContent value="application" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Application Form */}
              <div className="lg:col-span-2">
                <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 backdrop-blur-sm border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Step {currentStep}: {loanSteps[currentStep - 1]?.title}
                    </CardTitle>
                    <CardDescription className="text-green-200">
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
                            className="bg-green-800/30 border-green-500/30 text-white"
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Last Name</Label>
                          <Input
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className="bg-green-800/30 border-green-500/30 text-white"
                            placeholder="Enter your last name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Email</Label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="bg-green-800/30 border-green-500/30 text-white"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Phone</Label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="bg-green-800/30 border-green-500/30 text-white"
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Social Security Number</Label>
                          <Input
                            value={formData.ssn}
                            onChange={(e) => handleInputChange("ssn", e.target.value)}
                            className="bg-green-800/30 border-green-500/30 text-white"
                            placeholder="XXX-XX-XXXX"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Date of Birth</Label>
                          <Input
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                            className="bg-green-800/30 border-green-500/30 text-white"
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
                            className="bg-green-800/30 border-green-500/30 text-white"
                            placeholder="Enter your employer"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Job Title</Label>
                          <Input
                            value={formData.jobTitle}
                            onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                            className="bg-green-800/30 border-green-500/30 text-white"
                            placeholder="Enter your job title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Annual Income</Label>
                          <Input
                            type="number"
                            value={formData.annualIncome}
                            onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                            className="bg-green-800/30 border-green-500/30 text-white"
                            placeholder="Enter your annual income"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Employment Length</Label>
                          <Input
                            value={formData.employmentLength}
                            onChange={(e) => handleInputChange("employmentLength", e.target.value)}
                            className="bg-green-800/30 border-green-500/30 text-white"
                            placeholder="e.g., 2 years"
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-white">Vehicle Type</Label>
                          <select
                            value={formData.vehicleType}
                            onChange={(e) => handleInputChange("vehicleType", e.target.value)}
                            className="w-full p-2 bg-green-800/30 border border-green-500/30 rounded-md text-white"
                          >
                            <option value="new">New Vehicle</option>
                            <option value="used">Used Vehicle</option>
                            <option value="certified">Certified Pre-Owned</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white">Make</Label>
                            <Input
                              value={formData.make}
                              onChange={(e) => handleInputChange("make", e.target.value)}
                              className="bg-green-800/30 border-green-500/30 text-white"
                              placeholder="e.g., Toyota"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Model</Label>
                            <Input
                              value={formData.model}
                              onChange={(e) => handleInputChange("model", e.target.value)}
                              className="bg-green-800/30 border-green-500/30 text-white"
                              placeholder="e.g., Camry"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Year</Label>
                            <Input
                              type="number"
                              value={formData.year}
                              onChange={(e) => handleInputChange("year", e.target.value)}
                              className="bg-green-800/30 border-green-500/30 text-white"
                              placeholder="e.g., 2024"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white">VIN (if available)</Label>
                            <Input
                              value={formData.vin}
                              onChange={(e) => handleInputChange("vin", e.target.value)}
                              className="bg-green-800/30 border-green-500/30 text-white"
                              placeholder="17-character VIN"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Mileage</Label>
                            <Input
                              type="number"
                              value={formData.mileage}
                              onChange={(e) => handleInputChange("mileage", e.target.value)}
                              className="bg-green-800/30 border-green-500/30 text-white"
                              placeholder="Current mileage"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white">Purchase Price</Label>
                            <Input
                              type="number"
                              value={formData.purchasePrice}
                              onChange={(e) => handleInputChange("purchasePrice", e.target.value)}
                              className="bg-green-800/30 border-green-500/30 text-white"
                              placeholder="Vehicle price"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Trade-In Value</Label>
                            <Input
                              type="number"
                              value={formData.tradeInValue}
                              onChange={(e) => handleInputChange("tradeInValue", e.target.value)}
                              className="bg-green-800/30 border-green-500/30 text-white"
                              placeholder="Trade-in value (optional)"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white">Down Payment</Label>
                            <Input
                              type="number"
                              value={formData.downPayment}
                              onChange={(e) => handleInputChange("downPayment", e.target.value)}
                              className="bg-green-800/30 border-green-500/30 text-white"
                              placeholder="Down payment amount"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Loan Term</Label>
                            <select
                              value={formData.loanTerm}
                              onChange={(e) => handleInputChange("loanTerm", e.target.value)}
                              className="w-full p-2 bg-green-800/30 border border-green-500/30 rounded-md text-white"
                            >
                              <option value="36">36 months</option>
                              <option value="48">48 months</option>
                              <option value="60">60 months</option>
                              <option value="72">72 months</option>
                              <option value="84">84 months</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Loan Amount</Label>
                          <Input
                            type="number"
                            value={formData.loanAmount}
                            onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                            className="bg-green-800/30 border-green-500/30 text-white"
                            placeholder="Amount to finance"
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 5 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white">Review Your Application</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-green-300">Personal Information</h4>
                              <p className="text-white">
                                {formData.firstName} {formData.lastName}
                              </p>
                              <p className="text-green-200">{formData.email}</p>
                              <p className="text-green-200">{formData.phone}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-green-300">Employment</h4>
                              <p className="text-white">
                                {formData.jobTitle} at {formData.employer}
                              </p>
                              <p className="text-green-200">
                                Annual Income: ${Number(formData.annualIncome).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-green-300">Vehicle</h4>
                              <p className="text-white">
                                {formData.year} {formData.make} {formData.model}
                              </p>
                              <p className="text-green-200">
                                Purchase Price: ${Number(formData.purchasePrice).toLocaleString()}
                              </p>
                              <p className="text-green-200">
                                Down Payment: ${Number(formData.downPayment).toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium text-green-300">Loan Details</h4>
                              <p className="text-white">Loan Amount: ${Number(formData.loanAmount).toLocaleString()}</p>
                              <p className="text-green-200">Term: {formData.loanTerm} months</p>
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
                        className="border-green-500/30 text-green-300 bg-transparent"
                      >
                        Previous
                      </Button>
                      {currentStep < loanSteps.length ? (
                        <Button onClick={handleNextStep} className="bg-gradient-to-r from-green-500 to-emerald-600">
                          Next Step
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSubmitApplication}
                          className="bg-gradient-to-r from-green-500 to-emerald-600"
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
                <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 backdrop-blur-sm border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-green-400" />
                      Loan Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </div>
                      <div className="text-green-200">Estimated Monthly Payment</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-green-300">Loan Amount:</span>
                        <span className="text-white">${Number(formData.loanAmount || 35000).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-300">Interest Rate:</span>
                        <span className="text-white">4.75%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-300">Loan Term:</span>
                        <span className="text-white">{formData.loanTerm || 60} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-300">Down Payment:</span>
                        <span className="text-white">${Number(formData.downPayment || 5000).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="bg-green-800/30 p-3 rounded-lg border border-green-500/20">
                      <p className="text-sm text-green-200">
                        <Shield className="h-4 w-4 inline mr-1" />
                        Pre-approval available in 24 hours
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 backdrop-blur-sm border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Clock className="h-5 w-5 text-green-400" />
                      Next Steps
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-green-200">Submit application</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-green-400" />
                      <span className="text-green-200">Credit check & verification</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span className="text-green-200">Vehicle inspection</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span className="text-green-200">Final approval & funding</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="programs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {autoLoanPrograms.map((program) => (
                <Card
                  key={program.name}
                  className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 backdrop-blur-sm border-green-500/20 hover:border-green-400/40 transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      {program.name}
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{program.rate}</Badge>
                    </CardTitle>
                    <CardDescription className="text-green-200">{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-green-300">Loan Terms:</span>
                      <span className="text-white font-medium">{program.term}</span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-white">Key Features:</h4>
                      <ul className="space-y-1">
                        {program.features.map((feature, index) => (
                          <li key={index} className="text-sm text-green-200 flex items-center gap-2">
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
              <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 backdrop-blur-sm border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-400" />
                    Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Income Verification</h4>
                    <ul className="space-y-1 text-sm text-green-200">
                      <li>• Pay stubs (last 2 months)</li>
                      <li>• Tax returns (last year)</li>
                      <li>• Employment verification letter</li>
                      <li>• Bank statements (last 3 months)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Vehicle Documentation</h4>
                    <ul className="space-y-1 text-sm text-green-200">
                      <li>• Vehicle title (if trade-in)</li>
                      <li>• Registration documents</li>
                      <li>• Insurance information</li>
                      <li>• Purchase agreement</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Identification</h4>
                    <ul className="space-y-1 text-sm text-green-200">
                      <li>• Driver's license</li>
                      <li>• Social Security card</li>
                      <li>• Proof of residence</li>
                      <li>• References (if needed)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 backdrop-blur-sm border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    Qualification Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Credit Requirements</h4>
                    <ul className="space-y-1 text-sm text-green-200">
                      <li>• Minimum credit score: 580</li>
                      <li>• Stable credit history</li>
                      <li>• No recent repossessions</li>
                      <li>• Debt-to-income ratio below 40%</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Employment History</h4>
                    <ul className="space-y-1 text-sm text-green-200">
                      <li>• 1+ years employment history</li>
                      <li>• Stable income source</li>
                      <li>• Current employment verification</li>
                      <li>• Minimum monthly income: $2,000</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Vehicle Requirements</h4>
                    <ul className="space-y-1 text-sm text-green-200">
                      <li>• Vehicle age: 15 years or newer</li>
                      <li>• Mileage: Under 150,000 miles</li>
                      <li>• Clean title required</li>
                      <li>• Comprehensive insurance required</li>
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
