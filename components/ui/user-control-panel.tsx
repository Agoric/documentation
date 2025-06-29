"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Volume2, Palette, Shield, CreditCard, Target, TrendingUp, Moon, Sun } from "lucide-react"

interface UserControlPanelProps {
  className?: string
}

export function UserControlPanel({ className }: UserControlPanelProps) {
  const [notifications, setNotifications] = React.useState(true)
  const [darkMode, setDarkMode] = React.useState(true)
  const [autoInvest, setAutoInvest] = React.useState(false)
  const [riskTolerance, setRiskTolerance] = React.useState([5])
  const [monthlyBudget, setMonthlyBudget] = React.useState("2500")
  const [goalReminders, setGoalReminders] = React.useState(true)
  const [marketAlerts, setMarketAlerts] = React.useState(true)
  const [biometricAuth, setBiometricAuth] = React.useState(false)
  const [volume, setVolume] = React.useState([75])

  const userPreferences = [
    {
      category: "Display & Interface",
      icon: Palette,
      settings: [
        {
          id: "theme",
          label: "Dark Mode",
          description: "Use dark theme across the platform",
          type: "switch",
          value: darkMode,
          onChange: setDarkMode,
          icon: darkMode ? Moon : Sun,
        },
        {
          id: "volume",
          label: "Sound Volume",
          description: "Adjust notification and UI sounds",
          type: "slider",
          value: volume,
          onChange: setVolume,
          min: 0,
          max: 100,
          icon: Volume2,
        },
      ],
    },
    {
      category: "Financial Settings",
      icon: CreditCard,
      settings: [
        {
          id: "budget",
          label: "Monthly Budget",
          description: "Set your monthly spending limit",
          type: "input",
          value: monthlyBudget,
          onChange: setMonthlyBudget,
          prefix: "$",
          icon: Target,
        },
        {
          id: "risk",
          label: "Risk Tolerance",
          description: "Investment risk level (1-10)",
          type: "slider",
          value: riskTolerance,
          onChange: setRiskTolerance,
          min: 1,
          max: 10,
          icon: TrendingUp,
        },
        {
          id: "autoinvest",
          label: "Auto-Invest",
          description: "Automatically invest spare change",
          type: "switch",
          value: autoInvest,
          onChange: setAutoInvest,
          icon: TrendingUp,
        },
      ],
    },
    {
      category: "Notifications",
      icon: Bell,
      settings: [
        {
          id: "notifications",
          label: "Push Notifications",
          description: "Receive app notifications",
          type: "switch",
          value: notifications,
          onChange: setNotifications,
          icon: Bell,
        },
        {
          id: "goals",
          label: "Goal Reminders",
          description: "Reminders for financial goals",
          type: "switch",
          value: goalReminders,
          onChange: setGoalReminders,
          icon: Target,
        },
        {
          id: "market",
          label: "Market Alerts",
          description: "Important market updates",
          type: "switch",
          value: marketAlerts,
          onChange: setMarketAlerts,
          icon: TrendingUp,
        },
      ],
    },
    {
      category: "Security & Privacy",
      icon: Shield,
      settings: [
        {
          id: "biometric",
          label: "Biometric Login",
          description: "Use fingerprint/face ID",
          type: "switch",
          value: biometricAuth,
          onChange: setBiometricAuth,
          icon: Shield,
        },
      ],
    },
  ]

  const renderSetting = (setting: any) => {
    switch (setting.type) {
      case "switch":
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <setting.icon className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label htmlFor={setting.id} className="text-sm font-medium">
                  {setting.label}
                </Label>
                <p className="text-xs text-muted-foreground">{setting.description}</p>
              </div>
            </div>
            <Switch
              id={setting.id}
              checked={setting.value}
              onCheckedChange={setting.onChange}
              className="data-[state=checked]:bg-emerald-500"
            />
          </div>
        )

      case "slider":
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <setting.icon className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <Label htmlFor={setting.id} className="text-sm font-medium">
                  {setting.label}
                </Label>
                <p className="text-xs text-muted-foreground">{setting.description}</p>
              </div>
              <Badge variant="outline">
                {setting.value[0]}
                {setting.id === "risk" ? "/10" : "%"}
              </Badge>
            </div>
            <Slider
              id={setting.id}
              value={setting.value}
              onValueChange={setting.onChange}
              min={setting.min}
              max={setting.max}
              step={1}
              className="w-full"
            />
          </div>
        )

      case "input":
        return (
          <div className="flex items-center gap-3">
            <setting.icon className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <Label htmlFor={setting.id} className="text-sm font-medium">
                {setting.label}
              </Label>
              <p className="text-xs text-muted-foreground">{setting.description}</p>
            </div>
            <div className="relative">
              {setting.prefix && (
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                  {setting.prefix}
                </span>
              )}
              <Input
                id={setting.id}
                value={setting.value}
                onChange={(e) => setting.onChange(e.target.value)}
                className={`w-24 ${setting.prefix ? "pl-6" : ""}`}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card
      className={`bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20 ${className}`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          User Controls
        </CardTitle>
        <CardDescription>Customize your personal experience and preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {userPreferences.map((category, index) => (
          <div key={category.category} className="space-y-4">
            <div className="flex items-center gap-2">
              <category.icon className="h-4 w-4 text-primary" />
              <h3 className="font-medium text-sm">{category.category}</h3>
            </div>
            <div className="space-y-4 pl-6">
              {category.settings.map((setting) => (
                <div key={setting.id}>{renderSetting(setting)}</div>
              ))}
            </div>
            {index < userPreferences.length - 1 && <Separator />}
          </div>
        ))}

        <Separator />

        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            Save Preferences
          </Button>
          <Button size="sm" variant="outline">
            Reset to Default
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
