"use client"

import * as React from "react"
import { ControlPanelManager } from "@/components/ui/control-panel-manager"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings, User, Shield, Crown, Server } from "lucide-react"

export default function SettingsPage() {
  // In a real app, this would come from authentication context
  const [userRole] = React.useState<"admin" | "moderator" | "user">("admin")
  const [userName] = React.useState("Alexandra Chen")
  const [userEmail] = React.useState("alexandra.chen@snappaifi.com")

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
        return <Badge className="bg-yellow-500">Administrator</Badge>
      case "moderator":
        return <Badge className="bg-blue-500">Moderator</Badge>
      default:
        return <Badge variant="secondary">User</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Settings & Controls
            </h1>
            <p className="text-xl text-muted-foreground mt-2">Manage your preferences and platform settings</p>
          </div>
          <div className="flex items-center gap-4">
            {getRoleIcon(userRole)}
            {getRoleBadge(userRole)}
          </div>
        </div>

        {/* User Info Card */}
        <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Account Information
            </CardTitle>
            <CardDescription>Your current account details and access level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{userName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{userEmail}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Access Level</p>
                <div className="flex items-center gap-2 mt-1">
                  {getRoleIcon(userRole)}
                  <span className="font-medium capitalize">{userRole}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Control Panels */}
        <ControlPanelManager userRole={userRole} />

        {/* Access Level Information */}
        <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Access Level Information
            </CardTitle>
            <CardDescription>What you can control based on your role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  User Controls
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Personal preferences and settings</li>
                  <li>• Financial goals and budgets</li>
                  <li>• Notification preferences</li>
                  <li>• Display and interface options</li>
                  <li>• Security settings</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  Platform Controls
                  {userRole === "user" && (
                    <Badge variant="outline" className="text-xs">
                      View Only
                    </Badge>
                  )}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• System metrics and monitoring</li>
                  <li>• Service status and uptime</li>
                  {userRole !== "user" && (
                    <>
                      <li>• Platform configuration</li>
                      <li>• Maintenance controls</li>
                      <li>• Emergency procedures</li>
                    </>
                  )}
                  {userRole === "user" && <li>• Contact administrator for changes</li>}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
