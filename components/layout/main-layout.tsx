"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdaptiveHolographicSidebar } from "@/components/ecommerex/adaptive-holographic-sidebar"
import { AdaptiveRegalToolbar } from "@/components/navigation/adaptive-regal-toolbar"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface FilterState {
  search: string
  category: string
  priceRange: string
  minRating: number
  holographicOnly: boolean
  has360ViewOnly: boolean
  inStockOnly: boolean
}

interface MainLayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
  showToolbar?: boolean
  sidebarFilters?: FilterState
  onFilterChange?: (key: keyof FilterState, value: any) => void
  onClearFilters?: () => void
  productCount?: number
}

export function MainLayout({
  children,
  showSidebar = true,
  showToolbar = true,
  sidebarFilters,
  onFilterChange,
  onClearFilters,
  productCount = 0,
}: MainLayoutProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Default filter state
  const defaultFilters: FilterState = {
    search: "",
    category: "all",
    priceRange: "all",
    minRating: 0,
    holographicOnly: false,
    has360ViewOnly: false,
    inStockOnly: false,
  }

  const filters = sidebarFilters || defaultFilters

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Default filter handlers
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    if (onFilterChange) {
      onFilterChange(key, value)
    }
  }

  const handleClearFilters = () => {
    if (onClearFilters) {
      onClearFilters()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Toolbar */}
      <AnimatePresence>
        {showToolbar && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50"
          >
            <AdaptiveRegalToolbar />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {showSidebar && !isMobile && (
            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed left-0 top-0 z-40"
              style={{
                top: showToolbar ? "80px" : "0px",
                height: showToolbar ? "calc(100vh - 80px)" : "100vh",
              }}
            >
              <AdaptiveHolographicSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                productCount={productCount}
                onExpandChange={setSidebarExpanded}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {showSidebar && isMobile && sidebarExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setSidebarExpanded(false)}
            >
              <motion.div
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <AdaptiveHolographicSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  productCount={productCount}
                  onExpandChange={setSidebarExpanded}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <motion.main
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out",
            showSidebar && !isMobile ? (sidebarExpanded ? "ml-80" : "ml-20") : "ml-0",
            showToolbar ? "pt-20" : "pt-0",
          )}
          animate={{
            marginLeft: showSidebar && !isMobile ? (sidebarExpanded ? 320 : 80) : 0,
            paddingTop: showToolbar ? 80 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="min-h-screen">{children}</div>
        </motion.main>
      </div>

      {/* Mobile Navigation Button */}
      {showSidebar && isMobile && (
        <motion.button
          className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-purple-600 to-amber-600 text-white p-4 rounded-full shadow-2xl"
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div animate={{ rotate: sidebarExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            ☰
          </motion.div>
        </motion.button>
      )}
    </div>
  )
}
