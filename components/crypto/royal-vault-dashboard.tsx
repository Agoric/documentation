"use client"

import { useState, useEffect } from "react"
import { useRoyalVault } from "@/contexts/royal-vault-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Wallet,
  Crown,
  TrendingUp,
  Send,
  Plus,
  Eye,
  EyeOff,
  Shield,
  Lock,
  Unlock,
  Copy,
  RefreshCw,
  Settings,
  PieChart,
  BarChart3,
  Coins,
  Gem,
  Zap,
  Star,
} from "lucide-react"
import { motion } from "framer-motion"

export function RoyalVaultDashboard() {
  const {
    wallets,
    activeWallet,
    setActiveWallet,
    createWallet,
    getPortfolio,
    getCurrencies,
    refreshBalances,
    unlockWallet,
    lockWallet,
  } = useRoyalVault()

  const [portfolio, setPortfolio] = useState<any>(null)
  const [currencies, setCurrencies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [selectedTab, setSelectedTab] = useState("overview")

  // Send transaction state
  const [sendDialogOpen, setSendDialogOpen] = useState(false)
  const [sendForm, setSendForm] = useState({
    toAddress: "",
    amount: "",
    symbol: "ETH",
    memo: "",
  })

  // Create wallet state
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [createForm, setCreateForm] = useState({
    name: "",
    type: "hot" as const,
  })

  useEffect(() => {
    loadDashboardData()
  }, [activeWallet])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      if (activeWallet) {
        const portfolioData = await getPortfolio(activeWallet.walletId)
        setPortfolio(portfolioData)
      }
      const currencyData = getCurrencies()
      setCurrencies(currencyData)
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendTransaction = async () => {
    // Implementation for sending transaction
    console.log("Sending transaction:", sendForm)
    setSendDialogOpen(false)
  }

  const handleCreateWallet = async () => {
    try {
      await createWallet(createForm.name, createForm.type)
      setCreateDialogOpen(false)
      setCreateForm({ name: "", type: "hot" })
    } catch (error) {
      console.error("Failed to create wallet:", error)
    }
  }

  const handleRefreshBalances = async () => {
    if (activeWallet) {
      await refreshBalances(activeWallet.walletId)
      await loadDashboardData()
    }
  }

  const copyToClipboard = (text: string | undefined) => {
    if (text) navigator.clipboard.writeText(text)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <Crown className="w-12 h-12 text-amber-400 mx-auto mb-4 animate-pulse" />
          <p className="text-amber-300 font-serif">Loading Royal Vault...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div className="text-center space-y-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-center space-x-3">
            <Crown className="w-8 h-8 text-amber-400" />
            <h1 className="text-4xl font-bold text-amber-300 font-serif">Royal Vault</h1>
            <Gem className="w-8 h-8 text-purple-400" />
          </div>
          <p className="text-purple-200 font-serif tracking-wider">SOVEREIGN CRYPTOCURRENCY TREASURY</p>
        </motion.div>

        {/* Wallet Selector & Quick Actions */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Select value={activeWallet?.walletId || ""} onValueChange={setActiveWallet}>
                  <SelectTrigger className="w-64 bg-purple-800/30 border-purple-600 text-purple-100">
                    <div className="flex items-center space-x-2">
                      <Wallet className="w-4 h-4" />
                      <SelectValue placeholder="Select wallet" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(wallets).map((wallet) => (
                      <SelectItem key={wallet.walletId} value={wallet.walletId}>
                        <div className="flex items-center space-x-2">
                          <Crown className="w-4 h-4 text-amber-400" />
                          <span>{wallet.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {wallet.type}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {activeWallet && (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(activeWallet?.address)}
                      className="text-purple-200 hover:text-amber-300"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRefreshBalances}
                      className="text-purple-200 hover:text-amber-300"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setBalanceVisible(!balanceVisible)}
                      className="text-purple-200 hover:text-amber-300"
                    >
                      {balanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Wallet
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gradient-to-br from-purple-900 to-indigo-900 border-amber-400/30">
                    <DialogHeader>
                      <DialogTitle className="text-amber-300">Create New Wallet</DialogTitle>
                      <DialogDescription className="text-purple-200">
                        Create a new cryptocurrency wallet in your Royal Vault
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-purple-200">Wallet Name</Label>
                        <Input
                          value={createForm.name}
                          onChange={(e) => setCreateForm((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter wallet name"
                          className="bg-purple-800/30 border-purple-600 text-purple-100"
                        />
                      </div>
                      <div>
                        <Label className="text-purple-200">Wallet Type</Label>
                        <Select
                          value={createForm.type}
                          onValueChange={(value: any) => setCreateForm((prev) => ({ ...prev, type: value }))}
                        >
                          <SelectTrigger className="bg-purple-800/30 border-purple-600 text-purple-100">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hot">Hot Wallet</SelectItem>
                            <SelectItem value="cold">Cold Wallet</SelectItem>
                            <SelectItem value="hardware">Hardware Wallet</SelectItem>
                            <SelectItem value="multisig">Multi-Signature</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        onClick={handleCreateWallet}
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600"
                      >
                        Create Wallet
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={sendDialogOpen} onOpenChange={setSendDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      disabled={!activeWallet}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gradient-to-br from-purple-900 to-indigo-900 border-amber-400/30">
                    <DialogHeader>
                      <DialogTitle className="text-amber-300">Send Cryptocurrency</DialogTitle>
                      <DialogDescription className="text-purple-200">
                        Send crypto from your Royal Vault
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-purple-200">To Address</Label>
                        <Input
                          value={sendForm.toAddress}
                          onChange={(e) => setSendForm((prev) => ({ ...prev, toAddress: e.target.value }))}
                          placeholder="0x..."
                          className="bg-purple-800/30 border-purple-600 text-purple-100"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-purple-200">Amount</Label>
                          <Input
                            type="number"
                            value={sendForm.amount}
                            onChange={(e) => setSendForm((prev) => ({ ...prev, amount: e.target.value }))}
                            placeholder="0.00"
                            className="bg-purple-800/30 border-purple-600 text-purple-100"
                          />
                        </div>
                        <div>
                          <Label className="text-purple-200">Asset</Label>
                          <Select
                            value={sendForm.symbol}
                            onValueChange={(value) => setSendForm((prev) => ({ ...prev, symbol: value }))}
                          >
                            <SelectTrigger className="bg-purple-800/30 border-purple-600 text-purple-100">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {(activeWallet ? Object.keys(activeWallet.balances) : ["ETH"]) // safe fallback
                                .map((symbol) => (
                                  <SelectItem key={symbol} value={symbol}>
                                    {symbol}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label className="text-purple-200">Memo (Optional)</Label>
                        <Input
                          value={sendForm.memo}
                          onChange={(e) => setSendForm((prev) => ({ ...prev, memo: e.target.value }))}
                          placeholder="Transaction memo"
                          className="bg-purple-800/30 border-purple-600 text-purple-100"
                        />
                      </div>
                      <Button
                        onClick={handleSendTransaction}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
                      >
                        Send Transaction
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Overview */}
        {activeWallet && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="bg-gradient-to-br from-amber-900/50 to-yellow-900/50 border-amber-400/30">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-amber-200">Total Portfolio Value</CardTitle>
                  <Crown className="h-4 w-4 text-amber-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-300">
                    {balanceVisible ? `$${activeWallet.totalValueUSD.toLocaleString()}` : "••••••"}
                  </div>
                  <p className="text-xs text-amber-200 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />+{portfolio?.totalChangePercent24h.toFixed(2)}% (24h)
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-200">24h Change</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">
                    {balanceVisible ? `+$${portfolio?.totalChange24h.toLocaleString()}` : "••••••"}
                  </div>
                  <p className="text-xs text-green-200">Portfolio performance</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="bg-gradient-to-br from-purple-900/50 to-violet-900/50 border-purple-400/30">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-200">Assets</CardTitle>
                  <Coins className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-400">{Object.keys(activeWallet.balances).length}</div>
                  <p className="text-xs text-purple-200">Different cryptocurrencies</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Main Dashboard */}
        {activeWallet && (
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="bg-purple-900/50 border-amber-400/30">
              <TabsTrigger value="overview" className="data-[state=active]:bg-amber-500/20">
                <PieChart className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="assets" className="data-[state=active]:bg-amber-500/20">
                <Coins className="w-4 h-4 mr-2" />
                Assets
              </TabsTrigger>
              <TabsTrigger value="transactions" className="data-[state=active]:bg-amber-500/20">
                <BarChart3 className="w-4 h-4 mr-2" />
                Transactions
              </TabsTrigger>
              <TabsTrigger value="defi" className="data-[state=active]:bg-amber-500/20">
                <Zap className="w-4 h-4 mr-2" />
                DeFi
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-amber-500/20">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Asset Allocation */}
                <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
                  <CardHeader>
                    <CardTitle className="text-amber-300 font-serif">Asset Allocation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {portfolio?.diversification.map((asset: any, index: number) => (
                      <div key={asset.category} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-purple-200">{asset.category}</span>
                          <span className="text-amber-300">{asset.percentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={asset.percentage} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Top Assets */}
                <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
                  <CardHeader>
                    <CardTitle className="text-amber-300 font-serif">Top Holdings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {portfolio?.topAssets.map((asset: any) => (
                      <div key={asset.symbol} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{asset.symbol.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-purple-100 font-medium">{asset.symbol}</p>
                            <p className="text-purple-300 text-sm">{asset.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-amber-300 font-semibold">${asset.value.toLocaleString()}</p>
                          <p className={`text-sm ${asset.change24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {asset.change24h >= 0 ? "+" : ""}
                            {asset.change24h.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Assets Tab */}
            <TabsContent value="assets" className="space-y-6">
              <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
                <CardHeader>
                  <CardTitle className="text-amber-300 font-serif">Your Assets</CardTitle>
                  <CardDescription className="text-purple-200">
                    Cryptocurrency holdings in {activeWallet.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.values(activeWallet.balances).map((balance) => (
                      <motion.div
                        key={balance.symbol}
                        className="flex items-center justify-between p-4 bg-purple-800/20 rounded-lg border border-amber-400/20"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-white">{balance.symbol}</span>
                          </div>
                          <div>
                            <p className="text-purple-100 font-semibold">{balance.name}</p>
                            <p className="text-purple-300 text-sm">{balance.symbol}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-amber-300 font-bold">
                            {balanceVisible ? balance.amount.toFixed(6) : "••••••"} {balance.symbol}
                          </p>
                          <p className="text-purple-200">
                            {balanceVisible ? `$${balance.valueUSD.toLocaleString()}` : "••••••"}
                          </p>
                          <p className={`text-sm ${balance.change24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {balance.change24h >= 0 ? "+" : ""}
                            {balance.change24h.toFixed(2)}%
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Transactions Tab */}
            <TabsContent value="transactions" className="space-y-6">
              <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
                <CardHeader>
                  <CardTitle className="text-amber-300 font-serif">Transaction History</CardTitle>
                  <CardDescription className="text-purple-200">Recent cryptocurrency transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BarChart3 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <p className="text-purple-300">No transactions yet</p>
                    <p className="text-purple-400 text-sm">Your transaction history will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* DeFi Tab */}
            <TabsContent value="defi" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
                  <CardHeader>
                    <CardTitle className="text-blue-300 font-serif">Staking Positions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Star className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                      <p className="text-blue-300">No staking positions</p>
                      <Button className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600">Start Staking</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
                  <CardHeader>
                    <CardTitle className="text-green-300 font-serif">DeFi Positions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Zap className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <p className="text-green-300">No DeFi positions</p>
                      <Button className="mt-4 bg-gradient-to-r from-green-500 to-green-600">Explore DeFi</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
                  <CardHeader>
                    <CardTitle className="text-amber-300 font-serif">Wallet Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-200">Wallet Status:</span>
                      <Badge variant={activeWallet.isLocked ? "destructive" : "default"}>
                        {activeWallet.isLocked ? (
                          <>
                            <Lock className="w-3 h-3 mr-1" />
                            Locked
                          </>
                        ) : (
                          <>
                            <Unlock className="w-3 h-3 mr-1" />
                            Unlocked
                          </>
                        )}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-200">Security Level:</span>
                      <Badge variant="outline" className="text-amber-300">
                        {activeWallet.securityLevel.toUpperCase()}
                      </Badge>
                    </div>
                    <Separator className="bg-purple-600/30" />
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full bg-purple-800/30 border-purple-600 text-purple-100">
                        <Shield className="w-4 h-4 mr-2" />
                        Backup Seed Phrase
                      </Button>
                      <Button variant="outline" className="w-full bg-purple-800/30 border-purple-600 text-purple-100">
                        <Lock className="w-4 h-4 mr-2" />
                        Change Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
                  <CardHeader>
                    <CardTitle className="text-amber-300 font-serif">Wallet Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-purple-200">Wallet Address</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Input
                          value={activeWallet.address}
                          readOnly
                          className="bg-purple-800/30 border-purple-600 text-purple-100 font-mono text-sm"
                        />
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(activeWallet.address)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label className="text-purple-200">Network</Label>
                      <p className="text-purple-100 mt-1 capitalize">{activeWallet.network}</p>
                    </div>
                    <div>
                      <Label className="text-purple-200">Created</Label>
                      <p className="text-purple-100 mt-1">{activeWallet.createdAt.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <Label className="text-purple-200">Last Activity</Label>
                      <p className="text-purple-100 mt-1">{activeWallet.lastActivity.toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* No Wallet State */}
        {!activeWallet && Object.keys(wallets).length === 0 && (
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
            <CardContent className="text-center py-12">
              <Crown className="w-16 h-16 text-amber-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-amber-300 mb-4 font-serif">Welcome to Royal Vault</h2>
              <p className="text-purple-200 mb-6">
                Create your first cryptocurrency wallet to begin your sovereign financial journey
              </p>
              <Button
                onClick={() => setCreateDialogOpen(true)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Wallet
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
