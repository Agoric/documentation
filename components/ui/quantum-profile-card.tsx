"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { User, ChevronUp, Settings, Bell, Wifi, Battery, Shield, Crown, Zap, Check, RefreshCw } from "lucide-react"

interface UserInfo {
  name: string
  email: string
  role: "admin" | "moderator" | "user"
  joinDate: string
  lastActive: string
}

interface OverallProgress {
  progress: number
  status: string
  onTrack: number
  atRisk: number
  behind: number
  total: number
}

interface QuantumProfileCardProps {
  userInfo: UserInfo
  overallProgress: OverallProgress
}

export function QuantumProfileCard({ userInfo, overallProgress }: QuantumProfileCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState(new Date())

  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Get role color and icon
  const getRoleInfo = (role: string) => {
    switch (role) {
      case "admin":
        return {
          color: "text-red-500 bg-red-500/20",
          icon: Crown,
          label: "Administrator",
        }
      case "moderator":
        return {
          color: "text-yellow-500 bg-yellow-500/20",
          icon: Shield,
          label: "Moderator",
        }
      default:
        return {
          color: "text-blue-500 bg-blue-500/20",
          icon: User,
          label: "User",
        }
    }
  }

  // Get progress bar color based on status
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

  const roleInfo = getRoleInfo(userInfo.role)
  const progressBarColor = getProgressBarColor(overallProgress.status)

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
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              {/* Quantum Online Indicator */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse border-2 border-background" />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <roleInfo.icon className={`h-6 w-6 ${roleInfo.color.split(" ")[0]}`} />
                    </div>
                    {/* Quantum Online Indicator */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-pulse border-2 border-background flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{userInfo.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-xs ${roleInfo.color}`}>
                        {roleInfo.label}
                      </Badge>
                      <Badge variant="outline" className="text-xs text-emerald-500 bg-emerald-500/20 animate-pulse">
                        <Zap className="h-3 w-3 mr-1" />
                        Quantum: Online
                      </Badge>
                    </div>
                  </div>
                </div>
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              </div>

              {/* User Information */}
              <div className="space-y-3 p-3 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium truncate">{userInfo.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Member Since</p>
                    <p className="font-medium">{new Date(userInfo.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Active</p>
                    <p className="font-medium text-emerald-500">{userInfo.lastActive}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Current Time</p>
                    <p className="font-medium">{currentTime.toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>

              {/* System Status */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">System Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wifi className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm">Connection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={95} className="w-16 h-2" />
                      <span className="text-xs text-emerald-500">95%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Battery className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Power Level</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={87} className="w-16 h-2" />
                      <span className="text-xs text-blue-500">87%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Progress */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Financial Goals Progress</span>
                  <span className="font-medium">{overallProgress.progress.toFixed(1)}%</span>
                </div>

                <div className="relative">
                  <Progress value={overallProgress.progress} className="h-3 bg-white/10" />
                  <div
                    className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${progressBarColor}`}
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

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Recalculate
                </Button>
                <Button size="sm" className="flex-1">
                  <Check className="h-3 w-3 mr-1" />
                  Accept
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
