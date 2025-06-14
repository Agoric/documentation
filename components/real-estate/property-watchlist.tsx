"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Star, Plus, Search } from "lucide-react"

interface PropertyWatchlistProps {
  onSelectProperty: (symbol: string) => void
}

export function PropertyWatchlist({ onSelectProperty }: PropertyWatchlistProps) {
  const [selectedSymbol, setSelectedSymbol] = useState("PROP-NYC-001")

  const watchlistProperties = [
    {
      symbol: "PROP-NYC-001",
      name: "Manhattan Penthouse",
      price: "$2,500,000",
      change: "+2.3%",
      changeValue: "+$56,250",
      volume: "12.5K",
      trend: "up",
      sector: "RESI",
    },
    {
      symbol: "PROP-LA-045",
      name: "Beverly Hills Estate",
      price: "$8,750,000",
      change: "+1.8%",
      changeValue: "+$155,000",
      volume: "8.2K",
      trend: "up",
      sector: "LUXE",
    },
    {
      symbol: "PROP-MIA-023",
      name: "South Beach Condo",
      price: "$1,200,000",
      change: "-0.9%",
      changeValue: "-$10,800",
      volume: "15.7K",
      trend: "down",
      sector: "RESI",
    },
    {
      symbol: "PROP-SF-067",
      name: "Silicon Valley Office",
      price: "$15,000,000",
      change: "+3.2%",
      changeValue: "+$468,750",
      volume: "6.1K",
      trend: "up",
      sector: "COMM",
    },
    {
      symbol: "PROP-CHI-089",
      name: "Downtown Retail",
      price: "$3,200,000",
      change: "-1.2%",
      changeValue: "-$38,400",
      volume: "9.8K",
      trend: "down",
      sector: "RETL",
    },
    {
      symbol: "PROP-BOS-034",
      name: "Waterfront Warehouse",
      price: "$5,500,000",
      change: "+0.7%",
      changeValue: "+$38,500",
      volume: "4.3K",
      trend: "up",
      sector: "INDU",
    },
  ]

  const handleSelectProperty = (symbol: string) => {
    setSelectedSymbol(symbol)
    onSelectProperty(symbol)
  }

  return (
    <Card className="bg-gray-900 border-green-800 h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-green-300 text-sm">WATCHLIST</CardTitle>
          <div className="flex items-center space-x-1">
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-green-400">
              <Plus className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-green-400">
              <Search className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-1 p-2 text-xs text-gray-400 border-b border-green-800 bg-gray-950">
            <div className="col-span-4">SYMBOL</div>
            <div className="col-span-3 text-right">PRICE</div>
            <div className="col-span-3 text-right">CHANGE</div>
            <div className="col-span-2 text-right">VOL</div>
          </div>

          {/* Property Rows */}
          {watchlistProperties.map((property) => (
            <div
              key={property.symbol}
              className={`grid grid-cols-12 gap-1 p-2 text-xs cursor-pointer hover:bg-gray-800 border-b border-gray-800 ${
                selectedSymbol === property.symbol ? "bg-green-900/20" : ""
              }`}
              onClick={() => handleSelectProperty(property.symbol)}
            >
              <div className="col-span-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <div>
                    <div className="text-green-300 font-bold">{property.symbol}</div>
                    <div className="text-gray-400 text-xs truncate">{property.name}</div>
                  </div>
                </div>
              </div>

              <div className="col-span-3 text-right">
                <div className="text-white font-bold">{property.price}</div>
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                  {property.sector}
                </Badge>
              </div>

              <div className="col-span-3 text-right">
                <div className={`font-bold ${property.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                  {property.change}
                </div>
                <div className={`text-xs ${property.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                  {property.changeValue}
                </div>
              </div>

              <div className="col-span-2 text-right">
                <div className="text-gray-300">{property.volume}</div>
                {property.trend === "up" ? (
                  <TrendingUp className="w-3 h-3 text-green-400 ml-auto" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-400 ml-auto" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
