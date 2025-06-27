"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calculator,
  FileCheck,
  Upload,
  Clock,
  Home,
  Car,
  Building,
  CreditCard,
  Shield,
  Flag,
  Tractor,
  Briefcase,
  TrendingUp,
  Users,
  CheckCircle,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

const loanTypes = [
  {
    id: "home-loan",
    title: "Home Loan",
    description: "Purchase your dream home with competitive rates",
    icon: Home,
    rate: "6.5% - 7.2%",
    term: "15-30 years",
    minAmount: "$50,000",
    maxAmount: "$2,000,000",
    features: ["No PMI options", "First-time buyer programs", "Jumbo loans available"],
    color: "blue",
  },
  {
    id: "auto-loan",
    title: "Auto Loan",
    description: "Finance your next vehicle with flexible terms",
    icon: Car,
    rate: "4.9% - 8.5%",
    term: "2-7 years",
    minAmount: "$5,000",
    maxAmount: "$150,000",
    features: ["New & used vehicles", "Refinancing available", "Quick approval"],
    color: "green",
  },
  {
    id: "personal-loan",
    title: "Personal Loan",
    description: "Unsecured loans for any personal need",
    icon: CreditCard,
    rate: "8.9% - 24.9%",
    term: "2-7 years",
    minAmount: "$1,000",
    maxAmount: "$100,000",
    features: ["No collateral required", "Fixed rates", "Fast funding"],
    color: "purple",
  },
  {
    id: "business-loan",
    title: "Business Loan",
    description: "Grow your business with flexible financing",
    icon: Building,
    rate: "7.5% - 15.9%",
    term: "1-10 years",
    minAmount: "$10,000",
    maxAmount: "$5,000,000",
    features: ["Equipment financing", "Working capital", "SBA loans"],
    color: "orange",
  },
  {
    id: "fha-loan",
    title: "FHA Loan",
    description: "Government-backed home loans with low down payments",
    icon: Shield,
    rate: "6.2% - 7.0%",
    term: "15-30 years",
    minAmount: "$50,000",
    maxAmount: "$766,550",
    features: ["3.5% down payment", "Lower credit requirements", "Government backed"],
    color: "indigo",
  },
  {
    id: "va-loan",
    title: "VA Loan",
    description: "Exclusive benefits for military veterans",
    icon: Flag,
    rate: "6.0% - 6.8%",
    term: "15-30 years",
    minAmount: "$50,000",
    maxAmount: "$766,550",
    features: ["No down payment", "No PMI", "Veteran exclusive"],
    color: "red",
  },
  {
    id: "usda-loan",
    title: "USDA Loan",
    description: "Rural development loans with zero down payment",
    icon: Tractor,
    rate: "6.3% - 7.1%",
    term: "30 years",
    minAmount: "$50,000",
    maxAmount: "$500,000",
    features: ["Zero down payment", "Rural areas only", "Income limits apply"],
    color: "emerald",
  },
  {
    id: "sba-loan",
    title: "SBA Loan",
    description: "Small Business Administration guaranteed loans",
    icon: Briefcase,
    rate: "11.5% - 16.5%",
    term: "5-25 years",
    minAmount: "$25,000",
    maxAmount: "$5,000,000",
    features: ["Government guaranteed", "Lower down payments", "Flexible terms"],
    color: "amber",
  },
]

const quickActions = [
  {
    title: "Loan Calculator",
    description: "Calculate monthly payments and total interest",
    icon: Calculator,
    href: "/citizen/loan-center/calculator",
    color: "blue",
  },
  {
    title: "Pre-Qualification",
    description: "Check your eligibility without affecting credit",
    icon: FileCheck,
    href: "/citizen/loan-center/pre-qualification",
    color: "green",
  },
  {
    title: "Upload Documents",
    description: "Submit required documentation securely",
    icon: Upload,
    href: "/citizen/loan-center/documents",
    color: "purple",
  },
  {
    title: "Application Status",
    description: "Track your loan application progress",
    icon: Clock,
    href: "/citizen/loan-center/status",
    color: "orange",
  },
]

const recentApplications = [
  {
    id: "APP-2024-001",
    type: "Home Loan",
    amount: "$450,000",
    status: "Under Review",
    progress: 65,
    submittedDate: "2024-01-10",
    nextStep: "Appraisal scheduled",
  },
  {
    id: "APP-2024-002",
    type: "Auto Loan",
    amount: "$35,000",
    status: "Approved",
    progress: 100,
    submittedDate: "2024-01-05",
    nextStep: "Ready for funding",
  },
]

