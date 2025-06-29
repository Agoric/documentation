"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tag, Trash2, Download, Edit3, Archive, Star, Flag, X, ChevronDown, MoreHorizontal } from "lucide-react"
import type { Transaction } from "@/utils/transaction-export"

interface BulkActionsToolbarProps {
  selectedTransactions: string[]
  allTransactions: Transaction[]
  onSelectAll: () => void
  onDeselectAll: () => void
  onBulkCategorize: (transactionIds: string[], category: string) => void
  onBulkDelete: (transactionIds: string[]) => void
  onBulkExport: (transactionIds: string[]) => void
  availableCategories: string[]
}

export function BulkActionsToolbar({
  selectedTransactions,
  allTransactions,
  onSelectAll,
  onDeselectAll,
  onBulkCategorize,
  onBulkDelete,
  onBulkExport,
  availableCategories,
}: BulkActionsToolbarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")

  const selectedCount = selectedTransactions.length
  const totalCount = allTransactions.length
  const isAllSelected = selectedCount === totalCount && totalCount > 0
  const isPartiallySelected = selectedCount > 0 && selectedCount < totalCount

  const handleCategorize = () => {
    if (selectedCategory && selectedTransactions.length > 0) {
      onBulkCategorize(selectedTransactions, selectedCategory)
      setSelectedCategory("")
    }
  }

  const handleBulkAction = (action: string) => {
    switch (action) {
      case "export":
        onBulkExport(selectedTransactions)
        break
      case "archive":
        console.log("Archive transactions:", selectedTransactions)
        break
      case "flag":
        console.log("Flag transactions:", selectedTransactions)
        break
      case "star":
        console.log("Star transactions:", selectedTransactions)
        break
    }
  }

  if (selectedCount === 0) {
    return null
  }

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          {/* Selection Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={isAllSelected}
                ref={(el) => {
                  if (el) el.indeterminate = isPartiallySelected
                }}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onSelectAll()
                  } else {
                    onDeselectAll()
                  }
                }}
              />
              <span className="text-sm font-medium text-blue-900">
                {selectedCount} of {totalCount} transaction{selectedCount !== 1 ? "s" : ""} selected
              </span>
            </div>

            <Button variant="ghost" size="sm" onClick={onDeselectAll} className="text-blue-700 hover:text-blue-900">
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {/* Categorize */}
            <div className="flex items-center gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Categorize" />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                size="sm"
                onClick={handleCategorize}
                disabled={!selectedCategory}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Tag className="h-4 w-4 mr-1" />
                Apply
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* Export */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction("export")}
              className="border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>

            {/* More Actions */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              <MoreHorizontal className="h-4 w-4 mr-1" />
              More
              <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
            </Button>

            {/* Delete */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Transactions</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete {selectedCount} transaction{selectedCount !== 1 ? "s" : ""}? This
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onBulkDelete(selectedTransactions)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete {selectedCount} Transaction{selectedCount !== 1 ? "s" : ""}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Expanded Actions */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-blue-200">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-blue-700 font-medium">Additional Actions:</span>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleBulkAction("star")}
                className="text-blue-700 hover:bg-blue-100"
              >
                <Star className="h-4 w-4 mr-1" />
                Star
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleBulkAction("flag")}
                className="text-blue-700 hover:bg-blue-100"
              >
                <Flag className="h-4 w-4 mr-1" />
                Flag
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleBulkAction("archive")}
                className="text-blue-700 hover:bg-blue-100"
              >
                <Archive className="h-4 w-4 mr-1" />
                Archive
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => console.log("Bulk edit:", selectedTransactions)}
                className="text-blue-700 hover:bg-blue-100"
              >
                <Edit3 className="h-4 w-4 mr-1" />
                Edit Details
              </Button>
            </div>

            {/* Selection Summary */}
            <div className="mt-3 p-3 bg-blue-100 rounded-lg">
              <div className="text-sm text-blue-800">
                <strong>Selection Summary:</strong>
                <div className="mt-1 flex gap-4">
                  <span>
                    Income:{" "}
                    {allTransactions.filter((t) => selectedTransactions.includes(t.id) && t.type === "income").length}
                  </span>
                  <span>
                    Expenses:{" "}
                    {allTransactions.filter((t) => selectedTransactions.includes(t.id) && t.type === "expense").length}
                  </span>
                  <span>
                    Transfers:{" "}
                    {allTransactions.filter((t) => selectedTransactions.includes(t.id) && t.type === "transfer").length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
