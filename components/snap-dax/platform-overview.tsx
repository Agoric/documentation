"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  Users,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Shield,
  Zap,
  Globe,
} from "lucide-react"

export function PlatformOverview() {
  return (
    <div className="space-y-6">
      {/* Platform metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Members",
            value: "2,458",
            change: "+12%",
            icon: <Users className="h-5 w-5 text-indigo-400" />,
            description: "Active platform members",
          },
          {
            title: "Marketplace Products",
            value: "1,245",
            change: "+8%",
            icon: <ShoppingBag className="h-5 w-5 text-indigo-400" />,
            description: "Available exclusive products",
          },
          {
            title: "Tokenized Assets",
            value: "$24.5M",
            change: "+15%",
            icon: <Sparkles className="h-5 w-5 text-indigo-400" />,
            description: "Total value of tokenized assets",
          },
          {
            title: "Transaction Volume",
            value: "$1.2M",
            change: "+5%",
            icon: <TrendingUp className="h-5 w-5 text-indigo-400" />,
            description: "24-hour trading volume",
          },
        ].map((metric, index) => (
          <Card key={index} className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-indigo-200">{metric.title}</CardTitle>
                {metric.icon}
              </div>
              <CardDescription className="text-indigo-400">{metric.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{metric.value}</div>
              <div className="mt-1 flex items-center text-sm text-emerald-400">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                {metric.change} from last period
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Platform activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent activity */}
        <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-indigo-200">Recent Activity</CardTitle>
            <CardDescription className="text-indigo-400">Latest platform transactions and events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                type: "transaction",
                title: "Quantum Computing Token Purchase",
                user: "Alex Thompson",
                amount: "$2,500",
                time: "5 minutes ago",
                icon: <Sparkles className="h-4 w-4 text-indigo-400" />,
              },
              {
                type: "product",
                title: "New Product Listed: AI Neural Interface",
                user: "Quantum Labs Inc.",
                price: "$1,299",
                time: "25 minutes ago",
                icon: <ShoppingBag className="h-4 w-4 text-indigo-400" />,
              },
              {
                type: "member",
                title: "New Premium Member Joined",
                user: "Sarah Chen",
                level: "Platinum",
                time: "1 hour ago",
                icon: <Users className="h-4 w-4 text-indigo-400" />,
              },
              {
                type: "transaction",
                title: "Real Estate Token Dividend",
                user: "Michael Rodriguez",
                amount: "$350",
                time: "2 hours ago",
                icon: <Sparkles className="h-4 w-4 text-indigo-400" />,
              },
              {
                type: "product",
                title: "Product Sold Out: Holographic Display",
                user: "Future Vision Tech",
                price: "$899",
                time: "3 hours ago",
                icon: <ShoppingBag className="h-4 w-4 text-indigo-400" />,
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-md border border-indigo-500/20 bg-indigo-950/50 p-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-indigo-200">{activity.title}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-indigo-400">
                      {activity.user} • {activity.type === "transaction" && activity.amount}
                      {activity.type === "product" && activity.price}
                      {activity.type === "member" && activity.level}
                    </div>
                    <div className="flex items-center text-xs text-indigo-500">
                      <Clock className="mr-1 h-3 w-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Platform stats */}
        <div className="space-y-6">
          {/* Marketplace growth */}
          <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-indigo-200">Marketplace Growth</CardTitle>
              <CardDescription className="text-indigo-400">Product and transaction metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  label: "New Products (30d)",
                  value: 124,
                  max: 200,
                  percentage: 62,
                  color: "from-blue-500 to-indigo-500",
                },
                {
                  label: "Transaction Volume (30d)",
                  value: "$3.2M",
                  max: "$5M",
                  percentage: 64,
                  color: "from-indigo-500 to-purple-500",
                },
                {
                  label: "Member Growth (30d)",
                  value: 358,
                  max: 500,
                  percentage: 72,
                  color: "from-purple-500 to-pink-500",
                },
              ].map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-indigo-300">{stat.label}</div>
                    <div className="text-sm font-medium text-indigo-200">
                      {stat.value} <span className="text-xs text-indigo-400">/ {stat.max}</span>
                    </div>
                  </div>
                  <Progress
                    value={stat.percentage}
                    className="h-2 bg-indigo-950"
                    indicatorClassName={`bg-gradient-to-r ${stat.color}`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Platform features */}
          <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-indigo-200">Platform Features</CardTitle>
              <CardDescription className="text-indigo-400">SNAP-DAX exclusive capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    title: "Quantum Security",
                    description: "Advanced encryption",
                    icon: <Shield className="h-4 w-4 text-indigo-400" />,
                  },
                  {
                    title: "Instant Settlement",
                    description: "Zero waiting time",
                    icon: <Zap className="h-4 w-4 text-indigo-400" />,
                  },
                  {
                    title: "Global Access",
                    description: "Available worldwide",
                    icon: <Globe className="h-4 w-4 text-indigo-400" />,
                  },
                  {
                    title: "AI Analytics",
                    description: "Smart insights",
                    icon: <BarChart3 className="h-4 w-4 text-indigo-400" />,
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-md border border-indigo-500/20 bg-indigo-950/50 p-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20">
                      {feature.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-indigo-200">{feature.title}</div>
                      <div className="text-xs text-indigo-400">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Platform visualization */}
      <Card className="overflow-hidden border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-indigo-200">Platform Activity</CardTitle>
              <CardDescription className="text-indigo-400">Real-time transaction and tokenization flow</CardDescription>
            </div>
            <Badge className="bg-indigo-500/30 text-indigo-200">
              <Sparkles className="mr-1 h-3 w-3" />
              Live Data
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 rounded-md bg-indigo-950/50 p-4">
            <div className="flex h-full items-center justify-center text-indigo-400">
              Platform activity visualization would appear here
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
