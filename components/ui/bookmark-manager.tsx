"use client"

import * as React from "react"
import { Star, StarOff, Edit, Trash2, Plus, Keyboard, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useEnvironmentBookmarks, type EnvironmentBookmark } from "@/hooks/use-environment-bookmarks"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const BOOKMARK_COLORS = [
  { name: "Blue", value: "bg-blue-500", border: "border-blue-500" },
  { name: "Green", value: "bg-green-500", border: "border-green-500" },
  { name: "Purple", value: "bg-purple-500", border: "border-purple-500" },
  { name: "Pink", value: "bg-pink-500", border: "border-pink-500" },
  { name: "Orange", value: "bg-orange-500", border: "border-orange-500" },
  { name: "Red", value: "bg-red-500", border: "border-red-500" },
  { name: "Yellow", value: "bg-yellow-500", border: "border-yellow-500" },
  { name: "Cyan", value: "bg-cyan-500", border: "border-cyan-500" },
]

interface BookmarkManagerProps {
  currentEnvironment?: {
    name: string
    path: string
    icon: string
  }
}

export function BookmarkManager({ currentEnvironment }: BookmarkManagerProps) {
  const {
    bookmarks,
    addBookmark,
    removeBookmark,
    updateBookmark,
    isBookmarked,
    getBookmarkByPath,
    navigateToBookmark,
    validateShortcut,
    maxBookmarks,
  } = useEnvironmentBookmarks()

  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const [editingBookmark, setEditingBookmark] = React.useState<EnvironmentBookmark | null>(null)
  const [newBookmarkForm, setNewBookmarkForm] = React.useState({
    name: "",
    customShortcut: "",
    color: BOOKMARK_COLORS[0].value,
  })

  const currentBookmark = currentEnvironment ? getBookmarkByPath(currentEnvironment.path) : null
  const isCurrentBookmarked = currentEnvironment ? isBookmarked(currentEnvironment.path) : false

  const handleAddBookmark = () => {
    if (!currentEnvironment) return

    try {
      const shortcutValidation = newBookmarkForm.customShortcut
        ? validateShortcut(newBookmarkForm.customShortcut)
        : { valid: true }

      if (!shortcutValidation.valid) {
        alert(shortcutValidation.error)
        return
      }

      addBookmark({
        name: newBookmarkForm.name || currentEnvironment.name,
        path: currentEnvironment.path,
        icon: currentEnvironment.icon,
        customShortcut: newBookmarkForm.customShortcut || undefined,
        color: newBookmarkForm.color,
      })

      setNewBookmarkForm({
        name: "",
        customShortcut: "",
        color: BOOKMARK_COLORS[0].value,
      })
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to add bookmark")
    }
  }

  const handleUpdateBookmark = (bookmark: EnvironmentBookmark) => {
    const shortcutValidation = bookmark.customShortcut
      ? validateShortcut(bookmark.customShortcut, bookmark.id)
      : { valid: true }

    if (!shortcutValidation.valid) {
      alert(shortcutValidation.error)
      return
    }

    updateBookmark(bookmark.id, bookmark)
    setEditingBookmark(null)
  }

  const handleToggleBookmark = () => {
    if (!currentEnvironment) return

    if (isCurrentBookmarked) {
      if (currentBookmark) {
        removeBookmark(currentBookmark.id)
      }
    } else {
      try {
        addBookmark({
          name: currentEnvironment.name,
          path: currentEnvironment.path,
          icon: currentEnvironment.icon,
          color: BOOKMARK_COLORS[0].value,
        })
      } catch (error) {
        alert(error instanceof Error ? error.message : "Failed to add bookmark")
      }
    }
  }

  return (
    <div className="flex items-center gap-2">
      {/* Quick bookmark toggle */}
      {currentEnvironment && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleBookmark}
          className={cn("p-2", isCurrentBookmarked && "text-yellow-400 hover:text-yellow-300")}
        >
          {isCurrentBookmarked ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-4 w-4" />}
        </Button>
      )}

      {/* Bookmark manager dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <Star className="h-4 w-4 mr-2" />
            Bookmarks ({bookmarks.length})
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-background/95 backdrop-blur-sm border-white/20">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Environment Bookmarks
            </DialogTitle>
            <DialogDescription>
              Manage your favorite environments and assign custom keyboard shortcuts
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Add new bookmark section */}
            {currentEnvironment && !isCurrentBookmarked && (
              <div className="p-4 border border-dashed border-white/20 rounded-lg">
                <h3 className="font-medium mb-3">Add Current Environment</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="bookmark-name">Custom Name (optional)</Label>
                    <Input
                      id="bookmark-name"
                      placeholder={currentEnvironment.name}
                      value={newBookmarkForm.name}
                      onChange={(e) => setNewBookmarkForm((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bookmark-shortcut">Custom Shortcut (optional)</Label>
                    <Input
                      id="bookmark-shortcut"
                      placeholder="e.g., Alt+B or Ctrl+Shift+1"
                      value={newBookmarkForm.customShortcut}
                      onChange={(e) => setNewBookmarkForm((prev) => ({ ...prev, customShortcut: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Color</Label>
                    <div className="flex gap-2 mt-2">
                      {BOOKMARK_COLORS.map((color) => (
                        <button
                          key={color.value}
                          className={cn(
                            "w-6 h-6 rounded-full border-2",
                            color.value,
                            newBookmarkForm.color === color.value ? color.border : "border-transparent",
                          )}
                          onClick={() => setNewBookmarkForm((prev) => ({ ...prev, color: color.value }))}
                        />
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleAddBookmark} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Bookmark
                  </Button>
                </div>
              </div>
            )}

            {/* Existing bookmarks */}
            <div className="space-y-3">
              <h3 className="font-medium">
                Your Bookmarks ({bookmarks.length}/{maxBookmarks})
              </h3>
              {bookmarks.length === 0 ? (
                <p className="text-muted-foreground text-sm">No bookmarks yet. Add your first bookmark above!</p>
              ) : (
                <div className="space-y-2">
                  {bookmarks.map((bookmark) => (
                    <div
                      key={bookmark.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                    >
                      <div className={cn("w-3 h-3 rounded-full", bookmark.color)} />
                      <div className="flex-1 min-w-0">
                        {editingBookmark?.id === bookmark.id ? (
                          <div className="space-y-2">
                            <Input
                              value={editingBookmark.name}
                              onChange={(e) =>
                                setEditingBookmark((prev) => (prev ? { ...prev, name: e.target.value } : null))
                              }
                              className="h-8"
                            />
                            <Input
                              value={editingBookmark.customShortcut || ""}
                              onChange={(e) =>
                                setEditingBookmark((prev) =>
                                  prev ? { ...prev, customShortcut: e.target.value } : null,
                                )
                              }
                              placeholder="Custom shortcut (optional)"
                              className="h-8"
                            />
                            <div className="flex gap-1">
                              {BOOKMARK_COLORS.map((color) => (
                                <button
                                  key={color.value}
                                  className={cn(
                                    "w-5 h-5 rounded-full border",
                                    color.value,
                                    editingBookmark.color === color.value ? color.border : "border-transparent",
                                  )}
                                  onClick={() =>
                                    setEditingBookmark((prev) => (prev ? { ...prev, color: color.value } : null))
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="font-medium">{bookmark.name}</div>
                            <div className="text-xs text-muted-foreground">{bookmark.path}</div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {bookmark.customShortcut && (
                          <Badge variant="secondary" className="text-xs">
                            <Keyboard className="h-3 w-3 mr-1" />
                            {bookmark.customShortcut}
                          </Badge>
                        )}
                        {editingBookmark?.id === bookmark.id ? (
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" onClick={() => handleUpdateBookmark(editingBookmark)}>
                              <Save className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setEditingBookmark(null)}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" onClick={() => navigateToBookmark(bookmark.id)}>
                              Go
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setEditingBookmark(bookmark)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeBookmark(bookmark.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
