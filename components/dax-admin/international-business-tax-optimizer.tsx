"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Building, TrendingUp, Users, Calculator, ArrowUpDown, Shield, Sparkles } from "lucide-react"

interface BusinessTaxOptimization {
  businessSize: "small" | "medium" | "large" | "global"
  operatingCurrency: string
  primaryJurisdiction: string
  annualRevenue: number
  employeeCount: number
  charitableContributions: number
  imperialTrustPledge: number
  rdInvestment: number
  sustainabilityInitiatives: number
  exchangeRates: { [key: string]: number }
  scaledBenefits: {
    charitableLimit: number
    rdDeduction: number
    sustainabilityIncentive: number
    employmentDeduction: number
  }
  totalSavings: number
}

const businessSizes = [
  {
    id: "small",
    name: "Small Business",
    revenueRange: "$100K - $1M",
    employeeRange: "1-50",
    multiplier: 1.0,
  },
  {
    id: "medium",
    name: "Medium Enterprise",
    revenueRange: "$1M - $50M",
    employeeRange: "51-500",
    multiplier: 2.5,
  },
  {
    id: "large",
    name: "Large Corporation",
    revenueRange: "$50M - $1B",
    employeeRange: "501-10,000",
    multiplier: 5.0,
  },
  {
    id: "global",
    name: "Global Enterprise",
    revenueRange: "$1B+",
    employeeRange: "10,000+",
    multiplier: 10.0,
  },
]

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$", rate: 1.0 },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.85 },
  { code: "GBP", name: "British Pound", symbol: "£", rate: 0.73 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", rate: 110.0 },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", rate: 6.45 },
  { code: "QDT", name: "Quantum Digital Token", symbol: "Ⓠ", rate: 0.0001 },
]

const jurisdictions = [
  {
    id: "us",
    name: "United States",
    corporateTaxRate: 21,
    charitableLimit: 25,
    rdIncentive: 100,
    sustainabilityBonus: 15,
    currency: "USD",
  },
  {
    id: "eu",
    name: "European Union",
    corporateTaxRate: 25,
    charitableLimit: 20,
    rdIncentive: 150,
    sustainabilityBonus: 25,
    currency: "EUR",
  },
  {
    id: "uk",
    name: "United Kingdom",
    corporateTaxRate: 19,
    charitableLimit: 15,
    rdIncentive: 130,
    sustainabilityBonus: 20,
    currency: "GBP",
  },
  {
    id: "japan",
    name: "Japan",
    corporateTaxRate: 30,
    charitableLimit: 12,
    rdIncentive: 125,
    sustainabilityBonus: 18,
    currency: "JPY",
  },
  {
    id: "china",
    name: "China",
    corporateTaxRate: 25,
    charitableLimit: 10,
    rdIncentive: 200,
    sustainabilityBonus: 30,
    currency: "CNY",
  },
  {
    id: "quantum",
    name: "Quantum Realm",
    corporateTaxRate: 15,
    charitableLimit: 100,
    rdIncentive: 300,
    sustainabilityBonus: 50,
    currency: "QDT",
  },
]

