"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  CreditCard,
  Building,
  DollarSign,
  TrendingUp,
  Zap,
  Globe,
  Lock,
  Smartphone,
  Users,
  CheckCircle,
} from "lucide-react"

export default function BankingPage() {
  const [accountBalance, setAccountBalance] = useState(12450.75)
  const [savingsGoal, setSavingsGoal] = useState(25000)
  const [monthlyDeposit, setMonthlyDeposit] = useState(850)

  const bankingServices = [
    {
      title: "Digital Checking",
      description: "High-yield checking with no fees and instant transfers",
      apy: "2.5%",
      features: ["No monthly fees", "Unlimited transactions", "Mobile check deposit", "ATM fee reimbursement"],
      icon: CreditCard,
      color: "text-blue-600",
    },
    {
      title: "Smart Savings",
      description: "AI-powered savings with automatic optimization",
      apy: "4.2%",
      features: ["Quantum-optimized returns", "Auto-save rules", "Goal tracking", "Round-up investments"],
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Investment Banking",
      description: "Institutional-grade investment services",
      apy: "Variable",
      features: ["Portfolio management", "RWA token integration", "Tax optimization", "Wealth advisory"],
      icon: Building,
      color: "text-purple-600",
    },
    {
      title: "International Banking",
      description: "Global banking with multi-currency support",
      apy: "3.8%",
      features: ["Multi-currency accounts", "International transfers", "Foreign exchange", "Global ATM access"],
      icon: Globe,
      color: "text-orange-600",
    },
  ]

  const recentTransactions = [
    { id: 1, description: "Salary Deposit", amount: 4250.0, type: "credit", date: "2024-01-25" },
    { id: 2, description: "Rent Payment", amount: -1850.0, type: "debit", date: "2024-01-24" },
    { id: 3, description: "RWA Token Investment", amount: -500.0, type: "debit", date: "2024-01-23" },
    { id: 4, description: "Cashback Reward", amount: 45.75, type: "credit", date: "2024-01-22" },
    { id: 5, description: "Grocery Store", amount: -127.83, type: "debit", date: "2024-01-21" },
  ]

  const securityFeatures = [
    {
      title: "Quantum Encryption",
      description: "Military-grade quantum encryption for all transactions",
      icon: Lock,
      status: "Active",
    },
    {
      title: "Biometric Authentication",
      description: "Fingerprint and facial recognition security",
      icon: Smartphone,
      status: "Active",
    },
    {
      title: "AI Fraud Detection",
      description: "Real-time fraud monitoring with machine learning",
      icon: Shield,
      status: "Active",
    },
    {
      title: "Multi-Factor Auth",
      description: "Advanced multi-factor authentication system",
      icon: CheckCircle,
      status: "Active",
    },
  ]

  const savingsProgress = (accountBalance / savingsGoal) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Snapifi Banking Services</h1>
          <p className="text-muted-foreground">Next-generation neobank with quantum security and AI-powered features</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">
          <Shield className="h-3 w-3 mr-1" />
          FDIC Insured
        </Badge>
      </div>

      <Tabs defaultValue="accounts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="international">International</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="space-y-6">
          {/* Account Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${accountBalance.toLocaleString()}</div>
                <p className="text-xs text-green-600">+5.2% this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Savings</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${monthlyDeposit}</div>
                <p className="text-xs text-muted-foreground">Auto-save enabled</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Interest Earned</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$127.45</div>
                <p className="text-xs text-green-600">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Savings Goal Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Savings Goal Progress</CardTitle>
              <CardDescription>Track your progress toward your financial goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Emergency Fund Goal</span>
                <span className="font-bold">${savingsGoal.toLocaleString()}</span>
              </div>
              <Progress value={savingsProgress} className="h-3" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${accountBalance.toLocaleString()} saved</span>
                <span>{Math.round(savingsProgress)}% complete</span>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  At your current savings rate of ${monthlyDeposit}/month, you'll reach your goal in{" "}
                  {Math.ceil((savingsGoal - accountBalance) / monthlyDeposit)} months.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="h-auto p-4 flex-col space-y-2">
                  <CreditCard className="h-6 w-6" />
                  <span>Transfer</span>
                </Button>
                <Button className="h-auto p-4 flex-col space-y-2" variant="outline">
                  <Smartphone className="h-6 w-6" />
                  <span>Mobile Deposit</span>
                </Button>
                <Button className="h-auto p-4 flex-col space-y-2" variant="outline">
                  <TrendingUp className="h-6 w-6" />
                  <span>Invest</span>
                </Button>
                <Button className="h-auto p-4 flex-col space-y-2" variant="outline">
                  <Users className="h-6 w-6" />
                  <span>Send Money</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bankingServices.map((service, index) => {
              const IconComponent = service.icon
              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <IconComponent className={`h-5 w-5 ${service.color}`} />
                      <span>{service.title}</span>
                    </CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{service.apy}</div>
                      <p className="text-sm text-green-800">Annual Percentage Yield</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Features</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full">Open Account</Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest account activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${transaction.type === "credit" ? "bg-green-100" : "bg-red-100"}`}
                      >
                        {transaction.type === "credit" ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <CreditCard className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className={`font-bold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                      {transaction.type === "credit" ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Features</span>
              </CardTitle>
              <CardDescription>Advanced security protecting your financial data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {securityFeatures.map((feature, index) => {
                  const IconComponent = feature.icon
                  return (
                    <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg">
                      <IconComponent className="h-6 w-6 text-green-600" />
                      <div className="flex-1">
                        <h4 className="font-medium">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">{feature.status}</Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">SMS and authenticator app</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Transaction Alerts</h4>
                    <p className="text-sm text-muted-foreground">Real-time notifications</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Device Recognition</h4>
                    <p className="text-sm text-muted-foreground">Trusted device management</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="international" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>International Banking</span>
              </CardTitle>
              <CardDescription>Global financial services with multi-currency support</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">150+</div>
                  <p className="text-sm text-muted-foreground">Countries Supported</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">25</div>
                  <p className="text-sm text-muted-foreground">Currencies</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">0.5%</div>
                  <p className="text-sm text-muted-foreground">FX Spread</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">International Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Wire Transfers</h5>
                    <p className="text-sm text-muted-foreground">
                      Fast international wire transfers with competitive rates
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Multi-Currency Accounts</h5>
                    <p className="text-sm text-muted-foreground">Hold and manage multiple currencies in one account</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Global ATM Access</h5>
                    <p className="text-sm text-muted-foreground">Fee-free ATM access worldwide with partner networks</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium">Foreign Exchange</h5>
                    <p className="text-sm text-muted-foreground">Real-time FX rates with quantum-optimized execution</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Philippine Banking Partnership</h4>
                <p className="text-sm text-blue-800">
                  Special lending programs and risk management services for Philippine banks, supporting international
                  market expansion and regulatory compliance.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
