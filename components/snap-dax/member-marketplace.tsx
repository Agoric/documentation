"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Filter,
  Search,
  ShoppingBag,
  Star,
  Tag,
  Clock,
  Lock,
  Sparkles,
  ChevronRight,
  BarChart3,
  Shield,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HolographicGlassCard } from "./holographic-glass-card"
import { motion } from "framer-motion"
import { HolographicBadge } from "./holographic-badge"

// Sample product data
const products = [
  {
    id: 1,
    name: "Quantum Computing Access Token",
    category: "Technology",
    price: 2500,
    rating: 4.9,
    reviews: 124,
    exclusive: true,
    tokenized: true,
    image: "/quantum-computing-concept.png",
    description:
      "Exclusive access to our quantum computing infrastructure. Process complex calculations and simulations with unprecedented speed.",
    membershipLevel: "Platinum",
    availableUnits: 15,
    releaseDate: "2023-11-15",
  },
  {
    id: 2,
    name: "AI Neural Interface",
    category: "Technology",
    price: 1299,
    rating: 4.7,
    reviews: 86,
    exclusive: true,
    tokenized: false,
    image: "/neural-interface.png",
    description:
      "Next-generation neural interface for direct AI interaction. Enhance productivity and creative workflows with thought-based commands.",
    membershipLevel: "Gold",
    availableUnits: 28,
    releaseDate: "2023-10-22",
  },
  {
    id: 3,
    name: "Holographic Display System",
    category: "Hardware",
    price: 899,
    rating: 4.8,
    reviews: 152,
    exclusive: true,
    tokenized: false,
    image: "/holographic-display.png",
    description:
      "Advanced holographic display for immersive visualization. Perfect for design work, presentations, and interactive experiences.",
    membershipLevel: "Silver",
    availableUnits: 7,
    releaseDate: "2023-09-30",
  },
  {
    id: 4,
    name: "Tokenized Real Estate Share",
    category: "Investment",
    price: 5000,
    rating: 4.9,
    reviews: 78,
    exclusive: true,
    tokenized: true,
    image: "/modern-family-home.png",
    description:
      "Fractional ownership in premium commercial real estate. Receive quarterly dividends and participate in property appreciation.",
    membershipLevel: "Platinum",
    availableUnits: 42,
    releaseDate: "2023-11-05",
  },
  {
    id: 5,
    name: "Quantum-Secured Crypto Wallet",
    category: "Security",
    price: 349,
    rating: 4.6,
    reviews: 93,
    exclusive: true,
    tokenized: false,
    image: "/placeholder-m4j9b.png",
    description:
      "Hardware wallet with quantum-resistant encryption. Secure your digital assets against current and future threats.",
    membershipLevel: "Gold",
    availableUnits: 31,
    releaseDate: "2023-10-10",
  },
  {
    id: 6,
    name: "Advanced Analytics Dashboard",
    category: "Software",
    price: 199,
    rating: 4.7,
    reviews: 115,
    exclusive: true,
    tokenized: false,
    image: "/analytics-dashboard.png",
    description:
      "Comprehensive analytics platform with AI-powered insights. Visualize complex data and discover actionable patterns.",
    membershipLevel: "Silver",
    availableUnits: 56,
    releaseDate: "2023-09-15",
  },
  {
    id: 7,
    name: "Green Energy Investment Token",
    category: "Investment",
    price: 1000,
    rating: 4.8,
    reviews: 64,
    exclusive: true,
    tokenized: true,
    image: "/green-energy-landscape.png",
    description:
      "Investment in renewable energy projects. Support sustainable development while earning competitive returns.",
    membershipLevel: "Gold",
    availableUnits: 89,
    releaseDate: "2023-11-01",
  },
  {
    id: 8,
    name: "Biometric Security System",
    category: "Security",
    price: 799,
    rating: 4.5,
    reviews: 72,
    exclusive: true,
    tokenized: false,
    image: "/biometric-security.png",
    description:
      "Multi-factor biometric security system. Protect physical and digital assets with advanced authentication.",
    membershipLevel: "Silver",
    availableUnits: 18,
    releaseDate: "2023-10-05",
  },
]

