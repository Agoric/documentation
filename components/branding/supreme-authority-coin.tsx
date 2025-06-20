"use client"

import { motion } from "framer-motion"
import { Crown, Shield, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface SupremeAuthorityCoinProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  variant?: "logo" | "badge" | "seal" | "emblem"
  animated?: boolean
  className?: string
}

export function SupremeAuthorityCoin({
  size = "md",
  variant = "logo",
  animated = true,
  className,
}: SupremeAuthorityCoinProps) {
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  }

  const iconSizes = {
    xs: "w-2 h-2",
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
  }

  return (
    <motion.div
      className={cn("relative flex items-center justify-center", sizeClasses[size], className)}
      animate={
        animated
          ? {
              rotateY: [0, 360],
            }
          : {}
      }
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    >
      {/* Outer Roman Ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-0.5">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 relative overflow-hidden">
          {/* Roman Laurel Pattern */}
          <div className="absolute inset-1 rounded-full border-2 border-amber-400/30">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <pattern id="laurel-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path
                    d="M10,2 Q15,10 10,18 Q5,10 10,2"
                    fill="none"
                    stroke="rgb(251, 191, 36)"
                    strokeWidth="0.5"
                    opacity="0.4"
                  />
                </pattern>
              </defs>
              <circle cx="50" cy="50" r="45" fill="url(#laurel-pattern)" />
            </svg>
          </div>

          {/* Inner Holographic Core */}
          <motion.div
            className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-amber-400/20 backdrop-blur-sm"
            animate={
              animated
                ? {
                    background: [
                      "radial-gradient(circle, rgba(34, 211, 238, 0.2), rgba(147, 51, 234, 0.2), rgba(251, 191, 36, 0.2))",
                      "radial-gradient(circle, rgba(251, 191, 36, 0.2), rgba(34, 211, 238, 0.2), rgba(147, 51, 234, 0.2))",
                      "radial-gradient(circle, rgba(147, 51, 234, 0.2), rgba(251, 191, 36, 0.2), rgba(34, 211, 238, 0.2))",
                    ],
                  }
                : {}
            }
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {/* Central Authority Symbol */}
            <div className="absolute inset-0 flex items-center justify-center">
              {variant === "logo" && (
                <div className="relative">
                  <Crown className={cn("text-amber-400", iconSizes[size])} />
                  <motion.div
                    className="absolute -inset-1 bg-amber-400/20 rounded-full blur-sm"
                    animate={
                      animated
                        ? {
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              )}

              {variant === "badge" && <Shield className={cn("text-amber-400 fill-amber-400/20", iconSizes[size])} />}

              {variant === "seal" && (
                <div className="relative">
                  <Zap className={cn("text-amber-400", iconSizes[size])} />
                  <div className="absolute inset-0 border border-amber-400/40 rounded-full" />
                </div>
              )}

              {variant === "emblem" && (
                <div className="flex items-center justify-center">
                  <div className={cn("text-amber-400 font-bold", size === "xs" ? "text-xs" : "text-sm")}>SA</div>
                </div>
              )}
            </div>

            {/* Roman Numerals */}
            {size !== "xs" && (
              <div className="absolute inset-0">
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-amber-400/60 text-xs font-serif">
                  XII
                </div>
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-amber-400/60 text-xs font-serif">
                  VI
                </div>
                <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-amber-400/60 text-xs font-serif">
                  IX
                </div>
                <div className="absolute right-1 top-1/2 transform -translate-y-1/2 text-amber-400/60 text-xs font-serif">
                  III
                </div>
              </div>
            )}
          </motion.div>

          {/* Holographic Shimmer */}
