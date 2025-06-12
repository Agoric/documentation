"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, CheckCircle2, ChevronRight, Plus, RefreshCw, Settings } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample platform data
const platformData = [
  {
    id: 1,
    name: "Amazon",
    logo: "/amazon-logo.png",
    status: "connected",
    lastSync: "10 minutes ago",
    products: 145,
    health: 98,
    apiStatus: "healthy",
  },
  {
    id: 2,
    name: "eBay",
    logo: "/ebay-logo-display.png",
    status: "connected",
    lastSync: "25 minutes ago",
    products: 132,
    health: 95,
    apiStatus: "healthy",
  },
  {
    id: 3,
    name: "Shopify",
    logo: "/placeholder.svg?height=40&width=40&query=shopify%20logo",
    status: "connected",
    lastSync: "15 minutes ago",
    products: 148,
    health: 100,
    apiStatus: "healthy",
  },
  {
    id: 4,
    name: "Etsy",
    logo: "/placeholder.svg?height=40&width=40&query=etsy%20logo",
    status: "disconnected",
    lastSync: "Never",
    products: 0,
    health: 0,
    apiStatus: "inactive",
  },
  {
    id: 5,
    name: "Walmart",
    logo: "/walmart-logo.png",
    status: "connected",
    lastSync: "35 minutes ago",
    products: 98,
    health: 92,
    apiStatus: "warning",
    warning: "API rate limit approaching",
  },
  {
    id: 6,
    name: "Own Website",
    logo: "/generic-website-icon.png",
    status: "connected",
    lastSync: "5 minutes ago",
    products: 248,
    health: 100,
    apiStatus: "healthy",
  },
]

// Sample sync history
const syncHistory = [
  {
    id: 1,
    platform: "Amazon",
    timestamp: "2023-05-18T14:32:00Z",
    status: "success",
    duration: "45 seconds",
    changes: 12,
  },
  {
    id: 2,
    platform: "eBay",
    timestamp: "2023-05-18T14:15:00Z",
    status: "success",
    duration: "38 seconds",
    changes: 5,
  },
  {
    id: 3,
    platform: "Shopify",
    timestamp: "2023-05-18T14:25:00Z",
    status: "success",
    duration: "32 seconds",
    changes: 8,
  },
  {
    id: 4,
    platform: "Walmart",
    timestamp: "2023-05-18T14:05:00Z",
    status: "warning",
    duration: "65 seconds",
    changes: 6,
    issue: "Slow API response",
  },
  {
    id: 5,
    platform: "Own Website",
    timestamp: "2023-05-18T14:35:00Z",
    status: "success",
    duration: "28 seconds",
    changes: 15,
  },
]

export function PlatformIntegrations() {
  const [activeTab, setActiveTab] = useState("platforms")
  const [syncingPlatform, setSyncingPlatform] = useState<number | null>(null)

  const handleSync = (platformId: number) => {
    setSyncingPlatform(platformId)
    // Simulate sync delay
    setTimeout(() => {
      setSyncingPlatform(null)
    }, 2000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="sync">Sync History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-4">
          <div className="flex justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Connected Platforms</h3>
              <p className="text-sm text-muted-foreground">Manage your sales channels and marketplace integrations</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Platform
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {platformData.map((platform) => (
              <Card key={platform.id} className={platform.status === "disconnected" ? "opacity-70" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={platform.logo || "/placeholder.svg"}
                        alt={`${platform.name} logo`}
                        className="h-10 w-10 rounded-md object-contain"
                      />
                      <div>
                        <CardTitle>{platform.name}</CardTitle>
                        <CardDescription>
                          {platform.status === "connected" ? <>Last sync: {platform.lastSync}</> : <>Not connected</>}
                        </CardDescription>
                      </div>
                    </div>
                    <Switch
                      checked={platform.status === "connected"}
                      disabled={syncingPlatform === platform.id}
                      aria-label={`Toggle ${platform.name} connection`}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  {platform.status === "connected" ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold">{platform.products}</div>
                          <div className="text-xs text-muted-foreground">Products</div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center">
                            {platform.apiStatus === "healthy" ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            ) : platform.apiStatus === "warning" ? (
                              <AlertCircle className="h-5 w-5 text-amber-500" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">API Status</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{platform.health}%</div>
                          <div className="text-xs text-muted-foreground">Health</div>
                        </div>
                      </div>

                      {platform.warning && (
                        <div className="rounded-md bg-amber-50 p-2 text-sm text-amber-700 dark:bg-amber-900 dark:text-amber-200">
                          <AlertCircle className="mr-1 inline-block h-4 w-4" />
                          {platform.warning}
                        </div>
                      )}

                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">
                          <Settings className="mr-2 h-3 w-3" />
                          Settings
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleSync(platform.id)}
                          disabled={syncingPlatform === platform.id}
                        >
                          <RefreshCw
                            className={`mr-2 h-3 w-3 ${syncingPlatform === platform.id ? "animate-spin" : ""}`}
                          />
                          {syncingPlatform === platform.id ? "Syncing..." : "Sync Now"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <Button>Connect {platform.name}</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sync" className="space-y-4">
          <div className="flex justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Sync History</h3>
              <p className="text-sm text-muted-foreground">Recent platform synchronization activity</p>
            </div>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync All Platforms
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 p-4 font-medium text-sm">
                  <div className="col-span-3">Platform</div>
                  <div className="col-span-3">Timestamp</div>
                  <div className="col-span-2 text-center">Status</div>
                  <div className="col-span-2 text-center">Duration</div>
                  <div className="col-span-1 text-center">Changes</div>
                  <div className="col-span-1 text-center">Details</div>
                </div>
                <div className="divide-y">
                  {syncHistory.map((sync) => (
                    <div key={sync.id} className="grid grid-cols-12 gap-2 p-4 items-center">
                      <div className="col-span-3 font-medium">{sync.platform}</div>
                      <div className="col-span-3 text-sm">{formatDate(sync.timestamp)}</div>
                      <div className="col-span-2 flex justify-center">
                        {sync.status === "success" ? (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Success
                          </Badge>
                        ) : sync.status === "warning" ? (
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Warning
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Failed
                          </Badge>
                        )}
                      </div>
                      <div className="col-span-2 text-center">{sync.duration}</div>
                      <div className="col-span-1 text-center">{sync.changes}</div>
                      <div className="col-span-1 flex justify-center">
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Integration Settings</CardTitle>
              <CardDescription>Configure global settings for all platform integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-Sync Frequency</h4>
                    <p className="text-sm text-muted-foreground">How often to automatically sync with platforms</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-100">
                      15 min
                    </Button>
                    <Button variant="outline">30 min</Button>
                    <Button variant="outline">1 hour</Button>
                    <Button variant="outline">4 hours</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-Apply Inventory Changes</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatically apply inventory changes across platforms
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Sync Product Images</h4>
                    <p className="text-sm text-muted-foreground">Include product images in platform synchronization</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Sync Product Descriptions</h4>
                    <p className="text-sm text-muted-foreground">
                      Include product descriptions in platform synchronization
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Sync Pricing</h4>
                    <p className="text-sm text-muted-foreground">Include product pricing in platform synchronization</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive email notifications for sync issues</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="pt-4">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
