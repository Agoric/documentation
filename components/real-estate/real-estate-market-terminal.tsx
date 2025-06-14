"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TradingChart } from "./trading-chart"
import { OrderBook } from "./order-book"
import { MarketDepth } from "./market-depth"
import { PropertyTicker } from "./property-ticker"
import { TradingInterface } from "./trading-interface"
import { MarketNews } from "./market-news"
import { PortfolioSummary } from "./portfolio-summary"
import { RiskMetrics } from "./risk-metrics"
import { TrendingUp, TrendingDown, Building, BarChart3 } from "lucide-react"

export function RealEstateMarketTerminal() {
  const [selectedProperty, setSelectedProperty] = useState("REIT-NYC-001")
  const [marketData, setMarketData] = useState({
    totalVolume: 2847392000,
    activeListings: 15847,
    avgPrice: 485000,
    marketCap: 847392847392,
    dailyChange: 2.34,
  })

  const marketIndices = [
    { symbol: "REIX", name: "Real Estate Index", price: 2847.92, change: 2.34, volume: "847M" },
    { symbol: "COMX", name: "Commercial Index", price: 1923.45, change: -0.87, volume: "234M" },
    { symbol: "RESX", name: "Residential Index", price: 3421.67, change: 1.45, volume: "567M" },
    { symbol: "RITX", name: "REIT Index", price: 1567.89, change: 3.21, volume: "892M" },
  ]

  const topProperties = [
    {
      symbol: "REIT-NYC-001",
      name: "Manhattan Office Tower",
      price: 2500000,
      change: 2.34,
      volume: 15,
      marketCap: 125000000,
      yield: 4.2,
      sector: "Commercial",
    },
    {
      symbol: "REIT-LA-002",
      name: "Beverly Hills Residential",
      price: 3200000,
      change: -1.23,
      volume: 8,
      marketCap: 89600000,
      yield: 3.8,
      sector: "Luxury Residential",
    },
    {
      symbol: "REIT-CHI-003",
      name: "Chicago Industrial Complex",
      price: 1800000,
      change: 4.56,
      volume: 23,
      marketCap: 234000000,
      yield: 5.1,
      sector: "Industrial",
    },
    {
      symbol: "REIT-MIA-004",
      name: "Miami Retail Center",
      price: 950000,
      change: 1.87,
      volume: 12,
      marketCap: 67200000,
      yield: 4.7,
      sector: "Retail",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Market Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Building className="h-8 w-8 text-amber-400" />
            <h1 className="text-2xl font-bold text-amber-400">REAL ESTATE TRADING TERMINAL</h1>
            <Badge variant="outline" className="border-green-500 text-green-400">
              MARKET OPEN
            </Badge>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-400">EST 09:30 AM</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400">LIVE</span>
            </div>
          </div>
        </div>

        {/* Market Indices */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {marketIndices.map((index) => (
            <Card key={index.symbol} className="bg-gray-900 border-gray-700">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-gray-400">{index.symbol}</p>
                    <p className="text-lg font-bold">{index.price.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center ${index.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {index.change >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      <span className="text-sm font-medium">
                        {index.change >= 0 ? "+" : ""}
                        {index.change}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">Vol: {index.volume}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Property Ticker */}
      <PropertyTicker properties={topProperties} />

      {/* Main Trading Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* Trading Chart - Takes up 3 columns */}
        <div className="lg:col-span-3">
          <Card className="bg-gray-900 border-gray-700 h-96">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-amber-400">{selectedProperty} - Manhattan Office Tower</CardTitle>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="border-blue-500 text-blue-400">
                    Commercial
                  </Badge>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-400">$2,500,000</p>
                    <p className="text-sm text-green-400">+2.34% (+$57,500)</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <TradingChart symbol={selectedProperty} />
            </CardContent>
          </Card>
        </div>

        {/* Order Book */}
        <div>
          <OrderBook symbol={selectedProperty} />
        </div>
      </div>

      {/* Secondary Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Property Listings with Trading Data */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-amber-400 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Active Property Securities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-8 gap-2 text-xs text-gray-400 font-medium border-b border-gray-700 pb-2">
                  <span>SYMBOL</span>
                  <span>PRICE</span>
                  <span>CHANGE</span>
                  <span>VOLUME</span>
                  <span>MKT CAP</span>
                  <span>YIELD</span>
                  <span>SECTOR</span>
                  <span>ACTION</span>
                </div>
                {topProperties.map((property) => (
                  <div
                    key={property.symbol}
                    className={`grid grid-cols-8 gap-2 text-sm py-2 border-b border-gray-800 hover:bg-gray-800 cursor-pointer ${
                      selectedProperty === property.symbol ? "bg-gray-800" : ""
                    }`}
                    onClick={() => setSelectedProperty(property.symbol)}
                  >
                    <span className="font-medium text-blue-400">{property.symbol}</span>
                    <span className="font-mono">${property.price.toLocaleString()}</span>
                    <span className={`font-mono ${property.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {property.change >= 0 ? "+" : ""}
                      {property.change}%
                    </span>
                    <span className="font-mono">{property.volume}</span>
                    <span className="font-mono text-xs">${(property.marketCap / 1000000).toFixed(1)}M</span>
                    <span className="font-mono text-green-400">{property.yield}%</span>
                    <span className="text-xs">
                      <Badge variant="outline" className="text-xs">
                        {property.sector}
                      </Badge>
                    </span>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 px-2 text-xs border-green-600 text-green-400 hover:bg-green-600"
                      >
                        BUY
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 px-2 text-xs border-red-600 text-red-400 hover:bg-red-600"
                      >
                        SELL
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trading Interface & Portfolio */}
        <div className="space-y-6">
          <TradingInterface symbol={selectedProperty} />
          <PortfolioSummary />
          <RiskMetrics />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <MarketDepth symbol={selectedProperty} />
        <MarketNews />
      </div>
    </div>
  )
}
