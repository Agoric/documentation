"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Crown,
  TrendingUp,
  Shield,
  Mic,
  MicOff,
  CreditCard,
  Building,
  ChevronRight,
  Bell,
  Settings,
  BarChart3,
  Wallet,
  Bot,
  Unlock,
  Star,
  Gift,
} from "lucide-react"
import { VoiceControlInterface } from "@/components/voice/voice-control-interface"
import { useVoiceControl } from "@/hooks/use-voice-control"
import { useUserProgress } from "@/hooks/use-user-progress"
import { featureUnlockSystem } from "@/lib/features/feature-unlock-system"
import Link from "next/link"

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)
  const [allFeaturesUnlocked, setAllFeaturesUnlocked] = useState(false)
  const { isListening, startListening, stopListening } = useVoiceControl()
  const { progress, goals, achievements } = useUserProgress()

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)

    // Auto-unlock all features
    const userId = "supreme_citizen_001"
    featureUnlockSystem.unlockAllFeatures(userId)
    setAllFeaturesUnlocked(true)

    return () => clearInterval(timer)
  }, [])

  const citizenshipStatus = "Revolved" // This would come from user context
  const userName = "Supreme Citizen" // This would come from user context

  const environments = [
    {
      id: "banking",
      title: "Supreme Banking",
      description: "Comprehensive banking and financial services",
      icon: Building,
      status: "Active",
      progress: 100,
      href: "/dashboard/banking",
      features: ["International Transfers", "Private Banking", "Business Banking"],
    },
    {
      id: "trading",
      title: "DAX Trading",
      description: "Advanced cryptocurrency trading platform",
      icon: TrendingUp,
      status: "Active",
      progress: 100,
      href: "/dashboard/dax",
      features: ["Algorithmic Trading", "Institutional Access", "Real-time Data"],
    },
    {
      id: "ai-concierge",
      title: "AI Concierge",
      description: "Intelligent financial assistant",
      icon: Bot,
      status: "Active",
      progress: 100,
      href: "/dashboard/ai-concierge",
      features: ["Market Prediction", "Risk Management", "Investment Advisor"],
    },
    {
      id: "legal",
      title: "Legal Compliance",
      description: "Global legal and compliance management",
      icon: Shield,
      status: "Active",
      progress: 100,
      href: "/legal/compliance-dashboard",
      features: ["Blockchain Registry", "Digital Signatures", "International Legal"],
    },
    {
      id: "voice",
      title: "Voice Control",
      description: "Advanced voice navigation and commands",
      icon: Mic,
      status: "Active",
      progress: 100,
      href: "/voice/settings",
      features: ["Voice Biometrics", "Multi-language", "Voice Commands"],
    },
    {
      id: "analytics",
      title: "Analytics Suite",
      description: "Comprehensive financial analytics",
      icon: BarChart3,
      status: "Active",
      progress: 100,
      href: "/analytics/dashboard",
      features: ["Predictive Analytics", "AI Insights", "Custom Reports"],
    },
  ]

  const financialGoals = [
    {
      id: "credit",
      title: "Credit Score Improvement",
      current: 800,
      target: 800,
      progress: 100,
      timeframe: "Achieved",
      nextStep: "Maintain excellent credit",
    },
    {
      id: "savings",
      title: "Emergency Fund",
      current: 25000,
      target: 25000,
      progress: 100,
      timeframe: "Achieved",
      nextStep: "Consider investment opportunities",
    },
    {
      id: "investment",
      title: "Investment Portfolio",
      current: 150000,
      target: 150000,
      progress: 100,
      timeframe: "Achieved",
      nextStep: "Explore premium investments",
    },
  ]

  const premiumFeatures = [
    "Quantum Security Encryption",
    "24/7 Personal Concierge",
    "Exclusive Investment Access",
    "Global Citizenship Services",
    "Private Banking Services",
    "Institutional Trading Access",
  ]

  const toggleVoice = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
    setIsVoiceEnabled(!isVoiceEnabled)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Crown className="h-8 w-8 text-yellow-500 animate-pulse" />
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white">Welcome back, {userName}</h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge
                variant={
                  citizenshipStatus === "Revolved"
                    ? "default"
                    : citizenshipStatus === "Pending"
                      ? "secondary"
                      : "outline"
                }
                className="px-3 py-1"
              >
                <Shield className="h-4 w-4 mr-1" />
                {citizenshipStatus}
              </Badge>

              {allFeaturesUnlocked && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-3 py-1">
                  <Crown className="h-4 w-4 mr-1" />
                  All Features Unlocked
                </Badge>
              )}

              <Button
                variant={isListening ? "default" : "outline"}
                size="sm"
                onClick={toggleVoice}
                className="flex items-center space-x-2"
              >
                {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                <span>{isListening ? "Listening" : "Voice"}</span>
              </Button>

              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Voice Control Interface */}
      {isVoiceEnabled && <VoiceControlInterface />}

      {/* Feature Unlock Celebration */}
      {allFeaturesUnlocked && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Gift className="h-8 w-8" />
                <div>
                  <h2 className="text-xl font-bold">🎉 All Features Unlocked!</h2>
                  <p className="text-green-100">You now have access to the complete Supreme Financial Platform</p>
                </div>
              </div>
              <Link href="/features/unlock-all">
                <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                  View All Features
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="environments">Environments</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
            <TabsTrigger value="features">All Features</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Total Balance</p>
                      <p className="text-2xl font-bold">$10,127,450</p>
                    </div>
                    <Wallet className="h-8 w-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Credit Score</p>
                      <p className="text-2xl font-bold">800</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Portfolio Value</p>
                      <p className="text-2xl font-bold">$5,850,000</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Features Unlocked</p>
                      <p className="text-2xl font-bold">100%</p>
                    </div>
                    <Unlock className="h-8 w-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Environment Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {environments.map((env) => {
                const IconComponent = env.icon
                return (
                  <Card key={env.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{env.title}</CardTitle>
                            <Badge className="bg-green-100 text-green-800">
                              <Star className="h-3 w-3 mr-1" />
                              Premium
                            </Badge>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{env.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Features Unlocked</span>
                          <span>{env.progress}%</span>
                        </div>
                        <Progress value={env.progress} className="h-2" />
                      </div>
                      <div className="space-y-1 mb-4">
                        {env.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-xs text-slate-600">
                            <Crown className="h-3 w-3 text-yellow-500 mr-1" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Access Platform
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {financialGoals.map((goal) => (
                <Card key={goal.id} className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {goal.title}
                      <Badge className="bg-green-100 text-green-800">{goal.timeframe}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Current: ${goal.current.toLocaleString()}</span>
                      <span>Target: ${goal.target.toLocaleString()}</span>
                    </div>
                    <Progress value={goal.progress} className="h-3" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600 font-medium">✅ {goal.progress}% Complete</span>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Goal Achieved!
                      </Button>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <p className="text-sm font-medium text-green-900">Next Step: {goal.nextStep}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Premium Tab */}
          <TabsContent value="premium" className="space-y-6">
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="h-6 w-6 text-yellow-600" />
                  <span>Premium Features Unlocked</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {premiumFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                      <Crown className="h-5 w-5 text-yellow-500" />
                      <span className="font-medium">{feature}</span>
                      <Badge className="ml-auto bg-green-100 text-green-800">Active</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Complete Feature Access
                  <Link href="/features/unlock-all">
                    <Button>
                      View Detailed Features
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-green-100 rounded-full">
                      <Unlock className="h-12 w-12 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">All Features Unlocked!</h3>
                  <p className="text-green-700 mb-4">
                    You have complete access to all 25+ features across banking, trading, AI, legal, voice control,
                    analytics, and premium services.
                  </p>
                  <Link href="/features/unlock-all">
                    <Button className="bg-green-600 hover:bg-green-700">Explore All Features</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Premium Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Account Level</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Supreme Level 5</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Verification Status</span>
                    <Badge className="bg-green-100 text-green-800">Premium Verified</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Feature Access</span>
                    <Badge className="bg-blue-100 text-blue-800">100% Unlocked</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Voice Control Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Voice Navigation</span>
                    <Button variant="outline" size="sm">
                      {isVoiceEnabled ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Voice Biometrics</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Multi-language Support</span>
                    <Badge className="bg-blue-100 text-blue-800">25+ Languages</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
