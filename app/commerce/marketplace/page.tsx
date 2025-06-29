"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Star,
  Heart,
  ShoppingCart,
  TrendingUp,
  Package,
  Users,
  BarChart3,
  Eye,
  Grid3X3,
  List,
} from "lucide-react"

export default function MarketplacePage() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = React.useState("all")

  const categories = [
    { id: "all", name: "All Products", count: 1247 },
    { id: "electronics", name: "Electronics", count: 342 },
    { id: "fashion", name: "Fashion", count: 189 },
    { id: "home", name: "Home & Garden", count: 156 },
    { id: "sports", name: "Sports & Outdoors", count: 98 },
    { id: "books", name: "Books & Media", count: 76 },
    { id: "health", name: "Health & Beauty", count: 134 },
  ]

  const products = [
    {
      id: 1,
      name: "Quantum Earbuds Pro",
      price: 299,
      originalPrice: 399,
      rating: 4.8,
      reviews: 1247,
      image: "/products/quantum-earbuds.png",
      category: "electronics",
      badge: "Best Seller",
      discount: 25,
    },
    {
      id: 2,
      name: "SmartWatch X Series",
      price: 449,
      originalPrice: 549,
      rating: 4.6,
      reviews: 892,
      image: "/products/smartwatch-x.png",
      category: "electronics",
      badge: "New",
      discount: 18,
    },
    {
      id: 3,
      name: "HoloVision Webcam",
      price: 199,
      originalPrice: 249,
      rating: 4.7,
      reviews: 634,
      image: "/products/holovision-webcam.png",
      category: "electronics",
      badge: "Popular",
      discount: 20,
    },
    {
      id: 4,
      name: "Mechanical Gaming Keyboard",
      price: 159,
      originalPrice: 199,
      rating: 4.9,
      reviews: 1456,
      image: "/products/mechanical-keyboard.png",
      category: "electronics",
      badge: "Top Rated",
      discount: 20,
    },
  ]

  const marketplaceStats = [
    { title: "Total Products", value: "1,247", change: "+12%", icon: Package, color: "text-blue-500" },
    { title: "Active Vendors", value: "89", change: "+8%", icon: Users, color: "text-green-500" },
    { title: "Monthly Sales", value: "$2.4M", change: "+15%", icon: TrendingUp, color: "text-purple-500" },
    { title: "Customer Rating", value: "4.8", change: "+0.2", icon: Star, color: "text-orange-500" },
  ]

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Marketplace Analytics
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              Comprehensive marketplace insights and vendor management
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button>
              <Package className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketplaceStats.map((stat, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-9 bg-background/50 border-white/20" />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  {category.name}
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Products Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20 hover:border-white/40"
                >
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {product.badge && (
                      <Badge className="absolute top-2 left-2" variant="secondary">
                        {product.badge}
                      </Badge>
                    )}
                    {product.discount > 0 && (
                      <Badge className="absolute top-2 right-2 bg-red-500" variant="destructive">
                        -{product.discount}%
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-t-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary">
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">${product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <Button size="sm">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-6">
            <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Vendor Management</CardTitle>
                <CardDescription>Manage marketplace vendors and their performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "TechGear Pro", products: 45, sales: "$124K", rating: 4.8, status: "Active" },
                    { name: "Fashion Forward", products: 32, sales: "$89K", rating: 4.6, status: "Active" },
                    { name: "Home Essentials", products: 28, sales: "$67K", rating: 4.7, status: "Pending" },
                    { name: "Sports Central", products: 19, sales: "$45K", rating: 4.5, status: "Active" },
                  ].map((vendor, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{vendor.name}</h4>
                          <p className="text-sm text-muted-foreground">{vendor.products} products</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{vendor.sales}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{vendor.rating}</span>
                        </div>
                      </div>
                      <Badge variant={vendor.status === "Active" ? "default" : "secondary"}>{vendor.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>Track and manage customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "#ORD-001", customer: "John Doe", amount: "$299", status: "Delivered", date: "2024-01-15" },
                    { id: "#ORD-002", customer: "Jane Smith", amount: "$449", status: "Shipped", date: "2024-01-14" },
                    {
                      id: "#ORD-003",
                      customer: "Mike Johnson",
                      amount: "$199",
                      status: "Processing",
                      date: "2024-01-13",
                    },
                    { id: "#ORD-004", customer: "Sarah Wilson", amount: "$159", status: "Pending", date: "2024-01-12" },
                  ].map((order, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center">
                          <Package className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">{order.id}</h4>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.amount}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <Badge
                        variant={
                          order.status === "Delivered"
                            ? "default"
                            : order.status === "Shipped"
                              ? "secondary"
                              : order.status === "Processing"
                                ? "outline"
                                : "destructive"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Sales Analytics</CardTitle>
                  <CardDescription>Revenue and sales performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                      <p className="text-muted-foreground">Sales Chart Placeholder</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Top Categories</CardTitle>
                  <CardDescription>Best performing product categories</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Electronics", sales: "$847K", growth: "+15%" },
                    { name: "Fashion", sales: "$623K", growth: "+12%" },
                    { name: "Home & Garden", sales: "$445K", growth: "+8%" },
                    { name: "Sports", sales: "$289K", growth: "+22%" },
                  ].map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{category.name}</span>
                      <div className="text-right">
                        <span className="font-medium">{category.sales}</span>
                        <span className="text-sm text-green-500 ml-2">{category.growth}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Marketplace Settings</CardTitle>
                  <CardDescription>Configure marketplace parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Commission Rate (%)</label>
                    <Input type="number" placeholder="5.0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Minimum Order Value</label>
                    <Input type="number" placeholder="25" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Featured Product Slots</label>
                    <Input type="number" placeholder="12" />
                  </div>
                  <Button className="w-full">Save Settings</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Payment Settings</CardTitle>
                  <CardDescription>Configure payment options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Credit Cards</span>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>PayPal</span>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Crypto Payments</span>
                    <Badge variant="secondary">Disabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Buy Now Pay Later</span>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  <Button className="w-full">Update Payment Methods</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
