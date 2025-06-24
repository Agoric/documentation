"use client"

import * as React from "react"
import { HelpCircle, Keyboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

const shortcutCategories = [
  {
    category: "Main Platform",
    shortcuts: [
      { keys: ["Alt", "1"], description: "Main Dashboard" },
      { keys: ["Alt", "2"], description: "SNAP-DAX Trading" },
    ],
  },
  {
    category: "Commerce",
    shortcuts: [{ keys: ["Alt", "3"], description: "EcommereX Shop" }],
  },
  {
    category: "Gaming & Rewards",
    shortcuts: [{ keys: ["Alt", "4"], description: "Gamification Hub" }],
  },
  {
    category: "Legal Framework",
    shortcuts: [
      { keys: ["Alt", "5"], description: "Legal Center" },
      { keys: ["Alt", "6"], description: "Compliance Portal" },
      { keys: ["Alt", "7"], description: "Digital Domicile" },
      { keys: ["Alt", "8"], description: "Diplomatic Immunity" },
    ],
  },
  {
    category: "Administration",
    shortcuts: [
      { keys: ["Alt", "9"], description: "Admin Dashboard" },
      { keys: ["Alt", "0"], description: "User Management" },
      { keys: ["Alt", "S"], description: "System Monitoring" },
    ],
  },
  {
    category: "Quick Actions",
    shortcuts: [{ keys: ["Alt", "H"], description: "Go to Home" }],
  },
]

interface KeyboardShortcutsHelpProps {
  className?: string
}

export function KeyboardShortcutsHelp({ className }: KeyboardShortcutsHelpProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className={className}>
          <Keyboard className="h-4 w-4 mr-2" />
          Shortcuts
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-background/95 backdrop-blur-sm border-white/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>Use these keyboard shortcuts to quickly navigate between environments</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {shortcutCategories.map((category) => (
            <div key={category.category} className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.shortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <span className="text-sm">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <React.Fragment key={keyIndex}>
                          <Badge variant="secondary" className="px-2 py-1 text-xs font-mono">
                            {key}
                          </Badge>
                          {keyIndex < shortcut.keys.length - 1 && <span className="text-muted-foreground">+</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-start gap-2">
            <HelpCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-blue-400 mb-1">Pro Tip</p>
              <p className="text-muted-foreground">
                All shortcuts use the <Badge variant="secondary">Alt</Badge> key as the modifier. This ensures they
                don't conflict with browser shortcuts.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
