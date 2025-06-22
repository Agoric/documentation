"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import {
  Briefcase,
  Users,
  TrendingUp,
  DollarSign,
  Target,
  Shield,
  CheckCircle,
  Activity,
  Settings,
  Server,
  ReplaceAllIcon as All,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Business Suite Modules
const businessModules = [
  {
    id: "operations",
    name: "Operations Management",
    icon: Settings,
    description: "Streamline business operations and workflows",
    color: "from-blue-600 to-cyan-600",
    features: ["Process Automation", "Workflow Management", "Resource Planning", "Quality Control"],
    metrics: { efficiency: 94, automation: 87, satisfaction: 92 },
  },
  {
    id: "finance",
    name: "Financial Management",
    icon: DollarSign,
    description: "Complete financial planning and analysis",
    color: "from-green-600 to-emerald-600",
    features: ["Budget Planning", "Cash Flow Analysis", "Financial Reporting", "Tax Management"],
    metrics: { profitability: 89, cashFlow: 95, compliance: 98 },
  },
  {
    id: "hr",
    name: "Human Resources",
    icon: Users,
    description: "Comprehensive HR management system",
    color: "from-purple-600 to-indigo-600",
    features: ["Employee Management", "Payroll Processing", "Performance Reviews", "Recruitment"],
    metrics: { retention: 91, satisfaction: 88, productivity: 93 },
  },
  {
    id: "sales",
    name: "Sales & Marketing",
    icon: Target,
    description: "Drive sales growth and marketing campaigns",
    color: "from-pink-600 to-rose-600",
    features: ["CRM Integration", "Lead Management", "Campaign Tracking", "Analytics"],
    metrics: { conversion: 23, growth: 34, roi: 287 },
  },
  {
    id: "compliance",
    name: "Compliance & Legal",
    icon: Shield,
    description: "Ensure regulatory compliance and legal protection",
    color: "from-amber-600 to-yellow-600",
    features: ["Regulatory Tracking", "Document Management", "Audit Trails", "Risk Assessment"],
    metrics: { compliance: 99, riskScore: 15, auditScore: 96 },
  },
  {
    id: "technology",
    name: "Technology Infrastructure",
    icon: Server,
    description: "Manage IT infrastructure and digital assets",
    color: "from-indigo-600 to-purple-600",
    features: ["System Monitoring", "Security Management", "Data Backup", "Cloud Services"],
    metrics: { uptime: 99.9, security: 97, performance: 94 },
  },
]

// Business Performance Data
const businessPerformance = {
  revenue: {
    current: 12750000,
    previous: 9850000,
    growth: 29.4,
    target: 15000000,
    projection: 14200000,
  },
  profit: {
    current: 3825000,
    previous: 2955000,
    margin: 30.0,
    target: 4500000,
    projection: 4260000,
  },
  employees: {
    current: 247,
    previous: 198,
    growth: 24.7,
    retention: 91.2,
    satisfaction: 88.5,
  },
  customers: {
    current: 15678,
    previous: 12456,
    growth: 25.9,
    satisfaction: 92.3,
    retention: 89.7,
  },
}

// Acquisition Processing Data
const acquisitionPipeline = [
  {
    id: "acq-1",
    target: "TechFlow Solutions",
    industry: "Software Development",
    value: 25000000,
    stage: "Due Diligence",
    probability: 75,
    timeline: "Q2 2024",
    synergies: 8500000,
    roi: 34.2,
    status: "active",
    keyMetrics: {
      revenue: 12000000,
      ebitda: 3600000,
      employees: 85,
      customers: 450,
    },
  },
  {
    id: "acq-2",
    target: "GreenEnergy Corp",
    industry: "Renewable Energy",
    value: 45000000,
    stage: "Negotiation",
    probability: 60,
    timeline: "Q3 2024",
    synergies: 15000000,
    roi: 28.7,
    status: "active",
    keyMetrics: {
      revenue: 28000000,
      ebitda: 8400000,
      employees: 156,
      customers: 1200,
    },
  },
  {
    id: "acq-3",
    target: "DataSecure Inc",
    industry: "Cybersecurity",
    value: 18000000,
    stage: "Letter of Intent",
    probability: 85,
    timeline: "Q1 2024",
    synergies: 6500000,
    roi: 42.1,
    status: "priority",
    keyMetrics: {
      revenue: 8500000,
      ebitda: 2550000,
      employees: 62,
      customers: 280,
    },
  },
]

