"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowDownUp,
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  Filter,
  Search,
  ShoppingBag,
  Tag,
  X,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

// Sample transaction data
const transactions = [
  {
    id: "tx-001",
    type: "purchase",
    description: "Quantum Computing Access Token",
    amount: -2500,
    date: "2023-11-15",
    time: "14:32:45",
    status: "completed",
    category: "Technology",
    paymentMethod: "Credit Card",
    reference: "QC-ACCESS-001",
    platform: "SNAP-DAX",
  },
  {
    id: "tx-002",
    type: "dividend",
    description: "Commercial Real Estate Dividend",
    amount: 106.25,
    date: "2023-11-01",
    time: "00:00:00",
    status: "completed",
    category: "Investment",
    paymentMethod: "Direct Deposit",
    reference: "DIV-CRE-NOV",
    platform: "SNAP-DAX",
  },
  {
    id: "tx-003",
    type: "purchase",
    description: "AI Neural Interface",
    amount: -1299,
    date: "2023-10-22",
    time: "10:15:33",
    status: "completed",
    category: "Technology",
    paymentMethod: "Credit Card",
    reference: "AI-NEURAL-001",
    platform: "SNAP-DAX",
  },
  {
    id: "tx-004",
    type: "dividend",
    description: "Green Energy Infrastructure Dividend",
    amount: 37.92,
    date: "2023-10-01",
    time: "00:00:00",
    status: "completed",
    category: "Investment",
    paymentMethod: "Direct Deposit",
    reference: "DIV-GEI-OCT",
    platform: "SNAP-DAX",
  },
  {
    id: "tx-005",
    type: "purchase",
    description: "Technology Venture Fund Token",
    amount: -10000,
    date: "2023-09-10",
    time: "16:45:22",
    status: "completed",
    category: "Investment",
    paymentMethod: "Bank Transfer",
    reference: "TVF-TOKEN-001",
    platform: "SNAP-DAX",
  },
  {
    id: "tx-006",
    type: "purchase",
    description: "Holographic Display System",
    amount: -899,
    date: "2023-09-30",
    time: "11:22:18",
    status: "completed",
    category: "Hardware",
    paymentMethod: "Credit Card",
    reference: "HDS-001",
    platform: "SNAP-DAX",
  },
  {
    id: "tx-007",
    type: "dividend",
    description: "Technology Venture Fund Dividend",
    amount: 104.17,
    date: "2023-09-01",
    time: "00:00:00",
    status: "completed",
    category: "Investment",
    paymentMethod: "Direct Deposit",
    reference: "DIV-TVF-SEP",
    platform: "SNAP-DAX",
  },
  {
    id: "tx-008",
    type: "purchase",
    description: "Quantum-Secured Crypto Wallet",
    amount: -349,
    date: "2023-10-10",
    time: "09:12:55",
    status: "completed",
    category: "Security",
    paymentMethod: "Credit Card",
    reference: "QSCW-001",
    platform: "SNAP-DAX",
  },
]

