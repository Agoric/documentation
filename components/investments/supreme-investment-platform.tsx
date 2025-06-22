"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, PieChart, Building, Home, Coins, ArrowUpRight, ArrowDownRight, Star, Shield } from "lucide-react"

const investmentData = {
  portfolio: {
    totalValue: 2500000,
    totalGain: 312500,
    totalGainPercent: 14.3,
    dayChange: 15750,
    dayChangePercent: 0.63,
  },
  allocations: [
    {
      category: "QGI Holdings",
      value: 1000000,
      allocation: 40,
      performance: 15.2,
      risk: "Medium",
      color: "from-purple-600 to-indigo-600",
    },
    {
      category: "Real Estate",
      value: 750000,
      allocation: 30,
      performance: 8.7,
      risk: "Low",
      color: "from-green-600 to-emerald-600",
    },
    {
      category: "Securities",
      value: 500000,
      allocation: 20,
      performance: 12.1,
      risk: "Medium",
      color: "from-blue-600 to-cyan-600",
    },
    {
      category: "Alternative Investments",
      value: 250000,
      allocation: 10,
      performance: 18.5,
      risk: "High",
      color: "from-amber-600 to-orange-600",
    },
  ],
  qgiInvestments: [
    {
      id: "qgi_social_impact",
      name: "QGI Social Impact Fund",
      type: "Social Impact",
      investment: 250000,
      currentValue: 287500,
      performance: 15.0,
      yield: 4.2,
      maturity: "Long-term",
      riskLevel: "Medium",
      features: ["Tax benefits", "Social impact", "Supreme Authority backing"],
    },
    {
      id: "qgi_institutional",
      name: "QGI Institutional Growth",
      type: "Institutional",
      investment: 500000,
      currentValue: 576000,
      performance: 15.2,
      yield: 3.8,
      maturity: "Long-term",
      riskLevel: "Medium",
      features: ["Institutional grade", "Professional management", "Exclusive access"],
    },
    {
      id: "qgi_authority",
      name: "QGI Supreme Authority",
      type: "Authority Level",
      investment: 250000,
      currentValue: 288750,
      performance: 15.5,
      yield: 5.1,
      maturity: "Long-term",
      riskLevel: "Low",
      features: ["Supreme Authority exclusive", "Guaranteed returns", "Ultimate protection"],
    },
  ],
  realEstate: [
    {
      id: "commercial_plaza",
      name: "Downtown Commercial Plaza",
      type: "Commercial",
      investment: 300000,
      currentValue: 325000,
      performance: 8.3,
      yield: 6.2,
      location: "New York, NY",
      status: "Fully Leased",
    },
    {
      id: "residential_complex",
      name: "Luxury Residential Complex",
      type: "Residential",
      investment: 250000,
      currentValue: 272500,
      performance: 9.0,
      yield: 5.8,
      location: "Miami, FL",
      status: "95% Occupied",
    },
    {
      id: "industrial_warehouse",
      name: "Industrial Warehouse",
      type: "Industrial",
      investment: 200000,
      currentValue: 218000,
      performance: 9.0,
      yield: 7.1,
      location: "Dallas, TX",
      status: "Long-term Lease",
    },
  ],
  securities: [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      shares: 500,
      avgCost: 150,
      currentPrice: 185,
      value: 92500,
      performance: 23.3,
      sector: "Technology",
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      shares: 300,
      avgCost: 280,
      currentPrice: 340,
      value: 102000,
      performance: 21.4,
      sector: "Technology",
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      shares: 200,
      avgCost: 120,
      currentPrice: 145,
      value: 29000,
      performance: 20.8,
      sector: "Technology",
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      shares: 400,
      avgCost: 200,
      currentPrice: 250,
      value: 100000,
      performance: 25.0,
      sector: "Automotive",
    },
  ],
  alternatives: [
    {
      id: "crypto_portfolio",
      name: "Cryptocurrency Portfolio",
      type: "Digital Assets",
      investment: 100000,
      currentValue: 118500,
      performance: 18.5,
      allocation: 40,
    },
    {
      id: "private_equity",
      name: "Private Equity Fund",
      type: "Private Equity",
      investment: 75000,
      currentValue: 89250,
      performance: 19.0,
      allocation: 30,
    },
    {
      id: "commodities",
      name: "Commodities Fund",
      type: "Commodities",
      investment: 50000,
      currentValue: 59000,
      performance: 18.0,
      allocation: 20,
    },
    {
      id: "hedge_fund",
      name: "Hedge Fund Investment",
      type: "Hedge Fund",
      investment: 25000,
      currentValue: 29750,
      performance: 19.0,
      allocation: 10,
    },
  ],
}

