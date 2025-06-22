"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CreditCard,
  TrendingUp,
  Target,
  Zap,
  Shield,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
} from "lucide-react"

const creditData = {
  snapScore: {
    current: 847,
    target: 850,
    change: +23,
    trend: "up",
    factors: [
      { name: "QGI Investment Performance", impact: 35, status: "excellent" },
      { name: "Payment History", impact: 30, status: "excellent" },
      { name: "Credit Utilization", impact: 20, status: "good" },
      { name: "Account Age", impact: 10, status: "good" },
      { name: "Credit Mix", impact: 5, status: "fair" },
    ],
  },
  traditionalScores: [
    { bureau: "FICO 8", score: 798, change: +12, max: 850 },
    { bureau: "VantageScore 4.0", score: 785, change: +8, max: 850 },
    { bureau: "Experian PLUS", score: 802, change: +15, max: 850 },
    { bureau: "Equifax", score: 791, change: +9, max: 850 },
    { bureau: "TransUnion", score: 788, change: +11, max: 850 },
  ],
  businessScores: [
    { bureau: "Business Snap Score", score: 792, change: +18, max: 850 },
    { bureau: "D&B PAYDEX", score: 76, change: +4, max: 100 },
    { bureau: "Experian Business", score: 85, change: +7, max: 100 },
  ],
  creditLines: [
    {
      id: "qgi_replacement",
      name: "QGI Credit Line Replacement",
      limit: 250000,
      available: 250000,
      utilization: 0,
      type: "QGI Secured",
      status: "active",
      benefits: ["No traditional credit required", "Supreme Authority backing", "Unlimited growth potential"],
    },
    {
      id: "business_line",
      name: "Business Credit Line",
      limit: 500000,
      available: 425000,
      utilization: 15,
      type: "Business LOC",
      status: "active",
      benefits: ["Low interest rates", "Flexible terms", "Authority-level privileges"],
    },
    {
      id: "personal_premium",
      name: "Personal Premium Card",
      limit: 100000,
      available: 95000,
      utilization: 5,
      type: "Premium Card",
      status: "active",
      benefits: ["Exclusive rewards", "Concierge service", "Global acceptance"],
    },
  ],
  accelerationPrograms: [
    {
      id: "tier_3",
      name: "Credit Acceleration Tier III",
      description: "Maximum credit optimization with guaranteed results",
      features: [
        "Credit score acceleration up to 300 points",
        "Payment protection for 36 months",
        "Guaranteed home financing approval",
        "Comprehensive life & disability coverage",
        "Wealth management services",
      ],
      cost: 15000,
      duration: "36 months",
      guarantee: "300 point increase or money back",
      status: "active",
    },
    {
      id: "business_tier",
      name: "Business Credit Acceleration",
      description: "Rapid business credit establishment and growth",
      features: [
        "Business credit score optimization",
        "Trade line establishment",
        "Vendor credit relationships",
        "Commercial financing access",
        "Business insurance coverage",
      ],
      cost: 25000,
      duration: "24 months",
      guarantee: "Business credit establishment",
      status: "available",
    },
  ],
}

