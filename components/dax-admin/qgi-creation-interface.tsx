"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { TrendingUp, Zap, Shield, DollarSign, BarChart3, Settings, Sparkles, Globe, Lock } from "lucide-react"

interface QGIConfiguration {
  name: string
  type: "social-impact" | "guaranteed-mortgage" | "custom"
  baseAsset: string
  leverageRatio: number
  maturityPeriod: number
  riskRating: string
  minimumInvestment: number
  expectedYield: [number, number]
  currency: string
  jurisdiction: string
  autoRebalancing: boolean
  liquidityTerms: string
  correlationFactor: number
  description: string
}

const qgiTypes = [
  {
    id: "social-impact",
    name: "Social Impact QGI",
    description: "Mirrors US 50-year corporate bonds with leveraged lending",
    icon: <TrendingUp className="h-4 w-4" />,
    color: "purple",
  },
  {
    id: "guaranteed-mortgage",
    name: "GM QGI",
    description: "Investment grade guaranteed mortgages backed by government",
    icon: <Shield className="h-4 w-4" />,
    color: "green",
  },
  {
    id: "custom",
    name: "Custom QGI",
    description: "Tailored investment product with dynamic variables",
    icon: <Sparkles className="h-4 w-4" />,
    color: "amber",
  },
]

const baseAssets = [
  "US 50-Year Corporate Bond",
  "Treasury Securities",
  "Municipal Bonds",
  "International Bonds",
  "Real Estate Securities",
  "Commodity Futures",
  "Quantum Digital Assets",
]

const riskRatings = ["AAA", "AA+", "AA", "AA-", "A+", "A", "A-", "BBB+", "BBB", "BBB-"]
const currencies = ["USD", "EUR", "GBP", "JPY", "CNY", "QDT (Quantum Digital Token)"]
const jurisdictions = ["United States", "European Union", "United Kingdom", "Japan", "China", "Quantum Realm"]

