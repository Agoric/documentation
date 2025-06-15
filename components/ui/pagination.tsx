"use client"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  variant?: "default" | "holographic" | "minimal"
  showFirstLast?: boolean
  showPageNumbers?: boolean
  maxPageButtons?: number
  size?: "sm" | "md" | "lg"
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  variant = "default",
  showFirstLast = true,
  showPageNumbers = true,
  maxPageButtons = 5,
  size = "md",
}: PaginationProps) {
  // Ensure current page is within bounds
  const page = Math.max(1, Math.min(currentPage, totalPages))

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    if (totalPages <= maxPageButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Always show current page and some pages before and after
    let startPage = Math.max(1, page - Math.floor(maxPageButtons / 2))
    let endPage = startPage + maxPageButtons - 1

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(1, endPage - maxPageButtons + 1)
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }

  const pageNumbers = getPageNumbers()

  // Size classes
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  }

  // Variant classes
  const getVariantClasses = (isActive: boolean) => {
    switch (variant) {
      case "holographic":
        return isActive
          ? "bg-gradient-to-r from-blue-500/80 via-purple-500/80 to-pink-500/80 text-white border border-white/20 shadow-[0_0_15px_rgba(131,58,180,0.5)] backdrop-blur-sm"
          : "bg-black/30 hover:bg-black/50 border border-white/10 text-white/80 hover:text-white backdrop-blur-sm hover:shadow-[0_0_10px_rgba(131,58,180,0.3)]"
      case "minimal":
        return isActive
          ? "bg-primary/90 text-primary-foreground"
          : "bg-transparent hover:bg-muted text-muted-foreground hover:text-foreground"
      default:
        return isActive ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted text-foreground"
    }
  }

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={cn("flex items-center justify-center gap-1 sm:gap-2", className)}
    >
      {showFirstLast && (
        <button
          onClick={() => onPageChange(1)}
          disabled={page === 1}
          className={cn(
            "flex items-center justify-center rounded-md transition-all",
            sizeClasses[size],
            getVariantClasses(false),
            page === 1 && "opacity-50 cursor-not-allowed",
          )}
          aria-label="Go to first page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
      )}

      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={cn(
          "flex items-center justify-center rounded-md transition-all",
          sizeClasses[size],
          getVariantClasses(false),
          page === 1 && "opacity-50 cursor-not-allowed",
        )}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {showPageNumbers &&
        pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={cn(
              "flex items-center justify-center rounded-md transition-all",
              sizeClasses[size],
              getVariantClasses(page === pageNumber),
            )}
            aria-label={`Page ${pageNumber}`}
            aria-current={page === pageNumber ? "page" : undefined}
          >
            {pageNumber}
          </button>
        ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={cn(
          "flex items-center justify-center rounded-md transition-all",
          sizeClasses[size],
          getVariantClasses(false),
          page === totalPages && "opacity-50 cursor-not-allowed",
        )}
        aria-label="Go to next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {showFirstLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
          className={cn(
            "flex items-center justify-center rounded-md transition-all",
            sizeClasses[size],
            getVariantClasses(false),
            page === totalPages && "opacity-50 cursor-not-allowed",
          )}
          aria-label="Go to last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      )}
    </nav>
  )
}
