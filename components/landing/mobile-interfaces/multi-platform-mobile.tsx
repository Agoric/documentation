"use client"

import { Layers, TrendingUp, Zap } from "lucide-react"

export function MultiPlatformMobileInterface() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-950 to-cyan-950 p-3 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="bg-black/30 rounded-xl border border-cyan-500/30 p-3 mb-3">
        <div className="text-lg font-semibold text-white mb-1">Banking Accounts</div>
        <div className="text-cyan-100/70 text-xs">Unified view of all your financial accounts</div>
      </div>

      {/* Connection Status */}
      <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-3 mb-3 border border-cyan-500/30">
        <div className="text-cyan-100 font-medium mb-2 text-sm">Connection Status</div>
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <div className="text-green-400 text-xs">All Systems Connected</div>
        </div>
        <div className="text-cyan-100/70 text-[10px]">
          Last sync: <span className="text-cyan-300">2 minutes ago</span>
        </div>
      </div>

      {/* Connected Platforms Visualization - Simplified for Mobile */}
      <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-xl border border-cyan-500/30 p-3 h-48 mb-3 relative overflow-hidden">
        {/* Central Hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-20 h-20 rounded-full bg-gradient-radial from-cyan-500/30 to-blue-500/10 border border-cyan-500/50 flex items-center justify-center"
            style={{ boxShadow: "0 0 20px rgba(8, 145, 178, 0.3)" }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-radial from-cyan-500/20 to-blue-500/5 border border-cyan-500/30 flex items-center justify-center">
              <div className="text-cyan-300">
                <Layers className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Connected Platform Nodes - Simplified */}
          <div className="absolute top-0 left-0 w-full h-full">
            {[
              { name: "Bank", type: "bank", angle: 0, distance: 70 },
              { name: "Invest", type: "investment", angle: 72, distance: 70 },
              { name: "Credit", type: "credit", angle: 144, distance: 70 },
              { name: "Loan", type: "loan", angle: 216, distance: 70 },
              { name: "Crypto", type: "crypto", angle: 288, distance: 70 },
            ].map((platform, index) => {
              const x = Math.cos((platform.angle * Math.PI) / 180) * platform.distance
              const y = Math.sin((platform.angle * Math.PI) / 180) * platform.distance

              return (
                <div
                  key={index}
                  className="absolute w-14 h-14 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 border ${
                      platform.type === "bank"
                        ? "bg-blue-500/20 border-blue-500/50"
                        : platform.type === "investment"
                          ? "bg-green-500/20 border-green-500/50"
                          : platform.type === "credit"
                            ? "bg-purple-500/20 border-purple-500/50"
                            : platform.type === "loan"
                              ? "bg-amber-500/20 border-amber-500/50"
                              : "bg-red-500/20 border-red-500/50"
                    }`}
                    style={{
                      boxShadow:
                        platform.type === "bank"
                          ? "0 0 10px rgba(59, 130, 246, 0.3)"
                          : platform.type === "investment"
                            ? "0 0 10px rgba(16, 185, 129, 0.3)"
                            : platform.type === "credit"
                              ? "0 0 10px rgba(139, 92, 246, 0.3)"
                              : platform.type === "loan"
                                ? "0 0 10px rgba(245, 158, 11, 0.3)"
                                : "0 0 10px rgba(239, 68, 68, 0.3)",
                    }}
                  >
                    <div
                      className={`text-sm font-bold ${
                        platform.type === "bank"
                          ? "text-blue-300"
                          : platform.type === "investment"
                            ? "text-green-300"
                            : platform.type === "credit"
                              ? "text-purple-300"
                              : platform.type === "loan"
                                ? "text-amber-300"
                                : "text-red-300"
                      }`}
                    >
                      {platform.name.charAt(0)}
                    </div>
                  </div>
                  <div className="text-cyan-100 text-[8px] text-center font-medium">{platform.name}</div>
                </div>
              )
            })}
          </div>

          {/* Connection Lines - Simplified */}
          <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -1 }}>
            {[0, 72, 144, 216, 288].map((angle, index) => {
              const x1 = 0
              const y1 = 0
              const x2 = Math.cos((angle * Math.PI) / 180) * 70
              const y2 = Math.sin((angle * Math.PI) / 180) * 70

              return (
                <g key={index}>
                  <defs>
                    <linearGradient id={`line-gradient-mobile-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(8, 145, 178, 0.7)" />
                      <stop offset="100%" stopColor="rgba(59, 130, 246, 0.7)" />
                    </linearGradient>
                  </defs>
                  <line
                    x1={`calc(50% + ${x1}px)`}
                    y1={`calc(50% + ${y1}px)`}
                    x2={`calc(50% + ${x2}px)`}
                    y2={`calc(50% + ${y2}px)`}
                    stroke={`url(#line-gradient-mobile-${index})`}
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                    style={{ animation: `dash ${2 + index * 0.5}s linear infinite` }}
                  />
                </g>
              )
            })}
          </svg>
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

      {/* Account Summary */}
      <div className="space-y-2">
        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-3">
          <div className="text-cyan-100/70 text-xs mb-1">Total Balance</div>
          <div className="text-lg font-bold text-white">$342,156.78</div>
          <div className="flex items-center mt-1 text-green-400 text-xs">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>+$5,432.10 this month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-3">
          <div className="text-cyan-100/70 text-xs mb-1">Connected Accounts</div>
          <div className="text-lg font-bold text-white">12</div>
          <div className="flex justify-between items-center mt-1">
            <div className="text-xs">
              <span className="text-blue-300">4</span> Banks •<span className="text-green-300 ml-1">5</span> Investments
              •<span className="text-purple-300 ml-1">3</span> Cards
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-3">
          <div className="text-cyan-100/70 text-xs mb-1">Sync Status</div>
          <div className="text-lg font-bold text-white">Real-time</div>
          <div className="flex items-center mt-1 text-cyan-300 text-xs">
            <Zap className="h-3 w-3 mr-1" />
            <span>All accounts up to date</span>
          </div>
        </div>
      </div>
    </div>
  )
}
