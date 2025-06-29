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
  CreditCard,
  ArrowLeft,
  Calculator,
  FileText,
  DollarSign,
  User,
  CheckCircle,
  TrendingUp,
  Shield,
  Target,
} from "lucide-react"

export default function PersonalLoanPage() {
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

    // Loan Information
    loanAmount: "",
    loanPurpose: "debt-consolidation",
    loanTerm: "36",

    // Financial Information
    monthlyRent: "",
    monthlyDebt: "",
    bankAccount: "",
  })

  const loanSteps = [
    { id: 1, title: "Personal Info", icon: User, completed: false },
    { id: 2, title: "Employment", icon: FileText, completed: false },
    { id: 3, title: "Loan Details", icon: DollarSign, completed: false },
    { id: 4, title: "Financial Info", icon: CreditCard, completed: false },
    { id: 5, title: "Review", icon: CheckCircle, completed: false },
  ]

  const personalLoanPrograms = [
    {
      name: "Debt Consolidation",
      rate: "8.99%",
      amount: "Up to $50,000",
      description: "Combine multiple debts into one payment",
      features: ["Lower interest rates", "Single monthly payment", "No collateral required"],
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Home Improvement",
      rate: "9.49%",
      amount: "Up to $40,000",
      description: "Finance your home renovation projects",
      features: ["Fixed rates", "Quick funding", "No home equity required"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Major Purchase",
      rate: "10.99%",
      amount: "Up to $35,000",
      description: "Finance large purchases or expenses",
      features: ["Flexible terms", "Fast approval", "No restrictions on use"],
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Emergency Expenses",
      rate: "11.99%",
      amount: "Up to $25,000",
      description: "Quick funding for unexpected expenses",
      features: ["Same-day approval", "Emergency funding", "Minimal documentation"],
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
    const applicationId = `PERSONAL-${Date.now()}`
    router.push(`/citizen/loan-center/status/${applicationId}`)
  }

  const calculateMonthlyPayment = () => {
    const principal = Number(formData.loanAmount) || 15000
    const rate = 8.99 / 100 / 12
    const payments = Number(formData.loanTerm) || 36

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
                Personal Loan Application
              </h1>
              <p className="text-xl text-purple-200 mt-2">Flexible financing for your personal needs</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/citizen/loan-center/calculator")}
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20 bg-transparent"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Payment Calculator
            </Button>
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
            <TabsTrigger value="programs">Loan Programs</TabsTrigger>
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
                          <Label className="text-white">Employment Length</Label>
                          <Input
                            value={formData.employmentLength}
                            onChange={(e) => handleInputChange("employmentLength", e.target.value)}
                            className="bg-purple-800/30 border-purple-500/30 text-white"
                            placeholder="e.g., 2 years"
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
                              className="bg-purple-800/30 border-purple-500/30 text-white"
                              placeholder="Amount needed"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Loan Term</Label>
                            <select
                              value={formData.loanTerm}
                              onChange={(e) => handleInputChange("loanTerm", e.target.value)}
                              className="w-full p-2 bg-purple-800/30 border border-purple-500/30 rounded-md text-white"
                            >
                              <option value="24">24 months</option>
                              <option value="36">36 months</option>
                              <option value="48">48 months</option>
                              <option value="60">60 months</option>
                              <option value="72">72 months</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Loan Purpose</Label>
                          <select
                            value={formData.loanPurpose}
                            onChange={(e) => handleInputChange("loanPurpose", e.target.value)}
                            className="w-full p-2 bg-purple-800/30 border border-purple-500/30 rounded-md text-white"
                          >
                            <option value="debt-consolidation">Debt Consolidation</option>
                            <option value="home-improvement">Home Improvement</option>
                            <option value="major-purchase">Major Purchase</option>
                            <option value="medical-expenses">Medical Expenses</option>
                            <option value="vacation">Vacation</option>
                            <option value="wedding">Wedding</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-white">Monthly Rent/Mortgage</Label>
                          <Input
                            type="number"
                            value={formData.monthlyRent}
                            onChange={(e) => handleInputChange("monthlyRent", e.target.value)}
                            className="bg-purple-800/30 border-purple-500/30 text-white"
                            placeholder="Monthly housing payment"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Monthly Debt Payments</Label>
                          <Input
                            type="number"
                            value={formData.monthlyDebt}
                            onChange={(e) => handleInputChange("monthlyDebt", e.target.value)}
                            className="bg-purple-800/30 border-purple-500/30 text-white"
                            placeholder="Total monthly debt payments"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label className="text-white">Primary Bank Account</Label>
                          <Input
                            value={formData.bankAccount}
                            onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                            className="bg-purple-800/30 border-purple-500/30 text-white"
                            placeholder="Bank name and account type"
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
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-purple-300">Loan Details</h4>
                              <p className="text-white">Amount: ${Number(formData.loanAmount).toLocaleString()}</p>
                              <p className="text-purple-200">Purpose: {formData.loanPurpose.replace("-", " ")}</p>
                              <p className="text-purple-200">Term: {formData.loanTerm} months</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-purple-300">Financial Info</h4>
                              <p className="text-white">
                                Monthly Housing: ${Number(formData.monthlyRent).toLocaleString()}
                              </p>
                              <p className="text-purple-200">
                                Monthly Debt: ${Number(formData.monthlyDebt).toLocaleString()}
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
                          Submit Application
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
                      Loan Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </div>
                      <div className="text-purple-200">Estimated Monthly Payment</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-purple-300">Loan Amount:</span>
                        <span className="text-white">${Number(formData.loanAmount || 15000).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300">Interest Rate:</span>
                        <span className="text-white">8.99%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300">Loan Term:</span>
                        <span className="text-white">{formData.loanTerm || 36} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300">Purpose:</span>
                        <span className="text-white">{formData.loanPurpose.replace("-", " ")}</span>
                      </div>
                    </div>

                    <div className="bg-purple-800/30 p-3 rounded-lg border border-purple-500/20">
                      <p className="text-sm text-purple-200">
                        <Shield className="h-4 w-4 inline mr-1" />
                        No collateral required
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-400" />
                      Loan Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-purple-200">Fixed interest rate</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-purple-200">No prepayment penalty</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-purple-200">Quick funding</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-purple-200">No collateral required</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="programs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personalLoanPrograms.map((program) => (
                <Card
                  key={program.name}
                  className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      {program.name}
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">{program.rate}</Badge>
                    </CardTitle>
                    <CardDescription className="text-purple-200">{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-300">Loan Amount:</span>
                      <span className="text-white font-medium">{program.amount}</span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-white">Key Features:</h4>
                      <ul className="space-y-1">
                        {program.features.map((feature, index) => (
                          <li key={index} className="text-sm text-purple-200 flex items-center gap-2">
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
              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-400" />
                    Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Income Verification</h4>
                    <ul className="space-y-1 text-sm text-purple-200">
                      <li>• Pay stubs (last 2 months)</li>
                      <li>• Tax returns (last year)</li>
                      <li>• Bank statements (last 3 months)</li>
                      <li>• Employment verification letter</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Identification</h4>
                    <ul className="space-y-1 text-sm text-purple-200">
                      <li>• Driver's license or state ID</li>
                      <li>• Social Security card</li>
                      <li>• Proof of address</li>
                      <li>• Contact references</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Financial Information</h4>
                    <ul className="space-y-1 text-sm text-purple-200">
                      <li>• Credit report authorization</li>
                      <li>• Debt statements</li>
                      <li>• Asset documentation</li>
                      <li>• Expense verification</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-400" />
                    Qualification Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Credit Requirements</h4>
                    <ul className="space-y-1 text-sm text-purple-200">
                      <li>• Minimum credit score: 600</li>
                      <li>• No recent bankruptcies</li>
                      <li>• Stable credit history</li>
                      <li>• Debt-to-income ratio below 45%</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Income Requirements</h4>
                    <ul className="space-y-1 text-sm text-purple-200">
                      <li>• Minimum annual income: $25,000</li>
                      <li>• Stable employment history</li>
                      <li>• Verifiable income source</li>
                      <li>• Current employment verification</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">General Requirements</h4>
                    <ul className="space-y-1 text-sm text-purple-200">
                      <li>• Age 18 or older</li>
                      <li>• US citizen or permanent resident</li>
                      <li>• Valid bank account</li>
                      <li>• Contactable references</li>
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
