"use client"

import { useState, useEffect } from "react"
import { useSnapifiBanking } from "@/contexts/snapifi-banking-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Building,
  CreditCard,
  DollarSign,
  TrendingUp,
  Users,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
} from "lucide-react"
import { motion } from "framer-motion"

export function BankingAdminDashboard() {
  const {
    getAllAccounts,
    getBankingAnalytics,
    freezeAccount,
    unfreezeAccount,
    auditAccount,
    generateComplianceReport,
  } = useSnapifiBanking()

  const [accounts, setAccounts] = useState<any[]>([])
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    loadAdminData()
  }, [])

  const loadAdminData = async () => {
    try {
      setLoading(true)
      const accountsData = getAllAccounts()
      const analyticsData = await getBankingAnalytics()

      setAccounts(accountsData)
      setAnalytics(analyticsData)
    } catch (error) {
      console.error("Failed to load admin data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFreezeAccount = async (accountId: string) => {
    try {
      await freezeAccount(accountId, "Administrative action")
      await loadAdminData()
    } catch (error) {
      console.error("Failed to freeze account:", error)
    }
  }

  const handleUnfreezeAccount = async (accountId: string) => {
    try {
      await unfreezeAccount(accountId)
      await loadAdminData()
    } catch (error) {
      console.error("Failed to unfreeze account:", error)
    }
  }

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.holderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountNumber.includes(searchTerm) ||
      account.accountId.includes(searchTerm)

    const matchesFilter = filterStatus === "all" || account.accountStatus === filterStatus

    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-amber-400 mx-auto mb-4 animate-pulse" />
          <p className="text-amber-300 font-serif">Loading Banking Administration...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-amber-300 font-serif">Banking Administration</h1>
            <p className="text-purple-200">Snapifi Banking System Management</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="border-green-400 text-green-300">
              <Shield className="w-3 h-3 mr-1" />
              ADMIN ACCESS
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-200">Total Accounts</CardTitle>
              <Users className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-300">
                {analytics?.totalAccounts.toLocaleString() || "0"}
              </div>
              <p className="text-xs text-purple-300">All account types</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-200">Total Deposits</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                ${analytics?.totalDeposits.toLocaleString() || "0"}
              </div>
              <p className="text-xs text-purple-300">All time</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-200">Average Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-300">
                ${analytics?.averageBalance.toLocaleString() || "0"}
              </div>
              <p className="text-xs text-purple-300">Per account</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-200">Compliance Rate</CardTitle>
              <Shield className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                {((analytics?.complianceRate || 0) * 100).toFixed(1)}%
              </div>
              <p className="text-xs text-purple-300">KYC verified</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Admin Interface */}
      <Tabs defaultValue="accounts" className="space-y-6">
        <TabsList className="bg-purple-900/50 border-amber-400/30">
          <TabsTrigger value="accounts" className="data-[state=active]:bg-amber-500/20">
            <Users className="w-4 h-4 mr-2" />
            Account Management
          </TabsTrigger>
          <TabsTrigger value="compliance" className="data-[state=active]:bg-amber-500/20">
            <Shield className="w-4 h-4 mr-2" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-amber-500/20">
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-amber-500/20">
            <CreditCard className="w-4 h-4 mr-2" />
            Reports
          </TabsTrigger>
        </TabsList>

        {/* Account Management Tab */}
        <TabsContent value="accounts" className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
            <CardHeader>
              <CardTitle className="text-amber-300 font-serif">Account Management</CardTitle>
              <CardDescription className="text-purple-200">Manage all banking accounts</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex space-x-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
                    <Input
                      placeholder="Search accounts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-purple-800/30 border-amber-400/30 text-amber-300"
                    />
                  </div>
                </div>
                <div className="w-48">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full p-2 bg-purple-800/30 border border-amber-400/30 rounded-md text-amber-300"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="frozen">Frozen</option>
                    <option value="closed">Closed</option>
                    <option value="pending_verification">Pending</option>
                  </select>
                </div>
              </div>

              {/* Accounts Table */}
              <div className="rounded-md border border-amber-400/30">
                <Table>
                  <TableHeader>
                    <TableRow className="border-amber-400/30">
                      <TableHead className="text-amber-300">Account</TableHead>
                      <TableHead className="text-amber-300">Holder</TableHead>
                      <TableHead className="text-amber-300">Type</TableHead>
                      <TableHead className="text-amber-300">Balance</TableHead>
                      <TableHead className="text-amber-300">Status</TableHead>
                      <TableHead className="text-amber-300">Compliance</TableHead>
                      <TableHead className="text-amber-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAccounts.map((account) => (
                      <TableRow key={account.accountId} className="border-amber-400/20">
                        <TableCell className="text-purple-200 font-mono">{account.accountNumber}</TableCell>
                        <TableCell className="text-purple-200">
                          <div>
                            <p className="font-medium">{account.holderName}</p>
                            <p className="text-sm text-purple-400">{account.holderType}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-purple-200">{account.accountType.replace("_", " ")}</TableCell>
                        <TableCell className="text-purple-200">${account.balance.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              account.accountStatus === "active"
                                ? "default"
                                : account.accountStatus === "frozen"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {account.accountStatus === "active" && <CheckCircle className="w-3 h-3 mr-1" />}
                            {account.accountStatus === "frozen" && <XCircle className="w-3 h-3 mr-1" />}
                            {account.accountStatus === "pending_verification" && (
                              <AlertTriangle className="w-3 h-3 mr-1" />
                            )}
                            {account.accountStatus.replace("_", " ").toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={account.complianceStatus.kycStatus === "verified" ? "default" : "secondary"}>
                            {account.complianceStatus.kycStatus.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {account.accountStatus === "active" ? (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleFreezeAccount(account.accountId)}
                              >
                                Freeze
                              </Button>
                            ) : account.accountStatus === "frozen" ? (
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() => handleUnfreezeAccount(account.accountId)}
                              >
                                Unfreeze
                              </Button>
                            ) : null}
                            <Button size="sm" variant="outline">
                              Audit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-900/50 to-blue-900/50 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-300 font-serif">KYC Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-green-200">Verified:</span>
                  <span className="text-green-300 font-bold">
                    {accounts.filter((acc) => acc.complianceStatus.kycStatus === "verified").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-200">Pending:</span>
                  <span className="text-yellow-300 font-bold">
                    {accounts.filter((acc) => acc.complianceStatus.kycStatus === "pending").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-200">Rejected:</span>
                  <span className="text-red-300 font-bold">
                    {accounts.filter((acc) => acc.complianceStatus.kycStatus === "rejected").length}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-400/30">
              <CardHeader>
                <CardTitle className="text-blue-300 font-serif">AML Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-blue-200">Compliant:</span>
                  <span className="text-green-300 font-bold">
                    {accounts.filter((acc) => acc.complianceStatus.amlStatus === "compliant").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Under Review:</span>
                  <span className="text-yellow-300 font-bold">
                    {accounts.filter((acc) => acc.complianceStatus.amlStatus === "under_review").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Flagged:</span>
                  <span className="text-red-300 font-bold">
                    {accounts.filter((acc) => acc.complianceStatus.amlStatus === "flagged").length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif">Transaction Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-purple-200">Transaction Volume:</span>
                  <span className="text-amber-300 font-bold">
                    {analytics?.transactionVolume.toLocaleString() || "0"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Total Withdrawals:</span>
                  <span className="text-amber-300 font-bold">
                    ${analytics?.totalWithdrawals.toLocaleString() || "0"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Customer Satisfaction:</span>
                  <span className="text-amber-300 font-bold">{analytics?.customerSatisfaction || "0"}/5.0</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif">Account Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-purple-200">Individual:</span>
                  <span className="text-amber-300 font-bold">
                    {accounts.filter((acc) => acc.holderType === "individual").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Business:</span>
                  <span className="text-amber-300 font-bold">
                    {accounts.filter((acc) => acc.holderType === "business").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Institutional:</span>
                  <span className="text-amber-300 font-bold">
                    {accounts.filter((acc) => acc.holderType === "institutional").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Vendor:</span>
                  <span className="text-amber-300 font-bold">
                    {accounts.filter((acc) => acc.holderType === "vendor").length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
              <CardHeader>
                <CardTitle className="text-purple-300 font-serif">Compliance Report</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600">
                  <Shield className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/50 to-teal-900/50 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-300 font-serif">Financial Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Financial Report
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
              <CardHeader>
                <CardTitle className="text-blue-300 font-serif">Audit Trail</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600">
                  <Building className="w-4 h-4 mr-2" />
                  Audit Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
