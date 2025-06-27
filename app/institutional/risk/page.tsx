"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle, BarChart3, PieChart } from "lucide-react"

export default function InstitutionalRiskPage() {
  const riskMetrics = {
    overallRiskScore: 7.2,
    valueAtRisk: 45200000,
    portfolioBeta: 1.12,
    volatility: 14.8,
    maxDrawdown: 8.3,
    sharpeRatio: 2.34,
  }

  const riskAlerts = [
    {
      id: "RISK-001",
      severity: "high",
      title: "Elevated Sector Concentration",
      description: "Technology sector allocation exceeds 30% threshold",
      impact: "$12.5M potential exposure",
      recommendation: "Consider rebalancing to reduce concentration risk",
    },
    {
      id: "RISK-002",
      severity: "medium",
      title: "Correlation Spike",
      description: "Increased correlation between equity positions",
      impact: "Reduced diversification benefit",
      recommendation: "Review portfolio correlation matrix",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Risk Management</h1>
            <p className="text-xl text-muted-foreground mt-2">Portfolio risk analysis and monitoring</p>
          </div>
          <Badge className="bg-orange-600 text-white">
            <Shield className="h-4 w-4 mr-2" />
            Risk Score: {riskMetrics.overallRiskScore}/10
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Value at Risk (95%)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${(riskMetrics.valueAtRisk / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground mt-1">1-day VaR</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Beta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{riskMetrics.portfolioBeta}</div>
              <p className="text-xs text-muted-foreground mt-1">vs S&P 500</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Volatility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{riskMetrics.volatility}%</div>
              <p className="text-xs text-muted-foreground mt-1">Annualized</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="alerts">Risk Alerts</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Max Drawdown</span>
                    <span className="font-bold">{riskMetrics.maxDrawdown}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sharpe Ratio</span>
                    <span className="font-bold text-green-600">{riskMetrics.sharpeRatio}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Risk-Adjusted Return</span>
                    <span className="font-bold">18.7%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                    <PieChart className="h-12 w-12 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Risk Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {riskAlerts.map((alert) => (
                  <Alert key={alert.id}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{alert.title}</span>
                          <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm">{alert.description}</p>
                        <p className="text-sm text-muted-foreground">{alert.recommendation}</p>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center bg-muted/20 rounded-lg">
                  <BarChart3 className="h-16 w-16 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Risk reporting dashboard coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
