"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Crown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ImperialCardProps {
  children: React.ReactNode
  title?: string
  icon?: React.ReactNode
  className?: string
  variant?: "gold" | "bronze" | "silver" | "humanitarian"
}

export function ImperialCard({ children, title, icon, className = "", variant = "gold" }: ImperialCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "gold":
        return {
          background: "linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)",
          border: "1px solid rgba(212, 175, 55, 0.3)",
          glow: "0 0 20px rgba(212, 175, 55, 0.2)",
        }
      case "bronze":
        return {
          background: "linear-gradient(135deg, rgba(205, 127, 50, 0.1) 0%, rgba(184, 115, 51, 0.05) 100%)",
          border: "1px solid rgba(205, 127, 50, 0.3)",
          glow: "0 0 20px rgba(205, 127, 50, 0.2)",
        }
      case "silver":
        return {
          background: "linear-gradient(135deg, rgba(192, 192, 192, 0.1) 0%, rgba(169, 169, 169, 0.05) 100%)",
          border: "1px solid rgba(192, 192, 192, 0.3)",
          glow: "0 0 20px rgba(192, 192, 192, 0.2)",
        }
      case "humanitarian":
        return {
          background: "linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)",
          border: "1px solid rgba(5, 150, 105, 0.3)",
          glow: "0 0 20px rgba(5, 150, 105, 0.2)",
        }
      default:
        return {
          background: "linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)",
          border: "1px solid rgba(212, 175, 55, 0.3)",
          glow: "0 0 20px rgba(212, 175, 55, 0.2)",
        }
    }
  }

  const styles = getVariantStyles()

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        boxShadow: styles.glow,
      }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`relative overflow-hidden backdrop-blur-sm ${className}`}
        style={{
          background: styles.background,
          border: styles.border,
        }}
      >
        {/* Imperial Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(212, 175, 55, 0.3) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(212, 175, 55, 0.3) 25%, transparent 25%)
            `,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Holographic Shine */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />

        {title && (
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2 text-yellow-100">
              {icon || <Crown className="w-5 h-5 text-yellow-400" />}
              {title}
            </CardTitle>
          </CardHeader>
        )}

        <CardContent className="relative z-10">{children}</CardContent>

        {/* Imperial Corner Decorations */}
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-yellow-400/30" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-yellow-400/30" />
      </Card>
    </motion.div>
  )
}
