"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface HolographicInvestmentImageProps {
  investmentClass: "QGI" | "QBF" | "QEF" | "QCF" | "QRF" | "QCM" | "QIF" | "QSF"
  size?: "sm" | "md" | "lg" | "xl"
  animated?: boolean
  className?: string
}

const investmentClassColors = {
  QGI: {
    primary: "#00D4FF", // Cyan - Global Index
    secondary: "#0099CC",
    accent: "#66E5FF",
    glow: "rgba(0, 212, 255, 0.6)",
    name: "Global Index",
    symbol: "🌍",
    pattern: "globe",
  },
  QBF: {
    primary: "#4ADE80", // Green - Bond Fund
    secondary: "#22C55E",
    accent: "#86EFAC",
    glow: "rgba(74, 222, 128, 0.6)",
    name: "Bond Fund",
    symbol: "🏛️",
    pattern: "bonds",
  },
  QEF: {
    primary: "#F59E0B", // Amber - Equity Fund
    secondary: "#D97706",
    accent: "#FCD34D",
    glow: "rgba(245, 158, 11, 0.6)",
    name: "Equity Fund",
    symbol: "📈",
    pattern: "stocks",
  },
  QCF: {
    primary: "#8B5CF6", // Purple - Crypto Fund
    secondary: "#7C3AED",
    accent: "#C4B5FD",
    glow: "rgba(139, 92, 246, 0.6)",
    name: "Crypto Fund",
    symbol: "₿",
    pattern: "crypto",
  },
  QRF: {
    primary: "#EF4444", // Red - Real Estate Fund
    secondary: "#DC2626",
    accent: "#FCA5A5",
    glow: "rgba(239, 68, 68, 0.6)",
    name: "Real Estate Fund",
    symbol: "🏢",
    pattern: "buildings",
  },
  QCM: {
    primary: "#F97316", // Orange - Commodity Market
    secondary: "#EA580C",
    accent: "#FDBA74",
    glow: "rgba(249, 115, 22, 0.6)",
    name: "Commodity Market",
    symbol: "⚡",
    pattern: "commodities",
  },
  QIF: {
    primary: "#06B6D4", // Teal - Innovation Fund
    secondary: "#0891B2",
    accent: "#67E8F9",
    glow: "rgba(6, 182, 212, 0.6)",
    name: "Innovation Fund",
    symbol: "🚀",
    pattern: "innovation",
  },
  QSF: {
    primary: "#10B981", // Emerald - Sustainable Fund
    secondary: "#059669",
    accent: "#6EE7B7",
    glow: "rgba(16, 185, 129, 0.6)",
    name: "Sustainable Fund",
    symbol: "🌱",
    pattern: "sustainable",
  },
}

const sizeConfig = {
  sm: { width: 200, height: 200, fontSize: "text-sm" },
  md: { width: 300, height: 300, fontSize: "text-base" },
  lg: { width: 400, height: 400, fontSize: "text-lg" },
  xl: { width: 500, height: 500, fontSize: "text-xl" },
}

