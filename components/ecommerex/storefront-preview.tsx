"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit, Eye, Heart, Settings, ShoppingCart, Star, Zap, Search, Grid, List, Save, RefreshCw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Sample storefront data
const storefrontData = {
  branding: {
    storeName: "TechHub Pro",
    tagline: "Premium Electronics & Accessories",
    logo: "/placeholder.svg?height=60&width=200&text=TechHub+Pro",
    primaryColor: "#4F46E5",
    secondaryColor: "#7C3AED",
    accentColor: "#F59E0B",
  },
  hero: {
    title: "Discover Premium Tech",
    subtitle: "Cutting-edge electronics and accessories for the modern lifestyle",
    backgroundImage: "/holographic-display.png",
    ctaText: "Shop Now",
    ctaLink: "#products",
  },
  products: [
    {
      id: 1,
      name: "Wireless Earbuds Pro",
      price: 129.99,
      originalPrice: 159.99,
      rating: 4.8,
      reviews: 324,
      image: "/wireless-earbuds.png",
      category: "Audio",
      inStock: true,
      featured: true,
      description: "Premium wireless earbuds with active noise cancellation and 24-hour battery life.",
      features: ["Active Noise Cancellation", "24hr Battery", "Water Resistant", "Spatial Audio"],
    },
    {
      id: 2,
      name: "Smart Watch Series X",
      price: 249.99,
      originalPrice: null,
      rating: 4.9,
      reviews: 156,
      image: "/smartwatch-lifestyle.png",
      category: "Wearables",
      inStock: true,
      featured: true,
      description: "Advanced smartwatch with health monitoring, GPS, and cellular connectivity.",
      features: ["Health Monitoring", "GPS Tracking", "Cellular", "Water Resistant"],
    },
    {
      id: 3,
      name: "Ultra HD Webcam",
      price: 89.99,
      originalPrice: 109.99,
      rating: 4.6,
      reviews: 89,
      image: "/classic-webcam.png",
      category: "Computer Accessories",
      inStock: true,
      featured: false,
      description: "4K Ultra HD webcam with auto-focus and dual noise-canceling microphones.",
      features: ["4K Ultra HD", "Auto Focus", "Dual Microphones", "Light Correction"],
    },
    {
      id: 4,
      name: "Ergonomic Keyboard",
      price: 119.99,
      originalPrice: null,
      rating: 4.7,
      reviews: 203,
      image: "/mechanical-keyboard.png",
      category: "Computer Accessories",
      inStock: true,
      featured: false,
      description: "Mechanical keyboard with ergonomic design and customizable RGB lighting.",
      features: ["Mechanical Switches", "RGB Lighting", "Ergonomic Design", "Programmable Keys"],
    },
    {
      id: 5,
      name: "Portable SSD 1TB",
      price: 159.99,
      originalPrice: 199.99,
      rating: 4.8,
      reviews: 145,
      image: "/placeholder-m4lol.png",
      category: "Storage",
      inStock: false,
      featured: true,
      description: "Ultra-fast portable SSD with 1TB capacity and hardware encryption.",
      features: ["1TB Capacity", "USB-C", "Hardware Encryption", "Shock Resistant"],
    },
    {
      id: 6,
      name: "Gaming Mouse RGB",
      price: 69.99,
      originalPrice: 89.99,
      rating: 4.5,
      reviews: 267,
      image: "/gaming-mouse.png",
      category: "Gaming",
      inStock: true,
      featured: false,
      description: "High-performance gaming mouse with 16,000 DPI and customizable RGB.",
      features: ["16,000 DPI", "RGB Lighting", "8 Programmable Buttons", "Ergonomic"],
    },
  ],
  categories: ["All", "Audio", "Wearables", "Computer Accessories", "Storage", "Gaming"],
  cart: [],
  wishlist: [],
}

