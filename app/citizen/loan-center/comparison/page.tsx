"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BarChart3, Shield, Globe, CheckCircle, X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BondComparisonPage() {
  const router = useRouter()
  const [selectedLoans, setSelectedLoans] = useState<string[]>(["fha", "va"])

  const loanTypes = {
    fha: {
      name: "FHA 50-Year Bond",
      rate: "3.25%",
      downPayment: "3.5%",
      maxAmount: "$766K",
      guarantee: "30 years",
      features: ["Low down payment", "30-year guarantee", "DAX secondary market", "First-time buyer friendly"],
      pros: ["Lowest down payment", "Established program", "Wide availability", "Credit flexibility"],
      cons: ["Mortgage insurance required", "Loan limits apply", "Property restrictions", "30-year guarantee only"],
      color: "from-blue-500 to-cyan-500",
      bondStructure: {
        baseRate: 3.1,
        daxSpread: 0.25,
        riskAdjustment: 0.15,
        guaranteeDiscount: 0.25,
      },
    },
    va: {
      name: "VA 50-Year Bond",
      rate: "3.10%",
      downPayment: "0%",
      maxAmount: "No Limit",
      guarantee: "50 years",
      features: ["No down payment", "Full 50-year guarantee", "Premium DAX pricing", "No PMI required"],
      pros: ["No down payment", "Full term guarantee", "No mortgage insurance", "Best rates"],
      cons: ["Military service required", "Funding fee applies", "Property requirements", "Limited to veterans"],
      color: "from-green-500 to-emerald-500",
      bondStructure: {
        baseRate: 3.1,
        daxSpread: 0.2,
        riskAdjustment: 0.0,
        guaranteeDiscount: 0.3,
      },
    },
    usda: {
      name: "USDA 50-Year Rural Bond",
      rate: "3.00%",
      downPayment: "0%",
      maxAmount: "Income Based",
      guarantee: "35 years",
      features: ["Rural properties only", "35-year guarantee", "Agricultural DAX mirror", "Income limits apply"],
      pros: ["Lowest rates", "No down payment", "Rural development focus", "Income-based limits"],
      cons: ["Rural areas only", "Income restrictions", "Property location limits", "Longer processing"],
      color: "from-purple-500 to-pink-500",
      bondStructure: {
        baseRate: 3.0,
        daxSpread: 0.15,
        riskAdjustment: 0.1,
        guaranteeDiscount: 0.25,
      },
    },
    sba: {
      name: "SBA 50-Year Business Bond",
      rate: "3.55%",
      downPayment: "10%",
      maxAmount: "$5M",
      guarantee: "25 years",
      features: ["Business properties", "25-year guarantee", "Corporate DAX pricing", "Commercial focus"],
      pros: ["High loan amounts", "Business focused", "Corporate structure", "Investment property eligible"],
      cons: ["Higher rates", "Business use required", "Shorter guarantee", "Complex approval"],
      color: "from-orange-500 to-red-500",
      bondStructure: {
        baseRate: 3.2,
        daxSpread: 0.35,
        riskAdjustment: 0.35,
        guaranteeDiscount: 0.35,
      },
    },
  }

  const calculatePayment = (loanKey: string, loanAmount = 400000, downPayment = 20000) => {
    const loan = loanTypes[loanKey as keyof typeof loanTypes]
    const principal = loanAmount - downPayment

    const effectiveRate =
      (loan.bondStructure.baseRate +
        loan.bondStructure.daxSpread +
        loan.bondStructure.riskAdjustment -
        loan.bondStructure.guaranteeDiscount) /
      100 /
      12

    const numberOfPayments = 50 * 12

    const monthlyPayment =
      (principal * effectiveRate * Math.pow(1 + effectiveRate, numberOfPayments)) /
      (Math.pow(1 + effectiveRate, numberOfPayments) - 1)

    return monthlyPayment
  }

  const toggleLoanSelection = (loanKey: string) => {
    if (selectedLoans.includes(loanKey)) {
      if (selectedLoans.length > 1) {
        setSelectedLoans(selectedLoans.filter((key) => key !== loanKey))
      }
    } else {
      if (selectedLoans.length < 3) {
        setSelectedLoans([...selectedLoans, loanKey])
      }
    }
  }

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
              50-Year Bond Comparison
            </h1>
            <p className="text-blue-200 mt-2">Compare government-guaranteed 50-year bond structures side by side</p>
          </div>
        </div>

        {/* Loan Selection */}
        <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white">Select Bonds to Compare</CardTitle>
            <CardDescription className="text-blue-200">
              Choose up to 3 bond types for detailed comparison (currently comparing {selectedLoans.length})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(loanTypes).map(([key, loan]) => (
                <Button
                  key={key}
                  variant={selectedLoans.includes(key) ? "default" : "outline"}
                  onClick={() => toggleLoanSelection(key)}
                  className={`h-auto p-4 flex flex-col items-center gap-2 ${
                    selectedLoans.includes(key)
                      ? `bg-gradient-to-r ${loan.color}`
                      : "border-blue-500/30 text-blue-300 bg-transparent hover:bg-blue-500/20"
                  }`}
                  disabled={!selectedLoans.includes(key) && selectedLoans.length >= 3}
                >
                  <div className="font-medium">{loan.name}</div>
                  <div className="text-sm opacity-80">{loan.rate}</div>
                  {selectedLoans.includes(key) && <CheckCircle className="h-4 w-4" />}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-blue-900/30 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="bond-structure">Bond Structure</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedLoans.map((loanKey) => {
                const loan = loanTypes[loanKey as keyof typeof loanTypes]
                return (
                  <Card
                    key={loanKey}
                    className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">{loan.name}</CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLoanSelection(loanKey)}
                          className="text-blue-300 hover:text-white"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{loan.rate}</div>
                          <div className="text-sm text-blue-300">Interest Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{loan.downPayment}</div>
                          <div className="text-sm text-blue-300">Down Payment</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-blue-300">Max Amount:</span>
                          <span className="text-white">{loan.maxAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-300">Guarantee:</span>
                          <span className="text-white">{loan.guarantee}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-white">Key Features:</h4>
                        <ul className="space-y-1">
                          {loan.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="text-sm text-blue-200 flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        className={`w-full bg-gradient-to-r ${loan.color}`}
                        onClick={() => router.push(`/citizen/loan-center/${loanKey}-loan`)}
                      >
                        Apply for {loan.name}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">Payment Comparison</CardTitle>
                <CardDescription className="text-blue-200">
                  Monthly payments for $400,000 loan with $20,000 down payment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-blue-500/20">
                        <th className="text-left text-blue-300 p-3">Bond Type</th>
                        <th className="text-center text-blue-300 p-3">Monthly Payment</th>
                        <th className="text-center text-blue-300 p-3">Total Interest</th>
                        <th className="text-center text-blue-300 p-3">Total Payment</th>
                        <th className="text-center text-blue-300 p-3">vs 30-Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedLoans.map((loanKey) => {
                        const loan = loanTypes[loanKey as keyof typeof loanTypes]
                        const monthlyPayment = calculatePayment(loanKey)
                        const totalPayment = monthlyPayment * 50 * 12
                        const totalInterest = totalPayment - 380000 // Principal

                        // 30-year comparison at 6.5%
                        const traditional30Payment = 2398 // Pre-calculated for $380k at 6.5%
                        const savings = traditional30Payment - monthlyPayment

                        return (
                          <tr key={loanKey} className="border-b border-blue-500/10">
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${loan.color}`}></div>
                                <span className="text-white font-medium">{loan.name}</span>
                              </div>
                            </td>
                            <td className="text-center p-3">
                              <div className="text-white font-semibold">
                                ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </div>
                            </td>
                            <td className="text-center p-3">
                              <div className="text-white">
                                ${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </div>
                            </td>
                            <td className="text-center p-3">
                              <div className="text-white">
                                ${totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </div>
                            </td>
                            <td className="text-center p-3">
                              <div className="text-green-400 font-semibold">
                                ${savings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Payment Chart Visualization */}
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">Payment Visualization</CardTitle>
                <CardDescription className="text-blue-200">Visual comparison of monthly payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedLoans.map((loanKey) => {
                    const loan = loanTypes[loanKey as keyof typeof loanTypes]
                    const monthlyPayment = calculatePayment(loanKey)
                    const maxPayment = Math.max(...selectedLoans.map((key) => calculatePayment(key)))
                    const percentage = (monthlyPayment / maxPayment) * 100

                    return (
                      <div key={loanKey} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{loan.name}</span>
                          <span className="text-white font-semibold">
                            ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                        <div className="w-full bg-blue-700 rounded-full h-3">
                          <div
                            className={`bg-gradient-to-r ${loan.color} h-3 rounded-full transition-all duration-500`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {selectedLoans.map((loanKey) => {
                const loan = loanTypes[loanKey as keyof typeof loanTypes]
                return (
                  <Card
                    key={loanKey}
                    className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20"
                  >
                    <CardHeader>
                      <CardTitle className="text-white">{loan.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium text-green-400 mb-3 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Advantages
                        </h4>
                        <ul className="space-y-2">
                          {loan.pros.map((pro, index) => (
                            <li key={index} className="text-sm text-blue-200 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-orange-400 mb-3 flex items-center gap-2">
                          <X className="h-4 w-4" />
                          Considerations
                        </h4>
                        <ul className="space-y-2">
                          {loan.cons.map((con, index) => (
                            <li key={index} className="text-sm text-blue-200 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-blue-400 mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {loan.features.map((feature, index) => (
                            <li key={index} className="text-sm text-blue-200 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="bond-structure" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">Bond Structure Comparison</CardTitle>
                <CardDescription className="text-blue-200">
                  Detailed breakdown of rate components and DAX mirroring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-blue-500/20">
                        <th className="text-left text-blue-300 p-3">Bond Type</th>
                        <th className="text-center text-blue-300 p-3">Base Rate</th>
                        <th className="text-center text-blue-300 p-3">DAX Spread</th>
                        <th className="text-center text-blue-300 p-3">Risk Adj</th>
                        <th className="text-center text-blue-300 p-3">Gov Discount</th>
                        <th className="text-center text-blue-300 p-3">Effective Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedLoans.map((loanKey) => {
                        const loan = loanTypes[loanKey as keyof typeof loanTypes]
                        const effectiveRate =
                          loan.bondStructure.baseRate +
                          loan.bondStructure.daxSpread +
                          loan.bondStructure.riskAdjustment -
                          loan.bondStructure.guaranteeDiscount

                        return (
                          <tr key={loanKey} className="border-b border-blue-500/10">
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${loan.color}`}></div>
                                <span className="text-white font-medium">{loan.name}</span>
                              </div>
                            </td>
                            <td className="text-center p-3 text-white">{loan.bondStructure.baseRate}%</td>
                            <td className="text-center p-3 text-yellow-400">+{loan.bondStructure.daxSpread}%</td>
                            <td className="text-center p-3 text-orange-400">+{loan.bondStructure.riskAdjustment}%</td>
                            <td className="text-center p-3 text-green-400">-{loan.bondStructure.guaranteeDiscount}%</td>
                            <td className="text-center p-3 text-white font-semibold">{effectiveRate.toFixed(2)}%</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* DAX Impact Explanation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/30 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Globe className="h-5 w-5 text-purple-400" />
                    DAX Market Mirroring
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-blue-200 text-sm">
                    Your bond rates are tied to German DAX corporate bond secondary markets, providing:
                  </p>
                  <ul className="space-y-2 text-sm text-blue-200">
                    <li>• Professional institutional pricing</li>
                    <li>• Secondary market liquidity</li>
                    <li>• International market stability</li>
                    <li>• Corporate-grade transparency</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/50 to-blue-900/30 backdrop-blur-sm border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    Government Guarantee
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-blue-200 text-sm">Federal backing provides rate discounts and security:</p>
                  <ul className="space-y-2 text-sm text-blue-200">
                    <li>• Reduced default risk</li>
                    <li>• Lower interest rates</li>
                    <li>• Enhanced loan terms</li>
                    <li>• Investor confidence</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            className="bg-gradient-to-r from-blue-500 to-cyan-600"
            onClick={() => router.push("/citizen/loan-center/calculator")}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Calculate Payments
          </Button>
          <Button
            variant="outline"
            className="border-blue-500/30 text-blue-300 bg-transparent hover:bg-blue-500/20"
            onClick={() => router.push("/citizen/loan-center/pre-qualification")}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Get Pre-Qualified
          </Button>
        </div>
      </div>
    </div>
  )
}
