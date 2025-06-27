"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import {
  Calculator,
  ArrowLeft,
  DollarSign,
  TrendingUp,
  PieChart,
  BarChart3,
  Home,
  Car,
  CreditCard,
  Building2,
} from "lucide-react"

export default function LoanCalculatorPage() {
  const router = useRouter()
  const [loanAmount, setLoanAmount] = useState([250000])
  const [interestRate, setInterestRate] = useState([6.5])
  const [loanTerm, setLoanTerm] = useState([30])
  const [downPayment, setDownPayment] = useState([50000])
  const [propertyTax, setPropertyTax] = useState([3000])
  const [insurance, setInsurance] = useState([1200])
  const [pmi, setPmi] = useState([200])

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
  const monthlyPMI = pmi[0]
  const totalMonthlyPayment = monthlyPayment + monthlyTax + monthlyInsurance + monthlyPMI

  const loanTypes = [
    {
      name: "Home Loan",
      icon: Home,
      defaultAmount: 450000,
      defaultRate: 6.25,
      defaultTerm: 30,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Auto Loan",
      icon: Car,
      defaultAmount: 35000,
      defaultRate: 4.75,
      defaultTerm: 5,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Personal Loan",
      icon: CreditCard,
      defaultAmount: 15000,
      defaultRate: 8.99,
      defaultTerm: 3,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Business Loan",
      icon: Building2,
      defaultAmount: 100000,
      defaultRate: 7.5,
      defaultTerm: 7,
      color: "from-orange-500 to-red-500",
    },
  ]

  const setLoanTypeDefaults = (loanType: any) => {
    setLoanAmount([loanType.defaultAmount])
    setInterestRate([loanType.defaultRate])
    setLoanTerm([loanType.defaultTerm])
    setDownPayment([loanType.defaultAmount * 0.2]) // 20% down payment
  }

  const handleApplyForLoan = () => {
    router.push("/citizen/loan-center")
  }

  const handleSaveCalculation = () => {
    const calculationData = {
      loanAmount: loanAmount[0],
      interestRate: interestRate[0],
      loanTerm: loanTerm[0],
      downPayment: downPayment[0],
      monthlyPayment: monthlyPayment,
      totalInterest: totalInterest,
      totalPayment: totalPayment,
      calculatedDate: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(calculationData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `loan-calculation-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
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
                Loan Calculator
              </h1>
              <p className="text-xl text-blue-200 mt-2">Calculate your monthly payments and total loan costs</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handleSaveCalculation}
              className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Save Calculation
            </Button>
            <Button
              onClick={handleApplyForLoan}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Apply for Loan
            </Button>
          </div>
        </div>

        {/* Quick Loan Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {loanTypes.map((loanType) => (
            <Card
              key={loanType.name}
              className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 cursor-pointer"
              onClick={() => setLoanTypeDefaults(loanType)}
            >
              <CardContent className="p-4 text-center">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${loanType.color} mx-auto mb-3 w-fit`}>
                  <loanType.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-white">{loanType.name}</h3>
                <p className="text-sm text-blue-200">
                  ${loanType.defaultAmount.toLocaleString()} at {loanType.defaultRate}%
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-blue-900/30 backdrop-blur-sm">
            <TabsTrigger value="basic">Basic Calculator</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Calculator</TabsTrigger>
            <TabsTrigger value="comparison">Loan Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Controls */}
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-blue-400" />
                    Loan Parameters
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
                      onValueChange={setLoanAmount}
                      max={1000000}
                      min={10000}
                      step={5000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-blue-300">
                      <span>$10,000</span>
                      <span>$1,000,000</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white">Interest Rate: {interestRate[0]}%</Label>
                    <Slider
                      value={interestRate}
                      onValueChange={setInterestRate}
                      max={15}
                      min={1}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-blue-300">
                      <span>1%</span>
                      <span>15%</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white">Loan Term: {loanTerm[0]} years</Label>
                    <Slider value={loanTerm} onValueChange={setLoanTerm} max={50} min={1} step={1} className="w-full" />
                    <div className="flex justify-between text-sm text-blue-300">
                      <span>1 year</span>
                      <span>50 years</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white">Down Payment: ${downPayment[0].toLocaleString()}</Label>
                    <Slider
                      value={downPayment}
                      onValueChange={setDownPayment}
                      max={loanAmount[0] * 0.5}
                      min={0}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-blue-300">
                      <span>$0</span>
                      <span>${(loanAmount[0] * 0.5).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-blue-400" />
                    Payment Breakdown
                  </CardTitle>
                  <CardDescription className="text-blue-200">Your monthly payment details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">
                      ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-blue-200">Monthly Principal & Interest</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-blue-300">Total Interest</div>
                      <div className="text-xl font-semibold text-white">
                        ${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                    </div>
                    <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-blue-300">Total Payment</div>
                      <div className="text-xl font-semibold text-white">
                        ${totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                    </div>
                    <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-blue-300">Loan Amount</div>
                      <div className="text-xl font-semibold text-white">
                        ${(loanAmount[0] - downPayment[0]).toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-blue-300">Down Payment</div>
                      <div className="text-xl font-semibold text-white">${downPayment[0].toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300">Principal & Interest</span>
                      <span className="text-white font-medium">
                        ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="w-full bg-blue-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full"
                        style={{ width: `${(monthlyPayment / totalMonthlyPayment) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Advanced Input Controls */}
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-blue-400" />
                    Advanced Parameters
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Include taxes, insurance, and PMI for complete payment calculation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Loan Amount</Label>
                      <Input
                        type="number"
                        value={loanAmount[0]}
                        onChange={(e) => setLoanAmount([Number(e.target.value)])}
                        className="bg-blue-800/30 border-blue-500/30 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Interest Rate (%)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={interestRate[0]}
                        onChange={(e) => setInterestRate([Number(e.target.value)])}
                        className="bg-blue-800/30 border-blue-500/30 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Loan Term (years)</Label>
                      <Input
                        type="number"
                        value={loanTerm[0]}
                        onChange={(e) => setLoanTerm([Number(e.target.value)])}
                        className="bg-blue-800/30 border-blue-500/30 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Down Payment</Label>
                      <Input
                        type="number"
                        value={downPayment[0]}
                        onChange={(e) => setDownPayment([Number(e.target.value)])}
                        className="bg-blue-800/30 border-blue-500/30 text-white"
                      />
                    </div>
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
                    <div className="space-y-2">
                      <Label className="text-white">PMI (monthly)</Label>
                      <Input
                        type="number"
                        value={pmi[0]}
                        onChange={(e) => setPmi([Number(e.target.value)])}
                        className="bg-blue-800/30 border-blue-500/30 text-white"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Advanced Results */}
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                    Complete Payment Breakdown
                  </CardTitle>
                  <CardDescription className="text-blue-200">Total monthly housing payment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">
                      ${totalMonthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-blue-200">Total Monthly Payment</div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-800/30 rounded-lg border border-blue-500/20">
                      <span className="text-blue-300">Principal & Interest</span>
                      <span className="text-white font-medium">
                        ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-800/30 rounded-lg border border-blue-500/20">
                      <span className="text-blue-300">Property Tax</span>
                      <span className="text-white font-medium">
                        ${monthlyTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-800/30 rounded-lg border border-blue-500/20">
                      <span className="text-blue-300">Insurance</span>
                      <span className="text-white font-medium">
                        ${monthlyInsurance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-800/30 rounded-lg border border-blue-500/20">
                      <span className="text-blue-300">PMI</span>
                      <span className="text-white font-medium">
                        ${monthlyPMI.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  <div className="bg-green-800/30 p-4 rounded-lg border border-green-500/20">
                    <h4 className="font-medium text-white mb-2">Loan-to-Value Ratio</h4>
                    <div className="text-2xl font-bold text-green-400">
                      {(((loanAmount[0] - downPayment[0]) / loanAmount[0]) * 100).toFixed(1)}%
                    </div>
                    <p className="text-sm text-green-300 mt-1">
                      {((loanAmount[0] - downPayment[0]) / loanAmount[0]) * 100 > 80
                        ? "PMI required"
                        : "No PMI required"}
                    </p>
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
                  Compare different loan terms for the same loan amount
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[15, 30, 50].map((term) => {
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

                    return (
                      <div key={term} className="bg-blue-800/30 p-6 rounded-lg border border-blue-500/20 text-center">
                        <h3 className="text-xl font-bold text-white mb-4">{term} Year Loan</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm text-blue-300">Monthly Payment</div>
                            <div className="text-2xl font-bold text-white">
                              ${payment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
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
        </Tabs>
      </div>
    </div>
  )
}
