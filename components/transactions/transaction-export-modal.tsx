"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download, FileText, Table } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { TransactionExporter, type Transaction, type ExportOptions, getExportPreview } from "@/utils/transaction-export"

interface TransactionExportModalProps {
  isOpen: boolean
  onClose: () => void
  transactions: Transaction[]
  availableCategories: string[]
}

const COLUMN_OPTIONS = [
  { id: "date", label: "Date", required: true },
  { id: "description", label: "Description", required: true },
  { id: "amount", label: "Amount", required: true },
  { id: "category", label: "Category", required: false },
  { id: "type", label: "Type", required: false },
  { id: "status", label: "Status", required: false },
  { id: "account", label: "Account", required: false },
  { id: "reference", label: "Reference", required: false },
  { id: "merchant", label: "Merchant", required: false },
  { id: "location", label: "Location", required: false },
]

export function TransactionExportModal({
  isOpen,
  onClose,
  transactions,
  availableCategories,
}: TransactionExportModalProps) {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: "csv",
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      end: new Date(),
    },
    categories: [],
    includeColumns: ["date", "description", "amount", "category", "type", "status"],
    sortBy: "date",
    sortOrder: "desc",
  })

  const [filename, setFilename] = useState("")
  const [isExporting, setIsExporting] = useState(false)
  const [preview, setPreview] = useState<{ count: number; totalAmount: number; dateRange: string } | null>(null)

  // Update preview when options change
  useEffect(() => {
    if (transactions.length > 0) {
      const previewData = getExportPreview(transactions, exportOptions)
      setPreview(previewData)
    }
  }, [transactions, exportOptions])

  // Generate default filename
  useEffect(() => {
    const formatName = exportOptions.format.toUpperCase()
    const dateStr = format(new Date(), "yyyy-MM-dd")
    setFilename(`transactions_${dateStr}.${exportOptions.format}`)
  }, [exportOptions.format])

  const handleExport = async () => {
    setIsExporting(true)

    try {
      const exporter = new TransactionExporter(transactions)

      if (exportOptions.format === "csv") {
        exporter.downloadCSV(exportOptions, filename)
      } else {
        exporter.downloadPDF(exportOptions, filename)
      }

      // Close modal after successful export
      setTimeout(() => {
        onClose()
        setIsExporting(false)
      }, 1000)
    } catch (error) {
      console.error("Export failed:", error)
      setIsExporting(false)
    }
  }

  const handleColumnToggle = (columnId: string, checked: boolean) => {
    setExportOptions((prev) => ({
      ...prev,
      includeColumns: checked
        ? [...prev.includeColumns, columnId]
        : prev.includeColumns.filter((col) => col !== columnId),
    }))
  }

  const handleCategoryToggle = (category: string, checked: boolean) => {
    setExportOptions((prev) => ({
      ...prev,
      categories: checked
        ? [...(prev.categories || []), category]
        : (prev.categories || []).filter((cat) => cat !== category),
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Export Transactions
          </DialogTitle>
          <DialogDescription>Configure your export settings and download your transaction data</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Export Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Format Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Export Format</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={exportOptions.format === "csv" ? "default" : "outline"}
                    onClick={() => setExportOptions((prev) => ({ ...prev, format: "csv" }))}
                    className="h-20 flex-col"
                  >
                    <Table className="w-8 h-8 mb-2" />
                    CSV File
                  </Button>
                  <Button
                    variant={exportOptions.format === "pdf" ? "default" : "outline"}
                    onClick={() => setExportOptions((prev) => ({ ...prev, format: "pdf" }))}
                    className="h-20 flex-col"
                  >
                    <FileText className="w-8 h-8 mb-2" />
                    PDF Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Date Range */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Date Range</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !exportOptions.dateRange.start && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {exportOptions.dateRange.start ? (
                            format(exportOptions.dateRange.start, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={exportOptions.dateRange.start}
                          onSelect={(date) =>
                            date &&
                            setExportOptions((prev) => ({
                              ...prev,
                              dateRange: { ...prev.dateRange, start: date },
                            }))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !exportOptions.dateRange.end && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {exportOptions.dateRange.end ? (
                            format(exportOptions.dateRange.end, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={exportOptions.dateRange.end}
                          onSelect={(date) =>
                            date &&
                            setExportOptions((prev) => ({
                              ...prev,
                              dateRange: { ...prev.dateRange, end: date },
                            }))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
                <CardDescription>Select specific categories to include (leave empty for all)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={exportOptions.categories?.includes(category) || false}
                        onCheckedChange={(checked) => handleCategoryToggle(category, checked as boolean)}
                      />
                      <Label htmlFor={`category-${category}`} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Columns */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Columns to Include</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {COLUMN_OPTIONS.map((column) => (
                    <div key={column.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`column-${column.id}`}
                        checked={exportOptions.includeColumns.includes(column.id)}
                        onCheckedChange={(checked) => handleColumnToggle(column.id, checked as boolean)}
                        disabled={column.required}
                      />
                      <Label htmlFor={`column-${column.id}`} className="text-sm">
                        {column.label}
                        {column.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sorting */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sorting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Sort By</Label>
                    <Select
                      value={exportOptions.sortBy}
                      onValueChange={(value: "date" | "amount" | "category") =>
                        setExportOptions((prev) => ({ ...prev, sortBy: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="amount">Amount</SelectItem>
                        <SelectItem value="category">Category</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Order</Label>
                    <Select
                      value={exportOptions.sortOrder}
                      onValueChange={(value: "asc" | "desc") =>
                        setExportOptions((prev) => ({ ...prev, sortOrder: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="desc">Newest First</SelectItem>
                        <SelectItem value="asc">Oldest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filename */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">File Name</CardTitle>
              </CardHeader>
              <CardContent>
                <Input value={filename} onChange={(e) => setFilename(e.target.value)} placeholder="Enter filename" />
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Export Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {preview && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Transactions:</span>
                        <Badge variant="secondary">{preview.count}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Amount:</span>
                        <span className="text-sm font-medium">${preview.totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Date Range:</span>
                        <span className="text-sm">{preview.dateRange}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Format:</span>
                        <Badge>{exportOptions.format.toUpperCase()}</Badge>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Export Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• CSV files can be opened in Excel or Google Sheets</p>
                <p>• PDF reports include summary statistics</p>
                <p>• Large exports may take a few moments to generate</p>
                <p>• All sensitive data is processed locally</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isExporting}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={isExporting || !preview?.count}>
            {isExporting ? (
              <>
                <Download className="w-4 h-4 mr-2 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export {preview?.count || 0} Transactions
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
