"use client"

import { useState } from "react"
import { useCreditSuite } from "@/contexts/credit-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  CreditCard,
  Bell,
  Lightbulb,
  RefreshCw,
  Download,
  Eye,
  Shield,
  Zap,
} from "lucide-react"

export function CreditDashboard() {
  const {
    creditProfile,
    creditHistory,
    creditReports,
    alerts,
    recommendations,
    goals,
    isLoading,
    refreshCreditData,
    markAlertAsRead,
    createCreditGoal,
    simulateScoreChange,
    disputeCreditItem,
    requestCreditReport,
    getCreditTrends,
    getPredictedScore,
    getCreditHealthScore,
  } = useCreditSuite()

  const [selectedGoal, setSelectedGoal] = useState<number | null>(null)
  const [newGoalTarget, setNewGoalTarget] = useState("")
  const [newGoalDate, setNewGoalDate] = useState("")
  const [disputeReason, setDisputeReason] = useState("")

  const creditTrends = getCreditTrends()
  const healthScore = getCreditHealthScore()
  const predictedScore = getPredictedScore(6)

  const getScoreColor = (score: number) => {
    if (score >= 800) return "text-green-600"
    if (score >= 740) return "text-blue-600"
    if (score >= 670) return "text-yellow-600"
    if (score >= 580) return "text-orange-600"
    return "text-red-600"
  }

  const getScoreRating = (score: number) => {
    if (score >= 800) return "Excellent"
    if (score >= 740) return "Very Good"
    if (score >= 670) return "Good"
    if (score >= 580) return "Fair"
    return "Poor"
  }

  const handleCreateGoal = () => {
    if (newGoalTarget && newGoalDate) {
      createCreditGoal({
        targetScore: Number.parseInt(newGoalTarget),
        currentScore: creditProfile.ficoScore,
        targetDate: new Date(newGoalDate),
        strategies: ["Reduce credit utilization", "Pay bills on time", "Monitor credit reports"],
        milestones: [
          {
            score: Number.parseInt(newGoalTarget) - 20,
            date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            achieved: false,
          },
          {
            score: Number.parseInt(newGoalTarget) - 10,
            date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
            achieved: false,
          },
          { score: Number.parseInt(newGoalTarget), date: new Date(newGoalDate), achieved: false },
        ],
      })
      setNewGoalTarget("")
      setNewGoalDate("")
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Credit Command Center
          </h1>
          <p className="text-muted-foreground mt-2">Monitor, optimize, and protect your credit profile</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshCreditData} disabled={isLoading} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh Data
          </Button>
          <Button variant="default">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Credit Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Credit Score Overview
            </CardTitle>
            <CardDescription>Your current credit standing across all bureaus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(creditProfile.ficoScore)}`}>
                  {creditProfile.ficoScore}
                </div>
                <div className="text-sm text-muted-foreground">FICO Score</div>
                <Badge variant={creditProfile.scoreChange > 0 ? "default" : "destructive"} className="mt-2">
                  {creditProfile.scoreChange > 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {creditProfile.scoreChange > 0 ? "+" : ""}
                  {creditProfile.scoreChange}
                </Badge>
              </div>
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(creditProfile.vantageScore)}`}>
                  {creditProfile.vantageScore}
                </div>
                <div className="text-sm text-muted-foreground">VantageScore</div>
                <Badge variant="outline" className="mt-2">
                  {getScoreRating(creditProfile.vantageScore)}
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600">{healthScore}%</div>
                <div className="text-sm text-muted-foreground">Health Score</div>
                <Progress value={healthScore} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Credit Utilization</span>
              <span className="font-semibold">{creditProfile.creditUtilization}%</span>
            </div>
            <Progress value={creditProfile.creditUtilization} className="h-2" />

            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Payment History</span>
              <span className="font-semibold">{creditProfile.paymentHistory}%</span>
            </div>
            <Progress value={creditProfile.paymentHistory} className="h-2" />

            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Accounts</span>
              <span className="font-semibold">{creditProfile.totalAccounts}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Credit Inquiries</span>
              <span className="font-semibold">{creditProfile.creditInquiries}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="recommendations">Tips</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Credit Factors */}
            <Card>
              <CardHeader>
                <CardTitle>Credit Factors</CardTitle>
                <CardDescription>Key factors affecting your credit score</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Payment History (35%)</span>
                    <span className="font-semibold text-green-600">{creditProfile.paymentHistory}%</span>
                  </div>
                  <Progress value={creditProfile.paymentHistory} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Credit Utilization (30%)</span>
                    <span
                      className={`font-semibold ${creditProfile.creditUtilization > 30 ? "text-red-600" : "text-green-600"}`}
                    >
                      {creditProfile.creditUtilization}%
                    </span>
                  </div>
                  <Progress value={creditProfile.creditUtilization} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Credit History Length (15%)</span>
                    <span className="font-semibold text-blue-600">{creditProfile.averageAccountAge} years</span>
                  </div>
                  <Progress value={(creditProfile.averageAccountAge / 10) * 100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Credit Mix (10%)</span>
                    <span className="font-semibold text-purple-600">{creditProfile.totalAccounts} accounts</span>
                  </div>
                  <Progress value={(creditProfile.totalAccounts / 15) * 100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>New Credit (10%)</span>
                    <span
                      className={`font-semibold ${creditProfile.creditInquiries > 3 ? "text-red-600" : "text-green-600"}`}
                    >
                      {creditProfile.creditInquiries} inquiries
                    </span>
                  </div>
                  <Progress value={Math.max(0, (10 - creditProfile.creditInquiries) * 10)} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Credit Prediction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Score Prediction
                </CardTitle>
                <CardDescription>Projected score changes over time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{predictedScore}</div>
                  <div className="text-sm text-muted-foreground">Predicted score in 6 months</div>
                  <Badge variant="outline" className="mt-2">
                    +{predictedScore - creditProfile.ficoScore} points
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Score Improvement Trend</span>
                    <span
                      className={`font-semibold ${creditTrends.scoreImprovement > 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {creditTrends.scoreImprovement > 0 ? "+" : ""}
                      {creditTrends.scoreImprovement}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Utilization Trend</span>
                    <span
                      className={`font-semibold ${creditTrends.utilizationTrend < 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {creditTrends.utilizationTrend}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Payment Consistency</span>
                    <span className="font-semibold text-green-600">{creditTrends.paymentConsistency}%</span>
                  </div>
                </div>

                <Button onClick={() => simulateScoreChange("pay_balance", 2000)} variant="outline" className="w-full">
                  Simulate Score Impact
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creditReports.map((report) => (
              <Card key={report.bureau}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{report.bureau}</span>
                    <Badge variant={report.status === "current" ? "default" : "destructive"}>{report.status}</Badge>
                  </CardTitle>
                  <CardDescription>Last updated: {report.lastUpdated}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getScoreColor(report.score)}`}>{report.score}</div>
                    <div className="text-sm text-muted-foreground">{report.scoreRange}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Accounts</span>
                      <span className="font-semibold">{report.accounts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Inquiries</span>
                      <span className="font-semibold">{report.inquiries}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Negative Items</span>
                      <span className={`font-semibold ${report.negativeItems > 0 ? "text-red-600" : "text-green-600"}`}>
                        {report.negativeItems}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => requestCreditReport(report.bureau)}
                      disabled={isLoading}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Update
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View Full
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Credit Score History
              </CardTitle>
              <CardDescription>Track your credit score changes over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {creditHistory.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-2 rounded-full ${entry.change > 0 ? "bg-green-100 text-green-600" : entry.change < 0 ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"}`}
                        >
                          {entry.change > 0 ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : entry.change < 0 ? (
                            <TrendingDown className="h-4 w-4" />
                          ) : (
                            <Clock className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold">{entry.date}</div>
                          <div className="text-sm text-muted-foreground">{entry.bureau}</div>
                          {entry.reason && <div className="text-sm text-blue-600">{entry.reason}</div>}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{entry.score}</div>
                        <div
                          className={`text-sm ${entry.change > 0 ? "text-green-600" : entry.change < 0 ? "text-red-600" : "text-gray-600"}`}
                        >
                          {entry.change > 0 ? "+" : ""}
                          {entry.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Credit Alerts
                <Badge variant="destructive">{alerts.filter((alert) => !alert.read).length} unread</Badge>
              </CardTitle>
              <CardDescription>Stay informed about changes to your credit profile</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${!alert.read ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"}`}
                      onClick={() => markAlertAsRead(alert.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              alert.severity === "high"
                                ? "bg-red-100 text-red-600"
                                : alert.severity === "medium"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-green-100 text-green-600"
                            }`}
                          >
                            {alert.severity === "high" ? (
                              <AlertTriangle className="h-4 w-4" />
                            ) : alert.severity === "medium" ? (
                              <Clock className="h-4 w-4" />
                            ) : (
                              <CheckCircle className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <div className="font-semibold">{alert.title}</div>
                            <div className="text-sm text-muted-foreground mt-1">{alert.description}</div>
                            <div className="text-xs text-muted-foreground mt-2">{alert.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!alert.read && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                          {alert.actionRequired && <Badge variant="outline">Action Required</Badge>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((rec) => (
              <Card key={rec.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      {rec.title}
                    </span>
                    <Badge
                      variant={
                        rec.priority === "high" ? "destructive" : rec.priority === "medium" ? "default" : "secondary"
                      }
                    >
                      {rec.priority} priority
                    </Badge>
                  </CardTitle>
                  <CardDescription>{rec.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Potential Increase:</span>
                      <div className="font-semibold text-green-600">+{rec.potentialIncrease} points</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Timeframe:</span>
                      <div className="font-semibold">{rec.timeframe}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Difficulty:</span>
                      <div
                        className={`font-semibold ${
                          rec.difficulty === "easy"
                            ? "text-green-600"
                            : rec.difficulty === "medium"
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {rec.difficulty}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Category:</span>
                      <div className="font-semibold capitalize">{rec.category}</div>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm font-semibold">Action Steps:</span>
                    <ul className="mt-2 space-y-1">
                      {rec.actionSteps.map((step, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 mt-0.5 text-green-600" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full">Start Action Plan</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Create New Goal
                </CardTitle>
                <CardDescription>Set a target credit score and timeline</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="target-score">Target Credit Score</Label>
                  <Input
                    id="target-score"
                    type="number"
                    placeholder="e.g., 800"
                    value={newGoalTarget}
                    onChange={(e) => setNewGoalTarget(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-date">Target Date</Label>
                  <Input
                    id="target-date"
                    type="date"
                    value={newGoalDate}
                    onChange={(e) => setNewGoalDate(e.target.value)}
                  />
                </div>
                <Button onClick={handleCreateGoal} className="w-full">
                  Create Goal
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Goals</CardTitle>
                <CardDescription>Track your credit improvement goals</CardDescription>
              </CardHeader>
              <CardContent>
                {goals.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No active goals. Create your first goal to get started!
                  </div>
                ) : (
                  <ScrollArea className="h-64">
                    <div className="space-y-4">
                      {goals.map((goal) => (
                        <div key={goal.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-semibold">Target: {goal.targetScore}</div>
                              <div className="text-sm text-muted-foreground">Current: {goal.currentScore}</div>
                            </div>
                            <Badge variant="outline">{Math.round(goal.progress)}% complete</Badge>
                          </div>
                          <Progress value={goal.progress} className="mb-2" />
                          <div className="text-xs text-muted-foreground">
                            Target Date: {goal.targetDate.toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dispute Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="fixed bottom-6 right-6 bg-transparent">
            <Shield className="h-4 w-4 mr-2" />
            File Dispute
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>File Credit Dispute</DialogTitle>
            <DialogDescription>Dispute inaccurate information on your credit report</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dispute-reason">Reason for Dispute</Label>
              <Textarea
                id="dispute-reason"
                placeholder="Describe the inaccurate information..."
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
              />
            </div>
            <Button
              onClick={() => disputeCreditItem("item-123", disputeReason)}
              disabled={!disputeReason || isLoading}
              className="w-full"
            >
              Submit Dispute
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
