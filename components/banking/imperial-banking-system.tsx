"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DiamondSlabCard } from "@/components/ui/diamond-slab-card"
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
  Shield,
  Coins,
  TrendingUp,
  Send,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Banknote,
  Vault,
  Globe,
  Zap,
  Star,
  Lock,
  Sparkles,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface BankAccount {
  id: string
  accountNumber: string
  accountType: "checking" | "savings" | "investment" | "imperial" | "sovereign"
  balance: number
  currency: string
  status: "active" | "frozen" | "pending" | "closed"
  tier: "citizen" | "noble" | "imperial" | "sovereign"
  features: string[]
  interestRate?: number
  minimumBalance?: number
  monthlyFee?: number
  privileges: string[]
}

interface Transaction {
  id: string
  accountId: string
  type: "deposit" | "withdrawal" | "transfer" | "payment" | "interest" | "dividend" | "tribute"
  amount: number
  currency: string
  description: string
  recipient?: string
  sender?: string
  status: "completed" | "pending" | "failed" | "processing"
  timestamp: Date
  category: string
  metadata: {
    location?: string
    method: string
    reference: string
  }
}

interface TransferRequest {
  fromAccount: string
  toAccount: string
  amount: number
  currency: string
  description: string
  priority: "standard" | "expedited" | "imperial"
}

const mockAccounts: BankAccount[] = [
  {
    id: "acc_imperial_001",
    accountNumber: "IMPERIUM-7749-2847-9156",
    accountType: "imperial",
    balance: 2847593.42,
    currency: "USD",
    status: "active",
    tier: "imperial",
    features: [
      "Unlimited Transactions",
      "Global Access",
      "Concierge Banking",
      "Investment Advisory",
      "Tax Optimization",
      "Estate Planning",
    ],
    interestRate: 4.75,
    minimumBalance: 100000,
    monthlyFee: 0,
    privileges: [
      "Priority Customer Service",
      "Exclusive Investment Opportunities",
      "Global Banking Network",
      "Personal Banking Advisor",
      "Diplomatic Banking Services",
      "Sovereign Wealth Management",
    ],
  },
  {
    id: "acc_sovereign_001",
    accountNumber: "SOVEREIGN-4429-8847-1156",
    accountType: "sovereign",
    balance: 847293.18,
    currency: "USD",
    status: "active",
    tier: "sovereign",
    features: [
      "Supreme Authority Access",
      "Quantum Security",
      "Global Diplomatic Banking",
      "Unlimited Transfers",
      "Premium Investment Access",
    ],
    interestRate: 6.25,
    minimumBalance: 500000,
    monthlyFee: 0,
    privileges: [
      "Supreme Banking Authority",
      "Diplomatic Immunity Banking",
      "Global Sovereign Network",
      "Ultra-High Net Worth Services",
      "Exclusive Sovereign Investments",
    ],
  },
  {
    id: "acc_checking_001",
    accountNumber: "CITIZEN-2847-9156-7749",
    accountType: "checking",
    balance: 15847.92,
    currency: "USD",
    status: "active",
    tier: "citizen",
    features: ["Mobile Banking", "Online Transfers", "Bill Pay", "ATM Access"],
    interestRate: 0.5,
    minimumBalance: 1000,
    monthlyFee: 15,
    privileges: ["Standard Banking Services", "Customer Support", "Basic Investment Access"],
  },
]

