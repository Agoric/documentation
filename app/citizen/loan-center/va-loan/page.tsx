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
  Shield,
  ArrowLeft,
  Calculator,
  FileText,
  DollarSign,
  User,
  CheckCircle,
  TrendingUp,
  Award,
  Star,
} from "lucide-react"

export default function VALoanPage() {
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

    // Military Service
    serviceStatus: "veteran",
    branchOfService: "",
    serviceStartDate: "",
    serviceEndDate: "",
    dischargeType: "",
    vaDisability: "",

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
    { id: 2, title: "Military Service", icon: Shield, completed: false },
    { id: 3, title: "Property", icon: FileText, completed: false },
    { id: 4, title: "Loan Details", icon: DollarSign, completed: false },
    { id: 5, title: "Review", icon: CheckCircle, completed: false },
  ]

  const vaLoanPrograms = [
    {
      name: "VA Purchase Loan",
      rate: "6.00%",
      downPayment: "0%",
      description: "No down payment home purchase for veterans",
      features: ["0% down payment", "No PMI required", "Competitive rates"],
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "VA Cash-Out Refinance",
      rate: "6.25%",
      downPayment: "No cash required",
      description: "Access your home's equity with cash out",
      features: ["Cash for any purpose", "Lower rates", "No PMI"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "VA IRRRL (Streamline)",
      rate: "5.75%",
      downPayment: "No cash required",
      description: "Interest Rate Reduction Refinance Loan",
      features: ["No appraisal required", "Minimal documentation", "Lower payments"],
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "VA Native American Direct Loan",
      rate: "6.50%",
      downPayment: "0%",
      description: "Direct loans for Native American veterans",
      features: ["Tribal land eligible", "Direct VA funding", "Special provisions"],
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
    const applicationId = `VA-${Date.now()}`
    router.push(`/citizen/loan-center/status/${applicationId}`)
  }

  const calculateMonthlyPayment = () => {
    const principal = Number(formData.loanAmount) || 450000
    const rate = 6.0 / 100 / 12
    const payments = 30 * 12

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
                VA Home Loan Application
              </h1>
              <p className="text-xl text-green-200 mt-2">Exclusive benefit for military veterans - 0% down payment</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Award className="h-4 w-4 mr-1" />
              Veterans Only
            </Badge>
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
            <TabsTrigger value="programs">VA Programs</TabsTrigger>
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
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white">Service Status</Label>
                            <select
                              value={formData.serviceStatus}
                              onChange={(e) => handleInputChange("serviceStatus", e.target.value)}
                              className="w-full p-2 bg-green-800/30 border border-green-500/30 rounded-md text-white"
                            >
                              <option value="veteran">Veteran</option>
                              <option value="active-duty">Active Duty</option>
                              <option value="national-guard">National Guard</option>
                              <option value="reserves">Reserves</option>
                              <option value="surviving-spouse">Surviving Spouse</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Branch of Service</Label>
                            <select
                              value={formData.branchOfService}
                              onChange={(e) => handleInputChange("branchOfService", e.target.value)}
                              className="w-full p-2 bg-green-800/30 border border-green-500/30 rounded-md text-white"
                            >
                              <option value="">Select Branch</option>
                              <option value="army">Army</option>
                              <option value="navy">Navy</option>
                              <option value="air-force">Air Force</option>
                              <option value="marines">Marines</option>
                              <option value="coast-guard">Coast Guard</option>
                              <option value="space-force">Space Force</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white">Service Start Date</Label>
                            <Input
                              type="date"
                              value={formData.serviceStartDate}
                              onChange={(e) => handleInputChange("serviceStartDate", e.target.value)}
                              className="bg-green-800/30 border-green-500/30 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Service End Date (if applicable)</Label>
                            <Input
                              type="date"
                              value={formData.serviceEndDate}
                              onChange={(e) => handleInputChange("serviceEndDate", e.target.value)}
                              className="bg-green-800/30 border-green-500/30 text-white"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white">Discharge Type</Label>
                            <select
                              value={formData.dischargeType}
                              onChange={(e) => handleInputChange("dischargeType", e.target.value)}
                              className="w-full p-2 bg-green-800/30 border border-green-500/30 rounded-md text-white"
                            >
                              <option value="">Select Discharge Type</option>
                              <option value="honorable">Honorable</option>
                              <option value="general">General Under Honorable Conditions</option>
                              <option value="other">Other Than Honorable</option>
                              <option value="bad-conduct">Bad Conduct</option>
                              <option value="dishonorable">Dishonorable</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">VA Disability Rating (%)</Label>
                            <Input
                              type="number"
                              value={formData.vaDisability}
                              onChange={(e) => handleInputChange("vaDisability", e.target.value)}
                              className="bg-green-800/30 border-green-500/30 text-white"
                              placeholder="0-100 (if applicable)"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-white">Property Address</Label>
                          <Input
                            value={formData.propertyAddress}
                            onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                            className="bg-green-800/30 border-green-500/30 text-white"
                            placeholder="Enter the property address"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white">Property Type</Label>
                            <select
                              value={formData.propertyType}
                              onChange={(e) => handleInputChange("propertyType", e.target.value)}
                              className="w-full p-2 bg-green-800/30 border border-green-500/30 rounded-md text-white"
                            >
                              <option value="single-family">Single Family Home</option>
                              <option value="condo">Condominium</option>
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
                              className="bg-green-800/30 border-green-500/30 text-white"
                              placeholder="Enter purchase price"
                            />
                          </div>
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
                              className="bg-green-800/30 border-green-500/30 text-white"
                              placeholder="Enter loan amount"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Loan Purpose</Label>
                            <select
                              value={formData.loanPurpose}
                              onChange={(e) => handleInputChange("loanPurpose", e.target.value)}
                              className="w-full p-2 bg-green-800/30 border border-green-500/30 rounded-md text-white"
                            >
                              <option value="purchase">Purchase</option>
                              <option value="refinance">Cash-Out Refinance</option>
                              <option value="irrrl">IRRRL (Streamline)</option>
                              <option value="construction">Construction</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Occupancy</Label>
                          <select
                            value={formData.occupancy}
                            onChange={(e) => handleInputChange("occupancy", e.target.value)}
                            className="w-full p-2 bg-green-800/30 border border-green-500/30 rounded-md text-white"
                          >
                            <option value="primary">Primary Residence</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {currentStep === 5 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white">Review Your VA Loan Application</h3>
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
                              <h4 className="font-medium text-green-300">Military Service</h4>
                              <p className="text-white">
                                {formData.serviceStatus} - {formData.branchOfService}
                              </p>
                              <p className="text-green-200">Discharge: {formData.dischargeType}</p>
                              {formData.vaDisability && (
                                <p className="text-green-200">VA Disability: {formData.vaDisability}%</p>
                              )}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-green-300">Property</h4>
                              <p className="text-white">{formData.propertyAddress}</p>
                              <p className="text-green-200">
                                Purchase Price: ${Number(formData.purchasePrice).toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium text-green-300">VA Loan Details</h4>
                              <p className="text-white">Loan Amount: ${Number(formData.loanAmount).toLocaleString()}</p>
                              <p className="text-green-200">Purpose: {formData.loanPurpose}</p>
                              <p className="text-green-200">Down Payment: $0 (VA Benefit)</p>
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
                          Submit VA Application
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
                      VA Loan Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </div>
                      <div className="text-green-200">Monthly Payment (No PMI)</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-green-300">Loan Amount:</span>
                        <span className="text-white">${Number(formData.loanAmount || 450000).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-300">Interest Rate:</span>
                        <span className="text-white">6.00%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-300">Loan Term:</span>
                        <span className="text-white">30 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-300">Down Payment:</span>
                        <span className="text-white">$0 (VA Benefit)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-300">PMI:</span>
                        <span className="text-white">None Required</span>
                      </div>
                    </div>

                    <div className="bg-green-800/30 p-3 rounded-lg border border-green-500/20">
                      <p className="text-sm text-green-200">
                        <Award className="h-4 w-4 inline mr-1" />
                        VA Loan Guarantee Protection
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 backdrop-blur-sm border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Star className="h-5 w-5 text-green-400" />
                      VA Loan Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-green-200">0% down payment required</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-green-200">No private mortgage insurance</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-green-200">No prepayment penalty</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-green-200">Assumable loan benefit</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="programs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vaLoanPrograms.map((program) => (
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
                      <span className="text-green-300">Down Payment:</span>
                      <span className="text-white font-medium">{program.downPayment}</span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-white">VA Benefits:</h4>
                      <ul className="space-y-1">
                        {program.features.map((feature, index) => (
                          <li key={index} className="text-sm text-green-200 flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className={`w-full bg-gradient-to-r ${program.color}`}>Select VA Program</Button>
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
                    VA Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Military Documentation</h4>
                    <ul className="space-y-1 text-sm text-green-200">
                      <li>• Certificate of Eligibility (COE)</li>
                      <li>• DD Form 214 (discharge papers)</li>
                      <li>• Statement of Service (if active duty)</li>
                      <li>• VA disability award letter (if applicable)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Income Verification</h4>
                    <ul className="space-y-1 text-sm text-green-200">
                      <li>• Pay stubs (last 30 days)</li>
                      <li>• Tax returns (last 2 years)</li>
                      <li>• W-2 forms (last 2 years)</li>
                      <li>• Employment verification letter</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Asset Documentation</h4>
                    <ul className="space-y-1 text-sm text-green-200">
                      <li>• Bank statements (last 2 months)</li>
                      <li>• Investment account statements</li>
                      <li>• Asset verification for closing costs</li>
                      <li>• Gift letter (if applicable)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 backdrop-blur-sm border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    VA Eligibility Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Service Requirements</h4>
                    <ul className="space-y-1 text-sm text-green-200">
                      <li>• 90+ days active duty during wartime</li>
                      <li>• 181+ days active duty during peacetime</li>
                      <li>• 6+ years National Guard/Reserves</li>
                      <li>• Surviving spouse of eligible veteran</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Credit & Income</h4>
                    <ul className="space-y-1 text-sm text-green-200">
                      <li>• No minimum credit score requirement</li>
                      <li>• Sufficient income to support payments</li>
                      <li>• Satisfactory credit history</li>
                      <li>• Debt-to-income ratio typically under 41%</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Property Requirements</h4>
                    <ul className="space-y-1 text-sm text-green-200">
                      <li>• Primary residence only</li>
                      <li>• VA appraisal required</li>
                      <li>• Property must meet VA standards</li>
                      <li>• No loan limits in most areas</li>
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
