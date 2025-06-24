"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Sparkles, Settings } from "lucide-react"

export default function AIConciergeSettings() {
  const [personalizedInsights, setPersonalizedInsights] = useState(true)
  const [proactiveAlerts, setProactiveAlerts] = useState(true)
  const [voiceControl, setVoiceControl] = useState(false)
  const [dataAccess, setDataAccess] = useState(true)
  const [creativityLevel, setCreativityLevel] = useState([70])
  const [precisionLevel, setPrecisionLevel] = useState([80])

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Concierge Settings</h1>
          <p className="text-muted-foreground">Configure your AI assistant preferences and behavior</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
          <Sparkles className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic AI Concierge functionality</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="personalized-insights">Personalized Insights</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow AI to analyze your activity and provide personalized recommendations
                  </p>
                </div>
                <Switch
                  id="personalized-insights"
                  checked={personalizedInsights}
                  onCheckedChange={setPersonalizedInsights}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="voice-control">Voice Control</Label>
                  <p className="text-sm text-muted-foreground">Enable voice commands for hands-free operation</p>
                </div>
                <Switch id="voice-control" checked={voiceControl} onCheckedChange={setVoiceControl} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="data-access">Data Access</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow AI to access your dashboard data for better assistance
                  </p>
                </div>
                <Switch id="data-access" checked={dataAccess} onCheckedChange={setDataAccess} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Behavior</CardTitle>
              <CardDescription>Adjust how your AI Concierge thinks and responds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="creativity">Creativity Level</Label>
                    <span className="text-sm text-muted-foreground">{creativityLevel}%</span>
                  </div>
                  <Slider
                    id="creativity"
                    value={creativityLevel}
                    onValueChange={setCreativityLevel}
                    max={100}
                    step={1}
                  />
                  <p className="text-sm text-muted-foreground">Higher values produce more creative, varied responses</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="precision">Precision Level</Label>
                    <span className="text-sm text-muted-foreground">{precisionLevel}%</span>
                  </div>
                  <Slider id="precision" value={precisionLevel} onValueChange={setPrecisionLevel} max={100} step={1} />
                  <p className="text-sm text-muted-foreground">
                    Higher values produce more accurate, factual responses
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure when and how your AI Concierge alerts you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="proactive-alerts">Proactive Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow AI to send notifications about important events and opportunities
                  </p>
                </div>
                <Switch id="proactive-alerts" checked={proactiveAlerts} onCheckedChange={setProactiveAlerts} />
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-medium">Alert Types</h3>
                <div className="grid gap-3">
                  {["Market opportunities", "Risk alerts", "Performance insights", "System notifications"].map(
                    (item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Switch id={`alert-${item}`} defaultChecked />
                        <Label htmlFor={`alert-${item}`}>{item}</Label>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure technical aspects of your AI Concierge</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="model">AI Model</Label>
                    <select
                      id="model"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1.5"
                    >
                      <option value="gpt-4">GPT-4 (Recommended)</option>
                      <option value="gpt-3.5">GPT-3.5 (Faster)</option>
                      <option value="custom">Custom Model</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="language">Primary Language</Label>
                    <select
                      id="language"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1.5"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="zh">Chinese</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Reset to Default Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