export default function LoanCenterPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "from-blue-500/10 to-blue-600/10 border-blue-500/20 text-blue-400",
      green: "from-green-500/10 to-green-600/10 border-green-500/20 text-green-400",
      purple: "from-purple-500/10 to-purple-600/10 border-purple-500/20 text-purple-400",
      orange: "from-orange-500/10 to-orange-600/10 border-orange-500/20 text-orange-400",
      indigo: "from-indigo-500/10 to-indigo-600/10 border-indigo-500/20 text-indigo-400",
      red: "from-red-500/10 to-red-600/10 border-red-500/20 text-red-400",
      emerald: "from-emerald-500/10 to-emerald-600/10 border-emerald-500/20 text-emerald-400",
      amber: "from-amber-500/10 to-amber-600/10 border-amber-500/20 text-amber-400",
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  const filteredLoanTypes =
    selectedCategory === "all"
      ? loanTypes
      : loanTypes.filter((loan) => {
          if (selectedCategory === "home") return ["home-loan", "fha-loan", "va-loan", "usda-loan"].includes(loan.id)
          if (selectedCategory === "business") return ["business-loan", "sba-loan"].includes(loan.id)
          if (selectedCategory === "personal") return ["personal-loan", "auto-loan"].includes(loan.id)
          return true
        })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white mb-4">Loan Center</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Access comprehensive loan solutions tailored to your financial needs. From home purchases to business
            expansion, we've got you covered.
          </p>
          <div className="flex items-center justify-center space-x-8 mt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-slate-300">Competitive Rates</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span className="text-slate-300">Fast Approval</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span className="text-slate-300">Expert Support</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/50">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Quick Actions</CardTitle>
            <CardDescription className="text-slate-300">Get started with these essential loan tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Link key={action.title} href={action.href}>
                  <Card
                    className={`bg-gradient-to-br ${getColorClasses(action.color)} hover:scale-105 transition-all duration-200 cursor-pointer`}
                  >
                    <CardContent className="p-6 text-center">
                      <action.icon
                        className={`w-12 h-12 mx-auto mb-4 ${action.color === "blue" ? "text-blue-400" : action.color === "green" ? "text-green-400" : action.color === "purple" ? "text-purple-400" : "text-orange-400"}`}
                      />
                      <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
                      <p className="text-slate-300 text-sm">{action.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        {recentApplications.length > 0 && (
          <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Recent Applications</CardTitle>
              <CardDescription className="text-slate-300">Track the progress of your loan applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/30">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-white font-semibold">{app.type}</h4>
                        <p className="text-slate-400 text-sm">Application ID: {app.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{app.amount}</p>
                        <Badge
                          variant={app.status === "Approved" ? "default" : "secondary"}
                          className={app.status === "Approved" ? "bg-green-600" : "bg-yellow-600"}
                        >
                          {app.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-slate-300">{app.progress}%</span>
                      </div>
                      <Progress value={app.progress} className="h-2" />
                      <p className="text-slate-400 text-sm">{app.nextStep}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loan Type Categories */}
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className="bg-slate-700 hover:bg-slate-600 border-slate-600"
          >
            All Loans
          </Button>
          <Button
            variant={selectedCategory === "home" ? "default" : "outline"}
            onClick={() => setSelectedCategory("home")}
            className="bg-slate-700 hover:bg-slate-600 border-slate-600"
          >
            Home Loans
          </Button>
          <Button
            variant={selectedCategory === "business" ? "default" : "outline"}
            onClick={() => setSelectedCategory("business")}
            className="bg-slate-700 hover:bg-slate-600 border-slate-600"
          >
            Business Loans
          </Button>
          <Button
            variant={selectedCategory === "personal" ? "default" : "outline"}
            onClick={() => setSelectedCategory("personal")}
            className="bg-slate-700 hover:bg-slate-600 border-slate-600"
          >
            Personal Loans
          </Button>
        </div>

        {/* Loan Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLoanTypes.map((loan) => (
            <Card
              key={loan.id}
              className={`bg-gradient-to-br ${getColorClasses(loan.color)} hover:scale-105 transition-all duration-200`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <loan.icon
                    className={`w-8 h-8 ${loan.color === "blue" ? "text-blue-400" : loan.color === "green" ? "text-green-400" : loan.color === "purple" ? "text-purple-400" : loan.color === "orange" ? "text-orange-400" : loan.color === "indigo" ? "text-indigo-400" : loan.color === "red" ? "text-red-400" : loan.color === "emerald" ? "text-emerald-400" : "text-amber-400"}`}
                  />
                  <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                    {loan.rate}
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl">{loan.title}</CardTitle>
                <CardDescription className="text-slate-300">{loan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Term</p>
                    <p className="text-white font-medium">{loan.term}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Amount</p>
                    <p className="text-white font-medium">
                      {loan.minAmount} - {loan.maxAmount}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-slate-400 text-sm font-medium">Key Features:</p>
                  <ul className="space-y-1">
                    {loan.features.map((feature, index) => (
                      <li key={index} className="text-slate-300 text-sm flex items-center">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Link href={`/citizen/loan-center/${loan.id}`} className="flex-1">
                    <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white">Apply Now</Button>
                  </Link>
                  <Link href={`/citizen/loan-center/calculator?type=${loan.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                    >
                      <Calculator className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30">
          <CardContent className="p-8 text-center">
            <DollarSign className="w-16 h-16 mx-auto mb-4 text-blue-400" />
            <h3 className="text-2xl font-bold text-white mb-2">Need Help Choosing?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Our loan specialists are here to help you find the perfect financing solution. Get personalized
              recommendations based on your financial situation.
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700">Speak with Specialist</Button>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
                Schedule Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