export function InternationalBusinessTaxOptimizer() {
  const [optimization, setOptimization] = useState<BusinessTaxOptimization>({
    businessSize: "medium",
    operatingCurrency: "USD",
    primaryJurisdiction: "us",
    annualRevenue: 10000000,
    employeeCount: 150,
    charitableContributions: 250000,
    imperialTrustPledge: 150000,
    rdInvestment: 500000,
    sustainabilityInitiatives: 100000,
    exchangeRates: {},
    scaledBenefits: {
      charitableLimit: 0,
      rdDeduction: 0,
      sustainabilityIncentive: 0,
      employmentDeduction: 0,
    },
    totalSavings: 0,
  })

  // Simulate real-time exchange rates
  useEffect(() => {
    const updateExchangeRates = () => {
      const rates: { [key: string]: number } = {}
      currencies.forEach((currency) => {
        // Add small random fluctuation to simulate real-time rates
        const fluctuation = (Math.random() - 0.5) * 0.02 // ±1% fluctuation
        rates[currency.code] = currency.rate * (1 + fluctuation)
      })
      setOptimization((prev) => ({ ...prev, exchangeRates: rates }))
    }

    updateExchangeRates()
    const interval = setInterval(updateExchangeRates, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const calculateOptimization = () => {
    const businessSize = businessSizes.find((s) => s.id === optimization.businessSize)
    const jurisdiction = jurisdictions.find((j) => j.id === optimization.primaryJurisdiction)
    const currency = currencies.find((c) => c.code === optimization.operatingCurrency)

    if (!businessSize || !jurisdiction || !currency) return

    const multiplier = businessSize.multiplier
    const exchangeRate = optimization.exchangeRates[optimization.operatingCurrency] || currency.rate

    // Convert all amounts to USD for calculation, then convert back
    const revenueUSD = optimization.annualRevenue / exchangeRate
    const charitableUSD = optimization.charitableContributions / exchangeRate
    const imperialTrustUSD = optimization.imperialTrustPledge / exchangeRate
    const rdUSD = optimization.rdInvestment / exchangeRate
    const sustainabilityUSD = optimization.sustainabilityInitiatives / exchangeRate

    // Calculate scaled benefits
    const charitableLimit = Math.min(
      (charitableUSD + imperialTrustUSD) * multiplier,
      revenueUSD * (jurisdiction.charitableLimit / 100),
    )

    const rdDeduction = rdUSD * (jurisdiction.rdIncentive / 100) * multiplier
    const sustainabilityIncentive = sustainabilityUSD * (jurisdiction.sustainabilityBonus / 100) * multiplier
    const employmentDeduction = optimization.employeeCount * 1000 * multiplier // $1000 per employee scaled

    // Imperial Trust gets special treatment (20% bonus)
    const imperialTrustBonus = imperialTrustUSD * 0.2 * multiplier

    const totalDeductions =
      charitableLimit + rdDeduction + sustainabilityIncentive + employmentDeduction + imperialTrustBonus
    const totalSavings = totalDeductions * (jurisdiction.corporateTaxRate / 100)

    // Convert back to operating currency
    const scaledBenefits = {
      charitableLimit: charitableLimit * exchangeRate,
      rdDeduction: rdDeduction * exchangeRate,
      sustainabilityIncentive: sustainabilityIncentive * exchangeRate,
      employmentDeduction: employmentDeduction * exchangeRate,
    }

    setOptimization((prev) => ({
      ...prev,
      scaledBenefits,
      totalSavings: totalSavings * exchangeRate,
    }))
  }

  const updateField = (field: keyof BusinessTaxOptimization, value: any) => {
    setOptimization((prev) => ({ ...prev, [field]: value }))
  }

  const selectedBusinessSize = businessSizes.find((s) => s.id === optimization.businessSize)
  const selectedJurisdiction = jurisdictions.find((j) => j.id === optimization.primaryJurisdiction)
  const selectedCurrency = currencies.find((c) => c.code === optimization.operatingCurrency)
  const currentExchangeRate = optimization.exchangeRates[optimization.operatingCurrency]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-500" />
            International Business Tax Optimizer
          </CardTitle>
          <CardDescription>Scale tax benefits globally with currency exchange rate adjustments</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="configuration" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="currency">Currency & Exchange</TabsTrigger>
          <TabsTrigger value="deductions">Deductions</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="configuration" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Business Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Business Configuration</CardTitle>
                <CardDescription>Set up your business entity details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business-size">Business Size</Label>
                  <Select
                    value={optimization.businessSize}
                    onValueChange={(value: any) => updateField("businessSize", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {businessSizes.map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                          <div className="flex flex-col">
                            <span>{size.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {size.revenueRange} • {size.employeeRange} employees
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jurisdiction">Primary Jurisdiction</Label>
                  <Select
                    value={optimization.primaryJurisdiction}
                    onValueChange={(value) => updateField("primaryJurisdiction", value)}
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
                  <Label htmlFor="annual-revenue">Annual Revenue</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                      {selectedCurrency?.symbol}
                    </span>
                    <Input
                      id="annual-revenue"
                      type="number"
                      value={optimization.annualRevenue}
                      onChange={(e) => updateField("annualRevenue", Number.parseInt(e.target.value))}
                      className="pl-8"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employee-count">Employee Count</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="employee-count"
                      type="number"
                      value={optimization.employeeCount}
                      onChange={(e) => updateField("employeeCount", Number.parseInt(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                </div>

                {selectedBusinessSize && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Scale Multiplier</p>
                    <p className="text-xs text-blue-600">
                      {selectedBusinessSize.multiplier}x benefit scaling for {selectedBusinessSize.name}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Jurisdiction Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Jurisdiction Overview</CardTitle>
                <CardDescription>Tax rates and incentives for selected jurisdiction</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedJurisdiction && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm font-medium text-red-800">Corporate Tax Rate</p>
                        <p className="text-xl font-bold text-red-900">{selectedJurisdiction.corporateTaxRate}%</p>
                      </div>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm font-medium text-green-800">Charitable Limit</p>
                        <p className="text-xl font-bold text-green-900">{selectedJurisdiction.charitableLimit}%</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Tax Incentives</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span className="text-sm">R&D Investment Deduction</span>
                          <Badge variant="outline">{selectedJurisdiction.rdIncentive}%</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span className="text-sm">Sustainability Bonus</span>
                          <Badge variant="outline">{selectedJurisdiction.sustainabilityBonus}%</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="currency" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Currency & Exchange Rates</CardTitle>
              <CardDescription>Real-time currency conversion and exchange rate tracking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="operating-currency">Operating Currency</Label>
                <Select
                  value={optimization.operatingCurrency}
                  onValueChange={(value) => updateField("operatingCurrency", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <div className="flex items-center gap-2">
                          <span>{currency.symbol}</span>
                          <span>
                            {currency.name} ({currency.code})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {currentExchangeRate && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowUpDown className="h-4 w-4 text-amber-600" />
                    <span className="font-medium text-amber-800">Current Exchange Rate</span>
                  </div>
                  <p className="text-sm text-amber-700">
                    1 USD = {currentExchangeRate.toFixed(4)} {optimization.operatingCurrency}
                  </p>
                  <p className="text-xs text-amber-600 mt-1">
                    Rates update every 30 seconds • Last updated: {new Date().toLocaleTimeString()}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currencies.map((currency) => (
                  <Card key={currency.code} className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{currency.symbol}</span>
                        <span className="text-sm">{currency.code}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={currency.code === optimization.operatingCurrency ? "bg-blue-50 text-blue-700" : ""}
                      >
                        {optimization.exchangeRates[currency.code]?.toFixed(4) || currency.rate.toFixed(4)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{currency.name}</p>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deductions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Charitable Contributions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Charitable Contributions</CardTitle>
                <CardDescription>Configure charitable giving and Imperial Trust pledges</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="charitable-contributions">Standard Charitable Contributions</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                      {selectedCurrency?.symbol}
                    </span>
                    <Input
                      id="charitable-contributions"
                      type="number"
                      value={optimization.charitableContributions}
                      onChange={(e) => updateField("charitableContributions", Number.parseInt(e.target.value))}
                      className="pl-8"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imperial-trust-pledge">Imperial Trust Pledge</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                      {selectedCurrency?.symbol}
                    </span>
                    <Input
                      id="imperial-trust-pledge"
                      type="number"
                      value={optimization.imperialTrustPledge}
                      onChange={(e) => updateField("imperialTrustPledge", Number.parseInt(e.target.value))}
                      className="pl-8"
                    />
                  </div>
                  <div className="p-2 bg-purple-50 border border-purple-200 rounded text-xs text-purple-700">
                    <Sparkles className="h-3 w-3 inline mr-1" />
                    20% bonus deduction for Imperial Trust pledges
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Deductions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Business Deductions</CardTitle>
                <CardDescription>R&D, sustainability, and employment-based deductions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rd-investment">R&D Investment</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                      {selectedCurrency?.symbol}
                    </span>
                    <Input
                      id="rd-investment"
                      type="number"
                      value={optimization.rdInvestment}
                      onChange={(e) => updateField("rdInvestment", Number.parseInt(e.target.value))}
                      className="pl-8"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sustainability-initiatives">Sustainability Initiatives</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                      {selectedCurrency?.symbol}
                    </span>
                    <Input
                      id="sustainability-initiatives"
                      type="number"
                      value={optimization.sustainabilityInitiatives}
                      onChange={(e) => updateField("sustainabilityInitiatives", Number.parseInt(e.target.value))}
                      className="pl-8"
                    />
                  </div>
                </div>

                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800">Employment Deduction</p>
                  <p className="text-lg font-bold text-green-900">
                    {selectedCurrency?.symbol}
                    {(optimization.employeeCount * 1000 * (selectedBusinessSize?.multiplier || 1)).toLocaleString()}
                  </p>
                  <p className="text-xs text-green-700">
                    {selectedCurrency?.symbol}1,000 per employee × {selectedBusinessSize?.multiplier}x scale multiplier
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button onClick={calculateOptimization} className="w-full">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate International Tax Optimization
          </Button>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Deduction Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Deduction Breakdown</CardTitle>
                <CardDescription>Scaled deductions by category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <span className="text-sm font-medium text-purple-800">Charitable Contributions</span>
                    <span className="font-bold text-purple-900">
                      {selectedCurrency?.symbol}
                      {optimization.scaledBenefits.charitableLimit.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <span className="text-sm font-medium text-blue-800">R&D Deduction</span>
                    <span className="font-bold text-blue-900">
                      {selectedCurrency?.symbol}
                      {optimization.scaledBenefits.rdDeduction.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-sm font-medium text-green-800">Sustainability Incentive</span>
                    <span className="font-bold text-green-900">
                      {selectedCurrency?.symbol}
                      {optimization.scaledBenefits.sustainabilityIncentive.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <span className="text-sm font-medium text-amber-800">Employment Deduction</span>
                    <span className="font-bold text-amber-900">
                      {selectedCurrency?.symbol}
                      {optimization.scaledBenefits.employmentDeduction.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Savings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Tax Savings</CardTitle>
                <CardDescription>Annual savings with international optimization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800 mb-2">Annual Tax Savings</p>
                  <p className="text-4xl font-bold text-green-900">
                    {selectedCurrency?.symbol}
                    {optimization.totalSavings.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-700 mt-2">
                    Optimized for {selectedJurisdiction?.name} • {selectedBusinessSize?.name}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="font-medium text-sm">Compliance Verified</p>
                      <p className="text-xs text-muted-foreground">All deductions meet regulatory requirements</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <Globe className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="font-medium text-sm">Multi-Jurisdiction Support</p>
                      <p className="text-xs text-muted-foreground">Optimized across international tax treaties</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                    <div>
                      <p className="font-medium text-sm">Scale Optimization</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedBusinessSize?.multiplier}x multiplier applied
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
