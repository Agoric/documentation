"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BarChart3, Filter, Globe, Plus, RefreshCw, Search, Sparkles } from "lucide-react"
import { HolographicHeader } from "./holographic-header"
import { HolographicSidebar } from "./holographic-sidebar"

export function PlatformDirectory() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("platforms")

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <HolographicSidebar />

      {/* Main content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Header */}
          <HolographicHeader title="Platform Directory" subtitle="Unified management across all integrated platforms" />

          {/* Action buttons */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <div className="relative w-[250px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-indigo-300/70" />
                <Input
                  placeholder="Search platforms..."
                  className="border-indigo-500/20 bg-indigo-950/30 pl-8 text-indigo-200 placeholder:text-indigo-300/50 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200 disabled:bg-indigo-950/10 disabled:text-indigo-300/50"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                {isRefreshing ? "Refreshing..." : "Refresh Directory"}
              </Button>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Platform
              </Button>
            </div>
          </div>

          {/* Platform stats */}
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { title: "Active Platforms", value: "6", subtitle: "2 pending integration" },
              { title: "Total Products", value: "248", subtitle: "↑ 12 from last month" },
              { title: "Cross-Platform Sales", value: "$2.4M", subtitle: "↑ 8.3% from last quarter" },
              { title: "Quantum Advantage", value: "157x", subtitle: "Processing efficiency boost" },
            ].map((stat, index) => (
              <Card key={index} className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-indigo-200">{stat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <p className="text-xs text-indigo-300/70">{stat.subtitle}</p>
                </CardContent>
                {/* Holographic accent */}
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3 border border-indigo-500/20 bg-indigo-950/30 p-1">
              <TabsTrigger
                value="platforms"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
              >
                <Globe className="mr-2 h-4 w-4" />
                Platforms
              </TabsTrigger>
              <TabsTrigger
                value="integration"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Integration
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="platforms" className="space-y-4">
              {/* Platform cards */}
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    name: "Amazon",
                    logo: "/amazon-logo.png",
                    color: "from-blue-600/20 to-teal-500/20",
                    borderColor: "border-blue-500/30",
                    products: 142,
                    status: "Active",
                    statusColor: "bg-emerald-400",
                  },
                  {
                    name: "eBay",
                    logo: "/ebay-logo-display.png",
                    color: "from-indigo-600/20 to-purple-500/20",
                    borderColor: "border-indigo-500/30",
                    products: 98,
                    status: "Active",
                    statusColor: "bg-emerald-400",
                  },
                  {
                    name: "Walmart",
                    logo: "/walmart-logo.png",
                    color: "from-blue-600/20 to-sky-500/20",
                    borderColor: "border-blue-500/30",
                    products: 76,
                    status: "Active",
                    statusColor: "bg-emerald-400",
                  },
                  {
                    name: "Shopify",
                    logo: "/generic-website-icon.png",
                    color: "from-emerald-600/20 to-green-500/20",
                    borderColor: "border-emerald-500/30",
                    products: 248,
                    status: "Active",
                    statusColor: "bg-emerald-400",
                  },
                  {
                    name: "Etsy",
                    logo: "/generic-website-icon.png",
                    color: "from-amber-600/20 to-orange-500/20",
                    borderColor: "border-amber-500/30",
                    products: 0,
                    status: "Pending",
                    statusColor: "bg-amber-400",
                  },
                  {
                    name: "Your Website",
                    logo: "/generic-website-icon.png",
                    color: "from-violet-600/20 to-fuchsia-500/20",
                    borderColor: "border-violet-500/30",
                    products: 248,
                    status: "Active",
                    statusColor: "bg-emerald-400",
                  },
                ].map((platform, index) => (
                  <Card
                    key={index}
                    className={`relative overflow-hidden border ${platform.borderColor} bg-gradient-to-br ${platform.color} backdrop-blur-sm`}
                  >
                    {/* Holographic effects */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />

                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/10 p-1">
                            <img
                              src={platform.logo || "/placeholder.svg"}
                              alt={platform.name}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white">{platform.name}</h3>
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full ${platform.statusColor}`} />
                              <span className="text-xs text-indigo-200">{platform.status}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-white/10 text-white">
                          <Sparkles className="mr-1 h-3 w-3" />
                          Quantum
                        </Badge>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <div className="text-sm text-indigo-200">Products</div>
                          <div className="text-2xl font-bold text-white">{platform.products}</div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                        >
                          Manage
                        </Button>
                      </div>

                      {/* Holographic accent */}
                      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="integration" className="space-y-4">
              <Card className="border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-indigo-200">Integration Settings</CardTitle>
                  <CardDescription className="text-indigo-300/70">
                    Configure cross-platform integration settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md bg-indigo-900/20 p-4 text-indigo-200">
                    Integration settings content would go here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <Card className="border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-indigo-200">Platform Analytics</CardTitle>
                  <CardDescription className="text-indigo-300/70">Cross-platform performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md bg-indigo-900/20 p-4 text-indigo-200">Analytics content would go here</div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