export function StorefrontPreview() {
  const [adminMode, setAdminMode] = useState(false)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [storeData, setStoreData] = useState(storefrontData)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [cart, setCart] = useState<any[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  // Filter products based on category and search
  const filteredProducts = storeData.products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Add to cart
  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  // Toggle wishlist
  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  // Update store data
  const updateStoreData = (section: string, data: any) => {
    setStoreData((prev) => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], ...data },
    }))
  }

  // Render admin controls
  const renderAdminControls = (section: string, title: string) => {
    if (!adminMode) return null

    return (
      <div className="absolute right-2 top-2 z-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="border-indigo-500/20 bg-indigo-950/80 text-indigo-300 hover:bg-indigo-900/80 backdrop-blur-sm"
            >
              <Edit className="h-3 w-3" />
            </Button>
          </DialogTrigger>
          <DialogContent className="border-indigo-500/20 bg-indigo-950/90 text-indigo-200 backdrop-blur-md">
            <DialogHeader>
              <DialogTitle>Edit {title}</DialogTitle>
              <DialogDescription>Make changes to this section of your storefront</DialogDescription>
            </DialogHeader>
            {renderEditForm(section)}
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  // Render edit forms
  const renderEditForm = (section: string) => {
    switch (section) {
      case "branding":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Store Name</label>
              <Input
                value={storeData.branding.storeName}
                onChange={(e) => updateStoreData("branding", { storeName: e.target.value })}
                className="border-indigo-500/20 bg-indigo-950/30"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Tagline</label>
              <Input
                value={storeData.branding.tagline}
                onChange={(e) => updateStoreData("branding", { tagline: e.target.value })}
                className="border-indigo-500/20 bg-indigo-950/30"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-sm font-medium">Primary Color</label>
                <Input
                  type="color"
                  value={storeData.branding.primaryColor}
                  onChange={(e) => updateStoreData("branding", { primaryColor: e.target.value })}
                  className="h-10 border-indigo-500/20 bg-indigo-950/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Secondary Color</label>
                <Input
                  type="color"
                  value={storeData.branding.secondaryColor}
                  onChange={(e) => updateStoreData("branding", { secondaryColor: e.target.value })}
                  className="h-10 border-indigo-500/20 bg-indigo-950/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Accent Color</label>
                <Input
                  type="color"
                  value={storeData.branding.accentColor}
                  onChange={(e) => updateStoreData("branding", { accentColor: e.target.value })}
                  className="h-10 border-indigo-500/20 bg-indigo-950/30"
                />
              </div>
            </div>
            <Button className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )
      case "hero":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Hero Title</label>
              <Input
                value={storeData.hero.title}
                onChange={(e) => updateStoreData("hero", { title: e.target.value })}
                className="border-indigo-500/20 bg-indigo-950/30"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Subtitle</label>
              <Textarea
                value={storeData.hero.subtitle}
                onChange={(e) => updateStoreData("hero", { subtitle: e.target.value })}
                className="border-indigo-500/20 bg-indigo-950/30"
              />
            </div>
            <div>
              <label className="text-sm font-medium">CTA Button Text</label>
              <Input
                value={storeData.hero.ctaText}
                onChange={(e) => updateStoreData("hero", { ctaText: e.target.value })}
                className="border-indigo-500/20 bg-indigo-950/30"
              />
            </div>
            <Button className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )
      default:
        return <div>Edit form for {section}</div>
    }
  }

  return (
    <div className="space-y-6">
      {/* Admin Controls Header */}
      <div className="flex items-center justify-between rounded-lg border border-indigo-500/20 bg-indigo-950/30 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch checked={adminMode} onCheckedChange={setAdminMode} />
            <span className="text-sm font-medium text-indigo-200">Admin Mode</span>
          </div>
          {adminMode && (
            <Badge className="bg-amber-500/20 text-amber-300">
              <Settings className="mr-1 h-3 w-3" />
              Editing Enabled
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-indigo-500/20 text-indigo-300">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600">
            <RefreshCw className="mr-2 h-4 w-4" />
            Publish Changes
          </Button>
        </div>
      </div>

      {/* Storefront Preview */}
      <div className="rounded-lg border border-indigo-500/20 bg-white text-gray-900 shadow-xl">
        {/* Header */}
        <div className="relative border-b bg-white px-6 py-4">
          {renderAdminControls("branding", "Store Branding")}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={storeData.branding.logo || "/placeholder.svg"}
                alt={storeData.branding.storeName}
                className="h-8 w-auto object-contain"
              />
              <div>
                <h1 className="text-xl font-bold" style={{ color: storeData.branding.primaryColor }}>
                  {storeData.branding.storeName}
                </h1>
                <p className="text-sm text-gray-600">{storeData.branding.tagline}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10"
                />
              </div>
              <Button variant="outline" className="relative">
                <Heart className="h-4 w-4" />
                {wishlist.length > 0 && (
                  <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs">{wishlist.length}</Badge>
                )}
              </Button>
              <Button className="relative" style={{ backgroundColor: storeData.branding.primaryColor }}>
                <ShoppingCart className="h-4 w-4" />
                {cart.length > 0 && (
                  <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div
          className="relative h-64 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${storeData.hero.backgroundImage})`,
          }}
        >
          {renderAdminControls("hero", "Hero Section")}
          <div className="flex h-full items-center justify-center text-center text-white">
            <div>
              <h2 className="mb-4 text-4xl font-bold">{storeData.hero.title}</h2>
              <p className="mb-6 text-xl">{storeData.hero.subtitle}</p>
              <Button size="lg" className="text-white" style={{ backgroundColor: storeData.branding.accentColor }}>
                {storeData.hero.ctaText}
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation & Filters */}
        <div className="border-b bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {storeData.categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    style={
                      selectedCategory === category ? { backgroundColor: storeData.branding.primaryColor } : undefined
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
                {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              </Button>
              <Select defaultValue="featured">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-2xl font-bold">Products</h3>
            <p className="text-gray-600">{filteredProducts.length} products found</p>
          </div>

          <div
            className={viewMode === "grid" ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-4"}
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className={
                    viewMode === "grid"
                      ? "group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md"
                      : "flex gap-4 rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                  }
                >
                  {/* Product Image */}
                  <div className={viewMode === "grid" ? "aspect-square overflow-hidden" : "h-24 w-24 flex-shrink-0"}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    {product.featured && (
                      <Badge className="absolute left-2 top-2 bg-amber-500 text-white">
                        <Zap className="mr-1 h-3 w-3" />
                        Featured
                      </Badge>
                    )}
                    {!product.inStock && (
                      <Badge className="absolute left-2 top-2 bg-red-500 text-white">Out of Stock</Badge>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className={viewMode === "grid" ? "p-4" : "flex-1"}>
                    <div className="mb-2">
                      <h4 className="font-semibold text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>

                    {/* Rating */}
                    <div className="mb-2 flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mb-3 flex items-center gap-2">
                      <span className="text-lg font-bold" style={{ color: storeData.branding.primaryColor }}>
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>

                    {/* Description */}
                    {viewMode === "list" && (
                      <p className="mb-3 text-sm text-gray-600 line-clamp-2">{product.description}</p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className="flex-1"
                        style={{ backgroundColor: storeData.branding.primaryColor }}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleWishlist(product.id)}
                        className={wishlist.includes(product.id) ? "text-red-500" : ""}
                      >
                        <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-500">No products found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedCategory("All")
                  setSearchQuery("")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 px-6 py-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h4 className="mb-4 font-semibold">About {storeData.branding.storeName}</h4>
              <p className="text-sm text-gray-600">
                Your trusted source for premium electronics and accessories. Quality products, competitive prices, and
                exceptional service.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Customer Service</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Contact Us</li>
                <li>Shipping Info</li>
                <li>Returns & Exchanges</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>New Arrivals</li>
                <li>Best Sellers</li>
                <li>Sale Items</li>
                <li>Gift Cards</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Newsletter</li>
                <li>Social Media</li>
                <li>Reviews</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 {storeData.branding.storeName}. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Shopping Cart Summary (if items in cart) */}
      {cart.length > 0 && (
        <Card className="border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-indigo-200">Shopping Cart Summary</CardTitle>
            <CardDescription className="text-indigo-300/70">Items added during preview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-indigo-200">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-indigo-500/20 pt-2">
                <div className="flex items-center justify-between font-bold text-indigo-100">
                  <span>Total:</span>
                  <span>${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
