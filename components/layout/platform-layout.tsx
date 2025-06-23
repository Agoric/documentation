"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PlatformLayoutProps {
  children: ReactNode
  className?: string
  variant?: "default" | "dashboard" | "auth"
}

export function PlatformLayout({ children, className, variant = "default" }: PlatformLayoutProps) {
  return (
    <div
      className={cn(
        "page-container",
        variant === "dashboard" && "bg-gradient-to-br from-brand-50/50 via-white to-brand-100/50",
        variant === "auth" && "bg-hero-gradient",
        className,
      )}
    >
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  )
}
