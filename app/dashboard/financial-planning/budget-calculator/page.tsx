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
  DollarSign,
  TrendingUp,
  PieChart,
  ArrowLeft,
  Save,
  Download,
  Zap,
  Target,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

interface BudgetCategory {
  name: string
  budgeted: number
  actual: number
  color: string
  icon: any
}

export default function BudgetCalculatorPage() {
  const router = useRouter()
  const [income, setIncome] = React.useState(8500)
  const [categories, setCategories] = React.useState<BudgetCategory[]>([
    { name: "Housing", budgeted: 2550, actual: 2650, color: "from-blue-500 to-cyan-500", icon: DollarSign },
    { name: "Transportation", budgeted: 850, actual: 780, color: "from-green-500 to-emerald-500", icon: DollarSign },
    { name: "Food", budgeted: 680, actual: 720, color: "from-purple-500 to-pink-500", icon: DollarSign },
    { name: "Utilities", budgeted: 340, actual: 315, color: "from-orange-500 to-red-500", icon: DollarSign },
    { name: "Entertainment", budgeted: 425, actual: 480, color: "from-yellow-500 to-orange-500", icon: DollarSign },
    { name: "Savings", budgeted: 1700, actual: 1650, color: "from-emerald-500 to-green-500", icon: DollarSign },
  ])

  const totalBudgeted = categories.reduce((sum, cat) => sum + cat.budgeted, 0)
  const totalActual = categories.reduce((sum, cat) => sum + cat.actual, 0)
  const remainingIncome = income - totalActual
  const budgetVariance = totalActual - totalBudgeted

  const updateCategory = (index: number, field: "budgeted" | "actual", value: number) => {
    const newCategories = [...categories]
    newCategories[index][field] = value
    setCategories(newCategories)
  }

  const optimizeBudget = () => {
    // AI optimization logic
    const optimized = categories.map((cat) => ({
      ...cat,
      budgeted: cat.name === "Savings" ? cat.budgeted + 200 : cat.budgeted - cat.budgeted * 0.05,
    }))
    setCategories(optimized)
  }

  const exportBudget = () => {
    const budgetData = {
      income,
      categories,
      totalBudgeted,
      totalActual,
      remainingIncome,
      exportDate: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(budgetData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", `budget-${new Date().toISOString().split("T")[0]}.json`)
    linkElement.click()
  }

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
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Quantum Budget Calculator
              </h1>
              <p className="text-muted-foreground mt-2">AI-powered expense optimization with 97% accuracy</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportBudget}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={optimizeBudget} className="bg-gradient-to-r from-blue-500 to-cyan-500">
              <Zap className="w-4 h-4 mr-2" />
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
                  <p className="text-sm text-muted-foreground">Monthly Income</p>
                  <p className="text-2xl font-bold text-white">${income.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </FuturisticCard>

          <FuturisticCard variant="quantum">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Budgeted</p>
                  <p className="text-2xl font-bold text-white">${totalBudgeted.toLocaleString()}</p>
                </div>
                <Target className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </FuturisticCard>

          <FuturisticCard variant="holographic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Actual Spending</p>
                  <p className="text-2xl font-bold text-white">${totalActual.toLocaleString()}</p>
                </div>
                <PieChart className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </FuturisticCard>

          <FuturisticCard variant="cyber">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className={`text-2xl font-bold ${remainingIncome >= 0 ? "text-green-400" : "text-red-400"}`}>
                    ${remainingIncome.toLocaleString()}
                  </p>
                </div>
                {remainingIncome >= 0 ? (
                  <CheckCircle className="h-8 w-8 text-green-400" />
                ) : (
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                )}
              </div>
            </CardContent>
          </FuturisticCard>
        </div>

        {/* Income Input */}
        <FuturisticCard variant="neural">
          <CardHeader>
            <CardTitle className="text-cyan-400">Monthly Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Label htmlFor="income" className="text-white">
                Income:
              </Label>
              <Input
                id="income"
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="max-w-xs bg-background/50 border-white/20"
              />
              <Badge className="bg-green-500/20 text-green-400">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% vs last month
              </Badge>
            </div>
          </CardContent>
        </FuturisticCard>

        {/* Budget Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FuturisticCard variant="quantum">
            <CardHeader>
              <CardTitle className="text-cyan-400">Budget Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {categories.map((category, index) => (
                <div key={category.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium">{category.name}</h4>
                    <Badge
                      className={
                        category.actual <= category.budgeted
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }
                    >
                      {category.actual <= category.budgeted ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 mr-1" />
                      )}
                      {category.actual <= category.budgeted ? "On Track" : "Over Budget"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Budgeted</Label>
                      <Input
                        type="number"
                        value={category.budgeted}
                        onChange={(e) => updateCategory(index, "budgeted", Number(e.target.value))}
                        className="bg-background/50 border-white/20"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Actual</Label>
                      <Input
                        type="number"
                        value={category.actual}
                        onChange={(e) => updateCategory(index, "actual", Number(e.target.value))}
                        className="bg-background/50 border-white/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Usage</span>
                      <span className="text-white">{Math.round((category.actual / category.budgeted) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${category.color} transition-all duration-500`}
                        style={{ width: `${Math.min((category.actual / category.budgeted) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </FuturisticCard>

          {/* AI Insights */}
          <FuturisticCard variant="holographic">
            <CardHeader>
              <CardTitle className="text-cyan-400">AI Budget Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4 rounded-lg border border-cyan-500/30">
                <h4 className="text-white font-medium mb-2">Optimization Recommendations</h4>
                <ul className="space-y-2 text-sm text-cyan-300">
                  <li>• Reduce entertainment spending by $55 to increase savings</li>
                  <li>• Consider refinancing with our 50-year loan to reduce housing costs</li>
                  <li>• Transportation spending is 8% below budget - well managed!</li>
                  <li>• Food spending trending up - consider meal planning</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg border border-green-500/30">
                <h4 className="text-white font-medium mb-2">Savings Opportunities</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-green-300">Potential Monthly Savings:</span>
                    <span className="text-white font-medium">$285</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-green-300">Annual Impact:</span>
                    <span className="text-white font-medium">$3,420</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500"
                onClick={() => router.push("/dashboard/financial-planning/savings-optimizer")}
              >
                <Save className="w-4 h-4 mr-2" />
                Optimize Savings Plan
              </Button>
            </CardContent>
          </FuturisticCard>
        </div>
      </div>
    </div>
  )
}
