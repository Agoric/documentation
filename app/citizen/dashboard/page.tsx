"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LoanStatusTracker } from "@/components/citizen/loan-status-tracker"
import {
  User,
  CreditCard,
  Home,
  FileText,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowRight,
  Bell,
  Settings,
  HelpCircle,
  Shield,
  Building,
  Car,
  GraduationCap,
} from "lucide-react"

interface CitizenProfile {
  name: string
  email: string
  phone: string
  memberSince: string
  creditScore: number
  totalLoans: number
  activeApplications: number
  approvedLoans: number
}

interface QuickStat {
  label: string
  value: string
  icon: React.ReactNode
  color: string
  trend?: string
}

export default function CitizenDashboardPage() {
  const [profile, setProfile] = useState<CitizenProfile>({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "(555) 123-4567",
    memberSince: "January 2024",
    creditScore: 785,
    totalLoans: 2,
    activeApplications: 1,
    approvedLoans: 1,
  })

  const [notifications, setNotifications] = useState([
    {
      id: "n1",
      title: "Credit Verification Complete",
      message: "Your home mortgage application has passed credit verification",
      type: "success",
      date: "2 hours ago",
      unread: true,
    },
    {
      id: "n2",
      title: "Document Required",
      message: "Please upload property insurance quote for your mortgage application",
      type: "warning",
      date: "1 day ago",
      unread: true,
    },
    {
      id: "n3",
      title: "Auto Loan Approved",
      message: "Congratulations! Your auto loan has been approved",
      type: "success",
      date: "3 days ago",
      unread: false,
    },
  ])

  const quickStats: QuickStat[] = [
    {
      label: "Credit Score",
      value: profile.creditScore.toString(),
      icon: <TrendingUp className="h-6 w-6" />,
      color: "text-green-400",
      trend: "+12 this month",
    },
    {
      label: "Active Loans",
      value: profile.totalLoans.toString(),
      icon: <CreditCard className="h-6 w-6" />,
      color: "text-blue-400",
    },
    {
      label: "Applications",
      value: profile.activeApplications.toString(),
      icon: <FileText className="h-6 w-6" />,
      color: "text-yellow-400",
    },
    {
      label: "Approved",
      value: profile.approvedLoans.toString(),
      icon: <CheckCircle className="h-6 w-6" />,
      color: "text-emerald-400",
    },
  ]

  const loanTypes = [
    {
      title: "Home Mortgage",
      description: "Purchase or refinance your home",
      icon: <Home className="h-8 w-8" />,
      color: "from-blue-600 to-cyan-600",
      href: "/citizen/loan-center?type=mortgage",
    },
    {
      title: "Auto Loan",
      description: "Finance your vehicle purchase",
      icon: <Car className="h-8 w-8" />,
      color: "from-green-600 to-emerald-600",
      href: "/citizen/loan-center?type=auto",
    },
    {
      title: "Personal Loan",
      description: "Flexible personal financing",
      icon: <User className="h-8 w-8" />,
      color: "from-purple-600 to-pink-600",
      href: "/citizen/loan-center?type=personal",
    },
    {
      title: "Business Loan",
      description: "Grow your business",
      icon: <Building className="h-8 w-8" />,
      color: "from-orange-600 to-red-600",
      href: "/citizen/loan-center?type=business",
    },
    {
      title: "Student Loan",
      description: "Education financing",
      icon: <GraduationCap className="h-8 w-8" />,
      color: "from-indigo-600 to-blue-600",
      href: "/citizen/loan-center?type=student",
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-400" />
      case "info":
        return <Bell className="h-4 w-4 text-blue-400" />
      default:
        return <Bell className="h-4 w-4 text-gray-400" />
    }
  }

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Welcome back, {profile.name.split(" ")[0]}!
            </h1>
            <p className="text-xl text-blue-200 mt-2">Manage your loans and financial services</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 relative bg-transparent"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                  {unreadCount}
                </Badge>
              )}
            </Button>
            <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-200">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    {stat.trend && <p className="text-xs text-green-400 mt-1">{stat.trend}</p>}
                  </div>
                  <div className={stat.color}>{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Loan Status */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-blue-200">Active Loan Applications</h2>
                <Link href="/citizen/loan-center">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    <Plus className="h-4 w-4 mr-2" />
                    New Application
                  </Button>
                </Link>
              </div>
              <LoanStatusTracker loanId="LA001" />
            </div>

            {/* Loan Types */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-200">Apply for a Loan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loanTypes.map((type, index) => (
                  <Link key={index} href={type.href}>
                    <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20 hover:border-blue-400/40 transition-all cursor-pointer group">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-lg bg-gradient-to-r ${type.color} text-white group-hover:scale-110 transition-transform`}
                          >
                            {type.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white group-hover:text-blue-200 transition-colors">
                              {type.title}
                            </h3>
                            <p className="text-sm text-blue-300">{type.description}</p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-200">Recent Activity</CardTitle>
                <CardDescription className="text-blue-300">Your latest loan and account activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-blue-800/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <div className="flex-1">
                      <p className="text-white font-medium">Credit verification completed</p>
                      <p className="text-sm text-blue-300">Home mortgage application - 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-blue-800/20 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-400" />
                    <div className="flex-1">
                      <p className="text-white font-medium">Documents uploaded</p>
                      <p className="text-sm text-blue-300">Bank statements and W2 forms - 1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-blue-800/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <div className="flex-1">
                      <p className="text-white font-medium">Auto loan approved</p>
                      <p className="text-sm text-blue-300">$35,000 at 4.25% APR - 3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-200">Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{profile.name}</p>
                    <p className="text-sm text-blue-300">Member since {profile.memberSince}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-300">Email:</span>
                    <span className="text-white text-sm">{profile.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Phone:</span>
                    <span className="text-white text-sm">{profile.phone}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
                >
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-blue-200">Notifications</CardTitle>
                  {unreadCount > 0 && <Badge className="bg-red-500 text-white">{unreadCount} new</Badge>}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg ${notification.unread ? "bg-blue-800/30" : "bg-blue-800/20"}`}
                  >
                    <div className="flex items-start gap-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{notification.title}</p>
                        <p className="text-xs text-blue-300 mt-1">{notification.message}</p>
                        <p className="text-xs text-blue-400 mt-1">{notification.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
                >
                  View All Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-200">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/citizen/loan-center">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Loan Center
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Credit Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-500/20 bg-transparent"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
