"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Download,
  FileText,
  Filter,
  Globe,
  Grid3X3,
  Package,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCatalog } from "@/components/ecommerex/product-catalog"
import { InventoryBalancing } from "@/components/ecommerex/inventory-balancing"
import { FinancialAnalytics } from "@/components/ecommerex/financial-analytics"
import { TaxPreparation } from "@/components/ecommerex/tax-preparation"
import { PlatformIntegrations } from "@/components/ecommerex/platform-integrations"
import { PlatformBranding } from "@/components/ecommerex/platform-branding"
import { QuantumInsightsPanel } from "@/components/ecommerex/quantum-insights-panel"
import { MoodAdaptiveAssistant } from "@/components/ecommerex/mood-adaptive-assistant"
import { HolographicHeader } from "@/components/ecommerex/holographic-header"

export default function FlagshipHubDashboard() {
  const [activeTab, setActiveTab] = useState("catalog")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="active">Active Products</SelectItem>
              <SelectItem value="draft">Draft Products</SelectItem>
              <SelectItem value="archived">Archived Products</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh Data"}
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Holographic Header */}
      <HolographicHeader />

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 font-medium">↑ 12</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Platforms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Amazon, eBay, Shopify, Etsy, Walmart, Own Website</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,248,350</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 font-medium">↑ 8.3%</span> from last quarter
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tax Liability (Est.)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$86,420</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-rose-500 font-medium">↑ 5.2%</span> from last year
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Platform Branding Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <PlatformBranding platform="Amazon" />
        <PlatformBranding platform="eBay" />
        <PlatformBranding platform="Shopify" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 md:w-auto">
          <TabsTrigger value="catalog">
            <Grid3X3 className="mr-2 h-4 w-4" />
            Catalog
          </TabsTrigger>
          <TabsTrigger value="inventory">
            <Package className="mr-2 h-4 w-4" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="platforms">
            <Globe className="mr-2 h-4 w-4" />
            Platforms
          </TabsTrigger>
          <TabsTrigger value="financials">
            <BarChart3 className="mr-2 h-4 w-4" />
            Financials
          </TabsTrigger>
          <TabsTrigger value="tax">
            <FileText className="mr-2 h-4 w-4" />
            Tax Prep
          </TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Product Catalog</CardTitle>
                      <CardDescription>Manage your products across all platforms</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative w-[250px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search products..." className="pl-8" />
                      </div>
                      <Button variant="outline" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ProductCatalog />
                </CardContent>
              </Card>
            </div>
            <div>
              <QuantumInsightsPanel />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Inventory Balancing</CardTitle>
                      <CardDescription>Optimize inventory across platforms and warehouses</CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      AI-Powered
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <InventoryBalancing />
                </CardContent>
              </Card>
            </div>
            <div>
              <MoodAdaptiveAssistant />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Integrations</CardTitle>
              <CardDescription>Manage your sales channels and platform settings</CardDescription>
            </CardHeader>
            <CardContent>
              <PlatformIntegrations />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Analytics</CardTitle>
              <CardDescription>Bottom line analytics across all platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <FinancialAnalytics />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tax" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Tax Preparation</CardTitle>
                  <CardDescription>Automated tax preparation and reporting</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Reports
                  </Button>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save & File
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <TaxPreparation />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
