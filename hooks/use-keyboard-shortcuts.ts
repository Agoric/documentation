"use client"

import { useEffect, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useEnvironmentBookmarks } from "./use-environment-bookmarks"

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

// Parse shortcut string like "Alt+B" or "Ctrl+Shift+1" into modifier keys and main key
const parseShortcut = (shortcut: string) => {
  const parts = shortcut.split("+")
  const mainKey = parts[parts.length - 1]
  const modifiers = parts.slice(0, -1)

  return {
    key: mainKey,
    ctrlKey: modifiers.includes("Ctrl"),
    altKey: modifiers.includes("Alt"),
    shiftKey: modifiers.includes("Shift"),
    metaKey: modifiers.includes("Meta"),
  }
}

export const useEnvironmentShortcuts = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { bookmarks, navigateToBookmark } = useEnvironmentBookmarks()

  const shortcuts: KeyboardShortcut[] = [
    // Default environment shortcuts
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
    {
      key: "3",
      altKey: true,
      action: () => router.push("/dashboard/ecommerex/holographic-products"),
      description: "Go to EcommereX Shop",
    },
    {
      key: "4",
      altKey: true,
      action: () => router.push("/dashboard/gamification"),
      description: "Go to Gamification Hub",
    },
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
    // Custom bookmark shortcuts
    ...bookmarks
      .filter((bookmark) => bookmark.customShortcut)
      .map((bookmark) => {
        const parsed = parseShortcut(bookmark.customShortcut!)
        return {
          ...parsed,
          action: () => navigateToBookmark(bookmark.id),
          description: `Go to ${bookmark.name}`,
        }
      }),
  ]

  useKeyboardShortcuts(shortcuts)

  return { shortcuts, currentPath: pathname, bookmarks }
}

export default useKeyboardShortcuts
