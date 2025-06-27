"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import {
  Home,
  Building2,
  Calculator,
  FileText,
  TrendingUp,
  CheckCircle,
  Search,
  Star,
  Shield,
  Zap,
  Target,
  Award,
  Users,
  BarChart3,
  PieChart,
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
  Globe,
} from "lucide-react"

export default function LoanCenterPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const loanTypes = [
    {
      id: "fha-loan",
      name: "FHA 50-Year Bond Loan",
      icon: Home,
      description: "50-year bond structure with 30-year government guarantee and DAX secondary market mirroring",
      rate: "3.25%",
      amount: "Up to $766K",
      term: "50 years",
      features: ["3.5% down payment", "30-year government guarantee", "DAX-mirrored pricing", "50-year amortization"],
      color: "from-blue-500 to-cyan-500",
      category: "real-estate",
      popularity: 95,
      path: "/citizen/loan-center/fha-loan",
      guarantee: "30-Year FHA Guarantee",
      bondStructure: {
        baseTerm: 50,
        guaranteeTerm: 30,
        corporateMirror: "DAX Secondary",
        baseRate: 3.1,
        daxSpread: 0.25,
        riskAdjustment: 0.15,
        guaranteeDiscount: 0.25,
      },
    },
    {
      id: "va-loan",
      name: "VA 50-Year Bond Loan",
      icon: Shield,
      description: "Military exclusive 50-year bond with full government backing and premium DAX pricing",
      rate: "3.10%",
      amount: "No Limit",
      term: "50 years",
      features: ["0% down payment", "Full 50-year guarantee", "Premium DAX pricing", "No PMI required"],
      color: "from-green-500 to-emerald-500",
      category: "real-estate",
      popularity: 92,
      path: "/citizen/loan-center/va-loan",
      guarantee: "Full VA Guarantee",
      bondStructure: {
        baseTerm: 50,
        guaranteeTerm: 50,
        corporateMirror: "DAX Premium",
        baseRate: 3.1,
        daxSpread: 0.2,
        riskAdjustment: 0.0,
        guaranteeDiscount: 0.3,
      },
    },
    {
      id: "usda-loan",
      name: "USDA 50-Year Rural Bond",
      icon: Target,
      description: "Rural development 50-year bond with enhanced guarantee and agricultural DAX mirroring",
      rate: "3.00%",
      amount: "Based on Income",
      term: "50 years",
      features: ["0% down payment", "35-year enhanced guarantee", "Agricultural DAX mirror", "Rural development"],
      color: "from-purple-500 to-pink-500",
      category: "real-estate",
      popularity: 78,
      path: "/citizen/loan-center/usda-loan",
      guarantee: "35-Year USDA Guarantee",
      bondStructure: {
        baseTerm: 50,
        guaranteeTerm: 35,
        corporateMirror: "DAX Agricultural",
        baseRate: 3.0,
        daxSpread: 0.15,
        riskAdjustment: 0.1,
        guaranteeDiscount: 0.25,
      },
    },
    {
      id: "sba-loan",
      name: "SBA 50-Year Business Bond",
      icon: Building2,
      description: "Business 50-year bond with corporate guarantee structure and DAX corporate pricing",
      rate: "3.55%",
      amount: "Up to $5M",
      term: "50 years",
      features: ["Business focused", "25-year SBA guarantee", "Corporate DAX pricing", "Government backed"],
      color: "from-orange-500 to-red-500",
      category: "business",
      popularity: 85,
      path: "/citizen/loan-center/sba-loan",
      guarantee: "25-Year SBA Guarantee",
      bondStructure: {
        baseTerm: 50,
        guaranteeTerm: 25,
        corporateMirror: "DAX Corporate",
        baseRate: 3.2,
        daxSpread: 0.35,
        riskAdjustment: 0.35,
        guaranteeDiscount: 0.35,
      },
    },
  ]

  const quickActions = [
    {
      name: "50-Year Bond Calculator",
      description: "Calculate 50-year bond payments with DAX mirroring",
      icon: Calculator,
      path: "/citizen/loan-center/calculator",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Bond Pre-Qualification",
      description: "Check eligibility for 50-year bond structures",
      icon: CheckCircle,
      path: "/citizen/loan-center/pre-qualification",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Application Status",
      description: "Track your bond loan applications",
      icon: FileText,
      path: "/citizen/loan-center/status",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Bond Comparison Tool",
      description: "Compare 50-year bond structures",
      icon: BarChart3,
      path: "/citizen/loan-center/comparison",
      color: "from-orange-500 to-red-500",
    },
  ]

  const bondBenefits = [
    {
      icon: Globe,
      title: "DAX Market Mirroring",
      description: "Corporate bond pricing structure mirroring German DAX secondary market",
    },
    {
      icon: Shield,
      title: "Government Guarantee",
      description: "30-year government backing provides security and rate benefits",
    },
    {
      icon: Zap,
      title: "Extended 50-Year Terms",
      description: "Lower monthly payments through extended amortization periods",
    },
    {
      icon: Award,
      title: "Corporate Bond Structure",
      description: "Professional bond market liquidity and secondary market access",
    },
  ]

  const recentApplications = [
    {
      id: "BOND-2024-001",
      type: "FHA 50-Year Bond",
      amount: "$450,000",
      status: "Under Review",
      date: "2024-01-15",
      progress: 65,
      bondRate: "3.25%",
      guaranteeTerm: "30 years",
    },
    {
      id: "BOND-2024-002",
      type: "VA 50-Year Bond",
      amount: "$525,000",
      status: "Approved",
      date: "2024-01-10",
      progress: 100,
      bondRate: "3.10%",
      guaranteeTerm: "50 years",
    },
  ]

  const filteredLoanTypes = loanTypes.filter((loan) => {
    const matchesSearch =
      loan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || loan.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleLoanTypeClick = (loanType: any) => {
    router.push(loanType.path)
  }

  const handleQuickActionClick = (action: any) => {
    router.push(action.path)
  }

  const calculateMonthlySavings = (loan: any) => {
    // Calculate vs traditional 30-year at 6.5%
    const loanAmount = 400000 // Example amount
    const traditional30Rate = 6.5 / 100 / 12
    const traditional30Payment =
      (loanAmount * traditional30Rate * Math.pow(1 + traditional30Rate, 360)) /
      (Math.pow(1 + traditional30Rate, 360) - 1)

    const bondRate =
      (loan.bondStructure.baseRate +
        loan.bondStructure.daxSpread +
        loan.bondStructure.riskAdjustment -
        loan.bondStructure.guaranteeDiscount) /
      100 /
      12
    const bondPayment = (loanAmount * bondRate * Math.pow(1 + bondRate, 600)) / (Math.pow(1 + bondRate, 600) - 1)

    return traditional30Payment - bondPayment
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            50-Year Government Bond Loan Center
          </h1>
          <p className="text-xl text-blue-200 max-w-4xl mx-auto">
            Access revolutionary 50-year government-guaranteed bond structures with DAX secondary market mirroring,
            offering lower monthly payments and corporate-level liquidity
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">
              <Globe className="h-4 w-4 mr-2" />
              DAX Market Mirroring
            </Badge>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              Government Guaranteed
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              50-Year Terms
            </Badge>
          </div>
        </div>

        {/* Bond Structure Overview */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/30 backdrop-blur-sm border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white text-center">50-Year Bond Structure Overview</CardTitle>
            <CardDescription className="text-purple-200 text-center">
              Revolutionary financing combining government guarantees with corporate bond market efficiency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-3">
                  <Home className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">50-Year Base Term</h3>
                <p className="text-sm text-blue-200">Extended amortization for lower monthly payments</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-3">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Government Guarantee</h3>
                <p className="text-sm text-blue-200">25-50 year federal backing depending on loan type</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-3">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">DAX Mirroring</h3>
                <p className="text-sm text-blue-200">German corporate bond secondary market pricing</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-3">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Corporate Structure</h3>
                <p className="text-sm text-blue-200">Professional bond market liquidity and trading</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                <Input
                  placeholder="Search 50-year bond loan types..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-blue-800/30 border-blue-500/30 text-white placeholder-blue-300"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("all")}
                  className={
                    selectedCategory === "all" ? "bg-blue-500" : "border-blue-500/30 text-blue-300 bg-transparent"
                  }
                >
                  All Bonds
                </Button>
                <Button
                  variant={selectedCategory === "real-estate" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("real-estate")}
                  className={
                    selectedCategory === "real-estate"
                      ? "bg-blue-500"
                      : "border-blue-500/30 text-blue-300 bg-transparent"
                  }
                >
                  Real Estate
                </Button>
                <Button
                  variant={selectedCategory === "business" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("business")}
                  className={
                    selectedCategory === "business" ? "bg-blue-500" : "border-blue-500/30 text-blue-300 bg-transparent"
                  }
                >
                  Business
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="bond-types" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-blue-900/30 backdrop-blur-sm">
            <TabsTrigger value="bond-types">50-Year Bonds</TabsTrigger>
            <TabsTrigger value="quick-actions">Bond Tools</TabsTrigger>
            <TabsTrigger value="my-applications">My Applications</TabsTrigger>
            <TabsTrigger value="resources">Bond Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="bond-types" className="space-y-6">
            {/* Bond Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredLoanTypes.map((loanType) => {
                const monthlySavings = calculateMonthlySavings(loanType)
                return (
                  <Card
                    key={loanType.id}
                    className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 cursor-pointer group"
                    onClick={() => handleLoanTypeClick(loanType)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-lg bg-gradient-to-r ${loanType.color}`}>
                            <loanType.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-white">{loanType.name}</CardTitle>
                            <CardDescription className="text-blue-200">{loanType.description}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-blue-200">{(loanType.popularity / 20).toFixed(1)}</span>
                          </div>
                          <ArrowRight className="h-5 w-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-sm text-blue-300">Bond Rate</div>
                          <div className="font-semibold text-white">{loanType.rate}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-blue-300">Amount</div>
                          <div className="font-semibold text-white">{loanType.amount}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-blue-300">Term</div>
                          <div className="font-semibold text-white">{loanType.term}</div>
                        </div>
                      </div>

                      {/* Bond Structure Details */}
                      <div className="bg-purple-800/30 p-3 rounded-lg border border-purple-500/20">
                        <h4 className="text-sm font-medium text-white mb-2">Bond Structure</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-purple-300">Guarantee:</span>
                            <span className="text-white">{loanType.bondStructure.guaranteeTerm}yr</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-purple-300">DAX Mirror:</span>
                            <span className="text-white">{loanType.bondStructure.corporateMirror}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-purple-300">Base Rate:</span>
                            <span className="text-white">{loanType.bondStructure.baseRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-purple-300">DAX Spread:</span>
                            <span className="text-white">+{loanType.bondStructure.daxSpread}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-white">50-Year Bond Features:</h4>
                        <ul className="space-y-1">
                          {loanType.features.map((feature, index) => (
                            <li key={index} className="text-sm text-blue-200 flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-green-800/30 p-3 rounded-lg border border-green-500/20">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-green-300">Monthly Savings vs 30-year:</span>
                          <span className="font-semibold text-green-400">
                            ${monthlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex gap-2">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            {loanType.guarantee}
                          </Badge>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {loanType.popularity}% Popular
                          </Badge>
                        </div>
                        <Button className={`bg-gradient-to-r ${loanType.color} text-white`}>Apply Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Bond Benefits */}
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white text-center">Why Choose 50-Year Government Bonds?</CardTitle>
                <CardDescription className="text-blue-200 text-center">
                  Revolutionary financing combining the best of government backing and corporate bond markets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {bondBenefits.map((benefit, index) => (
                    <div key={index} className="text-center space-y-3">
                      <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <benefit.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-white">{benefit.title}</h3>
                      <p className="text-sm text-blue-200">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quick-actions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 cursor-pointer group"
                  onClick={() => handleQuickActionClick(action)}
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div
                      className={`mx-auto w-16 h-16 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center`}
                    >
                      <action.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">{action.name}</h3>
                      <p className="text-sm text-blue-200">{action.description}</p>
                    </div>
                    <Button
                      className={`w-full bg-gradient-to-r ${action.color} group-hover:scale-105 transition-transform`}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Bond Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-blue-400" />
                    Bond Structure Analyzer
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Analyze different 50-year bond structures and their components
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600">Analyze Bond Structures</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                    DAX Market Monitor
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Monitor DAX secondary market conditions affecting bond pricing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600">View DAX Conditions</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="my-applications" className="space-y-6">
            <div className="space-y-6">
              {recentApplications.length > 0 ? (
                recentApplications.map((application) => (
                  <Card
                    key={application.id}
                    className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-white">{application.type}</h3>
                          <p className="text-blue-200">Application ID: {application.id}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                              Rate: {application.bondRate}
                            </Badge>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              Guarantee: {application.guaranteeTerm}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-white">{application.amount}</div>
                          <Badge
                            className={`${
                              application.status === "Approved"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            }`}
                          >
                            {application.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-blue-300">Bond Processing Progress</span>
                          <span className="text-white font-medium">{application.progress}%</span>
                        </div>
                        <div className="w-full bg-blue-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${application.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-blue-300">Applied: {application.date}</span>
                        <Button
                          variant="outline"
                          className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
                          onClick={() => router.push(`/citizen/loan-center/status/${application.id}`)}
                        >
                          View Bond Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                  <CardContent className="p-12 text-center">
                    <FileText className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No Bond Applications Yet</h3>
                    <p className="text-blue-200 mb-6">Start your 50-year government bond application journey today</p>
                    <Button className="bg-gradient-to-r from-blue-500 to-cyan-600">Apply for 50-Year Bond</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-400" />
                    Bond Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">50-Year Bond Basics</h4>
                    <p className="text-sm text-blue-200">Understanding extended-term government bond structures</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">DAX Market Integration</h4>
                    <p className="text-sm text-blue-200">How German corporate bonds influence your rates</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Government Guarantee Benefits</h4>
                    <p className="text-sm text-blue-200">Understanding federal backing and rate advantages</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-blue-400" />
                    Bond Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-blue-500/30 text-blue-300 bg-transparent"
                  >
                    50-Year Payment Calculator
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-blue-500/30 text-blue-300 bg-transparent"
                  >
                    Bond vs Traditional Comparison
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-blue-500/30 text-blue-300 bg-transparent"
                  >
                    DAX Rate Monitor
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-blue-500/30 text-blue-300 bg-transparent"
                  >
                    Government Guarantee Calculator
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-400" />
                    Bond Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Bond Specialists
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-blue-500/30 text-blue-300 bg-transparent"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email Bond Support
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-blue-500/30 text-blue-300 bg-transparent"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Live Bond Chat
                  </Button>
                  <div className="text-center pt-2">
                    <p className="text-sm text-blue-200">Bond specialists available 24/7</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">50-Year Government Bond FAQ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-white">How do 50-year bonds work?</h4>
                  <p className="text-sm text-blue-200">
                    50-year bonds extend your payment period to 50 years, significantly reducing monthly payments while
                    maintaining government backing for the first 25-50 years depending on loan type.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-white">What is DAX mirroring?</h4>
                  <p className="text-sm text-blue-200">
                    DAX mirroring means your bond rates follow German corporate bond secondary market pricing, providing
                    professional-grade liquidity and competitive rates.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-white">How long is the government guarantee?</h4>
                  <p className="text-sm text-blue-200">
                    Government guarantees range from 25-50 years depending on loan type. FHA provides 30 years, VA
                    provides full 50 years, USDA provides 35 years, and SBA provides 25 years.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-white">Can I pay off my 50-year bond early?</h4>
                  <p className="text-sm text-blue-200">
                    Yes, all 50-year government bonds have no prepayment penalties, allowing you to pay off early and
                    save on interest costs.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
