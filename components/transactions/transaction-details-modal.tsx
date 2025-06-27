"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Calendar,
  CreditCard,
  Building,
  Hash,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Edit,
  Flag,
  Download,
} from "lucide-react"
import { format } from "date-fns"
import type { Transaction } from "@/utils/transaction-export"

interface TransactionDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction | null
}

export function TransactionDetailsModal({ isOpen, onClose, transaction }: TransactionDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("details")

  if (!transaction) return null

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />
      case "failed":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
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

  // Mock additional transaction data
  const additionalData = {
    authorizationCode: "AUTH123456",
    processingTime: "2.3 seconds",
    fees: transaction.type === "transfer" ? 2.5 : 0,
    exchangeRate: transaction.type === "transfer" ? "1.00 USD" : null,
    recurringTransaction: transaction.description.toLowerCase().includes("subscription"),
    tags: ["business", "recurring"],
    notes: "Monthly subscription payment for streaming service",
    relatedTransactions: [
      { id: "rel1", description: "Previous payment", amount: -9.99, date: "2024-01-01" },
      { id: "rel2", description: "Refund", amount: 9.99, date: "2023-12-15" },
    ],
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getTransactionIcon(transaction.type)}
              <div>
                <DialogTitle className="text-xl">{transaction.description}</DialogTitle>
                <DialogDescription>
                  Transaction ID: {transaction.id} • {format(new Date(transaction.date), "PPP")}
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusBadge(transaction.status)}
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="merchant">Merchant</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            {/* Amount and Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Transaction Summary</span>
                  <span className={`text-2xl font-bold ${transaction.amount >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {transaction.amount >= 0 ? "+" : ""}
                    {formatCurrency(transaction.amount)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Date</span>
                    </div>
                    <p className="font-medium">{format(new Date(transaction.date), "PPP")}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      <span className="text-sm text-gray-600">Status</span>
                    </div>
                    <p className="font-medium">{transaction.status}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Account</span>
                    </div>
                    <p className="font-medium">{transaction.account}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Category</span>
                    </div>
                    <Badge variant="secondary">{transaction.category}</Badge>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {transaction.reference && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Hash className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Reference</span>
                      </div>
                      <p className="font-mono text-sm bg-gray-100 p-2 rounded">{transaction.reference}</p>
                    </div>
                  )}

                  {additionalData.authorizationCode && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Authorization</span>
                      </div>
                      <p className="font-mono text-sm bg-gray-100 p-2 rounded">{additionalData.authorizationCode}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Processing Time</span>
                    </div>
                    <p className="font-medium">{additionalData.processingTime}</p>
                  </div>

                  {additionalData.fees > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <TrendingDown className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-gray-600">Fees</span>
                      </div>
                      <p className="font-medium text-red-600">{formatCurrency(additionalData.fees)}</p>
                    </div>
                  )}
                </div>

                {additionalData.notes && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Notes</span>
                      </div>
                      <p className="text-sm bg-blue-50 p-3 rounded-lg">{additionalData.notes}</p>
                    </div>
                  </>
                )}

                {additionalData.tags.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Flag className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Tags</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {additionalData.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="merchant" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Merchant Information</CardTitle>
                <CardDescription>Details about the merchant or payee</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {transaction.merchant ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Merchant Name</span>
                        </div>
                        <p className="font-medium text-lg">{transaction.merchant}</p>
                      </div>

                      {transaction.location && (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Location</span>
                          </div>
                          <p className="font-medium">{transaction.location}</p>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-medium">Merchant Category</h4>
                      <Badge variant="secondary" className="text-sm">
                        {transaction.category}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Transaction History with Merchant</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Total Transactions</p>
                            <p className="font-semibold">12</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Total Spent</p>
                            <p className="font-semibold">$247.89</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Average Amount</p>
                            <p className="font-semibold">$20.66</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Building className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">No merchant information available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="related" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Related Transactions</CardTitle>
                <CardDescription>Transactions that may be related to this one</CardDescription>
              </CardHeader>
              <CardContent>
                {additionalData.relatedTransactions.length > 0 ? (
                  <div className="space-y-3">
                    {additionalData.relatedTransactions.map((related) => (
                      <div key={related.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{related.description}</p>
                          <p className="text-sm text-gray-600">{format(new Date(related.date), "MMM dd, yyyy")}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${related.amount >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {related.amount >= 0 ? "+" : ""}
                            {formatCurrency(related.amount)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">No related transactions found</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {additionalData.recurringTransaction && (
              <Card>
                <CardHeader>
                  <CardTitle>Recurring Transaction</CardTitle>
                  <CardDescription>This appears to be a recurring transaction</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-900">Monthly Recurring</span>
                    </div>
                    <p className="text-blue-800 text-sm">
                      This transaction appears to occur monthly. Next expected date:{" "}
                      {format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "MMM dd, yyyy")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Spending Analysis</CardTitle>
                <CardDescription>Insights about this transaction in context</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Category Spending</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">This Month</span>
                          <span className="font-semibold">$156.78</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Average Monthly</span>
                          <span className="font-semibold">$142.33</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">vs Last Month</span>
                          <span className="font-semibold text-red-600">+10.2%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Transaction Pattern</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Frequency</span>
                          <span className="font-semibold">Monthly</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Amount Variance</span>
                          <span className="font-semibold">Low</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Predictability</span>
                          <span className="font-semibold text-green-600">High</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Budget Impact</h4>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium text-yellow-900">Budget Alert</span>
                    </div>
                    <p className="text-yellow-800 text-sm">
                      This transaction puts you at 85% of your monthly {transaction.category} budget.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Recommendations</h4>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-900">Good spending pattern</p>
                        <p className="text-green-800 text-sm">This recurring expense is consistent with your budget.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900">Consider annual billing</p>
                        <p className="text-blue-800 text-sm">
                          You might save money by switching to annual billing for this service.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Details
          </Button>
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
