"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CheckSquare, Square, MoreHorizontal, Tag, Trash2, Download, Edit3, Archive, Flag } from "lucide-react"
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [bulkCategory, setBulkCategory] = useState<string>("")

  const isAllSelected = selectedTransactions.length === allTransactions.length && allTransactions.length > 0
  const isPartiallySelected = selectedTransactions.length > 0 && selectedTransactions.length < allTransactions.length

  const handleSelectToggle = () => {
    if (isAllSelected) {
      onDeselectAll()
    } else {
      onSelectAll()
    }
  }

  const handleBulkCategorize = () => {
    if (bulkCategory && selectedTransactions.length > 0) {
      onBulkCategorize(selectedTransactions, bulkCategory)
      setBulkCategory("")
    }
  }

  const handleBulkDelete = () => {
    onBulkDelete(selectedTransactions)
    setShowDeleteDialog(false)
  }

  const selectedAmount = allTransactions
    .filter((t) => selectedTransactions.includes(t.id))
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  if (selectedTransactions.length === 0) {
    return null
  }

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={handleSelectToggle}>
            {isAllSelected ? (
              <CheckSquare className="w-4 h-4" />
            ) : isPartiallySelected ? (
              <div className="w-4 h-4 border-2 border-blue-600 bg-blue-600 rounded-sm flex items-center justify-center">
                <div className="w-2 h-0.5 bg-white" />
              </div>
            ) : (
              <Square className="w-4 h-4" />
            )}
          </Button>

          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{selectedTransactions.length} selected</Badge>
            <span className="text-sm text-muted-foreground">Total: ${selectedAmount.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Category Assignment */}
          <div className="flex items-center space-x-2">
            <Select value={bulkCategory} onValueChange={setBulkCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Set category" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="sm" onClick={handleBulkCategorize} disabled={!bulkCategory}>
              <Tag className="w-4 h-4 mr-2" />
              Apply
            </Button>
          </div>

          {/* Quick Actions */}
          <Button variant="outline" size="sm" onClick={() => onBulkExport(selectedTransactions)}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          {/* More Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit3 className="w-4 h-4 mr-2" />
                Bulk Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="w-4 h-4 mr-2" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Flag className="w-4 h-4 mr-2" />
                Flag for Review
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={() => setShowDeleteDialog(true)}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="sm" onClick={onDeselectAll}>
            Clear
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Transactions</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedTransactions.length} selected transaction
              {selectedTransactions.length === 1 ? "" : "s"}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
