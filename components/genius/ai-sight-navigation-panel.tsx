"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAISightNavigation } from "@/contexts/ai-sight-navigation-context"
import {
  Eye,
  Target,
  TrendingUp,
  Shield,
  Crown,
  Zap,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  Brain,
  Sparkles,
} from "lucide-react"

export function AISightNavigationPanel() {
  const {
    userProfile,
    isAnalyzing,
    nextSteps,
    aiInsights,
    profitOpportunities,
    riskAssessments,
    authorityLevel,
    citizenshipStatus,
    digitalDomicileStatus,
    privacyProtectionLevel,
    executeRecommendedAction,
    optimizeForProfit,
    enhancePrivacyProtection,
    progressTowardSupremacy,
  } = useAISightNavigation()

  const [activeInsight, setActiveInsight] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "supreme":
        return "text-yellow-400"
      case "authority":
        return "text-purple-400"
      case "citizen":
        return "text-blue-400"
      case "pending":
        return "text-orange-400"
      default:
        return "text-gray-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-400 bg-red-900/20 border-red-400/30"
      case "urgent":
        return "text-orange-400 bg-orange-900/20 border-orange-400/30"
      case "high":
        return "text-yellow-400 bg-yellow-900/20 border-yellow-400/30"
      case "medium":
        return "text-blue-400 bg-blue-900/20 border-blue-400/30"
      case "low":
        return "text-green-400 bg-green-900/20 border-green-400/30"
      default:
        return "text-gray-400 bg-gray-900/20 border-gray-400/30"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "critical":
        return "text-red-400"
      case "high":
        return "text-orange-400"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Sight Header */}
      <Card className="bg-gradient-to-br from-genius-900/95 to-genius-800/95 backdrop-blur-xl border-genius-400/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "linear" }}
              >
                <Eye className="w-6 h-6 text-genius-400" />
              </motion.div>
              <div>
                <CardTitle className="text-genius-300">AI Sight & Navigation</CardTitle>
                <p className="text-genius-400/70 text-sm">Supreme Authority Intelligence System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-genius-600/20 text-genius-300 border-genius-400/30">
                Authority Level {authorityLevel}
              </Badge>
              <Badge className={`${getStatusColor(citizenshipStatus)} bg-opacity-20 border-opacity-30`}>
                {citizenshipStatus.toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-royal-50/95 to-royal-100/95 backdrop-blur-xl border-illumination-400/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Crown className="w-5 h-5 text-illumination-400" />
              <div>
                <div className="text-illumination-300 font-medium text-sm">Authority Level</div>
                <div className="text-illumination-400/70 text-xs">{authorityLevel}/100</div>
              </div>
            </div>
            <Progress value={authorityLevel} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-royal-50/95 to-royal-100/95 backdrop-blur-xl border-illumination-400/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-illumination-400" />
              <div>
                <div className="text-illumination-300 font-medium text-sm">Privacy Level</div>
                <div className="text-illumination-400/70 text-xs">{privacyProtectionLevel}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-royal-50/95 to-royal-100/95 backdrop-blur-xl border-illumination-400/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Target className="w-5 h-5 text-illumination-400" />
              <div>
                <div className="text-illumination-300 font-medium text-sm">Digital Domicile</div>
                <div className="text-illumination-400/70 text-xs">{digitalDomicileStatus}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-royal-50/95 to-royal-100/95 backdrop-blur-xl border-illumination-400/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-illumination-400" />
              <div>
                <div className="text-illumination-300 font-medium text-sm">Profit Score</div>
                <div className="text-illumination-400/70 text-xs">{userProfile?.profitabilityScore || 0}/100</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Navigation Tabs */}
      <Tabs defaultValue="next-steps" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-royal-200/20">
          <TabsTrigger value="next-steps" className="text-xs">
            <Target className="w-3 h-3 mr-1" />
            Next Steps
          </TabsTrigger>
          <TabsTrigger value="insights" className="text-xs">
            <Brain className="w-3 h-3 mr-1" />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="profits" className="text-xs">
            <DollarSign className="w-3 h-3 mr-1" />
            Profit Ops
          </TabsTrigger>
          <TabsTrigger value="risks" className="text-xs">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Risk Mgmt
          </TabsTrigger>
          <TabsTrigger value="supremacy" className="text-xs">
            <Crown className="w-3 h-3 mr-1" />
            Supremacy
          </TabsTrigger>
        </TabsList>

        {/* Next Steps Tab */}
        <TabsContent value="next-steps" className="space-y-4">
          <Card className="bg-gradient-to-br from-royal-50/95 to-royal-100/95 backdrop-blur-xl border-illumination-400/30">
            <CardHeader>
              <CardTitle className="text-illumination-300 text-lg flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Recommended Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {nextSteps.slice(0, 5).map((step) => (
                <motion.div
                  key={step.id}
                  className={`p-4 rounded-lg border ${getPriorityColor(step.priority)} cursor-pointer hover:bg-opacity-30 transition-all`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => executeRecommendedAction(step.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-sm">{step.title}</h4>
                        <Badge className={getPriorityColor(step.priority)}>{step.priority}</Badge>
                      </div>
                      <p className="text-xs opacity-70 mb-2">{step.description}</p>
                      <div className="flex items-center space-x-4 text-xs">
                        <span>💰 ${step.profitPotential.toLocaleString()}</span>
                        <span>⏱️ {step.timeToComplete}</span>
                        <span>🎯 {Math.round(step.aiConfidence * 100)}% confidence</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          <Card className="bg-gradient-to-br from-royal-50/95 to-royal-100/95 backdrop-blur-xl border-illumination-400/30">
            <CardHeader>
              <CardTitle className="text-illumination-300 text-lg flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                AI Intelligence Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiInsights.map((insight) => (
                <motion.div
                  key={insight.id}
                  className="p-4 bg-genius-800/20 rounded-lg border border-genius-400/30 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveInsight(activeInsight === insight.id ? null : insight.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-genius-300 font-medium text-sm">{insight.title}</h4>
                        <Badge className={`${getImpactColor(insight.impact)} bg-opacity-20 border-opacity-30`}>
                          {insight.impact}
                        </Badge>
                      </div>
                      <p className="text-genius-400/70 text-xs mb-2">{insight.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-genius-400">
                        <span>⏱️ {insight.timeframe}</span>
                        {insight.profitPotential && <span>💰 ${insight.profitPotential.toLocaleString()}</span>}
                        {insight.actionRequired && <span className="text-orange-400">⚡ Action Required</span>}
                      </div>
                    </div>
                    <Sparkles className="w-4 h-4 text-genius-400" />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profit Opportunities Tab */}
        <TabsContent value="profits" className="space-y-4">
          <Card className="bg-gradient-to-br from-royal-50/95 to-royal-100/95 backdrop-blur-xl border-illumination-400/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-illumination-300 text-lg flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Profit Opportunities
                </CardTitle>
                <Button
                  size="sm"
                  onClick={optimizeForProfit}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Optimize
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {profitOpportunities.map((opportunity) => (
                <motion.div
                  key={opportunity.id}
                  className="p-4 bg-green-800/20 rounded-lg border border-green-400/30"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-green-300 font-medium text-sm">{opportunity.title}</h4>
                    <Badge className="bg-green-600/20 text-green-300 border-green-400/30">
                      ${opportunity.expectedProfit.toLocaleString()}
                    </Badge>
                  </div>
                  <p className="text-green-400/70 text-xs mb-2">{opportunity.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-xs text-green-400">
                    <div>⏱️ {opportunity.timeframe}</div>
                    <div>🎯 {Math.round(opportunity.confidenceLevel * 100)}% confidence</div>
                    <div>⚠️ Risk Level: {opportunity.riskLevel}/5</div>
                    <div>👑 Supreme Bonus: ${opportunity.supremeAuthorityBonus.toLocaleString()}</div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Management Tab */}
        <TabsContent value="risks" className="space-y-4">
          <Card className="bg-gradient-to-br from-royal-50/95 to-royal-100/95 backdrop-blur-xl border-illumination-400/30">
            <CardHeader>
              <CardTitle className="text-illumination-300 text-lg flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Risk Assessments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {riskAssessments.map((risk) => (
                <motion.div
                  key={risk.id}
                  className={`p-4 rounded-lg border ${
                    risk.severity === "critical"
                      ? "bg-red-800/20 border-red-400/30"
                      : risk.severity === "high"
                        ? "bg-orange-800/20 border-orange-400/30"
                        : risk.severity === "medium"
                          ? "bg-yellow-800/20 border-yellow-400/30"
                          : "bg-green-800/20 border-green-400/30"
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4
                      className={`font-medium text-sm ${
                        risk.severity === "critical"
                          ? "text-red-300"
                          : risk.severity === "high"
                            ? "text-orange-300"
                            : risk.severity === "medium"
                              ? "text-yellow-300"
                              : "text-green-300"
                      }`}
                    >
                      {risk.riskType.toUpperCase()} Risk
                    </h4>
                    <Badge
                      className={`${
                        risk.severity === "critical"
                          ? "bg-red-600/20 text-red-300 border-red-400/30"
                          : risk.severity === "high"
                            ? "bg-orange-600/20 text-orange-300 border-orange-400/30"
                            : risk.severity === "medium"
                              ? "bg-yellow-600/20 text-yellow-300 border-yellow-400/30"
                              : "bg-green-600/20 text-green-300 border-green-400/30"
                      }`}
                    >
                      {risk.severity}
                    </Badge>
                  </div>
                  <p className="text-xs opacity-70 mb-2">{risk.description}</p>
                  <div className="space-y-1">
                    <div className="text-xs font-medium">Mitigation:</div>
                    {risk.mitigation.map((action, index) => (
                      <div key={index} className="text-xs opacity-70">
                        • {action}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Supremacy Tab */}
        <TabsContent value="supremacy" className="space-y-4">
          <Card className="bg-gradient-to-br from-royal-50/95 to-royal-100/95 backdrop-blur-xl border-illumination-400/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-illumination-300 text-lg flex items-center">
                  <Crown className="w-5 h-5 mr-2" />
                  Supreme Authority Progression
                </CardTitle>
                <Button
                  size="sm"
                  onClick={progressTowardSupremacy}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Crown className="w-3 h-3 mr-1" />
                  Advance
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Authority Level Progress */}
              <div className="p-4 bg-purple-800/20 rounded-lg border border-purple-400/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-300 font-medium">Authority Level</span>
                  <span className="text-purple-400">{authorityLevel}/100</span>
                </div>
                <Progress value={authorityLevel} className="mb-2" />
                <div className="text-xs text-purple-400/70">
                  {authorityLevel < 50
                    ? "Citizen Track"
                    : authorityLevel < 75
                      ? "Authority Track"
                      : "Supreme Authority Track"}
                </div>
              </div>

              {/* Citizenship Benefits */}
              <div className="p-4 bg-blue-800/20 rounded-lg border border-blue-400/30">
                <h4 className="text-blue-300 font-medium mb-2">Current Benefits</h4>
                <div className="space-y-1 text-xs text-blue-400">
                  <div>✓ Enhanced privacy protection</div>
                  <div>✓ Exclusive investment access</div>
                  <div>✓ Tax optimization strategies</div>
                  <div>✓ Asset protection services</div>
                  {authorityLevel >= 50 && <div>✓ Authority-level privileges</div>}
                  {authorityLevel >= 75 && <div>✓ Supreme Authority benefits</div>}
                </div>
              </div>

              {/* Next Milestones */}
              <div className="p-4 bg-gold-800/20 rounded-lg border border-gold-400/30">
                <h4 className="text-gold-300 font-medium mb-2">Next Milestones</h4>
                <div className="space-y-2 text-xs">
                  {authorityLevel < 50 && (
                    <div className="text-gold-400">🎯 Authority Level 50: Enhanced privileges & exclusive access</div>
                  )}
                  {authorityLevel < 75 && (
                    <div className="text-gold-400">👑 Authority Level 75: Supreme Authority track eligibility</div>
                  )}
                  {authorityLevel < 100 && (
                    <div className="text-gold-400">⭐ Authority Level 100: Ultimate Supreme Authority status</div>
                  )}
                </div>
              </div>

              {/* Privacy Enhancement */}
              <Button
                onClick={enhancePrivacyProtection}
                className="w-full bg-gradient-to-r from-genius-600 to-genius-700 hover:from-genius-700 hover:to-genius-800"
              >
                <Shield className="w-4 h-4 mr-2" />
                Enhance Privacy Protection
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
