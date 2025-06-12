"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  ArrowUpRight,
  CreditCard,
  DollarSign,
  LineChart,
  PiggyBank,
  Plus,
  Wallet,
  X,
  Filter,
  Calendar,
  ArrowDownAZ,
  ArrowUpAZ,
  ArrowDownUp,
  ArrowDown10,
  ArrowUp10,
  CalendarDays,
  Flag,
  Pencil,
  Tag,
  Share2,
  AlertCircle,
  Receipt,
  MapPin,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { ErrorBoundary } from "react-error-boundary"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"

// Extended transaction type with more details
interface Transaction {
  id: string
  description: string
  amount: number
  date: string
  category: string
  status?: "completed" | "pending" | "failed"
  paymentMethod?: string
  reference?: string
  notes?: string
  location?: string
  time?: string
  tags?: string[]
  isFlagged?: boolean
}

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

const transactions: Transaction[] = [
  {
    id: "1",
    description: "Amazon",
    amount: -84.29,
    date: "2023-05-15",
    category: "Shopping",
    status: "completed",
    paymentMethod: "Credit Card",
    reference: "AMZN-12345",
    notes: "Purchased office supplies",
    location: "amazon.com",
    time: "10:23 AM",
    tags: ["office", "supplies"],
  },
  {
    id: "2",
    description: "Salary Deposit",
    amount: 3200.0,
    date: "2023-05-14",
    category: "Income",
    status: "completed",
    paymentMethod: "Direct Deposit",
    reference: "PAYROLL-MAY-1",
    notes: "Monthly salary",
    time: "12:01 AM",
  },
  {
    id: "3",
    description: "Starbucks",
    amount: -5.75,
    date: "2023-05-14",
    category: "Food & Drink",
    status: "completed",
    paymentMethod: "Debit Card",
    reference: "SB-789012",
    location: "123 Main St",
    time: "8:45 AM",
    tags: ["coffee"],
  },
  {
    id: "4",
    description: "Uber",
    amount: -24.5,
    date: "2023-05-13",
    category: "Transportation",
    status: "completed",
    paymentMethod: "Credit Card",
    reference: "UBER-45678",
    location: "Downtown",
    time: "6:30 PM",
    tags: ["travel", "work"],
  },
  {
    id: "5",
    description: "Netflix",
    amount: -14.99,
    date: "2023-05-12",
    category: "Entertainment",
    status: "completed",
    paymentMethod: "Credit Card",
    reference: "NFLX-567890",
    notes: "Monthly subscription",
    time: "3:15 AM",
    tags: ["subscription"],
  },
  {
    id: "6",
    description: "Grocery Store",
    amount: -65.32,
    date: "2023-05-11",
    category: "Groceries",
    status: "completed",
    paymentMethod: "Debit Card",
    reference: "GS-901234",
    location: "456 Market St",
    time: "5:45 PM",
  },
  {
    id: "7",
    description: "Gas Station",
    amount: -42.5,
    date: "2023-05-10",
    category: "Transportation",
    status: "completed",
    paymentMethod: "Credit Card",
    reference: "FUEL-345678",
    location: "789 Gas Ave",
    time: "12:30 PM",
  },
  {
    id: "8",
    description: "Phone Bill",
    amount: -89.99,
    date: "2023-05-09",
    category: "Utilities",
    status: "completed",
    paymentMethod: "Automatic Payment",
    reference: "TELCO-123456",
    notes: "Monthly phone bill",
    time: "2:00 AM",
    tags: ["bill", "monthly"],
  },
  {
    id: "9",
    description: "Restaurant",
    amount: -78.25,
    date: "2023-05-08",
    category: "Food & Drink",
    status: "completed",
    paymentMethod: "Credit Card",
    reference: "REST-234567",
    location: "321 Dining Blvd",
    time: "7:15 PM",
    tags: ["dinner", "family"],
  },
  {
    id: "10",
    description: "Gym Membership",
    amount: -35.0,
    date: "2023-05-07",
    category: "Health & Fitness",
    status: "completed",
    paymentMethod: "Automatic Payment",
    reference: "GYM-456789",
    notes: "Monthly membership fee",
    time: "1:30 AM",
    tags: ["health", "subscription"],
  },
  {
    id: "11",
    description: "Online Course",
    amount: -199.99,
    date: "2023-05-06",
    category: "Education",
    status: "completed",
    paymentMethod: "Credit Card",
    reference: "EDU-567890",
    notes: "Web development course",
    location: "udemy.com",
    time: "11:20 AM",
    tags: ["education", "development"],
  },
  {
    id: "12",
    description: "Clothing Store",
    amount: -124.5,
    date: "2023-05-05",
    category: "Shopping",
    status: "completed",
    paymentMethod: "Credit Card",
    reference: "CLOTH-678901",
    location: "567 Fashion Ave",
    time: "3:45 PM",
    tags: ["clothes", "personal"],
  },
  {
    id: "13",
    description: "Dividend Payment",
    amount: 27.32,
    date: "2023-05-04",
    category: "Income",
    status: "completed",
    paymentMethod: "Direct Deposit",
    reference: "DIV-789012",
    notes: "Quarterly dividend payment",
    time: "9:00 AM",
    tags: ["investment", "passive"],
  },
  {
    id: "14",
    description: "Pharmacy",
    amount: -32.75,
    date: "2023-05-03",
    category: "Health & Fitness",
    status: "completed",
    paymentMethod: "Debit Card",
    reference: "PHARM-890123",
    location: "678 Health St",
    time: "10:15 AM",
  },
  {
    id: "15",
    description: "Internet Bill",
    amount: -79.99,
    date: "2023-05-02",
    category: "Utilities",
    status: "completed",
    paymentMethod: "Automatic Payment",
    reference: "ISP-901234",
    notes: "Monthly internet service",
    time: "3:30 AM",
    tags: ["bill", "monthly"],
  },
  {
    id: "16",
    description: "Freelance Payment",
    amount: 450.0,
    date: "2023-05-01",
    category: "Income",
    status: "completed",
    paymentMethod: "Bank Transfer",
    reference: "FREELANCE-012345",
    notes: "Website design project",
    time: "2:45 PM",
    tags: ["freelance", "design"],
  },
  {
    id: "17",
    description: "Hardware Store",
    amount: -87.45,
    date: "2023-04-30",
    category: "Home",
    status: "completed",
    paymentMethod: "Credit Card",
    reference: "HW-123456",
    location: "789 Builder Ave",
    time: "11:30 AM",
    tags: ["home", "repair"],
  },
  {
    id: "18",
    description: "Streaming Service",
    amount: -12.99,
    date: "2023-04-29",
    category: "Entertainment",
    status: "completed",
    paymentMethod: "Credit Card",
    reference: "STREAM-234567",
    notes: "Monthly subscription",
    time: "4:15 AM",
    tags: ["subscription", "entertainment"],
  },
  {
    id: "19",
    description: "Coffee Shop",
    amount: -4.5,
    date: "2023-04-28",
    category: "Food & Drink",
    status: "completed",
    paymentMethod: "Debit Card",
    reference: "COFFEE-345678",
    location: "123 Brew St",
    time: "9:20 AM",
    tags: ["coffee"],
  },
  {
    id: "20",
    description: "Rideshare",
    amount: -18.75,
    date: "2023-04-27",
    category: "Transportation",
    status: "completed",
    paymentMethod: "Credit Card",
    reference: "RIDE-456789",
    location: "Airport to Home",
    time: "10:45 PM",
    tags: ["travel", "airport"],
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

// Get unique categories from transactions
const getUniqueCategories = () => {
  const categories = transactions.map((transaction) => transaction.category)
  return [...new Set(categories)]
}

// Format date string to Date object
const parseDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number)
  return new Date(year, month - 1, day)
}

