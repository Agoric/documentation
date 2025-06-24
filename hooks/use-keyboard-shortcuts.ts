"use client"

import { useEffect, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"

interface KeyboardShortcut {
  key: string
  ctrlKey?: boolean
  altKey?: boolean
  shiftKey?: boolean
  metaKey?: boolean
  action: () => void
  description: string
}

const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const matchingShortcut = shortcuts.find((shortcut) => {
        return (
          event.key.toLowerCase() === shortcut.key.toLowerCase() &&
          !!event.ctrlKey === !!shortcut.ctrlKey &&
          !!event.altKey === !!shortcut.altKey &&
          !!event.shiftKey === !!shortcut.shiftKey &&
          !!event.metaKey === !!shortcut.metaKey
        )
      })

      if (matchingShortcut) {
        event.preventDefault()
        matchingShortcut.action()
      }
    },
    [shortcuts],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])
}

export const useEnvironmentShortcuts = () => {
  const router = useRouter()
  const pathname = usePathname()

  const shortcuts: KeyboardShortcut[] = [
    // Main Platform
    {
      key: "1",
      altKey: true,
      action: () => router.push("/dashboard"),
      description: "Go to Main Dashboard",
    },
    {
      key: "2",
      altKey: true,
      action: () => router.push("/dashboard/snap-dax"),
      description: "Go to SNAP-DAX Trading",
    },
    // Commerce
    {
      key: "3",
      altKey: true,
      action: () => router.push("/dashboard/ecommerex/holographic-products"),
      description: "Go to EcommereX Shop",
    },
    // Gaming & Rewards
    {
      key: "4",
      altKey: true,
      action: () => router.push("/dashboard/gamification"),
      description: "Go to Gamification Hub",
    },
    // Legal Framework
    {
      key: "5",
      altKey: true,
      action: () => router.push("/legal"),
      description: "Go to Legal Center",
    },
    {
      key: "6",
      altKey: true,
      action: () => router.push("/legal/compliance"),
      description: "Go to Compliance Portal",
    },
    {
      key: "7",
      altKey: true,
      action: () => router.push("/legal/digital-domicile"),
      description: "Go to Digital Domicile",
    },
    {
      key: "8",
      altKey: true,
      action: () => router.push("/legal/diplomatic-immunity"),
      description: "Go to Diplomatic Immunity",
    },
    // Administration
    {
      key: "9",
      altKey: true,
      action: () => router.push("/admin/dashboard"),
      description: "Go to Admin Dashboard",
    },
    {
      key: "0",
      altKey: true,
      action: () => router.push("/admin/users"),
      description: "Go to User Management",
    },
    // Quick actions
    {
      key: "h",
      altKey: true,
      action: () => router.push("/"),
      description: "Go to Home",
    },
    {
      key: "s",
      altKey: true,
      action: () => router.push("/admin/system"),
      description: "Go to System Monitoring",
    },
  ]

  useKeyboardShortcuts(shortcuts)

  return { shortcuts, currentPath: pathname }
}

export default useKeyboardShortcuts
