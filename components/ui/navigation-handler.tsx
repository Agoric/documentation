"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useCallback } from "react"

export const useNavigationHandler = () => {
  const router = useRouter()

  const handleNavigation = useCallback(
    (
      path: string,
      options?: {
        replace?: boolean
        scroll?: boolean
        query?: Record<string, string>
      },
    ) => {
      let fullPath = path

      if (options?.query) {
        const queryString = new URLSearchParams(options.query).toString()
        fullPath = `${path}?${queryString}`
      }

      if (options?.replace) {
        router.replace(fullPath, { scroll: options.scroll })
      } else {
        router.push(fullPath, { scroll: options.scroll })
      }
    },
    [router],
  )

  const handleExternalLink = useCallback((url: string, newTab = true) => {
    if (newTab) {
      window.open(url, "_blank", "noopener,noreferrer")
    } else {
      window.location.href = url
    }
  }, [])

  const handleBack = useCallback(() => {
    router.back()
  }, [router])

  const handleForward = useCallback(() => {
    router.forward()
  }, [router])

  return {
    handleNavigation,
    handleExternalLink,
    handleBack,
    handleForward,
  }
}

// Navigation helper component
export const NavigationButton = ({
  path,
  children,
  className = "",
  replace = false,
  scroll = true,
  query,
  ...props
}: {
  path: string
  children: React.ReactNode
  className?: string
  replace?: boolean
  scroll?: boolean
  query?: Record<string, string>
  [key: string]: any
}) => {
  const { handleNavigation } = useNavigationHandler()

  return (
    <button className={className} onClick={() => handleNavigation(path, { replace, scroll, query })} {...props}>
      {children}
    </button>
  )
}
