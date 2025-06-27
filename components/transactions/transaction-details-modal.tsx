"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  CreditCard,
  MapPin,
  Calendar,
  DollarSign,
  Tag,
  Building,
  FileText,
  Edit3,
  Save,
  X,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
} from "lucide-react"
import { format } from "date-fns"
import type { Transaction } from "@/utils/transaction-export"

interface TransactionDetailsModalProps {
  transaction: Transaction | null
  isOpen: boolean
  onClose: () => void
  onUpdate?: (transaction: Transaction) => void
  availableCategories: string[]
}

export function TransactionDetailsModal({
  transaction,
  isOpen,
  onClose,
  onUpdate,
  availableCategories,
}: TransactionDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTransaction, setEditedTransaction] = useState<Transaction | null>(null)

  if (!transaction) return null

  const handleEdit = () => {
    setEditedTransaction({ ...transaction })
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editedTransaction && onUpdate) {
      onUpdate(editedTransaction)
    }
    setIsEditing(false)
    setEditedTransaction(null)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedTransaction(null)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "income":
        return <TrendingUp className="w-6 h-6 text-green-600" />
      case "expense":
        return <TrendingDown className="w-6 h-6 text-red-600" />
      case "transfer":
        return <ArrowUpDown className="w-6 h-6 text-blue-600" />
      default:
        return <CreditCard className="w-6 h-6 text-gray-600" />
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

  const currentTransaction = editedTransaction || transaction

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getTransactionIcon(currentTransaction.type)}
              <div>
                <DialogTitle className="text-xl">Transaction Details</DialogTitle>
                <DialogDescription>
                  {format(new Date(currentTransaction.date), "MMMM dd, yyyy 'at' h:mm a")}
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Transaction Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Transaction Information</span>
                {getStatusBadge(currentTransaction.status)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Description
                  </Label>
                  {isEditing ? (
                    <Input
                      value={currentTransaction.description}
                      onChange={(e) =>
                        setEditedTransaction((prev) => (prev ? { ...prev, description: e.target.value } : null))
                      }
                    />
                  ) : (
                    <p className="text-sm bg-gray-50 p-2 rounded">{currentTransaction.description}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Amount
                  </Label>
                  {isEditing ? (
                    <Input
                      type="number"
                      step="0.01"
                      value={currentTransaction.amount}
                      onChange={(e) =>
                        setEditedTransaction((prev) =>
                          prev ? { ...prev, amount: Number.parseFloat(e.target.value) || 0 } : null,
                        )
                      }
                    />
                  ) : (
                    <p
                      className={`text-lg font-semibold ${
                        currentTransaction.amount >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {currentTransaction.amount >= 0 ? "+" : ""}
                      {formatCurrency(currentTransaction.amount)}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center">
                    <Tag className="w-4 h-4 mr-2" />
                    Category
                  </Label>
                  {isEditing ? (
                    <Select
                      value={currentTransaction.category}
                      onValueChange={(value) =>
                        setEditedTransaction((prev) => (prev ? { ...prev, category: value } : null))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge variant="secondary">{currentTransaction.category}</Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Date
                  </Label>
                  {isEditing ? (
                    <Input
                      type="date"
                      value={currentTransaction.date}
                      onChange={(e) =>
                        setEditedTransaction((prev) => (prev ? { ...prev, date: e.target.value } : null))
                      }
                    />
                  ) : (
                    <p className="text-sm bg-gray-50 p-2 rounded">
                      {format(new Date(currentTransaction.date), "EEEE, MMMM dd, yyyy")}
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  {isEditing ? (
                    <Select
                      value={currentTransaction.type}
                      onValueChange={(value: "income" | "expense" | "transfer") =>
                        setEditedTransaction((prev) => (prev ? { ...prev, type: value } : null))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge
                      variant={
                        currentTransaction.type === "income"
                          ? "default"
                          : currentTransaction.type === "expense"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {currentTransaction.type.charAt(0).toUpperCase() + currentTransaction.type.slice(1)}
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center">
                    <Building className="w-4 h-4 mr-2" />
                    Account
                  </Label>
                  {isEditing ? (
                    <Input
                      value={currentTransaction.account}
                      onChange={(e) =>
                        setEditedTransaction((prev) => (prev ? { ...prev, account: e.target.value } : null))
                      }
                    />
                  ) : (
                    <p className="text-sm bg-gray-50 p-2 rounded">{currentTransaction.account}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          {(currentTransaction.merchant || currentTransaction.location || currentTransaction.reference) && (
            <Card>
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentTransaction.merchant && (
                  <div className="space-y-2">
                    <Label className="flex items-center">
                      <Building className="w-4 h-4 mr-2" />
                      Merchant
                    </Label>
                    {isEditing ? (
                      <Input
                        value={currentTransaction.merchant}
                        onChange={(e) =>
                          setEditedTransaction((prev) => (prev ? { ...prev, merchant: e.target.value } : null))
                        }
                      />
                    ) : (
                      <p className="text-sm bg-gray-50 p-2 rounded">{currentTransaction.merchant}</p>
                    )}
                  </div>
                )}

                {currentTransaction.location && (
                  <div className="space-y-2">
                    <Label className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Location
                    </Label>
                    {isEditing ? (
                      <Input
                        value={currentTransaction.location}
                        onChange={(e) =>
                          setEditedTransaction((prev) => (prev ? { ...prev, location: e.target.value } : null))
                        }
                      />
                    ) : (
                      <p className="text-sm bg-gray-50 p-2 rounded">{currentTransaction.location}</p>
                    )}
                  </div>
                )}

                {currentTransaction.reference && (
                  <div className="space-y-2">
                    <Label className="flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Reference
                    </Label>
                    {isEditing ? (
                      <Input
                        value={currentTransaction.reference}
                        onChange={(e) =>
                          setEditedTransaction((prev) => (prev ? { ...prev, reference: e.target.value } : null))
                        }
                      />
                    ) : (
                      <p className="text-sm bg-gray-50 p-2 rounded font-mono">{currentTransaction.reference}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
              <CardDescription>Add personal notes about this transaction</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Add notes about this transaction..." className="min-h-[100px]" defaultValue="" />
            </CardContent>
          </Card>

          {/* Transaction ID */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Transaction ID:</span>
                <code className="bg-gray-100 px-2 py-1 rounded text-xs">{currentTransaction.id}</code>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
