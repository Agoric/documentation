"use client"

import { APIPlayground } from "@/components/demo/api-playground"
import { WebhookSimulator } from "@/components/demo/webhook-simulator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Code, Webhook, Database, Shield, Zap, Activity } from "lucide-react"

export default function BankingAPIPlaygroundPage() {
  const handleAPIExecute = async (endpoint: string, method: string, body?: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    // Return mock response based on endpoint
    return {
      success: true,
      data: {
        message: `Mock response for ${method} ${endpoint}`,
        endpoint,
        method,
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
      requestId: `req_playground_${Date.now()}`,
      version: "1.0.0",
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
            <Code className="w-4 h-4" />
            Interactive Playground
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Banking API Playground
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test API endpoints, simulate webhooks, and explore the full capabilities of the Snapifi Banking API in a
            safe sandbox environment.
          </p>
        </div>

        {/* Features Overview */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-5 h-5" />
                <h3 className="font-semibold">API Testing</h3>
              </div>
              <p className="text-sm opacity-90">Test all banking endpoints with real request/response examples</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Webhook className="w-5 h-5" />
                <h3 className="font-semibold">Webhook Simulation</h3>
              </div>
              <p className="text-sm opacity-90">Simulate real-time webhook events and test your integrations</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5" />
                <h3 className="font-semibold">Secure Sandbox</h3>
              </div>
              <p className="text-sm opacity-90">Safe testing environment with no impact on production data</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Playground */}
        <Tabs defaultValue="api-testing" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="api-testing" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              API Testing
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="flex items-center gap-2">
              <Webhook className="w-4 h-4" />
              Webhook Simulator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="api-testing" className="space-y-6">
            <APIPlayground onExecute={handleAPIExecute} />
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-6">
            <WebhookSimulator />
          </TabsContent>
        </Tabs>

        {/* API Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              API Status & Performance
            </CardTitle>
            <CardDescription>Real-time status of Snapifi Banking API services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">API Gateway</span>
                <Badge className="bg-green-100 text-green-800">Operational</Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Account Services</span>
                <Badge className="bg-green-100 text-green-800">Operational</Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Transaction Processing</span>
                <Badge className="bg-green-100 text-green-800">Operational</Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Webhook Delivery</span>
                <Badge className="bg-green-100 text-green-800">Operational</Badge>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Average Response Time:</span>
                  <span className="ml-2 font-semibold">245ms</span>
                </div>
                <div>
                  <span className="text-gray-600">Uptime (30 days):</span>
                  <span className="ml-2 font-semibold">99.97%</span>
                </div>
                <div>
                  <span className="text-gray-600">Rate Limit:</span>
                  <span className="ml-2 font-semibold">100 req/min</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Need Help Getting Started?</h3>
            <p className="text-gray-600 mb-4">
              Explore our comprehensive documentation and guides to integrate with the Banking API.
            </p>
            <div className="flex justify-center gap-4">
              <Badge variant="outline" className="px-3 py-1">
                <Zap className="w-3 h-3 mr-1" />
                Quick Start Guide
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Code className="w-3 h-3 mr-1" />
                API Reference
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Shield className="w-3 h-3 mr-1" />
                Security Guide
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