export function SupremeBusinessSuite() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [selectedModule, setSelectedModule] = useState(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "letter of intent":
        return "bg-blue-600/20 text-blue-300 border-blue-400/30"
      case "due diligence":
        return "bg-yellow-600/20 text-yellow-300 border-yellow-400/30"
      case "negotiation":
        return "bg-orange-600/20 text-orange-300 border-orange-400/30"
      case "closing":
        return "bg-green-600/20 text-green-300 border-green-400/30"
      default:
        return "bg-gray-600/20 text-gray-300 border-gray-400/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Briefcase className="w-12 h-12 text-amber-400" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-clip-text text-transparent font-serif">
                Supreme Business Suite
              </h1>
              <p className="text-xl text-amber-300/80 italic">Complete Business Management Platform</p>
            </div>
          </div>

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-300">{formatCurrency(businessPerformance.revenue.current)}</div>
                <div className="text-sm text-gray-400">Annual Revenue</div>
                <div className="flex items-center justify-center mt-1">
                  <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                  <span className="text-green-400 text-xs">+{businessPerformance.revenue.growth}%</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-300">{formatCurrency(businessPerformance.profit.current)}</div>
                <div className="text-sm text-gray-400">Net Profit</div>
                <div className="text-blue-300 text-xs mt-1">{businessPerformance.profit.margin}% margin</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-300">{formatNumber(businessPerformance.employees.current)}</div>
                <div className="text-sm text-gray-400">Employees</div>
                <div className="text-purple-300 text-xs mt-1">{businessPerformance.employees.retention}% retention</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-amber-900/50 to-yellow-900/50 border-amber-400/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-amber-300">{formatNumber(businessPerformance.customers.current)}</div>
                <div className="text-sm text-gray-400">Customers</div>
                <div className="text-amber-300 text-xs mt-1">{businessPerformance.customers.satisfaction}% satisfaction</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50">
            <TabsTrigger value="overview">Business Overview</TabsTrigger>
            <TabsTrigger value="modules">Business Modules</TabsTrigger>
            <TabsTrigger value="acquisitions">Acquisitions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Performance */}
              <Card className="bg-slate-800/50 border-slate-600/50">
                <CardHeader>
                  <CardTitle className="text-slate-300 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Revenue Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Current Year</div>
                      <div className="text-2xl font-bold text-green-300">{formatCurrency(businessPerformance.revenue.current)}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Previous Year</div>
                      <div className="text-lg text-white">{formatCurrency(businessPerformance.revenue.previous)}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Growth Rate</div>
                      <div className="text-lg text-green-300 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +{businessPerformance.revenue.growth}%
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400">Target</div>
                      <div className="text-lg text-amber-300">{formatCurrency(businessPerformance.revenue.target)}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progress to Target</span>
                      <span className="text-purple-300">
                        {((businessPerformance.revenue.current / businessPerformance.revenue.target) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={(businessPerformance.revenue.current / businessPerformance.revenue.target) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Profit Analysis */}
              <Card className="bg-slate-800/50 border-slate-600/50">
                <CardHeader>
                  <CardTitle className="text-slate-300 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Profit Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Net Profit</div>
                      <div className="text-2xl font-bold text-blue-300">{formatCurrency(businessPerformance.profit.current)}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Profit Margin</div>
                      <div className="text-lg text-white">{businessPerformance.profit.margin}%</div>
                    </div>
                    <div>
                      <div className="text-gray-400">YoY Growth</div>
                      <div className="text-lg text-green-300">
                        +{(((businessPerformance.profit.current - businessPerformance.profit.previous) / businessPerformance.profit.previous) * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400">Projection</div>
                      <div className="text-lg text-purple-300">{formatCurrency(businessPerformance.profit.projection)}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Target Achievement</span>
                      <span className="text-amber-300">
                        {((businessPerformance.profit.current / businessPerformance.profit.target) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={(businessPerformance.profit.current / businessPerformance.profit.target) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Business Health Dashboard */}
            <Card className="bg-slate-800/50 border-slate-600/50">
              <CardHeader>
                <CardTitle className="text-slate-300 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Business Health Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { metric: "Financial Health", score: 92, color: "text-green-400", details: ["Strong Cash Flow", "Low Debt Ratio", "High Profitability"] },
                    { metric: "Operational Efficiency", score: 87, color: "text-blue-400", details: ["Process Automation", "Resource Optimization", "Quality Control"] },
                    { metric: "Market Position", score: 89, color: "text-purple-400", details: ["Market Share Growth", "Customer Satisfaction", "Brand Recognition"] },
                  ].map((item) => (
                    <div key={item.metric} className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white font-medium">{item.metric}</span>
                        <span className={`font-bold ${item.color}`}>{item.score}/100</span>
                      </div>
                      <Progress value={item.score} className="h-3" />
                      <div className="space-y-1">
                        {item.details.map((detail) => (
                          <div key={detail} className="flex items-center text-xs text-gray-400">
                            <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Business Modules Tab */}
          <TabsContent value="modules" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Business Management Modules</h2>
              <p className="text-slate-400">Comprehensive tools for every aspect of your business</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessModules.map((module, index) => {
                const Icon = module.icon
                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card className="bg-slate-800/50 border-slate-600/50 hover:border-amber-400/50 transition-all duration-300 cursor-pointer h-full">
                      <CardContent className="p-6 space-y-4">
                        <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${module.color} flex items-center justify-center`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-center">
                          <h3 className="text-lg font-semibold text-white mb-2">{module.name}</h3>
                          <p className="text-sm text-gray-400">{module.description}</p>
                        </div>

                        <div className="space-y-2">
                          <h5 className="text-sm font-medium text-white">Key Features</h5>
                          <div className="grid grid-cols-1 gap-1">
                            {module.features.map((feature) => (
                              <div key={feature} className="flex items-center text-xs text-gray-400">
                                <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h5 className="text-sm font-medium text-white">Performance Metrics</h5>
                          {Object.entries(module.metrics).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-xs">
                              <span className="text-gray-400 capitalize">{key}</span>
                              <span className="text-green-300">{value}%</span>
                            </div>
                          ))}
                        </div>

                        <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                          Access Module
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </TabsContent>

          {/* Acquisitions Tab */}
          <TabsContent value="acquisitions" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Acquisition Processing Pipeline</h2>
              <p className="text-slate-400">Strategic acquisitions and merger opportunities</p>
            </div>

            {/* Pipeline Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-300">{acquisitionPipeline.length}</div>
                  <div className="text-sm text-gray-400">Active Targets</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-300">
                    {formatCurrency(acquisitionPipeline.reduce((sum, acq) => sum + acq.value, 0))}
                  </div>
                  <div className="text-sm text-gray-400">Total Pipeline Value</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-300">
                    {formatCurrency(acquisitionPipeline.reduce((sum, acq) => sum + acq.synergies, 0))}
                  </div>
                  <div className="text-sm text-gray-400">Expected Synergies</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-amber-900/50 to-yellow-900/50 border-amber-400/30">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-amber-300">
                    {(acquisitionPipeline.reduce((sum, acq) => sum + acq.roi, 0) / acquisitionPipeline.length).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-400">Average ROI</div>
                </CardContent>
              </Card>
            </div>

            {/* Acquisition Pipeline */}
            <div className="space-y-4">
              {acquisitionPipeline.map((acquisition, index) => (
                <motion.div
                  key={acquisition.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-slate-800/50 border-slate-600/50 hover:border-amber-400/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Target Information */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-white">{acquisition.target}</h3>
                            <Badge
                              className={cn(
                                "text-xs",
                                acquisition.status === "priority"
                                  ? "bg-red-600/20 text-red-300 border-red-400/30"
                                  : "bg-blue-600/20 text-blue-300 border-blue-400/30",
                              )}
                            >
                              {acquisition.status.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Industry</span>
                              <span className="text-white">{acquisition.industry}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Valuation</span>
                              <span className="text-green-300 font-semibold">{formatCurrency(acquisition.value)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Timeline</span>
                              <span className="text-white">{acquisition.timeline}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Expected ROI</span>
                              <span className="text-purple-300 font-semibold">{acquisition.roi}%</span>
                            </div>
                          </div>
                        </div>

                        {/* Stage and Progress */}
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-gray-400">Current Stage</span>
                              <Badge className={getStageColor(acquisition.stage)}>{acquisition.stage}</Badge>
                            </div>
                            <div className="flex justify-between mb-2">
                              <span className="text-gray-400">Success Probability</span>
                              <span className="text-amber-300">{acquisition.probability}%</span>
                            </div>
                            <Progress value={acquisition.probability} className="h-2" />
                          </div>
                          <div>
                            <div className="text-gray-400 text-sm mb-2">Expected Synergies</div>
                            <div className="text-lg font-semibold text-blue-300">{formatCurrency(acquisition.synergies)}</div>
                          </div>
                        </div>

                        {/* Key Metrics */}
                        \
