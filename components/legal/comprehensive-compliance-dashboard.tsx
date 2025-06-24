"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Globe,
  FileText,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Languages,
  FilePenLineIcon as Signature,
  Database,
} from "lucide-react"
import BlockchainLegalRegistry from "./blockchain-legal-registry"

interface ComplianceMetrics {
  legalAgreementCoverage: number
  privacyComplianceScore: number
  fairProcessCompletionRate: number
  internationalCooperationIndex: number
  fraudDetectionAccuracy: number
  totalJurisdictions: number
  activeTreaties: number
  supportedLanguages: number
  digitalSignatures: number
}

interface ComplianceAlert {
  id: string
  type: "warning" | "error" | "info"
  title: string
  description: string
  jurisdiction: string
  priority: "low" | "medium" | "high" | "critical"
  timestamp: number
}

export default function ComprehensiveComplianceDashboard() {
  const [metrics, setMetrics] = useState<ComplianceMetrics>({
    legalAgreementCoverage: 87,
    privacyComplianceScore: 94,
    fairProcessCompletionRate: 98,
    internationalCooperationIndex: 91,
    fraudDetectionAccuracy: 95.7,
    totalJurisdictions: 195,
    activeTreaties: 342,
    supportedLanguages: 50,
    digitalSignatures: 1247,
  })

  const [alerts, setAlerts] = useState<ComplianceAlert[]>([
    {
      id: "1",
      type: "warning",
      title: "GDPR Compliance Review Required",
      description: "Annual GDPR compliance review due in 30 days for EU operations",
      jurisdiction: "EU",
      priority: "high",
      timestamp: Date.now() - 3600000,
    },
    {
      id: "2",
      type: "info",
      title: "New Treaty Ratification",
      description: "Digital Services Agreement ratified by 5 new countries",
      jurisdiction: "Global",
      priority: "medium",
      timestamp: Date.now() - 7200000,
    },
    {
      id: "3",
      type: "error",
      title: "Jurisdiction Conflict Detected",
      description: "Conflicting regulations detected between US and UK for financial services",
      jurisdiction: "US-UK",
      priority: "critical",
      timestamp: Date.now() - 1800000,
    },
  ])

  const [activeTab, setActiveTab] = useState("overview")

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warning":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "info":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-blue-600" />
        <h1 className="text-3xl font-bold">Legal Compliance & Governance Dashboard</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain Registry</TabsTrigger>
          <TabsTrigger value="treaties">Treaties</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="signatures">Digital Signatures</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Legal Agreement Coverage</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.legalAgreementCoverage}%</div>
                <Progress value={metrics.legalAgreementCoverage} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((metrics.totalJurisdictions * metrics.legalAgreementCoverage) / 100)} of{" "}
                  {metrics.totalJurisdictions} jurisdictions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Privacy Compliance</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.privacyComplianceScore}%</div>
                <Progress value={metrics.privacyComplianceScore} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">GDPR, CCPA, PIPEDA compliant</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fair Process Rate</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.fairProcessCompletionRate}%</div>
                <Progress value={metrics.fairProcessCompletionRate} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">Cases resolved within SLA</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fraud Detection</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.fraudDetectionAccuracy}%</div>
                <Progress value={metrics.fraudDetectionAccuracy} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">Accuracy with 0.3% false positives</p>
              </CardContent>
            </Card>
          </div>

          {/* International Cooperation */}
          <Card>
            <CardHeader>
              <CardTitle>International Cooperation Status</CardTitle>
              <CardDescription>Global legal framework alignment and cooperation metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{metrics.activeTreaties}</div>
                  <p className="text-sm text-muted-foreground">Active Treaties</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{metrics.supportedLanguages}</div>
                  <p className="text-sm text-muted-foreground">Supported Languages</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{metrics.digitalSignatures}</div>
                  <p className="text-sm text-muted-foreground">Digital Signatures</p>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">International Cooperation Index</span>
                  <span className="text-sm text-muted-foreground">{metrics.internationalCooperationIndex}%</span>
                </div>
                <Progress value={metrics.internationalCooperationIndex} />
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Compliance Alerts</CardTitle>
              <CardDescription>Latest compliance issues and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{alert.title}</h4>
                        <Badge className={getPriorityColor(alert.priority)}>{alert.priority}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <span>{alert.jurisdiction}</span>
                        <span>•</span>
                        <span>{new Date(alert.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blockchain">
          <BlockchainLegalRegistry />
        </TabsContent>

        <TabsContent value="treaties" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>International Treaties Database</CardTitle>
              <CardDescription>Comprehensive database of international legal agreements and treaties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Treaties Database</h3>
                <p className="text-muted-foreground mb-4">
                  Access to {metrics.activeTreaties} international treaties and legal frameworks
                </p>
                <Button>Browse Treaties</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="languages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Multi-Language Support</CardTitle>
              <CardDescription>Legal document translation and language support system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Languages className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Language Support</h3>
                <p className="text-muted-foreground mb-4">
                  Supporting {metrics.supportedLanguages} languages with certified legal translations
                </p>
                <Button>Manage Languages</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signatures" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Digital Signature System</CardTitle>
              <CardDescription>Legally binding digital signatures and certificate management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Signature className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Digital Signatures</h3>
                <p className="text-muted-foreground mb-4">
                  {metrics.digitalSignatures} signatures processed with legal validity
                </p>
                <Button>Signature Management</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <Card key={alert.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getAlertIcon(alert.type)}
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                    </div>
                    <Badge className={getPriorityColor(alert.priority)}>{alert.priority}</Badge>
                  </div>
                  <CardDescription>{alert.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Jurisdiction: {alert.jurisdiction}</span>
                    <span>{new Date(alert.timestamp).toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
