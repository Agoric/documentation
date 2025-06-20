"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Crown,
  Lock,
  Unlock,
  ChevronRight,
  Sparkles,
  Globe,
  Zap,
  Star,
  TrendingUp,
  Database,
  Key,
  Activity,
  Bell,
} from "lucide-react"
import { useRealm } from "@/contexts/realm-context"

interface ExcellenceRealmPortal {
  id: string
  name: string
  description: string
  icon: React.ElementType
  accessLevel: "supreme" | "premium" | "standard" | "limited" | "restricted"
  requiredRoles: string[]
  gradient: string
  href: string
  status: "active" | "maintenance" | "locked" | "beta" | "new"
  features: string[]
  metrics?: { label: string; value: string | number; trend?: "up" | "down" | "stable" }[]
}

const excellenceRealmPortals: ExcellenceRealmPortal[] = [
  {
    id: "supreme-authority",
    name: "Supreme Authority",
    description: "Ultimate administrative control with AI-powered insights",
    icon: Crown,
    accessLevel: "supreme",
    requiredRoles: ["admin", "superuser"],
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
    href: "/admin",
    status: "active",
    features: ["AI Analytics", "Real-time Monitoring", "Advanced Security"],
    metrics: [
      { label: "System Health", value: "99.97%", trend: "up" },
      { label: "Active Users", value: 1247, trend: "up" },
    ],
  },
  {
    id: "excellence-dashboard",
    name: "Excellence Dashboard",
    description: "Premium dashboard with advanced analytics and insights",
    icon: Star,
    accessLevel: "premium",
    requiredRoles: ["admin", "analyst"],
    gradient: "from-purple-600 via-pink-600 to-red-600",
    href: "/",
    status: "new",
    features: ["Premium Analytics", "Custom Widgets", "Export Tools"],
    metrics: [
      { label: "Performance", value: "Excellent", trend: "stable" },
      { label: "Efficiency", value: "94%", trend: "up" },
    ],
  },
  {
    id: "premium-analytics",
    name: "Premium Analytics",
    description: "Advanced data intelligence with machine learning insights",
    icon: TrendingUp,
    accessLevel: "premium",
    requiredRoles: ["admin", "analyst"],
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    href: "/reports",
    status: "active",
    features: ["ML Insights", "Predictive Analytics", "Custom Reports"],
    metrics: [
      { label: "Data Points", value: "2.4M", trend: "up" },
      { label: "Accuracy", value: "97.3%", trend: "stable" },
    ],
  },
  {
    id: "security-center",
    name: "Security Center",
    description: "Advanced security management with threat detection",
    icon: Shield,
    accessLevel: "premium",
    requiredRoles: ["admin", "superuser"],
    gradient: "from-green-600 via-emerald-600 to-teal-600",
    href: "/security",
    status: "active",
    features: ["Threat Detection", "2FA Management", "Audit Logs"],
    metrics: [
      { label: "Threats Blocked", value: 847, trend: "down" },
      { label: "Security Score", value: "A+", trend: "stable" },
    ],
  },
  {
    id: "performance-monitor",
    name: "Performance Monitor",
    description: "Real-time system performance and optimization tools",
    icon: Activity,
    accessLevel: "standard",
    requiredRoles: ["admin", "moderator"],
    gradient: "from-orange-600 via-red-600 to-pink-600",
    href: "/performance",
    status: "active",
    features: ["Real-time Metrics", "Auto-scaling", "Performance Alerts"],
    metrics: [
      { label: "Response Time", value: "23ms", trend: "down" },
      { label: "Uptime", value: "99.97%", trend: "stable" },
    ],
  },
  {
    id: "api-management",
    name: "API Management",
    description: "Comprehensive API management and developer tools",
    icon: Key,
    accessLevel: "premium",
    requiredRoles: ["admin", "superuser"],
    gradient: "from-cyan-600 via-blue-600 to-indigo-600",
    href: "/api",
    status: "beta",
    features: ["API Keys", "Rate Limiting", "Documentation"],
    metrics: [
      { label: "API Calls", value: "1.2M", trend: "up" },
      { label: "Success Rate", value: "99.8%", trend: "stable" },
    ],
  },
  {
    id: "data-intelligence",
    name: "Data Intelligence",
    description: "AI-powered data analysis and business intelligence",
    icon: Database,
    accessLevel: "premium",
    requiredRoles: ["admin", "analyst"],
    gradient: "from-violet-600 via-purple-600 to-indigo-600",
    href: "/intelligence",
    status: "new",
    features: ["AI Analysis", "Data Mining", "Predictive Models"],
    metrics: [
      { label: "Models Active", value: 12, trend: "up" },
      { label: "Accuracy", value: "96.7%", trend: "up" },
    ],
  },
  {
    id: "quantum-realm",
    name: "Quantum Realm",
    description: "Next-generation quantum computing interface (Experimental)",
    icon: Sparkles,
    accessLevel: "supreme",
    requiredRoles: ["superuser"],
    gradient: "from-pink-600 via-rose-600 to-red-600",
    href: "/quantum",
    status: "locked",
    features: ["Quantum Computing", "Advanced Algorithms", "Future Tech"],
  },
]

