"use client"

import { useState, useEffect } from "react"
import { Crown, Shield } from "lucide-react"

interface SupremeAuthorityLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  variant?: "default" | "compact" | "icon-only"
  className?: string
}

export function SupremeAuthorityLogo({
  size = "md",
  showText = true,
  variant = "default",
  className = "",
}: SupremeAuthorityLogoProps) {
  const [glowIntensity, setGlowIntensity] = useState(0.5)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(Math.random() * 0.5 + 0.5)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className="relative">
        {/* Main logo container */}
        <div
          className={`${sizeClasses[size]} relative rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600 flex items-center justify-center overflow-hidden`}
          style={{
            boxShadow: `0 0 ${20 * glowIntensity}px rgba(251, 191, 36, ${glowIntensity}), 0 0 ${40 * glowIntensity}px rgba(251, 191, 36, ${glowIntensity * 0.5})`,
          }}
        >
          {/* Animated background gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500 opacity-80 animate-pulse"
            style={{ animationDuration: "3s" }}
          />

          {/* Crown icon */}
          <Crown
            className={`${size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : size === "lg" ? "h-6 w-6" : "h-8 w-8"} text-white relative z-10 drop-shadow-lg`}
          />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-bounce"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: "2s",
                }}
              />
            ))}
          </div>

          {/* Holographic overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-60"
            style={{
              background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
              animation: "shimmer 3s infinite",
            }}
          />
        </div>

        {/* Outer glow ring */}
        <div
          className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-2 border-amber-400/30 animate-pulse`}
          style={{
            transform: "scale(1.2)",
            animationDuration: "2s",
          }}
        />

        {/* Authority shield overlay */}
        <div className="absolute -top-1 -right-1">
          <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <Shield className="h-2 w-2 text-white" />
          </div>
        </div>
      </div>

      {/* Text */}
      {showText && variant !== "icon-only" && (
        <div className="flex flex-col">
          <span
            className={`${textSizeClasses[size]} font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 drop-shadow-sm`}
          >
            {variant === "compact" ? "Supreme" : "Supreme Authority"}
          </span>
          {variant === "default" && (
            <span className="text-xs text-amber-300/80 font-medium tracking-wider">FINANCIAL PLATFORM</span>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(200%) rotate(45deg); }
        }
      `}</style>
    </div>
  )
}
