"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { User, ChevronUp, Zap, Shield, Crown, Settings, Bell, Activity, Wifi, Battery, Clock } from "lucide-react"

interface QuantumProfileCardProps {
  overallProgress?: {
    progress: number
    status: string
    onTrack: number
    atRisk: number
    behind: number
    total: number
  }
  userInfo?: {
    name: string
    email: string
    role: "admin" | "moderator" | "user"
    avatar?: string
    joinDate: string
    lastActive: string
  }
}

export function QuantumProfileCard({
  overallProgress = {
    progress: 67.5,
    status: "on-track",
    onTrack: 3,
    atRisk: 1,
    behind: 1,
    total: 5,
  },
  userInfo = {
    name: "Alexandra Chen",
    email: "alexandra.chen@snappaifi.com",
    role: "admin",
    joinDate: "2023-01-15",
    lastActive: "2 minutes ago",
  },
}: QuantumProfileCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [isOnline] = React.useState(true)
  const [batteryLevel] = React.useState(87)
  const [connectionStrength] = React.useState(95)

  const getProgressBarColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 shadow-emerald-500/50 shadow-lg"
      case "at-risk":
        return "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-yellow-500/50 shadow-lg"
      case "behind":
        return "bg-gradient-to-r from-red-400 via-red-500 to-red-600 shadow-red-500/50 shadow-lg"
      default:
        return "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-blue-500/50 shadow-lg"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4 text-yellow-500" />
      case "moderator":
        return <Shield className="h-4 w-4 text-blue-500" />
      default:
        return <User className="h-4 w-4 text-gray-500" />
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Administrator</Badge>
      case "moderator":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Moderator</Badge>
      default:
        return <Badge variant="secondary">User</Badge>
    }
  }

  return (
    <div
      className="fixed top-4 right-4 z-50 transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <Card
        className={`bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl border-white/20 shadow-2xl transition-all duration-300 ${
          isExpanded ? "w-96 h-auto" : "w-16 h-16"
        }`}
      >
        <CardContent className="p-4">
          {!isExpanded ? (
            <div className="flex items-center justify-center w-8 h-8 relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              {/* Online Status Indicator */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-background flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Header with User Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    {/* Online Status */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-background flex items-center justify-center">
                      <Zap className="h-2.5 w-2.5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{userInfo.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-sm text-emerald-400 font-medium">Quantum: Online</span>
                      </div>
                      {getRoleIcon(userInfo.role)}
                    </div>
                  </div>
                </div>
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              </div>

              {/* User Details */}
              <div className="space-y-3 p-3 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Role</span>
                  {getRoleBadge(userInfo.role)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="text-sm font-medium truncate max-w-48">{userInfo.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Last Active</span>
                  <span className="text-sm font-medium text-emerald-400">{userInfo.lastActive}</span>
                </div>
              </div>

              {/* System Status */}
              <div className="space-y-3 p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                <h4 className="font-medium text-sm flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  System Status
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wifi className="h-3 w-3 text-emerald-400" />
                      <span className="text-xs">Connection</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-400 transition-all duration-300"
                          style={{ width: `${connectionStrength}%` }}
                        />
                      </div>
                      <span className="text-xs text-emerald-400">{connectionStrength}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Battery className="h-3 w-3 text-blue-400" />
                      <span className="text-xs">Power</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-400 transition-all duration-300"
                          style={{ width: `${batteryLevel}%` }}
                        />
                      </div>
                      <span className="text-xs text-blue-400">{batteryLevel}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Progress */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Financial Progress</span>
                  <span className="font-medium">{overallProgress.progress.toFixed(1)}%</span>
                </div>

                <div className="relative">
                  <Progress value={overallProgress.progress} className="h-3 bg-white/10" />
                  <div
                    className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressBarColor(overallProgress.status)}`}
                    style={{ width: `${overallProgress.progress}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="font-medium text-emerald-500">{overallProgress.onTrack}</div>
                    <div className="text-muted-foreground">On Track</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-yellow-500">{overallProgress.atRisk}</div>
                    <div className="text-muted-foreground">At Risk</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-red-500">{overallProgress.behind}</div>
                    <div className="text-muted-foreground">Behind</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 pt-2 border-t border-white/10">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Settings className="h-3 w-3 mr-1" />
                  Settings
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Bell className="h-3 w-3 mr-1" />
                  Alerts
                </Button>
              </div>

              {/* Session Info */}
              <div className="text-xs text-muted-foreground text-center pt-2 border-t border-white/10">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Session: {new Date().toLocaleTimeString()}</span>
                </div>
                <div className="mt-1">Member since {new Date(userInfo.joinDate).toLocaleDateString()}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
