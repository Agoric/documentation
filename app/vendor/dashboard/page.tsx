"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  DollarSign,
  Package,
  Users,
  Star,
  ShoppingCart,
  BarChart3,
  Handshake,
  Settings,
  Plus,
  Eye,
  Edit,
  Store,
  Activity,
} from "lucide-react"

export default function VendorDashboardPage() {
  const businessStats = [
    { title: "Monthly Revenue", value: "$45,280", change: "+18.2%", icon: DollarSign, color: "text-green-500" },
    { title: "Active Products", value: "127", change: "+12", icon: Package, color: "text-blue-500" },
    { title: "Total Customers", value: "2,847", change: "+24.1%", icon: Users, color: "text-purple-500" },
    { title: "Avg Rating", value: "4.8", change: "+0.3", icon: Star, color: "text-orange-500" },
  ]

  const recentOrders = [
    { id: "ORD-001", customer: "John Smith", product: "Quantum Earbuds", amount: "$299", status: "shipped" },
    { id: "ORD-002", customer: "Sarah Johnson", product: "Smart Watch X", amount: "$449", status: "processing" },
    { id: "ORD-003", customer: "Mike Davis", product: "Gaming Mouse", amount: "$89", status: "delivered" },
    { id: "ORD-004", customer: "Lisa Wilson", product: "Bluetooth Speaker", amount: "$159", status: "pending" },
    { id: "ORD-005", customer: "Tom Brown", product: "USB-C Hub", amount: "$79", status: "shipped" },
  ]

  const topProducts = [
    { name: "Quantum Earbuds Pro", sales: 245, revenue: "$73,255", rating: 4.9 },
    { name: "Smart Watch X Series", sales: 189, revenue: "$84,861", rating: 4.7 },
    { name: "Gaming Mouse Elite", sales: 156, revenue: "$13,884", rating: 4.8 },
    { name: "Bluetooth Speaker", sales: 134, revenue: "$21,306", rating: 4.6 },
  ]

  const partnerOpportunities = [
    {
      title: "Cross-Platform Integration",
      description: "Integrate with Snapifi's financial services",
      potential: "$25K/month",
      difficulty: "Medium",
    },
    {
      title: "AI-Powered Analytics",
      description: "Access advanced customer analytics tools",
      potential: "$15K/month",
      difficulty: "Easy",
    },
    {
      title: "Premium Marketplace Listing",
      description: "Featured placement in citizen portal",
      potential: "$40K/month",
      difficulty: "Hard",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-emerald-950 to-green-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent flex items-center gap-3">
              <Building2 className="h-10 w-10 text-green-400" />
              Vendor Business Hub
            </h1>
            <p className="text-xl text-green-200 mt-2">Business Partners & Third-Party Services</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
              <Store className="h-3 w-3 mr-1" />
              Verified Partner
            </Badge>
            <Button
              variant="outline"
              className="border-green-500/30 text-green-300 hover:bg-green-500/20 bg-transparent"
            >
              <Settings className="h-4 w-4 mr-2" />
              Business Settings
            </Button>
          </div>
        </div>

        {/* Business Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessStats.map((stat, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 backdrop-blur-sm border-green-500/20"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-200">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-green-900/30 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="partnerships">Partnerships</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 backdrop-blur-sm border-green-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-200">
                    <ShoppingCart className="h-5 w-5" />
                    Recent Orders
                  </CardTitle>
                  <CardDescription className="text-green-300">Latest customer orders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-green-800/30 to-emerald-800/20 border border-green-500/20"
                    >
                      <div>
                        <p className="font-medium text-white">{order.id}</p>
                        <p className="text-sm text-green-200">{order.customer}</p>
                        <p className="text-xs text-green-300">{order.product}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">{order.amount}</p>
                        <Badge
                          variant={
                            order.status === "delivered"
                              ? "default"
                              : order.status === "shipped"
                                ? "secondary"
                                : order.status === "processing"
                                  ? "outline"
                                  : "destructive"
                          }
                          className="text-xs"
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 backdrop-blur-sm border-green-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-200">
                    <Package className="h-5 w-5" />
                    Top Products
                  </CardTitle>
                  <CardDescription className="text-green-300">Best performing products</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-gradient-to-br from-green-800/30 to-emerald-800/20 border border-green-500/20"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white">{product.name}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-green-200">{product.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-200">{product.sales} sales</span>
                        <span className="text-green-400 font-medium">{product.revenue}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-green-200">Product Management</h2>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 backdrop-blur-sm border-green-500/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-green-800/30 to-emerald-800/20 border border-green-500/20"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{product.name}</h4>
                          <p className="text-sm text-green-200">{product.sales} units sold</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-500/30 text-green-300 bg-transparent"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-500/30 text-green-300 bg-transparent"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 backdrop-blur-sm border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-200">
                  <ShoppingCart className="h-5 w-5" />
                  Order Management
                </CardTitle>
                <CardDescription className="text-green-300">Manage customer orders and fulfillment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-green-800/30 to-emerald-800/20 border border-green-500/20"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                        <ShoppingCart className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{order.id}</h4>
                        <p className="text-sm text-green-200">
                          {order.customer} • {order.product}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">{order.amount}</p>
                      <Badge
                        variant={
                          order.status === "delivered"
                            ? "default"
                            : order.status === "shipped"
                              ? "secondary"
                              : order.status === "processing"
                                ? "outline"
                                : "destructive"
                        }
                        className="text-xs"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 backdrop-blur-sm border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-200">
                  <BarChart3 className="h-5 w-5" />
                  Business Analytics
                </CardTitle>
                <CardDescription className="text-green-300">Performance insights and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center bg-gradient-to-br from-green-800/20 to-emerald-800/10 rounded-lg">
                  <div className="text-center">
                    <Activity className="h-16 w-16 mx-auto mb-4 text-green-400" />
                    <p className="text-green-200 text-lg">Analytics Dashboard</p>
                    <p className="text-sm text-green-300 mt-2">Business performance metrics and insights</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="partnerships" className="space-y-6">
            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 backdrop-blur-sm border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-200">
                  <Handshake className="h-5 w-5" />
                  Partnership Opportunities
                </CardTitle>
                <CardDescription className="text-green-300">
                  Expand your business with Snapifi integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {partnerOpportunities.map((opportunity, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-gradient-to-br from-green-800/30 to-emerald-800/20 border border-green-500/20"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-white">{opportunity.title}</h4>
                        <p className="text-sm text-green-200 mt-1">{opportunity.description}</p>
                      </div>
                      <Badge
                        variant={
                          opportunity.difficulty === "Easy"
                            ? "default"
                            : opportunity.difficulty === "Medium"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {opportunity.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-medium">{opportunity.potential}</span>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Learn More
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
