"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Settings,
  Database,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Shield,
  BarChart3,
  FileText,
  Zap,
} from "lucide-react"

interface SystemStatus {
  service: string
  status: "online" | "offline" | "warning"
  uptime: string
  lastCheck: string
}

interface UserActivity {
  id: string
  user: string
  action: string
  timestamp: string
  status: "success" | "failed" | "pending"
}

export default function AdminDashboard() {
  const [systemStatus] = useState<SystemStatus[]>([
    { service: "Authentication Service", status: "online", uptime: "99.9%", lastCheck: "2 min ago" },
    { service: "Database Cluster", status: "online", uptime: "99.8%", lastCheck: "1 min ago" },
    { service: "Payment Gateway", status: "warning", uptime: "98.5%", lastCheck: "5 min ago" },
    { service: "Holographic Engine", status: "online", uptime: "99.7%", lastCheck: "3 min ago" },
    { service: "AI Processing", status: "online", uptime: "99.2%", lastCheck: "1 min ago" },
    { service: "Diplomatic Agent System", status: "online", uptime: "100%", lastCheck: "30 sec ago" },
  ])

  const [recentActivity] = useState<UserActivity[]>([
    {
      id: "1",
      user: "admin@snapifi.com",
      action: "System backup completed",
      timestamp: "5 min ago",
      status: "success",
    },
    {
      id: "2",
      user: "alexandra.chen@snappcreditcom.realm",
      action: "Diplomatic mission updated",
      timestamp: "12 min ago",
      status: "success",
    },
    { id: "3", user: "system", action: "Database optimization", timestamp: "1 hour ago", status: "success" },
    {
      id: "4",
      user: "marcus.rodriguez@snappcreditcom.realm",
      action: "Failed login attempt",
      timestamp: "2 hours ago",
      status: "failed",
    },
    { id: "5", user: "system", action: "Security scan initiated", timestamp: "3 hours ago", status: "pending" },
  ])

  const getStatusIcon = (status: SystemStatus["status"]) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "offline":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: SystemStatus["status"]) => {
    switch (status) {
      case "online":
        return (
          <Badge variant="default" className="bg-green-500">
            Online
          </Badge>
        )
      case "offline":
        return <Badge variant="destructive">Offline</Badge>
      case "warning":
        return (
          <Badge variant="secondary" className="bg-yellow-500">
            Warning
          </Badge>
        )
    }
  }

  const getActivityIcon = (status: UserActivity["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "pending":
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Snapifi Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">System maintenance and monitoring interface</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">Diplomatic agents online</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.4M</div>
            <p className="text-xs text-muted-foreground">+12.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            System Status
          </CardTitle>
          <CardDescription>Real-time monitoring of all system services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemStatus.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(service.status)}
                  <div>
                    <h4 className="font-medium">{service.service}</h4>
                    <p className="text-sm text-muted-foreground">Last check: {service.lastCheck}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">Uptime: {service.uptime}</p>
                  </div>
                  {getStatusBadge(service.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest system and user activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  {getActivityIcon(activity.status)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.user} • {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common maintenance tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex-col">
                <Database className="h-6 w-6 mb-2" />
                Backup Database
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <RefreshCw className="h-6 w-6 mb-2" />
                Restart Services
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Shield className="h-6 w-6 mb-2" />
                Security Scan
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <FileText className="h-6 w-6 mb-2" />
                Generate Report
              </Button>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex gap-2">
                <Input placeholder="Search users, logs, or services..." className="flex-1" />
                <Button size="sm">Search</Button>
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auth">Authentication</SelectItem>
                    <SelectItem value="db">Database</SelectItem>
                    <SelectItem value="payment">Payment Gateway</SelectItem>
                    <SelectItem value="holo">Holographic Engine</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" variant="outline">
                  Manage
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Logs Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            System Logs
          </CardTitle>
          <CardDescription>Recent system events and error logs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm space-y-1 max-h-64 overflow-y-auto">
            <div>[2024-01-22 14:30:15] INFO: Authentication service started successfully</div>
            <div>[2024-01-22 14:30:16] INFO: Database connection established</div>
            <div>[2024-01-22 14:30:17] INFO: Holographic engine initialized</div>
            <div>[2024-01-22 14:30:18] INFO: Payment gateway connected</div>
            <div>[2024-01-22 14:30:19] INFO: Diplomatic agent system online</div>
            <div>[2024-01-22 14:30:20] INFO: All systems operational</div>
            <div>[2024-01-22 14:31:45] WARN: High memory usage detected on server-02</div>
            <div>[2024-01-22 14:32:10] INFO: Memory usage normalized</div>
            <div>[2024-01-22 14:33:22] INFO: Backup process initiated</div>
            <div>[2024-01-22 14:35:45] INFO: Backup completed successfully</div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-muted-foreground">Showing last 10 entries</p>
            <Button variant="outline" size="sm">
              View Full Logs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
