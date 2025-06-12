"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sparkles,
  Building,
  Home,
  Clock,
  Users,
  Layers,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUpRight,
  Plus,
  Shield,
  Zap,
} from "lucide-react"

// Sample tokenized assets data
const tokenizedAssets = [
  {
    id: "asset1",
    name: "Premium Commercial Real Estate",
    icon: <Building className="h-4 w-4 text-blue-400" />,
    type: "Real Estate",
    totalValue: "$12,500,000",
    tokenPrice: "$5,000",
    availableTokens: 250,
    soldTokens: 2250,
    apy: "8.5%",
    term: "5 years",
    progress: 90,
    investors: 185,
    location: "Multiple US Cities",
    description: "Fractional ownership in a portfolio of premium commercial properties in high-growth urban centers.",
    lastDistribution: "2023-11-01",
    nextDistribution: "2023-12-01",
    distributionAmount: "$106.25",
    performance: [
      { month: "Jun", value: 8.2 },
      { month: "Jul", value: 8.3 },
      { month: "Aug", value: 8.4 },
      { month: "Sep", value: 8.5 },
      { month: "Oct", value: 8.6 },
      { month: "Nov", value: 8.5 },
    ],
  },
  {
    id: "asset2",
    name: "Residential Property Portfolio",
    icon: <Home className="h-4 w-4 text-green-400" />,
    type: "Real Estate",
    totalValue: "$8,000,000",
    tokenPrice: "$2,500",
    availableTokens: 320,
    soldTokens: 2880,
    apy: "7.2%",
    term: "4 years",
    progress: 90,
    investors: 210,
    location: "Nationwide",
    description:
      "Diversified portfolio of residential rental properties in high-demand metropolitan areas with strong rental yields.",
    lastDistribution: "2023-11-01",
    nextDistribution: "2023-12-01",
    distributionAmount: "$45.00",
    performance: [
      { month: "Jun", value: 7.0 },
      { month: "Jul", value: 7.1 },
      { month: "Aug", value: 7.2 },
      { month: "Sep", value: 7.2 },
      { month: "Oct", value: 7.3 },
      { month: "Nov", value: 7.2 },
    ],
  },
  {
    id: "asset3",
    name: "Green Energy Infrastructure",
    icon: <Zap className="h-4 w-4 text-amber-400" />,
    type: "Infrastructure",
    totalValue: "$15,000,000",
    tokenPrice: "$1,000",
    availableTokens: 1500,
    soldTokens: 13500,
    apy: "9.1%",
    term: "7 years",
    progress: 90,
    investors: 425,
    location: "Multiple Regions",
    description:
      "Investment in renewable energy projects including solar farms, wind energy, and sustainable infrastructure.",
    lastDistribution: "2023-11-01",
    nextDistribution: "2023-12-01",
    distributionAmount: "$22.75",
    performance: [
      { month: "Jun", value: 8.8 },
      { month: "Jul", value: 8.9 },
      { month: "Aug", value: 9.0 },
      { month: "Sep", value: 9.1 },
      { month: "Oct", value: 9.2 },
      { month: "Nov", value: 9.1 },
    ],
  },
  {
    id: "asset4",
    name: "Technology Venture Fund",
    icon: <Sparkles className="h-4 w-4 text-purple-400" />,
    type: "Venture Capital",
    totalValue: "$20,000,000",
    tokenPrice: "$10,000",
    availableTokens: 200,
    soldTokens: 1800,
    apy: "12.5%",
    term: "5 years",
    progress: 90,
    investors: 120,
    location: "Global",
    description:
      "Investment in high-growth technology startups with focus on AI, quantum computing, and blockchain technologies.",
    lastDistribution: "2023-11-01",
    nextDistribution: "2023-12-01",
    distributionAmount: "$312.50",
    performance: [
      { month: "Jun", value: 11.8 },
      { month: "Jul", value: 12.0 },
      { month: "Aug", value: 12.3 },
      { month: "Sep", value: 12.5 },
      { month: "Oct", value: 12.7 },
      { month: "Nov", value: 12.5 },
    ],
  },
]

