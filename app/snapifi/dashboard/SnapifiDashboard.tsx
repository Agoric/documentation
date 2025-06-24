"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Bot,
  Brain,
  Home,
  MapPin,
  TrendingUp,
  Zap,
  BookOpen,
  Building,
  Coins,
  CreditCard,
  Cpu,
  Users,
  Crown,
} from "lucide-react"
import { GeniusAIConcierge } from "@/components/snapifi/genius-ai-concierge"
import { MasterBanker } from "@/components/snapifi/master-banker"
import { GeoAnalytics } from "@/components/snapifi/geo-analytics"
import { InclusiveLending } from "@/components/snapifi/inclusive-lending"
import { RWATokenization } from "@/components/snapifi/rwa-tokenization"
import { QuantumInsights } from "@/components/snapifi/quantum-insights"
import { FinancialEducation } from "@/components/snapifi/financial-education"
import { VehicleTracking } from "@/components/snapifi/vehicle-tracking"

export default function SnapifiDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [userMetrics, setUserMetrics] = useState({
    creditScore: 750,
    totalAssets: 125000,
    loanEligibility: 450000,
    portfolioValue: 85000,
    savingsGoal: 75,
    quantumProcessingSpeed: "99.7%",
    aiInteractions: 247,
    educationProgress: 68,
  })

  const quickStats = [
    {
      title: "Credit Score",
      value: userMetrics.creditScore,
      change: "+15 this month",
      icon: CreditCard,
      color: "text-green-600",
    },
    {
      title: "Total Assets",
      value: `$${userMetrics.totalAssets.toLocaleString()}`,
      change: "+8.2% this quarter",
      icon: Building,
      color: "text-blue-600",
    },
    {
      title: "Loan Eligibility",
      value: `$${userMetrics.loanEligibility.toLocaleString()}`,
      change: "50-year terms available",
      icon: Home,
      color: "text-purple-600",
    },
    {
      title: "Portfolio Value",
      value: `$${userMetrics.portfolioValue.toLocaleString()}`,
      change: "+12.4% YTD",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  const platformFeatures = [
    {
      id: "lending",
      title: "Inclusive Lending",
      description: "Asset-backed loans with 50-year terms and NFT tokenization",
      icon: Building,
      status: "Active",
      users: "2.3K",
      color: "bg-blue-500",
    },
    {
      id: "geo-analytics",
      title: "Geo-Analytics",
      description: "Cost-of-living analysis with Zillow API integration",
      icon: MapPin,
      status: "Active",
      users: "1.8K",
      color: "bg-green-500",
    },
    {
      id: "rwa-tokens",
      title: "RWA Tokenization",
      description: "Fractionalized real estate and asset ownership",
      icon: Coins,
      status: "Active",
      users: "956",
      color: "bg-purple-500",
    },
    {
      id: "ai-concierge",
      title: "Genius AI Concierge",
      description: "Personalized financial assistant with quantum processing",
      icon: Bot,
      status: "Active",
      users: "3.1K",
      color: "bg-orange-500",
    },
    {
      id: "master-banker",
      title: "Master Banker",
      description: "Advanced financial advisory with predictive insights",
      icon: Brain,
      status: "Active",
      users: "1.2K",
      color: "bg-red-500",
    },
    {
      id: "quantum-insights",
      title: "Quantum Computing",
      description: "Ultra-fast calculations and real-time predictions",
      icon: Cpu,
      status: "Active",
      users: "All",
      color: "bg-cyan-500",
    },
  ]

  return (
    <div className="space-y-8 royal-pattern min-h-screen p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="lending">Lending</TabsTrigger>
          <TabsTrigger value="geo-analytics">Geo-Analytics</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="ai-concierge">AI Concierge</TabsTrigger>
          <TabsTrigger value="quantum">Quantum</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quantum Processing Status */}
          <Card className="royal-card royal-shimmer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-royal-gradient rounded-xl shadow-royal-glow">
                    <Cpu className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="royal-subheading">Quantum Processing Unit Status</CardTitle>
                    <Badge className="royal-badge mt-2">
                      <Zap className="h-3 w-3 mr-1" />
                      Royal Active
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-600">{userMetrics.quantumProcessingSpeed}</div>
                  <p className="text-sm text-muted-foreground">Processing Efficiency</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-600">0.003s</div>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-600">∞</div>
                  <p className="text-sm text-muted-foreground">Parallel Calculations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card key={index} className="royal-card royal-hover">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-semibold text-royal-700">{stat.title}</CardTitle>
                    <div className="p-2 bg-royal-gradient rounded-lg">
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-royal font-bold royal-text">{stat.value}</div>
                    <p className="text-sm gold-accent">{stat.change}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Platform Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((feature) => {
              const IconComponent = feature.icon
              return (
                <Card key={feature.id} className="royal-card royal-hover cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-royal-gradient rounded-xl shadow-royal">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-royal royal-text">{feature.title}</CardTitle>
                          <Badge className="royal-badge mt-1">
                            <Crown className="h-3 w-3 mr-1" />
                            {feature.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        {feature.users} users
                      </div>
                      <Button
                        size="sm"
                        onClick={() => setActiveTab(feature.id.replace("-", "_"))}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        Access
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* AI Interaction Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-blue-600" />
                  <span>AI Concierge Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Interactions</span>
                    <span className="font-bold">{userMetrics.aiInteractions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recommendations Accepted</span>
                    <span className="font-bold">89%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Financial Goals Achieved</span>
                    <span className="font-bold">12/15</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <span>Education Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Courses Completed</span>
                    <span className="font-bold">8/12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Certificates Earned</span>
                    <span className="font-bold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overall Progress</span>
                    <span className="font-bold">{userMetrics.educationProgress}%</span>
                  </div>
                  <Progress value={userMetrics.educationProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lending">
          <InclusiveLending />
        </TabsContent>

        <TabsContent value="geo-analytics">
          <GeoAnalytics />
        </TabsContent>

        <TabsContent value="investments">
          <RWATokenization />
        </TabsContent>

        <TabsContent value="ai-concierge">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GeniusAIConcierge />
            <MasterBanker />
          </div>
        </TabsContent>

        <TabsContent value="quantum">
          <QuantumInsights />
        </TabsContent>

        <TabsContent value="education">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FinancialEducation />
            <VehicleTracking />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
