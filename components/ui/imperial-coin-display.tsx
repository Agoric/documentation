"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Crown, Shield, Star } from "lucide-react"

interface ImperialCoinDisplayProps {
  size?: "hero" | "large" | "medium" | "small"
  showDetails?: boolean
  animated?: boolean
  className?: string
}

export function ImperialCoinDisplay({
  size = "medium",
  showDetails = true,
  animated = true,
  className = "",
}: ImperialCoinDisplayProps) {
  const [glowIntensity, setGlowIntensity] = useState(1)
  const [rotateAngle, setRotateAngle] = useState(0)
  const [floatOffset, setFloatOffset] = useState(0)

  useEffect(() => {
    if (!animated) return

    const glowInterval = setInterval(() => {
      setGlowIntensity(Math.random() * 0.3 + 0.7)
    }, 1500)

    const rotateInterval = setInterval(() => {
      setRotateAngle((prev) => (prev + 0.3) % 360)
    }, 50)

    const floatInterval = setInterval(() => {
      setFloatOffset((prev) => prev + 0.02)
    }, 50)

    return () => {
      clearInterval(glowInterval)
      clearInterval(rotateInterval)
      clearInterval(floatInterval)
    }
  }, [animated])

  const sizeClasses = {
    hero: "w-32 h-32 md:w-40 md:h-40",
    large: "w-24 h-24",
    medium: "w-16 h-16",
    small: "w-12 h-12",
  }

  const containerSizeClasses = {
    hero: "w-40 h-40 md:w-48 md:h-48",
    large: "w-32 h-32",
    medium: "w-24 h-24",
    small: "w-16 h-16",
  }

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Main Imperial Coin Display */}
      <div
        className={`${containerSizeClasses[size]} relative flex items-center justify-center`}
        style={{
          transform: animated ? `translateY(${Math.sin(floatOffset) * 5}px)` : undefined,
        }}
      >
        {/* Outer ceremonial rings */}
        <div
          className={`absolute inset-0 rounded-full border-2 border-yellow-400/30`}
          style={{
            transform: `scale(1.4) rotate(${rotateAngle * 0.5}deg)`,
            background: `conic-gradient(from ${rotateAngle * 0.5}deg, transparent, rgba(255, 215, 0, 0.1), transparent)`,
          }}
        />
        <div
          className={`absolute inset-0 rounded-full border border-yellow-400/20`}
          style={{
            transform: `scale(1.6) rotate(${-rotateAngle * 0.3}deg)`,
          }}
        />

        {/* Main coin container */}
        <div
          className={`${sizeClasses[size]} relative rounded-full overflow-hidden`}
          style={{
            boxShadow: `
              0 0 ${40 * glowIntensity}px rgba(255, 215, 0, ${glowIntensity}),
              0 0 ${80 * glowIntensity}px rgba(255, 215, 0, ${glowIntensity * 0.6}),
              0 0 ${120 * glowIntensity}px rgba(255, 215, 0, ${glowIntensity * 0.3}),
              inset 0 0 30px rgba(255, 215, 0, 0.2)
            `,
            transform: `rotate(${rotateAngle * 0.1}deg)`,
          }}
        >
          {/* Jon'Lorenzo Caprelli Coin */}
          <Image
            src="/jonlorenzo-coin.png"
            alt="Jon'Lorenzo Caprelli - Supreme Authority"
            fill
            className="object-cover rounded-full"
            priority
          />

          {/* Imperial holographic overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-70 rounded-full"
            style={{
              background: `
                linear-gradient(45deg, transparent 20%, rgba(255,255,255,0.5) 50%, transparent 80%),
                radial-gradient(circle at 30% 30%, rgba(255,215,0,0.3), transparent 70%)
              `,
              animation: "imperialShimmer 5s infinite",
            }}
          />

          {/* Rotating golden aura */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from ${rotateAngle}deg, 
                transparent, 
                rgba(255, 215, 0, 0.4), 
                transparent, 
                rgba(255, 215, 0, 0.2), 
                transparent
              )`,
            }}
          />
        </div>

        {/* Imperial crown */}
        <div className="absolute -top-3 -right-3">
          <div
            className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center border-2 border-yellow-200 shadow-lg"
            style={{
              boxShadow: "0 0 15px rgba(255, 215, 0, 0.8)",
            }}
          >
            <Crown className="h-4 w-4 text-yellow-900" />
          </div>
        </div>

        {/* Authority shield */}
        <div className="absolute -bottom-2 -left-2">
          <div
            className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center border border-blue-300"
            style={{
              boxShadow: "0 0 10px rgba(59, 130, 246, 0.6)",
            }}
          >
            <Shield className="h-3 w-3 text-blue-100" />
          </div>
        </div>

        {/* Floating imperial particles */}
        <div className="absolute inset-0 overflow-visible">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${50 + Math.cos(((rotateAngle + i * 30) * Math.PI) / 180) * 60}%`,
                top: `${50 + Math.sin(((rotateAngle + i * 30) * Math.PI) / 180) * 60}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <Star
                className="w-2 h-2 text-yellow-400 opacity-70"
                style={{
                  filter: "drop-shadow(0 0 3px rgba(255, 215, 0, 0.8))",
                  animation: `twinkle ${2 + i * 0.1}s infinite ${i * 0.2}s`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Imperial Details */}
      {showDetails && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-1">
            Jon'Lorenzo Caprelli
          </h3>
          <p className="text-sm text-yellow-300/80 font-medium tracking-wide">Digital Creator of Global Economics</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-xs text-yellow-400/70 uppercase tracking-wider">Supreme Authority</span>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes imperialShimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(200%) rotate(45deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}
