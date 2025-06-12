"use client"

import { Shield } from "lucide-react"

export function QuantumSecureMobileInterface() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-950 to-cyan-950 p-3 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="bg-black/30 rounded-xl border border-cyan-500/30 p-3 mb-3">
        <div className="text-lg font-semibold text-white mb-1">Quantum-Secure Encryption</div>
        <div className="text-cyan-100/70 text-xs">Advanced protection against quantum computing threats</div>
      </div>

      {/* Security Status */}
      <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-3 mb-3 border border-cyan-500/30">
        <div className="text-cyan-100 font-medium mb-2 text-sm">Security Status</div>
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <div className="text-green-400 text-xs">Protected</div>
        </div>
        <div className="text-cyan-100/70 text-[10px]">Your data is secured with quantum-resistant encryption</div>
      </div>

      {/* Encryption Visualization - Simplified for Mobile */}
      <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-xl border border-cyan-500/30 p-3 h-48 mb-3 relative overflow-hidden">
        {/* Central Data Sphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-24 h-24 rounded-full bg-gradient-radial from-cyan-500/30 to-blue-500/10 border border-cyan-500/50 flex items-center justify-center"
            style={{ boxShadow: "0 0 20px rgba(8, 145, 178, 0.3)" }}
          >
            <div className="w-20 h-20 rounded-full bg-gradient-radial from-cyan-500/20 to-blue-500/5 border border-cyan-500/30 flex items-center justify-center animate-pulse-slow">
              <div className="w-12 h-12 rounded-full bg-gradient-radial from-cyan-500/10 to-blue-500/0 border border-cyan-500/20 flex items-center justify-center">
                <Shield className="h-5 w-5 text-cyan-300" />
              </div>
            </div>
          </div>

          {/* Orbiting Encryption Keys - Simplified */}
          <div
            className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/20"
            style={{ animation: "rotate-orbit 15s linear infinite" }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-cyan-500/30 border border-cyan-500/50 flex items-center justify-center"
              style={{ boxShadow: "0 0 10px rgba(8, 145, 178, 0.5)" }}
            >
              <div className="text-cyan-100 text-[10px] font-mono">256</div>
            </div>
          </div>

          <div
            className="absolute top-1/2 left-1/2 w-52 h-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/20"
            style={{ animation: "rotate-orbit 25s linear infinite reverse" }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-blue-500/30 border border-blue-500/50 flex items-center justify-center"
              style={{ boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)" }}
            >
              <div className="text-blue-100 text-[10px] font-mono">512</div>
            </div>
          </div>
        </div>

        {/* Encryption Beams - Simplified */}
        <div className="absolute inset-0">
          {Array.from({ length: 4 }).map((_, i) => {
            const angle = (i * 90 * Math.PI) / 180
            const length = 80 + Math.random() * 20
            const startX = "50%"
            const startY = "50%"
            const endX = `calc(50% + ${Math.cos(angle) * length}px)`
            const endY = `calc(50% + ${Math.sin(angle) * length}px)`

            return (
              <div
                key={i}
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  opacity: 0.6,
                  animation: `pulse-beam ${2 + Math.random() * 3}s infinite ease-in-out ${Math.random() * 2}s`,
                }}
              >
                <svg width="100%" height="100%" className="absolute top-0 left-0">
                  <defs>
                    <linearGradient id={`beam-gradient-mobile-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(8, 145, 178, 0.7)" />
                      <stop offset="100%" stopColor="rgba(59, 130, 246, 0.7)" />
                    </linearGradient>
                  </defs>
                  <line
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke={`url(#beam-gradient-mobile-${i})`}
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    style={{ animation: "dash 1s linear infinite" }}
                  />
                </svg>
              </div>
            )
          })}
        </div>

        {/* Binary Data Particles - Simplified */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-[8px] font-mono"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              color: Math.random() > 0.5 ? "rgba(8, 145, 178, 0.7)" : "rgba(59, 130, 246, 0.7)",
              opacity: Math.random() * 0.7 + 0.3,
              animation: `float-binary ${3 + Math.random() * 7}s infinite ease-in-out ${Math.random() * 5}s`,
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </div>
        ))}

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

      {/* Security Stats */}
      <div className="space-y-2">
        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-3">
          <div className="text-cyan-100/70 text-xs mb-1">Encryption Level</div>
          <div className="text-lg font-bold text-white">Post-Quantum</div>
          <div className="flex items-center mt-1 text-cyan-300 text-xs">
            <Shield className="h-3 w-3 mr-1" />
            <span>Lattice-based cryptography</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-3">
          <div className="text-cyan-100/70 text-xs mb-1">Security Score</div>
          <div className="text-lg font-bold text-white">98/100</div>
          <div className="mt-1 w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
            <div className="h-full w-[98%] bg-gradient-to-r from-cyan-500 to-green-500 rounded-full" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-3">
          <div className="text-cyan-100/70 text-xs mb-1">Last Security Scan</div>
          <div className="text-lg font-bold text-white">2 mins ago</div>
          <div className="flex items-center mt-1 text-green-400 text-xs">
            <span>No threats detected</span>
          </div>
        </div>
      </div>
    </div>
  )
}
