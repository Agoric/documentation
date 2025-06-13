"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calculator,
  Building2,
  User,
  Heart,
  FileText,
  DollarSign,
  BarChart3,
  Globe,
  Landmark,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Zap,
} from "lucide-react"

interface TaxJurisdiction {
  id: string
  name: string
  code: string
  maxCharitableDeduction: {
    personal: number
    business: number
  }
  taxRates: {
    personal: {
      min: number
      max: number
    }
    business: {
      min: number
      max: number
    }
  }
}

interface CharitableEntity {
  id: string
  name: string
  type: string
  jurisdictions: string[]
  maxDeduction: number
  status: "approved" | "pending" | "restricted"
}

export function TaxBenefitsOptimizer() {
  const [activeTab, setActiveTab] = useState("personal")
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>("usa")
  const [incomeAmount, setIncomeAmount] = useState<number>(100000)
  const [charitableAmount, setCharitableAmount] = useState<number>(5000)
  const [optimizationLevel, setOptimizationLevel] = useState<number>(75)
  const [pledgeToImperialTrust, setPledgeToImperialTrust] = useState<boolean>(true)

  const jurisdictions: TaxJurisdiction[] = [
    {
      id: "usa",
      name: "United States",
      code: "US",
      maxCharitableDeduction: {
        personal: 60,
        business: 25,
      },
      taxRates: {
        personal: {
          min: 10,
          max: 37,
        },
        business: {
          min: 21,
          max: 21,
        },
      },
    },
    {
      id: "eu",
      name: "European Union",
      code: "EU",
      maxCharitableDeduction: {
        personal: 50,
        business: 20,
      },
      taxRates: {
        personal: {
          min: 15,
          max: 45,
        },
        business: {
          min: 15,
          max: 30,
        },
      },
    },
    {
      id: "quantum",
      name: "Quantum Realm",
      code: "QR",
      maxCharitableDeduction: {
        personal: 100,
        business: 100,
      },
      taxRates: {
        personal: {
          min: 5,
          max: 15,
        },
        business: {
          min: 8,
          max: 12,
        },
      },
    },
  ]

  const charities: CharitableEntity[] = [
    {
      id: "imperial-trust",
      name: "Imperial Trust Social Impact Fund",
      type: "Multidimensional Fund",
      jurisdictions: ["usa", "eu", "quantum"],
      maxDeduction: 100,
      status: "approved",
    },
    {
      id: "global-relief",
      name: "Global Relief Initiative",
      type: "Humanitarian",
      jurisdictions: ["usa", "eu"],
      maxDeduction: 60,
      status: "approved",
    },
    {
      id: "quantum-research",
      name: "Quantum Research Foundation",
      type: "Scientific",
      jurisdictions: ["usa", "eu", "quantum"],
      maxDeduction: 50,
      status: "approved",
    },
    {
      id: "digital-education",
      name: "Digital Education Access",
      type: "Educational",
      jurisdictions: ["usa", "eu"],
      maxDeduction: 50,
      status: "approved",
    },
    {
      id: "earth-preservation",
      name: "Earth Preservation Alliance",
      type: "Environmental",
      jurisdictions: ["usa", "eu", "quantum"],
      maxDeduction: 30,
      status: "approved",
    },
  ]

  const selectedJurisdictionData = jurisdictions.find((j) => j.id === selectedJurisdiction) || jurisdictions[0]

  const calculateTaxSavings = () => {
    const isPersonal = activeTab === "personal"
    const maxDeductionPercentage = isPersonal
      ? selectedJurisdictionData.maxCharitableDeduction.personal
      : selectedJurisdictionData.maxCharitableDeduction.business

    const maxDeductionAmount = (incomeAmount * maxDeductionPercentage) / 100
    const effectiveDeduction = Math.min(charitableAmount, maxDeductionAmount)

    const avgTaxRate = isPersonal
      ? (selectedJurisdictionData.taxRates.personal.min + selectedJurisdictionData.taxRates.personal.max) / 2
      : selectedJurisdictionData.taxRates.business.min

    const taxSavings = (effectiveDeduction * avgTaxRate) / 100
    const optimizedSavings = taxSavings * (1 + optimizationLevel / 100)

    return {
      maxDeductionPercentage,
      maxDeductionAmount: maxDeductionAmount.toFixed(2),
      effectiveDeduction: effectiveDeduction.toFixed(2),
      taxSavings: taxSavings.toFixed(2),
      optimizedSavings: optimizedSavings.toFixed(2),
      deductionUtilization: Math.min((charitableAmount / maxDeductionAmount) * 100, 100),
    }
  }

  const taxSavings = calculateTaxSavings()

  return (
    <div className="space-y-6">
      <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-emerald-600" />
            DAX Tax Benefits Optimizer
          </CardTitle>
          <CardDescription>
            Maximize tax benefits through charitable contributions and Imperial Trust pledges
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Personal Tax Benefits
              </TabsTrigger>
              <TabsTrigger value="business" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Business Tax Benefits
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jurisdiction">Tax Jurisdiction</Label>
                  <Select value={selectedJurisdiction} onValueChange={setSelectedJurisdiction}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {jurisdictions.map((jurisdiction) => (
                        <SelectItem key={jurisdiction.id} value={jurisdiction.id}>
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            {jurisdiction.name} ({jurisdiction.code})
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="income">Annual Income</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="income"
                      type="number"
                      className="pl-8"
                      value={incomeAmount}
                      onChange={(e) => setIncomeAmount(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Charitable Contribution: ${charitableAmount.toLocaleString()}</Label>
                <Slider
                  value={[charitableAmount]}
                  onValueChange={(value) => setCharitableAmount(value[0])}
                  max={incomeAmount * 0.6}
                  min={0}
                  step={100}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Optimization Level: {optimizationLevel}%</Label>
                  <Badge variant="outline" className="text-xs">
                    <Zap className="h-3 w-3 mr-1 text-amber-500" />
                    Quantum Enhanced
                  </Badge>
                </div>
                <Slider
                  value={[optimizationLevel]}
                  onValueChange={(value) => setOptimizationLevel(value[0])}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="pledge-trust" checked={pledgeToImperialTrust} onCheckedChange={setPledgeToImperialTrust} />
                <Label htmlFor="pledge-trust" className="flex items-center gap-2">
                  Pledge to Imperial Trust Social Impact Fund
                  <Badge className="ml-2 bg-purple-100 text-purple-800 hover:bg-purple-100">Recommended</Badge>
                </Label>
              </div>
            </TabsContent>

            <TabsContent value="business" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jurisdiction">Tax Jurisdiction</Label>
                  <Select value={selectedJurisdiction} onValueChange={setSelectedJurisdiction}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {jurisdictions.map((jurisdiction) => (
                        <SelectItem key={jurisdiction.id} value={jurisdiction.id}>
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            {jurisdiction.name} ({jurisdiction.code})
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-income">Annual Business Revenue</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="business-income"
                      type="number"
                      className="pl-8"
                      value={incomeAmount}
                      onChange={(e) => setIncomeAmount(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Charitable Contribution: ${charitableAmount.toLocaleString()}</Label>
                <Slider
                  value={[charitableAmount]}
                  onValueChange={(value) => setCharitableAmount(value[0])}
                  max={incomeAmount * 0.25}
                  min={0}
                  step={100}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Optimization Level: {optimizationLevel}%</Label>
                  <Badge variant="outline" className="text-xs">
                    <Zap className="h-3 w-3 mr-1 text-amber-500" />
                    Quantum Enhanced
                  </Badge>
                </div>
                <Slider
                  value={[optimizationLevel]}
                  onValueChange={(value) => setOptimizationLevel(value[0])}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="pledge-trust-business"
                  checked={pledgeToImperialTrust}
                  onCheckedChange={setPledgeToImperialTrust}
                />
                <Label htmlFor="pledge-trust-business" className="flex items-center gap-2">
                  Pledge to Imperial Trust Social Impact Fund
                  <Badge className="ml-2 bg-purple-100 text-purple-800 hover:bg-purple-100">Recommended</Badge>
                </Label>
              </div>
            </TabsContent>
          </Tabs>

          {/* Results Card */}
          <Card className="bg-gradient-to-r from-white to-emerald-50 border border-emerald-200">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Landmark className="h-5 w-5 text-emerald-600" />
                    <h3 className="text-lg font-semibold">Tax Benefit Analysis</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Maximum Deduction:</span>
                      <span className="font-medium">
                        {taxSavings.maxDeductionPercentage}% (${Number(taxSavings.maxDeductionAmount).toLocaleString()})
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Effective Deduction:</span>
                      <span className="font-medium">${Number(taxSavings.effectiveDeduction).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Standard Tax Savings:</span>
                      <span className="font-medium">${Number(taxSavings.taxSavings).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">Optimized Tax Savings:</span>
                      <span className="font-bold text-emerald-600">
                        ${Number(taxSavings.optimizedSavings).toLocaleString()}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Deduction Utilization:</span>
                        <span className="font-medium">{Math.round(taxSavings.deductionUtilization)}%</span>
                      </div>
                      <Progress value={taxSavings.deductionUtilization} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <h3 className="text-lg font-semibold">Charitable Allocation</h3>
                  </div>

                  <div className="space-y-3">
                    {pledgeToImperialTrust && (
                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">Imperial Trust Social Impact Fund</span>
                        </div>
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                          {selectedJurisdictionData.id === "quantum" ? "100%" : "60%"}
                        </Badge>
                      </div>
                    )}

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">
                          {pledgeToImperialTrust ? "Other Approved Charities" : "Approved Charities"}
                        </span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        {pledgeToImperialTrust ? "40%" : "100%"}
                      </Badge>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-gray-600" />
                        <span className="font-medium">Compliance Status</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">
                          Fully compliant with {selectedJurisdictionData.name} tax regulations
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button className="w-full">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Detailed Tax Benefit Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Approved Charitable Entities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Approved Charitable Entities
          </CardTitle>
          <CardDescription>Organizations eligible for maximum tax deductions across jurisdictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {charities.map((charity) => (
              <div
                key={charity.id}
                className="p-4 border rounded-lg bg-gradient-to-r from-white to-gray-50 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        charity.id === "imperial-trust"
                          ? "bg-purple-50 border-purple-200 text-purple-800"
                          : "bg-blue-50 border-blue-200 text-blue-800"
                      }`}
                    >
                      <Heart className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{charity.name}</h3>
                      <p className="text-sm text-muted-foreground">{charity.type}</p>
                    </div>
                  </div>
                  <Badge
                    variant={charity.status === "approved" ? "default" : "secondary"}
                    className={
                      charity.status === "approved"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                    }
                  >
                    {charity.status === "approved" ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    )}
                    {charity.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Max Deduction</p>
                    <p className="font-semibold">{charity.maxDeduction}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Jurisdictions</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {charity.jurisdictions.map((j) => {
                        const jData = jurisdictions.find((jd) => jd.id === j)
                        return (
                          <Badge key={j} variant="outline" className="text-xs">
                            {jData?.code || j}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button variant="outline" size="sm" className="ml-auto">
                      <ArrowRight className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