export function MemberMarketplace() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [membershipFilter, setMembershipFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  // Get unique categories
  const categories = ["all", ...new Set(products.map((product) => product.category))]
  const membershipLevels = ["all", ...new Set(products.map((product) => product.membershipLevel))]

  // Filter products based on search, category, membership, and tab
  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchQuery === "" || product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesMembership = membershipFilter === "all" || product.membershipLevel === membershipFilter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "tokenized" && product.tokenized) ||
      (activeTab === "exclusive" && product.exclusive)

    return matchesSearch && matchesCategory && matchesMembership && matchesTab
  })

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 via-slate-950/40 to-purple-950/40 backdrop-blur-sm">
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <CardTitle className="text-xl text-indigo-200">Members-Only Marketplace</CardTitle>
              <CardDescription className="text-indigo-400">
                Exclusive products and tokenized assets for platform members
              </CardDescription>
            </div>
            <Badge className="bg-indigo-500/30 text-indigo-200">
              <Lock className="mr-1 h-3 w-3" />
              Members Only
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <HolographicGlassCard className="mb-6 p-4" glassEffect="subtle" interactive={false}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-indigo-400" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-indigo-500/20 bg-indigo-950/30 pl-8 text-indigo-200 placeholder:text-indigo-400/50"
                />
              </div>

              <div className="flex flex-1 flex-col gap-4 md:flex-row">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="border-indigo-500/20 bg-indigo-950/90 text-indigo-200 backdrop-blur-md">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={membershipFilter} onValueChange={setMembershipFilter}>
                  <SelectTrigger className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200">
                    <SelectValue placeholder="Membership Level" />
                  </SelectTrigger>
                  <SelectContent className="border-indigo-500/20 bg-indigo-950/90 text-indigo-200 backdrop-blur-md">
                    {membershipLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level === "all" ? "All Levels" : level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="icon"
                  className="border-indigo-500/20 bg-indigo-950/30 text-indigo-400 hover:bg-indigo-900/30 hover:text-indigo-300"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </HolographicGlassCard>

          {/* Tabs */}
          <div className="mb-6 overflow-hidden rounded-lg border border-indigo-500/30 bg-indigo-950/20 backdrop-blur-md">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-transparent p-1">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
                >
                  All Products
                </TabsTrigger>
                <TabsTrigger
                  value="tokenized"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Tokenized Assets
                </TabsTrigger>
                <TabsTrigger
                  value="exclusive"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Exclusive Products
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Products grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <HolographicGlassCard glassEffect="medium" hoverEffect="tilt" className="h-full">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 to-transparent" />

                      {/* Holographic overlay effect */}
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, transparent 50%, rgba(168, 85, 247, 0.2) 100%)",
                          mixBlendMode: "overlay",
                        }}
                      />

                      <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                        {product.tokenized && (
                          <HolographicBadge variant="tokenized" glow={true}>
                            <Sparkles className="mr-1 h-3 w-3" />
                            Tokenized
                          </HolographicBadge>
                        )}
                        <HolographicBadge variant="category">
                          <Tag className="mr-1 h-3 w-3" />
                          {product.category}
                        </HolographicBadge>
                      </div>
                      <div className="absolute right-3 top-3">
                        <HolographicBadge
                          variant={
                            product.membershipLevel === "Platinum"
                              ? "platinum"
                              : product.membershipLevel === "Gold"
                                ? "gold"
                                : "silver"
                          }
                        >
                          <Lock className="mr-1 h-3 w-3" />
                          {product.membershipLevel}
                        </HolographicBadge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="mb-1 line-clamp-1 font-medium text-indigo-100">{product.name}</h3>
                      <p className="mb-3 line-clamp-2 text-xs text-indigo-300">{product.description}</p>
                      <div className="mb-3 flex items-center justify-between">
                        <div className="text-lg font-bold text-white">${product.price.toLocaleString()}</div>
                        <div className="flex items-center text-xs text-indigo-200">
                          <Star className="mr-1 h-3 w-3 fill-amber-400 text-amber-400" />
                          {product.rating} ({product.reviews})
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-indigo-300">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {new Date(product.releaseDate).toLocaleDateString()}
                        </div>
                        <div>{product.availableUnits} available</div>
                      </div>
                      <Button className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Purchase
                      </Button>
                    </div>
                  </HolographicGlassCard>
                </motion.div>
              ))}
            </div>
          ) : (
            <HolographicGlassCard className="flex h-40 flex-col items-center justify-center p-6 text-center">
              <ShoppingBag className="mb-2 h-8 w-8 text-indigo-400" />
              <p className="text-indigo-300">No products match your filters</p>
              <Button
                variant="link"
                className="mt-2 text-indigo-400"
                onClick={() => {
                  setSearchQuery("")
                  setCategoryFilter("all")
                  setMembershipFilter("all")
                  setActiveTab("all")
                }}
              >
                Clear all filters
              </Button>
            </HolographicGlassCard>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <HolographicGlassCard className="mt-6 p-4" glassEffect="subtle" interactive={false}>
              <div className="flex items-center justify-between">
                <div className="text-sm text-indigo-300">
                  Showing <span className="font-medium text-indigo-200">{filteredProducts.length}</span> of{" "}
                  <span className="font-medium text-indigo-200">{products.length}</span> products
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="border-indigo-500/20 bg-indigo-950/30 text-indigo-400 hover:bg-indigo-900/30 hover:text-indigo-300 disabled:bg-indigo-950/10 disabled:text-indigo-400/50"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-indigo-500/20 bg-indigo-950/30 text-indigo-400 hover:bg-indigo-900/30 hover:text-indigo-300"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </HolographicGlassCard>
          )}
        </CardContent>
      </Card>

      {/* Featured collections */}
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Tokenized Investments",
            description: "Fractional ownership in premium assets",
            icon: <Sparkles className="h-5 w-5 text-indigo-400" />,
            items: 24,
            image: "/diversified-investment-portfolio.png",
          },
          {
            title: "Quantum Technology",
            description: "Next-generation computing solutions",
            icon: <Shield className="h-5 w-5 text-indigo-400" />,
            items: 18,
            image: "/placeholder-ym0de.png",
          },
          {
            title: "Analytics Tools",
            description: "Advanced data processing and visualization",
            icon: <BarChart3 className="h-5 w-5 text-indigo-400" />,
            items: 32,
            image: "/data-analytics-visualization.png",
          },
        ].map((collection, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
          >
            <HolographicGlassCard glassEffect="subtle" hoverEffect="glow" className="overflow-hidden">
              <div className="flex items-center gap-4 p-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-md">
                  <img
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.title}
                    className="h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, transparent 50%, rgba(168, 85, 247, 0.3) 100%)",
                      mixBlendMode: "overlay",
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-medium text-indigo-100">{collection.title}</h3>
                  <p className="text-xs text-indigo-300">{collection.description}</p>
                  <div className="mt-1 flex items-center text-xs text-indigo-200">
                    <ShoppingBag className="mr-1 h-3 w-3" />
                    {collection.items} products
                  </div>
                </div>
              </div>
              <div className="border-t border-indigo-500/20 p-3">
                <Button
                  variant="ghost"
                  className="w-full justify-between text-indigo-200 hover:bg-indigo-950/50 hover:text-indigo-100"
                >
                  View Collection
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </HolographicGlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
