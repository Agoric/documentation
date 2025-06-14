"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PropertyOrderBookProps {
  symbol: string
}

export function PropertyOrderBook({ symbol }: PropertyOrderBookProps) {
  const [orderType, setOrderType] = useState("market")
  const [side, setSide] = useState("buy")
  const [quantity, setQuantity] = useState("1")
  const [price, setPrice] = useState("2500000")

  // Mock order book data
  const [bids, setBids] = useState([
    { price: 2498500, size: 2, total: 2 },
    { price: 2497000, size: 1, total: 3 },
    { price: 2495500, size: 3, total: 6 },
    { price: 2494000, size: 1, total: 7 },
    { price: 2492500, size: 2, total: 9 },
  ])

  const [asks, setAsks] = useState([
    { price: 2501500, size: 1, total: 1 },
    { price: 2503000, size: 2, total: 3 },
    { price: 2504500, size: 1, total: 4 },
    { price: 2506000, size: 3, total: 7 },
    { price: 2507500, size: 2, total: 9 },
  ])

  const recentTrades = [
    { time: "14:32:15", price: 2500000, size: 1, side: "buy" },
    { time: "14:31:45", price: 2499500, size: 2, side: "sell" },
    { time: "14:31:20", price: 2500500, size: 1, side: "buy" },
    { time: "14:30:55", price: 2499000, size: 1, side: "sell" },
    { time: "14:30:30", price: 2500000, size: 3, side: "buy" },
  ]

  return (
    <Card className="bg-gray-900 border-green-800 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-green-300 text-sm">ORDER BOOK & TRADING</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs defaultValue="orderbook" className="h-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-950 border-green-800">
            <TabsTrigger value="orderbook" className="data-[state=active]:bg-green-900 text-xs">
              Order Book
            </TabsTrigger>
            <TabsTrigger value="trades" className="data-[state=active]:bg-green-900 text-xs">
              Recent Trades
            </TabsTrigger>
            <TabsTrigger value="order" className="data-[state=active]:bg-green-900 text-xs">
              Place Order
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orderbook" className="p-2 space-y-2">
            {/* Asks (Sell Orders) */}
            <div>
              <div className="text-xs text-gray-400 mb-1">ASKS (SELL)</div>
              <div className="space-y-0">
                {asks.reverse().map((ask, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2 text-xs py-0.5 hover:bg-red-900/20">
                    <div className="text-red-400 font-mono">${ask.price.toLocaleString()}</div>
                    <div className="text-white text-center">{ask.size}</div>
                    <div className="text-gray-400 text-right">{ask.total}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spread */}
            <div className="border-y border-yellow-600 py-1 text-center">
              <div className="text-yellow-400 text-xs font-bold">SPREAD: $3,000 (0.12%)</div>
            </div>

            {/* Bids (Buy Orders) */}
            <div>
              <div className="text-xs text-gray-400 mb-1">BIDS (BUY)</div>
              <div className="space-y-0">
                {bids.map((bid, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2 text-xs py-0.5 hover:bg-green-900/20">
                    <div className="text-green-400 font-mono">${bid.price.toLocaleString()}</div>
                    <div className="text-white text-center">{bid.size}</div>
                    <div className="text-gray-400 text-right">{bid.total}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trades" className="p-2">
            <div className="space-y-1">
              <div className="grid grid-cols-4 gap-2 text-xs text-gray-400 border-b border-gray-700 pb-1">
                <div>TIME</div>
                <div className="text-right">PRICE</div>
                <div className="text-right">SIZE</div>
                <div className="text-right">SIDE</div>
              </div>
              {recentTrades.map((trade, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 text-xs py-0.5">
                  <div className="text-gray-400 font-mono">{trade.time}</div>
                  <div className={`text-right font-mono ${trade.side === "buy" ? "text-green-400" : "text-red-400"}`}>
                    ${trade.price.toLocaleString()}
                  </div>
                  <div className="text-white text-right">{trade.size}</div>
                  <div className={`text-right text-xs ${trade.side === "buy" ? "text-green-400" : "text-red-400"}`}>
                    {trade.side.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="order" className="p-2 space-y-2">
            <div className="grid grid-cols-2 gap-1">
              <Button
                size="sm"
                variant={side === "buy" ? "default" : "ghost"}
                className={`text-xs ${side === "buy" ? "bg-green-700" : "text-green-400"}`}
                onClick={() => setSide("buy")}
              >
                BUY
              </Button>
              <Button
                size="sm"
                variant={side === "sell" ? "default" : "ghost"}
                className={`text-xs ${side === "sell" ? "bg-red-700" : "text-red-400"}`}
                onClick={() => setSide("sell")}
              >
                SELL
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-1">
              <Button
                size="sm"
                variant={orderType === "market" ? "default" : "ghost"}
                className={`text-xs ${orderType === "market" ? "bg-blue-700" : "text-blue-400"}`}
                onClick={() => setOrderType("market")}
              >
                MARKET
              </Button>
              <Button
                size="sm"
                variant={orderType === "limit" ? "default" : "ghost"}
                className={`text-xs ${orderType === "limit" ? "bg-blue-700" : "text-blue-400"}`}
                onClick={() => setOrderType("limit")}
              >
                LIMIT
              </Button>
            </div>

            <div className="space-y-2">
              <div>
                <label className="text-xs text-gray-400">Quantity</label>
                <Input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white text-xs h-8"
                  placeholder="1"
                />
              </div>

              {orderType === "limit" && (
                <div>
                  <label className="text-xs text-gray-400">Price</label>
                  <Input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white text-xs h-8"
                    placeholder="2500000"
                  />
                </div>
              )}

              <Button
                className={`w-full text-xs h-8 ${
                  side === "buy" ? "bg-green-700 hover:bg-green-600" : "bg-red-700 hover:bg-red-600"
                }`}
              >
                {side === "buy" ? "PLACE BUY ORDER" : "PLACE SELL ORDER"}
              </Button>
            </div>

            <div className="text-xs text-gray-400">
              <div>Est. Total: ${(Number.parseInt(quantity) * Number.parseInt(price)).toLocaleString()}</div>
              <div>Commission: $2,500</div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
