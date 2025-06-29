"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { useCreditSuite } from "@/contexts/credit-context"
import {
  CreditCard,
  TrendingUp,
  AlertCircle,
  Target,
  FileText,
  Shield,
  Calculator,
  Lightbulb,
  Eye,
  Download,
} from "lucide-react"

const CreditSuiteDashboard: React.FC = () => {
  const router = useRouter()
  const {
    creditProfile,
    creditReports,
    alerts,
    recommendations,
    goals,
    getCreditHealthScore,
    refreshCreditData,
    isLoading,
  } = useCreditSuite()

  const healthScore = getCreditHealthScore()
  const unreadAlerts = alerts.filter((alert) => !alert.read).length

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const handleRefreshData = async () => {
    await refreshCreditData()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Credit Suite Dashboard</h1>
            <p className="text-slate-300">Manage and improve your credit profile</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={handleRefreshData} disabled={isLoading} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              {isLoading ? "Refreshing..." : "Refresh Data"}
            </Button>
            <Button onClick={() => handleNavigation("/credit-suite/reports")}>
              <FileText className="w-4 h-4 mr-2" />
              View Reports
            </Button>
          </div>
        </div>

        {/* Credit Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">FICO Score</p>
                  <p className="text-3xl font-bold">{creditProfile.ficoScore}</p>
                  <p className="text-blue-100 text-sm">{creditProfile.scoreRating}</p>
                </div>
                <CreditCard className="w-12 h-12 text-blue-200" />
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  {creditProfile.scoreChange > 0 ? "+" : ""}
                  {creditProfile.scoreChange} this month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Health Score</p>
                  <p className="text-3xl font-bold">{healthScore}%</p>
                  <p className="text-green-100 text-sm">Overall Health</p>
                </div>
                <Shield className="w-12 h-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Utilization</p>
                  <p className="text-3xl font-bold">{creditProfile.creditUtilization}%</p>
                  <p className="text-orange-100 text-sm">Credit Usage</p>
                </div>
                <Calculator className="w-12 h-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">Alerts</p>
                  <p className="text-3xl font-bold">{unreadAlerts}</p>
                  <p className="text-red-100 text-sm">New Items</p>
                </div>
                <AlertCircle className="w-12 h-12 text-red-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common credit management tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => handleNavigation("/credit-suite/simulator")}
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Credit Score Simulator
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => handleNavigation("/credit-suite/dispute")}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    File a Dispute
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => handleNavigation("/credit-suite/monitoring")}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Identity Monitoring
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => handleNavigation("/citizen/loan-center")}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Loan Center
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {alerts.slice(0, 4).map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{alert.title}</p>
                        <p className="text-xs text-slate-600">{alert.date}</p>
                      </div>
                      <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>{alert.severity}</Badge>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => handleNavigation("/credit-suite/alerts")}
                  >
                    View All Alerts
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
                      {report.bureau}
                      <Badge variant={report.status === "current" ? "default" : "secondary"}>{report.status}</Badge>
                    </CardTitle>
                    <CardDescription>Score: {report.score}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Accounts:</span>
                        <span>{report.accounts}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Inquiries:</span>
                        <span>{report.inquiries}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Negative Items:</span>
                        <span>{report.negativeItems}</span>
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handleNavigation(`/credit-suite/reports/${report.bureau.toLowerCase()}`)}
                    >
                      View Full Report
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recommendations.map((rec) => (
                <Card key={rec.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Lightbulb className="w-5 h-5 mr-2" />
                        {rec.title}
                      </span>
                      <Badge variant={rec.priority === "high" ? "destructive" : "secondary"}>{rec.priority}</Badge>
                    </CardTitle>
                    <CardDescription>{rec.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Potential Increase:</span>
                      <span className="font-medium text-green-600">+{rec.potentialIncrease} points</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Timeframe:</span>
                      <span>{rec.timeframe}</span>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handleNavigation(`/credit-suite/recommendations/${rec.id}`)}
                    >
                      View Action Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Credit Goals
                </CardTitle>
                <CardDescription>Set and track your credit improvement goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {goals.length === 0 ? (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                    <p className="text-slate-600 mb-4">No credit goals set yet</p>
                    <Button onClick={() => handleNavigation("/credit-suite/goals/create")}>
                      Create Your First Goal
                    </Button>
                  </div>
                ) : (
                  goals.map((goal) => (
                    <div key={goal.id} className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Target Score: {goal.targetScore}</h4>
                        <Badge>{goal.progress}% Complete</Badge>
                      </div>
                      <Progress value={goal.progress} className="mb-2" />
                      <p className="text-sm text-slate-600">
                        Current: {goal.currentScore} → Target: {goal.targetScore}
                      </p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Credit Monitoring</CardTitle>
                  <CardDescription>Real-time credit report monitoring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Status</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Last Check</span>
                    <span className="text-sm text-slate-600">2 hours ago</span>
                  </div>
                  <Button className="w-full" onClick={() => handleNavigation("/credit-suite/monitoring/settings")}>
                    Monitoring Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Identity Protection</CardTitle>
                  <CardDescription>Advanced identity theft protection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Protection Level</span>
                    <Badge variant="default">Premium</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Scans</span>
                    <span className="text-sm text-slate-600">Daily</span>
                  </div>
                  <Button className="w-full" onClick={() => handleNavigation("/credit-suite/identity-protection")}>
                    View Protection Details
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default CreditSuiteDashboard
