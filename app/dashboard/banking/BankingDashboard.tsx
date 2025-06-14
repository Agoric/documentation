"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HolographicBackground } from "@/components/ui/holographic-background"
import { ImperialCoinDisplay } from "@/components/ui/imperial-coin-display"
import { ImperialAmbientController } from "@/components/ui/imperial-ambient-controller"
import {
  CreditCard,
  TrendingUp,
  PiggyBank,
  Building2,
  Crown,
  Shield,
  Star,
  Award,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Eye,
  Settings,
} from "lucide-react"

export default function BankingDashboard() {
  const [activeTab, setActiveTab] = useState("accounts")

  const accounts = [
    {
      id: "1",
      name: "Imperial Checking",
      type: "Checking",
      balance: 45678.9,
      accountNumber: "****1234",
      status: "active",
      icon: <Wallet className="h-5 w-5" />,
    },
    {
      id: "2",
      name: "Royal Savings",
      type: "Savings",
      balance: 125000.0,
      accountNumber: "****5678",
      status: "active",
      icon: <PiggyBank className="h-5 w-5" />,
    },
    {
      id: "3",
      name: "Supreme Credit",
      type: "Credit",
      balance: -2500.0,
      accountNumber: "****9012",
      status: "active",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      id: "4",
      name: "Authority Investment",
      type: "Investment",
      balance: 350000.0,
      accountNumber: "****3456",
      status: "active",
      icon: <TrendingUp className="h-5 w-5" />,
    },
  ]

  const transactions = [
    {
      id: "1",
      description: "Royal Dividend Payment",
      amount: 5000.0,
      date: "2024-01-15",
      type: "credit",
      category: "Investment",
      account: "Authority Investment",
    },
    {
      id: "2",
      description: "Imperial Palace Rent",
      amount: -3500.0,
      date: "2024-01-14",
      type: "debit",
      category: "Housing",
      account: "Imperial Checking",
    },
    {
      id: "3",
      description: "Crown Jewels Insurance",
      amount: -850.0,
      date: "2024-01-13",
      type: "debit",
      category: "Insurance",
      account: "Imperial Checking",
    },
    {
      id: "4",
      description: "Global Economics Consulting",
      amount: 12500.0,
      date: "2024-01-12",
      type: "credit",
      category: "Income",
      account: "Imperial Checking",
    },
  ]

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

  return (
    <div className="min-h-screen relative overflow-hidden">
      <HolographicBackground variant="financial" />
      <ImperialAmbientController autoStart={true} defaultTrack="golden-chamber" compact={true} />

      <div className="relative z-10 p-6 space-y-8">
        {/* Imperial Header */}
        <div className="text-center py-6">
          <ImperialCoinDisplay size="large" showDetails={false} animated={true} />

          <div className="mt-4 space-y-2">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
              Imperial Banking Authority
            </h1>
            <p className="text-yellow-300/80">Supreme Financial Command Center</p>
            <div className="flex items-center justify-center gap-3 mt-3">
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">
                <Crown className="w-3 h-3 mr-1" />
                Royal Banking
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                <Shield className="w-3 h-3 mr-1" />
                Secured Vaults
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                <Star className="w-3 h-3 mr-1" />
                Premium Access
              </Badge>
            </div>
          </div>
        </div>

        {/* Total Balance Card */}
        <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <p className="text-yellow-300/80 text-sm">Total Imperial Assets</p>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                ${totalBalance.toLocaleString()}
              </div>
              <div className="flex items-center justify-center gap-2 text-green-400">
                <ArrowUpRight className="h-4 w-4" />
                <span className="text-sm">+12.5% this month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 border-yellow-500/20">
            <TabsTrigger
              value="accounts"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300"
            >
              Accounts
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300"
            >
              Transactions
            </TabsTrigger>
            <TabsTrigger
              value="transfers"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300"
            >
              Transfers
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accounts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-yellow-300">Imperial Accounts</h2>
              <Button className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/30">
                <Plus className="h-4 w-4 mr-2" />
                New Account
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {accounts.map((account) => (
                <Card
                  key={account.id}
                  className="bg-black/20 backdrop-blur-md border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="text-yellow-400">{account.icon}</div>
                      <div>
                        <CardTitle className="text-yellow-300">{account.name}</CardTitle>
                        <CardDescription className="text-yellow-200/60">
                          {account.type} • {account.accountNumber}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-400/30">Active</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-2xl font-bold text-yellow-300">
                        ${Math.abs(account.balance).toLocaleString()}
                        {account.balance < 0 && <span className="text-red-400 text-sm ml-1">(Credit)</span>}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-yellow-400/30 text-yellow-300 hover:bg-yellow-500/20"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-yellow-400/30 text-yellow-300 hover:bg-yellow-500/20"
                        >
                          <Settings className="h-3 w-3 mr-1" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-yellow-300">Recent Imperial Transactions</h2>
              <Button className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/30">
                Export History
              </Button>
            </div>

            <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
              <CardContent className="p-0">
                <div className="space-y-0">
                  {transactions.map((transaction, index) => (
                    <div
                      key={transaction.id}
                      className={`flex items-center justify-between p-4 ${
                        index !== transactions.length - 1 ? "border-b border-yellow-500/10" : ""
                      } hover:bg-yellow-500/5 transition-colors`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            transaction.type === "credit"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {transaction.type === "credit" ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-yellow-200">{transaction.description}</p>
                          <p className="text-sm text-yellow-300/60">
                            {transaction.category} • {transaction.account}
                          </p>
                          <p className="text-xs text-yellow-400/50">{transaction.date}</p>
                        </div>
                      </div>
                      <div
                        className={`text-right ${transaction.type === "credit" ? "text-green-400" : "text-red-400"}`}
                      >
                        <div className="font-bold">
                          {transaction.type === "credit" ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transfers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-yellow-300">Imperial Transfers</h2>
              <Button className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/30">
                <Plus className="h-4 w-4 mr-2" />
                New Transfer
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300">Quick Transfer</CardTitle>
                  <CardDescription className="text-yellow-200/60">
                    Transfer between your imperial accounts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-yellow-300">From Account</label>
                    <select className="w-full p-2 bg-black/30 border border-yellow-500/20 rounded-md text-yellow-200">
                      <option>Imperial Checking (****1234)</option>
                      <option>Royal Savings (****5678)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-yellow-300">To Account</label>
                    <select className="w-full p-2 bg-black/30 border border-yellow-500/20 rounded-md text-yellow-200">
                      <option>Royal Savings (****5678)</option>
                      <option>Authority Investment (****3456)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-yellow-300">Amount</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full p-2 bg-black/30 border border-yellow-500/20 rounded-md text-yellow-200"
                    />
                  </div>
                  <Button className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/30">
                    Execute Transfer
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300">External Transfer</CardTitle>
                  <CardDescription className="text-yellow-200/60">
                    Send to external financial institutions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-yellow-300">Recipient Bank</label>
                    <input
                      type="text"
                      placeholder="Bank Name"
                      className="w-full p-2 bg-black/30 border border-yellow-500/20 rounded-md text-yellow-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-yellow-300">Account Number</label>
                    <input
                      type="text"
                      placeholder="Account Number"
                      className="w-full p-2 bg-black/30 border border-yellow-500/20 rounded-md text-yellow-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-yellow-300">Amount</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full p-2 bg-black/30 border border-yellow-500/20 rounded-md text-yellow-200"
                    />
                  </div>
                  <Button className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/30">
                    Send Transfer
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-xl font-semibold text-yellow-300">Imperial Financial Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300 text-sm">Monthly Income</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">$18,750</div>
                  <div className="text-sm text-green-300">+15.2% from last month</div>
                  <Progress value={75} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300 text-sm">Monthly Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-400">$8,420</div>
                  <div className="text-sm text-red-300">-5.8% from last month</div>
                  <Progress value={45} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-300 text-sm">Net Worth Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">+$10,330</div>
                  <div className="text-sm text-yellow-300">+22.1% this month</div>
                  <Progress value={88} className="mt-2 h-2" />
                </CardContent>
              </Card>
            </div>

            <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-300">Spending Categories</CardTitle>
                <CardDescription className="text-yellow-200/60">Your imperial expenditure breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Imperial Housing", amount: 3500, percentage: 42 },
                    { category: "Royal Transportation", amount: 1200, percentage: 14 },
                    { category: "Crown Maintenance", amount: 850, percentage: 10 },
                    { category: "Court Entertainment", amount: 750, percentage: 9 },
                    { category: "Other Expenses", amount: 2120, percentage: 25 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-yellow-200">{item.category}</span>
                        <span className="text-yellow-300">${item.amount.toLocaleString()}</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Imperial Command Actions */}
        <Card className="bg-black/20 backdrop-blur-md border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-yellow-300 flex items-center gap-2">
              <Award className="h-5 w-5" />
              Imperial Banking Commands
            </CardTitle>
            <CardDescription className="text-yellow-200/60">Execute supreme financial authority</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/30">
                <Crown className="h-4 w-4 mr-2" />
                Royal Decree
              </Button>
              <Button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-400/30">
                <Shield className="h-4 w-4 mr-2" />
                Vault Security
              </Button>
              <Button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-400/30">
                <Building2 className="h-4 w-4 mr-2" />
                Treasury Report
              </Button>
              <Button className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-400/30">
                <Star className="h-4 w-4 mr-2" />
                Asset Review
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
