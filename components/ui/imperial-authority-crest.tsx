"use client"

import { useState, useEffect } from "react"
import { Shield, Zap, Globe, Star, Diamond, Sword, Eye } from "lucide-react"

interface ImperialAuthorityCrestProps {
  size?: "sm" | "md" | "lg" | "xl" | "xxl"
  variant?: "full" | "compact" | "icon-only"
  className?: string
  animated?: boolean
}

export function ImperialAuthorityCrest({
  size = "md",
  variant = "full",
  className = "",
  animated = true,
}: ImperialAuthorityCrestProps) {
  const [glowIntensity, setGlowIntensity] = useState(0.8)
  const [rotateAngle, setRotateAngle] = useState(0)

  useEffect(() => {
    if (!animated) return

    const glowInterval = setInterval(() => {
      setGlowIntensity(Math.random() * 0.4 + 0.6)
    }, 2000)

    const rotateInterval = setInterval(() => {
      setRotateAngle((prev) => prev + 0.2)
    }, 100)

    return () => {
      clearInterval(glowInterval)
      clearInterval(rotateInterval)
    }
  }, [animated])

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
    xxl: "w-24 h-24",
  }

  const iconSizes = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
    xl: "h-5 w-5",
    xxl: "h-6 w-6",
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Imperial Crest */}
      <div
        className={`${sizeClasses[size]} relative flex items-center justify-center`}
        style={{
          transform: animated ? `rotate(${rotateAngle * 0.1}deg)` : undefined,
        }}
      >
        {/* Outer Shield Frame */}
        <div
          className="absolute inset-0 rounded-lg bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 p-1"
          style={{
            boxShadow: animated
              ? `
                0 0 ${20 * glowIntensity}px rgba(255, 215, 0, ${glowIntensity}),
                0 0 ${40 * glowIntensity}px rgba(255, 215, 0, ${glowIntensity * 0.7}),
                0 0 ${60 * glowIntensity}px rgba(255, 215, 0, ${glowIntensity * 0.4})
              `
              : "0 0 20px rgba(255, 215, 0, 0.6)",
          }}
        >
          {/* Inner Shield */}
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-md relative overflow-hidden">
            {/* Central Authority Symbol */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Main Shield Icon */}
                <Shield className={`${iconSizes[size]} text-yellow-400 relative z-10`} />

                {/* Power Emanation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap
                    className={`${iconSizes[size]} text-blue-400 opacity-60 absolute`}
                    style={{ transform: "scale(0.7)" }}
                  />
                </div>
              </div>
            </div>

            {/* Four Corner Authority Symbols */}
            <div className="absolute top-1 left-1">
              <Star className="h-1.5 w-1.5 text-yellow-300" />
            </div>
            <div className="absolute top-1 right-1">
              <Diamond className="h-1.5 w-1.5 text-cyan-300" />
            </div>
            <div className="absolute bottom-1 left-1">
              <Globe className="h-1.5 w-1.5 text-green-300" />
            </div>
            <div className="absolute bottom-1 right-1">
              <Eye className="h-1.5 w-1.5 text-purple-300" />
            </div>

            {/* Imperial Divider Lines */}
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-yellow-400/30 to-transparent" />
            </div>

            {/* Authority Inscription */}
            {size !== "sm" && (
              <div className="absolute bottom-0 left-0 right-0 text-center">
                <div className="text-[6px] font-bold text-yellow-300 leading-none tracking-wider">IMPERIAL</div>
              </div>
            )}

            {/* Holographic Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-60 rounded-md"
              style={{
                background: animated
                  ? "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)"
                  : undefined,
                animation: animated ? "shimmer 4s infinite" : undefined,
              }}
            />
          </div>
        </div>

        {/* Rotating Authority Ring */}
        {animated && (
          <div
            className={`absolute inset-0 ${sizeClasses[size]} rounded-lg border border-yellow-400/40`}
            style={{
              transform: "scale(1.2)",
              animation: "pulse 3s infinite",
            }}
          />
        )}

        {/* Imperial Power Indicators */}
        {size !== "sm" && (
          <>
            <div className="absolute -top-1 -left-1">
              <div className="w-3 h-3 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                <Sword className="h-1.5 w-1.5 text-white" />
              </div>
            </div>
            <div className="absolute -top-1 -right-1">
              <div className="w-3 h-3 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center">
                <Eye className="h-1.5 w-1.5 text-white" />
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(200%) rotate(45deg);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1.2);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.3);
          }
        }
      `}</style>
    </div>
  )
}

export default ImperialAuthorityCrest
