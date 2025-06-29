"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Crown, Zap, Brain, TrendingUp, Shield, Sparkles, CheckCircle, Star } from "lucide-react"
import { usePremiumUnlock } from "@/contexts/premium-unlock-context"

const premiumFeatures = [
  {
    id: "ai-recommendations",
    title: "AI-Powered Recommendations",
    description: "Advanced AI algorithms provide personalized suggestions across all platforms",
    icon: Brain,
    category: "AI Intelligence",
    benefits: ["Personalized insights", "Predictive analytics", "Smart automation"],
  },
  {
    id: "unlimited-access",
    title: "Unlimited Platform Access",
    description: "Full access to all environments and premium features",
    icon: Crown,
    category: "Platform Access",
    benefits: ["All environments unlocked", "No usage limits", "Priority support"],
  },
  {
    id: "advanced-analytics",
    title: "Advanced Analytics Suite",
    description: "Deep insights and analytics across credit, business, and investments",
    icon: TrendingUp,
    category: "Analytics",
    benefits: ["Real-time dashboards", "Predictive modeling", "Custom reports"],
  },
  {
    id: "premium-security",
    title: "Enterprise Security",
    description: "Bank-level security with advanced encryption and monitoring",
    icon: Shield,
    category: "Security",
    benefits: ["256-bit encryption", "Real-time monitoring", "Fraud protection"],
  },
  {
    id: "ai-automation",
    title: "Smart Automation",
    description: "Automated workflows and intelligent task management",
    icon: Zap,
    category: "Automation",
    benefits: ["Workflow automation", "Smart scheduling", "Task optimization"],
  },
  {
    id: "exclusive-features",
    title: "Exclusive Features",
    description: "Access to beta features and exclusive platform capabilities",
    icon: Sparkles,
    category: "Exclusive",
    benefits: ["Beta access", "Exclusive tools", "Early features"],
  },
]

export function PremiumFeaturesShowcase() {
  const { isPremiumUnlocked, isFeatureUnlocked } = usePremiumUnlock()

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Crown className="h-8 w-8 text-yellow-500" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            All Premium Features Unlocked!
          </h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Experience the full power of SnappAiFi with all premium features, AI capabilities, and exclusive tools at your
          fingertips.
        </p>
        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          All Features Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {premiumFeatures.map((feature) => (
          <Card
            key={feature.id}
            className="relative overflow-hidden border-2 border-yellow-200/50 bg-gradient-to-br from-yellow-50/50 to-orange-50/50"
          >
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                <Star className="h-3 w-3 mr-1" />
                Unlocked
              </Badge>
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-100 to-orange-100">
                  <feature.icon className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <Badge variant="outline" className="text-xs mt-1">
                    {feature.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <CardDescription className="text-sm">{feature.description}</CardDescription>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Key Benefits:</h4>
                <ul className="space-y-1">
                  {feature.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white border-0">
                <Sparkles className="h-4 w-4 mr-2" />
                Feature Active
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Crown className="h-6 w-6 text-yellow-500" />
          <h3 className="text-xl font-semibold">Premium Status: Active</h3>
        </div>
        <p className="text-muted-foreground mb-4">
          You have full access to all SnappAiFi premium features and capabilities. Enjoy unlimited usage across all
          platforms!
        </p>
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Unlimited AI Suggestions</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>All Environments Unlocked</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Premium Support</span>
          </div>
        </div>
      </div>
    </div>
  )
}
