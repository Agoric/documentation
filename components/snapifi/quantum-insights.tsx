"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cpu, Zap, Brain, TrendingUp, Shield, Clock, Target, Sparkles, Activity } from "lucide-react"

interface QuantumMetric {
  name: string
  value: string
  change: string
  status: "optimal" | "good" | "warning"
  description: string
}

export function QuantumInsights() {
  const [processingSpeed, setProcessingSpeed] = useState(99.7)
  const [quantumState, setQuantumState] = useState("superposition")
  const [calculations, setCalculations] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCalculations((prev) => prev + Math.floor(Math.random() * 1000000))
      setProcessingSpeed((prev) => Math.min(99.9, prev + Math.random() * 0.1))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const quantumMetrics: QuantumMetric[] = [
    {
      name: "Processing Efficiency",
      value: `${processingSpeed.toFixed(1)}%`,
      change: "+0.3%",
      status: "optimal",
      description: "Quantum algorithms operating at peak efficiency",
    },
    {
      name: "Parallel Calculations",
      value: "∞",
      change: "Unlimited",
      status: "optimal",
      description: "Infinite parallel processing capability",
    },
    {
      name: "Error Correction",
      value: "99.99%",
      change: "+0.01%",
      status: "optimal",
      description: "Quantum error correction maintaining accuracy",
    },
    {
      name: "Entanglement Stability",
      value: "98.7%",
      change: "+1.2%",
      status: "good",
      description: "Quantum entanglement maintaining coherence",
    },
    {
      name: "Decoherence Time",
      value: "2.3ms",
      change: "+0.1ms",
      status: "good",
      description: "Quantum state coherence duration",
    },
    {
      name: "Superposition States",
      value: "2^256",
      change: "Stable",
      status: "optimal",
      description: "Active quantum superposition states",
    },
  ]

  const quantumApplications = [
    {
      title: "Risk Assessment",
      description: "Quantum algorithms analyze millions of risk scenarios simultaneously",
      impact: "99.7% accuracy",
      icon: Shield,
      color: "text-green-600",
    },
    {
      title: "Market Prediction",
      description: "Quantum machine learning predicts market movements with unprecedented precision",
      impact: "87% success rate",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      title: "Portfolio Optimization",
      description: "Quantum computing optimizes portfolio allocation across infinite possibilities",
      impact: "24% better returns",
      icon: Target,
      color: "text-purple-600",
    },
    {
      title: "Fraud Detection",
      description: "Quantum pattern recognition identifies fraudulent activities in real-time",
      impact: "0.001% false positives",
      icon: Brain,
      color: "text-orange-600",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "warning":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "optimal":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quantum Computing Dashboard</h2>
          <p className="text-muted-foreground">Real-time quantum processing metrics and financial insights</p>
        </div>
        <Badge className="bg-cyan-100 text-cyan-800">
          <Cpu className="h-3 w-3 mr-1" />
          Quantum Active
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quantum Status */}
          <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cpu className="h-6 w-6 text-cyan-600" />
                <span>Quantum Processing Unit Status</span>
              </CardTitle>
              <CardDescription>Real-time quantum computer performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-600">{processingSpeed.toFixed(1)}%</div>
                  <p className="text-sm text-muted-foreground">Processing Efficiency</p>
                  <Progress value={processingSpeed} className="h-2 mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{calculations.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">Calculations/Second</p>
                  <div className="flex items-center justify-center mt-2">
                    <Activity className="h-4 w-4 text-blue-600 animate-pulse" />
                    <span className="text-xs text-blue-600 ml-1">Live</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 capitalize">{quantumState}</div>
                  <p className="text-sm text-muted-foreground">Quantum State</p>
                  <Badge className="bg-purple-100 text-purple-800 mt-2">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Coherent
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quantumMetrics.slice(0, 6).map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                  <Badge className={getStatusBadge(metric.status)}>{metric.status}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className={`text-xs ${getStatusColor(metric.status)}`}>{metric.change} from last cycle</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Real-time Processing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Real-time Quantum Processing</span>
              </CardTitle>
              <CardDescription>Live quantum calculations for financial optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-medium">Portfolio Optimization</span>
                  </div>
                  <span className="text-sm text-green-600">Processing 2.3M scenarios</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse" />
                    <span className="font-medium">Risk Analysis</span>
                  </div>
                  <span className="text-sm text-blue-600">Analyzing 847K risk factors</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-3 w-3 rounded-full bg-purple-500 animate-pulse" />
                    <span className="font-medium">Market Prediction</span>
                  </div>
                  <span className="text-sm text-purple-600">Forecasting 156 markets</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quantumMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{metric.name}</CardTitle>
                    <Badge className={getStatusBadge(metric.status)}>{metric.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{metric.value}</div>
                    <div className={`text-sm ${getStatusColor(metric.status)}`}>{metric.change} change</div>
                  </div>
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                  <Progress
                    value={metric.status === "optimal" ? 95 : metric.status === "good" ? 80 : 60}
                    className="h-2"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quantumApplications.map((app, index) => {
              const IconComponent = app.icon
              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <IconComponent className={`h-5 w-5 ${app.color}`} />
                      <span>{app.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{app.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Performance Impact</span>
                      <Badge className="bg-green-100 text-green-800">{app.impact}</Badge>
                    </div>
                    <Button className="w-full" variant="outline">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>Quantum-Generated Insights</span>
              </CardTitle>
              <CardDescription>AI insights powered by quantum computing analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Market Opportunity</span>
                </div>
                <p className="text-sm text-blue-800">
                  Quantum analysis identifies 73% probability of tech sector growth in next 30 days. Recommend
                  increasing allocation by 12% for optimal returns.
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-900">Risk Mitigation</span>
                </div>
                <p className="text-sm text-green-800">
                  Quantum risk models suggest diversifying into defensive assets. Current portfolio risk reduced by 34%
                  through quantum optimization.
                </p>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="h-4 w-4 text-purple-600" />
                  <span className="font-medium text-purple-900">Portfolio Optimization</span>
                </div>
                <p className="text-sm text-purple-800">
                  Quantum algorithms identified suboptimal asset allocation. Rebalancing could improve returns by 18%
                  while maintaining current risk level.
                </p>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="font-medium text-orange-900">Timing Analysis</span>
                </div>
                <p className="text-sm text-orange-800">
                  Quantum temporal analysis suggests optimal entry point for real estate investment in 14-21 days based
                  on market cycle predictions.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quantum Advantage</CardTitle>
                <CardDescription>How quantum computing enhances your financial decisions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Processing Speed</span>
                    <span className="font-bold text-green-600">10,000x faster</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Scenario Analysis</span>
                    <span className="font-bold text-blue-600">Millions simultaneous</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prediction Accuracy</span>
                    <span className="font-bold text-purple-600">87% vs 62% classical</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Assessment</span>
                    <span className="font-bold text-orange-600">99.7% accuracy</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>Quantum computing infrastructure metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-600">99.97%</div>
                    <p className="text-sm text-muted-foreground">Uptime</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-blue-600">0.003s</div>
                      <p className="text-xs text-muted-foreground">Avg Response</p>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">256</div>
                      <p className="text-xs text-muted-foreground">Qubits Active</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
