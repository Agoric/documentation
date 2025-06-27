"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Bot,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  TrendingUp,
  Activity,
  Zap,
  Settings,
  Download,
  RefreshCw,
  Eye,
  AlertCircle,
  Target,
  BarChart3,
  DollarSign,
} from "lucide-react"

interface ComplianceAlert {
  id: string
  loanId: string
  severity: "critical" | "high" | "medium" | "low"
  type: string
  message: string
  timestamp: string
  status: "active" | "resolved" | "investigating"
  bondType?: string
}

interface ComplianceMetrics {
  overallScore: number
  totalLoans: number
  compliantLoans: number
  activeAlerts: number
  resolvedToday: number
  avgProcessingTime: number
  riskMitigation: number
}

export function LoanComplianceBot() {
  const [isScanning, setIsScanning] = useState(false)
  const [lastScan, setLastScan] = useState<Date>(new Date())
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")

  const metrics: ComplianceMetrics = {
    overallScore: 96.2,
    totalLoans: 1247,
    compliantLoans: 1199,
    activeAlerts: 23,
    resolvedToday: 15,
    avgProcessingTime: 2.3,
    riskMitigation: 2300000,
  }

  const alerts: ComplianceAlert[] = [
    {
      id: "COMP-001",
      loanId: "FHA-2024-0892",
      severity: "critical",
      type: "FHA Bond Structure",
      message: "30-year guarantee period verification failed - requires manual review",
      timestamp: "2024-01-20 14:32:15",
      status: "active",
      bondType: "FHA 30-Year",
    },
    {
      id: "COMP-002",
      loanId: "VA-2024-0445",
      severity: "high",
      type: "DAX Mirror Compliance",
      message: "Corporate bond mirroring structure needs validation",
      timestamp: "2024-01-20 13:45:22",
      status: "investigating",
      bondType: "VA 50-Year",
    },
    {
      id: "COMP-003",
      loanId: "USDA-2024-0234",
      severity: "medium",
      type: "Documentation",
      message: "Rural development certification pending verification",
      timestamp: "2024-01-20 12:18:33",
      status: "active",
      bondType: "USDA 35-Year",
    },
    {
      id: "COMP-004",
      loanId: "SBA-2024-0156",
      severity: "low",
      type: "Business Verification",
      message: "Small business status confirmation required",
      timestamp: "2024-01-20 11:22:44",
      status: "resolved",
      bondType: "SBA 25-Year",
    },
  ]

  const bondStructures = [
    {
      type: "FHA 30-Year",
      totalLoans: 342,
      compliant: 338,
      complianceRate: 98.8,
      avgGuaranteePeriod: "30 years",
      daxMirrorStatus: "Active",
    },
    {
      type: "VA 50-Year",
      totalLoans: 289,
      compliant: 285,
      complianceRate: 98.6,
      avgGuaranteePeriod: "50 years",
      daxMirrorStatus: "Active",
    },
    {
      type: "USDA 35-Year",
      totalLoans: 198,
      compliant: 192,
      complianceRate: 97.0,
      avgGuaranteePeriod: "35 years",
      daxMirrorStatus: "Active",
    },
    {
      type: "SBA 25-Year",
      totalLoans: 418,
      compliant: 384,
      complianceRate: 91.9,
      avgGuaranteePeriod: "25 years",
      daxMirrorStatus: "Active",
    },
  ]

  const handleScan = async () => {
    setIsScanning(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsScanning(false)
    setLastScan(new Date())
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "high":
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "low":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
            <Bot className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Loan Compliance Bot</h1>
            <p className="text-muted-foreground">AI-powered compliance monitoring for institutional lenders</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-green-500 text-white">
            <Activity className="h-3 w-3 mr-1" />
            Online
          </Badge>
          <Button onClick={handleScan} disabled={isScanning}>
            {isScanning ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Zap className="h-4 w-4 mr-2" />}
            {isScanning ? "Scanning..." : "Run Scan"}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics.overallScore}%</div>
            <Progress value={metrics.overallScore} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {metrics.compliantLoans} of {metrics.totalLoans} loans compliant
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{metrics.activeAlerts}</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              {metrics.resolvedToday} resolved today
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Processing Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avgProcessingTime}min</div>
            <p className="text-xs text-muted-foreground mt-1">Average scan time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Risk Mitigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${(metrics.riskMitigation / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground mt-1">Quarterly savings</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          <TabsTrigger value="bonds">Bond Structures</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Compliance Alerts
              </CardTitle>
              <CardDescription>Real-time compliance monitoring and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {getSeverityIcon(alert.severity)}
                      <div className={`w-2 h-2 rounded-full ${getSeverityColor(alert.severity)}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{alert.loanId}</span>
                        <Badge variant="outline">{alert.bondType}</Badge>
                        <Badge variant={alert.status === "resolved" ? "default" : "secondary"} className="capitalize">
                          {alert.status}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-sm">{alert.type}</h4>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bonds" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Government Bond Structures
              </CardTitle>
              <CardDescription>50-year bond compliance with DAX mirroring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bondStructures.map((bond, index) => (
                  <Card key={index} className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{bond.type}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500 text-white">{bond.complianceRate}% Compliant</Badge>
                        <Badge variant="outline">{bond.daxMirrorStatus}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Total Loans</p>
                          <p className="font-medium">{bond.totalLoans}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Compliant</p>
                          <p className="font-medium text-green-600">{bond.compliant}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Guarantee Period</p>
                          <p className="font-medium">{bond.avgGuaranteePeriod}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">DAX Mirror</p>
                          <p className="font-medium text-blue-600">{bond.daxMirrorStatus}</p>
                        </div>
                      </div>
                      <Progress value={bond.complianceRate} className="h-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Compliance Trends
                </CardTitle>
                <CardDescription>Historical compliance performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Compliance trend chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
                <CardDescription>Bot performance and accuracy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Accuracy Rate</span>
                  <span className="font-bold text-green-600">98.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>False Positives</span>
                  <span className="font-bold">1.3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Processing Speed</span>
                  <span className="font-bold text-blue-600">72% faster</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Cost Savings</span>
                  <span className="font-bold text-green-600">$450K/year</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                ROI Analysis
              </CardTitle>
              <CardDescription>Return on investment and cost benefits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">$2.3M</div>
                  <p className="text-sm text-green-700">Risk Mitigation</p>
                  <p className="text-xs text-muted-foreground">Quarterly</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">72%</div>
                  <p className="text-sm text-blue-700">Time Reduction</p>
                  <p className="text-xs text-muted-foreground">vs Manual Review</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">24/7</div>
                  <p className="text-sm text-purple-700">Monitoring</p>
                  <p className="text-xs text-muted-foreground">Continuous</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Bot Configuration
              </CardTitle>
              <CardDescription>Configure compliance rules and thresholds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Scan Settings</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Auto-scan frequency</span>
                      <Badge variant="outline">Every 15 minutes</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Alert threshold</span>
                      <Badge variant="outline">Medium & above</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Batch processing</span>
                      <Badge variant="outline">Enabled</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Notification Settings</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Email alerts</span>
                      <Badge className="bg-green-500 text-white">Enabled</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Webhook notifications</span>
                      <Badge className="bg-green-500 text-white">Enabled</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">SMS alerts (Critical)</span>
                      <Badge className="bg-green-500 text-white">Enabled</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  Configure Rules
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Status Bar */}
      <Alert>
        <Bot className="h-4 w-4" />
        <AlertDescription>
          Last scan completed at {lastScan.toLocaleTimeString()}. Next automated scan in 12 minutes. System operating at
          99.8% uptime.
        </AlertDescription>
      </Alert>
    </div>
  )
}
