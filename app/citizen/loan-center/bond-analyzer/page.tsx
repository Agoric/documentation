"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, PieChart, BarChart3, TrendingUp, Globe, Shield, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BondAnalyzerPage() {
  const router = useRouter()
  const [analysisParams, setAnalysisParams] = useState({
    loanAmount: [400000],
    creditScore: [720],
    downPaymentPercent: [15],
    marketConditions: [50], // 0-100 scale for market volatility
  })

  const bondTypes = {
    fha: {
      name: "FHA 50-Year Bond",
      baseRate: 3.1,
      daxSpread: 0.25,
      riskAdjustment: 0.15,
      guaranteeDiscount: 0.25,
      guaranteeTerm: 30,
      color: "from-blue-500 to-cyan-500",
    },
    va: {
      name: "VA 50-Year Bond",
      baseRate: 3.1,
      daxSpread: 0.2,
      riskAdjustment: 0.0,
      guaranteeDiscount: 0.3,
      guaranteeTerm: 50,
      color: "from-green-500 to-emerald-500",
    },
    usda: {
      name: "USDA 50-Year Rural Bond",
      baseRate: 3.0,
      daxSpread: 0.15,
      riskAdjustment: 0.1,
      guaranteeDiscount: 0.25,
      guaranteeTerm: 35,
      color: "from-purple-500 to-pink-500",
    },
    sba: {
      name: "SBA 50-Year Business Bond",
      baseRate: 3.2,
      daxSpread: 0.35,
      riskAdjustment: 0.35,
      guaranteeDiscount: 0.35,
      guaranteeTerm: 25,
      color: "from-orange-500 to-red-500",
    },
  }

  const calculateBondMetrics = (bondKey: string) => {
    const bond = bondTypes[bondKey as keyof typeof bondTypes]
    const loanAmount = analysisParams.loanAmount[0]
    const downPayment = (loanAmount * analysisParams.downPaymentPercent[0]) / 100
    const principal = loanAmount - downPayment

    // Market condition adjustments
    const marketAdjustment = (analysisParams.marketConditions[0] - 50) * 0.002 // -0.1% to +0.1%

    // Credit score adjustments
    const creditAdjustment =
      analysisParams.creditScore[0] < 700
        ? 0.25
        : analysisParams.creditScore[0] < 740
          ? 0.1
          : analysisParams.creditScore[0] > 780
            ? -0.1
            : 0

    const effectiveRate =
      (bond.baseRate +
        bond.daxSpread +
        bond.riskAdjustment -
        bond.guaranteeDiscount +
        marketAdjustment +
        creditAdjustment) /
      100 /
      12

    const numberOfPayments = 50 * 12
    const monthlyPayment =
      (principal * effectiveRate * Math.pow(1 + effectiveRate, numberOfPayments)) /
      (Math.pow(1 + effectiveRate, numberOfPayments) - 1)

    const totalInterest = monthlyPayment * numberOfPayments - principal
    const totalPayment = monthlyPayment * numberOfPayments

    // Risk metrics
    const guaranteeCoverage = (bond.guaranteeTerm / 50) * 100
    const daxVolatility = bond.daxSpread * 100 // Simplified volatility measure
    const governmentBacking = bond.guaranteeDiscount * 100

    return {
      monthlyPayment,
      totalInterest,
      totalPayment,
      effectiveRate: effectiveRate * 12 * 100,
      guaranteeCoverage,
      daxVolatility,
      governmentBacking,
      riskScore: (daxVolatility + (100 - guaranteeCoverage) + (100 - governmentBacking)) / 3,
    }
  }

  const bondAnalysis = Object.keys(bondTypes).map((key) => ({
    key,
    ...bondTypes[key as keyof typeof bondTypes],
    metrics: calculateBondMetrics(key),
  }))

  const bestRate = Math.min(...bondAnalysis.map((b) => b.metrics.effectiveRate))
  const lowestPayment = Math.min(...bondAnalysis.map((b) => b.metrics.monthlyPayment))
  const lowestRisk = Math.min(...bondAnalysis.map((b) => b.metrics.riskScore))

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
              Bond Structure Analyzer
            </h1>
            <p className="text-blue-200 mt-2">
              Analyze and compare 50-year government bond structures with real-time market conditions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Analysis Controls */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-blue-400" />
                  Analysis Parameters
                </CardTitle>
                <CardDescription className="text-blue-200">
                  Adjust parameters to see how they affect bond structures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-white">Loan Amount: ${analysisParams.loanAmount[0].toLocaleString()}</Label>
                  <Slider
                    value={analysisParams.loanAmount}
                    onValueChange={(value) => setAnalysisParams({ ...analysisParams, loanAmount: value })}
                    max={1000000}
                    min={100000}
                    step={10000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-blue-300">
                    <span>$100K</span>
                    <span>$1M</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Credit Score: {analysisParams.creditScore[0]}</Label>
                  <Slider
                    value={analysisParams.creditScore}
                    onValueChange={(value) => setAnalysisParams({ ...analysisParams, creditScore: value })}
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
                  <Label className="text-white">Down Payment: {analysisParams.downPaymentPercent[0]}%</Label>
                  <Slider
                    value={analysisParams.downPaymentPercent}
                    onValueChange={(value) => setAnalysisParams({ ...analysisParams, downPaymentPercent: value })}
                    max={50}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-blue-300">
                    <span>0%</span>
                    <span>50%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Market Conditions: {analysisParams.marketConditions[0]}%</Label>
                  <Slider
                    value={analysisParams.marketConditions}
                    onValueChange={(value) => setAnalysisParams({ ...analysisParams, marketConditions: value })}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-blue-300">
                    <span>Stable</span>
                    <span>Volatile</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Insights */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-400" />
                  Market Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-medium text-white">DAX Market Status</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">Stable Trading</span>
                  </div>
                  <p className="text-purple-200 text-xs">
                    German corporate bonds showing steady performance with low volatility
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-white">Government Backing</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-blue-400 text-sm">Strong Support</span>
                  </div>
                  <p className="text-purple-200 text-xs">
                    Federal guarantee programs maintaining robust backing levels
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Results */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="comparison" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-blue-900/30 backdrop-blur-sm">
                <TabsTrigger value="comparison">Bond Comparison</TabsTrigger>
                <TabsTrigger value="structure">Structure Analysis</TabsTrigger>
                <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
              </TabsList>

              <TabsContent value="comparison" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {bondAnalysis.map((bond) => (
                    <Card
                      key={bond.key}
                      className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20"
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-white">{bond.name}</CardTitle>
                          <div className="flex gap-1">
                            {bond.metrics.effectiveRate === bestRate && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Best Rate</Badge>
                            )}
                            {bond.metrics.monthlyPayment === lowestPayment && (
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Lowest Payment</Badge>
                            )}
                            {bond.metrics.riskScore === lowestRisk && (
                              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                                Lowest Risk
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">
                              {bond.metrics.effectiveRate.toFixed(2)}%
                            </div>
                            <div className="text-sm text-blue-300">Effective Rate</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">
                              ${bond.metrics.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                            <div className="text-sm text-blue-300">Monthly Payment</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-blue-300">Total Interest:</span>
                            <span className="text-white">
                              ${bond.metrics.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-300">Guarantee Coverage:</span>
                            <span className="text-white">{bond.metrics.guaranteeCoverage.toFixed(0)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-300">Risk Score:</span>
                            <span
                              className={`${
                                bond.metrics.riskScore < 30
                                  ? "text-green-400"
                                  : bond.metrics.riskScore < 60
                                    ? "text-yellow-400"
                                    : "text-red-400"
                              }`}
                            >
                              {bond.metrics.riskScore.toFixed(1)}/100
                            </span>
                          </div>
                        </div>

                        <Button
                          className={`w-full bg-gradient-to-r ${bond.color}`}
                          onClick={() => router.push(`/citizen/loan-center/${bond.key}-loan`)}
                        >
                          Apply for {bond.name}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="structure" className="space-y-6">
                <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Bond Structure Breakdown</CardTitle>
                    <CardDescription className="text-blue-200">
                      Detailed analysis of rate components for each bond type
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
                            <th className="text-center text-blue-300 p-3">Market Adj</th>
                            <th className="text-center text-blue-300 p-3">Final Rate</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bondAnalysis.map((bond) => {
                            const marketAdjustment = (analysisParams.marketConditions[0] - 50) * 0.002
                            const creditAdjustment =
                              analysisParams.creditScore[0] < 700
                                ? 0.25
                                : analysisParams.creditScore[0] < 740
                                  ? 0.1
                                  : analysisParams.creditScore[0] > 780
                                    ? -0.1
                                    : 0

                            return (
                              <tr key={bond.key} className="border-b border-blue-500/10">
                                <td className="p-3">
                                  <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${bond.color}`}></div>
                                    <span className="text-white font-medium">{bond.name}</span>
                                  </div>
                                </td>
                                <td className="text-center p-3 text-white">{bond.baseRate}%</td>
                                <td className="text-center p-3 text-yellow-400">+{bond.daxSpread}%</td>
                                <td className="text-center p-3 text-orange-400">+{bond.riskAdjustment}%</td>
                                <td className="text-center p-3 text-green-400">-{bond.guaranteeDiscount}%</td>
                                <td className="text-center p-3 text-purple-400">
                                  {marketAdjustment >= 0 ? "+" : ""}
                                  {(marketAdjustment + creditAdjustment).toFixed(2)}%
                                </td>
                                <td className="text-center p-3 text-white font-semibold">
                                  {bond.metrics.effectiveRate.toFixed(2)}%
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Visual Structure Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-green-900/50 to-blue-900/30 backdrop-blur-sm border-green-500/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-400" />
                        Government Guarantee Impact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {bondAnalysis.map((bond) => (
                        <div key={bond.key} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white text-sm">{bond.name}</span>
                            <span className="text-green-400 font-semibold">-{bond.guaranteeDiscount}%</span>
                          </div>
                          <div className="w-full bg-blue-700 rounded-full h-2">
                            <div
                              className={`bg-gradient-to-r ${bond.color} h-2 rounded-full`}
                              style={{ width: `${(bond.guaranteeDiscount / 0.35) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/30 backdrop-blur-sm border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Globe className="h-5 w-5 text-purple-400" />
                        DAX Market Exposure
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {bondAnalysis.map((bond) => (
                        <div key={bond.key} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white text-sm">{bond.name}</span>
                            <span className="text-purple-400 font-semibold">+{bond.daxSpread}%</span>
                          </div>
                          <div className="w-full bg-blue-700 rounded-full h-2">
                            <div
                              className={`bg-gradient-to-r ${bond.color} h-2 rounded-full`}
                              style={{ width: `${(bond.daxSpread / 0.35) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="risk" className="space-y-6">
                <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Risk Assessment Matrix</CardTitle>
                    <CardDescription className="text-blue-200">
                      Comprehensive risk analysis for each bond structure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {bondAnalysis.map((bond) => (
                        <div key={bond.key} className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium text-white">{bond.name}</h4>
                            <Badge
                              className={`${
                                bond.metrics.riskScore < 30
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : bond.metrics.riskScore < 60
                                    ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                    : "bg-red-500/20 text-red-400 border-red-500/30"
                              }`}
                            >
                              {bond.metrics.riskScore < 30
                                ? "Low Risk"
                                : bond.metrics.riskScore < 60
                                  ? "Medium Risk"
                                  : "High Risk"}
                            </Badge>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-blue-300">Government Coverage</span>
                                <span className="text-white">{bond.metrics.guaranteeCoverage.toFixed(0)}%</span>
                              </div>
                              <div className="w-full bg-blue-700 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                                  style={{ width: `${bond.metrics.guaranteeCoverage}%` }}
                                ></div>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-blue-300">Market Volatility</span>
                                <span className="text-white">{bond.metrics.daxVolatility.toFixed(1)}%</span>
                              </div>
                              <div className="w-full bg-blue-700 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-yellow-400 to-orange-600 h-2 rounded-full"
                                  style={{ width: `${(bond.metrics.daxVolatility / 0.35) * 100}%` }}
                                ></div>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-blue-300">Overall Risk Score</span>
                                <span className="text-white">{bond.metrics.riskScore.toFixed(1)}/100</span>
                              </div>
                              <div className="w-full bg-blue-700 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    bond.metrics.riskScore < 30
                                      ? "bg-gradient-to-r from-green-400 to-green-600"
                                      : bond.metrics.riskScore < 60
                                        ? "bg-gradient-to-r from-yellow-400 to-orange-600"
                                        : "bg-gradient-to-r from-red-400 to-red-600"
                                  }`}
                                  style={{ width: `${bond.metrics.riskScore}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Factors */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-green-900/50 to-blue-900/30 backdrop-blur-sm border-green-500/20">
                    <CardHeader>
                      <CardTitle className="text-white text-lg flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-400" />
                        Low Risk Factors
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="text-green-200">• Government guarantee backing</div>
                      <div className="text-green-200">• 50-year extended terms</div>
                      <div className="text-green-200">• Stable DAX market conditions</div>
                      <div className="text-green-200">• Federal rate environment</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-yellow-900/50 to-blue-900/30 backdrop-blur-sm border-yellow-500/20">
                    <CardHeader>
                      <CardTitle className="text-white text-lg flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-yellow-400" />
                        Medium Risk Factors
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="text-yellow-200">• DAX market volatility</div>
                      <div className="text-yellow-200">• Interest rate changes</div>
                      <div className="text-yellow-200">• Credit score variations</div>
                      <div className="text-yellow-200">• Property value fluctuations</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-red-900/50 to-blue-900/30 backdrop-blur-sm border-red-500/20">
                    <CardHeader>
                      <CardTitle className="text-white text-lg flex items-center gap-2">
                        <Zap className="h-5 w-5 text-red-400" />
                        High Risk Factors
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="text-red-200">• Economic recession</div>
                      <div className="text-red-200">• Government policy changes</div>
                      <div className="text-red-200">• International market crisis</div>
                      <div className="text-red-200">• Borrower default risk</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

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
            onClick={() => router.push("/citizen/loan-center/comparison")}
          >
            Compare All Bonds
          </Button>
        </div>
      </div>
    </div>
  )
}
