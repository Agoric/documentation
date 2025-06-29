"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Star, Award, Zap, CreditCard, Home, Users, TrendingUp, Unlock, Gift, Crown } from "lucide-react"
import { usePreApproval } from "@/hooks/use-preapproval"
import { RoyalDiamondSlabCard } from "@/components/ui/royal-diamond-slab-card"

interface PreApprovalStatusProps {
  onUnlock: (data: any) => void
}

export function PreApprovalStatus({ onUnlock }: PreApprovalStatusProps) {
  const { preApprovalStatus, unlockPremiumFeatures } = usePreApproval()

  const handleUnlockFeatures = async () => {
    const unlockData = await unlockPremiumFeatures()
    onUnlock(unlockData)
  }

  if (!preApprovalStatus) return null

  const unlockedFeatures = [
    {
      icon: TrendingUp,
      title: "Exclusive Interest Rates",
      description: "Access to rates 0.25% below market average",
      status: "unlocked",
    },
    {
      icon: Crown,
      title: "Premium Property Access",
      description: "Early access to luxury and off-market properties",
      status: "unlocked",
    },
    {
      icon: Users,
      title: "Dedicated Loan Specialist",
      description: "Personal loan officer for white-glove service",
      status: "unlocked",
    },
    {
      icon: Zap,
      title: "Priority Processing",
      description: "Fast-track approval in 24-48 hours",
      status: "unlocked",
    },
    {
      icon: Gift,
      title: "Closing Cost Credits",
      description: "Up to $5,000 in closing cost assistance",
      status: "unlocked",
    },
    {
      icon: Star,
      title: "Investor Matching",
      description: "Priority matching with premium investors",
      status: "unlocked",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Congratulations Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <div className="relative">
            <CheckCircle className="h-16 w-16 text-green-400" />
            <div className="absolute -top-2 -right-2">
              <Crown className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-green-400">Congratulations!</h2>
          <p className="text-muted-foreground mt-2">
            You're pre-approved for up to{" "}
            <span className="font-bold text-green-400">${preApprovalStatus.approvedAmount?.toLocaleString()}</span>
          </p>
        </div>
      </div>

      {/* Pre-Approval Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RoyalDiamondSlabCard
          variant="emerald"
          size="md"
          title="Approved Amount"
          content={`$${preApprovalStatus.approvedAmount?.toLocaleString()}`}
          highlightWords={["Approved"]}
          className="h-32"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <span className="text-sm text-emerald-400">Ready to use</span>
          </div>
        </RoyalDiamondSlabCard>

        <RoyalDiamondSlabCard
          variant="sapphire"
          size="md"
          title="Interest Rate"
          content={`${preApprovalStatus.interestRate}%`}
          highlightWords={["Rate"]}
          className="h-32"
        >
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-blue-400">Exclusive rate</span>
          </div>
        </RoyalDiamondSlabCard>

        <RoyalDiamondSlabCard
          variant="ruby"
          size="md"
          title="Monthly Payment"
          content={`$${preApprovalStatus.monthlyPayment?.toLocaleString()}`}
          highlightWords={["Payment"]}
          className="h-32"
        >
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-red-400" />
            <span className="text-sm text-red-400">Estimated</span>
          </div>
        </RoyalDiamondSlabCard>
      </div>

      {/* Unlocked Features */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Unlock className="h-5 w-5 text-purple-400" />
            Premium Features Unlocked
          </CardTitle>
          <CardDescription>Your pre-approval has unlocked exclusive benefits and premium features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unlockedFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20"
              >
                <div className="flex-shrink-0">
                  <feature.icon className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-green-400">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
                <Badge className="bg-green-500/20 text-green-400">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pre-Approval Certificate */}
      <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <Award className="h-12 w-12 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-yellow-400">Pre-Approval Certificate</h3>
              <p className="text-muted-foreground">
                Valid for 90 days • Certificate ID: {preApprovalStatus.certificateId}
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/40">
                Download Certificate
              </Button>
              <Button variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/40">
                Share with Agent
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-background/50 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
          <CardDescription>Here's what you can do with your pre-approval</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              className="h-auto p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30"
              onClick={() => (window.location.href = "/real-estate")}
            >
              <div className="flex items-center gap-3">
                <Home className="h-6 w-6" />
                <div className="text-left">
                  <p className="font-medium">Browse Premium Properties</p>
                  <p className="text-sm text-muted-foreground">Access exclusive listings</p>
                </div>
              </div>
            </Button>

            <Button
              className="h-auto p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30"
              onClick={() => (window.location.href = "/investors/portal")}
            >
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6" />
                <div className="text-left">
                  <p className="font-medium">Connect with Investors</p>
                  <p className="text-sm text-muted-foreground">Priority investor matching</p>
                </div>
              </div>
            </Button>
          </div>

          <Button
            onClick={handleUnlockFeatures}
            className="w-full h-auto p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30"
          >
            <div className="flex items-center gap-3">
              <Crown className="h-6 w-6" />
              <div className="text-left">
                <p className="font-medium">Activate All Premium Features</p>
                <p className="text-sm text-muted-foreground">Unlock your complete pre-approval benefits</p>
              </div>
            </div>
          </Button>
        </CardContent>
      </Card>

      {/* Validity Progress */}
      <Card className="bg-background/50 backdrop-blur-sm border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Pre-Approval Validity</span>
            <span className="text-sm text-muted-foreground">{preApprovalStatus.daysRemaining} days remaining</span>
          </div>
          <Progress value={(preApprovalStatus.daysRemaining / 90) * 100} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">Expires on {preApprovalStatus.expirationDate}</p>
        </CardContent>
      </Card>
    </div>
  )
}
