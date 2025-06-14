"use client"

import { useState, useEffect } from "react"
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  DollarSign,
  Building2,
  MapPin,
  Clock,
  Users,
  Zap,
  Shield,
} from "lucide-react"

import { ImperialCard } from "@/components/ui/imperial-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RealEstateOrderBook } from "./real-estate-order-book"
import { PropertyTradingChart } from "./property-trading-chart"
import { MarketDepthDisplay } from "./market-depth-display"
import { PropertyWatchlist } from "./property-watchlist"
import { TechnicalIndicators } from "./technical-indicators"
import { InstitutionalFlow } from "./institutional-flow"
import { RealEstateNews } from "./real-estate-news"

interface PropertySecurity {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
  sector: string
  location: string
  type: "REIT" | "PROPERTY" | "FUND" | "INDEX"
  bid: number
  ask: number
  lastTrade: string
}

const mockProperties: PropertySecurity[] = [
  {
    symbol: "NYC.MANH.001",
    name: "Manhattan Luxury Tower",
    price: 2850000,
    change: 45000,
    changePercent: 1.6,
    volume: 12,
    marketCap: 285000000,
    sector: "Luxury Residential",
    location: "Manhattan, NY",
    type: "PROPERTY",
    bid: 2845000,
    ask: 2855000,
    lastTrade: "14:32:15",
  },
  {
    symbol: "SF.COMM.045",
    name: "San Francisco Office Complex",
    price: 15750000,
    change: -125000,
    changePercent: -0.8,
    volume: 3,
    marketCap: 472500000,
    sector: "Commercial Office",
    location: "San Francisco, CA",
    type: "PROPERTY",
    bid: 15725000,
    ask: 15775000,
    lastTrade: "14:28:42",
  },
  {
    symbol: "REIT.VNO",
    name: "Vornado Realty Trust",
    price: 28.45,
    change: 0.85,
    changePercent: 3.1,
    volume: 2450000,
    marketCap: 5420000000,
    sector: "Office REIT",
    location: "National",
    type: "REIT",
    bid: 28.42,
    ask: 28.48,
    lastTrade: "14:35:01",
  },
  {
    symbol: "MIA.RES.078",
    name: "Miami Beachfront Resort",
    price: 8950000,
    change: 150000,
    changePercent: 1.7,
    volume: 2,
    marketCap: 179000000,
    sector: "Hospitality",
    location: "Miami Beach, FL",
    type: "PROPERTY",
    bid: 8925000,
    ask: 8975000,
    lastTrade: "14:15:33",
  },
  {
    symbol: "REI.INDEX",
    name: "Real Estate Investment Index",
    price: 1247.83,
    change: 12.45,
    changePercent: 1.0,
    volume: 15750000,
    marketCap: 124783000000,
    sector: "Diversified Index",
    location: "Global",
    type: "INDEX",
    bid: 1247.65,
    ask: 1248.01,
    lastTrade: "14:35:59",
  },
]

