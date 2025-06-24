"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function ForecastSettings() {
  const [activeTab, setActiveTab] = useState('general')
  const [isTraining, setIsTraining] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate save delay
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1500)
  }

  const handleTrainModel = () => {
    setIsTraining(true)
    // Simulate training delay
    setTimeout(() => {
      setIsTraining(false)
    }, 3000)
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="data">Data Sources</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="ai">AI Model</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic forecasting parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="default-forecast-period">Default Forecast Period</Label>
                  <Select defaultValue="30">
                    <SelectTrigger id="default-forecast-period">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="forecast-frequency">Forecast Update Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="forecast-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="confidence-threshold">Confidence Threshold</Label>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Slider
                  id="confidence-threshold"
                  defaultValue={[75]}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Only show recommendations with confidence above this threshold
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="auto-apply" defaultChecked />
                  <Label htmlFor="auto-apply">Auto-apply high confidence recommendations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="include-weather" defaultChecked />
                  <Label htmlFor="include-weather">Include weather data in forecasts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="include-events" defaultChecked />
                  <Label htmlFor="include-events">Include holidays and events</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Fine-tune the forecasting algorithm</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="algorithm">Forecasting Algorithm</Label>
                  <Select defaultValue="ensemble">
                    <SelectTrigger id="algorithm">
                      <SelectValue placeholder="Select algorithm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arima">ARIMA</SelectItem>
                      <SelectItem value="prophet">Prophet</SelectItem>
                      <SelectItem value="lstm">LSTM Neural Network</SelectItem>
                      <SelectItem value="ensemble">Ensemble (Recommended)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seasonality">Seasonality Detection</Label>
                  <Select defaultValue="auto">
                    <SelectTrigger id="seasonality">
                      <SelectValue placeholder="Select detection method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Automatic</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="outlier-sensitivity">Outlier Detection Sensitivity</Label>
                  <span className="text-\
