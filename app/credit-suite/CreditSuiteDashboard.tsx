"use client"

import * as React from "react"
import {
  TrendingUp,
  TrendingDown,
  Shield,
  AlertTriangle,
  CheckCircle,
  CreditCard,
  Target,
  Brain,
  BookOpen,
  Bell,
  Download,
  RefreshCw,
  Eye,
  Lock,
  Star,
  Award,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoyalDiamondSlabCard } from "@/components/ui/royal-diamond-slab-card"
import { useCreditSuite } from "@/contexts/credit-context"

export function CreditSuiteDashboard() {
  const {
    creditProfile,
    creditHistory,
    creditReports,
    recommendations,
    alerts,
    isLoading,
    refreshCreditData,
    simulateScoreChange,
  } = useCreditSuite()

  const [activeTab, setActiveTab] = React.useState("overview")

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your credit profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Credit Suite
          </h1>
          <p className="text-muted-foreground mt-2">Complete credit monitoring, analysis, and improvement platform</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={refreshCreditData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Alerts ({alerts.length})
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Credit Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <RoyalDiamondSlabCard
          variant="emerald"
          size="lg"
          title="FICO Score"
          content={`${creditProfile.ficoScore}`}
          highlightWords={["FICO"]}
          className="h-40"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {creditProfile.scoreChange > 0 ? (
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-400" />
              )}
              <span
                className={`text-sm font-medium ${creditProfile.scoreChange > 0 ? "text-emerald-400" : "text-red-400"}`}
              >
                {creditProfile.scoreChange > 0 ? "+" : ""}
                {creditProfile.scoreChange} this month
              </span>
            </div>
            <Badge
              variant={creditProfile.scoreRating === "Excellent" ? "default" : "secondary"}
              className={
                creditProfile.scoreRating === "Excellent"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : creditProfile.scoreRating === "Good"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-yellow-500/20 text-yellow-400"
              }
            >
              {creditProfile.scoreRating}
            </Badge>
          </div>
        </RoyalDiamondSlabCard>

        <RoyalDiamondSlabCard
          variant="sapphire"
          size="lg"
          title="VantageScore"
          content={`${creditProfile.vantageScore}`}
          highlightWords={["Vantage"]}
          className="h-40"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-400" />
              <span className="text-sm text-blue-400">Protected</span>
            </div>
            <Progress value={(creditProfile.vantageScore / 850) * 100} className="h-2" />
          </div>
        </RoyalDiamondSlabCard>

        <RoyalDiamondSlabCard
          variant="ruby"
          size="lg"
          title="Credit Utilization"
          content={`${creditProfile.creditUtilization}%`}
          highlightWords={["Utilization"]}
          className="h-40"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-red-400" />
              <span className="text-sm text-red-400">{creditProfile.creditUtilization < 30 ? "Good" : "High"}</span>
            </div>
            <Progress value={creditProfile.creditUtilization} className="h-2" />
          </div>
        </RoyalDiamondSlabCard>

        <RoyalDiamondSlabCard
          variant="diamond"
          size="lg"
          title="Credit Age"
          content={`${creditProfile.averageAccountAge} years`}
          highlightWords={["Age"]}
          className="h-40"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-white" />
              <span className="text-sm text-white">Established</span>
            </div>
            <div className="text-xs text-white/70">Oldest account: {creditProfile.oldestAccountAge} years</div>
          </div>
        </RoyalDiamondSlabCard>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-background/50 backdrop-blur-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="improvement">Improvement</TabsTrigger>
          <TabsTrigger value="simulator">Simulator</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Credit Score History */}
            <Card className="bg-background/50 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Credit Score History
                </CardTitle>
                <CardDescription>Your credit score trend over the last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {creditHistory.slice(0, 6).map((entry, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{entry.date}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{entry.score}</span>
                        {entry.change !== 0 && (
                          <Badge
                            variant="outline"
                            className={
                              entry.change > 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                            }
                          >
                            {entry.change > 0 ? "+" : ""}
                            {entry.change}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Credit Factors */}
            <Card className="bg-background/50 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Credit Score Factors
                </CardTitle>
                <CardDescription>What's impacting your credit score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Payment History</span>
                      <span className="text-sm font-medium text-green-400">Excellent</span>
                    </div>
                    <Progress value={95} className="h-2" />
                    <p className="text-xs text-muted-foreground">35% of your score</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Credit Utilization</span>
                      <span className="text-sm font-medium text-yellow-400">Fair</span>
                    </div>
                    <Progress value={creditProfile.creditUtilization} className="h-2" />
                    <p className="text-xs text-muted-foreground">30% of your score</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Credit History Length</span>
                      <span className="text-sm font-medium text-blue-400">Good</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-muted-foreground">15% of your score</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Credit Mix</span>
                      <span className="text-sm font-medium text-green-400">Good</span>
                    </div>
                    <Progress value={80} className="h-2" />
                    <p className="text-xs text-muted-foreground">10% of your score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Alerts */}
          <Card className="bg-background/50 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Credit Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.slice(0, 3).map((alert, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg border ${
                      alert.severity === "high"
                        ? "bg-red-500/10 border-red-500/20"
                        : alert.severity === "medium"
                          ? "bg-yellow-500/10 border-yellow-500/20"
                          : "bg-blue-500/10 border-blue-500/20"
                    }`}
                  >
                    {alert.severity === "high" ? (
                      <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                    ) : alert.severity === "medium" ? (
                      <Eye className="h-5 w-5 text-yellow-400 mt-0.5" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creditReports.map((report, index) => (
              <Card key={index} className="bg-background/50 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{report.bureau}</span>
                    <Badge
                      variant={report.status === "current" ? "default" : "secondary"}
                      className={
                        report.status === "current"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }
                    >
                      {report.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>Last updated: {report.lastUpdated}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{report.score}</div>
                    <div className="text-sm text-muted-foreground">{report.scoreRange}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Accounts</span>
                      <span>{report.accounts}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Inquiries</span>
                      <span>{report.inquiries}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Negative Items</span>
                      <span className={report.negativeItems > 0 ? "text-red-400" : "text-green-400"}>
                        {report.negativeItems}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-background/50 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Identity Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="font-medium">Credit Monitoring</p>
                      <p className="text-sm text-muted-foreground">Active protection</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="font-medium">Identity Theft Protection</p>
                      <p className="text-sm text-muted-foreground">24/7 monitoring</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="font-medium">Real-time Alerts</p>
                      <p className="text-sm text-muted-foreground">Instant notifications</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400">Enabled</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Identity Theft Risk</span>
                    <Badge className="bg-green-500/20 text-green-400">Low</Badge>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Credit Fraud Risk</span>
                    <Badge className="bg-green-500/20 text-green-400">Low</Badge>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Account Takeover Risk</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400">Medium</Badge>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Improvement Tab */}
        <TabsContent value="improvement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-background/50 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI-Powered Recommendations
                </CardTitle>
                <CardDescription>Personalized strategies to improve your credit score</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-400">{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-green-500/20 text-green-400">+{rec.potentialIncrease} points</Badge>
                        <Badge variant="outline">{rec.timeframe}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Take immediate steps to improve your credit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay Down Credit Card Balances
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Dispute Inaccurate Information
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Star className="h-4 w-4 mr-2" />
                  Request Credit Limit Increases
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  Add Authorized User Accounts
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Target className="h-4 w-4 mr-2" />
                  Optimize Credit Mix
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Simulator Tab */}
        <TabsContent value="simulator" className="space-y-6">
          <Card className="bg-background/50 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Credit Score Simulator
              </CardTitle>
              <CardDescription>See how different actions could impact your credit score</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Simulate Actions</h3>
                  <div className="space-y-3">
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => simulateScoreChange("pay_balance", 500)}
                    >
                      Pay $500 Credit Card Balance
                    </Button>
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => simulateScoreChange("increase_limit", 2000)}
                    >
                      Increase Credit Limit by $2,000
                    </Button>
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => simulateScoreChange("new_account", 0)}
                    >
                      Open New Credit Account
                    </Button>
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => simulateScoreChange("close_account", 0)}
                    >
                      Close Oldest Account
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Projected Impact</h3>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{creditProfile.ficoScore}</div>
                      <div className="text-sm text-muted-foreground">Current Score</div>
                    </div>
                  </div>
                  <div className="text-center text-muted-foreground">
                    <p className="text-sm">Select an action above to see the projected impact on your credit score</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-background/50 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Credit Basics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="ghost">
                  Understanding Credit Scores
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  How Credit Reports Work
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  Credit Utilization Explained
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  Payment History Impact
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Credit Building
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="ghost">
                  Building Credit from Scratch
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  Secured Credit Cards
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  Credit Builder Loans
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  Authorized User Strategy
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Credit Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="ghost">
                  Identity Theft Prevention
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  Disputing Credit Errors
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  Credit Monitoring Benefits
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  Fraud Alert Setup
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
