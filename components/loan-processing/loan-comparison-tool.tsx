"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import {
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
  Globe,
  Zap,
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
  const [loanTerm, setLoanTerm] = useState([50]) // Default to 50-year bond structure
  const [governmentGuarantee, setGovernmentGuarantee] = useState([85])
  const [daxSpread, setDaxSpread] = useState([0.25])

  const loanTypes = [
    {
      id: "fha",
      name: "FHA 50-Year Bond",
      icon: Home,
      color: "from-blue-500 to-cyan-500",
      baseRate: 3.1, // 50-year bond base
      minDown: 3.5,
      maxLoan: 766550,
      mipRate: 0.85,
      description: "50-year bond structure with 30-year government guarantee",
      benefits: ["3.5% down payment", "50-year amortization", "30-year guarantee", "DAX-mirrored pricing"],
      drawbacks: ["Mortgage insurance required", "Loan limits apply", "Extended interest period"],
      bondStructure: {
        baseTerm: 50,
        guaranteeTerm: 30,
        corporateMirror: "DAX Secondary",
        riskAdjustment: 0.15,
      },
    },
    {
      id: "va",
      name: "VA 50-Year Bond",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      baseRate: 3.1,
      minDown: 0,
      maxLoan: 766550,
      mipRate: 0,
      fundingFee: 2.15,
      description: "Military exclusive 50-year bond with full government backing",
      benefits: ["0% down payment", "50-year term", "Full guarantee", "Premium DAX pricing"],
      drawbacks: ["Military service required", "Funding fee applies", "Extended term"],
      bondStructure: {
        baseTerm: 50,
        guaranteeTerm: 50, // Full term guarantee
        corporateMirror: "DAX Premium",
        riskAdjustment: 0.0,
      },
    },
    {
      id: "usda",
      name: "USDA 50-Year Rural Bond",
      icon: Building2,
      color: "from-orange-500 to-red-500",
      baseRate: 3.0, // Slightly better rate for rural
      minDown: 0,
      maxLoan: 500000,
      mipRate: 0.35,
      description: "Rural development 50-year bond with enhanced guarantee",
      benefits: ["0% down payment", "50-year rural structure", "Enhanced guarantee", "Agricultural DAX mirror"],
      drawbacks: ["Rural areas only", "Income limits apply", "Property restrictions"],
      bondStructure: {
        baseTerm: 50,
        guaranteeTerm: 35, // Extended rural guarantee
        corporateMirror: "DAX Agricultural",
        riskAdjustment: 0.1,
      },
    },
    {
      id: "sba",
      name: "SBA 50-Year Business Bond",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      baseRate: 3.2,
      minDown: 10,
      maxLoan: 5000000,
      mipRate: 0,
      guaranteeFee: 3.5,
      description: "Business 50-year bond with corporate guarantee structure",
      benefits: ["Business focused", "50-year corporate structure", "SBA guarantee", "Corporate DAX pricing"],
      drawbacks: ["Business use only", "Higher rates", "Complex requirements"],
      bondStructure: {
        baseTerm: 50,
        guaranteeTerm: 25, // Business guarantee term
        corporateMirror: "DAX Corporate",
        riskAdjustment: 0.35,
      },
    },
  ]

  const calculateBondBasedLoanDetails = (loan: any) => {
    const principal = loanAmount[0] - downPayment[0]
    
    // 50-year bond rate calculation
    const baseBondRate = loan.baseRate
    const daxAdjustment = daxSpread[0]
    const riskAdjustment = loan.bondStructure.riskAdjustment
    
    // Government guarantee discount based on guarantee term and percentage
    const guaranteeStrength = (loan.bondStructure.guaranteeTerm / 50) * (governmentGuarantee[0] / 100)
    const guaranteeDiscount = guaranteeStrength * 0.6 // Up to 0.6% discount
    
    // Credit score adjustment
    const creditAdjustment = creditScore[0] < 680 ? 0.5 : creditScore[0] < 740 ? 0.25 : creditScore[0] >= 800 ? -0.15 : 0
    
    // Final DAX-mirrored rate
    const adjustedRate = baseBondRate + daxAdjustment + riskAdjustment + creditAdjustment - guaranteeDiscount
    
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

    // Calculate bond structure benefits
    const guaranteePeriodPayments = Math.min(loan.bondStructure.guaranteeTerm * 12, loanTerm[0] * 12)
    const postGuaranteePeriod = Math.max(0, loanTerm[0] * 12 - guaranteePeriodPayments)
    
    // Calculate affordability score (0-100) based on 50-year structure
    const monthlyIncome = 6000 // Assumed monthly income for scoring
    const dti = (totalMonthlyPayment / monthlyIncome) * 100
    const affordabilityScore = Math.max(0, 100 - dti * 1.5) // Better score due to lower payments

    // Calculate savings vs 30-year traditional
    const traditional30Rate = 6.5
    const traditional30Monthly = (principal * (traditional30Rate / 100 / 12) * Math.pow(1 + traditional30Rate / 100 / 12, 360)) /
                                 (Math.pow(1 + traditional30Rate / 100 / 12, 360) - 1)
    const monthlySavings = traditional30Monthly - monthlyPayment

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
      guaranteePeriodPayments,
      postGuaranteePeriod,
      monthlySavings,
      bondComponents: {
        baseRate: baseBondRate,
        daxSpread: daxAdjustment,
        riskAdjustment,
        creditAdjustment,
        guaranteeDiscount,
      },
    }
  }

  const loanComparisons = loanTypes.map(calculateBondBasedLoanDetails)
  const bestLoan = loanComparisons
    .filter((loan) => loan.qualified)
    .reduce((best, current) => (current.totalCost < best.totalCost ? current : best), loanComparisons[0])

  const handleExportComparison = () => {
    const comparisonData = {
      bondStructure: "50-Year Government Bond with DAX Mirroring",
      parameters: {
        loanAmount: loanAmount[0],
        downPayment: downPayment[0],
        creditScore: creditScore[0],
        loanTerm: loanTerm[0],
        governmentGuarantee: governmentGuarantee[0],
        daxSpread: daxSpread[0],
      },
      comparisons: loanComparisons.map((loan) => ({
        name: loan.name,
        bondStructure: loan.bondStructure,
        monthlyPayment: loan.totalMonthlyPayment,
        totalCost: loan.totalCost,
        effectiveRate: loan.adjustedRate,
        monthlySavings: loan.monthlySavings,
        qualified: loan.qualified,
        bondComponents: loan.bondComponents,
      })),
      bestOption: bestLoan.name,
      generatedDate: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(comparisonData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `50yr-bond-comparison-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const shareComparison = async () => {
    const shareData = {
      title: "50-Year Government Bond Loan Comparison",
      text: `Best option: ${bestLoan.name} with $${bestLoan.totalMonthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}/month | 50-year bond structure`,
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
      alert("50-Year Bond Comparison copied to clipboard!")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/30 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="h-5 w-5 text-purple-400" />
            50-Year Government Bond Comparison Tool
          </CardTitle>
          <CardDescription className="text-purple-200">
            Compare 50-year bond structures with DAX secondary market mirroring and government guarantees
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">${loanAmount[0].toLocaleString()}</div>
                <div className="text-sm text-purple-300">Bond Amount</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{loanTerm[0]} Years</div>
                <div className="text-sm text-purple-300">Bond Term</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{governmentGuarantee[0]}%</div>
                <div className="text-sm text-purple-300">Gov Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{daxSpread[0]}%</div>
                <div className="text-sm text-purple-300">DAX Spread</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={shareComparison}
                className="border-purple-500/30 text-purple-300 bg-transparent"
              >
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                onClick={handleExportComparison}
                className="border-purple-500/30 text-purple-300 bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="comparison" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-blue-900/30 backdrop-blur-sm">
          <TabsTrigger value="comparison">Bond Comparison</TabsTrigger>
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="structure">Bond Structure</TabsTrigger>
          <TabsTrigger value="dax-analysis">DAX Analysis</TabsTrigger>
          <TabsTrigger value="savings">Savings Analysis</TabsTrigger>
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
                <CardDescription className="text-blue-100">
                  Best 50-year bond structure with lowest total cost and optimal DAX mirroring
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    ${bestLoan.totalMonthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm text-blue-100">Monthly Payment</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{bestLoan.adjustedRate.toFixed(3)}%</div>
                  <div className="text-sm text-blue-100">Bond Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{bestLoan.bondStructure.guaranteeTerm}yr</div>
                  <div className="text-sm text-blue-100">Guarantee Term</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    ${bestLoan.monthlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-sm text-blue-100">Monthly Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{bestLoan.affordabilityScore}</div>
                  <div className="text-sm text-blue-100">Affordability Score</div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Bond Comparison Grid */}
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
                      <div>
                        <div>{loan.name}</div>
                        <div className="text-sm text-blue-300 font-normal">
                          {loan.bondStructure.corporateMirror} • {loan.bondStructure.guaranteeTerm}yr guarantee
                        </div>
                      </div>
                      {loan === bestLoan && (
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Best Bond</Badge>
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
                      <div className="text-sm text-blue-300">Bond Rate</div>
                      <div className="text-lg font-semibold text-white">{loan.adjustedRate.toFixed(3)}%</div>
                    </div>
                    <div className="bg-blue-800/30 p-3 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-blue-300">Monthly Savings</div>
                      <div className="text-lg font-semibold text-green-400">
                        ${loan.monthlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                    </div>
                    <div className="bg-blue-800/30 p-3 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-blue-300">Total Cost (50yr)</div>
                      <div className="text-lg font-semibold text-white">
                        ${loan.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                    </div>
                  </div>

                  {/* Bond Rate Breakdown */}
                  <div className="bg-purple-800/30 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="text-sm font-medium text-white mb-2">Bond Rate Components</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-purple-300">Base Rate:</span>
                        <span className="text-white">{loan.bondComponents.baseRate.toFixed(3)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300">DAX Spread:</span>
                        <span className="text-white">+{loan.bondComponents.daxSpread.toFixed(3)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300">Risk Adj:</span>
                        <span className="text-white">+{loan.bondComponents.riskAdjustment.toFixed(3)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300">Gov Discount:</span>
                        <span className="text-green-400">-{loan.bondComponents.guaranteeDiscount.toFixed(3)}%</span>
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
                    <h4 className="text-sm font-medium text-white">50-Year Bond Benefits:</h4>
                    <div className="space-y-1">
                      {loan.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          <span className="text-xs text-green-300">{benefit}</span>
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
                50-Year Bond Parameters
              </CardTitle>
              <CardDescription className="text-blue-200">
                Adjust these values to see how they affect your 50-year bond options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label className="text-white">Bond Amount: ${loanAmount[0].toLocaleString()}</Label>
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

                  <div className="space-y-3">
                    <Label className="text-white">Bond Term: {loanTerm[0]} years</Label>
                    <Slider
                      value={loanTerm}
                      onValueChange={setLoanTerm}
                      max={50}
                      min={30}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-blue-300">
                      <span>30 years</span>
                      <span>50 years</span>
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
                    <Label className="text-white">Government Guarantee: {governmentGuarantee[0]}%</Label>
                    <Slider
                      value={governmentGuarantee}
                      onValueChange={setGovernmentGuarantee}
                      max={100}
                      min={50}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-blue-300">
                      <span>50% min</span>
                      <span>100% max</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white">DAX Corporate Spread: {daxSpread[0]}%</Label>
                    <Slider
                      value={daxSpread}
                      onValueChange={setDaxSpread}
                      max={1.0}
                      min={0.1}
                      step={0.05}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-blue-300">
                      <span>0.1% (tight)</span>
                      <span>1.0% (wide)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-800/30 p-4 rounded-lg border border-purple-500/20">
                <h4 className="font-medium text-white mb-2">50-Year Bond Parameter Impact</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-purple-300 mb-1">Bond Term Impact:</h5>
                    <ul className="space-y-1 text-purple-200">
                      <li>• 50 years: Lowest monthly payments</li>
                      <li>• 40 years: Balanced payment/interest</li>
                      <li>• 30 years: Higher payments, less interest</li>
                      <li>• Extended terms increase total interest</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-purple-300 mb-1">Government Guarantee Impact:</h5>
                    <ul className="space-y-1 text-purple-200">
                      <li>• 100%: Maximum rate discount</li>
                      <li>• 85%: Standard government backing</li>
                      <li>• 75%: Reduced government support</li>
                      <li>• Higher guarantee = lower rates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="structure" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {loanComparisons.filter(loan => loan.qualified).map((loan, index) => (
              <Card key={index} className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <loan.icon className="h-5 w-5 text-blue-400" />
                    {loan.name} Structure
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    {loan.bondStructure.baseTerm}-year bond with {loan.bondStructure.guaranteeTerm}-year guarantee
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Guarantee Period */}
                  <div className="bg-green-800/30 p-4 rounded-lg border border-green-500/20">
                    <h4 className="font-medium text-white mb-2">
                      Government Guarantee Period (Years 1-{loan.bondStructure.guaranteeTerm})
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-green-300">Coverage:</div>
                        <div className="text-white font-medium">{governmentGuarantee[0]}%</div>
                      </div>
                      <div>
                        <div className="text-green-300">Payments:</div>
                        <div className="text-white font-medium">{loan.guaranteePeriodPayments.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-green-300">Rate Benefit:</div>
                        <div className="text-white font-medium">-{loan.bondComponents.guaranteeDiscount.toFixed(2)}%</div>
                      </div>
                      <div>
                        <div className="text-green-300">DAX Mirror:</div>
                        <div className="text-white font-medium">{loan.bondStructure.corporateMirror}</div>
                      </div>
                    </div>
                  </div>

                  {/* Post-Guarantee Period */}
                  {loan.postGuaranteePeriod > 0 && (
                    <div className="bg-orange-800/30 p-4 rounded-lg border border-orange-500/20">
                      <h4 className="font-medium text-white mb-2">
                        Post-Guarantee Period (Years {loan.bondStructure.guaranteeTerm + 1}-{loanTerm[0]})
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-orange-300">Coverage:</div>
                          <div className="text-white font-medium">Market Rate</div>
                        </div>
                        <div>
                          <div className="text-orange-300">Payments:</div>
                          <div className="text-white font-medium">{loan.postGuaranteePeriod.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-orange-300">Structure:</div>
                          <div className="text-white font-medium">Corporate Bond</div>
                        </div>
                        <div>
                          <div className="text-orange-300">Risk Level:</div>
                          <div className="text-white font-medium">Standard</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bond Characteristics */}
                  <div className="bg-purple-800/30 p-4 rounded-lg border border-purple-500/20">
                    <h4 className="font-medium text-white mb-2">Bond Characteristics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-purple-300">Base Term:</span>
                        <span className="text-white">{loan.bondStructure.baseTerm} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300">Guarantee Term:</span>
                        <span className="text-white">{loan.bondStructure.guaranteeTerm} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300">DAX Mirror:</span>
                        <span className="text-white">{loan.bondStructure.corporateMirror}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300">Risk Adjustment:</span>
                        <span className="text-white">{loan.bondStructure.riskAdjustment.toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="dax-analysis" className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/30 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-400" />
                DAX Secondary Market Analysis
              </CardTitle>
              <CardDescription className="text-purple-200">
                How each loan type mirrors DAX corporate bond structures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {loanComparisons.filter(loan => loan.qualified).map((loan, index) => (
                  <div key={index} className="bg-purple-800/30 p-4 rounded-lg border border-purple-500/20 text-center">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${loan.color} mx-auto mb-3 w-fit`}>
                      <loan.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{loan.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <div className="text-purple-300">DAX Mirror:</div>
                        <div className="text-white font-medium">{loan.bondStructure.corporateMirror}</div>
                      </div>
                      <div>
                        <div className="text-purple-300">Spread:</div>
                        <div className="text-white font-medium">{loan.bondComponents.daxSpread.toFixed(2)}%</div>
                      </div>
                      <div>
                        <div className="text-purple-300">Final Rate:</div>
                        <div className="text-white font-medium">{loan.adjustedRate.toFixed(3)}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-white">DAX Corporate Bond Mirroring</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-800/30 rounded-lg border border-blue-500/20">
                      <div className="font-medium text-white mb-1">DAX Secondary Market</div>
                      <div className="text-sm text-blue-300">
                        German corporate bonds provide stable, liquid secondary market pricing for government-backed loans
                      </div>
                    </div>
                    <div className="p-3 bg-green-800/30 rounded-lg border border-green-500/20">
                      <div className="font-medium text-white mb-1">Premium Tier Bonds</div>
                      <div className="text-sm text-green-300">
                        VA loans mirror premium DAX corporate bonds with sovereign-level backing characteristics
                      </div>
                    </div>
                    <div className="p-3 bg-orange-800/30 rounded-lg border border-orange-500/20">
                      <div className="font-medium text-white mb-1">Sector-Specific Mirroring</div>
                      <div className="text-sm text-orange-300">
                        USDA loans follow agricultural sector bonds, SBA follows general corporate structures
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-white">Rate Component Breakdown</h4>
                    <div className="space-y-3">
                      {loanComparisons.filter(loan => loan.qualified).map((loan, index) => (
                        <div key={index} className="p-3 bg-purple-800/30 rounded-lg border border-purple-500/20">
                          <div className="font-medium text-white mb-2">{loan.name} Components</div>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-purple-300">50-Year Base:</span>
                              <span className="text-white">{loan.bondComponents.baseRate.toFixed(3)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-purple-300">DAX Spread:</span>
                              <span className="text-white">+{loan.bondComponents.daxSpread.toFixed(3)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-purple-300">Risk Adj:</span>
                              <span className="text-white">+{loan.bondComponents.riskAdjustment.toFixed(3)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-purple-300">Gov Discount:</span>
                              <span className="text-green-400">-{loan.bondComponents.guaranteeDiscount.toFixed(3)}%</span>
                            </div>
                            <div className="border-t border-purple-500/20 pt-1 flex justify-between font-medium">
                              <span className="text-white">Final Rate:</span>
                              <span className="text-white">{loan.adjustedRate.toFixed(3)}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="savings" className="space-y-6">
            <Card className="bg-gradient-to-br from-green-900/50 to-blue-900/30 backdrop-blur-sm border-green-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  50-Year Bond Savings Analysis
                </CardTitle>
                <CardDescription className="text-green-200">
                  Compare savings vs traditional 30-year mortgages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {loanComparisons.filter(loan => loan.qualified).map((loan, index) => (
                    <div key={index} className="bg-green-800/30 p-4 rounded-lg border border-green-500/20 text-center">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${loan.color} mx-auto mb-2 w-fit`}>
                        <loan.icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">{loan.name}</h3>
                      <div className="space-y-2">
                        <div>
                          <div className="text-2xl font-bold text-green-400">
                            ${loan.monthlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </div>
                          <div className="text-sm text-green-300">Monthly Savings</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-white">
                            ${(loan.monthlySavings * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </div>
                          <div className="text-sm text-green-300">Annual Savings</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-white">50-Year Bond Advantages</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-green-800/30 rounded-lg border border-green-500/20">
                        <DollarSign className="h-5 w-5 text-green-400" />
                        <div>
                          <div className="font-medium text-white">Lower Monthly Payments</div>
                          <div className="text-sm text-green-300">Extended amortization reduces monthly burden</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-800/30 rounded-lg border border-green-500/20">
                        <Shield className="h-5 w-5 text-green-400" />
                        <div>
                          <div className="font-medium text-white">Government Backing</div>
                          <div className="text-sm text-green-300">30-year guarantee provides rate benefits</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-800/30 rounded-lg border border-green-500/20">
                        <Globe className="h-5 w-5 text-green-400" />
                        <div>
                          <div className="font-medium text-white">DAX Market Pricing</div>
                          <div className="text-sm text-green-300">Corporate bond structure with liquidity</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-800/30 rounded-lg border border-green-500/20">
                        <Zap className="h-5 w-5 text-green-400" />
                        <div>
                          <div className="font-medium text-white">Improved Cash Flow</div>
                          <div className="text-sm text-green-300">More capital available for investments</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-white">Lifetime Savings Comparison</h4>
                    <div className="space-y-3">
                      {loanComparisons.filter(loan => loan.qualified).slice(0, 2).map((loan, index) => (
                        <div key={index} className="p-4 bg-blue-800/30 rounded-lg border border-blue-500/20">
                          <div className="font-medium text-white mb-2">{loan.name} vs 30-Year Traditional</div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-blue-300">Monthly Savings:</span>
                              <span className="text-green-400">
                                ${loan.monthlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-blue-300">30-Year Savings:</span>
                              <span className="text-green-400">
                                ${(loan.monthlySavings * 360).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-blue-300">50-Year Total Interest:</span>
                              <span className="text-orange-400">
                                ${loan.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-blue-300">Net Cash Flow Benefit:</span>
                              <span className="text-white font-medium">
                                ${((loan.monthlySavings * 360) - (loan.totalInterest * 0.3)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-6 rounded-lg border border-green-500/20">
                  <h4 className="font-medium text-white mb-4">Investment Opportunity Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">
                        ${bestLoan?.monthlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-green-300">Monthly Cash Available</div>
                      <div className="text-xs text-green-400 mt-1">For investment or other uses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">
                        ${((bestLoan?.monthlySavings || 0) * 12 * 0.07).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-blue-300">Annual Investment Return</div>
                      <div className="text-xs text-blue-400 mt-1">At 7% annual return</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">
                        ${(((bestLoan?.monthlySavings || 0) * 12 * 30) * 1.5).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-purple-300">30-Year Investment Value</div>
                      <div className="text-xs text-purple-400 mt-1">Compounded growth potential</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }\
}
