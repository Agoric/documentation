"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Activity,
  Users,
  DollarSign,
  TrendingUp,
  Globe,
  Zap,
  Shield,
  ArrowRight,
  Play,
  Pause,
  BarChart3,
  CreditCard,
  Building2,
  ShoppingBag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LiveVersionPage() {
  const [isLive, setIsLive] = useState(true)
  const [liveStats, setLiveStats] = useState({
    activeUsers: 24567,
    transactionsToday: 89234,
    totalVolume: 45678901,
    systemUptime: 99.97,
    responseTime: 127,
    dataProcessed: 2.4,
  })

  const [realtimeData, setRealtimeData] = useState([
    { time: "14:30", users: 24567, transactions: 1234 },
    { time: "14:31", users: 24589, transactions: 1267 },
    { time: "14:32", users: 24612, transactions: 1289 },
    { time: "14:33", users: 24634, transactions: 1312 },
    { time: "14:34", users: 24656, transactions: 1334 },
  ])

  // Simulate live data updates
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20) - 10,
        transactionsToday: prev.transactionsToday + Math.floor(Math.random() * 50),
        totalVolume: prev.totalVolume + Math.floor(Math.random() * 10000),
        systemUptime: Math.max(99.5, prev.systemUptime + (Math.random() - 0.5) * 0.01),
        responseTime: Math.max(50, prev.responseTime + Math.floor(Math.random() * 20) - 10),
        dataProcessed: prev.dataProcessed + Math.random() * 0.1,
      }))

      setRealtimeData((prev) => {
        const newTime = new Date()
        const timeStr = `${newTime.getHours()}:${newTime.getMinutes().toString().padStart(2, "0")}`
        const newEntry = {
          time: timeStr,
          users: liveStats.activeUsers,
          transactions: Math.floor(Math.random() * 100) + 1200,
        }
        return [...prev.slice(-4), newEntry]
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [isLive, liveStats.activeUsers])

  const liveFeatures = [
    {
      name: "Credit Suite Live",
      description: "Real-time credit monitoring and optimization",
      icon: CreditCard,
      status: "active",
      users: 8934,
      url: "/credit-suite",
    },
    {
      name: "Business Suite Live",
      description: "Live business analytics and management",
      icon: Building2,
      status: "active",
      users: 5672,
      url: "/business-suite",
    },
    {
      name: "SNAP-DAX Trading",
      description: "Live financial trading platform",
      icon: TrendingUp,
      status: "active",
      users: 12456,
      url: "/dashboard/snap-dax",
    },
    {
      name: "EcommereX Live",
      description: "Real-time holographic marketplace",
      icon: ShoppingBag,
      status: "active",
      users: 7823,
      url: "/dashboard/ecommerex/holographic-products",
    },
    {
      name: "Real Estate Live",
      description: "Live property streaming and analysis",
      icon: Globe,
      status: "active",
      users: 4567,
      url: "/real-estate",
    },
    {
      name: "Beta Features Lab",
      description: "Cutting-edge experimental features",
      icon: Zap,
      status: "beta",
      users: 1234,
      url: "/beta-lab",
    },
  ]

  const systemHealth = [
    { component: "API Gateway", status: "healthy", uptime: 99.98, responseTime: 45 },
    { component: "Database Cluster", status: "healthy", uptime: 99.99, responseTime: 12 },
    { component: "Authentication Service", status: "healthy", uptime: 99.97, responseTime: 67 },
    { component: "Payment Processing", status: "healthy", uptime: 99.95, responseTime: 89 },
    { component: "AI Processing", status: "healthy", uptime: 99.92, responseTime: 234 },
    { component: "Real-time Streaming", status: "healthy", uptime: 99.94, responseTime: 156 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Live Status Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isLive ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
                <Badge variant={isLive ? "secondary" : "destructive"} className="px-4 py-2">
                  <Activity className="h-4 w-4 mr-2" />
                  {isLive ? "LIVE" : "OFFLINE"}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLive(!isLive)}
                className="text-slate-300 hover:text-white"
              >
                {isLive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              SnappAiFi Live
            </h1>

            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Experience the complete SnappAiFi platform in real-time. All features are live and fully functional with
              real data streaming.
            </p>

            <Alert className="max-w-2xl mx-auto bg-green-900/20 border-green-500/50">
              <Shield className="h-4 w-4" />
              <AlertDescription className="text-green-200">
                <strong>Production Ready:</strong> This is the full production version with all premium features
                unlocked.
              </AlertDescription>
            </Alert>
          </motion.div>
        </div>
      </div>

      {/* Live Statistics */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Live Platform Statistics</h2>
          <p className="text-slate-300">Real-time data from the SnappAiFi platform</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Active Users</CardTitle>
                <Users className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{liveStats.activeUsers.toLocaleString()}</div>
                <p className="text-xs text-green-400">+12% from yesterday</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Transactions Today</CardTitle>
                <Activity className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{liveStats.transactionsToday.toLocaleString()}</div>
                <p className="text-xs text-green-400">+8% from yesterday</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Total Volume</CardTitle>
                <DollarSign className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">${(liveStats.totalVolume / 1000000).toFixed(1)}M</div>
                <p className="text-xs text-green-400">+15% from yesterday</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">System Uptime</CardTitle>
                <Shield className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{liveStats.systemUptime.toFixed(2)}%</div>
                <p className="text-xs text-green-400">Last 30 days</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Live Features */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Live Platform Features</h3>
            <p className="text-slate-300">All features are running live with real-time data</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveFeatures.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <feature.icon className="h-6 w-6 text-blue-400" />
                        <div>
                          <CardTitle className="text-white text-lg">{feature.name}</CardTitle>
                          <CardDescription>{feature.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${isLive ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
                        />
                        <Badge variant={feature.status === "active" ? "secondary" : "outline"}>{feature.status}</Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">Active Users:</span>
                      <span className="text-white font-medium">{feature.users.toLocaleString()}</span>
                    </div>

                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 group-hover:bg-blue-500"
                      onClick={() => (window.location.href = feature.url)}
                    >
                      Access Live Feature
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">System Health Monitor</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systemHealth.map((component, index) => (
              <motion.div
                key={component.component}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{component.component}</CardTitle>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <Badge variant="secondary">Healthy</Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">Uptime</span>
                        <span className="text-green-400">{component.uptime}%</span>
                      </div>
                      <Progress value={component.uptime} className="w-full" />
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Response Time:</span>
                      <span className="text-white font-medium">{component.responseTime}ms</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="mt-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                Real-time Activity Feed
              </CardTitle>
              <CardDescription>Live data streaming from the platform</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-5 gap-4 text-sm font-medium text-slate-300 border-b border-slate-700 pb-2">
                <span>Time</span>
                <span>Active Users</span>
                <span>Transactions</span>
                <span>Response Time</span>
                <span>Status</span>
              </div>

              {realtimeData.map((entry, index) => (
                <motion.div
                  key={`${entry.time}-${index}`}
                  className="grid grid-cols-5 gap-4 text-sm py-2 border-b border-slate-800"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-slate-300">{entry.time}</span>
                  <span className="text-white">{entry.users.toLocaleString()}</span>
                  <span className="text-green-400">{entry.transactions}</span>
                  <span className="text-blue-400">{liveStats.responseTime}ms</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-green-400">Healthy</span>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Access */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Quick Access to Live Features</h3>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => (window.location.href = "/credit-suite")}
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Credit Suite Live
            </Button>

            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => (window.location.href = "/business-suite")}
            >
              <Building2 className="h-5 w-5 mr-2" />
              Business Suite Live
            </Button>

            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => (window.location.href = "/dashboard/snap-dax")}
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              SNAP-DAX Trading
            </Button>

            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700"
              onClick={() => (window.location.href = "/real-estate")}
            >
              <Globe className="h-5 w-5 mr-2" />
              Real Estate Live
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black"
              onClick={() => (window.location.href = "/beta-lab")}
            >
              <Zap className="h-5 w-5 mr-2" />
              Beta Features
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
