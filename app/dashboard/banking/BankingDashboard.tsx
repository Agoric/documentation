"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, CreditCard, DollarSign, LineChart, PiggyBank, Plus, Wallet } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { ErrorBoundary } from "react-error-boundary"

// Sample data with proper typing
const accounts = [
  {
    id: "1",
    name: "Main Checking",
    balance: 5840.25,
    accountNumber: "****4218",
    type: "checking",
  },
  {
    id: "2",
    name: "Savings",
    balance: 12750.8,
    accountNumber: "****7631",
    type: "savings",
  },
  {
    id: "3",
    name: "Investment",
    balance: 36420.5,
    accountNumber: "****9214",
    type: "investment",
  },
]

const transactions = [
  {
    id: "1",
    description: "Amazon",
    amount: -84.29,
    date: "2023-05-15",
    category: "Shopping",
  },
  {
    id: "2",
    description: "Salary Deposit",
    amount: 3200.0,
    date: "2023-05-14",
    category: "Income",
  },
  {
    id: "3",
    description: "Starbucks",
    amount: -5.75,
    date: "2023-05-14",
    category: "Food & Drink",
  },
  {
    id: "4",
    description: "Uber",
    amount: -24.5,
    date: "2023-05-13",
    category: "Transportation",
  },
  {
    id: "5",
    description: "Netflix",
    amount: -14.99,
    date: "2023-05-12",
    category: "Entertainment",
  },
]

const goals = [
  {
    id: "1",
    name: "Emergency Fund",
    current: 8500,
    target: 10000,
    progress: 85,
  },
  {
    id: "2",
    name: "Vacation",
    current: 2300,
    target: 5000,
    progress: 46,
  },
  {
    id: "3",
    name: "New Car",
    current: 12000,
    target: 30000,
    progress: 40,
  },
]

// Error fallback component
function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-red-500">Something went wrong</CardTitle>
      </CardHeader>
      <CardContent>
        <p>We encountered an error while loading the banking dashboard.</p>
        <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={resetErrorBoundary}>Try again</Button>
      </CardFooter>
    </Card>
  )
}

export default function BankingDashboard() {
  // Safe state initialization
  const [activeTab, setActiveTab] = useState<string>("accounts")
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Safe rendering with error boundary
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="grid gap-4">
        {/* Account Summary */}
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-none">
          <CardHeader>
            <CardTitle className="text-2xl">Total Balance</CardTitle>
            <CardDescription>Across all accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              $
              {accounts
                ? accounts
                    .reduce((sum, account) => sum + account.balance, 0)
                    .toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                : "0.00"}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <LineChart className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-500">+2.5% from last month</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="mr-2">
              <Plus className="mr-2 h-4 w-4" />
              Add Account
            </Button>
            <Button>
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Transfer
            </Button>
          </CardFooter>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="accounts" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          {/* Accounts Tab */}
          <TabsContent value="accounts" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {accounts &&
                accounts.map((account) => (
                  <Card key={account.id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{account.name}</CardTitle>
                      {account.type === "checking" && <Wallet className="h-4 w-4 text-muted-foreground" />}
                      {account.type === "savings" && <PiggyBank className="h-4 w-4 text-muted-foreground" />}
                      {account.type === "investment" && <LineChart className="h-4 w-4 text-muted-foreground" />}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        $
                        {account.balance.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                      <p className="text-xs text-muted-foreground">Account {account.accountNumber}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}

              <Card className="border-dashed flex flex-col items-center justify-center p-6">
                <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Add New Account</p>
              </Card>
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest financial activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions &&
                    transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center">
                          <div
                            className={`mr-4 rounded-full p-2 ${
                              transaction.amount > 0 ? "bg-green-100" : "bg-red-100"
                            }`}
                          >
                            {transaction.amount > 0 ? (
                              <DollarSign className="h-4 w-4 text-green-600" />
                            ) : (
                              <CreditCard className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {transaction.category} • {transaction.date}
                            </p>
                          </div>
                        </div>
                        <div className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                          {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Transactions
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {goals &&
                goals.map((goal) => (
                  <Card key={goal.id}>
                    <CardHeader>
                      <CardTitle>{goal.name}</CardTitle>
                      <CardDescription>
                        ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Progress value={goal.progress} className="h-2" />
                      <p className="mt-2 text-sm text-muted-foreground">{goal.progress}% complete</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Add Funds
                      </Button>
                      <Button size="sm">Edit Goal</Button>
                    </CardFooter>
                  </Card>
                ))}

              <Card className="border-dashed flex flex-col items-center justify-center p-6">
                <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Create New Goal</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  )
}
