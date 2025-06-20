"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DiamondSlabCard } from "@/components/ui/diamond-slab-card"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Crown,
  TrendingUp,
  TrendingDown,
  Zap,
  Shield,
  Coins,
  ArrowUpDown,
  Globe,
  Sparkles,
  Target,
  BarChart3,
} from "lucide-react"
import { motion } from "framer-motion"

interface CryptoCurrency {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  rank: number
  isImperial?: boolean
  isSupreme?: boolean
  description: string
  features: string[]
}

interface Portfolio {
  currency: string
  amount: number
  value: number
  allocation: number
  pnl: number
  pnlPercent: number
}

interface Trade {
  id: string
  type: "buy" | "sell" | "swap"
  fromCurrency: string
  toCurrency: string
  amount: number
  price: number
  total: number
  status: "completed" | "pending" | "failed"
  timestamp: Date
  fee: number
}

const mockCryptocurrencies: CryptoCurrency[] = [
  {
    id: "imperial-coin",
    symbol: "IMP",
    name: "Imperial Coin",
    price: 2847.92,
    change24h: 12.47,
    volume24h: 847293847,
    marketCap: 28472938472,
    rank: 1,
    isImperial: true,
    description: "The sovereign digital currency of the Imperial Financial Network",
    features: ["Quantum Security", "Diplomatic Immunity", "Global Acceptance", "Zero Fees for Nobles"],
  },
  {
    id: "supreme-token",
    symbol: "SUP",
    name: "Supreme Authority Token",
    price: 4729.18,
    change24h: 8.92,
    volume24h: 293847293,
    marketCap: 47291847291,
    rank: 2,
    isSupreme: true,
    description: "Ultra-premium governance token for Supreme Authority holders",
    features: ["Voting Rights", "Exclusive Access", "Staking Rewards", "Diplomatic Privileges"],
  },
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    price: 67420.5,
    change24h: -2.34,
    volume24h: 28472938472,
    marketCap: 1284729384729,
    rank: 3,
    description: "The original cryptocurrency",
    features: ["Store of Value", "Global Recognition", "Decentralized", "Limited Supply"],
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 3847.29,
    change24h: 5.67,
    volume24h: 18472938472,
    marketCap: 384729384729,
    rank: 4,
    description: "Smart contract platform",
    features: ["Smart Contracts", "DeFi Ecosystem", "NFT Platform", "Staking Available"],
  },
  {
    id: "qgi-token",
    symbol: "QGI",
    name: "Quantum Global Initiative",
    price: 847.29,
    change24h: 15.83,
    volume24h: 84729384,
    marketCap: 8472938472,
    rank: 5,
    isImperial: true,
    description: "Social impact cryptocurrency for global citizenship programs",
    features: ["Social Impact", "Global Citizenship", "Carbon Neutral", "Community Governance"],
  },
]

const mockPortfolio: Portfolio[] = [
  {
    currency: "IMP",
    amount: 125.47,
    value: 357293.84,
    allocation: 45.2,
    pnl: 47293.84,
    pnlPercent: 15.24,
  },
  {
    currency: "SUP",
    amount: 89.23,
    value: 421847.29,
    allocation: 32.8,
    pnl: 84729.38,
    pnlPercent: 25.12,
  },
  {
    currency: "BTC",
    amount: 2.847,
    value: 192047.83,
    allocation: 15.6,
    pnl: -8472.93,
    pnlPercent: -4.22,
  },
  {
    currency: "ETH",
    amount: 12.94,
    value: 49784.29,
    allocation: 6.4,
    pnl: 2847.29,
    pnlPercent: 6.07,
  },
]