export function QGICreationInterface() {
  const [config, setConfig] = useState<QGIConfiguration>({
    name: "",
    type: "social-impact",
    baseAsset: "US 50-Year Corporate Bond",
    leverageRatio: 2.5,
    maturityPeriod: 50,
    riskRating: "AAA",
    minimumInvestment: 1000,
    expectedYield: [4.2, 6.8],
    currency: "USD",
    jurisdiction: "United States",
    autoRebalancing: true,
    liquidityTerms: "Quarterly redemption with 30-day notice",
    correlationFactor: 0.85,
    description: "",
  })

  const [activeTab, setActiveTab] = useState("basic")
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateQGI = async () => {
    setIsCreating(true)
    // Simulate QGI creation process
    setTimeout(() => {
      setIsCreating(false)
      // Show success message or redirect
    }, 3000)
  }

  const updateConfig = (key: keyof QGIConfiguration, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  const getTypeColor = (type: string) => {
    const typeConfig = qgiTypes.find((t) => t.id === type)
    switch (typeConfig?.color) {
      case "purple":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "green":
        return "bg-green-100 text-green-800 border-green-200"
      case "amber":
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-indigo-500" />
            Quantum Gains Instrument Creation
          </CardTitle>
          <CardDescription>
            Design and configure custom investment instruments with quantum-enhanced analytics
          </CardDescription>
        </CardHeader>
      </Card>

      {/* QGI Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Select QGI Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {qgiTypes.map((type) => (
              <div
                key={type.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  config.type === type.id ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => updateConfig("type", type.id)}
              >
                <div className="flex items-center gap-2 mb-2">
                  {type.icon}
                  <span className="font-medium">{type.name}</span>
                  {config.type === type.id && (
                    <Badge variant="outline" className={getTypeColor(type.id)}>
                      Selected
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configuration Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">QGI Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Settings</TabsTrigger>
              <TabsTrigger value="financial">Financial Parameters</TabsTrigger>
              <TabsTrigger value="risk">Risk & Compliance</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="qgi-name">QGI Name</Label>
                  <Input
                    id="qgi-name"
                    value={config.name}
                    onChange={(e) => updateConfig("name", e.target.value)}
                    placeholder="Enter QGI name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="base-asset">Base Asset</Label>
                  <Select value={config.baseAsset} onValueChange={(value) => updateConfig("baseAsset", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {baseAssets.map((asset) => (
                        <SelectItem key={asset} value={asset}>
                          {asset}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={config.currency} onValueChange={(value) => updateConfig("currency", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jurisdiction">Jurisdiction</Label>
                  <Select value={config.jurisdiction} onValueChange={(value) => updateConfig("jurisdiction", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {jurisdictions.map((jurisdiction) => (
                        <SelectItem key={jurisdiction} value={jurisdiction}>
                          {jurisdiction}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={config.description}
                  onChange={(e) => updateConfig("description", e.target.value)}
                  placeholder="Describe the QGI's purpose and strategy"
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Leverage Ratio: {config.leverageRatio}:1</Label>
                    <Slider
                      value={[config.leverageRatio]}
                      onValueChange={(value) => updateConfig("leverageRatio", value[0])}
                      max={10}
                      min={1}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Conservative (1:1)</span>
                      <span>Aggressive (10:1)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="min-investment">Minimum Investment</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="min-investment"
                        type="number"
                        value={config.minimumInvestment}
                        onChange={(e) => updateConfig("minimumInvestment", Number.parseInt(e.target.value))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Maturity Period: {config.maturityPeriod} years</Label>
                    <Slider
                      value={[config.maturityPeriod]}
                      onValueChange={(value) => updateConfig("maturityPeriod", value[0])}
                      max={50}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 year</span>
                      <span>50 years</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Expected Yield Range</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <Input
                          type="number"
                          value={config.expectedYield[0]}
                          onChange={(e) =>
                            updateConfig("expectedYield", [Number.parseFloat(e.target.value), config.expectedYield[1]])
                          }
                          step="0.1"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                          %
                        </span>
                      </div>
                      <div className="relative">
                        <Input
                          type="number"
                          value={config.expectedYield[1]}
                          onChange={(e) =>
                            updateConfig("expectedYield", [config.expectedYield[0], Number.parseFloat(e.target.value)])
                          }
                          step="0.1"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="risk" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="risk-rating">Risk Rating</Label>
                    <Select value={config.riskRating} onValueChange={(value) => updateConfig("riskRating", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {riskRatings.map((rating) => (
                          <SelectItem key={rating} value={rating}>
                            {rating}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Correlation Factor: {config.correlationFactor}</Label>
                    <Slider
                      value={[config.correlationFactor]}
                      onValueChange={(value) => updateConfig("correlationFactor", value[0])}
                      max={1}
                      min={0}
                      step={0.01}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Independent (0.0)</span>
                      <span>Fully Correlated (1.0)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-amber-600" />
                      <span className="font-medium text-amber-800">Risk Assessment</span>
                    </div>
                    <div className="space-y-2 text-sm text-amber-700">
                      <div className="flex justify-between">
                        <span>Market Risk:</span>
                        <Badge variant="outline" className="bg-amber-100 text-amber-800">
                          {config.leverageRatio > 5 ? "High" : config.leverageRatio > 2 ? "Medium" : "Low"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Credit Risk:</span>
                        <Badge variant="outline" className="bg-amber-100 text-amber-800">
                          {config.riskRating.includes("AAA")
                            ? "Low"
                            : config.riskRating.includes("A")
                              ? "Medium"
                              : "High"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Liquidity Risk:</span>
                        <Badge variant="outline" className="bg-amber-100 text-amber-800">
                          {config.maturityPeriod > 20 ? "High" : config.maturityPeriod > 5 ? "Medium" : "Low"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4 mt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-base">Auto-Rebalancing</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically rebalance portfolio based on market conditions
                    </p>
                  </div>
                  <Switch
                    checked={config.autoRebalancing}
                    onCheckedChange={(checked) => updateConfig("autoRebalancing", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="liquidity-terms">Liquidity Terms</Label>
                  <Textarea
                    id="liquidity-terms"
                    value={config.liquidityTerms}
                    onChange={(e) => updateConfig("liquidityTerms", e.target.value)}
                    placeholder="Define redemption terms and conditions"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Performance Tracking</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Real-time analytics and reporting</p>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Multi-Jurisdiction</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Cross-border compliance support</p>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">Quantum Security</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Post-quantum cryptography</p>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Creation Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Ready to create your QGI?</p>
              <p className="text-sm text-muted-foreground">
                Review your configuration and deploy the Quantum Gains Instrument
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handleCreateQGI} disabled={isCreating || !config.name}>
                {isCreating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Creating QGI...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Create QGI
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
