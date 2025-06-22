"use client"

import type React from "react"

import { MainLayout } from "./main-layout"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PageWrapperProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  showSidebar?: boolean
  showToolbar?: boolean
  className?: string
  containerClassName?: string
  animated?: boolean
}

export function PageWrapper({
  children,
  title,
  subtitle,
  showSidebar = true,
  showToolbar = true,
  className,
  containerClassName,
  animated = true,
}: PageWrapperProps) {
  const content = (
    <div className={cn("min-h-screen", containerClassName)}>
      {(title || subtitle) && (
        <div className="p-6 border-b border-amber-500/20 bg-gradient-to-r from-purple-950/50 to-indigo-950/50 backdrop-blur-sm">
          {title && <h1 className="text-3xl font-bold text-amber-300 font-serif mb-2">{title}</h1>}
          {subtitle && <p className="text-amber-300/70 font-serif italic">{subtitle}</p>}
        </div>
      )}
      <div className={cn("p-6", className)}>{children}</div>
    </div>
  )

  const wrappedContent = (
    <MainLayout showSidebar={showSidebar} showToolbar={showToolbar}>
      {content}
    </MainLayout>
  )

  if (!animated) {
    return wrappedContent
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {wrappedContent}
    </motion.div>
  )
}
