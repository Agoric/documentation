"use client"

import { useState, useEffect, useCallback } from "react"
import {
  coinGeckoClient,
  binanceClient,
  type CryptoAsset,
  type OrderBookData,
  type TickerData,
} from "@/lib/api/crypto-exchange-client"
import { cryptoWebSocket, type WebSocketMessage } from "@/lib/api/websocket-client"

export function useCryptoAssets(symbols?: string[]) {
  const [assets, setAssets] = useState<CryptoAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAssets = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await coinGeckoClient.getAssets(symbols)
      setAssets(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch assets")
      console.error("Error fetching crypto assets:", err)
    } finally {
      setLoading(false)
    }
  }, [symbols])

  useEffect(() => {
    fetchAssets()

    // Refresh data every 30 seconds
    const interval = setInterval(fetchAssets, 30000)
    return () => clearInterval(interval)
  }, [fetchAssets])

  return { assets, loading, error, refetch: fetchAssets }
}

export function useOrderBook(symbol: string) {
  const [orderBook, setOrderBook] = useState<OrderBookData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!symbol) return

    const fetchOrderBook = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await binanceClient.getOrderBook(symbol)
        setOrderBook(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch order book")
        console.error("Error fetching order book:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrderBook()

    // Subscribe to real-time order book updates
    const handleOrderBookUpdate = (message: WebSocketMessage) => {
      if (message.type === "orderbook" && message.symbol === symbol) {
        setOrderBook((prev) =>
          prev
            ? {
                ...prev,
                bids: message.data.bids,
                asks: message.data.asks,
                timestamp: message.timestamp,
              }
            : null,
        )
      }
    }

    cryptoWebSocket.subscribeOrderBook(symbol, handleOrderBookUpdate)

    return () => {
      cryptoWebSocket.disconnect("orderbook")
    }
  }, [symbol])

  return { orderBook, loading, error }
}

export function useLivePrices(symbols: string[]) {
  const [prices, setPrices] = useState<Map<string, TickerData>>(new Map())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!symbols.length) return

    const fetchInitialPrices = async () => {
      try {
        setLoading(true)
        setError(null)
        const priceMap = new Map<string, TickerData>()

        await Promise.all(
          symbols.map(async (symbol) => {
            try {
              const ticker = await binanceClient.getTicker(symbol)
              priceMap.set(symbol, ticker)
            } catch (err) {
              console.error(`Error fetching ticker for ${symbol}:`, err)
            }
          }),
        )

        setPrices(priceMap)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch prices")
      } finally {
        setLoading(false)
      }
    }

    fetchInitialPrices()

    // Subscribe to real-time price updates
    const handlePriceUpdate = (message: WebSocketMessage) => {
      if (message.type === "ticker") {
        setPrices(
          (prev) =>
            new Map(
              prev.set(message.symbol, {
                symbol: message.symbol,
                price: message.data.price,
                change: message.data.change,
                changePercent: message.data.change,
                volume: message.data.volume,
                high: message.data.high,
                low: message.data.low,
                timestamp: message.timestamp,
              }),
            ),
        )
      }
    }

    cryptoWebSocket.subscribeTicker(symbols, handlePriceUpdate)

    return () => {
      cryptoWebSocket.disconnect("ticker")
    }
  }, [symbols])

  return { prices, loading, error }
}

export function useMarketData() {
  const [marketData, setMarketData] = useState({
    totalMarketCap: 0,
    totalVolume: 0,
    btcDominance: 0,
    fearGreedIndex: 50,
    activeCoins: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch global market data from CoinGecko
        const response = await fetch("https://api.coingecko.com/api/v3/global")
        if (!response.ok) {
          throw new Error(`Market data API error: ${response.status}`)
        }

        const data = await response.json()
        const globalData = data.data

        setMarketData({
          totalMarketCap: globalData.total_market_cap.usd,
          totalVolume: globalData.total_volume.usd,
          btcDominance: globalData.market_cap_percentage.btc,
          fearGreedIndex: Math.floor(Math.random() * 100), // Mock data - would need separate API
          activeCoins: globalData.active_cryptocurrencies,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch market data")
        console.error("Error fetching market data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMarketData()

    // Refresh every 5 minutes
    const interval = setInterval(fetchMarketData, 300000)
    return () => clearInterval(interval)
  }, [])

  return { marketData, loading, error }
}
