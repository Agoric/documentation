import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, DollarSign, TrendingUp } from "lucide-react"
import FeatureToggleWidget from "@/components/admin/feature-toggle-widget"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+180.1% from last month",
    icon: Users,
    trend: "up",
  },
  {
    title: "Conversion Rate",
    value: "12.5%",
    change: "+19% from last month",
    icon: TrendingUp,
    trend: "up",
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "+7% from last month",
    icon: BarChart3,
    trend: "up",
  },
]

export default function DashboardHomePage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="content-card">
        <h1 className="section-header">Welcome back!</h1>
        <p className="section-subheader">Here's what's happening with your platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="content-card border-0 shadow-landing hover:shadow-landing-lg transition-all duration-200 hover:scale-105"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-brand-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-brand-600 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feature Toggles */}
      <div className="content-card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Feature Toggles</h2>
        <FeatureToggleWidget />
      </div>

      {/* Recent Activity */}
      <div className="content-card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-brand-50/50 rounded-lg">
              <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New user registered</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
