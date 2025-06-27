"use client"

import { TransactionList } from "@/components/transactions/transaction-list"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, TrendingUp, Download, Filter } from "lucide-react"

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Transaction Center</h1>
            <p className="text-slate-300">View, filter, and export your transaction history</p>
          </div>
          <div className="flex items-center space-x-2">
            <CreditCard className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Filter className="w-8 h-8 text-blue-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Advanced Filtering</h3>
                  <p className="text-slate-300 text-sm">Filter by category, date, amount, and more</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Download className="w-8 h-8 text-green-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Export Data</h3>
                  <p className="text-slate-300 text-sm">Export to CSV or PDF with custom options</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <TrendingUp className="w-8 h-8 text-purple-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Real-time Analytics</h3>
                  <p className="text-slate-300 text-sm">Live insights and spending patterns</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction List */}
        <TransactionList />
      </div>
    </div>
  )
}
