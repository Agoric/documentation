"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Crown,
  Building2,
  Users,
  Coins,
  Shield,
  Home,
  TrendingUp,
  Gamepad2,
  Scale,
  Globe,
  CreditCard,
  Settings,
  ChevronRight,
  Target,
  Award,
  BarChart3,
  Warehouse,
} from "lucide-react"

const platformModules = [
  {
    category: "Core Banking",
    description: "Complete banking and financial services",
    modules: [
      {
        title: "Individual Banking",
        description: "Personal banking with holographic interface",
        path: "/dashboard/banking",
        icon: CreditCard,
        color: "from-blue-500 to-cyan-600",
        features: ["Account Management", "Transactions", "Credit Cards", "Loans"],
      },
      {
        title: "Business Banking",
        description: "Commercial banking with double coverage",
        path: "/dashboard/banking/business",
        icon: Building2,
        color: "from-purple-500 to-indigo-600",
        features: ["Business Accounts", "Commercial Loans", "Payroll", "Treasury"],
      },
      {
        title: "Admin Banking Control",
        description: "Supreme authority banking oversight",
        path: "/admin/banking",
        icon: Crown,
        color: "from-amber-500 to-yellow-600",
        features: ["System Control", "Compliance", "Risk Management", "Reporting"],
      },
    ],
  },
  {
    category: "E-Commerce & Marketplace",
    description: "Holographic product marketplace and real estate",
    modules: [
      {
        title: "Holographic Products",
        description: "3D holographic product marketplace",
        path: "/dashboard/ecommerex/holographic-products",
        icon: Warehouse,
        color: "from-cyan-500 to-blue-600",
        features: ["3D Visualization", "AR/VR Support", "Product Comparison", "Holographic Labels"],
      },
      {
        title: "Real Estate Marketplace",
        description: "Property investment and trading platform",
        path: "/dashboard/ecommerex/real-estate",
        icon: Home,
        color: "from-green-500 to-emerald-600",
        features: ["Property Listings", "Virtual Tours", "Investment Tools", "Market Analytics"],
      },
    ],
  },
  {
    category: "Investment & Ownership",
    description: "Fractional ownership and profit distribution",
    modules: [
      {
        title: "Fractional Ownership",
        description: "Shared ownership of assets and commodities",
        path: "/dashboard/fractional-ownership",
        icon: Coins,
        color: "from-amber-500 to-orange-600",
        features: ["Asset Fractionalization", "ROI Tracking", "Ownership Certificates", "Profit Sharing"],
      },
      {
        title: "Profit Distribution",
        description: "Automated profit sharing system",
        path: "/dashboard/profit-distribution",
        icon: TrendingUp,
        color: "from-green-500 to-teal-600",
        features: ["Automated Distribution", "Performance Analytics", "Yield Optimization", "Tax Reporting"],
      },
      {
        title: "SnapDax Trading",
        description: "Supreme trading platform with AI",
        path: "/dashboard/snap-dax",
        icon: BarChart3,
        color: "from-purple-500 to-pink-600",
        features: ["AI Trading", "Market Analysis", "Portfolio Management", "Risk Assessment"],
      },
    ],
  },
  {
    category: "Insurance & Protection",
    description: "Comprehensive insurance and coverage systems",
    modules: [
      {
        title: "Individual Coverage",
        description: "Personal insurance and credit protection",
        path: "/dashboard/insurance",
        icon: Shield,
        color: "from-blue-500 to-indigo-600",
        features: ["Credit Protection", "Identity Theft", "Financial Counseling", "Emergency Funds"],
      },
      {
        title: "Business Coverage",
        description: "Commercial insurance with double protection",
        path: "/dashboard/insurance/business-coverage",
        icon: Building2,
        color: "from-purple-500 to-violet-600",
        features: ["Commercial Property", "Business Credit", "Liability Coverage", "Key Person Insurance"],
      },
    ],
  },
  {
    category: "Citizenship & Authority",
    description: "Global citizenship and authority systems",
    modules: [
      {
        title: "Global Citizenship",
        description: "Digital citizenship registration",
        path: "/citizenship/register",
        icon: Globe,
        color: "from-cyan-500 to-blue-600",
        features: ["Digital Passport", "Citizenship Benefits", "Global Access", "Diplomatic Services"],
      },
      {
        title: "Citizen Profile",
        description: "Manage your digital citizenship",
        path: "/citizenship/profile",
        icon: Users,
        color: "from-blue-500 to-cyan-600",
        features: ["Profile Management", "Citizenship Status", "Benefits Tracking", "Document Vault"],
      },
      {
        title: "Authority Progression",
        description: "Advance through authority levels",
        path: "/dashboard/authority/progression",
        icon: Crown,
        color: "from-amber-500 to-yellow-600",
        features: ["Level Progression", "Authority Badges", "Privileges", "Recognition System"],
      },
      {
        title: "Authority Badges",
        description: "Collect and display authority badges",
        path: "/dashboard/authority/badges",
        icon: Award,
        color: "from-yellow-500 to-amber-600",
        features: ["Badge Collection", "Achievement System", "Rarity Levels", "Display Options"],
      },
    ],
  },
  {
    category: "Gamification & Engagement",
    description: "Gaming elements and user engagement",
    modules: [
      {
        title: "Gamification Dashboard",
        description: "Gaming elements and rewards system",
        path: "/dashboard/gamification",
        icon: Gamepad2,
        color: "from-pink-500 to-rose-600",
        features: ["Achievement System", "Leaderboards", "Rewards Program", "Progress Tracking"],
      },
    ],
  },
  {
    category: "Legal & Compliance",
    description: "Legal framework and compliance systems",
    modules: [
      {
        title: "Legal Framework",
        description: "Comprehensive legal documentation",
        path: "/legal",
        icon: Scale,
        color: "from-gray-500 to-slate-600",
        features: ["Terms of Service", "Privacy Policy", "Compliance", "Risk Disclosure"],
      },
      {
        title: "Admiralty Jurisdiction",
        description: "Maritime and international law",
        path: "/legal/admiralty-jurisdiction",
        icon: Scale,
        color: "from-blue-500 to-navy-600",
        features: ["Maritime Law", "International Treaties", "Jurisdictional Rights", "Legal Precedents"],
      },
      {
        title: "Digital Domicile",
        description: "Digital residency and domicile rights",
        path: "/legal/digital-domicile",
        icon: Globe,
        color: "from-cyan-500 to-teal-600",
        features: ["Digital Residency", "Tax Optimization", "Legal Domicile", "Jurisdictional Benefits"],
      },
    ],
  },
  {
    category: "Administrative Control",
    description: "Supreme authority administrative systems",
    modules: [
      {
        title: "Supreme Authority Admin",
        description: "Ultimate administrative control panel",
        path: "/admin",
        icon: Crown,
        color: "from-amber-500 to-yellow-600",
        features: ["User Management", "Financial Oversight", "Security Control", "System Administration"],
      },
      {
        title: "Universal Configurator",
        description: "Configure all platform systems",
        path: "/admin/configure",
        icon: Settings,
        color: "from-purple-500 to-indigo-600",
        features: ["System Configuration", "Module Settings", "Access Control", "Feature Toggles"],
      },
    ],
  },
]