// Sample user investments
const myInvestments = [
  {
    id: "investment1",
    assetId: "asset1",
    name: "Premium Commercial Real Estate",
    icon: <Building className="h-4 w-4 text-blue-400" />,
    tokens: 3,
    value: "$15,000",
    purchaseDate: "2023-06-15",
    apy: "8.5%",
    monthlyYield: "$106.25",
    nextDistribution: "2023-12-01",
    totalReturns: "$531.25",
  },
  {
    id: "investment2",
    assetId: "asset3",
    name: "Green Energy Infrastructure",
    icon: <Zap className="h-4 w-4 text-amber-400" />,
    tokens: 5,
    value: "$5,000",
    purchaseDate: "2023-08-22",
    apy: "9.1%",
    monthlyYield: "$37.92",
    nextDistribution: "2023-12-01",
    totalReturns: "$113.76",
  },
  {
    id: "investment3",
    assetId: "asset4",
    name: "Technology Venture Fund",
    icon: <Sparkles className="h-4 w-4 text-purple-400" />,
    tokens: 1,
    value: "$10,000",
    purchaseDate: "2023-09-10",
    apy: "12.5%",
    monthlyYield: "$104.17",
    nextDistribution: "2023-12-01",
    totalReturns: "$208.34",
  },
]

export function TokenizationHub() {
  const [activeTab, setActiveTab] = useState("available")
  const [selectedAsset, setSelectedAsset] = useState(tokenizedAssets[0])

  // Calculate total portfolio value and monthly income
  const portfolioValue = myInvestments.reduce((total, investment) => total + investment.value, 0)
  const monthlyIncome = myInvestments.reduce(
    (total, investment) => total + Number.parseFloat(investment.monthlyYield.replace("$", "")),
    0,
  )
  const totalReturns = myInvestments.reduce(
    (total, investment) => total + Number.parseFloat(investment.totalReturns.replace("$", "")),
    0,
  )

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <CardTitle className="text-xl text-indigo-200">Tokenization Hub</CardTitle>
              <CardDescription className="text-indigo-400">Manage tokenized assets and investments</CardDescription>
            </div>
            <Badge className="bg-indigo-500/30 text-indigo-200">
              <Sparkles className="mr-1 h-3 w-3" />
              Quantum Secured
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 border border-indigo-500/20 bg-indigo-950/30 p-1">
              <TabsTrigger
                value="available"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
              >
                Available Assets
              </TabsTrigger>
              <TabsTrigger
                value="portfolio"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
              >
                My Portfolio
              </TabsTrigger>
            </TabsList>

            {/* Available Assets Tab */}
            <TabsContent value="available" className="space-y-6">
              {/* Asset cards */}
              <div className="grid gap-6 md:grid-cols-2">
                {tokenizedAssets.map((asset) => (
                  <Card
                    key={asset.id}
                    className={`overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm transition-all hover:border-indigo-500/40 hover:bg-indigo-950/40 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] ${
                      selectedAsset.id === asset.id ? "border-indigo-500/50 ring-1 ring-indigo-500/50" : ""
                    }`}
                    onClick={() => setSelectedAsset(asset)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20">
                            {asset.icon}
                          </div>
                          <CardTitle className="text-lg text-indigo-200">{asset.name}</CardTitle>
                        </div>
                        <Badge variant="outline" className="border-indigo-500/30 text-indigo-300">
                          {asset.type}
                        </Badge>
                      </div>
                      <CardDescription className="text-indigo-400">{asset.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="text-xs text-indigo-400">Token Price</div>
                          <div className="text-lg font-medium text-indigo-200">{asset.tokenPrice}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-indigo-400">APY</div>
                          <div className="text-lg font-medium text-emerald-400">{asset.apy}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-indigo-400">Term</div>
                          <div className="text-sm font-medium text-indigo-200">{asset.term}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-indigo-400">Total Value</div>
                          <div className="text-sm font-medium text-indigo-200">{asset.totalValue}</div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-indigo-400">Funding Progress</span>
                          <span className="text-indigo-300">{asset.progress}%</span>
                        </div>
                        <Progress
                          value={asset.progress}
                          className="h-2 bg-indigo-950"
                          indicatorClassName="bg-gradient-to-r from-indigo-500 to-purple-500"
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs text-indigo-400">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{asset.investors} investors</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Layers className="h-3 w-3" />
                          <span>{asset.availableTokens} tokens available</span>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Invest Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Selected asset details */}
              <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20">
                      {selectedAsset.icon}
                    </div>
                    <CardTitle className="text-lg text-indigo-200">{selectedAsset.name} Details</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Asset information */}
                    <div className="space-y-4">
                      <div className="rounded-md bg-indigo-950/50 p-4">
                        <h3 className="mb-3 font-medium text-indigo-200">Asset Information</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between border-b border-indigo-500/20 pb-2">
                            <span className="text-sm text-indigo-400">Type</span>
                            <span className="text-sm font-medium text-indigo-200">{selectedAsset.type}</span>
                          </div>
                          <div className="flex justify-between border-b border-indigo-500/20 pb-2">
                            <span className="text-sm text-indigo-400">Location</span>
                            <span className="text-sm font-medium text-indigo-200">{selectedAsset.location}</span>
                          </div>
                          <div className="flex justify-between border-b border-indigo-500/20 pb-2">
                            <span className="text-sm text-indigo-400">Total Value</span>
                            <span className="text-sm font-medium text-indigo-200">{selectedAsset.totalValue}</span>
                          </div>
                          <div className="flex justify-between border-b border-indigo-500/20 pb-2">
                            <span className="text-sm text-indigo-400">Token Price</span>
                            <span className="text-sm font-medium text-indigo-200">{selectedAsset.tokenPrice}</span>
                          </div>
                          <div className="flex justify-between border-b border-indigo-500/20 pb-2">
                            <span className="text-sm text-indigo-400">Available Tokens</span>
                            <span className="text-sm font-medium text-indigo-200">{selectedAsset.availableTokens}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-indigo-400">Total Investors</span>
                            <span className="text-sm font-medium text-indigo-200">{selectedAsset.investors}</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md bg-indigo-950/50 p-4">
                        <h3 className="mb-3 font-medium text-indigo-200">Distribution Schedule</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between border-b border-indigo-500/20 pb-2">
                            <span className="text-sm text-indigo-400">Last Distribution</span>
                            <span className="text-sm font-medium text-indigo-200">
                              {new Date(selectedAsset.lastDistribution).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between border-b border-indigo-500/20 pb-2">
                            <span className="text-sm text-indigo-400">Next Distribution</span>
                            <span className="text-sm font-medium text-indigo-200">
                              {new Date(selectedAsset.nextDistribution).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-indigo-400">Distribution Amount</span>
                            <span className="text-sm font-medium text-emerald-400">
                              {selectedAsset.distributionAmount} per token
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Performance chart */}
                    <div className="space-y-4">
                      <div className="rounded-md bg-indigo-950/50 p-4">
                        <h3 className="mb-3 font-medium text-indigo-200">Performance History</h3>
                        <div className="h-40 rounded-md bg-indigo-950/30 p-4">
                          <div className="flex h-full items-center justify-center text-indigo-400">
                            Performance chart visualization would appear here
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-xs text-indigo-400">
                          {selectedAsset.performance.map((item, index) => (
                            <div key={index} className="text-center">
                              <div>{item.month}</div>
                              <div className="font-medium text-indigo-200">{item.value}%</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-md bg-indigo-950/50 p-4">
                        <h3 className="mb-3 font-medium text-indigo-200">Investment Calculator</h3>
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-md bg-indigo-950/30 p-3">
                              <div className="text-xs text-indigo-400">1 Token</div>
                              <div className="text-lg font-medium text-indigo-200">{selectedAsset.tokenPrice}</div>
                              <div className="text-xs text-emerald-400">
                                {(
                                  (Number.parseFloat(selectedAsset.distributionAmount.replace("$", "")) /
                                    Number.parseFloat(selectedAsset.tokenPrice.replace("$", ""))) *
                                  12 *
                                  100
                                ).toFixed(2)}
                                % Annual Yield
                              </div>
                            </div>
                            <div className="rounded-md bg-indigo-950/30 p-3">
                              <div className="text-xs text-indigo-400">5 Tokens</div>
                              <div className="text-lg font-medium text-indigo-200">
                                ${(Number.parseFloat(selectedAsset.tokenPrice.replace("$", "")) * 5).toLocaleString()}
                              </div>
                              <div className="text-xs text-emerald-400">
                                ${(Number.parseFloat(selectedAsset.distributionAmount.replace("$", "")) * 5).toFixed(2)}
                                /month
                              </div>
                            </div>
                          </div>
                          <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Invest Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Portfolio Tab */}
            <TabsContent value="portfolio" className="space-y-6">
              {/* Portfolio summary */}
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-indigo-200">Portfolio Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">${portfolioValue.toLocaleString()}</div>
                    <div className="mt-1 flex items-center text-sm text-emerald-400">
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                      +8.5% from initial investment
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-indigo-200">Monthly Income</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">${monthlyIncome.toFixed(2)}</div>
                    <div className="mt-1 flex items-center text-sm text-emerald-400">
                      <Clock className="mr-1 h-4 w-4" />
                      Next distribution: Dec 1, 2023
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-indigo-200">Total Returns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white">${totalReturns.toFixed(2)}</div>
                    <div className="mt-1 flex items-center text-sm text-emerald-400">
                      <BarChart3 className="mr-1 h-4 w-4" />
                      Since first investment
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Portfolio allocation chart */}
              <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-indigo-200">Portfolio Allocation</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-3">
                  <div className="flex h-40 items-center justify-center rounded-md bg-indigo-950/50">
                    <div className="text-center text-indigo-400">
                      <PieChart className="mx-auto mb-2 h-8 w-8" />
                      Asset allocation chart
                    </div>
                  </div>
                  <div className="flex h-40 items-center justify-center rounded-md bg-indigo-950/50">
                    <div className="text-center text-indigo-400">
                      <BarChart3 className="mx-auto mb-2 h-8 w-8" />
                      Monthly income chart
                    </div>
                  </div>
                  <div className="flex h-40 items-center justify-center rounded-md bg-indigo-950/50">
                    <div className="text-center text-indigo-400">
                      <LineChart className="mx-auto mb-2 h-8 w-8" />
                      Performance history
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* My investments */}
              <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-indigo-200">My Investments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {myInvestments.map((investment) => (
                    <div
                      key={investment.id}
                      className="rounded-md border border-indigo-500/20 bg-indigo-950/50 p-4 transition-all hover:border-indigo-500/40 hover:bg-indigo-950/40"
                    >
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20">
                            {investment.icon}
                          </div>
                          <div>
                            <div className="font-medium text-indigo-200">{investment.name}</div>
                            <div className="text-xs text-indigo-400">
                              Purchased: {new Date(investment.purchaseDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                          <div>
                            <div className="text-xs text-indigo-400">Tokens</div>
                            <div className="font-medium text-indigo-200">{investment.tokens}</div>
                          </div>
                          <div>
                            <div className="text-xs text-indigo-400">Value</div>
                            <div className="font-medium text-indigo-200">{investment.value}</div>
                          </div>
                          <div>
                            <div className="text-xs text-indigo-400">APY</div>
                            <div className="font-medium text-emerald-400">{investment.apy}</div>
                          </div>
                          <div>
                            <div className="text-xs text-indigo-400">Monthly</div>
                            <div className="font-medium text-emerald-400">{investment.monthlyYield}</div>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
                        >
                          <Sparkles className="mr-2 h-4 w-4" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Investment
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Tokenization benefits */}
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Fractional Ownership",
            description: "Access premium assets with lower capital requirements",
            icon: <Layers className="h-5 w-5 text-indigo-400" />,
          },
          {
            title: "Quantum Security",
            description: "Advanced encryption protects all tokenized assets",
            icon: <Shield className="h-5 w-5 text-indigo-400" />,
          },
          {
            title: "Instant Liquidity",
            description: "Trade tokens on the SNAP-DAX marketplace anytime",
            icon: <Zap className="h-5 w-5 text-indigo-400" />,
          },
        ].map((benefit, index) => (
          <Card
            key={index}
            className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm transition-all hover:border-indigo-500/40 hover:bg-indigo-950/40 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20">
                  {benefit.icon}
                </div>
                <CardTitle className="text-lg text-indigo-200">{benefit.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-indigo-400">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
