"use client"
import { CardContent, CardHeader } from "@/components/ui/card"
import { HolographicGlassCard } from "../snap-dax/holographic-glass-card"
import { HolographicBadge } from "../snap-dax/holographic-badge"
import { TrendingUp, DollarSign, Users, Globe, Zap, ArrowUpRight } from "lucide-react"

const revenueData = [
  { month: "Jan", revenue: 42000, expenses: 28000, profit: 14000 },
  { month: "Feb", revenue: 45000, expenses: 29000, profit: 16000 },
  { month: "Mar", revenue: 48000, expenses: 30000, profit: 18000 },
  { month: "Apr", revenue: 51000, expenses: 31000, profit: 20000 },
  { month: "May", revenue: 54000, expenses: 32000, profit: 22000 },
  { month: "Jun", revenue: 58000, expenses: 33000, profit: 25000 },
]

export function BusinessCenterDashboard() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
            Business Center
          </h1>
          <p className="text-amber-200">Manage your business finances and operations</p>
        </div>
        <HolographicBadge variant="premium" glow={true}>
          <Zap className="mr-1 h-3 w-3" />
          QUANTUM BUSINESS INTELLIGENCE
        </HolographicBadge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <HolographicGlassCard className="bg-gradient-to-br from-amber-950/30 to-yellow-950/30 border-amber-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-full bg-amber-950/80 border border-amber-500/30">
                <DollarSign className="h-6 w-6 text-amber-400" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-green-400" />
            </div>
            <div className="space-y-1">
              <p className="text-amber-300">Monthly Revenue</p>
              <h3 className="text-2xl font-bold text-amber-100">$58,000</h3>
              <p className="text-sm text-green-400">+6.9% from last month</p>
            </div>
          </CardContent>
        </HolographicGlassCard>
        
        <HolographicGlassCard className="bg-gradient-to-br from-amber-950/30 to-yellow-950/30 border-amber-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-full bg-amber-950/80 border border-amber-500/30">
                <TrendingUp className="h-6 w-6 text-amber-400" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-green-400" />
            </div>
            <div className="space-y-1">
              <p className="text-amber-300">Monthly Profit</p>
              <h3 className="text-2xl font-bold text-amber-100">$25,000</h3>
              <p className="text-sm text-green-400">+13.6% from last month</p>
            </div>
          </CardContent>
        </HolographicGlassCard>
        
        <HolographicGlassCard className="bg-gradient-to-br from-amber-950/30 to-yellow-950/30 border-amber-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-full bg-amber-950/80 border border-amber-500/30">
                <Users className="h-6 w-6 text-amber-400" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-green-400" />
            </div>
            <div className="space-y-1">
              <p className="text-amber-300">Active Customers</p>
              <h3 className="text-2xl font-bold text-amber-100">1,248</h3>
              <p className="text-sm text-green-400">+24 new this month</p>
            </div>
          </CardContent>
        </HolographicGlassCard>
        
        <HolographicGlassCard className="bg-gradient-to-br from-amber-950/30 to-yellow-950/30 border-amber-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-full bg-amber-950/80 border border-amber-500/30">
                <Globe className="h-6 w-6 text-amber-400" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-green-400" />
            </div>
            <div className="space-y-1">
              <p className="text-amber-300">Global Reach</p>
              <h3 className="text-2xl font-bold text-amber-100">27 Countries</h3>
              <p className="text-sm text-green-400">+3 new markets</p>
            </div>
          </CardContent>
        </HolographicGlassCard>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HolographicGlassCard className="md:col-span-2 bg-gradient-to-br from-amber-950/30 to-yellow-950/30 border-amber-500/30">
          <CardHeader>
            <Car\
