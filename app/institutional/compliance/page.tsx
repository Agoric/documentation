"use client"

import { LoanComplianceBot } from "@/components/compliance/loan-compliance-bot"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Download, Settings, Phone, Mail, Globe } from "lucide-react"

export default function InstitutionalCompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Institutional Compliance Center</h1>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Advanced loan compliance monitoring for institutional lenders with 50-year government bond structures and
            DAX mirroring
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge className="bg-green-600 text-white text-lg px-4 py-2">
              <Shield className="w-5 h-5 mr-2" />
              Enterprise Grade
            </Badge>
            <Badge className="bg-blue-600 text-white text-lg px-4 py-2">
              <Globe className="w-5 h-5 mr-2" />
              24/7 Monitoring
            </Badge>
          </div>
        </div>

        {/* Compliance Bot */}
        <LoanComplianceBot />

        {/* Deployment Options */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Cloud Deployment</CardTitle>
              <CardDescription className="text-slate-300">
                Fully managed cloud solution with automatic scaling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-slate-300">
                <li>• 99.9% uptime SLA</li>
                <li>• Automatic updates</li>
                <li>• Global CDN</li>
                <li>• SOC 2 compliant</li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Deploy Cloud
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">On-Premises</CardTitle>
              <CardDescription className="text-slate-300">
                Self-hosted solution for maximum control and security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-slate-300">
                <li>• Full data control</li>
                <li>• Custom configurations</li>
                <li>• Air-gapped deployment</li>
                <li>• Dedicated support</li>
              </ul>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Settings className="h-4 w-4 mr-2" />
                Configure On-Prem
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Hybrid Solution</CardTitle>
              <CardDescription className="text-slate-300">
                Best of both worlds with flexible deployment options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-slate-300">
                <li>• Cloud + on-premises</li>
                <li>• Data residency options</li>
                <li>• Seamless integration</li>
                <li>• Scalable architecture</li>
              </ul>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Globe className="h-4 w-4 mr-2" />
                Design Hybrid
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Support & Contact */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">Enterprise Support</CardTitle>
            <CardDescription className="text-slate-300">
              Dedicated support team for institutional deployments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">24/7 Phone Support</h3>
                <p className="text-slate-300">Direct line to compliance experts</p>
                <p className="text-blue-400 font-medium mt-2">+1 (555) 123-COMP</p>
              </div>

              <div className="text-center">
                <div className="bg-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Priority Email</h3>
                <p className="text-slate-300">Guaranteed 1-hour response time</p>
                <p className="text-green-400 font-medium mt-2">compliance@snappaifi.com</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Custom Integration</h3>
                <p className="text-slate-300">Tailored implementation services</p>
                <p className="text-purple-400 font-medium mt-2">Schedule Consultation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
