"use client"

import * as React from "react"
import {
  TrendingUp,
  DollarSign,
  Home,
  CreditCard,
  PieChart,
  Bell,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  Eye,
  EyeOff,
  Target,
  Award,
  Shield,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface QuickAction {
  id: string
  title: string
  description: string
  icon: React.ElementType
  href: string
  color: string
  isNew?: boolean
}

interface FinancialMetric {
  id: string
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: React.ElementType
}

interface Goal {
  id: string
  title: string
  current: number
  target: number
  deadline: string
  category: string
}

interface RecentActivity {
  id: string
  type: string
  description: string
  amount?: string
  timestamp: string
  status: "completed" | "pending" | "failed"
}

const quickActions: QuickAction[] = [
  {
    id: "real-estate",
    title: "Browse Properties",
    description: "Explore real estate with 50-year loans",
    icon: Home,
    href: "/real-estate",
    color: "from-blue-500 to-cyan-500",
    isNew: true,
  },
  {
    id: "pre-approval",
    title: "Get Pre-Approved",
    description: "Instant mortgage pre-approval",
    icon: Shield,
    href: "/real-estate/pre-approval",
    color: "from-green-500 to-emerald-500",
    isNew: true,
  },
  {
    id: "trading",
    title: "SNAP-DAX Trading",
    description: "Access financial markets",
    icon: TrendingUp,
    href: "/dashboard/snap-dax",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "ecommerex",
    title: "EcommereX Shop",
    description: "Holographic marketplace",
    icon: Star,
    href: "/dashboard/ecommerex/holographic-products",
    color: "from-orange-500 to-red-500",
  },
  {
    id: "gamification",
    title: "Rewards Hub",
    description: "Earn points and achievements",
    icon: Award,
    href: "/dashboard/gamification",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "onboarding",
    title: "Financial Optimization",
    description: "Complete your financial profile",
    icon: Target,
    href: "/onboarding",
    color: "from-indigo-500 to-purple-500",
  },
]

const financialMetrics: FinancialMetric[] = [
  {
    id: "net-worth",
    title: "Net Worth",
    value: "$127,450",
    change: "+12.5%",
    changeType: "positive",
    icon: DollarSign,
  },
  {
    id: "monthly-income",
    title: "Monthly Income",
    value: "$8,500",
    change: "+5.2%",
    changeType: "positive",
    icon: TrendingUp,
  },
  {
    id: "credit-score",
    title: "Credit Score",
    value: "742",
    change: "+18 pts",
    changeType: "positive",
    icon: CreditCard,
  },
  {
    id: "savings-rate",
    title: "Savings Rate",
    value: "23%",
    change: "-2.1%",
    changeType: "negative",
    icon: PieChart,
  },
]

const goals: Goal[] = [
  {
    id: "emergency-fund",
    title: "Emergency Fund",
    current: 15000,
    target: 25000,
    deadline: "Dec 2024",
    category: "Savings",
  },
  {
    id: "house-down-payment",
    title: "House Down Payment",
    current: 45000,
    target: 80000,
    deadline: "Jun 2025",
    category: "Real Estate",
  },
  {
    id: "retirement",
    title: "Retirement Savings",
    current: 125000,
    target: 200000,
    deadline: "Dec 2025",
    category: "Investment",
  },
]

const recentActivity: RecentActivity[] = [
  {
    id: "1",
    type: "Property View",
    description: "Viewed 3-bedroom house in Austin, TX",
    timestamp: "2 hours ago",
    status: "completed",
  },
  {
    id: "2",
    type: "Pre-Approval",
    description: "Mortgage pre-approval submitted",
    amount: "$450,000",
    timestamp: "1 day ago",
    status: "pending",
  },
  {
    id: "3",
    type: "Investment",
    description: "SNAP-DAX portfolio rebalanced",
    amount: "+$1,250",
    timestamp: "2 days ago",
    status: "completed",
  },
  {
    id: "4",
    type: "Purchase",
    description: "EcommereX holographic display",
    amount: "-$299",
    timestamp: "3 days ago",
    status: "completed",
  },
]

export function DashboardHome() {
  const router = useRouter()
  const [balanceVisible, setBalanceVisible] = React.useState(true)
  const [selectedTab, setSelectedTab] = React.useState("overview")

  const handleQuickAction = (href: string) => {
    router.push(href)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Alex! 👋</h1>
            <p className="text-slate-300">Here's your financial overview and platform activity</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              <Shield className="h-3 w-3 mr-1" />
              Digital Citizen
            </Badge>
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {financialMetrics.map((metric) => (
            <Card
              key={metric.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300 mb-1">{metric.title}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold text-white">{balanceVisible ? metric.value : "••••"}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setBalanceVisible(!balanceVisible)}
                        className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                      >
                        {balanceVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      </Button>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {metric.changeType === "positive" ? (
                        <ArrowUpRight className="h-3 w-3 text-green-400" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-red-400" />
                      )}
                      <span
                        className={cn(
                          "text-xs font-medium",
                          metric.changeType === "positive" ? "text-green-400" : "text-red-400",
                        )}
                      >
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className="p-2 bg-white/10 rounded-lg">
                    <metric.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="bg-white/10 backdrop-blur-sm border-white/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white/20">
            Overview
          </TabsTrigger>
          <TabsTrigger value="goals" className="data-[state=active]:bg-white/20">
            Goals
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-white/20">
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-slate-300">Access your most-used platform features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickActions.map((action) => (
                  <Button
                    key={action.id}
                    variant="ghost"
                    className="h-auto p-4 flex flex-col items-start gap-3 bg-gradient-to-r hover:scale-105 transition-all relative overflow-hidden group"
                    style={{
                      background: `linear-gradient(135deg, ${action.color.split(" ")[1]} 0%, ${action.color.split(" ")[3]} 100%)`,
                      opacity: 0.9,
                    }}
                    onClick={() => handleQuickAction(action.href)}
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center justify-between w-full relative z-10">
                      <action.icon className="h-6 w-6 text-white" />
                      {action.isNew && (
                        <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <div className="text-left relative z-10">
                      <h3 className="font-semibold text-white mb-1">{action.title}</h3>
                      <p className="text-sm text-white/80">{action.description}</p>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 50-Year Loan Promotion */}
          <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">🚀 Revolutionary 50-Year Loans Available!</h3>
                  <p className="text-purple-200 mb-4">
                    Lower your monthly payments by up to 40% and build generational wealth
                  </p>
                  <div className="flex items-center gap-4 text-sm text-purple-200">
                    <span>✓ Rates from 3.25% APR</span>
                    <span>✓ Digital Citizen Exclusive</span>
                    <span>✓ Instant Pre-Approval</span>
                  </div>
                </div>
                <Button
                  className="bg-white text-purple-600 hover:bg-white/90"
                  onClick={() => handleQuickAction("/real-estate/pre-approval")}
                >
                  Get Pre-Approved
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5" />
                Financial Goals
              </CardTitle>
              <CardDescription className="text-slate-300">
                Track your progress towards financial milestones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {goals.map((goal) => (
                <div key={goal.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white">{goal.title}</h4>
                      <p className="text-sm text-slate-300">
                        ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()} • {goal.deadline}
                      </p>
                    </div>
                    <Badge variant="outline" className="border-white/20 text-white">
                      {goal.category}
                    </Badge>
                  </div>
                  <Progress value={(goal.current / goal.target) * 100} className="h-2 bg-white/10" />
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>{Math.round((goal.current / goal.target) * 100)}% complete</span>
                    <span>${(goal.target - goal.current).toLocaleString()} remaining</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription className="text-slate-300">
                Your latest platform interactions and transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        activity.status === "completed"
                          ? "bg-green-400"
                          : activity.status === "pending"
                            ? "bg-yellow-400"
                            : "bg-red-400",
                      )}
                    />
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.description}</p>
                      <p className="text-sm text-slate-300">{activity.timestamp}</p>
                    </div>
                    {activity.amount && (
                      <span
                        className={cn(
                          "font-semibold",
                          activity.amount.startsWith("+") ? "text-green-400" : "text-red-400",
                        )}
                      >
                        {activity.amount}
                      </span>
                    )}
                    <Badge
                      variant="outline"
                      className={cn(
                        "border-white/20",
                        activity.status === "completed"
                          ? "text-green-400 border-green-400/30"
                          : activity.status === "pending"
                            ? "text-yellow-400 border-yellow-400/30"
                            : "text-red-400 border-red-400/30",
                      )}
                    >
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
