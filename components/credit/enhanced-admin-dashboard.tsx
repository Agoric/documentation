"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCreditAcceleration } from "@/contexts/credit-acceleration-context"
import { UniversalIDLookup } from "./universal-id-lookup"
import {
  Search,
  Shield,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  FileText,
  Coins,
  Filter,
} from "lucide-react"
import { motion } from "framer-motion"

interface AdminMetrics {
  totalLoans: number
  totalValue: number
  activeGuarantees: number
  tokenizedValue: number
  defaultRate: number
  averageProcessingTime: number
  riskDistribution: {
    low: number
    medium: number
    high: number
  }
  statusDistribution: {
    pending: number
    processing: number
    approved: number
    funded: number
    active: number
    denied: number
  }
}

export function EnhancedAdminDashboard() {
  const { loans, getPortfolioMetrics, searchLoans, getLoansByStatus } = useCreditAcceleration()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null)

  // Calculate admin metrics
  const adminMetrics: AdminMetrics = {
    totalLoans: Object.keys(loans).length,
    totalValue: Object.values(loans).reduce((sum, loan) => sum + (loan.approvedAmount || loan.requestedAmount), 0),
    activeGuarantees: Object.values(loans).filter((loan) => loan.guaranteeId).length,
    tokenizedValue: Object.values(loans).reduce(
      (sum, loan) => sum + (loan.fractionalTokens?.reduce((tokenSum, token) => tokenSum + token.currentValue, 0) || 0),
      0,
    ),
    defaultRate: Object.values(loans).filter((loan) => loan.status === "defaulted").length / Object.keys(loans).length,
    averageProcessingTime: 72, // Mock data
    riskDistribution: {
      low: Object.values(loans).filter((loan) => loan.aiRiskScore <= 0.15).length,
      medium: Object.values(loans).filter((loan) => loan.aiRiskScore > 0.15 && loan.aiRiskScore <= 0.3).length,
      high: Object.values(loans).filter((loan) => loan.aiRiskScore > 0.3).length,
    },
    statusDistribution: {
      pending: getLoansByStatus("pending").length,
      processing: getLoansByStatus("processing").length,
      approved: getLoansByStatus("approved").length,
      funded: getLoansByStatus("funded").length,
      active: getLoansByStatus("active").length,
      denied: getLoansByStatus("denied").length,
    },
  }

  const filteredLoans = Object.values(loans).filter((loan) => {
    const matchesSearch =
      loan.loanId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loan.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (loan.guaranteeId && loan.guaranteeId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (loan.tokenId && loan.tokenId.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFilters = selectedFilters.length === 0 || selectedFilters.includes(loan.status)

    return matchesSearch && matchesFilters
  })

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Enhanced Admin Dashboard
          </h1>
          <p className="text-xl text-purple-200">
            Comprehensive system monitoring and entity tracking with UUID: 2c979652-4ba9-43f5-b224-3ea78ebea859
          </p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm">Total Portfolio</p>
                  <p className="text-2xl font-bold text-green-400">${adminMetrics.totalValue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center text-xs text-green-300">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {adminMetrics.totalLoans} Total Loans
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Active Guarantees</p>
                  <p className="text-2xl font-bold text-blue-400">{adminMetrics.activeGuarantees}</p>
                </div>
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center text-xs text-blue-300">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {((adminMetrics.activeGuarantees / adminMetrics.totalLoans) * 100).toFixed(1)}% Coverage
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-violet-900/50 border-purple-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm">Tokenized Value</p>
                  <p className="text-2xl font-bold text-purple-400">${adminMetrics.tokenizedValue.toLocaleString()}</p>
                </div>
                <Coins className="w-8 h-8 text-purple-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center text-xs text-purple-300">
                  <Activity className="w-3 h-3 mr-1" />
                  {((adminMetrics.tokenizedValue / adminMetrics.totalValue) * 100).toFixed(1)}% Tokenized
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border-amber-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-200 text-sm">Default Rate</p>
                  <p className="text-2xl font-bold text-amber-400">{(adminMetrics.defaultRate * 100).toFixed(2)}%</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-amber-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-center text-xs text-amber-300">
                  <Clock className="w-3 h-3 mr-1" />
                  {adminMetrics.averageProcessingTime}h Avg Processing
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="lookup" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/30 border border-slate-600/30">
            <TabsTrigger value="lookup">ID Lookup</TabsTrigger>
            <TabsTrigger value="search">Advanced Search</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="lookup">
            <UniversalIDLookup />
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            {/* Search Interface */}
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  Advanced Loan Search & Filtering
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-4">
                  <Input
                    placeholder="Search by Loan ID, User ID, Guarantee ID, Token ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-blue-800/30 border-blue-600 text-blue-100"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>

                {/* Status Filters */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-blue-300" />
                    <span className="text-sm text-blue-300">Filter by Status:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(adminMetrics.statusDistribution).map((status) => (
                      <Button
                        key={status}
                        variant="outline"
                        size="sm"
                        onClick={() => toggleFilter(status)}
                        className={`${
                          selectedFilters.includes(status)
                            ? "bg-blue-600 text-white border-blue-400"
                            : "bg-blue-800/20 text-blue-300 border-blue-600/30"
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)} (
                        {adminMetrics.statusDistribution[status as keyof typeof adminMetrics.statusDistribution]})
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
              <CardHeader>
                <CardTitle className="text-slate-300 flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Search Results ({filteredLoans.length})
                  </div>
                  <Badge className="bg-slate-600/20 text-slate-300">
                    {selectedFilters.length > 0 ? `${selectedFilters.length} filters active` : "No filters"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-3">
                    {filteredLoans.map((loan) => (
                      <motion.div
                        key={loan.loanId}
                        whileHover={{ scale: 1.01 }}
                        className="p-4 bg-slate-800/30 rounded-lg border border-slate-600/30 hover:border-slate-400/50 cursor-pointer transition-all"
                        onClick={() => setSelectedLoan(loan.loanId)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-slate-400" />
                            <div>
                              <div className="font-medium text-slate-200">{loan.loanId}</div>
                              <div className="text-sm text-gray-400">User: {loan.userId}</div>
                            </div>
                          </div>
                          <Badge
                            className={
                              loan.status === "approved" || loan.status === "funded" || loan.status === "active"
                                ? "bg-green-600/20 text-green-300 border-green-400/30"
                                : loan.status === "denied"
                                  ? "bg-red-600/20 text-red-300 border-red-400/30"
                                  : "bg-yellow-600/20 text-yellow-300 border-yellow-400/30"
                            }
                          >
                            {loan.status.toUpperCase()}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Amount:</span>
                            <div className="text-slate-200">
                              ${(loan.approvedAmount || loan.requestedAmount).toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-400">Risk Score:</span>
                            <div
                              className={`${
                                loan.aiRiskScore <= 0.15
                                  ? "text-green-400"
                                  : loan.aiRiskScore <= 0.3
                                    ? "text-yellow-400"
                                    : "text-red-400"
                              }`}
                            >
                              {(loan.aiRiskScore * 100).toFixed(1)}%
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-400">Applied:</span>
                            <div className="text-slate-200">{loan.applicationDate.toLocaleDateString()}</div>
                          </div>
                          <div>
                            <span className="text-gray-400">Associations:</span>
                            <div className="flex space-x-1">
                              {loan.guaranteeId && <Badge className="text-xs bg-blue-600/20 text-blue-300">G</Badge>}
                              {loan.tokenId && <Badge className="text-xs bg-purple-600/20 text-purple-300">T</Badge>}
                              {loan.escrowAccount && (
                                <Badge className="text-xs bg-amber-600/20 text-amber-300">E</Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Associated IDs */}
                        <div className="mt-3 pt-3 border-t border-slate-600/30">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                            {loan.guaranteeId && (
                              <div>
                                <span className="text-gray-400">Guarantee ID:</span>
                                <div className="font-mono text-blue-300 break-all">{loan.guaranteeId}</div>
                              </div>
                            )}
                            {loan.tokenId && (
                              <div>
                                <span className="text-gray-400">Token ID:</span>
                                <div className="font-mono text-purple-300 break-all">{loan.tokenId}</div>
                              </div>
                            )}
                            {loan.escrowAccount && (
                              <div>
                                <span className="text-gray-400">Escrow ID:</span>
                                <div className="font-mono text-amber-300 break-all">{loan.escrowAccount.escrowId}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Risk Distribution */}
              <Card className="bg-gradient-to-br from-red-900/50 to-pink-900/50 border-red-400/30">
                <CardHeader>
                  <CardTitle className="text-red-300 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Risk Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-green-300">Low Risk</span>
                      <span className="text-green-300 font-semibold">{adminMetrics.riskDistribution.low}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-300">Medium Risk</span>
                      <span className="text-yellow-300 font-semibold">{adminMetrics.riskDistribution.medium}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-300">High Risk</span>
                      <span className="text-red-300 font-semibold">{adminMetrics.riskDistribution.high}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status Distribution */}
              <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-400/30">
                <CardHeader>
                  <CardTitle className="text-indigo-300 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Status Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {Object.entries(adminMetrics.statusDistribution).map(([status, count]) => (
                      <div key={status} className="flex items-center justify-between">
                        <span className="text-indigo-300 capitalize">{status}</span>
                        <span className="text-indigo-300 font-semibold">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
              <CardContent className="text-center py-12">
                <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">Advanced Analytics</h3>
                <p className="text-gray-400 mb-6">
                  Comprehensive analytics dashboard with performance metrics and trend analysis.
                </p>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600">Generate Analytics Report</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
              <CardContent className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">Reporting Suite</h3>
                <p className="text-gray-400 mb-6">
                  Generate comprehensive reports for compliance, performance, and risk analysis.
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">Generate Reports</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
