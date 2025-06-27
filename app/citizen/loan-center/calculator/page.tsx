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
} from "lucide-react"

export default function LoanCalculatorPage() {
  const router = useRouter()
  const [loanType, setLoanType] = useState("fha")
  const [loanAmount, setLoanAmount] = useState([250000])
  const [interestRate, setInterestRate] = useState([6.5])
  const [loanTerm, setLoanTerm] = useState([30])
  const [downPayment, setDownPayment] = useState([8750]) // 3.5% for FHA
  const [propertyTax, setPropertyTax] = useState([3000])
  const [insurance, setInsurance] = useState([1200])
  const [mip, setMip] = useState([208]) // Mortgage Insurance Premium

  const loanTypes = {
    fha: {
      name: "FHA Loan",
      icon: Home,
      minDown: 3.5,
      maxLoan: 766550,
      color: "from-blue-500 to-cyan-500",
      description: "Government-backed with low down payment",
      benefits: ["3.5% down payment", "Flexible credit requirements", "Government backing"],
    },
    va: {
      name: "VA Loan",
      icon: Shield,
      minDown: 0,
      maxLoan: 766550,
      color: "from-green-500 to-emerald-500",
      description: "Exclusive military benefit with no down payment",
      benefits: ["0% down payment", "No PMI required", "Competitive rates"],
    },
    usda: {
      name: "USDA Loan",
      icon: Building2,
      minDown: 0,
      maxLoan: 500000,
      color: "from-orange-500 to-red-500",
      description: "Rural development with no down payment",
      benefits: ["0% down payment", "Below-market rates", "Rural areas only"],
    },
    sba: {
      name: "SBA Loan",
      icon: Users,
      minDown: 10,
      maxLoan: 5000000,
      color: "from-purple-500 to-pink-500",
      description: "Business loans with government guarantee",
      benefits: ["Up to 85% guarantee", "Long repayment terms", "Competitive rates"],
    },
  }

  const currentLoanType = loanTypes[loanType as keyof typeof loanTypes]

  const calculateMonthlyPayment = () => {
    const principal = loanAmount[0] - downPayment[0]
    const monthlyRate = interestRate[0] / 100 / 12
    const numPayments = loanTerm[0] * 12

    if (monthlyRate === 0) {
      return principal / numPayments
    }

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)

    return monthlyPayment
  }

  const monthlyPayment = calculateMonthlyPayment()
  const totalInterest = monthlyPayment * loanTerm[0] * 12 - (loanAmount[0] - downPayment[0])
  const totalPayment = monthlyPayment * loanTerm[0] * 12
  const monthlyTax = propertyTax[0] / 12
  const monthlyInsurance = insurance[0] / 12
  const monthlyMIP = mip[0]
  const totalMonthlyPayment = monthlyPayment + monthlyTax + monthlyInsurance + monthlyMIP

  const handleLoanTypeChange = (newLoanType: string) => {
    setLoanType(newLoanType)
    const loanTypeData = loanTypes[newLoanType as keyof typeof loanTypes]
    const newDownPayment = (loanAmount[0] * loanTypeData.minDown) / 100
    setDownPayment([newDownPayment])

    // Adjust MIP/PMI based on loan type
    if (newLoanType === "va") {
      setMip([0]) // VA loans don't have PMI
    } else if (newLoanType === "fha") {
      setMip([208]) // FHA MIP
    } else {
      setMip([150]) // Standard PMI
    }
  }

  const handleApplyForLoan = () => {
    router.push(`/citizen/loan-center/${loanType}-loan`)
  }

  const handleSaveCalculation = () => {
    const calculationData = {
      loanType: currentLoanType.name,
      loanAmount: loanAmount[0],
      interestRate: interestRate[0],
      loanTerm: loanTerm[0],
      downPayment: downPayment[0],
      monthlyPayment: monthlyPayment,
      totalInterest: totalInterest,
      totalPayment: totalPayment,
      totalMonthlyPayment: totalMonthlyPayment,
      calculatedDate: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(calculationData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `${loanType}-loan-calculation-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const shareCalculation = async () => {
    const shareData = {
      title: `${currentLoanType.name} Calculator Results`,
      text: `Monthly Payment: $${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })} | Total: $${totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
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
      alert("Calculation copied to clipboard!")
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
                Government Loan Calculator
              </h1>
              <p className="text-xl text-blue-200 mt-2">Calculate payments for government-guaranteed loans</p>
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

        {/* Loan Type Selection */}
        <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white">Select Government Loan Type</CardTitle>
            <CardDescription className="text-blue-200">Choose from federally-backed loan programs</CardDescription>
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-blue-900/30 backdrop-blur-sm">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="comparison">Compare Terms</TabsTrigger>
            <TabsTrigger value="breakdown">Payment Breakdown</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Controls */}
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-blue-400" />
                    {currentLoanType.name} Parameters
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Adjust the loan parameters to calculate your payments
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-white">Loan Amount: ${loanAmount[0].toLocaleString()}</Label>
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
                    <Label className="text-white">Interest Rate: {interestRate[0]}%</Label>
                    <Slider
                      value={interestRate}
                      onValueChange={setInterestRate}
                      max={12}
                      min={2}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-blue-300">
                      <span>2%</span>
                      <span>12%</span>
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

                  <div className="space-y-2">
                    <Label className="text-white">
                      {loanType === "fha" ? "MIP" : loanType === "va" ? "Funding Fee" : "PMI"} (monthly)
                    </Label>
                    <Input
                      type="number"
                      value={mip[0]}
                      onChange={(e) => setMip([Number(e.target.value)])}
                      className="bg-blue-800/30 border-blue-500/30 text-white"
                      disabled={loanType === "va"}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-blue-400" />
                    Payment Results
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
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-blue-300">Principal & Interest</div>
                      <div className="text-xl font-semibold text-white">
                        ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-blue-300">Total Interest</div>
                      <div className="text-xl font-semibold text-orange-400">
                        ${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                    </div>
                    <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-blue-300">Down Payment</div>
                      <div className="text-xl font-semibold text-green-400">${downPayment[0].toLocaleString()}</div>
                    </div>
                    <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-blue-300">Loan Amount</div>
                      <div className="text-xl font-semibold text-white">
                        ${(loanAmount[0] - downPayment[0]).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-white">Monthly Payment Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-300">Principal & Interest</span>
                        <span className="text-white font-medium">
                          ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-300">Property Tax</span>
                        <span className="text-white font-medium">
                          ${monthlyTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-300">Insurance</span>
                        <span className="text-white font-medium">
                          ${monthlyInsurance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-300">
                          {loanType === "fha" ? "MIP" : loanType === "va" ? "Funding Fee" : "PMI"}
                        </span>
                        <span className="text-white font-medium">
                          ${monthlyMIP.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg border border-green-500/20">
                    <h4 className="font-medium text-white mb-2">Government Benefits</h4>
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

          <TabsContent value="comparison" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-400" />
                  Loan Term Comparison
                </CardTitle>
                <CardDescription className="text-blue-200">
                  Compare different loan terms for your {currentLoanType.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[15, 20, 30].map((term) => {
                    const monthlyRate = interestRate[0] / 100 / 12
                    const numPayments = term * 12
                    const principal = loanAmount[0] - downPayment[0]

                    const payment =
                      monthlyRate === 0
                        ? principal / numPayments
                        : (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                          (Math.pow(1 + monthlyRate, numPayments) - 1)

                    const totalInt = payment * numPayments - principal
                    const totalPay = payment * numPayments
                    const totalMonthly = payment + monthlyTax + monthlyInsurance + monthlyMIP

                    return (
                      <div key={term} className="bg-blue-800/30 p-6 rounded-lg border border-blue-500/20 text-center">
                        <h3 className="text-xl font-bold text-white mb-4">{term} Year Term</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm text-blue-300">Monthly Payment</div>
                            <div className="text-2xl font-bold text-white">
                              ${totalMonthly.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-blue-300">Total Interest</div>
                            <div className="text-lg font-semibold text-orange-400">
                              ${totalInt.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-blue-300">Total Payment</div>
                            <div className="text-lg font-semibold text-blue-400">
                              ${totalPay.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-blue-300">Interest Savings vs 30yr</div>
                            <div className="text-lg font-semibold text-green-400">
                              $
                              {term < 30
                                ? (totalInterest - totalInt).toLocaleString(undefined, { maximumFractionDigits: 0 })
                                : "Base"}
                            </div>
                          </div>
                        </div>
                        <Button
                          className="w-full mt-4 bg-gradient-to-r from-blue-500 to-cyan-600"
                          onClick={() => setLoanTerm([term])}
                        >
                          Select {term} Years
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breakdown" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                    Amortization Summary
                  </CardTitle>
                  <CardDescription className="text-blue-200">How your payments are applied over time</CardDescription>
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
                        <span className="text-blue-300">Principal vs Interest</span>
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

                  <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                    <h4 className="font-medium text-white mb-2">First Year Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-300">Principal Paid:</span>
                        <span className="text-white">
                          $
                          {((loanAmount[0] - downPayment[0]) * 0.02).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Interest Paid:</span>
                        <span className="text-white">
                          $
                          {(monthlyPayment * 12 - (loanAmount[0] - downPayment[0]) * 0.02).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Remaining Balance:</span>
                        <span className="text-white">
                          $
                          {((loanAmount[0] - downPayment[0]) * 0.98).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-blue-400" />
                    Cost Analysis
                  </CardTitle>
                  <CardDescription className="text-blue-200">Total cost of your {currentLoanType.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-800/30 rounded-lg border border-blue-500/20">
                      <span className="text-blue-300">Purchase Price</span>
                      <span className="text-white font-medium">${loanAmount[0].toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-800/30 rounded-lg border border-blue-500/20">
                      <span className="text-blue-300">Down Payment</span>
                      <span className="text-green-400 font-medium">-${downPayment[0].toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-800/30 rounded-lg border border-blue-500/20">
                      <span className="text-blue-300">Loan Amount</span>
                      <span className="text-white font-medium">
                        ${(loanAmount[0] - downPayment[0]).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-800/30 rounded-lg border border-blue-500/20">
                      <span className="text-blue-300">Total Interest</span>
                      <span className="text-orange-400 font-medium">
                        +${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-800/30 rounded-lg border border-blue-500/20">
                      <span className="text-blue-300">Total Taxes & Insurance ({loanTerm[0]} years)</span>
                      <span className="text-yellow-400 font-medium">
                        +${((propertyTax[0] + insurance[0]) * loanTerm[0]).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-800/30 rounded-lg border border-blue-500/20">
                      <span className="text-blue-300">
                        Total {loanType === "fha" ? "MIP" : "PMI"} ({loanTerm[0]} years)
                      </span>
                      <span className="text-purple-400 font-medium">
                        +${(mip[0] * 12 * loanTerm[0]).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-blue-500/20 pt-3">
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 rounded-lg border border-blue-400/40">
                      <span className="text-white font-semibold">Total Cost of Ownership</span>
                      <span className="text-white font-bold text-xl">
                        $
                        {(
                          loanAmount[0] +
                          totalInterest +
                          (propertyTax[0] + insurance[0] + mip[0] * 12) * loanTerm[0]
                        ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg border border-green-500/20">
                    <h4 className="font-medium text-white mb-2">Government Loan Advantages</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Shield className="h-3 w-3 text-green-400" />
                        <span className="text-green-300">Government backing reduces lender risk</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-3 w-3 text-green-400" />
                        <span className="text-green-300">Lower down payment requirements</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-3 w-3 text-green-400" />
                        <span className="text-green-300">Competitive interest rates</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-3 w-3 text-green-400" />
                        <span className="text-green-300">Flexible credit requirements</span>
                      </div>
                    </div>
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
