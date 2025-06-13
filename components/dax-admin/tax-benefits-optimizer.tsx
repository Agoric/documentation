"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  TrendingUp,
  Shield,
  Globe,
  Calculator,
  PieChart,
  FileText,
  CheckCircle,
  Sparkles,
} from "lucide-react"

interface TaxOptimization {
  jurisdiction: string
  entityType: "individual" | "business"
  annualIncome: number
  charitableContributions: number
  imperialTrustPledge: number
  standardDeduction: number
  optimizedDeduction: number
  taxSavings: number
  deductionUtilization: number
}

const jurisdictions = [
  { id: "us", name: "United States", personalLimit: 60, businessLimit: 25, currency: "USD" },
  { id: "eu", name: "European Union", personalLimit: 50, businessLimit: 20, currency: "EUR" },
  { id: "uk", name: "United Kingdom", personalLimit: 45, businessLimit: 15, currency: "GBP" },
  { id: "quantum", name: "Quantum Realm", personalLimit: 100, businessLimit: 100, currency: "QDT" },
]

const approvedCharities = [
  { name: "Imperial Trust Social Impact Fund", deductionRate: 100, special: true },
  { name: "Global Education Foundation", deductionRate: 85 },
  { name: "Environmental Protection Alliance", deductionRate: 90 },
  { name: "Healthcare Access Initiative", deductionRate: 80 },
  { name: "Technology for Good Foundation", deductionRate: 75 },
]

