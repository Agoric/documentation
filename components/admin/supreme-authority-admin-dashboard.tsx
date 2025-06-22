"use client"

import { useState, useEffect } from "react"
import { useAdminAccess } from "@/contexts/admin-access-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"
import {
  Users,
  DollarSign,
  Shield,
  Settings,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Crown,
  Zap,
  Eye,
  Download,
  UserX,
  SnowflakeIcon as Freeze,
} from "lucide-react"
import { motion } from "framer-motion"

export function SupremeAuthorityAdminDashboard() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [registerForm, setRegisterForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  })
  const [isRegistering, setIsRegistering] = useState(false)

  const {
    currentAdmin,
    isAuthenticated,
    getAllUsers,
    getFinancialSummary,
    getSystemMetrics,
    getDashboardAnalytics,
    getSecurityAlerts,
    suspendUser,
    activateUser,
    freezeAccount,
    unfreezeAccount,
  } = useAdminAccess()

  const [users, setUsers] = useState<any[]>([])
  const [financialSummary, setFinancialSummary] = useState<any>(null)
  const [systemMetrics, setSystemMetrics] = useState<any>(null)
  const [analytics, setAnalytics] = useState<any>(null)
  const [securityAlerts, setSecurityAlerts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData()
    }
  }, [isAuthenticated])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const [usersData, financialData, metricsData, analyticsData, alertsData] = await Promise.all([
        getAllUsers(),
        getFinancialSummary(),
        getSystemMetrics(),
        getDashboardAnalytics(),
        getSecurityAlerts(),
      ])

      setUsers(usersData)
      setFinancialSummary(financialData)
      setSystemMetrics(metricsData)
      setAnalytics(analyticsData)
      setSecurityAlerts(alertsData)
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUserAction = async (userId: string, action: "suspend" | "activate" | "freeze" | "unfreeze") => {
    try {
      switch (action) {
        case "suspend":
          await suspendUser(userId, "Administrative action")
          break
        case "activate":
          await activateUser(userId)
          break
        case "freeze":
          await freezeAccount(userId, "Security review")
          break
        case "unfreeze":
          await unfreezeAccount(userId)
          break
      }
      await loadDashboardData() // Refresh data
    } catch (error) {
      console.error(`Failed to ${action} user:`, error)
    }
  }

  if (!isAuthenticated || !currentAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950 flex items-center justify-center">
        <Card className="w-96 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
          <CardHeader className="text-center">
            <SupremeAuthorityCoin size="xl" variant="logo" />
            <CardTitle className="text-amber-300 font-serif">Supreme Authority Access</CardTitle>
            <CardDescription className="text-purple-200">SUPREMA AUCTORITAS DIGITALIS</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 bg-purple-800/30">
                <TabsTrigger value="login" className="data-[state=active]:bg-amber-500/20">
                  Login
                </TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-amber-500/20">
                  Register
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <Input placeholder="Email" type="email" className="bg-purple-800/30 border-amber-400/30" />
                <Input type="password" placeholder="Password" className="bg-purple-800/30 border-amber-400/30" />
                <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                  <Crown className="w-4 h-4 mr-2" />
                  Access Imperial Command
                </Button>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <Input placeholder="Email Address" type="email" className="bg-purple-800/30 border-amber-400/30" />
                <Input placeholder="Username" className="bg-purple-800/30 border-amber-400/30" />
                <Input type="password" placeholder="Password" className="bg-purple-800/30 border-amber-400/30" />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  className="bg-purple-800/30 border-amber-400/30"
                />
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                  <Crown className="w-4 h-4 mr-2" />
                  Register as Supreme Authority
                </Button>
                <p className="text-xs text-purple-300 text-center">
                  Registration grants immediate Supreme Authority access
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <SupremeAuthorityCoin size="xl" variant="logo" animated />
          <p className="text-amber-300 mt-4 font-serif">Loading Imperial Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950 p-6">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SupremeAuthorityCoin size="lg" variant="logo" />
            <div>
              <h1 className="text-3xl font-bold text-amber-300 font-serif">Supreme Authority Command Center</h1>
              <p className="text-purple-200">
                Welcome, {currentAdmin.adminProfile.title} {currentAdmin.adminProfile.firstName}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="border-amber-400 text-amber-300">
              <Crown className="w-3 h-3 mr-1" />
              {currentAdmin.securityClearance.clearanceLevel.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="border-green-400 text-green-300">
              <CheckCircle className="w-3 h-3 mr-1" />
              AUTHENTICATED
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* System Status Alert */}
      {systemMetrics && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Alert className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-400/30">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-200">
              System Status: <strong>{systemMetrics.systemHealth.toUpperCase()}</strong> | Uptime:{" "}
              <strong>{systemMetrics.uptime}%</strong> | Active Users:{" "}
              <strong>{systemMetrics.activeUsers.toLocaleString()}</strong>
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Main Dashboard */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-purple-900/50 border-amber-400/30">
          <TabsTrigger value="overview" className="data-[state=active]:bg-amber-500/20">
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-amber-500/20">
            <Users className="w-4 h-4 mr-2" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="financial" className="data-[state=active]:bg-amber-500/20">
            <DollarSign className="w-4 h-4 mr-2" />
            Financial Oversight
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-amber-500/20">
            <Shield className="w-4 h-4 mr-2" />
            Security Center
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-amber-500/20">
            <Settings className="w-4 h-4 mr-2" />
            System Control
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Key Metrics Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-200">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-amber-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-300">{systemMetrics?.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-purple-300">{systemMetrics?.activeUsers} active today</p>
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
                  <CardTitle className="text-sm font-medium text-purple-200">Total Volume</CardTitle>
                  <DollarSign className="h-4 w-4 text-amber-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-300">
                    ${financialSummary?.totalAssets.toLocaleString()}
                  </div>
                  <p className="text-xs text-purple-300">${financialSummary?.dailyVolume.toLocaleString()} today</p>
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
                  <CardTitle className="text-sm font-medium text-purple-200">System Health</CardTitle>
                  <Zap className="h-4 w-4 text-amber-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">{systemMetrics?.systemHealth.toUpperCase()}</div>
                  <Progress value={systemMetrics?.uptime} className="mt-2" />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-200">Security Alerts</CardTitle>
                  <Shield className="h-4 w-4 text-amber-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-300">{securityAlerts.length}</div>
                  <p className="text-xs text-purple-300">
                    {securityAlerts.filter((a) => a.status === "new").length} new alerts
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif">User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-purple-300">
                  [User Growth Chart Placeholder]
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif">Transaction Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-purple-300">
                  [Transaction Volume Chart Placeholder]
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
            <CardHeader>
              <CardTitle className="text-amber-300 font-serif">User Management</CardTitle>
              <CardDescription className="text-purple-200">
                Manage global citizens and institutional entities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-purple-800/30 rounded-lg border border-amber-400/20"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-amber-300">{user.name}</p>
                        <p className="text-sm text-purple-300">{user.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {user.type}
                          </Badge>
                          <Badge variant={user.status === "active" ? "default" : "secondary"} className="text-xs">
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUserAction(user.id, "suspend")}
                        className="border-red-400/30 text-red-300 hover:bg-red-500/20"
                      >
                        <UserX className="w-3 h-3 mr-1" />
                        Suspend
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUserAction(user.id, "freeze")}
                        className="border-blue-400/30 text-blue-300 hover:bg-blue-500/20"
                      >
                        <Freeze className="w-3 h-3 mr-1" />
                        Freeze
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-amber-400/30 text-amber-300 hover:bg-amber-500/20"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Oversight Tab */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif">Financial Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-purple-200">Total Assets:</span>
                  <span className="text-amber-300 font-bold">${financialSummary?.totalAssets.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Total Liabilities:</span>
                  <span className="text-amber-300 font-bold">
                    ${financialSummary?.totalLiabilities.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Daily Volume:</span>
                  <span className="text-amber-300 font-bold">${financialSummary?.dailyVolume.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Monthly Volume:</span>
                  <span className="text-amber-300 font-bold">${financialSummary?.monthlyVolume.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Profit/Loss:</span>
                  <span className="text-green-400 font-bold">+${financialSummary?.profitLoss.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif">Risk Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-purple-200">Reserve Ratio:</span>
                    <span className="text-amber-300">{(financialSummary?.reserveRatio * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={financialSummary?.reserveRatio * 100} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-purple-200">Liquidity Ratio:</span>
                    <span className="text-amber-300">{(financialSummary?.liquidityRatio * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={financialSummary?.liquidityRatio * 100} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Center Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
            <CardHeader>
              <CardTitle className="text-amber-300 font-serif">Security Alerts</CardTitle>
              <CardDescription className="text-purple-200">Monitor and respond to security incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityAlerts.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <p className="text-green-300 font-medium">All Clear</p>
                    <p className="text-purple-300 text-sm">No security alerts at this time</p>
                  </div>
                ) : (
                  securityAlerts.map((alert) => (
                    <div
                      key={alert.alertId}
                      className="flex items-center justify-between p-4 bg-purple-800/30 rounded-lg border border-amber-400/20"
                    >
                      <div className="flex items-center space-x-4">
                        <AlertTriangle
                          className={`w-5 h-5 ${
                            alert.severity === "critical"
                              ? "text-red-400"
                              : alert.severity === "high"
                                ? "text-orange-400"
                                : alert.severity === "medium"
                                  ? "text-yellow-400"
                                  : "text-blue-400"
                          }`}
                        />
                        <div>
                          <p className="font-medium text-amber-300">{alert.category}</p>
                          <p className="text-sm text-purple-300">{alert.description}</p>
                          <p className="text-xs text-purple-400">
                            {alert.timestamp.toLocaleString()} • {alert.source}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            alert.severity === "critical"
                              ? "border-red-400 text-red-300"
                              : alert.severity === "high"
                                ? "border-orange-400 text-orange-300"
                                : alert.severity === "medium"
                                  ? "border-yellow-400 text-yellow-300"
                                  : "border-blue-400 text-blue-300"
                          }`}
                        >
                          {alert.severity}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {alert.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Control Tab */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif">System Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                  <Settings className="w-4 h-4 mr-2" />
                  Platform Configuration
                </Button>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export System Data
                </Button>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                  <Zap className="w-4 h-4 mr-2" />
                  System Maintenance
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30">
              <CardHeader>
                <CardTitle className="text-amber-300 font-serif">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Pending Verifications
                </Button>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Review Security Alerts
                </Button>
                <Button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
