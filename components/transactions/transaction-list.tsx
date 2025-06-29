"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { TransactionExportModal } from "./transaction-export-modal"
import { TransactionDetailsModal } from "./transaction-details-modal"
import { BulkActionsToolbar } from "./bulk-actions-toolbar"
import { AdvancedFilters, type AdvancedFilters as AdvancedFiltersType } from "./advanced-filters"
import { Download, CreditCard, TrendingUp, TrendingDown, ArrowUpDown, Eye } from "lucide-react"
import { format } from "date-fns"
import type { Transaction } from "@/utils/transaction-export"
import { TransactionExporter } from "@/utils/transaction-export"

// Sample transaction data with more variety
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
  {
    id: "9",
    date: "2024-01-07",
    description: "ATM Withdrawal",
    amount: -100.0,
    category: "Cash",
    type: "expense",
    status: "completed",
    account: "Checking Account",
    location: "Bank of America ATM",
  },
  {
    id: "10",
    date: "2024-01-06",
    description: "Investment Dividend",
    amount: 125.5,
    category: "Investment",
    type: "income",
    status: "completed",
    account: "Investment Account",
    reference: "DIV-AAPL-Q4",
  },
  {
    id: "11",
    date: "2024-01-05",
    description: "Restaurant Dinner",
    amount: -67.89,
    category: "Food & Dining",
    type: "expense",
    status: "pending",
    account: "Credit Card",
    merchant: "The French Laundry",
    location: "Yountville, CA",
  },
  {
    id: "12",
    date: "2024-01-04",
    description: "Online Shopping",
    amount: -234.99,
    category: "Shopping",
    type: "expense",
    status: "completed",
    account: "Credit Card",
    merchant: "Amazon",
    reference: "ORDER-123456789",
  },
]

interface TransactionListProps {
  transactions?: Transaction[]
}

