"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Crown,
  Server,
  Shield,
  Activity,
  Users,
  Database,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Monitor,
  Settings,
  FileText,
  BarChart3,
  Globe,
  Lock,
} from "lucide-react"

export default function ImperialCommandPage() {
  const systemStats = [
    { title: "System Uptime", value: "99.98%", change: "+0.02%", icon: Activity, color: "text-green-500" },
    { title: "Active Users", value: "12,847", change: "+5.2%", icon: Users, color: "text-blue-500" },
    { title: "Database Load", value: "23%", change: "-2.1%", icon: Database, color: "text-purple-500" },
    { title: "Security Alerts", value: "3", change: "-12", icon: Shield, color: "text-orange-500" },
  ]

  const criticalAlerts = [
    {
      id: 1,
      type: "warning",
      title: "High Memory Usage",
      description: "Server cluster approaching 85% memory utilization",
      time: "2 minutes ago",
      severity: "medium",
    },
    {
      id: 2,
      type: "info",
      title: "Scheduled Maintenance",
      description: "Database backup scheduled for 02:00 UTC",
      time: "1 hour ago",
      severity: "low",
    },
    {
      id: 3,
      type: "success",
      title: "Security Scan Complete",
      description: "No vulnerabilities detected in latest scan",
      time: "3 hours ago",
      severity: "low",
    },
  ]

  const systemServices = [
    { name: "Authentication Service", status: "operational", uptime: "99.99%" },
    { name: "Payment Processing", status: "operational", uptime: "99.95%" },
    { name: "Data Analytics", status: "operational", uptime: "99.87%" },
    { name: "Notification Service", status: "maintenance", uptime: "98.23%" },
    { name: "File Storage", status: "operational", uptime: "99.92%" },
    { name: "API Gateway", status: "operational", uptime: "99.98%" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-orange-950 to-red-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent flex items-center gap-3">
              <Crown className="h-10 w-10 text-red-400" />
              Imperial Command Center
            </h1>
            <p className="text-xl text-red-200 mt-2">Backend Administration & System Control</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-red-500/20 text-red-300 border-red-500/30">
              <Lock className="h-3 w-3 mr-1" />
              Secure Access
            </Badge>
            <Button variant="outline" className="border-red-500/30 text-red-300 hover:bg-red-500/20 bg-transparent">
              <Settings className="h-4 w-4 mr-2" />
              System Config
            </Button>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-red-900/50 to-orange-900/30 backdrop-blur-sm border-red-500/20"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-200">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-red-900/30 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Critical Alerts */}
              <Card className="bg-gradient-to-br from-red-900/50 to-orange-900/30 backdrop-blur-sm border-red-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-200">
                    <AlertTriangle className="h-5 w-5" />
                    Critical Alerts
                  </CardTitle>
                  <CardDescription className="text-red-300">System notifications and alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {criticalAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-start justify-between p-3 rounded-lg bg-gradient-to-br from-red-800/30 to-orange-800/20 border border-red-500/20"
                    >
                      <div className="flex items-start gap-3">
                        {alert.type === "warning" && <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5" />}
                        {alert.type === "info" && <Clock className="h-5 w-5 text-blue-400 mt-0.5" />}
                        {alert.type === "success" && <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />}
                        <div>
                          <p className="font-medium text-white">{alert.title}</p>
                          <p className="text-sm text-red-200">{alert.description}</p>
                          <p className="text-xs text-red-300 mt-1">{alert.time}</p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          alert.severity === "high"
                            ? "destructive"
                            : alert.severity === "medium"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* System Performance */}
              <Card className="bg-gradient-to-br from-red-900/50 to-orange-900/30 backdrop-blur-sm border-red-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-200">
                    <BarChart3 className="h-5 w-5" />
                    System Performance
                  </CardTitle>
                  <CardDescription className="text-red-300">Real-time performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-red-800/20 to-orange-800/10 rounded-lg">
                    <div className="text-center">
                      <Monitor className="h-12 w-12 mx-auto mb-4 text-red-400" />
                      <p className="text-red-200">Performance Chart Placeholder</p>
                      <p className="text-sm text-red-300 mt-2">Real-time metrics visualization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card className="bg-gradient-to-br from-red-900/50 to-orange-900/30 backdrop-blur-sm border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-200">
                  <Server className="h-5 w-5" />
                  System Services
                </CardTitle>
                <CardDescription className="text-red-300">Monitor and manage system services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-red-800/30 to-orange-800/20 border border-red-500/20"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          service.status === "operational"
                            ? "bg-green-400"
                            : service.status === "maintenance"
                              ? "bg-yellow-400"
                              : "bg-red-400"
                        }`}
                      />
                      <div>
                        <h4 className="font-medium text-white">{service.name}</h4>
                        <p className="text-sm text-red-200">Uptime: {service.uptime}</p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        service.status === "operational"
                          ? "default"
                          : service.status === "maintenance"
                            ? "secondary"
                            : "destructive"
                      }
                      className="capitalize"
                    >
                      {service.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-gradient-to-br from-red-900/50 to-orange-900/30 backdrop-blur-sm border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-200">
                  <Shield className="h-5 w-5" />
                  Security Center
                </CardTitle>
                <CardDescription className="text-red-300">Security monitoring and threat detection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-green-800/30 to-emerald-800/20 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="font-medium text-white">Firewall Status</span>
                    </div>
                    <p className="text-sm text-green-200">Active & Protected</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-blue-800/30 to-cyan-800/20 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="h-5 w-5 text-blue-400" />
                      <span className="font-medium text-white">SSL Certificates</span>
                    </div>
                    <p className="text-sm text-blue-200">Valid & Updated</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-purple-800/30 to-violet-800/20 border border-purple-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-5 w-5 text-purple-400" />
                      <span className="font-medium text-white">Threat Detection</span>
                    </div>
                    <p className="text-sm text-purple-200">No Threats Detected</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <Card className="bg-gradient-to-br from-red-900/50 to-orange-900/30 backdrop-blur-sm border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-200">
                  <Monitor className="h-5 w-5" />
                  System Monitoring
                </CardTitle>
                <CardDescription className="text-red-300">Real-time system monitoring and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center bg-gradient-to-br from-red-800/20 to-orange-800/10 rounded-lg">
                  <div className="text-center">
                    <Activity className="h-16 w-16 mx-auto mb-4 text-red-400" />
                    <p className="text-red-200 text-lg">Monitoring Dashboard</p>
                    <p className="text-sm text-red-300 mt-2">Real-time system metrics and performance data</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <Card className="bg-gradient-to-br from-red-900/50 to-orange-900/30 backdrop-blur-sm border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-200">
                  <FileText className="h-5 w-5" />
                  System Logs
                </CardTitle>
                <CardDescription className="text-red-300">System logs and audit trails</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 font-mono text-sm bg-black/30 p-4 rounded-lg max-h-96 overflow-y-auto">
                  <div className="text-green-400">
                    [2024-01-20 14:32:15] INFO: System startup completed successfully
                  </div>
                  <div className="text-blue-400">[2024-01-20 14:32:16] DEBUG: Database connection established</div>
                  <div className="text-yellow-400">[2024-01-20 14:32:17] WARN: High memory usage detected</div>
                  <div className="text-green-400">[2024-01-20 14:32:18] INFO: User authentication successful</div>
                  <div className="text-blue-400">[2024-01-20 14:32:19] DEBUG: API request processed</div>
                  <div className="text-green-400">[2024-01-20 14:32:20] INFO: Backup process initiated</div>
                  <div className="text-red-400">[2024-01-20 14:32:21] ERROR: Failed to connect to external service</div>
                  <div className="text-green-400">[2024-01-20 14:32:22] INFO: Service recovered automatically</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
