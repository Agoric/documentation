"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyOrderBook } from "./property-order-book"
import { PropertyTradingChart } from "./property-trading-chart"
import { MarketDepthPanel } from "./market-depth-panel"
import { PropertyWatchlist } from "./property-watchlist"
import { TradingPositions } from "./trading-positions"
import { MarketNewsTerminal } from "./market-news-terminal"
import { RealTimeMarketData } from "./realtime-market-data"
import { PropertyAnalytics } from "./property-analytics"
import { TrendingUp, TrendingDown, Activity, Clock } from "lucide-react"

export function RealEstateMarketTerminal() {
  const [selectedProperty, setSelectedProperty] = useState("PROP-NYC-001")
  const [marketTime, setMarketTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setMarketTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const marketIndices = [
    { symbol: "REIT", value: "2,847.32", change: "+12.45", changePercent: "+0.44%", trend: "up" },
    { symbol: "COMM", value: "1,923.67", change: "-8.21", changePercent: "-0.42%", trend: "down" },
    { symbol: "RESI", value: "3,456.89", change: "+23.12", changePercent: "+0.67%", trend: "up" },
    { symbol: "LAND", value: "987.45", change: "+5.67", changePercent: "+0.58%", trend: "up" },
  ]

  const topMovers = [
    { symbol: "PROP-NYC-001", name: "Manhattan Penthouse", price: "$2,500,000", change: "+2.3%", volume: "12.5K" },
    { symbol: "PROP-LA-045", name: "Beverly Hills Estate", price: "$8,750,000", change: "+1.8%", volume: "8.2K" },
    { symbol: "PROP-MIA-023", name: "South Beach Condo", price: "$1,200,000", change: "-0.9%", volume: "15.7K" },
    { symbol: "PROP-SF-067", name: "Silicon Valley Office", price: "$15,000,000", change: "+3.2%", volume: "6.1K" },
  ]

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono text-sm">
      {/* Terminal Header */}
      <div className="border-b border-green-800 p-2 bg-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-bold text-green-300">REAL ESTATE TRADING TERMINAL</h1>
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-green-300">MARKET OPEN</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{marketTime.toLocaleTimeString()}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-green-600 text-green-400">
              LIVE DATA
            </Badge>
            <Badge variant="outline" className="border-yellow-600 text-yellow-400">
              LEVEL II
            </Badge>
          </div>
        </div>
      </div>

      {/* Market Indices Bar */}
      <div className="border-b border-green-800 p-2 bg-gray-950">
        <div className="flex items-center space-x-8">
          {marketIndices.map((index) => (
            <div key={index.symbol} className="flex items-center space-x-2">
              <span className="text-green-300 font-bold">{index.symbol}</span>
              <span className="text-white">{index.value}</span>
              <span className={index.trend === "up" ? "text-green-400" : "text-red-400"}>
                {index.change} ({index.changePercent})
              </span>
              {index.trend === "up" ? (
                <TrendingUp className="w-3 h-3 text-green-400" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Trading Interface */}
      <div className="grid grid-cols-12 gap-1 h-[calc(100vh-120px)]">
        {/* Left Panel - Watchlist & Positions */}
        <div className="col-span-3 space-y-1">
          <PropertyWatchlist onSelectProperty={setSelectedProperty} />
          <TradingPositions />
        </div>

        {/* Center Panel - Chart & Order Book */}
        <div className="col-span-6 space-y-1">
          <div className="h-2/3">
            <PropertyTradingChart symbol={selectedProperty} />
          </div>
          <div className="h-1/3">
            <PropertyOrderBook symbol={selectedProperty} />
          </div>
        </div>

        {/* Right Panel - Market Data & News */}
        <div className="col-span-3 space-y-1">
          <RealTimeMarketData />
          <MarketDepthPanel symbol={selectedProperty} />
          <MarketNewsTerminal />
        </div>
      </div>

      {/* Bottom Panel - Analytics */}
      <div className="border-t border-green-800 h-48 bg-gray-950">
        <Tabs defaultValue="analytics" className="h-full">
          <TabsList className="bg-gray-900 border-green-800">
            <TabsTrigger value="analytics" className="data-[state=active]:bg-green-900">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="movers" className="data-[state=active]:bg-green-900">
              Top Movers
            </TabsTrigger>
            <TabsTrigger value="sectors" className="data-[state=active]:bg-green-900">
              Sectors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="h-full p-2">
            <PropertyAnalytics symbol={selectedProperty} />
          </TabsContent>

          <TabsContent value="movers" className="h-full p-2">
            <div className="grid grid-cols-4 gap-4 h-full">
              {topMovers.map((property) => (
                <Card key={property.symbol} className="bg-gray-900 border-green-800">
                  <CardContent className="p-3">
                    <div className="space-y-1">
                      <div className="text-green-300 font-bold text-xs">{property.symbol}</div>
                      <div className="text-white text-xs">{property.name}</div>
                      <div className="text-yellow-400 font-bold">{property.price}</div>
                      <div className="flex justify-between text-xs">
                        <span className={property.change.startsWith("+") ? "text-green-400" : "text-red-400"}>
                          {property.change}
                        </span>
                        <span className="text-gray-400">Vol: {property.volume}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sectors" className="h-full p-2">
            <div className="grid grid-cols-6 gap-2 h-full">
              {[
                { name: "Residential", change: "+1.2%", color: "text-green-400" },
                { name: "Commercial", change: "-0.8%", color: "text-red-400" },
                { name: "Industrial", change: "+2.1%", color: "text-green-400" },
                { name: "Retail", change: "-1.5%", color: "text-red-400" },
                { name: "Office", change: "+0.9%", color: "text-green-400" },
                { name: "Hospitality", change: "+1.7%", color: "text-green-400" },
              ].map((sector) => (
                <Card key={sector.name} className="bg-gray-900 border-green-800">
                  <CardContent className="p-2 text-center">
                    <div className="text-green-300 text-xs font-bold">{sector.name}</div>
                    <div className={`${sector.color} text-sm font-bold`}>{sector.change}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
