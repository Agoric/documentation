"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { useLivePrices } from "@/hooks/use-crypto-data"
import { TrendingUp, TrendingDown } from "lucide-react"

interface LivePriceTickerProps {
  symbols: string[]
  className?: string
}

export function LivePriceTicker({ symbols, className = "" }: LivePriceTickerProps) {
  const { prices, loading, error } = useLivePrices(symbols)
  const [animatingPrices, setAnimatingPrices] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Animate price changes
    const newAnimatingPrices = new Set<string>()
    prices.forEach((_, symbol) => {
      newAnimatingPrices.add(symbol)
    })
    setAnimatingPrices(newAnimatingPrices)

    const timer = setTimeout(() => {
      setAnimatingPrices(new Set())
    }, 500)

    return () => clearTimeout(timer)
  }, [prices])

  if (loading) {
    return (
      <div className={`flex gap-4 overflow-x-auto ${className}`}>
        {symbols.map((symbol) => (
          <div key={symbol} className="flex items-center gap-2 min-w-[120px] animate-pulse">
            <div className="w-8 h-8 bg-muted rounded-full" />
            <div>
              <div className="w-12 h-4 bg-muted rounded mb-1" />
              <div className="w-16 h-3 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className={`text-sm text-red-500 ${className}`}>Error loading prices: {error}</div>
  }

  return (
    <div className={`flex gap-6 overflow-x-auto pb-2 ${className}`}>
      {Array.from(prices.entries()).map(([symbol, ticker]) => (
        <div
          key={symbol}
          className={`flex items-center gap-3 min-w-[140px] transition-all duration-300 ${
            animatingPrices.has(symbol) ? "scale-105 bg-primary/5 rounded-lg p-2" : ""
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-sm font-medium">
            {symbol.split("/")[0].charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{symbol.split("/")[0]}</span>
              {ticker.changePercent >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono">
                $
                {ticker.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: ticker.price > 1 ? 2 : 6,
                })}
              </span>
              <Badge variant={ticker.changePercent >= 0 ? "default" : "destructive"} className="text-xs">
                {ticker.changePercent >= 0 ? "+" : ""}
                {ticker.changePercent.toFixed(2)}%
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
