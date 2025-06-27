import jsPDF from "jspdf"
import "jspdf-autotable"

export interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  category: string
  type: "income" | "expense" | "transfer"
  status: "completed" | "pending" | "failed"
  account: string
  reference?: string
  merchant?: string
  location?: string
}

export interface ExportOptions {
  format: "csv" | "pdf"
  dateRange: {
    start: Date
    end: Date
  }
  categories?: string[]
  includeColumns: string[]
  sortBy: "date" | "amount" | "category"
  sortOrder: "asc" | "desc"
}

export class TransactionExporter {
  private transactions: Transaction[]

  constructor(transactions: Transaction[]) {
    this.transactions = transactions
  }

  private filterTransactions(options: ExportOptions): Transaction[] {
    return this.transactions
      .filter((transaction) => {
        const transactionDate = new Date(transaction.date)
        const inDateRange = transactionDate >= options.dateRange.start && transactionDate <= options.dateRange.end

        const inCategories = !options.categories?.length || options.categories.includes(transaction.category)

        return inDateRange && inCategories
      })
      .sort((a, b) => {
        let comparison = 0

        switch (options.sortBy) {
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

        return options.sortOrder === "desc" ? -comparison : comparison
      })
  }

  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  private formatDate(date: string): string {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  exportToCSV(options: ExportOptions): string {
    const filteredTransactions = this.filterTransactions(options)

    // Create CSV headers
    const headers = options.includeColumns.map((col) => {
      switch (col) {
        case "date":
          return "Date"
        case "description":
          return "Description"
        case "amount":
          return "Amount"
        case "category":
          return "Category"
        case "type":
          return "Type"
        case "status":
          return "Status"
        case "account":
          return "Account"
        case "reference":
          return "Reference"
        case "merchant":
          return "Merchant"
        case "location":
          return "Location"
        default:
          return col
      }
    })

    // Create CSV rows
    const rows = filteredTransactions.map((transaction) => {
      return options.includeColumns.map((col) => {
        switch (col) {
          case "date":
            return this.formatDate(transaction.date)
          case "amount":
            return transaction.amount.toString()
          case "description":
            return `"${transaction.description.replace(/"/g, '""')}"`
          case "category":
            return transaction.category
          case "type":
            return transaction.type
          case "status":
            return transaction.status
          case "account":
            return transaction.account
          case "reference":
            return transaction.reference || ""
          case "merchant":
            return transaction.merchant || ""
          case "location":
            return transaction.location || ""
          default:
            return ""
        }
      })
    })

    // Combine headers and rows
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n")

    return csvContent
  }

  exportToPDF(options: ExportOptions): jsPDF {
    const filteredTransactions = this.filterTransactions(options)
    const doc = new jsPDF()

    // Add title
    doc.setFontSize(20)
    doc.text("Transaction Export Report", 20, 20)

    // Add date range
    doc.setFontSize(12)
    doc.text(
      `Period: ${this.formatDate(options.dateRange.start.toISOString())} - ${this.formatDate(options.dateRange.end.toISOString())}`,
      20,
      35,
    )

    // Add summary
    const totalIncome = filteredTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

    const totalExpenses = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)

    doc.text(`Total Income: ${this.formatCurrency(totalIncome)}`, 20, 50)
    doc.text(`Total Expenses: ${this.formatCurrency(totalExpenses)}`, 20, 60)
    doc.text(`Net Amount: ${this.formatCurrency(totalIncome - totalExpenses)}`, 20, 70)

    // Prepare table data
    const tableHeaders = options.includeColumns.map((col) => {
      switch (col) {
        case "date":
          return "Date"
        case "description":
          return "Description"
        case "amount":
          return "Amount"
        case "category":
          return "Category"
        case "type":
          return "Type"
        case "status":
          return "Status"
        case "account":
          return "Account"
        default:
          return col
      }
    })

    const tableData = filteredTransactions.map((transaction) => {
      return options.includeColumns.map((col) => {
        switch (col) {
          case "date":
            return this.formatDate(transaction.date)
          case "amount":
            return this.formatCurrency(transaction.amount)
          case "description":
            return transaction.description.length > 30
              ? transaction.description.substring(0, 30) + "..."
              : transaction.description
          case "category":
            return transaction.category
          case "type":
            return transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)
          case "status":
            return transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)
          case "account":
            return transaction.account
          default:
            return ""
        }
      })
    })

    // Add table
    ;(doc as any).autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: 85,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    })

    return doc
  }

  downloadCSV(options: ExportOptions, filename?: string): void {
    const csvContent = this.exportToCSV(options)
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", filename || `transactions_${Date.now()}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  downloadPDF(options: ExportOptions, filename?: string): void {
    const doc = this.exportToPDF(options)
    doc.save(filename || `transactions_${Date.now()}.pdf`)
  }
}

// Utility functions for common export scenarios
export const exportTransactions = (transactions: Transaction[], options: Partial<ExportOptions> = {}) => {
  const defaultOptions: ExportOptions = {
    format: "csv",
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
      end: new Date(),
    },
    includeColumns: ["date", "description", "amount", "category", "type", "status"],
    sortBy: "date",
    sortOrder: "desc",
  }

  const finalOptions = { ...defaultOptions, ...options }
  const exporter = new TransactionExporter(transactions)

  if (finalOptions.format === "csv") {
    exporter.downloadCSV(finalOptions)
  } else {
    exporter.downloadPDF(finalOptions)
  }
}

export const getExportPreview = (
  transactions: Transaction[],
  options: ExportOptions,
): { count: number; totalAmount: number; dateRange: string } => {
  const exporter = new TransactionExporter(transactions)
  const filtered = (exporter as any).filterTransactions(options)

  const totalAmount = filtered.reduce((sum, t) => sum + Math.abs(t.amount), 0)
  const dateRange = `${new Date(options.dateRange.start).toLocaleDateString()} - ${new Date(options.dateRange.end).toLocaleDateString()}`

  return {
    count: filtered.length,
    totalAmount,
    dateRange,
  }
}