export function TransactionCenter() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")
  const transactionsPerPage = 5

  // Get unique transaction types and categories
  const types = ["all", ...new Set(transactions.map((tx) => tx.type))]
  const categories = ["all", ...new Set(transactions.map((tx) => tx.category))]

  // Filter transactions
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      searchQuery === "" ||
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.reference.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || tx.type === typeFilter
    const matchesCategory = categoryFilter === "all" || tx.category === categoryFilter

    // Filter by date range
    let matchesDateRange = true
    if (startDate) {
      const txDate = new Date(tx.date)
      matchesDateRange = matchesDateRange && txDate >= startDate
    }
    if (endDate) {
      const txDate = new Date(tx.date)
      // Add one day to include the end date
      const endDatePlusOne = new Date(endDate)
      endDatePlusOne.setDate(endDatePlusOne.getDate() + 1)
      matchesDateRange = matchesDateRange && txDate < endDatePlusOne
    }

    return matchesSearch && matchesType && matchesCategory && matchesDateRange
  })

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortField === "date") {
      const dateA = new Date(`${a.date}T${a.time}`).getTime()
      const dateB = new Date(`${b.date}T${b.time}`).getTime()
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA
    } else if (sortField === "amount") {
      return sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount
    } else if (sortField === "description") {
      return sortDirection === "asc"
        ? a.description.localeCompare(b.description)
        : b.description.localeCompare(a.description)
    }
    return 0
  })

  // Pagination
  const totalPages = Math.ceil(sortedTransactions.length / transactionsPerPage)
  const paginatedTransactions = sortedTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage,
  )

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setTypeFilter("all")
    setCategoryFilter("all")
    setStartDate(undefined)
    setEndDate(undefined)
    setCurrentPage(1)
  }

  // Toggle sort direction
  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <CardTitle className="text-xl text-indigo-200">Transaction Center</CardTitle>
              <CardDescription className="text-indigo-400">View and manage all platform transactions</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                New Transaction
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 rounded-lg border border-indigo-500/20 bg-indigo-950/50 p-4 backdrop-blur-sm md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-indigo-400" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-indigo-500/20 bg-indigo-950/30 pl-8 text-indigo-200 placeholder:text-indigo-400/50"
              />
            </div>

            <div className="flex flex-1 flex-col gap-4 md:flex-row">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200">
                  <SelectValue placeholder="Transaction Type" />
                </SelectTrigger>
                <SelectContent className="border-indigo-500/20 bg-indigo-950/90 text-indigo-200 backdrop-blur-md">
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="border-indigo-500/20 bg-indigo-950/90 text-indigo-200 backdrop-blur-md">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200 hover:bg-indigo-900/30 hover:text-indigo-100"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "MMM d, yyyy") : "Start Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="border-indigo-500/20 bg-indigo-950/90 p-0 backdrop-blur-md">
                    <CalendarComponent
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="rounded-md border-indigo-500/20 bg-transparent text-indigo-200"
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-indigo-500/20 bg-indigo-950/30 text-indigo-200 hover:bg-indigo-900/30 hover:text-indigo-100"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "MMM d, yyyy") : "End Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="border-indigo-500/20 bg-indigo-950/90 p-0 backdrop-blur-md">
                    <CalendarComponent
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="rounded-md border-indigo-500/20 bg-transparent text-indigo-200"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button
                variant="outline"
                size="icon"
                className="border-indigo-500/20 bg-indigo-950/30 text-indigo-400 hover:bg-indigo-900/30 hover:text-indigo-300"
                onClick={clearFilters}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active filters */}
          {(searchQuery || typeFilter !== "all" || categoryFilter !== "all" || startDate || endDate) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {searchQuery && (
                <Badge className="bg-indigo-500/30 text-indigo-200">
                  Search: {searchQuery}
                  <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                </Badge>
              )}
              {typeFilter !== "all" && (
                <Badge className="bg-indigo-500/30 text-indigo-200">
                  Type: {typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)}
                  <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => setTypeFilter("all")} />
                </Badge>
              )}
              {categoryFilter !== "all" && (
                <Badge className="bg-indigo-500/30 text-indigo-200">
                  Category: {categoryFilter}
                  <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => setCategoryFilter("all")} />
                </Badge>
              )}
              {startDate && (
                <Badge className="bg-indigo-500/30 text-indigo-200">
                  From: {format(startDate, "MMM d, yyyy")}
                  <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => setStartDate(undefined)} />
                </Badge>
              )}
              {endDate && (
                <Badge className="bg-indigo-500/30 text-indigo-200">
                  To: {format(endDate, "MMM d, yyyy")}
                  <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => setEndDate(undefined)} />
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
                onClick={clearFilters}
              >
                Clear All
              </Button>
            </div>
          )}

          {/* Transactions table */}
          {paginatedTransactions.length > 0 ? (
            <div className="rounded-md border border-indigo-500/20">
              {/* Table header */}
              <div className="grid grid-cols-12 gap-2 border-b border-indigo-500/20 bg-indigo-950/50 p-3 text-xs font-medium text-indigo-300">
                <div className="col-span-5 flex cursor-pointer items-center" onClick={() => toggleSort("description")}>
                  Description
                  {sortField === "description" && <ArrowDownUp className="ml-1 h-3 w-3 text-indigo-400" />}
                </div>
                <div className="col-span-2 flex cursor-pointer items-center" onClick={() => toggleSort("date")}>
                  Date
                  {sortField === "date" && <ArrowDownUp className="ml-1 h-3 w-3 text-indigo-400" />}
                </div>
                <div className="col-span-2">Category</div>
                <div
                  className="col-span-2 flex cursor-pointer items-center justify-end"
                  onClick={() => toggleSort("amount")}
                >
                  Amount
                  {sortField === "amount" && <ArrowDownUp className="ml-1 h-3 w-3 text-indigo-400" />}
                </div>
                <div className="col-span-1 text-right">Status</div>
              </div>

              {/* Table rows */}
              <div className="divide-y divide-indigo-500/10">
                {paginatedTransactions.map((tx) => (
                  <div key={tx.id} className="grid grid-cols-12 gap-2 p-3 hover:bg-indigo-950/50">
                    <div className="col-span-5 flex items-center">
                      <div
                        className={`mr-3 rounded-full p-2 ${
                          tx.type === "purchase"
                            ? "bg-indigo-500/20"
                            : tx.type === "dividend"
                              ? "bg-emerald-500/20"
                              : "bg-amber-500/20"
                        }`}
                      >
                        {tx.type === "purchase" ? (
                          <ShoppingBag className="h-4 w-4 text-indigo-400" />
                        ) : tx.type === "dividend" ? (
                          <DollarSign className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <CreditCard className="h-4 w-4 text-amber-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-indigo-200">{tx.description}</div>
                        <div className="text-xs text-indigo-400">Ref: {tx.reference}</div>
                      </div>
                    </div>
                    <div className="col-span-2 flex flex-col justify-center">
                      <div className="text-sm text-indigo-300">{tx.date}</div>
                      <div className="text-xs text-indigo-400">{tx.time}</div>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <Badge variant="outline" className="border-indigo-500/30 text-indigo-300">
                        <Tag className="mr-1 h-3 w-3" />
                        {tx.category}
                      </Badge>
                    </div>
                    <div
                      className={`col-span-2 flex items-center justify-end font-medium ${
                        tx.amount > 0 ? "text-emerald-400" : "text-indigo-200"
                      }`}
                    >
                      {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toLocaleString()}
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                      <Badge
                        className={
                          tx.status === "completed"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : tx.status === "pending"
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-red-500/20 text-red-300"
                        }
                      >
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between border-t border-indigo-500/20 bg-indigo-950/50 p-3">
                <div className="text-xs text-indigo-400">
                  Showing {(currentPage - 1) * transactionsPerPage + 1} to{" "}
                  {Math.min(currentPage * transactionsPerPage, filteredTransactions.length)} of{" "}
                  {filteredTransactions.length} transactions
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-xs text-indigo-300">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-950/30 p-6 text-center backdrop-blur-sm">
              <Filter className="mb-2 h-8 w-8 text-indigo-400" />
              <p className="text-indigo-300">No transactions match your filters</p>
              <Button variant="link" className="mt-2 text-indigo-400" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transaction summary */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-indigo-200">Total Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              $
              {transactions
                .filter((tx) => tx.type === "purchase")
                .reduce((sum, tx) => sum + Math.abs(tx.amount), 0)
                .toLocaleString()}
            </div>
            <div className="mt-1 flex items-center text-sm text-indigo-400">
              <ShoppingBag className="mr-1 h-4 w-4" />
              {transactions.filter((tx) => tx.type === "purchase").length} transactions
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-indigo-200">Total Dividends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              $
              {transactions
                .filter((tx) => tx.type === "dividend")
                .reduce((sum, tx) => sum + tx.amount, 0)
                .toLocaleString()}
            </div>
            <div className="mt-1 flex items-center text-sm text-emerald-400">
              <DollarSign className="mr-1 h-4 w-4" />
              {transactions.filter((tx) => tx.type === "dividend").length} distributions
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-indigo-200">Net Position</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              ${transactions.reduce((sum, tx) => sum + tx.amount, 0).toLocaleString()}
            </div>
            <div className="mt-1 flex items-center text-sm text-indigo-400">
              <Clock className="mr-1 h-4 w-4" />
              Last transaction: {new Date(transactions[0].date).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction visualization */}
      <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-indigo-200">Transaction Analysis</CardTitle>
            <Tabs defaultValue="monthly" className="w-[400px]">
              <TabsList className="grid w-full grid-cols-3 border border-indigo-500/20 bg-indigo-950/30 p-1">
                <TabsTrigger
                  value="weekly"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
                >
                  Weekly
                </TabsTrigger>
                <TabsTrigger
                  value="monthly"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger
                  value="yearly"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white"
                >
                  Yearly
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 rounded-md bg-indigo-950/50 p-4">
            <div className="flex h-full items-center justify-center text-indigo-400">
              Transaction analysis visualization would appear here
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
