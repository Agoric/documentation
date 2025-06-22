"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  CalendarIcon,
  Download,
  Upload,
  Eye,
  TrendingUp,
  DollarSign,
  CreditCard,
  Banknote,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
} from "lucide-react"
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"

interface Transaction {
  id: string
  date: Date
  type: "deposit" | "withdrawal" | "transfer" | "payment" | "fee" | "interest" | "qgi" | "bond"
  amount: number
  description: string
  category: string
  merchant?: string
  location?: string
  status: "pending" | "completed" | "failed" | "cancelled"
  balance: number
  reference: string
  tags: string[]
  metadata: Record<string, any>
}

interface TransactionFilters {
  search: string
  type: string[]
  category: string[]
  status: string[]
  dateRange: { from: Date | null; to: Date | null }
  amountRange: { min: number | null; max: number | null }
  tags: string[]
}

interface SortConfig {
  field: keyof Transaction
  direction: "asc" | "desc"
}

// Mock transaction data
const generateMockTransactions = (): Transaction[] => {
  const types = ["deposit", "withdrawal", "transfer", "payment", "fee", "interest", "qgi", "bond"] as const
  const categories = ["Food", "Transport", "Shopping", "Bills", "Investment", "Income", "Transfer", "Other"]
  const statuses = ["pending", "completed", "failed", "cancelled"] as const
  const merchants = ["Amazon", "Starbucks", "Uber", "Netflix", "Apple", "Google", "Microsoft", "Tesla"]

  return Array.from({ length: 150 }, (_, i) => ({
    id: `txn_${i + 1}`,
    date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
    type: types[Math.floor(Math.random() * types.length)],
    amount: Math.round((Math.random() * 2000 + 10) * 100) / 100,
    description: `Transaction ${i + 1} - ${merchants[Math.floor(Math.random() * merchants.length)]}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    merchant: Math.random() > 0.3 ? merchants[Math.floor(Math.random() * merchants.length)] : undefined,
    location: Math.random() > 0.5 ? "New York, NY" : undefined,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    balance: 25000 + Math.random() * 50000,
    reference: `REF${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    tags: Math.random() > 0.7 ? ["important", "recurring"] : [],
    metadata: {
      ip: "192.168.1.1",
      device: "iPhone 15 Pro",
      location: "New York, NY",
    },
  }))
}

export function AdvancedTransactionSystem() {
  const [transactions] = useState<Transaction[]>(generateMockTransactions())
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: "date", direction: "desc" })

  const [filters, setFilters] = useState<TransactionFilters>({
    search: "",
    type: [],
    category: [],
    status: [],
    dateRange: { from: null, to: null },
    amountRange: { min: null, max: null },
    tags: [],
  })

  // Advanced filtering logic
  const applyFilters = useMemo(() => {
    let filtered = [...transactions]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(searchLower) ||
          t.merchant?.toLowerCase().includes(searchLower) ||
          t.reference.toLowerCase().includes(searchLower) ||
          t.category.toLowerCase().includes(searchLower),
      )
    }

    // Type filter
    if (filters.type.length > 0) {
      filtered = filtered.filter((t) => filters.type.includes(t.type))
    }

    // Category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter((t) => filters.category.includes(t.category))
    }

    // Status filter
    if (filters.status.length > 0) {
      filtered = filtered.filter((t) => filters.status.includes(t.status))
    }

    // Date range filter
    if (filters.dateRange.from) {
      filtered = filtered.filter((t) => t.date >= filters.dateRange.from!)
    }
    if (filters.dateRange.to) {
      filtered = filtered.filter((t) => t.date <= filters.dateRange.to!)
    }

    // Amount range filter
    if (filters.amountRange.min !== null) {
      filtered = filtered.filter((t) => t.amount >= filters.amountRange.min!)
    }
    if (filters.amountRange.max !== null) {
      filtered = filtered.filter((t) => t.amount <= filters.amountRange.max!)
    }

    // Tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter((t) => filters.tags.some((tag) => t.tags.includes(tag)))
    }

    return filtered
  }, [transactions, filters])

  // Sorting logic
  const sortedTransactions = useMemo(() => {
    const sorted = [...applyFilters]
    sorted.sort((a, b) => {
      const aValue = a[sortConfig.field]
      const bValue = b[sortConfig.field]

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
      return 0
    })
    return sorted
  }, [applyFilters, sortConfig])

  // Pagination
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedTransactions.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedTransactions, currentPage, itemsPerPage])

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage)

  // Update filtered transactions when dependencies change
  useEffect(() => {
    setFilteredTransactions(sortedTransactions)
    setCurrentPage(1) // Reset to first page when filters change
  }, [sortedTransactions])

  const handleSort = (field: keyof Transaction) => {
    setSortConfig((prev) => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      type: [],
      category: [],
      status: [],
      dateRange: { from: null, to: null },
      amountRange: { min: null, max: null },
      tags: [],
    })
  }

  const exportTransactions = () => {
    const csv = [
      ["Date", "Type", "Amount", "Description", "Category", "Status", "Reference"],
      ...filteredTransactions.map((t) => [
        format(t.date, "yyyy-MM-dd"),
        t.type,
        t.amount.toString(),
        t.description,
        t.category,
        t.status,
        t.reference,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `transactions-${format(new Date(), "yyyy-MM-dd")}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "cancelled":
        return <AlertCircle className="w-4 h-4 text-gray-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="w-4 h-4 text-green-500" />
      case "withdrawal":
        return <ArrowUpRight className="w-4 h-4 text-red-500" />
      case "transfer":
        return <ArrowUpRight className="w-4 h-4 text-blue-500" />
      case "payment":
        return <CreditCard className="w-4 h-4 text-purple-500" />
      case "fee":
        return <DollarSign className="w-4 h-4 text-orange-500" />
      case "interest":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "qgi":
        return <Zap className="w-4 h-4 text-amber-500" />
      case "bond":
        return <Banknote className="w-4 h-4 text-indigo-500" />
      default:
        return <DollarSign className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-amber-300 font-serif">Advanced Transaction System</h1>
          <p className="text-purple-200 font-serif tracking-wider">COMPREHENSIVE FINANCIAL TRANSACTION MANAGEMENT</p>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm">Total Transactions</p>
                  <p className="text-2xl font-bold text-green-400">{filteredTransactions.length}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Total Volume</p>
                  <p className="text-2xl font-bold text-blue-400">
                    ${filteredTransactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-violet-900/50 border-purple-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm">Avg Transaction</p>
                  <p className="text-2xl font-bold text-purple-400">
                    $
                    {(
                      filteredTransactions.reduce((sum, t) => sum + t.amount, 0) / filteredTransactions.length || 0
                    ).toFixed(2)}
                  </p>
                </div>
                <ArrowUpRight className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-900/50 to-yellow-900/50 border-amber-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-200 text-sm">Pending</p>
                  <p className="text-2xl font-bold text-amber-400">
                    {filteredTransactions.filter((t) => t.status === "pending").length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-amber-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-amber-300 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Advanced Filters & Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-purple-800/30">
                <TabsTrigger value="basic">Basic Filters</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Filters</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Search */}
                  <div className="space-y-2">
                    <Label className="text-purple-200">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
                      <Input
                        placeholder="Search transactions..."
                        value={filters.search}
                        onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                        className="pl-10 bg-purple-800/30 border-purple-600 text-purple-100"
                      />
                    </div>
                  </div>

                  {/* Type Filter */}
                  <div className="space-y-2">
                    <Label className="text-purple-200">Transaction Type</Label>
                    <Select
                      value={filters.type[0] || "all"}
                      onValueChange={(value) =>
                        setFilters((prev) => ({
                          ...prev,
                          type: value === "all" ? [] : [value],
                        }))
                      }
                    >
                      <SelectTrigger className="bg-purple-800/30 border-purple-600 text-purple-100">
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All types</SelectItem>
                        <SelectItem value="deposit">Deposit</SelectItem>
                        <SelectItem value="withdrawal">Withdrawal</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                        <SelectItem value="payment">Payment</SelectItem>
                        <SelectItem value="fee">Fee</SelectItem>
                        <SelectItem value="interest">Interest</SelectItem>
                        <SelectItem value="qgi">QGI</SelectItem>
                        <SelectItem value="bond">Bond</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status Filter */}
                  <div className="space-y-2">
                    <Label className="text-purple-200">Status</Label>
                    <Select
                      value={filters.status[0] || "all"}
                      onValueChange={(value) =>
                        setFilters((prev) => ({
                          ...prev,
                          status: value === "all" ? [] : [value],
                        }))
                      }
                    >
                      <SelectTrigger className="bg-purple-800/30 border-purple-600 text-purple-100">
                        <SelectValue placeholder="All statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All statuses</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Date Range */}
                  <div className="space-y-2">
                    <Label className="text-purple-200">Date Range</Label>
                    <div className="flex space-x-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="bg-purple-800/30 border-purple-600 text-purple-100">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {filters.dateRange.from ? format(filters.dateRange.from, "MMM dd") : "From"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={filters.dateRange.from || undefined}
                            onSelect={(date) =>
                              setFilters((prev) => ({
                                ...prev,
                                dateRange: { ...prev.dateRange, from: date || null },
                              }))
                            }
                          />
                        </PopoverContent>
                      </Popover>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="bg-purple-800/30 border-purple-600 text-purple-100">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {filters.dateRange.to ? format(filters.dateRange.to, "MMM dd") : "To"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={filters.dateRange.to || undefined}
                            onSelect={(date) =>
                              setFilters((prev) => ({
                                ...prev,
                                dateRange: { ...prev.dateRange, to: date || null },
                              }))
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Amount Range */}
                  <div className="space-y-2">
                    <Label className="text-purple-200">Amount Range</Label>
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Min amount"
                        value={filters.amountRange.min || ""}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            amountRange: { ...prev.amountRange, min: e.target.value ? Number(e.target.value) : null },
                          }))
                        }
                        className="bg-purple-800/30 border-purple-600 text-purple-100"
                      />
                      <Input
                        type="number"
                        placeholder="Max amount"
                        value={filters.amountRange.max || ""}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            amountRange: { ...prev.amountRange, max: e.target.value ? Number(e.target.value) : null },
                          }))
                        }
                        className="bg-purple-800/30 border-purple-600 text-purple-100"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="actions" className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="bg-red-800/30 border-red-600 text-red-100"
                  >
                    Clear All Filters
                  </Button>
                  <Button
                    onClick={exportTransactions}
                    variant="outline"
                    className="bg-green-800/30 border-green-600 text-green-100"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button variant="outline" className="bg-blue-800/30 border-blue-600 text-blue-100">
                    <Upload className="w-4 h-4 mr-2" />
                    Import
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Transaction Table */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-amber-300">Transactions</CardTitle>
              <div className="flex items-center space-x-2">
                <Label className="text-purple-200">Per page:</Label>
                <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                  <SelectTrigger className="w-20 bg-purple-800/30 border-purple-600 text-purple-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-600/30">
                    <th className="text-left p-3 text-purple-200">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("date")}
                        className="text-purple-200 hover:text-amber-300"
                      >
                        Date
                        {sortConfig.field === "date" &&
                          (sortConfig.direction === "asc" ? (
                            <SortAsc className="w-4 h-4 ml-1" />
                          ) : (
                            <SortDesc className="w-4 h-4 ml-1" />
                          ))}
                      </Button>
                    </th>
                    <th className="text-left p-3 text-purple-200">Type</th>
                    <th className="text-left p-3 text-purple-200">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("amount")}
                        className="text-purple-200 hover:text-amber-300"
                      >
                        Amount
                        {sortConfig.field === "amount" &&
                          (sortConfig.direction === "asc" ? (
                            <SortAsc className="w-4 h-4 ml-1" />
                          ) : (
                            <SortDesc className="w-4 h-4 ml-1" />
                          ))}
                      </Button>
                    </th>
                    <th className="text-left p-3 text-purple-200">Description</th>
                    <th className="text-left p-3 text-purple-200">Category</th>
                    <th className="text-left p-3 text-purple-200">Status</th>
                    <th className="text-left p-3 text-purple-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {paginatedTransactions.map((transaction, index) => (
                      <motion.tr
                        key={transaction.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-purple-600/20 hover:bg-purple-800/20 transition-colors"
                      >
                        <td className="p-3 text-purple-100">{format(transaction.date, "MMM dd, yyyy")}</td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(transaction.type)}
                            <span className="text-purple-100 capitalize">{transaction.type}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <span
                            className={`font-semibold ${
                              transaction.type === "deposit" || transaction.type === "interest"
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {transaction.type === "deposit" || transaction.type === "interest" ? "+" : "-"}$
                            {transaction.amount.toLocaleString()}
                          </span>
                        </td>
                        <td className="p-3 text-purple-100 max-w-xs truncate">{transaction.description}</td>
                        <td className="p-3">
                          <Badge variant="outline" className="text-xs">
                            {transaction.category}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(transaction.status)}
                            <span className="text-purple-100 capitalize">{transaction.status}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedTransaction(transaction)}
                                className="text-purple-200 hover:text-amber-300"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gradient-to-br from-purple-900 to-indigo-900 border-amber-400/30 text-purple-100">
                              <DialogHeader>
                                <DialogTitle className="text-amber-300">Transaction Details</DialogTitle>
                                <DialogDescription className="text-purple-200">
                                  Complete information for transaction {transaction.reference}
                                </DialogDescription>
                              </DialogHeader>
                              {selectedTransaction && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-purple-300">Reference</Label>
                                      <p className="text-purple-100 font-mono">{selectedTransaction.reference}</p>
                                    </div>
                                    <div>
                                      <Label className="text-purple-300">Date</Label>
                                      <p className="text-purple-100">{format(selectedTransaction.date, "PPP")}</p>
                                    </div>
                                    <div>
                                      <Label className="text-purple-300">Amount</Label>
                                      <p className="text-purple-100 font-semibold">
                                        ${selectedTransaction.amount.toLocaleString()}
                                      </p>
                                    </div>
                                    <div>
                                      <Label className="text-purple-300">Balance After</Label>
                                      <p className="text-purple-100">${selectedTransaction.balance.toLocaleString()}</p>
                                    </div>
                                  </div>

                                  <Separator className="bg-purple-600/30" />

                                  <div>
                                    <Label className="text-purple-300">Description</Label>
                                    <p className="text-purple-100">{selectedTransaction.description}</p>
                                  </div>

                                  {selectedTransaction.merchant && (
                                    <div>
                                      <Label className="text-purple-300">Merchant</Label>
                                      <p className="text-purple-100">{selectedTransaction.merchant}</p>
                                    </div>
                                  )}

                                  {selectedTransaction.location && (
                                    <div>
                                      <Label className="text-purple-300">Location</Label>
                                      <p className="text-purple-100">{selectedTransaction.location}</p>
                                    </div>
                                  )}

                                  {selectedTransaction.tags.length > 0 && (
                                    <div>
                                      <Label className="text-purple-300">Tags</Label>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {selectedTransaction.tags.map((tag) => (
                                          <Badge key={tag} variant="secondary" className="text-xs">
                                            {tag}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  <Separator className="bg-purple-600/30" />

                                  <div>
                                    <Label className="text-purple-300">Metadata</Label>
                                    <div className="mt-2 space-y-1">
                                      <p className="text-purple-100 text-sm">
                                        Device: {selectedTransaction.metadata.device}
                                      </p>
                                      <p className="text-purple-100 text-sm">IP: {selectedTransaction.metadata.ip}</p>
                                      <p className="text-purple-100 text-sm">
                                        Location: {selectedTransaction.metadata.location}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-purple-200 text-sm">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, sortedTransactions.length)} of {sortedTransactions.length}{" "}
                transactions
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="bg-purple-800/30 border-purple-600 text-purple-100"
                >
                  Previous
                </Button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={
                          currentPage === page
                            ? "bg-amber-600 text-white"
                            : "bg-purple-800/30 border-purple-600 text-purple-100"
                        }
                      >
                        {page}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="bg-purple-800/30 border-purple-600 text-purple-100"
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
