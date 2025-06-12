"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, TrendingUp, Wallet, BarChart3, Clock, Filter } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// Error boundary component to catch rendering errors
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("Error caught by error boundary:", error)
      setHasError(true)
    }

    window.addEventListener("error", errorHandler)
    return () => window.removeEventListener("error", errorHandler)
  }, [])

  if (hasError) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-medium text-red-800">Something went wrong</h3>
        <p className="text-red-600">
          We encountered an error while loading this component. Please try refreshing the page.
        </p>
      </div>
    )
  }

  return <>{children}</>
}

// Safe component that handles null data
const SafeComponent = ({
  children,
  fallback = <Skeleton className="h-40 w-full" />,
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
}) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return fallback
  }

  return <ErrorBoundary>{children}</ErrorBoundary>
}

// TrendingAssets component with proper error handling
const TrendingAssets = () => {
  const [assets, setAssets] = useState<Array<{
    name: string
    symbol: string
    price: number
    change: number
  }> | null>(null)

  useEffect(() => {
    // Simulate API call with a delay
    const timer = setTimeout(() => {
      setAssets([
        { name: "Bitcoin", symbol: "BTC", price: 43567.89, change: 2.34 },
        { name: "Ethereum", symbol: "ETH", price: 2345.67, change: -1.23 },
        { name: "Solana", symbol: "SOL", price: 123.45, change: 5.67 },
        { name: "Cardano", symbol: "ADA", price: 0.56, change: 3.21 },
        { name: "Polkadot", symbol: "DOT", price: 12.34, change: -0.98 },
      ])
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (!assets) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-60" />
        </CardHeader>
        <CardContent>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-24 mb-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
              <div>
                <Skeleton className="h-5 w-20 mb-1" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Assets</CardTitle>
        <CardDescription>Digital assets with significant market movement</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assets.map((asset, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                  {asset.symbol.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{asset.name}</div>
                  <div className="text-sm text-muted-foreground">{asset.symbol}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">${asset.price.toLocaleString()}</div>
                <div className={`text-sm ${asset.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {asset.change >= 0 ? "+" : ""}
                  {asset.change}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// FeaturedAssets component with proper error handling
const FeaturedAssets = () => {
  const [assets, setAssets] = useState<Array<{
    name: string
    symbol: string
    description: string
    change: number
  }> | null>(null)

  useEffect(() => {
    // Simulate API call with a delay
    const timer = setTimeout(() => {
      setAssets([
        { name: "Bitcoin", symbol: "BTC", description: "The original cryptocurrency", change: 2.34 },
        { name: "Ethereum", symbol: "ETH", description: "Smart contract platform", change: -1.23 },
        { name: "Solana", symbol: "SOL", description: "High-performance blockchain", change: 5.67 },
      ])
    }, 700)

    return () => clearTimeout(timer)
  }, [])

  if (!assets) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-60" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border border-muted">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-5 w-24 mt-2 mb-1" />
                  <Skeleton className="h-4 w-16" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-9 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Featured Assets</CardTitle>
        <CardDescription>Curated selection of digital assets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map((asset, index) => (
            <Card key={index} className="border border-muted">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                    {asset.symbol.charAt(0)}
                  </div>
                  <div className={`text-sm font-medium ${asset.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {asset.change >= 0 ? "+" : ""}
                    {asset.change}%
                  </div>
                </div>
                <CardTitle className="mt-2">{asset.name}</CardTitle>
                <CardDescription>{asset.symbol}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{asset.description}</p>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// AssetBadgeCollection component with proper error handling
const AssetBadgeCollection = () => {
  const [badges, setBadges] = useState<Array<{
    title: string
    value: string
    icon: React.ReactNode
  }> | null>(null)

  useEffect(() => {
    // Simulate API call with a delay
    const timer = setTimeout(() => {
      setBadges([
        { title: "Total Assets", value: "12", icon: <Wallet className="h-4 w-4" /> },
        { title: "Portfolio Value", value: "$128,435.23", icon: <BarChart3 className="h-4 w-4" /> },
        { title: "24h Change", value: "+2.34%", icon: <TrendingUp className="h-4 w-4" /> },
        { title: "Last Updated", value: "Just now", icon: <Clock className="h-4 w-4" /> },
      ])
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  if (!badges) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="h-10 w-10 rounded-full mx-auto mb-2" />
              <Skeleton className="h-4 w-20 mx-auto mb-1" />
              <Skeleton className="h-6 w-16 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {badges.map((badge, index) => (
        <Card key={index}>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
              {badge.icon}
            </div>
            <div className="text-sm font-medium">{badge.title}</div>
            <div className="text-2xl font-bold">{badge.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Main dashboard component
export default function DaxDashboardClient() {
  const [isLoading, setIsLoading] = useState(true)
  const [timeframe, setTimeframe] = useState("1d")
  const [portfolioData, setPortfolioData] = useState<{
    value: number
    change: number
    changeAmount: number
  } | null>(null)

  useEffect(() => {
    // Simulate API call with a delay
    const timer = setTimeout(() => {
      setPortfolioData({
        value: 128435.23,
        change: 2.34,
        changeAmount: 2945.32,
      })
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <SafeComponent>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">DAX Dashboard</h1>
            <p className="text-muted-foreground">Monitor and manage your digital assets</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Wallet className="mr-2 h-4 w-4" />
              Add Assets
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SafeComponent
            fallback={
              <Card className="col-span-1 md:col-span-2">
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-48 mb-4" />
                  <div className="flex space-x-2 mb-4">
                    {Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <Skeleton key={i} className="h-8 w-12" />
                      ))}
                  </div>
                  <Skeleton className="h-[200px] w-full" />
                </CardContent>
              </Card>
            }
          >
            <Card className="col-span-1 md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Portfolio Value</CardTitle>
                <CardDescription>Your total assets across all platforms</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading || !portfolioData ? (
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-48" />
                    <div className="flex space-x-2">
                      {["1d", "1w", "1m", "3m", "1y", "All"].map((period, i) => (
                        <Skeleton key={i} className="h-8 w-12" />
                      ))}
                    </div>
                    <Skeleton className="h-[200px] w-full mt-4" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">${portfolioData.value.toLocaleString()}</span>
                      <span
                        className={`ml-2 text-sm font-medium ${
                          portfolioData.change >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {portfolioData.change >= 0 ? "+" : ""}
                        {portfolioData.change}% (${portfolioData.changeAmount.toLocaleString()})
                      </span>
                    </div>

                    <div className="flex space-x-2 text-sm">
                      {["1d", "1w", "1m", "3m", "1y", "All"].map((period) => (
                        <button
                          key={period}
                          onClick={() => setTimeframe(period)}
                          className={`px-2 py-1 rounded ${
                            timeframe === period
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>

                    <div className="h-[200px] mt-4 bg-muted/30 rounded-md flex items-center justify-center">
                      <span className="text-muted-foreground">Portfolio chart visualization</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </SafeComponent>

          <SafeComponent
            fallback={
              <Card>
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {Array(4)
                      .fill(0)
                      .map((_, i) => (
                        <Skeleton key={i} className="h-24 w-full" />
                      ))}
                  </div>
                </CardContent>
              </Card>
            }
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your digital assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: <TrendingUp className="h-4 w-4" />, label: "Trade" },
                    { icon: <ArrowUpRight className="h-4 w-4" />, label: "Send" },
                    { icon: <BarChart3 className="h-4 w-4" />, label: "Analytics" },
                    { icon: <Clock className="h-4 w-4" />, label: "History" },
                  ].map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-24 flex flex-col items-center justify-center gap-2"
                    >
                      {action.icon}
                      <span>{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </SafeComponent>
        </div>

        <SafeComponent>
          <Tabs defaultValue="trending" className="w-full">
            <TabsList>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="watchlist">My Watchlist</TabsTrigger>
              <TabsTrigger value="holdings">My Holdings</TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="mt-6">
              <SafeComponent>
                <TrendingAssets />
              </SafeComponent>
            </TabsContent>

            <TabsContent value="featured" className="mt-6">
              <SafeComponent>
                <FeaturedAssets />
              </SafeComponent>
            </TabsContent>

            <TabsContent value="watchlist" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Watchlist</CardTitle>
                  <CardDescription>Digital assets you're monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
                    <span className="text-muted-foreground">Your watchlist will appear here</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="holdings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Holdings</CardTitle>
                  <CardDescription>Digital assets in your portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
                    <span className="text-muted-foreground">Your holdings will appear here</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </SafeComponent>

        <SafeComponent>
          <AssetBadgeCollection />
        </SafeComponent>
      </div>
    </SafeComponent>
  )
}
