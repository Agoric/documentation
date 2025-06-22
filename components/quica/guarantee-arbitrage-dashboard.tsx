"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  useGuaranteeArbitrage,
  type GuaranteeArbitrageInstrument,
  type ArbitrageCalculation,
} from "@/contexts/guarantee-arbitrage-context"
import {
  Shield,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle,
  Calculator,
  BarChart3,
  Lock,
} from "lucide-react"
import { motion } from "framer-motion"

export function GuaranteeArbitrageDashboard() {
  const {
    instruments,
    strategies,
    calculateArbitrage,
    triggerPayout,
    addSecondaryInvestor,
    processPayouts,
    getPortfolioMetrics,
  } = useGuaranteeArbitrage()

  const [selectedInstrument, setSelectedInstrument] = useState<GuaranteeArbitrageInstrument | null>(null)
  const [calculation, setCalculation] = useState<ArbitrageCalculation | null>(null)
  const [newInvestor, setNewInvestor] = useState({
    name: "",
    amount: 100000,
  })
  const [portfolioMetrics, setPortfolioMetrics] = useState(getPortfolioMetrics())

  // Get the main arbitrage instrument
  const mainInstrument = Object.values(instruments)[0]

  useEffect(() => {
    if (mainInstrument) {
      setSelectedInstrument(mainInstrument)

      // Calculate arbitrage metrics
      const calc = calculateArbitrage(
        mainInstrument.principalAmount,
        mainInstrument.guaranteeCost,
        mainInstrument.secondaryOffering.interestRate,
        mainInstrument.secondaryOffering.lockupPeriod / 365,
      )
      setCalculation(calc)
    }
    setPortfolioMetrics(getPortfolioMetrics())
  }, [instruments, mainInstrument, calculateArbitrage, getPortfolioMetrics])

  const handleTriggerPayout = async () => {
    if (!selectedInstrument) return
    await triggerPayout(selectedInstrument.instrumentId)
  }

  const handleAddInvestor = async () => {
    if (!selectedInstrument || !newInvestor.name || newInvestor.amount < 100000) return

    await addSecondaryInvestor(selectedInstrument.secondaryOffering.offeringId, {
      investorName: newInvestor.name,
      investmentAmount: newInvestor.amount,
    })

    setNewInvestor({ name: "", amount: 100000 })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercentage = (rate: number) => `${(rate * 100).toFixed(1)}%`

  const getDaysUntilTrigger = (triggerDate: Date) => {
    const now = new Date()
    const diffTime = triggerDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  if (!mainInstrument) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-red-900/50 to-orange-900/50 border-red-400/30">
            <CardContent className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-red-300 mb-2">No Arbitrage Instrument Found</h3>
              <p className="text-red-200">The guarantee arbitrage instrument has not been initialized.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Guarantee Arbitrage Strategy
          </h1>
          <p className="text-xl text-gray-300">Bank Rate Guarantee → 90-Day Trigger → 25% Secondary Lock (5 Years)</p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm">Principal Amount</p>
                  <p className="text-2xl font-bold text-green-400">{formatCurrency(mainInstrument.principalAmount)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center text-xs text-green-300">
                  <Shield className="w-3 h-3 mr-1" />
                  Guaranteed Amount
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Guarantee Cost</p>
                  <p className="text-2xl font-bold text-blue-400">{formatPercentage(mainInstrument.guaranteeCost)}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center text-xs text-blue-300">
                  <Target className="w-3 h-3 mr-1" />
                  Bank Rate
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm">Secondary Rate</p>
                  <p className="text-2xl font-bold text-purple-400">
                    {formatPercentage(mainInstrument.secondaryOffering.interestRate)}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center text-xs text-purple-300">
                  <Lock className="w-3 h-3 mr-1" />
                  5-Year Lock
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border-amber-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-200 text-sm">Days to Trigger</p>
                  <p className="text-2xl font-bold text-amber-400">
                    {getDaysUntilTrigger(mainInstrument.payoutTriggerDate)}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-amber-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center text-xs text-amber-300">
                  <Zap className="w-3 h-3 mr-1" />
                  90-Day Strategy
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/30 border border-slate-600/30">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="calculations">Calculations</TabsTrigger>
            <TabsTrigger value="secondary">Secondary Market</TabsTrigger>
            <TabsTrigger value="execution">Execution</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Strategy Overview */}
              <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
                <CardHeader>
                  <CardTitle className="text-slate-300 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Arbitrage Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">1</span>
                        </div>
                        <div>
                          <div className="font-medium text-slate-200">Acquire Guarantee</div>
                          <div className="text-sm text-gray-400">
                            Pay {formatPercentage(mainInstrument.guaranteeCost)} bank rate
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-blue-600/20 text-blue-300 border-blue-400/30">
                        {formatCurrency(mainInstrument.principalAmount * mainInstrument.guaranteeCost)}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">2</span>
                        </div>
                        <div>
                          <div className="font-medium text-slate-200">Trigger Payout</div>
                          <div className="text-sm text-gray-400">90-day trigger window</div>
                        </div>
                      </div>
                      <Badge className="bg-amber-600/20 text-amber-300 border-amber-400/30">
                        {getDaysUntilTrigger(mainInstrument.payoutTriggerDate)} days
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">3</span>
                        </div>
                        <div>
                          <div className="font-medium text-slate-200">Secondary Sale</div>
                          <div className="text-sm text-gray-400">25% simple interest, 5-year lock</div>
                        </div>
                      </div>
                      <Badge className="bg-purple-600/20 text-purple-300 border-purple-400/30">
                        {formatPercentage(mainInstrument.secondaryOffering.interestRate)}
                      </Badge>
                    </div>
                  </div>

                  <Alert className="bg-green-900/20 border-green-400/30">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <AlertDescription className="text-green-200">
                      Strategy generates{" "}
                      {formatPercentage(mainInstrument.secondaryOffering.interestRate - mainInstrument.guaranteeCost)}{" "}
                      spread profit
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Payout Status */}
              <Card className="bg-gradient-to-br from-indigo-900/50 to-blue-900/50 border-indigo-400/30">
                <CardHeader>
                  <CardTitle className="text-indigo-300 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Payout Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-300 mb-2">
                      {getDaysUntilTrigger(mainInstrument.payoutTriggerDate)}
                    </div>
                    <div className="text-sm text-gray-400">Days Until Trigger</div>
                  </div>

                  <Progress
                    value={((90 - getDaysUntilTrigger(mainInstrument.payoutTriggerDate)) / 90) * 100}
                    className="h-3"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-400">Payout Amount</Label>
                      <p className="text-lg font-semibold text-indigo-300">
                        {formatCurrency(mainInstrument.payoutAmount)}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Status</Label>
                      <Badge
                        className={
                          mainInstrument.payoutStatus === "triggered"
                            ? "bg-green-600/20 text-green-300 border-green-400/30"
                            : "bg-yellow-600/20 text-yellow-300 border-yellow-400/30"
                        }
                      >
                        {mainInstrument.payoutStatus.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <Button
                    onClick={handleTriggerPayout}
                    disabled={mainInstrument.payoutStatus === "triggered"}
                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    {mainInstrument.payoutStatus === "triggered" ? "Payout Triggered" : "Trigger Payout"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calculations" className="space-y-6">
            {calculation && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
                  <CardHeader>
                    <CardTitle className="text-green-300 flex items-center">
                      <Calculator className="w-5 h-5 mr-2" />
                      Profit Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-400">Guarantee Fee</Label>
                        <p className="text-lg font-semibold text-green-300">
                          {formatCurrency(calculation.guaranteeFee)}
                        </p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Payout Amount</Label>
                        <p className="text-lg font-semibold text-green-300">
                          {formatCurrency(calculation.guaranteePayoutAmount)}
                        </p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Interest Owed (5Y)</Label>
                        <p className="text-lg font-semibold text-red-300">
                          {formatCurrency(calculation.totalInterestOwed)}
                        </p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Net Profit</Label>
                        <p className="text-lg font-semibold text-green-300">{formatCurrency(calculation.netProfit)}</p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Profit Margin</Label>
                        <p className="text-lg font-semibold text-green-300">
                          {formatPercentage(calculation.profitMargin)}
                        </p>
                      </div>
                      <div>
                        <Label className="text-gray-400">ROI</Label>
                        <p className="text-lg font-semibold text-green-300">{formatPercentage(calculation.roi)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-900/50 to-orange-900/50 border-red-400/30">
                  <CardHeader>
                    <CardTitle className="text-red-300 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Risk Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-400">Break-Even Time</Label>
                        <p className="text-lg font-semibold text-red-300">
                          {calculation.breakEvenTime.toFixed(0)} days
                        </p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Maximum Loss</Label>
                        <p className="text-lg font-semibold text-red-300">{formatCurrency(calculation.maxLoss)}</p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Success Probability</Label>
                        <p className="text-lg font-semibold text-red-300">
                          {formatPercentage(calculation.probabilityOfProfit)}
                        </p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Spread</Label>
                        <p className="text-lg font-semibold text-red-300">
                          {formatPercentage(calculation.secondaryRate - calculation.guaranteeCost)}
                        </p>
                      </div>
                    </div>

                    <Alert className="bg-red-900/20 border-red-400/30">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-200">
                        Strategy requires successful secondary market placement within 90 days of payout trigger.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="secondary" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Secondary Offering */}
              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-400/30">
                <CardHeader>
                  <CardTitle className="text-purple-300 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Secondary Market Offering
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-400">Total Offering</Label>
                      <p className="text-lg font-semibold text-purple-300">
                        {formatCurrency(mainInstrument.secondaryOffering.totalOfferingSize)}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Interest Rate</Label>
                      <p className="text-lg font-semibold text-purple-300">
                        {formatPercentage(mainInstrument.secondaryOffering.interestRate)}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Lock-up Period</Label>
                      <p className="text-lg font-semibold text-purple-300">
                        {(mainInstrument.secondaryOffering.lockupPeriod / 365).toFixed(0)} Years
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Min Investment</Label>
                      <p className="text-lg font-semibold text-purple-300">
                        {formatCurrency(mainInstrument.secondaryOffering.minimumInvestment)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Funding Progress</span>
                      <span className="text-purple-300">
                        {formatCurrency(mainInstrument.secondaryOffering.totalInvested)} /{" "}
                        {formatCurrency(mainInstrument.secondaryOffering.totalOfferingSize)}
                      </span>
                    </div>
                    <Progress
                      value={
                        (mainInstrument.secondaryOffering.totalInvested /
                          mainInstrument.secondaryOffering.totalOfferingSize) *
                        100
                      }
                      className="h-2"
                    />
                  </div>

                  <Badge
                    className={
                      mainInstrument.secondaryOffering.offeringStatus === "fully_subscribed"
                        ? "bg-green-600/20 text-green-300 border-green-400/30"
                        : "bg-blue-600/20 text-blue-300 border-blue-400/30"
                    }
                  >
                    {mainInstrument.secondaryOffering.offeringStatus.replace("_", " ").toUpperCase()}
                  </Badge>
                </CardContent>
              </Card>

              {/* Add Investor */}
              <Card className="bg-gradient-to-br from-indigo-900/50 to-blue-900/50 border-indigo-400/30">
                <CardHeader>
                  <CardTitle className="text-indigo-300 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Add Secondary Investor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-400">Investor Name</Label>
                    <Input
                      value={newInvestor.name}
                      onChange={(e) => setNewInvestor((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter investor name"
                      className="bg-indigo-800/30 border-indigo-600 text-indigo-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-400">Investment Amount</Label>
                    <Input
                      type="number"
                      value={newInvestor.amount}
                      onChange={(e) => setNewInvestor((prev) => ({ ...prev, amount: Number(e.target.value) }))}
                      min={mainInstrument.secondaryOffering.minimumInvestment}
                      max={mainInstrument.secondaryOffering.maximumInvestment}
                      className="bg-indigo-800/30 border-indigo-600 text-indigo-100"
                    />
                  </div>

                  <div className="p-3 bg-indigo-800/20 rounded-lg border border-indigo-400/20">
                    <h4 className="font-medium text-indigo-300 mb-2">Investment Terms</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Annual Return:</span>
                        <span className="text-indigo-300">{formatCurrency(newInvestor.amount * 0.25)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Return (5Y):</span>
                        <span className="text-indigo-300">{formatCurrency(newInvestor.amount * 0.25 * 5)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Payout:</span>
                        <span className="text-indigo-300">
                          {formatCurrency(newInvestor.amount + newInvestor.amount * 0.25 * 5)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleAddInvestor}
                    disabled={
                      !newInvestor.name || newInvestor.amount < mainInstrument.secondaryOffering.minimumInvestment
                    }
                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Add Investor
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Current Investors */}
            {mainInstrument.secondaryOffering.investors.length > 0 && (
              <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
                <CardHeader>
                  <CardTitle className="text-slate-300">
                    Current Investors ({mainInstrument.secondaryOffering.investors.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mainInstrument.secondaryOffering.investors.map((investor) => (
                      <div
                        key={investor.investorId}
                        className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg"
                      >
                        <div>
                          <div className="font-medium text-slate-200">{investor.investorName}</div>
                          <div className="text-sm text-gray-400">
                            Invested: {investor.investmentDate.toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-slate-200">
                            {formatCurrency(investor.investmentAmount)}
                          </div>
                          <div className="text-sm text-green-400">
                            Expected: {formatCurrency(investor.expectedReturn)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="execution" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
              <CardContent className="text-center py-12">
                <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">Strategy Execution</h3>
                <p className="text-gray-400 mb-6">
                  Advanced execution controls and automation for guarantee arbitrage strategies.
                </p>
                <Button className="bg-gradient-to-r from-green-600 to-blue-600">Configure Execution</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
