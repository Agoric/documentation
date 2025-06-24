"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  TrendingUp,
  Shield,
  Target,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  BarChart3,
  Lightbulb,
  Zap,
  Crown,
} from "lucide-react"

export function MasterBanker() {
  const [activeStrategy, setActiveStrategy] = useState("wealth-building")

  const strategies = [
    {
      id: "wealth-building",
      title: "Wealth Building Strategy",
      description: "Accelerated asset accumulation plan",
      progress: 78,
      timeframe: "18 months",
      roi: "24.5%",
      risk: "Medium",
      actions: [
        "Increase 401k contribution by 3%",
        "Diversify into RWA tokens",
        "Consider real estate investment",
        "Optimize tax-advantaged accounts",
      ],
    },
    {
      id: "debt-optimization",
      title: "Debt Optimization",
      description: "Strategic debt consolidation and reduction",
      progress: 92,
      timeframe: "12 months",
      roi: "15.2%",
      risk: "Low",
      actions: [
        "Consolidate high-interest debt",
        "Negotiate better terms",
        "Implement avalanche method",
        "Set up automatic payments",
      ],
    },
    {
      id: "credit-enhancement",
      title: "Credit Enhancement",
      description: "Systematic credit score improvement",
      progress: 85,
      timeframe: "6 months",
      roi: "N/A",
      risk: "Very Low",
      actions: [
        "Pay down credit utilization to 10%",
        "Request credit limit increases",
        "Add authorized user accounts",
        "Monitor credit reports monthly",
      ],
    },
  ]

  const insights = [
    {
      type: "opportunity",
      title: "Real Estate Market Timing",
      description: "Quantum analysis shows optimal buying window in next 45 days",
      impact: "High",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      type: "risk",
      title: "Market Volatility Alert",
      description: "Increased volatility expected in tech sector - consider rebalancing",
      impact: "Medium",
      icon: AlertTriangle,
      color: "text-yellow-600",
    },
    {
      type: "achievement",
      title: "Goal Milestone Reached",
      description: "Emergency fund target achieved - ready for next phase",
      impact: "High",
      icon: CheckCircle,
      color: "text-blue-600",
    },
  ]

  const currentStrategy = strategies.find((s) => s.id === activeStrategy) || strategies[0]

  return (
    <Card className="h-[600px] flex flex-col royal-card">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-royal-gradient rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="royal-text font-royal">Master Banker</span>
              <Badge className="royal-badge">
                <Crown className="h-3 w-3 mr-1" />
                Royal Elite Advisor
              </Badge>
            </CardTitle>
            <CardDescription>Advanced financial strategist with predictive analytics</CardDescription>
          </div>
          <Badge className="bg-green-100 text-green-800">
            <Zap className="h-3 w-3 mr-1" />
            Active
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <Tabs value={activeStrategy} onValueChange={setActiveStrategy} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 m-4 mb-0">
            <TabsTrigger value="wealth-building">Wealth</TabsTrigger>
            <TabsTrigger value="debt-optimization">Debt</TabsTrigger>
            <TabsTrigger value="credit-enhancement">Credit</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto p-4">
            <TabsContent value={activeStrategy} className="space-y-4 mt-0">
              {/* Strategy Overview */}
              <Card className="royal-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg royal-text font-royal">{currentStrategy.title}</CardTitle>
                    <Badge
                      className={
                        currentStrategy.risk === "Low"
                          ? "status-premium"
                          : currentStrategy.risk === "Medium"
                            ? "status-elite"
                            : "status-platinum"
                      }
                    >
                      {currentStrategy.risk} Risk
                    </Badge>
                  </div>
                  <CardDescription>{currentStrategy.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{currentStrategy.progress}%</div>
                      <p className="text-xs text-muted-foreground">Progress</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{currentStrategy.timeframe}</div>
                      <p className="text-xs text-muted-foreground">Timeline</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{currentStrategy.roi}</div>
                      <p className="text-xs text-muted-foreground">Expected ROI</p>
                    </div>
                  </div>
                  <Progress value={currentStrategy.progress} className="h-2" />
                </CardContent>
              </Card>

              {/* Action Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center space-x-2">
                    <Target className="h-4 w-4" />
                    <span>Recommended Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentStrategy.actions.map((action, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        <span className="text-sm">{action}</span>
                        <Button size="sm" variant="outline" className="ml-auto">
                          Start
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center space-x-2">
                    <Lightbulb className="h-4 w-4" />
                    <span>AI Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {insights.map((insight, index) => {
                      const IconComponent = insight.icon
                      return (
                        <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                          <IconComponent className={`h-5 w-5 ${insight.color} mt-0.5`} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-sm">{insight.title}</h4>
                              <Badge
                                variant="outline"
                                className={
                                  insight.impact === "High"
                                    ? "border-red-200 text-red-800"
                                    : insight.impact === "Medium"
                                      ? "border-yellow-200 text-yellow-800"
                                      : "border-green-200 text-green-800"
                                }
                              >
                                {insight.impact}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{insight.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-1" />
                      <div className="text-lg font-bold text-green-600">+$12,450</div>
                      <p className="text-xs text-muted-foreground">Net Worth Increase</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Shield className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                      <div className="text-lg font-bold text-blue-600">94%</div>
                      <p className="text-xs text-muted-foreground">Goal Achievement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
