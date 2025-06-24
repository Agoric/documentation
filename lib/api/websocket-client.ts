// WebSocket client for real-time cryptocurrency data
export interface WebSocketMessage {
  type: "ticker" | "orderbook" | "trade"
  symbol: string
  data: any
  timestamp: number
}

export type WebSocketCallback = (message: WebSocketMessage) => void

class CryptoWebSocketClient {
  private connections: Map<string, WebSocket> = new Map()
  private callbacks: Map<string, Set<WebSocketCallback>> = new Map()
  private reconnectAttempts: Map<string, number> = new Map()
  private readonly MAX_RECONNECT_ATTEMPTS = 5
  private readonly RECONNECT_DELAY = 5000

  // Binance WebSocket streams
  subscribeTicker(symbols: string[], callback: WebSocketCallback) {
    const streams = symbols.map((symbol) => `${symbol.toLowerCase().replace("/", "")}@ticker`).join("/")

    const url = `wss://stream.binance.com:9443/ws/${streams}`
    this.connect("ticker", url, callback, (data) => ({
      type: "ticker" as const,
      symbol: data.s,
      data: {
        price: Number.parseFloat(data.c),
        change: Number.parseFloat(data.P),
        volume: Number.parseFloat(data.v),
        high: Number.parseFloat(data.h),
        low: Number.parseFloat(data.l),
      },
      timestamp: Date.now(),
    }))
  }

  subscribeOrderBook(symbol: string, callback: WebSocketCallback) {
    const stream = `${symbol.toLowerCase().replace("/", "")}@depth20@100ms`
    const url = `wss://stream.binance.com:9443/ws/${stream}`

    this.connect("orderbook", url, callback, (data) => ({
      type: "orderbook" as const,
      symbol: data.s,
      data: {
        bids: data.bids.map(([price, qty]: [string, string]) => [Number.parseFloat(price), Number.parseFloat(qty)]),
        asks: data.asks.map(([price, qty]: [string, string]) => [Number.parseFloat(price), Number.parseFloat(qty)]),
      },
      timestamp: Date.now(),
    }))
  }

  subscribeTrades(symbol: string, callback: WebSocketCallback) {
    const stream = `${symbol.toLowerCase().replace("/", "")}@trade`
    const url = `wss://stream.binance.com:9443/ws/${stream}`

    this.connect("trades", url, callback, (data) => ({
      type: "trade" as const,
      symbol: data.s,
      data: {
        price: Number.parseFloat(data.p),
        quantity: Number.parseFloat(data.q),
        time: data.T,
        isBuyerMaker: data.m,
      },
      timestamp: Date.now(),
    }))
  }

  private connect(key: string, url: string, callback: WebSocketCallback, transformer: (data: any) => WebSocketMessage) {
    // Close existing connection if any
    this.disconnect(key)

    try {
      const ws = new WebSocket(url)

      ws.onopen = () => {
        console.log(`WebSocket connected: ${key}`)
        this.reconnectAttempts.set(key, 0)
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          const message = transformer(data)
          callback(message)

          // Notify all callbacks for this key
          const callbacks = this.callbacks.get(key)
          if (callbacks) {
            callbacks.forEach((cb) => cb(message))
          }
        } catch (error) {
          console.error(`WebSocket message parsing error for ${key}:`, error)
        }
      }

      ws.onerror = (error) => {
        console.error(`WebSocket error for ${key}:`, error)
      }

      ws.onclose = (event) => {
        console.log(`WebSocket closed for ${key}:`, event.code, event.reason)
        this.connections.delete(key)

        // Attempt to reconnect
        const attempts = this.reconnectAttempts.get(key) || 0
        if (attempts < this.MAX_RECONNECT_ATTEMPTS) {
          this.reconnectAttempts.set(key, attempts + 1)
          setTimeout(
            () => {
              console.log(`Attempting to reconnect ${key} (attempt ${attempts + 1})`)
              this.connect(key, url, callback, transformer)
            },
            this.RECONNECT_DELAY * (attempts + 1),
          )
        }
      }

      this.connections.set(key, ws)

      // Store callback
      if (!this.callbacks.has(key)) {
        this.callbacks.set(key, new Set())
      }
      this.callbacks.get(key)!.add(callback)
    } catch (error) {
      console.error(`Failed to create WebSocket connection for ${key}:`, error)
    }
  }

  disconnect(key: string) {
    const ws = this.connections.get(key)
    if (ws) {
      ws.close()
      this.connections.delete(key)
      this.callbacks.delete(key)
    }
  }

  disconnectAll() {
    this.connections.forEach((ws, key) => {
      ws.close()
    })
    this.connections.clear()
    this.callbacks.clear()
  }
}

export const cryptoWebSocket = new CryptoWebSocketClient()