export function SupremeInvestmentPlatform() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedInvestment, setSelectedInvestment] = useState<string | null>(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getPerformanceColor = (performance: number) => {
    if (performance >= 15) return "text-green-400"
    if (performance >= 10) return "text-yellow-400"
    if (performance >= 0) return "text-blue-400"
    return "text-red-400"
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-400"
      case "Medium":
        return "text-yellow-400"
      case "High":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-clip-text text-transparent font-serif">
          Supreme Investment Platform
        </h1>
        <p className="text-xl text-amber-300/80 italic font-serif">
          Advanced Portfolio Management & Investment Solutions
        </p>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-slate-800/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="qgi">QGI Holdings</TabsTrigger>
          <TabsTrigger value="realestate">Real Estate</TabsTrigger>
          <TabsTrigger value="securities">Securities</TabsTrigger>
          <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Portfolio Summary */}
            <Card className="lg:col-span-2 bg-gradient-to-br from-amber-900/50 to-orange-900/50 border-amber-400/30">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif flex items-center">
                  <PieChart className="w-6 h-6 mr-2" />
                  Portfolio Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-amber-300 mb-2">
                    {formatCurrency(investmentData.portfolio.totalValue)}
                  </div>
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 font-semibold text-lg">
                        +{formatCurrency(investmentData.portfolio.totalGain)} (
                        {investmentData.portfolio.totalGainPercent}%)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    {investmentData.portfolio.dayChange >= 0 ? (
                      <ArrowUpRight className="w-4 h-4 text-green-400" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-400" />
                    )}
                    <span
                      className={`text-sm ${investmentData.portfolio.dayChange >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {formatCurrency(investmentData.portfolio.dayChange)} ({investmentData.portfolio.dayChangePercent}
                      %) today
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-amber-300 font-semibold">Asset Allocation</h4>
                  {investmentData.allocations.map((allocation, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-amber-200 text-sm">{allocation.category}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-amber-300 font-semibold">{allocation.allocation}%</span>
                          <span className={`text-xs ${getPerformanceColor(allocation.performance)}`}>
                            +{allocation.performance}%
                          </span>
                        </div>
                      </div>
                      <Progress value={allocation.allocation} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="space-y-4">
              {investmentData.allocations.map((allocation, index) => (
                <Card key={index} className={`bg-gradient-to-br ${allocation.color} border-opacity-30`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-white font-medium text-sm">{allocation.category}</div>
                      <Badge className="bg-white/20 text-white border-white/30">{allocation.risk} Risk</Badge>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{formatCurrency(allocation.value)}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-xs">{allocation.allocation}% of portfolio</span>
                      <span className="text-white text-xs font-semibold">+{allocation.performance}%</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* QGI Holdings Tab */}
        <TabsContent value="qgi" className="space-y-6">
          <div className="space-y-6">
            {investmentData.qgiInvestments.map((investment) => (
              <Card
                key={investment.id}
                className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-purple-300 font-serif">{investment.name}</CardTitle>
                      <p className="text-purple-400/70 text-sm">{investment.type}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-purple-300">
                        {formatCurrency(investment.currentValue)}
                      </div>
                      <div className="text-purple-400 text-sm">
                        +{formatCurrency(investment.currentValue - investment.investment)} ({investment.performance}%)
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-3 bg-purple-800/20 rounded-lg">
                          <div className="text-lg font-bold text-purple-300">{investment.yield}%</div>
                          <div className="text-purple-400/70 text-xs">Annual Yield</div>
                        </div>
                        <div className="text-center p-3 bg-purple-800/20 rounded-lg">
                          <div className="text-lg font-bold text-purple-300">{investment.riskLevel}</div>
                          <div className="text-purple-400/70 text-xs">Risk Level</div>
                        </div>
                      </div>
                      <div className="text-center p-3 bg-purple-800/20 rounded-lg">
                        <div className="text-lg font-bold text-purple-300">{investment.maturity}</div>
                        <div className="text-purple-400/70 text-xs">Investment Horizon</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-purple-300 font-medium mb-3">Investment Features</h4>
                      <ul className="space-y-2">
                        {investment.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm text-purple-200">
                            <Star className="w-4 h-4 text-amber-400" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Real Estate Tab */}
        <TabsContent value="realestate" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investmentData.realEstate.map((property) => (
              <Card
                key={property.id}
                className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-green-300 font-serif text-lg">{property.name}</CardTitle>
                    <Badge className="bg-green-600/20 text-green-300 border-green-400/30">{property.type}</Badge>
                  </div>
                  <p className="text-green-400/70 text-sm">{property.location}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-300">{formatCurrency(property.currentValue)}</div>
                    <div className="text-green-400 text-sm">
                      +{formatCurrency(property.currentValue - property.investment)} ({property.performance}%)
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-2 bg-green-800/20 rounded-lg">
                      <div className="text-lg font-bold text-green-300">{property.yield}%</div>
                      <div className="text-green-400/70 text-xs">Annual Yield</div>
                    </div>
                    <div className="text-center p-2 bg-green-800/20 rounded-lg">
                      <div className="text-lg font-bold text-green-300">{property.status}</div>
                      <div className="text-green-400/70 text-xs">Status</div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                    <Home className="w-4 h-4 mr-2" />
                    View Property Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Securities Tab */}
        <TabsContent value="securities" className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
            <CardHeader>
              <CardTitle className="text-blue-300 font-serif">Securities Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {investmentData.securities.map((security) => (
                  <div
                    key={security.symbol}
                    className="flex items-center justify-between p-4 bg-blue-800/20 rounded-lg border border-blue-400/20"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                        <Building className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-blue-300 font-medium">{security.symbol}</div>
                        <div className="text-blue-400/70 text-sm">{security.name}</div>
                        <div className="text-blue-500/70 text-xs">{security.sector}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-300 font-bold">{formatCurrency(security.value)}</div>
                      <div className="text-blue-400 text-sm">
                        {security.shares} shares @ {formatCurrency(security.currentPrice)}
                      </div>
                      <div className={`text-xs ${getPerformanceColor(security.performance)}`}>
                        +{security.performance}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alternatives Tab */}
        <TabsContent value="alternatives" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {investmentData.alternatives.map((alternative) => (
              <Card
                key={alternative.id}
                className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border-amber-400/30"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-amber-300 font-serif">{alternative.name}</CardTitle>
                    <Badge className="bg-amber-600/20 text-amber-300 border-amber-400/30">{alternative.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-300">{formatCurrency(alternative.currentValue)}</div>
                    <div className="text-amber-400 text-sm">
                      +{formatCurrency(alternative.currentValue - alternative.investment)} ({alternative.performance}%)
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-amber-400">Portfolio Allocation</span>
                      <span className="text-amber-300">{alternative.allocation}%</span>
                    </div>
                    <Progress value={alternative.allocation} className="h-2" />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600">
                    <Coins className="w-4 h-4 mr-2" />
                    Manage Investment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
              <CardHeader>
                <CardTitle className="text-purple-300 font-serif">Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-purple-800/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-300">
                      {investmentData.portfolio.totalGainPercent}%
                    </div>
                    <div className="text-purple-400/70 text-sm">Total Return</div>
                  </div>
                  <div className="text-center p-3 bg-purple-800/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-300">
                      {investmentData.portfolio.dayChangePercent}%
                    </div>
                    <div className="text-purple-400/70 text-sm">Daily Change</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-purple-300 font-medium">Asset Performance</h4>
                  {investmentData.allocations.map((allocation, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-purple-800/20 rounded-lg">
                      <span className="text-purple-300">{allocation.category}</span>
                      <span className={getPerformanceColor(allocation.performance)}>+{allocation.performance}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-300 font-serif">Risk Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-green-800/20 rounded-lg">
                  <div className="text-3xl font-bold text-green-300">Medium</div>
                  <div className="text-green-400/70 text-sm">Overall Portfolio Risk</div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-green-300 font-medium">Risk Distribution</h4>
                  {investmentData.allocations.map((allocation, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-800/20 rounded-lg">
                      <span className="text-green-300">{allocation.category}</span>
                      <span className={getRiskColor(allocation.risk)}>{allocation.risk}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-green-800/20 rounded-lg border border-green-400/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 font-medium text-sm">Portfolio Protection</span>
                  </div>
                  <p className="text-green-200 text-xs">
                    Your portfolio is protected by Supreme Authority insurance and diversification strategies.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
