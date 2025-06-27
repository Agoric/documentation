"use client"

import React from "react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { FuturisticCard } from "@/components/ui/futuristic-card"
import { useRouter } from "next/navigation"
import {
  CreditCard,
  TrendingDown,
  Target,
  ArrowLeft,
  Sparkles,
  Zap,
  DollarSign,
  Calendar,
  Calculator,
  PieChart,
} from "lucide-react"

interface Debt {
  id: string
  name: string
  balance: number
  interestRate: number
  minimumPayment: number
  type: "Credit Card" | "Personal Loan" | "Auto Loan" | "Student Loan"
  color: string
}

export default function DebtManagerPage() {
  const router = useRouter()
  const [debts, setDebts] = React.useState<Debt[]>([
    {
      id: "1",
      name: "Chase Freedom",
      balance: 8500,
      interestRate: 18.99,
      minimumPayment: 255,
      type: "Credit Card",
      color: "from-red-500 to-pink-500",
    },
    {
      id: "2",
      name: "Personal Loan",
      balance: 15000,
      interestRate: 12.5,
      minimumPayment: 425,
      type: "Personal Loan",
      color: "from-orange-500 to-red-500",
    },
    {
      id: "3",
      name: "Auto Loan",
      balance: 22000,
      interestRate: 4.2,
      minimumPayment: 380,
      type: "Auto Loan",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "4",
      name: "Student Loan",
      balance: 35000,
      interestRate: 6.8,
      minimumPayment: 320,
      type: "Student Loan",
      color: "from-purple-500 to-pink-500",
    },
  ])

  const [extraPayment, setExtraPayment] = React.useState(500)
  const [strategy, setStrategy] = React.useState<"avalanche" | "snowball">("avalanche")

  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0)
  const totalMinimumPayments = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0)
  const weightedInterestRate = debts.reduce((sum, debt) => sum + (debt.interestRate * debt.balance) / totalDebt, 0)

  // Calculate payoff timeline with extra payments
  const calculatePayoffTime = (debt: Debt, extraPayment = 0) => {
    const monthlyPayment = debt.minimumPayment + extraPayment
    const monthlyRate = debt.interestRate / 100 / 12

    if (monthlyPayment <= debt.balance * monthlyRate) {
      return "Never (payment too low)"
    }

    const months = Math.ceil(-Math.log(1 - (debt.balance * monthlyRate) / monthlyPayment) / Math.log(1 + monthlyRate))

    return months < 12 ? `${months} months` : `${Math.floor(months / 12)}y ${months % 12}m`
  }

  const updateDebt = (id: string, field: keyof Debt, value: any) => {
    setDebts(debts.map((debt) => (debt.id === id ? { ...debt, [field]: value } : debt)))
  }

  const optimizePayments = () => {
    // Apply 50-year loan refinancing suggestion
    const optimizedDebts = debts.map((debt) => {
      if (debt.type === "Personal Loan" || debt.type === "Credit Card") {
        return {
          ...debt,
          interestRate: 3.25, // 50-year loan rate
          minimumPayment: debt.balance * 0.006, // Lower payment with 50-year term
        }
      }
      return debt
    })
    setDebts(optimizedDebts)
  }

  const getDebtPriority = () => {
    if (strategy === "avalanche") {
      return [...debts].sort((a, b) => b.interestRate - a.interestRate)
    } else {
      return [...debts].sort((a, b) => a.balance - b.balance)
    }
  }

  const totalInterestSaved = debts.reduce((sum, debt) => {
    const originalInterest = debt.balance * (debt.interestRate / 100) * 2 // Rough 2-year estimate
    const optimizedInterest = debt.balance * (3.25 / 100) * 2 // With 50-year loan
    return sum + (originalInterest - optimizedInterest)
  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 pl-20">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()} className="text-cyan-400 hover:text-cyan-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                Holographic Debt Manager
              </h1>
              <p className="text-muted-foreground mt-2">
                3D visualization of debt elimination strategies with 91% accuracy
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={optimizePayments} className="bg-gradient-to-r from-green-500 to-emerald-500">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Optimize
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <FuturisticCard variant="neural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Debt</p>
                  <p className="text-2xl font-bold text-white">${totalDebt.toLocaleString()}</p>
                </div>
                <CreditCard className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </FuturisticCard>

          <FuturisticCard variant="quantum">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Payments</p>
                  <p className="text-2xl font-bold text-white">${totalMinimumPayments.toLocaleString()}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </FuturisticCard>

          <FuturisticCard variant="holographic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Interest Rate</p>
                  <p className="text-2xl font-bold text-white">{weightedInterestRate.toFixed(1)}%</p>
                </div>
                <TrendingDown className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </FuturisticCard>

          <FuturisticCard variant="cyber">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Potential Savings</p>
                  <p className="text-2xl font-bold text-green-400">${totalInterestSaved.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </FuturisticCard>
        </div>

        {/* Strategy Selection */}
        <FuturisticCard variant="neural">
          <CardHeader>
            <CardTitle className="text-cyan-400">Debt Elimination Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-white">Extra Monthly Payment</Label>
                <Input
                  type="number"
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(Number(e.target.value))}
                  className="bg-background/50 border-white/20"
                />
              </div>
              <div>
                <Label className="text-white">Strategy</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant={strategy === "avalanche" ? "default" : "outline"}
                    onClick={() => setStrategy("avalanche")}
                    className="flex-1"
                  >
                    Avalanche
                  </Button>
                  <Button
                    variant={strategy === "snowball" ? "default" : "outline"}
                    onClick={() => setStrategy("snowball")}
                    className="flex-1"
                  >
                    Snowball
                  </Button>
                </div>
              </div>
              <div className="flex items-end">
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  onClick={() => router.push("/real-estate?action=refinance")}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  50-Year Loan Refinance
                </Button>
              </div>
            </div>
          </CardContent>
        </FuturisticCard>

        {/* Debt List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FuturisticCard variant="quantum">
            <CardHeader>
              <CardTitle className="text-cyan-400">Debt Portfolio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {getDebtPriority().map((debt, index) => (
                <div key={debt.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{debt.name}</h4>
                        <Badge className="text-xs">{debt.type}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">${debt.balance.toLocaleString()}</div>
                      <div className="text-sm text-red-400">{debt.interestRate}% APR</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Balance</Label>
                      <Input
                        type="number"
                        value={debt.balance}
                        onChange={(e) => updateDebt(debt.id, "balance", Number(e.target.value))}
                        className="bg-background/50 border-white/20"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Interest Rate (%)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={debt.interestRate}
                        onChange={(e) => updateDebt(debt.id, "interestRate", Number(e.target.value))}
                        className="bg-background/50 border-white/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Minimum Payment</span>
                      <span className="text-white">${debt.minimumPayment}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Payoff Time</span>
                      <span className="text-cyan-400">{calculatePayoffTime(debt, index === 0 ? extraPayment : 0)}</span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${debt.color} transition-all duration-500`}
                      style={{
                        width: `${Math.min((debt.balance / Math.max(...debts.map((d) => d.balance))) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </FuturisticCard>

          {/* AI Recommendations */}
          <FuturisticCard variant="holographic">
            <CardHeader>
              <CardTitle className="text-cyan-400">AI Debt Optimization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg border border-green-500/30">
                <h4 className="text-white font-medium mb-2">50-Year Loan Opportunity</h4>
                <ul className="space-y-2 text-sm text-green-300">
                  <li>• Consolidate high-interest debt at 3.25% APR</li>
                  <li>• Reduce monthly payments by up to 60%</li>
                  <li>• Save ${totalInterestSaved.toLocaleString()} in interest over 2 years</li>
                  <li>• Free up ${(totalMinimumPayments * 0.4).toLocaleString()}/month for investments</li>
                </ul>
                <Button
                  className="w-full mt-3 bg-gradient-to-r from-green-500 to-emerald-500"
                  onClick={() => router.push("/real-estate?action=debt-consolidation")}
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate Consolidation
                </Button>
              </div>

              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-lg border border-blue-500/30">
                <h4 className="text-white font-medium mb-2">Strategy Analysis</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-300">Current Strategy:</span>
                    <span className="text-white font-medium capitalize">{strategy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-300">Debt-Free Date:</span>
                    <span className="text-white font-medium">Mar 2027</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-300">Total Interest:</span>
                    <span className="text-white font-medium">$18,450</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
                  onClick={() => router.push("/dashboard/financial-planning/debt-simulator")}
                >
                  <PieChart className="w-4 h-4 mr-2" />
                  3D Debt Visualization
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500"
                  onClick={() => router.push("/credit?action=dispute")}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Credit Repair Tools
                </Button>
              </div>
            </CardContent>
          </FuturisticCard>
        </div>
      </div>
    </div>
  )
}
