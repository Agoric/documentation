"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigationHandler } from "@/components/ui/navigation-handler"
import { CreditCard, Home, TrendingUp, ShoppingCart, FileText, PieChart, Settings, Users } from "lucide-react"

export const QuickActions = () => {
  const { handleNavigation } = useNavigationHandler()

  const quickActions = [
    {
      title: "Credit Suite",
      description: "Manage your credit profile",
      icon: <CreditCard className="w-6 h-6" />,
      path: "/credit-suite",
      color: "bg-blue-500",
    },
    {
      title: "Loan Center",
      description: "Apply for loans",
      icon: <FileText className="w-6 h-6" />,
      path: "/citizen/loan-center",
      color: "bg-green-500",
    },
    {
      title: "Real Estate",
      description: "Browse properties",
      icon: <Home className="w-6 h-6" />,
      path: "/real-estate",
      color: "bg-purple-500",
    },
    {
      title: "SNAP-DAX Trading",
      description: "Digital asset exchange",
      icon: <TrendingUp className="w-6 h-6" />,
      path: "/snap-dax/digital-asset-exchange",
      color: "bg-orange-500",
    },
    {
      title: "Marketplace",
      description: "Shop products",
      icon: <ShoppingCart className="w-6 h-6" />,
      path: "/commerce/marketplace",
      color: "bg-red-500",
    },
    {
      title: "Financial Planning",
      description: "Plan your finances",
      icon: <PieChart className="w-6 h-6" />,
      path: "/dashboard/financial-planning",
      color: "bg-teal-500",
    },
    {
      title: "Business Suite",
      description: "Business tools",
      icon: <Users className="w-6 h-6" />,
      path: "/business-suite",
      color: "bg-indigo-500",
    },
    {
      title: "Settings",
      description: "Platform settings",
      icon: <Settings className="w-6 h-6" />,
      path: "/settings",
      color: "bg-gray-500",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Access key platform features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Button
              key={action.path}
              variant="outline"
              className="h-20 flex-col gap-2 hover:shadow-lg transition-all bg-transparent"
              onClick={() => handleNavigation(action.path)}
            >
              <div className={`p-2 rounded-lg ${action.color} text-white`}>{action.icon}</div>
              <div className="text-center">
                <p className="font-medium text-sm">{action.title}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
