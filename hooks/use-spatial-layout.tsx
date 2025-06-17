"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface SpatialDimensions {
  width: number
  height: number
  availableWidth: number
  availableHeight: number
  density: "compact" | "comfortable" | "spacious"
  orientation: "landscape" | "portrait"
  breakpoint: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
}

interface SpatialLayout {
  sidebarWidth: number
  sidebarCollapsed: boolean
  toolbarHeight: number
  toolbarCompact: boolean
  contentPadding: number
  gridColumns: number
  cardSize: "sm" | "md" | "lg"
  showLabels: boolean
  adaptiveSpacing: number
}

interface UseSpatialLayoutOptions {
  minSidebarWidth?: number
  maxSidebarWidth?: number
  autoCollapse?: boolean
  densityThreshold?: number
  contentAware?: boolean
}

export function useSpatialLayout(options: UseSpatialLayoutOptions = {}) {
  const {
    minSidebarWidth = 240,
    maxSidebarWidth = 320,
    autoCollapse = true,
    densityThreshold = 0.7,
    contentAware = true,
  } = options

  const [dimensions, setDimensions] = useState<SpatialDimensions>({
    width: 1920,
    height: 1080,
    availableWidth: 1920,
    availableHeight: 1080,
    density: "comfortable",
    orientation: "landscape",
    breakpoint: "xl",
  })

  const [layout, setLayout] = useState<SpatialLayout>({
    sidebarWidth: 280,
    sidebarCollapsed: false,
    toolbarHeight: 64,
    toolbarCompact: false,
    contentPadding: 24,
    gridColumns: 3,
    cardSize: "md",
    showLabels: true,
    adaptiveSpacing: 16,
  })

  const [userPreferences, setUserPreferences] = useState({
    preferredSidebarWidth: 280,
    preferredDensity: "comfortable" as const,
    manualOverride: false,
  })

  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const containerRef = useRef<HTMLElement | null>(null)

  // Calculate spatial dimensions
  const calculateDimensions = useCallback(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    const aspectRatio = width / height

    // Determine breakpoint
    let breakpoint: SpatialDimensions["breakpoint"] = "xs"
    if (width >= 1536) breakpoint = "2xl"
    else if (width >= 1280) breakpoint = "xl"
    else if (width >= 1024) breakpoint = "lg"
    else if (width >= 768) breakpoint = "md"
    else if (width >= 640) breakpoint = "sm"

    // Calculate density based on screen real estate
    const screenArea = width * height
    const referenceArea = 1920 * 1080 // Full HD reference
    const densityRatio = screenArea / referenceArea

    let density: SpatialDimensions["density"] = "comfortable"
    if (densityRatio < 0.5) density = "compact"
    else if (densityRatio > 1.5) density = "spacious"

    return {
      width,
      height,
      availableWidth: width,
      availableHeight: height - 64, // Account for toolbar
      density,
      orientation: aspectRatio > 1 ? "landscape" : "portrait",
      breakpoint,
    }
  }, [])

  // Calculate optimal layout based on dimensions
  const calculateLayout = useCallback(
    (dims: SpatialDimensions): SpatialLayout => {
      const { width, height, density, breakpoint, orientation } = dims

      // Smart sidebar width calculation
      let sidebarWidth = userPreferences.preferredSidebarWidth
      let sidebarCollapsed = false

      if (autoCollapse && !userPreferences.manualOverride) {
        if (width < 1024) {
          sidebarCollapsed = true
          sidebarWidth = 64
        } else if (width < 1280) {
          sidebarWidth = Math.max(minSidebarWidth, width * 0.18)
        } else {
          sidebarWidth = Math.min(maxSidebarWidth, Math.max(minSidebarWidth, width * 0.15))
        }
      }

      // Smart toolbar height
      const toolbarCompact = density === "compact" || height < 800
      const toolbarHeight = toolbarCompact ? 56 : 72

      // Content padding based on density
      let contentPadding = 24
      if (density === "compact") contentPadding = 16
      else if (density === "spacious") contentPadding = 32

      // Grid columns based on available space
      const availableContentWidth = width - (sidebarCollapsed ? 64 : sidebarWidth) - contentPadding * 2
      let gridColumns = 3
      if (availableContentWidth < 800) gridColumns = 1
      else if (availableContentWidth < 1200) gridColumns = 2
      else if (availableContentWidth > 1800) gridColumns = 4

      // Card size based on grid and density
      let cardSize: "sm" | "md" | "lg" = "md"
      if (density === "compact" || gridColumns > 3) cardSize = "sm"
      else if (density === "spacious" && gridColumns <= 2) cardSize = "lg"

      // Adaptive spacing
      let adaptiveSpacing = 16
      if (density === "compact") adaptiveSpacing = 12
      else if (density === "spacious") adaptiveSpacing = 24

      // Show labels based on space availability
      const showLabels = !toolbarCompact && width > 768

      return {
        sidebarWidth,
        sidebarCollapsed,
        toolbarHeight,
        toolbarCompact,
        contentPadding,
        gridColumns,
        cardSize,
        showLabels,
        adaptiveSpacing,
      }
    },
    [autoCollapse, minSidebarWidth, maxSidebarWidth, userPreferences],
  )

  // Update layout when dimensions change
  const updateLayout = useCallback(() => {
    const newDimensions = calculateDimensions()
    const newLayout = calculateLayout(newDimensions)

    setDimensions(newDimensions)
    setLayout(newLayout)
  }, [calculateDimensions, calculateLayout])

  // Initialize and handle resize
  useEffect(() => {
    updateLayout()

    const handleResize = () => {
      updateLayout()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [updateLayout])

  // Content-aware adjustments
  useEffect(() => {
    if (!contentAware || !containerRef.current) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        const contentDensity = (entry.target.children.length * 200) / (width * height)

        if (contentDensity > densityThreshold && layout.cardSize !== "sm") {
          setLayout((prev) => ({ ...prev, cardSize: "sm", adaptiveSpacing: 12 }))
        } else if (contentDensity < densityThreshold * 0.5 && layout.cardSize !== "lg") {
          setLayout((prev) => ({ ...prev, cardSize: "lg", adaptiveSpacing: 24 }))
        }
      }
    })

    observer.observe(containerRef.current)
    resizeObserverRef.current = observer

    return () => {
      observer.disconnect()
    }
  }, [contentAware, densityThreshold, layout.cardSize])

  // Manual controls
  const toggleSidebar = useCallback(() => {
    setLayout((prev) => ({
      ...prev,
      sidebarCollapsed: !prev.sidebarCollapsed,
      sidebarWidth: prev.sidebarCollapsed ? userPreferences.preferredSidebarWidth : 64,
    }))
    setUserPreferences((prev) => ({ ...prev, manualOverride: true }))
  }, [userPreferences.preferredSidebarWidth])

  const setSidebarWidth = useCallback(
    (width: number) => {
      const clampedWidth = Math.max(minSidebarWidth, Math.min(maxSidebarWidth, width))
      setLayout((prev) => ({ ...prev, sidebarWidth: clampedWidth, sidebarCollapsed: false }))
      setUserPreferences((prev) => ({ ...prev, preferredSidebarWidth: clampedWidth, manualOverride: true }))
    },
    [minSidebarWidth, maxSidebarWidth],
  )

  const setDensity = useCallback(
    (density: SpatialDimensions["density"]) => {
      setUserPreferences((prev) => ({ ...prev, preferredDensity: density }))
      const newLayout = calculateLayout({ ...dimensions, density })
      setLayout(newLayout)
    },
    [dimensions, calculateLayout],
  )

  const resetToAuto = useCallback(() => {
    setUserPreferences((prev) => ({ ...prev, manualOverride: false }))
    updateLayout()
  }, [updateLayout])

  return {
    dimensions,
    layout,
    userPreferences,
    containerRef,
    actions: {
      toggleSidebar,
      setSidebarWidth,
      setDensity,
      resetToAuto,
    },
  }
}