export function HolographicInvestmentImage({
  investmentClass,
  size = "md",
  animated = true,
  className = "",
}: HolographicInvestmentImageProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [animationPhase, setAnimationPhase] = useState(0)

  const colors = investmentClassColors[investmentClass]
  const config = sizeConfig[size]

  useEffect(() => {
    if (!animated) return

    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 360)
    }, 50)

    return () => clearInterval(interval)
  }, [animated])

  const generatePattern = (patternType: string) => {
    switch (patternType) {
      case "globe":
        return (
          <g>
            {/* Globe grid lines */}
            <circle cx="150" cy="150" r="80" fill="none" stroke={colors.primary} strokeWidth="2" opacity="0.6" />
            <circle cx="150" cy="150" r="60" fill="none" stroke={colors.primary} strokeWidth="1.5" opacity="0.4" />
            <circle cx="150" cy="150" r="40" fill="none" stroke={colors.primary} strokeWidth="1" opacity="0.3" />
            {/* Meridian lines */}
            <path d="M 150 70 Q 150 150 150 230" stroke={colors.primary} strokeWidth="1.5" fill="none" opacity="0.5" />
            <path d="M 150 70 Q 120 150 150 230" stroke={colors.primary} strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M 150 70 Q 180 150 150 230" stroke={colors.primary} strokeWidth="1" fill="none" opacity="0.4" />
            {/* Latitude lines */}
            <ellipse
              cx="150"
              cy="150"
              rx="80"
              ry="20"
              fill="none"
              stroke={colors.primary}
              strokeWidth="1"
              opacity="0.4"
            />
            <ellipse
              cx="150"
              cy="150"
              rx="80"
              ry="40"
              fill="none"
              stroke={colors.primary}
              strokeWidth="1"
              opacity="0.3"
            />
          </g>
        )
      case "bonds":
        return (
          <g>
            {/* Classical columns */}
            <rect x="120" y="80" width="12" height="140" fill={colors.primary} opacity="0.6" />
            <rect x="144" y="80" width="12" height="140" fill={colors.primary} opacity="0.6" />
            <rect x="168" y="80" width="12" height="140" fill={colors.primary} opacity="0.6" />
            {/* Column capitals */}
            <rect x="115" y="75" width="22" height="8" fill={colors.accent} opacity="0.8" />
            <rect x="139" y="75" width="22" height="8" fill={colors.accent} opacity="0.8" />
            <rect x="163" y="75" width="22" height="8" fill={colors.accent} opacity="0.8" />
            {/* Base */}
            <rect x="110" y="220" width="80" height="10" fill={colors.secondary} opacity="0.7" />
          </g>
        )
      case "stocks":
        return (
          <g>
            {/* Stock chart lines */}
            <path
              d="M 70 200 L 100 180 L 130 160 L 160 140 L 190 120 L 220 100"
              stroke={colors.primary}
              strokeWidth="3"
              fill="none"
              opacity="0.8"
            />
            <path
              d="M 70 210 L 100 190 L 130 170 L 160 150 L 190 130 L 220 110"
              stroke={colors.accent}
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
            {/* Data points */}
            <circle cx="100" cy="180" r="4" fill={colors.primary} />
            <circle cx="130" cy="160" r="4" fill={colors.primary} />
            <circle cx="160" cy="140" r="4" fill={colors.primary} />
            <circle cx="190" cy="120" r="4" fill={colors.primary} />
            <circle cx="220" cy="100" r="4" fill={colors.primary} />
          </g>
        )
      case "crypto":
        return (
          <g>
            {/* Blockchain blocks */}
            <rect x="80" y="120" width="30" height="30" fill={colors.primary} opacity="0.6" rx="4" />
            <rect x="120" y="120" width="30" height="30" fill={colors.primary} opacity="0.6" rx="4" />
            <rect x="160" y="120" width="30" height="30" fill={colors.primary} opacity="0.6" rx="4" />
            <rect x="200" y="120" width="30" height="30" fill={colors.primary} opacity="0.6" rx="4" />
            {/* Connection lines */}
            <line x1="110" y1="135" x2="120" y2="135" stroke={colors.accent} strokeWidth="2" />
            <line x1="150" y1="135" x2="160" y2="135" stroke={colors.accent} strokeWidth="2" />
            <line x1="190" y1="135" x2="200" y2="135" stroke={colors.accent} strokeWidth="2" />
            {/* Hash symbols */}
            <text x="95" y="140" fill={colors.accent} fontSize="12" textAnchor="middle">
              #
            </text>
            <text x="135" y="140" fill={colors.accent} fontSize="12" textAnchor="middle">
              #
            </text>
            <text x="175" y="140" fill={colors.accent} fontSize="12" textAnchor="middle">
              #
            </text>
            <text x="215" y="140" fill={colors.accent} fontSize="12" textAnchor="middle">
              #
            </text>
          </g>
        )
      case "buildings":
        return (
          <g>
            {/* Building silhouettes */}
            <rect x="90" y="140" width="25" height="80" fill={colors.primary} opacity="0.7" />
            <rect x="125" y="120" width="30" height="100" fill={colors.primary} opacity="0.8" />
            <rect x="165" y="130" width="25" height="90" fill={colors.primary} opacity="0.7" />
            <rect x="200" y="110" width="20" height="110" fill={colors.primary} opacity="0.6" />
            {/* Windows */}
            <rect x="95" y="150" width="4" height="6" fill={colors.accent} opacity="0.9" />
            <rect x="105" y="150" width="4" height="6" fill={colors.accent} opacity="0.9" />
            <rect x="130" y="130" width="4" height="6" fill={colors.accent} opacity="0.9" />
            <rect x="140" y="130" width="4" height="6" fill={colors.accent} opacity="0.9" />
            <rect x="150" y="130" width="4" height="6" fill={colors.accent} opacity="0.9" />
          </g>
        )
      case "commodities":
        return (
          <g>
            {/* Commodity symbols */}
            <circle cx="120" cy="120" r="15" fill={colors.primary} opacity="0.6" />
            <circle cx="160" cy="120" r="15" fill={colors.secondary} opacity="0.6" />
            <circle cx="200" cy="120" r="15" fill={colors.accent} opacity="0.6" />
            {/* Bars/ingots */}
            <rect x="110" y="160" width="20" height="40" fill={colors.primary} opacity="0.7" rx="2" />
            <rect x="140" y="160" width="20" height="40" fill={colors.secondary} opacity="0.7" rx="2" />
            <rect x="170" y="160" width="20" height="40" fill={colors.accent} opacity="0.7" rx="2" />
            {/* Energy waves */}
            <path
              d="M 80 180 Q 100 170 120 180 Q 140 190 160 180 Q 180 170 200 180"
              stroke={colors.primary}
              strokeWidth="2"
              fill="none"
              opacity="0.5"
            />
          </g>
        )
      case "innovation":
        return (
          <g>
            {/* Rocket/innovation symbols */}
            <polygon points="150,80 140,120 160,120" fill={colors.primary} opacity="0.8" />
            <circle cx="150" cy="130" r="8" fill={colors.accent} opacity="0.9" />
            <path d="M 140 140 Q 150 150 160 140" stroke={colors.primary} strokeWidth="2" fill="none" />
            {/* Tech circuit patterns */}
            <rect x="120" y="160" width="60" height="2" fill={colors.secondary} opacity="0.6" />
            <rect x="130" y="170" width="40" height="2" fill={colors.secondary} opacity="0.6" />
            <rect x="140" y="180" width="20" height="2" fill={colors.secondary} opacity="0.6" />
            {/* Connection nodes */}
            <circle cx="120" cy="161" r="3" fill={colors.accent} />
            <circle cx="180" cy="161" r="3" fill={colors.accent} />
            <circle cx="150" cy="181" r="3" fill={colors.accent} />
          </g>
        )
      case "sustainable":
        return (
          <g>
            {/* Leaf/plant patterns */}
            <path
              d="M 130 120 Q 140 100 150 120 Q 160 140 150 160 Q 140 140 130 120"
              fill={colors.primary}
              opacity="0.7"
            />
            <path
              d="M 160 130 Q 170 110 180 130 Q 190 150 180 170 Q 170 150 160 130"
              fill={colors.secondary}
              opacity="0.6"
            />
            {/* Stem */}
            <line x1="150" y1="160" x2="150" y2="200" stroke={colors.primary} strokeWidth="3" />
            {/* Roots/growth */}
            <path d="M 150 200 Q 140 210 130 200" stroke={colors.secondary} strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M 150 200 Q 160 210 170 200" stroke={colors.secondary} strokeWidth="2" fill="none" opacity="0.6" />
            {/* Sun rays */}
            <circle cx="200" cy="90" r="15" fill={colors.accent} opacity="0.4" />
            <line x1="185" y1="75" x2="190" y2="80" stroke={colors.accent} strokeWidth="2" opacity="0.6" />
            <line x1="210" y1="75" x2="205" y2="80" stroke={colors.accent} strokeWidth="2" opacity="0.6" />
          </g>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: config.width, height: config.height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Main holographic container */}
      <motion.div
        className="absolute inset-0 rounded-lg overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}10, ${colors.accent}20)`,
          border: `2px solid ${colors.primary}60`,
          boxShadow: `0 0 30px ${colors.glow}, inset 0 0 30px ${colors.glow}`,
        }}
        animate={
          animated
            ? {
                boxShadow: [
                  `0 0 30px ${colors.glow}, inset 0 0 30px ${colors.glow}`,
                  `0 0 50px ${colors.glow}, inset 0 0 50px ${colors.glow}`,
                  `0 0 30px ${colors.glow}, inset 0 0 30px ${colors.glow}`,
                ],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        {/* Laser scanning lines */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${colors.primary}40 50%, transparent 100%)`,
            width: "20%",
          }}
          animate={
            animated
              ? {
                  x: ["-20%", "120%"],
                }
              : {}
          }
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Holographic grid overlay */}
        <svg width="100%" height="100%" className="absolute inset-0" style={{ opacity: 0.3 }}>
          <defs>
            <pattern id={`grid-${investmentClass}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke={colors.primary} strokeWidth="0.5" />
            </pattern>
            <linearGradient id={`glow-${investmentClass}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.primary} stopOpacity="0.8" />
              <stop offset="50%" stopColor={colors.accent} stopOpacity="0.6" />
              <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${investmentClass})`} />
        </svg>

        {/* Investment class pattern */}
        <svg width="100%" height="100%" className="absolute inset-0" viewBox="0 0 300 300">
          <defs>
            <filter id={`hologram-${investmentClass}`}>
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter={`url(#hologram-${investmentClass})`}>{generatePattern(colors.pattern)}</g>
        </svg>

        {/* Central symbol */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={
            animated
              ? {
                  rotate: [0, 360],
                }
              : {}
          }
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div
            className={`text-6xl ${config.fontSize} font-bold`}
            style={{
              color: colors.primary,
              textShadow: `0 0 20px ${colors.glow}, 0 0 40px ${colors.glow}`,
              filter: "drop-shadow(0 0 10px currentColor)",
            }}
          >
            {colors.symbol}
          </div>
        </motion.div>

        {/* Investment class label */}
        <motion.div
          className="absolute bottom-4 left-4 right-4"
          animate={
            animated
              ? {
                  opacity: [0.7, 1, 0.7],
                }
              : {}
          }
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div
            className={`text-center ${config.fontSize} font-bold tracking-wider`}
            style={{
              color: colors.accent,
              textShadow: `0 0 10px ${colors.glow}`,
            }}
          >
            {investmentClass}
          </div>
          <div className="text-center text-xs font-medium mt-1 opacity-80" style={{ color: colors.primary }}>
            {colors.name}
          </div>
        </motion.div>

        {/* Corner laser effects */}
        <div className="absolute top-0 left-0 w-8 h-8">
          <div
            className="w-full h-0.5"
            style={{ backgroundColor: colors.primary, boxShadow: `0 0 10px ${colors.glow}` }}
          />
          <div
            className="w-0.5 h-full"
            style={{ backgroundColor: colors.primary, boxShadow: `0 0 10px ${colors.glow}` }}
          />
        </div>
        <div className="absolute top-0 right-0 w-8 h-8">
          <div
            className="w-full h-0.5"
            style={{ backgroundColor: colors.primary, boxShadow: `0 0 10px ${colors.glow}` }}
          />
          <div
            className="w-0.5 h-full ml-auto"
            style={{ backgroundColor: colors.primary, boxShadow: `0 0 10px ${colors.glow}` }}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-8 h-8">
          <div
            className="w-0.5 h-full"
            style={{ backgroundColor: colors.primary, boxShadow: `0 0 10px ${colors.glow}` }}
          />
          <div
            className="w-full h-0.5 mt-auto"
            style={{ backgroundColor: colors.primary, boxShadow: `0 0 10px ${colors.glow}` }}
          />
        </div>
        <div className="absolute bottom-0 right-0 w-8 h-8">
          <div
            className="w-0.5 h-full ml-auto"
            style={{ backgroundColor: colors.primary, boxShadow: `0 0 10px ${colors.glow}` }}
          />
          <div
            className="w-full h-0.5 mt-auto"
            style={{ backgroundColor: colors.primary, boxShadow: `0 0 10px ${colors.glow}` }}
          />
        </div>

        {/* Holographic shimmer effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(45deg, transparent 30%, ${colors.accent}20 50%, transparent 70%)`,
          }}
          animate={
            animated
              ? {
                  x: ["-100%", "100%"],
                  opacity: [0, 0.6, 0],
                }
              : {}
          }
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Hover enhancement */}
      {isHovered && (
        <motion.div
          className="absolute -inset-2 rounded-lg"
          style={{
            border: `3px solid ${colors.primary}`,
            boxShadow: `0 0 60px ${colors.glow}`,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  )
}
