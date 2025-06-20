"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Shield,
  Crown,
  Users,
  BarChart3,
  Settings,
  Lock,
  Unlock,
  ChevronRight,
  Sparkles,
  Globe,
  Zap,
} from "lucide-react"
import { useRealm } from "@/contexts/realm-context"

interface RealmPortal {
  id: string
  name: string
  description: string
  icon: React.ElementType
  accessLevel: "supreme" | "standard" | "limited" | "restricted"
  requiredRoles: string[]
  gradient: string
  href: string
  status: "active" | "maintenance" | "locked"
}

const realmPortals: RealmPortal[] = [
  {
    id: "supreme-authority",
    name: "Supreme Authority",
    description: "Ultimate administrative control and system management",
    icon: Crown,
    accessLevel: "supreme",
    requiredRoles: ["admin"],
    gradient: "from-indigo-600 to-purple-700",
    href: "/admin",
    status: "active",
  },
  {
    id: "admin-panel",
    name: "Admin Panel",
    description: "Standard administrative functions and user management",
    icon: Shield,
    accessLevel: "standard",
    requiredRoles: ["admin", "moderator"],
    gradient: "from-purple-600 to-pink-700",
    href: "/admin",
    status: "active",
  },
  {
    id: "user-dashboard",
    name: "User Dashboard",
    description: "Personal dashboard and account management",
    icon: Users,
    accessLevel: "limited",
    requiredRoles: ["user"],
    gradient: "from-blue-600 to-indigo-700",
    href: "/dashboard",
    status: "active",
  },
  {
    id: "analytics-realm",
    name: "Analytics Realm",
    description: "Advanced analytics and reporting capabilities",
    icon: BarChart3,
    accessLevel: "standard",
    requiredRoles: ["admin", "moderator"],
    gradient: "from-green-600 to-teal-700",
    href: "/reports",
    status: "active",
  },
  {
    id: "settings-portal",
    name: "Settings Portal",
    description: "System configuration and preferences",
    icon: Settings,
    accessLevel: "limited",
    requiredRoles: ["user"],
    gradient: "from-gray-600 to-slate-700",
    href: "/settings",
    status: "active",
  },
  {
    id: "secret-realm",
    name: "Secret Realm",
    description: "Classified operations and advanced features",
    icon: Lock,
    accessLevel: "supreme",
    requiredRoles: ["admin"],
    gradient: "from-red-600 to-rose-700",
    href: "/secret",
    status: "locked",
  },
]

export default function RealmEntryPoint() {
  const { user, loading, activeRealm, switchRealm, hasRole, hasAccess } = useRealm()
  const [selectedRealm, setSelectedRealm] = useState<string | null>(null)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div
              className="absolute inset-0 w-20 h-20 border-4 border-purple-400 border-b-transparent rounded-full animate-spin mx-auto"
              style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
            ></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Accessing Realm Portal</h2>
            <p className="text-indigo-200">Authenticating supreme authority...</p>
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
            <h2 className="text-xl font-semibold text-red-700 mb-2">Realm Access Denied</h2>
            <p className="text-red-600">Authentication required to access the realm portal.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleRealmAccess = async (portal: RealmPortal) => {
    if (portal.status === "locked" || !hasAccess(portal.accessLevel)) {
      return
    }

    setSelectedRealm(portal.id)
    await switchRealm(portal.id)

    // Navigate to the realm
    window.location.href = portal.href
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Realm Portal</h1>
          <p className="text-xl text-indigo-200 mb-6">Choose your destination in the digital realm</p>

          {/* User info */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Avatar className="h-12 w-12 border-2 border-indigo-400">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-indigo-600 text-white">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-white font-semibold">{user.name}</p>
              <div className="flex items-center space-x-2">
                <Badge className="bg-indigo-600 text-white">{user.accessLevel.toUpperCase()}</Badge>
                {user.roles.map((role) => (
                  <Badge key={role} variant="outline" className="border-purple-400 text-purple-200">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Realm Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {realmPortals.map((portal) => {
            const canAccess = hasAccess(portal.accessLevel) && portal.requiredRoles.some((role) => hasRole(role as any))
            const isLocked = portal.status === "locked" || !canAccess
            const isSelected = selectedRealm === portal.id

            return (
              <Card
                key={portal.id}
                className={`relative overflow-hidden transition-all duration-300 cursor-pointer group ${
                  isLocked ? "opacity-60 cursor-not-allowed" : "hover:scale-105 hover:shadow-2xl"
                } ${isSelected ? "ring-4 ring-yellow-400 shadow-2xl" : ""}`}
                onClick={() => !isLocked && handleRealmAccess(portal)}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${portal.gradient} opacity-90`}></div>

                {/* Content */}
                <div className="relative z-10 p-6 text-white">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <portal.icon className="w-6 h-6" />
                      </div>
                      <div className="flex items-center space-x-2">
                        {isLocked ? (
                          <Lock className="w-5 h-5 text-red-300" />
                        ) : (
                          <Unlock className="w-5 h-5 text-green-300" />
                        )}
                        {!isLocked && (
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold">{portal.name}</CardTitle>
                    <CardDescription className="text-white/80">{portal.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="p-0">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        <Badge className="bg-white/20 text-white text-xs">{portal.accessLevel}</Badge>
                        {portal.status === "maintenance" && (
                          <Badge className="bg-yellow-500/80 text-white text-xs">Maintenance</Badge>
                        )}
                      </div>
                      {!isLocked && (
                        <Button
                          size="sm"
                          className="bg-white/20 hover:bg-white/30 text-white border-white/30"
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

                {/* Hover effect overlay */}
                {!isLocked && (
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}

                {/* Loading overlay */}
                {isSelected && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-white text-sm">Accessing...</p>
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-indigo-300 text-sm">
            Active Realm: <span className="font-semibold text-white">{activeRealm || "None"}</span>
          </p>
          <p className="text-indigo-400 text-xs mt-2">Last accessed: {user.lastAccessed.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}
