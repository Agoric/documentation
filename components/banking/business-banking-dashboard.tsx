"use client"

import { useState, useEffect } from "react"
import { useSnapifiBanking } from "@/contexts/snapifi-banking-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building,
  CreditCard,
  DollarSign,
  TrendingUp,
  Users,
  Briefcase,
  Calculator,
  FileText,
  Settings,
} from "lucide-react"
import { motion } from "framer-motion"

interface BusinessBankingDashboardProps {
  accountId: string
}

export function BusinessBankingDashboard({ accountId }: BusinessBankingDashboardProps) {
  const { getBankAccount, getBankingDashboard, getTransactionHistory, processTransaction } = useSnapifiBanking()

  const [account, setAccount] = useState<any>(null)
  const [dashboard, setDashboard] = useState<any>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Building className="w-12 h-12 text-amber-400 mx-auto mb-4 animate-pulse" />
          <p className="text-amber-300 font-serif">Loading Business Banking...</p>
        </div>
      </div>
    )
  }

  if (!account) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="w-96 bg-gradient-to-br from-red-900/50 to-purple-900/50 border-red-400/30">
          <CardContent className="text-center p-8">
            <Building className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-300 mb-2">Business Account Not Found</h2>
            <p className="text-red-200">The requested business account could not be found.</p>
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
            <h1 className="text-3xl font-bold text-amber-300 font-serif">Business Banking</h1>
            <p className="text-purple-200">{account.holderName}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="border-green-400 text-green-300">
              <Building className="w-3 h-3 mr-1" />
              BUSINESS ACCOUNT
            </Badge>
            <Badge variant="outline" className="border-amber-400 text-amber-300">
              {account.accountStatus.toUpperCase()}
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Business Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-200">Business Balance</CardTitle>
              <Building className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-300">${account.balance.toLocaleString()}</div>
              <p className="text-xs text-purple-300">Available: ${account.availableBalance.toLocaleString()}</p>
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
              <CardTitle className="text-sm font-medium text-purple-200">Monthly Revenue</CardTitle>
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
              <CardTitle className="text-sm font-medium text-purple-200">Operating Expenses</CardTitle>
              <Calculator className="h-4 w-4 text-red-400" />
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
              <CardTitle className="text-sm font-medium text-purple-200">Business Value</CardTitle>
              <Briefcase className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-300">
                ${dashboard?.accountSummary.netWorth.toLocaleString() || "0"}
              </div>
              <p className="text-xs text-purple-300">Total assets</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Business Banking Interface */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-purple-900/50 border-amber-400/30">
          <TabsTrigger value="overview" className="data-[state=active]:bg-amber-500/20">
            <Building className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="services" className="data-[state=active]:bg-amber-500/20">
            <Briefcase className="w-4 h-4 mr-2" />
            Services
          </TabsTrigger>
          <TabsTrigger value="payroll" className="data-[state=active]:bg-amber-500/20">
            <Users className="w-4 h-4 mr-2" />
            Payroll
          </TabsTrigger>
          <TabsTrigger value="loans" className="data-[state=active]:bg-amber-500/20">
            <DollarSign className="w-4 h-4 mr-2" />
            Loans & Credit
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-amber-500/20">
            <FileText className="w-4 h-4 mr-2" />
            Reports
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Business Features */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif">Business Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {account.features.businessFeatures && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${account.features.businessFeatures.merchantServices ? "bg-green-400" : "bg-red-400"}`}
                      />
                      <span className="text-purple-200 text-sm">Merchant Services</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${account.features.businessFeatures.payrollServices ? "bg-green-400" : "bg-red-400"}`}
                      />
                      <span className="text-purple-200 text-sm">Payroll Services</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${account.features.businessFeatures.businessLoans ? "bg-green-400" : "bg-red-400"}`}
                      />
                      <span className="text-purple-200 text-sm">Business Loans</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${account.features.businessFeatures.lineOfCredit ? "bg-green-400" : "bg-red-400"}`}
                      />
                      <span className="text-purple-200 text-sm">Line of Credit</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${account.features.businessFeatures.cashManagement ? "bg-green-400" : "bg-red-400"}`}
                      />
                      <span className="text-purple-200 text-sm">Cash Management</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${account.features.businessFeatures.foreignExchange ? "bg-green-400" : "bg-red-400"}`}
                      />
                      <span className="text-purple-200 text-sm">Foreign Exchange</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Limits */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif">Business Limits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-purple-200">Daily Withdrawal:</span>
                  <span className="text-amber-300">${account.limits.dailyWithdrawalLimit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Daily Transfer:</span>
                  <span className="text-amber-300">${account.limits.dailyTransferLimit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Wire Transfer:</span>
                  <span className="text-amber-300">${account.limits.wireTransferLimit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Monthly Transactions:</span>
                  <span className="text-amber-300">{account.limits.monthlyTransactionLimit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Overdraft Limit:</span>
                  <span className="text-amber-300">${account.limits.overdraftLimit.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-400/30">
              <CardHeader>
                <CardTitle className="text-blue-300 font-serif">Merchant Services</CardTitle>
                <CardDescription className="text-blue-200">Accept payments from customers</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Setup Payment Processing
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/50 to-blue-900/50 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-300 font-serif">Cash Management</CardTitle>
                <CardDescription className="text-green-200">Optimize your cash flow</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600">
                  <Calculator className="w-4 h-4 mr-2" />
                  Manage Cash Flow
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-400/30">
              <CardHeader>
                <CardTitle className="text-purple-300 font-serif">Trade Finance</CardTitle>
                <CardDescription className="text-purple-200">International trade support</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600">
                  <Building className="w-4 h-4 mr-2" />
                  Trade Services
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payroll Tab */}
        <TabsContent value="payroll" className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
            <CardHeader>
              <CardTitle className="text-amber-300 font-serif">Payroll Management</CardTitle>
              <CardDescription className="text-purple-200">Manage employee payments and benefits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="bg-gradient-to-r from-green-500 to-green-600">
                  <Users className="w-4 h-4 mr-2" />
                  Process Payroll
                </Button>
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600">
                  <FileText className="w-4 h-4 mr-2" />
                  Tax Reports
                </Button>
                <Button className="bg-gradient-to-r from-purple-500 to-purple-600">
                  <Calculator className="w-4 h-4 mr-2" />
                  Benefits Admin
                </Button>
                <Button className="bg-gradient-to-r from-amber-500 to-amber-600">
                  <Settings className="w-4 h-4 mr-2" />
                  Payroll Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Loans & Credit Tab */}
        <TabsContent value="loans" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border-amber-400/30">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif">Business Loans</CardTitle>
                <CardDescription className="text-amber-200">Financing for business growth</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-amber-200">Available Credit:</span>
                    <span className="text-amber-300 font-bold">$500,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-200">Interest Rate:</span>
                    <span className="text-amber-300">4.5% APR</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Apply for Loan
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border-blue-400/30">
              <CardHeader>
                <CardTitle className="text-blue-300 font-serif">Line of Credit</CardTitle>
                <CardDescription className="text-blue-200">Flexible business financing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-200">Credit Limit:</span>
                    <span className="text-blue-300 font-bold">$250,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Available:</span>
                    <span className="text-blue-300">$250,000</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Access Credit Line
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
              <CardHeader>
                <CardTitle className="text-purple-300 font-serif">Financial Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/50 to-teal-900/50 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-300 font-serif">Tax Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600">
                  <Calculator className="w-4 h-4 mr-2" />
                  Tax Reports
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
              <CardHeader>
                <CardTitle className="text-blue-300 font-serif">Compliance Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600">
                  <Building className="w-4 h-4 mr-2" />
                  Compliance Docs
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
