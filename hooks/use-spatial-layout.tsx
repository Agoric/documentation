"use client"

import { useState, useEffect, useCallback } from "react"

interface SpatialLayoutConfig {
  autoCollapse?: boolean
  contentAware?: boolean
  breakpoints?: {
    mobile: number
    tablet: number
    desktop: number
    wide: number
  }
}

interface SpatialLayoutState {
  dimensions: {
    width: number
    height: number
  }
  layout: {
    toolbarHeight: number
    toolbarCompact: boolean
    showLabels: boolean
    sidebarCollapsed: boolean
    contentWidth: number
  }
  actions: {
    toggleSidebar: () => void
    toggleCompact: () => void
    updateDimensions: (width: number, height: number) => void
  }
}

const defaultBreakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
  wide: 1920,
}

export function useSpatialLayout(config: SpatialLayoutConfig = {}): SpatialLayoutState {
  const { autoCollapse = true, contentAware = true, breakpoints = defaultBreakpoints } = config

  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  })

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [manualCompact, setManualCompact] = useState(false)

  // Calculate layout properties based on dimensions
  const calculateLayout = useCallback(() => {
    const { width, height } = dimensions

    // Determine if we should use compact mode
    const shouldCompact = manualCompact || (autoCollapse && width < breakpoints.tablet)

    // Calculate toolbar height
    const toolbarHeight = shouldCompact ? 56 : 72

    // Determine if we should show labels
    const showLabels = width > breakpoints.mobile && !shouldCompact

    // Calculate content width
    const sidebarWidth = sidebarCollapsed ? 0 : shouldCompact ? 240 : 280
    const contentWidth = width - sidebarWidth

    return {
      toolbarHeight,
      toolbarCompact: shouldCompact,
      showLabels,
      sidebarCollapsed,
      contentWidth,
    }
  }, [dimensions, autoCollapse, breakpoints, manualCompact, sidebarCollapsed])

  const [layout, setLayout] = useState(calculateLayout)

  // Update layout when dependencies change
  useEffect(() => {
    setLayout(calculateLayout())
  }, [calculateLayout])

  // Handle window resize
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleResize = () => {
      const newDimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
      }
      setDimensions(newDimensions)
    }

    window.addEventListener("resize", handleResize)

    // Set initial dimensions
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    if (autoCollapse && dimensions.width < breakpoints.mobile) {
      setSidebarCollapsed(true)
    }
  }, [dimensions.width, autoCollapse, breakpoints.mobile])

  const actions = {
    toggleSidebar: useCallback(() => {
      setSidebarCollapsed((prev) => !prev)
    }, []),

    toggleCompact: useCallback(() => {
      setManualCompact((prev) => !prev)
    }, []),

    updateDimensions: useCallback((width: number, height: number) => {
      setDimensions({ width, height })
    }, []),
  }

  return {
    dimensions,
    layout,
    actions,
  }
}
