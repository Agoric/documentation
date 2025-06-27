"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { LoanComplianceBot } from "@/components/compliance/loan-compliance-bot"
import {
  Shield,
  Building2,
  FileText,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Lock,
  Zap,
  BarChart3,
} from "lucide-react"

export default function InstitutionalCompliancePage() {
  const [activeTab, setActiveTab] = React.useState("overview")

  const complianceMetrics = {
    overallScore: 98.7,
    regulatoryCompliance: 99.2,
    riskManagement: 97.8,
    documentationScore: 98.9,
    institutionalRequirements: 100.0,
  }

  const institutionalStats = {
    minimumInvestment: 100000000, // $100M
    currentPortfolio: 2847392000, // $2.8B
    targetROI: 20,
    actualROI: 22.4,
    governmentGuaranteed: 1847392000, // $1.8B
    activeInstitutions: 47,
    compoundedReturns: 847392000, // $847M in returns
  }

  const complianceAreas = [
    {
      name: "Regulatory Compliance",
      score: 99.2,
      status: "excellent",
      description: "TILA, RESPA, CFPB, and federal lending regulations",
      icon: Shield,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      name: "Risk Management",
      score: 97.8,
      status: "excellent",
      description: "Credit risk assessment and default probability analysis",
      icon: AlertTriangle,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      name: "Documentation",
      score: 98.9,
      status: "excellent",
      description: "Loan documentation and record keeping standards",
      icon: FileText,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      name: "Capital Requirements",
      score: 100.0,
      status: "perfect",
      description: "Institutional investment thresholds and liquidity",
      icon: DollarSign,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ]

  const institutionalBenefits = [
    {
      title: "Government Guaranteed Returns",
      description: "20% compounded ROI on government-backed mortgages",
      value: `${institutionalStats.actualROI}%`,
      icon: TrendingUp,
      color: "text-green-400",
    },
    {
      title: "Minimum Investment Threshold",
      description: "Exclusive access for $100M+ institutional investors",
      value: `$${(institutionalStats.minimumInvestment / 1000000).toFixed(0)}M`,
      icon: Building2,
      color: "text-blue-400",
    },
    {
      title: "Portfolio Diversification",
      description: "Access to premium government-guaranteed mortgage pools",
      value: `$${(institutionalStats.governmentGuaranteed / 1000000000).toFixed(1)}B`,
      icon: BarChart3,
      color: "text-purple-400",
    },
    {
      title: "Regulatory Protection",
      description: "Full compliance with federal lending regulations",
      value: "100%",
      icon: Shield,
      color: "text-orange-400",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Institutional Compliance Center
            </h1>
            <p className="text-slate-300 text-xl mt-2">
              Advanced compliance monitoring for institutional mortgage investments
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-600/20 text-green-400 border-green-500/30 px-4 py-2">
              <CheckCircle className="w-4 h-4 mr-2" />
              Fully Compliant
            </Badge>
            <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30 px-4 py-2">
              <Lock className="w-4 h-4 mr-2" />
              Institutional Access
            </Badge>
          </div>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">Compliance Score</p>
                  <p className="text-3xl font-bold text-white">{complianceMetrics.overallScore}%</p>
                  <p className="text-green-400 text-sm">Industry Leading</p>
                </div>
                <Shield className="h-10 w-10 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">Portfolio Value</p>
                  <p className="text-3xl font-bold text-white">
                    ${(institutionalStats.currentPortfolio / 1000000000).toFixed(1)}B
                  </p>
                  <p className="text-blue-400 text-sm">
                    {((institutionalStats.currentPortfolio / institutionalStats.minimumInvestment) * 100).toFixed(0)}%
                    above minimum
                  </p>
                </div>
                <Building2 className="h-10 w-10 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium">ROI Performance</p>
                  <p className="text-3xl font-bold text-white">{institutionalStats.actualROI}%</p>
                  <p className="text-purple-400 text-sm">
                    +{(institutionalStats.actualROI - institutionalStats.targetROI).toFixed(1)}% above target
                  </p>
                </div>
                <TrendingUp className="h-10 w-10 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/40 to-red-900/40 border-orange-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm font-medium">Active Institutions</p>
                  <p className="text-3xl font-bold text-white">{institutionalStats.activeInstitutions}</p>
                  <p className="text-orange-400 text-sm">Qualified Investors</p>
                </div>
                <Users className="h-10 w-10 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Institutional Investment Requirements */}
        <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center">
              <Building2 className="h-6 w-6 mr-3 text-blue-400" />
              Institutional Investment Program
            </CardTitle>
            <CardDescription className="text-slate-300 text-lg">
              Exclusive access to government-guaranteed mortgage investments with 20% compounded ROI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {institutionalBenefits.map((benefit, index) => (
                <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-3">
                    <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                    <span className={`text-xl font-bold ${benefit.color}`}>{benefit.value}</span>
                  </div>
                  <h4 className="text-white font-medium mb-2">{benefit.title}</h4>
                  <p className="text-slate-400 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>

            <div className="p-6 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-lg border border-green-500/30">
              <h4 className="text-green-300 font-semibold text-lg mb-3">Investment Performance Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    ${(institutionalStats.compoundedReturns / 1000000).toFixed(0)}M
                  </div>
                  <div className="text-green-400 text-sm">Total Returns Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {((institutionalStats.governmentGuaranteed / institutionalStats.currentPortfolio) * 100).toFixed(1)}
                    %
                  </div>
                  <div className="text-green-400 text-sm">Government Guaranteed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">&lt;2%</div>
                  <div className="text-green-400 text-sm">Default Risk</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Compliance Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800/50 border-slate-700 grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
              <Shield className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="compliance" className="data-[state=active]:bg-purple-600">
              <FileText className="w-4 h-4 mr-2" />
              Compliance Bot
            </TabsTrigger>
            <TabsTrigger value="institutional" className="data-[state=active]:bg-green-600">
              <Building2 className="w-4 h-4 mr-2" />
              Institutional
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-orange-600">
              <Zap className="w-4 h-4 mr-2" />
              Monitoring
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {complianceAreas.map((area, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <div className={`p-2 rounded-lg ${area.bgColor} mr-3`}>
                        <area.icon className={`h-5 w-5 ${area.color}`} />
                      </div>
                      {area.name}
                    </CardTitle>
                    <CardDescription>{area.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Compliance Score</span>
                        <Badge
                          className={
                            area.score >= 99
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : area.score >= 95
                                ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          }
                        >
                          {area.score}%
                        </Badge>
                      </div>
                      <Progress value={area.score} className="h-2" />
                      <div className="text-sm text-slate-400">
                        Status: <span className={area.color}>{area.status}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <LoanComplianceBot />
          </TabsContent>

          <TabsContent value="institutional" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Investment Requirements</CardTitle>
                  <CardDescription>Minimum thresholds for institutional access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-300 font-medium">Minimum Investment</span>
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      ${(institutionalStats.minimumInvestment / 1000000).toFixed(0)}M
                    </div>
                    <div className="text-blue-400 text-sm">Required for institutional access</div>
                  </div>

                  <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-300 font-medium">Current Portfolio</span>
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      ${(institutionalStats.currentPortfolio / 1000000000).toFixed(2)}B
                    </div>
                    <div className="text-green-400 text-sm">
                      {((institutionalStats.currentPortfolio / institutionalStats.minimumInvestment) * 100).toFixed(0)}%
                      above minimum
                    </div>
                  </div>

                  <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-300 font-medium">ROI Target</span>
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{institutionalStats.actualROI}%</div>
                    <div className="text-purple-400 text-sm">
                      +{(institutionalStats.actualROI - institutionalStats.targetROI).toFixed(1)}% above{" "}
                      {institutionalStats.targetROI}% target
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Government Guarantees</CardTitle>
                  <CardDescription>Federal backing and risk mitigation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-slate-900/30 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">100%</div>
                      <div className="text-slate-400 text-sm">Government Backed</div>
                    </div>
                    <div className="text-center p-4 bg-slate-900/30 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">&lt;2%</div>
                      <div className="text-slate-400 text-sm">Default Risk</div>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-500/30">
                    <h4 className="text-orange-300 font-medium mb-2">Guarantee Coverage</h4>
                    <div className="text-xl font-bold text-white mb-1">
                      ${(institutionalStats.governmentGuaranteed / 1000000000).toFixed(1)}B
                    </div>
                    <div className="text-orange-400 text-sm">
                      {((institutionalStats.governmentGuaranteed / institutionalStats.currentPortfolio) * 100).toFixed(
                        1,
                      )}
                      % of total portfolio
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">FHA Loans</span>
                      <span className="text-white">34%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">VA Loans</span>
                      <span className="text-white">28%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">USDA Loans</span>
                      <span className="text-white">18%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Conventional (Gov. Backed)</span>
                      <span className="text-white">20%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Real-time Monitoring</CardTitle>
                  <CardDescription>Continuous compliance and performance tracking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse" />
                      <span className="text-white">Compliance Monitoring</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-900/20 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-400 rounded-full mr-3 animate-pulse" />
                      <span className="text-white">ROI Tracking</span>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-400">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-400 rounded-full mr-3 animate-pulse" />
                      <span className="text-white">Risk Assessment</span>
                    </div>
                    <Badge className="bg-purple-500/20 text-purple-400">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-orange-900/20 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-400 rounded-full mr-3 animate-pulse" />
                      <span className="text-white">Regulatory Updates</span>
                    </div>
                    <Badge className="bg-orange-500/20 text-orange-400">Active</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Alert System</CardTitle>
                  <CardDescription>Automated notifications and alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-slate-900/30 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Compliance Alerts</span>
                      <Badge className="bg-green-500/20 text-green-400">0 Active</Badge>
                    </div>
                    <p className="text-slate-400 text-sm">No compliance issues detected</p>
                  </div>

                  <div className="p-3 bg-slate-900/30 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Performance Alerts</span>
                      <Badge className="bg-blue-500/20 text-blue-400">1 Active</Badge>
                    </div>
                    <p className="text-slate-400 text-sm">ROI exceeding target by 2.4%</p>
                  </div>

                  <div className="p-3 bg-slate-900/30 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Risk Alerts</span>
                      <Badge className="bg-green-500/20 text-green-400">0 Active</Badge>
                    </div>
                    <p className="text-slate-400 text-sm">All risk metrics within acceptable ranges</p>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                    <Zap className="h-4 w-4 mr-2" />
                    Configure Alerts
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
