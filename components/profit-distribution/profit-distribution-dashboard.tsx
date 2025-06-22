"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useProfitDistribution } from "@/contexts/profit-distribution-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  PieChart,
  Building2,
  Heart,
  GraduationCap,
  Hammer,
  Droplets,
  Calendar,
  Target,
  Award,
  Clock,
  ArrowRight,
  Download,
  RefreshCw,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function ProfitDistributionDashboard() {
  const {
    distributionSummary,
    iBankTrustAccounts,
    longTermBonds,
    infrastructureEducationFund,
    getSocialImpactMetrics,
    getBondMaturitySchedule,
    getSocialProgramFunding,
    calculateTotalImpact,
    getProjectedImpact,
    distributeProfit,
  } = useProfitDistribution()

  const [selectedTimeframe, setSelectedTimeframe] = useState("ytd")
  const [isDistributing, setIsDistributing] = useState(false)

  const socialImpactMetrics = getSocialImpactMetrics()
  const totalImpact = calculateTotalImpact()
  const projectedImpact = getProjectedImpact(10)
  const bondSchedule = getBondMaturitySchedule()
  const socialProgramFunding = getSocialProgramFunding()

  const handleDistributeProfit = async (amount: number, source: string) => {
    setIsDistributing(true)
    try {
      await distributeProfit(amount, source)
    } catch (error) {
      console.error("Distribution failed:", error)
    } finally {
      setIsDistributing(false)
    }
  }

  const distributionBreakdown = [
    {
      name: "Social Impact QGI",
      value: distributionSummary.cumulativeDistributions.socialImpactQGI.totalContributed,
      percentage: 33.33,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/20",
      icon: Heart,
      description: "Direct social impact funding",
    },
    {
      name: "iBank&Trust",
      value: distributionSummary.cumulativeDistributions.iBankTrust.currentBalance,
      percentage: 33.33,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20",
      icon: Building2,
      description: "Institutional banking reserves",
    },
    {
      name: "50yr Bonds",
      value: distributionSummary.cumulativeDistributions.longTermBonds.totalInvested,
      percentage: 33.34,
      color: "text-amber-400",
      bgColor: "bg-amber-400/10",
      borderColor: "border-amber-400/20",
      icon: TrendingUp,
      description: "Long-term infrastructure bonds",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Profit Distribution Dashboard
            </h1>
            <p className="text-2xl italic font-serif text-amber-300/70 mt-2">Distributio Lucri Systematis</p>
            <p className="text-gray-400 mt-2">
              Comprehensive profit allocation across Social Impact, iBank&Trust, and Long-term Infrastructure Bonds
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => handleDistributeProfit(100000, "marketplace_fees")}
              disabled={isDistributing}
              className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              {isDistributing ? "Distributing..." : "Distribute Profit"}
            </Button>
            <Button variant="outline" className="border-amber-400/30 text-amber-400">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" className="border-amber-400/30 text-amber-400">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-400/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-400 text-sm flex items-center">
                <PieChart className="w-4 h-4 mr-2" />
                Total Distributed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400 mb-1">
                ${distributionSummary.totalProfitsDistributed.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">All-time profit distribution</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-400/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-400 text-sm flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                Social Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {socialImpactMetrics.totalBeneficiaries.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">Beneficiaries reached</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-400/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-400 text-sm flex items-center">
                <Building2 className="w-4 h-4 mr-2" />
                iBank&Trust
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400 mb-1">
                ${totalImpact.iBankTrustTotal.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">Total reserves</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-900/20 to-yellow-900/20 border-amber-400/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-amber-400 text-sm flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Bond Maturity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-400 mb-1">
                {distributionSummary.cumulativeDistributions.longTermBonds.yearsToFirstMaturity.toFixed(0)}
              </div>
              <div className="text-xs text-gray-400">Years to first maturity</div>
            </CardContent>
          </Card>
        </div>

        {/* Distribution Breakdown */}
        <Card className="bg-black/20 border-amber-400/20">
          <CardHeader>
            <CardTitle className="text-amber-400 flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              Profit Distribution Breakdown
            </CardTitle>
            <CardDescription>1/3 allocation across three strategic channels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {distributionBreakdown.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className={cn("h-full", item.bgColor, item.borderColor)}>
                      <CardHeader className="text-center">
                        <div className={cn("mx-auto mb-3 p-3 rounded-full w-fit", item.bgColor)}>
                          <Icon className={cn("w-6 h-6", item.color)} />
                        </div>
                        <CardTitle className={cn("text-lg", item.color)}>{item.name}</CardTitle>
                        <CardDescription className="text-gray-400">{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className={cn("text-3xl font-bold mb-2", item.color)}>{item.percentage}%</div>
                        <div className={cn("text-xl font-semibold mb-3", item.color)}>
                          ${item.value.toLocaleString()}
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Tabs */}
        <Tabs defaultValue="social-impact" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 border border-amber-400/20">
            <TabsTrigger
              value="social-impact"
              className="data-[state=active]:bg-blue-400/20 data-[state=active]:text-blue-400"
            >
              Social Impact
            </TabsTrigger>
            <TabsTrigger
              value="ibank-trust"
              className="data-[state=active]:bg-green-400/20 data-[state=active]:text-green-400"
            >
              iBank&Trust
            </TabsTrigger>
            <TabsTrigger
              value="long-term-bonds"
              className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-400"
            >
              Long-term Bonds
            </TabsTrigger>
            <TabsTrigger
              value="projections"
              className="data-[state=active]:bg-purple-400/20 data-[state=active]:text-purple-400"
            >
              Projections
            </TabsTrigger>
          </TabsList>

          <TabsContent value="social-impact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-400/20">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Social Impact QGI Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Contributed</span>
                      <span className="text-blue-400 font-semibold">
                        ${socialImpactMetrics.totalContributed.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Beneficiaries Reached</span>
                      <span className="text-blue-400 font-semibold">
                        {socialImpactMetrics.totalBeneficiaries.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Projects Funded</span>
                      <span className="text-blue-400 font-semibold">
                        {socialImpactMetrics.totalProjects.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Average Impact Score</span>
                      <span className="text-blue-400 font-semibold">
                        {socialImpactMetrics.averageImpactScore.toFixed(1)}/10
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-blue-400/20">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Allocation Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Direct Impact (60%)</span>
                        <span className="text-blue-400">
                          ${(socialImpactMetrics.totalContributed * 0.6).toLocaleString()}
                        </span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Program Development (25%)</span>
                        <span className="text-blue-400">
                          ${(socialImpactMetrics.totalContributed * 0.25).toLocaleString()}
                        </span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Administration (15%)</span>
                        <span className="text-blue-400">
                          ${(socialImpactMetrics.totalContributed * 0.15).toLocaleString()}
                        </span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ibank-trust" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {Object.entries(iBankTrustAccounts).map(([accountType, account]) => (
                <Card
                  key={accountType}
                  className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-400/20"
                >
                  <CardHeader>
                    <CardTitle className="text-green-400 flex items-center">
                      <Building2 className="w-5 h-5 mr-2" />
                      {accountType.replace("_", " ").toUpperCase()}
                    </CardTitle>
                    <CardDescription>Account ID: {account.accountId}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Balance</span>
                        <span className="text-green-400 font-semibold">${account.balance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Interest Rate</span>
                        <span className="text-green-400 font-semibold">{(account.interestRate * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Compounding</span>
                        <span className="text-green-400 font-semibold">{account.compoundingFrequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Updated</span>
                        <span className="text-green-400 font-semibold">{account.lastUpdated.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="long-term-bonds" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-amber-900/20 to-yellow-900/20 border-amber-400/20">
                <CardHeader>
                  <CardTitle className="text-amber-400 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Bond Portfolio Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Invested</span>
                      <span className="text-amber-400 font-semibold">
                        ${distributionSummary.cumulativeDistributions.longTermBonds.totalInvested.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Active Bonds</span>
                      <span className="text-amber-400 font-semibold">
                        {distributionSummary.cumulativeDistributions.longTermBonds.bondsActive}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Estimated Maturity Value</span>
                      <span className="text-amber-400 font-semibold">
                        $
                        {distributionSummary.cumulativeDistributions.longTermBonds.estimatedMaturityValue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Years to First Maturity</span>
                      <span className="text-amber-400 font-semibold">
                        {distributionSummary.cumulativeDistributions.longTermBonds.yearsToFirstMaturity.toFixed(0)}{" "}
                        years
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-amber-400/20">
                <CardHeader>
                  <CardTitle className="text-amber-400 flex items-center">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Maturity Distribution Plan
                  </CardTitle>
                  <CardDescription>50-year bond maturity allocation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Infrastructure, Education & Aid (50%)</span>
                        <span className="text-amber-400">
                          $
                          {(
                            distributionSummary.cumulativeDistributions.longTermBonds.estimatedMaturityValue * 0.5
                          ).toLocaleString()}
                        </span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">iBank&Trust Transfer (50%)</span>
                        <span className="text-amber-400">
                          $
                          {(
                            distributionSummary.cumulativeDistributions.longTermBonds.estimatedMaturityValue * 0.5
                          ).toLocaleString()}
                        </span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                  </div>

                  <Separator className="bg-amber-400/20 my-4" />

                  <div className="space-y-3">
                    <h5 className="text-amber-400 font-semibold">Social Program Allocation (50% breakdown)</h5>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center">
                        <div className="text-amber-400 font-semibold">33.33%</div>
                        <div className="text-gray-400">Infrastructure</div>
                      </div>
                      <div className="text-center">
                        <div className="text-amber-400 font-semibold">33.33%</div>
                        <div className="text-gray-400">Education</div>
                      </div>
                      <div className="text-center">
                        <div className="text-amber-400 font-semibold">33.34%</div>
                        <div className="text-gray-400">Essential Aid</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Infrastructure/Education Fund Details */}
            <Card className="bg-black/20 border-purple-400/20">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Infrastructure, Education & Essential Aid Fund
                </CardTitle>
                <CardDescription>Current funding and active programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-purple-400 font-semibold">
                      <Hammer className="w-4 h-4 mr-2" />
                      Infrastructure
                    </div>
                    <div className="text-2xl font-bold text-purple-400">
                      ${infrastructureEducationFund.allocationBreakdown.infrastructure.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">
                      {infrastructureEducationFund.allocationBreakdown.infrastructure.projects.length} active projects
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-purple-400 font-semibold">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Education
                    </div>
                    <div className="text-2xl font-bold text-purple-400">
                      ${infrastructureEducationFund.allocationBreakdown.education.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">
                      {infrastructureEducationFund.allocationBreakdown.education.programs.length} active programs
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-purple-400 font-semibold">
                      <Droplets className="w-4 h-4 mr-2" />
                      Essential Aid
                    </div>
                    <div className="text-2xl font-bold text-purple-400">
                      ${infrastructureEducationFund.allocationBreakdown.essentialAid.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">
                      {infrastructureEducationFund.allocationBreakdown.essentialAid.initiatives.length} active
                      initiatives
                    </div>
                  </div>
                </div>

                <Separator className="bg-purple-400/20 my-6" />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-400">
                      {infrastructureEducationFund.performanceMetrics.totalBeneficiaries.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">Total Beneficiaries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-400">
                      {infrastructureEducationFund.performanceMetrics.projectsCompleted}
                    </div>
                    <div className="text-xs text-gray-400">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-400">
                      {infrastructureEducationFund.performanceMetrics.ongoingProjects}
                    </div>
                    <div className="text-xs text-gray-400">Ongoing Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-400">
                      {infrastructureEducationFund.performanceMetrics.impactScore.toFixed(1)}/10
                    </div>
                    <div className="text-xs text-gray-400">Impact Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projections" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-400/20">
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    10-Year Projections
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Projected Profit</span>
                      <span className="text-purple-400 font-semibold">
                        ${projectedImpact.totalProjectedProfit.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Social Impact Funding</span>
                      <span className="text-purple-400 font-semibold">
                        ${projectedImpact.socialImpactProjection.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">iBank&Trust Growth</span>
                      <span className="text-purple-400 font-semibold">
                        ${projectedImpact.iBankTrustProjection.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Long-term Bond Investment</span>
                      <span className="text-purple-400 font-semibold">
                        ${projectedImpact.longTermBondProjection.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Estimated Beneficiaries</span>
                      <span className="text-purple-400 font-semibold">
                        {projectedImpact.estimatedBeneficiaries.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-purple-400/20">
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Bond Maturity Impact
                  </CardTitle>
                  <CardDescription>50-year bond maturity projections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Maturity Proceeds</span>
                      <span className="text-purple-400 font-semibold">
                        ${distributionSummary.projectedImpact.bondMaturityImpact.totalMaturityProceeds.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Social Program Funding</span>
                      <span className="text-purple-400 font-semibold">
                        ${distributionSummary.projectedImpact.bondMaturityImpact.socialProgramFunding.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">iBank&Trust Addition</span>
                      <span className="text-purple-400 font-semibold">
                        ${distributionSummary.projectedImpact.bondMaturityImpact.iBankTrustAddition.toLocaleString()}
                      </span>
                    </div>

                    <Separator className="bg-purple-400/20" />

                    <div className="space-y-3">
                      <h5 className="text-purple-400 font-semibold">Next 10 Years Impact</h5>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-purple-400 font-semibold">
                            ${distributionSummary.projectedImpact.next10Years.socialImpactFunding.toLocaleString()}
                          </div>
                          <div className="text-gray-400">Social Impact</div>
                        </div>
                        <div>
                          <div className="text-purple-400 font-semibold">
                            ${distributionSummary.projectedImpact.next10Years.infrastructureInvestment.toLocaleString()}
                          </div>
                          <div className="text-gray-400">Infrastructure</div>
                        </div>
                        <div>
                          <div className="text-purple-400 font-semibold">
                            ${distributionSummary.projectedImpact.next10Years.educationFunding.toLocaleString()}
                          </div>
                          <div className="text-gray-400">Education</div>
                        </div>
                        <div>
                          <div className="text-purple-400 font-semibold">
                            ${distributionSummary.projectedImpact.next10Years.essentialAidProvision.toLocaleString()}
                          </div>
                          <div className="text-gray-400">Essential Aid</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bond Maturity Schedule */}
            <Card className="bg-black/20 border-amber-400/20">
              <CardHeader>
                <CardTitle className="text-amber-400 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Bond Maturity Schedule
                </CardTitle>
                <CardDescription>Upcoming bond maturities and distribution timeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bondSchedule.slice(0, 5).map((bond, index) => (
                    <div
                      key={bond.bondId}
                      className="flex items-center justify-between p-4 bg-amber-400/5 rounded-lg border border-amber-400/10"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-amber-400/20 rounded-full flex items-center justify-center">
                          <span className="text-amber-400 font-semibold text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <div className="text-amber-400 font-semibold">Bond {bond.bondId}</div>
                          <div className="text-gray-400 text-sm">
                            Maturity: {bond.maturityDate.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-amber-400 font-semibold">
                          ${bond.maturityDistribution.totalMaturityValue.toLocaleString()}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {((bond.maturityDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365)).toFixed(
                            0,
                          )}{" "}
                          years
                        </div>
                      </div>
                    </div>
                  ))}
                  {bondSchedule.length > 5 && (
                    <div className="text-center text-gray-400 text-sm">
                      +{bondSchedule.length - 5} more bonds in schedule
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
