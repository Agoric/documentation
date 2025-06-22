"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useFractionalOwnership } from "@/contexts/fractional-ownership-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  PieChart,
  Building2,
  Coins,
  Shield,
  Users,
  Target,
  Award,
  ArrowRight,
  Download,
  RefreshCw,
  Plus,
  Lock,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface OwnershipDashboardProps {
  ownerId: string
  ownerType: "individual" | "institutional"
}

export function OwnershipDashboard({ ownerId, ownerType }: OwnershipDashboardProps) {
  const {
    ownershipPortfolios,
    commoditiesMarkets,
    guaranteedProducts,
    getAvailableProducts,
    checkProductAccess,
    getPortfolioPerformance,
    getCommodityPrices,
    calculateDiversificationScore,
  } = useFractionalOwnership()

  const [selectedTab, setSelectedTab] = useState("portfolio")
  const [isInvesting, setIsInvesting] = useState(false)

  const portfolio = ownershipPortfolios[ownerId]
  const availableProducts = getAvailableProducts(ownerType)
  const portfolioPerformance = getPortfolioPerformance(ownerId)
  const commodityPrices = getCommodityPrices()
  const diversificationScore = calculateDiversificationScore(ownerId)

  const totalROI = portfolio
    ? ((portfolio.currentValue + portfolio.totalProfits - portfolio.totalInvestment) / portfolio.totalInvestment) * 100
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Fractional Ownership Portfolio
            </h1>
            <p className="text-2xl italic font-serif text-amber-300/70 mt-2">
              {ownerType === "individual" ? "Proprietas Fractionalis" : "Proprietas Institutionalis"}
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <Badge
                className={cn(
                  "text-xs",
                  ownerType === "individual"
                    ? "text-blue-400 bg-blue-400/10 border-blue-400/30"
                    : "text-amber-400 bg-amber-400/10 border-amber-400/30",
                )}
              >
                {ownerType.toUpperCase()} ACCESS
              </Badge>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400 text-sm">Portfolio ID: {ownerId}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => setIsInvesting(true)}
              disabled={isInvesting}
              className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              {isInvesting ? "Processing..." : "New Investment"}
            </Button>
            <Button variant="outline" className="border-amber-400/30 text-amber-400">
              <Download className="w-4 h-4 mr-2" />
              Export Portfolio
            </Button>
            <Button variant="outline" className="border-amber-400/30 text-amber-400">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-400/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-400 text-sm flex items-center">
                <PieChart className="w-4 h-4 mr-2" />
                Total Investment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400 mb-1">
                ${portfolio?.totalInvestment.toLocaleString() || "0"}
              </div>
              <div className="text-xs text-gray-400">Across all assets</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-400/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-400 text-sm flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Current Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400 mb-1">
                ${((portfolio?.currentValue || 0) + (portfolio?.totalProfits || 0)).toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">Including profits</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-900/20 to-yellow-900/20 border-amber-400/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-amber-400 text-sm flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Total ROI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-400 mb-1">{totalROI.toFixed(1)}%</div>
              <div className="text-xs text-gray-400">Portfolio return</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-400/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-400 text-sm flex items-center">
                <Award className="w-4 h-4 mr-2" />
                Diversification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400 mb-1">{diversificationScore}%</div>
              <div className="text-xs text-gray-400">Portfolio spread</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 border border-amber-400/20">
            <TabsTrigger
              value="portfolio"
              className="data-[state=active]:bg-blue-400/20 data-[state=active]:text-blue-400"
            >
              My Portfolio
            </TabsTrigger>
            <TabsTrigger
              value="commodities"
              className="data-[state=active]:bg-green-400/20 data-[state=active]:text-green-400"
            >
              Commodities Market
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-400"
            >
              Available Products
            </TabsTrigger>
            <TabsTrigger
              value="guaranteed"
              className="data-[state=active]:bg-purple-400/20 data-[state=active]:text-purple-400"
            >
              Guaranteed Products
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Fractional Ownerships */}
              <Card className="bg-black/20 border-blue-400/20">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center">
                    <Building2 className="w-5 h-5 mr-2" />
                    Fractional Ownerships
                  </CardTitle>
                  <CardDescription>Your ownership stakes in various products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolio?.fractionalOwnerships.map((ownership, index) => (
                      <motion.div
                        key={ownership.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="p-4 bg-blue-400/5 rounded-lg border border-blue-400/10"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-blue-400 font-semibold">{ownership.productDetails.name}</h4>
                          <Badge className="text-xs text-blue-400 bg-blue-400/10 border-blue-400/30">
                            {ownership.ownershipPercentage.toFixed(2)}%
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-400">Investment:</span>
                            <span className="text-blue-400 ml-2">${ownership.initialInvestment.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Current Value:</span>
                            <span className="text-blue-400 ml-2">${ownership.currentValue.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Profits Received:</span>
                            <span className="text-green-400 ml-2">
                              ${ownership.totalProfitsReceived.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400">Rights:</span>
                            <div className="flex items-center space-x-1 ml-2">
                              {ownership.votingRights && <Badge className="text-xs">Vote</Badge>}
                              {ownership.managementRights && <Badge className="text-xs">Manage</Badge>}
                              {ownership.transferRights && <Badge className="text-xs">Transfer</Badge>}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )) || (
                      <div className="text-center text-gray-400 py-8">
                        <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No fractional ownerships yet</p>
                        <p className="text-sm">Start investing to build your portfolio</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Commodity Positions */}
              <Card className="bg-black/20 border-green-400/20">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center">
                    <Coins className="w-5 h-5 mr-2" />
                    Commodity Positions
                  </CardTitle>
                  <CardDescription>Your positions in commodities markets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolio?.commodityPositions.map((position, index) => (
                      <motion.div
                        key={position.positionId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="p-4 bg-green-400/5 rounded-lg border border-green-400/10"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-green-400 font-semibold capitalize">
                            {position.commodityType.replace("_", " ")}
                          </h4>
                          <Badge className="text-xs text-green-400 bg-green-400/10 border-green-400/30">
                            {(position.targetROI * 100).toFixed(1)}% Target ROI
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-400">Quantity:</span>
                            <span className="text-green-400 ml-2">{position.quantity.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Avg Cost:</span>
                            <span className="text-green-400 ml-2">${position.averageCost.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Current Value:</span>
                            <span className="text-green-400 ml-2">${position.currentValue.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Maturity:</span>
                            <span className="text-green-400 ml-2">
                              {position.projectedMaturity.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Progress to Minimum Hold (2.5 years)</span>
                            <span>{Math.min(100, (position.holdingPeriod / (2.5 * 365)) * 100).toFixed(0)}%</span>
                          </div>
                          <Progress
                            value={Math.min(100, (position.holdingPeriod / (2.5 * 365)) * 100)}
                            className="h-2"
                          />
                        </div>
                      </motion.div>
                    )) || (
                      <div className="text-center text-gray-400 py-8">
                        <Coins className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No commodity positions yet</p>
                        <p className="text-sm">Enter the commodities market for 5-25% ROI</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Portfolio Performance */}
            <Card className="bg-black/20 border-purple-400/20">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Portfolio Performance
                </CardTitle>
                <CardDescription>Comprehensive performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {(portfolioPerformance.totalReturn * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-400">Total Return</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {(portfolioPerformance.annualizedReturn * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-400">Annualized Return</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {portfolioPerformance.sharpeRatio.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-400">Sharpe Ratio</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{diversificationScore}%</div>
                    <div className="text-xs text-gray-400">Diversification</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commodities" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(commoditiesMarkets).map(([key, market]) => (
                <Card key={key} className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-400/20">
                  <CardHeader>
                    <CardTitle className="text-green-400 capitalize flex items-center">
                      <Coins className="w-5 h-5 mr-2" />
                      {market.commodityType.replace("_", " ")}
                    </CardTitle>
                    <CardDescription>
                      {market.guaranteedROI.minROI * 100}% - {market.guaranteedROI.maxROI * 100}% ROI over{" "}
                      {market.guaranteedROI.minimumHoldingPeriod} years
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Current Price</span>
                        <span className="text-green-400 font-semibold">${market.currentPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Market Cap</span>
                        <span className="text-green-400 font-semibold">
                          ${(market.marketCapitalization / 1000000000).toFixed(1)}B
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Active Participants</span>
                        <span className="text-green-400 font-semibold">
                          {market.activeParticipants.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Average ROI</span>
                        <span className="text-green-400 font-semibold">{(market.averageROI * 100).toFixed(1)}%</span>
                      </div>

                      <Separator className="bg-green-400/20" />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-green-400" />
                          <span className="text-xs text-gray-400">Both Individual & Institutional</span>
                        </div>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Plus className="w-3 h-3 mr-1" />
                          Invest
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Commodities Info */}
            <Card className="bg-black/20 border-amber-400/20">
              <CardHeader>
                <CardTitle className="text-amber-400 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Commodities Market Overview
                </CardTitle>
                <CardDescription>
                  The only market where both individual and institutional participants can invest together
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-400 mb-2">5% - 25%</div>
                    <div className="text-gray-400">Guaranteed ROI Range</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-400 mb-2">2.5+</div>
                    <div className="text-gray-400">Minimum Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-400 mb-2">100%</div>
                    <div className="text-gray-400">Open Access</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableProducts.map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-400/20 h-full">
                    <CardHeader>
                      <CardTitle className="text-blue-400">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Value</span>
                        <span className="text-blue-400 font-semibold">
                          ${(product.totalValue / 1000000).toFixed(0)}M
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Available Shares</span>
                        <span className="text-blue-400 font-semibold">{product.availableShares.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Min Investment</span>
                        <span className="text-blue-400 font-semibold">
                          ${product.minimumInvestment.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Expected ROI</span>
                        <span className="text-green-400 font-semibold">
                          {(product.expectedROI.min * 100).toFixed(0)}% - {(product.expectedROI.max * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Risk Level</span>
                        <Badge
                          className={cn(
                            "text-xs",
                            product.riskLevel === "low" && "text-green-400 bg-green-400/10 border-green-400/30",
                            product.riskLevel === "medium" && "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
                            product.riskLevel === "high" && "text-red-400 bg-red-400/10 border-red-400/30",
                          )}
                        >
                          {product.riskLevel.toUpperCase()}
                        </Badge>
                      </div>

                      <Separator className="bg-blue-400/20" />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span className="text-xs text-gray-400">{product.totalOwners.toLocaleString()} owners</span>
                        </div>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Plus className="w-3 h-3 mr-1" />
                          Invest
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guaranteed" className="space-y-6">
            {ownerType === "institutional" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guaranteedProducts.map((product, index) => (
                  <motion.div
                    key={product.productId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-amber-900/20 to-yellow-900/20 border-amber-400/20">
                      <CardHeader>
                        <CardTitle className="text-amber-400 flex items-center">
                          <Shield className="w-5 h-5 mr-2" />
                          {product.productName}
                        </CardTitle>
                        <CardDescription>Institutional-only guaranteed product</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Guaranteed Returns</span>
                          <span className="text-amber-400 font-semibold">
                            {(product.guaranteedReturns * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Minimum Investment</span>
                          <span className="text-amber-400 font-semibold">
                            ${product.minimumInvestment.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Product Type</span>
                          <Badge className="text-xs text-amber-400 bg-amber-400/10 border-amber-400/30">
                            {product.guaranteeType.toUpperCase()}
                          </Badge>
                        </div>

                        <Separator className="bg-amber-400/20" />

                        <div>
                          <h5 className="text-amber-400 font-semibold mb-2">Requirements</h5>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Min Assets:</span>
                              <span className="text-amber-400">
                                ${(product.institutionalRequirements.minimumAssets / 1000000).toFixed(0)}M
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Min Revenue:</span>
                              <span className="text-amber-400">
                                ${(product.institutionalRequirements.minimumRevenue / 1000000).toFixed(0)}M
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Credit Rating:</span>
                              <span className="text-amber-400">{product.institutionalRequirements.creditRating}+</span>
                            </div>
                          </div>
                        </div>

                        <Button className="w-full bg-amber-600 hover:bg-amber-700">
                          <Shield className="w-4 h-4 mr-2" />
                          Apply for Access
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="bg-black/20 border-red-400/20">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center">
                    <Lock className="w-5 h-5 mr-2" />
                    Institutional Access Required
                  </CardTitle>
                  <CardDescription>
                    Guaranteed products are exclusively available to institutional investors
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <Lock className="w-16 h-16 mx-auto mb-4 text-red-400 opacity-50" />
                  <h3 className="text-xl font-semibold text-red-400 mb-2">Access Restricted</h3>
                  <p className="text-gray-400 mb-4">
                    All guaranteed products require institutional-level access with minimum asset and revenue
                    requirements.
                  </p>
                  <p className="text-gray-400 mb-6">
                    Individual global citizens can access fractional ownership products and the commodities market.
                  </p>
                  <Button variant="outline" className="border-amber-400/30 text-amber-400">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Explore Available Products
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
