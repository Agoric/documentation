"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Scan,
  Bot,
  TrendingUp,
  DollarSign,
  Building2,
  Download,
  Eye,
} from "lucide-react"

interface ComplianceCheck {
  id: string
  category: string
  description: string
  status: "passed" | "failed" | "warning" | "pending"
  severity: "low" | "medium" | "high" | "critical"
  lastChecked: string
  details: string
}

interface InstitutionalMetrics {
  minimumInvestment: number
  currentInvestments: number
  targetROI: number
  actualROI: number
  governmentGuaranteedMortgages: number
  complianceScore: number
}

export function LoanComplianceBot() {
  const [isScanning, setIsScanning] = React.useState(false)
  const [scanProgress, setScanProgress] = React.useState(0)
  const [activeTab, setActiveTab] = React.useState("overview")

  const institutionalMetrics: InstitutionalMetrics = {
    minimumInvestment: 100000000, // $100M
    currentInvestments: 2847392000, // $2.8B
    targetROI: 20,
    actualROI: 22.4,
    governmentGuaranteedMortgages: 1847392000, // $1.8B
    complianceScore: 98.7,
  }

  const complianceChecks: ComplianceCheck[] = [
    {
      id: "kyc-001",
      category: "KYC/AML",
      description: "Customer identity verification and anti-money laundering checks",
      status: "passed",
      severity: "high",
      lastChecked: "2024-01-15 14:30:00",
      details: "All customer identities verified with government-issued documents",
    },
    {
      id: "reg-002",
      category: "Regulatory",
      description: "Federal lending regulations compliance (TILA, RESPA, CFPB)",
      status: "passed",
      severity: "critical",
      lastChecked: "2024-01-15 14:25:00",
      details: "Full compliance with Truth in Lending Act and Real Estate Settlement Procedures Act",
    },
    {
      id: "cap-003",
      category: "Capital Requirements",
      description: "Minimum institutional investment threshold verification",
      status: "passed",
      severity: "critical",
      lastChecked: "2024-01-15 14:20:00",
      details: `Current investments: $${(institutionalMetrics.currentInvestments / 1000000).toFixed(0)}M (Min: $${(institutionalMetrics.minimumInvestment / 1000000).toFixed(0)}M)`,
    },
    {
      id: "roi-004",
      category: "ROI Compliance",
      description: "Government guaranteed mortgage ROI verification",
      status: "passed",
      severity: "high",
      lastChecked: "2024-01-15 14:15:00",
      details: `Actual ROI: ${institutionalMetrics.actualROI}% (Target: ${institutionalMetrics.targetROI}%)`,
    },
    {
      id: "doc-005",
      category: "Documentation",
      description: "Loan documentation and record keeping standards",
      status: "warning",
      severity: "medium",
      lastChecked: "2024-01-15 14:10:00",
      details: "3 documents pending digital signature completion",
    },
    {
      id: "risk-006",
      category: "Risk Assessment",
      description: "Credit risk and default probability analysis",
      status: "passed",
      severity: "high",
      lastChecked: "2024-01-15 14:05:00",
      details: "All loans meet government guarantee criteria with <2% default risk",
    },
  ]

  const handleScan = async () => {
    setIsScanning(true)
    setScanProgress(0)

    // Simulate scanning process
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "failed":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "warning":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "pending":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const passedChecks = complianceChecks.filter((check) => check.status === "passed").length
  const totalChecks = complianceChecks.length
  const compliancePercentage = Math.round((passedChecks / totalChecks) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center">
            <Bot className="h-8 w-8 mr-3 text-blue-400" />
            Compliance Bot
          </h2>
          <p className="text-slate-300 mt-2">AI-powered regulatory compliance monitoring and verification</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleScan} disabled={isScanning} className="bg-blue-600 hover:bg-blue-700">
            <Scan className="h-4 w-4 mr-2" />
            {isScanning ? "Scanning..." : "Run Scan"}
          </Button>
          <Button variant="outline" className="border-slate-600 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Institutional Investment Alert */}
      <Alert className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
        <Building2 className="h-4 w-4" />
        <AlertDescription className="text-blue-200">
          <strong>Institutional Investment Requirements:</strong> Minimum investment of $100M required for
          government-guaranteed mortgage portfolio access. Current portfolio: $
          {(institutionalMetrics.currentInvestments / 1000000).toFixed(0)}M with {institutionalMetrics.actualROI}%
          compounded ROI.
        </AlertDescription>
      </Alert>

      {/* Scanning Progress */}
      {isScanning && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-medium">Compliance Scan in Progress</span>
              <span className="text-slate-300">{scanProgress}%</span>
            </div>
            <Progress value={scanProgress} className="h-2" />
          </CardContent>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm font-medium">Compliance Score</p>
                <p className="text-2xl font-bold text-white">{institutionalMetrics.complianceScore}%</p>
                <p className="text-green-400 text-sm">Excellent</p>
              </div>
              <Shield className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm font-medium">Portfolio Value</p>
                <p className="text-2xl font-bold text-white">
                  ${(institutionalMetrics.currentInvestments / 1000000000).toFixed(1)}B
                </p>
                <p className="text-blue-400 text-sm">Active Investments</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm font-medium">ROI Performance</p>
                <p className="text-2xl font-bold text-white">{institutionalMetrics.actualROI}%</p>
                <p className="text-purple-400 text-sm">Above Target</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/40 to-red-900/40 border-orange-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-300 text-sm font-medium">Gov. Mortgages</p>
                <p className="text-2xl font-bold text-white">
                  ${(institutionalMetrics.governmentGuaranteedMortgages / 1000000000).toFixed(1)}B
                </p>
                <p className="text-orange-400 text-sm">Guaranteed</p>
              </div>
              <Building2 className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-slate-800/50 border-slate-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
            Overview
          </TabsTrigger>
          <TabsTrigger value="checks" className="data-[state=active]:bg-purple-600">
            Compliance Checks
          </TabsTrigger>
          <TabsTrigger value="institutional" className="data-[state=active]:bg-green-600">
            Institutional
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-orange-600">
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Compliance Status Overview</CardTitle>
                <CardDescription>Current compliance status across all categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Overall Compliance</span>
                    <Badge className={getStatusColor("passed")}>{compliancePercentage}%</Badge>
                  </div>
                  <Progress value={compliancePercentage} className="h-2" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{passedChecks}</div>
                      <div className="text-slate-400">Passed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">
                        {complianceChecks.filter((c) => c.status === "warning").length}
                      </div>
                      <div className="text-slate-400">Warnings</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription>Latest compliance checks and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {complianceChecks.slice(0, 5).map((check) => (
                      <div key={check.id} className="flex items-center space-x-3 p-2 rounded-lg bg-slate-900/30">
                        {getStatusIcon(check.status)}
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium">{check.category}</div>
                          <div className="text-slate-400 text-xs">{check.lastChecked}</div>
                        </div>
                        <Badge className={getStatusColor(check.status)} variant="outline">
                          {check.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="checks" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Detailed Compliance Checks</CardTitle>
              <CardDescription>Comprehensive compliance verification results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceChecks.map((check) => (
                  <div
                    key={check.id}
                    className="p-4 rounded-lg bg-slate-900/30 border border-slate-700 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(check.status)}
                        <div>
                          <h4 className="text-white font-medium">{check.category}</h4>
                          <p className="text-slate-300 text-sm">{check.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(check.status)} variant="outline">
                          {check.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            check.severity === "critical"
                              ? "border-red-500/30 text-red-400"
                              : check.severity === "high"
                                ? "border-orange-500/30 text-orange-400"
                                : "border-yellow-500/30 text-yellow-400"
                          }
                        >
                          {check.severity}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-slate-400 text-sm mb-2">{check.details}</div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Last checked: {check.lastChecked}</span>
                      <Button size="sm" variant="ghost" className="h-6 text-xs">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="institutional" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Institutional Investment Requirements</CardTitle>
              <CardDescription>Government-guaranteed mortgage portfolio compliance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                    <h4 className="text-blue-300 font-medium mb-2">Minimum Investment Threshold</h4>
                    <div className="text-2xl font-bold text-white mb-1">
                      ${(institutionalMetrics.minimumInvestment / 1000000).toFixed(0)}M
                    </div>
                    <p className="text-blue-400 text-sm">Required for institutional access</p>
                  </div>
                  <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                    <h4 className="text-green-300 font-medium mb-2">Current Portfolio Value</h4>
                    <div className="text-2xl font-bold text-white mb-1">
                      ${(institutionalMetrics.currentInvestments / 1000000000).toFixed(2)}B
                    </div>
                    <p className="text-green-400 text-sm">
                      {(
                        (institutionalMetrics.currentInvestments / institutionalMetrics.minimumInvestment) *
                        100
                      ).toFixed(0)}
                      % above minimum
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                    <h4 className="text-purple-300 font-medium mb-2">Target ROI</h4>
                    <div className="text-2xl font-bold text-white mb-1">{institutionalMetrics.targetROI}%</div>
                    <p className="text-purple-400 text-sm">Compounded annual return</p>
                  </div>
                  <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-500/30">
                    <h4 className="text-orange-300 font-medium mb-2">Actual ROI</h4>
                    <div className="text-2xl font-bold text-white mb-1">{institutionalMetrics.actualROI}%</div>
                    <p className="text-orange-400 text-sm">
                      +{(institutionalMetrics.actualROI - institutionalMetrics.targetROI).toFixed(1)}% above target
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-900/30 rounded-lg border border-slate-600">
                <h4 className="text-white font-medium mb-3">Government Guaranteed Mortgages</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-400">
                      ${(institutionalMetrics.governmentGuaranteedMortgages / 1000000000).toFixed(1)}B
                    </div>
                    <div className="text-slate-400">Total Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-400">100%</div>
                    <div className="text-slate-400">Government Backed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-400">&lt;2%</div>
                    <div className="text-slate-400">Default Risk</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Compliance Reports</CardTitle>
              <CardDescription>Generate and download compliance documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="h-20 flex flex-col gap-2 bg-blue-600 hover:bg-blue-700">
                  <FileText className="h-6 w-6" />
                  <span>Full Compliance Report</span>
                </Button>
                <Button className="h-20 flex flex-col gap-2 bg-green-600 hover:bg-green-700">
                  <Building2 className="h-6 w-6" />
                  <span>Institutional Summary</span>
                </Button>
                <Button className="h-20 flex flex-col gap-2 bg-purple-600 hover:bg-purple-700">
                  <TrendingUp className="h-6 w-6" />
                  <span>ROI Performance Report</span>
                </Button>
                <Button className="h-20 flex flex-col gap-2 bg-orange-600 hover:bg-orange-700">
                  <Shield className="h-6 w-6" />
                  <span>Risk Assessment</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