export function TaxBenefitsOptimizer() {
  const [optimization, setOptimization] = useState<TaxOptimization>({
    jurisdiction: "us",
    entityType: "individual",
    annualIncome: 100000,
    charitableContributions: 5000,
    imperialTrustPledge: 3000,
    standardDeduction: 0,
    optimizedDeduction: 0,
    taxSavings: 0,
    deductionUtilization: 0,
  })

  const [optimizationLevel, setOptimizationLevel] = useState(50)

  const calculateOptimization = () => {
    const jurisdiction = jurisdictions.find((j) => j.id === optimization.jurisdiction)
    if (!jurisdiction) return

    const maxDeductionRate =
      optimization.entityType === "individual" ? jurisdiction.personalLimit : jurisdiction.businessLimit

    const maxDeduction = (optimization.annualIncome * maxDeductionRate) / 100
    const totalContributions = optimization.charitableContributions + optimization.imperialTrustPledge

    const standardDeduction = Math.min(totalContributions, maxDeduction)

    // Imperial Trust gets special treatment in optimization
    const imperialTrustBonus = optimization.imperialTrustPledge * 0.15 // 15% bonus
    const optimizedDeduction = Math.min(
      totalContributions + imperialTrustBonus,
      maxDeduction * 1.2, // 20% higher limit with optimization
    )

    const taxRate = optimization.entityType === "individual" ? 0.22 : 0.21
    const taxSavings = (optimizedDeduction - standardDeduction) * taxRate
    const deductionUtilization = (optimizedDeduction / (maxDeduction * 1.2)) * 100

    setOptimization((prev) => ({
      ...prev,
      standardDeduction,
      optimizedDeduction,
      taxSavings,
      deductionUtilization,
    }))
  }

  const updateField = (field: keyof TaxOptimization, value: any) => {
    setOptimization((prev) => ({ ...prev, [field]: value }))
  }

  const selectedJurisdiction = jurisdictions.find((j) => j.id === optimization.jurisdiction)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-green-500" />
            Tax Benefits Optimizer
          </CardTitle>
          <CardDescription>
            Maximize charitable deductions and Imperial Trust pledges across jurisdictions
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="configuration" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="configuration" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Entity Configuration</CardTitle>
                <CardDescription>Set up your tax entity details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jurisdiction">Jurisdiction</Label>
                  <Select
                    value={optimization.jurisdiction}
                    onValueChange={(value) => updateField("jurisdiction", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {jurisdictions.map((jurisdiction) => (
                        <SelectItem key={jurisdiction.id} value={jurisdiction.id}>
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            {jurisdiction.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entity-type">Entity Type</Label>
                  <Select
                    value={optimization.entityType}
                    onValueChange={(value: "individual" | "business") => updateField("entityType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="annual-income">Annual Income ({selectedJurisdiction?.currency})</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="annual-income"
                      type="number"
                      value={optimization.annualIncome}
                      onChange={(e) => updateField("annualIncome", Number.parseInt(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                </div>

                {selectedJurisdiction && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Deduction Limits</p>
                    <p className="text-xs text-blue-600">
                      Personal: {selectedJurisdiction.personalLimit}% • Business: {selectedJurisdiction.businessLimit}%
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Charitable Contributions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Charitable Contributions</CardTitle>
                <CardDescription>Configure your charitable giving strategy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="charitable-contributions">Standard Charitable Contributions</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="charitable-contributions"
                      type="number"
                      value={optimization.charitableContributions}
                      onChange={(e) => updateField("charitableContributions", Number.parseInt(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imperial-trust-pledge">Imperial Trust Pledge</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="imperial-trust-pledge"
                      type="number"
                      value={optimization.imperialTrustPledge}
                      onChange={(e) => updateField("imperialTrustPledge", Number.parseInt(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                  <div className="p-2 bg-purple-50 border border-purple-200 rounded text-xs text-purple-700">
                    <Sparkles className="h-3 w-3 inline mr-1" />
                    Special tax status with enhanced deduction benefits
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Approved Charitable Entities</Label>
                  {approvedCharities.map((charity, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        {charity.special && <Sparkles className="h-3 w-3 text-purple-500" />}
                        <span className="text-sm">{charity.name}</span>
                      </div>
                      <Badge variant="outline" className={charity.special ? "bg-purple-50 text-purple-700" : ""}>
                        {charity.deductionRate}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quantum-Enhanced Optimization</CardTitle>
              <CardDescription>AI-powered tax strategy optimization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Optimization Level: {optimizationLevel}%</Label>
                  <Slider
                    value={[optimizationLevel]}
                    onValueChange={(value) => setOptimizationLevel(value[0])}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Conservative</span>
                    <span>Aggressive</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-blue-500" />
                      <span className="font-medium text-sm">Risk Assessment</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {optimizationLevel < 30 ? "Low Risk" : optimizationLevel < 70 ? "Medium Risk" : "High Risk"}
                    </Badge>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="font-medium text-sm">Compliance</span>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      Verified
                    </Badge>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-purple-500" />
                      <span className="font-medium text-sm">Efficiency</span>
                    </div>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                      {Math.round(optimizationLevel * 0.8 + 20)}%
                    </Badge>
                  </Card>
                </div>

                <Button onClick={calculateOptimization} className="w-full">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Optimization
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tax Savings Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tax Savings Summary</CardTitle>
                <CardDescription>Comparison of standard vs. optimized deductions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Standard Deduction</span>
                    <span className="font-bold">${optimization.standardDeduction.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-sm font-medium text-green-800">Optimized Deduction</span>
                    <span className="font-bold text-green-900">
                      ${optimization.optimizedDeduction.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <span className="text-sm font-medium text-blue-800">Annual Tax Savings</span>
                    <span className="font-bold text-blue-900">${optimization.taxSavings.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Deduction Utilization</span>
                    <span>{Math.round(optimization.deductionUtilization)}%</span>
                  </div>
                  <Progress value={optimization.deductionUtilization} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Optimization Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Optimization Breakdown</CardTitle>
                <CardDescription>Detailed analysis of tax benefit strategies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <PieChart className="h-4 w-4 text-purple-500" />
                      <span className="font-medium text-sm">Imperial Trust Advantage</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Enhanced deduction rate: {Math.round(optimization.imperialTrustPledge * 0.15)} bonus
                    </p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="h-4 w-4 text-blue-500" />
                      <span className="font-medium text-sm">Multi-Jurisdiction Benefits</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Optimized across {selectedJurisdiction?.name} tax regulations
                    </p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="h-4 w-4 text-green-500" />
                      <span className="font-medium text-sm">Compliance Status</span>
                    </div>
                    <p className="text-xs text-muted-foreground">All deductions verified and compliant</p>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Tax Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
