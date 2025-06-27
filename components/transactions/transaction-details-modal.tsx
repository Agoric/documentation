"use client"

import React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Edit3,
  Save,
  X,
  MapPin,
  Calendar,
  CreditCard,
  Building2,
  FileText,
  Tag,
  DollarSign,
  Clock,
  User,
  Phone,
  ExternalLink,
  Receipt,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
} from "lucide-react"
import type { Transaction } from "@/utils/transaction-export"
import { format } from "date-fns"

interface TransactionDetailsModalProps {
  transaction: Transaction | null
  isOpen: boolean
  onClose: () => void
  onUpdate: (transaction: Transaction) => void
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
  const [notes, setNotes] = useState("")
  const [tags, setTags] = useState<string[]>([])

  React.useEffect(() => {
    if (transaction) {
      setEditedTransaction({ ...transaction })
      setNotes(transaction.notes || "")
      setTags(transaction.tags || [])
    }
  }, [transaction])

  if (!transaction || !editedTransaction) return null

  const handleSave = () => {
    const updatedTransaction = {
      ...editedTransaction,
      notes,
      tags,
    }
    onUpdate(updatedTransaction)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTransaction({ ...transaction })
    setNotes(transaction.notes || "")
    setTags(transaction.tags || [])
    setIsEditing(false)
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
        return <TrendingUp className="w-5 h-5 text-green-600" />
      case "expense":
        return <TrendingDown className="w-5 h-5 text-red-600" />
      case "transfer":
        return <ArrowUpDown className="w-5 h-5 text-blue-600" />
      default:
        return <CreditCard className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getTransactionIcon(transaction.type)}
              <div>
                <DialogTitle className="text-xl">{transaction.description}</DialogTitle>
                <DialogDescription className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(transaction.date), "MMMM dd, yyyy 'at' h:mm a")}
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(transaction.status)}
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
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

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="merchant">Merchant</TabsTrigger>
            <TabsTrigger value="notes">Notes & Tags</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Transaction Amount */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Transaction Amount
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div
                      className={`text-3xl font-bold ${transaction.amount >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {transaction.amount >= 0 ? "+" : ""}
                      {formatCurrency(transaction.amount)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {transaction.type === "income"
                        ? "Money received"
                        : transaction.type === "expense"
                          ? "Money spent"
                          : "Money transferred"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Transaction Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Transaction Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction ID:</span>
                    <span className="font-mono text-sm">{transaction.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <Badge variant="outline" className="capitalize">
                      {transaction.type}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account:</span>
                    <span>{transaction.account}</span>
                  </div>
                  {transaction.reference && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reference:</span>
                      <span className="font-mono text-sm">{transaction.reference}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Editable Fields */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Transaction Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    {isEditing ? (
                      <Input
                        id="description"
                        value={editedTransaction.description}
                        onChange={(e) =>
                          setEditedTransaction({
                            ...editedTransaction,
                            description: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <p className="p-2 bg-muted rounded">{transaction.description}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    {isEditing ? (
                      <Select
                        value={editedTransaction.category}
                        onValueChange={(value) =>
                          setEditedTransaction({
                            ...editedTransaction,
                            category: value,
                          })
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
                      <p className="p-2 bg-muted rounded">{transaction.category}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    {isEditing ? (
                      <Input
                        id="date"
                        type="date"
                        value={editedTransaction.date}
                        onChange={(e) =>
                          setEditedTransaction({
                            ...editedTransaction,
                            date: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <p className="p-2 bg-muted rounded">{format(new Date(transaction.date), "MMMM dd, yyyy")}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    {isEditing ? (
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        value={editedTransaction.amount}
                        onChange={(e) =>
                          setEditedTransaction({
                            ...editedTransaction,
                            amount: Number.parseFloat(e.target.value),
                          })
                        }
                      />
                    ) : (
                      <p className="p-2 bg-muted rounded">{formatCurrency(transaction.amount)}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="merchant" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Merchant Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {transaction.merchant ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Merchant Name</Label>
                        <p className="p-2 bg-muted rounded">{transaction.merchant}</p>
                      </div>
                      {transaction.location && (
                        <div className="space-y-2">
                          <Label>Location</Label>
                          <p className="p-2 bg-muted rounded flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {transaction.location}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Mock merchant details */}
                    <Separator />
                    <div className="space-y-3">
                      <h4 className="font-medium">Additional Merchant Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Category:</span>
                          <span>Retail</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">MCC Code:</span>
                          <span>5411</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Phone:</span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            (555) 123-4567
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Website:</span>
                          <span className="flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" />
                            <a href="#" className="text-blue-600 hover:underline">
                              Visit Website
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Building2 className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">No merchant information available</p>
                    <p className="text-sm text-gray-500">This transaction may be a transfer or internal transaction</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Notes & Tags
                </CardTitle>
                <CardDescription>Add personal notes and tags to help organize your transactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notes">Personal Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any notes about this transaction..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => setTags(tags.filter((_, i) => i !== index))}
                        />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag..."
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          const value = e.currentTarget.value.trim()
                          if (value && !tags.includes(value)) {
                            setTags([...tags, value])
                            e.currentTarget.value = ""
                          }
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        const input = document.querySelector('input[placeholder="Add a tag..."]') as HTMLInputElement
                        const value = input?.value.trim()
                        if (value && !tags.includes(value)) {
                          setTags([...tags, value])
                          input.value = ""
                        }
                      }}
                    >
                      Add Tag
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Quick Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Business", "Personal", "Tax Deductible", "Recurring", "Important"].map((quickTag) => (
                      <Button
                        key={quickTag}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (!tags.includes(quickTag)) {
                            setTags([...tags, quickTag])
                          }
                        }}
                        disabled={tags.includes(quickTag)}
                      >
                        {quickTag}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Transaction History
                </CardTitle>
                <CardDescription>Timeline of changes and updates to this transaction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Mock transaction history */}
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Transaction Completed</p>
                      <p className="text-sm text-muted-foreground">Payment processed successfully</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(new Date(transaction.date), "MMM dd, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Transaction Initiated</p>
                      <p className="text-sm text-muted-foreground">Payment authorization received</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(
                          new Date(new Date(transaction.date).getTime() - 2 * 60 * 1000),
                          "MMM dd, yyyy 'at' h:mm a",
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <User className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Transaction Created</p>
                      <p className="text-sm text-muted-foreground">Transaction record created in system</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(
                          new Date(new Date(transaction.date).getTime() - 5 * 60 * 1000),
                          "MMM dd, yyyy 'at' h:mm a",
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attachments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="w-5 h-5" />
                  Attachments
                </CardTitle>
                <CardDescription>Receipts and documents related to this transaction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Receipt className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No attachments</p>
                  <Button variant="outline" className="mt-2 bg-transparent">
                    Upload Receipt
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
