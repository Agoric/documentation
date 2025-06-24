// Cryptocurrency Exchange API Client
export interface ExchangeConfig {
  name: string
  baseUrl: string
  apiKey?: string
  apiSecret?: string
  rateLimit: number
}

export interface CryptoAsset {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  high_24h: number
  low_24h: number
  circulating_supply: number
  last_updated: string
}

export interface OrderBookData {
  symbol: string
  bids: [number, number][] // [price, quantity]
  asks: [number, number][]
  timestamp: number
}

export interface TickerData {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: number
  high: number
  low: number
  timestamp: number
}

class CryptoExchangeClient {
  private config: ExchangeConfig
  private cache: Map<string, { data: any; timestamp: number }> = new Map()
  private readonly CACHE_TTL = 30000 // 30 seconds

  constructor(config: ExchangeConfig) {
    this.config = config
  }

  private async fetchWithCache<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const cached = this.cache.get(key)
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data
    }

    try {
      const data = await fetcher()
      this.cache.set(key, { data, timestamp: Date.now() })
      return data
    } catch (error) {
      console.error(`API Error for ${key}:`, error)
      // Return cached data if available, even if stale
      if (cached) {
        return cached.data
      }
      throw error
    }
  }

  async getAssets(symbols?: string[]): Promise<CryptoAsset[]> {
    const cacheKey = `assets-${symbols?.join(",") || "all"}`

    return this.fetchWithCache(cacheKey, async () => {
      const symbolsParam = symbols ? symbols.join(",") : "bitcoin,ethereum,solana,cardano,polkadot"
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${symbolsParam}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`,
      )

      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`)
      }

      return await response.json()
    })
  }

  async getOrderBook(symbol: string): Promise<OrderBookData> {
    const cacheKey = `orderbook-${symbol}`

    return this.fetchWithCache(cacheKey, async () => {
      // Using Binance API for order book data
      const binanceSymbol = symbol.replace("/", "").toUpperCase()
      const response = await fetch(`https://api.binance.com/api/v3/depth?symbol=${binanceSymbol}&limit=20`)

      if (!response.ok) {
        throw new Error(`Binance API error: ${response.status}`)
      }

      const data = await response.json()

      return {
        symbol,
        bids: data.bids.map(([price, qty]: [string, string]) => [Number.parseFloat(price), Number.parseFloat(qty)]),
        asks: data.asks.map(([price, qty]: [string, string]) => [Number.parseFloat(price), Number.parseFloat(qty)]),
        timestamp: Date.now(),
      }
    })
  }

  async getTicker(symbol: string): Promise<TickerData> {
    const cacheKey = `ticker-${symbol}`

    return this.fetchWithCache(cacheKey, async () => {
      const binanceSymbol = symbol.replace("/", "").toUpperCase()
      const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${binanceSymbol}`)

      if (!response.ok) {
        throw new Error(`Binance ticker API error: ${response.status}`)
      }

      const data = await response.json()

      return {
        symbol,
        price: Number.parseFloat(data.lastPrice),
        change: Number.parseFloat(data.priceChange),
        changePercent: Number.parseFloat(data.priceChangePercent),
        volume: Number.parseFloat(data.volume),
        high: Number.parseFloat(data.highPrice),
        low: Number.parseFloat(data.lowPrice),
        timestamp: Date.now(),
      }
    })
  }

  async getHistoricalData(symbol: string, interval = "1d", limit = 30): Promise<any[]> {
    const cacheKey = `historical-${symbol}-${interval}-${limit}`

    return this.fetchWithCache(cacheKey, async () => {
      const binanceSymbol = symbol.replace("/", "").toUpperCase()
      const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${binanceSymbol}&interval=${interval}&limit=${limit}`,
      )

      if (!response.ok) {
        throw new Error(`Binance historical API error: ${response.status}`)
      }

      const data = await response.json()

      return data.map((candle: any[]) => ({
        timestamp: candle[0],
        open: Number.parseFloat(candle[1]),
        high: Number.parseFloat(candle[2]),
        low: Number.parseFloat(candle[3]),
        close: Number.parseFloat(candle[4]),
        volume: Number.parseFloat(candle[5]),
      }))
    })
  }
}

// Export singleton instances
export const coinGeckoClient = new CryptoExchangeClient({
  name: "CoinGecko",
  baseUrl: "https://api.coingecko.com/api/v3",
  rateLimit: 50, // requests per minute
})

export const binanceClient = new CryptoExchangeClient({
  name: "Binance",
  baseUrl: "https://api.binance.com/api/v3",
  rateLimit: 1200, // requests per minute
})