const mockTrades: Trade[] = Array.from({ length: 15 }, (_, i) => ({
  id: `trade_${i + 1}`,
  type: ["buy", "sell", "swap"][Math.floor(Math.random() * 3)] as any,
  fromCurrency: mockCryptocurrencies[Math.floor(Math.random() * mockCryptocurrencies.length)].symbol,
  toCurrency: mockCryptocurrencies[Math.floor(Math.random() * mockCryptocurrencies.length)].symbol,
  amount: Math.round((Math.random() * 10 + 0.1) * 100) / 100,
  price: Math.round((Math.random() * 5000 + 100) * 100) / 100,
  total: Math.round((Math.random() * 50000 + 1000) * 100) / 100,
  status: ["completed", "pending"][Math.floor(Math.random() * 2)] as any,
  timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
  fee: Math.round((Math.random() * 100 + 5) * 100) / 100,
}))

export function ImperialCryptoExchange() {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency>(mockCryptocurrencies[0])
  const [portfolio] = useState<Portfolio[]>(mockPortfolio)
  const [trades] = useState<Trade[]>(mockTrades)
  const [tradeType, setTradeType] = useState<"buy" | "sell" | "swap">("buy")
  const [tradeAmount, setTradeAmount] = useState<number>(0)
  const [showTradeDialog, setShowTradeDialog] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const totalPortfolioValue = portfolio.reduce((sum, item) => sum + item.value, 0)
  const totalPnL = portfolio.reduce((sum, item) => sum + item.pnl, 0)
  const totalPnLPercent = (totalPnL / (totalPortfolioValue - totalPnL)) * 100

  const getCryptoIcon = (crypto: CryptoCurrency) => {
    if (crypto.isSupreme) return <Crown className="w-5 h-5 text-purple-400" />
    if (crypto.isImperial) return <Shield className="w-5 h-5 text-amber-400" />
    return <Coins className="w-5 h-5 text-blue-400" />
  }

  const getCryptoBadge = (crypto: CryptoCurrency) => {
    if (crypto.isSupreme) {
      return (
        <Badge
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-serif"
          style={{
            clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          }}
        >
          SUPREMUS
        </Badge>
      )
    }
    if (crypto.isImperial) {
      return (
        <Badge
          className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-serif"
          style={{
            clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          }}
        >
          IMPERIALIS
        </Badge>
      )
    }
    return (
      <Badge
        className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-serif"
        style={{
          clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
        }}
      >
        PUBLICUS
      </Badge>
    )
  }

  const handleTrade = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setShowTradeDialog(false)
    setTradeAmount(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Imperial Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Zap className="w-8 h-8 text-amber-400" />
            <h1 className="text-4xl font-bold text-amber-300 font-serif">CRYPTA IMPERIALIS</h1>
            <Zap className="w-8 h-8 text-amber-400" />
          </div>
          <p className="text-purple-200 font-serif tracking-wider text-lg">
            MONETA DIGITALIS • AUCTORITAS SUPREMA • COMMERCIUM GLOBALE
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-purple-300">
            <span className="font-serif">QUANTUM SECURITY EXCHANGE</span>
            <span>•</span>
            <span className="font-serif">DIPLOMATIC TRADING PRIVILEGES</span>
            <span>•</span>
            <span className="font-serif">IMPERIAL ASSET MANAGEMENT</span>
          </div>
        </motion.div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <DiamondSlabCard variant="quantum" intensity="high" laserColor="gold">
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-amber-300 font-serif text-sm">VALOR TOTALIS</h3>
                <Crown className="w-5 h-5 text-amber-400" />
              </div>
              <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text">
                ${totalPortfolioValue.toLocaleString()}
              </p>
              <p className="text-purple-300 text-xs font-serif">USD</p>
            </div>
          </DiamondSlabCard>

          <DiamondSlabCard variant="elite" intensity="high" laserColor="emerald">
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-amber-300 font-serif text-sm">LUCRUM/DAMNUM</h3>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <p className={`text-2xl font-bold ${totalPnL >= 0 ? "text-green-400" : "text-red-400"}`}>
                {totalPnL >= 0 ? "+" : ""}${totalPnL.toLocaleString()}
              </p>
              <p className={`text-xs font-serif ${totalPnLPercent >= 0 ? "text-green-300" : "text-red-300"}`}>
                {totalPnLPercent >= 0 ? "+" : ""}{totalPnLPercent.toFixed(2)}%
              </p>
            </div>
          </DiamondSlabCard>

          <DiamondSlabCard variant="premium" intensity="medium" laserColor="cyan">
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-amber-300 font-serif text-sm">ACTIVA</h3>
                <Coins className="w-5 h-5 text-cyan-400" />
              </div>
              <p className="text-2xl font-bold text-cyan-400">{portfolio.length}</p>
              <p className="text-purple-300 text-xs font-serif">CRYPTOCURRENCIES</p>
            </div>
          </DiamondSlabCard>

          <DiamondSlabCard variant="premium" intensity="medium" laserColor="purple">
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-amber-300 font-serif text-sm">NEGOTIATIONES</h3>
                <BarChart3 className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-purple-400">{trades.filter((t) => t.status === "completed").length}</p>
              <p className="text-purple-300 text-xs font-serif">24H COMPLETED</p>
            </div>
          </DiamondSlabCard>
        </div>

        {/* Main Trading Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Market Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cryptocurrency List */}
            <DiamondSlabCard variant="elite" intensity="medium" laserColor="emerald">
              <div className="p-6">
                <h3 className="text-amber-300 font-serif text-xl mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  MERCATUS CRYPTOGRAPHICUS
                </h3>

                <div className="space-y-3">
                  {mockCryptocurrencies.map((crypto, index) => (
                    <motion.div
                      key={crypto.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer ${
                        selectedCrypto.id === crypto.id
                          ? "border-amber-400/50 bg-amber-400/10"
                          : "border-purple-600/30 bg-purple-800/20 hover:border-purple-400/50"
                      }`}
                      onClick={() => setSelectedCrypto(crypto)}
                    >
                      <div className="flex items-center space-x-4">
                        {getCryptoIcon(crypto)}
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-purple-100 font-semibold">{crypto.name}</h4>
                            {getCryptoBadge(crypto)}
                          </div>
                          <p className="text-purple-300 text-sm font-mono">{crypto.symbol}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-purple-100 font-bold text-lg">${crypto.price.toLocaleString()}</p>
                        <div className="flex items-center space-x-2">
                          {crypto.change24h >= 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-400" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-400" />
                          )}
                          <span
                            className={`text-sm font-semibold ${
                              crypto.change24h >= 0 ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {crypto.change24h >= 0 ? "+" : ""}{crypto.change24h.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </DiamondSlabCard>

            {/* Portfolio Allocation */}
            <DiamondSlabCard variant="premium" intensity="medium" laserColor="cyan">
              <div className="p-6">
                <h3 className="text-amber-300 font-serif text-xl mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  PORTFOLIO DISTRIBUTIO
                </h3>

                <div className="space-y-4">
                  {portfolio.map((item, index) => (
                    <motion.div
                      key={item.currency}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-purple-100 font-semibold">{item.currency}</span>
                          <Badge variant="outline" className="text-xs">
                            {item.allocation.toFixed(1)}%
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-purple-100 font-semibold">${item.value.toLocaleString()}</p>
                          <p className={`text-xs ${item.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {item.pnl >= 0 ? "+" : ""}${item.pnl.toLocaleString()} ({item.pnlPercent >= 0 ? "+" : ""}
                            {item.pnlPercent.toFixed(2)}%)
                          </p>
                        </div>
                      </div>
                      <Progress value={item.allocation} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </DiamondSlabCard>
          </div>

          {/* Trading Panel */}
          <div className="space-y-6">
            {/* Quick Trade */}
            <DiamondSlabCard variant="quantum" intensity="high" laserColor="purple">
              <div className="p-6">
                <h3 className="text-amber-300 font-serif text-lg mb-4 flex items-center">
                  <ArrowUpDown className="w-5 h-5 mr-2" />
                  NEGOTIATIO CELERIS
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-purple-200 font-serif">Cryptocurrency</Label>
                    <Select value={selectedCrypto.symbol} onValueChange={(value) => {
                      const crypto = mockCryptocurrencies.find(c => c.symbol === value)
                      if (crypto) setSelectedCrypto(crypto)
                    }}>
                      <SelectTrigger className="bg-purple-800/30 border-purple-600 text-purple-100">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCryptocurrencies.map((crypto) => (
                          <SelectItem key={crypto.id} value={crypto.symbol}>
                            {crypto.symbol} - {crypto.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-purple-200 font-serif">Trade Type</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {["buy", "sell", "swap"].map((type) => (
                        <Button
                          key={type}
                          variant={tradeType === type ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTradeType(type as any)}
                          className={
                            tradeType === type
                              ? "bg-amber-600 text-white"
                              : "bg-purple-800/30 border-purple-600 text-purple-100"
                          }
                        >
                          {type.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-purple-200 font-serif">Amount</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={tradeAmount || ""}
                      onChange={(e) => setTradeAmount(Number(e.target.value))}
                      className="bg-purple-800/30 border-purple-600 text-purple-100"
                    />
                    <p className="text-purple-300 text-xs">
                      ≈ ${(tradeAmount * selectedCrypto.price).toLocaleString()} USD
                    </p>
                  </div>

                  <Dialog open={showTradeDialog} onOpenChange={setShowTradeDialog}>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
                        disabled={!tradeAmount}
                        style={{
                          clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                        }}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        <span className="font-serif">EXECUTE TRADE</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gradient-to-br from-purple-900 to-indigo-900 border-amber-400/30 text-purple-100">
                      <DialogHeader>
                        <DialogTitle className="text-amber-300 font-serif">CONFIRM IMPERIAL TRADE</DialogTitle>
                        <DialogDescription className="text-purple-200 font-serif">
                          Review your transaction details
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        <div className="p-4 bg-purple-800/30 rounded-lg border border-purple-600/30">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-purple-300 font-serif">Action:</span>
                              <span className="text-purple-100 uppercase font-semibold">{tradeType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-purple-300 font-serif">Asset:</span>
                              <span className="text-purple-100">{selectedCrypto.name} ({selectedCrypto.symbol})</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-purple-300 font-serif">Amount:</span>
                              <span className="text-purple-100">{tradeAmount} {selectedCrypto.symbol}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-purple-300 font-serif">Price:</span>
                              <span className="text-purple-100">${selectedCrypto.price.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-purple-300 font-serif">Total:</span>
                              <span className="text-amber-300 font-bold">
                                ${(tradeAmount * selectedCrypto.price).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-purple-300 font-serif">Fee:</span>
                              <span className="text-purple-100">
                                {selectedCrypto.isImperial || selectedCrypto.isSupreme ? "FREE" : "$25.00"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={handleTrade}
                          disabled={isProcessing}
                          className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
                        >
                          {isProcessing ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="w-4 h-4 mr-2"
                              >
                                <Sparkles className="w-4 h-4" />
                              </motion.div>
                              Processing...
                            </>
                          ) : (
                            <>
                              <Zap className="w-4 h-4 mr-2" />
                              Confirm Trade
                            </>
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </DiamondSlabCard>

            {/* Selected Crypto Details */}
            <DiamondSlabCard variant="elite" intensity="medium" laserColor="gold">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-amber-300 font-serif text-lg flex items-center">
                    {getCryptoIcon(selectedCrypto)}
                    <span className="ml-2">{selectedCrypto.symbol}</span>
                  </h3>
                  {getCryptoBadge(selectedCrypto)}
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-purple-300 text-sm font-serif mb-1">PRETIUM\
