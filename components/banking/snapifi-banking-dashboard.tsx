"use client"

import { useState, useEffect } from "react"
import { useSnapifiBanking } from "@/contexts/snapifi-banking-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowDownRight,
  Wallet,
  PiggyBank,
  Shield,
  Settings,
  Download,
  Send,
  Receipt,
  Eye,
  EyeOff,
} from "lucide-react"
import { motion } from "framer-motion"

interface BankingDashboardProps {
  accountId: string
}

export function SnapifiBankingDashboard({ accountId }: BankingDashboardProps) {
  const {
    getBankAccount,
    getBankingDashboard,
    getTransactionHistory,
    processTransaction,
    internalTransfer,
  } = useSnapifiBanking()

  const [account, setAccount] = useState<any>(null)
  const [dashboard, setDashboard] = useState<any>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [transferAmount, setTransferAmount] = useState("")
  const [transferRecipient, setTransferRecipient] = useState("")

  useEffect(() => {
    loadBankingData()
  }, [accountId])

  const loadBankingData = async () => {
    try {
      setLoading(true)
      const accountData = getBankAccount(accountId)
      const dashboardData = await getBankingDashboard(accountId)
      const transactionData = getTransactionHistory(accountId)

      setAccount(accountData)
      setDashboard(dashboardData)
      setTransactions(transactionData)
    } catch (error) {
      console.error("Failed to load banking data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleQuickTransfer = async () => {
    if (!transferAmount || !transferRecipient) return

    try {
      await internalTransfer(accountId, transferRecipient, Number.parseFloat(transferAmount), "Quick transfer")
      setTransferAmount("")
      setTransferRecipient("")
      await loadBankingData()
    } catch (error) {
      console.error("Transfer failed:", error)
    }
  }

  const handleQuickDeposit = async (amount: number) => {
    try {
      await processTransaction({
        accountId,
        type: "deposit",
        amount,
        description: "Quick deposit",
        category: "Deposit",
      })
      await loadBankingData()
    } catch (error) {
      console.error("Deposit failed:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <CreditCard className="w-12 h-12 text-amber-400 mx-auto mb-4 animate-pulse" />
          <p className="text-amber-300 font-serif">Loading Banking Dashboard...</p>
        </div>
      </div>
    )
  }

  if (!account) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="w-96 bg-gradient-to-br from-red-900/50 to-purple-900/50 border-red-400/30">
          <CardContent className="text-center p-8">
            <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-300 mb-2">Account Not Found</h2>
            <p className="text-red-200">The requested bank account could not be found.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-amber-300 font-serif">Snapifi Banking</h1>
            <p className="text-purple-200">Welcome, {account.holderName}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="border-green-400 text-green-300">
              <Shield className="w-3 h-3 mr-1" />
              {account.accountStatus.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="border-amber-400 text-amber-300">
              {account.accountType.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Account Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-200">Available Balance</CardTitle>
              <div className="flex items-center space-x-2">
                <Wallet className="h-4 w-4 text-amber-400" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="p-0 h-auto"
                >
                  {balanceVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-300">
                {balanceVisible ? `$${account.availableBalance.toLocaleString()}` : "••••••"}
              </div>
              <p className="text-xs text-purple-300">
                Total: ${balanceVisible ? account.balance.toLocaleString() : "••••••"}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-200">Monthly Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                ${dashboard?.accountSummary.monthlyIncome.toLocaleString() || "0"}
              </div>
              <p className="text-xs text-purple-300">This month</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-200">Monthly Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">
                ${dashboard?.accountSummary.monthlyExpenses.toLocaleString() || "0"}
              </div>
              <p className="text-xs text-purple-300">This month</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-200">Net Worth</CardTitle>
              <PiggyBank className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-300">
                ${dashboard?.accountSummary.netWorth.toLocaleString() || "0"}
              </div>
              <p className="text-xs text-purple-300">Including investments</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Banking Interface */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-purple-900/50 border-amber-400/30">
          <TabsTrigger value="overview" className="data-[state=active]:bg-amber-500/20">
            <DollarSign className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="transactions" className="data-[state=active]:bg-amber-500/20">
            <Receipt className="w-4 h-4 mr-2" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="transfer" className="data-[state=active]:bg-amber-500/20">
            <Send className="w-4 h-4 mr-2" />
            Transfer
          </TabsTrigger>
          <TabsTrigger value="investments" className="data-[state=active]:bg-amber-500/20">
            <TrendingUp className="w-4 h-4 mr-2" />
            Investments
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-amber-500/20">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => handleQuickDeposit(1000)}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    <ArrowDownRight className="w-4 h-4 mr-2" />
                    Deposit $1K
                  </Button>
                  <Button
                    onClick={() => handleQuickDeposit(5000)}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    <ArrowDownRight className="w-4 h-4 mr-2" />
                    Deposit $5K
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                    <Send className="w-4 h-4 mr-2" />
                    Send Money
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                    <Download className="w-4 h-4 mr-2" />
                    Statement
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-purple-200">Account Number:</span>
                  <span className="text-amber-300 font-mono">****{account.accountNumber.slice(-4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Routing Number:</span>
                  <span className="text-amber-300 font-mono">{account.routingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Account Type:</span>
                  <span className="text-amber-300">{account.accountType.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Opened:</span>
                  <span className="text-amber-300">{account.openDate.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Last Activity:</span>
                  <span className="text-amber-300">{account.lastActivity.toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* QGI and Bond Integration */}
          {(account.qgiIntegration.qgiAccountLinked || account.bondIntegration.bondAccountLinked) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {account.qgiIntegration.qgiAccountLinked && (
                <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-400/30">
                  <CardHeader>
                    <CardTitle className="text-blue-300 font-serif">QGI Integration</CardTitle>
                    <CardDescription className="text-blue-200">Social Impact Investment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-blue-200">QGI Allocation:</span>
                      <span className="text-blue-300 font-bold">
                        ${account.qgiIntegration.qgiAllocation.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Social Impact Score:</span>
                      <span className="text-blue-300">{dashboard?.qgiPerformance.socialImpactScore}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Beneficiaries Reached:</span>
                      <span className="text-blue-300">{dashboard?.qgiPerformance.beneficiariesReached.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Projects Funded:</span>
                      <span className="text-blue-300">{dashboard?.qgiPerformance.projectsFunded}</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {account.bondIntegration.bondAccountLinked && (
                <Card className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border-amber-400/30">
                  <CardHeader>
                    <CardTitle className="text-amber-300 font-serif">Bond Portfolio</CardTitle>
                    <CardDescription className="text-amber-200">Long-term Investment Bonds</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-amber-200">Total Bond Value:</span>
                      <span className="text-amber-300 font-bold">
                        ${dashboard?.bondPortfolio.totalBondValue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-200">Bond Count:</span>
                      <span className="text-amber-300">{dashboard?.bondPortfolio.bondCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-200">Average Yield:</span>
                      <span className="text-amber-300">{(dashboard?.bondPortfolio.averageYield * 100).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-200">Next Maturity:</span>
                      <span className="text-amber-300">
                        {dashboard?.bondPortfolio.nextMaturityDate.toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
            <CardHeader>
              <CardTitle className="text-amber-300 font-serif">Recent Transactions</CardTitle>
              <CardDescription className="text-purple-200">Your latest account activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.length === 0 ? (
                  <div className="text-center py-8">
                    <Receipt className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <p className="text-purple-300">No transactions yet</p>
                    <p className="text-purple-400 text-sm">Your transaction history will appear here</p>
                  </div>
                ) : (
                  transactions.slice(0, 10).map((transaction) => (
                    <div
                      key={transaction.transactionId}
                      className="flex items-center justify-between p-4 bg-purple-800/30 rounded-lg border border-amber-400/20"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10
