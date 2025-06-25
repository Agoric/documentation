"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Activity, DollarSign, Users, Target, Download, Filter, RefreshCw } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Analytics & Reports
            </h1>
            <p className="text-xl text-muted-foreground mt-2">Comprehensive insights into your financial performance</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Total Revenue",
              value: "$2,847,392",
              change: "+12.5%",
              icon: DollarSign,
              color: "text-green-500",
            },
            { title: "Active Users", value: "12,847", change: "+8.2%", icon: Users, color: "text-blue-500" },
            { title: "Conversion Rate", value: "3.24%", change: "+0.8%", icon: Target, color: "text-purple-500" },
            { title: "Platform Growth", value: "24.7%", change: "+5.1%", icon: TrendingUp, color: "text-orange-500" },
          ].map((metric, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className={`text-sm ${metric.color}`}>{metric.change}</p>
                  </div>
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trading">Trading</TabsTrigger>
            <TabsTrigger value="commerce">Commerce</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Monthly revenue performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                      <p className="text-muted-foreground">Interactive Chart Placeholder</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                  <CardDescription>Platform activity metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg">
                    <div className="text-center">
                      <Activity className="h-12 w-12 mx-auto mb-4 text-green-400" />
                      <p className="text-muted-foreground">Activity Chart Placeholder</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trading" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Trading Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$12.4M</div>
                  <p className="text-sm text-green-500">+18.2% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Active Traders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2,847</div>
                  <p className="text-sm text-blue-500">+12.5% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">87.3%</div>
                  <p className="text-sm text-purple-500">+3.1% from last month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="commerce" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>EcommereX Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Sales</span>
                    <span className="font-bold">$847,392</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Orders</span>
                    <span className="font-bold">12,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conversion Rate</span>
                    <span className="font-bold text-green-500">4.2%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Quantum Earbuds Pro", sales: "$45,230" },
                    { name: "HoloVision Webcam", sales: "$38,920" },
                    { name: "Smart Home Hub", sales: "$32,150" },
                  ].map((product, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{product.name}</span>
                      <Badge variant="secondary">{product.sales}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">24,847</div>
                  <p className="text-sm text-green-500">+15.2% growth</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">8,392</div>
                  <p className="text-sm text-blue-500">Currently online</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Retention Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">92.4%</div>
                  <p className="text-sm text-purple-500">30-day retention</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Response Time</span>
                    <Badge variant="secondary">142ms</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Uptime</span>
                    <Badge variant="secondary">99.9%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Error Rate</span>
                    <Badge variant="secondary">0.01%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>AI Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Prediction Accuracy</span>
                    <Badge variant="secondary">94.7%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Speed</span>
                    <Badge variant="secondary">0.3s</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Model Confidence</span>
                    <Badge variant="secondary">87.2%</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
