"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import {
  Calculator,
  ArrowLeft,
  DollarSign,
  TrendingUp,
  PieChart,
  BarChart3,
  Home,
  Shield,
  Building2,
  Users,
  Download,
  Share,
  Globe,
  Zap,
} from "lucide-react"

export default function LoanCalculatorPage() {
  const router = useRouter()
  const [loanType, setLoanType] = useState("fha")
  const [loanAmount, setLoanAmount] = useState([250000])
  const [interestRate, setInterestRate] = useState([3.1]) // 50-year bond base rate
  const [loanTerm, setLoanTerm] = useState([50]) // Default to 50-year term
  const [downPayment, setDownPayment] = useState([8750]) // 3.5% for FHA
  const [propertyTax, setPropertyTax] = useState([3000])
  const [insurance, setInsurance] = useState([1200])
  const [mip, setMip] = useState([208]) // Mortgage Insurance Premium
  const [governmentGuarantee, setGovernmentGuarantee] = useState([85]) // 30-year guarantee percentage
  const [daxSpread, setDaxSpread] = useState([0.25]) // DAX corporate bond spread

  const loanTypes = {
    fha: {
      name: "FHA 50-Year Bond Loan",
      icon: Home,
      minDown: 3.5,
      maxLoan: 766550,
      color: "from-blue-500 to-cyan-500",
      description: "50-year bond structure with 30-year government guarantee",
      benefits: ["3.5% down payment", "50-year amortization", "30-year guarantee backing", "DAX-mirrored pricing"],
      bondStructure: {
        baseTerm: 50,
        guaranteeTerm: 30,
        corporateMirror: "DAX Secondary",
        riskAdjustment: 0.15,
      },
    },
    va: {
      name: "VA 50-Year Bond Loan",
      icon: Shield,
      minDown: 0,
      maxLoan: 766550,
      color: "from-green-500 to-emerald-500",
      description: "Military exclusive 50-year bond with full government backing",
      benefits: ["0% down payment", "50-year term", "Full guarantee", "Premium DAX pricing"],
      bondStructure: {
        baseTerm: 50,
        guaranteeTerm: 50, // Full term guarantee for VA
        corporateMirror: "DAX Premium",
        riskAdjustment: 0.0,
      },
    },
    usda: {
      name: "USDA 50-Year Rural Bond",
      icon: Building2,
      minDown: 0,
      maxLoan: 500000,
      color: "from-orange-500 to-red-500",
      description: "Rural development 50-year bond with enhanced guarantee",
      benefits: ["0% down payment", "50-year rural structure", "Enhanced guarantee", "Agricultural DAX mirror"],
      bondStructure: {
        baseTerm: 50,
        guaranteeTerm: 35, // Extended rural guarantee
        corporateMirror: "DAX Agricultural",
        riskAdjustment: 0.1,
      },
    },
    sba: {
      name: "SBA 50-Year Business Bond",
      icon: Users,
      minDown: 10,
      maxLoan: 5000000,
      color: "from-purple-500 to-pink-500",
      description: "Business 50-year bond with corporate guarantee structure",
      benefits: ["Business focused", "50-year corporate structure", "SBA guarantee", "Corporate DAX pricing"],
      bondStructure: {
        baseTerm: 50,
        guaranteeTerm: 25, // Business guarantee term
        corporateMirror: "DAX Corporate",
        riskAdjustment: 0.35,
      },
    },
  }

  const currentLoanType = loanTypes[loanType as keyof typeof loanTypes]

  const calculateBondBasedPayment = () => {
    const principal = loanAmount[0] - downPayment[0]
    const bondStructure = currentLoanType.bondStructure

    // Base 50-year bond rate calculation
    const baseBondRate = 3.1 // 50-year US Treasury equivalent

    // DAX corporate bond spread adjustment
    const daxAdjustment = daxSpread[0]

    // Risk adjustment based on loan type
    const riskAdjustment = bondStructure.riskAdjustment

    // Government guarantee discount (30-year guarantee reduces risk)
    const guaranteeDiscount = (governmentGuarantee[0] / 100) * 0.5 // Up to 0.5% discount

    // Final rate calculation mirroring DAX secondary market
    const finalRate = baseBondRate + daxAdjustment + riskAdjustment - guaranteeDiscount

    const monthlyRate = finalRate / 100 / 12
    const numPayments = loanTerm[0] * 12

    if (monthlyRate === 0) {
      return {
        monthlyPayment: principal / numPayments,
        finalRate,
        bondComponents: {
          baseRate: baseBondRate,
          daxSpread: daxAdjustment,
          riskAdjustment,
          guaranteeDiscount,
        },
      }
    }

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)

    return {
      monthlyPayment,
      finalRate,
      bondComponents: {
        baseRate: baseBondRate,
        daxSpread: daxAdjustment,
        riskAdjustment,
        guaranteeDiscount,
      },
    }
  }

  const paymentCalculation = calculateBondBasedPayment()
  const monthlyPayment = paymentCalculation.monthlyPayment
  const effectiveRate = paymentCalculation.finalRate

  const totalInterest = monthlyPayment * loanTerm[0] * 12 - (loanAmount[0] - downPayment[0])
  const totalPayment = monthlyPayment * loanTerm[0] * 12
  const monthlyTax = propertyTax[0] / 12
  const monthlyInsurance = insurance[0] / 12
  const monthlyMIP = mip[0]
  const totalMonthlyPayment = monthlyPayment + monthlyTax + monthlyInsurance + monthlyMIP

  // Calculate guarantee structure benefits
  const guaranteePeriodPayments = Math.min(currentLoanType.bondStructure.guaranteeTerm * 12, loanTerm[0] * 12)
  const postGuaranteePeriod = Math.max(0, loanTerm[0] * 12 - guaranteePeriodPayments)

  const handleLoanTypeChange = (newLoanType: string) => {
    setLoanType(newLoanType)
    const loanTypeData = loanTypes[newLoanType as keyof typeof loanTypes]
    const newDownPayment = (loanAmount[0] * loanTypeData.minDown) / 100
    setDownPayment([newDownPayment])

    // Adjust guarantee percentage based on loan type
    if (newLoanType === "va") {
      setGovernmentGuarantee([100]) // Full guarantee for VA
      setMip([0]) // VA loans don't have PMI
    } else if (newLoanType === "fha") {
      setGovernmentGuarantee([85]) // Standard FHA guarantee
      setMip([208]) // FHA MIP
    } else if (newLoanType === "usda") {
      setGovernmentGuarantee([90]) // USDA guarantee
      setMip([150]) // USDA guarantee fee
    } else {
      setGovernmentGuarantee([75]) // SBA guarantee
      setMip([0]) // No PMI for business loans
    }
  }

  const handleApplyForLoan = () => {
    router.push(`/citizen/loan-center/${loanType}-loan`)
  }

  const handleSaveCalculation = () => {
    const calculationData = {
      loanType: currentLoanType.name,
      bondStructure: currentLoanType.bondStructure,
      loanAmount: loanAmount[0],
      effectiveRate: effectiveRate,
      loanTerm: loanTerm[0],
      downPayment: downPayment[0],
      monthlyPayment: monthlyPayment,
      totalInterest: totalInterest,
      totalPayment: totalPayment,
      totalMonthlyPayment: totalMonthlyPayment,
      governmentGuarantee: governmentGuarantee[0],
      daxSpread: daxSpread[0],
      bondComponents: paymentCalculation.bondComponents,
      calculatedDate: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(calculationData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `${loanType}-50yr-bond-calculation-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const shareCalculation = async () => {
    const shareData = {
      title: `${currentLoanType.name} 50-Year Bond Calculator Results`,
      text: `Monthly Payment: $${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })} | 50-Year Bond Rate: ${effectiveRate.toFixed(3)}% | Government Guarantee: ${governmentGuarantee[0]}%`,
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
      alert("50-Year Bond Calculation copied to clipboard!")
    }
  }

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
                50-Year Government Bond Calculator
              </h1>
              <p className="text-xl text-blue-200 mt-2">
                DAX-mirrored corporate bond structure with government guarantee
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={shareCalculation}
              className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              onClick={handleSaveCalculation}
              className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button
              onClick={handleApplyForLoan}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Apply Now
            </Button>
          </div>
        </div>

        {/* Bond Structure Overview */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/30 backdrop-blur-sm border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="h-5 w-5 text-purple-400" />
              50-Year Bond Structure Overview
            </CardTitle>
            <CardDescription className="text-purple-200">
              Government-guaranteed bonds mirroring DAX secondary market corporate structures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-purple-800/30 p-4 rounded-lg border border-purple-500/20 text-center">
                <div className="text-2xl font-bold text-white">{loanTerm[0]} Years</div>
                <div className="text-sm text-purple-300">Bond Term</div>
              </div>
              <div className="bg-purple-800/30 p-4 rounded-lg border border-purple-500/20 text-center">
                <div className="text-2xl font-bold text-white">{currentLoanType.bondStructure.guaranteeTerm} Years</div>
                <div className="text-sm text-purple-300">Government Guarantee</div>
              </div>
              <div className="bg-purple-800/30 p-4 rounded-lg border border-purple-500/20 text-center">
                <div className="text-2xl font-bold text-white">{effectiveRate.toFixed(3)}%</div>
                <div className="text-sm text-purple-300">Effective Rate</div>
              </div>
              <div className="bg-purple-800/30 p-4 rounded-lg border border-purple-500/20 text-center">
                <div className="text-2xl font-bold text-white">{currentLoanType.bondStructure.corporateMirror}</div>
                <div className="text-sm text-purple-300">DAX Mirror</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loan Type Selection */}
        <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white">Select 50-Year Bond Loan Type</CardTitle>
            <CardDescription className="text-blue-200">
              Choose from government-backed 50-year bond structures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Object.entries(loanTypes).map(([key, loan]) => (
                <Card
                  key={key}
                  className={`cursor-pointer transition-all duration-300 ${
                    loanType === key
                      ? "bg-gradient-to-br from-blue-600/50 to-cyan-600/30 border-blue-400/60 shadow-lg"
                      : "bg-gradient-to-br from-blue-900/30 to-cyan-900/20 border-blue-500/20 hover:border-blue-400/40"
                  }`}
                  onClick={() => handleLoanTypeChange(key)}
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
                    <div className="mt-3 text-xs text-blue-300">
                      {loan.bondStructure.guaranteeTerm}-year guarantee • {loan.bondStructure.corporateMirror}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-blue-900/30 backdrop-blur-sm">
            <TabsTrigger value="calculator">Bond Calculator</TabsTrigger>
            <TabsTrigger value="structure">Bond Structure</TabsTrigger>
            <TabsTrigger value="guarantee">Guarantee Analysis</TabsTrigger>
            <TabsTrigger value="dax-mirror">DAX Mirroring</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Controls */}
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-blue-400" />
                    50-Year Bond Parameters
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Adjust parameters for your {currentLoanType.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-white">Bond Amount: ${loanAmount[0].toLocaleString()}</Label>
                    <Slider
                      value={loanAmount}
                      onValueChange={(value) => {
                        setLoanAmount(value)
                        const newDownPayment = (value[0] * currentLoanType.minDown) / 100
                        setDownPayment([newDownPayment])
                      }}
                      max={currentLoanType.maxLoan}
                      min={10000}
                      step={5000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-blue-300">
                      <span>$10,000</span>
                      <span>${currentLoanType.maxLoan.toLocaleString()}</span>
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

                  <div className="space-y-3">
                    <Label className="text-white">
                      Down Payment: ${downPayment[0].toLocaleString()} (
                      {((downPayment[0] / loanAmount[0]) * 100).toFixed(1)}%)
                    </Label>
                    <Slider
                      value={downPayment}
                      onValueChange={setDownPayment}
                      max={loanAmount[0] * 0.25}
                      min={(loanAmount[0] * currentLoanType.minDown) / 100}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-blue-300">
                      <span>{currentLoanType.minDown}% min</span>
                      <span>25% max</span>
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
                    <Label className="text-white">DAX Spread: {daxSpread[0]}%</Label>
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

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Property Tax (annual)</Label>
                      <Input
                        type="number"
                        value={propertyTax[0]}
                        onChange={(e) => setPropertyTax([Number(e.target.value)])}
                        className="bg-blue-800/30 border-blue-500/30 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Insurance (annual)</Label>
                      <Input
                        type="number"
                        value={insurance[0]}
                        onChange={(e) => setInsurance([Number(e.target.value)])}
                        className="bg-blue-800/30 border-blue-500/30 text-white"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-blue-400" />
                    50-Year Bond Payment Results
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Your {currentLoanType.name} payment breakdown
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">
                      ${totalMonthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-blue-200">Total Monthly Payment</div>
                    <div className="text-sm text-blue-300 mt-1">
                      Effective Rate: {effectiveRate.toFixed(3)}% • {loanTerm[0]}-Year Term
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-blue-300">Principal & Interest</div>
                      <div className="text-xl font-semibold text-white">
                        ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-blue-300">Total Interest (50yr)</div>
                      <div className="text-xl font-semibold text-orange-400">
                        ${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                    </div>
                    <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-blue-300">Down Payment</div>
                      <div className="text-xl font-semibold text-green-400">${downPayment[0].toLocaleString()}</div>
                    </div>
                    <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-blue-300">Bond Principal</div>
                      <div className="text-xl font-semibold text-white">
                        ${(loanAmount[0] - downPayment[0]).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Bond Rate Breakdown */}
                  <div className="bg-purple-800/30 p-4 rounded-lg border border-purple-500/20">
                    <h4 className="font-medium text-white mb-3">Bond Rate Components</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-purple-300">50-Year Base Rate:</span>
                        <span className="text-white">{paymentCalculation.bondComponents.baseRate.toFixed(3)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300">DAX Corporate Spread:</span>
                        <span className="text-white">+{paymentCalculation.bondComponents.daxSpread.toFixed(3)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300">Risk Adjustment:</span>
                        <span className="text-white">
                          +{paymentCalculation.bondComponents.riskAdjustment.toFixed(3)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300">Government Guarantee Discount:</span>
                        <span className="text-green-400">
                          -{paymentCalculation.bondComponents.guaranteeDiscount.toFixed(3)}%
                        </span>
                      </div>
                      <div className="border-t border-purple-500/20 pt-2 flex justify-between font-semibold">
                        <span className="text-white">Effective Bond Rate:</span>
                        <span className="text-white">{effectiveRate.toFixed(3)}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg border border-green-500/20">
                    <h4 className="font-medium text-white mb-2">50-Year Bond Advantages</h4>
                    <div className="space-y-1">
                      {currentLoanType.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Shield className="h-3 w-3 text-green-400" />
                          <span className="text-sm text-green-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="structure" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-400" />
                    Bond Structure Timeline
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    50-year bond with {currentLoanType.bondStructure.guaranteeTerm}-year government guarantee
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {/* Guarantee Period */}
                    <div className="bg-green-800/30 p-4 rounded-lg border border-green-500/20">
                      <h4 className="font-medium text-white mb-2">
                        Government Guarantee Period (Years 1-{currentLoanType.bondStructure.guaranteeTerm})
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-green-300">Guarantee Coverage:</div>
                          <div className="text-white font-medium">{governmentGuarantee[0]}%</div>
                        </div>
                        <div>
                          <div className="text-green-300">Payments Covered:</div>
                          <div className="text-white font-medium">{guaranteePeriodPayments.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-green-300">Risk Level:</div>
                          <div className="text-white font-medium">Minimal</div>
                        </div>
                        <div>
                          <div className="text-green-300">Rate Benefit:</div>
                          <div className="text-white font-medium">
                            -{paymentCalculation.bondComponents.guaranteeDiscount.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Post-Guarantee Period */}
                    {postGuaranteePeriod > 0 && (
                      <div className="bg-orange-800/30 p-4 rounded-lg border border-orange-500/20">
                        <h4 className="font-medium text-white mb-2">
                          Post-Guarantee Period (Years {currentLoanType.bondStructure.guaranteeTerm + 1}-{loanTerm[0]})
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-orange-300">Guarantee Coverage:</div>
                            <div className="text-white font-medium">0% (Market Rate)</div>
                          </div>
                          <div>
                            <div className="text-orange-300">Remaining Payments:</div>
                            <div className="text-white font-medium">{postGuaranteePeriod.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-orange-300">Risk Level:</div>
                            <div className="text-white font-medium">Standard Corporate</div>
                          </div>
                          <div>
                            <div className="text-orange-300">Rate Adjustment:</div>
                            <div className="text-white font-medium">Market-based</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bond Maturity */}
                    <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                      <h4 className="font-medium text-white mb-2">Bond Maturity (Year {loanTerm[0]})</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-blue-300">Final Payment:</div>
                          <div className="text-white font-medium">
                            ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                          </div>
                        </div>
                        <div>
                          <div className="text-blue-300">Total Paid:</div>
                          <div className="text-white font-medium">
                            ${totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </div>
                        </div>
                        <div>
                          <div className="text-blue-300">Interest Paid:</div>
                          <div className="text-white font-medium">
                            ${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </div>
                        </div>
                        <div>
                          <div className="text-blue-300">Bond Status:</div>
                          <div className="text-white font-medium">Fully Amortized</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                    Amortization Analysis
                  </CardTitle>
                  <CardDescription className="text-blue-200">50-year payment structure breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">
                        $
                        {((loanAmount[0] - downPayment[0]) / (loanTerm[0] * 12)).toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </div>
                      <div className="text-sm text-blue-300">Avg Monthly Principal</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-400">
                        ${(totalInterest / (loanTerm[0] * 12)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </div>
                      <div className="text-sm text-blue-300">Avg Monthly Interest</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-blue-300">Principal vs Interest (50-year)</span>
                        <span className="text-white">
                          {(((loanAmount[0] - downPayment[0]) / totalPayment) * 100).toFixed(1)}% /{" "}
                          {((totalInterest / totalPayment) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-blue-700 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-cyan-400 h-3 rounded-full"
                          style={{ width: `${((loanAmount[0] - downPayment[0]) / totalPayment) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                      <h4 className="font-medium text-white mb-2">Year 1 Breakdown</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-300">Principal Paid:</span>
                          <span className="text-white">
                            $
                            {((loanAmount[0] - downPayment[0]) * 0.015).toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-300">Interest Paid:</span>
                          <span className="text-white">
                            $
                            {(monthlyPayment * 12 - (loanAmount[0] - downPayment[0]) * 0.015).toLocaleString(
                              undefined,
                              {
                                maximumFractionDigits: 0,
                              },
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-300">Remaining Balance:</span>
                          <span className="text-white">
                            $
                            {((loanAmount[0] - downPayment[0]) * 0.985).toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                      <h4 className="font-medium text-white mb-2">Year 25 Breakdown (Mid-point)</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-300">Principal Paid (Cumulative):</span>
                          <span className="text-white">
                            $
                            {((loanAmount[0] - downPayment[0]) * 0.35).toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-300">Interest Paid (Cumulative):</span>
                          <span className="text-white">
                            $
                            {(monthlyPayment * 12 * 25 - (loanAmount[0] - downPayment[0]) * 0.35).toLocaleString(
                              undefined,
                              {
                                maximumFractionDigits: 0,
                              },
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-300">Remaining Balance:</span>
                          <span className="text-white">
                            $
                            {((loanAmount[0] - downPayment[0]) * 0.65).toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="guarantee" className="space-y-6">
            <Card className="bg-gradient-to-br from-green-900/50 to-blue-900/30 backdrop-blur-sm border-green-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  Government Guarantee Analysis
                </CardTitle>
                <CardDescription className="text-green-200">
                  {currentLoanType.bondStructure.guaranteeTerm}-year government backing on 50-year bond structure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-800/30 p-6 rounded-lg border border-green-500/20 text-center">
                    <h3 className="text-lg font-bold text-white mb-4">Guarantee Coverage</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-3xl font-bold text-green-400">{governmentGuarantee[0]}%</div>
                        <div className="text-sm text-green-300">Coverage Percentage</div>
                      </div>
                      <div>
                        <div className="text-xl font-semibold text-white">
                          ${((loanAmount[0] - downPayment[0]) * (governmentGuarantee[0] / 100)).toLocaleString()}
                        </div>
                        <div className="text-sm text-green-300">Guaranteed Amount</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-800/30 p-6 rounded-lg border border-blue-500/20 text-center">
                    <h3 className="text-lg font-bold text-white mb-4">Guarantee Period</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-3xl font-bold text-blue-400">
                          {currentLoanType.bondStructure.guaranteeTerm}
                        </div>
                        <div className="text-sm text-blue-300">Years Guaranteed</div>
                      </div>
                      <div>
                        <div className="text-xl font-semibold text-white">
                          {guaranteePeriodPayments.toLocaleString()}
                        </div>
                        <div className="text-sm text-blue-300">Guaranteed Payments</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-800/30 p-6 rounded-lg border border-purple-500/20 text-center">
                    <h3 className="text-lg font-bold text-white mb-4">Rate Benefit</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-3xl font-bold text-purple-400">
                          -{paymentCalculation.bondComponents.guaranteeDiscount.toFixed(2)}%
                        </div>
                        <div className="text-sm text-purple-300">Rate Reduction</div>
                      </div>
                      <div>
                        <div className="text-xl font-semibold text-white">
                          $
                          {(
                            (paymentCalculation.bondComponents.guaranteeDiscount / 100 / 12) *
                            (loanAmount[0] - downPayment[0])
                          ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-sm text-purple-300">Monthly Savings</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-white">Guarantee Benefits</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-green-800/30 rounded-lg border border-green-500/20">
                        <Shield className="h-5 w-5 text-green-400" />
                        <div>
                          <div className="font-medium text-white">Lender Risk Reduction</div>
                          <div className="text-sm text-green-300">Government backing reduces default risk</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-800/30 rounded-lg border border-green-500/20">
                        <DollarSign className="h-5 w-5 text-green-400" />
                        <div>
                          <div className="font-medium text-white">Lower Interest Rates</div>
                          <div className="text-sm text-green-300">Guarantee provides rate discount</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-800/30 rounded-lg border border-green-500/20">
                        <Zap className="h-5 w-5 text-green-400" />
                        <div>
                          <div className="font-medium text-white">Faster Approval</div>
                          <div className="text-sm text-green-300">Government backing speeds underwriting</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-white">Guarantee Structure</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-800/30 rounded-lg border border-blue-500/20">
                        <div className="font-medium text-white mb-1">Primary Guarantee Period</div>
                        <div className="text-sm text-blue-300">
                          Years 1-{currentLoanType.bondStructure.guaranteeTerm}: Full {governmentGuarantee[0]}%
                          government backing
                        </div>
                      </div>
                      {postGuaranteePeriod > 0 && (
                        <div className="p-3 bg-orange-800/30 rounded-lg border border-orange-500/20">
                          <div className="font-medium text-white mb-1">Post-Guarantee Period</div>
                          <div className="text-sm text-orange-300">
                            Years {currentLoanType.bondStructure.guaranteeTerm + 1}-{loanTerm[0]}: Market-rate corporate
                            bond structure
                          </div>
                        </div>
                      )}
                      <div className="p-3 bg-purple-800/30 rounded-lg border border-purple-500/20">
                        <div className="font-medium text-white mb-1">Guarantee Agency</div>
                        <div className="text-sm text-purple-300">
                          {loanType === "fha"
                            ? "FHA/HUD"
                            : loanType === "va"
                              ? "Department of Veterans Affairs"
                              : loanType === "usda"
                                ? "USDA Rural Development"
                                : "Small Business Administration"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dax-mirror" className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-400" />
                  DAX Secondary Market Mirroring
                </CardTitle>
                <CardDescription className="text-purple-200">
                  Corporate bond structure mirroring DAX secondary market pricing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-purple-800/30 p-4 rounded-lg border border-purple-500/20 text-center">
                    <div className="text-2xl font-bold text-white">{currentLoanType.bondStructure.corporateMirror}</div>
                    <div className="text-sm text-purple-300">DAX Mirror Type</div>
                  </div>
                  <div className="bg-purple-800/30 p-4 rounded-lg border border-purple-500/20 text-center">
                    <div className="text-2xl font-bold text-white">{daxSpread[0].toFixed(2)}%</div>
                    <div className="text-sm text-purple-300">Corporate Spread</div>
                  </div>
                  <div className="bg-purple-800/30 p-4 rounded-lg border border-purple-500/20 text-center">
                    <div className="text-2xl font-bold text-white">
                      {paymentCalculation.bondComponents.riskAdjustment.toFixed(2)}%
                    </div>
                    <div className="text-sm text-purple-300">Risk Adjustment</div>
                  </div>
                  <div className="bg-purple-800/30 p-4 rounded-lg border border-purple-500/20 text-center">
                    <div className="text-2xl font-bold text-white">{effectiveRate.toFixed(3)}%</div>
                    <div className="text-sm text-purple-300">Final Rate</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-white">DAX Corporate Bond Characteristics</h4>
                    <div className="space-y-3">
                      {loanType === "fha" && (
                        <div className="p-3 bg-blue-800/30 rounded-lg border border-blue-500/20">
                          <div className="font-medium text-white mb-1">DAX Secondary Market</div>
                          <div className="text-sm text-blue-300">
                            Mirrors German corporate bonds with government backing overlay
                          </div>
                        </div>
                      )}
                      {loanType === "va" && (
                        <div className="p-3 bg-green-800/30 rounded-lg border border-green-500/20">
                          <div className="font-medium text-white mb-1">DAX Premium Tier</div>
                          <div className="text-sm text-green-300">
                            Premium corporate structure with sovereign-level backing
                          </div>
                        </div>
                      )}
                      {loanType === "usda" && (
                        <div className="p-3 bg-orange-800/30 rounded-lg border border-orange-500/20">
                          <div className="font-medium text-white mb-1">DAX Agricultural Sector</div>
                          <div className="text-sm text-orange-300">
                            Agricultural and rural development corporate bond structure
                          </div>
                        </div>
                      )}
                      {loanType === "sba" && (
                        <div className="p-3 bg-purple-800/30 rounded-lg border border-purple-500/20">
                          <div className="font-medium text-white mb-1">DAX Corporate Tier</div>
                          <div className="text-sm text-purple-300">
                            Standard corporate bond structure with business guarantee
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-white">Pricing Components</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-800/30 rounded-lg border border-blue-500/20">
                        <div className="flex justify-between items-center">
                          <span className="text-blue-300">50-Year Base Rate:</span>
                          <span className="text-white">{paymentCalculation.bondComponents.baseRate.toFixed(3)}%</span>
                        </div>
                        <div className="text-xs text-blue-400 mt-1">US Treasury 50-year equivalent</div>
                      </div>
                      <div className="p-3 bg-purple-800/30 rounded-lg border border-purple-500/20">
                        <div className="flex justify-between items-center">
                          <span className="text-purple-300">DAX Corporate Spread:</span>
                          <span className="text-white">+{paymentCalculation.bondComponents.daxSpread.toFixed(3)}%</span>
                        </div>
                        <div className="text-xs text-purple-400 mt-1">German corporate bond premium</div>
                      </div>
                      <div className="p-3 bg-orange-800/30 rounded-lg border border-orange-500/20">
                        <div className="flex justify-between items-center">
                          <span className="text-orange-300">Risk Adjustment:</span>
                          <span className="text-white">
                            +{paymentCalculation.bondComponents.riskAdjustment.toFixed(3)}%
                          </span>
                        </div>
                        <div className="text-xs text-orange-400 mt-1">Loan-specific risk premium</div>
                      </div>
                      <div className="p-3 bg-green-800/30 rounded-lg border border-green-500/20">
                        <div className="flex justify-between items-center">
                          <span className="text-green-300">Government Discount:</span>
                          <span className="text-white">
                            -{paymentCalculation.bondComponents.guaranteeDiscount.toFixed(3)}%
                          </span>
                        </div>
                        <div className="text-xs text-green-400 mt-1">Government guarantee benefit</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-lg border border-purple-500/20">
                  <h4 className="font-medium text-white mb-4">50-Year Bond vs Traditional Mortgage Comparison</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-purple-300 mb-2">50-Year Bond Structure</h5>
                      <ul className="space-y-1 text-sm text-purple-200">
                        <li>• Extended 50-year amortization</li>
                        <li>• Government guarantee overlay</li>
                        <li>• DAX corporate bond pricing</li>
                        <li>• Lower monthly payments</li>
                        <li>• Secondary market liquidity</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-blue-300 mb-2">Traditional 30-Year Mortgage</h5>
                      <ul className="space-y-1 text-sm text-blue-200">
                        <li>• Standard 30-year amortization</li>
                        <li>• Basic government backing</li>
                        <li>• Traditional mortgage pricing</li>
                        <li>• Higher monthly payments</li>
                        <li>• Limited secondary market</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-green-800/30 rounded-lg border border-green-500/20">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-white mb-1">Monthly Payment Savings</div>
                      <div className="text-2xl font-bold text-green-400">
                        $
                        {(
                          ((loanAmount[0] - downPayment[0]) * (6.5 / 100 / 12) * Math.pow(1 + 6.5 / 100 / 12, 360)) /
                            (Math.pow(1 + 6.5 / 100 / 12, 360) - 1) -
                          monthlyPayment
                        ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-sm text-green-300">vs 30-year traditional mortgage at 6.5%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
