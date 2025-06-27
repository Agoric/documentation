"use client"

import { LoanComplianceBot } from "@/components/compliance/loan-compliance-bot"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Building2, Bot, Zap, Globe, TrendingUp, FileText, Users } from "lucide-react"

export default function InstitutionalCompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Institutional Compliance Hub
              </h1>
              <p className="text-xl text-blue-200 mt-2">AI-Powered Compliance Bot for 50-Year Government Bond Loans</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Institutional Grade</Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">50-Year Bond Structure</Badge>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">DAX Mirroring</Badge>
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Real-Time Monitoring</Badge>
          </div>
        </div>

        {/* Feature Overview */}
        <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-400" />
              Institutional Lender Benefits
            </CardTitle>
            <CardDescription className="text-blue-200">
              Advanced compliance automation for government-backed bond structures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 mx-auto w-fit">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-white">Real-Time Scanning</h3>
                <p className="text-sm text-blue-200">
                  Automated compliance checks across all government loan programs with instant alerts
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto w-fit">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-white">DAX Mirror Compliance</h3>
                <p className="text-sm text-blue-200">
                  Ensures 50-year bonds properly mirror DAX corporate bond structures and pricing
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 mx-auto w-fit">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-white">Risk Mitigation</h3>
                <p className="text-sm text-blue-200">
                  Advanced analytics reduce institutional risk and improve portfolio performance
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 mx-auto w-fit">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-white">Regulatory Reporting</h3>
                <p className="text-sm text-blue-200">
                  Automated compliance reports for regulators and internal audit requirements
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Bot */}
        <LoanComplianceBot />

        {/* Integration Information */}
        <Card className="bg-gradient-to-br from-green-900/50 to-blue-900/30 backdrop-blur-sm border-green-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Building2 className="h-5 w-5 text-green-400" />
              Institutional Integration
            </CardTitle>
            <CardDescription className="text-green-200">
              Deploy the compliance bot within your institutional lending infrastructure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-white">API Integration</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-green-800/30 rounded-lg border border-green-500/20">
                    <div className="font-medium text-white mb-1">REST API Endpoints</div>
                    <div className="text-sm text-green-300">
                      Full REST API for compliance scanning, alert management, and reporting
                    </div>
                  </div>
                  <div className="p-3 bg-blue-800/30 rounded-lg border border-blue-500/20">
                    <div className="font-medium text-white mb-1">Real-Time Webhooks</div>
                    <div className="text-sm text-blue-300">
                      Instant notifications for critical compliance issues and bond structure alerts
                    </div>
                  </div>
                  <div className="p-3 bg-purple-800/30 rounded-lg border border-purple-500/20">
                    <div className="font-medium text-white mb-1">Custom Rules Engine</div>
                    <div className="text-sm text-purple-300">
                      Configure institution-specific compliance rules and thresholds
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-white">Deployment Options</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-orange-800/30 rounded-lg border border-orange-500/20">
                    <div className="font-medium text-white mb-1">Cloud Deployment</div>
                    <div className="text-sm text-orange-300">Fully managed cloud solution with 99.9% uptime SLA</div>
                  </div>
                  <div className="p-3 bg-cyan-800/30 rounded-lg border border-cyan-500/20">
                    <div className="font-medium text-white mb-1">On-Premises Option</div>
                    <div className="text-sm text-cyan-300">
                      Deploy within your data center for maximum security and control
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-800/30 rounded-lg border border-yellow-500/20">
                    <div className="font-medium text-white mb-1">Hybrid Architecture</div>
                    <div className="text-sm text-yellow-300">
                      Combine cloud analytics with on-premises data processing
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-6 rounded-lg border border-green-500/20">
              <h4 className="font-medium text-white mb-4">Implementation Support</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">24/7</div>
                  <div className="text-green-300">Technical Support</div>
                  <div className="text-xs text-green-400 mt-1">Dedicated compliance team</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">30 Days</div>
                  <div className="text-blue-300">Implementation Time</div>
                  <div className="text-xs text-blue-400 mt-1">Full integration timeline</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">99.9%</div>
                  <div className="text-purple-300">Accuracy Rate</div>
                  <div className="text-xs text-purple-400 mt-1">Compliance detection</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                <Users className="h-4 w-4 mr-2" />
                Schedule Demo
              </Button>
              <Button variant="outline" className="border-green-500/30 text-green-300 bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                Technical Documentation
              </Button>
              <Button variant="outline" className="border-blue-500/30 text-blue-300 bg-transparent">
                <Shield className="h-4 w-4 mr-2" />
                Security Whitepaper
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