// Sort types
type SortField = "date" | "amount" | "category" | "description"
type SortDirection = "asc" | "desc"

export default function BankingDashboard() {
  // Safe state initialization
  const [activeTab, setActiveTab] = useState<string>("accounts")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const transactionsPerPage = 5

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [searchTerm, setSearchTerm] = useState<string>("")

  // Sort states
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  // Transaction detail modal states
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [transactionNotes, setTransactionNotes] = useState<string>("")
  const [isFlagged, setIsFlagged] = useState<boolean>(false)

  // Get unique categories
  const categories = getUniqueCategories()

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Reset to first page when filters or sort options change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, startDate, endDate, searchTerm, sortField, sortDirection])

  // Set transaction notes when a transaction is selected
  useEffect(() => {
    if (selectedTransaction) {
      setTransactionNotes(selectedTransaction.notes || "")
      setIsFlagged(selectedTransaction.isFlagged || false)
    }
  }, [selectedTransaction])

  // Open transaction detail modal
  const openTransactionModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsModalOpen(true)
  }

  // Close transaction detail modal
  const closeTransactionModal = () => {
    setIsModalOpen(false)
    // We'll clear the selected transaction after the modal animation completes
    setTimeout(() => {
      setSelectedTransaction(null)
      setTransactionNotes("")
      setIsFlagged(false)
    }, 300)
  }

  // Save transaction notes
  const saveTransactionNotes = () => {
    if (selectedTransaction) {
      // In a real app, this would make an API call to update the transaction
      console.log(`Saving notes for transaction ${selectedTransaction.id}: ${transactionNotes}`)

      // Update the transaction in our local state (for demo purposes)
      const updatedTransactions = transactions.map((t) =>
        t.id === selectedTransaction.id ? { ...t, notes: transactionNotes } : t,
      )

      // Show success message or notification here
    }
  }

  // Toggle transaction flag
  const toggleTransactionFlag = () => {
    setIsFlagged(!isFlagged)
    if (selectedTransaction) {
      // In a real app, this would make an API call to update the transaction
      console.log(`Toggling flag for transaction ${selectedTransaction.id} to ${!isFlagged}`)

      // Update the transaction in our local state (for demo purposes)
      const updatedTransactions = transactions.map((t) =>
        t.id === selectedTransaction.id ? { ...t, isFlagged: !isFlagged } : t,
      )

      // Show success message or notification here
    }
  }

  // Filter transactions based on selected filters
  const filteredTransactions = transactions.filter((transaction) => {
    // Filter by category
    if (selectedCategory !== "all" && transaction.category !== selectedCategory) {
      return false
    }

    // Filter by date range
    if (startDate) {
      const transactionDate = parseDate(transaction.date)
      if (transactionDate < startDate) {
        return false
      }
    }

    if (endDate) {
      const transactionDate = parseDate(transaction.date)
      // Add one day to include the end date in the range
      const endDatePlusOne = new Date(endDate)
      endDatePlusOne.setDate(endDatePlusOne.getDate() + 1)
      if (transactionDate >= endDatePlusOne) {
        return false
      }
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        transaction.description.toLowerCase().includes(searchLower) ||
        transaction.category.toLowerCase().includes(searchLower) ||
        transaction.amount.toString().includes(searchLower)
      )
    }

    return true
  })

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortField === "date") {
      const dateA = parseDate(a.date).getTime()
      const dateB = parseDate(b.date).getTime()
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA
    } else if (sortField === "amount") {
      return sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount
    } else if (sortField === "category") {
      return sortDirection === "asc" ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category)
    } else if (sortField === "description") {
      return sortDirection === "asc"
        ? a.description.localeCompare(b.description)
        : b.description.localeCompare(a.description)
    }
    return 0
  })

  // Calculate pagination
  const totalPages = Math.ceil(sortedTransactions.length / transactionsPerPage)
  const paginatedTransactions = sortedTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage,
  )

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory("all")
    setStartDate(undefined)
    setEndDate(undefined)
    setSearchTerm("")
    setCurrentPage(1)
  }

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  }

  // Get sort icon based on field and direction
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowDownUp className="h-4 w-4" />

    if (field === "date") {
      return sortDirection === "asc" ? (
        <CalendarDays className="h-4 w-4 text-primary" />
      ) : (
        <CalendarDays className="h-4 w-4 text-primary" />
      )
    } else if (field === "amount") {
      return sortDirection === "asc" ? (
        <ArrowDown10 className="h-4 w-4 text-primary" />
      ) : (
        <ArrowUp10 className="h-4 w-4 text-primary" />
      )
    } else {
      return sortDirection === "asc" ? (
        <ArrowDownAZ className="h-4 w-4 text-primary" />
      ) : (
        <ArrowUpAZ className="h-4 w-4 text-primary" />
      )
    }
  }

  // Get sort label
  const getSortLabel = () => {
    const fieldLabels = {
      date: "Date",
      amount: "Amount",
      category: "Category",
      description: "Description",
    }

    const directionLabels = {
      asc: "Ascending",
      desc: "Descending",
    }

    return `${fieldLabels[sortField]} (${directionLabels[sortDirection]})`
  }

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
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Your latest financial activity</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      disabled={selectedCategory === "all" && !startDate && !endDate && !searchTerm}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filter and Sort Controls */}
                <div className="mb-6 space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/4">
                      <Input
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="w-full md:w-1/4">
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2 w-full md:w-2/4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <Calendar className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : "Start date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <Calendar className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : "End date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Sort Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {/* Active Filters */}
                      {(selectedCategory !== "all" || startDate || endDate || searchTerm) && (
                        <>
                          {selectedCategory !== "all" && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              Category: {selectedCategory}
                              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                            </Badge>
                          )}
                          {startDate && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              From: {format(startDate, "PP")}
                              <X className="h-3 w-3 cursor-pointer" onClick={() => setStartDate(undefined)} />
                            </Badge>
                          )}
                          {endDate && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              To: {format(endDate, "PP")}
                              <X className="h-3 w-3 cursor-pointer" onClick={() => setEndDate(undefined)} />
                            </Badge>
                          )}
                          {searchTerm && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              Search: {searchTerm}
                              <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchTerm("")} />
                            </Badge>
                          )}
                        </>
                      )}
                    </div>

                    {/* Sort Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="ml-auto">
                          <ArrowDownUp className="mr-2 h-4 w-4" />
                          Sort: {getSortLabel()}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="flex justify-between items-center"
                          onClick={() => {
                            setSortField("date")
                            if (sortField === "date") toggleSortDirection()
                            else setSortDirection("desc")
                          }}
                        >
                          Date {getSortIcon("date")}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex justify-between items-center"
                          onClick={() => {
                            setSortField("amount")
                            if (sortField === "amount") toggleSortDirection()
                            else setSortDirection("desc")
                          }}
                        >
                          Amount {getSortIcon("amount")}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex justify-between items-center"
                          onClick={() => {
                            setSortField("category")
                            if (sortField === "category") toggleSortDirection()
                            else setSortDirection("asc")
                          }}
                        >
                          Category {getSortIcon("category")}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex justify-between items-center"
                          onClick={() => {
                            setSortField("description")
                            if (sortField === "description") toggleSortDirection()
                            else setSortDirection("asc")
                          }}
                        >
                          Description {getSortIcon("description")}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex justify-between items-center" onClick={toggleSortDirection}>
                          {sortDirection === "asc" ? "Sort Descending" : "Sort Ascending"}
                          {sortDirection === "asc" ? (
                            <ArrowUpAZ className="h-4 w-4" />
                          ) : (
                            <ArrowDownAZ className="h-4 w-4" />
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Transactions List with Sort Headers */}
                {paginatedTransactions.length > 0 ? (
                  <div>
                    {/* Column Headers with Sort Buttons */}
                    <div className="grid grid-cols-12 gap-2 pb-2 border-b font-medium text-sm">
                      <div
                        className="col-span-6 md:col-span-5 flex items-center cursor-pointer"
                        onClick={() => {
                          setSortField("description")
                          if (sortField === "description") toggleSortDirection()
                        }}
                      >
                        Description{" "}
                        {sortField === "description" &&
                          (sortDirection === "asc" ? (
                            <ArrowDownAZ className="ml-1 h-3 w-3" />
                          ) : (
                            <ArrowUpAZ className="ml-1 h-3 w-3" />
                          ))}
                      </div>
                      <div
                        className="col-span-3 md:col-span-3 flex items-center cursor-pointer"
                        onClick={() => {
                          setSortField("category")
                          if (sortField === "category") toggleSortDirection()
                        }}
                      >
                        Category{" "}
                        {sortField === "category" &&
                          (sortDirection === "asc" ? (
                            <ArrowDownAZ className="ml-1 h-3 w-3" />
                          ) : (
                            <ArrowUpAZ className="ml-1 h-3 w-3" />
                          ))}
                      </div>
                      <div
                        className="col-span-3 md:col-span-2 flex items-center cursor-pointer"
                        onClick={() => {
                          setSortField("date")
                          if (sortField === "date") toggleSortDirection()
                        }}
                      >
                        Date{" "}
                        {sortField === "date" &&
                          (sortDirection === "asc" ? (
                            <ArrowDownAZ className="ml-1 h-3 w-3" />
                          ) : (
                            <ArrowUpAZ className="ml-1 h-3 w-3" />
                          ))}
                      </div>
                      <div
                        className="hidden md:flex md:col-span-2 items-center justify-end cursor-pointer"
                        onClick={() => {
                          setSortField("amount")
                          if (sortField === "amount") toggleSortDirection()
                        }}
                      >
                        Amount{" "}
                        {sortField === "amount" &&
                          (sortDirection === "asc" ? (
                            <ArrowDown10 className="ml-1 h-3 w-3" />
                          ) : (
                            <ArrowUp10 className="ml-1 h-3 w-3" />
                          ))}
                      </div>
                    </div>

                    {/* Transaction Rows */}
                    <div className="space-y-2 mt-2">
                      {paginatedTransactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="grid grid-cols-12 gap-2 py-2 border-b items-center hover:bg-muted/50 cursor-pointer transition-colors rounded-md px-2"
                          onClick={() => openTransactionModal(transaction)}
                        >
                          <div className="col-span-6 md:col-span-5 flex items-center">
                            <div
                              className={`mr-3 rounded-full p-2 ${
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
                              {transaction.time && <p className="text-xs text-muted-foreground">{transaction.time}</p>}
                            </div>
                          </div>
                          <div className="col-span-3 md:col-span-3">
                            <Badge variant="outline">{transaction.category}</Badge>
                          </div>
                          <div className="col-span-3 md:col-span-2 text-sm text-muted-foreground">
                            {transaction.date}
                          </div>
                          <div
                            className={`hidden md:block md:col-span-2 font-medium text-right ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Filter className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No transactions found</h3>
                    <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
                    <Button variant="outline" className="mt-4" onClick={clearFilters}>
                      Clear All Filters
                    </Button>
                  </div>
                )}

                {/* Pagination Controls */}
                {filteredTransactions.length > 0 && (
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-muted-foreground">
                      Showing {Math.min(sortedTransactions.length, (currentPage - 1) * transactionsPerPage + 1)} to{" "}
                      {Math.min(currentPage * transactionsPerPage, sortedTransactions.length)} of{" "}
                      {sortedTransactions.length} transactions
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      {totalPages <= 5 ? (
                        // Show all pages if 5 or fewer
                        Array.from({ length: totalPages }).map((_, index) => (
                          <Button
                            key={index}
                            variant={currentPage === index + 1 ? "default" : "outline"}
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={() => setCurrentPage(index + 1)}
                          >
                            {index + 1}
                          </Button>
                        ))
                      ) : (
                        // Show limited pages with ellipsis for many pages
                        <>
                          <Button
                            variant={currentPage === 1 ? "default" : "outline"}
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={() => setCurrentPage(1)}
                          >
                            1
                          </Button>

                          {currentPage > 3 && <span className="mx-1">...</span>}

                          {currentPage > 2 && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-8 h-8 p-0"
                              onClick={() => setCurrentPage(currentPage - 1)}
                            >
                              {currentPage - 1}
                            </Button>
                          )}

                          {currentPage !== 1 && currentPage !== totalPages && (
                            <Button variant="default" size="sm" className="w-8 h-8 p-0">
                              {currentPage}
                            </Button>
                          )}

                          {currentPage < totalPages - 1 && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-8 h-8 p-0"
                              onClick={() => setCurrentPage(currentPage + 1)}
                            >
                              {currentPage + 1}
                            </Button>
                          )}

                          {currentPage < totalPages - 2 && <span className="mx-1">...</span>}

                          <Button
                            variant={currentPage === totalPages ? "default" : "outline"}
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={() => setCurrentPage(totalPages)}
                          >
                            {totalPages}
                          </Button>
                        </>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
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

      {/* Transaction Detail Modal */}
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedTransaction(null)
          }
          setIsModalOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedTransaction && selectedTransaction.amount && selectedTransaction.amount > 0 ? (
                <DollarSign className="h-5 w-5 text-green-600" />
              ) : (
                <CreditCard className="h-5 w-5 text-red-600" />
              )}
              Transaction Details
            </DialogTitle>
            <DialogDescription>View and manage details for this transaction</DialogDescription>
          </DialogHeader>

          {selectedTransaction ? (
            <div className="space-y-6">
              {/* Transaction Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">{selectedTransaction.description}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedTransaction.date} {selectedTransaction.time && `• ${selectedTransaction.time}`}
                  </p>
                </div>
                <div
                  className={`text-xl font-bold ${selectedTransaction.amount > 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {selectedTransaction.amount > 0 ? "+" : ""}${Math.abs(selectedTransaction.amount).toFixed(2)}
                </div>
              </div>

              <Separator />

              {/* Transaction Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                  <p className="font-medium">{selectedTransaction.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{selectedTransaction.status || "Completed"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                  <p className="font-medium">{selectedTransaction.paymentMethod || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reference</p>
                  <p className="font-medium">{selectedTransaction.reference || "Not available"}</p>
                </div>
                {selectedTransaction.location && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Location</p>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <p className="font-medium">{selectedTransaction.location}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Tags */}
              {selectedTransaction.tags && selectedTransaction.tags.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTransaction.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="text-sm font-medium text-muted-foreground">
                  Notes
                </label>
                <Textarea
                  id="notes"
                  placeholder="Add notes about this transaction..."
                  value={transactionNotes}
                  onChange={(e) => setTransactionNotes(e.target.value)}
                  className="mt-1"
                />
              </div>

              <Separator />

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleTransactionFlag}
                  className={isFlagged ? "bg-amber-50 text-amber-700 border-amber-200" : ""}
                >
                  <Flag className={`mr-2 h-4 w-4 ${isFlagged ? "text-amber-500" : ""}`} />
                  {isFlagged ? "Flagged" : "Flag"}
                </Button>
                <Button variant="outline" size="sm">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Category
                </Button>
                <Button variant="outline" size="sm">
                  <Receipt className="mr-2 h-4 w-4" />
                  Add Receipt
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Report Issue
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center">
              <Spinner className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Loading transaction details...</p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={closeTransactionModal}>
              Cancel
            </Button>
            <Button onClick={saveTransactionNotes} disabled={!selectedTransaction}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ErrorBoundary>
  )
}