export function RealEstateInvestmentTerminal() {
  const [selectedProperty, setSelectedProperty] = useState<PropertySecurity>(mockProperties[0])
  const [marketTime, setMarketTime] = useState(new Date())
  const [isMarketOpen, setIsMarketOpen] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setMarketTime(new Date())
      // Simulate market hours (9:30 AM - 4:00 PM EST)
      const hour = new Date().getHours()
      setIsMarketOpen(hour >= 9 && hour < 16)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value.toLocaleString()}`
  }

  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`
    }
    return value.toLocaleString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
      {/* Terminal Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-yellow-400" />
              <h1 className="text-2xl font-bold text-white">Real Estate Investment Terminal</h1>
            </div>
            <Badge variant={isMarketOpen ? "default" : "destructive"} className="text-xs">
              {isMarketOpen ? "MARKET OPEN" : "MARKET CLOSED"}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{marketTime.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-400" />
              <span>Live Data</span>
            </div>
          </div>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <ImperialCard variant="gold" className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">REI Index</p>
                <p className="text-lg font-bold text-white">1,247.83</p>
                <div className="flex items-center gap-1 text-xs">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">+12.45 (1.0%)</span>
                </div>
              </div>
              <BarChart3 className="w-8 h-8 text-yellow-400" />
            </div>
          </ImperialCard>

          <ImperialCard variant="silver" className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Total Volume</p>
                <p className="text-lg font-bold text-white">$2.4B</p>
                <div className="flex items-center gap-1 text-xs">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">+8.2%</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-gray-400" />
            </div>
          </ImperialCard>

          <ImperialCard variant="bronze" className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Active Properties</p>
                <p className="text-lg font-bold text-white">1,247</p>
                <div className="flex items-center gap-1 text-xs">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">+23</span>
                </div>
              </div>
              <Building2 className="w-8 h-8 text-orange-400" />
            </div>
          </ImperialCard>

          <ImperialCard variant="humanitarian" className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Institutional Flow</p>
                <p className="text-lg font-bold text-white">+$145M</p>
                <div className="flex items-center gap-1 text-xs">
                  <Users className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Net Buying</span>
                </div>
              </div>
              <Shield className="w-8 h-8 text-emerald-400" />
            </div>
          </ImperialCard>

          <ImperialCard variant="gold" className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Volatility Index</p>
                <p className="text-lg font-bold text-white">12.4</p>
                <div className="flex items-center gap-1 text-xs">
                  <TrendingDown className="w-3 h-3 text-red-400" />
                  <span className="text-red-400">-0.8</span>
                </div>
              </div>
              <Zap className="w-8 h-8 text-yellow-400" />
            </div>
          </ImperialCard>
        </div>
      </div>

      {/* Main Trading Interface */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-[calc(100vh-300px)]">
        {/* Left Panel - Charts and Analysis */}
        <div className="xl:col-span-3 space-y-6">
          {/* Property Selection and Quote */}
          <ImperialCard variant="gold" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedProperty.symbol}</h2>
                  <p className="text-sm text-gray-400">{selectedProperty.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">{selectedProperty.location}</span>
                    <Badge variant="outline" className="text-xs">
                      {selectedProperty.type}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{formatCurrency(selectedProperty.price)}</div>
                <div
                  className={`flex items-center gap-1 ${
                    selectedProperty.change >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {selectedProperty.change >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="font-semibold">
                    {selectedProperty.change >= 0 ? "+" : ""}
                    {formatCurrency(selectedProperty.change)}({selectedProperty.changePercent >= 0 ? "+" : ""}
                    {selectedProperty.changePercent}%)
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-1">Last: {selectedProperty.lastTrade}</div>
              </div>
            </div>

            {/* Bid/Ask Spread */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <p className="text-xs text-red-400 uppercase tracking-wide">Bid</p>
                <p className="text-lg font-bold text-red-400">{formatCurrency(selectedProperty.bid)}</p>
              </div>
              <div className="text-center p-3 bg-gray-500/10 rounded-lg border border-gray-500/20">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Spread</p>
                <p className="text-lg font-bold text-gray-300">
                  {formatCurrency(selectedProperty.ask - selectedProperty.bid)}
                </p>
              </div>
              <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <p className="text-xs text-green-400 uppercase tracking-wide">Ask</p>
                <p className="text-lg font-bold text-green-400">{formatCurrency(selectedProperty.ask)}</p>
              </div>
            </div>

            {/* Trading Actions */}
            <div className="flex gap-2">
              <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">BUY</Button>
              <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">SELL</Button>
              <Button variant="outline" className="px-6">
                Watch
              </Button>
              <Button variant="outline" className="px-6">
                Alert
              </Button>
            </div>
          </ImperialCard>

          {/* Charts and Technical Analysis */}
          <Tabs defaultValue="chart" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
              <TabsTrigger value="chart">Price Chart</TabsTrigger>
              <TabsTrigger value="depth">Market Depth</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="flow">Order Flow</TabsTrigger>
            </TabsList>

            <TabsContent value="chart">
              <PropertyTradingChart property={selectedProperty} />
            </TabsContent>

            <TabsContent value="depth">
              <MarketDepthDisplay property={selectedProperty} />
            </TabsContent>

            <TabsContent value="technical">
              <TechnicalIndicators property={selectedProperty} />
            </TabsContent>

            <TabsContent value="flow">
              <InstitutionalFlow property={selectedProperty} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - Order Book, Watchlist, News */}
        <div className="space-y-6">
          <Tabs defaultValue="orderbook" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
              <TabsTrigger value="orderbook">Orders</TabsTrigger>
              <TabsTrigger value="watchlist">Watch</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
            </TabsList>

            <TabsContent value="orderbook">
              <RealEstateOrderBook property={selectedProperty} onPropertySelect={setSelectedProperty} />
            </TabsContent>

            <TabsContent value="watchlist">
              <PropertyWatchlist
                properties={mockProperties}
                onPropertySelect={setSelectedProperty}
                selectedProperty={selectedProperty}
              />
            </TabsContent>

            <TabsContent value="news">
              <RealEstateNews />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
