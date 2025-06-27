"use client"
import { LoanComplianceBot } from "@/components/compliance/loan-compliance-bot"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Building2, TrendingUp, Award, CheckCircle, Download, Settings, Phone, Mail, Globe } from "lucide-react"

export default function InstitutionalCompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Institutional Loan Compliance Center
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enterprise-grade compliance monitoring for government guaranteed mortgages with $100M minimum investment and
            20% compounded ROI
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge className="bg-green-500 text-white px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              96.2% Compliance Rate
            </Badge>
            <Badge className="bg-blue-500 text-white px-4 py-2">
              <TrendingUp className="h-4 w-4 mr-2" />
              20.3% Average ROI
            </Badge>
            <Badge className="bg-purple-500 text-white px-4 py-2">
              <Award className="h-4 w-4 mr-2" />
              Government Guaranteed
            </Badge>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Building2 className="h-5 w-5" />
                Institutional Grade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  $100M minimum investment
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Enterprise compliance monitoring
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Real-time portfolio tracking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Regulatory audit trails
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Shield className="h-5 w-5" />
                Government Guaranteed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  FHA 30-year bonds (100% guarantee)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  VA 50-year bonds (100% guarantee)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  USDA 35-year bonds (90% guarantee)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  SBA 25-year bonds (85% guarantee)
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <TrendingUp className="h-5 w-5" />
                20% Compounded ROI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  20% annual compounded returns
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Government-backed stability
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Risk-adjusted performance
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Institutional-grade returns
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Deployment Options */}
        <Card className="bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Deployment Architecture Options</CardTitle>
            <CardDescription className="text-center">
              Choose the deployment model that best fits your institutional requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-4 p-6 border rounded-lg bg-white">
                <Globe className="h-12 w-12 mx-auto text-blue-600" />
                <h3 className="text-lg font-semibold">Cloud Deployment</h3>
                <p className="text-sm text-muted-foreground">
                  Fully managed cloud solution with automatic scaling and 99.9% uptime SLA
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Instant deployment</li>
                  <li>• Auto-scaling infrastructure</li>
                  <li>• 24/7 monitoring</li>
                  <li>• Global redundancy</li>
                </ul>
                <Button className="w-full">Deploy to Cloud</Button>
              </div>

              <div className="text-center space-y-4 p-6 border rounded-lg bg-white">
                <Building2 className="h-12 w-12 mx-auto text-green-600" />
                <h3 className="text-lg font-semibold">On-Premises</h3>
                <p className="text-sm text-muted-foreground">
                  Complete control with on-premises deployment for maximum security and compliance
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Full data control</li>
                  <li>• Custom security policies</li>
                  <li>• Regulatory compliance</li>
                  <li>• Private infrastructure</li>
                </ul>
                <Button className="w-full bg-transparent" variant="outline">
                  On-Premises Setup
                </Button>
              </div>

              <div className="text-center space-y-4 p-6 border rounded-lg bg-white">
                <Shield className="h-12 w-12 mx-auto text-purple-600" />
                <h3 className="text-lg font-semibold">Hybrid Architecture</h3>
                <p className="text-sm text-muted-foreground">
                  Best of both worlds with hybrid cloud-premises deployment for flexibility
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Flexible deployment</li>
                  <li>• Data sovereignty</li>
                  <li>• Scalable resources</li>
                  <li>• Disaster recovery</li>
                </ul>
                <Button className="w-full bg-transparent" variant="outline">
                  Hybrid Solution
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Compliance Bot Interface */}
        <LoanComplianceBot />

        {/* Support and Contact */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Enterprise Support & Services</CardTitle>
            <CardDescription className="text-center">
              Dedicated support for institutional lenders with 24/7 technical assistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center space-y-2">
                <Phone className="h-8 w-8 mx-auto text-blue-600" />
                <h3 className="font-semibold">24/7 Phone Support</h3>
                <p className="text-sm text-muted-foreground">Direct line to compliance experts</p>
                <p className="text-sm font-medium">1-800-SNAPIFI</p>
              </div>
              <div className="text-center space-y-2">
                <Mail className="h-8 w-8 mx-auto text-green-600" />
                <h3 className="font-semibold">Priority Email</h3>
                <p className="text-sm text-muted-foreground">Guaranteed 1-hour response</p>
                <p className="text-sm font-medium">enterprise@snapifi.com</p>
              </div>
              <div className="text-center space-y-2">
                <Settings className="h-8 w-8 mx-auto text-purple-600" />
                <h3 className="font-semibold">Custom Integration</h3>
                <p className="text-sm text-muted-foreground">Tailored API integration</p>
                <p className="text-sm font-medium">Professional services</p>
              </div>
              <div className="text-center space-y-2">
                <Award className="h-8 w-8 mx-auto text-orange-600" />
                <h3 className="font-semibold">Compliance Expertise</h3>
                <p className="text-sm text-muted-foreground">Dedicated compliance team</p>
                <p className="text-sm font-medium">Regulatory guidance</p>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                Schedule Demo
              </Button>
              <Button size="lg" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Specs
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Guarantee */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <h2 className="text-2xl font-bold text-green-800">Compliance Guarantee</h2>
            </div>
            <p className="text-lg text-green-700 mb-4">
              We guarantee 95%+ compliance scores for all institutional portfolios meeting $100M minimum investment
              requirements
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Government Bond Validation</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span>20% ROI Assurance</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-green-600" />
                <span>Institutional Grade Security</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
