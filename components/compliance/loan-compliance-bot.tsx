"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bot,
  Shield,
  AlertTriangle,
  CheckCircle,
  FileText,
  TrendingUp,
  Building2,
  Users,
  Home,
  DollarSign,
  Eye,
  Download,
  RefreshCw,
  Settings,
  BarChart3,
  Zap,
  Search,
} from "lucide-react"

interface ComplianceRule {
  id: string
  category: string
  rule: string
  severity: "critical" | "high" | "medium" | "low"
  loanTypes: string[]
  description: string
  regulation: string
  autoCheck: boolean
  remediation: string
}

interface ComplianceAlert {
  id: string
  applicationId: string
  ruleId: string
  severity: "critical" | "high" | "medium" | "low"
  status: "active" | "resolved" | "pending"
  message: string
  createdAt: string
  resolvedAt?: string
  assignedTo?: string
}

interface LoanApplication {
  id: string
  applicantName: string
  loanType: "fha" | "va" | "usda" | "sba"
  loanAmount: number
  status: string
  complianceScore: number
  alertCount: number
  lastChecked: string
  bondStructure: {
    term: number
    guaranteeTerm: number
    daxMirror: string
  }
}

export function LoanComplianceBot() {
  const [activeAlerts, setActiveAlerts] = useState(0)
  const [totalApplications, setTotalApplications] = useState(0)
  const [complianceScore, setComplianceScore] = useState(0)
  const [isScanning, setIsScanning] = useState(false)
  const [selectedLoanType, setSelectedLoanType] = useState("all")
  const [selectedSeverity, setSelectedSeverity] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Sample compliance rules data
  const [complianceRules] = useState<ComplianceRule[]>([
    {
      id: "FHA-001",
      category: "Eligibility",
      rule: "Credit Score Minimum",
      severity: "critical",
      loanTypes: ["fha"],
      description: "Borrower must have minimum credit score of 580 for 3.5% down payment",
      regulation: "FHA Handbook 4000.1",
      autoCheck: true,
      remediation: "Require higher down payment or decline application",
    },
    {
      id: "FHA-002",
      category: "Documentation",
      rule: "Income Verification",
      severity: "critical",
      loanTypes: ["fha"],
      description: "Two years of tax returns and 30 days of pay stubs required",
      regulation: "FHA Handbook 4000.1 II.A.4.c.i",
      autoCheck: true,
      remediation: "Request missing documentation from borrower",
    },
    {
      id: "VA-001",
      category: "Eligibility",
      rule: "Military Service Verification",
      severity: "critical",
      loanTypes: ["va"],
      description: "Valid Certificate of Eligibility required for all VA loans",
      regulation: "38 CFR 36.4302",
      autoCheck: true,
      remediation: "Obtain COE from VA or veteran",
    },
    {
      id: "VA-002",
      category: "Bond Structure",
      rule: "50-Year VA Bond Compliance",
      severity: "high",
      loanTypes: ["va"],
      description: "VA 50-year bond must maintain full government guarantee throughout term",
      regulation: "VA Circular 26-20-16 (Modified)",
      autoCheck: true,
      remediation: "Verify government guarantee structure and DAX mirroring compliance",
    },
    {
      id: "USDA-001",
      category: "Property",
      rule: "Rural Area Eligibility",
      severity: "critical",
      loanTypes: ["usda"],
      description: "Property must be located in USDA eligible rural area",
      regulation: "7 CFR 3550.53",
      autoCheck: true,
      remediation: "Verify property location with USDA eligibility map",
    },
    {
      id: "USDA-002",
      category: "Bond Structure",
      rule: "35-Year Agricultural Bond Guarantee",
      severity: "medium",
      loanTypes: ["usda"],
      description: "USDA 50-year rural bond includes 35-year government guarantee period",
      regulation: "7 CFR 3550 (Modified for Bond Structure)",
      autoCheck: true,
      remediation: "Confirm agricultural DAX mirror pricing and guarantee terms",
    },
    {
      id: "SBA-001",
      category: "Business",
      rule: "Business Use Requirement",
      severity: "critical",
      loanTypes: ["sba"],
      description: "Loan proceeds must be used for eligible business purposes",
      regulation: "13 CFR 120.111",
      autoCheck: false,
      remediation: "Review business plan and use of funds documentation",
    },
    {
      id: "SBA-002",
      category: "Bond Structure",
      rule: "25-Year Corporate Bond Guarantee",
      severity: "high",
      loanTypes: ["sba"],
      description: "SBA 50-year business bond includes 25-year government guarantee with corporate DAX structure",
      regulation: "13 CFR 120 (Modified for Corporate Bond)",
      autoCheck: true,
      remediation: "Validate corporate DAX mirror compliance and guarantee structure",
    },
    {
      id: "DAX-001",
      category: "Bond Structure",
      rule: "DAX Secondary Market Compliance",
      severity: "high",
      loanTypes: ["fha", "va", "usda", "sba"],
      description: "All 50-year government bonds must mirror appropriate DAX corporate bond structures",
      regulation: "Internal Snapifi Bond Policy 2024-001",
      autoCheck: true,
      remediation: "Verify DAX mirror type, spread, and pricing compliance",
    },
    {
      id: "GEN-001",
      category: "Documentation",
      rule: "Anti-Money Laundering",
      severity: "critical",
      loanTypes: ["fha", "va", "usda", "sba"],
      description: "Complete AML verification required for all loan applications",
      regulation: "31 CFR 1020.220",
      autoCheck: true,
      remediation: "Complete enhanced due diligence and SAR filing if necessary",
    },
  ])

  // Sample alerts data
  const [alerts] = useState<ComplianceAlert[]>([
    {
      id: "ALT-001",
      applicationId: "APP-FHA-001",
      ruleId: "FHA-001",
      severity: "critical",
      status: "active",
      message: "Credit score of 565 below FHA minimum requirement of 580",
      createdAt: "2024-01-22T10:30:00Z",
      assignedTo: "compliance.team@snapifi.com",
    },
    {
      id: "ALT-002",
      applicationId: "APP-VA-001",
      ruleId: "VA-002",
      severity: "high",
      status: "pending",
      message: "VA 50-year bond structure requires verification of full-term government guarantee",
      createdAt: "2024-01-22T09:15:00Z",
      assignedTo: "bond.compliance@snapifi.com",
    },
    {
      id: "ALT-003",
      applicationId: "APP-USDA-001",
      ruleId: "USDA-001",
      severity: "critical",
      status: "resolved",
      message: "Property location verified as USDA eligible rural area",
      createdAt: "2024-01-21T14:20:00Z",
      resolvedAt: "2024-01-22T08:45:00Z",
      assignedTo: "rural.compliance@snapifi.com",
    },
    {
      id: "ALT-004",
      applicationId: "APP-SBA-001",
      ruleId: "DAX-001",
      severity: "high",
      status: "active",
      message: "SBA corporate bond DAX mirror requires validation against current corporate spreads",
      createdAt: "2024-01-22T11:45:00Z",
      assignedTo: "dax.compliance@snapifi.com",
    },
  ])

  // Sample loan applications data
  const [loanApplications] = useState<LoanApplication[]>([
    {
      id: "APP-FHA-001",
      applicantName: "John Smith",
      loanType: "fha",
      loanAmount: 350000,
      status: "Under Review",
      complianceScore: 72,
      alertCount: 1,
      lastChecked: "2024-01-22T10:30:00Z",
      bondStructure: {
        term: 50,
        guaranteeTerm: 30,
        daxMirror: "DAX Secondary",
      },
    },
    {
      id: "APP-VA-001",
      applicantName: "Sarah Johnson",
      loanType: "va",
      loanAmount: 425000,
      status: "Document Review",
      complianceScore: 89,
      alertCount: 1,
      lastChecked: "2024-01-22T09:15:00Z",
      bondStructure: {
        term: 50,
        guaranteeTerm: 50,
        daxMirror: "DAX Premium",
      },
    },
    {
      id: "APP-USDA-001",
      applicantName: "Mike Davis",
      loanType: "usda",
      loanAmount: 280000,
      status: "Approved",
      complianceScore: 96,
      alertCount: 0,
      lastChecked: "2024-01-22T08:45:00Z",
      bondStructure: {
        term: 50,
        guaranteeTerm: 35,
        daxMirror: "DAX Agricultural",
      },
    },
    {
      id: "APP-SBA-001",
      applicantName: "Tech Innovations LLC",
      loanType: "sba",
      loanAmount: 750000,
      status: "Bond Verification",
      complianceScore: 84,
      alertCount: 1,
      lastChecked: "2024-01-22T11:45:00Z",
      bondStructure: {
        term: 50,
        guaranteeTerm: 25,
        daxMirror: "DAX Corporate",
      },
    },
  ])

  useEffect(() => {
    // Calculate dashboard metrics
    const activeAlertsCount = alerts.filter((alert) => alert.status === "active").length
    const avgComplianceScore = Math.round(
      loanApplications.reduce((sum, app) => sum + app.complianceScore, 0) / loanApplications.length,
    )

    setActiveAlerts(activeAlertsCount)
    setTotalApplications(loanApplications.length)
    setComplianceScore(avgComplianceScore)
  }, [alerts, loanApplications])

  const filteredApplications = loanApplications.filter((app) => {
    const matchesLoanType = selectedLoanType === "all" || app.loanType === selectedLoanType
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesLoanType && matchesSearch
  })

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity = selectedSeverity === "all" || alert.severity === selectedSeverity
    const rule = complianceRules.find((r) => r.id === alert.ruleId)
    const matchesLoanType = selectedLoanType === "all" || (rule && rule.loanTypes.includes(selectedLoanType))
    return matchesSeverity && matchesLoanType
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "resolved":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getComplianceScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400"
    if (score >= 75) return "text-yellow-400"
    return "text-red-400"
  }

  const getLoanTypeIcon = (loanType: string) => {
    switch (loanType) {
      case "fha":
        return <Home className="h-4 w-4" />
      case "va":
        return <Shield className="h-4 w-4" />
      case "usda":
        return <Building2 className="h-4 w-4" />
      case "sba":
        return <Users className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const runComplianceCheck = async () => {
    setIsScanning(true)
    // Simulate compliance scanning
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsScanning(false)
    // In a real implementation, this would trigger a full compliance scan
  }

  const exportComplianceReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalApplications,
        activeAlerts,
        averageComplianceScore: complianceScore,
        bondStructureCompliance: "98.5%",
        daxMirrorCompliance: "96.2%",
      },
      applications: filteredApplications,
      alerts: filteredAlerts,
      rules: complianceRules,
    }

    const dataStr = JSON.stringify(reportData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `loan-compliance-report-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="space-y-6">
      {/* Bot Header */}
      <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/30 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bot className="h-6 w-6 text-purple-400" />
            Snapifi Loan Compliance Bot
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 ml-2">Institutional Grade</Badge>
          </CardTitle>
          <CardDescription className="text-purple-200">
            Automated compliance monitoring for government-backed 50-year bond loans with DAX mirroring
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{totalApplications}</div>
              <div className="text-sm text-purple-300">Active Applications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{activeAlerts}</div>
              <div className="text-sm text-purple-300">Active Alerts</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getComplianceScoreColor(complianceScore)}`}>{complianceScore}%</div>
              <div className="text-sm text-purple-300">Compliance Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">98.5%</div>
              <div className="text-sm text-purple-300">Bond Compliance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">96.2%</div>
              <div className="text-sm text-purple-300">DAX Mirror Compliance</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={runComplianceCheck}
              disabled={isScanning}
              className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Run Full Compliance Check
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={exportComplianceReport}
              className="border-purple-500/30 text-purple-300 bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" className="border-purple-500/30 text-purple-300 bg-transparent">
              <Settings className="h-4 w-4 mr-2" />
              Configure Rules
            </Button>
          </div>

          {isScanning && (
            <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-3 mb-2">
                <Bot className="h-5 w-5 text-blue-400" />
                <span className="text-white font-medium">Compliance Bot Scanning</span>
              </div>
              <Progress value={66} className="h-2 mb-2" />
              <p className="text-sm text-blue-300">
                Checking bond structures, DAX mirroring compliance, and government regulations...
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-blue-400" />
              <Input
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-blue-800/30 border-blue-500/30 text-white"
              />
            </div>
            <Select value={selectedLoanType} onValueChange={setSelectedLoanType}>
              <SelectTrigger className="w-48 bg-blue-800/30 border-blue-500/30 text-white">
                <SelectValue placeholder="Loan Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Loan Types</SelectItem>
                <SelectItem value="fha">FHA 50-Year Bond</SelectItem>
                <SelectItem value="va">VA 50-Year Bond</SelectItem>
                <SelectItem value="usda">USDA 50-Year Rural</SelectItem>
                <SelectItem value="sba">SBA 50-Year Business</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger className="w-48 bg-blue-800/30 border-blue-500/30 text-white">
                <SelectValue placeholder="Alert Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-blue-900/30 backdrop-blur-sm">
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="rules">Compliance Rules</TabsTrigger>
          <TabsTrigger value="bond-compliance">Bond Compliance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <Card className="bg-gradient-to-br from-green-900/50 to-blue-900/30 backdrop-blur-sm border-green-500/20">
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No Active Alerts</h3>
                <p className="text-green-200">All loan applications are currently in compliance.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredAlerts.map((alert) => {
                const rule = complianceRules.find((r) => r.id === alert.ruleId)
                const application = loanApplications.find((app) => app.id === alert.applicationId)

                return (
                  <Card
                    key={alert.id}
                    className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg bg-red-500/20 border border-red-500/30">
                            <AlertTriangle className="h-5 w-5 text-red-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-white">{rule?.rule || "Unknown Rule"}</h3>
                              <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                              <Badge className={getStatusColor(alert.status)}>{alert.status.toUpperCase()}</Badge>
                            </div>
                            <p className="text-blue-200 mb-2">{alert.message}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-blue-300">Application:</span>
                                <div className="flex items-center gap-1 text-white">
                                  {application && getLoanTypeIcon(application.loanType)}
                                  {alert.applicationId}
                                </div>
                              </div>
                              <div>
                                <span className="text-blue-300">Applicant:</span>
                                <div className="text-white">{application?.applicantName || "Unknown"}</div>
                              </div>
                              <div>
                                <span className="text-blue-300">Created:</span>
                                <div className="text-white">{new Date(alert.createdAt).toLocaleDateString()}</div>
                              </div>
                              <div>
                                <span className="text-blue-300">Assigned To:</span>
                                <div className="text-white">{alert.assignedTo || "Unassigned"}</div>
                              </div>
                            </div>
                            {rule && (
                              <div className="mt-3 p-3 bg-blue-800/30 rounded-lg border border-blue-500/20">
                                <div className="text-sm">
                                  <span className="text-blue-300">Regulation:</span>
                                  <span className="text-white ml-2">{rule.regulation}</span>
                                </div>
                                <div className="text-sm mt-1">
                                  <span className="text-blue-300">Remediation:</span>
                                  <span className="text-white ml-2">{rule.remediation}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-500/30 text-blue-300 bg-transparent"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-green-500/30 text-green-300 bg-transparent"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Resolve
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <div className="grid gap-4">
            {filteredApplications.map((app) => (
              <Card
                key={app.id}
                className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
                        {getLoanTypeIcon(app.loanType)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{app.applicantName}</h3>
                        <p className="text-blue-200">
                          {app.id} • {app.loanType.toUpperCase()} 50-Year Bond
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="text-blue-300">
                            Amount: <span className="text-white">${app.loanAmount.toLocaleString()}</span>
                          </span>
                          <span className="text-blue-300">
                            Status: <span className="text-white">{app.status}</span>
                          </span>
                          <span className="text-blue-300">
                            Bond:{" "}
                            <span className="text-white">
                              {app.bondStructure.term}yr ({app.bondStructure.guaranteeTerm}yr guarantee)
                            </span>
                          </span>
                          <span className="text-blue-300">
                            DAX Mirror: <span className="text-white">{app.bondStructure.daxMirror}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="text-center">
                          <div className={`text-2xl font-bold ${getComplianceScoreColor(app.complianceScore)}`}>
                            {app.complianceScore}%
                          </div>
                          <div className="text-sm text-blue-300">Compliance Score</div>
                        </div>
                        <div className="text-center">
                          <div
                            className={`text-2xl font-bold ${app.alertCount > 0 ? "text-red-400" : "text-green-400"}`}
                          >
                            {app.alertCount}
                          </div>
                          <div className="text-sm text-blue-300">Active Alerts</div>
                        </div>
                      </div>
                      <div className="text-sm text-blue-300">
                        Last Checked: {new Date(app.lastChecked).toLocaleString()}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-300 bg-transparent">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-purple-500/30 text-purple-300 bg-transparent"
                        >
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Re-scan
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <div className="grid gap-4">
            {complianceRules.map((rule) => (
              <Card
                key={rule.id}
                className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-white">{rule.rule}</h3>
                        <Badge className={getSeverityColor(rule.severity)}>{rule.severity.toUpperCase()}</Badge>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{rule.category}</Badge>
                        {rule.autoCheck && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">AUTO-CHECK</Badge>
                        )}
                      </div>
                      <p className="text-blue-200 mb-3">{rule.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-blue-300">Regulation:</span>
                          <div className="text-white">{rule.regulation}</div>
                        </div>
                        <div>
                          <span className="text-blue-300">Applies To:</span>
                          <div className="flex gap-1 mt-1">
                            {rule.loanTypes.map((type) => (
                              <Badge key={type} variant="outline" className="text-xs border-blue-500/30 text-blue-300">
                                {type.toUpperCase()}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-yellow-800/30 rounded-lg border border-yellow-500/20">
                        <div className="text-sm">
                          <span className="text-yellow-300">Remediation:</span>
                          <div className="text-white mt-1">{rule.remediation}</div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-300 bg-transparent">
                      <Settings className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bond-compliance" className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/30 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-400" />
                50-Year Bond Structure Compliance
              </CardTitle>
              <CardDescription className="text-purple-200">
                Monitoring compliance across all government bond structures with DAX mirroring
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-500/20 text-center">
                  <div className="text-2xl font-bold text-blue-400">98.5%</div>
                  <div className="text-sm text-blue-300">FHA Bond Compliance</div>
                  <div className="text-xs text-blue-400 mt-1">30-year guarantee structure</div>
                </div>
                <div className="bg-green-800/30 p-4 rounded-lg border border-green-500/20 text-center">
                  <div className="text-2xl font-bold text-green-400">99.2%</div>
                  <div className="text-sm text-green-300">VA Bond Compliance</div>
                  <div className="text-xs text-green-400 mt-1">Full 50-year guarantee</div>
                </div>
                <div className="bg-orange-800/30 p-4 rounded-lg border border-orange-500/20 text-center">
                  <div className="text-2xl font-bold text-orange-400">97.8%</div>
                  <div className="text-sm text-orange-300">USDA Bond Compliance</div>
                  <div className="text-xs text-orange-400 mt-1">35-year rural guarantee</div>
                </div>
                <div className="bg-purple-800/30 p-4 rounded-lg border border-purple-500/20 text-center">
                  <div className="text-2xl font-bold text-purple-400">95.1%</div>
                  <div className="text-sm text-purple-300">SBA Bond Compliance</div>
                  <div className="text-xs text-purple-400 mt-1">25-year business guarantee</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-white">DAX Mirror Compliance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-800/30 rounded-lg border border-blue-500/20">
                      <span className="text-blue-300">DAX Secondary Market (FHA)</span>
                      <div className="flex items-center gap-2">
                        <div className="text-white font-medium">96.8%</div>
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-800/30 rounded-lg border border-green-500/20">
                      <span className="text-green-300">DAX Premium (VA)</span>
                      <div className="flex items-center gap-2">
                        <div className="text-white font-medium">98.9%</div>
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-800/30 rounded-lg border border-orange-500/20">
                      <span className="text-orange-300">DAX Agricultural (USDA)</span>
                      <div className="flex items-center gap-2">
                        <div className="text-white font-medium">94.7%</div>
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-800/30 rounded-lg border border-purple-500/20">
                      <span className="text-purple-300">DAX Corporate (SBA)</span>
                      <div className="flex items-center gap-2">
                        <div className="text-white font-medium">93.2%</div>
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-white">Government Guarantee Compliance</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-800/30 rounded-lg border border-blue-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-blue-300">FHA 30-Year Guarantee</span>
                        <span className="text-white font-medium">98.5%</span>
                      </div>
                      <Progress value={98.5} className="h-2" />
                    </div>
                    <div className="p-3 bg-green-800/30 rounded-lg border border-green-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-green-300">VA 50-Year Guarantee</span>
                        <span className="text-white font-medium">99.2%</span>
                      </div>
                      <Progress value={99.2} className="h-2" />
                    </div>
                    <div className="p-3 bg-orange-800/30 rounded-lg border border-orange-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-orange-300">USDA 35-Year Guarantee</span>
                        <span className="text-white font-medium">97.8%</span>
                      </div>
                      <Progress value={97.8} className="h-2" />
                    </div>
                    <div className="p-3 bg-purple-800/30 rounded-lg border border-purple-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-purple-300">SBA 25-Year Guarantee</span>
                        <span className="text-white font-medium">95.1%</span>
                      </div>
                      <Progress value={95.1} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-6 rounded-lg border border-green-500/20">
                <h4 className="font-medium text-white mb-4">Bond Structure Compliance Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h5 className="text-green-300 mb-2">Compliant Items</h5>
                    <ul className="space-y-1 text-green-200">
                      <li>• 50-year amortization structure properly implemented</li>
                      <li>• Government guarantee periods correctly configured</li>
                      <li>• DAX corporate bond mirroring active</li>
                      <li>• Secondary market liquidity provisions in place</li>
                      <li>• Bond yield calculations compliant</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-yellow-300 mb-2">Areas for Improvement</h5>
                    <ul className="space-y-1 text-yellow-200">
                      <li>• SBA corporate DAX spreads require review</li>
                      <li>• USDA agricultural bond pricing optimization</li>
                      <li>• Post-guarantee period structure documentation</li>
                      <li>• Enhanced bond covenant monitoring</li>
                      <li>• Automated yield curve adjustments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  Compliance Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">+5.2%</div>
                    <div className="text-sm text-green-300">Compliance Improvement</div>
                    <div className="text-xs text-green-400">vs Last Month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">-18%</div>
                    <div className="text-sm text-blue-300">Fewer Critical Alerts</div>
                    <div className="text-xs text-blue-400">vs Last Month</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-blue-300">Overall Compliance</span>
                      <span className="text-white">96.2%</span>
                    </div>
                    <Progress value={96.2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-blue-300">Bond Structure Compliance</span>
                      <span className="text-white">98.5%</span>
                    </div>
                    <Progress value={98.5} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-blue-300">DAX Mirror Compliance</span>
                      <span className="text-white">96.2%</span>
                    </div>
                    <Progress value={96.2} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-400" />
                  Alert Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-red-800/30 p-3 rounded-lg border border-red-500/20">
                    <div className="text-xl font-bold text-red-400">2</div>
                    <div className="text-sm text-red-300">Critical</div>
                  </div>
                  <div className="bg-orange-800/30 p-3 rounded-lg border border-orange-500/20">
                    <div className="text-xl font-bold text-orange-400">3</div>
                    <div className="text-sm text-orange-300">High</div>
                  </div>
                  <div className="bg-yellow-800/30 p-3 rounded-lg border border-yellow-500/20">
                    <div className="text-xl font-bold text-yellow-400">1</div>
                    <div className="text-sm text-yellow-300">Medium</div>
                  </div>
                  <div className="bg-blue-800/30 p-3 rounded-lg border border-blue-500/20">
                    <div className="text-xl font-bold text-blue-400">0</div>
                    <div className="text-sm text-blue-300">Low</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-purple-300">Alert Resolution Time</div>
                  <div className="flex justify-between">
                    <span className="text-purple-200">Average:</span>
                    <span className="text-white">2.3 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-200">Target:</span>
                    <span className="text-white">4.0 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-green-900/50 to-blue-900/30 backdrop-blur-sm border-green-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-400" />
                Financial Impact
              </CardTitle>
              <CardDescription className="text-green-200">
                Cost savings and risk mitigation through automated compliance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">$2.3M</div>
                  <div className="text-sm text-green-300">Risk Mitigation</div>
                  <div className="text-xs text-green-400">This Quarter</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">$450K</div>
                  <div className="text-sm text-blue-300">Compliance Savings</div>
                  <div className="text-xs text-blue-400">Automation Benefits</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">98.7%</div>
                  <div className="text-sm text-purple-300">Accuracy Rate</div>
                  <div className="text-xs text-purple-400">vs Manual Review</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">72%</div>
                  <div className="text-sm text-orange-300">Time Reduction</div>
                  <div className="text-xs text-orange-400">Processing Speed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
