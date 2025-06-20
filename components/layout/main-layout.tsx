"use client"

import type * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AdaptiveHolographicSidebar } from "@/components/ecommerex/adaptive-holographic-sidebar"
import { ComprehensiveEnvironmentToolbar } from "@/components/navigation/comprehensive-environment-toolbar"
import { useSpatialLayout } from "@/hooks/use-spatial-layout"
import { cn } from "@/lib/utils"

interface MainLayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
  showToolbar?: boolean
  className?: string
}

export function MainLayout({ children, showSidebar = true, showToolbar = true, className }: MainLayoutProps) {
  const { dimensions, layout } = useSpatialLayout({
    autoCollapse: true,
    contentAware: true,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Comprehensive Environment Toolbar */}
      <AnimatePresence>
        {showToolbar && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50"
          >
            <ComprehensiveEnvironmentToolbar />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex">
        {/* Adaptive Holographic Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed left-0 top-0 bottom-0 z-40"
              style={{
                top: showToolbar ? "64px" : "0",
                height: showToolbar ? "calc(100vh - 64px)" : "100vh",
              }}
            >
              <AdaptiveHolographicSidebar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <motion.main
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out",
            showSidebar && "ml-16 hover:ml-64",
            showToolbar && "pt-16",
            className,
          )}
          animate={{
            marginLeft: showSidebar ? (layout.sidebarExpanded ? 256 : 64) : 0,
            paddingTop: showToolbar ? 64 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="min-h-full">{children}</div>
        </motion.main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {showSidebar && dimensions.width < 1024 && layout.sidebarExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => layout.setSidebarExpanded?.(false)}
        />
      )}
    </div>
  )
}
