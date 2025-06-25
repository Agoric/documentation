"use client"
import { motion } from "framer-motion"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
} from "./pagination"
import { useAdvancedPagination } from "@/hooks/use-advanced-pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

interface ModernPaginationProps {
  totalItems: number
  itemsPerPage: number
  onPageChange?: (page: number) => void
  onItemsPerPageChange?: (itemsPerPage: number) => void
  showItemsPerPage?: boolean
  showPageInfo?: boolean
  className?: string
}

export function ModernPagination({
  totalItems,
  itemsPerPage: initialItemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  showItemsPerPage = true,
  showPageInfo = true,
  className,
}: ModernPaginationProps) {
  const {
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    visiblePages,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    setItemsPerPage,
    getPageInfo,
  } = useAdvancedPagination({
    totalItems,
    itemsPerPage: initialItemsPerPage,
    maxVisiblePages: 7,
  })

  const handlePageChange = (page: number) => {
    goToPage(page)
    onPageChange?.(page)
  }

  const handleItemsPerPageChange = (items: string) => {
    const itemsNum = Number.parseInt(items)
    setItemsPerPage(itemsNum)
    onItemsPerPageChange?.(itemsNum)
  }

  const pageInfo = getPageInfo()

  if (totalPages <= 1 && !showPageInfo) return null

  return (
    <motion.div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Page Info */}
      {showPageInfo && (
        <div className="text-sm text-slate-400 order-2 sm:order-1">
          <span className="font-medium text-slate-300">{pageInfo.showing}</span> items
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination className="order-1 sm:order-2">
          <PaginationContent>
            {/* First Page */}
            <PaginationItem>
              <PaginationFirst
                onClick={goToFirstPage}
                disabled={!hasPreviousPage}
                className={!hasPreviousPage ? "opacity-50 cursor-not-allowed" : ""}
              />
            </PaginationItem>

            {/* Previous Page */}
            <PaginationItem>
              <PaginationPrevious
                onClick={goToPreviousPage}
                disabled={!hasPreviousPage}
                className={!hasPreviousPage ? "opacity-50 cursor-not-allowed" : ""}
              />
            </PaginationItem>

            {/* Page Numbers */}
            {visiblePages.map((page, index) => (
              <PaginationItem key={`${page}-${index}`}>
                {page === "ellipsis" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink onClick={() => handlePageChange(page)} isActive={currentPage === page}>
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {/* Next Page */}
            <PaginationItem>
              <PaginationNext
                onClick={goToNextPage}
                disabled={!hasNextPage}
                className={!hasNextPage ? "opacity-50 cursor-not-allowed" : ""}
              />
            </PaginationItem>

            {/* Last Page */}
            <PaginationItem>
              <PaginationLast
                onClick={goToLastPage}
                disabled={!hasNextPage}
                className={!hasNextPage ? "opacity-50 cursor-not-allowed" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Items Per Page */}
      {showItemsPerPage && (
        <div className="flex items-center gap-2 text-sm text-slate-400 order-3">
          <span>Show</span>
          <Select value={initialItemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
            <SelectTrigger className="w-20 h-8 border-slate-600/30 bg-slate-800/50 text-slate-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-slate-600/30 bg-slate-800/90">
              {[10, 20, 50, 100].map((size) => (
                <SelectItem key={size} value={size.toString()} className="hover:bg-slate-700/50">
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>per page</span>
        </div>
      )}
    </motion.div>
  )
}
