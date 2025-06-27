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
import { ArrowLeft, Calculator, TrendingUp, Globe } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BondCalculatorPage() {
  const router = useRouter()
  const [loanAmount, setLoanAmount] = useState(400000)
  const [downPayment, setDownPayment] = useState(20000)
  const [loanType, setLoanType] = useState("fha")
  const [creditScore, setCreditScore] = useState([750])

  const loanTypes = {
    fha: {
      name: "FHA 50-Year Bond",
      baseRate: 3.1,
      daxSpread: 0.25,
      riskAdjustment: 0.15,
      guaranteeDiscount: 0.25,
      guaranteeTerm: 30,
      maxAmount: 766000,
      minDownPayment: 3.5,
    },
    va: {
      name: "VA 50-Year Bond",
      baseRate: 3.1,
      daxSpread: 0.2,
      riskAdjustment: 0.0,
      guaranteeDiscount: 0.3,
      guaranteeTerm: 50,
      maxAmount: 999999999,
      minDownPayment: 0,
    },
    usda: {
      name: "USDA 50-Year Rural Bond",
      baseRate: 3.0,
      daxSpread: 0.15,
      riskAdjustment: 0.1,
      guaranteeDiscount: 0.25,
      guaranteeTerm: 35,
      maxAmount: 500000,
      minDownPayment: 0,
    },
    sba: {
      name: "SBA 50-Year Business Bond",
      baseRate: 3.2,
      daxSpread: 0.35,
      riskAdjustment: 0.35,
      guaranteeDiscount: 0.35,
      guaranteeTerm: 25,
      maxAmount: 5000000,
      minDownPayment: 10,
    },
  }

  const calculateBondPayment = () => {
    const selectedLoan = loanTypes[loanType as keyof typeof loanTypes]
    const principal = loanAmount - downPayment

    // Calculate effective rate with DAX mirroring
    const effectiveRate =
      (selectedLoan.baseRate +
        selectedLoan.daxSpread +
        selectedLoan.riskAdjustment -
        selectedLoan.guaranteeDiscount +
        (creditScore[0] < 700 ? 0.25 : 0)) / // Credit score adjustment
      100 /
      12

    const numberOfPayments = 50 * 12 // 50 years

    const monthlyPayment =
      (principal * effectiveRate * Math.pow(1 + effectiveRate, numberOfPayments)) /
      (Math.pow(1 + effectiveRate, numberOfPayments) - 1)

    return {
      monthlyPayment,
      totalInterest: monthlyPayment * numberOfPayments - principal,
      totalPayment: monthlyPayment * numberOfPayments,
      effectiveRate: effectiveRate * 12 * 100,
      principal,
    }
  }

  const calculate30YearComparison = () => {
    const principal = loanAmount - downPayment
    const rate30Year = 6.5 / 100 / 12 // Traditional 30-year rate
    const numberOfPayments = 30 * 12

    const monthlyPayment =
      (principal * rate30Year * Math.pow(1 + rate30Year, numberOfPayments)) /
      (Math.pow(1 + rate30Year, numberOfPayments) - 1)

    return {
      monthlyPayment,
      totalInterest: monthlyPayment * numberOfPayments - principal,
      totalPayment: monthlyPayment * numberOfPayments,
    }
  }

  const bondResults = calculateBondPayment()
  const traditional30Results = calculate30YearComparison()
  const monthlySavings = traditional30Results.monthlyPayment - bondResults.monthlyPayment

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
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
              50-Year Bond Calculator
            </h1>
            <p className="text-blue-200 mt-2">
              Calculate payments for government-guaranteed 50-year bonds with DAX market mirroring
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Input */}
          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-400" />
                Bond Loan Calculator
              </CardTitle>
              <CardDescription className="text-blue-200">
                Configure your 50-year government bond parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-white">Loan Type</Label>
                <Select value={loanType} onValueChange={setLoanType}>
                  <SelectTrigger className="bg-blue-800/30 border-blue-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(loanTypes).map(([key, loan]) => (
                      <SelectItem key={key} value={key}>
                        {loan.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Loan Amount</Label>
                <Input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="bg-blue-800/30 border-blue-500/30 text-white"
                />
                <p className="text-xs text-blue-300">
                  Max: ${loanTypes[loanType as keyof typeof loanTypes].maxAmount.toLocaleString()}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Down Payment</Label>
                <Input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="bg-blue-800/30 border-blue-500/30 text-white"
                />
                <p className="text-xs text-blue-300">
                  Min: {loanTypes[loanType as keyof typeof loanTypes].minDownPayment}% ($
                  {((loanAmount * loanTypes[loanType as keyof typeof loanTypes].minDownPayment) / 100).toLocaleString()}
                  )
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Credit Score: {creditScore[0]}</Label>
                <Slider
                  value={creditScore}
                  onValueChange={setCreditScore}
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

              {/* Bond Structure Details */}
              <div className="bg-purple-800/30 p-4 rounded-lg border border-purple-500/20">
                <h4 className="font-medium text-white mb-3">Bond Structure Details</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-300">Base Rate:</span>
                    <span className="text-white">{loanTypes[loanType as keyof typeof loanTypes].baseRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-300">DAX Spread:</span>
                    <span className="text-white">+{loanTypes[loanType as keyof typeof loanTypes].daxSpread}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-300">Risk Adj:</span>
                    <span className="text-white">+{loanTypes[loanType as keyof typeof loanTypes].riskAdjustment}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-300">Gov Discount:</span>
                    <span className="text-green-400">
                      -{loanTypes[loanType as keyof typeof loanTypes].guaranteeDiscount}%
                    </span>
                  </div>
                  <div className="flex justify-between col-span-2">
                    <span className="text-purple-300">Government Guarantee:</span>
                    <span className="text-white">
                      {loanTypes[loanType as keyof typeof loanTypes].guaranteeTerm} years
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {/* 50-Year Bond Results */}
            <Card className="bg-gradient-to-br from-green-900/50 to-blue-900/30 backdrop-blur-sm border-green-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-400" />
                  50-Year Government Bond Results
                </CardTitle>
                <CardDescription className="text-green-200">
                  With DAX market mirroring and government guarantee
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      ${bondResults.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-sm text-green-300">Monthly Payment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{bondResults.effectiveRate.toFixed(2)}%</div>
                    <div className="text-sm text-green-300">Effective Rate</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-green-300">Principal Amount:</span>
                    <span className="text-white">${bondResults.principal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">Total Interest:</span>
                    <span className="text-white">
                      ${bondResults.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">Total Payment:</span>
                    <span className="text-white">
                      ${bondResults.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {loanTypes[loanType as keyof typeof loanTypes].guaranteeTerm}yr Guarantee
                  </Badge>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">DAX Mirrored</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Comparison */}
            <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/30 backdrop-blur-sm border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-400" />
                  vs Traditional 30-Year Loan
                </CardTitle>
                <CardDescription className="text-orange-200">
                  Comparison with standard 30-year mortgage at 6.5%
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      ${traditional30Results.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-sm text-orange-300">30-Year Payment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      ${monthlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-sm text-green-300">Monthly Savings</div>
                  </div>
                </div>

                <div className="bg-green-800/30 p-3 rounded-lg border border-green-500/20">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-400">
                      Save ${(monthlySavings * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })} per year
                    </div>
                    <div className="text-sm text-green-300">
                      ${(monthlySavings * 360).toLocaleString(undefined, { maximumFractionDigits: 0 })} saved over 30
                      years
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                className="bg-gradient-to-r from-green-500 to-emerald-600"
                onClick={() => router.push(`/citizen/loan-center/${loanType}-loan`)}
              >
                Apply for {loanTypes[loanType as keyof typeof loanTypes].name}
              </Button>
              <Button
                variant="outline"
                className="border-blue-500/30 text-blue-300 bg-transparent hover:bg-blue-500/20"
                onClick={() => router.push("/citizen/loan-center/comparison")}
              >
                Compare All Bonds
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <Tabs defaultValue="amortization" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-blue-900/30 backdrop-blur-sm">
            <TabsTrigger value="amortization">Amortization</TabsTrigger>
            <TabsTrigger value="dax-impact">DAX Impact</TabsTrigger>
            <TabsTrigger value="guarantee">Government Guarantee</TabsTrigger>
          </TabsList>

          <TabsContent value="amortization">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">50-Year Amortization Schedule</CardTitle>
                <CardDescription className="text-blue-200">
                  Payment breakdown over the life of your bond
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 text-sm font-medium text-blue-300 border-b border-blue-500/20 pb-2">
                    <div>Year</div>
                    <div>Principal</div>
                    <div>Interest</div>
                    <div>Balance</div>
                  </div>
                  {[1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((year) => {
                    const monthlyRate = bondResults.effectiveRate / 100 / 12
                    const monthsElapsed = year * 12
                    const balance =
                      (bondResults.principal *
                        (Math.pow(1 + monthlyRate, 600) - Math.pow(1 + monthlyRate, monthsElapsed))) /
                      (Math.pow(1 + monthlyRate, 600) - 1)
                    const yearlyPrincipal = year === 1 ? bondResults.principal - balance : 0
                    const yearlyInterest = bondResults.monthlyPayment * 12 - yearlyPrincipal

                    return (
                      <div
                        key={year}
                        className="grid grid-cols-4 gap-4 text-sm text-white py-2 border-b border-blue-500/10"
                      >
                        <div>{year}</div>
                        <div>${yearlyPrincipal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        <div>${yearlyInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        <div>${balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dax-impact">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">DAX Market Impact</CardTitle>
                <CardDescription className="text-blue-200">
                  How German corporate bond markets affect your rate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-white mb-3">Rate Components</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-300">US Treasury Base:</span>
                        <span className="text-white">{loanTypes[loanType as keyof typeof loanTypes].baseRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">DAX Corporate Spread:</span>
                        <span className="text-yellow-400">
                          +{loanTypes[loanType as keyof typeof loanTypes].daxSpread}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Risk Adjustment:</span>
                        <span className="text-orange-400">
                          +{loanTypes[loanType as keyof typeof loanTypes].riskAdjustment}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Government Discount:</span>
                        <span className="text-green-400">
                          -{loanTypes[loanType as keyof typeof loanTypes].guaranteeDiscount}%
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-blue-500/20 pt-2 font-medium">
                        <span className="text-white">Effective Rate:</span>
                        <span className="text-white">{bondResults.effectiveRate.toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-3">DAX Benefits</h4>
                    <ul className="space-y-2 text-sm text-blue-200">
                      <li>• Professional bond market liquidity</li>
                      <li>• Secondary market trading capability</li>
                      <li>• Corporate-grade pricing transparency</li>
                      <li>• International market stability</li>
                      <li>• Institutional investor access</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guarantee">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">Government Guarantee Details</CardTitle>
                <CardDescription className="text-blue-200">
                  Understanding your federal backing protection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-white mb-3">Guarantee Terms</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-300">Guarantee Period:</span>
                        <span className="text-white">
                          {loanTypes[loanType as keyof typeof loanTypes].guaranteeTerm} years
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Coverage Amount:</span>
                        <span className="text-white">${bondResults.principal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Guarantee Type:</span>
                        <span className="text-white">{loanType.toUpperCase()} Backed</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Rate Benefit:</span>
                        <span className="text-green-400">
                          -{loanTypes[loanType as keyof typeof loanTypes].guaranteeDiscount}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-3">Protection Benefits</h4>
                    <ul className="space-y-2 text-sm text-blue-200">
                      <li>• Federal government backing</li>
                      <li>• Reduced default risk</li>
                      <li>• Lower interest rates</li>
                      <li>• Enhanced loan terms</li>
                      <li>• Investor confidence</li>
                    </ul>
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
