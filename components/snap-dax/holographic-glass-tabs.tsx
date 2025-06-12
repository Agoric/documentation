"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface HolographicGlassTabsProps {
  tabs: {
    id: string
    label: string
    icon?: React.ReactNode
  }[]
  activeTab: string
  onChange: (tabId: string) => void
  variant?: "horizontal" | "vertical"
  glassEffect?: "subtle" | "medium" | "intense"
}

export function HolographicGlassTabs({
  tabs,
  activeTab,
  onChange,
  variant = "horizontal",
  glassEffect = "medium",
}: HolographicGlassTabsProps) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const tabsRef = useRef<HTMLDivElement>(null)

  // Track mouse position for lighting effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (tabsRef.current) {
        const rect = tabsRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Determine glass effect intensity
  const getVariantStyles = () => {
    switch (glassEffect) {
      case "subtle":
        return {
          background:
            "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.15), rgba(16, 185, 129, 0.15))",
          border: "rgba(52, 211, 153, 0.3)",
          glow: "rgba(52, 211, 153, 0.4)",
        }
      case "medium":
        return {
          background:
            "linear-gradient(135deg, rgba(79, 70, 229, 0.15), rgba(139, 92, 246, 0.15), rgba(79, 70, 229, 0.15))",
          border: "rgba(129, 140, 248, 0.3)",
          glow: "rgba(129, 140, 248, 0.4)",
        }
      case "intense":
        return {
          background:
            "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.15), rgba(245, 158, 11, 0.15))",
          border: "rgba(251, 191, 36, 0.3)",
          glow: "rgba(251, 191, 36, 0.4)",
        }
    }
  }

  const variantStyles = getVariantStyles()

  return (
    <div
      ref={tabsRef}
      className={cn(
        "relative overflow-hidden backdrop-blur-md transition-all duration-500",
        variant === "horizontal" ? "flex" : "flex flex-col",
      )}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${variantStyles.glow}, transparent 70%), ${variantStyles.background}`,
        borderImage: `linear-gradient(135deg, ${variantStyles.border}, transparent, ${variantStyles.border}) 1`,
        borderWidth: "1px",
        borderStyle: "solid",
        clipPath: "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))",
        boxShadow: `0 0 20px ${variantStyles.glow}, inset 0 0 20px ${variantStyles.glow}`,
      }}
    >
      {/* Diamond pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(45deg, ${variantStyles.border} 1px, transparent 1px),
            linear-gradient(-45deg, ${variantStyles.border} 1px, transparent 1px)
          `,
          backgroundSize: "15px 15px",
        }}
      />

      {/* Laser etching effect */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            linear-gradient(0deg, transparent 49%, ${variantStyles.glow} 50%, transparent 51%),
            linear-gradient(90deg, transparent 49%, ${variantStyles.glow} 50%, transparent 51%)
          `,
          backgroundSize: "100% 2px, 2px 100%",
        }}
      />

      {/* Holographic shimmer */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            `linear-gradient(0deg, transparent 30%, ${variantStyles.glow} 50%, transparent 70%)`,
            `linear-gradient(180deg, transparent 30%, ${variantStyles.glow} 50%, transparent 70%)`,
            `linear-gradient(360deg, transparent 30%, ${variantStyles.glow} 50%, transparent 70%)`,
          ],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Tabs */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => onChange(tab.id)}
          onMouseEnter={() => setHoveredTab(tab.id)}
          onMouseLeave={() => setHoveredTab(null)}
          className={cn(
            "relative cursor-pointer p-3 transition-all duration-300",
            variant === "horizontal" ? "flex-1" : "w-full",
            "flex items-center justify-center gap-2",
            activeTab === tab.id ? "text-white" : "text-indigo-300 hover:text-indigo-100",
          )}
        >
          {/* Active tab indicator */}
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTabIndicator"
              className="absolute inset-0 rounded-md"
              style={{
                background: `linear-gradient(135deg, ${variantStyles.glow}, transparent, ${variantStyles.glow})`,
                boxShadow: `0 0 15px ${variantStyles.glow}, inset 0 0 15px ${variantStyles.glow}`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Hover effect */}
          <AnimatePresence>
            {hoveredTab === tab.id && activeTab !== tab.id && (
              <motion.div
                className="absolute inset-0 rounded-md"
                style={{
                  background: `linear-gradient(135deg, ${variantStyles.border}, transparent)`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>

          {/* Tab content */}
          <div className="relative z-10 flex items-center gap-2">
            {tab.icon && (
              <div
                className="text-current"
                style={{
                  filter: activeTab === tab.id ? `drop-shadow(0 0 5px ${variantStyles.glow})` : "none",
                }}
              >
                {tab.icon}
              </div>
            )}
            <span
              className="font-medium"
              style={{
                textShadow: activeTab === tab.id ? `0 0 10px ${variantStyles.glow}` : "none",
              }}
            >
              {tab.label}
            </span>
          </div>
        </div>
      ))}

      {/* Corner accents */}
      <div
        className="absolute top-0 left-0 w-4 h-4"
        style={{
          background: `linear-gradient(135deg, ${variantStyles.glow}, transparent)`,
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
        }}
      />
      <div
        className="absolute top-0 right-0 w-4 h-4"
        style={{
          background: `linear-gradient(225deg, ${variantStyles.glow}, transparent)`,
          clipPath: "polygon(100% 0, 100% 100%, 0 0)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-4 h-4"
        style={{
          background: `linear-gradient(45deg, ${variantStyles.glow}, transparent)`,
          clipPath: "polygon(0 100%, 100% 100%, 0 0)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-4 h-4"
        style={{
          background: `linear-gradient(315deg, ${variantStyles.glow}, transparent)`,
          clipPath: "polygon(100% 100%, 0 100%, 100% 0)",
        }}
      />
    </div>
  )
}
