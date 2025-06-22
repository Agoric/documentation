"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Banknote, TrendingUp, Send, ArrowUpRight, ArrowDownRight, Shield, BarChart3, Target } from "lucide-react"

const bankingData = {
  accounts: [
    {
      id: "supreme_checking",
      name: "Supreme Authority Checking",
      type: "Checking",
      balance: 125000,
      available: 125000,
      currency: "USD",
      accountNumber: "****7890",
      features: ["No fees", "Unlimited transactions", "Global access", "Supreme Authority benefits"],
      status: "active",
    },
    {
      id: "business_checking",
      name: "Business Elite Checking",
      type: "Business Checking",
      balance: 450000,
      available: 450000,
      currency: "USD",
      accountNumber: "****2345",
      features: ["Business banking", "ACH processing", "Wire transfers", "Merchant services"],
      status: "active",
    },
    {
      id: "savings_premium",
      name: "Premium Savings",
      type: "Savings",
      balance: 750000,
      available: 750000,
      currency: "USD",
      accountNumber: "****6789",
      features: ["High yield", "Compound interest", "No minimum balance", "Instant access"],
      status: "active",
      apy: 4.5,
    },
    {
      id: "investment_account",
      name: "Investment Account",
      type: "Investment",
      balance: 2500000,
      available: 2500000,
      currency: "USD",
      accountNumber: "****1234",
      features: ["QGI integration", "Portfolio management", "Tax optimization", "Authority-level access"],
      status: "active",
      performance: 12.8,
    },
  ],
  recentTransactions: [
    {
      id: "tx_001",
      date: "2024-03-15",
      description: "QGI Investment Dividend",
      amount: 15000,
      type: "credit",
      account: "Investment Account",
      category: "Investment Income",
      status: "completed",
    },
    {
      id: "tx_002",
      date: "2024-03-14",
      description: "Business Payroll",
      amount: -45000,
      type: "debit",
      account: "Business Elite Checking",
      category: "Payroll",
      status: "completed",
    },
    {
      id: "tx_003",
      date: "2024-03-13",
      description: "Real Estate Investment",
      amount: -250000,
      type: "debit",
      account: "Investment Account",
      category: "Real Estate",
      status: "completed",
    },
    {
      id: "tx_004",
      date: "2024-03-12",
      description: "Interest Payment",
      amount: 2800,
      type: "credit",
      account: "Premium Savings",
      category: "Interest",
      status: "completed",
    },
    {
      id: "tx_005",
      date: "2024-03-11",
      description: "Wire Transfer Received",
      amount: 75000,
      type: "credit",
      account: "Supreme Authority Checking",
      category: "Transfer",
      status: "completed",
    },
  ],
  services: [
    {
      id: "wire_transfers",
      name: "International Wire Transfers",
      description: "Send money globally with Supreme Authority privileges",
      features: ["Same-day processing", "Competitive rates", "Global network", "24/7 support"],
      fee: "No fees for Supreme Authority members",
      status: "available",
    },
    {
      id: "merchant_services",
      name: "Merchant Services",
      description: "Accept payments with advanced processing solutions",
      features: ["Low processing fees", "Multiple payment methods", "Real-time reporting", "Fraud protection"],
      fee: "1.5% + $0.10 per transaction",
      status: "available",
    },
    {
      id: "treasury_management",
      name: "Treasury Management",
      description: "Advanced cash management for businesses",
      features: ["Cash flow optimization", "Automated sweeps", "Investment options", "Risk management"],
      fee: "Custom pricing",
      status: "available",
    },
    {
      id: "private_banking",
      name: "Private Banking",
      description: "Exclusive banking services for high-net-worth individuals",
      features: ["Dedicated relationship manager", "Exclusive products", "Concierge services", "Investment advisory"],
      fee: "Complimentary for Supreme Authority",
      status: "active",
    },
  ],
  analytics: {
    monthlyIncome: 125000,
    monthlyExpenses: 85000,
    netCashFlow: 40000,
    savingsRate: 32,
    investmentGrowth: 12.8,
    totalAssets: 3825000,
  },
}

