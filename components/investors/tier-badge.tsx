"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getProgressToNextTier, formatCurrency, formatPercentage, type InvestorTier } from "@/utils/investor-tiers"
import { TrendingUp, Crown, Star, Zap } from "lucide-react"

interface TierBadgeProps {
  totalInvested: number
  className?: string
  showProgress?: boolean
  variant?: "compact" | "detailed"
}

export function TierBadge({
  totalInvested,
  className = "",
  showProgress = false,
  variant = "compact",
}: TierBadgeProps) {
  const tierInfo = getProgressToNextTier(totalInvested)
  const { currentTier, nextTier, progress, amountNeeded } = tierInfo

  const getTierIcon = (tier: InvestorTier) => {
    switch (tier.id) {
      case "bronze":
        return <Star className="h-4 w-4" />
      case "silver":
        return <TrendingUp className="h-4 w-4" />
      case "gold":
        return <Crown className="h-4 w-4" />
      case "platinum":
      case "diamond":
        return <Zap className="h-4 w-4" />
      default:
        return <Star className="h-4 w-4" />
    }
  }

  if (variant === "compact") {
    return (
      <Badge className={`bg-gradient-to-r ${currentTier.color} text-white border-0 ${className}`}>
        <span className="mr-1">{currentTier.badge}</span>
        {currentTier.name}
        <span className="ml-2 text-xs opacity-90">
          {formatPercentage(currentTier.minReturn)}-{formatPercentage(currentTier.maxReturn)}
        </span>
      </Badge>
    )
  }

  return (
    <Card className={`bg-gradient-to-r ${currentTier.color} text-white border-0 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {getTierIcon(currentTier)}
            <span className="font-semibold">{currentTier.name}</span>
            <span className="text-lg">{currentTier.badge}</span>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">Expected Returns</div>
            <div className="font-bold">
              {formatPercentage(currentTier.minReturn)}-{formatPercentage(currentTier.maxReturn)}
            </div>
          </div>
        </div>

        <div className="text-sm opacity-90 mb-3">Total Invested: {formatCurrency(totalInvested)}</div>

        {showProgress && nextTier && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs opacity-90">
              <span>Progress to {nextTier.name}</span>
              <span>{formatCurrency(amountNeeded)} needed</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/20" />
            <div className="text-xs opacity-75">
              Next tier unlocks {formatPercentage(nextTier.minReturn)}-{formatPercentage(nextTier.maxReturn)} returns
            </div>
          </div>
        )}

        {showProgress && !nextTier && (
          <div className="text-xs opacity-90">🎉 Maximum tier achieved! Enjoy premium benefits.</div>
        )}
      </CardContent>
    </Card>
  )
}
