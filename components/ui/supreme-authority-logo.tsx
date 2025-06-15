"use client"

import { useState, useEffect } from "react"
import { Crown } from "lucide-react"
import Image from "next/image"

interface SupremeAuthorityLogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "xxl"
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
  const [glowIntensity, setGlowIntensity] = useState(0.8)
  const [rotateAngle, setRotateAngle] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    const glowInterval = setInterval(() => {
      setGlowIntensity(Math.random() * 0.4 + 0.6)
    }, 2000)

    const rotateInterval = setInterval(() => {
      setRotateAngle((prev) => prev + 0.5)
    }, 100)

    return () => {
      clearInterval(glowInterval)
      clearInterval(rotateInterval)
    }
  }, [])

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
    xxl: "w-24 h-24",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
    xxl: "text-4xl",
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Jon'Lorenzo Caprelli Coin */}
      <div className="relative">
        {/* Main coin container */}
        <div
          className={`${sizeClasses[size]} relative rounded-full overflow-hidden cursor-pointer transition-transform duration-700 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            transformStyle: "preserve-3d",
            boxShadow: `
              0 0 ${30 * glowIntensity}px rgba(255, 215, 0, ${glowIntensity}),
              0 0 ${60 * glowIntensity}px rgba(255, 215, 0, ${glowIntensity * 0.7}),
              0 0 ${90 * glowIntensity}px rgba(255, 215, 0, ${glowIntensity * 0.4}),
              inset 0 0 20px rgba(255, 215, 0, 0.3)
            `,
            transform: `rotate(${rotateAngle * 0.1}deg) ${isFlipped ? "rotateY(180deg)" : ""}`,
          }}
        >
          {/* Front Side */}
          <div className={`absolute inset-0 backface-hidden ${isFlipped ? "opacity-0" : "opacity-100"}`}>
            <Image
              src="/jonlorenzo-coin.png"
              alt="Jon'Lorenzo Caprelli - Digital Creator of Global Economics"
              fill
              className="object-cover rounded-full"
              priority
            />

            {/* Existing holographic overlay and effects */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-60 rounded-full"
              style={{
                background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
                animation: "shimmer 4s infinite",
              }}
            />
          </div>

          {/* Back Side - Decentralized Banking Democratized Wealth */}
          <div className={`absolute inset-0 backface-hidden rotate-y-180 ${isFlipped ? "opacity-100" : "opacity-0"}`}>
            <div className="w-full h-full bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-700 rounded-full flex items-center justify-center relative overflow-hidden">
              {/* Central Imperial Crown */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
                <Crown className="h-4 w-4 text-yellow-900" />
              </div>

              {/* Main Tagline - Curved Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[8px] font-bold text-yellow-900 leading-tight tracking-wide">
                    <div className="mb-1">DECENTRALIZED</div>
                    <div className="mb-1">BANKING</div>
                    <div className="mb-1">DEMOCRATIZED</div>
                    <div>WEALTH</div>
                  </div>
                </div>
              </div>

              {/* Banking Network Symbols - Four Corners */}
              <div className="absolute top-2 left-2">
                <div className="w-2 h-2 border border-yellow-900 rounded-full"></div>
              </div>
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 border border-yellow-900 rounded-full"></div>
              </div>
              <div className="absolute bottom-2 left-2">
                <div className="w-2 h-2 border border-yellow-900 rounded-full"></div>
              </div>
              <div className="absolute bottom-2 right-2">
                <div className="w-2 h-2 border border-yellow-900 rounded-full"></div>
              </div>

              {/* Connecting Lines - Network Effect */}
              <svg className="absolute inset-0 w-full h-full">
                <line x1="20%" y1="20%" x2="80%" y2="20%" stroke="rgba(133, 77, 14, 0.6)" strokeWidth="0.5"/>
                <line x1="20%" y1="80%" x2="80%" y2="80%" stroke="rgba(133, 77, 14, 0.6)" strokeWidth="0.5"/>
                <line x1="20%" y1="20%" x2="20%" y2="80%" stroke="rgba(133, 77, 14, 0.6)" strokeWidth="0.5"/>
                <line x1="80%" y1="20%" x2="80%" y2="80%" stroke="rgba(133, 77, 14, 0.6)" strokeWidth="0.5"/>
              </svg>

              {/* Imperial iBank&Trust - Bottom Arc */}
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                <div className="text-[6px] font-semibold text-yellow-900 text-center">
                  Imperial iBank&Trust
                </div>
              </div>

              {/* Holographic overlay for back side */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-40 rounded-full"
                style={{
                  background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
                  animation: "shimmer 4s infinite reverse",
                }}
              />
            </div>
          </div>

        {/* Outer imperial glow rings */}
        <div
          className={`absolute inset-0 ${sizeClasses[size]} rounded-full border border-yellow-400/40`}
          style={{
            transform: "scale(1.15)",
            animation: "pulse 3s infinite",
          }}
        />
        <div
          className={`absolute inset-0 ${sizeClasses[size]} rounded-full border border-yellow-400/20`}
          style={{
            transform: "scale(1.3)",
            animation: "pulse 3s infinite 0.5s",
          }}
        />

        {/* Authority crown overlay */}
        <div className="absolute -top-2 -right-2">
          <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center border-2 border-yellow-300">
            <Crown className="h-3 w-3 text-yellow-900" />
          </div>
        </div>

        {/* Digital circuit particles */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-70"
              style={{
                left: `${20 + i * 10}%`,
                top: `${20 + i * 8}%`,
                animation: `float ${2 + i * 0.3}s infinite ${i * 0.2}s`,
                boxShadow: "0 0 4px rgba(34, 211, 238, 0.8)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Text */}
      {showText && variant !== "icon-only" && (
        <div className="flex flex-col">
          <span
            className={`${textSizeClasses[size]} font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 drop-shadow-lg`}
            style={{
              textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
            }}
          >
            {variant === "compact" ? "Supreme Authority" : "Jon'Lorenzo Caprelli"}
          </span>

          <span className="text-xs text-yellow-300/90 font-medium tracking-wider uppercase mb-1">
            The Imperial Realm of Sovereign States United
          </span>
          
          <span className="text-[10px] text-cyan-300/80 font-medium tracking-wide italic">
            "Decentralized Banking Democratized Wealth"
          </span>
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(200%) rotate(45deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1.15); }
          50% { opacity: 0.8; transform: scale(1.25); }
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )\
}
