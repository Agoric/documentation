"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import {
  Calculator,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Shield,
  Home,
  Users,
  Building2,
  ArrowRight,
  FileText,
} from "lucide-react"

interface PreQualificationToolProps {
  onComplete?: (results: any) => void
}

export function PreQualificationTool({ onComplete }: PreQualificationToolProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",

    // Financial Information
    annualIncome: "",
    monthlyDebt: "",
    employmentStatus: "",
    employmentYears: "",
    creditScore: "",
    assets: "",

    // Loan Preferences
    loanType: "",
    purchasePrice: "",
    downPayment: "",
    propertyType: "",
    propertyLocation: "",

    // Military/Special Status
    militaryStatus: "",
    firstTimeHomeBuyer: "",
    ruralProperty: "",
  })

  const [qualificationResults, setQualificationResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const loanTypes = [
    {
      id: "fha",
      name: "FHA Loan",
      icon: Home,
      color: "from-blue-500 to-cyan-500",
      minDown: 3.5,
      minCredit: 580,
      description: "Low down payment, flexible credit",
      benefits: ["3.5% down payment", "Credit scores from 580", "Government backing"],
    },
    {
      id: "va",
      name: "VA Loan",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      minDown: 0,
      minCredit: 620,
      description: "Military exclusive, no down payment",
      benefits: ["0% down payment", "No PMI required", "Competitive rates"],
      requiresMilitary: true,
    },
    {
      id: "usda",
      name: "USDA Loan",
      icon: Building2,
      color: "from-orange-500 to-red-500",
      minDown: 0,
      minCredit: 640,
      description: "Rural properties, no down payment",
      benefits: ["0% down payment", "Below-market rates", "Income limits apply"],
      requiresRural: true,
    },
    {
      id: "sba",
      name: "SBA Loan",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      minDown: 10,
      minCredit: 680,
      description: "Business loans with government guarantee",
      benefits: ["Up to 85% guarantee", "Long repayment terms", "Business focused"],
      isBusiness: true,
    },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      calculateQualification()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const calculateQualification = async () => {
    setIsCalculating(true)

    // Simulate calculation delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const income = Number(formData.annualIncome)
    const debt = Number(formData.monthlyDebt)
    const creditScore = Number(formData.creditScore)
    const assets = Number(formData.assets)

    // Calculate debt-to-income ratio
    const monthlyIncome = income / 12
    const dti = (debt / monthlyIncome) * 100

    // Determine qualification for each loan type
    const qualifications = loanTypes.map((loan) => {
      let qualified = true
      const reasons = []
      let maxLoanAmount = 0
      let estimatedRate = 6.5

      // Check credit score
      if (creditScore < loan.minCredit) {
        qualified = false
        reasons.push(`Credit score below minimum ${loan.minCredit}`)
      }

      // Check DTI (generally should be below 43%)
      if (dti > 43) {
        qualified = false
        reasons.push("Debt-to-income ratio too high")
      }

      // Check military status for VA loans
      if (loan.requiresMilitary && formData.militaryStatus !== "active" && formData.militaryStatus !== "veteran") {
        qualified = false
        reasons.push("Military service required")
      }

      // Check rural property for USDA
      if (loan.requiresRural && formData.ruralProperty !== "yes") {
        qualified = false
        reasons.push("Property must be in eligible rural area")
      }

      // Calculate max loan amount (simplified)
      if (qualified) {
        const maxMonthlyPayment = monthlyIncome * 0.28 - debt // 28% front-end ratio
        maxLoanAmount = (maxMonthlyPayment * 12 * 30) / (estimatedRate / 100) // Simplified calculation

        // Adjust rate based on credit score
        if (creditScore >= 740) estimatedRate = 6.25
        else if (creditScore >= 680) estimatedRate = 6.5
        else estimatedRate = 6.75
      }

      return {
        ...loan,
        qualified,
        reasons,
        maxLoanAmount: Math.round(maxLoanAmount),
        estimatedRate,
        monthlyPayment: qualified
          ? Math.round(
              (maxLoanAmount * (estimatedRate / 100 / 12)) / (1 - Math.pow(1 + estimatedRate / 100 / 12, -360)),
            )
          : 0,
      }
    })

    const results = {
      personalInfo: {
        name: `${formData.firstName} ${formData.lastName}`,
        creditScore,
        dti: Math.round(dti),
        income,
        assets,
      },
      qualifications,
      recommendations: generateRecommendations(qualifications, formData),
    }

    setQualificationResults(results)
    setIsCalculating(false)

    if (onComplete) {
      onComplete(results)
    }
  }

  const generateRecommendations = (qualifications: any[], formData: any) => {
    const recommendations = []

    // Find best qualified loan
    const qualifiedLoans = qualifications.filter((q) => q.qualified)

    if (qualifiedLoans.length > 0) {
      const bestLoan = qualifiedLoans.reduce((best, current) =>
        current.estimatedRate < best.estimatedRate ? current : best,
      )
      recommendations.push({
        type: "best_option",
        title: `${bestLoan.name} is your best option`,
        description: `Lowest rate at ${bestLoan.estimatedRate}% with maximum loan amount of $${bestLoan.maxLoanAmount.toLocaleString()}`,
        action: "Apply Now",
        loanType: bestLoan.id,
      })
    }

    // Credit improvement recommendations
    const creditScore = Number(formData.creditScore)
    if (creditScore < 740) {
      recommendations.push({
        type: "credit_improvement",
        title: "Improve your credit score",
        description: `Increasing your credit score to 740+ could save you 0.25-0.5% on your interest rate`,
        action: "View Credit Tips",
      })
    }

    // Down payment recommendations
    if (formData.loanType === "fha" && Number(formData.downPayment) < Number(formData.purchasePrice) * 0.2) {
      recommendations.push({
        type: "down_payment",
        title: "Consider a larger down payment",
        description: "20% down payment eliminates mortgage insurance and reduces monthly payments",
        action: "Calculate Savings",
      })
    }

    return recommendations
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone
      case 2:
        return formData.annualIncome && formData.employmentStatus && formData.creditScore
      case 3:
        return formData.loanType && formData.purchasePrice
      case 4:
        return true
      default:
        return false
    }
  }

  if (qualificationResults) {
    return (
      <div className="space-y-6">
        {/* Results Header */}
        <Card className="bg-gradient-to-br from-green-900/50 to-blue-900/30 backdrop-blur-sm border-green-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              Pre-Qualification Results
            </CardTitle>
            <CardDescription className="text-green-200">
              Based on the information provided, here are your loan options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{qualificationResults.personalInfo.creditScore}</div>
                <div className="text-sm text-green-300">Credit Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{qualificationResults.personalInfo.dti}%</div>
                <div className="text-sm text-green-300">Debt-to-Income</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  ${(qualificationResults.personalInfo.income / 1000).toFixed(0)}K
                </div>
                <div className="text-sm text-green-300">Annual Income</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {qualificationResults.qualifications.filter((q: any) => q.qualified).length}
                </div>
                <div className="text-sm text-green-300">Qualified Loans</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="results" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-blue-900/30 backdrop-blur-sm">
            <TabsTrigger value="results">Loan Options</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="next-steps">Next Steps</TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="space-y-4">
            {qualificationResults.qualifications.map((loan: any, index: number) => (
              <Card
                key={index}
                className={`bg-gradient-to-br backdrop-blur-sm ${
                  loan.qualified
                    ? "from-green-900/50 to-blue-900/30 border-green-500/20"
                    : "from-red-900/50 to-gray-900/30 border-red-500/20"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${loan.color}`}>
                        <loan.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{loan.name}</h3>
                        <p className="text-blue-200">{loan.description}</p>
                        <div className="flex gap-2 mt-2">
                          {loan.benefits.map((benefit: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs border-blue-500/30 text-blue-300">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <Badge
                        className={
                          loan.qualified
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-red-500/20 text-red-400 border-red-500/30"
                        }
                      >
                        {loan.qualified ? "Qualified" : "Not Qualified"}
                      </Badge>
                    </div>
                  </div>

                  {loan.qualified ? (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-800/30 p-3 rounded-lg border border-blue-500/20">
                        <div className="text-sm text-blue-300">Max Loan Amount</div>
                        <div className="text-lg font-semibold text-white">${loan.maxLoanAmount.toLocaleString()}</div>
                      </div>
                      <div className="bg-blue-800/30 p-3 rounded-lg border border-blue-500/20">
                        <div className="text-sm text-blue-300">Estimated Rate</div>
                        <div className="text-lg font-semibold text-white">{loan.estimatedRate}%</div>
                      </div>
                      <div className="bg-blue-800/30 p-3 rounded-lg border border-blue-500/20">
                        <div className="text-sm text-blue-300">Monthly Payment</div>
                        <div className="text-lg font-semibold text-white">${loan.monthlyPayment.toLocaleString()}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 p-3 bg-red-800/30 rounded-lg border border-red-500/20">
                      <h4 className="font-medium text-red-400 mb-2">Qualification Issues:</h4>
                      <ul className="space-y-1">
                        {loan.reasons.map((reason: string, idx: number) => (
                          <li key={idx} className="text-sm text-red-300 flex items-center gap-2">
                            <AlertCircle className="h-3 w-3" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {loan.qualified && (
                    <div className="mt-4 flex gap-3">
                      <Button
                        className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                        onClick={() => router.push(`/citizen/loan-center/${loan.id}-loan`)}
                      >
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Apply for {loan.name}
                      </Button>
                      <Button
                        variant="outline"
                        className="border-blue-500/30 text-blue-300 bg-transparent"
                        onClick={() => router.push(`/citizen/loan-center/calculator?type=${loan.id}`)}
                      >
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate Payment
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            {qualificationResults.recommendations.map((rec: any, index: number) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{rec.title}</h3>
                      <p className="text-blue-200 mt-1">{rec.description}</p>
                      <Button
                        className="mt-3 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
                        onClick={() => {
                          if (rec.loanType) {
                            router.push(`/citizen/loan-center/${rec.loanType}-loan`)
                          }
                        }}
                      >
                        {rec.action}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="next-steps" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-400" />
                  Ready to Apply?
                </CardTitle>
                <CardDescription className="text-blue-200">
                  Here's what you'll need to complete your application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-white mb-3">Required Documents</h4>
                    <div className="space-y-2">
                      {[
                        "Pay stubs (last 2 months)",
                        "Tax returns (2 years)",
                        "Bank statements (3 months)",
                        "Employment verification letter",
                        "Government-issued ID",
                        "Social Security card",
                      ].map((doc, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-blue-200">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-3">Application Process</h4>
                    <div className="space-y-3">
                      {[
                        { step: 1, title: "Complete Application", time: "15 minutes" },
                        { step: 2, title: "Upload Documents", time: "10 minutes" },
                        { step: 3, title: "Credit Check", time: "Instant" },
                        { step: 4, title: "Underwriting Review", time: "3-5 days" },
                        { step: 5, title: "Final Approval", time: "1-2 days" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
                            {item.step}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-white">{item.title}</div>
                            <div className="text-xs text-blue-300">{item.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                    onClick={() => {
                      const bestLoan = qualificationResults.qualifications.find((q: any) => q.qualified)
                      if (bestLoan) {
                        router.push(`/citizen/loan-center/${bestLoan.id}-loan`)
                      }
                    }}
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Start Application
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-500/30 text-blue-300 bg-transparent"
                    onClick={() => setQualificationResults(null)}
                  >
                    Modify Information
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-400" />
            Government Loan Pre-Qualification
          </CardTitle>
          <CardDescription className="text-blue-200">
            Get pre-qualified for FHA, VA, USDA, and SBA loans in minutes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-blue-300">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-white font-medium">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
        <CardContent className="p-6">
          {isCalculating ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-white mb-2">Calculating Your Pre-Qualification</h3>
              <p className="text-blue-200">Analyzing your information against government loan requirements...</p>
            </div>
          ) : (
            <>
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">Personal Information</h2>
                    <p className="text-blue-200">Let's start with some basic information about you.</p>
                  </div>

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
                      <Label className="text-white">Email Address</Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-blue-800/30 border-blue-500/30 text-white"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Phone Number</Label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="bg-blue-800/30 border-blue-500/30 text-white"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">Financial Information</h2>
                    <p className="text-blue-200">Tell us about your income, employment, and credit situation.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Annual Income</Label>
                      <Input
                        type="number"
                        value={formData.annualIncome}
                        onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                        className="bg-blue-800/30 border-blue-500/30 text-white"
                        placeholder="75000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Monthly Debt Payments</Label>
                      <Input
                        type="number"
                        value={formData.monthlyDebt}
                        onChange={(e) => handleInputChange("monthlyDebt", e.target.value)}
                        className="bg-blue-800/30 border-blue-500/30 text-white"
                        placeholder="1200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Employment Status</Label>
                      <Select
                        value={formData.employmentStatus}
                        onValueChange={(value) => handleInputChange("employmentStatus", value)}
                      >
                        <SelectTrigger className="bg-blue-800/30 border-blue-500/30 text-white">
                          <SelectValue placeholder="Select employment status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time Employee</SelectItem>
                          <SelectItem value="part-time">Part-time Employee</SelectItem>
                          <SelectItem value="self-employed">Self-employed</SelectItem>
                          <SelectItem value="contractor">Independent Contractor</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Years at Current Job</Label>
                      <Input
                        type="number"
                        value={formData.employmentYears}
                        onChange={(e) => handleInputChange("employmentYears", e.target.value)}
                        className="bg-blue-800/30 border-blue-500/30 text-white"
                        placeholder="3"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Credit Score (Estimate)</Label>
                      <Select
                        value={formData.creditScore}
                        onValueChange={(value) => handleInputChange("creditScore", value)}
                      >
                        <SelectTrigger className="bg-blue-800/30 border-blue-500/30 text-white">
                          <SelectValue placeholder="Select credit score range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="800">800+ (Excellent)</SelectItem>
                          <SelectItem value="740">740-799 (Very Good)</SelectItem>
                          <SelectItem value="680">680-739 (Good)</SelectItem>
                          <SelectItem value="620">620-679 (Fair)</SelectItem>
                          <SelectItem value="580">580-619 (Poor)</SelectItem>
                          <SelectItem value="500">Below 580 (Very Poor)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Total Assets</Label>
                      <Input
                        type="number"
                        value={formData.assets}
                        onChange={(e) => handleInputChange("assets", e.target.value)}
                        className="bg-blue-800/30 border-blue-500/30 text-white"
                        placeholder="50000"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">Loan Preferences</h2>
                    <p className="text-blue-200">What type of loan are you interested in?</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {loanTypes.map((loan) => (
                      <Card
                        key={loan.id}
                        className={`cursor-pointer transition-all duration-300 ${
                          formData.loanType === loan.id
                            ? "bg-gradient-to-br from-blue-600/50 to-cyan-600/30 border-blue-400/60 shadow-lg"
                            : "bg-gradient-to-br from-blue-900/30 to-cyan-900/20 border-blue-500/20 hover:border-blue-400/40"
                        }`}
                        onClick={() => handleInputChange("loanType", loan.id)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className={`p-3 rounded-lg bg-gradient-to-r ${loan.color} mx-auto mb-3 w-fit`}>
                            <loan.icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="font-semibold text-white mb-2">{loan.name}</h3>
                          <p className="text-sm text-blue-200 mb-3">{loan.description}</p>
                          <div className="space-y-1">
                            {loan.benefits.map((benefit, index) => (
                              <Badge key={index} variant="outline" className="text-xs border-blue-500/30 text-blue-300">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Purchase Price</Label>
                      <Input
                        type="number"
                        value={formData.purchasePrice}
                        onChange={(e) => handleInputChange("purchasePrice", e.target.value)}
                        className="bg-blue-800/30 border-blue-500/30 text-white"
                        placeholder="350000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Down Payment Amount</Label>
                      <Input
                        type="number"
                        value={formData.downPayment}
                        onChange={(e) => handleInputChange("downPayment", e.target.value)}
                        className="bg-blue-800/30 border-blue-500/30 text-white"
                        placeholder="12250"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Property Type</Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value) => handleInputChange("propertyType", value)}
                      >
                        <SelectTrigger className="bg-blue-800/30 border-blue-500/30 text-white">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single-family">Single Family Home</SelectItem>
                          <SelectItem value="condo">Condominium</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="multi-family">Multi-family (2-4 units)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Property Location</Label>
                      <Input
                        value={formData.propertyLocation}
                        onChange={(e) => handleInputChange("propertyLocation", e.target.value)}
                        className="bg-blue-800/30 border-blue-500/30 text-white"
                        placeholder="City, State"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">Special Circumstances</h2>
                    <p className="text-blue-200">
                      These details help us determine your eligibility for specific government programs.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Military Status</Label>
                      <Select
                        value={formData.militaryStatus}
                        onValueChange={(value) => handleInputChange("militaryStatus", value)}
                      >
                        <SelectTrigger className="bg-blue-800/30 border-blue-500/30 text-white">
                          <SelectValue placeholder="Select military status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No Military Service</SelectItem>
                          <SelectItem value="active">Active Duty</SelectItem>
                          <SelectItem value="veteran">Veteran</SelectItem>
                          <SelectItem value="reserves">Reserves/National Guard</SelectItem>
                          <SelectItem value="spouse">Military Spouse</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">First-Time Home Buyer?</Label>
                      <Select
                        value={formData.firstTimeHomeBuyer}
                        onValueChange={(value) => handleInputChange("firstTimeHomeBuyer", value)}
                      >
                        <SelectTrigger className="bg-blue-800/30 border-blue-500/30 text-white">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Rural Property?</Label>
                      <Select
                        value={formData.ruralProperty}
                        onValueChange={(value) => handleInputChange("ruralProperty", value)}
                      >
                        <SelectTrigger className="bg-blue-800/30 border-blue-500/30 text-white">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes, in rural area</SelectItem>
                          <SelectItem value="no">No, in urban/suburban area</SelectItem>
                          <SelectItem value="unsure">Not sure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                    <h4 className="font-medium text-white mb-2">Privacy Notice</h4>
                    <p className="text-sm text-blue-300">
                      This pre-qualification is for informational purposes only and does not constitute a loan
                      commitment. Your information is secure and will only be used to provide you with loan options.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="border-blue-500/30 text-blue-300 bg-transparent"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep)}
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                >
                  {currentStep === totalSteps ? "Get Pre-Qualified" : "Next"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