const platformStats = {
  totalUsers: 125847,
  totalAssets: 2847392847,
  dailyTransactions: 45892,
  systemUptime: 99.97,
  activeCountries: 195,
  productListings: 89342,
  realEstateProperties: 12847,
  fractionalAssets: 5847,
}

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("Core Banking")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-amber-900/20" />
        <div className="relative z-10 p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center space-x-4 mb-6">
                <SupremeAuthorityCoin size="xl" variant="logo" animated />
                <div>
                  <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-clip-text text-transparent font-serif">
                    SnappAiFi
                  </h1>
                  <p className="text-2xl text-amber-300/80 italic font-serif">Suprema Auctoritas Financialis</p>
                </div>
              </div>

              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-4">
                  The Ultimate Digital Financial Sovereignty Platform
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Experience the future of finance with holographic products, global citizenship, fractional ownership,
                  and supreme authority governance. Built on the principles of digital sovereignty and financial
                  innovation.
                </p>
              </div>

              {/* Platform Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div className="text-3xl font-bold text-amber-400">{platformStats.totalUsers.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Global Citizens</div>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="text-3xl font-bold text-amber-400">
                    ${(platformStats.totalAssets / 1000000).toFixed(0)}M
                  </div>
                  <div className="text-sm text-gray-400">Total Assets</div>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <div className="text-3xl font-bold text-amber-400">
                    {platformStats.dailyTransactions.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">Daily Transactions</div>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <div className="text-3xl font-bold text-amber-400">{platformStats.systemUptime}%</div>
                  <div className="text-sm text-gray-400">System Uptime</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Tabs defaultValue="modules" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 bg-purple-900/50 border-amber-400/30">
              <TabsTrigger value="modules" className="data-[state=active]:bg-amber-500/20">
                <Target className="w-4 h-4 mr-2" />
                Platform Modules
              </TabsTrigger>
              <TabsTrigger value="overview" className="data-[state=active]:bg-amber-500/20">
                <BarChart3 className="w-4 h-4 mr-2" />
                System Overview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="modules" className="space-y-8">
              {/* Category Selection */}
              <div className="flex flex-wrap gap-2 justify-center">
                {platformModules.map((category) => (
                  <Button
                    key={category.category}
                    variant={selectedCategory === category.category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.category)}
                    className={
                      selectedCategory === category.category
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                        : "border-amber-400/30 text-amber-300 hover:bg-amber-500/20"
                    }
                  >
                    {category.category}
                  </Button>
                ))}
              </div>

              {/* Selected Category Modules */}
              {platformModules
                .filter((category) => category.category === selectedCategory)
                .map((category) => (
                  <div key={category.category} className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-amber-300 font-serif">{category.category}</h3>
                      <p className="text-gray-400 italic">{category.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.modules.map((module, index) => {
                        const Icon = module.icon

                        return (
                          <motion.div
                            key={module.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                          >
                            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/20 hover:border-amber-400/40 transition-all duration-300 hover:scale-105 cursor-pointer group">
                              <CardHeader>
                                <div className="flex items-center justify-between">
                                  <div
                                    className={`p-3 rounded-full bg-gradient-to-r ${module.color} bg-opacity-20 border border-white/20`}
                                  >
                                    <Icon className="w-6 h-6 text-white" />
                                  </div>
                                  <ChevronRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                                </div>
                                <CardTitle className="text-amber-300 font-serif">{module.title}</CardTitle>
                                <CardDescription className="text-gray-400">{module.description}</CardDescription>
                              </CardHeader>

                              <CardContent className="space-y-4">
                                <div className="flex flex-wrap gap-1">
                                  {module.features.map((feature) => (
                                    <Badge
                                      key={feature}
                                      variant="outline"
                                      className="text-xs border-amber-400/30 text-amber-300"
                                    >
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>

                                <Link href={module.path}>
                                  <Button
                                    className={`w-full bg-gradient-to-r ${module.color} hover:opacity-90 text-white font-semibold`}
                                  >
                                    <Icon className="w-4 h-4 mr-2" />
                                    Launch Module
                                  </Button>
                                </Link>
                              </CardContent>
                            </Card>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-blue-300 text-sm flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Global Reach
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-400">{platformStats.activeCountries}</div>
                    <p className="text-sm text-blue-200/70">Active Countries</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-green-300 text-sm flex items-center">
                      <Warehouse className="w-4 h-4 mr-2" />
                      Marketplace
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-400">
                      {platformStats.productListings.toLocaleString()}
                    </div>
                    <p className="text-sm text-green-200/70">Product Listings</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-900/50 to-yellow-900/50 border-amber-400/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-amber-300 text-sm flex items-center">
                      <Home className="w-4 h-4 mr-2" />
                      Real Estate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-amber-400">
                      {platformStats.realEstateProperties.toLocaleString()}
                    </div>
                    <p className="text-sm text-amber-200/70">Properties</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-purple-300 text-sm flex items-center">
                      <Coins className="w-4 h-4 mr-2" />
                      Fractional Assets
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-400">
                      {platformStats.fractionalAssets.toLocaleString()}
                    </div>
                    <p className="text-sm text-purple-200/70">Ownership Tokens</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Access Dashboard */}
              <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
                <CardHeader>
                  <CardTitle className="text-amber-300 font-serif text-xl">Quick Access Dashboard</CardTitle>
                  <CardDescription className="text-purple-200">
                    Frequently accessed modules and features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link href="/dashboard/banking">
                      <Button className="w-full h-20 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 flex flex-col items-center justify-center">
                        <CreditCard className="w-6 h-6 mb-1" />
                        <span className="text-sm">Banking</span>
                      </Button>
                    </Link>
                    <Link href="/dashboard/ecommerex/holographic-products">
                      <Button className="w-full h-20 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 flex flex-col items-center justify-center">
                        <Warehouse className="w-6 h-6 mb-1" />
                        <span className="text-sm">Products</span>
                      </Button>
                    </Link>
                    <Link href="/dashboard/fractional-ownership">
                      <Button className="w-full h-20 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 flex flex-col items-center justify-center">
                        <Coins className="w-6 h-6 mb-1" />
                        <span className="text-sm">Ownership</span>
                      </Button>
                    </Link>
                    <Link href="/admin">
                      <Button className="w-full h-20 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 flex flex-col items-center justify-center">
                        <Crown className="w-6 h-6 mb-1" />
                        <span className="text-sm">Admin</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-16 border-t border-amber-400/20 p-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <SupremeAuthorityCoin size="md" variant="logo" />
            <p className="text-amber-300 font-serif text-lg">Snapifi Platform Demo</p>
          </div>
          <p className="text-gray-400 text-sm">
            Comprehensive financial sovereignty platform with holographic commerce, global citizenship, and supreme
            authority governance.
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-500">
            <span>© 2024 Snapifi Platform</span>
            <span>•</span>
            <span>Digital Sovereignty</span>
            <span>•</span>
            <span>Financial Innovation</span>
          </div>
        </div>
      </div>
    </div>
  )
}
