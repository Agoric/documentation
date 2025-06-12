"use client"

import { Shield, TrendingUp, Zap } from "lucide-react"

export function RealtimeProcessingMobileInterface() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-950 to-cyan-950 p-3 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="bg-black/30 rounded-xl border border-cyan-500/30 p-3 mb-3">
        <div className="text-lg font-semibold text-white mb-1">Real-Time Transactions</div>
        <div className="text-cyan-100/70 text-xs">Live processing and monitoring</div>
      </div>

      {/* System Status */}
      <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-3 mb-3 border border-cyan-500/30">
        <div className="flex items-center justify-between mb-2">
          <div className="text-cyan-100 font-medium text-sm">System Status</div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-1" />
            <div className="text-green-400 text-xs">Online</div>
          </div>
        </div>
        <div className="text-cyan-100/70 text-[10px]">
          Processing latency: <span className="text-cyan-300">12ms</span>
        </div>
      </div>

      {/* Real-time Transaction Feed - Simplified for Mobile */}
      <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-xl border border-cyan-500/30 p-3 flex-1 mb-3 relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col p-2">
          {/* Transaction List - Simplified */}
          <div className="flex-1 overflow-hidden relative">
            <div className="absolute inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent">
              {[
                {
                  id: "tx-1",
                  type: "payment",
                  amount: "-$42.50",
                  merchant: "Whole Foods Market",
                  time: "Just now",
                  status: "completed",
                  category: "Groceries",
                },
                {
                  id: "tx-2",
                  type: "deposit",
                  amount: "+$1,250.00",
                  merchant: "Payroll Deposit",
                  time: "2 mins ago",
                  status: "completed",
                  category: "Income",
                },
                {
                  id: "tx-3",
                  type: "payment",
                  amount: "-$9.99",
                  merchant: "Netflix Subscription",
                  time: "15 mins ago",
                  status: "completed",
                  category: "Entertainment",
                },
                {
                  id: "tx-4",
                  type: "transfer",
                  amount: "-$500.00",
                  merchant: "Transfer to Savings",
                  time: "1 hour ago",
                  status: "completed",
                  category: "Transfer",
                },
                {
                  id: "tx-5",
                  type: "payment",
                  amount: "-$35.40",
                  merchant: "Amazon.com",
                  time: "3 hours ago",
                  status: "processing",
                  category: "Shopping",
                },
              ].map((tx, index) => (
                <div
                  key={tx.id}
                  className={`mb-2 p-2 rounded-lg border ${
                    index === 0
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/50 animate-pulse-slow"
                      : "bg-black/20 border-cyan-500/20"
                  } transition-colors group relative overflow-hidden`}
                >
                  {/* Transaction content - Simplified */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center mr-2 ${
                          tx.type === "payment"
                            ? "bg-red-500/20"
                            : tx.type === "deposit"
                              ? "bg-green-500/20"
                              : tx.type === "transfer"
                                ? "bg-blue-500/20"
                                : "bg-amber-500/20"
                        }`}
                      >
                        <div
                          className={`text-sm ${
                            tx.type === "payment"
                              ? "text-red-400"
                              : tx.type === "deposit"
                                ? "text-green-400"
                                : tx.type === "transfer"
                                  ? "text-blue-400"
                                  : "text-amber-400"
                          }`}
                        >
                          {tx.type === "payment"
                            ? "-"
                            : tx.type === "deposit"
                              ? "+"
                              : tx.type === "transfer"
                                ? "→"
                                : "↓"}
                        </div>
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-white text-xs font-medium truncate max-w-[100px] md:max-w-none">
                          {tx.merchant}
                        </div>
                        <div className="text-cyan-100/60 text-[10px] flex items-center">
                          <span className="mr-1 truncate">{tx.category}</span>
                          <span
                            className={`px-1 py-0.5 rounded text-[8px] ${
                              tx.status === "completed"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-amber-500/20 text-amber-400"
                            }`}
                          >
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-xs font-medium ${tx.amount.startsWith("+") ? "text-green-400" : "text-white"}`}
                      >
                        {tx.amount}
                      </div>
                      <div className="text-cyan-100/60 text-[8px]">{tx.time}</div>
                    </div>
                  </div>

                  {/* Processing animation for new transactions */}
                  {index === 0 && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div
                        className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-cyan-400/10 to-transparent"
                        style={{ animation: "scan-right 2s ease-in-out infinite" }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
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

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-black/30 rounded-lg border border-cyan-500/30 p-2 flex flex-col items-center justify-center">
          <Zap className="h-4 w-4 text-cyan-400 mb-1" />
          <div className="text-cyan-100/70 text-[8px] mb-0.5">Processing</div>
          <div className="text-white text-xs font-medium">12ms</div>
        </div>
        <div className="bg-black/30 rounded-lg border border-cyan-500/30 p-2 flex flex-col items-center justify-center">
          <TrendingUp className="h-4 w-4 text-green-400 mb-1" />
          <div className="text-cyan-100/70 text-[8px] mb-0.5">Today</div>
          <div className="text-white text-xs font-medium">142 txns</div>
        </div>
        <div className="bg-black/30 rounded-lg border border-cyan-500/30 p-2 flex flex-col items-center justify-center">
          <Shield className="h-4 w-4 text-blue-400 mb-1" />
          <div className="text-cyan-100/70 text-[8px] mb-0.5">Security</div>
          <div className="text-white text-xs font-medium">100%</div>
        </div>
      </div>
    </div>
  )
}
