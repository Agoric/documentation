"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Coins,
  TrendingUp,
  Building,
  DollarSign,
  Users,
  Zap,
  Star,
  BarChart3,
  Clock,
  Globe,
  Target,
} from "lucide-react"

interface RWAToken {
  id: string
  name: string
  type: "real_estate" | "loan_note" | "commercial" | "residential"
  totalValue: number
  tokenPrice: number
  tokensAvailable: number
  totalTokens: number
  apy: number
  location: string
  status: "active" | "funding" | "completed"
  riskLevel: "low" | "medium" | "high"
  features: string[]
}

export function RWATokenization() {
  const [selectedToken, setSelectedToken] = useState<string>("luxury-condo-austin")
  const [investmentAmount, setInvestmentAmount] = useState(5000)

  const rwaTokens: RWAToken[] = [
    {
      id: "luxury-condo-austin",
      name: "Austin Luxury Condo Complex",
      type: "residential",
      totalValue: 2500000,
      tokenPrice: 100,
      tokensAvailable: 15000,
      totalTokens: 25000,
      apy: 12.5,
      location: "Austin, TX",
      status: "active",
      riskLevel: "medium",
      features: ["Prime location", "High rental demand", "Professional management", "Quarterly dividends"],
    },
    {
      id: "commercial-denver",
      name: "Denver Office Building",
      type: "commercial",
      totalValue: 5000000,
      tokenPrice: 250,
      tokensAvailable: 8000,
      totalTokens: 20000,
      apy: 15.2,
      location: "Denver, CO",
      status: "funding",
      riskLevel: "low",
      features: ["Long-term leases", "AAA tenants", "Downtown location", "Stable cash flow"],
    },
    {
      id: "loan-portfolio-1",
      name: "Asset-Backed Loan Portfolio #1",
      type: "loan_note",
      totalValue: 1000000,
      tokenPrice: 50,
      tokensAvailable: 12000,
      totalTokens: 20000,
      apy: 18.7,
      location: "Multi-State",
      status: "active",
      riskLevel: "medium",
      features: ["Diversified portfolio", "Asset-backed security", "Monthly payments", "50-year terms"],
    },
    {
      id: "miami-beachfront",
      name: "Miami Beachfront Resort",
      type: "commercial",
      totalValue: 8000000,
      tokenPrice: 500,
      tokensAvailable: 5000,
      totalTokens: 16000,
      apy: 22.3,
      location: "Miami, FL",
      status: "funding",
      riskLevel: "high",
      features: ["Beachfront location", "Tourism revenue", "Luxury amenities", "Seasonal appreciation"],
    },
  ]

  const portfolioStats = {
    totalInvested: 25000,
    currentValue: 28750,
    totalReturn: 3750,
    returnPercentage: 15.0,
    monthlyIncome: 312,
    tokensOwned: 847,
  }

  const currentToken = rwaTokens.find((token) => token.id === selectedToken) || rwaTokens[0]
  const fundingProgress = ((currentToken.totalTokens - currentToken.tokensAvailable) / currentToken.totalTokens) * 100
  const tokensCanBuy = Math.floor(investmentAmount / currentToken.tokenPrice)

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "funding":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">RWA Tokenization Platform</h2>
          <p className="text-muted-foreground">
            Fractionalized real-world asset ownership through blockchain technology
          </p>
        </div>
        <Badge className="bg-purple-100 text-purple-800">
          <Coins className="h-3 w-3 mr-1" />
          Blockchain Powered
        </Badge>
      </div>

      <Tabs defaultValue="marketplace" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="secondary">Secondary Market</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-6">
          {/* Investment Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Investment Calculator</span>
              </CardTitle>
              <CardDescription>Calculate your potential returns from RWA token investments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Investment Amount</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <span>$</span>
                      <input
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                        className="flex-1 p-2 border rounded-md"
                        min="100"
                        step="100"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Selected Token</label>
                    <select
                      value={selectedToken}
                      onChange={(e) => setSelectedToken(e.target.value)}
                      className="w-full p-2 border rounded-md mt-1"
                    >
                      {rwaTokens.map((token) => (
                        <option key={token.id} value={token.id}>
                          {token.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{tokensCanBuy}</div>
                      <p className="text-sm text-blue-800">Tokens</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">{currentToken.apy}%</div>
                      <p className="text-sm text-green-800">APY</p>
                    </div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">
                      ${Math.round((investmentAmount * currentToken.apy) / 100).toLocaleString()}
                    </div>
                    <p className="text-sm text-purple-800">Projected Annual Return</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Tokens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rwaTokens.map((token) => (
              <Card
                key={token.id}
                className={`cursor-pointer transition-all ${selectedToken === token.id ? "ring-2 ring-purple-500" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{token.name}</CardTitle>
                    <Badge className={getStatusColor(token.status)}>{token.status}</Badge>
                  </div>
                  <CardDescription className="flex items-center space-x-2">
                    <Building className="h-4 w-4" />
                    <span>{token.location}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-600">{token.apy}%</div>
                      <p className="text-xs text-muted-foreground">APY</p>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-600">${token.tokenPrice}</div>
                      <p className="text-xs text-muted-foreground">Per Token</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Funding Progress</span>
                      <span>{Math.round(fundingProgress)}%</span>
                    </div>
                    <Progress value={fundingProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {token.tokensAvailable.toLocaleString()} of {token.totalTokens.toLocaleString()} tokens available
                    </p>
                  </div>

                  <div className="space-y-1">
                    {token.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center text-xs">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className={`${getRiskColor(token.riskLevel)} border`} variant="outline">
                      {token.riskLevel} risk
                    </Badge>
                    <Button
                      size="sm"
                      onClick={() => setSelectedToken(token.id)}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      Invest Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${portfolioStats.totalInvested.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Across {portfolioStats.tokensOwned} tokens</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${portfolioStats.currentValue.toLocaleString()}</div>
                <p className="text-xs text-green-600">+{portfolioStats.returnPercentage}% total return</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${portfolioStats.monthlyIncome}</div>
                <p className="text-xs text-muted-foreground">Passive income</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Return</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+${portfolioStats.totalReturn.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Unrealized gains</p>
              </CardContent>
            </Card>
          </div>

          {/* Holdings */}
          <Card>
            <CardHeader>
              <CardTitle>Your Holdings</CardTitle>
              <CardDescription>Current RWA token positions in your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rwaTokens.slice(0, 3).map((token, index) => {
                  const holdings = [125, 80, 45][index]
                  const value = holdings * token.tokenPrice
                  const monthlyReturn = (value * token.apy) / 100 / 12

                  return (
                    <div key={token.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Building className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{token.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {holdings} tokens • {token.location}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${value.toLocaleString()}</div>
                        <div className="text-sm text-green-600">+${Math.round(monthlyReturn)}/month</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Track your RWA investment performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">+{portfolioStats.returnPercentage}%</div>
                    <p className="text-muted-foreground">Total Portfolio Return</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">8.2%</div>
                      <p className="text-sm text-blue-800">30-Day Return</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">24.7%</div>
                      <p className="text-sm text-green-800">YTD Return</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Insights</CardTitle>
                <CardDescription>Real estate market trends and opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-900">Market Opportunity</span>
                    </div>
                    <p className="text-sm text-green-800">
                      Commercial real estate in Austin showing 15% growth potential
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Globe className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Global Expansion</span>
                    </div>
                    <p className="text-sm text-blue-800">New international RWA tokens launching in Q2 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="secondary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Secondary Market</span>
              </CardTitle>
              <CardDescription>Trade RWA tokens with other investors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Secondary Market Trading</h3>
                <p className="text-muted-foreground mb-4">
                  Buy and sell RWA tokens with instant liquidity and transparent pricing
                </p>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Coins className="h-4 w-4 mr-2" />
                  Start Trading
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
