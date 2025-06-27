"use client"

import type React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  INVESTOR_TIERS,
  getInvestorTier,
  getProgressToNextTier,
  formatCurrency,
  formatPercentage,
} from "@/utils/investor-tiers"
import { Check, Lock, TrendingUp, Info } from "lucide-react"

interface TierBenefitsModalProps {
  totalInvested: number
  children: React.ReactNode
}

export function TierBenefitsModal({ totalInvested, children }: TierBenefitsModalProps) {
  const currentTier = getInvestorTier(totalInvested)
  const tierProgress = getProgressToNextTier(totalInvested)

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Investor Tier Benefits
          </DialogTitle>
          <DialogDescription>Your investment level determines your returns and exclusive benefits</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Tier Status */}
          <Card className={`bg-gradient-to-r ${currentTier.color} text-white border-0`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>{currentTier.badge}</span>
                Your Current Tier: {currentTier.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm opacity-90">Total Invested</div>
                  <div className="text-xl font-bold">{formatCurrency(totalInvested)}</div>
                </div>
                <div>
                  <div className="text-sm opacity-90">Expected Returns</div>
                  <div className="text-xl font-bold">
                    {formatPercentage(currentTier.minReturn)}-{formatPercentage(currentTier.maxReturn)}
                  </div>
                </div>
                <div>
                  <div className="text-sm opacity-90">Tier Range</div>
                  <div className="text-xl font-bold">
                    {formatCurrency(currentTier.minInvestment)}
                    {currentTier.maxInvestment ? ` - ${formatCurrency(currentTier.maxInvestment)}` : "+"}
                  </div>
                </div>
              </div>

              {tierProgress.nextTier && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm opacity-90">
                    <span>Progress to {tierProgress.nextTier.name}</span>
                    <span>{formatCurrency(tierProgress.amountNeeded)} needed</span>
                  </div>
                  <Progress value={tierProgress.progress} className="h-2 bg-white/20" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* All Tiers Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {INVESTOR_TIERS.map((tier) => {
              const isCurrentTier = tier.id === currentTier.id
              const isUnlocked = totalInvested >= tier.minInvestment
              const isNextTier = tier.id === tierProgress.nextTier?.id

              return (
                <Card
                  key={tier.id}
                  className={`relative ${
                    isCurrentTier
                      ? `bg-gradient-to-br ${tier.color} text-white border-2 border-white/50`
                      : isUnlocked
                        ? "bg-background/50 border-green-500/30"
                        : "bg-background/30 border-gray-500/30"
                  }`}
                >
                  <CardHeader className="pb-3">
                    <CardTitle
                      className={`flex items-center gap-2 text-lg ${
                        isCurrentTier ? "text-white" : isUnlocked ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      <span className="text-xl">{tier.badge}</span>
                      {tier.name}
                      {isCurrentTier && (
                        <Badge variant="secondary" className="ml-auto bg-white/20 text-white">
                          Current
                        </Badge>
                      )}
                      {isNextTier && (
                        <Badge variant="outline" className="ml-auto border-blue-500 text-blue-600">
                          Next
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className={`text-sm ${isCurrentTier ? "text-white/90" : "text-muted-foreground"}`}>
                      <div>Investment Range:</div>
                      <div className="font-semibold">
                        {formatCurrency(tier.minInvestment)}
                        {tier.maxInvestment ? ` - ${formatCurrency(tier.maxInvestment)}` : "+"}
                      </div>
                    </div>

                    <div className={`text-sm ${isCurrentTier ? "text-white/90" : "text-muted-foreground"}`}>
                      <div>Expected Returns:</div>
                      <div className="font-bold text-lg">
                        {formatPercentage(tier.minReturn)} - {formatPercentage(tier.maxReturn)}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className={`text-sm font-medium ${isCurrentTier ? "text-white" : "text-foreground"}`}>
                        Benefits:
                      </div>
                      <div className="space-y-1">
                        {tier.benefits.slice(0, 3).map((benefit, index) => (
                          <div
                            key={index}
                            className={`flex items-center gap-2 text-xs ${
                              isCurrentTier ? "text-white/90" : isUnlocked ? "text-green-600" : "text-gray-500"
                            }`}
                          >
                            {isUnlocked ? (
                              <Check className="h-3 w-3 text-green-500" />
                            ) : (
                              <Lock className="h-3 w-3 text-gray-400" />
                            )}
                            {benefit}
                          </div>
                        ))}
                        {tier.benefits.length > 3 && (
                          <div className={`text-xs ${isCurrentTier ? "text-white/70" : "text-muted-foreground"}`}>
                            +{tier.benefits.length - 3} more benefits
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Tier Upgrade Information */}
          {tierProgress.nextTier && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Info className="h-5 w-5" />
                  Upgrade to {tierProgress.nextTier.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-blue-700">
                <p className="mb-3">Invest an additional {formatCurrency(tierProgress.amountNeeded)} to unlock:</p>
                <ul className="space-y-1">
                  {tierProgress.nextTier.benefits.slice(0, 4).map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-blue-600" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                  <div className="font-semibold">Higher Returns:</div>
                  <div className="text-lg">
                    {formatPercentage(tierProgress.nextTier.minReturn)} -{" "}
                    {formatPercentage(tierProgress.nextTier.maxReturn)}
                    <span className="text-sm ml-2">
                      (up to {formatPercentage(tierProgress.nextTier.maxReturn - currentTier.maxReturn)} increase)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
