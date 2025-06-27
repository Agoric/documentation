"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { TransactionExportModal } from "./transaction-export-modal"
import { Search, Download, CreditCard, TrendingUp, TrendingDown, ArrowUpDown, Eye } from "lucide-react"
import { format } from "date-fns"
import type { Transaction } from "@/utils/transaction-export"

// Sample transaction data
const sampleTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-01-15",
    description: "Grocery Store Purchase",
    amount: -85.32,
    category: "Food & Dining",
    type: "expense",
    status: "completed",
    account: "Checking Account",
    merchant: "Whole Foods Market",
    location: "San Francisco, CA",
  },
  {
    id: "2",
    date: "2024-01-14",
    description: "Salary Deposit",
    amount: 3500.0,
    category: "Income",
    type: "income",
    status: "completed",
    account: "Checking Account",
    reference: "PAYROLL-2024-01",
  },
  {
    id: "3",
    date: "2024-01-13",
    description: "Electric Bill",
    amount: -120.45,
    category: "Utilities",
    type: "expense",
    status: "completed",
    account: "Checking Account",
    merchant: "PG&E",
  },
  {
    id: "4",
    date: "2024-01-12",
    description: "Coffee Shop",
    amount: -4.75,
    category: "Food & Dining",
    type: "expense",
    status: "completed",
    account: "Credit Card",
    merchant: "Starbucks",
    location: "Downtown SF",
  },
  {
    id: "5",
    date: "2024-01-11",
    description: "Gas Station",
    amount: -45.2,
    category: "Transportation",
    type: "expense",
    status: "completed",
    account: "Credit Card",
    merchant: "Shell",
  },
  {
    id: "6",
    date: "2024-01-10",
    description: "Online Transfer",
    amount: -500.0,
    category: "Transfer",
    type: "transfer",
    status: "completed",
    account: "Checking Account",
    reference: "TRANSFER-SAVINGS",
  },
  {
    id: "7",
    date: "2024-01-09",
    description: "Freelance Payment",
    amount: 750.0,
    category: "Income",
    type: "income",
    status: "completed",
    account: "Checking Account",
    reference: "FREELANCE-INV-001",
  },
  {
    id: "8",
    date: "2024-01-08",
    description: "Subscription Service",
    amount: -9.99,
    category: "Entertainment",
    type: "expense",
    status: "completed",
    account: "Credit Card",
    merchant: "Netflix",
  },
]

interface TransactionListProps {
  transactions?: Transaction[]
}

export function TransactionList({ transactions = sampleTransactions }: TransactionListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"date" | "amount" | "category">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  // Get unique categories for filtering
  const availableCategories = useMemo(() => {
    return Array.from(new Set(transactions.map((t) => t.category))).sort()
  }, [transactions])

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => {
        const matchesSearch =
          transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.merchant?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.category.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory = selectedCategory === "all" || transaction.category === selectedCategory
        const matchesType = selectedType === "all" || transaction.type === selectedType
        const matchesStatus = selectedStatus === "all" || transaction.status === selectedStatus

        return matchesSearch && matchesCategory && matchesType && matchesStatus
      })
      .sort((a, b) => {
        let comparison = 0

        switch (sortBy) {
          case "date":
            comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
            break
          case "amount":
            comparison = Math.abs(a.amount) - Math.abs(b.amount)
            break
          case "category":
            comparison = a.category.localeCompare(b.category)
            break
        }

        return sortOrder === "desc" ? -comparison : comparison
      })
  }, [transactions, searchTerm, selectedCategory, selectedType, selectedStatus, sortBy, sortOrder])

  // Calculate summary statistics
  const summary = useMemo(() => {
    const totalIncome = filteredTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

    const totalExpenses = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)

    return {
      totalIncome,
      totalExpenses,
      netAmount: totalIncome - totalExpenses,
      transactionCount: filteredTransactions.length,
    }
  }, [filteredTransactions])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "income":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "expense":
        return <TrendingDown className="w-4 h-4 text-red-600" />
      case "transfer":
        return <ArrowUpDown className="w-4 h-4 text-blue-600" />
      default:
        return <CreditCard className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Income</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(summary.totalIncome)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(summary.totalExpenses)}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Net Amount</p>
                <p className={`text-2xl font-bold ${summary.netAmount >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {formatCurrency(summary.netAmount)}
                </p>
              </div>
              <ArrowUpDown className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-2xl font-bold">{summary.transactionCount}</p>
              </div>
              <CreditCard className="w-8 h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>View and manage your transaction history</CardDescription>
            </div>
            <Button onClick={() => setIsExportModalOpen(true)}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {availableCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={`${sortBy}-${sortOrder}`}
              onValueChange={(value) => {
                const [newSortBy, newSortOrder] = value.split("-") as [typeof sortBy, typeof sortOrder]
                setSortBy(newSortBy)
                setSortOrder(newSortOrder)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Date (Newest)</SelectItem>
                <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                <SelectItem value="amount-desc">Amount (Highest)</SelectItem>
                <SelectItem value="amount-asc">Amount (Lowest)</SelectItem>
                <SelectItem value="category-asc">Category (A-Z)</SelectItem>
                <SelectItem value="category-desc">Category (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transaction List */}
          <div className="space-y-2">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setSelectedTransaction(transaction)}
              >
                <div className="flex items-center space-x-4">
                  {getTransactionIcon(transaction.type)}
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{format(new Date(transaction.date), "MMM dd, yyyy")}</span>
                      <span>•</span>
                      <span>{transaction.category}</span>
                      {transaction.merchant && (
                        <>
                          <span>•</span>
                          <span>{transaction.merchant}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {getStatusBadge(transaction.status)}
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.amount >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {transaction.amount >= 0 ? "+" : ""}
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-sm text-muted-foreground">{transaction.account}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No transactions found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Export Modal */}
      <TransactionExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        transactions={filteredTransactions}
        availableCategories={availableCategories}
      />
    </div>
  )
}
