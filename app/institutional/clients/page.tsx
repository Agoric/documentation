"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Users, Building2, TrendingUp, Phone, Mail, Calendar, FileText, Star, Clock } from "lucide-react"

export default function InstitutionalClientsPage() {
  const clientMetrics = {
    totalClients: 156,
    totalAUM: 2847500000,
    avgClientSize: 18254000,
    clientRetention: 94.7,
    newClientsThisMonth: 8,
    meetingsScheduled: 23,
  }

  const topClients = [
    {
      name: "Sovereign Wealth Fund Alpha",
      type: "Sovereign Fund",
      aum: 450000000,
      relationship: "5 years",
      performance: 18.7,
      status: "active",
      lastContact: "2 days ago",
    },
    {
      name: "Pension Fund Beta",
      type: "Pension Fund",
      aum: 320000000,
      relationship: "3 years",
      performance: 16.2,
      status: "active",
      lastContact: "1 week ago",
    },
    {
      name: "Insurance Corp Gamma",
      type: "Insurance",
      aum: 275000000,
      relationship: "7 years",
      performance: 14.9,
      status: "active",
      lastContact: "3 days ago",
    },
    {
      name: "Endowment Delta",
      type: "Endowment",
      aum: 180000000,
      relationship: "2 years",
      performance: 22.1,
      status: "review",
      lastContact: "1 day ago",
    },
  ]

  const recentActivity = [
    {
      client: "Sovereign Wealth Fund Alpha",
      activity: "Quarterly performance review completed",
      time: "2 hours ago",
      type: "meeting",
    },
    {
      client: "Pension Fund Beta",
      activity: "New mandate approved - $50M allocation",
      time: "1 day ago",
      type: "mandate",
    },
    {
      client: "Insurance Corp Gamma",
      activity: "ESG compliance review scheduled",
      time: "2 days ago",
      type: "compliance",
    },
    {
      client: "Endowment Delta",
      activity: "Investment committee presentation",
      time: "3 days ago",
      type: "presentation",
    },
  ]

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(2)}B`
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    }
    return `$${amount.toLocaleString()}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "review":
        return "bg-yellow-500"
      case "onboarding":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return <Calendar className="h-4 w-4" />
      case "mandate":
        return <FileText className="h-4 w-4" />
      case "compliance":
        return <Building2 className="h-4 w-4" />
      case "presentation":
        return <Star className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Client Relations</h1>
            <p className="text-xl text-muted-foreground mt-2">Institutional client management and relationships</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-blue-600 text-white">
              <Users className="h-4 w-4 mr-2" />
              {clientMetrics.totalClients} Clients
            </Badge>
            <Button>
              <Phone className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total AUM</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(clientMetrics.totalAUM)}</div>
              <div className="flex items-center text-sm text-green-600 mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +15.2% YTD
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Client Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{clientMetrics.clientRetention}%</div>
              <Progress value={clientMetrics.clientRetention} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Client Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(clientMetrics.avgClientSize)}</div>
              <div className="flex items-center text-sm text-blue-600 mt-1">
                <Building2 className="h-4 w-4 mr-1" />
                {clientMetrics.newClientsThisMonth} new this month
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="clients">Client Portfolio</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Top Institutional Clients
                </CardTitle>
                <CardDescription>Largest clients by assets under management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topClients.map((client, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(client.status)}`} />
                        <div>
                          <h4 className="font-medium">{client.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{client.type}</span>
                            <span>•</span>
                            <span>{client.relationship} relationship</span>
                            <span>•</span>
                            <span>Last contact: {client.lastContact}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatCurrency(client.aum)}</div>
                        <div className="text-sm text-green-600">+{client.performance}% YTD</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Client Activity
                </CardTitle>
                <CardDescription>Latest interactions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-3 border rounded-lg">
                      <div className="p-2 bg-muted rounded-lg">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <h4 className="font-medium">{activity.client}</h4>
                        <p className="text-sm text-muted-foreground">{activity.activity}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {activity.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="meetings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Meetings
                </CardTitle>
                <CardDescription>Scheduled client meetings and reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium text-muted-foreground">Meeting Calendar</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {clientMetrics.meetingsScheduled} meetings scheduled this month
                  </p>
                  <Button className="mt-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Client Reports
                </CardTitle>
                <CardDescription>Performance reports and client communications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Quarterly Performance Reports</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Comprehensive performance analysis for all clients
                    </p>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Reports
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Client Communications</h4>
                    <p className="text-sm text-muted-foreground mb-4">Monthly newsletters and market updates</p>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Updates
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
