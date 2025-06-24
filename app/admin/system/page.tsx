"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Server,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Zap,
  Shield,
  Settings,
} from "lucide-react"

interface SystemMetric {
  name: string
  value: string
  status: "good" | "warning" | "critical"
  trend: "up" | "down" | "stable"
  icon: React.ReactNode
}

interface ServerInfo {
  id: string
  name: string
  status: "online" | "offline" | "maintenance"
  cpu: number
  memory: number
  disk: number
  uptime: string
  location: string
}

export default function SystemMonitoring() {
  const [metrics] = useState<SystemMetric[]>([
    {
      name: "CPU Usage",
      value: "23%",
      status: "good",
      trend: "stable",
      icon: <Cpu className="h-4 w-4" />,
    },
    {
      name: "Memory Usage",
      value: "67%",
      status: "warning",
      trend: "up",
      icon: <Server className="h-4 w-4" />,
    },
    {
      name: "Disk Space",
      value: "45%",
      status: "good",
      trend: "stable",
      icon: <HardDrive className="h-4 w-4" />,
    },
    {
      name: "Network I/O",
      value: "1.2 GB/s",
      status: "good",
      trend: "up",
      icon: <Wifi className="h-4 w-4" />,
    },
    {
      name: "Database Connections",
      value: "847/1000",
      status: "good",
      trend: "stable",
      icon: <Database className="h-4 w-4" />,
    },
    {
      name: "Active Sessions",
      value: "2,341",
      status: "good",
      trend: "up",
      icon: <Activity className="h-4 w-4" />,
    },
  ])

  const [servers] = useState<ServerInfo[]>([
    {
      id: "srv-001",
      name: "Web Server 01",
      status: "online",
      cpu: 23,
      memory: 67,
      disk: 45,
      uptime: "45 days",
      location: "US-East",
    },
    {
      id: "srv-002",
      name: "Database Primary",
      status: "online",
      cpu: 45,
      memory: 78,
      disk: 62,
      uptime: "45 days",
      location: "US-East",
    },
    {
      id: "srv-003",
      name: "API Gateway",
      status: "online",
      cpu: 12,
      memory: 34,
      disk: 28,
      uptime: "45 days",
      location: "EU-West",
    },
    {
      id: "srv-004",
      name: "Holographic Engine",
      status: "maintenance",
      cpu: 0,
      memory: 0,
      disk: 89,
      uptime: "0 days",
      location: "US-West",
    },
  ])

  const getMetricStatusColor = (status: SystemMetric["status"]) => {
    switch (status) {
      case "good":
        return "text-green-500"
      case "warning":
        return "text-yellow-500"
      case "critical":
        return "text-red-500"
    }
  }

  const getServerStatusIcon = (status: ServerInfo["status"]) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "offline":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "maintenance":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    }
  }

  const getServerStatusBadge = (status: ServerInfo["status"]) => {
    switch (status) {
      case "online":
        return (
          <Badge variant="default" className="bg-green-500">
            Online
          </Badge>
        )
      case "offline":
        return <Badge variant="destructive">Offline</Badge>
      case "maintenance":
        return (
          <Badge variant="secondary" className="bg-yellow-500">
            Maintenance
          </Badge>
        )
    }
  }

  const getUsageColor = (usage: number) => {
    if (usage < 50) return "bg-green-500"
    if (usage < 80) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            System Monitoring
          </h1>
          <p className="text-muted-foreground mt-2">Real-time system performance and health monitoring</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              <div className={getMetricStatusColor(metric.status)}>{metric.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  variant={
                    metric.status === "good" ? "default" : metric.status === "warning" ? "secondary" : "destructive"
                  }
                  className={
                    metric.status === "good" ? "bg-green-500" : metric.status === "warning" ? "bg-yellow-500" : ""
                  }
                >
                  {metric.status}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {metric.trend === "up" ? "↗" : metric.trend === "down" ? "↘" : "→"} {metric.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Server Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Server Infrastructure
          </CardTitle>
          <CardDescription>Individual server performance and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {servers.map((server) => (
              <div key={server.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getServerStatusIcon(server.status)}
                    <div>
                      <h4 className="font-medium">{server.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {server.location} • Uptime: {server.uptime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getServerStatusBadge(server.status)}
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {server.status !== "maintenance" && (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CPU</span>
                        <span>{server.cpu}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getUsageColor(server.cpu)}`}
                          style={{ width: `${server.cpu}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Memory</span>
                        <span>{server.memory}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getUsageColor(server.memory)}`}
                          style={{ width: `${server.memory}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Disk</span>
                        <span>{server.disk}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getUsageColor(server.disk)}`}
                          style={{ width: `${server.disk}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              System Actions
            </CardTitle>
            <CardDescription>Common system maintenance tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Database className="h-4 w-4 mr-2" />
              Backup All Databases
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <RefreshCw className="h-4 w-4 mr-2" />
              Restart All Services
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Run Security Scan
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Activity className="h-4 w-4 mr-2" />
              Performance Optimization
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              System Alerts
            </CardTitle>
            <CardDescription>Recent system warnings and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">High Memory Usage</p>
                <p className="text-xs text-muted-foreground">Database Primary server at 78% memory usage</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Backup Completed</p>
                <p className="text-xs text-muted-foreground">Daily backup completed successfully at 02:00 AM</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Security Scan Clean</p>
                <p className="text-xs text-muted-foreground">No vulnerabilities detected in latest scan</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
