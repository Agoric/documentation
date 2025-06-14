"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HolographicBackground } from "@/components/ui/holographic-background"
import { ImperialCoinDisplay } from "@/components/ui/imperial-coin-display"
import { ImperialAmbientController } from "@/components/ui/imperial-ambient-controller"
import { RoyalHolographicTitle } from "@/components/ui/royal-holographic-title"
import {
  Home,
  TrendingUp,
  Heart,
  Crown,
  Shield,
  Star,
  Award,
  Target,
  Calendar,
  MapPin,
  Activity,
  Plus,
  Eye,
  Settings,
} from "lucide-react"

export default function SnapifiDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const goals = [
    {
      id: "1",
      name: "Imperial Estate Purchase",
      category: "Real Estate",
      targetAmount: 2500000,
      currentAmount: 1750000,
      targetDate: "2025-06-01",
      priority: "high",
      progress: 70,
    },
    {
      id: "2",
      name: "Royal Retirement Fund",
      category: "Retirement",
      targetAmount: 5000000,
      currentAmount: 2100000,
      targetDate: "2035-12-31",
      priority: "medium",
      progress: 42,
    },
    {
      id: "3",
      name: "Crown Jewels Collection",
      category: "Luxury",
      targetAmount: 500000,
      currentAmount: 425000,
      targetDate: "2024-12-31",
      priority: "high",
      progress: 85,
    },
    {
      id: "4",
      name: "Imperial Education Fund",
      category: "Education",
      targetAmount: 250000,
      currentAmount: 180000,
      targetDate: "2026-09-01",
      priority: "medium",
      progress: 72,
    },
  ]

  const properties = [
    {
      id: "1",
      name: "Royal Manhattan Penthouse",
      location: "New York, NY",
      value: 8500000,
      type: "Luxury Residential",
      roi: 12.5,
      status: "owned",
    },
    {
      id: "2",
      name: "Imperial Beach Villa",
      location: "Malibu, CA",
      value: 6200000,
      type: "Vacation Home",
      roi: 8.7,
      status: "owned",
    },
    {
      id: "3",
      name: "Crown Commercial Tower",
      location: "Chicago, IL",
      value: 15000000,
      type: "Commercial",
      roi: 15.2,
      status: "opportunity",
    },
  ]

  const wellnessMetrics = [
    { name: "Financial Stress Level", value: 15, target: 20, status: "excellent" },
    { name: "Goal Achievement Rate", value: 85, target: 80, status: "excellent" },
    { name: "Investment Confidence", value: 92, target: 85, status: "excellent" },
    { name: "Wealth Growth Pace", value: 78, target: 75, status: "good" },
  ]

  const totalGoalValue = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const totalPropertyValue = properties.filter((p) => p.status === "owned").reduce((sum, prop) => sum + prop.value, 0)

  return (
    <div className="min-h-screen relative overflow-hidden">
      <HolographicBackground variant="financial" />
      <ImperialAmbientController autoStart={true} defaultTrack="imperial-dawn" compact={true} />

      <div className="relative z-10 p-6 space-y-8">
        {/* Imperial Header with Royal Holographic Title */}
        <div className="text-center py-12">
          <ImperialCoinDisplay size="large" showDetails={false} animated={true} />

          <div className="mt-8 space-y-6">
            <RoyalHolographicTitle size="xl" className="mb-4">
              Imperial Wealth Management
            </RoyalHolographicTitle>

            <div className="relative">
              <p className="text-xl text-yellow-300/90 font-medium tracking-wide">
                Supreme Financial Lifestyle Platform
              </p>
              <div className="absolute inset-0 text-xl text-yellow-200/50 blur-sm">
                Supreme Financial Lifestyle Platform
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30 px-4 py-2">
                <Crown className="w-4 h-4 mr-2" />
                Royal Lifestyle
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Wealth Protected
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                Elite Status
              </Badge>
            </div>
          </div>
        </div>

        {/* Wealth Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
            <CardContent className="p-8 text-center">
              <RoyalHolographicTitle size="medium" className="mb-2">
                Total Goal Progress
              </RoyalHolographicTitle>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                ${totalGoalValue.toLocaleString()}
              </div>
              <div className="flex items-center justify-center gap-2 text-green-400 mt-3">
                <TrendingUp className="h-5 w-5" />
                <span className="text-lg">+15.2% this quarter</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
            <CardContent className="p-8 text-center">
              <RoyalHolographicTitle size="medium" className="mb-2">
                Real Estate Portfolio
              </RoyalHolographicTitle>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                ${totalPropertyValue.toLocaleString()}
              </div>
              <div className="flex items-center justify-center gap-2 text-green-400 mt-3">
                <Home className="h-5 w-5" />
                <span className="text-lg">2 properties owned</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
            <CardContent className="p-8 text-center">
              <RoyalHolographicTitle size="medium" className="mb-2">
                Wellness Score
              </RoyalHolographicTitle>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                92/100
              </div>
              <div className="flex items-center justify-center gap-2 text-green-400 mt-3">
                <Heart className="h-5 w-5" />
                <span className="text-lg">Excellent health</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 border-yellow-500/20 h-14">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300 text-lg"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="goals"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300 text-lg"
            >
              Goals
            </TabsTrigger>
            <TabsTrigger
              value="real-estate"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300 text-lg"
            >
              Real Estate
            </TabsTrigger>
            <TabsTrigger
              value="wellness"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300 text-lg"
            >
              Wellness
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300 flex items-center gap-2 text-xl">
                    <Target className="h-6 w-6" />
                    Active Imperial Goals
                  </CardTitle>
                  <CardDescription className="text-yellow-200/60 text-base">
                    Your wealth building objectives
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {goals.slice(0, 3).map((goal) => (
                      <div key={goal.id} className="p-4 bg-yellow-500/5 rounded-lg border border-yellow-400/10">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium text-yellow-200 text-lg">{goal.name}</h4>
                          <Badge
                            className={`text-sm px-3 py-1 ${
                              goal.priority === "high"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {goal.priority}
                          </Badge>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-yellow-300/60">${goal.currentAmount.toLocaleString()}</span>
                            <span className="text-yellow-300/60">${goal.targetAmount.toLocaleString()}</span>
                          </div>
                          <Progress value={goal.progress} className="h-3" />
                          <p className="text-yellow-400/50">{goal.progress}% complete</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300 flex items-center gap-2 text-xl">
                    <Activity className="h-6 w-6" />
                    Recent Imperial Activities
                  </CardTitle>
                  <CardDescription className="text-yellow-200/60 text-base">
                    Latest wealth management actions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        title: "Property Investment Review",
                        description: "Manhattan Penthouse valuation updated",
                        time: "2 hours ago",
                        type: "property",
                        amount: "+$150,000",
                      },
                      {
                        title: "Goal Milestone Achieved",
                        description: "Crown Jewels Collection 85% complete",
                        time: "1 day ago",
                        type: "goal",
                        amount: "85%",
                      },
                      {
                        title: "Wellness Score Update",
                        description: "Financial stress level decreased",
                        time: "3 days ago",
                        type: "wellness",
                        amount: "Improved",
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 p-4 bg-yellow-500/5 rounded-lg border border-yellow-400/10"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-3 h-3 bg-yellow-400 rounded-full mt-2" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-yellow-200 text-lg">{activity.title}</p>
                          <p className="text-yellow-300/60">{activity.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-yellow-400/50">{activity.time}</p>
                            <span className="font-medium text-green-400">{activity.amount}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-8">
            <div className="flex justify-between items-center">
              <RoyalHolographicTitle size="large">Imperial Financial Goals</RoyalHolographicTitle>
              <Button className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/30 px-6 py-3 text-lg">
                <Plus className="h-5 w-5 mr-2" />
                Create Goal
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {goals.map((goal) => (
                <Card
                  key={goal.id}
                  className="bg-black/20 backdrop-blur-md border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-yellow-300 text-xl">{goal.name}</CardTitle>
                        <CardDescription className="text-yellow-200/60 text-base">{goal.category}</CardDescription>
                      </div>
                      <Badge
                        className={`px-3 py-1 ${
                          goal.priority === "high" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {goal.priority} priority
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-yellow-200 text-lg">Progress</span>
                        <span className="text-yellow-300 text-lg">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-4" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-400/20">
                        <div className="text-xl font-bold text-yellow-300">${goal.currentAmount.toLocaleString()}</div>
                        <div className="text-yellow-200/70">Current</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-400/20">
                        <div className="text-xl font-bold text-yellow-300">${goal.targetAmount.toLocaleString()}</div>
                        <div className="text-yellow-200/70">Target</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-yellow-300/60">
                      <Calendar className="h-5 w-5" />
                      <span className="text-lg">Target: {goal.targetDate}</span>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-yellow-400/30 text-yellow-300 hover:bg-yellow-500/20 px-4 py-2"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-yellow-400/30 text-yellow-300 hover:bg-yellow-500/20 px-4 py-2"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="real-estate" className="space-y-8">
            <div className="flex justify-between items-center">
              <RoyalHolographicTitle size="large">Imperial Real Estate Portfolio</RoyalHolographicTitle>
              <Button className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/30 px-6 py-3 text-lg">
                <Plus className="h-5 w-5 mr-2" />
                Add Property
              </Button>
            </div>

            <div className="space-y-6">
              {properties.map((property) => (
                <Card
                  key={property.id}
                  className="bg-black/20 backdrop-blur-md border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300"
                >
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                          <Home className="h-8 w-8 text-yellow-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-yellow-300 text-xl">{property.name}</h3>
                          <div className="flex items-center gap-2 text-yellow-200/60">
                            <MapPin className="h-4 w-4" />
                            <span className="text-lg">{property.location}</span>
                          </div>
                          <p className="text-yellow-300/60 text-lg">{property.type}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-yellow-300">${property.value.toLocaleString()}</p>
                        <div className="text-lg text-green-400">+{property.roi}% ROI</div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge
                          className={`px-3 py-1 ${
                            property.status === "owned"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {property.status}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-yellow-400/30 text-yellow-300 hover:bg-yellow-500/20 px-4 py-2"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wellness" className="space-y-8">
            <RoyalHolographicTitle size="large">Imperial Financial Wellness</RoyalHolographicTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {wellnessMetrics.map((metric, index) => (
                <Card key={index} className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                  <CardHeader>
                    <CardTitle className="text-yellow-300 text-lg">{metric.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-3xl font-bold text-yellow-400">{metric.value}</span>
                        <Badge
                          className={`px-3 py-1 ${
                            metric.status === "excellent"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {metric.status}
                        </Badge>
                      </div>
                      <Progress value={metric.value} className="h-3" />
                      <div className="text-yellow-300/60">
                        Target: {metric.target} | Current: {metric.value}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-300 text-xl">Wellness Recommendations</CardTitle>
                <CardDescription className="text-yellow-200/60 text-base">
                  AI-powered imperial lifestyle suggestions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      title: "Optimize Investment Allocation",
                      description: "Consider rebalancing portfolio to reduce risk exposure",
                      priority: "medium",
                      impact: "High",
                    },
                    {
                      title: "Increase Emergency Fund",
                      description: "Build emergency reserves to 6 months of expenses",
                      priority: "high",
                      impact: "Medium",
                    },
                    {
                      title: "Diversify Real Estate Holdings",
                      description: "Explore international property investments",
                      priority: "low",
                      impact: "High",
                    },
                  ].map((rec, index) => (
                    <div key={index} className="p-5 bg-yellow-500/5 rounded-lg border border-yellow-400/10">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-yellow-200 text-lg">{rec.title}</h4>
                        <div className="flex gap-2">
                          <Badge
                            className={`text-sm px-3 py-1 ${
                              rec.priority === "high"
                                ? "bg-red-500/20 text-red-400"
                                : rec.priority === "medium"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            {rec.priority}
                          </Badge>
                          <Badge className="text-sm bg-green-500/20 text-green-400 px-3 py-1">
                            {rec.impact} Impact
                          </Badge>
                        </div>
                      </div>
                      <p className="text-yellow-300/60">{rec.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Imperial Command Actions */}
        <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-yellow-300 flex items-center gap-3 text-xl">
              <Award className="h-6 w-6" />
              Imperial Lifestyle Commands
            </CardTitle>
            <CardDescription className="text-yellow-200/60 text-base">
              Execute supreme wealth management authority
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Button className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/30 py-4 text-lg">
                <Crown className="h-5 w-5 mr-2" />
                Royal Planning
              </Button>
              <Button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-400/30 py-4 text-lg">
                <Shield className="h-5 w-5 mr-2" />
                Wealth Protection
              </Button>
              <Button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-400/30 py-4 text-lg">
                <Home className="h-5 w-5 mr-2" />
                Estate Management
              </Button>
              <Button className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-400/30 py-4 text-lg">
                <Star className="h-5 w-5 mr-2" />
                Lifestyle Optimization
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
