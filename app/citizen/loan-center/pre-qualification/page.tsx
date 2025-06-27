"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, AlertCircle, TrendingUp, Shield, Globe } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PreQualificationPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    annualIncome: 75000,
    monthlyDebts: 1500,
    creditScore: [720],
    employmentYears: 3,
    downPayment: 40000,
    loanAmount: 400000,
    propertyType: "primary",
    militaryService: "no",
    ruralProperty: "no",
    businessUse: "no",
  })

  const [qualificationResults, setQualificationResults] = useState<any>(null)

  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  const calculateQualification = () => {
    const debtToIncomeRatio = (formData.monthlyDebts * 12) / formData.annualIncome
    const loanToValueRatio = (formData.loanAmount - formData.downPayment) / formData.loanAmount

    const qualifications = {
      fha: {
        eligible: formData.creditScore[0] >= 580 && debtToIncomeRatio <= 0.57 && loanToValueRatio <= 0.965,
        rate: 3.25,
        maxAmount: 766000,
        downPaymentMin: formData.loanAmount * 0.035,
        guarantee: "30 years",
        reasons: [],
      },
      va: {
        eligible: formData.militaryService === "yes" && formData.creditScore[0] >= 620 && debtToIncomeRatio <= 0.41,
        rate: 3.1,
        maxAmount: 999999999,
        downPaymentMin: 0,
        guarantee: "50 years",
        reasons: [],
      },
      usda: {
        eligible: formData.ruralProperty === "yes" && formData.annualIncome <= 115000 && formData.creditScore[0] >= 640,
        rate: 3.0,
        maxAmount: 500000,
        downPaymentMin: 0,
        guarantee: "35 years",
        reasons: [],
      },
      sba: {
        eligible: formData.businessUse === "yes" && formData.creditScore[0] >= 680 && debtToIncomeRatio <= 0.45,
        rate: 3.55,
        maxAmount: 5000000,
        downPaymentMin: formData.loanAmount * 0.1,
        guarantee: "25 years",
        reasons: [],
      },
    }

    // Add specific reasons for ineligibility
    if (!qualifications.fha.eligible) {
      if (formData.creditScore[0] < 580) qualifications.fha.reasons.push("Credit score below 580")
      if (debtToIncomeRatio > 0.57) qualifications.fha.reasons.push("Debt-to-income ratio too high")
      if (loanToValueRatio > 0.965) qualifications.fha.reasons.push("Down payment too low")
    }

    if (!qualifications.va.eligible) {
      if (formData.militaryService !== "yes") qualifications.va.reasons.push("Military service required")
      if (formData.creditScore[0] < 620) qualifications.va.reasons.push("Credit score below 620")
      if (debtToIncomeRatio > 0.41) qualifications.va.reasons.push("Debt-to-income ratio too high")
    }

    if (!qualifications.usda.eligible) {
      if (formData.ruralProperty !== "yes") qualifications.usda.reasons.push("Property must be in rural area")
      if (formData.annualIncome > 115000) qualifications.usda.reasons.push("Income exceeds limit")
      if (formData.creditScore[0] < 640) qualifications.usda.reasons.push("Credit score below 640")
    }

    if (!qualifications.sba.eligible) {
      if (formData.businessUse !== "yes") qualifications.sba.reasons.push("Business use required")
      if (formData.creditScore[0] < 680) qualifications.sba.reasons.push("Credit score below 680")
      if (debtToIncomeRatio > 0.45) qualifications.sba.reasons.push("Debt-to-income ratio too high")
    }

    setQualificationResults({
      ...qualifications,
      debtToIncomeRatio,
      loanToValueRatio,
    })
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      calculateQualification()
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Financial Information</h2>
              <p className="text-blue-200">Tell us about your income and debts</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-white">Annual Income</Label>
                <Input
                  type="number"
                  value={formData.annualIncome}
                  onChange={(e) => setFormData({ ...formData, annualIncome: Number(e.target.value) })}
                  className="bg-blue-800/30 border-blue-500/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Monthly Debt Payments</Label>
                <Input
                  type="number"
                  value={formData.monthlyDebts}
                  onChange={(e) => setFormData({ ...formData, monthlyDebts: Number(e.target.value) })}
                  className="bg-blue-800/30 border-blue-500/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Credit Score: {formData.creditScore[0]}</Label>
                <Slider
                  value={formData.creditScore}
                  onValueChange={(value) => setFormData({ ...formData, creditScore: value })}
                  max={850}
                  min={300}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-blue-300">
                  <span>300</span>
                  <span>850</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Years of Employment</Label>
                <Input
                  type="number"
                  value={formData.employmentYears}
                  onChange={(e) => setFormData({ ...formData, employmentYears: Number(e.target.value) })}
                  className="bg-blue-800/30 border-blue-500/30 text-white"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Loan Details</h2>
              <p className="text-blue-200">Specify your loan amount and down payment</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-white">Desired Loan Amount</Label>
                <Input
                  type="number"
                  value={formData.loanAmount}
                  onChange={(e) => setFormData({ ...formData, loanAmount: Number(e.target.value) })}
                  className="bg-blue-800/30 border-blue-500/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Down Payment</Label>
                <Input
                  type="number"
                  value={formData.downPayment}
                  onChange={(e) => setFormData({ ...formData, downPayment: Number(e.target.value) })}
                  className="bg-blue-800/30 border-blue-500/30 text-white"
                />
                <p className="text-xs text-blue-300">
                  {((formData.downPayment / formData.loanAmount) * 100).toFixed(1)}% of loan amount
                </p>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-white">Property Type</Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                >
                  <SelectTrigger className="bg-blue-800/30 border-blue-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary Residence</SelectItem>
                    <SelectItem value="secondary">Secondary Home</SelectItem>
                    <SelectItem value="investment">Investment Property</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Eligibility Factors</h2>
              <p className="text-blue-200">Help us determine which bond types you qualify for</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-white">Military Service</Label>
                <Select
                  value={formData.militaryService}
                  onValueChange={(value) => setFormData({ ...formData, militaryService: value })}
                >
                  <SelectTrigger className="bg-blue-800/30 border-blue-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No Military Service</SelectItem>
                    <SelectItem value="yes">Active Duty/Veteran</SelectItem>
                    <SelectItem value="spouse">Military Spouse</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-blue-300">Required for VA 50-Year Bond eligibility</p>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Rural Property Location</Label>
                <Select
                  value={formData.ruralProperty}
                  onValueChange={(value) => setFormData({ ...formData, ruralProperty: value })}
                >
                  <SelectTrigger className="bg-blue-800/30 border-blue-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">Urban/Suburban Area</SelectItem>
                    <SelectItem value="yes">Rural Area (USDA Eligible)</SelectItem>
                    <SelectItem value="unsure">Not Sure</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-blue-300">Required for USDA 50-Year Rural Bond</p>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Business Use</Label>
                <Select
                  value={formData.businessUse}
                  onValueChange={(value) => setFormData({ ...formData, businessUse: value })}
                >
                  <SelectTrigger className="bg-blue-800/30 border-blue-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">Personal Use Only</SelectItem>
                    <SelectItem value="yes">Business/Commercial Use</SelectItem>
                    <SelectItem value="mixed">Mixed Use</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-blue-300">Required for SBA 50-Year Business Bond</p>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Review Your Information</h2>
              <p className="text-blue-200">Confirm your details before getting pre-qualified</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-blue-800/30 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Financial Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-300">Annual Income:</span>
                    <span className="text-white">${formData.annualIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Monthly Debts:</span>
                    <span className="text-white">${formData.monthlyDebts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Credit Score:</span>
                    <span className="text-white">{formData.creditScore[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Employment:</span>
                    <span className="text-white">{formData.employmentYears} years</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-800/30 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Loan Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-300">Loan Amount:</span>
                    <span className="text-white">${formData.loanAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Down Payment:</span>
                    <span className="text-white">${formData.downPayment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Property Type:</span>
                    <span className="text-white">{formData.propertyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">LTV Ratio:</span>
                    <span className="text-white">
                      {(((formData.loanAmount - formData.downPayment) / formData.loanAmount) * 100).toFixed(1)}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (qualificationResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950 p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Pre-Qualification Results
            </h1>
            <p className="text-blue-200">Based on your information, here are your 50-year government bond options</p>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(qualificationResults)
              .filter(([key]) => !["debtToIncomeRatio", "loanToValueRatio"].includes(key))
              .map(([key, result]: [string, any]) => {
                const loanNames = {
                  fha: "FHA 50-Year Bond",
                  va: "VA 50-Year Bond",
                  usda: "USDA 50-Year Rural Bond",
                  sba: "SBA 50-Year Business Bond",
                }

                const colors = {
                  fha: "from-blue-500 to-cyan-500",
                  va: "from-green-500 to-emerald-500",
                  usda: "from-purple-500 to-pink-500",
                  sba: "from-orange-500 to-red-500",
                }

                return (
                  <Card
                    key={key}
                    className={`bg-gradient-to-br ${result.eligible ? "from-green-900/50 to-blue-900/30 border-green-500/20" : "from-red-900/50 to-blue-900/30 border-red-500/20"} backdrop-blur-sm`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">{loanNames[key as keyof typeof loanNames]}</CardTitle>
                        {result.eligible ? (
                          <CheckCircle className="h-6 w-6 text-green-400" />
                        ) : (
                          <AlertCircle className="h-6 w-6 text-red-400" />
                        )}
                      </div>
                      <CardDescription className={result.eligible ? "text-green-200" : "text-red-200"}>
                        {result.eligible ? "You qualify for this bond!" : "Not currently eligible"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {result.eligible ? (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-white">{result.rate}%</div>
                              <div className="text-sm text-blue-300">Interest Rate</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-white">{result.guarantee}</div>
                              <div className="text-sm text-blue-300">Guarantee</div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-blue-300">Max Amount:</span>
                              <span className="text-white">
                                {result.maxAmount === 999999999 ? "No Limit" : `$${result.maxAmount / 1000}K`}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-blue-300">Min Down Payment:</span>
                              <span className="text-white">${result.downPaymentMin.toLocaleString()}</span>
                            </div>
                          </div>

                          <Button
                            className={`w-full bg-gradient-to-r ${colors[key as keyof typeof colors]}`}
                            onClick={() => router.push(`/citizen/loan-center/${key}-loan`)}
                          >
                            Apply for {loanNames[key as keyof typeof loanNames]}
                          </Button>
                        </>
                      ) : (
                        <div className="space-y-3">
                          <h4 className="font-medium text-red-400">Requirements not met:</h4>
                          <ul className="space-y-1">
                            {result.reasons.map((reason: string, index: number) => (
                              <li key={index} className="text-sm text-red-200 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                                {reason}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
          </div>

          {/* Financial Summary */}
          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white">Financial Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {(qualificationResults.debtToIncomeRatio * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-blue-300">Debt-to-Income Ratio</div>
                <div className="text-xs text-blue-400 mt-1">
                  {qualificationResults.debtToIncomeRatio <= 0.41
                    ? "Excellent"
                    : qualificationResults.debtToIncomeRatio <= 0.45
                      ? "Good"
                      : qualificationResults.debtToIncomeRatio <= 0.57
                        ? "Fair"
                        : "High"}
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {(qualificationResults.loanToValueRatio * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-blue-300">Loan-to-Value Ratio</div>
                <div className="text-xs text-blue-400 mt-1">
                  {qualificationResults.loanToValueRatio <= 0.8
                    ? "Excellent"
                    : qualificationResults.loanToValueRatio <= 0.9
                      ? "Good"
                      : qualificationResults.loanToValueRatio <= 0.965
                        ? "Fair"
                        : "High"}
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-white">{formData.creditScore[0]}</div>
                <div className="text-sm text-blue-300">Credit Score</div>
                <div className="text-xs text-blue-400 mt-1">
                  {formData.creditScore[0] >= 740
                    ? "Excellent"
                    : formData.creditScore[0] >= 680
                      ? "Good"
                      : formData.creditScore[0] >= 620
                        ? "Fair"
                        : "Poor"}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              className="bg-gradient-to-r from-blue-500 to-cyan-600"
              onClick={() => router.push("/citizen/loan-center/calculator")}
            >
              Calculate Payments
            </Button>
            <Button
              variant="outline"
              className="border-blue-500/30 text-blue-300 bg-transparent hover:bg-blue-500/20"
              onClick={() => setQualificationResults(null)}
            >
              Start Over
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-blue-500/30 text-blue-300 bg-transparent hover:bg-blue-500/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Loan Center
          </Button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Bond Pre-Qualification
            </h1>
            <p className="text-blue-200 mt-2">Get pre-qualified for 50-year government bonds in minutes</p>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-blue-300">
                  Step {step} of {totalSteps}
                </span>
                <span className="text-white font-medium">{progress.toFixed(0)}% Complete</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
          <CardContent className="p-8">{renderStep()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 1}
            className="border-blue-500/30 text-blue-300 bg-transparent hover:bg-blue-500/20 disabled:opacity-50"
          >
            Previous
          </Button>
          <Button onClick={handleNext} className="bg-gradient-to-r from-blue-500 to-cyan-600">
            {step === totalSteps ? "Get Pre-Qualified" : "Next"}
          </Button>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-green-900/50 to-blue-900/30 backdrop-blur-sm border-green-500/20">
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 text-green-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Government Guaranteed</h3>
              <p className="text-sm text-green-200">25-50 year federal backing for security and better rates</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/30 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-6 text-center">
              <Globe className="h-12 w-12 text-purple-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">DAX Market Pricing</h3>
              <p className="text-sm text-purple-200">Corporate bond market efficiency with institutional rates</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-blue-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">50-Year Terms</h3>
              <p className="text-sm text-blue-200">Extended amortization for significantly lower monthly payments</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
