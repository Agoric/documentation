"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Building2,
  Globe,
  DollarSign,
  BarChart3,
  Landmark,
  FileText,
  ArrowRight,
  CheckCircle,
  Zap,
  RefreshCw,
  TrendingUp,
  Briefcase,
  Map,
  Scale,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface Currency {
  code: string
  name: string
  symbol: string
  exchangeRate: number // Relative to USD
}

interface TaxJurisdiction {
  id: string
  name: string
  code: string
  region: string
  currencies: string[]
  corporateTaxRate: number
  maxCharitableDeduction: number
  vatRate?: number
  specialDeductions: {
    rnd?: number
    sustainability?: number
    employment?: number
  }
}

interface BusinessScale {
  id: string
  name: string
  revenueMin: number
  revenueMax: number | null
  employeeMin: number
  employeeMax: number | null
  multiplier: number
}

export function InternationalBusinessTaxOptimizer() {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>("us")
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD")
  const [businessScale, setBusinessScale] = useState<string>("medium")
  const [annualRevenue, setAnnualRevenue] = useState<number>(5000000)
  const [charitableAmount, setCharitableAmount] = useState<number>(250000)
  const [employeeCount, setEmployeeCount] = useState<number>(50)
  const [rndInvestment, setRndInvestment] = useState<number>(500000)
  const [sustainabilityInvestment, setSustainabilityInvestment] = useState<number>(200000)
  const [optimizationLevel, setOptimizationLevel] = useState<number>(75)
  const [pledgeToImperialTrust, setPledgeToImperialTrust] = useState<boolean>(true)
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({})
  const [baseCurrency, setBaseCurrency] = useState<string>("USD")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const currencies: Currency[] = [
    { code: "USD", name: "US Dollar", symbol: "$", exchangeRate: 1 },
    { code: "EUR", name: "Euro", symbol: "€", exchangeRate: 0.92 },
    { code: "GBP", name: "British Pound", symbol: "£", exchangeRate: 0.79 },
    { code: "JPY", name: "Japanese Yen", symbol: "¥", exchangeRate: 150.45 },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥", exchangeRate: 7.24 },
    { code: "QDT", name: "Quantum Digital Token", symbol: "⚛", exchangeRate: 0.25 },
  ]

  const jurisdictions: TaxJurisdiction[] = [
    {
      id: "us",
      name: "United States",
      code: "US",
      region: "North America",
      currencies: ["USD"],
      corporateTaxRate: 21,
      maxCharitableDeduction: 25,
      specialDeductions: {
        rnd: 20,
        sustainability: 10,
        employment: 5,
      },
    },
    {
      id: "eu",
      name: "European Union",
      code: "EU",
      region: "Europe",
      currencies: ["EUR"],
      corporateTaxRate: 23,
      vatRate: 20,
      maxCharitableDeduction: 20,
      specialDeductions: {
        rnd: 25,
        sustainability: 15,
        employment: 8,
      },
    },
    {
      id: "uk",
      name: "United Kingdom",
      code: "UK",
      region: "Europe",
      currencies: ["GBP"],
      corporateTaxRate: 25,
      vatRate: 20,
      maxCharitableDeduction: 20,
      specialDeductions: {
        rnd: 23,
        sustainability: 12,
        employment: 7,
      },
    },
    {
      id: "jp",
      name: "Japan",
      code: "JP",
      region: "Asia",
      currencies: ["JPY"],
      corporateTaxRate: 30.62,
      vatRate: 10,
      maxCharitableDeduction: 15,
      specialDeductions: {
        rnd: 25,
        sustainability: 10,
        employment: 5,
      },
    },
    {
      id: "cn",
      name: "China",
      code: "CN",
      region: "Asia",
      currencies: ["CNY"],
      corporateTaxRate: 25,
      vatRate: 13,
      maxCharitableDeduction: 12,
      specialDeductions: {
        rnd: 15,
        sustainability: 10,
        employment: 8,
      },
    },
    {
      id: "qr",
      name: "Quantum Realm",
      code: "QR",
      region: "Multidimensional",
      currencies: ["QDT", "USD", "EUR", "GBP", "JPY", "CNY"],
      corporateTaxRate: 10,
      maxCharitableDeduction: 100,
      specialDeductions: {
        rnd: 50,
        sustainability: 40,
        employment: 30,
      },
    },
  ]

  const businessScales: BusinessScale[] = [
    {
      id: "small",
      name: "Small Business",
      revenueMin: 0,
      revenueMax: 5000000,
      employeeMin: 0,
      employeeMax: 50,
      multiplier: 0.8,
    },
    {
      id: "medium",
      name: "Medium Enterprise",
      revenueMin: 5000000,
      revenueMax: 50000000,
      employeeMin: 50,
      employeeMax: 250,
      multiplier: 1,
    },
    {
      id: "large",
      name: "Large Corporation",
      revenueMin: 50000000,
      revenueMax: 500000000,
      employeeMin: 250,
      employeeMax: 1000,
      multiplier: 1.2,
    },
    {
      id: "enterprise",
      name: "Global Enterprise",
      revenueMin: 500000000,
      revenueMax: null,
      employeeMin: 1000,
      employeeMax: null,
      multiplier: 1.5,
    },
  ]

  const selectedJurisdictionData = jurisdictions.find((j) => j.id === selectedJurisdiction) || jurisdictions[0]
  const selectedCurrencyData = currencies.find((c) => c.code === selectedCurrency) || currencies[0]
  const selectedBusinessScale = businessScales.find((s) => s.id === businessScale) || businessScales[1]

  // Simulate fetching exchange rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      setIsLoading(true)
      // In a real app, this would be an API call to get current exchange rates
      // For this demo, we'll use the hardcoded rates
      const rates: Record<string, number> = {}
      currencies.forEach((currency) => {
        rates[currency.code] = currency.exchangeRate
      })
      setExchangeRates(rates)
      setIsLoading(false)
    }

    fetchExchangeRates()
  }, [])

  // Convert value from selected currency to USD
  const convertToUSD = (value: number): number => {
    const rate = exchangeRates[selectedCurrency] || 1
    return value / rate
  }

  // Convert value from USD to selected currency
  const convertFromUSD = (value: number): number => {
    const rate = exchangeRates[selectedCurrency] || 1
    return value * rate
  }

  const formatCurrency = (value: number): string => {
    return `${selectedCurrencyData.symbol}${value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`
  }

  const calculateTaxSavings = () => {
    // Convert all values to USD for calculation
    const revenueUSD = convertToUSD(annualRevenue)
    const charitableUSD = convertToUSD(charitableAmount)
    const rndUSD = convertToUSD(rndInvestment)
    const sustainabilityUSD = convertToUSD(sustainabilityInvestment)

    // Apply business scale multiplier
    const scaledMultiplier = selectedBusinessScale.multiplier

    // Calculate maximum charitable deduction
    const maxDeductionPercentage = selectedJurisdictionData.maxCharitableDeduction
    const maxDeductionAmount = (revenueUSD * maxDeductionPercentage) / 100
    const effectiveDeduction = Math.min(charitableUSD, maxDeductionAmount)

    // Calculate special deductions
    const rndDeduction = (rndUSD * (selectedJurisdictionData.specialDeductions.rnd || 0)) / 100
    const sustainabilityDeduction =
      (sustainabilityUSD * (selectedJurisdictionData.specialDeductions.sustainability || 0)) / 100
    const employmentDeduction =
      (employeeCount * 1000 * (selectedJurisdictionData.specialDeductions.employment || 0)) / 100

    // Calculate total deductions
    const totalDeductions = effectiveDeduction + rndDeduction + sustainabilityDeduction + employmentDeduction

    // Calculate tax savings
    const taxRate = selectedJurisdictionData.corporateTaxRate / 100
    const standardTaxSavings = totalDeductions * taxRate

    // Apply optimization and scale multiplier
    const optimizedSavings = standardTaxSavings * (1 + optimizationLevel / 100) * scaledMultiplier

    // Convert back to selected currency
    const maxDeductionAmountConverted = convertFromUSD(maxDeductionAmount)
    const effectiveDeductionConverted = convertFromUSD(effectiveDeduction)
    const standardTaxSavingsConverted = convertFromUSD(standardTaxSavings)
    const optimizedSavingsConverted = convertFromUSD(optimizedSavings)

    return {
      maxDeductionPercentage,
      maxDeductionAmount: maxDeductionAmountConverted,
      effectiveDeduction: effectiveDeductionConverted,
      rndDeduction: convertFromUSD(rndDeduction),
      sustainabilityDeduction: convertFromUSD(sustainabilityDeduction),
      employmentDeduction: convertFromUSD(employmentDeduction),
      totalDeductions: convertFromUSD(totalDeductions),
      standardTaxSavings: standardTaxSavingsConverted,
      optimizedSavings: optimizedSavingsConverted,
      deductionUtilization: Math.min((charitableUSD / maxDeductionAmount) * 100, 100),
      scaledMultiplier,
    }
  }

  const taxSavings = calculateTaxSavings()

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                International Business Tax Optimizer
              </CardTitle>
              <CardDescription>Maximize global tax benefits with currency exchange rate adjustments</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <RefreshCw className="h-3 w-3" />
              Update Rates
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <Label htmlFor="currency">Operating Currency</Label>
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        {currency.name} ({currency.symbol})
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="business-scale">Business Scale</Label>
              <Select value={businessScale} onValueChange={setBusinessScale}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {businessScales.map((scale) => (
                    <SelectItem key={scale.id} value={scale.id}>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        {scale.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="revenue">Annual Revenue ({selectedCurrencyData.symbol})</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {selectedCurrencyData.symbol}
                </span>
                <Input
                  id="revenue"
                  type="number"
                  className="pl-8"
                  value={annualRevenue}
                  onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employees">Number of Employees</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="employees"
                  type="number"
                  className="pl-8"
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Deduction Categories</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Charitable Contribution: {formatCurrency(charitableAmount)}</Label>
                <Slider
                  value={[charitableAmount]}
                  onValueChange={(value) => setCharitableAmount(value[0])}
                  max={annualRevenue * 0.3}
                  min={0}
                  step={10000}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>R&D Investment: {formatCurrency(rndInvestment)}</Label>
                <Slider
                  value={[rndInvestment]}
                  onValueChange={(value) => setRndInvestment(value[0])}
                  max={annualRevenue * 0.2}
                  min={0}
                  step={10000}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Sustainability Investment: {formatCurrency(sustainabilityInvestment)}</Label>
                <Slider
                  value={[sustainabilityInvestment]}
                  onValueChange={(value) => setSustainabilityInvestment(value[0])}
                  max={annualRevenue * 0.1}
                  min={0}
                  step={10000}
                  className="w-full"
                />
              </div>
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
          </div>

          {/* Results Card */}
          <Card className="bg-gradient-to-r from-white to-blue-50 border border-blue-200">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Landmark className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">International Tax Benefit Analysis</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Corporate Tax Rate:</span>
                      <span className="font-medium">{selectedJurisdictionData.corporateTaxRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Maximum Charitable Deduction:</span>
                      <span className="font-medium">
                        {taxSavings.maxDeductionPercentage}% ({formatCurrency(taxSavings.maxDeductionAmount)})
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Business Scale Multiplier:</span>
                      <span className="font-medium">{taxSavings.scaledMultiplier}x</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Exchange Rate ({selectedCurrency}/USD):</span>
                      <span className="font-medium">{exchangeRates[selectedCurrency] || 1}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Charitable Deduction:</span>
                      <span className="font-medium">{formatCurrency(taxSavings.effectiveDeduction)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">R&D Deduction:</span>
                      <span className="font-medium">{formatCurrency(taxSavings.rndDeduction)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sustainability Deduction:</span>
                      <span className="font-medium">{formatCurrency(taxSavings.sustainabilityDeduction)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Employment Deduction:</span>
                      <span className="font-medium">{formatCurrency(taxSavings.employmentDeduction)}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Standard Tax Savings:</span>
                      <span className="font-medium">{formatCurrency(taxSavings.standardTaxSavings)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">Optimized Tax Savings:</span>
                      <span className="font-bold text-blue-600">{formatCurrency(taxSavings.optimizedSavings)}</span>
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
                    <Map className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">Global Compliance Status</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium">Primary Jurisdiction Compliance</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Fully compliant with {selectedJurisdictionData.name} tax regulations and reporting requirements.
                      </p>
                    </div>

                    {pledgeToImperialTrust && (
                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">Imperial Trust Pledge Status</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Imperial Trust contributions recognized across all jurisdictions with enhanced deduction
                          status.
                        </p>
                      </div>
                    )}

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Scale className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Cross-Border Considerations</span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Your business qualifies for multinational tax treaties in the following regions:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="bg-blue-50">
                            North America
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50">
                            European Union
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50">
                            Asia Pacific
                          </Badge>
                          {selectedJurisdiction === "qr" && (
                            <Badge variant="outline" className="bg-purple-50 text-purple-800">
                              Quantum Realm
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-gray-600" />
                        <span className="font-medium">Required Documentation</span>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          International Business Number
                        </li>
                        <li className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          Charitable Contribution Receipts
                        </li>
                        <li className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          R&D Expenditure Verification
                        </li>
                        <li className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          Sustainability Initiative Documentation
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button className="flex-1">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate International Tax Report
                </Button>
                <Button variant="outline" className="flex-1">
                  <Globe className="h-4 w-4 mr-2" />
                  Multi-Jurisdiction Filing Assistant
                </Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            International Tax Jurisdiction Comparison
          </CardTitle>
          <CardDescription>Compare tax benefits across multiple global jurisdictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Jurisdiction</th>
                  <th className="text-left py-3 px-4">Corporate Tax Rate</th>
                  <th className="text-left py-3 px-4">Max Charitable Deduction</th>
                  <th className="text-left py-3 px-4">R&D Incentives</th>
                  <th className="text-left py-3 px-4">Sustainability Benefits</th>
                  <th className="text-left py-3 px-4">Imperial Trust Status</th>
                </tr>
              </thead>
              <tbody>
                {jurisdictions.map((jurisdiction) => (
                  <tr
                    key={jurisdiction.id}
                    className={`border-b hover:bg-gray-50 ${
                      jurisdiction.id === selectedJurisdiction ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-blue-600" />
                        <span>{jurisdiction.name}</span>
                        {jurisdiction.id === selectedJurisdiction && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            Selected
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">{jurisdiction.corporateTaxRate}%</td>
                    <td className="py-3 px-4">{jurisdiction.maxCharitableDeduction}%</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <span>{jurisdiction.specialDeductions.rnd || 0}%</span>
                        {jurisdiction.specialDeductions.rnd && jurisdiction.specialDeductions.rnd > 20 && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">High</Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">{jurisdiction.specialDeductions.sustainability || 0}%</td>
                    <td className="py-3 px-4">
                      <Badge
                        className={
                          jurisdiction.id === "qr"
                            ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        }
                      >
                        {jurisdiction.id === "qr" ? "Enhanced (100%)" : "Standard"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <Button variant="outline" className="w-full">
              <ArrowRight className="h-4 w-4 mr-2" />
              View Detailed Jurisdiction Comparison
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