export function ComprehensiveCreditSuite() {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  const getScoreColor = (score: number, max = 850) => {
    const percentage = (score / max) * 100
    if (percentage >= 80) return "text-green-400"
    if (percentage >= 70) return "text-yellow-400"
    return "text-red-400"
  }

  const getUtilizationColor = (utilization: number) => {
    if (utilization <= 10) return "text-green-400"
    if (utilization <= 30) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent font-serif">
          Supreme Credit Suite
        </h1>
        <p className="text-xl text-blue-300/80 italic font-serif">Advanced Credit Management & Optimization</p>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="scores">Credit Scores</TabsTrigger>
          <TabsTrigger value="lines">Credit Lines</TabsTrigger>
          <TabsTrigger value="acceleration">Acceleration</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Snap Score Highlight */}
            <Card className="lg:col-span-2 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
              <CardHeader>
                <CardTitle className="text-purple-300 font-serif flex items-center">
                  <Zap className="w-6 h-6 mr-2" />
                  Snap Score - Proprietary Credit Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-8xl font-bold text-purple-300 mb-2">{creditData.snapScore.current}</div>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-semibold text-lg">
                      +{creditData.snapScore.change} this month
                    </span>
                  </div>
                  <Progress value={(creditData.snapScore.current / 850) * 100} className="h-3 mb-4" />
                  <div className="text-purple-400">
                    {Math.round(
                      ((creditData.snapScore.target - creditData.snapScore.current) / creditData.snapScore.target) *
                        100,
                    )}
                    % to target
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-purple-300 font-semibold">Score Factors</h4>
                  {creditData.snapScore.factors.map((factor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-purple-800/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            factor.status === "excellent"
                              ? "bg-green-400"
                              : factor.status === "good"
                                ? "bg-yellow-400"
                                : "bg-red-400"
                          }`}
                        />
                        <span className="text-purple-200 text-sm">{factor.name}</span>
                      </div>
                      <div className="text-purple-300 font-semibold">{factor.impact}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="space-y-4">
              <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-8 h-8 text-green-400" />
                    <div>
                      <div className="text-green-300 font-bold text-xl">
                        ${creditData.creditLines.reduce((sum, line) => sum + line.available, 0).toLocaleString()}
                      </div>
                      <div className="text-green-400/70 text-sm">Available Credit</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Target className="w-8 h-8 text-blue-400" />
                    <div>
                      <div className="text-blue-300 font-bold text-xl">
                        {Math.round(
                          (creditData.creditLines.reduce(
                            (sum, line) => sum + (line.utilization * line.limit) / 100,
                            0,
                          ) /
                            creditData.creditLines.reduce((sum, line) => sum + line.limit, 0)) *
                            100,
                        )}
                        %
                      </div>
                      <div className="text-blue-400/70 text-sm">Overall Utilization</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border-amber-400/30">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Award className="w-8 h-8 text-amber-400" />
                    <div>
                      <div className="text-amber-300 font-bold text-xl">Tier III</div>
                      <div className="text-amber-400/70 text-sm">Acceleration Level</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Credit Lines Overview */}
          <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
            <CardHeader>
              <CardTitle className="text-slate-300 font-serif">Active Credit Lines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {creditData.creditLines.map((line) => (
                  <div key={line.id} className="p-4 bg-slate-800/30 rounded-lg border border-slate-600/30">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-slate-300 font-medium text-sm">{line.name}</h4>
                      <Badge className="bg-green-600/20 text-green-300 border-green-400/30">
                        {line.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Available</span>
                        <span className="text-slate-300 font-semibold">${line.available.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Limit</span>
                        <span className="text-slate-300">${line.limit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Utilization</span>
                        <span className={getUtilizationColor(line.utilization)}>{line.utilization}%</span>
                      </div>
                      <Progress value={line.utilization} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Credit Scores Tab */}
        <TabsContent value="scores" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Traditional Scores */}
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
              <CardHeader>
                <CardTitle className="text-blue-300 font-serif">Traditional Credit Scores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {creditData.traditionalScores.map((score, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-800/20 rounded-lg">
                    <div>
                      <div className="text-blue-300 font-medium">{score.bureau}</div>
                      <div className="text-blue-400/70 text-sm">Max: {score.max}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(score.score, score.max)}`}>{score.score}</div>
                      <div className="flex items-center space-x-1">
                        {score.change >= 0 ? (
                          <ArrowUpRight className="w-3 h-3 text-green-400" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 text-red-400" />
                        )}
                        <span className={`text-xs ${score.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {score.change >= 0 ? "+" : ""}
                          {score.change}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Business Scores */}
            <Card className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border-amber-400/30">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif">Business Credit Scores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {creditData.businessScores.map((score, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-amber-800/20 rounded-lg">
                    <div>
                      <div className="text-amber-300 font-medium">{score.bureau}</div>
                      <div className="text-amber-400/70 text-sm">Max: {score.max}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(score.score, score.max)}`}>{score.score}</div>
                      <div className="flex items-center space-x-1">
                        {score.change >= 0 ? (
                          <ArrowUpRight className="w-3 h-3 text-green-400" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 text-red-400" />
                        )}
                        <span className={`text-xs ${score.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {score.change >= 0 ? "+" : ""}
                          {score.change}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-6 p-4 bg-gradient-to-r from-purple-800/30 to-pink-800/30 rounded-lg border border-purple-400/30">
                  <h4 className="text-purple-300 font-medium mb-2">Business Credit Benefits</h4>
                  <ul className="space-y-1 text-sm text-purple-200">
                    <li>• Separate from personal credit</li>
                    <li>• Higher credit limits available</li>
                    <li>• Better financing terms</li>
                    <li>• Business credit building</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Credit Lines Tab */}
        <TabsContent value="lines" className="space-y-6">
          <div className="space-y-6">
            {creditData.creditLines.map((line) => (
              <Card key={line.id} className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-300 font-serif">{line.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-blue-600/20 text-blue-300 border-blue-400/30">{line.type}</Badge>
                      <Badge className="bg-green-600/20 text-green-300 border-green-400/30">
                        {line.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                          <div className="text-2xl font-bold text-slate-300">${line.limit.toLocaleString()}</div>
                          <div className="text-sm text-gray-400">Credit Limit</div>
                        </div>
                        <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                          <div className="text-2xl font-bold text-green-300">${line.available.toLocaleString()}</div>
                          <div className="text-sm text-gray-400">Available</div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Utilization</span>
                          <span className={getUtilizationColor(line.utilization)}>{line.utilization}%</span>
                        </div>
                        <Progress value={line.utilization} className="h-3" />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-slate-300 font-medium mb-3">Benefits & Features</h4>
                      <ul className="space-y-2">
                        {line.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm text-slate-400">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>{benefit}</span>
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

        {/* Acceleration Tab */}
        <TabsContent value="acceleration" className="space-y-6">
          <div className="space-y-6">
            {creditData.accelerationPrograms.map((program) => (
              <Card
                key={program.id}
                className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-purple-300 font-serif">{program.name}</CardTitle>
                      <p className="text-purple-400/70 text-sm mt-1">{program.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-300">${program.cost.toLocaleString()}</div>
                      <div className="text-sm text-purple-400">{program.duration}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-purple-300 font-medium mb-3">Program Features</h4>
                      <ul className="space-y-2">
                        {program.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm text-purple-200">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-purple-800/20 rounded-lg border border-purple-400/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <Shield className="w-5 h-5 text-green-400" />
                          <span className="text-purple-300 font-medium">Guarantee</span>
                        </div>
                        <p className="text-purple-200 text-sm">{program.guarantee}</p>
                      </div>

                      <Button
                        className={`w-full ${
                          program.status === "active"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        }`}
                        disabled={program.status === "active"}
                      >
                        {program.status === "active" ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Currently Active
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 mr-2" />
                            Activate Program
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-300 font-serif">Credit Monitoring</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-800/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-300">24/7 Monitoring</span>
                  </div>
                  <Badge className="bg-green-600/20 text-green-300 border-green-400/30">ACTIVE</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-800/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-300">Identity Theft Protection</span>
                  </div>
                  <Badge className="bg-green-600/20 text-green-300 border-green-400/30">ACTIVE</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-800/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-300">Dark Web Surveillance</span>
                  </div>
                  <Badge className="bg-green-600/20 text-green-300 border-green-400/30">ACTIVE</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-800/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-300">Instant Alerts</span>
                  </div>
                  <Badge className="bg-green-600/20 text-green-300 border-green-400/30">ACTIVE</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
              <CardHeader>
                <CardTitle className="text-blue-300 font-serif">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-800/20 rounded-lg border border-blue-400/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-blue-300 text-sm font-medium">Score Update</span>
                    <span className="text-blue-400 text-xs">2 hours ago</span>
                  </div>
                  <p className="text-blue-200 text-xs">Snap Score increased by 5 points to 847</p>
                </div>

                <div className="p-3 bg-green-800/20 rounded-lg border border-green-400/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-green-300 text-sm font-medium">Payment Processed</span>
                    <span className="text-green-400 text-xs">1 day ago</span>
                  </div>
                  <p className="text-green-200 text-xs">Business credit line payment of $5,000 processed</p>
                </div>

                <div className="p-3 bg-purple-800/20 rounded-lg border border-purple-400/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-purple-300 text-sm font-medium">New Account</span>
                    <span className="text-purple-400 text-xs">3 days ago</span>
                  </div>
                  <p className="text-purple-200 text-xs">QGI Credit Line Replacement activated</p>
                </div>

                <div className="p-3 bg-amber-800/20 rounded-lg border border-amber-400/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-amber-300 text-sm font-medium">Utilization Alert</span>
                    <span className="text-amber-400 text-xs">1 week ago</span>
                  </div>
                  <p className="text-amber-200 text-xs">Credit utilization optimized to 5% across all accounts</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
