"use client"

import { useState, useMemo, useCallback } from "react"

interface UsePaginationProps {
  totalItems: number
  itemsPerPage: number
  initialPage?: number
  maxVisiblePages?: number
}

interface UsePaginationReturn {
  currentPage: number
  totalPages: number
  startIndex: number
  endIndex: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  visiblePages: (number | "ellipsis")[]
  goToPage: (page: number) => void
  goToNextPage: () => void
  goToPreviousPage: () => void
  goToFirstPage: () => void
  goToLastPage: () => void
  setItemsPerPage: (items: number) => void
  getPageInfo: () => {
    showing: string
    total: number
    from: number
    to: number
  }
}

export function useAdvancedPagination({
  totalItems,
  itemsPerPage: initialItemsPerPage,
  initialPage = 1,
  maxVisiblePages = 7,
}: UsePaginationProps): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [itemsPerPage, setItemsPerPageState] = useState(initialItemsPerPage)

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage)
  }, [totalItems, itemsPerPage])

  const startIndex = useMemo(() => {
    return (currentPage - 1) * itemsPerPage
  }, [currentPage, itemsPerPage])

  const endIndex = useMemo(() => {
    return Math.min(startIndex + itemsPerPage, totalItems)
  }, [startIndex, itemsPerPage, totalItems])

  const hasNextPage = currentPage < totalPages
  const hasPreviousPage = currentPage > 1

  const visiblePages = useMemo(() => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | "ellipsis")[] = []
    const sidePages = Math.floor((maxVisiblePages - 3) / 2) // Reserve space for first, last, and ellipsis

    if (currentPage <= sidePages + 2) {
      // Near the beginning
      for (let i = 1; i <= Math.min(maxVisiblePages - 2, totalPages - 1); i++) {
        pages.push(i)
      }
      if (totalPages > maxVisiblePages - 2) {
        pages.push("ellipsis")
      }
      pages.push(totalPages)
    } else if (currentPage >= totalPages - sidePages - 1) {
      // Near the end
      pages.push(1)
      if (totalPages > maxVisiblePages - 2) {
        pages.push("ellipsis")
      }
      for (let i = Math.max(totalPages - maxVisiblePages + 3, 2); i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // In the middle
      pages.push(1)
      pages.push("ellipsis")
      for (let i = currentPage - sidePages; i <= currentPage + sidePages; i++) {
        pages.push(i)
      }
      pages.push("ellipsis")
      pages.push(totalPages)
    }

    return pages
  }, [currentPage, totalPages, maxVisiblePages])

  const goToPage = useCallback(
    (page: number) => {
      const validPage = Math.max(1, Math.min(page, totalPages))
      setCurrentPage(validPage)
    },
    [totalPages],
  )

  const goToNextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1)
    }
  }, [hasNextPage])

  const goToPreviousPage = useCallback(() => {
    if (hasPreviousPage) {
      setCurrentPage((prev) => prev - 1)
    }
  }, [hasPreviousPage])

  const goToFirstPage = useCallback(() => {
    setCurrentPage(1)
  }, [])

  const goToLastPage = useCallback(() => {
    setCurrentPage(totalPages)
  }, [totalPages])

  const setItemsPerPage = useCallback(
    (items: number) => {
      setItemsPerPageState(items)
      // Adjust current page if necessary
      const newTotalPages = Math.ceil(totalItems / items)
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages || 1)
      }
    },
    [totalItems, currentPage],
  )

  const getPageInfo = useCallback(() => {
    return {
      showing: `${startIndex + 1}-${endIndex} of ${totalItems}`,
      total: totalItems,
      from: startIndex + 1,
      to: endIndex,
    }
  }, [startIndex, endIndex, totalItems])

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
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
  }
}
