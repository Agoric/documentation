"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  Brain,
  ChevronRight,
  Cpu,
  FileText,
  Globe,
  Grid3X3,
  Home,
  Package,
  Settings,
  ShoppingCart,
  Sparkles,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface PlatformInfo {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  active: boolean
}

export function HolographicSidebar() {
  const [expanded, setExpanded] = useState(true)
  const [activePlatform, setActivePlatform] = useState("amazon")

  const platforms: PlatformInfo[] = [
    {
      id: "amazon",
      name: "Amazon",
      icon: <ShoppingCart className="h-5 w-5" />,
      color: "from-blue-600 to-teal-500",
      active: true,
    },
    {
      id: "ebay",
      name: "eBay",
      icon: <Globe className="h-5 w-5" />,
      color: "from-indigo-600 to-purple-500",
      active: true,
    },
    {
      id: "shopify",
      name: "Shopify",
      icon: <ShoppingCart className="h-5 w-5" />,
      color: "from-emerald-600 to-green-500",
      active: true,
    },
    {
      id: "etsy",
      name: "Etsy",
      icon: <Users className="h-5 w-5" />,
      color: "from-amber-600 to-orange-500",
      active: false,
    },
    {
      id: "walmart",
      name: "Walmart",
      icon: <ShoppingCart className="h-5 w-5" />,
      color: "from-blue-600 to-sky-500",
      active: true,
    },
    {
      id: "website",
      name: "Your Website",
      icon: <Globe className="h-5 w-5" />,
      color: "from-violet-600 to-fuchsia-500",
      active: true,
    },
  ]

  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: <Home className="h-5 w-5" /> },
    { id: "catalog", name: "Product Catalog", icon: <Grid3X3 className="h-5 w-5" /> },
    { id: "inventory", name: "Inventory", icon: <Package className="h-5 w-5" /> },
    { id: "analytics", name: "Analytics", icon: <BarChart3 className="h-5 w-5" /> },
    { id: "tax", name: "Tax Preparation", icon: <FileText className="h-5 w-5" /> },
    { id: "settings", name: "Settings", icon: <Settings className="h-5 w-5" /> },
  ]

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col overflow-hidden transition-all duration-300",
        expanded ? "w-64" : "w-20",
      )}
    >
      {/* Holographic background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950 to-indigo-950">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(123, 97, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 97, 255, 0.2) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Glow effects */}
        <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* Sidebar header */}
      <div className="flex items-center justify-between border-b border-indigo-500/20 p-4">
        <div className="flex items-center gap-3">
          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{
              border: "1px solid rgba(139, 92, 246, 0.3)",
              boxShadow: "0 0 10px rgba(139, 92, 246, 0.3)",
            }}
          >
            <Cpu className="h-5 w-5 text-indigo-300" />
          </motion.div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-lg font-bold text-transparent">
                  Platform Hub
                </h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="rounded-full p-1 text-indigo-300 transition-colors hover:bg-indigo-500/10 hover:text-indigo-200"
        >
          <ChevronRight className={`h-5 w-5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Platforms section */}
      <div className="border-b border-indigo-500/20 p-4">
        <div className="mb-2 flex items-center justify-between">
          <AnimatePresence>
            {expanded && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-xs font-medium uppercase tracking-wider text-indigo-300/70"
              >
                Platforms
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex h-5 items-center rounded-full bg-indigo-500/10 px-2 text-xs font-medium text-indigo-300"
              >
                <Sparkles className="mr-1 h-3 w-3" />
                Quantum
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-1">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setActivePlatform(platform.id)}
              className={cn(
                "group relative flex w-full items-center gap-3 rounded-lg p-2 transition-all",
                activePlatform === platform.id
                  ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/10 text-white"
                  : "text-indigo-300 hover:bg-indigo-500/10 hover:text-indigo-200",
              )}
            >
              {/* Platform indicator */}
              <div
                className={cn(
                  "absolute left-0 top-0 h-full w-1 rounded-l-lg opacity-0 transition-opacity",
                  activePlatform === platform.id && "opacity-100",
                  `bg-gradient-to-b ${platform.color}`,
                )}
              />

              {/* Platform icon */}
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full transition-all",
                  activePlatform === platform.id
                    ? `bg-gradient-to-br ${platform.color} bg-opacity-20`
                    : "bg-indigo-500/10",
                )}
                style={
                  activePlatform === platform.id
                    ? {
                        boxShadow: "0 0 10px rgba(139, 92, 246, 0.3)",
                      }
                    : {}
                }
              >
                {platform.icon}
              </div>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-1 items-center justify-between"
                  >
                    <span className="text-sm font-medium">{platform.name}</span>
                    <div className={cn("h-2 w-2 rounded-full", platform.active ? "bg-emerald-400" : "bg-gray-400")} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </div>

      {/* Menu items */}
      <div className="flex-1 p-4">
        <AnimatePresence>
          {expanded && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="mb-2 text-xs font-medium uppercase tracking-wider text-indigo-300/70"
            >
              Management
            </motion.p>
          )}
        </AnimatePresence>

        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="group flex w-full items-center gap-3 rounded-lg p-2 text-indigo-300 transition-all hover:bg-indigo-500/10 hover:text-indigo-200"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/10 transition-all group-hover:bg-indigo-500/20">
                {item.icon}
              </div>

              <AnimatePresence>
                {expanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-medium"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </div>

      {/* Quantum processor status */}
      <div className="border-t border-indigo-500/20 p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-indigo-500/10">
              <motion.div
                className="absolute inset-0 rounded-full border border-indigo-500/30"
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-indigo-500/30"
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
              />
              <Brain className="absolute inset-0 m-auto h-4 w-4 text-indigo-300" />
            </div>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col"
              >
                <span className="text-xs font-medium text-indigo-300">Quantum Processor</span>
                <span className="text-xs text-indigo-300/70">Active • 157x Boost</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
