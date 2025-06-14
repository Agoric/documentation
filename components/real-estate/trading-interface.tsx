"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign } from "lucide-react"

interface TradingInterfaceProps {
  symbol: string
}

export function TradingInterface({ symbol }: TradingInterfaceProps) {
  const [orderType, setOrderType] = useState("market")
  const [side, setSide] = useState("buy")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")

  const currentPrice = 2500000
  const estimatedTotal = quantity
    ? Number.parseFloat(quantity) * (orderType === "market" ? currentPrice : Number.parseFloat(price || "0"))
    : 0

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-amber-400 text-sm flex items-center">
          <DollarSign className="h-4 w-4 mr-2" />
          TRADING INTERFACE
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={side} onValueChange={setSide}>
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger value="buy" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              BUY
            </TabsTrigger>
            <TabsTrigger value="sell" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              SELL
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-gray-400">ORDER TYPE</Label>
                <Select value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger className="bg-gray-800 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="market">Market Order</SelectItem>
                    <SelectItem value="limit">Limit Order</SelectItem>
                    <SelectItem value="stop">Stop Order</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs text-gray-400">QUANTITY</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="bg-gray-800 border-gray-600 font-mono"
                />
              </div>

              {orderType !== "market" && (
                <div>
                  <Label className="text-xs text-gray-400">PRICE</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="bg-gray-800 border-gray-600 font-mono"
                  />
                </div>
              )}

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Price:</span>
                  <span className="text-white font-mono">${currentPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Estimated Total:</span>
                  <span className="text-green-400 font-mono">${estimatedTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Available Balance:</span>
                  <span className="text-white font-mono">$5,000,000</span>
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={!quantity}>
                PLACE BUY ORDER
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-gray-400">ORDER TYPE</Label>
                <Select value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger className="bg-gray-800 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="market">Market Order</SelectItem>
                    <SelectItem value="limit">Limit Order</SelectItem>
                    <SelectItem value="stop">Stop Order</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs text-gray-400">QUANTITY</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="bg-gray-800 border-gray-600 font-mono"
                />
              </div>

              {orderType !== "market" && (
                <div>
                  <Label className="text-xs text-gray-400">PRICE</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="bg-gray-800 border-gray-600 font-mono"
                  />
                </div>
              )}

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Price:</span>
                  <span className="text-white font-mono">${currentPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Estimated Total:</span>
                  <span className="text-red-400 font-mono">${estimatedTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Holdings:</span>
                  <span className="text-white font-mono">2 units</span>
                </div>
              </div>

              <Button className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={!quantity}>
                PLACE SELL ORDER
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          <Button size="sm" variant="outline" className="text-xs border-gray-600 text-gray-400">
            25%
          </Button>
          <Button size="sm" variant="outline" className="text-xs border-gray-600 text-gray-400">
            50%
          </Button>
          <Button size="sm" variant="outline" className="text-xs border-gray-600 text-gray-400">
            MAX
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
