"use client"

import { ChevronRight, TrendingUp } from "lucide-react"

export function HolographicVizMobileInterface() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-950 to-cyan-950 p-3 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="bg-black/30 rounded-xl border border-cyan-500/30 p-3 mb-3">
        <div className="text-lg font-semibold text-white mb-1">Investment Portfolio</div>
        <div className="text-cyan-100/70 text-xs">Holographic 3D visualization</div>
      </div>

      {/* 3D Visualization - Simplified for Mobile */}
      <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-xl border border-cyan-500/30 p-3 h-40 mb-3 relative overflow-hidden">
        {/* 3D Portfolio Visualization */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[200px] h-[150px] perspective-[800px]">
            {/* 3D Pie Chart */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
              style={{
                transform: "rotateX(60deg) rotateZ(0deg)",
                transformStyle: "preserve-3d",
                animation: "rotate-3d 20s linear infinite",
              }}
            >
              {/* Pie Segments - Simplified */}
              <div
                className="absolute w-full h-full rounded-full overflow-hidden"
                style={{
                  clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)",
                  background: "linear-gradient(135deg, rgba(6, 182, 212, 0.7), rgba(59, 130, 246, 0.7))",
                  transformStyle: "preserve-3d",
                  transform: "translateZ(5px)",
                }}
              >
                <div className="absolute inset-0 bg-white/10" />
              </div>
              <div
                className="absolute w-full h-full rounded-full overflow-hidden"
                style={{
                  clipPath: "polygon(50% 50%, 50% 100%, 0% 100%, 0% 0%, 50% 0%)",
                  background: "linear-gradient(135deg, rgba(16, 185, 129, 0.7), rgba(5, 150, 105, 0.7))",
                  transformStyle: "preserve-3d",
                  transform: "translateZ(5px)",
                }}
              >
                <div className="absolute inset-0 bg-white/10" />
              </div>
              <div
                className="absolute w-full h-full rounded-full overflow-hidden"
                style={{
                  clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
                  background: "linear-gradient(135deg, rgba(245, 158, 11, 0.7), rgba(217, 119, 6, 0.7))",
                  transformStyle: "preserve-3d",
                  transform: "translateZ(10px)",
                }}
              >
                <div className="absolute inset-0 bg-white/10" />
              </div>
              <div
                className="absolute w-full h-full rounded-full overflow-hidden"
                style={{
                  clipPath: "polygon(50% 50%, 0% 50%, 0% 0%, 50% 0%)",
                  background: "linear-gradient(135deg, rgba(239, 68, 68, 0.7), rgba(185, 28, 28, 0.7))",
                  transformStyle: "preserve-3d",
                  transform: "translateZ(8px)",
                }}
              >
                <div className="absolute inset-0 bg-white/10" />
              </div>

              {/* Center */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/30"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(12px)",
                }}
              />
            </div>

            {/* Grid Floor */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full border border-cyan-500/30"
              style={{
                transform: "rotateX(60deg) translateZ(-30px)",
                background:
                  "radial-gradient(circle, rgba(8, 145, 178, 0.1) 0%, rgba(8, 145, 178, 0.05) 50%, transparent 70%)",
                boxShadow: "0 0 20px rgba(8, 145, 178, 0.2)",
              }}
            />
          </div>
        </div>

        {/* Legend - Simplified */}
        <div className="absolute bottom-2 right-2 flex flex-wrap gap-2 justify-end">
          <div className="flex items-center bg-black/30 rounded-md px-1 py-0.5">
            <div className="w-2 h-2 rounded-full bg-cyan-500 mr-1" />
            <span className="text-cyan-100 text-[10px]">Stocks</span>
          </div>
          <div className="flex items-center bg-black/30 rounded-md px-1 py-0.5">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-1" />
            <span className="text-cyan-100 text-[10px]">Bonds</span>
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

        {/* Floating Particles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyan-400/60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
              animation: `float-particle ${5 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Legend - Additional labels */}
      <div className="flex flex-wrap gap-2 mb-3 justify-center">
        <div className="flex items-center bg-black/30 rounded-md px-2 py-1">
          <div className="w-2 h-2 rounded-full bg-amber-500 mr-1" />
          <span className="text-cyan-100 text-[10px]">Real Estate</span>
        </div>
        <div className="flex items-center bg-black/30 rounded-md px-2 py-1">
          <div className="w-2 h-2 rounded-full bg-red-500 mr-1" />
          <span className="text-cyan-100 text-[10px]">Crypto</span>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="space-y-2">
        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-3">
          <div className="text-cyan-100/70 text-xs mb-1">Total Value</div>
          <div className="text-xl font-bold text-white">$245,678.90</div>
          <div className="flex items-center mt-1 text-green-400 text-xs">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>+12.4% YTD</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-3">
          <div className="text-cyan-100/70 text-xs mb-1">Risk Level</div>
          <div className="text-xl font-bold text-white">Moderate</div>
          <div className="mt-1 w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
            <div className="h-full w-[65%] bg-gradient-to-r from-green-500 to-yellow-500 rounded-full" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-3">
          <div className="text-cyan-100/70 text-xs mb-1">Projected Growth</div>
          <div className="text-xl font-bold text-white">8.5% / year</div>
          <div className="flex items-center mt-1 text-cyan-300 text-xs">
            <span>View Projection</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </div>
        </div>
      </div>
    </div>
  )
}
