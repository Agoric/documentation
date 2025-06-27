"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  BarChart3,
  Scan,
  RefreshCw,
  Download,
  Bell,
  DollarSign,
  Building2,
  Target,
  Activity,
  Zap,
  Award,
  Lock,
  Eye,
  AlertCircle,
} from "lucide-react"

interface ComplianceAlert {
  id: string
  severity: "critical" | "high" | "medium" | "low"
  type: string
  message: string
  loanId: string
  timestamp: Date
  status: "active" | "resolved" | "investigating"
  bondType: "FHA" | "VA" | "USDA" | "SBA"
  investmentAmount: number
  expectedROI: number
}

interface ComplianceMetrics {
  overallScore: number
  totalLoansScanned: number
  complianceRate: number
  governmentBondCompliance: number
  institutionalROI: number
  minimumInvestmentMet: number
  averageProcessingTime: number
  monthlyRevenue: number
  compoundedInterestRevenue: number
}

interface GovernmentBondStructure {
  type: "FHA" | "VA" | "USDA" | "SBA"
  term: number
  guaranteeRate: number
  minimumInvestment: number
  expectedROI: number
  complianceRequirements: string[]
}

export function LoanComplianceBot() {
  const [isScanning, setIsScanning] = React.useState(false)
  const [selectedLoanId, setSelectedLoanId] = React.useState("")
  const [activeTab, setActiveTab] = React.useState("dashboard")
  const [scanResults, setScanResults] = React.useState<any>(null)

  // Government Bond Structures with $100M minimum investment and 20% ROI
  const bondStructures: GovernmentBondStructure[] = [
    {
      type: "FHA",
      term: 30,
      guaranteeRate: 100,
      minimumInvestment: 100000000, // $100M minimum
      expectedROI: 20.0,
      complianceRequirements: [
        "Owner-occupied primary residence",
        "Debt-to-income ratio ≤ 43%",
        "Credit score ≥ 580 (3.5% down) or ≥ 500 (10% down)",
        "Property appraisal and inspection",
        "Mortgage insurance premium",
        "Institutional investment ≥ $100M",
        "Government guarantee validation",
      ],
    },
    {
      type: "VA",
      term: 50,
      guaranteeRate: 100,
      minimumInvestment: 100000000, // $100M minimum
      expectedROI: 20.0,
      complianceRequirements: [
        "Eligible veteran or service member",
        "Certificate of Eligibility (COE)",
        "Primary residence requirement",
        "No down payment required",
        "No private mortgage insurance",
        "Institutional investment ≥ $100M",
        "VA funding fee compliance",
      ],
    },
    {
      type: "USDA",
      term: 35,
      guaranteeRate: 90,
      minimumInvestment: 100000000, // $100M minimum
      expectedROI: 20.0,
      complianceRequirements: [
        "Rural area eligibility",
        "Income limits (115% of median area income)",
        "Primary residence requirement",
        "No down payment option",
        "Property eligibility verification",
        "Institutional investment ≥ $100M",
        "USDA guarantee fee compliance",
      ],
    },
    {
      type: "SBA",
      term: 25,
      guaranteeRate: 85,
      minimumInvestment: 100000000, // $100M minimum
      expectedROI: 20.0,
      complianceRequirements: [
        "Small business eligibility",
        "Owner-occupied commercial property",
        "Business cash flow analysis",
        "Personal guarantee requirements",
        "SBA 504 program compliance",
        "Institutional investment ≥ $100M",
        "Third-party lender participation",
      ],
    },
  ]

  const complianceMetrics: ComplianceMetrics = {
    overallScore: 96.2,
    totalLoansScanned: 15847,
    complianceRate: 94.8,
    governmentBondCompliance: 98.1,
    institutionalROI: 20.3, // 20.3% ROI on government guaranteed mortgages
    minimumInvestmentMet: 100.0, // 100% of portfolios meet $100M minimum
    averageProcessingTime: 2.3,
    monthlyRevenue: 167500000, // $167.5M monthly revenue
    compoundedInterestRevenue: 2010000000, // $2.01B compounded interest revenue
  }

  const recentAlerts: ComplianceAlert[] = [
    {
      id: "ALERT-001",
      severity: "high",
      type: "Investment Threshold",
      message: "Portfolio approaching $100M minimum investment requirement",
      loanId: "LOAN-FHA-2024-001",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "active",
      bondType: "FHA",
      investmentAmount: 98500000,
      expectedROI: 19.8,
    },
    {
      id: "ALERT-002",
      severity: "medium",
      type: "ROI Optimization",
      message: "VA loan portfolio exceeding 20% ROI target - optimization opportunity",
      loanId: "LOAN-VA-2024-002",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      status: "investigating",
      bondType: "VA",
      investmentAmount: 125000000,
      expectedROI: 21.2,
    },
    {
      id: "ALERT-003",
      severity: "critical",
      type: "Government Guarantee",
      message: "USDA guarantee validation pending - immediate action required",
      loanId: "LOAN-USDA-2024-003",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      status: "active",
      bondType: "USDA",
      investmentAmount: 110000000,
      expectedROI: 20.1,
    },
    {
      id: "ALERT-004",
      severity: "low",
      type: "Documentation",
      message: "SBA 504 documentation complete - ready for institutional investment",
      loanId: "LOAN-SBA-2024-004",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      status: "resolved",
      bondType: "SBA",
      investmentAmount: 150000000,
      expectedROI: 20.5,
    },
  ]

  const handleComplianceScan = async () => {
    setIsScanning(true)
    try {
      const response = await fetch("/api/compliance/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loanId: selectedLoanId,
          scanType: "full",
          institutionalMinimum: 100000000,
          targetROI: 20.0,
        }),
      })
      const results = await response.json()
      setScanResults(results)
    } catch (error) {
      console.error("Compliance scan failed:", error)
    } finally {
      setIsScanning(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500 text-white"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-yellow-500 text-black"
      case "low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "investigating":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(2)}B`
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    }
    return `$${amount.toLocaleString()}`
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Institutional Loan Compliance Bot
          </h1>
          <p className="text-muted-foreground mt-2">
            Government Guaranteed Mortgages • $100M Minimum Investment • 20% Compounded ROI
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-green-500 text-white">
            <Shield className="h-4 w-4 mr-2" />
            {complianceMetrics.overallScore}% Compliant
          </Badge>
          <Badge className="bg-blue-500 text-white">
            <DollarSign className="h-4 w-4 mr-2" />
            {complianceMetrics.institutionalROI}% ROI
          </Badge>
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Compounded Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {formatCurrency(complianceMetrics.compoundedInterestRevenue)}
            </div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              20% Annual Compound
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Investment Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{complianceMetrics.minimumInvestmentMet}%</div>
            <div className="flex items-center text-sm text-blue-600 mt-1">
              <CheckCircle className="h-4 w-4 mr-1" />
              $100M+ Portfolios
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 flex items-center gap-2">
              <Award className="h-4 w-4" />
              Government Bonds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{complianceMetrics.governmentBondCompliance}%</div>
            <div className="flex items-center text-sm text-purple-600 mt-1">
              <Lock className="h-4 w-4 mr-1" />
              Guarantee Validated
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{formatCurrency(complianceMetrics.monthlyRevenue)}</div>
            <div className="flex items-center text-sm text-orange-600 mt-1">
              <Zap className="h-4 w-4 mr-1" />
              Gov. Guaranteed
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="scan">Compliance Scan</TabsTrigger>
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          <TabsTrigger value="bonds">Bond Structures</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Real-time Monitoring */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Real-time Monitoring
                </CardTitle>
                <CardDescription>Live compliance status across all institutional portfolios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">FHA 30-Year Bonds</span>
                    <div className="flex items-center gap-2">
                      <Progress value={98} className="w-20 h-2" />
                      <Badge className="bg-green-500 text-white text-xs">98%</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">VA 50-Year Bonds</span>
                    <div className="flex items-center gap-2">
                      <Progress value={96} className="w-20 h-2" />
                      <Badge className="bg-green-500 text-white text-xs">96%</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">USDA 35-Year Bonds</span>
                    <div className="flex items-center gap-2">
                      <Progress value={94} className="w-20 h-2" />
                      <Badge className="bg-yellow-500 text-black text-xs">94%</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SBA 25-Year Bonds</span>
                    <div className="flex items-center gap-2">
                      <Progress value={99} className="w-20 h-2" />
                      <Badge className="bg-green-500 text-white text-xs">99%</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ROI Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  ROI Performance
                </CardTitle>
                <CardDescription>20% compounded interest revenue tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Target ROI (20%)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={100} className="w-20 h-2" />
                      <Badge className="bg-blue-500 text-white text-xs">20.3%</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Compound Growth</span>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="w-20 h-2" />
                      <Badge className="bg-green-500 text-white text-xs">+15.2%</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Risk-Adjusted Return</span>
                    <div className="flex items-center gap-2">
                      <Progress value={92} className="w-20 h-2" />
                      <Badge className="bg-purple-500 text-white text-xs">18.4%</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Government Guarantee</span>
                    <div className="flex items-center gap-2">
                      <Progress value={100} className="w-20 h-2" />
                      <Badge className="bg-green-500 text-white text-xs">100%</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Compliance Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAlerts.slice(0, 4).map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(alert.status)}
                      <div>
                        <p className="font-medium">{alert.type}</p>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {alert.bondType}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatCurrency(alert.investmentAmount)} • {alert.expectedROI}% ROI
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Scan Tab */}
        <TabsContent value="scan" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5" />
                Institutional Compliance Scanner
              </CardTitle>
              <CardDescription>
                Validate $100M+ portfolios against government bond structures and 20% ROI requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loanId">Loan Portfolio ID</Label>
                  <Input
                    id="loanId"
                    placeholder="Enter portfolio ID (e.g., INST-2024-001)"
                    value={selectedLoanId}
                    onChange={(e) => setSelectedLoanId(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scanType">Scan Type</Label>
                  <Select defaultValue="institutional">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="institutional">Institutional ($100M+)</SelectItem>
                      <SelectItem value="government">Government Bond Validation</SelectItem>
                      <SelectItem value="roi">ROI Compliance (20%)</SelectItem>
                      <SelectItem value="full">Full Compliance Audit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleComplianceScan}
                disabled={isScanning || !selectedLoanId}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Scanning Institutional Portfolio...
                  </>
                ) : (
                  <>
                    <Scan className="h-4 w-4 mr-2" />
                    Start Compliance Scan
                  </>
                )}
              </Button>

              {scanResults && (
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Scan Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Overall Score</p>
                          <p className="text-2xl font-bold text-green-600">{scanResults.overallScore}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Investment Amount</p>
                          <p className="text-2xl font-bold">{formatCurrency(scanResults.investmentAmount)}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium">Compliance Status:</p>
                        <div className="space-y-1">
                          {scanResults.checks?.map((check: any, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                              {check.passed ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-500" />
                              )}
                              <span className="text-sm">{check.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Active Compliance Alerts</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Configure Alerts
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <Card key={alert.id} className="border-l-4 border-l-red-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                        <Badge variant="outline">{alert.bondType}</Badge>
                        {getStatusIcon(alert.status)}
                        <span className="text-sm text-muted-foreground">{alert.status}</span>
                      </div>
                      <h3 className="text-lg font-semibold">{alert.type}</h3>
                      <p className="text-muted-foreground">{alert.message}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span>
                          <strong>Loan ID:</strong> {alert.loanId}
                        </span>
                        <span>
                          <strong>Investment:</strong> {formatCurrency(alert.investmentAmount)}
                        </span>
                        <span>
                          <strong>Expected ROI:</strong> {alert.expectedROI}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm">Resolve</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Bond Structures Tab */}
        <TabsContent value="bonds" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bondStructures.map((bond) => (
              <Card key={bond.type} className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    {bond.type} {bond.term}-Year Government Bond
                  </CardTitle>
                  <CardDescription>
                    {bond.guaranteeRate}% Government Guarantee • {bond.expectedROI}% Expected ROI
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Minimum Investment</p>
                      <p className="text-lg font-bold">{formatCurrency(bond.minimumInvestment)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expected ROI</p>
                      <p className="text-lg font-bold text-green-600">{bond.expectedROI}%</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Compliance Requirements:</p>
                    <div className="space-y-1">
                      {bond.complianceRequirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    View {bond.type} Portfolio Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Revenue Analytics
                </CardTitle>
                <CardDescription>Compounded interest revenue performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">
                      {formatCurrency(complianceMetrics.compoundedInterestRevenue)}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Compounded Revenue</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Monthly Revenue</span>
                      <span className="font-medium">{formatCurrency(complianceMetrics.monthlyRevenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Annual ROI</span>
                      <span className="font-medium text-green-600">{complianceMetrics.institutionalROI}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Compound Rate</span>
                      <span className="font-medium">20% Annual</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Investment Distribution
                </CardTitle>
                <CardDescription>$100M+ institutional portfolio allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bondStructures.map((bond, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{bond.type} Bonds</span>
                        <span className="text-sm">
                          {bond.type === "FHA"
                            ? "35%"
                            : bond.type === "VA"
                              ? "30%"
                              : bond.type === "USDA"
                                ? "20%"
                                : "15%"}
                        </span>
                      </div>
                      <Progress
                        value={bond.type === "FHA" ? 35 : bond.type === "VA" ? 30 : bond.type === "USDA" ? 20 : 15}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
