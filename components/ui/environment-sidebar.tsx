"use client"

import { Calendar } from "@/components/ui/calendar"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { usePortal } from "@/contexts/portal-context"
import {
  Home,
  DollarSign,
  TrendingUp,
  Building2,
  Users,
  Settings,
  CreditCard,
  PieChart,
  BarChart3,
  Target,
  Shield,
  FileText,
  Calculator,
  Briefcase,
  Globe,
  Crown,
  Zap,
  Award,
  ChevronRight,
  Activity,
  Wallet,
  LineChart,
  MapPin,
} from "lucide-react"

interface EnvironmentSidebarProps {
  className?: string
}

export function EnvironmentSidebar({ className }: EnvironmentSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { currentPortal, portalConfig } = usePortal()
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [expandTimeout, setExpandTimeout] = React.useState<NodeJS.Timeout | null>(null)
  const [collapseTimeout, setCollapseTimeout] = React.useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (collapseTimeout) {
      clearTimeout(collapseTimeout)
      setCollapseTimeout(null)
    }

    if (!expandTimeout) {
      const timeout = setTimeout(() => {
        setIsExpanded(true)
        setExpandTimeout(null)
      }, 100)
      setExpandTimeout(timeout)
    }
  }

  const handleMouseLeave = () => {
    if (expandTimeout) {
      clearTimeout(expandTimeout)
      setExpandTimeout(null)
    }

    if (!collapseTimeout) {
      const timeout = setTimeout(() => {
        setIsExpanded(false)
        setCollapseTimeout(null)
      }, 3000) // 3 second delay
      setCollapseTimeout(timeout)
    }
  }

  React.useEffect(() => {
    return () => {
      if (expandTimeout) clearTimeout(expandTimeout)
      if (collapseTimeout) clearTimeout(collapseTimeout)
    }
  }, [expandTimeout, collapseTimeout])

  const navigationSections = {
    imperial: [
      {
        title: "Command Center",
        items: [
          { name: "Imperial Dashboard", path: "/imperial/command", icon: Crown, badge: "ADMIN" },
          { name: "System Control", path: "/imperial/system", icon: Settings, badge: "CRITICAL" },
          { name: "User Management", path: "/imperial/users", icon: Users, badge: "ACTIVE" },
          { name: "Platform Analytics", path: "/imperial/analytics", icon: BarChart3 },
        ],
      },
      {
        title: "Financial Oversight",
        items: [
          { name: "Revenue Streams", path: "/imperial/revenue", icon: DollarSign },
          { name: "Investment Tracking", path: "/imperial/investments", icon: TrendingUp },
          { name: "Risk Management", path: "/imperial/risk", icon: Shield },
          { name: "Compliance Monitor", path: "/imperial/compliance", icon: FileText },
        ],
      },
    ],
    citizen: [
      {
        title: "Financial Hub",
        items: [
          { name: "Dashboard", path: "/citizen/dashboard", icon: Home, badge: "HOME" },
          { name: "Investment Portfolio", path: "/investors/portal", icon: TrendingUp, badge: "ACTIVE" },
          { name: "Loan Center", path: "/citizen/loan-center", icon: Building2, badge: "NEW" },
          { name: "Credit Suite", path: "/credit", icon: CreditCard },
          { name: "Real Estate", path: "/real-estate", icon: MapPin },
        ],
      },
      {
        title: "Investment Tools",
        items: [
          { name: "Portfolio Tracker", path: "/dashboard/portfolio", icon: PieChart },
          { name: "Market Analysis", path: "/dashboard/analytics", icon: LineChart },
          { name: "Goal Planning", path: "/dashboard/financial-planning", icon: Target },
          { name: "Risk Assessment", path: "/dashboard/risk-analysis", icon: Shield },
        ],
      },
      {
        title: "Loan Management",
        items: [
          { name: "Active Loans", path: "/citizen/loan-center/status", icon: FileText },
          { name: "Loan Calculator", path: "/citizen/loan-center/calculator", icon: Calculator },
          { name: "Pre-Qualification", path: "/citizen/loan-center/pre-qualification", icon: Award },
          { name: "Document Center", path: "/citizen/loan-center/documents", icon: Briefcase },
        ],
      },
      {
        title: "Transaction Center",
        items: [
          { name: "All Transactions", path: "/dashboard/transactions", icon: Activity },
          { name: "Spending Analysis", path: "/dashboard/spending", icon: BarChart3 },
          { name: "Budget Tracker", path: "/dashboard/budget", icon: Wallet },
          { name: "Bill Management", path: "/dashboard/bills", icon: Calendar },
        ],
      },
    ],
    vendor: [
      {
        title: "Business Hub",
        items: [
          { name: "Vendor Dashboard", path: "/vendor/dashboard", icon: Building2, badge: "BUSINESS" },
          { name: "Partnership Portal", path: "/vendor/partnerships", icon: Users },
          { name: "Revenue Analytics", path: "/vendor/revenue", icon: TrendingUp },
          { name: "Service Management", path: "/vendor/services", icon: Settings },
        ],
      },
      {
        title: "Integration Tools",
        items: [
          { name: "API Management", path: "/vendor/api", icon: Globe },
          { name: "Data Sync", path: "/vendor/sync", icon: Activity },
          { name: "Webhook Config", path: "/vendor/webhooks", icon: Zap },
          { name: "Documentation", path: "/vendor/docs", icon: FileText },
        ],
      },
    ],
  }

  const quickActions = {
    imperial: [
      { name: "Emergency Stop", icon: Shield, action: () => console.log("Emergency stop"), color: "bg-red-500" },
      { name: "System Backup", icon: Settings, action: () => console.log("System backup"), color: "bg-blue-500" },
      { name: "User Alert", icon: Users, action: () => console.log("User alert"), color: "bg-yellow-500" },
    ],
    citizen: [
      {
        name: "Quick Transfer",
        icon: DollarSign,
        action: () => router.push("/dashboard/transfer"),
        color: "bg-green-500",
      },
      {
        name: "Add Investment",
        icon: TrendingUp,
        action: () => router.push("/investors/portal?action=invest"),
        color: "bg-blue-500",
      },
      {
        name: "Apply for Loan",
        icon: Building2,
        action: () => router.push("/citizen/loan-center"),
        color: "bg-purple-500",
      },
    ],
    vendor: [
      { name: "New Integration", icon: Globe, action: () => console.log("New integration"), color: "bg-green-500" },
      { name: "Support Ticket", icon: Users, action: () => console.log("Support ticket"), color: "bg-blue-500" },
      { name: "API Test", icon: Zap, action: () => console.log("API test"), color: "bg-orange-500" },
    ],
  }

  const currentSections = navigationSections[currentPortal] || []
  const currentQuickActions = quickActions[currentPortal] || []
  const currentPortalConfig = portalConfig[currentPortal]

  return (
    <div
      className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 ease-in-out ${
        isExpanded ? "w-80" : "w-20"
      } ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card
        className={`h-full bg-gradient-to-b ${currentPortalConfig.color} backdrop-blur-xl border-white/20 shadow-2xl rounded-none`}
      >
        <CardContent className="p-4 h-full overflow-y-auto">
          {/* Portal Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl">{currentPortalConfig.icon}</div>
              {isExpanded && (
                <div>
                  <h2 className="text-white font-bold text-lg">{currentPortalConfig.name}</h2>
                  <p className="text-white/70 text-xs">{currentPortalConfig.description}</p>
                </div>
              )}
            </div>
            {isExpanded && <Separator className="bg-white/20" />}
          </div>

          {/* Quick Actions */}
          {isExpanded && (
            <div className="mb-6">
              <h3 className="text-white/90 font-medium text-sm mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {currentQuickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={action.action}
                    className="w-full justify-start text-white hover:bg-white/10 transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full ${action.color} mr-3`} />
                    <action.icon className="w-4 h-4 mr-2" />
                    {action.name}
                  </Button>
                ))}
              </div>
              <Separator className="bg-white/20 mt-4" />
            </div>
          )}

          {/* Navigation Sections */}
          <div className="space-y-6">
            {currentSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {isExpanded && <h3 className="text-white/90 font-medium text-sm mb-3">{section.title}</h3>}
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => {
                    const isActive = pathname === item.path
                    return (
                      <Button
                        key={itemIndex}
                        variant="ghost"
                        size={isExpanded ? "default" : "sm"}
                        onClick={() => router.push(item.path)}
                        className={`w-full transition-all duration-200 ${
                          isExpanded ? "justify-start" : "justify-center"
                        } ${
                          isActive
                            ? "bg-white/20 text-white shadow-lg"
                            : "text-white/80 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <item.icon className={`w-5 h-5 ${isExpanded ? "mr-3" : ""}`} />
                        {isExpanded && (
                          <>
                            <span className="flex-1 text-left">{item.name}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                                {item.badge}
                              </Badge>
                            )}
                            {isActive && <ChevronRight className="w-4 h-4 ml-2" />}
                          </>
                        )}
                      </Button>
                    )
                  })}
                </div>
                {isExpanded && sectionIndex < currentSections.length - 1 && <Separator className="bg-white/20 mt-4" />}
              </div>
            ))}
          </div>

          {/* Portal Status */}
          {isExpanded && (
            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="text-white/70 text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="text-green-400">Online</span>
                </div>
                <div className="flex justify-between">
                  <span>Users:</span>
                  <span>2,847</span>
                </div>
                <div className="flex justify-between">
                  <span>Load:</span>
                  <span className="text-yellow-400">Medium</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
