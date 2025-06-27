"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Home,
  Shield,
  Building2,
  Users,
  Calculator,
  ArrowRight,
  Star,
  CheckCircle,
  AlertCircle,
  Download,
  Share,
} from "lucide-react"

interface LoanComparisonToolProps {
  initialLoanAmount?: number
  initialDownPayment?: number
}

export function LoanComparisonTool({
  initialLoanAmount = 350000,
  initialDownPayment = 12250,
}: LoanComparisonToolProps) {
  const [loanAmount, setLoanAmount] = useState([initialLoanAmount])
  const [downPayment, setDownPayment] = useState([initialDownPayment])
  const [creditScore, setCreditScore] = useState([720])
  const [loanTerm, setLoanTerm] = useState([30])

  const loanTypes = [
    {
      id: "fha",
      name: "FHA Loan",
      icon: Home,
      color: "from-blue-500 to-cyan-500",
      baseRate: 6.5,
      minDown: 3.5,
      maxLoan: 766550,
      mipRate: 0.85,
      description: "Government-backed with low down payment",
      benefits: ["3.5% down payment", "Credit scores from 580", "Government backing"],
      drawbacks: ["Mortgage insurance required", "Loan limits apply", "Property restrictions"],
    },
    {
      id: "va",
      name: "VA Loan",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      baseRate: 6.25,
      minDown: 0,
      maxLoan: 766550,
      mipRate: 0,
      fundingFee: 2.15,
      description: "Military exclusive with no down payment",
      benefits: ["0% down payment", "No PMI required", "Competitive rates"],
      drawbacks: ["Military service required", "Funding fee applies", "Property requirements"],
    },
    {
      id: "usda",
      name: "USDA Loan",
      icon: Building2,
      color: "from-orange-500 to-red-500",
      baseRate: 6.0,
      minDown: 0,
      maxLoan: 500000,
      mipRate: 0.35,
      description: "Rural development with no down payment",
      benefits: ["0% down payment", "Below-market rates", "Low mortgage insurance"],
      drawbacks: ["Rural areas only", "Income limits apply", "Property restrictions"],
    },
    {
      id: "sba",
      name: "SBA Loan",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      baseRate: 7.0,
      minDown: 10,
      maxLoan: 5000000,
      mipRate: 0,
      guaranteeFee: 3.5,
      description: "Business loans with government guarantee",
      benefits: ["Up to 85% guarantee", "Long repayment terms", "Business focused"],
      drawbacks: ["Business use only", "Higher rates", "Complex requirements"],
    },
  ]

  const calculateLoanDetails = (loan: any) => {
    const principal = loanAmount[0] - downPayment[0]
    const adjustedRate = loan.baseRate + (creditScore[0] < 680 ? 0.5 : creditScore[0] < 740 ? 0.25 : 0)
    const monthlyRate = adjustedRate / 100 / 12
    const numPayments = loanTerm[0] * 12

    // Calculate monthly payment
    const monthlyPayment =
      monthlyRate === 0
        ? principal / numPayments
        : (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
          (Math.pow(1 + monthlyRate, numPayments) - 1)

    // Calculate mortgage insurance/fees
    let monthlyMI = 0
    let upfrontFee = 0

    if (loan.mipRate) {
      monthlyMI = (principal * loan.mipRate) / 100 / 12
    }

    if (loan.fundingFee) {
      upfrontFee = (principal * loan.fundingFee) / 100
    }

    if (loan.guaranteeFee) {
      upfrontFee = (principal * loan.guaranteeFee) / 100
    }

    const totalMonthlyPayment = monthlyPayment + monthlyMI
    const totalInterest = monthlyPayment * numPayments - principal
    const totalCost = principal + totalInterest + upfrontFee + monthlyMI * numPayments

    // Calculate affordability score (0-100)
    const monthlyIncome = 6000 // Assumed monthly income for scoring
    const dti = (totalMonthlyPayment / monthlyIncome) * 100
    const affordabilityScore = Math.max(0, 100 - dti * 2)

    return {
      ...loan,
      principal,
      adjustedRate,
      monthlyPayment,
      monthlyMI,
      upfrontFee,
      totalMonthlyPayment,
      totalInterest,
      totalCost,
      affordabilityScore: Math.round(affordabilityScore),
      qualified: principal <= loan.maxLoan && downPayment[0] >= (loanAmount[0] * loan.minDown) / 100,
    }
  }

  const loanComparisons = loanTypes.map(calculateLoanDetails)
  const bestLoan = loanComparisons
    .filter((loan) => loan.qualified)
    .reduce((best, current) => (current.totalCost < best.totalCost ? current : best), loanComparisons[0])

  const handleExportComparison = () => {
    const comparisonData = {
      parameters: {
        loanAmount: loanAmount[0],
        downPayment: downPayment[0],
        creditScore: creditScore[0],
        loanTerm: loanTerm[0],
      },
      comparisons: loanComparisons.map((loan) => ({
        name: loan.name,
        monthlyPayment: loan.totalMonthlyPayment,
        totalCost: loan.totalCost,
        interestRate: loan.adjustedRate,
        qualified: loan.qualified,
      })),
      bestOption: bestLoan.name,
      generatedDate: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(comparisonData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `loan-comparison-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const shareComparison = async () => {
    const shareData = {
      title: "Government Loan Comparison Results",
      text: `Best option: ${bestLoan.name} with $${bestLoan.totalMonthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}/month`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`)
      alert("Comparison copied to clipboard!")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-400" />
            Government Loan Comparison Tool
          </CardTitle>
          <CardDescription className="text-blue-200">Compare FHA, VA, USDA, and SBA loans side by side</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">${loanAmount[0].toLocaleString()}</div>
                <div className="text-sm text-blue-300">Loan Amount</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">${downPayment[0].toLocaleString()}</div>
                <div className="text-sm text-blue-300">Down Payment</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{creditScore[0]}</div>
                <div className="text-sm text-blue-300">Credit Score</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={shareComparison}
                className="border-blue-500/30 text-blue-300 bg-transparent"
              >
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                onClick={handleExportComparison}
                className="border-blue-500/30 text-blue-300 bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="comparison" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-blue-900/30 backdrop-blur-sm">
          <TabsTrigger value="comparison">Side by Side</TabsTrigger>
          <TabsTrigger value="parameters">Adjust Parameters</TabsTrigger>
          <TabsTrigger value="analysis">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-6">
          {/* Best Option Highlight */}
          {bestLoan && (
            <Card className={`bg-gradient-to-br ${bestLoan.color} backdrop-blur-sm border-green-500/20`}>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  Recommended: {bestLoan.name}
                </CardTitle>
                <CardDescription className="text-blue-100">Best overall value with lowest total cost</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    ${bestLoan.totalMonthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm text-blue-100">Monthly Payment</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{bestLoan.adjustedRate}%</div>
                  <div className="text-sm text-blue-100">Interest Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    ${bestLoan.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-sm text-blue-100">Total Cost</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{bestLoan.affordabilityScore}</div>
                  <div className="text-sm text-blue-100">Affordability Score</div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Loan Comparison Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {loanComparisons.map((loan, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br backdrop-blur-sm ${
                  loan.qualified
                    ? "from-blue-900/50 to-cyan-900/30 border-blue-500/20"
                    : "from-gray-900/50 to-gray-800/30 border-gray-500/20"
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${loan.color}`}>
                        <loan.icon className="h-5 w-5 text-white" />
                      </div>
                      {loan.name}
                      {loan === bestLoan && (
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Best Value</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {loan.qualified ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                  </CardTitle>
                  <CardDescription className="text-blue-200">{loan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-800/30 p-3 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-blue-300">Monthly Payment</div>
                      <div className="text-lg font-semibold text-white">
                        ${loan.totalMonthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="bg-blue-800/30 p-3 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-blue-300">Interest Rate</div>
                      <div className="text-lg font-semibold text-white">{loan.adjustedRate}%</div>
                    </div>
                    <div className="bg-blue-800/30 p-3 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-blue-300">Down Payment</div>
                      <div className="text-lg font-semibold text-white">
                        {loan.minDown}% (${((loanAmount[0] * loan.minDown) / 100).toLocaleString()})
                      </div>
                    </div>
                    <div className="bg-blue-800/30 p-3 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-blue-300">Total Cost</div>
                      <div className="text-lg font-semibold text-white">
                        ${loan.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                    </div>
                  </div>

                  {loan.monthlyMI > 0 && (
                    <div className="bg-orange-800/30 p-3 rounded-lg border border-orange-500/20">
                      <div className="text-sm text-orange-300">Monthly Insurance</div>
                      <div className="text-lg font-semibold text-white">
                        ${loan.monthlyMI.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  )}

                  {loan.upfrontFee > 0 && (
                    <div className="bg-purple-800/30 p-3 rounded-lg border border-purple-500/20">
                      <div className="text-sm text-purple-300">
                        {loan.fundingFee ? "VA Funding Fee" : "Guarantee Fee"}
                      </div>
                      <div className="text-lg font-semibold text-white">
                        ${loan.upfrontFee.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-300">Affordability Score</span>
                      <span className="text-white font-medium">{loan.affordabilityScore}/100</span>
                    </div>
                    <div className="w-full bg-blue-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          loan.affordabilityScore >= 70
                            ? "bg-gradient-to-r from-green-400 to-green-600"
                            : loan.affordabilityScore >= 50
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "bg-gradient-to-r from-red-400 to-red-600"
                        }`}
                        style={{ width: `${loan.affordabilityScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-white">Benefits:</h4>
                    <div className="space-y-1">
                      {loan.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          <span className="text-xs text-green-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-white">Considerations:</h4>
                    <div className="space-y-1">
                      {loan.drawbacks.map((drawback, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <AlertCircle className="h-3 w-3 text-orange-400" />
                          <span className="text-xs text-orange-300">{drawback}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {loan.qualified && (
                    <Button
                      className={`w-full bg-gradient-to-r ${loan.color} hover:opacity-90`}
                      onClick={() => window.open(`/citizen/loan-center/${loan.id}-loan`, "_blank")}
                    >
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Apply for {loan.name}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="parameters" className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-400" />
                Adjust Loan Parameters
              </CardTitle>
              <CardDescription className="text-blue-200">
                Modify these values to see how they affect your loan options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label className="text-white">Loan Amount: ${loanAmount[0].toLocaleString()}</Label>
                    <Slider
                      value={loanAmount}
                      onValueChange={setLoanAmount}
                      max={1000000}
                      min={50000}
                      step={5000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-blue-300">
                      <span>$50,000</span>
                      <span>$1,000,000</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white">
                      Down Payment: ${downPayment[0].toLocaleString()} (
                      {((downPayment[0] / loanAmount[0]) * 100).toFixed(1)}%)
                    </Label>
                    <Slider
                      value={downPayment}
                      onValueChange={setDownPayment}
                      max={loanAmount[0] * 0.25}
                      min={0}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-blue-300">
                      <span>$0 (0%)</span>
                      <span>${(loanAmount[0] * 0.25).toLocaleString()} (25%)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label className="text-white">Credit Score: {creditScore[0]}</Label>
                    <Slider
                      value={creditScore}
                      onValueChange={setCreditScore}
                      max={850}
                      min={500}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-blue-300">
                      <span>500 (Poor)</span>
                      <span>850 (Excellent)</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white">Loan Term: {loanTerm[0]} years</Label>
                    <Slider
                      value={loanTerm}
                      onValueChange={setLoanTerm}
                      max={30}
                      min={10}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-blue-300">
                      <span>10 years</span>
                      <span>30 years</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                <h4 className="font-medium text-white mb-2">Parameter Impact</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-blue-300 mb-1">Credit Score Impact:</h5>
                    <ul className="space-y-1 text-blue-200">
                      <li>• 740+: Best rates available</li>
                      <li>• 680-739: Good rates</li>
                      <li>• 620-679: Fair rates (+0.25%)</li>
                      <li>• Below 620: Higher rates (+0.5%)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-blue-300 mb-1">Down Payment Impact:</h5>
                    <ul className="space-y-1 text-blue-200">
                      <li>• 20%+: No mortgage insurance</li>
                      <li>• 10-19%: Reduced insurance</li>
                      <li>• 5-9%: Standard insurance</li>
                      <li>• 0-4%: Higher insurance rates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  Cost Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {loanComparisons
                    .filter((loan) => loan.qualified)
                    .sort((a, b) => a.totalCost - b.totalCost)
                    .map((loan, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-blue-800/30 rounded-lg border border-blue-500/20"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded bg-gradient-to-r ${loan.color}`}>
                            <loan.icon className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-white">{loan.name}</div>
                            <div className="text-sm text-blue-300">
                              ${loan.totalMonthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}/month
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-white">
                            ${loan.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </div>
                          <div className="text-sm text-blue-300">Total Cost</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-400" />
                  Monthly Payment Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loanComparisons
                  .filter((loan) => loan.qualified)
                  .map((loan, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white">{loan.name}</span>
                        <span className="text-white">
                          ${loan.totalMonthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between text-blue-300">
                          <span>Principal & Interest:</span>
                          <span>${loan.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                        </div>
                        {loan.monthlyMI > 0 && (
                          <div className="flex justify-between text-orange-300">
                            <span>Mortgage Insurance:</span>
                            <span>${loan.monthlyMI.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                          </div>
                        )}
                      </div>
                      {index < loanComparisons.filter((l) => l.qualified).length - 1 && (
                        <div className="border-t border-blue-500/20 pt-2"></div>
                      )}
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white">Qualification Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {loanComparisons.map((loan, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border text-center ${
                      loan.qualified ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"
                    }`}
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${loan.color} mx-auto mb-2 w-fit`}>
                      <loan.icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-medium text-white mb-1">{loan.name}</h4>
                    <Badge
                      className={
                        loan.qualified
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }
                    >
                      {loan.qualified ? "Qualified" : "Not Qualified"}
                    </Badge>
                    {!loan.qualified && (
                      <p className="text-xs text-red-300 mt-2">
                        {loan.principal > loan.maxLoan ? "Exceeds loan limit" : "Down payment too low"}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card className="bg-gradient-to-br from-green-900/50 to-blue-900/30 backdrop-blur-sm border-green-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                Personalized Recommendations
              </CardTitle>
              <CardDescription className="text-green-200">
                Based on your parameters, here are our recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {bestLoan && (
                <div className="p-4 bg-green-800/30 rounded-lg border border-green-500/20">
                  <h4 className="font-medium text-white mb-2">Best Overall Option: {bestLoan.name}</h4>
                  <p className="text-green-200 mb-3">
                    This loan offers the lowest total cost at ${bestLoan.totalCost.toLocaleString()} over {loanTerm[0]}{" "}
                    years.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      className={`bg-gradient-to-r ${bestLoan.color} hover:opacity-90`}
                      onClick={() => window.open(`/citizen/loan-center/${bestLoan.id}-loan`, "_blank")}
                    >
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Apply Now
                    </Button>
                    <Button
                      variant="outline"
                      className="border-green-500/30 text-green-300 bg-transparent"
                      onClick={() => window.open(`/citizen/loan-center/calculator?type=${bestLoan.id}`, "_blank")}
                    >
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate Details
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {creditScore[0] < 740 && (
                  <div className="p-4 bg-blue-800/30 rounded-lg border border-blue-500/20">
                    <h4 className="font-medium text-white mb-2">Improve Your Credit Score</h4>
                    <p className="text-blue-200 text-sm mb-2">
                      Increasing your credit score to 740+ could save you 0.25-0.5% on interest rates.
                    </p>
                    <p className="text-blue-300 text-xs">
                      Potential savings: $50-100/month on a ${loanAmount[0].toLocaleString()} loan
                    </p>
                  </div>
                )}

                {downPayment[0] < loanAmount[0] * 0.2 && (
                  <div className="p-4 bg-blue-800/30 rounded-lg border border-blue-500/20">
                    <h4 className="font-medium text-white mb-2">Consider 20% Down Payment</h4>
                    <p className="text-blue-200 text-sm mb-2">
                      A 20% down payment eliminates mortgage insurance on conventional loans.
                    </p>
                    <p className="text-blue-300 text-xs">
                      Additional needed: ${(loanAmount[0] * 0.2 - downPayment[0]).toLocaleString()}
                    </p>
                  </div>
                )}

                <div className="p-4 bg-blue-800/30 rounded-lg border border-blue-500/20">
                  <h4 className="font-medium text-white mb-2">Government Loan Benefits</h4>
                  <p className="text-blue-200 text-sm mb-2">
                    Government-backed loans offer unique advantages over conventional loans.
                  </p>
                  <ul className="text-blue-300 text-xs space-y-1">
                    <li>• Lower down payment requirements</li>
                    <li>• Government backing reduces lender risk</li>
                    <li>• Competitive interest rates</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-800/30 rounded-lg border border-blue-500/20">
                  <h4 className="font-medium text-white mb-2">Next Steps</h4>
                  <p className="text-blue-200 text-sm mb-2">Ready to move forward? Here's what to do next.</p>
                  <ul className="text-blue-300 text-xs space-y-1">
                    <li>• Get pre-qualified for your chosen loan</li>
                    <li>• Gather required documentation</li>
                    <li>• Start shopping for properties</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
