"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Server,
  Database,
  Shield,
  Activity,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Zap,
  Globe,
  Lock,
  Cpu,
  HardDrive,
  Network,
} from "lucide-react"

interface PlatformControlPanelProps {
  className?: string
  userRole?: "admin" | "moderator" | "user"
}

export function PlatformControlPanel({ className, userRole = "user" }: PlatformControlPanelProps) {
  const [maintenanceMode, setMaintenanceMode] = React.useState(false)
  const [debugMode, setDebugMode] = React.useState(false)
  const [autoBackup, setAutoBackup] = React.useState(true)
  const [rateLimiting, setRateLimiting] = React.useState(true)
  const [analyticsEnabled, setAnalyticsEnabled] = React.useState(true)

  const systemMetrics = [
    { label: "CPU Usage", value: 45, status: "normal", icon: Cpu },
    { label: "Memory", value: 67, status: "warning", icon: HardDrive },
    { label: "Database", value: 23, status: "normal", icon: Database },
    { label: "Network", value: 89, status: "critical", icon: Network },
  ]

  const platformServices = [
    { name: "Authentication Service", status: "online", uptime: "99.9%", icon: Shield },
    { name: "Payment Gateway", status: "online", uptime: "99.7%", icon: Lock },
    { name: "AI Processing", status: "warning", uptime: "98.2%", icon: Zap },
    { name: "Database Cluster", status: "online", uptime: "99.8%", icon: Database },
    { name: "CDN Network", status: "online", uptime: "99.9%", icon: Globe },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "offline":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
    }
  }

  const getMetricColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-emerald-500"
      case "warning":
        return "bg-yellow-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  // Restrict access based on user role
  if (userRole === "user") {
    return (
      <Card
        className={`bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20 ${className}`}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Platform Status
          </CardTitle>
          <CardDescription>View-only platform information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {systemMetrics.slice(0, 2).map((metric) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <metric.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{metric.label}</span>
                  </div>
                  <Badge variant="outline">{metric.value}%</Badge>
                </div>
                <Progress value={metric.value} className={`h-2 ${getMetricColor(metric.status)}`} />
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-muted-foreground">Contact administrator for platform controls</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={`bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20 ${className}`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5" />
          Platform Controls
          <Badge variant={userRole === "admin" ? "default" : "secondary"}>{userRole.toUpperCase()}</Badge>
        </CardTitle>
        <CardDescription>Backend system management and monitoring</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* System Metrics */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-sm">System Metrics</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {systemMetrics.map((metric) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <metric.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{metric.label}</span>
                  </div>
                  <Badge variant="outline">{metric.value}%</Badge>
                </div>
                <Progress value={metric.value} className={`h-2`} />
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Platform Services */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-sm">Platform Services</h3>
          </div>
          <div className="space-y-3">
            {platformServices.map((service) => (
              <div key={service.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(service.status)}
                  <service.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{service.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{service.uptime}</Badge>
                  <Button size="sm" variant="ghost">
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Platform Controls */}
        {userRole === "admin" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-primary" />
              <h3 className="font-medium text-sm">Platform Controls</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Maintenance Mode</Label>
                  <p className="text-xs text-muted-foreground">Temporarily disable user access</p>
                </div>
                <Switch
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                  className="data-[state=checked]:bg-red-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Debug Mode</Label>
                  <p className="text-xs text-muted-foreground">Enable detailed logging</p>
                </div>
                <Switch
                  checked={debugMode}
                  onCheckedChange={setDebugMode}
                  className="data-[state=checked]:bg-yellow-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Auto Backup</Label>
                  <p className="text-xs text-muted-foreground">Automatic database backups</p>
                </div>
                <Switch
                  checked={autoBackup}
                  onCheckedChange={setAutoBackup}
                  className="data-[state=checked]:bg-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Rate Limiting</Label>
                  <p className="text-xs text-muted-foreground">API request throttling</p>
                </div>
                <Switch
                  checked={rateLimiting}
                  onCheckedChange={setRateLimiting}
                  className="data-[state=checked]:bg-blue-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Analytics</Label>
                  <p className="text-xs text-muted-foreground">User behavior tracking</p>
                </div>
                <Switch
                  checked={analyticsEnabled}
                  onCheckedChange={setAnalyticsEnabled}
                  className="data-[state=checked]:bg-purple-500"
                />
              </div>
            </div>
          </div>
        )}

        <Separator />

        {/* Action Buttons */}
        <div className="flex gap-2">
          {userRole === "admin" && (
            <>
              <Button size="sm" variant="destructive" className="flex-1">
                Emergency Stop
              </Button>
              <Button size="sm" variant="outline">
                Backup Now
              </Button>
            </>
          )}
          <Button size="sm" variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
