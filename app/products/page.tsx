"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Home,
  CreditCard,
  Building2,
  Coins,
  ShoppingCart,
  Zap,
  ArrowRight,
  Shield,
  BarChart3,
  Globe,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

const products = [
  {
    id: "snap-dax",
    name: "SNAP-DAX",
    subtitle: "Digital Asset Exchange",
    description:
      "Advanced cryptocurrency trading platform with real-time market data, portfolio management, and institutional-grade security.",
    icon: Coins,
    color: "from-blue-600 to-purple-600",
    features: [
      "Real-time trading with 50+ cryptocurrencies",
      "Advanced charting and technical analysis",
      "Automated trading bots and strategies",
      "Staking and yield farming opportunities",
      "DeFi protocol integration",
      "Institutional custody solutions",
    ],
    howItWorks: [
      "Create account and complete KYC verification",
      "Fund your wallet via bank transfer or crypto deposit",
      "Access live market data and trading tools",
      "Execute trades with advanced order types",
      "Monitor portfolio performance and analytics",
      "Earn passive income through staking",
    ],
    link: "/snap-dax/digital-asset-exchange",
    status: "Live Trading",
  },
  {
    id: "credit-suite",
    name: "Credit Suite",
    subtitle: "Credit Management & Optimization",
    description:
      "Comprehensive credit monitoring, repair, and optimization platform with AI-powered recommendations and real-time credit score tracking.",
    icon: CreditCard,
    color: "from-emerald-600 to-teal-600",
    features: [
      "Real-time credit score monitoring (all 3 bureaus)",
      "AI-powered credit repair recommendations",
      "Dispute management and tracking",
      "Credit utilization optimization",
      "Identity theft protection",
      "Credit building strategies and tools",
    ],
    howItWorks: [
      "Connect your credit accounts securely",
      "AI analyzes your credit profile",
      "Receive personalized improvement strategies",
      "Track disputes and repair progress",
      "Monitor score changes in real-time",
      "Optimize credit utilization automatically",
    ],
    link: "/credit-suite",
    status: "AI Powered",
  },
  {
    id: "real-estate",
    name: "Real Estate Marketplace",
    subtitle: "Property Investment Platform",
    description:
      "End-to-end real estate investment platform with live property data, investment analysis, and automated bidding systems.",
    icon: Home,
    color: "from-orange-600 to-red-600",
    features: [
      "Live property listings with Zillow integration",
      "Investment analysis and ROI calculators",
      "Automated bidding and offer management",
      "Property comparison and market analytics",
      "Financing pre-approval integration",
      "Portfolio tracking and performance metrics",
    ],
    howItWorks: [
      "Browse live property listings nationwide",
      "Analyze investment potential with AI tools",
      "Get pre-approved for financing instantly",
      "Submit competitive offers automatically",
      "Track property performance and ROI",
      "Manage entire real estate portfolio",
    ],
    link: "/real-estate",
    status: "Live Data",
  },
  {
    id: "loan-center",
    name: "Loan Center",
    subtitle: "Multi-Loan Processing Hub",
    description:
      "Comprehensive loan origination platform supporting personal, business, auto, and mortgage loans with instant pre-qualification.",
    icon: Building2,
    color: "from-indigo-600 to-blue-600",
    features: [
      "Multiple loan types (Personal, Auto, Home, Business)",
      "Instant pre-qualification and approval",
      "Document management and e-signatures",
      "Rate comparison across 100+ lenders",
      "Application tracking and status updates",
      "Automated underwriting and processing",
    ],
    howItWorks: [
      "Select loan type and enter basic information",
      "Get instant pre-qualification decision",
      "Compare rates from multiple lenders",
      "Upload documents through secure portal",
      "Track application status in real-time",
      "Receive funds upon final approval",
    ],
    link: "/citizen/loan-center",
    status: "Instant Approval",
  },
  {
    id: "business-suite",
    name: "Business Suite",
    subtitle: "Enterprise Financial Tools",
    description:
      "Complete business financial management platform with accounting, payroll, invoicing, and business credit solutions.",
    icon: Building2,
    color: "from-purple-600 to-pink-600",
    features: [
      "Business credit monitoring and building",
      "Automated accounting and bookkeeping",
      "Payroll processing and tax compliance",
      "Invoice generation and payment processing",
      "Cash flow forecasting and analytics",
      "Business loan and line of credit access",
    ],
    howItWorks: [
      "Register business and connect bank accounts",
      "Set up automated accounting workflows",
      "Process payroll and handle tax filings",
      "Generate and send professional invoices",
      "Monitor cash flow and financial health",
      "Access business credit and funding options",
    ],
    link: "/business-suite",
    status: "Enterprise Ready",
  },
  {
    id: "investment-portal",
    name: "Investment Portal",
    subtitle: "High-Yield Investment Platform",
    description:
      "Exclusive investment opportunities with 10-25% annual returns through real estate, business loans, and alternative investments.",
    icon: TrendingUp,
    color: "from-yellow-600 to-orange-600",
    features: [
      "10-25% annual returns on investments",
      "Diversified portfolio across asset classes",
      "Real estate and business loan investments",
      "Monthly income distributions",
      "Risk-adjusted investment strategies",
      "Institutional-grade due diligence",
    ],
    howItWorks: [
      "Complete investor accreditation process",
      "Review available investment opportunities",
      "Select investments based on risk tolerance",
      "Fund investments through secure transfers",
      "Receive monthly income distributions",
      "Monitor portfolio performance and returns",
    ],
    link: "/investors/portal",
    status: "High Yield",
  },
  {
    id: "ecommerex",
    name: "EcommerEX",
    subtitle: "Holographic Shopping Experience",
    description:
      "Next-generation e-commerce platform with holographic product visualization, AI recommendations, and immersive shopping experiences.",
    icon: ShoppingCart,
    color: "from-cyan-600 to-blue-600",
    features: [
      "Holographic 3D product visualization",
      "360° product views and AR try-on",
      "AI-powered product recommendations",
      "Advanced product comparison tools",
      "Gamified shopping rewards system",
      "Premium member exclusive access",
    ],
    howItWorks: [
      "Browse products with holographic previews",
      "Use AR to visualize products in your space",
      "Compare products with advanced tools",
      "Earn rewards through gamified shopping",
      "Access exclusive premium products",
      "Enjoy personalized AI recommendations",
    ],
    link: "/commerce/marketplace",
    status: "Holographic",
  },
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 py-16">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Snapifi Financial Platform</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Complete financial ecosystem with 7 integrated products designed to maximize your wealth and streamline
              your financial life
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                <Sparkles className="w-5 h-5 mr-2" />
                AI Powered
              </Badge>
              <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                <Shield className="w-5 h-5 mr-2" />
                Bank Grade Security
              </Badge>
              <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                <Globe className="w-5 h-5 mr-2" />
                Global Access
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${product.color} shadow-lg`}>
                      <product.icon className="w-8 h-8 text-white" />
                    </div>
                    <Badge className={`bg-gradient-to-r ${product.color} text-white`}>{product.status}</Badge>
                  </div>
                  <CardTitle className="text-2xl text-white mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-slate-300 text-lg">{product.subtitle}</CardDescription>
                  <p className="text-slate-400 mt-3">{product.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Key Features */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="text-slate-300 flex items-start">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* How It Works */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-green-400" />
                      How It Works
                    </h4>
                    <ol className="space-y-2">
                      {product.howItWorks.map((step, idx) => (
                        <li key={idx} className="text-slate-300 flex items-start">
                          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            {idx + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4">
                    <Link href={product.link}>
                      <Button
                        className={`w-full bg-gradient-to-r ${product.color} hover:opacity-90 text-white font-semibold py-3 transition-all duration-300`}
                      >
                        Access {product.name}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Platform Benefits */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Snapifi Platform?</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Integrated ecosystem designed to maximize your financial potential across all areas of wealth building
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">High Returns</h3>
              <p className="text-slate-300">10-25% annual returns across multiple investment vehicles</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Integration</h3>
              <p className="text-slate-300">Advanced AI across all products for optimal decision making</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Bank-Grade Security</h3>
              <p className="text-slate-300">Enterprise security with full regulatory compliance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
