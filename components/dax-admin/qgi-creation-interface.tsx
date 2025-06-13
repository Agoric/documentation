"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Zap, Settings, Sparkles, Globe, Lock, BarChart3, Target } from "lucide-react"

interface QGIConfiguration {
  name: string
  type: "social-impact" | "guaranteed-mortgage" | "custom"
  backingAsset: string
  maturityPeriod: number
  leverageRatio: number
  riskRating: string
  minimumInvestment: number
  yieldStructure: "fixed" | "variable" | "hybrid"
  governmentBacking: boolean
  liquidityTerms: string
  correlationFactor: number
  rebalancingFrequency: string
  description: string
}

export function QGICreationInterface() {
  const [qgiConfig, setQgiConfig] = useState<QGIConfiguration>({
    name: "",
    type: "social-impact",
    backingAsset: "",
    maturityPeriod: 50,
    leverageRatio: 4,
    riskRating: "AA",
    minimumInvestment: 1000,
    yieldStructure: "hybrid",
    governmentBacking: true,
    liquidityTerms: "quarterly",
    correlationFactor: 0.85,
    rebalancingFrequency: "monthly",
    description: "",
  })

  const [createdQGIs, setCreatedQGIs] = useState([
    {
      id: "QGI-SI-001",
      name: "Social Impact Primary",
      type: "social-impact",
      status: "active",
      value: 2847392847.5,
      performance: "+4.2%",
      citizens: 12847,
    },
    {
      id: "QGI-GM-001",
      name: "Guaranteed Mortgage Alpha",
      type: "guaranteed-mortgage",
      status: "active",
      value: 1234567890.25,
      performance: "+3.8%",
      citizens: 8934,
    },
  ])

  const handleCreateQGI = () => {
    const newQGI = {
      id: `QGI-${qgiConfig.type.toUpperCase().substring(0, 2)}-${String(createdQGIs.length + 1).padStart(3, "0")}`,
      name: qgiConfig.name,
      type: qgiConfig.type,
      status: "pending",
      value: 0,
      performance: "0%",
      citizens: 0,
    }

    setCreatedQGIs([...createdQGIs, newQGI])

    // Reset form
    setQgiConfig({
      name: "",
      type: "social-impact",
      backingAsset: "",
      maturityPeriod: 50,
      leverageRatio: 4,
      riskRating: "AA",
      minimumInvestment: 1000,
      yieldStructure: "hybrid",
      governmentBacking: true,
      liquidityTerms: "quarterly",
      correlationFactor: 0.85,
      rebalancingFrequency: "monthly",
      description: "",
    })
  }

  const getQGITypeIcon = (type: string) => {
    switch (type) {
      case "social-impact":
        return <Globe className="h-4 w-4" />
      case "guaranteed-mortgage":
        return <Lock className="h-4 w-4" />
      default:
        return <Sparkles className="h-4 w-4" />
    }
  }

  const getQGITypeColor = (type: string) => {
    switch (type) {
      case "social-impact":
        return "bg-purple-50 border-purple-200 text-purple-800"
      case "guaranteed-mortgage":
        return "bg-green-50 border-green-200 text-green-800"
      default:
        return "bg-blue-50 border-blue-200 text-blue-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* QGI Creation Form */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-500" />
            Create New Quantum Gains Instrument
          </CardTitle>
          <CardDescription>Configure variables and parameters for a new QGI</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="qgi-name">QGI Name</Label>
              <Input
                id="qgi-name"
                placeholder="e.g., Social Impact Enhanced"
                value={qgiConfig.name}
                onChange={(e) => setQgiConfig({ ...qgiConfig, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="qgi-type">Instrument Type</Label>
              <Select
                value={qgiConfig.type}
                onValueChange={(value: any) => setQgiConfig({ ...qgiConfig, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="social-impact">Social Impact QGI</SelectItem>
                  <SelectItem value="guaranteed-mortgage">Guaranteed Mortgage (GM) QGI</SelectItem>
                  <SelectItem value="custom">Custom QGI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="backing-asset">Backing Asset</Label>
              <Select
                value={qgiConfig.backingAsset}
                onValueChange={(value) => setQgiConfig({ ...qgiConfig, backingAsset: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select backing asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us-corporate-bonds">US Corporate Bonds (50-year)</SelectItem>
                  <SelectItem value="government-securities">Government Securities</SelectItem>
                  <SelectItem value="mixed-portfolio">Mixed Portfolio</SelectItem>
                  <SelectItem value="mortgage-backed">Mortgage-Backed Securities</SelectItem>
                  <SelectItem value="quantum-enhanced">Quantum-Enhanced Instruments</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="risk-rating">Risk Rating</Label>
              <Select
                value={qgiConfig.riskRating}
                onValueChange={(value) => setQgiConfig({ ...qgiConfig, riskRating: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AAA">AAA - Highest Quality</SelectItem>
                  <SelectItem value="AA">AA - High Quality</SelectItem>
                  <SelectItem value="A">A - Upper Medium Grade</SelectItem>
                  <SelectItem value="BBB">BBB - Medium Grade</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Advanced Parameters */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Maturity Period: {qgiConfig.maturityPeriod} years</Label>
                <Slider
                  value={[qgiConfig.maturityPeriod]}
                  onValueChange={(value) => setQgiConfig({ ...qgiConfig, maturityPeriod: value[0] })}
                  max={50}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Leverage Ratio: {qgiConfig.leverageRatio}:1</Label>
                <Slider
                  value={[qgiConfig.leverageRatio]}
                  onValueChange={(value) => setQgiConfig({ ...qgiConfig, leverageRatio: value[0] })}
                  max={10}
                  min={1}
                  step={0.5}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Minimum Investment: ${qgiConfig.minimumInvestment.toLocaleString()}</Label>
                <Slider
                  value={[qgiConfig.minimumInvestment]}
                  onValueChange={(value) => setQgiConfig({ ...qgiConfig, minimumInvestment: value[0] })}
                  max={1000000}
                  min={1000}
                  step={1000}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Market Correlation: {(qgiConfig.correlationFactor * 100).toFixed(0)}%</Label>
                <Slider
                  value={[qgiConfig.correlationFactor]}
                  onValueChange={(value) => setQgiConfig({ ...qgiConfig, correlationFactor: value[0] })}
                  max={1}
                  min={0}
                  step={0.01}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="yield-structure">Yield Structure</Label>
                <Select
                  value={qgiConfig.yieldStructure}
                  onValueChange={(value: any) => setQgiConfig({ ...qgiConfig, yieldStructure: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Rate</SelectItem>
                    <SelectItem value="variable">Variable Rate</SelectItem>
                    <SelectItem value="hybrid">Hybrid (Fixed + Variable)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="liquidity-terms">Liquidity Terms</Label>
                <Select
                  value={qgiConfig.liquidityTerms}
                  onValueChange={(value) => setQgiConfig({ ...qgiConfig, liquidityTerms: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily Redemption</SelectItem>
                    <SelectItem value="weekly">Weekly Redemption</SelectItem>
                    <SelectItem value="monthly">Monthly Redemption</SelectItem>
                    <SelectItem value="quarterly">Quarterly Redemption</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rebalancing">Rebalancing Frequency</Label>
                <Select
                  value={qgiConfig.rebalancingFrequency}
                  onValueChange={(value) => setQgiConfig({ ...qgiConfig, rebalancingFrequency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="government-backing"
                checked={qgiConfig.governmentBacking}
                onCheckedChange={(checked) => setQgiConfig({ ...qgiConfig, governmentBacking: checked })}
              />
              <Label htmlFor="government-backing">Government Backing</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the QGI's purpose, target market, and unique features..."
                value={qgiConfig.description}
                onChange={(e) => setQgiConfig({ ...qgiConfig, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <Button onClick={handleCreateQGI} className="w-full" disabled={!qgiConfig.name || !qgiConfig.backingAsset}>
            <Zap className="h-4 w-4 mr-2" />
            Create Quantum Gains Instrument
          </Button>
        </CardContent>
      </Card>

      {/* Existing QGIs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Active Quantum Gains Instruments
          </CardTitle>
          <CardDescription>Currently deployed QGI instruments and their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {createdQGIs.map((qgi) => (
              <div
                key={qgi.id}
                className="p-4 border rounded-lg bg-gradient-to-r from-white to-gray-50 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getQGITypeColor(qgi.type)}`}>{getQGITypeIcon(qgi.type)}</div>
                    <div>
                      <h3 className="font-semibold">{qgi.name}</h3>
                      <p className="text-sm text-muted-foreground">{qgi.id}</p>
                    </div>
                  </div>
                  <Badge variant={qgi.status === "active" ? "default" : "secondary"}>{qgi.status}</Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="font-semibold">${(qgi.value / 1000000).toFixed(1)}M</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Performance (30d)</p>
                    <p className="font-semibold text-green-600">{qgi.performance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Citizens</p>
                    <p className="font-semibold">{qgi.citizens.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Settings className="h-3 w-3 mr-1" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm">
                      <Target className="h-3 w-3 mr-1" />
                      Analytics
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
