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
  const glassOpacity = glassEffect === "subtle" ? "0.1" : glassEffect === "medium" ? "0.15" : "0.2"
  const glassBorderOpacity = glassEffect === "subtle" ? "0.2" : glassEffect === "medium" ? "0.3" : "0.4"
  const glassBlur = glassEffect === "subtle" ? "8px" : glassEffect === "medium" ? "12px" : "16px"

  return (
    <div
      ref={tabsRef}
      className={cn(
        "relative overflow-hidden rounded-lg border border-indigo-500/20 backdrop-blur-md",
        variant === "horizontal" ? "flex" : "flex flex-col",
        "bg-gradient-to-br from-indigo-950/40 to-slate-950/40",
      )}
      style={{
        boxShadow: "0 4px 20px rgba(30, 20, 70, 0.2)",
      }}
    >
      {/* Dynamic lighting effect */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(129, 140, 248, 0.4), transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Holographic grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(123, 97, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 97, 255, 0.3) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          pointerEvents: "none",
        }}
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
              className={cn(
                "absolute inset-0 rounded-md bg-gradient-to-r from-indigo-600/80 to-purple-600/80",
                "before:absolute before:inset-0 before:opacity-20 before:blur-xl before:content-['']",
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Hover effect */}
          <AnimatePresence>
            {hoveredTab === tab.id && activeTab !== tab.id && (
              <motion.div
                className="absolute inset-0 rounded-md bg-indigo-500/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>

          {/* Tab content */}
          <div className="relative z-10 flex items-center gap-2">
            {tab.icon && <div className="text-current">{tab.icon}</div>}
            <span className="font-medium">{tab.label}</span>
          </div>

          {/* Glass reflection effect */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(135deg, rgba(255, 255, 255, ${glassOpacity}) 0%, transparent 80%)`,
              pointerEvents: "none",
            }}
          />
        </div>
      ))}

      {/* Edge glow effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          boxShadow: `inset 0 0 20px rgba(129, 140, 248, 0.5)`,
          pointerEvents: "none",
        }}
      />
    </div>
  )
}
