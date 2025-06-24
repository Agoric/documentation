"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Crown,
  Unlock,
  Lock,
  Star,
  Zap,
  Shield,
  Mic,
  BarChart3,
  Building,
  TrendingUp,
  Bot,
  Scale,
  CheckCircle,
  Gift,
} from "lucide-react"
import { featureUnlockSystem, type Feature } from "@/lib/features/feature-unlock-system"

export default function FeatureUnlockDashboard() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [userProgress, setUserProgress] = useState({
    totalFeatures: 0,
    unlockedFeatures: 0,
    progressPercentage: 0,
    nextUnlocks: [] as Feature[],
  })
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    // Unlock all features for demonstration
    const userId = "supreme_citizen_001"
    featureUnlockSystem.unlockAllFeatures(userId)

    // Get all features and progress
    const allFeatures = featureUnlockSystem.getAllFeatures()
    const progress = featureUnlockSystem.getUnlockProgress(userId)

    setFeatures(allFeatures)
    setUserProgress(progress)
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "banking":
        return <Building className="h-5 w-5" />
      case "trading":
        return <TrendingUp className="h-5 w-5" />
      case "ai":
        return <Bot className="h-5 w-5" />
      case "legal":
        return <Scale className="h-5 w-5" />
      case "voice":
        return <Mic className="h-5 w-5" />
      case "analytics":
        return <BarChart3 className="h-5 w-5" />
      case "security":
        return <Shield className="h-5 w-5" />
      case "premium":
        return <Crown className="h-5 w-5" />
      default:
        return <Star className="h-5 w-5" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "unlocked":
        return <Unlock className="h-4 w-4 text-green-500" />
      case "premium":
        return <Crown className="h-4 w-4 text-yellow-500" />
      case "beta":
        return <Zap className="h-4 w-4 text-blue-500" />
      default:
        return <Lock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unlocked":
        return "bg-green-100 text-green-800 border-green-200"
      case "premium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "beta":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredFeatures =
    selectedCategory === "all" ? features : features.filter((feature) => feature.category === selectedCategory)

  const categories = ["all", "banking", "trading", "ai", "legal", "voice", "analytics", "security", "premium"]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">All Features Unlocked!</h1>
            <p className="text-muted-foreground">Complete access to the Supreme Financial Platform</p>
          </div>
        </div>
        <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 text-lg">
          <CheckCircle className="h-5 w-5 mr-2" />
          100% Unlocked
        </Badge>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Total Features</p>
                <p className="text-3xl font-bold">{userProgress.totalFeatures}</p>
              </div>
              <Gift className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Unlocked</p>
                <p className="text-3xl font-bold">{userProgress.unlockedFeatures}</p>
              </div>
              <Unlock className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Progress</p>
                <p className="text-3xl font-bold">{Math.round(userProgress.progressPercentage)}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">Premium Features</p>
                <p className="text-3xl font-bold">{features.filter((f) => f.status === "premium").length}</p>
              </div>
              <Crown className="h-8 w-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Categories</CardTitle>
          <CardDescription>Browse features by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="flex items-center space-x-2"
              >
                {category !== "all" && getCategoryIcon(category)}
                <span className="capitalize">{category}</span>
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFeatures.map((feature) => (
              <Card key={feature.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(feature.category)}
                      <CardTitle className="text-lg">{feature.name}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(feature.status)}
                      <Badge className={getStatusColor(feature.status)}>{feature.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>

                  {feature.dependencies.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Dependencies:</p>
                      <div className="flex flex-wrap gap-1">
                        {feature.dependencies.map((dep) => (
                          <Badge key={dep} variant="outline" className="text-xs">
                            {dep.replace(/_/g, " ")}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    className="w-full"
                    variant={feature.status === "unlocked" ? "default" : "outline"}
                    disabled={feature.status === "locked"}
                  >
                    {feature.status === "unlocked"
                      ? "Access Feature"
                      : feature.status === "premium"
                        ? "Premium Access"
                        : feature.status === "beta"
                          ? "Beta Access"
                          : "Locked"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feature Breakdown by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.slice(1).map((category) => {
          const categoryFeatures = features.filter((f) => f.category === category)
          const unlockedCount = categoryFeatures.filter((f) => f.status === "unlocked" || f.status === "premium").length
          const progress = (unlockedCount / categoryFeatures.length) * 100

          return (
            <Card key={category}>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(category)}
                  <CardTitle className="text-lg capitalize">{category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Features</span>
                    <span>
                      {unlockedCount}/{categoryFeatures.length}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">{Math.round(progress)}% Complete</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Congratulations Message */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-green-100 rounded-full">
              <Crown className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-green-900 mb-2">Congratulations!</h2>
          <p className="text-green-700 mb-4">
            You now have access to all features of the Supreme Financial Platform. Enjoy unlimited access to banking,
            trading, AI assistance, legal services, and premium features.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-green-600 hover:bg-green-700">Explore All Features</Button>
            <Button variant="outline" className="border-green-600 text-green-600">
              View Premium Benefits
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
