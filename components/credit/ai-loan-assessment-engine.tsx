"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  useCreditAcceleration,
  type AILoanAssessment,
  type CreditAccelerationLoan,
} from "@/contexts/credit-acceleration-context"
import { Brain, TrendingDown, AlertTriangle, CheckCircle, Calculator, Target, BarChart3, Activity } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface LoanAssessmentFormData {
  requestedAmount: number
  creditScore: number
  annualIncome: number
  debtToIncomeRatio: number
  employmentStatus: string
  employmentYears: number
  downPayment: number
  propertyValue: number
  loanPurpose: string
  propertyType: string
}

export function AILoanAssessmentEngine() {
  const { getAIRecommendation, assessLoanApplication } = useCreditAcceleration()

  const [formData, setFormData] = useState<LoanAssessmentFormData>({
    requestedAmount: 250000,
    creditScore: 720,
    annualIncome: 85000,
    debtToIncomeRatio: 0.28,
    employmentStatus: "employed",
    employmentYears: 5,
    downPayment: 50000,
    propertyValue: 300000,
    loanPurpose: "purchase",
    propertyType: "single_family",
  })

  const [assessment, setAssessment] = useState<AILoanAssessment | null>(null)
  const [isAssessing, setIsAssessing] = useState(false)
  const [realTimeScore, setRealTimeScore] = useState(0)

  // Real-time assessment as user types
  useEffect(() => {
    const calculateRealTimeScore = () => {
      let score = 0

      // Credit score impact (40%)
      if (formData.creditScore >= 750) score += 40
      else if (formData.creditScore >= 700) score += 35
      else if (formData.creditScore >= 650) score += 25
      else if (formData.creditScore >= 600) score += 15
      else score += 5

      // DTI impact (25%)
      if (formData.debtToIncomeRatio <= 0.28) score += 25
      else if (formData.debtToIncomeRatio <= 0.36) score += 20
      else if (formData.debtToIncomeRatio <= 0.43) score += 10
      else score += 5

      // Income stability (20%)
      if (formData.employmentYears >= 2) score += 20
      else if (formData.employmentYears >= 1) score += 15
      else score += 5

      // LTV ratio (15%)
      const ltvRatio = (formData.requestedAmount - formData.downPayment) / formData.propertyValue
      if (ltvRatio <= 0.8) score += 15
      else if (ltvRatio <= 0.9) score += 10
      else if (ltvRatio <= 0.95) score += 5
      else score += 0

      setRealTimeScore(Math.min(score, 100))
    }

    calculateRealTimeScore()
  }, [formData])

  const handleInputChange = (field: keyof LoanAssessmentFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const runFullAssessment = async () => {
    setIsAssessing(true)
    try {
      const loanData: Partial<CreditAccelerationLoan> = {
        requestedAmount: formData.requestedAmount,
        creditScore: formData.creditScore,
        annualIncome: formData.annualIncome,
        debtToIncomeRatio: formData.debtToIncomeRatio,
        employmentStatus: formData.employmentStatus,
      }

      const result = await getAIRecommendation(loanData)
      setAssessment(result)
    } catch (error) {
      console.error("Assessment failed:", error)
    } finally {
      setIsAssessing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    if (score >= 40) return "text-orange-400"
    return "text-red-400"
  }

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case "approve":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "review":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case "deny":
        return <TrendingDown className="w-5 h-5 text-red-400" />
      default:
        return <Target className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            AI Loan Assessment Engine
          </h1>
          <p className="text-xl text-purple-200">
            Advanced machine learning algorithms for instant loan qualification analysis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
              <CardHeader>
                <CardTitle className="text-purple-300 flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Loan Application Data
                </CardTitle>
                <CardDescription className="text-purple-200/70">
                  Enter borrower information for AI assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-purple-800/30">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="financial">Financial</TabsTrigger>
                    <TabsTrigger value="property">Property</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-purple-200">Credit Score</Label>
                        <Input
                          type="number"
                          value={formData.creditScore}
                          onChange={(e) => handleInputChange("creditScore", Number(e.target.value))}
                          className="bg-purple-800/30 border-purple-600 text-purple-100"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-purple-200">Employment Status</Label>
                        <Select
                          value={formData.employmentStatus}
                          onValueChange={(value) => handleInputChange("employmentStatus", value)}
                        >
                          <SelectTrigger className="bg-purple-800/30 border-purple-600 text-purple-100">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="employed">Employed</SelectItem>
                            <SelectItem value="self_employed">Self-Employed</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="retired">Retired</SelectItem>
                            <SelectItem value="unemployed">Unemployed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-purple-200">Employment Years</Label>
                        <Input
                          type="number"
                          value={formData.employmentYears}
                          onChange={(e) => handleInputChange("employmentYears", Number(e.target.value))}
                          className="bg-purple-800/30 border-purple-600 text-purple-100"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-purple-200">Loan Purpose</Label>
                        <Select
                          value={formData.loanPurpose}
                          onValueChange={(value) => handleInputChange("loanPurpose", value)}
                        >
                          <SelectTrigger className="bg-purple-800/30 border-purple-600 text-purple-100">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="purchase">Purchase</SelectItem>
                            <SelectItem value="refinance">Refinance</SelectItem>
                            <SelectItem value="cash_out">Cash-Out Refinance</SelectItem>
                            <SelectItem value="investment">Investment Property</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="financial" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-purple-200">Annual Income</Label>
                        <Input
                          type="number"
                          value={formData.annualIncome}
                          onChange={(e) => handleInputChange("annualIncome", Number(e.target.value))}
                          className="bg-purple-800/30 border-purple-600 text-purple-100"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-purple-200">Debt-to-Income Ratio</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={formData.debtToIncomeRatio}
                          onChange={(e) => handleInputChange("debtToIncomeRatio", Number(e.target.value))}
                          className="bg-purple-800/30 border-purple-600 text-purple-100"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-purple-200">Requested Amount</Label>
                        <Input
                          type="number"
                          value={formData.requestedAmount}
                          onChange={(e) => handleInputChange("requestedAmount", Number(e.target.value))}
                          className="bg-purple-800/30 border-purple-600 text-purple-100"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-purple-200">Down Payment</Label>
                        <Input
                          type="number"
                          value={formData.downPayment}
                          onChange={(e) => handleInputChange("downPayment", Number(e.target.value))}
                          className="bg-purple-800/30 border-purple-600 text-purple-100"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="property" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-purple-200">Property Value</Label>
                        <Input
                          type="number"
                          value={formData.propertyValue}
                          onChange={(e) => handleInputChange("propertyValue", Number(e.target.value))}
                          className="bg-purple-800/30 border-purple-600 text-purple-100"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-purple-200">Property Type</Label>
                        <Select
                          value={formData.propertyType}
                          onValueChange={(value) => handleInputChange("propertyType", value)}
                        >
                          <SelectTrigger className="bg-purple-800/30 border-purple-600 text-purple-100">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single_family">Single Family</SelectItem>
                            <SelectItem value="condo">Condominium</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                            <SelectItem value="multi_family">Multi-Family</SelectItem>
                            <SelectItem value="manufactured">Manufactured</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        onClick={runFullAssessment}
                        disabled={isAssessing}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        {isAssessing ? (
                          <>
                            <Brain className="w-4 h-4 mr-2 animate-spin" />
                            Running AI Assessment...
                          </>
                        ) : (
                          <>
                            <Brain className="w-4 h-4 mr-2" />
                            Run Full AI Assessment
                          </>
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Assessment */}
          <div className="space-y-6">
            {/* Real-time Score */}
            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-300 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Real-time Score
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className={`text-6xl font-bold mb-4 ${getScoreColor(realTimeScore)}`}>{realTimeScore}</div>
                <Progress value={realTimeScore} className="h-3 mb-4" />
                <div className="text-sm text-gray-400">
                  {realTimeScore >= 80
                    ? "Excellent"
                    : realTimeScore >= 60
                      ? "Good"
                      : realTimeScore >= 40
                        ? "Fair"
                        : "Poor"}
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Key Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">LTV Ratio</span>
                  <span className="text-blue-300">
                    {(((formData.requestedAmount - formData.downPayment) / formData.propertyValue) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">DTI Ratio</span>
                  <span className="text-blue-300">{(formData.debtToIncomeRatio * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Credit Score</span>
                  <span className="text-blue-300">{formData.creditScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Income</span>
                  <span className="text-blue-300">${formData.annualIncome.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* AI Assessment Results */}
            <AnimatePresence>
              {assessment && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-400/30">
                    <CardHeader>
                      <CardTitle className="text-purple-300 flex items-center">
                        <Brain className="w-5 h-5 mr-2" />
                        AI Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Recommendation</span>
                        <div className="flex items-center space-x-2">
                          {getRecommendationIcon(assessment.recommendation)}
                          <Badge
                            className={`${
                              assessment.recommendation === "approve"
                                ? "bg-green-600/20 text-green-300 border-green-400/30"
                                : assessment.recommendation === "review"
                                  ? "bg-yellow-600/20 text-yellow-300 border-yellow-400/30"
                                  : "bg-red-600/20 text-red-300 border-red-400/30"
                            }`}
                          >
                            {assessment.recommendation.toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-400">Confidence</span>
                        <span className="text-purple-300">{(assessment.confidence * 100).toFixed(1)}%</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-400">Risk Score</span>
                        <span className="text-purple-300">{(assessment.defaultRiskScore * 100).toFixed(1)}%</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-400">Overall Score</span>
                        <span className="text-purple-300">{(assessment.overallScore * 100).toFixed(1)}</span>
                      </div>

                      {assessment.recommendedAmount && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Recommended Amount</span>
                          <span className="text-green-300">${assessment.recommendedAmount.toLocaleString()}</span>
                        </div>
                      )}

                      {assessment.recommendedRate && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Recommended Rate</span>
                          <span className="text-green-300">{(assessment.recommendedRate * 100).toFixed(2)}%</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