export function SupremeBankingSuite() {
  const [selectedAccount, setSelectedAccount] = useState(bankingData.accounts[0])
  const [transferAmount, setTransferAmount] = useState("")
  const [transferTo, setTransferTo] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case "Checking":
        return "from-blue-600 to-cyan-600"
      case "Business Checking":
        return "from-purple-600 to-indigo-600"
      case "Savings":
        return "from-green-600 to-emerald-600"
      case "Investment":
        return "from-amber-600 to-orange-600"
      default:
        return "from-gray-600 to-slate-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-green-400 bg-clip-text text-transparent font-serif">
          Supreme Banking Suite
        </h1>
        <p className="text-xl text-green-300/80 italic font-serif">Advanced Banking & Financial Services</p>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Total Assets */}
            <Card className="lg:col-span-2 bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-300 font-serif flex items-center">
                  <Banknote className="w-6 h-6 mr-2" />
                  Total Assets Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-green-300 mb-2">
                    {formatCurrency(bankingData.analytics.totalAssets)}
                  </div>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-semibold">
                      +{bankingData.analytics.investmentGrowth}% YTD Growth
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-800/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-300">
                      {formatCurrency(bankingData.analytics.monthlyIncome)}
                    </div>
                    <div className="text-green-400/70 text-sm">Monthly Income</div>
                  </div>
                  <div className="text-center p-4 bg-green-800/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-300">
                      {formatCurrency(bankingData.analytics.netCashFlow)}
                    </div>
                    <div className="text-green-400/70 text-sm">Net Cash Flow</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-4">
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
                <CardHeader>
                  <CardTitle className="text-blue-300 font-serif text-lg">Quick Transfer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    placeholder="Amount"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="bg-blue-900/20 border-blue-400/30"
                  />
                  <Input
                    placeholder="To Account"
                    value={transferTo}
                    onChange={(e) => setTransferTo(e.target.value)}
                    className="bg-blue-900/20 border-blue-400/30"
                  />
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600">
                    <Send className="w-4 h-4 mr-2" />
                    Transfer
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-8 h-8 text-purple-400" />
                    <div>
                      <div className="text-purple-300 font-bold">Supreme Protection</div>
                      <div className="text-purple-400/70 text-sm">FDIC Insured + Enhanced Security</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Account Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {bankingData.accounts.map((account) => (
              <Card
                key={account.id}
                className={`bg-gradient-to-br ${getAccountTypeColor(account.type)} border-opacity-30 cursor-pointer hover:scale-105 transition-transform`}
                onClick={() => setSelectedAccount(account)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-white font-medium text-sm">{account.type}</div>
                    <Badge className="bg-white/20 text-white border-white/30">{account.status.toUpperCase()}</Badge>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{formatCurrency(account.balance)}</div>
                  <div className="text-white/70 text-xs">{account.accountNumber}</div>
                  {account.apy && <div className="text-white/90 text-xs mt-2">APY: {account.apy}%</div>}
                  {account.performance && (
                    <div className="text-white/90 text-xs mt-2">Performance: +{account.performance}%</div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Accounts Tab */}
        <TabsContent value="accounts" className="space-y-6">
          <div className="space-y-6">
            {bankingData.accounts.map((account) => (
              <Card key={account.id} className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-slate-300 font-serif">{account.name}</CardTitle>
                      <p className="text-slate-400 text-sm">{account.accountNumber}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-slate-300">{formatCurrency(account.balance)}</div>
                      <div className="text-slate-400 text-sm">Available: {formatCurrency(account.available)}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-slate-300 font-medium mb-3">Account Features</h4>
                      <ul className="space-y-2">
                        {account.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm text-slate-400">
                            <div className="w-2 h-2 bg-green-400 rounded-full" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600">
                        <Send className="w-4 h-4 mr-2" />
                        Transfer Funds
                      </Button>
                      <Button variant="outline" className="w-full border-slate-400/30 text-slate-300">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Statements
                      </Button>
                      <Button variant="outline" className="w-full border-slate-400/30 text-slate-300">
                        <Target className="w-4 h-4 mr-2" />
                        Account Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
            <CardHeader>
              <CardTitle className="text-slate-300 font-serif">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bankingData.recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-slate-600/30"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === "credit" ? "bg-green-600/20" : "bg-red-600/20"
                        }`}
                      >
                        {transaction.type === "credit" ? (
                          <ArrowDownRight className="w-5 h-5 text-green-400" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                      <div>
                        <div className="text-slate-300 font-medium">{transaction.description}</div>
                        <div className="text-slate-400 text-sm">
                          {transaction.account} • {transaction.category}
                        </div>
                        <div className="text-slate-500 text-xs">{transaction.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold ${
                          transaction.type === "credit" ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {transaction.type === "credit" ? "+" : ""}
                        {formatCurrency(transaction.amount)}
                      </div>
                      <Badge
                        className={`${
                          transaction.status === "completed"
                            ? "bg-green-600/20 text-green-300 border-green-400/30"
                            : "bg-yellow-600/20 text-yellow-300 border-yellow-400/30"
                        }`}
                      >
                        {transaction.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bankingData.services.map((service) => (
              <Card
                key={service.id}
                className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-400/30"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-indigo-300 font-serif">{service.name}</CardTitle>
                    <Badge
                      className={`${
                        service.status === "active"
                          ? "bg-green-600/20 text-green-300 border-green-400/30"
                          : "bg-blue-600/20 text-blue-300 border-blue-400/30"
                      }`}
                    >
                      {service.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-indigo-400/70 text-sm">{service.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-indigo-300 font-medium mb-2">Features</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-indigo-200">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-indigo-800/20 rounded-lg border border-indigo-400/20">
                    <div className="text-indigo-300 font-medium text-sm">Pricing</div>
                    <div className="text-indigo-200 text-sm">{service.fee}</div>
                  </div>

                  <Button
                    className={`w-full ${
                      service.status === "active"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    }`}
                  >
                    {service.status === "active" ? "Manage Service" : "Activate Service"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-300 font-serif">Cash Flow Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-800/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-300">
                      {formatCurrency(bankingData.analytics.monthlyIncome)}
                    </div>
                    <div className="text-green-400/70 text-sm">Monthly Income</div>
                  </div>
                  <div className="text-center p-3 bg-red-800/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-300">
                      {formatCurrency(bankingData.analytics.monthlyExpenses)}
                    </div>
                    <div className="text-red-400/70 text-sm">Monthly Expenses</div>
                  </div>
                </div>

                <div className="text-center p-4 bg-blue-800/20 rounded-lg">
                  <div className="text-3xl font-bold text-blue-300">
                    {formatCurrency(bankingData.analytics.netCashFlow)}
                  </div>
                  <div className="text-blue-400/70 text-sm">Net Cash Flow</div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-green-400">Savings Rate</span>
                    <span className="text-green-300">{bankingData.analytics.savingsRate}%</span>
                  </div>
                  <Progress value={bankingData.analytics.savingsRate} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
              <CardHeader>
                <CardTitle className="text-purple-300 font-serif">Investment Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-purple-800/20 rounded-lg">
                  <div className="text-4xl font-bold text-purple-300">+{bankingData.analytics.investmentGrowth}%</div>
                  <div className="text-purple-400/70 text-sm">YTD Investment Growth</div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-purple-800/20 rounded-lg">
                    <span className="text-purple-300">QGI Performance</span>
                    <span className="text-green-400 font-semibold">+15.2%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-800/20 rounded-lg">
                    <span className="text-purple-300">Real Estate</span>
                    <span className="text-green-400 font-semibold">+8.7%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-800/20 rounded-lg">
                    <span className="text-purple-300">Securities</span>
                    <span className="text-green-400 font-semibold">+12.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
