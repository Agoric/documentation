"use client"

import { TrendingUp } from "lucide-react"

export function PredictiveAnalyticsMobileInterface() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-950 to-cyan-950 p-3 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="bg-black/30 rounded-xl border border-cyan-500/30 p-3 mb-3">
        <div className="text-lg font-semibold text-white mb-1">Market Trends Prediction</div>
        <div className="text-cyan-100/70 text-xs">AI-powered forecast for the next 12 months</div>
      </div>

      {/* Prediction Chart - Simplified for Mobile */}
      <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-xl border border-cyan-500/30 p-3 h-48 mb-3 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full p-2">
            {/* Chart Grid - Simplified */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`v-${i}`} className="h-full w-px bg-cyan-500/10" style={{ left: `${(i + 1) * 25}%` }} />
              ))}
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`h-${i}`} className="w-full h-px bg-cyan-500/10" style={{ top: `${(i + 1) * 25}%` }} />
              ))}
            </div>

            {/* Historical Data Line - Simplified */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="historical-gradient-mobile" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(8, 145, 178, 0.5)" />
                  <stop offset="100%" stopColor="rgba(8, 145, 178, 0)" />
                </linearGradient>
              </defs>
              <path
                d="M0,80 L30,70 L60,75 L90,65 L120,70 L150,55 L180,50"
                fill="none"
                stroke="rgba(8, 145, 178, 1)"
                strokeWidth="2"
                className="drop-shadow-glow"
              />
              <path
                d="M0,80 L30,70 L60,75 L90,65 L120,70 L150,55 L180,50 L180,140 L0,140 Z"
                fill="url(#historical-gradient-mobile)"
                opacity="0.5"
              />
            </svg>

            {/* Prediction Line - Simplified */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="prediction-gradient-mobile" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                </linearGradient>
              </defs>
              <path
                d="M180,50 L210,40 L240,48 L270,30 L300,38 L330,25"
                fill="none"
                stroke="rgba(59, 130, 246, 1)"
                strokeWidth="2"
                strokeDasharray="4,4"
                className="drop-shadow-glow"
              />
              <path
                d="M180,50 L210,40 L240,48 L270,30 L300,38 L330,25 L330,140 L180,140 Z"
                fill="url(#prediction-gradient-mobile)"
                opacity="0.5"
              />
            </svg>

            {/* Divider Line */}
            <div className="absolute top-0 bottom-0 w-px bg-cyan-500/50 left-[180px] border-l border-dashed border-cyan-500/50" />
            <div className="absolute top-1/2 left-[180px] -translate-x-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-cyan-500/20 text-cyan-100 text-[8px] rounded-full border border-cyan-500/30">
              Now
            </div>

            {/* Legend - Simplified */}
            <div className="absolute top-2 right-2 bg-black/30 rounded-lg p-1 border border-cyan-500/30">
              <div className="flex items-center mb-0.5">
                <div className="w-2 h-2 rounded-full bg-cyan-500 mr-1.5" />
                <div className="text-cyan-100 text-[8px]">Historical</div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-1.5" />
                <div className="text-cyan-100 text-[8px]">Predicted</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scan Line Effect */}
        <div
          className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-30"
          style={{
            background:
              "repeating-linear-gradient(to bottom, transparent, transparent 99px, rgba(8, 145, 178, 0.2) 99px, rgba(8, 145, 178, 0.2) 100px)",
            backgroundSize: "100% 100px",
            animation: "scan-bg 10s linear infinite",
          }}
        />
      </div>

      {/* Prediction Stats */}
      <div className="space-y-2">
        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-3">
          <div className="text-cyan-100/70 text-xs mb-1">Predicted Growth</div>
          <div className="text-lg font-bold text-white">+12.5%</div>
          <div className="flex items-center mt-1 text-cyan-300 text-xs">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>Over next 12 months</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-3">
          <div className="text-cyan-100/70 text-xs mb-1">Confidence Level</div>
          <div className="text-lg font-bold text-white">87%</div>
          <div className="mt-1 w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
            <div className="h-full w-[87%] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-3">
          <div className="text-cyan-100/70 text-xs mb-1">Volatility Risk</div>
          <div className="text-lg font-bold text-white">Medium</div>
          <div className="flex items-center mt-1 text-amber-400 text-xs">
            <span>Moderate market fluctuations expected</span>
          </div>
        </div>
      </div>
    </div>
  )
}
