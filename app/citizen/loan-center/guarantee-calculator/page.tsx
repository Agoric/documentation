"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Shield, Calculator, CheckCircle, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function GuaranteeCalculatorPage() {
  const router = useRouter()
  const [calculatorParams, setCalculatorParams] = useState({
    loanAmount: 400000,
    loanType: "fha",
    creditScore: [720],
    downPayment: 20000,
    propertyValue: 420000,
  })

  const guaranteePrograms = {
    fha: {
      name: "FHA 50-Year Bond Guarantee",
      guaranteeTerm: 30,
      maxGuaranteeAmount: 766000,
      guaranteePercentage: 100,
      baseRate: 3.1,
      guaranteeDiscount: 0.25,
      requirements: {
        minCreditScore: 580,
        maxLTV: 96.5,
        maxDTI: 57,
        minDownPayment: 3.5,
      },
      benefits: [
        "30-year federal guarantee",
        "Low down payment options",
        "Competitive interest rates",
        "First-time buyer friendly",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    va: {
      name: "VA 50-Year Bond Guarantee",
      guaranteeTerm: 50,
      maxGuaranteeAmount: 999999999,
      guaranteePercentage: 100,
      baseRate: 3.1,
      guaranteeDiscount: 0.3,
      requirements: {
        minCreditScore: 620,
        maxLTV: 100,
        maxDTI: 41,
        minDownPayment: 0,
      },
      benefits: [
        "Full 50-year guarantee",
        "No down payment required",
        "No mortgage insurance",
        "Best available rates",
      ],
      color: "from-green-500 to-emerald-500",
    },
    usda: {
      name: "USDA 50-Year Rural Bond Guarantee",
      guaranteeTerm: 35,
      maxGuaranteeAmount: 500000,
      guaranteePercentage: 100,
      baseRate: 3.0,
      guaranteeDiscount: 0.25,
      requirements: {
        minCreditScore: 640,
        maxLTV: 100,
        maxDTI: 41,
        minDownPayment: 0,
      },
      benefits: [
        "35-year government guarantee",
        "Rural area focus",
        "Income-based eligibility",
        "No down payment required",
      ],
      color: "from-purple-500 to-pink-500",
    },
    sba: {
      name: "SBA 50-Year Business Bond Guarantee",
      guaranteeTerm: 25,
      maxGuaranteeAmount: 5000000,
      guaranteePercentage: 85,
      baseRate: 3.2,
      guaranteeDiscount: 0.35,
      requirements: {
        minCreditScore: 680,
        maxLTV: 90,
        maxDTI: 45,
        minDownPayment: 10,
      },
      benefits: [
        "25-year business guarantee",
        "High loan amounts",
        "Commercial property eligible",
        "Business use focused",
      ],
      color: "from-orange-500 to-red-500",
    },
  }

  const calculateGuaranteeMetrics = () => {
    const program = guaranteePrograms[calculatorParams.loanType as keyof typeof guaranteePrograms]
    const loanToValue = ((calculatorParams.loanAmount - calculatorParams.downPayment) / calculatorParams.propertyValue) * 100
    const guaranteeAmount = Math.min(calculatorParams.loanAmount, program.maxGuaranteeAmount)
    const guaranteeCoverage = (guaranteeAmount * program.guaranteePercentage) / 100
    
    // Calculate risk reduction
    const baseRisk = 5.0 // Base risk percentage without guarantee
    const guaranteeRiskReduction = (program.guaranteeDiscount / program.baseRate) * baseRisk
    const finalRisk = Math.max(0.5, baseRisk - guaranteeRiskReduction)
    
    // Calculate rate benefit
    const rateBenefit = program.guaranteeDiscount
    const effectiveRate = program.baseRate - rateBenefit
    
    // Calculate monthly savings
    const principal = calculatorParams.loanAmount - calculatorParams.downPayment
    const monthlyRateWithGuarantee = effectiveRate / 100 / 12
    const monthlyRateWithoutGuarantee = (program.baseRate + 1.5) / 100 / 12 // Estimated rate without guarantee
    
    const paymentsWithGuarantee = 50 * 12
    const monthlyPaymentWith = (principal * monthlyRateWithGuarantee * Math.pow(1 + monthlyRateWithGuarantee, paymentsWithGuarantee)) /
      (Math.pow(1 + monthlyRateWithGuarantee, paymentsWithGuarantee) - 1)
    
    const monthlyPaymentWithout = (principal * monthlyRateWithoutGuarantee * Math.pow(1 + monthlyRateWithoutGuarantee, paymentsWithGuarantee)) /
      (Math.pow(1 + monthlyRateWithoutGuarantee, paymentsWithGuarantee) - 1)
    
    const monthlySavings = monthlyPaymentWithout - monthlyPaymentWith
    const lifetimeSavings = monthlySavings * paymentsWithGuarantee
    
    // Eligibility check
    const eligible = 
      calculatorParams.creditScore[0] >= program.requirements.minCreditScore &&
      loanToValue <= program.requirements.maxLTV &&
      (calculatorParams.downPayment / calculatorParams.loanAmount * 100) >= program.requirements.minDownPayment

    return {
      program,
      guaranteeAmount,
      guaranteeCoverage,
      loanToValue,
      rateBenefit,
      effectiveRate,
      finalRisk,
      monthlyPaymentWith,
      monthlyPaymentWithout,
      monthlySavings,
      lifetimeSavings,
      eligible,
    }
  }

  const metrics = calculateGuaranteeMetrics()

  const getEligibilityStatus = () => {
    if (metrics.eligible) {
      return { status: "Eligible", color: "bg-green-500/20 text-green-400 border-green-500/30", icon: CheckCircle }
    } else {
      return { status: "Not Eligible", color: "bg-red-500/20 text-red-400 border-red-500/30", icon: AlertCircle }
    }
  }

  const eligibilityStatus = getEligibilityStatus()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
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
              Government Guarantee Calculator
            </h1>
            <p className="text-blue-200 mt-2">
              Calculate the value and benefits of government guarantees on your 50-year bond
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Inputs */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-blue-400" />
                  Guarantee Calculator
                </CardTitle>
                <CardDescription className="text-blue-200">
                  Enter your loan details to calculate guarantee benefits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-white">Guarantee Program</Label>
                  <Select value={calculatorParams.loanType} onValueChange={(value) => setCalculatorParams({...calculatorParams, loanType: value})}>
                    <SelectTrigger className="bg-blue-800/30 border-blue-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(guaranteePrograms).map(([key, program]) => (
                        <SelectItem key={key} value={key}>
                          {program.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Loan Amount</Label>
                  <Input
                    type="number"
                    value={calculatorParams.loanAmount}
                    onChange={(e) => setCalculatorParams({...calculatorParams, loanAmount: Number(e.target.value)})}
                    className="bg-blue-800/30 border-blue-500/30 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Property Value</Label>
                  <Input
                    type="number"
                    value={calculatorParams.propertyValue}
                    onChange={(e) => setCalculatorParams({...calculatorParams, propertyValue: Number(e.target.value)})}
                    className="bg-blue-800/30 border-blue-500/30 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Down Payment</Label>
                  <Input
                    type="number"
                    value={calculatorParams.downPayment}
                    onChange={(e) => setCalculatorParams({...calculatorParams, downPayment: Number(e.target.value)})}
                    className="bg-blue-800/30 border-blue-500/30 text-white"
                  />
                  <p className="text-xs text-blue-300">
                    {((calculatorParams.downPayment / calculatorParams.loanAmount) * 100).toFixed(1)}% of loan amount
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Credit Score: {calculatorParams.creditScore[0]}</Label>
                  <Slider
                    value={calculatorParams.creditScore}
                    onValueChange={(value) => setCalculatorParams({...calculatorParams, creditScore: value})}
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
              </CardContent>
            </Card>

            {/* Eligibility Status */}
            <Card className={`bg-gradient-to-br ${metrics.eligible ? 'from-green-900/50 to-blue-900/30 border-green-500/20' : 'from-red-900/50 to-blue-900/30 border-red-500/20'} backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <eligibilityStatus.icon className="h-5 w-5" />
                  Eligibility Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <Badge className={eligibilityStatus.color}>
                    {eligibilityStatus.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-300">Credit Score:</span>
                    <span className={calculatorParams.creditScore[0] >= metrics.program.requirements.minCreditScore ? 'text-green-400' : 'text-red-400'}>
                      {calculatorParams.creditScore[0]} / {metrics.program.requirements.minCreditScore}+
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Loan-to-Value:</span>
                    <span className={metrics.loanToValue <= metrics.program.requirements.maxLTV ? 'text-green-400' : 'text-red-400'}>
                      {metrics.loanToValue.toFixed(1)}% / {metrics.program.requirements.maxLTV}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Down Payment:</span>
                    <span className={(calculatorParams.downPayment / calculatorParams.loanAmount * 100) >= metrics.program.requirements.minDownPayment ? 'text-green-400' : 'text-red-400'}>
                      {((calculatorParams.downPayment / calculatorParams.loanAmount) * 100).toFixed(1)}% / {metrics.program.requirements.minDownPayment}%+
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="guarantee-value" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-blue-900/30 backdrop-blur-sm">
                <TabsTrigger value="guarantee-value">Guarantee Value</TabsTrigger>
                <TabsTrigger value="savings">Savings Analysis</TabsTrigger>
                <TabsTrigger value="comparison">With vs Without</TabsTrigger>
              </TabsList>

              <TabsContent value="guarantee-value" className="space-y-6">
                <Card className="bg-gradient-to-br from-green-900/50 to-blue-900/30 backdrop-blur-sm border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-400" />
                      Government Guarantee Details
                    </CardTitle>
                    <CardDescription className="text-green-200">
                      {metrics.program.name} - {metrics.program.guaranteeTerm} year guarantee
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">
                          ${metrics.guaranteeCoverage.toLocaleString()}
                        </div>
                        <div className="text-sm text-green-300">Guarantee Coverage</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">
                          {metrics.program.guaranteeTerm} years
                        </div>
                        <div className="text-sm text-green-300">Guarantee Term</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-green-300">Guarantee Percentage:</span>
                        <span className="text-white font-semibold">{metrics.program.guaranteePercentage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-300">Maximum Guarantee:</span>
                        <span className="text-white">
                          {metrics.program.maxGuaranteeAmount === 999999999 ? "No Limit" : `$${(metrics.program.maxGuaranteeAmount / 1000)}K`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-300">Rate Benefit:</span>
                        <span className="text-green-400 font-semibold">-{metrics.rateBenefit}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-300">Risk Reduction:</span>
                        <span className="text-green-400 font-semibold">{(5.0 - metrics.finalRisk).toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="bg-green-800/30 p-4 rounded-lg border border-green-500/20">
                      <h4 className="font-medium text-white mb-3">Guarantee Benefits</h4>
                      <ul className="space-y-2">
                        {metrics.program.benefits.map((benefit, index) => (
                          <li key={index} className="text-sm text-green-200 flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Guarantee Timeline */}
                <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Guarantee Timeline</CardTitle>
                    <CardDescription className="text-blue-200">
                      How your government guarantee coverage changes over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 gap-4 text-center">
                        {[0, 10, 20, 30, 40, 50].map((year) => (
                          <div key={year} className="space-y-2">
                            <div className="text-sm text-blue-300">Year {year}</div>
                            <div className={`w-full h-20 rounded-lg flex items-center justify-center ${
                              year <= metrics.program.guaranteeTerm ? 'bg-green-500/30 border border-green-500/50' : 'bg-gray-500/30 border border-gray-500/50'
                            }`}>
                              <div className="text-xs text-white font-medium">
                                {year <= metrics.program.guaranteeTerm ? '100%' : '0%'}
                              </div>
                            </div>
                            <div className="text-xs text-blue-300">
                              {year <= metrics.program.guaranteeTerm ? 'Guaranteed' : 'No Guarantee'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="savings" className="space-y-6">
                <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Guarantee Savings Analysis</CardTitle>
                    <CardDescription className="text-blue-200">
                      Financial benefits of government guarantee over loan lifetime
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400">
                          ${metrics.monthlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-sm text-green-300">Monthly Savings</div>
                        <div className="text-xs text-blue-300 mt-1">vs no guarantee</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400">
                          ${(metrics.monthlySavings * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-sm text-green-300">Annual Savings</div>
                        <div className="text-xs text-blue-300 mt-1">first year</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400">
                          ${metrics.lifetimeSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-sm text-green-300">Lifetime Savings</div>
                        <div className="text-xs text-blue-300 mt-1">50-year total</div>
                      </div>
                    </div>

                    <div className="bg-green-800/30 p-4 rounded-lg border border-green-500/20">
                      <h4 className="font-medium text-white mb-3">Savings Breakdown</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-green-300 mb-2">Interest Rate Savings</div>
                          <div className="text-white">-{metrics.rateBenefit}% rate reduction</div>
                          <div className="text-green-400">${(metrics.lifetimeSavings * 0.8).toLocaleString(undefined, { maximumFractionDigits: 0 })} lifetime</div>
                        </div>
                        <div>
                          <div className="text-green-300 mb-2">Risk Premium Savings</div>
                          <div className="text-white">Lower risk = lower rates</div>
                          <div className="text-green-400">${(metrics.lifetimeSavings * 0.2).toLocaleString(undefined, { maximumFractionDigits: 0 })} lifetime</div>
                        </div>
                      </div>
                    </div>

                    {/* Savings Over Time Chart */}
                    <div>
                      <h4 className="font-medium text-white mb-3">Cumulative Savings Over Time</h4>
                      <div className="space-y-3">
                        {[5, 10, 15, 20, 25, 30].map((year) => {
                          const cumulativeSavings = metrics.monthlySavings * 12 * year
                          const maxSavings = metrics.monthlySavings * 12 * 30
                          const percentage = (cumulativeSavings / maxSavings) * 100
                          
                          return (
                            <div key={year} className="space-y\
