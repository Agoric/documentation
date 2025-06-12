"use client"

import { Brain, Zap } from "lucide-react"

export function AiInsightsMobileInterface() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-950 to-cyan-950 p-3 flex flex-col overflow-y-auto">
      {/* Welcome Header */}
      <div className="bg-black/30 rounded-xl border border-cyan-500/30 p-3 mb-3">
        <div className="text-xl font-semibold text-white mb-1">Welcome back, Alex</div>
        <div className="text-cyan-100/70 text-sm">Here are your personalized financial insights</div>
      </div>

      {/* AI Assistant */}
      <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-3 mb-3 border border-cyan-500/30">
        <div className="flex items-center mb-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center mr-2">
            <Brain className="h-3 w-3 text-cyan-300" />
          </div>
          <div className="text-cyan-300 text-sm font-medium">AI Assistant</div>
        </div>
        <div className="relative">
          <input
            type="text"
            className="w-full bg-black/30 border border-cyan-500/30 rounded-lg px-3 py-2 text-cyan-100 placeholder-cyan-100/50 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
            placeholder="Ask about your finances..."
          />
          <div className="absolute right-2 top-2 text-cyan-300 animate-pulse">
            <Zap className="h-3 w-3" />
          </div>
        </div>
      </div>

      {/* Insights Cards */}
      <div className="space-y-3 flex-1 overflow-y-auto">
        {/* Spending Analysis */}
        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-radial from-cyan-400/20 to-transparent" />

          <div className="flex items-start justify-between mb-2">
            <div className="text-cyan-100 text-sm font-medium">Spending Analysis</div>
            <div className="bg-cyan-500/20 text-cyan-300 text-[10px] px-2 py-0.5 rounded-full">AI Insight</div>
          </div>

          <div className="text-cyan-100/90 text-xs mb-2">
            You've spent 15% less on dining this month compared to last month.
          </div>

          <div className="flex justify-between items-center">
            <div className="text-cyan-100/70 text-[10px]">2 hours ago</div>
            <div className="text-cyan-300 text-[10px]">View Details</div>
          </div>

          {/* Animated highlight */}
          <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 w-full" />
        </div>

        {/* Investment Opportunity */}
        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl border border-cyan-500/30 p-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-radial from-purple-400/20 to-transparent" />

          <div className="flex items-start justify-between mb-2">
            <div className="text-cyan-100 text-sm font-medium">Investment Opportunity</div>
            <div className="bg-purple-500/20 text-purple-300 text-[10px] px-2 py-0.5 rounded-full">AI Insight</div>
          </div>

          <div className="text-cyan-100/90 text-xs mb-2">
            Consider increasing your retirement contribution by 3% to meet your goals.
          </div>

          <div className="flex justify-between items-center">
            <div className="text-cyan-100/70 text-[10px]">1 day ago</div>
            <div className="text-purple-300 text-[10px]">Take Action</div>
          </div>

          {/* Animated highlight */}
          <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-500 w-full" />
        </div>

        {/* Savings Goal */}
        <div className="bg-gradient-to-br from-blue-900/30 to-green-900/30 rounded-xl border border-cyan-500/30 p-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-radial from-green-400/20 to-transparent" />

          <div className="flex items-start justify-between mb-2">
            <div className="text-cyan-100 text-sm font-medium">Savings Goal</div>
            <div className="bg-green-500/20 text-green-300 text-[10px] px-2 py-0.5 rounded-full">AI Insight</div>
          </div>

          <div className="text-cyan-100/90 text-xs mb-2">
            You're on track to reach your vacation savings goal 2 months early!
          </div>

          <div className="flex justify-between items-center">
            <div className="text-cyan-100/70 text-[10px]">5 hours ago</div>
            <div className="text-green-300 text-[10px]">View Goal</div>
          </div>

          {/* Animated highlight */}
          <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 w-full" />
        </div>

        {/* Bill Reminder */}
        <div className="bg-gradient-to-br from-blue-900/30 to-amber-900/30 rounded-xl border border-cyan-500/30 p-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-radial from-amber-400/20 to-transparent" />

          <div className="flex items-start justify-between mb-2">
            <div className="text-cyan-100 text-sm font-medium">Bill Reminder</div>
            <div className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-full">AI Insight</div>
          </div>

          <div className="text-cyan-100/90 text-xs mb-2">
            Your electricity bill is due in 3 days. It's $15 higher than usual.
          </div>

          <div className="flex justify-between items-center">
            <div className="text-cyan-100/70 text-[10px]">Today</div>
            <div className="text-amber-300 text-[10px]">Pay Now</div>
          </div>

          {/* Animated highlight */}
          <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-blue-500 w-full" />
        </div>
      </div>

      {/* Scan Line Effect */}
      <div
        className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-20"
        style={{
          background:
            "repeating-linear-gradient(to bottom, transparent, transparent 99px, rgba(8, 145, 178, 0.2) 99px, rgba(8, 145, 178, 0.2) 100px)",
          backgroundSize: "100% 100px",
          animation: "scan-bg 10s linear infinite",
        }}
      />
    </div>
  )
}
