"use client"

import * as React from "react"

export interface Widget {
  id: string
  type: string
  title: string
  enabled: boolean
  position: number
  config: Record<string, any>
  size: "small" | "medium" | "large"
}

export interface WidgetType {
  id: string
  name: string
  description: string
  icon: React.ElementType
  defaultConfig: Record<string, any>
  sizes: Array<"small" | "medium" | "large">
}

const defaultWidgets: Widget[] = [
  {
    id: "quick-stats",
    type: "stats",
    title: "Quick Stats",
    enabled: true,
    position: 0,
    size: "medium",
    config: {
      showUsers: true,
      showRevenue: true,
      showUptime: true,
    },
  },
  {
    id: "system-status",
    type: "status",
    title: "System Status",
    enabled: true,
    position: 1,
    size: "small",
    config: {
      showServices: true,
      showAlerts: true,
    },
  },
  {
    id: "recent-activity",
    type: "activity",
    title: "Recent Activity",
    enabled: false,
    position: 2,
    size: "large",
    config: {
      maxItems: 5,
      showTimestamps: true,
    },
  },
  {
    id: "weather",
    type: "weather",
    title: "Weather",
    enabled: false,
    position: 3,
    size: "small",
    config: {
      location: "New York",
      unit: "celsius",
    },
  },
  {
    id: "crypto-prices",
    type: "crypto",
    title: "Crypto Prices",
    enabled: false,
    position: 4,
    size: "medium",
    config: {
      coins: ["BTC", "ETH", "ADA"],
      showChange: true,
    },
  },
]

export function useSidebarWidgets() {
  const [widgets, setWidgets] = React.useState<Widget[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebar-widgets")
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch {
          return defaultWidgets
        }
      }
    }
    return defaultWidgets
  })

  const saveWidgets = React.useCallback((newWidgets: Widget[]) => {
    setWidgets(newWidgets)
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-widgets", JSON.stringify(newWidgets))
    }
  }, [])

  const enabledWidgets = React.useMemo(() => {
    return widgets.filter((widget) => widget.enabled).sort((a, b) => a.position - b.position)
  }, [widgets])

  const toggleWidget = React.useCallback(
    (widgetId: string) => {
      const newWidgets = widgets.map((widget) =>
        widget.id === widgetId ? { ...widget, enabled: !widget.enabled } : widget,
      )
      saveWidgets(newWidgets)
    },
    [widgets, saveWidgets],
  )

  const updateWidget = React.useCallback(
    (widgetId: string, updates: Partial<Widget>) => {
      const newWidgets = widgets.map((widget) => (widget.id === widgetId ? { ...widget, ...updates } : widget))
      saveWidgets(newWidgets)
    },
    [widgets, saveWidgets],
  )

  const reorderWidgets = React.useCallback(
    (startIndex: number, endIndex: number) => {
      const enabledList = enabledWidgets
      const [removed] = enabledList.splice(startIndex, 1)
      enabledList.splice(endIndex, 0, removed)

      const newWidgets = widgets.map((widget) => {
        if (widget.enabled) {
          const newPosition = enabledList.findIndex((w) => w.id === widget.id)
          return { ...widget, position: newPosition }
        }
        return widget
      })

      saveWidgets(newWidgets)
    },
    [widgets, enabledWidgets, saveWidgets],
  )

  const addWidget = React.useCallback(
    (type: string, config: Record<string, any> = {}) => {
      const newWidget: Widget = {
        id: `${type}-${Date.now()}`,
        type,
        title: `New ${type}`,
        enabled: true,
        position: enabledWidgets.length,
        size: "medium",
        config,
      }
      saveWidgets([...widgets, newWidget])
    },
    [widgets, enabledWidgets.length, saveWidgets],
  )

  const removeWidget = React.useCallback(
    (widgetId: string) => {
      const newWidgets = widgets.filter((widget) => widget.id !== widgetId)
      saveWidgets(newWidgets)
    },
    [widgets, saveWidgets],
  )

  const resetWidgets = React.useCallback(() => {
    saveWidgets(defaultWidgets)
  }, [saveWidgets])

  return {
    widgets,
    enabledWidgets,
    toggleWidget,
    updateWidget,
    reorderWidgets,
    addWidget,
    removeWidget,
    resetWidgets,
  }
}
