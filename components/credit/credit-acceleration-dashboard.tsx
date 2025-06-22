"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCreditAcceleration, type CreditAccelerationLoan } from "@/contexts/credit-acceleration-context"
import { AILoanAssessmentEngine } from "./ai-loan-assessment-engine"
import { LoanProcessingTerminal } from "./loan-processing-terminal"
import {
  TrendingUp,
  DollarSign,
  Users,
  Shield,
  Clock,
  BarChart3,
  PieChart,
  Target,
  Zap,
  FileText,
  Building,
  Calculator,
  Brain,
  Activity,
} from "lucide-react"
import { motion } from "framer-motion"

export function CreditAccelerationDashboard() {
  const { loans, getPortfolioMetrics, getLoansByStatus, createLoanApplication, assessLoanApplication } =
    useCreditAcceleration()

  const [portfolioMetrics, setPortfolioMetrics] = useState(getPortfolioMetrics())
  const [selectedTab, setSelectedTab] = useState("overview")
  const [recentLoans, setRecentLoans] = useState<CreditAccelerationLoan[]>([])

  useEffect(() => {
    setPortfolioMetrics(getPortfolioMetrics())
    setRecentLoans(Object.values(loans).slice(0, 5))
  }, [loans, getPortfolioMetrics])

  const statusCounts = {
    pending: getLoansByStatus("pending").length,
    processing: getLoansByStatus("processing").length,
    approved: getLoansByStatus("approved").length,
    funded: getLoansByStatus("funded").length,
    active: getLoansByStatus("active").length,
    denied: getLoansByStatus("denied").length,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "funded":
      case "active":
        return "text-green-400"
      case "denied":
        return "text-red-400"
      case "pending":
        return "text-yellow-400"
      case "processing":
        return "text-blue-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Credit Acceleration Suite
          </h1>
          <p className="text-xl text-purple-200">
            Comprehensive credit acceleration with AI-driven loan processing and portfolio management
          </p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm">Total Portfolio Value</p>
                  <p className="text-2xl font-bold text-green-400">${portfolioMetrics.totalValue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center text-xs text-green-300">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {(portfolioMetrics.averageROI * 100).toFixed(1)}% Average ROI
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Active Loans</p>
                  <p className="text-2xl font-bold text-blue-400">{portfolioMetrics.totalLoans}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center text-xs text-blue-300">
                  <Users className="w-3 h-3 mr-1" />${portfolioMetrics.averageLoanSize.toLocaleString()} Avg Size
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-violet-900/50 border-purple-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm">Portfolio Health</p>
                  <p className="text-2xl font-bold text-purple-400 capitalize">{portfolioMetrics.portfolioHealth}</p>
                </div>
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center text-xs text-purple-300">
                  <Activity className="w-3 h-3 mr-1" />
                  {(portfolioMetrics.defaultRate * 100).toFixed(1)}% Default Rate
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border-amber-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-200 text-sm">Tokenized Value</p>
                  <p className="text-2xl font-bold text-amber-400">
                    ${portfolioMetrics.totalTokenizedValue.toLocaleString()}
                  </p>
                </div>
                <Zap className="w-8 h-8 text-amber-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center text-xs text-amber-300">
                  <Target className="w-3 h-3 mr-1" />
                  {portfolioMetrics.activeGuarantees} Active Guarantees
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/30 border border-slate-600/30">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assessment">AI Assessment</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Loan Status Overview */}
              <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
                <CardHeader>
                  <CardTitle className="text-slate-300 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Loan Status Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(statusCounts).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(status).replace("text-", "bg-")}`} />
                        <span className="text-slate-200 capitalize">{status.replace("_", " ")}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-semibold ${getStatusColor(status)}`}>{count}</span>
                        <div className="w-20">
                          <Progress value={(count / portfolioMetrics.totalLoans) * 100} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Loan Activity */}
              <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-400/30">
                <CardHeader>
                  <CardTitle className="text-indigo-300 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Recent Loan Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentLoans.map((loan) => (
                      <div
                        key={loan.loanId}
                        className="flex items-center justify-between p-3 bg-indigo-800/20 rounded-lg border border-indigo-400/20"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                            <FileText className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-indigo-200">{loan.loanId}</div>
                            <div className="text-xs text-gray-400">
                              ${(loan.approvedAmount || loan.requestedAmount).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              loan.status === "approved" || loan.status === "funded" || loan.status === "active"
                                ? "bg-green-600/20 text-green-300 border-green-400/30"
                                : loan.status === "denied"
                                  ? "bg-red-600/20 text-red-300 border-red-400/30"
                                  : "bg-yellow-600/20 text-yellow-300 border-yellow-400/30"
                            }
                          >
                            {loan.status.toUpperCase()}
                          </Badge>
                          <div className="text-xs text-gray-400 mt-1">{loan.applicationDate.toLocaleDateString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-400/30">
              <CardHeader>
                <CardTitle className="text-purple-300 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    onClick={() => setSelectedTab("assessment")}
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    <Brain className="w-6 h-6" />
                    <span className="text-sm">AI Assessment</span>
                  </Button>

                  <Button
                    onClick={() => setSelectedTab("processing")}
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <Calculator className="w-6 h-6" />
                    <span className="text-sm">Process Loans</span>
                  </Button>

                  <Button
                    onClick={() => setSelectedTab("portfolio")}
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                  >
                    <PieChart className="w-6 h-6" />
                    <span className="text-sm">Portfolio View</span>
                  </Button>

                  <Button
                    onClick={() => setSelectedTab("analytics")}
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                  >
                    <BarChart3 className="w-6 h-6" />
                    <span className="text-sm">Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessment">
            <AILoanAssessmentEngine />
          </TabsContent>

          <TabsContent value="processing">
            <LoanProcessingTerminal />
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
              <CardContent className="text-center py-12">
                <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">Portfolio Management</h3>
                <p className="text-gray-400 mb-6">
                  Comprehensive portfolio analytics and management tools coming soon.
                </p>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600">View Portfolio Details</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
              <CardContent className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">Advanced Analytics</h3>
                <p className="text-gray-400 mb-6">
                  Detailed performance analytics and reporting dashboard coming soon.
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">Generate Reports</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
