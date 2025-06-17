"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"

interface SpatialLayoutConfig {
  autoCollapse?: boolean
  contentAware?: boolean
  minSidebarWidth?: number
  maxSidebarWidth?: number
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
    sidebarCollapsed: boolean
    sidebarWidth: number
    toolbarHeight: number
    toolbarCompact: boolean
    showLabels: boolean
    gridColumns: number
    cardSize: "sm" | "md" | "lg"
    adaptiveSpacing: number
    contentPadding: number
  }
  containerRef: React.RefObject<HTMLDivElement>
  actions: {
    toggleSidebar: () => void
    setSidebarWidth: (width: number) => void
    setToolbarCompact: (compact: boolean) => void
  }
}

const defaultConfig: Required<SpatialLayoutConfig> = {
  autoCollapse: true,
  contentAware: true,
  minSidebarWidth: 240,
  maxSidebarWidth: 400,
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1440,
    wide: 1920,
  },
}

export function useSpatialLayout(config: SpatialLayoutConfig = {}): SpatialLayoutState {
  const mergedConfig = { ...defaultConfig, ...config }
  const containerRef = useRef<HTMLDivElement>(null)

  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1920,
    height: typeof window !== "undefined" ? window.innerHeight : 1080,
  })

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(mergedConfig.minSidebarWidth)
  const [toolbarCompact, setToolbarCompact] = useState(false)

  // Calculate adaptive layout properties
  const calculateLayout = useCallback(() => {
    const { width, height } = dimensions
    const { breakpoints } = mergedConfig

    // Determine device type
    const isMobile = width < breakpoints.mobile
    const isTablet = width >= breakpoints.mobile && width < breakpoints.desktop
    const isDesktop = width >= breakpoints.desktop && width < breakpoints.wide
    const isWide = width >= breakpoints.wide

    // Auto-collapse sidebar on smaller screens
    const shouldCollapseSidebar = mergedConfig.autoCollapse && (isMobile || (isTablet && width < 900))

    // Calculate grid columns based on available space
    const availableWidth = width - (shouldCollapseSidebar ? 64 : sidebarWidth) - 48 // padding
    const minCardWidth = 280
    const gridColumns = Math.max(1, Math.floor(availableWidth / minCardWidth))

    // Determine card size based on available space
    let cardSize: "sm" | "md" | "lg" = "md"
    if (isMobile) cardSize = "sm"
    else if (isWide && gridColumns >= 4) cardSize = "lg"
    else if (gridColumns <= 2) cardSize = "sm"

    // Calculate adaptive spacing
    const baseSpacing = isMobile ? 12 : isTablet ? 16 : 20
    const adaptiveSpacing = isWide ? baseSpacing + 4 : baseSpacing

    // Toolbar height based on content density
    const toolbarHeight = toolbarCompact ? 56 : isMobile ? 64 : 72

    // Show labels based on available space
    const showLabels = !isMobile && width > 800

    // Content padding
    const contentPadding = isMobile ? 16 : isTablet ? 20 : 24

    return {
      sidebarCollapsed: shouldCollapseSidebar || sidebarCollapsed,
      sidebarWidth: Math.max(mergedConfig.minSidebarWidth, Math.min(mergedConfig.maxSidebarWidth, sidebarWidth)),
      toolbarHeight,
      toolbarCompact: toolbarCompact || isMobile,
      showLabels,
      gridColumns,
      cardSize,
      adaptiveSpacing,
      contentPadding,
    }
  }, [dimensions, sidebarCollapsed, sidebarWidth, toolbarCompact])

  // Update dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-collapse sidebar based on content awareness
  useEffect(() => {
    if (mergedConfig.contentAware && mergedConfig.autoCollapse) {
      const { width } = dimensions
      if (width < mergedConfig.breakpoints.tablet) {
        setSidebarCollapsed(true)
      }
    }
  }, [dimensions])

  const layout = calculateLayout()

  const actions = {
    toggleSidebar: useCallback(() => {
      setSidebarCollapsed((prev) => !prev)
    }, []),

    setSidebarWidth: useCallback(
      (width: number) => {
        const constrainedWidth = Math.max(mergedConfig.minSidebarWidth, Math.min(mergedConfig.maxSidebarWidth, width))
        setSidebarWidth(constrainedWidth)
      },
      [mergedConfig],
    ),

    setToolbarCompact: useCallback((compact: boolean) => {
      setToolbarCompact(compact)
    }, []),
  }

  return {
    dimensions,
    layout,
    containerRef,
    actions,
  }
}
