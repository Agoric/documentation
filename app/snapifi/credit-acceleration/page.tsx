"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  CreditCard,
  TrendingUp,
  Target,
  CheckCircle,
  AlertCircle,
  Zap,
  Brain,
  Shield,
  Clock,
  Star,
  Users,
} from "lucide-react"

export default function CreditAccelerationPage() {
  const [currentScore, setCurrentScore] = useState(720)
  const [targetScore, setTargetScore] = useState(800)
  const [timeframe, setTimeframe] = useState(6)

  const creditFactors = [
    { name: "Payment History", weight: 35, current: 85, target: 95, impact: "High" },
    { name: "Credit Utilization", weight: 30, current: 45, target: 10, impact: "High" },
    { name: "Length of History", weight: 15, current: 75, target: 85, impact: "Medium" },
    { name: "Credit Mix", weight: 10, current: 60, target: 80, impact: "Low" },
    { name: "New Credit", weight: 10, current: 70, target: 90, impact: "Medium" },
  ]

  const accelerationStrategies = [
    {
      title: "Rapid Utilization Reduction",
      description: "Pay down credit cards to below 10% utilization",
      impact: "+45-60 points",
      timeframe: "30-60 days",
      difficulty: "Easy",
      icon: CreditCard,
      color: "text-green-600",
    },
    {
      title: "Authorized User Strategy",
      description: "Add yourself to family member's seasoned accounts",
      impact: "+20-40 points",
      timeframe: "30-45 days",
      difficulty: "Easy",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Credit Limit Increases",
      description: "Request increases on existing cards",
      impact: "+15-25 points",
      timeframe: "Immediate",
      difficulty: "Easy",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Dispute Optimization",
      description: "AI-powered dispute letter generation",
      impact: "+30-50 points",
      timeframe: "60-90 days",
      difficulty: "Medium",
      icon: Shield,
      color: "text-orange-600",
    },
  ]

  const projectedIncrease = Math.min(targetScore - currentScore, 80)
  const monthlyIncrease = Math.round(projectedIncrease / timeframe)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Credit Score Acceleration</h1>
          <p className="text-muted-foreground">AI-powered credit optimization with quantum-enhanced strategies</p>
        </div>
        <Badge className="bg-green-100 text-green-800">
          <Zap className="h-3 w-3 mr-1" />
          Quantum Optimized
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Credit Score Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Credit Score Acceleration Calculator</span>
              </CardTitle>
              <CardDescription>Set your goals and see projected improvements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="current-score">Current Score</Label>
                  <Input
                    id="current-score"
                    type="number"
                    value={currentScore}
                    onChange={(e) => setCurrentScore(Number(e.target.value))}
                    min="300"
                    max="850"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-score">Target Score</Label>
                  <Input
                    id="target-score"
                    type="number"
                    value={targetScore}
                    onChange={(e) => setTargetScore(Number(e.target.value))}
                    min="300"
                    max="850"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeframe">Timeframe (months)</Label>
                  <Input
                    id="timeframe"
                    type="number"
                    value={timeframe}
                    onChange={(e) => setTimeframe(Number(e.target.value))}
                    min="1"
                    max="24"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">+{projectedIncrease}</div>
                  <p className="text-sm text-blue-800">Total Increase</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">+{monthlyIncrease}</div>
                  <p className="text-sm text-green-800">Points/Month</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{targetScore}</div>
                  <p className="text-sm text-purple-800">Target Score</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Goal</span>
                  <span>{Math.round((projectedIncrease / (targetScore - currentScore)) * 100)}%</span>
                </div>
                <Progress value={(projectedIncrease / (targetScore - currentScore)) * 100} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Credit Factors Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Credit Score Factors Analysis</CardTitle>
              <CardDescription>Quantum analysis of your credit profile components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {creditFactors.map((factor, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{factor.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {factor.weight}% weight
                        </Badge>
                        <Badge
                          className={
                            factor.impact === "High"
                              ? "bg-red-100 text-red-800"
                              : factor.impact === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }
                        >
                          {factor.impact} Impact
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {factor.current}% → {factor.target}%
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Current</span>
                          <span>{factor.current}%</span>
                        </div>
                        <Progress value={factor.current} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Target</span>
                          <span>{factor.target}%</span>
                        </div>
                        <Progress value={factor.target} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Immediate steps you can take today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="h-auto p-4 justify-start">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Pay Down Balances</div>
                      <div className="text-sm text-muted-foreground">Reduce utilization to 10%</div>
                    </div>
                  </div>
                </Button>
                <Button className="h-auto p-4 justify-start" variant="outline">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Request Limit Increases</div>
                      <div className="text-sm text-muted-foreground">Boost available credit</div>
                    </div>
                  </div>
                </Button>
                <Button className="h-auto p-4 justify-start" variant="outline">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Dispute Errors</div>
                      <div className="text-sm text-muted-foreground">AI-generated dispute letters</div>
                    </div>
                  </div>
                </Button>
                <Button className="h-auto p-4 justify-start" variant="outline">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Set Payment Reminders</div>
                      <div className="text-sm text-muted-foreground">Never miss a payment</div>
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategies" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accelerationStrategies.map((strategy, index) => {
              const IconComponent = strategy.icon
              return (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <IconComponent className={`h-5 w-5 ${strategy.color}`} />
                        <span>{strategy.title}</span>
                      </CardTitle>
                      <Badge
                        className={
                          strategy.difficulty === "Easy"
                            ? "bg-green-100 text-green-800"
                            : strategy.difficulty === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {strategy.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>{strategy.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-green-600">{strategy.impact}</div>
                        <p className="text-sm text-muted-foreground">Potential Impact</p>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-600">{strategy.timeframe}</div>
                        <p className="text-sm text-muted-foreground">Timeframe</p>
                      </div>
                    </div>
                    <Button className="w-full">
                      <Zap className="h-4 w-4 mr-2" />
                      Start Strategy
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>AI-Powered Credit Monitoring</span>
              </CardTitle>
              <CardDescription>Real-time alerts and quantum-enhanced tracking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-bold">24/7</div>
                  <p className="text-sm text-muted-foreground">Monitoring</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <AlertCircle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-lg font-bold">Instant</div>
                  <p className="text-sm text-muted-foreground">Alerts</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-lg font-bold">AI</div>
                  <p className="text-sm text-muted-foreground">Insights</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Recent Activity</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">Payment Recorded</p>
                      <p className="text-sm text-green-700">Chase Credit Card - $250 payment processed</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">Score Increase</p>
                      <p className="text-sm text-blue-700">Your credit score increased by 8 points</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium text-orange-900">Utilization Alert</p>
                      <p className="text-sm text-orange-700">Credit utilization above 30% on Discover card</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Credit Education Resources</CardTitle>
              <CardDescription>Learn the fundamentals of credit optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Quick Tips</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium">Keep Utilization Low</h5>
                      <p className="text-sm text-muted-foreground">
                        Maintain credit card balances below 10% of limits for optimal scoring
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium">Pay Before Statement</h5>
                      <p className="text-sm text-muted-foreground">
                        Pay balances before statement closing date to reduce reported utilization
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium">Monitor Regularly</h5>
                      <p className="text-sm text-muted-foreground">
                        Check credit reports monthly for errors and unauthorized accounts
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Advanced Strategies</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium">Authorized User Boost</h5>
                      <p className="text-sm text-muted-foreground">
                        Add yourself to family member's old, well-managed accounts
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium">Credit Mix Optimization</h5>
                      <p className="text-sm text-muted-foreground">
                        Maintain diverse credit types: cards, auto loans, mortgages
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium">Strategic Inquiries</h5>
                      <p className="text-sm text-muted-foreground">
                        Time credit applications within 14-45 day windows for minimal impact
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