export default function RealmEntryPoint() {
  const { user, loading, activeRealm, switchRealm, hasRole, hasAccess, metrics, notifications, systemStatus } =
    useRealm()

  const [selectedRealm, setSelectedRealm] = useState<string | null>(null)
  const [systemLoad, setSystemLoad] = useState(23.5)

  // Simulate real-time system load updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemLoad((prev) => Math.max(10, Math.min(90, prev + (Math.random() - 0.5) * 5)))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div
              className="absolute inset-0 w-24 h-24 border-4 border-purple-400 border-b-transparent rounded-full animate-spin mx-auto"
              style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
            ></div>
            <div
              className="absolute inset-0 w-24 h-24 border-2 border-pink-400 border-l-transparent rounded-full animate-spin mx-auto"
              style={{ animationDuration: "2s" }}
            ></div>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white">Excellence Realm Portal</h2>
            <p className="text-indigo-200">Initializing premium features...</p>
            <div className="w-64 mx-auto">
              <Progress value={85} className="h-2" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 to-pink-900 flex items-center justify-center">
        <Card className="w-96 border-red-300 bg-red-50">
          <CardContent className="text-center py-8">
            <Lock className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-700 mb-2">Excellence Access Required</h2>
            <p className="text-red-600">Premium authentication required to access the excellence realm portal.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleRealmAccess = async (portal: ExcellenceRealmPortal) => {
    if (portal.status === "locked" || !hasAccess(portal.accessLevel)) {
      return
    }

    setSelectedRealm(portal.id)
    await switchRealm(portal.id)
    window.location.href = portal.href
  }

  const unreadNotifications = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-40 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"
          style={{ animationDelay: "6s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <Globe className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white animate-spin" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
            Excellence Portal
          </h1>
          <p className="text-xl text-indigo-200 mb-8">Premium realm access with advanced capabilities</p>

          {/* System Status Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">{metrics.totalUsers.toLocaleString()}</div>
                  <div className="text-sm text-indigo-200">Total Users</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{metrics.activeRealms}</div>
                  <div className="text-sm text-indigo-200">Active Realms</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{systemLoad.toFixed(1)}%</div>
                  <div className="text-sm text-indigo-200">System Load</div>
                  <Progress value={systemLoad} className="h-1 mt-1" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{metrics.uptime}%</div>
                  <div className="text-sm text-indigo-200">Uptime</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced User Profile */}
          <div className="flex items-center justify-center space-x-6 mb-8">
            <Avatar className="h-16 w-16 border-4 border-indigo-400 shadow-2xl">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xl">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-white font-bold text-xl">{user.name}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  {user.accessLevel.toUpperCase()}
                </Badge>
                {user.roles.map((role) => (
                  <Badge key={role} variant="outline" className="border-purple-400 text-purple-200">
                    {role}
                  </Badge>
                ))}
                {user.twoFactorEnabled && (
                  <Badge className="bg-green-600 text-white">
                    <Shield className="w-3 h-3 mr-1" />
                    2FA
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-4 mt-2 text-sm text-indigo-200">
                <span>Session: {user.sessionId.slice(-8)}</span>
                {unreadNotifications > 0 && (
                  <div className="flex items-center space-x-1">
                    <Bell className="w-4 h-4" />
                    <span>{unreadNotifications} notifications</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Excellence Realm Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-8xl mx-auto">
          {excellenceRealmPortals.map((portal) => {
            const canAccess = hasAccess(portal.accessLevel) && portal.requiredRoles.some((role) => hasRole(role as any))
            const isLocked = portal.status === "locked" || !canAccess
            const isSelected = selectedRealm === portal.id

            return (
              <Card
                key={portal.id}
                className={`relative overflow-hidden transition-all duration-500 cursor-pointer group ${
                  isLocked ? "opacity-60 cursor-not-allowed" : "hover:scale-105 hover:shadow-2xl hover:-translate-y-2"
                } ${isSelected ? "ring-4 ring-yellow-400 shadow-2xl scale-105" : ""}`}
                onClick={() => !isLocked && handleRealmAccess(portal)}
              >
                {/* Enhanced gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${portal.gradient} opacity-90`}></div>

                {/* Status indicators */}
                <div className="absolute top-3 right-3 flex space-x-1">
                  {portal.status === "new" && (
                    <Badge className="bg-green-500 text-white text-xs animate-pulse">NEW</Badge>
                  )}
                  {portal.status === "beta" && <Badge className="bg-orange-500 text-white text-xs">BETA</Badge>}
                  {isLocked ? <Lock className="w-5 h-5 text-red-300" /> : <Unlock className="w-5 h-5 text-green-300" />}
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 text-white h-full flex flex-col">
                  <CardHeader className="p-0 mb-4 flex-shrink-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                        <portal.icon className="w-7 h-7" />
                      </div>
                      {!isLocked && <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />}
                    </div>
                    <CardTitle className="text-xl font-bold mb-2">{portal.name}</CardTitle>
                    <CardDescription className="text-white/90 text-sm leading-relaxed">
                      {portal.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-0 flex-grow flex flex-col justify-between">
                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {portal.features.map((feature) => (
                          <Badge key={feature} className="bg-white/20 text-white text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    {portal.metrics && (
                      <div className="space-y-2 mb-4">
                        {portal.metrics.map((metric) => (
                          <div key={metric.label} className="flex items-center justify-between text-sm">
                            <span className="text-white/80">{metric.label}</span>
                            <div className="flex items-center space-x-1">
                              <span className="font-semibold">{metric.value}</span>
                              {metric.trend && (
                                <TrendingUp
                                  className={`w-3 h-3 ${
                                    metric.trend === "up"
                                      ? "text-green-300"
                                      : metric.trend === "down"
                                        ? "text-red-300 rotate-180"
                                        : "text-yellow-300"
                                  }`}
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="flex items-center justify-between mt-auto">
                      <Badge className="bg-white/20 text-white text-xs">{portal.accessLevel.toUpperCase()}</Badge>
                      {!isLocked && (
                        <Button
                          size="sm"
                          className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRealmAccess(portal)
                          }}
                        >
                          <Zap className="w-4 h-4 mr-1" />
                          Enter
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </div>

                {/* Enhanced hover effect */}
                {!isLocked && (
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}

                {/* Loading overlay */}
                {isSelected && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center">
                      <div className="w-10 h-10 border-3 border-white border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                      <p className="text-white font-semibold">Accessing Excellence...</p>
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
        </div>

        {/* Enhanced Footer */}
        <div className="text-center mt-16 space-y-4">
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 max-w-2xl mx-auto">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-indigo-300">Active Realm:</span>
                <span className="font-semibold text-white ml-2">
                  {activeRealm ? activeRealm.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()) : "None"}
                </span>
              </div>
              <div>
                <span className="text-indigo-300">System Status:</span>
                <Badge
                  className={`ml-2 ${
                    systemStatus === "operational"
                      ? "bg-green-600"
                      : systemStatus === "degraded"
                        ? "bg-yellow-600"
                        : systemStatus === "maintenance"
                          ? "bg-blue-600"
                          : "bg-red-600"
                  }`}
                >
                  {systemStatus.toUpperCase()}
                </Badge>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-indigo-400 text-xs">
                Last accessed: {user.lastAccessed.toLocaleString()} • Excellence v1.0 • Premium Features Enabled
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
