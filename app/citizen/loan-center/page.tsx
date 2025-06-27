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
  Car,
  CreditCard,
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
} from "lucide-react"

export default function LoanCenterPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const loanTypes = [
    {
      id: "home-loan",
      name: "Home Loan",
      icon: Home,
      description: "Purchase or refinance your dream home",
      rate: "6.25%",
      amount: "Up to $2M",
      term: "15-30 years",
      features: ["Low down payment options", "Fixed & adjustable rates", "First-time buyer programs"],
      color: "from-blue-500 to-cyan-500",
      category: "real-estate",
      popularity: 95,
      path: "/citizen/loan-center/home-loan",
    },
    {
      id: "auto-loan",
      name: "Auto Loan",
      icon: Car,
      description: "Finance your next vehicle purchase",
      rate: "4.75%",
      amount: "Up to $150K",
      term: "12-84 months",
      features: ["New & used vehicles", "Quick approval", "No prepayment penalty"],
      color: "from-green-500 to-emerald-500",
      category: "vehicle",
      popularity: 88,
      path: "/citizen/loan-center/auto-loan",
    },
    {
      id: "personal-loan",
      name: "Personal Loan",
      icon: CreditCard,
      description: "Flexible financing for personal needs",
      rate: "8.99%",
      amount: "Up to $50K",
      term: "24-72 months",
      features: ["No collateral required", "Fixed rates", "Multiple purposes"],
      color: "from-purple-500 to-pink-500",
      category: "personal",
      popularity: 82,
      path: "/citizen/loan-center/personal-loan",
    },
    {
      id: "business-loan",
      name: "Business Loan",
      icon: Building2,
      description: "Fuel your business growth",
      rate: "7.50%",
      amount: "Up to $5M",
      term: "12-120 months",
      features: ["SBA programs available", "Working capital", "Equipment financing"],
      color: "from-orange-500 to-red-500",
      category: "business",
      popularity: 76,
      path: "/citizen/loan-center/business-loan",
    },
  ]

  const quickActions = [
    {
      name: "Loan Calculator",
      description: "Calculate monthly payments",
      icon: Calculator,
      path: "/citizen/loan-center/calculator",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Pre-Qualification",
      description: "Check your eligibility",
      icon: CheckCircle,
      path: "/citizen/loan-center/pre-qualification",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Application Status",
      description: "Track your applications",
      icon: FileText,
      path: "/citizen/loan-center/status",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Rate Comparison",
      description: "Compare loan rates",
      icon: BarChart3,
      path: "/citizen/loan-center/rates",
      color: "from-orange-500 to-red-500",
    },
  ]

  const loanBenefits = [
    {
      icon: Shield,
      title: "Secure & Protected",
      description: "Bank-level security for all your information",
    },
    {
      icon: Zap,
      title: "Fast Approval",
      description: "Get approved in as little as 24 hours",
    },
    {
      icon: Target,
      title: "Competitive Rates",
      description: "Best-in-market interest rates",
    },
    {
      icon: Award,
      title: "Expert Support",
      description: "Dedicated loan specialists to help you",
    },
  ]

  const recentApplications = [
    {
      id: "APP-2024-001",
      type: "Home Loan",
      amount: "$450,000",
      status: "Under Review",
      date: "2024-01-15",
      progress: 65,
    },
    {
      id: "APP-2024-002",
      type: "Auto Loan",
      amount: "$35,000",
      status: "Approved",
      date: "2024-01-10",
      progress: 100,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Loan Center
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Find the perfect loan for your needs with competitive rates, fast approval, and expert support
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                <Input
                  placeholder="Search loan types..."
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
                  All
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
                  variant={selectedCategory === "vehicle" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("vehicle")}
                  className={
                    selectedCategory === "vehicle" ? "bg-blue-500" : "border-blue-500/30 text-blue-300 bg-transparent"
                  }
                >
                  Vehicle
                </Button>
                <Button
                  variant={selectedCategory === "personal" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("personal")}
                  className={
                    selectedCategory === "personal" ? "bg-blue-500" : "border-blue-500/30 text-blue-300 bg-transparent"
                  }
                >
                  Personal
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

        <Tabs defaultValue="loan-types" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-blue-900/30 backdrop-blur-sm">
            <TabsTrigger value="loan-types">Loan Types</TabsTrigger>
            <TabsTrigger value="quick-actions">Quick Actions</TabsTrigger>
            <TabsTrigger value="my-applications">My Applications</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="loan-types" className="space-y-6">
            {/* Loan Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredLoanTypes.map((loanType) => (
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
                        <div className="text-sm text-blue-300">Rate from</div>
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

                    <div className="space-y-2">
                      <h4 className="font-medium text-white">Key Features:</h4>
                      <ul className="space-y-1">
                        {loanType.features.map((feature, index) => (
                          <li key={index} className="text-sm text-blue-200 flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        {loanType.popularity}% Popular
                      </Badge>
                      <Button className={`bg-gradient-to-r ${loanType.color} text-white`}>Apply Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Loan Benefits */}
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white text-center">Why Choose Our Loans?</CardTitle>
                <CardDescription className="text-blue-200 text-center">
                  Experience the benefits of working with a trusted financial partner
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {loanBenefits.map((benefit, index) => (
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

            {/* Additional Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-blue-400" />
                    Loan Comparison Tool
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Compare different loan options side by side
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600">Compare Loans</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                    Credit Score Check
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Check your credit score and get improvement tips
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600">Check Credit Score</Button>
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
                          <span className="text-blue-300">Progress</span>
                          <span className="text-white">{application.progress}%</span>
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
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                  <CardContent className="p-12 text-center">
                    <FileText className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No Applications Yet</h3>
                    <p className="text-blue-200 mb-6">Start your loan application journey today</p>
                    <Button className="bg-gradient-to-r from-blue-500 to-cyan-600">Apply for a Loan</Button>
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
                    Loan Guides
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">First-Time Home Buyer Guide</h4>
                    <p className="text-sm text-blue-200">Everything you need to know about buying your first home</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Auto Loan Basics</h4>
                    <p className="text-sm text-blue-200">Tips for getting the best auto loan rates</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Business Loan Requirements</h4>
                    <p className="text-sm text-blue-200">What lenders look for in business loan applications</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-blue-400" />
                    Financial Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-blue-500/30 text-blue-300 bg-transparent"
                  >
                    Affordability Calculator
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-blue-500/30 text-blue-300 bg-transparent"
                  >
                    Debt-to-Income Calculator
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-blue-500/30 text-blue-300 bg-transparent"
                  >
                    Refinance Calculator
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-blue-500/30 text-blue-300 bg-transparent"
                  >
                    Early Payoff Calculator
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-400" />
                    Get Help
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Call (555) 123-LOAN
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-blue-500/30 text-blue-300 bg-transparent"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email Support
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-blue-500/30 text-blue-300 bg-transparent"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Live Chat
                  </Button>
                  <div className="text-center pt-2">
                    <p className="text-sm text-blue-200">Available 24/7</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-white">How long does the approval process take?</h4>
                  <p className="text-sm text-blue-200">
                    Most applications are processed within 24-48 hours. Complex loans may take 3-5 business days.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-white">What credit score do I need?</h4>
                  <p className="text-sm text-blue-200">
                    Credit requirements vary by loan type. We work with borrowers across all credit ranges.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-white">Are there any prepayment penalties?</h4>
                  <p className="text-sm text-blue-200">
                    Most of our loans have no prepayment penalties, allowing you to pay off your loan early without
                    fees.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-white">Can I apply for multiple loans?</h4>
                  <p className="text-sm text-blue-200">
                    Yes, you can apply for multiple loan types. Each application is evaluated independently.
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
