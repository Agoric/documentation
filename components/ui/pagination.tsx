"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal, ChevronsLeft, ChevronsRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ButtonProps } from "@/components/ui/button"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn(
        "flex flex-row items-center gap-2 p-2 rounded-2xl",
        "bg-gradient-to-r from-slate-900/80 via-purple-900/20 to-slate-900/80",
        "backdrop-blur-xl border border-purple-500/20",
        "shadow-2xl shadow-purple-500/10",
        className,
      )}
      {...props}
    />
  ),
)
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"button">

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <button
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "relative overflow-hidden transition-all duration-300",
      "min-w-[40px] h-[40px] rounded-xl flex items-center justify-center",
      "border border-transparent font-medium text-sm",
      isActive
        ? "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 scale-110"
        : "bg-slate-800/50 text-slate-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-cyan-600/20 hover:text-white hover:border-purple-500/30 hover:scale-105",
      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
      className,
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn(
      "gap-1 px-3 min-w-[100px]",
      "bg-gradient-to-r from-slate-800/80 to-slate-700/80",
      "hover:from-purple-600/30 hover:to-cyan-600/30",
      "border border-slate-600/30 hover:border-purple-500/50",
      className,
    )}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn(
      "gap-1 px-3 min-w-[100px]",
      "bg-gradient-to-r from-slate-800/80 to-slate-700/80",
      "hover:from-purple-600/30 hover:to-cyan-600/30",
      "border border-slate-600/30 hover:border-purple-500/50",
      className,
    )}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationFirst = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to first page"
    className={cn(
      "gap-1 px-2",
      "bg-gradient-to-r from-slate-800/80 to-slate-700/80",
      "hover:from-purple-600/30 hover:to-cyan-600/30",
      "border border-slate-600/30 hover:border-purple-500/50",
      className,
    )}
    {...props}
  >
    <ChevronsLeft className="h-4 w-4" />
  </PaginationLink>
)
PaginationFirst.displayName = "PaginationFirst"

const PaginationLast = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to last page"
    className={cn(
      "gap-1 px-2",
      "bg-gradient-to-r from-slate-800/80 to-slate-700/80",
      "hover:from-purple-600/30 hover:to-cyan-600/30",
      "border border-slate-600/30 hover:border-purple-500/50",
      className,
    )}
    {...props}
  >
    <ChevronsRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationLast.displayName = "PaginationLast"

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-[40px] w-[40px] items-center justify-center", "text-slate-400 animate-pulse", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
}
