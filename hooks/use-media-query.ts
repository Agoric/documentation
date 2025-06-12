"use client"

import { useEffect, useState } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    // Set initial value
    setMatches(mediaQuery.matches)

    // Create an event listener function
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add the listener
    mediaQuery.addEventListener("change", listener)

    // Clean up
    return () => {
      mediaQuery.removeEventListener("change", listener)
    }
  }, [query])

  return matches
}
