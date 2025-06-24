"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, DollarSign, Shield, Coins, TrendingUp, AlertCircle, Eye, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

interface QuickLoanStatus {
  loanId: string
  status: "active" | "processing" | "approved" | "funded"
  borrowerName: string
  currentBalance: number
  originalAmount: number
  nextPaymentDate: string
  nextPaymentAmount: number
  paymentsRemaining: number
  riskLevel: "low" | "medium" | "high"
  guaranteeActive: boolean
  tokenized: boolean
  escrowBalance: number
}

export function LoanStatusWidget() {
  const [loanData, setLoanData] = useState<QuickLoanStatus | null>(null)
  const [loading, setLoading] = useState(true)

  const targetLoanId = "2c979652-4ba9-43f5-b224-3ea78ebea859"

  useEffect(() => {
    // Simulate loading the specific loan data
    const loadLoanData = async () => {
      setLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setLoanData({
        loanId: targetLoanId,
        status: "active",
        borrowerName: "Sarah Chen",
        currentBalance: 478250.33,
        originalAmount: 485000,
        nextPaymentDate: "2024-04-15",
        nextPaymentAmount: 2387.45,
        paymentsRemaining: 354,
        riskLevel: "low",
        guaranteeActive: true,
        tokenized: true,
        escrowBalance: 8450.75,
      })

      setLoading(false)
    }

    loadLoanData()
  }, [])

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-blue-400/20 rounded w-3/4"></div>
            <div className="h-8 bg-blue-400/20 rounded w-1/2"></div>
            <div className="space-y-2">
              <div className="h-3 bg-blue-400/20 rounded"></div>
              <div className="h-3 bg-blue-400/20 rounded w-5/6"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!loanData) {
    return (
      <Card className="bg-gradient-to-br from-red-900/50 to-pink-900/50 border-red-400/30">
        <CardContent className="p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-300 mb-2">Loan Not Found</h3>
          <p className="text-red-200">Unable to load loan data for ID: {targetLoanId}</p>
        </CardContent>
      </Card>
    )
  }

  const paymentProgress = ((loanData.originalAmount - loanData.currentBalance) / loanData.originalAmount) * 100

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Main Status Card */}
      <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-green-300 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Loan Status: {targetLoanId.slice(0, 8)}...
            </CardTitle>
            <Badge className="bg-green-600/20 text-green-300 border-green-400/30">
              {loanData.status.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Borrower Info */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-green-300">{loanData.borrowerName}</h3>
              <p className="text-green-200">Premium Residential Loan</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">${loanData.currentBalance.toLocaleString()}</div>
              <div className="text-sm text-green-200">Current Balance</div>
            </div>
          </div>

          {/* Payment Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-green-200">Loan Progress</span>
              <span className="text-green-300">{paymentProgress.toFixed(1)}% Paid</span>
            </div>
            <Progress value={paymentProgress} className="h-2 bg-green-800/30" />
            <div className="flex justify-between text-xs text-green-200">
              <span>${(loanData.originalAmount - loanData.currentBalance).toLocaleString()} Paid</span>
              <span>{loanData.paymentsRemaining} Payments Remaining</span>
            </div>
          </div>

          {/* Next Payment */}
          <div className="p-4 bg-green-800/20 rounded-lg border border-green-400/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-green-400" />
                <div>
                  <div className="font-medium text-green-300">Next Payment Due</div>
                  <div className="text-sm text-green-200">{loanData.nextPaymentDate}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-green-400">
                  ${loanData.nextPaymentAmount.toLocaleString()}
                </div>
                <div className="text-xs text-green-200">Monthly Payment</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Risk Level */}
        <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-blue-300">Risk Level</span>
              </div>
              <Badge className="bg-green-600/20 text-green-300 border-green-400/30">
                {loanData.riskLevel.toUpperCase()}
              </Badge>
            </div>
            <div className="mt-2 text-xs text-blue-200">AI Risk Score: 8% (94% Confidence)</div>
          </CardContent>
        </Card>

        {/* Guarantee Status */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-violet-900/50 border-purple-400/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300">Guarantee</span>
              </div>
              <Badge
                className={
                  loanData.guaranteeActive
                    ? "bg-green-600/20 text-green-300 border-green-400/30"
                    : "bg-red-600/20 text-red-300 border-red-400/30"
                }
              >
                {loanData.guaranteeActive ? "ACTIVE" : "INACTIVE"}
              </Badge>
            </div>
            <div className="mt-2 text-xs text-purple-200">Payment Protection: $97,000</div>
          </CardContent>
        </Card>

        {/* Tokenization Status */}
        <Card className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border-amber-400/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Coins className="w-5 h-5 text-amber-400" />
                <span className="text-amber-300">Tokenized</span>
              </div>
              <Badge
                className={
                  loanData.tokenized
                    ? "bg-green-600/20 text-green-300 border-green-400/30"
                    : "bg-gray-600/20 text-gray-300 border-gray-400/30"
                }
              >
                {loanData.tokenized ? "YES" : "NO"}
              </Badge>
            </div>
            <div className="mt-2 text-xs text-amber-200">485,000 Tokens Available</div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Link href="/dashboard/lookup">
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
            <Eye className="w-4 h-4 mr-2" />
            View Full Details
          </Button>
        </Link>

        <Link href="/admin/enhanced-dashboard">
          <Button variant="outline" className="border-purple-400/30 text-purple-300 hover:bg-purple-600/20">
            <ExternalLink className="w-4 h-4 mr-2" />
            Admin Dashboard
          </Button>
        </Link>

        <Button variant="outline" className="border-green-400/30 text-green-300 hover:bg-green-600/20">
          <DollarSign className="w-4 h-4 mr-2" />
          Make Payment
        </Button>
      </div>

      {/* Quick Stats */}
      <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
        <CardHeader>
          <CardTitle className="text-slate-300">Quick Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-400">Original Amount</div>
              <div className="text-slate-200 font-semibold">${loanData.originalAmount.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-400">Interest Rate</div>
              <div className="text-slate-200 font-semibold">4.25%</div>
            </div>
            <div>
              <div className="text-gray-400">Term</div>
              <div className="text-slate-200 font-semibold">30 Years</div>
            </div>
            <div>
              <div className="text-gray-400">Escrow Balance</div>
              <div className="text-slate-200 font-semibold">${loanData.escrowBalance.toLocaleString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
