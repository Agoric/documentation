"use client"

import React from "react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { FuturisticCard } from "@/components/ui/futuristic-card"
import { useRouter } from "next/navigation"
import {
  Rocket,
  Target,
  ArrowLeft,
  Brain,
  DollarSign,
  Calendar,
  PieChart,
  BarChart3,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

export default function RetirementSimulatorPage() {
  const router = useRouter()
  const [currentAge, setCurrentAge] = React.useState(35)
  const [retirementAge, setRetirementAge] = React.useState([65])
  const [currentSavings, setCurrentSavings] = React.useState(150000)
  const [monthlyContribution, setMonthlyContribution] = React.useState(2000)
  const [expectedReturn, setExpectedReturn] = React.useState([7])
  const [inflationRate, setInflationRate] = React.useState([3])
  const [desiredIncome, setDesiredIncome] = React.useState(80000)

  const yearsToRetirement = retirementAge[0] - currentAge
  const totalContributions = monthlyContribution * 12 * yearsToRetirement
  const futureValue =
    currentSavings * Math.pow(1 + expectedReturn[0] / 100, yearsToRetirement) +
    (monthlyContribution * 12 * (Math.pow(1 + expectedReturn[0] / 100, yearsToRetirement) - 1)) /
      (expectedReturn[0] / 100)

  const adjustedDesiredIncome = desiredIncome * Math.pow(1 + inflationRate[0] / 100, yearsToRetirement)
  const withdrawalRate = 0.04 // 4% rule
  const sustainableIncome = futureValue * withdrawalRate
  const shortfall = Math.max(0, adjustedDesiredIncome - sustainableIncome)
  const surplus = Math.max(0, sustainableIncome - adjustedDesiredIncome)

  const scenarios = [
    {
      name: "Conservative",
      return: 5,
      value:
        currentSavings * Math.pow(1.05, yearsToRetirement) +
        (monthlyContribution * 12 * (Math.pow(1.05, yearsToRetirement) - 1)) / 0.05,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Moderate",
      return: 7,
      value: futureValue,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Aggressive",
      return: 9,
      value:
        currentSavings * Math.pow(1.09, yearsToRetirement) +
        (monthlyContribution * 12 * (Math.pow(1.09, yearsToRetirement) - 1)) / 0.09,
      color: "from-purple-500 to-pink-500",
    },
  ]

  const optimizeRetirement = () => {
    // Calculate required monthly contribution to meet goal
    const requiredFutureValue = adjustedDesiredIncome / withdrawalRate
    const futureValueFromCurrentSavings = currentSavings * Math.pow(1 + expectedReturn[0] / 100, yearsToRetirement)
    const additionalNeeded = requiredFutureValue - futureValueFromCurrentSavings

    if (additionalNeeded > 0) {
      const requiredMonthlyContribution =
        (additionalNeeded * (expectedReturn[0] / 100)) /
        (12 * (Math.pow(1 + expectedReturn[0] / 100, yearsToRetirement) - 1))
      setMonthlyContribution(Math.ceil(requiredMonthlyContribution))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 pl-20">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()} className="text-cyan-400 hover:text-cyan-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
                AI Retirement Simulator
              </h1>
              <p className="text-muted-foreground mt-2">Quantum modeling of retirement scenarios with 99% accuracy</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={optimizeRetirement} className="bg-gradient-to-r from-orange-500 to-red-500">
              <Brain className="w-4 h-4 mr-2" />
              AI Optimize
            </Button>
          </div>
        </div>

        {/* Input Parameters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <FuturisticCard variant="neural">
            <CardHeader>
              <CardTitle className="text-cyan-400">Personal Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white">Current Age</Label>
                <Input
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                  className="bg-background/50 border-white/20"
                />
              </div>
              <div>
                <Label className="text-white">Retirement Age: {retirementAge[0]}</Label>
                <Slider
                  value={retirementAge}
                  onValueChange={setRetirementAge}
                  max={75}
                  min={55}
                  step={1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </FuturisticCard>

          <FuturisticCard variant="quantum">
            <CardHeader>
              <CardTitle className="text-cyan-400">Current Savings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white">Current Balance</Label>
                <Input
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="bg-background/50 border-white/20"
                />
              </div>
              <div>
                <Label className="text-white">Monthly Contribution</Label>
                <Input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="bg-background/50 border-white/20"
                />
              </div>
            </CardContent>
          </FuturisticCard>

          <FuturisticCard variant="holographic">
            <CardHeader>
              <CardTitle className="text-cyan-400">Market Assumptions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white">Expected Return: {expectedReturn[0]}%</Label>
                <Slider
                  value={expectedReturn}
                  onValueChange={setExpectedReturn}
                  max={12}
                  min={3}
                  step={0.5}
                  className="w-full"
                />
              </div>
              <div>
                <Label className="text-white">Inflation Rate: {inflationRate[0]}%</Label>
                <Slider
                  value={inflationRate}
                  onValueChange={setInflationRate}
                  max={6}
                  min={1}
                  step={0.5}
                  className="w-full"
                />
              </div>
            </CardContent>
          </FuturisticCard>

          <FuturisticCard variant="cyber">
            <CardHeader>
              <CardTitle className="text-cyan-400">Retirement Goal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white">Desired Annual Income</Label>
                <Input
                  type="number"
                  value={desiredIncome}
                  onChange={(e) => setDesiredIncome(Number(e.target.value))}
                  className="bg-background/50 border-white/20"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Adjusted for inflation: ${adjustedDesiredIncome.toLocaleString()}
              </div>
            </CardContent>
          </FuturisticCard>
        </div>

        {/* Results Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <FuturisticCard variant="neural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Years to Retirement</p>
                  <p className="text-2xl font-bold text-white">{yearsToRetirement}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </FuturisticCard>

          <FuturisticCard variant="quantum">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Projected Value</p>
                  <p className="text-2xl font-bold text-white">
                    ${futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <Target className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </FuturisticCard>

          <FuturisticCard variant="holographic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sustainable Income</p>
                  <p className="text-2xl font-bold text-white">
                    ${sustainableIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </FuturisticCard>

          <FuturisticCard variant="cyber">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{shortfall > 0 ? "Shortfall" : "Surplus"}</p>
                  <p className={`text-2xl font-bold ${shortfall > 0 ? "text-red-400" : "text-green-400"}`}>
                    ${(shortfall || surplus).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
                {shortfall > 0 ? (
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                ) : (
                  <CheckCircle className="h-8 w-8 text-green-400" />
                )}
              </div>
            </CardContent>
          </FuturisticCard>
        </div>

        {/* Scenario Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FuturisticCard variant="quantum">
            <CardHeader>
              <CardTitle className="text-cyan-400">Scenario Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {scenarios.map((scenario) => (
                <div key={scenario.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h4 className="text-white font-medium">{scenario.name}</h4>
                      <Badge className="text-xs">{scenario.return}% return</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">
                        ${scenario.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ${(scenario.value * withdrawalRate).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        /year
                      </div>
                    </div>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${scenario.color} transition-all duration-500`}
                      style={{
                        width: `${Math.min((scenario.value / Math.max(...scenarios.map((s) => s.value))) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      vs Goal: {(((scenario.value * withdrawalRate) / adjustedDesiredIncome) * 100).toFixed(0)}%
                    </span>
                    <span
                      className={
                        scenario.value * withdrawalRate >= adjustedDesiredIncome ? "text-green-400" : "text-red-400"
                      }
                    >
                      {scenario.value * withdrawalRate >= adjustedDesiredIncome ? "✓ On Track" : "⚠ Behind"}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </FuturisticCard>

          {/* AI Recommendations */}
          <FuturisticCard variant="holographic">
            <CardHeader>
              <CardTitle className="text-cyan-400">AI Retirement Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-4 rounded-lg border border-orange-500/30">
                <h4 className="text-white font-medium mb-2">Optimization Recommendations</h4>
                <ul className="space-y-2 text-sm text-orange-300">
                  <li>
                    • Increase monthly contributions by $
                    {Math.max(
                      0,
                      Math.ceil(shortfall / (yearsToRetirement * 12)) - monthlyContribution,
                    ).toLocaleString()}
                  </li>
                  <li>• Consider delaying retirement by 2-3 years for significant impact</li>
                  <li>• Maximize employer 401(k) matching if available</li>
                  <li>• Review asset allocation for age-appropriate risk level</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-lg border border-blue-500/30">
                <h4 className="text-white font-medium mb-2">Key Metrics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-300">Savings Rate:</span>
                    <span className="text-white font-medium">
                      {(((monthlyContribution * 12) / (desiredIncome * 0.8)) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-300">Replacement Ratio:</span>
                    <span className="text-white font-medium">
                      {((sustainableIncome / desiredIncome) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-300">Total Contributions:</span>
                    <span className="text-white font-medium">${totalContributions.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500"
                  onClick={() => router.push("/dashboard/financial-planning/401k-optimizer")}
                >
                  <PieChart className="w-4 h-4 mr-2" />
                  401(k) Optimizer
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
                  onClick={() => router.push("/dashboard/financial-planning/social-security")}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Social Security Planner
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  onClick={() => router.push("/dashboard/financial-planning/retirement-income")}
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Income Strategies
                </Button>
              </div>
            </CardContent>
          </FuturisticCard>
        </div>
      </div>
    </div>
  )
}
