"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  useQUICAPrivateInstruments,
  type QUICAPrivateInstrument,
  type LeveragedLoanCalculation,
} from "@/contexts/quica-private-instruments-context"
import {
  Shield,
  TrendingUp,
  AlertTriangle,
  Lock,
  Calculator,
  BarChart3,
  DollarSign,
  Target,
  Activity,
  EyeOff,
  Zap,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function PrivateInstrumentsDashboard() {
  const {
    instruments,
    calculateLeveragedLoan,
    getAdminSecretInfo,
    performStressTest,
    calculateVaR,
    getPortfolioMetrics,
  } = useQUICAPrivateInstruments()

  const [selectedInstrument, setSelectedInstrument] = useState<QUICAPrivateInstrument | null>(null)
  const [adminKey, setAdminKey] = useState("")
  const [showSecretInfo, setShowSecretInfo] = useState(false)
  const [secretInfo, setSecretInfo] = useState<any>(null)
  const [calculation, setCalculation] = useState<LeveragedLoanCalculation | null>(null)
  const [portfolioMetrics, setPortfolioMetrics] = useState(getPortfolioMetrics())

  // Get the 50-year instrument
  const fiftyYearInstrument = Object.values(instruments).find((inst) => inst.termYears === 50)

  useEffect(() => {
    if (fiftyYearInstrument) {
      setSelectedInstrument(fiftyYearInstrument)

      // Calculate the leveraged loan details
      const calc = calculateLeveragedLoan(
        fiftyYearInstrument.principalAmount,
        fiftyYearInstrument.interestRate,
        fiftyYearInstrument.termYears,
        fiftyYearInstrument.leverageRatio,
      )
      setCalculation(calc)
    }
    setPortfolioMetrics(getPortfolioMetrics())
  }, [instruments, fiftyYearInstrument, calculateLeveragedLoan, getPortfolioMetrics])

  const handleAdminAccess = async () => {
    if (!selectedInstrument) return

    try {
      const info = await getAdminSecretInfo(selectedInstrument.instrumentId, adminKey)
      setSecretInfo(info)
      setShowSecretInfo(true)
    } catch (error) {
      alert("Invalid admin key")
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercentage = (rate: number) => {
    return `${(rate * 100).toFixed(2)}%`
  }

  if (!fiftyYearInstrument) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-red-900/50 to-orange-900/50 border-red-400/30">
            <CardContent className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-red-300 mb-2">No 50-Year Instrument Found</h3>
              <p className="text-red-200">The 50-year leveraged instrument has not been initialized.</p>
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            QUICA Private Instruments
          </h1>
          <p className="text-xl text-purple-200">
            50-Year Corporate Bond Mirror • 60x Leverage • $620,000 Principal • 4% Annual Compound
          </p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm">Principal Amount</p>
                  <p className="text-2xl font-bold text-green-400">
                    {formatCurrency(fiftyYearInstrument.principalAmount)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center text-xs text-green-300">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  50-Year Term
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-violet-900/50 border-purple-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm">Leveraged Value</p>
                  <p className="text-2xl font-bold text-purple-400">
                    {formatCurrency(fiftyYearInstrument.leveragedValue)}
                  </p>
                </div>
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center text-xs text-purple-300">
                  <Target className="w-3 h-3 mr-1" />
                  60x Leverage
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Interest Rate</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {formatPercentage(fiftyYearInstrument.interestRate)}
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center text-xs text-blue-300">
                  <Activity className="w-3 h-3 mr-1" />
                  Annual Compound
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border-amber-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-200 text-sm">Guarantee</p>
                  <p className="text-2xl font-bold text-amber-400">
                    {formatCurrency(fiftyYearInstrument.guaranteeAmount)}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-amber-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center text-xs text-amber-300">
                  <Shield className="w-3 h-3 mr-1" />
                  {fiftyYearInstrument.guaranteeRating} Rated
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
            <TabsTrigger value="bond-mirror">Bond Mirror</TabsTrigger>
            <TabsTrigger value="admin">Admin Secret</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Instrument Details */}
              <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
                <CardHeader>
                  <CardTitle className="text-slate-300 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Instrument Structure
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-400">Instrument ID</Label>
                      <p className="text-sm font-mono text-slate-200">{fiftyYearInstrument.instrumentId}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Type</Label>
                      <Badge className="bg-purple-600/20 text-purple-300 border-purple-400/30">
                        {fiftyYearInstrument.instrumentType.replace("_", " ").toUpperCase()}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-gray-400">QUICA Entity</Label>
                      <p className="text-sm text-slate-200">{fiftyYearInstrument.quicaEntityId}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Regulatory Exemption</Label>
                      <Badge className="bg-blue-600/20 text-blue-300 border-blue-400/30">
                        {fiftyYearInstrument.regulatoryExemption}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-gray-400">Status</Label>
                      <Badge className="bg-green-600/20 text-green-300 border-green-400/30">
                        {fiftyYearInstrument.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-gray-400">Risk Level</Label>
                      <Badge className="bg-red-600/20 text-red-300 border-red-400/30">
                        {fiftyYearInstrument.riskLevel.replace("_", " ").toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Leverage Details */}
              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-400/30">
                <CardHeader>
                  <CardTitle className="text-purple-300 flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Leverage Structure
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-400">Leverage Ratio</Label>
                      <p className="text-2xl font-bold text-purple-300">{fiftyYearInstrument.leverageRatio}x</p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Leverage Provider</Label>
                      <p className="text-sm text-purple-200">{fiftyYearInstrument.leverageProvider}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Margin Requirement</Label>
                      <p className="text-sm text-purple-200">
                        {formatPercentage(fiftyYearInstrument.marginRequirements)}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Leverage Cost</Label>
                      <p className="text-sm text-purple-200">{formatPercentage(fiftyYearInstrument.leverageCost)}</p>
                    </div>
                  </div>

                  <Alert className="bg-purple-900/20 border-purple-400/30">
                    <AlertTriangle className="h-4 w-4 text-purple-400" />
                    <AlertDescription className="text-purple-200">
                      Ultra-high leverage (60x) requires continuous monitoring and automated margin management.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>

            {/* Bond Mirror Details */}
            {fiftyYearInstrument.mirroredBond && (
              <Card className="bg-gradient-to-br from-indigo-900/50 to-blue-900/50 border-indigo-400/30">
                <CardHeader>
                  <CardTitle className="text-indigo-300 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Mirrored Corporate Bond
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-gray-400">Bond Details</Label>
                      <div className="space-y-1">
                        <p className="text-sm text-indigo-200">Issuer: {fiftyYearInstrument.mirroredBond.issuer}</p>
                        <p className="text-sm text-indigo-200">CUSIP: {fiftyYearInstrument.mirroredBond.cusip}</p>
                        <p className="text-sm text-indigo-200">
                          Type: {fiftyYearInstrument.mirroredBond.bondType.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-400">Financial Terms</Label>
                      <div className="space-y-1">
                        <p className="text-sm text-indigo-200">
                          Original Yield: {formatPercentage(fiftyYearInstrument.mirroredBond.originalYield)}
                        </p>
                        <p className="text-sm text-indigo-200">
                          Market Value: {formatCurrency(fiftyYearInstrument.mirroredBond.currentMarketValue)}
                        </p>
                        <p className="text-sm text-indigo-200">
                          Credit Rating: {fiftyYearInstrument.mirroredBond.creditRating}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-400">Features</Label>
                      <div className="space-y-1">
                        <p className="text-sm text-indigo-200">
                          Callable: {fiftyYearInstrument.mirroredBond.callableFeatures ? "Yes" : "No"}
                        </p>
                        <p className="text-sm text-indigo-200">
                          Putable: {fiftyYearInstrument.mirroredBond.putFeatures ? "Yes" : "No"}
                        </p>
                        <p className="text-sm text-indigo-200">
                          Maturity: {fiftyYearInstrument.mirroredBond.originalMaturity.getFullYear()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="calculations" className="space-y-6">
            {calculation && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
                  <CardHeader>
                    <CardTitle className="text-green-300 flex items-center">
                      <Calculator className="w-5 h-5 mr-2" />
                      Leveraged Loan Calculations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-400">Base Amount</Label>
                        <p className="text-lg font-semibold text-green-300">{formatCurrency(calculation.baseAmount)}</p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Leverage Multiple</Label>
                        <p className="text-lg font-semibold text-green-300">{calculation.leverageMultiple}x</p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Leveraged Amount</Label>
                        <p className="text-lg font-semibold text-green-300">
                          {formatCurrency(calculation.leveragedAmount)}
                        </p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Future Value (50Y)</Label>
                        <p className="text-lg font-semibold text-green-300">
                          {formatCurrency(calculation.futureValue)}
                        </p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Total Interest</Label>
                        <p className="text-lg font-semibold text-green-300">
                          {formatCurrency(calculation.totalInterest)}
                        </p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Effective APR</Label>
                        <p className="text-lg font-semibold text-green-300">
                          {formatPercentage(calculation.effectiveAPR)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-900/50 to-orange-900/50 border-red-400/30">
                  <CardHeader>
                    <CardTitle className="text-red-300 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Risk Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-400">Margin Requirement</Label>
                        <p className="text-lg font-semibold text-red-300">
                          {formatCurrency(calculation.marginRequirement)}
                        </p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Liquidation Price</Label>
                        <p className="text-lg font-semibold text-red-300">
                          {formatCurrency(calculation.liquidationPrice)}
                        </p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Max Drawdown</Label>
                        <p className="text-lg font-semibold text-red-300">
                          {formatPercentage(calculation.maxDrawdown)}
                        </p>
                      </div>
                      <div>
                        <Label className="text-gray-400">Volatility Adjustment</Label>
                        <p className="text-lg font-semibold text-red-300">
                          {formatPercentage(calculation.volatilityAdjustment)}
                        </p>
                      </div>
                    </div>

                    <Alert className="bg-red-900/20 border-red-400/30">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-200">
                        Ultra-high leverage amplifies both gains and losses. Daily monitoring required.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="bond-mirror" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
              <CardContent className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">Bond Mirror Analytics</h3>
                <p className="text-gray-400 mb-6">
                  Advanced bond mirroring analytics and correlation tracking coming soon.
                </p>
                <Button className="bg-gradient-to-r from-indigo-600 to-blue-600">Analyze Bond Mirror</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin" className="space-y-6">
            <Card className="bg-gradient-to-br from-red-900/50 to-pink-900/50 border-red-400/30">
              <CardHeader>
                <CardTitle className="text-red-300 flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Admin Secret Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!showSecretInfo ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-400">Admin Access Key</Label>
                      <Input
                        type="password"
                        value={adminKey}
                        onChange={(e) => setAdminKey(e.target.value)}
                        placeholder="Enter admin secret key"
                        className="bg-red-800/30 border-red-600 text-red-100"
                      />
                    </div>
                    <Button
                      onClick={handleAdminAccess}
                      className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Access Secret Information
                    </Button>
                  </div>
                ) : (
                  <AnimatePresence>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-red-300">Classified Information</h3>
                        <Button
                          onClick={() => setShowSecretInfo(false)}
                          variant="outline"
                          size="sm"
                          className="border-red-400/30 text-red-300"
                        >
                          <EyeOff className="w-4 h-4 mr-2" />
                          Hide
                        </Button>
                      </div>

                      {secretInfo && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <Label className="text-gray-400">Actual Leverage Ratio</Label>
                              <p className="text-lg font-semibold text-red-300">{secretInfo.actualLeverageRatio}x</p>
                            </div>
                            <div>
                              <Label className="text-gray-400">Hidden Fees (bps)</Label>
                              <p className="text-sm text-red-200">{secretInfo.hiddenFees.join(", ")}</p>
                            </div>
                            <div>
                              <Label className="text-gray-400">Internal Risk Rating</Label>
                              <Badge className="bg-red-600/20 text-red-300 border-red-400/30">
                                {secretInfo.internalRiskRating}
                              </Badge>
                            </div>
                            <div>
                              <Label className="text-gray-400">Profit Margins</Label>
                              <p className="text-lg font-semibold text-red-300">
                                {formatPercentage(secretInfo.profitMargins)}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <Label className="text-gray-400">Client Classification</Label>
                              <Badge className="bg-purple-600/20 text-purple-300 border-purple-400/30">
                                {secretInfo.clientClassification.replace("_", " ").toUpperCase()}
                              </Badge>
                            </div>
                            <div>
                              <Label className="text-gray-400">Backing Assets</Label>
                              <div className="space-y-1">
                                {secretInfo.backingAssets.map((asset: string, index: number) => (
                                  <p key={index} className="text-xs text-red-200">
                                    {asset.replace("_", " ")}
                                  </p>
                                ))}
                              </div>
                            </div>
                            <div>
                              <Label className="text-gray-400">Special Arrangements</Label>
                              <div className="space-y-1">
                                {secretInfo.specialArrangements.map((arrangement: string, index: number) => (
                                  <p key={index} className="text-xs text-red-200">
                                    • {arrangement}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <Alert className="bg-red-900/20 border-red-400/30">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <AlertDescription className="text-red-200">
                          This information is classified and restricted to authorized personnel only.
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  </AnimatePresence>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
