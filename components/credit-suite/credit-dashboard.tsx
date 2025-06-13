"use client"

import { useState } from "react"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HolographicGlassCard } from "../snap-dax/holographic-glass-card"
import { HolographicBadge } from "../snap-dax/holographic-badge"
import { Progress } from "@/components/ui/progress"
import {
  CreditCard,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Shield,
  Zap,
  BarChart3,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Home,
  Car,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function CreditSuiteDashboard() {
  const [creditScore, setCreditScore] = useState(720)

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Credit Suite
          </h1>
          <p className="text-indigo-300">Manage your credit profile and optimize your financial standing</p>
        </div>
        <HolographicBadge variant="premium" glow={true}>
          <Zap className="mr-1 h-3 w-3" />
          QUANTUM CREDIT ANALYSIS
        </HolographicBadge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HolographicGlassCard className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Credit Score
            </CardTitle>
            <CardDescription className="text-indigo-300">Your current credit score and history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/30 to-cyan-400/30 blur-xl animate-pulse" />
                <div className="relative h-full w-full flex flex-col items-center justify-center rounded-full bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border border-purple-500/30">
                  <span className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {creditScore}
                  </span>
                  <span className="text-indigo-300 mt-2">Excellent</span>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-indigo-300">Payment History</span>
                    <span className="text-cyan-400">Excellent</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-indigo-300">Credit Utilization</span>
                    <span className="text-cyan-400">Very Good</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-indigo-300">Length of Credit</span>
                    <span className="text-cyan-400">Good</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-indigo-300">Credit Mix</span>
                    <span className="text-purple-400">Excellent</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-xl bg-indigo-950/50 p-4 border border-indigo-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  <span className="text-indigo-200 font-medium">Score Change</span>
                </div>
                <div className="flex items-center gap-1 text-green-400">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="text-xl font-bold">+15</span>
                </div>
                <p className="text-xs text-indigo-300 mt-1">Last 30 days</p>
              </div>

              <div className="rounded-xl bg-indigo-950/50 p-4 border border-indigo-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                  <span className="text-indigo-200 font-medium">Alerts</span>
                </div>
                <div className="text-xl font-bold text-indigo-100">0</div>
                <p className="text-xs text-indigo-300 mt-1">No issues detected</p>
              </div>

              <div className="rounded-xl bg-indigo-950/50 p-4 border border-indigo-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-cyan-400" />
                  <span className="text-indigo-200 font-medium">On-time Payments</span>
                </div>
                <div className="text-xl font-bold text-indigo-100">100%</div>
                <p className="text-xs text-indigo-300 mt-1">All payments on time</p>
              </div>

              <div className="rounded-xl bg-indigo-950/50 p-4 border border-indigo-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-purple-400" />
                  <span className="text-indigo-200 font-medium">Credit Age</span>
                </div>
                <div className="text-xl font-bold text-indigo-100">8.5 yrs</div>
                <p className="text-xs text-indigo-300 mt-1">Average account age</p>
              </div>
            </div>
          </CardContent>
        </HolographicGlassCard>

        <HolographicGlassCard>
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Credit Optimizer
            </CardTitle>
            <CardDescription className="text-indigo-300">AI-powered recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-xl bg-gradient-to-r from-purple-950/50 to-indigo-950/50 p-4 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <span className="text-indigo-200 font-medium">Boost Your Score</span>
                </div>
                <p className="text-sm text-indigo-300 mb-3">
                  Reducing your credit card balances by $2,500 could increase your score by up to 25 points.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-purple-500/30 text-purple-400 hover:text-purple-300 hover:bg-purple-950/50"
                >
                  View Strategy
                </Button>
              </div>

              <div className="rounded-xl bg-gradient-to-r from-purple-950/50 to-indigo-950/50 p-4 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  <span className="text-indigo-200 font-medium">Identity Protection</span>
                </div>
                <p className="text-sm text-indigo-300 mb-3">
                  Your identity is being monitored across 27 data points with quantum encryption.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-purple-500/30 text-purple-400 hover:text-purple-300 hover:bg-purple-950/50"
                >
                  View Protection Status
                </Button>
              </div>

              <div className="rounded-xl bg-gradient-to-r from-purple-950/50 to-indigo-950/50 p-4 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-5 w-5 text-green-400" />
                  <span className="text-indigo-200 font-medium">Score Simulator</span>
                </div>
                <p className="text-sm text-indigo-300 mb-3">
                  Simulate how different financial actions will impact your credit score.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-purple-500/30 text-purple-400 hover:text-purple-300 hover:bg-purple-950/50"
                >
                  Run Simulation
                </Button>
              </div>
            </div>
          </CardContent>
        </HolographicGlassCard>
      </div>

      <Tabs defaultValue="accounts" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="accounts">Credit Accounts</TabsTrigger>
          <TabsTrigger value="reports">Credit Reports</TabsTrigger>
          <TabsTrigger value="offers">Credit Offers</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HolographicGlassCard>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-bold text-indigo-100">Quantum Rewards Card</CardTitle>
                    <CardDescription className="text-indigo-300">Credit Card</CardDescription>
                  </div>
                  <CreditCard className="h-8 w-8 text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-300">Balance</span>
                    <span className="text-indigo-100 font-medium">$2,450.75</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-300">Credit Limit</span>
                    <span className="text-indigo-100 font-medium">$15,000.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-300">Utilization</span>
                    <span className="text-indigo-100 font-medium">16%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-300">Payment Status</span>
                    <span className="text-green-400 font-medium">Current</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-300">Last Payment</span>
                    <span className="text-indigo-100 font-medium">$500.00 on Jun 5, 2025</span>
                  </div>
                </div>
              </CardContent>
            </HolographicGlassCard>

            <HolographicGlassCard>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-bold text-indigo-100">Sapphire Banking</CardTitle>
                    <CardDescription className="text-indigo-300">Personal Loan</CardDescription>
                  </div>
                  <FileText className="h-8 w-8 text-cyan-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-300">Original Amount</span>
                    <span className="text-indigo-100 font-medium">$25,000.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-300">Current Balance</span>
                    <span className="text-indigo-100 font-medium">$18,750.25</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-300">Monthly Payment</span>
                    <span className="text-indigo-100 font-medium">$525.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-300">Payment Status</span>
                    <span className="text-green-400 font-medium">Current</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-300">Last Payment</span>
                    <span className="text-indigo-100 font-medium">$525.00 on Jun 1, 2025</span>
                  </div>
                </div>
              </CardContent>
            </HolographicGlassCard>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <HolographicGlassCard>
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Credit Reports
              </CardTitle>
              <CardDescription className="text-indigo-300">
                Access your credit reports from all major bureaus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-xl bg-indigo-950/50 p-6 border border-indigo-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-indigo-100">Equinox</h3>
                    <HolographicBadge variant="tokenized" glow={true} size="sm">
                      <Zap className="mr-1 h-3 w-3" />
                      UPDATED
                    </HolographicBadge>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-indigo-300">Score</span>
                      <span className="text-indigo-100 font-medium">725</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-indigo-300">Last Updated</span>
                      <span className="text-indigo-100 font-medium">Jun 10, 2025</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700">
                    View Report
                  </Button>
                </div>

                <div className="rounded-xl bg-indigo-950/50 p-6 border border-indigo-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-indigo-100">TransQuantum</h3>
                    <HolographicBadge variant="tokenized" glow={true} size="sm">
                      <Zap className="mr-1 h-3 w-3" />
                      UPDATED
                    </HolographicBadge>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-indigo-300">Score</span>
                      <span className="text-indigo-100 font-medium">718</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-indigo-300">Last Updated</span>
                      <span className="text-indigo-100 font-medium">Jun 8, 2025</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700">
                    View Report
                  </Button>
                </div>

                <div className="rounded-xl bg-indigo-950/50 p-6 border border-indigo-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-indigo-100">Experion</h3>
                    <HolographicBadge variant="tokenized" glow={true} size="sm">
                      <Zap className="mr-1 h-3 w-3" />
                      UPDATED
                    </HolographicBadge>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-indigo-300">Score</span>
                      <span className="text-indigo-100 font-medium">732</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-indigo-300">Last Updated</span>
                      <span className="text-indigo-100 font-medium">Jun 5, 2025</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700">
                    View Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </HolographicGlassCard>
        </TabsContent>

        <TabsContent value="offers">
          <HolographicGlassCard>
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Personalized Credit Offers
              </CardTitle>
              <CardDescription className="text-indigo-300">
                Pre-qualified offers based on your credit profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-xl bg-gradient-to-br from-purple-950/50 to-indigo-950/50 p-6 border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-purple-950/80 border border-purple-500/30">
                      <CreditCard className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-bold text-indigo-100">Quantum Elite Card</h3>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-400" />
                      <span className="text-indigo-200">$750 welcome bonus</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-purple-400" />
                      <span className="text-indigo-200">3% cashback on all purchases</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-cyan-400" />
                      <span className="text-indigo-200">0% APR for 18 months</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700">
                    Apply Now
                  </Button>
                </div>

                <div className="rounded-xl bg-gradient-to-br from-purple-950/50 to-indigo-950/50 p-6 border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-purple-950/80 border border-purple-500/30">
                      <Home className="h-6 w-6 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-bold text-indigo-100">Home Equity Line</h3>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-400" />
                      <span className="text-indigo-200">Up to $250,000 available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-purple-400" />
                      <span className="text-indigo-200">4.25% variable APR</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-cyan-400" />
                      <span className="text-indigo-200">No closing costs</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700">
                    Apply Now
                  </Button>
                </div>

                <div className="rounded-xl bg-gradient-to-br from-purple-950/50 to-indigo-950/50 p-6 border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-purple-950/80 border border-purple-500/30">
                      <Car className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-bold text-indigo-100">Auto Loan Refinance</h3>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-400" />
                      <span className="text-indigo-200">Rates as low as 3.49% APR</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowDownRight className="h-4 w-4 text-purple-400" />
                      <span className="text-indigo-200">Lower your monthly payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-cyan-400" />
                      <span className="text-indigo-200">Quick approval process</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700">
                    Apply Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </HolographicGlassCard>
        </TabsContent>

        <TabsContent value="disputes">
          <HolographicGlassCard>
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Credit Disputes
              </CardTitle>
              <CardDescription className="text-indigo-300">Manage and track credit report disputes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 rounded-full bg-indigo-950/50 border border-indigo-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-indigo-100 mb-2">No Active Disputes</h3>
                <p className="text-indigo-300 max-w-md mx-auto mb-6">
                  Your credit report is currently free of any disputed items. If you find any inaccuracies, you can
                  start a dispute here.
                </p>
                <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700">
                  Start New Dispute
                </Button>
              </div>
            </CardContent>
          </HolographicGlassCard>
        </TabsContent>
      </Tabs>
    </div>
  )
}
