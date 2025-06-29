"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"

export interface EnvironmentBookmark {
  id: string
  name: string
  path: string
  icon: string
  customShortcut?: string
  color?: string
  createdAt: number
}

const BOOKMARKS_STORAGE_KEY = "snapifi-environment-bookmarks"
const MAX_BOOKMARKS = 10

export const useEnvironmentBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<EnvironmentBookmark[]>([])
  const router = useRouter()

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setBookmarks(parsed)
      }
    } catch (error) {
      console.error("Failed to load bookmarks:", error)
    }
  }, [])

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks))
    } catch (error) {
      console.error("Failed to save bookmarks:", error)
    }
  }, [bookmarks])

  const addBookmark = useCallback(
    (bookmark: Omit<EnvironmentBookmark, "id" | "createdAt">) => {
      if (bookmarks.length >= MAX_BOOKMARKS) {
        throw new Error(`Maximum ${MAX_BOOKMARKS} bookmarks allowed`)
      }

      const newBookmark: EnvironmentBookmark = {
        ...bookmark,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      }

      setBookmarks((prev) => [...prev, newBookmark])
      return newBookmark
    },
    [bookmarks.length],
  )

  const removeBookmark = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id))
  }, [])

  const updateBookmark = useCallback((id: string, updates: Partial<EnvironmentBookmark>) => {
    setBookmarks((prev) => prev.map((bookmark) => (bookmark.id === id ? { ...bookmark, ...updates } : bookmark)))
  }, [])

  const isBookmarked = useCallback(
    (path: string) => {
      return bookmarks.some((bookmark) => bookmark.path === path)
    },
    [bookmarks],
  )

  const getBookmarkByPath = useCallback(
    (path: string) => {
      return bookmarks.find((bookmark) => bookmark.path === path)
    },
    [bookmarks],
  )

  const navigateToBookmark = useCallback(
    (id: string) => {
      const bookmark = bookmarks.find((b) => b.id === id)
      if (bookmark) {
        router.push(bookmark.path)
      }
    },
    [bookmarks, router],
  )

  const validateShortcut = useCallback(
    (shortcut: string, excludeId?: string) => {
      // Check if shortcut is already used by another bookmark
      const isUsed = bookmarks.some((bookmark) => bookmark.customShortcut === shortcut && bookmark.id !== excludeId)

      if (isUsed) {
        return { valid: false, error: "Shortcut already in use" }
      }

      // Validate shortcut format (should be like "Alt+B", "Ctrl+Shift+1", etc.)
      const shortcutRegex = /^(Ctrl|Alt|Shift|Meta)(\+(Ctrl|Alt|Shift|Meta))*\+[A-Z0-9]$/i
      if (!shortcutRegex.test(shortcut)) {
        return {
          valid: false,
          error: "Invalid format. Use format like 'Alt+B' or 'Ctrl+Shift+1'",
        }
      }

      return { valid: true }
    },
    [bookmarks],
  )

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    updateBookmark,
    isBookmarked,
    getBookmarkByPath,
    navigateToBookmark,
    validateShortcut,
    maxBookmarks: MAX_BOOKMARKS,
  }
}