export function TransactionList({ transactions = sampleTransactions }: TransactionListProps) {
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"date" | "amount" | "category">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  // Advanced filters state
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFiltersType>({
    searchTerm: "",
    categories: [],
    types: [],
    statuses: [],
    accounts: [],
    merchants: [],
    dateRange: {
      start: null,
      end: null,
    },
    amountRange: {
      min: 0,
      max: 10000,
    },
    hasLocation: null,
    hasReference: null,
  })

  // Get unique values for filters
  const availableCategories = useMemo(() => {
    return Array.from(new Set(transactions.map((t) => t.category))).sort()
  }, [transactions])

  const availableAccounts = useMemo(() => {
    return Array.from(new Set(transactions.map((t) => t.account))).sort()
  }, [transactions])

  const availableMerchants = useMemo(() => {
    return Array.from(new Set(transactions.map((t) => t.merchant).filter(Boolean))).sort()
  }, [transactions])

  // Apply advanced filters
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => {
        // Search term
        if (advancedFilters.searchTerm) {
          const searchLower = advancedFilters.searchTerm.toLowerCase()
          const matchesSearch =
            transaction.description.toLowerCase().includes(searchLower) ||
            transaction.merchant?.toLowerCase().includes(searchLower) ||
            transaction.category.toLowerCase().includes(searchLower) ||
            transaction.reference?.toLowerCase().includes(searchLower)
          if (!matchesSearch) return false
        }

        // Categories
        if (advancedFilters.categories.length > 0 && !advancedFilters.categories.includes(transaction.category)) {
          return false
        }

        // Types
        if (advancedFilters.types.length > 0 && !advancedFilters.types.includes(transaction.type)) {
          return false
        }

        // Status
        if (advancedFilters.statuses.length > 0 && !advancedFilters.statuses.includes(transaction.status)) {
          return false
        }

        // Accounts
        if (advancedFilters.accounts.length > 0 && !advancedFilters.accounts.includes(transaction.account)) {
          return false
        }

        // Merchants
        if (
          advancedFilters.merchants.length > 0 &&
          transaction.merchant &&
          !advancedFilters.merchants.includes(transaction.merchant)
        ) {
          return false
        }

        // Date range
        if (advancedFilters.dateRange.start || advancedFilters.dateRange.end) {
          const transactionDate = new Date(transaction.date)
          if (advancedFilters.dateRange.start && transactionDate < advancedFilters.dateRange.start) return false
          if (advancedFilters.dateRange.end && transactionDate > advancedFilters.dateRange.end) return false
        }

        // Amount range
        const absAmount = Math.abs(transaction.amount)
        if (absAmount < advancedFilters.amountRange.min || absAmount > advancedFilters.amountRange.max) {
          return false
        }

        // Has location
        if (advancedFilters.hasLocation !== null) {
          const hasLocation = Boolean(transaction.location)
          if (advancedFilters.hasLocation !== hasLocation) return false
        }

        // Has reference
        if (advancedFilters.hasReference !== null) {
          const hasReference = Boolean(transaction.reference)
          if (advancedFilters.hasReference !== hasReference) return false
        }

        return true
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
  }, [transactions, advancedFilters, sortBy, sortOrder])

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

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsDetailsModalOpen(true)
  }

  const handleTransactionSelect = (transactionId: string, checked: boolean) => {
    if (checked) {
      setSelectedTransactions([...selectedTransactions, transactionId])
    } else {
      setSelectedTransactions(selectedTransactions.filter((id) => id !== transactionId))
    }
  }

  const handleSelectAll = () => {
    setSelectedTransactions(filteredTransactions.map((t) => t.id))
  }

  const handleDeselectAll = () => {
    setSelectedTransactions([])
  }

  const handleBulkCategorize = (transactionIds: string[], category: string) => {
    // In a real app, this would update the backend
    console.log("Bulk categorize:", transactionIds, category)
  }

  const handleBulkDelete = (transactionIds: string[]) => {
    // In a real app, this would update the backend
    console.log("Bulk delete:", transactionIds)
    setSelectedTransactions([])
  }

  const handleBulkExport = (transactionIds: string[]) => {
    const selectedTxns = filteredTransactions.filter((t) => transactionIds.includes(t.id))
    const exporter = new TransactionExporter(selectedTxns)
    exporter.downloadCSV({
      format: "csv",
      dateRange: {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        end: new Date(),
      },
      includeColumns: ["date", "description", "amount", "category", "type", "status"],
      sortBy: "date",
      sortOrder: "desc",
    })
  }

  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    // In a real app, this would update the backend
    console.log("Update transaction:", updatedTransaction)
  }

  const resetFilters = () => {
    setAdvancedFilters({
      searchTerm: "",
      categories: [],
      types: [],
      statuses: [],
      accounts: [],
      merchants: [],
      dateRange: {
        start: null,
        end: null,
      },
      amountRange: {
        min: 0,
        max: 10000,
      },
      hasLocation: null,
      hasReference: null,
    })
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

      {/* Advanced Filters */}
      <AdvancedFilters
        filters={advancedFilters}
        onFiltersChange={setAdvancedFilters}
        availableCategories={availableCategories}
        availableAccounts={availableAccounts}
        availableMerchants={availableMerchants}
        onReset={resetFilters}
      />

      {/* Bulk Actions Toolbar */}
      <BulkActionsToolbar
        selectedTransactions={selectedTransactions}
        allTransactions={filteredTransactions}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
        onBulkCategorize={handleBulkCategorize}
        onBulkDelete={handleBulkDelete}
        onBulkExport={handleBulkExport}
        availableCategories={availableCategories}
      />

      {/* Transaction List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>View and manage your transaction history</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Select
                value={`${sortBy}-${sortOrder}`}
                onValueChange={(value) => {
                  const [newSortBy, newSortOrder] = value.split("-") as [typeof sortBy, typeof sortOrder]
                  setSortBy(newSortBy)
                  setSortOrder(newSortOrder)
                }}
              >
                <SelectTrigger className="w-48">
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
              <Button onClick={() => setIsExportModalOpen(true)}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* Transaction List */}
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={selectedTransactions.includes(transaction.id)}
                  onCheckedChange={(checked) => handleTransactionSelect(transaction.id, checked as boolean)}
                />
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
                <Button variant="ghost" size="sm" onClick={() => handleTransactionClick(transaction)}>
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

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

      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        transaction={selectedTransaction}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false)
          setSelectedTransaction(null)
        }}
        onUpdate={handleUpdateTransaction}
        availableCategories={availableCategories}
      />
    </div>
  )
}
