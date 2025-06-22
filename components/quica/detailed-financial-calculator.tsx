"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"
import {
  Calculator,
  TrendingUp,
  AlertTriangle,
  Target,
  BarChart3,
  PieChartIcon,
  Activity,
  DollarSign,
  Zap,
  Shield,
} from "lucide-react"
import { motion } from "framer-motion"

interface YearlyProjection {
  year: number
  principalBalance: number
  leveragedValue: number
  interestAccrued: number
  cumulativeInterest: number
  totalValue: number
  leverageCost: number
  netValue: number
  riskAdjustedValue: number
}

interface SensitivityAnalysis {
  interestRate: number
  leverageRatio: number
  futureValue: number
  totalReturn: number
  annualizedReturn: number
  riskScore: number
}

interface MonteCarloResult {
  scenario: number
  finalValue: number
  totalReturn: number
  maxDrawdown: number
  yearsToBreakeven: number
}

export function DetailedFinancialCalculator() {
  // Base parameters
  const [principal] = useState(620000)
  const [baseInterestRate] = useState(0.04)
  const [termYears] = useState(50)
  const [leverageRatio] = useState(60)
  const [leverageCost] = useState(0.025)
  const [guaranteeFee] = useState(0.005)

  // Analysis parameters
  const [selectedYear, setSelectedYear] = useState(50)
  const [sensitivityRange, setSensitivityRange] = useState([0.02, 0.06])
  const [monteCarloRuns] = useState(1000)

  // Calculate yearly projections
  const yearlyProjections = useMemo((): YearlyProjection[] => {
    const projections: YearlyProjection[] = []
    const currentPrincipal = principal
    let leveragedAmount = principal * leverageRatio
    let cumulativeInterest = 0

    for (let year = 1; year <= termYears; year++) {
      // Interest calculation (compound annually)
      const interestAccrued = leveragedAmount * baseInterestRate
      const leverageCostAmount = leveragedAmount * leverageCost
      const guaranteeFeeAmount = leveragedAmount * guaranteeFee
      const netInterest = interestAccrued - leverageCostAmount - guaranteeFeeAmount

      cumulativeInterest += interestAccrued
      leveragedAmount = leveragedAmount * (1 + baseInterestRate)

      // Risk adjustment (increases over time)
      const riskFactor = 1 - (year / termYears) * 0.1 // 10% risk discount at maturity
      const riskAdjustedValue = leveragedAmount * riskFactor

      projections.push({
        year,
        principalBalance: currentPrincipal,
        leveragedValue: leveragedAmount,
        interestAccrued,
        cumulativeInterest,
        totalValue: leveragedAmount,
        leverageCost: leverageCostAmount,
        netValue: leveragedAmount - (leverageCostAmount + guaranteeFeeAmount) * year,
        riskAdjustedValue,
      })
    }

    return projections
  }, [principal, baseInterestRate, termYears, leverageRatio, leverageCost, guaranteeFee])

  // Sensitivity analysis
  const sensitivityAnalysis = useMemo((): SensitivityAnalysis[] => {
    const results: SensitivityAnalysis[] = []
    const interestRates = [0.02, 0.025, 0.03, 0.035, 0.04, 0.045, 0.05, 0.055, 0.06]
    const leverageRatios = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

    interestRates.forEach((rate) => {
      leverageRatios.forEach((leverage) => {
        const leveragedAmount = principal * leverage
        const futureValue = leveragedAmount * Math.pow(1 + rate, termYears)
        const totalReturn = (futureValue - leveragedAmount) / leveragedAmount
        const annualizedReturn = Math.pow(futureValue / leveragedAmount, 1 / termYears) - 1
        const riskScore = (leverage / 100) * (rate * 10) // Simple risk scoring

        results.push({
          interestRate: rate,
          leverageRatio: leverage,
          futureValue,
          totalReturn,
          annualizedReturn,
          riskScore,
        })
      })
    })

    return results
  }, [principal, termYears])

  // Monte Carlo simulation
  const monteCarloResults = useMemo((): MonteCarloResult[] => {
    const results: MonteCarloResult[] = []

    for (let i = 0; i < monteCarloRuns; i++) {
      // Random variables
      const volatility = 0.15 + Math.random() * 0.1 // 15-25% volatility
      const meanReversion = 0.02 + Math.random() * 0.04 // 2-6% mean reversion
      const shockProbability = 0.05 // 5% chance of shock per year

      let currentValue = principal * leverageRatio
      let maxValue = currentValue
      let minValue = currentValue
      let yearsToBreakeven = 0
      let brokeEven = false

      for (let year = 1; year <= termYears; year++) {
        // Random shock
        const shock = Math.random() < shockProbability ? -0.2 - Math.random() * 0.3 : 0

        // Annual return with volatility
        const randomReturn =
          baseInterestRate + (Math.random() - 0.5) * volatility * 2 + shock + meanReversion * (0.04 - baseInterestRate)

        currentValue *= 1 + randomReturn
        maxValue = Math.max(maxValue, currentValue)
        minValue = Math.min(minValue, currentValue)

        if (!brokeEven && currentValue > principal * leverageRatio) {
          yearsToBreakeven = year
          brokeEven = true
        }
      }

      const maxDrawdown = (maxValue - minValue) / maxValue
      const totalReturn = (currentValue - principal * leverageRatio) / (principal * leverageRatio)

      results.push({
        scenario: i + 1,
        finalValue: currentValue,
        totalReturn,
        maxDrawdown,
        yearsToBreakeven: brokeEven ? yearsToBreakeven : termYears,
      })
    }

    return results.sort((a, b) => b.finalValue - a.finalValue)
  }, [principal, leverageRatio, baseInterestRate, termYears, monteCarloRuns])

  const formatCurrency = (amount: number) => {
    if (amount >= 1e12) return `$${(amount / 1e12).toFixed(2)}T`
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(2)}B`
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(2)}M`
    if (amount >= 1e3) return `$${(amount / 1e3).toFixed(0)}K`
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
  }

  const formatPercentage = (rate: number) => `${(rate * 100).toFixed(2)}%`

  // Key metrics
  const finalProjection = yearlyProjections[yearlyProjections.length - 1]
  const totalReturn = (finalProjection.totalValue - principal * leverageRatio) / (principal * leverageRatio)
  const annualizedReturn = Math.pow(finalProjection.totalValue / (principal * leverageRatio), 1 / termYears) - 1

  // Monte Carlo statistics
  const mcStats = {
    mean: monteCarloResults.reduce((sum, r) => sum + r.finalValue, 0) / monteCarloResults.length,
    median: monteCarloResults[Math.floor(monteCarloResults.length / 2)].finalValue,
    percentile95: monteCarloResults[Math.floor(monteCarloResults.length * 0.05)].finalValue,
    percentile5: monteCarloResults[Math.floor(monteCarloResults.length * 0.95)].finalValue,
    maxDrawdown: monteCarloResults.reduce((sum, r) => sum + r.maxDrawdown, 0) / monteCarloResults.length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Financial Projections & Analysis
          </h1>
          <p className="text-xl text-gray-300">
            50-Year Leveraged Instrument • {formatCurrency(principal)} Principal • {leverageRatio}x Leverage
          </p>
        </motion.div>

        {/* Key Metrics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm">Final Value (50Y)</p>
                  <p className="text-2xl font-bold text-green-400">{formatCurrency(finalProjection.totalValue)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center text-xs text-green-300">
                  <Target className="w-3 h-3 mr-1" />
                  {formatPercentage(totalReturn)} Total Return
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Annualized Return</p>
                  <p className="text-2xl font-bold text-blue-400">{formatPercentage(annualizedReturn)}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center text-xs text-blue-300">
                  <Activity className="w-3 h-3 mr-1" />
                  Compound Growth
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm">Monte Carlo Mean</p>
                  <p className="text-2xl font-bold text-purple-400">{formatCurrency(mcStats.mean)}</p>
                </div>
                <PieChartIcon className="w-8 h-8 text-purple-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center text-xs text-purple-300">
                  <Zap className="w-3 h-3 mr-1" />
                  1,000 Scenarios
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border-amber-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-200 text-sm">Risk-Adjusted Value</p>
                  <p className="text-2xl font-bold text-amber-400">
                    {formatCurrency(finalProjection.riskAdjustedValue)}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-amber-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center text-xs text-amber-300">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  10% Risk Discount
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Tabs */}
        <Tabs defaultValue="projections" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/30 border border-slate-600/30">
            <TabsTrigger value="projections">Year-by-Year</TabsTrigger>
            <TabsTrigger value="sensitivity">Sensitivity</TabsTrigger>
            <TabsTrigger value="montecarlo">Monte Carlo</TabsTrigger>
            <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          </TabsList>

          <TabsContent value="projections" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Growth Chart */}
              <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
                <CardHeader>
                  <CardTitle className="text-slate-300 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    50-Year Growth Projection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={yearlyProjections.filter((_, i) => i % 5 === 0 || i === yearlyProjections.length - 1)}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="year" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" tickFormatter={(value) => formatCurrency(value)} />
                      <Tooltip
                        formatter={(value: number) => [formatCurrency(value), ""]}
                        labelStyle={{ color: "#1F2937" }}
                        contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151" }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="leveragedValue"
                        stroke="#10B981"
                        strokeWidth={3}
                        name="Leveraged Value"
                      />
                      <Line
                        type="monotone"
                        dataKey="riskAdjustedValue"
                        stroke="#F59E0B"
                        strokeWidth={2}
                        name="Risk-Adjusted"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Year Selection */}
              <Card className="bg-gradient-to-br from-indigo-900/50 to-blue-900/50 border-indigo-400/30">
                <CardHeader>
                  <CardTitle className="text-indigo-300 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Year {selectedYear} Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-400">Select Year</Label>
                    <Slider
                      value={[selectedYear]}
                      onValueChange={(value) => setSelectedYear(value[0])}
                      max={50}
                      min={1}
                      step={1}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Year 1</span>
                      <span>Year {selectedYear}</span>
                      <span>Year 50</span>
                    </div>
                  </div>

                  {yearlyProjections[selectedYear - 1] && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-400">Leveraged Value</Label>
                        <p className="text-lg font-semibold text-indigo-300">
                          {formatCurrency(yearlyProjections[selectedYear - 1].leveragedValue)}
                        </p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Interest Accrued</Label>
                        <p className="text-lg font-semibold text-indigo-300">
                          {formatCurrency(yearlyProjections[selectedYear - 1].interestAccrued)}
                        </p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Cumulative Interest</Label>
                        <p className="text-lg font-semibold text-indigo-300">
                          {formatCurrency(yearlyProjections[selectedYear - 1].cumulativeInterest)}
                        </p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Leverage Cost</Label>
                        <p className="text-lg font-semibold text-indigo-300">
                          {formatCurrency(yearlyProjections[selectedYear - 1].leverageCost)}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Detailed Table */}
            <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
              <CardHeader>
                <CardTitle className="text-slate-300">Detailed Year-by-Year Projections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-2 text-gray-400">Year</th>
                        <th className="text-right p-2 text-gray-400">Leveraged Value</th>
                        <th className="text-right p-2 text-gray-400">Interest Accrued</th>
                        <th className="text-right p-2 text-gray-400">Leverage Cost</th>
                        <th className="text-right p-2 text-gray-400">Net Value</th>
                        <th className="text-right p-2 text-gray-400">Risk-Adjusted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yearlyProjections
                        .filter((_, i) => i % 5 === 0 || i === yearlyProjections.length - 1)
                        .map((projection) => (
                          <tr key={projection.year} className="border-b border-gray-700/50">
                            <td className="p-2 text-gray-300">{projection.year}</td>
                            <td className="p-2 text-right text-green-400">
                              {formatCurrency(projection.leveragedValue)}
                            </td>
                            <td className="p-2 text-right text-blue-400">
                              {formatCurrency(projection.interestAccrued)}
                            </td>
                            <td className="p-2 text-right text-red-400">{formatCurrency(projection.leverageCost)}</td>
                            <td className="p-2 text-right text-purple-400">{formatCurrency(projection.netValue)}</td>
                            <td className="p-2 text-right text-amber-400">
                              {formatCurrency(projection.riskAdjustedValue)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sensitivity" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
              <CardHeader>
                <CardTitle className="text-slate-300 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Sensitivity Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Interest Rate Sensitivity */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-300 mb-4">Interest Rate Impact</h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart
                        data={sensitivityAnalysis
                          .filter((s) => s.leverageRatio === 60)
                          .map((s) => ({
                            rate: formatPercentage(s.interestRate),
                            value: s.futureValue,
                            return: s.annualizedReturn,
                          }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="rate" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" tickFormatter={(value) => formatCurrency(value)} />
                        <Tooltip
                          formatter={(value: number) => [formatCurrency(value), "Future Value"]}
                          labelStyle={{ color: "#1F2937" }}
                          contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151" }}
                        />
                        <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Leverage Sensitivity */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-300 mb-4">Leverage Impact</h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart
                        data={sensitivityAnalysis
                          .filter((s) => s.interestRate === 0.04)
                          .map((s) => ({
                            leverage: `${s.leverageRatio}x`,
                            value: s.futureValue,
                            risk: s.riskScore,
                          }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="leverage" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" tickFormatter={(value) => formatCurrency(value)} />
                        <Tooltip
                          formatter={(value: number) => [formatCurrency(value), "Future Value"]}
                          labelStyle={{ color: "#1F2937" }}
                          contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151" }}
                        />
                        <Bar dataKey="value" fill="#8B5CF6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="montecarlo" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monte Carlo Distribution */}
              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-400/30">
                <CardHeader>
                  <CardTitle className="text-purple-300 flex items-center">
                    <PieChartIcon className="w-5 h-5 mr-2" />
                    Outcome Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={monteCarloResults
                        .slice(0, 100)
                        .map((r, i) => ({ scenario: i + 1, value: r.finalValue, return: r.totalReturn }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="scenario" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" tickFormatter={(value) => formatCurrency(value)} />
                      <Tooltip
                        formatter={(value: number) => [formatCurrency(value), "Final Value"]}
                        labelStyle={{ color: "#1F2937" }}
                        contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151" }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#EC4899" fill="#EC4899" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Monte Carlo Statistics */}
              <Card className="bg-gradient-to-br from-indigo-900/50 to-blue-900/50 border-indigo-400/30">
                <CardHeader>
                  <CardTitle className="text-indigo-300 flex items-center">
                    <Calculator className="w-5 h-5 mr-2" />
                    Statistical Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-400">Mean Outcome</Label>
                      <p className="text-lg font-semibold text-indigo-300">{formatCurrency(mcStats.mean)}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Median Outcome</Label>
                      <p className="text-lg font-semibold text-indigo-300">{formatCurrency(mcStats.median)}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400">95th Percentile</Label>
                      <p className="text-lg font-semibold text-green-400">{formatCurrency(mcStats.percentile95)}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400">5th Percentile</Label>
                      <p className="text-lg font-semibold text-red-400">{formatCurrency(mcStats.percentile5)}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Avg Max Drawdown</Label>
                      <p className="text-lg font-semibold text-amber-400">{formatPercentage(mcStats.maxDrawdown)}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Scenarios Run</Label>
                      <p className="text-lg font-semibold text-indigo-300">{monteCarloRuns.toLocaleString()}</p>
                    </div>
                  </div>

                  <Alert className="bg-purple-900/20 border-purple-400/30">
                    <AlertTriangle className="h-4 w-4 text-purple-400" />
                    <AlertDescription className="text-purple-200">
                      Monte Carlo analysis includes market volatility, economic shocks, and mean reversion effects over
                      50 years.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cashflow" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
              <CardContent className="text-center py-12">
                <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">Cash Flow Analysis</h3>
                <p className="text-gray-400 mb-6">
                  Detailed cash flow projections including interest payments, leverage costs, and guarantee fees.
                </p>
                <Button className="bg-gradient-to-r from-green-600 to-blue-600">Generate Cash Flow Model</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breakdown" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
              <CardContent className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">Cost Breakdown Analysis</h3>
                <p className="text-gray-400 mb-6">
                  Detailed breakdown of all costs, fees, and profit components over the 50-year term.
                </p>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600">Analyze Cost Structure</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