const mockTransactions: Transaction[] = Array.from({ length: 25 }, (_, i) => ({
  id: `txn_${i + 1}`,
  accountId: mockAccounts[Math.floor(Math.random() * mockAccounts.length)].id,
  type: ["deposit", "withdrawal", "transfer", "payment", "interest", "dividend", "tribute"][
    Math.floor(Math.random() * 7)
  ] as any,
  amount: Math.round((Math.random() * 50000 + 100) * 100) / 100,
  currency: "USD",
  description: [
    "Imperial Treasury Deposit",
    "Sovereign Wealth Transfer",
    "Noble Estate Payment",
    "Diplomatic Service Fee",
    "Investment Dividend",
    "Royal Treasury Tribute",
    "Global Commerce Transaction",
  ][Math.floor(Math.random() * 7)],
  recipient: Math.random() > 0.5 ? "Imperial Treasury" : undefined,
  sender: Math.random() > 0.5 ? "Sovereign Authority" : undefined,
  status: ["completed", "pending", "processing"][Math.floor(Math.random() * 3)] as any,
  timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
  category: ["Banking", "Investment", "Commerce", "Treasury", "Diplomatic"][Math.floor(Math.random() * 5)],
  metadata: {
    location: ["New York", "London", "Geneva", "Singapore", "Dubai"][Math.floor(Math.random() * 5)],
    method: ["Wire Transfer", "ACH", "Imperial Network", "Sovereign Protocol"][Math.floor(Math.random() * 4)],
    reference: `REF${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
  },
}))

export function ImperialBankingSystem() {
  const [selectedAccount, setSelectedAccount] = useState<BankAccount>(mockAccounts[0])
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [transferRequest, setTransferRequest] = useState<TransferRequest>({
    fromAccount: "",
    toAccount: "",
    amount: 0,
    currency: "USD",
    description: "",
    priority: "standard",
  })
  const [showTransferDialog, setShowTransferDialog] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "sovereign":
        return "from-purple-600 via-pink-600 to-purple-700"
      case "imperial":
        return "from-amber-600 via-yellow-600 to-amber-700"
      case "noble":
        return "from-blue-600 via-cyan-600 to-blue-700"
      case "citizen":
        return "from-green-600 via-emerald-600 to-green-700"
      default:
        return "from-gray-600 via-slate-600 to-gray-700"
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "sovereign":
        return <Crown className="w-5 h-5 text-purple-300" />
      case "imperial":
        return <Shield className="w-5 h-5 text-amber-300" />
      case "noble":
        return <Star className="w-5 h-5 text-blue-300" />
      case "citizen":
        return <Coins className="w-5 h-5 text-green-300" />
      default:
        return <Coins className="w-5 h-5 text-gray-300" />
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="w-4 h-4 text-green-500" />
      case "withdrawal":
        return <ArrowUpRight className="w-4 h-4 text-red-500" />
      case "transfer":
        return <Send className="w-4 h-4 text-blue-500" />
      case "payment":
        return <CreditCard className="w-4 h-4 text-purple-500" />
      case "interest":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "dividend":
        return <Coins className="w-4 h-4 text-amber-500" />
      case "tribute":
        return <Crown className="w-4 h-4 text-purple-500" />
      default:
        return <Banknote className="w-4 h-4 text-gray-500" />
    }
  }

  const handleTransfer = async () => {
    setIsProcessing(true)
    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newTransaction: Transaction = {
      id: `txn_${Date.now()}`,
      accountId: transferRequest.fromAccount,
      type: "transfer",
      amount: transferRequest.amount,
      currency: transferRequest.currency,
      description: transferRequest.description,
      recipient: transferRequest.toAccount,
      status: "processing",
      timestamp: new Date(),
      category: "Banking",
      metadata: {
        method: transferRequest.priority === "imperial" ? "Imperial Network" : "Standard Transfer",
        reference: `REF${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      },
    }

    setTransactions((prev) => [newTransaction, ...prev])
    setIsProcessing(false)
    setShowTransferDialog(false)
    setTransferRequest({
      fromAccount: "",
      toAccount: "",
      amount: 0,
      currency: "USD",
      description: "",
      priority: "standard",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Imperial Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Crown className="w-8 h-8 text-amber-400" />
            <h1 className="text-4xl font-bold text-amber-300 font-serif">IMPERIUM BANKING</h1>
            <Crown className="w-8 h-8 text-amber-400" />
          </div>
          <p className="text-purple-200 font-serif tracking-wider text-lg">AUCTORITAS • SECURITAS • PROSPERITAS</p>
          <div className="flex items-center justify-center space-x-6 text-sm text-purple-300">
            <span className="font-serif">GLOBAL SOVEREIGN BANKING</span>
            <span>•</span>
            <span className="font-serif">DIPLOMATIC FINANCIAL SERVICES</span>
            <span>•</span>
            <span className="font-serif">IMPERIAL WEALTH MANAGEMENT</span>
          </div>
        </motion.div>

        {/* Account Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {mockAccounts.map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <DiamondSlabCard
                variant={account.tier === "sovereign" ? "quantum" : account.tier === "imperial" ? "elite" : "premium"}
                intensity="high"
                laserColor={account.tier === "sovereign" ? "purple" : "gold"}
                isHovered={selectedAccount.id === account.id}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedAccount.id === account.id ? "ring-2 ring-amber-400" : ""
                }`}
                onClick={() => setSelectedAccount(account)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {getTierIcon(account.tier)}
                      <Badge
                        className={`bg-gradient-to-r ${getTierColor(account.tier)} text-white font-serif`}
                        style={{
                          clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                        }}
                      >
                        {account.tier.toUpperCase()}
                      </Badge>
                    </div>
                    <Badge
                      variant={account.status === "active" ? "default" : "secondary"}
                      className="font-serif text-xs"
                    >
                      {account.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-purple-300 text-sm font-serif">NUMERUS RATIONIS</p>
                      <p className="text-purple-100 font-mono text-sm">{account.accountNumber}</p>
                    </div>

                    <div>
                      <p className="text-purple-300 text-sm font-serif">SALDO</p>
                      <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text">
                        ${account.balance.toLocaleString()}
                      </p>
                      <p className="text-purple-300 text-xs">{account.currency}</p>
                    </div>

                    {account.interestRate && (
                      <div>
                        <p className="text-purple-300 text-sm font-serif">USURA ANNUA</p>
                        <p className="text-green-400 font-semibold">{account.interestRate}% APY</p>
                      </div>
                    )}

                    <div className="pt-2">
                      <p className="text-purple-300 text-xs font-serif mb-2">PRIVILEGIA</p>
                      <div className="flex flex-wrap gap-1">
                        {account.privileges.slice(0, 2).map((privilege) => (
                          <Badge
                            key={privilege}
                            variant="outline"
                            className="text-xs border-amber-400/30 text-amber-300"
                            style={{
                              clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
                            }}
                          >
                            {privilege}
                          </Badge>
                        ))}
                        {account.privileges.length > 2 && (
                          <Badge
                            variant="outline"
                            className="text-xs border-amber-400/30 text-amber-300"
                            style={{
                              clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
                            }}
                          >
                            +{account.privileges.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </DiamondSlabCard>
            </motion.div>
          ))}
        </div>

        {/* Main Banking Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Account Details & Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <DiamondSlabCard variant="premium" intensity="medium" laserColor="cyan">
              <div className="p-6">
                <h3 className="text-amber-300 font-serif text-xl mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  ACTIONES CELERIS
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                        style={{
                          clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                        }}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        <span className="font-serif text-xs">TRANSFERRE</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gradient-to-br from-purple-900 to-indigo-900 border-amber-400/30 text-purple-100 max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-amber-300 font-serif">IMPERIAL TRANSFER</DialogTitle>
                        <DialogDescription className="text-purple-200 font-serif">
                          Execute sovereign financial transfer
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-purple-200 font-serif">From Account</Label>
                          <Select
                            value={transferRequest.fromAccount}
                            onValueChange={(value) => setTransferRequest((prev) => ({ ...prev, fromAccount: value }))}
                          >
                            <SelectTrigger className="bg-purple-800/30 border-purple-600 text-purple-100">
                              <SelectValue placeholder="Select account" />
                            </SelectTrigger>
                            <SelectContent>
                              {mockAccounts.map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                  {account.accountNumber} - ${account.balance.toLocaleString()}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-purple-200 font-serif">To Account</Label>
                          <Input
                            placeholder="Recipient account number"
                            value={transferRequest.toAccount}
                            onChange={(e) => setTransferRequest((prev) => ({ ...prev, toAccount: e.target.value }))}
                            className="bg-purple-800/30 border-purple-600 text-purple-100"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-purple-200 font-serif">Amount</Label>
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={transferRequest.amount || ""}
                            onChange={(e) =>
                              setTransferRequest((prev) => ({ ...prev, amount: Number(e.target.value) }))
                            }
                            className="bg-purple-800/30 border-purple-600 text-purple-100"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-purple-200 font-serif">Description</Label>
                          <Input
                            placeholder="Transfer description"
                            value={transferRequest.description}
                            onChange={(e) => setTransferRequest((prev) => ({ ...prev, description: e.target.value }))}
                            className="bg-purple-800/30 border-purple-600 text-purple-100"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-purple-200 font-serif">Priority</Label>
                          <Select
                            value={transferRequest.priority}
                            onValueChange={(value: any) => setTransferRequest((prev) => ({ ...prev, priority: value }))}
                          >
                            <SelectTrigger className="bg-purple-800/30 border-purple-600 text-purple-100">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="expedited">Expedited (+$25)</SelectItem>
                              <SelectItem value="imperial">Imperial Priority (+$100)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button
                          onClick={handleTransfer}
                          disabled={isProcessing || !transferRequest.fromAccount || !transferRequest.amount}
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
                              <Send className="w-4 h-4 mr-2" />
                              Execute Transfer
                            </>
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    style={{
                      clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                    }}
                  >
                    <ArrowDownLeft className="w-4 h-4 mr-2" />
                    <span className="font-serif text-xs">DEPONERE</span>
                  </Button>

                  <Button
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    style={{
                      clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                    }}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    <span className="font-serif text-xs">SOLVERE</span>
                  </Button>

                  <Button
                    className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white"
                    style={{
                      clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                    }}
                  >
                    <Vault className="w-4 h-4 mr-2" />
                    <span className="font-serif text-xs">INVESTIRE</span>
                  </Button>
                </div>
              </div>
            </DiamondSlabCard>

            {/* Transaction History */}
            <DiamondSlabCard variant="elite" intensity="medium" laserColor="emerald">
              <div className="p-6">
                <h3 className="text-amber-300 font-serif text-xl mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  HISTORIA TRANSACTIONUM
                </h3>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  <AnimatePresence>
                    {transactions
                      .filter((t) => t.accountId === selectedAccount.id)
                      .slice(0, 10)
                      .map((transaction, index) => (
                        <motion.div
                          key={transaction.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-3 bg-purple-800/20 rounded-lg border border-purple-600/30 hover:border-amber-400/30 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            {getTransactionIcon(transaction.type)}
                            <div>
                              <p className="text-purple-100 font-medium text-sm">{transaction.description}</p>
                              <div className="flex items-center space-x-2 text-xs text-purple-300">
                                <span className="font-serif">{transaction.timestamp.toLocaleDateString()}</span>
                                <span>•</span>
                                <span className="font-serif">{transaction.metadata.method}</span>
                                <span>•</span>
                                <Badge
                                  variant={transaction.status === "completed" ? "default" : "secondary"}
                                  className="text-xs"
                                >
                                  {transaction.status}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <p
                              className={`font-semibold ${
                                transaction.type === "deposit" || transaction.type === "interest"
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {transaction.type === "deposit" || transaction.type === "interest" ? "+" : "-"}$
                              {transaction.amount.toLocaleString()}
                            </p>
                            <p className="text-purple-300 text-xs font-serif">{transaction.currency}</p>
                          </div>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
              </div>
            </DiamondSlabCard>
          </div>

          {/* Account Privileges & Services */}
          <div className="space-y-6">
            {/* Account Privileges */}
            <DiamondSlabCard variant="quantum" intensity="high" laserColor="gold">
              <div className="p-6">
                <h3 className="text-amber-300 font-serif text-lg mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  PRIVILEGIA IMPERIALIS
                </h3>

                <div className="space-y-3">
                  {selectedAccount.privileges.map((privilege, index) => (
                    <motion.div
                      key={privilege}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-2 h-2 bg-amber-400 rounded-full" />
                      <span className="text-purple-200 text-sm">{privilege}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-purple-600/30">
                  <h4 className="text-amber-300 font-serif text-sm mb-3">SERVITIA EXCLUSIVA</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-purple-300 font-serif">Concierge Banking</span>
                      <Badge className="bg-green-600 text-white text-xs">24/7</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-purple-300 font-serif">Global Access</span>
                      <Badge className="bg-blue-600 text-white text-xs">150+ Countries</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-purple-300 font-serif">Investment Minimum</span>
                      <Badge className="bg-purple-600 text-white text-xs">$0</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </DiamondSlabCard>

            {/* Security Status */}
            <DiamondSlabCard variant="premium" intensity="medium" laserColor="crimson">
              <div className="p-6">
                <h3 className="text-amber-300 font-serif text-lg mb-4 flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  SECURITAS STATUS
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200 text-sm font-serif">Two-Factor Authentication</span>
                    <Badge className="bg-green-600 text-white">ACTIVE</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-purple-200 text-sm font-serif">Biometric Security</span>
                    <Badge className="bg-green-600 text-white">ENABLED</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-purple-200 text-sm font-serif">Quantum Encryption</span>
                    <Badge className="bg-green-600 text-white">ACTIVE</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-purple-200 text-sm font-serif">Diplomatic Protection</span>
                    <Badge className="bg-purple-600 text-white">SOVEREIGN</Badge>
                  </div>
                </div>

                <Button
                  className="w-full mt-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                  style={{
                    clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                  }}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  <span className="font-serif text-xs">ENHANCE SECURITY</span>
                </Button>
              </div>
            </DiamondSlabCard>

            {/* Investment Opportunities */}
            <DiamondSlabCard variant="elite" intensity="high" laserColor="purple">
              <div className="p-6">
                <h3 className="text-amber-300 font-serif text-lg mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  OPPORTUNITATES
                </h3>

                <div className="space-y-3">
                  <div className="p-3 bg-gradient-to-r from-purple-800/30 to-indigo-800/30 rounded-lg border border-purple-600/30">
                    <h4 className="text-amber-300 font-semibold text-sm">Imperial Real Estate Fund</h4>
                    <p className="text-purple-200 text-xs">Minimum: $100,000 • Expected: 12-18% APY</p>
                    <Button size="sm" className="mt-2 bg-amber-600 hover:bg-amber-700 text-white text-xs">
                      INVEST NOW
                    </Button>
                  </div>

                  <div className="p-3 bg-gradient-to-r from-blue-800/30 to-cyan-800/30 rounded-lg border border-blue-600/30">
                    <h4 className="text-amber-300 font-semibold text-sm">Sovereign Bond Portfolio</h4>
                    <p className="text-purple-200 text-xs">Minimum: $50,000 • Expected: 8-12% APY</p>
                    <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-xs">
                      LEARN MORE
                    </Button>
                  </div>
                </div>
              </div>
            </DiamondSlabCard>
          </div>
        </div>
      </div>
    </div>
  )
}
