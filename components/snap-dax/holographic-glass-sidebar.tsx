"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SidebarItem {
  id: string
  label: string
  icon: React.ReactNode
  badge?: {
    count: number
    color?: string
  }
}

interface SidebarSection {
  title?: string
  items: SidebarItem[]
}

interface HolographicGlassSidebarProps {
  sections: SidebarSection[]
  activeItemId: string
  onItemClick: (itemId: string) => void
  collapsible?: boolean
  initialCollapsed?: boolean
  position?: "left" | "right"
  width?: number
  logo?: React.ReactNode
  footer?: React.ReactNode
}

export function HolographicGlassSidebar({
  sections,
  activeItemId,
  onItemClick,
  collapsible = true,
  initialCollapsed = false,
  position = "left",
  width = 280,
  logo,
  footer,
}: HolographicGlassSidebarProps) {
  const [collapsed, setCollapsed] = useState(initialCollapsed)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Track mouse position for lighting effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sidebarRef.current) {
        const rect = sidebarRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Toggle sidebar collapse
  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <motion.div
      ref={sidebarRef}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-lg border border-indigo-500/20 backdrop-blur-md",
        "bg-gradient-to-b from-indigo-950/40 to-slate-950/40",
      )}
      style={{
        width: collapsed ? 80 : width,
        boxShadow: "0 4px 20px rgba(30, 20, 70, 0.2)",
        transition: "width 0.3s ease",
      }}
      initial={{ opacity: 0, x: position === "left" ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
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

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-indigo-400 opacity-70"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
              opacity: [Math.random() * 0.5 + 0.3, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Logo */}
      {logo && (
        <div className={cn("relative flex items-center p-4", collapsed ? "justify-center" : "justify-start")}>
          {logo}
        </div>
      )}

      {/* Sidebar content */}
      <div className="flex-1 overflow-y-auto p-3">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            {section.title && !collapsed && (
              <div className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-indigo-400">
                {section.title}
              </div>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onItemClick(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "relative cursor-pointer rounded-md p-3 transition-all duration-300",
                    collapsed ? "flex justify-center" : "flex items-center",
                    activeItemId === item.id ? "text-white" : "text-indigo-300 hover:text-indigo-100",
                  )}
                >
                  {/* Active item indicator */}
                  {activeItemId === item.id && (
                    <motion.div
                      layoutId="activeItemIndicator"
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
                    {hoveredItem === item.id && activeItemId !== item.id && (
                      <motion.div
                        className="absolute inset-0 rounded-md bg-indigo-500/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Item content */}
                  <div className="relative z-10 flex items-center">
                    <div className="text-current">{item.icon}</div>

                    {!collapsed && <span className="ml-3 flex-1 truncate">{item.label}</span>}

                    {!collapsed && item.badge && (
                      <div
                        className={cn(
                          "ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-medium",
                          item.badge.color || "bg-indigo-500/30 text-indigo-200",
                        )}
                      >
                        {item.badge.count}
                      </div>
                    )}
                  </div>

                  {/* Glass reflection effect */}
                  <div
                    className="absolute inset-0 rounded-md opacity-30"
                    style={{
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 80%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      {footer && (
        <div className={cn("relative border-t border-indigo-500/20 p-4", collapsed ? "flex justify-center" : "")}>
          {footer}
        </div>
      )}

      {/* Collapse toggle button */}
      {collapsible && (
        <button
          onClick={toggleCollapse}
          className="absolute right-0 top-20 flex h-8 w-8 -translate-x-1/2 transform items-center justify-center rounded-full border border-indigo-500/20 bg-indigo-950/70 text-indigo-300 backdrop-blur-md hover:text-indigo-100"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      )}

      {/* Edge glow effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          boxShadow: `inset 0 0 20px rgba(129, 140, 248, 0.5)`,
          pointerEvents: "none",
        }}
      />
    </motion.div>
  )
}
